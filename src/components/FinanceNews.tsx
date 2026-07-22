import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, DollarSign, Calendar, Eye, ChevronRight, 
  Search, Award, RefreshCw, Layers, BookOpen, Clock, Tag, MessageSquare, 
  HelpCircle, Newspaper, Globe, ArrowRight, ShieldCheck, Sparkles, Percent, MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Legend, CartesianGrid
} from 'recharts';

interface NewsItem {
  id: string;
  title: string;
  category: string;
  summary: string;
  source: string;
  time: string;
  views: number;
  sentiment: 'positif' | 'negatif' | 'netral';
  impactScore: string;
}

export default function FinanceNews() {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeChartIndex, setActiveChartIndex] = useState<'IHSG' | 'USDIDR' | 'Emas' | 'Bitcoin'>('IHSG');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isThemeDark, setIsThemeDark] = useState(() => document.documentElement.classList.contains('dark'));

  React.useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsThemeDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Market indices mock data
  const marketIndices = [
    { name: 'IHSG', value: '7,284.10', change: '+0.54%', trend: 'up', symbol: '🟢' },
    { name: 'USD/IDR', value: '16,345.00', change: '-0.12%', trend: 'down', symbol: '🟢' },
    { name: 'Harga Emas (gr)', value: 'Rp 1.340.000', change: '+1.20%', trend: 'up', symbol: '🟢' },
    { name: 'Bitcoin (BTC)', value: '$63,480', change: '+3.15%', trend: 'up', symbol: '🟢' },
    { name: 'Dow Jones', value: '39,127.14', change: '-0.08%', trend: 'down', symbol: '🔴' },
    { name: 'NASDAQ', value: '17,820.50', change: '+0.85%', trend: 'up', symbol: '🟢' },
    { name: 'S&P 500', value: '5,482.10', change: '+0.41%', trend: 'up', symbol: '🟢' },
    { name: 'Minyak Mentah', value: '$81.42', change: '-0.45%', trend: 'down', symbol: '🔴' }
  ];

  // News categories according to specs
  const categories = [
    'Semua', 'Breaking Finance', 'Ekonomi', 'Perbankan', 'Saham', 
    'Obligasi', 'Forex', 'Komoditas', 'Kripto', 'Pajak', 
    'Asuransi', 'Fintech', 'Investasi', 'Pasar Modal', 
    'UMKM', 'Makro Ekonomi', 'Mikro Ekonomi', 'Analisis', 'Opini'
  ];

  // Mock News Data with high-density Jabar contexts
  const newsList: NewsItem[] = [
    {
      id: 'fin-1',
      title: 'Pemprov Jabar Kucurkan Stimulus Kredit Mesra Rp 150 Miliar untuk UMKM Priangan',
      category: 'UMKM',
      summary: 'Langkah strategis menekan angka rentenir ilegal di pedesaan dengan bunga 0% dan skema verifikasi berbasis digital komunitas paguyuban.',
      source: 'Redaksi Ekonomi',
      time: '15 menit yang lalu',
      views: 3410,
      sentiment: 'positif',
      impactScore: '9.4'
    },
    {
      id: 'fin-2',
      title: 'IHSG Dibuka Menguat Menuju Level 7.300 Ditopang Saham Perbankan Jabar',
      category: 'Saham',
      summary: 'Kenaikan laba bersih BJB dan perbankan BUMN mendorong optimisme aliran modal asing masuk ke bursa saham domestik hari ini.',
      source: 'Pasar Modal Analyst',
      time: '45 menit yang lalu',
      views: 1890,
      sentiment: 'positif',
      impactScore: '8.1'
    },
    {
      id: 'fin-3',
      title: 'Kemenkeu Rilis Obligasi ORI026, Gubernur BI Proyeksikan Likuiditas Aman',
      category: 'Obligasi',
      summary: 'Obligasi ritel menawarkan kupon tetap 6.45% per tahun dengan minimal pembelian satu juta rupiah, menyasar milenial melek investasi.',
      source: 'Investasi Makro',
      time: '2 jam yang lalu',
      views: 2450,
      sentiment: 'netral',
      impactScore: '7.8'
    },
    {
      id: 'fin-4',
      title: 'Rupiah Melemah Tipis Rp 16.345 Per USD Akibat Tekanan Suku Bunga Global Fed',
      category: 'Forex',
      summary: 'Bank Indonesia melakukan intervensi triple market di pasar DNDF demi menjaga volatilitas rupiah tetap stabil dalam rentang aman.',
      source: 'Fintech & Valas',
      time: '3 jam yang lalu',
      views: 4120,
      sentiment: 'negatif',
      impactScore: '8.9'
    },
    {
      id: 'fin-5',
      title: 'Harga Emas Antam Rekor Baru Rp 1,34 Juta Per Gram di Butik Logam Mulia Bandung',
      category: 'Komoditas',
      summary: 'Ketidakpastian geopolitik Timur Tengah mendorong investor memborong instrumen safe-haven emas murni sepanjang pagi ini.',
      source: 'Komoditas Spot',
      time: '4 jam yang lalu',
      views: 5200,
      sentiment: 'positif',
      impactScore: '9.0'
    },
    {
      id: 'fin-6',
      title: 'Kebijakan Pajak Karbon Industri Semen Jabar Selatan Ditunda Hingga Akhir Kuartal IV',
      category: 'Pajak',
      summary: 'Asosiasi pengusaha menyambut baik penundaan demi memulihkan arus kas korporasi di tengah lambatnya rantai pasokan bahan baku.',
      source: 'Kebijakan Fiskal',
      time: '5 jam yang lalu',
      views: 1540,
      sentiment: 'netral',
      impactScore: '6.5'
    },
    {
      id: 'fin-7',
      title: 'Asosiasi Kripto Nasional Sambut Aturan Baru Pengawasan OJK Mulai Januari',
      category: 'Kripto',
      summary: 'Peralihan wewenang pengawasan dari Bappebti ke OJK diproyeksikan memperkuat perlindungan nasabah dan integrasi bursa terdaftar.',
      source: 'Fintech Analyst',
      time: '1 hari yang lalu',
      views: 3120,
      sentiment: 'positif',
      impactScore: '8.2'
    },
    {
      id: 'fin-8',
      title: 'Analisis Opini: Mengukur Daya Beli Warga Jabar di Tengah Kenaikan Tarif Asuransi Kesehatan',
      category: 'Opini',
      summary: 'Kenaikan premi asuransi swasta rata-rata 15-20% memaksa masyarakat beralih menggunakan BPJS Kesehatan secara masif.',
      source: 'Kolom Publik',
      time: '1 hari yang lalu',
      views: 1980,
      sentiment: 'negatif',
      impactScore: '7.2'
    }
  ];

  // Economic Calendar data
  const economicCalendar = [
    { date: '03 Juli', time: '11:00 WIB', event: 'Tingkat Inflasi YoY Indonesia Juni', prev: '2.84%', forecast: '2.80%', impact: 'Tinggi', active: true },
    { date: '05 Juli', time: '10:00 WIB', event: 'Cadangan Devisa RI Juni', prev: '$139.0M', forecast: '$139.5M', impact: 'Sedang', active: false },
    { date: '08 Juli', time: '14:00 WIB', event: 'Rapat Dewan Gubernur Bank Indonesia (Suku Bunga)', prev: '6.25%', forecast: '6.25%', impact: 'Tinggi', active: true },
    { date: '10 Juli', time: '10:00 WIB', event: 'Pertumbuhan Penjualan Ritel Jabar', prev: '4.2%', forecast: '4.5%', impact: 'Rendah', active: false }
  ];

  // Recharts Chart Data
  const chartData = {
    IHSG: [
      { date: 'Senin', value: 7210 }, { date: 'Selasa', value: 7240 }, 
      { date: 'Rabu', value: 7230 }, { date: 'Kamis', value: 7255 }, 
      { date: 'Jumat', value: 7284 }
    ],
    USDIDR: [
      { date: 'Senin', value: 16420 }, { date: 'Selasa', value: 16390 }, 
      { date: 'Rabu', value: 16375 }, { date: 'Kamis', value: 16355 }, 
      { date: 'Jumat', value: 16345 }
    ],
    Emas: [
      { date: 'Senin', value: 1315000 }, { date: 'Selasa', value: 1322000 }, 
      { date: 'Rabu', value: 1320000 }, { date: 'Kamis', value: 1335000 }, 
      { date: 'Jumat', value: 1340000 }
    ],
    Bitcoin: [
      { date: 'Senin', value: 61200 }, { date: 'Selasa', value: 62400 }, 
      { date: 'Rabu', value: 61800 }, { date: 'Kamis', value: 62900 }, 
      { date: 'Jumat', value: 63480 }
    ]
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // Filtered News List
  const filteredNews = newsList.filter(news => {
    const matchesCategory = activeCategory === 'Semua' || news.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          news.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#f8fafc] dark:bg-[#030712] text-[#1e293b] dark:text-slate-100 min-h-screen py-6 transition-colors duration-200" id="finance-news-portal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* HEADER SECTION - Editorial Style */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#0f766e]/20 dark:border-white/10 pb-5">
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="bg-[#0f766e]/10 dark:bg-teal-500/10 text-[#0f766e] dark:text-teal-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
                🗞️ Kanal Publik Keuangan &amp; Ekonomi
              </span>
              <span className="text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono font-bold px-2 py-0.5 rounded">
                Portal Berita Terkini
              </span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white mt-2 tracking-tight">
              Keuangan &amp; Ekonomi Jabar
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 max-w-2xl">
              Liputan terlengkap iklim makro-mikro, regulasi fiskal daerah, pergerakan saham, obligasi ritel, perkembangan UMKM, serta ulasan opini ahli perbankan.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex gap-2">
            <button
              onClick={handleRefresh}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 px-3 py-2 rounded-xl text-xs font-bold shadow-sm transition flex items-center gap-1.5"
              style={{ minHeight: '40px' }}
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh Pasar</span>
            </button>
          </div>
        </div>

        {/* 1. HORIZONTAL MARKET TICKER */}
        <div className="bg-white dark:bg-[#0b0f19] border border-slate-200/80 dark:border-white/10 rounded-2xl p-4 shadow-xs overflow-hidden transition-colors">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100 dark:border-white/5">
            <TrendingUp className="h-4 w-4 text-[#0f766e] dark:text-teal-400" />
            <span className="text-[11px] font-black uppercase text-[#0f766e] dark:text-teal-400 tracking-wider font-mono">Indikator Pasar Terkini (Real-time)</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {marketIndices.map((idx) => {
              const isUp = idx.trend === 'up';
              return (
                <div 
                  key={idx.name}
                  className="bg-slate-50/80 dark:bg-slate-950/40 border border-slate-100 dark:border-white/5 rounded-xl p-2.5 text-center transition hover:border-slate-300 dark:hover:border-white/20"
                >
                  <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 block truncate">{idx.name}</span>
                  <span className="text-xs font-black text-slate-800 dark:text-slate-200 block mt-0.5 font-mono">{idx.value}</span>
                  <span className={`text-[9px] font-mono font-bold block ${isUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                    {idx.change}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. NEWS FILTERS CATEGORIES (HORIZONTAL CONTAINER) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 font-mono shrink-0 uppercase">Kategori:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition shrink-0 ${
                activeCategory === cat 
                  ? 'bg-[#0f766e] dark:bg-teal-600 text-white shadow-sm' 
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
              style={{ minHeight: '32px' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3. CORE TWO-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left">
          
          {/* LEFT: NEWS ARTICLE FEED & SEARCH */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Search inputs */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                placeholder="Cari berita keuangan, analisis emiten, regulasi pajak..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-100 rounded-xl pl-9 pr-4 py-2.5 text-xs font-sans focus:outline-none focus:border-[#0f766e] dark:focus:border-teal-500 focus:ring-1 focus:ring-[#0f766e] dark:focus:ring-teal-500 shadow-xs"
              />
            </div>

            {/* Articles List */}
            <div className="space-y-4">
              {filteredNews.length === 0 ? (
                <div className="bg-white dark:bg-[#0b0f19] border border-slate-200/80 dark:border-white/10 rounded-2xl p-10 text-center text-slate-500 dark:text-slate-400 text-xs font-mono">
                  Belum ada berita yang cocok di kategori <strong className="text-[#0f766e] dark:text-teal-400">"{activeCategory}"</strong> dengan kata kunci "{searchQuery}".
                </div>
              ) : (
                filteredNews.map((news) => (
                  <div 
                    key={news.id} 
                    className="bg-white dark:bg-[#0b0f19] border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 hover:border-[#0f766e]/30 dark:hover:border-teal-500/30 transition shadow-xs flex flex-col md:flex-row gap-4 items-start"
                  >
                    {/* Editorial Category Tag and Left Info */}
                    <div className="md:w-3/12 flex md:flex-col justify-between md:justify-start gap-2 border-b md:border-b-0 md:border-r border-slate-100 dark:border-white/5 pb-2.5 md:pb-0 md:pr-4 shrink-0">
                      <div>
                        <span className="inline-block bg-[#0f766e]/10 dark:bg-teal-500/10 text-[#0f766e] dark:text-teal-400 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                          {news.category}
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-2">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{news.time}</span>
                        </div>
                      </div>
                      
                      <div className="text-right md:text-left md:mt-3">
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-mono">Dampak Pasar</span>
                        <span className={`text-xs font-black font-mono inline-block mt-0.5 px-2 py-0.2 rounded ${
                          news.sentiment === 'positif' ? 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/30' :
                          news.sentiment === 'negatif' ? 'bg-rose-100 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-900/30' :
                          'bg-amber-100 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900/30'
                        }`}>
                          {news.impactScore} / 10
                        </span>
                      </div>
                    </div>

                    {/* Editorial Core Content */}
                    <div className="flex-1 text-left space-y-2">
                      <h3 className="font-display font-black text-sm text-slate-900 dark:text-slate-100 leading-snug hover:text-[#0f766e] dark:hover:text-teal-400 transition cursor-pointer">
                        {news.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                        {news.summary}
                      </p>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-slate-50 dark:border-white/5 text-[10px] text-slate-400 dark:text-slate-500">
                        <span className="font-mono">Sumber: <strong className="text-slate-600 dark:text-slate-300">{news.source}</strong></span>
                        <span className="flex items-center gap-1 font-mono">
                          <Eye className="h-3.5 w-3.5" />
                          <strong className="text-slate-600 dark:text-slate-300">{news.views.toLocaleString()}</strong> pembaca
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>

          {/* RIGHT: MARKET SUMMARY CHART & ECONOMIC CALENDAR */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* MINI CHART PANEL */}
            <div className="bg-white dark:bg-[#0b0f19] border border-slate-200/80 dark:border-white/10 rounded-2xl p-4 shadow-xs text-left">
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-white/5 pb-2">
                <span className="text-xs font-black uppercase text-[#0f766e] dark:text-teal-400 font-mono tracking-wider">Pergerakan Tren Hari Ini</span>
                <div className="flex gap-1.5">
                  {(['IHSG', 'USDIDR', 'Emas', 'Bitcoin'] as any).map((name: string) => (
                    <button
                      key={name}
                      onClick={() => setActiveChartIndex(name as any)}
                      className={`px-2 py-0.5 rounded text-[9px] font-black transition ${
                        activeChartIndex === name 
                          ? 'bg-[#0f766e] dark:bg-teal-600 text-white shadow-xs' 
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                      }`}
                      style={{ minHeight: '24px' }}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart container */}
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData[activeChartIndex]} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isThemeDark ? '#1e293b' : '#e2e8f0'} />
                    <XAxis dataKey="date" stroke={isThemeDark ? '#475569' : '#94a3b8'} fontSize={9} />
                    <YAxis stroke={isThemeDark ? '#475569' : '#94a3b8'} fontSize={9} domain={['auto', 'auto']} />
                    <Tooltip contentStyle={{ backgroundColor: isThemeDark ? '#0f172a' : '#ffffff', borderColor: isThemeDark ? '#334155' : '#e2e8f0', borderRadius: '8px', fontSize: '11px', color: isThemeDark ? '#f1f5f9' : '#000000' }} />
                    <Area type="monotone" dataKey="value" stroke={isThemeDark ? '#2dd4bf' : '#0f766e'} fillOpacity={0.1} fill="url(#colorNewsChart)" strokeWidth={2} />
                    <defs>
                      <linearGradient id="colorNewsChart" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={isThemeDark ? '#2dd4bf' : '#0f766e'} stopOpacity={0.15}/>
                        <stop offset="95%" stopColor={isThemeDark ? '#2dd4bf' : '#0f766e'} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-3 bg-slate-50 dark:bg-slate-950/40 p-2.5 rounded-xl text-[9px] text-slate-400 dark:text-slate-500 leading-normal border border-slate-100 dark:border-white/5 flex items-start gap-1.5 font-mono">
                <Sparkles className="h-3.5 w-3.5 text-[#0f766e] dark:text-teal-400 shrink-0 mt-0.5 animate-pulse" />
                <span>Indikasi fluktuasi pasar normal berdasarkan volume perdagangan harian penutupan spot regional Jabar.</span>
              </div>
            </div>

            {/* ECONOMIC CALENDAR PANEL */}
            <div className="bg-white dark:bg-[#0b0f19] border border-slate-200/80 dark:border-white/10 rounded-2xl p-4 shadow-xs text-left">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100 dark:border-white/5">
                <Calendar className="h-4 w-4 text-[#0f766e] dark:text-teal-400" />
                <span className="text-xs font-black uppercase text-[#0f766e] dark:text-teal-400 font-mono tracking-wider">Kalender Ekonomi Nasional</span>
              </div>

              <div className="space-y-3">
                {economicCalendar.map((cal, idx) => (
                  <div 
                    key={idx}
                    className={`p-3 rounded-xl border transition ${
                      cal.active 
                        ? 'bg-slate-50/50 dark:bg-slate-950/40 border-[#0f766e]/30 dark:border-teal-500/20' 
                        : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-white/5'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                      <span className="text-[#0f766e] dark:text-teal-400">{cal.date} • {cal.time}</span>
                      <span className={`px-1.5 py-0.2 rounded text-[8px] uppercase tracking-wide ${
                        cal.impact === 'Tinggi' ? 'bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 font-extrabold' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}>
                        {cal.impact} Impact
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">{cal.event}</h4>
                    <div className="flex gap-4 text-[9px] text-slate-400 dark:text-slate-500 mt-1 font-mono">
                      <span>Sebelumnya: <strong className="text-slate-600 dark:text-slate-300">{cal.prev}</strong></span>
                      <span>Prediksi: <strong className="text-slate-600 dark:text-slate-300">{cal.forecast}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SUBSCRIBER ADVERTISEMENT ZONE (Clean & Editorial) */}
            <div className="bg-gradient-to-br from-[#0f766e] to-[#042f2e] text-white p-5 rounded-2xl shadow-md text-left space-y-4">
              <div>
                <span className="text-[9px] bg-white/20 border border-white/20 text-white font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-widest block w-max">
                  Dukungan Jurnalisme Independen
                </span>
                <h3 className="font-display font-black text-base text-white mt-2 leading-snug">
                  Dapatkan Insight Makro &amp; Dashboard Finansial Pro
                </h3>
                <p className="text-white/80 text-[11px] leading-relaxed mt-1">
                  Buka akses tanpa batas ke Financial Intelligence Terminal dengan simulasi visual siber-prediktor dan riset analitik.
                </p>
              </div>

              <button 
                onClick={() => {
                  const section = document.getElementById('premium-trial-showcase-section');
                  if (section) section.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full bg-white text-[#0f766e] hover:bg-slate-50 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow"
                style={{ minHeight: '40px' }}
              >
                <span>Aktifkan Trial Premium</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
