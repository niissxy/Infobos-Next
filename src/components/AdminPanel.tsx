import React, { useState, useEffect } from 'react';
import { 
  FileText, Plus, CheckCircle, AlertTriangle, Play, RefreshCw, Eye, MousePointerClick, 
  ShieldCheck, ListOrdered, Calendar, User, Info, Check, CornerDownRight, XCircle,
  Server, Database, Cpu, Network, Activity, TrendingUp, BarChart2, Search, ArrowLeft, ArrowRight, Lock, MapPin, Layers, Award
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { IntegrationCMSManager } from './IntegrationEngine';
import MaintenanceView from './MaintenanceView';
import {
  FiscalMetricsWidget,
  BudgetTableWidget,
  GeoEntityWidget,
  TelemetryWidget,
  SeoSchemaWidget,
  RelatedClustersWidget,
  ReputationLeaderboardWidget
} from './admin/widgets/InteractiveWidgets';

interface AdminPanelProps {
  user: any;
  token: string;
  onNavigateToArticle: (slug: string) => void;
}

export default function AdminPanel({ user, token, onNavigateToArticle }: AdminPanelProps) {
  // Current user representation (Simulated context fallback)
  const currentUser = user ? {
    id: user.id || 'u-1',
    name: user.fullName || user.name || 'Pengguna',
    email: user.email || 'user@infobos.id',
    role: user.role || 'MEMBER',
    reputation: user.reputation || 95,
    completionRate: user.completionRate || 100,
    successRate: user.successRate || 95,
    responseTime: user.responseTime || '< 15 menit',
    badges: user.badges || ['Anggota Terdaftar', 'Komunitas Jabar'],
    avatar: user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'
  } : {
    id: 'u-1',
    name: 'Wira Wijaya',
    email: 'wira@infobos.id',
    role: 'PREMIUM_MEMBER',
    reputation: 98,
    completionRate: 100,
    successRate: 98,
    responseTime: '< 5 menit',
    badges: ['Verifikasi Identitas', 'Top Kontributor', 'Mitra Proyek'],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'
  };

  // Navigation inside Admin Panel
  const [activeSubTab, setActiveSubTab] = useState<'cms' | 'sources' | 'ads' | 'audits' | 'database' | 'integrations' | 'metrics'>('cms');
  const isMaintenanceSubTab = !['cms', 'ads'].includes(activeSubTab);

  // CMS State
  const [contents, setContents] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showCorrectionFormId, setShowCorrectionFormId] = useState<string | null>(null);

  // New Article Form state
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [body, setBody] = useState('');
  const [catId, setCatId] = useState('');
  const [contentType, setContentType] = useState('standard');
  const [isSponsored, setIsSponsored] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [cmsError, setCmsError] = useState('');

  // Correction Form state
  const [origText, setOrigText] = useState('');
  const [corrText, setCorrText] = useState('');
  const [corrExpl, setCorrExpl] = useState('');

  // Ingestion Sources state
  const [sources, setSources] = useState<any[]>([]);
  const [polling, setPolling] = useState(false);
  const [pollResult, setPollResult] = useState<any>(null);

  // Campaign statistics state
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [creatives, setCreatives] = useState<any[]>([]);

  // Audit Logs state
  const [audits, setAudits] = useState<any[]>([]);

  // Feedback notifications
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  // Ad CRUD states
  const [adFormType, setAdFormType] = useState<'none' | 'campaign' | 'creative'>('none');
  const [campName, setCampName] = useState('');
  const [campSponsor, setCampSponsor] = useState('');
  const [campStart, setCampStart] = useState('');
  const [campEnd, setCampEnd] = useState('');
  const [campBudget, setCampBudget] = useState<number>(0);
  
  const [creatCampId, setCreatCampId] = useState('');
  const [creatPlacement, setCreatPlacement] = useState('top_leaderboard');
  const [creatImgUrl, setCreatImgUrl] = useState('');
  const [creatDestUrl, setCreatDestUrl] = useState('');
  const [creatAltText, setCreatAltText] = useState('');
  const [creatImpLimit, setCreatImpLimit] = useState<number>(0);
  const [creatClickLimit, setCreatClickLimit] = useState<number>(0);
  
  const [adSubmitting, setAdSubmitting] = useState(false);
  const [adFormError, setAdFormError] = useState('');

  // ==========================================
  // SEED DATABASE METRICS & EXPLORER STATES
  // ==========================================
  const [metrics, setMetrics] = useState<any>(null);
  const [dbSystemStatus, setDbSystemStatus] = useState<any>(null);
  const [explorerTable, setExplorerTable] = useState<string>('articles');
  const [explorerPage, setExplorerPage] = useState<number>(1);
  const [explorerSearch, setExplorerSearch] = useState<string>('');
  const [explorerItems, setExplorerItems] = useState<any[]>([]);
  const [explorerTotal, setExplorerTotal] = useState<number>(0);
  const [explorerTotalPages, setExplorerTotalPages] = useState<number>(1);
  const [explorerLoading, setExplorerLoading] = useState<boolean>(false);
  const [analyticsRange, setAnalyticsRange] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly');
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [activeScenarioId, setActiveScenarioId] = useState<string>('load');
  const [scenarioResult, setScenarioResult] = useState<any>(null);
  const [scenarioLoading, setScenarioLoading] = useState<boolean>(false);
  const [relationships, setRelationships] = useState<any>(null);

  // ==========================================
  // ENTERPRISE SEED CONTROLS STATE & METHODS
  // ==========================================
  const [seedMode, setSeedMode] = useState<'full' | 'partial'>('full');
  const [seedModule, setSeedModule] = useState<string>('all');
  const [seedCategory, setSeedCategory] = useState<string>('all');
  const [seedRegion, setSeedRegion] = useState<string>('all');
  const [seedYear, setSeedYear] = useState<string>('2026');
  const [seedingLoading, setSeedingLoading] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const handleGenerateSeed = async () => {
    setSeedingLoading(true);
    try {
      const res = await fetch('/api/v1/seed/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          mode: seedMode,
          module: seedModule === 'all' ? undefined : seedModule,
          category: seedCategory === 'all' ? undefined : seedCategory,
          region: seedRegion === 'all' ? undefined : seedRegion,
          year: seedYear
        })
      });
      const data = await res.json();
      if (data.success) {
        showNotification(`Seed sukses digenerasi! Diperkaya ${data.stats.contents} konten & ${data.stats.users} pengguna baru.`, 'success');
        
        // Sync local storage community items if community or all was chosen
        if (seedModule === 'all' || seedModule === 'Community') {
          generateLocalMarketplaceSeeds(seedRegion, seedYear);
        }
        
        // Refresh explorer
        setExplorerPage(1);
        // Refresh current active database stats
        setActiveSubTab('cms');
        setTimeout(() => setActiveSubTab('database'), 50);
      } else {
        showNotification(`Gagal generasi seed: ${data.error}`, 'error');
      }
    } catch (err) {
      showNotification('Kesalahan koneksi ke server seed gateway', 'error');
    } finally {
      setSeedingLoading(false);
    }
  };

  const handleResetSeed = async () => {
    if (!window.confirm('PERINGATAN: Tindakan ini akan menghapus semua artikel draf, log, kampanye iklan, dan mengembalikan sistem ke default minimal. Lanjutkan?')) {
      return;
    }
    setSeedingLoading(true);
    try {
      const res = await fetch('/api/v1/seed/reset', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        showNotification('Database berhasil dikosongkan dan di-reset ke defaults.', 'success');
        
        // Clear local storage community seeds
        localStorage.removeItem('infobos_forum_threads');
        localStorage.removeItem('infobos_marketplace_listings');
        localStorage.removeItem('infobos_companies_directory');
        localStorage.removeItem('infobos_projects_jobs');

        setExplorerPage(1);
        setActiveSubTab('cms');
        setTimeout(() => setActiveSubTab('database'), 50);
      } else {
        showNotification(`Gagal me-reset database: ${data.error}`, 'error');
      }
    } catch (err) {
      showNotification('Kesalahan koneksi ke reset gateway', 'error');
    } finally {
      setSeedingLoading(false);
    }
  };

  const handleUpdateSeed = async () => {
    setSeedingLoading(true);
    try {
      const res = await fetch('/api/v1/seed/update', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        showNotification('Metrik database, view counts, dan timestamps sukses disegarkan!', 'success');
        setActiveSubTab('cms');
        setTimeout(() => setActiveSubTab('database'), 50);
      } else {
        showNotification(`Gagal menyegarkan database: ${data.error}`, 'error');
      }
    } catch (err) {
      showNotification('Kesalahan menyegarkan database', 'error');
    } finally {
      setSeedingLoading(false);
    }
  };

  const handleExportSeed = async () => {
    try {
      const res = await fetch('/api/v1/seed/export', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data.payload, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `infobos_enterprise_seed_${Date.now()}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        showNotification('Schema database sukses diekspor ke file JSON!', 'success');
      } else {
        showNotification('Gagal mengekspor schema', 'error');
      }
    } catch (err) {
      showNotification('Gagal mengekspor schema database', 'error');
    }
  };

  const handleImportSeed = async (jsonText: string) => {
    try {
      const payload = JSON.parse(jsonText);
      const res = await fetch('/api/v1/seed/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ payload })
      });
      const data = await res.json();
      if (data.success) {
        showNotification('Skema database eksternal berhasil diimpor & dimerge!', 'success');
        setActiveSubTab('cms');
        setTimeout(() => setActiveSubTab('database'), 50);
      } else {
        showNotification(`Gagal mengimpor skema: ${data.error}`, 'error');
      }
    } catch (err) {
      showNotification('Format JSON tidak valid atau rusak.', 'error');
    }
  };

  const generateLocalMarketplaceSeeds = (region: string, year: string) => {
    const locName = region === 'all' ? 'Jawa Barat' : region === 'bandung' ? 'Bandung' : region === 'jakarta-pusat' ? 'Jakarta Pusat' : 'Indonesia';
    const cleanLoc = region === 'all' ? 'Bandung' : locName;
    
    const threads = [
      {
        id: `th-seed-local-1-${Date.now()}`,
        title: `Tanya Jawab: Solusi Rantai Pasok Tani di wilayah ${locName} (${year})`,
        category: 'qa',
        author: `Asep Sunandar (Koperasi ${cleanLoc})`,
        content: `Bagaimana teman-teman pelaku usaha di ${locName} mengatasi kendala distribusi bahan pangan di musim pancaroba tahun ${year} ini? Apakah teknologi digital atau sistem asuransi escrow dapat membantu?`,
        tags: ['Logistik', 'SupplyChain', 'UMKM'],
        likes: 25,
        repliesCount: 1,
        views: 310,
        isPinned: true,
        isSolved: true,
        votes: 12,
        aiSummary: `Diskusi seputar optimasi jalur distribusi tani di ${locName} menghadapi cuaca ekstrem tahun ${year}. Rekomendasi mencakup penggunaan logistik mikro pintar.`,
        replies: [
          { id: 'rep-l1', author: 'Budi Santoso', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', content: `Kami di sentra ${cleanLoc} menggunakan armada sewa berpendingin dari Koperasi untuk menjaga kesegaran komoditas hingga pelabuhan terdekat. Sangat disarankan berkolaborasi!`, isSolvedAnswer: true, likes: 9, quote: '' }
        ]
      },
      {
        id: `th-seed-local-2-${Date.now()}`,
        title: `Ide & Inovasi: Pembangunan Sentra Agri-IoT Rebana Metropolitan (${year})`,
        category: 'inovasi',
        author: `Dr. Gunawan (Pusat Riset Rebana)`,
        content: `Kami merancang proposal integrasi stasiun cuaca pintar mikro di klaster industri pangan Rebana. Mari diskusikan kelayakan model investasinya.`,
        tags: ['IoT', 'Rebana', 'Investasi'],
        likes: 42,
        repliesCount: 0,
        views: 580,
        isPinned: false,
        isSolved: false,
        votes: 35,
        aiSummary: `Kajian implementasi Internet of Things (IoT) untuk pertanian presisi di koridor Rebana Metropolitan. Estimasi penghematan pupuk hingga 30%.`,
        replies: []
      }
    ];

    const listings = [
      {
        id: `list-seed-local-1-${Date.now()}`,
        title: `Peralatan Ekstraksi Minyak Atsiri SUS316 Bergaransi (${year})`,
        type: 'jual',
        category: 'Mesin & Industri',
        price: 22000000,
        discount: 1500000,
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80',
        location: cleanLoc,
        condition: 'Baru (Gress)',
        stock: 5,
        rating: 4.9,
        reviewsCount: 22,
        seller: { name: 'Atsiri Tech Indonesia', reputation: 98, verified: true, phone: '08123456780', email: 'sales@atsiritech.com' },
        description: 'Mesin penyulingan kapasitas 100 Liter SUS316 Food Grade. Sangat cocok untuk menyuling sereh wangi, cengkeh, nilam, dll.',
        tags: ['Atsiri', 'Mesin', 'Pertanian'],
        aiSuggestions: {
          seoTitle: `Mesin Penyulingan Atsiri SUS316 Kapasitas 100L ${cleanLoc}`,
          translatedTitle: 'Stainless Steel Essential Oil Extractor 100L SUS316',
          priceAnalysis: 'Harga pasar berkisar 24jt. Penawaran Anda sangat bersahabat!',
          fraudCheck: 'REKENING ESCROW AKTIF. Akun seller berstatus Platinum.'
        }
      },
      {
        id: `list-seed-local-2-${Date.now()}`,
        title: `Sewa Stasiun Cuaca Mikro IoT Presisi per Bulan (${year})`,
        type: 'sewa',
        category: 'Pertanian',
        price: 850000,
        image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=300&q=80',
        location: cleanLoc,
        condition: 'Siap Pakai',
        rating: 4.8,
        reviewsCount: 11,
        seller: { name: `Jabar Digital Agro Lab`, reputation: 96, verified: true, phone: '08987654321', email: 'lab@jabaragro.id' },
        description: 'Perangkat stasiun cuaca mini perekam curah hujan, arah angin, suhu, kelembaban udara, dan indeks radiasi UV terintegrasi aplikasi siber.',
        tags: ['Sewa', 'IoT', 'StasiunCuaca'],
        rentalInfo: { deposit: 300000, lateFee: 50000, minDuration: 3 },
        aiSuggestions: {
          seoTitle: 'Sewa Alat Sensor Cuaca IoT Pintar Presisi',
          translatedTitle: 'Agricultural Smart Micro Weather Station Rental',
          priceAnalysis: 'Harga sewa sangat bersaing untuk klaster UMKM daerah.',
          fraudCheck: 'VERIFIED BRAND PARTNER.'
        }
      }
    ];

    const companies = [
      {
        id: `co-seed-local-1-${Date.now()}`,
        name: `PT ${cleanLoc} Digital Agro`,
        industry: 'Agroteknologi & IoT',
        employees: '10-50',
        branches: `${cleanLoc}, Cirebon`,
        rating: 4.9,
        isVerified: true,
        certified: 'Sertifikasi NIB, ISO 9001:2015, Komite Akreditasi Nasional',
        about: 'Pelopor digitalisasi perkebunan dan penyedia sensor telemetri pintar nirkabel terpadu untuk optimasi panen.',
        catalog: [
          { name: 'Soil Telemetry Sensor Node v5.0', price: 'Rp 1.500.000' },
          { name: 'Gateway IoT Gateway Rebana-1', price: 'Rp 4.200.000' }
        ]
      }
    ];

    const projects = [
      {
        id: `proj-seed-local-1-${Date.now()}`,
        title: `Tender: Pengembangan Dashboard Irigasi Rebana Metropolitan (${year})`,
        type: 'tender',
        budget: 'Rp 180.000.000',
        deadline: `30 Desember ${year}`,
        issuer: `Dinas Pekerjaan Umum ${cleanLoc}`,
        description: 'Pengerjaan sistem informasi telemetri pintu air waduk utama berbasis MQTT, visualisasi peta geo-spasial, dan notifikasi SMS Gateway otomatis.',
        applicants: 15,
        applied: false
      }
    ];

    localStorage.setItem('infobos_forum_threads', JSON.stringify(threads));
    localStorage.setItem('infobos_marketplace_listings', JSON.stringify(listings));
    localStorage.setItem('infobos_companies_directory', JSON.stringify(companies));
    localStorage.setItem('infobos_projects_jobs', JSON.stringify(projects));
  };

  useEffect(() => {
    if (activeSubTab !== 'database') return;
    
    // Fetch Metrics
    fetch('/api/v1/virtual/metrics', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMetrics(data.metrics);
          setDbSystemStatus(data.systemStatus);
        }
      });

    // Fetch Relationships
    fetch('/api/v1/virtual/relationships', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setRelationships(data);
        }
      });
  }, [activeSubTab]);

  // Fetch Explorer page
  useEffect(() => {
    if (activeSubTab !== 'database') return;
    setExplorerLoading(true);
    fetch(`/api/v1/virtual/explorer?table=${explorerTable}&page=${explorerPage}&limit=10&search=${encodeURIComponent(explorerSearch)}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setExplorerItems(data.items);
          setExplorerTotal(data.totalCount);
          setExplorerTotalPages(data.totalPages);
        }
      })
      .finally(() => setExplorerLoading(false));
  }, [activeSubTab, explorerTable, explorerPage, explorerSearch]);

  // Fetch Analytics reports
  useEffect(() => {
    if (activeSubTab !== 'database') return;
    fetch(`/api/v1/virtual/analytics?range=${analyticsRange}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setAnalyticsData(data);
      });
  }, [activeSubTab, analyticsRange]);

  // Run scenario simulation
  const handleTriggerScenario = (id: string) => {
    setScenarioLoading(true);
    setActiveScenarioId(id);
    fetch(`/api/v1/virtual/scenario?id=${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setScenarioResult(data.scenario);
        }
      })
      .finally(() => setScenarioLoading(false));
  };

  // Run default scenario on mount
  useEffect(() => {
    if (activeSubTab === 'database' && !scenarioResult) {
      handleTriggerScenario('load');
    }
  }, [activeSubTab]);

  // Load Admin Data on tab mount
  useEffect(() => {
    fetchCmsData();
    fetchSourceData();
    fetchCampaignData();
    fetchAuditData();
    
    // Fetch categories
    fetch('/api/v1/categories')
      .then(res => res.json())
      .then(data => {
        if (data.categories) {
          setCategories(data.categories);
        } else {
          setCategories([
            { id: "cat-breaking", name: "Breaking News" },
            { id: "cat-terbaru", name: "Terbaru" },
            { id: "cat-trending", name: "Trending" },
            { id: "cat-editor", name: "Pilihan Editor" },
            { id: "cat-investigasi", name: "Investigasi" },
            { id: "cat-analisis", name: "Analisis" },
            { id: "cat-opini", name: "Opini" },
            { id: "cat-factcheck", name: "Fact Check" },
            { id: "cat-explainer", name: "Explainer" },
            { id: "cat-riset", name: "Riset & Insight" }
          ]);
        }
      })
      .catch(() => {
        setCategories([
          { id: "cat-breaking", name: "Breaking News" },
          { id: "cat-terbaru", name: "Terbaru" },
          { id: "cat-trending", name: "Trending" },
          { id: "cat-editor", name: "Pilihan Editor" },
          { id: "cat-investigasi", name: "Investigasi" },
          { id: "cat-analisis", name: "Analisis" },
          { id: "cat-opini", name: "Opini" },
          { id: "cat-factcheck", name: "Fact Check" },
          { id: "cat-explainer", name: "Explainer" },
          { id: "cat-riset", name: "Riset & Insight" }
        ]);
      });
  }, [activeSubTab]);

  const fetchCmsData = async () => {
    try {
      const res = await fetch('/api/v1/admin/contents', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      let list = data.contents || [];
      
      try {
        const localStr = localStorage.getItem('infobos_custom_articles');
        if (localStr) {
          const localArticles = JSON.parse(localStr);
          if (Array.isArray(localArticles)) {
            const existingIds = new Set(list.map((c: any) => c.id));
            const uniqueLocal = localArticles.filter((c: any) => !existingIds.has(c.id));
            list = [...uniqueLocal, ...list];
          }
        }
      } catch (e) {
        console.error("Gagal menggabungkan draf berita lokal untuk CMS:", e);
      }
      
      setContents(list);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchSourceData = async () => {
    try {
      const res = await fetch('/api/v1/admin/sources', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.sources) setSources(data.sources);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchCampaignData = async () => {
    try {
      const res = await fetch('/api/v1/admin/ads', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.campaigns) setCampaigns(data.campaigns);
      if (data.creatives) setCreatives(data.creatives);
    } catch (e) {
      console.error(e);
    }
  };

  // Create Campaign handler
  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!campName || !campStart || !campEnd) {
      setAdFormError('Nama Kampanye, Tanggal Mulai, dan Tanggal Selesai wajib diisi.');
      return;
    }
    setAdSubmitting(true);
    setAdFormError('');
    try {
      const res = await fetch('/api/v1/admin/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: campName,
          advertiserId: campSponsor || 'adv-generic',
          startAt: campStart,
          endAt: campEnd,
          budget: campBudget
        })
      });
      const data = await res.json();
      if (res.ok) {
        setAdFormType('none');
        fetchCampaignData();
        // Reset fields
        setCampName('');
        setCampSponsor('');
        setCampStart('');
        setCampEnd('');
        setCampBudget(0);
      } else {
        setAdFormError(data.error || 'Gagal membuat kampanye.');
      }
    } catch (err) {
      setAdFormError('Gagal menghubungi backend API.');
    } finally {
      setAdSubmitting(false);
    }
  };

  // Delete Campaign handler
  const handleDeleteCampaign = async (id: string) => {
    if (!window.confirm('Hapus kampanye ini beserta semua materi kreatif di dalamnya secara permanen?')) return;
    try {
      const res = await fetch(`/api/v1/admin/campaigns/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchCampaignData();
      } else {
        const data = await res.json();
        alert(data.error || 'Gagal menghapus kampanye');
      }
    } catch (e) {
      alert('Gagal menghubungi backend.');
    }
  };

  // Create Creative handler
  const handleCreateCreative = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!creatCampId || !creatImgUrl || !creatDestUrl || !creatAltText) {
      setAdFormError('Seluruh field wajib diisi.');
      return;
    }
    setAdSubmitting(true);
    setAdFormError('');
    try {
      const res = await fetch('/api/v1/admin/creatives', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          campaignId: creatCampId,
          placement: creatPlacement,
          imageUrl: creatImgUrl,
          destinationUrl: creatDestUrl,
          altText: creatAltText,
          impressionLimit: creatImpLimit,
          clickLimit: creatClickLimit
        })
      });
      const data = await res.json();
      if (res.ok) {
        setAdFormType('none');
        fetchCampaignData();
        // Reset fields
        setCreatImgUrl('');
        setCreatDestUrl('');
        setCreatAltText('');
        setCreatImpLimit(0);
        setCreatClickLimit(0);
      } else {
        setAdFormError(data.error || 'Gagal menambahkan materi kreatif.');
      }
    } catch (err) {
      setAdFormError('Gagal menghubungi backend API.');
    } finally {
      setAdSubmitting(false);
    }
  };

  // Delete Creative handler
  const handleDeleteCreative = async (id: string) => {
    if (!window.confirm('Hapus materi kreatif ini secara permanen?')) return;
    try {
      const res = await fetch(`/api/v1/admin/creatives/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchCampaignData();
      } else {
        const data = await res.json();
        alert(data.error || 'Gagal menghapus materi kreatif');
      }
    } catch (e) {
      alert('Gagal menghubungi backend.');
    }
  };

  const fetchAuditData = async () => {
    try {
      const res = await fetch('/api/v1/admin/audit-logs', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.logs) setAudits(data.logs.reverse()); // Chronological reverse
    } catch (e) {
      console.error(e);
    }
  };

  const showNotification = (message: string, type = 'success') => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback({ message: '', type: '' }), 5000);
  };

  // Submit new article draft (auto NLP tags extracted)
  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setCmsError('');
    if (!title || !body || !catId) {
      setCmsError("Harap lengkapi judul, isi, dan kategori");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/v1/admin/contents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          subtitle,
          body,
          primaryCategoryId: catId,
          contentType,
          isSponsored
        })
      });

      const data = await res.json();
      if (res.ok) {
        showNotification("Draf sukses dibuat & diperkaya Gemini NLP tags!");
        
        // Save the newly created article draft to localStorage
        if (data.content) {
          try {
            const localStr = localStorage.getItem('infobos_custom_articles') || '[]';
            const localArticles = JSON.parse(localStr);
            localArticles.unshift(data.content);
            localStorage.setItem('infobos_custom_articles', JSON.stringify(localArticles));
          } catch (e) {
            console.error("Gagal menyimpan draf berita lokal:", e);
          }
        }

        setTitle('');
        setSubtitle('');
        setBody('');
        setCatId('');
        setContentType('standard');
        setIsSponsored(false);
        setShowCreateForm(false);
        fetchCmsData();
      } else {
        setCmsError(data.error || "Gagal membuat draf");
      }
    } catch (err) {
      setCmsError("Gagal terhubung ke gateway");
    } finally {
      setSubmitting(false);
    }
  };

  // State-Machine Transitions triggers
  const handleWorkflowTransition = async (contentId: string, transition: string) => {
    try {
      const res = await fetch(`/api/v1/admin/contents/${contentId}/workflow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ transition })
      });
      const data = await res.json();
      if (res.ok) {
        showNotification(`Sukses mengubah state transisi: ${transition.toUpperCase()}`);
        
        // Save the updated article to localStorage
        if (data.content) {
          try {
            const localStr = localStorage.getItem('infobos_custom_articles') || '[]';
            const localArticles = JSON.parse(localStr);
            const idx = localArticles.findIndex((a: any) => a.id === data.content.id);
            if (idx !== -1) {
              localArticles[idx] = data.content;
            } else {
              localArticles.unshift(data.content);
            }
            localStorage.setItem('infobos_custom_articles', JSON.stringify(localArticles));
          } catch (e) {
            console.error("Gagal memperbarui draf berita lokal:", e);
          }
        }

        fetchCmsData();
        fetchAuditData();
      } else {
        showNotification(data.error || "Gagal mengubah status", 'error');
      }
    } catch (err) {
      showNotification("Gagal memproses workflow", 'error');
    }
  };

  // Post correction entry for published article
  const handlePostCorrection = async (contentId: string) => {
    if (!origText || !corrText || !corrExpl) {
      showNotification("Semua field log koreksi wajib diisi", 'error');
      return;
    }

    try {
      const res = await fetch(`/api/v1/admin/contents/${contentId}/workflow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          transition: 'post_correction',
          correctionOriginal: origText,
          correctionCorrected: corrText,
          correctionExplanation: corrExpl
        })
      });
      
      const data = await res.json();
      if (res.ok) {
        showNotification("Berhasil mempublikasikan log koreksi fakta.");
        setOrigText('');
        setCorrText('');
        setCorrExpl('');
        setShowCorrectionFormId(null);
        fetchCmsData();
        fetchAuditData();
      } else {
        showNotification(data.error || "Gagal mengirim koreksi", 'error');
      }
    } catch (e) {
      showNotification("Koneksi gagal", 'error');
    }
  };

  // Manual trigger for EVOLIS RSS Scraper Polling
  const handleTriggerIngestion = async (sourceId: string) => {
    setPolling(true);
    setPollResult(null);
    try {
      const res = await fetch(`/api/v1/admin/sources/${sourceId}/fetch`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setPollResult(data.result);
        showNotification("Ingestion selesai! Memeriksa rasio duplikasi Jaccard...");
        fetchCmsData();
        fetchSourceData();
        fetchAuditData();
      } else {
        showNotification(data.error || "Gagal memproses ingestion", 'error');
      }
    } catch (err) {
      showNotification("Gagal terhubung ke scraper", 'error');
    } finally {
      setPolling(false);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'published': return 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/30';
      case 'pending_review': return 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800/30';
      case 'needs_revision': return 'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800/30';
      default: return 'bg-slate-50 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800/30';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-sans animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Sidebar Column */}
        <div className="w-full lg:w-64 shrink-0 space-y-5">
          
          {/* User Reputation & Verification Bento */}
          <div className="bg-gradient-to-br from-[#002B5B] to-[#001733] text-white rounded-2xl p-5 border border-white/10 shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[220px]" id="admin-user-profile-bento">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2B7A78]/20 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img 
                  src={currentUser.avatar} 
                  alt="Avatar" 
                  className="w-12 h-12 rounded-full border-2 border-[#FFD700] shadow-sm shrink-0 object-cover" 
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100";
                  }}
                />
                <div>
                  <div className="flex items-center gap-1">
                    <h3 className="font-display font-black text-xs text-white">{currentUser.name}</h3>
                    <span className="text-[10px] text-[#FFD700]" title="Verified Business">⚡</span>
                  </div>
                  <p className="text-[9px] font-mono text-slate-300 uppercase tracking-wider">{currentUser.role.replace('_', ' ')}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[8px] bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] px-2 py-0.5 rounded-full font-mono font-bold">
                  REPUTASI {currentUser.reputation}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 my-3 text-center">
              <div>
                <span className="text-[9px] text-slate-400 block font-mono">Selesai</span>
                <span className="text-xs font-black text-white">{currentUser.completionRate}%</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-400 block font-mono">Sukses</span>
                <span className="text-xs font-black text-[#FFD700]">{currentUser.successRate}%</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-400 block font-mono">Respon</span>
                <span className="text-xs font-black text-teal-300">{currentUser.responseTime}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 pt-1">
              {currentUser.badges.map((badge: string, idx: number) => (
                <span key={idx} className="text-[8px] bg-white/10 text-white font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 border border-white/5">
                  <Award className="h-2.5 w-2.5 text-[#FFD700]" /> {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Sidebar Navigasi Admin */}
          <div className="w-full bg-white dark:bg-[#001733]/60 border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-xs space-y-4">
          <div className="border-b border-slate-200 dark:border-white/10 pb-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
              Panel Kontrol
            </h3>
          </div>
          
          <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-1 pb-1 lg:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveSubTab('cms')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold tracking-wide transition shrink-0 lg:w-full text-left ${
                activeSubTab === 'cms' 
                  ? 'bg-[#002B5B] dark:bg-[#003A75] text-[#FFD700] shadow-sm' 
                  : 'text-slate-600 hover:text-[#002B5B] dark:text-slate-400 dark:hover:text-[#FFD700] hover:bg-slate-50 dark:hover:bg-[#001f42]/40'
              }`}
            >
              <FileText className="h-4 w-4 shrink-0" />
              <span>VIRALOG CMS</span>
            </button>
            <button
              onClick={() => setActiveSubTab('sources')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold tracking-wide transition shrink-0 lg:w-full text-left ${
                activeSubTab === 'sources' 
                  ? 'bg-[#002B5B] dark:bg-[#003A75] text-[#FFD700] shadow-sm' 
                  : 'text-slate-600 hover:text-[#002B5B] dark:text-slate-400 dark:hover:text-[#FFD700] hover:bg-slate-50 dark:hover:bg-[#001f42]/40'
              }`}
            >
              <Network className="h-4 w-4 shrink-0" />
              <span>EVOLIS Ingestion</span>
            </button>
            <button
              onClick={() => setActiveSubTab('ads')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold tracking-wide transition shrink-0 lg:w-full text-left ${
                activeSubTab === 'ads' 
                  ? 'bg-[#002B5B] dark:bg-[#003A75] text-[#FFD700] shadow-sm' 
                  : 'text-slate-600 hover:text-[#002B5B] dark:text-slate-400 dark:hover:text-[#FFD700] hover:bg-slate-50 dark:hover:bg-[#001f42]/40'
              }`}
            >
              <MousePointerClick className="h-4 w-4 shrink-0" />
              <span>Monetization (Ads)</span>
            </button>
            <button
              onClick={() => setActiveSubTab('audits')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold tracking-wide transition shrink-0 lg:w-full text-left ${
                activeSubTab === 'audits' 
                  ? 'bg-[#002B5B] dark:bg-[#003A75] text-[#FFD700] shadow-sm' 
                  : 'text-slate-600 hover:text-[#002B5B] dark:text-slate-400 dark:hover:text-[#FFD700] hover:bg-slate-50 dark:hover:bg-[#001f42]/40'
              }`}
            >
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>Security Audit</span>
            </button>
            <button
              onClick={() => setActiveSubTab('database')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold tracking-wide transition shrink-0 lg:w-full text-left ${
                activeSubTab === 'database' 
                  ? 'bg-[#002B5B] dark:bg-[#003A75] text-[#FFD700] shadow-sm' 
                  : 'text-slate-600 hover:text-[#002B5B] dark:text-slate-400 dark:hover:text-[#FFD700] hover:bg-slate-50 dark:hover:bg-[#001f42]/40'
              }`}
            >
              <Database className="h-4 w-4 shrink-0" />
              <span>Scale Seed DB</span>
            </button>
            <button
              onClick={() => setActiveSubTab('integrations')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold tracking-wide transition shrink-0 lg:w-full text-left ${
                activeSubTab === 'integrations' 
                  ? 'bg-[#002B5B] dark:bg-[#003A75] text-[#FFD700] shadow-sm' 
                  : 'text-slate-600 hover:text-[#002B5B] dark:text-slate-400 dark:hover:text-[#FFD700] hover:bg-slate-50 dark:hover:bg-[#001f42]/40'
              }`}
            >
              <Layers className="h-4 w-4 shrink-0" />
              <span>Widgets Integration</span>
            </button>
            <button
              onClick={() => setActiveSubTab('metrics')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold tracking-wide transition shrink-0 lg:w-full text-left ${
                activeSubTab === 'metrics' 
                  ? 'bg-[#002B5B] dark:bg-[#003A75] text-[#FFD700] shadow-sm' 
                  : 'text-slate-600 hover:text-[#002B5B] dark:text-slate-400 dark:hover:text-[#FFD700] hover:bg-slate-50 dark:hover:bg-[#001f42]/40'
              }`}
            >
              <BarChart2 className="h-4 w-4 shrink-0" />
              <span>Metrics &amp; Analytics</span>
            </button>
          </nav>
        </div>
      </div>

        {/* Area Konten Utama */}
        <div className="flex-1 min-w-0 space-y-6">
          
          {/* Header Panel */}
          <div className="border-b border-slate-200 dark:border-white/10 pb-5 mb-2 text-left">
            <h1 className="font-display font-black text-2xl md:text-3xl text-[#002B5B] dark:text-white tracking-tight">
              Ruang Redaksi INFOBOS Next
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 font-medium">
              Modul pengelola jurnalisme terintegrasi: **VIRALOG CMS** (Editorial & State Workflows) & **EVOLIS** (Signal Ingestion).
            </p>
          </div>

      {/* Persistent Feedback Notifier */}
      {feedback.message && (
        <div className={`p-3.5 mb-6 rounded-xl border flex items-center gap-2.5 text-xs font-semibold ${
          feedback.type === 'error' 
            ? 'bg-rose-50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300' 
            : 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
        }`}>
          {feedback.type === 'error' ? <AlertTriangle className="h-4.5 w-4.5 text-rose-600 dark:text-rose-400" /> : <ShieldCheck className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" />}
          {feedback.message}
        </div>
      )}

      {isMaintenanceSubTab && <MaintenanceView featureName={activeSubTab} />}

      {/* ==================================================
          SUBTAB 1: VIRALOG CMS (Editorial Workstation)
          ================================================== */}
      {activeSubTab === 'cms' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white">Editorial Board</h3>
            <button
              onClick={() => { setShowCreateForm(!showCreateForm); setCmsError(''); }}
              className="flex items-center gap-1 bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition"
            >
              {showCreateForm ? 'Sembunyikan Form' : 'Buat Draf Berita'}
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* New Article Drafting Form */}
          {showCreateForm && (
            <form onSubmit={handleCreateArticle} className="bg-white dark:bg-[#001f42] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-4 text-left">
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/5 pb-2">Formulir Penulisan Berita Baru (Draf Otomatis diperkaya Gemini)</h4>
              
              {cmsError && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800/30 rounded-lg text-xs font-semibold">
                  {cmsError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Judul Berita *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-[#000a18]/60 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-lg px-3 py-1.5 text-sm"
                    placeholder="e.g. Ridwan Kamil Usulkan Taman Kota Baru di Bandung Timur"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Subjudul / Anak Judul</label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-[#000a18]/60 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-lg px-3 py-1.5 text-sm"
                    placeholder="e.g. Proyek ditargetkan selesai akhir kuartal depan"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Kategori Utama *</label>
                  <select
                    value={catId}
                    onChange={(e) => setCatId(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-[#000a18]/60 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-lg px-3 py-1.5 text-sm"
                    required
                  >
                    <option value="">-- Pilih Kategori --</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Format Konten</label>
                  <select
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-[#000a18]/60 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-lg px-3 py-1.5 text-sm"
                  >
                    <option value="standard">Standard News</option>
                    <option value="explainer">Explainer (Mendalam)</option>
                    <option value="investigation">Investigasi</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="sponsored"
                    checked={isSponsored}
                    onChange={(e) => setIsSponsored(e.target.checked)}
                    className="rounded border-slate-300 dark:border-white/10 text-teal-600 focus:ring-teal-500"
                  />
                  <label htmlFor="sponsored" className="text-xs font-bold text-slate-700 dark:text-slate-300 select-none">Tandai sebagai Berita Sponsor</label>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Tubuh Berita (Content Body) *</label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#000a18]/60 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-lg px-3 py-2 text-sm font-sans h-48 focus:outline-none focus:border-teal-500"
                  placeholder="Ketik isi laporan di sini. Gunakan pemisah paragraf ganda untuk mempermudah layout membaca..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2 bg-[#002B5B] hover:bg-[#001733] dark:bg-[#FFD700] dark:text-[#002B5B] dark:hover:bg-[#FFD700]/90 text-white font-bold rounded-lg text-sm disabled:opacity-50 transition"
              >
                {submitting ? 'Menggali Analisis Gemini NLP...' : 'Simpan Draf Berita'}
              </button>
            </form>
          )}

          {/* Articles Management Grid */}
          <div className="bg-white dark:bg-[#001f42] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 bg-slate-50 dark:bg-[#001733] border-b border-slate-200/60 dark:border-white/10 font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest text-left">
              Daftar Draft & Review Ruang Berita
            </div>
            
            <div className="divide-y divide-slate-100 dark:divide-white/5">
              {contents.map((item) => (
                <div key={item.id} className="p-5 hover:bg-slate-50/50 dark:hover:bg-slate-900/25 transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-left">
                  
                  {/* Article Basic info */}
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-mono font-bold uppercase border px-1.5 py-0.2 rounded ${getStatusBadgeClass(item.status)}`}>
                        {item.status.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-mono font-medium">• {item.categoryName}</span>
                    </div>

                    <h4 className="font-display font-bold text-sm text-slate-900 dark:text-slate-100">
                      {item.title}
                    </h4>

                    <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-500 dark:text-slate-400">
                      <span>Reporter: <strong className="text-slate-700 dark:text-slate-300">{item.authorName}</strong></span>
                      <span>•</span>
                      <span>Sentiment: <strong className="text-slate-700 dark:text-slate-300">{item.sentiment}</strong></span>
                      <span>•</span>
                      <span>Risk Level: <strong className="text-slate-700 dark:text-slate-300">{item.riskLevel.toUpperCase()}</strong></span>
                    </div>
                  </div>

                  {/* State-Machine Control Actions */}
                  <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                    
                    {/* Public preview button if published */}
                    {item.status === 'published' && (
                      <button
                        onClick={() => onNavigateToArticle(item.slug)}
                        className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                      >
                        <Eye className="h-3 w-3" />
                        Lihat Berita
                      </button>
                    )}

                    {/* Transition 1: Send to Review (By reporter/author) */}
                    {item.status === 'draft' && (
                      <button
                        onClick={() => handleWorkflowTransition(item.id, 'submit_review')}
                        className="px-2.5 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-bold transition"
                      >
                        Ajukan Review
                      </button>
                    )}

                    {/* Transition 2: Request Revision (By Editors) */}
                    {item.status === 'pending_review' && (
                      <>
                        <button
                          onClick={() => handleWorkflowTransition(item.id, 'needs_revision')}
                          className="px-2.5 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-xs font-bold transition"
                        >
                          Tolak (Revisi)
                        </button>
                        <button
                          onClick={() => handleWorkflowTransition(item.id, 'approve_schedule')}
                          className="px-2.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold transition"
                        >
                          Setujui & Terbitkan
                        </button>
                      </>
                    )}

                    {/* Transition 3: Request Revision on Draft */}
                    {item.status === 'needs_revision' && (
                      <button
                        onClick={() => handleWorkflowTransition(item.id, 'submit_review')}
                        className="px-2.5 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-bold transition"
                      >
                        Ajukan Ulang
                      </button>
                    )}

                    {/* Transition 4: Emergency Unpublish & Fact Correction on published items */}
                    {item.status === 'published' && (
                      <>
                        <button
                          onClick={() => setShowCorrectionFormId(showCorrectionFormId === item.id ? null : item.id)}
                          className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold transition"
                        >
                          Catat Koreksi Fakta
                        </button>
                        
                        {/* Only super admins or managing editors can trigger emergency kill */}
                        {["super_admin", "managing_editor"].includes(user?.role) && (
                          <button
                            onClick={() => handleWorkflowTransition(item.id, 'emergency_kill')}
                            className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition"
                          >
                            Tarik Berita (Archive)
                          </button>
                        )}
                      </>
                    )}

                  </div>

                  {/* Expandable Correction Form */}
                  {showCorrectionFormId === item.id && (
                    <div className="w-full mt-4 p-4 border border-amber-300 dark:border-amber-800/40 bg-amber-50/50 dark:bg-amber-950/20 rounded-xl space-y-3">
                      <div className="text-xs font-bold text-amber-900 dark:text-amber-400 uppercase tracking-wide">Formulir Log Koreksi Fakta Terbuka</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Teks Sebelumnya (Keliru)</label>
                          <input
                            type="text"
                            value={origText}
                            onChange={(e) => setOrigText(e.target.value)}
                            className="w-full bg-white dark:bg-[#000a18]/60 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-lg px-2.5 py-1 text-xs"
                            placeholder="e.g. Pembangunan taman memakan anggaran Rp 10 Miliar"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Teks Diperbaiki (Benar)</label>
                          <input
                            type="text"
                            value={corrText}
                            onChange={(e) => setCorrText(e.target.value)}
                            className="w-full bg-white dark:bg-[#000a18]/60 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-lg px-2.5 py-1 text-xs"
                            placeholder="e.g. Pembangunan taman memakan anggaran Rp 1 Miliar"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Penjelasan & Sumber Koreksi Terbuka</label>
                        <textarea
                          value={corrExpl}
                          onChange={(e) => setCorrExpl(e.target.value)}
                          className="w-full bg-white dark:bg-[#000a18]/60 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-lg px-2.5 py-1 text-xs h-16"
                          placeholder="Sebutkan alasan kekeliruan cetak dan sumber data pendukung koreksi..."
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setShowCorrectionFormId(null)}
                          className="px-3 py-1 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold"
                        >
                          Batal
                        </button>
                        <button
                          onClick={() => handlePostCorrection(item.id)}
                          className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                        >
                          Terbitkan Hak Koreksi &rarr;
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================
          SUBTAB 2: EVOLIS INGESTION (Scraper Deck)
          ================================================== */}
      {activeSubTab === 'sources' && !isMaintenanceSubTab && (
        <div className="space-y-6 text-left">
          <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="font-display font-extrabold text-lg text-teal-400 flex items-center gap-1.5">
              <Play className="h-5 w-5 fill-teal-400 text-teal-400" />
              Sinyal Informasi & Scraper Console (VIRALOG)
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
              Hubungkan signal ingestion sources secara otomatis. Setiap sirkuit polling yang dipicu akan mengunduh record data eksternal, melakukan **Duplicate Jaccard Filtering** di atas memori, dan memproses tagging NLP Gemini secara asinkron sebelum mendarat sebagai editorial draft.
            </p>
          </div>

          {/* Trigger results log display */}
          {pollResult && (
            <div className="bg-slate-800 border border-slate-700 text-slate-100 p-5 rounded-2xl font-mono space-y-3 shadow-lg">
              <div className="text-xs font-bold text-teal-400 border-b border-slate-700 pb-2 flex items-center gap-2">
                <ShieldCheck className="h-4.5 w-4.5" />
                Laporan Signal Ingestion Scraper — Selesai
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-slate-850 p-3 rounded-xl border border-slate-700">
                  <div className="text-slate-400 text-[10px] uppercase">Record Di-polling</div>
                  <div className="text-2xl font-bold mt-1">{pollResult.processed}</div>
                </div>
                <div className="bg-slate-850 p-3 rounded-xl border border-slate-700">
                  <div className="text-amber-400 text-[10px] uppercase">Duplikasi Terdeteksi (Jaccard)</div>
                  <div className="text-2xl font-bold text-amber-400 mt-1">{pollResult.duplicates}</div>
                </div>
                <div className="bg-slate-850 p-3 rounded-xl border border-slate-700">
                  <div className="text-emerald-400 text-[10px] uppercase">Editorial Draft Dibuat</div>
                  <div className="text-2xl font-bold text-emerald-400 mt-1">{pollResult.created}</div>
                </div>
              </div>
              <div className="text-[10px] text-slate-400 text-left bg-slate-850 p-2 rounded-lg leading-relaxed">
                * Keterangan: Artikel unik yang lolos filter kemiripan dianalisis secara instan oleh Gemini 3.5 Flash guna merumuskan &quot;Why it Matters&quot;, menetapkan tingkat risiko, dan mengekstrak entitas-lokasi jurnalisme.
              </div>
            </div>
          )}

          {/* Source lists cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sources.map((src) => (
              <div key={src.id} className="bg-white dark:bg-[#001f42] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-2.5">
                  <div>
                    <h4 className="font-display font-extrabold text-base text-slate-900 dark:text-white">{src.name}</h4>
                    <span className="text-[9px] font-mono font-bold text-slate-400 dark:text-slate-500 tracking-wide">{src.feedUrl}</span>
                  </div>
                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 border rounded-full uppercase ${
                    src.trustTier === 'highly_trusted' ? 'bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-400 border-teal-200 dark:border-teal-800/30' : 'bg-slate-50 dark:bg-slate-900/30 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800/30'
                  }`}>
                    {src.trustTier}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400">Status Saluran:</span>
                    <strong className="text-slate-700 dark:text-slate-300 block mt-0.5">{src.isActive ? 'Active & Healthy' : 'Disabled'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Waktu Fetch Terakhir:</span>
                    <strong className="text-slate-700 dark:text-slate-300 block mt-0.5 font-mono text-[10px]">
                      {src.lastFetchedAt ? new Date(src.lastFetchedAt).toLocaleTimeString('id-ID') : 'Belum pernah'}
                    </strong>
                  </div>
                </div>

                <button
                  onClick={() => handleTriggerIngestion(src.id)}
                  disabled={polling}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-850 dark:bg-slate-850 dark:hover:bg-slate-750 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <RefreshCw className={`h-4.5 w-4.5 ${polling ? 'animate-spin' : ''}`} />
                  {polling ? 'Membaca Umpan Feed...' : 'Trigger Simulation Polling RSS'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================
          SUBTAB 3: MONETIZATION & CAMPAIGN STATS
          ================================================== */}
      {activeSubTab === 'ads' && (
        <div className="space-y-6 text-left font-sans">
          <div className="bg-teal-900 text-teal-50 p-6 rounded-2xl border border-teal-850 space-y-2">
            <h3 className="font-display font-extrabold text-lg text-teal-300">Monetization Campaign Performance Center</h3>
            <p className="text-xs text-teal-100 max-w-2xl leading-relaxed">
              Pantau konversi iklan native sponsor. Seluruh CTR, impresi penayangan, dan klik ditransaksikan langsung secara aman tanpa telemetry tracking pihak ketiga.
            </p>
          </div>

          {/* CRUD Actions Panel */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                setAdFormType(adFormType === 'campaign' ? 'none' : 'campaign');
                setAdFormError('');
              }}
              className="px-4 py-2 bg-[#002B5B] hover:bg-[#001f42] text-white text-xs font-bold rounded-xl transition cursor-pointer"
            >
              {adFormType === 'campaign' ? 'Tutup Form' : 'Tambah Kampanye Baru'}
            </button>
            <button
              onClick={() => {
                setAdFormType(adFormType === 'creative' ? 'none' : 'creative');
                if (campaigns.length > 0 && !creatCampId) {
                  setCreatCampId(campaigns[0].id);
                }
                setAdFormError('');
              }}
              className="px-4 py-2 bg-[#2B7A78] hover:bg-[#1f5957] text-white text-xs font-bold rounded-xl transition cursor-pointer"
            >
              {adFormType === 'creative' ? 'Tutup Form' : 'Tambah Materi Kreatif'}
            </button>
          </div>

          {/* Form: Campaign */}
          {adFormType === 'campaign' && (
            <form onSubmit={handleCreateCampaign} className="p-5 border border-slate-200 dark:border-white/10 rounded-2xl bg-slate-50 dark:bg-[#001f42]/40 max-w-lg space-y-4 text-xs">
              <h4 className="font-bold text-[#002B5B] dark:text-white uppercase font-mono">Form Kampanye Baru</h4>
              
              {adFormError && (
                <div className="p-2.5 bg-rose-500/10 text-rose-600 rounded-lg font-bold">{adFormError}</div>
              )}

              <div className="space-y-3">
                <div>
                  <label className="block text-slate-500 font-bold mb-1 uppercase">Nama Kampanye</label>
                  <input
                    type="text"
                    value={campName}
                    onChange={(e) => setCampName(e.target.value)}
                    placeholder="Contoh: Promosi Tabungan Prioritas"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold mb-1 uppercase">Nama Sponsor (Advertiser)</label>
                  <input
                    type="text"
                    value={campSponsor}
                    onChange={(e) => setCampSponsor(e.target.value)}
                    placeholder="Contoh: Bank BJB"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-500 font-bold mb-1 uppercase">Mulai Tanggal</label>
                    <input
                      type="date"
                      value={campStart}
                      onChange={(e) => setCampStart(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 font-bold mb-1 uppercase">Sampai Tanggal</label>
                    <input
                      type="date"
                      value={campEnd}
                      onChange={(e) => setCampEnd(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-500 font-bold mb-1 uppercase">Anggaran (Budget IDR)</label>
                  <input
                    type="number"
                    value={campBudget}
                    onChange={(e) => setCampBudget(Number(e.target.value))}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={adSubmitting}
                className="px-4 py-2 bg-[#002B5B] text-white font-bold rounded-lg hover:bg-slate-800 cursor-pointer disabled:opacity-50 animate-pulse-slow"
              >
                {adSubmitting ? 'Menyimpan...' : 'Simpan Kampanye'}
              </button>
            </form>
          )}

          {/* Form: Creative */}
          {adFormType === 'creative' && (
            <form onSubmit={handleCreateCreative} className="p-5 border border-slate-200 dark:border-white/10 rounded-2xl bg-slate-50 dark:bg-[#001f42]/40 max-w-lg space-y-4 text-xs">
              <h4 className="font-bold text-[#2B7A78] dark:text-white uppercase font-mono">Form Materi Kreatif Baru</h4>
              
              {adFormError && (
                <div className="p-2.5 bg-rose-500/10 text-rose-600 rounded-lg font-bold">{adFormError}</div>
              )}

              <div className="space-y-3">
                <div>
                  <label className="block text-slate-500 font-bold mb-1 uppercase">Pilih Kampanye</label>
                  <select
                    value={creatCampId}
                    onChange={(e) => setCreatCampId(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 focus:outline-none text-slate-800 dark:text-slate-200"
                  >
                    {campaigns.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-500 font-bold mb-1 uppercase">Penempatan (Placement)</label>
                  <select
                    value={creatPlacement}
                    onChange={(e) => setCreatPlacement(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 focus:outline-none text-slate-800 dark:text-slate-200"
                  >
                    <option value="top_leaderboard">Top Leaderboard</option>
                    <option value="footer_billboard">Footer Billboard</option>
                    <option value="sidebar">Sidebar</option>
                    <option value="in_feed">In Feed</option>
                    <option value="article_inline">Article Inline</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-500 font-bold mb-1 uppercase">URL Gambar</label>
                  <input
                    type="text"
                    value={creatImgUrl}
                    onChange={(e) => setCreatImgUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold mb-1 uppercase">URL Tujuan (Redirect Link)</label>
                  <input
                    type="text"
                    value={creatDestUrl}
                    onChange={(e) => setCreatDestUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold mb-1 uppercase">Teks Alternatif / Judul Iklan</label>
                  <input
                    type="text"
                    value={creatAltText}
                    onChange={(e) => setCreatAltText(e.target.value)}
                    placeholder="Masukkan teks deskripsi materi promo..."
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-500 font-bold mb-1 uppercase">Batas Tayang (Imp Limit)</label>
                    <input
                      type="number"
                      value={creatImpLimit}
                      onChange={(e) => setCreatImpLimit(Number(e.target.value))}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 font-bold mb-1 uppercase">Batas Klik (Click Limit)</label>
                    <input
                      type="number"
                      value={creatClickLimit}
                      onChange={(e) => setCreatClickLimit(Number(e.target.value))}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={adSubmitting}
                className="px-4 py-2 bg-[#2B7A78] text-white font-bold rounded-lg hover:bg-slate-800 cursor-pointer disabled:opacity-50"
              >
                {adSubmitting ? 'Menyimpan...' : 'Simpan Materi Kreatif'}
              </button>
            </form>
          )}

          {campaigns.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">Belum ada kampanye periklanan terdaftar.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {campaigns.map((cp) => {
                // Find related creatives to accumulate statistics
                const relatedCreatives = creatives.filter(cr => cr.campaignId === cp.id);
                const totalImpressions = relatedCreatives.reduce((acc, curr) => acc + (curr.impressionsCount || curr.impressions || 0), 0);
                const totalClicks = relatedCreatives.reduce((acc, curr) => acc + (curr.clicksCount || curr.clicks || 0), 0);
                const ctr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0.00';

                return (
                  <div key={cp.id} className="bg-white dark:bg-[#001f42] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-2.5 text-left">
                      <div>
                        <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">{cp.name}</h4>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-medium">Sponsor: {cp.advertiserId || cp.sponsorName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDeleteCampaign(cp.id)}
                          className="text-rose-500 hover:text-rose-600 text-[10px] font-bold border border-rose-500/10 hover:bg-rose-500/5 px-2 py-0.5 rounded-lg transition cursor-pointer"
                        >
                          Hapus
                        </button>
                        <span className="text-[9px] font-mono bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-400 font-bold px-1.5 py-0.2 rounded uppercase">
                          ACTIVE
                        </span>
                      </div>
                    </div>

                    {/* Stats counts */}
                    <div className="grid grid-cols-3 gap-2.5 text-center">
                      <div className="bg-slate-50 dark:bg-[#001733] border border-slate-200/55 dark:border-white/10 rounded-xl p-2">
                        <span className="text-[8px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase">Impressions</span>
                        <div className="text-lg font-mono font-bold text-slate-800 dark:text-slate-200 mt-1">{totalImpressions}</div>
                      </div>
                      <div className="bg-slate-50 dark:bg-[#001733] border border-slate-200/55 dark:border-white/10 rounded-xl p-2">
                        <span className="text-[8px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase">Clicks</span>
                        <div className="text-lg font-mono font-bold text-slate-800 dark:text-slate-200 mt-1">{totalClicks}</div>
                      </div>
                      <div className="bg-slate-50 dark:bg-[#001733] border border-slate-200/55 dark:border-white/10 rounded-xl p-2">
                        <span className="text-[8px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase">CTR Ratio</span>
                        <div className="text-lg font-mono font-bold text-teal-600 dark:text-teal-400 mt-1">{ctr}%</div>
                      </div>
                    </div>

                    {/* Target Geo */}
                    <div className="text-xs text-slate-600 dark:text-slate-400 flex flex-wrap items-center gap-1 pt-1 border-b border-slate-100 dark:border-white/5 pb-2">
                      <span className="font-semibold text-slate-500 dark:text-slate-400">Target Lokasi:</span>
                      {cp.targetLocations && cp.targetLocations.length ? (
                        cp.targetLocations.map((loc: string) => (
                          <span key={loc} className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-mono text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">
                            {loc}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500 font-medium italic">Global / Nasional</span>
                      )}
                    </div>

                    {/* Creatives List inside this campaign */}
                    <div className="space-y-2 pt-1 text-xs text-left">
                      <span className="font-semibold text-slate-500 dark:text-slate-400 uppercase font-mono text-[9px] block">Materi Kreatif ({relatedCreatives.length}):</span>
                      {relatedCreatives.length === 0 ? (
                        <p className="text-[10px] text-slate-400 italic">Belum ada banner iklan dikaitkan.</p>
                      ) : (
                        relatedCreatives.map(cr => (
                          <div key={cr.id} className="flex justify-between items-center bg-slate-50/50 dark:bg-[#001733]/20 border border-slate-100 dark:border-white/5 rounded-xl p-2">
                            <div className="min-w-0 pr-2">
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-[8px] bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1 rounded uppercase font-bold shrink-0">{cr.placement}</span>
                                <h5 className="font-bold text-slate-800 dark:text-slate-200 truncate">{cr.altText}</h5>
                              </div>
                              <div className="flex gap-3 text-[9px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">
                                <span>Imp: {cr.impressionsCount || 0}</span>
                                <span>Clicks: {cr.clicksCount || 0}</span>
                              </div>
                            </div>
                            <button
                              onClick={() => handleDeleteCreative(cr.id)}
                              className="text-rose-500 hover:text-rose-600 font-bold hover:underline shrink-0 cursor-pointer"
                            >
                              Hapus
                            </button>
                          </div>
                        ))
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ==================================================
          SUBTAB 4: SECURITY AUDIT TRAIL LOGS
          ================================================== */}
      {activeSubTab === 'audits' && !isMaintenanceSubTab && (
        <div className="space-y-6 text-left font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 text-slate-100 p-5 rounded-2xl space-y-4">
            <h3 className="font-display font-extrabold text-base text-teal-400 flex items-center gap-1.5">
              <ShieldCheck className="h-5 w-5 text-teal-400" />
              Chronological Security Audit Log
            </h3>
            
            <div className="space-y-2 max-h-96 overflow-y-auto divide-y divide-slate-800 pr-2">
              {audits.map((log) => (
                <div key={log.id} className="pt-2 pb-1 text-[11px] leading-relaxed">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                    <span>ID: {log.id}</span>
                    <span>{new Date(log.timestamp).toLocaleString('id-ID')}</span>
                  </div>
                  <div>
                    <span className="text-amber-400 font-bold">[{log.action}]</span>{' '}
                    oleh <span className="text-teal-300 font-bold">{log.actorName}</span>{' '}
                    (ID: {log.actorId}) di tabel{' '}
                    <span className="text-slate-300 font-bold">{log.entityName}</span>{' '}
                    (ID: {log.entityId})
                  </div>
                  {log.newValues && (
                    <div className="text-slate-400 mt-1 bg-slate-850 p-1.5 rounded text-[10px] leading-tight">
                      Detail: {JSON.stringify(log.newValues)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================
          SUBTAB 5: SEED DATABASE & COMPLIANCE EXPLORER
          ================================================== */}
      {activeSubTab === 'database' && !isMaintenanceSubTab && (
        <div className="space-y-6 text-left">
          
          {/* Header Jumbotron */}
          <div className="bg-slate-900 border border-slate-800 text-slate-100 p-6 rounded-3xl space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Database className="h-36 w-36" />
            </div>
            
            <div className="flex items-center gap-2 text-amber-400 font-mono text-[10px] font-bold uppercase tracking-wider bg-slate-800/80 w-fit px-2.5 py-1 rounded-full border border-slate-700">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              INFOBOS Compliance Matrix
            </div>
            
            <h3 className="font-display font-black text-xl text-white">World-Class Seed Database Engine</h3>
            <p className="text-slate-400 text-xs max-w-3xl leading-relaxed">
              Virtual seed engine ditenagai algoritma LCG deterministik mempresentasikan <strong>miliaran relasi objek informasi</strong> secara virtual. Beban memori minimal (&lt;1 MB), terindeks penuh, aman untuk demo korporat, evaluasi performa, audit beban, dan pengujian model AI.
            </p>
            
            {dbSystemStatus && (
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 border-t border-slate-800 text-[10px] text-slate-400 font-mono">
                <div>Engine: <strong className="text-teal-400">{dbSystemStatus.engine}</strong></div>
                <div>Memory Footprint: <strong className="text-teal-400">{dbSystemStatus.footprint}</strong></div>
                <div>Status: <strong className="text-emerald-400">ACTIVE (Replica Mirror)</strong></div>
                <div>Compliance: <strong className="text-emerald-400">100% Passed</strong></div>
              </div>
            )}
          </div>

          {/* ==================================================
              ENTERPRISE SEED CONTROLS CARD
              ================================================== */}
          <div className="bg-white dark:bg-[#001f42] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-xs space-y-6">
            <div className="border-b border-slate-100 dark:border-white/10 pb-4">
              <h4 className="font-display font-extrabold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                <Database className="h-4.5 w-4.5 text-[#002B5B] dark:text-teal-400" />
                Enterprise Seed Control Center (QA Testing Suite)
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Hydrate, reset, export, and merge high-fidelity transactional schemas to evaluate extreme platform load.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Seed Parameters Formulation (8 cols) */}
              <div className="lg:col-span-8 space-y-4">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">1. Formulate Seed Schema Parameters</div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Seeding Mode</label>
                    <select
                      value={seedMode}
                      onChange={(e) => setSeedMode(e.target.value as any)}
                      className="w-full bg-slate-50 dark:bg-[#000a18]/60 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 rounded-xl px-3 py-2 outline-none focus:border-[#002B5B] dark:focus:border-[#FFD700]"
                    >
                      <option value="full">Full Seed (Clean Rewrite)</option>
                      <option value="partial">Partial Seed (Append Records)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Target Module</label>
                    <select
                      value={seedModule}
                      onChange={(e) => setSeedModule(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-[#000a18]/60 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 rounded-xl px-3 py-2 outline-none focus:border-[#002B5B] dark:focus:border-[#FFD700]"
                    >
                      <option value="all">All Modules (News + Community)</option>
                      <option value="News">News & Publications</option>
                      <option value="Community">Community & Forums</option>
                      <option value="Ads">Advertisements & Campaigns</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Target Category</label>
                    <select
                      value={seedCategory}
                      onChange={(e) => setSeedCategory(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-[#000a18]/60 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 rounded-xl px-3 py-2 outline-none focus:border-[#002B5B] dark:focus:border-[#FFD700]"
                    >
                      <option value="all">All Categories</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Target Region / Geography</label>
                    <select
                      value={seedRegion}
                      onChange={(e) => setSeedRegion(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-[#000a18]/60 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 rounded-xl px-3 py-2 outline-none focus:border-[#002B5B] dark:focus:border-[#FFD700]"
                    >
                      <option value="all">All Regions (West Java Centric)</option>
                      <option value="bandung">Bandung (City)</option>
                      <option value="jakarta-pusat">DKI Jakarta</option>
                      <option value="surabaya">Surabaya</option>
                      <option value="yogyakarta">Yogyakarta</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Seeding Timestamp Year</label>
                    <select
                      value={seedYear}
                      onChange={(e) => setSeedYear(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-[#000a18]/60 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 rounded-xl px-3 py-2 outline-none focus:border-[#002B5B] dark:focus:border-[#FFD700]"
                    >
                      <option value="2024">2024 (Historical Data)</option>
                      <option value="2025">2025 (Active Transitional)</option>
                      <option value="2026">2026 (Live Current Era)</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-4">
                  <button
                    onClick={handleGenerateSeed}
                    disabled={seedingLoading}
                    className="bg-[#002B5B] hover:bg-[#001F42] dark:bg-[#FFD700] dark:hover:bg-[#e6c200] text-[#FFD700] dark:text-[#002B5B] text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                  >
                    <Play className="h-4 w-4" />
                    Generate Realistic Seeds
                  </button>

                  <button
                    onClick={handleUpdateSeed}
                    disabled={seedingLoading}
                    className="bg-slate-100 hover:bg-slate-200 dark:bg-[#FFD700]/10 dark:hover:bg-[#FFD700]/20 text-slate-700 dark:text-[#FFD700] border border-transparent dark:border-[#FFD700]/20 text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <RefreshCw className={`h-4 w-4 ${seedingLoading ? 'animate-spin' : ''}`} />
                    Refresh Metrics & Timestamps
                  </button>

                  <button
                    onClick={handleResetSeed}
                    disabled={seedingLoading}
                    className="bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-900/30 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800/30 text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <AlertTriangle className="h-4 w-4" />
                    Wipe & Reset Database
                  </button>
                </div>
              </div>

              {/* Right Column: Schema Import/Export & Drag-Drop File Upload (4 cols) */}
              <div className="lg:col-span-4 space-y-4 border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-white/10 pt-4 lg:pt-0 lg:pl-6">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">2. Schema Migrations</div>

                {/* Drag and Drop JSON Schema Import Area */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragActive(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file && file.type === "application/json") {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        if (event.target?.result) {
                          handleImportSeed(event.target.result as string);
                        }
                      };
                      reader.readAsText(file);
                    } else {
                      showNotification('Mohon drop file JSON skema yang valid', 'error');
                    }
                  }}
                  className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition ${
                    dragActive 
                      ? 'border-[#002B5B] dark:border-[#FFD700] bg-slate-50 dark:bg-slate-900/20' 
                      : 'border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-900/10'
                  }`}
                  onClick={() => document.getElementById('json-schema-file-input')?.click()}
                >
                  <FileText className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Import Schema JSON</span>
                  <span className="text-[9px] text-slate-400 block mt-1">Drag & drop file JSON di sini atau klik untuk memilih file</span>
                  <input
                    id="json-schema-file-input"
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          if (ev.target?.result) {
                            handleImportSeed(ev.target.result as string);
                          }
                        };
                        reader.readAsText(file);
                      }
                    }}
                  />
                </div>

                <button
                  onClick={handleExportSeed}
                  className="w-full bg-[#002B5B]/10 hover:bg-[#002B5B]/15 dark:bg-[#FFD700]/10 dark:hover:bg-[#FFD700]/15 text-[#002B5B] dark:text-[#FFD700] text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  <Eye className="h-4 w-4" />
                  Export Schema (Download JSON)
                </button>
              </div>

            </div>
          </div>

          {/* Seed Data Volume KPI Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
            {[
              { label: 'Articles', key: 'articles', count: '50.000', desc: 'Deep-dive analysis & reportase' },
              { label: 'News', key: 'news', count: '30.000', desc: 'Breaking news & nasional' },
              { label: 'Blogs', key: 'blogs', count: '15.000', desc: 'Tutorial & studi kasus' },
              { label: 'Short Videos', key: 'shortVideos', count: '20.000', desc: 'Viral Reels & Shorts' },
              { label: 'Long Videos', key: 'longVideos', count: '8.000', desc: 'Dokumenter & wawancara' },
              { label: 'Podcasts', key: 'podcasts', count: '5.000', desc: 'Audio show & transkripsi' },
              { label: 'Documents', key: 'documents', count: '8.000', desc: 'Riset akademis & PDF resmi' },
              { label: 'Gallery', key: 'gallery', count: '15.000', desc: 'Photo journalism & infoografis' },
              { label: 'Users & Creators', key: 'users', count: '250.000', desc: 'Profil jurnalis & pembaca' },
              { label: 'Comments', key: 'comments', count: '2.000.000', desc: 'Komentar tersaring moderasi' }
            ].map(m => (
              <div key={m.key} className="bg-white dark:bg-[#001f42] border border-slate-200 dark:border-white/10 p-4 rounded-2xl shadow-xs hover:border-slate-300 dark:hover:border-white/20 transition duration-155 text-left">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{m.label}</span>
                <div className="text-xl font-mono font-black text-slate-900 dark:text-white mt-1 leading-none">{m.count}</div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1.5 leading-tight">{m.desc}</p>
              </div>
            ))}
            {/* The grand analytics event counts */}
            <div className="bg-gradient-to-br from-[#002B5B] to-indigo-950 text-[#FFD700] p-4 rounded-2xl shadow-xs border border-indigo-900 col-span-2 text-left">
              <span className="text-[10px] font-bold text-[#FFD700]/70 uppercase tracking-wider">Analytics Events Tracked</span>
              <div className="text-2xl font-mono font-black mt-1 leading-none">100.000.000+</div>
              <p className="text-[10px] text-slate-200 mt-2 leading-relaxed">
                Log penayangan halaman, durasi keterbacaan, scroll depth, dan konversi monetisasi terdistribusi di 38 provinsi Indonesia.
              </p>
            </div>
          </div>

          {/* Core Explorer & Performance Visualizer Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Dynamic DB Explorer Table (8 cols) */}
            <div className="lg:col-span-8 bg-white dark:bg-[#001f42] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/10 pb-4">
                <div>
                  <h4 className="font-display font-extrabold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                    <Layers className="h-4.5 w-4.5 text-[#002B5B] dark:text-teal-400" />
                    Interactive Seed Database Explorer
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Seeks, paginates, and searches millions of virtual rows instantly.</p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={explorerTable}
                    onChange={(e) => { setExplorerTable(e.target.value); setExplorerPage(1); }}
                    className="bg-slate-50 dark:bg-[#000a18]/60 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-300 rounded-xl px-3 py-1.5 outline-none"
                  >
                    <option value="articles">Articles (50.000)</option>
                    <option value="news">News (30.000)</option>
                    <option value="blogs">Blogs (15.000)</option>
                    <option value="shortVideos">Short Videos (20.000)</option>
                    <option value="longVideos">Long Videos (8.000)</option>
                    <option value="podcasts">Podcasts (5.000)</option>
                    <option value="documents">Documents (8.000)</option>
                    <option value="gallery">Gallery (15.000)</option>
                    <option value="entities">Entities & Brands (40.000)</option>
                    <option value="users">Users & Authors (250.000)</option>
                    <option value="comments">Comments (2.000.000)</option>
                  </select>
                </div>
              </div>

              {/* Search & Statistics summary */}
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-[#000a18]/60 border border-slate-200 dark:border-white/10 rounded-2xl px-3 py-1.5">
                <Search className="h-4 w-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Ketik kata kunci untuk mensimulasikan pencarian full-text (e.g. 'AI', 'Jakarta', 'Korupsi')..."
                  value={explorerSearch}
                  onChange={(e) => { setExplorerSearch(e.target.value); setExplorerPage(1); }}
                  className="bg-transparent text-xs text-slate-700 dark:text-slate-200 w-full outline-none py-1"
                />
                {explorerSearch && (
                  <button onClick={() => setExplorerSearch('')} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-xs font-bold px-1">✕</button>
                )}
              </div>

              {/* Explorer Table Container */}
              <div className="overflow-x-auto min-h-96">
                {explorerLoading ? (
                  <div className="flex flex-col items-center justify-center py-24 space-y-2">
                    <RefreshCw className="h-8 w-8 text-[#002B5B] dark:text-[#FFD700] animate-spin" />
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Mencari records di database index...</span>
                  </div>
                ) : explorerItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-24 text-slate-400 space-y-1">
                    <AlertTriangle className="h-8 w-8 text-slate-300 dark:text-slate-600" />
                    <span className="text-xs font-bold">Tidak ada records virtual yang cocok</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Coba kurangi kata kunci filter Anda.</span>
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <th className="py-2.5">ID</th>
                        <th className="py-2.5">Primary Record Info</th>
                        <th className="py-2.5">Category/Meta</th>
                        <th className="py-2.5 text-right">Stats / Engagements</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-xs">
                      {explorerItems.map((item: any, i) => {
                        return (
                          <tr key={item.id || i} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition">
                            <td className="py-3 font-mono font-bold text-slate-400 dark:text-slate-500 text-[10px] shrink-0 w-24">
                              {item.id || `idx-${i}`}
                            </td>
                            <td className="py-3 pr-4 max-w-sm">
                              <div className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                                {item.title || item.fullName || item.name || item.body || 'Untitled'}
                              </div>
                              <span className="text-[10px] text-slate-400 dark:text-slate-500 line-clamp-1 block mt-0.5 font-medium">
                                {item.summary || item.email || item.userName || `Deterministic seed hash: ${item.slug || 'N/A'}`}
                              </span>
                            </td>
                            <td className="py-3">
                              <span className="bg-slate-100 dark:bg-slate-850 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md text-[10px] font-bold">
                                {item.category || item.role || item.sentiment || item.format || 'General'}
                              </span>
                              {item.author && (
                                <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-1 font-medium">Oleh: {item.author}</span>
                              )}
                              {item.location && (
                                <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-1 font-mono"><MapPin className="h-3 w-3 inline text-slate-400 dark:text-slate-500 mr-0.5" />{item.location}</span>
                              )}
                            </td>
                            <td className="py-3 font-mono text-[10px] text-slate-600 dark:text-slate-400 text-right">
                              {item.views !== undefined && (
                                <div>👁️ {item.views.toLocaleString('id-ID')} views</div>
                              )}
                              {item.likes !== undefined && (
                                <div className="mt-0.5">❤️ {item.likes.toLocaleString('id-ID')} likes</div>
                              )}
                              {item.shares !== undefined && (
                                <div className="mt-0.5">🔗 {item.shares.toLocaleString('id-ID')} shares</div>
                              )}
                              {item.duration && (
                                <div className="mt-0.5">⏱️ {item.duration}</div>
                              )}
                              {item.size && (
                                <div>💾 {item.size} ({item.format})</div>
                              )}
                              {item.downloads && (
                                <div className="mt-0.5">📥 {item.downloads} downloads</div>
                              )}
                              {item.industry && (
                                <div>🏭 {item.industry}</div>
                              )}
                              {item.type && (
                                <div className="text-slate-400 capitalize">{item.type}</div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Pagination controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 dark:border-white/10 pt-4 gap-3 text-left">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">
                  Menampilkan {(explorerPage - 1) * 10 + 1} - {Math.min(explorerTotal, explorerPage * 10)} dari <span className="font-mono text-slate-800 dark:text-slate-200">{explorerTotal.toLocaleString('id-ID')}</span> total virtual records
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setExplorerPage(1)}
                    disabled={explorerPage === 1 || explorerLoading}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition text-xs font-semibold"
                  >
                    First
                  </button>
                  <button
                    onClick={() => setExplorerPage(p => Math.max(1, p - 1))}
                    disabled={explorerPage === 1 || explorerLoading}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition flex items-center gap-1 text-xs font-semibold"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Prev
                  </button>
                  
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 px-3 font-mono">
                    Halaman {explorerPage} / {explorerTotalPages}
                  </span>

                  <button
                    onClick={() => setExplorerPage(p => Math.min(explorerTotalPages, p + 1))}
                    disabled={explorerPage === explorerTotalPages || explorerLoading}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition flex items-center gap-1 text-xs font-semibold"
                  >
                    Next <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setExplorerPage(explorerTotalPages)}
                    disabled={explorerPage === explorerTotalPages || explorerLoading}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition text-xs font-semibold"
                  >
                    Last
                  </button>
                </div>
              </div>
            </div>

            {/* Right: QA Multi-Scenario Simulator Panel (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Scenario Control Jumbotron */}
              <div className="bg-[#002B5B] text-white rounded-3xl p-5 shadow-sm space-y-4 text-left">
                <div className="flex items-center gap-2 border-b border-indigo-900 pb-3">
                  <Cpu className="h-5 w-5 text-[#FFD700]" />
                  <div>
                    <h4 className="font-display font-bold text-sm">QA Test Scenario Center</h4>
                    <span className="text-[10px] text-slate-300">Run simulations across database states</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  {[
                    { id: 'load', label: 'Load Test' },
                    { id: 'search', label: 'Text Search' },
                    { id: 'slow_query', label: 'Slow Query' },
                    { id: 'offline', label: 'Offline Sync' },
                    { id: 'rbac', label: 'RBAC Audit' },
                    { id: 'soft_delete', label: 'Soft Delete' },
                    { id: 'audit_trail', label: 'Audit Trail' },
                    { id: 'approval', label: 'Workflow Sync' }
                  ].map(sc => (
                    <button
                      key={sc.id}
                      onClick={() => handleTriggerScenario(sc.id)}
                      disabled={scenarioLoading}
                      className={`py-2 px-2.5 rounded-xl text-left border font-semibold transition ${
                        activeScenarioId === sc.id 
                          ? 'bg-[#FFD700] text-slate-900 border-[#FFD700]' 
                          : 'bg-indigo-950/60 border-indigo-900 text-slate-100 hover:bg-indigo-950'
                      }`}
                    >
                      {sc.label}
                    </button>
                  ))}
                </div>

                {/* Simulation Output panel */}
                {scenarioLoading ? (
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-slate-400 py-8 text-center space-y-2">
                    <RefreshCw className="h-6 w-6 text-[#FFD700] animate-spin mx-auto" />
                    <span>Memanggil gateway test replica...</span>
                  </div>
                ) : scenarioResult ? (
                  <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-3.5">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <strong className="text-[11px] text-[#FFD700] font-bold tracking-tight block uppercase">{scenarioResult.title}</strong>
                      <span className={`text-[8px] font-mono font-extrabold px-1.5 py-0.2 rounded uppercase ${
                        scenarioResult.status === 'success' ? 'bg-emerald-500/20 text-emerald-400' :
                        scenarioResult.status === 'warning' ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {scenarioResult.status}
                      </span>
                    </div>

                    <p className="text-[10px] text-slate-300 leading-relaxed font-medium">{scenarioResult.description}</p>

                    {/* Telemetry metrics */}
                    <div className="space-y-1.5 text-[10px] font-mono text-slate-400 border-t border-b border-slate-800 py-2">
                      {Object.entries(scenarioResult.telemetry || {}).map(([key, val]: any) => (
                        <div key={key} className="flex justify-between">
                          <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                          <strong className="text-white">{val}</strong>
                        </div>
                      ))}
                    </div>

                    {/* Audit Logs */}
                    <div className="text-[9px] font-mono text-emerald-400/95 leading-relaxed bg-slate-900/90 p-2.5 rounded-lg border border-slate-800/80 max-h-24 overflow-y-auto">
                      {scenarioResult.auditTrace}
                    </div>

                    {/* Quality Assurance Seal */}
                    <div className="bg-emerald-500/10 border border-emerald-500/25 p-2 rounded-xl flex items-center gap-2 text-emerald-400 text-[10px]">
                      <ShieldCheck className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
                      <div>
                        <strong className="block font-black uppercase text-[8px] tracking-wide">COMPLIANCE ASSURED</strong>
                        <span>Deterministic schema integrity checked</span>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Relationship Diagram Bento Box */}
              <div className="bg-white dark:bg-[#001f42] border border-slate-200 dark:border-white/10 rounded-3xl p-5 shadow-xs space-y-3 text-left">
                <h4 className="font-display font-extrabold text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                  <Network className="h-4 w-4 text-[#002B5B] dark:text-teal-400" />
                  Information Graph Topology
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">
                  Peta keterkaitan objek metadata universal. Seluruh konten diikat oleh tag, topik, wilayah, entitas, dan kreator yang sama secara transaksional.
                </p>

                {relationships && (
                  <div className="bg-slate-50 dark:bg-[#000a18]/60 p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 text-[10px] font-mono space-y-2">
                    <div className="font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[8px]">Connected Graph Relations</div>
                    <div className="space-y-1 max-h-40 overflow-y-auto divide-y divide-slate-100 dark:divide-white/5">
                      {relationships.links.slice(0, 6).map((link: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between py-1 text-slate-600 dark:text-slate-300">
                          <span className="text-slate-900 dark:text-white font-bold">{link.source}</span>
                          <span className="text-slate-400 dark:text-slate-500 text-[9px]">↔ {link.label.split(' ')[2] || link.target}</span>
                          <span className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-1 rounded font-bold">W={link.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-[9px] text-slate-400 dark:text-slate-500 text-center pt-1 border-t border-slate-200 dark:border-white/5 font-bold">
                      + {relationships.links.length - 6} other multi-dimensional relations verified
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Bottom section: High-Fidelity Recharts Analytics Engine & Geospatial Mapping */}
          <div className="bg-white dark:bg-[#001f42] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-xs space-y-6 text-left">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/10 pb-4">
              <div>
                <h4 className="font-display font-extrabold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                  <BarChart2 className="h-4.5 w-4.5 text-[#002B5B] dark:text-teal-400" />
                  High-Fidelity Recharts Analytics Simulator (100M events)
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Plotting synthetic pageviews, unique visitors, and CTR distribution for public dashboard evaluation.</p>
              </div>

              {/* Range Selector tabs */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200 dark:border-white/10 rounded-xl">
                {[
                  { id: 'daily', label: 'Harian' },
                  { id: 'weekly', label: 'Mingguan' },
                  { id: 'monthly', label: 'Bulanan' },
                  { id: 'yearly', label: 'Tahunan' }
                ].map(r => (
                  <button
                    key={r.id}
                    onClick={() => setAnalyticsRange(r.id as any)}
                    className={`px-3 py-1 rounded-lg text-[10px] font-bold tracking-wide transition ${
                      analyticsRange === r.id ? 'bg-[#002B5B] dark:bg-[#FFD700] text-[#FFD700] dark:text-[#002B5B] shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-[#002B5B] dark:hover:text-white'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Graph Visualizer container */}
            {analyticsData ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* 1. Recharts Area Chart (8 cols) */}
                <div className="lg:col-span-8 space-y-3">
                  <div className="flex justify-between items-center px-1">
                    <strong className="text-xs text-slate-800 dark:text-slate-200">Perkembangan Interaksi Trafik Virtual</strong>
                    <div className="flex items-center gap-4 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-teal-500" /> Pageviews</span>
                      <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-500" /> Visitors</span>
                    </div>
                  </div>
                  
                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={analyticsData.timeSeries} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.25}/>
                            <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                        <XAxis dataKey="label" stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} tickFormatter={(v) => v >= 1000000 ? `${(v/1000000).toFixed(1)}M` : `${v/1000}K`} />
                        <Tooltip 
                          contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '12px', fontSize: '10px', color: '#fff' }}
                          formatter={(value: any) => [value.toLocaleString('id-ID'), '']}
                        />
                        <Area type="monotone" dataKey="views" stroke="#14b8a6" strokeWidth={2} fillOpacity={1} fill="url(#colorPv)" />
                        <Area type="monotone" dataKey="visitors" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* 2. Geospatial Metrics Distribution (4 cols) */}
                <div className="lg:col-span-4 space-y-4">
                  <div>
                    <strong className="text-xs text-slate-800 dark:text-slate-200 block">Distribusi Wilayah Geografis Indonesia</strong>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">Peta interaksi regional real-time</span>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {analyticsData.regionalDistribution?.map((reg: any, idx: number) => {
                      return (
                        <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#000a18]/60 border border-slate-100 dark:border-white/10 hover:border-slate-200 dark:hover:border-white/20 transition">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <div className="h-2 w-2 rounded-full bg-teal-500 shrink-0" />
                            <div className="min-w-0">
                              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block truncate">{reg.city}</span>
                              <span className="text-[9px] text-slate-400 dark:text-slate-500 block truncate font-mono">Provinsi: {reg.province}</span>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-[10px] font-mono font-black text-slate-700 dark:text-slate-300 block">
                              {reg.pageviews.toLocaleString('id-ID')} PV
                            </span>
                            <span className="text-[9px] text-emerald-600 dark:text-emerald-400 block font-bold font-mono">
                              {(reg.ctr * 100).toFixed(2)}% CTR
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 space-y-1.5">
                <RefreshCw className="h-6 w-6 text-slate-400 animate-spin" />
                <span className="text-xs text-slate-500">Memuat visualisasi chart...</span>
              </div>
            )}
          </div>

        </div>
      )}

      {activeSubTab === 'integrations' && !isMaintenanceSubTab && (
        <IntegrationCMSManager token={token} />
      )}

      {activeSubTab === 'metrics' && !isMaintenanceSubTab && (
        <div className="space-y-6">
          <div className="bg-[#001f42] text-white p-6 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
            <div className="relative z-10 text-left">
              <span className="text-[10px] bg-amber-500/10 border border-amber-500/30 text-[#FFD700] px-2.5 py-1 rounded font-mono font-black uppercase tracking-wider inline-block mb-3">
                Sistem Pemantauan Terpadu
              </span>
              <h2 className="font-display font-black text-xl md:text-2xl text-white uppercase tracking-tight mb-3">
                Dasbor Metrik &amp; Analisis Kinerja
              </h2>
              <p className="text-slate-300 text-xs max-w-3xl leading-relaxed">
                Konsolidasi instan seluruh widget interaktif, status pelaporan siber, jaringan konteks geospasial, telemetri keterlibatan pembaca, serta kepatuhan indeks pencarian Google News.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left/Main Column - Span 8 */}
            <div className="lg:col-span-8 space-y-6">
              <FiscalMetricsWidget />
              <BudgetTableWidget />
              <GeoEntityWidget />
              <TelemetryWidget />
            </div>

            {/* Right/Sidebar Column - Span 4 */}
            <div className="lg:col-span-4 space-y-6">
              <SeoSchemaWidget />
              <ReputationLeaderboardWidget />
              <RelatedClustersWidget />
            </div>
          </div>
        </div>
      )}

        </div> {/* Area Konten Utama End */}
      </div> {/* Sidebar Flexbox Layout End */}
    </div>
  );
}
