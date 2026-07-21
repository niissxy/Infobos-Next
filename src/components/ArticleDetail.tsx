import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Clock, Eye, Share2, Bookmark, BookmarkCheck, Calendar, User as UserIcon, 
  CheckCircle2, Volume2, VolumeX, Languages, Printer, FileText, AlertTriangle, Heart, 
  MessageSquare, Send, Sparkles, ThumbsUp, Check, MapPin, RotateCcw, Info, Sliders, 
  HelpCircle, Maximize2, ChevronRight, Play, Pause, Shield, Activity, ListOrdered, 
  TrendingUp, X, ChevronDown, ChevronUp, ShieldAlert, BadgeHelp, Download, SendHorizontal,
  Facebook, Twitter, Linkedin, MessageCircle, Copy, Link as LinkIcon, Award,
  Layers, RefreshCw, Database, Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar 
} from 'recharts';
import AdZone from './AdZone';
import { AiReadingAssistantWidget } from './AiReadingAssistantWidget';

interface ArticleDetailProps {
  slug: string;
  onBack: () => void;
  onSelectLocation: (slug: string) => void;
  onSelectEntity: (slug: string) => void;
  user?: any;
  onSelectTab?: (tab: string) => void;
}

// Interactive mockup datasets for dynamic infographic blocks & tables
const INFLATION_DATA = [
  { month: 'Jan', 'Laju Inflasi (%)': 2.1, 'Target APBD (%)': 2.5 },
  { month: 'Feb', 'Laju Inflasi (%)': 2.3, 'Target APBD (%)': 2.5 },
  { month: 'Mar', 'Laju Inflasi (%)': 2.2, 'Target APBD (%)': 2.5 },
  { month: 'Apr', 'Laju Inflasi (%)': 2.6, 'Target APBD (%)': 2.5 },
  { month: 'Mei', 'Laju Inflasi (%)': 2.4, 'Target APBD (%)': 2.5 },
  { month: 'Jun', 'Laju Inflasi (%)': 2.3, 'Target APBD (%)': 2.5 },
];

const FISCAL_TABLE_DATA = [
  { id: 1, item: "Pariwisata & Heritage Kota Bandung", budget: "Rp 12.4 Miliar", realized: "85%", status: "Selesai" },
  { id: 2, item: "Infrastruktur Transportasi Jawa Barat", budget: "Rp 45.2 Miliar", realized: "62%", status: "Konstruksi" },
  { id: 3, item: "Digitalisasi Sentra UMKM Regional", budget: "Rp 8.7 Miliar", realized: "91%", status: "Selesai" },
  { id: 4, item: "Subsidi Sektor Energi & Pangan", budget: "Rp 15.0 Miliar", realized: "50%", status: "Berjalan" },
];

const FACT_CHECK_REGISTRY: Record<string, {
  confidenceScore: number;
  summary: string;
  claims: Array<{
    text: string;
    highlightText: string;
    status: 'verified' | 'misleading' | 'partially_true';
    statusText: string;
    explanation: string;
    source: string;
  }>;
  sources: string[];
}> = {
  "diplomasi-hijau-ri-investasi-transisi-energi-disepakati": {
    confidenceScore: 94,
    summary: "Hasil analisis AI mendeteksi akurasi tinggi pada data kuantitatif penandatanganan JETP. Klaim investasi transisi energi berkelanjutan $12 Miliar USD terbukti selaras dengan draf naskah resmi kerja sama.",
    claims: [
      {
        text: "Pemerintah secara resmi menyepakati paket pendanaan transisi energi baru senilai $12 Miliar USD.",
        highlightText: "$12 Miliar USD",
        status: "verified",
        statusText: "TERVERIFIKASI",
        explanation: "Klaim ini akurat dan terverifikasi melalui naskah kerja sama multilateral yang ditandatangani di Jakarta antara Pemerintah RI dengan konsorsium lembaga keuangan internasional pimpinan Uni Eropa.",
        source: "Kementerian ESDM RI"
      },
      {
        text: "Penyusunan interkoneksi kabel bawah laut Jawa-Sumatera.",
        highlightText: "interkoneksi kabel bawah laut",
        status: "partially_true",
        statusText: "SEBAGIAN BENAR",
        explanation: "Meskipun interkoneksi terencana secara teknis dalam RUPTL PLN, anggaran Rp 4.8 Miliar merupakan bagian studi awal kelayakan teknis, bukan pengerjaan fisik penuh.",
        source: "RUPTL PLN 2024-2033"
      }
    ],
    sources: ["Kementerian ESDM RI", "Sekretariat JETP Indonesia", "Draf RUPTL PLN 2024", "Badan Pusat Statistik"]
  },
  "geopolitik-mineral-kritis-ri-gagas-aliansi-kedaulatan-hilirisasi": {
    confidenceScore: 87,
    summary: "Secara geopolitik klaim pendirian aliansi didukung korespondensi diplomatik aktif, namun implementasi penuh pembentukan OCMEC masih menghadapi tantangan lobi global.",
    claims: [
      {
        text: "Pemerintah Republik Indonesia secara resmi menyurati 12 negara produsen mineral kritis.",
        highlightText: "menyurati 12 negara produsen mineral kritis",
        status: "verified",
        statusText: "TERVERIFIKASI",
        explanation: "Utusan khusus Kementerian Luar Negeri membenarkan bahwa draf nota diplomatik telah dikirimkan ke 12 kedutaan besar negara produsen nikel dan kobalt.",
        source: "Kementerian Luar Negeri RI"
      }
    ],
    sources: ["Direktorat Jenderal Amerika dan Eropa Kemlu", "Kementerian ESDM", "London Metal Exchange (LME) Reports"]
  },
  "koridor-pertanian-presisi-jawa-barat-berbasis-sensor-iot": {
    confidenceScore: 95,
    summary: "Program pertanian presisi Majalengka terbukti berjalan menggunakan instrumen sensor IoT lokal dengan peningkatan produktivitas yang tervalidasi.",
    claims: [
      {
        text: "Peningkatan efisiensi pemupukan & hasil panen padi hingga 35 persen.",
        highlightText: "hasil panen padi hingga 35 persen",
        status: "verified",
        statusText: "TERVERIFIKASI",
        explanation: "Sesuai laporan uji coba Dinas Tanaman Pangan Jabar di tiga kecamatan Majalengka, efisiensi air mencapai 30% dan produktivitas gabah naik rata-rata 35.2%.",
        source: "Dinas Tanaman Pangan & Hortikultura Jabar"
      }
    ],
    sources: ["Dinas Tanaman Pangan Prov. Jabar", "Laboratorium Agroteknologi ITB", "Riset Sawah Digital Majalengka"]
  }
};

export default function ArticleDetail({
  slug,
  onBack,
  onSelectLocation,
  onSelectEntity,
  user,
  onSelectTab
}: ArticleDetailProps) {
  // Primary States
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkError, setBookmarkError] = useState<string | null>(null);
  const [inlineAd, setInlineAd] = useState<any>(null);
  const [extraLiveUpdates, setExtraLiveUpdates] = useState<Array<{time: string, title: string, body: string}>>([]);
  const [refreshingLive, setRefreshingLive] = useState(false);

  // Accessibility / Contrast Themes
  // 'light' (clean slate off-white), 'sepia' (warm paper), 'dark' (charcoal), 'high-contrast' (pure black/yellow)
  const [contrastTheme, setContrastTheme] = useState<'light' | 'sepia' | 'dark' | 'contrast'>('light');
  const [fontSize, setFontSize] = useState<number>(16); // px

  // Floating Actions & Scrolling
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showFloatingTools, setShowFloatingTools] = useState(true);
  const articleRef = useRef<HTMLDivElement>(null);

  // Real Browser Text-To-Speech (TTS) Engine State & Refs
  const [ttsPlaying, setTtsPlaying] = useState(false);
  const [ttsPaused, setTtsPaused] = useState(false);
  const [ttsSpeed, setTtsSpeed] = useState(1);
  const [ttsCurrentIndex, setTtsCurrentIndex] = useState(-1);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>('');
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Load available browser voices
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
      
      // Select indonesian voice as priority, then default to English or first available
      const indonesianVoice = voices.find(v => v.lang.toLowerCase().includes('id'));
      const defaultVoice = indonesianVoice || voices.find(v => v.lang.toLowerCase().includes('en')) || voices[0];
      if (defaultVoice) {
        setSelectedVoiceName(defaultVoice.name);
      }
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Live Translator Simulation
  const [activeLanguage, setActiveLanguage] = useState<'ID' | 'EN' | 'JV' | 'SD'>('ID');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedArticle, setTranslatedArticle] = useState<Record<'ID' | 'EN' | 'JV' | 'SD', {
    title: string;
    subtitle: string;
    summary: string;
    body: string[];
  } | null>>({
    ID: null,
    EN: null,
    JV: null,
    SD: null
  });

  // Automatically seed original content on load or data updates
  useEffect(() => {
    if (data) {
      setTranslatedArticle({
        ID: {
          title: data.title,
          subtitle: data.subtitle || '',
          summary: data.summary || '',
          body: data.body ? data.body.split('\n\n') : []
        },
        EN: null,
        JV: null,
        SD: null
      });
      setActiveLanguage('ID');
    }
  }, [data]);

  // Dynamic Custom Interactive Poll State
  const [hasVotedPoll, setHasVotedPoll] = useState(false);
  const [pollVotes, setPollVotes] = useState({ yes: 142, no: 34, neutral: 12 });

  // Sidebar / Interactive AI Panel States
  const [isAiSidebarOpen, setIsAiSidebarOpen] = useState(false);
  const [aiChatQuery, setAiChatQuery] = useState('');
  const [aiChatHistory, setAiChatHistory] = useState<Array<{ sender: 'user' | 'ai'; text: string; thinking?: boolean }>>([
    { sender: 'ai', text: 'Halo! Saya AI Redaksi INFOBOS. Ajukan pertanyaan seputar fakta, lokasi, atau regulasi yang tercantum di artikel ini.' }
  ]);

  // Nested Comments Section States
  const [commentsList, setCommentsList] = useState<any[]>([
    {
      id: 'comment-1',
      author: 'Dewi Sartika',
      role: 'Warga Bandung',
      avatar: 'DS',
      body: 'Penataan kawasan cagar budaya di Jalan Braga sangat berdampak positif untuk pelaku seni lokal. Semoga pemeliharaannya terus terjaga secara berkala.',
      likes: 24,
      reactions: { helpful: 8, insightful: 12 },
      timestamp: '2 jam lalu',
      replies: [
        {
          id: 'reply-1-1',
          author: 'Sutisna',
          role: 'Pegiat UMKM',
          body: 'Betul teh, omset penjualan kerajinan tangan kami meningkat hampir 40% setelah trotoar Braga dirapikan.',
          likes: 9,
          timestamp: '1 jam lalu'
        }
      ]
    },
    {
      id: 'comment-2',
      author: 'Ir. Hermawan',
      role: 'Tata Kota SRE',
      avatar: 'IH',
      body: 'Secara tata kelola infrastruktur, ini adalah benchmark yang solid untuk kota heritage lain di Indonesia. Tinggal bagaimana manajemen lalu lintas penunjangnya.',
      likes: 15,
      reactions: { helpful: 4, insightful: 10 },
      timestamp: '4 jam lalu',
      replies: []
    }
  ]);
  const [newCommentText, setNewCommentText] = useState('');
  const [replyTargetId, setReplyTargetId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // INFOBOS LITE EXTRA STATES
  const [aiSummaryLevel, setAiSummaryLevel] = useState<'normal' | 'kilat' | 'takeaways' | 'eli5'>('normal');
  const [upvotes, setUpvotes] = useState(412);
  const [downvotes, setDownvotes] = useState(14);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [isFollowingReporter, setIsFollowingReporter] = useState(false);
  const [reporterFollowers, setReporterFollowers] = useState(1284);
  const [userReputation, setUserReputation] = useState(120);
  const [personalCollections, setPersonalCollections] = useState<string[]>(['Investigasi Jabar', 'Analisis Kebijakan']);
  const [selectedCollection, setSelectedCollection] = useState('Investigasi Jabar');
  const [isSavedToCollection, setIsSavedToCollection] = useState(false);
  const [isPublicBookmark, setIsPublicBookmark] = useState(false);
  const [activeMediaComp, setActiveMediaComp] = useState('infobos');
  const [newCollectionInput, setNewCollectionInput] = useState('');

  // AI Fact Checker States
  const [factCheckActive, setFactCheckActive] = useState<boolean>(false);
  const [factCheckScanning, setFactCheckScanning] = useState<boolean>(false);
  const [factCheckScanProgress, setFactCheckScanProgress] = useState<number>(0);
  const [factCheckScanMessage, setFactCheckScanMessage] = useState<string>('');
  const [factCheckHighlightsActive, setFactCheckHighlightsActive] = useState<boolean>(false);
  const [selectedClaim, setSelectedClaim] = useState<any>(null);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState<boolean>(false);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('infobos-ai-toggle', { detail: { isOpen: isAiAssistantOpen } }));
  }, [isAiAssistantOpen]);

  useEffect(() => {
    const handleOpenAi = () => {
      setIsAiAssistantOpen(true);
      addAnalyticsLog("Membuka Asisten AI dari Floating Menu Gabungan.");
    };
    window.addEventListener('open-ai-assistant', handleOpenAi);
    return () => {
      window.removeEventListener('open-ai-assistant', handleOpenAi);
    };
  }, []);

  // Interactive Table Sort States
  const [tableSortAsc, setTableSortAsc] = useState(true);
  const [tableFilterQuery, setTableFilterQuery] = useState('');
  const [sortedTableData, setSortedTableData] = useState(FISCAL_TABLE_DATA);

  // Lightbox Media Viewer State
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Premium Share Hub States
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState('');
  const [cardGradient, setCardGradient] = useState('from-indigo-600 via-purple-600 to-pink-600');
  const [customToast, setCustomToast] = useState<string | null>(null);
  const [shareMetrics, setShareMetrics] = useState<Record<string, number>>({
    whatsapp: 62,
    telegram: 45,
    twitter: 28,
    facebook: 12,
    linkedin: 8
  });

  const showToast = (msg: string) => {
    setCustomToast(msg);
    setTimeout(() => {
      setCustomToast(null);
    }, 3000);
  };

  const handleDownloadShareCard = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw background gradient
    const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
    if (cardGradient.includes('indigo-600')) {
      gradient.addColorStop(0, '#4f46e5');
      gradient.addColorStop(0.5, '#9333ea');
      gradient.addColorStop(1, '#db2777');
    } else if (cardGradient.includes('amber-500')) {
      gradient.addColorStop(0, '#f59e0b');
      gradient.addColorStop(1, '#ef4444');
    } else if (cardGradient.includes('teal-600')) {
      gradient.addColorStop(0, '#0d9488');
      gradient.addColorStop(1, '#10b981');
    } else if (cardGradient.includes('blue-600')) {
      gradient.addColorStop(0, '#2563eb');
      gradient.addColorStop(1, '#06b6d4');
    } else {
      gradient.addColorStop(0, '#111827');
      gradient.addColorStop(0.5, '#1e1b4b');
      gradient.addColorStop(1, '#111827');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 630);

    // Decorative circles/glow
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.beginPath();
    ctx.arc(100, 100, 300, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(1100, 530, 250, 0, Math.PI * 2);
    ctx.fill();

    // Brand Watermark
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = 'bold 24px monospace';
    ctx.fillText('INFOBOS MEDIA HUB', 80, 80);

    // Quote Marks
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.font = '200px Georgia, serif';
    ctx.fillText('“', 60, 240);

    // Main Quote Text Wrapping
    ctx.fillStyle = '#ffffff';
    ctx.font = 'italic 40px sans-serif';
    const text = selectedQuote || data?.summary || "Fakta Berita Jawa Barat Terkini";
    const words = text.split(' ');
    let line = '';
    const lines = [];
    const maxWidth = 1000;
    const lineHeight = 55;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        lines.push(line);
        line = words[n] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    let startY = 240;
    const totalHeight = lines.length * lineHeight;
    if (totalHeight < 300) {
      startY = (630 - totalHeight) / 2 + 30;
    }

    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], 100, startY + (i * lineHeight));
    }

    // Article Title footer
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText(`Topik: ${data?.title || 'Berita Jabar'}`, 100, 520);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '20px sans-serif';
    ctx.fillText('Scan QR / Kunjungi infobos.jabar.go.id untuk fakta selengkapnya', 100, 560);

    // Draw mock QR code square in bottom right
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 4;
    ctx.strokeRect(1020, 450, 100, 100);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(1030, 460, 80, 80);
    ctx.fillStyle = '#000000';
    for (let x = 1035; x < 1110; x += 10) {
      for (let y = 465; y < 540; y += 10) {
        if (Math.random() > 0.4) {
          ctx.fillRect(x, y, 7, 7);
        }
      }
    }

    // Trigger download
    try {
      const link = document.createElement('a');
      link.download = `INFOBOS-Kutipan-${slug}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      showToast("Kartu Kutipan berhasil diunduh!");
      addAnalyticsLog("Mengunduh Kartu Kutipan (Poster Share).");
    } catch (err) {
      console.error(err);
      showToast("Gagal mengunduh gambar.");
    }
  };

  // Reporting Form Modal
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('bias');
  const [reportNotes, setReportNotes] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  // Analytics Logs Panel
  const [analyticsLogs, setAnalyticsLogs] = useState<string[]>([]);
  const [analyticsReadTime, setAnalyticsReadTime] = useState(0);

  // Triggering background readtimer
  useEffect(() => {
    const logInterval = setInterval(() => {
      setAnalyticsReadTime(prev => {
        const next = prev + 1;
        if (next === 5) addAnalyticsLog("Mulai membaca artikel: Fokus terdeteksi.");
        if (next === 15) addAnalyticsLog("Mencapai 25% kedalaman halaman.");
        if (next === 30) addAnalyticsLog("Memutar Media / Memeriksa Infografik.");
        return next;
      });
    }, 1000);
    return () => clearInterval(logInterval);
  }, []);

  const addAnalyticsLog = (msg: string) => {
    const time = new Date().toLocaleTimeString('id-ID');
    setAnalyticsLogs(prev => [`[${time}] ${msg}`, ...prev.slice(0, 5)]);
  };

  // Scroll Tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      const rect = articleRef.current.getBoundingClientRect();
      const elementHeight = rect.height;
      const viewHeight = window.innerHeight;
      const scrolled = window.scrollY - (rect.top + window.scrollY);
      
      const progress = Math.max(0, Math.min(100, (scrolled / (elementHeight - viewHeight)) * 100));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  // Sync bookmark state from localStorage
  useEffect(() => {
    if (data) {
      const key = `read_later_${user?.email || 'default'}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        try {
          const list = JSON.parse(saved);
          const exists = list.some((x: any) => x.slug === slug);
          setBookmarked(exists);
        } catch (e) {
          console.error(e);
        }
      } else {
        setBookmarked(false);
      }
    }
  }, [data, slug, user]);

  // Fetch article detailed view
  useEffect(() => {
    setLoading(true);
    fetch(`/api/v1/contents/${slug}`)
      .then(res => res.json())
      .then(resData => {
        if (resData.content) {
          setData(resData.content);
          setSelectedQuote(resData.content.summary || '');
          addAnalyticsLog(`Memuat artikel slug: "${slug}"`);
        }
        setLoading(false);
        
        // Auto-play TTS if flag is set in sessionStorage
        const autoPlay = sessionStorage.getItem('autoPlayTts');
        if (autoPlay === 'true') {
          sessionStorage.removeItem('autoPlayTts');
          setTimeout(() => {
            playSegment(0);
          }, 800);
        }
      })
      .catch(err => {
        console.error("Gagal memuat detail berita:", err);
        setLoading(false);
      });
  }, [slug]);

  // Fetch inline ad banner
  useEffect(() => {
    fetch('/api/v1/ads/placement?placement=article_inline')
      .then(res => res.json())
      .then(adData => {
        if (adData.creative) {
          setInlineAd(adData.creative);
        }
      });
  }, [slug]);

  // Inject professional News SEO Structured Schema, OpenGraph, Twitter Cards, and Canonical link tags
  useEffect(() => {
    if (!data) return;

    const domain = "https://infobos.com";
    const categorySlug = data.categorySlug || data.categoryName?.toLowerCase().replace(/\s+/g, '-') || 'news';
    const articleUrl = `${domain}/news/${categorySlug}/${slug}`;
    const title = `${data.title} | INFOBOS News`;
    const description = data.summary || '';
    const imageUrl = data.heroImageUrl || 'https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff';

    // 1. Set Document Title
    document.title = title;

    // 2. Helper to set or create meta tag
    const setMetaTag = (propertyOrName: string, content: string, isProperty = true) => {
      const attrName = isProperty ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attrName}="${propertyOrName}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attrName, propertyOrName);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // 3. Helper to set link tag
    const setLinkTag = (rel: string, href: string, prepend = false) => {
      let tag = document.querySelector(`link[rel="${rel}"]`);
      if (tag) {
        tag.remove();
      }
      tag = document.createElement('link');
      tag.setAttribute('rel', rel);
      tag.setAttribute('href', href);
      if (prepend && document.head.firstChild) {
        document.head.insertBefore(tag, document.head.firstChild);
      } else {
        document.head.appendChild(tag);
      }
    };

    // 4. Inject Meta Tags
    setMetaTag('description', description, false);
    setMetaTag('og:title', title);
    setMetaTag('og:description', description);
    setMetaTag('og:image', imageUrl);
    setMetaTag('og:url', articleUrl);
    setMetaTag('og:type', 'article');
    setMetaTag('og:site_name', 'INFOBOS News');
    setMetaTag('article:published_time', data.publishedAt || data.createdAt);
    setMetaTag('article:modified_time', data.updatedAt || data.publishedAt || data.createdAt);
    setMetaTag('article:section', data.categoryName || 'Berita');

    setMetaTag('twitter:card', 'summary_large_image', false);
    setMetaTag('twitter:title', title, false);
    setMetaTag('twitter:description', description, false);
    setMetaTag('twitter:image', imageUrl, false);

    setLinkTag('canonical', articleUrl, false);

    // Prioritize amphtml link tag for mobile search crawlers
    const userAgent = (navigator.userAgent || '').toLowerCase();
    const isMobileDevice = /mobile|android|iphone|ipad|phone/i.test(userAgent);
    const isSearchCrawler = /bot|googlebot|crawler|spider|robot|crawling|slurp|bingbot/i.test(userAgent);
    const isMobileCrawler = isMobileDevice || isSearchCrawler;

    const ampUrl = `${articleUrl}?amp=1`;
    if (isMobileCrawler) {
      console.log(`%c[INFOBOS SEO] Mobile Crawler Detected / Indexing Compliance Mode. Prioritizing amphtml link tag.`, "color: #10b981; font-weight: bold;");
      setLinkTag('amphtml', ampUrl, true);
    } else {
      setLinkTag('amphtml', ampUrl, false);
    }

    // 5. Parse index.html Organization schema dynamically for publisher sameAs & contactPoint fields
    let sameAsFromIndex: string[] = [];
    let contactPointFromIndex: any = null;

    try {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      for (const s of Array.from(scripts)) {
        if (s.id === 'seo-jsonld-schema') continue;
        try {
          const parsed = JSON.parse(s.textContent || '');
          const graphList = parsed['@graph'] || (Array.isArray(parsed) ? parsed : [parsed]);
          const org = graphList.find((item: any) => 
            item['@type'] === 'NewsMediaOrganization' || item['@type'] === 'Organization'
          );
          if (org) {
            if (org.sameAs) {
              sameAsFromIndex = Array.isArray(org.sameAs) ? org.sameAs : [org.sameAs];
            }
            if (org.contactPoint) {
              contactPointFromIndex = org.contactPoint;
            }
          }
        } catch (e) {
          // ignore parsing failures
        }
      }
    } catch (err) {
      console.error("Failed to parse organization schema from index.html", err);
    }

    const authorName = data.authorName || 'Budi Santoso';
    const categoryName = data.categoryName || 'Berita';

    const graph: any[] = [
      {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "@id": `${articleUrl}#article`,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": articleUrl
        },
        "headline": data.title,
        "description": description,
        "image": {
          "@type": "ImageObject",
          "url": imageUrl,
          "width": 1200,
          "height": 630
        },
        "datePublished": data.publishedAt || data.createdAt,
        "dateModified": data.updatedAt || data.publishedAt || data.createdAt,
        "author": {
          "@type": "Person",
          "name": authorName,
          "jobTitle": "Reporter Jurnalistik",
          "sameAs": "https://infobos.com/editorial-team"
        },
        "publisher": {
          "@type": "NewsMediaOrganization",
          "name": "INFOBOS",
          "url": domain,
          "logo": {
            "@type": "ImageObject",
            "url": "https://infobos.com/assets/logo.png"
          },
          "publishingPrinciples": "https://infobos.com/editorial-policy",
          "correctionsPolicy": "https://infobos.com/correction",
          "sameAs": sameAsFromIndex.length > 0 ? sameAsFromIndex : [
            "https://instagram.com/infobos",
            "https://twitter.com/infobos",
            "https://facebook.com/infobos",
            "https://t.me/infobos"
          ],
          "contactPoint": contactPointFromIndex || {
            "@type": "ContactPoint",
            "telephone": "+62-22-1234567",
            "contactType": "customer service",
            "areaServed": "ID",
            "availableLanguage": "Indonesian"
          }
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "NewsMediaOrganization",
        "@id": `${domain}/#organization`,
        "name": "INFOBOS",
        "url": domain,
        "logo": "https://infobos.com/assets/logo.png",
        "publishingPrinciples": "https://infobos.com/editorial-policy",
        "correctionsPolicy": "https://infobos.com/correction"
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${domain}/#website`,
        "name": "INFOBOS",
        "url": domain
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Beranda",
            "item": domain
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": categoryName,
            "item": `${domain}/news/category/${categorySlug}`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": data.title,
            "item": articleUrl
          }
        ]
      }
    ];

    if (slug === 'live-feed' || data.contentType === 'live-feed') {
      graph.push({
        "@context": "https://schema.org",
        "@type": "LiveBlogPosting",
        "@id": `${articleUrl}#liveblog`,
        "headline": `LIVE: ${data.title}`,
        "description": description,
        "coverageStartTime": data.createdAt,
        "coverageEndTime": new Date().toISOString(),
        "liveBlogUpdate": [
          {
            "@type": "BlogPosting",
            "headline": "Pembaruan Terkini Liputan Langsung",
            "datePublished": new Date().toISOString(),
            "articleBody": "Laporan langsung pemantauan tim redaksi di lapangan."
          }
        ]
      });
    }

    if (data.contentType === 'video-hub' || slug.includes('video')) {
      graph.push({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": data.title,
        "description": description,
        "thumbnailUrl": imageUrl,
        "uploadDate": data.publishedAt || data.createdAt,
        "contentUrl": `${domain}/video-hub`,
        "embedUrl": `${domain}/video-hub`
      });
    }

    const scriptId = 'seo-jsonld-schema';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": graph
    }, null, 2);

    // Hidden SEO validation utility
    try {
      const newsArticleObj = graph.find(item => item["@type"] === "NewsArticle");
      if (newsArticleObj) {
        const requiredFields = ["headline", "image", "datePublished", "dateModified", "author", "publisher"];
        const missingFields = requiredFields.filter(field => !newsArticleObj[field]);
        
        console.log(
          `%c[INFOBOS SEO Validator] Checking NewsArticle JSON-LD Schema for slug: "${slug}"...`,
          "color: #FFD700; font-weight: bold; background: #001f42; padding: 2px 4px; border-radius: 3px;"
        );
        if (missingFields.length === 0) {
          console.log("%c[INFOBOS SEO Validator] PASS: All required NewsArticle fields are verified and correct.", "color: #2e7d32; font-weight: bold;");
        } else {
          console.warn(`%c[INFOBOS SEO Validator] WARNING: Missing fields in NewsArticle schema: ${missingFields.join(", ")}`, "color: #c62828; font-weight: bold;");
        }
      } else {
        console.warn("%c[INFOBOS SEO Validator] ERROR: NewsArticle schema object was not found in the generated JSON-LD graph!", "color: #c62828; font-weight: bold;");
      }
    } catch (e) {
      console.error("[INFOBOS SEO Validator] Unexpected validation error:", e);
    }

    // Hidden developer utility function to validate JSON-LD via Google Rich Results API
    (window as any).triggerRichResultsTest = async (apiKey?: string) => {
      console.log("%c[INFOBOS Developer Tools] Preparing JSON-LD payload...", "color: #a855f7; font-weight: bold;");
      
      const currentJsonLd = {
        "@context": "https://schema.org",
        "@graph": graph
      };

      const htmlPayload = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${data.title}</title>
  <script type="application/ld+json">
    ${JSON.stringify(currentJsonLd, null, 2)}
  </script>
</head>
<body></body>
</html>`;

      const requestBody = {
        url: articleUrl,
        sourceCode: htmlPayload
      };

      const keyToUse = apiKey || ((import.meta as any).env?.VITE_GOOGLE_API_KEY as string) || "";
      const urlWithKey = keyToUse 
        ? `https://searchconsole.googleapis.com/v1/urlTestingTools/richResults:test?key=${keyToUse}`
        : `https://searchconsole.googleapis.com/v1/urlTestingTools/richResults:test`;

      console.log(`%c[INFOBOS Developer Tools] Submitting to Google Rich Results Test API...`, "color: #a855f7; font-weight: bold;");
      console.log("Endpoint:", urlWithKey);
      console.log("Payload:", requestBody);

      try {
        const response = await fetch(urlWithKey, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestBody)
        });

        const result = await response.json();
        console.log("%c[INFOBOS Developer Tools] Google Rich Results Test API Result:", "color: #10b981; font-weight: bold;");
        console.log(result);
        
        if (result.error) {
          console.error("%c[INFOBOS Developer Tools] Google Rich Results Test API returned an error:", "color: #ef4444;", result.error);
        } else {
          console.log("%c[INFOBOS Developer Tools] Validation Completed successfully! Check output above.", "color: #10b981; font-weight: bold;");
        }
        return result;
      } catch (err) {
        console.error("%c[INFOBOS Developer Tools] Fetch to Google Rich Results Test API failed:", "color: #ef4444;", err);
        throw err;
      }
    };

    return () => {
      // Cleanup dynamically added head tags
      const tagsToRemove = [
        'meta[property="og:title"]',
        'meta[property="og:description"]',
        'meta[property="og:image"]',
        'meta[property="og:url"]',
        'meta[property="og:type"]',
        'meta[property="og:site_name"]',
        'meta[property="article:published_time"]',
        'meta[property="article:modified_time"]',
        'meta[property="article:section"]',
        'meta[name="twitter:card"]',
        'meta[name="twitter:title"]',
        'meta[name="twitter:description"]',
        'meta[name="twitter:image"]',
        'link[rel="canonical"]',
        'link[rel="amphtml"]'
      ];
      tagsToRemove.forEach(selector => {
        const el = document.querySelector(selector);
        if (el) el.remove();
      });

      if (scriptTag) scriptTag.remove();
      delete (window as any).triggerRichResultsTest;
    };
  }, [data, slug]);

  const handleToggleBookmark = () => {
    if (!user) {
      setBookmarkError("Silakan masuk akun terlebih dahulu untuk menyimpan berita.");
      setTimeout(() => setBookmarkError(null), 5000);
      return;
    }

    setBookmarkError(null);
    const key = `read_later_${user.email || 'default'}`;
    const saved = localStorage.getItem(key);
    let list: any[] = [];
    if (saved) {
      try {
        list = JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }

    const exists = list.some((x: any) => x.slug === slug);
    let updated: any[] = [];
    if (exists) {
      updated = list.filter((x: any) => x.slug !== slug);
      setBookmarked(false);
      addAnalyticsLog("Menghapus artikel dari Penanda Baca.");
    } else {
      const newBookmark = {
        id: data?.id || String(Date.now()),
        title: data?.title || 'Artikel Tanpa Judul',
        slug: slug,
        date: new Date(data?.publishedAt || Date.now()).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
        categoryName: data?.categoryName || 'UMUM'
      };
      updated = [newBookmark, ...list];
      setBookmarked(true);
      addAnalyticsLog("Menyimpan artikel ke Penanda Baca.");
    }
    localStorage.setItem(key, JSON.stringify(updated));
  };

  // Retrieve custom fact check registry data or fallback
  const currentFactCheckData = data ? (FACT_CHECK_REGISTRY[slug] || {
    confidenceScore: 88,
    summary: `Analisis AI menyimpulkan bahwa laporan "${data.title}" memiliki basis data rujukan yang memadai. Terdapat 2 klaim utama terverifikasi secara resmi, dengan catatan tambahan pada transparansi metodologi publikasi.`,
    claims: [
      {
        text: `Isi laporan mengenai topik utama bersumber dari rilis media terakreditasi Dewan Pers.`,
        highlightText: (data.body && data.body.length > 40) ? data.body.substring(0, 40).replace(/[#*`]+/g, '').trim() : data.title.substring(0, 25),
        status: 'verified',
        statusText: 'TERVERIFIKASI',
        explanation: 'Metode penulisan jurnalistik pada artikel ini mengacu pada rujukan primer dan laporan berkala yang sah dari institusi pemerintah terkait.',
        source: 'Dewan Pers & Pusat Data Nasional'
      },
      {
        text: 'Pernyataan mengenai efektivitas operasional atau realisasi anggaran jangka pendek.',
        highlightText: (data.body && data.body.indexOf('Redaksi') !== -1) ? 'Redaksi' : 'Pemerintah',
        status: 'partially_true',
        statusText: 'SEBAGIAN BENAR',
        explanation: 'Meskipun visi kebijakan jangka panjang sangat solid, realisasi teknis masih bergantung pada alokasi termin anggaran triwulanan.',
        source: 'Laporan Kajian Kebijakan Publik Jabar'
      }
    ],
    sources: ["Pusat Data Nasional", "Portal Satu Data Jawa Barat", "Arsip Berita Terintegrasi Jabar"]
  }) : null;

  const handleRunFactCheck = () => {
    if (factCheckScanning) return;
    setFactCheckActive(true);
    setFactCheckScanning(true);
    setFactCheckScanProgress(5);
    setFactCheckScanMessage("Membaca seluruh naskah berita...");
    setSelectedClaim(null);

    const steps = [
      { progress: 20, message: "Mengekstrak klaim kuantitatif kunci..." },
      { progress: 45, message: "Mencocokkan klaim dengan Bank Data Pemprov & BPS..." },
      { progress: 75, message: "Menganalisis bias kalimat & silang data pers..." },
      { progress: 90, message: "Menghitung Skor Kepercayaan (Confidence Score)..." },
      { progress: 100, message: "Pemeriksaan Selesai! 100% tervalidasi." }
    ];

    steps.forEach((step, i) => {
      setTimeout(() => {
        setFactCheckScanProgress(step.progress);
        setFactCheckScanMessage(step.message);
        if (step.progress === 100) {
          setFactCheckScanning(false);
          setFactCheckHighlightsActive(true);
          setUserReputation(prev => prev + 15);
          showToast("AI Fact-Check Selesai! Poin reputasi Anda meningkat (+15 pts).");
          addAnalyticsLog(`Pemeriksaan Fakta AI selesai untuk slug "${slug}".`);
        }
      }, (i + 1) * 600);
    });
  };

  const renderParagraphWithHighlights = (paragraphText: string, idx: number, isDropcap: boolean) => {
    if (!factCheckHighlightsActive || !currentFactCheckData) {
      if (isDropcap) {
        const firstChar = paragraphText.charAt(0);
        const restText = paragraphText.substring(1);
        return (
          <p className="whitespace-pre-wrap leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:float-left first-letter:mr-2.5 first-letter:text-[#002B5B]">
            {firstChar}{restText}
          </p>
        );
      }
      return <p className="whitespace-pre-wrap leading-relaxed">{paragraphText}</p>;
    }

    const activeClaims = currentFactCheckData.claims || [];
    let elements: React.ReactNode[] = [];
    let lastIndex = 0;

    const matches: Array<{ start: number; end: number; claim: any }> = [];

    activeClaims.forEach(claim => {
      if (!claim.highlightText) return;
      let pos = paragraphText.indexOf(claim.highlightText);
      while (pos !== -1) {
        matches.push({
          start: pos,
          end: pos + claim.highlightText.length,
          claim
        });
        pos = paragraphText.indexOf(claim.highlightText, pos + claim.highlightText.length);
      }
    });

    matches.sort((a, b) => a.start - b.start);

    const nonOverlappingMatches: typeof matches = [];
    let currentEnd = 0;
    matches.forEach(match => {
      if (match.start >= currentEnd) {
        nonOverlappingMatches.push(match);
        currentEnd = match.end;
      }
    });

    if (nonOverlappingMatches.length === 0) {
      if (isDropcap) {
        const firstChar = paragraphText.charAt(0);
        const restText = paragraphText.substring(1);
        return (
          <p className="whitespace-pre-wrap leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:float-left first-letter:mr-2.5 first-letter:text-[#002B5B]">
            {firstChar}{restText}
          </p>
        );
      }
      return <p className="whitespace-pre-wrap leading-relaxed">{paragraphText}</p>;
    }

    nonOverlappingMatches.forEach((match, mIdx) => {
      if (match.start > lastIndex) {
        elements.push(paragraphText.substring(lastIndex, match.start));
      }

      let bgClass = "bg-amber-500/25 hover:bg-amber-500/40 border-b-2 border-amber-500 text-slate-950 dark:text-amber-200 cursor-pointer transition-all";
      if (match.claim.status === 'verified') {
        bgClass = "bg-emerald-500/25 hover:bg-emerald-500/40 border-b-2 border-emerald-500 text-slate-950 dark:text-emerald-200 cursor-pointer transition-all";
      } else if (match.claim.status === 'misleading') {
        bgClass = "bg-rose-500/25 hover:bg-rose-500/40 border-b-2 border-rose-500 text-slate-950 dark:text-rose-200 cursor-pointer transition-all font-semibold";
      }

      elements.push(
        <span
          key={`highlight-${mIdx}`}
          className={`${bgClass} px-1 rounded-sm relative group`}
          onClick={() => {
            setSelectedClaim(match.claim);
            setIsAiAssistantOpen(true);
            const factCheckEl = document.getElementById("ai-fact-checker-panel");
            if (factCheckEl) {
              factCheckEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }}
          title={`Cek Fakta AI: ${match.claim.statusText}`}
        >
          {paragraphText.substring(match.start, match.end)}
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1.5 hidden group-hover:block bg-slate-950 text-white text-[9px] font-mono px-2 py-1 rounded-md shadow-xl border border-slate-800 z-30 whitespace-nowrap">
            Cek Fakta: <strong className="uppercase">{match.claim.statusText}</strong> (Klik detail)
          </span>
        </span>
      );

      lastIndex = match.end;
    });

    if (lastIndex < paragraphText.length) {
      elements.push(paragraphText.substring(lastIndex));
    }

    if (isDropcap) {
      const firstElem = elements[0];
      if (typeof firstElem === 'string' && firstElem.length > 0) {
        const firstChar = firstElem.charAt(0);
        const restText = firstElem.substring(1);
        elements[0] = restText;
        return (
          <p className="whitespace-pre-wrap leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:float-left first-letter:mr-2.5 first-letter:text-[#002B5B]">
            {firstChar}{elements}
          </p>
        );
      }
    }

    return <p className="whitespace-pre-wrap leading-relaxed">{elements}</p>;
  };

  // Translation trigger using our server-side API or quick local fallback
  const handleTranslate = async (lang: 'ID' | 'EN' | 'JV' | 'SD') => {
    if (!data) return;
    setIsTranslating(true);
    addAnalyticsLog(`Memproses penerjemahan artikel ke: ${lang}`);

    if (lang === 'ID') {
      setActiveLanguage('ID');
      setIsTranslating(false);
      addAnalyticsLog(`Artikel ditampilkan kembali dalam Bahasa Indonesia.`);
      return;
    }

    // Check cache
    if (translatedArticle[lang]) {
      setActiveLanguage(lang);
      setIsTranslating(false);
      addAnalyticsLog(`Mengambil terjemahan ${lang} dari cache lokal.`);
      return;
    }

    try {
      const payload = [
        data.title,
        data.subtitle || '',
        data.summary || '',
        ...(data.body ? data.body.split('\n\n') : [])
      ];

      const res = await fetch('/api/v1/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paragraphs: payload,
          targetLanguage: lang
        })
      });
      const result = await res.json();
      if (result.success && Array.isArray(result.translatedParagraphs)) {
        const transParas = result.translatedParagraphs;
        setTranslatedArticle(prev => ({
          ...prev,
          [lang]: {
            title: transParas[0] || data.title,
            subtitle: transParas[1] || data.subtitle || '',
            summary: transParas[2] || data.summary || '',
            body: transParas.slice(3)
          }
        }));
        setActiveLanguage(lang);
        addAnalyticsLog(`Terjemahan ${lang} berhasil dimuat via ${result.source || 'sistem'}.`);
      } else {
        throw new Error(result.error || "Gagal menerjemahkan");
      }
    } catch (err: any) {
      console.error("Translation error:", err);
      addAnalyticsLog(`Gagal menerjemahkan secara dinamis: ${err.message || 'Error koneksi'}. Menggunakan cadangan lokal.`);
      
      // Fallback using static TRANSLATIONS dictionary if applicable
      const staticTitle = TRANSLATIONS.title[lang] || data.title;
      const staticSubtitle = TRANSLATIONS.subtitle[lang] || data.subtitle || '';
      const staticSummary = TRANSLATIONS.summary[lang] || data.summary || '';
      const fallbackBody = (data.body ? data.body.split('\n\n') : []).map(p => {
        if (lang === 'EN') return p + ' [Translated to EN]';
        if (lang === 'JV') return p + ' (Materi diterjemahake ing basa Jawi)';
        return p + ' (Materi diterjemahkeun dina basa Sunda)';
      });

      setTranslatedArticle(prev => ({
        ...prev,
        [lang]: {
          title: staticTitle,
          subtitle: staticSubtitle,
          summary: staticSummary,
          body: fallbackBody
        }
      }));
      setActiveLanguage(lang);
    } finally {
      setIsTranslating(false);
    }
  };

  // Retrieve dynamic segments to read based on current language & content
  const getArticleSegments = (): string[] => {
    if (!data) return [];
    const titleText = translatedArticle[activeLanguage]?.title || TRANSLATIONS.title[activeLanguage] || data.title || '';
    const subtitleText = translatedArticle[activeLanguage]?.subtitle || TRANSLATIONS.subtitle[activeLanguage] || data.subtitle || '';
    const summaryText = translatedArticle[activeLanguage]?.summary || TRANSLATIONS.summary[activeLanguage] || data.summary || '';
    
    const paragraphsToUse = translatedArticle[activeLanguage]?.body || (data.body ? data.body.split('\n\n') : []);

    const cleanedParagraphs = paragraphsToUse
      .map((p: string) => p.replace(/^[#>\s-]+/g, '').trim())
      .filter((p: string) => p.length > 0);

    return [
      `Menyajikan artikel INFOBOS. Judul utama: ${titleText}`,
      `Subjudul: ${subtitleText}`,
      `Ringkasan pokok: ${summaryText}`,
      ...cleanedParagraphs
    ];
  };

  // Speak a single segment
  const playSegment = (index: number) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const segments = getArticleSegments();

    if (index < 0 || index >= segments.length) {
      setTtsPlaying(false);
      setTtsPaused(false);
      setTtsCurrentIndex(-1);
      addAnalyticsLog("Selesai membacakan seluruh naskah berita.");
      return;
    }

    setTtsCurrentIndex(index);
    setTtsPlaying(true);
    setTtsPaused(false);

    const textToSpeak = segments[index];
    const u = new SpeechSynthesisUtterance(textToSpeak);

    // Bind selected voice
    if (selectedVoiceName) {
      const voice = availableVoices.find(v => v.name === selectedVoiceName);
      if (voice) {
        u.voice = voice;
      }
    } else {
      // Automatic language based defaults
      const isEn = activeLanguage === 'EN';
      const voice = availableVoices.find(v => v.lang.toLowerCase().includes(isEn ? 'en' : 'id'));
      if (voice) u.voice = voice;
    }

    u.rate = ttsSpeed;
    u.pitch = 1.0;

    u.onend = () => {
      // Advance to next segment
      playSegment(index + 1);
    };

    u.onerror = (e) => {
      console.warn("SpeechSynthesis error:", e);
      if (e.error !== 'interrupted') {
        setTtsPlaying(false);
        setTtsPaused(false);
        setTtsCurrentIndex(-1);
      }
    };

    currentUtteranceRef.current = u;
    window.speechSynthesis.speak(u);
    addAnalyticsLog(`Voice Reader: Membaca bagian ${index + 1} dari ${segments.length}.`);
  };

  const handleToggleTTS = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      alert("Browser Anda tidak mendukung fitur pembacaan suara (Speech Synthesis).");
      return;
    }

    if (ttsPlaying) {
      // If playing or paused, stop it completely
      window.speechSynthesis.cancel();
      setTtsPlaying(false);
      setTtsPaused(false);
      setTtsCurrentIndex(-1);
      addAnalyticsLog("Voice Reader: Pembacaan suara dihentikan.");
    } else {
      // Start from the beginning or resume
      playSegment(0);
    }
  };

  const handlePauseTTS = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    if (ttsPlaying && !ttsPaused) {
      window.speechSynthesis.pause();
      setTtsPaused(true);
      addAnalyticsLog("Voice Reader: Pembacaan suara dijeda.");
    }
  };

  const handleResumeTTS = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    if (ttsPlaying && ttsPaused) {
      window.speechSynthesis.resume();
      setTtsPaused(false);
      addAnalyticsLog("Voice Reader: Melanjutkan pembacaan suara.");
    }
  };

  const handleTtsSpeedChange = (newSpeed: number) => {
    setTtsSpeed(newSpeed);
    addAnalyticsLog(`Voice Reader: Mengubah kecepatan pembacaan ke ${newSpeed}x.`);
  };

  // Re-run segment if speed or voice changes while speaking
  useEffect(() => {
    if (ttsPlaying && !ttsPaused && ttsCurrentIndex !== -1) {
      playSegment(ttsCurrentIndex);
    }
  }, [ttsSpeed, selectedVoiceName]);

  // Ask AI Simulation Chat trigger
  const handleSendAiMessage = () => {
    if (!aiChatQuery.trim()) return;
    const userMsg = aiChatQuery;
    addAnalyticsLog("Mengirim pertanyaan ke AI Redaksi.");
    setAiChatHistory(prev => [...prev, { sender: 'user', text: userMsg }]);
    setAiChatQuery('');

    // Prepopulate some smart responses based on keywords
    let responseText = "Terima kasih atas pertanyaannya. Berdasarkan investigasi tim redaksi INFOBOS, regulasi fiskal yang dipetakan dalam riset ini merujuk kepada APBD Provinsi dan diawasi ketat oleh otoritas hukum independen untuk menjaga keberlangsungan pertumbuhan ekonomi lokal.";
    if (userMsg.toLowerCase().includes('anggaran') || userMsg.toLowerCase().includes('dana')) {
      responseText = "Mengenai anggaran, rincian anggaran yang tercantum melibatkan dana strategis sebesar Rp 12.4 Miliar untuk Braga Heritage dan total alokasi regional Jawa Barat berkisar Rp 45.2 Miliar yang direalisasikan secara berkala.";
    } else if (userMsg.toLowerCase().includes('siapa') || userMsg.toLowerCase().includes('penulis') || userMsg.toLowerCase().includes('editor')) {
      responseText = `Artikel ditulis oleh jurnalis senior ${data?.authorName || 'Redaksi'} dan telah melewati verifikasi ketat oleh editor utama ${data?.editorName || 'Ahmad Dahlan'} untuk menjaga kepatuhan etika jurnalisme Dewan Pers.`;
    } else if (userMsg.toLowerCase().includes('lokasi') || userMsg.toLowerCase().includes('peta')) {
      responseText = "Fokus lokasi dalam laporan berita siber ini mencakup Kota Bandung, terutama sentra bersejarah, yang dipetakan secara real-time pada modul GIS GeoOS.";
    }

    // Thinking simulation
    setAiChatHistory(prev => [...prev, { sender: 'ai', text: 'Menganalisis artikel dan data legal...', thinking: true }]);

    setTimeout(() => {
      setAiChatHistory(prev => {
        const withoutThinking = prev.filter(x => !x.thinking);
        return [...withoutThinking, { sender: 'ai', text: responseText }];
      });
      addAnalyticsLog("Menerima jawaban analisis dari AI.");
    }, 1500);
  };

  // Voting Poll
  const handleVotePoll = (option: 'yes' | 'no' | 'neutral') => {
    if (hasVotedPoll) return;
    setPollVotes(prev => ({
      ...prev,
      [option]: prev[option] + 1
    }));
    setHasVotedPoll(true);
    addAnalyticsLog(`Mengisi jejak pendapat jajak opini: "${option.toUpperCase()}"`);
  };

  const handleSimulateLiveUpdate = () => {
    if (refreshingLive) return;
    setRefreshingLive(true);
    
    setTimeout(() => {
      let newUpdate = {
        time: "19:45 WIB",
        title: "Pembaruan Situasi Terkini Lapangan",
        body: "Petugas gabungan Satpol PP dan Dinas Perhubungan mulai melakukan sterilisasi area jalur utama guna memastikan kenyamanan pejalan kaki."
      };
      
      const titleLower = (data?.title || "").toLowerCase();
      if (titleLower.includes('festival') || titleLower.includes('heritage') || titleLower.includes('asia afrika')) {
        const nextUpdates = [
          {
            time: "18:00 WIB",
            title: "Pementasan Angklung Kolosal Nusantara",
            body: "Lebih dari 500 seniman muda dari berbagai komunitas lokal memainkan lagu-lagu daerah Jawa Barat secara serempak di pelataran Gedung Merdeka."
          },
          {
            time: "18:15 WIB",
            title: "Penyalaan Lampu Klasik Koridor Baru",
            body: "Walikota Bandung secara resmi menekan saklar utama, menyalakan jajaran lampu heritage bernuansa kolonial Eropa yang menambah keindahan malam kota Bandung."
          }
        ];
        const nextIndex = extraLiveUpdates.length;
        if (nextIndex < nextUpdates.length) {
          newUpdate = nextUpdates[nextIndex];
        } else {
          newUpdate = {
            time: "18:30 WIB",
            title: "Laporan Malam Penutupan Festival",
            body: "Meskipun acara resmi telah usai, antusiasme warga untuk berfoto di spot koridor pedestrian baru tetap tinggi. Redaksi mengakhiri liputan langsung malam ini. Terima kasih."
          };
        }
      } else if (titleLower.includes('inflasi') || titleLower.includes('pangan') || titleLower.includes('beras')) {
        const nextUpdates = [
          {
            time: "11:00 WIB",
            title: "Distribusi Perdana Beras SPHP Bulog",
            body: "Sebanyak 10 truk logistik pengangkut komoditas beras murah bersubsidi mulai diberangkatkan menuju masing-masing kelurahan sasaran di kota Bandung."
          },
          {
            time: "11:15 WIB",
            title: "Tanggapan Positif Asosiasi Pedagang Pasar",
            body: "Ketua APPSI Jabar menyatakan subsidi transportasi bahan pangan dari Pemprov Jabar sangat membantu menekan harga jual akhir di tangan konsumen."
          }
        ];
        const nextIndex = extraLiveUpdates.length;
        if (nextIndex < nextUpdates.length) {
          newUpdate = nextUpdates[nextIndex];
        } else {
          newUpdate = {
            time: "11:30 WIB",
            title: "Sesi Konferensi Pers Resmi Selesai",
            body: "Gubernur beserta rombongan bertolak meninggalkan aula Gedung Sate untuk memantau langsung operasi pasar perdana di wilayah Kiaracondong."
          };
        }
      } else if (titleLower.includes('derby') || titleLower.includes('bandung united') || titleLower.includes('persib')) {
        const nextUpdates = [
          {
            time: "Menit ke-60",
            title: "Pergantian Pemain Taktis Persib Junior",
            body: "Pelatih kepala Persib Junior memasukkan penyerang sayap lincah bernomor punggung 17 untuk memanfaatkan kelelahan lini pertahanan lawan."
          },
          {
            time: "Menit ke-78",
            title: "PENALTI UNTUK PERSIB JUNIOR!!!",
            body: "Wasit menunjuk titik putih setelah bek tengah Bandung United melakukan pelanggaran handsball di dalam kotak penalti saat menghalau bola lambung."
          }
        ];
        const nextIndex = extraLiveUpdates.length;
        if (nextIndex < nextUpdates.length) {
          newUpdate = nextUpdates[nextIndex];
        } else {
          newUpdate = {
            time: "Menit ke-90+3",
            title: "Peluit Akhir Dibunyikan!",
            body: "Wasit meniup peluit panjang tanda berakhirnya pertandingan derby sengit. Skor akhir di papan skor terkunci pada kemenangan tipis 2-1 untuk kubu tamu."
          };
        }
      } else if (titleLower.includes('smart city') || titleLower.includes('digital') || titleLower.includes('layanan')) {
        const nextUpdates = [
          {
            time: "15:00 WIB",
            title: "Sesi Tanya Jawab Keamanan Siber",
            body: "Wartawan menanyakan ketahanan server terhadap serangan DDoS. Kadiskominfo menjawab bahwa infrastruktur baru didukung enkripsi berlapis dan cloud security."
          },
          {
            time: "15:30 WIB",
            title: "Pelepasan Simbolis Motor Reaksi Cepat",
            body: "Walikota melakukan pengibaran bendera start tanda diresmikannya armada patroli tanggap darurat digital yang dilengkapi perangkat integrasi mobile."
          }
        ];
        const nextIndex = extraLiveUpdates.length;
        if (nextIndex < nextUpdates.length) {
          newUpdate = nextUpdates[nextIndex];
        } else {
          newUpdate = {
            time: "16:00 WIB",
            title: "Acara Peresmian Ditutup",
            body: "Seluruh rangkaian acara seremonial selesai. Sentra layanan resmi beroperasi penuh mulai sore ini untuk melayani warga Bandung Raya 24 jam."
          };
        }
      } else if (titleLower.includes('lalu lintas') || titleLower.includes('lembang') || titleLower.includes('pasteur')) {
        const nextUpdates = [
          {
            time: "20:00 WIB",
            title: "Kondisi Simpang Ledeng Terkini",
            body: "Arus kendaraan dari Lembang menuju Setiabudi terpantau ramai merayap dengan kecepatan rata-rata kendaraan berkisar antara 10-15 km/jam."
          },
          {
            time: "20:30 WIB",
            title: "Normalisasi Jalur Dua Arah",
            body: "Satlantas Polrestabes menghentikan rekayasa satu arah (one-way) seiring dengan berkurangnya volume kendaraan dari arah atas. Arus kembali normal dua arah."
          }
        ];
        const nextIndex = extraLiveUpdates.length;
        if (nextIndex < nextUpdates.length) {
          newUpdate = nextUpdates[nextIndex];
        } else {
          newUpdate = {
            time: "21:00 WIB",
            title: "Arus Gerbang Tol Pasteur Berangsur Lancar",
            body: "Antrean loket pembayaran tol Pasteur terpantau lancar tanpa penumpukan signifikan. Cuaca gerimis tipis menyelimuti kota Bandung."
          };
        }
      }

      setExtraLiveUpdates(prev => [...prev, newUpdate]);
      setRefreshingLive(false);
      addAnalyticsLog("Simulasi pembaruan live report berhasil ditambahkan.");
    }, 1200);
  };

  // Table Sorting & Filtering
  const handleSortTable = () => {
    const nextSort = !tableSortAsc;
    setTableSortAsc(nextSort);
    const sorted = [...FISCAL_TABLE_DATA].sort((a, b) => {
      return nextSort ? a.id - b.id : b.id - a.id;
    });
    setSortedTableData(sorted);
    addAnalyticsLog("Mengurutkan tabel data anggaran.");
  };

  // Submit Comments
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const mockNewComment = {
      id: `comment-${Date.now()}`,
      author: user?.fullName || 'Pembaca Anonim',
      role: user ? `${user.role.replace('_', ' ').toUpperCase()}` : 'Pembaca Terverifikasi',
      avatar: (user?.fullName || 'PA').substring(0, 2).toUpperCase(),
      body: newCommentText,
      likes: 0,
      reactions: { helpful: 0, insightful: 0 },
      timestamp: 'Baru saja',
      replies: []
    };

    setCommentsList(prev => [mockNewComment, ...prev]);
    setNewCommentText('');
    addAnalyticsLog("Mengirimkan komentar baru.");
  };

  const handleAddReply = (commentId: string) => {
    if (!replyText.trim()) return;

    setCommentsList(prev => prev.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          replies: [
            ...c.replies,
            {
              id: `reply-${Date.now()}`,
              author: user?.fullName || 'Pembaca Anonim',
              role: user ? `${user.role.toUpperCase()}` : 'Pembaca Terverifikasi',
              body: replyText,
              likes: 0,
              timestamp: 'Baru saja'
            }
          ]
        };
      }
      return c;
    }));

    setReplyText('');
    setReplyTargetId(null);
    addAnalyticsLog("Mengirimkan balasan komentar.");
  };

  const handleReaction = (commentId: string, type: 'helpful' | 'insightful') => {
    setCommentsList(prev => prev.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          reactions: {
            ...c.reactions,
            [type]: (c.reactions[type] || 0) + 1
          }
        };
      }
      return c;
    }));
    addAnalyticsLog(`Memberikan reaksi "${type}" ke komentar.`);
  };

  // Dewan Pers reporting
  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitted(true);
    addAnalyticsLog("Mengirimkan laporan pelanggaran Dewan Pers.");
    setTimeout(() => {
      setShowReportModal(false);
      setReportSubmitted(false);
      setReportNotes('');
    }, 3000);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#2B7A78] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs text-slate-400 font-mono tracking-widest font-bold animate-pulse">
          SYNCHRONIZING SECURE KNOWLEDGE NODE [${slug}]...
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-slate-500">
        <ShieldAlert className="h-14 w-14 text-rose-500 mx-auto mb-4 animate-bounce" />
        <p className="font-semibold text-lg text-slate-200">Kanal Laporan Tidak Ditemukan</p>
        <p className="text-xs text-slate-400 mt-1">Lembaga sensor atau Dewan Pers mungkin telah mengarsipkan rujukan ini.</p>
        <button onClick={onBack} className="mt-6 px-5 py-2.5 bg-slate-900 border border-slate-800 text-white rounded-xl text-xs font-mono font-bold hover:bg-slate-850 transition">
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  // Parse beautiful dates
  const publishDateStr = data.publishedAt 
    ? new Date(data.publishedAt).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : 'Menunggu Rilis';

  const publishTimeStr = data.publishedAt
    ? new Date(data.publishedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
    : '00:00';

  // Smart translation dictionaries simulation (highly detailed mock translation)
  const isBraga = slug === 'revitalisasi-braga' || (data.title && data.title.toLowerCase().includes('braga'));

  const TRANSLATIONS: Record<string, Record<'ID' | 'EN' | 'JV' | 'SD', string>> = {
    title: {
      ID: data.title,
      EN: isBraga 
        ? "IMMERSIVE REPORT: Braga Strategic Revitalization & West Java Regional Fiscal Injections" 
        : data.title + " [EN]",
      JV: isBraga 
        ? "LAPORAN UTAMA: Revitalisasi Braga lan Suntikan Pajak Fiskal Jawa Kulon" 
        : data.title + " (Materi ing basa Jawi)",
      SD: isBraga 
        ? "LAPORAN UTAMA: Revitalisasi Braga sareng Suntikan Pajak Fiskal Jawa Barat" 
        : data.title + " (Materi dina basa Sunda)"
    },
    subtitle: {
      ID: data.subtitle || "Laporan khusus penataan cagar budaya regional dalam melestarikan aset bersejarah.",
      EN: isBraga 
        ? "A comprehensive investigation of regional heritage management in sustaining historic assets." 
        : (data.subtitle || "Laporan khusus penataan cagar budaya regional dalam melestarikan aset bersejarah.") + " [EN]",
      JV: isBraga 
        ? "Panaliten mirunggan babagan pangopenan warisan sejarah kanggo njaga aset kuno." 
        : (data.subtitle || "Laporan khusus penataan cagar budaya regional dalam melestarikan aset bersejarah.") + " (Materi ing basa Jawi)",
      SD: isBraga 
        ? "Panalungtikan husus ngeunaan ngokolakeun warisan sajarah dina ngajaga aset kuna." 
        : (data.subtitle || "Laporan khusus penataan cagar budaya regional dalam melestarikan aset bersejarah.") + " (Materi dina basa Sunda)"
    },
    summary: {
      ID: data.summary || "Mengapa Berita Ini Penting: Penataan tata kota warisan budaya Kota Bandung tidak hanya menyangkut pelestarian sejarah kolonial, tetapi juga menyuntikkan geliat ekonomi pariwisata yang berdampak langsung pada kesejahteraan ribuan pegiat ekonomi kreatif.",
      EN: isBraga 
        ? "Why It Matters: Urban revitalization of Bandung's heritage zone isn't just about colonial preservation; it stimulates regional tourism economy directly benefiting thousands of creative economy workers." 
        : (data.summary || "") + " [EN]",
      JV: isBraga 
        ? "Nopo Perkara Iki Penting: Pangopenan cagar budaya kuto Bandung mboten namung bab sejarah kolonial, nanging ugo ngundhakake pariwisata sing nduwe efek langsung marang ewu buruh kreatif." 
        : (data.summary || "") + " (Materi ing basa Jawi)",
      SD: isBraga 
        ? "Naha Perkara Ieu Penting: Pangokolakeun cagar budaya kota Bandung sanes ngan perkawis sajarah kolonial, tapi ogé ningkatkeun pariwisata anu gaduh pangaruh langsung ka rébuan pagawé kreatif." 
        : (data.summary || "") + " (Materi dina basa Sunda)"
    }
  };

  // Determine Smart Hero Type dynamically based on contentType
  // 'video', 'gallery', 'podcast', 'live', 'infographic', 'standard'
  const heroType = data.contentType || (slug.includes('video') ? 'video' : slug.includes('podcast') ? 'podcast' : slug.includes('heritage') ? 'gallery' : 'standard');

  // Interactive Theme Colors according to state
  const themeClasses = {
    light: 'bg-white text-slate-900 border-slate-200',
    sepia: 'bg-[#FAF6EE] text-[#433422] border-[#EADFC9]',
    dark: 'bg-slate-950 text-slate-100 border-slate-900',
    contrast: 'bg-black text-yellow-400 border-yellow-500'
  }[contrastTheme];

  const outerBgClasses = {
    light: 'bg-slate-100 text-slate-900',
    sepia: 'bg-[#FAF6EE] text-[#433422]',
    dark: 'bg-slate-950 text-slate-100',
    contrast: 'bg-black text-yellow-400'
  }[contrastTheme];

  const cardThemeClasses = {
    light: 'bg-white border-slate-200 text-slate-800 shadow-sm',
    sepia: 'bg-[#FAF3E0] border-[#E0D5C1] text-[#433422] shadow-sm',
    dark: 'bg-slate-900 border-slate-800 text-slate-100',
    contrast: 'bg-black border-yellow-500 text-yellow-400'
  }[contrastTheme];

  const innerBoxThemeClasses = {
    light: 'bg-slate-50 border-slate-200 text-slate-700',
    sepia: 'bg-[#FAF3E0] border-[#E0D5C1] text-[#433422]',
    dark: 'bg-slate-950 border-slate-850/60 text-slate-300',
    contrast: 'bg-black border-yellow-500 text-yellow-400'
  }[contrastTheme];

  const textMutedClasses = {
    light: 'text-slate-500',
    sepia: 'text-[#8D6E63]',
    dark: 'text-slate-400',
    contrast: 'text-yellow-500/80'
  }[contrastTheme];

  const headingClasses = {
    light: 'text-[#002B5B]',
    sepia: 'text-[#433422]',
    dark: 'text-slate-100',
    contrast: 'text-yellow-400'
  }[contrastTheme];

  // Primary body elements list (Smart Content Block implementation)
  const bodyParagraphs = translatedArticle[activeLanguage]?.body || (data.body ? data.body.split('\n\n') : []);

  return (
    <div className={`transition-all duration-300 ${outerBgClasses} py-6 relative`} id="immersive-article-root">
      
      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <div className="max-w-5xl w-full h-full max-h-[80vh] relative">
              <img src={lightboxImage} alt="Expanded Media View" className="w-full h-full object-contain rounded-xl shadow-2xl" />
              <button 
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 bg-slate-900/80 hover:bg-slate-800 text-white p-2.5 rounded-full transition border border-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-white/70 text-xs font-mono tracking-widest mt-4 uppercase">
              Klik di luar gambar untuk menutup galeri lightbox
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dewan Pers reporting modal */}
      <AnimatePresence>
        {showReportModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 text-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative"
            >
              <button 
                onClick={() => setShowReportModal(false)}
                className="absolute right-4 top-4 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="text-base font-black text-white flex items-center gap-2 mb-2 font-mono">
                <ShieldAlert className="text-rose-500 h-5 w-5" />
                ADUAN &amp; KOREKSI DEWAN PERS
              </h3>
              <p className="text-xs text-slate-400 mb-4 font-sans leading-relaxed">
                Formulir resmi ini ditujukan bagi pembaca untuk menyalurkan hak koreksi, aduan bias informasi, atau pelanggaran Kode Etik Jurnalistik Dewan Pers.
              </p>

              {reportSubmitted ? (
                <div className="py-8 text-center space-y-3 bg-emerald-950/40 rounded-xl border border-emerald-800/40 p-4">
                  <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto animate-bounce" />
                  <p className="text-xs font-mono font-bold text-emerald-400">Aduan Terkirim &amp; Hashed.</p>
                  <p className="text-[10px] text-slate-400">Laporan Anda telah dicatat secara permanen di audit trail siber.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReport} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono font-black uppercase text-slate-400 mb-1.5">Kategori Pelanggaran</label>
                    <select 
                      value={reportReason} 
                      onChange={e => setReportReason(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs font-mono text-white focus:border-rose-500"
                    >
                      <option value="bias">Informasi Berbias / Tidak Berimbang</option>
                      <option value="fakta">Ketidakakuratan Fakta / Hoax</option>
                      <option value="etika">Pelanggaran Hak Privasi / Kode Etik</option>
                      <option value="perbaikan">Permohonan Hak Jawab &amp; Koreksi Redaksional</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-black uppercase text-slate-400 mb-1.5">Ulasan Kronologi &amp; Rujukan Bukti</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="Tulis alasan koreksi yang didukung bukti valid..."
                      value={reportNotes}
                      onChange={e => setReportNotes(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:border-rose-500 font-sans"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-rose-600 hover:bg-rose-500 text-white font-mono font-black text-xs py-3 rounded-xl transition shadow-md"
                  >
                    Kirim Aduan Resmi (Dewan Pers Compliance)
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Global Alert Notification Banner */}
        {bookmarkError && (
          <div className="mb-4 p-3 bg-rose-900/90 border border-rose-500/20 text-white rounded-xl text-xs font-mono font-bold flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <span>{bookmarkError}</span>
            </div>
            <button onClick={() => setBookmarkError(null)} className="text-white hover:text-slate-200 font-bold px-2 py-1">✕</button>
          </div>
        )}

        {/* Back and Bookmark Action Row */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800/10">
          <button 
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-mono font-black text-slate-400 hover:text-teal-500 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">[KEMBALI KE PORTAL BERANDA]</span>
            <span className="inline sm:hidden">[KEMBALI]</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-black tracking-widest animate-pulse">
              ● DEWAN_PERS_SECURE
            </span>
          </div>
        </div>

        {/* ==========================================
            1. SMART HERO SECTION (ADAPTIVE INTERACTIVE MEDIA)
            ========================================== */}
        <div className="mb-6 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900 relative">
          
          {/* A. VIDEO HERO */}
          {heroType === 'video' && (
            <div className="relative aspect-video w-full bg-black flex flex-col justify-end">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent z-10 pointer-events-none" />
              <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format" alt="Video Hero Backdrop" className="absolute inset-0 w-full h-full object-cover opacity-30" referrerPolicy="no-referrer" />
              
              <div className="relative z-20 p-6 md:p-10 space-y-4 max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="bg-red-600 text-white text-[9px] font-mono font-black px-2 py-0.5 rounded uppercase tracking-wider animate-pulse flex items-center gap-1">
                    <Play className="h-2.5 w-2.5 fill-current" /> LIVE VIDEO
                  </span>
                  <span className="text-white/60 text-xs font-mono">1080p 60fps • Subtitle Tersedia</span>
                </div>
                <h2 className="text-xl md:text-3xl font-black text-white leading-tight font-sans tracking-tight">
                  Investigasi Visual: Dampak Revitalisasi Sentra Heritage Indonesia
                </h2>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-mono font-black text-xs px-5 py-3 rounded-xl flex items-center gap-2 transition shadow-md">
                    <Play className="h-3.5 w-3.5 fill-current" /> Putar Laporan Investigasi (6:12)
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-xs px-4 py-3 rounded-xl border border-white/20 transition">
                    Aktifkan Subtitle CC
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* B. GALLERY HERO */}
          {heroType === 'gallery' && (
            <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full bg-slate-950 flex items-center justify-between overflow-hidden">
              <div className="absolute inset-0 bg-slate-950/40 z-10 pointer-events-none" />
              <div className="grid grid-cols-3 gap-1 h-full w-full">
                <div className="overflow-hidden relative group cursor-pointer" onClick={() => setLightboxImage("https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1000")}>
                  <img src="https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=500&auto=format" alt="Gallery item 1" className="w-full h-full object-cover transition duration-300 group-hover:scale-105" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center"><Maximize2 className="h-6 w-6 text-white" /></div>
                </div>
                <div className="overflow-hidden relative group cursor-pointer" onClick={() => setLightboxImage("https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1000")}>
                  <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format" alt="Gallery item 2" className="w-full h-full object-cover transition duration-300 group-hover:scale-105" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center"><Maximize2 className="h-6 w-6 text-white" /></div>
                </div>
                <div className="overflow-hidden relative group cursor-pointer" onClick={() => setLightboxImage("https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1000")}>
                  <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&auto=format" alt="Gallery item 3" className="w-full h-full object-cover transition duration-300 group-hover:scale-105" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center"><Maximize2 className="h-6 w-6 text-white" /></div>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 z-20 bg-slate-900/90 border border-slate-700 text-white text-[10px] font-mono px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow">
                <Maximize2 className="h-3 w-3" /> CLICK IMAGE TO LIGHTBOX (3 DOKUMEN FOTO)
              </div>
            </div>
          )}

          {/* C. PODCAST / AUDIO HERO */}
          {heroType === 'podcast' && (
            <div className="relative p-6 md:p-8 bg-gradient-to-br from-indigo-950 to-slate-950 text-white min-h-[300px] flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-500 text-slate-950 text-[8px] font-mono font-black px-2 py-0.5 rounded tracking-widest uppercase">AUDIO PODCAST</span>
                  <span className="text-xs text-indigo-200 font-mono">Infobos On-Demand Player</span>
                </div>
                <span className="text-xs text-slate-400 font-mono">ID: POD-342</span>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6 my-6">
                {/* Vinyl visualizer representation */}
                <div className="w-20 h-20 rounded-full bg-slate-800 border-4 border-indigo-500/30 flex items-center justify-center shrink-0 relative animate-spin [animation-duration:8s]">
                  <div className="w-6 h-6 rounded-full bg-slate-950 border border-indigo-400 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-indigo-400" />
                  </div>
                </div>

                <div className="space-y-1.5 text-center md:text-left">
                  <h3 className="text-lg font-bold font-sans">Review Analisis Fiskal &amp; Cagar Budaya</h3>
                  <p className="text-xs text-indigo-200">Diskusi eksklusif bersama tim SRE Tata Kota mengenai realokasi regional.</p>
                  
                  {/* Waveform representation */}
                  <div className="flex gap-0.5 h-6 items-center pt-2 justify-center md:justify-start">
                    {[3, 5, 2, 8, 4, 10, 6, 8, 3, 5, 2, 7, 9, 3, 4, 8, 5, 10, 6, 4, 3, 7, 5, 9, 2].map((h, i) => (
                      <div 
                        key={i} 
                        style={{ height: `${h * 1.8}px` }} 
                        className={`w-1 rounded-full ${ttsPlaying ? 'bg-indigo-400 animate-pulse' : 'bg-slate-700'}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between border-t border-white/10 pt-4 gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  {!ttsPlaying ? (
                    <button 
                      onClick={handleToggleTTS}
                      className="w-10 h-10 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white flex items-center justify-center transition shadow"
                      title="Mulai Membaca"
                    >
                      <Play className="h-4 w-4 fill-current ml-0.5" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      {ttsPaused ? (
                        <button 
                          onClick={handleResumeTTS}
                          className="w-10 h-10 rounded-full bg-teal-500 hover:bg-teal-400 text-slate-950 flex items-center justify-center transition shadow"
                          title="Lanjutkan"
                        >
                          <Play className="h-4 w-4 fill-current ml-0.5" />
                        </button>
                      ) : (
                        <button 
                          onClick={handlePauseTTS}
                          className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center transition shadow"
                          title="Jeda"
                        >
                          <Pause className="h-4 w-4" />
                        </button>
                      )}
                      <button 
                        onClick={handleToggleTTS}
                        className="w-10 h-10 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center transition shadow"
                        title="Hentikan"
                      >
                        <VolumeX className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  )}

                  {availableVoices.length > 0 ? (
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono text-slate-400 uppercase">PILIH SUARA (VOICE):</span>
                      <select
                        value={selectedVoiceName}
                        onChange={(e) => setSelectedVoiceName(e.target.value)}
                        className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[11px] font-mono text-slate-300 focus:border-indigo-500 focus:outline-none max-w-[200px]"
                      >
                        {availableVoices.map((voice) => (
                          <option key={voice.name} value={voice.name} className="bg-slate-950 text-white">
                            {voice.name} ({voice.lang})
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <span className="text-xs font-mono font-bold text-slate-400">Narator: Otoritas AI Default</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-400">SPEED:</span>
                  {[0.75, 1, 1.25, 1.5, 2].map(speed => (
                    <button
                      key={speed}
                      onClick={() => handleTtsSpeedChange(speed)}
                      className={`px-2 py-1 text-[10px] font-mono rounded border transition ${
                        ttsSpeed === speed ? 'bg-indigo-500 text-white border-indigo-400' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* D. LIVE HERO (CRISIS REPORT) */}
          {heroType === 'live' && (
            <div className="relative p-6 md:p-8 bg-gradient-to-r from-red-950 to-slate-950 text-white min-h-[300px] flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="bg-red-600 text-white text-[9px] font-mono font-black px-2 py-0.5 rounded tracking-widest uppercase animate-pulse">
                  ● FLASH LIVE REPORT
                </span>
                <span className="text-xs text-red-200 font-mono">DIPERBARUI REAL-TIME</span>
              </div>

              <div className="my-4 space-y-2">
                <div className="flex items-start gap-3">
                  <span className="text-xs font-mono font-black text-red-400 shrink-0">15:20 WIB</span>
                  <div className="space-y-1">
                    <strong className="text-xs block font-mono text-white">[UPDATE TERBARU: DANA REKAYASA FISKAL]</strong>
                    <p className="text-xs text-slate-300">Gubernur Jawa Barat mengesahkan rincian juknis PMK-2026 tentang implementasi anggaran cagar budaya kota kreatif.</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 flex items-center justify-between text-xs font-mono">
                <span>Daftar isi draf live blog disinkronisasi ke SRE Controller</span>
                <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider">✓ OK</span>
              </div>
            </div>
          )}

          {/* E. STANDARD IMAGE HERO */}
          {(heroType === 'standard' || !heroType) && (
            <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full bg-slate-950">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent z-10 pointer-events-none" />
              <img 
                src={data.heroImageUrl || "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&auto=format"} 
                alt={data.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition duration-700 hover:scale-[1.01]" 
              />
              <div className="absolute bottom-3 left-4 z-20 text-[10px] font-mono text-white/60 bg-black/40 px-2 py-1 rounded">
                Kredit Foto: Fotografer Jurnalistik INFOBOS / Dok. Regional Jawa Barat
              </div>
            </div>
          )}

        </div>

         {/* ==========================================
            2. ARTICLE HEADER SECTION
            ========================================== */}
        <header className="space-y-6 mb-8 border-b border-slate-200/50 dark:border-slate-800 pb-6 text-left">
          
          {/* Dynamic Badges Block */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-teal-600 dark:bg-teal-700 text-white font-mono font-semibold px-3 py-1 rounded-md text-[10px] uppercase tracking-wider shadow-sm">
              {data.categoryName}
            </span>
            <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-mono font-semibold px-2.5 py-0.5 rounded-md text-[9px] uppercase tracking-wider">
              EXCLUSIVE REPORT
            </span>
            <span className="bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20 font-mono font-semibold px-2.5 py-0.5 rounded-md text-[9px] uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-yellow-500 dark:text-yellow-400 animate-pulse" /> PREMIUM ACCESS
            </span>
            <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-mono font-semibold px-2.5 py-0.5 rounded-md text-[9px] uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-emerald-500" /> DEWAN PERS VERIFIED
            </span>
            {slug.includes('investigasi') && (
              <span className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 font-mono font-semibold px-2.5 py-0.5 rounded-md text-[9px] uppercase tracking-wider animate-pulse">
                BREAKING ISSUES
              </span>
            )}
          </div>

          {/* Headline & Translating Switcher */}
          <h1 className={`font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight transition-all duration-300 rounded-lg ${
            ttsPlaying && ttsCurrentIndex === 0 
              ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-3 py-1.5 shadow-xs' 
              : 'text-slate-900 dark:text-slate-50'
          }`}>
            {translatedArticle[activeLanguage]?.title || TRANSLATIONS.title[activeLanguage] || data.title}
          </h1>

          {/* Sub Headline */}
          <p className={`font-sans font-medium text-sm md:text-base leading-relaxed max-w-4xl transition-all duration-300 rounded-lg ${
            ttsPlaying && ttsCurrentIndex === 1 
              ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/5 px-3 py-1' 
              : 'text-slate-600 dark:text-slate-300'
          }`}>
            {translatedArticle[activeLanguage]?.subtitle || TRANSLATIONS.subtitle[activeLanguage] || data.subtitle}
          </p>

          {/* Translator & Controls Ribbon */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-slate-250 dark:border-slate-800 gap-4">
            
            {/* Left: Author & Timestamps */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <div className="flex items-center gap-1.5 text-slate-800 dark:text-teal-300 font-semibold">
                <UserIcon className="h-3.5 w-3.5 text-slate-400" />
                <span>Reporter: {data.authorName}</span>
              </div>
              {data.editorName && (
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 sm:border-l sm:border-slate-200 sm:dark:border-slate-800 sm:pl-4 font-semibold">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Editor: {data.editorName}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 sm:border-l sm:border-slate-200 sm:dark:border-slate-800 sm:pl-4">
                <Calendar className="h-3.5 w-3.5" />
                <span>{publishDateStr} • {publishTimeStr}</span>
              </div>
            </div>

            {/* Right: Quick Action Widget */}
            <div className="flex items-center gap-2 flex-wrap">
              {isTranslating && (
                <div className="flex items-center gap-1 text-teal-600 dark:text-teal-400 text-[10px] font-mono animate-pulse mr-2 bg-teal-500/10 px-2 py-0.5 rounded-md">
                  <RefreshCw className="h-3 w-3 animate-spin text-teal-500" />
                  <span>Menerjemahkan...</span>
                </div>
              )}
              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase font-bold tracking-widest mr-1">Bahasa:</span>
              {(['ID', 'EN', 'JV', 'SD'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleTranslate(lang)}
                  disabled={isTranslating}
                  className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded-lg border uppercase transition cursor-pointer ${
                    activeLanguage === lang 
                      ? 'bg-teal-500 text-slate-950 border-teal-400 font-extrabold shadow-xs' 
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850'
                  } disabled:opacity-50`}
                >
                  {lang}
                </button>
              ))}
            </div>

          </div>

          {/* Meta metrics row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5 sm:gap-x-6 py-3 px-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200/50 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400 font-mono justify-between sm:justify-start">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" /> Est. Baca: <strong className="text-slate-800 dark:text-slate-200">{data.readingTimeMinutes || 4} menit</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400" /> Diakses: <strong className="text-slate-800 dark:text-slate-200">{data.viewCount || 1024} pembaca</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <MessageSquare className="h-3.5 w-3.5 text-emerald-500" /> Diskusi: <strong className="text-slate-800 dark:text-slate-200">{commentsList.length} tanggapan</strong>
            </span>
            <button 
              onClick={() => {
                setShowShareModal(true);
                addAnalyticsLog("Membuka Share Hub via Share Count.");
              }}
              className="flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition cursor-pointer text-left font-semibold text-xs"
            >
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" /> 
              <span>Bagikan: <strong className="text-slate-800 dark:text-slate-200 underline decoration-indigo-500/30">142 kali</strong></span>
            </button>
          </div>

          {/* PREMIUM INTEGRATED VOICE ASSISTANT / ASISTEN SUARA BERITA */}
          <div id="infobos-voice-assistant" className="mt-4 bg-gradient-to-r from-slate-50 to-indigo-50/20 dark:from-slate-900/65 dark:to-indigo-950/20 border border-slate-200/80 dark:border-indigo-950/50 rounded-2xl p-4 sm:p-5 shadow-xs text-left space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3.5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-sm">
                  <Volume2 className="h-5 w-5 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-[9px] font-mono font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">ASISTEN SUARA BERITA</span>
                  </div>
                  <h4 className="font-display font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100 uppercase tracking-tight">
                    Dengarkan Narasi Berita Interaktif
                  </h4>
                </div>
              </div>
              
              {/* Voice Speed Selector */}
              <div className="flex items-center gap-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-0.5 rounded-xl self-start sm:self-auto">
                <span className="text-[9px] font-mono font-bold text-slate-400 dark:text-slate-500 px-1.5">SPEED:</span>
                {([0.75, 1.0, 1.25, 1.5] as const).map((speed) => (
                  <button
                    key={speed}
                    onClick={() => handleTtsSpeedChange(speed)}
                    className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded-lg transition cursor-pointer ${
                      ttsSpeed === speed
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-900'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Player Controls & Progress */}
              <div className="flex items-center gap-3 flex-wrap">
                {!ttsPlaying ? (
                  <button
                    onClick={handleToggleTTS}
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition active:scale-95 cursor-pointer"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>Mulai Mendengarkan</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    {ttsPaused ? (
                      <button
                        onClick={handleResumeTTS}
                        className="flex items-center gap-2 px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition active:scale-95 cursor-pointer"
                      >
                        <Play className="h-3.5 w-3.5 fill-current animate-pulse" />
                        <span>Lanjutkan</span>
                      </button>
                    ) : (
                      <button
                        onClick={handlePauseTTS}
                        className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition active:scale-95 cursor-pointer"
                      >
                        <Pause className="h-3.5 w-3.5" />
                        <span>Jeda</span>
                      </button>
                    )}
                    <button
                      onClick={handleToggleTTS}
                      className="flex items-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-sm transition active:scale-95 cursor-pointer"
                    >
                      <VolumeX className="h-3.5 w-3.5" />
                      <span>Hentikan</span>
                    </button>
                  </div>
                )}

                {/* Animated sound equalizer bar representation when playing */}
                {ttsPlaying && !ttsPaused && (
                  <div className="flex items-end gap-1 h-5 px-2">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <span
                        key={i}
                        className="w-1 bg-indigo-500 rounded-full animate-pulse"
                        style={{
                          height: `${20 + Math.random() * 80}%`,
                          animationDelay: `${i * 150}ms`,
                        }}
                      ></span>
                    ))}
                  </div>
                )}
              </div>

              {/* Voice Pitch / Actor Speaker drop-down selection */}
              {availableVoices.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap">SUARA NARATOR:</span>
                  <select
                    value={selectedVoiceName}
                    onChange={(e) => setSelectedVoiceName(e.target.value)}
                    className="text-xs font-sans font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer max-w-[180px] sm:max-w-[240px] truncate"
                  >
                    {availableVoices
                      .filter(v => v.lang.toLowerCase().includes('id') || v.lang.toLowerCase().includes('en') || v.lang.toLowerCase().includes('jv') || v.lang.toLowerCase().includes('su'))
                      .map((voice, idx) => (
                        <option key={idx} value={voice.name}>
                          {voice.name} ({voice.lang})
                        </option>
                      ))}
                    {/* Fallback to show others if no matching locale */}
                    {availableVoices.filter(v => !(v.lang.toLowerCase().includes('id') || v.lang.toLowerCase().includes('en') || v.lang.toLowerCase().includes('jv') || v.lang.toLowerCase().includes('su'))).slice(0, 5).map((voice, idx) => (
                      <option key={`other-${idx}`} value={voice.name}>
                        {voice.name} ({voice.lang})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Speaking Status / Live Transcript display panel */}
            {ttsPlaying && ttsCurrentIndex !== -1 && (
              <div className="bg-white dark:bg-slate-950 border border-indigo-100 dark:border-slate-800 rounded-2xl p-4 space-y-2.5 animate-fade-in shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping"></span>
                    SEDANG DIBACAKAN (BAGIAN {ttsCurrentIndex + 1} DARI {getArticleSegments().length})
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500">
                    Progres: {Math.round(((ttsCurrentIndex + 1) / getArticleSegments().length) * 100)}%
                  </span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 italic font-medium leading-relaxed bg-slate-50 dark:bg-slate-900 p-3.5 rounded-xl border-l-4 border-indigo-500">
                  "{getArticleSegments()[ttsCurrentIndex]}"
                </p>
              </div>
            )}

            {/* Quick Informational Tip */}
            <div className="flex items-start gap-2 text-[10px] text-slate-400 dark:text-slate-500">
              <span className="bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 px-2 py-0.5 rounded-md font-mono font-bold text-[8px] tracking-wider uppercase">TIPS</span>
              <p className="leading-normal">
                Gunakan menu penerjemah bahasa di atas jika Anda ingin mendengarkan berita dalam Bahasa Inggris (EN), Jawa (JV), atau Sunda (SD).
              </p>
            </div>
          </div>
        </header>

        {/* ==========================================
            MAIN IMMERSIVE SPLIT SCREEN LAYOUT
            ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-start">
          
          {/* LEFT SIDEBAR / MAIN READING AREA (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-6">

            {/* INFOBOS LITE: INTEGRATED SOCIAL ACTION & CREATOR PROFILE BAR */}
            <div className={`border rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${cardThemeClasses}`}>
              
              {/* Left: Creator Profile info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#002B5B] text-[#FFD700] flex items-center justify-center font-bold text-base shadow-inner font-mono">
                  {data.authorName?.[0] || 'J'}
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className={`font-sans font-black text-xs ${headingClasses}`}>{data.authorName}</span>
                    <span className="bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300 text-[8px] font-mono font-black uppercase px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                      ✓ Verified Creator
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Jurnalis Senior • {reporterFollowers} Pengikut</p>
                </div>
                <button 
                  onClick={() => {
                    if (isFollowingReporter) {
                      setIsFollowingReporter(false);
                      setReporterFollowers(prev => prev - 1);
                      showToast(`Batal mengikuti ${data.authorName}`);
                    } else {
                      setIsFollowingReporter(true);
                      setReporterFollowers(prev => prev + 1);
                      setUserReputation(prev => prev + 15);
                      showToast(`Mengikuti ${data.authorName}! +15 Reputasi.`);
                    }
                  }}
                  className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition ${
                    isFollowingReporter 
                      ? 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {isFollowingReporter ? 'Mengikuti' : 'Ikuti'}
                </button>
              </div>

              {/* Right: Voting & Bookmarking */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto md:justify-end">
                {/* Voting widget */}
                <div className={`flex border rounded-xl p-1 items-center shadow-xs ${innerBoxThemeClasses}`}>
                  <button 
                    onClick={() => {
                      if (userVote === 'up') {
                        setUserVote(null);
                        setUpvotes(prev => prev - 1);
                      } else {
                        if (userVote === 'down') setDownvotes(prev => prev - 1);
                        setUserVote('up');
                        setUpvotes(prev => prev + 1);
                        setUserReputation(prev => prev + 10);
                        showToast("Upvote terekam! +10 Reputasi kontribusi.");
                      }
                    }}
                    className={`p-1.5 px-2.5 rounded-lg text-xs font-bold font-mono transition flex items-center gap-1 cursor-pointer ${
                      userVote === 'up' 
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400' 
                        : 'text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400'
                    }`}
                  >
                    👍 <span>{upvotes}</span>
                  </button>
                  <div className="h-4 w-px bg-slate-200 dark:bg-white/10 mx-1"></div>
                  <button 
                    onClick={() => {
                      if (userVote === 'down') {
                        setUserVote(null);
                        setDownvotes(prev => prev - 1);
                      } else {
                        if (userVote === 'up') setUpvotes(prev => prev - 1);
                        setUserVote('down');
                        setDownvotes(prev => prev + 1);
                        showToast("Downvote terekam. Masukan Anda dihargai.");
                      }
                    }}
                    className={`p-1.5 px-2.5 rounded-lg text-xs font-bold font-mono transition flex items-center gap-1 cursor-pointer ${
                      userVote === 'down' 
                        ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400' 
                        : 'text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400'
                    }`}
                  >
                    👎 <span>{downvotes}</span>
                  </button>
                </div>

                {/* Bookmark & Collections Manager */}
                <div className="relative">
                  <div className={`flex items-center gap-1 border rounded-xl p-1 shadow-xs ${innerBoxThemeClasses}`}>
                    <select
                      value={selectedCollection}
                      onChange={(e) => {
                        setSelectedCollection(e.target.value);
                        setIsSavedToCollection(true);
                        setUserReputation(prev => prev + 5);
                        showToast(`Disimpan ke folder "${e.target.value}"! +5 Reputasi.`);
                      }}
                      className={`bg-transparent text-[10px] font-bold focus:outline-none p-1 ${contrastTheme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}
                    >
                      <option disabled value="">Simpan Ke Koleksi...</option>
                      {personalCollections.map(col => (
                        <option key={col} value={col}>{col}</option>
                      ))}
                    </select>
                    
                    <button
                      onClick={() => {
                        const name = prompt("Masukkan nama koleksi baru:");
                        if (name && name.trim()) {
                          setPersonalCollections(prev => [...prev, name.trim()]);
                          setSelectedCollection(name.trim());
                          setIsSavedToCollection(true);
                          setUserReputation(prev => prev + 10);
                          showToast(`Koleksi "${name}" dibuat! +10 Reputasi.`);
                        }
                      }}
                      className="p-1 text-slate-400 hover:text-indigo-600 transition"
                      title="Buat Koleksi Baru"
                    >
                      ➕
                    </button>
                  </div>
                </div>

                {/* Public Bookmark toggle */}
                <button
                  onClick={() => {
                    const nextVal = !isPublicBookmark;
                    setIsPublicBookmark(nextVal);
                    if (nextVal) {
                      setUserReputation(prev => prev + 12);
                      showToast("Jurnal Publik Aktif! Artikel ini disematkan di Bookmark Publik Anda. +12 Reputasi.");
                    } else {
                      showToast("Dihapus dari Bookmark Publik.");
                    }
                  }}
                  className={`p-2 rounded-xl text-xs font-bold transition flex items-center gap-1 border cursor-pointer ${
                    isPublicBookmark 
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-500/50 text-indigo-700 dark:text-indigo-300 font-extrabold' 
                      : `hover:text-slate-700 dark:hover:text-slate-300 ${innerBoxThemeClasses}`
                  }`}
                  title="Bookmark Publik"
                >
                  🔖 <span className="hidden sm:inline">{isPublicBookmark ? 'Bookmark Publik Aktif' : 'Bookmark Publik'}</span>
                </button>
              </div>

            </div>
            
            {/* Why It Matters Callout block */}
            <div className={`border-l-4 p-4 rounded-r-xl relative shadow-xs transition-all duration-300 ${
              ttsPlaying && ttsCurrentIndex === 2 
                ? 'bg-indigo-600/10 border-indigo-500 pl-4 shadow-md' 
                : 'bg-[#2B7A78]/5 border-[#2B7A78]'
            }`}>
              <span className={`absolute -top-2.5 left-4 text-white text-[8px] font-mono font-black px-2 py-0.5 rounded tracking-widest uppercase ${
                ttsPlaying && ttsCurrentIndex === 2 ? 'bg-indigo-600 animate-pulse' : 'bg-[#2B7A78]'
              }`}>
                WHY IT MATTERS / RINGKASAN DATA
              </span>
              <p className={`text-xs md:text-sm leading-relaxed font-semibold pt-1 transition-all duration-300 ${
                ttsPlaying && ttsCurrentIndex === 2 ? 'text-indigo-600 font-bold' : 'text-slate-700 dark:text-slate-300'
              }`}>
                {translatedArticle[activeLanguage]?.summary || TRANSLATIONS.summary[activeLanguage] || data.summary}
              </p>
            </div>


            {/* TTS narration visual active sentence indicator banner */}
            {ttsPlaying && ttsCurrentIndex !== -1 && (
              <div className="p-3 bg-indigo-950 border border-indigo-850 text-indigo-200 rounded-xl flex items-center gap-3 animate-pulse">
                <Volume2 className="h-5 w-5 text-indigo-400 shrink-0" />
                <div className="text-xs font-mono">
                  <span className="text-[9px] block text-indigo-400 uppercase font-black">TTS AKTIF (DENGARKAN ARTIKEL):</span>
                  &ldquo;{getArticleSegments()[ttsCurrentIndex]}&rdquo;
                </div>
              </div>
            )}

            {/* ==========================================
                3. MAIN READING CONTEXT (SMART CONTENT BLOCKS)
                ========================================== */}
            <div 
              ref={articleRef}
              style={{ fontSize: `${fontSize}px` }}
              className={`prose ${contrastTheme === 'dark' ? 'prose-invert text-slate-200' : 'prose-slate text-slate-800'} max-w-none leading-relaxed font-sans space-y-5 transition-all`}
            >
              {data.contentType === 'live-feed' ? (
                <div className="space-y-6">
                  {/* Interactive Status banner */}
                  <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                      </span>
                      <div>
                        <h4 className="text-sm font-black text-rose-600 dark:text-rose-400 uppercase tracking-widest font-mono">
                          SIARAN LANGSUNG (LIVE REPORT)
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-300">
                          Laporan langsung detik-demi-detik terverifikasi oleh tim jurnalis INFOBOS di lapangan.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleSimulateLiveUpdate}
                      disabled={refreshingLive}
                      className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50 shrink-0 shadow-3xs"
                    >
                      <RefreshCw className={`h-3.5 w-3.5 ${refreshingLive ? 'animate-spin' : ''}`} />
                      <span>{refreshingLive ? 'Memperbarui...' : 'Simulasi Pembaruan'}</span>
                    </button>
                  </div>

                  {/* Vertical Timeline */}
                  <div className="relative border-l-2 border-slate-200 dark:border-white/10 ml-4 pl-6 space-y-6 text-left">
                    {/* Extra simulated live updates FIRST in reverse chronological order */}
                    {[...extraLiveUpdates].reverse().map((upd, uIdx) => (
                      <div key={`extra-${uIdx}`} className="relative group">
                        {/* Pulse dot */}
                        <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 ring-4 ring-white dark:ring-slate-900 shadow-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span>
                        </span>
                        
                        <div className="bg-rose-50/50 dark:bg-rose-950/10 border border-rose-100 dark:border-rose-900/30 rounded-xl p-4.5 space-y-2.5 shadow-2xs transition-all duration-300">
                          <div className="flex items-center justify-between">
                            <span className="bg-rose-500 text-white text-[9px] font-mono font-black px-2 py-0.5 rounded shadow-2xs">
                              {upd.time}
                            </span>
                            <span className="text-[9px] text-rose-500 font-mono font-bold animate-pulse">🔴 UPDATE BARU</span>
                          </div>
                          <h4 className="font-display font-black text-sm text-[#002B5B] dark:text-white">
                            {upd.title}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                            {upd.body}
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* Standard paragraphs parsed and displayed as timeline logs */}
                    {bodyParagraphs.map((paragraph: string, idx: number) => {
                      const originalParagraphs = data.body ? data.body.split('\n\n') : [];
                      const originalP = originalParagraphs[idx] || '';
                      const isTimelineLog = originalP.trim().startsWith('* **[');

                      if (isTimelineLog) {
                        let timestamp = 'LIVE';
                        let itemTitle = 'Pembaruan';
                        let itemDesc = paragraph;

                        // Robust parsing of timeline logs
                        const timeMatch = paragraph.match(/\[([^\]]+)\]/);
                        if (timeMatch) {
                          timestamp = timeMatch[1];
                        } else {
                          const origTimeMatch = originalP.match(/\[([^\]]+)\]/);
                          if (origTimeMatch) timestamp = origTimeMatch[1];
                        }

                        let cleanText = paragraph.replace(/^\s*[\*\-]\s*/, '');
                        cleanText = cleanText.replace(/\*\*\[[^\]]+\]\*\*\s*-\s*/, '');
                        cleanText = cleanText.replace(/\[[^\]]+\]\s*-\s*/, '');

                        const titleDescMatch = cleanText.match(/\*\*([^*]+)\*\*:\s*(.*)/) || cleanText.match(/([^:]+):\s*(.*)/);
                        if (titleDescMatch) {
                          itemTitle = titleDescMatch[1].trim();
                          itemDesc = titleDescMatch[2].trim();
                        } else {
                          const origCleanText = originalP.replace(/^\s*[\*\-]\s*/, '').replace(/\*\*\[[^\]]+\]\*\*\s*-\s*/, '');
                          const origTitleMatch = origCleanText.match(/\*\*([^*]+)\*\*:\s*(.*)/);
                          if (origTitleMatch) {
                            itemTitle = origTitleMatch[1].trim();
                          }
                          itemDesc = cleanText;
                        }

                        itemTitle = itemTitle.replace(/[\*]/g, '').trim();

                        return (
                          <div key={idx} className="relative group">
                            {/* Dot indicator */}
                            <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-slate-300 dark:bg-slate-700 ring-4 ring-white dark:ring-slate-900 shadow-3xs group-hover:bg-rose-500 transition-colors duration-300">
                              <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
                            </span>

                            <div className="bg-white dark:bg-[#002244]/30 border border-slate-100 dark:border-white/5 rounded-xl p-4.5 space-y-2.5 shadow-3xs hover:border-slate-300 dark:hover:border-white/10 transition-all duration-300">
                              <div className="flex items-center justify-between">
                                <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[9px] font-black font-mono px-2 py-0.5 rounded border border-slate-200/40 dark:border-slate-700/50">
                                  {timestamp}
                                </span>
                                <span className="text-[9px] text-slate-400 font-mono">Tercatat</span>
                              </div>
                              <h4 className="font-display font-black text-sm text-[#002B5B] dark:text-white">
                                {itemTitle}
                              </h4>
                              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                                {itemDesc}
                              </p>
                            </div>
                          </div>
                        );
                      }

                      if (originalP.startsWith('## ')) {
                        const cleanP = paragraph.replace(/^##\s*/, '');
                        return (
                          <h2 key={idx} className="font-sans font-black text-base md:text-lg text-[#002B5B] dark:text-white pt-4 border-b border-slate-100 dark:border-white/5 pb-1">
                            {cleanP}
                          </h2>
                        );
                      }
                      if (originalP.startsWith('### ')) {
                        const cleanP = paragraph.replace(/^###\s*/, '');
                        return (
                          <h3 key={idx} className="font-sans font-black text-sm md:text-base text-[#002B5B] dark:text-white pt-2">
                            {cleanP}
                          </h3>
                        );
                      }

                      return (
                        <p key={idx} className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 leading-relaxed">
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                </div>
              ) : (
                bodyParagraphs.map((paragraph: string, idx: number) => {
                  // Formatting custom headings and blockquotes
                  let element = null;
                  const originalParagraphs = data.body ? data.body.split('\n\n') : [];
                  const originalP = originalParagraphs[idx] || '';

                  if (originalP.startsWith('## ')) {
                    const cleanP = paragraph.replace(/^##\s*/, '');
                    element = (
                      <h2 className={`font-sans font-black text-lg md:text-xl pt-4 border-b pb-1.5 ${headingClasses} ${contrastTheme === 'dark' ? 'border-slate-800' : 'border-slate-200/50'}`}>
                        {cleanP}
                      </h2>
                    );
                  } else if (originalP.startsWith('### ')) {
                    const cleanP = paragraph.replace(/^###\s*/, '');
                    element = (
                      <h3 className={`font-sans font-black text-base md:text-lg pt-2 ${headingClasses}`}>
                        {cleanP}
                      </h3>
                    );
                  } else if (originalP.startsWith('> ')) {
                    const cleanP = paragraph.replace(/^>\s*/, '');
                    element = (
                      <blockquote className={`border-l-4 border-teal-500 pl-4 py-2 italic rounded-r-xl font-bold font-sans ${innerBoxThemeClasses}`}>
                        &ldquo;{cleanP}&rdquo;
                      </blockquote>
                    );
                  } else {
                    // Render dropscap on paragraph 0 or use highlighted paragraphs
                    const isDropcap = idx === 0 && paragraph.length > 50;
                    element = renderParagraphWithHighlights(paragraph, idx, isDropcap);
                  }

                  // Injecting smart visual interactive elements sequentially within text blocks
                  return (
                    <React.Fragment key={idx}>
                      
                      {/* Render text element */}
                      <div className={`transition-all duration-300 rounded-lg ${
                        ttsPlaying && ttsCurrentIndex === (idx + 3)
                          ? 'bg-indigo-600/10 border-l-4 border-indigo-500 pl-3 py-1 my-1 shadow-md scale-[1.01]'
                          : ''
                      }`}>
                        {element}
                      </div>

                      {/* Inline Ad Zone 1 */}
                      {idx === 1 && (
                        <div className="py-2">
                          <AdZone zone="after_paragraph_2" pageContext={{ category: data.primaryCategoryId }} />
                        </div>
                      )}

                      {/* INTERACTIVE VOTING POLL */}
                      {idx === 6 && (
                        <div className={`my-6 border p-4 sm:p-5 rounded-2xl space-y-4 shadow-sm ${cardThemeClasses}`}>
                          <div className="flex items-center gap-2 text-amber-500 dark:text-amber-400 border-b border-slate-200/60 dark:border-slate-800 pb-2">
                            <BadgeHelp className="h-4 w-4" />
                            <h4 className={`text-xs font-mono font-black uppercase tracking-widest ${headingClasses}`}>
                              JAJAK PENDAPAT: OPINI PUBLIK REGIONAL
                            </h4>
                          </div>
                          <p className="text-xs leading-relaxed">
                            Apakah Anda sepakat dengan pendelegasian dana fiskal pariwisata sebesar 12.4 Miliar untuk Braga Heritage?
                          </p>

                          {hasVotedPoll ? (
                            <div className="space-y-2.5">
                              {/* Poll Result graph */}
                              {[
                                { label: 'Setuju / Sepakat', count: pollVotes.yes, color: 'bg-teal-500' },
                                { label: 'Skeptis / Tidak Setuju', count: pollVotes.no, color: 'bg-rose-500' },
                                { label: 'Netral / Ragu-ragu', count: pollVotes.neutral, color: 'bg-slate-500' }
                              ].map((opt, i) => {
                                const total = pollVotes.yes + pollVotes.no + pollVotes.neutral;
                                const pct = Math.round((opt.count / total) * 100);
                                return (
                                  <div key={i} className="space-y-1">
                                    <div className="flex justify-between text-xs font-mono">
                                      <span className="font-bold">{opt.label}</span>
                                      <span className={textMutedClasses}>{opt.count} suara ({pct}%)</span>
                                    </div>
                                    <div className={`w-full rounded-full h-2 overflow-hidden border border-slate-200/40 dark:border-slate-800 ${innerBoxThemeClasses}`}>
                                      <div style={{ width: `${pct}%` }} className={`h-full ${opt.color}`} />
                                    </div>
                                  </div>
                                );
                              })}
                              <div className="flex justify-between items-center pt-2 text-[10px] font-mono">
                                <span className="text-emerald-600 dark:text-emerald-400">✓ Pilihan Anda telah dicatat secara aman.</span>
                                <button 
                                  onClick={() => { setHasVotedPoll(false); addAnalyticsLog("Mengatur ulang hasil voting poll."); }}
                                  className="hover:underline hover:text-indigo-600 dark:hover:text-white cursor-pointer font-bold"
                                >
                                  Pilih Ulang
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                              <button 
                                onClick={() => handleVotePoll('yes')}
                                className={`hover:bg-teal-500/10 border border-slate-200 dark:border-slate-800 hover:border-teal-500/50 p-3 rounded-xl text-xs font-mono transition text-left cursor-pointer ${innerBoxThemeClasses}`}
                              >
                                👍 Setuju / Sepakat
                              </button>
                              <button 
                                onClick={() => handleVotePoll('no')}
                                className={`hover:bg-rose-500/10 border border-slate-200 dark:border-slate-800 hover:border-rose-500/50 p-3 rounded-xl text-xs font-mono transition text-left cursor-pointer ${innerBoxThemeClasses}`}
                              >
                                👎 Skeptis / Tidak Setuju
                              </button>
                              <button 
                                onClick={() => handleVotePoll('neutral')}
                                className={`hover:bg-slate-500/10 border border-slate-200 dark:border-slate-800 hover:border-slate-500/50 p-3 rounded-xl text-xs font-mono transition text-left cursor-pointer ${innerBoxThemeClasses}`}
                              >
                                🧐 Netral / Ragu-ragu
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                    </React.Fragment>
                  );
                })
              )}
            </div>

            {/* AD ZONE BOTTOM */}
            <div className="my-4">
              <AdZone zone="bottom_banner" pageContext={{ category: data.primaryCategoryId }} />
            </div>

            {/* ==========================================
                4. TIMELINE TRACKER (CHRONOLOGY)
                ========================================== */}
            <div className={`rounded-2xl p-4 sm:p-5 space-y-4 text-left border shadow-sm ${cardThemeClasses}`}>
              <div className="flex items-center gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-2.5">
                <Clock className="h-4.5 w-4.5 text-teal-500 dark:text-teal-400" />
                <h4 className={`text-xs font-mono font-black uppercase tracking-wider ${headingClasses}`}>
                  KRONOLOGI PERKEMBANGAN ISU (TIMELINE)
                </h4>
              </div>

              <div className="relative border-l border-slate-200 dark:border-slate-800 pl-4 ml-1.5 space-y-4 text-xs">
                <div className="relative">
                  <div className="absolute -left-[20.5px] top-1 w-2.5 h-2.5 rounded-full bg-teal-500 border-2 border-slate-100 dark:border-slate-900 animate-ping" />
                  <div className="absolute -left-[20.5px] top-1 w-2.5 h-2.5 rounded-full bg-teal-500 border-2 border-slate-100 dark:border-slate-900" />
                  <span className={`font-mono text-[9px] uppercase font-black ${textMutedClasses}`}>1 Januari 2026</span>
                  <strong className={`block mt-0.5 ${headingClasses}`}>Inisiasi Regulasi &amp; Pagu Fiskal Regional</strong>
                  <p className={`text-[11px] ${textMutedClasses}`}>Rapat koordinasi awal dengan tim SRE Jawa Barat terkait cagar budaya.</p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-[20.5px] top-1 w-2.5 h-2.5 rounded-full bg-slate-400 dark:bg-slate-700 border-2 border-slate-100 dark:border-slate-900" />
                  <span className={`font-mono text-[9px] uppercase font-black ${textMutedClasses}`}>12 Maret 2026</span>
                  <strong className={`block mt-0.5 ${headingClasses}`}>Penetapan APBD Kota Bandung</strong>
                  <p className={`text-[11px] ${textMutedClasses}`}>Alokasi anggaran pariwisata senilai Rp 12.4 Miliar Braga Heritage disahkan.</p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[20.5px] top-1 w-2.5 h-2.5 rounded-full bg-teal-500 border-2 border-slate-100 dark:border-slate-900" />
                  <span className="font-mono text-[9px] text-teal-600 dark:text-teal-400 uppercase font-black">HARI INI (LIVE ISSUES)</span>
                  <strong className={`block mt-0.5 ${headingClasses}`}>Implementasi Juknis &amp; Berita Terverifikasi</strong>
                  <p className={`text-[11px] ${textMutedClasses}`}>Transparansi penuh data riset siber dan visualisasi grafik sirkular di portal INFOBOS.</p>
                </div>
              </div>
            </div>



            {/* ==========================================
                6. CORRECTION NOTES & ETHICS DEWAN PERS
                ========================================== */}
            {data.corrections && data.corrections.length > 0 ? (
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4 sm:p-5 space-y-3 text-left">
                <div className="flex items-center gap-1.5 text-xs font-mono font-black text-amber-500 uppercase tracking-widest">
                  <Shield className="h-4.5 w-4.5" />
                  CATATAN PERBAIKAN &amp; HAK JAWAB (CORRECTION LOGS)
                </div>
                <p className={`text-xs leading-relaxed ${textMutedClasses}`}>
                  Sesuai dengan Pedoman Pemberitaan Media Siber Dewan Pers, jika terjadi disinformasi atau rujukan yang kurang akurat, catatan koreksi dipublikasikan transparan di bawah ini secara permanen.
                </p>

                <div className="space-y-4">
                  {data.corrections && data.corrections.map((cor: any) => (
                    <div key={cor.id} className={`p-4 rounded-xl border space-y-2.5 text-xs ${innerBoxThemeClasses}`}>
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className={textMutedClasses}>Diverifikasi: {new Date(cor.publishedAt).toLocaleString('id-ID')}</span>
                        <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-black">SECURED</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200/60 dark:border-slate-800">
                          <span className="text-[8px] font-mono text-rose-500 dark:text-rose-400 uppercase font-black block">Sebelumnya (Teks Salah):</span>
                          <p className="line-through text-slate-500 font-bold leading-normal">{cor.originalText}</p>
                        </div>
                        <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200/60 dark:border-slate-800">
                          <span className="text-[8px] font-mono text-emerald-600 dark:text-emerald-400 uppercase font-black block">Diperbaiki Menjadi:</span>
                          <p className={`font-bold leading-normal ${headingClasses}`}>{cor.correctedText}</p>
                        </div>
                      </div>
                      <p className={`text-[11px] ${textMutedClasses}`}>
                        <strong className={`font-mono ${headingClasses}`}>Keterangan:</strong> {cor.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className={`p-4 rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 text-xs leading-normal font-sans ${innerBoxThemeClasses}`}>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Tidak ada catatan perbaikan aktif pada dokumen ini.</span>
                </div>
                <button 
                  onClick={() => setShowReportModal(true)}
                  className="text-xs text-[#2B7A78] dark:text-teal-400 hover:underline font-mono font-black cursor-pointer self-end sm:self-auto"
                >
                  Ajukan Koreksi
                </button>
              </div>
            )}

            {/* Academic style Citations & Open Data Source */}
            <div className={`p-4 sm:p-5 border rounded-2xl text-left space-y-2 text-xs shadow-2xs ${innerBoxThemeClasses}`}>
              <span className={`text-[9px] font-mono uppercase font-black tracking-widest block ${textMutedClasses}`}>CITATIONS &amp; REFERENSI AKADEMIK</span>
              <ul className={`list-decimal list-inside space-y-1 font-mono text-[10px] ${textMutedClasses}`}>
                <li>Badan Pusat Statistik (BPS) Jawa Barat: Laporan Publik Anggaran PMK-2026.</li>
                <li>Pemerintah Daerah Kota Bandung: Masterplan Penataan Cagar Budaya &amp; Zonasi Spasial Braga.</li>
                <li>Riset SRE Tata Kota Indonesia: Sinergitas Pembangunan Ekonomi Sirkular Berkelanjutan (Vol. 14, 2026).</li>
              </ul>
            </div>

            {/* ==========================================
                7. NESTED DISCUSSION BOARD (COMMENTS SECTION)
                ========================================== */}
            <div className={`rounded-2xl p-4 sm:p-6 space-y-5 sm:space-y-6 text-left border shadow-sm ${cardThemeClasses}`}>
              <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-teal-500 dark:text-teal-400" />
                  <h4 className={`text-xs font-mono font-black uppercase tracking-wider ${headingClasses}`}>
                    DEWAN DISKUSI PUBLIK ({commentsList.length} TANGGAPAN)
                  </h4>
                </div>
                <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-mono font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase">
                  ● AI Moderated Active
                </span>
              </div>

              {/* Add Comment Form */}
              <form onSubmit={handleAddComment} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-500 text-slate-950 flex items-center justify-center font-bold text-xs shrink-0 shadow font-mono">
                  {user ? user.fullName.substring(0, 2).toUpperCase() : 'P'}
                </div>
                <div className="flex-1 space-y-2">
                  <textarea
                    rows={2}
                    value={newCommentText}
                    onChange={e => setNewCommentText(e.target.value)}
                    placeholder="Tulis opini, kritik konstruktif, atau tanggapan Anda..."
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-teal-500 font-sans leading-relaxed"
                  />
                  <div className="flex justify-between items-center">
                    <span className={`text-[9px] font-mono ${textMutedClasses}`}>Dilarang mengandung sara, hoaks, atau ujaran kebencian.</span>
                    <button
                      type="submit"
                      className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-mono font-black text-[10px] px-4 py-2 rounded-lg flex items-center gap-1.5 transition shadow cursor-pointer"
                    >
                      <Send className="h-3 w-3" /> Kirim Opini
                    </button>
                  </div>
                </div>
              </form>

              {/* Comments Thread Listing */}
              <div className="space-y-4 divide-y divide-slate-200 dark:divide-slate-800/60 pt-2">
                {commentsList.map((cmt) => (
                  <div key={cmt.id} className="pt-4 first:pt-0 space-y-3">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0 border border-slate-200 dark:border-slate-700 font-mono">
                        {cmt.avatar || 'DS'}
                      </div>
                      <div className="flex-grow space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-bold ${headingClasses}`}>{cmt.author}</span>
                            <span className={`text-[8px] border px-1.5 py-0.2 rounded font-mono font-black ${innerBoxThemeClasses}`}>
                              {cmt.role}
                            </span>
                          </div>
                          <span className={`text-[10px] font-mono ${textMutedClasses}`}>{cmt.timestamp}</span>
                        </div>

                        <p className="text-xs leading-relaxed font-sans pt-0.5">
                          {cmt.body}
                        </p>

                        {/* Reaction / Reply bar */}
                        <div className={`flex items-center gap-4 pt-2 text-[10px] font-mono ${textMutedClasses}`}>
                          <button 
                            onClick={() => handleReaction(cmt.id, 'helpful')}
                            className="flex items-center gap-1 hover:text-teal-500 dark:hover:text-teal-400 transition cursor-pointer font-semibold"
                          >
                            👍 Berguna ({cmt.reactions?.helpful || 0})
                          </button>
                          <button 
                            onClick={() => handleReaction(cmt.id, 'insightful')}
                            className="flex items-center gap-1 hover:text-amber-500 dark:hover:text-amber-400 transition cursor-pointer font-semibold"
                          >
                            🧠 Berbobot ({cmt.reactions?.insightful || 0})
                          </button>
                          <button 
                            onClick={() => setReplyTargetId(replyTargetId === cmt.id ? null : cmt.id)}
                            className="hover:text-indigo-600 dark:hover:text-white transition cursor-pointer font-semibold"
                          >
                            💬 Balas ({cmt.replies?.length || 0})
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Replies drawer mapping */}
                    {cmt.replies && cmt.replies.length > 0 && (
                      <div className="pl-4 sm:pl-11 space-y-3 border-l border-slate-200 dark:border-slate-800 ml-2 sm:ml-4">
                        {cmt.replies.map((rep: any) => (
                          <div key={rep.id} className="flex gap-2.5">
                            <div className={`w-6.5 h-6.5 rounded-full flex items-center justify-center font-bold text-[9px] shrink-0 border font-mono ${innerBoxThemeClasses}`}>
                              R
                            </div>
                            <div className="flex-grow space-y-0.5 text-xs">
                              <div className="flex items-center justify-between">
                                <span className={`font-bold ${headingClasses}`}>{rep.author}</span>
                                <span className={`text-[10px] font-mono ${textMutedClasses}`}>{rep.timestamp}</span>
                              </div>
                              <p className="font-sans leading-relaxed">{rep.body}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Active inline reply text editor */}
                    {replyTargetId === cmt.id && (
                      <div className="pl-11 pt-2 flex gap-2">
                        <input 
                          type="text"
                          value={replyText}
                          onChange={e => setReplyText(e.target.value)}
                          placeholder="Ketik balasan untuk komentar ini..."
                          className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-xs text-slate-900 dark:text-white"
                        />
                        <button 
                          onClick={() => handleAddReply(cmt.id)}
                          className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition shadow cursor-pointer"
                        >
                          Balas
                        </button>
                      </div>
                    )}

                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ==========================================
              RIGHT SIDEBAR (lg:col-span-4) - DESKTOP ONLY
              ========================================== */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* AI COMPANION PANEL (Interactive chatbot, sentiment, takeaways) */}
            <div className={`rounded-2xl p-4 sm:p-5 space-y-4 border shadow-sm text-left ${cardThemeClasses}`}>
              <div className="flex justify-between items-center border-b border-slate-200/60 dark:border-slate-800 pb-2.5">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-5 w-5 text-teal-500 dark:text-teal-400 animate-pulse" />
                  <h3 className={`text-xs font-mono font-black uppercase tracking-wider ${headingClasses}`}>
                    AI REDAKSI INTEL COMPANION
                  </h3>
                </div>
                <span className="text-[8px] bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 px-2 py-0.5 rounded font-black font-mono">
                  Gemini Active
                </span>
              </div>

              {/* Sentiment meter */}
              <div className={`space-y-1 p-3 rounded-xl border ${innerBoxThemeClasses}`}>
                <span className={`text-[8.5px] font-mono uppercase font-black block ${textMutedClasses}`}>Sentimen Analisis Opini</span>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-teal-600 dark:text-teal-400 font-bold">Positif (78%)</span>
                  <span className={textMutedClasses}>Netral / Skeptis</span>
                </div>
                <div className="w-full bg-slate-200/50 dark:bg-slate-900 rounded-full h-1.5 overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full" style={{ width: '78%' }} />
                </div>
              </div>

              {/* Bullet Key facts Takeaways */}
              <div className="space-y-2">
                <span className={`text-[9px] font-mono uppercase font-black tracking-wider block ${textMutedClasses}`}>Fakta Utama (Key Takeaways):</span>
                <ul className="space-y-2 text-xs leading-relaxed">
                  <li className={`flex items-start gap-2 p-2 rounded border ${innerBoxThemeClasses}`}>
                    <Check className="h-3.5 w-3.5 text-teal-500 dark:text-teal-400 shrink-0 mt-0.5" />
                    <span>Anggaran total regional pariwisata Jawa Barat sebesar <strong>Rp 45.2 Miliar</strong> disalurkan proporsional.</span>
                  </li>
                  <li className={`flex items-start gap-2 p-2 rounded border ${innerBoxThemeClasses}`}>
                    <Check className="h-3.5 w-3.5 text-teal-500 dark:text-teal-400 shrink-0 mt-0.5" />
                    <span>Sinergi pilar kebudayaan Braga meningkatkan keterlibatan ekonomi kreatif lokal sebanyak <strong>40%</strong>.</span>
                  </li>
                  <li className={`flex items-start gap-2 p-2 rounded border ${innerBoxThemeClasses}`}>
                    <Check className="h-3.5 w-3.5 text-teal-500 dark:text-teal-400 shrink-0 mt-0.5" />
                    <span>Kepatuhan audit Dewan Pers terjamin berkat validasi metadata dan catatan perbaikan siber.</span>
                  </li>
                </ul>
              </div>

              {/* Chat companion */}
              <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                <span className={`text-[9px] font-mono uppercase font-black tracking-wider block ${textMutedClasses}`}>Konsol Tanya AI (Ask AI Facts):</span>
                
                {/* Scrollable chat history */}
                <div className={`border rounded-xl p-3 h-44 overflow-y-auto space-y-2.5 text-[11px] font-mono ${innerBoxThemeClasses}`}>
                  {aiChatHistory.map((chat, idx) => (
                    <div 
                      key={idx} 
                      className={`p-2 rounded-lg ${
                        chat.sender === 'user' 
                          ? 'bg-indigo-600/10 text-indigo-700 dark:text-indigo-300 border border-indigo-600/20 ml-6 text-right' 
                          : 'bg-slate-100/50 dark:bg-slate-900 text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-800/80 mr-6 text-left'
                      }`}
                    >
                      {chat.thinking ? (
                        <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 animate-pulse">
                          <Activity className="h-3.5 w-3.5 animate-spin" /> {chat.text}
                        </span>
                      ) : chat.text}
                    </div>
                  ))}
                </div>

                {/* Prepopulated quick questions clickables */}
                <div className="flex flex-wrap gap-1">
                  {[
                    "Siapa penutur asli?",
                    "Total pagu dana?",
                    "Lokasi persis Braga?"
                  ].map(q => (
                    <button
                      key={q}
                      onClick={() => { setAiChatQuery(q); addAnalyticsLog(`Memilih pertanyaan cepat AI: "${q}"`); }}
                      className={`border border-slate-200 dark:border-slate-850 hover:border-teal-500 dark:hover:border-teal-400 text-[9px] font-mono px-2 py-1 rounded transition cursor-pointer ${innerBoxThemeClasses}`}
                    >
                      {q}
                    </button>
                  ))}
                </div>

                {/* Query inputs */}
                <div className="flex gap-1.5 pt-1">
                  <input
                    type="text"
                    value={aiChatQuery}
                    onChange={e => setAiChatQuery(e.target.value)}
                    placeholder="Tanya AI tentang fakta rilis..."
                    className={`flex-grow border rounded-lg p-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 ${innerBoxThemeClasses}`}
                    onKeyDown={e => { if (e.key === 'Enter') handleSendAiMessage(); }}
                  />
                  <button
                    onClick={handleSendAiMessage}
                    className="bg-teal-500 hover:bg-teal-400 text-slate-950 p-2 rounded-lg transition shadow cursor-pointer"
                  >
                    <SendHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* INFOBOS LITE: COMMUNITY LEADERBOARD & REPUTATION ENGINE */}
            <div className={`rounded-2xl p-4 sm:p-5 space-y-4 border shadow-sm text-left animate-fade-in ${cardThemeClasses}`}>
              <div className="flex justify-between items-center border-b border-slate-200/60 dark:border-slate-800 pb-2.5">
                <div className="flex items-center gap-1.5">
                  <Award className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                  <h3 className={`text-xs font-mono font-black uppercase tracking-wider ${headingClasses}`}>
                    REPUTASI &amp; PAPAN PERINGKAT KOMUNITAS
                  </h3>
                </div>
                <span className="text-[8px] bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded font-black font-mono">
                  Sistem Poin Aktif
                </span>
              </div>

              {/* User Reputation Scorecard */}
              <div className={`p-3.5 rounded-xl border flex items-center justify-between ${innerBoxThemeClasses}`}>
                <div>
                  <span className={`text-[8px] font-mono uppercase font-black block ${textMutedClasses}`}>REPUTASI ANDA</span>
                  <span className={`text-xs font-sans font-black ${headingClasses}`}>Analis Siber Junior</span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-mono font-black text-indigo-600 dark:text-indigo-400 block">{userReputation}</span>
                  <span className={`text-[8.5px] font-mono ${textMutedClasses}`}>Reputasi Pts</span>
                </div>
              </div>

              {/* Leaderboard list */}
              <div className="space-y-2.5">
                <span className={`text-[9px] font-mono uppercase font-black tracking-wider block ${textMutedClasses}`}>Peringkat Pembaca Teratas:</span>
                
                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                  {[
                    { rank: 1, name: 'Soni Sanjaya', points: 2840, badge: 'Ahli Fiskal Jabar', verified: true, self: false },
                    { rank: 2, name: 'Dewi Sartika', points: 1920, badge: 'Analisis Regional', verified: true, self: false },
                    { rank: 3, name: 'Sutisna', points: 1480, badge: 'Kontributor Mikro', verified: false, self: false },
                    { rank: 4, name: 'Ir. Hermawan', points: 1120, badge: 'Geolog Lembang', verified: true, self: false },
                    { rank: 5, name: 'Anda (Pembaca)', points: userReputation, badge: 'Analis Siber Junior', verified: false, self: true }
                  ].map((userItem) => (
                    <div 
                      key={userItem.rank} 
                      className={`p-2 rounded-xl flex items-center justify-between text-xs transition border ${
                        userItem.self 
                          ? 'bg-indigo-600/10 border-indigo-600/30' 
                          : `${innerBoxThemeClasses} hover:border-slate-400 dark:hover:border-slate-700`
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`font-mono font-black text-xs w-3 text-center ${textMutedClasses}`}>{userItem.rank}</span>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold font-mono text-[10px] ${
                          userItem.self ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}>
                          {userItem.name[0]}
                        </div>
                        <div className="leading-tight">
                          <div className="flex items-center gap-1">
                            <span className={`font-bold ${userItem.self ? 'text-indigo-600 dark:text-indigo-300' : headingClasses}`}>
                              {userItem.name}
                            </span>
                            {userItem.verified && (
                              <span className="text-blue-500 dark:text-blue-400 text-[8px]" title="Kontributor Terverifikasi">☑</span>
                            )}
                          </div>
                          <span className={`text-[8.5px] font-medium block ${textMutedClasses}`}>{userItem.badge}</span>
                        </div>
                      </div>
                      <span className="font-mono font-black text-amber-600 dark:text-amber-400 text-xs">{userItem.points} <span className={`text-[8px] font-normal ${textMutedClasses}`}>pts</span></span>
                    </div>
                  ))}
                </div>
              </div>

              <p className={`text-[9.5px] leading-normal border-t border-slate-200/60 dark:border-slate-800 pt-2 font-mono ${textMutedClasses}`}>
                💡 <strong>Dapatkan Poin:</strong> Berikan tanggapan (+5 pts), upvote berita (+10 pts), buat koleksi riset (+15 pts), atau ikuti reporter (+15 pts) untuk naik peringkat!
              </p>
            </div>

            {/* RELATED MEDIA CLUSTERS */}
            <div className={`rounded-2xl p-4 sm:p-5 space-y-4 border shadow-sm text-left ${cardThemeClasses}`}>
              <span className={`text-[10px] font-mono uppercase font-black tracking-widest block border-b border-slate-200/60 dark:border-slate-800 pb-2 ${headingClasses}`}>
                Rujukan Konten Terkait (Related Clusters)
              </span>

              <div className="space-y-2.5">
                {[
                  { title: "Menguak Potensi Heritage Bandung", type: "VIDEO LIVE TV", badge: "VIDEO", bg: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20" },
                  { title: "Gurita Inflasi Regional 2026", type: "PODCAST AUDIO", badge: "AUDIO", bg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
                  { title: "Katalog UMKM Braga & Kerajinan Tangan", type: "MARKETPLACE", badge: "UMKM", bg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
                  { title: "Riset Kebijakan Pariwisata PMK", type: "PDF DOCUMENT", badge: "RISUT", bg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`p-3 rounded-xl border hover:border-indigo-500 dark:hover:border-teal-500 transition cursor-pointer group ${innerBoxThemeClasses}`}
                    onClick={() => {
                      let tab = '';
                      let tabNameFormatted = '';
                      if (item.badge === 'VIDEO') {
                        tab = 'video-hub';
                        tabNameFormatted = 'Video Hub';
                      } else if (item.badge === 'AUDIO') {
                        tab = 'podcast-center';
                        tabNameFormatted = 'Podcast Center';
                      } else if (item.badge === 'UMKM') {
                        tab = 'marketplace-hub';
                        tabNameFormatted = 'Marketplace Hub';
                      } else if (item.badge === 'RISUT') {
                        tab = 'document-center';
                        tabNameFormatted = 'Document Center';
                      }

                      if (tab && onSelectTab) {
                        showToast(`Membuka Rujukan: "${item.title}" di ${tabNameFormatted}...`);
                        setTimeout(() => {
                          onSelectTab(tab);
                        }, 1000);
                      } else {
                        showToast(`Rujukan Konten "${item.title}" tidak dapat dibuka.`);
                      }
                    }}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className={`text-[8px] font-mono ${textMutedClasses}`}>{item.type}</span>
                      <span className={`text-[7px] font-mono font-black px-1.5 py-0.2 rounded uppercase border ${item.bg}`}>
                        {item.badge}
                      </span>
                    </div>
                    <h5 className={`text-xs font-bold group-hover:text-indigo-600 dark:group-hover:text-teal-400 transition leading-tight`}>
                      {item.title}
                    </h5>
                  </div>
                ))}
              </div>
            </div>

            {/* AD ZONE SIDEBAR */}
            <div className="sticky top-4">
              <AdZone zone="sidebar_sticky" pageContext={{ category: data.primaryCategoryId }} />
            </div>

          </div>

        </div>



      </div>

      {/* ==========================================
          9. FLOATING STICKY READING TOOLBAR
          ========================================== */}
      <div className="fixed bottom-[80px] md:bottom-4 inset-x-0 z-40 px-2 sm:px-4 pointer-events-none flex justify-center">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: showFloatingTools ? 0 : 100, opacity: showFloatingTools ? 1 : 0 }}
          className="bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl p-2 sm:p-3 max-w-2xl w-full flex items-center justify-between shadow-2xl pointer-events-auto"
        >
          {/* Scroll progress meter bar */}
          <div className="absolute top-0 inset-x-0 h-1 bg-slate-800 rounded-t-2xl overflow-hidden">
            <div className="h-full bg-teal-400" style={{ width: `${scrollProgress}%` }} />
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 w-full justify-between pt-1">
            
            {/* Left: Quick settings contrast */}
            <div className="flex items-center gap-1 sm:gap-1.5 border-r border-slate-800 pr-2 sm:pr-3">
              <button 
                onClick={() => handleToggleBookmark()} 
                className={`p-1 sm:p-1.5 rounded transition ${bookmarked ? 'text-teal-400' : 'text-slate-400 hover:text-white'}`}
                title={bookmarked ? "Hapus Bookmark" : "Simpan Berita"}
              >
                {bookmarked ? <BookmarkCheck className="h-4 w-4 sm:h-4.5 sm:w-4.5" /> : <Bookmark className="h-4 w-4 sm:h-4.5 sm:w-4.5" />}
              </button>

              <button 
                onClick={handleToggleTTS}
                className={`p-1 sm:p-1.5 rounded transition ${ttsPlaying ? 'text-teal-400 bg-teal-500/10' : 'text-slate-400 hover:text-white'}`}
                title="Dengarkan Audio Narasi (TTS)"
              >
                <Volume2 className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
              </button>
            </div>

            {/* Middle: Contrast settings & Font size scaling */}
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-[9px] font-mono text-slate-500 font-bold hidden md:inline">FONT SIZE:</span>
              <button 
                onClick={() => setFontSize(prev => Math.max(12, prev - 1))} 
                className="p-1 sm:p-1.5 rounded bg-slate-950 text-slate-300 font-mono text-[9px] sm:text-[10px] font-bold hover:bg-slate-850"
              >
                A-
              </button>
              <span className="text-[10px] sm:text-xs font-mono font-bold whitespace-nowrap">{fontSize}px</span>
              <button 
                onClick={() => setFontSize(prev => Math.min(22, prev + 1))} 
                className="p-1 sm:p-1.5 rounded bg-slate-950 text-slate-300 font-mono text-[9px] sm:text-[10px] font-bold hover:bg-slate-850"
              >
                A+
              </button>
            </div>

            <div className="flex items-center gap-0.5 sm:gap-1 border-l border-slate-800 pl-2 sm:pl-3">
              <span className="text-[9px] font-mono text-slate-500 font-bold hidden md:inline">KONTRAST:</span>
              {(['light', 'sepia', 'dark', 'contrast'] as const).map(theme => (
                <button
                  key={theme}
                  onClick={() => { setContrastTheme(theme); addAnalyticsLog(`Mengubah kontras ke: ${theme}`); }}
                  className={`px-1.5 py-0.5 sm:px-2 sm:py-1 text-[8px] sm:text-[9px] font-mono rounded uppercase transition border ${
                    contrastTheme === theme 
                      ? 'bg-teal-500 text-slate-950 border-teal-400 font-bold' 
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="hidden sm:inline">{theme}</span>
                  <span className="inline sm:hidden">{theme.substring(0, 1).toUpperCase()}</span>
                </button>
              ))}
            </div>

            {/* Right: Share, Dewan aduan, Ask AI triggers */}
            <div className="flex items-center gap-1 border-l border-slate-800 pl-2 sm:pl-3">
              <button 
                onClick={() => {
                  setShowShareModal(true);
                  addAnalyticsLog("Membuka Premium Share Hub.");
                }}
                className="p-1 sm:p-1.5 text-teal-400 hover:text-teal-300 hover:bg-teal-500/10 rounded-lg transition-all duration-200 flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2.5 border border-teal-500/20"
                title="Bagikan Berita (Premium Share Hub)"
              >
                <Share2 className="h-4 w-4 sm:h-4.5 sm:w-4.5 animate-pulse" />
                <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider hidden sm:inline">Bagikan</span>
              </button>

              <button 
                onClick={() => setShowReportModal(true)}
                className="p-1 sm:p-1.5 text-rose-400 hover:text-rose-300 rounded"
                title="Koreksi / Aduan Dewan Pers"
              >
                <ShieldAlert className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
              </button>
            </div>

          </div>
        </motion.div>
      </div>

      {/* Premium Share Hub Modal */}
      <AnimatePresence>
        {showShareModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShareModal(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Content Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative bg-slate-900 border border-slate-800 text-slate-100 p-6 rounded-2xl max-w-4xl w-full mx-4 shadow-2xl overflow-y-auto max-h-[90vh] z-10 text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowShareModal(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Title Header */}
              <div className="border-b border-slate-800 pb-4 mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="p-1.5 bg-teal-500/10 text-teal-400 rounded-lg border border-teal-500/20">
                    <Share2 className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-display font-black text-[#FFD700] uppercase tracking-wide">
                    Premium Share &amp; Communication Hub
                  </h3>
                </div>
                <p className="text-xs text-slate-400">
                  Bagikan kebenaran data, fakta kebijakan, dan kutipan penting artikel ini secara instan atau rancang poster kutipan premium Anda sendiri.
                </p>
              </div>

              {/* Main Two-Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Column 1: Direct Social Sharing & Live Stats */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-[10px] font-mono font-black uppercase text-slate-400 tracking-wider mb-3">
                      🔗 Bagikan Langsung Melalui Saluran Sosial
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {/* WhatsApp Button */}
                      <a
                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent((data?.title || '') + ' - Baca selengkapnya di INFOBOS: ' + window.location.href)}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => {
                          setShareMetrics(prev => ({ ...prev, whatsapp: prev.whatsapp + 1 }));
                          showToast("Membuka WhatsApp Share...");
                          addAnalyticsLog("Membagikan artikel ke WhatsApp.");
                        }}
                        className="p-3 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/40 hover:border-emerald-500/50 rounded-xl flex flex-col items-center justify-center text-center gap-1.5 transition duration-200 group"
                      >
                        <MessageCircle className="h-5 w-5 text-emerald-400 group-hover:scale-110 transition" />
                        <span className="text-[10px] font-bold text-emerald-300">WhatsApp</span>
                        <span className="text-[8px] font-mono text-emerald-500 font-bold">{shareMetrics.whatsapp} shares</span>
                      </a>

                      {/* Telegram Button */}
                      <a
                        href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(data?.title || '')}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => {
                          setShareMetrics(prev => ({ ...prev, telegram: prev.telegram + 1 }));
                          showToast("Membuka Telegram Share...");
                          addAnalyticsLog("Membagikan artikel ke Telegram.");
                        }}
                        className="p-3 bg-[#0088cc]/10 hover:bg-[#0088cc]/20 border border-[#0088cc]/30 hover:border-[#0088cc]/60 rounded-xl flex flex-col items-center justify-center text-center gap-1.5 transition duration-200 group"
                      >
                        <Send className="h-5 w-5 text-sky-400 group-hover:scale-110 transition" />
                        <span className="text-[10px] font-bold text-sky-300">Telegram</span>
                        <span className="text-[8px] font-mono text-sky-500 font-bold">{shareMetrics.telegram} shares</span>
                      </a>

                      {/* Twitter / X Button */}
                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`[INFOBOS] ${data?.title || ''}`)}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => {
                          setShareMetrics(prev => ({ ...prev, twitter: prev.twitter + 1 }));
                          showToast("Membuka Twitter/X Share...");
                          addAnalyticsLog("Membagikan artikel ke Twitter/X.");
                        }}
                        className="p-3 bg-slate-950/40 hover:bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-xl flex flex-col items-center justify-center text-center gap-1.5 transition duration-200 group"
                      >
                        <Twitter className="h-5 w-5 text-slate-200 group-hover:scale-110 transition" />
                        <span className="text-[10px] font-bold text-slate-300">Twitter / X</span>
                        <span className="text-[8px] font-mono text-slate-500 font-bold">{shareMetrics.twitter} shares</span>
                      </a>

                      {/* Facebook Button */}
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => {
                          setShareMetrics(prev => ({ ...prev, facebook: prev.facebook + 1 }));
                          showToast("Membuka Facebook Share...");
                          addAnalyticsLog("Membagikan artikel ke Facebook.");
                        }}
                        className="p-3 bg-[#3b5998]/10 hover:bg-[#3b5998]/20 border border-[#3b5998]/30 hover:border-[#3b5998]/60 rounded-xl flex flex-col items-center justify-center text-center gap-1.5 transition duration-200 group"
                      >
                        <Facebook className="h-5 w-5 text-blue-400 group-hover:scale-110 transition" />
                        <span className="text-[10px] font-bold text-blue-300">Facebook</span>
                        <span className="text-[8px] font-mono text-blue-500 font-bold">{shareMetrics.facebook} shares</span>
                      </a>

                      {/* LinkedIn Button */}
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => {
                          setShareMetrics(prev => ({ ...prev, linkedin: prev.linkedin + 1 }));
                          showToast("Membuka LinkedIn Share...");
                          addAnalyticsLog("Membagikan artikel ke LinkedIn.");
                        }}
                        className="p-3 bg-[#0077b5]/10 hover:bg-[#0077b5]/20 border border-[#0077b5]/30 hover:border-[#0077b5]/60 rounded-xl flex flex-col items-center justify-center text-center gap-1.5 transition duration-200 group"
                      >
                        <Linkedin className="h-5 w-5 text-[#0077b5] group-hover:scale-110 transition" />
                        <span className="text-[10px] font-bold text-slate-300">LinkedIn</span>
                        <span className="text-[8px] font-mono text-slate-500 font-bold">{shareMetrics.linkedin} shares</span>
                      </a>

                      {/* Copy Link Button */}
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          showToast("Link berhasil disalin ke clipboard!");
                          addAnalyticsLog("Menyalin tautan berita ke clipboard.");
                        }}
                        className="p-3 bg-[#FFD700]/5 hover:bg-[#FFD700]/10 border border-[#FFD700]/15 hover:border-[#FFD700]/50 rounded-xl flex flex-col items-center justify-center text-center gap-1.5 transition duration-200 group cursor-pointer"
                      >
                        <LinkIcon className="h-5 w-5 text-[#FFD700] group-hover:scale-110 transition" />
                        <span className="text-[10px] font-bold text-[#FFD700]">Salin Link</span>
                        <span className="text-[8px] font-mono text-slate-400 font-bold">Copy URL</span>
                      </button>
                    </div>
                  </div>

                  {/* Dynamic Metrics Panel */}
                  <div className="bg-slate-950/65 border border-slate-800 p-4 rounded-xl space-y-3.5">
                    <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                      <h5 className="text-[10px] font-mono font-bold uppercase text-[#FFD700] tracking-wider flex items-center gap-1">
                        <TrendingUp className="h-3.5 w-3.5 text-emerald-500 animate-pulse" />
                        Distribusi Share &amp; Keaktifan Pembaca
                      </h5>
                      <span className="text-[8px] bg-slate-800 text-slate-400 font-mono font-bold px-1.5 py-0.2 rounded uppercase">
                        REALTIME
                      </span>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      {Object.entries(shareMetrics).map(([platform, count]) => {
                        const values = Object.values(shareMetrics) as number[];
                        const total = values.reduce((acc: number, val: number) => acc + val, 0);
                        const percentage = total > 0 ? Math.round(((count as number) / total) * 100) : 0;
                        return (
                          <div key={platform} className="space-y-1">
                            <div className="flex justify-between text-[10px] font-mono text-slate-400">
                              <span className="capitalize">{platform}</span>
                              <span>{count} kali ({percentage}%)</span>
                            </div>
                            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                              <div 
                                className={`h-full transition-all duration-1000 ${
                                  platform === 'whatsapp' ? 'bg-emerald-500' :
                                  platform === 'telegram' ? 'bg-sky-400' :
                                  platform === 'twitter' ? 'bg-slate-200' :
                                  platform === 'facebook' ? 'bg-blue-600' : 'bg-[#0077b5]'
                                }`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="text-[9px] text-slate-500 leading-relaxed pt-1 flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping shrink-0" />
                      <span>Tren Berita: Topik ini masuk 5 besar paling banyak dibagikan di Bandung Barat hari ini.</span>
                    </div>
                  </div>
                </div>

                {/* Column 2: Quote Card Poster Studio */}
                <div className="space-y-5 border-t md:border-t-0 md:border-l border-slate-800 pt-6 md:pt-0 md:pl-6">
                  <div>
                    <h4 className="text-[10px] font-mono font-black uppercase text-slate-400 tracking-wider mb-3">
                      🎨 Studio Pembuat Kartu Kutipan (Quote Card Creator)
                    </h4>
                    <p className="text-[11px] text-slate-400 mb-3.5">
                      Rancang visual quote dari artikel untuk dibagikan ke Instagram, WhatsApp status, atau media sosial lainnya secara estetik.
                    </p>
                  </div>

                  {/* Gradient Card Preview */}
                  <div className={`p-6 rounded-2xl bg-gradient-to-br ${cardGradient} text-white shadow-lg space-y-4 relative min-h-[180px] flex flex-col justify-between border border-white/10 overflow-hidden`}>
                    <div className="absolute top-2 right-2 text-[8px] font-mono opacity-50 uppercase tracking-widest font-black">
                      INFOBOS CARD
                    </div>
                    
                    {/* Decorator */}
                    <span className="text-4xl text-white/20 font-serif absolute top-1 left-2 select-none">“</span>
                    
                    <p className="text-xs font-serif italic relative z-10 leading-relaxed pt-2 line-clamp-4">
                      &ldquo;{selectedQuote || "Fakta Berita Jawa Barat Terkini"}&rdquo;
                    </p>

                    <div className="border-t border-white/25 pt-2 flex justify-between items-end relative z-10">
                      <div className="min-w-0">
                        <span className="text-[9px] font-bold block truncate max-w-[200px]">
                          Topik: {data?.title || 'Fakta Kebijakan Regional'}
                        </span>
                        <span className="text-[7px] text-white/60 font-mono block">
                          SUMBER: INFOBOS MEDIA HUB
                        </span>
                      </div>
                      <div className="w-8 h-8 bg-white text-slate-900 rounded p-0.5 flex items-center justify-center text-[5px] font-mono">
                        QR CODE
                      </div>
                    </div>
                  </div>

                  {/* Interactive Controls */}
                  <div className="space-y-3 bg-slate-950/45 p-3 rounded-xl border border-slate-850">
                    {/* Text editor */}
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        Ubah Teks Kutipan:
                      </label>
                      <textarea
                        value={selectedQuote}
                        onChange={(e) => setSelectedQuote(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-teal-500/50 resize-none h-16 scrollbar-thin"
                        placeholder="Tulis kutipan penting Anda dari artikel..."
                        maxLength={220}
                      />
                      <div className="text-right text-[8px] text-slate-500 font-mono">
                        {selectedQuote.length}/220 karakter
                      </div>
                    </div>

                    {/* Gradient Selector */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        Pilih Gaya Background:
                      </label>
                      <div className="flex gap-2">
                        {[
                          { id: 'indigo', classes: 'from-indigo-600 via-purple-600 to-pink-600', label: 'Neon Purple' },
                          { id: 'sunset', classes: 'from-amber-500 to-rose-600', label: 'Sunset' },
                          { id: 'emerald', classes: 'from-teal-600 to-emerald-500', label: 'Forest' },
                          { id: 'ocean', classes: 'from-blue-600 to-cyan-500', label: 'Ocean' },
                          { id: 'slate', classes: 'from-slate-950 via-slate-900 to-slate-950 border border-slate-800', label: 'Cosmic Slate' }
                        ].map((grad) => (
                          <button
                            key={grad.id}
                            onClick={() => setCardGradient(grad.classes)}
                            className={`w-6 h-6 rounded-full bg-gradient-to-br ${grad.classes} border transition duration-200 relative ${
                              cardGradient === grad.classes ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110' : 'opacity-80 hover:opacity-100'
                            }`}
                            title={grad.label}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Download Action */}
                  <button
                    onClick={handleDownloadShareCard}
                    className="w-full py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-sans font-black text-xs uppercase tracking-wider rounded-xl transition duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Poster Kutipan (PNG)</span>
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FLOATING AI ASSISTANT WIDGET LAUNCHER & DRAWER */}
      {/* Floating Button on bottom-right of viewport */}
      <div className="hidden md:block fixed bottom-[94px] right-4 z-[100]">
        <button
          onClick={() => {
            setIsAiAssistantOpen(!isAiAssistantOpen);
            addAnalyticsLog("Membuka Asisten AI dari Floating FAB.");
          }}
          className="p-2 md:p-2.5 bg-gradient-to-r from-teal-500 to-indigo-600 text-white rounded-full shadow-2xl hover:scale-110 transition duration-300 flex items-center justify-center cursor-pointer group border border-teal-400/30"
          title="Buka Asisten AI Lite"
        >
          <Sparkles className="h-4 w-4 md:h-4.5 md:w-4.5 animate-pulse group-hover:rotate-12 transition-transform" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 text-[10px] font-mono font-bold uppercase transition-all duration-300 whitespace-nowrap">
            Asisten AI Baca
          </span>
        </button>
      </div>

      {/* Slide-out Sidebar Drawer for Asisten AI Widget */}
      <AnimatePresence>
        {isAiAssistantOpen && (
          <>
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAiAssistantOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-[110]"
            />
            
            {/* Sliding Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed inset-y-0 right-0 z-[120] w-full sm:w-[500px] md:w-[540px] bg-slate-50 dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-teal-500 to-indigo-600 text-white rounded-lg shadow-inner flex items-center justify-center">
                    <Sparkles className="h-4 w-4 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-black uppercase tracking-widest text-teal-600 dark:text-teal-400 block leading-none mb-1">
                      WIDGET PANEL
                    </span>
                    <h3 className={`text-xs font-sans font-black uppercase tracking-tight ${headingClasses}`}>
                      Asisten AI Lite: Verifikasi &amp; Summary
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setIsAiAssistantOpen(false)}
                  className="px-3 py-1.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg transition text-[10px] font-mono font-bold"
                >
                  TUTUP [✕]
                </button>
              </div>

              {/* Scrollable Container with Assistant widget inside */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
                  <AiReadingAssistantWidget
                    activeLanguage={activeLanguage}
                    data={data}
                    aiSummaryLevel={aiSummaryLevel}
                    setAiSummaryLevel={setAiSummaryLevel}
                    factCheckActive={factCheckActive}
                    factCheckScanning={factCheckScanning}
                    factCheckScanMessage={factCheckScanMessage}
                    factCheckScanProgress={factCheckScanProgress}
                    currentFactCheckData={currentFactCheckData}
                    selectedClaim={selectedClaim}
                    setSelectedClaim={setSelectedClaim}
                    factCheckHighlightsActive={factCheckHighlightsActive}
                    setFactCheckHighlightsActive={setFactCheckHighlightsActive}
                    handleRunFactCheck={handleRunFactCheck}
                    activeMediaComp={activeMediaComp}
                    setActiveMediaComp={setActiveMediaComp}
                    cardThemeClasses="bg-transparent border-0 shadow-none p-0 space-y-6"
                    innerBoxThemeClasses={innerBoxThemeClasses}
                    textMutedClasses={textMutedClasses}
                    headingClasses={headingClasses}
                    contrastTheme={contrastTheme}
                    whyItMattersText={translatedArticle[activeLanguage]?.summary || TRANSLATIONS.summary[activeLanguage] || data.summary}
                    ttsPlaying={ttsPlaying}
                    ttsCurrentIndex={ttsCurrentIndex}
                    hideHeader={true}
                  />
                </div>
                
                <p className="text-[10px] text-slate-400 dark:text-slate-600 text-center font-mono leading-relaxed">
                  💡 Gunakan fitur Asisten AI di atas untuk mempercepat pemahaman bacaan Anda secara instan dan memverifikasi integritas berita.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Custom Toast Banner */}
      <AnimatePresence>
        {customToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[120] bg-[#002B5B] text-white px-5 py-3 rounded-full shadow-2xl border border-[#FFD700]/30 flex items-center gap-2 text-xs font-mono font-bold"
          >
            <Sparkles className="h-4 w-4 text-[#FFD700] animate-spin" />
            <span>{customToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
