import React, { useState, useEffect, useRef } from 'react';
import { Play, Shield, Activity, RefreshCw, Layers, ExternalLink, Sliders, CheckCircle, Database, AlertTriangle, Eye, ShieldAlert, Cpu, Heart, Check, HelpCircle, EyeOff, Radio, Map, Calendar, FileText, Share2, AlertCircle, CloudSun } from 'lucide-react';

// Render Modes
export type RenderMode = 'Native' | 'Embed' | 'API' | 'RSS' | 'Link Only' | 'Disabled';

export interface IntegrationWidgetConfig {
  id: string;
  name: string;
  category: 'video' | 'livestream' | 'podcast' | 'maps' | 'calendar' | 'documents' | 'social' | 'charts' | 'weather' | 'disaster' | 'cctv';
  mode: RenderMode;
  url: string;
  embedCode: string;
  title: string;
  summary: string;
  sourceName: string;
  sourceLogo: string;
  autoRefresh: boolean;
  refreshInterval: number; // in seconds
  cacheDuration: number; // in minutes
  width: string;
  height: string;
  theme: 'light' | 'dark';
  isVisible: boolean;
  permissionRequired: boolean;
  performanceScore?: number;
}

// Default Seed Configurations
export const DEFAULT_WIDGETS: IntegrationWidgetConfig[] = [
  {
    id: 'widget-video-gedungsate',
    name: 'Dokumenter Arsitektur Gedung Sate',
    category: 'video',
    mode: 'Native',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    embedCode: '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Gedung Sate" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    title: 'Gedung Sate Heritage: Menelusuri Lorong Rahasia Zaman Kolonial',
    summary: 'Kajian eksklusif mengenai elemen arsitektur karya J. Gerber, ruang bawah tanah tersembunyi, hingga rencana tata pariwisata terpadu tahun 2026.',
    sourceName: 'INFOBOS Documentary Channel',
    sourceLogo: 'YT',
    autoRefresh: false,
    refreshInterval: 0,
    cacheDuration: 60,
    width: '100%',
    height: '400px',
    theme: 'dark',
    isVisible: true,
    permissionRequired: false,
    performanceScore: 98,
  },
  {
    id: 'widget-live-marapi',
    name: 'Siaran Langsung CCTV Aktivitas Marapi',
    category: 'livestream',
    mode: 'Embed',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    embedCode: '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1" title="CCTV Marapi Live" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    title: 'Erupsi Gunung Marapi Terkini: Pantauan Real-Time Visual Kawah Utama',
    summary: 'Sinyal pemantauan visual realtime gempa hembusan, deformasi lereng, dan sebaran abu vulkanik dari BNPB / PVMBG.',
    sourceName: 'BMKG / PVMBG Stream',
    sourceLogo: 'GOV',
    autoRefresh: true,
    refreshInterval: 30,
    cacheDuration: 5,
    width: '100%',
    height: '380px',
    theme: 'dark',
    isVisible: true,
    permissionRequired: false,
    performanceScore: 92,
  },
  {
    id: 'widget-podcast-sunda',
    name: 'Podcast Inovasi AI Sunda-Melayu',
    category: 'podcast',
    mode: 'Native',
    url: 'https://open.spotify.com/embed/episode/7mK9UAs1X9a7D1X6v8S9vN',
    embedCode: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/episode/01y6uFzXf0f5zX5FzX5FzX?utm_source=generator" width="100%" height="232" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
    title: 'Podcast Lab Intelijen: Masa Depan NLP Bahasa Dialek Sunda Regional',
    summary: 'Membahas pemetaan korpus dialek lokal Jawa Barat, integrasi kecerdasan buatan, dan penanganan bias semantik.',
    sourceName: 'INFOBOS Technical Pod',
    sourceLogo: 'SPOTIFY',
    autoRefresh: false,
    refreshInterval: 0,
    cacheDuration: 120,
    width: '100%',
    height: '232px',
    theme: 'light',
    isVisible: true,
    permissionRequired: false,
    performanceScore: 95,
  },
  {
    id: 'widget-maps-bandung',
    name: 'Peta Interaktif Geospasial Bandung',
    category: 'maps',
    mode: 'Embed',
    url: 'https://www.openstreetmap.org/export/embed.html?bbox=107.5500%2C-6.9500%2C107.6800%2C-6.8500&layer=mapnik',
    embedCode: '<iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=107.5818%2C-6.9234%2C107.6521%2C-6.8837&amp;layer=mapnik" style="border: 1px solid #ddd; border-radius:12px;"></iframe>',
    title: 'Pemetaan Koordinat Entitas Pariwisata & Kerentanan Regional Jabar',
    summary: 'Peta geospasial open-source yang memetakan persebaran situs pusaka daerah, pusat komersial, dan simpul lalu lintas utama.',
    sourceName: 'OpenStreetMap contributors',
    sourceLogo: 'OSM',
    autoRefresh: false,
    refreshInterval: 0,
    cacheDuration: 1440,
    width: '100%',
    height: '400px',
    theme: 'light',
    isVisible: true,
    permissionRequired: true,
    performanceScore: 97,
  },
  {
    id: 'widget-charts-tradingview',
    name: 'TradingView Market Overview Widget',
    category: 'charts',
    mode: 'Embed',
    url: 'https://s.tradingview.com/widgetembed/',
    embedCode: '<iframe src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_chart&symbol=IDX%3ACOMPOSITE&interval=D&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=light&style=1&timezone=Asia%2FJakarta&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=id&utm_source=infobos.com&utm_medium=widget&utm_campaign=chart-embed" width="100%" height="100%" frameborder="0" allowtransparency="true" scrolling="no" style="box-sizing: border-box; border-radius:12px;"></iframe>',
    title: 'Indeks Harga Saham Gabungan (IHSG) & Makro Finansial Indonesia',
    summary: 'Grafik performa bursa IDX Composite, volume transaksi harian, dan analisis tren komoditas energi regional.',
    sourceName: 'TradingView Market System',
    sourceLogo: 'TV',
    autoRefresh: true,
    refreshInterval: 60,
    cacheDuration: 15,
    width: '100%',
    height: '380px',
    theme: 'light',
    isVisible: true,
    permissionRequired: false,
    performanceScore: 89,
  },
  {
    id: 'widget-weather-jabar',
    name: 'Sinyal Cuaca & Udara Jawa Barat',
    category: 'weather',
    mode: 'API',
    url: 'https://api.open-meteo.com/v1/forecast?latitude=-6.9175&longitude=107.6191&current_weather=true',
    embedCode: '',
    title: 'Pemantau Suhu, Humiditas & Kecepatan Angin Bandung Raya',
    summary: 'Data sensor meteorologi real-time dari stasiun BMKG terdekat. Menampilkan parameter polusi udara PM2.5 dan prakiraan cuaca.',
    sourceName: 'Open-Meteo Public API',
    sourceLogo: 'METEO',
    autoRefresh: true,
    refreshInterval: 120,
    cacheDuration: 30,
    width: '100%',
    height: '180px',
    theme: 'light',
    isVisible: true,
    permissionRequired: false,
    performanceScore: 99,
  },
  {
    id: 'widget-disaster-usgs',
    name: 'Alert Gempa BMKG & USGS',
    category: 'disaster',
    mode: 'RSS',
    url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson',
    embedCode: '',
    title: 'Sistem Deteksi Amplitudo Seismik & Aktivitas Gempa Terkini RI',
    summary: 'Peringatan dini aktivitas tektonik dengan magnitudo > 3.0 SR di seluruh busur vulkanis kepulauan nusantara.',
    sourceName: 'USGS Earthquake Hazard Feed',
    sourceLogo: 'USGS',
    autoRefresh: true,
    refreshInterval: 15,
    cacheDuration: 2,
    width: '100%',
    height: '160px',
    theme: 'dark',
    isVisible: true,
    permissionRequired: false,
    performanceScore: 96,
  },
  {
    id: 'widget-cctv-bandung',
    name: 'Bandung Traffic Smart CCTV Feed',
    category: 'cctv',
    mode: 'Link Only',
    url: 'https://atcs.bandung.go.id/',
    embedCode: '',
    title: 'ATCS Kota Bandung: Simpang Dago & Pasteur Live Traffic',
    summary: 'Visualisasi antrean kendaraan, kepadatan rute mudik, dan koordinasi lalu lintas Dinas Perhubungan Kota Bandung secara langsung.',
    sourceName: 'ATCS Dishub Bandung',
    sourceLogo: 'DISHUB',
    autoRefresh: false,
    refreshInterval: 0,
    cacheDuration: 10,
    width: '100%',
    height: '350px',
    theme: 'light',
    isVisible: true,
    permissionRequired: true,
    performanceScore: 100,
  },
  {
    id: 'widget-doc-pmk2026',
    name: 'Kajian Kebijakan Stimulus Fiskal PDF',
    category: 'documents',
    mode: 'Embed',
    url: 'https://example.com/legal-document.pdf',
    embedCode: '<iframe src="https://docs.google.com/viewer?url=https://s1.q4cdn.com/805264966/files/doc_downloads/test.pdf&embedded=true" width="100%" height="100%" frameborder="0"></iframe>',
    title: 'Dokumen Resmi: Salinan Regulasi PMK Stimulus Start-up Digital 2026',
    summary: 'Rancangan tata peraturan perpajakan, insentif inkubator regional, dan kriteria kualifikasi pendanaan modal ventura terdaftar.',
    sourceName: 'Kementerian Keuangan RI',
    sourceLogo: 'KEMENKEU',
    autoRefresh: false,
    refreshInterval: 0,
    cacheDuration: 120,
    width: '100%',
    height: '450px',
    theme: 'light',
    isVisible: true,
    permissionRequired: false,
    performanceScore: 91,
  },
  {
    id: 'widget-calendar-event',
    name: 'Kalender Agenda Budaya & Bisnis Jabar',
    category: 'calendar',
    mode: 'Native',
    url: 'https://calendar.google.com/calendar/embed?src=id.indonesian%23holiday%40group.v.calendar.google.com',
    embedCode: '<iframe src="https://calendar.google.com/calendar/embed?src=id.indonesian%23holiday%40group.v.calendar.google.com&ctz=Asia%2FJakarta" style="border: 0" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>',
    title: 'Jadwal Agenda Pariwisata, Penayangan Berita & Webinar Komunitas',
    summary: 'Kalender sinkronisasi jadwal pameran kebudayaan Gedung Sate, festival bandung kreatif, serta liputan dewan pers mendatang.',
    sourceName: 'Google Calendar API',
    sourceLogo: 'G-CAL',
    autoRefresh: true,
    refreshInterval: 300,
    cacheDuration: 60,
    width: '100%',
    height: '350px',
    theme: 'light',
    isVisible: true,
    permissionRequired: false,
    performanceScore: 94,
  }
];

// Helper to load configurations from LocalStorage
export function loadWidgetConfigs(): IntegrationWidgetConfig[] {
  try {
    const saved = localStorage.getItem('infobos_widgets_v2');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load widgets state:', e);
  }
  return DEFAULT_WIDGETS;
}

// Helper to save configurations
export function saveWidgetConfigs(configs: IntegrationWidgetConfig[]) {
  try {
    localStorage.setItem('infobos_widgets_v2', JSON.stringify(configs));
  } catch (e) {
    console.error('Failed to save widgets state:', e);
  }
}

// Smart Loading wrapper component
interface IntegrationWidgetProps {
  widgetId: string;
  className?: string;
  onActionTrigger?: (action: string, metadata?: any) => void;
}

export function IntegrationWidget({ widgetId, className = '', onActionTrigger }: IntegrationWidgetProps) {
  const [widgets, setWidgets] = useState<IntegrationWidgetConfig[]>([]);
  const [widget, setWidget] = useState<IntegrationWidgetConfig | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [apiData, setApiData] = useState<any>(null);
  const [refreshCount, setRefreshCount] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load from local storage dynamically to reflect changes
  useEffect(() => {
    const configs = loadWidgetConfigs();
    setWidgets(configs);
    const found = configs.find(w => w.id === widgetId);
    if (found) {
      setWidget(found);
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  }, [widgetId]);

  // Smart Intersection Observer (Lazy Loading)
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '100px' } // Load slightly before coming into view
    );
    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, [widget]);

  // Simulate API or RSS Loading
  useEffect(() => {
    if (!widget || !visible || widget.mode === 'Disabled') return;

    setIsLoading(true);
    setHasError(false);

    const delay = setTimeout(() => {
      if (widget.mode === 'API') {
        // Mock a real open data weather return
        if (widget.category === 'weather') {
          setApiData({
            temperature: '24°C',
            condition: 'Cerah Berawan',
            humidity: '78%',
            windSpeed: '12 km/h',
            aqi: '62 (Sedang)',
            sensorTime: new Date().toLocaleTimeString('id-ID'),
          });
        } else {
          setApiData({ status: 'success', timestamp: Date.now() });
        }
      } else if (widget.mode === 'RSS') {
        // Mock earthquake RSS feed data
        if (widget.category === 'disaster') {
          setApiData([
            { id: '1', loc: 'Selat Sunda, Banten', mag: '4.8 SR', time: '12 menit lalu', depth: '10 km', potential: 'Tidak berpotensi tsunami' },
            { id: '2', loc: 'Kepulauan Mentawai, Sumbar', mag: '5.2 SR', time: '1 jam lalu', depth: '24 km', potential: 'Tidak berpotensi tsunami' },
            { id: '3', loc: 'Maluku Tenggara', mag: '3.9 SR', time: '4 jam lalu', depth: '80 km', potential: 'Tidak berpotensi tsunami' },
          ]);
        } else {
          setApiData({ feed: 'Synchronized XML payload' });
        }
      }
      setIsLoading(false);
    }, 1000); // 1 second graceful skeleton loader

    return () => clearTimeout(delay);
  }, [widget, visible, refreshCount]);

  // Auto-Refresh Interval Engine
  useEffect(() => {
    if (!widget || widget.mode === 'Disabled' || !widget.autoRefresh || widget.refreshInterval <= 0) return;

    const interval = setInterval(() => {
      setRefreshCount(prev => prev + 1);
    }, widget.refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [widget]);

  if (!widget || widget.mode === 'Disabled' || !widget.isVisible) {
    return null; // Don't render if disabled or hidden
  }

  const handleOpenSource = () => {
    if (onActionTrigger) {
      onActionTrigger('open_source', { url: widget.url, name: widget.sourceName });
    } else {
      window.open(widget.url, '_blank');
    }
  };

  const forceRefresh = () => {
    setRefreshCount(prev => prev + 1);
  };

  return (
    <div 
      id={widget.id} 
      ref={containerRef}
      className={`border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-xs relative transition duration-300 ${className}`}
    >
      {/* Widget Header with Status and Action Bar */}
      <div className="px-4 py-3 bg-slate-50 dark:!bg-[#070e1e] border-b border-slate-100 dark:!border-[#1e293b] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-full ${
            widget.mode === 'Native' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
            widget.mode === 'Embed' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
            widget.mode === 'API' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
            widget.mode === 'RSS' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
            'bg-slate-100 text-slate-600 border border-slate-200'
          }`}>
            {widget.mode} Mode
          </span>
          <span className="text-[10px] text-slate-400 font-mono">• {widget.sourceName}</span>
        </div>
        
        <div className="flex items-center gap-1.5">
          {widget.autoRefresh && (
            <span className="text-[9px] font-mono text-emerald-500 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Auto {widget.refreshInterval}s
            </span>
          )}
          <button 
            onClick={forceRefresh}
            title="Refresh data"
            className="p-1 hover:bg-slate-200 dark:hover:!bg-slate-800 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition"
          >
            <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button 
            onClick={handleOpenSource}
            title="Buka sumber resmi"
            className="p-1 hover:bg-slate-200 dark:hover:!bg-slate-800 rounded text-[#002B5B] transition"
          >
            <ExternalLink className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4" style={{ minHeight: '120px' }}>
        
        {!visible ? (
          /* Deferred Placeholder prior to observation */
          <div className="py-8 text-center text-slate-400 text-xs font-semibold animate-pulse space-y-2">
            <Cpu className="h-6 w-6 text-slate-300 mx-auto" />
            <p>Smart Loading: Menunggu viewport...</p>
          </div>
        ) : isLoading ? (
          /* Skeleton Loader when loading or changing */
          <div className="space-y-3 py-2 animate-pulse">
            <div className="h-4 bg-slate-100 rounded w-3/4"></div>
            <div className="h-3 bg-slate-100 rounded w-5/6"></div>
            <div className="h-3 bg-slate-100 rounded w-2/3"></div>
            <div className="h-28 bg-slate-50 border border-dashed rounded-xl flex items-center justify-center text-[11px] text-slate-400 font-mono">
              Deferred Render: Menginisialisasi jabat tangan aman...
            </div>
          </div>
        ) : hasError ? (
          /* Fallback view if error occurred */
          <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-center space-y-3">
            <AlertCircle className="h-8 w-8 text-rose-500 mx-auto" />
            <div className="text-xs font-bold text-rose-900">Gagal Memuat Integrasi Eksternal</div>
            <p className="text-[11px] text-rose-700">Terjadi kesalahan jabat tangan SSL atau pembatasan CORS pada domain resmi.</p>
            <button 
              onClick={handleOpenSource}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition"
            >
              Kunjungi Sumber Resmi Direct &rarr;
            </button>
          </div>
        ) : (
          /* Render based on RenderMode */
          <div className="space-y-3 text-left">
            
            {/* Title & Metadata always visible */}
            <div>
              <h3 className="font-display font-bold text-sm text-[#002B5B] leading-tight">
                {widget.title}
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                {widget.summary}
              </p>
            </div>

            {/* Mode: NATIVE (Beautiful custom simulated components) */}
            {widget.mode === 'Native' && (
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                {widget.category === 'video' && (
                  <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden group">
                    <img src="https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&q=80&w=400" alt="Native Player" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                    <button className="w-10 h-10 bg-teal-500 hover:bg-teal-400 text-white rounded-full flex items-center justify-center z-10 transition">
                      <Play className="h-4 w-4 fill-white ml-0.5" />
                    </button>
                    <span className="absolute bottom-2 right-2 bg-black/75 text-[9px] font-mono text-white px-1.5 py-0.2 rounded">14:20</span>
                  </div>
                )}
                {widget.category === 'podcast' && (
                  <div className="p-3 bg-[#001733] text-white rounded-xl flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#FFD700] text-[#002B5B] font-black rounded flex items-center justify-center text-xs shrink-0 shadow-sm animate-pulse">
                      POD
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="text-xs font-bold truncate">Eksplorasi Jurnalisme Jabar</div>
                      <div className="text-[10px] text-slate-400 truncate">Episode 48: Tekno &amp; Demografi</div>
                    </div>
                    <button className="p-2 bg-[#FFD700] hover:bg-white text-[#002B5B] rounded-full transition">
                      <Play className="h-3 w-3 fill-current" />
                    </button>
                  </div>
                )}
                {widget.category === 'calendar' && (
                  <div className="space-y-1.5 font-mono text-[10px]">
                    <div className="p-1.5 bg-emerald-50 text-emerald-800 border-l-2 border-emerald-500 rounded-r flex justify-between">
                      <span>Sidang Dewan Pers Jawa Barat</span>
                      <span className="font-bold">29 Juni 2026</span>
                    </div>
                    <div className="p-1.5 bg-blue-50 text-blue-800 border-l-2 border-blue-500 rounded-r flex justify-between">
                      <span>Kajian Insentif PMK Start-up</span>
                      <span className="font-bold">02 Juli 2026</span>
                    </div>
                  </div>
                )}
                <div className="text-[10px] text-slate-400 text-right italic">
                  * Merender performa tinggi via Portal Native Module.
                </div>
              </div>
            )}

            {/* Mode: EMBED (Iframes or direct oEmbed embed codes) */}
            {widget.mode === 'Embed' && (
              <div 
                className="w-full overflow-hidden rounded-xl border border-slate-100 bg-slate-950 flex items-center justify-center" 
                style={{ height: widget.height }}
                dangerouslySetInnerHTML={{ __html: widget.embedCode }}
              />
            )}

            {/* Mode: API (Beautiful cards rendering values fetched asynchronously) */}
            {widget.mode === 'API' && apiData && (
              <div className="p-3.5 bg-sky-50/50 border border-sky-100 rounded-xl">
                {widget.category === 'weather' ? (
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="space-y-1">
                      <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Temperatur</div>
                      <div className="text-xl font-bold text-sky-900 flex items-center gap-1">
                        <CloudSun className="h-5 w-5 text-sky-500" />
                        {apiData.temperature}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Kondisi</div>
                      <div className="text-xs font-semibold text-slate-700">{apiData.condition}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Kelembapan / Angin</div>
                      <div className="text-xs font-semibold text-slate-700">{apiData.humidity} / {apiData.windSpeed}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Index Kualitas Udara</div>
                      <div className="text-xs font-bold text-emerald-600">{apiData.aqi}</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs font-mono text-slate-600">
                    <span className="text-emerald-600 font-bold">API Handshake:</span> Success (200 OK)
                    <br />
                    Timestamp: {apiData.timestamp}
                  </div>
                )}
                <div className="text-[9px] text-sky-700 text-right mt-2 font-mono">
                  Sinyal Diperbarui: {apiData.sensorTime || 'Real-time'}
                </div>
              </div>
            )}

            {/* Mode: RSS (Aggregated feeds layout) */}
            {widget.mode === 'RSS' && apiData && Array.isArray(apiData) && (
              <div className="space-y-2">
                {apiData.map((item: any) => (
                  <div key={item.id} className="p-2.5 bg-rose-500/5 hover:bg-rose-500/10 border border-rose-500/10 rounded-xl text-left space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-rose-700 bg-rose-100 px-1.5 py-0.2 rounded">{item.mag}</span>
                      <span className="text-[9px] text-slate-400 font-mono">{item.time}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-800">{item.loc}</div>
                    <div className="flex justify-between items-center text-[9px] text-slate-500 font-mono">
                      <span>Kedalaman: {item.depth}</span>
                      <span className="text-rose-600 font-bold">{item.potential}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Mode: LINK ONLY (Summary view with source redirects) */}
            {widget.mode === 'Link Only' && (
              <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#002B5B] text-[#FFD700] rounded-lg flex items-center justify-center font-bold text-xs shrink-0">
                    {widget.sourceLogo}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-slate-800 truncate">{widget.sourceName}</div>
                    <div className="text-[9px] text-slate-400 truncate">{widget.url}</div>
                  </div>
                </div>
                <button 
                  onClick={handleOpenSource}
                  className="w-full py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 hover:text-slate-950 font-bold text-xs rounded-lg transition flex items-center justify-center gap-1"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>Kunjungi Sumber Portal Resmi</span>
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

// Sub-component: Integration Management Tab inside Admin Panel
export function IntegrationCMSManager({ token }: { token: string }) {
  const [widgets, setWidgets] = useState<IntegrationWidgetConfig[]>([]);
  const [editingWidget, setEditingWidget] = useState<IntegrationWidgetConfig | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [successMsg, setSuccessMsg] = useState<string>('');

  useEffect(() => {
    setWidgets(loadWidgetConfigs());
  }, []);

  const handleSaveWidget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingWidget) return;

    const updated = widgets.map(w => w.id === editingWidget.id ? editingWidget : w);
    setWidgets(updated);
    saveWidgetConfigs(updated);
    setEditingWidget(null);
    setSuccessMsg('Konfigurasi integrasi berhasil diperbarui secara real-time!');
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  const handleToggleWidgetVisibility = (id: string) => {
    const updated = widgets.map(w => {
      if (w.id === id) {
        return { ...w, isVisible: !w.isVisible };
      }
      return w;
    });
    setWidgets(updated);
    saveWidgetConfigs(updated);
  };

  const handleModeChange = (id: string, mode: RenderMode) => {
    const updated = widgets.map(w => {
      if (w.id === id) {
        return { ...w, mode };
      }
      return w;
    });
    setWidgets(updated);
    saveWidgetConfigs(updated);
  };

  const purgeCache = () => {
    setSuccessMsg('Seluruh memori cache CDN & grounding API dibersihkan!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const filtered = widgets.filter(w => activeCategoryFilter === 'all' || w.category === activeCategoryFilter);

  return (
    <div className="space-y-6 text-left">
      
      {/* CMS Informational banner */}
      <div className="bg-slate-950 text-white p-5 rounded-2xl border border-slate-850 dark:border-white/10 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-[#FFD700] uppercase font-mono">
          <Layers className="h-4 w-4 text-[#FFD700]" />
          MODUL ADVANCED INTEGRATION (INTEGRATION FIRST CMS)
        </div>
        <h3 className="font-display font-extrabold text-base">Media Aggregation &amp; Embed Control Deck</h3>
        <p className="text-[11px] text-slate-400 leading-relaxed max-w-3xl">
          Sesuai prinsip **Integration First**, Anda dapat mengubah representasi widget eksternal secara asinkron tanpa menyentuh source code. Mode render mendukung **Native, oEmbed, Iframe, API gateway, RSS XML parser, atau Link redirection** jika sumber dibatasi CORS/CSP.
        </p>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          {successMsg}
        </div>
      )}

      {/* Category filters & Core actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex gap-1 overflow-x-auto pb-1 whitespace-nowrap scrollbar-thin">
          {['all', 'video', 'livestream', 'podcast', 'maps', 'calendar', 'documents', 'charts', 'weather', 'disaster', 'cctv'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategoryFilter(cat)}
              className={`px-2.5 py-1.2 rounded-lg text-xs font-bold border capitalize transition ${
                activeCategoryFilter === cat 
                  ? 'bg-[#002B5B] text-[#FFD700] border-[#002B5B] dark:bg-[#FFD700] dark:text-[#002B5B] dark:border-[#FFD700] shadow-sm' 
                  : 'bg-white dark:bg-[#000a18]/60 text-slate-600 dark:text-slate-350 border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5'
              }`}
            >
              {cat === 'all' ? 'Semua Widget' : cat}
            </button>
          ))}
        </div>

        <button 
          onClick={purgeCache}
          className="px-3 py-1.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
        >
          <Database className="h-3.5 w-3.5 text-[#FFD700]" /> Bersihkan Cache
        </button>
      </div>

      {/* Editing dialog modal/block if active */}
      {editingWidget && (
        <form onSubmit={handleSaveWidget} className="bg-white dark:bg-[#001f42]/90 border border-[#FFD700] dark:border-white/20 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b dark:border-white/10 pb-2">
            <h4 className="text-xs font-black uppercase text-[#002B5B] dark:text-white flex items-center gap-1.5">
              <Sliders className="h-4 w-4 text-[#FFD700]" /> Edit Konfigurasi Integrasi: {editingWidget.name}
            </h4>
            <button 
              type="button" 
              onClick={() => setEditingWidget(null)} 
              className="text-xs text-slate-400 hover:text-slate-800 dark:hover:text-white"
            >
              Batal
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">Judul Tampilan</label>
              <input 
                type="text" 
                value={editingWidget.title}
                onChange={e => setEditingWidget({ ...editingWidget, title: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#000a18]/60 border dark:border-white/10 dark:text-white p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FFD700]"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">Nama Sumber Resmi</label>
              <input 
                type="text" 
                value={editingWidget.sourceName}
                onChange={e => setEditingWidget({ ...editingWidget, sourceName: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#000a18]/60 border dark:border-white/10 dark:text-white p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FFD700]"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">Render Mode *</label>
              <select 
                value={editingWidget.mode}
                onChange={e => setEditingWidget({ ...editingWidget, mode: e.target.value as RenderMode })}
                className="w-full bg-slate-50 dark:bg-[#000a18]/60 border dark:border-white/10 text-[#002B5B] dark:text-white p-2 rounded-lg font-bold focus:outline-none focus:ring-1 focus:ring-[#FFD700]"
              >
                <option value="Native">Native Component (Simulated)</option>
                <option value="Embed">Embed Code / Iframe</option>
                <option value="API">API Gateway Endpoint</option>
                <option value="RSS">RSS XML Aggregator</option>
                <option value="Link Only">Link Out &amp; Preview Card</option>
                <option value="Disabled">Disabled / Nonaktif</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">URL Sumber Resmi / API Endpoint</label>
              <input 
                type="text" 
                value={editingWidget.url}
                onChange={e => setEditingWidget({ ...editingWidget, url: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#000a18]/60 border dark:border-white/10 dark:text-white p-2 rounded-lg font-mono focus:outline-none focus:ring-1 focus:ring-[#FFD700]"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">Ukuran Dimensi Tampilan (Tinggi)</label>
              <input 
                type="text" 
                value={editingWidget.height}
                onChange={e => setEditingWidget({ ...editingWidget, height: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#000a18]/60 border dark:border-white/10 dark:text-white p-2 rounded-lg font-mono focus:outline-none focus:ring-1 focus:ring-[#FFD700]"
                placeholder="e.g. 400px"
              />
            </div>
          </div>

          {editingWidget.mode === 'Embed' && (
            <div className="space-y-1 text-xs">
              <label className="font-bold text-slate-700 dark:text-slate-300">Embed HTML Iframe Code</label>
              <textarea 
                rows={3}
                value={editingWidget.embedCode}
                onChange={e => setEditingWidget({ ...editingWidget, embedCode: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#000a18]/60 border dark:border-white/10 dark:text-white p-2 rounded-lg font-mono text-[10px] focus:outline-none focus:ring-1 focus:ring-[#FFD700]"
                placeholder="Masukkan tag <iframe>...</iframe>"
              />
            </div>
          )}

          <div className="space-y-1 text-xs">
            <label className="font-bold text-slate-700 dark:text-slate-300">Ringkasan / Metadata Keterangan</label>
            <textarea 
              rows={2}
              value={editingWidget.summary}
              onChange={e => setEditingWidget({ ...editingWidget, summary: e.target.value })}
              className="w-full bg-slate-50 dark:bg-[#000a18]/60 border dark:border-white/10 dark:text-white p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FFD700]"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="autoRef"
                checked={editingWidget.autoRefresh}
                onChange={e => setEditingWidget({ ...editingWidget, autoRefresh: e.target.checked })}
                className="rounded border-slate-300 dark:border-white/10 text-teal-600 focus:ring-teal-500"
              />
              <label htmlFor="autoRef" className="font-bold text-slate-700 dark:text-slate-300">Aktifkan Auto Refresh</label>
            </div>

            {editingWidget.autoRefresh && (
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-600 dark:text-slate-300">Interval:</span>
                <input 
                  type="number" 
                  value={editingWidget.refreshInterval}
                  onChange={e => setEditingWidget({ ...editingWidget, refreshInterval: Number(e.target.value) })}
                  className="w-20 bg-slate-50 dark:bg-[#000a18]/60 border dark:border-white/10 dark:text-white p-1 rounded font-mono focus:outline-none focus:ring-1 focus:ring-[#FFD700]"
                />
                <span className="text-slate-400 dark:text-slate-550">detik</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="perm"
                checked={editingWidget.permissionRequired}
                onChange={e => setEditingWidget({ ...editingWidget, permissionRequired: e.target.checked })}
                className="rounded border-slate-300 dark:border-white/10 text-teal-600 focus:ring-teal-500"
              />
              <label htmlFor="perm" className="font-bold text-slate-700 dark:text-slate-300">Butuh Izin Frame</label>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-2 bg-[#002B5B] hover:bg-[#001733] dark:bg-[#FFD700] dark:text-[#002B5B] dark:hover:bg-[#FFD700]/90 text-white font-bold text-xs rounded-xl transition shadow-sm"
          >
            Simpan Konfigurasi &amp; Sync State Global
          </button>
        </form>
      )}

      {/* Widgets list configuration grid */}
      <div className="bg-white dark:bg-[#001f42]/90 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 dark:bg-[#000a18]/40 border-b border-slate-200/60 dark:border-white/10 font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center justify-between">
          <span>Daftar Saluran Integrasi &amp; Monitoring Uptime</span>
          <span className="font-mono text-[10px] text-slate-400">Total: {filtered.length} Widgets</span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-white/5">
          {filtered.map(w => (
            <div key={w.id} className="p-4 hover:bg-slate-50/50 dark:hover:bg-white/5 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Info columns */}
              <div className="space-y-1 max-w-xl text-left">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] bg-slate-100 dark:bg-[#000a18]/80 text-slate-600 dark:text-slate-300 font-bold px-2 py-0.2 rounded-full uppercase tracking-wider font-mono">
                    {w.category}
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-white">{w.name}</span>
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-mono truncate">{w.url}</p>
                <div className="flex items-center gap-3 text-[10px] text-slate-500 pt-0.5">
                  <span className="flex items-center gap-1">
                    <Cpu className="h-3 w-3 text-slate-400 dark:text-slate-500" />
                    Perf Score: <strong className={w.performanceScore && w.performanceScore > 90 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}>{w.performanceScore}%</strong>
                  </span>
                  <span>•</span>
                  <span>Cache: <strong className="text-slate-600 dark:text-slate-400">{w.cacheDuration}m</strong></span>
                </div>
              </div>

              {/* Mode changer & Editing actions */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                
                {/* Real-time Mode Quick Selector */}
                <select
                  value={w.mode}
                  onChange={(e) => handleModeChange(w.id, e.target.value as RenderMode)}
                  className="bg-slate-50 dark:bg-[#000a18]/60 border border-slate-200 dark:border-white/10 text-[#002B5B] dark:text-white text-xs font-bold px-2 py-1 rounded-lg focus:outline-none"
                >
                  <option value="Native">Native</option>
                  <option value="Embed">Embed</option>
                  <option value="API">API</option>
                  <option value="RSS">RSS</option>
                  <option value="Link Only">Link</option>
                  <option value="Disabled">Disabled</option>
                </select>

                {/* Visible status toggle */}
                <button
                  onClick={() => handleToggleWidgetVisibility(w.id)}
                  title={w.isVisible ? 'Sembunyikan dari Publik' : 'Tampilkan ke Publik'}
                  className={`p-1.5 rounded-lg border transition ${
                    w.isVisible 
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-800/50' 
                      : 'bg-rose-50 text-rose-500 border-rose-200 hover:bg-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-800/50'
                  }`}
                >
                  {w.isVisible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                </button>

                {/* Edit Config button */}
                <button
                  onClick={() => setEditingWidget(w)}
                  className="px-2.5 py-1.5 bg-[#002B5B] hover:bg-[#001733] dark:bg-[#FFD700] dark:text-[#002B5B] dark:hover:bg-[#FFD700]/90 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-xs"
                >
                  <Sliders className="h-3 w-3 text-[#FFD700] dark:text-[#002B5B]" /> Config
                </button>

              </div>

            </div>
          ))}

          {filtered.length === 0 && (
            <div className="py-8 text-center text-slate-400 dark:text-slate-500 text-xs font-semibold">
              Tidak ada modul integrasi di bawah kategori ini.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
