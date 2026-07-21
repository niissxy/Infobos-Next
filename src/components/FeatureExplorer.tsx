import React, { useState, useEffect, useRef } from 'react';
import { 
  FEATURE_REGISTRY, FeatureItem 
} from '../data/featureRegistry';
import { 
  Compass, Cpu, Sparkles, CreditCard, Users, Map, Tv, Headphones, Shield, Activity, Globe, Database,
  Search, Star, BookOpen, Play, Eye, Clock, User, Check, AlertTriangle, ArrowUpRight, Info, Copy, Settings, RefreshCw, X, ChevronRight, MessageSquare, Send, HelpCircle, Lock, Unlock, Server,
  Folder, Layers, Grid, Table, Filter
} from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  Compass, Cpu, Sparkles, CreditCard, Users, Map, Tv, Headphones, Shield, Activity, Globe, Database
};

const COLOR_MAP: Record<string, { bg: string; text: string; border: string; accent: string; hoverBg: string }> = {
  indigo: { bg: 'bg-indigo-50/70 dark:bg-indigo-950/40', text: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-100 dark:border-indigo-900/30', accent: 'bg-indigo-600', hoverBg: 'hover:bg-indigo-100/50 dark:hover:bg-indigo-950/20' },
  teal: { bg: 'bg-teal-50/70 dark:bg-teal-950/40', text: 'text-teal-600 dark:text-teal-400', border: 'border-teal-100 dark:border-teal-900/30', accent: 'bg-teal-600', hoverBg: 'hover:bg-teal-100/50 dark:hover:bg-teal-950/20' },
  amber: { bg: 'bg-amber-50/70 dark:bg-amber-950/40', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-100 dark:border-amber-900/30', accent: 'bg-amber-500', hoverBg: 'hover:bg-amber-100/50 dark:hover:bg-amber-950/20' },
  emerald: { bg: 'bg-emerald-50/70 dark:bg-emerald-950/40', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-100 dark:border-emerald-900/30', accent: 'bg-emerald-600', hoverBg: 'hover:bg-emerald-100/50 dark:hover:bg-emerald-950/20' },
  rose: { bg: 'bg-rose-50/70 dark:bg-rose-950/40', text: 'text-rose-600 dark:text-rose-400', border: 'border-rose-100 dark:border-rose-900/30', accent: 'bg-rose-600', hoverBg: 'hover:bg-rose-100/50 dark:hover:bg-rose-950/20' },
  red: { bg: 'bg-red-50/70 dark:bg-red-950/40', text: 'text-red-600 dark:text-red-400', border: 'border-red-100 dark:border-red-900/30', accent: 'bg-red-600', hoverBg: 'hover:bg-red-100/50 dark:hover:bg-red-950/20' },
  purple: { bg: 'bg-purple-50/70 dark:bg-purple-950/40', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-100 dark:border-purple-900/30', accent: 'bg-purple-600', hoverBg: 'hover:bg-purple-100/50 dark:hover:bg-purple-950/20' },
  sky: { bg: 'bg-sky-50/70 dark:bg-sky-950/40', text: 'text-sky-600 dark:text-sky-400', border: 'border-sky-100 dark:border-sky-900/30', accent: 'bg-[#0ea5e9]', hoverBg: 'hover:bg-sky-100/50 dark:hover:bg-sky-950/20' }
};

interface BlueprintDomain {
  id: number;
  name: string;
  pages: number;
  submenus: number;
  features: number;
  widgets: number;
}

const BLUEPRINT_DOMAINS: BlueprintDomain[] = [
  { id: 1, name: "Landing & Public Portal", pages: 40, submenus: 120, features: 220, widgets: 35 },
  { id: 2, name: "News & Editorial CMS", pages: 95, submenus: 320, features: 520, widgets: 55 },
  { id: 3, name: "Regional / Nasional / Internasional", pages: 85, submenus: 420, features: 460, widgets: 40 },
  { id: 4, name: "Category & Topic Hub", pages: 60, submenus: 260, features: 340, widgets: 35 },
  { id: 5, name: "VIRALOG Content Hub", pages: 80, submenus: 300, features: 450, widgets: 60 },
  { id: 6, name: "AI Intelligence Center", pages: 55, submenus: 220, features: 380, widgets: 35 },
  { id: 7, name: "Business Intelligence", pages: 70, submenus: 280, features: 420, widgets: 40 },
  { id: 8, name: "Financial Intelligence", pages: 55, submenus: 210, features: 330, widgets: 35 },
  { id: 9, name: "Research Center", pages: 60, submenus: 220, features: 360, widgets: 30 },
  { id: 10, name: "Geo Intelligence (GeoOS)", pages: 80, submenus: 320, features: 500, widgets: 50 },
  { id: 11, name: "Knowledge Graph & Entity Explorer", pages: 45, submenus: 180, features: 260, widgets: 25 },
  { id: 12, name: "Community OS", pages: 65, submenus: 260, features: 420, widgets: 35 },
  { id: 13, name: "Forum", pages: 55, submenus: 200, features: 280, widgets: 25 },
  { id: 14, name: "Live Chat & Collaboration", pages: 45, submenus: 170, features: 260, widgets: 20 },
  { id: 15, name: "Marketplace OS", pages: 90, submenus: 380, features: 620, widgets: 55 },
  { id: 16, name: "Company Directory", pages: 65, submenus: 240, features: 350, widgets: 30 },
  { id: 17, name: "Government Directory", pages: 55, submenus: 180, features: 250, widgets: 20 },
  { id: 18, name: "Organization Directory", pages: 45, submenus: 160, features: 220, widgets: 20 },
  { id: 19, name: "People Directory", pages: 40, submenus: 150, features: 210, widgets: 15 },
  { id: 20, name: "Brand & Product Directory", pages: 50, submenus: 200, features: 280, widgets: 25 },
  { id: 21, name: "Event Platform", pages: 50, submenus: 180, features: 250, widgets: 20 },
  { id: 22, name: "Media Library", pages: 45, submenus: 170, features: 230, widgets: 20 },
  { id: 23, name: "Monitoring Center", pages: 70, submenus: 260, features: 420, widgets: 35 },
  { id: 24, name: "Dashboard Workspace", pages: 80, submenus: 340, features: 520, widgets: 80 },
  { id: 25, name: "Widget Marketplace", pages: 35, submenus: 120, features: 220, widgets: 300 },
  { id: 26, name: "Universal Feature Explorer", pages: 45, submenus: 180, features: 350, widgets: 20 },
  { id: 27, name: "Universal Search", pages: 25, submenus: 80, features: 150, widgets: 10 },
  { id: 28, name: "Notification Center", pages: 20, submenus: 60, features: 110, widgets: 10 },
  { id: 29, name: "Calendar & Productivity", pages: 30, submenus: 100, features: 170, widgets: 20 },
  { id: 30, name: "Utilities Center", pages: 45, submenus: 150, features: 240, widgets: 40 },
  { id: 31, name: "Advertising OS", pages: 65, submenus: 250, features: 420, widgets: 30 },
  { id: 32, name: "Revenue OS", pages: 60, submenus: 220, features: 380, widgets: 25 },
  { id: 33, name: "Subscription & Membership", pages: 35, submenus: 130, features: 210, widgets: 15 },
  { id: 34, name: "Payment & Billing", pages: 35, submenus: 140, features: 220, widgets: 15 },
  { id: 35, name: "API & Developer Portal", pages: 45, submenus: 180, features: 300, widgets: 15 },
  { id: 36, name: "Integration Hub", pages: 40, submenus: 160, features: 260, widgets: 20 },
  { id: 37, name: "Workflow & Automation", pages: 50, submenus: 210, features: 340, widgets: 20 },
  { id: 38, name: "Reports & Analytics", pages: 65, submenus: 260, features: 420, widgets: 45 },
  { id: 39, name: "User Management", pages: 45, submenus: 180, features: 280, widgets: 15 },
  { id: 40, name: "Roles & Permissions", pages: 35, submenus: 140, features: 220, widgets: 10 },
  { id: 41, name: "Audit & Security Center", pages: 35, submenus: 150, features: 240, widgets: 15 },
  { id: 42, name: "Settings Center", pages: 70, submenus: 320, features: 500, widgets: 20 },
  { id: 43, name: "Help Center", pages: 35, submenus: 120, features: 180, widgets: 10 },
  { id: 44, name: "Documentation Center", pages: 40, submenus: 180, features: 260, widgets: 15 },
  { id: 45, name: "Tutorial & Learning Center", pages: 55, submenus: 220, features: 320, widgets: 25 },
  { id: 46, name: "SEO Management", pages: 40, submenus: 170, features: 260, widgets: 15 },
  { id: 47, name: "File & Asset Manager", pages: 35, submenus: 150, features: 240, widgets: 15 },
  { id: 48, name: "Backup & Recovery", pages: 20, submenus: 80, features: 120, widgets: 5 },
  { id: 49, name: "System Monitoring", pages: 30, submenus: 120, features: 180, widgets: 10 },
  { id: 50, name: "Super Admin Console", pages: 55, submenus: 260, features: 420, widgets: 30 }
];

interface MasterDirectoryItem {
  name: string;
  desc: string;
}

const MASTER_DIRECTORIES: MasterDirectoryItem[] = [
  { name: "News Directory", desc: "Semua artikel, breaking news, investigasi, editorial" },
  { name: "Category Directory", desc: "Semua kategori & subkategori" },
  { name: "Topic Directory", desc: "Semua topik" },
  { name: "Tag Directory", desc: "Semua tag" },
  { name: "Entity Directory", desc: "Semua entitas yang saling terhubung" },
  { name: "Company Directory", desc: "Perusahaan" },
  { name: "Brand Directory", desc: "Merek" },
  { name: "Product Directory", desc: "Produk" },
  { name: "Government Directory", desc: "Instansi pemerintah" },
  { name: "Organization Directory", desc: "Organisasi" },
  { name: "People Directory", desc: "Tokoh" },
  { name: "Author Directory", desc: "Penulis" },
  { name: "Publisher Directory", desc: "Media" },
  { name: "Marketplace Directory", desc: "Produk, jasa, sewa" },
  { name: "Event Directory", desc: "Event" },
  { name: "Video Directory", desc: "Video" },
  { name: "Podcast Directory", desc: "Podcast" },
  { name: "Gallery Directory", desc: "Foto" },
  { name: "Document Directory", desc: "PDF, dokumen" },
  { name: "Research Directory", desc: "Riset" },
  { name: "Dataset Directory", desc: "Dataset" },
  { name: "API Directory", desc: "API" },
  { name: "Widget Directory", desc: "Widget" },
  { name: "Dashboard Directory", desc: "Dashboard" },
  { name: "Workspace Directory", desc: "Workspace" },
  { name: "Report Directory", desc: "Report" },
  { name: "Forum Directory", desc: "Forum" },
  { name: "Discussion Directory", desc: "Diskusi" },
  { name: "Community Directory", desc: "Komunitas" },
  { name: "Partner Directory", desc: "Mitra" },
  { name: "Advertiser Directory", desc: "Pengiklan" },
  { name: "Campaign Directory", desc: "Kampanye" },
  { name: "Notification Directory", desc: "Notifikasi" },
  { name: "Audit Directory", desc: "Audit Log" },
  { name: "Integration Directory", desc: "Integrasi" },
  { name: "Feature Directory", desc: "Seluruh fitur aplikasi" },
  { name: "Menu Directory", desc: "Semua menu" },
  { name: "Route Directory", desc: "Semua route" },
  { name: "Permission Directory", desc: "Hak akses" },
  { name: "Role Directory", desc: "Role pengguna" }
];

interface FeatureExplorerProps {
  onTabChange: (tab: string) => void;
  user: any;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  targetTab?: string;
  timestamp: string;
}

export default function FeatureExplorer({ onTabChange, user }: FeatureExplorerProps) {
  // Navigation & filter states
  const [explorerTab, setExplorerTab] = useState<'interactive' | 'blueprint' | 'directories'>('interactive');
  const [searchQuery, setSearchQuery] = useState('');
  const [blueprintSearch, setBlueprintSearch] = useState('');
  const [directorySearch, setDirectorySearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPortal, setSelectedPortal] = useState<string>('All');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('All');

  // Interactive local states (LocalStorage)
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentlyUsed, setRecentlyUsed] = useState<string[]>([]);

  // Expand modal states
  const [selectedFeature, setSelectedFeature] = useState<FeatureItem | null>(null);
  
  // Interactive Simulator within modal
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [videoStep, setVideoStep] = useState(0);
  const [simulatedProgress, setSimulatedProgress] = useState(0);

  // API Live test tool state
  const [apiResult, setApiResult] = useState<string>('');
  const [testingApi, setTestingApi] = useState(false);

  // Copy status tooltip
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Computations for Blueprint & Directories
  const filteredBlueprints = BLUEPRINT_DOMAINS.filter(d => 
    d.name.toLowerCase().includes(blueprintSearch.toLowerCase())
  );

  const totalPages = filteredBlueprints.reduce((sum, d) => sum + d.pages, 0);
  const totalSubmenus = filteredBlueprints.reduce((sum, d) => sum + d.submenus, 0);
  const totalFeatures = filteredBlueprints.reduce((sum, d) => sum + d.features, 0);
  const totalWidgets = filteredBlueprints.reduce((sum, d) => sum + d.widgets, 0);

  const filteredDirectories = MASTER_DIRECTORIES.filter(d => 
    d.name.toLowerCase().includes(directorySearch.toLowerCase()) ||
    d.desc.toLowerCase().includes(directorySearch.toLowerCase())
  );

  // Chat/AI Assistant states
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Halo! Saya Asisten AI INFOBOS. Tanyakan apa saja mengenai fungsi portal kami, alur kerja news CMS, atau katakan "buka portal workspace" untuk langsung melompat ke tab navigasi tersebut.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Sync favorites & recently used from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('infobos_fav_features');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    const savedRecent = localStorage.getItem('infobos_recent_features');
    if (savedRecent) {
      setRecentlyUsed(JSON.parse(savedRecent));
    }
  }, []);

  // Scroll chat bottom on new message
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isAiLoading]);

  // Handle video tutorial simulation
  useEffect(() => {
    let interval: any;
    if (isPlayingVideo) {
      interval = setInterval(() => {
        setSimulatedProgress((prev) => {
          if (prev >= 100) {
            setVideoStep((step) => {
              if (step >= 2) {
                setIsPlayingVideo(false);
                return 0;
              }
              return step + 1;
            });
            return 0;
          }
          return prev + 5;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isPlayingVideo]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated: string[];
    if (favorites.includes(id)) {
      updated = favorites.filter(favId => favId !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem('infobos_fav_features', JSON.stringify(updated));
  };

  const handleLaunchFeature = (feature: FeatureItem) => {
    // Add to recently used
    const updatedRecent = [feature.id, ...recentlyUsed.filter(id => id !== feature.id)].slice(0, 5);
    setRecentlyUsed(updatedRecent);
    localStorage.setItem('infobos_recent_features', JSON.stringify(updatedRecent));

    // Change Tab
    onTabChange(feature.route);
  };

  const copyToClipboard = (text: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || chatInput;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!customText) setChatInput('');
    setIsAiLoading(true);

    try {
      // Map previous chat logs for AI history context
      const chatHistory = chatMessages.slice(-4).map(msg => ({
        sender: msg.sender,
        text: msg.text
      }));

      const res = await fetch('/api/v1/feature-explorer/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend, history: chatHistory })
      });

      const data = await res.json();
      if (res.ok) {
        setChatMessages((prev) => [...prev, {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: data.reply,
          targetTab: data.targetTab || undefined,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      setChatMessages((prev) => [...prev, {
        id: `ai-err-${Date.now()}`,
        sender: 'assistant',
        text: 'Maaf, server mengalami gangguan koneksi. Silakan coba kembali.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const triggerLiveApiTest = async (route: string) => {
    setTestingApi(true);
    setApiResult('');
    try {
      const token = localStorage.getItem('infobos_token') || 'session-admin'; // Fallback to test session
      const cleanRoute = route.split(' ')[0]; // Handle parameterized routes
      const endpoint = cleanRoute.includes(':slug') 
        ? cleanRoute.replace(':slug', 'bandung') 
        : cleanRoute.includes(':id') 
          ? cleanRoute.replace(':id', 'art-cms-test') 
          : cleanRoute;

      const res = await fetch(endpoint, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      setApiResult(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setApiResult(JSON.stringify({ error: "Gagal terhubung ke API endpoint.", detail: err.message }, null, 2));
    } finally {
      setTestingApi(false);
    }
  };

  // Derive list of unique Categories, Portals, and Roles from registry
  const categoriesList = ['All', ...Array.from(new Set(FEATURE_REGISTRY.map(f => f.category)))];
  const portalsList = ['All', ...Array.from(new Set(FEATURE_REGISTRY.map(f => f.portal)))];
  const rolesList = [
    'All',
    'guest',
    'member',
    'reporter',
    'editor',
    'managing_editor',
    'super_admin',
    'developer',
    'government',
    'research',
    'monitoring',
    'finance'
  ];

  // Filtering features logic
  const filteredFeatures = FEATURE_REGISTRY.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.longDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.route.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesPortal = selectedPortal === 'All' || item.portal === selectedPortal;
    const matchesRole = selectedRoleFilter === 'All' || item.allowedRoles.includes(selectedRoleFilter);

    return matchesSearch && matchesCategory && matchesPortal && matchesRole;
  });

  const favoritesFeatures = FEATURE_REGISTRY.filter(item => favorites.includes(item.id));
  const recentFeatures = FEATURE_REGISTRY.filter(item => recentlyUsed.includes(item.id))
    .sort((a, b) => recentlyUsed.indexOf(a.id) - recentlyUsed.indexOf(b.id));

  // Step information for simulated video tutorial
  const SIMULATED_TUTORIAL_STEPS = [
    {
      title: "Langkah 1: Inisialisasi Workspace",
      desc: "Sistem memproses antrean data mentah dan memvalidasi akses hak editor Anda secara otomatis."
    },
    {
      title: "Langkah 2: Ekstraksi Entitas AI & Sentimen",
      desc: "Model Gemini-3.5 menyaring seluruh kata kunci penting, menetapkan label spasial (Bandung/Jabar), dan menghitung skor risiko Dewan Pers."
    },
    {
      title: "Langkah 3: Tanda Tangan & Publikasi",
      desc: "Redaktur Senior atau Managing Editor membubuhkan tanda tangan persetujuan dan artikel live secara real-time."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left space-y-8" id="feature-explorer-root">
      
      {/* 1. HERO DESCRIPTION BLOCK */}
      <div className="bg-[#002B5B] text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-white/10 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="bg-teal-500 text-white font-mono font-bold text-[9px] uppercase px-2 py-0.5 rounded-full border border-teal-400/30">
              Navigation Engine
            </span>
            <span className="text-white/40 text-[10px] font-mono">v1.0.0 Stable</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl tracking-tight text-white leading-tight">
            INFOBOS <span className="text-[#FFD700]">App Launcher</span>
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Selamat datang di Launchpad Universal. Peta navigasi komprehensif yang mengintegrasikan seluruh portal, dashboard riset jurnalisme investigasi, modul monetisasi, sandbox visualisasi widget, dan dokumentasi API INFOBOS dalam satu katalog interaktif.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center min-w-[90px]">
            <span className="block font-mono font-black text-xl text-[#FFD700]">{FEATURE_REGISTRY.length}</span>
            <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">Total Fitur</span>
          </div>
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center min-w-[90px]">
            <span className="block font-mono font-black text-xl text-emerald-400">
              {FEATURE_REGISTRY.filter(f => f.status === 'active').length}
            </span>
            <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">Aktif Live</span>
          </div>
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center min-w-[90px]">
            <span className="block font-mono font-black text-xl text-amber-400">
              {FEATURE_REGISTRY.filter(f => f.status === 'beta').length}
            </span>
            <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">State Beta</span>
          </div>
        </div>
      </div>

      {/* 2. DUAL LAYOUT: SEARCH & ASSISTANT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: FILTERS & CARD CATALOG */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* SEGMENTED TAB CONTROLLER */}
          <div className="flex bg-slate-100 dark:bg-[#001126] p-1 rounded-xl border border-slate-200 dark:border-white/10">
            <button
              onClick={() => setExplorerTab('interactive')}
              className={`flex-1 py-2.5 text-[10px] sm:text-xs font-black rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 ${
                explorerTab === 'interactive' 
                  ? 'bg-[#002B5B] dark:bg-sky-600 text-white shadow-sm' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-[#002B5B] dark:hover:text-white'
              }`}
            >
              <Grid className="h-3.5 w-3.5" />
              Interactive Apps
            </button>
            <button
              onClick={() => setExplorerTab('blueprint')}
              className={`flex-1 py-2.5 text-[10px] sm:text-xs font-black rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 ${
                explorerTab === 'blueprint' 
                  ? 'bg-[#002B5B] dark:bg-sky-600 text-white shadow-sm' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-[#002B5B] dark:hover:text-white'
              }`}
            >
              <Table className="h-3.5 w-3.5" />
              Blueprint Sitemap
            </button>
            <button
              onClick={() => setExplorerTab('directories')}
              className={`flex-1 py-2.5 text-[10px] sm:text-xs font-black rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 ${
                explorerTab === 'directories' 
                  ? 'bg-[#002B5B] dark:bg-sky-600 text-white shadow-sm' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-[#002B5B] dark:hover:text-white'
              }`}
            >
              <Folder className="h-3.5 w-3.5" />
              Directories (Databases)
            </button>
          </div>

          {explorerTab === 'interactive' && (
            <>
              {/* SEARCH & FILTER CONTROLS BAR */}
              <div className="bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-xl p-4 shadow-sm space-y-4">
                
                {/* Search Input */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Cari nama fitur, tag, keywords, API route, atau hak akses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#f8fafc] dark:bg-[#001126] border border-slate-200 dark:border-white/10 rounded-lg text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#002B5B] dark:focus:ring-sky-500 focus:border-[#002B5B] dark:focus:border-sky-500 transition placeholder-slate-400"
                  />
                  <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold"
                    >
                      &times;
                    </button>
                  )}
                </div>

                {/* Grid Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* Category selector */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5 font-mono">Kategori Fitur</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-2 py-1.5 bg-[#f8fafc] dark:bg-[#001126] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-lg text-xs font-bold focus:outline-none focus:ring-1 focus:ring-[#002B5B] dark:focus:ring-sky-500 transition"
                    >
                      {categoriesList.map(cat => (
                        <option key={cat} value={cat} className="dark:bg-[#001c3d] dark:text-white">{cat === 'All' ? 'Semua Kategori' : cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Portal selector */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5 font-mono">Penempatan Portal</label>
                    <select
                      value={selectedPortal}
                      onChange={(e) => setSelectedPortal(e.target.value)}
                      className="w-full px-2 py-1.5 bg-[#f8fafc] dark:bg-[#001126] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-lg text-xs font-bold focus:outline-none focus:ring-1 focus:ring-[#002B5B] dark:focus:ring-sky-500 transition"
                    >
                      {portalsList.map(p => (
                        <option key={p} value={p} className="dark:bg-[#001c3d] dark:text-white">{p === 'All' ? 'Semua Portal' : p}</option>
                      ))}
                    </select>
                  </div>

                  {/* Role Permissions (RBAC) filter */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5 font-mono">Hak Akses Role (RBAC)</label>
                    <select
                      value={selectedRoleFilter}
                      onChange={(e) => setSelectedRoleFilter(e.target.value)}
                      className="w-full px-2 py-1.5 bg-[#f8fafc] dark:bg-[#001126] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-lg text-xs font-bold focus:outline-none focus:ring-1 focus:ring-[#002B5B] dark:focus:ring-sky-500 transition font-mono"
                    >
                      {rolesList.map(role => (
                        <option key={role} value={role} className="dark:bg-[#001c3d] dark:text-white">{role === 'All' ? 'Semua Hak Akses' : role.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>

                </div>

              </div>

              {/* HISTORICAL RECENTLY USED SECTION */}
              {recentFeatures.length > 0 && !searchQuery && (
                <div className="space-y-3">
                  <h3 className="font-display font-black text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-slate-400" />
                    Terakhir Diakses
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {recentFeatures.map((feat) => {
                      const IconComponent = ICON_MAP[feat.icon] || Compass;
                      const colorConfig = COLOR_MAP[feat.color] || COLOR_MAP.indigo;
                      return (
                        <div
                          key={`recent-${feat.id}`}
                          onClick={() => setSelectedFeature(feat)}
                          className="p-3.5 bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 rounded-xl flex items-center gap-3 cursor-pointer shadow-sm hover:shadow transition"
                        >
                          <div className={`p-2 rounded-lg ${colorConfig.bg} ${colorConfig.text}`}>
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="block text-xs font-black text-[#002B5B] dark:text-slate-100 leading-tight truncate">{feat.name}</span>
                            <span className="block text-[10px] text-slate-400 dark:text-slate-400 truncate">{feat.category} &bull; {feat.portal}</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLaunchFeature(feat);
                            }}
                            className="p-1 bg-[#002B5B]/5 dark:bg-white/10 hover:bg-[#002B5B]/10 dark:hover:bg-white/20 text-[#002B5B] dark:text-slate-200 rounded-lg text-xs font-extrabold flex items-center gap-1 transition"
                          >
                            Buka
                            <ArrowUpRight className="h-3 w-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* FAVORITES / BOOKMARKS BOARD */}
              {favoritesFeatures.length > 0 && !searchQuery && (
                <div className="space-y-3">
                  <h3 className="font-display font-black text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    Fitur Favorit Anda
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {favoritesFeatures.map((feat) => {
                      const IconComponent = ICON_MAP[feat.icon] || Compass;
                      const colorConfig = COLOR_MAP[feat.color] || COLOR_MAP.indigo;
                      return (
                        <div
                          key={`fav-${feat.id}`}
                          onClick={() => setSelectedFeature(feat)}
                          className="p-3 bg-white dark:bg-[#001c3d] border border-amber-200/60 dark:border-amber-500/20 rounded-xl flex items-center justify-between gap-2 cursor-pointer shadow-sm hover:shadow transition relative overflow-hidden"
                        >
                          <div className="absolute right-0 top-0 w-8 h-8 bg-amber-500/5 rounded-bl-full pointer-events-none"></div>
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className={`p-1.5 rounded-lg shrink-0 ${colorConfig.bg} ${colorConfig.text}`}>
                              <IconComponent className="h-4 w-4" />
                            </div>
                            <div className="min-w-0">
                              <span className="block text-xs font-black text-[#002B5B] dark:text-slate-100 truncate leading-tight">{feat.name}</span>
                              <span className="block text-[9px] text-slate-400 dark:text-slate-400 truncate font-mono">{feat.route.toUpperCase()}</span>
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLaunchFeature(feat);
                            }}
                            className="p-1 text-slate-400 hover:text-indigo-600 transition"
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* MAIN INTERACTIVE CARD CATALOG GRID */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-display font-black text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4 text-slate-400" />
                    Interactive Catalog ({filteredFeatures.length} Fitur)
                  </h3>
                  {searchQuery && (
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full font-bold">
                      Hasil Filter Pencarian
                    </span>
                  )}
                </div>

                {filteredFeatures.length === 0 ? (
                  <div className="p-12 text-center bg-white dark:bg-[#001c3d] border border-dashed border-slate-200 dark:border-white/10 rounded-xl space-y-2">
                    <AlertTriangle className="h-8 w-8 text-amber-500 mx-auto animate-bounce" />
                    <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">Fitur Tidak Ditemukan</h4>
                    <p className="text-xs text-slate-400 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                      Tidak ada kecocokan fitur untuk &quot;{searchQuery}&quot; dalam matrix portal kami. Coba periksa kesalahan ketik atau gunakan filter drop-down kategori.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredFeatures.map((feat) => {
                      const IconComponent = ICON_MAP[feat.icon] || Compass;
                      const colorConfig = COLOR_MAP[feat.color] || COLOR_MAP.indigo;
                      const isFav = favorites.includes(feat.id);

                      return (
                        <div
                          key={feat.id}
                          onClick={() => setSelectedFeature(feat)}
                          className={`group p-5 bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 rounded-2xl flex flex-col justify-between cursor-pointer hover:shadow-lg transition-all duration-300 relative text-left ${colorConfig.hoverBg}`}
                        >
                          {/* Favorite star tag */}
                          <button
                            onClick={(e) => toggleFavorite(feat.id, e)}
                            className="absolute right-4 top-4 p-1 rounded-full text-slate-300 hover:text-amber-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors z-10"
                            title={isFav ? "Hapus dari Favorit" : "Simpan ke Favorit"}
                          >
                            <Star className={`h-4.5 w-4.5 ${isFav ? 'text-amber-400 fill-amber-400' : ''}`} />
                          </button>

                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <div className={`p-2.5 rounded-xl transition group-hover:scale-110 duration-300 ${colorConfig.bg} ${colorConfig.text}`}>
                                <IconComponent className="h-5 w-5" />
                              </div>
                              <div>
                                <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-400 uppercase">{feat.category}</span>
                                <h4 className="font-display font-black text-sm text-[#002B5B] dark:text-slate-100 leading-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition">
                                  {feat.name}
                                </h4>
                              </div>
                            </div>

                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                              {feat.shortDesc}
                            </p>

                            <div className="flex flex-wrap gap-1 pt-1.5">
                              {feat.tags.slice(0, 3).map(tag => (
                                <span key={tag} className="text-[9px] font-semibold bg-slate-100 dark:bg-[#001126] text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-md font-mono">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Card Footer: Metadata & Trigger */}
                          <div className="flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-3.5 mt-4 text-[10px] font-bold text-slate-400 dark:text-slate-400 font-mono">
                            <span className="bg-slate-100 dark:bg-[#001126] text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded">
                              {feat.portal}
                            </span>
                            
                            <div className="flex items-center gap-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition">
                              <span>Detail</span>
                              <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition duration-300" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 3. QUICK ACTIONS SHORTCUT PANEL */}
              <div className="bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-xl p-5 shadow-sm space-y-4">
                <h3 className="font-display font-black text-xs text-[#002B5B] dark:text-slate-200 uppercase tracking-widest flex items-center gap-2">
                  <Settings className="h-4 w-4 text-[#002B5B] dark:text-teal-400" />
                  Sistem Quick Actions (Shorthand Commands)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    onClick={() => onTabChange('admin')}
                    className="p-3 bg-slate-50 hover:bg-rose-50 dark:bg-[#001126] dark:hover:bg-rose-950/20 border border-slate-200 hover:border-rose-200 dark:border-white/10 dark:hover:border-rose-900/50 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center gap-2"
                  >
                    <Shield className="h-5 w-5" />
                    Buka CMS Redaksi
                  </button>
                  <button
                    onClick={() => onTabChange('mediaos')}
                    className="p-3 bg-slate-50 hover:bg-emerald-50 dark:bg-[#001126] dark:hover:bg-emerald-950/20 border border-slate-200 hover:border-emerald-200 dark:border-white/10 dark:hover:border-emerald-900/50 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center gap-2"
                  >
                    <Activity className="h-5 w-5" />
                    Telemetry Monitor
                  </button>
                  <button
                    onClick={() => onTabChange('widget-cms')}
                    className="p-3 bg-slate-50 hover:bg-teal-50 dark:bg-[#001126] dark:hover:bg-teal-950/20 border border-slate-200 hover:border-teal-200 dark:border-white/10 dark:hover:border-teal-900/50 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center gap-2"
                  >
                    <Cpu className="h-5 w-5" />
                    Widget Sandbox
                  </button>
                  <button
                    onClick={() => onTabChange('intelligence-workspace')}
                    className="p-3 bg-slate-50 hover:bg-amber-50 dark:bg-[#001126] dark:hover:bg-amber-950/20 border border-slate-200 hover:border-amber-200 dark:border-white/10 dark:hover:border-amber-900/50 text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center gap-2"
                  >
                    <Sparkles className="h-5 w-5" />
                    AI Workspace
                  </button>
                </div>
              </div>
            </>
          )}

          {explorerTab === 'blueprint' && (
            <div className="bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-xl p-5 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-display font-black text-sm text-[#002B5B] dark:text-slate-200 tracking-tight">
                    Master Enterprise Sitemap & Scale Matrix
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-normal">
                    Katalog lengkap yang memetakan seluruh modul, halaman, submenu, fitur, dan widget fungsional pada platform INFOBOS.
                  </p>
                </div>
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Cari domain sitemap..."
                    value={blueprintSearch}
                    onChange={(e) => setBlueprintSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-[#f8fafc] dark:bg-[#001126] border border-slate-200 dark:border-white/10 rounded-lg text-[10px] font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#002B5B] dark:focus:ring-sky-500 transition placeholder-slate-400"
                  />
                  <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                </div>
              </div>

              {/* Matrix totals cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-[#001126] p-3 rounded-xl border border-slate-100 dark:border-white/5">
                <div className="text-center p-2 bg-white dark:bg-[#001c3d] rounded-lg border border-slate-200 dark:border-white/10">
                  <span className="block font-mono font-black text-slate-700 dark:text-slate-200 text-sm">{filteredBlueprints.length}</span>
                  <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">Modul / Domain</span>
                </div>
                <div className="text-center p-2 bg-white dark:bg-[#001c3d] rounded-lg border border-slate-200 dark:border-white/10">
                  <span className="block font-mono font-black text-[#002B5B] dark:text-[#38bdf8] text-sm">{totalPages}</span>
                  <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">Halaman</span>
                </div>
                <div className="text-center p-2 bg-white dark:bg-[#001c3d] rounded-lg border border-slate-200 dark:border-white/10">
                  <span className="block font-mono font-black text-indigo-600 dark:text-indigo-400 text-sm">{totalSubmenus}</span>
                  <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">Submenu</span>
                </div>
                <div className="text-center p-2 bg-white dark:bg-[#001c3d] rounded-lg border border-slate-200 dark:border-white/10">
                  <span className="block font-mono font-black text-teal-600 dark:text-teal-400 text-sm">{totalFeatures}</span>
                  <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">Fitur / Widget</span>
                </div>
              </div>

              <div className="overflow-x-auto border border-slate-200 dark:border-white/10 rounded-xl">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-white/10 text-left text-xs">
                  <thead className="bg-[#002B5B] dark:bg-[#001c3d] text-white">
                    <tr>
                      <th className="px-4 py-2 text-[10px] font-bold font-mono tracking-wider uppercase text-center w-12">No</th>
                      <th className="px-4 py-2 text-[10px] font-bold font-mono tracking-wider uppercase">Modul / Domain</th>
                      <th className="px-4 py-2 text-[10px] font-bold font-mono tracking-wider uppercase text-center">Halaman</th>
                      <th className="px-4 py-2 text-[10px] font-bold font-mono tracking-wider uppercase text-center">Submenu</th>
                      <th className="px-4 py-2 text-[10px] font-bold font-mono tracking-wider uppercase text-center">Fitur</th>
                      <th className="px-4 py-2 text-[10px] font-bold font-mono tracking-wider uppercase text-center">Widget</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-[#001c3d] divide-y divide-slate-200 dark:divide-white/10">
                    {filteredBlueprints.map((domain, idx) => (
                      <tr key={domain.id} className={idx % 2 === 0 ? 'bg-white dark:bg-[#001c3d]' : 'bg-slate-50/50 dark:bg-[#001f42]/40'}>
                        <td className="px-4 py-2 text-center font-mono font-bold text-slate-400 dark:text-slate-500 text-[10px]">{domain.id}</td>
                        <td className="px-4 py-2 font-bold text-[#002B5B] dark:text-slate-200 text-[11px]">{domain.name}</td>
                        <td className="px-4 py-2 text-center font-mono text-slate-600 dark:text-slate-300 font-semibold">{domain.pages}</td>
                        <td className="px-4 py-2 text-center font-mono text-slate-600 dark:text-slate-300 font-semibold">{domain.submenus}</td>
                        <td className="px-4 py-2 text-center font-mono text-slate-600 dark:text-slate-300 font-semibold">{domain.features}</td>
                        <td className="px-4 py-2 text-center font-mono text-slate-600 dark:text-slate-300 font-semibold">{domain.widgets}</td>
                      </tr>
                    ))}
                    {filteredBlueprints.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-slate-400 dark:text-slate-500 text-[11px] font-medium">
                          Tidak ada domain sitemap yang cocok dengan kata kunci Anda.
                        </td>
                      </tr>
                    )}
                    {filteredBlueprints.length > 0 && (
                      <tr className="bg-slate-100 dark:bg-[#001126] font-black border-t border-slate-300 dark:border-white/10 text-slate-800 dark:text-slate-200">
                        <td className="px-4 py-3 text-center text-[10px] font-mono">SUM</td>
                        <td className="px-4 py-3 text-[11px] tracking-tight">Total Matrix Diatas</td>
                        <td className="px-4 py-3 text-center font-mono text-[11px]">{totalPages}</td>
                        <td className="px-4 py-3 text-center font-mono text-[11px]">{totalSubmenus}</td>
                        <td className="px-4 py-3 text-center font-mono text-[11px]">{totalFeatures}</td>
                        <td className="px-4 py-3 text-center font-mono text-[11px]">{totalWidgets}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {explorerTab === 'directories' && (
            <div className="bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-xl p-5 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-display font-black text-sm text-[#002B5B] dark:text-slate-200 tracking-tight">
                    Master Enterprise Data Directories
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-normal">
                    Kombinasi 40 direktori terdistribusi yang membentuk relasi database dan schema master sistem INFOBOS.
                  </p>
                </div>
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Cari direktori database..."
                    value={directorySearch}
                    onChange={(e) => setDirectorySearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-[#f8fafc] dark:bg-[#001126] border border-slate-200 dark:border-white/10 rounded-lg text-[10px] font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#002B5B] dark:focus:ring-sky-500 transition placeholder-slate-400"
                  />
                  <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                </div>
              </div>

              {/* Directories grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {filteredDirectories.map((dir, idx) => (
                  <div key={dir.name} className="p-3 bg-slate-50 dark:bg-[#001126] hover:bg-[#002B5B]/5 dark:hover:bg-[#002B5B]/20 border border-slate-200 dark:border-white/10 hover:border-[#002B5B]/20 dark:hover:border-[#002B5B]/30 rounded-xl transition-all duration-200 text-left flex items-start gap-2.5">
                    <div className="p-2 bg-white dark:bg-[#001c3d] text-[#002B5B] dark:text-[#38bdf8] rounded-lg border border-slate-200 dark:border-white/10 shrink-0 font-mono text-[10px] font-black">
                      {(idx + 1).toString().padStart(2, '0')}
                    </div>
                    <div>
                      <h4 className="font-display font-black text-xs text-[#002B5B] dark:text-slate-200 leading-none">
                        {dir.name}
                      </h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-1">
                        {dir.desc}
                      </p>
                    </div>
                  </div>
                ))}
                {filteredDirectories.length === 0 && (
                  <div className="col-span-2 p-12 text-center bg-white dark:bg-[#001c3d] border border-dashed border-slate-200 dark:border-white/10 rounded-xl space-y-2">
                    <AlertTriangle className="h-8 w-8 text-amber-500 mx-auto animate-bounce" />
                    <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200">Direktori Tidak Ditemukan</h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                      Tidak ada direktori dengan kata kunci &quot;{directorySearch}&quot; pada master metadata.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: AI EXPLORER CO-PILOT CHAT ASSISTANT */}
        <div className="lg:col-span-4 bg-[#001f42] border border-white/10 rounded-2xl shadow-xl p-5 text-white flex flex-col h-[650px] justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/5 rounded-full blur-2xl pointer-events-none"></div>
          
          {/* Assistant Header */}
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></div>
              <h3 className="font-display font-black text-sm text-white tracking-wide">
                AI Platform Assistant
              </h3>
            </div>
            <span className="text-[8px] bg-white/10 border border-white/10 text-[#FFD700] px-2 py-0.5 rounded font-mono font-bold uppercase">
              Gemini Cerdas
            </span>
          </div>

          {/* Preset Prompts List */}
          <div className="text-[10px] border-b border-white/5 py-2 space-y-1.5">
            <span className="text-slate-400 block font-bold uppercase font-mono">Saran Pertanyaan Redaksi:</span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: "Bagaimana alur kerja CMS?", q: "Bagaimana alur kerja News CMS?" },
                { label: "Tunjukkan peta spasial", q: "Tunjukkan peta anomali geospasial Jawa Barat" },
                { label: "Alat analisis sentimen", q: "Bagaimana cara melakukan analisis sentimen?" },
                { label: "Kelola iklan platform", q: "Tunjukkan fitur untuk iklan dan RevenueOS" }
              ].map(preset => (
                <button
                  key={preset.label}
                  onClick={() => {
                    setChatInput(preset.q);
                    handleSendMessage(preset.q);
                  }}
                  className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-[#FFD700] border border-white/10 rounded-full px-2.5 py-1 text-left transition font-semibold"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1 divide-y divide-white/5 scrollbar-thin">
            {chatMessages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex flex-col text-left space-y-1 pt-3 first:pt-0 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-slate-400 font-mono font-bold uppercase">
                    {msg.sender === 'user' ? 'Anda' : 'Asisten AI'}
                  </span>
                  <span className="text-[8px] text-slate-500 font-mono">{msg.timestamp}</span>
                </div>
                
                <div className={`text-xs px-3 py-2 rounded-xl max-w-[90%] leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-teal-600 text-white font-medium rounded-tr-none' 
                    : 'bg-white/5 text-slate-200 rounded-tl-none border border-white/5'
                }`}>
                  {msg.text}
                  
                  {/* Jump Action Trigger Button in Chat */}
                  {msg.targetTab && (
                    <div className="mt-3 pt-2.5 border-t border-white/10 text-center">
                      <button
                        onClick={() => onTabChange(msg.targetTab!)}
                        className="w-full py-1.5 bg-[#FFD700] hover:bg-[#ffe240] text-[#002B5B] text-[10px] font-extrabold rounded-lg transition-transform hover:scale-103 duration-300 flex items-center justify-center gap-1.5"
                      >
                        🚀 Lompat ke Tab ini Sekarang!
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isAiLoading && (
              <div className="flex flex-col items-start space-y-1 pt-3">
                <span className="text-[9px] text-slate-400 font-mono font-bold uppercase animate-pulse">Asisten AI sedang berpikir...</span>
                <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#FFD700] rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-[#FFD700] rounded-full animate-bounce delay-200"></div>
                  <div className="w-1.5 h-1.5 bg-[#FFD700] rounded-full animate-bounce delay-300"></div>
                </div>
              </div>
            )}
            
            <div ref={chatBottomRef}></div>
          </div>

          {/* Chat Input form */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2 border-t border-white/10 pt-3"
          >
            <input
              type="text"
              placeholder="Ketik pertanyaan atau perintah..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs placeholder-slate-400 text-white focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition font-medium"
            />
            <button
              type="submit"
              disabled={isAiLoading || !chatInput.trim()}
              className="p-1.5 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-lg transition disabled:bg-slate-800 disabled:text-slate-500 shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

        </div>

      </div>

      {/* 4. EXPANDED DETAILED PORTAL MODAL */}
      {selectedFeature && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto text-left shadow-2xl relative flex flex-col">
            
            {/* Header Area */}
            <div className="p-6 border-b border-slate-200 dark:border-white/10 flex justify-between items-start sticky top-0 bg-white dark:bg-[#001c3d] z-20">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${COLOR_MAP[selectedFeature.color]?.bg} ${COLOR_MAP[selectedFeature.color]?.text}`}>
                  {React.createElement(ICON_MAP[selectedFeature.icon] || Compass, { className: 'h-6 w-6' })}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded">
                      {selectedFeature.category}
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-[#002B5B]/10 dark:bg-[#002B5B]/30 text-[#002B5B] dark:text-[#38bdf8] px-2 py-0.5 rounded">
                      {selectedFeature.portal}
                    </span>
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                      selectedFeature.status === 'active' ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400' : 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400'
                    }`}>
                      {selectedFeature.status.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-display font-black text-xl text-[#002B5B] dark:text-slate-100 mt-1.5 leading-tight">
                    {selectedFeature.name}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedFeature(null);
                  setIsPlayingVideo(false);
                  setVideoStep(0);
                  setSimulatedProgress(0);
                  setApiResult('');
                }}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Stage */}
            <div className="p-6 space-y-8 flex-1">
              
              {/* Feature Bio */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider font-mono">Deskripsi Lengkap Fitur</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {selectedFeature.longDesc}
                </p>
              </div>

              {/* Grid: Simulator & Docs */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* Left: Step-by-Step Interactive Video Simulator */}
                <div className="md:col-span-7 bg-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-inner space-y-4 text-left relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
                    <span className="text-[10px] text-teal-400 font-mono font-bold uppercase flex items-center gap-1.5">
                      <Play className="h-3.5 w-3.5 fill-teal-400" />
                      Walkthrough & Video Simulator
                    </span>
                    <span className="text-[9px] font-mono text-slate-500">Auto Walkthrough</span>
                  </div>

                  {isPlayingVideo ? (
                    <div className="space-y-4 py-3">
                      {/* Active step explanation */}
                      <div className="space-y-1.5 animate-fade-in">
                        <span className="text-[10px] font-bold text-[#FFD700] font-mono">
                          {SIMULATED_TUTORIAL_STEPS[videoStep].title}
                        </span>
                        <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                          {SIMULATED_TUTORIAL_STEPS[videoStep].desc}
                        </p>
                      </div>

                      {/* Animated Progress Bar */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[8px] font-mono font-bold text-slate-500">
                          <span>SINKRONISASI SEED ENGINE</span>
                          <span>{simulatedProgress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-teal-500 rounded-full transition-all duration-150"
                            style={{ width: `${simulatedProgress}%` }}
                          ></div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setIsPlayingVideo(false);
                          setSimulatedProgress(0);
                        }}
                        className="text-[10px] font-bold text-rose-400 hover:underline"
                      >
                        Hentikan Simulasi Walkthrough
                      </button>
                    </div>
                  ) : (
                    <div className="py-8 text-center space-y-4">
                      <div className="w-14 h-14 bg-teal-500/10 hover:bg-teal-500/25 border border-teal-500/20 text-teal-400 rounded-full flex items-center justify-center cursor-pointer mx-auto transition-all transform hover:scale-110 duration-300" onClick={() => setIsPlayingVideo(true)}>
                        <Play className="h-6 w-6 fill-teal-400 ml-1" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-200">Uji Alur Kerja dengan Walkthrough</h5>
                        <p className="text-[10px] text-slate-400 max-w-sm mx-auto leading-relaxed mt-1">
                          Klik untuk memulai simulasi walkthrough interaktif yang akan memandu Anda melalui detail fungsional jurnalisme portal ini.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right: Technical Integration & API Test */}
                <div className="md:col-span-5 space-y-4 text-left">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider font-mono">Informasi Teknis (Developer)</h4>
                  
                  <div className="space-y-3 bg-slate-50 dark:bg-[#001126] border border-slate-200 dark:border-white/10 rounded-xl p-4 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-mono">ID FITUR:</span>
                      <span className="font-mono font-bold text-slate-700 dark:text-slate-200">{selectedFeature.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-mono">ROUTE VALUE:</span>
                      <span className="font-mono font-bold text-teal-600 bg-teal-50 dark:bg-teal-950/40 px-1 rounded">{selectedFeature.route}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-mono">TIM OWNER:</span>
                      <span className="font-bold text-slate-700 dark:text-slate-200">{selectedFeature.ownerTeam}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-mono">VERSI & UPDATE:</span>
                      <span className="font-mono text-slate-700 dark:text-slate-300 font-semibold">{selectedFeature.version} ({selectedFeature.lastUpdated})</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="block text-[10px] font-bold uppercase text-slate-400 font-mono">Hak Akses Role (RBAC)</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedFeature.allowedRoles.map(role => (
                        <span key={role} className="text-[9px] font-bold font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Related APIs & Live Query Test Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1">
                    <Server className="h-4 w-4" />
                    API Endpoints Terkait & Live Explorer
                  </h4>
                  <span className="text-[9px] text-slate-400 font-mono font-bold">Authenticated with JWT Bearer Token</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    {selectedFeature.relatedApis.map(api => (
                      <div key={api} className="bg-slate-50 dark:bg-[#001126] border border-slate-200 dark:border-white/10 rounded-xl p-3 flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <span className="block text-[9px] font-mono font-bold text-emerald-600 uppercase">GET ENDPOINT</span>
                          <span className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-200 truncate">{api}</span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={(e) => copyToClipboard(api, api, e)}
                            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
                            title="Salin Endpoint"
                          >
                            <Copy className="h-4.5 w-4.5" />
                          </button>
                          <button
                            onClick={() => triggerLiveApiTest(api)}
                            disabled={testingApi}
                            className="px-2 py-1 bg-[#002B5B] dark:bg-sky-600 hover:bg-slate-900 text-white text-[9px] font-bold rounded-md font-mono transition"
                          >
                            Test Query
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* API response output */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-white font-mono text-[10px] text-left min-h-[100px] max-h-[200px] overflow-y-auto shadow-inner relative">
                    <span className="absolute right-3 top-3 text-[8px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 font-bold">
                      JSON RESPONSE
                    </span>
                    {testingApi ? (
                      <div className="flex items-center gap-2 text-slate-400 py-4">
                        <RefreshCw className="h-3 w-3 animate-spin text-[#FFD700]" />
                        <span>Mengeksekusi request relasional ke server...</span>
                      </div>
                    ) : apiResult ? (
                      <pre className="text-emerald-400 font-medium whitespace-pre-wrap">{apiResult}</pre>
                    ) : (
                      <p className="text-slate-500 py-4 font-semibold">Klik &quot;Test Query&quot; pada salah satu endpoint di sebelah kiri untuk melihat response JSON langsung dari database.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Feature Documentation and FAQ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-100 dark:border-white/5">
                
                {/* Documentation Section */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    Panduan & Best Practices
                  </h4>
                  <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    <p className="font-semibold">{selectedFeature.documentation.overview}</p>
                    <div className="space-y-1.5 bg-slate-50 dark:bg-[#001126] p-3 rounded-xl border border-slate-200 dark:border-white/10">
                      <span className="font-bold text-[10px] text-slate-500 uppercase font-mono">Best Practices:</span>
                      <ul className="list-disc list-inside space-y-1 pl-1 font-medium text-slate-700 dark:text-slate-300">
                        {selectedFeature.documentation.bestPractices.map((bp, idx) => (
                          <li key={idx}>{bp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1">
                    <HelpCircle className="h-4 w-4" />
                    Pertanyaan Umum (FAQ)
                  </h4>
                  <div className="space-y-3">
                    {selectedFeature.faq.map((item, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 dark:bg-[#001126] border border-slate-200 dark:border-white/10 rounded-xl space-y-1 text-xs text-left">
                        <span className="block font-black text-[#002B5B] dark:text-[#38bdf8]">Q: {item.q}</span>
                        <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">A: {item.a}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Footer Area with Action button */}
            <div className="p-6 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#001126] flex items-center justify-between sticky bottom-0 z-20">
              <span className="text-[10px] font-mono text-slate-400 font-bold">
                Platform Registry ID: {selectedFeature.id}
              </span>
              
              <button
                onClick={() => {
                  handleLaunchFeature(selectedFeature);
                  setSelectedFeature(null);
                }}
                className="px-5 py-2.5 bg-[#002B5B] dark:bg-sky-600 hover:bg-slate-900 text-white text-xs font-extrabold rounded-xl shadow-md transition flex items-center gap-1.5"
              >
                🚀 Luncurkan Portal Fitur
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
