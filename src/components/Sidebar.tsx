import React, { useState } from 'react';
import { FEATURE_REGISTRY, FeatureItem } from '../data/featureRegistry';
import { 
  X, Search, Compass, Tv, Headphones, Database, CreditCard, Users, 
  Map, MapPin, Shield, Activity, Sparkles, Folder, Settings, ShieldAlert, BookOpen, Clock, Info, Globe, Terminal,
  Instagram, Facebook, Twitter, Send, ChevronDown, ChevronRight, Play, Flame, TrendingUp,
  Heart, MessageSquare, Share2, Check, Plus, Briefcase, FileText, Cpu, Award, Edit3
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PORTAL_ACCESS_MAPPING } from './PortalSwitcher';

const SOCIAL_POSTS = [
  {
    id: 'sp-1',
    author: 'Humas Jabar',
    handle: '@humas_jabar',
    platform: 'Instagram',
    avatar: 'HJ',
    avatarColor: 'from-[#2B7A78] to-teal-800',
    verified: true,
    content: 'Pemerintah Provinsi Jawa Barat menerima penghargaan bergengsi atas akselerasi transformasi pelayanan publik se-Indonesia! Jabar digitalisasi makin solid. 🏆✨ #JabarJuara #Sapawarga',
    time: '2 jam yang lalu',
    likes: 4520,
    comments: 189,
    category: 'News',
    topic: 'Pemerintahan',
    mediaUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80'
  },
  {
    id: 'sp-2',
    author: 'Diskominfo Jabar',
    handle: '@diskominfojabar',
    platform: 'X',
    avatar: 'DJ',
    avatarColor: 'from-blue-600 to-indigo-800',
    verified: true,
    content: 'Wargi Jabar! Laporkan kendala layanan internet desa atau pengaduan hoax melalui Sapawarga & Jabar Saber Hoaks. Kami tanggapi 24/7! 📱⚡ #DiskominfoJabar #HoaxBuster',
    time: '4 jam yang lalu',
    likes: 1240,
    comments: 56,
    category: 'Media',
    topic: 'Teknologi',
  },
  {
    id: 'sp-3',
    author: 'Bank Indonesia Jabar',
    handle: '@bank_indonesia',
    platform: 'X',
    avatar: 'BI',
    avatarColor: 'from-emerald-700 to-emerald-900',
    verified: true,
    content: 'Bank Indonesia Bandung menguji coba sistem interkoneksi Rupiah Digital (Stablecoin) untuk menyederhanakan pembayaran instan UMKM. Masa depan fintech Jabar! 💳🇮🇩 #RupiahDigital #Fintech',
    time: '1 hari yang lalu',
    likes: 3810,
    comments: 245,
    category: 'Ekonomi & Keuangan',
    topic: 'Keuangan',
  },
  {
    id: 'sp-4',
    author: 'Ridwan Kamil',
    handle: '@ridwankamil',
    platform: 'Instagram',
    avatar: 'RK',
    avatarColor: 'from-amber-600 to-amber-800',
    verified: true,
    content: 'Kunci kota layak huni di Jawa Barat adalah pedestrian teduh & transportasi massal yang andal. Bandung, Bogor, Bekasi terus berbenah! Hatur nuhun wargi! 🌳🚲 #RKTataRuang #JabarAsri',
    time: '5 jam yang lalu',
    likes: 12500,
    comments: 1820,
    category: 'News',
    topic: 'Infrastruktur',
    mediaUrl: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=400&q=80'
  },
  {
    id: 'sp-5',
    author: 'Kemenkeu RI',
    handle: '@kemenkeuri',
    platform: 'TikTok',
    avatar: 'KK',
    avatarColor: 'from-purple-600 to-pink-800',
    verified: true,
    content: 'Dapatkan 3 tips mudah pelaporan SPT tahunan secara elektronik bagi milenial & Gen-Z pelaku UMKM kreatif di Jawa Barat. Pajak kuat, Jabar berdaulat! 📊🇮🇩 #PajakKita #UMKMJabar',
    time: '3 jam yang lalu',
    likes: 8900,
    comments: 344,
    category: 'Ekonomi & Keuangan',
    topic: 'Keuangan',
  },
  {
    id: 'sp-6',
    author: 'Info Bandung',
    handle: '@infobdg',
    platform: 'Instagram',
    avatar: 'IB',
    avatarColor: 'from-rose-500 to-rose-700',
    verified: true,
    content: 'Nongkrong sore di Braga emang ga pernah bosen ya wargi! Suasana klasik, kopi hangat, dan obrolan asyik. Siapa yang rindu Bandung? Tag teman nongkrongmu! ☕✨ #BragaClassic #BandungJuara',
    time: '1 jam yang lalu',
    likes: 5400,
    comments: 420,
    category: 'Communities',
    topic: 'Wisata',
    mediaUrl: 'https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?w=400&q=80'
  },
  {
    id: 'sp-7',
    author: 'Sapawarga Jabar',
    handle: '@sapawarga_jabar',
    platform: 'TikTok',
    avatar: 'SW',
    avatarColor: 'from-teal-500 to-emerald-700',
    verified: true,
    content: 'Kini bayar Pajak Kendaraan Bermotor (Sambara Jabar) se-praktis belanja online langsung pakai bjb Digi & QRIS Sapawarga. Bebas antrean wargi! 🚗📱 #Sapawarga #Sambara',
    time: '6 jam yang lalu',
    likes: 2500,
    comments: 78,
    category: 'News',
    topic: 'Pelayanan Publik',
  }
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentTab: string;
  onTabChange: (tab: string) => void;
  user: any;
  activePortal?: string;
  simulatedRole?: string;
  onNavigateToSlug?: (slug: string, type: string) => void;
}

const ICON_MAP: Record<string, any> = {
  Compass, Tv, Headphones, Database, CreditCard, Users, Map, Shield, Activity, Sparkles, Folder, Settings, ShieldAlert, BookOpen, Clock, Info, Globe, Terminal, Instagram, MessageSquare, Briefcase
};

const REGIONAL_OPTIONS = [
  { name: "Jawa Barat", slug: "jawa-barat", subtext: "Portal Pusat Jabar & Bandung Raya" },
  { name: "Bandung", slug: "bandung", subtext: "Kota Kembang, Jawa Barat" },
  { name: "DKI Jakarta", slug: "dki-jakarta", subtext: "Portal Utama Ibukota Jakarta" },
  { name: "Jakarta Pusat", slug: "jakarta-pusat", subtext: "Kawasan Ring 1 & Pemerintahan" },
  { name: "Jawa Tengah", slug: "semarang", subtext: "Kota Semarang & Wilayah Jateng" },
  { name: "Jawa Timur", slug: "surabaya", subtext: "Kota Surabaya & Jawa Timur" },
  { name: "DI Yogyakarta", slug: "yogyakarta", subtext: "Daerah Istimewa Yogyakarta" },
  { name: "Bali (Denpasar)", slug: "denpasar", subtext: "Kawasan Wisata & Budaya" },
  { name: "Medan", slug: "medan", subtext: "Sumatera Utara & Sekitarnya" }
];

const NAVIGATION_DATA = [
  {
    id: 'public-portal',
    name: 'Public Portal',
    icon: Globe,
    color: 'from-sky-500 to-indigo-600',
    featureCount: 240,
    description: 'Pintu gerbang berita utama, klip video pendek, siaran audio podcast, dan sindikasi berita terhangat.',
    items: [
      { id: 'nav-home', name: 'Home', route: 'home', type: 'page', description: 'Halaman bento-feed utama redaksi.', status: 'active' },
      { id: 'nav-breaking', name: 'Breaking News', route: 'breaking-news', type: 'page', description: 'Notifikasi rilis penting nasional/lokal 24 jam.', status: 'active' },
      { id: 'nav-regional', name: 'Regional Jabar', route: 'regional', type: 'page', description: 'Fokus berita pembangunan Jawa Barat dan Gedung Sate.', status: 'active' },
      { id: 'nav-nasional', name: 'Kanal Nasional', route: 'nasional', type: 'page', description: 'Liputan nusantara dari berbagai biro redaksi.', status: 'active' },
      { id: 'nav-internasional', name: 'Internasional', route: 'internasional', type: 'page', description: 'Informasi dan analisis geopolitik global.', status: 'active' },
      { id: 'nav-trending', name: 'Trending', route: 'trending', type: 'page', description: 'Topik paling banyak dibahas netizen dan media sosial.', status: 'active' },
      { id: 'nav-video', name: 'Video Streaming TV', route: 'video-hub', type: 'page', description: 'Siaran langsung TV digital dan program redaksi.', status: 'active' },
      { id: 'nav-shorts', name: 'Short Clips (TikTok)', route: 'short-video-hub', type: 'page', description: 'Konten vertikal cek fakta durasi pendek.', status: 'active' },
      { id: 'nav-podcast', name: 'Podcast Center', route: 'podcast-center', type: 'page', description: 'Bincang eksklusif tokoh negara dan jurnalis.', status: 'active' },
      { id: 'nav-live', name: 'Live Feed', route: 'live-feed', type: 'page', description: 'Siaran langsung teks peristiwa dari lokasi kejadian.', status: 'active' },
      { id: 'nav-jobs-hub', name: 'Proyek & Karir', route: 'jobs-hub', type: 'page', description: 'Lowongan kerja teratas, info karir, dan bursa kerja Jawa Barat.', status: 'active' },
      { id: 'nav-newsletter', name: 'Newsletter CMS', route: 'seo-hub', type: 'page', description: 'Layanan buletin langganan analitik mingguan.', status: 'beta' }
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
      { id: 'nav-regional-cat', name: 'Regional', route: 'regional', type: 'submenu', description: 'Berita pembangunan dan komunitas Jawa Barat.', status: 'active' },
      { id: 'nav-nasional-cat', name: 'Nasional', route: 'nasional', type: 'submenu', description: 'Kebijakan publik, regulasi pemerintah pusat.', status: 'active' },
      { id: 'nav-internasional-cat', name: 'Internasional', route: 'internasional', type: 'submenu', description: 'Isu geopolitik global dan hubungan internasional.', status: 'active' },
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
      { id: 'nav-mkt-produk', name: 'Produk Unggulan', route: 'marketplace-hub', type: 'widget', description: 'Pasar jual beli bahan industri & komoditas.', status: 'active' },
      { id: 'nav-mkt-jasa', name: 'Jasa Profesional', route: 'marketplace-hub', type: 'widget', description: 'Konsultasi hukum, audit IT, agensi pemasaran.', status: 'active' },
      { id: 'nav-mkt-sewa', name: 'Sewa Properti/Alat', route: 'marketplace-hub', type: 'widget', description: 'Penyewaan ruang kantor, armada pengiriman.', status: 'active' },
      { id: 'nav-mkt-tender', name: 'Tender Pengadaan', route: 'jobs-hub', type: 'widget', description: 'Informasi resmi e-procurement BUMN.', status: 'active' },
      { id: 'nav-mkt-proyek', name: 'Proyek Infrastruktur', route: 'jobs-hub', type: 'widget', description: 'Listing pengerjaan jalan tol, jaringan listrik.', status: 'active' },
      { id: 'nav-mkt-lowongan', name: 'Lowongan Kerja', route: 'jobs-hub', type: 'widget', description: 'Karir eksekutif dan staf khusus industri.', status: 'active' },
      { id: 'nav-mkt-freelance', name: 'Freelancer Hub', route: 'jobs-hub', type: 'widget', description: 'Kontrak kerja lepas ahli bahasa & analis data.', status: 'beta' }
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
      { id: 'nav-com-forum', name: 'Forum Komunitas', route: 'forum-hub', type: 'menu', description: 'Kamar diskusi terbuka per kategori topik bisnis.', status: 'active' },
      { id: 'nav-com-grup', name: 'Grup Afiliasi', route: 'forum-hub', type: 'menu', description: 'Komunitas regional pengusaha muda.', status: 'active' },
      { id: 'nav-com-polling', name: 'Interactive Polling', route: 'forum-hub', type: 'menu', description: 'Jajak pendapat publik mingguan.', status: 'active' },
      { id: 'nav-com-chat', name: 'Live Chat Redaksi', route: 'forum-hub', type: 'menu', description: 'Saluran siaran langsung respon cepat pembaca.', status: 'beta' }
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
      { id: 'nav-intel-geo', name: 'GeoOS Spasial Map', route: 'geo-intelligence-os', type: 'dashboard', description: 'Visualisasi spasial GIS interaktif provinsi Jawa Barat.', status: 'active' },
      { id: 'nav-intel-biz', name: 'Business Intelligence', route: 'intelligence-workspace', type: 'dashboard', description: 'Statistik korporasi terintegrasi, laporan neraca.', status: 'active' },
      { id: 'nav-intel-fin', name: 'Financial Intelligence', route: 'financial-intelligence', type: 'dashboard', description: 'Kalkulator arus kas, ekspor-impor regional.', status: 'active' },
      { id: 'nav-intel-mon', name: 'Monitoring Sentimen', route: 'intelligence-workspace', type: 'dashboard', description: 'Pemantauan kata kunci media sosial real-time.', status: 'active' },
      { id: 'nav-intel-insight', name: 'AI Insight Report', route: 'intelligence-workspace', type: 'report', description: 'Ekstraksi otomatis ringkasan eksekutif mingguan.', status: 'beta' },
      { id: 'nav-intel-research', name: 'Research Center', route: 'document-center', type: 'report', description: 'Pusat unggah jurnal resmi regulasi pemerintah.', status: 'active' }
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
      { id: 'nav-ai-chat', name: 'AI Chatbot Assistant', route: 'feature-explorer', type: 'ai-agent', description: 'Diskusi interaktif dengan model Gemini 2.0 Flash.', status: 'active' },
      { id: 'nav-ai-search', name: 'AI Semantic Search', route: 'seo-hub', type: 'ai-agent', description: 'Pencarian berbasis makna melintasi ribuan arsip berita.', status: 'active' },
      { id: 'nav-ai-summary', name: 'AI Auto-Summarizer', route: 'document-center', type: 'ai-agent', description: 'Kompilasi artikel panjang menjadi ringkasan 3 poin.', status: 'active' },
      { id: 'nav-ai-agents', name: 'Autonomous News Agents', route: 'intelligence-workspace', type: 'ai-agent', description: 'Bot terjadwal yang menyusun rancangan artikel regional.', status: 'beta' },
      { id: 'nav-ai-auto', name: 'Publish Automation', route: 'seo-hub', type: 'ai-agent', description: 'Integrasi rujukan silang tag SEO ke WordPress/TikTok.', status: 'active' },
      { id: 'nav-ai-work', name: 'AI Collaborative Workspace', route: 'intelligence-workspace', type: 'ai-agent', description: 'Kanban board interaktif dibantu asisten AI.', status: 'active' }
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
      { id: 'nav-learn-doc', name: 'Developer Docs', route: 'developer-docs', type: 'menu', description: 'Cara menggunakan API integrasi eksternal.', status: 'active' },
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
];

const MICRO_SPONSORS = [
  {
    title: "Bank BJB Digi",
    desc: "Kemudahan transaksi perbankan digital warga Jawa Barat.",
    cta: "Download bjb Digi",
    link: "https://www.bankbjb.co.id",
    badge: "Sponsor"
  },
  {
    title: "Patimban Port Logistics",
    desc: "Hub konektivitas logistik ekspor & industri global masa depan.",
    cta: "Kemitraan Industri",
    link: "https://patimbanport.co.id",
    badge: "Mitra Strategis"
  },
  {
    title: "Telkomsel Jabar Juara",
    desc: "Jaringan 5G Hyper-Speed terluas untuk akselerasi desa digital.",
    cta: "Beli Paket Jabar",
    link: "https://www.telkomsel.com",
    badge: "Konektivitas"
  },
  {
    title: "Bio Farma Indonesia",
    desc: "Dedikasi kemandirian kesehatan nasional dari Bandung.",
    cta: "Info Layanan",
    link: "https://www.biofarma.co.id",
    badge: "Sponsor Utama"
  }
];

function MicroSponsorCard({ index }: { index: number }) {
  const sponsor = MICRO_SPONSORS[index % MICRO_SPONSORS.length];
  return (
    <div className="mx-1 my-2 p-2.5 rounded-lg bg-gradient-to-r from-amber-500/10 to-yellow-500/5 border border-amber-500/20 space-y-1 relative overflow-hidden group hover:border-amber-500/40 transition-all duration-300">
      <div className="absolute -right-2 -bottom-2 opacity-10 text-amber-300 pointer-events-none group-hover:scale-110 transition-transform duration-500 select-none text-xs">
        ✨
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-mono font-black text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded uppercase tracking-widest border border-amber-500/20">
          ⚡ {sponsor.badge}
        </span>
        <span className="text-[7px] font-mono text-slate-500">AdOS Integration</span>
      </div>
      <div className="text-left">
        <h5 className="text-[10px] font-sans font-bold text-amber-200 group-hover:text-amber-100 transition-colors">
          {sponsor.title}
        </h5>
        <p className="text-[9px] text-slate-400 font-sans leading-tight mt-0.5">
          {sponsor.desc}
        </p>
      </div>
      <div className="pt-1 flex justify-end">
        <a 
          href={sponsor.link} 
          target="_blank" 
          rel="noreferrer" 
          className="text-[8px] font-mono font-black text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-0.5 cursor-pointer"
        >
          {sponsor.cta} ➜
        </a>
      </div>
    </div>
  );
}

const VIRAL_FIGURES = [
  {
    name: "Ridwan Kamil",
    username: "@ridwankamil",
    platform: "Instagram",
    avatar: "RK",
    hashtag: "#RKOTWJakarta",
    viralReason: "Viral terkait deklarasi OTW Jakarta & gagasan kemacetan.",
    score: 98,
    color: "from-[#2B7A78] to-[#17252A]"
  },
  {
    name: "Gibran Rakabuming",
    username: "@gibran_rakabuming",
    platform: "Twitter/X",
    avatar: "GR",
    hashtag: "#FufufafaSaga",
    viralReason: "Trending hangat seputar spekulasi jejak digital lawas.",
    score: 95,
    color: "from-rose-500 to-rose-700"
  },
  {
    name: "Basuki Hadimuljono",
    username: "@kemenpupr",
    platform: "TikTok",
    avatar: "BH",
    hashtag: "#PakBasKamera",
    viralReason: "Viral aksi kocak memotret wartawan di peninjauan proyek IKN.",
    score: 89,
    color: "from-amber-500 to-amber-700"
  },
  {
    name: "Raffi Ahmad",
    username: "@raffinagita1717",
    platform: "Instagram",
    avatar: "RA",
    hashtag: "#GelarHCUIP",
    viralReason: "Sorotan warganet atas penganugerahan gelar Doktor Honoris Causa.",
    score: 88,
    color: "from-purple-500 to-indigo-700"
  },
  {
    name: "Kaesang Pangarep",
    username: "@kaesangp",
    platform: "TikTok",
    avatar: "KP",
    hashtag: "#RotiMewah",
    viralReason: "Gunjingan netizen perihal roti seharga 400 ribu & jet pribadi.",
    score: 86,
    color: "from-pink-500 to-pink-700"
  }
];

interface CategoryTheme {
  icon: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  itemSelectedBg: string;
  itemSelectedText: string;
  itemHoverBg: string;
  dotColor: string;
}

const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  'News': {
    icon: '📰',
    badgeBg: 'bg-emerald-500/10',
    badgeText: 'text-emerald-400',
    badgeBorder: 'border-emerald-500/20',
    itemSelectedBg: 'bg-emerald-500 text-slate-950',
    itemSelectedText: 'text-slate-950 font-bold',
    itemHoverBg: 'hover:bg-emerald-500/10 hover:text-emerald-300',
    dotColor: 'bg-emerald-400'
  },
  'Media': {
    icon: '🎬',
    badgeBg: 'bg-sky-500/10',
    badgeText: 'text-sky-400',
    badgeBorder: 'border-sky-500/20',
    itemSelectedBg: 'bg-sky-500 text-slate-950',
    itemSelectedText: 'text-slate-950 font-bold',
    itemHoverBg: 'hover:bg-sky-500/10 hover:text-sky-300',
    dotColor: 'bg-sky-400'
  },
  'Audio Streaming': {
    icon: '📻',
    badgeBg: 'bg-amber-500/10',
    badgeText: 'text-amber-400',
    badgeBorder: 'border-amber-500/20',
    itemSelectedBg: 'bg-amber-500 text-slate-950',
    itemSelectedText: 'text-slate-950 font-bold',
    itemHoverBg: 'hover:bg-amber-500/10 hover:text-amber-300',
    dotColor: 'bg-amber-400'
  },
  'Broadcasting Portal': {
    icon: '🎙️',
    badgeBg: 'bg-rose-500/10',
    badgeText: 'text-rose-400',
    badgeBorder: 'border-rose-500/20',
    itemSelectedBg: 'bg-rose-500 text-slate-950',
    itemSelectedText: 'text-slate-950 font-bold',
    itemHoverBg: 'hover:bg-rose-500/10 hover:text-rose-300',
    dotColor: 'bg-rose-400'
  },
  'Communities': {
    icon: '🤝',
    badgeBg: 'bg-purple-500/10',
    badgeText: 'text-purple-400',
    badgeBorder: 'border-purple-500/20',
    itemSelectedBg: 'bg-purple-500 text-slate-950',
    itemSelectedText: 'text-slate-950 font-bold',
    itemHoverBg: 'hover:bg-purple-500/10 hover:text-purple-300',
    dotColor: 'bg-purple-400'
  },
  'Proyek & Karir': {
    icon: '💼',
    badgeBg: 'bg-emerald-500/10',
    badgeText: 'text-emerald-400',
    badgeBorder: 'border-emerald-500/20',
    itemSelectedBg: 'bg-emerald-500 text-slate-950',
    itemSelectedText: 'text-slate-950 font-bold',
    itemHoverBg: 'hover:bg-emerald-500/10 hover:text-emerald-300',
    dotColor: 'bg-emerald-400'
  },
  'Social Engagement': {
    icon: '💬',
    badgeBg: 'bg-pink-500/10',
    badgeText: 'text-pink-400',
    badgeBorder: 'border-pink-500/20',
    itemSelectedBg: 'bg-pink-500 text-slate-950',
    itemSelectedText: 'text-slate-950 font-bold',
    itemHoverBg: 'hover:bg-pink-500/10 hover:text-pink-300',
    dotColor: 'bg-pink-400'
  },
  'Ekonomi & Keuangan': {
    icon: '💰',
    badgeBg: 'bg-teal-500/10',
    badgeText: 'text-teal-400',
    badgeBorder: 'border-teal-500/20',
    itemSelectedBg: 'bg-teal-500 text-slate-950',
    itemSelectedText: 'text-slate-950 font-bold',
    itemHoverBg: 'hover:bg-teal-500/10 hover:text-teal-300',
    dotColor: 'bg-teal-400'
  },
  'Finance Terminal': {
    icon: '📈',
    badgeBg: 'bg-indigo-500/10',
    badgeText: 'text-indigo-400',
    badgeBorder: 'border-indigo-500/20',
    itemSelectedBg: 'bg-indigo-500 text-slate-950',
    itemSelectedText: 'text-slate-950 font-bold',
    itemHoverBg: 'hover:bg-indigo-500/10 hover:text-indigo-300',
    dotColor: 'bg-indigo-400'
  },
  'Corporate Finance': {
    icon: '🏦',
    badgeBg: 'bg-cyan-500/10',
    badgeText: 'text-cyan-400',
    badgeBorder: 'border-cyan-500/20',
    itemSelectedBg: 'bg-cyan-500 text-slate-950',
    itemSelectedText: 'text-slate-950 font-bold',
    itemHoverBg: 'hover:bg-cyan-500/10 hover:text-cyan-300',
    dotColor: 'bg-cyan-400'
  },
  'Revenue': {
    icon: '💸',
    badgeBg: 'bg-amber-400/15',
    badgeText: 'text-amber-300',
    badgeBorder: 'border-amber-400/30',
    itemSelectedBg: 'bg-amber-500 text-slate-950',
    itemSelectedText: 'text-slate-950 font-bold',
    itemHoverBg: 'hover:bg-amber-400/10 hover:text-amber-300',
    dotColor: 'bg-amber-400'
  },
  'CMS': {
    icon: '✏️',
    badgeBg: 'bg-violet-500/10',
    badgeText: 'text-violet-400',
    badgeBorder: 'border-violet-500/20',
    itemSelectedBg: 'bg-violet-500 text-slate-950',
    itemSelectedText: 'text-slate-950 font-bold',
    itemHoverBg: 'hover:bg-violet-500/10 hover:text-violet-300',
    dotColor: 'bg-violet-400'
  },
  'Widget Management': {
    icon: '🧩',
    badgeBg: 'bg-fuchsia-500/10',
    badgeText: 'text-fuchsia-400',
    badgeBorder: 'border-fuchsia-500/20',
    itemSelectedBg: 'bg-fuchsia-500 text-slate-950',
    itemSelectedText: 'text-slate-950 font-bold',
    itemHoverBg: 'hover:bg-fuchsia-500/10 hover:text-fuchsia-300',
    dotColor: 'bg-fuchsia-400'
  },
  'GIS Operations': {
    icon: '🗺️',
    badgeBg: 'bg-lime-500/10',
    badgeText: 'text-lime-400',
    badgeBorder: 'border-lime-500/20',
    itemSelectedBg: 'bg-lime-500 text-slate-950',
    itemSelectedText: 'text-slate-950 font-bold',
    itemHoverBg: 'hover:bg-lime-500/10 hover:text-lime-300',
    dotColor: 'bg-lime-400'
  },
  'System': {
    icon: '⚙️',
    badgeBg: 'bg-slate-500/20',
    badgeText: 'text-slate-300',
    badgeBorder: 'border-slate-500/30',
    itemSelectedBg: 'bg-white text-slate-950',
    itemSelectedText: 'text-slate-950 font-bold',
    itemHoverBg: 'hover:bg-white/10 hover:text-slate-100',
    dotColor: 'bg-white'
  },
  'Intelligence': {
    icon: '🧠',
    badgeBg: 'bg-purple-600/20',
    badgeText: 'text-purple-300',
    badgeBorder: 'border-purple-500/30',
    itemSelectedBg: 'bg-purple-500 text-white',
    itemSelectedText: 'text-white font-bold',
    itemHoverBg: 'hover:bg-purple-500/15 hover:text-purple-200',
    dotColor: 'bg-purple-400'
  },
  'Decision Support System': {
    icon: '📊',
    badgeBg: 'bg-sky-600/25',
    badgeText: 'text-sky-300',
    badgeBorder: 'border-sky-500/30',
    itemSelectedBg: 'bg-sky-400 text-slate-950',
    itemSelectedText: 'text-slate-950 font-bold',
    itemHoverBg: 'hover:bg-sky-400/15 hover:text-sky-200',
    dotColor: 'bg-sky-400'
  },
  'Advertising Management': {
    icon: '🎯',
    badgeBg: 'bg-rose-600/20',
    badgeText: 'text-rose-300',
    badgeBorder: 'border-rose-500/30',
    itemSelectedBg: 'bg-rose-500 text-white',
    itemSelectedText: 'text-white font-bold',
    itemHoverBg: 'hover:bg-rose-500/15 hover:text-rose-200',
    dotColor: 'bg-rose-400'
  },
  'Partners': {
    icon: '🤝',
    badgeBg: 'bg-emerald-600/20',
    badgeText: 'text-emerald-300',
    badgeBorder: 'border-emerald-500/30',
    itemSelectedBg: 'bg-emerald-500 text-slate-950',
    itemSelectedText: 'text-slate-950 font-bold',
    itemHoverBg: 'hover:bg-emerald-500/15 hover:text-emerald-200',
    dotColor: 'bg-emerald-400'
  },
  'Platform Diagnostics': {
    icon: '🩺',
    badgeBg: 'bg-red-600/20',
    badgeText: 'text-red-300',
    badgeBorder: 'border-red-500/30',
    itemSelectedBg: 'bg-red-500 text-white',
    itemSelectedText: 'text-white font-bold',
    itemHoverBg: 'hover:bg-red-500/15 hover:text-red-200',
    dotColor: 'bg-red-400'
  },
  'Monitoring': {
    icon: '👁️',
    badgeBg: 'bg-teal-600/20',
    badgeText: 'text-teal-300',
    badgeBorder: 'border-teal-500/30',
    itemSelectedBg: 'bg-teal-500 text-slate-950',
    itemSelectedText: 'text-slate-950 font-bold',
    itemHoverBg: 'hover:bg-teal-500/15 hover:text-teal-200',
    dotColor: 'bg-teal-400'
  },
  'Knowledge Repository': {
    icon: '📖',
    badgeBg: 'bg-blue-600/20',
    badgeText: 'text-blue-300',
    badgeBorder: 'border-blue-500/30',
    itemSelectedBg: 'bg-blue-500 text-white',
    itemSelectedText: 'text-white font-bold',
    itemHoverBg: 'hover:bg-blue-500/15 hover:text-blue-200',
    dotColor: 'bg-blue-400'
  },
  'Content Optimization': {
    icon: '⚡',
    badgeBg: 'bg-amber-600/20',
    badgeText: 'text-amber-300',
    badgeBorder: 'border-amber-500/30',
    itemSelectedBg: 'bg-amber-500 text-slate-950',
    itemSelectedText: 'text-slate-950 font-bold',
    itemHoverBg: 'hover:bg-amber-500/15 hover:text-amber-200',
    dotColor: 'bg-amber-400'
  },
  'Workflow Administration': {
    icon: '💼',
    badgeBg: 'bg-indigo-600/25',
    badgeText: 'text-indigo-300',
    badgeBorder: 'border-indigo-500/30',
    itemSelectedBg: 'bg-indigo-500 text-white',
    itemSelectedText: 'text-white font-bold',
    itemHoverBg: 'hover:bg-indigo-500/15 hover:text-indigo-200',
    dotColor: 'bg-indigo-400'
  }
};

const DEFAULT_THEME: CategoryTheme = {
  icon: '📁',
  badgeBg: 'bg-[#FFD700]/10',
  badgeText: 'text-[#FFD700]',
  badgeBorder: 'border-[#FFD700]/25',
  itemSelectedBg: 'bg-[#FFD700] text-[#002B5B]',
  itemSelectedText: 'text-[#002B5B] font-bold',
  itemHoverBg: 'hover:bg-[#FFD700]/10 hover:text-[#FFD700]',
  dotColor: 'bg-[#FFD700]'
};

export default function Sidebar({ 
  isOpen, 
  onClose, 
  currentTab, 
  onTabChange, 
  user, 
  activePortal = 'public',
  simulatedRole,
  onNavigateToSlug
}: SidebarProps) {
  const [filterQuery, setFilterQuery] = useState('');
  const [isSitemapOpen, setIsSitemapOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'public-portal': true,
    'news-categories': false,
    'directory': false,
    'marketplace': false,
    'community': false,
    'intelligence': false,
    'ai-hub': false,
    'learning': false,
    'about-us': false
  });
  const [isRegionalOpen, setIsRegionalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  // Social Media Hub Local States
  const [activePlatformFilter, setActivePlatformFilter] = useState<'all' | 'Instagram' | 'X' | 'TikTok'>('all');
  const [followedAccounts, setFollowedAccounts] = useState<string[]>([]);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [sharedPostId, setSharedPostId] = useState<string | null>(null);
  const [useCategoryFilter, setUseCategoryFilter] = useState<boolean>(true);

  const activeFeature = FEATURE_REGISTRY.find(feat => feat.route === currentTab);
  const activeCategory = activeFeature ? activeFeature.category : 'News';

  const filteredSocialPosts = SOCIAL_POSTS.filter(post => {
    if (useCategoryFilter) {
      if (post.category.toLowerCase() !== activeCategory.toLowerCase()) {
        return false;
      }
    }
    if (activePlatformFilter !== 'all') {
      if (post.platform.toLowerCase() !== activePlatformFilter.toLowerCase()) {
        return false;
      }
    }
    return true;
  });

  const filteredFigures = VIRAL_FIGURES.filter(fig => {
    if (filterQuery.trim() === '') return true;
    const q = filterQuery.toLowerCase();
    return fig.name.toLowerCase().includes(q) || 
           fig.username.toLowerCase().includes(q) || 
           fig.hashtag.toLowerCase().includes(q) || 
           fig.viralReason.toLowerCase().includes(q) ||
           fig.platform.toLowerCase().includes(q);
  });

  // helper to check if item/category is accessible
  const isAccessible = (allowedRoles?: string[]) => {
    if (!allowedRoles) return true;
    const currentRole = simulatedRole || user?.role || 'guest';
    if (allowedRoles.includes(currentRole)) return true;
    
    // Alternative map checks
    return allowedRoles.some(role => {
      if (role === 'admin' && currentRole.includes('admin')) return true;
      if (role === 'redaktur' && currentRole === 'editor') return true;
      if (role === 'partner' && currentRole === 'sales') return true;
      if (role === 'analyst' && (currentRole === 'researcher' || currentRole === 'government')) return true;
      return false;
    });
  };

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

  const accessibleNavigationData = React.useMemo(() => {
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

    return NAVIGATION_DATA.map(category => {
      const catPortal = categoryPortalMap[category.id] || 'public';
      if (!allowedPortals.includes(catPortal)) {
        return null;
      }

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

      const visibleItems = category.items.filter(item => {
        const matchedFeature = FEATURE_REGISTRY.find(f => f.route === item.route);
        const rolesToCheck = matchedFeature?.allowedRoles || (item as any).allowedRoles;
        if (rolesToCheck && !rolesToCheck.includes(currentRole)) {
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
    }).filter((cat): cat is typeof NAVIGATION_DATA[0] => cat !== null);
  }, [user, simulatedRole]);

  const filteredData = React.useMemo(() => {
    if (!filterQuery.trim()) return accessibleNavigationData;

    const query = filterQuery.toLowerCase();
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
  }, [filterQuery, accessibleNavigationData]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] cursor-pointer"
            id="sidebar-backdrop"
          />

          {/* Sidebar Drawer Container */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed inset-y-0 left-0 w-full max-w-[320px] xs:max-w-[340px] bg-white dark:bg-[#03152F] border-r border-slate-200 dark:border-slate-800/80 text-slate-800 dark:text-white z-[10000] shadow-2xl flex flex-col justify-between overflow-hidden"
            id="app-sidebar"
          >
            {/* Animated Moving Gradient Ribbon (Top Screen / Header Polet) - Detik.com style */}
            <div className="polet-rainbow-bar w-full h-[4px] shrink-0" />

            {/* Header section */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800/60 bg-slate-50 dark:bg-[#020e20] relative">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  {/* INFOBOS NEXT Logo */}
                  <div className="flex items-center gap-2 select-none">
                    <div className="relative w-7 h-7 rounded-full bg-slate-900 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-white/10 shrink-0 shadow-sm">
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#14b8a6] via-[#2563eb] to-[#94a3b8]" />
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#0284c7] to-[#0f172a] opacity-60 mix-blend-overlay" />
                      <div className="absolute inset-[2px] rounded-full bg-white flex items-center justify-center shadow-inner">
                        <Play className="h-2.5 w-2.5 fill-[#FFB800] text-[#FFB800] ml-0.5" />
                      </div>
                    </div>
                    <div className="flex flex-col text-left leading-none">
                      <span className="font-sans font-black text-xs tracking-tight text-[#002B5B] dark:text-white">
                        INFOBOS<span className="text-[#FFB800] dark:text-[#FFD700]">NEXT</span>
                      </span>
                      <span className="text-[6.5px] text-slate-500 dark:text-slate-400 font-mono tracking-wider font-extrabold mt-0.5 uppercase">SITEMAP &amp; INDEKS KANAL</span>
                    </div>
                  </div>
                  <span className="text-slate-300 dark:text-slate-700 text-xs">|</span>
                  <span className="text-[8px] text-[#2B7A78] dark:text-[#3AAFA9] font-mono font-extrabold uppercase tracking-widest bg-[#2B7A78]/5 dark:bg-white/5 px-2 py-0.5 rounded-full border border-[#2B7A78]/15 dark:border-white/5 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-[#2B7A78] dark:bg-[#3AAFA9] animate-pulse" />
                    partneros portal
                  </span>
                </div>
                <button 
                  onClick={onClose}
                  className="p-1.5 text-slate-400 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/5 rounded-full transition cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Live search input filter with detik blue / orange border style */}
              <div className="relative mt-2">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari kanal, indeks berita..."
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                  className="w-full bg-white dark:bg-[#000d1a] border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-white/30 rounded-lg pl-9 pr-3 py-2 text-xs font-sans focus:outline-none focus:border-[#005691] dark:focus:border-[#f37021] focus:ring-2 focus:ring-[#005691]/10 dark:focus:ring-[#f37021]/10 transition-all duration-150"
                />
              </div>
            </div>

            {/* Scrollable features listing */}
            <div className="flex-grow overflow-y-auto px-4 py-3 space-y-4 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/10 scrollbar-track-transparent">
              {/* Dropdown Portal Regional */}
              {filterQuery.trim() === '' && (
                <div className="space-y-2 pb-3 border-b border-slate-100 dark:border-white/10 relative">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-900/10 text-slate-600 dark:text-slate-300 text-[9px] font-mono font-black uppercase tracking-wider select-none w-fit">
                    <MapPin className="h-3.5 w-3.5 text-[#005691] dark:text-[#0090d4]" />
                    <span>Pilih Edisi Regional</span>
                  </div>
                  
                  <div className="relative px-1">
                    <button
                      onClick={() => setIsRegionalOpen(!isRegionalOpen)}
                      className="w-full px-3 py-2 rounded-lg bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-sans font-bold text-left text-slate-800 dark:text-slate-200 transition flex items-center justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#005691]/10"
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span className="text-[#f37021] shrink-0">🌐</span>
                        <span className="truncate">
                          {selectedRegion ? REGIONAL_OPTIONS.find(r => r.slug === selectedRegion)?.name : "Pilih Edisi Daerah..."}
                        </span>
                      </span>
                      <ChevronDown className={`h-4 w-4 text-slate-500 dark:text-slate-400 shrink-0 transition-transform duration-200 ${isRegionalOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isRegionalOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="absolute left-1 right-1 mt-1 bg-white dark:bg-[#001026] border border-slate-200 dark:border-white/10 rounded-lg shadow-xl z-50 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-white/10"
                        >
                          {REGIONAL_OPTIONS.map((reg) => (
                            <button
                              key={reg.slug}
                              onClick={() => {
                                setSelectedRegion(reg.slug);
                                setIsRegionalOpen(false);
                                if (onNavigateToSlug) {
                                  onNavigateToSlug(reg.slug, 'location');
                                } else {
                                  onTabChange('home');
                                }
                                onClose();
                              }}
                              className="w-full text-left px-3 py-2 text-xs font-sans text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 border-b border-slate-100 dark:border-white/5 last:border-b-0 flex items-center justify-between transition cursor-pointer"
                            >
                              <div className="flex flex-col min-w-0 pr-2">
                                <span className="font-bold text-slate-800 dark:text-slate-100 truncate">{reg.name}</span>
                                <span className="text-[9px] text-slate-400 dark:text-slate-500 truncate">{reg.subtext}</span>
                              </div>
                              <span className="text-[10px] text-[#f37021] font-bold shrink-0">Akses ➜</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* Trending Hashtags (Topik Terhangat) */}
              {filterQuery.trim() === '' && (
                <div className="space-y-1.5 pb-3 border-b border-slate-100 dark:border-white/10">
                  <div className="flex items-center gap-1.5 text-[9px] font-mono font-black uppercase text-slate-500 dark:text-slate-400 select-none">
                    <TrendingUp className="h-3 w-3 text-[#f37021]" />
                    <span>Tren Tagar Terhangat</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 px-1">
                    {[
                      { tag: '#JabarJuara', count: '14.2K' },
                      { tag: '#LokerJabar2026', count: '9.8K' },
                      { tag: '#DigitalTransform', count: '8.4K' },
                      { tag: '#PatimbanLogistics', count: '6.7K' },
                      { tag: '#RupiahDigital', count: '5.3K' }
                    ].map((tag) => (
                      <button
                        key={tag.tag}
                        onClick={() => {
                          setFilterQuery(tag.tag);
                        }}
                        className="px-2 py-0.5 rounded text-[8px] font-mono font-bold bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-[#f37021] hover:text-[#f37021] dark:hover:text-[#f37021] transition-colors cursor-pointer"
                      >
                        {tag.tag} <span className="text-[7px] text-slate-400 dark:text-slate-500 font-normal">{tag.count}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredData.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-xs font-mono">
                  Tidak ditemukan modul yang cocok.
                </div>
              ) : (
                (() => {
                  const totalCategories = filteredData.length;
                  return filteredData.map((category, catIndex) => {
                    const isThird = (catIndex + 1) % 3 === 0;
                    const isLastWithFew = totalCategories < 3 && catIndex === totalCategories - 1;
                    const showSponsor = isThird || isLastWithFew;
                    
                    const isExpanded = expandedCategories[category.id] ?? false;
                    const isGroupAccessible = isAccessible(category.allowedRoles);

                    // Detik-style colors
                    const borderColors: Record<string, string> = {
                      'public-portal': 'border-[#005691]',
                      'news-categories': 'border-[#f37021]',
                      'directory': 'border-red-600',
                      'marketplace': 'border-emerald-500',
                      'community': 'border-pink-500',
                      'intelligence': 'border-purple-500',
                      'ai-hub': 'border-cyan-400',
                      'learning': 'border-amber-400',
                      'about-us': 'border-slate-400'
                    };
                    const textColors: Record<string, string> = {
                      'public-portal': 'text-[#005691] dark:text-[#0090d4]',
                      'news-categories': 'text-[#f37021]',
                      'directory': 'text-red-500',
                      'marketplace': 'text-emerald-500',
                      'community': 'text-pink-500',
                      'intelligence': 'text-purple-500',
                      'ai-hub': 'text-cyan-500',
                      'learning': 'text-amber-500',
                      'about-us': 'text-slate-400'
                    };
                    const dotColors: Record<string, string> = {
                      'public-portal': 'bg-[#005691]',
                      'news-categories': 'bg-[#f37021]',
                      'directory': 'bg-red-500',
                      'marketplace': 'bg-emerald-500',
                      'community': 'bg-pink-500',
                      'intelligence': 'bg-purple-500',
                      'ai-hub': 'bg-cyan-500',
                      'learning': 'bg-amber-500',
                      'about-us': 'bg-slate-400'
                    };

                    const currentBorder = borderColors[category.id] || 'border-slate-300 dark:border-slate-700';
                    const currentText = textColors[category.id] || 'text-slate-600 dark:text-slate-300';
                    const currentDot = dotColors[category.id] || 'bg-slate-400';

                    return (
                      <React.Fragment key={category.id}>
                        <div className="border-b border-slate-100 dark:border-slate-800/60 pb-1.5 transition-all duration-150">
                          {/* Category Header (Detik-Style Indeks Kanal Divider) */}
                          <div 
                            onClick={() => setExpandedCategories(prev => ({ ...prev, [category.id]: !isExpanded }))}
                            className={`pl-3 pr-2 py-2.5 flex items-center justify-between cursor-pointer select-none border-l-[3.5px] ${currentBorder} hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all rounded-r-lg`}
                          >
                            <div className="flex items-center gap-2 min-w-0 text-left">
                              <category.icon className={`h-4 w-4 ${currentText} shrink-0`} />
                              <span className={`text-[11px] font-black uppercase tracking-tight block truncate ${currentText}`}>
                                {category.name}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="text-[9px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.2 rounded-md font-bold border border-slate-200/50 dark:border-slate-700/50">
                                {category.items.length}
                              </span>
                              {!isGroupAccessible && (
                                <Shield className="h-3 w-3 text-rose-500 shrink-0" />
                              )}
                              {isExpanded ? (
                                <ChevronDown className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                              ) : (
                                <ChevronRight className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                              )}
                            </div>
                          </div>

                          {/* Expandable Category Items (Detik-Style Channel Row Listings) */}
                          {isExpanded && (
                            <div className="mt-1 pl-3.5 space-y-0.5 border-l border-slate-100 dark:border-slate-800 ml-1">
                              {category.items.map((item) => {
                                const isSelected = currentTab === item.route;
                                const hasAccess = isAccessible((item as any).allowedRoles);

                                return (
                                  <div 
                                    key={item.id}
                                    className={`py-1.5 px-2 hover:bg-slate-50/80 dark:hover:bg-slate-800/20 rounded-md flex items-center justify-between transition-all duration-150 group ${
                                      !hasAccess ? 'opacity-40 cursor-not-allowed' : ''
                                    }`}
                                  >
                                    <div 
                                      onClick={() => {
                                        if (hasAccess) {
                                          onTabChange(item.route);
                                          onClose();
                                        }
                                      }}
                                      className="flex-1 min-w-0 cursor-pointer pr-2 text-left"
                                    >
                                      <div className="flex items-center gap-2">
                                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${currentDot} group-hover:scale-125 transition-transform duration-150`} />
                                        <span className={`text-[11px] font-bold transition-all duration-150 group-hover:translate-x-1 truncate ${
                                          isSelected 
                                            ? 'text-[#005691] dark:text-[#f37021] font-extrabold' 
                                            : 'text-slate-700 dark:text-slate-200 group-hover:text-[#005691] dark:group-hover:text-[#f37021]'
                                        }`}>
                                          {item.name}
                                        </span>
                                        {item.status === 'beta' && (
                                          <span className="text-[7.5px] bg-sky-500/10 text-sky-600 dark:text-sky-400 px-1 rounded font-mono uppercase shrink-0 font-bold tracking-wider">BETA</span>
                                        )}
                                      </div>
                                      <p className="text-[9.5px] text-slate-400 dark:text-slate-500 truncate mt-0.5 ml-3.5 leading-tight font-medium">
                                        {item.description}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                        {showSponsor && (
                          <MicroSponsorCard index={catIndex} />
                        )}
                      </React.Fragment>
                    );
                  });
                })()
              )}

              {/* TOKOH VIRAL DI MEDSOS SECTION */}
              {filteredFigures.length > 0 && (
                <div className="space-y-2.5 pt-3 border-t border-slate-200 dark:border-white/10">
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-md border border-orange-500/20 bg-orange-500/5 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[9px] font-mono font-black uppercase tracking-wider select-none">
                    <Flame className="h-3.5 w-3.5 text-orange-500 animate-pulse" />
                    <span>Tokoh Viral di Medsos</span>
                  </div>

                  <div className="space-y-2 px-1">
                    {filteredFigures.map((fig, idx) => (
                      <div 
                        key={idx}
                        className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#000d1a]/50 hover:bg-slate-100 dark:hover:bg-[#000d1a]/90 border border-slate-200 dark:border-white/5 hover:border-[#FFD700]/30 transition-all duration-300 space-y-1.5 group text-left"
                      >
                        {/* Header: Avatar, Name, Score */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 min-w-0">
                            {/* Styled Avatar */}
                            <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${fig.color} flex items-center justify-center font-sans font-black text-[10px] text-white border border-white/10 shrink-0 relative shadow-sm`}>
                              {fig.avatar}
                              {/* Platform indicator */}
                              <span className="absolute -bottom-1 -right-1 text-[8px] bg-slate-100 dark:bg-[#001733] border border-slate-200 dark:border-white/10 rounded-full p-0.5 leading-none flex items-center justify-center scale-75">
                                {fig.platform === "Instagram" ? "📸" : fig.platform === "TikTok" ? "🎵" : "🐦"}
                              </span>
                            </div>
                            
                            <div className="flex flex-col min-w-0 text-left">
                              <span className="text-[10px] font-bold text-slate-800 dark:text-slate-100 truncate group-hover:text-[#FFD700] transition-colors">
                                {fig.name}
                              </span>
                              <span className="text-[8px] font-mono text-slate-500 dark:text-slate-400 truncate">
                                {fig.username} • {fig.platform}
                              </span>
                            </div>
                          </div>

                          {/* Virality Score */}
                          <div className="text-[8px] font-mono font-black text-rose-600 dark:text-rose-400 bg-rose-500/5 dark:bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-200 dark:border-rose-500/20 flex items-center gap-0.5 shrink-0 uppercase tracking-tight">
                            <TrendingUp className="h-2.5 w-2.5 text-rose-600 dark:text-rose-400 shrink-0" />
                            {fig.score}%
                          </div>
                        </div>

                        {/* Hashtag & Reason */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                            <span 
                              onClick={() => {
                                if (onNavigateToSlug) {
                                  onNavigateToSlug(fig.hashtag, 'topic');
                                  onClose();
                                }
                              }}
                              className="text-[9px] font-mono font-bold text-[#FFD700] hover:underline cursor-pointer truncate"
                            >
                              {fig.hashtag}
                            </span>
                          </div>
                          <p className="text-[9.5px] text-slate-600 dark:text-slate-300 font-sans leading-relaxed line-clamp-2">
                            {fig.viralReason}
                          </p>
                        </div>

                        {/* Search Action */}
                        <div className="pt-0.5 flex justify-end">
                          <button
                            onClick={() => {
                              if (onNavigateToSlug) {
                                onNavigateToSlug(fig.name, 'topic');
                                onClose();
                              }
                            }}
                            className="text-[8px] font-mono font-bold text-sky-600 dark:text-sky-400 hover:text-sky-500 transition-colors flex items-center gap-0.5 cursor-pointer bg-sky-500/5 px-1.5 py-0.5 rounded border border-sky-500/10 hover:border-sky-500/30"
                          >
                            Temukan Berita ➜
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Media Hub Dedicated Section */}
              <div className="px-4 py-3.5 bg-gradient-to-br from-purple-500/5 via-sky-500/5 to-slate-100/50 dark:from-[#1c0029]/80 dark:via-[#001733]/90 dark:to-[#000d1a]/95 border border-slate-200 dark:border-pink-500/20 rounded-2xl space-y-3.5 text-left shadow-lg relative overflow-hidden group">
              
              {/* Header Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-pink-500/20 bg-pink-500/5 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 text-[8.5px] font-mono font-black uppercase tracking-wider select-none">
                  ⚡ Social Media Hub
                </div>
                <span className="text-[7.5px] font-mono text-emerald-400 animate-pulse font-black uppercase tracking-widest">● LIVE</span>
              </div>

              {/* Category Filter Toggle */}
              <div className="flex items-center justify-between gap-1 border-b border-slate-200 dark:border-white/5 pb-2">
                <div className="min-w-0 flex-1">
                  <p className="text-[8.5px] text-slate-500 dark:text-slate-400 font-mono uppercase tracking-tight truncate">
                    Halaman: <span className="text-pink-400 font-bold">{activeCategory}</span>
                  </p>
                </div>
                <button 
                  onClick={() => setUseCategoryFilter(!useCategoryFilter)}
                  className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold transition flex items-center gap-1 shrink-0 cursor-pointer border ${
                    useCategoryFilter 
                      ? 'bg-pink-500/20 text-pink-300 border-pink-500/35' 
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 dark:hover:bg-white/10'
                  }`}
                  title="Klik untuk melihat semua postingan atau hanya yang relevan dengan kategori halaman ini"
                >
                  <span>{useCategoryFilter ? '🎯 Terkait' : '🌐 Semua'}</span>
                </button>
              </div>

              {/* Platform Filters */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {(['all', 'Instagram', 'X', 'TikTok'] as const).map((plat) => (
                  <button
                    key={plat}
                    onClick={() => setActivePlatformFilter(plat)}
                    className={`px-2 py-1 text-[8.5px] font-mono font-bold rounded-lg transition border cursor-pointer shrink-0 ${
                      activePlatformFilter === plat
                        ? 'bg-pink-600 text-white border-pink-500 shadow-md scale-102 font-black'
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 dark:hover:bg-white/10'
                    }`}
                  >
                    {plat === 'all' ? 'Semua' : plat}
                  </button>
                ))}
              </div>

              {/* Consolidated Feed Stream */}
              <div className="max-h-80 overflow-y-auto space-y-2.5 pr-0.5 scrollbar-thin scrollbar-thumb-pink-500/20 scrollbar-track-transparent">
                {filteredSocialPosts.length === 0 ? (
                  <div className="text-center py-6 bg-slate-50 dark:bg-white/5 border border-slate-150 dark:border-white/5 rounded-xl space-y-2">
                    <p className="text-[9.5px] text-slate-500 dark:text-slate-400 font-mono">Tidak ada post di filter ini.</p>
                    <button
                      onClick={() => {
                        setUseCategoryFilter(false);
                        setActivePlatformFilter('all');
                      }}
                      className="px-2.5 py-1 bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 hover:text-white border border-pink-500/25 rounded-md text-[8.5px] font-mono transition cursor-pointer"
                    >
                      Tampilkan Semua
                    </button>
                  </div>
                ) : (
                  filteredSocialPosts.map((post) => {
                    const isFollowed = followedAccounts.includes(post.handle);
                    const isLiked = likedPosts.includes(post.id);
                    const totalLikes = isLiked ? post.likes + 1 : post.likes;

                    return (
                      <div 
                        key={post.id} 
                        className="p-3 bg-white dark:bg-white/5 border border-slate-150 dark:border-white/5 rounded-xl space-y-2.5 transition duration-300 hover:bg-slate-50 dark:hover:bg-white/8 hover:border-pink-500/20 text-left"
                      >
                        {/* Post Header: Avatar, Verified Name, Platform Icon & Follow Button */}
                        <div className="flex items-start justify-between gap-1.5">
                          <div className="flex items-center gap-2 min-w-0">
                            {/* Initials Avatar with Gradient */}
                            <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${post.avatarColor} flex items-center justify-center font-sans font-black text-[9px] text-white border border-white/10 shrink-0 relative shadow-sm`}>
                              {post.avatar}
                            </div>
                            
                            <div className="flex flex-col min-w-0 text-left">
                              <div className="flex items-center gap-1">
                                <span className="text-[10px] font-bold text-slate-800 dark:text-slate-100 truncate">
                                  {post.author}
                                </span>
                                {/* Official Verified Badge */}
                                {post.verified && (
                                  <div className="flex items-center gap-0.5">
                                    <span className="w-3 h-3 rounded-full bg-sky-500 flex items-center justify-center text-white shrink-0" title="Official Verified Channel">
                                      <Check className="h-2 w-2 stroke-[3]" />
                                    </span>
                                    <span className="px-1 py-[0.5px] bg-sky-500/20 border border-sky-500/30 text-sky-300 text-[5.5px] font-mono font-extrabold rounded uppercase tracking-wider">
                                      Official
                                    </span>
                                  </div>
                                )}
                              </div>
                              <span className="text-[8px] font-mono text-slate-500 dark:text-slate-400 truncate">
                                {post.handle} • {post.time}
                              </span>
                            </div>
                          </div>

                          {/* Follow CTA Button */}
                          <button
                            onClick={() => {
                              if (isFollowed) {
                                setFollowedAccounts(followedAccounts.filter(h => h !== post.handle));
                              } else {
                                setFollowedAccounts([...followedAccounts, post.handle]);
                              }
                            }}
                            className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-black tracking-tight transition flex items-center gap-0.5 shrink-0 cursor-pointer border ${
                              isFollowed
                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/20'
                                : 'bg-pink-500/10 hover:bg-pink-500/20 text-pink-600 dark:text-pink-300 hover:text-white border border-pink-500/20 dark:animate-pulse'
                            }`}
                          >
                            {isFollowed ? (
                              <>
                                <Check className="h-2 w-2" />
                                <span>Ikut ✔</span>
                              </>
                            ) : (
                              <>
                                <Plus className="h-2 w-2" />
                                <span>Ikuti</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Post Content */}
                        <div className="space-y-1.5">
                          <p className="text-[9.5px] text-slate-700 dark:text-slate-200 font-sans leading-relaxed whitespace-pre-wrap select-text">
                            {post.content.split(' ').map((word, i) => {
                              if (word.startsWith('#')) {
                                  return <span key={i} className="text-pink-500 dark:text-pink-400 font-semibold hover:underline cursor-pointer mr-0.5">{word} </span>;
                              }
                              return word + ' ';
                            })}
                          </p>
                          
                          {/* Optional Media Image Preview */}
                          {post.mediaUrl && (
                            <div className="relative aspect-video rounded-lg overflow-hidden border border-slate-200 dark:border-white/5 shadow-inner">
                              <img 
                                src={post.mediaUrl} 
                                alt="Medsos Jabar Attachment" 
                                className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white text-[7px] font-mono font-semibold select-none">
                                {post.platform}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Post Footer: Platform Indicator & Micro-Engagement Actions */}
                        <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-slate-500 dark:text-slate-400 text-[9px] font-mono">
                          <div className="flex gap-3">
                            {/* Like Counter Action */}
                            <button
                              onClick={() => {
                                if (isLiked) {
                                  setLikedPosts(likedPosts.filter(id => id !== post.id));
                                } else {
                                  setLikedPosts([...likedPosts, post.id]);
                                }
                              }}
                              className={`flex items-center gap-1 transition cursor-pointer ${
                                isLiked ? 'text-rose-500 dark:text-rose-400 font-bold scale-102' : 'hover:text-rose-500 dark:hover:text-rose-400'
                              }`}
                            >
                              <Heart className={`h-3 w-3 ${isLiked ? 'fill-current text-rose-500' : ''}`} />
                              <span>{totalLikes.toLocaleString()}</span>
                            </button>

                            {/* Comments Count */}
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>{post.comments}</span>
                            </div>
                          </div>

                          {/* Share CTA Action */}
                          <button
                            onClick={() => {
                              setSharedPostId(post.id);
                              setTimeout(() => setSharedPostId(null), 2000);
                            }}
                            className="hover:text-pink-500 dark:hover:text-pink-400 flex items-center gap-1 transition cursor-pointer"
                          >
                            <Share2 className="h-3 w-3" />
                            <span>{sharedPostId === post.id ? 'Tersalin!' : 'Bagikan'}</span>
                          </button>
                        </div>

                      </div>
                    );
                  })
                )}
              </div>

              {/* Primary Console redirection CTA */}
              <div className="pt-1 flex items-center gap-2">
                <button
                  onClick={() => {
                    onTabChange('social-media-hub');
                    onClose();
                  }}
                  className="w-full py-1.5 bg-gradient-to-r from-pink-500/10 to-purple-500/10 dark:from-pink-500/20 dark:to-purple-500/20 hover:from-pink-500/20 hover:to-purple-500/20 dark:hover:from-pink-500/35 dark:hover:to-purple-500/35 text-pink-700 dark:text-pink-200 hover:text-pink-900 dark:hover:text-white border border-pink-500/35 rounded-lg text-center text-[9px] font-mono font-black tracking-wide transition flex items-center justify-center gap-1 cursor-pointer focus:outline-none"
                >
                  Buka Konsol Hub Utama ➜
                </button>
              </div>
            </div>

            {/* Social Media & Community Box */}
            <div className="px-4 py-3.5 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-[#001f42]/40 dark:to-[#001226] border border-slate-200 dark:border-white/10 rounded-2xl space-y-2.5 text-left shadow-lg">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-sky-500/20 bg-sky-500/5 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[8.5px] font-mono font-black uppercase tracking-wider select-none w-fit">
                📢 Hubungi &amp; Gabung Komunitas
              </div>
              <p className="text-[10px] text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                Dapatkan update kebijakan terbaru &amp; diskusikan bersama jutaan pembaca Jawa Barat lainnya.
              </p>
              <div className="flex items-center gap-2 pt-1 border-t border-slate-200 dark:border-white/5">
                <a
                  href="https://t.me/infobos"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-1.5 bg-[#0088cc]/10 hover:bg-[#0088cc]/20 text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-300 border border-[#0088cc]/25 hover:border-[#0088cc]/50 rounded-md text-center text-[9px] font-mono font-bold transition flex items-center justify-center gap-1"
                >
                  <Send className="h-2.5 w-2.5 rotate-45" /> Telegram
                </a>
                <a
                  href="https://instagram.com/infobos"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-1.5 bg-pink-500/10 hover:bg-pink-500/25 text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 border border-pink-500/25 hover:border-pink-500/50 rounded-md text-center text-[9px] font-mono font-bold transition flex items-center justify-center gap-1"
                >
                  <Instagram className="h-2.5 w-2.5" /> Instagram
                </a>
              </div>
            </div>

            </div>

            {/* Bottom user meta card */}
            <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#000d1a]/80 z-10 shrink-0">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xs text-white uppercase border border-indigo-500 shadow-sm">
                    {user.fullName.substring(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate block">
                      {user.fullName}
                    </span>
                    <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-black tracking-wider block">
                      ROLE: {user.role.toUpperCase()}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-2 space-y-2">
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-mono text-rose-600 dark:text-rose-400 font-bold block uppercase tracking-wider">
                      ● Guest Mode
                    </span>
                    <span className="text-[9px] text-slate-600 dark:text-slate-400 font-sans block mt-0.5">
                      Login Redaksi untuk mengaktifkan RBAC Portals.
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      onTabChange('admin');
                      onClose();
                    }}
                    className="w-full py-1.5 bg-[#E32619] hover:bg-red-600 text-white font-extrabold text-[9px] rounded-lg shadow-sm transition tracking-wider uppercase flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Shield className="h-2.5 w-2.5" />
                    <span>Masuk Redaksi / CMS</span>
                  </button>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
