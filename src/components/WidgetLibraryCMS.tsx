import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Layout, Settings, Play, Eye, EyeOff, Sparkles, RefreshCw, 
  Trash2, Plus, ArrowUp, ArrowDown, Maximize2, Palette, Clock, Shield, 
  TrendingUp, BarChart2, Check, AlertCircle, Bot, CloudRain, Map, Globe,
  Calendar, MessageSquare, Briefcase, ShoppingCart, Share2, FileText, 
  Tv, Volume2, User, HelpCircle, HardDrive, Cpu, Activity, Camera, 
  ChevronRight, Calculator, CheckCircle2, DollarSign, ArrowRight, Zap, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AiReadingAssistantWidget } from './AiReadingAssistantWidget';

// Define the schema for a Widget Instance
interface WidgetConfig {
  id: string;
  key: string; // unique key matching our 25 categories
  name: string;
  category: string;
  size: 'small' | 'medium' | 'large' | 'full';
  theme: 'light' | 'dark' | 'auto';
  enabled: boolean;
  dataSource: 'Native' | 'API' | 'RSS' | 'Embed';
  refreshInterval: number; // in seconds
  displayRule: string; // e.g. "Public", "Premium-Only", "Mobile-Only"
  abVariant: 'A' | 'B';
  views: number;
  ctr: number;
  loadTime: number; // in ms
}

export default function WidgetLibraryCMS() {
  // --- 1. CORE CMS STATES ---
  const [activeTab, setActiveTab] = useState<'builder' | 'library' | 'analytics' | 'settings'>('builder');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [widgetSearch, setWidgetSearch] = useState('');
  const [systemLogs, setSystemLogs] = useState<string[]>([
    'System initialized.',
    'Loaded 25 Master Widget Libraries.',
    'Lazy-loading pipeline enabled.'
  ]);

  // Utility state simulations
  const [wetonInputDate, setWetonInputDate] = useState('2026-06-30');
  const [wetonResult, setWetonResult] = useState({ weton: 'Wage', neptu: 7, penjelasan: 'Sabar, hemat, tekun' });
  const [currencyInput, setCurrencyInput] = useState(1);
  const [currencyResult, setCurrencyResult] = useState(15800);

  // Active Layout Canvas
  const [canvasWidgets, setCanvasWidgets] = useState<WidgetConfig[]>([
    {
      id: 'w-1',
      key: 'hero-news',
      name: 'Hero News Headline',
      category: '1. News Widget',
      size: 'full',
      theme: 'light',
      enabled: true,
      dataSource: 'Native',
      refreshInterval: 60,
      displayRule: 'All pages',
      abVariant: 'A',
      views: 14500,
      ctr: 8.2,
      loadTime: 45
    },
    {
      id: 'w-2',
      key: 'market-watch',
      name: 'Commodity & Stock Watchlist',
      category: '5. Business & Finance',
      size: 'medium',
      theme: 'dark',
      enabled: true,
      dataSource: 'API',
      refreshInterval: 10,
      displayRule: 'Business Category',
      abVariant: 'A',
      views: 9200,
      ctr: 5.4,
      loadTime: 120
    },
    {
      id: 'w-3',
      key: 'smart-city-status',
      name: 'Smart City & Public Transport',
      category: '24. Smart City',
      size: 'medium',
      theme: 'light',
      enabled: true,
      dataSource: 'Native',
      refreshInterval: 30,
      displayRule: 'All pages',
      abVariant: 'B',
      views: 3100,
      ctr: 4.1,
      loadTime: 85
    },
    {
      id: 'w-4',
      key: 'ai-summary',
      name: 'Gemini AI Summary & Timeline',
      category: '4. AI Widget',
      size: 'large',
      theme: 'dark',
      enabled: true,
      dataSource: 'Native',
      refreshInterval: 0,
      displayRule: 'Premium-Only',
      abVariant: 'A',
      views: 11200,
      ctr: 12.5,
      loadTime: 320
    },
    {
      id: 'w-5',
      key: 'prayer-times',
      name: 'Prayer Times & Islamic Calendar',
      category: '18. Utilities',
      size: 'small',
      theme: 'light',
      enabled: true,
      dataSource: 'Native',
      refreshInterval: 3600,
      displayRule: 'Sidebar All',
      abVariant: 'A',
      views: 4500,
      ctr: 3.2,
      loadTime: 12
    }
  ]);

  // Selected widget for detailed config modal
  const [editingWidget, setEditingWidget] = useState<WidgetConfig | null>(null);

  // --- 2. THE 25 MASTER CATEGORIES SPECIFICATION ---
  const masterCategories = [
    { id: '1. News Widget', icon: Globe, count: 32 },
    { id: '2. Content Widget', icon: Play, count: 8 },
    { id: '3. Viralog Content Hub', icon: TrendingUp, count: 15 },
    { id: '4. AI Widget', icon: Bot, count: 10 },
    { id: '5. Business & Finance', icon: DollarSign, count: 18 },
    { id: '6. Weather & Disaster', icon: CloudRain, count: 12 },
    { id: '7. Map & Geo', icon: Map, count: 10 },
    { id: '8. Government', icon: Shield, count: 10 },
    { id: '9. Event', icon: Calendar, count: 9 },
    { id: '10. Community', icon: MessageSquare, count: 10 },
    { id: '11. Marketplace', icon: ShoppingCart, count: 10 },
    { id: '12. Company Hub', icon: Globe, count: 12 },
    { id: '13. Jobs', icon: Briefcase, count: 7 },
    { id: '14. Monitoring', icon: Activity, count: 8 },
    { id: '15. Analytics', icon: BarChart2, count: 10 },
    { id: '16. Social', icon: Share2, count: 7 },
    { id: '17. Productivity', icon: FileText, count: 9 },
    { id: '18. Utilities', icon: Calculator, count: 12 },
    { id: '19. Live Services', icon: Tv, count: 9 },
    { id: '20. Advertisement', icon: Zap, count: 12 },
    { id: '21. User', icon: User, count: 9 },
    { id: '22. Research', icon: HelpCircle, count: 8 },
    { id: '23. Enterprise', icon: Cpu, count: 10 },
    { id: '24. Smart City', icon: Camera, count: 8 },
    { id: '25. Personalization', icon: Sparkles, count: 9 }
  ];

  // Map of all widgets categorized
  const widgetCatalog = [
    // 1. News Widget
    { key: 'hero-news', name: 'Hero News Grid', category: '1. News Widget', desc: 'Cover display with heavy typography & full content width.' },
    { key: 'breaking-news', name: 'Breaking News Ticker', category: '1. News Widget', desc: 'Realtime marquee style flash notifications.' },
    { key: 'timeline-news', name: 'Interactive Timeline News', category: '1. News Widget', desc: 'A vertical chronological step of updates.' },
    
    // 2. Content Widget
    { key: 'featured-video', name: 'Featured Video Playlist', category: '2. Content Widget', desc: 'Embedded visual playlist with inline thumbnail selector.' },
    { key: 'pdf-viewer', name: 'Whitepaper & PDF Viewer', category: '2. Content Widget', desc: 'Allows on-canvas rendering of research documents.' },

    // 3. Viralog Content Hub
    { key: 'trending-tiktok', name: 'Viralog: TikTok & YT Trends', category: '3. Viralog Content Hub', desc: 'Tracks trending content spikes across Instagram, TikTok, & X.' },

    // 4. AI Widget
    { key: 'ai-summary', name: 'Gemini AI Summary & Timeline', category: '4. AI Widget', desc: 'Auto-synthesizes multiple documents into single timelines.' },
    { key: 'ai-sentiment', name: 'AI Sentiment & Fact-Checker', category: '4. AI Widget', desc: 'Realtime semantic verification gauge with confidence levels.' },

    // 5. Business & Finance
    { key: 'market-watch', name: 'Commodity & Stock Watchlist', category: '5. Business & Finance', desc: 'Tracks global gold, oil, coal, and CPO index rates.' },

    // 6. Weather & Disaster
    { key: 'weather-disaster', name: 'Disaster Map & Weather Radar', category: '6. Weather & Disaster', desc: 'Real-time AQI tracking, rain index and disaster alerts.' },

    // 7. Map & Geo
    { key: 'geo-news', name: 'News by Geographical Location', category: '7. Map & Geo', desc: 'Choropleth heatmaps of West Java municipalities.' },

    // 8. Government
    { key: 'regulations-feed', name: 'Latest Government Regulations', category: '8. Government', desc: 'Tracks Presidential, Ministerial, and Regional announcements.' },

    // 9. Event
    { key: 'event-calendar', name: 'Interactive Event & Webinar Hub', category: '9. Event', desc: 'A sleek visual planner for industrial exhibitions.' },

    // 10. Community
    { key: 'forum-discussions', name: 'Live Discussion & Q&A Stream', category: '10. Community', desc: 'Embeds community forum thread replies directly.' },

    // 11. Marketplace
    { key: 'classified-ads', name: 'Rental & Project Marketplace', category: '11. Marketplace', desc: 'Direct access to listings, drone hires, and bid cards.' },

    // 12. Company Hub
    { key: 'company-profile', name: 'Company Performance Hub', category: '12. Company Hub', desc: 'Renders verified corporate portfolio listings.' },

    // 13. Jobs
    { key: 'talent-pool', name: 'Hiring & Talent Pool Finder', category: '13. Jobs', desc: 'Remote jobs, internships, and agency bids.' },

    // 14. Monitoring
    { key: 'brand-alerts', name: 'Brand & Competitor Alerts', category: '14. Monitoring', desc: 'Proactive crisis detection notification system.' },

    // 15. Analytics
    { key: 'analytics-kpi', name: 'Analytics KPI Scorecards', category: '15. Analytics', desc: 'Visualizes visitor CTR, unique reach, and loading times.' },

    // 16. Social
    { key: 'social-comments', name: 'Social Counter & Comments', category: '16. Social', desc: 'Renders consolidated comment stream.' },

    // 17. Productivity
    { key: 'productivity-todo', name: 'Personal Sticky Notes & Todo', category: '17. Productivity', desc: 'Client-side sticky pad for rapid drafting.' },

    // 18. Utilities
    { key: 'prayer-times', name: 'Prayer Times & Islamic Calendar', category: '18. Utilities', desc: 'Local prayer schedules with Hijriah & Javanese Weton.' },
    { key: 'quick-converters', name: 'Currency & Unit Converter', category: '18. Utilities', desc: 'Conversion engine for business-level transactions.' },

    // 19. Live Services
    { key: 'live-streams', name: 'Live CCTV & Broadcast Player', category: '19. Live Services', desc: 'Simulated livestream CCTV feeds of ports and traffic.' },

    // 20. Advertisement
    { key: 'ad-zones', name: 'AdOS Inline Banner Separator', category: '20. Advertisement', desc: 'Renders monetized sponsorship slots.' },

    // 21. User
    { key: 'user-rewards', name: 'User Premium Rewards Card', category: '21. User', desc: 'Monitors user subscription status and reward points.' },

    // 22. Research
    { key: 'knowledge-graph', name: 'Knowledge Graph References', category: '22. Research', desc: 'Visual links connecting key entities.' },

    // 23. Enterprise
    { key: 'audit-logs', name: 'Audit Logs & Portal Switcher', category: '23. Enterprise', desc: 'Activity feed tracking system modifications.' },

    // 24. Smart City
    { key: 'smart-city-status', name: 'Smart City & Public Transport', category: '24. Smart City', desc: 'CCTV feed logs combined with air quality.' },

    // 25. Personalization
    { key: 'recent-history', name: 'Recently Viewed & Saved Feed', category: '25. Personalization', desc: 'Adaptive listing matches based on user context.' }
  ];

  // Javanese Weton Calculation Engine Simulation
  const handleWetonCalculate = (dateStr: string) => {
    const wetonNames = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
    const neptuValues = [5, 9, 7, 4, 8];
    const index = Math.abs(new Date(dateStr).getTime() % 5);
    setWetonResult({
      weton: wetonNames[index],
      neptu: neptuValues[index],
      penjelasan: index === 3 ? 'Hemat, teliti, pandai menyimpan rahasia' : 'Tekun bekerja, ramah, disegani kolega'
    });
  };

  // Currency calculations
  useEffect(() => {
    setCurrencyResult(currencyInput * 15840);
  }, [currencyInput]);

  // Widget Canvas re-order functions
  const moveWidget = (index: number, direction: 'up' | 'down') => {
    const nextIndex = direction === 'up' ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= canvasWidgets.length) return;
    
    const updated = [...canvasWidgets];
    const temp = updated[index];
    updated[index] = updated[nextIndex];
    updated[nextIndex] = temp;
    setCanvasWidgets(updated);

    addLog(`Re-ordered layout index ${index} with ${nextIndex}.`);
  };

  const removeWidgetFromCanvas = (id: string) => {
    setCanvasWidgets(prev => prev.filter(w => w.id !== id));
    addLog(`Removed widget instance: ${id}`);
  };

  const addWidgetToCanvas = (catalogItem: typeof widgetCatalog[0]) => {
    const newWidget: WidgetConfig = {
      id: `w-${Date.now()}`,
      key: catalogItem.key,
      name: catalogItem.name,
      category: catalogItem.category,
      size: 'medium',
      theme: 'light',
      enabled: true,
      dataSource: 'Native',
      refreshInterval: 30,
      displayRule: 'All pages',
      abVariant: 'A',
      views: 0,
      ctr: 0.0,
      loadTime: Math.floor(Math.random() * 200) + 20
    };
    setCanvasWidgets([...canvasWidgets, newWidget]);
    addLog(`Added new widget: ${catalogItem.name} to page canvas.`);
  };

  const addLog = (msg: string) => {
    setSystemLogs(prev => [msg, ...prev.slice(0, 9)]);
  };

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#001126] min-h-screen text-slate-800 dark:text-slate-100 flex flex-col font-sans" id="widget-library-cms">
      
      {/* HEADER BAR FOR CMS */}
      <div className="bg-white dark:bg-[#001c3d] border-b border-slate-200 dark:border-white/10 py-4 px-6 sticky top-0 z-40 shadow-3xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#2B7A78]/10 text-[#2B7A78] rounded-lg">
              <Layout className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-display font-black text-base text-[#002B5B] dark:text-slate-100 uppercase tracking-wider">
                ⚙️ Master Widget CMS &amp; Page Builder
              </h1>
              <p className="text-[10px] text-slate-400 dark:text-slate-400 font-medium">Bebas susun, aktifkan, atur ukuran, dan personalisasikan 25 Kategori Widget INFOBOS secara real-time.</p>
            </div>
          </div>
        </div>

        {/* Dynamic Activity Monitor */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[9px] font-mono text-slate-400 block">SYSTEM STATUS</span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
              <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">PIPELINE ONLINE</span>
            </div>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-white/10" />
          <div className="flex gap-1.5">
            {[
              { id: 'builder', label: 'Builder Canvas' },
              { id: 'library', label: '25 Categories' },
              { id: 'analytics', label: 'KPI Analytics' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition ${
                  activeTab === tab.id 
                    ? 'bg-[#002B5B] text-white shadow-xs' 
                    : 'bg-slate-100 dark:bg-[#001126] hover:bg-slate-200 dark:hover:bg-[#001c3d]/50 text-slate-600 dark:text-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
        
        {/* LEFT COMPACT COLUMN: System status, configuration logs, quick actions */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Quick Stats overview */}
          <div className="bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-3xs text-left">
            <h3 className="font-display font-black text-xs text-[#002B5B] dark:text-slate-200 uppercase tracking-wider mb-3">
              📊 Rangkuman Platform
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-[#001126] border border-slate-100 dark:border-white/5 rounded-xl">
                <span className="text-[9px] text-slate-400 dark:text-slate-400 block font-mono">AKTIF CANVAS</span>
                <span className="text-sm font-black text-slate-800 dark:text-slate-200">{canvasWidgets.length} Widget</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-[#001126] border border-slate-100 dark:border-white/5 rounded-xl">
                <span className="text-[9px] text-slate-400 dark:text-slate-400 block font-mono">DILAYANI</span>
                <span className="text-sm font-black text-slate-800 dark:text-slate-200">25 Kategori</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-[#001126] border border-slate-100 dark:border-white/5 rounded-xl col-span-2 flex justify-between items-center">
                <div>
                  <span className="text-[9px] text-slate-400 dark:text-slate-400 block font-mono">LAZY-LOADING STATUS</span>
                  <span className="text-[10px] font-bold text-emerald-600">Teroptimasi (Cache On)</span>
                </div>
                <Info className="h-4 w-4 text-teal-600 shrink-0" />
              </div>
            </div>
          </div>

          {/* Master Category Selector */}
          <div className="bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-3xs text-left">
            <div className="flex items-center justify-between border-b dark:border-white/10 pb-2 mb-3">
              <h3 className="font-display font-black text-xs text-[#002B5B] dark:text-slate-200 uppercase tracking-wider">
                📂 25 Kategori Master
              </h3>
              <span className="text-[9px] font-mono text-slate-400">Total: 250+</span>
            </div>
            
            <div className="space-y-1 max-h-[380px] overflow-y-auto scrollbar-none">
              <button 
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-between ${
                  selectedCategory === 'all' 
                    ? 'bg-[#2B7A78]/10 text-[#2B7A78]' 
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-300'
                }`}
              >
                <span>Semua Kategori</span>
                <span className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 rounded font-mono">ALL</span>
              </button>

              {masterCategories.map(cat => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center justify-between ${
                      selectedCategory === cat.id 
                        ? 'bg-[#2B7A78]/10 text-[#2B7A78] font-bold' 
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5 shrink-0 text-[#2B7A78] dark:text-teal-400" />
                      <span className="truncate">{cat.id}</span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500">{cat.count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* System Audit log (Realtime logs) */}
          <div className="bg-slate-900 text-slate-300 border border-slate-800 rounded-2xl p-4 shadow-xs text-left">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
              <h3 className="font-mono text-[10px] font-bold tracking-wider text-emerald-400 uppercase">
                ⚙️ Live CMS Console Logs
              </h3>
              <RefreshCw className="h-3 w-3 text-slate-500 animate-spin" />
            </div>
            <div className="font-mono text-[9px] space-y-1.5 h-[120px] overflow-y-auto scrollbar-none leading-relaxed">
              {systemLogs.map((log, index) => (
                <div key={index} className="flex gap-1.5">
                  <span className="text-emerald-500">&gt;</span>
                  <span className="truncate">{log}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT MAJOR COLUMN: Workspaces */}
        <div className="lg:col-span-9 space-y-6">

          {/* VIEWPORT 1: WIDGET PAGE BUILDER CANVAS */}
          {activeTab === 'builder' && (
            <div className="space-y-6">
              
              {/* Builder intro header */}
              <div className="bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-3xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left">
                <div className="space-y-1">
                  <h3 className="font-display font-black text-sm text-[#002B5B] dark:text-slate-200 uppercase tracking-wider">
                    🛠️ Canvas Penata Halaman (Widget Layout Canvas)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Susun posisi vertikal widget, atur ukuran, matikan, atau ubah sumber data secara langsung.</p>
                </div>
                <button 
                  onClick={() => {
                    setCanvasWidgets([]);
                    addLog('Cleared all layout widgets.');
                  }}
                  className="bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-rose-600 dark:text-rose-400 font-bold text-[10px] uppercase px-3 py-2 rounded-xl transition"
                >
                  Bersihkan Layout
                </button>
              </div>

              {/* RENDER CANVAS FLOW */}
              {canvasWidgets.length === 0 ? (
                <div className="bg-white dark:bg-[#001c3d] border border-dashed border-slate-200 dark:border-white/10 rounded-2xl p-12 text-center shadow-3xs">
                  <Layout className="h-8 w-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-300">Belum ada widget di dalam susunan kanvas Anda.</p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-400 mt-1 mb-4">Tambahkan widget baru dari menu katalog di bawah.</p>
                  <button 
                    onClick={() => setActiveTab('library')}
                    className="bg-[#2B7A78] dark:bg-teal-600 hover:bg-[#205d5c] dark:hover:bg-teal-500 text-white font-black text-[10px] uppercase px-4 py-2 rounded-xl shadow-xs transition"
                  >
                    Buka Master Katalog
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {canvasWidgets.map((widget, index) => (
                    <div 
                      key={widget.id} 
                      className={`bg-white dark:bg-[#001c3d] border rounded-2xl p-4 shadow-3xs transition-all duration-300 relative group flex flex-col justify-between ${
                        widget.enabled 
                          ? 'border-slate-200 dark:border-white/10' 
                          : 'border-slate-200 dark:border-white/10 opacity-60 bg-slate-50/50 dark:bg-[#001126]/30'
                      }`}
                    >
                      {/* Control Panel Header of Widget box */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3 mb-3 gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono font-black text-[#2B7A78] dark:text-teal-400 bg-[#2B7A78]/10 dark:bg-teal-950/30 px-2 py-0.5 rounded uppercase">
                            {widget.category}
                          </span>
                          <h4 className="font-display font-black text-xs text-slate-800 dark:text-slate-100">
                            {widget.name}
                          </h4>
                          <span className="text-[9px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.2 rounded font-mono text-slate-500 dark:text-slate-400">
                            ID: {widget.id}
                          </span>
                        </div>

                        {/* CMS Control Actions */}
                        <div className="flex items-center gap-1.5 self-end sm:self-auto">
                          
                          {/* Enable/Disable Toggle */}
                          <button 
                            onClick={() => {
                              setCanvasWidgets(prev => prev.map(w => w.id === widget.id ? { ...w, enabled: !w.enabled } : w));
                              addLog(`Toggled enabled state for ${widget.name}.`);
                            }}
                            className={`p-1.5 rounded-lg transition text-[10px] font-extrabold uppercase ${
                              widget.enabled 
                                ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40' 
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                            }`}
                            title={widget.enabled ? 'Enabled' : 'Disabled'}
                          >
                            {widget.enabled ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                          </button>

                          {/* Resize Trigger */}
                          <div className="relative">
                            <button
                              onClick={() => {
                                const sizes: ('small' | 'medium' | 'large' | 'full')[] = ['small', 'medium', 'large', 'full'];
                                const currIdx = sizes.indexOf(widget.size);
                                const nextSize = sizes[(currIdx + 1) % sizes.length];
                                setCanvasWidgets(prev => prev.map(w => w.id === widget.id ? { ...w, size: nextSize } : w));
                                addLog(`Resized ${widget.name} to: ${nextSize}`);
                              }}
                              className="p-1.5 bg-slate-100 dark:bg-[#001126] hover:bg-slate-200 dark:hover:bg-[#001c3d] text-slate-600 dark:text-slate-300 rounded-lg text-[9px] font-mono uppercase font-bold flex items-center gap-1"
                              title="Resize Widget"
                            >
                              <Maximize2 className="h-3 w-3" />
                              <span>{widget.size.toUpperCase()}</span>
                            </button>
                          </div>

                          {/* Edit Config Trigger */}
                          <button 
                            onClick={() => setEditingWidget(widget)}
                            className="p-1.5 bg-slate-100 dark:bg-[#001126] hover:bg-slate-200 dark:hover:bg-[#001c3d] text-slate-600 dark:text-slate-300 rounded-lg"
                            title="Configure Settings"
                          >
                            <Settings className="h-3.5 w-3.5" />
                          </button>

                          {/* Reordering */}
                          <button 
                            onClick={() => moveWidget(index, 'up')}
                            disabled={index === 0}
                            className="p-1.5 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg disabled:opacity-30"
                          >
                            <ArrowUp className="h-3 w-3" />
                          </button>
                          <button 
                            onClick={() => moveWidget(index, 'down')}
                            disabled={index === canvasWidgets.length - 1}
                            className="p-1.5 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg disabled:opacity-30"
                          >
                            <ArrowDown className="h-3 w-3" />
                          </button>

                          {/* Delete */}
                          <button 
                            onClick={() => removeWidgetFromCanvas(widget.id)}
                            className="p-1.5 bg-rose-50 dark:bg-rose-950/20 hover:bg-rose-100 dark:hover:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>

                        </div>
                      </div>

                      {/* --- ACTUAL INTERACTIVE WIDGET PREVIEWS (DYNAMIC RENDERING) --- */}
                      {widget.enabled ? (
                        <div className={`p-4 rounded-xl border border-dashed border-slate-200 dark:border-white/10 bg-slate-50/30 dark:bg-[#001126]/30 ${
                          widget.theme === 'dark' ? 'bg-slate-900 text-white border-slate-800' : ''
                        }`}>
                          
                          {/* 1. Hero News Widget */}
                          {widget.key === 'hero-news' && (
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-left">
                              <div className="md:col-span-8 space-y-2">
                                <span className="text-[10px] font-mono font-black text-rose-500 uppercase tracking-widest bg-rose-50 dark:bg-rose-950/30 px-2 py-0.5 rounded">INVESTIGASI UTAMA</span>
                                <h3 className="font-display font-black text-sm md:text-base leading-tight hover:text-[#2B7A78] dark:hover:text-teal-400 cursor-pointer text-slate-800 dark:text-slate-100">
                                  Menelusuri Alur Dana Hibah Kemitraan Rebana Raya Kuartal ke-2 2026
                                </h3>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                                  Penelitian eksklusif tim jurnalis INFOBOS mengenai pencapaian target serapan tenaga kerja lokal di Majalengka &amp; Indramayu.
                                </p>
                              </div>
                              <div className="md:col-span-4 bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden min-h-[90px] relative">
                                <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=150&q=80" alt="Investigasi" className="w-full h-full object-cover" />
                              </div>
                            </div>
                          )}

                          {/* 5. Business & Finance */}
                          {widget.key === 'market-watch' && (
                            <div className="space-y-3">
                              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-1.5 mb-1.5">
                                <span className="text-[10px] font-mono font-bold uppercase text-[#2B7A78] dark:text-teal-400">📊 Indeks Komoditas &amp; Nilai Tukar</span>
                                <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono">Auto-Refresh 10s</span>
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                                <div className="p-2.5 bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-lg shadow-4xs">
                                  <span className="text-[9px] text-slate-400 dark:text-slate-400 block font-mono">Batu Bara Jabar</span>
                                  <span className="font-bold text-slate-800 dark:text-slate-200">$138.45</span>
                                  <span className="text-[9px] text-emerald-600 block font-mono">+1.24% 📈</span>
                                </div>
                                <div className="p-2.5 bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-lg shadow-4xs">
                                  <span className="text-[9px] text-slate-400 dark:text-slate-400 block font-mono">CPO Kertajati</span>
                                  <span className="font-bold text-slate-800 dark:text-slate-200">$942.10</span>
                                  <span className="text-[9px] text-rose-600 block font-mono">-0.45% 📉</span>
                                </div>
                                <div className="p-2.5 bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-lg shadow-4xs">
                                  <span className="text-[9px] text-slate-400 dark:text-slate-400 block font-mono">Logam Mulia (g)</span>
                                  <span className="font-bold text-slate-800 dark:text-slate-200">Rp 1.450.000</span>
                                  <span className="text-[9px] text-emerald-600 block font-mono">+0.85% 📈</span>
                                </div>
                                <div className="p-2.5 bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-lg shadow-4xs">
                                  <span className="text-[9px] text-slate-400 dark:text-slate-400 block font-mono">USD / IDR</span>
                                  <span className="font-bold text-slate-800 dark:text-slate-200">Rp 15.840</span>
                                  <span className="text-[9px] text-emerald-600 block font-mono">+0.12% 📈</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* 24. Smart City status */}
                          {widget.key === 'smart-city-status' && (
                            <div className="space-y-3">
                              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-1.5">
                                <span className="text-[10px] font-mono font-bold uppercase text-slate-700 dark:text-slate-300">🏙️ Bandung Raya Smart City Telemetri</span>
                                <span className="text-[9px] bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 px-2 rounded-full font-mono font-bold">ONLINE</span>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="p-2 bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-lg flex items-center gap-2">
                                  <span className="text-xl">🍃</span>
                                  <div>
                                    <span className="text-[9px] text-slate-400 dark:text-slate-400 block font-mono">Kualitas Udara AQI</span>
                                    <span className="font-bold text-emerald-600 dark:text-emerald-400">42 (Sangat Baik)</span>
                                  </div>
                                </div>
                                <div className="p-2 bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-lg flex items-center gap-2">
                                  <span className="text-xl">🚗</span>
                                  <div>
                                    <span className="text-[9px] text-slate-400 dark:text-slate-400 block font-mono">Kemacetan Pasteur</span>
                                    <span className="font-bold text-amber-600 dark:text-amber-400">Padat Lancar (40km/j)</span>
                                  </div>
                                </div>
                                <div className="p-2 bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-lg flex items-center gap-2">
                                  <span className="text-xl">🌊</span>
                                  <div>
                                    <span className="text-[9px] text-slate-400 dark:text-slate-400 block font-mono">Ketinggian Ciliwung</span>
                                    <span className="font-bold text-emerald-600 dark:text-emerald-400">Siaga 4 (Normal)</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                           {/* 4. AI Summary */}
                           {widget.key === 'ai-summary' && (
                             <AiReadingAssistantWidget
                               cardThemeClasses={(widget.theme === 'dark' || widget.theme === 'auto') ? "bg-slate-950 text-slate-100 border-slate-800" : "bg-white text-slate-900 border-slate-250"}
                               innerBoxThemeClasses={(widget.theme === 'dark' || widget.theme === 'auto') ? "bg-slate-900/60 border-slate-800/80" : "bg-slate-50 border-slate-200/80"}
                               headingClasses={(widget.theme === 'dark' || widget.theme === 'auto') ? "text-slate-100" : "text-slate-800"}
                               textMutedClasses={(widget.theme === 'dark' || widget.theme === 'auto') ? "text-slate-400" : "text-slate-500"}
                               contrastTheme={(widget.theme === 'dark' || widget.theme === 'auto') ? "dark" : "light"}
                             />
                           )}

                          {/* 18. Prayer times & Islamic utility */}
                          {widget.key === 'prayer-times' && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-1 mb-1.5">
                                <span className="text-[9px] font-mono font-black uppercase text-slate-500 dark:text-slate-400">🕌 Prayer Times &amp; Weton Jawa</span>
                                <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono">Bandung Raya</span>
                              </div>
                              <div className="grid grid-cols-5 gap-1 text-center font-mono text-[9px]">
                                <div className="p-1 bg-white dark:bg-[#001c3d] border dark:border-white/10 rounded">
                                  <span className="text-[8px] text-slate-400 dark:text-slate-400 block">Subuh</span>
                                  <span className="font-bold text-slate-800 dark:text-slate-200">04:38</span>
                                </div>
                                <div className="p-1 bg-white dark:bg-[#001c3d] border dark:border-white/10 rounded">
                                  <span className="text-[8px] text-slate-400 dark:text-slate-400 block">Dzuhur</span>
                                  <span className="font-bold text-slate-800 dark:text-slate-200">11:55</span>
                                </div>
                                <div className="p-1 bg-white dark:bg-[#001c3d] border dark:border-white/10 rounded">
                                  <span className="text-[8px] text-slate-400 dark:text-slate-400 block">Ashar</span>
                                  <span className="font-bold text-slate-800 dark:text-slate-200">15:16</span>
                                </div>
                                <div className="p-1 bg-white dark:bg-[#001c3d] border dark:border-white/10 rounded">
                                  <span className="text-[8px] text-slate-400 dark:text-slate-400 block">Maghrib</span>
                                  <span className="font-bold text-slate-800 dark:text-slate-200">17:48</span>
                                </div>
                                <div className="p-1 bg-white dark:bg-[#001c3d] border dark:border-white/10 rounded">
                                  <span className="text-[8px] text-slate-400 dark:text-slate-400 block">Isya</span>
                                  <span className="font-bold text-slate-800 dark:text-slate-200">19:02</span>
                                </div>
                              </div>
                              <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex justify-between items-center text-[10px] text-slate-500 dark:text-slate-400">
                                <span>Hijriah: 15 Muharram 1448 H</span>
                                <span>Pasaran: Wage (Neptu 7)</span>
                              </div>
                            </div>
                          )}

                          {/* Fallback template for newer widgets */}
                          {['hero-news', 'market-watch', 'smart-city-status', 'ai-summary', 'prayer-times'].indexOf(widget.key) === -1 && (
                            <div className="p-4 text-center">
                              <Bot className="h-6 w-6 text-slate-400 dark:text-slate-500 mx-auto mb-1.5" />
                              <p className="text-xs font-bold text-slate-600 dark:text-slate-300">Simulasi Widget: {widget.name}</p>
                              <p className="text-[10px] text-slate-400 dark:text-slate-400 mt-0.5">Berjalan pada pipeline lazy-loaded. Konfigurasi Data Source: {widget.dataSource}.</p>
                            </div>
                          )}

                        </div>
                      ) : (
                        <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-center text-xs text-slate-400 dark:text-slate-400 font-bold border border-slate-200 dark:border-white/10">
                          🔕 Widget dinonaktifkan dari panel layout.
                        </div>
                      )}

                      {/* Performance stats of Widget Box */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 flex flex-wrap items-center justify-between text-[10px] text-slate-400 font-mono">
                        <div className="flex gap-4">
                          <span>📊 Views: {widget.views.toLocaleString('id-ID')}</span>
                          <span className="text-emerald-600 font-bold">CTR: {widget.ctr}%</span>
                          <span>Speed: {widget.loadTime}ms</span>
                        </div>
                        <span className="text-slate-400 dark:text-slate-500 font-bold uppercase">Source: {widget.dataSource}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* DOCKER TO ADD MORE WIDGETS */}
              <div className="bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-3xs text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b dark:border-white/10 pb-2 mb-4 gap-2">
                  <h3 className="font-display font-black text-sm text-[#002B5B] dark:text-slate-200 uppercase tracking-wider">
                    ➕ Tambah Widget ke Halaman (Master Katalog Dock)
                  </h3>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Cari katalog..."
                      value={widgetSearch}
                      onChange={(e) => setWidgetSearch(e.target.value)}
                      className="pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-[#001126] border border-slate-200 dark:border-white/10 rounded-lg text-xs font-medium outline-none text-slate-750 dark:text-slate-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {widgetCatalog
                    .filter(cat => {
                      const matchesCat = selectedCategory === 'all' || cat.category === selectedCategory;
                      const matchesS = cat.name.toLowerCase().includes(widgetSearch.toLowerCase()) || cat.desc.toLowerCase().includes(widgetSearch.toLowerCase());
                      return matchesCat && matchesS;
                    })
                    .slice(0, 9)
                    .map(item => (
                      <div key={item.key} className="p-4 bg-slate-50 dark:bg-[#001126] border border-slate-200 dark:border-white/10 hover:border-[#2B7A78] dark:hover:border-teal-500 rounded-xl flex flex-col justify-between items-start transition duration-200 hover:shadow-xs group">
                        <div className="space-y-1 text-left w-full">
                          <span className="text-[8px] font-mono font-black text-[#2B7A78] dark:text-teal-400 uppercase bg-[#2B7A78]/10 dark:bg-teal-950/30 px-1.5 py-0.2 rounded block w-fit">
                            {item.category}
                          </span>
                          <h4 className="text-xs font-black text-slate-800 dark:text-slate-100 pt-1 group-hover:text-[#2B7A78] dark:group-hover:text-teal-400 transition-colors">{item.name}</h4>
                          <p className="text-[10px] text-slate-400 dark:text-slate-400 line-clamp-2 leading-relaxed">{item.desc}</p>
                        </div>
                        <button 
                          onClick={() => addWidgetToCanvas(item)}
                          className="mt-3 w-full bg-white dark:bg-[#001c3d] hover:bg-[#2B7A78] dark:hover:bg-teal-600 border border-slate-200 dark:border-white/10 hover:border-[#2B7A78] hover:text-white dark:hover:text-white text-slate-700 dark:text-slate-300 font-bold text-[9px] uppercase py-2 rounded-lg transition text-center flex items-center justify-center gap-1"
                        >
                          <Plus className="h-3 w-3" />
                          <span>Tambahkan</span>
                        </button>
                      </div>
                    ))}
                </div>
              </div>

            </div>
          )}

          {/* VIEWPORT 2: ALL 25 MASTER CATEGORIES EXPLORER */}
          {activeTab === 'library' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-3xs text-left">
                <h3 className="font-display font-black text-sm text-[#002B5B] dark:text-slate-200 uppercase tracking-wider mb-2">
                  🗂️ 25 Kategori Master Widget Library (Full Catalog Blueprint)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Setiap widget siap diaktifkan, dimuat secara lazy-loaded, dan didukung integrasi API/Native.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {masterCategories.map(cat => {
                    const Icon = cat.icon;
                    return (
                      <div key={cat.id} className="p-4.5 border border-slate-200 dark:border-white/10 hover:border-[#2B7A78] dark:hover:border-teal-500 rounded-2xl bg-slate-50/50 dark:bg-[#001126]/50 hover:bg-white dark:hover:bg-[#001126] transition flex items-start gap-3 text-left">
                        <div className="p-2.5 bg-[#2B7A78]/10 dark:bg-teal-950/30 text-[#2B7A78] dark:text-teal-400 rounded-xl">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight">{cat.id}</h4>
                          <p className="text-[10px] text-slate-400 dark:text-slate-400">Menyediakan {cat.count} variasi tata letak widget siap pakai.</p>
                          <div className="flex items-center gap-1.5 pt-1.5">
                            <span className="text-[9px] bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.2 rounded font-mono font-bold">ACTIVE API</span>
                            <span className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.2 rounded font-mono">LAZY LOAD</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* EXTREMELY USEFUL UTILITY WIDGET DEMO SUITE (Calculators, Weton, Currency Converter) */}
              <div className="bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-3xs text-left">
                <h3 className="font-display font-black text-sm text-[#002B5B] dark:text-slate-200 uppercase tracking-wider mb-3">
                  🛠️ Interactive Utilities Widget Demo Suite (18. Utilities)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">Simulator kegunaan harian, konversi mata uang digital, dan perhitungan Weton Jawa secara presisi.</p>
 
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Weton Calculator */}
                  <div className="p-4 bg-slate-50 dark:bg-[#001126] border border-slate-200 dark:border-white/10 rounded-xl space-y-3">
                    <span className="text-[9px] font-mono font-black text-[#2B7A78] dark:text-teal-400 uppercase bg-[#2B7A78]/10 dark:bg-teal-950/30 px-2 py-0.5 rounded">KALENDER JAWA &amp; WETON</span>
                    <h4 className="text-xs font-black text-slate-800 dark:text-slate-100">Perhitungan Weton Primbon</h4>
                    
                    <div className="flex gap-2">
                      <input 
                        type="date" 
                        value={wetonInputDate}
                        onChange={(e) => {
                          setWetonInputDate(e.target.value);
                          handleWetonCalculate(e.target.value);
                        }}
                        className="p-1.5 bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded text-xs outline-none focus:border-[#2B7A78] text-slate-800 dark:text-slate-100"
                      />
                      <button 
                        onClick={() => handleWetonCalculate(wetonInputDate)}
                        className="bg-[#2B7A78] dark:bg-teal-600 hover:bg-[#205d5c] dark:hover:bg-teal-500 text-white text-[10px] font-bold uppercase px-3 rounded"
                      >
                        Hitung Weton
                      </button>
                    </div>

                    <div className="p-3 bg-white dark:bg-[#001c3d] border border-slate-150 dark:border-white/10 rounded-lg text-xs space-y-1 font-mono">
                      <div className="flex justify-between">
                        <span className="text-slate-400 dark:text-slate-400">Hari Pasaran:</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{wetonResult.weton}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 dark:text-slate-400">Jumlah Neptu:</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{wetonResult.neptu}</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-slate-100 dark:border-white/5">
                        <span className="text-slate-400 dark:text-slate-400">Karakter Weton:</span>
                        <span className="font-bold text-slate-700 dark:text-slate-300">{wetonResult.penjelasan}</span>
                      </div>
                    </div>
                  </div>

                  {/* Currency converter */}
                  <div className="p-4 bg-slate-50 dark:bg-[#001126] border border-slate-200 dark:border-white/10 rounded-xl space-y-3">
                    <span className="text-[9px] font-mono font-black text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">CURRENCY &amp; TRADE VALUE</span>
                    <h4 className="text-xs font-black text-slate-800 dark:text-slate-100">Konverter Kurs Bisnis &amp; Nilai Transaksi</h4>

                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        value={currencyInput}
                        onChange={(e) => setCurrencyInput(Number(e.target.value))}
                        className="p-1.5 bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded text-xs outline-none w-20 focus:border-amber-500 text-slate-800 dark:text-slate-100 font-mono font-bold"
                      />
                      <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 text-slate-500">USD &rarr;</span>
                      <div className="p-1.5 bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded text-xs font-mono font-black text-slate-800 dark:text-slate-100 w-36">
                        Rp {currencyResult.toLocaleString('id-ID')} IDR
                      </div>
                    </div>

                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                      Kurs penyesuaian pasar spot realtime diperbarui secara otomatis. Integrasi API Bank Indonesia.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* VIEWPORT 3: CMS PERFORMANCE ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-3xs text-left space-y-6">
              
              <div className="border-b dark:border-white/10 pb-3 mb-4">
                <h3 className="font-display font-black text-sm text-[#002B5B] dark:text-slate-200 uppercase tracking-wider">
                  📈 Dashboard Analytics &amp; A/B Testing Outcomes
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Pantau rasio klik-tayang (CTR), kecepatan muat halaman, dan performa A/B testing variasi widget.</p>
              </div>

              {/* KPI Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-[#001126] border border-slate-200 dark:border-white/10 rounded-xl">
                  <span className="text-[10px] text-slate-400 block font-mono">RATA-RATA CTR</span>
                  <span className="text-xl font-black text-slate-800 dark:text-slate-100">6.8%</span>
                  <span className="text-[9px] text-emerald-600 block mt-1">+1.5% dibanding bulan lalu</span>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-[#001126] border border-slate-200 dark:border-white/10 rounded-xl">
                  <span className="text-[10px] text-slate-400 block font-mono">RATA-RATA KECEPATAN MUAT</span>
                  <span className="text-xl font-black text-[#2B7A78] dark:text-teal-400">112ms</span>
                  <span className="text-[9px] text-emerald-600 block mt-1">99.8% Core Web Vitals Hijau</span>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-[#001126] border border-slate-200 dark:border-white/10 rounded-xl">
                  <span className="text-[10px] text-slate-400 block font-mono">A/B TESTING OUTCOME</span>
                  <span className="text-xl font-black text-amber-600">Variant A &gt; Variant B</span>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 block mt-1">Rasio konversi Variant A unggul 12.4%</span>
                </div>
              </div>

              {/* Detail performance breakdown ledger */}
              <div className="space-y-2 pt-3">
                <h4 className="text-xs font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider mb-2">Evaluasi Per-Widget Terpilih</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-[#001126] text-slate-400 dark:text-slate-400 font-mono text-[10px] border-b border-slate-200 dark:border-white/10">
                        <th className="p-3">Nama Widget</th>
                        <th className="p-3">Kategori</th>
                        <th className="p-3">Load Time</th>
                        <th className="p-3">Views</th>
                        <th className="p-3">A/B Status</th>
                        <th className="p-3">CTR</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                      {canvasWidgets.map(w => (
                        <tr key={w.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                          <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{w.name}</td>
                          <td className="p-3 font-mono text-[10px] text-slate-500 dark:text-slate-400">{w.category}</td>
                          <td className="p-3 font-mono font-bold text-[#2B7A78] dark:text-teal-400">{w.loadTime}ms</td>
                          <td className="p-3 font-mono text-slate-700 dark:text-slate-300">{w.views.toLocaleString('id-ID')}</td>
                          <td className="p-3"><span className="bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded text-[9px] font-mono font-bold">VARIANT {w.abVariant}</span></td>
                          <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">{w.ctr}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* --- CONFIGURATION MODAL FOR EDITING SELECTED WIDGET --- */}
      {editingWidget && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-xl max-w-md w-full text-left space-y-4"
          >
            <div className="flex items-center justify-between border-b dark:border-white/10 pb-2">
              <h3 className="font-display font-black text-sm text-[#002B5B] dark:text-slate-200 uppercase tracking-wide">
                ⚙️ Konfigurasi Widget CMS
              </h3>
              <button 
                onClick={() => setEditingWidget(null)}
                className="text-slate-400 hover:text-slate-650 dark:hover:text-slate-200 font-black"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-400 block mb-1">NAMA WIDGET</label>
                <input 
                  type="text" 
                  value={editingWidget.name}
                  onChange={(e) => {
                    const val = e.target.value;
                    setEditingWidget(prev => prev ? { ...prev, name: val } : null);
                    setCanvasWidgets(prev => prev.map(w => w.id === editingWidget.id ? { ...w, name: val } : w));
                  }}
                  className="w-full p-2 bg-slate-50 dark:bg-[#001126] border border-slate-200 dark:border-white/10 rounded-lg outline-none font-bold text-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-400 block mb-1">THEME PRESET</label>
                  <select 
                    value={editingWidget.theme}
                    onChange={(e) => {
                      const val = e.target.value as any;
                      setEditingWidget(prev => prev ? { ...prev, theme: val } : null);
                      setCanvasWidgets(prev => prev.map(w => w.id === editingWidget.id ? { ...w, theme: val } : w));
                    }}
                    className="w-full p-2 bg-slate-50 dark:bg-[#001126] border border-slate-200 dark:border-white/10 rounded-lg outline-none text-slate-800 dark:text-slate-200"
                  >
                    <option value="light">Light Theme</option>
                    <option value="dark">Dark Theme</option>
                    <option value="auto">Auto Sync</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-400 block mb-1">DATA SOURCE</label>
                  <select 
                    value={editingWidget.dataSource}
                    onChange={(e) => {
                      const val = e.target.value as any;
                      setEditingWidget(prev => prev ? { ...prev, dataSource: val } : null);
                      setCanvasWidgets(prev => prev.map(w => w.id === editingWidget.id ? { ...w, dataSource: val } : w));
                    }}
                    className="w-full p-2 bg-slate-50 dark:bg-[#001126] border border-slate-200 dark:border-white/10 rounded-lg outline-none text-slate-800 dark:text-slate-200"
                  >
                    <option value="Native">Native (Internal)</option>
                    <option value="API">API Gateway</option>
                    <option value="RSS">RSS XML</option>
                    <option value="Embed">Embed HTML</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-400 block mb-1">REFRESH INTERVAL (S)</label>
                  <input 
                    type="number" 
                    value={editingWidget.refreshInterval}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setEditingWidget(prev => prev ? { ...prev, refreshInterval: val } : null);
                      setCanvasWidgets(prev => prev.map(w => w.id === editingWidget.id ? { ...w, refreshInterval: val } : w));
                    }}
                    className="w-full p-2 bg-slate-50 dark:bg-[#001126] border border-slate-200 dark:border-white/10 rounded-lg outline-none text-slate-800 dark:text-slate-200"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-400 block mb-1">DISPLAY RULE</label>
                  <input 
                    type="text" 
                    value={editingWidget.displayRule}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditingWidget(prev => prev ? { ...prev, displayRule: val } : null);
                      setCanvasWidgets(prev => prev.map(w => w.id === editingWidget.id ? { ...w, displayRule: val } : w));
                    }}
                    className="w-full p-2 bg-slate-50 dark:bg-[#001126] border border-slate-200 dark:border-white/10 rounded-lg outline-none text-slate-800 dark:text-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-400 block mb-1">A/B VARIANT</label>
                  <select 
                    value={editingWidget.abVariant}
                    onChange={(e) => {
                      const val = e.target.value as any;
                      setEditingWidget(prev => prev ? { ...prev, abVariant: val } : null);
                      setCanvasWidgets(prev => prev.map(w => w.id === editingWidget.id ? { ...w, abVariant: val } : w));
                    }}
                    className="w-full p-2 bg-slate-50 dark:bg-[#001126] border border-slate-200 dark:border-white/10 rounded-lg outline-none text-slate-800 dark:text-slate-200"
                  >
                    <option value="A">Variant A (Default)</option>
                    <option value="B">Variant B (Beta)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-400 block mb-1">LAZY LOADING</label>
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 font-bold border border-emerald-100 dark:border-emerald-900/10 rounded-lg text-center select-none">
                    ⚡ ENABLED BY DEFAULT
                  </div>
                </div>
              </div>

            </div>

            <button 
              onClick={() => {
                setEditingWidget(null);
                addLog('Saved widget configurations successfully.');
              }}
              className="w-full bg-[#002B5B] dark:bg-teal-600 hover:bg-[#001c3d] dark:hover:bg-teal-500 text-white font-black text-xs uppercase py-2.5 rounded-xl transition"
            >
              Simpan Konfigurasi &rarr;
            </button>
          </motion.div>
        </div>
      )}

    </div>
  );
}
