import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Search, X, Star, Clock, Folder, Rocket, ChevronDown, ChevronRight, 
  Compass, ArrowRight, Copy, Bookmark, Share2, Shield, Info, Check,
  Globe, Briefcase, FileText, Users, Cpu, Sparkles, BookOpen,
  Flame, TrendingUp, ExternalLink, Grid, Tv, Megaphone, Play
} from 'lucide-react';
import { FEATURE_REGISTRY } from '../data/featureRegistry';
import { PORTAL_ACCESS_MAPPING } from './PortalSwitcher';

export interface NavItem {
  id: string;
  name: string;
  route: string;
  type: 'page' | 'feature' | 'menu' | 'submenu' | 'widget' | 'report' | 'dashboard' | 'api' | 'ai-agent';
  allowedRoles?: string[];
  description: string;
  featureCount?: number;
  status?: 'active' | 'beta' | 'deprecated';
  version?: string;
  lastUpdated?: string;
  ownerTeam?: string;
  widgetsCount?: number;
}

export interface NavCategory {
  id: string;
  name: string;
  icon: any;
  color: string;
  featureCount: number;
  description: string;
  items: NavItem[];
  allowedRoles?: string[];
}

interface NavigationExplorerProps {
  isOpen: boolean;
  onClose: () => void;
  currentTab: string;
  onTabChange: (tab: string) => void;
  onNavigateToSlug?: (slug: string, type: string) => void;
  user: any;
  simulatedRole?: string;
}

export default function NavigationExplorer({
  isOpen,
  onClose,
  currentTab,
  onTabChange,
  user,
  simulatedRole
}: NavigationExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('infobos_explorer_favorites');
    return saved ? JSON.parse(saved) : ['home', 'geo-intelligence-os', 'ai-analytics'];
  });
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('infobos_explorer_bookmarks');
    return saved ? JSON.parse(saved) : ['breaking-news', 'community-marketplace'];
  });
  const [recent, setRecent] = useState<string[]>(() => {
    const saved = localStorage.getItem('infobos_explorer_recent');
    return saved ? JSON.parse(saved) : ['home', 'regional'];
  });
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'public-portal': true,
    'intelligence': true,
    'ai-hub': true
  });
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Close explorer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('infobos_explorer_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('infobos_explorer_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('infobos_explorer_recent', JSON.stringify(recent));
  }, [recent]);

  // Static domains navigation data modeled precisely after requested menu groups
  const navigationData = useMemo<NavCategory[]>(() => [
    {
      id: 'public-portal',
      name: 'Public Portal',
      icon: Globe,
      color: 'from-sky-500 to-indigo-600',
      featureCount: 240,
      description: 'Pintu gerbang berita utama, klip video pendek, siaran audio podcast, dan sindikasi berita terhangat.',
      items: [
        { id: 'nav-home', name: 'Home', route: 'home', type: 'page', description: 'Halaman bento-feed utama redaksi.', status: 'active', version: '2.1.0', lastUpdated: '2026-06-25', ownerTeam: 'Web Delivery' },
        { id: 'nav-breaking', name: 'Breaking News', route: 'breaking-news', type: 'page', description: 'Notifikasi rilis penting nasional/lokal 24 jam.', status: 'active', version: '1.8.0', lastUpdated: '2026-06-10', ownerTeam: 'Newsroom Desk' },
        { id: 'nav-regional', name: 'Regional Jabar', route: 'regional', type: 'page', description: 'Fokus berita pembangunan Jawa Barat dan Gedung Sate.', status: 'active', version: '2.0.2', lastUpdated: '2026-06-27', ownerTeam: 'West Java Bureau' },
        { id: 'nav-nasional', name: 'Kanal Nasional', route: 'nasional', type: 'page', description: 'Liputan nusantara dari berbagai biro redaksi.', status: 'active', version: '1.9.0', lastUpdated: '2026-06-12', ownerTeam: 'National Desk' },
        { id: 'nav-internasional', name: 'Internasional', route: 'internasional', type: 'page', description: 'Informasi dan analisis geopolitik global.', status: 'active', version: '1.5.0', lastUpdated: '2026-05-30', ownerTeam: 'Foreign Affairs' },
        { id: 'nav-trending', name: 'Trending', route: 'trending', type: 'page', description: 'Topik paling banyak dibahas netizen dan media sosial.', status: 'active', version: '2.3.0', lastUpdated: '2026-06-26', ownerTeam: 'AI Listening Engine' },
        { id: 'nav-video', name: 'Video Streaming TV', route: 'video-hub', type: 'page', description: 'Siaran langsung TV digital dan program redaksi.', status: 'active', version: '1.7.5', lastUpdated: '2026-06-20', ownerTeam: 'Multimedia Team' },
        { id: 'nav-shorts', name: 'Short Clips (TikTok)', route: 'short-video-hub', type: 'page', description: 'Konten vertikal cek fakta durasi pendek.', status: 'active', version: '1.2.0', lastUpdated: '2026-06-24', ownerTeam: 'Social Media Dev' },
        { id: 'nav-podcast', name: 'Podcast Center', route: 'podcast-center', type: 'page', description: 'Bincang eksklusif tokoh negara dan jurnalis.', status: 'active', version: '1.4.0', lastUpdated: '2026-06-15', ownerTeam: 'Audio Pod' },
        { id: 'nav-live', name: 'Live Feed', route: 'live-feed', type: 'page', description: 'Siaran langsung teks peristiwa dari lokasi kejadian.', status: 'active', version: '2.0.0', lastUpdated: '2026-06-18', ownerTeam: 'Field Operations' },
        { id: 'nav-jobs-hub', name: 'Proyek & Karir', route: 'jobs-hub', type: 'page', description: 'Lowongan kerja teratas, info karir, dan bursa kerja Jawa Barat.', status: 'active', version: '1.0.0', lastUpdated: '2026-07-16', ownerTeam: 'Marketplace Operations' },
        { id: 'nav-newsletter', name: 'Newsletter CMS', route: 'seo-hub', type: 'page', description: 'Layanan buletin langganan analitik mingguan.', status: 'beta', version: '0.9.1', lastUpdated: '2026-06-28', ownerTeam: 'Growth Hackers' }
      ]
    },
    {
      id: 'news-categories',
      name: 'News Categories',
      icon: FileText,
      color: 'from-teal-500 to-emerald-600',
      featureCount: 185,
      description: 'Pengelompokan analitik berita per sektor industri dari redaksi pusat.',
      items: [
        { id: 'nav-live-feed', name: 'Live Feed', route: 'live-feed', type: 'submenu', description: 'Siaran langsung teks peristiwa terkini detik-demi-detik.', status: 'active' },
        { id: 'nav-regional', name: 'Regional', route: 'regional', type: 'submenu', description: 'Berita pembangunan dan komunitas Jawa Barat.', status: 'active' },
        { id: 'nav-nasional', name: 'Nasional', route: 'nasional', type: 'submenu', description: 'Kebijakan publik, regulasi pemerintah pusat.', status: 'active' },
        { id: 'nav-internasional', name: 'Internasional', route: 'internasional', type: 'submenu', description: 'Isu geopolitik global dan hubungan internasional.', status: 'active' },
        { id: 'nav-business', name: 'Business', route: 'business', type: 'submenu', description: 'Analisis pasar, ekonomi makro, dan UMKM.', status: 'active' },
        { id: 'nav-technology', name: 'Technology', route: 'technology', type: 'submenu', description: 'Sains modern, rilis gadget, infrastruktur IT.', status: 'active' },
        { id: 'nav-ai-data', name: 'AI & Data', route: 'ai-data', type: 'submenu', description: 'Riset kecerdasan buatan dan visualisasi data.', status: 'active' },
        { id: 'nav-sports', name: 'Sports', route: 'sports', type: 'submenu', description: 'Prestasi atlet daerah dan nasional.', status: 'active' },
        { id: 'nav-lifestyle', name: 'Lifestyle', route: 'lifestyle', type: 'submenu', description: 'Kuliner, wisata, seni budaya, dan gaya hidup.', status: 'active' },
        { id: 'nav-investigasi', name: 'Investigasi', route: 'investigasi', type: 'submenu', description: 'Laporan investigasi mendalam tim jurnalis.', status: 'active' },
        { id: 'nav-analisis', name: 'Analisis', route: 'analisis', type: 'submenu', description: 'Opini teoretis dan kajian empiris pengamat.', status: 'active' },
        { id: 'nav-riset-insight', name: 'Riset & Insight', route: 'riset-insight', type: 'submenu', description: 'Riset statistik, survei opini publik.', status: 'active' }
      ]
    },
    {
      id: 'directory',
      name: 'Directory Hubs',
      icon: BookOpen,
      color: 'from-amber-500 to-orange-600',
      featureCount: 95,
      description: 'Direktori komprehensif profil perusahaan, merek terdaftar, rilis produk, dan pejabat pemerintah.',
      items: [
        { id: 'nav-dir-company', name: 'Company Directory', route: 'business-directory', type: 'menu', description: 'Profil lengkap korporasi besar se-Indonesia.', status: 'active' },
        { id: 'nav-dir-brand', name: 'Brand Directory', route: 'brand-directory', type: 'menu', description: 'Indeks merek lokal terdaftar HAKI & sentiment tracker.', status: 'active' },
        { id: 'nav-dir-product', name: 'Product Directory', route: 'product-directory', type: 'menu', description: 'Katalog rilis produk inovatif nasional.', status: 'active' },
        { id: 'nav-dir-gov', name: 'Government Directory', route: 'geo-intelligence-os', type: 'menu', description: 'Peta kontak instansi dinas & kementerian.', status: 'active' },
        { id: 'nav-dir-org', name: 'Organization Directory', route: 'organization-directory', type: 'menu', description: 'LSM, asosiasi industri, lembaga riset.', status: 'active' },
        { id: 'nav-dir-people', name: 'People Directory', route: 'intelligence-workspace', type: 'menu', description: 'Profil eksklusif eksekutif dan pembuat kebijakan.', status: 'active' },
        { id: 'nav-dir-author', name: 'Author Directory', route: 'author-directory', type: 'menu', description: 'Profil jurnalis investigatif redaksi INFOBOS.', status: 'active' },
        { id: 'nav-dir-event', name: 'Event Directory', route: 'event-directory', type: 'menu', description: 'Kalender agenda pameran bisnis nasional.', status: 'active' }
      ]
    },
    {
      id: 'marketplace',
      name: 'B2B Marketplace',
      icon: Briefcase,
      color: 'from-pink-500 to-rose-600',
      featureCount: 145,
      description: 'Ekosistem perdagangan antar-perusahaan, sewa alat berat, tender proyek, dan karir lowongan kerja.',
      items: [
        { id: 'nav-mkt-produk', name: 'Produk Unggulan', route: 'community-marketplace', type: 'widget', description: 'Pasar jual beli bahan industri & komoditas.', status: 'active' },
        { id: 'nav-mkt-jasa', name: 'Jasa Profesional', route: 'community-marketplace', type: 'widget', description: 'Konsultasi hukum, audit IT, agensi pemasaran.', status: 'active' },
        { id: 'nav-mkt-sewa', name: 'Sewa Properti/Alat', route: 'community-marketplace', type: 'widget', description: 'Penyewaan ruang kantor, armada pengiriman.', status: 'active' },
        { id: 'nav-mkt-tender', name: 'Tender Pengadaan', route: 'community-marketplace', type: 'widget', description: 'Informasi resmi e-procurement BUMN.', status: 'active' },
        { id: 'nav-mkt-proyek', name: 'Proyek Infrastruktur', route: 'community-marketplace', type: 'widget', description: 'Listing pengerjaan jalan tol, jaringan listrik.', status: 'active' },
        { id: 'nav-mkt-lowongan', name: 'Lowongan Kerja', route: 'community-marketplace', type: 'widget', description: 'Karir eksekutif dan staf khusus industri.', status: 'active' },
        { id: 'nav-mkt-freelance', name: 'Freelancer Hub', route: 'community-marketplace', type: 'widget', description: 'Kontrak kerja lepas ahli bahasa & analis data.', status: 'beta' }
      ]
    },
    {
      id: 'community',
      name: 'Community & Forum',
      icon: Users,
      color: 'from-purple-500 to-fuchsia-600',
      featureCount: 120,
      description: 'Saluran interaktif berupa grup diskusi, jajak pendapat, pameran virtual, dan live chat redaksi.',
      items: [
        { id: 'nav-com-forum', name: 'Forum Komunitas', route: 'community-marketplace', type: 'menu', description: 'Kamar diskusi terbuka per kategori topik bisnis.', status: 'active' },
        { id: 'nav-com-grup', name: 'Grup Afiliasi', route: 'community-marketplace', type: 'menu', description: 'Komunitas regional pengusaha muda.', status: 'active' },
        { id: 'nav-com-polling', name: 'Interactive Polling', route: 'community-marketplace', type: 'menu', description: 'Jajak pendapat publik mingguan.', status: 'active' },
        { id: 'nav-com-chat', name: 'Live Chat Redaksi', route: 'community-marketplace', type: 'menu', description: 'Saluran siaran langsung respon cepat pembaca.', status: 'beta' }
      ]
    },
    {
      id: 'intelligence',
      name: 'Intelligence OS',
      icon: Cpu,
      color: 'from-violet-600 to-indigo-700',
      featureCount: 85,
      description: 'Pusat visualisasi spasial peta wilayah (GeoOS), pelaporan intelijen bisnis, sentimen pasar, dan riset dewan pers.',
      allowedRoles: ['admin', 'redaktur', 'partner', 'analyst'],
      items: [
        { id: 'nav-intel-geo', name: 'GeoOS Spasial Map', route: 'geo-intelligence-os', type: 'dashboard', description: 'Visualisasi spasial GIS interaktif provinsi Jawa Barat.', status: 'active', version: '3.4.0', lastUpdated: '2026-06-27', ownerTeam: 'GIS Laboratory' },
        { id: 'nav-intel-biz', name: 'Business Intelligence', route: 'intelligence-workspace', type: 'dashboard', description: 'Statistik korporasi terintegrasi, laporan neraca.', status: 'active', version: '2.5.0', lastUpdated: '2026-06-21', ownerTeam: 'Enterprise AI' },
        { id: 'nav-intel-fin', name: 'Financial Intelligence', route: 'financial-intelligence', type: 'dashboard', description: 'Kalkulator arus kas, ekspor-impor regional.', status: 'active', version: '1.9.0', lastUpdated: '2026-06-26', ownerTeam: 'Fintech Division' },
        { id: 'nav-intel-mon', name: 'Monitoring Sentimen', route: 'intelligence-workspace', type: 'dashboard', description: 'Pemantauan kata kunci media sosial real-time.', status: 'active', version: '2.0.1', lastUpdated: '2026-06-28', ownerTeam: 'NLP Listening Unit' },
        { id: 'nav-intel-insight', name: 'AI Insight Report', route: 'ai-analytics', type: 'report', description: 'Ekstraksi otomatis ringkasan eksekutif mingguan.', status: 'beta', version: '0.9.5', lastUpdated: '2026-07-01', ownerTeam: 'Gemini Agent Lab' },
        { id: 'nav-intel-research', name: 'Research Center', route: 'document-center', type: 'report', description: 'Pusat unggah jurnal resmi regulasi pemerintah.', status: 'active', version: '1.2.0', lastUpdated: '2026-06-15', ownerTeam: 'Legal Dept' }
      ]
    },
    {
      id: 'ai-hub',
      name: 'AI Hub & Agents',
      icon: Sparkles,
      color: 'from-indigo-500 to-purple-600',
      featureCount: 68,
      description: 'Workspace generasi masa depan: asisten pintar chatbot, analisis dokumen, dan automasi agen berita.',
      allowedRoles: ['admin', 'redaktur', 'partner', 'analyst'],
      items: [
        { id: 'nav-ai-chat', name: 'AI Chatbot Assistant', route: 'ai-analytics', type: 'ai-agent', description: 'Diskusi interaktif dengan model Gemini 2.0 Flash.', status: 'active', version: '4.0.0', lastUpdated: '2026-07-01', ownerTeam: 'AI Platform' },
        { id: 'nav-ai-search', name: 'AI Semantic Search', route: 'seo-hub', type: 'ai-agent', description: 'Pencarian berbasis makna melintasi ribuan arsip berita.', status: 'active', version: '2.1.0', lastUpdated: '2026-06-29', ownerTeam: 'Search Dev' },
        { id: 'nav-ai-summary', name: 'AI Auto-Summarizer', route: 'document-center', type: 'ai-agent', description: 'Kompilasi artikel panjang menjadi ringkasan 3 poin.', status: 'active', version: '2.5.0', lastUpdated: '2026-06-22', ownerTeam: 'NLP Pipeline' },
        { id: 'nav-ai-agents', name: 'Autonomous News Agents', route: 'ai-analytics', type: 'ai-agent', description: 'Bot terjadwal yang menyusun rancangan artikel regional.', status: 'beta', version: '0.9.8', lastUpdated: '2026-07-02', ownerTeam: 'Robotic Desk' },
        { id: 'nav-ai-auto', name: 'Publish Automation', route: 'seo-hub', type: 'ai-agent', description: 'Integrasi rujukan silang tag SEO ke WordPress/TikTok.', status: 'active', version: '1.6.0', lastUpdated: '2026-06-19', ownerTeam: 'SysOps' },
        { id: 'nav-ai-work', name: 'AI Collaborative Workspace', route: 'intelligence-workspace', type: 'ai-agent', description: 'Kanban board interaktif dibantu asisten AI.', status: 'active', version: '2.0.0', lastUpdated: '2026-06-25', ownerTeam: 'Collab Dev' }
      ]
    },
    {
      id: 'learning',
      name: 'Learning & FAQ',
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-600',
      featureCount: 42,
      description: 'Layanan edukasi, petunjuk teknis jurnalisme warga, dan glosarium istilah platform.',
      items: [
        { id: 'nav-learn-acad', name: 'Media Academy', route: 'media-academy', type: 'menu', description: 'Kelas jurnalisme data bersertifikat dewan pers.', status: 'active' },
        { id: 'nav-learn-tuto', name: 'Technical Tutorials', route: 'technical-tutorials', type: 'menu', description: 'Cara menggunakan GeoOS GIS Jawa Barat.', status: 'active' },
        { id: 'nav-learn-doc', name: 'Developer Docs', route: 'developer-docs', type: 'menu', description: 'Dokumentasi REST API integrasi eksternal.', status: 'active' },
        { id: 'nav-learn-faq', name: 'General FAQ', route: 'general-faq', type: 'menu', description: 'Pertanyaan umum perihal akun & kemitraan.', status: 'active' }
      ]
    },
    {
      id: 'about-us',
      name: 'Corporate Info',
      icon: Info,
      color: 'from-slate-500 to-slate-700',
      featureCount: 25,
      description: 'Tentang kami, struktur korporat, paket berlangganan media premium, karir, dan penawaran iklan.',
      items: [
        { id: 'nav-corp-about', name: 'Tentang INFOBOS', route: 'about-infobos', type: 'menu', description: 'Visi misi jurnalisme kredibel di era digital.', status: 'active' },
        { id: 'nav-corp-pricing', name: 'SaaS Pricing', route: 'saas-pricing', type: 'menu', description: 'Paket langganan data sentimen komersial.', status: 'active' },
        { id: 'nav-corp-part', name: 'Partnership Program', route: 'partnership-program', type: 'menu', description: 'Afiliasi konten dan sindikasi berita.', status: 'active' },
        { id: 'nav-corp-ads', name: 'Advertise With Us', route: 'advertise-with-us', type: 'menu', description: 'Pemasangan banner portal & iklan bersponsor.', status: 'active' },
        { id: 'nav-corp-contact', name: 'Hubungi Redaksi', route: 'contact-newsroom', type: 'menu', description: 'Kontak alamat biro Bandung & Jakarta.', status: 'active' },
        { id: 'nav-corp-career', name: 'Karir & Magang', route: 'careers', type: 'menu', description: 'Bergabung sebagai jurnalis investigatif.', status: 'active' }
      ]
    }
  ], []);

  // Helper to map feature portal names to standard keys used in PORTAL_ACCESS_MAPPING
  const getPortalId = (portalName: string): string => {
    const name = (portalName || '').toLowerCase();
    if (name.includes('public')) return 'public';
    if (name.includes('member') || name.includes('anggota')) return 'member';
    if (name.includes('creator') || name.includes('kreator')) return 'creator';
    if (name.includes('reporter') || name.includes('jurnalis') || name.includes('journalist')) return 'reporter';
    if (name.includes('editor') || name.includes('redaksi')) return 'editor';
    if (name.includes('advertiser') || name.includes('iklan')) return 'advertiser';
    if (name.includes('sales') || name.includes('partner') || name.includes('mitra')) return 'sales';
    if (name.includes('business') || name.includes('bisnis') || name.includes('corporate') || name.includes('perusahaan')) return 'business';
    if (name.includes('marketplace') || name.includes('pasar') || name.includes('umkm')) return 'marketplace';
    if (name.includes('community') || name.includes('komunitas')) return 'community';
    if (name.includes('research') || name.includes('riset')) return 'research';
    if (name.includes('government') || name.includes('pemerintah')) return 'government';
    if (name.includes('monitoring') || name.includes('enterprise') || name.includes('sentimen') || name.includes('intelligence')) return 'monitoring';
    if (name.includes('developer') || name.includes('pengembang')) return 'developer';
    if (name.includes('support') || name.includes('bantuan')) return 'support';
    if (name.includes('moderator')) return 'moderator';
    if (name.includes('finance') || name.includes('keuangan')) return 'finance';
    if (name.includes('cms') || name.includes('admin portal')) return 'cms';
    if (name.includes('super')) return 'super_admin';
    return 'public'; // fallback
  };

  // 1. Filter entire navigation list dynamically based on portal mappings & roles (Visibility Guard)
  const accessibleNavigationData = useMemo<NavCategory[]>(() => {
    const currentRole = simulatedRole || user?.role || 'guest';
    const allowedPortals = PORTAL_ACCESS_MAPPING[currentRole] || ['public'];

    const categoryPortalMap: Record<string, string> = {
      'public-portal': 'public',
      'news-categories': 'public',
      'directory': 'public',
      'marketplace': 'marketplace',
      'community': 'community',
      'intelligence': 'monitoring',
      'ai-hub': 'monitoring',
      'learning': 'public',
      'about-us': 'public'
    };

    return navigationData.map(category => {
      // Check category-level portal access
      const catPortal = categoryPortalMap[category.id] || 'public';
      if (!allowedPortals.includes(catPortal)) {
        return null;
      }

      // Check category-level role access if defined
      if (category.allowedRoles && !category.allowedRoles.includes(currentRole)) {
        const hasAlternativeAccess = category.allowedRoles.some(role => {
          if (role === 'admin' && currentRole.includes('admin')) return true;
          if (role === 'redaktur' && currentRole === 'editor') return true;
          if (role === 'partner' && currentRole === 'sales') return true;
          if (role === 'analyst' && (currentRole === 'researcher' || currentRole === 'government')) return true;
          return false;
        });
        if (!hasAlternativeAccess) {
          return null;
        }
      }

      // Filter category items
      const visibleItems = category.items.filter(item => {
        // Resolve corresponding feature in FEATURE_REGISTRY for metadata check
        const matchedFeature = FEATURE_REGISTRY.find(f => f.route === item.route);

        // Check if role is specifically allowed for this item
        const rolesToCheck = matchedFeature?.allowedRoles || item.allowedRoles;
        if (rolesToCheck && !rolesToCheck.includes(currentRole)) {
          // Alternative map for legacy roles
          const hasAlternativeAccess = rolesToCheck.some(role => {
            if (role === 'admin' && currentRole.includes('admin')) return true;
            if (role === 'redaktur' && currentRole === 'editor') return true;
            if (role === 'partner' && currentRole === 'sales') return true;
            if (role === 'analyst' && (currentRole === 'researcher' || currentRole === 'government')) return true;
            return false;
          });
          if (!hasAlternativeAccess) {
            return false;
          }
        }

        // Check portal access for the matched feature
        const featPortal = matchedFeature?.portal;
        if (featPortal) {
          const portalId = getPortalId(featPortal);
          if (!allowedPortals.includes(portalId)) {
            return false;
          }
        }

        return true;
      });

      if (visibleItems.length === 0) {
        return null;
      }

      return {
        ...category,
        items: visibleItems
      };
    }).filter((cat): cat is NavCategory => cat !== null);
  }, [navigationData, user, simulatedRole]);

  // Filter navigation data and feature registry based on Smart Search
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return accessibleNavigationData;

    const query = searchQuery.toLowerCase();
    return accessibleNavigationData.map(category => {
      const filteredItems = category.items.filter(item => {
        return (
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.type.toLowerCase().includes(query) ||
          item.route.toLowerCase().includes(query)
        );
      });

      return {
        ...category,
        items: filteredItems
      };
    }).filter(cat => cat.items.length > 0);
  }, [searchQuery, accessibleNavigationData]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleCopyLink = (item: NavItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const simulatedLink = `${window.location.origin}/?tab=${item.route}&item=${item.id}`;
    navigator.clipboard.writeText(simulatedLink).then(() => {
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleNavigateItem = (route: string) => {
    setRecent(prev => {
      const filtered = prev.filter(r => r !== route);
      return [route, ...filtered].slice(0, 5);
    });
    
    onTabChange(route);
    onClose();
  };

  const isAccessible = (allowedRoles?: string[]) => {
    if (!allowedRoles) return true;
    const currentRole = simulatedRole || user?.role || 'guest';
    if (allowedRoles.includes(currentRole)) return true;
    
    // Legacy maps check
    return allowedRoles.some(role => {
      if (role === 'admin' && currentRole.includes('admin')) return true;
      if (role === 'redaktur' && currentRole === 'editor') return true;
      if (role === 'partner' && currentRole === 'sales') return true;
      if (role === 'analyst' && (currentRole === 'researcher' || currentRole === 'government')) return true;
      return false;
    });
  };

  if (!isOpen) return null;

  const DETIK_KANALS = [
    { name: 'detikNews', bg: 'hover:bg-red-500/10 hover:border-red-500/40 border-slate-800 text-red-400', route: 'home', tag: 'Berita Utama', dot: 'bg-red-500' },
    { name: 'detikFinance', bg: 'hover:bg-emerald-500/10 hover:border-emerald-500/40 border-slate-800 text-emerald-400', route: 'business', tag: 'Ekonomi & Pasar', dot: 'bg-emerald-500' },
    { name: 'detikHot', bg: 'hover:bg-pink-500/10 hover:border-pink-500/40 border-slate-800 text-pink-400', route: 'trending', tag: 'Seleb & Viral', dot: 'bg-pink-500' },
    { name: 'detikSport', bg: 'hover:bg-amber-500/10 hover:border-amber-500/40 border-slate-800 text-amber-400', route: 'sports', tag: 'Arena Olahraga', dot: 'bg-amber-500' },
    { name: 'detikOto', bg: 'hover:bg-slate-500/10 hover:border-slate-500/40 border-slate-800 text-slate-300', route: 'technology', tag: 'Otomotif & IT', dot: 'bg-slate-400' },
    { name: 'detikTravel', bg: 'hover:bg-sky-500/10 hover:border-sky-500/40 border-slate-800 text-sky-400', route: 'regional', tag: 'Wisata Jabar', dot: 'bg-sky-500' },
    { name: 'detikFood', bg: 'hover:bg-orange-500/10 hover:border-orange-500/40 border-slate-800 text-orange-400', route: 'lifestyle', tag: 'Resep & Kuliner', dot: 'bg-orange-500' },
    { name: 'detikHealth', bg: 'hover:bg-teal-500/10 hover:border-teal-500/40 border-slate-800 text-teal-400', route: 'riset-insight', tag: 'Kesehatan Warga', dot: 'bg-teal-500' },
    { name: 'detikInet', bg: 'hover:bg-purple-500/10 hover:border-purple-500/40 border-slate-800 text-purple-400', route: 'ai-data', tag: 'Sains & Gadget', dot: 'bg-purple-500' },
    { name: 'detikLoker', bg: 'hover:bg-emerald-500/15 hover:border-emerald-500/40 border-slate-800 text-emerald-400', route: 'jobs-hub', tag: 'Karir Jabar', dot: 'bg-emerald-400' },
  ];

  const TRENDING_HASHTAGS = [
    { tag: '#JabarJuara', count: '14.2K' },
    { tag: '#LokerJabar2026', count: '9.8K' },
    { tag: '#DigitalTransform', count: '8.4K' },
    { tag: '#PatimbanLogistics', count: '6.7K' },
    { tag: '#RupiahDigital', count: '5.3K' }
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex justify-start font-sans" id="universal-navigation-explorer">
      {/* Background Dimmed Overlay */}
      <div 
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity duration-300 z-[9999]" 
        onClick={onClose} 
      />

      {/* Explorer Side Drawer Panel - Compact & Elegant fixed width with detik.com Royal Midnight Navy styling */}
      <div 
        ref={containerRef}
        className="relative z-[10000] flex flex-col h-full bg-[#03152F] border-r border-slate-800/80 shadow-2xl transition-all duration-300 transform translate-x-0 w-full sm:w-[440px] overflow-hidden"
      >
        
        {/* INFOBOS SIGNATURE HEADER */}
        <div className="p-4 border-b border-slate-800/60 bg-[#020e20] sticky top-0 z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {/* INFOBOS Logo */}
              <div className="flex items-center gap-2 select-none">
                <div className="relative w-7 h-7 rounded-full bg-slate-900 flex items-center justify-center overflow-hidden border border-white/10 shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#14b8a6] via-[#2563eb] to-[#94a3b8]" />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#0284c7] to-[#0f172a] opacity-60 mix-blend-overlay" />
                  <div className="absolute inset-[2px] rounded-full bg-white flex items-center justify-center shadow-inner">
                    <Play className="h-2.5 w-2.5 fill-[#FFB800] text-[#FFB800] ml-0.5" />
                  </div>
                </div>
                <div className="flex flex-col text-left leading-none">
                  <span className="font-sans font-black text-xs tracking-tight text-white">
                    INFOBOS<span className="text-[#FFB800]">NEXT</span>
                  </span>
                  <span className="text-[7px] text-slate-400 font-mono tracking-wider font-bold mt-0.5">SITEMAP PORTAL</span>
                </div>
              </div>
              <span className="text-slate-700 text-xs">|</span>
              <span className="text-[9px] text-[#FFD700] font-bold uppercase tracking-widest font-mono bg-white/5 px-1.5 py-0.5 rounded-full border border-white/5">
                sitemap portal
              </span>
            </div>
            
            <button 
              onClick={onClose} 
              className="p-1.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all hover:rotate-90 duration-250 cursor-pointer"
              title="Tutup (Esc)"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          <p className="text-[10px] text-slate-400 font-sans leading-none mb-4 text-left">
            Kanal &amp; Direktori Portofolio Terpadu Jawa Barat
          </p>

          {/* Clean Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Cari kanal berita, loker, atau dasbor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2 bg-[#020914] border border-slate-800 focus:border-[#E31E24]/60 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#E31E24]/40 transition-all"
            />
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-200 transition"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* DIRECTORY LIST BODY */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-[#03152F]/90 space-y-5">

          {/* QUICK FAVORITES NAVIGATION */}
          {!searchQuery && (favorites.length > 0 || recent.length > 0) && (
            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/40 text-left flex flex-col gap-2.5">
              {favorites.length > 0 && (
                <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5">
                  <span className="text-[9px] font-mono text-amber-400 font-black flex items-center gap-0.5 uppercase shrink-0">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> Favs:
                  </span>
                  {favorites.slice(0, 4).map(favSlug => {
                    const resolved = FEATURE_REGISTRY.find(f => f.route === favSlug);
                    const label = resolved ? resolved.name : favSlug;
                    return (
                      <button
                        key={favSlug}
                        onClick={() => handleNavigateItem(favSlug)}
                        className="px-2 py-0.5 text-[9px] rounded-md bg-[#020e20] hover:bg-slate-800 border border-slate-800 text-slate-300 transition shrink-0 cursor-pointer"
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              )}

              {recent.length > 0 && (
                <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5">
                  <span className="text-[9px] font-mono text-slate-400 font-black flex items-center gap-0.5 uppercase shrink-0">
                    <Clock className="h-3 w-3 text-slate-400" /> Recent:
                  </span>
                  {recent.slice(0, 4).map(recSlug => {
                    const resolved = FEATURE_REGISTRY.find(f => f.route === recSlug);
                    const label = resolved ? resolved.name : recSlug;
                    return (
                      <button
                        key={recSlug}
                        onClick={() => handleNavigateItem(recSlug)}
                        className="px-2 py-0.5 text-[9px] rounded-md bg-[#020e20] hover:bg-slate-800 border border-slate-800 text-slate-400 transition shrink-0 cursor-pointer"
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* DIRECTORY SECTION */}
          <div className="space-y-3.5 border-t border-slate-800/40 pt-4">
            
            {/* SEARCH RESULTS VIEW */}
            {searchQuery.trim() ? (
              <div className="space-y-3 text-left">
                <span className="text-[10px] font-mono text-indigo-400 font-bold block uppercase px-1">
                  Hasil Pencarian ({filteredData.reduce((acc, c) => acc + c.items.length, 0)})
                </span>
                
                {filteredData.length === 0 ? (
                  <p className="text-xs text-slate-500 px-1 py-4 text-center">Tidak ada item menu yang cocok.</p>
                ) : (
                  <div className="space-y-2">
                    {filteredData.map(category => (
                      <div key={category.id} className="border-l border-slate-800 pl-2">
                        <span className="text-[9px] font-mono font-bold text-slate-500 block uppercase mb-1">{category.name}</span>
                        <div className="grid grid-cols-1 gap-1">
                          {category.items.map(item => {
                            const hasAccess = isAccessible(item.allowedRoles);
                            return (
                              <div 
                                key={item.id} 
                                onClick={() => hasAccess && handleNavigateItem(item.route)}
                                className={`p-2 rounded bg-[#020e20] border border-slate-800 flex items-center justify-between transition ${
                                  hasAccess ? 'hover:bg-slate-800 hover:border-slate-700 cursor-pointer' : 'opacity-40 cursor-not-allowed'
                                }`}
                              >
                                <div className="min-w-0 pr-2">
                                  <span className="text-xs font-bold text-white block truncate">{item.name}</span>
                                  <span className="text-[10px] text-slate-400 block truncate">{item.description}</span>
                                </div>
                                <div className="flex items-center gap-1 shrink-0">
                                  <span className="text-[8px] px-1 py-0.5 rounded font-mono font-bold bg-indigo-500/10 text-indigo-400 uppercase">
                                    {item.type}
                                  </span>
                                  <ArrowRight className="h-3 w-3 text-slate-500" />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* DETIK-STYLE ACCORDION TREE SITEMAP */
              <div className="space-y-2.5 text-left">
                <span className="text-[10px] font-mono text-[#FFD700] font-black uppercase tracking-widest block mb-2">
                  📂 INDEKS KANAL &amp; LAYANAN SITEMAP
                </span>
                {filteredData.map((category) => {
                  const isExpanded = expandedCategories[category.id] || false;
                  const isGroupAccessible = isAccessible(category.allowedRoles);
                  
                  // Detik-style colors
                  const borderColors: Record<string, string> = {
                    'directory': 'border-red-600',
                    'marketplace': 'border-emerald-500',
                    'community': 'border-pink-500',
                    'intelligence': 'border-purple-500',
                    'ai-hub': 'border-cyan-400',
                    'learning': 'border-amber-400',
                    'about-us': 'border-slate-400'
                  };
                  const textColors: Record<string, string> = {
                    'directory': 'text-red-400',
                    'marketplace': 'text-emerald-400',
                    'community': 'text-pink-400',
                    'intelligence': 'text-purple-400',
                    'ai-hub': 'text-cyan-400',
                    'learning': 'text-amber-400',
                    'about-us': 'text-slate-300'
                  };
                  const dotColors: Record<string, string> = {
                    'directory': 'bg-red-500',
                    'marketplace': 'bg-emerald-500',
                    'community': 'bg-pink-500',
                    'intelligence': 'bg-purple-500',
                    'ai-hub': 'bg-cyan-500',
                    'learning': 'bg-amber-500',
                    'about-us': 'bg-slate-400'
                  };

                  const currentBorder = borderColors[category.id] || 'border-slate-700';
                  const currentText = textColors[category.id] || 'text-slate-200';
                  const currentDot = dotColors[category.id] || 'bg-slate-400';

                  return (
                    <div 
                      key={category.id} 
                      className={`border-l-4 ${currentBorder} bg-[#020e20]/85 rounded-r-xl border-y border-r border-slate-800/40 shadow-sm overflow-hidden transition-all duration-200`}
                    >
                      {/* Category Header */}
                      <div 
                        onClick={() => setExpandedCategories(prev => ({ ...prev, [category.id]: !isExpanded }))}
                        className="p-3 bg-slate-950/80 hover:bg-slate-950 flex items-center justify-between cursor-pointer transition select-none"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <category.icon className={`h-4 w-4 ${currentText} shrink-0`} />
                          <span className="text-xs font-extrabold text-white uppercase tracking-tight block truncate">
                            {category.name}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[9px] font-mono bg-slate-800/80 text-slate-400 px-1.5 py-0.2 rounded-full font-bold">
                            {category.items.length}
                          </span>
                          {!isGroupAccessible && (
                            <Shield className="h-3 w-3 text-rose-500" />
                          )}
                          {isExpanded ? (
                            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                          ) : (
                            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                          )}
                        </div>
                      </div>

                      {/* Expandable Category Items */}
                      {isExpanded && (
                        <div className="p-1 divide-y divide-slate-850/60 bg-[#020e20]/40">
                          {category.items.map((item) => {
                            const hasAccess = isAccessible(item.allowedRoles);
                            const isFav = favorites.includes(item.route);
                            const isBook = bookmarks.includes(item.route);

                            return (
                              <div 
                                key={item.id}
                                className={`py-2 px-2.5 hover:bg-white/5 rounded-lg flex items-center justify-between transition group ${
                                  !hasAccess ? 'opacity-40 cursor-not-allowed' : ''
                                }`}
                              >
                                <div 
                                  onClick={() => hasAccess && handleNavigateItem(item.route)}
                                  className="flex-1 min-w-0 cursor-pointer pr-2"
                                >
                                  <div className="flex items-center gap-1.5">
                                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${currentDot}`} />
                                    <span className="text-xs font-bold text-slate-200 group-hover:text-red-400 transition-colors truncate">
                                      {item.name}
                                    </span>
                                    {item.status === 'beta' && (
                                      <span className="text-[8px] bg-sky-500/10 text-sky-400 px-1 rounded font-mono uppercase shrink-0">BETA</span>
                                    )}
                                  </div>
                                  <p className="text-[10px] text-slate-400 truncate mt-0.5">
                                    {item.description}
                                  </p>
                                </div>

                                {/* Simple Hover Options & Actions */}
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <div className="relative">
                                    <button
                                      onMouseEnter={() => setActiveTooltip(item.id)}
                                      onMouseLeave={() => setActiveTooltip(null)}
                                      className="p-1 rounded text-slate-500 hover:text-slate-350 transition cursor-pointer"
                                    >
                                      <Info className="h-3.5 w-3.5" />
                                    </button>

                                    {activeTooltip === item.id && (
                                      <div className="absolute right-0 bottom-5 bg-[#020914] border border-slate-800 p-2.5 rounded-lg shadow-2xl z-50 w-56 text-left space-y-1 text-[9px] font-sans">
                                        <p className="font-extrabold text-white border-b border-slate-800 pb-0.5 mb-1">{item.name}</p>
                                        <p className="text-slate-350 leading-normal">{item.description}</p>
                                        <div className="grid grid-cols-2 gap-1 pt-1 font-mono text-slate-400">
                                          <span>Status: <strong className="text-emerald-400 uppercase">{item.status || 'active'}</strong></span>
                                          <span>Version: <strong>{item.version || 'v1.0.0'}</strong></span>
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  {hasAccess && (
                                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button 
                                        onClick={(e) => toggleFavorite(item.route, e)}
                                        className="p-0.5 rounded text-slate-500 hover:text-amber-400 transition cursor-pointer"
                                        title="Favorit"
                                      >
                                        <Star className={`h-3 w-3 ${isFav ? 'fill-amber-400 text-amber-400' : ''}`} />
                                      </button>
                                      <button 
                                        onClick={(e) => toggleBookmark(item.route, e)}
                                        className="p-0.5 rounded text-slate-500 hover:text-sky-400 transition cursor-pointer"
                                        title="Bookmark"
                                      >
                                        <Bookmark className={`h-3 w-3 ${isBook ? 'fill-sky-400 text-sky-400' : ''}`} />
                                      </button>
                                      <button 
                                        onClick={(e) => handleCopyLink(item, e)}
                                        className="p-0.5 rounded text-slate-500 hover:text-emerald-400 transition relative cursor-pointer"
                                        title="Salin Link"
                                      >
                                        {copiedId === item.id ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

          </div>

          {/* SIMPLIFIED FOOTER ACTION */}
          <div className="mt-4 pt-4 border-t border-slate-800/55 flex flex-col gap-2.5">
            <div className="flex items-center gap-1.5 justify-center text-slate-500">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
              <span className="text-[9px] font-mono">Total: <strong>996 Fitur &amp; API Terintegrasi</strong></span>
            </div>
            
            <button
              onClick={() => {
                onTabChange('feature-explorer');
                onClose();
              }}
              className="px-3 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-[10px] font-black rounded-xl transition shadow-md hover:shadow-red-500/10 flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
            >
              <Rocket className="h-3.5 w-3.5" />
              <span>Buka Katalog Fitur Lengkap</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
