import React, { useState, useEffect } from 'react';
import { 
  Cpu, Database, Network, Activity, FileCode, CheckCircle, Search, Compass, 
  ShieldCheck, Layers, History, UserCheck, MapPin, Sparkles, Globe, Rss, 
  Link, Info, ExternalLink, Calendar, BookOpen, BarChart3, HelpCircle, FileText,
  Home, Newspaper, Video, Hash, Users, Radio, ShoppingCart, Lock, Briefcase, 
  Settings, ArrowRight, Check, Copy, CheckCircle2, Zap, Workflow, Eye, 
  ShieldAlert, Terminal, Sliders, LayoutDashboard, Send, Play, RefreshCw, AlertTriangle
} from 'lucide-react';

// Domain metadata representing the 25 Master Domains
export interface DomainDetail {
  id: string;
  name: string;
  category: 'core' | 'content' | 'intelligence' | 'monetization' | 'infrastructure';
  estimatedModules: number;
  estimatedFeatures: number;
  description: string;
  icon: any;
  features: string[];
  sampleCode: string;
  schemaSample: string;
}

export const mediaOSDomains: DomainDetail[] = [
  {
    id: 'core-platform',
    name: '1. Core Platform',
    category: 'core',
    estimatedModules: 25,
    estimatedFeatures: 250,
    description: 'Arsitektur dasar yang mengelola otentikasi multi-faktor, profil pengguna cerdas, dasbor widget berbasis peran, serta sistem pencarian semantik universal.',
    icon: LayoutDashboard,
    features: [
      'Authentication - Secure Login & Register',
      'Authentication - OTP & Magic Link Integration',
      'Authentication - Social Login & Multi-Factor Auth (MFA)',
      'Authentication - Session Persistence & Remember Login',
      'Authentication - Password Recovery Workflow',
      'User Profiles - Custom Avatar & Hero Cover',
      'User Profiles - Bio, Social Linkages, & Preferences',
      'User Profiles - Multi-language & Timezone Localizer',
      'User Profiles - Notification Subscriptions Settings',
      'Dashboard - Multi-widget Layout & Role Overview',
      'Dashboard - Real-time KPI Tracking Widgets',
      'Dashboard - Active Users & Recent Activity Stream',
      'Dashboard - User Bookmarks & Saved Favorites Hub',
      'Universal Search - Full-text Search & AI Query Interpreter',
      'Universal Search - Elastic Multi-filter & Sort Engine',
      'Universal Search - Saved Search Queries & Alert triggers'
    ],
    sampleCode: `// core-platform/auth.controller.ts
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  async handleMFAVerification(req: Request, res: Response) {
    const { userId, mfaCode } = req.body;
    try {
      const isValid = await AuthService.verifyMFA(userId, mfaCode);
      if (!isValid) return res.status(401).json({ error: 'MFA Code Invalid' });
      const session = await AuthService.createSession(userId);
      return res.json({ status: 'success', token: session.token });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
}`,
    schemaSample: `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "UserSessionSchema",
  "type": "object",
  "properties": {
    "userId": { "type": "string", "format": "uuid" },
    "mfaEnabled": { "type": "boolean" },
    "sessionToken": { "type": "string" },
    "expiresAt": { "type": "string", "format": "date-time" }
  }
}`
  },
  {
    id: 'news-cms',
    name: '2. News CMS',
    category: 'content',
    estimatedModules: 35,
    estimatedFeatures: 400,
    description: 'Mesin utama penulisan jurnalisme yang mengorganisir Breaking News, Live Blog interaktif, investigasi mendalam, cek fakta, serta alur kerja editorial terakreditasi.',
    icon: Newspaper,
    features: [
      'Breaking News - Instant Push Delivery Network',
      'Live Blog - Real-time WebSocket Coverage stream',
      'Articles - Rich Text Editor with Auto-save state',
      'Investigation - Collaborative Case Files & Document vault',
      'Editorial - Custom Layout & Opinion Columns Editor',
      'Fact Check - Claim Review structured data tags',
      'Explainer - Timeline block & multimedia attachments',
      'Live Updates - Scheduled snippets & auto-refreshing UI',
      'Source Manager - Confidential Source index & verification',
      'Editorial Workflow - Peer review, Proofread, and Approval stages',
      'Editorial Calendar - Multi-desk assignment planner',
      'Archive - Deep search across historical assets (20+ years)'
    ],
    sampleCode: `// news-cms/live-blog.gateway.ts
import { Server } from 'socket.io';

export class LiveBlogGateway {
  constructor(private io: Server) {}

  publishLiveUpdate(blogId: string, updatePayload: any) {
    this.io.to(\`live-blog:\${blogId}\`).emit('new-update', {
      id: updatePayload.id,
      timestamp: new Date().toISOString(),
      author: updatePayload.author,
      content: updatePayload.content,
      verified: true
    });
  }
}`,
    schemaSample: `{
  "@context": "https://schema.org",
  "@type": "LiveBlogPosting",
  "coverageStartTime": "2026-06-26T00:00:00Z",
  "headline": "Live Update: Sidang Meja Hijau Kebijakan Fiskal Jabar 2026",
  "liveBlogUpdate": []
}`
  },
  {
    id: 'viralog-contentos',
    name: '3. Universal ContentOS (VIRALOG)',
    category: 'content',
    estimatedModules: 45,
    estimatedFeatures: 500,
    description: 'Sistem Operasi Konten Universal yang meluncurkan draf tulisan, otomatisasi optimasi SEO AI, manajemen video shorts, transkripsi podcast, serta penyebaran feed sosial.',
    icon: Zap,
    features: [
      'Drafts - Multi-device cloud sync with version history',
      'AI Assistant - Contextual rewrite, spelling, and tone adjustments',
      'SEO Analyzer - Instant density, readability, and link scoring',
      'Blog Engine - Knowledge management & tutorials categorization',
      'Video Uploads - Chunked file processing & multi-format transcoders',
      'Podcast Engine - Audio streaming & ID3 tagging automated builder',
      'Social Syndicate - Instant posting feed to Facebook & X (Twitter)',
      'Document Hub - PDF & Docx embedded responsive viewers',
      'RSS Feed Generator - Customizable XML syndication channels'
    ],
    sampleCode: `// viralog/syndicator.service.ts
import { SocialAPI } from '../libs/social-api';

export class ViralogSyndicator {
  async publishCrossPlatform(articleId: string, platforms: string[]) {
    const data = await this.fetchArticleDraft(articleId);
    const results = await Promise.allSettled(platforms.map(async (platform) => {
      return SocialAPI.post({
        channel: platform,
        text: \`\${data.title} - Baca selengkapnya di INFOBOS \${data.url}\`,
        media: data.featuredImage
      });
    }));
    return results;
  }
}`,
    schemaSample: `{
  "contentOS": {
    "version": "3.5.0",
    "engine": "VIRALOG",
    "supportedFormats": ["article", "short", "video", "podcast", "document"]
  }
}`
  },
  {
    id: 'ai-intelligence',
    name: '4. AI Intelligence',
    category: 'intelligence',
    estimatedModules: 30,
    estimatedFeatures: 350,
    description: 'Mesin kecerdasan buatan terpusat (berbasis Gemini API) untuk penulisan artikel otomatis, penerjemahan bahasa instan, ekstraksi entitas & geo, serta klasifikasi sentimen otomatis.',
    icon: Sparkles,
    features: [
      'AI Writer - Generative outlines & copy expansion',
      'AI SEO Meta - Automating description and title tag suggestions',
      'AI Summarizer - Rapid TL;DR generator for dense reports',
      'AI Translator - Seamless translation to 24+ global languages',
      'AI Headline Generator - High CTR title variant generator',
      'AI Entity Extractor - Auto-tagging of people, companies, and organizations',
      'AI Geo Tagging - Physical location extraction and coordinates mapping',
      'AI Recommendation - Interest-based article clustering matrix',
      'AI Content Moderation - Anti-toxic and safe language filtering',
      'AI Audio Transcription - Speech-to-text with speaker diarization'
    ],
    sampleCode: `// ai-intelligence/gemini.service.ts
import { GoogleGenAI } from '@google/genai';

export class AIService {
  private ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  async extractEntitiesAndLocations(text: string) {
    const prompt = \`Extract entities and geopolitical regions from the following text. Return valid JSON only: \${text}\`;
    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });
    return JSON.parse(response.text);
  }
}`,
    schemaSample: `{
  "aiMetadata": {
    "modelUsed": "gemini-2.5-flash",
    "extractedEntities": ["Ridwan Kamil", "Pemprov Jabar", "Bandung"],
    "extractedGeo": { "city": "Bandung", "province": "Jawa Barat" }
  }
}`
  },
  {
    id: 'seo-engine',
    name: '5. SEO Engine',
    category: 'infrastructure',
    estimatedModules: 20,
    estimatedFeatures: 220,
    description: 'Mesin indeksasi yang menyajikan Sitemap otomatis, Robots.txt dinamis, relasi tag Canonical, integrasi Schema JSON-LD mendalam, serta detektor tautan internal yang rusak.',
    icon: Search,
    features: [
      'Sitemap - Multi-tier XML files with priority triggers',
      'Robots.txt - Dynamic user-agent directives generator',
      'Canonical Management - Self-referential tag enforcement logic',
      'Meta Manager - Header open-graph & twitter card tags',
      'JSON-LD - Automatic injection of NewsArticle, FactCheck schemas',
      'Internal Link Suggestion - Lexical similarity mapping algorithm',
      'Redirect Manager - Instant 301/302 routing controller',
      'Keyword Clustering - Semantic grouping of index terms',
      'Google News - Standalone news-sitemap validator'
    ],
    sampleCode: `// seo-engine/sitemap-generator.ts
import { Builder } from 'xml2js';

export class SitemapGenerator {
  generateXML(routes: any[]) {
    const sitemapObj = {
      urlset: {
        $: { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' },
        url: routes.map(r => ({
          loc: \`https://infobos.com\${r.path}\`,
          lastmod: r.updatedAt.toISOString().split('T')[0],
          changefreq: 'daily',
          priority: r.priority || '0.8'
        }))
      }
    };
    return new Builder().buildObject(sitemapObj);
  }
}`,
    schemaSample: `{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "INFOBOS",
  "url": "https://infobos.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://infobos.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}`
  },
  {
    id: 'social-media-hub',
    name: '6. Social Media Hub',
    category: 'content',
    estimatedModules: 25,
    estimatedFeatures: 250,
    description: 'Pusat integrasi jejaring eksternal untuk mengimpor kiriman media sosial secara berkala, melacak interaksi pengikut, menjadwalkan rilis video TikTok & Reels, serta memantau hashtag viral.',
    icon: Radio,
    features: [
      'Feed Importer - Polling APIs for YouTube, TikTok, and X',
      'Auto-sync - Automatic cross-posting of published articles',
      'Scheduler - Time-slot queue based on audience active hours',
      'Follower Analytics - Cohort charts and engagement velocity tracking',
      'Hashtag Miner - Real-time tracking of localized trending tags',
      'Discord Broadcast - Instant webhooks on breaking news',
      'WhatsApp/Telegram Channels - Instant broadcast push API'
    ],
    sampleCode: `// social-media/scheduler.ts
export class SocialScheduler {
  static async schedulePost(payload: { message: string; runAt: Date }) {
    const delay = payload.runAt.getTime() - Date.now();
    setTimeout(async () => {
      await this.sendToPlatforms(payload.message);
    }, Math.max(0, delay));
  }

  private static async sendToPlatforms(msg: string) {
    console.log(\`Broadcasting text to WhatsApp Channels & Telegram Broadcast: \${msg}\`);
  }
}`,
    schemaSample: `{
  "socialConnections": {
    "telegram": { "channelId": "@infobos_news", "active": true },
    "whatsapp": { "communityId": "infobos-jabar", "active": true }
  }
}`
  },
  {
    id: 'video-platform',
    name: '7. Video Platform',
    category: 'content',
    estimatedModules: 18,
    estimatedFeatures: 180,
    description: 'Penyedia infrastruktur pemutar video mandiri, pengelolaan playlist, rilis video shorts, generator subtitle AI otomatis, serta modul Watch Later.',
    icon: Video,
    features: [
      'Channel Setup - Creator-specific video profile settings',
      'Playlist Builder - Custom queues and autoplay sequences',
      'Shorts Player - Mobile vertical video layout with slide gesture',
      'AI Subtitle Generator - Auto transcribing audio to WebVTT subtitles',
      'HLS Streaming - Adaptive bitrate encoding for buffer-free delivery',
      'Watch History - Track progress and continue watching sync'
    ],
    sampleCode: `// video-platform/transcoder.ts
import { spawn } from 'child_process';

export class VideoTranscoder {
  static toHLS(inputPath: string, outputPath: string) {
    const ffmpeg = spawn('ffmpeg', [
      '-i', inputPath,
      '-profile:v', 'baseline',
      '-level', '3.0',
      '-start_number', '0',
      '-hls_time', '10',
      '-hls_list_size', '0',
      '-f', 'hls',
      outputPath
    ]);
    ffmpeg.stderr.on('data', (data) => console.log(\`Transcoding: \${data}\`));
  }
}`,
    schemaSample: `{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Eksplorasi Sejarah Gedung Sate Bandung",
  "description": "Video analisis mendalam sejarah Gedung Sate",
  "thumbnailUrl": "https://images.unsplash.com/photo-1541872703-74c5e44368f9",
  "uploadDate": "2026-06-26T04:30:00Z"
}`
  },
  {
    id: 'podcast-platform',
    name: '8. Podcast Platform',
    category: 'content',
    estimatedModules: 15,
    estimatedFeatures: 150,
    description: 'Sistem tata kelola episode audio & video podcast, rilis draf siaran per season, generator transkripsi AI instan, serta integrasi RSS feed Spotify & Apple Podcasts.',
    icon: Rss,
    features: [
      'Audio Hosting - High quality storage delivery networks',
      'Season Manager - Logical bundling of series episodes',
      'Interactive Transcript - Click-to-seek timestamped dialogue reader',
      'Apple/Spotify Sync - Automated RSS syndication tags generation',
      'Background Audio - HTML5 service worker audio persistent player'
    ],
    sampleCode: `// podcast-platform/rss-builder.ts
export class PodcastRSS {
  buildRSSFeed(episodes: any[]) {
    return \`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <title>INFOBOS Podcast Center</title>
    <itunes:category text="News &amp; Politics"/>
    \${episodes.map(e => \`
    <item>
      <title>\${e.title}</title>
      <enclosure url="\${e.audioUrl}" length="\${e.fileSize}" type="audio/mpeg" />
      <itunes:duration>\${e.duration}</itunes:duration>
    </item>\`).join('')}
  </channel>
</rss>\`;
  }
}`,
    schemaSample: `{
  "@context": "https://schema.org",
  "@type": "PodcastSeries",
  "name": "Kajian Cerdas INFOBOS",
  "url": "https://infobos.com/podcast",
  "webFeed": "https://infobos.com/podcast/rss.xml"
}`
  },
  {
    id: 'document-center',
    name: '9. Document Center',
    category: 'content',
    estimatedModules: 20,
    estimatedFeatures: 180,
    description: 'Pusat publikasi dokumen ilmiah PDF, konversi tulisan via Optical Character Recognition (OCR), pendeteksi highlight naskah, serta ekstraksi kesimpulan AI.',
    icon: FileText,
    features: [
      'PDF Viewer - Mobile optimized responsive canvas renderer',
      'OCR Converter - Extraction of plain text from scanned JPG/PDF',
      'AI Summarizer - Rapid outline generator for dense scientific papers',
      'Naskah Highlight - Annotation overlays persistent storage'
    ],
    sampleCode: `// document-center/ocr.service.ts
import { createWorker } from 'tesseract.js';

export class OCRService {
  static async extractText(imagePath: string): Promise<string> {
    const worker = await createWorker('ind');
    const { data: { text } } = await worker.recognize(imagePath);
    await worker.terminate();
    return text;
  }
}`,
    schemaSample: `{
  "@context": "https://schema.org",
  "@type": "DigitalDocument",
  "name": "Kajian Ekonomi Mikro Jawa Barat PMK-2026",
  "fileFormat": "application/pdf",
  "url": "https://infobos.com/docs/kajian-ekonomi-2026.pdf"
}`
  },
  {
    id: 'research-center',
    name: '10. Research Center',
    category: 'intelligence',
    estimatedModules: 20,
    estimatedFeatures: 180,
    description: 'Penyaji dokumen riset independen, dataset statistik komparatif, visualisasi bagan data interaktif, serta repositori unduhan jurnal ilmiah terakreditasi.',
    icon: BookOpen,
    features: [
      'Repository - Structural categorization of scientific journals',
      'Dataset Hub - Upload, storage, and retrieval of CSV / JSON data',
      'D3 Visualizations - Interactive vector charts for public metrics',
      'Authority Score - Page citations & verification metadata trackers'
    ],
    sampleCode: `// research/dataset.controller.ts
import { Request, Response } from 'express';

export class DatasetController {
  async fetchStatisticalCSV(req: Request, res: Response) {
    const data = [
      ['Tahun', 'Tingkat Inflasi Jabar', 'Pertumbuhan UMKM'],
      ['2024', '3.2%', '12%'],
      ['2025', '2.8%', '15%'],
      ['2026', '2.5%', '22%']
    ];
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=umkm_jabar_2026.csv');
    return res.send(data.map(row => row.join(',')).join('\\n'));
  }
}`,
    schemaSample: `{
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Pertumbuhan UMKM Jawa Barat Era Digital",
  "description": "Dataset statistik kemajuan volume UMKM di 27 Kabupaten/Kota",
  "license": "https://creativecommons.org/licenses/by/4.0/"
}`
  },
  {
    id: 'geo-intelligence',
    name: '11. Geo Intelligence',
    category: 'intelligence',
    estimatedModules: 18,
    estimatedFeatures: 180,
    description: 'Pusat data spasial regional yang menyajikan peta interaktif Jawa Barat, peringatan bencana, tren ekonomi wilayah, kluster pariwisata, serta berita lokal tingkat desa.',
    icon: MapPin,
    features: [
      'Maps - Multi-layer Leaflet or Mapbox coordinate overlays',
      'Weather integration - Real-time BMKG regional alert systems',
      'Disaster Alert - Geo-fenced SMS / WhatsApp warnings dispatcher',
      'Local Economy - Regency-level GDP activity mapping indexes',
      'Geo-fenced News - Dynamic portal rendering based on user location'
    ],
    sampleCode: `// geo-intelligence/distance.utils.ts
export class GeoUtils {
  static getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
}`,
    schemaSample: `{
  "@context": "https://schema.org",
  "@type": "Place",
  "name": "Bandung Creative Hub",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -6.9175,
    "longitude": 107.6191
  }
}`
  },
  {
    id: 'entity-intelligence',
    name: '12. Entity Intelligence',
    category: 'intelligence',
    estimatedModules: 18,
    estimatedFeatures: 180,
    description: 'Mesin klasifikasi entitas yang melacak, merangkum profil, serta membangun Knowledge Graph yang menghubungkan tokoh publik, institusi pemerintahan, dan korporat.',
    icon: Users,
    features: [
      'People Tracker - Biographical records & public appearances indexes',
      'Corporate Profile - Financial, structural, and news impact matrix',
      'Knowledge Graph - Schema structures connecting related news entities',
      'Automated Bio - Generative AI summaries for newly discovered agents'
    ],
    sampleCode: `// entity/graph.service.ts
export class EntityKnowledgeGraph {
  private relations: Map<string, Array<{ target: string; type: string }>> = new Map();

  addRelation(source: string, target: string, type: string) {
    if (!this.relations.has(source)) this.relations.set(source, []);
    this.relations.get(source)!.push({ target, type });
  }

  getRelatedEntities(entityName: string) {
    return this.relations.get(entityName) || [];
  }
}`,
    schemaSample: `{
  "knowledgeGraph": {
    "entity": "Ridwan Kamil",
    "type": "Person",
    "relationships": [
      { "target": "Pemprov Jabar", "relation": "Mantan Gubernur" },
      { "target": "IKN Nusantara", "relation": "Kurator Desain" }
    ]
  }
}`
  },
  {
    id: 'directory',
    name: '13. Directory',
    category: 'intelligence',
    estimatedModules: 20,
    estimatedFeatures: 180,
    description: 'Katalog terstruktur dan termonitor untuk instansi bisnis, startup regional, UMKM, universitas, rumah sakit, hingga kafe kreatif terakreditasi.',
    icon: Compass,
    features: [
      'Company Directory - Detailed verified profiles & review streams',
      'Startup Index - Funding stage, employee scale, and sector tracking',
      'Academic Directory - Universities and schools enrollment indicators',
      'Hospital Finder - Geo-location coordinates and medical specialties'
    ],
    sampleCode: `// directory/catalog.controller.ts
import { Request, Response } from 'express';

export class CatalogController {
  async filterDirectory(req: Request, res: Response) {
    const { category, verifiedOnly } = req.query;
    // Database query placeholder
    return res.json({
      category,
      results: [
        { id: 1, name: 'PT Telkom Indonesia', sector: 'Telecommunication', verified: true },
        { id: 2, name: 'Bandung Tech University', sector: 'Education', verified: true }
      ]
    });
  }
}`,
    schemaSample: `{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "PT Jabar Digital Service",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Bandung",
    "addressRegion": "Jawa Barat",
    "addressCountry": "ID"
  }
}`
  },
  {
    id: 'monitoring-center',
    name: '14. Monitoring Center',
    category: 'intelligence',
    estimatedModules: 30,
    estimatedFeatures: 350,
    description: 'Platform pengawasan media terus-menerus untuk melacak tren keyword, mengidentifikasi krisis brand, memonitor pemberitaan instansi pemerintah, serta klasifikasi sentimen negatif/positif.',
    icon: Activity,
    features: [
      'News Monitor - Multi-source crawler for brand tracking',
      'Social Listener - Live stream scraper for X, TikTok, and Reddit mentions',
      'Sentiment Classifier - AI-driven negative, neutral, and positive sorting',
      'Crisis Alert - Instant trigger when negative volume exceeds 15% threshold'
    ],
    sampleCode: `// monitoring/listener.ts
export class CrisisListener {
  private alertThreshold = 0.15; // 15% Negative sentiment ratio

  checkSentimentRatio(positive: number, negative: number) {
    const total = positive + negative;
    if (total === 0) return false;
    const ratio = negative / total;
    if (ratio > this.alertThreshold) {
      this.dispatchCrisisNotification(ratio);
      return true;
    }
    return false;
  }

  private dispatchCrisisNotification(ratio: number) {
    console.warn(\`🚨 CRISIS ALERT: Negative sentiment at \${(ratio * 100).toFixed(1)}%!\`);
  }
}`,
    schemaSample: `{
  "monitoringScope": {
    "targetBrand": "Pemprov Jabar",
    "keywords": ["APBD", "Kemacetan", "Korupsi"],
    "alertMethods": ["email", "slack", "sms"]
  }
}`
  },
  {
    id: 'analytics-bi',
    name: '15. Analytics BI',
    category: 'infrastructure',
    estimatedModules: 25,
    estimatedFeatures: 300,
    description: 'Dasbor Business Intelligence yang menganalisis rasio konversi funnel pembaca, performa iklan mandiri, visualisasi heatmap halaman, serta analisis retensi audiens.',
    icon: BarChart3,
    features: [
      'Traffic Analytics - Real-time unique visitors & pageview indicators',
      'Funnel Conversion - Tracking subscription paths from visitor to Premium',
      'Heatmap Engine - Tracking click coordinates & scroll depth indexes',
      'Revenue Board - ADOS advertiser spend and monthly billing cohorts'
    ],
    sampleCode: `// analytics/tracker.ts
export class PageviewTracker {
  static trackEvent(userId: string, path: string, durationMs: number) {
    const event = {
      userId,
      path,
      durationMs,
      timestamp: new Date().toISOString(),
      deviceType: this.getDeviceType()
    };
    // Send payload to Clickhouse/BigQuery streaming pipeline
    console.log('Ingesting Analytics Event:', event);
  }

  private static getDeviceType() {
    return 'Desktop-Web';
  }
}`,
    schemaSample: `{
  "analyticsReport": {
    "dateRange": "2026-06-25 s/d 2026-06-26",
    "uniqueVisitors": 142050,
    "conversionRate": "2.4%"
  }
}`
  },
  {
    id: 'advertising-os',
    name: '16. Advertising OS (AdOS)',
    category: 'monetization',
    estimatedModules: 35,
    estimatedFeatures: 450,
    description: 'Sistem monetisasi internal untuk mengelola penempatan slot iklan secara presisi (Top Leaderboard, In-article, Sticky Side), mengunggah materi kreatif pengiklan, dan memproses invoice digital.',
    icon: ShoppingCart,
    features: [
      'Placement Manager - Visual layout slot mapping controller',
      'Creative Vault - Secure storage for advertiser banners/videos',
      'Audience Targeting - Demographics and geofenced display algorithms',
      'Invoice Center - Automating billing generation and credit card transactions'
    ],
    sampleCode: `// ados/placement.service.ts
export class AdPlacementService {
  static getActiveAdForZone(zone: string, tags: string[]): any {
    const mockInventory = [
      { id: 'ad-01', zone: 'top_leaderboard', bannerUrl: 'https://placehold.co/728x90', targetUrl: 'https://promo.id' }
    ];
    return mockInventory.find(ad => ad.zone === zone) || null;
  }
}`,
    schemaSample: `{
  "adosCampaign": {
    "campaignId": "camp-991",
    "client": "PT Indofood CBP",
    "budgetLimit": 50000000,
    "activePlacement": "top_leaderboard"
  }
}`
  },
  {
    id: 'marketplace',
    name: '17. Marketplace',
    category: 'monetization',
    estimatedModules: 20,
    estimatedFeatures: 180,
    description: 'Katalog iklan baris, bursa lowongan kerja, promosi acara premium, layanan pemesanan sponsor mandiri, serta pusat komisi afiliasi yang terintegrasi.',
    icon: Link,
    features: [
      'Self-service Sponsor - Seamless article or podcast placement checkout',
      'Classified Board - Peer-to-peer advertising options for regional UMKM',
      'Recruitment Portal - Job listing board for creative & tech talent',
      'Affiliate Program - Automated click tracking & payout scheduler'
    ],
    sampleCode: `// marketplace/checkout.service.ts
export class MarketplaceCheckout {
  async createSponsorshipInvoice(clientId: string, packageType: 'article' | 'podcast') {
    const rateCard = { article: 5000000, podcast: 8000000 };
    const amount = rateCard[packageType];
    return {
      invoiceId: \`MKT-\${Math.floor(Math.random() * 100000)}\`,
      clientId,
      amount,
      status: 'pending_payment',
      dueDate: new Date(Date.now() + 86400000 * 3)
    };
  }
}`,
    schemaSample: `{
  "@context": "https://schema.org",
  "@type": "Offer",
  "price": "5000000",
  "priceCurrency": "IDR",
  "itemOffered": {
    "@type": "Service",
    "name": "Sponsored Article Publication INFOBOS"
  }
}`
  },
  {
    id: 'membership',
    name: '18. Membership & Paywall',
    category: 'monetization',
    estimatedModules: 18,
    estimatedFeatures: 180,
    description: 'Pengelola tingkatan langganan (Free, Premium, Corporate, Enterprise) pembatasan akses naskah eksklusif (paywall), serta integrasi dompet digital dan kartu kredit.',
    icon: Lock,
    features: [
      'Tier Manager - Logical settings for article paywall limits',
      'Dynamic Paywall - Metered access rules (3 articles free/month)',
      'Corporate Portal - Multi-seat subscription management panel',
      'Billing Engine - Auto-recurring charges with failed payment retries'
    ],
    sampleCode: `// membership/paywall.middleware.ts
import { Request, Response, NextFunction } from 'express';

export class PaywallMiddleware {
  static checkAccess(req: Request, res: Response, next: NextFunction) {
    const user = (req as any).user;
    const articleIsPremium = req.body.isPremium;

    if (articleIsPremium && (!user || user.tier !== 'premium')) {
      return res.status(402).json({
        error: 'Access Restricted',
        message: 'Konten khusus anggota premium INFOBOS. Silakan berlangganan.'
      });
    }
    return next();
  }
}`,
    schemaSample: `{
  "paywallConfig": {
    "meteredFreeLimit": 3,
    "premiumTiers": ["premium_monthly", "premium_yearly", "corporate_enterprise"]
  }
}`
  },
  {
    id: 'community',
    name: '19. Community',
    category: 'content',
    estimatedModules: 25,
    estimatedFeatures: 250,
    description: 'Ekosistem penulis warga (citizen journalists), forum diskusi pembaca, jajak pendapat, serta sistem pemberian reward koin bagi kontributor aktif.',
    icon: UserCheck,
    features: [
      'Creator Platform - Submission dashboard for independent journalists',
      'Forum Threads - Categorized message boards with moderate queues',
      'Surveys & Polls - Instant responsive widget for collecting public feedback',
      'Rewards Wallet - Activity score to point system conversion tracker'
    ],
    sampleCode: `// community/rewards.service.ts
export class CommunityRewards {
  static calculatePoints(action: 'comment' | 'article_published') {
    const rules = { comment: 5, article_published: 150 };
    return rules[action] || 0;
  }

  static async awardPointsToUser(userId: string, points: number) {
    console.log(\`Awarding \${points} points to User ID \${userId} for active participation.\`);
  }
}`,
    schemaSample: `{
  "rewardTransaction": {
    "userId": "usr-882",
    "action": "article_published",
    "awardedPoints": 150,
    "walletBalance": 1420
  }
}`
  },
  {
    id: 'notification-center',
    name: '20. Notification Center',
    category: 'infrastructure',
    estimatedModules: 15,
    estimatedFeatures: 120,
    description: 'Pusat pengiriman pesan transaksional dan siaran massal melalui email, in-app push, SMS, Telegram bot, hingga pesan otomatis WhatsApp.',
    icon: Info,
    features: [
      'Transactional Email - Instant layout compile for verification codes',
      'In-App Toast - Real-time screen notifications via WebSockets',
      'Push Notifications - Google Firebase Cloud Messaging worker',
      'WhatsApp Automation - Official Meta Cloud API transaction templates'
    ],
    sampleCode: `// notifications/dispatcher.ts
export class NotificationDispatcher {
  static async sendInAppNotification(userId: string, text: string) {
    // Send to live WebSocket pool
    console.log(\`Pushing WebSocket Notification to \${userId}: \${text}\`);
  }

  static async sendTelegramAlert(chatId: string, markdown: string) {
    // Post to Telegram Bot HTTP Endpoint
    console.log(\`Pushing Telegram Bot Payload: \${markdown}\`);
  }
}`,
    schemaSample: `{
  "notificationTemplate": {
    "id": "tpl-breaking",
    "channels": ["push", "telegram"],
    "priority": "high"
  }
}`
  },
  {
    id: 'crm',
    name: '21. CRM & Lead Center',
    category: 'monetization',
    estimatedModules: 15,
    estimatedFeatures: 180,
    description: 'Dasbor pelacakan negosiasi pengiklan mandiri, status proposal kerja sama media, siklus kontrak korporasi, serta pipeline penjualan iklan.',
    icon: Briefcase,
    features: [
      'Pipeline Manager - Drag-and-drop deal board (Lead, Contact, Negotiate, Won)',
      'Proposal Builder - Automated rate card calculation PDFs',
      'Contract Tracker - Signing verification dates & terms registry',
      'Sales Metrics - Closed revenue vs targets tracking graph'
    ],
    sampleCode: `// crm/pipeline.ts
export class CRMPipeline {
  static getStages() {
    return [
      { key: 'lead', name: 'Prospecting & Leads' },
      { key: 'proposal', name: 'Proposal Sent' },
      { key: 'negotiating', name: 'Negotiation' },
      { key: 'signed', name: 'Contract Signed / Won' }
    ];
  }
}`,
    schemaSample: `{
  "crmDeal": {
    "dealId": "deal-344",
    "advertiser": "PT Bank Mandiri Jabar",
    "pipelineStage": "proposal",
    "estimatedValue": 120000000
  }
}`
  },
  {
    id: 'api-platform',
    name: '22. API Platform',
    category: 'infrastructure',
    estimatedModules: 20,
    estimatedFeatures: 200,
    description: 'Penyedia gerbang interaksi eksternal (REST & GraphQL) dengan fitur pembatasan akses rate-limit, validasi API Keys pihak ketiga, serta pengiriman webhooks.',
    icon: FileCode,
    features: [
      'REST Endpoints - Fastify / Express standard JSON controller routes',
      'GraphQL Server - Schema resolvers for news entities queries',
      'Rate Limiter - IP and API Key redis-based request counting middleware',
      'Webhooks Dispatcher - Payload broadcast on newly published content'
    ],
    sampleCode: `// api-platform/rate-limit.middleware.ts
import { Request, Response, NextFunction } from 'express';

export class RateLimiter {
  private static reqs = new Map<string, { count: number; reset: number }>();

  static checkLimit(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip || 'unknown';
    const now = Date.now();
    const clientData = this.reqs.get(ip) || { count: 0, reset: now + 60000 };

    if (now > clientData.reset) {
      clientData.count = 1;
      clientData.reset = now + 60000;
    } else {
      clientData.count++;
    }

    this.reqs.set(ip, clientData);

    if (clientData.count > 100) {
      return res.status(429).json({ error: 'Too Many Requests', limit: 100 });
    }
    return next();
  }
}`,
    schemaSample: `{
  "apiDocumentation": {
    "version": "v1.4",
    "baseUrl": "https://api.infobos.com/v1",
    "endpoints": ["/articles", "/topics", "/entities", "/geo"]
  }
}`
  },
  {
    id: 'security',
    name: '23. Security & RBAC',
    category: 'infrastructure',
    estimatedModules: 25,
    estimatedFeatures: 220,
    description: 'Pengawal sistem yang menerapkan keamanan Role-Based Access Control (RBAC), rekaman riwayat Audit Log, enkripsi data, pembatasan jangkauan IP, serta pencegahan serangan SQL Injection.',
    icon: ShieldCheck,
    features: [
      'RBAC - Role definition matrix (Superadmin, Chief Editor, Reporter, Moderator)',
      'Audit Trail - Unalterable DB logging for sensitive CMS mutations',
      'IP Whitelisting - Hardened restricted panel for internal editorial staff',
      'Encryption Vault - AES-256 for secure third-party credentials storage'
    ],
    sampleCode: `// security/rbac.middleware.ts
import { Request, Response, NextFunction } from 'express';

export class RBACMiddleware {
  static restrictToRoles(allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const user = (req as any).user;
      if (!user || !allowedRoles.includes(user.role)) {
        return res.status(403).json({
          error: 'Forbidden Access',
          reason: 'Level kewenangan jabatan tidak mencukupi untuk modul ini.'
        });
      }
      return next();
    };
  }
}`,
    schemaSample: `{
  "auditLog": {
    "actor": "editor-budi@infobos.com",
    "action": "delete_article",
    "targetId": "art-102",
    "timestamp": "2026-06-26T04:32:00Z"
  }
}`
  },
  {
    id: 'settings',
    name: '24. Settings Manager',
    category: 'infrastructure',
    estimatedModules: 20,
    estimatedFeatures: 180,
    description: 'Konfigurasi branding (logo, warna primer), integrasi penyimpanan awan (S3), kunci API penyedia AI Gemini, serta preferensi template notifikasi email.',
    icon: Settings,
    features: [
      'Branding settings - Logo uploads, favicon, primary color hex values',
      'Cloud Storage - AWS S3, Google Cloud Storage CDN keys mapping',
      'AI Provider Keys - Dynamic API Key updates for Google AI models',
      'Ad Zones - Enable / Disable targeted monetizations instantly'
    ],
    sampleCode: `// settings/config.ts
export class SettingsManager {
  private static configData = {
    appName: 'INFOBOS MediaOS',
    primaryColor: '#002B5B',
    storageProvider: 'Google Cloud Storage',
    enableAIHeadline: true
  };

  static updateConfig(key: string, value: any) {
    (this.configData as any)[key] = value;
    console.log(\`Config updated: \${key} -> \${value}\`);
  }

  static getConfig() {
    return this.configData;
  }
}`,
    schemaSample: `{
  "generalSettings": {
    "appName": "INFOBOS",
    "primaryColor": "#002B5B",
    "enableAIHeadline": true
  }
}`
  },
  {
    id: 'system',
    name: '25. System Engine',
    category: 'infrastructure',
    estimatedModules: 20,
    estimatedFeatures: 180,
    description: 'Mesin eksekusi latar belakang yang mengelola penjadwalan tugas (cron jobs), antrean rilis, sistem caching Redis, pemantauan kesehatan kontainer, serta CDN.',
    icon: Cpu,
    features: [
      'Cron Scheduler - Regular task trigger executor (daily cleanups, rss refreshes)',
      'Task Queue - BullMQ asynchronous processor for heavy media files',
      'Redis Cache - Automated in-memory storage of frequent homepage requests',
      'Health check - Server heartbeats & container status logging API'
    ],
    sampleCode: `// system/scheduler.ts
import { schedule } from 'node-cron';

export class CronScheduler {
  static initJobs() {
    // Execute cache invalidation every hour
    schedule('0 * * * *', () => {
      console.log('🔄 Cron: Invalidating expired static news feeds and homepage cache...');
    });

    // Execute daily backup at midnight
    schedule('0 0 * * *', () => {
      console.log('💾 Cron: Initiating scheduled full cloud database backups...');
    });
  }
}`,
    schemaSample: `{
  "systemHealth": {
    "status": "HEALTHY",
    "uptimeSeconds": 1450200,
    "redisConnected": true,
    "diskUsagePercentage": 42
  }
}`
  }
];

// Enterprise Modules recommendations metadata
export interface EnterpriseModule {
  id: string;
  name: string;
  function: string;
  icon: any;
  subfeatures: string[];
  flowchart: string[];
}

export const enterpriseModules: EnterpriseModule[] = [
  {
    id: 'dam',
    name: 'Digital Asset Management (DAM)',
    function: 'Pusat pengelolaan foto, video, audio, dokumen, logo, dan aset kreatif dengan versioning, metadata, lisensi, serta AI tagging.',
    icon: Database,
    subfeatures: [
      'Multi-Format Versioning Control',
      'Auto-generation of Thumbnails & Transcodes',
      'Smart AI Auto-tagging & Description Generation',
      'Licensing & Rights Management with expiration alerts',
      'Advanced Metadata tagging (EXIF extractor & custom taxonomies)'
    ],
    flowchart: [
      'User uploads asset',
      'AI triggers EXIF/Metadata extraction & smart tags generation',
      'Transcoder auto-compiles multi-bitrate HLS and proxy sizes',
      'System files under specific Licensing policies',
      'Asset becomes instantly searchable across CMS desks'
    ]
  },
  {
    id: 'editorial-planning',
    name: 'Editorial Planning & Newsroom',
    function: 'Perencanaan liputan, assignment reporter, kalender editorial, budget liputan, approval, dan koordinasi redaksi.',
    icon: Calendar,
    subfeatures: [
      'Dynamic Editorial Planner Calendar',
      'Reporter Assignments & Coverage Budgeting Tracker',
      'Real-time Chat and Collaborative Editing Rooms',
      'Multi-tier Editorial Approval Workflow',
      'Reporters Location Tracking & Live Dispatching'
    ],
    flowchart: [
      'Editor raises a Coverage Proposal with budget allocation',
      'Chief Editor approves the issue & budget limit',
      'Reporter receives push assignment alert with geo-tag',
      'Reporter uploads draft text + active multimedia elements',
      'Review workflow triggers copy-editing, proofreading, and schedule'
    ]
  },
  {
    id: 'content-syndication',
    name: 'Content Syndication Hub',
    function: 'Distribusi konten ke website, aplikasi, media sosial, RSS, newsletter, partner media, dan API dari satu tempat.',
    icon: Network,
    subfeatures: [
      'Multi-channel API distribution engine',
      'Instant syndication to affiliate news nodes',
      'Dynamic RSS Custom Feed builder (per topic, per area)',
      'Automated Newsletter campaign compilers',
      'Social platforms automated scheduler & post pushers'
    ],
    flowchart: [
      'Article is finalized and published in CMS',
      'Syndication Hub compiles raw item to XML, JSON, and HTML channels',
      'Webhooks alert affiliate partner platforms immediately',
      'Social media cross-posts triggered via background queues',
      'Scheduled email newsletter dispatch fetches updated items'
    ]
  },
  {
    id: 'consent-privacy',
    name: 'Consent & Privacy Center',
    function: 'Pengelolaan cookie consent, preferensi privasi, dan kepatuhan regulasi.',
    icon: ShieldCheck,
    subfeatures: [
      'Granular Cookie consent customizable banners',
      'GDPR / CCPA / Kepatuhan PDP Indonesia compliance validator',
      'Reader-facing Privacy Preferences portal',
      'DNT (Do Not Track) header respect algorithms',
      'Unalterable consent records database logging'
    ],
    flowchart: [
      'Visitor loads INFOBOS portal from EU or ID IP addresses',
      'GDPR/PDP compliant dialog displays requesting granular consent',
      'Visitor sets preferences (Analytical: Yes, Marketing: No)',
      'System injects specific tracking cookies strictly based on selections',
      'Visitor can modify configurations anytime via Privacy footer'
    ]
  },
  {
    id: 'experiment-personalization',
    name: 'Experiment & Personalization',
    function: 'A/B testing headline, hero banner, layout, rekomendasi konten, serta personalisasi berdasarkan minat pembaca.',
    icon: Sliders,
    subfeatures: [
      'Real-time Headline A/B Testing (auto selects highest CTR)',
      'Dynamic Homepage visual layout swapping algorithms',
      'Reader Interest Affinity scoring engine',
      'AI Recommendation carousel (based on reading history & bookmarks)',
      'Geofenced content personalizations (pariwisata, ekonomi regional)'
    ],
    flowchart: [
      'Reporter submits 2 headline variants for a breaking article',
      'Traffic split algorithm displays Title A to 50% and Title B to 50%',
      'SGE Analytics counts clicks & session duration per headline',
      'After 15 mins, highest click-through-rate variant is locked globally',
      'Affinity engine uses outcome to update readers specific recommendation carousels'
    ]
  },
  {
    id: 'knowledge-graph',
    name: 'Knowledge Graph & Information Graph',
    function: 'Mesin relasi otomatis antara artikel, video, podcast, topik, lokasi, organisasi, dan tokoh sehingga setiap halaman menjadi hub informasi yang kaya.',
    icon: Hash,
    subfeatures: [
      'Automated Entity Relational discovery algorithm',
      'Interactive visual network map generator',
      'JSON-LD rich semantic micro-data auto injectors',
      'Dynamic internal contextual article linker',
      'Related entity profile page generator'
    ],
    flowchart: [
      'Content team publishes a political report about Jabar development',
      'Knowledge Graph parser scans text for registered entities',
      'Semantic ties established: [Ridwan Kamil] -> [Kategori: Politik] -> [Lokasi: Gedung Sate]',
      'System injects automated contextual hyperlinks on keywords inside article',
      'Article dynamically populates Sidebar Widget of both Ridwan Kamil & Gedung Sate hubs'
    ]
  },
  {
    id: 'automation-workflow',
    name: 'Automation & Workflow Engine',
    function: 'Builder workflow tanpa kode untuk approval, notifikasi, publikasi terjadwal, dan otomasi lintas modul.',
    icon: Workflow,
    subfeatures: [
      'Visual No-code drag-and-drop Workflow designer',
      'Action-Trigger condition mapping rules (e.g. If Sentiment Negative, Then Notify Public Relations)',
      'Scheduled timers & retry logics',
      'Webhooks listener and dispatcher nodes builder'
    ],
    flowchart: [
      'Administrator builds visual flow: "On Breaking News Published"',
      'System triggers: 1. Send mobile push notification, 2. Broadcast to Telegram Channel',
      'Wait 5 minutes',
      'Query analytics for click count. If > 5,000, schedule banner feature on Main Carousel',
      'On error, alert editor-on-duty via SMS'
    ]
  },
  {
    id: 'enterprise-integration',
    name: 'Enterprise Integration Hub',
    function: 'Integrasi dengan analytics, email marketing, CRM, payment gateway, cloud storage, SSO, dan berbagai API pihak ketiga.',
    icon: Briefcase,
    subfeatures: [
      'Pre-built integrations (Stripe, Midtrans, Mailchimp, Salesforce, Google BigQuery)',
      'Single Sign-On (SSO) SAML and OAuth 2.0 adapters',
      'Dynamic API key authorization vault',
      'Centralized payload error-handling queue trackers'
    ],
    flowchart: [
      'User triggers premium upgrade checkout via Credit Card',
      'SSO verifies active credentials with corporate tenant directory',
      'Midtrans processes payment transaction securely',
      'Webhook listener catches payment success and triggers upgrade',
      'Salesforce CRM record is automatically compiled with billing details'
    ]
  }
];

export default function MediaOSHub() {
  const [activeTab, setActiveTab] = useState<'blueprint' | 'enterprise' | 'simulation' | 'metrics'>('blueprint');
  const [selectedDomain, setSelectedDomain] = useState<DomainDetail>(mediaOSDomains[0]);
  const [selectedEnterprise, setSelectedEnterprise] = useState<EnterpriseModule>(enterpriseModules[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCodeTab, setActiveCodeTab] = useState<'controller' | 'schema'>('controller');
  
  // Terminal Logs states for System Events Simulator
  const [terminalLogs, setTerminalLogs] = useState<Array<{ time: string; text: string; type: 'system' | 'ai' | 'monetization' | 'error' }>>([
    { time: '11:28:57', text: 'MediaOS Kernel v3.1.2 initialized successfully.', type: 'system' },
    { time: '11:28:58', text: 'Redis Caching Pool connected on port 6379.', type: 'system' },
    { time: '11:28:59', text: 'Gemini-2.5-flash LLM model ready for automated content classification.', type: 'ai' },
    { time: '11:29:00', text: 'Active AdOS monetization inventories loaded (14 active placements).', type: 'monetization' }
  ]);

  // Simulated metrics state that fluctuates slightly
  const [systemMetrics, setSystemMetrics] = useState({
    cpu: 34,
    ram: 58,
    queueLatency: 12,
    cacheHitRatio: 94.2,
    totalApiCalls: 142050
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        cpu: Math.max(15, Math.min(85, prev.cpu + Math.floor(Math.random() * 9) - 4)),
        ram: Math.max(45, Math.min(95, prev.ram + Math.floor(Math.random() * 3) - 1)),
        queueLatency: Math.max(4, Math.min(45, prev.queueLatency + Math.floor(Math.random() * 5) - 2)),
        cacheHitRatio: Math.max(90, Math.min(99.9, prev.cacheHitRatio + (Math.random() * 0.4 - 0.2))),
        totalApiCalls: prev.totalApiCalls + Math.floor(Math.random() * 12)
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const addTerminalLog = (text: string, type: 'system' | 'ai' | 'monetization' | 'error' = 'system') => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    setTerminalLogs(prev => [...prev.slice(-30), { time: timeStr, text, type }]);
  };

  const handleSimulateEvent = (eventName: string) => {
    addTerminalLog(`Initiating action trigger: ${eventName}...`, 'system');
    
    setTimeout(() => {
      if (eventName === 'syndicate') {
        addTerminalLog('Syndication task compiled for Jabar News Syndicate Network (6 portals).', 'system');
        addTerminalLog('Broadcasting ContentPayload to: Web, TikTok Feed, and RSS Feed...', 'system');
        addTerminalLog('SUCCESS: Content syndication completed with 100% receipt confirmations.', 'system');
      } else if (eventName === 'ai-summary') {
        addTerminalLog('Requesting Gemini LLM API with research corpus (32kb)...', 'ai');
        addTerminalLog('Processing summarization prompts & generating structured key findings.', 'ai');
        addTerminalLog('SUCCESS: Created semantic outlines, 5 AI key facts, and FAQ datasets.', 'ai');
      } else if (eventName === 'ados-optimize') {
        addTerminalLog('Analyzing inventory conversions on: top_leaderboard & in_article_sticky.', 'monetization');
        addTerminalLog('Recalculating audience geofencing bids for Bandung Regional.', 'monetization');
        addTerminalLog('SUCCESS: CPM parameters adjusted (+4.2% CTR potential estimated).', 'monetization');
      } else if (eventName === 'backup') {
        addTerminalLog('Starting system snapshot process for database infobos_core...', 'system');
        addTerminalLog('Uploading compressed snapshots to Google Cloud Coldline Storage...', 'system');
        addTerminalLog('SUCCESS: Scheduled system backup completed successfully (ID: bkp-2991-jabar).', 'system');
      } else {
        addTerminalLog('Executing default health evaluation script...', 'system');
        addTerminalLog('Check completed: 0 security errors, 100% nodes functional.', 'system');
      }
    }, 600);
  };

  // Filter 25 domains based on query
  const filteredDomains = mediaOSDomains.filter(dom => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const matchName = dom.name.toLowerCase().includes(q);
    const matchDesc = dom.description.toLowerCase().includes(q);
    const matchFeats = dom.features.some(f => f.toLowerCase().includes(q));
    return matchName || matchDesc || matchFeats;
  });

  return (
    <div id="mediaos-master-hub" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-800 dark:text-slate-100">
      
      {/* 1. HERO HEADER AREA */}
      <div className="bg-gradient-to-r from-[#002B5B] via-[#001D3D] to-[#000814] border border-[#003566] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl text-left">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-[#FFD700]/15 text-[#FFD700] text-[10px] font-mono font-black uppercase tracking-widest rounded-full border border-[#FFD700]/25 flex items-center gap-1.5 animate-pulse">
                <Cpu className="h-3.5 w-3.5" />
                Universal Operating System Architecture
              </span>
              <span className="px-3 py-1 bg-teal-500/15 text-teal-300 text-[10px] font-mono font-bold uppercase tracking-widest rounded-full border border-teal-500/20">
                MediaOS Enterprise v3.1.2
              </span>
            </div>
            
            <h1 className="font-display font-extrabold text-2xl sm:text-3.5xl tracking-tight text-white leading-tight">
              Universal Media Intelligence Operating System (MediaOS)
            </h1>
            
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Arsitektur blueprint komprehensif INFOBOS yang menyinergikan portal berita berskala masif, mesin viralitas konten <strong>(VIRALOG ContentOS)</strong>, visualisasi data cerdas, robot pengawas sentimen media, serta gerbang otomatisasi periklanan mandiri <strong>(AdOS)</strong>.
            </p>
          </div>

          <div className="flex flex-row sm:flex-col lg:flex-row gap-3 shrink-0">
            <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl text-center min-w-[110px]">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">DOMAIN UTAMA</div>
              <div className="text-2xl font-black text-[#FFD700] mt-0.5">25+</div>
              <div className="text-[9px] text-slate-400">Master Core</div>
            </div>
            <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl text-center min-w-[110px]">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">MIKRO FITUR</div>
              <div className="text-2xl font-black text-white mt-0.5">4.000+</div>
              <div className="text-[9px] text-teal-400 font-semibold">Scalable Stack</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. LIVE SYSTEM RUNTIME METRICS BAR */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 text-white flex items-center gap-3 shadow-xs">
          <div className="p-2 bg-indigo-950 text-indigo-400 rounded-xl">
            <Activity className="h-5 w-5" />
          </div>
          <div className="text-left">
            <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">CPU UTILIATION</span>
            <span className="text-base font-black font-mono">{systemMetrics.cpu}%</span>
            <div className="w-16 bg-slate-800 h-1 rounded-full overflow-hidden mt-1">
              <div className="bg-indigo-500 h-full transition-all duration-1000" style={{ width: `${systemMetrics.cpu}%` }}></div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 text-white flex items-center gap-3 shadow-xs">
          <div className="p-2 bg-teal-950 text-teal-400 rounded-xl">
            <Database className="h-5 w-5" />
          </div>
          <div className="text-left">
            <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">RAM ALLOCATION</span>
            <span className="text-base font-black font-mono">{systemMetrics.ram}%</span>
            <div className="w-16 bg-slate-800 h-1 rounded-full overflow-hidden mt-1">
              <div className="bg-teal-500 h-full transition-all duration-1000" style={{ width: `${systemMetrics.ram}%` }}></div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 text-white flex items-center gap-3 shadow-xs">
          <div className="p-2 bg-amber-950 text-amber-400 rounded-xl">
            <Cpu className="h-5 w-5" />
          </div>
          <div className="text-left">
            <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">QUEUE LATENCY</span>
            <span className="text-base font-black font-mono">{systemMetrics.queueLatency}ms</span>
            <span className="block text-[8px] text-emerald-400 font-medium">Optimal Queue</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 text-white flex items-center gap-3 shadow-xs">
          <div className="p-2 bg-emerald-950 text-emerald-400 rounded-xl">
            <Zap className="h-5 w-5" />
          </div>
          <div className="text-left">
            <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">CACHE HIT RATIO</span>
            <span className="text-base font-black font-mono">{systemMetrics.cacheHitRatio.toFixed(2)}%</span>
            <span className="block text-[8px] text-slate-400">Redis Memory Store</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 text-white flex items-center gap-3 col-span-2 md:col-span-1 shadow-xs">
          <div className="p-2 bg-[#FFD700]/10 text-[#FFD700] rounded-xl">
            <Globe className="h-5 w-5" />
          </div>
          <div className="text-left">
            <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">SIMULATED REQS</span>
            <span className="text-base font-black font-mono">{systemMetrics.totalApiCalls.toLocaleString()}</span>
            <span className="block text-[8px] text-teal-400">API Requests logged</span>
          </div>
        </div>
      </div>

      {/* 3. CORE VIEW TABS SELECTOR */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        {[
          { key: 'blueprint', name: '25 Master Core Domains', icon: Layers },
          { key: 'enterprise', name: '8 Advanced Enterprise Modules', icon: Briefcase },
          { key: 'simulation', name: 'Background Task Simulator', icon: Play },
          { key: 'metrics', name: 'Arsitektur & Matrix Estimasi', icon: BarChart3 }
        ].map((t) => {
          const Icon = t.icon;
          const isSelected = activeTab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key as any)}
              className={`flex items-center gap-2 px-5 py-3.5 border-b-2 text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                isSelected 
                  ? 'border-[#002B5B] text-[#002B5B] dark:border-teal-400 dark:text-teal-400' 
                  : 'border-transparent text-slate-500 hover:text-[#002B5B] hover:border-slate-300 dark:hover:text-slate-200 dark:hover:border-slate-700'
              }`}
            >
              <Icon className="h-4.5 w-4.5" />
              {t.name}
            </button>
          );
        })}
      </div>

      {/* 4. TAB 1: 25 MASTER CORE DOMAINS SEARCH & INSPECTOR */}
      {activeTab === 'blueprint' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* SEARCH COMPARTMENT */}
          <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl text-left flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:max-w-lg">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Cari domain utama atau nama fitur mikro (cth: 'auth', 'gemini', 'paywall')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#002B5B]/10 focus:border-[#002B5B] dark:focus:border-teal-500 transition"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span>Saring Kategori:</span>
              <button 
                onClick={() => setSearchQuery('')}
                className="px-3 py-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-full hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300"
              >
                Semua
              </button>
              <button 
                onClick={() => setSearchQuery('Intelligence')}
                className="px-3 py-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-full hover:bg-slate-50 dark:hover:bg-slate-900 text-[#2B7A78] dark:text-teal-400"
              >
                Intelligence Hubs
              </button>
              <button 
                onClick={() => setSearchQuery('Infrastructure')}
                className="px-3 py-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-full hover:bg-slate-50 dark:hover:bg-slate-900 text-indigo-700 dark:text-indigo-400"
              >
                Sistem & Infrastruktur
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
            
            {/* LEFT: DOMAINS GRID LIST */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs max-h-[550px] overflow-y-auto space-y-2">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                <span className="text-xs font-black text-[#002B5B] dark:text-teal-400 uppercase tracking-wider">DAFTAR INTEGRASI DOMAIN</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono font-bold">25 Core Areas</span>
              </div>

              {filteredDomains.map((dom) => {
                const DomIcon = dom.icon;
                const isSelected = selectedDomain.id === dom.id;
                return (
                  <div
                    key={dom.id}
                    onClick={() => setSelectedDomain(dom)}
                    className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between gap-3 ${
                      isSelected 
                        ? 'bg-[#002B5B] dark:bg-indigo-950 text-white border-[#002B5B] dark:border-indigo-800 shadow-sm' 
                        : 'bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 border-slate-150 dark:border-slate-850 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-white/10 text-[#FFD700]' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[#002B5B] dark:text-teal-400'}`}>
                        <DomIcon className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <h4 className="font-display font-black text-xs leading-tight">{dom.name}</h4>
                        <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold uppercase tracking-wider mt-1 inline-block ${
                          dom.category === 'intelligence' ? 'bg-teal-900/10 text-teal-400' :
                          dom.category === 'infrastructure' ? 'bg-indigo-900/10 text-indigo-400' :
                          dom.category === 'monetization' ? 'bg-amber-900/10 text-amber-400' :
                          'bg-slate-900/10 text-slate-400'
                        }`}>
                          {dom.category}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] font-black leading-tight">{dom.estimatedFeatures}</div>
                      <div className={`text-[8px] uppercase tracking-wider font-bold ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>FITUR MIKRO</div>
                    </div>
                  </div>
                );
              })}

              {filteredDomains.length === 0 && (
                <div className="text-center py-10 text-xs text-slate-400 italic">
                  Tidak ada domain yang cocok dengan "{searchQuery}"
                </div>
              )}
            </div>

            {/* RIGHT: COMPREHENSIVE COMPONENT INSPECTOR */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
              
              <div className="space-y-5">
                {/* Header Information */}
                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4 justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-slate-950 text-[#FFD700] rounded-2xl border border-slate-850">
                      {React.createElement(selectedDomain.icon, { className: 'h-6 w-6' })}
                    </div>
                    <div>
                      <h3 className="font-display font-black text-lg text-[#002B5B] dark:text-teal-400 leading-tight">{selectedDomain.name}</h3>
                      <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">{selectedDomain.estimatedModules} Estimasi Sub-Modul Jaringan</p>
                    </div>
                  </div>

                  <span className="px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-black text-[#002B5B] dark:text-teal-400 font-mono shrink-0">
                    {selectedDomain.estimatedFeatures} Micro-features
                  </span>
                </div>

                {/* Scope Description */}
                <div className="space-y-1.5">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Fungsi & Cakupan Domain</span>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-sans font-medium">
                    {selectedDomain.description}
                  </p>
                </div>

                {/* Features Tree Grid */}
                <div className="space-y-2">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">
                    Inventori Fitur Mikro Terintegrasi ({selectedDomain.features.length})
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[180px] overflow-y-auto p-1 border border-slate-150 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl">
                    {selectedDomain.features.map((feature, i) => (
                      <div key={i} className="bg-white dark:bg-slate-900 px-3 py-2 rounded-lg border border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-start gap-2 hover:border-[#002B5B]/30 dark:hover:border-teal-500/50 transition">
                        <CheckCircle className="h-4 w-4 text-[#2B7A78] dark:text-teal-400 shrink-0 mt-0.5" />
                        <span className="leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Developer Controller View */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                      Developer Preview (Boilerplate Blueprint)
                    </span>
                    <div className="flex border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                      <button 
                        onClick={() => setActiveCodeTab('controller')}
                        className={`px-2.5 py-1 text-[10px] font-bold ${activeCodeTab === 'controller' ? 'bg-[#002B5B] dark:bg-indigo-950 text-white' : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400'}`}
                      >
                        TypeScript Controller
                      </button>
                      <button 
                        onClick={() => setActiveCodeTab('schema')}
                        className={`px-2.5 py-1 text-[10px] font-bold ${activeCodeTab === 'schema' ? 'bg-[#002B5B] dark:bg-indigo-950 text-white' : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400'}`}
                      >
                        JSON Schema
                      </button>
                    </div>
                  </div>

                  <pre className="bg-slate-900 p-4 rounded-xl text-[11px] text-teal-400 font-mono text-left overflow-x-auto max-h-[160px] leading-tight border border-slate-800">
                    <code>
                      {activeCodeTab === 'controller' ? selectedDomain.sampleCode : selectedDomain.schemaSample}
                    </code>
                  </pre>
                </div>

              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-5 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 dark:text-slate-500">
                <span>Domain Class: <strong className="font-mono text-slate-600 dark:text-slate-300">{selectedDomain.id}.service</strong></span>
                <span className="flex items-center gap-1 text-teal-600 dark:text-teal-400 font-bold">
                  <ShieldCheck className="h-4 w-4" />
                  Kepatuhan Kredibilitas Jurnalistik Mutlak
                </span>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* 5. TAB 2: 8 ADVANCED ENTERPRISE MODULES */}
      {activeTab === 'enterprise' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="bg-gradient-to-r from-teal-900 to-[#002B5B] border border-teal-800 rounded-2xl p-5 text-white text-left space-y-1">
            <h3 className="font-display font-black text-lg text-white">8 Advanced Enterprise Platforms</h3>
            <p className="text-slate-300 text-xs">
              Modul tambahan premium tingkat korporasi untuk memperkuat tata kelola data, perencanaan newsroom jurnalisme berskala masif, serta eksperimen personalisasi audiens.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
            
            {/* LEFT: 8 ENTERPRISE TILES */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-3 max-h-[550px] overflow-y-auto">
              {enterpriseModules.map((m) => {
                const IconComponent = m.icon;
                const isSelected = selectedEnterprise.id === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedEnterprise(m)}
                    className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col gap-2 ${
                      isSelected 
                        ? 'bg-slate-900 dark:bg-indigo-950 text-white border-slate-900 dark:border-indigo-800 shadow-md' 
                        : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${isSelected ? 'bg-[#FFD700]/10 text-[#FFD700]' : 'bg-slate-100 dark:bg-slate-800 text-[#002B5B] dark:text-teal-400'}`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <h4 className="font-display font-black text-xs sm:text-sm leading-tight">{m.name}</h4>
                    </div>
                    <p className={`text-xs leading-relaxed line-clamp-2 ${isSelected ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>
                      {m.function}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* RIGHT: ENTERPRISE DETAIL EXPLAINER & FLOWCHART */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
              
              <div className="space-y-5">
                <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="p-3 bg-slate-950 text-[#FFD700] rounded-xl border border-slate-850">
                    {React.createElement(selectedEnterprise.icon, { className: 'h-6 w-6' })}
                  </div>
                  <div>
                    <h3 className="font-display font-black text-base sm:text-lg text-[#002B5B] dark:text-teal-400">{selectedEnterprise.name}</h3>
                    <span className="text-[10px] bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider mt-1 inline-block">
                      Enterprise Compliant
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">PERAN & FUNGSI UTAMA</span>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-sans font-medium">
                    {selectedEnterprise.function}
                  </p>
                </div>

                {/* Subfeatures list */}
                <div className="space-y-2">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">INTEGRASI SUB-FITUR KUNCI</span>
                  <div className="grid grid-cols-1 gap-1.5">
                    {selectedEnterprise.subfeatures.map((sf, i) => (
                      <div key={i} className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-150 dark:border-slate-850 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full shrink-0"></span>
                        <span>{sf}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action flowchart */}
                <div className="space-y-2.5 bg-slate-950 p-4 rounded-xl border border-slate-850 text-white">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block font-mono">
                    SISTEM WORKFLOW & PIPELINE DATA (FLOWCHART)
                  </span>
                  <div className="space-y-2 font-mono text-[10px] text-slate-300">
                    {selectedEnterprise.flowchart.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <span className="bg-slate-800 text-[#FFD700] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <div className="pt-0.5 leading-relaxed">
                          {step}
                          {idx < selectedEnterprise.flowchart.length - 1 && (
                            <span className="text-[#2B7A78] font-bold block mt-0.5 text-[9px]">↓ pipelining next transaction</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-5 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                <span>Platform Module: /enterprise/{selectedEnterprise.id}</span>
                <span className="flex items-center gap-1 text-[#2B7A78] dark:text-teal-400 font-bold">
                  <Zap className="h-4 w-4" />
                  Scalable ContentOS Synergy
                </span>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* 6. TAB 3: BACKGROUND TASK SIMULATOR & WORKFLOW SYSTEM */}
      {activeTab === 'simulation' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-left grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-xs">
            <div className="md:col-span-8 space-y-2">
              <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 text-[9px] font-black rounded-full font-mono uppercase">
                Interactive Developer Mode
              </span>
              <h3 className="font-display font-black text-base sm:text-lg text-[#002B5B] dark:text-teal-400">Background Task & AI-SGE Event Simulator</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                Evaluasi kinerja operasional backend sistem <strong>MediaOS</strong> dengan menstimulasikan kejadian-kejadian nyata seperti sindikasi massal berita, analisis naskah riset berkapasitas besar menggunakan AI Gemini, serta optimasi inventori iklan.
              </p>
            </div>
            
            <div className="md:col-span-4 flex flex-wrap gap-2 justify-end">
              <button 
                onClick={() => setTerminalLogs([])}
                className="px-3.5 py-1.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 transition"
              >
                Clear Terminal Console
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
            
            {/* LEFT: SIMULATION TRIGGERS CARD */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-black text-[#002B5B] dark:text-teal-400 uppercase tracking-wider block">Pemicu Event (Action Triggers)</span>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">Klik salah satu untuk menjalankan automasi pipeline backend</p>
              </div>

              <button 
                onClick={() => handleSimulateEvent('syndicate')}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-indigo-150 dark:border-indigo-950 bg-indigo-50/45 dark:bg-indigo-950/20 hover:bg-indigo-50/75 dark:hover:bg-indigo-950/40 transition text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-600 text-white rounded-lg">
                    <Network className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="font-black text-xs text-indigo-900 dark:text-indigo-300">Sindikasikan Berita Utama</h5>
                    <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5">Content Syndication Hub (6 Portals)</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition" />
              </button>

              <button 
                onClick={() => handleSimulateEvent('ai-summary')}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-teal-150 dark:border-teal-950 bg-teal-50/45 dark:bg-teal-950/20 hover:bg-teal-50/75 dark:hover:bg-teal-950/40 transition text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-teal-600 text-white rounded-lg">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="font-black text-xs text-teal-900 dark:text-teal-300">AI Ringkasan Jurnal & Fakta</h5>
                    <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5">Gemini API extraction corpus processing</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-teal-600 dark:text-teal-400 group-hover:translate-x-1 transition" />
              </button>

              <button 
                onClick={() => handleSimulateEvent('ados-optimize')}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-amber-150 dark:border-amber-950 bg-amber-50/45 dark:bg-amber-950/20 hover:bg-amber-50/75 dark:hover:bg-amber-950/40 transition text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-600 text-white rounded-lg">
                    <Sliders className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="font-black text-xs text-amber-900 dark:text-amber-300">Optimasi AdOS Placements</h5>
                    <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5">CPC, CTR tracking & bidding recalculations</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition" />
              </button>

              <button 
                onClick={() => handleSimulateEvent('backup')}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 transition text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-900 dark:bg-slate-850 text-white rounded-lg">
                    <Database className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="font-black text-xs text-slate-900 dark:text-slate-200">Jadwalkan Cloud Backup</h5>
                    <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5">Automated Coldline SQL/GCS snapshots</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-800 dark:text-slate-300 group-hover:translate-x-1 transition" />
              </button>
            </div>

            {/* RIGHT: REAL-TIME TERMINAL LOG COMPARTMENT */}
            <div className="lg:col-span-8 bg-slate-950 border border-slate-900 rounded-2xl p-5 flex flex-col justify-between shadow-xl min-h-[380px] font-mono">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-900">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-500"></span>
                      <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                      <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    </div>
                    <span className="text-xs text-slate-400 font-bold ml-1.5 flex items-center gap-1.5">
                      <Terminal className="h-3.5 w-3.5 text-teal-400" />
                      MediaOS Terminal Server Console Logs
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-400 animate-pulse bg-emerald-950 px-2 py-0.5 rounded border border-emerald-900">
                    ● ACTIVE
                  </span>
                </div>

                <div className="space-y-2 text-xs overflow-y-auto max-h-[260px] text-left">
                  {terminalLogs.map((log, index) => (
                    <div key={index} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="text-slate-500 text-[10px] font-bold shrink-0">{log.time}</span>
                      <span className={`text-[10px] font-bold px-1 rounded uppercase shrink-0 ${
                        log.type === 'ai' ? 'bg-teal-950 text-teal-300 border border-teal-900' :
                        log.type === 'monetization' ? 'bg-amber-950 text-amber-300 border border-amber-900' :
                        log.type === 'error' ? 'bg-red-950 text-red-300 border border-red-900' :
                        'bg-slate-900 text-slate-300 border border-slate-800'
                      }`}>
                        {log.type}
                      </span>
                      <p className={`font-mono text-xs ${
                        log.type === 'ai' ? 'text-teal-400' :
                        log.type === 'monetization' ? 'text-amber-400' :
                        log.type === 'error' ? 'text-red-400' :
                        'text-slate-200'
                      }`}>
                        {log.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>Host: api.infobos.com | PID: 3000</span>
                <span className="text-emerald-500">SGE-AI Grounding Connection: 100% stable</span>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 7. TAB 4: SYSTEM METRICS & BLUEPRINT ARCHITECTURE DETAILS */}
      {activeTab === 'metrics' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {/* System Sizing & Modules Matrix */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
              <h4 className="text-xs font-black text-[#002B5B] dark:text-teal-400 uppercase tracking-widest font-display pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
                <Layers className="h-4.5 w-4.5 text-[#2B7A78] dark:text-teal-400" />
                MediaOS Architectural Sizing Matrix
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Struktur layer berskala enterprise didesain untuk menyerap volume data yang masif dengan pemisahan tugas modular (separation of concerns):
              </p>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl">
                  <span className="font-bold text-[#002B5B] dark:text-teal-400">Public Portal Layer</span>
                  <span className="font-mono bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded font-black text-slate-700 dark:text-slate-300">15 Modules / Subsystems</span>
                </div>
                <div className="flex justify-between items-center text-xs p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl">
                  <span className="font-bold text-[#002B5B] dark:text-teal-400">News Taxonomy Rubrics</span>
                  <span className="font-mono bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded font-black text-slate-700 dark:text-slate-300">35+ Categories</span>
                </div>
                <div className="flex justify-between items-center text-xs p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl">
                  <span className="font-bold text-[#002B5B] dark:text-teal-400">Multimedia Digital Channels</span>
                  <span className="font-mono bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded font-black text-slate-700 dark:text-slate-300">18+ Rich Formats</span>
                </div>
                <div className="flex justify-between items-center text-xs p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl">
                  <span className="font-bold text-[#002B5B] dark:text-teal-400">Social Media Channels Integration</span>
                  <span className="font-mono bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded font-black text-slate-700 dark:text-slate-300">18+ External Syndications</span>
                </div>
                <div className="flex justify-between items-center text-xs p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl">
                  <span className="font-bold text-[#002B5B] dark:text-teal-400">Core Infrastructure Modules</span>
                  <span className="font-mono bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded font-black text-slate-700 dark:text-slate-300">25+ Core Systems</span>
                </div>
              </div>
            </div>

            {/* World-Class Compliance Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <h4 className="text-xs font-black text-[#002B5B] dark:text-teal-400 uppercase tracking-widest font-display pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
                  <ShieldAlert className="h-4.5 w-4.5 text-[#2B7A78] dark:text-teal-400" />
                  Global Media & Google News E-E-A-T Compliance
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Sesuai dengan standar Google News Publisher, algoritma indeksasi AI Search Generative Experience (SGE), serta kredibilitas <strong>E-E-A-T</strong> (Experience, Expertise, Authoritativeness, Trustworthiness):
                </p>

                <ul className="list-disc pl-5 text-xs text-slate-600 dark:text-slate-300 space-y-2">
                  <li><strong>Experience</strong> - Menampung jurnalisme warga dan naskah citizen creator berdasar data lapangan langsung.</li>
                  <li><strong>Expertise</strong> - Melampirkan biografi penulis kredibel beserta rincian lisensi akademis terverifikasi (Directory).</li>
                  <li><strong>Authoritativeness</strong> - Terkait erat dengan repositori riset primer (Research Center) dan ringkasan jurnal terakreditasi.</li>
                  <li><strong>Trustworthiness</strong> - Meliputi sistem mitigasi kesalahan penulisan lewat rilis koreksi kronologis formal.</li>
                </ul>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 p-3.5 rounded-xl text-xs flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Info className="h-5 w-5 text-[#2B7A78] dark:text-teal-400 shrink-0" />
                <span className="font-medium">
                  Seluruh skema data microdata JSON-LD otomatis diekspor langsung ke mesin Googlebot Crawling.
                </span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* 8. CREDIBILITY ACCREDITATIONS & FOOTER STATEMENT */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-left flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono font-black uppercase tracking-wider block">MediaOS Infrastructure Integrity</span>
          <p className="text-slate-600 dark:text-slate-300 text-xs font-medium">
            INFOBOS didesain menggunakan framework modular modern yang mematuhi pedoman perayapan mesin pencari global dan indeksasi AI real-time.
          </p>
        </div>

        <div className="flex gap-2 shrink-0">
          <div className="px-3.5 py-1.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-center shadow-2xs">
            <span className="text-[8px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-wider block">Googlebot</span>
            <span className="text-[#2B7A78] dark:text-teal-400 text-xs font-black">Indeks Aktif</span>
          </div>
          <div className="px-3.5 py-1.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-center shadow-2xs">
            <span className="text-[8px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-wider block">Gemini AI</span>
            <span className="text-indigo-600 dark:text-indigo-400 text-xs font-black">Grounding OK</span>
          </div>
        </div>
      </div>

    </div>
  );
}
