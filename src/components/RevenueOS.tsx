import React, { useState, useEffect } from 'react';
import { 
  Briefcase, TrendingUp, Sparkles, RefreshCw, Check, X, ShieldAlert, DollarSign, 
  Percent, Calendar, FileText, Users, PlusCircle, Filter, BarChart2, Layers, 
  Trash2, ShieldCheck, HelpCircle, Activity, CreditCard, ArrowUpRight, Zap, Bell, 
  ListOrdered, Plus, Download, Send, CheckSquare, Clock, Search, AlertCircle,
  Award, BookOpen, Cpu, Globe, ShoppingBag, Target, Database, MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

// Internal types for RevenueOS
interface Invoice {
  id: string;
  client: string;
  type: 'Advertising' | 'Subscription' | 'API Gateway' | 'Sponsorship';
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
}

interface ApprovalRequest {
  id: string;
  requester: string;
  department: string;
  purpose: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

interface PartnerCommission {
  id: string;
  partnerName: string;
  clicks: number;
  conversions: number;
  commissionRate: number; // %
  payoutAmount: number; // IDR
  status: 'paid' | 'pending';
}

// 100 Monetization Potential Ecosystem Data Structures
export interface MonetizationItem {
  id: number;
  name: string;
  desc: string;
  category: string;
  defaultPrice: number; // IDR
  defaultVolume: number; // units per month
  metricLabel: string;
}

export const REVENUE_CATEGORIES = [
  { id: 'adv', name: 'Advertising', label: '1. ADVERTISING', color: '#3b82f6', textColor: 'text-blue-400', borderColor: 'border-blue-500/20', bgLight: 'bg-blue-500/10', icon: 'Briefcase' },
  { id: 'mem', name: 'Membership', label: '2. MEMBERSHIP & SUBSCRIPTION', color: '#10b981', textColor: 'text-emerald-400', borderColor: 'border-emerald-500/20', bgLight: 'bg-emerald-500/10', icon: 'Users' },
  { id: 'dir', name: 'Directory', label: '3. DIRECTORY MONETIZATION', color: '#06b6d4', textColor: 'text-cyan-400', borderColor: 'border-cyan-500/20', bgLight: 'bg-cyan-500/10', icon: 'MapPin' },
  { id: 'data', name: 'Data & Analytics', label: '4. DATA & ANALYTICS INTELLIGENCE', color: '#f59e0b', textColor: 'text-amber-400', borderColor: 'border-amber-500/20', bgLight: 'bg-amber-500/10', icon: 'TrendingUp' },
  { id: 'api', name: 'API & Dev', label: '5. API & DEVELOPER SERVICES', color: '#8b5cf6', textColor: 'text-purple-400', borderColor: 'border-purple-500/20', bgLight: 'bg-purple-500/10', icon: 'Database' },
  { id: 'ai', name: 'AI Services', label: '6. AI SERVICES', color: '#ec4899', textColor: 'text-pink-400', borderColor: 'border-pink-500/20', bgLight: 'bg-pink-500/10', icon: 'Cpu' },
  { id: 'content', name: 'Content Services', label: '7. CONTENT & MEDIA SERVICES', color: '#14b8a6', textColor: 'text-teal-400', borderColor: 'border-teal-500/20', bgLight: 'bg-teal-500/10', icon: 'FileText' },
  { id: 'aff', name: 'Affiliate', label: '8. AFFILIATE & COMMERCE', color: '#f97316', textColor: 'text-orange-400', borderColor: 'border-orange-500/20', bgLight: 'bg-orange-500/10', icon: 'Percent' },
  { id: 'ent', name: 'Enterprise', label: '9. ENTERPRISE SOLUTIONS', color: '#6366f1', textColor: 'text-indigo-400', borderColor: 'border-indigo-500/20', bgLight: 'bg-indigo-500/10', icon: 'Layers' },
  { id: 'mkt', name: 'Marketplace', label: '10. MARKETPLACE & PLATFORM', color: '#a855f7', textColor: 'text-violet-400', borderColor: 'border-violet-500/20', bgLight: 'bg-violet-500/10', icon: 'ShoppingBag' },
  { id: 'edu', name: 'Education & Event', label: '11. EDUCATION & EVENT', color: '#eab308', textColor: 'text-yellow-400', borderColor: 'border-yellow-500/20', bgLight: 'bg-yellow-500/10', icon: 'Award' },
  { id: 'dig', name: 'Digital Products', label: '12. DIGITAL PRODUCTS & E-COMMERCE', color: '#2563eb', textColor: 'text-blue-500', borderColor: 'border-blue-600/20', bgLight: 'bg-blue-600/10', icon: 'BookOpen' },
  { id: 'lic', name: 'Licensing', label: '13. LICENSING & SYNDICATION', color: '#c026d3', textColor: 'text-fuchsia-400', borderColor: 'border-fuchsia-500/20', bgLight: 'bg-fuchsia-500/10', icon: 'Globe' }
];

export const REVENUE_ITEMS: MonetizationItem[] = [
  // 1. ADVERTISING
  { id: 1, name: 'Display Banner Ads', desc: 'Iklan banner CPM/CPC di header, sidebar, footer, dan sela-sela konten berita.', category: 'adv', defaultPrice: 15000, defaultVolume: 10000, metricLabel: 'per 1.000 Impression (CPM)' },
  { id: 2, name: 'Native Advertising', desc: 'Artikel iklan yang menyatu halus dengan feed berita utama (Sponsored Stories).', category: 'adv', defaultPrice: 2500000, defaultVolume: 30, metricLabel: 'per Artikel Terbit' },
  { id: 3, name: 'Sponsored Content', desc: 'Liputan mendalam, ulasan, atau kampanye konten video berbayar bersama brand.', category: 'adv', defaultPrice: 5000000, defaultVolume: 15, metricLabel: 'per Kampanye Konten' },
  { id: 4, name: 'Premium Placement', desc: 'Sponsorship penguasaan penuh halaman beranda (Homepage Takeover) atau kategori khusus.', category: 'adv', defaultPrice: 15000000, defaultVolume: 4, metricLabel: 'per Slot Takeover' },
  { id: 5, name: 'Video Advertising', desc: 'Iklan video yang diputar sebelum, di tengah, atau setelah video dokumenter / live streaming.', category: 'adv', defaultPrice: 35000, defaultVolume: 5000, metricLabel: 'per 1.000 Tayangan Video' },
  { id: 6, name: 'Newsletter Sponsorship', desc: 'Penempatan produk, banner, atau teks promosi di email newsletter harian kepada pelanggan.', category: 'adv', defaultPrice: 1500000, defaultVolume: 20, metricLabel: 'per Email Terkirim' },
  { id: 7, name: 'Push Notification Ads', desc: 'Notifikasi kilat langsung ke browser pengguna yang disponsori oleh brand rekanan.', category: 'adv', defaultPrice: 750000, defaultVolume: 40, metricLabel: 'per Pengiriman Notifikasi' },

  // 2. MEMBERSHIP
  { id: 8, name: 'Premium Membership', desc: 'Akses tanpa iklan, ringkasan AI instan, fitur bookmark, dan notifikasi analisis berita.', category: 'mem', defaultPrice: 49000, defaultVolume: 2500, metricLabel: 'Member Aktif Bulanan' },
  { id: 9, name: 'Corporate Membership', desc: 'Paket langganan multi-akun untuk tim korporat atau instansi pemerintahan di Jawa Barat.', category: 'mem', defaultPrice: 450000, defaultVolume: 150, metricLabel: 'Akun Instansi' },
  { id: 10, name: 'Student Membership', desc: 'Paket langganan hemat khusus pelajar/mahasiswa untuk akses riset jurnalisme data.', category: 'mem', defaultPrice: 19000, defaultVolume: 1000, metricLabel: 'Member Pelajar' },
  { id: 11, name: 'VIP Membership', desc: 'Akses artikel sebelum rilis, undangan eksklusif ke event redaksi, dan laporan intelijen cetak.', category: 'mem', defaultPrice: 99000, defaultVolume: 400, metricLabel: 'VIP Member' },
  { id: 12, name: 'Donasi & Supporter', desc: 'Kontribusi donasi sukarela langsung dari pembaca setia untuk mendukung jurnalisme independen.', category: 'mem', defaultPrice: 50000, defaultVolume: 300, metricLabel: 'Donatur per Bulan' },

  // 3. DIRECTORY
  { id: 13, name: 'Premium Listing', desc: 'Prioritas listing bisnis, restoran, atau layanan jasa di direktori terverifikasi INFOBOS.', category: 'dir', defaultPrice: 150000, defaultVolume: 400, metricLabel: 'Listing Aktif' },
  { id: 14, name: 'Verified Badge', desc: 'Lencana verifikasi resmi (Centang Hijau) untuk membuktikan kredibilitas profil bisnis.', category: 'dir', defaultPrice: 250000, defaultVolume: 200, metricLabel: 'Badge Diterbitkan' },
  { id: 15, name: 'Featured Listing', desc: 'Penempatan unggulan di carousel bar atas atau beranda utama kategori direktori.', category: 'dir', defaultPrice: 500000, defaultVolume: 80, metricLabel: 'Featured Slot' },
  { id: 16, name: 'Category Sponsor', desc: 'Hak sponsor tunggal untuk kategori direktori tertentu (misal: Wisata Bandung, Kuliner).', category: 'dir', defaultPrice: 3000000, defaultVolume: 10, metricLabel: 'Kategori Disponsori' },
  { id: 17, name: 'Top Position Search', desc: 'Penempatan otomatis paling atas pada hasil pencarian direktori berbasis kata kunci.', category: 'dir', defaultPrice: 400000, defaultVolume: 120, metricLabel: 'Pencarian Teratas' },
  { id: 18, name: 'Multi Location Listing', desc: 'Paket listing bisnis waralaba dengan banyak cabang di berbagai wilayah regional.', category: 'dir', defaultPrice: 1200000, defaultVolume: 25, metricLabel: 'Paket Multi-Cabang' },

  // 4. DATA & ANALYTICS
  { id: 19, name: 'Trend Analytics', desc: 'Dashboard analisis tren pemberitaan sosial media dan pencarian terhangat regional.', category: 'data', defaultPrice: 1500000, defaultVolume: 45, metricLabel: 'Lisensi Bulanan' },
  { id: 20, name: 'Sentiment Analytics', desc: 'Layanan analisis sentimen publik terhadap tokoh publik, brand, atau regulasi daerah.', category: 'data', defaultPrice: 3000000, defaultVolume: 20, metricLabel: 'Laporan Analisis' },
  { id: 21, name: 'Media Monitoring', desc: 'Pelacakan real-time sebutan brand di berbagai portal berita online nasional dan daerah.', category: 'data', defaultPrice: 2500000, defaultVolume: 30, metricLabel: 'Brand Terpantau' },
  { id: 22, name: 'Competitor Monitor', desc: 'Perbandingan share of voice, publikasi, dan performa PR kompetitor di media.', category: 'data', defaultPrice: 2000000, defaultVolume: 25, metricLabel: 'Klien Monitor' },
  { id: 23, name: 'Industry Intelligence', desc: 'Riset tren pasar berkala untuk sektor industri manufaktur, properti, dan retail Jabar.', category: 'data', defaultPrice: 5000000, defaultVolume: 12, metricLabel: 'Laporan Terjual' },
  { id: 24, name: 'Public Opinion Dashboard', desc: 'Platform jajak pendapat kilat (polling) terintegrasi untuk menangkap suara warga.', category: 'data', defaultPrice: 12000000, defaultVolume: 5, metricLabel: 'Proyek Dashboard' },
  { id: 25, name: 'Regional Intelligence', desc: 'Peta potensi investasi, infrastruktur, dan perkembangan ekonomi daerah 27 Kab/Kota.', category: 'data', defaultPrice: 7500000, defaultVolume: 8, metricLabel: 'Lisensi Data Pemda' },

  // 5. API SERVICES
  { id: 26, name: 'News API Access', desc: 'Integrasi umpan berita real-time dan arsip INFOBOS ke aplikasi pihak ketiga.', category: 'api', defaultPrice: 850000, defaultVolume: 60, metricLabel: 'Koneksi API Aktif' },
  { id: 27, name: 'Trend API', desc: 'Penyediaan API tren kata kunci dan disinformasi terpopuler untuk riset akademis / siber.', category: 'api', defaultPrice: 1200000, defaultVolume: 35, metricLabel: 'Akses API Tren' },
  { id: 28, name: 'Company API', desc: 'Layanan integrasi data direktori profil perusahaan yang terverifikasi.', category: 'api', defaultPrice: 1500000, defaultVolume: 20, metricLabel: 'Koneksi Profil' },
  { id: 29, name: 'Location API', desc: 'Data geospasial titik rawan bencana, rute alternatif, dan fasilitas umum Jawa Barat.', category: 'api', defaultPrice: 1000000, defaultVolume: 40, metricLabel: 'Akses Geospasial' },
  { id: 30, name: 'Statistics API', desc: 'API agregator data ekonomi makro Jawa Barat seperti inflasi, UMK, dan pertumbuhan pasar.', category: 'api', defaultPrice: 900000, defaultVolume: 30, metricLabel: 'API Statistik' },
  { id: 31, name: 'Search API', desc: 'Mesin pencari berita terindeks cepat berlisensi untuk portal berita mitra.', category: 'api', defaultPrice: 1100000, defaultVolume: 25, metricLabel: 'API Search Engine' },
  { id: 32, name: 'AI Summary API', desc: 'API konverter artikel berita panjang menjadi bullet-point ringkas multibahasa.', category: 'api', defaultPrice: 1800000, defaultVolume: 15, metricLabel: 'Klien API AI' },
  { id: 33, name: 'Webhook & Integration', desc: 'Layanan push data instan setiap ada berita kilat (breaking news) ke Telegram/WhatsApp.', category: 'api', defaultPrice: 500000, defaultVolume: 50, metricLabel: 'Webhook Aktif' },

  // 6. AI SERVICES
  { id: 34, name: 'AI News Summary', desc: 'Fitur ringkasan otomatis untuk memangkas artikel berita menjadi 3 kalimat utama.', category: 'ai', defaultPrice: 20000, defaultVolume: 500, metricLabel: 'Sewa Fitur per User' },
  { id: 35, name: 'AI Translation', desc: 'Terjemahan berita otomatis ke bahasa Sunda, Jawa, Cirebonan, maupun bahasa asing.', category: 'ai', defaultPrice: 15000, defaultVolume: 600, metricLabel: 'Paket Translasi' },
  { id: 36, name: 'AI Content Rewrite', desc: 'Mesin pembantu jurnalis menyusun ulang naskah siaran pers agar sesuai kaidah SEO.', category: 'ai', defaultPrice: 150000, defaultVolume: 120, metricLabel: 'User Lisensi' },
  { id: 37, name: 'AI SEO Assistant', desc: 'Analisis otomatis tag meta, kata kunci, kerapatan teks, dan optimasi on-page.', category: 'ai', defaultPrice: 180000, defaultVolume: 100, metricLabel: 'SEO Scanner' },
  { id: 38, name: 'AI Trend Prediction', desc: 'Algoritma machine learning memperkirakan topik berita yang berpotensi viral.', category: 'ai', defaultPrice: 2500000, defaultVolume: 15, metricLabel: 'Klien Korporat' },
  { id: 39, name: 'AI Keyword Finder', desc: 'Analisis kata kunci lokal berdasar pencarian real-time masyarakat regional.', category: 'ai', defaultPrice: 99000, defaultVolume: 150, metricLabel: 'Pencarian Lisensi' },
  { id: 40, name: 'AI Research Assistant', desc: 'Asisten AI pengumpul dokumen pendukung, aturan hukum, dan data statistik otomatis.', category: 'ai', defaultPrice: 300000, defaultVolume: 80, metricLabel: 'Asisten Riset' },
  { id: 41, name: 'AI Report Generator', desc: 'Sistem pengubah data mentah menjadi draf laporan jurnalistik terstruktur.', category: 'ai', defaultPrice: 500000, defaultVolume: 50, metricLabel: 'Laporan Dibuat' },
  { id: 42, name: 'AI Chatbot for Business', desc: 'Widget chatbot cerdas bersumber data berita tepercaya untuk website bisnis klien.', category: 'ai', defaultPrice: 1200000, defaultVolume: 25, metricLabel: 'Chatbot Aktif' },
  { id: 43, name: 'AI Image & Video Gen', desc: 'Alat bantu kreasi gambar ilustrasi dan video berita pendek berbasis teks cerdas.', category: 'ai', defaultPrice: 400000, defaultVolume: 40, metricLabel: 'Akses Kreator' },

  // 7. CONTENT SERVICES
  { id: 44, name: 'Press Release Distribution', desc: 'Penyebaran rilis pers perusahaan ke jaringan media lokal dan agregator berita.', category: 'content', defaultPrice: 1500000, defaultVolume: 80, metricLabel: 'Rilis Didistribusikan' },
  { id: 45, name: 'Advertorial & Brand Story', desc: 'Penulisan ulasan dan sejarah perjalanan brand yang dikemas bergaya jurnalisme berkelas.', category: 'content', defaultPrice: 3500000, defaultVolume: 40, metricLabel: 'Artikel Brand Story' },
  { id: 46, name: 'Interview & Profile', desc: 'Liputan khusus tanya-jawab mendalam bersama direksi atau tokoh daerah terkemuka.', category: 'content', defaultPrice: 6000000, defaultVolume: 12, metricLabel: 'Sesi Wawancara' },
  { id: 47, name: 'Event Coverage', desc: 'Peliputan langsung di lokasi acara (peluncuran produk, peresmian gedung, seminar).', category: 'content', defaultPrice: 7500000, defaultVolume: 10, metricLabel: 'Acara Diliput' },
  { id: 48, name: 'Live Streaming Service', desc: 'Penyediaan tim produksi penyiaran langsung (multi-kamera) ke kanal digital.', category: 'content', defaultPrice: 10000000, defaultVolume: 6, metricLabel: 'Sesi Streaming' },
  { id: 49, name: 'Podcast Production', desc: 'Penyewaan studio podcast modern INFOBOS sekaligus penyusunan naskah dialog.', category: 'content', defaultPrice: 2500000, defaultVolume: 16, metricLabel: 'Episode Diproduksi' },
  { id: 50, name: 'Video Production', desc: 'Pembuatan video profil perusahaan, dokumenter pendek, atau video iklan komersial.', category: 'content', defaultPrice: 12000000, defaultVolume: 5, metricLabel: 'Proyek Video' },
  { id: 51, name: 'Infographic Studio', desc: 'Pengubahan data rumit klien menjadi infografis visual yang atraktif dan komunikatif.', category: 'content', defaultPrice: 1500000, defaultVolume: 20, metricLabel: 'Desain Infografis' },
  { id: 52, name: 'Photo & Video Library', desc: 'Lisensi hak guna dokumentasi foto sejarah dan lanskap wilayah Jawa Barat.', category: 'content', defaultPrice: 500000, defaultVolume: 50, metricLabel: 'Pembelian Lisensi' },
  { id: 53, name: 'Copywriting Service', desc: 'Penyusunan naskah iklan, jargon, rilis pers, dan artikel SEO teroptimasi.', category: 'content', defaultPrice: 800000, defaultVolume: 30, metricLabel: 'Naskah Copywriting' },

  // 8. AFFILIATE
  { id: 54, name: 'Travel & Ticketing', desc: 'Komisi penjualan tiket kereta cepat, hotel, dan tiket masuk wisata Jawa Barat.', category: 'aff', defaultPrice: 25000, defaultVolume: 1500, metricLabel: 'Tiket Terjual' },
  { id: 55, name: 'E-commerce Affiliate', desc: 'Afiliasi produk kerajinan tangan, fesyen lokal, dan kuliner khas Jawa Barat.', category: 'aff', defaultPrice: 15000, defaultVolume: 3000, metricLabel: 'Transaksi Afiliasi' },
  { id: 56, name: 'Insurance Affiliate', desc: 'Rekomendasi paket asuransi kesehatan, kendaraan, dan proteksi perjalanan regional.', category: 'aff', defaultPrice: 120000, defaultVolume: 150, metricLabel: 'Polis Disetujui' },
  { id: 57, name: 'Fintech & Banking Referral', desc: 'Komisi pendaftaran rekening bank bjb digital atau aplikasi investasi berizin OJK.', category: 'aff', defaultPrice: 75000, defaultVolume: 400, metricLabel: 'Registrasi Baru' },
  { id: 58, name: 'Course & Education Referral', desc: 'Afiliasi pendaftaran kursus kepemimpinan, pemasaran digital, atau jurnalisme.', category: 'aff', defaultPrice: 200000, defaultVolume: 80, metricLabel: 'Peserta Kursus' },
  { id: 59, name: 'Software & Tools Referral', desc: 'Rekomendasi berlangganan software akuntansi, kasir (POS), dan HR untuk UMKM.', category: 'aff', defaultPrice: 150000, defaultVolume: 100, metricLabel: 'Lisensi Software' },
  { id: 60, name: 'Domain & Hosting Referral', desc: 'Rekomendasi sewa infrastruktur server web, domain lokal (.id) untuk bisnis baru.', category: 'aff', defaultPrice: 80000, defaultVolume: 120, metricLabel: 'Server Diaktifkan' },
  { id: 61, name: 'Subscription Affiliate', desc: 'Umpan balik komisi dari keanggotaan premium korporasi media global mitra.', category: 'aff', defaultPrice: 50000, defaultVolume: 150, metricLabel: 'Afiliasi Berlangganan' },
  { id: 62, name: 'Digital Product Referral', desc: 'Komisi penjualan aset digital eksternal, desain kit 3D, serta mockup presentasi.', category: 'aff', defaultPrice: 35000, defaultVolume: 300, metricLabel: 'Item Terjual' },
  { id: 63, name: 'Cashback & Promo Merchant', desc: 'Bagi hasil dari penyediaan kode voucher promo belanja merchant kuliner Jabar.', category: 'aff', defaultPrice: 10000, defaultVolume: 2500, metricLabel: 'Kupon Digunakan' },

  // 9. ENTERPRISE
  { id: 64, name: 'White Label Portal', desc: 'Pembuatan portal berita internal custom dengan infrastruktur INFOBOS.', category: 'ent', defaultPrice: 25000000, defaultVolume: 2, metricLabel: 'Lisensi Portal' },
  { id: 65, name: 'Corporate Newsroom', desc: 'Sistem manajemen informasi publik dan penyiaran rilis pers internal korporat.', category: 'ent', defaultPrice: 15000000, defaultVolume: 4, metricLabel: 'Newsroom Aktif' },
  { id: 66, name: 'Internal Communication Portal', desc: 'Infrastruktur komunikasi dan rujukan berita internal serikat pekerja / BUMN.', category: 'ent', defaultPrice: 8000000, defaultVolume: 6, metricLabel: 'Sistem Terpasang' },
  { id: 67, name: 'Government Dashboard', desc: 'Dashboard ringkasan aspirasi masyarakat, isu daerah, dan keluhan layanan publik.', category: 'ent', defaultPrice: 35000000, defaultVolume: 1, metricLabel: 'Lisensi Pemda' },
  { id: 68, name: 'Tourism Dashboard', desc: 'Sistem analitik arus kunjungan, ulasan objek wisata, dan tren pelancong regional.', category: 'ent', defaultPrice: 12000000, defaultVolume: 3, metricLabel: 'Dashboard Wisata' },
  { id: 69, name: 'Education Dashboard', desc: 'Pemetaan riset kampus, beasiswa, opini akademis, dan diseminasi berita ilmiah.', category: 'ent', defaultPrice: 6000000, defaultVolume: 5, metricLabel: 'Klien Universitas' },
  { id: 70, name: 'Smart City Dashboard', desc: 'Integrasi IoT data cuaca, CCTV lalu lintas, dan diseminasi peringatan darurat siber.', category: 'ent', defaultPrice: 45000000, defaultVolume: 1, metricLabel: 'Sistem Smart City' },
  { id: 71, name: 'Industry Dashboard', desc: 'Laporan sentimen dan dashboard industri manufaktur di wilayah Karawang & Bekasi.', category: 'ent', defaultPrice: 10000000, defaultVolume: 4, metricLabel: 'Klien Pabrik' },
  { id: 72, name: 'Custom Report Service', desc: 'Penyusunan riset laporan khusus (ad-hoc) berdasarkan permintaan rahasia investor.', category: 'ent', defaultPrice: 15000000, defaultVolume: 3, metricLabel: 'Laporan Riset' },
  { id: 73, name: 'Dedicated Account Manager', desc: 'Pendampingan konsultasi PR, publikasi media siber, dan monitoring krisis 24/7.', category: 'ent', defaultPrice: 5000000, defaultVolume: 10, metricLabel: 'Klien Retainer' },

  // 10. MARKETPLACE
  { id: 74, name: 'Press Release Marketplace', desc: 'Portal jual beli slot penayangan rilis pers di puluhan media terafiliasi.', category: 'mkt', defaultPrice: 850000, defaultVolume: 150, metricLabel: 'Transaksi Slot' },
  { id: 75, name: 'Journalist Marketplace', desc: 'Hub pencarian jurnalis lepas (freelancer) dan fotografer dokumenter bersertifikasi.', category: 'mkt', defaultPrice: 400000, defaultVolume: 80, metricLabel: 'Kontrak Kerja' },
  { id: 76, name: 'Content Marketplace', desc: 'Platform transaksi naskah opini, infografis, dan artikel SEO yang siap pakai.', category: 'mkt', defaultPrice: 350000, defaultVolume: 120, metricLabel: 'Konten Terjual' },
  { id: 77, name: 'Photo & Video Marketplace', desc: 'Pasar cuplikan video eksklusif (footage) drone, bencana alam, atau ikonik Jawa Barat.', category: 'mkt', defaultPrice: 750000, defaultVolume: 60, metricLabel: 'Foto/Video Terjual' },
  { id: 78, name: 'Infographic Marketplace', desc: 'Desain template presentasi data, bagan alur, dan aset visual siap edit.', category: 'mkt', defaultPrice: 150000, defaultVolume: 200, metricLabel: 'Aset Visual' },
  { id: 79, name: 'Data Marketplace', desc: 'Gudang jual beli data terstruktur, survei pasar, dan direktori kontak legal.', category: 'mkt', defaultPrice: 2500000, defaultVolume: 30, metricLabel: 'Dataset Diunduh' },
  { id: 80, name: 'Research Marketplace', desc: 'Riset akademik, jurnal pembangunan daerah, dan riset sosiologi masyarakat.', category: 'mkt', defaultPrice: 1200000, defaultVolume: 40, metricLabel: 'Riset Terbuka' },
  { id: 81, name: 'Event & Ticket Marketplace', desc: 'Sistem penjualan tiket seminar, pameran, konser, dan workshop lokal.', category: 'mkt', defaultPrice: 15000, defaultVolume: 2000, metricLabel: 'Tiket Diproses' },
  { id: 82, name: 'Professional Service Marketplace', desc: 'Penyedia jasa editing video berita, sulih suara (voiceover AI), dan moderator.', category: 'mkt', defaultPrice: 500000, defaultVolume: 50, metricLabel: 'Pemesanan Jasa' },
  { id: 83, name: 'Digital Product Store', desc: 'Etalase produk internal INFOBOS (merchandise kaos jurnalis, buku cetak, dsb).', category: 'mkt', defaultPrice: 120000, defaultVolume: 150, metricLabel: 'Produk Terkirim' },

  // 11. EDUCATION & EVENT
  { id: 84, name: 'Webinar', desc: 'Penyelenggaraan diskusi panel online bertopik tata ruang kota, investasi, atau AI.', category: 'edu', defaultPrice: 75000, defaultVolume: 500, metricLabel: 'Tiket Webinar' },
  { id: 85, name: 'Online Training', desc: 'Kelas belajar mandiri jurnalisme warga (citizen journalism) bersertifikat.', category: 'edu', defaultPrice: 299000, defaultVolume: 150, metricLabel: 'Peserta Aktif' },
  { id: 86, name: 'Certification Program', desc: 'Ujian sertifikasi kemampuan penulisan konten SEO dan public relations.', category: 'edu', defaultPrice: 750000, defaultVolume: 60, metricLabel: 'Peserta Ujian' },
  { id: 87, name: 'Workshop', desc: 'Pelatihan tatap muka langsung (offline) penulisan investigasi dan analisis data.', category: 'edu', defaultPrice: 1200000, defaultVolume: 35, metricLabel: 'Peserta Workshop' },
  { id: 88, name: 'Conference', desc: 'Penyelenggaraan temu tahunan pelaku industri kreatif dan pemimpin redaksi siber.', category: 'edu', defaultPrice: 2500000, defaultVolume: 15, metricLabel: 'Tiket Konferensi' },
  { id: 89, name: 'Seminar', desc: 'Seminar umum bedah buku jurnalisme dan tren intelijen siber terbuka.', category: 'edu', defaultPrice: 150000, defaultVolume: 200, metricLabel: 'Peserta Seminar' },
  { id: 90, name: 'Industry Report Sale', desc: 'Penjualan bundel riset tahunan arah industri startup digital di Jawa Barat.', category: 'edu', defaultPrice: 3500000, defaultVolume: 10, metricLabel: 'Bundel Terjual' },
  { id: 91, name: 'Membership Community', desc: 'Grup bimbingan tertutup karir media, akses info lowongan kerja, dan mentoring.', category: 'edu', defaultPrice: 199000, defaultVolume: 120, metricLabel: 'Anggota Baru' },
  { id: 92, name: 'Bootcamp', desc: 'Bootcamp intensif 1 bulan pemrograman AI dan pemetaan data spasial siber.', category: 'edu', defaultPrice: 4500000, defaultVolume: 15, metricLabel: 'Peserta Bootcamp' },
  { id: 93, name: 'Mentorship Program', desc: 'Program konsultasi private 1-on-1 dengan dewan redaksi utama INFOBOS.', category: 'edu', defaultPrice: 2000000, defaultVolume: 8, metricLabel: 'Mentee Terdaftar' },

  // 12. DIGITAL PRODUCTS
  { id: 94, name: 'E-book Jurnalisme', desc: 'Buku elektronik pedoman jurnalisme investigasi, cek fakta, dan penulisan berita.', category: 'dig', defaultPrice: 75000, defaultVolume: 250, metricLabel: 'E-book Terunduh' },
  { id: 95, name: 'Template & Toolkit', desc: 'Bundel spreadsheet perencanaan anggaran berita, rilis pers, dan draf draf hukum.', category: 'dig', defaultPrice: 125000, defaultVolume: 150, metricLabel: 'Bundel Terjual' },
  { id: 96, name: 'Software & Plugin', desc: 'Plugin WordPress pemantau disinformasi dan rilis pers otomatis ke multi-website.', category: 'dig', defaultPrice: 450000, defaultVolume: 40, metricLabel: 'Instalasi Aktif' },
  { id: 97, name: 'Theme & Design', desc: 'Desain template website portal berita responsif, modern, dan ramah SEO.', category: 'dig', defaultPrice: 650000, defaultVolume: 30, metricLabel: 'Lisensi Tema' },
  { id: 98, name: 'Stock Media assets', desc: 'Aset ikon, foto panorama, background kota, serta suara efek otentik.', category: 'dig', defaultPrice: 50000, defaultVolume: 400, metricLabel: 'Item Terjual' },
  { id: 99, name: 'Merchandise Resmi', desc: 'Kaos polo jurnalis, notebook kulit timbul, topi pet petualang, botol termos.', category: 'dig', defaultPrice: 150000, defaultVolume: 100, metricLabel: 'Barang Terkirim' },
  { id: 100, name: 'Gift Card & Voucher', desc: 'Voucher langganan premium digital yang dikemas cantik untuk kado korporat.', category: 'dig', defaultPrice: 100000, defaultVolume: 80, metricLabel: 'Voucher Terbit' },

  // 13. LICENSING
  { id: 101, name: 'Content Syndication', desc: 'Hak reproduksi dan distribusi berita orisinal INFOBOS di koran atau media cetak.', category: 'lic', defaultPrice: 3500000, defaultVolume: 20, metricLabel: 'Sindikasi Aktif' },
  { id: 102, name: 'News Syndication', desc: 'Lisensi sindikasi konten langsung untuk agregator internasional atau portal eksternal.', category: 'lic', defaultPrice: 5000000, defaultVolume: 12, metricLabel: 'Kontrak Lisensi' },
  { id: 103, name: 'Photo Licensing', desc: 'Hak guna foto liputan eksklusif bencana alam atau dokumentasi perkotaan Jabar.', category: 'lic', defaultPrice: 400000, defaultVolume: 80, metricLabel: 'Lisensi Foto' },
  { id: 104, name: 'Video Licensing', desc: 'Hak guna cuplikan liputan eksklusif, dokumenter, atau rekaman wawancara penting.', category: 'lic', defaultPrice: 1500000, defaultVolume: 30, metricLabel: 'Lisensi Video' },
  { id: 105, name: 'Infographic Licensing', desc: 'Hak mencetak ulang atau menampilkan diagram data visual INFOBOS di majalah korporat.', category: 'lic', defaultPrice: 800000, defaultVolume: 40, metricLabel: 'Lisensi Infografis' },
  { id: 106, name: 'Data Licensing', desc: 'Hak akses basis data riset primer dan daftar koordinat satelit geospasial.', category: 'lic', defaultPrice: 10000000, defaultVolume: 8, metricLabel: 'Koneksi Lisensi' },
  { id: 107, name: 'Research Licensing', desc: 'Lisensi kepustakaan hasil analisis perilaku sosial ekonomi penduduk daerah Jabar.', category: 'lic', defaultPrice: 7500000, defaultVolume: 10, metricLabel: 'Riset Berlisensi' },
  { id: 108, name: 'RSS Licensing', desc: 'Akses umpan balik RSS penuh tanpa enkripsi/iklan untuk kebutuhan analisis mesin.', category: 'lic', defaultPrice: 1200000, defaultVolume: 25, metricLabel: 'Sindikasi RSS' },
  { id: 109, name: 'API Licensing', desc: 'Lisensi OEM API mesin analisis sentimen dan direktori untuk server milik klien.', category: 'lic', defaultPrice: 15000000, defaultVolume: 4, metricLabel: 'Lisensi Server' },
  { id: 110, name: 'White Label Licensing', desc: 'Penyewaan penuh sistem manajemen berita (CMS) komplit siap pakai ke korporat.', category: 'lic', defaultPrice: 30000000, defaultVolume: 2, metricLabel: 'Kontrak White Label' }
];

interface RevenueOSProps {
  escrowTransactions?: any[];
  setEscrowTransactions?: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function RevenueOS({
  escrowTransactions: externalEscrowTransactions,
  setEscrowTransactions: externalSetEscrowTransactions
}: RevenueOSProps = {}) {
  const [activeTab, setActiveTab] = useState<'ecosystem' | 'analytics' | 'invoices' | 'approvals' | 'partners' | 'budget' | 'escrow'>('ecosystem');
  const [localEscrowTransactions, setLocalEscrowTransactions] = useState<any[]>([
    { id: 'esc-1', itemTitle: 'Alat Ekstraksi Minyak Atsiri', amount: 22500000, status: 'DITAHAN', seller: 'Atsiri Tech Indonesia', date: '30 Juni 2026' },
    { id: 'esc-2', itemTitle: 'Sewa Drone Pertanian DJI Agras T40 - PT Tani Maju', amount: 4500000, seller: 'Cirebon Drone Rental', date: '15/07/2026', status: 'DITAHAN' },
    { id: 'esc-3', itemTitle: 'Pembelian Dataset Spasial Tata Guna Lahan Bandung', amount: 18200000, seller: 'Geo-Spasial Analytics', date: '14/07/2026', status: 'DIKIRIM' }
  ]);

  const escrowTransactions = externalEscrowTransactions || localEscrowTransactions;
  const setEscrowTransactions = externalSetEscrowTransactions || setLocalEscrowTransactions;
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Core Financial KPI States
  const [kpis, setKpis] = useState({
    revenue: 412500000, // Rp 412.5 Juta
    mrr: 125000000,
    arr: 1500000000,
    profit: 185000000,
    expenses: 227500000,
    cac: 350000, // Rp 350rb per user
    ltv: 2400000, // Rp 2.4jt
    roi: '184%',
  });

  // 2. Client Invoices List
  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: 'INV-2026-001', client: 'PT Kereta Cepat Indonesia', type: 'Advertising', amount: 45000000, status: 'paid', dueDate: '2026-06-20' },
    { id: 'INV-2026-002', client: 'Dinas Pariwisata Jabar', type: 'Sponsorship', amount: 25000000, status: 'paid', dueDate: '2026-06-25' },
    { id: 'INV-2026-003', client: 'Bank Mandiri Regional', type: 'Advertising', amount: 75000000, status: 'pending', dueDate: '2026-07-10' },
    { id: 'INV-2026-004', client: 'BJB Digital Center', type: 'Subscription', amount: 15000000, status: 'pending', dueDate: '2026-07-15' },
    { id: 'INV-2026-005', client: 'Developer Hub Startups', type: 'API Gateway', amount: 8500000, status: 'overdue', dueDate: '2026-06-15' },
    { id: 'INV-2026-006', client: 'Gedung Sate Expo Planner', type: 'Sponsorship', amount: 35000000, status: 'pending', dueDate: '2026-07-20' }
  ]);

  // 3. Payout & Expenses Approvals
  const [approvals, setApprovals] = useState<ApprovalRequest[]>([
    { id: 'APP-091', requester: 'Sandiaga (Media Jurnalis)', department: 'Redaksi Lapangan', purpose: 'Pembelian Kit Kamera Drone Liputan Regional', amount: 18500000, status: 'pending', date: '2026-06-28' },
    { id: 'APP-092', requester: 'Indra (Advertiser Ops)', department: 'Pemasaran Iklan', purpose: 'Refund Deposit Berlebih Pengiklan Toko UMKM', amount: 2400000, status: 'pending', date: '2026-06-29' },
    { id: 'APP-093', requester: 'Nanda (IT Framework)', department: 'Sistem Developer', purpose: 'Sewa Lisensi CDN & Cloud Run Cluster Tambahan', amount: 12500000, status: 'approved', date: '2026-06-24' }
  ]);

  // 4. Partner Affiliate Commission List
  const [partnerCommissions, setPartnerCommissions] = useState<PartnerCommission[]>([
    { id: 'PRT-11', partnerName: 'Gozali (Mitra Bandung)', clicks: 1250, conversions: 45, commissionRate: 15, payoutAmount: 2250000, status: 'paid' },
    { id: 'PRT-12', partnerName: 'Ratih (Affiliate Priangan)', clicks: 840, conversions: 28, commissionRate: 10, payoutAmount: 1400000, status: 'pending' },
    { id: 'PRT-13', partnerName: 'Dewi (Agency Cirebon)', clicks: 2100, conversions: 74, commissionRate: 18, payoutAmount: 3700000, status: 'pending' }
  ]);

  // 5. Internal Audit Logs
  const [auditLogs, setAuditLogs] = useState<string[]>([
    '[AUDIT] CFO menyetujui anggaran Cloud Run Server senilai Rp 12.500.000.',
    '[AUDIT] Invoice INV-2026-001 PT Kereta Cepat Indonesia dinyatakan SETTLED via QRIS.',
    '[AUDIT] Admin melakukan update tarif rate-card iklan bersponsor Jabar Tengah.'
  ]);

  // Future Forecasting Simulator states
  const [marketingBudgetMultiplier, setMarketingBudgetMultiplier] = useState(1); // 1x to 5x
  const [expectedRoi, setExpectedRoi] = useState(15); // %

  // 100 Monetization Potential Interactive states
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [ecosystemSearchQuery, setEcosystemSearchQuery] = useState<string>('');
  const [selectedItemId, setSelectedItemId] = useState<number>(1);
  const [customPrice, setCustomPrice] = useState<number>(15000);
  const [customVolume, setCustomVolume] = useState<number>(10000);
  const [selectedPhase, setSelectedPhase] = useState<string>('all');

  useEffect(() => {
    const item = REVENUE_ITEMS.find(it => it.id === selectedItemId);
    if (item) {
      setCustomPrice(item.defaultPrice);
      setCustomVolume(item.defaultVolume);
    }
  }, [selectedItemId]);

  // New Invoice form state
  const [newClient, setNewClient] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newType, setNewType] = useState<'Advertising' | 'Subscription' | 'API Gateway' | 'Sponsorship'>('Advertising');

  // Triggering data flow simulations
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate slow revenue/traffic fluctuations
      setKpis(prev => ({
        ...prev,
        revenue: prev.revenue + Math.floor(Math.random() * 80000 + 10000),
        profit: prev.profit + Math.floor(Math.random() * 40000 + 5000)
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.trim() || !newAmount) return;
    const amountVal = parseFloat(newAmount);
    if (isNaN(amountVal)) return;

    const newInv: Invoice = {
      id: `INV-2026-0${invoices.length + 1}`,
      client: newClient,
      type: newType,
      amount: amountVal,
      status: 'pending',
      dueDate: new Date(Date.now() + 15 * 24 * 3600 * 1000).toISOString().split('T')[0]
    };

    setInvoices([newInv, ...invoices]);
    setAuditLogs([`[AUDIT] Invoice baru ${newInv.id} diterbitkan untuk ${newInv.client} senilai Rp ${amountVal.toLocaleString()}.`, ...auditLogs]);
    setNewClient('');
    setNewAmount('');
  };

  const handleApprovalAction = (id: string, action: 'approve' | 'reject') => {
    setApprovals(approvals.map(app => {
      if (app.id === id) {
        return { ...app, status: action === 'approve' ? 'approved' : 'rejected' };
      }
      return app;
    }));
    setAuditLogs([`[AUDIT] Permohonan dana ${id} dinyatakan ${action.toUpperCase()} oleh CFO.`, ...auditLogs]);
  };

  const handlePayoutCommission = (id: string) => {
    setPartnerCommissions(partnerCommissions.map(p => {
      if (p.id === id) {
        return { ...p, status: 'paid' };
      }
      return p;
    }));
    setAuditLogs([`[AUDIT] Komisi mitra ${id} berhasil dicairkan ke rekening terdaftar.`, ...auditLogs]);
  };

  // Recharts Chart Data (Monetization stream breakdown)
  const revenueDistributionData = [
    { name: 'Iklan (Ads)', value: 165000000 },
    { name: 'Langganan (Subs)', value: 110000000 },
    { name: 'API Dev Hub', value: 45000000 },
    { name: 'Sponsorship', value: 62500000 },
    { name: 'Donasi', value: 30000000 }
  ];

  const COLORS = ['#8b5cf6', '#f97316', '#3b82f6', '#ec4899', '#10b981'];

  // Trend analysis line chart
  const monthlyRevenueTrend = [
    { bulan: 'Jan', Pendapatan: 310, Pengeluaran: 190 },
    { bulan: 'Feb', Pendapatan: 340, Pengeluaran: 210 },
    { bulan: 'Mar', Pendapatan: 380, Pengeluaran: 200 },
    { bulan: 'Apr', Pendapatan: 360, Pengeluaran: 220 },
    { bulan: 'Mei', Pendapatan: 395, Pengeluaran: 215 },
    { bulan: 'Jun', Pendapatan: 412, Pengeluaran: 227 }
  ];

  const getItemPhase = (category: string): string => {
    if (['adv', 'mem', 'dir', 'aff'].includes(category)) return '1';
    if (['data', 'api', 'content', 'mkt'].includes(category)) return '2';
    return '3';
  };

  const filteredEcosystemItems = REVENUE_ITEMS.filter(item => {
    // Category filter
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    
    // Phase filter
    if (selectedPhase !== 'all') {
      const itemPhase = getItemPhase(item.category);
      if (itemPhase !== selectedPhase) return false;
    }
    
    // Search query filter
    if (ecosystemSearchQuery.trim() !== '') {
      const q = ecosystemSearchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.desc.toLowerCase().includes(q);
      const matchCategoryName = REVENUE_CATEGORIES.find(c => c.id === item.category)?.name.toLowerCase().includes(q);
      return matchName || matchDesc || matchCategoryName;
    }
    
    return true;
  });

  return (
    <div className="bg-[#0f0a1c] text-[#d6cce5] min-h-screen py-6 text-left selection:bg-purple-600 selection:text-white" id="revenue-os-workspace">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* TOP COCKPIT BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-purple-500/20 pb-5">
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="bg-purple-500/15 text-purple-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono border border-purple-500/20">
                🛡️ OWNER CONSOLE &amp; SUPER ADMIN ONLY
              </span>
              <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/20 font-mono font-bold px-2 py-0.5 rounded">
                Revenue OS v3.5
              </span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-2 tracking-tight">
              Revenue Command Center
            </h1>
            <p className="text-purple-300/60 text-xs mt-1 max-w-2xl">
              Dashboard operasional korporat internal INFOBOS. Lacak profitabilitas (MRR/ARR), kelola invoice iklan, verifikasi pencairan dana komisi mitra, evaluasi CAPEX/OPEX, dan setujui anggaran persetujuan kas.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex gap-2">
            <button
              onClick={handleRefresh}
              className="bg-purple-900/40 border border-purple-500/30 text-purple-300 hover:text-white hover:bg-purple-900/60 px-3 py-2 rounded-xl text-xs font-bold shadow-sm transition flex items-center gap-1.5"
              style={{ minHeight: '40px' }}
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Sinkronisasi Kas</span>
            </button>
          </div>
        </div>

        {/* METRICS GRID - HIGH LEVEL OPERATIONAL CORPORATE STATISTICS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {[
            { label: 'TOTAL REVENUE', value: `Rp ${(kpis.revenue/1000000).toFixed(1)}M`, change: '+8.4% MoM', theme: 'purple' },
            { label: 'MRR (ESTIMATED)', value: `Rp ${(kpis.mrr/1000000).toFixed(1)}M`, change: '+5.2% MoM', theme: 'orange' },
            { label: 'ARR PROJECTION', value: `Rp ${(kpis.arr/1000000).toFixed(1)}M`, change: 'v3.5 Target Met', theme: 'blue' },
            { label: 'OPERATIONAL EXP', value: `Rp ${(kpis.expenses/1000000).toFixed(1)}M`, change: '75% Payouts', theme: 'purple' },
            { label: 'NET PROFIT', value: `Rp ${(kpis.profit/1000000).toFixed(1)}M`, change: '44.8% Margin', theme: 'orange' },
            { label: 'LTV ESTIMATE', value: `Rp ${(kpis.ltv/1000).toLocaleString()}k`, change: 'Premium User', theme: 'blue' },
            { label: 'CAC COST', value: `Rp ${(kpis.cac/1000).toLocaleString()}k`, change: 'Optimized', theme: 'purple' },
            { label: 'ROI MARKETING', value: kpis.roi, change: '15% Budget Yield', theme: 'orange' },
          ].map((item, idx) => (
            <div 
              key={idx}
              className="bg-[#17102e] border border-purple-500/10 rounded-xl p-3 text-center transition hover:border-purple-500/30"
            >
              <span className="text-[8px] font-bold text-purple-400 block tracking-wider font-mono uppercase">{item.label}</span>
              <span className="text-sm font-black text-white block mt-1 font-mono">{item.value}</span>
              <span className="text-[8px] font-mono font-bold block text-emerald-400 mt-0.5">
                {item.change}
              </span>
            </div>
          ))}
        </div>

        {/* CORE WORKSPACE MENUS (TABS) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-purple-500/10">
          {[
            { id: 'ecosystem', label: '💎 100 Potensi Monetisasi' },
            { id: 'analytics', label: '📊 Revenue Analytics' },
            { id: 'invoices', label: '📄 Invoice & Billing Manager' },
            { id: 'approvals', label: '💸 Finance Approvals' },
            { id: 'partners', label: '🤝 Mitra & Affiliate Payout' },
            { id: 'budget', label: '🔮 Forecasting Simulator' },
            { id: 'escrow', label: '🛡️ Escrow Payment Ledger' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-black tracking-wide transition shrink-0 ${
                activeTab === t.id 
                  ? 'bg-purple-600 text-white shadow-md border border-purple-400/30' 
                  : 'bg-[#17102e] border border-purple-500/10 text-[#d6cce5] hover:bg-purple-950/40'
              }`}
              style={{ minHeight: '36px' }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* SUB-DASHBOARD CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT 8 COLS: TAB DETAIL VIEW */}
          <div className="lg:col-span-8 space-y-6 text-left">
            
            {/* TAB 0: 100 POTENSI MONETISASI (INFOBOS REVENUE ECOSYSTEM) */}
            {activeTab === 'ecosystem' && (
              <div className="space-y-6 animate-fade-in" id="monetization-ecosystem-tab">
                
                {/* ECOSYSTEM INTRO SUMMARY CARD */}
                <div className="bg-gradient-to-r from-purple-950/40 to-slate-900/60 border border-purple-500/20 rounded-2xl p-5 relative overflow-hidden">
                  <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-48 h-48 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="bg-purple-500/20 text-purple-300 text-[9px] font-black font-mono px-2 py-0.5 rounded uppercase tracking-wider">
                          💎 INFOBOS REVENUE ECOSYSTEM
                        </span>
                        <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/20 text-[9px] font-mono px-1.5 py-0.5 rounded font-black">
                          110 MONETISASI TERPETAKAN
                        </span>
                      </div>
                      <h2 className="text-lg font-black text-white tracking-tight">
                        Platform Penggerak Kemandirian Finansial Media
                      </h2>
                      <p className="text-xs text-purple-300/60 max-w-2xl leading-normal">
                        Model diversifikasi multi-kanal yang dirancang untuk memperkuat keberlanjutan jurnalisme siber, riset data spasial, dan analitik opini publik berbasis kecerdasan buatan. Klik pada setiap segmen model, fase rencana, atau item untuk mensimulasikan proyeksi omset.
                      </p>
                    </div>
                  </div>
                </div>

                {/* TWO-COLUMN MODEL: CIRCULAR ALLOCATION & ACTIVE STREAM DETAILED CALCULATOR */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                  
                  {/* LEFT 5 COLS: MULTI REVENUE MODEL PIE CHART */}
                  <div className="bg-[#17102e] border border-purple-500/10 rounded-2xl p-4 md:col-span-5 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-purple-400 font-mono font-bold block uppercase tracking-wider mb-2">
                        📊 ALOKASI DISTRIBUSI PENDAPATAN (ESTIMASI TARGET)
                      </span>
                      <p className="text-[10px] text-slate-400 leading-normal mb-4 font-sans">
                        Persentase kontribusi target per kelompok sitemap monetisasi siber. Klik untuk memfilter daftar item.
                      </p>
                    </div>

                    {/* PIE CHART RENDER */}
                    <div className="h-44 w-full flex items-center justify-center relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Advertising', value: 25, color: '#3b82f6', cat: 'adv' },
                              { name: 'Subscription & Membership', value: 15, color: '#10b981', cat: 'mem' },
                              { name: 'Sponsored & Brand', value: 15, color: '#14b8a6', cat: 'content' },
                              { name: 'Data & Analytics', value: 10, color: '#f59e0b', cat: 'data' },
                              { name: 'Directory Premium', value: 10, color: '#06b6d4', cat: 'dir' },
                              { name: 'API Services', value: 10, color: '#8b5cf6', cat: 'api' },
                              { name: 'Affiliate & Commerce', value: 8, color: '#f97316', cat: 'aff' },
                              { name: 'Licensing & Syndication', value: 7, color: '#c026d3', cat: 'lic' },
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={45}
                            outerRadius={65}
                            paddingAngle={3}
                            dataKey="value"
                            cursor="pointer"
                          >
                            {[
                              { color: '#3b82f6', cat: 'adv' },
                              { color: '#10b981', cat: 'mem' },
                              { color: '#14b8a6', cat: 'content' },
                              { color: '#f59e0b', cat: 'data' },
                              { color: '#06b6d4', cat: 'dir' },
                              { color: '#8b5cf6', cat: 'api' },
                              { color: '#f97316', cat: 'aff' },
                              { color: '#c026d3', cat: 'lic' },
                            ].map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={entry.color} 
                                className="transition duration-300 hover:opacity-80"
                                onClick={() => {
                                  setSelectedCategory(entry.cat);
                                  setSelectedPhase('all');
                                }}
                              />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value) => [`${value}% Target Kontribusi`, 'Estimasi']}
                            contentStyle={{ backgroundColor: '#0f0a1c', borderColor: '#8b5cf6', borderRadius: '8px', fontSize: '10px' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
                        <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest">MULTI MODEL</span>
                        <strong className="text-sm font-black text-purple-300 font-mono mt-0.5">25% Iklan</strong>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 text-[9px] font-mono mt-3 border-t border-purple-500/10 pt-3">
                      {[
                        { name: 'Iklan Media', val: '25%', col: 'bg-blue-500', cat: 'adv' },
                        { name: 'Langganan', val: '15%', col: 'bg-emerald-500', cat: 'mem' },
                        { name: 'Liputan Brand', val: '15%', col: 'bg-teal-500', cat: 'content' },
                        { name: 'Data Intelligence', val: '10%', col: 'bg-amber-500', cat: 'data' },
                        { name: 'Direktori Premium', val: '10%', col: 'bg-cyan-500', cat: 'dir' },
                        { name: 'Sewa API', val: '10%', col: 'bg-purple-500', cat: 'api' },
                        { name: 'Afiliasi & Komisi', val: '8%', col: 'bg-orange-500', cat: 'aff' },
                        { name: 'Lisensi Konten', val: '7%', col: 'bg-fuchsia-500', cat: 'lic' },
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedCategory(item.cat);
                            setSelectedPhase('all');
                          }}
                          className={`flex items-center gap-1.5 py-0.5 px-1.5 rounded transition hover:bg-purple-950/40 text-left ${
                            selectedCategory === item.cat ? 'bg-purple-900/30 font-bold border border-purple-500/20' : 'text-slate-400'
                          }`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${item.col} shrink-0`} />
                          <span className="truncate flex-1">{item.name}</span>
                          <span className="text-white shrink-0 font-bold">{item.val}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* RIGHT 7 COLS: INTERACTIVE PROJECTOR CALCULATOR FOR SELECTED STREAM */}
                  {(() => {
                    const activeItem = REVENUE_ITEMS.find(it => it.id === selectedItemId) || REVENUE_ITEMS[0];
                    const catObj = REVENUE_CATEGORIES.find(c => c.id === activeItem.category);
                    const calcMonthlyYield = customPrice * customVolume;
                    const calcYearlyYield = calcMonthlyYield * 12;
                    
                    const getItemPhaseLabel = (category: string) => {
                      if (['adv', 'mem', 'dir', 'aff'].includes(category)) return 'FASE 1: GO-TO-MARKET (0-6 Bulan)';
                      if (['data', 'api', 'content', 'mkt'].includes(category)) return 'FASE 2: SYSTEM EXPANSION (6-18 Bulan)';
                      return 'FASE 3: ENTERPRISE & AI (18-36 Bulan)';
                    };

                    const getTargetClients = (category: string) => {
                      if (['adv', 'content', 'lic'].includes(category)) return 'Corporate Brands, Agensi Humas, UMKM Jawa Barat, Penyelenggara Event';
                      if (['mem', 'dig', 'edu'].includes(category)) return 'Pembaca Umum Jabar, Pelajar/Mahasiswa, Komunitas Bisnis Regional';
                      if (['dir', 'aff', 'mkt'].includes(category)) return 'Merchant Kuliner, Agen Travel & Wisata, Jasa Profesional Media, Kreator Lepas';
                      return 'Pemerintah Provinsi Jabar (Pemda), BUMD Jabar, BUMN Sektor Keuangan, Startup Teknologi & SaaS';
                    };

                    return (
                      <div className="bg-[#17102e] border border-purple-500/20 rounded-2xl p-5 md:col-span-7 flex flex-col justify-between space-y-4">
                        
                        {/* Selected Header */}
                        <div className="space-y-1 text-left">
                          <div className="flex items-center justify-between">
                            <span className={`text-[9px] font-black font-mono uppercase px-2 py-0.5 rounded border ${catObj?.borderColor} ${catObj?.textColor} ${catObj?.bgLight}`}>
                              {catObj?.label}
                            </span>
                            <span className="text-[10px] text-purple-400 font-mono font-bold">
                              Item ID: #{activeItem.id}
                            </span>
                          </div>
                          <h3 className="text-base font-black text-white font-sans mt-1.5 flex items-center gap-1.5">
                            <Sparkles className="h-4 w-4 text-amber-400 shrink-0" />
                            {activeItem.name}
                          </h3>
                          <p className="text-xs text-slate-300 leading-relaxed font-sans pt-1">
                            {activeItem.desc}
                          </p>
                        </div>

                        {/* Interactive Sliders */}
                        <div className="bg-slate-950/80 border border-purple-500/10 p-4 rounded-xl space-y-4 text-xs">
                          <span className="text-[10px] text-purple-400 font-mono font-bold block uppercase tracking-wider mb-2">
                            🔮 SIMULATOR PROYEKSI OMSET (REAL-TIME MODEL)
                          </span>
                          
                          {/* Price Slider */}
                          <div className="space-y-1.5 text-left">
                            <div className="flex justify-between font-mono text-[10px]">
                              <span className="text-slate-400">Harga Jual per Satuan:</span>
                              <strong className="text-purple-300">Rp {customPrice.toLocaleString()}</strong>
                            </div>
                            <input
                              type="range"
                              min={Math.max(1000, Math.floor(activeItem.defaultPrice * 0.2))}
                              max={Math.max(10000, Math.floor(activeItem.defaultPrice * 5))}
                              step={activeItem.defaultPrice > 1000000 ? 500000 : activeItem.defaultPrice > 100000 ? 50000 : 5000}
                              value={customPrice}
                              onChange={(e) => setCustomPrice(parseInt(e.target.value))}
                              className="w-full accent-purple-500 bg-slate-900 cursor-pointer"
                            />
                            <div className="flex justify-between text-[8px] text-slate-500 font-mono">
                              <span>Min: Rp {Math.max(1000, Math.floor(activeItem.defaultPrice * 0.2)).toLocaleString()}</span>
                              <span>Target Satuan: {activeItem.metricLabel}</span>
                              <span>Max: Rp {Math.floor(activeItem.defaultPrice * 5).toLocaleString()}</span>
                            </div>
                          </div>

                          {/* Volume Slider */}
                          <div className="space-y-1.5 text-left">
                            <div className="flex justify-between font-mono text-[10px]">
                              <span className="text-slate-400">Volume Penjualan Bulanan:</span>
                              <strong className="text-purple-300">{customVolume.toLocaleString()} unit</strong>
                            </div>
                            <input
                              type="range"
                              min={Math.max(1, Math.floor(activeItem.defaultVolume * 0.1))}
                              max={Math.max(10, Math.floor(activeItem.defaultVolume * 5))}
                              step={activeItem.defaultVolume > 1000 ? 50 : activeItem.defaultVolume > 100 ? 10 : 1}
                              value={customVolume}
                              onChange={(e) => setCustomVolume(parseInt(e.target.value))}
                              className="w-full accent-purple-500 bg-slate-900 cursor-pointer"
                            />
                            <div className="flex justify-between text-[8px] text-slate-500 font-mono">
                              <span>Min: {Math.max(1, Math.floor(activeItem.defaultVolume * 0.1)).toLocaleString()} unit</span>
                              <span>Sewa/Pakai per Bulan</span>
                              <span>Max: {Math.max(10, Math.floor(activeItem.defaultVolume * 5)).toLocaleString()} unit</span>
                            </div>
                          </div>
                        </div>

                        {/* Interactive Calculator Outputs */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-purple-950/20 border border-purple-500/25 p-3 rounded-xl text-center">
                            <span className="text-[9px] text-purple-400 font-mono block uppercase">PROYEKSI BULANAN</span>
                            <strong className="text-sm font-black text-white font-mono block mt-1">
                              Rp {calcMonthlyYield.toLocaleString()}
                            </strong>
                            <span className="text-[8px] text-slate-500 font-mono block mt-0.5">Recurring Yield</span>
                          </div>

                          <div className="bg-purple-950/20 border border-purple-500/25 p-3 rounded-xl text-center">
                            <span className="text-[9px] text-purple-400 font-mono block uppercase">PROYEKSI TAHUNAN</span>
                            <strong className="text-sm font-black text-emerald-400 font-mono block mt-1">
                              Rp {calcYearlyYield.toLocaleString()}
                            </strong>
                            <span className="text-[8px] text-slate-500 font-mono block mt-0.5">Yearly Potential</span>
                          </div>
                        </div>

                        {/* Recommendation details */}
                        <div className="space-y-2 text-xs text-left border-t border-purple-500/10 pt-3">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-[10px] gap-1">
                            <span className="text-slate-400 font-mono">FASE ROADMAP PENYELENGGARAAN:</span>
                            <strong className="text-purple-300 font-bold uppercase">{getItemPhaseLabel(activeItem.category)}</strong>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-[10px] gap-1">
                            <span className="text-slate-400 font-mono">TARGET KLIEN IDEAL SEKTOR JABAR:</span>
                            <span className="text-slate-300 truncate max-w-[280px] font-medium">{getTargetClients(activeItem.category)}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-[10px] gap-1 bg-purple-900/10 px-2 py-1.5 rounded border border-purple-500/5">
                            <span className="text-amber-500 font-mono font-bold">PROPOSISI VALUE UTAMA:</span>
                            <span className="text-slate-300 font-sans italic text-[10px]">Optimasi margin hingga 85% dengan biaya akuisisi (CAC) terkendali via SEO organik.</span>
                          </div>
                        </div>

                      </div>
                    );
                  })()}

                </div>

                {/* FILTER CONTROLS BAR */}
                <div className="bg-[#17102e] border border-purple-500/10 rounded-2xl p-4 space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    
                    {/* Search Field */}
                    <div className="relative w-full sm:max-w-xs">
                      <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-purple-400/60" />
                      <input
                        type="text"
                        placeholder="Cari dari 110 Potensi Monetisasi..."
                        value={ecosystemSearchQuery}
                        onChange={(e) => setEcosystemSearchQuery(e.target.value)}
                        className="bg-slate-950 border border-purple-500/20 text-[#d6cce5] text-xs rounded-xl pl-9 pr-4 py-2 w-full focus:outline-none focus:border-purple-500 transition placeholder-purple-400/30"
                        style={{ minHeight: '36px' }}
                      />
                      {ecosystemSearchQuery && (
                        <button 
                          onClick={() => setEcosystemSearchQuery('')}
                          className="absolute right-3 top-2.5 text-purple-400/60 hover:text-white"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>

                    {/* Phase Filter Buttons */}
                    <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                      {[
                        { id: 'all', label: 'Semua Rencana' },
                        { id: '1', label: 'Fase 1 (0-6 Bln)' },
                        { id: '2', label: 'Fase 2 (6-18 Bln)' },
                        { id: '3', label: 'Fase 3 (18-36 Bln)' }
                      ].map((ph) => (
                        <button
                          key={ph.id}
                          onClick={() => setSelectedPhase(ph.id)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold font-mono tracking-wide transition shrink-0 ${
                            selectedPhase === ph.id 
                              ? 'bg-purple-600 text-white' 
                              : 'bg-slate-950 border border-purple-500/10 text-slate-400 hover:text-[#d6cce5]'
                          }`}
                          style={{ minHeight: '28px' }}
                        >
                          {ph.label}
                        </button>
                      ))}
                    </div>

                  </div>

                  {/* Horizontal Scrollable Category Filter */}
                  <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSelectedPhase('all');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition shrink-0 border ${
                        selectedCategory === 'all' 
                          ? 'bg-purple-900/60 text-purple-200 border-purple-500' 
                          : 'bg-slate-950/60 text-slate-400 border-purple-500/10 hover:text-[#d6cce5]'
                      }`}
                      style={{ minHeight: '28px' }}
                    >
                      🌟 Semua Kategori ({REVENUE_ITEMS.length})
                    </button>
                    {REVENUE_CATEGORIES.map((cat) => {
                      const count = REVENUE_ITEMS.filter(it => it.category === cat.id).length;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setSelectedCategory(cat.id);
                            setSelectedPhase('all');
                          }}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wide transition shrink-0 border ${
                            selectedCategory === cat.id 
                              ? 'bg-purple-900/60 text-purple-200 border-purple-500' 
                              : 'bg-slate-950/60 text-slate-400 border-purple-500/10 hover:text-white'
                          }`}
                          style={{ minHeight: '28px' }}
                        >
                          {cat.name} ({count})
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* FILTERED ITEMS LIST GRID */}
                <div className="bg-[#17102e] border border-purple-500/10 rounded-2xl p-4">
                  <div className="flex items-center justify-between border-b border-purple-500/10 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <ListOrdered className="h-4 w-4 text-purple-400" />
                      <span className="text-xs font-black uppercase text-purple-300 font-mono tracking-wider">
                        DAFTAR MODEL PENDAPATAN ({filteredEcosystemItems.length} DITEMUKAN)
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Klik Item Untuk Simulasi Kalkulator Di Atas
                    </span>
                  </div>

                  {filteredEcosystemItems.length === 0 ? (
                    <div className="text-center py-10 space-y-2">
                      <AlertCircle className="h-8 w-8 text-purple-500/40 mx-auto" />
                      <p className="text-xs text-slate-500 font-mono">Tidak ada potensi monetisasi yang sesuai dengan filter pencarian.</p>
                      <button 
                        onClick={() => {
                          setEcosystemSearchQuery('');
                          setSelectedCategory('all');
                          setSelectedPhase('all');
                        }}
                        className="text-[10px] text-purple-400 font-bold hover:underline"
                      >
                        Reset Filter
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[420px] overflow-y-auto pr-1">
                      {filteredEcosystemItems.map((item) => {
                        const isSelected = item.id === selectedItemId;
                        const catObj = REVENUE_CATEGORIES.find(c => c.id === item.category);
                        const itemPhase = getItemPhase(item.category);

                        return (
                          <div
                            key={item.id}
                            onClick={() => setSelectedItemId(item.id)}
                            className={`p-3 rounded-xl border transition cursor-pointer text-left flex flex-col justify-between space-y-2 group ${
                              isSelected 
                                ? 'bg-purple-950/50 border-purple-500 shadow-[0_0_15px_rgba(139,92,246,0.15)]' 
                                : 'bg-slate-950/70 border-purple-500/10 hover:border-purple-500/40 hover:bg-slate-900/60'
                            }`}
                          >
                            <div className="space-y-1">
                              <div className="flex justify-between items-start gap-2">
                                <span className="text-[9px] font-black font-mono text-purple-400">
                                  #{item.id}
                                </span>
                                <div className="flex items-center gap-1 shrink-0">
                                  <span className={`text-[8px] font-mono px-1 py-0.2 rounded border ${catObj?.borderColor} ${catObj?.textColor} ${catObj?.bgLight}`}>
                                    {catObj?.name}
                                  </span>
                                  <span className={`text-[8px] font-mono px-1 py-0.2 rounded border ${
                                    itemPhase === '1' ? 'border-emerald-500/10 text-emerald-400 bg-emerald-500/5' : 
                                    itemPhase === '2' ? 'border-amber-500/10 text-amber-400 bg-amber-500/5' : 
                                    'border-pink-500/10 text-pink-400 bg-pink-500/5'
                                  }`}>
                                    F{itemPhase}
                                  </span>
                                </div>
                              </div>
                              <h4 className={`text-xs font-bold transition ${isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                                {item.name}
                              </h4>
                              <p className="text-[10px] text-slate-400 leading-snug line-clamp-2">
                                {item.desc}
                              </p>
                            </div>

                            <div className="flex justify-between items-center pt-1 border-t border-purple-500/5 text-[9px] font-mono text-slate-500">
                              <span>Rate Standar:</span>
                              <strong className="text-purple-300">Rp {item.defaultPrice.toLocaleString()}</strong>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* THREE-PHASE ROADMAP & GROWTH STRATEGY BOARD */}
                <div className="bg-[#17102e] border border-purple-500/10 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center gap-2 border-b border-purple-500/10 pb-2.5">
                    <TrendingUp className="h-4 w-4 text-purple-400" />
                    <span className="text-xs font-black uppercase text-purple-300 font-mono tracking-wider">
                      🔮 FOKUS PENGEMBANGAN DAN TAHAPAN AKTIVASI (ROADMAP)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    {/* Phase 1 Card */}
                    <button
                      onClick={() => setSelectedPhase('1')}
                      className={`p-4 rounded-xl border text-left space-y-2.5 transition flex flex-col justify-between ${
                        selectedPhase === '1' ? 'bg-purple-950/40 border-purple-500' : 'bg-slate-950/60 border-purple-500/10 hover:border-purple-500/30'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase">● AKTIF / GO-TO-MARKET</span>
                          <span className="text-[9px] bg-emerald-950 text-emerald-400 px-1.5 py-0.2 rounded font-black">Fase 1</span>
                        </div>
                        <h4 className="text-xs font-black text-white font-sans">
                          Sitemap Monetisasi Dasar (0 - 6 Bulan)
                        </h4>
                        <p className="text-[10px] text-slate-400 leading-normal">
                          Mengaktifkan pondasi sitemap pendapatan yang teruji pasar: Iklan Banner, Berlangganan Premium, Liputan Sponsor/Brand, serta Direktori Bisnis Prioritas.
                        </p>
                      </div>
                      <div className="text-[9px] text-purple-400 font-mono flex items-center gap-1.5 pt-2 border-t border-purple-500/5">
                        <span>Fokus Kategori:</span>
                        <strong className="text-white">adv, mem, dir, aff</strong>
                      </div>
                    </button>

                    {/* Phase 2 Card */}
                    <button
                      onClick={() => setSelectedPhase('2')}
                      className={`p-4 rounded-xl border text-left space-y-2.5 transition flex flex-col justify-between ${
                        selectedPhase === '2' ? 'bg-purple-950/40 border-purple-500' : 'bg-slate-950/60 border-purple-500/10 hover:border-purple-500/30'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-amber-500 font-mono font-bold uppercase">● INTEGRASI SISTEM / DATA</span>
                          <span className="text-[9px] bg-amber-950 text-amber-500 px-1.5 py-0.2 rounded font-black">Fase 2</span>
                        </div>
                        <h4 className="text-xs font-black text-white font-sans">
                          System &amp; Data Expansion (6 - 18 Bulan)
                        </h4>
                        <p className="text-[10px] text-slate-400 leading-normal">
                          Memonetisasi data &amp; monitoring media siber. Merilis akses News API, Media Monitoring Dashboard, Marketplace Jurnalis/Rilis Pers, serta Studio Infografis.
                        </p>
                      </div>
                      <div className="text-[9px] text-purple-400 font-mono flex items-center gap-1.5 pt-2 border-t border-purple-500/5">
                        <span>Fokus Kategori:</span>
                        <strong className="text-white">data, api, content, mkt</strong>
                      </div>
                    </button>

                    {/* Phase 3 Card */}
                    <button
                      onClick={() => setSelectedPhase('3')}
                      className={`p-4 rounded-xl border text-left space-y-2.5 transition flex flex-col justify-between ${
                        selectedPhase === '3' ? 'bg-purple-950/40 border-purple-500' : 'bg-slate-950/60 border-purple-500/10 hover:border-purple-500/30'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-pink-400 font-mono font-bold uppercase">● ENTERPRISE &amp; AI INTEGRATION</span>
                          <span className="text-[9px] bg-pink-950 text-pink-400 px-1.5 py-0.2 rounded font-black">Fase 3</span>
                        </div>
                        <h4 className="text-xs font-black text-white font-sans">
                          AI Services &amp; White Label Solutions (18 - 36 Bulan)
                        </h4>
                        <p className="text-[10px] text-slate-400 leading-normal">
                          Meluncurkan asisten riset AI, portal berita siber berlisensi White Label, dashboard kota pintar terintegrasi, dan lisensi dataset riset primer ke korporasi global.
                        </p>
                      </div>
                      <div className="text-[9px] text-purple-400 font-mono flex items-center gap-1.5 pt-2 border-t border-purple-500/5">
                        <span>Fokus Kategori:</span>
                        <strong className="text-white">ai, ent, edu, dig, lic</strong>
                      </div>
                    </button>

                  </div>
                </div>

                {/* CORE STRATEGY: KEY SUCCESS FACTORS & VALUE PROPOSITION */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* KEY SUCCESS FACTORS */}
                  <div className="bg-[#17102e] border border-purple-500/10 rounded-2xl p-4 space-y-3.5">
                    <div className="flex items-center gap-2 border-b border-purple-500/10 pb-2">
                      <ShieldCheck className="h-4 w-4 text-emerald-400" />
                      <span className="text-xs font-black uppercase text-purple-300 font-mono tracking-wider">
                        🔑 KEY SUCCESS FACTORS INFOBOS
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                      {[
                        { title: 'Konten Berkualitas & Konsisten', desc: 'Sertifikasi dewan pers, jaringan kontributor 27 Kab/Kota se-Jawa Barat.' },
                        { title: 'Teknologi Canggih & Scalable', desc: 'Arsitektur Next-gen, performa CDN tinggi, framework SEO otomatis.' },
                        { title: 'Data & AI Berbasis Insight', desc: 'Asisten intelijen siber, mesin sentimen riil, pemrosesan bahasa daerah.' },
                        { title: 'Kemitraan Strategis', desc: 'Sinergi korporasi BUMD/BUMN, Pemprov Jabar, dan UMKM regional.' },
                        { title: 'Diversifikasi Monetisasi', desc: '110 model terintegrasi mencegah risiko ketergantungan pada satu sitemap kas.' },
                        { title: 'Pengalaman Pengguna Terbaik', desc: 'Bebas iklan slop pengganggu bagi member VIP, rendering secepat kilat.' }
                      ].map((item, idx) => (
                        <div key={idx} className="p-2.5 bg-slate-950/40 rounded-lg border border-purple-500/5">
                          <h5 className="text-[11px] font-black text-slate-200 font-sans">{item.title}</h5>
                          <p className="text-[10px] text-slate-500 leading-relaxed font-sans mt-0.5">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* VALUE PROPOSITIONS */}
                  <div className="bg-[#17102e] border border-purple-500/10 rounded-2xl p-4 space-y-3.5">
                    <div className="flex items-center gap-2 border-b border-purple-500/10 pb-2">
                      <Award className="h-4 w-4 text-amber-400" />
                      <span className="text-xs font-black uppercase text-purple-300 font-mono tracking-wider">
                        🌟 VALUE PROPOSITION UTAMA PLATFORM
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                      {[
                        { title: 'Informasi Cepat & Terpercaya', desc: 'Diferensiasi jurnalisme cek fakta anti-hoaks untuk menjaga kredibilitas.' },
                        { title: 'Data Akurat & Insightful', desc: 'Penyediaan data makro, tren geospasial, dan opini publik bersertifikat.' },
                        { title: 'Intelijen & Analitik Berbasis AI', desc: 'Fitur mutakhir pengubah naskah kasar siber langsung menjadi laporan terstruktur.' },
                        { title: 'Direktori Bisnis Terpercaya', desc: 'Sistem verifikasi berjenjang menjamin kesahihan profil instansi.' },
                        { title: 'Platform Terintegrasi', desc: 'Dukungan webhooks, News API, dan sindikasi konten eksternal instan.' },
                        { title: 'Monetisasi Sehat Berkelanjutan', desc: 'Keseimbangan yield dari ads komersial, donasi sukarela, dan B2B SaaS.' }
                      ].map((item, idx) => (
                        <div key={idx} className="p-2.5 bg-slate-950/40 rounded-lg border border-purple-500/5">
                          <h5 className="text-[11px] font-black text-slate-200 font-sans">{item.title}</h5>
                          <p className="text-[10px] text-slate-500 leading-relaxed font-sans mt-0.5">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* TAB 1: REVENUE ANALYTICS */}
            {activeTab === 'analytics' && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Two Column Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* Revenue stream Recharts Area chart */}
                  <div className="bg-[#17102e] border border-purple-500/10 p-4 rounded-2xl">
                    <span className="text-[10px] text-purple-400 block font-mono font-bold mb-3 uppercase tracking-widest">📈 HISTORIS KINERJA REVENUE VS EXPENSE (Rp Juta)</span>
                    <div className="h-56 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={monthlyRevenueTrend} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#251a44" />
                          <XAxis dataKey="bulan" stroke="#9d4edd" fontSize={9} />
                          <YAxis stroke="#9d4edd" fontSize={9} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f0a1c', borderColor: '#8b5cf6', fontSize: '10px' }} />
                          <Area type="monotone" dataKey="Pendapatan" stroke="#8b5cf6" fillOpacity={0.15} fill="#8b5cf6" strokeWidth={2} />
                          <Area type="monotone" dataKey="Pengeluaran" stroke="#f97316" fillOpacity={0.05} fill="#f97316" strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Distribution by streams Pie Chart */}
                  <div className="bg-[#17102e] border border-purple-500/10 p-4 rounded-2xl flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-purple-400 block font-mono font-bold mb-3 uppercase tracking-widest">🍩 BREAKDOWN SUMBER PENDAPATAN</span>
                      <div className="h-44 w-full flex justify-center items-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={revenueDistributionData}
                              cx="50%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={70}
                              paddingAngle={4}
                              dataKey="value"
                            >
                              {revenueDistributionData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => `Rp ${value.toLocaleString()}`} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    {/* Pie Legend labels */}
                    <div className="grid grid-cols-3 gap-1 text-[9px] text-purple-300/80 pt-2 border-t border-purple-500/10">
                      {revenueDistributionData.map((stream, idx) => (
                        <div key={idx} className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx] }} />
                          <span className="truncate">{stream.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Simulated Business Streams overview list */}
                <div className="bg-[#17102e] border border-purple-500/10 rounded-2xl p-4 space-y-3">
                  <span className="text-[10px] text-purple-400 font-mono font-bold block uppercase tracking-widest">🏢 MONITORING ALIRAN DATA MONETISASI (REAL-TIME YIELD)</span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-purple-950/20 border border-purple-500/15 rounded-xl">
                      <span className="text-[9px] text-purple-400 font-mono font-bold uppercase block">1. ADVERTISING REVENUE</span>
                      <h4 className="text-sm font-bold text-white mt-1">Rp 165.000.000</h4>
                      <p className="text-[9px] text-purple-300/60 leading-normal mt-1">Pendapatan kampanye iklan display bento grid, take-over header, serta artikel bersponsor (native ads).</p>
                    </div>
                    <div className="p-3 bg-purple-950/20 border border-purple-500/15 rounded-xl">
                      <span className="text-[9px] text-purple-400 font-mono font-bold uppercase block">2. SUBSCRIPTION REVENUE</span>
                      <h4 className="text-sm font-bold text-white mt-1">Rp 110.000.000</h4>
                      <p className="text-[9px] text-purple-300/60 leading-normal mt-1">Langganan bulanan &amp; tahunan untuk paket premium analitik sentiment dan dashboard intelijen.</p>
                    </div>
                    <div className="p-3 bg-purple-950/20 border border-purple-500/15 rounded-xl">
                      <span className="text-[9px] text-purple-400 font-mono font-bold uppercase block">3. API GATEWAY REVENUE</span>
                      <h4 className="text-sm font-bold text-white mt-1">Rp 45.000.000</h4>
                      <p className="text-[9px] text-purple-300/60 leading-normal mt-1">Biaya kuota akses API bagi developer eksternal, asisten translator daerah, serta scraping data.</p>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: INVOICES & BILLING */}
            {activeTab === 'invoices' && (
              <div className="space-y-5 animate-fade-in">
                
                {/* Add new invoice inline form */}
                <form onSubmit={handleCreateInvoice} className="bg-[#17102e] border border-purple-500/20 p-4 rounded-2xl space-y-3">
                  <span className="text-[10px] text-purple-400 font-mono font-bold uppercase tracking-widest block">📝 PENERBITAN INVOICE BARU (PIUTANG KORPORAT)</span>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-400 block font-mono">NAMA KLIEN</label>
                      <input
                        type="text"
                        placeholder="PT Bank Regional"
                        value={newClient}
                        onChange={(e) => setNewClient(e.target.value)}
                        className="w-full bg-slate-950 border border-purple-500/20 text-xs text-white p-2 rounded-xl"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-400 block font-mono">NOMINAL TAGIHAN (RP)</label>
                      <input
                        type="number"
                        placeholder="12000000"
                        value={newAmount}
                        onChange={(e) => setNewAmount(e.target.value)}
                        className="w-full bg-slate-950 border border-purple-500/20 text-xs text-white p-2 rounded-xl font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-400 block font-mono">JENIS MONETISASI</label>
                      <select
                        value={newType}
                        onChange={(e) => setNewType(e.target.value as any)}
                        className="w-full bg-slate-950 border border-purple-500/20 text-xs text-white p-2 rounded-xl cursor-pointer"
                      >
                        <option value="Advertising">Advertising</option>
                        <option value="Subscription">Subscription</option>
                        <option value="API Gateway">API Gateway</option>
                        <option value="Sponsorship">Sponsorship</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="bg-purple-600 hover:bg-purple-500 text-white font-black text-xs py-2 rounded-xl uppercase tracking-wider"
                      style={{ minHeight: '38px' }}
                    >
                      Kirim Tagihan
                    </button>
                  </div>
                </form>

                {/* Invoices List table */}
                <div className="bg-[#17102e] border border-purple-500/10 rounded-2xl overflow-hidden">
                  <div className="p-4 border-b border-purple-500/10 flex justify-between items-center bg-purple-950/20">
                    <span className="text-[10px] text-purple-400 font-mono font-bold uppercase">📋 DAFTAR INVOICE MONETISASI INFOBOS</span>
                    <span className="text-[9px] text-slate-400 font-mono">Total Piutang: {invoices.length} Faktur</span>
                  </div>
                  
                  <div className="overflow-x-auto text-[11px] font-mono">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-purple-500/10 bg-purple-950/10 text-purple-300">
                          <th className="p-3.5">ID INVOICE</th>
                          <th className="p-3.5">NAMA KLIEN</th>
                          <th className="p-3.5">SEKTOR</th>
                          <th className="p-3.5">NOMINAL (RP)</th>
                          <th className="p-3.5">STATUS</th>
                          <th className="p-3.5">JATUH TEMPO</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-purple-500/5">
                        {invoices.map((inv) => (
                          <tr key={inv.id} className="hover:bg-purple-950/10">
                            <td className="p-3.5 font-bold text-white">{inv.id}</td>
                            <td className="p-3.5 font-sans font-bold text-slate-200">{inv.client}</td>
                            <td className="p-3.5">
                              <span className="bg-purple-950 text-purple-300 border border-purple-500/20 px-2 py-0.5 rounded text-[9px]">
                                {inv.type}
                              </span>
                            </td>
                            <td className="p-3.5 font-bold text-slate-100">Rp {inv.amount.toLocaleString()}</td>
                            <td className="p-3.5">
                              <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-black tracking-wide ${
                                inv.status === 'paid' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' :
                                inv.status === 'overdue' ? 'bg-rose-950 text-rose-400 border border-rose-500/30' :
                                'bg-amber-950 text-amber-400 border border-amber-500/30'
                              }`}>
                                {inv.status}
                              </span>
                            </td>
                            <td className="p-3.5 text-slate-400">{inv.dueDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: FINANCE APPROVALS */}
            {activeTab === 'approvals' && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-[#17102e] border border-purple-500/10 rounded-2xl p-4">
                  <span className="text-[10px] text-purple-400 font-mono font-bold block uppercase tracking-widest mb-3">💸 PENGELUARAN KAS &amp; CAPEX PENDING WAITING CFO APPROVAL</span>
                  
                  <div className="space-y-3">
                    {approvals.map((app) => (
                      <div key={app.id} className="bg-slate-950/80 p-4 rounded-xl border border-purple-500/15 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div className="text-left space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black font-mono bg-purple-900 text-purple-200 px-1.5 py-0.2 rounded">
                              {app.id}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">Dibuat: {app.date}</span>
                          </div>
                          <h4 className="text-xs font-bold text-slate-100">{app.purpose}</h4>
                          <div className="text-[10px] text-slate-400 font-sans">
                            Diajukan oleh: <strong>{app.requester}</strong> ({app.department})
                          </div>
                          <div className="text-sm font-black text-amber-400 font-mono">
                            Rp {app.amount.toLocaleString()}
                          </div>
                        </div>

                        {/* Interactive Approval Actions */}
                        <div className="flex gap-2 shrink-0">
                          {app.status === 'pending' ? (
                            <>
                              <button
                                onClick={() => handleApprovalAction(app.id, 'reject')}
                                className="bg-rose-950/40 hover:bg-rose-950 border border-rose-700/40 text-rose-300 text-[10px] font-black uppercase px-3 py-1.5 rounded-lg transition"
                                style={{ minHeight: '32px' }}
                              >
                                Tolak
                              </button>
                              <button
                                onClick={() => handleApprovalAction(app.id, 'approve')}
                                className="bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-600/40 text-emerald-200 text-[10px] font-black uppercase px-3 py-1.5 rounded-lg transition"
                                style={{ minHeight: '32px' }}
                              >
                                Setujui Dana
                              </button>
                            </>
                          ) : (
                            <span className={`text-[10px] font-black font-mono uppercase px-2.5 py-1 rounded-lg ${
                              app.status === 'approved' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/20' : 'bg-rose-950 text-rose-400 border border-rose-500/20'
                            }`}>
                              ● {app.status === 'approved' ? 'Disetujui' : 'Ditolak'}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: PARTNERS & AFFILIATE */}
            {activeTab === 'partners' && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-[#17102e] border border-purple-500/10 rounded-2xl p-4">
                  <span className="text-[10px] text-purple-400 font-mono font-bold block uppercase tracking-widest mb-3">🤝 REKONSILIASI KOMISI MITRA AFILIASI &amp; PORTAL PUBLIK</span>
                  
                  <div className="space-y-3">
                    {partnerCommissions.map((prt) => (
                      <div key={prt.id} className="bg-slate-950/80 p-3.5 rounded-xl border border-white/5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-xs">
                        <div className="text-left space-y-1 font-mono">
                          <span className="text-[9px] bg-slate-900 text-slate-400 px-1.5 py-0.2 rounded border border-white/5 font-bold">
                            MITRA ID: {prt.id}
                          </span>
                          <h4 className="text-xs font-bold text-slate-200 font-sans mt-1">{prt.partnerName}</h4>
                          <div className="flex gap-4 text-[9px] text-slate-400 mt-1">
                            <span>Klik Rujukan: <strong className="text-slate-300">{prt.clicks}</strong></span>
                            <span>Konversi Premium: <strong className="text-slate-300">{prt.conversions}</strong></span>
                            <span>Tarif Komisi: <strong className="text-slate-300">{prt.commissionRate}%</strong></span>
                          </div>
                        </div>

                        <div className="text-right flex items-center gap-4">
                          <div className="font-mono">
                            <span className="text-[9px] text-slate-500 block">DANA CAIR (RP)</span>
                            <strong className="text-xs text-purple-300 font-bold">Rp {prt.payoutAmount.toLocaleString()}</strong>
                          </div>
                          
                          {prt.status === 'pending' ? (
                            <button
                              onClick={() => handlePayoutCommission(prt.id)}
                              className="bg-purple-900/60 hover:bg-purple-900 border border-purple-600/40 text-purple-200 text-[10px] font-black uppercase px-3 py-1.5 rounded-lg transition"
                              style={{ minHeight: '32px' }}
                            >
                              Bayar Komisi
                            </button>
                          ) : (
                            <span className="text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded font-black uppercase">
                              ✓ Paid Out
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: FORECASTING SIMULATOR */}
            {activeTab === 'budget' && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-[#17102e] border border-purple-500/10 rounded-2xl p-5 space-y-4">
                  <span className="text-[10px] text-purple-400 font-mono font-bold block uppercase tracking-widest">🔮 SIMULASI PROYEKSI PERTUMBUHAN OMSET INFOBOS JABAR</span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div className="space-y-3 text-xs">
                      <div className="space-y-1">
                        <div className="flex justify-between font-mono text-[10px]">
                          <span>Kelipatan Anggaran Pemasaran:</span>
                          <strong className="text-purple-300">{marketingBudgetMultiplier}x Anggaran Saat Ini</strong>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="5"
                          step="1"
                          value={marketingBudgetMultiplier}
                          onChange={(e) => setMarketingBudgetMultiplier(parseInt(e.target.value))}
                          className="w-full accent-purple-500 bg-slate-900 cursor-pointer"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between font-mono text-[10px]">
                          <span>Estimasi Konversi Penonton:</span>
                          <strong className="text-purple-300">{expectedRoi}% / kuartal</strong>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="40"
                          value={expectedRoi}
                          onChange={(e) => setExpectedRoi(parseInt(e.target.value))}
                          className="w-full accent-purple-500 bg-slate-900 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Calculation result banner */}
                    <div className="bg-purple-950/20 p-4 rounded-xl border border-purple-500/20 space-y-2 text-center">
                      <span className="text-[10px] text-purple-400 font-mono block">PROYEKSI PENDAPATAN BULAN DEPAN (ESTIMASI SIMULASI)</span>
                      <strong className="text-2xl text-white font-mono block mt-1">
                        Rp {(kpis.revenue * (1 + (expectedRoi / 100) * marketingBudgetMultiplier)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </strong>
                      <span className="text-[9px] text-slate-500 font-mono block">
                        Kalkulasi didasari konversi dari multi-budget yield ads multiplier dan total traffic organic bento-grid.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: ESCROW PAYMENT LEDGER */}
            {activeTab === 'escrow' && (
              <div className="space-y-6 animate-fade-in" id="escrow-payment-ledger-tab">
                <div className="bg-purple-950/15 border border-purple-500/15 rounded-2xl p-5 shadow-md">
                  <div className="flex items-center justify-between border-b border-purple-500/10 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-purple-400" />
                      <div>
                        <h3 className="font-display font-black text-xs text-purple-200 uppercase tracking-wider">
                          🛡️ Sistem Escrow Rekening Bersama (Payment Ledger)
                        </h3>
                        <p className="text-[10px] text-[#a196b4] mt-0.5">Daftar transaksi B2B yang dananya saat ini ditahan secara aman oleh sistem INFOBOS.</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2.5 py-0.5 rounded">
                      100% SECURE
                    </span>
                  </div>

                  {escrowTransactions.length === 0 ? (
                    <div className="p-6 text-center text-[#a196b4] text-xs font-medium">
                      Tidak ada transaksi Escrow aktif saat ini.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {escrowTransactions.map(esc => (
                        <div key={esc.id} className="p-4 bg-[#140e27]/80 border border-purple-500/10 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-medium">
                          <div className="space-y-1">
                            <span className="text-[9px] bg-amber-500/10 border border-amber-500/25 text-amber-400 font-extrabold px-2 py-0.5 rounded font-mono">
                              STATUS: {esc.status}
                            </span>
                            <h4 className="font-bold text-white text-sm">{esc.itemTitle}</h4>
                            <p className="text-[10px] text-[#a196b4]">Penjual: {esc.seller || 'Mitra Industri'} | Diinisiasi {esc.date}</p>
                          </div>

                          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                            <div className="text-right">
                              <span className="text-[10px] text-[#a196b4] block font-mono">Jumlah Dana</span>
                              <span className="font-black text-white">Rp {esc.amount.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              {esc.status === 'DITAHAN' ? (
                                <>
                                  <button 
                                    onClick={() => {
                                      setEscrowTransactions(prev => prev.map(e => e.id === esc.id ? { ...e, status: 'DIKIRIM' } : e));
                                    }}
                                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-[9px] uppercase px-3 py-1.5 rounded-lg transition shadow-xs cursor-pointer"
                                  >
                                    Konfirmasi Kirim
                                  </button>
                                  <button 
                                    onClick={() => {
                                      setEscrowTransactions(prev => prev.map(e => e.id === esc.id ? { ...e, status: 'SENGKETA' } : e));
                                    }}
                                    className="bg-rose-950/40 hover:bg-rose-900/40 text-rose-400 font-bold text-[9px] uppercase px-3 py-1.5 rounded-lg transition cursor-pointer"
                                  >
                                    Ajukan Sengketa
                                  </button>
                                </>
                              ) : esc.status === 'DIKIRIM' ? (
                                <button 
                                  onClick={() => {
                                    setEscrowTransactions(prev => prev.map(e => e.id === esc.id ? { ...e, status: 'DANA_DILEPAS' } : e));
                                  }}
                                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[9px] uppercase px-3 py-1.5 rounded-lg transition cursor-pointer"
                                >
                                  Konfirmasi Terima &amp; Lepas Dana
                                </button>
                              ) : (
                                <span className="text-xs text-emerald-400 font-black flex items-center gap-1">
                                  <CheckSquare className="h-4 w-4" /> Dana Berhasil Ditransaksikan
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT 4 COLS: INTERNAL AUDIT TRAIL LOGS */}
          <div className="lg:col-span-4 bg-[#17102e] border border-purple-500/10 rounded-2xl p-4 space-y-4">
            
            <div className="flex items-center gap-2 border-b border-purple-500/10 pb-2">
              <PlusCircle className="h-4 w-4 text-purple-400" />
              <span className="text-xs font-black uppercase text-purple-300 font-mono tracking-wider">LOG AUDIT KEUANGAN INTERNAL</span>
            </div>

            <div className="space-y-3 font-mono text-[10px] leading-relaxed max-h-96 overflow-y-auto">
              {auditLogs.map((log, index) => (
                <div key={index} className="p-2 bg-slate-950/60 rounded border border-purple-500/5 text-purple-300/80">
                  <span className="text-slate-500 block text-[9px]">{new Date().toLocaleDateString()}</span>
                  <p className="mt-1 font-mono text-[10px] leading-normal">{log}</p>
                </div>
              ))}
            </div>

            <div className="bg-purple-950/20 p-3.5 rounded-xl border border-purple-500/25 space-y-2">
              <span className="text-[10px] text-amber-500 font-mono font-bold block uppercase tracking-wider">● KEPATUHAN PAJAK PPH 23 &amp; AUDIT</span>
              <p className="text-[10px] text-slate-400 leading-normal font-sans">
                Setiap pembayaran yang terverifikasi dan settled otomatis memotong PPh Pasal 23 sebesar 2% untuk transaksi jasa iklan dan royalty digital. Laporan audit di-lock menggunakan hashing MD5 internal platform.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
