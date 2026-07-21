import React, { useState, useEffect } from 'react';
import { 
  Sparkles, TrendingUp, ShieldCheck, Map, Activity, Layers, 
  Lock, ArrowRight, Zap, Check, Star, RefreshCw, AlertTriangle, Info,
  LineChart, Database, Eye, Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Legend
} from 'recharts';

interface PremiumTrialShowcaseProps {
  onUpgradeSuccess?: (role: string) => void;
  simulatedRole?: string;
}

export default function PremiumTrialShowcase({ 
  onUpgradeSuccess,
  simulatedRole 
}: PremiumTrialShowcaseProps) {
  const [activeWidgetTab, setActiveWidgetTab] = useState<'ai-trends' | 'gis-spatial' | 'buzz-sentiment'>('ai-trends');
  
  // Widget 1: AI Trends state
  const [selectedTrendTopic, setSelectedTrendTopic] = useState<'gedung-sate' | 'pajak-digital' | 'infrastruktur-selatan'>('gedung-sate');
  const [isAiScanning, setIsAiScanning] = useState(false);
  const [aiReportResult, setAiReportResult] = useState<string | null>(null);
  
  // Widget 2: GIS state
  const [selectedGisNode, setSelectedGisNode] = useState<string>('patimban');
  const [gisScanStatus, setGisScanStatus] = useState<'idle' | 'scanning' | 'done'>('idle');
  const [liveGisCoords, setLiveGisCoords] = useState({ lat: -6.1452, lon: 107.9012, traffic: 1240 });

  // Widget 3: Buzz Sentiment states
  const [buzzTopic, setBuzzTopic] = useState('umum');
  const [isBuzzLoading, setIsBuzzLoading] = useState(false);
  const [buzzResults, setBuzzResults] = useState({ pos: 65, neu: 25, neg: 10, total: 2480 });

  // Subscription State (Interactive simulation)
  const [trialQuota, setTrialQuota] = useState(3);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'trial' | 'pro' | 'enterprise'>('pro');
  const [simulationStatus, setSimulationStatus] = useState<string | null>(null);

  // Data for Recharts Trend Predictor
  const trendDataMap = {
    'gedung-sate': [
      { day: 'Senin', positif: 45, negatif: 15, netral: 40 },
      { day: 'Selasa', positif: 55, negatif: 12, netral: 33 },
      { day: 'Rabu', positif: 68, negatif: 10, netral: 22 },
      { day: 'Kamis', positif: 72, negatif: 8, netral: 20 },
      { day: 'Jumat', positif: 80, negatif: 5, netral: 15 },
      { day: 'Sabtu', positif: 88, negatif: 4, netral: 8 },
      { day: 'Minggu', positif: 95, negatif: 2, netral: 3 },
    ],
    'pajak-digital': [
      { day: 'Senin', positif: 30, negatif: 40, netral: 30 },
      { day: 'Selasa', positif: 35, negatif: 38, netral: 27 },
      { day: 'Rabu', positif: 45, negatif: 30, netral: 25 },
      { day: 'Kamis', positif: 50, negatif: 25, netral: 25 },
      { day: 'Jumat', positif: 58, negatif: 22, netral: 20 },
      { day: 'Sabtu', positif: 65, negatif: 18, netral: 17 },
      { day: 'Minggu', positif: 74, negatif: 12, netral: 14 },
    ],
    'infrastruktur-selatan': [
      { day: 'Senin', positif: 50, negatif: 8, netral: 42 },
      { day: 'Selasa', positif: 54, negatif: 9, netral: 37 },
      { day: 'Rabu', positif: 62, negatif: 7, netral: 31 },
      { day: 'Kamis', positif: 60, negatif: 12, netral: 28 },
      { day: 'Jumat', positif: 69, negatif: 6, netral: 25 },
      { day: 'Sabtu', positif: 78, negatif: 5, netral: 17 },
      { day: 'Minggu', positif: 84, negatif: 3, netral: 13 },
    ]
  };

  const getGisNodeDetails = (id: string) => {
    switch (id) {
      case 'patimban': return {
        title: 'Pelabuhan Patimban (Mega Hub Rebana)',
        investment: 'Rp 43,2 Triliun',
        progress: 88,
        siberRisk: 'Rendah (Secured)',
        anomalyRate: '0.04%',
        impactScore: '9.8 / 10',
        coordinates: { lat: -6.2412, lon: 107.8210 }
      };
      case 'kertajati': return {
        title: 'BIJB Kertajati Hub Logistik Internasional',
        investment: 'Rp 21,5 Triliun',
        progress: 95,
        siberRisk: 'Sedang (Monitored)',
        anomalyRate: '0.12%',
        impactScore: '8.4 / 10',
        coordinates: { lat: -6.6542, lon: 108.2015 }
      };
      case 'geothermal': return {
        title: 'Pembangkit Panas Bumi Kamojang Garut',
        investment: 'Rp 14,8 Triliun',
        progress: 100,
        siberRisk: 'Sangat Aman',
        anomalyRate: '0.01%',
        impactScore: '9.2 / 10',
        coordinates: { lat: -7.1420, lon: 107.7812 }
      };
      default: return {
        title: 'Stasiun Kereta Cepat Tegalluar',
        investment: 'Rp 18,9 Triliun',
        progress: 98,
        siberRisk: 'Rendah',
        anomalyRate: '0.05%',
        impactScore: '9.0 / 10',
        coordinates: { lat: -6.9610, lon: 107.7123 }
      };
    }
  };

  // Simulate AI Report Scan
  const triggerAiScan = () => {
    if (trialQuota <= 0 && simulatedRole !== 'super_admin' && simulatedRole !== 'admin') {
      alert("Kuota trial gratis harian Anda telah habis! Silakan lakukan aktivasi trial premium di panel sebelah kanan.");
      return;
    }
    setIsAiScanning(true);
    setAiReportResult(null);

    setTimeout(() => {
      setIsAiScanning(false);
      setTrialQuota(prev => Math.max(0, prev - 1));
      if (selectedTrendTopic === 'gedung-sate') {
        setAiReportResult(
          "REKOMENDASI EKONOMI REDAKSI: Revitalisasi Koridor Sejarah Gedung Sate diproyeksikan mengerek omzet UMKM kuliner di Bandung Raya sebesar 32% dalam 6 bulan ke depan. Sentimen positif publik terkunci di level 85% menyusul komitmen pemeliharaan situs cagar budaya secara lestari."
        );
      } else if (selectedTrendTopic === 'pajak-digital') {
        setAiReportResult(
          "REKOMENDASI FINANSIAL REDAKSI: Implementasi insentif fiskal PMK Pajak Digital melunakkan beban kas perusahaan rintisan di Jawa Barat. Diprediksi terjadi kenaikan arus kas masuk (capital inflow) sebesar Rp 4,2 Triliun pada kuartal 3 2026. Prioritas mitigasi: pemenuhan compliance legal."
        );
      } else {
        setAiReportResult(
          "REKOMENDASI SPASIAL REDAKSI: Sektor Agroindustri Jabar Selatan berpotensi menyerap investasi baru senilai Rp 8,5 Triliun jika infrastruktur dermaga logistik terintegrasi rampung tepat waktu. Sentimen investor sangat stabil dengan tingkat kepuasan birokrasi perizinan mencapai 92%."
        );
      }
    }, 1500);
  };

  // Simulate GIS node radar scanning
  const scanGisNode = (nodeId: string) => {
    setSelectedGisNode(nodeId);
    setGisScanStatus('scanning');
    
    // Simulate coordinates jitter
    const interval = setInterval(() => {
      setLiveGisCoords({
        lat: Number((-6.5 - Math.random() * 0.8).toFixed(4)),
        lon: Number((107.5 + Math.random() * 0.9).toFixed(4)),
        traffic: Math.floor(800 + Math.random() * 1200)
      });
    }, 150);

    setTimeout(() => {
      clearInterval(interval);
      setGisScanStatus('done');
      const details = getGisNodeDetails(nodeId);
      setLiveGisCoords({
        lat: details.coordinates.lat,
        lon: details.coordinates.lon,
        traffic: Math.floor(1000 + Math.random() * 500)
      });
    }, 1200);
  };

  // Buzz Scanner
  const scanBuzzSentiment = (topic: string) => {
    setBuzzTopic(topic);
    setIsBuzzLoading(true);
    setTimeout(() => {
      setIsBuzzLoading(false);
      setTrialQuota(prev => Math.max(0, prev - 1));
      if (topic === 'politik') {
        setBuzzResults({ pos: 42, neu: 38, neg: 20, total: 4890 });
      } else if (topic === 'ekonomi') {
        setBuzzResults({ pos: 78, neu: 15, neg: 7, total: 3120 });
      } else {
        setBuzzResults({ pos: 60, neu: 32, neg: 8, total: 1950 });
      }
    }, 1200);
  };

  // Run initial GIS loading
  useEffect(() => {
    scanGisNode('patimban');
  }, []);

  const handleSimulatedUpgrade = (plan: 'trial' | 'pro' | 'enterprise') => {
    setSimulationStatus('memproses');
    
    setTimeout(() => {
      let simulatedRoleName = 'member';
      if (plan === 'pro') simulatedRoleName = 'editor';
      if (plan === 'enterprise') simulatedRoleName = 'super_admin';

      setSimulationStatus('sukses');
      setTrialQuota(5); // Reset quota
      
      if (onUpgradeSuccess) {
        onUpgradeSuccess(simulatedRoleName);
      }
    }, 2000);
  };

  const isUserPremium = simulatedRole && simulatedRole !== 'guest' && simulatedRole !== 'member';

  return (
    <div className="bg-[#0b172a] text-slate-100 rounded-3xl p-6 sm:p-8 border border-indigo-500/20 shadow-2xl relative overflow-hidden text-left space-y-6" id="premium-trial-showcase-section">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-500/5 to-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER ROW */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono shadow-md">
              <Sparkles className="h-3 w-3 fill-current animate-pulse" />
              PREMIUM TRIAL WORKSPACE
            </span>
            <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-mono font-bold px-2 py-0.5 rounded border border-indigo-500/30">
              Interactive Showcase
            </span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-white mt-2 tracking-tight">
            Etalase Fitur Cerdas &amp; Analitik Berlisensi Jabar
          </h2>
          <p className="text-slate-400 text-xs mt-1 max-w-2xl leading-relaxed">
            Rasakan kecanggihan platform intelijen, siber-prediktor, data geo-spasial terintegrasi, dan laporan riset makro Jawa Barat. Uji coba langsung widget di bawah secara interaktif!
          </p>
        </div>

        {/* Dynamic status chip */}
        <div className="bg-slate-900/90 border border-indigo-500/30 p-4 rounded-2xl flex flex-col items-center justify-center shrink-0 min-w-[150px] shadow-lg">
          <span className="text-[9px] text-indigo-300 font-mono font-bold uppercase tracking-wider">Status Akses Anda</span>
          {isUserPremium ? (
            <div className="text-center mt-1">
              <span className="text-emerald-400 font-bold text-xs flex items-center gap-1 font-mono uppercase bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                <ShieldCheck className="h-3.5 w-3.5 fill-emerald-400" />
                PREMIUM ACTIVE
              </span>
              <span className="text-[9px] text-slate-400 font-mono block mt-1 capitalize">Role: {simulatedRole}</span>
            </div>
          ) : (
            <div className="text-center mt-1 space-y-1">
              <span className="text-amber-400 font-bold text-xs flex items-center justify-center gap-1 font-mono uppercase bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                <Lock className="h-3 w-3" />
                TRIAL MODE
              </span>
              <span className="text-[10px] text-slate-300 block font-mono font-black mt-0.5">
                Sisa Kuota: <span className="text-amber-300 font-extrabold">{trialQuota} Scan</span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* CORE CONTENT LAYOUT: WIDGET INTERACTIVE LEFT (8 cols) + UPGRADE CENTER RIGHT (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative z-10">
        
        {/* LEFT COLUMN: INTERACTIVE WIDGET PLAYGROUND */}
        <div className="lg:col-span-8 bg-slate-950/80 border border-white/5 rounded-2xl p-5 flex flex-col justify-between shadow-inner">
          <div>
            {/* Widget selector tabs */}
            <div className="flex border-b border-white/10 text-xs font-black gap-1 mb-5">
              <button 
                onClick={() => setActiveWidgetTab('ai-trends')}
                className={`flex-1 pb-2.5 text-center transition flex items-center justify-center gap-1.5 ${
                  activeWidgetTab === 'ai-trends' 
                    ? 'border-indigo-500 text-indigo-400 border-b-2 font-black' 
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
                style={{ minHeight: '44px' }}
              >
                <TrendingUp className="h-4 w-4" />
                <span>AI Sentiment Predictor</span>
              </button>
              <button 
                onClick={() => setActiveWidgetTab('gis-spatial')}
                className={`flex-1 pb-2.5 text-center transition flex items-center justify-center gap-1.5 ${
                  activeWidgetTab === 'gis-spatial' 
                    ? 'border-indigo-500 text-indigo-400 border-b-2 font-black' 
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
                style={{ minHeight: '44px' }}
              >
                <Map className="h-4 w-4" />
                <span>Geo-Spatial GIS Tracker</span>
              </button>
              <button 
                onClick={() => setActiveWidgetTab('buzz-sentiment')}
                className={`flex-1 pb-2.5 text-center transition flex items-center justify-center gap-1.5 ${
                  activeWidgetTab === 'buzz-sentiment' 
                    ? 'border-indigo-500 text-indigo-400 border-b-2 font-black' 
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
                style={{ minHeight: '44px' }}
              >
                <Activity className="h-4 w-4" />
                <span>Buzz Sentimen Scanner</span>
              </button>
            </div>

            {/* TAB CONTENT 1: AI SENTIMENT PREDICTOR */}
            {activeWidgetTab === 'ai-trends' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/50 p-3 rounded-xl border border-white/5">
                  <div className="text-left">
                    <span className="text-[10px] text-indigo-400 font-mono font-bold block">Pilih Topik Liputan Utama</span>
                    <div className="flex gap-1.5 mt-1.5">
                      {[
                        { id: 'gedung-sate', label: 'Revitalisasi Gedung Sate' },
                        { id: 'pajak-digital', label: 'PMK Fiskal Digital Jabar' },
                        { id: 'infrastruktur-selatan', label: 'Dermaga Logistik Selatan' }
                      ].map((topic) => (
                        <button
                          key={topic.id}
                          onClick={() => {
                            setSelectedTrendTopic(topic.id as any);
                            setAiReportResult(null);
                          }}
                          className={`px-3 py-1 rounded-lg text-[10px] font-bold border transition ${
                            selectedTrendTopic === topic.id 
                              ? 'bg-indigo-600 text-white border-indigo-500 shadow' 
                              : 'bg-slate-900 text-slate-400 border-white/10 hover:text-white hover:bg-slate-800'
                          }`}
                          style={{ minHeight: '32px' }}
                        >
                          {topic.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <button
                    onClick={triggerAiScan}
                    disabled={isAiScanning}
                    className="bg-[#FFD700] hover:bg-[#ffe240] text-[#002B5B] px-4 py-2 rounded-xl text-xs font-black shadow-lg flex items-center gap-1.5 transition disabled:opacity-50 shrink-0"
                    style={{ minHeight: '40px' }}
                  >
                    {isAiScanning ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Menganalisis Tren...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 fill-current" />
                        <span>Hasilkan Analisis AI Premium</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Recharts Chart Area */}
                <div className="bg-slate-900/30 border border-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-[11px] font-bold text-slate-200">Grafik Prediksi Sentimen Publik (7 Hari Mendatang)</span>
                      <p className="text-[9px] text-slate-500 font-mono mt-0.5">Engine Model: Jabar Sentiment-O-Meter v2.1</p>
                    </div>
                    <div className="flex gap-3 text-[9px] font-mono font-bold">
                      <span className="flex items-center gap-1 text-emerald-400">🟢 Positif</span>
                      <span className="flex items-center gap-1 text-amber-400">🟡 Netral</span>
                      <span className="flex items-center gap-1 text-rose-400">🔴 Negatif</span>
                    </div>
                  </div>

                  <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendDataMap[selectedTrendTopic]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <XAxis dataKey="day" stroke="#64748b" fontSize={9} tickLine={false} />
                        <YAxis stroke="#64748b" fontSize={9} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc', fontSize: '11px' }} />
                        <Area type="monotone" dataKey="positif" stroke="#34d399" fillOpacity={0.15} fill="url(#colorPos)" strokeWidth={2} />
                        <Area type="monotone" dataKey="netral" stroke="#fbbf24" fillOpacity={0.05} fill="url(#colorNeu)" strokeWidth={2} />
                        <Area type="monotone" dataKey="negatif" stroke="#f87171" fillOpacity={0.05} fill="url(#colorNeg)" strokeWidth={2} />
                        <defs>
                          <linearGradient id="colorPos" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#34d399" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorNeu" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorNeg" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f87171" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* AI report output display */}
                <AnimatePresence mode="wait">
                  {aiReportResult ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="bg-indigo-950/40 border border-indigo-500/20 p-4 rounded-xl flex items-start gap-3 shadow-lg"
                    >
                      <Sparkles className="h-5 w-5 text-amber-400 shrink-0 mt-0.5 animate-bounce" />
                      <div className="space-y-1">
                        <span className="text-[10px] bg-amber-400/20 text-amber-300 font-mono font-bold px-1.5 py-0.2 rounded border border-amber-400/30 uppercase tracking-widest block w-max">
                          Hasil Laporan Analisis
                        </span>
                        <p className="text-xs text-slate-200 leading-relaxed font-semibold">
                          {aiReportResult}
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="bg-slate-900/20 border border-dashed border-white/10 p-4 rounded-xl text-center text-xs text-slate-500">
                      Klik tombol kuning di atas untuk menghasilkan ringkasan laporan analisis rekomendasi redaksi menggunakan AI Premium.
                    </div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* TAB CONTENT 2: GEO-SPATIAL GIS TRACKER */}
            {activeWidgetTab === 'gis-spatial' && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-indigo-400 font-mono font-bold block">Integrasi GIS Proyek Strategis Nasional Jabar</span>
                    <div className="flex gap-1.5 mt-1.5">
                      {[
                        { id: 'patimban', label: 'Pelabuhan Patimban' },
                        { id: 'kertajati', label: 'Bandara Kertajati' },
                        { id: 'geothermal', label: 'Panas Bumi Kamojang' }
                      ].map((node) => (
                        <button
                          key={node.id}
                          onClick={() => scanGisNode(node.id)}
                          className={`px-3 py-1 rounded-lg text-[10px] font-bold border transition ${
                            selectedGisNode === node.id 
                              ? 'bg-indigo-600 text-white border-indigo-500 shadow' 
                              : 'bg-slate-900 text-slate-400 border-white/10 hover:text-white hover:bg-slate-800'
                          }`}
                          style={{ minHeight: '32px' }}
                        >
                          {node.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="text-right text-[10px] font-mono text-slate-400 bg-slate-950 border border-white/5 p-2 rounded-lg">
                    <span>📡 Lat: <strong>{liveGisCoords.lat}</strong> • Lon: <strong>{liveGisCoords.lon}</strong></span>
                  </div>
                </div>

                {/* Simulated Map Workspace */}
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#090f1e] border border-white/5 flex flex-col items-center justify-center p-4">
                  {/* Grid Lines Pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-15 pointer-events-none" />
                  
                  {gisScanStatus === 'scanning' ? (
                    <div className="text-center space-y-2 z-10">
                      <RefreshCw className="h-8 w-8 animate-spin text-indigo-400 mx-auto" />
                      <p className="text-xs font-mono text-indigo-300 font-extrabold uppercase animate-pulse">Menghubungkan ke Satelit Radar Spasial...</p>
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col md:flex-row justify-between gap-4 z-10">
                      {/* Left: Mini Map Render simulation */}
                      <div className="flex-1 bg-slate-950 border border-white/10 rounded-lg p-3 relative flex items-center justify-center overflow-hidden">
                        <div className="absolute w-24 h-24 border border-indigo-500/30 rounded-full animate-ping pointer-events-none opacity-45" />
                        <div className="absolute w-40 h-40 border border-indigo-500/20 rounded-full animate-pulse pointer-events-none opacity-20" />
                        
                        <div className="z-10 text-center space-y-1">
                          <Map className="h-10 w-10 text-indigo-400 mx-auto mb-2 animate-bounce" />
                          <span className="text-[8px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20 font-mono font-bold uppercase">
                            GIS RADAR CONNECTED
                          </span>
                          <p className="text-[10px] text-slate-300 font-bold">{getGisNodeDetails(selectedGisNode).title}</p>
                        </div>

                        {/* Hover coordinates tag */}
                        <div className="absolute bottom-2 left-2 bg-slate-900/90 text-[8px] font-mono text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20 uppercase">
                          Satelit LAPAN-4 • Live
                        </div>
                      </div>

                      {/* Right: Metrics Details */}
                      <div className="w-full md:w-5/12 bg-slate-900/60 p-4 rounded-lg border border-white/5 text-left flex flex-col justify-between">
                        <div className="space-y-3">
                          <span className="text-[9px] bg-emerald-500/10 text-emerald-400 font-mono font-bold px-1.5 py-0.2 rounded border border-emerald-500/20 uppercase tracking-widest">
                            Metrik Spasial
                          </span>
                          
                          <div>
                            <span className="text-[10px] text-slate-400 block font-bold">Investasi Regional</span>
                            <span className="text-base font-extrabold text-[#FFD700] font-mono">{getGisNodeDetails(selectedGisNode).investment}</span>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-[10px]">
                            <div>
                              <span className="text-slate-500 block">Kemajuan Fisik</span>
                              <span className="font-extrabold text-slate-200">{getGisNodeDetails(selectedGisNode).progress}%</span>
                              <div className="w-full bg-slate-950 h-1 rounded mt-1 overflow-hidden">
                                <div className="h-full bg-indigo-500" style={{ width: `${getGisNodeDetails(selectedGisNode).progress}%` }} />
                              </div>
                            </div>
                            <div>
                              <span className="text-slate-500 block">Risk Indeks</span>
                              <span className="font-extrabold text-rose-400">{getGisNodeDetails(selectedGisNode).siberRisk}</span>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-white/5 grid grid-cols-2 gap-2 text-[9px] font-mono text-slate-400">
                            <div>Anomali: <strong>{getGisNodeDetails(selectedGisNode).anomalyRate}</strong></div>
                            <div>Impact: <strong className="text-emerald-400">{getGisNodeDetails(selectedGisNode).impactScore}</strong></div>
                          </div>
                        </div>

                        <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] text-slate-400 font-mono">
                          <span>Live traffic ping: <strong>{liveGisCoords.traffic} ms</strong></span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: BUZZ SENTIMENT SCANNER */}
            {activeWidgetTab === 'buzz-sentiment' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/50 p-3 rounded-xl border border-white/5">
                  <div>
                    <span className="text-[10px] text-indigo-400 font-mono font-bold block">Pindai Buzz Sentimen Sosial Media Jabar</span>
                    <div className="flex gap-1.5 mt-1.5">
                      {[
                        { id: 'umum', label: 'Umum & Layanan Publik' },
                        { id: 'politik', label: 'Politik & Birokrasi Pemprov' },
                        { id: 'ekonomi', label: 'Ekonomi, Bisnis & Investasi' }
                      ].map((topic) => (
                        <button
                          key={topic.id}
                          onClick={() => scanBuzzSentiment(topic.id)}
                          className={`px-3 py-1 rounded-lg text-[10px] font-bold border transition ${
                            buzzTopic === topic.id 
                              ? 'bg-indigo-600 text-white border-indigo-500 shadow' 
                              : 'bg-slate-900 text-slate-400 border-white/10 hover:text-white hover:bg-slate-800'
                          }`}
                          style={{ minHeight: '32px' }}
                        >
                          {topic.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => scanBuzzSentiment(buzzTopic)}
                    disabled={isBuzzLoading}
                    className="bg-[#2B7A78] hover:bg-[#3aa4a1] text-white px-4 py-2 rounded-xl text-xs font-black shadow-lg flex items-center gap-1.5 transition disabled:opacity-50 shrink-0"
                    style={{ minHeight: '40px' }}
                  >
                    {isBuzzLoading ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Scanning Buzz...</span>
                      </>
                    ) : (
                      <>
                        <Activity className="h-4 w-4" />
                        <span>Pindai Ulang Buzz Sosial</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Buzz Bar Chart visualization */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-7 bg-slate-900/30 border border-white/5 rounded-xl p-4">
                    <span className="text-[11px] font-bold text-slate-200 block mb-3">Distribusi Sentimen Buzz Hasil Pindaian</span>
                    
                    {isBuzzLoading ? (
                      <div className="h-44 w-full flex items-center justify-center">
                        <RefreshCw className="h-6 w-6 animate-spin text-teal-400" />
                      </div>
                    ) : (
                      <div className="h-44 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={[
                            { name: 'Sentimen (%)', Positif: buzzResults.pos, Netral: buzzResults.neu, Negatif: buzzResults.neg }
                          ]} barSize={40}>
                            <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                            <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                            <Legend wrapperStyle={{ fontSize: '10px' }} />
                            <Bar dataKey="Positif" fill="#34d399" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="Netral" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="Negatif" fill="#f87171" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </div>

                  {/* Buzz Info Statistics */}
                  <div className="md:col-span-5 bg-slate-900/60 p-4 rounded-xl border border-white/5 space-y-3">
                    <span className="text-[10px] bg-indigo-500/10 text-indigo-400 font-mono font-bold px-1.5 py-0.2 rounded border border-indigo-500/20 uppercase tracking-widest block w-max">
                      Ringkasan Pindaian
                    </span>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-slate-400">Total Mention</span>
                        <span className="font-extrabold text-white font-mono">{buzzResults.total} feeds</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-slate-400">Dominasi Sentimen</span>
                        <span className="font-extrabold text-emerald-400 font-mono">Positif ({buzzResults.pos}%)</span>
                      </div>
                      <div className="flex justify-between pb-1">
                        <span className="text-slate-400">Anomali Terdeteksi</span>
                        <span className="font-extrabold text-amber-400 font-mono">Tidak Ada</span>
                      </div>
                    </div>

                    <div className="bg-slate-950 p-2.5 rounded-lg text-[10px] text-slate-400 leading-normal border border-white/5 flex items-start gap-1.5">
                      <Info className="h-3.5 w-3.5 text-indigo-400 shrink-0 mt-0.5" />
                      <span>Data dirangkum secara real-time dari crawling Twitter API, platform berita lokal, dan forum publik Jawa Barat.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer of the playground box */}
          <div className="mt-5 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-slate-500 font-mono">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-indigo-500" />
              Tingkat Akurasi Data: <strong>99.42% Verified</strong>
            </span>
            <span className="text-[9px] bg-slate-900 px-2 py-0.5 rounded border border-white/5">
              Live database connection: ONLINE
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: TRIAL & SUBSCRIPTION UPGRADE CENTER */}
        <div className="lg:col-span-4 bg-gradient-to-b from-[#111e35] to-[#0d172a] border border-indigo-500/30 rounded-2xl p-5 flex flex-col justify-between relative shadow-xl">
          <div className="space-y-5">
            <div className="space-y-1">
              <span className="text-[9px] bg-amber-400/10 text-amber-300 font-mono font-bold px-2 py-0.5 rounded border border-amber-400/20 uppercase tracking-widest block w-max">
                Daftar Paket Langganan
              </span>
              <h3 className="font-display font-black text-lg text-white mt-2">Aktivasi Akses Premium</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Buka seluruh rubrikasi analitik eksklusif, cetak laporan AI tak terbatas, and pantau CCTV radar spasial 24/7 tanpa batas.
              </p>
            </div>

            {/* Plans List Selection */}
            <div className="space-y-3">
              {[
                { 
                  id: 'trial', 
                  title: '14-Day Free Trial', 
                  price: 'Rp 0', 
                  period: 'selamanya uji coba',
                  features: ['Sisa kuota: 5 scan harian', 'Akses terbatas ke GIS', 'Satu login perangkat'],
                  badge: 'UJI COBA'
                },
                { 
                  id: 'pro', 
                  title: 'Professional Analyst', 
                  price: 'Rp 99.000', 
                  period: '/ bulan',
                  features: ['Analisis AI Tanpa Batas', 'Akses Penuh GIS & Spasial', 'Live CCTV Jabar Stream', 'Dukungan Analis Prioritas'],
                  badge: 'TERPOPULER'
                },
                { 
                  id: 'enterprise', 
                  title: 'Enterprise Workspace', 
                  price: 'Rp 349.000', 
                  period: '/ bulan',
                  features: ['Multi-Akun (Hingga 5 User)', 'Ekspor Laporan PDF & CSV', 'Akses API Sentimen Publik', 'SLA Dukungan Siber 24/7'],
                  badge: 'SANGAT LENGKAP'
                }
              ].map((plan) => (
                <div 
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id as any)}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer transition flex flex-col justify-between text-left relative overflow-hidden ${
                    selectedPlan === plan.id 
                      ? 'bg-[#002B5B]/60 border-amber-400/80 shadow-md' 
                      : 'bg-slate-900/50 border-white/5 hover:border-white/10'
                  }`}
                >
                  {/* Badge */}
                  <span className={`absolute top-0 right-0 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-bl-lg font-mono ${
                    selectedPlan === plan.id 
                      ? 'bg-amber-400 text-slate-950' 
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {plan.badge}
                  </span>

                  <div className="space-y-1">
                    <h4 className="text-xs font-black text-white">{plan.title}</h4>
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-mono font-black text-amber-400">{plan.price}</span>
                      <span className="text-[9px] text-slate-400">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="mt-2.5 space-y-1 text-[10px] text-slate-300">
                    {plan.features.slice(0, 2).map((feat, fidx) => (
                      <li key={fidx} className="flex items-center gap-1">
                        <Check className="h-3 w-3 text-emerald-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-5 border-t border-white/10 mt-5 space-y-3">
            {simulationStatus === 'sukses' ? (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-xl text-center space-y-1.5 animate-bounce">
                <span className="font-extrabold block">🎉 AKTIVASI SIMULASI BERHASIL!</span>
                <span className="text-[10px] block font-mono">Role Anda diset ke premium. Rasakan sensasi menu yang terbuka!</span>
              </div>
            ) : (
              <button
                onClick={() => handleSimulatedUpgrade(selectedPlan)}
                disabled={simulationStatus === 'memproses'}
                className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-[#FFD700] hover:to-[#ffe240] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                style={{ minHeight: '44px' }}
              >
                {simulationStatus === 'memproses' ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Memproses Aktivasi Trial...</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 fill-current" />
                    <span>Aktifkan Simulasi Trial &amp; Subscribe</span>
                  </>
                )}
              </button>
            )}

            <p className="text-[9px] text-slate-400 text-center font-mono leading-normal">
              Aman &amp; Tanpa Kartu Kredit. Klik tombol di atas untuk mensimulasikan peran premium Anda secara instan dan membuka seluruh fungsionalitas platform.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
