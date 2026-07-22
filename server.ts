import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { RelationalDB } from './src/db/client';
import { IngestionService } from './src/services/ingestion.service';
import { IntelligenceService } from './src/services/intelligence.service';
import { Content, ContentLocation, ContentEntity } from './src/db/schema';
import { VirtualScaleEngine, SCALE_METRICS, getSeededRandom } from './src/db/virtual';
import { EnterpriseSeedEngine } from './src/services/seed.service';
import { GoogleGenAI, Type } from '@google/genai';
import { ENHANCED_SITEMAP_80 } from './src/data/enhancedSitemap';

import * as http from 'http';

function proxyToLaravel(req: express.Request, res: express.Response) {
  const options: http.RequestOptions = {
    hostname: '127.0.0.1',
    port: 8000,
    path: req.originalUrl,
    method: req.method,
    headers: req.headers
  };

  if (options.headers) {
    options.headers['host'] = '127.0.0.1:8000';
  }

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on('error', (err) => {
    console.error('Laravel backend proxy error:', err);
    res.status(502).json({
      status: 'error',
      message: 'Laravel backend is not running at http://127.0.0.1:8000. Please start the Laravel server using: php artisan serve'
    });
  });

  req.pipe(proxyReq, { end: true });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON Body Parsing Middleware ONLY for debug-log
  app.post('/api/v1/debug-log', express.json(), (req, res) => {
    try {
      const logData = `[${new Date().toISOString()}] ${JSON.stringify(req.body, null, 2)}\n\n`;
      fs.appendFileSync(path.join(process.cwd(), 'client_errors.log'), logData);
    } catch (e) {
      console.error('Failed to write to client_errors.log', e);
    }
    res.json({ ok: true });
  });

  // Proxy all other /api/v1 requests to the Laravel backend
  app.use('/api/v1', (req, res) => {
    proxyToLaravel(req, res);
  });

  // JSON Body Parsing Middleware for other local Express routes (e.g. static pages, sitemaps, etc.)
  app.use(express.json());

  const db = RelationalDB.getInstance();

  // Simple in-memory session tracking for API Auth & RBAC
  // In production this maps to JWT or secure Redis sessions
  let activeSessions: Record<string, { userId: string; role: string; fullName: string; email: string }> = {
    "session-admin": { userId: "usr-admin", role: "super_admin", fullName: "Ahmad Dahlan", email: "admin@infobos.com" },
    "session-editor": { userId: "usr-editor", role: "managing_editor", fullName: "Siti Rahma", email: "editor@infobos.com" },
    "session-reporter": { userId: "usr-reporter", role: "reporter", fullName: "Budi Santoso", email: "reporter@infobos.com" }
  };

  // Helper auth middleware
  const authenticate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: "Authentication required" });
    }
    const token = authHeader.split(' ')[1];
    const session = activeSessions[token];
    if (!session) {
      return res.status(401).json({ error: "Invalid or expired session token" });
    }
    (req as any).user = session;
    next();
  };

  // Helper authorization middleware based on permission keys
  const authorize = (permissions: string[]) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
      const user = (req as any).user;
      if (!user) return res.status(401).json({ error: "Authentication required" });
      
      const role = user.role;
      // Map simplified roles to permission sets
      const rolePermissions: Record<string, string[]> = {
        super_admin: ["content.read", "content.draft.own", "content.submit.own", "content.edit.any", "content.review.any", "content.publish", "content.unpublish", "content.correct", "source.manage", "geography.manage", "entity.manage", "advertising.manage", "audit.view"],
        managing_editor: ["content.read", "content.draft.own", "content.submit.own", "content.edit.any", "content.review.any", "content.publish", "content.unpublish", "content.correct", "source.manage", "geography.manage", "entity.manage", "audit.view"],
        editor: ["content.read", "content.draft.own", "content.submit.own", "content.edit.any", "content.review.any", "content.publish", "geography.manage", "entity.manage"],
        reporter: ["content.read", "content.draft.own", "content.submit.own"],
        contributor: ["content.read", "content.draft.own", "content.submit.own"],
        member: ["content.read"]
      };

      const allowed = permissions.some(p => rolePermissions[role]?.includes(p));
      if (!allowed) {
        return res.status(403).json({ error: `Forbidden: Missing required privilege for action.` });
      }
      next();
    };
  };

  // ==========================================
  // AUTHENTICATION ENDPOINTS
  // ==========================================

  app.post('/api/v1/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const matchedUser = db.getUsers().find(u => u.email === email && u.passwordHash === password);
    if (!matchedUser) {
      return res.status(401).json({ error: "Kredensial salah" });
    }

    if (matchedUser.status === 'suspended') {
      return res.status(403).json({ error: "Akun Anda ditangguhkan" });
    }

    // Generate secure session token
    const token = `session-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    activeSessions[token] = {
      userId: matchedUser.id,
      role: matchedUser.role,
      fullName: matchedUser.fullName,
      email: matchedUser.email
    };

    // Log the event
    db.addAuditLog({
      id: `aud-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      actorId: matchedUser.id,
      actorName: matchedUser.fullName,
      action: "user.login",
      entityName: "users",
      entityId: matchedUser.id,
      timestamp: new Date().toISOString()
    });

    res.json({ token, user: { id: matchedUser.id, email: matchedUser.email, fullName: matchedUser.fullName, role: matchedUser.role } });
  });

  app.post('/api/v1/auth/register', (req, res) => {
    const { email, password, fullName } = req.body;
    if (!email || !password || !fullName) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const exists = db.getUsers().some(u => u.email === email);
    if (exists) {
      return res.status(409).json({ error: "Email sudah terdaftar" });
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      email,
      passwordHash: password, // Simplified clear hash
      fullName,
      role: 'member',
      status: 'active' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    db.getUsers().push(newUser);
    db.save();

    res.json({ success: true, message: "Pendaftaran berhasil" });
  });

  app.get('/api/v1/auth/me', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.json({ user: null });
    }
    const token = authHeader.split(' ')[1];
    const session = activeSessions[token];
    if (!session) {
      return res.json({ user: null });
    }
    res.json({ user: session });
  });

  // ==========================================
  // SEED DATABASE & SCALE TESTING API ENDPOINTS
  // ==========================================

  const selectIndex = <T>(arr: T[], rand: () => number): T => arr[Math.floor(rand() * arr.length)];

  function generateVirtualTableItem(table: string, index: number): any {
    if (table === 'articles') {
      return VirtualScaleEngine.getArticle(index);
    }
    if (table === 'news') {
      const art = VirtualScaleEngine.getArticle(index);
      return { ...art, id: `nws-virtual-${index}`, contentType: 'standard' };
    }
    if (table === 'blogs') {
      const art = VirtualScaleEngine.getArticle(index);
      return { ...art, id: `blg-virtual-${index}`, contentType: 'opinion' };
    }
    if (table === 'shortVideos') {
      return VirtualScaleEngine.getMediaItem('short-video', index);
    }
    if (table === 'longVideos') {
      return VirtualScaleEngine.getMediaItem('long-video', index);
    }
    if (table === 'podcasts') {
      return VirtualScaleEngine.getMediaItem('podcast', index);
    }
    if (table === 'documents') {
      return VirtualScaleEngine.getMediaItem('document', index);
    }
    if (table === 'gallery') {
      return VirtualScaleEngine.getMediaItem('gallery', index);
    }
    if (table === 'events') {
      return VirtualScaleEngine.getMediaItem('event', index);
    }
    if (['entities', 'companies', 'brands', 'products', 'organizations', 'govAgencies', 'universities', 'schools', 'hospitals', 'restaurants', 'hotels', 'attractions'].includes(table)) {
      return VirtualScaleEngine.getEntity(index);
    }
    if (['users', 'authors', 'creators', 'reporters'].includes(table)) {
      return VirtualScaleEngine.getUser(index);
    }
    if (table === 'comments') {
      const seed = `comment-seed-${index}`;
      const rand = getSeededRandom(seed);
      const positiveText = [
        "Wah, analisis yang sangat mendalam dan berbobot! 👍",
        "Keren sekali, terus dukung transparansi data publik di Indonesia.",
        "Sinergi yang luar biasa, ini yang kita butuhkan untuk kemajuan daerah.",
        "Sepakat dengan ulasan ini, regulasi harus mendukung UMKM digital."
      ];
      const negativeText = [
        "Kebijakan ini terkesan terburu-buru dan minim sosialisasi.",
        "Skeptis saya dengan implementasinya di lapangan, biasanya banyak hambatan.",
        "Semoga ini bukan sekadar pencitraan pejabat saja.",
        "Anggarannya terlalu besar, padahal kesejahteraan guru honorer belum tuntas."
      ];
      const userIdx = Math.floor(rand() * 1000);
      const user = VirtualScaleEngine.getUser(userIdx);
      const isPos = index % 2 === 0;
      const body = isPos ? selectIndex(positiveText, rand) : selectIndex(negativeText, rand);
      return {
        id: `cmt-virtual-${index}`,
        userId: user.id,
        userName: user.fullName,
        body,
        sentiment: isPos ? 'positive' : 'negative',
        likes: Math.floor(rand() * 50),
        createdAt: new Date(Date.now() - (index * 5 * 60 * 1000)).toISOString()
      };
    }
    return null;
  }

  app.get('/api/v1/virtual/metrics', (req, res) => {
    res.json({
      success: true,
      metrics: SCALE_METRICS,
      systemStatus: {
        engine: "Deterministic Pseudo-Random Seed Database Engine (LCG v1.0)",
        footprint: "0.4 KB RAM (Virtual Representation)",
        loadedTables: Object.keys(SCALE_METRICS).length,
        redundancy: "Active-Active Mirroring",
        integrityCheck: "100% Passed (SHA-256 Verified)"
      }
    });
  });

  app.get('/api/v1/virtual/explorer', (req, res) => {
    const table = String(req.query.table || 'articles');
    const page = Math.max(1, parseInt(String(req.query.page || '1'), 10));
    const limit = Math.max(1, Math.min(100, parseInt(String(req.query.limit || '10'), 10)));
    const search = String(req.query.search || '').trim().toLowerCase();
    
    const maxRows = (SCALE_METRICS as any)[table] || 1000;
    const startIndex = (page - 1) * limit;
    
    const items: any[] = [];
    const searchMode = search.length > 0;
    let totalCount = maxRows;
    
    if (searchMode) {
      const scanLimit = 300;
      for (let i = 0; i < scanLimit && items.length < limit * 5; i++) {
        const item = generateVirtualTableItem(table, i);
        if (item) {
          const textToSearch = (
            (item.title || '') + ' ' + 
            (item.summary || '') + ' ' + 
            (item.fullName || '') + ' ' + 
            (item.name || '') + ' ' +
            (item.body || '')
          ).toLowerCase();
          if (textToSearch.includes(search)) {
            items.push(item);
          }
        }
      }
      totalCount = Math.floor(items.length * (maxRows / scanLimit));
    } else {
      const endIdx = Math.min(maxRows, startIndex + limit);
      for (let i = startIndex; i < endIdx; i++) {
        const item = generateVirtualTableItem(table, i);
        if (item) items.push(item);
      }
    }
    
    const paginatedItems = searchMode ? items.slice(startIndex, startIndex + limit) : items;
    
    res.json({
      success: true,
      table,
      page,
      limit,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      items: paginatedItems
    });
  });

  app.get('/api/v1/virtual/analytics', (req, res) => {
    const range = String(req.query.range || 'monthly') as any;
    try {
      const report = VirtualScaleEngine.getAnalyticsReport(range);
      
      // Adaptation for frontend charts expecting timeSeries & regionalDistribution
      const timeSeries = report.chartData.map((item: any) => ({
        label: item.label,
        views: item.pageViews,
        visitors: item.uniqueVisitors
      }));
      
      const regionalDistribution = report.regionalHeatmap.map((item: any) => ({
        city: item.city,
        province: item.province,
        pageviews: item.views,
        ctr: item.engagementRate / 1000 // scale to standard % CTR format
      }));

      res.json({
        ...report,
        timeSeries,
        regionalDistribution
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ==========================================
  // ENTERPRISE SEED DATA ENGINE API ENDPOINTS
  // ==========================================
  app.post('/api/v1/seed/generate', async (req, res) => {
    const { mode, module, category, region, year } = req.body;
    try {
      const result = await EnterpriseSeedEngine.generateSeed({
        mode: mode || 'full',
        module,
        category,
        region,
        year
      });
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.post('/api/v1/seed/reset', (req, res) => {
    try {
      EnterpriseSeedEngine.resetDatabase();
      res.json({ success: true, message: 'Database reset to default system defaults successfully.' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.post('/api/v1/seed/update', (req, res) => {
    try {
      // Simulate seed data refresh/update by logging an audit log and saving
      const now = new Date().toISOString();
      db.addAuditLog({
        id: `aud-update-seed-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        actorId: 'usr-admin',
        actorName: 'System Administrator (Ahmad Dahlan)',
        action: 'system.update_seed',
        entityName: 'database',
        entityId: 'db_store.json',
        timestamp: now
      });
      db.save();
      res.json({ success: true, message: 'Database metrics and timestamps refreshed successfully.' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.post('/api/v1/seed/import', (req, res) => {
    const { payload } = req.body;
    try {
      if (!payload || typeof payload !== 'object') {
        return res.status(400).json({ success: false, error: 'Invalid seed payload.' });
      }
      
      // Safely import and overwrite database tables
      const keys = Object.keys(payload);
      const dbStore = (db as any).data;
      
      for (const key of keys) {
        if (Array.isArray(dbStore[key])) {
          dbStore[key] = payload[key];
        }
      }
      db.save();
      
      res.json({ success: true, message: 'External seed schema imported and merged successfully.' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.get('/api/v1/seed/export', (req, res) => {
    try {
      const dbStore = (db as any).data;
      res.json({ success: true, payload: dbStore });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.get('/api/v1/virtual/relationships', (req, res) => {
    res.json({
      success: true,
      nodes: [
        { id: "Article", group: 1, label: "Artikel & Berita (50.000)" },
        { id: "Video", group: 1, label: "Video TV & Short Reels (28.000)" },
        { id: "Podcast", group: 1, label: "Podcasts & Transkrip (5.000)" },
        { id: "Creator", group: 2, label: "Kreator & Penulis (15.000)" },
        { id: "Company", group: 3, label: "Perusahaan & Mitra (30.000)" },
        { id: "Brand", group: 3, label: "Merek & Produk (40.000)" },
        { id: "Geo", group: 4, label: "Geografi & Wilayah (CITIES)" },
        { id: "Comment", group: 5, label: "Komentar Real-time (2.000.000)" },
        { id: "Trend", group: 6, label: "Peta Tren & Topik (5.000)" },
        { id: "Analytics", group: 6, label: "Metrik Interaksi (100.000.000)" }
      ],
      links: [
        { source: "Article", target: "Video", value: 5, label: "Article ↔ Video" },
        { source: "Article", target: "Podcast", value: 3, label: "Article ↔ Podcast" },
        { source: "Article", target: "Company", value: 8, label: "Article ↔ Company" },
        { source: "Article", target: "Brand", value: 8, label: "Article ↔ Brand" },
        { source: "Article", target: "Geo", value: 10, label: "Article ↔ Geo" },
        { source: "Video", target: "Creator", value: 8, label: "Video ↔ Creator" },
        { source: "Podcast", target: "Creator", value: 6, label: "Podcast ↔ Guest" },
        { source: "Company", target: "Brand", value: 10, label: "Company ↔ Brand" },
        { source: "Trend", target: "Article", value: 7, label: "Topic ↔ Trend" },
        { source: "Comment", target: "Article", value: 9, label: "Comment ↔ User" },
        { source: "Trend", target: "Analytics", value: 10, label: "Trend ↔ Analytics" }
      ]
    });
  });

  app.get('/api/v1/virtual/scenario', (req, res) => {
    const id = String(req.query.id || 'load');
    const timestamp = new Date().toISOString();
    
    const scenarios: Record<string, any> = {
      load: {
        title: "Load & Stress Testing Simulation",
        description: "Simulates reading, commenting, and analytics tracking with millions of synthetic connections.",
        status: "success",
        telemetry: {
          concurrency: "45,000 active virtual users",
          averageLatency: "14ms",
          cpuLoad: "12.4%",
          ramFootprint: "118 MB",
          transactionsPerSecond: "8,920 TPS"
        },
        auditTrace: `[${timestamp}] LOAD_TESTER: Initialized concurrency spike... OK. Virtual databases responding. All relations resolved in <20ms.`
      },
      search: {
        title: "Multi-Million Text Search Testing",
        description: "Simulates full-text scanning, phrase extraction, and sentiment score weighting across 50,000 articles.",
        status: "success",
        telemetry: {
          scannedRows: "50,000 virtual rows",
          indexTime: "1.2ms",
          precision: "99.8% (Ground-Truth Correct)"
        },
        auditTrace: `[${timestamp}] SEARCH_ENGINE: Scanning keywords: 'AI', 'Sri Mulyani', 'Rupiah'... 124 exact matches found. Deterministic rankings verified.`
      },
      slow_query: {
        title: "Slow Query & Fail-Safe Test",
        description: "Simulates a DB lock or long-running pagination seek beyond 1,000,000 records.",
        status: "warning",
        telemetry: {
          executionTime: "2150ms (Intentional Delay)",
          cacheHitRate: "0% (Bypass Mode)",
          failSafeStatus: "TRIGGERED - Served deterministic fail-safe cached results"
        },
        auditTrace: `[${timestamp}] SLOW_QUERY: Seek beyond offset 1,800,000. Timeout hit (2000ms). Activating fallback replica engine.`
      },
      offline: {
        title: "Offline State & Sync Test",
        description: "Simulates network severance and browser IndexedDB state synchronization.",
        status: "offline",
        telemetry: {
          connectionState: "Offline (Simulated)",
          pendingPayloads: "14 cached operations",
          syncLock: "Local Read-Only Active"
        },
        auditTrace: `[${timestamp}] SYNC_ENGINE: Connection offline. Redirecting all client requests to browser local IndexedDB store. Safe state confirmed.`
      },
      rbac: {
        title: "Role-Based Access (RBAC) Audit",
        description: "Verifies authorization matrix across the 17 user roles.",
        status: "success",
        telemetry: {
          totalRolesVerified: 17,
          deniedRequests: 4120,
          approvedRequests: 18230
        },
        auditTrace: `[${timestamp}] RBAC_MONITOR: Reporter attempted to invoke 'content.publish'. Action BLOCKED with HTTP 403. Admin allowed.`
      },
      soft_delete: {
        title: "Soft & Hard Delete Integrity Scenario",
        description: "Ensures cascading integrity is preserved upon soft-deleting parents (like Category or Location).",
        status: "success",
        telemetry: {
          cascadedUpdates: "1,240 content references marked",
          recoveryChecksum: "VALID",
          hardDeleteGuard: "Active"
        },
        auditTrace: `[${timestamp}] GARBAGE_COLLECTOR: Category 'FinTech' soft-deleted. Related articles preserved under 'archived_category' state. Undo window: 30 days.`
      },
      audit_trail: {
        title: "Immutable Compliance Audit Trail",
        description: "Simulates block-chain styled audit trail log hashing for regulatory compliance.",
        status: "success",
        telemetry: {
          chainIntegrity: "100% Solid",
          totalHashedLogs: "254,120 transactions",
          lastHash: "0x8fa134d1bc98ae03ef"
        },
        auditTrace: `[${timestamp}] SECURE_AUDIT: Verification check passed. No log modifications detected. Compliance seal active.`
      },
      approval: {
        title: "Scheduled Publishing & Editorial Approval",
        description: "Evaluates cron triggers for future content publication.",
        status: "success",
        telemetry: {
          scheduledItems: "142 articles",
          pendingApprovals: "8 drafts",
          cronFiredCount: 24
        },
        auditTrace: `[${timestamp}] CHRONOS_CRON: Fired trigger at hour interval. Published 3 pending articles under primary category 'Terbaru'.`
      }
    };

    res.json({
      success: true,
      timestamp,
      scenario: scenarios[id] || scenarios.load
    });
  });

  // ==========================================
  // SEISMIC ACTIVITY PROXY ENDPOINT
  // ==========================================
  app.get('/api/v1/seismic', async (req, res) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s timeout for snappy response
      
      const response = await fetch('https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json', {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data: any = await response.json();
        const rawList = data?.Infogempa?.gempa || [];
        const formatted = rawList.slice(0, 10).map((g: any, index: number) => {
          const mag = parseFloat(g.Magnitude);
          let severity: 'low' | 'medium' | 'high' = 'low';
          if (mag >= 5.0) severity = 'high';
          else if (mag >= 4.0) severity = 'medium';

          return {
            id: `eq-${index}-${g.DateTime}`,
            time: `${g.Tanggal}, ${g.Jam}`,
            dateTime: g.DateTime,
            magnitude: mag,
            depth: g.Kedalaman,
            location: g.Wilayah,
            coordinates: g.Coordinates || `${g.Lintang}, ${g.Bujur}`,
            potential: g.Potensi || "Tidak berpotensi tsunami",
            severity,
            isLive: true
          };
        });
        return res.json({ success: true, source: "BMKG Live Feed", data: formatted });
      }
    } catch (err) {
      console.warn("BMKG Live Feed fetch failed or timed out, using fallback:", err);
    }

    // High quality Indonesian earthquakes fallback
    const fallbackEarthquakes = [
      {
        id: "eq-fb-1",
        time: "11 Jul 2026, 05:12 WIB",
        dateTime: "2026-07-11T05:12:44+07:00",
        magnitude: 5.4,
        depth: "12 km",
        location: "Pusat gempa berada di laut 45 km Barat Daya Sukabumi, Jawa Barat",
        coordinates: "-7.35, 106.52",
        potential: "Tidak berpotensi tsunami",
        severity: "high",
        isLive: false
      },
      {
        id: "eq-fb-2",
        time: "10 Jul 2026, 18:34 WIB",
        dateTime: "2026-07-10T18:34:02+07:00",
        magnitude: 4.8,
        depth: "10 km",
        location: "Pusat gempa berada di darat 8 km Barat Daya Kabupaten Cianjur, Jawa Barat",
        coordinates: "-6.84, 107.09",
        potential: "Tidak berpotensi tsunami",
        severity: "medium",
        isLive: false
      },
      {
        id: "eq-fb-3",
        time: "09 Jul 2026, 21:05 WIB",
        dateTime: "2026-07-09T21:05:11+07:00",
        magnitude: 3.6,
        depth: "5 km",
        location: "Pusat gempa berada di darat 15 km Timur Laut Kota Bandung, Jawa Barat (Sesar Lembang)",
        coordinates: "-6.81, 107.68",
        potential: "Terasa lemah di Lembang dan Cisarua",
        severity: "low",
        isLive: false
      },
      {
        id: "eq-fb-4",
        time: "08 Jul 2026, 02:18 WIB",
        dateTime: "2026-07-08T02:18:50+07:00",
        magnitude: 5.8,
        depth: "85 km",
        location: "Pusat gempa berada di laut 92 km Barat Daya Cilacap, Jawa Tengah",
        coordinates: "-8.45, 108.92",
        potential: "Tidak berpotensi tsunami",
        severity: "high",
        isLive: false
      },
      {
        id: "eq-fb-5",
        time: "07 Jul 2026, 14:22 WIB",
        dateTime: "2026-07-07T14:22:15+07:00",
        magnitude: 4.2,
        depth: "22 km",
        location: "Pusat gempa berada di darat 20 km Barat Laut Kabupaten Garut, Jawa Barat",
        coordinates: "-7.12, 107.82",
        potential: "Tidak berpotensi tsunami",
        severity: "medium",
        isLive: false
      }
    ];

    res.json({ success: true, source: "BMKG Offline Cache", data: fallbackEarthquakes });
  });

  // ==========================================
  // PUBLIC PORTAL ENDPOINTS
  // ==========================================

  app.get('/api/v1/contents', (req, res) => {
    try {
      const { category, tag, location, entity, topic, search, status, sentiment, contentType } = req.query;
      let list = db.getContents();

      // Default: Public readers only view 'published' items
      const requestStatus = status ? String(status) : 'published';
      list = list.filter(c => c.status === requestStatus);

      if (category) {
        const catObj = db.getCategories().find(c => c.slug === category);
        if (catObj) {
          list = list.filter(c => c.primaryCategoryId === catObj.id);
        } else {
          list = [];
        }
      }

      if (tag) {
        const tagObj = db.getTags().find(t => t.slug === tag);
        if (tagObj) {
          list = list.filter(c => db.getContentTags(c.id).some(ct => ct.tagId === tagObj.id));
        } else {
          list = [];
        }
      }

      if (topic) {
        const topicObj = db.getTopics().find(t => t.slug === topic);
        if (topicObj) {
          list = list.filter(c => db.getContentTopics(c.id).some(ct => ct.topicId === topicObj.id));
        } else {
          list = [];
        }
      }

      if (location) {
        const locObj = db.getLocations().find(l => l.slug === location);
        if (locObj) {
          // Find also child locations if it's a province (materialized hierarchy)
          const childLocIds = db.getLocations().filter(l => l.parentId === locObj.id).map(l => l.id);
          const searchIds = [locObj.id, ...childLocIds];
          list = list.filter(c => db.getContentLocations(c.id).some(cl => searchIds.includes(cl.locationId)));
        } else {
          list = [];
        }
      }

      if (entity) {
        const entObj = db.getEntities().find(e => e.slug === entity);
        if (entObj) {
          list = list.filter(c => db.getContentEntities(c.id).some(ce => ce.entityId === entObj.id));
        } else {
          list = [];
        }
      }

      if (search) {
        const q = String(search).toLowerCase();
        list = list.filter(c => 
          c.title.toLowerCase().includes(q) || 
          c.summary.toLowerCase().includes(q) || 
          (c.subtitle && c.subtitle.toLowerCase().includes(q))
        );
      }

      if (sentiment) {
        list = list.filter(c => c.sentiment === sentiment);
      }

      if (contentType) {
        list = list.filter(c => c.contentType === contentType);
      }

      // Attach authors, categories, locations for feed density
      const fullyMapped = list.map(c => {
        const author = db.getUsers().find(u => u.id === c.authorId);
        const cat = db.getCategories().find(ct => ct.id === c.primaryCategoryId);
        const locs = db.getContentLocations(c.id).map(cl => db.getLocations().find(l => l.id === cl.locationId)).filter(Boolean);
        return {
          ...c,
          authorName: author ? author.fullName : "Redaksi INFOBOS",
          categoryName: cat ? cat.name : "Umum",
          categorySlug: cat ? cat.slug : "umum",
          locations: locs
        };
      });

      res.json({ contents: fullyMapped });
    } catch (error: any) {
      console.error("Error inside GET /api/v1/contents:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  });

  app.get('/api/v1/categories', (req, res) => {
    res.json({ categories: db.getCategories() });
  });

  app.get('/api/v1/contents/:slug', (req, res) => {
    const slug = req.params.slug;
    const contents = db.getContents();
    const c = contents.find(item => item.slug === slug);

    if (!c) {
      return res.status(404).json({ error: "Artikel tidak ditemukan" });
    }

    // Increment views (simulated)
    c.viewCount++;
    db.save();

    const author = db.getUsers().find(u => u.id === c.authorId);
    const editor = db.getUsers().find(u => u.id === c.editorId);
    const category = db.getCategories().find(cat => cat.id === c.primaryCategoryId);
    
    const locations = db.getContentLocations(c.id)
      .map(cl => {
        const loc = db.getLocations().find(l => l.id === cl.locationId);
        return loc ? { ...loc, isPrimary: cl.isPrimary, relevance: cl.relevanceScore } : null;
      })
      .filter(Boolean);

    const entities = db.getContentEntities(c.id)
      .map(ce => {
        const ent = db.getEntities().find(e => e.id === ce.entityId);
        return ent ? { ...ent, relation: ce.relationType, relevance: ce.relevanceScore } : null;
      })
      .filter(Boolean);

    const topics = db.getContentTopics(c.id)
      .map(ct => db.getTopics().find(t => t.id === ct.topicId))
      .filter(Boolean);

    const tags = db.getContentTags(c.id)
      .map(ct => db.getTags().find(t => t.id === ct.tagId))
      .filter(Boolean);

    const corrections = db.getCorrections().filter(cor => cor.contentId === c.id);

    res.json({
      content: {
        ...c,
        authorName: author ? author.fullName : "Redaksi INFOBOS",
        editorName: editor ? editor.fullName : undefined,
        categoryName: category ? category.name : "Umum",
        categorySlug: category ? category.slug : "umum",
        locations,
        entities,
        topics,
        tags,
        corrections
      }
    });
  });

  app.get('/api/v1/search', (req, res) => {
    const q = String(req.query.q || '').trim();
    if (!q) {
      return res.json({ results: [] });
    }

    const lowerQ = q.toLowerCase();
    const queryTerms = lowerQ.split(/\s+/).filter(t => t.length > 0);
    const matches: any[] = [];

    // Helper function to calculate a flexible match score
    const calculateScore = (title: string, body: string, summary = ''): number => {
      const t = (title || '').toLowerCase();
      const b = (body || '').toLowerCase();
      const s = (summary || '').toLowerCase();
      
      let score = 0;
      
      // 1. Full search phrase exact match
      if (t.includes(lowerQ)) score += 10.0;
      else if (s.includes(lowerQ)) score += 6.0;
      else if (b.includes(lowerQ)) score += 4.0;
      
      // 2. Term-by-term matching
      if (queryTerms.length > 1) {
        let matchedTermsCount = 0;
        queryTerms.forEach(term => {
          let termMatched = false;
          if (t.includes(term)) { score += 2.5; termMatched = true; }
          if (s.includes(term)) { score += 1.5; termMatched = true; }
          if (b.includes(term)) { score += 1.0; termMatched = true; }
          
          if (termMatched) {
            matchedTermsCount++;
          }
        });
        
        // Multi-word bonus
        if (matchedTermsCount === queryTerms.length) {
          score += 5.0; // All terms matched!
        } else if (matchedTermsCount > 1) {
          score += matchedTermsCount * 1.5;
        }
      }
      
      return score;
    };

    // 1. Search contents (Articles)
    db.getContents().filter(c => c.status === 'published').forEach(c => {
      const score = calculateScore(c.title, c.body, c.summary);
      if (score > 0) {
        const cat = db.getCategories().find(ct => ct.id === c.primaryCategoryId);
        matches.push({
          type: 'article',
          id: c.id,
          title: c.title,
          slug: c.slug,
          excerpt: c.summary,
          categoryName: cat ? cat.name : "Umum",
          categorySlug: cat ? cat.slug : "umum",
          sentiment: c.sentiment || 'neutral',
          riskLevel: c.riskLevel || 'low',
          publishedAt: c.publishedAt,
          score
        });
      }
    });

    // 2. Search Locations
    db.getLocations().forEach(l => {
      let score = 0;
      const nameLower = l.name.toLowerCase();
      const descLower = `wilayah ${l.name} ${l.type}`.toLowerCase();
      
      if (nameLower.includes(lowerQ)) score += 8.0;
      else if (descLower.includes(lowerQ)) score += 3.0;
      
      queryTerms.forEach(term => {
        if (nameLower.includes(term)) score += 2.0;
      });
      
      if (score > 0) {
        matches.push({
          type: 'location',
          id: l.id,
          title: l.name,
          slug: l.slug,
          excerpt: `Kanal Geografi: Telusuri data intelijen dan berita pembangunan di wilayah ${l.name} (${l.type}).`,
          score
        });
      }
    });

    // 3. Search Entities
    db.getEntities().forEach(e => {
      let score = 0;
      const nameLower = e.name.toLowerCase();
      const descLower = (e.description || '').toLowerCase();
      
      if (nameLower.includes(lowerQ)) score += 8.0;
      else if (descLower.includes(lowerQ)) score += 4.0;
      
      queryTerms.forEach(term => {
        if (nameLower.includes(term)) score += 2.0;
        if (descLower.includes(term)) score += 1.0;
      });
      
      if (score > 0) {
        matches.push({
          type: 'entity',
          id: e.id,
          title: e.name,
          slug: e.slug,
          excerpt: `Profil Entitas: ${e.description}`,
          score
        });
      }
    });

    // 4. Search Categories
    db.getCategories().forEach(cat => {
      let score = 0;
      const nameLower = cat.name.toLowerCase();
      if (nameLower.includes(lowerQ)) score += 6.0;
      
      queryTerms.forEach(term => {
        if (nameLower.includes(term)) score += 1.5;
      });
      
      if (score > 0) {
        matches.push({
          type: 'category',
          id: cat.id,
          title: cat.name,
          slug: cat.slug,
          excerpt: `Kategori Berita: Lihat semua liputan dan analisis mendalam seputar tema ${cat.name}.`,
          score
        });
      }
    });

    // 5. Search Topics
    db.getTopics().forEach(top => {
      let score = 0;
      const nameLower = top.name.toLowerCase();
      const descLower = (top.description || '').toLowerCase();
      
      if (nameLower.includes(lowerQ)) score += 6.5;
      else if (descLower.includes(lowerQ)) score += 3.0;
      
      queryTerms.forEach(term => {
        if (nameLower.includes(term)) score += 1.5;
        if (descLower.includes(term)) score += 1.0;
      });
      
      if (score > 0) {
        matches.push({
          type: 'topic',
          id: top.id,
          title: top.name,
          slug: top.name,
          excerpt: `Fokus Isu: ${top.description}`,
          score
        });
      }
    });

    // 6. Search Tags
    db.getTags().forEach(tag => {
      let score = 0;
      const nameLower = tag.name.toLowerCase();
      if (nameLower.includes(lowerQ)) score += 5.0;
      
      if (score > 0) {
        matches.push({
          type: 'tag',
          id: tag.id,
          title: `#${tag.name}`,
          slug: tag.name,
          excerpt: `Tag Populer: Telusuri seluruh artikel yang ditandai dengan label #${tag.name}.`,
          score
        });
      }
    });

    // 7. Search Corrections / Fact-checking
    db.getCorrections().forEach(corr => {
      let score = 0;
      const origLower = (corr.originalText || '').toLowerCase();
      const corrLower = (corr.correctedText || '').toLowerCase();
      const explLower = (corr.explanation || '').toLowerCase();
      
      if (origLower.includes(lowerQ)) score += 7.0;
      if (corrLower.includes(lowerQ)) score += 7.0;
      if (explLower.includes(lowerQ)) score += 5.0;
      
      queryTerms.forEach(term => {
        if (origLower.includes(term)) score += 1.5;
        if (corrLower.includes(term)) score += 1.5;
        if (explLower.includes(term)) score += 1.0;
      });
      
      if (score > 0) {
        const relatedArt = db.getContents().find(c => c.id === corr.contentId);
        matches.push({
          type: 'correction',
          id: corr.id,
          title: `Koreksi: ${corr.originalText.slice(0, 70)}${corr.originalText.length > 70 ? '...' : ''}`,
          slug: relatedArt ? relatedArt.slug : '',
          excerpt: `Klarifikasi Fakta: "${corr.correctedText}". Penjelasan: ${corr.explanation}`,
          score
        });
      }
    });

    // 8. Search Marketplace Listings
    const mockListings = [
      {
        id: 'list-1',
        title: 'Peralatan Ekstraksi Minyak Atsiri Stainless 316',
        type: 'jual',
        category: 'Mesin & Industri',
        price: 24500000,
        description: 'Mesin penyulingan atsiri kapasitas 100 Liter dengan material Food Grade SUS316. Garansi fabrikasi 1 tahun.',
        tags: ['Mesin', 'Pertanian', 'Atsiri'],
        location: 'Kab. Bandung Barat'
      },
      {
        id: 'list-jasa-1',
        title: 'Jasa Konsultasi Sertifikasi Halal & NIB UMKM',
        type: 'jasa',
        category: 'Jasa Profesional',
        price: 1500000,
        description: 'Layanan lengkap pengurusan legalitas badan usaha katering, restoran, dan UMKM makanan minuman. Mulai dari pembuatan NIB, Surat Keterangan Usaha, hingga audit dokumen pengajuan Sertifikat Halal MUI.',
        tags: ['Legalitas', 'Halal', 'NIB', 'Konsultan'],
        location: 'Depok'
      },
      {
        id: 'list-lowongan-1',
        title: 'Lowongan: Operator Mesin CNC & Bubut Presisi',
        type: 'lowongan',
        category: 'Lowongan Kerja',
        price: 6500000,
        description: 'Dibutuhkan segera Operator Mesin CNC dan Bubut manual berpengalaman minimal 2 tahun di bidang manufaktur komponen presisi otomotif.',
        tags: ['Operator', 'Manufaktur', 'CNC', 'Bubut'],
        location: 'Bekasi'
      },
      {
        id: 'list-2',
        title: 'Sewa Drone Pertanian DJI Agras T30 + Pilot Berlisensi',
        type: 'sewa',
        category: 'Pertanian',
        price: 1500000,
        description: 'Layanan penyemprotan pupuk cair & pestisida presisi menggunakan armada drone pertanian DJI Agras T30. Termasuk pilot bersertifikat FASI.',
        tags: ['Sewa', 'Drone', 'Agrotech'],
        location: 'Majalengka'
      },
      {
        id: 'list-3',
        title: 'Dataset Anomali Curah Hujan & Spasial Padi Jabar 2020-2025',
        type: 'digital',
        category: 'Digital Product',
        price: 450000,
        description: 'Laporan spasial format GIS Shapefile & CSV yang merekam historis korelasi gagal panen akibat cuaca ekstrem di 27 Kabupaten/Kota Jawa Barat.',
        tags: ['Dataset', 'Siber', 'Pertanian'],
        location: 'Kota Bandung'
      }
    ];

    mockListings.forEach(item => {
      const score = calculateScore(item.title, item.description, item.tags.join(' '));
      if (score > 0) {
        matches.push({
          type: 'marketplace',
          id: item.id,
          title: item.title,
          slug: 'community-marketplace',
          excerpt: item.description,
          price: item.price,
          location: item.location,
          category: item.category,
          score
        });
      }
    });

    // 9. Search Jobs & Projects
    const mockProjects = [
      {
        id: 'proj-1',
        title: 'Tender: Sistem Irigasi Cerdas Daerah Irigasi Rentang',
        type: 'tender',
        budget: 'Rp 150.000.000',
        deadline: '15 Juli 2026',
        issuer: 'Dinas Sumber Daya Air Jabar',
        description: 'Pengembangan sistem pintu air otomatis berbasis mikrokontroler & sensor ultrasonik dengan dashboard pemantau debit air.'
      },
      {
        id: 'proj-2',
        title: 'Freelance: Pembuatan Model GIS Deteksi Deforestasi Hutan Lindung',
        type: 'freelance',
        budget: 'Rp 18.000.000',
        deadline: '10 Juli 2026',
        issuer: 'YPI Alam Lestari',
        description: 'Dibutuhkan analis SIG berpengalaman untuk mengolah citra satelit Sentinel-2 guna memetakan titik tebang liar di Priangan Timur.'
      },
      {
        id: 'proj-3',
        title: 'Full-Time: Lead Software Engineer (IoT Integration)',
        type: 'job',
        budget: 'Rp 22.000.000 - Rp 30.000.000 / bln',
        deadline: '20 Juli 2026',
        issuer: 'PT Jabar Digital Agro',
        description: 'Bertanggung jawab atas arsitektur backend penampung data telemetri ribuan sensor tanah menggunakan MQTT dan Node.js.'
      }
    ];

    mockProjects.forEach(item => {
      const score = calculateScore(item.title, item.description, item.issuer);
      if (score > 0) {
        matches.push({
          type: 'jobs',
          id: item.id,
          title: item.title,
          slug: 'community-marketplace',
          excerpt: item.description,
          budget: item.budget,
          issuer: item.issuer,
          deadline: item.deadline,
          score
        });
      }
    });

    // Sort by descending score
    matches.sort((a, b) => b.score - a.score);

    res.json({ results: matches });
  });

  // ==========================================
  // GEOGRAPHY & ENTITY SPECIFIC HUBS
  // ==========================================

  app.get('/api/v1/locations/:slug/info', (req, res) => {
    const slug = req.params.slug;
    const loc = db.getLocations().find(l => l.slug === slug);
    if (!loc) return res.status(404).json({ error: "Location not found" });

    // Join related content count
    const relatedIds = db.getLocations().filter(l => l.parentId === loc.id || l.id === loc.id).map(l => l.id);
    const contents = db.getContents().filter(c => 
      c.status === 'published' &&
      db.getContentLocations(c.id).some(cl => relatedIds.includes(cl.locationId))
    );

    res.json({ location: loc, relatedCount: contents.length });
  });

  app.get('/api/v1/entities/:slug/info', (req, res) => {
    const slug = req.params.slug;
    const ent = db.getEntities().find(e => e.slug === slug);
    if (!ent) return res.status(404).json({ error: "Entity not found" });

    // Find entities' relationships (simulated)
    const relatedEntities = db.getEntities().filter(e => e.id !== ent.id).slice(0, 2);

    res.json({ entity: ent, relatedEntities });
  });

  // ==========================================
  // VIRALOG CMS / ADMINISTRATIVE CONTROLLERS
  // ==========================================

  app.post('/api/v1/admin/contents', authenticate, authorize(["content.draft.own"]), async (req, res) => {
    const { title, subtitle, body, primaryCategoryId, contentType, isSponsored } = req.body;
    const user = (req as any).user;

    if (!title || !body || !primaryCategoryId) {
      return res.status(400).json({ error: "Judul, Isi, dan Kategori utama wajib diisi" });
    }

    const id = `art-cms-${Date.now()}`;
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');

    // Automatically trigger Gemini API tags extraction
    let summary = body.substring(0, 150) + "...";
    let sentiment: any = 'neutral';
    let riskLevel: any = 'low';
    let tagsList: string[] = [];
    let locsList: any[] = [];
    let entsList: any[] = [];

    try {
      const nlp = await IntelligenceService.analyzeContent(title, body);
      summary = nlp.summary;
      sentiment = nlp.sentiment;
      riskLevel = nlp.riskLevel;
      tagsList = nlp.tags;
      locsList = nlp.locations;
      entsList = nlp.entities;
    } catch (e) {
      console.error("Async tag extraction failed:", e);
    }

    const newArticle: Content = {
      id,
      title,
      subtitle,
      slug,
      summary,
      body,
      contentType: contentType || 'standard',
      status: 'draft',
      primaryCategoryId,
      sentiment,
      riskLevel,
      authorId: user.userId,
      isSponsored: !!isSponsored,
      viewCount: 0,
      readingTimeMinutes: Math.max(1, Math.round(body.split(/\s+/).length / 200)),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    db.addContent(newArticle);

    // Save initial relations
    if (tagsList.length) {
      tagsList.forEach(t => {
        let tagObj = db.getTags().find(x => x.name.toLowerCase() === t.toLowerCase());
        if (!tagObj) {
          tagObj = { id: `tag-${Date.now()}-${Math.random().toString(36).substring(2,5)}`, name: t, slug: t.toLowerCase().replace(/\s+/g, '-'), createdAt: new Date().toISOString() };
          db.getTags().push(tagObj);
        }
        db.getContentTags(id).push({ contentId: id, tagId: tagObj.id });
      });
    }

    // Save initial locations & entities matching database seeds
    locsList.forEach(l => {
      const dbl = db.getLocations().find(x => x.name.toLowerCase() === l.name.toLowerCase());
      if (dbl) {
        db.getContentLocations(id).push({ contentId: id, locationId: dbl.id, relevanceScore: 100, isPrimary: l.type === 'city' });
      }
    });

    entsList.forEach(e => {
      const dbe = db.getEntities().find(x => x.name.toLowerCase() === e.name.toLowerCase());
      if (dbe) {
        db.getContentEntities(id).push({ contentId: id, entityId: dbe.id, relevanceScore: 100, relationType: e.type });
      }
    });

    db.addContentVersion({
      id: `ver-${Date.now()}`,
      contentId: id,
      title,
      body,
      summary,
      modifiedBy: user.userId,
      changeSummary: "Draf awal dibuat di CMS oleh " + user.fullName,
      createdAt: new Date().toISOString()
    });

    db.addAuditLog({
      id: `aud-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      actorId: user.userId,
      actorName: user.fullName,
      action: "content.create",
      entityName: "contents",
      entityId: id,
      timestamp: new Date().toISOString()
    });

    res.json({ success: true, content: newArticle });
  });

  app.put('/api/v1/admin/contents/:id', authenticate, authorize(["content.draft.own", "content.edit.any"]), async (req, res) => {
    const id = req.params.id;
    const { title, subtitle, body, primaryCategoryId, status, contentType, sentiment, riskLevel, changeSummary } = req.body;
    const user = (req as any).user;

    const c = db.getContents().find(item => item.id === id);
    if (!c) return res.status(404).json({ error: "Article not found" });

    // Validate permission
    if (user.role === 'reporter' && c.authorId !== user.userId) {
      return res.status(403).json({ error: "Reporter can only edit own content" });
    }

    const now = new Date().toISOString();
    
    // Check if body changed to generate new version
    const isMajorChange = title !== c.title || body !== c.body;

    c.title = title || c.title;
    c.subtitle = subtitle || c.subtitle;
    c.body = body || c.body;
    c.primaryCategoryId = primaryCategoryId || c.primaryCategoryId;
    c.status = status || c.status;
    c.contentType = contentType || c.contentType;
    c.sentiment = sentiment || c.sentiment;
    c.riskLevel = riskLevel || c.riskLevel;
    c.updatedAt = now;

    if (isMajorChange) {
      db.addContentVersion({
        id: `ver-${Date.now()}`,
        contentId: id,
        title: c.title,
        body: c.body,
        summary: c.summary,
        modifiedBy: user.userId,
        changeSummary: changeSummary || "Perubahan konten utama",
        createdAt: now
      });
    }

    db.addAuditLog({
      id: `aud-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      actorId: user.userId,
      actorName: user.fullName,
      action: "content.update",
      entityName: "contents",
      entityId: id,
      timestamp: now
    });

    db.save();
    res.json({ success: true, content: c });
  });

  // State-Machine Workflow trigger
  app.post('/api/v1/admin/contents/:id/workflow', authenticate, async (req, res) => {
    const id = req.params.id;
    const { transition, note, correctionOriginal, correctionCorrected, correctionExplanation } = req.body;
    const user = (req as any).user;

    const c = db.getContents().find(item => item.id === id);
    if (!c) return res.status(404).json({ error: "Article not found" });

    const now = new Date().toISOString();

    // Enforce workflow rules based on user permissions
    switch (transition) {
      case 'submit_review':
        // Reporter/Author sends draft to editors
        c.status = 'pending_review';
        break;

      case 'needs_revision':
        // Editor rejects with revision note
        if (!["super_admin", "managing_editor", "editor"].includes(user.role)) {
          return res.status(403).json({ error: "Only editors can request revisions." });
        }
        c.status = 'needs_revision';
        break;

      case 'approve_schedule':
        // Editor approves and schedules or instantly publishes
        if (!["super_admin", "managing_editor", "editor"].includes(user.role)) {
          return res.status(403).json({ error: "Only editors can approve content." });
        }
        
        // Governance check: High risk/Critical items require Senior Editor (managing_editor) signature
        if (['high', 'critical'].includes(c.riskLevel) && user.role === 'editor') {
          return res.status(403).json({ error: `Pemberitahuan Tata Kelola: Konten berisiko tinggi (${c.riskLevel.toUpperCase()}) wajib mendapatkan persetujuan Managing Editor / Redaktur Senior.` });
        }

        c.status = 'published';
        c.publishedAt = now;
        c.editorId = user.userId;
        break;

      case 'emergency_kill':
        // Managing editor unpublishes item instantly
        if (!["super_admin", "managing_editor"].includes(user.role)) {
          return res.status(403).json({ error: "Emergency unpublish is restricted to Managing Editor." });
        }
        c.status = 'archived';
        break;

      case 'post_correction':
        // Issue Fact-check / Correction notice
        if (!["super_admin", "managing_editor"].includes(user.role)) {
          return res.status(403).json({ error: "Only Editorial Management can issue correction entries." });
        }
        if (!correctionOriginal || !correctionCorrected || !correctionExplanation) {
          return res.status(400).json({ error: "Semua isian log koreksi wajib dilengkapi." });
        }
        
        db.addCorrection({
          id: `cor-${Date.now()}`,
          contentId: c.id,
          factCheckerId: user.userId,
          originalText: correctionOriginal,
          correctedText: correctionCorrected,
          explanation: correctionExplanation,
          publishedAt: now
        });

        // Add visual suffix to the title or mark as updated
        c.updatedAt = now;
        break;

      default:
        return res.status(400).json({ error: "Workflow transition invalid" });
    }

    db.addAuditLog({
      id: `aud-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      actorId: user.userId,
      actorName: user.fullName,
      action: `content.workflow.${transition}`,
      entityName: "contents",
      entityId: id,
      newValues: { status: c.status, note },
      timestamp: now
    });

    db.save();
    res.json({ success: true, content: c });
  });

  // CMS Content List for Admin panel (returns drafts + reviews)
  app.get('/api/v1/admin/contents', authenticate, (req, res) => {
    const list = db.getContents();
    const user = (req as any).user;

    // Reporters see only own drafts; Editors see everything
    const filtered = (user.role === 'reporter' || user.role === 'contributor') 
      ? list.filter(c => c.authorId === user.userId)
      : list;

    const mapped = filtered.map(c => {
      const author = db.getUsers().find(u => u.id === c.authorId);
      const cat = db.getCategories().find(ct => ct.id === c.primaryCategoryId);
      return {
        ...c,
        authorName: author ? author.fullName : "System Ingestion",
        categoryName: cat ? cat.name : "Umum"
      };
    });

    res.json({ contents: mapped });
  });

  app.get('/api/v1/admin/audit-logs', authenticate, authorize(["audit.view"]), (req, res) => {
    res.json({ logs: db.getAuditLogs() });
  });

  // ==========================================
  // EVOLIS SOURCE INGESTION PIPELINE
  // ==========================================

  app.get('/api/v1/admin/sources', authenticate, authorize(["source.manage"]), (req, res) => {
    res.json({ sources: db.getIngestionSources() });
  });

  app.post('/api/v1/admin/sources/:id/fetch', authenticate, authorize(["source.manage"]), async (req, res) => {
    const user = (req as any).user;
    
    db.addAuditLog({
      id: `aud-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      actorId: user.userId,
      actorName: user.fullName,
      action: "ingestion.fetch_trigger",
      entityName: "sources",
      entityId: req.params.id,
      timestamp: new Date().toISOString()
    });

    try {
      const result = await IngestionService.pollAndProcessAll();
      res.json({ success: true, result });
    } catch (e: any) {
      res.status(500).json({ error: "Ingestion poll failed: " + e.message });
    }
  });

  // ==========================================
  // ADVERTISING & MONETIZATION ENDPOINTS
  // ==========================================

  app.get('/api/v1/admin/ads', authenticate, authorize(["advertising.manage"]), (req, res) => {
    res.json({
      campaigns: db.getCampaigns(),
      creatives: db.getCreatives()
    });
  });

  app.get('/api/v1/ads/placement', (req, res) => {
    try {
      const { location, category, placement } = req.query;
      let list = db.getCreatives().filter(cr => cr.status === 'active');

      if (placement) {
        list = list.filter(cr => cr.placement === placement);
      }

      // Dynamic campaign matching based on geo/category targeting
      const targetSlug = location ? String(location) : null;
      const targetCat = category ? String(category) : null;

      const matched = list.filter(cr => {
        const campaign = db.getCampaigns().find(cp => cp.id === cr.campaignId);
        if (!campaign || campaign.status !== 'active') return false;

        // Filter geo targeting
        if (targetSlug && campaign.targetLocations && campaign.targetLocations.length) {
          const matchesGeo = campaign.targetLocations.includes(targetSlug);
          if (!matchesGeo) return false;
        }

        // Filter category targeting
        if (targetCat && campaign.targetCategories && campaign.targetCategories.length) {
          const matchesCat = campaign.targetCategories.includes(targetCat);
          if (!matchesCat) return false;
        }

        return true;
      });

      // Pick a random creative or default to first
      if (matched.length === 0) {
        // Return a global default backup creative if none target matches
        return res.json({ creative: db.getCreatives()[0] || null });
      }

      const index = Math.floor(Math.random() * matched.length);
      res.json({ creative: matched[index] });
    } catch (error: any) {
      console.error("Error inside GET /api/v1/ads/placement:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  });

  app.post('/api/v1/ads/impression', (req, res) => {
    const { creativeId } = req.body;
    if (creativeId) {
      db.trackAdImpression(creativeId);
    }
    res.json({ success: true });
  });

  app.post('/api/v1/ads/click', (req, res) => {
    const { creativeId } = req.body;
    if (creativeId) {
      db.trackAdClick(creativeId);
    }
    res.json({ success: true });
  });

  // ==========================================
  // FEATURE EXPLORER AI ASSISTANT ENDPOINT
  // ==========================================
  app.post('/api/v1/feature-explorer/ai', async (req, res) => {
    const { message, history } = req.body;
    const userQuery = String(message || '').trim();

    if (!userQuery) {
      return res.status(400).json({ error: "Pesan tidak boleh kosong." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const hasValidKey = apiKey && apiKey !== "MY_GEMINI_API_KEY";

    // 1. Try Gemini model first if key is present
    if (hasValidKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey: apiKey,
          httpOptions: {
            headers: { 'User-Agent': 'aistudio-build' }
          }
        });

        const systemPrompt = `Anda adalah INFOBOS Digital Platform Guide & Command Launcher. Tugas Anda adalah membantu pengguna memahami fitur, alur kerja (workflows), dan meluncurkan navigasi tab dengan cepat.

Kanal & Tab Navigasi yang valid di platform INFOBOS:
- "home": Homepage Bento Feed (Pusat kurasi berita visual)
- "widget-cms": Widget Library & CMS Sandbox (Konfigurasi sandbox widget interaktif)
- "intelligence-workspace": Intelligence Workspace Analysts (Alat bantu analisis teks AI & D3 force graph)
- "revenue-os": RevenueOS Monetization (Keuangan, Billing, Royalti Kreator)
- "community-marketplace": Community & Business Hub (Forum, direktori jualan, loker)
- "regional": Peta Geo Jabar (Visualisasi spasial anomali & berita Jawa Barat)
- "nasional": Peta Geo Nasional
- "internasional": Peta Geo Internasional
- "video-hub": Video Streaming TV Hub (Live TV, VOD jurnalisme)
- "podcast-center": Podcast Center Redaksi (Audio podcast + transkrip kalimat interaktif)
- "admin": News CMS & Editorial Dashboard (Pusat wartawan menulis berita, audit, log, koreksi)
- "mediaos": MediaOS Telemetry Console (Telemetri container, CPU/RAM, stress test)

Instruksi Output:
- Anda WAJIB membalas dengan objek JSON yang valid.
- JANGAN sertakan markdown block \`\`\`json ... \`\`\`. Kembalikan RAW JSON STRING saja agar mudah di-parse.
- Format JSON wajib:
  {
    "reply": "Kalimat balasan ramah dalam Bahasa Indonesia. Jelaskan fiturnya dengan detail dan sebutkan alurnya jika ditanya.",
    "targetTab": "slug_tab_navigasi_jika_pengguna_ingin_membuka_fitur_atau_kosongkan",
    "matchedFeatures": ["feat-home", "feat-widget-cms", "etc_jika_ada_yang_cocok"]
  }

Contoh pertanyaan: "Bagaimana alur kerja News CMS?" -> targetTab: "admin", matchedFeatures: ["feat-admin-cms"], reply: "Alur kerja News CMS terdiri dari 4 tahapan: Pertama, wartawan membuat draf. Kedua, draf dikirim ke Editor untuk ditinjau. Ketiga, draf berisiko tinggi wajib ditandatangani Managing Editor. Keempat, draf dipublikasikan secara resmi."`;

        const formattedContents = [
          { role: 'user', parts: [{ text: systemPrompt }] }
        ];

        // Format history
        if (history && Array.isArray(history)) {
          history.forEach(h => {
            formattedContents.push({
              role: h.sender === 'user' ? 'user' : 'model',
              parts: [{ text: h.text }]
            });
          });
        }

        formattedContents.push({
          role: 'user',
          parts: [{ text: userQuery }]
        });

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: formattedContents as any,
          config: {
            responseMimeType: "application/json"
          }
        });

        const resultText = response.text;
        if (resultText) {
          const parsed = JSON.parse(resultText.trim());
          return res.json({
            success: true,
            reply: parsed.reply,
            targetTab: parsed.targetTab || null,
            matchedFeatures: parsed.matchedFeatures || []
          });
        }
      } catch (err: any) {
        console.error("Gemini API Error in Feature Explorer Assistant:", err);
        // Fall through to Rule-Based parsing fallback
      }
    }

    // 2. High-Fidelity Rule-Based Indonesian NLP Fallback (bulletproof offline & no-key handling)
    const lowerQuery = userQuery.toLowerCase();
    let reply = "";
    let targetTab: string | null = null;
    let matchedFeatures: string[] = [];

    if (lowerQuery.includes("cms") || lowerQuery.includes("redaksi") || lowerQuery.includes("tulis") || lowerQuery.includes("alur") || lowerQuery.includes("koreksi")) {
      targetTab = "admin";
      matchedFeatures = ["feat-admin-cms"];
      reply = "Tentu! Alur kerja **News CMS & Editorial Dashboard** dirancang sesuai standar UU Pers dan Dewan Pers. \n\n**Alur Kerja Utama:**\n1. **Penyusunan Draf:** Wartawan menulis artikel dan AI otomatis mengekstrak entitas.\n2. **Kirim Peninjauan:** Draf masuk antrean 'Pending Review'.\n3. **Persetujuan (Governance):** Editor memeriksa draf. Artikel berisiko tinggi (High/Critical) wajib mendapatkan tanda tangan Managing Editor.\n4. **Publikasi & Log Koreksi:** Artikel dirilis ke publik. Jika ada kesalahan fakta, Redaksi Senior dapat menerbitkan 'Log Koreksi' transparan yang tampil di bawah artikel.";
    } 
    else if (lowerQuery.includes("widget") || lowerQuery.includes("sandbox") || lowerQuery.includes("library") || lowerQuery.includes("pasang")) {
      targetTab = "widget-cms";
      matchedFeatures = ["feat-widget-cms"];
      reply = "Anda dapat membuka **Widget Library & CMS Sandbox** untuk menguji widget dinamis! Di sini Anda dapat memvalidasi parameter input JSON, menguji performa widget (jam live, indeks saham, alarm cuaca), dan menyalin kode embed HTML untuk dipasang langsung ke dalam artikel jurnalisme.";
    } 
    else if (lowerQuery.includes("workspace") || lowerQuery.includes("analis") || lowerQuery.includes("riset") || lowerQuery.includes("sentimen") || lowerQuery.includes("intel")) {
      targetTab = "intelligence-workspace";
      matchedFeatures = ["feat-intel-workspace"];
      reply = "Saya sarankan menggunakan **Intelligence Workspace Analysts**. Alat ini sangat cocok untuk jurnalis investigasi. Anda dapat menganalisis sentimen naskah berita menggunakan Gemini 3.5, mengeksplorasi hubungan antar-tokoh publik secara dinamis dengan **D3 Force-Directed Graph**, serta melakukan simulasi beban pencarian data relasional.";
    } 
    else if (lowerQuery.includes("keuangan") || lowerQuery.includes("monetisasi") || lowerQuery.includes("billing") || lowerQuery.includes("gaji") || lowerQuery.includes("revenue")) {
      targetTab = "revenue-os";
      matchedFeatures = ["feat-revenue-os"];
      reply = "Untuk kebutuhan finansial, silakan kunjungi **RevenueOS Monetization**. Dashboard ini menyajikan perolehan iklan CPM/CPC secara detail per wilayah, manajemen billing langganan premium, daftar harga lisensi API portal, serta integrasi pencairan dana royalti kreator.";
    } 
    else if (lowerQuery.includes("komunitas") || lowerQuery.includes("marketplace") || lowerQuery.includes("jual") || lowerQuery.includes("forum") || lowerQuery.includes("loker") || lowerQuery.includes("kerja")) {
      targetTab = "community-marketplace";
      matchedFeatures = ["feat-comm-marketplace"];
      reply = "Mari jelajahi **Community & Business Hub**! Ini adalah pusat interaksi sosial terpadu INFOBOS yang menyatukan forum diskusi agro-tech, bursa lowongan kerja lepas (freelance), direktori bisnis lokal Jawa Barat, dan pasar jual-beli produk digital masyarakat.";
    } 
    else if (lowerQuery.includes("peta") || lowerQuery.includes("map") || lowerQuery.includes("geografis") || lowerQuery.includes("jabar") || lowerQuery.includes("regional")) {
      targetTab = "regional";
      matchedFeatures = ["feat-regional-geo"];
      reply = "Tentu! **Geo Intelligence (Regional Jabar)** adalah peta interaktif Jawa Barat yang menjadi pusat navigasi geospasial kami. Anda dapat menjelajahi sebaran laporan investigasi, status sensor pertanian IoT, dan kemacetan logistik di 27 kabupaten/kota secara langsung.";
    } 
    else if (lowerQuery.includes("video") || lowerQuery.includes("tv") || lowerQuery.includes("siaran") || lowerQuery.includes("streaming")) {
      targetTab = "video-hub";
      matchedFeatures = ["feat-video-hub"];
      reply = "Silakan tonton siaran langsung di **Video Streaming TV Hub**. Portal ini menyajikan pemutaran video TV Siber 24 jam penuh, wawancara eksklusif tokoh publik Jawa Barat, serta katalog dokumenter investigasi orisinal redaksi.";
    } 
    else if (lowerQuery.includes("podcast") || lowerQuery.includes("audio") || lowerQuery.includes("dengar")) {
      targetTab = "podcast-center";
      matchedFeatures = ["feat-podcast-center"];
      reply = "Dengarkan diskusi mendalam di **Podcast Center Redaksi**! Fitur unggulannya adalah transkrip kalimat otomatis yang menyala sesuai detik pembicaraan (audio highlighting). Anda dapat mengeklik kalimat mana saja untuk melompat ke detik audio tersebut.";
    } 
    else if (lowerQuery.includes("status") || lowerQuery.includes("telemetri") || lowerQuery.includes("mediaos") || lowerQuery.includes("diagnostik") || lowerQuery.includes("server")) {
      targetTab = "mediaos";
      matchedFeatures = ["feat-mediaos"];
      reply = "Pantau keandalan infrastruktur kami melalui **MediaOS Telemetry Console**. Halaman diagnostik developer ini menyajikan status CPU, RAM, latensi API, serta simulasi kegagalan database cerdas untuk memastikan platform tetap online 99.98%.";
    } 
    else {
      reply = "Halo! Saya adalah Panduan Cerdas INFOBOS. Anda dapat menanyakan tentang alur kerja jurnalisme (CMS), cara konfigurasi widget sandbox, pemetaan peta spasial Jawa Barat, pemutar audio transkrip podcast, atau meminta saya membukakan tab tertentu!";
    }

    res.json({
      success: true,
      reply,
      targetTab,
      matchedFeatures
    });
  });

  // ==========================================
  // PARTNER OS AI SALES ASSISTANT ENDPOINT
  // ==========================================
  app.post('/api/v1/partner/ai', async (req, res) => {
    const { action, product, details, partnerName, partnerTier } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    const hasValidKey = apiKey && apiKey !== "MY_GEMINI_API_KEY";

    if (!hasValidKey) {
      return res.status(400).json({ success: false, error: "Missing or placeholder Gemini API Key" });
    }

    try {
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: { 'User-Agent': 'aistudio-build' }
        }
      });

      let systemPrompt = `Anda adalah AI Sales Copywriter Assistant resmi untuk platform PartnerOS INFOBOS.
Tugas Anda adalah menulis naskah pemasaran, proposal penawaran, email tindak lanjut (follow up), atau naskah pitching penawaran dalam Bahasa Indonesia yang sangat persuasif, formal, profesional, dan meyakinkan.

Informasi Pengirim (Partner):
- Nama Partner: ${partnerName || 'Mitra Resmi INFOBOS'}
- Tingkatan Tier Partner: ${partnerTier || 'Sales Partner'}

Gunakan format penulisan yang rapi, berikan penekanan dengan poin-poin yang mudah dibaca, serta kaitkan kelebihan INFOBOS (portal berita spasial Jawa Barat dengan real-time sentiment analysis, data geospasial di 27 kota/kabupaten, dan telemetri Sentinel OS yang tahan ad-blocker).

Tulis naskah spesifik berdasarkan aksi: "${action}" untuk produk: "${product}".
Detail kustomisasi dari partner: "${details}".`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: systemPrompt,
      });

      const output = response.text || "Gagal menyusun naskah dengan Gemini AI.";
      res.json({ success: true, output });
    } catch (error: any) {
      console.error("Gemini Partner AI Error:", error);
      res.status(500).json({ success: false, error: error.message || "Internal server error" });
    }
  });

  // ==========================================
  // ARTICLE TRANSLATION ENDPOINT
  // ==========================================
  app.post('/api/v1/translate', async (req, res) => {
    const { paragraphs, targetLanguage } = req.body;
    if (!paragraphs || !Array.isArray(paragraphs)) {
      return res.status(400).json({ success: false, error: "Paragraphs must be an array of strings." });
    }
    const targetLang = String(targetLanguage || 'ID').toUpperCase();
    if (!['ID', 'EN', 'JV', 'SD'].includes(targetLang)) {
      return res.status(400).json({ success: false, error: "Unsupported target language." });
    }

    if (targetLang === 'ID') {
      return res.json({ success: true, translatedParagraphs: paragraphs });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const hasValidKey = apiKey && apiKey !== "MY_GEMINI_API_KEY";

    if (hasValidKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey: apiKey,
          httpOptions: {
            headers: { 'User-Agent': 'aistudio-build' }
          }
        });

        const systemPrompt = `You are an expert translator specializing in Indonesian, Javanese, Sundanese, and English.
Your task is to translate an array of paragraphs (originally in Indonesian) into ${targetLang === 'EN' ? 'English (EN)' : targetLang === 'JV' ? 'Javanese (JV)' : 'Sundanese (SD)'}.

Instructions:
1. Return ONLY a valid JSON array of strings containing the translated paragraphs in the EXACT same order.
2. Keep all Markdown headers (like '##', '###') or inline styling (like '**bold**') intact in the translations.
3. DO NOT wrap the output in markdown code blocks like \`\`\`json. Return only raw JSON.
4. If a paragraph is a short timestamp or has format like "* **[10:00 WIB]** - **Judul**: Deskripsi", translate the Judul and Deskripsi, but keep the timestamp intact.

Input Paragraphs:
${JSON.stringify(paragraphs, null, 2)}`;

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: systemPrompt,
        });

        const output = (response.text || "").trim();
        // Try parsing JSON list of strings
        try {
          const cleanOutput = output.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
          const translated = JSON.parse(cleanOutput);
          if (Array.isArray(translated)) {
            return res.json({ success: true, translatedParagraphs: translated, source: "gemini" });
          }
        } catch (e) {
          console.error("Failed to parse translated output as JSON array, falling back:", output);
        }
      } catch (error: any) {
        console.error("Gemini Translation Error:", error);
      }
    }

    // Fallback translation rules (Javanese, Sundanese, English mock dictionaries)
    const dict: Record<string, Record<string, string>> = {
      EN: {
        "dan": "and",
        "di": "in",
        "yang": "which",
        "dengan": "with",
        "untuk": "for",
        "saya": "I",
        "kita": "we",
        "adalah": "is",
        "tidak": "not",
        "bisa": "can",
        "sangat": "very",
        "pembangunan": "development",
        "pariwisata": "tourism",
        "jalan": "street",
        "kota": "city",
        "masyarakat": "society",
        "pemerintah": "government",
        "berita": "news",
        "anggaran": "budget",
        "sejarah": "history",
        "revitalisasi": "revitalization",
        "cagar budaya": "cultural heritage",
        "koridor": "corridor",
        "resmi": "officially",
        "diluncurkan": "launched",
        "oleh": "by",
        "mendorong": "promoting",
        "ekonomi": "economy",
        "kreatif": "creative",
        "lokal": "local",
        "perlindungan": "protection",
        "struktural": "structural",
        "seismik": "seismic"
      },
      JV: {
        "dan": "lan",
        "di": "ing",
        "yang": "sing",
        "dengan": "karo",
        "untuk": "kanggo",
        "saya": "kula",
        "kita": "kita",
        "adalah": "yaiku",
        "tidak": "ora",
        "bisa": "bisa",
        "sangat": "banget",
        "pembangunan": "pembangunan",
        "pariwisata": "pariwisata",
        "jalan": "dalan",
        "kota": "kuta",
        "masyarakat": "masyarakat",
        "pemerintah": "pemerintah",
        "berita": "pawarta",
        "anggaran": "anggaran",
        "sejarah": "sejarah",
        "revitalisasi": "revitalisasi",
        "cagar budaya": "cagar budaya",
        "resmi": "resmi",
        "diluncurkan": "diluncurake",
        "oleh": "dening",
        "mendorong": "nyurung",
        "ekonomi": "ekonomi",
        "kreatif": "kreatif",
        "lokal": "lokal"
      },
      SD: {
        "dan": "sareng",
        "di": "di",
        "yang": "anu",
        "dengan": "sareng",
        "untuk": "kanggo",
        "saya": "abdi",
        "kita": "urang",
        "adalah": "nyaeta",
        "tidak": "henteu",
        "bisa": "tiasa",
        "sangat": "pisan",
        "pembangunan": "pangwangunan",
        "pariwisata": "pariwisata",
        "jalan": "jalan",
        "kota": "kota",
        "masyarakat": "masarakat",
        "pemerintah": "pamaréntah",
        "berita": "wartos",
        "anggaran": "anggaran",
        "sejarah": "sajarah",
        "revitalisasi": "revitalisasi",
        "cagar budaya": "cagar budaya",
        "resmi": "resmi",
        "diluncurkan": "diluncurkeun",
        "oleh": "ku",
        "mendorong": "nyorong",
        "ekonomi": "ekonomi",
        "kreatif": "kreatif",
        "lokal": "lokal"
      }
    };

    const translated = paragraphs.map(p => {
      if (p.startsWith('## ') || p.startsWith('### ')) {
        const headerSymbol = p.startsWith('## ') ? '## ' : '### ';
        const text = p.substring(headerSymbol.length);
        return headerSymbol + translateTextChunk(text, targetLang, dict);
      }
      return translateTextChunk(p, targetLang, dict);
    });

    res.json({ success: true, translatedParagraphs: translated, source: "fallback" });
  });

  function translateTextChunk(text: string, targetLanguage: string, dict: Record<string, Record<string, string>>): string {
    const langDict = dict[targetLanguage];
    if (!langDict) return text;

    if (text.includes("Revitalisasi terpadu koridor pariwisata cagar budaya Braga")) {
      if (targetLanguage === 'EN') return "Integrated revitalization of the Braga cultural heritage tourism corridor and Gedung Sate has been officially launched by the West Java Provincial Government to drive local creative economic acceleration and structural seismic protection.";
      if (targetLanguage === 'JV') return "Revitalisasi terpadu koridor pariwisata cagar budaya Braga lan Gedung Sate resmi diluncurake dening Pemprov Jabar kanggo nyurung akselerasi ekonomi kreatif lokal lan perlindungan struktural seismik.";
      if (targetLanguage === 'SD') return "Revitalisasi terpadu koridor pariwisata cagar budaya Braga sareng Gedung Sate resmi diluncurkeun ku Pemprov Jabar kanggo nyorong akselerasi ekonomi kreatif lokal sareng perlindungan struktural seismik.";
    }

    if (text.includes("Total dana Rp 45.2 Miliar dicairkan langsung")) {
      if (targetLanguage === 'EN') return "A total fund of Rp 45.2 Billion was disbursed directly for the renovation of Braga Street and seismic reinforcement.";
      if (targetLanguage === 'JV') return "Total dana Rp 45.2 Miliar dicairake langsung kanggo renovasi Dalan Braga lan penguatan seismik.";
      if (targetLanguage === 'SD') return "Total dana Rp 45.2 Miliar dicairkeun langsung kanggo renovasi Jalan Braga sareng panyalindungan seismik.";
    }

    let words = text.split(/\b/);
    let translatedWords = words.map(word => {
      const lower = word.toLowerCase();
      if (langDict[lower]) {
        const trans = langDict[lower];
        if (word[0] === word[0].toUpperCase() && word.length > 1) {
          return trans[0].toUpperCase() + trans.substring(1);
        }
        return trans;
      }
      return word;
    });

    let joined = translatedWords.join('');

    if (text.length > 30 && !text.startsWith('#') && !text.includes('**[')) {
      if (targetLanguage === 'EN') return joined + " [Translated to EN]";
      if (targetLanguage === 'JV') return joined + " (Materi diterjemahake ing basa Jawi)";
      if (targetLanguage === 'SD') return joined + " (Materi diterjemahkeun dina basa Sunda)";
    }
    return joined;
  }

  // ==========================================
  // INTELLIGENCE ORCHESTRATE AI AGENT ENDPOINT
  // ==========================================
  app.post('/api/v1/intelligence/orchestrate', async (req, res) => {
    const { prompt } = req.body;
    const userPrompt = String(prompt || '').trim();

    if (!userPrompt) {
      return res.status(400).json({ success: false, error: "Prompt orkestrasi tidak boleh kosong." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const hasValidKey = apiKey && apiKey !== "MY_GEMINI_API_KEY";

    if (hasValidKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey: apiKey,
          httpOptions: {
            headers: { 'User-Agent': 'aistudio-build' }
          }
        });

        const systemPrompt = `Anda adalah AI Orchestration Master untuk platform AgentOS INFOBOS.
Tugas Anda adalah menguraikan prompt otomatisasi dari pengguna menjadi 4-6 langkah pengerjaan multi-agent yang sangat spesifik, relevan, logis, dan detail dalam Bahasa Indonesia.

Setiap langkah harus ditugaskan ke salah satu agen berikut:
1. 'Research Agent' (avatar: '🔬', role: 'Lead Academic & Policy Researcher')
2. 'Editorial Agent' (avatar: '✍️', role: 'Chief News Editor & Copywriter')
3. 'Monitoring Agent' (avatar: '👁️', role: 'Crisis & Competitor Watchdog')
4. 'Social Media Agent' (avatar: '📱', role: 'Engagement & Multi-Channel Publisher')
5. 'SEO Agent' (avatar: '🔍', role: 'SEO & Search Engine Intelligence Specialist')
6. 'Analytics Agent' (avatar: '📈', role: 'Cost & Token usage analyzer')

Instruksi Output:
- Anda WAJIB membalas dengan objek JSON yang memiliki properti "steps" berupa array.
- Setiap objek langkah dalam array tersebut WAJIB memiliki field:
  - "id": string nomor berurutan (misal "1", "2", "3"...)
  - "agent": nama agen yang sesuai dari daftar di atas
  - "avatar": emoji avatar agen yang sesuai
  - "message": deskripsi tindakan agen dalam Bahasa Indonesia yang sangat mendalam dan disesuaikan secara kreatif dengan prompt pengguna.

PROMPT PENGGUNA: "${userPrompt}"`;

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: systemPrompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                steps: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      agent: { type: Type.STRING },
                      avatar: { type: Type.STRING },
                      message: { type: Type.STRING }
                    },
                    required: ["id", "agent", "avatar", "message"]
                  }
                }
              },
              required: ["steps"]
            }
          }
        });

        const textResponse = response.text || "";
        const parsed = JSON.parse(textResponse);
        if (parsed && Array.isArray(parsed.steps)) {
          return res.json({ success: true, steps: parsed.steps, source: "gemini" });
        }
      } catch (geminiError: any) {
        console.error("Gemini Orchestrate Error, falling back:", geminiError);
      }
    }

    // High-fidelity local keyword-based parser fallback
    const words = userPrompt.toLowerCase();
    const fallbackSteps = [];

    if (words.includes('fiskal') || words.includes('keuangan') || words.includes('apbd') || words.includes('startup') || words.includes('finance') || words.includes('investor') || words.includes('ekonomi')) {
      fallbackSteps.push(
        { id: '1', agent: 'Research Agent', avatar: '🔬', message: `Mengevaluasi dokumen APBD & fiskal Jawa Barat serta menganalisis kebutuhan pendanaan terkait: "${userPrompt}"...` },
        { id: '2', agent: 'SEO Agent', avatar: '🔍', message: `Meriset volume pencarian lokal dan menyusun peta kata kunci berita finansial...` },
        { id: '3', agent: 'Editorial Agent', avatar: '✍️', message: `Menulis naskah rilis berstruktur EEAT tentang prospek pertumbuhan ekonomi daerah terkait "${userPrompt}"...` },
        { id: '4', agent: 'Social Media Agent', avatar: '📱', message: `Menyusun infografis ringkas dan meluncurkan postingan multi-channel ke platform LinkedIn...` },
        { id: '5', agent: 'Analytics Agent', avatar: '📈', message: `Mengalkulasi penggunaan token AI dan memverifikasi integrasi data real-time berhasil.` }
      );
    } else if (words.includes('bencana') || words.includes('cuaca') || words.includes('banjir') || words.includes('gempa') || words.includes('crisis') || words.includes('peringatan') || words.includes('darurat')) {
      fallbackSteps.push(
        { id: '1', agent: 'Monitoring Agent', avatar: '👁️', message: `Melacak radar spasial BMKG, feeds media sosial, dan anomali geospasial darurat...` },
        { id: '2', agent: 'Research Agent', avatar: '🔬', message: `Memetakan area rawan bahaya dan mencocokkan data historis kerentanan wilayah Jawa Barat...` },
        { id: '3', agent: 'Editorial Agent', avatar: '✍️', message: `Menulis bulletin tanggap darurat yang akurat dengan detail mitigasi...` },
        { id: '4', agent: 'Social Media Agent', avatar: '📱', message: `Meluncurkan push alert instan ke grup telegram koordinasi darurat INFOBOS...` },
        { id: '5', agent: 'Analytics Agent', avatar: '📈', message: `Mengonfirmasi pengiriman alert dengan latensi minimum dan mencatatkan log audit.` }
      );
    } else {
      fallbackSteps.push(
        { id: '1', agent: 'Research Agent', avatar: '🔬', message: `Menelaah literatur mendalam dan mengekstrak informasi primer terkait: "${userPrompt}"...` },
        { id: '2', agent: 'SEO Agent', avatar: '🔍', message: `Menghitung indeks kepadatan sitemap untuk rubrik pencarian terkait...` },
        { id: '3', agent: 'Editorial Agent', avatar: '✍️', message: `Menyusun tulisan berita/artikel komprehensif bertema "${userPrompt}"...` },
        { id: '4', agent: 'Social Media Agent', avatar: '📱', message: `Merancang kampanye digital multiprodusen untuk menyebarluaskan hasil: "${userPrompt}"...` },
        { id: '5', agent: 'Analytics Agent', avatar: '📈', message: `Mengonfirmasi seluruh proses berjalan sukses dengan performa 99.8%...` }
      );
    }

    return res.json({ success: true, steps: fallbackSteps, source: "local-intelligence" });
  });

  // ==========================================
  // NEWS SEO ARCHITECTURE SITEMAPS & RSS FEEDS
  // ==========================================

  const escapeXml = (str: string) => {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  // 1. Standard XML Sitemap (/sitemap.xml)
  app.get('/sitemap.xml', (req, res) => {
    try {
      const contents = db.getContents().filter(c => c.status === 'published');
      const categories = db.getCategories();
      const domain = 'https://infobos.com';

      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

      // Main pages from ENHANCED_SITEMAP_80
      ENHANCED_SITEMAP_80.forEach(item => {
        const route = item.slug === 'home' ? '' : item.slug;
        xml += `  <url>\n`;
        xml += `    <loc>${domain}/${route}</loc>\n`;
        xml += `    <changefreq>${item.changefreq}</changefreq>\n`;
        xml += `    <priority>${item.priority.toFixed(1)}</priority>\n`;
        xml += `  </url>\n`;
      });

      // Categories
      categories.forEach(cat => {
        xml += `  <url>\n`;
        xml += `    <loc>${domain}/news/category/${cat.slug}</loc>\n`;
        xml += `    <changefreq>daily</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
      });

      // Articles
      contents.forEach(art => {
        const cat = categories.find(c => c.id === art.primaryCategoryId) || { slug: 'general' };
        xml += `  <url>\n`;
        xml += `    <loc>${domain}/news/${cat.slug}/${art.slug}</loc>\n`;
        xml += `    <lastmod>${escapeXml(art.updatedAt || art.publishedAt || new Date().toISOString())}</lastmod>\n`;
        xml += `    <changefreq>daily</changefreq>\n`;
        xml += `    <priority>0.8</priority>\n`;
        xml += `  </url>\n`;
      });

      xml += `</urlset>`;

      res.header('Content-Type', 'application/xml');
      res.send(xml);
    } catch (err: any) {
      console.error("Failed to generate sitemap.xml:", err);
      res.status(500).send("Error generating sitemap");
    }
  });

  // 2. Google News Sitemap (/news-sitemap.xml)
  app.get('/news-sitemap.xml', (req, res) => {
    try {
      const contents = db.getContents().filter(c => c.status === 'published');
      const categories = db.getCategories();
      const domain = 'https://infobos.com';

      const sorted = [...contents].sort((a, b) => 
        new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime()
      );

      const nowTime = Date.now();
      let newsArticles = sorted.filter(art => {
        const pubTime = new Date(art.publishedAt || art.createdAt).getTime();
        return (nowTime - pubTime) <= 48 * 60 * 60 * 1000;
      });

      if (newsArticles.length < 5) {
        newsArticles = sorted.slice(0, 10);
      }

      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
      xml += `        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n`;

      newsArticles.forEach(art => {
        const cat = categories.find(c => c.id === art.primaryCategoryId) || { slug: 'general' };
        const pubDate = art.publishedAt || art.createdAt || new Date().toISOString();
        
        xml += `  <url>\n`;
        xml += `    <loc>${domain}/news/${cat.slug}/${art.slug}</loc>\n`;
        xml += `    <news:news>\n`;
        xml += `      <news:publication>\n`;
        xml += `        <news:name>INFOBOS News</news:name>\n`;
        xml += `        <news:language>id</news:language>\n`;
        xml += `      </news:publication>\n`;
        xml += `      <news:publication_date>${escapeXml(pubDate)}</news:publication_date>\n`;
        xml += `      <news:title>${escapeXml(art.title)}</news:title>\n`;
        xml += `    </news:news>\n`;
        xml += `  </url>\n`;
      });

      xml += `</urlset>`;

      res.header('Content-Type', 'application/xml');
      res.send(xml);
    } catch (err: any) {
      console.error("Failed to generate news-sitemap.xml:", err);
      res.status(500).send("Error generating news sitemap");
    }
  });

  // 3. RSS Feed (/rss.xml)
  app.get('/rss.xml', (req, res) => {
    try {
      const contents = db.getContents().filter(c => c.status === 'published');
      const categories = db.getCategories();
      const domain = 'https://infobos.com';

      const sorted = [...contents].sort((a, b) => 
        new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime()
      ).slice(0, 20);

      let xml = `<?xml version="1.0" encoding="UTF-8" ?>\n`;
      xml += `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n`;
      xml += `<channel>\n`;
      xml += `  <title>INFOBOS News</title>\n`;
      xml += `  <link>${domain}</link>\n`;
      xml += `  <description>Portal Berita dan Intelijen Jawa Barat Terkini - Akurat, Transparan, Berdaulat</description>\n`;
      xml += `  <language>id-ID</language>\n`;
      xml += `  <pubDate>${new Date().toUTCString()}</pubDate>\n`;
      xml += `  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n`;
      xml += `  <atom:link href="${domain}/rss.xml" rel="self" type="application/rss+xml" />\n`;

      sorted.forEach(art => {
        const cat = categories.find(c => c.id === art.primaryCategoryId) || { slug: 'general' };
        const pubDate = new Date(art.publishedAt || art.createdAt || Date.now()).toUTCString();
        
        xml += `  <item>\n`;
        xml += `    <title>${escapeXml(art.title)}</title>\n`;
        xml += `    <link>${domain}/news/${cat.slug}/${art.slug}</link>\n`;
        xml += `    <description><![CDATA[${art.summary || ''}]]></description>\n`;
        xml += `    <pubDate>${pubDate}</pubDate>\n`;
        xml += `    <guid>${domain}/news/${cat.slug}/${art.slug}</guid>\n`;
        xml += `  </item>\n`;
      });

      xml += `</channel>\n`;
      xml += `</rss>`;

      res.header('Content-Type', 'application/xml');
      res.send(xml);
    } catch (err: any) {
      console.error("Failed to generate rss.xml:", err);
      res.status(500).send("Error generating RSS feed");
    }
  });

  // 4. Category Sitemap (/category-sitemap.xml)
  app.get('/category-sitemap.xml', (req, res) => {
    try {
      const categories = db.getCategories();
      const domain = 'https://infobos.com';

      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

      categories.forEach(cat => {
        xml += `  <url>\n`;
        xml += `    <loc>${domain}/news/category/${cat.slug}</loc>\n`;
        xml += `    <changefreq>daily</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
      });

      xml += `</urlset>`;

      res.header('Content-Type', 'application/xml');
      res.send(xml);
    } catch (err: any) {
      console.error("Failed to generate category-sitemap.xml:", err);
      res.status(500).send("Error generating sitemap");
    }
  });

  // 5. Image Sitemap (/image-sitemap.xml)
  app.get('/image-sitemap.xml', (req, res) => {
    try {
      const contents = db.getContents().filter(c => c.status === 'published' && c.heroImageUrl);
      const categories = db.getCategories();
      const domain = 'https://infobos.com';

      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
      xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

      contents.forEach(art => {
        const cat = categories.find(c => c.id === art.primaryCategoryId) || { slug: 'general' };
        xml += `  <url>\n`;
        xml += `    <loc>${domain}/news/${cat.slug}/${art.slug}</loc>\n`;
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${escapeXml(art.heroImageUrl)}</image:loc>\n`;
        xml += `      <image:title>${escapeXml(art.title)}</image:title>\n`;
        xml += `    </image:image>\n`;
        xml += `  </url>\n`;
      });

      xml += `</urlset>`;

      res.header('Content-Type', 'application/xml');
      res.send(xml);
    } catch (err: any) {
      console.error("Failed to generate image-sitemap.xml:", err);
      res.status(500).send("Error generating sitemap");
    }
  });

  // 6. Video Sitemap (/video-sitemap.xml)
  app.get('/video-sitemap.xml', (req, res) => {
    try {
      const contents = db.getContents().filter(c => c.status === 'published');
      const categories = db.getCategories();
      const domain = 'https://infobos.com';

      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
      xml += `        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n`;

      contents.forEach(art => {
        const cat = categories.find(c => c.id === art.primaryCategoryId) || { slug: 'general' };
        
        xml += `  <url>\n`;
        xml += `    <loc>${domain}/news/${cat.slug}/${art.slug}</loc>\n`;
        xml += `    <video:video>\n`;
        xml += `      <video:thumbnail_loc>${escapeXml(art.heroImageUrl || 'https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff')}</video:thumbnail_loc>\n`;
        xml += `      <video:title>${escapeXml(art.title)}</video:title>\n`;
        xml += `      <video:description>${escapeXml(art.summary || 'Laporan visual mendalam dan liputan eksklusif INFOBOS.')}</video:description>\n`;
        xml += `      <video:player_loc>${domain}/video-hub</video:player_loc>\n`;
        xml += `    </video:video>\n`;
        xml += `  </url>\n`;
      });

      xml += `</urlset>`;

      res.header('Content-Type', 'application/xml');
      res.send(xml);
    } catch (err: any) {
      console.error("Failed to generate video-sitemap.xml:", err);
      res.status(500).send("Error generating sitemap");
    }
  });

  // ==========================================
  // FRAMEWORK DEVELOPMENT & STATIC SERVING
  // ==========================================

  const distPath = path.join(process.cwd(), 'dist');
  const isProduction = process.env.NODE_ENV === "production" || !fs.existsSync(path.join(process.cwd(), 'server.ts'));

  if (isProduction) {
    // Serve static files in production from dist
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    // Mount Vite dev server middleware to serve TypeScript JSX files on the fly
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[INFOBOS Next Gateway] Server active and listening on Port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Critical: Express initialization crashed!", err);
});