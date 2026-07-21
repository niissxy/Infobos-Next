import React, { useState, useEffect, useMemo } from 'react';
import { 
  Network, Activity, FileCode, CheckCircle, Search, Compass, ShieldCheck, 
  Layers, Cpu, History, UserCheck, MapPin, Sparkles, Globe, Rss, Link, 
  Info, ExternalLink, Calendar, BookOpen, BarChart3, HelpCircle, FileText,
  Home, Newspaper, Video, Hash, Users, Map, FolderSearch, Radio, ShoppingCart, 
  Lock, Briefcase, Settings, ArrowRight, Check, Copy, CheckCircle2, ListFilter, Download, ChevronDown
} from 'lucide-react';
import { ENHANCED_SITEMAP_80, SitemapItem } from '../data/enhancedSitemap';

interface SEOHubProps {
  onNavigateToCategory?: (categorySlug: string) => void;
}

export const sitemapModules = [
  {
    id: 1,
    name: '1. Home',
    slug: 'home',
    description: 'Homepage Portal Utama INFOBOS',
    icon: Home,
    children: [
      'Breaking News', 'Live News', 'Latest News', 'Trending', 'Editor Picks', 
      'Most Read', 'Most Shared', 'Most Commented', 'Featured Videos', 
      'Trending Shorts', 'Latest Podcasts', 'Featured Articles', 'Infographics', 
      'Gallery', 'Newsletter', 'Events', 'Advertisement'
    ],
    details: 'Berfungsi sebagai landasan utama (landing page) media yang menyajikan ringkasan real-time dari seluruh cluster data, video, podcast, dan berita utama terhangat.'
  },
  {
    id: 2,
    name: '2. News',
    slug: 'news',
    description: 'Portal Berita & Rubrik Jurnalistik Utama',
    icon: Newspaper,
    children: [
      'Breaking News', 'Live', 'Nasional', 'Internasional', 'Politik', 'Pemerintahan', 
      'Hukum', 'Kriminal', 'Ekonomi', 'Bisnis', 'Startup', 'Teknologi', 'AI', 
      'Pendidikan', 'Kesehatan', 'Sains', 'Lingkungan', 'Energi', 'Properti', 
      'Otomotif', 'Olahraga', 'Entertainment', 'Lifestyle', 'Travel', 'Food', 
      'Religi', 'UMKM', 'Opini', 'Editorial', 'Investigasi', 'Explainer', 'Fact Check', 
      'Special Report', 'Archive'
    ],
    details: 'Mewakili minimal 60% dari seluruh komposisi muatan media. Merupakan tiang penyangga utama untuk mendapatkan status kualifikasi Google News Publisher.'
  },
  {
    id: 3,
    name: '3. Media Center',
    slug: 'media',
    description: 'Semua Media Digital & Multimedia Hub',
    icon: Video,
    children: [
      'Articles', 'Blogs', 'Videos', 'Shorts', 'Podcasts', 'Live Streaming', 
      'Webinar', 'Gallery', 'Photos', 'Infographics', 'Documents', 'Whitepaper', 
      'Ebook', 'Presentation', 'Newsletter', 'RSS', 'Press Release', 'Social Feed', 
      'Media Library'
    ],
    details: 'Mengklasifikasikan aset non-teks dan format kaya interaktif seperti video, siaran podcast intelektual, hingga dokumen riset teoretis.'
  },
  {
    id: 4,
    name: '4. Social Media Hub',
    slug: 'social-media',
    description: 'Saluran Publikasi Eksternal Terintegrasi',
    icon: Radio,
    children: [
      'YouTube', 'YouTube Shorts', 'TikTok', 'Instagram', 'Instagram Reels', 
      'Facebook', 'Facebook Reels', 'X', 'Threads', 'LinkedIn', 'Reddit', 
      'Pinterest', 'Telegram', 'WhatsApp Channel', 'Discord', 'Medium', 
      'Substack', 'RSS Feed'
    ],
    details: 'Pintu gerbang otomatisasi feed artikel ke platform media sosial global guna mempercepat viralitas terarah (ContentOS / VIRALOG).'
  },
  {
    id: 5,
    name: '5. Topics',
    slug: 'topics',
    description: 'Topic Cluster & Entitas Pengetahuan',
    icon: Hash,
    children: [
      'Artificial Intelligence', 'Startup', 'Cryptocurrency', 'Climate', 'Economy', 
      'Education', 'Election', 'Healthcare', 'Tourism', 'Sports', 'Entertainment', 
      'Fashion', 'Food', 'Automotive', 'Property', 'Energy', 'ESG', 'Investment', 
      'Thousands More'
    ],
    details: 'Topic Hub dinamis yang mengelompokkan artikel jurnalisme ke dalam kluster taksonomi spesifik agar disukai robot penjelajah mesin pencari.'
  },
  {
    id: 6,
    name: '6. Entity Hub',
    slug: 'entities',
    description: 'Entity Intelligence & Pemetaan Profil',
    icon: Users,
    children: [
      'People', 'Companies', 'Brands', 'Products', 'Organizations', 'Government', 
      'Universities', 'Schools', 'Hospitals', 'Hotels', 'Restaurants', 'Tourism', 
      'Airports', 'Stations', 'Sports Clubs', 'Movies', 'Books', 'Podcasts', 
      'YouTube Channels', 'Events'
    ],
    details: 'Hub kecerdasan entitas yang memetakan relasi subjek orang, perusahaan, brand, dan organisasi untuk memperkaya metadata penjelajahan.'
  },
  {
    id: 7,
    name: '7. Geo Hub',
    slug: 'geo',
    description: 'Geo Intelligence & Informasi Berbasis Spasial',
    icon: MapPin,
    children: [
      'World', 'Asia', 'Indonesia', 'Province', 'City', 'District', 'Village', 
      'Maps', 'Weather', 'Disaster', 'Economy', 'Tourism', 'Education', 'Health', 
      'Local News'
    ],
    details: 'Layanan informasi berbasis pemetaan geografis dari regional Jawa Barat, nasional, hingga mancanegara guna mendukung keakuratan geospasial.'
  },
  {
    id: 8,
    name: '8. Directory',
    slug: 'directory',
    description: 'Direktori Premium Instansi & Komunitas',
    icon: FolderSearch,
    children: [
      'Companies', 'Brands', 'Products', 'Government', 'Universities', 'Schools', 
      'Hospitals', 'Hotels', 'Restaurants', 'Coffee Shops', 'Tourism', 'Coworking', 
      'Startup', 'Communities', 'Agencies', 'NGOs', 'Media', 'Public Services'
    ],
    details: 'Katalog terverifikasi dan termonitor untuk memberikan rujukan instansi, lembaga akademis, lokasi wisata, serta layanan publik kredibel.'
  },
  {
    id: 9,
    name: '9. Research Center',
    slug: 'research',
    description: 'Pusat Analisis Riset & Whitepapers Akademis',
    icon: BookOpen,
    children: [
      'Research Papers', 'Whitepapers', 'Journal Summary', 'Reports', 'Statistics', 
      'Datasets', 'Dashboard', 'AI Insight', 'Market Insight', 'Industry Insight', 
      'Infographic', 'Visualization', 'Downloads'
    ],
    details: 'Repository kajian ilmiah mandiri, ringkasan jurnal, dan infografis statistik padat data yang mendongkrak skor kredibilitas akademis (Authority).'
  },
  {
    id: 10,
    name: '10. Monitoring Center',
    slug: 'monitoring',
    description: 'Media Monitoring & Trend Intelligence Platform',
    icon: Activity,
    children: [
      'News Monitoring', 'Brand Monitoring', 'Company Monitoring', 'Government Monitoring', 
      'Social Monitoring', 'Trend Monitoring', 'Keyword Monitoring', 'Entity Monitoring', 
      'Geo Monitoring', 'Competitor Monitoring', 'Sentiment Monitoring', 'Campaign Monitoring', 
      'Media Monitoring'
    ],
    details: 'Dashboard monitoring sentimen, melacak pergerakan kompetitor, isu regional, serta monitoring brand secara terus menerus.'
  },
  {
    id: 11,
    name: '11. Marketplace',
    slug: 'marketplace',
    description: 'Advertising, Promotion, & Monetisasi AdOS',
    icon: ShoppingCart,
    children: [
      'Advertise With Us', 'Self Service Ads', 'Media Kit', 'Rate Card', 
      'Sponsored Articles', 'Sponsored Videos', 'Sponsored Podcasts', 'Sponsored Newsletter', 
      'Premium Listings', 'Featured Companies', 'Featured Brands', 'Event Promotion', 
      'Recruitment Ads', 'Banner Booking', 'Campaign Dashboard', 'Affiliate Marketplace'
    ],
    details: 'Layanan terintegrasi AdOS untuk pemesanan slot iklan mandiri, sewa banner digital, promosi webinar, serta pengadaan kemitraan media kit.'
  },
  {
    id: 12,
    name: '12. Community',
    slug: 'community',
    description: 'User, Creator, & Contributor Ecosystem',
    icon: UserCheck,
    children: [
      'Creators', 'Journalists', 'Contributors', 'Authors', 'Experts', 'Communities', 
      'Forums', 'Discussions', 'Comments', 'Polls', 'Surveys', 'Leaderboard', 
      'Rewards', 'Ambassador'
    ],
    details: 'Wadah kolaborasi jurnalis warga, pakar bersertifikasi, kontributor opini independen, serta sistem perolehan poin rewards penulis.'
  },
  {
    id: 13,
    name: '13. My Account',
    slug: 'account',
    description: 'Portal Anggota & Preferensi Pembaca',
    icon: Lock,
    children: [
      'Dashboard', 'My Profile', 'Saved News', 'Saved Videos', 'Saved Podcasts', 
      'Saved Documents', 'Reading History', 'Watch History', 'Listening History', 
      'Following', 'Notifications', 'Subscription', 'Billing', 'API Keys', 
      'Preferences', 'Logout'
    ],
    details: 'Menyediakan dasbor personal bagi pembaca terdaftar untuk menyimpan konten favorit, melihat riwayat membaca, serta mengelola kunci API personal.'
  },
  {
    id: 14,
    name: '14. Business / Advertiser Portal',
    slug: 'business-portal',
    description: 'Dasbor Promosi Kampanye Pengiklan Mandiri',
    icon: Briefcase,
    children: [
      'Dashboard', 'My Campaigns', 'Campaign Builder', 'Creative Assets', 
      'Banner Upload', 'Video Upload', 'Ad Placement', 'Audience Targeting', 
      'Budget', 'Schedule', 'Approval', 'Analytics', 'Invoice', 'Payment', 
      'Contracts', 'Support Ticket', 'Team Members'
    ],
    details: 'Dasbor komprehensif bagi agensi iklan dan klien korporat untuk memantau metrik performa kampanye ads, tagihan, serta penargetan audiens.'
  },
  {
    id: 15,
    name: '15. CMS / Internal ContentOS',
    slug: 'cms-internal',
    description: 'ContentOS (VIRALOG) & Media Intelligence Engine',
    icon: Settings,
    children: [
      'Dashboard', 'Content', 'News', 'Blog', 'Video', 'Shorts', 'Podcast', 
      'Documents', 'Gallery', 'Categories', 'Topics', 'Tags', 'Entities', 
      'Geo', 'Authors', 'Users', 'Workflow', 'AI Assistant', 'SEO', 'Ads', 
      'Analytics', 'Monitoring', 'Media Library', 'Settings', 'Backup', 
      'Audit Log', 'System'
    ],
    details: 'Mesin tata kelola internal tim redaksi yang mengintegrasikan kecerdasan buatan, persetujuan naskah (workflow), serta pengawasan sistem.'
  }
];

export default function SEOHub({ onNavigateToCategory }: SEOHubProps) {
  const [activeSubTab, setActiveSubTab] = useState<'master-sitemap' | 'urls' | 'schemas' | 'sitemaps' | 'aiseo' | 'eeat'>('master-sitemap');
  const [selectedModuleId, setSelectedModuleId] = useState<number>(1);
  const [sitemapSearchQuery, setSitemapSearchQuery] = useState<string>('');
  const [crawlerStatus, setCrawlerStatus] = useState<'idle' | 'running' | 'success'>('idle');
  const [copiedState, setCopiedState] = useState<boolean>(false);
  const [articles, setArticles] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedArticleId, setSelectedArticleId] = useState<string>('');
  const [selectedSchemaType, setSelectedSchemaType] = useState<string>('NewsArticle');
  const [selectedSitemap, setSelectedSitemap] = useState<string>('news-sitemap.xml');
  const [loading, setLoading] = useState<boolean>(true);

  // States for 80-Node Master Sitemap Table
  const [sitemapViewMode, setSitemapViewMode] = useState<'master-table' | 'modules'>('master-table');
  const [sitemap80Search, setSitemap80Search] = useState<string>('');
  const [selectedMainMenuFilter, setSelectedMainMenuFilter] = useState<string>('Semua');
  const [selectedSitemap80Item, setSelectedSitemap80Item] = useState<SitemapItem | null>(null);
  const [sitemap80Items, setSitemap80Items] = useState<SitemapItem[]>(ENHANCED_SITEMAP_80);
  const [bulkCrawlProgress, setBulkCrawlProgress] = useState<number>(-1); // -1 = not running, 0..100 = progress

  // Unique list of Menu Utama for filter dropdown
  const uniqueMainMenus = useMemo(() => {
    const menus = sitemap80Items.map(item => item.mainMenu);
    return ['Semua', ...Array.from(new Set(menus))];
  }, [sitemap80Items]);

  // Filter 80 sitemap items based on search and main menu selection
  const filtered80Items = useMemo(() => {
    return sitemap80Items.filter(item => {
      const query = sitemap80Search.toLowerCase();
      const matchesSearch = 
        item.mainMenu.toLowerCase().includes(query) ||
        item.subMenu.toLowerCase().includes(query) ||
        item.detail.toLowerCase().includes(query) ||
        item.slug.toLowerCase().includes(query);
      
      const matchesFilter = selectedMainMenuFilter === 'Semua' || item.mainMenu === selectedMainMenuFilter;
      
      return matchesSearch && matchesFilter;
    });
  }, [sitemap80Items, sitemap80Search, selectedMainMenuFilter]);

  const handleBulkCrawl = () => {
    setBulkCrawlProgress(0);
    const interval = setInterval(() => {
      setBulkCrawlProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Set all items to status = 'crawled'
          setSitemap80Items(current => 
            current.map(item => ({ ...item, status: 'crawled' }))
          );
          setTimeout(() => setBulkCrawlProgress(-1), 1500);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const handleExportCSV = () => {
    const headers = 'No,Menu Utama,Sub Menu,Sub Kategori / Detail,SEO Slug,Priority,Changefreq,Status\n';
    const rows = sitemap80Items.map(item => 
      `"${item.no}","${item.mainMenu}","${item.subMenu}","${item.detail}","/${item.slug}","${item.priority}","${item.changefreq}","${item.status}"`
    ).join('\n');
    handleCopy(headers + rows);
    alert('Sitemap CSV berhasil disalin ke clipboard!');
  };

  const handleExportJSON = () => {
    handleCopy(JSON.stringify(sitemap80Items, null, 2));
    alert('Sitemap JSON-LD Dataset berhasil disalin ke clipboard!');
  };

  const filteredModules = sitemapModules.filter(mod => {
    if (!sitemapSearchQuery) return true;
    const query = sitemapSearchQuery.toLowerCase();
    const matchName = mod.name.toLowerCase().includes(query);
    const matchDesc = mod.description.toLowerCase().includes(query);
    const matchChildren = mod.children.some(child => child.toLowerCase().includes(query));
    return matchName || matchDesc || matchChildren;
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 2000);
  };

  // Load articles and categories from local server database
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('/api/v1/contents').then(res => res.json()),
      fetch('/api/v1/categories').then(res => res.json())
    ])
    .then(([contentsData, categoriesData]) => {
      const list = contentsData.contents || [];
      setArticles(list);
      setCategories(categoriesData.categories || []);
      if (list.length > 0) {
        setSelectedArticleId(list[0].id);
      }
      setLoading(false);
    })
    .catch(err => {
      console.error("Gagal memuat data SEO:", err);
      setLoading(false);
    });
  }, []);

  const activeArticle = articles.find(a => a.id === selectedArticleId) || articles[0];

  // Brand Position Statement
  const brandPosition = "INFOBOS adalah Portal Berita, Media Digital, dan Information Intelligence Platform yang menyajikan berita, analisis, video, podcast, serta informasi terverifikasi.";

  // Content Mix Stats
  const contentMixData = [
    { type: 'News (Berita Utama)', current: '60%', target: '60%', color: 'bg-indigo-600', desc: 'Fokus berita nasional, politik, ekonomi, & global' },
    { type: 'Breaking News', current: '11%', target: '10%', color: 'bg-red-600', desc: 'Liputan langsung & berita kilat' },
    { type: 'Analysis & Explainer', current: '10%', target: '10%', color: 'bg-teal-600', desc: 'Kajian mendalam isu-isu strategis' },
    { type: 'Video TV & Shorts', current: '8%', target: '8%', color: 'bg-amber-500', desc: 'Portal audio-visual interaktif' },
    { type: 'Podcast Center', current: '4%', target: '4%', color: 'bg-emerald-600', desc: 'Bincang intelijen & analisis suara' },
    { type: 'Infografik & Foto', current: '3%', target: '3%', color: 'bg-purple-500', desc: 'Visualisasi data padat informasi' },
    { type: 'Blog & Knowledge', current: '2%', target: '3%', color: 'bg-slate-500', desc: 'Catatan redaksi & arsip pengetahuan' },
    { type: 'Dokumen & Riset', current: '2%', target: '2%', color: 'bg-pink-600', desc: 'Whitepaper, riset mandiri, & data mentah' }
  ];

  // News URL Structures
  const urlStructures = [
    { type: 'Berita Politik', url: '/news/politik', slug: 'politik', status: '200 OK', index: 'Indexed', typeLabel: 'Category' },
    { type: 'Berita Ekonomi', url: '/news/ekonomi', slug: 'ekonomi', status: '200 OK', index: 'Indexed', typeLabel: 'Category' },
    { type: 'Berita Teknologi', url: '/news/teknologi', slug: 'teknologi', status: '200 OK', index: 'Indexed', typeLabel: 'Category' },
    { type: 'Berita Olahraga', url: '/news/olahraga', slug: 'olahraga', status: '200 OK', index: 'Indexed', typeLabel: 'Category' },
    { type: 'Berita Internasional', url: '/news/internasional', slug: 'internasional', status: '200 OK', index: 'Indexed', typeLabel: 'Category' },
    { type: 'Berita Lifestyle', url: '/news/lifestyle', slug: 'lifestyle', status: '200 OK', index: 'Indexed', typeLabel: 'Category' },
    { type: 'Breaking News', url: '/breaking-news', slug: 'breaking-news', status: '200 OK', index: 'Indexed', typeLabel: 'System' },
    { type: 'Live Coverage', url: '/live', slug: 'live', status: '200 OK', index: 'Indexed (Real-time)', typeLabel: 'System' },
    { type: 'Videos Hub', url: '/videos', slug: 'videos', status: '200 OK', index: 'Indexed', typeLabel: 'Media' },
    { type: 'Shorts Video', url: '/shorts', slug: 'shorts', status: '200 OK', index: 'Indexed', typeLabel: 'Media' },
    { type: 'Podcasts Center', url: '/podcasts', slug: 'podcasts', status: '200 OK', index: 'Indexed', typeLabel: 'Media' },
    { type: 'Blog Intel', url: '/blog', slug: 'blog', status: '200 OK', index: 'Indexed', typeLabel: 'Editorial' },
    { type: 'Gallery Center', url: '/photos', slug: 'photos', status: '200 OK', index: 'Indexed', typeLabel: 'Media' },
    { type: 'Infographics', url: '/infographics', slug: 'infographics', status: '200 OK', index: 'Indexed', typeLabel: 'Media' },
    { type: 'Research & Documents', url: '/research', slug: 'research', status: '200 OK', index: 'Indexed', typeLabel: 'Academic' },
    { type: 'Fact Check Portal', url: '/fact-check', slug: 'fact-check', status: '200 OK', index: 'Indexed', typeLabel: 'E-E-A-T' },
    { type: 'Dynamic Topic AI', url: '/topics/ai', slug: 'topics/ai', status: '200 OK', index: 'Indexed', typeLabel: 'Topic Cluster' },
    { type: 'Dynamic Topic Election', url: '/topics/election', slug: 'topics/election', status: '200 OK', index: 'Indexed', typeLabel: 'Topic Cluster' },
    { type: 'Entity Spotlight Apple', url: '/entities/apple', slug: 'entities/apple', status: '200 OK', index: 'Indexed', typeLabel: 'Entity Cluster' },
    { type: 'Entity Spotlight OpenAI', url: '/entities/openai', slug: 'entities/openai', status: '200 OK', index: 'Indexed', typeLabel: 'Entity Cluster' },
    { type: 'Geo Target Indonesia', url: '/geo/indonesia', slug: 'geo/indonesia', status: '200 OK', index: 'Indexed', typeLabel: 'Geo Cluster' },
    { type: 'Geo Target Jawa Barat', url: '/geo/jawa-barat', slug: 'geo/jawa-barat', status: '200 OK', index: 'Indexed', typeLabel: 'Geo Cluster' },
    { type: 'Geo Target Bandung', url: '/geo/bandung', slug: 'geo/bandung', status: '200 OK', index: 'Indexed', typeLabel: 'Geo Cluster' },
    { type: 'Author Bios', url: '/authors', slug: 'authors', status: '200 OK', index: 'Indexed', typeLabel: 'E-E-A-T' },
    { type: 'Sitemap Feeds', url: '/tags', slug: 'tags', status: '200 OK', index: 'Indexed', typeLabel: 'Sitemap' }
  ];

  // Helper to generate dynamic simulated schemas
  const getSimulatedSchema = () => {
    if (!activeArticle) return "{}";

    const baseOrg = {
      "@context": "https://schema.org",
      "@type": "NewsMediaOrganization",
      "name": "INFOBOS",
      "url": "https://infobos.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://infobos.com/logo.png",
        "width": 600,
        "height": 60
      },
      "sameAs": [
        "https://facebook.com/infobos",
        "https://twitter.com/infobos",
        "https://instagram.com/infobos"
      ],
      "publishingPrinciples": "https://infobos.com/editorial-policy",
      "correctionsPolicy": "https://infobos.com/corrections-policy"
    };

    switch (selectedSchemaType) {
      case 'NewsMediaOrganization':
        return JSON.stringify(baseOrg, null, 2);

      case 'NewsArticle':
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://infobos.com/news/${activeArticle.categorySlug || 'umum'}/${activeArticle.slug}`
          },
          "headline": activeArticle.title,
          "alternativeHeadline": activeArticle.subtitle || undefined,
          "image": [
            activeArticle.heroImageUrl || "https://infobos.com/default-banner.png"
          ],
          "datePublished": activeArticle.createdAt,
          "dateModified": activeArticle.updatedAt || activeArticle.createdAt,
          "author": {
            "@type": "Person",
            "name": activeArticle.authorName || "Redaksi INFOBOS",
            "url": `https://infobos.com/authors/${activeArticle.authorId || 'redaksi'}`
          },
          "publisher": {
            "@type": "NewsMediaOrganization",
            "name": "INFOBOS",
            "logo": {
              "@type": "ImageObject",
              "url": "https://infobos.com/logo.png"
            }
          },
          "description": activeArticle.summary,
          "speakable": {
            "@type": "SpeakableSpecification",
            "xpath": [
              "/html/head/title",
              "/html/meta[@name='description']/@content"
            ]
          }
        }, null, 2);

      case 'LiveBlogPosting':
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LiveBlogPosting",
          "@id": "https://infobos.com/live/pilkada-jabar-2026",
          "headline": "LIVE: Kawal Real Count Pilkada Jawa Barat 2026",
          "coverageStartTime": "2026-06-26T08:00:00Z",
          "coverageEndTime": "2026-06-26T20:00:00Z",
          "liveBlogUpdate": [
            {
              "@type": "BlogPosting",
              "@id": "https://infobos.com/live/pilkada-jabar-2026#update-1",
              "headline": "KPU Memulai Rapat Pleno Rekapitulasi",
              "datePublished": "2026-06-26T10:00:00Z",
              "dateModified": "2026-06-26T10:00:00Z",
              "articleBody": "Komisi Pemilihan Umum Jawa Barat resmi membuka rekapitulasi real count suara wilayah Bandung Raya..."
            }
          ]
        }, null, 2);

      case 'FAQPage':
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Apa fokus utama dari kajian revitalisasi wisata Bandung?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Fokus utamanya adalah menyeimbangkan pelestarian warisan kolonial (heritage) dengan integrasi ekonomi modern bagi pelaku UMKM lokal."
              }
            },
            {
              "@type": "Question",
              "name": "Bagaimana kontribusi INFOBOS dalam menguji fakta informasi?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "INFOBOS memiliki rubrik Fact Check independen dan mengikuti pedoman cek fakta ketat untuk melawan disinformasi di ruang siber Jawa Barat."
              }
            }
          ]
        }, null, 2);

      case 'VideoObject':
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "VideoObject",
          "name": "Eksklusif: Wawancara Khusus Ridwan Kamil Tentang Jabar Smart City",
          "description": "Kajian mendalam penerapan pilar digital governance di dinas pelayanan publik.",
          "thumbnailUrl": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop",
          "uploadDate": "2026-06-25T12:00:00Z",
          "contentUrl": "https://infobos.com/videos/v-101.mp4",
          "embedUrl": "https://infobos.com/videos/embed/v-101"
        }, null, 2);

      case 'PodcastEpisode':
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "PodcastEpisode",
          "name": "Bincang Bos #12: Menguak Gurita Inflasi Pangan 2026",
          "episodeNumber": "12",
          "description": "Analisis tajam inflasi bersama pengamat ekonomi makro Jawa Barat.",
          "url": "https://infobos.com/podcasts/bincang-bos-12"
        }, null, 2);

      default:
        return "{}";
    }
  };

  // Helper to generate dynamic XML Sitemaps
  const getSimulatedSitemap = () => {
    const headerXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">`;
    const footerXml = `\n</urlset>`;

    if (selectedSitemap === 'news-sitemap.xml') {
      const items = articles.slice(0, 3).map(art => {
        return `  <url>
    <loc>https://infobos.com/news/${art.categorySlug}/${art.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>INFOBOS</news:name>
        <news:language>id</news:language>
      </news:publication>
      <news:publication_date>${art.createdAt}</news:publication_date>
      <news:title>${art.title.replace(/&/g, '&amp;')}</news:title>
    </news:news>
  </url>`;
      }).join('\n');
      return `${headerXml}\n${items}${footerXml}`;
    }

    if (selectedSitemap === 'video-sitemap.xml') {
      return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>https://infobos.com/videos/heritage-revitalization-bandung</loc>
    <video:video>
      <video:thumbnail_loc>https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&amp;auto=format&amp;fit=crop</video:thumbnail_loc>
      <video:title>Pariwisata Bandung Heritage Revitalization</video:title>
      <video:description>Liputan mendalam penataan kawasan cagar budaya Bandung.</video:description>
      <video:content_loc>https://infobos.com/assets/videos/b-102.mp4</video:content_loc>
    </video:video>
  </url>
</urlset>`;
    }

    if (selectedSitemap === 'podcast-sitemap.xml') {
      return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://infobos.com/podcasts/makro-ekonomi-inflasi-pangan</loc>
    <lastmod>2026-06-25T15:00:00Z</lastmod>
    <changefreq>weekly</changefreq>
  </url>
</urlset>`;
    }

    // Default general sitemap
    const items = articles.map(art => {
      return `  <url>
    <loc>https://infobos.com/news/${art.categorySlug}/${art.slug}</loc>
    <lastmod>${art.updatedAt || art.createdAt}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;
    }).join('\n');
    return `${headerXml}\n${items}${footerXml}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="seo-architecture-dashboard">
      
      {/* 1. HERO BRAND POSITION BRANDING AND HEADER */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 md:p-8 text-left text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/10 via-teal-500/5 to-transparent rounded-full pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-4xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFD700]/10 text-[#FFD700] text-[10px] font-black uppercase tracking-widest rounded-full font-mono border border-[#FFD700]/20">
              <ShieldCheck className="h-3.5 w-3.5" />
              Portal Berita Terverifikasi - Google News Ready
            </span>
            <h1 className="font-display font-black text-2xl md:text-4xl text-white tracking-tight leading-none">
              SEO Architecture & <span className="text-[#FFD700]">Intelligence Hub</span>
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed font-sans border-l-4 border-[#2B7A78] pl-4 italic">
              "{brandPosition}"
            </p>
          </div>
          
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl shrink-0 text-center space-y-1">
            <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider">STATUS CRAWLER</div>
            <div className="text-emerald-400 font-mono text-xs font-black flex items-center justify-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              GOOGLE BOT ON-SITE
            </div>
            <div className="text-[9px] text-slate-500 font-mono mt-1">Last Crawl: Just Now</div>
          </div>
        </div>

        {/* SUBMENU NAVIGATION */}
        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-slate-800/80">
          <button 
            onClick={() => setActiveSubTab('master-sitemap')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'master-sitemap' 
                ? 'bg-[#FFD700] text-slate-950 font-black' 
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-850'
            }`}
          >
            <Layers className="h-4 w-4 text-[#2B7A78]" />
            80-Node Master Sitemap & Modules
          </button>
          <button 
            onClick={() => setActiveSubTab('urls')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'urls' 
                ? 'bg-[#2B7A78] text-white' 
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-850'
            }`}
          >
            <Compass className="h-4 w-4" />
            URL Mapping & Content Mix
          </button>
          <button 
            onClick={() => setActiveSubTab('schemas')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'schemas' 
                ? 'bg-[#2B7A78] text-white' 
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-850'
            }`}
          >
            <FileCode className="h-4 w-4" />
            Google News Schemas (JSON-LD)
          </button>
          <button 
            onClick={() => setActiveSubTab('sitemaps')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'sitemaps' 
                ? 'bg-[#2B7A78] text-white' 
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-850'
            }`}
          >
            <Rss className="h-4 w-4" />
            XML Sitemap Feeds
          </button>
          <button 
            onClick={() => setActiveSubTab('aiseo')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'aiseo' 
                ? 'bg-[#2B7A78] text-white' 
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-850'
            }`}
          >
            <Cpu className="h-4 w-4" />
            AI SEO Optimizer (GEMINI Ready)
          </button>
          <button 
            onClick={() => setActiveSubTab('eeat')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'eeat' 
                ? 'bg-[#2B7A78] text-white' 
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-850'
            }`}
          >
            <UserCheck className="h-4 w-4" />
            E-E-A-T Framework Compliance
          </button>
        </div>
      </div>

      {/* SUBTAB CONTENTS */}
      {loading ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-2xl">
          <Activity className="h-8 w-8 animate-spin text-[#2B7A78] mx-auto mb-3" />
          <p className="text-slate-600 dark:text-slate-400 font-bold text-sm">Menghubungkan data arsitektur SEO...</p>
        </div>
      ) : (
        <div className="space-y-6">

          {/* TAB 0: MASTER SITEMAP EXPLORER */}
          {activeSubTab === 'master-sitemap' && (
            <div className="space-y-6 text-left animate-fadeIn">
              
              {/* BENTO STATISTICS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex items-center gap-3.5">
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 rounded-xl">
                    <Layers className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase block tracking-wider">
                      {sitemapViewMode === 'master-table' ? 'TOTAL SITEMAP NODES' : 'MEGA MODULES'}
                    </span>
                    <span className="text-xl font-black text-[#002B5B] dark:text-slate-100">
                      {sitemapViewMode === 'master-table' ? '80 Active Nodes' : '15 Active Layers'}
                    </span>
                    <span className="block text-[9px] text-slate-500 dark:text-slate-400 font-medium">
                      {sitemapViewMode === 'master-table' ? 'Fully indexable hierarchy' : '12 Public + 3 Systems'}
                    </span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex items-center gap-3.5">
                  <div className="p-3 bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 rounded-xl">
                    <Newspaper className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase block tracking-wider">
                      {sitemapViewMode === 'master-table' ? 'RUBRIK UTAMA' : 'NEWS TAXONOMY'}
                    </span>
                    <span className="text-xl font-black text-[#002B5B] dark:text-slate-100">
                      {sitemapViewMode === 'master-table' ? '40+ Unique Groups' : '35+ Categories'}
                    </span>
                    <span className="block text-[9px] text-teal-600 dark:text-teal-400 font-medium">60% Volume Compliant</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex items-center gap-3.5">
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 rounded-xl">
                    <Network className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase block tracking-wider">CRAWLED NODES</span>
                    <span className="text-xl font-black text-[#002B5B] dark:text-slate-100">
                      {sitemapViewMode === 'master-table' ? `${sitemap80Items.filter(i => i.status === 'crawled').length} / 80 Nodes` : '36+ Active Channels'}
                    </span>
                    <span className="block text-[9px] text-slate-500 dark:text-slate-400 font-medium">
                      {sitemapViewMode === 'master-table' ? 'Real-time state tracking' : 'Auto-Synced Syndication'}
                    </span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex items-center gap-3.5">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-xl">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase block tracking-wider">CRAWLING COMPLIANCE</span>
                    <span className="text-xl font-black text-emerald-700 dark:text-emerald-400">100% Certified</span>
                    <span className="block text-[9px] text-emerald-600 dark:text-emerald-500 font-medium">Google News & AI-SGE</span>
                  </div>
                </div>
              </div>

              {/* SITEMAP VIEW MODE SELECTOR */}
              <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl w-full sm:w-max border dark:border-slate-800">
                <button
                  onClick={() => setSitemapViewMode('master-table')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition duration-150 ${
                    sitemapViewMode === 'master-table'
                      ? 'bg-white dark:bg-slate-900 text-[#002B5B] dark:text-white shadow-sm font-black'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  <ListFilter className="h-3.5 w-3.5 text-indigo-600" />
                  📋 80-Node Master Sitemap Table
                </button>
                <button
                  onClick={() => setSitemapViewMode('modules')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition duration-150 ${
                    sitemapViewMode === 'modules'
                      ? 'bg-white dark:bg-slate-900 text-[#002B5B] dark:text-white shadow-sm font-black'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  <Layers className="h-3.5 w-3.5 text-amber-600" />
                  🌐 15 Mega Modules Architecture
                </button>
              </div>

              {sitemapViewMode === 'master-table' ? (
                <div className="space-y-6">
                  {/* SEARCH, FILTER & OPERATIONS CONTROL PANEL */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:max-w-2xl">
                      {/* Search Bar */}
                      <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input 
                          type="text" 
                          placeholder="Cari rubrik, sub menu, detail atau slug (cth: 'Regional', 'Kripto')..."
                          value={sitemap80Search}
                          onChange={(e) => setSitemap80Search(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 bg-slate-850 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-400 transition"
                        />
                        {sitemap80Search && (
                          <button 
                            onClick={() => setSitemap80Search('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                          >
                            Clear
                          </button>
                        )}
                      </div>

                      {/* Dropdown Filter by Menu Utama */}
                      <div className="relative min-w-[180px]">
                        <select
                          value={selectedMainMenuFilter}
                          onChange={(e) => setSelectedMainMenuFilter(e.target.value)}
                          className="w-full bg-slate-850 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-400 cursor-pointer appearance-none"
                        >
                          {uniqueMainMenus.map((menu, i) => (
                            <option key={i} value={menu} className="bg-slate-900 text-white">
                              {menu === 'Semua' ? '📁 Semua Menu Utama' : `📁 ${menu}`}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                          <ChevronDown className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0 justify-end">
                      {/* Bulk Crawl Button */}
                      <button 
                        onClick={handleBulkCrawl}
                        disabled={bulkCrawlProgress !== -1}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition duration-200 ${
                          bulkCrawlProgress !== -1 
                            ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-950/20'
                        }`}
                      >
                        {bulkCrawlProgress !== -1 ? (
                          <>
                            <Activity className="h-4 w-4 animate-spin text-indigo-400" />
                            Crawling {bulkCrawlProgress}%...
                          </>
                        ) : (
                          <>
                            <Globe className="h-4 w-4" />
                            Crawl 80 Nodes
                          </>
                        )}
                      </button>

                      {/* Export buttons */}
                      <button
                        onClick={handleExportCSV}
                        className="bg-slate-850 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-bold px-3 py-2 rounded-xl transition flex items-center gap-1.5"
                        title="Salin CSV seluruh sitemap ke clipboard"
                      >
                        <Download className="h-3.5 w-3.5 text-emerald-400" />
                        CSV
                      </button>

                      <button
                        onClick={handleExportJSON}
                        className="bg-slate-850 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-bold px-3 py-2 rounded-xl transition flex items-center gap-1.5"
                        title="Salin JSON-LD dataset ke clipboard"
                      >
                        <FileCode className="h-3.5 w-3.5 text-amber-400" />
                        JSON
                      </button>
                    </div>
                  </div>

                  {/* Bulk progress indicator bar */}
                  {bulkCrawlProgress !== -1 && (
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full transition-all duration-150" style={{ width: `${bulkCrawlProgress}%` }}></div>
                    </div>
                  )}

                  {/* TABLE VIEW & INSPECTOR */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* LEFT COLUMN: 80 NODES TABLE LIST */}
                    <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden flex flex-col justify-between">
                      <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                        <table className="w-full text-xs text-left border-collapse">
                          <thead className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-b border-slate-150 dark:border-slate-800 sticky top-0 z-10">
                            <tr>
                              <th className="p-3 text-center font-bold w-12 bg-slate-50 dark:bg-slate-950">No</th>
                              <th className="p-3 font-bold bg-slate-50 dark:bg-slate-950">Menu Utama</th>
                              <th className="p-3 font-bold bg-slate-50 dark:bg-slate-950">Sub Menu</th>
                              <th className="p-3 font-bold bg-slate-50 dark:bg-slate-950">Sub Kategori / Detail</th>
                              <th className="p-3 font-bold bg-slate-50 dark:bg-slate-950">SEO URL Path</th>
                              <th className="p-3 text-center font-bold bg-slate-50 dark:bg-slate-950">Priority</th>
                              <th className="p-3 text-center font-bold bg-slate-50 dark:bg-slate-950">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {filtered80Items.map((item) => {
                              const isSelected = selectedSitemap80Item?.no === item.no;
                              return (
                                <tr 
                                  key={item.no} 
                                  onClick={() => setSelectedSitemap80Item(item)}
                                  className={`hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer transition ${
                                    isSelected ? 'bg-indigo-50/70 dark:bg-indigo-950/40 hover:bg-indigo-50 dark:hover:bg-indigo-900/30' : ''
                                  }`}
                                >
                                  <td className="p-3 text-center font-mono font-bold text-slate-400 dark:text-slate-500">{item.no}</td>
                                  <td className="p-3">
                                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded font-bold text-[10px] tracking-tight uppercase">
                                      {item.mainMenu}
                                    </span>
                                  </td>
                                  <td className="p-3 font-bold text-[#002B5B] dark:text-slate-100">{item.subMenu}</td>
                                  <td className="p-3 text-slate-500 dark:text-slate-400 max-w-[220px] truncate" title={item.detail}>
                                    {item.detail}
                                  </td>
                                  <td className="p-3 font-mono font-bold text-[#2B7A78] dark:text-teal-400">/{item.slug}</td>
                                  <td className="p-3 text-center font-mono font-bold text-slate-600 dark:text-slate-300">
                                    {(item.priority).toFixed(1)}
                                  </td>
                                  <td className="p-3 text-center">
                                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold ${
                                      item.status === 'crawled' 
                                        ? 'text-emerald-600' 
                                        : item.status === 'indexed' 
                                        ? 'text-indigo-600' 
                                        : 'text-amber-600'
                                    }`}>
                                      <span className={`w-1.5 h-1.5 rounded-full ${
                                        item.status === 'crawled' 
                                          ? 'bg-emerald-500 animate-pulse' 
                                          : item.status === 'indexed'
                                          ? 'bg-indigo-500' 
                                          : 'bg-amber-500'
                                      }`}></span>
                                      {item.status.toUpperCase()}
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                            
                            {filtered80Items.length === 0 && (
                              <tr>
                                <td colSpan={7} className="text-center py-12 text-slate-400 italic">
                                  Tidak ada item sitemap yang cocok dengan filter atau kata kunci pencarian.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-150 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span>Menampilkan <strong>{filtered80Items.length}</strong> dari <strong>80</strong> Master Sitemap Nodes</span>
                        <span className="font-semibold text-slate-600 dark:text-slate-300">INFOBOS Sitemap Engine v4.2.1</span>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: SINGLE NODE INSPECTOR */}
                    <div className="lg:col-span-4 space-y-4">
                      {selectedSitemap80Item ? (
                        (() => {
                          const itemXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://infobos.com/${selectedSitemap80Item.slug}</loc>
    <changefreq>${selectedSitemap80Item.changefreq}</changefreq>
    <priority>${selectedSitemap80Item.priority.toFixed(1)}</priority>
  </url>
</urlset>`;

                          const itemJsonLd = JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebPage",
                            "name": `${selectedSitemap80Item.subMenu} - INFOBOS`,
                            "description": selectedSitemap80Item.detail,
                            "url": `https://infobos.com/${selectedSitemap80Item.slug}`,
                            "isPartOf": {
                              "@type": "WebSite",
                              "name": "INFOBOS",
                              "url": "https://infobos.com"
                            }
                          }, null, 2);

                          return (
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs text-left space-y-4 animate-fadeIn">
                              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                                <div>
                                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">Node Inspector</span>
                                  <h4 className="font-display font-black text-sm text-[#002B5B] dark:text-slate-100">{selectedSitemap80Item.subMenu}</h4>
                                </div>
                                <span className="text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded">
                                  #{selectedSitemap80Item.no}
                                </span>
                              </div>

                              <div className="space-y-3 text-xs">
                                <div className="grid grid-cols-3 gap-2">
                                  <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-850">
                                    <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase font-black block">MENU UTAMA</span>
                                    <span className="font-bold text-[#002B5B] dark:text-indigo-300 text-[11px] truncate block">{selectedSitemap80Item.mainMenu}</span>
                                  </div>
                                  <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-850">
                                    <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase font-black block">FREQUENCY</span>
                                    <span className="font-bold text-[#2B7A78] dark:text-teal-400 text-[11px] truncate block">{selectedSitemap80Item.changefreq}</span>
                                  </div>
                                  <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-850">
                                    <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase font-black block">PRIORITY</span>
                                    <span className="font-bold text-amber-600 dark:text-amber-400 text-[11px] truncate block">{selectedSitemap80Item.priority.toFixed(1)}</span>
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Deskripsi / Detail Kategori</span>
                                  <p className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-850 text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                                    {selectedSitemap80Item.detail}
                                  </p>
                                </div>

                                <div className="space-y-1">
                                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Canonical SEO Path</span>
                                  <div className="flex items-center justify-between bg-slate-900 text-teal-400 p-2 rounded-xl font-mono text-[10px] font-bold">
                                    <span>/{selectedSitemap80Item.slug}</span>
                                    <button 
                                      onClick={() => handleCopy(`https://infobos.com/${selectedSitemap80Item.slug}`)}
                                      className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition"
                                      title="Salin Full URL"
                                    >
                                      <Copy className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </div>

                                <div className="space-y-1.5 pt-1">
                                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Live Generated XML Node</span>
                                  <pre className="bg-slate-900 p-3 rounded-lg text-[10px] text-teal-400 font-mono overflow-x-auto max-h-[100px] leading-tight">
                                    <code>{itemXml}</code>
                                  </pre>
                                </div>

                                <div className="space-y-1.5">
                                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Schema.org JSON-LD</span>
                                  <pre className="bg-slate-900 p-3 rounded-lg text-[10px] text-amber-400 font-mono overflow-x-auto max-h-[100px] leading-tight">
                                    <code>{itemJsonLd}</code>
                                  </pre>
                                </div>
                              </div>

                              <div className="pt-3 border-t border-slate-100 dark:border-slate-850 flex gap-2">
                                <button 
                                  onClick={() => {
                                    // Trigger individual recrawl animation
                                    setSitemap80Items(prev => prev.map(it => 
                                      it.no === selectedSitemap80Item.no ? { ...it, status: 'crawled' } : it
                                    ));
                                    setSelectedSitemap80Item(current => current ? { ...current, status: 'crawled' } : null);
                                    alert(`Googlebot berhasil merujuk ulang (recrawl) node: /${selectedSitemap80Item.slug}`);
                                  }}
                                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded-xl text-center text-[10px] transition uppercase tracking-wider"
                                >
                                  ⚡ Force Googlebot Recrawl
                                </button>
                                <button 
                                  onClick={() => {
                                    alert(`Node ini sudah sinkron dengan skema SGE Google. Siap disajikan di ringkasan AI.`);
                                  }}
                                  className="px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-[#002B5B] dark:text-slate-200 rounded-xl text-xs transition"
                                  title="Validasi Skema AI-SGE"
                                >
                                  <ShieldCheck className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          );
                        })()
                      ) : (
                        <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 border-dashed rounded-2xl p-8 text-center text-slate-400 space-y-2">
                          <Compass className="h-8 w-8 text-slate-300 dark:text-slate-700 mx-auto animate-pulse" />
                          <h4 className="font-bold text-xs">Pilih Node Sitemap</h4>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-normal max-w-xs mx-auto">
                            Klik pada salah satu baris di tabel untuk memeriksa XML, validasi JSON-LD skema, dan status kompilasi Googlebot.
                          </p>
                        </div>
                      )}

                      {/* QUICK ANALYTICS WIDGET */}
                      <div className="bg-indigo-950 border border-indigo-900 rounded-2xl p-5 text-white text-left space-y-3.5">
                        <div className="flex items-center gap-2 pb-2 border-b border-indigo-900">
                          <Cpu className="h-4.5 w-4.5 text-[#FFD700]" />
                          <span className="font-bold text-xs text-[#FFD700] uppercase tracking-wider">Sitemap Audit Analytics</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="bg-indigo-900/40 p-2.5 rounded-lg">
                            <span className="text-[9px] text-indigo-300 font-bold block">PRIORITY DIST.</span>
                            <span className="text-sm font-bold">1.0 (Home), 0.9 (Kanal), 0.7-0.8 (Sub)</span>
                          </div>
                          <div className="bg-indigo-900/40 p-2.5 rounded-lg">
                            <span className="text-[9px] text-indigo-300 font-bold block">AI RELEVANCE</span>
                            <span className="text-sm font-bold text-emerald-400">100% SGE Ready</span>
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-300 leading-normal">
                          Struktur arsitektur ini disusun berdasarkan standarisasi dewan pers dan panduan teknis optimasi SEO untuk portal publikasi berita terindeks cepat.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* SEARCH ENGINE & LIVE CRAWLER SIMULATOR BAR */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="relative w-full md:max-w-md">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Cari rubrik/kategori sitemap (cth: 'AI', 'Startup', 'Shorts')..."
                        value={sitemapSearchQuery}
                        onChange={(e) => setSitemapSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-850 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFD700] transition"
                      />
                      {sitemapSearchQuery && (
                        <button 
                          onClick={() => setSitemapSearchQuery('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto shrink-0 justify-end">
                      <button 
                        onClick={() => {
                          setCrawlerStatus('running');
                          setTimeout(() => setCrawlerStatus('success'), 1800);
                        }}
                        disabled={crawlerStatus === 'running'}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition duration-200 ${
                          crawlerStatus === 'running' 
                            ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                            : crawlerStatus === 'success'
                            ? 'bg-emerald-600 text-white font-black'
                            : 'bg-[#2B7A78] hover:bg-[#2B7A78]/90 text-white'
                        }`}
                      >
                        {crawlerStatus === 'running' ? (
                          <>
                            <Activity className="h-4 w-4 animate-spin text-teal-400" />
                            Crawling Sitemaps...
                          </>
                        ) : crawlerStatus === 'success' ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 text-white" />
                            Googlebot Crawled (100%)
                          </>
                        ) : (
                          <>
                            <Globe className="h-4 w-4" />
                            Simulasikan Googlebot Crawl
                          </>
                        )}
                      </button>

                      <button 
                        onClick={() => {
                          alert("Integrasi SGE (Search Generative Experience) telah aktif! Seluruh skema taksonomi & entitas dipasok ke indeksasi AI Gemini.");
                        }}
                        className="bg-slate-850 hover:bg-slate-800 border border-slate-850 text-[#FFD700] text-xs font-bold px-4 py-2 rounded-xl transition"
                      >
                        AI-SGE Feed Status: Connected
                      </button>
                    </div>
                  </div>

                  {/* TWO COLUMN INTERACTIVE NAVIGATOR */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* LEFT: 15-MODULE COMPACT TREE LIST */}
                    <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs max-h-[600px] overflow-y-auto space-y-2">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                        <span className="text-xs font-black text-[#002B5B] dark:text-slate-100 uppercase tracking-wider">Katalog Arsitektur Master</span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">15 Modules found</span>
                      </div>

                      {filteredModules.map((mod) => {
                        const IconComponent = mod.icon;
                        const isSelected = selectedModuleId === mod.id;
                        return (
                          <div 
                            key={mod.id}
                            onClick={() => setSelectedModuleId(mod.id)}
                            className={`p-3 rounded-xl border cursor-pointer transition flex flex-col gap-2 ${
                              isSelected 
                                ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                                : 'bg-slate-50 dark:bg-slate-950/40 border-slate-150 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-850'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#FFD700]/10 text-[#FFD700]' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[#002B5B] dark:text-slate-300'}`}>
                                  <IconComponent className="h-4 w-4" />
                                </div>
                                <div>
                                  <h4 className="font-display font-black text-xs leading-tight">{mod.name}</h4>
                                  <p className={`text-[10px] leading-tight mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                                    {mod.description}
                                  </p>
                                </div>
                              </div>
                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${isSelected ? 'bg-[#FFD700]/20 text-[#FFD700]' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                                {mod.children.length}
                              </span>
                            </div>

                            {/* Expandable nested children list on selection */}
                            {isSelected && (
                              <div className="pl-11 border-l border-slate-800 space-y-1.5 pt-1">
                                <div className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Nested Branches (Taxonomy Nodes)</div>
                                <div className="flex flex-wrap gap-1">
                                  {mod.children.slice(0, 10).map((child, i) => (
                                    <span key={i} className="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700 font-mono">
                                      {child}
                                    </span>
                                  ))}
                                  {mod.children.length > 10 && (
                                    <span className="text-[9px] bg-slate-800 text-[#FFD700] px-1.5 py-0.5 rounded border border-slate-700 font-bold">
                                      +{mod.children.length - 10} more
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {filteredModules.length === 0 && (
                        <div className="text-center py-10 text-xs text-slate-400 italic">
                          Tidak ada modul sitemap yang cocok dengan "{sitemapSearchQuery}"
                        </div>
                      )}
                    </div>

                    {/* RIGHT: DEEP MODULE INSPECTOR CARD */}
                    {(() => {
                      const currentMod = sitemapModules.find(m => m.id === selectedModuleId) || sitemapModules[0];
                      const ModIcon = currentMod.icon;
                      const moduleXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://infobos.com/${currentMod.slug}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${currentMod.children.map(child => `  <url>
    <loc>https://infobos.com/${currentMod.slug}/${child.toLowerCase().replace(/[^a-z0-9]+/g, '-')}</loc>
    <changefreq>weekly</changefreq>
  </url>`).slice(0, 5).join('\n')}
  <!-- ... ${currentMod.children.length - 5 > 0 ? `${currentMod.children.length - 5} more canonical nodes truncated for preview` : ''} -->
</urlset>`;

                      const moduleJsonLd = JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        "name": `Sitemap: ${currentMod.name}`,
                        "description": currentMod.description,
                        "url": `https://infobos.com/${currentMod.slug}`,
                        "numberOfItems": currentMod.children.length,
                        "itemListElement": currentMod.children.map((child, idx) => ({
                          "@type": "ListItem",
                          "position": idx + 1,
                          "name": child,
                          "url": `https://infobos.com/${currentMod.slug}/${child.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
                        })).slice(0, 3)
                      }, null, 2);

                      return (
                        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-6 flex flex-col justify-between">
                          <div className="space-y-4">
                            
                            {/* Header Details */}
                            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                              <div className="flex items-center gap-3">
                                <div className="p-3 bg-[#002B5B] dark:bg-[#002B5B]/80 text-white rounded-xl">
                                  <ModIcon className="h-5 w-5" />
                                </div>
                                <div>
                                  <h3 className="font-display font-black text-base text-[#002B5B] dark:text-slate-100">{currentMod.name}</h3>
                                  <p className="text-xs text-slate-400 dark:text-slate-500">{currentMod.description}</p>
                                </div>
                              </div>
                              
                              <div className="flex gap-1">
                                <button 
                                  onClick={() => handleCopy(`https://infobos.com/sitemap-${currentMod.slug}.xml`)}
                                  className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-500 hover:text-[#002B5B] dark:hover:text-white transition"
                                  title="Salin Link Sitemap"
                                >
                                  <Link className="h-4 w-4" />
                                </button>
                                <button 
                                  onClick={() => {
                                    const mdText = `# ${currentMod.name}\n${currentMod.description}\n\nBranches:\n${currentMod.children.map(c => `- ${c}`).join('\n')}`;
                                    handleCopy(mdText);
                                  }}
                                  className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400 transition"
                                >
                                  {copiedState ? (
                                    <>
                                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                                      Copied!
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="h-3.5 w-3.5" />
                                      Copy Markdown
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>

                            {/* Statement & Purpose */}
                            <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-800 p-4 rounded-xl text-xs space-y-1 text-slate-700 dark:text-slate-300">
                              <span className="font-bold text-[#002B5B] dark:text-indigo-400 block uppercase text-[10px] tracking-wider">Peran & Fungsi Arsitektur Media</span>
                              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{currentMod.details}</p>
                            </div>

                            {/* Full branch listings */}
                            <div className="space-y-2">
                              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">
                                Daftar Lengkap Sub-Kategori / Taxonomy Branch ({currentMod.children.length})
                              </span>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[160px] overflow-y-auto p-1 bg-slate-50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-800 rounded-xl">
                                {currentMod.children.map((child, i) => (
                                  <div key={i} className="bg-white dark:bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 hover:border-indigo-200 dark:hover:border-indigo-900 transition">
                                    <span className="w-1.5 h-1.5 bg-[#2B7A78] rounded-full shrink-0"></span>
                                    <span className="truncate">{child}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Code generator previews */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Live Generated Sitemaps (XML)</span>
                                <pre className="bg-slate-900 p-3 rounded-lg text-[10px] text-teal-400 font-mono text-left overflow-x-auto max-h-[120px] leading-tight">
                                  <code>{moduleXml}</code>
                                </pre>
                              </div>
                              <div className="space-y-1.5">
                                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Google SGE Schema (JSON-LD)</span>
                                <pre className="bg-slate-900 p-3 rounded-lg text-[10px] text-[#FFD700] font-mono text-left overflow-x-auto max-h-[120px] leading-tight">
                                  <code>{moduleJsonLd}</code>
                                </pre>
                              </div>
                            </div>

                          </div>

                          <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-[11px] text-slate-400">
                            <span>XML Endpoints: /api/sitemaps/sitemap-{currentMod.slug}.xml</span>
                            <span className="flex items-center gap-1 text-[#2B7A78] font-bold">
                              <ShieldCheck className="h-3.5 w-3.5" />
                              Schema.org Compliant
                            </span>
                          </div>
                        </div>
                      );
                    })()}

                  </div>
                </div>
              )}

            </div>
          )}
          {/* TAB 1: URL MAPPING & CONTENT MIX */}
          {activeSubTab === 'urls' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 5 cols: Content Mix Tracker */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-left space-y-4 shadow-xs">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <BarChart3 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <div>
                      <h3 className="font-display font-bold text-sm text-[#002B5B] dark:text-slate-100">Proporsi Content Mix (Target & Aktual)</h3>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500">Menjaga identitas mutlak sebagai News Publisher</p>
                    </div>
                  </div>

                  {/* Banner emphasizing 60% requirement */}
                  <div className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 p-3.5 rounded-xl text-xs text-indigo-950 dark:text-indigo-350 space-y-1">
                    <div className="font-bold flex items-center gap-1 text-indigo-700 dark:text-indigo-400">
                      <CheckCircle className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      Aturan Identitas Mutlak Publisher:
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      Komposisi berita utama <strong>(News)</strong> wajib dijaga minimal di level <strong>60%</strong>. Hal ini memposisikan website sebagai News Portal di mata algoritma mesin pencari Google, membedakannya dari sekadar blog / direktori data.
                    </p>
                  </div>

                  {/* Progressive Bar Stack Visualizer */}
                  <div className="space-y-3.5 pt-2">
                    {contentMixData.map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between items-center text-[11px] font-bold">
                          <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                            <span className={`w-2.5 h-2.5 rounded-full ${item.color}`}></span>
                            {item.type}
                          </span>
                          <span className="text-slate-500 dark:text-slate-400 font-mono">
                            Aktual: <span className="text-slate-800 dark:text-slate-100 font-bold">{item.current}</span> | Target: <span className="font-bold text-indigo-600 dark:text-indigo-400">{item.target}</span>
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className={`h-full ${item.color}`} style={{ width: item.current }}></div>
                        </div>
                        <p className="text-[9px] text-slate-400 dark:text-slate-500 italic pl-4">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Internal Linking Clustering Logic Panel */}
                <div className="bg-slate-900 dark:bg-slate-950 text-white rounded-2xl p-5 text-left border border-slate-850 dark:border-slate-800 space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                    <Network className="h-5 w-5 text-[#FFD700]" />
                    <div>
                      <h4 className="font-display font-bold text-sm text-[#FFD700]">Automated News Clustering Hub</h4>
                      <p className="text-[10px] text-slate-400">Konsep keterkaitan entitas internal linking otomatis</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 dark:text-slate-450 leading-relaxed">
                    Setiap artikel berita secara dinamis mengaitkan dirinya ke entitas terindeks di database. Ini membentuk <strong>Topic Cluster</strong> yang menyehatkan SEO.
                  </p>

                  <div className="bg-slate-850 dark:bg-slate-900 p-4 rounded-xl border border-slate-800 dark:border-slate-800 space-y-3 text-xs font-mono text-slate-300 dark:text-slate-450">
                    <div className="text-[11px] text-[#FFD700] font-bold border-b border-slate-800 pb-1.5 uppercase">Katalog Relasi Cluster</div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Article Node:</span>
                        <span className="text-white">Active Article</span>
                      </div>
                      <div className="flex justify-between pl-4 border-l border-slate-700">
                        <span>↳ Category Target:</span>
                        <span className="text-teal-400">/news/{activeArticle?.categorySlug || 'umum'}</span>
                      </div>
                      <div className="flex justify-between pl-4 border-l border-slate-700">
                        <span>↳ Topic Node:</span>
                        <span className="text-indigo-400">/topics/{activeArticle?.topics?.[0]?.slug || 'ai'}</span>
                      </div>
                      <div className="flex justify-between pl-4 border-l border-slate-700">
                        <span>↳ Entity Hub:</span>
                        <span className="text-amber-400">/entities/{activeArticle?.entities?.[0]?.slug || 'openai'}</span>
                      </div>
                      <div className="flex justify-between pl-4 border-l border-slate-700">
                        <span>↳ Geo Target:</span>
                        <span className="text-rose-400">/geo/{activeArticle?.locations?.[0]?.slug || 'indonesia'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 7 cols: Interactive Router list */}
              <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-left shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      <div>
                        <h3 className="font-display font-bold text-sm text-[#002B5B] dark:text-slate-100">SEO URL Router Mapping Table</h3>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500">Katalog routing canonical yang terindeks bersih di Google Search Console</p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold px-2.5 py-0.5 rounded-full font-mono">
                      25 Routes Active
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 border-b border-slate-150 dark:border-slate-850">
                          <th className="p-2.5 font-bold">Identitas Kategori Berita</th>
                          <th className="p-2.5 font-bold">Struktur URL SEO</th>
                          <th className="p-2.5 font-bold">Status Server</th>
                          <th className="p-2.5 font-bold text-right">Indexing</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                        {urlStructures.map((route, i) => (
                          <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-850/40 transition">
                            <td className="p-2.5 font-semibold text-[#002B5B] dark:text-slate-300">
                              {route.type}
                              <span className="block text-[8px] text-slate-400 dark:text-slate-500 uppercase font-bold tracking-wider">{route.typeLabel}</span>
                            </td>
                            <td className="p-2.5 font-mono text-[#2B7A78] dark:text-[#3e9c99] font-bold">
                              {route.url}
                            </td>
                            <td className="p-2.5">
                              <span className="px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[9px] font-bold rounded">
                                {route.status}
                              </span>
                            </td>
                            <td className="p-2.5 text-right font-semibold text-slate-600 dark:text-slate-400">
                              {route.index}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-850 text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                  Semua routing di atas secara otomatis didaftarkan ke <strong>Search Engine Indexing API</strong> secara real-time setiap kali terdapat artikel baru yang dipublikasikan oleh redaksi.
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: SCHEMAS INSPECTOR (JSON-LD) */}
          {activeSubTab === 'schemas' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-left shadow-xs space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-150 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <FileCode className="h-6 w-6 text-[#2B7A78] dark:text-[#3e9c99]" />
                  <div>
                    <h3 className="font-display font-bold text-base text-[#002B5B] dark:text-slate-100">Structured Schema Generator</h3>
                    <p className="text-xs text-slate-400 dark:text-slate-550">Data terstruktur bersertifikasi Google News Schema untuk memaksimalkan rich snippets</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <select 
                    value={selectedArticleId}
                    onChange={(e) => setSelectedArticleId(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-800 border border-slate-250 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300"
                  >
                    {articles.map(art => (
                      <option key={art.id} value={art.id}>{art.title}</option>
                    ))}
                  </select>

                  <select 
                    value={selectedSchemaType}
                    onChange={(e) => setSelectedSchemaType(e.target.value)}
                    className="bg-slate-900 dark:bg-slate-950 text-[#FFD700] border border-slate-800 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold"
                  >
                    <option value="NewsArticle">NewsArticle Schema (Utama Berita)</option>
                    <option value="NewsMediaOrganization">NewsMediaOrganization Schema</option>
                    <option value="LiveBlogPosting">LiveBlogPosting (Breaking Live)</option>
                    <option value="FAQPage">FAQPage Schema (Tanya Jawab)</option>
                    <option value="VideoObject">VideoObject Schema (Video TV)</option>
                    <option value="PodcastEpisode">PodcastEpisode Schema (Podcast)</option>
                  </select>
                </div>
              </div>

              {/* Description of current schema */}
              <div className="bg-[#002B5B]/5 dark:bg-[#002B5B]/10 border border-[#002B5B]/10 dark:border-slate-800 p-4 rounded-xl text-xs text-[#002B5B] dark:text-[#3e9c99] flex gap-3">
                <Info className="h-5 w-5 shrink-0 text-[#2B7A78] dark:text-[#3e9c99]" />
                <div className="space-y-1">
                  <div className="font-bold uppercase tracking-wider text-[11px] dark:text-indigo-400">Konteks Schema Aktif: {selectedSchemaType}</div>
                  <p className="text-slate-600 dark:text-slate-450 leading-relaxed">
                    {selectedSchemaType === 'NewsArticle' && 'Schema ini wajib disematkan pada setiap lembar berita utama. Mengandung Headline, Subtitle, Tanggal Publikasi, Editor, dan Author. Membantu artikel tampil dalam korsel Top Stories Google News.'}
                    {selectedSchemaType === 'NewsMediaOrganization' && 'Menetapkan identitas resmi penerbit berita, link sosial media, kredensial jurnalisme, kebijakan editorial, serta kepemilikan lisensi hukum penerbit.'}
                    {selectedSchemaType === 'LiveBlogPosting' && 'Diterapkan pada halaman breaking news interaktif atau pelaporan langsung pemilu/bencana. Menandakan update konten terjadi secara beruntun dan cepat.'}
                    {selectedSchemaType === 'FAQPage' && 'Menstrukturkan pertanyaan lazim dari pengguna dan jawaban ringkas redaksi. Sangat penting untuk menjaring pencarian berbasis tanya-jawab (Google People Also Ask).'}
                    {selectedSchemaType === 'VideoObject' && 'Membantu video liputan kami terindeks dengan baik di Google Videos dan tab pencarian video universal.'}
                    {selectedSchemaType === 'PodcastEpisode' && 'Memaksimalkan penemuan konten audio berintelektual tinggi di platform pencarian podcast utama.'}
                  </p>
                </div>
              </div>

              {/* JSON Editor Simulated View */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                  <span>Structured Script (JSON-LD) - &lt;script type="application/ld+json"&gt;</span>
                  <span className="text-emerald-500 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    Valid (W3C Compliant)
                  </span>
                </div>
                <pre className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-xs text-slate-200 font-mono overflow-x-auto text-left leading-relaxed max-h-[400px]">
                  <code>{getSimulatedSchema()}</code>
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: XML SITEMAPS */}
          {activeSubTab === 'sitemaps' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
              
              {/* Left 4 cols: Sitemap Index Selector */}
              <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <Rss className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <h4 className="font-display font-bold text-sm text-[#002B5B] dark:text-slate-100">Sitemap Index (11 Files)</h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">Daftar sitemap terspesialisasi publisher</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  {[
                    { file: 'news-sitemap.xml', desc: 'Sitemap berita 48 jam terakhir untuk Google News' },
                    { file: 'article-sitemap.xml', desc: 'Indeks keseluruhan artikel berita abadi' },
                    { file: 'video-sitemap.xml', desc: 'Daftar video berita & transkrip liputan' },
                    { file: 'podcast-sitemap.xml', desc: 'Indeks episode siaran audio intelijen' },
                    { file: 'image-sitemap.xml', desc: 'Katalog infografis dan visual pelengkap' },
                    { file: 'category-sitemap.xml', desc: 'Sitemap taksonomi & kategori induk' },
                    { file: 'topic-sitemap.xml', desc: 'Struktur entitas topik intelijen (AI, dll)' },
                    { file: 'entity-sitemap.xml', desc: 'Sitemap korporasi dan figur profil' },
                    { file: 'geo-sitemap.xml', desc: 'Indeksasi berbasis spasial geografi' },
                    { file: 'tag-sitemap.xml', desc: 'Sitemap tagar populer terverifikasi' },
                    { file: 'author-sitemap.xml', desc: 'Katalog profil penulis bersertifikasi E-E-A-T' }
                  ].map((sit, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSitemap(sit.file)}
                      className={`w-full p-2.5 rounded-xl text-xs text-left border transition flex flex-col ${
                        selectedSitemap === sit.file
                          ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800 text-[#002B5B] dark:text-[#FFD700] font-bold shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-950 border-slate-150 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-850/60'
                      }`}
                    >
                      <span className="font-mono text-xs">{sit.file}</span>
                      <span className="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5 font-normal">{sit.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right 8 cols: Live XML feed simulator */}
              <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <FileText className="h-5 w-5 text-[#2B7A78] dark:text-[#3e9c99]" />
                    <div>
                      <h4 className="font-display font-bold text-sm text-[#002B5B] dark:text-slate-100">Sitemap XML Source View</h4>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500">Pratinjau XML murni yang disajikan untuk web crawlers</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                    https://infobos.com/{selectedSitemap}
                  </span>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 font-mono text-xs text-indigo-300 overflow-x-auto leading-relaxed max-h-[550px]">
                  <pre className="text-left text-teal-400 whitespace-pre">
                    {getSimulatedSitemap()}
                  </pre>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: AI SEO OPTIMIZER */}
          {activeSubTab === 'aiseo' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-left shadow-xs space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-150 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Cpu className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <h3 className="font-display font-bold text-base text-[#002B5B] dark:text-slate-100">Gemini AI SEO Engine Sandbox</h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500">Optimalisasi teks otomatis agar muncul pada pencarian AI (SGE - Search Generative Experience)</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Pilih Artikel:</span>
                  <select
                    value={selectedArticleId}
                    onChange={(e) => setSelectedArticleId(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-800 border border-slate-250 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300"
                  >
                    {articles.map(art => (
                      <option key={art.id} value={art.id}>{art.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              {activeArticle ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left panel: Simulated AI Output */}
                  <div className="space-y-4">
                    <h4 className="font-display font-bold text-xs text-[#002B5B] dark:text-slate-100 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-2">
                      Struktur Ringkasan AI (AI Summary & Highlights)
                    </h4>

                    <div className="bg-gradient-to-br from-indigo-50 dark:from-slate-950 to-[#2B7A78]/5 dark:to-slate-900 border border-[#2B7A78]/20 dark:border-slate-800 p-5 rounded-2xl space-y-4">
                      <div className="flex items-center gap-2 text-xs text-indigo-900 dark:text-indigo-300 font-bold">
                        <Sparkles className="h-4.5 w-4.5 text-[#2B7A78] dark:text-[#3e9c99]" />
                        <span>Generated by Gemini Flash 2.5: AI Summary</span>
                      </div>

                      <div className="space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                        <div className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                          <span className="font-bold text-[#002B5B] dark:text-indigo-400 block mb-1">🔍 Ringkasan Eksekutif:</span>
                          {activeArticle.summary}
                        </div>

                        <div className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1.5">
                          <span className="font-bold text-[#002B5B] dark:text-indigo-400 block mb-1">⚡ Highlight Poin Penting (AI Highlights):</span>
                          <ul className="list-disc pl-4 space-y-1">
                            <li>Laporan ini merefleksikan sentimen <strong>{activeArticle.sentiment}</strong> dengan tingkat risiko <strong>{activeArticle.riskLevel}</strong>.</li>
                            <li>Kategori utama yang diafiliasikan adalah <strong>{activeArticle.categoryName}</strong> dengan estimasi baca <strong>{activeArticle.readingTimeMinutes} menit</strong>.</li>
                            <li>Waktu terbit artikel ini dikonfirmasi pada <strong>{activeArticle.createdAt}</strong> oleh tim redaksi terpercaya.</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* AI Related Questions */}
                    <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-800 p-4 rounded-xl space-y-2.5">
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">AI Related Questions (Pencarian Terkait AI)</span>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-2 text-[#002B5B] dark:text-slate-300 font-semibold bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                          <HelpCircle className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                          <span>Bagaimana dampak analisis dari "{activeArticle.title}"?</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#002B5B] dark:text-slate-300 font-semibold bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                          <HelpCircle className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                          <span>Siapa narasumber kunci dan entitas terkait artikel ini?</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right panel: Entities, Keywords & Timeline */}
                  <div className="space-y-4">
                    <h4 className="font-display font-bold text-xs text-[#002B5B] dark:text-slate-100 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-2">
                      Ekstraksi Entitas & Metadata Struktur AI
                    </h4>

                    {/* AI Keywords / Entities */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl space-y-3">
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">AI Extracted Keywords & Entities</span>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 text-indigo-700 dark:text-indigo-400 text-xs font-bold rounded-lg font-mono">
                          #INFOBOS_{activeArticle.categorySlug || 'umum'}
                        </span>
                        {activeArticle.tags && activeArticle.tags.map((tag: any, idx: number) => (
                          <span key={idx} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold rounded-lg font-mono">
                            #{tag.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* AI Timeline */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl space-y-3">
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">AI Event Timeline Tracker</span>
                      <div className="space-y-3 text-xs">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 mt-1.5 shrink-0"></div>
                          <div>
                            <span className="font-bold text-slate-700 dark:text-slate-300 font-mono text-[10px] block">PERISTIWA HULU (H-1)</span>
                            <p className="text-slate-500 dark:text-slate-400 mt-0.5">Analisis intelijen data dirangkum dari Kemenkeu Jabar.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                          <div>
                            <span className="font-bold text-slate-700 dark:text-slate-300 font-mono text-[10px] block">WAKTU PUBLIKASI</span>
                            <p className="text-slate-500 dark:text-slate-400 mt-0.5">{activeArticle.createdAt}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-[#FFD700] mt-1.5 shrink-0"></div>
                          <div>
                            <span className="font-bold text-slate-700 dark:text-slate-300 font-mono text-[10px] block">TAHAP MONITORING (LIVE)</span>
                            <p className="text-slate-500 dark:text-slate-400 mt-0.5">Evolis Engine mengawasi disinformasi & koreksi naskah.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI Answer Preview */}
                    <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-150 dark:border-emerald-900/40 p-4 rounded-xl space-y-1 text-xs">
                      <div className="font-bold text-emerald-950 dark:text-emerald-300 flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        AI-Ready Structured Answer:
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        Data mentah ini diformat khusus menggunakan JSON-LD speakable tags agar asisten pintar (Siri, Alexa, Google Assistant) dapat membacakan ringkasan ini dengan intonasi yang pas.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-slate-400 dark:text-slate-500 py-6 text-xs italic">Silakan buat artikel di CMS Panel terlebih dahulu.</div>
              )}
            </div>
          )}

          {/* TAB 5: E-E-A-T TRUST PANEL */}
          {activeSubTab === 'eeat' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
              
              {/* Left 4 cols: E-E-A-T Jurnalisme & Pedoman */}
              <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <h4 className="font-display font-bold text-sm text-[#002B5B] dark:text-slate-100">E-E-A-T Trust Score</h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">Metrik kredibilitas jurnalisme INFOBOS</p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 p-3.5 rounded-xl text-xs space-y-2">
                    <div className="font-bold text-emerald-950 dark:text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      Dewan Pers Terdaftar:
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                      INFOBOS mematuhi sepenuhnya Kode Etik Jurnalistik Dewan Pers Indonesia. Seluruh proses penulisan berita disortir dan diedit secara bertingkat.
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-800 p-3 rounded-lg space-y-1 text-xs">
                    <span className="font-bold text-[#002B5B] dark:text-indigo-400 block text-[11px]">Editorial Policy:</span>
                    <p className="text-slate-500 dark:text-slate-450 text-[11px] leading-relaxed">Kami menjunjung tinggi kebenaran data, verifikasi berlapis, netralitas naskah, dan integritas narasumber tanpa terafiliasi politik.</p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-800 p-3 rounded-lg space-y-1 text-xs">
                    <span className="font-bold text-[#002B5B] dark:text-indigo-400 block text-[11px]">Contact Newsroom:</span>
                    <p className="text-slate-500 dark:text-slate-450 text-[11px] leading-relaxed">Redaksi INFOBOS - Graha Digital Lt. 4, Jln. Asia Afrika, Bandung. Email: redaksi@infobos.com | Telp: (022) 456-7890</p>
                  </div>
                </div>
              </div>

              {/* Right 8 cols: Authors Profiles & Correction History */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Author bios */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-bold text-[#002B5B] dark:text-slate-100 uppercase tracking-wider block">Kredensial Penulis & Jurnalis</span>
                    <span className="text-[10px] text-[#2B7A78] dark:text-[#3e9c99] font-bold font-mono">Verified EEAT</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-150 dark:border-slate-800 flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                        AD
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="font-bold text-slate-800 dark:text-slate-200">Ahmad Dahlan (usr-admin)</div>
                        <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider">Super Admin / Pemimpin Redaksi</p>
                        <p className="text-slate-500 dark:text-slate-400 text-[11px]">Wartawan Utama bersertifikasi Dewan Pers dengan spesialisasi jurnalisme data & geopolitik.</p>
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-150 dark:border-slate-800 flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                        SR
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="font-bold text-slate-800 dark:text-slate-200">Siti Rahma (usr-editor)</div>
                        <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">Managing Editor</p>
                        <p className="text-slate-500 dark:text-slate-400 text-[11px]">Berpengalaman 12 tahun di desk ekonomi makro regional Jawa Barat & kajian riset independen.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Correction logs */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <History className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <div>
                      <h4 className="font-display font-bold text-sm text-[#002B5B] dark:text-slate-100">Correction History & Audit Logs</h4>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500">Transparansi koreksi naskah berkala demi menjaga integritas rujukan</p>
                    </div>
                  </div>

                  {activeArticle && activeArticle.corrections && activeArticle.corrections.length > 0 ? (
                    <div className="space-y-3">
                      {activeArticle.corrections.map((corr: any, idx: number) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-950/40 border-l-4 border-amber-500 p-3 rounded-r-lg text-xs space-y-1">
                          <div className="flex justify-between font-bold text-slate-800 dark:text-slate-200">
                            <span>Koreksi Naskah Terbuka</span>
                            <span className="font-mono text-slate-400 dark:text-slate-500">{corr.timestamp}</span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400"><strong className="text-slate-800 dark:text-slate-200">Kesalahan:</strong> {corr.originalText}</p>
                          <p className="text-slate-700 dark:text-slate-300"><strong className="text-emerald-700 dark:text-emerald-400">Koreksi Resmi:</strong> {corr.correctedText}</p>
                          <p className="text-slate-500 dark:text-slate-500 text-[11px] italic">Alasan: {corr.reason}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-800 rounded-xl text-center text-xs text-slate-400 dark:text-slate-500">
                      Tidak ada koreksi terbuka pada naskah terpilih saat ini. Seluruh fakta telah tervalidasi bersih.
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}

        </div>
      )}
    </div>
  );
}
