import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, User as UserIcon, LogIn, LogOut, ChevronDown, Check, Eye, 
  Calendar, Sun, Moon, TrendingUp, Menu, Tv, Headphones, Video, Image, 
  Database, Sparkles, X, ChevronLeft, ChevronRight, AlertCircle, Clock, Globe, Shield, Compass, Lock,
  Instagram, Facebook, Twitter, Send, Mic, MicOff, Sliders, MessageSquare, CreditCard, Play,
  Newspaper, Folder, Store, Users, Cpu
} from 'lucide-react';
import { PORTAL_ACCESS_MAPPING } from './PortalSwitcher';

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onNavigateToSlug: (slug: string, type: string, searchVal?: string) => void;
  user: any;
  simulatedRole?: string;
  onLogin: (token: string, user: any) => void;
  onLogout: () => void;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
  onToggleExplorer?: () => void;
  activePortal?: string;
  isDark?: boolean;
  onToggleDark?: () => void;
  topicPreferences?: string[];
  onSaveTopicPreferences?: (preferences: string[]) => void;
}

export default function Header({
  currentTab,
  onTabChange,
  onNavigateToSlug,
  user,
  simulatedRole,
  onLogin,
  onLogout,
  isSidebarOpen,
  onToggleSidebar,
  onToggleExplorer,
  activePortal = 'public',
  isDark = false,
  onToggleDark,
  topicPreferences = [],
  onSaveTopicPreferences
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Topic Preferences States
  const [showTopicDropdown, setShowTopicDropdown] = useState(false);
  const [tempPreferences, setTempPreferences] = useState<string[]>(topicPreferences);
  const topicRef = useRef<HTMLDivElement>(null);
  const extendedNavRef = useRef<HTMLDivElement>(null);
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const workspaceScrollRef = useRef<HTMLDivElement>(null);

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoryScrollRef.current) {
      const scrollAmount = 200;
      categoryScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollWorkspace = (direction: 'left' | 'right') => {
    if (workspaceScrollRef.current) {
      const scrollAmount = 200;
      workspaceScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (showTopicDropdown) {
      setTempPreferences(topicPreferences);
    }
  }, [showTopicDropdown, topicPreferences]);

  const handleToggleTopic = (slug: string) => {
    if (tempPreferences.includes(slug)) {
      setTempPreferences(tempPreferences.filter(s => s !== slug));
    } else {
      setTempPreferences([...tempPreferences, slug]);
    }
  };

  const handleSavePreferences = () => {
    if (onSaveTopicPreferences) {
      onSaveTopicPreferences(tempPreferences);
    }
    setShowTopicDropdown(false);
  };

  const handleVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Pencarian Suara tidak didukung penuh oleh browser Anda. Silakan gunakan Google Chrome.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'id-ID';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      setSearchQuery(speechToText);
      setShowSearchDropdown(true);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  // Dropdown states
  const [showCalendarDropdown, setShowCalendarDropdown] = useState(false);
  const [showQuickMenuDropdown, setShowQuickMenuDropdown] = useState(false);
  const [showExtendedNav, setShowExtendedNav] = useState(false);

  // Calendar interactive states (June 2026 Focus)
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<number>(27);
  const [calendarEvents, setCalendarEvents] = useState<Record<number, string>>({
    15: "Penyusunan APBD Perubahan Pemprov Jawa Barat 2026",
    16: "1 Muharram 1448 H - Tahun Baru Islam 1448 Hijriah",
    20: "Peluncuran Portal Hub EVOLIS Intelligence Jawa Barat oleh Dewan Pers",
    25: "Kunjungan Kerja Kemenkeu Sri Mulyani ke Gedung Sate",
    27: "Revitalisasi Wisata Heritage Gedung Sate Bandung Tahap 2 Dimulai",
    28: "Rapat Paripurna DPRD Jabar Pembahasan Pajak Digital",
    29: "Piala Dunia FIFA 2026 - Pertandingan Penyisihan Regional Indonesia",
    30: "Uji Coba Bus Listrik Terintegrasi Bandung Raya"
  });

  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const quickMenuRef = useRef<HTMLDivElement>(null);

  // Quick Autocomplete search fetch
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/v1/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        setSearchResults(data.results || []);
      } catch (err) {
        console.error("Autocomplete search error:", err);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchDropdown(false);
      }
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(e.target as Node)) {
        // Keep dropdown if clicked inside mobileSearchRef, otherwise handled
      }
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setShowCalendarDropdown(false);
      }
      if (quickMenuRef.current && !quickMenuRef.current.contains(e.target as Node)) {
        setShowQuickMenuDropdown(false);
      }
      if (topicRef.current && !topicRef.current.contains(e.target as Node)) {
        setShowTopicDropdown(false);
      }
      // Click outside for Layanan & Fitur Dropdown
      const isLayananToggle = (e.target as HTMLElement).closest('.layanan-toggle-btn');
      if (extendedNavRef.current && !extendedNavRef.current.contains(e.target as Node) && !isLayananToggle) {
        setShowExtendedNav(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Convert Gregorian June 2026 to Hijri
  // June 27, 2026 matches ~12 Muharram 1448 H
  const getHijriDateString = (day: number) => {
    // Offset calculation for June 2026
    // 1 Muharram 1448 H starts around June 16, 2026
    const hijriDay = day - 15;
    if (hijriDay <= 0) {
      // Dzulhijjah 1447 H has 29 or 30 days
      const lastMonthDay = 30 + hijriDay;
      return `${lastMonthDay} Dzulhijjah 1447 H`;
    } else {
      return `${hijriDay} Muharram 1448 H`;
    }
  };

  const publicCategories = [
    { name: 'Beranda', slug: 'home' },
    { name: 'Live Feed 🔴', slug: 'live-feed' },
    { name: 'Marketplace', slug: 'marketplace-hub' },
    { name: 'Proyek & Karir', slug: 'jobs-hub' },
    { name: 'Forum', slug: 'forum-hub' },
    { name: 'Regional', slug: 'regional' },
    { name: 'Nasional', slug: 'nasional' },
    { name: 'Internasional', slug: 'internasional' },
    { name: 'Business', slug: 'business' },
    { name: 'Technology', slug: 'technology' },
    { name: 'AI & Data', slug: 'ai-data' },
    { name: 'Sports', slug: 'sports' },
    { name: 'Lifestyle', slug: 'lifestyle' },
    { name: 'Investigasi', slug: 'investigasi' },
    { name: 'Analisis', slug: 'analisis' },
    { name: 'Riset & Insight', slug: 'riset-insight' }
  ];

  const roleCategories = [
    { name: '🌐 Geo Intelligence OS', slug: 'geo-intelligence-os' },
    { name: '🚀 App Center', slug: 'feature-explorer' },
    { name: '🛠️ System Explorer', slug: 'system-explorer' },
    { name: '🧩 Widget CMS', slug: 'widget-cms' },
    { name: '💼 Intel Workspace', slug: 'intelligence-workspace' },
    { name: '💰 RevenueOS', slug: 'revenue-os' },
    { name: '🛍️ Marketplace OS', slug: 'marketplace-hub' },
    { name: '💬 Forum Komunitas', slug: 'forum-hub' }
  ];

  const [activeNavGroup, setActiveNavGroup] = useState<string | null>('news');

  const navGroups = [
    { id: 'news', name: 'Kanal Berita', portal: 'public', icon: Newspaper },
    { id: 'dir', name: 'Direktori Hubs', portal: 'public', icon: Folder },
    { id: 'mkt', name: 'B2B Marketplace', portal: 'marketplace', icon: Store },
    { id: 'com', name: 'Komunitas & Forum', portal: 'community', icon: Users },
    { id: 'intel', name: 'Intelijen OS', portal: 'monitoring', icon: Cpu }
  ];

  const groupItems: Record<string, { name: string; slug: string; type?: string; portal: string }[]> = {
    news: [
      { name: 'Politik', slug: 'politik', portal: 'public' },
      { name: 'Ekonomi', slug: 'ekonomi', portal: 'public' },
      { name: 'Bisnis', slug: 'business', portal: 'public' },
      { name: 'Keuangan', slug: 'finance', portal: 'public' },
      { name: 'Teknologi', slug: 'technology', portal: 'public' },
      { name: 'Startup', slug: 'startup', portal: 'public' },
      { name: 'Artificial Intelligence', slug: 'ai-data', portal: 'public' },
      { name: 'Pendidikan', slug: 'pendidikan', portal: 'public' },
      { name: 'Kesehatan', slug: 'kesehatan', portal: 'public' },
      { name: 'Olahraga', slug: 'sports', portal: 'public' },
      { name: 'Otomotif', slug: 'otomotif', portal: 'public' },
      { name: 'Properti', slug: 'properti', portal: 'public' },
      { name: 'Pariwisata', slug: 'regional', portal: 'public' },
      { name: 'UMKM', slug: 'marketplace-hub', portal: 'public' }
    ],
    dir: [
      { name: 'Company Directory', slug: 'business-directory', portal: 'public' },
      { name: 'Brand Directory', slug: 'brand-directory', portal: 'public' },
      { name: 'Product Directory', slug: 'product-directory', portal: 'public' },
      { name: 'Government Directory', slug: 'geo-intelligence-os', portal: 'public' },
      { name: 'LSM & Asosiasi', slug: 'organization-directory', portal: 'public' },
      { name: 'Eksekutif', slug: 'intelligence-workspace', portal: 'public' },
      { name: 'Jurnalis', slug: 'author-directory', portal: 'public' },
      { name: 'Event Directory', slug: 'event-directory', portal: 'public' }
    ],
    mkt: [
      { name: 'Produk Unggulan', slug: 'marketplace-hub', type: 'marketplace', portal: 'marketplace' },
      { name: 'Jasa Profesional', slug: 'marketplace-hub', type: 'marketplace', portal: 'marketplace' },
      { name: 'Sewa Properti/Alat', slug: 'marketplace-hub', type: 'marketplace', portal: 'marketplace' },
      { name: 'Tender Pengadaan', slug: 'jobs-hub', type: 'jobs', portal: 'marketplace' },
      { name: 'Proyek Infrastruktur', slug: 'jobs-hub', type: 'jobs', portal: 'marketplace' },
      { name: 'Lowongan Kerja', slug: 'jobs-hub', type: 'jobs', portal: 'marketplace' },
      { name: 'Freelancer Hub', slug: 'jobs-hub', type: 'jobs', portal: 'marketplace' }
    ],
    com: [
      { name: 'Forum Komunitas', slug: 'forum-hub', type: 'forum', portal: 'community' },
      { name: 'Grup Afiliasi', slug: 'forum-hub', type: 'forum', portal: 'community' },
      { name: 'Interactive Polling', slug: 'forum-hub', portal: 'community' },
      { name: 'Live Chat Redaksi', slug: 'forum-hub', type: 'chat', portal: 'community' }
    ],
    intel: [
      { name: 'GeoOS Spasial Map', slug: 'geo-intelligence-os', portal: 'monitoring' },
      { name: 'Business Intelligence', slug: 'intelligence-workspace', portal: 'monitoring' },
      { name: 'Financial Intelligence', slug: 'financial-intelligence', portal: 'monitoring' },
      { name: 'Monitoring Sentimen', slug: 'intelligence-workspace', portal: 'monitoring' },
      { name: 'AI Insight Report', slug: 'feature-explorer', portal: 'monitoring' },
      { name: 'Research Center', slug: 'document-center', portal: 'monitoring' }
    ]
  };

  const currentRole = simulatedRole || user?.role || 'guest';
  const allowedPortals = PORTAL_ACCESS_MAPPING[currentRole] || ['public'];
  const isSuperAdmin = currentRole === 'super_admin';
  const showInternalNav = activePortal !== 'public' || isSuperAdmin;

  const checkPortalAccess = (portalId: string): boolean => {
    return allowedPortals.includes(portalId);
  };

  // News ticker entries
  const tickerNews = [
    "Pemprov Jabar luncurkan revitalisasi wisata heritage Gedung Sate Tahap 2 di Bandung Kota.",
    "Menkeu Sri Mulyani menyetujui stimulus digital PMK terbaru bagi start-up teknologi nasional.",
    "Inflasi Jawa Barat terkendali pada angka 1.84% berkat sinergi ketahanan komoditas pangan.",
    "Evolis Intelligence mencatat peningkatan 45% traffic rujukan pariwisata terpadu.",
    "Piala Dunia FIFA 2026: Persiapan infrastruktur stadion Gelora Bandung Lautan Api rampung.",
    "Konferensi Tingkat Tinggi AI Nusantara resmi menetapkan Bandung sebagai AI Hub regional."
  ];

  const [activeTickerIdx, setActiveTickerIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTickerIdx((prev) => (prev + 1) % tickerNews.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-[#001733] text-slate-900 dark:text-white shadow-md font-sans border-b border-slate-200 dark:border-white/10" id="root-header">
      {/* 0. INTERACTIVE RAINBOW POLET BAR */}
      <div className="polet-rainbow-bar w-full" id="global-header-polet"></div>
      
      {/* 1. BREAKING NEWS TICKER */}
      <div className="bg-[#E32619] dark:bg-[#000a18] border-b border-red-700 dark:border-white/10 text-white text-[10px] py-1.5 px-4 flex items-center justify-between gap-3 overflow-hidden font-bold">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="bg-white text-[#E32619] font-extrabold px-1.5 py-0.5 rounded text-[8px] uppercase animate-pulse">
            Breaking News
          </span>
          <span className="text-white/80 dark:text-white/40 text-[9px] font-mono">24/7 LIVE</span>
        </div>
        <p className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis text-left text-white font-semibold transition-all duration-500 ease-in-out">
          {tickerNews[activeTickerIdx]}
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <div className="text-[9px] text-white font-mono shrink-0 hidden sm:inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
            WIB (GMT+7)
          </div>
          <span className="text-white/30 text-[9px]">|</span>
          <button 
            onClick={() => setActiveTickerIdx((prev) => (prev + 1) % tickerNews.length)}
            className="text-[9px] text-white hover:underline shrink-0 font-extrabold"
          >
            Berikutnya &rarr;
          </button>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            {/* Sidebar / Platform Explorer Hamburger Trigger */}
            <button 
              onClick={onToggleExplorer || onToggleSidebar}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-[#001f42]/40 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition flex items-center justify-center shrink-0 h-8.5 w-8.5 border border-slate-250 dark:border-white/5"
              title="Buka Platform Explorer &amp; Interactive Sitemap"
              id="header-sidebar-trigger"
            >
              <Menu className="h-5 w-5 text-[#005691] dark:text-[#FFD700]" />
            </button>

            {/* Logo Brand */}
            <div className="flex items-center gap-3 cursor-pointer animate-fade-in shrink-0" onClick={() => { onTabChange('home'); setSearchQuery(''); }}>
              <div className="relative w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center overflow-hidden shadow-md border border-white/20">
                {/* Swirling color accents matching the uploaded logo */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#14b8a6] via-[#2563eb] to-[#94a3b8]" />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#0284c7] to-[#0f172a] opacity-60 mix-blend-overlay" />
                {/* Inner white circle */}
                <div className="absolute inset-[3px] rounded-full bg-white flex items-center justify-center shadow-inner">
                  {/* Play button */}
                  <Play className="h-3.5 w-3.5 fill-[#FFB800] text-[#FFB800] ml-0.5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]" />
                </div>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display font-black text-sm sm:text-base leading-none tracking-tight text-[#002B5B] dark:text-white">
                  INFOBOS<span className="text-[#FFB800] dark:text-[#FFD700]">NEXT</span>
                </span>
                <span className="text-[8px] text-slate-500 dark:text-slate-300 font-mono tracking-wider font-bold hidden xs:block mt-0.5">DIGITAL MEDIA PORTAL</span>
              </div>
            </div>
          </div>

          {/* Search Autocomplete bar */}
          <div ref={searchRef} className="relative flex-1 max-w-xs md:max-w-sm hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari berita, lokasi (Bandung, DKI), entitas..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                className="w-full pl-9 pr-9 py-2 bg-slate-100 dark:bg-[#001f42] text-slate-900 dark:text-white placeholder-slate-450 dark:placeholder-white/40 rounded-full border border-slate-200 dark:border-white/10 focus:outline-none focus:border-[#005691] dark:focus:border-[#FFD700] focus:ring-1 focus:ring-[#005691] dark:focus:ring-[#FFD700] text-xs transition"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 dark:text-white/40" />
              <button 
                onClick={handleVoiceSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-[#005691] dark:hover:text-teal-400 transition cursor-pointer flex items-center justify-center"
                title="Cari Berita via Suara (Voice Search)"
              >
                {isListening ? (
                  <Mic className="h-3.5 w-3.5 text-[#E32619] animate-pulse" />
                ) : (
                  <MicOff className="h-3.5 w-3.5 text-slate-400 dark:text-white/40" />
                )}
              </button>
            </div>

            {/* Dropdown Results list */}
            {showSearchDropdown && searchQuery.trim() && (
              <div className="absolute left-0 right-0 mt-1.5 bg-[#001f42] border border-white/10 rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto divide-y divide-white/5 animate-fade-in">
                <div className="p-2 text-[8px] font-bold text-slate-300 uppercase tracking-wider font-mono bg-[#002B5B] sticky top-0 flex justify-between">
                  <span>Hasil Autocomplete</span>
                  <span className="text-[#FFD700]">Aman</span>
                </div>
                {searchResults.length === 0 ? (
                  <div className="p-3.5 text-xs text-slate-400 text-center">
                    Tidak ditemukan hasil untuk &quot;{searchQuery}&quot;
                  </div>
                ) : (
                  searchResults.map((item) => (
                    <div
                      key={`${item.type}-${item.id}`}
                      onClick={() => {
                        onNavigateToSlug(item.slug, item.type, searchQuery);
                        setShowSearchDropdown(false);
                      }}
                      className="p-2 hover:bg-white/10 cursor-pointer transition flex items-start gap-2 text-left"
                    >
                      <div className={`mt-0.5 text-[8px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded shrink-0 font-mono ${
                        item.type === 'article' ? 'bg-[#2B7A78] text-white' :
                        item.type === 'location' ? 'bg-amber-500/20 text-amber-300' :
                        item.type === 'entity' ? 'bg-purple-500/20 text-purple-300' :
                        item.type === 'category' ? 'bg-emerald-500/20 text-emerald-300' :
                        item.type === 'topic' ? 'bg-indigo-500/20 text-indigo-300' :
                        item.type === 'tag' ? 'bg-pink-500/20 text-pink-300' :
                        item.type === 'marketplace' ? 'bg-orange-500/20 text-orange-300' :
                        item.type === 'jobs' ? 'bg-teal-500/20 text-teal-300' :
                        'bg-rose-500/20 text-rose-300'
                      }`}>
                        {item.type === 'correction' ? 'koreksi' : item.type === 'marketplace' ? 'market' : item.type === 'jobs' ? 'pekerjaan' : item.type}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-white line-clamp-1">{item.title}</div>
                        <div className="text-[10px] text-slate-300 line-clamp-1">{item.excerpt}</div>
                      </div>
                    </div>
                  ))
                )}
                <div 
                  onClick={() => {
                    onNavigateToSlug(searchQuery, 'search', searchQuery);
                    setShowSearchDropdown(false);
                  }}
                  className="p-2.5 text-center bg-[#002B5B]/85 hover:bg-slate-900 text-[10px] text-[#FFD700] font-bold cursor-pointer transition"
                >
                  Cari lengkap untuk &quot;{searchQuery}&quot; &rarr;
                </div>
              </div>
            )}
          </div>

          {/* 3. CONDENSED HEADER WIDGETS */}
          <div className="hidden lg:flex items-center gap-1.5 text-[9px] font-mono shrink-0 overflow-x-auto">
            {/* Weather widget */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#001733]/85 backdrop-blur-md border border-slate-200 dark:border-white/10 px-1.5 py-0.5 rounded-md transition-colors">
              <Sun className="h-2.5 w-2.5 text-amber-500 dark:text-amber-400 shrink-0" />
              <span className="text-slate-500 dark:text-slate-300 hidden sm:inline">Bdg:</span>
              <span className="text-slate-800 dark:text-white font-bold">26°C</span>
            </div>
            {/* Stocks widget */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#001733]/85 backdrop-blur-md border border-slate-200 dark:border-white/10 px-1.5 py-0.5 rounded-md transition-colors">
              <TrendingUp className="h-2.5 w-2.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="text-slate-500 dark:text-slate-300 hidden sm:inline">IHSG:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">7.184</span>
            </div>
            {/* Currency widget */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#001733]/85 backdrop-blur-md border border-slate-200 dark:border-white/10 px-1.5 py-0.5 rounded-md transition-colors">
              <span className="text-slate-500 dark:text-slate-300 hidden sm:inline">USD/IDR:</span>
              <span className="text-amber-600 dark:text-[#FFD700] font-bold">15.742</span>
            </div>

            {/* Social Connects widget - show on 2xl and above */}
            <div className="hidden 2xl:flex items-center gap-2 bg-[#001733]/85 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-lg text-[9px]">
              <span className="font-bold text-[#FFD700] tracking-wider uppercase">Ikuti:</span>
              <div className="flex items-center gap-2 border-l border-white/10 pl-2">
                <a 
                  href="https://instagram.com/infobos" 
                  target="_blank" 
                  rel="noreferrer" 
                  title="Instagram INFOBOS" 
                  className="text-slate-300 hover:text-pink-400 transition hover:scale-110"
                >
                  <Instagram className="h-3 w-3" />
                </a>
                <a 
                  href="https://twitter.com/infobos" 
                  target="_blank" 
                  rel="noreferrer" 
                  title="Twitter / X INFOBOS" 
                  className="text-slate-300 hover:text-sky-400 transition hover:scale-110"
                >
                  <Twitter className="h-3 w-3" />
                </a>
                <a 
                  href="https://facebook.com/infobos" 
                  target="_blank" 
                  rel="noreferrer" 
                  title="Facebook INFOBOS" 
                  className="text-slate-300 hover:text-blue-400 transition hover:scale-110"
                >
                  <Facebook className="h-3 w-3" />
                </a>
                <a 
                  href="https://t.me/infobos" 
                  target="_blank" 
                  rel="noreferrer" 
                  title="Telegram Redaksi INFOBOS" 
                  className="text-[#FFD700] hover:text-white transition hover:scale-110"
                >
                  <Send className="h-2.5 w-2.5 -rotate-12" />
                </a>
              </div>
            </div>
          </div>

          {/* 4. INTERACTIVE CALENDAR & LOGIN & QUICK MENU */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Mobile Search Toggle */}
            <button
              onClick={() => {
                setShowMobileSearch(!showMobileSearch);
                setShowCalendarDropdown(false);
                setShowQuickMenuDropdown(false);
              }}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-[#001f42] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-[#005691] dark:hover:text-white hover:border-[#005691] dark:hover:border-[#FFD700] transition cursor-pointer flex items-center justify-center h-8.5 w-8.5"
              title="Cari Berita"
            >
              <Search className="h-3.5 w-3.5 text-[#005691] dark:text-[#FFD700]" />
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={onToggleDark}
              className="px-2.5 h-8.5 rounded-lg bg-slate-100 dark:bg-[#001f42] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-[#005691] dark:hover:border-[#FFD700] hover:text-[#005691] dark:hover:text-[#FFD700] transition flex items-center gap-1.5 text-[10px] font-bold cursor-pointer"
              title={isDark ? "Ganti ke Mode Terang" : "Ganti ke Mode Gelap (Midnight)"}
            >
              {isDark ? (
                <>
                  <Sun className="h-3.5 w-3.5 text-amber-400" />
                  <span className="hidden 2xl:inline">TERANG</span>
                </>
              ) : (
                <>
                  <Moon className="h-3.5 w-3.5 text-[#005691]" />
                  <span className="hidden 2xl:inline">MIDNIGHT</span>
                </>
              )}
            </button>

            {/* Topic Preference Button with Dropdown */}
            <div ref={topicRef} className="relative">
              <button
                onClick={() => {
                  setShowTopicDropdown(!showTopicDropdown);
                  setShowCalendarDropdown(false);
                  setShowQuickMenuDropdown(false);
                }}
                className="px-2.5 h-8.5 rounded-lg bg-slate-100 dark:bg-[#001f42] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-[#005691] dark:hover:border-[#FFD700] hover:text-[#005691] dark:hover:text-[#FFD700] transition flex items-center gap-1.5 text-[10px] font-bold cursor-pointer"
                title="Atur Preferensi Minat Topik Berita Anda"
              >
                <Sliders className="h-3.5 w-3.5 text-[#0090d4]" />
                <span className="hidden 2xl:inline">MINAT SAYA</span>
                {topicPreferences && topicPreferences.length > 0 && (
                  <span className="h-4.5 w-4.5 bg-[#E32619] text-white font-sans text-[8.5px] rounded-full font-black flex items-center justify-center shrink-0 ml-1 shadow-sm">
                    {topicPreferences.length}
                  </span>
                )}
              </button>

              {showTopicDropdown && (
                <div className="!absolute right-0 mt-2 bg-[#001f42] border border-white/10 rounded-xl shadow-2xl z-50 w-64 p-3.5 text-left animate-fade-in text-white font-sans polet-card-top">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                    <div className="text-left">
                      <span className="text-[11px] font-black text-[#FFD700] block uppercase tracking-wider">Topik Minat Saya</span>
                      <span className="text-[8px] text-slate-400 font-medium">Menyaring otomatis halaman beranda</span>
                    </div>
                    <Sliders className="h-3.5 w-3.5 text-teal-400" />
                  </div>

                  <div className="space-y-1.5 max-h-56 overflow-y-auto scrollbar-none pr-1 my-2">
                    {publicCategories.filter(cat => cat.slug !== 'home').map((topic) => {
                      const isChecked = tempPreferences.includes(topic.slug);
                      return (
                        <label 
                          key={topic.slug} 
                          className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-white/5 cursor-pointer transition text-[11px] font-bold text-slate-300 select-none"
                        >
                          <input 
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleTopic(topic.slug)}
                            className="rounded border-white/20 bg-slate-800 text-teal-500 focus:ring-teal-500 focus:ring-offset-0 h-3.5 w-3.5 cursor-pointer"
                          />
                          <span className={isChecked ? "text-white" : ""}>{topic.name}</span>
                        </label>
                      );
                    })}
                  </div>

                  <div className="border-t border-white/10 mt-2 pt-2.5 flex items-center justify-between">
                    <button
                      onClick={() => setTempPreferences([])}
                      className="text-[9px] font-bold text-rose-400 hover:text-rose-300 transition"
                    >
                      Reset Semua
                    </button>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setShowTopicDropdown(false)}
                        className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 text-[9px] font-bold transition"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleSavePreferences}
                        className="px-2.5 py-1 rounded bg-teal-500 hover:bg-teal-400 text-[#001f42] text-[9px] font-black transition"
                      >
                        Simpan
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Calendar Button with Dropdown (Hidden on mobile, layout already contains quick access) */}
            <div ref={calendarRef} className="relative hidden sm:block">
              <button 
                onClick={() => {
                  setShowCalendarDropdown(!showCalendarDropdown);
                  setShowQuickMenuDropdown(false);
                }}
                className={`px-2.5 h-8.5 rounded-lg border transition flex items-center gap-1.5 text-[10px] font-bold cursor-pointer ${
                  showCalendarDropdown 
                    ? 'bg-[#E32619] text-white border-[#E32619] shadow-md scale-102 font-black' 
                    : 'bg-slate-100 dark:bg-[#001f42] border-slate-200 dark:border-white/10 hover:border-[#005691] dark:hover:border-[#FFD700] text-slate-700 dark:text-slate-200'
                }`}
                title="Gregorian & Hijri Calendar"
              >
                <Calendar className="h-3.5 w-3.5 text-[#005691] dark:text-[#FFD700]" />
                <span className="hidden 2xl:inline">27 Juni 2026</span>
              </button>

              {showCalendarDropdown && (
                <div className="!absolute right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-750 rounded-xl shadow-2xl z-50 w-72 p-3.5 text-left animate-fade-in text-slate-900 dark:text-white polet-card-top">
                  <div className="flex items-center justify-between border-b border-slate-150 dark:border-slate-700 pb-2 mb-2">
                    <div className="text-left">
                      <span className="text-xs font-black text-[#005691] dark:text-[#FFD700] block">Agenda & Kalender</span>
                      <span className="text-[9px] text-slate-500 dark:text-slate-400 font-mono uppercase font-bold block">{getHijriDateString(selectedCalendarDay)}</span>
                    </div>
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">Juni 2026</span>
                  </div>

                  {/* Calendar Matrix June 2026 */}
                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 mb-2">
                    <span>S</span><span>S</span><span>R</span><span>K</span><span>J</span><span>S</span><span>M</span>
                    {/* Fill offset for June 1 2026 (Monday start) */}
                    {Array.from({ length: 30 }).map((_, i) => {
                      const dayNum = i + 1;
                      const hasEvent = calendarEvents[dayNum] !== undefined;
                      const isSelected = selectedCalendarDay === dayNum;
                      return (
                        <button
                          key={dayNum}
                          onClick={() => setSelectedCalendarDay(dayNum)}
                          className={`relative h-6 w-full rounded flex items-center justify-center font-mono cursor-pointer ${
                            isSelected 
                              ? 'bg-[#E32619] text-white font-extrabold shadow-sm' 
                              : hasEvent 
                                ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-teal-400 hover:bg-indigo-100 dark:hover:bg-indigo-900 font-semibold' 
                                : 'hover:bg-slate-150 dark:hover:bg-slate-800 text-slate-850 dark:text-slate-200'
                          }`}
                        >
                          {dayNum}
                          {hasEvent && !isSelected && (
                            <span className="absolute bottom-0.5 w-1 h-1 bg-indigo-500 dark:bg-teal-400 rounded-full"></span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Event details */}
                  <div className="bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-[10px] text-left leading-relaxed">
                    <span className="font-bold text-[#005691] dark:text-[#FFD700] block border-b border-slate-150 dark:border-slate-800 pb-1 mb-1 font-mono uppercase">
                      Agenda Tanggal {selectedCalendarDay} Juni:
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 font-medium">
                      {calendarEvents[selectedCalendarDay] || "Tidak ada agenda redaksi khusus atau rilis kebijakan pada tanggal ini."}
                    </p>
                    <div className="flex justify-between items-center mt-2 pt-1 border-t border-slate-150 dark:border-slate-850 text-[8px] font-mono font-bold text-slate-500">
                      <span>Hijri: {getHijriDateString(selectedCalendarDay)}</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Dewan Pers Sync</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Menu Button with Dropdown (Hidden on mobile, accessible via sitemap & extended nav) */}
            <div ref={quickMenuRef} className="relative hidden sm:block">
              <button 
                onClick={() => {
                  setShowQuickMenuDropdown(!showQuickMenuDropdown);
                  setShowCalendarDropdown(false);
                }}
                className={`px-2.5 h-8.5 rounded-lg border transition flex items-center gap-1.5 text-[10px] font-black cursor-pointer ${
                  showQuickMenuDropdown 
                    ? 'bg-[#E32619] text-white border-[#E32619] shadow-md scale-102 font-black' 
                    : 'bg-slate-100 dark:bg-[#001f42] border-slate-200 dark:border-white/10 hover:border-[#005691] dark:hover:border-[#FFD700] text-slate-700 dark:text-slate-200'
                }`}
                title="Akses Cepat Kanal Layanan"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span className="hidden 2xl:inline">LAYANAN</span>
              </button>

              {showQuickMenuDropdown && (
                <div className="!absolute right-0 mt-2 bg-white dark:bg-[#001f42] border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl z-50 w-60 p-2 text-left animate-fade-in divide-y divide-slate-150 dark:divide-white/5 polet-card-top text-slate-950 dark:text-white">
                  <div className="px-2.5 py-1 text-[9px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-widest mb-1.5 font-mono">
                    Akses Cepat Kanal
                  </div>
                  <div className="py-1 space-y-0.5">
                    {[
                      { name: "🚀 App Center Launcher", slug: "feature-explorer", icon: Compass, public: true },
                      { name: "🗺️ Geo Intelligence Map", slug: "geo-intelligence-os", icon: Globe, public: true },
                      { name: "Video Live TV 📺", slug: "video-hub", icon: Tv, public: true },
                      { name: "TikTok Shorts Hub 📱", slug: "short-video-hub", icon: Video, public: true },
                      { name: "Podcast Center 🎙️", slug: "podcast-center", icon: Headphones, public: true },
                      { name: "Visual Gallery 📸", slug: "gallery-center", icon: Image, public: true },
                      { name: "Data Interaktif 📊", slug: "interactive-data", icon: Database, public: true },
                      { name: "Agenda & Events 📅", slug: "event-center", icon: Calendar, public: true },
                      { name: "SEO Schemas Hub", slug: "seo-hub", icon: Shield, public: false, roles: ['admin', 'super_admin'] },
                      { name: "AdOS Monetisasi", slug: "ados", icon: Sparkles, public: false, roles: ['admin', 'super_admin'] },
                      { name: "🛠️ System Explorer", slug: "system-explorer", icon: Shield, public: false, roles: ['admin', 'super_admin', 'developer'] }
                    ].filter(item => {
                      if (item.public) return true;
                      if (!user) return false;
                      const currentRole = simulatedRole || user?.role || 'guest';
                      return item.roles?.includes(currentRole) || currentRole === 'super_admin';
                    }).map((item) => (
                      <button
                        key={item.slug}
                        onClick={() => {
                          onTabChange(item.slug);
                          setShowQuickMenuDropdown(false);
                        }}
                        className="w-full px-2.5 py-1.5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-left text-xs text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 transition cursor-pointer"
                      >
                        <item.icon className="h-3.5 w-3.5 text-[#005691] dark:text-[#FFD700]" />
                        <span className="font-bold">{item.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Login Bar */}
            {user ? (
              <div className="flex items-center gap-1.5 shrink-0">
                {showInternalNav && (
                  <button
                    onClick={() => onTabChange('admin')}
                    className={`px-2.5 h-8.5 rounded-lg text-[10px] font-extrabold tracking-wide border transition flex items-center justify-center cursor-pointer ${
                      currentTab === 'admin' 
                        ? 'bg-[#E32619] border-[#E32619] text-white shadow-sm scale-102 font-black' 
                        : 'bg-slate-100 dark:bg-[#001f42] border-slate-200 dark:border-white/10 hover:border-[#005691] dark:hover:border-[#FFD700] text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    CMS
                  </button>
                )}
                <button
                  onClick={onLogout}
                  title="Keluar Redaksi"
                  className="h-8.5 w-8.5 flex items-center justify-center bg-slate-100 dark:bg-[#001f42] text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg transition border border-slate-200 dark:border-white/10 cursor-pointer shrink-0"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : null}

          </div>

        </div>
      </div>

      {/* MOBILE SEARCH BAR */}
      {showMobileSearch && (
        <div ref={mobileSearchRef} className="md:hidden bg-[#001733] border-t border-b border-white/10 p-2 animate-fade-in relative z-20">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari berita, lokasi, entitas..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              className="w-full pl-8 pr-8 py-1.5 bg-[#001f42] text-white placeholder-white/40 rounded-full border border-white/20 focus:outline-none focus:border-[#FFD700] text-xs transition animate-pulse-once"
            />
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#FFD700]" />
            <button 
              onClick={handleVoiceSearch}
              className="absolute right-3 top-2 hover:text-teal-400 transition cursor-pointer"
              title="Cari Berita via Suara"
            >
              {isListening ? (
                <Mic className="h-3.5 w-3.5 text-rose-500 animate-pulse" />
              ) : (
                <MicOff className="h-3.5 w-3.5 text-white/40" />
              )}
            </button>
          </div>

          {/* Autocomplete for Mobile */}
          {showSearchDropdown && searchQuery.trim() && (
            <div className="absolute left-2 right-2 mt-1 bg-[#001f42] border border-white/10 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto divide-y divide-white/5">
              <div className="p-2 text-[8px] font-bold text-slate-300 uppercase tracking-wider font-mono bg-[#002B5B] sticky top-0 flex justify-between">
                <span>Hasil Pencarian Mobile</span>
                <span className="text-[#FFD700]">Aman</span>
              </div>
              {searchResults.length === 0 ? (
                <div className="p-3 text-xs text-slate-400 text-center">
                  Tidak ditemukan hasil untuk &quot;{searchQuery}&quot;
                </div>
              ) : (
                searchResults.map((item) => (
                  <div
                    key={`${item.type}-${item.id}-mobile`}
                    onClick={() => {
                      onNavigateToSlug(item.slug, item.type, searchQuery);
                      setShowSearchDropdown(false);
                      setShowMobileSearch(false);
                    }}
                    className="p-2 hover:bg-white/10 cursor-pointer transition flex items-start gap-2 text-left"
                  >
                    <div className={`mt-0.5 text-[8px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded shrink-0 font-mono ${
                      item.type === 'article' ? 'bg-[#2B7A78] text-white' :
                      item.type === 'location' ? 'bg-amber-500/20 text-amber-300' :
                      item.type === 'entity' ? 'bg-purple-500/20 text-purple-300' :
                      item.type === 'category' ? 'bg-emerald-500/20 text-emerald-300' :
                      item.type === 'topic' ? 'bg-indigo-500/20 text-indigo-300' :
                      item.type === 'tag' ? 'bg-pink-500/20 text-pink-300' :
                      item.type === 'marketplace' ? 'bg-orange-500/20 text-orange-300' :
                      item.type === 'jobs' ? 'bg-teal-500/20 text-teal-300' :
                      'bg-rose-500/20 text-rose-300'
                    }`}>
                      {item.type === 'correction' ? 'koreksi' : item.type === 'marketplace' ? 'market' : item.type === 'jobs' ? 'pekerjaan' : item.type}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-white line-clamp-1">{item.title}</div>
                    </div>
                  </div>
                ))
              )}
              <div 
                onClick={() => {
                  onNavigateToSlug(searchQuery, 'search', searchQuery);
                  setShowSearchDropdown(false);
                  setShowMobileSearch(false);
                }}
                className="p-2.5 text-center bg-[#002B5B]/85 hover:bg-slate-900 text-[10px] text-[#FFD700] font-bold cursor-pointer transition"
              >
                Cari lengkap untuk &quot;{searchQuery}&quot; &rarr;
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. SIMPLIFIED & SLEEK NAVIGATION BAR (PUBLIC + WORKSPACE ONLY) */}
      <nav className="relative bg-[#005691] dark:bg-[#001733] border-t border-b border-slate-200 dark:border-white/10 text-[10px]" id="main-navigation">
        
        {/* PRIMARY PUBLIC CATEGORIES ROW - Centered & Symmetrical */}
        <div id="nav-news-categories" className="bg-[#005691] dark:bg-[#001733]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            {/* Left badge indicator */}
            <div className="hidden md:flex items-center gap-2 shrink-0 py-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[10px] text-white font-extrabold tracking-wider uppercase font-sans">Kanal Berita</span>
            </div>

            {/* Centered Scrollable Main Categories with Soft Fade Masks & Nav Buttons */}
            <div className="flex-grow flex items-center gap-1 sm:gap-2 overflow-hidden">
              {/* Left Arrow Button */}
              <button
                onClick={() => scrollCategories('left')}
                className="p-1 sm:p-1.5 rounded-full border border-white/10 bg-white/10 text-white hover:text-[#FFD700] hover:bg-white/20 hover:border-[#FFD700]/30 active:scale-90 transition-all shrink-0 cursor-pointer flex items-center justify-center"
                title="Scroll Kiri"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>

              <div className="flex-grow relative overflow-hidden">
                {/* Left & Right gradient shadow indicators for horizontal scroll */}
                <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#005691] dark:from-[#001733] via-[#005691]/20 to-transparent pointer-events-none z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#005691] dark:from-[#001733] via-[#005691]/20 to-transparent pointer-events-none z-10" />
                
                <div 
                  ref={categoryScrollRef}
                  className="overflow-x-auto whitespace-nowrap scrollbar-none flex items-center justify-start gap-1 sm:gap-1.5 px-3"
                >
                  {publicCategories.map((cat) => {
                    const isActive = currentTab === cat.slug;
                    return (
                      <button
                        key={cat.slug}
                        onClick={() => onTabChange(cat.slug)}
                        className={`px-3 py-2.5 transition-all duration-200 font-extrabold uppercase tracking-widest text-[9.5px] cursor-pointer border-b-2 shrink-0 ${
                          isActive 
                            ? 'text-[#FFD700] border-[#FFD700] bg-white/15 font-black' 
                            : 'text-white/90 hover:text-white hover:bg-white/5 border-transparent'
                        }`}
                      >
                        <span>{cat.name}</span>
                      </button>
                    );
                  })}

                  {/* Mobile Inline Show/Hide Toggle Button */}
                  <button
                    onClick={() => setShowExtendedNav(!showExtendedNav)}
                    className="layanan-toggle-btn lg:hidden px-3 py-2 transition-all duration-200 font-extrabold uppercase tracking-wider text-[9.5px] cursor-pointer border-b-2 bg-[#FFD700]/5 border-[#FFD700]/20 text-[#FFD700] flex items-center gap-1 shrink-0"
                  >
                    <span>Layanan</span>
                    <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${showExtendedNav ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Right Arrow Button */}
              <button
                onClick={() => scrollCategories('right')}
                className="p-1 sm:p-1.5 rounded-full border border-white/10 bg-white/10 text-white hover:text-[#FFD700] hover:bg-white/20 hover:border-[#FFD700]/30 active:scale-90 transition-all shrink-0 cursor-pointer flex items-center justify-center"
                title="Scroll Kanan"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Quick action helper right side with desktop Toggle Button */}
            <div className="hidden lg:flex items-center gap-2.5 shrink-0 py-1.5">
              <span className="font-mono bg-white/5 px-2 py-0.5 rounded border border-white/10 text-slate-400 text-[10px] font-semibold">EDISI DIGITAL</span>
              
              <button
                onClick={() => setShowExtendedNav(!showExtendedNav)}
                className="layanan-toggle-btn flex items-center gap-1 bg-[#FFD700]/10 hover:bg-[#FFD700]/25 text-[#FFD700] px-2.5 py-1 rounded-lg border border-[#FFD700]/30 transition-all duration-200 text-[10px] font-bold uppercase tracking-wider shrink-0 cursor-pointer"
              >
                <span>Layanan & Fitur</span>
                <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${showExtendedNav ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* EXTENDED NAV BAR: Toggled Show & Hide for rich services/categories */}
        {showExtendedNav && (
          <div ref={extendedNavRef} className="absolute left-0 right-0 top-full z-50 divide-y divide-white/10 border-t border-b border-white/15 shadow-2xl animate-fade-in bg-[#001f42]/95 backdrop-blur-md">
            
            {/* TIER 1: PORTAL INTERAKTIF (LAYANAN UTAMA) */}
            <div className="bg-[#001733]/50 border-b border-white/5 py-3" id="nav-portal-services">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  {/* Label Container */}
                  <div className="md:w-52 shrink-0 flex items-center">
                    <span className="text-[10px] bg-amber-500/10 text-amber-300 font-mono px-3 py-1 rounded-lg border border-amber-500/20 uppercase font-black tracking-wider flex items-center gap-1.5 w-full">
                      <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                      Layanan Interaktif
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="hidden md:block h-6 w-[1px] bg-white/10 mx-1"></div>

                  {/* Buttons */}
                  <div className="flex-grow flex flex-wrap items-center gap-1.5">
                    {[
                      { name: 'Live TV', slug: 'video-hub', icon: Tv },
                      { name: 'Shorts', slug: 'short-video-hub', icon: Video },
                      { name: 'Podcast', slug: 'podcast-center', icon: Headphones },
                      { name: 'Data Interaktif', slug: 'interactive-data', icon: Database },
                      { name: 'Marketplace', slug: 'marketplace-hub', icon: CreditCard },
                      { name: 'Forum', slug: 'forum-hub', icon: MessageSquare },
                      { name: 'Agenda & Event', slug: 'event-center', icon: Calendar },
                      { name: 'Geo Map', slug: 'geo-intelligence-os', icon: Globe }
                    ].map((item) => {
                      const isActive = currentTab === item.slug;
                      return (
                        <button
                          key={item.slug}
                          onClick={() => onTabChange(item.slug)}
                          className={`px-3 py-1.5 rounded-lg transition-all duration-200 text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5 cursor-pointer ${
                            isActive
                              ? 'bg-[#FFD700] text-[#002B5B] border-[#FFD700] shadow-md font-extrabold'
                              : 'border-white/10 text-slate-300 bg-white/5 hover:bg-white/10 hover:text-white hover:border-white/20'
                          }`}
                        >
                          <item.icon className={`h-3 w-3 ${isActive ? 'text-[#002B5B]' : 'text-[#FFD700]'}`} />
                          <span>{item.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* ROW B: GRUP KATEGORI PLATFORM (EXPLORER UTAMA) */}
            <div className="bg-[#001733]/70 backdrop-blur-xs py-3 border-b border-white/5" id="nav-groups-bar">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  {/* Label Container */}
                  <div className="md:w-52 shrink-0 flex items-center">
                    <span className="text-[10px] bg-indigo-500/15 text-indigo-300 font-mono px-3 py-1 rounded-lg border border-indigo-500/20 uppercase font-black tracking-wider flex items-center gap-1.5 w-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                      Eksplorasi Platform
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="hidden md:block h-6 w-[1px] bg-white/10 mx-1"></div>

                  {/* Buttons */}
                  <div className="flex-grow flex flex-wrap items-center gap-1.5">
                    {navGroups.map((group) => {
                      const isAllowed = checkPortalAccess(group.portal);
                      if (!isAllowed) return null;

                      const isActive = activeNavGroup === group.id;

                      return (
                        <button
                          key={group.id}
                          onClick={() => setActiveNavGroup(activeNavGroup === group.id ? null : group.id)}
                          className={`px-3 py-1.5 rounded-lg transition-all duration-200 font-extrabold tracking-wide text-[10px] flex items-center gap-1.5 border cursor-pointer ${
                            isActive 
                              ? 'bg-indigo-600 text-white shadow-lg border-indigo-500' 
                              : 'border-white/10 text-slate-300 bg-white/5 hover:bg-white/10 hover:text-white hover:border-white/20'
                          }`}
                        >
                          {group.icon && <group.icon className={`h-3.5 w-3.5 ${isActive ? 'text-white' : 'text-indigo-400'}`} />}
                          <span>{group.name}</span>
                          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${isActive ? 'rotate-180 text-white' : 'text-slate-400'}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* ROW C: SUB-KATEGORI PLATFORM (DAFTAR TOMBOL) */}
            {activeNavGroup && (
              <div className="bg-[#000a18]/90 py-3" id="nav-sub-items-bar">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    {/* Label Container */}
                    <div className="md:w-52 shrink-0 flex items-center">
                      <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider font-black flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-lg border border-white/10 w-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                        Saluran Aktif
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block h-6 w-[1px] bg-white/10 mx-1"></div>

                    {/* Buttons */}
                    <div className="flex-grow flex flex-wrap items-center gap-1.5">
                      {groupItems[activeNavGroup]?.map((item) => {
                        const isAllowed = checkPortalAccess(item.portal);
                        if (!isAllowed) return null;

                        const isActive = currentTab === item.slug;

                        return (
                          <button
                            key={item.name}
                            onClick={() => {
                              if (item.type) {
                                onNavigateToSlug(item.slug, item.type);
                              } else {
                                onTabChange(item.slug);
                              }
                            }}
                            className={`px-3 py-1.5 rounded-lg transition-all duration-200 text-[10px] font-bold tracking-wide flex items-center gap-1.5 border cursor-pointer ${
                              isActive 
                                ? 'bg-[#FFD700] text-[#002B5B] shadow-lg font-extrabold border-[#FFD700]/40' 
                                : 'bg-white/5 text-slate-300 hover:bg-white/15 hover:text-white border-white/5 hover:border-white/10'
                            }`}
                          >
                            <span className="w-1 h-1 rounded-full bg-current opacity-70"></span>
                            <span>{item.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* COMPACT WORKSPACE BAR - ONLY VISIBLE TO LOGGED IN STAFF */}
        {showInternalNav && user && (
          <div className="bg-[#020617]/95 border-t border-white/10 backdrop-blur-md relative" id="nav-roles">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col lg:flex-row lg:items-center gap-3 overflow-hidden">
              
              {/* Left Badges: Staff & Role */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <span className="text-[10px] bg-amber-500/15 text-amber-400 font-mono px-2.5 py-1.5 rounded-lg border border-amber-500/25 uppercase font-extrabold tracking-wider flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
                  WORKSPACE STAFF
                </span>
                
                {/* Dynamic Role Badge */}
                <div className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold px-2.5 py-1.5 rounded-lg border border-emerald-500/20">
                  <Check className="h-3 w-3 text-emerald-400" />
                  <span>ROLE: {user.role.toUpperCase()}</span>
                </div>
              </div>

              {/* Vertical Separator */}
              <div className="hidden lg:block h-6 w-[1px] bg-white/10 shrink-0 mx-1"></div>

              {/* Right Scrollable Categories */}
              <div className="flex-grow flex items-center gap-1.5 w-full lg:w-auto overflow-hidden">
                {/* Left Scroll Button */}
                <button 
                  onClick={() => scrollWorkspace('left')}
                  className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-300 hover:text-amber-100 transition shrink-0 cursor-pointer flex items-center justify-center h-7 w-7"
                  title="Scroll Left"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="flex-grow relative overflow-hidden">
                  {/* Left & Right gradient shadow indicators for horizontal scroll */}
                  <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-[#020617] to-transparent pointer-events-none z-10" />
                  <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-[#020617] to-transparent pointer-events-none z-10" />

                  <div 
                    ref={workspaceScrollRef}
                    className="overflow-x-auto whitespace-nowrap scrollbar-none py-1 flex items-center gap-2 px-3 justify-start"
                  >
                    {roleCategories.filter(cat => {
                      if (cat.slug === 'revenue-os') {
                        return ['finance', 'accounting', 'super_admin', 'owner'].includes(currentRole);
                      }
                      if (cat.slug === 'system-explorer') {
                        return ['admin', 'developer', 'monitoring', 'super_admin', 'owner'].includes(currentRole);
                      }
                      if (cat.slug === 'widget-cms') {
                        return ['admin', 'redaktur', 'super_admin', 'owner'].includes(currentRole);
                      }
                      return true;
                    }).map((cat) => {
                      const isActive = currentTab === cat.slug;
                      return (
                        <button
                          key={cat.slug}
                          onClick={() => onTabChange(cat.slug)}
                          className={`px-3 py-1.5 rounded-lg transition-all duration-200 font-bold uppercase tracking-wider text-[10px] border shrink-0 cursor-pointer ${
                            isActive 
                              ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md border-amber-400 scale-102 hover:bg-amber-400' 
                              : 'text-amber-300 border-amber-500/10 bg-amber-500/5 hover:text-amber-100 hover:bg-amber-500/10 hover:border-amber-500/30'
                          }`}
                        >
                          {cat.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Scroll Button */}
                <button 
                  onClick={() => scrollWorkspace('right')}
                  className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-300 hover:text-amber-100 transition shrink-0 cursor-pointer flex items-center justify-center h-7 w-7"
                  title="Scroll Right"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

            </div>
          </div>
        )}

      </nav>

    </header>
  );
}
