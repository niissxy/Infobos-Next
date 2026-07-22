import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, Globe, Compass, RefreshCw, Thermometer, Wind, AlertCircle, 
  Search, Users, Landmark, Building2, GraduationCap, Stethoscope, 
  Palmtree, UtensilsCrossed, Calendar, TrendingUp, DollarSign, Cloud, 
  Map, Network, Briefcase, Share2, Copy, Check, Radio, Play, Pause, Volume2, VolumeX, MessageCircle, ChevronRight,
  Info, Newspaper, ArrowLeft, Heart, ShieldAlert, Layers, ZoomIn, ZoomOut,
  Sliders, CalendarDays, Eye, EyeOff, CheckCircle2, ShieldCheck, Activity,
  Tv, Sparkles, Filter, Clock, BarChart3, HelpCircle, History, MessageSquare,
  Flame, CloudRain, Shield, AlertTriangle, FileText, ShoppingCart, Zap, ListFilter,
  Maximize2, Database, Code, Upload, Settings, ChevronDown, CheckCircle, X
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { IntegrationWidget } from './IntegrationEngine';

export interface MapElementDetails {
  id: string;
  name: string;
  type: 'Polygon' | 'Marker';
  category: string;
  coordinates: { lat: number; lng: number };
  elevation: string;
  description: string;
  businessMetrics: {
    gdpGrowth: string;
    investmentValue: string;
    activeUMKM: string;
    dominantSector: string;
    growthTrend: number;
    companies: { name: string; sector: string; staff: string; capital: string }[];
  };
  regionalStats: {
    population: string;
    areaSize: string;
    aqi: number;
    aqiStatus: string;
    digitalMaturity: string;
    infrastructureScore: string;
    geospatialAccuracy: string;
  };
  newsFeed: {
    id: string;
    title: string;
    category: string;
    time: string;
    sentiment: 'Positif' | 'Netral' | 'Negatif';
    source: string;
    summary: string;
  }[];
  eventNews: {
    title: string;
    date: string;
    location: string;
    organizer: string;
    capacity: string;
    description: string;
  }[];
  chartData: { name: string; Investasi: number; Infrastruktur: number; Digitalisasi: number }[];
  aiRecommendation: string;
}

export interface GeoIntelligenceHubProps {
  initialLayer?: 'regional' | 'nasional' | 'internasional';
  onNavigateToArticle?: (link: string) => void;
}

export function getMapElementDetails(id: string, customName?: string, seedVal?: number): MapElementDetails {
  const elements: Record<string, Partial<MapElementDetails>> = {
    'reg-bandung': {
      id: 'reg-bandung',
      name: 'Bandung Raya (Metropolitan Zone)',
      type: 'Polygon',
      category: 'Kawasan Administratif',
      coordinates: { lat: -6.9175, lng: 107.6191 },
      elevation: '768 mdpl',
      description: 'Pusat administrasi, budaya, dan inovasi teknologi digital Jawa Barat. Jangkar utama interkoneksi ekonomi kreatif dan riset perangkat lunak nasional.',
      businessMetrics: {
        gdpGrowth: '+6.4% YoY',
        investmentValue: 'Rp 45.8 Triliun',
        activeUMKM: '14,280 Terdaftar',
        dominantSector: 'Teknologi & Ekonomi Kreatif',
        growthTrend: 12.4,
        companies: [
          { name: 'PT Bandung Digital Creative', sector: 'Riset AI & GIS', staff: '480 Karyawan', capital: 'Rp 8.4 Miliar' },
          { name: 'Bio Farma Nusantara Hub', sector: 'Farmasi & Bioteknologi', staff: '2,500 Staff', capital: 'Rp 120 Miliar' },
          { name: 'Koperasi Kopi Priangan', sector: 'Industri Pangan', staff: '350 Anggota', capital: 'Rp 2.1 Miliar' }
        ]
      },
      regionalStats: {
        population: '2,544,300 Jiwa',
        areaSize: '167.3 km²',
        aqi: 68,
        aqiStatus: 'Sedang',
        digitalMaturity: '94% Mature',
        infrastructureScore: '92/100',
        geospatialAccuracy: '± 0.5 meter'
      },
      newsFeed: [
        { id: 'n-bdg-1', title: 'Revitalisasi Koridor Kreatif Dago Asri Mulai Diluncurkan', category: 'Seni & Budaya', time: '10 menit lalu', sentiment: 'Positif', source: 'Dago Daily', summary: 'Pemkot menyetujui anggaran Rp 12 Miliar untuk penataan trotoar dan sensor pejalan kaki berbasis AI.' },
        { id: 'n-bdg-2', title: 'Pemasangan 200 Node Sensor Cuaca IoT di Bandung Utara Selesai', category: 'Teknologi', time: '2 jam lalu', sentiment: 'Positif', source: 'Jabar Tech', summary: 'Menghadirkan peta micro-climate dengan akurasi spasial tinggi untuk mitigasi banjir bandang.' },
        { id: 'n-bdg-3', title: 'Kemacetan Akhir Pekan Menuju Lembang Sentuh Level Waspada', category: 'Transportasi', time: '5 jam lalu', sentiment: 'Negatif', source: 'Radio PRFM', summary: 'Satlantas mengerahkan patroli ekstra untuk mengatur simpul masuk jalur arteri Pasteur.' }
      ],
      eventNews: [
        { title: 'Bandung Digital & Creative Expo 2026', date: '12-15 Juli 2026', location: 'Kiara Artha Park', organizer: 'Pemprov Jabar & Diskominfo', capacity: '10,000 Peserta', description: 'Menghubungkan inovator AI lokal dengan investor ventura global.' },
        { title: 'Priangan Heritage Culinary Festival', date: '28-30 Juli 2026', location: 'Gedung Sate Plaza', organizer: 'Asosiasi Kuliner Jabar', capacity: '5,000 Pengunjung', description: 'Eksplorasi cita rasa kopi parahyangan dan kuliner legendaris Sunda.' }
      ],
      chartData: [
        { name: '2020', Investasi: 125, Infrastruktur: 65, Digitalisasi: 50 },
        { name: '2021', Investasi: 145, Infrastruktur: 70, Digitalisasi: 55 },
        { name: '2022', Investasi: 160, Infrastruktur: 75, Digitalisasi: 65 },
        { name: '2023', Investasi: 195, Infrastruktur: 82, Digitalisasi: 72 },
        { name: '2024', Investasi: 225, Infrastruktur: 88, Digitalisasi: 80 },
        { name: '2025', Investasi: 255, Infrastruktur: 92, Digitalisasi: 88 },
        { name: '2026', Investasi: 295, Infrastruktur: 98, Digitalisasi: 95 }
      ],
      aiRecommendation: 'Sangat direkomendasikan untuk pengembangan inkubator SaaS dan pariwisata berkelanjutan. Bandung Raya memiliki indeks kematangan digital (94%) tertinggi dengan suplai talenta muda melimpah.'
    },
    'reg-bogor': {
      id: 'reg-bogor',
      name: 'Kawasan Bogor - Sukabumi',
      type: 'Polygon',
      category: 'Kawasan Administratif',
      coordinates: { lat: -6.5971, lng: 106.8060 },
      elevation: '290 mdpl',
      description: 'Koridor strategis penghubung Jabodetabek dengan wilayah selatan Jabar. Dikenal sebagai paru-paru ekologis dan lumbung pertanian presisi tinggi.',
      businessMetrics: {
        gdpGrowth: '+5.8% YoY',
        investmentValue: 'Rp 28.4 Triliun',
        activeUMKM: '8,450 Terdaftar',
        dominantSector: 'Pertanian Presisi & Agrowisata',
        growthTrend: 8.5,
        companies: [
          { name: 'PT Bogor Agrotech Mandiri', sector: 'IoT Pertanian', staff: '120 Karyawan', capital: 'Rp 4.5 Miliar' },
          { name: 'Lembah Hijau Sentul Resort', sector: 'Agrowisata & Perhotelan', staff: '450 Staff', capital: 'Rp 35 Miliar' }
        ]
      },
      regionalStats: {
        population: '1,890,200 Jiwa',
        areaSize: '118.5 km²',
        aqi: 42,
        aqiStatus: 'Bagus',
        digitalMaturity: '78% Mature',
        infrastructureScore: '80/100',
        geospatialAccuracy: '± 1.2 meter'
      },
      newsFeed: [
        { id: 'n-bgr-1', title: 'Sistem Pertanian Hidroponik Otomatis Diujicobakan di Megamendung', category: 'Agribisnis', time: '1 jam lalu', sentiment: 'Positif', source: 'Bogor Post', summary: 'Petani lokal berhasil meningkatkan produksi selada sebesar 40% menggunakan pompa solar bertenaga IoT.' },
        { id: 'n-bgr-2', title: 'Waspada Longsor Jalur Puncak Akibat Curah Hujan Tinggi', category: 'Mitigasi', time: '4 jam lalu', sentiment: 'Negatif', source: 'BNPB', summary: 'Pengendara diminta menghindari jalur alternatif lereng curam selama cuaca ekstrem.' }
      ],
      eventNews: [
        { title: 'Bogor Agricultural Technology Summit', date: '15-18 Agustus 2026', location: 'Kampus IPB Dramaga', organizer: 'Himpunan Agraria RI', capacity: '3,500 Peserta', description: 'Pameran traktor otonom dan pemetaan lahan pertanian berbasis citra satelit.' }
      ],
      chartData: [
        { name: '2020', Investasi: 80, Infrastruktur: 55, Digitalisasi: 40 },
        { name: '2021', Investasi: 95, Infrastruktur: 60, Digitalisasi: 45 },
        { name: '2022', Investasi: 110, Infrastruktur: 65, Digitalisasi: 52 },
        { name: '2023', Investasi: 130, Infrastruktur: 72, Digitalisasi: 60 },
        { name: '2024', Investasi: 155, Infrastruktur: 75, Digitalisasi: 68 },
        { name: '2025', Investasi: 180, Infrastruktur: 78, Digitalisasi: 74 },
        { name: '2026', Investasi: 210, Infrastruktur: 82, Digitalisasi: 80 }
      ],
      aiRecommendation: 'Sektor Agribisnis Berkelanjutan dan Cold Storage Logistik adalah primadona baru. Infrastruktur jalan tol Bocimi mempercepat koneksi logistik segar menuju Jakarta.'
    },
    'reg-bekasi': {
      id: 'reg-bekasi',
      name: 'Koridor Industrial Bekasi - Depok',
      type: 'Polygon',
      category: 'Kawasan Administratif',
      coordinates: { lat: -6.2383, lng: 106.9756 },
      elevation: '18 mdpl',
      description: 'Hub manufaktur terbesar di Asia Tenggara dan pusat pemukiman modern penopang metropolitan Jabodetabek. Sangat padat investasi asing otomotif dan elektronik.',
      businessMetrics: {
        gdpGrowth: '+7.1% YoY',
        investmentValue: 'Rp 92.4 Triliun',
        activeUMKM: '19,500 Terdaftar',
        dominantSector: 'Manufaktur Berat & Otomotif',
        growthTrend: 15.2,
        companies: [
          { name: 'PT Bekasi Precision Parts', sector: 'Suku Cadang EV', staff: '3,400 Karyawan', capital: 'Rp 240 Miliar' },
          { name: 'Depok Smart-Edu Software', sector: 'Teknologi Edukasi', staff: '180 Staff', capital: 'Rp 12 Miliar' }
        ]
      },
      regionalStats: {
        population: '3,120,400 Jiwa',
        areaSize: '210.8 km²',
        aqi: 118,
        aqiStatus: 'Kurang Sehat',
        digitalMaturity: '89% Mature',
        infrastructureScore: '94/100',
        geospatialAccuracy: '± 0.8 meter'
      },
      newsFeed: [
        { id: 'n-bks-1', title: 'Smelter Pemurnian Tembaga Baru Diresmikan di Kawasan GIIC Cikarang', category: 'Industri', time: '30 menit lalu', sentiment: 'Positif', source: 'Bisnis Indonesia', summary: 'Pabrik canggih ini beroperasi dengan teknologi nol-emisi air limbah dan menyerap 1,500 tenaga kerja lokal.' },
        { id: 'n-bks-2', title: 'Depok Targetkan 100% Digitalisasi Arsip Kecamatan', category: 'Pemerintahan', time: '3 jam lalu', sentiment: 'Positif', source: 'DepokNews', summary: 'Integrasi sistem data kependudukan ke cloud nasional memangkas birokrasi perizinan usaha.' }
      ],
      eventNews: [
        { title: 'Southeast Asia EV Supply Chain Forum', date: '5-7 Agustus 2026', location: 'Grand Metropolitan Convention', organizer: 'Asosiasi Otomotif Indonesia', capacity: '4,000 Peserta', description: 'Sinergitas rantai pasok baterai nikel untuk manufaktur mobil listrik domestik.' }
      ],
      chartData: [
        { name: '2020', Investasi: 220, Infrastruktur: 75, Digitalisasi: 60 },
        { name: '2021', Investasi: 240, Infrastruktur: 78, Digitalisasi: 65 },
        { name: '2022', Investasi: 275, Infrastruktur: 82, Digitalisasi: 72 },
        { name: '2023', Investasi: 310, Infrastruktur: 85, Digitalisasi: 78 },
        { name: '2024', Investasi: 350, Infrastruktur: 88, Digitalisasi: 84 },
        { name: '2025', Investasi: 395, Infrastruktur: 92, Digitalisasi: 88 },
        { name: '2026', Investasi: 450, Infrastruktur: 95, Digitalisasi: 94 }
      ],
      aiRecommendation: 'Sangat matang untuk manufaktur presisi, perakitan teknologi, dan industri logistik. Diperlukan investasi tambahan di pengelolaan limbah industri untuk memperbaiki indeks kualitas udara (AQI: 118).'
    },
    'reg-cirebon': {
      id: 'reg-cirebon',
      name: 'Segitiga Emas Rebana (Cirebon-Patimban-Kertajati)',
      type: 'Polygon',
      category: 'Kawasan Administratif',
      coordinates: { lat: -6.7320, lng: 108.5523 },
      elevation: '5 mdpl',
      description: 'Zona pertumbuhan ekonomi baru Jawa Barat yang menyinergikan Pelabuhan Patimban, Bandara Kertajati, dan kawasan industri Cirebon Raya.',
      businessMetrics: {
        gdpGrowth: '+8.2% YoY',
        investmentValue: 'Rp 64.1 Triliun',
        activeUMKM: '6,800 Terdaftar',
        dominantSector: 'Kemaritiman & Logistik Global',
        growthTrend: 18.4,
        companies: [
          { name: 'PT Patimban Port Services', sector: 'Ekspedisi Logistik', staff: '850 Karyawan', capital: 'Rp 85 Miliar' },
          { name: 'Kertajati Aero Logistics', sector: 'Pergudangan Kargo', staff: '320 Staff', capital: 'Rp 54 Miliar' }
        ]
      },
      regionalStats: {
        population: '1,150,600 Jiwa',
        areaSize: '145.2 km²',
        aqi: 55,
        aqiStatus: 'Bagus',
        digitalMaturity: '82% Mature',
        infrastructureScore: '88/100',
        geospatialAccuracy: '± 1.5 meter'
      },
      newsFeed: [
        { id: 'n-crb-1', title: 'Volume Ekspor di Pelabuhan Patimban Melonjak 35% di Kuartal I', category: 'Logistik', time: '15 menit lalu', sentiment: 'Positif', source: 'Maritime Journal', summary: 'Pintu ekspor otomotif nasional kini bertumpu kuat di pesisir utara Subang-Cirebon.' },
        { id: 'n-crb-2', title: 'Bandara Kertajati Tambah 5 Rute Penerbangan Kargo Internasional', category: 'Penerbangan', time: '2 jam lalu', sentiment: 'Positif', source: 'Kertajati News', summary: 'Rute langsung menuju Singapura dan Shanghai siap melayani komoditas pertanian segar Jabar.' }
      ],
      eventNews: [
        { title: 'Rebana Investment Summit 2026', date: '22-24 Juli 2026', location: 'Kertajati Airport Convention', organizer: 'Pemprov Jabar & BKPM', capacity: '1,200 Pemodal', description: 'Menawarkan 12 proyek infrastruktur ramah lingkungan senilai Rp 45 Triliun.' }
      ],
      chartData: [
        { name: '2020', Investasi: 110, Infrastruktur: 50, Digitalisasi: 35 },
        { name: '2021', Investasi: 135, Infrastruktur: 58, Digitalisasi: 42 },
        { name: '2022', Investasi: 170, Infrastruktur: 65, Digitalisasi: 50 },
        { name: '2023', Investasi: 210, Infrastruktur: 72, Digitalisasi: 60 },
        { name: '2024', Investasi: 265, Infrastruktur: 80, Digitalisasi: 71 },
        { name: '2025', Investasi: 325, Infrastruktur: 85, Digitalisasi: 80 },
        { name: '2026', Investasi: 410, Infrastruktur: 90, Digitalisasi: 88 }
      ],
      aiRecommendation: 'Zona Rebana adalah pusat pertumbuhan dengan potensi akselerasi tercepat (GDP Growth: 8.2%). Investasi pergudangan pintar, logistik terpadu, dan garmen berteknologi tinggi sangat cocok di sini.'
    },
    'reg-tasikmalaya': {
      id: 'reg-tasikmalaya',
      name: 'Priangan Timur (Tasikmalaya-Garut-Ciamis)',
      type: 'Polygon',
      category: 'Kawasan Administratif',
      coordinates: { lat: -7.3274, lng: 108.2207 },
      elevation: '350 mdpl',
      description: 'Wilayah berbukit subur yang mengandalkan keunggulan pariwisata heritage, kerajinan tangan ekspor, serta industri agrikultur berkelanjutan.',
      businessMetrics: {
        gdpGrowth: '+5.1% YoY',
        investmentValue: 'Rp 12.8 Triliun',
        activeUMKM: '11,200 Terdaftar',
        dominantSector: 'Ekonomi Kreatif & Agribisnis',
        growthTrend: 5.4,
        companies: [
          { name: 'Batik Priangan Lestari', sector: 'Kerajinan Ekspor', staff: '240 Pengrajin', capital: 'Rp 1.5 Miliar' },
          { name: 'Garut Leatherworks Co', sector: 'Industri Fashion Kulit', staff: '410 Staff', capital: 'Rp 6.2 Miliar' }
        ]
      },
      regionalStats: {
        population: '1,420,800 Jiwa',
        areaSize: '198.3 km²',
        aqi: 35,
        aqiStatus: 'Bagus',
        digitalMaturity: '71% Mature',
        infrastructureScore: '74/100',
        geospatialAccuracy: '± 1.8 meter'
      },
      newsFeed: [
        { id: 'n-tsk-1', title: 'Sentra Kulit Garut Tembus Pasar Mode Milan & Paris', category: 'Kreatif', time: '1 jam lalu', sentiment: 'Positif', source: 'Tasik Today', summary: 'Desainer lokal memadukan kerajinan kulit tradisional dengan desain modern ramah lingkungan.' },
        { id: 'n-tsk-2', title: 'Jalur Kereta Api Heritage Bandung-Garut Alami Kenaikan Penumpang', category: 'Pariwisata', time: '6 jam lalu', sentiment: 'Positif', source: 'KAI Info', summary: 'Menjadi moda transportasi favorit wisatawan penikmat pemandangan alam pegunungan Priangan.' }
      ],
      eventNews: [
        { title: 'Garut Creative & Leather Festival', date: '10-12 Juli 2026', location: 'Alun-alun Garut', organizer: 'Dekranasda Garut', capacity: '2,500 Pengunjung', description: 'Menampilkan busana kulit etnik kontemporer hasil kolaborasi perajin lokal.' }
      ],
      chartData: [
        { name: '2020', Investasi: 45, Infrastruktur: 48, Digitalisasi: 30 },
        { name: '2021', Investasi: 52, Infrastruktur: 52, Digitalisasi: 35 },
        { name: '2022', Investasi: 60, Infrastruktur: 58, Digitalisasi: 42 },
        { name: '2023', Investasi: 72, Infrastruktur: 64, Digitalisasi: 50 },
        { name: '2024', Investasi: 85, Infrastruktur: 68, Digitalisasi: 58 },
        { name: '2025', Investasi: 102, Infrastruktur: 72, Digitalisasi: 65 },
        { name: '2026', Investasi: 128, Infrastruktur: 76, Digitalisasi: 72 }
      ],
      aiRecommendation: 'Fokuskan pada hilirisasi kerajinan tangan ekspor, pariwisata ramah lingkungan (eco-tourism), dan agro-industri. Daerah ini memiliki keindahan alam luar biasa dan keterampilan perajin turun-temurun.'
    },

    // Markers / Pins
    'marker-berita-bandung': {
      id: 'marker-berita-bandung',
      name: 'Marker: Konflik Regulasi Zonasi Dago',
      type: 'Marker',
      category: 'Berita Hangat',
      coordinates: { lat: -6.8902, lng: 107.6180 },
      elevation: '790 mdpl',
      description: 'Hotspot spasial yang menandai konflik pembagian lahan zonasi cagar budaya komersial di seputar Dago Pakar. Memerlukan audit tata ruang mendalam.',
      businessMetrics: {
        gdpGrowth: 'N/A',
        investmentValue: 'Rp 850 Miliar (Tertunda)',
        activeUMKM: '45 Terdampak',
        dominantSector: 'Tata Ruang & Pariwisata',
        growthTrend: 0,
        companies: []
      },
      regionalStats: {
        population: '4,200 Jiwa (Hiperlokal)',
        areaSize: '1.2 km²',
        aqi: 62,
        aqiStatus: 'Sedang',
        digitalMaturity: '95% Mature',
        infrastructureScore: '85/100',
        geospatialAccuracy: '± 0.2 meter'
      },
      newsFeed: [
        { id: 'n-mb-1', title: 'Warga Tolak Pembangunan Kondominium Baru di Sabuk Hijau Dago', category: 'Agraria', time: '5 menit lalu', sentiment: 'Negatif', source: 'Bandung Tribune', summary: 'Aksi protes warga menuntut pembatalan izin mendirikan bangunan demi menjaga serapan air tanah kota.' }
      ],
      eventNews: [
        { title: 'Rapat Dengar Pendapat Tata Ruang Bandung', date: '3 Juli 2026', location: 'Kantor DPRD Kota Bandung', organizer: 'Dinas Tata Kota', capacity: '150 Orang', description: 'Pertemuan mediasi warga, arsitek pelestari heritage, dan investor swasta.' }
      ],
      chartData: [
        { name: '2020', Investasi: 10, Infrastruktur: 80, Digitalisasi: 75 },
        { name: '2026', Investasi: 85, Infrastruktur: 90, Digitalisasi: 95 }
      ],
      aiRecommendation: 'Diperlukan mediasi legal berbasis data spasial 3D Elevation untuk mengukur dampak visual dan hidrologis pembangunan di sabuk hijau.'
    },
    'marker-tender-cipularang': {
      id: 'marker-tender-cipularang',
      name: 'Marker: Tender Pelebaran Lajur Cipularang KM 90-110',
      type: 'Marker',
      category: 'Proyek Strategis',
      coordinates: { lat: -6.7214, lng: 107.4125 },
      elevation: '420 mdpl',
      description: 'Proyek pengadaan barang dan jasa publik senilai Rp 320 Miliar untuk penambahan lajur lalu lintas guna mereduksi kemacetan logistik utama Bandung-Jakarta.',
      businessMetrics: {
        gdpGrowth: 'N/A',
        investmentValue: 'Rp 320 Miliar',
        activeUMKM: '14 Vendor Konstruksi',
        dominantSector: 'Konstruksi & Teknis Sipil',
        growthTrend: 0,
        companies: []
      },
      regionalStats: {
        population: 'N/A',
        areaSize: '20 km (Jalur)',
        aqi: 78,
        aqiStatus: 'Sedang',
        digitalMaturity: 'N/A',
        infrastructureScore: '95/100',
        geospatialAccuracy: '± 2.5 meter'
      },
      newsFeed: [
        { id: 'n-mt-1', title: 'Pendaftaran Kontraktor Pelebaran Tol Cipularang Resmi Ditutup', category: 'Infrastruktur', time: '20 menit lalu', sentiment: 'Positif', source: 'PUPR News', summary: 'Sebanyak 18 konsorsium BUMN dan swasta nasional memperebutkan paket pengerjaan rigid pavement lajur ke-4.' }
      ],
      eventNews: [
        { title: 'Aanwijzing Teknis & Penjelasan Proyek', date: '6 Juli 2026', location: 'Balai Jalan Nasional DKI-Jabar', organizer: 'Panitia Tender PUPR', capacity: '50 Perwakilan', description: 'Rapat klarifikasi dokumen rincian teknis pengerjaan di bawah lalu lintas padat.' }
      ],
      chartData: [
        { name: '2020', Investasi: 50, Infrastruktur: 70, Digitalisasi: 20 },
        { name: '2026', Investasi: 320, Infrastruktur: 95, Digitalisasi: 50 }
      ],
      aiRecommendation: 'Rekomendasikan implementasi sensor pintar (smart structural health monitoring) di sepanjang tebing jembatan Cipularang untuk mencegah kerusakan akibat getaran beban berat.'
    },
    'marker-pabrik-cirebon': {
      id: 'marker-pabrik-cirebon',
      name: 'Marker: Smelter Presisi Hijau Kertajati',
      type: 'Marker',
      category: 'Proyek Strategis',
      coordinates: { lat: -6.6210, lng: 108.1890 },
      elevation: '12 mdpl',
      description: 'Pembangunan kawasan pabrik perakitan chip dan modul sensor presisi rendah karbon untuk mendukung industri kendaraan listrik nasional.',
      businessMetrics: {
        gdpGrowth: '+12.5% YoY (Sektor Industri)',
        investmentValue: 'Rp 1.2 Triliun',
        activeUMKM: '80 Pemasok Lokal',
        dominantSector: 'Elektronik & Semikonduktor',
        growthTrend: 12.5,
        companies: []
      },
      regionalStats: {
        population: 'N/A',
        areaSize: '45 Hektar',
        aqi: 48,
        aqiStatus: 'Bagus',
        digitalMaturity: '90% Mature',
        infrastructureScore: '90/100',
        geospatialAccuracy: '± 1.0 meter'
      },
      newsFeed: [
        { id: 'n-mp-1', title: 'Konsorsium Global Kucurkan Rp 1.2 Triliun untuk Pabrik Sensor Hijau Kertajati', category: 'Bisnis', time: '10 menit lalu', sentiment: 'Positif', source: 'Kontan', summary: 'Kerja sama patungan asing-domestik ini akan mulai beroperasi penuh pada triwulan pertama tahun depan.' }
      ],
      eventNews: [
        { title: 'Groundbreaking Ceremony Smelter Presisi Hijau', date: '10 Juli 2026', location: 'Kawasan Industri Rebana', organizer: 'Direksi Konsorsium & Pemprov', capacity: '200 Undangan', description: 'Peresmian konstruksi pabrik berkonsep zero-emission pertama.' }
      ],
      chartData: [
        { name: '2020', Investasi: 100, Infrastruktur: 50, Digitalisasi: 40 },
        { name: '2026', Investasi: 1200, Infrastruktur: 90, Digitalisasi: 90 }
      ],
      aiRecommendation: 'Sangat strategis. Dekatnya lokasi pabrik dengan Pelabuhan Patimban (ekspor laut) dan Bandara Kertajati (kargo udara) memberikan efisiensi rantai pasok logistik hingga 30%.'
    },
    'marker-cctv-pasteur': {
      id: 'marker-cctv-pasteur',
      name: 'Marker: CCTV Pasteur West Inflow',
      type: 'Marker',
      category: 'Fasilitas CCTV',
      coordinates: { lat: -6.8970, lng: 107.5732 },
      elevation: '720 mdpl',
      description: 'Kamera pemantau lalu lintas real-time beresolusi tinggi (1080p 24fps) yang mendeteksi kepadatan kendaraan masuk kota Bandung dari arah gerbang tol Pasteur.',
      businessMetrics: {
        gdpGrowth: 'N/A',
        investmentValue: 'N/A',
        activeUMKM: 'N/A',
        dominantSector: 'Lalu Lintas & Keamanan',
        growthTrend: 0,
        companies: []
      },
      regionalStats: {
        population: 'Traffic Flow: 3,200 mobil/jam',
        areaSize: 'Radius 500m',
        aqi: 92,
        aqiStatus: 'Sedang',
        digitalMaturity: '98% Mature',
        infrastructureScore: '96/100',
        geospatialAccuracy: 'Realtime Feed'
      },
      newsFeed: [
        { id: 'n-mcp-1', title: 'Arus Lalu Lintas Pasteur Padat Merayap Akibat Perbaikan Jembatan Penyeberangan', category: 'Transportasi', time: '5 menit lalu', sentiment: 'Netral', source: 'Dishub Bandung', summary: 'Pengendara diimbau mengambil rute alternatif via Pasteur Selatan atau Baros Cimahi.' }
      ],
      eventNews: [
        { title: 'Live Traffic AI Analysis Monitoring', date: 'Berjalan Otomatis', location: 'Dashboard RTMC Polda Jabar', organizer: 'Sistem Operasional', capacity: 'Continuous', description: 'Deteksi plat nomor dan kepadatan otomatis menggunakan model komputer visi.' }
      ],
      chartData: [
        { name: '08:00', Investasi: 3200, Infrastruktur: 90, Digitalisasi: 98 },
        { name: '12:00', Investasi: 2400, Infrastruktur: 90, Digitalisasi: 98 },
        { name: '17:00', Investasi: 3800, Infrastruktur: 90, Digitalisasi: 98 }
      ],
      aiRecommendation: 'Dishub direkomendasikan mengaktifkan lampu merah adaptif (Smart Traffic Light) di persimpangan Pasteur-Suria Sumantri guna mengurai kemacetan ekor tol.'
    },
    'marker-cctv-bogor': {
      id: 'marker-cctv-bogor',
      name: 'Marker: CCTV Gerbang Tol Bogor',
      type: 'Marker',
      category: 'Fasilitas CCTV',
      coordinates: { lat: -6.6025, lng: 106.8152 },
      elevation: '285 mdpl',
      description: 'Kamera pengawas lalu lintas real-time yang memantau arus kendaraan keluar-masuk tol Jagorawi menuju kota Bogor dan kawasan wisata Sentul.',
      businessMetrics: {
        gdpGrowth: 'N/A',
        investmentValue: 'N/A',
        activeUMKM: 'N/A',
        dominantSector: 'Lalu Lintas & Transportasi',
        growthTrend: 0,
        companies: []
      },
      regionalStats: {
        population: 'Traffic Flow: 2,400 mobil/jam',
        areaSize: 'Radius 300m',
        aqi: 55,
        aqiStatus: 'Bagus',
        digitalMaturity: '85% Mature',
        infrastructureScore: '94/100',
        geospatialAccuracy: 'Realtime Feed'
      },
      newsFeed: [
        { id: 'n-mcb-1', title: 'Dishub Bogor Pasang Pembatas Jalan Portabel Jelang Akhir Pekan', category: 'Transportasi', time: '12 menit lalu', sentiment: 'Positif', source: 'Bogor Daily', summary: 'Rekayasa contraflow disiapkan untuk mengantisipasi lonjakan arus wisata menuju kebun raya.' }
      ],
      eventNews: [
        { title: 'Sosialisasi Aturan Ganjil Genap Jagorawi', date: '4 Juli 2026', location: 'Gerbang Tol Bogor', organizer: 'Satlantas Polres Bogor', capacity: '100 Petugas', description: 'Kampanye tertib berkendara dan pembatasan pelat nomor ganjil-genap.' }
      ],
      chartData: [
        { name: '08:00', Investasi: 2400, Infrastruktur: 85, Digitalisasi: 85 },
        { name: '12:00', Investasi: 1900, Infrastruktur: 85, Digitalisasi: 85 },
        { name: '17:00', Investasi: 2800, Infrastruktur: 85, Digitalisasi: 85 }
      ],
      aiRecommendation: 'Sangat disarankan mengintegrasikan feed CCTV ini ke aplikasi navigasi lokal warga guna menyebarkan notifikasi rute macet secara instan.'
    },

    // National Polygons
    'nas-sumut': {
      id: 'nas-sumut',
      name: 'Provinsi Sumatera Utara',
      type: 'Polygon',
      category: 'Kawasan Administratif',
      coordinates: { lat: 2.1121, lng: 99.0894 },
      elevation: '350 mdpl',
      description: 'Provinsi strategis pintu gerbang barat Indonesia. Lumbung perkebunan sawit, karet, dan pariwisata super-prioritas Danau Toba.',
      businessMetrics: {
        gdpGrowth: '+5.4% YoY',
        investmentValue: 'Rp 38.6 Triliun',
        activeUMKM: '12,400 Terdaftar',
        dominantSector: 'Perkebunan, Logistik & Agrowisata',
        growthTrend: 7.2,
        companies: [
          { name: 'PT Perkebunan Sawit Sumut', sector: 'Agribisnis', staff: '4,500 Staff', capital: 'Rp 145 Miliar' },
          { name: 'Toba Eco-Resorts Ltd', sector: 'Pariwisata', staff: '380 Staff', capital: 'Rp 42 Miliar' }
        ]
      },
      regionalStats: {
        population: '15,420,000 Jiwa',
        areaSize: '72,981 km²',
        aqi: 45,
        aqiStatus: 'Bagus',
        digitalMaturity: '81% Mature',
        infrastructureScore: '82/100',
        geospatialAccuracy: '± 2.5 meter'
      },
      newsFeed: [
        { id: 'n-sum-1', title: 'Pengembangan Pelabuhan Kuala Tanjung Sebagai Hub Hubungan Internasional Dipercepat', category: 'Infrastruktur', time: '1 jam lalu', sentiment: 'Positif', source: 'Sumut Post', summary: 'Kementerian Perhubungan menargetkan penyelesaian fase 2 terminal peti kemas pada akhir tahun.' },
        { id: 'n-sum-2', title: 'Festival Budaya Danau Toba Tarik Minat 12 Negara', category: 'Pariwisata', time: '12 jam lalu', sentiment: 'Positif', source: 'Kemenparekraf', summary: 'Ratusan pelaku industri wisata global berkumpul memperkuat ekosistem akomodasi hijau.' }
      ],
      eventNews: [
        { title: 'Toba International Eco-Tourism Forum', date: '18-20 Juli 2026', location: 'Samosir Resort Hub', organizer: 'Kemenparekraf RI', capacity: '1,500 Delegasi', description: 'Merumuskan standar keberlanjutan wisata danau vulkanik terbesar di dunia.' }
      ],
      chartData: [
        { name: '2020', Investasi: 150, Infrastruktur: 60, Digitalisasi: 45 },
        { name: '2026', Investasi: 386, Infrastruktur: 82, Digitalisasi: 81 }
      ],
      aiRecommendation: 'Akselerasi digitalisasi di rantai pasok komoditas perkebunan nikel dan sawit dapat mendongkrak margin keuntungan petani kecil hingga 25%.'
    },
    'nas-jabar': {
      id: 'nas-jabar',
      name: 'Provinsi Jawa Barat',
      type: 'Polygon',
      category: 'Kawasan Administratif',
      coordinates: { lat: -6.9175, lng: 107.6191 },
      elevation: '500 mdpl',
      description: 'Provinsi dengan populasi terbesar di Indonesia. Menjadi episentrum industri manufaktur nasional, pertanian modern, serta inovasi kecerdasan buatan.',
      businessMetrics: {
        gdpGrowth: '+6.2% YoY',
        investmentValue: 'Rp 164.2 Triliun',
        activeUMKM: '42,400 Terdaftar',
        dominantSector: 'Manufaktur Presisi & Teknologi',
        growthTrend: 12.4,
        companies: [
          { name: 'PT Dirgantara Indonesia (Persero)', sector: 'Kedirgantaraan', staff: '3,800 Staff', capital: 'BUMN' },
          { name: 'Jabar Digital Service (JDS)', sector: 'Transformasi Digital', staff: '350 Ahli', capital: 'Pemerintah' }
        ]
      },
      regionalStats: {
        population: '49,400,000 Jiwa',
        areaSize: '35,377 km²',
        aqi: 65,
        aqiStatus: 'Sedang',
        digitalMaturity: '92% Mature',
        infrastructureScore: '94/100',
        geospatialAccuracy: '± 0.5 meter'
      },
      newsFeed: [
        { id: 'n-jb-1', title: 'Revitalisasi Kawasan Gedung Sate untuk Pariwisata Internasional Dimulai', category: 'Pariwisata', time: 'Baru saja', sentiment: 'Positif', source: 'Jabar News', summary: 'Kolaborasi Pemprov Jabar dan arsitek senior meluncurkan penataan heritage kelas dunia.' },
        { id: 'n-jb-2', title: 'Hilirisasi Industri Logam Jawa Barat Tarik Investasi Rp 24 T', category: 'Ekonomi', time: '1 jam lalu', sentiment: 'Positif', source: 'Bisnis Jabar', summary: 'Sektor manufaktur presisi mengalami pertumbuhan pesat didukung regulasi ramah investasi.' }
      ],
      eventNews: [
        { title: 'West Java Investment Summit 2026', date: '5-7 Agustus 2026', location: 'Gedung Sate', organizer: 'DPMPTSP Jabar', capacity: '2,000 Investor', description: 'Peluang pendanaan proyek hijau, interkoneksi tol, dan manufaktur berkelanjutan.' }
      ],
      chartData: [
        { name: '2020', Investasi: 850, Infrastruktur: 75, Digitalisasi: 65 },
        { name: '2026', Investasi: 1642, Infrastruktur: 94, Digitalisasi: 92 }
      ],
      aiRecommendation: 'Potensi kolaborasi investasi teramat besar di Segitiga Rebana. Disarankan mengarahkan ekspansi komersial menuju interkoneksi logistik Kertajati.'
    },
    'nas-sulsel': {
      id: 'nas-sulsel',
      name: 'Provinsi Sulawesi Selatan',
      type: 'Polygon',
      category: 'Kawasan Administratif',
      coordinates: { lat: -5.1477, lng: 119.4327 },
      elevation: '25 mdpl',
      description: 'Pusat pertumbuhan ekonomi wilayah Indonesia Timur (KTI). Jangkar perdagangan maritim, perikanan komersial, serta industri hilirisasi nikel.',
      businessMetrics: {
        gdpGrowth: '+6.9% YoY',
        investmentValue: 'Rp 42.1 Triliun',
        activeUMKM: '9,800 Terdaftar',
        dominantSector: 'Maritim, Perikanan & Tambang',
        growthTrend: 9.8,
        companies: [
          { name: 'PT Makassar Port Logistics', sector: 'Maritim', staff: '1,200 Staff', capital: 'Rp 78 Miliar' },
          { name: 'Sulawesi Nickel Smelter', sector: 'Pertambangan', staff: '3,200 Staff', capital: 'Rp 450 Miliar' }
        ]
      },
      regionalStats: {
        population: '9,120,000 Jiwa',
        areaSize: '46,717 km²',
        aqi: 38,
        aqiStatus: 'Bagus',
        digitalMaturity: '75% Mature',
        infrastructureScore: '84/100',
        geospatialAccuracy: '± 1.5 meter'
      },
      newsFeed: [
        { id: 'n-ss-1', title: 'Ekspor Perikanan Makassar Tembus Pasar Amerika Serikat & Jepang', category: 'Kelautan', time: '2 jam lalu', sentiment: 'Positif', source: 'Celebes News', summary: 'Hasil laut berupa kepiting bakau dan tuna sirip kuning berhasil diekspor langsung dengan sertifikasi ekologis.' }
      ],
      eventNews: [
        { title: 'Makassar International Maritime Forum', date: '10-12 September 2026', location: 'Phinisi Convention Hall', organizer: 'Kemenko Marves', capacity: '1,000 Peserta', description: 'Membahas rantai dingin perikanan laut dalam dan keamanan navigasi laut timur.' }
      ],
      chartData: [
        { name: '2020', Investasi: 180, Infrastruktur: 65, Digitalisasi: 42 },
        { name: '2026', Investasi: 421, Infrastruktur: 84, Digitalisasi: 75 }
      ],
      aiRecommendation: 'Makassar berperan sebagai hub logistik timur. Investasi di bidang armada kapal kargo berpendingin surya (green cold chain) sangat prospektif di perairan ini.'
    },

    // International Polygons
    'int-japan': {
      id: 'int-japan',
      name: 'Negara Jepang (Japan)',
      type: 'Polygon',
      category: 'Negara Daulat',
      coordinates: { lat: 36.2048, lng: 138.2529 },
      elevation: '3,776 mdpl',
      description: 'Kekuatan ekonomi teknologi terbesar di Asia Timur. Menjadi mitra utama Indonesia dalam investasi otomotif, semikonduktor, dan transisi energi bersih.',
      businessMetrics: {
        gdpGrowth: '+1.5% YoY',
        investmentValue: '$4.2 Miliar USD (ke RI)',
        activeUMKM: 'N/A',
        dominantSector: 'Otomotif, Robotik & Elektronika Presisi',
        growthTrend: 2.1,
        companies: [
          { name: 'Toyota Motor Corp', sector: 'Otomotif & EV', staff: '360,000 Staff', capital: 'Global' },
          { name: 'Sony Group', sector: 'Elektronika & Hiburan', staff: '110,000 Staff', capital: 'Global' }
        ]
      },
      regionalStats: {
        population: '124,500,000 Jiwa',
        areaSize: '377,975 km²',
        aqi: 28,
        aqiStatus: 'Sangat Bagus',
        digitalMaturity: '98% Mature',
        infrastructureScore: '99/100',
        geospatialAccuracy: '± 0.1 meter'
      },
      newsFeed: [
        { id: 'n-jp-1', title: 'Japan-Indonesia Technology Consortium Sepakati Riset Baterai Solid-State', category: 'Investasi', time: '1 jam lalu', sentiment: 'Positif', source: 'Nikkei Asia', summary: 'Aliansi industri otomotif Jepang mengumumkan dana riset patungan sebesar $300 Juta USD bersama perguruan tinggi RI.' }
      ],
      eventNews: [
        { title: 'Tokyo Smart Mobility Expo 2026', date: '20-25 Oktober 2026', location: 'Tokyo Big Sight', organizer: 'JAMA', capacity: '50,000 Pengunjung', description: 'Menampilkan teknologi swakemudi generasi ke-5 dan taksi terbang hidrogen.' }
      ],
      chartData: [
        { name: '2020', Investasi: 3800, Infrastruktur: 98, Digitalisasi: 96 },
        { name: '2026', Investasi: 4200, Infrastruktur: 99, Digitalisasi: 98 }
      ],
      aiRecommendation: 'Mitigasi penuaan demografis Jepang menawarkan peluang ekspor besar bagi jasa keperawatan terlatih (caregiver) dan insinyur IT muda Indonesia.'
    },
    'int-indonesia': {
      id: 'int-indonesia',
      name: 'Republik Indonesia',
      type: 'Polygon',
      category: 'Negara Daulat',
      coordinates: { lat: -0.7893, lng: 113.9213 },
      elevation: '4,884 mdpl',
      description: 'Negara kepulauan terbesar di dunia dengan bonus demografi melimpah. Menjadi pusat hilirisasi mineral kritis global dan pasar ekonomi digital terbesar di Asia Tenggara.',
      businessMetrics: {
        gdpGrowth: '+5.2% YoY',
        investmentValue: 'Rp 1,650 Triliun',
        activeUMKM: '64 Juta Terdaftar',
        dominantSector: 'Hilirisasi Nikel & Ekonomi Digital',
        growthTrend: 14.5,
        companies: [
          { name: 'PT GoTo Gojek Tokopedia Tbk', sector: 'Ekonomi Digital', staff: '8,000 Staff', capital: 'Tbk' },
          { name: 'PT Telkom Indonesia (Persero)', sector: 'Telekomunikasi', staff: '22,000 Staff', capital: 'BUMN' }
        ]
      },
      regionalStats: {
        population: '278,500,000 Jiwa',
        areaSize: '1,905,000 km²',
        aqi: 58,
        aqiStatus: 'Sedang',
        digitalMaturity: '84% Mature',
        infrastructureScore: '86/100',
        geospatialAccuracy: '± 1.0 meter'
      },
      newsFeed: [
        { id: 'n-ri-1', title: 'RI Gagas Pembentukan Aliansi Produsen Mineral Kritis OCMEC', category: 'Geopolitik', time: '5 menit lalu', sentiment: 'Positif', source: 'Kemenlu RI', summary: 'Inisiasi pembentukan aliansi eksportir mineral kritis dunia guna meredefinisi tata harga komoditas transisi energi.' }
      ],
      eventNews: [
        { title: 'Indonesia Economic Forum 2026', date: '1-3 Agustus 2026', location: 'Nusantara Convention Hub (IKN)', organizer: 'Kemenko Perekonomian', capacity: '5,000 Delegasi', description: 'Membahas integrasi logistik koridor kepulauan dan kedaulatan pangan berbasis IoT.' }
      ],
      chartData: [
        { name: '2020', Investasi: 1200, Infrastruktur: 72, Digitalisasi: 55 },
        { name: '2026', Investasi: 1650, Infrastruktur: 86, Digitalisasi: 84 }
      ],
      aiRecommendation: 'Fokus hilirisasi mineral kritis nikel dan tembaga, pembangunan IKN Nusantara, serta integrasi jaringan fiber optik 5G rural merupakan pilar utama menuju Indonesia Emas.'
    },
    'reg-karawang': {
      id: 'reg-karawang',
      name: 'Kawasan Industri Karawang',
      type: 'Polygon',
      category: 'Kawasan Administratif',
      coordinates: { lat: -6.3007, lng: 107.2885 },
      elevation: '15 mdpl',
      description: 'Hub industri manufaktur, otomotif, dan logistik terbesar di Jawa Barat Barat. Menghubungkan pusat bisnis Jakarta dengan koridor trans-Jawa.',
      businessMetrics: {
        gdpGrowth: '+7.1% YoY',
        investmentValue: 'Rp 62.4 Triliun',
        activeUMKM: '11,450 Terdaftar',
        dominantSector: 'Industri Manufaktur & Otomotif',
        growthTrend: 14.2,
        companies: [
          { name: 'PT Karawang Motor Assembler', sector: 'Otomotif & EV', staff: '1,800 Karyawan', capital: 'Rp 85 Miliar' },
          { name: 'Suryacipta Logis Park', sector: 'Gudang & Logistik', staff: '850 Staff', capital: 'Rp 45 Miliar' },
          { name: 'Koperasi Tani Jaya Karawang', sector: 'Agribisnis', staff: '420 Anggota', capital: 'Rp 3.5 Miliar' }
        ]
      },
      regionalStats: {
        population: '2,485,200 Jiwa',
        areaSize: '1,752.5 km²',
        aqi: 82,
        aqiStatus: 'Sedang',
        digitalMaturity: '88% Mature',
        infrastructureScore: '94/100',
        geospatialAccuracy: '± 0.8 meter'
      },
      newsFeed: [
        { id: 'n-krw-1', title: 'Perluasan Kawasan Industri Hijau Suryacipta Mulai Digarap', category: 'Industri', time: '15 menit lalu', sentiment: 'Positif', source: 'Karawang Post', summary: 'Menambahkan 150 hektar lahan baru dengan fasilitas pengolahan limbah mandiri bertenaga surya.' },
        { id: 'n-krw-2', title: 'Penerapan Sensor Emisi Real-time di Gerbang Tol Karawang Barat', category: 'Lingkungan', time: '3 jam lalu', sentiment: 'Positif', source: 'Eco Jabar', summary: 'Langkah pemantauan kualitas udara terpadu guna mendeteksi gas buang industri secara spasial.' },
        { id: 'n-krw-3', title: 'Antrian Truk Logistik di Akses Tol Karawang Timur Mengular', category: 'Transportasi', time: '6 jam lalu', sentiment: 'Negatif', source: 'Satelit News', summary: 'Dampak perbaikan jembatan timbang memicu penumpukan kendaraan kontainer di bahu jalan.' }
      ],
      eventNews: [
        { title: 'Karawang Automotive & EV Summit 2026', date: '5-7 Agustus 2026', location: 'Karawang International Exhibition', organizer: 'Asosiasi Industri Otomotif', capacity: '8,000 Peserta', description: 'Ekshibisi inovasi perakitan mobil listrik dan suplai baterai lokal.' },
        { title: 'Festival Padi Unggul & Ketahanan Pangan', date: '22-24 Agustus 2026', location: 'Lapang Karangpawitan', organizer: 'Dinas Pertanian', capacity: '3,000 Pengunjung', description: 'Gelar teknologi pertanian presisi dan pameran varietas padi tahan hama.' }
      ],
      chartData: [
        { name: '2020', Investasi: 180, Infrastruktur: 75, Digitalisasi: 60 },
        { name: '2021', Investasi: 210, Infrastruktur: 78, Digitalisasi: 65 },
        { name: '2022', Investasi: 250, Infrastruktur: 82, Digitalisasi: 70 },
        { name: '2023', Investasi: 310, Infrastruktur: 85, Digitalisasi: 75 },
        { name: '2024', Investasi: 390, Infrastruktur: 89, Digitalisasi: 80 },
        { name: '2025', Investasi: 480, Infrastruktur: 92, Digitalisasi: 85 },
        { name: '2026', Investasi: 624, Infrastruktur: 94, Digitalisasi: 88 }
      ],
      aiRecommendation: 'Sangat direkomendasikan untuk relokasi pabrik manufaktur pintar dan rantai pasok EV. Integrasikan database pergudangan dengan jalur rel ganda untuk memotong biaya kirim.'
    },
    'reg-purwakarta': {
      id: 'reg-purwakarta',
      name: 'Kabupaten Purwakarta (Jatiluhur Hub)',
      type: 'Polygon',
      category: 'Kawasan Administratif',
      coordinates: { lat: -6.5562, lng: 107.4429 },
      elevation: '84 mdpl',
      description: 'Pusat konektivitas energi air nasional dengan bendungan Jatiluhur. Koridor strategis industri tekstil modern, komponen baja, dan pariwisata kuliner.',
      businessMetrics: {
        gdpGrowth: '+5.5% YoY',
        investmentValue: 'Rp 18.2 Triliun',
        activeUMKM: '5,120 Terdaftar',
        dominantSector: 'Energi, Baja & Pariwisata',
        growthTrend: 7.8,
        companies: [
          { name: 'PT Jatiluhur Hydro Energy', sector: 'Energi Baru Terbarukan', staff: '350 Karyawan', capital: 'Rp 45 Miliar' },
          { name: 'Baja Mulia Nusantara', sector: 'Logam & Fabrikasi', staff: '620 Staff', capital: 'Rp 28 Miliar' },
          { name: 'UMKM Sate Maranggi Lestari', sector: 'Kuliner & Wisata', staff: '120 Anggota', capital: 'Rp 1.2 Miliar' }
        ]
      },
      regionalStats: {
        population: '984,300 Jiwa',
        areaSize: '971.7 km²',
        aqi: 54,
        aqiStatus: 'Sedang',
        digitalMaturity: '82% Mature',
        infrastructureScore: '88/100',
        geospatialAccuracy: '± 1.2 meter'
      },
      newsFeed: [
        { id: 'n-pwk-1', title: 'Pemasangan Panel Surya Terapung Jatiluhur Fase II Dimulai', category: 'Energi', time: '30 menit lalu', sentiment: 'Positif', source: 'Purwakarta Media', summary: 'Menambahkan kapasitas 145 MWp guna memperkuat bauran energi hijau di wilayah Jawa Barat.' },
        { id: 'n-pwk-2', title: 'Festival Sate Maranggi Nusantara Menarik Ribuan Wisatawan', category: 'Pariwisata', time: '4 jam lalu', sentiment: 'Positif', source: 'Jabar Travel', summary: 'Mendorong perputaran uang hingga Rp 5 Miliar dalam tiga hari pelaksanaan festival.' },
        { id: 'n-pwk-3', title: 'Debit Air Bendungan Jatiluhur Menyusut Tipis Selama Musim Kemarau', category: 'Lingkungan', time: '8 jam lalu', sentiment: 'Netral', source: 'Kementerian PUPR', summary: 'Pasokan air baku untuk wilayah Jakarta dan irigasi Karawang dipastikan tetap aman.' }
      ],
      eventNews: [
        { title: 'Purwakarta Green Energy Forum 2026', date: '18-20 Juli 2026', location: 'Hotel Harper Jatiluhur', organizer: 'Asosiasi Energi Baru', capacity: '500 Peserta', description: 'Simposium transisi energi terbarukan and ekosistem karbon biru.' },
        { title: 'Gelar Seni Budaya Air & Festival Danau', date: '1-3 Agustus 2026', location: 'Kawasan Wisata Grama Tirta', organizer: 'Disparbud Purwakarta', capacity: '4,000 Pengunjung', description: 'Atraksi perahu hias tradisi Sunda dan pentas musik pinggir danau.' }
      ],
      chartData: [
        { name: '2020', Investasi: 80, Infrastruktur: 70, Digitalisasi: 50 },
        { name: '2021', Investasi: 95, Infrastruktur: 72, Digitalisasi: 55 },
        { name: '2022', Investasi: 110, Infrastruktur: 75, Digitalisasi: 60 },
        { name: '2023', Investasi: 130, Infrastruktur: 80, Digitalisasi: 68 },
        { name: '2024', Investasi: 148, Infrastruktur: 83, Digitalisasi: 72 },
        { name: '2025', Investasi: 165, Infrastruktur: 86, Digitalisasi: 78 },
        { name: '2026', Investasi: 182, Infrastruktur: 88, Digitalisasi: 82 }
      ],
      aiRecommendation: 'Sangat cocok untuk investasi pembangkit listrik mikrohidro dan wisata air premium. Kembangkan kluster kuliner Maranggi terintegrasi GPS logistik untuk efisiensi rantai suplai daging sapi.'
    },
    'reg-subang': {
      id: 'reg-subang',
      name: 'Kabupaten Subang (Rebana Port Gateway)',
      type: 'Polygon',
      category: 'Kawasan Administratif',
      coordinates: { lat: -6.5715, lng: 107.7587 },
      elevation: '52 mdpl',
      description: 'Gerbang ekspor laut Jawa Barat dengan kehadiran Pelabuhan Internasional Patimban. Jantung utama pertumbuhan ekonomi baru kawasan Segitiga Rebana.',
      businessMetrics: {
        gdpGrowth: '+8.3% YoY',
        investmentValue: 'Rp 41.5 Triliun',
        activeUMKM: '7,280 Terdaftar',
        dominantSector: 'Logistik Maritim & Kawasan Industri',
        growthTrend: 16.5,
        companies: [
          { name: 'PT Patimban Port Operator', sector: 'Infrastruktur Maritim', staff: '950 Karyawan', capital: 'Rp 140 Miliar' },
          { name: 'Subang Smartpolis Estate', sector: 'Kawasan Industri', staff: '420 Staff', capital: 'Rp 85 Miliar' },
          { name: 'Koperasi Nanas Madu Subang', sector: 'Agribisnis Ekspor', staff: '580 Anggota', capital: 'Rp 4.2 Miliar' }
        ]
      },
      regionalStats: {
        population: '1,642,800 Jiwa',
        areaSize: '2,051.8 km²',
        aqi: 46,
        aqiStatus: 'Bagus',
        digitalMaturity: '86% Mature',
        infrastructureScore: '91/100',
        geospatialAccuracy: '± 0.9 meter'
      },
      newsFeed: [
        { id: 'n-sbg-1', title: 'Kapal Kargo Raksasa Bersandar Perdana di Terminal 2 Patimban', category: 'Maritim', time: '10 menit lalu', sentiment: 'Positif', source: 'Subang Daily', summary: 'Membuka jalur pelayaran langsung (direct call) menuju Pelabuhan Rotterdam untuk mempersingkat waktu tempuh.' },
        { id: 'n-sbg-2', title: 'Pembangunan Akses Tol Patimban Ditargetkan Selesai Akhir Tahun', category: 'Infrastruktur', time: '5 jam lalu', sentiment: 'Positif', source: 'Bisnis Jabar', summary: 'Jalan tol sepanjang 37 km ini akan menghubungkan tol Cipali langsung ke gerbang masuk pelabuhan utama.' },
        { id: 'n-sbg-3', title: 'Konflik Penggunaan Lahan Pertanian untuk Industri Subang Memanas', category: 'Sosial', time: '12 jam lalu', sentiment: 'Negatif', source: 'Sunda Post', summary: 'Warga menuntut kompensasi tata ruang hijau dan pelibatan tenaga kerja lokal dalam proyek pabrik baru.' }
      ],
      eventNews: [
        { title: 'Subang Maritime & Logistics Expo 2026', date: '20-22 Juli 2026', location: 'Patimban Maritime Convention', organizer: 'Kemenhub & Pemkab', capacity: '1,500 Peserta', description: 'Forum kemitraan logistik laut, pergudangan modern, dan ekspor-impor.' },
        { title: 'Pesta Laut Patimban & Sedekah Bumi', date: '15-16 Agustus 2026', location: 'Pantai Patimban', organizer: 'Himpunan Nelayan Subang', capacity: '5,000 Pengunjung', description: 'Ritual budaya syukur nelayan dibarengi perlombaan kapal hias tradisi.' }
      ],
      chartData: [
        { name: '2020', Investasi: 95, Infrastruktur: 65, Digitalisasi: 45 },
        { name: '2021', Investasi: 130, Infrastruktur: 70, Digitalisasi: 50 },
        { name: '2022', Investasi: 185, Infrastruktur: 75, Digitalisasi: 58 },
        { name: '2023', Investasi: 240, Infrastruktur: 81, Digitalisasi: 68 },
        { name: '2024', Investasi: 295, Infrastruktur: 85, Digitalisasi: 75 },
        { name: '2025', Investasi: 350, Infrastruktur: 88, Digitalisasi: 81 },
        { name: '2026', Investasi: 415, Infrastruktur: 91, Digitalisasi: 86 }
      ],
      aiRecommendation: 'Prioritaskan pembangunan Dry Port dan pergudangan beku (Cold Storage) skala besar di seputar Patimban untuk mendukung ekspor produk perikanan laut utara.'
    },
    'reg-sumedang': {
      id: 'reg-sumedang',
      name: 'Kabupaten Sumedang (Cisumdawu Corridor)',
      type: 'Polygon',
      category: 'Kawasan Administratif',
      coordinates: { lat: -6.8404, lng: 107.9213 },
      elevation: '450 mdpl',
      description: 'Pusat kebudayaan Sunda dan pendidikan tinggi (Unpad Jatinangor). Terkoneksi penuh oleh tol Cisumdawu, menjadikannya kluster pariwisata alam dan agribisnis ubi jalar.',
      businessMetrics: {
        gdpGrowth: '+5.7% YoY',
        investmentValue: 'Rp 12.4 Triliun',
        activeUMKM: '6,800 Terdaftar',
        dominantSector: 'Pendidikan Tinggi, Kuliner & Agro',
        growthTrend: 8.2,
        companies: [
          { name: 'PT Sumedang Tech Innovation', sector: 'Software & EduTech', staff: '150 Karyawan', capital: 'Rp 6.5 Miliar' },
          { name: 'Tahu Sumedang Sari Rasa', sector: 'Industri Makanan', staff: '240 Staff', capital: 'Rp 4.2 Miliar' },
          { name: 'Koperasi Agro Jatinangor', sector: 'Hortikultura', staff: '320 Anggota', capital: 'Rp 1.8 Miliar' }
        ]
      },
      regionalStats: {
        population: '1,175,400 Jiwa',
        areaSize: '1,518.3 km²',
        aqi: 51,
        aqiStatus: 'Bagus',
        digitalMaturity: '89% Mature',
        infrastructureScore: '87/100',
        geospatialAccuracy: '± 1.1 meter'
      },
      newsFeed: [
        { id: 'n-smd-1', title: 'Implementasi Sumedang Smart Government Diadopsi Nasional', category: 'Pemerintahan', time: '1 jam lalu', sentiment: 'Positif', source: 'Sumedang Online', summary: 'Platform pelayanan publik berbasis microservices spasial berhasil menekan birokrasi perizinan usaha daerah.' },
        { id: 'n-smd-2', title: 'Wisata Paralayang Gunung Toga Ramai Dikunjungi Atlet Nasional', category: 'Pariwisata', time: '6 jam lalu', sentiment: 'Positif', source: 'Priangan Info', summary: 'Lokasi paralayang Sumedang dinilai memiliki hembusan angin termal terbaik untuk latihan akrobatik udara.' },
        { id: 'n-smd-3', title: 'Kemacetan Terjadi di Cadas Pangeran Akibat Longsoran Batu Kecil', category: 'Bencana', time: '10 jam lalu', sentiment: 'Negatif', source: 'Lantas Sumedang', summary: 'Pengendara roda empat diimbau beralih menggunakan jalur Tol Cisumdawu untuk menghindari potensi bahaya.' }
      ],
      eventNews: [
        { title: 'Sumedang Creative Agro Fest 2026', date: '10-12 Juli 2026', location: 'Alun-Alun Sumedang', organizer: 'Diskopindag Sumedang', capacity: '2,500 Pengunjung', description: 'Pameran produk ubi cilembu olahan dan kerajinan bambu kreatif.' },
        { title: 'Jatinangor Edutech Summit', date: '25-27 Juli 2026', location: 'Bale Sawala Unpad', organizer: 'Himpunan Inovator Jatinangor', capacity: '800 Mahasiswa', description: 'Temu wicara digitalisasi metode belajar berbasis augmented reality.' }
      ],
      chartData: [
        { name: '2020', Investasi: 65, Infrastruktur: 60, Digitalisasi: 55 },
        { name: '2021', Investasi: 72, Infrastruktur: 65, Digitalisasi: 60 },
        { name: '2022', Investasi: 83, Infrastruktur: 70, Digitalisasi: 67 },
        { name: '2023', Investasi: 92, Infrastruktur: 75, Digitalisasi: 74 },
        { name: '2024', Investasi: 104, Infrastruktur: 80, Digitalisasi: 81 },
        { name: '2025', Investasi: 115, Infrastruktur: 84, Digitalisasi: 85 },
        { name: '2026', Investasi: 124, Infrastruktur: 87, Digitalisasi: 89 }
      ],
      aiRecommendation: 'Manfaatkan kedekatan dengan kawasan universitas Jatinangor untuk membangun pusat inovasi software daerah (Java Silicon Valley). Kembangkan wisata kuliner Tahu terpadu.'
    },
    'reg-indramayu': {
      id: 'reg-indramayu',
      name: 'Kabupaten Indramayu (Coastal Fishery Hub)',
      type: 'Polygon',
      category: 'Kawasan Administratif',
      coordinates: { lat: -6.3263, lng: 108.3200 },
      elevation: '4 mdpl',
      description: 'Lumbung padi terbesar di Jawa Barat dan produsen perikanan tangkap terbesar di pantai utara. Memiliki pelabuhan perikanan Karangsong yang legendaris.',
      businessMetrics: {
        gdpGrowth: '+5.3% YoY',
        investmentValue: 'Rp 14.8 Triliun',
        activeUMKM: '8,120 Terdaftar',
        dominantSector: 'Pertanian Padi & Perikanan Tangkap',
        growthTrend: 7.2,
        companies: [
          { name: 'PT Indramayu Fishery Group', sector: 'Pengolahan Ikan Ekspor', staff: '450 Karyawan', capital: 'Rp 18 Miliar' },
          { name: 'Pabrik Beras Candra Kirana', sector: 'Penyosohan Padi Modern', staff: '280 Staff', capital: 'Rp 12 Miliar' },
          { name: 'Koperasi Perikanan Karangsong', sector: 'Nelayan Mandiri', staff: '1,200 Anggota', capital: 'Rp 8.5 Miliar' }
        ]
      },
      regionalStats: {
        population: '1,812,500 Jiwa',
        areaSize: '2,040.1 km²',
        aqi: 42,
        aqiStatus: 'Bagus',
        digitalMaturity: '76% Mature',
        infrastructureScore: '85/100',
        geospatialAccuracy: '± 1.3 meter'
      },
      newsFeed: [
        { id: 'n-imy-1', title: 'Tangkapan Tuna Melimpah di Pelabuhan Karangsong Pekan Ini', category: 'Perikanan', time: '15 menit lalu', sentiment: 'Positif', source: 'Pantura Post', summary: 'Ratusan kapal nelayan bersandar membawa muatan ikan layang dan tenggiri berkualitas ekspor.' },
        { id: 'n-imy-2', title: 'Panen Raya Padi Organik Indramayu Hasilkan 12 Ton per Hektar', category: 'Pertanian', time: '4 jam lalu', sentiment: 'Positif', source: 'Koran Mangga', summary: 'Penggunaan pupuk organik hayati hasil riset mandiri terbukti melipatgandakan hasil panen sawah tadah hujan.' },
        { id: 'n-imy-3', title: 'Abrasi Pantai Indramayu Utara Paksa Relokasi Pemukiman Nelayan', category: 'Bencana', time: '9 jam lalu', sentiment: 'Negatif', source: 'Radar Indramayu', summary: 'Gelombang pasang laut merusak tanggul darurat, mendesak pembangunan breakwater permanen oleh Balai Besar Sungai.' }
      ],
      eventNews: [
        { title: 'Indramayu Fishery & Agritech Expo 2026', date: '15-18 Juli 2026', location: 'Pelabuhan Perikanan Karangsong', organizer: 'Dinas Perikanan & Nelayan', capacity: '3,000 Peserta', description: 'Pameran kapal penangkap ikan modern dan teknologi radar sonar nelayan.' },
        { title: 'Festival Mangga Indramayu & Pesta Rakyat', date: '5-7 Agustus 2026', location: 'Plaza Kuliner Pantai Cimanuk', organizer: 'Asosiasi Petani Mangga', capacity: '4,500 Pengunjung', description: 'Bazar varietas mangga Gedong Gincu legendaris dan kontes mangga raksasa.' }
      ],
      chartData: [
        { name: '2020', Investasi: 70, Infrastruktur: 62, Digitalisasi: 45 },
        { name: '2021', Investasi: 80, Infrastruktur: 65, Digitalisasi: 50 },
        { name: '2022', Investasi: 92, Infrastruktur: 69, Digitalisasi: 56 },
        { name: '2023', Investasi: 105, Infrastruktur: 74, Digitalisasi: 62 },
        { name: '2024', Investasi: 118, Infrastruktur: 78, Digitalisasi: 68 },
        { name: '2025', Investasi: 132, Infrastruktur: 81, Digitalisasi: 72 },
        { name: '2026', Investasi: 148, Infrastruktur: 85, Digitalisasi: 76 }
      ],
      aiRecommendation: 'Kembangkan teknologi pembekuan nitrogen cair di Pelabuhan Karangsong untuk mempertahankan kualitas premium ikan ekspor. Tingkatkan cakupan internet di wilayah pertanian.'
    }
  };

  if (elements[id]) {
    return elements[id] as MapElementDetails;
  }

  const name = customName || id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const seed = (seedVal || 42) + name.length;
  const pop = ((seed % 100) + 12) * 23000;
  const area = ((seed % 50) + 8) * 35;
  const aqi = (seed % 100) + 30;

  return {
    id,
    name,
    type: id.includes('marker') ? 'Marker' : 'Polygon',
    category: id.includes('marker') ? 'Proyek Strategis' : 'Kawasan Administratif',
    coordinates: { lat: -6.9 + (seed % 10) / 100, lng: 107.6 + (seed % 10) / 100 },
    elevation: `${(seed % 300) + 50} mdpl`,
    description: `Kawasan spesifik ${name} yang sedang dipantau secara langsung oleh sistem intelijen spasial INFOBOS. Menunjukkan pertumbuhan ekonomi lokal yang stabil.`,
    businessMetrics: {
      gdpGrowth: `+${((seed % 40) / 10 + 4.2).toFixed(1)}% YoY`,
      investmentValue: `Rp ${((seed % 60) + 8.5).toFixed(1)} Triliun`,
      activeUMKM: `${((seed % 300) + 120) * 10} Terdaftar`,
      dominantSector: seed % 2 === 0 ? 'Logistik & Jasa Kontrak' : 'Teknologi & Agrobisnis',
      growthTrend: (seed % 10) + 4,
      companies: [
        { name: `PT ${name.replace(/^(Provinsi|Kecamatan|Kelurahan)\s+/i, '')} Utama`, sector: 'Logistik', staff: '150 Staff', capital: 'Rp 12.5 Miliar' }
      ]
    },
    regionalStats: {
      population: `${pop.toLocaleString('id-ID')} Jiwa`,
      areaSize: `${area.toLocaleString('id-ID')} km²`,
      aqi,
      aqiStatus: aqi > 100 ? 'Kurang Sehat' : aqi > 50 ? 'Sedang' : 'Bagus',
      digitalMaturity: `${(70 + (seed % 25))}% Mature`,
      infrastructureScore: `${(72 + (seed % 20))}/100`,
      geospatialAccuracy: '± 1.5 meter'
    },
    newsFeed: [
      { id: `n-fall-${seed}-1`, title: `Sektor Logistik di ${name} Alami Optimalisasi Sistem Spasial`, category: 'Infrastruktur', time: '2 jam lalu', sentiment: 'Positif', source: 'INFOBOS News', summary: 'Penerapan modul pemetaan digital membantu mereduksi biaya operasional distribusi logistik hingga 15%.' }
    ],
    eventNews: [
      { title: `${name} Business Round-Table 2026`, date: '18 Juli 2026', location: 'Kantor Balai Wilayah', organizer: 'Asosiasi Bisnis Lokal', capacity: '100 Delegasi', description: 'Sinergitas tata kelola investasi daerah penopang stabilitas niaga.' }
    ],
    chartData: [
      { name: '2020', Investasi: 50, Infrastruktur: 60, Digitalisasi: 40 },
      { name: '2026', Investasi: (seed % 100) + 200, Infrastruktur: (seed % 30) + 65, Digitalisasi: (seed % 40) + 55 }
    ],
    aiRecommendation: `Optimalkan interkoneksi logistik digital rural di seputar ${name} untuk meningkatkan efisiensi pasar domestik.`
  };
}

// 25 Smart relationship link chain
const SMART_RELATIONSHIP_STEPS = [
  { key: 'berita', label: '📰 Berita' },
  { key: 'perusahaan', label: '💼 Perusahaan' },
  { key: 'produk', label: '📦 Produk' },
  { key: 'umkm', label: '🏪 UMKM' },
  { key: 'wisata', label: '🏔️ Wisata' },
  { key: 'kuliner', label: '🍜 Kuliner' },
  { key: 'hotel', label: '🏨 Hotel' },
  { key: 'transportasi', label: '🚗 Transportasi' },
  { key: 'regulasi', label: '📜 Regulasi' },
  { key: 'tender', label: '🏗️ Tender' },
  { key: 'event', label: '📅 Event' },
  { key: 'video', label: '🎥 Video' },
  { key: 'podcast', label: '🎙️ Podcast' },
  { key: 'marketplace', label: '🛒 Marketplace' },
  { key: 'monitoring', label: '🎯 Monitoring' },
  { key: 'statistik', label: '📈 Statistik' },
  { key: 'ai-summary', label: '🤖 AI Summary' },
  { key: 'knowledge-graph', label: '🕸️ Knowledge Graph' },
  { key: 'telekomunikasi', label: '🔌 Infrastruktur 5G & Fiber' },
  { key: 'kebencanaan', label: '🌋 Mitigasi Kebencanaan' },
  { key: 'logistik', label: '🚢 Hub Logistik & Maritim' },
  { key: 'pertanian', label: '🌾 Agribisnis & Sawah Abadi' },
  { key: 'energi', label: '⚡ Energi Terbarukan & Solar' }
];

export default function GeoIntelligenceHub({ 
  initialLayer = 'nasional',
  onNavigateToArticle 
}: GeoIntelligenceHubProps) {
  
  // --- STATE SYSTEM ---
  const [activeLayer, setActiveLayer] = useState<'regional' | 'nasional' | 'internasional'>(initialLayer);
  const [mapTheme, setMapTheme] = useState<'vector' | 'satellite' | 'heatmap' | '3d'>('vector');
  const [timePeriod, setTimePeriod] = useState<number>(2026); // Time Machine slider state
  const [isPlayingTime, setIsPlayingTime] = useState<boolean>(false);
  const [searchVal, setSearchVal] = useState('');
  const [selectedSubTab, setSelectedSubTab] = useState<'overview' | 'news' | 'business' | 'gov' | 'market' | 'event' | 'monitoring' | 'multimedia' | 'stats' | 'ai'>('overview');
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [apiFeedback, setApiFeedback] = useState<string | null>(null);
  const [activeRelationshipStep, setActiveRelationshipStep] = useState<string>('berita');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isWorkspaceMode, setIsWorkspaceMode] = useState<boolean>(false);
  
  // Selected Map Element State
  const [selectedElementId, setSelectedElementId] = useState<string>('reg-bandung');
  
  // Interactive GPS Coordinates Tooltip State
  const [hoveredCoords, setHoveredCoords] = useState<{ x: number; y: number; lat: string; lng: string } | null>(null);

  // GeoOS Active Map Layer States
  const [enabledLayers, setEnabledLayers] = useState<Record<string, boolean>>({
    berita: true,
    perusahaan: true,
    umkm: true,
    startup: false,
    pemerintah: true,
    regulasi: false,
    sekolah: false,
    rumahsakit: false,
    bandara: true,
    pelabuhan: true,
    cctv: true,
    cuaca: true,
    banjir: false,
    aqi: true,
    traffic: false,
    heatmap: false
  });

  // CMS Simulation states
  const [cmsLayers, setCmsLayers] = useState<string[]>(['Berita', 'Perusahaan', 'Bencana']);
  const [newLayerName, setNewLayerName] = useState('');
  const [geojsonFileName, setGeojsonFileName] = useState<string | null>(null);

  // Social Media Video Ad Embed Sidebar Menu States & Data
  const [activeAdIndex, setActiveAdIndex] = useState<number>(0);
  const [isPlayingAd, setIsPlayingAd] = useState<boolean>(true);
  const [isMutedAd, setIsMutedAd] = useState<boolean>(true);
  const [adPlatform, setAdPlatform] = useState<'tiktok' | 'reels' | 'shorts'>('tiktok');
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState<boolean>(false);

  // Brand-new Social Media Trending Embed States
  const [selectedSocialPlatform, setSelectedSocialPlatform] = useState<'tiktok' | 'instagram' | 'youtube' | 'x' | 'threads'>('tiktok');
  const [socialLikesCount, setSocialLikesCount] = useState<Record<string, number>>({
    tiktok: 45200,
    instagram: 28400,
    youtube: 12500,
    x: 8430,
    threads: 3120
  });
  const [isSocialLiked, setIsSocialLiked] = useState<Record<string, boolean>>({});
  const [socialComments, setSocialComments] = useState<Record<string, { user: string; text: string; time: string }[]>>({
    tiktok: [
      { user: "rully_spasial", text: "Keren banget monitoring wilayahnya lengkap! 👍", time: "2m ago" },
      { user: "jabar_squad", text: "Patimban bakal jadi pelabuhan terbesar nih", time: "15m ago" }
    ],
    instagram: [
      { user: "lestari_alam", text: "Pemandangannya indah banget, bangga sama Jabar! 😍", time: "1h ago" },
      { user: "investor_muda", text: "Sektor agribisnis mangga gincu prospektif banget", time: "3h ago" }
    ],
    youtube: [
      { user: "GeoWatcher", text: "Penjelasan tata ruangnya sangat ilmiah & mudah dipahami. Ditunggu kelanjutannya!", time: "5h ago" },
      { user: "TechSunda", text: "Infrastruktur digital di Sumedang emang top tier sekarang.", time: "1d ago" }
    ],
    x: [
      { user: "budi_tech", text: "Akhirnya bisa pantau CCTV lalu lintas real-time pas mudik besok. Mantap!", time: "4m ago" },
      { user: "green_jabar", text: "Fokus energi terbaruan di Jatiluhur harus didukung penuh #EBT", time: "20m ago" }
    ],
    threads: [
      { user: "amanda.gis", text: "Minimalis banget interfacenya, data spasialnya akurat luar biasa.", time: "10m ago" },
      { user: "ridwan.dev", text: "Thread yang sangat edukatif tentang koridor Rebana.", time: "45m ago" }
    ]
  });
  const [newSocialComment, setNewSocialComment] = useState<string>('');

  const handleAddSocialComment = (platform: 'tiktok' | 'instagram' | 'youtube' | 'x' | 'threads') => {
    if (!newSocialComment.trim()) return;
    const newCommentObj = {
      user: "gis_explorer_2026",
      text: newSocialComment,
      time: "Just now"
    };
    setSocialComments(prev => ({
      ...prev,
      [platform]: [newCommentObj, ...prev[platform]]
    }));
    setNewSocialComment('');
    setApiFeedback(`Komentar terposting di ${platform.toUpperCase()}!`);
    setTimeout(() => setApiFeedback(null), 1500);
  };

  const handleLikeSocialPost = (platform: string) => {
    const wasLiked = isSocialLiked[platform];
    setIsSocialLiked(prev => ({ ...prev, [platform]: !wasLiked }));
    setSocialLikesCount(prev => ({
      ...prev,
      [platform]: wasLiked ? prev[platform] - 1 : prev[platform] + 1
    }));
    setApiFeedback(wasLiked ? "Batal menyukai postingan" : "Postingan disukai! ❤️");
    setTimeout(() => setApiFeedback(null), 1500);
  };

  // Trending Tokoh Viral states & structured data
  const [selectedTokohCategory, setSelectedTokohCategory] = useState<'semua' | 'pemerintahan' | 'bisnis' | 'sosial'>('semua');
  const [searchTokohQuery, setSearchTokohQuery] = useState<string>('');
  const [tokohVotes, setTokohVotes] = useState<Record<string, number>>({
    emil: 4520,
    bey: 1240,
    susi: 3820,
    oleh: 2190
  });
  const [votedTokoh, setVotedTokoh] = useState<Record<string, boolean>>({});

  const viralTokohData = [
    {
      id: "emil",
      name: "M. Ridwan Kamil",
      alias: "@ridwankamil",
      role: "Digital & Spatial Architect, Kurator IKN",
      category: "pemerintahan",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      trendingReason: "Mengusulkan integrasi transportasi hijau bertenaga magnetik untuk koridor Rebana.",
      trendingQuote: "\"Pembangunan tanpa data spasial presisi adalah laksana berlayar tanpa kompas di samudera badai.\"",
      sentimentScore: 91,
      viewsCount: "4.8M",
      hotScore: 96,
      tags: ["#RebanaGreenway", "#SmartProvinces", "#EcoTransit"],
      associatedLocation: "Bandung",
      associatedElementId: "reg-bandung"
    },
    {
      id: "susi",
      name: "Susi Pudjiastuti",
      alias: "@susipudjiastuti",
      role: "Tokoh Maritim & Pemberdaya Kelautan",
      category: "sosial",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      trendingReason: "Menyerukan perlindungan kedaulatan nelayan tradisional di wilayah pelabuhan internasional Patimban.",
      trendingQuote: "\"Laut adalah masa depan peradaban kita. Jaga ekologinya, atau kita semua tenggelam bersama ketidakpedulian kita.\"",
      sentimentScore: 94,
      viewsCount: "3.2M",
      hotScore: 89,
      tags: ["#PatimbanSovereign", "#JagaLautKita", "#SusiSpasial"],
      associatedLocation: "Indramayu",
      associatedElementId: "reg-indramayu"
    },
    {
      id: "bey",
      name: "Bey Triadi Machmudin",
      alias: "@bey.machmudin",
      role: "Pj Gubernur Jawa Barat",
      category: "pemerintahan",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
      trendingReason: "Meluncurkan program hilirisasi IoT pertanian presisi di lumbung pangan nasional Indramayu.",
      trendingQuote: "\"Sensus geospasial real-time memastikan bantuan pupuk subsidi tepat sasaran hingga ke petak sawah terkecil.\"",
      sentimentScore: 86,
      viewsCount: "1.5M",
      hotScore: 84,
      tags: ["#AgriTechJabar", "#PupukPresisi", "#IoTFoodSecurity"],
      associatedLocation: "Subang",
      associatedElementId: "reg-subang"
    },
    {
      id: "oleh",
      name: "Kang Oleh Odading",
      alias: "@oleh_mang_rasaku",
      role: "Duta UMKM & Kuliner Kreatif Lokal",
      category: "bisnis",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      trendingReason: "Berhasil mengekspor 10.000 paket camilan khas Jabar berbasis digital e-commerce ke Asia Timur.",
      trendingQuote: "\"Biar kuliner tradisional kelas kaki lima, kalau sistem peta distribusinya global, rasanya jadi Iron Man!\"",
      sentimentScore: 88,
      viewsCount: "2.1M",
      hotScore: 91,
      tags: ["#UMKMGoGlobal", "#HilirisasiKuliner", "#SundaPride"],
      associatedLocation: "Cirebon",
      associatedElementId: "reg-cirebon"
    }
  ];

  const handleVoteTokoh = (id: string) => {
    const alreadyVoted = votedTokoh[id];
    setVotedTokoh(prev => ({ ...prev, [id]: !alreadyVoted }));
    setTokohVotes(prev => ({
      ...prev,
      [id]: alreadyVoted ? prev[id] - 1 : prev[id] + 1
    }));
    
    const tokoh = viralTokohData.find(t => t.id === id);
    setApiFeedback(alreadyVoted ? `Dukungan ditarik dari ${tokoh?.name}` : `Dukungan dikirim untuk ${tokoh?.name}! ⚡`);
    setTimeout(() => setApiFeedback(null), 1500);
  };

  // Upgraded Intel Workspace Experience states
  const [workspaceTabFilter, setWorkspaceTabFilter] = useState<'all' | 'analytics' | 'news' | 'business' | 'realestate' | 'simulator'>('all');
  const [simulatorInvestment, setSimulatorInvestment] = useState<number>(15); // in Rp Miliar
  const [simulatorSector, setSimulatorSector] = useState<'tech' | 'logistics' | 'agri' | 'creative'>('tech');
  const [simulatorPeriod, setSimulatorPeriod] = useState<number>(5); // in years
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [lastSimulationResult, setLastSimulationResult] = useState<any | null>(null);

  const mockAds = [
    {
      title: "Smart Green City Jabar 2026",
      sponsor: "Diskominfo Jabar",
      embedType: "TikTok Style AD",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-neon-city-streets-at-night-40245-large.mp4",
      description: "Hilirisasi digital & integrasi smart governance IoT Jawa Barat.",
      likes: "124.5K",
      comments: "3.2K",
      views: "1.2M"
    },
    {
      title: "Rebana Golden Triangle Logistics",
      sponsor: "Patimban Port Authority",
      embedType: "Instagram Reels",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-container-ship-in-the-port-at-sunset-40285-large.mp4",
      description: "Konektivitas logistik maritim Patimban menuju pasar global.",
      likes: "89.2K",
      comments: "1.8K",
      views: "820K"
    },
    {
      title: "Agritech IoT Indramayu Sawah Abadi",
      sponsor: "Koperasi Tani Mandiri",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hand-holding-a-green-sprout-in-the-soil-41130-large.mp4",
      embedType: "YouTube Shorts",
      description: "Sensor LoraWAN tanah nirkabel peningkat hasil pangan nasional.",
      likes: "45.1K",
      comments: "720",
      views: "340K"
    }
  ];

  // Drilldown Hierarchical states
  const [selectedCountry, setSelectedCountry] = useState<string>('Indonesia');
  const [selectedProvince, setSelectedProvince] = useState<string>('Jawa Barat');
  const [selectedCity, setSelectedCity] = useState<string>('Bandung');
  const [selectedKecamatan, setSelectedKecamatan] = useState<string>('Coblong');
  const [selectedKelurahan, setSelectedKelurahan] = useState<string>('Dago');

  // Trigger automated Time Machine playback
  useEffect(() => {
    let interval: any;
    if (isPlayingTime) {
      interval = setInterval(() => {
        setTimePeriod((prev) => {
          if (prev >= 2026) return 2020;
          return prev + 1;
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isPlayingTime]);

  // Generate dynamic location title representation
  let currentLocationTitle = 'Indonesia';
  let currentLocationType = 'Nasional';
  let currentSEOPath = '/nasional';

  if (activeLayer === 'regional') {
    currentLocationTitle = `Kawasan Regional Jabar - Rebana & Metropolitan`;
    currentLocationType = 'Regional Zone';
    currentSEOPath = '/regional/jawa-barat';
    if (selectedCity) {
      currentLocationTitle = `${selectedCity}, Jawa Barat`;
      currentLocationType = 'Kabupaten / Kota';
      currentSEOPath = `/regional/jawa-barat/${selectedCity.toLowerCase()}`;
    }
  } else if (activeLayer === 'nasional') {
    currentLocationTitle = `Provinsi ${selectedProvince}`;
    currentLocationType = 'Provinsi';
    currentSEOPath = `/nasional/${selectedProvince.toLowerCase().replace(/\s+/g, '-')}`;

    if (selectedCity) {
      currentLocationTitle = `${selectedCity}, ${selectedProvince}`;
      currentLocationType = 'Kota / Kabupaten';
      currentSEOPath += `/${selectedCity.toLowerCase().replace(/\s+/g, '-')}`;

      if (selectedKecamatan) {
        currentLocationTitle = `Kecamatan ${selectedKecamatan}, ${selectedCity}`;
        currentLocationType = 'Kecamatan';
        currentSEOPath += `/${selectedKecamatan.toLowerCase().replace(/\s+/g, '-')}`;

        if (selectedKelurahan) {
          currentLocationTitle = `Kelurahan ${selectedKelurahan}, ${selectedKecamatan}`;
          currentLocationType = 'Kelurahan / Desa';
          currentSEOPath += `/${selectedKelurahan.toLowerCase().replace(/\s+/g, '-')}`;
        }
      }
    }
  } else {
    // Internasional
    currentLocationTitle = selectedCountry;
    currentLocationType = 'Negara Internasional';
    currentSEOPath = `/internasional/${selectedCountry.toLowerCase().replace(/\s+/g, '-')}`;
  }

  // Javanese Weton helper (calculated based on time year)
  const wetonNames = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
  const simulatedWeton = wetonNames[(timePeriod + currentLocationTitle.length) % 5];

  // Deterministic deterministic random simulation helper
  const hashString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  };

  const seed = hashString(currentLocationTitle) + timePeriod;
  const population = ((seed % 200) + 10) * 11452;
  const areaSqKm = ((seed % 100) + 12) * 45;
  const aqiVal = (seed % 120) + 30;
  const gdpVal = ((seed % 60) + 20) / 10; // GDP growth %
  const activeTenders = (seed % 15) + 3;
  const brandMentionCount = (seed % 400) + 45;
  
  const weatherTemp = (seed % 10) + 23;
  const weatherCondition = seed % 3 === 0 ? 'Hujan Ringan' : seed % 3 === 1 ? 'Cerah Berawan' : 'Berawan';

  // Coordinate center points for simulated overlay pins
  const centerPointsMap: Record<string, { lat: number; lng: number }> = {
    'Bandung': { lat: -6.9175, lng: 107.6191 },
    'Bogor': { lat: -6.5971, lng: 106.8060 },
    'Bekasi': { lat: -6.2383, lng: 106.9756 },
    'Depok': { lat: -6.4025, lng: 106.7942 },
    'Cirebon': { lat: -6.7320, lng: 108.5523 },
    'Garut': { lat: -7.2279, lng: 107.9087 },
    'Sukabumi': { lat: -6.9277, lng: 106.9300 },
    'Tasikmalaya': { lat: -7.3274, lng: 108.2207 },
    'Karawang': { lat: -6.3007, lng: 107.2885 },
    'Purwakarta': { lat: -6.5562, lng: 107.4429 },
    'Subang': { lat: -6.5715, lng: 107.7587 },
    'Sumedang': { lat: -6.8404, lng: 107.9213 },
    'Indramayu': { lat: -6.3263, lng: 108.3200 }
  };

  const selectedCenter = centerPointsMap[selectedCity] || { lat: -6.9, lng: 107.6 };

  // Generate simulated historical progression list (Time Machine data source)
  const simulatedTimelineHistory = [
    { year: 2020, keyEvent: 'Pembukaan Zona Kawasan Industri Baru', infraScore: 68, activeBusiness: 240 },
    { year: 2021, keyEvent: 'Integrasi Fiber Optic Kelurahan Tahap I', infraScore: 72, activeBusiness: 290 },
    { year: 2022, keyEvent: 'Pembangunan RSUD & Hub Logistik', infraScore: 78, activeBusiness: 340 },
    { year: 2023, keyEvent: 'Digitalisasi Tender Publik & APBD Transparan', infraScore: 84, activeBusiness: 420 },
    { year: 2024, keyEvent: 'Koneksi Jalur Kereta Transit Cepat', infraScore: 90, activeBusiness: 510 },
    { year: 2025, keyEvent: 'Penerapan Sensor Smart City & Polusi IoT', infraScore: 94, activeBusiness: 620 },
    { year: 2026, keyEvent: 'Implementasi GeoOS Navigasi Mandiri INFOBOS', infraScore: 98, activeBusiness: 780 },
  ];

  const currentTimelineData = simulatedTimelineHistory.find(h => h.year === timePeriod) || simulatedTimelineHistory[6];

  // News catalog simulation
  const localNewsFeed = [
    { id: '1', title: `Investigasi Utama: Penyerapan APBD ${currentLocationTitle} Ditargetkan Tembus 94%`, category: 'Pemerintahan', date: '10 menit lalu', sentiment: 'Positif', link: 'apbd-target' },
    { id: '2', title: `Proyek Strategis Nasional Jalur Penghubung Logistik di seputar ${currentLocationTitle} Dipercepat`, category: 'Infrastruktur', date: '1 jam lalu', sentiment: 'Positif', link: 'proyek-logistik' },
    { id: '3', title: `Monitoring Cuaca & Kebencanaan: Status Waspada ${weatherCondition === 'Hujan Ringan' ? 'Banjir Luapan' : 'Suhu Tinggi'}`, category: 'Disaster', date: '3 jam lalu', sentiment: 'Negatif', link: 'mitigasi-cuaca' },
    { id: '4', title: `Digitalisasi UMKM Mandiri: 120 Supplier Baru Tergabung ke Ekosistem Mitra`, category: 'Bisnis', date: '5 jam lalu', sentiment: 'Positif', link: 'umkm-mitra' },
    { id: '5', title: `Event Kebudayaan Akbar & Festival Kuliner Khas Siap Gelar Pekan Depan`, category: 'Pariwisata', date: '12 jam lalu', sentiment: 'Positif', link: 'event-kuliner' },
    { id: '6', title: `Layanan Telemedisin Baru Siap Menjangkau Wilayah Terpencil di ${currentLocationTitle}`, category: 'Kesehatan', date: '1 hari lalu', sentiment: 'Positif', link: 'telemedisin-desa' },
    { id: '7', title: `Dinas Lingkungan Hidup Luncurkan Program Bank Sampah Spasial Digital`, category: 'Lingkungan', date: '1 hari lalu', sentiment: 'Positif', link: 'bank-sampah' },
    { id: '8', title: `Evaluasi Implementasi Regulasi Perizinan Online Terpadu Satu Pintu`, category: 'Regulasi', date: '2 hari lalu', sentiment: 'Netral', link: 'oss-evaluasi' },
    { id: '9', title: `Pengaruh Koneksi Internet Terhadap Peningkatan Omset Pedagang Desa`, category: 'Sosial', date: '2 hari lalu', sentiment: 'Positif', link: 'internet-omset' },
    { id: '10', title: `Mitigasi Longsor & Gerakan Tanah: Area Sensitif ${currentLocationTitle} Dipasangi Sensor Deteksi Dini`, category: 'Bencana', date: '3 hari lalu', sentiment: 'Negatif', link: 'deteksi-longsor' }
  ];

  // Local Directory lists
  const localBusinesses = [
    { name: `PT ${currentLocationTitle.replace(/^(Provinsi|Kecamatan|Kelurahan)\s+/i, '')} Digital Prima`, type: 'Teknologi & GIS', employee: '240 Karyawan', invest: 'Rp 45 Miliar' },
    { name: `Pabrik Pengolahan Pangan Nusantara`, type: 'Agribisnis', employee: '1,200 Staff', invest: 'Rp 120 Miliar' },
    { name: `UMKM Mandiri Batik Lestari`, type: 'Ekonomi Kreatif', employee: '45 Anggota', invest: 'Rp 800 Juta' },
    { name: `PT ${currentLocationTitle.replace(/^(Provinsi|Kecamatan|Kelurahan)\s+/i, '')} Logistik Utama`, type: 'Pergudangan & Distribusi', employee: '180 Staff', invest: 'Rp 28 Miliar' },
    { name: `Koperasi Tani Makmur Sentosa`, type: 'Pertanian & Hortikultura', employee: '350 Anggota', invest: 'Rp 2.4 Miliar' },
    { name: `CV Agro Techno Green`, type: 'Pengolahan Limbah & Bio', employee: '65 Karyawan', invest: 'Rp 4.5 Miliar' },
    { name: `PT Media Parahyangan Komunika`, type: 'Telekomunikasi & Fiber', employee: '120 Staff', invest: 'Rp 15 Miliar' },
    { name: `Klinik Pratama Sehat Bersama`, type: 'Kesehatan & Farmasi', employee: '40 Tenaga Medis', invest: 'Rp 1.8 Miliar' }
  ];

  // Interactive path helper
  const handleCopyPath = () => {
    navigator.clipboard.writeText(`https://infobos.com${currentSEOPath}`);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 1500);
  };

  const triggerSearch = (term: string) => {
    // Search simulation for quick jump
    const lower = term.toLowerCase();
    if (lower.includes('bogor')) {
      setSelectedCity('Bogor');
      setSelectedProvince('Jawa Barat');
      setSelectedElementId('reg-bogor');
    } else if (lower.includes('bekasi')) {
      setSelectedCity('Bekasi');
      setSelectedProvince('Jawa Barat');
      setSelectedElementId('reg-bekasi');
    } else if (lower.includes('depok')) {
      setSelectedCity('Depok');
      setSelectedProvince('Jawa Barat');
      setSelectedElementId('reg-bekasi');
    } else if (lower.includes('cirebon')) {
      setSelectedCity('Cirebon');
      setSelectedProvince('Jawa Barat');
      setSelectedElementId('reg-cirebon');
    } else if (lower.includes('sukabumi')) {
      setSelectedCity('Sukabumi');
      setSelectedProvince('Jawa Barat');
      setSelectedElementId('reg-bogor');
    } else if (lower.includes('bandung')) {
      setSelectedCity('Bandung');
      setSelectedProvince('Jawa Barat');
      setSelectedElementId('reg-bandung');
    } else if (lower.includes('jakarta')) {
      setSelectedProvince('DKI Jakarta');
      setSelectedCity('Jakarta Pusat');
      setSelectedElementId('nas-jabar'); // fall back
    } else if (lower.includes('surabaya')) {
      setSelectedProvince('Jawa Timur');
      setSelectedCity('Surabaya');
      setSelectedElementId('nas-jabar'); // fall back
    }
  };

  const activeDetails = getMapElementDetails(selectedElementId, currentLocationTitle);

  return (
    <div className="bg-[#0b1329] min-h-screen pb-20 md:pb-0 text-slate-100 flex flex-col font-sans selection:bg-[#2B7A78] selection:text-white" id="geo-intelligence-operating-system">
      
      {/* GeoOS Upper Control Deck */}
      <div className="bg-[#111a36] border-b border-[#1e2d5a] py-3.5 px-4 sm:px-6 relative z-30 shadow-md flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 transition-all">
        
        {/* Core Product Title */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <div className="p-2 bg-[#2B7A78]/20 text-[#3aafa9] rounded-xl border border-[#2B7A78]/30 shrink-0">
            <Compass className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="text-[8px] sm:text-[9px] bg-teal-500/10 text-teal-300 border border-teal-500/30 px-1.5 py-0.2 rounded font-mono font-black uppercase tracking-wider">
                GEO INTEL CORE v4.2
              </span>
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-[9px] sm:text-[10px] text-emerald-400 font-mono font-bold">PIPELINE ONLINE</span>
            </div>
            <h1 className="font-display font-black text-sm sm:text-base md:text-lg text-white uppercase tracking-wider flex items-center gap-1.5 flex-wrap mt-0.5">
              Geo Intelligence Operating System <span className="text-amber-400 font-serif lowercase italic text-[10px] sm:text-xs shrink-0">(geoos)</span>
            </h1>
          </div>
        </div>

        {/* Global Layer Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full xl:w-auto">
          
          {/* Layer tabs */}
          <div className="bg-[#060a17]/90 p-1 rounded-xl border border-[#1e2d5a] flex flex-row gap-1 w-full sm:w-auto shrink-0">
            {[
              { id: 'regional', label: '1. Regional Jabar', shortLabel: 'Reg Jabar' },
              { id: 'nasional', label: '2. Nasional RI', shortLabel: 'Nasional' },
              { id: 'internasional', label: '3. Internasional', shortLabel: 'Inter' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveLayer(tab.id as any);
                  if (tab.id === 'regional') {
                    setSelectedProvince('Jawa Barat');
                    setSelectedCity('Bandung');
                    setSelectedElementId('reg-bandung');
                  } else if (tab.id === 'nasional') {
                    setSelectedProvince('Jawa Barat');
                    setSelectedElementId('nas-jabar');
                  } else {
                    setSelectedCountry('Indonesia');
                    setSelectedElementId('int-indonesia');
                  }
                }}
                className={`flex-1 sm:flex-initial px-2.5 sm:px-4 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider transition text-center shrink-0 cursor-pointer whitespace-nowrap ${
                  activeLayer === tab.id
                    ? 'bg-[#2B7A78] text-white shadow-md font-extrabold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <span className="hidden sm:inline-block">{tab.label}</span>
                <span className="inline-block sm:hidden">{tab.shortLabel}</span>
              </button>
            ))}
          </div>

          <div className="h-6 w-px bg-[#1e2d5a] hidden sm:block shrink-0" />

          {/* Quick theme visualization selection */}
          <div className="bg-[#060a17]/90 p-1 rounded-xl border border-[#1e2d5a] flex flex-row gap-1 w-full sm:w-auto shrink-0">
            {[
              { id: 'vector', label: '🗺️ Vector', shortLabel: '🗺️ Vector' },
              { id: 'satellite', label: '🛰️ Satellite', shortLabel: '🛰️ Sat' },
              { id: 'heatmap', label: '🔥 Heatmap', shortLabel: '🔥 Heat' },
              { id: '3d', label: '🏙️ 3D Elevation', shortLabel: '🏙️ 3D' }
            ].map(theme => (
              <button
                key={theme.id}
                onClick={() => setMapTheme(theme.id as any)}
                className={`flex-1 sm:flex-initial px-2 sm:px-3 py-1.5 rounded-md text-[9px] sm:text-[10px] font-bold uppercase transition text-center shrink-0 cursor-pointer whitespace-nowrap ${
                  mapTheme === theme.id 
                    ? 'bg-[#1a385c] text-white border border-[#2B7A78]' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <span className="hidden sm:inline-block">{theme.label}</span>
                <span className="inline-block sm:hidden">{theme.shortLabel}</span>
              </button>
            ))}
          </div>

          <div className="h-6 w-px bg-[#1e2d5a] hidden sm:block shrink-0" />

          {/* Enterprise Geo Workspace Toggle Button */}
          <button
            onClick={() => setIsWorkspaceMode(!isWorkspaceMode)}
            className={`w-full sm:w-auto justify-center px-3 sm:px-4 py-2 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-2 transition duration-200 border shrink-0 cursor-pointer ${
              isWorkspaceMode 
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-lg shadow-amber-500/20' 
                : 'bg-[#2B7A78]/20 text-[#3aafa9] border-[#2B7A78]/30 hover:bg-[#2B7A78]/30'
            }`}
          >
            <Briefcase className={`h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 ${isWorkspaceMode ? 'animate-bounce' : ''}`} />
            <span>Enterprise Geo Workspace</span>
            <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0 ${isWorkspaceMode ? 'bg-slate-900' : 'bg-[#3aafa9]'}`}></span>
          </button>
        </div>

      </div>

      {/* SEO Breadcrumb URL Display Bar */}
      <div className="bg-[#111a36] px-6 py-2.5 border-b border-[#1e2d5a] flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3">
        <div className="flex items-center gap-2 flex-wrap text-xs font-mono bg-[#060a17] border border-[#1e2d5a] rounded-lg px-3.5 py-2 flex-1 select-all">
          <span className="text-[#3aafa9] font-bold font-sans">SEO ROUTE PATH:</span>
          <span className="text-slate-400">https://infobos.com</span>
          <span className="text-amber-400 font-bold">{currentSEOPath}</span>
          
          <button 
            onClick={handleCopyPath}
            title="Salin tautan SEO"
            className="ml-auto text-slate-400 hover:text-[#3aafa9] transition p-1 rounded hover:bg-white/5"
          >
            {copyFeedback ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>

        {/* Local Search Jump engine */}
        <div className="relative md:w-80">
          <Search className="absolute left-3 top-2 text-slate-400 h-3.5 w-3.5" />
          <input 
            type="text"
            placeholder="Cari Kota, Koordinat, Jalan, Gedung..."
            value={searchVal}
            onChange={(e) => {
              setSearchVal(e.target.value);
              triggerSearch(e.target.value);
            }}
            className="w-full text-xs bg-[#060a17] border border-[#1e2d5a] focus:border-[#2B7A78] text-white rounded-lg pl-9 pr-4 py-2 outline-none font-medium"
          />
        </div>
      </div>

      {/* QUADRANT PANELS LAYOUT WORKSPACE */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 p-5 items-stretch">
        
        {/* PANEL 1: LEFT CONTROL DECK (Layer management, Active Filter, CMS Geo upload) */}
        <AnimatePresence mode="popLayout">
          {!isWorkspaceMode && (
            <motion.div
              layout="position"
              key="left-panel"
              initial={{ opacity: 0, x: -100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.95 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-3 flex flex-col gap-5 text-left"
            >
          
          {/* Quick Navigator / Drilldown dropdown selector */}
          <div className="bg-[#111a36] border border-[#1e2d5a] rounded-2xl p-4 text-left">
            <h3 className="font-display font-black text-xs text-[#3aafa9] uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>📍 Hierarki Administratif</span>
              <span className="text-[10px] font-mono text-slate-400">Layer: {activeLayer.toUpperCase()}</span>
            </h3>

            {activeLayer === 'regional' && (
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-1">PILIH REGIONAL ZONE</label>
                  <div className="p-2 bg-[#060a17] border border-[#1e2d5a] rounded text-xs font-bold text-[#3aafa9]">
                    Metropolitan Bandung Raya &amp; Segitiga Rebana
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-1">KABUPATEN / KOTA</label>
                  <select 
                    value={selectedCity} 
                    onChange={(e) => {
                      setSelectedCity(e.target.value);
                      setIsRefreshing(true);
                      setTimeout(() => setIsRefreshing(false), 500);
                      const lower = e.target.value.toLowerCase();
                      if (lower === 'bandung') setSelectedElementId('reg-bandung');
                      else if (lower === 'bogor') setSelectedElementId('reg-bogor');
                      else if (lower === 'bekasi') setSelectedElementId('reg-bekasi');
                      else if (lower === 'cirebon') setSelectedElementId('reg-cirebon');
                      else if (lower === 'tasikmalaya') setSelectedElementId('reg-tasikmalaya');
                      else setSelectedElementId(`reg-${lower}`);
                    }}
                    className="w-full p-2 bg-[#060a17] border border-[#1e2d5a] focus:border-[#2B7A78] text-white rounded text-xs font-semibold"
                  >
                    {['Bandung', 'Bogor', 'Bekasi', 'Depok', 'Cirebon', 'Garut', 'Sukabumi', 'Tasikmalaya', 'Karawang', 'Purwakarta', 'Subang', 'Sumedang', 'Indramayu'].map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {activeLayer === 'nasional' && (
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-1">PROVINSI</label>
                  <select 
                    value={selectedProvince} 
                    onChange={(e) => {
                      setSelectedProvince(e.target.value);
                      if (e.target.value === 'Jawa Barat') {
                        setSelectedCity('Bandung');
                        setSelectedElementId('nas-jabar');
                      } else if (e.target.value === 'Sumatera Utara') {
                        setSelectedCity('');
                        setSelectedElementId('nas-sumut');
                      } else if (e.target.value === 'Sulawesi Selatan') {
                        setSelectedCity('');
                        setSelectedElementId('nas-sulsel');
                      } else {
                        setSelectedCity('');
                        setSelectedElementId(`nas-${e.target.value.toLowerCase().replace(/\s+/g, '-')}`);
                      }
                    }}
                    className="w-full p-2 bg-[#060a17] border border-[#1e2d5a] text-white rounded text-xs font-semibold"
                  >
                    {['Jawa Barat', 'DKI Jakarta', 'Jawa Tengah', 'DI Yogyakarta', 'Jawa Timur', 'Bali', 'Sumatera Utara', 'Sulawesi Selatan'].map(prov => (
                      <option key={prov} value={prov}>{prov}</option>
                    ))}
                  </select>
                </div>

                {selectedProvince === 'Jawa Barat' && (
                  <>
                    <div>
                      <label className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-1">KOTA / KABUPATEN</label>
                      <select 
                        value={selectedCity} 
                        onChange={(e) => {
                          setSelectedCity(e.target.value);
                          setSelectedKecamatan(e.target.value === 'Bandung' ? 'Coblong' : 'Bogor Tengah');
                          const lower = e.target.value.toLowerCase();
                          setSelectedElementId(`reg-${lower}`);
                        }}
                        className="w-full p-2 bg-[#060a17] border border-[#1e2d5a] text-white rounded text-xs font-semibold"
                      >
                        <option value="Bandung">Bandung</option>
                        <option value="Bogor">Bogor</option>
                        <option value="Bekasi">Bekasi</option>
                        <option value="Depok">Depok</option>
                        <option value="Cirebon">Cirebon</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-1">KECAMATAN (HYPERLOCAL)</label>
                      <select 
                        value={selectedKecamatan} 
                        onChange={(e) => {
                          setSelectedKecamatan(e.target.value);
                          setSelectedElementId(`kec-${e.target.value.toLowerCase()}`);
                        }}
                        className="w-full p-2 bg-[#060a17] border border-[#1e2d5a] text-white rounded text-xs font-semibold"
                      >
                        {selectedCity === 'Bandung' ? (
                          ['Coblong', 'Lengkong', 'Sukasari', 'Sumur Bandung'].map(k => <option key={k} value={k}>{k}</option>)
                        ) : (
                          ['Bogor Tengah', 'Bogor Utara', 'Bogor Selatan'].map(k => <option key={k} value={k}>{k}</option>)
                        )}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-1">KELURAHAN / DESA</label>
                      <select 
                        value={selectedKelurahan} 
                        onChange={(e) => {
                          setSelectedKelurahan(e.target.value);
                          setSelectedElementId(`kel-${e.target.value.toLowerCase()}`);
                        }}
                        className="w-full p-2 bg-[#060a17] border border-[#1e2d5a] text-white rounded text-xs font-semibold"
                      >
                        {selectedKecamatan === 'Coblong' ? (
                          ['Dago', 'Lebak Siliwangi', 'Sekeloa', 'Cipaganti'].map(k => <option key={k} value={k}>{k}</option>)
                        ) : (
                          ['Babakan', 'Paledang', 'Tegallega'].map(k => <option key={k} value={k}>{k}</option>)
                        )}
                      </select>
                    </div>
                  </>
                )}
              </div>
            )}

            {activeLayer === 'internasional' && (
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-1">NEGARA TERINDEKS</label>
                  <select 
                    value={selectedCountry} 
                    onChange={(e) => {
                      setSelectedCountry(e.target.value);
                      if (e.target.value === 'Jepang') setSelectedElementId('int-japan');
                      else if (e.target.value === 'Indonesia') setSelectedElementId('int-indonesia');
                      else setSelectedElementId(`int-${e.target.value.toLowerCase().replace(/\s+/g, '-')}`);
                    }}
                    className="w-full bg-[#060a17] border border-[#1e2d5a] rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-[#2b7a78]"
                  >
                    {['Indonesia', 'Singapura', 'Malaysia', 'Jepang', 'Amerika Serikat', 'Jerman', 'Arab Saudi', 'Australia'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Layer toggle desk */}
          <div className="bg-[#111a36] border border-[#1e2d5a] rounded-2xl p-4 text-left flex-1">
            <h3 className="font-display font-black text-xs text-[#3aafa9] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Layers className="h-4 w-4" />
              <span>Layer Navigasi Aktif</span>
            </h3>
            <p className="text-[10px] text-slate-400 mb-3">Aktifkan layer spasial untuk menggambar data pada panel peta.</p>
            
            <div className="space-y-1.5 max-h-60 overflow-y-auto scrollbar-none pr-1">
              {[
                { key: 'berita', label: '📰 Berita Wilayah', color: 'bg-emerald-500' },
                { key: 'perusahaan', label: '💼 Perusahaan', color: 'bg-indigo-500' },
                { key: 'umkm', label: '🏪 UMKM Lokal', color: 'bg-amber-500' },
                { key: 'startup', label: '🚀 Startup Hub', color: 'bg-pink-500' },
                { key: 'pemerintah', label: '🏛️ Pemda & OPD', color: 'bg-teal-500' },
                { key: 'regulasi', label: '📜 Regulasi Daerah', color: 'bg-purple-500' },
                { key: 'sekolah', label: '🏫 Sekolah & Kampus', color: 'bg-cyan-500' },
                { key: 'rumahsakit', label: '🏥 Rumah Sakit', color: 'bg-rose-500' },
                { key: 'bandara', label: '✈️ Bandara & Pelabuhan', color: 'bg-sky-500' },
                { key: 'cctv', label: '📹 Live CCTV Cam', color: 'bg-red-500 animate-ping' },
                { key: 'cuaca', label: '🌦️ Radar Cuaca', color: 'bg-yellow-500' },
                { key: 'banjir', label: '🚨 Kerawanan Banjir', color: 'bg-red-600' },
                { key: 'aqi', label: '🍃 Indeks Udara AQI', color: 'bg-green-400' },
                { key: 'traffic', label: '🚗 Kemacetan Jalan', color: 'bg-orange-500' },
                { key: 'heatmap', label: '🌌 Density Heatmap', color: 'bg-violet-500' }
              ].map(item => (
                <button
                  key={item.key}
                  onClick={() => setEnabledLayers(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-xs font-semibold transition ${
                    enabledLayers[item.key] 
                      ? 'bg-white/10 text-white border-l-2 border-[#3aafa9]' 
                      : 'hover:bg-white/5 text-slate-400'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span>{item.label}</span>
                  </span>
                  {enabledLayers[item.key] ? <Eye className="h-3.5 w-3.5 text-teal-400" /> : <EyeOff className="h-3.5 w-3.5 text-slate-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* CMS Admin Upload panel (As requested in CMS Map specification) */}
          <div className="bg-[#111a36] border border-[#1e2d5a] rounded-2xl p-4 text-left">
            <h3 className="font-display font-black text-xs text-[#3aafa9] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Database className="h-4 w-4" />
              <span>CMS Layer &amp; GeoJSON Importer</span>
            </h3>
            
            <div className="space-y-3 pt-1 text-xs">
              <div>
                <label className="text-[9px] text-slate-400 block mb-1">NAMA LAYER BARU</label>
                <div className="flex gap-1.5">
                  <input 
                    type="text" 
                    placeholder="Contoh: Kawasan Wisata" 
                    value={newLayerName}
                    onChange={(e) => setNewLayerName(e.target.value)}
                    className="flex-1 bg-[#060a17] border border-[#1e2d5a] rounded px-2.5 py-1 text-white text-xs"
                  />
                  <button 
                    onClick={() => {
                      if (newLayerName.trim()) {
                        setCmsLayers([...cmsLayers, newLayerName.trim()]);
                        setNewLayerName('');
                      }
                    }}
                    className="bg-[#2B7A78] hover:bg-[#205d5c] text-white px-2.5 rounded text-[10px] font-black uppercase"
                  >
                    TAMBAH
                  </button>
                </div>
              </div>

              {/* GeoJSON upload simulator */}
              <div className="p-3 bg-[#060a17] border border-dashed border-[#1e2d5a] rounded-lg text-center">
                <Upload className="h-5 w-5 text-[#3aafa9] mx-auto mb-1 animate-bounce" />
                <span className="text-[10px] font-bold text-slate-300 block">Import GeoJSON / Shapefile</span>
                <p className="text-[9px] text-slate-500 mt-0.5">Drag &amp; drop atau klik untuk memasukkan koordinat poligon eksternal.</p>
                
                <input 
                  type="file" 
                  id="geojson-upload" 
                  className="hidden" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setGeojsonFileName(file.name);
                  }}
                />
                <label 
                  htmlFor="geojson-upload"
                  className="mt-2 inline-block bg-white/5 border border-white/10 hover:bg-white/10 px-2 py-1 rounded text-[9px] font-mono cursor-pointer"
                >
                  {geojsonFileName ? `Terunggah: ${geojsonFileName}` : 'Pilih File (KML, CSV, GeoJSON)'}
                </label>
              </div>

              <div className="flex gap-1.5 text-[10px] text-slate-400">
                <span className="text-teal-400 font-black">CMS Layers:</span>
                <span className="italic">{cmsLayers.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Social Media Video Embed Ad Placeholder */}
          <div className="bg-[#111a36] border border-[#1e2d5a] rounded-2xl p-4 text-left flex flex-col gap-3 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-gradient-to-br from-pink-500/10 to-violet-500/10 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex items-center justify-between">
              <h3 className="font-display font-black text-xs text-[#3aafa9] uppercase tracking-wider flex items-center gap-1.5">
                <Tv className="h-4 w-4 text-pink-500 animate-pulse" />
                <span>Media Sponsor &amp; Kampanye Spasial</span>
              </h3>
              <span className="text-[8px] font-black uppercase bg-pink-500/20 text-pink-400 px-1.5 py-0.5 rounded border border-pink-500/30 animate-pulse">SPONSORED AD</span>
            </div>

            {/* Platform Selector buttons */}
            <div className="grid grid-cols-3 gap-1 bg-[#060a17] p-1 rounded-lg border border-[#1e2d5a]">
              {[
                { id: 'tiktok', label: 'TikTok' },
                { id: 'reels', label: 'Reels' },
                { id: 'shorts', label: 'Shorts' }
              ].map(plat => (
                <button
                  key={plat.id}
                  onClick={() => setAdPlatform(plat.id as any)}
                  className={`text-[9px] font-bold py-1 px-1.5 rounded transition uppercase tracking-wider ${
                    adPlatform === plat.id 
                      ? 'bg-gradient-to-r from-pink-500 to-violet-500 text-white shadow-md' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {plat.label}
                </button>
              ))}
            </div>

            {/* Interactive Mock Video Player Area */}
            <div className="relative aspect-[9/16] max-h-[220px] rounded-xl overflow-hidden bg-black border border-[#1e2d5a] group flex items-center justify-center">
              <video 
                key={mockAds[activeAdIndex].videoUrl}
                src={mockAds[activeAdIndex].videoUrl}
                className="w-full h-full object-cover opacity-80"
                autoPlay={isPlayingAd}
                muted={isMutedAd}
                loop
                playsInline
              />

              {/* Video overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 flex flex-col justify-between p-3 pointer-events-none">
                {/* Top header overlay info */}
                <div className="flex justify-between items-start">
                  <div className="bg-black/40 backdrop-blur-sm px-2 py-1 rounded text-[9px] text-[#3aafa9] font-mono border border-white/5">
                    {mockAds[activeAdIndex].embedType}
                  </div>
                  <div className="bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded text-[8px] font-mono text-slate-300">
                    Live Demo Feed
                  </div>
                </div>

                {/* Left overlay stats and details */}
                <div className="space-y-1 mt-auto">
                  <span className="text-[10px] font-bold text-white block truncate drop-shadow-md">
                    @{mockAds[activeAdIndex].sponsor.replace(/\s+/g, '').toLowerCase()}
                  </span>
                  <p className="text-[9px] text-slate-200 line-clamp-2 leading-relaxed drop-shadow-md">
                    {mockAds[activeAdIndex].description}
                  </p>
                </div>
              </div>

              {/* Right Floating Social Stats (TikTok/Reels style overlay) */}
              <div className="absolute right-2.5 bottom-12 flex flex-col gap-3 items-center z-10">
                <button className="flex flex-col items-center group/btn pointer-events-auto">
                  <div className="w-7 h-7 rounded-full bg-black/50 hover:bg-pink-500/20 hover:text-pink-400 transition flex items-center justify-center text-white border border-white/10">
                    <Heart className="h-3.5 w-3.5 fill-current text-pink-500" />
                  </div>
                  <span className="text-[8px] font-bold text-white mt-0.5">{mockAds[activeAdIndex].likes}</span>
                </button>
                <button className="flex flex-col items-center group/btn pointer-events-auto">
                  <div className="w-7 h-7 rounded-full bg-black/50 hover:bg-teal-500/20 hover:text-[#3aafa9] transition flex items-center justify-center text-white border border-white/10">
                    <MessageCircle className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-[8px] font-bold text-white mt-0.5">{mockAds[activeAdIndex].comments}</span>
                </button>
                <button className="flex flex-col items-center group/btn pointer-events-auto">
                  <div className="w-7 h-7 rounded-full bg-black/50 hover:bg-violet-500/20 hover:text-violet-400 transition flex items-center justify-center text-white border border-white/10">
                    <Eye className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-[8px] font-bold text-white mt-0.5">{mockAds[activeAdIndex].views}</span>
                </button>
              </div>

              {/* Centered big play button overlay if paused */}
              {!isPlayingAd && (
                <button 
                  onClick={() => setIsPlayingAd(true)}
                  className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-[#3aafa9] hover:scale-110 hover:bg-[#2b7a78] hover:text-white transition cursor-pointer pointer-events-auto z-10"
                >
                  <Play className="h-6 w-6 fill-current ml-0.5" />
                </button>
              )}
            </div>

            {/* Video Controls bar */}
            <div className="flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsPlayingAd(!isPlayingAd)}
                  className="p-1.5 rounded bg-[#060a17] border border-[#1e2d5a] hover:bg-white/5 text-slate-300"
                  title={isPlayingAd ? "Pause Ad" : "Play Ad"}
                >
                  {isPlayingAd ? <Pause className="h-3.5 w-3.5 text-amber-400" /> : <Play className="h-3.5 w-3.5 text-[#3aafa9]" />}
                </button>
                
                <button
                  onClick={() => setIsMutedAd(!isMutedAd)}
                  className="p-1.5 rounded bg-[#060a17] border border-[#1e2d5a] hover:bg-white/5 text-slate-300"
                  title={isMutedAd ? "Unmute Sound" : "Mute Sound"}
                >
                  {isMutedAd ? <VolumeX className="h-3.5 w-3.5 text-rose-400" /> : <Volume2 className="h-3.5 w-3.5 text-emerald-400" />}
                </button>
              </div>

              {/* Sponsor Selector Dropdown */}
              <select
                value={activeAdIndex}
                onChange={(e) => {
                  setActiveAdIndex(Number(e.target.value));
                  setIsPlayingAd(true);
                }}
                className="flex-1 max-w-[130px] p-1.5 bg-[#060a17] border border-[#1e2d5a] text-white rounded text-[10px] font-semibold"
              >
                {mockAds.map((ad, index) => (
                  <option key={index} value={index}>{ad.title}</option>
                ))}
              </select>

              {/* Next Ad button */}
              <button
                onClick={() => {
                  setActiveAdIndex((prev) => (prev + 1) % mockAds.length);
                  setIsPlayingAd(true);
                }}
                className="p-1.5 rounded bg-gradient-to-r from-pink-500/20 to-violet-500/20 hover:from-pink-500 hover:to-violet-500 border border-pink-500/30 hover:border-transparent transition text-white text-[10px] font-black uppercase"
              >
                Next Ad
              </button>
            </div>
          </div>

          {/* SOCIAL MEDIA TRENDING CENTER (TIKTOK, INSTAGRAM, YOUTUBE, X, THREADS) */}
          <div className="bg-[#111a36] border border-[#1e2d5a] rounded-2xl p-4 text-left flex flex-col gap-3 relative overflow-hidden">
            <div className="absolute -left-12 -bottom-12 w-28 h-28 bg-gradient-to-tr from-[#2b7a78]/10 to-transparent rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between">
              <h3 className="font-display font-black text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-[#3aafa9] animate-pulse" />
                <span>Kanal Tren Media Sosial</span>
              </h3>
              <span className="text-[8px] font-black uppercase bg-[#2b7a78]/20 text-[#3aafa9] px-2 py-0.5 rounded border border-[#2b7a78]/30">
                LIVE GEO-FEEDS
              </span>
            </div>

            <p className="text-[10px] text-slate-400">
              Pantau konten viral dan opini publik yang sedang trending di sekitar wilayah <span className="text-white font-bold">{currentLocationTitle}</span>.
            </p>

            {/* Social Platform Selection Tabs */}
            <div className="grid grid-cols-5 gap-1 bg-[#060a17] p-1 rounded-xl border border-[#1e2d5a]">
              {[
                { id: 'tiktok', label: 'TikTok', color: 'hover:text-cyan-400', activeBg: 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400' },
                { id: 'instagram', label: 'IG', color: 'hover:text-pink-400', activeBg: 'bg-pink-500/10 border-pink-500/40 text-pink-400' },
                { id: 'youtube', label: 'YT', color: 'hover:text-red-400', activeBg: 'bg-red-500/10 border-red-500/40 text-red-400' },
                { id: 'x', label: 'X', color: 'hover:text-sky-400', activeBg: 'bg-sky-500/10 border-sky-500/40 text-sky-400' },
                { id: 'threads', label: 'Threads', color: 'hover:text-slate-200', activeBg: 'bg-white/10 border-white/20 text-white' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedSocialPlatform(tab.id as any);
                    setNewSocialComment('');
                  }}
                  className={`text-[9px] font-black py-1.5 px-0.5 rounded-lg transition-all border uppercase tracking-tight text-center ${
                    selectedSocialPlatform === tab.id
                      ? `${tab.activeBg} shadow-md`
                      : `text-slate-400 border-transparent ${tab.color} hover:bg-white/5`
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Social Embed Viewer Area */}
            <div className="bg-[#060a17] rounded-xl p-3 border border-[#1e2d5a]/60 space-y-3">
              
              {/* TIKTOK EMBED CARD */}
              {selectedSocialPlatform === 'tiktok' && (
                <div className="space-y-2.5 animate-fadeIn">
                  {/* Top Creator Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-400 to-pink-500 p-[1.5px]">
                        <div className="w-full h-full rounded-full bg-[#060a17] flex items-center justify-center font-black text-[9px] text-cyan-400">
                          TK
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-black text-white hover:underline cursor-pointer">@kelana_jabar_2026</span>
                          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 flex items-center justify-center text-[6px] text-white font-bold">✓</span>
                        </div>
                        <span className="text-[8px] text-slate-500 block">TikTok Trending &bull; {currentLocationTitle}</span>
                      </div>
                    </div>
                    <button className="text-[8px] font-black uppercase text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/10 px-2 py-0.5 rounded-md transition">
                      Follow
                    </button>
                  </div>

                  {/* Mock Video Embed Player Container */}
                  <div className="relative aspect-[16/10] bg-black/90 rounded-lg overflow-hidden border border-cyan-500/20 group flex items-center justify-center">
                    <video
                      src="https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-neon-city-streets-at-night-40245-large.mp4"
                      className="w-full h-full object-cover opacity-60 pointer-events-none"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent p-2.5 flex flex-col justify-between pointer-events-none">
                      <div className="self-start bg-cyan-500/25 border border-cyan-500/30 text-cyan-400 font-mono text-[7px] px-1.5 py-0.5 rounded uppercase tracking-wider">
                        #fyp #pesonajabar
                      </div>
                      <div className="text-left">
                        <p className="text-[9px] font-bold text-white leading-normal line-clamp-2">
                          Eksplorasi tata kota modern &amp; pemetaan 3D komprehensif di sekitar <span className="text-cyan-400">#{currentLocationTitle.replace(/\s+/g, '')}</span>! 🛰️🏙️
                        </p>
                      </div>
                    </div>
                    {/* Overlay floating interactions */}
                    <div className="absolute right-2 bottom-2 flex flex-col gap-1.5 pointer-events-auto">
                      <button 
                        onClick={() => handleLikeSocialPost('tiktok')}
                        className="p-1 rounded-full bg-black/60 hover:bg-pink-500/20 border border-white/5 transition flex items-center gap-1 text-[8px] font-bold"
                      >
                        <Heart className={`h-2.5 w-2.5 ${isSocialLiked.tiktok ? 'text-pink-500 fill-current' : 'text-slate-400'}`} />
                        <span className="text-white">{(socialLikesCount.tiktok / 1000).toFixed(1)}k</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* INSTAGRAM REELS / POST EMBED */}
              {selectedSocialPlatform === 'instagram' && (
                <div className="space-y-2.5 animate-fadeIn">
                  {/* Top IG Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-violet-600 p-[1.5px]">
                        <div className="w-full h-full rounded-full bg-[#060a17] flex items-center justify-center font-black text-[9px] text-pink-400">
                          IG
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-black text-white hover:underline cursor-pointer">pesona_spasial</span>
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 flex items-center justify-center text-[6px] text-white font-bold">✓</span>
                        </div>
                        <span className="text-[8px] text-slate-500 block">{currentLocationTitle} (Titik Rekomendasi)</span>
                      </div>
                    </div>
                    <span className="text-slate-400 hover:text-white cursor-pointer font-bold text-sm">...</span>
                  </div>

                  {/* Mock Post Grid / Visual representation */}
                  <div className="relative aspect-[16/10] bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 rounded-lg overflow-hidden border border-pink-500/20 flex flex-col justify-between p-3 text-left">
                    {/* Top Grid telemetry lines to look like Map Intelligence */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:14px_14px]" />
                    
                    <div className="z-10 flex justify-between items-start">
                      <span className="bg-pink-500/20 border border-pink-500/30 text-pink-400 font-mono text-[7px] px-1.5 py-0.5 rounded">
                        INSTAGRAM EMBED FEED
                      </span>
                      <span className="text-[8px] text-slate-400 font-mono">1080 x 1350 px</span>
                    </div>

                    <div className="z-10 bg-black/40 backdrop-blur-sm p-2 rounded-lg border border-white/5 space-y-1">
                      <div className="text-[8px] font-black text-[#3aafa9] uppercase tracking-wider">LOKASI TERPETAKAN:</div>
                      <div className="text-[10px] text-white font-mono font-black">{currentLocationTitle}</div>
                    </div>

                    {/* Bottom overlay with quick action */}
                    <div className="z-10 flex justify-between items-center mt-2 pt-1 border-t border-white/5">
                      <div className="flex gap-2">
                        <button onClick={() => handleLikeSocialPost('instagram')} className="hover:scale-110 transition">
                          <Heart className={`h-4 w-4 ${isSocialLiked.instagram ? 'text-pink-500 fill-current animate-pulse' : 'text-slate-400 hover:text-pink-400'}`} />
                        </button>
                        <MessageCircle className="h-4 w-4 text-slate-400 hover:text-white cursor-pointer" />
                        <Share2 className="h-4 w-4 text-slate-400 hover:text-white cursor-pointer" />
                      </div>
                      <span className="text-[8px] text-slate-400 font-mono">{(socialLikesCount.instagram / 1000).toFixed(1)}K likes</span>
                    </div>
                  </div>

                  <p className="text-[9px] text-slate-300 leading-relaxed text-left">
                    <span className="font-black text-white mr-1.5">pesona_spasial</span>
                    Sangat terpukau melihat integrasi geospasial di <span className="text-pink-400">#{currentLocationTitle.replace(/\s+/g, '')}</span>. Digitalisasi membawa peradaban baru untuk Indonesia Emas! 🌄🛰️
                  </p>
                </div>
              )}

              {/* YOUTUBE EMBED CARD */}
              {selectedSocialPlatform === 'youtube' && (
                <div className="space-y-2.5 animate-fadeIn">
                  {/* Top YT Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center font-black text-[9px] text-white">
                        YT
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-black text-white hover:underline cursor-pointer">GeoOS TV Jabar</span>
                          <span className="w-2.5 h-2.5 rounded-full bg-gray-500 flex items-center justify-center text-[6px] text-white font-bold">✓</span>
                        </div>
                        <span className="text-[8px] text-slate-500 block">452K Subscribers &bull; Verified Channel</span>
                      </div>
                    </div>
                    <button className="bg-red-600 hover:bg-red-700 text-white font-black uppercase text-[8px] px-2.5 py-1 rounded-md transition">
                      SUBSCRIBE
                    </button>
                  </div>

                  {/* Mock Video Container */}
                  <div className="relative aspect-[16/9] bg-black rounded-lg overflow-hidden border border-red-500/20 group flex items-center justify-center">
                    <video
                      src="https://assets.mixkit.co/videos/preview/mixkit-container-ship-in-the-port-at-sunset-40285-large.mp4"
                      className="w-full h-full object-cover opacity-60 pointer-events-none"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                    {/* Controls overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 p-2 flex flex-col justify-between pointer-events-none">
                      <div className="self-end bg-black/60 backdrop-blur-sm px-1 py-0.5 rounded text-[8px] font-mono text-white">
                        15:40
                      </div>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <Play className="h-3 w-3 text-red-500 fill-current" />
                          <div className="w-24 h-1 bg-red-600 rounded-full" />
                        </div>
                        <span className="text-[7px] text-slate-400 font-mono">1080p HD</span>
                      </div>
                    </div>
                  </div>

                  {/* Title and stats */}
                  <div className="text-left space-y-1">
                    <h4 className="text-[10px] font-black text-white leading-snug hover:text-red-400 cursor-pointer transition">
                      Studi Kelayakan Spasial Koridor Utama {currentLocationTitle} [Analisis Komprehensif 2026]
                    </h4>
                    <div className="flex items-center justify-between text-[8px] text-slate-400">
                      <span>{(socialLikesCount.youtube / 1000).toFixed(1)}K Views &bull; 2 days ago</span>
                      <button 
                        onClick={() => handleLikeSocialPost('youtube')}
                        className="flex items-center gap-1 hover:text-red-400 transition"
                      >
                        <Heart className={`h-2.5 w-2.5 ${isSocialLiked.youtube ? 'text-red-500 fill-current' : 'text-slate-400'}`} />
                        <span>Like</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* X / TWITTER EMBED CARD */}
              {selectedSocialPlatform === 'x' && (
                <div className="space-y-2.5 text-left animate-fadeIn">
                  {/* Top X Header Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center font-black text-[10px] text-black">
                        𝕏
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-black text-white hover:underline cursor-pointer">Jabar Digital Service</span>
                          <span className="w-2.5 h-2.5 rounded-full bg-sky-400 flex items-center justify-center text-[6px] text-white font-bold">✓</span>
                        </div>
                        <span className="text-[8px] text-slate-500 block">@JabarDigital &bull; 4m ago</span>
                      </div>
                    </div>
                    <button className="text-[8px] font-black uppercase bg-white text-black hover:bg-slate-200 px-2 py-0.5 rounded-full transition">
                      Follow
                    </button>
                  </div>

                  {/* Tweet Content */}
                  <p className="text-[10px] text-slate-200 leading-relaxed font-sans">
                    Penerapan sensor Internet of Things (IoT) untuk pemantauan air Jatiluhur &amp; logistik pelabuhan Patimban di seputar <span className="text-sky-400 font-semibold">{currentLocationTitle}</span> kini terintegrasi penuh dalam visualisasi dashboard GeoOS v4.2! 🔌🛰️ <span className="text-sky-400">#GeoIntelligence #RebanaHub</span>
                  </p>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between text-[8px] text-slate-500 pt-1.5 border-t border-[#1e2d5a]/60">
                    <button className="flex items-center gap-1 hover:text-sky-400 transition">
                      <MessageCircle className="h-3 w-3" />
                      <span>{socialComments.x.length}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-emerald-400 transition">
                      <RefreshCw className="h-3 w-3" />
                      <span>1.2K</span>
                    </button>
                    <button 
                      onClick={() => handleLikeSocialPost('x')}
                      className="flex items-center gap-1 hover:text-pink-400 transition"
                    >
                      <Heart className={`h-3 w-3 ${isSocialLiked.x ? 'text-pink-500 fill-current' : 'text-slate-500'}`} />
                      <span>{socialLikesCount.x}</span>
                    </button>
                    <span className="font-mono">14.2K views</span>
                  </div>
                </div>
              )}

              {/* THREADS EMBED CARD */}
              {selectedSocialPlatform === 'threads' && (
                <div className="space-y-2.5 text-left animate-fadeIn">
                  {/* Top Threads Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center font-black text-xs text-white">
                        @
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-white hover:underline cursor-pointer">ridwan.spasial</span>
                        <span className="text-[8px] text-slate-500 block">Senior GIS Analyst &bull; 10m ago</span>
                      </div>
                    </div>
                    <span className="text-[14px] text-slate-500 font-bold hover:text-white cursor-pointer">&bull;&bull;&bull;</span>
                  </div>

                  {/* Post Content */}
                  <p className="text-[10px] text-slate-300 leading-relaxed">
                    Masa depan tata ruang wilayah Jawa Barat sangat bergantung pada akurasi data geospasial real-time. Dengan adanya integrasi GIS Hub ini, pengambilan kebijakan di <span className="text-white font-bold underline decoration-[#3aafa9]">{currentLocationTitle}</span> menjadi jauh lebih presisi dan efisien. 🗺️🛰️
                  </p>

                  {/* Action row */}
                  <div className="flex items-center gap-4 text-slate-500 text-[10px] pt-1">
                    <button onClick={() => handleLikeSocialPost('threads')} className="hover:text-pink-500 transition">
                      <Heart className={`h-3.5 w-3.5 ${isSocialLiked.threads ? 'text-pink-500 fill-current' : ''}`} />
                    </button>
                    <MessageCircle className="h-3.5 w-3.5 hover:text-white transition" />
                    <RefreshCw className="h-3.5 w-3.5 hover:text-emerald-400 transition" />
                    <Share2 className="h-3.5 w-3.5 hover:text-white transition" />
                  </div>

                  {/* Interactive thread connector line with a reply */}
                  <div className="relative pl-3.5 border-l border-slate-800 space-y-1.5 pt-1 ml-1.5">
                    <div className="absolute top-0 left-0 w-2.5 h-px bg-slate-800" />
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-black text-white">amanda_gis</span>
                      <span className="text-[7px] text-slate-500 font-mono">2m ago</span>
                    </div>
                    <p className="text-[9px] text-slate-400 italic">
                      Sepakat pak! Ini solusi revolusioner buat pemda.
                    </p>
                  </div>
                </div>
              )}

              {/* REAL-TIME COMMMENT THREAD SECTION */}
              <div className="border-t border-[#1e2d5a]/60 pt-2 space-y-2">
                <div className="text-[8px] font-black uppercase text-slate-400 tracking-wider">
                  Komentar Publik Terkini ({socialComments[selectedSocialPlatform].length})
                </div>

                {/* Commments List */}
                <div className="max-h-24 overflow-y-auto space-y-2 pr-1 scrollbar-none">
                  {socialComments[selectedSocialPlatform].map((comment, idx) => (
                    <div key={idx} className="bg-[#111a36]/50 p-1.5 rounded-lg border border-[#1e2d5a]/20 text-[9px] text-left">
                      <div className="flex items-center justify-between mb-0.5 text-slate-400">
                        <span className="font-bold text-slate-300">@{comment.user}</span>
                        <span className="font-mono text-[8px]">{comment.time}</span>
                      </div>
                      <p className="text-slate-200">{comment.text}</p>
                    </div>
                  ))}
                </div>

                {/* Comment Input box */}
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={newSocialComment}
                    onChange={(e) => setNewSocialComment(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddSocialComment(selectedSocialPlatform);
                    }}
                    placeholder={`Ketik opini Anda di ${selectedSocialPlatform.toUpperCase()}...`}
                    className="flex-1 bg-[#0d152a] border border-[#1e2d5a] rounded-lg px-2.5 py-1 text-white text-[9px] focus:outline-none focus:border-[#3aafa9]"
                  />
                  <button
                    onClick={() => handleAddSocialComment(selectedSocialPlatform)}
                    className="bg-[#2B7A78] hover:bg-[#205d5c] text-white font-black text-[8px] px-2.5 py-1 rounded-lg uppercase tracking-wider transition"
                  >
                    POST
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* TRENDING TOKOH VIRAL (VIRAL KEY FIGURES SECTION) */}
          <div className="bg-[#111a36] border border-[#1e2d5a] rounded-2xl p-4 text-left flex flex-col gap-3 relative overflow-hidden">
            <div className="absolute -right-12 -bottom-12 w-28 h-28 bg-gradient-to-tr from-amber-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between">
              <h3 className="font-display font-black text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-amber-500 animate-pulse" />
                <span>Tokoh Viral Terpopuler</span>
              </h3>
              <span className="text-[8px] font-black uppercase bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded border border-amber-500/30 animate-pulse">
                TRENDING NOW
              </span>
            </div>

            <p className="text-[10px] text-slate-400">
              Tokoh-tokoh publik Jawa Barat yang paling banyak dibahas terkait kebijakan pembangunan regional, digitalisasi, &amp; UMKM.
            </p>

            {/* Keyword Search for Tokoh */}
            <div className="relative">
              <Search className="absolute left-2.5 top-2 h-3 w-3 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama tokoh, peran, kata kunci..."
                value={searchTokohQuery}
                onChange={(e) => setSearchTokohQuery(e.target.value)}
                className="w-full text-[10px] bg-[#060a17] border border-[#1e2d5a] rounded-lg pl-8 pr-3 py-1.5 text-white placeholder-slate-500 outline-none focus:border-amber-400/50 transition-colors"
              />
              {searchTokohQuery && (
                <button 
                  onClick={() => setSearchTokohQuery('')}
                  className="absolute right-2 top-2 text-[9px] text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category selection */}
            <div className="flex flex-wrap gap-1 bg-[#060a17] p-1 rounded-lg border border-[#1e2d5a]">
              {[
                { id: 'semua', label: 'Semua' },
                { id: 'pemerintahan', label: 'Gov' },
                { id: 'bisnis', label: 'Bisnis' },
                { id: 'sosial', label: 'Sosial' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedTokohCategory(cat.id as any)}
                  className={`text-[9px] font-bold py-1 px-2 rounded-md transition-all uppercase tracking-tight ${
                    selectedTokohCategory === cat.id
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* List of Tokoh */}
            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1 scrollbar-none">
              {viralTokohData.filter(tokoh => {
                const matchesCategory = selectedTokohCategory === 'semua' || tokoh.category === selectedTokohCategory;
                const matchesSearch = tokoh.name.toLowerCase().includes(searchTokohQuery.toLowerCase()) || 
                                      tokoh.alias.toLowerCase().includes(searchTokohQuery.toLowerCase()) ||
                                      tokoh.role.toLowerCase().includes(searchTokohQuery.toLowerCase()) ||
                                      tokoh.trendingReason.toLowerCase().includes(searchTokohQuery.toLowerCase());
                return matchesCategory && matchesSearch;
              }).map((tokoh) => {
                const isVoted = votedTokoh[tokoh.id];
                return (
                  <div 
                    key={tokoh.id} 
                    className="p-3 bg-[#060a17]/80 rounded-xl border border-[#1e2d5a]/60 hover:border-amber-500/30 transition-all duration-200 text-left space-y-2.5 relative group"
                  >
                    {/* Hot score tiny badge */}
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded text-[8px] font-mono text-amber-400">
                      <Flame className="h-2 w-2" />
                      <span>{tokoh.hotScore}% Hot</span>
                    </div>

                    {/* Header info */}
                    <div className="flex items-center gap-2">
                      <img 
                        src={tokoh.avatar} 
                        alt={tokoh.name} 
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-full object-cover border border-[#1e2d5a]"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1">
                          <h4 className="text-[11px] font-black text-white truncate">{tokoh.name}</h4>
                          <span className="w-3 h-3 rounded-full bg-amber-500 flex items-center justify-center text-[7px] text-slate-950 font-bold" title="Tokoh Terverifikasi">✓</span>
                        </div>
                        <span className="text-[9px] text-slate-400 block truncate">{tokoh.alias} &bull; {tokoh.role}</span>
                      </div>
                    </div>

                    {/* Reason why trending */}
                    <div className="space-y-1">
                      <div className="text-[8px] font-black uppercase text-amber-400/80 tracking-widest flex items-center gap-1">
                        <Sparkles className="h-2.5 w-2.5" />
                        <span>ISU VIRAL TERKINI</span>
                      </div>
                      <p className="text-[10px] text-slate-300 leading-normal">
                        {tokoh.trendingReason}
                      </p>
                    </div>

                    {/* Quote block */}
                    <blockquote className="border-l-2 border-amber-500/40 bg-[#111a36]/50 p-2 rounded text-[9.5px] text-slate-300 italic leading-relaxed font-sans">
                      {tokoh.trendingQuote}
                    </blockquote>

                    {/* Tags pill */}
                    <div className="flex flex-wrap gap-1">
                      {tokoh.tags.map((tag, idx) => (
                        <span key={idx} className="text-[8px] font-bold font-mono text-slate-400 bg-slate-800/60 px-1.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons footer */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#1e2d5a]/40 gap-2">
                      {/* Interactive Focus Location Map trigger */}
                      <button
                        onClick={() => {
                          setActiveLayer('regional');
                          setSelectedProvince('Jawa Barat');
                          setSelectedCity(tokoh.associatedLocation);
                          setSelectedElementId(tokoh.associatedElementId);
                          
                          setApiFeedback(`Fokus Peta: ${tokoh.associatedLocation} (${tokoh.name})`);
                          setTimeout(() => setApiFeedback(null), 1500);
                        }}
                        className="text-[9px] font-bold text-[#3aafa9] hover:text-[#2b7a78] flex items-center gap-1 transition"
                      >
                        <span>📍 Fokus {tokoh.associatedLocation}</span>
                      </button>

                      {/* Vote / Dukung Button */}
                      <button
                        onClick={() => handleVoteTokoh(tokoh.id)}
                        className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider flex items-center gap-1 transition-all ${
                          isVoted
                            ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                            : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 hover:border-amber-500/40'
                        }`}
                      >
                        <Heart className={`h-2.5 w-2.5 ${isVoted ? 'fill-current text-slate-950' : 'text-amber-400'}`} />
                        <span>{tokohVotes[tokoh.id]} Dukung</span>
                      </button>
                    </div>

                  </div>
                );
              })}

              {viralTokohData.filter(tokoh => {
                const matchesCategory = selectedTokohCategory === 'semua' || tokoh.category === selectedTokohCategory;
                const matchesSearch = tokoh.name.toLowerCase().includes(searchTokohQuery.toLowerCase()) || 
                                      tokoh.alias.toLowerCase().includes(searchTokohQuery.toLowerCase()) ||
                                      tokoh.role.toLowerCase().includes(searchTokohQuery.toLowerCase()) ||
                                      tokoh.trendingReason.toLowerCase().includes(searchTokohQuery.toLowerCase());
                return matchesCategory && matchesSearch;
              }).length === 0 && (
                <div className="text-center py-6 bg-[#060a17]/50 rounded-xl border border-[#1e2d5a]/40">
                  <p className="text-[10px] text-slate-500">Tidak ada tokoh viral ditemukan.</p>
                </div>
              )}
            </div>
          </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* PANEL 2 & 3: CENTER INTERACTIVE VISUALIZER MAP AREA */}
        <motion.div 
          layout
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className={`flex flex-col gap-5 transition-all duration-300 ${isWorkspaceMode ? 'lg:col-span-7' : 'lg:col-span-6'}`}
        >
          
          {/* Main Visual Map Card container */}
          <div className="bg-[#111a36] border border-[#1e2d5a] rounded-2xl p-4 flex-1 flex flex-col relative overflow-hidden">
            
            {/* Interactive coordinates telemetry overlay */}
            <div className="absolute top-4 left-4 z-20 bg-[#060a17]/90 px-3 py-1.5 rounded-lg border border-[#1e2d5a] font-mono text-[9px] text-slate-300 text-left">
              <span className="text-[#3aafa9] font-bold block">📡 TELEMETRY ACTIVE</span>
              <span>CURSOR COORDS: </span>
              <span className="text-amber-400 font-bold">{hoveredCoords ? `${hoveredCoords.lat}, ${hoveredCoords.lng}` : `${selectedCenter.lat.toFixed(4)}, ${selectedCenter.lng.toFixed(4)}`}</span>
            </div>

            {/* Quick Actions overlay right */}
            <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5">
              <button 
                onClick={() => {
                  setIsRefreshing(true);
                  setTimeout(() => setIsRefreshing(false), 500);
                }}
                className="p-1.5 bg-[#060a17]/90 rounded border border-[#1e2d5a] hover:bg-white/5 text-teal-400" 
                title="Refresh Map Coordinates"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
              <button className="p-1.5 bg-[#060a17]/90 rounded border border-[#1e2d5a] hover:bg-white/5 text-slate-300" title="Zoom In"><ZoomIn className="h-4 w-4" /></button>
              <button className="p-1.5 bg-[#060a17]/90 rounded border border-[#1e2d5a] hover:bg-white/5 text-slate-300" title="Zoom Out"><ZoomOut className="h-4 w-4" /></button>
            </div>

            {/* MAP STAGE CANVAS */}
            <div 
              className="flex-1 bg-[#060a17] border border-[#1e2d5a] rounded-xl relative overflow-hidden flex items-center justify-center min-h-[360px]"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                // Simulating realistic Jabar latitude/longitude calculations
                const lat = (-6.5 - (y / rect.height) * 1.5).toFixed(4);
                const lng = (106.5 + (x / rect.width) * 2.5).toFixed(4);
                setHoveredCoords({ x, y, lat, lng });
              }}
              onMouseLeave={() => setHoveredCoords(null)}
            >
              
              {/* --- 1. SATELLITE MAP BACKDROP SHADOW EFFECT --- */}
              {mapTheme === 'satellite' && (
                <div className="absolute inset-0 bg-radial-gradient from-teal-950/20 to-[#060a17] mix-blend-overlay opacity-80 pointer-events-none" />
              )}

              {/* --- 2. VECTOR PATH GRAPHICS (INTERACTIVE PLOT) --- */}
              <div className="w-full h-full p-4 flex flex-col items-center justify-center">
                
                {/* NATIONAL VIEWPORT ARCHIPELAGO */}
                {activeLayer === 'nasional' && (
                  <svg viewBox="0 0 800 360" className="w-full max-w-2xl h-auto drop-shadow-xl select-none">
                    
                    {/* Sumatera Island */}
                    <path 
                      d="M60 60 L140 180 L180 200 L150 220 L100 170 L50 80 Z" 
                      fill={selectedProvince === 'Sumatera Utara' ? '#2B7A78' : '#1a2a4a'} 
                      stroke="#2B7A78" 
                      strokeWidth="1.5"
                      onClick={() => {
                        setSelectedProvince('Sumatera Utara');
                        setSelectedElementId('nas-sumut');
                      }}
                      className="cursor-pointer hover:fill-[#3aafa9] transition duration-200"
                    />
                    <text x="90" y="140" fill="#a0aec0" fontSize="10" className="font-mono font-bold pointer-events-none">SUMATERA</text>

                    {/* Jawa Island */}
                    <path 
                      d="M180 225 L240 230 L300 235 L380 240 L390 250 L340 250 L260 245 L180 235 Z" 
                      fill={selectedProvince === 'Jawa Barat' ? '#2B7A78' : '#1a2a4a'} 
                      stroke="#2B7A78" 
                      strokeWidth="1.5"
                      onClick={() => {
                        setSelectedProvince('Jawa Barat');
                        setSelectedCity('Bandung');
                        setSelectedElementId('nas-jabar');
                      }}
                      className="cursor-pointer hover:fill-[#3aafa9] transition duration-200"
                    />
                    <text x="270" y="260" fill="#a0aec0" fontSize="10" className="font-mono font-bold pointer-events-none">JAWA (JABAR ACTIVE)</text>

                    {/* Kalimantan */}
                    <path 
                      d="M200 90 L260 80 L320 110 L290 170 L220 160 Z" 
                      fill="#15213b" 
                      stroke="#2B7A78" 
                      strokeWidth="1.5"
                      onClick={() => {
                        setSelectedProvince('Kalimantan Timur');
                        setSelectedElementId('nas-kalimantan');
                      }}
                      className="cursor-pointer hover:fill-[#3aafa9] transition duration-200"
                    />
                    <text x="240" y="130" fill="#a0aec0" fontSize="10" className="font-mono font-bold pointer-events-none">KALIMANTAN</text>

                    {/* Sulawesi */}
                    <path 
                      d="M340 100 L390 95 L385 130 L430 135 L400 150 L360 180 Z" 
                      fill={selectedProvince === 'Sulawesi Selatan' ? '#2B7A78' : '#1a2a4a'} 
                      stroke="#2B7A78" 
                      strokeWidth="1.5"
                      onClick={() => {
                        setSelectedProvince('Sulawesi Selatan');
                        setSelectedElementId('nas-sulsel');
                      }}
                      className="cursor-pointer hover:fill-[#3aafa9] transition duration-200"
                    />
                    <text x="370" y="110" fill="#a0aec0" fontSize="10" className="font-mono font-bold pointer-events-none">SULAWESI</text>

                    {/* Papua */}
                    <path 
                      d="M480 150 L560 140 L600 160 L590 220 L520 210 Z" 
                      fill="#15213b" 
                      stroke="#2B7A78" 
                      strokeWidth="1.5"
                      onClick={() => {
                        setSelectedProvince('Papua');
                        setSelectedElementId('nas-papua');
                      }}
                      className="cursor-pointer hover:fill-[#3aafa9] transition duration-200"
                    />
                    <text x="520" y="180" fill="#a0aec0" fontSize="10" className="font-mono font-bold pointer-events-none">PAPUA</text>

                    {/* Interactive overlay AQI heatmap circles on main cities if enabled */}
                    {enabledLayers.aqi && (
                      <>
                        <circle cx="210" cy="230" r="14" fill="#ef4444" opacity="0.3" className="animate-pulse" />
                        <circle cx="230" cy="231" r="25" fill="#eab308" opacity="0.25" />
                        <circle cx="380" cy="140" r="18" fill="#22c55e" opacity="0.3" />
                      </>
                    )}

                    {/* Active volcano indicators for earthquake map if disaster enabled */}
                    {enabledLayers.banjir && (
                      <g fill="#ef4444" stroke="#ffffff" strokeWidth="1">
                        <polygon points="210,224 215,232 205,232" aria-label="Gunung Merapi Waspada" />
                        <polygon points="360,238 365,246 355,246" />
                      </g>
                    )}

                  </svg>
                )}

                {/* REGIONAL ACTIVE VIEWPORT: WEST JAVA (JAWA BARAT) */}
                {activeLayer === 'regional' && (
                  <div className="w-full h-full relative flex flex-col justify-between">
                    
                    <svg viewBox="0 0 600 300" className="w-full max-w-lg h-auto select-none mx-auto">
                      
                      {/* Bekasi / Depok */}
                      <path 
                        d="M50 50 L150 40 L180 80 L120 100 L40 80 Z" 
                        fill={selectedCity === 'Bekasi' ? '#2B7A78' : '#14223f'} 
                        stroke="#3aafa9" 
                        strokeWidth="1"
                        onClick={() => {
                          setSelectedCity('Bekasi');
                          setSelectedElementId('reg-bekasi');
                        }}
                        className="cursor-pointer hover:fill-[#2B7A78] transition"
                      />
                      <text x="80" y="65" fill="#a0aec0" fontSize="8" className="pointer-events-none">Bekasi / Depok</text>

                      {/* Bogor / Sukabumi */}
                      <path 
                        d="M40 80 L120 100 L100 180 L30 160 Z" 
                        fill={selectedCity === 'Bogor' ? '#2B7A78' : '#14223f'} 
                        stroke="#3aafa9" 
                        strokeWidth="1"
                        onClick={() => {
                          setSelectedCity('Bogor');
                          setSelectedElementId('reg-bogor');
                        }}
                        className="cursor-pointer hover:fill-[#2B7A78] transition"
                      />
                      <text x="50" y="130" fill="#a0aec0" fontSize="8" className="pointer-events-none">Bogor / Sukabumi</text>

                      {/* Bandung Raya (Heart of Rebana Zone) */}
                      <path 
                        d="M120 100 L240 110 L220 190 L100 180 Z" 
                        fill={selectedCity === 'Bandung' ? '#2b7a78' : '#14223f'} 
                        stroke="#3aafa9" 
                        strokeWidth="1.5"
                        onClick={() => {
                          setSelectedCity('Bandung');
                          setSelectedElementId('reg-bandung');
                        }}
                        className="cursor-pointer hover:fill-[#3aafa9] transition"
                      />
                      <circle cx="170" cy="140" r="4" fill="#facc15" className="pointer-events-none animate-ping" />
                      <text x="140" y="145" fill="#ffffff" fontSize="9" className="font-bold pointer-events-none">Bandung Raya</text>

                      {/* Cirebon / Indramayu (Rebana East Gate) */}
                      <path 
                        d="M240 110 L350 90 L380 150 L260 180 Z" 
                        fill={selectedCity === 'Cirebon' ? '#2B7A78' : '#14223f'} 
                        stroke="#3aafa9" 
                        strokeWidth="1"
                        onClick={() => {
                          setSelectedCity('Cirebon');
                          setSelectedElementId('reg-cirebon');
                        }}
                        className="cursor-pointer hover:fill-[#2B7A78] transition"
                      />
                      <text x="280" y="130" fill="#a0aec0" fontSize="8" className="pointer-events-none">Cirebon / Rebana</text>

                      {/* Priangan Timur (Tasikmalaya / Garut) */}
                      <path 
                        d="M220 190 L380 150 L420 220 L260 250 Z" 
                        fill={selectedCity === 'Tasikmalaya' ? '#2B7A78' : '#14223f'} 
                        stroke="#3aafa9" 
                        strokeWidth="1"
                        onClick={() => {
                          setSelectedCity('Tasikmalaya');
                          setSelectedElementId('reg-tasikmalaya');
                        }}
                        className="cursor-pointer hover:fill-[#2B7A78] transition"
                      />
                      <text x="290" y="200" fill="#a0aec0" fontSize="8" className="pointer-events-none">Priangan Timur</text>

                      {/* Overlaid Active Pins (Simulated Cluster markers) */}
                      {enabledLayers.berita && (
                        <g fill="#10b981" stroke="#ffffff" strokeWidth="1">
                          <circle 
                            cx="160" 
                            cy="120" 
                            r="5" 
                            aria-label="Berita Baru Bandung" 
                            onClick={() => setSelectedElementId('marker-berita-bandung')}
                            className="cursor-pointer hover:scale-150 transition fill-emerald-400 stroke-white" 
                          />
                          <circle 
                            cx="180" 
                            cy="150" 
                            r="5" 
                            aria-label="Tender Tol Cipularang" 
                            onClick={() => setSelectedElementId('marker-tender-cipularang')}
                            className="cursor-pointer hover:scale-150 transition fill-cyan-400 stroke-white" 
                          />
                          <circle 
                            cx="280" 
                            cy="110" 
                            r="5" 
                            aria-label="Investasi Pabrik Cirebon" 
                            onClick={() => setSelectedElementId('marker-pabrik-cirebon')}
                            className="cursor-pointer hover:scale-150 transition fill-amber-400 stroke-white" 
                          />
                        </g>
                      )}

                      {enabledLayers.cctv && (
                        <g fill="#ef4444" stroke="#ffffff" strokeWidth="1">
                          <circle 
                            cx="165" 
                            cy="135" 
                            r="5" 
                            aria-label="CCTV Pasteur" 
                            onClick={() => {
                              setSelectedCity('Bandung');
                              setSelectedElementId('marker-cctv-pasteur');
                            }}
                            className="cursor-pointer hover:scale-150 transition animate-pulse fill-red-500" 
                          />
                          <circle 
                            cx="70" 
                            cy="75" 
                            r="5" 
                            aria-label="CCTV Bogor" 
                            onClick={() => {
                              setSelectedCity('Bogor');
                              setSelectedElementId('marker-cctv-bogor');
                            }}
                            className="cursor-pointer hover:scale-150 transition fill-red-500" 
                          />
                        </g>
                      )}

                    </svg>
                  </div>
                )}

                {/* INTERNATIONAL VIEWPORT GLOBAL */}
                {activeLayer === 'internasional' && (
                  <svg viewBox="0 0 800 350" className="w-full max-w-2xl h-auto select-none mx-auto">
                    
                    {/* America continent */}
                    <path d="M100 50 L180 120 L150 200 L190 280 L160 320 L110 240 L80 150 Z" fill="#14223f" stroke="#3aafa9" strokeWidth="1" />
                    <text x="120" y="180" fill="#64748b" fontSize="8" className="font-mono">AMERICA</text>

                    {/* Africa */}
                    <path d="M340 120 L390 140 L410 200 L380 260 L330 220 L310 160 Z" fill="#14223f" stroke="#3aafa9" strokeWidth="1" />
                    <text x="340" y="200" fill="#64748b" fontSize="8" className="font-mono">AFRICA</text>

                    {/* Europe */}
                    <path d="M300 50 L380 40 L390 90 L310 110 Z" fill="#14223f" stroke="#3aafa9" strokeWidth="1" />
                    <text x="330" y="80" fill="#64748b" fontSize="8" className="font-mono">EUROPE</text>

                    {/* Asia */}
                    <path 
                      d="M400 40 L520 50 L560 120 L480 180 L420 140 Z" 
                      fill={selectedCountry === 'Jepang' ? '#2B7A78' : '#14223f'} 
                      stroke="#3aafa9" 
                      strokeWidth="1"
                      onClick={() => {
                        setSelectedCountry('Jepang');
                        setSelectedElementId('int-japan');
                      }}
                      className="cursor-pointer hover:fill-[#3aafa9]"
                    />
                    <text x="460" y="100" fill="#a0aec0" fontSize="9" className="font-mono font-bold">ASIA</text>

                    {/* Southeast Asia Anchor */}
                    <path 
                      d="M460 180 L500 175 L520 220 L450 210 Z" 
                      fill={selectedCountry === 'Indonesia' ? '#2b7a78' : '#1a2c52'} 
                      stroke="#3aafa9" 
                      strokeWidth="1.5"
                      onClick={() => {
                        setSelectedCountry('Indonesia');
                        setSelectedElementId('int-indonesia');
                      }}
                      className="cursor-pointer hover:fill-[#3aafa9] transition"
                    />
                    <circle cx="480" cy="195" r="4" fill="#facc15" className="pointer-events-none animate-ping" />
                    <text x="475" y="212" fill="#ffffff" fontSize="8" className="font-bold">INDONESIA</text>

                    {/* Australia */}
                    <path d="M500 240 L560 250 L550 290 L490 280 Z" fill="#14223f" stroke="#3aafa9" strokeWidth="1" />
                    <text x="510" y="270" fill="#64748b" fontSize="8" className="font-mono">AUSTRALIA</text>

                  </svg>
                )}

              </div>

            </div>

            {/* Simulated Live CCTV Stream Overlay box if CCTV layer is clicked and active */}
            {enabledLayers.cctv && selectedCity && (
              <div className="absolute bottom-16 left-4 z-20 bg-[#060a17]/95 border border-[#ef4444]/30 rounded-xl p-2.5 w-60 text-left shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
                  <span className="text-[9px] text-[#ef4444] font-black font-mono animate-pulse flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    LIVE FEED: RTMC {selectedCity.toUpperCase()}
                  </span>
                  <span className="text-[8px] text-slate-500 font-mono">1080p 24fps</span>
                </div>
                <div className="bg-slate-900 rounded h-20 flex items-center justify-center text-[10px] text-slate-400 relative overflow-hidden font-mono">
                  <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/80 flex items-end p-1">
                    <span className="text-[8px] text-emerald-400">Pasteur West Inflow - 2026-06-30</span>
                  </div>
                  <Tv className="h-6 w-6 text-slate-600 animate-pulse" />
                </div>
              </div>
            )}

            {/* Visualizer Mode selector details inside map */}
            <div className="mt-2 pt-2 border-t border-[#1e2d5a] flex justify-between items-center text-[10px] text-slate-400 font-mono">
              <span>Projection: Mercator WGS84</span>
              <span>Vector Engine: SVGTile-Active</span>
              <span className="text-teal-400 font-bold uppercase">Tile cache status: 100% Hit</span>
            </div>

          </div>

          {/* TIME MACHINE & HISTORICAL SLIDER (Requested panel bawah) */}
          <div className="bg-[#111a36] border border-[#1e2d5a] rounded-2xl p-4 text-left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#1e2d5a] pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <History className="h-4 w-4 text-teal-400" />
                <div>
                  <h4 className="font-display font-black text-xs text-white uppercase tracking-wider">
                    🕰️ Geo Time Machine Progress Controller
                  </h4>
                  <p className="text-[10px] text-slate-400">Geser atau putar otomatis untuk memantau perubahan infrastruktur wilayah.</p>
                </div>
              </div>

              {/* Play/Pause Button */}
              <button 
                onClick={() => setIsPlayingTime(!isPlayingTime)}
                className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider transition ${
                  isPlayingTime ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-[#2B7A78] text-white'
                }`}
              >
                {isPlayingTime ? '⏹️ PAUSE AUTO' : '▶️ PLAY HISTORY'}
              </button>
            </div>

            <div className="space-y-4">
              
              {/* Slider Input */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono font-bold text-slate-400">2020</span>
                <input 
                  type="range" 
                  min="2020" 
                  max="2026" 
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(parseInt(e.target.value))}
                  className="flex-1 accent-teal-500 bg-[#060a17] h-1.5 rounded-lg appearance-none"
                />
                <span className="text-xs font-mono font-black text-amber-400">{timePeriod}</span>
              </div>

              {/* Live Status indicator card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 bg-[#060a17] border border-[#1e2d5a] rounded-lg">
                  <span className="text-[8px] text-slate-500 block font-mono">MILIK TAHUN {timePeriod}</span>
                  <span className="font-bold text-[#3aafa9]">{currentTimelineData.keyEvent}</span>
                </div>
                <div className="p-2.5 bg-[#060a17] border border-[#1e2d5a] rounded-lg">
                  <span className="text-[8px] text-slate-500 block font-mono">KEMAPANAN INFRASTRUKTUR</span>
                  <span className="font-bold text-white">{currentTimelineData.infraScore}% Indeks</span>
                </div>
                <div className="p-2.5 bg-[#060a17] border border-[#1e2d5a] rounded-lg">
                  <span className="text-[8px] text-slate-500 block font-mono">MITRA USAHA REGISTERED</span>
                  <span className="font-bold text-amber-400">{currentTimelineData.activeBusiness} UMKM/Perusahaan</span>
                </div>
              </div>

            </div>
          </div>

        </motion.div>

        {/* PANEL 4: RIGHT DETAIL INFORMATION DECK / ENTERPRISE GEO INFORMATION PANEL */}
        <motion.div 
          layout
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className={`bg-[#111a36] border p-4 flex flex-col justify-between text-left transition-all duration-300 relative ${
            isWorkspaceMode 
              ? 'lg:col-span-5 border-amber-500/40 shadow-xl shadow-amber-500/5 ring-1 ring-amber-500/20 rounded-2xl' 
              : 'lg:col-span-3 border-[#1e2d5a] rounded-2xl'
          }`}
        >
          {(() => {
            const details = getMapElementDetails(selectedElementId, currentLocationTitle);
            return (
              <div className="flex-1 flex flex-col justify-between h-full">
                <AnimatePresence mode="wait">
            {isWorkspaceMode ? (
              // ENTERPRISE GEO WORKSPACE DEEP-DIVE GEO INFORMATION PANEL
              <motion.div
                key="workspace-panel-deep"
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="space-y-4 flex-1 flex flex-col h-full overflow-hidden"
              >
              {/* Header */}
              <div className="border-b border-[#1e2d5a] pb-3 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                    <span className="text-[9px] bg-amber-500/20 text-amber-300 font-mono px-2 py-0.5 rounded font-black uppercase border border-amber-500/30 animate-pulse">
                      💼 WORKSPACE ACTIVE
                    </span>
                    <span className="text-[9px] bg-[#2B7A78]/20 text-[#3aafa9] font-mono px-1.5 py-0.5 rounded font-bold uppercase">
                      {details.category || currentLocationType}
                    </span>
                    <span className="text-[9px] bg-slate-800 text-slate-400 font-mono px-1.5 py-0.5 rounded">
                      {simulatedWeton}
                    </span>
                  </div>
                  <h3 className="font-display font-black text-base text-white flex items-center gap-2">
                    {details.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                    ID: {details.id} &bull; Elevasi: {details.elevation}
                  </p>
                </div>
                <button 
                  onClick={() => setIsWorkspaceMode(false)}
                  className="text-slate-400 hover:text-amber-400 px-2.5 py-1 rounded-lg hover:bg-white/5 text-xs font-bold transition border border-slate-700 hover:border-amber-500/40"
                  title="Tutup Workspace"
                >
                  &times; Tutup
                </button>
              </div>

              {/* High-tech Status Ticker bar */}
              <div className="flex items-center justify-between text-[8px] font-mono text-slate-400 bg-[#060a17] px-2.5 py-1.5 rounded-lg border border-[#1e2d5a]/40">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-400 font-bold uppercase">DATABASE SYNC: OK</span>
                </div>
                <span className="text-slate-500">ACCURACY: 99.98%</span>
              </div>

              {/* Sub-filtering Tabs inside Intel Workspace to improve UX and handle heavy data */}
              <div className="flex gap-1 overflow-x-auto pb-1.5 scrollbar-none border-b border-[#1e2d5a]/40">
                {[
                  { id: 'all', label: '🌐 Semua' },
                  { id: 'analytics', label: '📈 Analitik' },
                  { id: 'news', label: '📰 Berita' },
                  { id: 'business', label: '🏢 Sektor' },
                  { id: 'realestate', label: '🗺️ Lahan' },
                  { id: 'simulator', label: '⚡ ROI Simulator' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setWorkspaceTabFilter(tab.id as any);
                      setApiFeedback(`Filter Workspace: ${tab.label}`);
                      setTimeout(() => setApiFeedback(null), 1000);
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase shrink-0 transition-all border ${
                      workspaceTabFilter === tab.id
                        ? 'bg-amber-500/15 text-amber-400 border-amber-500/40 shadow-sm font-extrabold'
                        : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1 max-h-[640px] scrollbar-none">
                
                {/* 1. DEEP-DIVE STATISTICS */}
                {(workspaceTabFilter === 'all' || workspaceTabFilter === 'analytics') && (
                  <div className="bg-[#060a17]/80 border border-[#1e2d5a] rounded-xl p-3.5 space-y-3">
                    <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
                      <h4 className="font-display font-black text-xs text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                        <BarChart3 className="h-4 w-4" />
                        Deep-Dive Statistics &amp; Investment Trends
                      </h4>
                      <span className="text-[8px] bg-[#3aafa9]/10 text-[#3aafa9] font-mono px-1.5 rounded font-bold">LIVE UPDATE</span>
                    </div>

                    <p className="text-[10px] text-slate-400 leading-relaxed">
                      {details.description}
                    </p>

                    {/* Recharts Area Chart */}
                    <div className="h-44 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={details.chartData}>
                          <defs>
                            <linearGradient id="colorInvest" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#2B7A78" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#2B7A78" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorInfra" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#facc15" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#facc15" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="name" stroke="#64748b" fontSize={9} tickLine={false} />
                          <YAxis stroke="#64748b" fontSize={9} tickLine={false} />
                          <Tooltip contentStyle={{ backgroundColor: '#060a17', borderColor: '#1e2d5a', fontSize: 10 }} />
                          <Area type="monotone" dataKey="Investasi" stroke="#3aafa9" fillOpacity={1} fill="url(#colorInvest)" strokeWidth={2} name="Capital (Rp B)" />
                          <Area type="monotone" dataKey="Infrastruktur" stroke="#facc15" fillOpacity={0.6} fill="url(#colorInfra)" strokeWidth={1.5} name="Infra Score" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Demographic & Capital Growth KPI Matrix */}
                    <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                      <div className="p-2 bg-[#111a36]/60 border border-white/5 rounded-lg">
                        <span className="text-slate-400 block text-[9px] font-mono">PDB REGIONAL (GDP)</span>
                        <span className="font-extrabold text-white text-[13px]">{details.businessMetrics.gdpGrowth !== 'N/A' ? details.businessMetrics.gdpGrowth : `+${gdpVal.toFixed(1)}% YoY`}</span>
                        <span className="text-[8px] text-emerald-400 block font-mono">Kuartal Terakhir</span>
                      </div>
                      <div className="p-2 bg-[#111a36]/60 border border-white/5 rounded-lg">
                        <span className="text-slate-400 block text-[9px] font-mono">FOREIGN DIRECT INVEST (FDI)</span>
                        <span className="font-extrabold text-[#3aafa9] text-[13px]">{details.businessMetrics.investmentValue}</span>
                        <span className="text-[8px] text-teal-300 block font-mono">Proyek Strategis</span>
                      </div>
                      <div className="p-2 bg-[#111a36]/60 border border-white/5 rounded-lg">
                        <span className="text-slate-400 block text-[9px] font-mono">POPULASI INDEX</span>
                        <span className="font-extrabold text-white text-[13px]">{details.regionalStats.population}</span>
                        <span className="text-[8px] text-slate-500 block font-mono">Luas {details.regionalStats.areaSize}</span>
                      </div>
                      <div className="p-2 bg-[#111a36]/60 border border-white/5 rounded-lg">
                        <span className="text-slate-400 block text-[9px] font-mono">DIGITAL LITERACY INDEX</span>
                        <span className="font-extrabold text-amber-400 text-[13px]">{details.regionalStats.digitalMaturity}</span>
                        <span className="text-[8px] text-amber-500 block font-mono">High connectivity</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. HYPERLOCAL NEWS FEED & ANALYSIS */}
                {(workspaceTabFilter === 'all' || workspaceTabFilter === 'news') && (
                  <div className="bg-[#060a17]/80 border border-[#1e2d5a] rounded-xl p-3.5 space-y-3">
                    <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
                      <h4 className="font-display font-black text-xs text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Newspaper className="h-4 w-4" />
                        Hyperlocal News &amp; Regional Sentiment
                      </h4>
                      <span className="text-[8px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.2 rounded font-mono font-bold">REAL-TIME SENTIMENT</span>
                    </div>

                    <div className="space-y-2.5">
                      {details.newsFeed.map((news) => (
                        <div 
                          key={`workspace-news-${news.id}`} 
                          className="p-3 bg-[#111a36]/40 hover:bg-[#111a36]/80 border border-white/5 rounded-xl space-y-1.5 transition cursor-pointer"
                          onClick={() => onNavigateToArticle?.('apbd-target')}
                        >
                          <div className="flex justify-between items-center text-[9px] font-mono">
                            <span className="text-[#3aafa9] font-bold uppercase">{news.category}</span>
                            <span className="text-slate-500">{news.time}</span>
                          </div>
                          <h5 className="text-xs font-black text-white leading-tight hover:text-amber-300 transition-colors">
                            {news.title}
                          </h5>
                          <p className="text-[10px] text-slate-400 leading-relaxed">
                            {news.summary}
                          </p>
                          <div className="flex justify-between items-center text-[9px] pt-1.5 border-t border-white/5">
                            <span className="text-slate-400">
                              Sumber: <strong className="text-[#3aafa9]">{news.source}</strong> &bull; Sentimen: <strong className={news.sentiment === 'Positif' ? 'text-emerald-400' : news.sentiment === 'Negatif' ? 'text-rose-400' : 'text-slate-400'}>{news.sentiment}</strong>
                            </span>
                            <span className="text-amber-400 flex items-center gap-0.5 font-bold">
                              Buka <ChevronRight className="h-3 w-3" />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. BUSINESS & ENTERPRISE INTELLIGENCE DATA */}
                {(workspaceTabFilter === 'all' || workspaceTabFilter === 'business') && (
                  <div className="bg-[#060a17]/80 border border-[#1e2d5a] rounded-xl p-3.5 space-y-3">
                    <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
                      <h4 className="font-display font-black text-xs text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Building2 className="h-4 w-4" />
                        Business Directory &amp; Enterprise Growth
                      </h4>
                      <span className="text-[8px] bg-indigo-500/10 text-indigo-300 px-1.5 py-0.2 rounded font-mono font-bold">ZONASI AKTIF</span>
                    </div>

                    {/* Sector Allocation distribution Pie Chart */}
                    <div className="p-3 bg-[#111a36]/50 rounded-xl border border-white/5 space-y-2">
                      <span className="text-[9px] text-[#3aafa9] block font-mono font-bold uppercase">DOMINANT SECTOR: {details.businessMetrics.dominantSector}</span>
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="h-24 w-24 shrink-0">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={[
                                  { name: 'Tech & GIS', value: 35 },
                                  { name: 'Logistics', value: 30 },
                                  { name: 'Agriculture', value: 15 },
                                  { name: 'Creative', value: 20 }
                                ]}
                                innerRadius={18}
                                outerRadius={38}
                                paddingAngle={3}
                                dataKey="value"
                              >
                                {[0,1,2,3].map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={['#3aafa9', '#2B7A78', '#facc15', '#ef4444'][index % 4]} />
                                ))}
                              </Pie>
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[9px] font-mono text-slate-400 flex-1 w-full">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded bg-[#3aafa9]" />
                            <span>Tech/AI: 35%</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded bg-[#2B7A78]" />
                            <span>Logistics: 30%</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded bg-[#facc15]" />
                            <span>Agri: 15%</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded bg-[#ef4444]" />
                            <span>Creative: 20%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {details.businessMetrics.companies.map((b, idx) => (
                        <div key={`workspace-biz-${idx}`} className="p-3 bg-[#111a36]/40 border border-white/5 rounded-xl space-y-1.5">
                          <div className="flex justify-between items-start">
                            <h5 className="font-bold text-white text-xs">{b.name}</h5>
                            <span className="text-[8px] bg-emerald-500/20 text-emerald-400 font-mono px-1.5 rounded font-black uppercase">
                              {b.capital}
                            </span>
                          </div>
                          <div className="flex justify-between text-[10px] text-slate-400">
                            <span>Sektor: {b.sector}</span>
                            <span>Skala: {b.staff}</span>
                          </div>
                          <p className="text-[10px] text-slate-500">
                            Telah mengintegrasikan data spasial logistik dan rantai suplai lokal ke dalam operating system INFOBOS.
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. REAL ESTATE & COMMERCIAL SITES */}
                {(workspaceTabFilter === 'all' || workspaceTabFilter === 'realestate') && (
                  <div className="bg-[#060a17]/80 border border-[#1e2d5a] rounded-xl p-3.5 space-y-3">
                    <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
                      <h4 className="font-display font-black text-xs text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Landmark className="h-4 w-4" />
                        Land Bank &amp; Commercial Real Estate
                      </h4>
                      <span className="text-[8px] bg-amber-500/10 text-amber-400 px-1.5 py-0.2 rounded font-mono font-bold">HIGH DEMAND</span>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { area: 'Kawasan Pergudangan Terpadu', price: 'Rp 4.5 Miliar/Unit', spec: 'LT: 2,500m² LB: 1,800m²', available: '12 Unit' },
                        { area: 'Lahan Komersial Koridor Utama', price: 'Rp 22 Juta / m²', spec: 'Zonasi Perdagangan & Jasa', available: '4,000m² Lahan' },
                      ].map((site, index) => (
                        <div key={index} className="p-2.5 bg-[#111a36]/40 border border-white/5 rounded-lg text-xs space-y-1">
                          <div className="flex justify-between">
                            <span className="font-bold text-white">{site.area}</span>
                            <span className="text-[#3aafa9] font-black font-mono">{site.price}</span>
                          </div>
                          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                            <span>Spek: {site.spec}</span>
                            <span className="text-amber-400">{site.available} Tersedia</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. INTERACTIVE INVESTMENT & ROI SIMULATOR (NEW ADVANCED UX WORKSPACE FEATURE) */}
                {(workspaceTabFilter === 'all' || workspaceTabFilter === 'simulator') && (
                  <div className="bg-[#060a17]/90 border border-amber-500/30 rounded-xl p-3.5 space-y-3 shadow-md shadow-amber-500/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-500/10 to-transparent pointer-events-none" />
                    
                    <div className="flex justify-between items-center border-b border-amber-500/20 pb-1.5">
                      <h4 className="font-display font-black text-xs text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Sliders className="h-4 w-4 text-amber-500" />
                        Interactive ROI &amp; Investment Simulator
                      </h4>
                      <span className="text-[8px] bg-amber-500/10 text-amber-400 px-1.5 py-0.2 rounded font-mono font-bold">PREMIUM TOOL</span>
                    </div>

                    <p className="text-[10px] text-slate-400 leading-normal">
                      Simulasikan modal investasi Anda di <strong className="text-white">{details.name}</strong> untuk memprediksi ROI, peluang persetujuan AMDAL/perizinan, dan insentif pajak yang tersedia secara real-time.
                    </p>

                    <div className="space-y-3 bg-[#111a36]/50 p-3 rounded-lg border border-[#1e2d5a]/50">
                      {/* Form Select Sector */}
                      <div className="space-y-1 text-left">
                        <label className="text-[8.5px] font-black uppercase tracking-wider text-slate-400 block">Sektor Sasaran</label>
                        <div className="grid grid-cols-2 gap-1.5">
                          {[
                            { id: 'tech', label: '🚀 Tech & AI' },
                            { id: 'logistics', label: '🏢 Logistik & Infra' },
                            { id: 'agri', label: '🌾 Tani Presisi' },
                            { id: 'creative', label: '🎨 Ekonomi Kreatif' },
                          ].map((sec) => (
                            <button
                              key={sec.id}
                              onClick={() => {
                                setSimulatorSector(sec.id as any);
                                setLastSimulationResult(null);
                              }}
                              className={`py-1.5 px-2 rounded-md text-[9.5px] font-bold text-left transition-all border ${
                                simulatorSector === sec.id
                                  ? 'bg-amber-500/20 border-amber-400 text-amber-400 font-extrabold shadow-sm'
                                  : 'bg-[#0d152a] border-[#1e2d5a] text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              {sec.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Slider Capital (Billion IDR) */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-[9px]">
                          <span className="font-black uppercase tracking-wider text-slate-400">Nilai Investasi</span>
                          <span className="font-mono font-black text-amber-400 text-[11px]">Rp {simulatorInvestment} Miliar</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="200"
                          value={simulatorInvestment}
                          onChange={(e) => {
                            setSimulatorInvestment(parseInt(e.target.value));
                            setLastSimulationResult(null);
                          }}
                          className="w-full h-1.5 bg-[#0d152a] rounded-lg appearance-none cursor-pointer accent-amber-500"
                        />
                        <div className="flex justify-between text-[7px] font-mono text-slate-500">
                          <span>Rp 1 Miliar</span>
                          <span>Rp 100 Miliar</span>
                          <span>Rp 200 Miliar</span>
                        </div>
                      </div>

                      {/* Period Selection (Years) */}
                      <div className="space-y-1 text-left">
                        <label className="text-[8.5px] font-black uppercase tracking-wider text-slate-400 block">Tenor Proyek (Tahun)</label>
                        <div className="flex gap-1.5">
                          {[3, 5, 8, 10].map((yr) => (
                            <button
                              key={yr}
                              onClick={() => {
                                setSimulatorPeriod(yr);
                                setLastSimulationResult(null);
                              }}
                              className={`flex-1 py-1 rounded text-[10px] font-mono font-bold transition-all border ${
                                simulatorPeriod === yr
                                  ? 'bg-amber-500/20 border-amber-400 text-amber-400'
                                  : 'bg-[#0d152a] border-[#1e2d5a] text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              {yr} Thn
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="pt-1.5 flex gap-2">
                        <button
                          onClick={() => {
                            setIsSimulating(true);
                            setTimeout(() => {
                              setIsSimulating(false);
                              
                              const sectorNames = {
                                tech: 'Teknologi & Digitalisasi',
                                logistics: 'Logistik & Hub Strategis',
                                agri: 'Agribisnis Presisi',
                                creative: 'Industri Kreatif Jabar'
                              };
                              const baseIncentives = {
                                tech: 'Super Tax Deduction 200% & Tax Holiday 5 Tahun',
                                logistics: 'Free Trade Zone Custom Waiver & Kemudahan Sertifikat Amdal',
                                agri: 'Subsidi Alat Mesin Pertanian (Alsintan) IoT & Tax Holiday 3 Tahun',
                                creative: 'Insentif Inkubasi Ekspor & Subsidi Kredit Usaha Rakyat (KUR) Mikro'
                              };
                              
                              const digitalLitRaw = details.regionalStats.digitalMaturity.includes('High') ? 85 : 70;
                              const gdpRaw = parseFloat(details.businessMetrics.gdpGrowth) || 6.2;
                              const approvalScore = Math.min(98, Math.round(digitalLitRaw + (gdpRaw * 2) - (simulatorInvestment * 0.05)));
                              
                              const multi = { tech: 1.45, logistics: 1.32, agri: 1.22, creative: 1.38 }[simulatorSector];
                              const estROI = (simulatorInvestment * Math.pow(multi, simulatorPeriod / 5)).toFixed(2);
                              const netProfit = (parseFloat(estROI) - simulatorInvestment).toFixed(2);

                              setLastSimulationResult({
                                sector: sectorNames[simulatorSector],
                                incentive: baseIncentives[simulatorSector],
                                approvalRate: approvalScore,
                                roiValue: estROI,
                                profitValue: netProfit,
                                riskLevel: approvalScore > 80 ? 'Rendah (Sangat Layak)' : approvalScore > 65 ? 'Sedang' : 'Tinggi (Butuh Review Khusus)',
                                recommendation: `Gunakan insentif ${baseIncentives[simulatorSector].split('&')[0]} untuk memotong pajak korporasi regional dan tingkatkan sinergi dengan UMKM binaan lokal.`
                              });

                              setApiFeedback('Kalkulasi simulasi modal berhasil disinkronkan!');
                              setTimeout(() => setApiFeedback(null), 1500);
                            }, 1000);
                          }}
                          disabled={isSimulating}
                          className="flex-1 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-[10px] uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/10 disabled:opacity-50"
                        >
                          {isSimulating ? (
                            <>
                              <RefreshCw className="h-3 w-3 animate-spin text-slate-950" />
                              <span>MENGANALISIS DATA...</span>
                            </>
                          ) : (
                            <>
                              <Zap className="h-3.5 w-3.5 text-slate-950" />
                              <span>Hitung Simulasi ROI</span>
                            </>
                          )}
                        </button>
                        
                        {(lastSimulationResult || simulatorInvestment !== 15) && (
                          <button
                            onClick={() => {
                              setSimulatorInvestment(15);
                              setSimulatorSector('tech');
                              setSimulatorPeriod(5);
                              setLastSimulationResult(null);
                            }}
                            className="px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[10px] uppercase font-black tracking-wider transition border border-slate-700"
                          >
                            Reset
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Simulation Result Output Panel */}
                    <AnimatePresence mode="wait">
                      {lastSimulationResult && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-[#0c1428] rounded-xl p-3 border border-amber-500/20 space-y-3"
                        >
                          <div className="flex justify-between items-center text-[9px] font-mono border-b border-white/5 pb-1">
                            <span className="text-[#3aafa9] font-bold">PROYEKSI ANALISIS SPASIAL</span>
                            <span className="text-amber-400 font-extrabold uppercase">SIMULATION COMPLETED</span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="p-2 bg-[#111a36]/50 rounded-lg border border-white/5 text-left">
                              <span className="text-slate-400 block text-[8px] font-mono">ESTIMASI BALIK MODAL (ROI)</span>
                              <span className="font-extrabold text-white text-xs">Rp {lastSimulationResult.roiValue} Miliar</span>
                              <span className="text-[7.5px] text-emerald-400 block font-mono">Net Profit: +Rp {lastSimulationResult.profitValue}M</span>
                            </div>

                            <div className="p-2 bg-[#111a36]/50 rounded-lg border border-white/5 text-left">
                              <span className="text-slate-400 block text-[8px] font-mono">PROBABILITAS PERIZINAN</span>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className={`font-extrabold text-xs ${lastSimulationResult.approvalRate > 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                                  {lastSimulationResult.approvalRate}%
                                </span>
                                <div className="flex-1 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${lastSimulationResult.approvalRate > 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                                    style={{ width: `${lastSimulationResult.approvalRate}%` }}
                                  />
                                </div>
                              </div>
                              <span className="text-[7.5px] text-slate-500 block font-mono">Status AMDAL Terprediksi</span>
                            </div>
                          </div>

                          <div className="p-2.5 bg-[#111a36]/30 rounded-lg border border-white/5 text-[9.5px] space-y-1 text-left">
                            <div className="font-bold text-amber-400 flex items-center gap-1">
                              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                              <span>FASILITAS INSENTIF REPUBLIK</span>
                            </div>
                            <p className="text-slate-300 leading-normal">
                              {lastSimulationResult.incentive}
                            </p>
                          </div>

                          <div className="p-2.5 bg-amber-500/5 rounded-lg border border-amber-500/10 text-[9.5px] space-y-1 text-left leading-relaxed">
                            <div className="font-bold text-amber-300 flex items-center gap-1">
                              <Sparkles className="h-3.5 w-3.5" />
                              <span>REKOMENDASI AI PEMETAAN</span>
                            </div>
                            <p className="text-slate-300 italic">
                              &quot;{lastSimulationResult.recommendation}&quot;
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              setApiFeedback('Rencana Investasi disimpan ke sistem!');
                              setTimeout(() => setApiFeedback(null), 1500);
                            }}
                            className="w-full py-1.5 bg-[#2B7A78] hover:bg-[#205d5c] text-white rounded text-[9px] font-black uppercase tracking-wider transition"
                          >
                            Simpan Rencana Investasi Spasial
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                )}

                {/* 6. ENTERPRISE REPORT GENERATOR */}
                {(workspaceTabFilter === 'all') && (
                  <div className="p-3 bg-indigo-950/20 border border-indigo-500/20 rounded-xl space-y-2 text-left">
                    <span className="text-[9px] text-indigo-300 font-bold uppercase block font-mono">📑 ENTERPRISE REPORT ENGINE</span>
                    <p className="text-[10px] text-slate-400 leading-normal">
                      Ekspor seluruh analitik demografi, data permodalan, dan daftar direktori usaha wilayah {details.name} menjadi laporan PDF ringkas atau dataset Excel.
                    </p>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setApiFeedback('Workspace Report Generated successfully!');
                          setTimeout(() => setApiFeedback(null), 2000);
                        }}
                        className="flex-1 py-1.5 bg-[#2B7A78] hover:bg-[#205d5c] text-white rounded text-[10px] font-black uppercase tracking-wider transition"
                      >
                        Export PDF Report
                      </button>
                      <button 
                        onClick={() => {
                          setApiFeedback('Sitemap Raw Dataset (CSV) downloaded!');
                          setTimeout(() => setApiFeedback(null), 2000);
                        }}
                        className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[10px] font-black uppercase tracking-wider transition"
                      >
                        Export CSV Data
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Bottom AI Assistant Suggestion block */}
              <div className="pt-3 border-t border-[#1e2d5a] space-y-1.5 shrink-0 text-left">
                <div className="flex items-center gap-1.5 text-amber-400">
                  <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                  <span className="font-mono font-black text-[10px] uppercase tracking-wider">AI RECOMMENDATION</span>
                </div>
                <div className="p-2.5 bg-slate-900/60 border border-amber-500/20 rounded-xl text-[10px] text-slate-300 leading-relaxed">
                  &quot;{details.aiRecommendation}&quot;
                </div>
              </div>
              </motion.div>
            ) : (
              // ORIGINAL TABS DECK
              <motion.div
                key="original-tabs-panel"
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="space-y-4 flex-1 flex flex-col h-full"
              >
              
              {/* Header Selected Location details */}
              <div className="border-b border-[#1e2d5a] pb-3">
                <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                  <span className="text-[9px] bg-[#2B7A78]/20 text-[#3aafa9] font-mono px-1.5 py-0.2 rounded font-black uppercase">
                    {details.category || currentLocationType}
                  </span>
                  <span className="text-[9px] bg-slate-800 text-slate-400 font-mono px-1.5 rounded">
                    {simulatedWeton}
                  </span>
                </div>
                <h3 className="font-display font-black text-sm text-white">{details.name}</h3>
                <p className="text-[10px] text-slate-400 font-mono">ID: {details.id} &bull; Elevasi: {details.elevation}</p>
              </div>

            {/* Tab selection */}
            <div className="grid grid-cols-5 gap-1 bg-[#060a17] p-1 rounded-xl">
              {[
                { id: 'overview', label: '📊 Info' },
                { id: 'news', label: '📰 News' },
                { id: 'business', label: '💼 Biz' },
                { id: 'gov', label: '🏛️ Gov' },
                { id: 'market', label: '🛒 Mall' }
              ].map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubTab(sub.id as any)}
                  className={`py-1 rounded text-[9px] font-bold text-center transition ${
                    selectedSubTab === sub.id 
                      ? 'bg-[#2B7A78] text-white' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {/* SUBTAB DETAILS RENDERING */}
            <div className="space-y-3 max-h-[460px] overflow-y-auto scrollbar-none pr-1 flex-1">
              
              {/* Tab 1: Overview */}
              {selectedSubTab === 'overview' && (
                <div className="space-y-3 text-xs">
                  
                  {/* Description Block */}
                  <p className="text-[11px] text-slate-400 leading-relaxed bg-[#060a17]/50 p-2.5 rounded-lg border border-white/5">
                    {details.description}
                  </p>

                  {/* Demographic info */}
                  <div className="p-3 bg-[#060a17] border border-[#1e2d5a] rounded-xl space-y-1.5">
                    <span className="text-[9px] text-[#3aafa9] font-bold uppercase font-mono">📊 Profil Demografis &amp; Geografis</span>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-slate-400 block">Total Populasi:</span>
                        <span className="font-bold text-white">{details.regionalStats.population}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Luas Administrasi:</span>
                        <span className="font-bold text-white">{details.regionalStats.areaSize}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Indeks Udara (AQI):</span>
                        <span className={`font-bold ${details.regionalStats.aqi > 100 ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {details.regionalStats.aqi} ({details.regionalStats.aqiStatus})
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Tingkat Digitalisasi:</span>
                        <span className="font-bold text-white">{details.regionalStats.digitalMaturity}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Kepadatan Penduduk:</span>
                        <span className="font-bold text-white">{(population / areaSqKm).toFixed(0)} Jiwa/km²</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">IPM (Indeks Manusia):</span>
                        <span className="font-bold text-[#3aafa9]">{(72.5 + (seed % 120) / 10).toFixed(1)}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Partisipasi Kerja:</span>
                        <span className="font-bold text-white">{(61.2 + (seed % 150) / 10).toFixed(1)}%</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Akurasi Spasial:</span>
                        <span className="font-bold text-white">{details.regionalStats.geospatialAccuracy || '± 1.5 meter'}</span>
                      </div>
                      <div className="col-span-2 pt-1 border-t border-white/5 flex justify-between">
                        <span className="text-slate-400">Skor Infrastruktur:</span>
                        <span className="font-black text-amber-400">{details.regionalStats.infrastructureScore || '85/100'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Weather widget representation */}
                  <div className="p-3 bg-[#060a17] border border-[#1e2d5a] rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-slate-500 block font-mono">REAL-TIME WEATHER</span>
                      <span className="text-sm font-bold text-white">{weatherTemp}°C</span>
                      <span className="text-[10px] text-[#3aafa9] block font-bold">{weatherCondition}</span>
                    </div>
                    <Cloud className="h-8 w-8 text-[#3aafa9] shrink-0 animate-pulse" />
                  </div>

                  {/* Javanese weton card */}
                  <div className="p-3 bg-[#1d142b] border border-purple-500/20 rounded-xl space-y-1">
                    <span className="text-[9px] text-purple-300 font-bold uppercase font-mono">🔮 Pranata Mangsa &amp; Weton Jawa</span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Siklus penanggalan weton hari ini jatuh pada pasaran <span className="text-amber-400 font-bold">{simulatedWeton}</span> (Neptu 8). Cocok untuk aktivitas bisnis di seputar wilayah {details.name}.
                    </p>
                  </div>

                </div>
              )}

              {/* Tab 2: News Feed */}
              {selectedSubTab === 'news' && (
                <div className="space-y-2">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider font-mono">📰 Berita Terkait Wilayah</span>
                  
                  {details.newsFeed.map(news => (
                    <div 
                      key={news.id} 
                      className="p-2.5 bg-[#060a17] hover:bg-white/5 border border-[#1e2d5a] rounded-xl space-y-1 cursor-pointer transition"
                      onClick={() => onNavigateToArticle?.('apbd-target')}
                    >
                      <div className="flex justify-between items-center text-[9px]">
                        <span className="text-[#3aafa9] font-bold uppercase">{news.category}</span>
                        <span className="text-slate-400">{news.time}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white line-clamp-2 hover:text-[#3aafa9] transition-colors">{news.title}</h4>
                      <p className="text-[10px] text-slate-400 leading-normal line-clamp-2 mt-0.5">{news.summary}</p>
                      <div className="flex justify-between items-center text-[9px] pt-1.5 border-t border-white/5 mt-1">
                        <span className="text-slate-500">Sumber: <strong className="text-slate-300">{news.source}</strong> &bull; Sentimen: <strong className={news.sentiment === 'Positif' ? 'text-emerald-400' : news.sentiment === 'Negatif' ? 'text-rose-400' : 'text-slate-400'}>{news.sentiment}</strong></span>
                        <span className="text-teal-400">Selengkapnya &rarr;</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Business & BI */}
              {selectedSubTab === 'business' && (
                <div className="space-y-2.5">
                  <div className="p-3 bg-indigo-950/40 border border-indigo-500/20 rounded-xl">
                    <span className="text-[10px] text-indigo-300 font-bold uppercase block font-mono">🏢 BUSINESS INTELLIGENCE METRICS</span>
                    <div className="grid grid-cols-2 gap-2 text-xs pt-1.5">
                      <div>
                        <span className="text-slate-400 block text-[9px]">Nilai Investasi:</span>
                        <span className="font-bold text-emerald-400">{details.businessMetrics.investmentValue}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px]">Dominan Sektor:</span>
                        <span className="font-bold text-amber-400">{details.businessMetrics.dominantSector}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px]">UMKM Aktif:</span>
                        <span className="font-bold text-white">{details.businessMetrics.activeUMKM}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px]">Tingkat Pertumbuhan:</span>
                        <span className="font-bold text-white">{details.businessMetrics.gdpGrowth !== 'N/A' ? details.businessMetrics.gdpGrowth : `+${gdpVal.toFixed(1)}% YoY`}</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider font-mono block">💼 Daftar Perusahaan &amp; Pabrik</span>
                  {details.businessMetrics.companies.length > 0 ? (
                    details.businessMetrics.companies.map((b, i) => (
                      <div key={i} className="p-2.5 bg-[#060a17] border border-[#1e2d5a] rounded-xl text-xs space-y-1">
                        <h4 className="font-bold text-white">{b.name}</h4>
                        <div className="flex justify-between text-[10px] text-slate-400">
                          <span>Sektor: {b.sector}</span>
                          <span>Skala: {b.staff}</span>
                        </div>
                        <div className="text-[9px] text-slate-500 pt-1 border-t border-white/5 flex justify-between">
                          <span>Kategori: Industri Utama</span>
                          <span className="text-emerald-400 font-bold">{b.capital}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 bg-[#060a17] border border-[#1e2d5a] rounded-xl text-xs text-slate-500 italic text-center">
                      Tidak ada direktori korporasi besar hiperlokal terdaftar di titik penanda ini.
                    </div>
                  )}
                </div>
              )}

              {/* Tab 4: Government & Regulations */}
              {selectedSubTab === 'gov' && (
                <div className="space-y-2.5">
                  <div className="p-3 bg-teal-950/40 border border-teal-500/20 rounded-xl space-y-1.5">
                    <span className="text-[10px] text-[#3aafa9] font-bold uppercase font-mono">🏛️ STATUS REGIONAL &amp; TENDER</span>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Infrastruktur Skor:</span>
                      <span className="font-bold text-white">{details.regionalStats.infrastructureScore}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Tender Aktif:</span>
                      <span className="font-bold text-amber-400">{activeTenders} Pengadaan</span>
                    </div>
                  </div>

                  <span className="text-[10px] text-[#3aafa9] font-bold uppercase tracking-wider font-mono block">📜 Event Regional &amp; Pengumuman</span>
                  {details.eventNews.map((event, i) => (
                    <div key={i} className="p-2.5 bg-[#060a17] border border-[#1e2d5a] rounded-xl text-xs space-y-1">
                      <span className="text-[8px] bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded font-mono font-bold block w-fit">{event.date}</span>
                      <p className="font-bold text-white">{event.title}</p>
                      <p className="text-[10px] text-slate-400">{event.description}</p>
                      <div className="text-[9px] text-slate-500 pt-1 border-t border-white/5 flex justify-between font-mono">
                        <span>Penyelenggara: {event.organizer}</span>
                        <span className="text-[#3aafa9]">Kapasitas: {event.capacity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 5: Local Marketplace */}
              {selectedSubTab === 'market' && (
                <div className="space-y-2.5">
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider font-mono block">🛒 Produk &amp; Jasa Lokal Marketplace</span>
                  {[
                    { name: 'Sewa Drone Pertanian & Pemetaan', price: 'Rp 1.5 Juta/Hari', seller: 'Pusat Robotik Bandung' },
                    { name: 'Gudang Logistik Transit Kertajati', price: 'Rp 450 Juta/Tahun', seller: 'Segitiga Emas Realti' },
                    { name: 'Kopi Arabika Gunung Manglayang', price: 'Rp 95 Ribu / 500gr', seller: 'Koperasi Kopi Jabar' },
                    { name: 'Sistem Monitoring Cuaca IoT Portable', price: 'Rp 12.5 Juta/Unit', seller: 'GeoOS Solusindo' },
                    { name: 'Sensor Kelembaban Tanah Nirkabel LoraWAN', price: 'Rp 850 Ribu/Node', seller: 'Tani Digital Indramayu' },
                    { name: 'Layanan Drone Lidar Kontur 3D Spasial', price: 'Rp 4.5 Juta/Hektar', seller: 'Lidar Presisi Karawang' },
                    { name: 'Paket Energi Surya Mandiri 500WP', price: 'Rp 6.2 Juta/Paket', seller: 'Jatiluhur Solar Hub' },
                    { name: 'Teropong Pemantau Kebakaran Hutan Otomatis', price: 'Rp 18.5 Juta/Unit', seller: 'Inovasi Toga Sumedang' }
                  ].map((prod, i) => (
                    <div key={i} className="p-2.5 bg-[#060a17] border border-[#1e2d5a] rounded-xl text-xs space-y-1">
                      <h4 className="font-bold text-white">{prod.name}</h4>
                      <div className="flex justify-between text-[10px]">
                        <span className="text-amber-400 font-black font-mono">{prod.price}</span>
                        <span className="text-slate-400">{prod.seller}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>

              </motion.div>
            )}
          </AnimatePresence>

          {/* AI Geo Summary Generator (AI GEO Specification) */}
          <div className="mt-4 pt-3 border-t border-[#1e2d5a] space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-amber-400">
              <Sparkles className="h-4 w-4 animate-spin" />
              <span className="font-display font-black text-xs uppercase tracking-wider">AI GEO INSIGHT</span>
            </div>
            <div className="p-2.5 bg-slate-900/80 border border-amber-500/20 rounded-xl text-[11px] text-slate-300 leading-relaxed text-left">
              &quot;Wilayah <span className="text-white font-bold">{details.name}</span> menunjukkan skor kesiapan investasi <strong className="text-emerald-400">{details.regionalStats.infrastructureScore} ({timePeriod > 2024 ? 'Kategori Unggul' : 'Kategori Berkembang'})</strong>. Rekomendasi strategis: {details.aiRecommendation}&quot;
            </div>
          </div>

              </div>
            );
          })()}
        </motion.div>

      </div>

      {/* BOTTOM CONTROL GRID PANEL: Smart relationship links & Interactive GIS API Catalog */}
      <div className="bg-[#111a36] border-t border-[#1e2d5a] p-5 grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Smart Relationship chain */}
        <div className="md:col-span-8 text-left space-y-2">
          <h4 className="font-display font-black text-xs text-[#3aafa9] uppercase tracking-wider flex items-center gap-1.5">
            <Network className="h-4 w-4 text-emerald-400" />
            <span>25 Smart Geography Relationship Link Chain (Bandung Raya Anchor)</span>
          </h4>
          <p className="text-[10px] text-slate-400">Setiap data spasial yang Anda pilih terhubung secara logis ke seluruh portal:</p>
          
          <div className="flex flex-wrap gap-1.5 pt-1">
            {SMART_RELATIONSHIP_STEPS.map((step) => (
              <button
                key={step.key}
                onClick={() => {
                  setActiveRelationshipStep(step.key);
                  setSelectedSubTab(
                    step.key === 'berita' ? 'news' :
                    step.key === 'perusahaan' ? 'business' :
                    step.key === 'regulasi' ? 'gov' :
                    step.key === 'marketplace' ? 'market' : 'overview'
                  );
                }}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-tight transition ${
                  activeRelationshipStep === step.key 
                    ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-sm' 
                    : 'bg-[#060a17] text-slate-400 hover:text-white border border-[#1e2d5a]'
                }`}
              >
                {step.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Geo API Explorer */}
        <div className="md:col-span-4 text-left space-y-2">
          <h4 className="font-display font-black text-xs text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Code className="h-4 w-4" />
            <span>Geo Intelligence API Catalog (JSON Delivery)</span>
          </h4>
          
          <div className="bg-[#060a17] border border-[#1e2d5a] rounded-xl p-2.5 flex items-center justify-between text-xs font-mono">
            <div>
              <span className="text-[#3aafa9] font-bold block">GET /api/geo/news</span>
              <span className="text-slate-500 text-[10px]">Returns coordinate-bound headlines</span>
            </div>
            
            <button 
              onClick={() => {
                setApiFeedback('GET /api/geo/news - Copied Schema!');
                setTimeout(() => setApiFeedback(null), 2000);
              }}
              className="px-2.5 py-1 bg-[#111a36] border border-[#1e2d5a] hover:bg-[#2B7A78] hover:text-white text-slate-300 rounded text-[9px] uppercase font-bold transition"
            >
              {apiFeedback ? 'COPIED!' : 'Copy API Schema'}
            </button>
          </div>
          {apiFeedback && <span className="text-[9px] text-emerald-400 font-mono block animate-pulse">{apiFeedback}</span>}
        </div>

      </div>

      {/* MOBILE MODE STICKY BOTTOM QUICK ACTION DOCK */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0a1128]/95 backdrop-blur-md border-t border-[#1e2d5a]/80 px-2 py-2 flex items-center justify-around shadow-[0_-10px_35px_rgba(0,0,0,0.8)]">
        
        {/* Layer Toggle Action */}
        <button
          onClick={() => {
            const layers: ('regional' | 'nasional' | 'internasional')[] = ['regional', 'nasional', 'internasional'];
            const nextIdx = (layers.indexOf(activeLayer) + 1) % layers.length;
            const nextLayer = layers[nextIdx];
            setActiveLayer(nextLayer);
            if (nextLayer === 'regional') {
              setSelectedProvince('Jawa Barat');
              setSelectedCity('Bandung');
              setSelectedElementId('reg-bandung');
            } else if (nextLayer === 'nasional') {
              setSelectedProvince('Jawa Barat');
              setSelectedElementId('nas-jabar');
            } else {
              setSelectedCountry('Indonesia');
              setSelectedElementId('int-indonesia');
            }
            setApiFeedback(`Layer: ${nextLayer.toUpperCase()}`);
            setTimeout(() => setApiFeedback(null), 1500);
          }}
          className="flex flex-col items-center justify-center flex-1 py-1 text-slate-400 active:text-[#3aafa9] transition"
        >
          <Layers className="h-4 w-4 text-[#3aafa9]" />
          <span className="text-[8px] font-black uppercase mt-1 tracking-tight">Layer</span>
        </button>

        {/* Time Travel Year Toggle Action */}
        <button
          onClick={() => {
            const nextYear = timePeriod === 2026 ? 2020 : timePeriod + 1;
            setTimePeriod(nextYear);
            setApiFeedback(`Year: ${nextYear}`);
            setTimeout(() => setApiFeedback(null), 1500);
          }}
          className="flex flex-col items-center justify-center flex-1 py-1 text-slate-400 active:text-amber-400 transition"
        >
          <Clock className="h-4 w-4 text-amber-400" />
          <span className="text-[8px] font-black uppercase mt-1 tracking-tight">{timePeriod}</span>
        </button>

        {/* Theme Changer Action */}
        <button
          onClick={() => {
            const themes: ('vector' | 'satellite' | 'heatmap' | '3d')[] = ['vector', 'satellite', 'heatmap', '3d'];
            const nextIdx = (themes.indexOf(mapTheme) + 1) % themes.length;
            setMapTheme(themes[nextIdx]);
            setApiFeedback(`Theme: ${themes[nextIdx].toUpperCase()}`);
            setTimeout(() => setApiFeedback(null), 1500);
          }}
          className="flex flex-col items-center justify-center flex-1 py-1 text-slate-400 active:text-emerald-400 transition"
        >
          <Map className="h-4 w-4 text-emerald-400" />
          <span className="text-[8px] font-black uppercase mt-1 tracking-tight">{mapTheme}</span>
        </button>

        {/* Enterprise Geo Workspace Action */}
        <button
          onClick={() => {
            setIsWorkspaceMode(!isWorkspaceMode);
            setApiFeedback(isWorkspaceMode ? "Workspace Off" : "Workspace On");
            setTimeout(() => setApiFeedback(null), 1500);
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition ${
            isWorkspaceMode ? 'text-pink-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Briefcase className={`h-4 w-4 ${isWorkspaceMode ? 'text-pink-500 animate-bounce' : 'text-slate-400'}`} />
          <span className="text-[8px] font-black uppercase mt-1 tracking-tight">Workspc</span>
        </button>

        {/* More Drawer Action Trigger */}
        <button
          onClick={() => setIsMobilePanelOpen(true)}
          className="flex flex-col items-center justify-center flex-1 py-1 text-[#3aafa9] font-black uppercase animate-pulse"
        >
          <div className="bg-[#2B7A78]/20 px-2 py-1 rounded-lg border border-[#2B7A78]/30 flex flex-col items-center justify-center">
            <Sliders className="h-4 w-4 text-[#3aafa9]" />
            <span className="text-[8px] font-black uppercase mt-0.5 tracking-tight text-white">⚡ Panel</span>
          </div>
        </button>

      </div>

      {/* MOBILE QUICK PANEL DRAWERSLIDE-UP SHEET */}
      <AnimatePresence>
        {isMobilePanelOpen && (
          <div className="fixed inset-0 z-50 md:hidden bg-black/75 backdrop-blur-sm flex flex-col justify-end">
            {/* Click outside target */}
            <div className="flex-1" onClick={() => setIsMobilePanelOpen(false)} />

            {/* Panel Card */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="bg-[#0e1730] border-t-2 border-[#2b7a78] rounded-t-3xl p-5 space-y-4 max-h-[85vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#1e2d5a] pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-[#2B7A78]/20 rounded-lg text-[#3aafa9]">
                    <Sliders className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-display font-black text-white uppercase tracking-wider">
                      Mobile Quick Action operating system
                    </h3>
                    <p className="text-[10px] text-slate-400 font-mono">
                      Real-time triggers for {activeDetails.name}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobilePanelOpen(false)}
                  className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Instant feedback notification inside drawer */}
              {apiFeedback && (
                <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-mono text-center animate-bounce">
                  ⚡ {apiFeedback}
                </div>
              )}

              {/* Quick Actions List Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                
                {/* Action A: Weather station update */}
                <button
                  onClick={() => {
                    setApiFeedback("Refreshing weather telemetry sensors...");
                    setTimeout(() => {
                      setApiFeedback("Sensors calibrated & online!");
                      setTimeout(() => setApiFeedback(null), 1500);
                    }, 1000);
                  }}
                  className="p-3 bg-[#111a36] border border-[#1e2d5a] hover:border-[#2b7a78] rounded-2xl text-left space-y-1.5 transition"
                >
                  <Cloud className="h-5 w-5 text-sky-400" />
                  <div className="text-xs font-bold text-white uppercase tracking-tight">Weather Refresh</div>
                  <p className="text-[9px] text-slate-400 leading-normal">
                    Pindai ulang sensor curah hujan, suhu udara, &amp; AQI daerah Jabar.
                  </p>
                </button>

                {/* Action B: Run AI Diagnostik */}
                <button
                  onClick={() => {
                    setApiFeedback("Running deep geospatial AI analysis...");
                    setIsRefreshing(true);
                    setTimeout(() => {
                      setIsRefreshing(false);
                      setApiFeedback("AI Diagnostic complete! Accuracy optimal.");
                      setTimeout(() => setApiFeedback(null), 1500);
                    }, 1800);
                  }}
                  className="p-3 bg-[#111a36] border border-[#1e2d5a] hover:border-[#2b7a78] rounded-2xl text-left space-y-1.5 transition"
                >
                  <Sparkles className="h-5 w-5 text-amber-400 animate-spin" />
                  <div className="text-xs font-bold text-white uppercase tracking-tight">AI Diagnostics</div>
                  <p className="text-[9px] text-slate-400 leading-normal">
                    Jalankan pemindaian peta kluster demografis secara mendalam.
                  </p>
                </button>

                {/* Action C: Next Video sponsor campaign */}
                <button
                  onClick={() => {
                    setActiveAdIndex((prev) => (prev + 1) % mockAds.length);
                    setIsPlayingAd(true);
                    setApiFeedback(`Sponsor: ${mockAds[(activeAdIndex + 1) % mockAds.length].sponsor}`);
                    setTimeout(() => setApiFeedback(null), 1500);
                  }}
                  className="p-3 bg-[#111a36] border border-[#1e2d5a] hover:border-pink-500/40 rounded-2xl text-left space-y-1.5 transition"
                >
                  <Tv className="h-5 w-5 text-pink-500 animate-pulse" />
                  <div className="text-xs font-bold text-white uppercase tracking-tight">Next Sponsor Ad</div>
                  <p className="text-[9px] text-slate-400 leading-normal">
                    Putar video sponsor kampanye pembangunan berkelanjutan berikutnya.
                  </p>
                </button>

                {/* Action D: Unmute/Mute sponsor video */}
                <button
                  onClick={() => {
                    setIsMutedAd(!isMutedAd);
                    setApiFeedback(isMutedAd ? "Ad Audio Unmuted!" : "Ad Audio Muted");
                    setTimeout(() => setApiFeedback(null), 1500);
                  }}
                  className="p-3 bg-[#111a36] border border-[#1e2d5a] hover:border-violet-500/40 rounded-2xl text-left space-y-1.5 transition"
                >
                  {isMutedAd ? <VolumeX className="h-5 w-5 text-rose-400" /> : <Volume2 className="h-5 w-5 text-emerald-400" />}
                  <div className="text-xs font-bold text-white uppercase tracking-tight">Ad Volume Toggle</div>
                  <p className="text-[9px] text-slate-400 leading-normal">
                    Aktifkan/nonaktifkan audio latar kampanye spasial regional.
                  </p>
                </button>

                {/* Action E: Generate PDF Workspace report */}
                <button
                  onClick={() => {
                    setApiFeedback("Compiling PDF Audit Report...");
                    setTimeout(() => {
                      setApiFeedback("PDF Report downloaded to mobile!");
                      setTimeout(() => setApiFeedback(null), 1500);
                    }, 1200);
                  }}
                  className="p-3 bg-[#111a36] border border-[#1e2d5a] hover:border-emerald-500/40 rounded-2xl text-left space-y-1.5 transition col-span-2"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-[#3aafa9]" />
                    <div>
                      <div className="text-xs font-bold text-white uppercase tracking-tight">Export PDF Report</div>
                      <p className="text-[9px] text-slate-400 leading-normal mt-0.5">
                        Download berkas analisis demografi komprehensif format PDF untuk {activeDetails.name}.
                      </p>
                    </div>
                  </div>
                </button>

              </div>

              {/* Footer and Info */}
              <div className="pt-2 text-center text-[10px] text-slate-500 font-mono">
                GeoOS Operating System Mobile Navigation &bull; v4.2 Pipeline
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
