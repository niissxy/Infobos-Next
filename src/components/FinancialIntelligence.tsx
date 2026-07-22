import React, { useState, useEffect } from 'react';
import { 
  Terminal, TrendingUp, TrendingDown, Layers, Database, ShieldAlert, Cpu, 
  Search, Sliders, PlayCircle, Eye, AlertCircle, Share2, Download, RefreshCw, 
  Briefcase, BarChart2, DollarSign, Activity, Percent, Calendar, FileText, Check, 
  Trash2, Plus, Star, ArrowUpRight, HelpCircle, Sparkles, BookOpen, Clock, Layout
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

interface StockItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  marketCap: string;
  pe: number;
  pbv: number;
  sector: 'Finansial' | 'Teknologi' | 'Infrastruktur' | 'Konsumer';
  unlockedReport: boolean;
}

interface FilingItem {
  id: string;
  symbol: string;
  type: string;
  date: string;
  desc: string;
}

export default function FinancialIntelligence() {
  // Navigation & Sub-dashboard state
  const [activeDashboardTab, setActiveDashboardTab] = useState<'market' | 'company' | 'economic' | 'portfolio' | 'risk'>('market');
  
  // Terminal inputs
  const [selectedSymbol, setSelectedSymbol] = useState<string>('TLKM');
  const [screenerSector, setScreenerSector] = useState<string>('Semua');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string | null>(null);
  
  // Custom interactive tools states
  const [watchlist, setWatchlist] = useState<string[]>(['BBRI', 'TLKM', 'ASII']);
  const [newWatchItem, setNewWatchItem] = useState('');
  const [forecastYears, setForecastYears] = useState<number>(3);
  const [simulatedGrowthRate, setSimulatedGrowthRate] = useState<number>(10); // %

  // Alert State
  const [alertSymbol, setAlertSymbol] = useState('TLKM');
  const [alertPrice, setAlertPrice] = useState('4200');
  const [alerts, setAlerts] = useState<{ id: string; symbol: string; price: number; type: 'above' | 'below' }[]>([
    { id: 'al-1', symbol: 'BBRI', price: 5100, type: 'above' }
  ]);

  // Mock Stock market data se-Jawa Barat & Nasional
  const stockDatabase: Record<string, StockItem> = {
    TLKM: { symbol: 'TLKM', name: 'Telkom Indonesia Tbk', price: 3820, change: 1.45, marketCap: 'Rp 378 Triliun', pe: 14.2, pbv: 2.8, sector: 'Infrastruktur', unlockedReport: true },
    BBRI: { symbol: 'BBRI', name: 'Bank Rakyat Indonesia Tbk', price: 4980, change: -0.85, marketCap: 'Rp 746 Triliun', pe: 12.8, pbv: 2.1, sector: 'Finansial', unlockedReport: true },
    ASII: { symbol: 'ASII', name: 'Astra International Tbk', price: 5450, change: 0.55, marketCap: 'Rp 220 Triliun', pe: 8.4, pbv: 1.1, sector: 'Konsumer', unlockedReport: true },
    GOTO: { symbol: 'GOTO', name: 'GoTo Gojek Tokopedia Tbk', price: 64, change: 3.22, marketCap: 'Rp 76 Triliun', pe: -4.5, pbv: 0.8, sector: 'Teknologi', unlockedReport: false },
    BJB: { symbol: 'BJBR', name: 'Bank Pembangunan Daerah Jabar Tbk', price: 1120, change: 0.90, marketCap: 'Rp 11.4 Triliun', pe: 7.2, pbv: 0.95, sector: 'Finansial', unlockedReport: true },
    MEDC: { symbol: 'MEDC', name: 'Medco Energi Internasional Tbk', price: 1340, change: -1.25, marketCap: 'Rp 33.7 Triliun', pe: 6.8, pbv: 1.2, sector: 'Infrastruktur', unlockedReport: false }
  };

  // IDX / SEC Filing reports timeline
  const idxFilings: FilingItem[] = [
    { id: 'fl-1', symbol: 'BJBR', type: 'Laporan Triwulan I 2026', date: '2026-06-25', desc: 'Rincian peningkatan penyaluran KPR Sejahtera Jawa Barat.' },
    { id: 'fl-2', symbol: 'TLKM', type: 'Annual Report 2025', date: '2026-06-12', desc: 'Informasi penggelaran infrastruktur fiber optik trans-nasional Jabar-Priangan.' },
    { id: 'fl-3', symbol: 'ASII', type: 'Keterbukaan Informasi', date: '2026-05-30', desc: 'Akuisisi saham baru perusahaan pembangkit listrik tenaga angin.' },
    { id: 'fl-4', symbol: 'BBRI', type: 'Corporate Presentation Q2', date: '2026-05-18', desc: 'Pemaparan komitmen digitalisasi mikro pembiayaan pedesaan.' }
  ];

  // Technical chart data points
  const terminalChartPoints = [
    { time: '10:00', price: 3740, volume: 1540 },
    { time: '11:00', price: 3760, volume: 2100 },
    { time: '12:00', price: 3750, volume: 1800 },
    { time: '13:00', price: 3790, volume: 3200 },
    { time: '14:00', price: 3810, volume: 4100 },
    { time: '15:00', price: 3820, volume: 5600 },
    { time: '16:00', price: 3835, volume: 7200 }
  ];

  // Economic indicators (Macro Dashboard)
  const macroIndicators = [
    { name: 'Pertumbuhan PDRB Jabar', value: '5.24%', trend: 'up', forecast: '5.30%' },
    { name: 'Tingkat Inflasi Daerah', value: '1.84%', trend: 'down', forecast: '1.95%' },
    { name: 'Suku Bunga BI-Rate', value: '6.25%', trend: 'neutral', forecast: '6.25%' },
    { name: 'Cadangan Devisa RI', value: '$139.4 Miliar', trend: 'up', forecast: '$141.0 M' },
    { name: 'Arus Penanaman Modal (PMA)', value: 'Rp 65.2 Triliun', trend: 'up', forecast: 'Rp 70.0 T' }
  ];

  // Watchlist handlers
  const handleAddToWatchlist = () => {
    if (!newWatchItem.trim()) return;
    const item = newWatchItem.toUpperCase();
    if (!watchlist.includes(item)) {
      setWatchlist([...watchlist, item]);
    }
    setNewWatchItem('');
  };

  const handleRemoveFromWatchlist = (sym: string) => {
    setWatchlist(watchlist.filter(x => x !== sym));
  };

  // Alert triggers handlers
  const handleCreateAlert = () => {
    if (!alertSymbol.trim() || !alertPrice) return;
    const parsedPrice = parseFloat(alertPrice);
    if (!isNaN(parsedPrice)) {
      setAlerts([...alerts, {
        id: 'al-' + Date.now(),
        symbol: alertSymbol.toUpperCase(),
        price: parsedPrice,
        type: 'above'
      }]);
    }
  };

  // Run AI valuation forecast terminal
  const runAiTerminalAnalysis = () => {
    setIsAiLoading(true);
    setAiAnalysisResult(null);
    setTimeout(() => {
      setIsAiLoading(false);
      const stock = stockDatabase[selectedSymbol] || stockDatabase['TLKM'];
      setAiAnalysisResult(
        `[TERMINAL EXTRAS AI PREDICTOR v4.1]
REKOMENDASI ANALIS: ${stock.symbol} (${stock.name}).
Valuasi PE (${stock.pe}x) berada di tingkat ${stock.pe < 12 ? 'Diskon (Under-valued)' : 'Premium (Fairly-valued)'} dibanding industri sejenis regional Jabar.
Skenario proyeksi pertumbuhan ${simulatedGrowthRate}% selama ${forecastYears} tahun menghasilkan target harga wajar baru pada level Rp ${(stock.price * Math.pow(1 + (simulatedGrowthRate/100), forecastYears)).toFixed(0)} per lembar saham. 
Rekomendasi taktis: HOLD dengan akumulasi bertahap jika menembus harga terbawah mingguan.`
      );
    }, 1500);
  };

  // Generate forecast simulation chart data
  const getForecastSimulationData = () => {
    const stock = stockDatabase[selectedSymbol] || stockDatabase['TLKM'];
    const currentPrice = stock.price;
    const data = [{ year: 'Saat Ini', Nilai: currentPrice }];
    let val = currentPrice;
    for (let i = 1; i <= forecastYears; i++) {
      val = val * (1 + (simulatedGrowthRate / 100));
      data.push({
        year: `Tahun +${i}`,
        Nilai: Math.round(val)
      });
    }
    return data;
  };

  return (
    <div className="bg-[#040815] text-[#8ea8d0] min-h-screen py-6 font-mono selection:bg-indigo-500 selection:text-white" id="financial-intelligence-terminal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        
        {/* UPPER STATUS BAR (Bloomberg Style Header) */}
        <div className="border border-[#1e3a8a]/40 bg-[#091026] p-3 rounded-xl flex flex-col md:flex-row md:items-center justify-between text-[11px] gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-white bg-[#1e3a8a] px-2 py-0.5 rounded uppercase font-black tracking-widest text-[10px]">
              <Terminal className="h-3.5 w-3.5" />
              FINANCE TERMINAL OS
            </span>
            <span className="text-[#38bdf8] font-bold">● TERMINAL ONLINE</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">FEED: BEI (IDX) INTERFACE</span>
          </div>

          <div className="flex items-center gap-4 text-[10px]">
            <span>USD/IDR: <strong className="text-emerald-400">16,345.00</strong></span>
            <span>IHSG: <strong className="text-emerald-400">7,284.10 (+0.54%)</strong></span>
            <span>JABAR PMA: <strong className="text-[#38bdf8]">Rp 65.2 T (Target 92%)</strong></span>
          </div>
        </div>

        {/* CORE CONTAINER WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch text-left">
          
          {/* LEFT COMMAND PANEL: NAVIGATION, STOCK SELECTOR & SCREENER (4 cols) */}
          <div className="lg:col-span-4 bg-[#091026] border border-[#1e3a8a]/30 rounded-2xl p-4 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              
              {/* Dashboard sub-categories selector */}
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block mb-2.5">
                  📂 TERMINAL CONSOLES
                </span>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-black">
                  {[
                    { id: 'market', label: '📊 Market Terminal' },
                    { id: 'company', label: '🏛️ Corp Dashboard' },
                    { id: 'economic', label: '🌾 Macro Economic' },
                    { id: 'portfolio', label: '📁 Portofolio Tracker' },
                    { id: 'risk', label: '🛡️ Risk & Forecast' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveDashboardTab(tab.id as any)}
                      className={`py-2 px-2.5 rounded-lg border text-left transition flex items-center justify-between ${
                        activeDashboardTab === tab.id 
                          ? 'bg-[#1e3a8a]/40 text-white border-[#38bdf8]/50' 
                          : 'bg-slate-950/40 border-white/5 text-[#8ea8d0] hover:text-white hover:bg-slate-900'
                      }`}
                      style={{ minHeight: '36px' }}
                    >
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Symbol selector box */}
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block mb-2">
                  🔎 SELECT TRADING SYMBOL
                </span>
                <div className="relative">
                  <select
                    value={selectedSymbol}
                    onChange={(e) => setSelectedSymbol(e.target.value)}
                    className="w-full bg-slate-950 border border-[#1e3a8a]/40 text-white font-bold focus:outline-none focus:border-[#38bdf8] rounded-xl px-3 py-2 text-xs cursor-pointer"
                  >
                    {Object.keys(stockDatabase).map(sym => (
                      <option key={sym} value={sym}>
                        {sym} - {stockDatabase[sym].name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Stock Screener tool */}
              <div className="bg-slate-950/60 p-3 rounded-xl border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-[#38bdf8] font-bold uppercase">📊 IDX SCREENER UNIT</span>
                  <Sliders className="h-3.5 w-3.5 text-slate-500" />
                </div>
                <div className="space-y-2 text-[10px]">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Filter Sektor:</span>
                    <select
                      value={screenerSector}
                      onChange={(e) => setScreenerSector(e.target.value)}
                      className="bg-slate-900 border border-[#1e3a8a]/20 text-[10px] text-white py-0.5 rounded cursor-pointer"
                    >
                      <option value="Semua">Semua Sektor</option>
                      <option value="Finansial">Finansial</option>
                      <option value="Teknologi">Teknologi</option>
                      <option value="Infrastruktur">Infrastruktur</option>
                      <option value="Konsumer">Konsumer</option>
                    </select>
                  </div>
                  
                  {/* Miniature result feed */}
                  <div className="space-y-1.5 pt-2 border-t border-white/5 max-h-36 overflow-y-auto">
                    {Object.values(stockDatabase)
                      .filter(st => screenerSector === 'Semua' || st.sector === screenerSector)
                      .map(st => (
                        <div 
                          key={st.symbol}
                          onClick={() => setSelectedSymbol(st.symbol)}
                          className={`flex justify-between p-1.5 rounded cursor-pointer transition text-[9px] ${
                            selectedSymbol === st.symbol ? 'bg-[#1e3a8a]/20 border border-[#1e3a8a]/40' : 'hover:bg-slate-900'
                          }`}
                        >
                          <span className="font-bold text-white">{st.symbol}</span>
                          <span className="text-slate-400">{st.sector}</span>
                          <span className={st.change >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                            {st.change >= 0 ? '+' : ''}{st.change}%
                          </span>
                        </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Alerts creator */}
              <div className="bg-slate-950/60 p-3 rounded-xl border border-white/5 space-y-2">
                <span className="text-[10px] text-[#38bdf8] font-bold uppercase block">🔔 ALERTS MANAGER</span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={alertSymbol}
                    onChange={(e) => setAlertSymbol(e.target.value)}
                    placeholder="TLKM"
                    className="bg-slate-900 border border-[#1e3a8a]/20 text-[10px] text-white p-1 rounded font-bold uppercase text-center"
                  />
                  <input
                    type="number"
                    value={alertPrice}
                    onChange={(e) => setAlertPrice(e.target.value)}
                    placeholder="4200"
                    className="bg-slate-900 border border-[#1e3a8a]/20 text-[10px] text-white p-1 rounded font-mono text-center"
                  />
                </div>
                <button
                  onClick={handleCreateAlert}
                  className="w-full py-1 bg-indigo-900/60 hover:bg-indigo-900 text-indigo-300 font-bold border border-indigo-700/50 text-[9px] uppercase rounded-lg tracking-wider"
                  style={{ minHeight: '28px' }}
                >
                  Buat Alert Pemicu Harga
                </button>
              </div>

            </div>

            {/* Watchlist Manager Bottom section */}
            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-[#1e3a8a]/20 space-y-2">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block">⭐ PERSONAL WATCHLIST</span>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="ADD SYMBOL"
                  value={newWatchItem}
                  onChange={(e) => setNewWatchItem(e.target.value)}
                  className="bg-slate-900 border border-white/10 text-[10px] text-white px-2 py-1 rounded flex-1 uppercase"
                />
                <button 
                  onClick={handleAddToWatchlist}
                  className="bg-emerald-800 hover:bg-emerald-700 text-white px-2 py-1 rounded text-[10px] font-bold"
                  style={{ minHeight: '28px' }}
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>

              <div className="space-y-1 max-h-24 overflow-y-auto">
                {watchlist.map(sym => {
                  const s = stockDatabase[sym];
                  return (
                    <div key={sym} className="flex justify-between items-center text-[9px] bg-slate-900 p-1.5 rounded border border-white/5">
                      <span className="font-bold text-slate-100">{sym}</span>
                      {s ? (
                        <>
                          <span className="font-mono text-slate-400">Rp {s.price}</span>
                          <span className={s.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                            {s.change >= 0 ? '▲' : '▼'} {Math.abs(s.change)}%
                          </span>
                        </>
                      ) : (
                        <span className="text-slate-500 font-sans">Belum Terdaftar</span>
                      )}
                      <button 
                        onClick={() => handleRemoveFromWatchlist(sym)}
                        className="text-slate-500 hover:text-rose-400 transition"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT SCREEN: MAIN TERMINAL ACTIVE DASHBOARD VIEW (8 cols) */}
          <div className="lg:col-span-8 bg-[#091026] border border-[#1e3a8a]/30 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
            
            {/* TAB-SPECIFIC CONTENT LAYOUT */}
            <div className="space-y-5">
              
              {/* TAB 1: MARKET TERMINAL (Interactive Charting) */}
              {activeDashboardTab === 'market' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex justify-between items-center border-b border-[#1e3a8a]/20 pb-2.5">
                    <div>
                      <span className="text-[10px] text-[#38bdf8] block font-mono font-bold uppercase tracking-wider">AKTIVITAS PASAR UTAMA</span>
                      <h2 className="text-base font-black text-white mt-1">
                        Grafik Interaktif Spot: <span className="text-emerald-400">{selectedSymbol}</span> ({stockDatabase[selectedSymbol]?.name || 'N/A'})
                      </h2>
                    </div>
                    <div className="text-right text-[10px]">
                      <span className="text-slate-400 block font-mono">Arus Harga Live</span>
                      <strong className="text-lg text-emerald-400 font-mono">
                        Rp {stockDatabase[selectedSymbol]?.price.toLocaleString() || '0'}
                      </strong>
                    </div>
                  </div>

                  {/* High Quality Area Chart */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-white/5">
                    <span className="text-[10px] text-slate-500 block mb-3 font-mono font-bold">HISTORIS INTRADAY (VOLUME VS HARGA)</span>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={terminalChartPoints} margin={{ top: 10, right: 5, left: -10, bottom: 0 }}>
                          <XAxis dataKey="time" stroke="#475569" fontSize={9} />
                          <YAxis stroke="#475569" fontSize={9} domain={['auto', 'auto']} />
                          <Tooltip contentStyle={{ backgroundColor: '#091026', borderColor: '#1e3a8a', color: '#fff', fontSize: '11px' }} />
                          <Area type="monotone" dataKey="price" stroke="#38bdf8" fillOpacity={0.15} fill="url(#colorMarketChart)" strokeWidth={2.5} />
                          <defs>
                            <linearGradient id="colorMarketChart" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.25}/>
                              <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Stock details summary bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-white/5">
                      <span className="text-[9px] text-slate-500 block">KAPITALISASI PASAR</span>
                      <span className="text-xs font-black text-white font-mono">{stockDatabase[selectedSymbol]?.marketCap || 'N/A'}</span>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-white/5">
                      <span className="text-[9px] text-slate-500 block">RASIO P/E</span>
                      <span className="text-xs font-black text-white font-mono">{stockDatabase[selectedSymbol]?.pe || 'N/A'}x</span>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-white/5">
                      <span className="text-[9px] text-slate-500 block">RASIO PBV</span>
                      <span className="text-xs font-black text-white font-mono">{stockDatabase[selectedSymbol]?.pbv || 'N/A'}x</span>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-white/5">
                      <span className="text-[9px] text-slate-500 block">SEKTOR BEI</span>
                      <span className="text-xs font-black text-white font-mono">{stockDatabase[selectedSymbol]?.sector || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: COMPANY DASHBOARD (Filing IDX, SEC & Statements) */}
              {activeDashboardTab === 'company' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="border-b border-[#1e3a8a]/20 pb-2">
                    <span className="text-[10px] text-[#38bdf8] block font-mono font-bold uppercase">CORPORATE REPORT CARD</span>
                    <h2 className="text-base font-black text-white mt-1">Laporan Keuangan &amp; Dokumen Keterbukaan IDX</h2>
                  </div>

                  {/* IDX Filings timeline tracker */}
                  <div className="space-y-2.5">
                    <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-widest">📋 Rilis Dokumen Resmi Emiten Terbaru</span>
                    {idxFilings.map((fl) => (
                      <div key={fl.id} className="bg-slate-950 p-3 rounded-xl border border-white/5 flex justify-between items-start gap-4">
                        <div className="space-y-1 text-left">
                          <span className="text-[9px] bg-[#1e3a8a]/30 text-[#38bdf8] px-1.5 py-0.2 rounded border border-[#1e3a8a]/50 font-bold font-mono">
                            {fl.symbol} • {fl.type}
                          </span>
                          <p className="text-xs font-bold text-slate-200 mt-1.5">{fl.desc}</p>
                        </div>
                        <div className="text-right text-[10px] text-slate-500 shrink-0 font-mono">
                          <span>Tanggal: {fl.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Premium simulated statement detail */}
                  <div className="bg-[#1e3a8a]/10 border border-[#1e3a8a]/40 p-4 rounded-xl space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-[#38bdf8] font-bold">📊 LAPORAN POSISI KEUANGAN (NERACA - SIMULASI)</span>
                      <span className="text-[9px] text-slate-400 font-mono">Mata uang: Jutaan Rupiah (IDR)</span>
                    </div>
                    <div className="space-y-1.5 text-xs font-mono text-slate-300">
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span>Total Aset Lancar</span>
                        <span className="text-white font-bold">142,500,000</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span>Liabilitas Jangka Pendek</span>
                        <span className="text-white font-bold">64,210,000</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span>Ekuitas Bersih Pemegang Saham</span>
                        <span className="text-white font-bold">78,290,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rasio Kas Likuiditas</span>
                        <span className="text-emerald-400 font-bold">2.21x</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: MACRO ECONOMIC DASHBOARD */}
              {activeDashboardTab === 'economic' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="border-b border-[#1e3a8a]/20 pb-2">
                    <span className="text-[10px] text-[#38bdf8] block font-mono font-bold uppercase">MACRO INDICATOR TERMINAL</span>
                    <h2 className="text-base font-black text-white mt-1">Indikator Makro Ekonomi Jawa Barat &amp; Nasional</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Indicators list */}
                    <div className="space-y-3">
                      <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-widest">📊 Metrik Makro Aktual</span>
                      {macroIndicators.map((macro, index) => (
                        <div key={index} className="bg-slate-950 p-3 rounded-xl border border-white/5 flex justify-between items-center">
                          <div className="text-left">
                            <span className="text-xs text-slate-300 font-bold block">{macro.name}</span>
                            <span className="text-[9px] text-slate-500 font-mono block mt-0.5">Skenario Forecast: {macro.forecast}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-black text-white font-mono">{macro.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Regional Investment Recharts bar graph */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-white/5 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-slate-500 block font-bold mb-3">TREN PENANAMAN MODAL PMA JABAR (TRILIUN RP)</span>
                        <div className="h-44 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[
                              { year: '2023', PMA: 48 }, { year: '2024', PMA: 54 }, 
                              { year: '2025', PMA: 61 }, { year: '2026', PMA: 65 }
                            ]}>
                              <XAxis dataKey="year" stroke="#475569" fontSize={10} />
                              <YAxis stroke="#475569" fontSize={10} />
                              <Bar dataKey="PMA" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <p className="text-[9px] text-slate-500 leading-normal font-sans text-center mt-2">
                        Sumber: Badan Koordinasi Penanaman Modal (BKPM) &amp; Bappeda Prov. Jawa Barat.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: PORTFOLIO TRACKER */}
              {activeDashboardTab === 'portfolio' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="border-b border-[#1e3a8a]/20 pb-2">
                    <span className="text-[10px] text-[#38bdf8] block font-mono font-bold uppercase">VIRTUAL PORTFOLIO SIMULATOR</span>
                    <h2 className="text-base font-black text-white mt-1">Papan Monitoring Alokasi Investasi Anda</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-950 p-3.5 rounded-xl border border-white/5 text-center">
                      <span className="text-[9px] text-slate-500 block">TOTAL EST. PORTFOLIO</span>
                      <strong className="text-base text-[#38bdf8] font-mono block mt-1">Rp 124,500,000</strong>
                    </div>
                    <div className="bg-slate-950 p-3.5 rounded-xl border border-white/5 text-center">
                      <span className="text-[9px] text-slate-500 block">YIELD KEUNTUNGAN (P&amp;L)</span>
                      <strong className="text-base text-emerald-400 font-mono block mt-1">+Rp 8,420,000 (+7.2%)</strong>
                    </div>
                    <div className="bg-slate-950 p-3.5 rounded-xl border border-white/5 text-center">
                      <span className="text-[9px] text-slate-500 block">TINGKAT RISIKO</span>
                      <strong className="text-base text-amber-400 font-mono block mt-1">Menengah-Rendah</strong>
                    </div>
                  </div>

                  {/* Portfolio holding table mock */}
                  <div className="bg-slate-950 rounded-xl border border-white/5 overflow-hidden text-[10px]">
                    <div className="bg-[#091026] p-2.5 font-bold flex border-b border-white/5 text-slate-400">
                      <div className="flex-1">Instrumen Holding</div>
                      <div className="w-24 text-right">Rasio Bobot</div>
                      <div className="w-24 text-right">Harga Beli</div>
                      <div className="w-24 text-right">P&amp;L Aktual</div>
                    </div>
                    <div className="divide-y divide-white/5">
                      {[
                        { name: 'SBN Ritel ORI026', weight: '40%', buyPrice: 'Rp 50,000,000', pnl: '0.00% (Fixed)' },
                        { name: 'Saham BBRI Tbk', weight: '30%', buyPrice: 'Rp 37,200,000', pnl: '+5.40% (Up)' },
                        { name: 'Saham TLKM Tbk', weight: '20%', buyPrice: 'Rp 24,800,000', pnl: '+12.50% (Up)' },
                        { name: 'ETF Indeks LQ45', weight: '10%', buyPrice: 'Rp 12,500,000', pnl: '-2.15% (Down)' }
                      ].map((item, idx) => (
                        <div key={idx} className="p-2.5 flex justify-between items-center">
                          <div className="flex-1 font-bold text-white">{item.name}</div>
                          <div className="w-24 text-right font-mono text-slate-300">{item.weight}</div>
                          <div className="w-24 text-right font-mono text-slate-300">{item.buyPrice}</div>
                          <div className="w-24 text-right font-mono text-emerald-400 font-bold">{item.pnl}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: RISK & FORECAST SIMULATOR */}
              {activeDashboardTab === 'risk' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="border-b border-[#1e3a8a]/20 pb-2">
                    <span className="text-[10px] text-[#38bdf8] block font-mono font-bold uppercase">STRESS TEST &amp; GROW SIMULATOR</span>
                    <h2 className="text-base font-black text-white mt-1">Skenario Prediksi Pertumbuhan Valuasi Emiten</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
                    
                    {/* Controls */}
                    <div className="md:col-span-5 bg-slate-950 p-4 rounded-xl border border-white/5 space-y-4 text-left text-xs">
                      <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-widest">🎛️ Konfigurasi Parameter</span>
                      
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono text-[10px]">
                          <span>Rentang Proyeksi:</span>
                          <strong className="text-white">{forecastYears} Tahun</strong>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={forecastYears}
                          onChange={(e) => setForecastYears(parseInt(e.target.value))}
                          className="w-full accent-indigo-500 bg-slate-900 cursor-pointer"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono text-[10px]">
                          <span>Prediksi CAGR:</span>
                          <strong className="text-emerald-400">{simulatedGrowthRate}% / tahun</strong>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="30"
                          value={simulatedGrowthRate}
                          onChange={(e) => setSimulatedGrowthRate(parseInt(e.target.value))}
                          className="w-full accent-indigo-500 bg-slate-900 cursor-pointer"
                        />
                      </div>

                      <button
                        onClick={runAiTerminalAnalysis}
                        disabled={isAiLoading}
                        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-black uppercase text-[10px] rounded-lg shadow-md tracking-wider flex items-center justify-center gap-2"
                        style={{ minHeight: '40px' }}
                      >
                        {isAiLoading ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            <span>MENGKALKULASI VALUASI...</span>
                          </>
                        ) : (
                          <>
                            <Cpu className="h-4 w-4" />
                            <span>PROSES ANALISIS AI PINTAR</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Chart Result */}
                    <div className="md:col-span-7 bg-slate-950 p-4 rounded-xl border border-white/5 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-slate-500 block font-bold mb-3">GRAFIK PROYEKSI HARGA HARAPAN ({selectedSymbol})</span>
                        <div className="h-40 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={getForecastSimulationData()}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                              <XAxis dataKey="year" stroke="#475569" fontSize={9} />
                              <YAxis stroke="#475569" fontSize={9} />
                              <Tooltip contentStyle={{ backgroundColor: '#091026', borderColor: '#1e3a8a', fontSize: '10px' }} />
                              <Line type="monotone" dataKey="Nilai" stroke="#34d399" strokeWidth={3} dot={{ fill: '#34d399', r: 4 }} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div className="text-[9px] text-slate-500 text-center font-sans mt-2">
                        Grafik disimulasikan menggunakan rumus matematika eksponensial standar CAGR compound yield.
                      </div>
                    </div>

                  </div>

                  {/* AI Output Result Box */}
                  <AnimatePresence mode="wait">
                    {aiAnalysisResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="bg-indigo-950/40 border border-indigo-500/20 p-4 rounded-xl flex items-start gap-3 shadow-lg font-mono text-left"
                      >
                        <Sparkles className="h-5 w-5 text-amber-400 shrink-0 mt-0.5 animate-bounce" />
                        <div className="space-y-1">
                          <span className="text-[9px] bg-amber-400/20 text-amber-300 font-mono font-bold px-1.5 py-0.2 rounded border border-amber-400/30 uppercase tracking-widest block w-max">
                            AI Terminal Report
                          </span>
                          <pre className="text-[11px] text-[#8ea8d0] whitespace-pre-wrap font-mono leading-relaxed mt-1.5 font-bold">
                            {aiAnalysisResult}
                          </pre>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              )}

            </div>

            {/* LOWER STATUS / SUMMARY TERMINAL META FOOTER */}
            <div className="mt-5 pt-3 border-t border-[#1e3a8a]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-slate-500">
              <span className="flex items-center gap-1">
                <Database className="h-3.5 w-3.5 text-slate-500" />
                Data Source Status: <strong className="text-emerald-400 font-mono">99.98% Synced With BEI</strong>
              </span>
              <span>
                Terminal ID: <strong>IB-TERM-JABAR-092</strong>
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
