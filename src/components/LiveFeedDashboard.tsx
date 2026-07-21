import React, { useState, useEffect, useRef } from 'react';
import { 
  Radio, Clock, User, MessageSquare, Send, RefreshCw, Plus, 
  MapPin, AlertCircle, Play, Pause, ExternalLink, Flame, CheckCircle2 
} from 'lucide-react';

interface Content {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  summary: string;
  body: string;
  contentType: string;
  status: string;
  primaryCategoryId: string;
  sentiment: string;
  riskLevel: string;
  heroImageUrl: string;
  authorId: string;
  editorId: string;
  publishedAt: string;
  isSponsored: boolean;
  viewCount: number;
  readingTimeMinutes: number;
  createdAt: string;
  updatedAt: string;
  authorName?: string;
  categoryName?: string;
  locations?: Array<{ id: string; name: string; slug: string }>;
}

interface LiveFeedDashboardProps {
  user: any;
  onSelectArticle: (slug: string) => void;
}

interface TimelineEntry {
  time: string;
  title: string;
  description: string;
  isNew?: boolean;
}

// Realistic pre-defined simulation updates for each live stream
const SIMULATION_POOL: Record<string, TimelineEntry[]> = {
  'festival-asia-afrika': [
    { time: '18:00 WIB', title: 'Pesta Kembang Api', description: 'Langit di atas Alun-Alun Bandung dimeriahkan oleh letupan kembang api berwarna-warni sebagai penutupan pawai budaya sore ini.' },
    { time: '18:15 WIB', title: 'Konser Angklung Kolosal', description: 'Penampilan orkes angklung massal oleh 1.000 siswa SMP se-Kota Bandung memukau para tamu delegasi internasional.' },
    { time: '18:30 WIB', title: 'Koridor Heritage Dibuka', description: 'Petugas melepas pagar pembatas pedestrian. Warga mulai diperbolehkan berfoto di bawah lampu hias klasik baru.' }
  ],
  'gedung-sate': [
    { time: '11:00 WIB', title: 'Tanya Jawab Lanjutan', description: 'Kepala Dinas Ketahanan Pangan memastikan stok beras cadangan pemerintah daerah aman hingga musim panen berikutnya.' },
    { time: '11:15 WIB', title: 'Distribusi Subsidi', description: 'Pemprov menandatangani MOU bersama asosiasi transportasi lokal untuk mempercepat pengiriman komoditas pokok ke pelosok desa.' },
    { time: '11:30 WIB', title: 'Konferensi Pers Ditutup', description: 'Sesi penjelasan pers resmi berakhir. Jajaran pimpinan daerah berfoto bersama sebelum melakukan tinjauan lapangan.' }
  ],
  'derby-bandung-raya': [
    { time: 'Menit ke-75', title: 'KARTU MERAH!', description: 'Bek tangguh Bandung United diganjar kartu merah langsung setelah melanggar keras penyerang lawan di area sensitif depan kotak penalti.' },
    { time: 'Menit ke-82', title: 'GOL PENYAMA KEDUDUKAN!', description: 'Persib Junior menyamakan kedudukan menjadi 1-1 lewat eksekusi tendangan bebas melengkung yang bersarang tepat di sudut kiri gawang.' },
    { time: 'Menit ke-90+3', title: 'PELUIT AKHIR', description: 'Wasit meniup peluit panjang akhir pertandingan. Derby Bandung Raya selesai dengan skor dramatis 1-1.' }
  ],
  'arus-balik-lembang': [
    { time: '20:00 WIB', title: 'Arus Mulai Terurai', description: 'Kepolisian menghentikan sistem satu arah (one-way) seiring dengan berkurangnya volume kendaraan yang turun dari arah Lembang.' },
    { time: '20:15 WIB', title: ' Pasteur Terpantau Lancar', description: 'Antrean loket pembayaran di gerbang keluar Tol Pasteur terpantau normal dengan panjang antrean di bawah 300 meter.' },
    { time: '20:30 WIB', title: 'Situasi Setiabudi Kondusif', description: 'Arus lalu lintas di sepanjang koridor Setiabudi malam ini terpantau ramai lancar dan kondusif.' }
  ]
};

export const LiveFeedDashboard: React.FC<LiveFeedDashboardProps> = ({ user, onSelectArticle }) => {
  const [streams, setStreams] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStreamId, setActiveStreamId] = useState<string | null>(null);
  const [activeTimeline, setActiveTimeline] = useState<TimelineEntry[]>([]);
  const [isAutoSim, setIsAutoSim] = useState(true);
  const [simulationIndex, setSimulationIndex] = useState(0);
  const [customReportName, setCustomReportName] = useState('');
  const [customReportText, setCustomReportText] = useState('');
  const [customReportTime, setCustomReportTime] = useState('LIVE');
  const [notif, setNotif] = useState<string | null>(null);

  const autoSimTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Parse Markdown list to Timeline items
  const parseTimeline = (body: string): TimelineEntry[] => {
    const entries: TimelineEntry[] = [];
    const lines = body.split('\n');
    for (const line of lines) {
      const timeMatch = line.match(/\*\*\[(.*?)\]\*\*/);
      if (timeMatch) {
        const time = timeMatch[1];
        const rest = line.replace(/\*\*\[.*?\]\*\*/, '').trim();
        
        let title = '';
        let description = '';
        
        const titleMatch = rest.match(/-\s*\*\*(.*?)\*\*:(.*)/);
        if (titleMatch) {
          title = titleMatch[1];
          description = titleMatch[2].trim();
        } else {
          const simpleMatch = rest.match(/-\s*(.*?):(.*)/);
          if (simpleMatch) {
            title = simpleMatch[1];
            description = simpleMatch[2].trim();
          } else {
            const cleanRest = rest.replace(/^-\s*/, '');
            title = "Update Terbaru";
            description = cleanRest;
          }
        }
        entries.push({ time, title, description });
      } else if (line.trim().startsWith('*')) {
        const cleanLine = line.replace(/^\*\s*/, '').trim();
        // Look for bold title
        const boldMatch = cleanLine.match(/^\*\*(.*?)\*\*:(.*)/);
        if (boldMatch) {
          entries.push({
            time: "LIVE",
            title: boldMatch[1],
            description: boldMatch[2].trim()
          });
        } else {
          entries.push({
            time: "LIVE",
            title: "Update Lapangan",
            description: cleanLine
          });
        }
      }
    }
    return entries;
  };

  // Fetch streams
  useEffect(() => {
    setLoading(true);
    fetch('/api/v1/contents?category=live-feed')
      .then(res => res.json())
      .then(data => {
        const list = data.contents || [];
        setStreams(list);
        if (list.length > 0) {
          setActiveStreamId(list[0].id);
          setActiveTimeline(parseTimeline(list[0].body));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading live feeds:", err);
        setLoading(false);
      });
  }, []);

  // Update active timeline when stream changes
  const handleSelectStream = (id: string) => {
    setActiveStreamId(id);
    const stream = streams.find(s => s.id === id);
    if (stream) {
      setActiveTimeline(parseTimeline(stream.body));
      setSimulationIndex(0);
    }
  };

  // Map stream ID to sim pool key
  const getSimPoolKey = (id: string): string => {
    if (id.includes('asia-afrika') || id.includes('intl')) return 'festival-asia-afrika';
    if (id.includes('sate')) return 'gedung-sate';
    if (id.includes('derby') || id.includes('sports')) return 'derby-bandung-raya';
    if (id.includes('lalu-lintas') || id.includes('lakukan') || id.includes('laju')) return 'arus-balik-lembang';
    return 'festival-asia-afrika';
  };

  // Trigger manual simulation update
  const triggerSimulation = () => {
    if (!activeStreamId) return;
    const poolKey = getSimPoolKey(activeStreamId);
    const pool = SIMULATION_POOL[poolKey];
    if (pool && simulationIndex < pool.length) {
      const nextUpdate = { ...pool[simulationIndex], isNew: true };
      setActiveTimeline(prev => [nextUpdate, ...prev]);
      setSimulationIndex(prev => prev + 1);
      
      showToast(`Pembaruan Langsung Terkini: "${nextUpdate.title}"`);
    } else {
      // General random simulation
      const randIdx = Math.floor(Math.random() * 3);
      const genericUpdates = [
        { time: 'LIVE', title: 'Laporan Koresponden', description: 'Aparat keamanan di lapangan meningkatkan patroli keliling guna menjamin kelancaran sirkulasi publik.' },
        { time: 'LIVE', title: 'Wawancara Singkat', description: 'Salah satu warga mengungkapkan rasa puasnya terhadap respons tanggap panitia lapangan yang solutif.' },
        { time: 'LIVE', title: 'Informasi Penutup', description: 'Tim teknis siber INFOBOS terus bersiaga memantau kelayakan konektivitas transmisi data di lokasi.' }
      ];
      const nextUpdate = { ...genericUpdates[randIdx], isNew: true };
      setActiveTimeline(prev => [nextUpdate, ...prev]);
      showToast(`Laporan Masuk: "${nextUpdate.title}"`);
    }
  };

  // Show toast notification
  const showToast = (message: string) => {
    setNotif(message);
    setTimeout(() => {
      setNotif(null);
    }, 4000);
  };

  // Auto Simulator Engine
  useEffect(() => {
    if (isAutoSim && activeStreamId) {
      autoSimTimerRef.current = setInterval(() => {
        triggerSimulation();
      }, 25000); // simulation interval
    } else {
      if (autoSimTimerRef.current) {
        clearInterval(autoSimTimerRef.current);
      }
    }
    return () => {
      if (autoSimTimerRef.current) {
        clearInterval(autoSimTimerRef.current);
      }
    };
  }, [isAutoSim, activeStreamId, simulationIndex]);

  // Handle custom user submission
  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customReportText.trim()) return;

    const newEntry: TimelineEntry = {
      time: customReportTime || 'LIVE',
      title: customReportName.trim() || 'Laporan Publik / Kontributor',
      description: customReportText.trim(),
      isNew: true
    };

    setActiveTimeline(prev => [newEntry, ...prev]);
    setCustomReportText('');
    setCustomReportName('');
    showToast(`Sukses mempublikasikan laporan langsung Anda!`);
  };

  const activeStream = streams.find(s => s.id === activeStreamId);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-3">
        <RefreshCw className="h-8 w-8 text-rose-500 animate-spin" />
        <span className="text-xs font-mono font-bold text-slate-400">Menghubungkan ke Feed Redaksi...</span>
      </div>
    );
  }

  return (
    <div id="live-feed-dashboard" className="space-y-6 text-left">
      
      {/* GLOBAL TOAST NOTIFICATION */}
      {notif && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#002B5B] dark:bg-slate-900 text-white border-2 border-rose-500 rounded-xl px-4 py-3 shadow-2xl flex items-center gap-3 animate-bounce max-w-sm">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
          </span>
          <div className="text-xs font-bold leading-tight">
            <span className="text-rose-400 font-extrabold block uppercase tracking-wider text-[9px] mb-0.5">🔴 UPDATE LIVE</span>
            {notif}
          </div>
        </div>
      )}

      {/* DASHBOARD HEADER BRANDING */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 z-10 relative">
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              </span>
              <span className="text-[10px] font-mono font-black text-rose-400 uppercase tracking-widest">
                LIVE REPORTING CONSOLE (REALTIME STREAM)
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-display font-black text-white leading-tight tracking-tight">
              INFOBOS Live Feed Stream 🔴
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Liputan teks detik-demi-detik dari lokasi bencana, konferensi pers darurat, unjuk rasa, lalu lintas, dan peristiwa olahraga krusial di seluruh Jawa Barat.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Auto simulator toggler */}
            <button 
              onClick={() => setIsAutoSim(!isAutoSim)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-black uppercase tracking-wider transition cursor-pointer border flex items-center gap-1.5 ${
                isAutoSim 
                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' 
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              {isAutoSim ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
              <span>Auto Sim: {isAutoSim ? 'ON' : 'OFF'}</span>
            </button>

            {/* Manual update push button */}
            <button 
              onClick={triggerSimulation}
              className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 shadow-md active:scale-98"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Simulasi Update</span>
            </button>
          </div>

        </div>
      </div>

      {/* CORE SPLIT SCREEN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* LEFT COLUMN: ACTIVE FEED (8 of 12) */}
        <div className="lg:col-span-8 space-y-5">
          {activeStream ? (
            <div className="bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-xs">
              
              {/* Active Stream Banner */}
              <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#002B5B]/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white font-mono text-[8px] font-black uppercase tracking-wider">
                      ACTIVE STREAM
                    </span>
                    <span className="text-slate-400 text-[10px] font-mono flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Terakhir Diperbarui: Baru saja
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-display font-black text-[#002B5B] dark:text-white tracking-tight">
                    {activeStream.title}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed max-w-xl">
                    {activeStream.summary}
                  </p>
                </div>

                <button
                  onClick={() => onSelectArticle(activeStream.slug)}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1 transition shadow-3xs cursor-pointer"
                >
                  <span>Detail Laporan</span>
                  <ExternalLink className="h-3 w-3 text-slate-400" />
                </button>
              </div>

              {/* TIMELINE LIST */}
              <div className="p-4 sm:p-5 space-y-5 relative">
                {/* Timeline vertical connector line */}
                <div className="absolute left-7 sm:left-9 top-6 bottom-6 w-0.5 bg-slate-200 dark:bg-slate-800 pointer-events-none" />

                {activeTimeline.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-xs font-mono">
                    Belum ada entri timeline siaran langsung.
                  </div>
                ) : (
                  activeTimeline.map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`flex gap-3 sm:gap-4 relative group transition-all duration-300 ${
                        item.isNew ? 'animate-pulse scale-101 border-l-4 border-rose-500 pl-2 -ml-3' : ''
                      }`}
                    >
                      {/* Left circular timeline node */}
                      <div className="flex-shrink-0 flex items-center justify-center z-10">
                        {idx === 0 ? (
                          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-rose-500/10 border-2 border-rose-500 text-rose-500 flex items-center justify-center text-[9px] font-black font-mono shadow-xs">
                            LIVE
                          </div>
                        ) : (
                          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center text-[8px] font-bold font-mono">
                            {item.time.split(' ')[0] || 'T'}
                          </div>
                        )}
                      </div>

                      {/* Right timeline description card */}
                      <div className="flex-1 bg-slate-50 dark:bg-[#002B5B]/5 border border-slate-100 dark:border-white/5 rounded-xl p-3 sm:p-4 text-left space-y-1 shadow-3xs hover:border-indigo-100 dark:hover:border-white/10 transition-all">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="font-mono font-black text-[10px] sm:text-xs text-rose-500 dark:text-rose-400 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {item.time}
                          </span>
                          {item.isNew && (
                            <span className="bg-emerald-500/10 text-emerald-500 text-[8px] font-mono font-black uppercase px-2 py-0.5 rounded-full border border-emerald-500/20">
                              BARU MASUK
                            </span>
                          )}
                        </div>
                        <h4 className="font-display font-extrabold text-xs sm:text-sm text-[#002B5B] dark:text-slate-100">
                          {item.title}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans font-medium">
                          {item.description}
                        </p>
                      </div>

                    </div>
                  ))
                )}
              </div>

            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-[#001c3d] rounded-2xl border border-slate-200 dark:border-white/10">
              <AlertCircle className="h-10 w-10 text-slate-300 mx-auto mb-3 animate-pulse" />
              <p className="text-xs text-slate-400 font-mono">Tidak ada siaran langsung aktif saat ini.</p>
            </div>
          )}

          {/* REPORT SUBMISSION FORM FOR USER / CITIZEN REPORT */}
          <div className="bg-gradient-to-tr from-[#002B5B]/5 to-indigo-50/20 dark:from-[#001c3d] dark:to-[#002B5B]/20 border border-indigo-100 dark:border-white/10 rounded-2xl p-4 sm:p-5 shadow-xs text-left">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="h-4.5 w-4.5 text-indigo-500" />
              <h3 className="font-display font-black text-sm text-[#002B5B] dark:text-white uppercase tracking-wider">
                Kirim Laporan Lapangan Kontributor
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-300 mb-4 leading-relaxed">
              Anda berada di lokasi peristiwa? Kirimkan kontribusi pembaruan teks cepat Anda. Redaktur kami akan melakukan kurasi dan memvalidasi laporan Anda agar terpampang langsung secara publik.
            </p>

            <form onSubmit={handleCustomSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-black uppercase tracking-wider text-slate-400">Judul / Sektor Laporan</label>
                  <input 
                    type="text" 
                    value={customReportName}
                    onChange={(e) => setCustomReportName(e.target.value)}
                    placeholder="Contoh: Kondisi Cuaca / Jumlah Massa"
                    className="w-full text-xs font-bold px-3 py-2 border rounded-lg bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-black uppercase tracking-wider text-slate-400">Timestamp</label>
                  <input 
                    type="text" 
                    value={customReportTime}
                    onChange={(e) => setCustomReportTime(e.target.value)}
                    placeholder="Contoh: 18:45 WIB"
                    className="w-full text-xs font-bold px-3 py-2 border rounded-lg bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-black uppercase tracking-wider text-slate-400">Deskripsi Pembaruan Laporan</label>
                <textarea 
                  rows={2}
                  value={customReportText}
                  onChange={(e) => setCustomReportText(e.target.value)}
                  placeholder="Ketik detail temuan peristiwa di lapangan, pastikan data akurat..."
                  className="w-full text-xs font-semibold px-3 py-2 border rounded-lg bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none resize-none"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button 
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Kirim Laporan Instan</span>
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* RIGHT COLUMN: STREAMS DIRECTORY (4 of 12) */}
        <div className="lg:col-span-4 space-y-5">
          
          <div className="bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-3xs space-y-3 text-left">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-2">
              <Radio className="h-4 w-4 text-rose-500 animate-pulse" />
              <h3 className="font-display font-black text-xs text-[#002B5B] dark:text-white uppercase tracking-wider">
                Daftar Siaran Aktif Jabar
              </h3>
            </div>

            <div className="space-y-2 max-h-[450px] overflow-y-auto scrollbar-none">
              {streams.map((stream) => {
                const isActive = stream.id === activeStreamId;
                return (
                  <div 
                    key={stream.id}
                    onClick={() => handleSelectStream(stream.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex gap-3 ${
                      isActive 
                        ? 'bg-rose-500/5 border-rose-500/40 shadow-xs' 
                        : 'bg-slate-50 dark:bg-[#002B5B]/10 border-slate-200/60 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-[#002B5B]/20'
                    }`}
                  >
                    {/* Tiny visual image preview */}
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 relative">
                      <img 
                        src={stream.heroImageUrl} 
                        alt={stream.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-rose-600/20 backdrop-blur-xs flex items-center justify-center">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1 space-y-0.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`text-[8px] font-mono font-black px-1.5 py-0.1 rounded uppercase tracking-wider ${
                          isActive 
                            ? 'bg-rose-500 text-white' 
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        }`}>
                          {stream.locations?.[0]?.name || "Jawa Barat"}
                        </span>
                      </div>
                      <h4 className={`text-xs font-bold leading-tight truncate ${
                        isActive ? 'text-rose-500 dark:text-rose-400' : 'text-[#002B5B] dark:text-slate-200'
                      }`}>
                        {stream.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 line-clamp-1 leading-snug">
                        {stream.summary}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

          {/* REALTIME SYSTEM HEALTH */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-left space-y-3 shadow-3xs">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-orange-500" />
              <h4 className="text-[10px] font-mono font-black uppercase text-slate-300 tracking-wider">
                Status Konektivitas Sentinel OS
              </h4>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500">Node Pemancar</span>
                <span className="text-[10px] font-mono font-bold text-slate-300">Gedung Sate #02</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500">Latensi Stream</span>
                <span className="text-[10px] font-mono font-bold text-emerald-400">12ms (Optimal)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500">Status Gateway</span>
                <span className="text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Terhubung
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
