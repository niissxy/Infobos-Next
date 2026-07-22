export interface FeatureFAQ {
  q: string;
  a: string;
}

export interface FeatureDocumentation {
  overview: string;
  bestPractices: string[];
  developerNotes: string;
  changelog: { version: string; date: string; changes: string[] }[];
}

export interface FeatureAnalytics {
  accessCount: number;
  favoritesCount: number;
  activeUsers: number;
}

export interface FeatureItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  subcategory: string;
  module: string;
  portal: string;
  workspace: string;
  route: string; // The Tab slug used in currentTab
  icon: string; // Lucide icon identifier
  color: string; // color name e.g. 'teal', 'indigo', 'amber'
  shortDesc: string;
  longDesc: string;
  tooltip: string;
  keywords: string[];
  tags: string[];
  parentFeature?: string;
  childFeatures?: string[];
  relatedWidgets: string[];
  relatedApis: string[];
  relatedDashboards: string[];
  documentation: FeatureDocumentation;
  videoUrl?: string;
  faq: FeatureFAQ[];
  allowedRoles: string[]; // RBAC/PBAC Roles
  status: 'active' | 'beta' | 'deprecated';
  version: string;
  lastUpdated: string;
  ownerTeam: string;
  analytics: FeatureAnalytics;
  shortcut?: string;
}

export const FEATURE_REGISTRY: FeatureItem[] = [
  {
    id: 'feat-home',
    name: 'Homepage Bento Feed',
    slug: 'home',
    category: 'News',
    subcategory: 'Public Portal',
    module: 'Core Media Delivery',
    portal: 'Public Portal',
    workspace: 'Public',
    route: 'home',
    icon: 'Compass',
    color: 'indigo',
    shortDesc: 'Pusat kurasi berita utama dengan desain visual Bento-Grid modern.',
    longDesc: 'Kanal beranda utama yang menyajikan anomali tren, anomali data ekonomi, berita regional, nasional, dan internasional dengan layout Bento Grid berdensitas tinggi, lengkap dengan dynamic news ticker dan tracking widget real-time.',
    tooltip: 'Mengakses beranda platform utama berita INFOBOS.',
    keywords: ['berita', 'beranda', 'feed', 'bento', 'utama', 'portal', 'ticker', 'live feed', 'jawa barat'],
    tags: ['news', 'public', 'bento-grid', 'interactive-ui'],
    childFeatures: ['Berita Regional', 'Berita Nasional', 'Liputan Internasional', 'Anomali Tren', 'Dynamic Ticker Feed'],
    relatedWidgets: ['Weather Widget', 'Stock Index Widget', 'Currency Exchange', 'CCTV Live Mini-Player'],
    relatedApis: ['/api/v1/contents', '/api/v1/categories', '/api/v1/contents/breaking', '/api/v1/weather/forecast'],
    relatedDashboards: ['Editorial Live Analytics', 'Public Traffic Monitor'],
    allowedRoles: ['guest', 'member', 'reporter', 'editor', 'super_admin', 'managing_editor', 'developer', 'advertiser', 'sales', 'business', 'research', 'monitoring', 'finance', 'government'],
    status: 'active',
    version: 'v2.3.4',
    lastUpdated: '2026-07-02',
    ownerTeam: 'Media Delivery Team',
    shortcut: 'Ctrl+H',
    analytics: { accessCount: 289450, favoritesCount: 4580, activeUsers: 8940 },
    documentation: {
      overview: 'Homepage menggunakan component grid responsive untuk menggabungkan video, breaking news, dan data geospasial dalam satu layar tanpa mengorbankan kenyamanan pembaca. Sistem layout bento ini secara dinamis menyeimbangkan grid berdasarkan prioritas berita yang ditentukan redaksi.',
      bestPractices: [
        'Gunakan viewport desktop untuk density maksimal bento box.',
        'Klik rujukan geo di setiap box berita untuk langsung membuka visualisasi peta terkait.',
        'Manfaatkan dynamic search bar di header untuk memfilter feed bento secara real-time.',
        'Simpan berita penting ke bookmark personal untuk dibaca offline di kemudian hari.'
      ],
      developerNotes: 'Data di-cache di client-side selama 5 menit via service worker. Rendering dinonaktifkan jika koneksi offline terdeteksi untuk menjaga konsistensi state.',
      changelog: [
        { version: 'v2.3.4', date: '2026-07-02', changes: ['Optimasi layout rendering bento-grid pada device ultra-wide', 'Perbaikan bug overlay breaking news banner'] },
        { version: 'v2.2.0', date: '2026-06-15', changes: ['Integrasi service worker caching untuk resource gambar besar', 'Penambahan dynamic news ticker asinkron'] },
        { version: 'v2.1.0', date: '2026-05-28', changes: ['Optimasi load time asset gambar hero', 'Integrasi breaking news ticker di header'] }
      ]
    },
    faq: [
      { q: 'Bagaimana cara memfilter berita berdasarkan wilayah?', a: 'Gunakan tab "Regional" di navigasi atas atau klik tag lokasi di bawah judul artikel bento untuk melihat konten lokal daerah.' },
      { q: 'Seberapa sering berita di homepage diperbarui?', a: 'Sistem melakukan sinkronisasi otomatis setiap 60 detik untuk menarik update breaking news dari CMS redaksi.' },
      { q: 'Apakah layout bento grid mendukung ponsel dengan layar lipat?', a: 'Ya, grid responsive kami secara adaptif mendeteksi rasio layar fleksibel untuk tata letak terbaik.' }
    ]
  },
  {
    id: 'feat-widget-cms',
    name: 'Widget Library & CMS Sandbox',
    slug: 'widget-cms',
    category: 'CMS',
    subcategory: 'Widget Management',
    module: 'Visual Component Control',
    portal: 'CMS Portal',
    workspace: 'Design Sandbox',
    route: 'widget-cms',
    icon: 'Layers',
    color: 'teal',
    shortDesc: 'Pustaka widget dinamis dan modul penyesuaian kustomisasi antarmuka.',
    longDesc: 'Ruang kolaborasi desain dan administrasi widget eksternal. Memungkinkan editor menyetel widget cuaca BMKG, nilai tukar mata uang, feed CCTV Dishub, indeks saham, hingga parser XML RSS kustom secara asinkron tanpa mengubah source code.',
    tooltip: 'Uji, konfigurasikan, dan pasang widget interaktif di berbagai section.',
    keywords: ['widget', 'cms', 'sandbox', 'kustomisasi', 'cctv', 'bmkg', 'valas', 'rss parser', 'iframe'],
    tags: ['cms', 'widgets', 'interactive', 'sandbox-environment'],
    relatedWidgets: ['BMKG Weather Alert', 'Forex Widget', 'CCTV Live Monitor', 'Custom RSS Reader'],
    relatedApis: ['/api/v1/virtual/metrics', '/api/v1/widgets/configs', '/api/v1/widgets/templates'],
    relatedDashboards: ['Widget Engagement Analytics', 'CMS Performance Board'],
    allowedRoles: ['editor', 'super_admin', 'managing_editor', 'developer'],
    status: 'active',
    version: 'v1.7.2',
    lastUpdated: '2026-07-01',
    ownerTeam: 'Frontend Framework Devs',
    shortcut: 'Ctrl+W',
    analytics: { accessCount: 38200, favoritesCount: 1420, activeUsers: 245 },
    documentation: {
      overview: 'Pusat integrasi widget dengan standar "Integration First" yang mendukung rendering aman sandbox iframe. Pengguna dengan hak akses dapat dengan mudah menginstalasi, mengkonfigurasi ulang, dan menata letak widget dalam mode WYSIWYG.',
      bestPractices: [
        'Aktifkan caching 10 menit untuk widget yang mengambil data API eksternal demi menghindari limit rate.',
        'Posisikan widget bertipe 1x pada panel samping (sidebar_sticky) untuk optimalisasi layout.',
        'Lakukan uji coba render di tab "Sandbox Sandbox" sebelum mengaktifkan widget secara publik.',
        'Gunakan format schema data terkompresi saat mengekspor konfigurasi widget kustom.'
      ],
      developerNotes: 'Konfigurasi widget disimpan di localStorage sebagai single-source-of-truth sebelum disinkronkan ke db_store di backend.',
      changelog: [
        { version: 'v1.7.2', date: '2026-07-01', changes: ['Optimasi loading async komponen oEmbed', 'Penambahan skema validasi JSON schema untuk config kustom'] },
        { version: 'v1.6.0', date: '2026-06-10', changes: ['Integrasi parser RSS XML ke komponen inti', 'Perbaikan memory leak saat hot-reloading sandbox'] },
        { version: 'v1.5.0', date: '2026-05-20', changes: ['Penambahan mode rendering oEmbed', 'Integrasi live testing sandbox'] }
      ]
    },
    faq: [
      { q: 'Mengapa widget tidak muncul setelah di-save?', a: 'Pastikan status visibilitas diatur ke "Active" dan area target rendering tidak diblokir oleh ad-blocker atau kebijakan konten browser.' },
      { q: 'Apakah saya bisa menambahkan script JS kustom ke dalam widget?', a: 'Bisa, namun script akan dijalankan dalam sandbox iframe dengan atribut pembatasan ketat untuk alasan keamanan platform.' },
      { q: 'Bagaimana cara mengatur refresh rate widget?', a: 'Setelan interval pooling data asinkron tersedia di panel opsi lanjutan masing-masing instansi widget.' }
    ]
  },
  {
    id: 'feat-intel-workspace',
    name: 'Intelligence Workspace Analysts',
    slug: 'intelligence-workspace',
    category: 'Intelligence',
    subcategory: 'Decision Support System',
    module: 'Evolis Big Data',
    portal: 'Research Portal',
    workspace: 'Research',
    route: 'intelligence-workspace',
    icon: 'Database',
    color: 'amber',
    shortDesc: 'Workspace profesional riset, grafik pengetahuan entitas, dan agen AI.',
    longDesc: 'Sistem pendukung keputusan komprehensif bagi analis. Menghubungkan visualisasi Knowledge Graph (Entity Relationship), modul manajemen AI Agents, papan kolaborasi Kanban, pilar bibliografi, dan ringkasan riset kebijakan fiskal.',
    tooltip: 'Akses workspace analitik Big Data dan manajemen AI Agents.',
    keywords: ['riset', 'intelligence', 'knowledge graph', 'ai agents', 'kanban', 'data', 'decision support', 'fiskal'],
    tags: ['intelligence', 'analytics', 'secured', 'big-data'],
    relatedWidgets: ['Evolis Interactive Graph', 'Agent Coordinator Panel', 'Research Note Editor', 'Entity Info Drawer'],
    relatedApis: ['/api/v1/search', '/api/v1/contents', '/api/v1/entities/relations', '/api/v1/ai/agents'],
    relatedDashboards: ['Intelligence Operations Room', 'AI Agent Metrics Console'],
    allowedRoles: ['research', 'editor', 'super_admin', 'managing_editor', 'developer', 'monitoring'],
    status: 'active',
    version: 'v3.4.1',
    lastUpdated: '2026-07-02',
    ownerTeam: 'Evolis Intelligence Group',
    shortcut: 'Ctrl+Shift+I',
    analytics: { accessCount: 65400, favoritesCount: 2390, activeUsers: 590 },
    documentation: {
      overview: 'Intelligence Workspace menyatukan riset manual dengan automasi AI Agents untuk mempercepat analisis kebijakan daerah. Memfasilitasi penggalian hubungan tersembunyi antar entitas publik.',
      bestPractices: [
        'Gunakan visualisasi Graph untuk menemukan kaitan tidak langsung antara korporasi dan regulasi daerah.',
        'Pastikan pemicu (triggers) Agen diatur dengan tepat agar tidak terjadi penumpukan antrean eksekusi.',
        'Gunakan papan Kanban internal untuk memetakan alur investigasi dari draf hipotesis ke rilis berita.',
        'Ekspor visualisasi grafik relasi ke format SVG resolusi tinggi untuk lampiran dokumen riset.'
      ],
      developerNotes: 'Knowledge graph ditarik dari relasi database schema ContentEntity dan ContentLocation secara dinamis dengan visualizer D3 force-directed layout.',
      changelog: [
        { version: 'v3.4.1', date: '2026-07-02', changes: ['Optimasi query recursive CTE pada database relasi grafik entitas', 'Pembaruan UI filter agen'] },
        { version: 'v3.3.0', date: '2026-06-12', changes: ['Penambahan ekspor laporan PDF terformat otomatis dengan sitasi APA/MLA'] },
        { version: 'v3.2.0', date: '2026-05-18', changes: ['Penambahan Agen Geo Intelligence ke panel orchestrator', 'Optimalisasi rendering graph dengan layout fisika teredam'] }
      ]
    },
    faq: [
      { q: 'Apakah data riset bersifat rahasia?', a: 'Ya, semua catatan draf riset dienkripsi di level database dengan standar AES-256 dan hanya dapat diakses oleh pemilik workspace.' },
      { q: 'Bagaimana cara mengajari AI Agent parameter baru?', a: 'Buka panel agen, klik "Edit Prompting / Context", lalu sematkan berkas panduan kebijakan terbaru sebagai rujukan dasar.' },
      { q: 'Apakah visualizer grafis mendukung drag-and-drop?', a: 'Ya, Anda dapat menyeret node entitas untuk menyusun peta pikiran Anda sendiri dan menyematkan catatan penting di tiap node.' }
    ]
  },
  {
    id: 'feat-finance-news',
    name: 'Finance News',
    slug: 'finance',
    category: 'News',
    subcategory: 'Ekonomi & Keuangan',
    module: 'Media Delivery',
    portal: 'Public Portal',
    workspace: 'Public',
    route: 'finance',
    icon: 'Newspaper',
    color: 'teal',
    shortDesc: 'Berita terhangat seputar perbankan, saham, asuransi, dan UMKM.',
    longDesc: 'Kanal berita publik yang mengulas perkembangan pasar modal, harga komoditas (emas, minyak), pasar kripto, asuransi, serta analisis makro & mikro ekonomi regional Jawa Barat.',
    tooltip: 'Mengakses halaman berita keuangan publik dan indikator pasar.',
    keywords: ['berita', 'finance', 'saham', 'emas', 'kripto', 'pasar modal', 'umkm', 'reksa dana', 'makro ekonomi'],
    tags: ['news', 'finance', 'public', 'economic-insights'],
    relatedWidgets: ['Market Ticker', 'Economic Calendar', 'News Card List', 'Commodity Price Tracker'],
    relatedApis: ['/api/v1/finance/news', '/api/v1/finance/prices', '/api/v1/finance/events'],
    relatedDashboards: ['Public Finance Analytics', 'Advertiser Dashboard'],
    allowedRoles: ['guest', 'member', 'premium', 'subscriber', 'reporter', 'editor', 'advertiser', 'partner', 'sales', 'business', 'research', 'monitoring', 'super_admin', 'owner'],
    status: 'active',
    version: 'v1.2.0',
    lastUpdated: '2026-07-02',
    ownerTeam: 'Public News Desk',
    shortcut: 'Ctrl+Shift+F',
    analytics: { accessCount: 115000, favoritesCount: 6400, activeUsers: 4900 },
    documentation: {
      overview: 'Finance News menyajikan visualisasi indeks saham (IHSG, Dow Jones) dan kalender ekonomi terintegrasi secara dinamis untuk memudahkan pembaca mengkaji dampak finansial nasional terhadap daerah.',
      bestPractices: [
        'Gunakan filter pencarian berita untuk memilah kategori mikro/makro ekonomi regional.',
        'Klik widget Kalender Ekonomi untuk rilis data inflasi daerah dan jadwal pembagian deviden emiten.',
        'Berlangganan digest mingguan via email untuk ringkasan analisis komoditas Jawa Barat.',
        'Gunakan kalkulator simulasi inflasi di bagian bawah halaman untuk menghitung daya beli rill Anda.'
      ],
      developerNotes: 'Menggunakan feed RSS virtual dan charting statis Recharts yang responsif dengan adaptasi sumbu waktu otomatis.',
      changelog: [
        { version: 'v1.2.0', date: '2026-07-02', changes: ['Pembaruan widget ticker harga komoditas global real-time', 'Integrasi kalender rilis data inflasi'] },
        { version: 'v1.1.0', date: '2026-06-15', changes: ['Penambahan grafik performa reksa dana terpopuler', 'Perbaikan rendering tabel emiten'] },
        { version: 'v1.0.0', date: '2026-05-10', changes: ['Rilis perdana pemisahan modul Finance News publik'] }
      ]
    },
    faq: [
      { q: 'Apakah ada biaya berlangganan?', a: 'Tidak, seluruh berita di kanal Keuangan & Ekonomi dapat diakses gratis oleh semua pembaca tanpa batasan paywall.' },
      { q: 'Dari mana sumber data harga komoditas dan saham di halaman ini?', a: 'Data disinkronkan secara asinkron dari API bursa komoditas nasional dan feed IDX virtual terpercaya.' },
      { q: 'Dapatkah saya mengunduh data kalender ekonomi?', a: 'Ya, Anda bisa mengeklik tombol ekspor di sudut kanan kalender untuk mengunduh berkas kalender dalam format .ics.' }
    ]
  },
  {
    id: 'feat-financial-intelligence',
    name: 'Financial Intelligence',
    slug: 'financial-intelligence',
    category: 'Intelligence',
    subcategory: 'Finance Terminal',
    module: 'Evolis Big Data',
    portal: 'Research Portal',
    workspace: 'Research',
    route: 'financial-intelligence',
    icon: 'Terminal',
    color: 'indigo',
    shortDesc: 'Terminal analisis emiten, valas, komoditas, dan screening saham profesional.',
    longDesc: 'Platform analitik pasar saham komprehensif layaknya Bloomberg Terminal. Menyediakan sarana screening emiten BEI, watchlist personal, alerts fluktuasi harga, virtual portofolio, serta simulator stress-test berbasis AI.',
    tooltip: 'Akses Bloomberg-style terminal keuangan premium.',
    keywords: ['terminal', 'screener', 'stocks', 'forex', 'sec filing', 'annual report', 'bei', 'idx', 'commodities'],
    tags: ['intelligence', 'finance', 'terminal', 'secured', 'market-analysis'],
    relatedWidgets: ['Market Terminal Area', 'Watchlist Table', 'AI Forecast Block', 'SEC Filing Feed'],
    relatedApis: ['/api/v1/finance/terminal', '/api/v1/finance/screener', '/api/v1/finance/watchlist'],
    relatedDashboards: ['Evolis Market Room', 'Securities Risk Board'],
    allowedRoles: ['premium', 'subscriber', 'business', 'corporate', 'researcher', 'government', 'monitoring', 'finance', 'accounting', 'super_admin', 'owner'],
    status: 'active',
    version: 'v1.4.0',
    lastUpdated: '2026-07-02',
    ownerTeam: 'Evolis Big Data Desk',
    shortcut: 'Ctrl+Shift+T',
    analytics: { accessCount: 45000, favoritesCount: 2300, activeUsers: 540 },
    documentation: {
      overview: 'Financial Intelligence terminal memberikan visualisasi real-time pergerakan saham dan laporan keterbukaan IDX emiten dengan korelasi data berita makro regional Jawa Barat.',
      bestPractices: [
        'Pilih simbol emiten di panel kontrol kiri untuk memperbarui seluruh grafik visual.',
        'Gunakan slider di tab Risk Simulator untuk memproyeksikan CAGR harga saham.',
        'Aktifkan SMS atau Telegram Alerts untuk pergerakan harga saham di luar deviasi standar 3%.',
        'Gunakan fitur PDF export untuk mendownload lembar ringkasan emiten (one-pager prospectus).'
      ],
      developerNotes: 'Data diintegrasikan dengan IDX filings mockup dan kalkulator matematika CAGR compound dengan presisi pembulatan desimal tinggi di client-side.',
      changelog: [
        { version: 'v1.4.0', date: '2026-07-02', changes: ['Penambahan kalkulator proyeksi CAGR modern', 'Integrasi feed PDF prospektus emiten'] },
        { version: 'v1.2.0', date: '2026-06-18', changes: ['Optimasi charting multi-layer Recharts', 'Perbaikan latency parsing watchlist'] },
        { version: 'v1.0.0', date: '2026-05-01', changes: ['Rilis perdana modul Financial Intelligence Terminal'] }
      ]
    },
    faq: [
      { q: 'Bagaimana cara menambahkan saham ke Watchlist?', a: 'Masukkan kode ticker (contoh: TLKM) pada input ADD SYMBOL di panel kiri lalu klik tanda tambah (+).' },
      { q: 'Apakah simulator portofolio menggunakan dana rill?', a: 'Tidak, simulator ini menggunakan dana virtual untuk membantu pembelajaran investasi tanpa risiko kerugian finansial.' },
      { q: 'Dapatkah saya melihat laporan keuangan triwulanan di terminal ini?', a: 'Ya, tab "SEC Filings" merangkum semua rilis resmi laporan triwulanan dan keterbukaan informasi emiten.' }
    ]
  },
  {
    id: 'feat-revenue-os',
    name: 'RevenueOS Monetization',
    slug: 'revenue-os',
    category: 'Revenue',
    subcategory: 'Corporate Finance',
    module: 'Monetization Engine',
    portal: 'Finance Portal',
    workspace: 'Finance',
    route: 'revenue-os',
    icon: 'CreditCard',
    color: 'purple',
    shortDesc: 'Dashboard internal pemantauan pendapatan, audit invoice, dan persetujuan dana.',
    longDesc: 'Pusat operasi pendapatan internal INFOBOS. Menyediakan analisis performa MRR/ARR, pembagian komisi mitra afiliasi, audit log invoice klien pengiklan, serta antrean persetujuan anggaran (approvals) yang diamankan untuk pemilik dan administrator.',
    tooltip: 'Kelola kas internal, payout mitra, dan approvals anggaran.',
    keywords: ['pendapatan', 'mrr', 'arr', 'invoice', 'komisi', 'approvals', 'audit', 'payouts', 'mitra', 'cfo'],
    tags: ['revenue', 'finance', 'secure', 'auditing'],
    relatedWidgets: ['Revenue KPI Grid', 'Invoice Auditor Table', 'Approvals Queue', 'Mitra Commission Chart'],
    relatedApis: ['/api/v1/finance/revenue', '/api/v1/finance/payouts', '/api/v1/finance/approvals'],
    relatedDashboards: ['Corporate Revenue Board', 'Accounting Ledger Console'],
    allowedRoles: ['finance', 'accounting', 'super_admin', 'owner'],
    status: 'active',
    version: 'v3.6.5',
    lastUpdated: '2026-07-02',
    ownerTeam: 'Revenue & Growth Operations',
    shortcut: 'Ctrl+Shift+R',
    analytics: { accessCount: 18400, favoritesCount: 390, activeUsers: 85 },
    documentation: {
      overview: 'RevenueOS memisahkan akuntansi internal media dari portal berita publik demi keamanan tingkat tinggi, memberikan kejelasan penyerapan anggaran, performa MRR, dan manajemen payout.',
      bestPractices: [
        'Lakukan audit bulanan dengan merekonsiliasi invoice pending dengan bank transfer.',
        'Setujui dana permohonan pengeluaran di tab Approvals untuk mencatatkan ke log audit.',
        'Gunakan filter mata uang dan rentang tanggal untuk mencocokkan laporan pajak triwulanan.',
        'Pastikan data rekening bank mitra terverifikasi sebelum memicu payout massal.'
      ],
      developerNotes: 'Tindakan konfirmasi pembayaran memicu penambahan record enkripsi log audit di panel samping dengan hash SHA-256.',
      changelog: [
        { version: 'v3.6.5', date: '2026-07-02', changes: ['Penambahan ringkasan pajak ekspor CSV otomatis', 'Perbaikan penanganan rekonsiliasi mata uang asing'] },
        { version: 'v3.5.0', date: '2026-06-20', changes: ['Refactor total pemisahan visual dari modul publik & terminal'] }
      ]
    },
    faq: [
      { q: 'Siapa yang berhak menyetujui anggaran?', a: 'Hanya pengguna dengan role CFO, Finance Manager, Owner, dan Super Admin yang memiliki akses verifikasi tombol setujui.' },
      { q: 'Bagaimana komisi mitra dihitung?', a: 'Sistem menerapkan pembagian komisi berdasarkan kode referral unik yang secara otomatis diakumulasikan setiap akhir bulan.' },
      { q: 'Apakah data invoice dapat diekspor to aplikasi akuntansi eksternal?', a: 'Ya, Anda bisa mengekspor laporan keuangan dalam format CSV, Excel, atau JSON yang kompatibel dengan sistem akuntansi global.' }
    ]
  },
  {
    id: 'feat-community-marketplace',
    name: 'Community & Business Hub',
    slug: 'community-marketplace',
    category: 'Communities',
    subcategory: 'Social Engagement',
    module: 'Socio-Economic Platform',
    portal: 'Public Portal',
    workspace: 'Public',
    route: 'community-marketplace',
    icon: 'Users',
    color: 'indigo',
    shortDesc: 'Pusat forum komunitas Jawa Barat, lowongan kerja, dan UMKM marketplace.',
    longDesc: 'Hub sosial yang menghubungkan warga dan pelaku bisnis daerah. Mengintegrasikan papan diskusi hangat, sub-forum per kota, lowongan kerja korporasi lokal, direktori produk UMKM unggulan, katalog sewa aset daerah, serta pendaftaran event komunitas.',
    tooltip: 'Buka forum warga, loker daerah, dan marketplace UMKM.',
    keywords: ['forum', 'komunitas', 'loker', 'marketplace', 'umkm', 'event', 'warga', 'lowongan', 'jawabarat'],
    tags: ['communities', 'public', 'marketplace', 'jobs'],
    relatedWidgets: ['Top Threads Carousel', 'Local Jobs Finder', 'Product Spotlighter', 'Rental Catalog View'],
    relatedApis: ['/api/v1/contents', '/api/v1/community/threads', '/api/v1/jobs/search', '/api/v1/products'],
    relatedDashboards: ['Community Metrics Board', 'Marketplace Activity Tracker'],
    allowedRoles: ['guest', 'member', 'reporter', 'editor', 'super_admin', 'managing_editor', 'creator', 'sales', 'business', 'government'],
    status: 'active',
    version: 'v1.9.5',
    lastUpdated: '2026-07-01',
    ownerTeam: 'Community Engagement Group',
    shortcut: 'Ctrl+Shift+C',
    analytics: { accessCount: 178300, favoritesCount: 8920, activeUsers: 4200 },
    documentation: {
      overview: 'Menghubungkan pembaca berita dengan ekosistem riil UMKM, memfasilitasi transaksi tanpa perantara untuk menumbuhkan perekonomian akar rumput serta meramaikan interaksi warga di forum.',
      bestPractices: [
        'Sematkan tag lokasi kota (e.g., Bandung) untuk menyaring lowongan kerja yang paling dekat.',
        'Laporkan postingan forum yang mengandung ujaran kebencian melalui tombol bendera moderasi.',
        'Gunakan profil Business terverifikasi untuk meningkatkan kepercayaan calon pembeli di marketplace.',
        'Aktifkan notifikasi diskusi agar tidak ketinggalan tanggapan atas pertanyaan Anda.'
      ],
      developerNotes: 'Posting lowongan kerja terhubung ke API ingestion eksternal dengan format terstruktur Schema.org JobPosting untuk optimasi perayapan mesin pencari.',
      changelog: [
        { version: 'v1.9.5', date: '2026-07-01', changes: ['Penambahan direktori kota baru (Cirebon, Tasikmalaya)', 'Pembaruan UI filter lowongan kerja gaji'] },
        { version: 'v1.8.0', date: '2026-06-24', changes: ['Redesain tata letak kartu marketplace produk UMKM', 'Penambahan filter pencarian dinamis multi-kategori'] }
      ]
    },
    faq: [
      { q: 'Bagaimana cara memasang loker perusahaan saya?', a: 'Daftarkan akun sebagai portal Business terlebih dahulu, lalu buka tab loker di dashboard Anda untuk menerbitkan loker gratis.' },
      { q: 'Apakah ada komisi transaksi di marketplace UMKM?', a: 'Sama sekali tidak ada komisi (0% fee). Hubungan transaksi berjalan langsung secara peer-to-peer antara penjual dan pembeli.' },
      { q: 'Bagaimana cara melaporkan penipuan di marketplace?', a: 'Klik ikon bendera merah "Laporkan" di detail produk, tim moderasi kami akan memverifikasi laporan dalam waktu maksimal 2x24 jam.' }
    ]
  },
  {
    id: 'feat-marketplace-hub',
    name: 'Marketplace OS',
    slug: 'marketplace-hub',
    category: 'Communities',
    subcategory: 'Business',
    module: 'Socio-Economic Platform',
    portal: 'Public Portal',
    workspace: 'Public',
    route: 'marketplace-hub',
    icon: 'CreditCard',
    color: 'teal',
    shortDesc: 'Pasar jual beli bahan industri, komoditas, sewa properti/alat, dan lowongan kerja UMKM Jawa Barat.',
    longDesc: 'Pusat niaga digital komprehensif Jawa Barat yang mengintegrasikan jual-beli alat industri, penyewaan drone/alat berat, tender proyek, dan karir UMKM dengan fitur negosiasi dan rekening bersama aman.',
    tooltip: 'Buka marketplace UMKM, rental aset, & loker daerah.',
    keywords: ['market', 'marketplace', 'umkm', 'sewa', 'jasa', 'loker', 'niaga'],
    tags: ['marketplace', 'public', 'business'],
    relatedWidgets: ['Product Spotlighter', 'Rental Catalog View'],
    relatedApis: ['/api/v1/products', '/api/v1/jobs/search'],
    relatedDashboards: ['Marketplace Activity Tracker'],
    allowedRoles: ['guest', 'member', 'reporter', 'editor', 'super_admin', 'managing_editor', 'creator', 'sales', 'business', 'government'],
    status: 'active',
    version: 'v1.0.0',
    lastUpdated: '2026-07-12',
    ownerTeam: 'Marketplace Operations',
    shortcut: 'Ctrl+Shift+M',
    analytics: { accessCount: 89000, favoritesCount: 4200, activeUsers: 2100 },
    documentation: {
      overview: 'Memfasilitasi transaksi niaga aman bebas komisi (0% fee) antara produsen, distributor, dan konsumen di Jawa Barat.',
      bestPractices: [
        'Gunakan fitur negosiasi untuk mengajukan penawaran harga terbaik.',
        'Manfaatkan rekening bersama (escrow) untuk keamanan pembayaran produk digital atau fisik.'
      ],
      developerNotes: 'Data listing disimpan di localStorage dan mendukung simulasi persetujuan escrow asinkron.',
      changelog: [
        { version: 'v1.0.0', date: '2026-07-12', changes: ['Inisiasi perilisan sebagai modul mandiri di menu utama'] }
      ]
    },
    faq: [
      { q: 'Bagaimana cara mengajukan negosiasi?', a: 'Klik tombol Tawar pada halaman detail barang, lalu masukkan nominal tawaran Anda.' }
    ]
  },
  {
    id: 'feat-jobs-hub',
    name: 'Proyek & Karir',
    slug: 'jobs-hub',
    category: 'Proyek & Karir',
    subcategory: 'Business',
    module: 'Socio-Economic Platform',
    portal: 'Public Portal',
    workspace: 'Public',
    route: 'jobs-hub',
    icon: 'Briefcase',
    color: 'emerald',
    shortDesc: 'Pusat informasi lowongan kerja, proyek infrastruktur, dan freelancer hub Jawa Barat.',
    longDesc: 'Platform karir dan proyek komprehensif Jawa Barat. Mengintegrasikan lowongan kerja perusahaan, tender proyek infrastruktur, dan freelance hub untuk talent daerah.',
    tooltip: 'Buka pusat karir, tender proyek, dan freelancer.',
    keywords: ['loker', 'karir', 'proyek', 'freelance', 'lowongan', 'tender'],
    tags: ['jobs', 'public', 'business'],
    relatedWidgets: ['Local Jobs Finder'],
    relatedApis: ['/api/v1/jobs/search'],
    relatedDashboards: [],
    allowedRoles: ['guest', 'member', 'reporter', 'editor', 'super_admin', 'managing_editor', 'developer', 'advertiser', 'sales', 'business', 'research', 'monitoring', 'finance', 'government', 'creator'],
    status: 'active',
    version: 'v1.0.0',
    lastUpdated: '2026-07-16',
    ownerTeam: 'Marketplace Operations',
    analytics: { accessCount: 50000, favoritesCount: 2500, activeUsers: 1200 },
    documentation: {
      overview: 'Pusat informasi karir dan proyek untuk menjembatani talenta lokal dengan peluang industri.',
      bestPractices: [
        'Gunakan filter lokasi kota untuk mendapatkan loker terdekat.',
        'Sematkan profil karir Anda untuk mendapatkan notifikasi loker yang relevan.'
      ],
      developerNotes: 'Data loker terintegrasi dengan API ingestion eksternal.',
      changelog: [
        { version: 'v1.0.0', date: '2026-07-16', changes: ['Inisiasi perilisan modul Proyek & Karir mandiri'] }
      ]
    },
    faq: [
      { q: 'Bagaimana cara mencari loker?', a: 'Gunakan tab "Lowongan Kerja" di menu Proyek & Karir.' }
    ]
  },
  {
    id: 'feat-business-directory',
    name: 'Direktori Bisnis Jabar',
    slug: 'business-directory',
    category: 'Communities',
    subcategory: 'Business',
    module: 'Socio-Economic Platform',
    portal: 'Public Portal',
    workspace: 'Public',
    route: 'business-directory',
    icon: 'Building',
    color: 'teal',
    shortDesc: 'Direktori resmi profil hukum badan usaha, perusahaan jasa, manufaktur, dan instansi terverifikasi.',
    longDesc: 'Pusat rujukan resmi profil hukum badan usaha, pabrikan, vendor jasa industri, dan instansi terverifikasi di wilayah Jawa Barat yang mendukung inquiry RFQ B2B langsung.',
    tooltip: 'Buka direktori perusahaan dan instansi terverifikasi.',
    keywords: ['direktori', 'perusahaan', 'bisnis', 'pt', 'cv', 'vendor', 'b2b'],
    tags: ['directory', 'public', 'business'],
    relatedWidgets: ['Verified Business Spotlighter'],
    relatedApis: ['/api/v1/companies'],
    relatedDashboards: ['Directory Traffic Analyzer'],
    allowedRoles: ['guest', 'member', 'reporter', 'editor', 'super_admin', 'managing_editor', 'creator', 'sales', 'business', 'government'],
    status: 'active',
    version: 'v1.0.0',
    lastUpdated: '2026-07-16',
    ownerTeam: 'Marketplace Operations',
    shortcut: 'Ctrl+Shift+D',
    analytics: { accessCount: 45000, favoritesCount: 1800, activeUsers: 950 },
    documentation: {
      overview: 'Menyajikan profil perusahaan dan instansi berbadan hukum resmi dengan opsi kontak RFQ langsung untuk mempermudah kemitraan B2B di daerah.',
      bestPractices: [
        'Gunakan pencarian nama perusahaan atau industri untuk memfilter keahlian spesifik.',
        'Kirim form prospek RFQ untuk meminta penawaran harga resmi (quotation).'
      ],
      developerNotes: 'Data direktori perusahaan dilayani oleh komponen terpisah untuk menjamin pemisahan fungsi dari marketplace.',
      changelog: [
        { version: 'v1.0.0', date: '2026-07-16', changes: ['Pemisahan modul Direktori Bisnis menjadi tab/fitur mandiri'] }
      ]
    },
    faq: [
      { q: 'Bagaimana cara mendaftarkan PT saya di direktori ini?', a: 'Hubungi tim sales redaksi melalui form kontak atau pilih opsi pendaftaran mitra korporat di portal bisnis.' }
    ]
  },
  {
    id: 'feat-brand-directory',
    name: 'Direktori Merek HAKI',
    slug: 'brand-directory',
    category: 'Communities',
    subcategory: 'Brands',
    module: 'Socio-Economic Platform',
    portal: 'Public Portal',
    workspace: 'Public',
    route: 'brand-directory',
    icon: 'Award',
    color: 'teal',
    shortDesc: 'Direktori merek lokal Jawa Barat terdaftar HAKI dan real-time cyber sentiment tracker.',
    longDesc: 'Daftar resmi kepemilikan merek lokal Jawa Barat terdaftar HAKI beserta monitoring reputasi, sentimen, dan status perlindungan hukum.',
    tooltip: 'Buka direktori merek terdaftar HAKI.',
    keywords: ['direktori', 'merek', 'haki', 'sentimen', 'brand', 'reputasi'],
    tags: ['directory', 'public', 'brands'],
    relatedWidgets: [],
    relatedApis: [],
    relatedDashboards: [],
    allowedRoles: ['guest', 'member', 'reporter', 'editor', 'super_admin', 'managing_editor', 'creator', 'sales', 'business', 'government'],
    status: 'active',
    version: 'v1.0.0',
    lastUpdated: '2026-07-16',
    ownerTeam: 'Marketplace Operations',
    analytics: { accessCount: 32000, favoritesCount: 1200, activeUsers: 800 },
    documentation: {
      overview: 'Menampilkan data merek lokal terdaftar HAKI beserta grafik analisis cyber sentiment untuk memantau persepsi publik secara real-time.',
      bestPractices: [
        'Cari merek terdaftar menggunakan filter nama atau nomor HAKI.',
        'Gunakan fitur monitoring sentimen untuk memantau percakapan media sosial.'
      ],
      developerNotes: 'Data sentimen ditarik dari index media sosial regional secara terjadwal.',
      changelog: [
        { version: 'v1.0.0', date: '2026-07-16', changes: ['Inisiasi Direktori Merek HAKI mandiri'] }
      ]
    },
    faq: [
      { q: 'Bagaimana cara mendaftarkan merek di direktori ini?', a: 'Pastikan merek Anda telah terdaftar resmi di DJKI HAKI, kemudian kirimkan pengajuan verifikasi dokumen ke redaksi.' }
    ]
  },
  {
    id: 'feat-product-directory',
    name: 'Katalog Produk & Komoditas',
    slug: 'product-directory',
    category: 'Communities',
    subcategory: 'Products',
    module: 'Socio-Economic Platform',
    portal: 'Public Portal',
    workspace: 'Public',
    route: 'product-directory',
    icon: 'Package',
    color: 'pink',
    shortDesc: 'Katalog rilis produk inovatif nasional dan komoditas unggulan Jawa Barat.',
    longDesc: 'Daftar produk, komoditas, dan rilis inovatif Jawa Barat yang didukung dengan saran AI SEO dan direct B2B buyer inquiries.',
    tooltip: 'Buka katalog produk dan komoditas.',
    keywords: ['katalog', 'produk', 'komoditas', 'jual', 'beli', 'b2b'],
    tags: ['directory', 'public', 'products'],
    relatedWidgets: [],
    relatedApis: [],
    relatedDashboards: [],
    allowedRoles: ['guest', 'member', 'reporter', 'editor', 'super_admin', 'managing_editor', 'creator', 'sales', 'business', 'government'],
    status: 'active',
    version: 'v1.0.0',
    lastUpdated: '2026-07-16',
    ownerTeam: 'Marketplace Operations',
    analytics: { accessCount: 41000, favoritesCount: 1900, activeUsers: 1100 },
    documentation: {
      overview: 'Katalog komprehensif produk-produk unggulan daerah untuk mendongkrak visibilitas perdagangan dan transaksi B2B.',
      bestPractices: [
        'Gunakan kategori filter untuk menyaring produk sejenis.',
        'Hubungi langsung penjual menggunakan tombol chat cepat.'
      ],
      developerNotes: 'Setiap produk didukung SEO optimization tags yang diproduksi otomatis oleh asisten AI.',
      changelog: [
        { version: 'v1.0.0', date: '2026-07-16', changes: ['Inisiasi Katalog Produk & Komoditas mandiri'] }
      ]
    },
    faq: [
      { q: 'Bagaimana cara memasukkan produk ke dalam katalog?', a: 'Masuk sebagai Merchant atau UMKM Partner, kemudian tambahkan produk baru di dashboard kemitraan.' }
    ]
  },
  {
    id: 'feat-organization-directory',
    name: 'Direktori Organisasi Jabar',
    slug: 'organization-directory',
    category: 'Communities',
    subcategory: 'Organization',
    module: 'Socio-Economic Platform',
    portal: 'Public Portal',
    workspace: 'Public',
    route: 'organization-directory',
    icon: 'Globe',
    color: 'teal',
    shortDesc: 'Direktori resmi Lembaga Swadaya Masyarakat (LSM), asosiasi industri, dan lembaga riset Jawa Barat.',
    longDesc: 'Pusat rujukan resmi profil organisasi non-profit, lembaga swadaya masyarakat (LSM), asosiasi profesi & industri, serta institusi penelitian di Jawa Barat yang terverifikasi resmi.',
    tooltip: 'Buka direktori organisasi, LSM, asosiasi, & institusi riset.',
    keywords: ['direktori', 'organisasi', 'lsm', 'asosiasi', 'riset', 'non-profit', 'ngo', 'komunitas'],
    tags: ['directory', 'public', 'organization'],
    relatedWidgets: [],
    relatedApis: [],
    relatedDashboards: [],
    allowedRoles: ['guest', 'member', 'reporter', 'editor', 'super_admin', 'managing_editor', 'creator', 'sales', 'business', 'government'],
    status: 'active',
    version: 'v1.0.0',
    lastUpdated: '2026-07-16',
    ownerTeam: 'Marketplace Operations',
    shortcut: 'Ctrl+Shift+O',
    analytics: { accessCount: 15000, favoritesCount: 800, activeUsers: 450 },
    documentation: {
      overview: 'Menyajikan profil lengkap dari berbagai organisasi terdaftar di Jawa Barat, memudahkan sinergi sosial dan kemitraan riset.',
      bestPractices: [
        'Cari organisasi berdasarkan nama, kategori, atau wilayah jangkauan.',
        'Gunakan formulir kontak untuk mengirimkan pengajuan kemitraan program atau penelitian.'
      ],
      developerNotes: 'Data direktori organisasi dimuat dalam tab tersendiri untuk mempermudah integrasi asinkronus.',
      changelog: [
        { version: 'v1.0.0', date: '2026-07-16', changes: ['Inisiasi Direktori Organisasi mandiri'] }
      ]
    },
    faq: [
      { q: 'Bagaimana cara mendaftarkan organisasi saya di direktori ini?', a: 'Pilih tombol ajukan verifikasi organisasi dan kirimkan salinan akta pendirian resmi Kemenkumham atau dokumen rujukan lain.' }
    ]
  },
  {
    id: 'feat-author-directory',
    name: 'Direktori Penulis & Jurnalis',
    slug: 'author-directory',
    category: 'Communities',
    subcategory: 'Author',
    module: 'Socio-Economic Platform',
    portal: 'Public Portal',
    workspace: 'Public',
    route: 'author-directory',
    icon: 'Feather',
    color: 'teal',
    shortDesc: 'Profil jurnalis investigatif, redaktur, dan analis data siber INFOBOS.',
    longDesc: 'Pusat rujukan portofolio dan profil resmi para jurnalis investigatif siber, redaktur pelaksana, dan tim analis data spasial yang memproduksi konten intelijen di platform INFOBOS Next.',
    tooltip: 'Buka direktori profil penulis and jurnalis.',
    keywords: ['direktori', 'penulis', 'jurnalis', 'wartawan', 'redaksi', 'profil', 'reporter'],
    tags: ['directory', 'public', 'author'],
    relatedWidgets: [],
    relatedApis: [],
    relatedDashboards: [],
    allowedRoles: ['guest', 'member', 'reporter', 'editor', 'super_admin', 'managing_editor', 'creator', 'sales', 'business', 'government'],
    status: 'active',
    version: 'v1.0.0',
    lastUpdated: '2026-07-16',
    ownerTeam: 'Newsroom Operations',
    analytics: { accessCount: 18000, favoritesCount: 950, activeUsers: 500 },
    documentation: {
      overview: 'Menampilkan biodata, sertifikasi Dewan Pers, spesifikasi bidang liputan, dan riwayat artikel investigasi para wartawan.',
      bestPractices: [
        'Cari penulis berdasarkan nama atau keahlian spesifikasi sektor liputan.',
        'Gunakan formulir kontak untuk mengajukan wawancara eksklusif atau memberikan info bocoran berita (news tip).'
      ],
      developerNotes: 'Data penulis dimuat dalam sub-modul mandiri di dalam Community Marketplace Hub.',
      changelog: [
        { version: 'v1.0.0', date: '2026-07-16', changes: ['Inisiasi Direktori Jurnalis mandiri'] }
      ]
    },
    faq: [
      { q: 'Bagaimana cara menghubungi penulis secara langsung?', a: 'Gunakan tombol Ajukan Wawancara / Sinergi pada halaman detail jurnalis yang bersangkutan.' }
    ]
  },
  {
    id: 'feat-event-directory',
    name: 'Direktori Event & Agenda Bisnis',
    slug: 'event-directory',
    category: 'Communities',
    subcategory: 'Event',
    module: 'Socio-Economic Platform',
    portal: 'Public Portal',
    workspace: 'Public',
    route: 'event-directory',
    icon: 'Calendar',
    color: 'teal',
    shortDesc: 'Kalender agenda pameran bisnis nasional, ekshibisi industri, dan forum investasi Jawa Barat.',
    longDesc: 'Kalender resmi dan direktori pameran dagang (B2B expo), seminar teknologi, forum koordinasi investasi, dan ajang business matching regional yang terverifikasi di Jawa Barat.',
    tooltip: 'Buka direktori event bisnis & registrasi RSVP.',
    keywords: ['direktori', 'event', 'agenda', 'pameran', 'expo', 'konferensi', 'seminar', 'investasi'],
    tags: ['directory', 'public', 'event'],
    relatedWidgets: [],
    relatedApis: [],
    relatedDashboards: [],
    allowedRoles: ['guest', 'member', 'reporter', 'editor', 'super_admin', 'managing_editor', 'creator', 'sales', 'business', 'government'],
    status: 'active',
    version: 'v1.0.0',
    lastUpdated: '2026-07-16',
    ownerTeam: 'Marketplace Operations',
    analytics: { accessCount: 22000, favoritesCount: 1400, activeUsers: 750 },
    documentation: {
      overview: 'Menyediakan detail informasi pameran, jadwal acara harian, instansi penyelenggara, dan formulir pendaftaran tiket RSVP langsung.',
      bestPractices: [
        'Saring agenda berdasarkan bulan pelaksanaan atau jenis kategori event.',
        'Gunakan formulir registrasi cepat untuk mendapatkan tiket RSVP digital gratis.'
      ],
      developerNotes: 'Data event terintegrasi dengan modul ledger premium untuk pemesanan slot ekshibitor berbayar.',
      changelog: [
        { version: 'v1.0.0', date: '2026-07-16', changes: ['Inisiasi Direktori Event & Agenda Bisnis mandiri'] }
      ]
    },
    faq: [
      { q: 'Apakah tiket RSVP di platform ini berbayar?', a: 'Sebagian besar agenda publik bersifat gratis dengan RSVP. Untuk pameran industri khusus, tautan pembelian tiket resmi akan dicantumkan di halaman detail.' }
    ]
  },
  {
    id: 'feat-forum-hub',
    name: 'Forum Komunitas Jabar',
    slug: 'forum-hub',
    category: 'Communities',
    subcategory: 'Discussions',
    module: 'Socio-Economic Platform',
    portal: 'Public Portal',
    workspace: 'Public',
    route: 'forum-hub',
    icon: 'MessageSquare',
    color: 'indigo',
    shortDesc: 'Papan diskusi interaktif, tanya jawab sektoral, dan polling kebijakan publik Jawa Barat.',
    longDesc: 'Ruang diskusi hangat warga dan pelaku usaha se-Jawa Barat. Menyediakan wadah konsultasi tanya-jawab, jajak pendapat kebijakan daerah, hingga kanal eksklusif premium executive.',
    tooltip: 'Gabung diskusi warga, tanyakan solusi logistik, & ikuti polling.',
    keywords: ['forum', 'komunitas', 'diskusi', 'polling', 'tanya jawab', 'warga'],
    tags: ['forum', 'public', 'discussion'],
    relatedWidgets: ['Top Threads Carousel'],
    relatedApis: ['/api/v1/community/threads'],
    relatedDashboards: ['Community Metrics Board'],
    allowedRoles: ['guest', 'member', 'reporter', 'editor', 'super_admin', 'managing_editor', 'creator', 'sales', 'business', 'government'],
    status: 'active',
    version: 'v1.0.0',
    lastUpdated: '2026-07-12',
    ownerTeam: 'Community Engagement Group',
    shortcut: 'Ctrl+Shift+F',
    analytics: { accessCount: 95000, favoritesCount: 4700, activeUsers: 2300 },
    documentation: {
      overview: 'Wadah kolaborasi asinkron warga untuk memecahkan kendala industri, mengutarakan aspirasi, dan bertukar informasi.',
      bestPractices: [
        'Tandai jawaban paling membantu sebagai Solved untuk mempermudah pembaca lain.',
        'Ikuti standar kesopanan warga digital dalam memposting utas atau membalas opini.'
      ],
      developerNotes: 'Utas tersimpan di localStorage dengan fitur AI Summary otomatis dari ringkasan diskusi.',
      changelog: [
        { version: 'v1.0.0', date: '2026-07-12', changes: ['Inisiasi perilisan modul forum mandiri di menu utama'] }
      ]
    },
    faq: [
      { q: 'Siapa saja yang bisa membuat utas baru?', a: 'Semua anggota terdaftar (termasuk member gratisan) dapat memulai utas di kategori publik.' }
    ]
  },
  {
    id: 'feat-regional-geo',
    name: 'Geo Intelligence Operating System',
    slug: 'geo-intelligence-os',
    category: 'Intelligence',
    subcategory: 'GIS Operations',
    module: 'GeoOS Core Map',
    portal: 'Public Portal',
    workspace: 'Intelligence',
    route: 'geo-intelligence-os',
    icon: 'Map',
    color: 'sky',
    shortDesc: 'Pemetaan interaktif anomali tren, risiko bencana, dan data vital daerah.',
    longDesc: 'Platform sistem informasi geografis (GIS) tercanggih INFOBOS. Menyajikan peta interaktif Jawa Barat yang memuat overlay sebaran demografi, titik objek vital, pemantauan CCTV Dishub live, anomali curah hujan BMKG, tingkat kriminalitas regional, dan potensi pusat pertumbuhan ekonomi baru.',
    tooltip: 'Buka peta intelijen spasial, sebaran sensor, dan objek vital.',
    keywords: ['gis', 'map', 'geospasial', 'cctv', 'bmkg', 'sensor', 'regional', 'jawa barat', 'routing'],
    tags: ['intelligence', 'gis', 'public', 'spatial-data'],
    relatedWidgets: ['GIS Leaflet Engine', 'Dynamic Overlay Selector', 'Sensor Stream Panel', 'CCTV Video Previewer'],
    relatedApis: ['/api/v1/search', '/api/v1/contents', '/api/v1/geo/markers', '/api/v1/geo/traffic-cctv'],
    relatedDashboards: ['Spatial Command Room', 'Disaster Mitigation Command Board'],
    allowedRoles: ['guest', 'member', 'reporter', 'editor', 'super_admin', 'managing_editor', 'developer', 'government', 'research'],
    status: 'active',
    version: 'v3.2.0',
    lastUpdated: '2026-07-02',
    ownerTeam: 'GIS & Spatial Analytics',
    shortcut: 'Ctrl+Shift+G',
    analytics: { accessCount: 124300, favoritesCount: 5820, activeUsers: 1450 },
    documentation: {
      overview: 'GeoOS mengintegrasikan koordinat lintang/bujur berita ke dalam visualisasi peta interaktif. Mempermudah korelasi spasial fenomena sosial, mitigasi bencana, serta analisis infrastruktur wilayah.',
      bestPractices: [
        'Gunakan filter lapisan (layers) di kanan atas peta untuk mengaktifkan heatmap sentimen per kecamatan.',
        'Klik marker CCTV untuk melihat feed arus lalu lintas teraktual.',
        'Pilih overlay "Risiko Bencana" untuk melihat pemetaan kerawanan longsor dan banjir real-time.',
        'Gunakan alat ukur jarak untuk menghitung bentang jalan atau cakupan wilayah administratif.'
      ],
      developerNotes: 'Peta dibangun menggunakan Leaflet JS dengan optimasi rendering marker clustering dan lazy load image tiles untuk performa maksimal pada device mobile.',
      changelog: [
        { version: 'v3.2.0', date: '2026-07-02', changes: ['Peningkatan akurasi koordinat BMKG sensor hulu', 'Perbaikan bug flickering overlay Leaflet'] },
        { version: 'v3.0.0', date: '2026-06-20', changes: ['Rilis total pemetaan sensor berbasis IoT', 'Integrasi overlay citra satelit resolusi menengah'] }
      ]
    },
    faq: [
      { q: 'Bagaimana cara menambahkan lokasi baru?', a: 'Hanya Admin atau instansi Pemerintah (Government Portal) yang dapat mendaftarkan titik koordinat vital baru melalui modul GIS.' },
      { q: 'Seberapa real-time tayangan CCTV Dishub?', a: 'Tayangan diperbarui setiap 1-2 detik tergantung bandwidth internet Anda di lokasi server Dishub daerah.' },
      { q: 'Apakah data demografi peta ini resmi?', a: 'Ya, dataset demografi bersumber dari integrasi API terbuka BPS Provinsi Jawa Barat yang diperbarui berkala.' }
    ]
  },
  {
    id: 'feat-social-media-hub',
    name: 'Social Media Hub',
    slug: 'social-media-hub',
    category: 'Media',
    subcategory: 'Social Engagement',
    module: 'Social Hub',
    portal: 'Public Portal',
    workspace: 'Public',
    route: 'social-media-hub',
    icon: 'Instagram',
    color: 'pink',
    shortDesc: 'Hub media sosial interaktif, feed reels viral, dan analisis tren netizen.',
    longDesc: 'Pusat integrasi media sosial Jawa Barat. Menampilkan feed Instagram, video pendek TikTok, postingan Twitter/X, diskusi Reddit/Forum terpopuler, serta analisis sentimen percakapan netizen secara real-time.',
    tooltip: 'Lihat interaksi media sosial dan anomali tren viral.',
    keywords: ['social', 'media', 'instagram', 'tiktok', 'twitter', 'facebook', 'youtube', 'viral', 'netizen', 'tren'],
    tags: ['media', 'social', 'public', 'reels', 'tiktok'],
    relatedWidgets: ['Social Feed Carousel', 'Trending Hashtags', 'Netizen Sentiment Meter'],
    relatedApis: ['/api/v1/social/feed', '/api/v1/social/metrics'],
    relatedDashboards: ['Social Media Intelligence Room'],
    allowedRoles: ['guest', 'member', 'reporter', 'editor', 'super_admin', 'managing_editor', 'creator', 'sales', 'business', 'government'],
    status: 'active',
    version: 'v1.0.0',
    lastUpdated: '2026-07-12',
    ownerTeam: 'Social Engagement Group',
    shortcut: 'Ctrl+Shift+S',
    analytics: { accessCount: 89000, favoritesCount: 3400, activeUsers: 1200 },
    documentation: {
      overview: 'Social Media Hub mengintegrasikan berbagai platform media sosial dalam satu visualisasi interaktif untuk mempermudah pemantauan percakapan publik Jawa Barat.',
      bestPractices: [
        'Gunakan filter platform untuk menyaring konten spesifik dari Instagram, TikTok, atau X.',
        'Klik pada hashtag yang sedang tren untuk melihat diskusi warga secara luas.',
        'Gunakan simulator postingan bersponsor untuk memproyeksikan jangkauan kampanye Anda.'
      ],
      developerNotes: 'Data diintegrasikan secara dynamic dengan mock feed social API dan asinkronus rendering.',
      changelog: [
        { version: 'v1.0.0', date: '2026-07-12', changes: ['Inisiasi portal Social Media Hub di platform INFOBOS'] }
      ]
    },
    faq: [
      { q: 'Bagaimana cara mendaftarkan akun media sosial korporasi?', a: 'Daftarkan melalui menu PartnerOS untuk mengaktifkan sinkronisasi feed otomatis.' }
    ]
  },
  {
    id: 'feat-video-hub',
    name: 'Video Streaming TV Hub',
    slug: 'video-hub',
    category: 'Media',
    subcategory: 'Broadcasting Portal',
    module: 'Video On Demand',
    portal: 'Public Portal',
    workspace: 'Multimedia',
    route: 'video-hub',
    icon: 'Tv',
    color: 'red',
    shortDesc: 'Portal siaran langsung TV siber, wawancara eksklusif, dan VOD investigasi.',
    longDesc: 'Kanal pemutar video utama INFOBOS. Menyediakan streaming 24 jam siaran berita regional Jawa Barat, rekaman wawancara panel, dokumenter investigasi, dan arsip konferensi pers resmi.',
    tooltip: 'Akses tayangan video berita dan siaran langsung TV.',
    keywords: ['video', 'streaming', 'live tv', 'vod', 'wawancara', 'dokumenter', 'hls', 'media'],
    tags: ['media', 'public', 'streaming', 'video-on-demand'],
    relatedWidgets: ['HLS Live Player', 'Chat Komunitas Live', 'Video Playlist Panel', 'Interactive Broadcast Scheduler'],
    relatedApis: ['/api/v1/contents', '/api/v1/videos/playlist', '/api/v1/videos/live-status'],
    relatedDashboards: ['Broadcasting Analytics', 'Live Stream Engagement Board'],
    allowedRoles: ['guest', 'member', 'reporter', 'editor', 'super_admin', 'managing_editor', 'creator'],
    status: 'active',
    version: 'v2.2.0',
    lastUpdated: '2026-07-02',
    ownerTeam: 'Multimedia Delivery Network',
    shortcut: 'Ctrl+Shift+V',
    analytics: { accessCount: 99400, favoritesCount: 3980, activeUsers: 1120 },
    documentation: {
      overview: 'Pusat distribusi multimedia streaming yang mendukung pemutaran adaptif bitrate (HLS) untuk menghemat penggunaan kuota seluler pembaca tanpa menurunkan ketajaman grafis.',
      bestPractices: [
        'Gunakan resolusi otomatis agar pemutar menyesuaikan dengan fluktuasi jaringan.',
        'Sematkan subtitle bahasa Inggris untuk jangkauan pembaca internasional.',
        'Gunakan fitur PIP (Picture-in-Picture) untuk tetap menonton video sambil membaca artikel lain.',
        'Klik tombol share untuk membagikan stempel waktu (timestamp) video ke WhatsApp.'
      ],
      developerNotes: 'Komponen menggunakan ReactPlayer dengan fallback native HTML5 video untuk keandalan eksekusi sandbox iframe serta optimasi memory garbage collection.',
      changelog: [
        { version: 'v2.2.0', date: '2026-07-02', changes: ['Penambahan fitur Picture-in-Picture', 'Optimalisasi bandwidth buffering HLS'] },
        { version: 'v2.0.0', date: '2026-06-15', changes: ['Redesain tampilan layout dark-mode video catalog', 'Integrasi HLS chunk-loading yang lebih mulus'] }
      ]
    },
    faq: [
      { q: 'Apakah siaran live TV ditunda?', a: 'Siaran langsung kami memiliki latensi rata-rata hanya 4 detik dari pemancar utama di Bandung.' },
      { q: 'Bagaimana cara mengatasi video yang patah-patah?', a: 'Klik tombol gerigi di pojok kanan bawah pemutar video dan turunkan resolusi pemutaran ke 360p or 480p.' },
      { q: 'Di mana saya bisa melihat jadwal acara TV Bos?', a: 'Daftar jadwal tayang harian lengkap tersedia di tab "Jadwal Siaran" di bawah layar pemutar utama.' }
    ]
  },
  {
    id: 'feat-short-video-hub',
    name: 'Short Video (Viralog) Hub',
    slug: 'short-video-hub',
    category: 'Media',
    subcategory: 'Broadcasting Portal',
    module: 'Viralog Hub',
    portal: 'Public Portal',
    workspace: 'Multimedia',
    route: 'short-video-hub',
    icon: 'Tv',
    color: 'rose',
    shortDesc: 'Feed video pendek interaktif viral gaya TikTok dengan sentuhan jurnalisme presisi.',
    longDesc: 'Menyediakan konten video informatif berdurasi singkat (di bawah 60 detik) yang menyajikan rangkuman berita terkini, tanggapan netizen, dan investigasi mikro dengan transkrip otomatis dan efek geser (swipe-to-next) responsif.',
    tooltip: 'Tonton kompilasi video pendek viral teraktual.',
    keywords: ['short video', 'viral', 'tiktok', 'berita pendek', 'swipe', 'shorts', 'viralog', 'reels', 'jurnalisme'],
    tags: ['media', 'public', 'shorts', 'vertical-video'],
    relatedWidgets: ['TikTok Style Swiper', 'Caption Auto Highlighter', 'Share to WA Button', 'Reaction Meter Block'],
    relatedApis: ['/api/v1/contents', '/api/v1/shorts/feed', '/api/v1/shorts/reactions'],
    relatedDashboards: ['Viralog Analytics Board', 'Creator Performance Panel'],
    allowedRoles: ['guest', 'member', 'reporter', 'editor', 'super_admin', 'managing_editor', 'creator'],
    status: 'active',
    version: 'v1.3.0',
    lastUpdated: '2026-07-01',
    ownerTeam: 'Multimedia Delivery Network',
    shortcut: 'Ctrl+Shift+S',
    analytics: { accessCount: 212100, favoritesCount: 15850, activeUsers: 6800 },
    documentation: {
      overview: 'Short Video Hub memanfaatkan ketertarikan visual generasi muda terhadap video berformat vertikal tanpa mengorbankan kualitas jurnalisme berita dan akurasi fakta redaksi.',
      bestPractices: [
        'Swipe ke bawah untuk berpindah ke berita video selanjutnya secara cepat.',
        'Gunakan tombol Bookmark untuk menyimpan video rangkuman riset penting.',
        'Ketuk layar dua kali (double tap) untuk memberikan reaksi suka/reaksi emosional cepat.',
        'Gunakan tombol "Ambil Kutipan" untuk mengekspor klip suara berita ke format WAV.'
      ],
      developerNotes: 'Video dimuat malas (lazy-loaded) dan di-cache pada service worker untuk mencegah lonjakan penggunaan data internet pada browser mobile.',
      changelog: [
        { version: 'v1.3.0', date: '2026-07-01', changes: ['Penambahan tombol ambil kutipan audio jurnalisme', 'Optimasi caching pre-render feed vertikal'] },
        { version: 'v1.1.0', date: '2026-06-26', changes: ['Optimasi cache buffer video berikutnya', 'Penambahan overlay info lokasi geospasial'] }
      ]
    },
    faq: [
      { q: 'Dapatkah saya mengunggah video shorts saya sendiri?', a: 'Ya, kreator bersertifikasi (Creator Portal) dapat mengunggah video vertikal yang akan melalui kurasi ketat redaksi.' },
      { q: 'Apakah transkrip di bawah video selalu akurat?', a: 'Transkrip dihasilkan oleh AI ASR yang kemudian dipoles dan diverifikasi manual oleh tim editor kami sebelum dirilis.' },
      { q: 'Bagaimana cara mematikan pemutaran otomatis (autoplay)?', a: 'Anda dapat menonaktifkan pemutaran otomatis melalui setelan akun di pojok kanan atas aplikasi.' }
    ]
  },
  {
    id: 'feat-podcast-center',
    name: 'Podcast Center Redaksi',
    slug: 'podcast-center',
    category: 'Media',
    subcategory: 'Audio Streaming',
    module: 'Audio Intel Center',
    portal: 'Public Portal',
    workspace: 'Multimedia',
    route: 'podcast-center',
    icon: 'Headphones',
    color: 'purple',
    shortDesc: 'Dengarkan rekaman diskusi, obrolan analis, dan podcast berita intelijen.',
    longDesc: 'Kanal audio streaming interaktif yang memutar seri podcast unggulan redaksi. Menampilkan pemutar audio kustom modern, daftar putar episode, transkrip teks dinamis berbasis pengenal suara (ASR), dan ringkasan episode cerdas.',
    tooltip: 'Dengarkan podcast eksklusif dan baca transkrip otomatis.',
    keywords: ['audio', 'podcast', 'transkrip', 'diskusi', 'obrolan', 'dengar', 'spotify-style', 'mp3'],
    tags: ['media', 'audio', 'public', 'podcasting'],
    relatedWidgets: ['Custom Audio Player', 'Dynamic Transcript Highlighter', 'Episode Selector', 'AI Summary Accordion'],
    relatedApis: ['/api/v1/contents', '/api/v1/podcasts/episode-list', '/api/v1/podcasts/transcript'],
    relatedDashboards: ['Audio Engagement Tracker', 'Podcast Performance metrics'],
    allowedRoles: ['guest', 'member', 'reporter', 'editor', 'super_admin', 'managing_editor', 'creator'],
    status: 'active',
    version: 'v1.4.0',
    lastUpdated: '2026-07-01',
    ownerTeam: 'Multimedia Delivery Network',
    shortcut: 'Ctrl+Shift+P',
    analytics: { accessCount: 52400, favoritesCount: 2310, activeUsers: 640 },
    documentation: {
      overview: 'Podcast Center menyajikan obrolan intelijen dengan transkripsi teks yang tersinkronisasi per detik. Memudahkan pencarian bagian pembicaraan tertentu serta ekspor naskah berita.',
      bestPractices: [
        'Klik pada kalimat di transkrip untuk langsung melompati pemutar ke detik ucapan tersebut.',
        'Gunakan kecepatan putar 1.5x untuk efisiensi briefing pagi.',
        'Klik tombol "Rangkum AI" untuk menampilkan poin-poin diskusi berdurasi 1 jam dalam format bullet-point ringkas.',
        'Gunakan fitur background play di perangkat seluler dengan mengizinkan izin lockscreen.'
      ],
      developerNotes: 'Audio player diimplementasikan menggunakan HTML5 Audio API dengan tracking kemajuan sinkron ke React state secara asinkron.',
      changelog: [
        { version: 'v1.4.0', date: '2026-07-01', changes: ['Integrasi ringkasan AI berbasis Gemini Model', 'Perbaikan bug audio state saat tab tidak aktif'] },
        { version: 'v1.2.0', date: '2026-06-22', changes: ['Implementasi Highlighting Transkrip Berjalan secara real-time', 'Penambahan audio offline caching'] }
      ]
    },
    faq: [
      { q: 'Bagaimana cara mendownload file MP3-nya?', a: 'Daftarkan akun member terverifikasi untuk mengunduh versi audio resolusi tinggi demi penggunaan offline.' },
      { q: 'Apakah podcast ini dirilis setiap hari?', a: 'Seri "Wawancara Investigasi" dirilis setiap hari Selasa, sedangkan "Briefing Finansial" mengudara setiap pagi pukul 07:00 WIB.' },
      { q: 'Dapatkah saya mengajukan pertanyaan ke narasumber podcast?', a: 'Ya, gunakan tab "Komentar Komunitas" di bawah episode untuk menaruh pertanyaan yang akan dipilih oleh host.' }
    ]
  },
  {
    id: 'feat-document-center',
    name: 'Document Intelligence Center',
    slug: 'document-center',
    category: 'Media',
    subcategory: 'Knowledge Repository',
    module: 'Knowledge Assets',
    portal: 'Public Portal',
    workspace: 'Public',
    route: 'document-center',
    icon: 'Database',
    color: 'amber',
    shortDesc: 'Repositori kajian kebijakan publik, PDF peraturan daerah, dan transkrip undang-undang.',
    longDesc: 'Pusat dokumen resmi pemerintah dan korporat. Menampilkan transkrip, analisis kebijakan fiskal, rangkuman eksekutif rancangan undang-undang, serta metadata penemu kajian akademis yang bisa dibaca dan dicari teks lengkapnya (full-text search).',
    tooltip: 'Cari berkas akademis, draf undang-undang, dan PMK keuangan daerah.',
    keywords: ['dokumen', 'pdf', 'kebijakan', 'regulasi', 'pmk', 'kajian', 'uu', 'perda', 'perwal', 'bpk'],
    tags: ['media', 'documents', 'public', 'governance'],
    relatedWidgets: ['Document Reader Frame', 'Metadata Spec Card', 'Search Document Query Box', 'AI Outline Panel'],
    relatedApis: ['/api/v1/contents', '/api/v1/documents/search', '/api/v1/documents/extract'],
    relatedDashboards: ['Document Query Tracker', 'Knowledge Ingestion Console'],
    allowedRoles: ['guest', 'member', 'reporter', 'editor', 'super_admin', 'managing_editor', 'developer', 'research', 'government'],
    status: 'active',
    version: 'v1.3.0',
    lastUpdated: '2026-07-01',
    ownerTeam: 'Knowledge Operations Desk',
    shortcut: 'Ctrl+Shift+D',
    analytics: { accessCount: 39400, favoritesCount: 2240, activeUsers: 480 },
    documentation: {
      overview: 'Pusat pustaka dokumen digital resmi yang telah dipilah, ditandai, dan dirangkum poin pentingnya menggunakan kecerdasan buatan untuk membantu peneliti dan jurnalis.',
      bestPractices: [
        'Gunakan ekspor ringkasan draf peraturan daerah untuk bahan rilis berita atau riset akademis.',
        'Unduh PDF asli yang dilampirkan jika Anda memerlukan stempel basah instansi resmi.',
        'Gunakan pencarian berfilter (filter search) untuk memilah peraturan daerah berdasarkan kota/kabupaten spesifik.',
        'Sorot teks di penampil PDF terintegrasi untuk mencari korelasi hukum di kamus glosarium.'
      ],
      developerNotes: 'Komponen merender dokumen terintegrasi via widget oEmbed asinkron jika format berkas tersimpan eksternal serta PDFJS fallback renderer.',
      changelog: [
        { version: 'v1.3.0', date: '2026-07-01', changes: ['Penambahan filter spesifik regional kabupaten/kota', 'Peningkatan akurasi full-text search indexer'] },
        { version: 'v1.0.0', date: '2026-06-18', changes: ['Inisiasi portal dokumentasi intelijen pertama', 'Sistem indexing teks penuh untuk pencarian cepat'] }
      ]
    },
    faq: [
      { q: 'Apakah dokumen-dokumen ini resmi?', a: 'Ya, seluruh dokumen diunggah dari rilis resmi situs Kementerian Keuangan, Pemprov Jabar, atau instansi terkait.' },
      { q: 'Apakah dokumen APBD daerah juga tersedia di sini?', a: 'Ya, draf final APBD dan nota keuangan seluruh kota/kabupaten se-Jawa Barat diunggah berkala setelah pengesahan.' },
      { q: 'Dapatkah saya mengunggah draf kebijakan akademis buatan saya?', a: 'Pengunggahan karya tulis ilmiah hanya diizinkan untuk institusi riset mitra terverifikasi melalui menu khusus akademis.' }
    ]
  },
  {
    id: 'feat-gallery-center',
    name: 'Gallery Center',
    slug: 'gallery-center',
    category: 'Media',
    subcategory: 'Broadcasting Portal',
    module: 'Media Assets',
    portal: 'Public Portal',
    workspace: 'Multimedia',
    route: 'gallery-center',
    icon: 'Tv',
    color: 'indigo',
    shortDesc: 'Arsip foto jurnalistik, galeri infografis, dan dokumentasi visual peristiwa.',
    longDesc: 'Menyajikan kumpulan dokumentasi jurnalisme visual beresolusi tinggi, kompilasi infografis data makro, sebaran wilayah, penyerapan anggaran, serta peristiwa penting di Jawa Barat yang disusun rapi dan dapat diunduh secara resmi.',
    tooltip: 'Buka galeri foto jurnalistik dan infografis statistik.',
    keywords: ['galeri', 'foto', 'infografis', 'gambar', 'dokumentasi', 'jurnalistik', 'press-photo', 'album'],
    tags: ['media', 'public', 'visual', 'photography'],
    relatedWidgets: ['High Res Lightbox', 'Infographic Swiper', 'Download Asset Manager', 'Copyright Info Drawer'],
    relatedApis: ['/api/v1/contents', '/api/v1/gallery/images', '/api/v1/gallery/download-license'],
    relatedDashboards: ['Visual Engagement Board', 'Media Resource Allocation Board'],
    allowedRoles: ['guest', 'member', 'reporter', 'editor', 'super_admin', 'managing_editor', 'creator'],
    status: 'active',
    version: 'v1.2.0',
    lastUpdated: '2026-07-02',
    ownerTeam: 'Multimedia Delivery Network',
    shortcut: 'Ctrl+Shift+F',
    analytics: { accessCount: 29400, favoritesCount: 1690, activeUsers: 310 },
    documentation: {
      overview: 'Arsip visual yang merekam sejarah perkembangan tata ruang, kebudayaan, seni daerah, dan dinamika sosial perkotaan di Jawa Barat secara profesional.',
      bestPractices: [
        'Klik pada gambar untuk membuka mode layar penuh (lightbox) yang memuat takarir (caption) lengkap UU Pers.',
        'Sertakan atribusi kredit fotografer jika Anda berniat memposting ulang di media sosial.',
        'Gunakan format resolusi menengah untuk pratinjau cepat, dan format resolusi tinggi untuk kebutuhan cetak koran.',
        'Pilih opsi filter "Infografis Data" jika Anda hanya ingin mencari statistik visual ringkas.'
      ],
      developerNotes: 'Lightbox mendukung kontrol gesture swipe mobile untuk transisi antar gambar yang natural serta hardware-accelerated image scaling.',
      changelog: [
        { version: 'v1.2.0', date: '2026-07-02', changes: ['Penambahan filter metadata EXIF kamera', 'Peningkatan kecepatan loading resolusi retina'] },
        { version: 'v1.0.1', date: '2026-06-12', changes: ['Perbaikan layout grid yang terpotong pada layar mobile', 'Optimasi dynamic lazy loading image'] }
      ]
    },
    faq: [
      { q: 'Bagaimana cara meminta hak cipta foto untuk kebutuhan cetak?', a: 'Ajukan lisensi gratis dengan mengisi form kontak media di footer dengan melampirkan ID foto terkait.' },
      { q: 'Apakah foto-foto di galeri ini boleh dimodifikasi?', a: 'Foto jurnalisme tunduk pada aturan editorial ketat dan tidak boleh dimodifikasi secara drastif (misalnya manipulasi digital yang mengubah fakta).' },
      { q: 'Apakah infografis di sini boleh dicetak sebagai bahan presentasi?', a: 'Ya, seluruh infografis INFOBOS bersifat domain publik dan boleh dicetak untuk presentasi, pembelajaran kelas, maupun laporan komersial dengan menyebutkan sumber.' }
    ]
  },
  {
    id: 'feat-interactive-data',
    name: 'Interactive Data Hub',
    slug: 'interactive-data',
    category: 'Intelligence',
    subcategory: 'Decision Support System',
    module: 'Data Visualizer',
    portal: 'Public Portal',
    workspace: 'Public',
    route: 'interactive-data',
    icon: 'Activity',
    color: 'teal',
    shortDesc: 'Portal kalkulator fiskal daerah, simulasi anomali inflasi, dan pembuat chart data terbuka.',
    longDesc: 'Kanal eksplorasi data publik. Menyediakan kalkulator fiskal daerah terintegrasi PMK, simulator tren inflasi, visualizer grafik interaktif menggunakan D3/Recharts untuk menganalisis APBD Jawa Barat, serta ekspor dataset ramah mesin.',
    tooltip: 'Jalankan simulasi data ekonomi, inflasi, dan APBD.',
    keywords: ['kalkulator', 'fiskal', 'inflasi', 'apbd', 'chart', 'data', 'recharts', 'd3', 'simulasi', 'ekonomi'],
    tags: ['intelligence', 'analytics', 'public', 'data-visualizer'],
    relatedWidgets: ['Fiskal Calculator Form', 'Dynamic Recharts Panel', 'CSV Dataset Downloader', 'AI Trend Analyzer Card'],
    relatedApis: ['/api/v1/contents', '/api/v1/virtual/metrics', '/api/v1/data/fiskal-variables'],
    relatedDashboards: ['Data Analytics Room', 'Macro Economics Dashboard'],
    allowedRoles: ['guest', 'member', 'reporter', 'editor', 'super_admin', 'managing_editor', 'developer', 'research', 'finance', 'government'],
    status: 'active',
    version: 'v1.4.0',
    lastUpdated: '2026-07-02',
    ownerTeam: 'SRE & Cloud Infrastructure',
    shortcut: 'Ctrl+Shift+D',
    analytics: { accessCount: 78900, favoritesCount: 3410, activeUsers: 890 },
    documentation: {
      overview: 'Interactive Data menyajikan transparansi data fiskal dalam format grafik yang interaktif, mudah dimengerti, bebas bias, serta mendukung pemodelan skenario ekonomi makro.',
      bestPractices: [
        'Geser slider nilai makro untuk mensimulasikan dampak perubahan suku bunga terhadap alokasi daerah.',
        'Gunakan format JSON jika ingin melakukan pemanggilan REST langsung ke program automasi Anda.',
        'Klik tombol "Bandingkan Wilayah" di modul APBD untuk menganalisis pengeluaran dua kota sekaligus.',
        'Aktifkan overlay trendline untuk memproyeksikan data historis hingga 5 tahun ke depan.'
      ],
      developerNotes: 'Pemrosesan simulasi berjalan instan langsung di sisi klien menggunakan rumus interpolasi linier untuk menjamin privasi input pengguna.',
      changelog: [
        { version: 'v1.4.0', date: '2026-07-02', changes: ['Penambahan fitur perbandingan anggaran antarkota', 'Optimasi performa rendering grafik D3 pada data bervolume besar'] },
        { version: 'v1.2.0', date: '2026-06-25', changes: ['Pembaruan formula simulasi PMK 2026', 'Visualisasi histogram interaktif baru'] }
      ]
    },
    faq: [
      { q: 'Seberapa akurat data simulasi ini?', a: 'Parameter dasar disesuaikan dengan asumsi makro APBN resmi yang disahkan Kementerian Keuangan RI.' },
      { q: 'Apakah data APBD di sini mencakup desa?', a: 'Untuk saat ini data baru mencakup alokasi anggaran tingkat kota, kabupaten, dan provinsi (tidak sampai unit desa).' },
      { q: 'Bagaimana cara meminta dataset spesifik yang belum tersedia?', a: 'Silakan ajukan permintaan informasi publik melalui link Formulir PPID yang tersedia di menu navigasi utama.' }
    ]
  },
  {
    id: 'feat-event-center',
    name: 'Event Center Jawa Barat',
    slug: 'event-center',
    category: 'Communities',
    subcategory: 'Social Engagement',
    module: 'Event Platform',
    portal: 'Public Portal',
    workspace: 'Public',
    route: 'event-center',
    icon: 'Compass',
    color: 'amber',
    shortDesc: 'Pusat agenda, jadwal pameran UMKM, lokakarya teknologi, dan konferensi daerah.',
    longDesc: 'Portal pendaftaran dan jadwal acara terpadu di Jawa Barat. Menampilkan kalender event interaktif, detail lokasi acara, link registrasi tiket elektronik, forum diskusi peserta, serta pengingat jadwal (reminder) dinamis.',
    tooltip: 'Lihat agenda, seminar, dan festival UMKM terdekat.',
    keywords: ['event', 'acara', 'seminar', 'kalender', 'jadwal', 'tiket', 'festival', 'pameran', 'jawabarat'],
    tags: ['communities', 'public', 'events', 'agenda'],
    relatedWidgets: ['Interactive Calendar Widget', 'Ticket Booking Panel', 'Event Countdown Clock', 'Live Chat Forum'],
    relatedApis: ['/api/v1/contents', '/api/v1/events/list', '/api/v1/events/ticket-reservation'],
    relatedDashboards: ['Event Registration Dashboard', 'Ticket Sales Audit Board'],
    allowedRoles: ['guest', 'member', 'reporter', 'editor', 'super_admin', 'managing_editor', 'creator', 'sales', 'business', 'government'],
    status: 'active',
    version: 'v1.2.0',
    lastUpdated: '2026-07-01',
    ownerTeam: 'Community Engagement Group',
    shortcut: 'Ctrl+Shift+E',
    analytics: { accessCount: 52900, favoritesCount: 2800, activeUsers: 510 },
    documentation: {
      overview: 'Pusat kolaborasi fisik warga Jawa Barat melalui pencatatan event kreatif, lokakarya teknologi, dan festival UMKM daerah yang dipantau real-time.',
      bestPractices: [
        'Klik hari pada kalender di atas untuk menyorot acara unggulan pada tanggal tersebut.',
        'Tambahkan event langsung ke Google Calendar atau pengingat lokal via file .ics.',
        'Verifikasi profil member Anda untuk mempercepat pendaftaran tiket acara bersponsor gratis.',
        'Gunakan peta petunjuk arah Leaflet yang tertanam di halaman event untuk menavigasi ke venue.'
      ],
      developerNotes: 'Kalender mendukung skema JSON-LD Event untuk pengindeksan optimal di Google Search dan integrasi kaya SEO.',
      changelog: [
        { version: 'v1.2.0', date: '2026-07-01', changes: ['Integrasi QR Code tiket pada email konfirmasi', 'Pembaruan UI filter pencarian event berbayar vs gratis'] },
        { version: 'v1.0.5', date: '2026-06-19', changes: ['Integrasi layout kalender grid interaktif', 'Penambahan widget checklist status reservasi tiket'] }
      ]
    },
    faq: [
      { q: 'Apakah ada biaya untuk memasukkan event komunitas?', a: 'Tidak ada biaya. Komunitas warga dapat mengajukan event gratis melalui form yang disiapkan di bawah persetujuan Admin.' },
      { q: 'Bagaimana cara membatalkan pemesanan tiket saya?', a: 'Buka menu "Tiket Saya" di profil Anda, pilih tiket terkait lalu klik "Batalkan Reservasi" agar kuota bisa dialokasikan kembali.' },
      { q: 'Dapatkah saya melakukan live-streaming acara di halaman event ini?', a: 'Ya, penyelenggara yang berstatus verified partner dapat menautkan link YouTube atau HLS streaming untuk ditonton audiens virtual langsung di halaman event.' }
    ]
  },
  {
    id: 'feat-channel-center',
    name: 'Channel Center Redaksi',
    slug: 'channel-center',
    category: 'Media',
    subcategory: 'Broadcasting Portal',
    module: 'Broadcasting Hub',
    portal: 'Public Portal',
    workspace: 'Multimedia',
    route: 'channel-center',
    icon: 'Tv',
    color: 'sky',
    shortDesc: 'Direktori kanal khusus (politik, ekonomi, hukum) dengan visual feed modern.',
    longDesc: 'Pintu gerbang penjelajahan kanal berita tematik INFOBOS. Menyediakan pengelompokan feed instan, indeks liputan investigasi mendalam, ringkasan topik paling ramai dibicarakan, rekomendasi kanal berdasarkan profil pembaca, dan kurator berita pilihan editor.',
    tooltip: 'Buka kanal-kanal berita khusus bertema khusus.',
    keywords: ['kanal', 'channel', 'politik', 'ekonomi', 'hukum', 'liputan', 'feed', 'investigasi', 'tematik'],
    tags: ['media', 'public', 'channels', 'newsfeed'],
    relatedWidgets: ['Channel Filter Bar', 'Curator Showcase Slider', 'Tag List Cloud', 'Breaking News Alert Bar'],
    relatedApis: ['/api/v1/contents', '/api/v1/categories', '/api/v1/channels/recommendations'],
    relatedDashboards: ['Channel Traffic Dashboard', 'Editorial Channel Board'],
    allowedRoles: ['guest', 'member', 'reporter', 'editor', 'super_admin', 'managing_editor', 'creator'],
    status: 'active',
    version: 'v1.2.0',
    lastUpdated: '2026-07-01',
    ownerTeam: 'Media Delivery Team',
    shortcut: 'Ctrl+Shift+K',
    analytics: { accessCount: 39400, favoritesCount: 1120, activeUsers: 280 },
    documentation: {
      overview: 'Channel Center merangkum keragaman kanal informasi redaksi agar pembaca dapat fokus pada klaster pengetahuan tertentu yang sesuai minat mereka.',
      bestPractices: [
        'Ikuti (follow) saluran tertentu untuk mendapatkan prioritas breaking news di halaman depan.',
        'Klik ikon "AI Summary" di kanan saluran untuk merangkum berita penting seminggu terakhir.',
        'Gunakan opsi filter "Liputan Khusus" untuk membaca kompilasi seri investigasi mendalam berdurasi panjang.',
        'Atur tata letak list view vs grid view feed sesuai kenyamanan mata Anda.'
      ],
      developerNotes: 'Pengaturan kanal di-cache di client-side menggunakan state hook global untuk pergantian kanal instan tanpa me-re-fetch data statis.',
      changelog: [
        { version: 'v1.2.0', date: '2026-07-01', changes: ['Penambahan widget AI Weekly Summary', 'Optimasi dynamic feed pagination untuk scrolling tak terbatas'] },
        { version: 'v1.0.0', date: '2026-06-10', changes: ['Peluncuran perdana visualisasi kanal tematik INFOBOS'] }
      ]
    },
    faq: [
      { q: 'Bagaimana cara mengganti kanal default?', a: 'Masuk sebagai Member dan pilih kanal kegemaran di halaman pengaturan profil Anda.' },
      { q: 'Apakah saya bisa membuat kanal kustom saya sendiri?', a: 'Anda dapat membuat "Kanal Watchlist" di mana berita dikelompokkan otomatis berdasarkan kata kunci (keywords) yang Anda daftarkan.' },
      { q: 'Bagaimana kurator menentukan berita pilihan editor?', a: 'Editor senior menyeleksi berita berbobot investigasi tinggi, berdaya dampak besar, atau memiliki fakta unik regional setiap hari.' }
    ]
  },
  {
    id: 'feat-ados',
    name: 'AdOS Portal (Zone Monetisasi)',
    slug: 'ados',
    category: 'Revenue',
    subcategory: 'Advertising Management',
    module: 'Ad Delivery Network',
    portal: 'Advertiser Portal',
    workspace: 'Revenue Operations',
    route: 'ados',
    icon: 'CreditCard',
    color: 'indigo',
    shortDesc: 'Sistem manajemen penayangan iklan mandiri (self-service ad portal) untuk pengiklan.',
    longDesc: 'Portal mandiri bagi pengiklan korporat. Memungkinkan pembuatan kampanye iklan, penyetelan target audiens spasial Jabar, pemilihan zona peletakan iklan (bento, sidebar, in-feed, video pre-roll), simulasi taksiran impresi, pengunggahan materi kreatif banner, serta pembayaran tagihan invoice.',
    tooltip: 'Sistem manajemen peletakan iklan dan kampanye mandiri.',
    keywords: ['iklan', 'campaign', 'banner', 'monetisasi', 'ados', 'self-service', 'marketing', 'adsense', 'cpm', 'cpc'],
    tags: ['revenue', 'ads', 'secure', 'self-service-monetization'],
    relatedWidgets: ['Ad Placement Previewer', 'Budget Calculator Slider', 'Campaign Performance Stats', 'CTR Performance Gauge'],
    relatedApis: ['/api/v1/virtual/metrics', '/api/v1/ads/campaigns', '/api/v1/ads/placements'],
    relatedDashboards: ['Advertiser Live Analytics', 'Ad Revenue Operations Desk'],
    allowedRoles: ['advertiser', 'super_admin', 'managing_editor', 'developer', 'finance'],
    status: 'active',
    version: 'v1.8.0',
    lastUpdated: '2026-07-01',
    ownerTeam: 'Revenue & Growth Operations',
    shortcut: 'Ctrl+Shift+X',
    analytics: { accessCount: 18900, favoritesCount: 490, activeUsers: 84 },
    documentation: {
      overview: 'AdOS menggerakkan sirkulasi ekonomi beriklan mandiri yang efisien dan transparan, menghindari pemotongan komisi agensi besar serta memberikan pengiklan kendali penuh atas materi kreatif.',
      bestPractices: [
        'Gunakan format rasio 300x600 untuk penempatan sidebar_sticky demi rasio klik (CTR) tertinggi.',
        'Gunakan opsi filter geospasial untuk menayangkan iklan eksklusif hanya di daerah Bandung Raya.',
        'Unggah gambar berformat PNG terkompresi dengan ukuran di bawah 150KB untuk menjamin pemuatan cepat.',
        'Pantau rasio klik-tayang harian di panel analitik untuk menyesuaikan bid CPM Anda.'
      ],
      developerNotes: 'Sistem peletakan ad dikendalikan secara real-time melalui AdZone component dengan fallback house-ad jika slot kosong atau tidak terisi bidding eksternal.',
      changelog: [
        { version: 'v1.8.0', date: '2026-07-01', changes: ['Pembaruan kalkulator CTR estimasi interaktif', 'Peningkatan kualitas kompresi file banner otomatis'] },
        { version: 'v1.6.0', date: '2026-06-25', changes: ['Penambahan opsi penargetan geospasial presisi', 'Pembaruan interface pratinjau banner instan'] }
      ]
    },
    faq: [
      { q: 'Berapa minimal budget untuk memasang iklan?', a: 'Iklan bento kami mendukung sistem bayar per impresi (CPM) mulai dari Rp 15.000 saja per seribu penayangan.' },
      { q: 'Apakah ada sistem approval materi iklan?', a: 'Ya, seluruh materi banner kreatif yang diunggah oleh pengiklan akan ditinjau oleh tim sales operasi kami dalam waktu maksimal 3 jam sebelum mulai tayang.' },
      { q: 'Bagaimana cara melakukan pembayaran invoice?', a: 'Kami mendukung transfer bank otomatis virtual account (VA), kartu kredit, dan berbagai dompet digital e-wallet lokal.' }
    ]
  },
  {
    id: 'feat-seo-hub',
    name: 'SEO Hub & Schema Generator',
    slug: 'seo-hub',
    category: 'CMS',
    subcategory: 'Content Optimization',
    module: 'Viralog Optimization',
    portal: 'CMS Portal',
    workspace: 'Editorial',
    route: 'seo-hub',
    icon: 'Sparkles',
    color: 'teal',
    shortDesc: 'Modul optimasi SEO draf berita, verifikasi metadata EEAT, dan generator schema struktural.',
    longDesc: 'Alat penunjang wartawan untuk meraih jangkauan artikel maksimal. Mengotomasi pembuatan data terstruktur Schema.org (NewsArticle, FAQPage, LiveBlog), menganalisis density kata kunci (keywords), menyusun deskripsi meta cerdas, serta memeriksa tingkat kepatuhan EEAT sesuai petunjuk penilai Google.',
    tooltip: 'Optimasi artikel, analisis kata kunci, dan pasang JSON-LD schema.',
    keywords: ['seo', 'schema', 'metadata', 'eeat', 'keywords', 'json-ld', 'google', 'analytics', 'audit'],
    tags: ['cms', 'seo', 'automation', 'optimization'],
    relatedWidgets: ['Keyword Density Analyzer', 'JSON-LD Schema Generator', 'EEAT Audit Checklist', 'SERP Previewer Component'],
    relatedApis: ['/api/v1/contents', '/api/v1/seo/keyword-trends', '/api/v1/seo/validate-schema'],
    relatedDashboards: ['SEO Analytics Console', 'Search Console Mock Board'],
    allowedRoles: ['reporter', 'editor', 'managing_editor', 'super_admin', 'creator', 'developer'],
    status: 'active',
    version: 'v1.6.0',
    lastUpdated: '2026-07-02',
    ownerTeam: 'CMS & Security Operations',
    shortcut: 'Ctrl+Shift+U',
    analytics: { accessCount: 42300, favoritesCount: 1610, activeUsers: 290 },
    documentation: {
      overview: 'SEO Hub mengondisikan berita draf agar memenuhi standar rambat web-crawler secara kilat dan kaya cuplikan penelusuran (rich snippets) di halaman pencarian Google.',
      bestPractices: [
        'Klik "Generate JSON-LD" untuk mendapatkan skrip metadata siap tempel di kepala halaman.',
        'Pastikan skor kesesuaian EEAT berada di kisaran hijau (di atas 85%) sebelum mengajukan review draf ke redaktur.',
        'Hindari pengulangan kata kunci yang berlebihan (keyword stuffing) dengan menjaga kepadatan di bawah 2.5%.',
        'Tulis rangkuman meta description yang memuat kalimat ajakan bertindak (call-to-action) yang memikat pembaca.'
      ],
      developerNotes: 'Metadata JSON-LD dihasilkan secara otomatis dengan memformat variabel draf ke format LD-JSON terstandarisasi yang ter-escape secara aman dari serangan skrip silang.',
      changelog: [
        { version: 'v1.6.0', date: '2026-07-02', changes: ['Pembaruan simulator SERP seluler vs desktop', 'Optimalisasi validasi parsing sintaks JSON-LD'] },
        { version: 'v1.4.0', date: '2026-06-23', changes: ['Implementasi skema otomatis Google News Standout', 'Integrasi analisis keterbacaan artikel'] }
      ]
    },
    faq: [
      { q: 'Apakah alat ini memicu pelanggaran AI Content?', a: 'Tidak. Generator kami hanya mengoptimasi struktur kata dan meta-tag teknis, seluruh substansi tulisan murni milik jurnalis.' },
      { q: 'Apa itu EEAT dan mengapa itu penting?', a: 'EEAT singkatan dari Experience, Expertise, Authoritativeness, dan Trustworthiness. Ini adalah metrik kepatuhan kualitas konten Google yang krusial untuk meningkatkan reputasi berita Anda di mesin pencarian.' },
      { q: 'Dapatkah saya merancang FAQ Schema otomatis di sini?', a: 'Ya, sistem secara cerdas mengekstrak format tanya jawab dari draf tulisan Anda untuk dikonversi menjadi schema FAQPage dalam 1 klik.' }
    ]
  },
  {
    id: 'feat-mediaos',
    name: 'MediaOS Telemetry Console',
    slug: 'mediaos',
    category: 'Monitoring',
    subcategory: 'Platform Diagnostics',
    module: 'Infrastructure Operations',
    portal: 'Developer Portal',
    workspace: 'Development',
    route: 'mediaos',
    icon: 'Activity',
    color: 'emerald',
    shortDesc: 'Konsol diagnostik dan telemetri server untuk memantau integritas platform.',
    longDesc: 'Menyediakan metrik operasional infrastruktur INFOBOS: utilisasi CPU, konsumsi RAM container Cloud Run, latency API gateway, status sinkronisasi SQLite database, uptime hulu server, dan pemantauan thread integrasi Evolis.',
    tooltip: 'Pantau kesehatan server, latency API, dan telemetri sistem.',
    keywords: ['telemetri', 'diagnostik', 'server', 'database', 'uptime', 'cpu', 'latency', 'infra', 'sre', 'grafana-style'],
    tags: ['developer', 'monitoring', 'infra', 'ops'],
    relatedWidgets: ['Resource Usage Ring', 'API Latency Line Graph', 'Pipeline Status Panel', 'Memory Allocation Chart'],
    relatedApis: ['/api/v1/virtual/metrics', '/api/v1/virtual/scenario', '/api/v1/infra/telemetry-stream'],
    relatedDashboards: ['Platform Operations Center', 'Container Health Dashboard'],
    allowedRoles: ['developer', 'super_admin'],
    status: 'active',
    version: 'v1.2.0',
    lastUpdated: '2026-07-01',
    ownerTeam: 'SRE & Cloud Infrastructure',
    shortcut: 'Ctrl+Shift+L',
    analytics: { accessCount: 12430, favoritesCount: 320, activeUsers: 38 },
    documentation: {
      overview: 'MediaOS mendeteksi degradasi performa pipeline secara proaktif. Jika latency database melewati 500ms, peringatan otomatis dikirimkan ke Slack ops serta memicu pembersihan cache sementera.',
      bestPractices: [
        'Gunakan pengetesan skenario beban "Slow Query Simulation" di tab diagnosa untuk memeriksa keandalan server dalam menyajikan data cadangan.',
        'Pantau konsumsi memori container saat peluncuran breaking news global.',
        'Periksa status koneksi sinkronisasi basis data sebelum melakukan deployment pipeline baru.',
        'Gunakan visualizer log kesalahan (error stream logs) untuk melacak kegagalan pemanggilan API pihak ketiga.'
      ],
      developerNotes: 'Metrik virtual disimulasikan secara deterministik untuk menjaga performa rendering di lingkungan container tanpa overhead database riil serta hemat bandwidth.',
      changelog: [
        { version: 'v1.2.0', date: '2026-07-01', changes: ['Peningkatan akurasi simulasi latency API eksternal', 'Integrasi metrik konsumsi bandwidth Cloud Run'] },
        { version: 'v1.0.3', date: '2026-06-27', changes: ['Penambahan skenario RBAC audit pada visual logger', 'Pengurangan overhead transfer payload JSON diagnostics'] }
      ]
    },
    faq: [
      { q: 'Apakah status Uptime 99.98% valid?', a: 'Ya, metrik diukur secara independen oleh edge node yang tersebar di 3 zona ketersediaan Cloud Run.' },
      { q: 'Di mana saya bisa melihat log error mentah?', a: 'Tab "Error Log Stream" merangkum 100 baris kegagalan eksekusi terakhir lengkap dengan stack-trace debug-nya.' },
      { q: 'Bagaimana frekuensi polling data telemetri ini?', a: 'Sistem melakukan pembaruan (refresh) data visual secara asinkron setiap 3 detik di client-side.' }
    ]
  },
  {
    id: 'feat-admin-cms',
    name: 'News CMS & Editorial Dashboard',
    slug: 'admin',
    category: 'CMS',
    subcategory: 'Workflow Administration',
    module: 'Viralog Editorial Control',
    portal: 'CMS Portal',
    workspace: 'Editorial',
    route: 'admin',
    icon: 'Shield',
    color: 'rose',
    shortDesc: 'Konsol administrasi utama bagi wartawan, editor, dan peninjau berita.',
    longDesc: 'Pusat produksi berita INFOBOS. Menyediakan editor teks kaya (Rich Text Editor), integrasi AI untuk analisis risiko kepatuhan hukum, pengecekan orisinalitas berita, log audit kepatuhan Dewan Pers, pengaduan hak jawab, dan siklus persetujuan status berita (Draft -> Review -> Publish).',
    tooltip: 'Kelola alur kerja berita, log audit, dan persetujuan redaksi.',
    keywords: ['redaksi', 'cms', 'editor', 'wartawan', 'persetujuan', 'log audit', 'koreksi', 'dewan pers', 'workflow', 'hukum'],
    tags: ['cms', 'admin', 'secure', 'governance'],
    relatedWidgets: ['Rich Text Composer', 'Workflow Status Stepper', 'Audit Log Viewer', 'Fact-Check Correction Poster', 'Legal Advisory Panel'],
    relatedApis: ['/api/v1/admin/contents', '/api/v1/admin/audit-logs', '/api/v1/admin/contents/:id/workflow', '/api/v1/admin/moderation-rules'],
    relatedDashboards: ['Editorial Compliance Board', 'Dewan Pers Reporting Panel'],
    allowedRoles: ['reporter', 'editor', 'managing_editor', 'super_admin', 'developer'],
    status: 'active',
    version: 'v2.7.0',
    lastUpdated: '2026-07-02',
    ownerTeam: 'CMS & Security Operations',
    shortcut: 'Ctrl+Shift+A',
    analytics: { accessCount: 38900, favoritesCount: 310, activeUsers: 95 },
    documentation: {
      overview: 'News CMS adalah pondasi jurnalisme berintegritas tinggi. Setiap perubahan draf melahirkan versi dokumen baru (versioning) yang ter-hash secara deterministik dalam audit log tertutup demi pertanggungjawaban hukum.',
      bestPractices: [
        'Selalu jalankan cek analisis risiko kecemasan dan hukum sebelum mempublikasikan draf berkategori Politik.',
        'Sertakan rujukan narasumber minimal 2 dalam form metadata rahasia draf berita investigasi.',
        'Gunakan fitur revisi riwayat jika ingin mengembalikan perubahan kalimat ke versi suntingan sebelumnya.',
        'Pastikan pengaduan hak jawab warga diproses dalam kurun waktu maksimal 24 jam untuk menghindari somasi hukum.'
      ],
      developerNotes: 'Workflow dikelola sebagai state-machine tertutup di backend server.ts. Status transisi memicu audit log otomatis dengan enkripsi asimetris.',
      changelog: [
        { version: 'v2.7.0', date: '2026-07-02', changes: ['Integrasi pemeriksa plagiarisme instan terotomasi', 'Pembaruan interface audit log dengan filter pencari nama editor'] },
        { version: 'v2.5.0', date: '2026-06-29', changes: ['Penambahan modul integrasi Fact-Checking & Koreksi Dewan Pers', 'Pembatasan rilis otomatis draf berisiko Tinggi wajib persetujuan Managing Editor'] }
      ]
    },
    faq: [
      { q: 'Mengapa saya tidak bisa langsung mempublikasikan berita?', a: 'Sesuai UU Pers dan aturan Dewan Pers, wartawan/reporter hanya dapat mengirimkan draf ke status "Pending Review". Hanya Editor Senior atau Redaktur yang berhak memberikan tanda tangan publikasi.' },
      { q: 'Di mana log audit draf berita disimpan?', a: 'Seluruh log aktivitas draf disimpan di database terenkripsi dan dapat diekspor sebagai lampiran pembuktian hukum Dewan Pers.' },
      { q: 'Bagaimana cara menangani sengketa hak jawab?', a: 'Menu "Hak Jawab & Koreksi" memungkinkan editor menautkan ralat rujukan langsung di bagian atas artikel yang disengketakan secara otomatis.' }
    ]
  },
  {
    id: 'feat-ai-cluster-telemetry',
    name: 'AI Cluster Telemetry Control',
    slug: 'ai-cluster-telemetry',
    category: 'Intelligence',
    subcategory: 'Platform Diagnostics',
    module: 'AI Orchestration Telemetry',
    portal: 'Developer Portal',
    workspace: 'Development',
    route: 'ai-cluster-telemetry',
    icon: 'Cpu',
    color: 'amber',
    shortDesc: 'Panel telemetri klaster AI untuk pemantauan CPU agen, antrean tugas, dan pengelola chaos.',
    longDesc: 'Menyajikan visualisasi metrik orkestrasi model AI Agen di server. Menampilkan utilitas CPU core agen, kapasitas antrean pesan bersama (task queue), log jalannya aksi, kontrol pengubah parameter simulasi delay, tombol pemicu Chaos Mode, serta visualizer biaya Gemini token.',
    tooltip: 'Konsol telemetri orkestrasi AI Agen dan simulasi gangguan.',
    keywords: ['telemetri', 'ai cluster', 'chaos mode', 'gemini', 'token', 'cpu', 'monitoring', 'failover', 'llm'],
    tags: ['developer', 'intelligence', 'secure', 'ai-ops'],
    relatedWidgets: ['AI CPU Meter', 'Task Queue Graph', 'Chaos Injector Panel', 'Gemini Token Visualizer'],
    relatedApis: ['/api/v1/virtual/metrics', '/api/v1/ai/cluster-status', '/api/v1/ai/chaos-triggers'],
    relatedDashboards: ['AI Cluster Control Tower', 'LLM Performance Ledger'],
    allowedRoles: ['developer', 'super_admin'],
    status: 'active',
    version: 'v1.2.0',
    lastUpdated: '2026-07-02',
    ownerTeam: 'AI Platform Engineering',
    shortcut: 'Ctrl+Shift+M',
    analytics: { accessCount: 7120, favoritesCount: 190, activeUsers: 25 },
    documentation: {
      overview: 'Alat pemantau kestabilan runtime koordinator AI Agen dalam mengonsumsi token API, memantau utilisasi thread-pool, dan memproses aksi paralel di latar belakang tanpa overhead.',
      bestPractices: [
        'Aktifkan Chaos Mode sesaat untuk mengevaluasi kemampuan sistem melakukan failover ke model Gemini Flash cadangan.',
        'Pantau grafik biaya token kumulatif guna menyetel limit budget mingguan.',
        'Setel slider "Artificial Latency" ke 3000ms untuk mensimulasikan kegagalan batas waktu (timeout) client-side.',
        'Gunakan "Clear Task Queue" jika antrean pesan orkestrasi macet akibat malformed payload.'
      ],
      developerNotes: 'Komponen merender representasi visual AIAnalyticsDashboard.tsx secara native dengan integrasi callback state-machine yang efisien.',
      changelog: [
        { version: 'v1.2.0', date: '2026-07-02', changes: ['Pembaruan widget visualisator prompt token vs response token', 'Integrasi failover manual model Gemini Ultra/Flash'] },
        { version: 'v1.0.1', date: '2026-06-28', changes: ['Inisiasi metrik pelacakan token Gemini 2.5', 'Penyempurnaan visualisasi thread pool'] }
      ]
    },
    faq: [
      { q: 'Apakah Chaos Mode mematikan server sungguhan?', a: 'Tidak, Chaos Mode hanya menyuntikkan keterlambatan respons (latency) buatan dan kesalahan API acak ke thread visual simulasi di UI.' },
      { q: 'Mengapa biaya token melonjak tinggi?', a: 'Biaya token dipengaruhi oleh besaran context-window draf artikel panjang. Batasi penggunaan ringkasan AI untuk draf di atas 10.000 kata.' },
      { q: 'Apakah platform mendukung local-LLM fallback?', a: 'Ya, sistem dikonfigurasi untuk beralih ke model lokal siber-daerah jika jaringan internet bursa data terputus total.' }
    ]
  },
  {
    id: 'feat-partner-os',
    name: 'PartnerOS (Revenue Partner Platform)',
    slug: 'revenue-os',
    category: 'Partners',
    subcategory: 'Corporate Finance',
    module: 'Partner Ecosystem OS',
    portal: 'Partner Portal',
    workspace: 'Revenue Operations',
    route: 'sales',
    icon: 'Users',
    color: 'emerald',
    shortDesc: 'Portal resmi kemitraan berbayar kinerja (performance-based) untuk agensi, freelancer, dan korporat.',
    longDesc: 'Sistem kemitraan terlengkap INFOBOS. Menyediakan sarana peninjauan target, pengunduhan draf materi promosi resmi, sertifikasi kepatuhan dewan pers, klaim komisi hasil penjualan link referral, serta log rujukan klien korporat.',
    tooltip: 'Portal mitra resmi, link rujukan komisi, dan sertifikasi.',
    keywords: ['mitra', 'referral', 'komisi', 'partner', 'afiliasi', 'agencies', 'freelancer', 'payout', 'sales'],
    tags: ['revenue', 'partners', 'secure', 'ecosystem'],
    relatedWidgets: ['Referral Tracker Ring', 'Marketing Kit Download Button', 'Certification Course Stepper', 'Commission Ledger View'],
    relatedApis: ['/api/v1/virtual/metrics', '/api/v1/partners/referrals', '/api/v1/partners/payout-claim'],
    relatedDashboards: ['Partner Performance Board', 'Affiliate Accounting Console'],
    allowedRoles: ['sales', 'super_admin', 'developer', 'finance', 'member'],
    status: 'active',
    version: 'v1.5.0',
    lastUpdated: '2026-07-02',
    ownerTeam: 'Ecosystem & Alliances Desk',
    shortcut: 'Ctrl+Shift+N',
    analytics: { accessCount: 58400, favoritesCount: 3950, activeUsers: 810 },
    documentation: {
      overview: 'PartnerOS memberdayakan ekosistem eksternal untuk memasarkan layanan premium INFOBOS dengan margin keuntungan transparan, pembayaran komisi instan, serta lisensi penyiaran yang sah.',
      bestPractices: [
        'Bagikan tautan afiliasi yang terenkripsi di media sosial Anda untuk melacak klik secara unik.',
        'Selesaikan sertifikasi kode etik pers sebelum mempromosikan kategori kemitraan investigasi.',
        'Unduh file "Marketing Kit PDF" terbaru setiap awal bulan untuk menyelaraskan aset promosi Anda.',
        'Lakukan klaim payout saat saldo komisi terkumpul di atas ambang batas Rp 500.000.'
      ],
      developerNotes: 'Metrik pelacakan referral disinkronkan secara deterministic menggunakan cookies terenkripsi di browser pengunjung dengan masa aktif cookie 30 hari.',
      changelog: [
        { version: 'v1.5.0', date: '2026-07-02', changes: ['Penambahan tracker komisi real-time di UI partner', 'Perbaikan integrasi download materi kit format SVG resolusi tinggi'] },
        { version: 'v1.3.0', date: '2026-06-27', changes: ['Rilis total sertifikasi kepatuhan jurnalisme bagi mitra', 'Penambahan widget pencairan dana instan (cashout)'] }
      ]
    },
    faq: [
      { q: 'Apakah ada biaya pendaftaran mitra?', a: 'Sama sekali tidak ada biaya. INFOBOS PartnerOS murni menggunakan sistem bagi hasil berbasis kinerja (performance-based).' },
      { q: 'Kapan komisi kemitraan dicairkan?', a: 'Pencairan dana komisi yang diajukan sebelum tanggal 20 akan ditransfer serentak pada tanggal 25 setiap bulannya.' },
      { q: 'Apakah agensi periklanan bisa mendapatkan diskon harga massal?', a: 'Ya, agensi terverifikasi (tier Gold ke atas) otomatis berhak mendapatkan diskon langsung 15% di portal pembelian slot AdOS.' }
    ]
  },
  {
    id: 'feat-system-explorer',
    name: 'System Explorer & Diagnostics Console',
    slug: 'system-explorer',
    category: 'System',
    subcategory: 'Platform Diagnostics',
    module: 'System Registry Console',
    portal: 'Developer Portal',
    workspace: 'Development',
    route: 'system-explorer',
    icon: 'Activity',
    color: 'sky',
    shortDesc: 'Pusat audit modular, visualisasi registrasi direktori otomatis, dan log kesehatan tautan.',
    longDesc: 'Menyediakan dasbor peninjauan sistem berintegritas tinggi. Menampilkan total rincian berkas, detektor ketidaksesuaian tautan navigasi, modul registrasi otomatis berkas baru (auto-discovery), daftar log audit 10 langkah Dewan Pers, dan visualisasi arsitektur.',
    tooltip: 'Eksplorasi total direktori kode, berkas, status menu, dan audit system.',
    keywords: ['system explorer', 'audit log', 'auto-discovery', 'diagnostics', 'registry', 'routes', 'files', 'discovery', 'integrity'],
    tags: ['developer', 'system', 'audit', 'diagnostics'],
    relatedWidgets: ['Directory Scanner View', 'Audit Checklist Stepper', 'Telemetry Console Frame', 'Architecture Tree Graph'],
    relatedApis: ['/api/v1/virtual/metrics', '/api/v1/system/file-tree', '/api/v1/system/link-integrity'],
    relatedDashboards: ['System Diagnostics Dashboard', 'File Integrity Analyzer Panel'],
    allowedRoles: ['developer', 'super_admin'],
    status: 'active',
    version: 'v1.1.5',
    lastUpdated: '2026-07-02',
    ownerTeam: 'SRE & Cloud Infrastructure',
    shortcut: 'Ctrl+Shift+S',
    analytics: { accessCount: 3540, favoritesCount: 90, activeUsers: 12 },
    documentation: {
      overview: 'Konsol mutakhir bagi tim developer untuk mengonfirmasi bahwa tidak ada fitur, draf halaman, draf widget, atau endpoint API yang tersembunyi dari pembaca serta menjaga integritas routing.',
      bestPractices: [
        'Jalankan tes validasi integritas tautan sebelum merilis draf portal baru ke publik.',
        'Periksa riwayat pemicu autodiscovery untuk melacak kemunculan berkas baru.',
        'Verifikasi kepatuhan checklist Dewan Pers di dashboard sebelum mengajukan evaluasi eksternal.',
        'Gunakan visualizer dependensi untuk merapikan kode mati (dead code) yang tidak terpakai.'
      ],
      developerNotes: 'Sistem memindai modul direktori src/ secara dinamis di runtime menggunakan manifest meta-data yang komprehensif tanpa overhead parsing file fisik.',
      changelog: [
        { version: 'v1.1.5', date: '2026-07-02', changes: ['Penambahan visualisasi sitemap interaktif', 'Pembaruan daftar kepatuhan Dewan Pers edisi 2026'] },
        { version: 'v1.0.0', date: '2026-07-02', changes: ['Inisiasi System Explorer & Diagnostics Console terpadu', 'Sistem auto-discovery runtime'] }
      ]
    },
    faq: [
      { q: 'Apa itu auto-discovery?', a: 'Sistem yang otomatis memetakan relasi antar berkas komponen fisik, izin masuk, serta endpoint API ke dalam visual pohon direktori interaktif.' },
      { q: 'Mengapa total berkas di system explorer berbeda dengan direktori fisik?', a: 'System explorer hanya menyertakan berkas berkode sumber (.tsx, .ts) yang terdaftar di pipeline rendering utama, mengabaikan berkas konfigurasi internal.' },
      { q: 'Apakah checklist Dewan Pers ini bersifat final?', a: 'Checklist disusun berdasarkan 10 butir Pedoman Pemberitaan Media Siber resmi Dewan Pers Republik Indonesia.' }
    ]
  }
];

export interface SystemAuditReport {
  totalPages: number;
  totalModules: number;
  totalRoutes: number;
  totalApis: number;
  totalWidgets: number;
  totalDashboards: number;
  totalComponents: number;
  totalFeatures: number;
  hiddenFeaturesExposed: number;
  unusedComponents: string[];
  orphanRoutes: string[];
  duplicateComponents: string[];
  brokenLinks: number;
  missingMenusResolved: number;
  missingSidebarsResolved: number;
  missingPermissionsResolved: number;
  deadPages: number;
}

export const SYSTEM_AUDIT_REPORT: SystemAuditReport = {
  totalPages: 22,
  totalModules: 12,
  totalRoutes: 22,
  totalApis: 15,
  totalWidgets: 14,
  totalDashboards: 6,
  totalComponents: 32,
  totalFeatures: 22,
  hiddenFeaturesExposed: 8,
  unusedComponents: [
    'AIAnalyticsDashboard (Sekarang terkespose di UI telemetri)',
    'ShortVideoHub (Terkoneksi ke menu)',
    'DocumentCenter (Terkoneksi ke menu)',
    'GalleryCenter (Terkoneksi ke menu)',
    'EventCenter (Terkoneksi ke menu)',
    'ChannelCenter (Terkoneksi ke menu)',
    'InteractiveData (Terkoneksi ke menu)',
    'AdOSPortal (Terkoneksi ke menu)'
  ],
  orphanRoutes: [
    'short-video-hub (Terselesaikan - dipetakan ke menu)',
    'document-center (Terselesaikan - dipetakan ke menu)',
    'gallery-center (Terselesaikan - dipetakan ke menu)',
    'interactive-data (Terselesaikan - dipetakan ke menu)',
    'event-center (Terselesaikan - dipetakan ke menu)',
    'channel-center (Terselesaikan - dipetakan ke menu)',
    'ados (Terselesaikan - dipetakan ke menu)',
    'seo-hub (Terselesaikan - dipetakan ke menu)'
  ],
  duplicateComponents: [],
  brokenLinks: 0,
  missingMenusResolved: 8,
  missingSidebarsResolved: 1, // Sidebar dinamis diimplementasikan penuh
  missingPermissionsResolved: 8,
  deadPages: 0
};

// Preprocessed, flat searchable map of feature items by ID for O(1) direct access
export const FEATURE_MAP_BY_ID: Record<string, FeatureItem> = FEATURE_REGISTRY.reduce((acc, feat) => {
  acc[feat.id] = feat;
  return acc;
}, {} as Record<string, FeatureItem>);

// Flat searchable map by Route/Slug
export const FEATURE_MAP_BY_ROUTE: Record<string, FeatureItem> = FEATURE_REGISTRY.reduce((acc, feat) => {
  acc[feat.route] = feat;
  return acc;
}, {} as Record<string, FeatureItem>);

// Optimized helper that pre-processes sitemap groups into a cache-friendly structure
// This enables O(N) single-pass rendering in sitemap/footer views rather than quadratic or repeated filtering
export interface SitemapPortalGroup {
  title: string;
  features: FeatureItem[];
  color: string;
}

export function getProcessedSitemapGroups(
  currentRole: string,
  allowedPortals: string[],
  portalColorMap: Record<string, string>,
  getPortalIdFn: (portalName: string) => string
): SitemapPortalGroup[] {
  const groupsMap: Record<string, FeatureItem[]> = {};
  
  for (let i = 0; i < FEATURE_REGISTRY.length; i++) {
    const feat = FEATURE_REGISTRY[i];
    
    // 1. Role-based Access Control
    if (!feat.allowedRoles || !feat.allowedRoles.includes(currentRole)) {
      continue;
    }
    
    // 2. Portal-based Access Control
    const featPortalId = getPortalIdFn(feat.portal);
    if (!allowedPortals.includes(featPortalId)) {
      continue;
    }
    
    // Group in a single pass
    const portalName = feat.portal || 'Public Portal';
    if (!groupsMap[portalName]) {
      groupsMap[portalName] = [];
    }
    groupsMap[portalName].push(feat);
  }
  
  const keys = Object.keys(groupsMap);
  const result: SitemapPortalGroup[] = new Array(keys.length);
  for (let i = 0; i < keys.length; i++) {
    const portalName = keys[i];
    const portalId = getPortalIdFn(portalName);
    result[i] = {
      title: portalName,
      features: groupsMap[portalName],
      color: portalColorMap[portalId] || 'text-slate-200'
    };
  }
  
  return result;
}
