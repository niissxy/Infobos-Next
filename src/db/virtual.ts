/**
 * INFOBOS Next & VIRALOG - World Class Deterministic Virtual Scale Database Engine
 * Designed to provide realistic, hyper-scalable, consistent seed records on demand.
 * 
 * Supports millions of records:
 * - Articles: 50,000
 * - News: 30,000
 * - Blogs: 15,000
 * - Short Videos: 20,000
 * - Long Videos: 8,000
 * - Podcasts: 5,000
 * - Documents: 8,000
 * - Gallery: 15,000
 * - Categories: 300
 * - Topics: 5,000
 * - Tags: 30,000
 * - Keywords: 80,000
 * - Entities: 100,000
 * - Companies: 30,000
 * - Brands: 40,000
 * - Products: 60,000
 * - Organizations: 15,000
 * - Government Agencies: 5,000
 * - Universities: 10,000
 * - Schools: 25,000
 * - Hospitals: 12,000
 * - Restaurants: 60,000
 * - Hotels: 20,000
 * - Tourist Attractions: 30,000
 * - Events: 20,000
 * - Creators: 15,000
 * - Authors: 5,000
 * - Reporters: 1,000
 * - Users: 250,000
 * - Comments: 2,000,000
 * - Likes: 8,000,000
 * - Shares: 3,000,000
 * - Notifications: 5,000,000
 * - Search History: 4,000,000
 * - Analytics Events: 100,000,000
 */

import { Content, User, Location, Entity, Category, Topic, Tag } from './schema';

// Helper: LCG seeded pseudo-random generator
export function getSeededRandom(seedString: string) {
  let h = 0;
  for (let i = 0; i < seedString.length; i++) {
    h = Math.imul(31, h) + seedString.charCodeAt(i) | 0;
  }
  return function() {
    h = Math.imul(1664525, h) + 1013904223 | 0;
    return (h >>> 0) / 4294967296;
  };
}

// Global metrics declarations
export const SCALE_METRICS = {
  articles: 50000,
  news: 30000,
  blogs: 15000,
  shortVideos: 20000,
  longVideos: 8000,
  podcasts: 5000,
  documents: 8000,
  gallery: 15000,
  categories: 300,
  topics: 5000,
  tags: 30000,
  keywords: 80000,
  entities: 100000,
  companies: 30000,
  brands: 40000,
  products: 60000,
  organizations: 15000,
  govAgencies: 5000,
  universities: 10000,
  schools: 25000,
  hospitals: 12000,
  restaurants: 60000,
  hotels: 20000,
  attractions: 30000,
  events: 20000,
  creators: 15000,
  authors: 5000,
  reporters: 1000,
  users: 250000,
  comments: 2000000,
  likes: 8000000,
  shares: 3000000,
  notifications: 5000000,
  searchHistory: 4000000,
  analyticsEvents: 100000000
};

// Seeding bases
const CITIES = [
  { name: 'Jakarta Pusat', slug: 'jakarta-pusat', lat: -6.1751, lon: 106.8272, prov: 'DKI Jakarta' },
  { name: 'Bandung', slug: 'bandung', lat: -6.9175, lon: 107.6191, prov: 'Jawa Barat' },
  { name: 'Surabaya', slug: 'surabaya', lat: -7.2575, lon: 112.7521, prov: 'Jawa Timur' },
  { name: 'Medan', slug: 'medan', lat: 3.5952, lon: 98.6722, prov: 'Sumatera Utara' },
  { name: 'Makassar', slug: 'makassar', lat: -5.1477, lon: 119.4327, prov: 'Sulawesi Selatan' },
  { name: 'Yogyakarta', slug: 'yogyakarta', lat: -7.7956, lon: 110.3695, prov: 'DI Yogyakarta' },
  { name: 'Semarang', slug: 'semarang', lat: -6.9667, lon: 110.4167, prov: 'Jawa Tengah' },
  { name: 'Palembang', slug: 'palembang', lat: -2.9761, lon: 104.7754, prov: 'Sumatera Selatan' },
  { name: 'Denpasar', slug: 'denpasar', lat: -8.6705, lon: 115.2126, prov: 'Bali' },
  { name: 'Balikpapan', slug: 'balikpapan', lat: -1.2654, lon: 116.8312, prov: 'Kalimantan Timur' }
];

const INDUSTRIES = [
  'FinTech', 'SaaS', 'Agrotech', 'HealthTech', 'EdTech', 'CleanEnergy', 
  'Logistics', 'FMCG', 'Creative', 'Mining', 'Tourism', 'E-Commerce'
];

const COMPANIES = [
  'GoTo Group', 'Telkomsel', 'Bank Central Asia', 'Astra International', 'Traveloka',
  'Bukalapak', 'Kopi Kenangan', 'Indofood Sukses Makmur', 'Pertamina', 'Bio Farma',
  'Amartha Microfinance', 'E-Fishery', 'Ruangguru', 'Halodoc', 'Kredivo'
];

const BRANDS = [
  'Tokopedia', 'Gojek Pay', 'Kenangan Latte', 'Indomie Goreng', 'Traveloka App',
  'Teh Botol Sosro', 'Wardah Beauty', 'By.U Digital', 'Livin by Mandiri', 'Ovo Cash'
];

const PRODUCTS = [
  'Fintech Micro-Lending Portal', 'IoT Smart Feeder System', 'EdTech Interactive LMS',
  'CleanEnergy Solar Panel Kit', 'Premium Espresso Blend', 'Instant Noodle Chicken Flavor',
  'Digital Wallet QRIS Engine', 'SaaS HR & Payroll Cloud', 'AI Medical Assistant Tool'
];

const GOV_AGENCIES = [
  'Kementerian Keuangan (Kemenkeu)', 'Kementerian Komunikasi dan Informatika (Kominfo)',
  'Badan Sandi dan Siber Negara (BSSN)', 'Otoritas Jasa Keuangan (OJK)', 'Bank Indonesia (BI)',
  'Kementerian Pariwisata dan Ekonomi Kreatif (Kemenparekraf)', 'Badan Meteorologi Klimatologi Geofisika (BMKG)'
];

const UNIVERSITIES = [
  'Universitas Indonesia (UI)', 'Institut Teknologi Bandung (ITB)', 'Universitas Gadjah Mada (UGM)',
  'Universitas Padjadjaran (UNPAD)', 'Universitas Airlangga (UNAIR)', 'Institut Teknologi Sepuluh Nopember (ITS)'
];

const PERSONS = [
  'Sri Mulyani Indrawati', 'Ridwan Kamil', 'Erick Thohir', 'Budi Gunadi Sadikin', 
  'Sandiaga Uno', 'Nadiem Makarim', 'Najwa Shihab', 'Ahmad Dahlan', 'Siti Rahma'
];

const NOUNS = [
  'Regulasi Pajak', 'Infrastruktur Digital', 'Akselerasi Ekonomi', 'Suku Bunga BI', 'Inovasi AI',
  'Transisi Energi Hijau', 'Inklusi Keuangan', 'Revitalisasi Pariwisata', 'Pemberdayaan UMKM', 'Ketahanan Pangan'
];

const SENTIMENTS = ['positive', 'negative', 'neutral', 'mixed', 'investigative'] as const;
const RISK_LEVELS = ['low', 'medium', 'high', 'critical'] as const;

// Deterministic helpers for ranges
function selectIndex<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)];
}

export class VirtualScaleEngine {
  
  /**
   * Generates a fully relational, highly realistic Content (Article, News, Blog) record deterministically.
   */
  public static getArticle(index: number): Content {
    const seed = `art-seed-${index}`;
    const rand = getSeededRandom(seed);
    
    const city = selectIndex(CITIES, rand);
    const industry = selectIndex(INDUSTRIES, rand);
    const company = selectIndex(COMPANIES, rand);
    const brand = selectIndex(BRANDS, rand);
    const person = selectIndex(PERSONS, rand);
    const noun = selectIndex(NOUNS, rand);
    const gov = selectIndex(GOV_AGENCIES, rand);
    
    // Choose specific templates to keep it extremely realistic
    const templates = [
      {
        title: `Dampak Implementasi ${noun} di ${city.name} oleh ${company}`,
        subtitle: `Analisis Mendalam Mengenai Respon Pasar Finansial Regional Terhadap Kebijakan Baru`,
        body: `## Perkembangan Kebijakan Nasional\n\nKebijakan baru mengenai **${noun}** yang digagas oleh **${gov}** resmi diujicobakan di wilayah **${city.name}**. Langkah taktis ini disambut hangat oleh direktur utama **${company}** yang menganggapnya sebagai akselerator utama penetrasi pasar daerah.\n\n### Dampak Terhadap Ekosistem Lokal\n\nBeberapa pelaku usaha mengemukakan pentingnya kesiapan infrastruktur siber. Terutama platform **${brand}** yang melayani transaksi mikro digital bagi ribuan UMKM setempat.\n\n> "Kita optimis bahwa kolaborasi bersama tokoh seperti **${person}** akan memperkuat struktur ketahanan ekonomi regional secara berkelanjutan," sebut perwakilan analis Kemenkeu.`
      },
      {
        title: `Sinergi Raksasa ${industry} ${company} Mengakselerasi Pembangunan di ${city.name}`,
        subtitle: `Inovasi Produk Baru ${brand} Menargetkan Ribuan Pengguna Baru di Seluruh Nusantara`,
        body: `## Transformasi Digital Sektor ${industry}\n\nPerusahaan teknologi terkemuka **${company}** resmi memperkenalkan program kemitraan strategis di **${city.name}**. Fokus utama program ini adalah integrasi ekosistem **${brand}** dengan fasilitas riset lokal guna mendorong efisiensi rantai pasok industri.\n\n### Pendekatan Humanis & Edukasi\n\nDalam pidato resminya, **${person}** menyampaikan bahwa digitalisasi tidak boleh meninggalkan kearifan lokal. Oleh sebab itu, kurikulum digital berbasis kecerdasan buatan akan segera diluncurkan secara massal.`
      },
      {
        title: `Laporan Investigasi: Di Balik Suksesnya Ekspansi ${brand} Menembus Pasar ${industry}`,
        subtitle: `Bagaimana Kepemimpinan ${person} Mengubah Peta Persaingan Bisnis Nasional`,
        body: `## Eksplorasi Pasar & Strategi Pertumbuhan\n\nBanyak pihak tidak menyangka ekspansi cepat **${brand}** di sektor **${industry}** dapat mereduksi biaya operasional hingga 30%. Dokumen internal menunjukkan keselarasan dengan agenda **${noun}** nasional.\n\n### Tantangan dan Hambatan di Lapangan\n\nMeskipun sukses di **${city.name}**, beberapa wilayah penyangga mengeluhkan kurangnya akses broadband berkecepatan tinggi yang stabil. Pihak **${gov}** berjanji segera mengalokasikan anggaran khusus.`
      }
    ];

    const template = templates[Math.floor(rand() * templates.length)];
    const primaryCategoryId = `cat-${['breaking', 'terbaru', 'trending', 'editor', 'investigasi', 'analisis', 'opini', 'factcheck', 'explainer', 'riset'][index % 10]}`;
    const contentType = (['standard', 'explainer', 'analysis', 'opinion', 'fact_check', 'video', 'sponsored'][index % 7]) as any;
    
    const sentiment = selectIndex(Array.from(SENTIMENTS), rand);
    const riskLevel = selectIndex(Array.from(RISK_LEVELS), rand);
    const viewCount = Math.floor(rand() * 15000) + 120;
    
    const now = new Date(2026, 5, 26, 12).toISOString();
    // Simulate backward timing over the past 30 days
    const publishedAt = new Date(Date.now() - (index * 45 * 60 * 1000)).toISOString();

    const slug = `virtual-post-${index}-${template.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

    return {
      id: `art-virtual-${index}`,
      title: template.title,
      subtitle: template.subtitle,
      slug,
      summary: `Informasi intelijen terakreditasi mengenai perkembangan ${noun} bersama korporasi ${company} bertempat di kota ${city.name} yang diawasi langsung oleh ${person}.`,
      body: template.body,
      contentType,
      status: 'published',
      primaryCategoryId,
      sentiment,
      riskLevel,
      heroImageUrl: `https://images.unsplash.com/photo-${[
        '1526304640581-d334cdbbf45e',
        '1559526324-4b87b5e36e44',
        '1590283603385-17ffb3a7f29f',
        '1451187580459-43490279c0fa',
        '1504711434969-e33886168f5c',
        '1541872703-74c5e44368f9'
      ][index % 6]}?auto=format&fit=crop&q=80&w=800`,
      authorId: `usr-author-${index % 100}`,
      editorId: `usr-editor-${index % 10}`,
      publishedAt,
      isSponsored: index % 17 === 0,
      viewCount,
      readingTimeMinutes: Math.floor(rand() * 8) + 2,
      createdAt: publishedAt,
      updatedAt: publishedAt
    };
  }

  /**
   * Generates a fully compliant User record deterministically.
   */
  public static getUser(index: number): User {
    const seed = `usr-seed-${index}`;
    const rand = getSeededRandom(seed);
    const names = ['Aditya', 'Bambang', 'Cahyono', 'Dewi', 'Eka', 'Farhan', 'Gita', 'Hendra', 'Indah', 'Joko', 'Kurnia', 'Lestari', 'Mulyono', 'Novi', 'Oki'];
    const family = ['Pratama', 'Santoso', 'Wijaya', 'Siregar', 'Lubis', 'Kusuma', 'Hidayat', 'Saputra', 'Nasution', 'Gunawan'];
    const roles = ['member', 'premium', 'reporter', 'editor', 'administrator', 'student', 'teacher', 'creator', 'influencer'];
    
    const fullName = `${selectIndex(names, rand)} ${selectIndex(family, rand)}`;
    const email = `${fullName.toLowerCase().replace(/\s+/g, '')}${index % 100}@example.com`;
    const role = roles[index % roles.length];

    return {
      id: `usr-virtual-${index}`,
      email,
      passwordHash: `pass-${index}`,
      fullName,
      role,
      status: index % 99 === 0 ? 'suspended' : 'active',
      createdAt: new Date(Date.now() - (index * 2 * 3600 * 1000)).toISOString(),
      updatedAt: new Date(Date.now() - (index * 3600 * 1000)).toISOString()
    };
  }

  /**
   * Generates realistic Entities deterministically.
   */
  public static getEntity(index: number): Entity {
    const seed = `ent-seed-${index}`;
    const rand = getSeededRandom(seed);
    const types: Entity['type'][] = ['person', 'company', 'brand', 'government', 'landmark', 'event'];
    const type = types[index % types.length];

    let name = '';
    let description = '';
    let websiteUrl = 'https://infobos.com';

    if (type === 'person') {
      const person = selectIndex(PERSONS, rand);
      name = `${person} (ID: ${index})`;
      description = `Tokoh publik nasional yang berpengaruh besar di bidang kepemimpinan, regulasi sosial, dan pembangunan infrastruktur regional Indonesia.`;
      websiteUrl = `https://personal-${index}.id`;
    } else if (type === 'company') {
      const comp = selectIndex(COMPANIES, rand);
      name = `${comp} (Sektor ${index})`;
      description = `Korporasi terkemuka di Indonesia yang mengoperasikan portofolio terpadu di sektor ekonomi kreatif, teknologi modern, dan solusi finansial berkelanjutan.`;
      websiteUrl = `https://company-${index}.co.id`;
    } else if (type === 'brand') {
      const brand = selectIndex(BRANDS, rand);
      name = `${brand} Premium`;
      description = `Merek nasional terpercaya dengan jutaan konsumen harian, berfokus pada inklusi layanan digital, keandalan performa, dan optimalisasi ramah kantong.`;
      websiteUrl = `https://brand-${index}.com`;
    } else if (type === 'government') {
      const gov = selectIndex(GOV_AGENCIES, rand);
      name = gov;
      description = `Lembaga tinggi pemerintah Republik Indonesia yang memiliki wewenang administratif, regulasi moneter, pengawasan industri, dan mitigasi kebencanaan nasional.`;
      websiteUrl = `https://gov-${index}.go.id`;
    } else if (type === 'landmark') {
      const city = selectIndex(CITIES, rand);
      name = `Kawasan Bisnis Strategis ${city.name} Center`;
      description = `Pusat perkantoran, cagar budaya bersejarah, dan titik kumpul urban terpadu di wilayah administrasi ${city.prov}.`;
      websiteUrl = `https://heritage-${index}.org`;
    } else {
      name = `Konferensi Tingkat Tinggi Ekonomi Kreatif ${index}`;
      description = `Forum kolaborasi multipihak yang mempertemukan menteri, asosiasi bisnis, jurnalis terkemuka, dan ekosistem startup nasional.`;
    }

    return {
      id: `ent-virtual-${index}`,
      name,
      slug: `entity-${index}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      type,
      description,
      websiteUrl,
      logoUrl: `https://images.unsplash.com/photo-${[
        '1573496359142-b8d87734a5a2',
        '1560250097-0b93528c311a',
        '1544377193-33dcf4d68fb5',
        '1559526324-4b87b5e36e44'
      ][index % 4]}?auto=format&fit=crop&q=80&w=300`,
      isClaimed: index % 5 === 0,
      metadata: { foundingYear: 2010 + (index % 15), employeeRange: `${(index % 10) + 1}00-${(index % 10) + 5}00 karyawan` },
      createdAt: new Date(Date.now() - (index * 12 * 3600 * 1000)).toISOString()
    };
  }

  /**
   * Generates virtual media models: Video (long/short), Podcast, Document, Gallery, Events
   */
  public static getMediaItem(type: 'short-video' | 'long-video' | 'podcast' | 'document' | 'gallery' | 'event', index: number): any {
    const seed = `media-${type}-${index}`;
    const rand = getSeededRandom(seed);
    const city = selectIndex(CITIES, rand);
    const person = selectIndex(PERSONS, rand);
    const noun = selectIndex(NOUNS, rand);
    const company = selectIndex(COMPANIES, rand);

    const views = Math.floor(rand() * 45000) + 250;
    const likes = Math.floor(views * (rand() * 0.3 + 0.05));
    const commentsCount = Math.floor(views * (rand() * 0.1 + 0.01));
    const shares = Math.floor(likes * (rand() * 0.4));

    if (type === 'short-video') {
      const shortVideoTitles = [
        `Gaya hidup pekerja digital di pusat kota ${city.name} #LifeAt${company.replace(/\s+/g, '')}`,
        `Tips instan menyikapi fluktuasi ${noun} bareng pakar finansial!`,
        `Menguak keindahan tersembunyi pariwisata urban ${city.name} dalam 30 detik!`,
        `Review aplikasi AI terbaru buatan developer muda lokal #KaryaAnakBangsa`
      ];
      return {
        id: `msh-virtual-${index}`,
        title: shortVideoTitles[index % shortVideoTitles.length],
        creator: `Kreator ${person}`,
        views: `${(views / 1000).toFixed(1)}K`,
        likes: `${(likes / 1000).toFixed(1)}K`,
        comments: commentsCount,
        shares: shares,
        duration: '0:45',
        uploadedAt: `${(index % 23) + 1} jam lalu`,
        thumbnail: `https://images.unsplash.com/photo-${['1618005182384-a83a8bd57fbe', '1541872703-74c5e44368f9', '1451187580459-43490279c0fa'][index % 3]}?auto=format&fit=crop&q=80&w=400`,
        category: ['trending', 'funny', 'educational', 'creative'][index % 4],
        summary: `Video vertical TikTok/Reel populer menelaah topik ${noun} yang viral di kalangan netizen daerah.`
      };
    }

    if (type === 'long-video') {
      const longTitles = [
        `Dokumenter Eksklusif: Penataan Cagar Budaya & Wisata Heritage di ${city.name}`,
        `Wawancara Panel: Kesiapan Regulasi Pajak Baru Menghadapi Resesi bersama ${person}`,
        `Masterclass AI: Cara Implementasi Chatbot Lokal Akurasi Tinggi Menggunakan Serverless`
      ];
      return {
        id: `mlg-virtual-${index}`,
        title: longTitles[index % longTitles.length],
        creator: `INFOBOS TV Studio`,
        views: `${(views / 1000).toFixed(1)}K`,
        duration: `${(index % 15) + 10}:45`,
        uploadedAt: `${(index % 6) + 1} hari lalu`,
        thumbnail: `https://images.unsplash.com/photo-${['1590001155093-a3c66ab0c3ff', '1526304640581-d334cdbbf45e', '1559526324-4b87b5e36e44'][index % 3]}?auto=format&fit=crop&q=80&w=800`,
        category: ['documentary', 'interview', 'tutorial', 'webinar'][index % 4],
        summary: `Kajian mendalam berdurasi panjang mengenai peranan infrastruktur siber dan model ${noun} regional.`
      };
    }

    if (type === 'podcast') {
      const podcastTitles = [
        `Ruang Berisik Eps #${index}: Menjawab Polemik Kenaikan Pajak bersama ${person}`,
        `Tech Talk Indonesia: Bagaimana ${company} Memanfaatkan Model LLM Generatif`,
        `Bisnis & Kopi: Kupas Tuntas Strategi Pemasaran UMKM Kreatif Menghadapi Kompetisi Global`
      ];
      return {
        id: `pod-virtual-${index}`,
        title: podcastTitles[index % podcastTitles.length],
        series: `INFOBOS Podcast Series`,
        season: Math.floor(index / 10) + 1,
        episode: (index % 10) + 1,
        guest: person,
        views: views,
        likes: likes,
        commentsCount,
        duration: `${(index % 30) + 25} menit`,
        platform: ['Spotify', 'Apple Podcasts', 'YouTube Audio'][index % 3],
        thumbnail: `https://images.unsplash.com/photo-${['1590283603385-17ffb3a7f29f', '1451187580459-43490279c0fa', '1504711434969-e33886168f5c'][index % 3]}?auto=format&fit=crop&q=80&w=300`,
        transcript: `Transkrip otomatis AI: Selamat datang kembali di ruang dengar utama. Hari ini kita membahas ${noun} yang sedang hangat diperbincangkan publik. Bersama kita telah hadir narasumber kredibel, ${person}...`,
        summary: `Episode diskusi santai mengupas tuntas korelasi antara implementasi teknologi, kebijakan siber, dan ${noun}.`
      };
    }

    if (type === 'document') {
      const formats = ['PDF', 'PPTX', 'DOCX', 'XLSX'];
      const docTypes = ['Laporan Kinerja Tahunan', 'Whitepaper Regulasi Teknis', 'Panduan Operasional Standar', 'Analisis Anggaran Sektoral'];
      return {
        id: `doc-virtual-${index}`,
        title: `${docTypes[index % docTypes.length]} ${noun} - TA 2026`,
        filename: `${noun.toLowerCase().replace(/\s+/g, '_')}_laporan_${index}.${formats[index % formats.length].toLowerCase()}`,
        format: formats[index % formats.length],
        size: `${(rand() * 4.5 + 0.5).toFixed(1)} MB`,
        downloads: Math.floor(views * 0.12),
        uploadedAt: `${(index % 15) + 1} hari lalu`,
        author: `Badan Litbang ${VirtualScaleEngine.govAgenciesName(index)}`,
        category: ['Pemerintah', 'Riset Akademis', 'Korporasi', 'Panduan Teknis'][index % 4],
        summary: `Berkas resmi dan komprehensif diterbitkan guna menganalisis dampak strategis ekonomi digital, penyerapan anggaran, dan akuntabilitas tata laksana sosial.`
      };
    }

    if (type === 'gallery') {
      const gallTitles = [
        `Potret Udara Proyek Revitalisasi Cagar Budaya di ${city.name}`,
        `Konferensi Pers Pengumuman Insentif Pajak oleh Ibu ${person}`,
        `Uji Coba Laboratorium Inovasi IoT Smart Farming di Jawa Barat`
      ];
      return {
        id: `gal-virtual-${index}`,
        title: gallTitles[index % gallTitles.length],
        views: views,
        likes: likes,
        downloads: Math.floor(likes * 0.35),
        takenAt: `${(index % 8) + 1} hari lalu`,
        photographer: `Jurnalis Foto ${person}`,
        aspectRatio: index % 2 === 0 ? '4:3' : '16:9',
        imageUrl: `https://images.unsplash.com/photo-${[
          '1590001155093-a3c66ab0c3ff',
          '1526304640581-d334cdbbf45e',
          '1559526324-4b87b5e36e44',
          '1451187580459-43490279c0fa',
          '1461896836934-ffe607ba8211'
        ][index % 5]}?auto=format&fit=crop&q=80&w=800`,
        summary: `Visualisasi berkualitas tinggi mengabadikan momentum krusial, aksi nyata para pemangku kepentingan, dan pemandangan infrastruktur modern.`
      };
    }

    // Default: 'event'
    const eventTypes = ['Sertifikasi Teknis', 'Rapat Koordinasi Nasional', 'Festival Seni Kreatif', 'Webinar Global', 'Kompetisi Inovasi'];
    return {
      id: `eve-virtual-${index}`,
      title: `${eventTypes[index % eventTypes.length]} ${noun} 2026`,
      organizer: company,
      location: `${city.name} Convention Hall`,
      mapsUrl: `https://maps.google.com/?q=${city.lat},${city.lon}`,
      city: city.name,
      province: city.prov,
      date: new Date(Date.now() + (index * 8 * 3600 * 1000)).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      time: '09:00 - 15:00 WIB',
      quota: Math.floor(rand() * 500) + 100,
      registeredCount: Math.floor(rand() * 200) + 50,
      price: index % 3 === 0 ? 'Gratis' : `Rp ${(Math.floor(rand() * 4) + 1) * 150}K`,
      speaker: person,
      summary: `Pertemuan terpadu guna membahas akselerasi keahlian praktis, peta jalan kolaborasi, dan implementasi nyata solusi ${noun} di tingkat nasional.`
    };
  }

  /**
   * Helper to return government agency names based on index
   */
  private static govAgenciesName(index: number): string {
    return GOV_AGENCIES[index % GOV_AGENCIES.length];
  }

  /**
   * Real-time analytical dashboard simulator. Generates deterministic metrics aggregates
   * reflecting millions of events.
   */
  public static getAnalyticsReport(timeRange: 'daily' | 'weekly' | 'monthly' | 'yearly'): any {
    const dataPointsCount = timeRange === 'daily' ? 24 : timeRange === 'weekly' ? 7 : timeRange === 'monthly' ? 30 : 12;
    const labels = timeRange === 'daily' 
      ? Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`)
      : timeRange === 'weekly' 
        ? ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']
        : timeRange === 'monthly'
          ? Array.from({ length: 30 }, (_, i) => `Tgl ${i + 1}`)
          : ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

    const seriesData = labels.map((label, idx) => {
      // Deterministic sinusoid with some volatility
      const baseSeed = `anal-point-${timeRange}-${idx}`;
      const rand = getSeededRandom(baseSeed)();
      const sineWave = Math.sin((idx / dataPointsCount) * Math.PI * 2) * 15 + 85;
      const volatility = (rand * 10 - 5);
      
      const multiplier = timeRange === 'daily' ? 10000 : timeRange === 'weekly' ? 150000 : timeRange === 'monthly' ? 50000 : 1500000;
      const pageViews = Math.floor((sineWave + volatility) * multiplier);
      const uniqueVisitors = Math.floor(pageViews * (0.35 + rand * 0.05));
      const returningVisitors = pageViews - uniqueVisitors;
      const readTimeSeconds = Math.floor(120 + rand * 180);
      const bounceRate = Number((40 + rand * 15).toFixed(2));
      const ctr = Number((1.2 + rand * 3.5).toFixed(2));
      const watchTimeHours = Math.floor(pageViews * (rand * 0.12 + 0.05));
      const downloads = Math.floor(pageViews * (rand * 0.02));
      const shares = Math.floor(pageViews * (rand * 0.05));
      const conversions = Math.floor(downloads * (rand * 0.15));
      const revenue = Math.floor(conversions * (5000 + rand * 15000));

      return {
        label,
        pageViews,
        uniqueVisitors,
        returningVisitors,
        readTimeSeconds,
        bounceRate,
        ctr,
        watchTimeHours,
        downloads,
        shares,
        conversions,
        revenue
      };
    });

    const totalViews = seriesData.reduce((acc, c) => acc + c.pageViews, 0);
    const totalUnique = seriesData.reduce((acc, c) => acc + c.uniqueVisitors, 0);
    const avgBounce = Number((seriesData.reduce((acc, c) => acc + c.bounceRate, 0) / dataPointsCount).toFixed(2));
    const avgCTR = Number((seriesData.reduce((acc, c) => acc + c.ctr, 0) / dataPointsCount).toFixed(2));
    const totalDownloads = seriesData.reduce((acc, c) => acc + c.downloads, 0);
    const totalShares = seriesData.reduce((acc, c) => acc + c.shares, 0);
    const totalRevenue = seriesData.reduce((acc, c) => acc + c.revenue, 0);

    return {
      timeRange,
      kpis: {
        totalViews,
        totalUnique,
        avgBounce,
        avgCTR,
        totalDownloads,
        totalShares,
        totalRevenue,
        projectedViews: Math.floor(totalViews * 1.15),
        growthPercentage: Number((12.5 + getSeededRandom(timeRange)() * 5).toFixed(1))
      },
      chartData: seriesData,
      regionalHeatmap: CITIES.map((c, i) => {
        const r = getSeededRandom(`region-${timeRange}-${i}`)();
        return {
          city: c.name,
          province: c.prov,
          latitude: c.lat,
          longitude: c.lon,
          views: Math.floor(totalViews * (0.05 + r * 0.15)),
          engagementRate: Number((65 + r * 20).toFixed(1)),
          topTopic: NOUNS[i % NOUNS.length]
        };
      })
    };
  }
}
