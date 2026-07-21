import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, ListOrdered, MapPin, Clock, ShieldAlert, Check, 
  Tv, Headphones, Video, Image, FileText, ChevronUp, ChevronDown, User, Shield, Info, ArrowRight, Share2, Award, Zap, Download
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// ==========================================
// MOCK DATASETS & UTILS FOR INDEPENDENT RUN
// ==========================================
const DEFAULT_INFLATION_DATA = [
  { month: 'Jan', 'Laju Inflasi (%)': 2.1, 'Target APBD (%)': 2.5 },
  { month: 'Feb', 'Laju Inflasi (%)': 2.3, 'Target APBD (%)': 2.5 },
  { month: 'Mar', 'Laju Inflasi (%)': 2.2, 'Target APBD (%)': 2.5 },
  { month: 'Apr', 'Laju Inflasi (%)': 2.6, 'Target APBD (%)': 2.5 },
  { month: 'Mei', 'Laju Inflasi (%)': 2.4, 'Target APBD (%)': 2.5 },
  { month: 'Jun', 'Laju Inflasi (%)': 2.3, 'Target APBD (%)': 2.5 },
];

const DEFAULT_FISCAL_TABLE_DATA = [
  { id: 1, item: "Pariwisata & Heritage Kota Bandung", budget: "Rp 12.4 Miliar", realized: "85%", status: "Selesai" },
  { id: 2, item: "Infrastruktur Transportasi Jawa Barat", budget: "Rp 45.2 Miliar", realized: "62%", status: "Konstruksi" },
  { id: 3, item: "Digitalisasi Sentra UMKM Regional", budget: "Rp 8.7 Miliar", realized: "91%", status: "Selesai" },
  { id: 4, item: "Subsidi Sektor Energi & Pangan", budget: "Rp 15.0 Miliar", realized: "50%", status: "Berjalan" },
];

const DEFAULT_LOCATIONS = [
  { id: '1', name: 'Braga, Bandung', slug: 'bandung', type: 'location' },
  { id: '2', name: 'Gedung Sate, Bandung', slug: 'gedung-sate', type: 'location' },
  { id: '3', name: 'DKI Jakarta', slug: 'dki-jakarta', type: 'location' },
];

const DEFAULT_ENTITIES = [
  { id: '101', name: 'Dinas Pariwisata Jabar', slug: 'dispar-jabar', relation: 'REGULATOR' },
  { id: '102', name: 'Kemenkeu RI', slug: 'kemenkeu-ri', relation: 'PEMBINA' },
  { id: '103', name: 'Dewan Pers', slug: 'dewan-pers', relation: 'MITRA' },
];

// =========================================================================
// 1. REGIONAL FISCAL METRICS WIDGET (METRIK FISKAL REGIONAL)
// =========================================================================
export function FiscalMetricsWidget() {
  const [data, setData] = useState(DEFAULT_INFLATION_DATA);
  const [simulationActive, setSimulationActive] = useState(false);

  useEffect(() => {
    if (!simulationActive) return;
    const interval = setInterval(() => {
      setData(prev => prev.map(item => ({
        ...item,
        'Laju Inflasi (%)': parseFloat((item['Laju Inflasi (%)'] + (Math.random() * 0.4 - 0.2)).toFixed(2))
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, [simulationActive]);

  return (
    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4" id="widget-fiscal-metrics">
      <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
        <span className="text-xs font-mono font-black text-teal-400 uppercase tracking-widest flex items-center gap-1.5">
          <Activity className="h-4 w-4 text-teal-400" /> INTERACTIVE INFOGRAPHIC: METRIK FISKAL REGIONAL
        </span>
        <button
          onClick={() => setSimulationActive(!simulationActive)}
          className={`text-[9px] border px-2.5 py-1 rounded uppercase font-black transition-all ${
            simulationActive 
              ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' 
              : 'bg-teal-500/10 text-teal-400 border-teal-500/25 hover:bg-teal-500/20'
          }`}
        >
          {simulationActive ? '■ Hentikan Simulasi' : '▶ Jalankan Simulasi'}
        </button>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed font-sans">
        Visualisasi laju inflasi pariwisata bulanan tahun anggaran 2026 terhadap pagu target APBD Kota Kreatif Jawa Barat. Gunakan kursor atau sentuhan untuk menelusuri data interaktif.
      </p>
      
      <div className="h-56 w-full text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="widgetColorInflasi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2B7A78" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#2B7A78" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: '#fff' }} />
            <Area type="monotone" dataKey="Laju Inflasi (%)" stroke="#2B7A78" fillOpacity={1} fill="url(#widgetColorInflasi)" />
            <Area type="monotone" dataKey="Target APBD (%)" stroke="#3b82f6" fill="transparent" strokeDasharray="5 5" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// =========================================================================
// 2. STRATEGIC BUDGET TABLE WIDGET (TABEL REALISASI ANGGARAN STRATEGIS)
// =========================================================================
export function BudgetTableWidget() {
  const [tableFilterQuery, setTableFilterQuery] = useState('');
  const [tableSortAsc, setTableSortAsc] = useState(true);
  const [tableData, setTableData] = useState(DEFAULT_FISCAL_TABLE_DATA);

  const handleSortTable = () => {
    const sorted = [...tableData].sort((a, b) => {
      return tableSortAsc ? b.id - a.id : a.id - b.id;
    });
    setTableData(sorted);
    setTableSortAsc(!tableSortAsc);
  };

  const handleExportCSV = () => {
    const headers = "ID,Pekerjaan,Pagu Dana,Realisasi,Status\n";
    const rows = tableData.map(r => `${r.id},"${r.item}","${r.budget}","${r.realized}","${r.status}"`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'INFOBOS-Realisasi-Anggaran-Strategis-2026.csv');
    a.click();
  };

  const filteredData = tableData.filter(row => 
    row.item.toLowerCase().includes(tableFilterQuery.toLowerCase())
  );

  return (
    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4" id="widget-budget-table">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-800 pb-3">
        <span className="text-xs font-mono font-black text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
          <ListOrdered className="h-4 w-4 text-blue-400" /> TABEL REALISASI ANGGARAN STRATEGIS
        </span>
        
        <div className="flex items-center gap-2">
          <input 
            type="text"
            placeholder="Cari item pekerjaan..."
            value={tableFilterQuery}
            onChange={e => setTableFilterQuery(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white w-40 focus:outline-none focus:border-blue-500"
          />
          <button 
            onClick={handleSortTable}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg text-xs font-mono font-bold border border-slate-700 flex items-center gap-1.5 transition cursor-pointer"
          >
            Urutkan ID {tableSortAsc ? '↑' : '↓'}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px] bg-slate-950/40">
              <th className="p-3">Item Pekerjaan</th>
              <th className="p-3">Pagu Dana</th>
              <th className="p-3 text-right">Realisasi</th>
              <th className="p-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-slate-500 font-mono">
                  Tidak ditemukan pekerjaan yang cocok
                </td>
              </tr>
            ) : (
              filteredData.map((row) => (
                <tr key={row.id} className="hover:bg-slate-850/40 transition">
                  <td className="p-3 font-semibold text-slate-100">{row.item}</td>
                  <td className="p-3 font-mono">{row.budget}</td>
                  <td className="p-3 text-right text-emerald-400 font-mono font-bold">{row.realized}</td>
                  <td className="p-3 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase font-mono ${
                      row.status === 'Selesai' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : row.status === 'Berjalan'
                        ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="pt-2.5 flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-t border-slate-800/60">
        <span className="text-[10px] text-slate-500 font-mono">
          ✓ Laporan resmi terverifikasi dari Sekretariat Daerah Regional &amp; Kementerian Keuangan.
        </span>
        <button 
          onClick={handleExportCSV}
          className="bg-slate-950 border border-slate-800 hover:bg-slate-850 px-3 py-1.5 rounded-lg text-[10px] text-teal-400 font-mono font-bold flex items-center gap-1.5 transition cursor-pointer self-end sm:self-auto"
        >
          <Download className="h-3.5 w-3.5" /> Ekspor Laporan (.CSV)
        </button>
      </div>
    </div>
  );
}

// =========================================================================
// 3. SPATIAL ENTITY CONTEXT WIDGET (JARINGAN KONTEKS ENTITAS & GEOSPASIAL)
// =========================================================================
export function GeoEntityWidget({ locations = DEFAULT_LOCATIONS, entities = DEFAULT_ENTITIES, onSelectLocation, onSelectEntity }: {
  locations?: any[];
  entities?: any[];
  onSelectLocation?: (slug: string) => void;
  onSelectEntity?: (slug: string) => void;
}) {
  const [activeMarker, setActiveMarker] = useState('BANDUNG_HERITAGE');

  return (
    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4" id="widget-geo-entity">
      <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
        <span className="text-xs font-mono font-black text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
          <MapPin className="h-4 w-4 text-indigo-400" /> JARINGAN KONTEKS ENTITAS &amp; GEOSPASIAL
        </span>
        <span className="text-[9px] bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 px-2.5 py-0.5 rounded font-mono font-extrabold uppercase">
          Evolis GIS Map v3
        </span>
      </div>

      <p className="text-xs text-slate-400 font-sans leading-relaxed">
        Pemetaan spasial siber menghubungkan narasi berita digital dengan koordinat geografi riil di Jawa Barat. Klik entitas atau marker spasial untuk memetakan korelasi silang.
      </p>

      {/* Entity and location tags */}
      <div className="flex flex-wrap gap-2 pt-1">
        {locations.map((loc) => (
          <button
            key={loc.id}
            onClick={() => onSelectLocation?.(loc.slug)}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-850 hover:border-teal-500/50 text-slate-300 hover:text-teal-400 text-xs font-mono font-bold rounded-lg transition cursor-pointer"
          >
            📍 {loc.name}
            <span className="text-[8px] bg-slate-900 text-slate-500 px-1 rounded uppercase font-black">GEO</span>
          </button>
        ))}

        {entities.map((ent) => (
          <button
            key={ent.id}
            onClick={() => onSelectEntity?.(ent.slug)}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-850 hover:border-indigo-500/50 text-slate-300 hover:text-indigo-400 text-xs font-mono font-bold rounded-lg transition cursor-pointer"
          >
            👤 {ent.name}
            <span className="text-[8px] bg-slate-900 text-slate-500 px-1 rounded uppercase font-black">{ent.relation || 'ENT'}</span>
          </button>
        ))}
      </div>

      {/* Simulated Interactive Map */}
      <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950 aspect-video relative flex flex-col justify-between p-4 shadow-inner">
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
        
        <div className="flex justify-between items-start z-10">
          <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-lg text-[10px] font-mono shadow-md">
            <span className="text-teal-400 block font-black">ACTIVE ID: {activeMarker}</span>
            <span className="text-slate-400">Lat: -6.9175 | Long: 107.6191 (Gedung Sate)</span>
          </div>
          <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded uppercase font-black font-mono">
            GeoOS Connection Live
          </span>
        </div>

        {/* Map visualization radar effect */}
        <div className="flex items-center justify-center py-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-teal-500/5 border border-teal-500/20 flex items-center justify-center animate-pulse">
              <div className="w-10 h-10 rounded-full bg-teal-500/15 border border-teal-500/40 flex items-center justify-center">
                <button 
                  onClick={() => setActiveMarker(activeMarker === 'BANDUNG_HERITAGE' ? 'GEDUNG_SATE_CENTRAL' : 'BANDUNG_HERITAGE')}
                  className="w-4.5 h-4.5 rounded-full bg-teal-500 animate-bounce hover:scale-125 transition cursor-pointer"
                  title="Klik untuk berpindah koordinat"
                />
              </div>
            </div>
            {/* Compass rose accent */}
            <div className="absolute -top-12 -left-12 opacity-15 font-mono text-[9px] text-slate-400 pointer-events-none">
              N<br/>|<br/>W --+-- E<br/>|<br/>S
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center z-10 pt-2 border-t border-slate-900">
          <span className="text-[9px] font-mono text-slate-500">Sistem Referensi Spasial: SRID-4326 WGS84</span>
          <button 
            onClick={() => onSelectLocation?.(locations[0]?.slug || 'bandung')}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-black text-[10px] px-3 py-1.5 rounded transition shadow cursor-pointer"
          >
            Buka Peta Komprehensif GeoOS &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// 4. ACTIVE ANALYTICS TELEMETRY WIDGET (TELEMETRI ANALISIS AKTIF)
// =========================================================================
export function TelemetryWidget() {
  const [readTime, setReadTime] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([
    "[10:44:12] Memulai koneksi jembatan analitik.",
    "[10:44:13] Telemetri aktif terhubung ke database.",
    "[10:44:15] Menyiapkan log buffer penelusuran asinkron."
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setReadTime(prev => {
        const next = prev + 1;
        if (next === 5) addLog("Simulasi aktivitas audit: Peninjauan draf.");
        if (next === 12) addLog("Pemuatan data visualisasi Recharts sukses.");
        if (next === 25) addLog("Evaluasi audit log buffer rampung.");
        return next;
      });
      setScrollProgress(prev => Math.min(100, prev + Math.floor(Math.random() * 8)));
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString('id-ID');
    setLogs(prev => [`[${time}] ${msg}`, ...prev.slice(0, 4)]);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 text-left" id="widget-telemetry">
      <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
        <span className="text-xs font-mono text-slate-400 uppercase font-black tracking-widest block">
          TELEMETRI ANALISIS AKTIF (REAL-TIME INTERACTION)
        </span>
        <span className="text-[8px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/35 px-2 py-0.5 rounded font-mono font-bold animate-pulse">
          ● REALTIME LOGGER ACTIVE
        </span>
      </div>

      <p className="text-xs text-slate-400 font-sans leading-relaxed">
        Mengaudit aktivitas real-time, durasi penelusuran, dan interaksi draf berita untuk memitigasi anomali dan mengoptimalkan retensi pembaca.
      </p>

      <div className="grid grid-cols-2 gap-3 text-xs font-mono text-slate-300">
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 shadow-inner">
          <span className="text-[9px] text-slate-500 block uppercase font-bold mb-1">DURASI SESI AKTIF:</span>
          <span className="text-base font-black text-white">{readTime} detik</span>
        </div>
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 shadow-inner">
          <span className="text-[9px] text-slate-500 block uppercase font-bold mb-1">PROGRES PENINJAUAN:</span>
          <span className="text-base font-black text-teal-400">{scrollProgress}%</span>
        </div>
      </div>

      <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-900 space-y-1.5 shadow-inner">
        <span className="text-[9px] font-mono text-slate-500 block uppercase font-bold">AUDIT INTERACTIVE BUFFER LOG:</span>
        <div className="max-h-24 overflow-y-auto text-[10px] text-slate-400 space-y-1.5 divide-y divide-slate-900/60 font-mono scrollbar-thin">
          {logs.map((log, i) => (
            <div key={i} className="pt-1.5 first:pt-0">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// 5. GOOGLE NEWS JSON-LD MARKUP WIDGET (PREVIEW GOOGLE NEWS JSON-LD MARKUP)
// =========================================================================
export function SeoSchemaWidget({ headline = "Revitalisasi Braga Heritage & Keberlanjutan Fiskal Jabar 2026" }) {
  const schemaJson = `{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "${headline}",
  "image": ["https://infobos.com/assets/img/braga-heritage.jpg"],
  "datePublished": "2026-06-27T08:00:00+07:00",
  "author": {
    "@type": "Person",
    "name": "Tim Redaksi INFOBOS"
  },
  "publisher": {
    "@type": "Organization",
    "name": "INFOBOS Media Group",
    "logo": { 
      "@type": "ImageObject", 
      "url": "https://infobos.com/logo.png" 
    }
  }
}`;

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(schemaJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3.5 flex flex-col justify-between text-left" id="widget-seo-schema">
      <div>
        <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-2">
          <span className="text-xs font-mono text-slate-400 uppercase font-black tracking-widest block">
            PREVIEW GOOGLE NEWS JSON-LD MARKUP (SEO SCHEMA)
          </span>
          <button 
            onClick={handleCopy}
            className="text-[9px] bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 px-2.5 py-1 rounded font-bold border border-indigo-500/20 cursor-pointer transition"
          >
            {copied ? '✓ Tersalin!' : 'Salin JSON'}
          </button>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed mb-3 font-sans">
          Secara otomatis mengemas metadata artikel menggunakan struktur formal <code className="text-indigo-400 font-mono">schema.org/NewsArticle</code> agar divalidasi dan diindeks oleh bot perayap Google News dengan prioritas tinggi.
        </p>
        <div className="relative">
          <pre className="block bg-slate-950/90 p-3.5 rounded-xl border border-slate-900 text-indigo-300 font-mono text-[10px] max-h-36 overflow-y-auto leading-relaxed scrollbar-thin">
            <code>{schemaJson}</code>
          </pre>
        </div>
      </div>
      <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono pt-1.5 border-t border-slate-850">
        <span>✓ Markup standar AMP &amp; Google News</span>
        <span className="text-emerald-400 font-bold">Terintegrasi Google Search Console</span>
      </div>
    </div>
  );
}

// =========================================================================
// 6. RELATED MEDIA CLUSTERS (RUJUKAN KONTEN TERKAIT)
// =========================================================================
export function RelatedClustersWidget() {
  const clusters = [
    { title: "Menguak Potensi Heritage & Budaya Braga Tempo Doeloe", type: "VIDEO LIVE TV", badge: "VIDEO", bg: "bg-rose-500/10 text-rose-400 border-rose-500/20" },
    { title: "Gurita Inflasi Regional & APBD Jawa Barat 2026", type: "PODCAST AUDIO", badge: "AUDIO", bg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    { title: "Katalog UMKM Kuliner & Kerajinan Tangan Braga", type: "MARKETPLACE", badge: "UMKM", bg: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    { title: "Riset Kebijakan Alokasi Cagar Budaya PMK", type: "PDF DOCUMENT", badge: "RISUT", bg: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 text-left" id="widget-related-clusters">
      <div className="border-b border-slate-800 pb-2.5">
        <span className="text-xs font-mono text-slate-400 uppercase font-black tracking-widest block">
          Rujukan Konten Terkait (Related Clusters)
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 gap-3">
        {clusters.map((item, idx) => (
          <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-850 hover:border-slate-700 transition cursor-pointer group">
            <div className="flex justify-between items-start mb-1.5">
              <span className="text-[9px] font-mono text-slate-500">{item.type}</span>
              <span className={`text-[8px] font-mono font-black px-1.5 py-0.2 rounded uppercase border ${item.bg}`}>
                {item.badge}
              </span>
            </div>
            <h5 className="text-xs font-bold text-slate-300 group-hover:text-teal-400 transition leading-snug">
              {item.title}
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
}

// =========================================================================
// 7. COMMUNITY REPUTATION & LEADERBOARD (REPUTASI & PAPAN PERINGKAT KOMUNITAS)
// =========================================================================
export function ReputationLeaderboardWidget() {
  const [userReputation, setUserReputation] = useState(120);
  const [clickedAction, setClickedAction] = useState<string | null>(null);

  const handleAction = (pts: number, label: string) => {
    setUserReputation(prev => prev + pts);
    setClickedAction(`+${pts} Pts: ${label}`);
    setTimeout(() => setClickedAction(null), 2500);
  };

  const leaderboardUsers = [
    { rank: 1, name: 'Soni Sanjaya', points: 2840, badge: 'Ahli Fiskal Jabar', verified: true, self: false },
    { rank: 2, name: 'Dewi Sartika', points: 1920, badge: 'Analisis Regional', verified: true, self: false },
    { rank: 3, name: 'Sutisna', points: 1480, badge: 'Kontributor Mikro', verified: false, self: false },
    { rank: 4, name: 'Ir. Hermawan', points: 1120, badge: 'Geolog Lembang', verified: true, self: false },
    { rank: 5, name: 'Anda (Pembaca)', points: userReputation, badge: 'Analis Siber Junior', verified: false, self: true }
  ].sort((a, b) => b.points - a.points);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 text-left" id="widget-reputation-leaderboard">
      <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-1.5">
          <Award className="h-4.5 w-4.5 text-[#FFD700]" />
          <h4 className="text-xs font-mono font-black uppercase text-slate-100 tracking-wider">
            REPUTASI &amp; PAPAN PERINGKAT KOMUNITAS
          </h4>
        </div>
        <span className="text-[9px] bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 px-2 py-0.5 rounded font-black font-mono">
          Sistem Reputasi Pembaca
        </span>
      </div>

      {/* User Reputation Scorecard */}
      <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-850 flex items-center justify-between">
        <div>
          <span className="text-[8px] font-mono text-slate-500 uppercase font-black block">REPUTASI ANDA</span>
          <span className="text-xs font-sans font-black text-slate-200">Analis Siber Junior</span>
        </div>
        <div className="text-right">
          <span className="text-xl font-mono font-black text-indigo-400 block">{userReputation}</span>
          <span className="text-[8.5px] font-mono text-slate-400">Reputasi Pts</span>
        </div>
      </div>

      {/* Action triggers to gain points */}
      <div className="space-y-1.5">
        <span className="text-[9px] font-mono text-slate-500 uppercase font-black tracking-wider block">Dapatkan Poin Kontribusi:</span>
        <div className="grid grid-cols-2 gap-1.5">
          <button 
            onClick={() => handleAction(5, 'Tanggapan Berita')}
            className="p-1.5 bg-slate-950 hover:bg-white/5 rounded-lg border border-slate-850 hover:border-slate-750 text-[10px] font-bold text-slate-300 transition text-center cursor-pointer flex items-center justify-center gap-1"
          >
            <Zap className="h-3 w-3 text-amber-400" /> Tanggapi (+5)
          </button>
          <button 
            onClick={() => handleAction(10, 'Upvote Artikel')}
            className="p-1.5 bg-slate-950 hover:bg-white/5 rounded-lg border border-slate-850 hover:border-slate-750 text-[10px] font-bold text-slate-300 transition text-center cursor-pointer flex items-center justify-center gap-1"
          >
            <Award className="h-3 w-3 text-[#FFD700]" /> Upvote (+10)
          </button>
        </div>
        {clickedAction && (
          <div className="text-[9px] font-mono font-bold text-emerald-400 text-center bg-emerald-500/10 border border-emerald-500/20 py-1 rounded animate-fade-in">
            {clickedAction}
          </div>
        )}
      </div>

      {/* Leaderboard list */}
      <div className="space-y-2.5">
        <span className="text-[9px] font-mono text-slate-400 uppercase font-black tracking-wider block">Peringkat Pembaca Teratas:</span>
        
        <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
          {leaderboardUsers.map((userItem, idx) => {
            const isTop3 = idx < 3;
            return (
              <div 
                key={userItem.name} 
                className={`p-2 rounded-xl flex items-center justify-between text-xs transition ${
                  userItem.self 
                    ? 'bg-indigo-600/10 border border-indigo-600/30' 
                    : 'bg-slate-950 border border-slate-850 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`font-mono font-black text-xs w-4 text-center ${
                    isTop3 ? 'text-[#FFD700]' : 'text-slate-500'
                  }`}>
                    {idx + 1}
                  </span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold font-mono text-[10px] ${
                    userItem.self ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {userItem.name[0]}
                  </div>
                  <div className="leading-tight">
                    <div className="flex items-center gap-1">
                      <span className={`font-bold ${userItem.self ? 'text-indigo-300' : 'text-slate-200'}`}>
                        {userItem.name}
                      </span>
                      {userItem.verified && (
                        <span className="text-blue-400 text-[8px]" title="Kontributor Terverifikasi">☑</span>
                      )}
                    </div>
                    <span className="text-[8.5px] text-slate-500 font-medium block">{userItem.badge}</span>
                  </div>
                </div>
                <span className="font-mono font-black text-[#FFD700] text-xs">
                  {userItem.points} <span className="text-[8px] text-slate-500 font-normal">pts</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
