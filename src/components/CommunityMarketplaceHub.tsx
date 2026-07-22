import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, MessageSquare, Bookmark, MapPin, Calendar, DollarSign, Award, 
  ShieldCheck, Check, CheckCircle2, Plus, Trash2, Send, Star, User, Users, 
  Briefcase, Tag, Filter, Layers, AlertCircle, ThumbsUp, FileText, Upload, 
  Flag, Share2, Lock, Settings, CreditCard, TrendingUp, Bot, Clock, Sparkles, 
  X, ChevronRight, ChevronLeft, Smile, Mic, Paperclip, RefreshCw, BarChart2, Eye, Building,
  Mail, Globe, Feather
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function initializeSystemData(force = false) {
  const forumKey = 'infobos_forum_threads';
  const mktKey = 'infobos_marketplace_listings';

  const defaultThreads = [
    {
      id: 'th-1',
      title: 'Tanya Jawab: Solusi Rantai Pasok Gula Kelapa di Jabar Selatan',
      category: 'qa',
      author: 'Asep Sunandar (Koperasi Jabar)',
      content: 'Kami sedang kesulitan mencari distributor pengiriman cepat untuk wilayah Cianjur Selatan. Apakah ada rekomendasi logistik berpendingin yang terjangkau?',
      tags: ['Logistik', 'SupplyChain', 'Q&A'],
      likes: 12,
      repliesCount: 2,
      views: 180,
      isPinned: true,
      isSolved: true,
      votes: 14,
      hasVoted: false,
      aiSummary: 'Diskusi seputar kendala pengiriman logistik gula kelapa di Cianjur Selatan. Anggota forum menyarankan penggunaan armada logistik daerah berbasis IoT untuk memantau suhu bahan.',
      replies: [
        { id: 'rep-1', author: 'Budi Santoso', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', content: 'Coba gunakan Mitra Logistik Jabar Express di terminal Pasirhayam, mereka menyediakan armada cold-storage mini untuk rute pegunungan.', isSolvedAnswer: true, likes: 8, quote: '' },
        { id: 'rep-2', author: 'Siti Rahma', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', content: 'Betul, kami biasa pakai mereka untuk distribusi agro industri. Tarifnya bisa dinegosiasikan jika kontrak bulanan.', isSolvedAnswer: false, likes: 3, quote: 'Budi Santoso: Coba gunakan Mitra Logistik Jabar Express...' }
      ]
    },
    {
      id: 'th-2',
      title: 'Polling: Preferensi Lokasi Sentra Industri Halal Jabar 2026',
      category: 'polling',
      author: 'Dr. Gunawan (Pusat Riset Ekonomi)',
      content: 'Menurut para pelaku usaha, mana koridor ekonomi yang paling matang untuk perluasan klaster industri makanan minuman halal?',
      tags: ['Sektoral', 'Investasi', 'Polling'],
      likes: 24,
      repliesCount: 0,
      views: 340,
      isPinned: false,
      isSolved: false,
      votes: 145,
      polling: {
        question: 'Sentra terbaik untuk industri halal baru?',
        options: [
          { text: 'Koridor Patimban Raya (Subang)', votes: 68 },
          { text: 'Kawasan Kertajati (Majalengka)', votes: 45 },
          { text: 'Bandung Raya (Rancaekek)', votes: 32 }
        ],
        totalVotes: 145,
        userVotedIdx: -1
      },
      aiSummary: 'Polling menunjukkan minat tinggi pelaku usaha apada Koridor Patimban Raya (47%) karena akses pelabuhan ekspor langsung, diikuti Kertajati Aero-City.',
      replies: []
    },
    {
      id: 'th-3',
      title: '[PREMIUM] Analisis Kesenjangan Tenaga Kerja AI di Bandung Teknopolis',
      category: 'premium',
      author: 'Rian Adiputra (AI Architect)',
      content: 'Laporan eksklusif kuartal ke-2 mengenai tingkat rekrutmen spesialis data dan Machine Learning Engineer. Silakan diskusikan model kompensasi standar industri.',
      tags: ['Teknologi', 'Gaji', 'AI'],
      likes: 31,
      repliesCount: 0,
      views: 420,
      isPinned: false,
      isSolved: false,
      votes: 0,
      aiSummary: 'Analisis mendalam mengenai kebutuhan talenta AI lokal. Gaji entry-level berkisar Rp 12-18jt, sementara senior level menyentuh Rp 40jt dengan tuntutan kecakapan LLM fine-tuning.',
      replies: []
    },
    {
      id: 'th-4',
      title: 'Tanya Jawab: Bagaimana Cara Mengurus Izin Edar P-IRT Terbaru Jabar?',
      category: 'qa',
      author: 'Hj. Lilis (Catering Hikmah)',
      content: 'Saya pelaku usaha katering rumahan di Garut, ingin naik kelas mengurus sertifikasi P-IRT agar bisa menitipkan produk kue kering ke toko retail modern. Apa saja dokumen wajibnya?',
      tags: ['Sertifikasi', 'UMKM', 'P-IRT'],
      likes: 18,
      repliesCount: 1,
      views: 125,
      isPinned: false,
      isSolved: true,
      votes: 0,
      aiSummary: 'Diskusi mengenai syarat administratif P-IRT mandiri di Jawa Barat. Disarankan mengurus secara online melalui OSS RBA dan berkoordinasi dengan Dinkes setempat untuk penyuluhan PKP.',
      replies: [
        { id: 'rep-4-1', author: 'Sutisna (Dinkes Jabar)', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80', content: 'Silakan ajukan akun OSS RBA dulu bu. Setelah terbit NIB, masuk ke menu SPP-IRT di aplikasi BPOM, lalu ikuti Penyuluhan Keamanan Pangan (PKP) gratis yang diselenggarakan Dinkes Garut terdekat.', isSolvedAnswer: true, likes: 11, quote: '' }
      ]
    },
    {
      id: 'th-5',
      title: 'Polling: Rencana Penerapan Zero-Emission Zone di Braga Bandung',
      category: 'polling',
      author: 'Rizky Akbar (Bandung Urbanist)',
      content: 'Rencana Dishub Bandung untuk mengkhususkan kawasan bersejarah Braga hanya bagi pedestrian dan kendaraan listrik mulai kuartal depan. Setujukah Anda?',
      tags: ['TataKota', 'Bandung', 'Environment', 'Polling'],
      likes: 42,
      repliesCount: 0,
      views: 295,
      isPinned: false,
      isSolved: false,
      votes: 210,
      polling: {
        question: 'Setujukah Anda dengan ZEZ di Braga?',
        options: [
          { text: 'Sangat Setuju (Kurangi Polusi & Macet)', votes: 124 },
          { text: 'Setuju dengan Syarat Lahan Parkir Memadai', votes: 68 },
          { text: 'Tidak Setuju (Merugikan Pelaku Toko Braga)', votes: 18 }
        ],
        totalVotes: 210,
        userVotedIdx: -1
      },
      aiSummary: 'Sebagian besar koresponden setuju (59%) dengan zona bebas emisi Braga, namun meminta penyediaan kantong parkir bertingkat yang terintegrasi di dekat lokasi.',
      replies: []
    },
    {
      id: 'th-6',
      title: '[PREMIUM] Akses Pendanaan Venture Capital untuk Startup AgriTech Priangan',
      category: 'premium',
      author: 'Sandi Wijaya (Kadin Jabar)',
      content: 'Laporan jaringan investor lokal and global yang memprioritaskan pendanaan hijau sektor pertanian presisi di pegunungan Priangan Timur Jabar. Unduh berkas kurasi lengkap di sini.',
      tags: ['Pendanaan', 'AgriTech', 'VentureCapital'],
      likes: 56,
      repliesCount: 0,
      views: 310,
      isPinned: false,
      isSolved: false,
      votes: 0,
      aiSummary: 'Dokumen panduan menyusun pitchdeck yang menarik minat pemodal ventura sosial untuk modernisasi agrikultur Jabar.',
      replies: []
    },
    {
      id: 'th-7',
      title: 'Diskusi: Pengaruh Logistik Patimban Terhadap Efisiensi Distribusi Pantai Utara',
      category: 'regional',
      author: 'Supardi (Asosiasi Logistik)',
      content: 'Sejauh mana efisiensi pemangkasan waktu kirim barang manufaktur setelah Pelabuhan Patimban beroperasi penuh dibanding Tanjung Priok untuk pabrik di Karawang dan Subang?',
      tags: ['Logistik', 'Infrastruktur', 'Patimban'],
      likes: 15,
      repliesCount: 0,
      views: 94,
      isPinned: false,
      isSolved: false,
      votes: 0,
      aiSummary: 'Pengguna mendiskusikan penurunan biaya logistik kontainer sebesar 15-20% untuk koridor Subang-Majalengka karena kedekatan akses pelabuhan baru Patimban.',
      replies: []
    },
    {
      id: 'th-8',
      title: 'Tanya Jawab: Standar Kemasan Retort untuk Rendang Kemasan Ekspor',
      category: 'qa',
      author: 'Yanti (Dapur Selera)',
      content: 'Apakah ada yang tahu penyedia pouch kemasan tahan panas (retort pouch) lokal Jabar yang bersertifikat BPOM untuk sterilisasi rendang matang dengan autoclave?',
      tags: ['Kemasan', 'Ekspor', 'Kuliner'],
      likes: 22,
      repliesCount: 1,
      views: 140,
      isPinned: false,
      isSolved: true,
      votes: 0,
      aiSummary: 'Penyedia kemasan bersertifikasi direkomendasikan berada di daerah Cikarang atau Rancaekek dengan minimal pemesanan ramah UMKM.',
      replies: [
        { id: 'rep-8-1', author: 'Hendra Setiawan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', content: 'Bisa cek PT Ranca Pack di Bandung Timur. Mereka melayani custom pouch retort tahan suhu 121 derajat Celcius dengan MOQ bersahabat untuk skala industri kecil.', isSolvedAnswer: true, likes: 9, quote: '' }
      ]
    },
    {
      id: 'th-9',
      title: 'Diskusi: Pemanfaatan Energi Surya untuk Pengeringan Gabah di Indramayu',
      category: 'inovasi',
      author: 'Dr. Eng. Hermawan (Pusat Riset Mekatronika)',
      content: 'Kami sedang menguji coba alat pengering padi bertenaga hibrida (solar panel & biomassa sekam) berbiaya murah untuk mengantisipasi musim hujan ekstrem di lumbung padi Indramayu.',
      tags: ['Inovasi', 'Pertanian', 'SolarPanel'],
      likes: 38,
      repliesCount: 0,
      views: 185,
      isPinned: false,
      isSolved: false,
      votes: 0,
      aiSummary: 'Proyek riset pengeringan padi ramah lingkungan yang mampu mengurangi kadar air hingga di bawah 14% dalam waktu setengah hari tanpa sinar matahari langsung.',
      replies: []
    },
    {
      id: 'th-10',
      title: 'Polling: Urgensi Kereta Cepat Jakarta-Surabaya via Kertajati',
      category: 'polling',
      author: 'Andri (Pemerhati Transportasi)',
      content: 'Bagaimana pandangan wargi jika trase perpanjangan Whoosh Kereta Cepat Jakarta-Surabaya diarahkan melewati Bandara Kertajati Majalengka dibanding rute Selatan?',
      tags: ['Transportasi', 'Kertajati', 'Whoosh', 'Polling'],
      likes: 29,
      repliesCount: 0,
      views: 215,
      isPinned: false,
      isSolved: false,
      votes: 182,
      polling: {
        question: 'Trase Whoosh via Kertajati?',
        options: [
          { text: 'Sangat Urgen (Aktivasi Bandara & Rebana)', votes: 122 },
          { text: 'Rute Selatan Lebih Baik (Bandung-Tasik-Yogya)', votes: 48 },
          { text: 'Cukup Maksimalkan Tol & KA Biasa', votes: 12 }
        ],
        totalVotes: 182,
        userVotedIdx: -1
      },
      aiSummary: 'Hasil jajak pendapat condong menghendaki stasiun Whoosh berada di Kertajati (67%) untuk mengakselerasi konektivitas logistik penerbangan internasional Jawa Barat.',
      replies: []
    }
  ];

  const defaultListings = [
    {
      id: 'list-1',
      title: 'Peralatan Ekstraksi Minyak Atsiri Stainless 316',
      type: 'jual',
      category: 'Mesin & Industri',
      price: 24500000,
      discount: 2000000,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80',
      location: 'Kota Bandung',
      condition: 'Baru',
      stock: 5,
      rating: 4.8,
      reviewsCount: 15,
      seller: { name: 'Atsiri Modern Bandung', reputation: 97, verified: true, phone: '08123456789', email: 'sales@atsirimodern.id' },
      description: 'Mesin ekstraksi minyak atsiri kapasitas 50 liter bahan stainless steel 316 tahan karat, pemanas listrik otomatis.',
      tags: ['Mesin', 'Atsiri', 'Stainless'],
      aiSuggestions: {
        seoTitle: 'Jual Mesin Ekstraksi Atsiri Bandung Stainless 316 Murah',
        translatedTitle: 'Stainless Steel 316 Essential Oil Extraction Equipment',
        priceAnalysis: 'Harga sangat kompetitif untuk grade stainless steel 316 food-grade.',
        fraudCheck: 'TIDAK TERDETEKSI ANOMALI.'
      }
    },
    {
      id: 'list-2',
      title: 'Lahan Kebun Hidroponik Greenhouse 500m2',
      type: 'sewa',
      category: 'Pertanian',
      price: 1500000,
      image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=300&q=80',
      location: 'Kab. Bandung Barat',
      condition: 'Siap Pakai',
      rating: 4.6,
      reviewsCount: 9,
      seller: { name: 'Agri Jaya Mandiri', reputation: 92, verified: false, phone: '08123456780', email: 'rent@agrijaya.com' },
      description: 'Disewakan greenhouse siap pakai lengkap dengan instalasi NFT pipa PVC, tandon air, pompa, dan jaringan listrik di area Lembang dingin.',
      tags: ['Greenhouse', 'Sewa', 'Hidroponik'],
      rentalInfo: {
        deposit: 1000000,
        lateFee: 100000,
        minDuration: 6
      },
      aiSuggestions: {
        seoTitle: 'Sewa Greenhouse Lembang Bandung Siap Pakai Murah',
        translatedTitle: 'Hydroponics Greenhouse Lease Lembang 500sqm',
        priceAnalysis: 'Harga sewa di Lembang berkisar Rp 1.500.000 - Rp 2.000.000/bulan untuk fasilitas serupa.',
        fraudCheck: 'TIDAK TERDETEKSI ANOMALI.'
      }
    },
    {
      id: 'list-3',
      title: 'Jasa Drone Penyemprotan DJI Agras T30 + Pilot',
      type: 'sewa',
      category: 'Pertanian',
      price: 350000,
      image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=300&q=80',
      location: 'Kab. Indramayu',
      condition: 'Sangat Baik',
      rating: 4.9,
      reviewsCount: 8,
      seller: { name: 'Dronesia Agro Lestari', reputation: 99, verified: true, phone: '08987654321', email: 'rent@dronesia.id' },
      description: 'Layanan penyemprotan pupuk cair & pestisida presisi menggunakan armada drone pertanian DJI Agras T30. Termasuk pilot bersertifikat FASI.',
      tags: ['Sewa', 'Drone', 'Agrotech'],
      rentalInfo: {
        deposit: 500000,
        lateFee: 50000,
        minDuration: 2
      },
      aiSuggestions: {
        seoTitle: 'Jasa Penyemprotan Drone DJI Agras Indramayu Cepat',
        translatedTitle: 'DJI Agras T30 Agricultural Spraying Drone Service',
        priceAnalysis: 'Tarif pasaran penyemprotan drone berkisar Rp 300.000 - Rp 450.000 per hektar di Jabar.',
        fraudCheck: 'TIDAK TERDETEKSI ANOMALI.'
      }
    },
    {
      id: 'list-4',
      title: 'Generator Set Silent Cummins 15 kVA SUS',
      type: 'jual',
      category: 'Mesin & Industri',
      price: 15500000,
      discount: 500000,
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=300&q=80',
      location: 'Kab. Karawang',
      condition: 'Baru',
      stock: 2,
      rating: 4.9,
      reviewsCount: 7,
      seller: { name: 'Karawang Powerindo', reputation: 94, verified: true, phone: '08139876543', email: 'sales@powerindo.com' },
      description: 'Genset silent dengan pelindung kebisingan maksimal, sangat cocok untuk backup daya restoran, kantor skala medium, atau industri kreatif.',
      tags: ['Mesin', 'Daya', 'Genset'],
      aiSuggestions: {
        seoTitle: 'Jual Genset Silent Cummins 15 kVA Murah Karawang',
        translatedTitle: 'Silent Generator Cummins 15 kVA Stainless Steel',
        priceAnalysis: 'Harga rata-rata pasar untuk tipe silent Cummins 15 kVA berkisar Rp 16.500.000.',
        fraudCheck: 'TIDAK TERDETEKSI ANOMALI.'
      }
    },
    {
      id: 'list-5',
      title: 'Konsultasi ISO 22000 & Hazard Analysis (HACCP) Pangan',
      type: 'jasa',
      category: 'Jasa Profesional',
      price: 3500000,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=300&q=80',
      location: 'Kota Bandung',
      condition: 'Layanan Kontrak',
      rating: 4.9,
      reviewsCount: 11,
      seller: { name: 'Indo Quality Consultant', reputation: 98, verified: true, phone: '08129990001', email: 'info@indoquality.id' },
      description: 'Paket pendampingan penuh sertifikasi ISO 22000 & penyusunan dokumen HACCP untuk pabrik pengolahan pangan, katering skala besar, dan UMKM ekspor.',
      tags: ['Konsultan', 'Sertifikasi', 'ISO', 'HACCP'],
      aiSuggestions: {
        seoTitle: 'Jasa Sertifikasi ISO 22000 & HACCP Bandung Terpercaya',
        translatedTitle: 'ISO 22000 & HACCP Food Safety Consultancy Service',
        priceAnalysis: 'Konsultasi paket lengkap sejenis biasanya ditawarkan di kisaran Rp 4-6jt.',
        fraudCheck: 'TIDAK TERDETEKSI ANOMALI.'
      }
    },
    {
      id: 'list-6',
      title: 'Lowongan: Ahli Agronomi Hidroponik Skala Industri',
      type: 'lowongan',
      category: 'Lowongan Kerja',
      price: 8000000,
      image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=300&q=80',
      location: 'Cianjur',
      condition: 'Full-Time',
      rating: 4.8,
      reviewsCount: 4,
      seller: { name: 'Cianjur Green Agro', reputation: 95, verified: true, phone: '08572223334', email: 'hrd@cianjurgreen.com' },
      description: 'Dibutuhkan supervisor budidaya hidroponik berpengalaman dalam mengelola nutrisi (AB Mix) dan otomasi greenhouse sayuran premium rute ritel Jakarta.',
      tags: ['Agronomis', 'Hidroponik', 'Loker', 'Pertanian'],
      aiSuggestions: {
        seoTitle: 'Lowongan Agronomis Hidroponik Cianjur Gaji 8 Juta',
        translatedTitle: 'Hydroponics Agronomist Industrial Supervisor Job',
        priceAnalysis: 'Gaji kompetitif di atas rata-rata regional Cianjur.',
        fraudCheck: 'TIDAK TERDETEKSI ANOMALI.'
      }
    },
    {
      id: 'list-7',
      title: 'Sewa Traktor Rotary Kubota L5018 + Operator',
      type: 'sewa',
      category: 'Pertanian',
      price: 250000,
      image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=300&q=80',
      location: 'Indramayu',
      condition: 'Sangat Baik',
      rating: 4.7,
      reviewsCount: 22,
      seller: { name: 'Koperasi Tani Makmur Indramayu', reputation: 97, verified: true, phone: '08124445556', email: 'makmur@indramayu.id' },
      description: 'Penyewaan traktor rotary Kubota 50 HP untuk olah tanah sawah cepat & presisi. Tarif sudah termasuk solar dan operator berpengalaman.',
      tags: ['Sewa', 'Traktor', 'AlatTani'],
      rentalInfo: {
        deposit: 100000,
        lateFee: 50000,
        minDuration: 4
      },
      aiSuggestions: {
        seoTitle: 'Sewa Traktor Kubota Indramayu Murah Termasuk Operator',
        translatedTitle: 'Kubota Tractor Rental Indramayu with Operator',
        priceAnalysis: 'Tarif standar sewa traktor rotary regional Indramayu berkisar Rp 250.000 - Rp 300.000 per jam.',
        fraudCheck: 'TIDAK TERDETEKSI ANOMALI.'
      }
    },
    {
      id: 'list-8',
      title: 'Panduan Ekspor Kopi Jawa Barat ke Uni Eropa (E-Book)',
      type: 'digital',
      category: 'Digital Product',
      price: 199000,
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80',
      location: 'Sumedang',
      condition: 'Produk Digital',
      rating: 5.0,
      reviewsCount: 47,
      seller: { name: 'Priangan Coffee Academy', reputation: 99, verified: true, phone: '08129898121', email: 'academy@priangancoffee.id' },
      description: 'Panduan lengkap berisi dokumen administrasi, regulasi bea cukai Uni Eropa, standar sertifikasi kopi organik, dan kontak pembeli potensial di Jerman, Belanda, & Prancis.',
      tags: ['Ebook', 'Kopi', 'Ekspor', 'Panduan'],
      aiSuggestions: {
        seoTitle: 'Download Ebook Panduan Ekspor Kopi Jabar ke Eropa',
        translatedTitle: 'E-Book: Exporting West Java Coffee to European Union',
        priceAnalysis: 'Harga terjangkau untuk materi riset pasar premium khusus.',
        fraudCheck: 'PRODUK DISETUJUI & DIVALIDASI SISTEM.'
      }
    },
    {
      id: 'list-9',
      title: 'Pupuk Organik Cair Hayati Jabar Subur (Paket 5 Liter)',
      type: 'jual',
      category: 'Pertanian',
      price: 125000,
      image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=300&q=80',
      location: 'Cianjur',
      condition: 'Baru',
      stock: 50,
      rating: 4.8,
      reviewsCount: 19,
      seller: { name: 'Tani Jaya Makmur', reputation: 96, verified: true, phone: '081234567890', email: 'sales@tanijaya.com' },
      description: 'Pupuk organik cair hayati formula khusus kaya mikroba aktif penambat nitrogen dan pelarut fosfat untuk meningkatkan hasil panen padi dan sayuran.',
      tags: ['Pupuk', 'Pertanian', 'Organik'],
      aiSuggestions: {
        seoTitle: 'Jual Pupuk Organik Cair Hayati Jabar Subur Murah',
        translatedTitle: 'Jabar Subur Liquid Bio-Organic Fertilizer 5L',
        priceAnalysis: 'Harga terjangkau dan sangat ekonomis untuk paket 5 liter.',
        fraudCheck: 'TIDAK TERDETEKSI ANOMALI.'
      }
    },
    {
      id: 'list-10',
      title: 'Sewa Ruang Meeting Co-Working Space Setiabudi Bandung',
      type: 'sewa',
      category: 'Properti',
      price: 150000,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=300&q=80',
      location: 'Kota Bandung',
      condition: 'Sangat Bagus',
      rating: 4.9,
      reviewsCount: 15,
      seller: { name: 'Setiabudi Hub & Space', reputation: 98, verified: true, phone: '081198765432', email: 'booking@setiabudihub.com' },
      description: 'Ruang rapat modern dengan fasilitas smart TV, proyektor, koneksi Wi-Fi ultra cepat, papan tulis, free flow kopi/teh, berkapasitas hingga 12 orang.',
      tags: ['Sewa', 'Ruang Rapat', 'Kantor'],
      rentalInfo: {
        deposit: 200000,
        lateFee: 50000,
        minDuration: 2
      },
      aiSuggestions: {
        seoTitle: 'Sewa Ruang Meeting Bandung Setiabudi Murah Fasilitas Lengkap',
        translatedTitle: 'Modern Meeting Room Rental Setiabudi Bandung',
        priceAnalysis: 'Tarif sewa kompetitif untuk lokasi strategis di area Setiabudi.',
        fraudCheck: 'TIDAK TERDETEKSI ANOMALI.'
      }
    }
  ];

  if (force || !localStorage.getItem(forumKey)) {
    localStorage.setItem(forumKey, JSON.stringify(defaultThreads));
  }
  if (force || !localStorage.getItem(mktKey)) {
    localStorage.setItem(mktKey, JSON.stringify(defaultListings));
  }
}

interface CommunityMarketplaceHubProps {
  user: any;
  initialTab?: 'dashboard' | 'forum' | 'marketplace' | 'directory' | 'brands' | 'products' | 'jobs' | 'chat' | 'organizations' | 'authors' | 'events';
  isForumOnly?: boolean;
  isJobsOnly?: boolean;
  isDirectoryOnly?: boolean;
  isBrandDirectoryOnly?: boolean;
  isProductDirectoryOnly?: boolean;
  isOrganizationDirectoryOnly?: boolean;
  isAuthorDirectoryOnly?: boolean;
  isEventDirectoryOnly?: boolean;
  onTabChange?: (tab: string) => void;
  escrowTransactions?: any[];
  setEscrowTransactions?: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function CommunityMarketplaceHub({ 
  user, 
  initialTab, 
  isForumOnly, 
  isJobsOnly,
  isDirectoryOnly, 
  isBrandDirectoryOnly, 
  isProductDirectoryOnly, 
  isOrganizationDirectoryOnly, 
  isAuthorDirectoryOnly,
  isEventDirectoryOnly,
  onTabChange,
  escrowTransactions: externalEscrowTransactions,
  setEscrowTransactions: externalSetEscrowTransactions
}: CommunityMarketplaceHubProps) {
  // 1. NAVIGATION STATES
  const [activeTab, setActiveTab] = useState<'dashboard' | 'forum' | 'marketplace' | 'directory' | 'brands' | 'products' | 'jobs' | 'chat' | 'organizations' | 'authors' | 'events' | 'escrow'>(initialTab || 'dashboard');
  const [universalSearch, setUniversalSearch] = useState('');

  const effectiveTab = isForumOnly 
    ? (activeTab === 'chat' ? 'chat' : activeTab === 'dashboard' ? 'dashboard' : 'forum') 
    : isJobsOnly
      ? 'jobs'
      : isDirectoryOnly 
        ? 'directory' 
        : isBrandDirectoryOnly 
          ? 'brands' 
          : isProductDirectoryOnly 
            ? 'products' 
            : isOrganizationDirectoryOnly
              ? 'organizations'
              : isAuthorDirectoryOnly
                ? 'authors'
                : isEventDirectoryOnly
                  ? 'events'
                  : activeTab;

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);
  
  // Current user representation (Simulated context fallback)
  const currentUser = user ? {
    id: user.id || 'u-1',
    name: user.fullName || user.name || 'Pengguna',
    email: user.email || 'user@infobos.id',
    role: user.role || 'MEMBER',
    reputation: user.reputation || 95,
    completionRate: user.completionRate || 100,
    successRate: user.successRate || 95,
    responseTime: user.responseTime || '< 15 menit',
    badges: user.badges || ['Anggota Terdaftar', 'Komunitas Jabar'],
    avatar: user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'
  } : {
    id: 'u-1',
    name: 'Wira Wijaya',
    email: 'wira@infobos.id',
    role: 'PREMIUM_MEMBER',
    reputation: 98,
    completionRate: 100,
    successRate: 98,
    responseTime: '< 5 menit',
    badges: ['Verifikasi Identitas', 'Top Kontributor', 'Mitra Proyek'],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'
  };

  // LOCAL MEMBER LOGIN STATES FOR MARKETPLACE (WITHOUT FIREBASE)
  const [marketplaceUser, setMarketplaceUser] = useState<any>(() => {
    const saved = localStorage.getItem('infobos_marketplace_logged_in_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    // Return null on first load so the login form is shown in the Marketplace section
    return null;
  });

  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginRole, setLoginRole] = useState<'MEMBER' | 'PREMIUM_MEMBER'>('MEMBER');

  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerRole, setRegisterRole] = useState<'MEMBER' | 'PREMIUM_MEMBER'>('MEMBER');
  const [authError, setAuthError] = useState('');

  const [selectedBrandId, setSelectedBrandId] = useState<string | null>('brand-1');
  const [selectedProductId, setSelectedProductId] = useState<string | null>('list-1');

  // Followed Topics / Users
  const [followed, setFollowed] = useState<string[]>(['regional-forum', 'smart-city-tech']);
  const toggleFollow = (id: string) => {
    setFollowed(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  // 2. COMMUNITY OS: FORUM DATA & STATES
  const [forumCategories] = useState([
    { id: 'all', name: 'Semua Diskusi', count: 124 },
    { id: 'regional', name: 'Forum Regional Jabar', count: 42, isPrivate: false },
    { id: 'industri', name: 'Forum Industri & Supply', count: 28, isPrivate: false },
    { id: 'premium', name: 'Forum Premium Executive', count: 18, isPrivate: true },
    { id: 'qa', name: 'Tanya Jawab (Q&A)', count: 21, isPrivate: false },
    { id: 'polling', name: 'Polling Kebijakan & Tren', count: 15, isPrivate: false },
    { id: 'inovasi', name: 'Ide & Inovasi', count: 12, isPrivate: false }
  ]);
  const [selectedForumCategory, setSelectedForumCategory] = useState('all');
  
  const [threads, setThreads] = useState<any[]>(() => {
    initializeSystemData();
    const local = localStorage.getItem('infobos_forum_threads');
    return local ? JSON.parse(local) : [
    {
      id: 'th-1',
      title: 'Tanya Jawab: Solusi Rantai Pasok Gula Kelapa di Jabar Selatan',
      category: 'qa',
      author: 'Asep Sunandar (Koperasi Jabar)',
      content: 'Kami sedang kesulitan mencari distributor pengiriman cepat untuk wilayah Cianjur Selatan. Apakah ada rekomendasi logistik berpendingin yang terjangkau?',
      tags: ['Logistik', 'SupplyChain', 'Q&A'],
      likes: 12,
      repliesCount: 4,
      views: 180,
      isPinned: true,
      isSolved: true,
      votes: 14,
      hasVoted: false,
      aiSummary: 'Diskusi seputar kendala pengiriman logistik gula kelapa di Cianjur Selatan. Anggota forum menyarankan penggunaan armada logistik daerah berbasis IoT untuk memantau suhu bahan.',
      replies: [
        { id: 'rep-1', author: 'Budi Santoso', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', content: 'Coba gunakan Mitra Logistik Jabar Express di terminal Pasirhayam, mereka menyediakan armada cold-storage mini untuk rute pegunungan.', isSolvedAnswer: true, likes: 8, quote: '' },
        { id: 'rep-2', author: 'Siti Rahma', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', content: 'Betul, kami biasa pakai mereka untuk distribusi agro industri. Tarifnya bisa dinegosiasikan jika kontrak bulanan.', isSolvedAnswer: false, likes: 3, quote: 'Budi Santoso: Coba gunakan Mitra Logistik Jabar Express...' }
      ]
    },
    {
      id: 'th-2',
      title: 'Polling: Preferensi Lokasi Sentra Industri Halal Jabar 2026',
      category: 'polling',
      author: 'Dr. Gunawan (Pusat Riset Ekonomi)',
      content: 'Menurut para pelaku usaha, mana koridor ekonomi yang paling matang untuk perluasan klaster industri makanan minuman halal?',
      tags: ['Sektoral', 'Investasi', 'Polling'],
      likes: 24,
      repliesCount: 2,
      views: 340,
      isPinned: false,
      isSolved: false,
      votes: 145,
      polling: {
        question: 'Sentra terbaik untuk industri halal baru?',
        options: [
          { text: 'Koridor Patimban Raya (Subang)', votes: 68 },
          { text: 'Kawasan Kertajati (Majalengka)', votes: 45 },
          { text: 'Bandung Raya (Rancaekek)', votes: 32 }
        ],
        totalVotes: 145,
        userVotedIdx: -1
      },
      aiSummary: 'Polling menunjukkan minat tinggi pelaku usaha pada Koridor Patimban Raya (47%) karena akses pelabuhan ekspor langsung, diikuti Kertajati Aero-City.',
      replies: []
    },
    {
      id: 'th-3',
      title: '[PREMIUM] Analisis Kesenjangan Tenaga Kerja AI di Bandung Teknopolis',
      category: 'premium',
      author: 'Rian Adiputra (AI Architect)',
      content: 'Laporan eksklusif kuartal ke-2 mengenai tingkat rekrutmen spesialis data dan Machine Learning Engineer. Silakan diskusikan model kompensasi standar industri.',
      tags: ['Teknologi', 'Gaji', 'AI'],
      likes: 31,
      repliesCount: 5,
      views: 420,
      isPinned: false,
      isSolved: false,
      votes: 0,
      aiSummary: 'Analisis mendalam mengenai kebutuhan talenta AI lokal. Gaji entry-level berkisar Rp 12-18jt, sementara senior level menyentuh Rp 40jt dengan tuntutan kecakapan LLM fine-tuning.',
      replies: []
    },
    {
      id: 'th-4',
      title: 'Tanya Jawab: Bagaimana Cara Mengurus Izin Edar P-IRT Terbaru Jabar?',
      category: 'qa',
      author: 'Hj. Lilis (Catering Hikmah)',
      content: 'Saya pelaku usaha katering rumahan di Garut, ingin naik kelas mengurus sertifikasi P-IRT agar bisa menitipkan produk kue kering ke toko retail modern. Apa saja dokumen wajibnya?',
      tags: ['Sertifikasi', 'UMKM', 'P-IRT'],
      likes: 18,
      repliesCount: 1,
      views: 125,
      isPinned: false,
      isSolved: true,
      votes: 0,
      aiSummary: 'Diskusi mengenai syarat administratif P-IRT mandiri di Jawa Barat. Disarankan mengurus secara online melalui OSS RBA dan berkoordinasi dengan Dinkes setempat untuk penyuluhan PKP.',
      replies: [
        { id: 'rep-4-1', author: 'Sutisna (Dinkes Jabar)', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80', content: 'Silakan ajukan akun OSS RBA dulu bu. Setelah terbit NIB, masuk ke menu SPP-IRT di aplikasi BPOM, lalu ikuti Penyuluhan Keamanan Pangan (PKP) gratis yang diselenggarakan Dinkes Garut terdekat.', isSolvedAnswer: true, likes: 11, quote: '' }
      ]
    },
    {
      id: 'th-5',
      title: 'Polling: Rencana Penerapan Zero-Emission Zone di Braga Bandung',
      category: 'polling',
      author: 'Rizky Akbar (Bandung Urbanist)',
      content: 'Rencana Dishub Bandung untuk mengkhususkan kawasan bersejarah Braga hanya bagi pedestrian dan kendaraan listrik mulai kuartal depan. Setujukah Anda?',
      tags: ['TataKota', 'Bandung', 'Environment', 'Polling'],
      likes: 42,
      repliesCount: 0,
      views: 295,
      isPinned: false,
      isSolved: false,
      votes: 210,
      polling: {
        question: 'Setujukah Anda dengan ZEZ di Braga?',
        options: [
          { text: 'Sangat Setuju (Kurangi Polusi & Macet)', votes: 124 },
          { text: 'Setuju dengan Syarat Lahan Parkir Memadai', votes: 68 },
          { text: 'Tidak Setuju (Merugikan Pelaku Toko Braga)', votes: 18 }
        ],
        totalVotes: 210,
        userVotedIdx: -1
      },
      aiSummary: 'Sebagian besar koresponden setuju (59%) dengan zona bebas emisi Braga, namun meminta penyediaan kantong parkir bertingkat yang terintegrasi di dekat lokasi.',
      replies: []
    },
    {
      id: 'th-6',
      title: '[PREMIUM] Akses Pendanaan Venture Capital untuk Startup AgriTech Priangan',
      category: 'premium',
      author: 'Sandi Wijaya (Kadin Jabar)',
      content: 'Laporan jaringan investor lokal dan global yang memprioritaskan pendanaan hijau sektor pertanian presisi di pegunungan Priangan Timur Jabar. Unduh berkas kurasi lengkap di sini.',
      tags: ['Pendanaan', 'AgriTech', 'VentureCapital'],
      likes: 56,
      repliesCount: 0,
      views: 310,
      isPinned: false,
      isSolved: false,
      votes: 0,
      aiSummary: 'Dokumen panduan menyusun pitchdeck yang menarik minat pemodal ventura sosial untuk modernisasi agrikultur Jabar.',
      replies: []
    },
    {
      id: 'th-7',
      title: 'Diskusi: Pengaruh Logistik Patimban Terhadap Efisiensi Distribusi Pantai Utara',
      category: 'regional',
      author: 'Supardi (Asosiasi Logistik)',
      content: 'Sejauh mana efisiensi pemangkasan waktu kirim barang manufaktur setelah Pelabuhan Patimban beroperasi penuh dibanding Tanjung Priok untuk pabrik di Karawang dan Subang?',
      tags: ['Logistik', 'Infrastruktur', 'Patimban'],
      likes: 15,
      repliesCount: 0,
      views: 94,
      isPinned: false,
      isSolved: false,
      votes: 0,
      aiSummary: 'Pengguna mendiskusikan penurunan biaya logistik kontainer sebesar 15-20% untuk koridor Subang-Majalengka karena kedekatan akses pelabuhan baru Patimban.',
      replies: []
    },
    {
      id: 'th-8',
      title: 'Tanya Jawab: Standar Kemasan Retort untuk Rendang Kemasan Ekspor',
      category: 'qa',
      author: 'Yanti (Dapur Selera)',
      content: 'Apakah ada yang tahu penyedia pouch kemasan tahan panas (retort pouch) lokal Jabar yang bersertifikat BPOM untuk sterilisasi rendang matang dengan autoclave?',
      tags: ['Kemasan', 'Ekspor', 'Kuliner'],
      likes: 22,
      repliesCount: 1,
      views: 140,
      isPinned: false,
      isSolved: true,
      votes: 0,
      aiSummary: 'Penyedia kemasan bersertifikasi direkomendasikan berada di daerah Cikarang atau Rancaekek dengan minimal pemesanan ramah UMKM.',
      replies: [
        { id: 'rep-8-1', author: 'Hendra Setiawan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', content: 'Bisa cek PT Ranca Pack di Bandung Timur. Mereka melayani custom pouch retort tahan suhu 121 derajat Celcius dengan MOQ bersahabat untuk skala industri kecil.', isSolvedAnswer: true, likes: 9, quote: '' }
      ]
    },
    {
      id: 'th-9',
      title: 'Diskusi: Pemanfaatan Energi Surya untuk Pengeringan Gabah di Indramayu',
      category: 'inovasi',
      author: 'Dr. Eng. Hermawan (Pusat Riset Mekatronika)',
      content: 'Kami sedang menguji coba alat pengering padi bertenaga hibrida (solar panel & biomassa sekam) berbiaya murah untuk mengantisipasi musim hujan ekstrem di lumbung padi Indramayu.',
      tags: ['Inovasi', 'Pertanian', 'SolarPanel'],
      likes: 38,
      repliesCount: 0,
      views: 185,
      isPinned: false,
      isSolved: false,
      votes: 0,
      aiSummary: 'Proyek riset pengeringan padi ramah lingkungan yang mampu mengurangi kadar air hingga di bawah 14% dalam waktu setengah hari tanpa sinar matahari langsung.',
      replies: []
    },
    {
      id: 'th-10',
      title: 'Polling: Urgensi Kereta Cepat Jakarta-Surabaya via Kertajati',
      category: 'polling',
      author: 'Andri (Pemerhati Transportasi)',
      content: 'Bagaimana pandangan wargi jika trase perpanjangan Whoosh Kereta Cepat Jakarta-Surabaya diarahkan melewati Bandara Kertajati Majalengka dibanding rute Selatan?',
      tags: ['Transportasi', 'Kertajati', 'Whoosh', 'Polling'],
      likes: 29,
      repliesCount: 0,
      views: 215,
      isPinned: false,
      isSolved: false,
      votes: 182,
      polling: {
        question: 'Trase Whoosh via Kertajati?',
        options: [
          { text: 'Sangat Urgen (Aktivasi Bandara & Rebana)', votes: 122 },
          { text: 'Rute Selatan Lebih Baik (Bandung-Tasik-Yogya)', votes: 48 },
          { text: 'Cukup Maksimalkan Tol & KA Biasa', votes: 12 }
        ],
        totalVotes: 182,
        userVotedIdx: -1
      },
      aiSummary: 'Hasil jajak pendapat condong menghendaki stasiun Whoosh berada di Kertajati (67%) untuk mengakselerasi konektivitas logistik penerbangan internasional Jawa Barat.',
      replies: []
    }
  ]; });

  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadContent, setNewThreadContent] = useState('');
  const [newThreadCategory, setNewThreadCategory] = useState('regional');
  const [newThreadTags, setNewThreadTags] = useState('');
  const [isCreatingThread, setIsCreatingThread] = useState(false);
  const [replyInput, setReplyInput] = useState('');
  const [quotedText, setQuotedText] = useState<string | null>(null);
  const [showAISummary, setShowAISummary] = useState<string | null>(null);

  // 3. MARKETPLACE OS: DECLARED STATES & DATA
  const [marketplaceType, setMarketplaceType] = useState<'all' | 'jual' | 'sewa' | 'jasa' | 'lowongan' | 'digital'>('all');
  const [marketplaceCategory, setMarketplaceCategory] = useState('all');
  
  // CREATE MARKETPLACE LISTING STATES
  const [isCreatingListing, setIsCreatingListing] = useState(false);
  const [newListingTitle, setNewListingTitle] = useState('');
  const [newListingType, setNewListingType] = useState<'jual' | 'sewa' | 'jasa' | 'lowongan' | 'digital'>('jual');
  const [newListingCategory, setNewListingCategory] = useState('Mesin & Industri');
  const [newListingPrice, setNewListingPrice] = useState(0);
  const [newListingLocation, setNewListingLocation] = useState('Kota Bandung');
  const [newListingDescription, setNewListingDescription] = useState('');
  const [newListingTags, setNewListingTags] = useState('');
  const [newListingCondition, setNewListingCondition] = useState('Baru');
  const [newListingImage, setNewListingImage] = useState('');

  const [listings, setListings] = useState<any[]>(() => {
    initializeSystemData();
    const local = localStorage.getItem('infobos_marketplace_listings');
    return local ? JSON.parse(local) : [
    {
      id: 'list-1',
      title: 'Peralatan Ekstraksi Minyak Atsiri Stainless 316',
      type: 'jual',
      category: 'Mesin & Industri',
      price: 24500000,
      discount: 2000000,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80',
      location: 'Kab. Bandung Barat',
      condition: 'Baru',
      stock: 3,
      rating: 4.8,
      reviewsCount: 15,
      seller: { name: 'Atsiri Tech Indonesia', reputation: 95, verified: true, phone: '08123456780', email: 'sales@atsiritech.com' },
      description: 'Mesin penyulingan atsiri kapasitas 100 Liter dengan material Food Grade SUS316. Garansi fabrikasi 1 tahun.',
      tags: ['Mesin', 'Pertanian', 'Atsiri'],
      aiSuggestions: {
        seoTitle: 'Mesin Atsiri SUS316 Kapasitas 100L Garansi Fabrikasi',
        translatedTitle: 'Stainless SUS316 Essential Oil Extractor 100L',
        priceAnalysis: 'Harga pasar berkisar Rp 26-28jt. Harga Anda sangat kompetitif!',
        fraudCheck: 'TIDAK TERDETEKSI ANOMALI. Akun seller terverifikasi SIUP & NIB.'
      }
    },
    {
      id: 'list-jasa-1',
      title: 'Jasa Konsultasi Sertifikasi Halal & NIB UMKM',
      type: 'jasa',
      category: 'Jasa Profesional',
      price: 1500000,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=300&q=80',
      location: 'Depok',
      condition: 'Layanan Kontrak',
      rating: 4.8,
      reviewsCount: 19,
      seller: { name: 'Kemitraan Legal Sejahtera', reputation: 97, verified: true, phone: '08122334455', email: 'legal@sejahtera.com' },
      description: 'Layanan lengkap pengurusan legalitas badan usaha katering, restoran, dan UMKM makanan minuman. Mulai dari pembuatan NIB, Surat Keterangan Usaha, hingga audit dokumen pengajuan Sertifikat Halal MUI.',
      tags: ['Legalitas', 'Halal', 'NIB', 'Konsultan'],
      aiSuggestions: {
        seoTitle: 'Jasa Pengurusan Sertifikat Halal & NIB Depok Terbaik',
        translatedTitle: 'Halal Certification & Business Registration Service',
        priceAnalysis: 'Harga pasar berkisar Rp 1.500.000 - Rp 2.500.000. Sangat direkomendasikan.',
        fraudCheck: 'TIDAK TERDETEKSI ANOMALI.'
      }
    },
    {
      id: 'list-lowongan-1',
      title: 'Lowongan: Operator Mesin CNC & Bubut Presisi',
      type: 'lowongan',
      category: 'Lowongan Kerja',
      price: 6500000,
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=300&q=80',
      location: 'Bekasi',
      condition: 'Full-Time',
      rating: 4.7,
      reviewsCount: 12,
      seller: { name: 'PT Presisi Teknik Utama', reputation: 96, verified: true, phone: '08112233445', email: 'hrd@presisiteknik.com' },
      description: 'Dibutuhkan segera Operator Mesin CNC dan Bubut manual berpengalaman minimal 2 tahun di bidang manufaktur komponen presisi otomotif.',
      tags: ['Operator', 'Manufaktur', 'CNC', 'Bubut'],
      aiSuggestions: {
        seoTitle: 'Lowongan Kerja Operator CNC Bubut Bekasi Gaji Menarik',
        translatedTitle: 'CNC Lathe Machine Operator Job Vacancy Bekasi',
        priceAnalysis: 'Standar gaji UMR Bekasi berkisar Rp 5.200.000 - Rp 6.800.000.',
        fraudCheck: 'TIDAK TERDETEKSI ANOMALI.'
      }
    },
    {
      id: 'list-2',
      title: 'Sewa Drone Pertanian DJI Agras T30 + Pilot Berlisensi',
      type: 'sewa',
      category: 'Pertanian',
      price: 1500000, // per hari
      image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=300&q=80',
      location: 'Majalengka',
      condition: 'Sangat Baik',
      rating: 4.9,
      reviewsCount: 8,
      seller: { name: 'Dronesia Agro Lestari', reputation: 99, verified: true, phone: '08987654321', email: 'rent@dronesia.id' },
      description: 'Layanan penyemprotan pfuk cair & pestisida presisi menggunakan armada drone pertanian DJI Agras T30. Termasuk pilot bersertifikat FASI.',
      tags: ['Sewa', 'Drone', 'Agrotech'],
      rentalInfo: {
        deposit: 500000,
        lateFee: 200000, // per jam terlambat
        minDuration: 2 // hari
      },
      aiSuggestions: {
        seoTitle: 'Jasa Sewa Drone DJI Agras T30 Majalengka Murah',
        translatedTitle: 'DJI Agras T30 Agricultural Drone Rental',
        priceAnalysis: 'Rata-rata sewa drone sejenis adalah Rp 1.800.000 per hari di Jabar.',
        fraudCheck: 'TIDAK TERDETEKSI ANOMALI.'
      }
    },
    {
      id: 'list-3',
      title: 'Dataset Anomali Curah Hujan & Spasial Padi Jabar 2020-2025',
      type: 'digital',
      category: 'Digital Product',
      price: 450000,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=300&q=80',
      location: 'Kota Bandung',
      condition: 'Produk Digital',
      rating: 5.0,
      reviewsCount: 34,
      seller: { name: 'Evolis Spatial Research', reputation: 97, verified: true, phone: '022-2501234', email: 'data@evolis.id' },
      description: 'Laporan spasial format GIS Shapefile & CSV yang merekam historis korelasi gagal panen akibat cuaca ekstrem di 27 Kabupaten/Kota Jawa Barat.',
      tags: ['Dataset', 'Siber', 'Pertanian'],
      aiSuggestions: {
        seoTitle: 'Unduh Dataset Spasial Padi & Curah Hujan Jawa Barat GIS',
        translatedTitle: 'West Java Paddy & Climate GIS Dataset 2020-2025',
        priceAnalysis: 'Dataset riset sejenis biasa dihargai Rp 750.000 ke atas.',
        fraudCheck: 'PRODUK DISETUJUI & DIVALIDASI SISTEM.'
      }
    },
    {
      id: 'list-4',
      title: 'Generator Set Silent Cummins 15 kVA SUS',
      type: 'jual',
      category: 'Mesin & Industri',
      price: 15500000,
      discount: 500000,
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=300&q=80',
      location: 'Kab. Karawang',
      condition: 'Baru',
      stock: 2,
      rating: 4.9,
      reviewsCount: 7,
      seller: { name: 'Karawang Powerindo', reputation: 94, verified: true, phone: '08139876543', email: 'sales@powerindo.com' },
      description: 'Genset silent dengan pelindung kebisingan maksimal, sangat cocok untuk backup daya restoran, kantor skala medium, atau industri kreatif.',
      tags: ['Mesin', 'Daya', 'Genset'],
      aiSuggestions: {
        seoTitle: 'Jual Genset Silent Cummins 15 kVA Murah Karawang',
        translatedTitle: 'Silent Generator Cummins 15 kVA Stainless Steel',
        priceAnalysis: 'Harga rata-rata pasar untuk tipe silent Cummins 15 kVA berkisar Rp 16.500.000.',
        fraudCheck: 'TIDAK TERDETEKSI ANOMALI.'
      }
    },
    {
      id: 'list-5',
      title: 'Konsultasi ISO 22000 & Hazard Analysis (HACCP) Pangan',
      type: 'jasa',
      category: 'Jasa Profesional',
      price: 3500000,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=300&q=80',
      location: 'Kota Bandung',
      condition: 'Layanan Kontrak',
      rating: 4.9,
      reviewsCount: 11,
      seller: { name: 'Indo Quality Consultant', reputation: 98, verified: true, phone: '08129990001', email: 'info@indoquality.id' },
      description: 'Paket pendampingan penuh sertifikasi ISO 22000 & penyusunan dokumen HACCP untuk pabrik pengolahan pangan, katering skala besar, dan UMKM ekspor.',
      tags: ['Konsultan', 'Sertifikasi', 'ISO', 'HACCP'],
      aiSuggestions: {
        seoTitle: 'Jasa Sertifikasi ISO 22000 & HACCP Bandung Terpercaya',
        translatedTitle: 'ISO 22000 & HACCP Food Safety Consultancy Service',
        priceAnalysis: 'Konsultasi paket lengkap sejenis biasanya ditawarkan di kisaran Rp 4-6jt.',
        fraudCheck: 'TIDAK TERDETEKSI ANOMALI.'
      }
    },
    {
      id: 'list-6',
      title: 'Lowongan: Ahli Agronomi Hidroponik Skala Industri',
      type: 'lowongan',
      category: 'Lowongan Kerja',
      price: 8000000,
      image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=300&q=80',
      location: 'Cianjur',
      condition: 'Full-Time',
      rating: 4.8,
      reviewsCount: 4,
      seller: { name: 'Cianjur Green Agro', reputation: 95, verified: true, phone: '08572223334', email: 'hrd@cianjurgreen.com' },
      description: 'Dibutuhkan supervisor budidaya hidroponik berpengalaman dalam mengelola nutrisi (AB Mix) dan otomasi greenhouse sayuran premium rute ritel Jakarta.',
      tags: ['Agronomis', 'Hidroponik', 'Loker', 'Pertanian'],
      aiSuggestions: {
        seoTitle: 'Lowongan Agronomis Hidroponik Cianjur Gaji 8 Juta',
        translatedTitle: 'Hydroponics Agronomist Industrial Supervisor Job',
        priceAnalysis: 'Gaji kompetitif di atas rata-rata regional Cianjur.',
        fraudCheck: 'TIDAK TERDETEKSI ANOMALI.'
      }
    },
    {
      id: 'list-7',
      title: 'Sewa Traktor Rotary Kubota L5018 + Operator',
      type: 'sewa',
      category: 'Pertanian',
      price: 250000, // per jam
      image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=300&q=80',
      location: 'Indramayu',
      condition: 'Sangat Baik',
      rating: 4.7,
      reviewsCount: 22,
      seller: { name: 'Koperasi Tani Makmur Indramayu', reputation: 97, verified: true, phone: '08124445556', email: 'makmur@indramayu.id' },
      description: 'Penyewaan traktor rotary Kubota 50 HP untuk olah tanah sawah cepat & presisi. Tarif sudah termasuk solar dan operator berpengalaman.',
      tags: ['Sewa', 'Traktor', 'AlatTani'],
      rentalInfo: {
        deposit: 100000,
        lateFee: 50000,
        minDuration: 4 // jam
      },
      aiSuggestions: {
        seoTitle: 'Sewa Traktor Kubota Indramayu Murah Termasuk Operator',
        translatedTitle: 'Kubota Tractor Rental Indramayu with Operator',
        priceAnalysis: 'Tarif standar sewa traktor rotary regional Indramayu berkisar Rp 250.000 - Rp 300.000 per jam.',
        fraudCheck: 'TIDAK TERDETEKSI ANOMALI.'
      }
    },
    {
      id: 'list-8',
      title: 'Panduan Ekspor Kopi Jawa Barat ke Uni Eropa (E-Book)',
      type: 'digital',
      category: 'Digital Product',
      price: 199000,
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80',
      location: 'Sumedang',
      condition: 'Produk Digital',
      rating: 5.0,
      reviewsCount: 47,
      seller: { name: 'Priangan Coffee Academy', reputation: 99, verified: true, phone: '08129898121', email: 'academy@priangancoffee.id' },
      description: 'Panduan lengkap berisi dokumen administrasi, regulasi bea cukai Uni Eropa, standar sertifikasi kopi organik, dan kontak pembeli potensial di Jerman, Belanda, & Prancis.',
      tags: ['Ebook', 'Kopi', 'Ekspor', 'Panduan'],
      aiSuggestions: {
        seoTitle: 'Download Ebook Panduan Ekspor Kopi Jabar ke Eropa',
        translatedTitle: 'E-Book: Exporting West Java Coffee to European Union',
        priceAnalysis: 'Harga terjangkau untuk materi riset pasar premium khusus.',
        fraudCheck: 'PRODUK DISETUJUI & DIVALIDASI SISTEM.'
      }
    },
    {
      id: 'list-9',
      title: 'Pupuk Organik Cair Hayati Jabar Subur (Paket 5 Liter)',
      type: 'jual',
      category: 'Pertanian',
      price: 125000,
      image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=300&q=80',
      location: 'Cianjur',
      condition: 'Baru',
      stock: 50,
      rating: 4.8,
      reviewsCount: 19,
      seller: { name: 'Tani Jaya Makmur', reputation: 96, verified: true, phone: '081234567890', email: 'sales@tanijaya.com' },
      description: 'Pupuk organik cair hayati formula khusus kaya mikroba aktif penambat nitrogen dan pelarut fosfat untuk meningkatkan hasil panen padi dan sayuran.',
      tags: ['Pupuk', 'Pertanian', 'Organik'],
      aiSuggestions: {
        seoTitle: 'Jual Pupuk Organik Cair Hayati Jabar Subur Murah',
        translatedTitle: 'Jabar Subur Liquid Bio-Organic Fertilizer 5L',
        priceAnalysis: 'Harga terjangkau dan sangat ekonomis untuk paket 5 liter.',
        fraudCheck: 'TIDAK TERDETEKSI ANOMALI.'
      }
    },
    {
      id: 'list-10',
      title: 'Sewa Ruang Meeting Co-Working Space Setiabudi Bandung',
      type: 'sewa',
      category: 'Properti',
      price: 150000, // per jam
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=300&q=80',
      location: 'Kota Bandung',
      condition: 'Sangat Bagus',
      rating: 4.9,
      reviewsCount: 15,
      seller: { name: 'Setiabudi Hub & Space', reputation: 98, verified: true, phone: '081198765432', email: 'booking@setiabudihub.com' },
      description: 'Ruang rapat modern dengan fasilitas smart TV, proyektor, koneksi Wi-Fi ultra cepat, papan tulis, free flow kopi/teh, berkapasitas hingga 12 orang.',
      tags: ['Sewa', 'Ruang Rapat', 'Kantor'],
      rentalInfo: {
        deposit: 200000,
        lateFee: 50000,
        minDuration: 2 // jam
      },
      aiSuggestions: {
        seoTitle: 'Sewa Ruang Meeting Bandung Setiabudi Murah Fasilitas Lengkap',
        translatedTitle: 'Modern Meeting Room Rental Setiabudi Bandung',
        priceAnalysis: 'Tarif sewa kompetitif untuk lokasi strategis di area Setiabudi.',
        fraudCheck: 'TIDAK TERDETEKSI ANOMALI.'
      }
    }
  ]; });

  const [selectedListing, setSelectedListing] = useState<any | null>(null);
  
  // RENTAL ACTIONS STATE
  const [showRentModal, setShowRentModal] = useState(false);
  const [rentStartDate, setRentStartDate] = useState('2026-07-01');
  const [rentDuration, setRentDuration] = useState(2);
  
  // NEGOTIATION SUITE STATES
  const [showNegotiateModal, setShowNegotiateModal] = useState(false);
  const [offerPrice, setOfferPrice] = useState<number>(0);
  const [offerHistory, setOfferHistory] = useState<any[]>([]);

  // ESCROW FLOW STATE
  const [internalEscrowTransactions, setInternalEscrowTransactions] = useState<any[]>([
    { id: 'esc-1', itemTitle: 'Alat Ekstraksi Minyak Atsiri', amount: 22500000, status: 'DITAHAN', seller: 'Atsiri Tech Indonesia', date: '30 Juni 2026' }
  ]);

  const escrowTransactions = externalEscrowTransactions || internalEscrowTransactions;
  const setEscrowTransactions = externalSetEscrowTransactions || setInternalEscrowTransactions;

  // AI PRODUCT ASSISTANT DYNAMIC SIMULATOR
  const [aiSelectedTool, setAiSelectedTool] = useState<'seo' | 'translate' | 'price' | 'none'>('none');
  const [aiDraftTitle, setAiDraftTitle] = useState('');
  const [aiDraftDescription, setAiDraftDescription] = useState('');
  const [aiGeneratedOutput, setAiGeneratedOutput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  // 4. BUSINESS DIRECTORY STATES & DATA
  const [companies] = useState(() => {
    const local = localStorage.getItem('infobos_companies_directory');
    return local ? JSON.parse(local) : [
    {
      id: 'co-1',
      name: 'PT Jabar Digital Agro (JDA)',
      industry: 'Agroteknologi',
      employees: '50-100',
      branches: 'Bandung, Cianjur, Garut',
      rating: 4.8,
      isVerified: true,
      certified: 'Sertifikasi NIB, ISO 9001:2015, Halal',
      about: 'Penyedia sensor IoT irigasi, drone survei, dan teknologi monitoring kelembaban tanah untuk optimasi pertanian holistik.',
      catalog: [
        { name: 'Soil Sensor Node v4.0', price: 'Rp 1.200.000' },
        { name: 'Stasiun Cuaca Mikro IoT', price: 'Rp 6.500.000' }
      ]
    },
    {
      id: 'co-2',
      name: 'CV Patimban Logistik Global',
      industry: 'Logistik & Distribusi',
      employees: '20-50',
      branches: 'Subang, Indramayu, Cirebon',
      rating: 4.6,
      isVerified: true,
      certified: 'Sertifikasi Asosiasi Logistik Indonesia (ALI)',
      about: 'Spesialis pergudangan berpendingin, bea cukai pelabuhan, dan angkutan truk berat interkoneksi Kawasan Rebana.',
      catalog: [
        { name: 'Sewa Cold-Storage per Ton / Bulan', price: 'Rp 450.000' },
        { name: 'Sewa Flatbed Container Truck', price: 'Hubungi Kontak' }
      ]
    }
  ]; });
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [leadFormName, setLeadFormName] = useState('');
  const [leadFormMessage, setLeadFormMessage] = useState('');
  const [leadSuccess, setLeadSuccess] = useState(false);

  // 4b. ORGANIZATIONS DIRECTORY STATES & DATA
  const [organizations, setOrganizations] = useState(() => {
    const local = localStorage.getItem('infobos_organizations_directory');
    return local ? JSON.parse(local) : [
      {
        id: 'org-1',
        name: 'Wahana Lingkungan Hidup Jabar (WALHI)',
        type: 'Lembaga Swadaya Masyarakat (LSM)',
        focusArea: 'Lingkungan Hidup & Advokasi Hijau',
        volunteers: '500+ Relawan',
        headquarters: 'Bandung',
        rating: 4.9,
        isVerified: true,
        certified: 'Akreditasi Kemenkumham RI, Anggota WALHI Nasional',
        about: 'Organisasi lingkungan hidup independen terbesar di Jawa Barat, mendedikasikan programnya untuk keadilan ekologis, pelestarian hutan Priangan, dan advokasi masyarakat adat terdampak industri.',
        programs: [
          { name: 'Sertifikasi Hutan Lestari Priangan', budget: 'Rp 25.000.000 (Hibah)' },
          { name: 'Kemitraan Edukasi Komunitas Hijau', budget: 'Buka Umum' }
        ]
      },
      {
        id: 'org-2',
        name: 'Asosiasi Internet of Things Indonesia (ASIOTI)',
        type: 'Asosiasi Industri & Profesi',
        focusArea: 'Standardisasi IoT & Akselerasi Digital',
        volunteers: '120 Korporasi',
        headquarters: 'Depok & Bandung',
        rating: 4.8,
        isVerified: true,
        certified: 'Kementerian Kominfo RI, Kemenkumham',
        about: 'Asosiasi nirlaba yang menghimpun para praktisi, akademisi, dan perusahaan IoT nasional guna mendorong ekosistem industri IoT Jawa Barat yang inklusif, terstandarisasi, dan mandiri.',
        programs: [
          { name: 'Standardisasi Sensor Air & Tanah IoT', budget: 'Sinergi Industri' },
          { name: 'Sertifikasi IoT Specialist Jabar Juara', budget: 'Subsidi Pemerintah' }
        ]
      },
      {
        id: 'org-3',
        name: 'Lembaga Riset Pangan Berkelanjutan Jabar (LRPBJ)',
        type: 'Lembaga Penelitian & Riset',
        focusArea: 'Ketahanan Pangan & Bioteknologi Hijau',
        volunteers: '45 Peneliti Utama',
        headquarters: 'Jatinangor, Sumedang',
        rating: 4.7,
        isVerified: true,
        certified: 'Rekomendasi BRIN (Badan Riset & Inovasi Nasional)',
        about: 'Institusi riset independen yang fokus pada pengembangan benih padi tahan kering, rekayasa pupuk organik cair pintar, dan studi ketahanan pangan wilayah perkotaan padat Jawa Barat.',
        programs: [
          { name: 'Riset Benih Unggul Tahan El Nino', budget: 'Rp 120.000.000 (BRIN)' },
          { name: 'Uji Klinis Pupuk Hayati Jabar Subur', budget: 'Selesai' }
        ]
      }
    ];
  });
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<string | null>(null);
  const [orgInquiryName, setOrgInquiryName] = useState('');
  const [orgInquiryMessage, setOrgInquiryMessage] = useState('');
  const [orgInquirySuccess, setOrgInquirySuccess] = useState(false);

  const submitOrgInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setOrgInquirySuccess(true);
    setTimeout(() => {
      setOrgInquirySuccess(false);
      setOrgInquiryName('');
      setOrgInquiryMessage('');
      setSelectedOrganizationId(null);
    }, 2500);
  };

  // 4c. AUTHORS DIRECTORY STATES & DATA
  const [authors] = useState(() => {
    const local = localStorage.getItem('infobos_authors_directory');
    return local ? JSON.parse(local) : [
      {
        id: 'auth-1',
        name: 'Gilang Ramadhan, M.Si.',
        role: 'Jurnalis Investigasi Senior',
        specialization: 'Ekonomi, Bisnis, & Korupsi Regional',
        experience: '12 Tahun Pengalaman',
        location: 'Bandung',
        rating: 4.9,
        isVerified: true,
        certified: 'Sertifikasi Wartawan Utama (Dewan Pers)',
        about: 'Gilang Ramadhan adalah jurnalis investigasi senior pemenang penghargaan siber jurnalisme Jawa Barat. Berfokus pada peliputan aliran dana APBD, tata kelola lingkungan pegunungan Lembang, dan transparansi kebijakan logistik siber Jawa Barat.',
        articles: [
          { name: 'Menyingkap Tabir Aliran Dana Proyek Smart System Jawa Barat', date: '12 Juni 2026' },
          { name: 'Runtuhnya Kawasan Resapan Air: Monopoli Lahan Lembang', date: '3 Mei 2026' }
        ]
      },
      {
        id: 'auth-2',
        name: 'Kartika Sari, S.I.Kom.',
        role: 'Editor Koridor Rebana',
        specialization: 'Logistik, Infrastruktur, & Kawasan Ekonomi Baru',
        experience: '8 Tahun Pengalaman',
        location: 'Cirebon & Subang',
        rating: 4.8,
        isVerified: true,
        certified: 'Sertifikasi Wartawan Madya (Dewan Pers)',
        about: 'Kartika memimpin investigasi dan peliputan mendalam di koridor industri Patimban-Kertajati. Dedikasinya terhadap jurnalisme berbasis data menghasilkan banyak ulasan komprehensif mengenai kesiapan infrastruktur Rebana.',
        articles: [
          { name: 'Pelabuhan Patimban Raya: Antara Harapan Ekspor dan Kesiapan Nelayan Lokal', date: '28 Juni 2026' },
          { name: 'Analisis Spasial: Lahan Industri Majalengka Siap Terima Investor Asing', date: '14 Mei 2026' }
        ]
      },
      {
        id: 'auth-3',
        name: 'Dian Nugraha',
        role: 'Reporter Data & Sains',
        specialization: 'Artificial Intelligence, Agroteknologi, & IoT',
        experience: '5 Tahun Pengalaman',
        location: 'Sumedang',
        rating: 4.7,
        isVerified: true,
        certified: 'Sertifikasi Wartawan Muda (Dewan Pers)',
        about: 'Dian berfokus pada transisi digital di pedesaan Jawa Barat. Liputan mendalamnya mengenai implementasi IoT di lahan padi Indramayu dan agroteknologi Lembang menjadi referensi utama para pengambil kebijakan.',
        articles: [
          { name: 'Petani Milenial Indramayu: Menyiram Padi Menggunakan Smartphone', date: '20 Juni 2026' },
          { name: 'Dilema AI Bahasa Sunda dalam Layanan Publik Pemerintah Daerah', date: '1 Juni 2026' }
        ]
      }
    ];
  });
  const [selectedAuthorId, setSelectedAuthorId] = useState<string | null>(null);
  const [authorInquiryName, setAuthorInquiryName] = useState('');
  const [authorInquiryMessage, setAuthorInquiryMessage] = useState('');
  const [authorInquirySuccess, setAuthorInquirySuccess] = useState(false);

  const submitAuthorInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthorInquirySuccess(true);
    setTimeout(() => {
      setAuthorInquirySuccess(false);
      setAuthorInquiryName('');
      setAuthorInquiryMessage('');
      setSelectedAuthorId(null);
    }, 2500);
  };

  // 4d. EVENTS DIRECTORY STATES & DATA
  const [events] = useState(() => {
    const local = localStorage.getItem('infobos_events_directory');
    return local ? JSON.parse(local) : [
      {
        id: 'evt-1',
        name: 'West Java Agrotech & Food Security Summit 2026',
        category: 'Konferensi & Pameran Bisnis',
        theme: 'Inovasi Teknologi Pangan Berkelanjutan menghadapi El Nino',
        date: '18-20 Agustus 2026',
        venue: 'Bale Asri Pusdai, Bandung',
        rating: 4.9,
        isVerified: true,
        organizer: 'Dinas Ketahanan Pangan & Peternakan Jabar',
        about: 'Pameran teknologi pertanian terbesar di Jawa Barat yang mempertemukan inovator IoT, pabrikan mesin ekstraksi makanan, investor venture capital, dan kelompok tani nasional guna menyusun sinergi swasembada pangan berkelanjutan.',
        schedule: [
          { name: 'Seminar Utama: Otomasi Greenhouse Skala Industri', time: '18 Agst, 09.00 - 12.00' },
          { name: 'Business Matching: Startup AgriTech & Investor Hijau', time: '19 Agst, 13.00 - 16.00' }
        ]
      },
      {
        id: 'evt-2',
        name: 'Patimban Logistik & Maritime Expo 2026',
        category: 'Ekshibisi Industri & Rantai Pasok',
        theme: 'Mengakselerasi Koridor Rebana sebagai Pusat Logistik Global',
        date: '5-7 September 2026',
        venue: 'Kawasan Terpadu Pelabuhan Patimban, Subang',
        rating: 4.8,
        isVerified: true,
        organizer: 'Asosiasi Logistik Indonesia (ALI) Cabang Jabar',
        about: 'Ekshibisi maritim dan logistik terpadu untuk memperkenalkan infrastruktur pelabuhan Patimban, pergudangan cold-storage modern, dan sistem digitalisasi pengapalan kargo ekspor langsung kepada ribuan korporasi manufaktur.',
        schedule: [
          { name: 'Panel Diskusi: Rantai Pasok Terpadu Jawa Barat', time: '5 Sept, 10.00 - 13.00' },
          { name: 'Ekshibisi Alat Berat & Truk Trailer Modern', time: 'Sepanjang Hari' }
        ]
      },
      {
        id: 'evt-3',
        name: 'Jabar Digital Creative Forum 2026',
        category: 'Forum Teknologi & Industri Kreatif',
        theme: 'Generative AI & LLM Bahasa Daerah untuk Efisiensi Bisnis Lokal',
        date: '22-23 Oktober 2026',
        venue: 'The Trans Luxury Convention Center, Bandung',
        rating: 4.7,
        isVerified: true,
        organizer: 'Jabar Digital Service (JDS)',
        about: 'Forum kolaboratif terbesar bagi pelaku industri kreatif digital, pengembang teknologi siber, desainer UI/UX, dan penyedia layanan AI guna mendiskusikan implementasi kecerdasan buatan dalam mempercepat bisnis UMKM lokal.',
        schedule: [
          { name: 'Workshop: Membangun Chatbot Bisnis Menggunakan Gemini AI', time: '22 Okt, 14.00 - 17.00' },
          { name: 'Demo Pitching Inovasi Teknologi StartUp Daerah', time: '23 Okt, 09.00 - 12.00' }
        ]
      }
    ];
  });
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [eventRegisterName, setEventRegisterName] = useState('');
  const [eventRegisterEmail, setEventRegisterEmail] = useState('');
  const [eventRegisterSuccess, setEventRegisterSuccess] = useState(false);

  const submitEventRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setEventRegisterSuccess(true);
    setTimeout(() => {
      setEventRegisterSuccess(false);
      setEventRegisterName('');
      setEventRegisterEmail('');
      setSelectedEventId(null);
    }, 2500);
  };

  // 5. PROJECT & TALENT MARKETPLACE (JOBS & TENDER POSTINGS)
  const [jobCategory, setJobCategory] = useState<'all' | 'tender' | 'freelance' | 'job'>('all');
  const [projects, setProjects] = useState(() => {
    const local = localStorage.getItem('infobos_projects_jobs');
    return local ? JSON.parse(local) : [
    {
      id: 'proj-1',
      title: 'Tender: Sistem Irigasi Cerdas Daerah Irigasi Rentang',
      type: 'tender',
      budget: 'Rp 150.000.000',
      deadline: '15 Juli 2026',
      issuer: 'Dinas Sumber Daya Air Jabar',
      description: 'Pengembangan sistem pintu air otomatis berbasis mikrokontroler & sensor ultrasonik dengan dashboard pemantau debit air.',
      applicants: 12,
      applied: false
    },
    {
      id: 'proj-2',
      title: 'Freelance: Pembuatan Model GIS Deteksi Deforestasi Hutan Lindung',
      type: 'freelance',
      budget: 'Rp 18.000.000',
      deadline: '10 Juli 2026',
      issuer: 'YPI Alam Lestari',
      description: 'Dibutuhkan analis SIG berpengalaman untuk mengolah citra satelit Sentinel-2 guna memetakan titik tebang liar di Priangan Timur.',
      applicants: 8,
      applied: false
    },
    {
      id: 'proj-3',
      title: 'Full-Time: Lead Software Engineer (IoT Integration)',
      type: 'job',
      budget: 'Rp 22.000.000 - Rp 30.000.000 / bln',
      deadline: '20 Juli 2026',
      issuer: 'PT Jabar Digital Agro',
      description: 'Bertanggung jawab atas arsitektur backend penampung data telemetri ribuan sensor tanah menggunakan MQTT dan Node.js.',
      applicants: 45,
      applied: false
    },
    {
      id: 'proj-4',
      title: 'Tender: Pengadaan Solar Panel Kantor Bappeda Indramayu',
      type: 'tender',
      budget: 'Rp 85.000.000',
      deadline: '25 Juli 2026',
      issuer: 'Bappeda Indramayu',
      description: 'Instalasi panel surya on-grid 10 kWp beserta sistem monitoring berbasis web untuk efisiensi energi gedung dinas.',
      applicants: 5,
      applied: false
    },
    {
      id: 'proj-5',
      title: 'Freelance: Copywriter Laporan Keberlanjutan Pangan Jabar',
      type: 'freelance',
      budget: 'Rp 7.500.000',
      deadline: '12 Juli 2026',
      issuer: 'Dinas Ketahanan Pangan',
      description: 'Penulisan laporan tahunan program swasembada pangan Jawa Barat dengan gaya bahasa publik yang menarik dan profesional.',
      applicants: 14,
      applied: false
    }
  ]; });
  const [applyModalItem, setApplyModalItem] = useState<any | null>(null);
  const [applyCoverLetter, setApplyCoverLetter] = useState('');
  const [applySuccess, setApplySuccess] = useState(false);

  // 6. LIVE CHAT PANEL: REAL-TIME CONVERSATIONS
  const [activeChatChannel, setActiveChatChannel] = useState<string>('c-1');
  const [chatSearch, setChatSearch] = useState('');
  const [typingIndicator, setTypingIndicator] = useState<string | null>(null);
  const [chatChannels, setChatChannels] = useState([
    {
      id: 'c-1',
      name: 'Atsiri Tech - Negosiasi Ekstraktor',
      type: 'business',
      unread: 1,
      lastMsg: 'Apakah harga nett Rp 23.500.000 bisa disepakati dengan pengiriman cargo?',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=100&q=80',
      messages: [
        { id: 'm1', sender: 'Atsiri Tech', text: 'Halo Pak Wira, terima kasih atas ketertarikan Anda pada alat suling Atsiri SUS316.', time: '09:12', senderId: 'seller' },
        { id: 'm2', sender: 'Wira Wijaya', text: 'Sama-sama. Saya ingin menanyakan apakah ada potongan diskon tambahan untuk pembelian pertama?', time: '09:15', senderId: 'user' },
        { id: 'm3', sender: 'Atsiri Tech', text: 'Apakah harga nett Rp 23.500.000 bisa disepakati dengan pengiriman cargo?', time: '10:04', senderId: 'seller' }
      ]
    },
    {
      id: 'c-2',
      name: 'Project Irigasi Cerdas Rentang - Tim Pelaksana',
      type: 'project',
      unread: 0,
      lastMsg: 'Pemasangan pintu air sektor B dimulai besok pagi pukul 08.00 WIB.',
      avatar: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=100&q=80',
      messages: [
        { id: 'm4', sender: 'Irfan (SDA)', text: 'Sensor ketinggian air sudah terkalibrasi dengan baik.', time: 'Kemarin', senderId: 'other' },
        { id: 'm5', sender: 'Rian (IoT)', text: 'Pemasangan pintu air sektor B dimulai besok pagi pukul 08.00 WIB.', time: 'Kemarin', senderId: 'other' }
      ]
    },
    {
      id: 'c-3',
      name: 'Komunitas Agro & Pangan Rebana',
      type: 'community',
      unread: 3,
      lastMsg: 'Siti: Komoditas cabai rawit sedang naik tajam di pasar induk Cikopo.',
      avatar: 'https://images.unsplash.com/photo-1495539408662-485c2582883f?auto=format&fit=crop&w=100&q=80',
      messages: [
        { id: 'm6', sender: 'Dani', text: 'Ada info gudang kosong dekat tol Kertajati?', time: '02:11', senderId: 'other' },
        { id: 'm7', sender: 'Siti', text: 'Komoditas cabai rawit sedang naik tajam di pasar induk Cikopo.', time: '03:15', senderId: 'other' }
      ]
    }
  ]);
  const [chatMessageInput, setChatMessageInput] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat & mock automatic reply
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatChannels, activeChatChannel]);

  const sendChatMessage = () => {
    if (!chatMessageInput.trim()) return;

    const newMessage = {
      id: `m-${Date.now()}`,
      sender: 'Wira Wijaya',
      text: chatMessageInput,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      senderId: 'user'
    };

    setChatChannels(prev => prev.map(ch => {
      if (ch.id === activeChatChannel) {
        return {
          ...ch,
          lastMsg: chatMessageInput,
          messages: [...ch.messages, newMessage]
        };
      }
      return ch;
    }));

    const originalInput = chatMessageInput;
    setChatMessageInput('');

    // Simulated Business Counter-Party Response
    setTimeout(() => {
      setTypingIndicator('Sedang mengetik...');
    }, 1200);

    setTimeout(() => {
      setTypingIndicator(null);
      let replyText = 'Baik Pak, instruksi Anda telah dicatat oleh sistem kami. Customer representative akan segera menghubungi.';
      if (activeChatChannel === 'c-1') {
        replyText = 'Baik Pak, untuk penawaran Rp ' + originalInput + ' kami teruskan ke manajer keuangan kami untuk disetujui. Kami infokan segera.';
      }
      
      const botReply = {
        id: `m-${Date.now() + 1}`,
        sender: activeChatChannel === 'c-1' ? 'Atsiri Tech' : 'Rian (IoT)',
        text: replyText,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        senderId: 'bot'
      };

      setChatChannels(prev => prev.map(ch => {
        if (ch.id === activeChatChannel) {
          return {
            ...ch,
            lastMsg: replyText,
            messages: [...ch.messages, botReply]
          };
        }
        return ch;
      }));
    }, 4000);
  };

  // 7. INTEGRATED REVENUEOS & PAYMENT gateway
  const [premiumInvoices, setPremiumInvoices] = useState([
    { id: 'inv-101', description: 'Listing Premium: Ekstraktor Atsiri', amount: 150000, date: '30 Juni 2026', status: 'BELUM_BAYAR' },
    { id: 'inv-102', description: 'Langganan Forum Premium Bulanan', amount: 99000, date: '29 Juni 2026', status: 'LUNAS' }
  ]);
  const [selectedInvoiceForPay, setSelectedInvoiceForPay] = useState<any | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'va' | 'transfer'>('qris');
  const [paySuccess, setPaySuccess] = useState(false);

  // 8. FORUM INTERACTIONS
  const handleLikeThread = (threadId: string) => {
    setThreads(prev => prev.map(th => {
      if (th.id === threadId) {
        return { ...th, likes: th.likes + 1 };
      }
      return th;
    }));
  };

  const handleVotePoll = (threadId: string, optionIdx: number) => {
    setThreads(prev => prev.map(th => {
      if (th.id === threadId && th.polling) {
        if (th.polling.userVotedIdx !== -1) return th; // Can only vote once
        const updatedOptions = th.polling.options.map((opt: any, idx: number) => {
          if (idx === optionIdx) {
            return { ...opt, votes: opt.votes + 1 };
          }
          return opt;
        });
        return {
          ...th,
          votes: th.votes + 1,
          polling: {
            ...th.polling,
            options: updatedOptions,
            totalVotes: th.polling.totalVotes + 1,
            userVotedIdx: optionIdx
          }
        };
      }
      return th;
    }));
  };

  const handleCreateThreadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThreadTitle.trim() || !newThreadContent.trim()) return;

    const newThread = {
      id: `th-${Date.now()}`,
      title: newThreadTitle,
      category: newThreadCategory,
      author: `${currentUser.name} (${currentUser.role.replace('_', ' ')})`,
      content: newThreadContent,
      tags: newThreadTags.split(',').map(t => t.trim()).filter(Boolean),
      likes: 1,
      repliesCount: 0,
      views: 5,
      isPinned: false,
      isSolved: false,
      votes: 0,
      aiSummary: 'Ringkasan AI belum dibuat. Klik tombol buat untuk meringkas diskusi.',
      replies: []
    };

    setThreads([newThread, ...threads]);
    setNewThreadTitle('');
    setNewThreadContent('');
    setNewThreadTags('');
    setIsCreatingThread(false);
  };

  const handlePostReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyInput.trim() || !selectedThreadId) return;

    const targetThread = threads.find(t => t.id === selectedThreadId);
    if (!targetThread) return;

    const newReply = {
      id: `rep-${Date.now()}`,
      author: currentUser.name,
      avatar: currentUser.avatar,
      content: replyInput,
      isSolvedAnswer: false,
      likes: 0,
      quote: quotedText || ''
    };

    setThreads(prev => prev.map(th => {
      if (th.id === selectedThreadId) {
        return {
          ...th,
          repliesCount: th.repliesCount + 1,
          replies: [...th.replies, newReply]
        };
      }
      return th;
    }));

    setReplyInput('');
    setQuotedText(null);
  };

  const handleMarkSolved = (threadId: string, replyId: string) => {
    setThreads(prev => prev.map(th => {
      if (th.id === threadId) {
        const updatedReplies = th.replies.map((rep: any) => ({
          ...rep,
          isSolvedAnswer: rep.id === replyId
        }));
        return {
          ...th,
          isSolved: true,
          replies: updatedReplies
        };
      }
      return th;
    }));
  };

  // 9. NEGOTIATION WORKFLOW
  const triggerNegotiate = (listing: any) => {
    setSelectedListing(listing);
    setOfferPrice(listing.price - (listing.discount || 0));
    setOfferHistory([
      { id: 'oh-1', sender: 'Sistem', text: `Inisiasi negosiasi untuk "${listing.title}". Harga dasar: Rp ${listing.price.toLocaleString('id-ID')}`, time: 'Baru saja' }
    ]);
    setShowNegotiateModal(true);
  };

  const submitOffer = () => {
    const newOffer = {
      id: `oh-${Date.now()}`,
      sender: 'Pembeli (Anda)',
      text: `Mengajukan penawaran harga sebesar Rp ${offerPrice.toLocaleString('id-ID')}`,
      time: 'Baru saja',
      amount: offerPrice
    };

    setOfferHistory(prev => [...prev, newOffer]);

    // Simulated seller counter-offer
    setTimeout(() => {
      const isAccepted = offerPrice >= selectedListing.price * 0.9; // accept if within 90%
      if (isAccepted) {
        setOfferHistory(prev => [...prev, {
          id: `oh-bot-${Date.now()}`,
          sender: selectedListing.seller.name,
          text: `Selamat! Penawaran Anda Rp ${offerPrice.toLocaleString('id-ID')} DISETUJUI oleh penjual. Silakan selesaikan invoice di RevenueOS.`,
          time: 'Baru saja',
          isApproved: true
        }]);

        // Add to RevenueOS premiumInvoice
        setPremiumInvoices(prev => [
          {
            id: `inv-${Date.now()}`,
            description: `Pembelian: ${selectedListing.title} (Negosiasi Disetujui)`,
            amount: offerPrice,
            date: '30 Juni 2026',
            status: 'BELUM_BAYAR'
          },
          ...prev
        ]);
      } else {
        const counter = Math.round(selectedListing.price * 0.93);
        setOfferHistory(prev => [...prev, {
          id: `oh-bot-${Date.now()}`,
          sender: selectedListing.seller.name,
          text: `Penawaran Anda terlalu rendah. Bagaimana jika Rp ${counter.toLocaleString('id-ID')}? (Counter-Offer)`,
          time: 'Baru saja',
          amount: counter,
          isCounter: true
        }]);
      }
    }, 2000);
  };

  const acceptCounterOffer = (counterAmount: number) => {
    setOfferHistory(prev => [...prev, {
      id: `oh-${Date.now()}`,
      sender: 'Pembeli (Anda)',
      text: `Menyetujui counter-offer penjual sebesar Rp ${counterAmount.toLocaleString('id-ID')}`,
      time: 'Baru saja',
      isApproved: true
    }]);

    setPremiumInvoices(prev => [
      {
        id: `inv-${Date.now()}`,
        description: `Pembelian: ${selectedListing.title} (Counter-Offer Disetujui)`,
        amount: counterAmount,
        date: '30 Juni 2026',
        status: 'BELUM_BAYAR'
      },
      ...prev
    ]);
  };

  // 10. BOOKING / RENTAL CALCULATION
  const calculateTotalRent = (listing: any) => {
    if (!listing.price) return 0;
    const base = listing.price * rentDuration;
    const dep = listing.rentalInfo?.deposit || 0;
    return base + dep;
  };

  const handleConfirmRent = () => {
    if (!selectedListing) return;
    const total = calculateTotalRent(selectedListing);

    setPremiumInvoices(prev => [
      {
        id: `inv-${Date.now()}`,
        description: `Sewa: ${selectedListing.title} (${rentDuration} Hari mulai ${rentStartDate})`,
        amount: total,
        date: '30 Juni 2026',
        status: 'BELUM_BAYAR'
      },
      ...prev
    ]);

    setShowRentModal(false);
    setActiveTab('escrow');
  };

  const handleCreateListingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListingTitle.trim() || !newListingDescription.trim() || newListingPrice <= 0) return;

    // Check if marketplace member is logged in
    const activeUser = marketplaceUser || currentUser;
    if (!activeUser) {
      alert("⚠️ Hubungi Sistem Keamanan: Silakan masuk atau mendaftar sebagai anggota terlebih dahulu!");
      return;
    }

    // Role-based restrictions: Check listings count for Free members
    const userListingsCount = listings.filter(l => l.seller && l.seller.email === activeUser.email).length;
    if (activeUser.role === 'MEMBER' && userListingsCount >= 2) {
      alert("⚠️ BATAS IKLAN ANGGOTA FREE TERGAPAI!\n\nAnda telah memasang " + userListingsCount + " iklan (batas maksimal Anggota Free). Silakan upgrade akun Anda ke PREMIUM MEMBER untuk memasang iklan tanpa batas!");
      return;
    }

    // Role-based restrictions: Check category types for Free members
    if (activeUser.role === 'MEMBER' && (newListingType === 'digital' || newListingType === 'lowongan')) {
      alert("🔒 TIPE TERKUNCI!\n\nPosting Produk Digital atau Lowongan Kerja hanya tersedia untuk Anggota Premium. Silakan upgrade akun Anda ke Premium Member!");
      return;
    }

    let defaultImg = newListingImage;
    if (!defaultImg) {
      if (newListingType === 'lowongan') {
        defaultImg = 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=300&q=80';
      } else if (newListingType === 'jasa') {
        defaultImg = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=300&q=80';
      } else if (newListingType === 'sewa') {
        defaultImg = 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=300&q=80';
      } else if (newListingType === 'digital') {
        defaultImg = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=300&q=80';
      } else {
        defaultImg = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80';
      }
    }

    const newListing = {
      id: `list-${Date.now()}`,
      title: newListingTitle,
      type: newListingType,
      category: newListingCategory,
      price: newListingPrice,
      image: defaultImg,
      location: newListingLocation,
      condition: newListingCondition,
      rating: 5.0,
      reviewsCount: 1,
      isPremiumSeller: activeUser.role === 'PREMIUM_MEMBER',
      seller: { 
        name: activeUser.name, 
        reputation: activeUser.reputation || 95, 
        verified: true, 
        phone: '08123456789', 
        email: activeUser.email,
        role: activeUser.role
      },
      description: newListingDescription,
      tags: newListingTags.split(',').map(t => t.trim()).filter(Boolean),
      aiSuggestions: {
        seoTitle: `Optimized: ${newListingTitle}`,
        translatedTitle: `Global: ${newListingTitle}`,
        priceAnalysis: `Analisis AI: Harga penawaran Rp ${newListingPrice.toLocaleString('id-ID')} masuk dalam standar wajar wilayah Jawa Barat.`,
        fraudCheck: 'TIDAK TERDETEKSI ANOMALI.'
      }
    };

    const updatedListings = [newListing, ...listings];
    setListings(updatedListings);
    localStorage.setItem('infobos_marketplace_listings', JSON.stringify(updatedListings));

    // Reset form
    setNewListingTitle('');
    setNewListingType('jual');
    setNewListingCategory('Mesin & Industri');
    setNewListingPrice(0);
    setNewListingLocation('Kota Bandung');
    setNewListingDescription('');
    setNewListingTags('');
    setNewListingCondition('Baru');
    setNewListingImage('');
    setIsCreatingListing(false);
  };

  // 11. AI COPILOT TEXT GENERATION & ANALYSIS
  const runAICopilotTool = (tool: 'seo' | 'translate' | 'price') => {
    setAiLoading(true);
    setAiGeneratedOutput('');

    setTimeout(() => {
      setAiLoading(false);
      if (tool === 'seo') {
        setAiGeneratedOutput(`💡 HASIL SEO OPTIMASI GEMINI AI:\nJudul Teroptimasi: "Jual ${aiDraftTitle || 'Produk'} Murah Berkualitas | Hubungi ${currentUser.name}"\nKeywords: Jabar, Bisnis, Terpercaya, ${aiDraftTitle || 'Kanal'}\nMeta Description: "Beli ${aiDraftTitle || 'Produk'} berkualitas tinggi langsung dari supplier terverifikasi di portal INFOBOS. Dapatkan penawaran terbaik dan perlindungan transaksi dengan Escrow. ${aiDraftDescription ? aiDraftDescription.slice(0, 80) : ''}..."`);
      } else if (tool === 'translate') {
        setAiGeneratedOutput(`🌐 HASIL TERJEMAHAN AI (Bahasa Inggris):\nTitle: "Verified Supply: ${aiDraftTitle || 'Item'}"\nDescription: "${aiDraftDescription ? 'Highly reliable source: ' + aiDraftDescription : 'Please contact us for more information on pricing, logistics and shipping terms.'}"`);
      } else if (tool === 'price') {
        setAiGeneratedOutput(`📊 ANALISIS HARGA PASARAN AI:\nKategori: Agro-Industri & Sektoral\nRata-rata Harga Pasar: Rp 15.000.000 - Rp 25.000.000\nSaran Harga Optimal: Rp 18.500.000 (Potensi laku 85% dalam 7 hari)\nIndikasi Fraud: 0% Aman (Sesuai parameter wajar).`);
      }
    }, 1500);
  };

  // 12. PROJECT APPLY & DIRECTORY FORM SUBMITS
  const submitProjectApply = (e: React.FormEvent) => {
    e.preventDefault();
    setProjects(prev => prev.map(p => {
      if (p.id === applyModalItem?.id) {
        return { ...p, applied: true, applicants: p.applicants + 1 };
      }
      return p;
    }));
    setApplySuccess(true);
    setTimeout(() => {
      setApplySuccess(false);
      setApplyModalItem(null);
      setApplyCoverLetter('');
    }, 2000);
  };

  const submitLeadForm = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadSuccess(true);
    setTimeout(() => {
      setLeadSuccess(false);
      setLeadFormName('');
      setLeadFormMessage('');
      setSelectedCompanyId(null);
    }, 2500);
  };

  const handlePayInvoice = (inv: any) => {
    setSelectedInvoiceForPay(inv);
    setPaySuccess(false);
  };

  const confirmInvoicePayment = () => {
    setPremiumInvoices(prev => prev.map(iv => {
      if (iv.id === selectedInvoiceForPay.id) {
        return { ...iv, status: 'LUNAS' };
      }
      return iv;
    }));
    setPaySuccess(true);
    setTimeout(() => {
      setSelectedInvoiceForPay(null);
      setPaySuccess(false);
    }, 2500);
  };

  // FILTERED THREADS / LISTINGS BASED ON UNIVERSAL SEARCH
  const filteredThreads = threads.filter(th => {
    const matchesSearch = universalSearch ? (
      th.title.toLowerCase().includes(universalSearch.toLowerCase()) ||
      th.content.toLowerCase().includes(universalSearch.toLowerCase()) ||
      th.tags.some((t: string) => t.toLowerCase().includes(universalSearch.toLowerCase()))
    ) : true;

    if (selectedForumCategory === 'all') return matchesSearch;
    return th.category === selectedForumCategory && matchesSearch;
  });

  const filteredListings = listings.filter(lst => {
    const matchesType = marketplaceType === 'all' || lst.type === marketplaceType;
    const matchesSearch = universalSearch ? (
      lst.title.toLowerCase().includes(universalSearch.toLowerCase()) ||
      lst.description.toLowerCase().includes(universalSearch.toLowerCase()) ||
      lst.tags.some((t: string) => t.toLowerCase().includes(universalSearch.toLowerCase()))
    ) : true;

    return matchesType && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-sans text-left" id="community-marketplace-hub">
      
      {/* 1. HERO BENTO DASHBOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8">
        
        {/* Platform Stats & Interactive Navigation Hub */}
        <div className="lg:col-span-12 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs flex flex-col justify-between min-h-[220px]">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h2 className="font-display font-black text-base text-[#002B5B] dark:text-white uppercase tracking-tight">
                  {isForumOnly 
                    ? "💬 Forum Komunitas Jabar" 
                    : isDirectoryOnly 
                      ? "🏢 Direktori Bisnis Jabar" 
                      : isBrandDirectoryOnly 
                        ? "🎗️ Direktori Merek & Brand HAKI" 
                        : isProductDirectoryOnly 
                          ? "🛍️ Katalog Produk & Komoditas" 
                          : isOrganizationDirectoryOnly
                            ? "🏢 Direktori Organisasi Jabar"
                            : isAuthorDirectoryOnly
                              ? "✍️ Direktori Penulis & Jurnalis"
                              : isEventDirectoryOnly
                                ? "📅 Direktori Event & Agenda"
                                : "🤝 Komunitas & Kolaborasi Bisnis Jabar"}
                </h2>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {isForumOnly 
                    ? "Wadah interaksi, diskusi terbuka warga, tanya jawab sektoral, dan jajak pendapat kebijakan daerah."
                    : isDirectoryOnly
                      ? "Pusat rujukan resmi profil hukum badan usaha, pabrikan, vendor jasa industri, dan instansi terverifikasi."
                      : isBrandDirectoryOnly
                        ? "Daftar resmi merek lokal & nasional bersertifikat HAKI, dilengkapi dengan monitoring indeks sentimen publik."
                        : isProductDirectoryOnly
                          ? "Katalog resmi rilis produk komoditas unggulan daerah, inovasi teknologi, dan jasa kreatif nasional."
                          : isOrganizationDirectoryOnly
                            ? "Pusat rujukan profil resmi organisasi non-profit, LSM, asosiasi industri, dan institusi riset."
                            : isAuthorDirectoryOnly
                              ? "Daftar portofolio wartawan utama, editor, dan analis data riset redaksi INFOBOS."
                              : isEventDirectoryOnly
                                ? "Kalender resmi agenda pameran dagang (B2B expo), seminar teknologi, dan business matching."
                                : "Satu ekosistem terpadu untuk berdiskusi, bertransaksi, menyewa aset, dan membangun kemitraan."}
                </p>
              </div>
              <div className="flex items-center gap-1 bg-[#2B7A78]/10 text-[#2B7A78]/90 px-2.5 py-1 rounded-full text-[10px] font-mono font-black">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                <span>842 AKTIF ONLINE</span>
              </div>
            </div>

            {/* Universal Search bar for directories, products, forums */}
            <div className="mt-4 relative">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                value={universalSearch}
                onChange={(e) => setUniversalSearch(e.target.value)}
                placeholder={
                  isForumOnly 
                    ? "Cari topik diskusi, pertanyaan, atau polling..." 
                    : isDirectoryOnly 
                      ? "Cari nama PT, CV, instansi, atau bidang jasa..." 
                      : isBrandDirectoryOnly 
                        ? "Cari nama brand, registrasi HAKI, atau pemegang merek..." 
                        : isProductDirectoryOnly 
                          ? "Cari nama produk, spesifikasi, atau kategori produk..." 
                          : isOrganizationDirectoryOnly
                            ? "Cari nama organisasi, LSM, asosiasi, atau fokus area..."
                            : isAuthorDirectoryOnly
                              ? "Cari nama jurnalis, spesialisasi, atau artikel..."
                              : isEventDirectoryOnly
                                ? "Cari nama event, tema, lokasi, atau kategori..."
                                : "Cari produk, sewa mesin, tender proyek, freelancer, nama PT..."
                } 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:ring-1 focus:ring-[#2B7A78] focus:border-[#2B7A78] font-medium outline-none transition text-slate-850 dark:text-white"
              />
              {universalSearch && (
                <button onClick={() => setUniversalSearch('')} className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 text-xs font-bold">✖</button>
              )}
            </div>
          </div>

          {/* Tab switches */}
          {isForumOnly ? (
            <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap scrollbar-none pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
              {[
                { id: 'dashboard', name: 'Dashboard Komunitas', icon: BarChart2 },
                { id: 'forum', name: 'Forum Komunitas', icon: MessageSquare },
                { id: 'chat', name: 'Live Chat Redaksi', icon: Users, badge: chatChannels.reduce((acc, c) => acc + c.unread, 0) }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      setSelectedThreadId(null);
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition ${
                      activeTab === tab.id 
                        ? 'bg-[#2B7A78] text-white shadow-sm' 
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{tab.name}</span>
                    {tab.badge && tab.badge > 0 ? (
                      <span className="bg-rose-500 text-white text-[8px] font-bold px-1.5 py-0.2 rounded-full">{tab.badge}</span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          ) : (!isJobsOnly && !isDirectoryOnly && !isBrandDirectoryOnly && !isProductDirectoryOnly && !isOrganizationDirectoryOnly && !isAuthorDirectoryOnly && !isEventDirectoryOnly) ? (
            <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap scrollbar-none pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
              {[
                { id: 'marketplace', name: 'Marketplace OS', icon: Layers },
                { id: 'directory', name: 'Direktori Bisnis', icon: Award },
                { id: 'escrow', name: 'Escrow Payment Ledger', icon: ShieldCheck },
                { id: 'chat', name: 'Live Chat Marketplace', icon: MessageSquare, badge: chatChannels.reduce((acc, c) => acc + c.unread, 0) }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      setSelectedThreadId(null);
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition ${
                      activeTab === tab.id 
                        ? 'bg-[#2B7A78] text-white shadow-sm' 
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{tab.name}</span>
                    {tab.badge && tab.badge > 0 ? (
                      <span className="bg-rose-500 text-white text-[8px] font-bold px-1.5 py-0.2 rounded-full">{tab.badge}</span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>

      {/* 2. DYNAMIC VIEWPORTS */}
      <AnimatePresence mode="wait">
        
        {/* VIEW A: OVERVIEW DASHBOARD */}
        {effectiveTab === 'dashboard' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Forum summary card */}
              <div className="bg-white dark:bg-[#001733]/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-[#2B7A78] transition shadow-2xs">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 rounded-lg">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">Diskusi Hangat</span>
                </div>
                <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">Komunitas &amp; Ide Solutif</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4">Bergabung dengan 1.200+ profesional dalam diskusi sektoral Jawa Barat.</p>
                <button 
                  onClick={() => setActiveTab('forum')} 
                  className="w-full bg-slate-100 dark:bg-slate-900/60 hover:bg-[#2B7A78]/10 dark:hover:bg-[#2B7A78]/20 hover:text-[#2B7A78] text-slate-700 dark:text-slate-300 text-[10px] font-black uppercase py-2 rounded-xl transition"
                >
                  Buka Forum &rarr;
                </button>
              </div>

              {/* Marketplace Summary Card */}
              <div className="bg-white dark:bg-[#001733]/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-[#2B7A78] transition shadow-2xs">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 rounded-lg">
                    <Layers className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">Siap Sewa / Jual</span>
                </div>
                <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">Marketplace &amp; Rental System</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4">Sewa drone, mesin industri, beli dataset spasial dengan sistem Escrow aman.</p>
                <button 
                  onClick={() => setActiveTab('marketplace')} 
                  className="w-full bg-slate-100 dark:bg-slate-900/60 hover:bg-[#2B7A78]/10 dark:hover:bg-[#2B7A78]/20 hover:text-[#2B7A78] text-slate-700 dark:text-slate-300 text-[10px] font-black uppercase py-2 rounded-xl transition"
                >
                  Mulai Bertransaksi &rarr;
                </button>
              </div>

              {/* Directory summary card */}
              <div className="bg-white dark:bg-[#001733]/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-[#2B7A78] transition shadow-2xs">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 rounded-lg">
                    <Award className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">Sertifikasi &amp; Legal</span>
                </div>
                <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">Direktori Bisnis Terverifikasi</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4">Hubungkan rantai pasok Anda dengan perusahaan berlisensi resmi di Jabar.</p>
                <button 
                  onClick={() => setActiveTab('directory')} 
                  className="w-full bg-slate-100 dark:bg-slate-900/60 hover:bg-[#2B7A78]/10 dark:hover:bg-[#2B7A78]/20 hover:text-[#2B7A78] text-slate-700 dark:text-slate-300 text-[10px] font-black uppercase py-2 rounded-xl transition"
                >
                  Cari Rekanan PT &rarr;
                </button>
              </div>
            </div>

                {/* Escrow Active Ledger List */}
            <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-2xs">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-[#2B7A78]" />
                  <div>
                    <h3 className="font-display font-black text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                      🛡️ Sistem Escrow Rekening Bersama (Payment Ledger)
                    </h3>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Daftar transaksi yang dananya saat ini ditahan secara aman oleh sistem INFOBOS.</p>
                  </div>
                </div>
                <span className="text-[9px] font-mono bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/30 px-2.5 py-0.5 rounded">
                  100% SECURE
                </span>
              </div>

              {escrowTransactions.length === 0 ? (
                <div className="p-6 text-center text-slate-400 dark:text-slate-500 text-xs font-medium">
                  Tidak ada transaksi Escrow aktif saat ini.
                </div>
              ) : (
                <div className="space-y-3">
                  {escrowTransactions.map(esc => (
                    <div key={esc.id} className="p-4 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-medium">
                      <div className="space-y-1">
                        <span className="text-[9px] bg-amber-500/10 border border-amber-500/20 text-amber-600 font-extrabold px-2 py-0.5 rounded font-mono">
                          STATUS: {esc.status}
                        </span>
                        <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">{esc.itemTitle}</h4>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500">Penjual: {esc.seller} | Diinisiasi {esc.date}</p>
                      </div>

                      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-mono">Jumlah Dana</span>
                          <span className="font-black text-slate-800 dark:text-white">Rp {esc.amount.toLocaleString('id-ID')}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {esc.status === 'DITAHAN' ? (
                            <>
                              <button 
                                onClick={() => {
                                  setEscrowTransactions(prev => prev.map(e => e.id === esc.id ? { ...e, status: 'DIKIRIM' } : e));
                                }}
                                className="bg-[#2B7A78] hover:bg-[#205d5c] text-white font-bold text-[9px] uppercase px-3 py-1.5 rounded-lg transition shadow-xs"
                              >
                                Konfirmasi Kirim
                              </button>
                              <button 
                                onClick={() => {
                                  setEscrowTransactions(prev => prev.map(e => e.id === esc.id ? { ...e, status: 'SENGKETA' } : e));
                                }}
                                className="bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/30 text-rose-600 dark:text-rose-400 font-bold text-[9px] uppercase px-3 py-1.5 rounded-lg transition"
                              >
                                Ajukan Sengketa
                              </button>
                            </>
                          ) : esc.status === 'DIKIRIM' ? (
                            <button 
                              onClick={() => {
                                  setEscrowTransactions(prev => prev.map(e => e.id === esc.id ? { ...e, status: 'DANA_DILEPAS' } : e));
                              }}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[9px] uppercase px-3 py-1.5 rounded-lg transition"
                            >
                              Konfirmasi Terima &amp; Lepas Dana
                            </button>
                          ) : (
                            <span className="text-xs text-emerald-600 font-black flex items-center gap-1">
                              <CheckCircle2 className="h-4 w-4" /> Dana Berhasil Ditransaksikan
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* AI Generator Tool Mini Sandbox inside Dashboard */}
            <div className="bg-slate-900 text-white border border-slate-800 rounded-3xl p-6 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />
              
              <div className="flex items-center gap-2 mb-4">
                <Bot className="h-5 w-5 text-[#FFD700]" />
                <h3 className="font-display font-black text-sm uppercase tracking-wide text-white">
                  🤖 Gemini AI Business &amp; Copilot Sandbox
                </h3>
              </div>

              <p className="text-xs text-slate-300 max-w-2xl mb-4 leading-relaxed">
                Butuh bantuan menulis penawaran barang atau optimasi SEO produk Anda? Gunakan asisten kecerdasan buatan terintegrasi kami di bawah ini.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1 space-y-3">
                  <div>
                    <label className="text-[10px] text-slate-400 font-mono block mb-1">Judul Produk / Kolaborasi</label>
                    <input 
                      type="text" 
                      value={aiDraftTitle}
                      onChange={(e) => setAiDraftTitle(e.target.value)}
                      placeholder="Contoh: Sewa Mesin CNC Suku Cadang"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD700]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-mono block mb-1">Deskripsi Mentah</label>
                    <textarea 
                      value={aiDraftDescription}
                      onChange={(e) => setAiDraftDescription(e.target.value)}
                      placeholder="Tuliskan poin penting penawaran..."
                      rows={2}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD700] resize-none"
                    />
                  </div>

                  {marketplaceUser && marketplaceUser.role === 'MEMBER' ? (
                    <div className="bg-white/5 border border-amber-500/30 rounded-xl p-3 text-center space-y-2 mt-1">
                      <p className="text-[10px] text-amber-500 font-bold flex items-center justify-center gap-1">
                        <Lock className="h-3 w-3" /> AI COPILOT PREMIUM
                      </p>
                      <p className="text-[9px] text-slate-300">Miliki lencana Premium untuk menggunakan optimasi SEO &amp; Analisis Gemini AI otomatis.</p>
                      <button 
                        type="button"
                        onClick={() => {
                          const upgradedUser = { ...marketplaceUser, role: 'PREMIUM_MEMBER' };
                          setMarketplaceUser(upgradedUser);
                          localStorage.setItem('infobos_marketplace_logged_in_user', JSON.stringify(upgradedUser));
                          alert("🎉 Sukses! Anda telah diupgrade ke PREMIUM MEMBER dan seluruh fitur AI Copilot telah dibuka!");
                        }}
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-[9px] uppercase py-1.5 rounded transition"
                      >
                        Upgrade Instan
                      </button>
                    </div>
                  ) : !marketplaceUser ? (
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center space-y-1 mt-1">
                      <p className="text-[10px] text-slate-400 font-mono">Silakan masuk sebagai anggota di tab Marketplace untuk mengaktifkan AI Copilot.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1.5 pt-1">
                      <button 
                        onClick={() => runAICopilotTool('seo')}
                        className="bg-white/10 hover:bg-[#FFD700] hover:text-slate-950 font-bold text-[10px] uppercase py-1.5 rounded text-center transition"
                      >
                        Optimasi SEO
                      </button>
                      <button 
                        onClick={() => runAICopilotTool('translate')}
                        className="bg-white/10 hover:bg-[#FFD700] hover:text-slate-950 font-bold text-[10px] uppercase py-1.5 rounded text-center transition"
                      >
                        Terjemahkan Inggris
                      </button>
                      <button 
                        onClick={() => runAICopilotTool('price')}
                        className="bg-white/10 hover:bg-[#FFD700] hover:text-slate-950 font-bold text-[10px] uppercase py-1.5 rounded text-center transition"
                      >
                        Analisis Wajar Harga
                      </button>
                    </div>
                  )}
                </div>

                <div className="md:col-span-2 bg-black/40 border border-white/5 rounded-xl p-4 flex flex-col justify-between min-h-[180px]">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-[9px] font-mono text-slate-400">OUTPUT COPILOT</span>
                      {aiLoading && <span className="text-[9px] text-[#FFD700] animate-pulse">Menghubungi Gemini API...</span>}
                    </div>
                    <pre className="text-[11px] text-slate-200 font-mono whitespace-pre-wrap leading-relaxed h-[130px] overflow-y-auto scrollbar-none">
                      {aiGeneratedOutput || "Silakan ketik detail produk/penawaran di samping dan pilih opsi asisten AI untuk memicu pengerjaan otomatis."}
                    </pre>
                  </div>
                  {aiGeneratedOutput && (
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(aiGeneratedOutput);
                        alert("Disalin ke clipboard!");
                      }} 
                      className="text-[10px] text-[#FFD700] font-bold self-end hover:underline"
                    >
                      Salin Output
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {effectiveTab === 'escrow' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Escrow Active Ledger List */}
            <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-2xs">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-[#2B7A78]" />
                  <div>
                    <h3 className="font-display font-black text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                      🛡️ Sistem Escrow Rekening Bersama (Payment Ledger)
                    </h3>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Daftar transaksi yang dananya saat ini ditahan secara aman oleh sistem INFOBOS.</p>
                  </div>
                </div>
                <span className="text-[9px] font-mono bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/30 px-2.5 py-0.5 rounded">
                  100% SECURE
                </span>
              </div>

              {escrowTransactions.length === 0 ? (
                <div className="p-6 text-center text-slate-400 dark:text-slate-500 text-xs font-medium">
                  Tidak ada transaksi Escrow aktif saat ini.
                </div>
              ) : (
                <div className="space-y-3">
                  {escrowTransactions.map(esc => (
                    <div key={esc.id} className="p-4 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-medium">
                      <div className="space-y-1">
                        <span className="text-[9px] bg-amber-500/10 border border-amber-500/20 text-amber-600 font-extrabold px-2 py-0.5 rounded font-mono">
                          STATUS: {esc.status}
                        </span>
                        <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">{esc.itemTitle}</h4>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500">Penjual: {esc.seller} | Diinisiasi {esc.date}</p>
                      </div>

                      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-mono">Jumlah Dana</span>
                          <span className="font-black text-slate-800 dark:text-white">Rp {esc.amount.toLocaleString('id-ID')}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {esc.status === 'DITAHAN' ? (
                            <>
                              <button 
                                onClick={() => {
                                  setEscrowTransactions(prev => prev.map(e => e.id === esc.id ? { ...e, status: 'DIKIRIM' } : e));
                                }}
                                className="bg-[#2B7A78] hover:bg-[#205d5c] text-white font-bold text-[9px] uppercase px-3 py-1.5 rounded-lg transition shadow-xs"
                              >
                                Konfirmasi Kirim
                              </button>
                              <button 
                                onClick={() => {
                                  setEscrowTransactions(prev => prev.map(e => e.id === esc.id ? { ...e, status: 'SENGKETA' } : e));
                                }}
                                className="bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/30 text-rose-600 dark:text-rose-400 font-bold text-[9px] uppercase px-3 py-1.5 rounded-lg transition"
                              >
                                Ajukan Sengketa
                              </button>
                            </>
                          ) : esc.status === 'DIKIRIM' ? (
                            <button 
                              onClick={() => {
                                  setEscrowTransactions(prev => prev.map(e => e.id === esc.id ? { ...e, status: 'DANA_DILEPAS' } : e));
                              }}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[9px] uppercase px-3 py-1.5 rounded-lg transition"
                            >
                              Konfirmasi Terima &amp; Lepas Dana
                            </button>
                          ) : (
                            <span className="text-xs text-[#2B7A78] font-black flex items-center gap-1">
                              <CheckCircle2 className="h-4 w-4" /> Dana Berhasil Ditransaksikan
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* AI Generator Tool Mini Sandbox inside Escrow/Business ledger */}
            <div className="bg-slate-900 text-white border border-slate-800 rounded-3xl p-6 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />
              
              <div className="flex items-center gap-2 mb-4">
                <Bot className="h-5 w-5 text-[#FFD700]" />
                <h3 className="font-display font-black text-sm uppercase tracking-wide text-white">
                  🤖 Gemini AI Business &amp; Copilot Sandbox
                </h3>
              </div>

              <p className="text-xs text-slate-300 max-w-2xl mb-4 leading-relaxed">
                Butuh bantuan menulis penawaran barang atau optimasi SEO produk Anda? Gunakan asisten kecerdasan buatan terintegrasi kami di bawah ini.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1 space-y-3">
                  <div>
                    <label className="text-[10px] text-slate-400 font-mono block mb-1">Judul Produk / Kolaborasi</label>
                    <input 
                      type="text" 
                      value={aiDraftTitle}
                      onChange={(e) => setAiDraftTitle(e.target.value)}
                      placeholder="Contoh: Sewa Mesin CNC Suku Cadang"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD700]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-mono block mb-1">Deskripsi Mentah</label>
                    <textarea 
                      value={aiDraftDescription}
                      onChange={(e) => setAiDraftDescription(e.target.value)}
                      placeholder="Tuliskan poin penting penawaran..."
                      rows={2}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD700] resize-none"
                    />
                  </div>

                  {marketplaceUser && marketplaceUser.role === 'MEMBER' ? (
                    <div className="bg-white/5 border border-amber-500/30 rounded-xl p-3 text-center space-y-2 mt-1">
                      <p className="text-[10px] text-amber-500 font-bold flex items-center justify-center gap-1">
                        <Lock className="h-3 w-3" /> AI COPILOT PREMIUM
                      </p>
                      <p className="text-[9px] text-slate-300">Miliki lencana Premium untuk menggunakan optimasi SEO &amp; Analisis Gemini AI otomatis.</p>
                      <button 
                        type="button"
                        onClick={() => {
                          const upgradedUser = { ...marketplaceUser, role: 'PREMIUM_MEMBER' };
                          setMarketplaceUser(upgradedUser);
                          localStorage.setItem('infobos_marketplace_logged_in_user', JSON.stringify(upgradedUser));
                          alert("🎉 Sukses! Anda telah diupgrade ke PREMIUM MEMBER dan seluruh fitur AI Copilot telah dibuka!");
                        }}
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-[9px] uppercase py-1.5 rounded transition"
                      >
                        Upgrade Instan
                      </button>
                    </div>
                  ) : !marketplaceUser ? (
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center space-y-1 mt-1">
                      <p className="text-[10px] text-slate-400 font-mono">Silakan masuk sebagai anggota di tab Marketplace untuk mengaktifkan AI Copilot.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1.5 pt-1">
                      <button 
                        onClick={() => runAICopilotTool('seo')}
                        className="bg-white/10 hover:bg-[#FFD700] hover:text-slate-950 font-bold text-[10px] uppercase py-1.5 rounded text-center transition"
                      >
                        Optimasi SEO
                      </button>
                      <button 
                        onClick={() => runAICopilotTool('translate')}
                        className="bg-white/10 hover:bg-[#FFD700] hover:text-slate-950 font-bold text-[10px] uppercase py-1.5 rounded text-center transition"
                      >
                        Terjemahkan Inggris
                      </button>
                      <button 
                        onClick={() => runAICopilotTool('price')}
                        className="bg-white/10 hover:bg-[#FFD700] hover:text-slate-950 font-bold text-[10px] uppercase py-1.5 rounded text-center transition"
                      >
                        Analisis Wajar Harga
                      </button>
                    </div>
                  )}
                </div>

                <div className="md:col-span-2 bg-black/40 border border-white/5 rounded-xl p-4 flex flex-col justify-between min-h-[180px]">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-[9px] font-mono text-slate-400">OUTPUT COPILOT</span>
                      {aiLoading && <span className="text-[9px] text-[#FFD700] animate-pulse">Menghubungi Gemini API...</span>}
                    </div>
                    <pre className="text-[11px] text-slate-200 font-mono whitespace-pre-wrap leading-relaxed h-[130px] overflow-y-auto scrollbar-none">
                      {aiGeneratedOutput || "Silakan ketik detail produk/penawaran di samping dan pilih opsi asisten AI untuk memicu pengerjaan otomatis."}
                    </pre>
                  </div>
                  {aiGeneratedOutput && (
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(aiGeneratedOutput);
                        alert("Disalin ke clipboard!");
                      }} 
                      className="text-[10px] text-[#FFD700] font-bold self-end hover:underline"
                    >
                      Salin Output
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW B: FORUM KOMUNITAS */}
        {effectiveTab === 'forum' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Sidebar forum category filters */}
            <div className="lg:col-span-3 space-y-4">
              <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-3xs">
                <h3 className="font-display font-black text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Layers className="h-4 w-4 text-[#2B7A78]" />
                  <span>Kategori Forum</span>
                </h3>

                <div className="flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none">
                  {forumCategories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedForumCategory(cat.id);
                        setSelectedThreadId(null);
                      }}
                      className={`text-left px-3 py-1.5 lg:py-2 rounded-xl text-xs font-bold transition flex items-center justify-between gap-3 shrink-0 ${
                        selectedForumCategory === cat.id 
                          ? 'bg-[#2B7A78]/10 text-[#2B7A78]' 
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {cat.isPrivate && <Lock className="h-3.5 w-3.5 text-slate-400" />}
                        <span>{cat.name}</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">{cat.count}</span>
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => setIsCreatingThread(true)} 
                  className="w-full mt-4 bg-[#2B7A78] hover:bg-[#205d5c] text-white font-black text-xs uppercase py-2.5 rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  <Plus className="h-4 w-4" /> Buat Diskusi Baru
                </button>
              </div>

              {/* Forum Pinned / Rules Info */}
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4 text-xs font-medium text-amber-900">
                <div className="flex items-center gap-1.5 font-bold mb-1.5 text-amber-800">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>Pedoman Komunitas</span>
                </div>
                <p className="leading-relaxed text-[11px] text-amber-800/80">
                  Semua forum diawasi oleh moderator terdaftar. Thread dengan label [PREMIUM] hanya dapat diakses oleh akun Premium Member.
                </p>
              </div>
            </div>

            {/* Main Forum Display Area */}
            <div className="lg:col-span-9 space-y-4">
              
              {/* Thread creation dialog */}
              {isCreatingThread && (
                <div className="bg-white dark:bg-slate-900/60 border border-[#2B7A78]/30 dark:border-[#2B7A78]/50 rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between border-b dark:border-slate-800 pb-2.5 mb-4">
                    <h4 className="font-display font-black text-sm text-[#002B5B] uppercase">Mulai Thread Diskusi Baru</h4>
                    <button onClick={() => setIsCreatingThread(false)} className="text-slate-400 hover:text-slate-600">✕</button>
                  </div>
                  <form onSubmit={handleCreateThreadSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-slate-400 font-mono block mb-1">Kanal Diskusi</label>
                        <select 
                          value={newThreadCategory} 
                          onChange={(e) => setNewThreadCategory(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                        >
                          <option value="regional">Regional Jabar</option>
                          <option value="industri">Industri &amp; Supply</option>
                          <option value="premium">Premium Executive</option>
                          <option value="qa">Tanya Jawab (Q&amp;A)</option>
                          <option value="polling">Polling Opini</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 font-mono block mb-1">Tags (Pisahkan koma)</label>
                        <input 
                          type="text" 
                          value={newThreadTags}
                          onChange={(e) => setNewThreadTags(e.target.value)}
                          placeholder="Logistik, Cianjur, Koperasi"
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-mono block mb-1">Judul Diskusi</label>
                      <input 
                        type="text" 
                        required
                        value={newThreadTitle}
                        onChange={(e) => setNewThreadTitle(e.target.value)}
                        placeholder="Contoh: Diskusi Penyesuaian Tarif Cargo Priangan 2026"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-mono block mb-1">Konten Utama</label>
                      <textarea 
                        required
                        value={newThreadContent}
                        onChange={(e) => setNewThreadContent(e.target.value)}
                        placeholder="Uraikan topik, argumen, atau pertanyaan diskusi dengan lengkap..."
                        rows={4}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none resize-none"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                      <button 
                        type="button" 
                        onClick={() => setIsCreatingThread(false)}
                        className="px-3 py-1.5 text-slate-500 hover:bg-slate-50 rounded-lg text-xs font-semibold"
                      >
                        Batal
                      </button>
                      <button 
                        type="submit"
                        className="bg-[#2B7A78] hover:bg-[#205d5c] text-white font-black text-xs uppercase px-4 py-1.5 rounded-lg transition shadow-xs"
                      >
                        Terbitkan Thread
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* LIST OF THREADS */}
              {!selectedThreadId ? (
                <div className="space-y-3">
                  {filteredThreads.map(th => (
                    <div key={th.id} className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 hover:border-[#2B7A78] dark:hover:border-[#2B7A78] rounded-2xl p-4 transition shadow-3xs text-left relative group">
                      
                      {th.isPinned && (
                        <span className="absolute top-4 right-4 text-[10px] bg-amber-500/10 text-amber-700 px-2 py-0.5 rounded-full font-mono font-bold flex items-center gap-1">
                          📌 PINNED
                        </span>
                      )}

                      <div className="flex flex-wrap gap-1.5 items-center mb-2">
                        <span className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-350 px-2 py-0.5 rounded font-mono font-bold uppercase">
                          Kanal: {th.category.toUpperCase()}
                        </span>
                        {th.tags.map((tag: string, i: number) => (
                          <span key={i} className="text-[9px] text-[#2B7A78] font-semibold">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <h4 
                        onClick={() => setSelectedThreadId(th.id)}
                        className="font-display font-black text-sm text-slate-800 dark:text-slate-200 hover:text-[#2B7A78] cursor-pointer leading-snug"
                      >
                        {th.title}
                      </h4>

                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                        {th.content}
                      </p>

                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
                        <span>Penulis: <strong>{th.author}</strong></span>
                        
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => handleLikeThread(th.id)} 
                            className="flex items-center gap-1 hover:text-[#2B7A78] transition"
                          >
                            <ThumbsUp className="h-3.5 w-3.5" />
                            <span>{th.likes}</span>
                          </button>
                          
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-3.5 w-3.5" />
                            <span>{th.repliesCount} Balasan</span>
                          </span>

                          <button 
                            onClick={() => setShowAISummary(showAISummary === th.id ? null : th.id)}
                            className="flex items-center gap-1 text-[#2B7A78] font-bold hover:underline"
                          >
                            <Bot className="h-3.5 w-3.5 animate-pulse" />
                            <span>Ringkasan AI</span>
                          </button>
                        </div>
                      </div>

                      {/* AI SUMMARY BOX DISKUSI */}
                      {showAISummary === th.id && (
                        <div className="mt-3 p-3 bg-gradient-to-r from-teal-50 to-indigo-50 dark:from-teal-950/20 dark:to-indigo-950/20 border border-[#2B7A78]/20 dark:border-[#2B7A78]/40 rounded-xl text-xs text-slate-700 dark:text-slate-350 animate-fade-in text-left">
                          <div className="flex items-center gap-1.5 font-bold mb-1 text-[#002B5B] dark:text-[#38bdf8]">
                            <Bot className="h-4 w-4" />
                            <span>Disarikan oleh Gemini Intelligence</span>
                          </div>
                          <p className="leading-relaxed text-[11px]">{th.aiSummary}</p>
                        </div>
                      )}

                      {/* POLLING INTERACTION BOX */}
                      {th.polling && (
                        <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl max-w-lg space-y-3">
                          <h5 className="text-xs font-black text-slate-700 dark:text-slate-300 flex items-center gap-1">
                            <BarChart2 className="h-4 w-4" />
                            <span>{th.polling.question}</span>
                          </h5>
                          <div className="space-y-2">
                            {th.polling.options.map((opt: any, idx: number) => {
                              const pct = th.polling.totalVotes ? Math.round((opt.votes / th.polling.totalVotes) * 100) : 0;
                              const hasVoted = th.polling.userVotedIdx !== -1;
                              const isThisVoted = th.polling.userVotedIdx === idx;
                              
                              return (
                                <div key={idx} className="relative">
                                  <button 
                                    disabled={hasVoted}
                                    onClick={() => handleVotePoll(th.id, idx)}
                                    className={`w-full text-left p-2.5 rounded-lg border text-xs font-semibold relative overflow-hidden transition ${
                                      isThisVoted ? 'border-[#2B7A78] bg-[#2B7A78]/5 dark:bg-[#2B7A78]/10' : 'border-slate-200 hover:bg-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900/40 dark:hover:bg-white/5'
                                    }`}
                                  >
                                    <div 
                                      className="absolute left-0 top-0 bottom-0 bg-[#2B7A78]/10 transition-all duration-500" 
                                      style={{ width: `${pct}%` }}
                                    />
                                    <div className="relative z-10 flex justify-between items-center">
                                      <span>{opt.text}</span>
                                      <span className="font-mono text-[10px] text-slate-500">{opt.votes} suara ({pct}%)</span>
                                    </div>
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                /* THREAD DETAIL DISPLAY WITH COMPLETE REPLIES, QUOTING & SOLVED MARKING */
                (() => {
                  const currentThread = threads.find(t => t.id === selectedThreadId);
                  if (!currentThread) return null;
                  
                  return (
                    <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-6">
                      <button 
                        onClick={() => setSelectedThreadId(null)} 
                        className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white transition bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg"
                      >
                        &larr; Kembali ke Daftar Thread
                      </button>

                      <div className="border-b dark:border-slate-800 pb-4 text-left">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] bg-[#2B7A78]/10 text-[#2B7A78] px-2 py-0.5 rounded font-mono font-bold uppercase">
                            {currentThread.category.toUpperCase()}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">Penulis: {currentThread.author}</span>
                        </div>
                        <h3 className="font-display font-black text-lg text-[#002B5B] dark:text-slate-100 leading-snug">{currentThread.title}</h3>
                      </div>

                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                        {currentThread.content}
                      </p>

                      {/* Thread Reactions */}
                      <div className="flex items-center gap-2.5 pt-3 border-t dark:border-slate-800">
                        <button 
                          onClick={() => handleLikeThread(currentThread.id)} 
                          className="flex items-center gap-1.5 text-xs font-bold bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-[#2B7A78]/10 hover:text-[#2B7A78] text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-xl border transition"
                        >
                          <ThumbsUp className="h-4 w-4" /> Like ({currentThread.likes})
                        </button>
                        <button 
                          onClick={() => setQuotedText(`${currentThread.author}: "${currentThread.content.slice(0, 60)}..."`)} 
                          className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:underline"
                        >
                          Kutip Postingan
                        </button>
                      </div>

                      {/* REPLIES SECTION */}
                      <div className="space-y-4 pt-4 border-t dark:border-slate-800">
                        <h4 className="font-display font-black text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                          Balasan Anggota Forum ({currentThread.replies.length})
                        </h4>

                        {currentThread.replies.length === 0 ? (
                          <p className="text-xs text-slate-400">Belum ada tanggapan. Jadilah yang pertama memberikan balasan!</p>
                        ) : (
                          <div className="space-y-4">
                            {currentThread.replies.map((rep: any) => (
                              <div 
                                key={rep.id} 
                                className={`p-4 rounded-2xl border transition-all text-left relative ${
                                  rep.isSolvedAnswer 
                                    ? 'border-emerald-500 bg-emerald-500/5 shadow-2xs' 
                                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40'
                                }`}
                              >
                                {rep.isSolvedAnswer && (
                                  <span className="absolute top-4 right-4 text-[9px] bg-emerald-600 text-white font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                                    ✓ SOLVED ANSWER
                                  </span>
                                )}

                                <div className="flex items-center gap-2 mb-3">
                                  <img 
                                    src={rep.avatar} 
                                    alt={rep.author} 
                                    className="w-8 h-8 rounded-full border shadow-3xs" 
                                    onError={(e) => {
                                      e.currentTarget.onerror = null;
                                      e.currentTarget.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100";
                                    }}
                                  />
                                  <div>
                                    <h5 className="text-xs font-black text-slate-800 dark:text-slate-200">{rep.author}</h5>
                                    <p className="text-[9px] text-slate-400 font-mono">Anggota Forum</p>
                                  </div>
                                </div>

                                {rep.quote && (
                                  <div className="mb-3 p-2 bg-slate-200/50 dark:bg-slate-800/60 border-l-4 border-[#2B7A78] text-[11px] text-slate-600 dark:text-slate-350 rounded-r font-mono italic">
                                    {rep.quote}
                                  </div>
                                )}

                                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                                  {rep.content}
                                </p>

                                <div className="mt-3.5 pt-2 border-t border-slate-200/40 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                                  <button className="hover:text-[#2B7A78] font-bold">Membantu ({rep.likes})</button>
                                  
                                  <div className="flex items-center gap-2">
                                    <button 
                                      onClick={() => setQuotedText(`${rep.author}: "${rep.content.slice(0, 45)}..."`)}
                                      className="text-[10px] text-slate-50 hover:underline"
                                    >
                                      Balas &amp; Kutip
                                    </button>
                                    
                                    {currentThread.category === 'qa' && !currentThread.isSolved && (
                                      <button 
                                        onClick={() => handleMarkSolved(currentThread.id, rep.id)}
                                        className="text-[10px] text-emerald-600 font-extrabold hover:underline"
                                      >
                                        Tandai Solusi Terpecahkan
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* REPLY FORM */}
                      <form onSubmit={handlePostReply} className="space-y-3 pt-4 border-t dark:border-slate-800">
                        {quotedText && (
                          <div className="p-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-750 text-[10px] text-slate-500 dark:text-slate-400 rounded flex justify-between items-center">
                            <span>Mengutip: <em>{quotedText}</em></span>
                            <button type="button" onClick={() => setQuotedText(null)} className="text-rose-500 font-bold">Batal</button>
                          </div>
                        )}
                        <textarea 
                          required
                          value={replyInput}
                          onChange={(e) => setReplyInput(e.target.value)}
                          placeholder="Ketik tanggapan konstruktif Anda, gunakan @nama untuk me-mention..."
                          rows={3}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#2B7A78] focus:bg-white resize-none"
                        />
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-slate-400 font-mono">Format Markdown didukung</span>
                          <button 
                            type="submit"
                            className="bg-[#2B7A78] hover:bg-[#205d5c] text-white font-black text-xs uppercase px-5 py-2 rounded-xl transition shadow-xs flex items-center gap-1.5"
                          >
                            <Send className="h-3.5 w-3.5" /> Kirim Balasan
                          </button>
                        </div>
                      </form>
                    </div>
                  );
                })()
              )}
            </div>
          </motion.div>
        )}

        {/* VIEW C: MARKETPLACE OS */}
        {effectiveTab === 'marketplace' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Quick Header Marketplace */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-[#2B7A78]" />
                <h3 className="font-display font-black text-sm text-[#002B5B] uppercase tracking-wider">
                  🛒 Multi-Vendor B2B Marketplace &amp; Rental
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setIsCreatingListing(true)}
                  className="bg-[#2B7A78] hover:bg-[#205d5c] text-white font-black text-[10px] uppercase px-3 py-1.5 rounded-xl transition flex items-center gap-1 shrink-0"
                >
                  <Plus className="h-3.5 w-3.5" /> Tambah Iklan / Lowongan / Jasa
                </button>
                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl border overflow-x-auto">
                  {[
                    { id: 'all', name: 'Semua' },
                    { id: 'jual', name: 'Jual Beli' },
                    { id: 'sewa', name: 'Rental' },
                    { id: 'jasa', name: 'Jasa' },
                    { id: 'lowongan', name: 'Lowongan' },
                    { id: 'digital', name: 'Digital' }
                  ].map(tp => (
                    <button
                      key={tp.id}
                      onClick={() => setMarketplaceType(tp.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition shrink-0 ${
                        marketplaceType === tp.id 
                          ? 'bg-white text-[#2B7A78] shadow-xs' 
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {tp.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ----------------- LOCAL MEMBER AUTHENTICATION PORTAL (WITHOUT FIREBASE) ----------------- */}
            {!marketplaceUser ? (
              <div className="bg-gradient-to-br from-slate-50 to-[#2B7A78]/5 dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 space-y-4 text-left">
                    <span className="bg-[#2B7A78]/10 text-[#2B7A78] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                      🔑 Portal Keanggotaan Marketplace
                    </span>
                    <h4 className="font-display font-black text-lg md:text-xl text-[#002B5B] dark:text-slate-100 leading-tight">
                      Gabung Sebagai Mitra Niaga Jawa Barat
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Publikasikan komoditas agro, sewa alat berat, jasa logistik, atau lowongan kerja Anda secara mandiri. Dapatkan reputasi tepercaya di ekosistem digital INFOBOS.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-[11px] text-slate-600 dark:text-slate-350">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-800 dark:text-slate-200">Anggota Free</strong>
                          <p className="text-[10px] text-slate-400">Post s.d 2 produk, penawaran harga dasar, akses direktori.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-800 dark:text-slate-200">Anggota Premium</strong>
                          <p className="text-[10px] text-slate-400">Post tanpa batas, lencana emas, akses Asisten SEO &amp; Analisis Gemini AI.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
                    {/* Tabs */}
                    <div className="flex border-b dark:border-slate-800 mb-4 pb-1">
                      <button 
                        onClick={() => { setAuthTab('login'); setAuthError(''); }}
                        className={`flex-1 text-center pb-2 text-xs font-black uppercase transition-all ${authTab === 'login' ? 'text-[#2B7A78] border-b-2 border-[#2B7A78]' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        Masuk
                      </button>
                      <button 
                        onClick={() => { setAuthTab('register'); setAuthError(''); }}
                        className={`flex-1 text-center pb-2 text-xs font-black uppercase transition-all ${authTab === 'register' ? 'text-[#2B7A78] border-b-2 border-[#2B7A78]' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        Daftar Anggota
                      </button>
                    </div>

                    {authError && (
                      <div className="mb-3 p-2 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 text-[10px] font-bold rounded-lg text-center">
                        {authError}
                      </div>
                    )}

                    {authTab === 'login' ? (
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        if (!loginEmail.trim() || !loginPassword.trim()) {
                          setAuthError('Email dan password wajib diisi!');
                          return;
                        }
                        const name = loginEmail.split('@')[0].split('.').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
                        const userObj = {
                          id: `u-${Date.now()}`,
                          name: name || 'Mitra Niaga',
                          email: loginEmail,
                          role: loginRole,
                          reputation: loginRole === 'PREMIUM_MEMBER' ? 99 : 95,
                          avatar: loginRole === 'PREMIUM_MEMBER' 
                            ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'
                            : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'
                        };
                        setMarketplaceUser(userObj);
                        localStorage.setItem('infobos_marketplace_logged_in_user', JSON.stringify(userObj));
                        setLoginEmail('');
                        setLoginPassword('');
                      }} className="space-y-3 text-left">
                        <div>
                          <label className="text-[10px] text-slate-400 font-mono block mb-1">Email Mitra</label>
                          <input 
                            type="email" 
                            required
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            placeholder="nama@email.id"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 font-mono block mb-1">Password</label>
                          <input 
                            type="password" 
                            required
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 font-mono block mb-1">Tipe Akun Simulasi</label>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => setLoginRole('MEMBER')}
                              className={`py-1.5 rounded-lg text-[10px] font-black uppercase transition ${loginRole === 'MEMBER' ? 'bg-[#2B7A78]/10 text-[#2B7A78] border border-[#2B7A78]/30' : 'bg-slate-50 dark:bg-slate-800 border border-transparent text-slate-500'}`}
                            >
                              Free Member
                            </button>
                            <button
                              type="button"
                              onClick={() => setLoginRole('PREMIUM_MEMBER')}
                              className={`py-1.5 rounded-lg text-[10px] font-black uppercase transition ${loginRole === 'PREMIUM_MEMBER' ? 'bg-amber-500/10 text-amber-600 border border-amber-500/30' : 'bg-slate-50 dark:bg-slate-800 border border-transparent text-slate-500'}`}
                            >
                              👑 Premium
                            </button>
                          </div>
                        </div>

                        {/* Quick preset logins */}
                        <div className="pt-2 border-t dark:border-slate-800 flex items-center justify-between text-[9px] text-slate-400 font-mono">
                          <span>Preset Masuk Cepat:</span>
                          <div className="flex gap-1.5">
                            <button 
                              type="button" 
                              onClick={() => { setLoginEmail('ani.lestari@free.id'); setLoginPassword('password'); setLoginRole('MEMBER'); }}
                              className="text-xs hover:text-[#2B7A78] font-bold underline"
                            >
                              Free
                            </button>
                            <span>•</span>
                            <button 
                              type="button" 
                              onClick={() => { setLoginEmail('budi.santoso@premium.id'); setLoginPassword('password'); setLoginRole('PREMIUM_MEMBER'); }}
                              className="text-xs hover:text-amber-600 font-bold underline"
                            >
                              Premium
                            </button>
                          </div>
                        </div>

                        <button 
                          type="submit"
                          className="w-full bg-[#2B7A78] hover:bg-[#205d5c] text-white font-black text-xs uppercase py-2.5 rounded-xl transition mt-2"
                        >
                          Masuk Ke Marketplace
                        </button>

                        {user && (
                          <div className="pt-2 border-t border-dashed dark:border-slate-800">
                            <button
                              type="button"
                              onClick={() => {
                                const userObj = {
                                  id: user.id || 'u-user',
                                  name: user.fullName || user.name || 'Pengguna Utama',
                                  email: user.email || 'user@infobos.id',
                                  role: user.role || 'MEMBER',
                                  reputation: user.reputation || 95,
                                  avatar: user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'
                                };
                                setMarketplaceUser(userObj);
                                localStorage.setItem('infobos_marketplace_logged_in_user', JSON.stringify(userObj));
                                alert(`🎉 Berhasil masuk menggunakan Akun Utama INFOBOS: ${userObj.name}!`);
                              }}
                              className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-750 dark:text-slate-200 font-bold text-[10px] uppercase py-2 rounded-xl transition flex items-center justify-center gap-1.5 border border-slate-200/60 dark:border-slate-700/60"
                            >
                              👤 Masuk Instan dengan Akun Utama ({user.fullName || user.name || 'User'})
                            </button>
                          </div>
                        )}
                      </form>
                    ) : (
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        if (!registerName.trim() || !registerEmail.trim() || !registerPassword.trim()) {
                          setAuthError('Semua kolom registrasi wajib diisi!');
                          return;
                        }
                        const userObj = {
                          id: `u-${Date.now()}`,
                          name: registerName,
                          email: registerEmail,
                          role: registerRole,
                          reputation: registerRole === 'PREMIUM_MEMBER' ? 100 : 95,
                          avatar: registerRole === 'PREMIUM_MEMBER' 
                            ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'
                            : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'
                        };
                        setMarketplaceUser(userObj);
                        localStorage.setItem('infobos_marketplace_logged_in_user', JSON.stringify(userObj));
                        setRegisterName('');
                        setRegisterEmail('');
                        setRegisterPassword('');
                      }} className="space-y-3 text-left">
                        <div>
                          <label className="text-[10px] text-slate-400 font-mono block mb-1">Nama Lengkap / CV</label>
                          <input 
                            type="text" 
                            required
                            value={registerName}
                            onChange={(e) => setRegisterName(e.target.value)}
                            placeholder="Contoh: CV Tani Subur Jabar"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 font-mono block mb-1">Email Resmi</label>
                          <input 
                            type="email" 
                            required
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                            placeholder="official@perusahaan.id"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 font-mono block mb-1">Password</label>
                          <input 
                            type="password" 
                            required
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            placeholder="Buat sandi aman..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 font-mono block mb-1">Tingkatan Anggota (Pilih Tier)</label>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => setRegisterRole('MEMBER')}
                              className={`py-1.5 rounded-lg text-[10px] font-black uppercase transition ${registerRole === 'MEMBER' ? 'bg-[#2B7A78]/10 text-[#2B7A78] border border-[#2B7A78]/30' : 'bg-slate-50 dark:bg-slate-800 border border-transparent text-slate-500'}`}
                            >
                              Free (Mulai Gratis)
                            </button>
                            <button
                              type="button"
                              onClick={() => setRegisterRole('PREMIUM_MEMBER')}
                              className={`py-1.5 rounded-lg text-[10px] font-black uppercase transition ${registerRole === 'PREMIUM_MEMBER' ? 'bg-amber-500/10 text-amber-600 border border-amber-500/30' : 'bg-slate-50 dark:bg-slate-800 border border-transparent text-slate-500'}`}
                            >
                              👑 Premium
                            </button>
                          </div>
                        </div>
                        <button 
                          type="submit"
                          className="w-full bg-[#2B7A78] hover:bg-[#205d5c] text-white font-black text-xs uppercase py-2.5 rounded-xl transition mt-2 animate-pulse"
                        >
                          Daftar &amp; Masuk Sekarang
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-[#2B7A78]/10 to-[#002B5B]/10 border border-[#2B7A78]/30 rounded-3xl p-5 shadow-xs text-left">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <img 
                      src={marketplaceUser.avatar} 
                      alt={marketplaceUser.name} 
                      className="w-12 h-12 rounded-full border-2 border-white shadow-3xs"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-display font-black text-sm text-slate-800 dark:text-slate-100">{marketplaceUser.name}</h4>
                        {marketplaceUser.role === 'PREMIUM_MEMBER' ? (
                          <span className="bg-amber-500/10 text-amber-600 text-[8px] font-mono font-extrabold px-2.5 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-0.5 shadow-3xs animate-pulse">
                            ⭐ PREMIUM MEMBER
                          </span>
                        ) : (
                          <span className="bg-slate-100 text-slate-600 text-[8px] font-mono font-extrabold px-2 py-0.5 rounded-full border border-slate-200">
                            FREE MEMBER
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                        Mitra: {marketplaceUser.email} | Reputasi Penjual: {marketplaceUser.reputation}%
                      </p>
                      
                      {/* Show Posted Listing Count for user */}
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                        {marketplaceUser.role === 'MEMBER' ? (
                          <span>📦 Kuota Listing Anda: <strong className="text-[#2B7A78]">{listings.filter(l => l.seller && l.seller.email === marketplaceUser.email).length} / 2</strong></span>
                        ) : (
                          <span>📦 Kuota Listing Anda: <strong className="text-amber-600">UNLIMITED (Premium Berkelanjutan)</strong></span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    {marketplaceUser.role === 'MEMBER' && (
                      <button
                        onClick={() => {
                          const upgradedUser = { ...marketplaceUser, role: 'PREMIUM_MEMBER' };
                          setMarketplaceUser(upgradedUser);
                          localStorage.setItem('infobos_marketplace_logged_in_user', JSON.stringify(upgradedUser));
                          alert("🎉 Selamat! Anda telah berhasil upgrade ke PREMIUM MEMBER. Silakan nikmati posting iklan tanpa batas, gold badge, dan akses Asisten SEO Gemini AI!");
                        }}
                        className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-[9px] uppercase px-4 py-2 rounded-xl transition shadow-xs flex items-center gap-1.5 animate-bounce"
                      >
                        👑 UPGRADE KE PREMIUM
                      </button>
                    )}
                    
                    <button
                      onClick={() => setIsCreatingListing(true)}
                      className="bg-[#2B7A78] hover:bg-[#205d5c] text-white font-black text-[9px] uppercase px-4 py-2 rounded-xl transition shadow-xs"
                    >
                      Tambah Produk Baru
                    </button>
                    
                    <button
                      onClick={() => {
                        localStorage.removeItem('infobos_marketplace_logged_in_user');
                        setMarketplaceUser(null);
                      }}
                      className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-500 dark:text-slate-400 font-bold text-[9px] uppercase px-3 py-2 rounded-xl transition"
                    >
                      Keluar (Log Out)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Marketplace Grid and Sidebar Filter Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* Product Listing Card lists */}
              <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-5">
                {filteredListings.map(lst => (
                  <div key={lst.id} className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xs hover:shadow-md transition duration-300 flex flex-col justify-between text-left">
                    <div className="relative">
                      <img 
                        src={lst.image} 
                        alt={lst.title} 
                        className="w-full h-44 object-cover" 
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&q=80&w=400";
                        }}
                      />
                      <span className={`absolute top-3 left-3 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full text-white shadow-xs ${
                        lst.type === 'sewa' ? 'bg-amber-600' : lst.type === 'digital' ? 'bg-indigo-600' : lst.type === 'jasa' ? 'bg-teal-600' : lst.type === 'lowongan' ? 'bg-emerald-600' : 'bg-[#2B7A78]'
                      }`}>
                        {lst.type === 'sewa' ? 'RENTAL / SEWA' : lst.type === 'digital' ? 'PRODUK DIGITAL' : lst.type === 'jasa' ? 'JASA PROFESIONAL' : lst.type === 'lowongan' ? 'LOWONGAN KERJA' : 'DIJUAL'}
                      </span>
                      {lst.isPremiumSeller && (
                        <span className="absolute top-3 right-3 text-[8px] bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs flex items-center gap-0.5 animate-pulse border border-amber-400">
                          ⭐ PREMIUM SELLER
                        </span>
                      )}
                    </div>

                    <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                          <span>{lst.category}</span>
                          <span className="flex items-center gap-0.5 text-amber-500 font-bold"><Star className="h-3 w-3 fill-amber-500" /> {lst.rating}</span>
                        </div>

                        <h4 className="font-display font-black text-sm text-slate-800 leading-snug hover:text-[#2B7A78] cursor-pointer mt-1">
                          {lst.title}
                        </h4>

                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                          {lst.description}
                        </p>

                        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-baseline justify-between">
                          <div>
                            <span className="text-[10px] text-slate-400 block font-mono">
                              {lst.type === 'sewa' ? 'Harga per Hari' : lst.type === 'lowongan' ? 'Gaji Bulanan' : lst.type === 'jasa' ? 'Tarif Jasa (Mulai)' : 'Harga Nett'}
                            </span>
                            <span className="font-black text-sm text-slate-800">
                              Rp {lst.price.toLocaleString('id-ID')}
                            </span>
                          </div>
                          {lst.discount && (
                            <span className="text-[9px] bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded font-bold">
                              Potongan Rp {lst.discount.toLocaleString('id-ID')}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Interactive Seller / Actions panel */}
                      <div className="mt-4 pt-3 border-t border-slate-100 space-y-3">
                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-slate-400" />
                            <strong>{lst.location}</strong>
                          </span>
                          <span>Rep: <strong>{lst.seller.reputation}%</strong></span>
                        </div>

                        {/* TRANSACTION TRIGGERS */}
                        <div className="grid grid-cols-2 gap-1.5">
                          {lst.type === 'sewa' ? (
                            <button 
                              onClick={() => { setSelectedListing(lst); setShowRentModal(true); }}
                              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-black text-[10px] uppercase py-2 rounded-lg transition"
                            >
                              Sewa Sekarang
                            </button>
                          ) : lst.type === 'lowongan' ? (
                            <button 
                              onClick={() => {
                                setApplyModalItem({
                                  id: lst.id,
                                  title: lst.title,
                                  type: 'Lowongan Kerja',
                                  budget: `Rp ${lst.price.toLocaleString('id-ID')} / bln`,
                                  issuer: lst.seller.name,
                                  description: lst.description,
                                  applicants: lst.reviewsCount
                                });
                                setApplySuccess(false);
                              }}
                              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] uppercase py-2 rounded-lg transition"
                            >
                              Lamar Pekerjaan
                            </button>
                          ) : (
                            <button 
                              onClick={() => {
                                // Direct Checkout simulator
                                setEscrowTransactions(prev => [
                                  {
                                    id: `esc-${Date.now()}`,
                                    itemTitle: lst.title,
                                    amount: lst.price - (lst.discount || 0),
                                    status: 'DITAHAN',
                                    seller: lst.seller.name,
                                    date: 'Hari ini'
                                  },
                                  ...prev
                                ]);
                                alert(`Dana ${lst.type === 'jasa' ? 'pemesanan jasa' : 'pembelian'} sebesar Rp ${(lst.price - (lst.discount || 0)).toLocaleString('id-ID')} ditahan sistem Escrow. Silakan periksa dashboard!`);
                                setActiveTab('dashboard');
                              }}
                              className="w-full bg-[#2B7A78] hover:bg-[#205d5c] text-white font-black text-[10px] uppercase py-2 rounded-lg transition"
                            >
                              {lst.type === 'jasa' ? 'Pesan Jasa (Escrow)' : 'Beli & Escrow'}
                            </button>
                          )}

                          <button 
                            onClick={() => triggerNegotiate(lst)}
                            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-[10px] uppercase py-2 rounded-lg transition"
                          >
                            Nego Harga
                          </button>
                        </div>
                        
                        <button
                          onClick={() => {
                            // Automatically find or open active chat
                            setActiveTab('chat');
                            setTimeout(() => {
                              const chatEl = document.getElementById('live-chat-section');
                              if (chatEl) {
                                chatEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              }
                            }, 120);
                          }}
                          className="w-full text-center text-[#2B7A78] font-bold text-[10px] uppercase hover:underline cursor-pointer"
                        >
                          Tanya Seller via Live Chat &rarr;
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MODALS CREATE NEW LISTING */}
            {isCreatingListing && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 text-left shadow-2xl relative my-8">
                  <button onClick={() => setIsCreatingListing(false)} className="absolute right-4 top-4 text-slate-400 font-bold text-lg hover:text-slate-600">&times;</button>
                  
                  <div className="flex items-center gap-2 mb-1">
                    <Plus className="h-5 w-5 text-[#2B7A78]" />
                    <h3 className="font-display font-black text-base text-[#002B5B] uppercase">📢 Buat Iklan / Jasa / Lowongan Baru</h3>
                  </div>
                  <p className="text-[10px] text-slate-400 mb-4">Lengkapi form di bawah ini untuk menampilkan iklan atau listing lowongan kerja dan jasa Anda di portal.</p>
                  
                  <form onSubmit={handleCreateListingSubmit} className="space-y-4">
                    <div>
                      <label className="text-[10px] text-slate-400 font-mono block mb-1">Tipe Iklan / Listing</label>
                      <select 
                        value={newListingType} 
                        onChange={(e) => {
                          const val = e.target.value as any;
                          setNewListingType(val);
                          if (val === 'lowongan') {
                            setNewListingCategory('Lowongan Kerja');
                            setNewListingCondition('Full-Time');
                          } else if (val === 'jasa') {
                            setNewListingCategory('Jasa Profesional');
                            setNewListingCondition('Layanan Kontrak');
                          } else if (val === 'digital') {
                            setNewListingCategory('Produk Digital');
                            setNewListingCondition('Produk Digital');
                          } else {
                            setNewListingCategory('Mesin & Industri');
                            setNewListingCondition('Baru');
                          }
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#2B7A78] focus:bg-white"
                      >
                        <option value="jual">Jual Beli (Produk/Barang)</option>
                        <option value="sewa">Rental / Sewa (Aset/Alat)</option>
                        <option value="jasa">Jasa / Layanan Profesional</option>
                        <option value="lowongan">Lowongan Kerja</option>
                        <option value="digital">Produk Digital (Data/Software)</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-slate-400 font-mono block mb-1">Kategori</label>
                        <select 
                          value={newListingCategory} 
                          onChange={(e) => setNewListingCategory(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#2B7A78] focus:bg-white"
                        >
                          <option value="Mesin & Industri">Mesin &amp; Industri</option>
                          <option value="Pertanian">Pertanian / Agrikultur</option>
                          <option value="Teknologi">Teknologi &amp; Dashboard</option>
                          <option value="Jasa Profesional">Jasa Profesional</option>
                          <option value="Lowongan Kerja">Lowongan Kerja</option>
                          <option value="Produk Digital">Produk Digital</option>
                          <option value="Lainnya">Lainnya</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 font-mono block mb-1">Status / Kondisi</label>
                        <select 
                          value={newListingCondition} 
                          onChange={(e) => setNewListingCondition(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#2B7A78] focus:bg-white"
                        >
                          <option value="Baru">Baru</option>
                          <option value="Bekas">Bekas / Second</option>
                          <option value="Sangat Baik">Sangat Baik</option>
                          <option value="Layanan Kontrak">Layanan Kontrak</option>
                          <option value="Full-Time">Full-Time (Pekerjaan)</option>
                          <option value="Part-Time">Part-Time (Pekerjaan)</option>
                          <option value="Produk Digital">Sifat Digital</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 font-mono block mb-1">Judul Listing</label>
                      <input 
                        type="text" 
                        required
                        value={newListingTitle}
                        onChange={(e) => setNewListingTitle(e.target.value)}
                        placeholder={newListingType === 'lowongan' ? 'Contoh: Lowongan Operator CNC Lathe' : newListingType === 'jasa' ? 'Contoh: Jasa Penyusunan Lap. Pajak' : 'Contoh: Jual Traktor Mini Sawah'}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#2B7A78] focus:bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-slate-400 font-mono block mb-1">
                          {newListingType === 'lowongan' ? 'Gaji Per Bulan (Rp)' : newListingType === 'jasa' ? 'Harga Jasa Mulai Dari (Rp)' : 'Harga / Tarif Sewa (Rp)'}
                        </label>
                        <input 
                          type="number" 
                          required
                          min={1000}
                          value={newListingPrice || ''}
                          onChange={(e) => setNewListingPrice(Number(e.target.value))}
                          placeholder="Masukkan angka nominal"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#2B7A78] focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 font-mono block mb-1">Lokasi Kerja / Wilayah</label>
                        <input 
                          type="text" 
                          required
                          value={newListingLocation}
                          onChange={(e) => setNewListingLocation(e.target.value)}
                          placeholder="Contoh: Bandung Barat, Bekasi"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#2B7A78] focus:bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 font-mono block mb-1">Deskripsi Lengkap / Kualifikasi</label>
                      <textarea 
                        required
                        value={newListingDescription}
                        onChange={(e) => setNewListingDescription(e.target.value)}
                        rows={3}
                        placeholder={newListingType === 'lowongan' ? 'Sebutkan kualifikasi minimal, jam kerja, benefit, dll...' : 'Tuliskan deskripsi lengkap, keunggulan, spesifikasi...'}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#2B7A78] focus:bg-white resize-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 font-mono block mb-1">Tags / Kata Kunci (Pisahkan dengan koma)</label>
                      <input 
                        type="text" 
                        value={newListingTags}
                        onChange={(e) => setNewListingTags(e.target.value)}
                        placeholder="Contoh: cnc, operator, manufaktur atau konsultan, pajak, jasa"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#2B7A78] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 font-mono block mb-1">Foto / Gambar URL (Opsional)</label>
                      <input 
                        type="text" 
                        value={newListingImage}
                        onChange={(e) => setNewListingImage(e.target.value)}
                        placeholder="Biarkan kosong untuk auto-generate ilustrasi industri dari Unsplash"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#2B7A78] focus:bg-white"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-3 border-t">
                      <button 
                        type="button" 
                        onClick={() => setIsCreatingListing(false)} 
                        className="px-4 py-2 text-xs text-slate-500 font-semibold hover:text-slate-800 transition"
                      >
                        Batal
                      </button>
                      <button 
                        type="submit"
                        className="bg-[#2B7A78] hover:bg-[#205d5c] text-white font-black text-xs uppercase px-5 py-2 rounded-xl transition shadow-xs"
                      >
                        Pasang Iklan Sekarang
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* MODALS RENTAL booking calendar */}
            {showRentModal && selectedListing && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 text-left shadow-2xl relative">
                  <button onClick={() => setShowRentModal(false)} className="absolute right-4 top-4 text-slate-400 font-bold text-lg">&times;</button>
                  <h3 className="font-display font-black text-base text-[#002B5B] uppercase mb-1">📅 Kalender Sewa &amp; Booking Aset</h3>
                  <p className="text-[10px] text-slate-400 mb-4">Pilih durasi sewa. Deposit pengembalian akan dikalkulasikan secara otomatis.</p>
                  
                  <div className="space-y-4">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                      <p className="font-bold text-slate-800">{selectedListing.title}</p>
                      <p className="text-slate-500 mt-1">Tarif Sewa: Rp {selectedListing.price.toLocaleString('id-ID')} / Hari</p>
                      <p className="text-[10px] text-slate-400">Ketentuan Deposit Jaminan: Rp {selectedListing.rentalInfo?.deposit.toLocaleString('id-ID')}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-slate-400 font-mono block mb-1">Mulai Tanggal</label>
                        <input 
                          type="date" 
                          value={rentStartDate}
                          onChange={(e) => setRentStartDate(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 font-mono block mb-1">Durasi Sewa (Hari)</label>
                        <input 
                          type="number" 
                          min={selectedListing.rentalInfo?.minDuration || 1}
                          value={rentDuration}
                          onChange={(e) => setRentDuration(Number(e.target.value))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-teal-50 border border-teal-200 text-slate-700 text-xs rounded-xl flex justify-between items-center">
                      <div>
                        <p className="text-[10px] text-slate-500">Estimasi Total + Deposit</p>
                        <p className="font-black text-slate-800 text-sm">Rp {calculateTotalRent(selectedListing).toLocaleString('id-ID')}</p>
                      </div>
                      <span className="text-[9px] text-teal-700 font-mono text-right leading-relaxed">
                        Sewa: Rp {(selectedListing.price * rentDuration).toLocaleString('id-ID')}<br />
                        Deposit: Rp {selectedListing.rentalInfo?.deposit.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <p className="text-[9px] text-slate-400 italic">
                      Late-fee/denda keterlambatan pengembalian sebesar Rp {selectedListing.rentalInfo?.lateFee.toLocaleString('id-ID')} per jam berlaku jika melewati batas waktu.
                    </p>

                    <div className="flex justify-end gap-2 pt-2 border-t">
                      <button onClick={() => setShowRentModal(false)} className="px-3 py-1.5 text-xs text-slate-500 font-semibold">Batal</button>
                      <button 
                        onClick={handleConfirmRent}
                        className="bg-amber-600 hover:bg-amber-700 text-white font-black text-xs uppercase px-4 py-1.5 rounded-lg transition"
                      >
                        Konfirmasi Booking &amp; Bayar Invoice
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MODALS NEGOTIATION WIDGET CHAT */}
            {showNegotiateModal && selectedListing && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 text-left shadow-2xl relative flex flex-col max-h-[90vh]">
                  <button onClick={() => setShowNegotiateModal(false)} className="absolute right-4 top-4 text-slate-400 font-bold text-lg">&times;</button>
                  
                  <div className="border-b pb-2 mb-3">
                    <h3 className="font-display font-black text-sm text-[#002B5B] uppercase flex items-center gap-1.5">
                      <TrendingUp className="h-4.5 w-4.5 text-[#2B7A78]" />
                      <span>Ruang Negosiasi Harga Real-Time</span>
                    </h3>
                    <p className="text-[10px] text-slate-400">Negosiasikan harga barang dengan bot/penjual menggunakan parameter persetujuan otomatis.</p>
                  </div>

                  {/* Negotiation logs */}
                  <div className="flex-grow overflow-y-auto space-y-2.5 p-3 bg-slate-50 border border-slate-200 rounded-xl mb-4 max-h-[300px]">
                    {offerHistory.map((oh, i) => (
                      <div key={i} className={`p-2 rounded-lg text-xs font-semibold ${
                        oh.sender === 'Pembeli (Anda)' 
                          ? 'bg-teal-50 dark:bg-teal-950/20 text-teal-800 dark:text-teal-400 text-right self-end ml-12' 
                          : oh.isApproved 
                            ? 'bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-850 text-emerald-800 dark:text-emerald-400'
                            : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 mr-12'
                      }`}>
                        <p className="text-[9px] text-slate-400 font-mono block">{oh.sender} • {oh.time}</p>
                        <p className="mt-0.5">{oh.text}</p>
                        {oh.isCounter && (
                          <button 
                            onClick={() => acceptCounterOffer(oh.amount)}
                            className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[9px] uppercase px-2 py-1 rounded transition"
                          >
                            Setujui Counter Offer Rp {oh.amount.toLocaleString('id-ID')}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Offer input */}
                  <div className="space-y-3 pt-3 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-mono">Ajukan Penawaran Baru Anda</span>
                      <span className="text-xs font-mono text-slate-500">Harga Awal: Rp {selectedListing.price.toLocaleString('id-ID')}</span>
                    </div>

                    <div className="flex gap-2">
                      <input 
                        type="number" 
                        value={offerPrice}
                        onChange={(e) => setOfferPrice(Number(e.target.value))}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:outline-none"
                      />
                      <button 
                        onClick={submitOffer}
                        className="bg-[#2B7A78] hover:bg-[#205d5c] text-white font-black text-xs uppercase px-4 py-2 rounded-lg transition shrink-0"
                      >
                        Kirim Penawaran
                      </button>
                    </div>

                    <p className="text-[9px] text-slate-400">
                      Saran AI: Penawaran di atas 90% dari harga awal memiliki kemungkinan 95% disetujui instan oleh penjual.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* VIEW D: BUSINESS DIRECTORY */}
        {effectiveTab === 'directory' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* List of Companies */}
            <div className={`lg:col-span-5 space-y-4 ${selectedCompanyId ? 'hidden lg:block' : 'block'}`}>
              <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-3xs">
                <h3 className="font-display font-black text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3">
                  🏢 Perusahaan Jasa &amp; Manufaktur Terdaftar
                </h3>

                <div className="space-y-3">
                  {companies.map(co => (
                    <div 
                      key={co.id} 
                      onClick={() => { setSelectedCompanyId(co.id); setLeadSuccess(false); }}
                      className={`p-3.5 border rounded-xl cursor-pointer transition text-left ${
                        selectedCompanyId === co.id 
                          ? 'border-[#2B7A78] bg-[#2B7A78]/5 dark:bg-[#2B7A78]/10' 
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 flex items-center gap-1">
                          <span>{co.name}</span>
                          {co.isVerified && <span className="text-emerald-500" title="Terverifikasi Hukum">✓</span>}
                        </h4>
                        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono text-slate-500 dark:text-slate-400">{co.industry}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">{co.about}</p>
                      
                      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                        <span>Cabang: {co.branches.split(',')[0]} &amp; sekitarnya</span>
                        <span className="flex items-center gap-0.5 text-amber-500 font-bold">★ {co.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Detailed view & Lead forms for chosen PT */}
            <div className={`lg:col-span-7 ${!selectedCompanyId ? 'hidden lg:block' : 'block'}`}>
              {selectedCompanyId ? (
                (() => {
                  const company = companies.find(c => c.id === selectedCompanyId);
                  if (!company) return null;

                  return (
                    <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 text-left space-y-6">
                      <button 
                        onClick={() => setSelectedCompanyId(null)} 
                        className="lg:hidden text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white transition bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg mb-2 inline-flex items-center gap-1.5"
                      >
                        &larr; Kembali ke Daftar Perusahaan
                      </button>
                      <div className="border-b dark:border-slate-800 pb-4">
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                          <span className="text-[9px] bg-emerald-500/10 text-emerald-600 border border-emerald-500/30 font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 font-mono uppercase">
                            <ShieldCheck className="h-3 w-3" /> VERIFIED BUSINESS IDENTITY
                          </span>
                          <span className="text-xs font-mono text-slate-400 dark:text-slate-500">Skala Karyawan: {company.employees}</span>
                        </div>
                        <h3 className="font-display font-black text-lg text-[#002B5B] dark:text-slate-100 leading-none">{company.name}</h3>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 font-mono mt-1.5">Cabang Utama: {company.branches} | Sertifikasi: {company.certified}</p>
                      </div>

                      <div>
                        <h4 className="font-display font-black text-xs text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Tentang Perusahaan</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{company.about}</p>
                      </div>

                      {/* CATALOG ITEMS */}
                      <div>
                        <h4 className="font-display font-black text-xs text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">Katalog Layanan &amp; Produk</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {company.catalog.map((cat, i) => (
                            <div key={i} className="p-3 bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-850 rounded-xl flex justify-between items-center">
                              <div>
                                <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">{cat.name}</h5>
                                <span className="text-[10px] text-[#2B7A78] font-black block mt-0.5">{cat.price}</span>
                              </div>
                              <span className="text-slate-300 dark:text-slate-600 font-bold text-xs">&rarr;</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* LEAD FORM SECTION */}
                      <div className="p-5 bg-gradient-to-r from-teal-50 to-indigo-50 dark:from-teal-950/20 dark:to-indigo-950/20 border border-slate-200 dark:border-slate-800 rounded-2xl">
                        <h4 className="font-display font-black text-xs text-[#002B5B] dark:text-slate-200 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
                          <Mail className="h-4 w-4 text-[#2B7A78]" />
                          <span>Kirim Form Prospek / RFQ Hub Bisnis</span>
                        </h4>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-4">Butuh informasi penawaran khusus atau kontrak B2B? Kirim inquiry langsung ke perwakilan sales PT.</p>

                        {leadSuccess ? (
                          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-400 text-xs font-bold rounded-xl text-center flex flex-col items-center gap-1.5">
                            <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-450" />
                            <span>Inquiry Penawaran Berhasil Dikirimkan!</span>
                            <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono font-medium">Tim perwakilan sales perusahaan akan merespon dalam waktu maksimal 24 jam kerja.</span>
                          </div>
                        ) : (
                          <form onSubmit={submitLeadForm} className="space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="text-[10px] text-slate-400 dark:text-slate-500 font-mono block mb-1">Nama / Perusahaan Anda</label>
                                <input 
                                  type="text" 
                                  required
                                  value={leadFormName}
                                  onChange={(e) => setLeadFormName(e.target.value)}
                                  placeholder="Contoh: CV Maju Sejahtera"
                                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-lg p-2 text-xs focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-slate-400 dark:text-slate-500 font-mono block mb-1">Kebutuhan Proyek</label>
                                <select className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-lg p-2 text-xs focus:outline-none">
                                  <option>Negosiasi Kontrak Berkelanjutan</option>
                                  <option>Penyewaan Skala Besar</option>
                                  <option>Kemitraan Supply-Chain</option>
                                </select>
                              </div>
                            </div>
                            <div>
                              <label className="text-[10px] text-slate-400 dark:text-slate-500 font-mono block mb-1">Rincian Inquiry / Kebutuhan</label>
                              <textarea 
                                required
                                value={leadFormMessage}
                                onChange={(e) => setLeadFormMessage(e.target.value)}
                                placeholder="Tuliskan spesifikasi produk, volume pengiriman, dan tenggat waktu yang diharapkan..."
                                rows={3}
                                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-lg p-2 text-xs focus:outline-none resize-none"
                              />
                            </div>
                            <div className="flex justify-end pt-2">
                              <button 
                                type="submit"
                                className="bg-[#2B7A78] hover:bg-[#205d5c] text-white font-black text-xs uppercase px-5 py-2 rounded-xl transition shadow-xs"
                              >
                                Kirim Lead Penawaran &rarr;
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 border-dashed rounded-3xl p-12 text-center h-full flex flex-col justify-center items-center text-slate-400 dark:text-slate-500 text-xs">
                  <Building className="h-10 w-10 text-slate-300 dark:text-slate-700 mb-3" />
                  <p className="font-bold">Pilih salah satu direktori perusahaan di samping untuk melihat profil, sertifikasi resmi, katalog produk, dan formulir lead penawaran.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* VIEW D1.5: ORGANIZATIONS DIRECTORY */}
        {effectiveTab === 'organizations' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* List of Organizations */}
            <div className={`lg:col-span-5 space-y-4 ${selectedOrganizationId ? 'hidden lg:block' : 'block'}`}>
              <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-3xs text-left">
                <h3 className="font-display font-black text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>🏢 Direktori Organisasi Resmi Jabar</span>
                  <span className="bg-teal-500/10 text-teal-500 text-[9px] px-1.5 py-0.5 rounded font-mono font-bold">{organizations.length} Organisasi</span>
                </h3>

                <div className="space-y-3">
                  {organizations.filter(org => 
                    org.name.toLowerCase().includes(universalSearch.toLowerCase()) ||
                    org.type.toLowerCase().includes(universalSearch.toLowerCase()) ||
                    org.focusArea.toLowerCase().includes(universalSearch.toLowerCase()) ||
                    org.about.toLowerCase().includes(universalSearch.toLowerCase())
                  ).map(org => (
                    <div 
                      key={org.id} 
                      onClick={() => { setSelectedOrganizationId(org.id); setOrgInquirySuccess(false); }}
                      className={`p-3.5 border rounded-xl cursor-pointer transition text-left ${
                        selectedOrganizationId === org.id 
                          ? 'border-teal-500 bg-teal-500/5 dark:bg-teal-500/10' 
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                          <span>{org.name}</span>
                          {org.isVerified && <span className="text-emerald-500" title="Terverifikasi Hukum">✓</span>}
                        </h4>
                        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono text-slate-500 dark:text-slate-400 shrink-0">{org.headquarters}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">{org.about}</p>
                      
                      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                        <span className="text-teal-600 dark:text-teal-400 font-medium">{org.type}</span>
                        <span className="flex items-center gap-0.5 text-amber-500 font-bold">★ {org.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Detailed view & Partnership inquiry for chosen Organization */}
            <div className={`lg:col-span-7 ${!selectedOrganizationId ? 'hidden lg:block' : 'block'}`}>
              {selectedOrganizationId ? (
                (() => {
                  const org = organizations.find(o => o.id === selectedOrganizationId);
                  if (!org) return null;

                  return (
                    <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 text-left space-y-6">
                      <button 
                        onClick={() => setSelectedOrganizationId(null)} 
                        className="lg:hidden text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white transition bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg mb-2 inline-flex items-center gap-1.5"
                      >
                        &larr; Kembali ke Daftar Organisasi
                      </button>
                      <div className="border-b dark:border-slate-800 pb-4">
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                          <span className="text-[9px] bg-teal-500/10 text-teal-600 border border-teal-500/30 font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 font-mono uppercase">
                            <ShieldCheck className="h-3 w-3" /> VERIFIED SOCIAL IDENTITY
                          </span>
                          <span className="text-xs font-mono text-slate-400 dark:text-slate-500">Kekuatan: {org.volunteers}</span>
                        </div>
                        <h3 className="font-display font-black text-lg text-[#002B5B] dark:text-slate-100 leading-none">{org.name}</h3>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 font-mono mt-1.5">Fokus: {org.focusArea} | Sertifikasi: {org.certified}</p>
                      </div>

                      <div>
                        <h4 className="font-display font-black text-xs text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Profil &amp; Visi Organisasi</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{org.about}</p>
                      </div>

                      {/* PROGRAM / INISIATIF AKTIF */}
                      <div>
                        <h4 className="font-display font-black text-xs text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">Program &amp; Inisiatif Berjalan</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {org.programs.map((prog, i) => (
                            <div key={i} className="p-3 bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-850 rounded-xl flex justify-between items-center">
                              <div>
                                <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">{prog.name}</h5>
                                <span className="text-[10px] text-teal-600 font-black block mt-0.5">Pendanaan: {prog.budget}</span>
                              </div>
                              <span className="text-slate-300 dark:text-slate-600 font-bold text-xs">&rarr;</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* PARTNERSHIP LEAD FORM SECTION */}
                      <div className="p-5 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/20 dark:to-emerald-950/20 border border-slate-200 dark:border-slate-800 rounded-2xl">
                        <h4 className="font-display font-black text-xs text-[#002B5B] dark:text-slate-200 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
                          <Mail className="h-4 w-4 text-teal-600" />
                          <span>Kirim Proposal Kemitraan &amp; Kolaborasi Sosial</span>
                        </h4>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-4">Ingin berkolaborasi dalam penelitian, kampanye sosial, atau penyaluran CSR? Kirimkan formulir kemitraan resmi langsung ke sekretariat organisasi.</p>

                        {orgInquirySuccess ? (
                          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-400 text-xs font-bold rounded-xl text-center flex flex-col items-center gap-1.5">
                            <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-450" />
                            <span>Proposal Kemitraan Berhasil Terkirim!</span>
                            <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono font-medium">Sekretariat organisasi akan menghubungi Anda kembali via email terdaftar dalam maksimal 3 hari kerja.</span>
                          </div>
                        ) : (
                          <form onSubmit={submitOrgInquiry} className="space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="text-[10px] text-slate-400 dark:text-slate-500 font-mono block mb-1">Nama Organisasi / Perusahaan Anda</label>
                                <input 
                                  type="text" 
                                  required
                                  value={orgInquiryName}
                                  onChange={(e) => setOrgInquiryName(e.target.value)}
                                  placeholder="Contoh: PT Agro Lestari Mandiri"
                                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-lg p-2 text-xs focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-slate-400 dark:text-slate-500 font-mono block mb-1">Jenis Kolaborasi</label>
                                <select className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-lg p-2 text-xs focus:outline-none">
                                  <option>Penyaluran CSR &amp; Program Pemberdayaan</option>
                                  <option>Kolaborasi Riset &amp; Pengabdian Masyarakat</option>
                                  <option>Kampanye Hijau &amp; Media Partner</option>
                                </select>
                              </div>
                            </div>
                            <div>
                              <label className="text-[10px] text-slate-400 dark:text-slate-500 font-mono block mb-1">Rincian Rencana Sinergi</label>
                              <textarea 
                                required
                                value={orgInquiryMessage}
                                onChange={(e) => setOrgInquiryMessage(e.target.value)}
                                placeholder="Tulis rincian singkat program, sasaran penerima manfaat, bentuk bantuan, serta jadwal pelaksanaan..."
                                rows={3}
                                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-lg p-2 text-xs focus:outline-none resize-none"
                              />
                            </div>
                            <div className="flex justify-end pt-2">
                              <button 
                                type="submit"
                                className="bg-teal-600 hover:bg-teal-700 text-white font-black text-xs uppercase px-5 py-2 rounded-xl transition shadow-xs"
                              >
                                Ajukan Sinergi Kemitraan &rarr;
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 border-dashed rounded-3xl p-12 text-center h-full flex flex-col justify-center items-center text-slate-400 dark:text-slate-500 text-xs">
                  <Globe className="h-10 w-10 text-slate-300 dark:text-slate-700 mb-3" />
                  <p className="font-bold">Pilih salah satu organisasi terdaftar di samping untuk melihat profil, sertifikasi kelembagaan, inisiatif aktif, dan formulir sinergi.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* VIEW D1.6: AUTHORS DIRECTORY */}
        {effectiveTab === 'authors' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* List of Authors */}
            <div className={`lg:col-span-5 space-y-4 ${selectedAuthorId ? 'hidden lg:block' : 'block'}`}>
              <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-3xs text-left">
                <h3 className="font-display font-black text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>✍️ Direktori Penulis &amp; Jurnalis Resmi</span>
                  <span className="bg-[#2B7A78]/10 text-[#2B7A78] text-[9px] px-1.5 py-0.5 rounded font-mono font-bold">{authors.length} Jurnalis</span>
                </h3>

                <div className="space-y-3">
                  {authors.filter(auth => 
                    auth.name.toLowerCase().includes(universalSearch.toLowerCase()) ||
                    auth.role.toLowerCase().includes(universalSearch.toLowerCase()) ||
                    auth.specialization.toLowerCase().includes(universalSearch.toLowerCase()) ||
                    auth.about.toLowerCase().includes(universalSearch.toLowerCase())
                  ).map(auth => (
                    <div 
                      key={auth.id} 
                      onClick={() => { setSelectedAuthorId(auth.id); setAuthorInquirySuccess(false); }}
                      className={`p-3.5 border rounded-xl cursor-pointer transition text-left ${
                        selectedAuthorId === auth.id 
                          ? 'border-[#2B7A78] bg-[#2B7A78]/5 dark:bg-[#2B7A78]/10' 
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                          <span>{auth.name}</span>
                          {auth.isVerified && <span className="text-[#2B7A78]" title="Wartawan Terverifikasi">✓</span>}
                        </h4>
                        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono text-slate-500 dark:text-slate-400 shrink-0">{auth.location}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">{auth.about}</p>
                      
                      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                        <span className="text-teal-600 dark:text-teal-400 font-medium">{auth.role}</span>
                        <span className="flex items-center gap-0.5 text-amber-500 font-bold">★ {auth.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Detailed view & Inquiry for chosen Author */}
            <div className={`lg:col-span-7 ${!selectedAuthorId ? 'hidden lg:block' : 'block'}`}>
              {selectedAuthorId ? (
                (() => {
                  const author = authors.find(a => a.id === selectedAuthorId);
                  if (!author) return null;

                  return (
                    <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 text-left space-y-6">
                      <button 
                        onClick={() => setSelectedAuthorId(null)} 
                        className="lg:hidden text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white transition bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg mb-2 inline-flex items-center gap-1.5"
                      >
                        &larr; Kembali ke Daftar Jurnalis
                      </button>
                      <div className="border-b dark:border-slate-800 pb-4">
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                          <span className="text-[9px] bg-teal-500/10 text-teal-600 border border-teal-500/30 font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 font-mono uppercase">
                            <ShieldCheck className="h-3 w-3" /> VERIFIED REDACTOR IDENTITY
                          </span>
                          <span className="text-xs font-mono text-slate-400 dark:text-slate-500">Pengalaman: {author.experience}</span>
                        </div>
                        <h3 className="font-display font-black text-lg text-[#002B5B] dark:text-slate-100 leading-none">{author.name}</h3>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 font-mono mt-1.5">Spesialisasi: {author.specialization} | Sertifikasi: {author.certified}</p>
                      </div>

                      <div>
                        <h4 className="font-display font-black text-xs text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Profil Jurnalis</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{author.about}</p>
                      </div>

                      {/* ARTIKEL / KARYA TULIS */}
                      <div>
                        <h4 className="font-display font-black text-xs text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">Karya Tulis / Artikel Investigasi Terbaru</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {author.articles.map((art, i) => (
                            <div key={i} className="p-3 bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-850 rounded-xl flex justify-between items-center">
                              <div>
                                <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-2">{art.name}</h5>
                                <span className="text-[10px] text-[#2B7A78] font-black block mt-1">Dipublikasi: {art.date}</span>
                              </div>
                              <span className="text-slate-300 dark:text-slate-600 font-bold text-xs shrink-0">&rarr;</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* INQUIRY REDAKSI FORM SECTION */}
                      <div className="p-5 bg-gradient-to-r from-teal-50 to-indigo-50 dark:from-teal-950/20 dark:to-indigo-950/20 border border-slate-200 dark:border-slate-800 rounded-2xl">
                        <h4 className="font-display font-black text-xs text-[#002B5B] dark:text-slate-200 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
                          <Mail className="h-4 w-4 text-[#2B7A78]" />
                          <span>Ajukan Wawancara Eksklusif / Liputan Khusus</span>
                        </h4>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-4">Ingin berkolaborasi dalam liputan, melayangkan rilis pers resmi, atau mengundang jurnalis sebagai pembicara? Kirim pesan penugasan Anda.</p>

                        {authorInquirySuccess ? (
                          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-400 text-xs font-bold rounded-xl text-center flex flex-col items-center gap-1.5">
                            <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-450" />
                            <span>Pesan Penugasan Berhasil Dikirimkan!</span>
                            <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono font-medium">Jurnalis kami atau perwakilan sekretariat redaksi INFOBOS akan membalas via surel dalam 24 jam.</span>
                          </div>
                        ) : (
                          <form onSubmit={submitAuthorInquiry} className="space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="text-[10px] text-slate-400 dark:text-slate-500 font-mono block mb-1">Nama / Instansi Anda</label>
                                <input 
                                  type="text" 
                                  required
                                  value={authorInquiryName}
                                  onChange={(e) => setAuthorInquiryName(e.target.value)}
                                  placeholder="Contoh: Koperasi Tani Bandung Barat"
                                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-lg p-2 text-xs focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-slate-400 dark:text-slate-500 font-mono block mb-1">Kategori Kolaborasi</label>
                                <select className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-lg p-2 text-xs focus:outline-none">
                                  <option>Permohonan Wawancara Eksklusif</option>
                                  <option>Penyampaian Dokumen Rilis Pers / Data Kunci</option>
                                  <option>Undangan Narasumber Seminar / Konferensi</option>
                                </select>
                              </div>
                            </div>
                            <div>
                              <label className="text-[10px] text-slate-400 dark:text-slate-500 font-mono block mb-1">Pesan Utama / Deskripsi Undangan</label>
                              <textarea 
                                required
                                value={authorInquiryMessage}
                                onChange={(e) => setAuthorInquiryMessage(e.target.value)}
                                placeholder="Jelaskan secara ringkas topik wawancara, rilis berita yang diusulkan, atau bentuk acara yang akan diselenggarakan..."
                                rows={3}
                                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-lg p-2 text-xs focus:outline-none resize-none"
                              />
                            </div>
                            <div className="flex justify-end pt-2">
                              <button 
                                type="submit"
                                className="bg-[#2B7A78] hover:bg-[#205d5c] text-white font-black text-xs uppercase px-5 py-2 rounded-xl transition shadow-xs"
                              >
                                Kirim Pesan Redaksi &rarr;
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 border-dashed rounded-3xl p-12 text-center h-full flex flex-col justify-center items-center text-slate-400 dark:text-slate-500 text-xs">
                  <Feather className="h-10 w-10 text-slate-300 dark:text-slate-700 mb-3" />
                  <p className="font-bold">Pilih salah satu jurnalis di samping untuk melihat profil, sertifikasi wartawan dewan pers, riwayat liputan, dan formulir pengajuan liputan.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* VIEW D1.7: EVENTS DIRECTORY */}
        {effectiveTab === 'events' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* List of Events */}
            <div className={`lg:col-span-5 space-y-4 ${selectedEventId ? 'hidden lg:block' : 'block'}`}>
              <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-3xs text-left">
                <h3 className="font-display font-black text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>📅 Agenda &amp; Pameran Bisnis Jabar</span>
                  <span className="bg-[#2B7A78]/10 text-[#2B7A78] text-[9px] px-1.5 py-0.5 rounded font-mono font-bold">{events.length} Event</span>
                </h3>

                <div className="space-y-3">
                  {events.filter(evt => 
                    evt.name.toLowerCase().includes(universalSearch.toLowerCase()) ||
                    evt.theme.toLowerCase().includes(universalSearch.toLowerCase()) ||
                    evt.category.toLowerCase().includes(universalSearch.toLowerCase()) ||
                    evt.venue.toLowerCase().includes(universalSearch.toLowerCase()) ||
                    evt.about.toLowerCase().includes(universalSearch.toLowerCase())
                  ).map(evt => (
                    <div 
                      key={evt.id} 
                      onClick={() => { setSelectedEventId(evt.id); setEventRegisterSuccess(false); }}
                      className={`p-3.5 border rounded-xl cursor-pointer transition text-left ${
                        selectedEventId === evt.id 
                          ? 'border-[#2B7A78] bg-[#2B7A78]/5 dark:bg-[#2B7A78]/10' 
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/20'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1.5">
                        <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 flex items-center gap-1.5 leading-tight">
                          <span>{evt.name}</span>
                        </h4>
                        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono text-slate-500 dark:text-slate-400 shrink-0">{evt.date.split(' ')[0]}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">{evt.theme}</p>
                      
                      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                        <span className="text-teal-600 dark:text-teal-400 font-medium">{evt.category}</span>
                        <span className="flex items-center gap-0.5 text-[#2B7A78] font-bold">★ {evt.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Detailed view & Ticket RSVP for chosen Event */}
            <div className={`lg:col-span-7 ${!selectedEventId ? 'hidden lg:block' : 'block'}`}>
              {selectedEventId ? (
                (() => {
                  const event = events.find(e => e.id === selectedEventId);
                  if (!event) return null;

                  return (
                    <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 text-left space-y-6">
                      <button 
                        onClick={() => setSelectedEventId(null)} 
                        className="lg:hidden text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white transition bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg mb-2 inline-flex items-center gap-1.5"
                      >
                        &larr; Kembali ke Daftar Event
                      </button>
                      <div className="border-b dark:border-slate-800 pb-4">
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                          <span className="text-[9px] bg-teal-500/10 text-teal-600 border border-teal-500/30 font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 font-mono uppercase">
                            <ShieldCheck className="h-3 w-3" /> VERIFIED BUSINESS EVENT
                          </span>
                          <span className="text-xs font-mono text-slate-400 dark:text-slate-500">Penyelenggara: {event.organizer}</span>
                        </div>
                        <h3 className="font-display font-black text-lg text-[#002B5B] dark:text-slate-100 leading-tight">{event.name}</h3>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 font-mono mt-1.5">Waktu: {event.date} | Lokasi: {event.venue}</p>
                      </div>

                      <div>
                        <h4 className="font-display font-black text-xs text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Deskripsi Agenda</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{event.about}</p>
                      </div>

                      {/* JADWAL ACARA */}
                      <div>
                        <h4 className="font-display font-black text-xs text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">Sesi &amp; Jadwal Harian</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {event.schedule.map((sched, i) => (
                            <div key={i} className="p-3 bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-850 rounded-xl flex justify-between items-center">
                              <div>
                                <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">{sched.name}</h5>
                                <span className="text-[10px] text-[#2B7A78] font-black block mt-1">Pukul: {sched.time}</span>
                              </div>
                              <span className="text-slate-300 dark:text-slate-600 font-bold text-xs shrink-0">&rarr;</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* REGISTRASI RSVP FORM SECTION */}
                      <div className="p-5 bg-gradient-to-r from-teal-50 to-indigo-50 dark:from-teal-950/20 dark:to-indigo-950/20 border border-slate-200 dark:border-slate-800 rounded-2xl">
                        <h4 className="font-display font-black text-xs text-[#002B5B] dark:text-slate-200 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
                          <Mail className="h-4 w-4 text-[#2B7A78]" />
                          <span>Pendaftaran Tiket RSVP (GRATIS)</span>
                        </h4>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-4">Ingin menghadiri konferensi atau mendaftar sesi business matching? Amankan tiket kehadiran Anda sekarang secara instan.</p>

                        {eventRegisterSuccess ? (
                          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-400 text-xs font-bold rounded-xl text-center flex flex-col items-center gap-1.5">
                            <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-450" />
                            <span>Pendaftaran RSVP Berhasil!</span>
                            <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono font-medium">E-tiket kehadiran beserta QR Code resmi telah dikirim ke alamat email Anda.</span>
                          </div>
                        ) : (
                          <form onSubmit={submitEventRegister} className="space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="text-[10px] text-slate-400 dark:text-slate-500 font-mono block mb-1">Nama Lengkap Anda</label>
                                <input 
                                  type="text" 
                                  required
                                  value={eventRegisterName}
                                  onChange={(e) => setEventRegisterName(e.target.value)}
                                  placeholder="Contoh: Budi Santoso"
                                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-lg p-2 text-xs focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-slate-400 dark:text-slate-500 font-mono block mb-1">Alamat Email Aktif</label>
                                <input 
                                  type="email" 
                                  required
                                  value={eventRegisterEmail}
                                  onChange={(e) => setEventRegisterEmail(e.target.value)}
                                  placeholder="Contoh: budi@company.com"
                                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-lg p-2 text-xs focus:outline-none"
                                />
                              </div>
                            </div>
                            <div className="flex justify-end pt-2">
                              <button 
                                type="submit"
                                className="bg-[#2B7A78] hover:bg-[#205d5c] text-white font-black text-xs uppercase px-5 py-2 rounded-xl transition shadow-xs"
                              >
                                Amankan Tiket RSVP &rarr;
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 border-dashed rounded-3xl p-12 text-center h-full flex flex-col justify-center items-center text-slate-400 dark:text-slate-500 text-xs">
                  <Calendar className="h-10 w-10 text-slate-300 dark:text-slate-700 mb-3" />
                  <p className="font-bold">Pilih salah satu event bisnis di samping untuk melihat jadwal harian, profil penyelenggara, dan formulir pendaftaran tiket RSVP digital.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* VIEW D2: BRAND DIRECTORY */}
        {effectiveTab === 'brands' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* List of Brands */}
            <div className={`lg:col-span-5 space-y-4 ${selectedBrandId ? 'hidden lg:block' : 'block'}`}>
              <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-3xs text-left">
                <h3 className="font-display font-black text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>🎗️ Merek Terdaftar HAKI</span>
                  <span className="bg-[#2B7A78]/10 text-[#2B7A78] text-[9px] px-1.5 py-0.5 rounded font-mono font-bold">6 Merek</span>
                </h3>

                <div className="space-y-3">
                  {[
                    {
                      id: 'brand-1',
                      name: 'Indofood',
                      category: 'Food & Beverage',
                      hakiNumber: 'IDM000123456',
                      owner: 'PT Indofood Sukses Makmur Tbk',
                      sentiment: { positive: 92, neutral: 6, negative: 2 },
                      description: 'Produsen makanan dan minuman olahan terbesar di Indonesia dengan merek ikonik global yang dipasarkan di lebih dari 50 negara.',
                      yearRegistered: '2001',
                      expiryDate: '2031-10-15',
                      status: 'Aktif',
                      logoColor: 'from-blue-600 to-indigo-700',
                      initials: 'IF'
                    },
                    {
                      id: 'brand-2',
                      name: 'Telkomsel',
                      category: 'Telecommunication & Tech',
                      hakiNumber: 'IDM000789012',
                      owner: 'PT Telekomunikasi Selular',
                      sentiment: { positive: 88, neutral: 9, negative: 3 },
                      description: 'Penyedia layanan telekomunikasi seluler terbesar di Indonesia dengan cakupan sinyal hingga pelosok nusantara.',
                      yearRegistered: '1995',
                      expiryDate: '2025-05-26',
                      status: 'Perpanjangan',
                      logoColor: 'from-red-600 to-rose-700',
                      initials: 'TS'
                    },
                    {
                      id: 'brand-3',
                      name: 'Wardah',
                      category: 'Cosmetics & Beauty',
                      hakiNumber: 'IDM000456123',
                      owner: 'PT Paragon Technology and Innovation',
                      sentiment: { positive: 95, neutral: 4, negative: 1 },
                      description: 'Merek kosmetik halal pelopor di Indonesia yang terkenal dengan formula aman, modern, dan bernilai sosial tinggi.',
                      yearRegistered: '2005',
                      expiryDate: '2035-08-12',
                      status: 'Aktif',
                      logoColor: 'from-teal-500 to-emerald-600',
                      initials: 'WD'
                    },
                    {
                      id: 'brand-4',
                      name: 'Kopi Kenangan',
                      category: 'Food & Beverage',
                      hakiNumber: 'IDM000234567',
                      owner: 'PT Bumi Berkah Boga',
                      sentiment: { positive: 94, neutral: 5, negative: 1 },
                      description: 'Merek kopi retail grab-and-go dengan pertumbuhan tercepat yang mengusung konsep kopi susu gula aren kekinian.',
                      yearRegistered: '2017',
                      expiryDate: '2027-11-20',
                      status: 'Aktif',
                      logoColor: 'from-amber-700 to-amber-900',
                      initials: 'KK'
                    },
                    {
                      id: 'brand-5',
                      name: 'Gojek',
                      category: 'Technology & Service',
                      hakiNumber: 'IDM000345678',
                      owner: 'PT GoTo Gojek Tokopedia Tbk',
                      sentiment: { positive: 87, neutral: 10, negative: 3 },
                      description: 'Super-app on-demand pelopor ride-hailing, pengiriman makanan, dan sistem pembayaran digital se-Asia Tenggara.',
                      yearRegistered: '2010',
                      expiryDate: '2030-10-12',
                      status: 'Aktif',
                      logoColor: 'from-green-600 to-emerald-700',
                      initials: 'GJ'
                    },
                    {
                      id: 'brand-6',
                      name: 'Eiger',
                      category: 'Fashion & Outdoor Equipment',
                      hakiNumber: 'IDM000987654',
                      owner: 'PT Eigerindo Multi Produk Industri',
                      sentiment: { positive: 91, neutral: 7, negative: 2 },
                      description: 'Merek perlengkapan outdoor petualangan asal Bandung yang legendaris, mengusung ketahanan produk tinggi untuk iklim tropis.',
                      yearRegistered: '1989',
                      expiryDate: '2029-04-18',
                      status: 'Aktif',
                      logoColor: 'from-slate-700 to-slate-900',
                      initials: 'EG'
                    }
                  ].filter(b => 
                    b.name.toLowerCase().includes(universalSearch.toLowerCase()) ||
                    b.owner.toLowerCase().includes(universalSearch.toLowerCase()) ||
                    b.category.toLowerCase().includes(universalSearch.toLowerCase())
                  ).map(b => (
                    <div 
                      key={b.id} 
                      onClick={() => setSelectedBrandId(b.id)}
                      className={`p-3 border rounded-xl cursor-pointer transition text-left flex gap-3 items-center ${
                        selectedBrandId === b.id 
                          ? 'border-[#2B7A78] bg-[#2B7A78]/5 dark:bg-[#2B7A78]/10' 
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/20'
                      }`}
                    >
                      <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${b.logoColor} text-white font-black text-xs flex items-center justify-center shrink-0 uppercase tracking-widest shadow-xs`}>
                        {b.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 truncate">{b.name}</h4>
                          <span className="text-[8px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono text-slate-500 dark:text-slate-400 shrink-0 truncate max-w-[80px]">{b.category}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{b.owner}</p>
                        <div className="flex items-center gap-2 mt-1.5 text-[9px] text-slate-400 font-mono">
                          <span className="flex items-center gap-0.5 text-emerald-500 font-bold">✓ HAKI</span>
                          <span>•</span>
                          <span className="text-indigo-400">Sentimen: {b.sentiment.positive}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Brand Detailed View */}
            <div className={`lg:col-span-7 ${!selectedBrandId ? 'hidden lg:block' : 'block'}`}>
              {selectedBrandId ? (
                (() => {
                  const b = [
                    {
                      id: 'brand-1',
                      name: 'Indofood',
                      category: 'Food & Beverage',
                      hakiNumber: 'IDM000123456',
                      owner: 'PT Indofood Sukses Makmur Tbk',
                      sentiment: { positive: 92, neutral: 6, negative: 2 },
                      description: 'Produsen makanan dan minuman olahan terbesar di Indonesia dengan merek ikonik global yang dipasarkan di lebih dari 50 negara.',
                      yearRegistered: '2001',
                      expiryDate: '2031-10-15',
                      status: 'Aktif',
                      logoColor: 'from-blue-600 to-indigo-700',
                      initials: 'IF'
                    },
                    {
                      id: 'brand-2',
                      name: 'Telkomsel',
                      category: 'Telecommunication & Tech',
                      hakiNumber: 'IDM000789012',
                      owner: 'PT Telekomunikasi Selular',
                      sentiment: { positive: 88, neutral: 9, negative: 3 },
                      description: 'Penyedia layanan telekomunikasi seluler terbesar di Indonesia dengan cakupan sinyal hingga pelosok nusantara.',
                      yearRegistered: '1995',
                      expiryDate: '2025-05-26',
                      status: 'Perpanjangan',
                      logoColor: 'from-red-600 to-rose-700',
                      initials: 'TS'
                    },
                    {
                      id: 'brand-3',
                      name: 'Wardah',
                      category: 'Cosmetics & Beauty',
                      hakiNumber: 'IDM000456123',
                      owner: 'PT Paragon Technology and Innovation',
                      sentiment: { positive: 95, neutral: 4, negative: 1 },
                      description: 'Merek kosmetik halal pelopor di Indonesia yang terkenal dengan formula aman, modern, dan bernilai sosial tinggi.',
                      yearRegistered: '2005',
                      expiryDate: '2035-08-12',
                      status: 'Aktif',
                      logoColor: 'from-teal-500 to-emerald-600',
                      initials: 'WD'
                    },
                    {
                      id: 'brand-4',
                      name: 'Kopi Kenangan',
                      category: 'Food & Beverage',
                      hakiNumber: 'IDM000234567',
                      owner: 'PT Bumi Berkah Boga',
                      sentiment: { positive: 94, neutral: 5, negative: 1 },
                      description: 'Merek kopi retail grab-and-go dengan pertumbuhan tercepat yang mengusung konsep kopi susu gula aren kekinian.',
                      yearRegistered: '2017',
                      expiryDate: '2027-11-20',
                      status: 'Aktif',
                      logoColor: 'from-amber-700 to-amber-900',
                      initials: 'KK'
                    },
                    {
                      id: 'brand-5',
                      name: 'Gojek',
                      category: 'Technology & Service',
                      hakiNumber: 'IDM000345678',
                      owner: 'PT GoTo Gojek Tokopedia Tbk',
                      sentiment: { positive: 87, neutral: 10, negative: 3 },
                      description: 'Super-app on-demand pelopor ride-hailing, pengiriman makanan, dan sistem pembayaran digital se-Asia Tenggara.',
                      yearRegistered: '2010',
                      expiryDate: '2030-10-12',
                      status: 'Aktif',
                      logoColor: 'from-green-600 to-emerald-700',
                      initials: 'GJ'
                    },
                    {
                      id: 'brand-6',
                      name: 'Eiger',
                      category: 'Fashion & Outdoor Equipment',
                      hakiNumber: 'IDM000987654',
                      owner: 'PT Eigerindo Multi Produk Industri',
                      sentiment: { positive: 91, neutral: 7, negative: 2 },
                      description: 'Merek perlengkapan outdoor petualangan asal Bandung yang legendaris, mengusung ketahanan produk tinggi untuk iklim tropis.',
                      yearRegistered: '1989',
                      expiryDate: '2029-04-18',
                      status: 'Aktif',
                      logoColor: 'from-slate-700 to-slate-900',
                      initials: 'EG'
                    }
                  ].find(x => x.id === selectedBrandId);
                  if (!b) return null;

                  return (
                    <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 text-left space-y-6">
                      <button 
                        onClick={() => setSelectedBrandId(null)} 
                        className="lg:hidden text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white transition bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg mb-2 inline-flex items-center gap-1.5"
                      >
                        &larr; Kembali ke Daftar Merek
                      </button>

                      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center border-b dark:border-slate-800 pb-5">
                        <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${b.logoColor} text-white font-black text-2xl flex items-center justify-center shadow-md shrink-0 tracking-wider`}>
                          {b.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-display font-black text-lg text-[#002B5B] dark:text-white uppercase leading-none">{b.name}</h3>
                            <span className="text-[9px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">HAKI Terdaftar</span>
                          </div>
                          <p className="text-xs font-medium text-[#2B7A78] mt-1">{b.category}</p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">Pemilik: {b.owner}</p>
                        </div>
                      </div>

                      {/* Brand Info Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-1">
                          <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono block uppercase">Nomor Sertifikat HAKI</span>
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-mono">{b.hakiNumber}</span>
                        </div>
                        <div className="p-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-1">
                          <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono block uppercase">Masa Berlaku Perlindungan</span>
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-mono">s.d {b.expiryDate} ({b.status})</span>
                        </div>
                      </div>

                      {/* Sentiment Analytics */}
                      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-[#002B5B] dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                            <TrendingUp className="h-4 w-4 text-[#2B7A78]" /> Cyber Sentiment Tracker (Real-time)
                          </span>
                          <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded font-mono font-bold">INTELLIGENCE</span>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400">
                            <span>Sentiment Positif: <strong className="text-emerald-500">{b.sentiment.positive}%</strong></span>
                            <span>Netral: {b.sentiment.neutral}%</span>
                            <span>Negatif: <strong className="text-rose-500">{b.sentiment.negative}%</strong></span>
                          </div>

                          <div className="h-3.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden flex">
                            <div style={{ width: `${b.sentiment.positive}%` }} className="h-full bg-emerald-500" title="Positif"></div>
                            <div style={{ width: `${b.sentiment.neutral}%` }} className="h-full bg-amber-500" title="Netral"></div>
                            <div style={{ width: `${b.sentiment.negative}%` }} className="h-full bg-rose-500" title="Negatif"></div>
                          </div>
                        </div>

                        <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-normal mt-1 italic">
                          *Analisis ditarik otomatis dari puluhan draf artikel INFOBOS regional, forum diskusi komunitas, dan metadata sosial Jabar.
                        </p>
                      </div>

                      {/* Brand Description */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono block uppercase">Tentang Merek</span>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{b.description}</p>
                      </div>

                      {/* Actions */}
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2">
                        <button className="flex-1 bg-[#2B7A78] hover:bg-[#205d5c] text-white font-black text-[11px] uppercase tracking-wider px-4 py-2.5 rounded-xl transition shadow-xs">
                          Ajukan Monitoring Sentimen
                        </button>
                        <button className="flex-1 bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-black text-[11px] uppercase tracking-wider px-4 py-2.5 rounded-xl transition border border-slate-200 dark:border-slate-800">
                          Verifikasi Dokumen HAKI
                        </button>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 border-dashed rounded-3xl p-12 text-center h-full flex flex-col justify-center items-center text-slate-400 dark:text-slate-500 text-xs">
                  <Award className="h-10 w-10 text-slate-300 dark:text-slate-700 mb-3" />
                  <p className="font-bold">Pilih salah satu merek terdaftar di samping untuk menelusuri detail kepemilikan, sertifikasi HAKI, serta analisis reputasi siber.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* VIEW D3: PRODUCT DIRECTORY */}
        {effectiveTab === 'products' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Filter tags for product categories */}
            <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-3xs flex flex-wrap gap-1.5 items-center justify-between text-left">
              <div className="flex items-center gap-1.5">
                <Tag className="h-4 w-4 text-[#2B7A78]" />
                <span className="text-xs font-black text-[#002B5B] dark:text-slate-200 uppercase tracking-wider">Katalog Produk &amp; Komoditas Unggulan Jabar</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                <span>Total Rilis: {listings.length} Produk</span>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.filter(lst => 
                lst.title.toLowerCase().includes(universalSearch.toLowerCase()) ||
                lst.description.toLowerCase().includes(universalSearch.toLowerCase()) ||
                lst.category.toLowerCase().includes(universalSearch.toLowerCase()) ||
                (lst.seller?.name || '').toLowerCase().includes(universalSearch.toLowerCase())
              ).map(product => (
                <div 
                  key={product.id} 
                  className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-3xs transition hover:shadow-xs flex flex-col h-full text-left"
                >
                  <div className="relative h-44 bg-slate-100 dark:bg-slate-950 shrink-0">
                    <img 
                      src={product.image || "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=300&q=80"} 
                      alt={product.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-[#002B5B] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-md">
                      {product.condition}
                    </div>
                    {product.seller?.verified && (
                      <div className="absolute top-3 left-3 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                        <ShieldCheck className="h-3 w-3" /> VERIFIED
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <span className="text-[9px] bg-slate-100 dark:bg-slate-850 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded font-mono font-bold uppercase">{product.category}</span>
                      <h4 className="text-xs font-black text-slate-900 dark:text-slate-100 line-clamp-2 leading-relaxed h-8">{product.title}</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">{product.description}</p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-400 font-mono">Estimasi Harga</span>
                        <span className="text-xs font-black text-[#2B7A78]">
                          Rp {product.price.toLocaleString('id-ID')}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono">
                        <span className="flex items-center gap-0.5 text-amber-500 font-bold">★ {product.rating || "4.8"} ({product.reviewsCount || "12"} ulasan)</span>
                        <span>Stok: {product.stock || "1"} unit</span>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-850 space-y-1">
                        <span className="text-[8px] text-[#2B7A78] font-bold font-mono uppercase block flex items-center gap-0.5"><Bot className="h-2.5 w-2.5" /> AI SEO Suggestion</span>
                        <p className="text-[9px] text-slate-600 dark:text-slate-400 truncate">{product.aiSuggestions?.seoTitle || "Optimized Title Available"}</p>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 bg-[#2B7A78] hover:bg-[#205d5c] text-white font-black text-[10px] uppercase tracking-wider py-2 rounded-lg transition text-center">
                          Hubungi Penjual
                        </button>
                        <button className="px-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700 transition flex items-center justify-center">
                          <MessageSquare className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* VIEW E: PROJECT MARKETPLACE & TALENT */}
        {effectiveTab === 'jobs' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-[#2B7A78]" />
                <h3 className="font-display font-black text-sm text-[#002B5B] uppercase tracking-wider">
                  💼 Bursa Tender Proyek, Freelance &amp; Talent Pool
                </h3>
              </div>
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl border">
                {[
                  { id: 'all', name: 'Semua Proyek' },
                  { id: 'tender', name: 'Tender RFQ/RFP' },
                  { id: 'freelance', name: 'Freelance Jasa' },
                  { id: 'job', name: 'Karir Fulltime' }
                ].map(tp => (
                  <button
                    key={tp.id}
                    onClick={() => setJobCategory(tp.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition ${
                      jobCategory === tp.id 
                        ? 'bg-white text-[#2B7A78] shadow-xs' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {tp.name}
                  </button>
                ))}
              </div>
            </div>

            {/* List of projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.filter(p => jobCategory === 'all' || p.type === jobCategory).map(p => (
                <div key={p.id} className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-[#2B7A78] hover:shadow-xs transition flex flex-col justify-between text-left">
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-2">
                      <span className="uppercase font-bold tracking-wider text-[#2B7A78] bg-[#2B7A78]/10 px-2 py-0.5 rounded">
                        {p.type}
                      </span>
                      <span>Batas Akhir: {p.deadline}</span>
                    </div>

                    <h4 className="font-display font-black text-sm text-slate-800 hover:text-[#2B7A78] cursor-pointer leading-snug">
                      {p.title}
                    </h4>

                    <p className="text-[11px] text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                      {p.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-mono">Estimasi Nilai / Budget</span>
                      <span className="font-black text-slate-800 text-sm text-teal-600">{p.budget}</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3 text-[11px] text-slate-400">
                    <div>
                      <span>Penerbit: <strong>{p.issuer}</strong></span>
                      <span className="block text-[10px] mt-0.5">{p.applicants} Pendaftar aktif</span>
                    </div>

                    {p.applied ? (
                      <span className="text-emerald-600 font-extrabold flex items-center gap-1 text-[10px] uppercase">
                        <CheckCircle2 className="h-4 w-4" /> Terdaftar
                      </span>
                    ) : (
                      <button 
                        onClick={() => { setApplyModalItem(p); setApplySuccess(false); }}
                        className="bg-[#2B7A78] hover:bg-[#205d5c] text-white font-black text-[10px] uppercase px-3 py-1.5 rounded-lg transition shrink-0"
                      >
                        Ajukan Proposal / Bid
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Proposal Apply Modal */}
            {applyModalItem && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 text-left shadow-2xl relative">
                  <button onClick={() => setApplyModalItem(null)} className="absolute right-4 top-4 text-slate-400 font-bold text-lg">&times;</button>
                  <h3 className="font-display font-black text-base text-[#002B5B] uppercase mb-1">✍️ Ajukan Bid Proposal Proyek</h3>
                  <p className="text-[10px] text-slate-400 mb-4">Isi lampiran rincian kemampuan penawaran Anda untuk tender/posisi ini.</p>

                  {applySuccess ? (
                    <div className="p-4 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl text-center flex flex-col items-center gap-1">
                      <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                      <span>Proposal Penawaran Dikirim!</span>
                      <p className="text-[10px] text-slate-400 font-mono font-medium">Sistem telah meregistrasikan CV &amp; Proposal Teknis Anda ke dashboard penilai.</p>
                    </div>
                  ) : (
                    <form onSubmit={submitProjectApply} className="space-y-4">
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                        <p className="font-bold text-slate-800">{applyModalItem.title}</p>
                        <p className="text-slate-500 mt-1 font-mono">Issuer: {applyModalItem.issuer} | Budget: {applyModalItem.budget}</p>
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 font-mono block mb-1">Surat Pengantar &amp; Portfolio Singkat</label>
                        <textarea 
                          required
                          value={applyCoverLetter}
                          onChange={(e) => setApplyCoverLetter(e.target.value)}
                          placeholder="Jelaskan spesifikasi pengalaman pengerjaan proyek sejenis sebelumnya..."
                          rows={4}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:outline-none resize-none"
                        />
                      </div>

                      <div className="border-2 border-dashed border-slate-200 p-4 text-center rounded-xl bg-slate-50 hover:bg-slate-100/50 cursor-pointer transition">
                        <Upload className="h-5 w-5 text-slate-400 mx-auto mb-1.5" />
                        <p className="text-[10px] font-black text-slate-600">Unggah Proposal Teknis &amp; RAB (PDF)</p>
                        <p className="text-[9px] text-slate-400 mt-0.5">Maksimal 15 MB</p>
                      </div>

                      <div className="flex justify-end gap-2 pt-2 border-t">
                        <button onClick={() => setApplyModalItem(null)} className="px-3 py-1.5 text-xs text-slate-500 font-semibold">Batal</button>
                        <button 
                          type="submit"
                          className="bg-[#2B7A78] hover:bg-[#205d5c] text-white font-black text-xs uppercase px-4 py-1.5 rounded-lg transition"
                        >
                          Kirim Bid &amp; Lamar
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* VIEW F: LIVE CHAT AREA */}
        {effectiveTab === 'chat' && (
          <motion.div 
            id="live-chat-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs grid grid-cols-1 md:grid-cols-12 min-h-[500px] scroll-mt-24"
          >
            {/* Left Channels column */}
            <div className={`md:col-span-4 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between ${activeChatChannel ? 'hidden md:flex' : 'flex'}`}>
              <div>
                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                  <h3 className="font-display font-black text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3">Live Chat Messenger</h3>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                    <input 
                      type="text" 
                      value={chatSearch}
                      onChange={(e) => setChatSearch(e.target.value)}
                      placeholder="Cari saluran percakapan..." 
                      className="w-full pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-lg text-xs outline-none"
                    />
                  </div>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800 overflow-y-auto max-h-[380px]">
                  {chatChannels.filter(c => c.name.toLowerCase().includes(chatSearch.toLowerCase())).map(ch => (
                    <div 
                      key={ch.id} 
                      onClick={() => {
                        setActiveChatChannel(ch.id);
                        // clear unread
                        setChatChannels(prev => prev.map(p => p.id === ch.id ? { ...p, unread: 0 } : p));
                      }}
                      className={`p-3.5 flex items-start gap-2.5 cursor-pointer text-left transition ${
                        activeChatChannel === ch.id 
                          ? 'bg-[#2B7A78]/5 dark:bg-[#2B7A78]/10 border-l-4 border-[#2B7A78]' 
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/30'
                      }`}
                    >
                      <img src={ch.avatar} alt={ch.name} className="w-9 h-9 rounded-full object-cover shadow-3xs" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 truncate">{ch.name}</h4>
                          {ch.unread > 0 && <span className="bg-rose-500 text-white text-[8px] font-bold px-1 py-0.2 rounded-full shrink-0">{ch.unread}</span>}
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{ch.lastMsg}</p>
                        <span className="text-[8px] font-mono text-slate-400 dark:text-slate-500 uppercase bg-slate-100 dark:bg-slate-800 px-1 py-0.2 rounded block mt-1.5 w-max">
                          {ch.type.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Chat Conversation Thread */}
            <div className={`md:col-span-8 flex flex-col justify-between h-[500px] ${!activeChatChannel ? 'hidden md:flex' : 'flex'}`}>
              {(() => {
                const currentChannel = chatChannels.find(c => c.id === activeChatChannel);
                if (!currentChannel) {
                  return (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 p-8 text-center">
                      <MessageSquare className="h-10 w-10 mb-2 text-slate-300 dark:text-slate-700" />
                      <p className="text-xs font-black uppercase tracking-wider">Silakan Pilih Saluran Percakapan</p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">Gunakan panel di sebelah kiri untuk melihat daftar chat aktif atau negosiasi Anda.</p>
                    </div>
                  );
                }

                return (
                  <>
                    {/* Header bar */}
                    <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-left bg-slate-50/50 dark:bg-slate-900/20">
                      <div className="flex items-center gap-2.5">
                        <button 
                          onClick={() => setActiveChatChannel('')} 
                          className="md:hidden p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 mr-1"
                        >
                          &larr;
                        </button>
                        <img src={currentChannel.avatar} alt={currentChannel.name} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <h4 className="text-xs font-black text-slate-800 dark:text-slate-200">{currentChannel.name}</h4>
                          <span className="text-[9px] bg-teal-500/10 text-teal-600 px-1.5 py-0.2 rounded font-mono font-bold uppercase">
                            SALURAN {currentChannel.type.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Messages Body */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30 dark:bg-slate-950/20 max-h-[350px]">
                      {currentChannel.messages.map((m: any) => (
                        <div 
                          key={m.id} 
                          className={`flex flex-col ${
                            m.senderId === 'user' ? 'items-end' : 'items-start'
                          }`}
                        >
                          <div className={`p-3 rounded-2xl text-xs font-semibold leading-relaxed max-w-[80%] text-left relative ${
                            m.senderId === 'user' 
                              ? 'bg-[#2B7A78] text-white rounded-br-none shadow-xs' 
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200 dark:border-slate-700'
                          }`}>
                            <span className="text-[8px] opacity-60 font-mono block mb-1">{m.sender}</span>
                            <p>{m.text}</p>
                          </div>
                          <span className="text-[8.5px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">{m.time} • Dibaca</span>
                        </div>
                      ))}
                      {typingIndicator && (
                        <p className="text-[10px] text-[#2B7A78] italic font-medium animate-pulse">{typingIndicator}</p>
                      )}
                      <div ref={chatBottomRef} />
                    </div>

                    {/* Bottom chat messaging input box */}
                    <div className="p-3.5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <button type="button" className="hover:text-slate-600 dark:hover:text-slate-300 transition p-1"><Smile className="h-4.5 w-4.5" /></button>
                        <button type="button" className="hover:text-slate-600 dark:hover:text-slate-300 transition p-1"><Paperclip className="h-4.5 w-4.5" /></button>
                        <button type="button" className="hover:text-slate-600 dark:hover:text-slate-300 transition p-1"><Mic className="h-4.5 w-4.5" /></button>
                      </div>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={chatMessageInput}
                          onChange={(e) => setChatMessageInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && sendChatMessage()}
                          placeholder="Tulis pesan Anda..." 
                          className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:bg-white dark:focus:bg-slate-850"
                        />
                        <button 
                          onClick={sendChatMessage}
                          className="bg-[#2B7A78] hover:bg-[#205d5c] text-white font-black text-xs uppercase px-4 rounded-xl transition shadow-xs flex items-center justify-center"
                        >
                          Kirim
                        </button>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. REVENUEOS INTEGRATED PAYMENT MODAL */}
      <div className="mt-8 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs" id="revenue-os-payment-terminal">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-[#2B7A78]" />
            <h3 className="font-display font-black text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              💰 Terminal Invoice Terintegrasi RevenueOS
            </h3>
          </div>
          <span className="text-[10px] bg-teal-500/10 text-teal-600 border border-teal-500/20 px-2.5 py-0.5 rounded font-mono font-bold">
            INTEGRASI UTAMA
          </span>
        </div>

        {premiumInvoices.length === 0 ? (
          <p className="text-xs text-slate-400 font-medium">Tidak ada rincian tagihan atau lisensi aktif.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-2 scrollbar-none">
              {premiumInvoices.map(inv => (
                <div key={inv.id} className="p-3 bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-850 rounded-xl flex items-center justify-between text-xs font-semibold">
                  <div>
                    <h4 className="text-slate-800 dark:text-slate-200 text-xs font-bold">{inv.description}</h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">ID: {inv.id} | Tanggal {inv.date}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-slate-800 dark:text-slate-200 block">Rp {inv.amount.toLocaleString('id-ID')}</span>
                    {inv.status === 'LUNAS' ? (
                      <span className="text-[9px] bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.2 rounded font-bold uppercase">Lunas</span>
                    ) : (
                      <button 
                        onClick={() => handlePayInvoice(inv)}
                        className="text-[9px] bg-[#2B7A78] hover:bg-[#205d5c] text-white px-2 py-0.5 rounded font-bold uppercase transition"
                      >
                        Bayar Invoice
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Checkout Simulation Area */}
            <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-850 rounded-2xl p-4 flex flex-col justify-between min-h-[160px]">
              {selectedInvoiceForPay ? (
                <>
                  <div className="space-y-1.5 text-xs text-left">
                    <p className="text-slate-500 font-mono text-[9px] uppercase">Rincian Pembayaran</p>
                    <h5 className="font-bold text-slate-800 dark:text-slate-200">{selectedInvoiceForPay.description}</h5>
                    <p className="font-mono text-slate-600 dark:text-slate-350 font-bold">Jumlah Tagihan: Rp {selectedInvoiceForPay.amount.toLocaleString('id-ID')}</p>
                    
                    <div className="flex gap-2 pt-1.5">
                      {['qris', 'va', 'transfer'].map((m: any) => (
                        <button
                          key={m}
                          onClick={() => setPaymentMethod(m)}
                          className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase transition ${
                            paymentMethod === m 
                              ? 'bg-[#2B7A78] text-white' 
                              : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {m === 'qris' ? 'QRIS INSTAN' : m === 'va' ? 'VIRTUAL ACC' : 'BANK TRANSFER'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {paySuccess ? (
                    <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold rounded-lg text-center">
                      Pembayaran Berhasil! Lisensi Anda Diaktifkan Instan.
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-3 pt-2.5 border-t dark:border-slate-850">
                      {paymentMethod === 'qris' && (
                        <div className="flex items-center gap-1.5">
                          <div className="w-10 h-10 bg-slate-900 flex items-center justify-center rounded border border-slate-700 font-mono text-[6px] text-white">QRIS CODE</div>
                          <span className="text-[9px] text-slate-400 dark:text-slate-500">Pindai kode QR untuk membayar</span>
                        </div>
                      )}
                      <button
                        onClick={confirmInvoicePayment}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] uppercase px-4 py-2 rounded-lg transition"
                      >
                        Konfirmasi Pembayaran Lunas
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-slate-400 dark:text-slate-500 text-xs font-semibold h-full flex items-center justify-center">
                  Silakan pilih salah satu invoice belum dibayar di samping untuk mensimulasikan gerbang pembayaran.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
