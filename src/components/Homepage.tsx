import React, { useState, useEffect } from 'react';
import { 
  Eye, Clock, Flame, MapPin, ExternalLink, Calendar, Compass, 
  Sparkles, TrendingUp, AlertCircle, BookOpen, Layers, Newspaper, ChevronRight,
  ChevronLeft, Play, Pause, Volume2, Heart, Camera, Tv, Radio, Hash,
  Building2, Flag, Briefcase, Cpu, Award, Send, Check, Mail, RefreshCw, CloudRain, ShieldCheck,
  Video, Wind, Droplets, AlertTriangle, Wifi, ShoppingBag, Activity, Globe, Share2, Youtube,
  Bookmark, Sliders, Instagram, Facebook, Twitter, Music, MessageSquare, Home, Menu
} from 'lucide-react';
import { motion } from 'motion/react';
import * as d3 from 'd3';
import AdZone from './AdZone';
import { LiveFeedDashboard } from './LiveFeedDashboard';
import LiteUtilityHub from './LiteUtilityHub';
import BannerAdSlider from './BannerAdSlider';
import SidebarLokerNiaga from './SidebarLokerNiaga';

interface Article {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  summary: string;
  contentType: string;
  sentiment: string;
  riskLevel: string;
  heroImageUrl?: string;
  authorName: string;
  categoryName: string;
  categorySlug: string;
  viewCount: number;
  readingTimeMinutes: number;
  createdAt: string;
  locations: any[];
}

interface HomepageProps {
  user?: any;
  categorySlug?: string;
  onSelectArticle: (slug: string) => void;
  onSelectLocation: (slug: string) => void;
  onSelectEntity: (slug: string) => void;
  onNavigate?: (slug: string, type: string) => void;
  simulatedRole?: string;
  onUpgradeSuccess?: (role: string) => void;
  topicPreferences?: string[];
  onSaveTopicPreferences?: (preferences: string[]) => void;
  onToggleSidebar?: () => void;
}

// ==========================================
// SEISMIC ACTIVITY D3 GEOMAP HELPER DEFINITIONS
// ==========================================

const INDONESIAN_ISLANDS_GEO = [
  // Sumatra
  {
    name: "Sumatra",
    coords: [
      [95.3, 5.6], [98.0, 3.0], [101.5, 0.5], [105.0, -5.2], [106.0, -5.9],
      [104.5, -4.5], [102.3, -1.6], [98.5, 1.8], [95.9, 5.2], [95.3, 5.6]
    ]
  },
  // Java
  {
    name: "Java",
    coords: [
      [105.2, -5.9], [114.5, -8.7], [114.6, -8.2], [108.5, -6.3], [105.9, -5.9], [105.2, -5.9]
    ]
  },
  // Kalimantan
  {
    name: "Kalimantan",
    coords: [
      [109.1, 2.0], [111.5, 1.1], [114.0, 4.2], [117.9, 4.1], [119.2, 2.2], 
      [118.0, -1.2], [116.6, -4.1], [114.5, -3.5], [111.0, -3.0], [109.0, -1.5], [109.1, 2.0]
    ]
  },
  // Sulawesi
  {
    name: "Sulawesi",
    coords: [
      [119.8, -5.6], [120.5, -2.5], [121.2, -3.0], [122.6, -5.3], [123.0, -4.0],
      [122.4, -2.8], [124.5, -0.8], [125.1, 1.6], [120.8, 1.0], [119.2, -1.5], [119.8, -5.6]
    ]
  },
  // Papua
  {
    name: "Papua",
    coords: [
      [130.8, -1.3], [135.0, -3.0], [136.0, -1.7], [138.0, -2.5], [141.0, -2.6],
      [141.0, -9.0], [137.5, -8.3], [134.5, -4.0], [130.8, -1.3]
    ]
  },
  // Bali & Nusa Tenggara
  {
    name: "Nusa Tenggara",
    coords: [
      [114.5, -8.2], [116.0, -8.4], [118.5, -8.6], [120.5, -8.6], [123.5, -10.2],
      [125.0, -8.8], [127.0, -8.2], [125.0, -9.5], [120.0, -9.0], [115.0, -8.8], [114.5, -8.2]
    ]
  },
  // Maluku / Halmahera
  {
    name: "Halmahera",
    coords: [
      [127.5, 1.8], [128.5, 1.5], [128.0, -0.5], [127.2, -0.2], [127.5, 1.8]
    ]
  },
  {
    name: "Seram",
    coords: [
      [128.0, -3.2], [130.8, -3.0], [130.5, -3.8], [128.0, -3.6], [128.0, -3.2]
    ]
  }
];

const parseCoordinates = (coordStr: string) => {
  if (!coordStr) return null;
  const parts = coordStr.split(',');
  if (parts.length >= 2) {
    let latVal = parts[0].replace(/[^0-9.-]/g, '').trim();
    let lat = parseFloat(latVal);
    if (parts[0].toUpperCase().includes('S') || parts[0].toUpperCase().includes('LS')) {
      lat = -Math.abs(lat);
    }
    
    let lngVal = parts[1].replace(/[^0-9.-]/g, '').trim();
    let lng = parseFloat(lngVal);
    if (parts[1].toUpperCase().includes('B') && !parts[1].toUpperCase().includes('BT') && !parts[1].toUpperCase().includes('BB')) {
      // Normal east longitude
    } else if (parts[1].toUpperCase().includes('BB')) {
      lng = -Math.abs(lng);
    }
    
    if (!isNaN(lat) && !isNaN(lng)) {
      return { lat, lng };
    }
  }
  return null;
};

interface SeismicMapProps {
  coordinates: string;
  locationName: string;
  magnitude: number;
  severity: 'low' | 'medium' | 'high';
  isHighlighted?: boolean;
}

const SeismicMap: React.FC<SeismicMapProps> = ({ coordinates, locationName, magnitude, severity, isHighlighted = false }) => {
  const parsed = parseCoordinates(coordinates);
  if (!parsed) {
    return (
      <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-center text-[9px] text-slate-400 font-mono">
        Format koordinat tidak valid ({coordinates})
      </div>
    );
  }

  const { lat, lng } = parsed;

  const width = 290;
  const height = 125;

  // Set up D3 Equirectangular projection centered on Indonesia
  const projection = d3.geoEquirectangular()
    .center([118, -3.0])
    .scale(350)
    .translate([width / 2, height / 2]);

  // Line generator for our islands paths
  const lineGenerator = d3.line<[number, number]>()
    .x(d => projection(d)?.[0] ?? 0)
    .y(d => projection(d)?.[1] ?? 0)
    .curve(d3.curveCardinalClosed);

  const [epicenterX, epicenterY] = projection([lng, lat]) || [width / 2, height / 2];

  const gridLines = {
    longitudes: [95, 100, 105, 110, 115, 120, 125, 130, 135, 140],
    latitudes: [5, 0, -5, -10]
  };

  let markerColor = "fill-emerald-500 stroke-emerald-600";
  if (severity === 'high') {
    markerColor = "fill-rose-500 stroke-rose-600";
  } else if (severity === 'medium') {
    markerColor = "fill-amber-500 stroke-amber-600";
  }

  return (
    <div className={`bg-slate-900 rounded-lg p-2 border space-y-1.5 overflow-hidden shadow-inner relative select-none transition-colors duration-300 ${isHighlighted ? 'border-rose-500 bg-slate-850' : 'border-slate-880'}`}>
      <div className="flex justify-between items-center text-[7.5px] font-mono text-slate-400 leading-none">
        <span className="flex items-center gap-1 font-bold">
          <Globe className={`h-2.5 w-2.5 text-rose-400 ${isHighlighted ? 'animate-bounce' : 'animate-pulse'}`} /> SEISMIC D3 MONITOR
        </span>
        <span>Lat: {lat.toFixed(2)}°, Lng: {lng.toFixed(2)}°</span>
      </div>

      <div className={`relative overflow-hidden rounded border transition-colors duration-300 ${isHighlighted ? 'bg-slate-950/90 border-rose-500/50' : 'bg-slate-950/60 border-slate-880'}`} style={{ width, height }}>
        <svg width={width} height={height} className="block">
          {/* Graticule grid lines */}
          {gridLines.longitudes.map((lon) => {
            const [x] = projection([lon, 0]) || [0, 0];
            return (
              <line
                key={`lon-${lon}`}
                x1={x}
                y1={0}
                x2={x}
                y2={height}
                stroke="#1e293b"
                strokeWidth={0.5}
                strokeDasharray="2,3"
              />
            );
          })}
          {gridLines.latitudes.map((ltd) => {
            const [, y] = projection([118, ltd]) || [0, 0];
            return (
              <line
                key={`lat-${ltd}`}
                x1={0}
                y1={y}
                x2={width}
                y2={y}
                stroke="#1e293b"
                strokeWidth={0.5}
                strokeDasharray="2,3"
              />
            );
          })}

          {/* Graticule labels */}
          {gridLines.longitudes.filter((_, i) => i % 2 === 0).map((lon) => {
            const [x] = projection([lon, 0]) || [0, 0];
            return (
              <text
                key={`lon-txt-${lon}`}
                x={x}
                y={height - 2}
                fill="#475569"
                fontSize="5.5px"
                fontFamily="monospace"
                textAnchor="middle"
              >
                {lon}°
              </text>
            );
          })}

          {gridLines.latitudes.map((ltd) => {
            const [, y] = projection([118, ltd]) || [0, 0];
            return (
              <text
                key={`lat-txt-${ltd}`}
                x={3}
                y={y + 1.5}
                fill="#475569"
                fontSize="5.5px"
                fontFamily="monospace"
                textAnchor="start"
              >
                {ltd}°
              </text>
            );
          })}

          {/* Draw Indonesian islands */}
          {INDONESIAN_ISLANDS_GEO.map((island) => {
            const dStr = lineGenerator(island.coords as [number, number][]);
            if (!dStr) return null;
            return (
              <path
                key={island.name}
                d={dStr}
                fill="#0f172a"
                stroke={isHighlighted ? "#475569" : "#334155"}
                strokeWidth={0.7}
              />
            );
          })}

          {/* Epicenter dynamic pinging rings */}
          <circle
            cx={epicenterX}
            cy={epicenterY}
            r={isHighlighted ? 18 : 10}
            className="animate-ping"
            style={{
              transformOrigin: `${epicenterX}px ${epicenterY}px`,
              animationDuration: isHighlighted ? '1s' : '2s'
            }}
            fill="none"
            stroke={isHighlighted ? '#f43f5e' : severity === 'high' ? '#f43f5e' : severity === 'medium' ? '#f59e0b' : '#10b981'}
            strokeWidth={isHighlighted ? 2 : 1}
            opacity={isHighlighted ? 0.8 : 0.4}
          />
          <circle
            cx={epicenterX}
            cy={epicenterY}
            r={isHighlighted ? 32 : 20}
            className="animate-ping"
            style={{
              transformOrigin: `${epicenterX}px ${epicenterY}px`,
              animationDuration: isHighlighted ? '1.5s' : '3s'
            }}
            fill="none"
            stroke={isHighlighted ? '#f59e0b' : severity === 'high' ? '#f43f5e' : severity === 'medium' ? '#f59e0b' : '#10b981'}
            strokeWidth={isHighlighted ? 1.5 : 0.5}
            opacity={isHighlighted ? 0.6 : 0.25}
          />

          {/* Center solid marker */}
          <circle
            cx={epicenterX}
            cy={epicenterY}
            r={isHighlighted ? 7.5 : 4.5}
            className={isHighlighted ? "fill-[#ffeb3b] stroke-rose-500 animate-pulse" : markerColor}
            strokeWidth={isHighlighted ? 1.5 : 1}
            stroke={isHighlighted ? "#ffffff" : "#ffffff"}
          />

          {/* Glowing central core */}
          <circle
            cx={epicenterX}
            cy={epicenterY}
            r={isHighlighted ? 2.5 : 1.5}
            fill={isHighlighted ? "#f43f5e" : "#ffffff"}
          />

          {/* Floating interactive epicenter label */}
          {isHighlighted && (
            <g className="animate-bounce" style={{ transformOrigin: `${epicenterX}px ${epicenterY}px` }}>
              <rect
                x={epicenterX - 42}
                y={epicenterY - 22}
                width={84}
                height={12}
                rx={3}
                fill="#f43f5e"
                stroke="#ffffff"
                strokeWidth={0.5}
              />
              <text
                x={epicenterX}
                y={epicenterY - 14}
                fill="#ffffff"
                fontSize="5px"
                fontWeight="black"
                fontFamily="sans-serif"
                textAnchor="middle"
              >
                EPISENTRUM GEMPA
              </text>
              <polygon
                points={`${epicenterX - 2.5},${epicenterY - 10} ${epicenterX + 2.5},${epicenterY - 10} ${epicenterX},${epicenterY - 7}`}
                fill="#f43f5e"
                stroke="#ffffff"
                strokeWidth={0.5}
              />
            </g>
          )}
        </svg>

        <div className="absolute bottom-1 right-1 bg-slate-950/80 px-1 py-0.5 rounded text-[5.5px] font-mono text-slate-400">
          M{magnitude.toFixed(1)}
        </div>
      </div>
    </div>
  );
};

export default function Homepage({
  user,
  categorySlug,
  onSelectArticle,
  onSelectLocation,
  onSelectEntity,
  onNavigate,
  simulatedRole,
  onUpgradeSuccess,
  topicPreferences = [],
  onSaveTopicPreferences,
  onToggleSidebar
}: HomepageProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeRegion, setActiveRegion] = useState('semua');
  const [activeSentiment, setActiveSentiment] = useState('semua');
  const [activeContentType, setActiveContentType] = useState('semua');

  // Topic preference filter control
  const [isPreferenceFilterActive, setIsPreferenceFilterActive] = useState<boolean>(() => {
    const saved = localStorage.getItem('infobos_use_preference_filter');
    return saved !== 'false';
  });

  const togglePreferenceFilter = () => {
    const newValue = !isPreferenceFilterActive;
    setIsPreferenceFilterActive(newValue);
    localStorage.setItem('infobos_use_preference_filter', String(newValue));
  };

  const getCategoryLabel = (slug: string) => {
    switch (slug) {
      case 'live-feed': return 'Live Feed 🔴';
      case 'regional': return 'Regional & Bandung Raya';
      case 'nasional': return 'Nasional Jabar';
      case 'politik': return 'Politik & Pemerintahan';
      case 'ekonomi': return 'Ekonomi & Fiskal';
      case 'internasional': return 'Internasional';
      case 'business': return 'Business & UMKM';
      case 'technology': return 'Technology & Smart City';
      case 'startup': return 'Startup & Inovasi';
      case 'ai-data': return 'AI & Data';
      case 'pendidikan': return 'Pendidikan & Riset';
      case 'kesehatan': return 'Kesehatan & Layanan Publik';
      case 'sports': return 'Sports & Olahraga';
      case 'lifestyle': return 'Lifestyle & Wisata';
      case 'otomotif': return 'Otomotif & Industri';
      case 'properti': return 'Properti & Real Estate';
      case 'investigasi': return 'Investigasi Redaksi';
      case 'analisis': return 'Analisis Data';
      case 'riset-insight': return 'Riset & Insight';
      default: return slug.charAt(0).toUpperCase() + slug.slice(1);
    }
  };

  const getCategoryDesc = (slug: string) => {
    switch (slug) {
      case 'live-feed': return 'Siaran langsung teks peristiwa, konferensi pers, dan laporan terkini detik-demi-detik langsung dari lokasi kejadian.';
      case 'regional': return 'Kabar berita terlengkap seputar pembangunan, kebijakan, dan dinamika komunitas di wilayah Jawa Barat dan Bandung Raya.';
      case 'nasional': return 'Fokus utama kebijakan regulasi publik, anggaran pemerintah pusat, kebijakan kementerian, serta dampaknya ke daerah.';
      case 'politik': return 'Liputan dinamika politik, kebijakan partai, kerja sama birokrasi, pemilu, pilkada, dan tata kelola pemerintahan.';
      case 'ekonomi': return 'Analisis indikator ekonomi makro, kebijakan moneter, inflasi daerah, APBN/APBD, dan stabilitas fiskal.';
      case 'internasional': return 'Dinamika geopolitik global, hubungan diplomatik bilateral, isu kerja sama internasional, ekspor-impor, dan berita dunia.';
      case 'business': return 'Analisis pasar, perkembangan ekonomi makro, investasi regional, dan program kemitraan UMKM Jawa Barat.';
      case 'technology': return 'Inovasi teknologi digital, inisiatif desa digital, siber security, sistem kota pintar, dan start-up lokal.';
      case 'startup': return 'Liputan ekosistem perusahaan rintisan, pendanaan modal ventura, akselerator, dan inovasi bisnis digital lokal.';
      case 'ai-data': return 'Riset kecerdasan buatan, visual data interaktif, penginderaan jauh GIS, dan mitigasi kebencanaan daerah.';
      case 'pendidikan': return 'Berita akademis, riset ilmiah, kebijakan kurikulum nasional, beasiswa daerah, dan kemajuan institusi pendidikan.';
      case 'kesehatan': return 'Informasi pelayanan kesehatan masyarakat, jaminan sosial BPJS, riset farmasi, imunisasi, dan pola hidup sehat.';
      case 'sports': return 'Prestasi olahraga Jawa Barat, liputan turnamen daerah, pembinaan atlet muda, dan persiapan PON Jabar.';
      case 'lifestyle': return 'Eksplorasi kuliner lokal legendaris, panduan wisata cagar budaya, anyaman kerajinan tangan, dan gaya hidup urban sehat.';
      case 'otomotif': return 'Perkembangan pasar kendaraan listrik, kebijakan manufaktur, komunitas hobi otomotif, dan tips berkendara aman.';
      case 'properti': return 'Kajian pasar real estate, tren hunian milenial, suku bunga KPR daerah, serta proyek properti residensial dan komersial.';
      case 'investigasi': return 'Laporan investigasi mendalam tim redaksi INFOBOS menyingkap fakta tersembunyi di balik kebijakan publik.';
      case 'analisis': return 'Analisis teoretis dan data empiris mendalam dari pengamat sosiologi, ekonomi, dan politik terkemuka.';
      case 'riset-insight': return 'Riset statistik, survei opini publik, hasil kajian lembaga riset internal, serta proyeksi pembangunan sektoral.';
      default: return 'Kumpulan laporan berita terpercaya, berimbang, dan akurat dari tim jurnalis redaksi INFOBOS.';
    }
  };

  // Synchronized Bookmarks with standard user key 'read_later_{email | 'default'}'
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  const getBookmarkKey = () => {
    return `read_later_${user?.email || 'default'}`;
  };

  useEffect(() => {
    const key = getBookmarkKey();
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch {
        setBookmarks([]);
      }
    } else {
      setBookmarks([]);
    }
  }, [user]);

  const toggleBookmark = (art: any) => {
    const key = getBookmarkKey();
    const saved = localStorage.getItem(key);
    let list: any[] = [];
    if (saved) {
      try {
        list = JSON.parse(saved);
      } catch {
        list = [];
      }
    }
    const exists = list.some((x: any) => x.slug === art.slug);
    let updatedList: any[] = [];
    if (exists) {
      updatedList = list.filter((x: any) => x.slug !== art.slug);
    } else {
      const newBookmark = {
        id: art.id || String(Date.now()),
        title: art.title || 'Artikel Tanpa Judul',
        slug: art.slug,
        date: new Date(art.createdAt || Date.now()).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
        categoryName: art.categoryName || 'UMUM'
      };
      updatedList = [newBookmark, ...list];
    }
    setBookmarks(updatedList);
    localStorage.setItem(key, JSON.stringify(updatedList));
  };
  
  // Interactive research spotlight widget tab
  const [researchTab, setResearchTab] = useState<'summary' | 'impact' | 'business'>('summary');

  // Video Streaming widget states
  const [activeChannel, setActiveChannel] = useState<'infobos-tv' | 'jabar-news' | 'bandung-live'>('infobos-tv');
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  // Shorts simulator states
  const [activeShortIdx, setActiveShortIdx] = useState(0);
  const [shortLikes, setShortLikes] = useState([1420, 856, 2190]);
  const [hasLikedShort, setHasLikedShort] = useState([false, false, false]);

  // Podcast simulator states
  const [podcastPlaying, setPodcastPlaying] = useState(false);
  const [activePodcastIdx, setActivePodcastIdx] = useState(0);
  const [podcastProgress, setPodcastProgress] = useState(35); // simulated percent
  const [podcastVolume, setPodcastVolume] = useState(80);

  // Gallery simulator states
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  // CCTV simulator states
  const [activeCctvNode, setActiveCctvNode] = useState('simpang-dago');
  const [cctvLoading, setCctvLoading] = useState(false);

  // Newsletter signup state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Simulated live event feed states
  const [liveEventLogs, setLiveEventLogs] = useState([
    "08:42 WIB - Redaksi mendeteksi persiapan panggung revitalisasi Gedung Sate.",
    "09:15 WIB - Menkeu Sri Mulyani mendarat di Bandara Husein Sastranegara.",
    "10:30 WIB - Konferensi Pers Dinas Kebudayaan Jabar terkait heritage.",
    "11:12 WIB - Kurs Rupiah menguat tipis ke Rp 15.742 per USD.",
    "12:05 WIB - Sesi diskusi panel startup digital Bandung dimulai.",
  ]);

  // --- States for 5 New Home Sidebar Widgets ---
  const [activeAqiCity, setActiveAqiCity] = useState<'bandung' | 'bekasi' | 'depok' | 'cirebon' | 'bogor'>('bandung');
  const [selectedWadukStatus, setSelectedWadukStatus] = useState<string>('all');
  const [activeWarningId, setActiveWarningId] = useState<number | null>(1);
  const [servicePingStatus, setServicePingStatus] = useState<Record<string, number | string>>({
    sapawarga: 42,
    sabar: 68,
    'saber-hoaks': 55,
    'open-data': 80,
    pikobar: 49,
  });
  const [pingingServiceId, setPingingServiceId] = useState<string | null>(null);
  const [staplesPriceRegion, setStaplesPriceRegion] = useState<'jabar' | 'bandung_city'>('jabar');

  // --- States and logic for Seismic Activity Widget ---
  const [seismicData, setSeismicData] = useState<any[]>([]);
  const [seismicLoading, setSeismicLoading] = useState(true);
  const [seismicSource, setSeismicSource] = useState("Memuat...");
  const [selectedSeismicId, setSelectedSeismicId] = useState<string | null>(null);
  const [showMapForId, setShowMapForId] = useState<string | null>(null);
  const [copiedSeismicId, setCopiedSeismicId] = useState<string | null>(null);
  const [hoveredSeismicId, setHoveredSeismicId] = useState<string | null>(null);

  const fetchSeismicData = () => {
    setSeismicLoading(true);
    fetch('/api/v1/seismic')
      .then(res => res.json())
      .then(resData => {
        if (resData.success) {
          setSeismicData(resData.data || []);
          setSeismicSource(resData.source);
        }
        setSeismicLoading(false);
      })
      .catch(err => {
        console.error("Gagal mengambil data gempa:", err);
        setSeismicLoading(false);
      });
  };

  useEffect(() => {
    fetchSeismicData();
  }, []);

  const handlePingService = (id: string) => {
    setPingingServiceId(id);
    setTimeout(() => {
      setServicePingStatus(prev => ({
        ...prev,
        [id]: Math.floor(Math.random() * 80) + 15
      }));
      setPingingServiceId(null);
    }, 600);
  };

  const handleHomeClick = () => {
    if (onNavigate) {
      onNavigate('home', 'category');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLiveTvClick = () => {
    if (onNavigate) {
      onNavigate('video-hub', 'category');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMinatClick = () => {
    const el = document.getElementById('interest-preferences-heading');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const card = el.closest('.rounded-xl');
      if (card) {
        card.classList.add('ring-2', 'ring-indigo-500', 'dark:ring-[#FFD700]', 'transition-all', 'duration-300');
        setTimeout(() => {
          card.classList.remove('ring-2', 'ring-indigo-500', 'dark:ring-[#FFD700]');
        }, 1500);
      }
    }
  };

  // Fetch articles based on category or filters
  useEffect(() => {
    let url = '/api/v1/contents';
    const params: string[] = [];
    if (categorySlug && categorySlug !== 'home') {
      params.push(`category=${categorySlug}`);
    }
    if (activeRegion && activeRegion !== 'semua') {
      params.push(`location=${activeRegion}`);
    }
    if (activeSentiment && activeSentiment !== 'semua') {
      params.push(`sentiment=${activeSentiment}`);
    }
    if (activeContentType && activeContentType !== 'semua') {
      params.push(`contentType=${activeContentType}`);
    }
    if (params.length) {
      url += '?' + params.join('&');
    }

    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setArticles(data.contents || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Gagal memuat berita:", err);
        setLoading(false);
      });
  }, [categorySlug, activeRegion, activeSentiment, activeContentType]);

  // Trigger simulated CCTV reload
  const handleCctvChange = (node: string) => {
    setActiveCctvNode(node);
    setCctvLoading(true);
    const timer = setTimeout(() => setCctvLoading(false), 800);
    return () => clearTimeout(timer);
  };

  const getSentimentEmoji = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return '🟢';
      case 'negative': return '🔴';
      case 'neutral': return '🟡';
      case 'investigative': return '🔍';
      default: return '⚪';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      case 'high': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'medium': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'regional': return <MapPin className="h-4 w-4" />;
      case 'nasional': return <Flag className="h-4 w-4" />;
      case 'politik': return <Flag className="h-4 w-4" />;
      case 'ekonomi': return <TrendingUp className="h-4 w-4" />;
      case 'internasional': return <Compass className="h-4 w-4" />;
      case 'business': return <Briefcase className="h-4 w-4" />;
      case 'technology': return <Cpu className="h-4 w-4" />;
      case 'startup': return <Sparkles className="h-4 w-4" />;
      case 'ai-data': return <Sparkles className="h-4 w-4" />;
      case 'pendidikan': return <BookOpen className="h-4 w-4" />;
      case 'kesehatan': return <Activity className="h-4 w-4" />;
      case 'sports': return <Award className="h-4 w-4" />;
      case 'lifestyle': return <Heart className="h-4 w-4" />;
      case 'otomotif': return <Cpu className="h-4 w-4" />;
      case 'properti': return <Building2 className="h-4 w-4" />;
      default: return <Layers className="h-4 w-4" />;
    }
  };

  // Divide fetched content into Hero and feed grids based on topic preferences
  const hasPreferences = topicPreferences && topicPreferences.length > 0;
  const isBrowsingHome = !categorySlug || categorySlug === 'home';

  const filteredArticles = (hasPreferences && isPreferenceFilterActive && isBrowsingHome)
    ? articles.filter(art => {
        const artSlug = art.categorySlug?.toLowerCase() || '';
        return topicPreferences.some(pref => pref.toLowerCase() === artSlug);
      })
    : articles;

  const articlesToDivide = filteredArticles.length > 0 ? filteredArticles : articles;

  const heroArticle = articlesToDivide[0] || {
    id: "fallback-hero",
    title: "Revitalisasi Terpadu Wisata Heritage Gedung Sate Resmi Dimulai Sore Ini",
    summary: "Pemprov Jawa Barat bersama Kementerian Kebudayaan dan Pariwisata meresmikan proyek revitalisasi koridor sejarah Gedung Sate guna meningkatkan daya tarik wisata edukasi dan kepatuhan cagar budaya.",
    slug: "revitalisasi-terpadu-wisata-heritage-gedung-sate",
    categoryName: "Regional",
    authorName: "Analis Redaksi Jabar",
    readingTimeMinutes: 5,
    viewCount: 4210,
    heroImageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800",
    sentiment: "positive",
    riskLevel: "low",
    locations: [{ name: "Bandung" }]
  };

  const displayArticles = articlesToDivide.length > 1 ? articlesToDivide.slice(1) : [
    {
      id: "fallback-2",
      title: "PMK Terbaru Stimulus Fiskal Digital Nasional Diterbitkan Sri Mulyani",
      summary: "Insentif perpajakan final untuk pelaku startup dan ekosistem digital resmi meluncur.",
      slug: "pmk-terbaru-stimulus-fiskal-digital-nasional",
      categoryName: "Nasional",
      authorName: "Managing Editor",
      readingTimeMinutes: 4,
      viewCount: 1980,
      heroImageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600",
      sentiment: "positive",
      riskLevel: "medium",
      locations: [{ name: "Jakarta" }]
    },
    {
      id: "fallback-3",
      title: "Kebijakan Suku Bunga Global dan Pengaruhnya terhadap Ketahanan Daerah",
      summary: "Analisis mendalam mengenai kesiapan perbankan daerah dalam menghadapi fluktuasi ekonomi moneter.",
      slug: "kebijakan-suku-bunga-global",
      categoryName: "Business",
      authorName: "Riset Redaksi",
      readingTimeMinutes: 6,
      viewCount: 1540,
      heroImageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600",
      sentiment: "neutral",
      riskLevel: "high",
      locations: [{ name: "Bandung" }]
    },
    {
      id: "fallback-4",
      title: "Penerapan AI dalam Analisis Geografis dan Mitigasi Bencana Jabar",
      summary: "BPBD Jabar mengadopsi model machine learning untuk memetakan risiko tanah longsor regional.",
      slug: "penerapan-ai-analisis-geografis-jabar",
      categoryName: "Technology",
      authorName: "Evolis Engine",
      readingTimeMinutes: 7,
      viewCount: 2890,
      heroImageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600",
      sentiment: "positive",
      riskLevel: "low",
      locations: [{ name: "Bandung" }]
    }
  ];

  // Category list definitions for the Bento display
  const sectorCategories = [
    { name: "Live Feed", slug: "live-feed", count: 8, color: "from-rose-50/90 to-rose-100/50 hover:to-rose-200/60 border-rose-200 text-rose-900", desc: "Laporan Langsung Redaksi", sub: "Liputan Teks • Realtime Update" },
    { name: "Regional", slug: "regional", count: 18, color: "from-blue-50/90 to-blue-100/50 hover:to-blue-200/60 border-blue-200 text-blue-900", desc: "Jawa Barat & Bandung Raya", sub: "Gedung Sate • Jabar Selatan" },
    { name: "Nasional", slug: "nasional", count: 24, color: "from-emerald-50/70 to-emerald-100/50 hover:to-emerald-200/60 border-emerald-200 text-emerald-900", desc: "Pemerintahan & Fiskal", sub: "APBD • Regulasi Pusat" },
    { name: "Internasional", slug: "internasional", count: 12, color: "from-purple-50/70 to-purple-100/50 hover:to-purple-200/60 border-purple-200 text-purple-900", desc: "Geopolitik & Diplomasi", sub: "Asia Pasifik • Ekspor" },
    { name: "Business", slug: "business", count: 15, color: "from-amber-50/70 to-amber-100/50 hover:to-amber-200/60 border-amber-200 text-amber-900", desc: "Ekonomi & Kemitraan UMKM", sub: "Patimban • Investasi" },
    { name: "Technology", slug: "technology", count: 20, color: "from-teal-50/70 to-teal-100/50 hover:to-teal-200/60 border-teal-200 text-teal-900", desc: "Smart City & Digital Jabar", sub: "Siber • Desa Digital" },
    { name: "AI & Data", slug: "ai-data", count: 16, color: "from-cyan-50/70 to-cyan-100/50 hover:to-cyan-200/60 border-cyan-200 text-cyan-900", desc: "Machine Learning & Mitigasi", sub: "Early Warning • GIS" },
    { name: "Sports", slug: "sports", count: 10, color: "from-rose-50/70 to-rose-100/50 hover:to-rose-200/60 border-rose-200 text-rose-900", desc: "Prestasi & Atlet Daerah", sub: "PON • Pembinaan Jabar" },
    { name: "Lifestyle", slug: "lifestyle", count: 14, color: "from-pink-50/70 to-pink-100/50 hover:to-pink-200/60 border-pink-200 text-pink-900", desc: "Wisata Heritage & Kuliner", sub: "Cagar Budaya • Kreatif" }
  ];

  const sectorDarkColors: Record<string, string> = {
    'live-feed': "dark:from-rose-950/40 dark:to-rose-900/10 dark:border-rose-900/40 dark:hover:from-rose-900/30 dark:text-rose-300",
    regional: "dark:from-blue-950/40 dark:to-blue-900/10 dark:border-blue-900/40 dark:hover:from-blue-900/30 dark:text-blue-300",
    nasional: "dark:from-emerald-950/40 dark:to-emerald-900/10 dark:border-emerald-900/40 dark:hover:from-emerald-900/30 dark:text-emerald-300",
    internasional: "dark:from-purple-950/40 dark:to-purple-900/10 dark:border-purple-900/40 dark:hover:from-purple-900/30 dark:text-purple-300",
    business: "dark:from-amber-950/30 dark:to-amber-900/10 dark:border-amber-900/40 dark:hover:from-amber-900/30 dark:text-amber-300",
    technology: "dark:from-teal-950/40 dark:to-teal-900/10 dark:border-teal-900/40 dark:hover:from-teal-900/30 dark:text-teal-300",
    'ai-data': "dark:from-cyan-950/40 dark:to-cyan-900/10 dark:border-cyan-900/40 dark:hover:from-cyan-900/30 dark:text-cyan-300",
    sports: "dark:from-rose-950/40 dark:to-rose-900/10 dark:border-rose-900/40 dark:hover:from-rose-900/30 dark:text-rose-300",
    lifestyle: "dark:from-pink-950/40 dark:to-pink-900/10 dark:border-pink-900/40 dark:hover:from-pink-900/30 dark:text-pink-300"
  };

  // Simulated short video reels
  const shortVideos = [
    {
      title: "Wisata Gedung Sate dari Udara",
      duration: "0:15",
      views: "12.4K views",
      bg: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400",
      caption: "Mengagumi arsitektur bersejarah dari sudut drone 4K."
    },
    {
      title: "Kemacetan Pasteur Pagi Ini",
      duration: "0:24",
      views: "8.5K views",
      bg: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=400",
      caption: "Pantauan terkini Simpang Pasteur ramai lancar."
    },
    {
      title: "Kuliner Bandung yang Lagi Viral",
      duration: "0:30",
      views: "21.9K views",
      bg: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
      caption: "Mencoba seblak ceker pedas level dewa di Dipatiukur."
    }
  ];

  // Simulated podcasts
  const podcasts = [
    {
      title: "Ep. 42 - Menakar Dampak PMK Pajak Digital Bagi UMKM Jabar",
      host: "Host: Dr. Irwan Maulana",
      duration: "18:42",
      date: "25 Juni 2026",
      desc: "Diskusi mendalam mengenai regulasi perpajakan startup lokal terbaru dan implikasinya."
    },
    {
      title: "Ep. 41 - Revitalisasi Cagar Budaya & Ekonomi Sirkular Kota Bandung",
      host: "Host: Rian Baskoro",
      duration: "24:10",
      date: "21 Juni 2026",
      desc: "Bagaimana melestarikan gedung bersejarah sekaligus meningkatkan devisa pariwisata."
    },
    {
      title: "Ep. 40 - Masa Depan AI Generatif dalam Jurnalisme Investigasi",
      host: "Host: Amelia Safitri",
      duration: "15:35",
      date: "18 Juni 2026",
      desc: "Kupas tuntas pemanfaatan model bahasa untuk mempercepat investigasi berita tanpa bias."
    }
  ];

  // Visual gallery images
  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
      title: "Keindahan Sunrise di Kebun Teh Pangalengan Jabar",
      author: "Foto oleh: Erwin Sutrisno"
    },
    {
      url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
      title: "Pemandangan Gedung Perkantoran Sudirman Jakarta",
      author: "Foto oleh: Shanti Dewi"
    },
    {
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
      title: "Kolaborasi Komunitas Pengembang AI di Bandung",
      author: "Foto oleh: Budi Prakoso"
    }
  ];

  // West Java startup/companies list
  const popularCompanies = [
    { name: "Bandung BioTech Corp", industry: "HealthTech & AgriTech", status: "Kemitraan Pemprov" },
    { name: "Pasundan FinTech", industry: "Sistem Pembayaran Mikro", status: "Tersertifikasi OJK" },
    { name: "Gedung Sate Devs Studio", industry: "Smart City Solutions", status: "Binaan Dinas Kominfo" }
  ];

  const handleLikeShort = (idx: number) => {
    const updatedLiked = [...hasLikedShort];
    const updatedLikes = [...shortLikes];
    if (updatedLiked[idx]) {
      updatedLikes[idx]--;
      updatedLiked[idx] = false;
    } else {
      updatedLikes[idx]++;
      updatedLiked[idx] = true;
    }
    setHasLikedShort(updatedLiked);
    setShortLikes(updatedLikes);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  if (categorySlug === 'live-feed') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 font-sans space-y-4 text-left">
        {/* 1. AD ZONE LEADERBOARD */}
        <AdZone zone="top_leaderboard" pageContext={{ category: categorySlug }} />
        <LiveFeedDashboard user={user} onSelectArticle={onSelectArticle} />
        {/* 3. AD ZONE FOOTER BILLBOARD */}
        <AdZone zone="footer_billboard" pageContext={{ category: categorySlug }} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 font-sans space-y-4 text-left">
      
      {/* 1. AD ZONE LEADERBOARD */}
      <AdZone zone="top_leaderboard" pageContext={{ category: categorySlug }} />

      {/* 2. MAIN GRID STRUCTURE (MAIN FEED + RIGHT SIDEBAR) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* ================= LEFT MAIN CONTENT COLUMN (8 of 12) ================= */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* CATEGORY FOCUS BANNER */}
          {categorySlug && categorySlug !== 'home' && (
            <div className="bg-gradient-to-r from-indigo-50/50 via-[#002B5B]/5 to-indigo-50/20 dark:from-[#001c3d] dark:to-[#002B5B]/20 border border-indigo-100 dark:border-white/10 rounded-xl p-4.5 shadow-2xs text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                      <Newspaper className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[10px] font-mono font-black tracking-widest text-[#2B7A78] uppercase">
                      KANAL INFORMASI INFOBOS
                    </span>
                  </div>
                  <h1 className="font-display font-black text-xl sm:text-2xl text-[#002B5B] dark:text-white tracking-tight flex items-center gap-1.5 mt-0.5">
                    {getCategoryLabel(categorySlug)}
                  </h1>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-300 leading-relaxed max-w-2xl">
                    {getCategoryDesc(categorySlug)}
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('home', 'category');
                    }
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-700 dark:text-slate-200 transition-all cursor-pointer flex items-center gap-1.5 shrink-0 shadow-3xs"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  <span>Kembali ke Beranda</span>
                </button>
              </div>
            </div>
          )}

          {/* TOPIC PREFERENCE BANNER */}
          {hasPreferences && isBrowsingHome && (
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-slate-900 dark:to-[#001f42]/40 border border-teal-200/50 dark:border-teal-900/30 rounded-xl p-3 sm:p-4 shadow-3xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-left transition-all duration-300">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <Sliders className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
                  <span className="text-[10px] sm:text-xs font-black text-[#002B5B] dark:text-slate-100 uppercase tracking-wider">
                    Disaring Berdasarkan Minat Anda
                  </span>
                  {isPreferenceFilterActive ? (
                    <span className="bg-teal-500 text-slate-950 font-sans text-[8px] px-1.5 py-0.1 rounded font-extrabold uppercase animate-pulse">
                      Aktif
                    </span>
                  ) : (
                    <span className="bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400 font-sans text-[8px] px-1.5 py-0.1 rounded font-extrabold uppercase">
                      Nonaktif
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {topicPreferences.map(pref => {
                    const label = pref.charAt(0).toUpperCase() + pref.slice(1);
                    return (
                      <span 
                        key={pref} 
                        className="bg-teal-500/10 text-teal-700 dark:text-teal-400 text-[8.5px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md border border-teal-500/20"
                      >
                        {label}
                      </span>
                    );
                  })}
                </div>
              </div>
              
              <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
                <button
                  onClick={togglePreferenceFilter}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition duration-200 cursor-pointer ${
                    isPreferenceFilterActive 
                      ? 'bg-teal-500 text-slate-950 hover:bg-teal-400 shadow-xs' 
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  {isPreferenceFilterActive ? 'Lihat Semua Berita' : 'Terapkan Minat'}
                </button>
                
                <button
                  onClick={() => {
                    if (onSaveTopicPreferences) {
                      onSaveTopicPreferences([]);
                    }
                  }}
                  className="text-[9px] font-bold text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition"
                  title="Hapus preferensi minat untuk menampilkan semua berita secara permanen"
                >
                  Hapus Filter
                </button>
              </div>
            </div>
          )}

          {/* WARNING BANNER IF MINAT FILTER ACTIVE BUT EMPTY RESULTS */}
          {hasPreferences && isPreferenceFilterActive && isBrowsingHome && filteredArticles.length === 0 && (
            <div className="bg-amber-50 dark:bg-amber-950/10 border border-amber-200 dark:border-amber-900/30 rounded-xl p-3 text-left">
              <p className="text-[10px] text-amber-800 dark:text-amber-400 font-bold">
                ⚠️ Belum ada berita rilis terbaru yang cocok dengan preferensi minat Anda saat ini. Menampilkan semua berita utama sebagai alternatif.
              </p>
            </div>
          )}
          
          {/* A. HERO NEWS */}
          <section className="bg-white dark:bg-[#001c3d] polet-card-top border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition duration-300">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-7/12 aspect-[16/10] overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                <img 
                  src={heroArticle.heroImageUrl} 
                  alt={heroArticle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-101 transition duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#002B5B] dark:bg-[#FFD700] text-[#FFD700] dark:text-slate-950 text-[9px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
                  Laporan Utama
                </span>
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[9px] px-2 py-0.5 rounded flex items-center gap-1 font-mono">
                  <MapPin className="h-2.5 w-2.5 text-rose-400" />
                  {heroArticle.locations?.[0]?.name || "Jawa Barat"}
                </div>
              </div>
              
              <div className="md:w-5/12 p-4 sm:p-5 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono border dark:border-teal-900/30">
                      {heroArticle.categoryName}
                    </span>
                    <span className="text-slate-400 text-[10px] font-mono flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {heroArticle.readingTimeMinutes} Menit Baca
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <h2 
                      onClick={() => onSelectArticle(heroArticle.slug)}
                      className="font-display font-black text-lg sm:text-xl text-[#002B5B] dark:text-white hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer transition leading-tight tracking-tight flex-1"
                    >
                      {heroArticle.title}
                    </h2>
                    <div className="flex gap-1.5 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(heroArticle);
                        }}
                        className={`p-1.5 sm:p-2 rounded-xl transition shadow-xs flex items-center justify-center cursor-pointer border ${
                          bookmarks.some(b => b.slug === heroArticle.slug)
                            ? 'bg-amber-500 text-white border-amber-600 hover:bg-amber-600 dark:bg-amber-600 dark:border-amber-700'
                            : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700'
                        }`}
                        title={bookmarks.some(b => b.slug === heroArticle.slug) ? "Hapus Bookmark" : "Simpan Berita"}
                      >
                        <Bookmark className={`h-3.5 w-3.5 ${bookmarks.some(b => b.slug === heroArticle.slug) ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          sessionStorage.setItem('autoPlayTts', 'true');
                          onSelectArticle(heroArticle.slug);
                        }}
                        className="p-1.5 sm:p-2 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition shadow-xs flex items-center gap-1 font-sans text-[10px] font-black cursor-pointer shrink-0 dark:bg-indigo-950/40 dark:text-indigo-400 dark:hover:bg-indigo-800 dark:hover:text-indigo-100 dark:border dark:border-indigo-900/50"
                        title="Dengarkan Berita Ini"
                      >
                        <Volume2 className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Dengarkan</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed line-clamp-3">
                    {heroArticle.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-white/10 mt-4 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 border dark:border-white/10 flex items-center justify-center font-bold font-mono text-[#002B5B] dark:text-slate-100">
                      {heroArticle.authorName[0]}
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{heroArticle.authorName}</span>
                  </div>
                  <div className="text-slate-400 font-mono flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span>{heroArticle.viewCount} views</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* C. LITE UTILITY HUB MOVED TO SIDEBAR */}

          {/* B. TOP STORIES & LATEST NEWS GRIDS */}
          <section className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 polet-left-stripe">
              <div className="flex items-center gap-2">
                <Flame className="h-4.5 w-4.5 text-rose-500 fill-rose-500" />
                <h3 className="font-display font-black text-xs text-[#002B5B] uppercase tracking-wider">
                  Top Stories & Kabar Terbaru
                </h3>
              </div>
              <span className="text-[9px] text-slate-400 font-mono font-bold">Terbit Real-Time</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {displayArticles.map((art, idx) => (
                <React.Fragment key={art.id}>
                  <div 
                    className="bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden hover:shadow-md transition duration-200 flex flex-col justify-between text-slate-900 dark:text-slate-100"
                  >
                    <div>
                      {art.heroImageUrl && (
                        <div className="aspect-[16/10] bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                          <img 
                            src={art.heroImageUrl} 
                            alt={art.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-2 left-2 text-[8px] font-mono font-bold bg-[#002B5B]/80 text-white px-1.5 py-0.2 rounded">
                            {art.categoryName}
                          </span>
                        </div>
                      )}
                      <div className="p-3.5 space-y-1.5 text-left">
                        <div className="flex items-start justify-between gap-2">
                          <h4 
                            onClick={() => onSelectArticle(art.slug)}
                            className="font-display font-bold text-xs sm:text-sm text-[#002B5B] dark:text-slate-100 hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer transition line-clamp-2 leading-snug flex-1"
                          >
                            {art.title}
                          </h4>
                          <div className="flex gap-1 shrink-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleBookmark(art);
                              }}
                              className={`p-1.5 rounded-lg transition cursor-pointer flex items-center justify-center border ${
                                bookmarks.some(b => b.slug === art.slug)
                                  ? 'bg-amber-500 text-white border-amber-600 hover:bg-amber-600 dark:bg-amber-600 dark:border-amber-700'
                                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700'
                              }`}
                              title={bookmarks.some(b => b.slug === art.slug) ? "Hapus Bookmark" : "Simpan Berita"}
                            >
                              <Bookmark className={`h-3.5 w-3.5 ${bookmarks.some(b => b.slug === art.slug) ? 'fill-current' : ''}`} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                sessionStorage.setItem('autoPlayTts', 'true');
                                onSelectArticle(art.slug);
                              }}
                              className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition cursor-pointer shrink-0 dark:bg-indigo-950/40 dark:text-indigo-400 dark:hover:bg-indigo-800 dark:hover:text-indigo-100 dark:border dark:border-indigo-900/50"
                              title="Dengarkan Berita Ini"
                            >
                              <Volume2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">{art.summary}</p>
                      </div>
                    </div>

                    <div className="px-3.5 py-2 border-t border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-[#001126] flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1">
                        <span>{getSentimentEmoji(art.sentiment)}</span>
                        <span className={`px-1 py-0.2 font-mono text-[8px] rounded border uppercase ${getRiskColor(art.riskLevel)}`}>
                          Risk: {art.riskLevel}
                        </span>
                      </div>
                      {art.locations?.[0] && (
                        <span className="text-slate-400 font-semibold flex items-center gap-0.5 truncate max-w-[80px]">
                          <MapPin className="h-2.5 w-2.5" />
                          {art.locations[0].name}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Insert Banner Slider Ad every 4 rows (12 items) or as fallback if list has fewer than 12 items */}
                  {((idx + 1) % 12 === 0 || (idx === displayArticles.length - 1 && displayArticles.length < 12)) && (
                    <BannerAdSlider />
                  )}
                </React.Fragment>
              ))}
            </div>
          </section>

          {/* C. CATEGORY BENTO GRIDS (Regional, Nasional, Internasional, Business, Technology, AI, Sports, Lifestyle) */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 polet-left-stripe">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-[#002B5B]/10 text-[#002B5B] rounded-lg">
                  <Layers className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="font-display font-black text-sm text-[#002B5B] uppercase tracking-wider">
                    Sektoral &amp; Kanal Liputan
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">Analisis tren liputan &amp; kecocokan anomali data berdasarkan rubrikasi berita.</p>
                </div>
              </div>
              <span className="text-[10px] bg-[#2B7A78]/10 text-[#2B7A78] px-2.5 py-1 rounded-full font-mono font-bold">
                8 KANAL UTAMA
              </span>
            </div>

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05
                  }
                }
              }}
            >
              {sectorCategories.map((sec) => (
                <motion.div 
                  key={sec.slug}
                  onClick={() => {
                    setActiveRegion('semua');
                    setActiveSentiment('semua');
                    setActiveContentType('semua');
                    if (onNavigate) {
                      onNavigate(sec.slug, 'category');
                    } else {
                      onSelectLocation(sec.slug);
                    }
                    // Smoothly scroll to top of the page to view the filtered news
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 25 } }
                  }}
                  whileHover={{ y: -4, scale: 1.015 }}
                  className={`border border-slate-200 rounded-2xl p-4.5 text-left cursor-pointer transition-all duration-300 shadow-2xs hover:shadow-md flex flex-col justify-between bg-gradient-to-br ${sec.color} dark:bg-gradient-to-br ${sectorDarkColors[sec.slug] || 'dark:from-slate-900 dark:to-slate-950 dark:border-slate-800 dark:text-slate-200'} group relative overflow-hidden`}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl translate-x-4 -translate-y-4 group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
                  
                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-black tracking-widest uppercase bg-white/80 dark:bg-[#001126]/80 px-2 py-0.5 rounded-md shadow-3xs text-slate-700 dark:text-slate-300">
                        KANAL {sec.slug === 'ai-data' ? 'AI' : sec.name.toUpperCase()}
                      </span>
                      <div className="p-1.5 bg-white/70 dark:bg-[#001126]/70 rounded-xl shadow-4xs text-slate-800 dark:text-slate-200 transition-transform duration-300 group-hover:rotate-12">
                        {getCategoryIcon(sec.slug)}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-display font-black text-base tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-[#002B5B] dark:group-hover:text-amber-400 transition-colors">
                        {sec.name}
                      </h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                        {sec.desc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/40 dark:border-white/10 flex items-center justify-between text-[10px] font-mono relative z-10">
                    <div className="text-slate-500 dark:text-slate-400">
                      <span className="font-bold text-slate-800 dark:text-slate-100 bg-white/60 dark:bg-[#001126]/60 px-1.5 py-0.5 rounded mr-1 shadow-4xs">
                        {sec.count}
                      </span>
                      <span>Artikel Aktif</span>
                    </div>
                    <span className="flex items-center gap-0.5 text-[#002B5B] dark:text-slate-300 font-bold transition-all duration-300 group-hover:translate-x-1.5">
                      <span className="text-[10px]">Filter</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* D. INTERACTIVE VIDEO HUB (Video Player & TV Live Broadcast) */}
          <section className="bg-slate-900 text-white rounded-xl p-4 sm:p-5 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Tv className="h-4.5 w-4.5 text-rose-500 animate-pulse" />
                <h3 className="font-display font-black text-xs uppercase tracking-wider text-slate-100">
                  Video TV & Live Broadcast Stream
                </h3>
              </div>
              <div className="flex gap-1.5">
                {(['infobos-tv', 'jabar-news', 'bandung-live'] as const).map((ch) => (
                  <button
                    key={ch}
                    onClick={() => setActiveChannel(ch)}
                    className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase transition ${
                      activeChannel === ch 
                        ? 'bg-rose-600 text-white shadow-xs' 
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {ch.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Video Canvas Sim */}
            <div className="relative aspect-video w-full bg-black rounded-lg overflow-hidden border border-slate-800 group">
              <img 
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800" 
                alt="Live stream placeholder" 
                className={`w-full h-full object-cover transition-opacity duration-300 ${isVideoPlaying ? 'opacity-70' : 'opacity-40'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-between p-3.5">
                
                {/* Live indicators */}
                <div className="flex justify-between items-start">
                  <span className="bg-rose-600 text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                    LIVE STREAMING
                  </span>
                  <span className="text-[9px] font-mono text-slate-300 bg-black/50 px-1.5 py-0.5 rounded">
                    1080p • 60 FPS
                  </span>
                </div>

                {/* Simulated center action overlay */}
                {!isVideoPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button 
                      onClick={() => setIsVideoPlaying(true)}
                      className="p-3 rounded-full bg-[#FFD700] text-[#002B5B] shadow-lg hover:scale-105 transition"
                    >
                      <Play className="h-6 w-6 fill-current" />
                    </button>
                  </div>
                )}

                {/* Controls overlay at the bottom */}
                <div className="space-y-1 bg-black/40 p-2 rounded-md backdrop-blur-xs">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-200">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setIsVideoPlaying(!isVideoPlaying)} className="hover:text-white transition">
                        {isVideoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </button>
                      <span className="font-extrabold capitalize text-[#FFD700]">Channel: {activeChannel.replace('-', ' ')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Volume2 className="h-3.5 w-3.5" />
                      <div className="w-12 h-1 bg-slate-600 rounded">
                        <div className="w-2/3 h-full bg-[#FFD700] rounded"></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-300 text-left line-clamp-1">
                    Siaran Pers Redaksi: Penataan Kawasan Gedung Sate dan Dampak Pariwisata Jawa Barat 2026.
                  </p>
                </div>

              </div>
            </div>
          </section>

          {/* E. VERTICAL SHORTS REELS SIMULATOR */}
          <section className="bg-white polet-card-top border border-slate-200 rounded-xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <Video className="h-4.5 w-4.5 text-indigo-600 animate-bounce" />
                <h3 className="font-display font-black text-xs text-[#002B5B] uppercase tracking-wider">
                  TikTok Shorts & Reels (Media Pantau)
                </h3>
              </div>
              <span className="text-[9px] text-indigo-600 font-mono font-bold">Klip Pendek Redaksi</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {shortVideos.map((item, idx) => (
                <div 
                  key={idx} 
                  className="aspect-[9/16] rounded-xl overflow-hidden relative bg-slate-900 border border-slate-800 shadow-sm flex flex-col justify-between p-3 text-white group"
                >
                  <img 
                    src={item.bg} 
                    alt={item.title} 
                    className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:scale-101 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30 pointer-events-none"></div>

                  {/* Header widget */}
                  <div className="z-10 flex justify-between items-center">
                    <span className="bg-black/60 backdrop-blur-xs text-[8px] font-mono px-1.5 py-0.5 rounded text-white">
                      {item.duration}
                    </span>
                    <span className="text-[8px] text-[#FFD700] font-mono bg-indigo-950/70 px-1 rounded uppercase tracking-wider">
                      Reels
                    </span>
                  </div>

                  {/* Body interactive overlay */}
                  <div className="z-10 text-left space-y-2 mt-auto">
                    <p className="text-[11px] font-bold text-white line-clamp-1">{item.title}</p>
                    <p className="text-[9px] text-slate-300 leading-normal line-clamp-2">{item.caption}</p>
                    
                    <div className="flex items-center justify-between border-t border-white/10 pt-1.5 mt-1">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleLikeShort(idx)}
                          className="flex items-center gap-1 bg-black/40 hover:bg-black/60 p-1 rounded-md text-[9px] transition"
                        >
                          <Heart className={`h-3 w-3 ${hasLikedShort[idx] ? 'text-rose-500 fill-current' : 'text-slate-300'}`} />
                          <span>{shortLikes[idx]}</span>
                        </button>
                      </div>
                      <span className="text-[8px] font-mono text-slate-300">{item.views}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* F. INTERACTIVE PODCAST CENTER (Audio Player Widget) */}
          <section className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2 polet-left-stripe">
              <div className="flex items-center gap-2">
                <Radio className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-display font-black text-xs text-[#002B5B] dark:text-slate-100 uppercase tracking-wider">
                  Podcast Center (Opini & Analisis Redaksi)
                </h3>
              </div>
              <span className="text-[8px] font-mono font-bold bg-[#002B5B]/10 dark:bg-[#002B5B]/30 text-[#002B5B] dark:text-slate-300 px-1.5 py-0.2 rounded uppercase">
                Siaran Audio
              </span>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              {/* Podcast Active Player */}
              <div className="md:w-1/2 bg-gradient-to-br from-[#002B5B] to-[#001733] text-white p-4 rounded-xl flex flex-col justify-between shadow-xs relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#FFD700]/5 rounded-bl-full pointer-events-none"></div>
                <div className="space-y-2.5 z-10 text-left">
                  <span className="text-[8px] bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/30 px-1.5 py-0.2 rounded font-mono uppercase tracking-wider">
                    Sekarang Diputar
                  </span>
                  <h4 className="font-display font-bold text-xs sm:text-sm text-white line-clamp-2">
                    {podcasts[activePodcastIdx].title}
                  </h4>
                  <p className="text-[10px] text-slate-300">{podcasts[activePodcastIdx].host} • {podcasts[activePodcastIdx].date}</p>
                </div>

                {/* Custom player track bar */}
                <div className="my-4 space-y-1 z-10">
                  <div className="w-full bg-white/10 h-1.5 rounded cursor-pointer relative" onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    setPodcastProgress(Math.min(100, Math.max(0, Math.round((clickX / rect.width) * 100))));
                  }}>
                    <div className="h-full bg-[#FFD700] rounded" style={{ width: `${podcastProgress}%` }}></div>
                  </div>
                  <div className="flex justify-between text-[8px] font-mono text-slate-400">
                    <span>{Math.floor((podcastProgress * 18.4) / 100)}:00</span>
                    <span>{podcasts[activePodcastIdx].duration}</span>
                  </div>
                </div>

                {/* Player actions */}
                <div className="flex items-center justify-between mt-2 z-10">
                  <button 
                    onClick={() => setPodcastPlaying(!podcastPlaying)}
                    className="p-2 bg-[#FFD700] text-[#002B5B] hover:bg-[#ffe240] rounded-full shadow-md transition cursor-pointer"
                  >
                    {podcastPlaying ? <Pause className="h-4.5 w-4.5 fill-current" /> : <Play className="h-4.5 w-4.5 fill-current" />}
                  </button>

                  <div className="flex items-center gap-2">
                    <Volume2 className="h-3.5 w-3.5 text-slate-300" />
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={podcastVolume} 
                      onChange={(e) => setPodcastVolume(Number(e.target.value))}
                      className="w-16 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FFD700]"
                    />
                  </div>
                </div>
              </div>

              {/* Podcast Playlist list */}
              <div className="md:w-1/2 space-y-2 max-h-[170px] overflow-y-auto pr-1">
                {podcasts.map((pod, index) => (
                  <div 
                    key={index}
                    onClick={() => {
                      setActivePodcastIdx(index);
                      setPodcastPlaying(true);
                    }}
                    className={`p-2 rounded-lg border cursor-pointer transition text-left flex justify-between items-start ${
                      activePodcastIdx === index 
                        ? 'bg-[#002B5B]/10 dark:bg-indigo-500/15 border-[#002B5B]/20 dark:border-indigo-500/30' 
                        : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <h5 className="text-[11px] font-extrabold text-[#002B5B] dark:text-slate-200 truncate leading-tight">{pod.title}</h5>
                      <span className="text-[9px] text-slate-400 dark:text-slate-500 block font-medium mt-0.5">{pod.host} • {pod.duration}</span>
                    </div>
                    <span className="text-[8px] font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-1 py-0.2 rounded shrink-0 ml-2 font-bold uppercase">
                      Ep {42 - index}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* G. VISUAL GALLERY (Photo Slide & Lightbox overlay) */}
          <section className="bg-white dark:bg-slate-900 polet-card-top border border-slate-200 dark:border-white/10 rounded-xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
              <div className="flex items-center gap-2">
                <Camera className="h-4.5 w-4.5 text-rose-600 dark:text-rose-400" />
                <h3 className="font-display font-black text-xs text-[#002B5B] dark:text-slate-100 uppercase tracking-wider">
                  Visual Gallery Jabar (Sajian Foto Esai)
                </h3>
              </div>
              <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono font-bold">Dokumentasi Redaksi</span>
            </div>

            {/* Photo Slide Panel */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-100">
              <img 
                src={galleryImages[activeGalleryIdx].url} 
                alt={galleryImages[activeGalleryIdx].title} 
                className="w-full h-full object-cover opacity-80 cursor-pointer"
                onClick={() => setShowLightbox(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                <div className="text-left text-white space-y-1">
                  <h4 className="font-display font-bold text-xs sm:text-sm">{galleryImages[activeGalleryIdx].title}</h4>
                  <p className="text-[10px] text-slate-300 font-mono">{galleryImages[activeGalleryIdx].author}</p>
                </div>
              </div>

              {/* Prev / Next buttons */}
              <button 
                onClick={() => setActiveGalleryIdx((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setActiveGalleryIdx((prev) => (prev + 1) % galleryImages.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Lightbox Modal overlay */}
            {showLightbox && (
              <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4">
                <button 
                  onClick={() => setShowLightbox(false)}
                  className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white font-bold"
                >
                  &times; Tutup Galeri
                </button>
                <img 
                  src={galleryImages[activeGalleryIdx].url} 
                  alt="Lightbox active" 
                  className="max-h-[80vh] max-w-full rounded-lg shadow-2xl object-contain border border-white/10"
                />
                <div className="mt-4 text-center text-white space-y-1">
                  <h4 className="font-display font-bold text-sm sm:text-base">{galleryImages[activeGalleryIdx].title}</h4>
                  <p className="text-xs text-slate-300 font-mono">{galleryImages[activeGalleryIdx].author}</p>
                </div>
              </div>
            )}
          </section>

          {/* H. SCHOLAR RESEARCH & TAXONOMIES */}
          <section className="bg-white dark:bg-slate-900 border border-[#2B7A78]/25 dark:border-white/10 rounded-xl p-4 sm:p-5 text-left shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#2B7A78]/5 rounded-bl-full pointer-events-none"></div>
            
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-2 mb-3">
              <BookOpen className="h-4.5 w-4.5 text-[#2B7A78]" />
              <div>
                <h4 className="font-display font-black text-xs text-[#002B5B] dark:text-slate-100 uppercase tracking-wider">Research Spotlight Jabar</h4>
                <span className="text-[8px] text-slate-400 dark:text-slate-500 font-mono font-bold block">Pilar Riset &amp; Kajian Akademis Terakreditasi</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-white/10 p-3 rounded-lg">
                <span className="text-[8px] bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold px-1.5 py-0.2 rounded font-mono uppercase tracking-wider">
                  Analisis Scholar 2026
                </span>
                <h5 className="text-[11px] sm:text-xs font-black text-slate-900 dark:text-slate-200 mt-1.5 leading-snug">
                  Akselerasi Ekonomi Digital Jawa Barat Pasca Kebijakan Stimulus Fiskal PMK-2026
                </h5>
                <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5 font-mono font-bold">Rujukan: Puslitbang Kemenkeu &amp; Bank Indonesia Jabar</p>
              </div>

              {/* Research Tabs Navigation */}
              <div className="flex border-b border-slate-100 dark:border-white/5 text-[10px] font-bold">
                <button 
                  onClick={() => setResearchTab('summary')}
                  className={`flex-1 pb-1 border-b text-center transition ${researchTab === 'summary' ? 'border-[#2B7A78] text-[#2B7A78] dark:text-[#2B7A78]' : 'border-transparent text-slate-400 dark:text-slate-500'}`}
                >
                  Kajian AI
                </button>
                <button 
                  onClick={() => setResearchTab('impact')}
                  className={`flex-1 pb-1 border-b text-center transition ${researchTab === 'impact' ? 'border-[#2B7A78] text-[#2B7A78] dark:text-[#2B7A78]' : 'border-transparent text-slate-400 dark:text-slate-500'}`}
                >
                  Dampak Publik
                </button>
                <button 
                  onClick={() => setResearchTab('business')}
                  className={`flex-1 pb-1 border-b text-center transition ${researchTab === 'business' ? 'border-[#2B7A78] text-[#2B7A78] dark:text-[#2B7A78]' : 'border-transparent text-slate-400 dark:text-slate-500'}`}
                >
                  Peluang Bisnis
                </button>
              </div>

              {/* Research Tab Details */}
              <div className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed min-h-[60px] pt-1">
                {researchTab === 'summary' && (
                  <p>
                    <strong>Kajian AI Redaksi:</strong> Insentif pajak penghasilan final yang diprakarsai Sri Mulyani diprediksi meningkatkan ketahanan modal sirkulasi startup digital lokal hingga 45% di Bandung Raya.
                  </p>
                )}
                {researchTab === 'impact' && (
                  <p>
                    <strong>Apa artinya bagi publik?</strong> Membuka lapangan pekerjaan formal baru berbasis digital di sektor informal dan meningkatkan cakupan penetrasi inklusi finansial daerah hingga ke pelosok desa.
                  </p>
                )}
                {researchTab === 'business' && (
                  <p>
                    <strong>Peluang Bisnis:</strong> Pengembangan platform agregator pembiayaan mikro berbasis komoditas pertanian dan pariwisata heritage lokal Jawa Barat.
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* I. TOPICS, COMPANIES, GOVERNMENT, EVENTS (Bento Grid elements) */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Government Bulletins Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl p-4 space-y-2.5 text-left">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-1.5">
                <div className="flex items-center gap-1.5">
                  <Flag className="h-4 w-4 text-emerald-600" />
                  <h4 className="font-display font-black text-[11px] text-[#002B5B] dark:text-slate-100 uppercase tracking-wider">
                    Government Bulletins (Rilis Pemprov)
                  </h4>
                </div>
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 fill-current" />
              </div>
              <ul className="space-y-2 text-[11px] text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-500 font-bold shrink-0">•</span>
                  <span>Dinas Kominfo Jabar mengaktifkan 45 posko internet satelit desa tertinggal.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-500 font-bold shrink-0">•</span>
                  <span>Pemda Bandung menyetujui anggaran cagar budaya terpadu koridor bersejarah Dago.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-500 font-bold shrink-0">•</span>
                  <span>Dishub Jawa Barat menguji coba 5 koridor bus listrik baru rute Cimahi-Bandung.</span>
                </li>
              </ul>
            </div>

            {/* West Java Tech Companies Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl p-4 space-y-2.5 text-left">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-1.5">
                <div className="flex items-center gap-1.5">
                  <Building2 className="h-4 w-4 text-indigo-600" />
                  <h4 className="font-display font-black text-[11px] text-[#002B5B] dark:text-slate-100 uppercase tracking-wider">
                    Companies Directory (Sektor Bisnis Jabar)
                  </h4>
                </div>
                <Briefcase className="h-3.5 w-3.5 text-indigo-400" />
              </div>
              <div className="space-y-2">
                {popularCompanies.map((com, index) => (
                  <div key={index} className="p-2 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-white/5 rounded-lg flex items-center justify-between text-[10px]">
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">{com.name}</span>
                      <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">{com.industry}</span>
                    </div>
                    <span className="text-[8px] bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 font-bold text-indigo-700 dark:text-indigo-300 px-1.5 py-0.2 rounded font-mono">
                      {com.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Topics & Tags Cloud */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl p-4 space-y-2.5 text-left">
              <div className="flex items-center gap-1.5 border-b border-slate-100 dark:border-white/5 pb-1.5">
                <Hash className="h-4 w-4 text-amber-500" />
                <h4 className="font-display font-black text-[11px] text-[#002B5B] dark:text-slate-100 uppercase tracking-wider">
                  Topics Cloud &amp; Taxonomies
                </h4>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["GedungSate", "FiskalDigital", "Menkeu", "InovasiJabar", "PemdaBandung", "CagarBudaya", "AIScholar", "EcoSirkuler", "MitigasiBencana"].map((tag, idx) => (
                  <span 
                    key={idx}
                    onClick={() => onSelectLocation(tag.toLowerCase())}
                    className="px-2 py-0.5 bg-slate-100 dark:bg-slate-950 hover:bg-slate-200 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300 border border-slate-150 dark:border-white/10 rounded-md text-[9px] font-bold font-mono cursor-pointer transition"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Editorial Events Calendar */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl p-4 space-y-2.5 text-left">
              <div className="flex items-center gap-1.5 border-b border-slate-100 dark:border-white/5 pb-1.5">
                <Calendar className="h-4 w-4 text-[#2B7A78]" />
                <h4 className="font-display font-black text-[11px] text-[#002B5B] dark:text-slate-100 uppercase tracking-wider">
                  Upcoming Events Redaksi
                </h4>
              </div>
              <div className="space-y-2 text-[10px] leading-tight">
                <div className="flex items-center gap-2">
                  <span className="bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-100 dark:border-rose-900/40 px-1.5 py-0.5 rounded font-bold font-mono">
                    28 Juni
                  </span>
                  <span className="text-slate-600 dark:text-slate-300 font-bold">Rapat Paripurna DPRD Jabar Pembahasan Pajak Digital</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-100 dark:border-teal-900/40 px-1.5 py-0.5 rounded font-bold font-mono">
                    29 Juni
                  </span>
                  <span className="text-slate-600 dark:text-slate-300 font-bold">Piala Dunia FIFA 2026 - Penyisihan Regional Jabar</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/40 px-1.5 py-0.5 rounded font-bold font-mono">
                    30 Juni
                  </span>
                  <span className="text-slate-600 dark:text-slate-300 font-bold">Uji Coba Bus Listrik Terintegrasi Raya</span>
                </div>
              </div>
            </div>

          </section>

        </div>

        {/* ================= RIGHT SIDEBAR COLUMN (4 of 12) ================= */}
        <div className="lg:col-span-4 space-y-4">

          {/* 11. NAVIGASI PINTAS & PREFERENSI MINAT */}
          <div className="bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-xl p-4 text-left shadow-2xs space-y-3 text-slate-900 dark:text-slate-100 animate-scale-up">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-white/10 pb-2">
              <span className="p-1 rounded bg-[#2B7A78]/10 text-[#2B7A78] dark:text-[#FFD700]">
                <Compass className="h-4 w-4" />
              </span>
              <div>
                <h4 className="font-display font-black text-[11px] text-[#002B5B] dark:text-slate-100 uppercase tracking-wider">
                  Navigasi Pintas
                </h4>
                <p className="text-[8px] text-slate-400 font-medium">Akses cepat &amp; preferensi minat baca</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <button
                onClick={handleHomeClick}
                className={`p-2 rounded-lg border text-left font-bold transition flex items-center gap-2 cursor-pointer ${
                  categorySlug === 'home' || !categorySlug
                    ? 'bg-teal-500/10 border-teal-500/30 text-teal-600 dark:text-teal-400 font-extrabold'
                    : 'bg-slate-50 dark:bg-[#001126] border-slate-100 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#001733]'
                }`}
              >
                <Home className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">Beranda</span>
              </button>

              <button
                onClick={handleLiveTvClick}
                className={`p-2 rounded-lg border text-left font-bold transition flex items-center gap-2 cursor-pointer ${
                  categorySlug === 'video-hub'
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400 font-extrabold'
                    : 'bg-slate-50 dark:bg-[#001126] border-slate-100 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#001733]'
                }`}
              >
                <Tv className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">Live TV</span>
              </button>

              <button
                onClick={handleMinatClick}
                className="p-2 rounded-lg border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-[#001126] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#001733] text-left font-bold transition flex items-center gap-2 cursor-pointer"
              >
                <Sliders className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                <span className="truncate">Minat Saya</span>
              </button>

              <button
                onClick={() => onToggleSidebar && onToggleSidebar()}
                className="p-2 rounded-lg border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-[#001126] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#001733] text-left font-bold transition flex items-center gap-2 cursor-pointer"
              >
                <Menu className="h-3.5 w-3.5 text-teal-500 shrink-0" />
                <span className="truncate">Menu Utama</span>
              </button>
            </div>

            {/* Interest preferences list */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/10">
              <div id="interest-preferences-heading" className="flex items-center gap-1.5 scroll-mt-2">
                <Sliders className="h-3.5 w-3.5 text-indigo-500" />
                <span className="text-[9px] font-bold font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">Preferensi Minat Baca</span>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { slug: 'breaking-news', name: 'Breaking' },
                  { slug: 'regional', name: 'Regional' },
                  { slug: 'nasional', name: 'Nasional' },
                  { slug: 'internasional', name: 'Internasional' },
                  { slug: 'trending', name: 'Trending' },
                  { slug: 'technology', name: 'Teknologi' },
                  { slug: 'finance', name: 'Keuangan' }
                ].map((topic) => {
                  const isChecked = topicPreferences.includes(topic.slug);
                  return (
                    <button
                      key={topic.slug}
                      onClick={() => {
                        if (onSaveTopicPreferences) {
                          let newPrefs = [...topicPreferences];
                          if (newPrefs.includes(topic.slug)) {
                            newPrefs = newPrefs.filter(p => p !== topic.slug);
                          } else {
                            newPrefs.push(topic.slug);
                          }
                          onSaveTopicPreferences(newPrefs);
                        }
                      }}
                      className={`px-2 py-1.5 rounded-lg border text-[9px] font-medium transition duration-200 flex items-center justify-between text-left cursor-pointer ${
                        isChecked 
                          ? 'bg-[#2B7A78]/10 border-[#2B7A78]/30 text-[#2B7A78] dark:text-teal-400 font-bold' 
                          : 'bg-slate-50 dark:bg-[#001126] border-slate-100 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#001733]'
                      }`}
                    >
                      <span className="truncate mr-1">{topic.name}</span>
                      <div className={`w-3 h-3 rounded-xs border flex items-center justify-center transition-all duration-150 shrink-0 ${
                        isChecked 
                          ? 'bg-[#2B7A78] border-[#2B7A78] text-[#FFD700]' 
                          : 'border-slate-300 dark:border-white/20 bg-transparent'
                      }`}>
                        {isChecked && <Check className="h-2 w-2 stroke-[3.5] text-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {topicPreferences.length > 0 && (
                <button
                  onClick={() => onSaveTopicPreferences && onSaveTopicPreferences([])}
                  className="w-full mt-1 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 text-[8px] font-bold rounded-lg transition border border-rose-500/20 cursor-pointer text-center uppercase tracking-wider animate-pulse"
                >
                  Hapus Preferensi
                </button>
              )}
            </div>
          </div>

          {/* 1. HIJRI DATE HEADER */}
          <div className="bg-[#001733] border border-white/10 rounded-xl p-3 text-left">
            <div className="text-[8px] font-mono text-[#FFD700] uppercase font-bold tracking-widest">Islamic hijri date today</div>
            <div className="text-white text-xs font-black font-display mt-0.5 flex items-center justify-between">
              <span>12 Muharram 1448 H</span>
              <span className="text-[9px] bg-slate-800 border border-slate-700 px-1.5 py-0.2 rounded font-mono font-bold text-slate-300">
                ACTIVE
              </span>
            </div>
          </div>

          {/* 2. DETAILED WEATHER STATION */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-left shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
              <div className="flex items-center gap-1.5">
                <CloudRain className="h-4.5 w-4.5 text-indigo-500 animate-pulse" />
                <h4 className="font-display font-black text-[11px] text-[#002B5B] dark:text-slate-100 uppercase tracking-wider">
                  Weather Station (Kabupaten Bandung)
                </h4>
              </div>
              <span className="text-[8px] text-slate-400 dark:text-slate-500 font-mono font-bold">Dinas Meteorologi</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100">26°C</div>
                <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold block mt-0.5">Gerimis Ringan</span>
              </div>
              <div className="text-right text-[10px] font-mono text-slate-500 dark:text-slate-400 space-y-0.5">
                <div>Hum: <strong>84%</strong></div>
                <div>Angin: <strong>12 km/h</strong></div>
                <div>UV Index: <strong>2 (Rendah)</strong></div>
              </div>
            </div>

            {/* 3-day forecast mini list */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-white/5 text-[10px] text-center font-mono">
              <div className="bg-slate-50 dark:bg-slate-950 p-1.5 rounded-lg border dark:border-white/5">
                <span className="text-slate-400 dark:text-slate-500 block">Besok</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">25°C</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-1.5 rounded-lg border dark:border-white/5">
                <span className="text-slate-400 dark:text-slate-500 block">Senin</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">27°C</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-1.5 rounded-lg border dark:border-white/5">
                <span className="text-slate-400 dark:text-slate-500 block">Selasa</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">26°C</span>
              </div>
            </div>
          </div>

          {/* 11. YOUTUBE VIDEO AD PLACEMENT & TRENDING */}
          <div id="sidebar-youtube-ad" className="bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-left shadow-2xs space-y-3 text-slate-900 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-2">
              <div className="flex items-center gap-1.5">
                <Youtube className="h-4.5 w-4.5 text-rose-600 animate-pulse" />
                <h4 className="font-display font-black text-[11px] text-[#002B5B] dark:text-slate-100 uppercase tracking-wider">
                  Video Promosi Sponsor Jabar
                </h4>
              </div>
              <span className="text-[8px] bg-rose-600 text-white font-mono font-extrabold px-1.5 py-0.2 rounded uppercase animate-pulse">
                VIDEO AD
              </span>
            </div>

            <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-slate-250 dark:border-white/10 bg-slate-950 shadow-inner">
              <iframe
                id="youtube-ad-iframe"
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1"
                title="Sponsor Video Promo Jabar"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="no-referrer"
              ></iframe>
            </div>

            <div className="text-[9px] text-slate-400 font-mono text-center leading-relaxed">
              Ingin memasang video kampanye Anda di sini? <a href="#contact" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">Hubungi AdOS Portal</a>
            </div>

            {/* Trending on YouTube */}
            <div className="pt-3 border-t border-slate-100 dark:border-white/10 space-y-2">
              <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                <TrendingUp className="h-3.5 w-3.5 text-rose-500" />
                <span>Trending di YouTube Jabar</span>
              </div>
              <div className="space-y-1.5">
                {[
                  { rank: 1, title: "Eksplorasi Kuliner Malam Lengkong Kecil Bandung", channel: "BdgFoodie Vlog", views: "1.2M", time: "2 hari lalu" },
                  { rank: 2, title: "Update Progres Pembangunan LRT Bandung Raya", channel: "Jabar Transport Info", views: "540K", time: "1 hari lalu" },
                  { rank: 3, title: "Keindahan Hidden Gem Curug Cikaso Sukabumi", channel: "Travel Jabar", views: "320K", time: "3 hari lalu" }
                ].map((item) => (
                  <div key={item.rank} className="flex gap-2 items-start p-1.5 bg-slate-50 dark:bg-[#001126] rounded-lg border border-slate-100 dark:border-white/5 text-[10px] leading-tight">
                    <span className="font-mono font-black text-rose-600 text-[11px] w-4 text-center mt-0.5">#{item.rank}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-800 dark:text-slate-200 truncate">{item.title}</p>
                      <p className="text-[8px] text-slate-400 mt-0.5">{item.channel} • {item.views} views • {item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* C. LITE UTILITY HUB (17 INTERACTIVE TOOLS) */}
          <LiteUtilityHub 
            onSelectArticle={onSelectArticle}
            onSelectLocation={onSelectLocation}
            onSelectEntity={onSelectEntity}
            onNavigate={onNavigate}
          />

          {/* 14. X / TWITTER AD & TRENDING PLACEMENT */}
          <div className="bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-left shadow-2xs space-y-3 text-slate-900 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-2">
              <div className="flex items-center gap-1.5">
                <Twitter className="h-4.5 w-4.5 text-sky-500" />
                <h4 className="font-display font-black text-[11px] text-[#002B5B] dark:text-slate-100 uppercase tracking-wider">
                  X / Twitter Sponsor Ads &amp; Trends
                </h4>
              </div>
              <span className="text-[8px] bg-slate-950 text-white font-mono font-extrabold px-1.5 py-0.2 rounded uppercase border border-white/10">
                PROMOTED
              </span>
            </div>

            {/* Simulated X / Twitter Embed */}
            <div className="bg-slate-50 dark:bg-[#001126] border border-slate-100 dark:border-white/5 rounded-xl p-3 shadow-3xs space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-slate-950 text-white flex items-center justify-center text-[10px] font-black border border-white/10">
                  𝕏
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-black text-slate-800 dark:text-slate-100 truncate">Tech Jabar Hub</span>
                    <span className="text-sky-500 text-[10px] shrink-0">★</span>
                  </div>
                  <span className="text-[8px] text-slate-400 block -mt-0.5">@tech_jabar_hub • Bersponsor</span>
                </div>
              </div>

              <p className="text-[10px] leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
                Sewa cloud hosting khusus Jabar dev dengan data center langsung di Bandung! Latensi super cepat kurang dari 5ms. Dapetin diskon 50% pake kode <strong className="text-indigo-600 dark:text-indigo-400 font-bold">JABARDEV50</strong> 🚀 #BandungTech #CloudHosting
              </p>

              <div className="flex justify-between items-center pt-1 border-t border-slate-100 dark:border-white/5 text-[9px] text-slate-400">
                <span>🔄 231 Reposts • ❤️ 1.4K Likes</span>
                <a 
                  href="#hosting" 
                  className="bg-[#2B7A78] hover:bg-[#2B7A78]/90 text-white font-extrabold text-[8px] uppercase tracking-wider px-2.5 py-1 rounded-lg transition"
                >
                  Learn More &rarr;
                </a>
              </div>
            </div>

            {/* Trending on X */}
            <div className="pt-2 border-t border-slate-100 dark:border-white/10 space-y-2">
              <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                <TrendingUp className="h-3.5 w-3.5 text-sky-500" />
                <span>Trending Topik X Indonesia</span>
              </div>
              <div className="space-y-2">
                {[
                  { rank: 1, tag: "#SesarLembang", count: "24.5K reposts", category: "Trending di Jawa Barat" },
                  { rank: 2, tag: "#KRLBandungRaya", count: "18.2K reposts", category: "KRL & Transportasi" },
                  { rank: 3, tag: "#PilkadaJabar2026", count: "45.1K reposts", category: "Politik • Populer" },
                  { rank: 4, tag: "Ridwan Kamil", count: "32.8K reposts", category: "Kreator • Tokoh" }
                ].map((item) => (
                  <div key={item.rank} className="flex justify-between items-center text-[10px] border-b border-slate-50 dark:border-white/5 pb-1 last:border-0 last:pb-0">
                    <div>
                      <span className="text-[8px] text-slate-400 block">{item.category}</span>
                      <span className="font-bold text-slate-800 dark:text-slate-100 block">{item.tag}</span>
                    </div>
                    <span className="text-[9px] font-mono font-bold text-slate-500">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SEISMIC ACTIVITY WIDGET */}
          <div id="home-seismic-widget" className="bg-white polet-card-top border border-slate-200 rounded-xl p-4 text-left shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-1.5">
                <Activity className="h-4.5 w-4.5 text-rose-500 animate-pulse" />
                <h4 className="font-display font-black text-[11px] text-[#002B5B] uppercase tracking-wider">
                  Seismic Activity (Info Gempa Terkini)
                </h4>
              </div>
              <span className="text-[8px] text-slate-400 font-mono font-bold uppercase">
                {seismicSource}
              </span>
            </div>

            {seismicLoading ? (
              <div className="py-6 flex flex-col items-center justify-center gap-2 text-xs text-slate-400 font-mono">
                <RefreshCw className="h-5 w-5 animate-spin text-rose-400" />
                <span>Menghubungkan ke BMKG...</span>
              </div>
            ) : (
              <div className="space-y-2.5">
                {/* Scrollable list of recent earthquakes */}
                <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                  {seismicData.map((eq) => {
                    const isSelected = selectedSeismicId === eq.id;
                    let severityColor = "text-emerald-700 bg-emerald-50 border-emerald-100";
                    let magColor = "text-emerald-600";
                    let Icon = ShieldCheck;

                    if (eq.severity === 'high') {
                      severityColor = "text-rose-700 bg-rose-50 border-rose-200";
                      magColor = "text-rose-600 font-extrabold animate-pulse";
                      Icon = AlertTriangle;
                    } else if (eq.severity === 'medium') {
                      severityColor = "text-amber-700 bg-amber-50 border-amber-100";
                      magColor = "text-amber-600 font-bold";
                      Icon = AlertCircle;
                    }

                    return (
                      <div
                        key={eq.id}
                        onClick={() => {
                          const nextSelected = isSelected ? null : eq.id;
                          setSelectedSeismicId(nextSelected);
                          if (nextSelected === null) {
                            setShowMapForId(null);
                          }
                        }}
                        onMouseEnter={() => setHoveredSeismicId(eq.id)}
                        onMouseLeave={() => setHoveredSeismicId(null)}
                        className={`p-2 rounded-lg border transition-all duration-205 cursor-pointer ${
                          isSelected 
                            ? 'bg-slate-50 border-rose-250 shadow-3xs' 
                            : 'bg-white border-slate-100 hover:bg-slate-50'
                        } ${hoveredSeismicId === eq.id ? 'border-rose-300' : ''}`}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-slate-800 leading-tight block">
                              {eq.location}
                            </span>
                            <span className="text-[8.5px] font-mono text-slate-400 block leading-none">
                              {eq.time}
                            </span>
                          </div>

                          <div className="text-right flex flex-col items-end shrink-0 gap-1">
                            {/* Magnitude representation */}
                            <span className="text-xs font-mono font-black flex items-center gap-0.5">
                              <Icon className={`h-3 w-3 ${magColor}`} />
                              <span className={magColor}>M {eq.magnitude.toFixed(1)}</span>
                            </span>
                            <span className="text-[8px] font-mono text-slate-400">
                              D: {eq.depth}
                            </span>
                          </div>
                        </div>

                        {/* Collapsible detail on click */}
                        {isSelected && (
                          <div className="mt-2 pt-2 border-t border-slate-100 text-[9.5px] text-slate-600 space-y-2 animate-fadeIn font-sans">
                            <div className="grid grid-cols-2 gap-1.5 font-mono text-[8.5px]">
                              <div className="bg-slate-50 p-1 rounded">
                                <span className="text-slate-400 block">Koordinat</span>
                                <span className="font-bold text-slate-700">{eq.coordinates}</span>
                              </div>
                              <div className="bg-slate-50 p-1 rounded">
                                <span className="text-slate-400 block">Kedalaman</span>
                                <span className="font-bold text-slate-700">{eq.depth}</span>
                              </div>
                            </div>
                            
                            <div className="bg-rose-50/50 p-1.5 rounded border border-rose-100 text-rose-800 flex items-start gap-1 leading-relaxed">
                              <AlertCircle className="h-3.5 w-3.5 shrink-0 text-rose-500 mt-0.5" />
                              <span>
                                <strong>Dampak/Potensi:</strong> {eq.potential}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 pt-0.5">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowMapForId(showMapForId === eq.id ? null : eq.id);
                                }}
                                className={`py-1 px-2 border rounded-lg font-mono font-bold text-[8.5px] uppercase tracking-wider transition flex items-center justify-center gap-1 cursor-pointer ${
                                  showMapForId === eq.id
                                    ? 'bg-rose-600 hover:bg-rose-700 border-rose-700 text-white shadow-2xs'
                                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                                }`}
                              >
                                <Globe className="h-3 w-3 text-rose-400" />
                                <span>{showMapForId === eq.id ? "Tutup Peta" : "Peta"}</span>
                              </button>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const summaryText = `🚨 INFO GEMPA TERKINI 🚨\n📍 Lokasi: ${eq.location}\n📈 Magnitudo: M ${eq.magnitude.toFixed(1)}\n🕒 Waktu: ${eq.time}\n📉 Kedalaman: ${eq.depth}\n🌐 Koordinat: ${eq.coordinates}\n⚠️ Dampak/Potensi: ${eq.potential}\n(Sumber: ${seismicSource})`;
                                  navigator.clipboard.writeText(summaryText).then(() => {
                                    setCopiedSeismicId(eq.id);
                                    setTimeout(() => setCopiedSeismicId(null), 2000);
                                  });
                                }}
                                className={`py-1 px-2 border rounded-lg font-mono font-bold text-[8.5px] uppercase tracking-wider transition flex items-center justify-center gap-1 cursor-pointer ${
                                  copiedSeismicId === eq.id
                                    ? 'bg-emerald-600 border-emerald-700 text-white shadow-2xs'
                                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                                }`}
                              >
                                {copiedSeismicId === eq.id ? (
                                  <>
                                    <Check className="h-3 w-3 text-emerald-300 animate-pulse" />
                                    <span>Disalin!</span>
                                  </>
                                ) : (
                                  <>
                                    <Share2 className="h-3 w-3 text-rose-500" />
                                    <span>Bagikan</span>
                                  </>
                                )}
                              </button>
                            </div>

                            {showMapForId === eq.id && (
                              <div className="mt-1 pb-1 animate-fadeIn" onClick={(e) => e.stopPropagation()}>
                                <SeismicMap
                                  coordinates={eq.coordinates}
                                  locationName={eq.location}
                                  magnitude={eq.magnitude}
                                  severity={eq.severity}
                                  isHighlighted={hoveredSeismicId === eq.id}
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={fetchSeismicData}
                    className="w-full py-1.5 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 font-mono font-bold text-[9px] uppercase tracking-wider rounded-lg transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="h-3 w-3 text-rose-400" />
                    <span>Perbarui Data</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 3. STOCK & INDICES WIDGET */}
          <div className="bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-xl p-4 text-left shadow-2xs space-y-3 text-slate-900 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-2">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="h-4.5 w-4.5 text-emerald-500" />
                <h4 className="font-display font-black text-[11px] text-[#002B5B] dark:text-slate-100 uppercase tracking-wider">
                  Stock Indices (Bursa Efek Indonesia)
                </h4>
              </div>
              <span className="text-[8px] text-slate-400 font-mono font-bold">Live BEI Feed</span>
            </div>

            <div className="space-y-2">
              {[
                { name: "IHSG (Indeks Gabungan)", val: "7.184,50", change: "+0.42%", up: true },
                { name: "BBRI (Bank Rakyat Indonesia)", val: "4.890", change: "+1.24%", up: true },
                { name: "TLKM (Telkom Indonesia)", val: "3.750", change: "-0.54%", up: false },
                { name: "ASII (Astra International)", val: "5.120", change: "+0.18%", up: true }
              ].map((stock, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs border-b border-slate-50 dark:border-white/5 pb-1.5 last:border-0 last:pb-0">
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 block leading-tight">{stock.name.split(' ')[0]}</span>
                    <span className="text-[8px] text-slate-400 font-mono leading-none">{stock.name}</span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-bold block leading-tight text-slate-900 dark:text-slate-100">{stock.val}</span>
                    <span className={`text-[9px] font-bold ${stock.up ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {stock.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 15. THREADS AD & TRENDING PLACEMENT */}
          <div className="bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-left shadow-2xs space-y-3 text-slate-900 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="font-sans font-black text-xs bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full w-5 h-5 flex items-center justify-center">@</span>
                <h4 className="font-display font-black text-[11px] text-[#002B5B] dark:text-slate-100 uppercase tracking-wider">
                  Threads Sponsor Ads &amp; Trends
                </h4>
              </div>
              <span className="text-[8px] bg-slate-950 text-white font-mono font-extrabold px-1.5 py-0.2 rounded uppercase border border-white/10">
                THREADS
              </span>
            </div>

            {/* Simulated Threads Embed */}
            <div className="bg-slate-50 dark:bg-[#001126] border border-slate-100 dark:border-white/5 rounded-xl p-3 shadow-3xs space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#E02401] text-white flex items-center justify-center text-[10px] font-black">
                  ☕
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-800 dark:text-slate-100">Kopi Aroma Bandung</span>
                  <span className="text-[8px] text-slate-400 block -mt-0.5">@kopiaroma_bdg • Bersponsor</span>
                </div>
              </div>

              <p className="text-[10px] leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
                Sejak 1930, menyajikan biji kopi legendaris Bandung berkualitas tinggi yang dipanggang dengan cara tradisional menggunakan kayu bakar pohon karet. Nikmati aroma nostalgia Sunda di setiap cangkir kopi Anda. ☕️🍃 #LegendaryCoffee #KopiAroma
              </p>

              <div className="flex justify-between items-center pt-1 border-t border-slate-100 dark:border-white/5 text-[9px] text-slate-400">
                <span>💬 45 Replies • ❤️ 321 Likes</span>
                <a 
                  href="#buy-coffee" 
                  className="text-indigo-600 dark:text-indigo-400 font-extrabold text-[8px] uppercase tracking-wider"
                >
                  Lihat Menu &rarr;
                </a>
              </div>
            </div>

            {/* Trending on Threads */}
            <div className="pt-2 border-t border-slate-100 dark:border-white/10 space-y-2">
              <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                <TrendingUp className="h-3.5 w-3.5 text-slate-800 dark:text-white" />
                <span>Diskusi Hangat Threads Jabar</span>
              </div>
              <div className="space-y-1.5">
                {[
                  { user: "@ridwankamil", text: "Gimana menurut barudak Bandung tentang wacana MRT jalur baru?" },
                  { user: "@kulinerbdg", text: "Seblak vs Bakso Aci, mana nih comfort food kalian pas musim hujan begini?" }
                ].map((item, idx) => (
                  <div key={idx} className="p-2 bg-slate-50 dark:bg-[#001126] border border-slate-100 dark:border-white/5 rounded-lg text-[10px] leading-snug">
                    <span className="font-bold text-[#002B5B] dark:text-teal-400 block mb-0.5">{item.user}</span>
                    <p className="text-slate-600 dark:text-slate-300 font-medium">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4. CURRENCY rates */}
          <div className="bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-xl p-4 text-left shadow-2xs space-y-2 text-slate-900 dark:text-slate-100">
            <div className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest border-b dark:border-white/10 pb-1.5 mb-2 flex justify-between items-center">
              <span>Currency Exchange (Rupiah Converter)</span>
              <span className="text-emerald-600">Sync: Bank Indonesia</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
              <div className="bg-slate-50 dark:bg-[#001126] p-2 rounded-lg border dark:border-white/10">
                <span className="text-slate-400 block text-[9px]">USD/IDR</span>
                <span className="font-bold text-[#002B5B] dark:text-slate-100 text-xs">15.742</span>
              </div>
              <div className="bg-slate-50 dark:bg-[#001126] p-2 rounded-lg border dark:border-white/10">
                <span className="text-slate-400 block text-[9px]">EUR/IDR</span>
                <span className="font-bold text-[#002B5B] dark:text-slate-100 text-xs">16.910</span>
              </div>
              <div className="bg-slate-50 dark:bg-[#001126] p-2 rounded-lg border dark:border-white/10">
                <span className="text-slate-400 block text-[9px]">SGD/IDR</span>
                <span className="font-bold text-[#002B5B] dark:text-slate-100 text-xs">11.620</span>
              </div>
            </div>
          </div>

          {/* NEW WIDGET: LATEST JOBS & TENDERS */}
          <div id="home-jobs-tenders-widget" className="bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-xl p-4 text-left shadow-2xs space-y-3 text-slate-900 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-2">
              <div className="flex items-center gap-1.5">
                <Briefcase className="h-4.5 w-4.5 text-indigo-600 font-bold" />
                <h4 className="font-display font-black text-[11px] text-[#002B5B] dark:text-slate-100 uppercase tracking-wider">
                  Latest Jobs &amp; Tenders
                </h4>
              </div>
              <span className="text-[8px] text-slate-400 font-mono font-bold animate-pulse">● LIVE UPDATE</span>
            </div>

            <div className="space-y-3">
              {[
                { id: 'proj-1', title: 'Sistem Irigasi Cerdas Daerah Irigasi Rentang', type: 'Tender', budget: 'Rp 150 Juta', deadline: '15 Jul 2026', issuer: 'Dinas SDA Jabar', color: 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-100 dark:border-rose-900/30' },
                { id: 'proj-2', title: 'Pembuatan Model GIS Deteksi Deforestasi Hutan', type: 'Freelance', budget: 'Rp 18 Juta', deadline: '10 Jul 2026', issuer: 'YPI Alam Lestari', color: 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border-teal-100 dark:border-teal-900/30' },
                { id: 'proj-3', title: 'Lead Software Engineer (IoT Integration)', type: 'Full-Time', budget: 'Rp 22 - 30 Juta/bln', deadline: '20 Jul 2026', issuer: 'PT Jabar Digital Agro', color: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-900/30' },
                { id: 'proj-4', title: 'Pengadaan Solar Panel Kantor Bappeda', type: 'Tender', budget: 'Rp 85 Juta', deadline: '25 Jul 2026', issuer: 'Bappeda Indramayu', color: 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-100 dark:border-rose-900/30' },
                { id: 'proj-5', title: 'Copywriter Laporan Keberlanjutan Pangan', type: 'Freelance', budget: 'Rp 7,5 Juta', deadline: '12 Jul 2026', issuer: 'Dinas Pangan Jabar', color: 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border-teal-100 dark:border-teal-900/30' }
              ].map((job) => (
                <div 
                  key={job.id} 
                  onClick={() => onNavigate ? onNavigate('', 'jobs') : onSelectLocation('jobs')}
                  className="group cursor-pointer border-b border-slate-50 dark:border-white/5 last:border-b-0 pb-2.5 last:pb-0 block hover:bg-slate-50/50 dark:hover:bg-[#001126]/50 p-1.5 -mx-1.5 rounded-lg transition"
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 font-semibold text-[11px] leading-snug line-clamp-2">
                      {job.title}
                    </span>
                    <span className={`px-1.5 py-0.2 shrink-0 border text-[8px] font-mono font-bold rounded-md uppercase ${job.color}`}>
                      {job.type}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[9px] text-slate-400 font-mono mt-1.5">
                    <span>
                      {job.issuer} • <strong className="text-slate-600 dark:text-slate-300 font-semibold">{job.budget}</strong>
                    </span>
                    <span className="text-slate-400">
                      Batas: <strong className="text-slate-500 dark:text-slate-400">{job.deadline}</strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => onNavigate ? onNavigate('', 'jobs') : onSelectLocation('jobs')}
              className="w-full mt-1.5 py-1.5 border border-dashed border-indigo-200 dark:border-indigo-800 hover:border-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 font-bold text-[10px] uppercase tracking-wider rounded-lg transition flex items-center justify-center gap-1"
            >
              <span>Explore All Jobs &amp; Tenders</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>

          {/* TIKTOK AD & TRENDING PLACEMENT */}
          <div className="bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-left shadow-2xs space-y-3 text-slate-900 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-2">
              <div className="flex items-center gap-1.5">
                <Music className="h-4.5 w-4.5 text-[#00f2fe]" />
                <h4 className="font-display font-black text-[11px] text-[#002B5B] dark:text-slate-100 uppercase tracking-wider">
                  TikTok Sponsor Ads &amp; Trends
                </h4>
              </div>
              <span className="text-[8px] bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-mono font-extrabold px-1.5 py-0.2 rounded uppercase border border-slate-200 dark:border-white/10">
                TIKTOK
              </span>
            </div>

            {/* Simulated TikTok Embed */}
            <div className="bg-slate-50 dark:bg-[#001126] border border-slate-100 dark:border-white/5 rounded-xl overflow-hidden shadow-3xs">
              <div className="p-2 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-white/10 text-white font-mono text-[9px] font-black">
                    J
                  </div>
                  <div>
                    <div className="flex items-center gap-0.5">
                      <span className="text-[10px] font-black text-slate-800 dark:text-slate-100">@pesona_jabar</span>
                      <span className="text-[8px] text-teal-400">✓</span>
                    </div>
                    <span className="text-[8px] text-slate-400 block -mt-0.5">Wisata Alam Jabar • Bersponsor</span>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-slate-600 font-bold text-xs px-1">•••</button>
              </div>

              {/* TikTok Video preview */}
              <div className="relative aspect-[9/16] w-full max-h-[250px] bg-slate-950 overflow-hidden flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400" 
                  alt="TikTok Jabar Beach" 
                  className="w-full h-full object-cover opacity-80" 
                  referrerPolicy="no-referrer"
                />
                {/* Visual overlays mimicking TikTok UI */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                
                {/* Sidebar overlay buttons */}
                <div className="absolute right-2 bottom-8 flex flex-col gap-3 items-center text-white">
                  <div className="flex flex-col items-center">
                    <button className="w-7 h-7 bg-black/40 rounded-full flex items-center justify-center hover:scale-110 transition">
                      <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
                    </button>
                    <span className="text-[8px] font-mono mt-0.5">24.5K</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <button className="w-7 h-7 bg-black/40 rounded-full flex items-center justify-center hover:scale-110 transition">
                      <MessageSquare className="h-4 w-4 text-white" />
                    </button>
                    <span className="text-[8px] font-mono mt-0.5">1.2K</span>
                  </div>
                </div>

                {/* Bottom caption */}
                <div className="absolute bottom-2 left-2 text-white text-[9px] max-w-[80%] space-y-0.5 text-left">
                  <p className="font-bold">@pesona_jabar</p>
                  <p className="line-clamp-2 text-slate-355">Keindahan Pantai Pangandaran Jabar yang mempesona sore ini! 😍 Siapa nih yang kangen mantai ke sini? 🌅🌴 #Pangandaran #PariwisataJabar</p>
                  <p className="text-[8px] text-[#00f2fe] flex items-center gap-1 truncate mt-1">
                    <Music className="h-2.5 w-2.5 animate-spin" /> <span>Original Sound - Pesona Jabar</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Trending on TikTok */}
            <div className="pt-2 border-t border-slate-100 dark:border-white/10 space-y-2">
              <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                <TrendingUp className="h-3.5 w-3.5 text-[#ff007f]" />
                <span>Suara &amp; Tantangan Populer TikTok Jabar</span>
              </div>
              <div className="space-y-1.5">
                {[
                  { tag: "🎵 HejoHejoChallenge", count: "1.5M views", desc: "Tarian khas Sunda modern remix" },
                  { tag: "🎵 PangalenganVibes", count: "890K views", desc: "Cinematic kabut kebun teh pagi" },
                  { tag: "🎵 PersibDayAnthem", count: "2.1M views", desc: "Sound dukungan suporter Persib" }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[10px] bg-slate-50 dark:bg-[#001126] p-1.5 rounded-lg border border-slate-100 dark:border-white/5">
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-100 block">{item.tag}</span>
                      <span className="text-[8px] text-slate-400 block">{item.desc}</span>
                    </div>
                    <span className="text-[9px] font-mono font-bold text-slate-500 shrink-0 ml-2">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* NEW WIDGET 1: INDEKS KUALITAS UDARA (AQI) JABAR */}
          <div id="home-aqi-widget" className="bg-white dark:bg-[#001c3d] polet-card-top border border-slate-200 dark:border-white/10 rounded-xl p-4 text-left shadow-2xs space-y-3 text-slate-900 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-2">
              <div className="flex items-center gap-1.5">
                <Wind className="h-4.5 w-4.5 text-sky-500 animate-pulse" />
                <h4 className="font-display font-black text-[11px] text-[#002B5B] dark:text-slate-100 uppercase tracking-wider">
                  Indeks Kualitas Udara (AQI Jabar)
                </h4>
              </div>
              <span className="text-[8px] text-slate-400 font-mono font-bold">Kementerian LHK</span>
            </div>

            {/* City Selector Tabs */}
            <div className="flex flex-wrap gap-1 border-b border-slate-100 dark:border-white/10 pb-1.5">
              {(['bandung', 'bekasi', 'depok', 'cirebon', 'bogor'] as const).map((city) => (
                <button
                  key={city}
                  onClick={() => setActiveAqiCity(city)}
                  className={`px-2 py-0.5 rounded text-[8px] font-mono font-extrabold uppercase transition ${
                    activeAqiCity === city
                      ? 'bg-sky-500 text-white shadow-3xs'
                      : 'bg-slate-50 dark:bg-[#001126] text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>

            {/* AQI Display */}
            {(() => {
              const data = {
                bandung: { value: 72, status: 'Sedang', color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-250 dark:border-amber-900/30', pm25: '22.4 µg/m³', desc: 'Kualitas udara sedang. Kelompok sensitif sebaiknya mengurangi aktivitas fisik yang lama di luar ruangan.' },
                bekasi: { value: 144, status: 'Tidak Sehat', color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-250 dark:border-rose-900/30', pm25: '55.8 µg/m³', desc: 'Masyarakat umum mulai merasakan dampak kesehatan, kelompok sensitif dapat mengalami dampak lebih serius.' },
                depok: { value: 98, status: 'Sedang', color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-250 dark:border-amber-900/30', pm25: '34.1 µg/m³', desc: 'Kualitas udara dapat diterima bagi kebanyakan orang. Pengurangan durasi kegiatan luar disarankan.' },
                cirebon: { value: 45, status: 'Baik', color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-255 dark:border-emerald-900/30', pm25: '10.8 µg/m³', desc: 'Kualitas udara sangat baik dan tidak menimbulkan risiko kesehatan bagi semua kalangan.' },
                bogor: { value: 58, status: 'Sedang', color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-250 dark:border-amber-900/30', pm25: '15.2 µg/m³', desc: 'Kualitas udara sedang. Bogor didukung oleh curah hujan tinggi yang membantu membersihkan polutan.' }
              }[activeAqiCity];

              return (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100">{data.value}</span>
                      <div className={`px-2 py-0.5 border text-[9px] font-mono font-bold rounded-md ${data.color}`}>
                        {data.status.toUpperCase()}
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                      PM2.5: <strong className="text-slate-800 dark:text-slate-200">{data.pm25}</strong>
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal bg-slate-50 dark:bg-[#001126] p-2 rounded-lg border border-slate-100 dark:border-white/10">
                    {data.desc}
                  </p>
                </div>
              );
            })()}
          </div>

          {/* NEW WIDGET 2: STATUS TINGGI MUKA AIR WADUK (WADUK JABAR MONITOR) */}
          <div id="home-waduk-widget" className="bg-white dark:bg-[#001c3d] polet-card-top border border-slate-200 dark:border-white/10 rounded-xl p-4 text-left shadow-2xs space-y-3 text-slate-900 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-2">
              <div className="flex items-center gap-1.5">
                <Droplets className="h-4.5 w-4.5 text-blue-500" />
                <h4 className="font-display font-black text-[11px] text-[#002B5B] dark:text-slate-100 uppercase tracking-wider">
                  Volume &amp; Status Waduk Jabar
                </h4>
              </div>
              <span className="text-[8px] text-slate-400 font-mono font-bold">BBWS Citarum</span>
            </div>

            {/* Filter Toggle */}
            <div className="flex gap-1 border-b border-slate-100 dark:border-white/10 pb-1.5">
              {[
                { name: 'Semua', id: 'all' },
                { name: 'Siaga / Waspada', id: 'alert' }
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setSelectedWadukStatus(btn.id)}
                  className={`px-2.5 py-0.5 rounded text-[8px] font-mono font-extrabold uppercase transition ${
                    selectedWadukStatus === btn.id
                      ? 'bg-[#002B5B] dark:bg-slate-800 text-[#FFD700] shadow-3xs'
                      : 'bg-slate-50 dark:bg-[#001126] text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {btn.name}
                </button>
              ))}
            </div>

            {/* Waduk List */}
            <div className="space-y-2.5 max-h-[170px] overflow-y-auto pr-1">
              {[
                { name: 'Waduk Jatiluhur', level: '107.5 m', max: '111.0 m', capacity: 85, status: 'Aman', color: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900/30' },
                { name: 'Waduk Cirata', level: '218.2 m', max: '220.0 m', capacity: 92, status: 'Waspada', color: 'bg-amber-500', text: 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-amber-100 dark:border-amber-900/30' },
                { name: 'Waduk Saguling', level: '641.8 m', max: '643.0 m', capacity: 78, status: 'Aman', color: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900/30' },
                { name: 'Waduk Darma', level: '711.5 m', max: '713.0 m', capacity: 96, status: 'Siaga', color: 'bg-rose-500', text: 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border-rose-100 dark:border-rose-900/30' },
                { name: 'Situ Cipanunjang', level: '1.425 m', max: '1.430 m', capacity: 62, status: 'Aman', color: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900/30' }
              ]
                .filter(w => selectedWadukStatus === 'all' || w.status !== 'Aman')
                .map((w, idx) => (
                  <div key={idx} className="space-y-1 border-b border-slate-50 dark:border-white/5 pb-2 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-bold text-slate-800 dark:text-slate-100">{w.name}</span>
                      <span className={`px-1.5 py-0.2 rounded font-mono text-[8px] font-black uppercase border ${w.text}`}>
                        {w.status}
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden flex">
                      <div className={`h-full ${w.color}`} style={{ width: `${w.capacity}%` }}></div>
                    </div>
                    <div className="flex justify-between text-[8px] font-mono text-slate-400">
                      <span>Level: <strong>{w.level}</strong> / {w.max}</span>
                      <span>Kapasitas: <strong>{w.capacity}%</strong></span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* NEW WIDGET 3: SISTEM PERINGATAN DINI BENCANA JABAR */}
          <div id="home-warning-widget" className="bg-rose-50/75 dark:bg-rose-950/20 border border-rose-150 dark:border-rose-900/30 rounded-xl p-4 text-left shadow-2xs space-y-3 text-slate-900 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-rose-200 dark:border-rose-900/30 pb-2">
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="h-4.5 w-4.5 text-rose-500 animate-bounce" />
                <h4 className="font-display font-black text-[11px] text-rose-900 dark:text-rose-300 uppercase tracking-wider">
                  Peringatan Dini &amp; Tanggap Bencana
                </h4>
              </div>
              <span className="text-[8px] bg-rose-600 text-white font-mono font-black px-1.5 py-0.2 rounded uppercase animate-pulse">
                SIAGA
              </span>
            </div>

            {/* Warning Cards Accordion */}
            <div className="space-y-2">
              {[
                { id: 1, title: 'Waspada Gempa Sesar Lembang', severity: 'Medium', location: 'KBU & Bandung Utara', info: 'Deteksi vibrasi mikro terus menerus pada jejaring sensor seismik BMKG Jabar. Warga diimbau mengidentifikasi struktur bangunan aman gempa dan jalur evakuasi terbuka.' },
                { id: 2, title: 'Siaga Banjir Sungai Citarum', severity: 'Tinggi', location: 'Dayeuhkolot & Baleendah', info: 'Tinggi Muka Air (TMA) di pos pantau Jembatan Dayeuhkolot mencapai batas Siaga II akibat hujan harian konstan. Siapkan tas evakuasi mandiri.' },
                { id: 3, title: 'Waspada Longsor Tebing Pangalengan', severity: 'Rendah', location: 'Jalur Pangalengan-Cisewu', info: 'Curah hujan akumulatif 3 hari melebihi 150mm meningkatkan kejenuhan tanah lereng curam.' }
              ].map((warn) => {
                const isActive = activeWarningId === warn.id;
                return (
                  <div 
                    key={warn.id}
                    className="border border-rose-100 dark:border-rose-900/30 bg-white/90 dark:bg-[#001126]/90 rounded-lg p-2.5 transition duration-200"
                  >
                    <div 
                      onClick={() => setActiveWarningId(isActive ? null : warn.id)}
                      className="flex justify-between items-center cursor-pointer"
                    >
                      <div className="space-y-0.5">
                        <span className="text-[8px] font-mono font-extrabold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 px-1.5 py-0.2 rounded mr-1.5">
                          {warn.severity.toUpperCase()}
                        </span>
                        <span className="text-[10px] font-bold text-slate-800 dark:text-slate-100 leading-tight">{warn.title}</span>
                      </div>
                      <span className="text-slate-400 font-mono text-[10px] font-bold select-none ml-2">
                        {isActive ? '▲' : '▼'}
                      </span>
                    </div>

                    {isActive && (
                      <div className="mt-2 pt-2 border-t border-rose-50 dark:border-rose-900/30 text-[10px] text-slate-600 dark:text-slate-300 space-y-1 animate-fade-in">
                        <p><strong>Lokasi:</strong> {warn.location}</p>
                        <p className="bg-slate-50 dark:bg-[#001c3d]/40 p-1.5 rounded text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                          {warn.info}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* NEW WIDGET 4: MONITOR LAYANAN DIGITAL JABAR */}
          <div id="home-services-widget" className="bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-xl p-4 text-left shadow-2xs space-y-3 text-slate-900 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-2">
              <div className="flex items-center gap-1.5">
                <Wifi className="h-4.5 w-4.5 text-[#2B7A78]" />
                <h4 className="font-display font-black text-[11px] text-[#002B5B] dark:text-slate-100 uppercase tracking-wider">
                  Kesiapan Layanan Digital Jabar
                </h4>
              </div>
              <span className="text-[8px] text-slate-400 font-mono font-bold">Diskominfo Jabar</span>
            </div>

            {/* List of Services */}
            <div className="space-y-2">
              {[
                { id: 'sapawarga', name: 'Sapawarga SuperApp', desc: 'Satu Portal Jabar' },
                { id: 'sabar', name: 'SABAR Samsat Mobile', desc: 'Pajak Kendaraan Online' },
                { id: 'saber-hoaks', name: 'Jabar Saber Hoaks', desc: 'Klarifikasi Fakta' },
                { id: 'open-data', name: 'Open Data Jabar', desc: 'Basis Data Sektoral' },
                { id: 'pikobar', name: 'Pikobar Mitigasi', desc: 'Info Tanggap Darurat' }
              ].map((srv) => {
                const isPinging = pingingServiceId === srv.id;
                const latency = servicePingStatus[srv.id];

                return (
                  <div key={srv.id} className="p-2 bg-slate-50 dark:bg-[#001126] border border-slate-100 dark:border-white/10 rounded-lg flex items-center justify-between text-[10px]">
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-100 block leading-tight">{srv.name}</span>
                      <span className="text-[8px] text-slate-400 font-mono mt-0.5 block">{srv.desc}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {isPinging ? (
                        <span className="text-[8px] font-mono text-slate-400 animate-pulse">Pinging...</span>
                      ) : (
                        <span className="text-[8px] font-mono font-bold text-[#2B7A78]">
                          ● {latency} ms
                        </span>
                      )}
                      <button
                        onClick={() => handlePingService(srv.id)}
                        disabled={isPinging}
                        className="p-1 hover:bg-slate-200 dark:hover:bg-[#001733] rounded text-slate-400 hover:text-slate-700 transition cursor-pointer"
                        title="Tes Latensi"
                      >
                        <RefreshCw className={`h-2.5 w-2.5 ${isPinging ? 'animate-spin' : ''}`} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* NEW WIDGET 5: HARGA BAHAN POKOK JABAR (COMMODITY INDEX) */}
          <div id="home-staples-widget" className="bg-white dark:bg-[#001c3d] polet-card-top border border-slate-200 dark:border-white/10 rounded-xl p-4 text-left shadow-2xs space-y-3 text-slate-900 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-2">
              <div className="flex items-center gap-1.5">
                <ShoppingBag className="h-4.5 w-4.5 text-amber-500" />
                <h4 className="font-display font-black text-[11px] text-[#002B5B] dark:text-slate-100 uppercase tracking-wider">
                  Harga Bahan Pokok (Pangan Jabar)
                </h4>
              </div>
              <span className="text-[8px] text-slate-400 font-mono font-bold">Dinas Indag Jabar</span>
            </div>

            {/* Region Select Tabs */}
            <div className="flex gap-1 border-b border-slate-100 dark:border-white/10 pb-1.5">
              {[
                { name: 'Jawa Barat (Rata-rata)', id: 'jabar' },
                { name: 'Pasar Kota Bandung', id: 'bandung_city' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setStaplesPriceRegion(tab.id as 'jabar' | 'bandung_city')}
                  className={`px-2.5 py-0.5 rounded text-[8px] font-mono font-extrabold uppercase transition ${
                    staplesPriceRegion === tab.id
                      ? 'bg-amber-500 text-slate-950 shadow-3xs'
                      : 'bg-slate-50 dark:bg-[#001126] text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Price list */}
            <div className="space-y-2">
              {(() => {
                const list = {
                  jabar: [
                    { name: 'Beras Premium Cianjur', price: 'Rp 14.800 / kg', change: '+1.2%', up: true },
                    { name: 'Cabai Merah Keriting', price: 'Rp 48.500 / kg', change: '-4.8%', up: false },
                    { name: 'Bawang Merah Brebes', price: 'Rp 32.000 / kg', change: '+2.5%', up: true },
                    { name: 'Daging Sapi Segar', price: 'Rp 135.000 / kg', change: '0.0%', up: null },
                    { name: 'Minyak Goreng Curah', price: 'Rp 16.200 / L', change: '+0.6%', up: true }
                  ],
                  bandung_city: [
                    { name: 'Beras Premium Cianjur', price: 'Rp 15.200 / kg', change: '+1.8%', up: true },
                    { name: 'Cabai Merah Keriting', price: 'Rp 51.000 / kg', change: '-3.2%', up: false },
                    { name: 'Bawang Merah Brebes', price: 'Rp 34.500 / kg', change: '+3.1%', up: true },
                    { name: 'Daging Sapi Segar', price: 'Rp 138.000 / kg', change: '+0.7%', up: true },
                    { name: 'Minyak Goreng Curah', price: 'Rp 16.500 / L', change: '+1.2%', up: true }
                  ]
                }[staplesPriceRegion];

                return list.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[11px] border-b border-slate-50 dark:border-white/5 pb-1.5 last:border-0 last:pb-0">
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-100 block leading-tight">{item.name}</span>
                      <span className="text-[8px] text-slate-400 font-mono mt-0.5 block">{item.price}</span>
                    </div>
                    <div className="text-right font-mono text-[10px]">
                      {item.up === null ? (
                        <span className="text-slate-400 font-bold">Stabil</span>
                      ) : (
                        <span className={`font-bold ${item.up ? 'text-emerald-600' : 'text-rose-500'}`}>
                          {item.up ? '▲' : '▼'} {item.change}
                        </span>
                      )}
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>

          {/* 5. INTERACTIVE PRAYER TIME (Jadwal Sholat Bandung & Jakarta) */}
          <div className="bg-gradient-to-br from-[#002B5B] to-[#001733] text-white rounded-xl p-4 text-left shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-[#FFD700]" />
                <h4 className="font-display font-black text-[11px] text-[#FFD700] uppercase tracking-wider">
                  Jadwal Sholat (Wilayah Bandung)
                </h4>
              </div>
              <span className="text-[8px] text-slate-300 font-mono font-bold uppercase">Kemenag RI</span>
            </div>

            {/* Prayer schedule grid */}
            <div className="grid grid-cols-5 gap-1.5 text-center text-[10px] font-mono">
              {[
                { name: "Subuh", time: "04:42", active: false },
                { name: "Dzuhur", time: "12:02", active: false },
                { name: "Ashar", time: "15:21", active: false },
                { name: "Maghrib", time: "18:01", active: true },
                { name: "Isya", time: "19:12", active: false }
              ].map((sholat, idx) => (
                <div 
                  key={idx} 
                  className={`p-1.5 rounded-lg border ${
                    sholat.active 
                      ? 'bg-[#FFD700] text-[#002B5B] border-[#FFD700] font-black' 
                      : 'bg-[#001f42] border-white/10 text-slate-300'
                  }`}
                >
                  <span className="block text-[8px] font-bold opacity-80">{sholat.name}</span>
                  <span className="font-extrabold text-[11px] mt-0.5 block">{sholat.time}</span>
                </div>
              ))}
            </div>

            {/* Countdown widget */}
            <div className="bg-[#001f42]/60 rounded-lg p-2 text-center text-[10px] font-mono text-[#FFD700] font-bold flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
              <span>Menjelang Maghrib: <strong>-00:45:12</strong> (Bandung & Sekitarnya)</span>
            </div>
          </div>

          {/* 6. CCTV MONITOR INTERACTIVE PANEL */}
          <div className="bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-xl p-4 text-left shadow-2xs space-y-3 text-slate-900 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-2">
              <div className="flex items-center gap-1.5">
                <Camera className="h-4.5 w-4.5 text-rose-500" />
                <h4 className="font-display font-black text-[11px] text-[#002B5B] dark:text-slate-100 uppercase tracking-wider">
                  CCTV Lalu Lintas (Live Pemantauan Bandung)
                </h4>
              </div>
              <span className="text-[8px] text-slate-400 font-mono font-bold">ATCS Bandung Sync</span>
            </div>

            {/* CCTV Selector */}
            <div className="flex gap-1">
              {[
                { name: "Simpang Dago", slug: "simpang-dago" },
                { name: "Pasteur Toll", slug: "pasteur" },
                { name: "Gedung Sate", slug: "gedung-sate" }
              ].map((node) => (
                <button
                  key={node.slug}
                  onClick={() => handleCctvChange(node.slug)}
                  className={`flex-1 px-2 py-1 rounded text-[8px] font-mono font-extrabold uppercase border transition ${
                    activeCctvNode === node.slug 
                      ? 'bg-rose-500 text-white border-rose-500' 
                      : 'bg-slate-50 dark:bg-[#001126] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-[#001733]'
                  }`}
                >
                  {node.name}
                </button>
              ))}
            </div>

            {/* Simulated monitor viewport */}
            <div className="relative aspect-video w-full bg-slate-950 rounded-lg overflow-hidden border border-slate-200 dark:border-white/10 flex items-center justify-center">
              {cctvLoading ? (
                <div className="text-center space-y-1 font-mono text-slate-400 text-[10px] font-bold">
                  <RefreshCw className="h-4 w-4 animate-spin mx-auto text-rose-500" />
                  <span>Koneksi ke Kamera...</span>
                </div>
              ) : (
                <>
                  {/* CCTV image overlay placeholder based on node */}
                  <img 
                    src={
                      activeCctvNode === 'simpang-dago' ? "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600" :
                      activeCctvNode === 'pasteur' ? "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=600" :
                      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600"
                    }
                    alt="CCTV placeholder" 
                    className="w-full h-full object-cover opacity-60"
                  />
                  {/* Simulated scanning lines */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] pointer-events-none"></div>
                  <div className="absolute top-2 left-2 text-[8px] font-mono bg-black/60 text-emerald-400 px-1 rounded flex items-center gap-1 uppercase">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                    REC • ATCS_{activeCctvNode.toUpperCase()}
                  </div>
                  <div className="absolute bottom-2 right-2 text-[8px] font-mono text-white bg-black/60 px-1 rounded">
                    LAT: -6.9012 • LON: 107.6189
                  </div>
                </>
              )}
            </div>
          </div>

          {/* 7. LIVE REDAKSI BULLETINS (Live Event Ticker) */}
          <div className="bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-xl p-4 text-left shadow-2xs space-y-3 text-slate-900 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-2">
              <div className="flex items-center gap-1.5">
                <AlertCircle className="h-4.5 w-4.5 text-rose-500" />
                <h4 className="font-display font-black text-[11px] text-[#002B5B] dark:text-slate-100 uppercase tracking-wider">
                  Live Event (Kabar Redaksi Terkini)
                </h4>
              </div>
              <span className="bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200 text-[8px] font-bold font-mono px-1.5 rounded">TERBARU</span>
            </div>

            <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1">
              {liveEventLogs.map((log, idx) => (
                <div key={idx} className="text-[10px] leading-relaxed border-b border-slate-50 dark:border-white/5 pb-2 last:border-0 last:pb-0">
                  <p className="text-slate-600 dark:text-slate-300 font-semibold">{log}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 8. TRENDING SEARCH TAGS */}
          <div className="bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-xl p-4 text-left shadow-2xs space-y-2 text-slate-900 dark:text-slate-100">
            <div className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest border-b dark:border-white/10 pb-1.5 mb-2">
              Trending Searches Today
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["Revitalisasi Gedung Sate", "Pajak Digital Sri Mulyani", "IHSG Hijau", "Piala Dunia 2026 Jabar", "ATCS Bandung Live"].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectLocation(item.toLowerCase())}
                  className="px-2 py-1 bg-indigo-50 dark:bg-indigo-950 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-[9px] font-bold font-mono transition cursor-pointer"
                >
                  #{item}
                </button>
              ))}
            </div>
          </div>

          {/* 8.5 BURSA KERJA & NIAGA JABAR */}
          <SidebarLokerNiaga onNavigate={onNavigate} />

          {/* 9. NEWSLETTER CAMPAIGN */}
          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/20 dark:to-emerald-950/20 border border-teal-200 dark:border-teal-900/30 rounded-xl p-4 text-left space-y-3 text-slate-900 dark:text-slate-100">
            <div className="flex items-center gap-1.5">
              <Mail className="h-4.5 w-4.5 text-[#2B7A78]" />
              <h4 className="font-display font-black text-[11px] text-[#002B5B] dark:text-slate-100 uppercase tracking-wider">
                Newsletter Daily Briefing
              </h4>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Dapatkan laporan riset makro, kebijakan regional, dan analisis geopolitik Jawa Barat eksklusif gratis dikirim langsung ke inbox Anda setiap hari.
            </p>

            {newsletterSubscribed ? (
              <div className="p-2 bg-emerald-100 border border-emerald-200 text-emerald-800 text-[10px] font-bold rounded-lg text-center flex items-center justify-center gap-1 animate-fade-in">
                <Check className="h-3.5 w-3.5" />
                <span>Terima kasih! Buletin harian Anda telah aktif.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Masukkan email aktif Anda..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-white dark:bg-[#001126] border border-slate-200 dark:border-white/10 rounded-lg px-2.5 py-1.5 text-[11px] placeholder-slate-400 focus:outline-none focus:border-[#2B7A78] text-slate-800 dark:text-slate-100"
                />
                <button
                  type="submit"
                  className="w-full py-1.5 bg-[#002B5B] hover:bg-[#001f42] text-white font-extrabold text-[10px] uppercase tracking-wide rounded-lg transition shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Send className="h-3 w-3" /> Langganan Buletin Free
                </button>
              </form>
            )}
          </div>

          {/* 10. MICRO SPONSOR AD PLACEMENT */}
          <div className="bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-left shadow-2xs space-y-2 text-slate-900 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-1.5">
              <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest font-bold">Micro Sponsor Placement</span>
              <span className="text-[8px] bg-amber-400 text-slate-900 font-extrabold px-1 rounded">ADS</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-[10px] leading-tight">
              <a 
                href="#sponsor-server" 
                className="p-2 bg-slate-50 dark:bg-[#001126] border dark:border-white/10 hover:border-teal-400 dark:hover:border-teal-500 rounded-lg block transition"
              >
                <span className="font-bold text-slate-800 dark:text-slate-200 block">Sewa Server Jabar</span>
                <span className="text-[9px] text-slate-400 block mt-0.5">Mulai Rp 45rb/bln</span>
              </a>
              <a 
                href="#sponsor-villa" 
                className="p-2 bg-slate-50 dark:bg-[#001126] border dark:border-white/10 hover:border-teal-400 dark:hover:border-teal-500 rounded-lg block transition"
              >
                <span className="font-bold text-slate-800 dark:text-slate-200 block">Sewa Villa Dago</span>
                <span className="text-[9px] text-slate-400 block mt-0.5">Diskon 20% Weekday</span>
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* 3. AD ZONE FOOTER BILLBOARD */}
      <AdZone zone="footer_billboard" pageContext={{ category: categorySlug }} />

    </div>
  );
}
