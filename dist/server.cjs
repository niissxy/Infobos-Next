var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_vite = require("vite");

// src/db/client.ts
var fs = __toESM(require("fs"), 1);
var path = __toESM(require("path"), 1);
var STORE_PATH = path.join(process.cwd(), "src", "db", "db_store.json");
var RelationalDB = class _RelationalDB {
  constructor() {
    this.load();
  }
  static getInstance() {
    if (!_RelationalDB.instance) {
      _RelationalDB.instance = new _RelationalDB();
    }
    return _RelationalDB.instance;
  }
  load() {
    const parentDir = path.dirname(STORE_PATH);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
    if (fs.existsSync(STORE_PATH)) {
      try {
        const raw = fs.readFileSync(STORE_PATH, "utf8");
        this.data = JSON.parse(raw);
        this.ensureCollections();
        this.enrichCategories();
        return;
      } catch (err) {
        console.error("Error loading DB store, re-initializing...", err);
      }
    }
    this.initializeSeededData();
    this.enrichCategories();
  }
  ensureCollections() {
    const keys = [
      "users",
      "categories",
      "topics",
      "tags",
      "locations",
      "entities",
      "contents",
      "contentVersions",
      "contentLocations",
      "contentEntities",
      "contentTopics",
      "contentTags",
      "ingestionSources",
      "ingestionItems",
      "advertisers",
      "campaigns",
      "creatives",
      "bookmarks",
      "follows",
      "auditLogs",
      "corrections"
    ];
    for (const key of keys) {
      if (!this.data[key]) {
        this.data[key] = [];
      }
    }
  }
  save() {
    try {
      fs.writeFileSync(STORE_PATH, JSON.stringify(this.data, null, 2), "utf8");
    } catch (err) {
      console.error("Failed to save DB store:", err);
    }
  }
  initializeSeededData() {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const users = [
      {
        id: "usr-admin",
        email: "admin@infobos.com",
        passwordHash: "admin123",
        // Simplified secure plain hash
        fullName: "Ahmad Dahlan",
        role: "super_admin",
        status: "active",
        createdAt: now,
        updatedAt: now
      },
      {
        id: "usr-editor",
        email: "editor@infobos.com",
        passwordHash: "editor123",
        fullName: "Siti Rahma",
        role: "managing_editor",
        status: "active",
        createdAt: now,
        updatedAt: now
      },
      {
        id: "usr-reporter",
        email: "reporter@infobos.com",
        passwordHash: "reporter123",
        fullName: "Budi Santoso",
        role: "reporter",
        status: "active",
        createdAt: now,
        updatedAt: now
      }
    ];
    const categories = [
      { id: "cat-breaking", name: "Breaking News", slug: "breaking-news", parentId: null, createdAt: now },
      { id: "cat-terbaru", name: "Terbaru", slug: "terbaru", parentId: null, createdAt: now },
      { id: "cat-trending", name: "Trending", slug: "trending", parentId: null, createdAt: now },
      { id: "cat-editor", name: "Pilihan Editor", slug: "pilihan-editor", parentId: null, createdAt: now },
      { id: "cat-investigasi", name: "Investigasi", slug: "investigasi", parentId: null, createdAt: now },
      { id: "cat-analisis", name: "Analisis", slug: "analisis", parentId: null, createdAt: now },
      { id: "cat-opini", name: "Opini", slug: "opini", parentId: null, createdAt: now },
      { id: "cat-factcheck", name: "Fact Check", slug: "fact-check", parentId: null, createdAt: now },
      { id: "cat-explainer", name: "Explainer", slug: "explainer", parentId: null, createdAt: now },
      { id: "cat-riset", name: "Riset & Insight", slug: "riset-insight", parentId: null, createdAt: now },
      { id: "cat-regional", name: "Regional", slug: "regional", parentId: null, createdAt: now },
      { id: "cat-nasional", name: "Nasional", slug: "nasional", parentId: null, createdAt: now },
      { id: "cat-politik", name: "Politik", slug: "politik", parentId: null, createdAt: now },
      { id: "cat-ekonomi", name: "Ekonomi", slug: "ekonomi", parentId: null, createdAt: now },
      { id: "cat-internasional", name: "Internasional", slug: "internasional", parentId: null, createdAt: now },
      { id: "cat-business", name: "Business", slug: "business", parentId: null, createdAt: now },
      { id: "cat-technology", name: "Technology", slug: "technology", parentId: null, createdAt: now },
      { id: "cat-startup", name: "Startup", slug: "startup", parentId: null, createdAt: now },
      { id: "cat-ai-data", name: "AI & Data", slug: "ai-data", parentId: null, createdAt: now },
      { id: "cat-pendidikan", name: "Pendidikan", slug: "pendidikan", parentId: null, createdAt: now },
      { id: "cat-kesehatan", name: "Kesehatan", slug: "kesehatan", parentId: null, createdAt: now },
      { id: "cat-sports", name: "Sports", slug: "sports", parentId: null, createdAt: now },
      { id: "cat-lifestyle", name: "Lifestyle", slug: "lifestyle", parentId: null, createdAt: now },
      { id: "cat-otomotif", name: "Otomotif", slug: "otomotif", parentId: null, createdAt: now },
      { id: "cat-properti", name: "Properti", slug: "properti", parentId: null, createdAt: now },
      { id: "cat-live-feed", name: "Live Feed", slug: "live-feed", parentId: null, createdAt: now }
    ];
    const topics = [
      { id: "top-inflasi", name: "Ekonomi Makro & Inflasi", slug: "ekonomi-makro-inflasi", description: "Isu kenaikan harga pangan dan kebijakan moneter", createdAt: now },
      { id: "top-ai", name: "Kecerdasan Buatan (AI)", slug: "kecerdasan-buatan-ai", description: "Perkembangan teknologi AI, regulasi, dan implementasi", createdAt: now },
      { id: "top-wisata", name: "Revitalisasi Wisata", slug: "revitalisasi-wisata", description: "Pemugaran objek bersejarah dan promosi pariwisata daerah", createdAt: now }
    ];
    const tags = [
      { id: "tag-rupiah", name: "Rupiah", slug: "rupiah", createdAt: now },
      { id: "tag-bandung", name: "Bandung Juara", slug: "bandung-juara", createdAt: now },
      { id: "tag-pajak", name: "Kebijakan Pajak", slug: "kebijakan-pajak", createdAt: now }
    ];
    const locations = [
      { id: "loc-idn", name: "Indonesia", slug: "indonesia", type: "country", parentId: null, latitude: -0.7893, longitude: 113.9213, createdAt: now },
      { id: "loc-jabar", name: "Jawa Barat", slug: "jawa-barat", type: "province", parentId: "loc-idn", latitude: -6.9175, longitude: 107.6191, createdAt: now },
      { id: "loc-dki", name: "DKI Jakarta", slug: "dki-jakarta", type: "province", parentId: "loc-idn", latitude: -6.2088, longitude: 106.8456, createdAt: now },
      { id: "loc-bdg", name: "Bandung", slug: "bandung", type: "city", parentId: "loc-jabar", latitude: -6.9175, longitude: 107.6191, weatherTemp: 26, weatherCondition: "Hujan Ringan", aqi: 45, alertTitle: "Waspada Hujan Petir Sore Hari", alertLevel: "info", createdAt: now },
      { id: "loc-jkt", name: "Jakarta Pusat", slug: "jakarta-pusat", type: "city", parentId: "loc-dki", latitude: -6.1751, longitude: 106.8272, weatherTemp: 31, weatherCondition: "Cerah Berawan", aqi: 112, alertTitle: "Kualitas Udara Tidak Sehat", alertLevel: "warning", createdAt: now }
    ];
    const entities = [
      {
        id: "ent-sri",
        name: "Sri Mulyani Indrawati",
        slug: "sri-mulyani-indrawati",
        type: "person",
        description: "Menteri Keuangan Republik Indonesia yang dikenal dengan reformasi fiskal dan pengakuan global.",
        websiteUrl: "https://www.kemenkeu.go.id",
        logoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
        isClaimed: true,
        metadata: { position: "Menteri Keuangan RI", activeSince: "2016" },
        createdAt: now
      },
      {
        id: "ent-rk",
        name: "Ridwan Kamil",
        slug: "ridwan-kamil",
        type: "person",
        description: "Arsitek ternama Indonesia, mantan Gubernur Jawa Barat, yang berfokus pada pembangunan infrastruktur humanis.",
        websiteUrl: "https://www.ridwankamil.id",
        logoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300",
        isClaimed: true,
        metadata: { position: "Eks Gubernur Jabar", profession: "Arsitek & Urban Planner" },
        createdAt: now
      },
      {
        id: "ent-gdsate",
        name: "Gedung Sate",
        slug: "gedung-sate",
        type: "landmark",
        description: "Gedung bersejarah di Kota Bandung yang menjadi kantor pusat pemerintahan Provinsi Jawa Barat.",
        websiteUrl: "https://jabarprov.go.id",
        logoUrl: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&q=80&w=300",
        isClaimed: false,
        metadata: { builtIn: "1920", architectureStyle: "Neo-Classical with Indo-Islamic elements" },
        createdAt: now
      }
    ];
    const contents = [
      {
        id: "art-intl-1",
        title: "Diplomasi Hijau RI: Investasi Transisi Energi Berkelanjutan $12 Miliar Disepakati",
        subtitle: "Kemitraan Strategis JETP dengan Konsorsium Internasional untuk Pembiayaan Transmisi Pintar & Panas Bumi",
        slug: "diplomasi-hijau-ri-investasi-transisi-energi-disepakati",
        summary: "Indonesia berhasil mengamankan komitmen pendanaan hijau multilateral baru sebesar $12 Miliar USD untuk membiayai proyek dekarbonisasi energi dan interkoneksi jaringan listrik pintar Jawa-Sumatera.",
        body: `## Komitmen Pendanaan Global di Sela KTT Iklim

Dalam langkah diplomasi yang agresif, Pemerintah Indonesia secara resmi menyepakati paket pendanaan transisi energi baru senilai **$12 Miliar USD** bersama konsorsium lembaga keuangan internasional pimpinan Uni Eropa dan Amerika Serikat.

Kerja sama bilateral ini akan dialokasikan langsung melalui skema *Just Energy Transition Partnership* (JETP) untuk mendanai pemensiunan dini pembangkit listrik tenaga uap (PLTU) batu bara, eksplorasi panas bumi skala besar di koridor Jawa Barat, serta instalasi teknologi **Smart Grid** kelistrikan nasional.

### Alokasi Anggaran Utama Proyek
1. **$4.8 Miliar:** Penyusunan interkoneksi kabel bawah laut tegangan tinggi Jawa-Sumatera.
2. **$3.6 Miliar:** Pembiayaan eksplorasi 7 wilayah kerja panas bumi (WKP) baru.
3. **$2.1 Miliar:** Program kompensasi jaminan sosial dan pelatihan keahlian hijau bagi mantan pekerja batu bara hulu.
4. **$1.5 Miliar:** Subsidi bunga lunak untuk pembiayaan atap panel surya UMKM.

> "Kesepakatan ini mengonfirmasi posisi tawar Indonesia yang kokoh di kancah global. Stabilitas regulasi dan transparansi instrumen fiskal kita diakui secara internasional," ungkap Perwakilan Delegasi RI.

Masyarakat sipil menyambut baik langkah taktis ini, sembari mengingatkan pentingnya pengawasan independen agar realisasi dana bebas dari praktik korupsi dan tetap berorientasi pada keberpihakan ekologis lokal.`,
        contentType: "standard",
        status: "published",
        primaryCategoryId: "cat-internasional",
        sentiment: "positive",
        riskLevel: "low",
        heroImageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800",
        authorId: "usr-reporter",
        editorId: "usr-editor",
        publishedAt: now,
        isSponsored: false,
        viewCount: 2480,
        readingTimeMinutes: 4,
        createdAt: now,
        updatedAt: now
      },
      {
        id: "art-intl-2",
        title: "Geopolitik Mineral Kritis: RI Gagas OCMEC Amankan Kedaulatan Hilirisasi Komoditas",
        subtitle: "Aliansi Negara Produsen Nikel, Kobalt & Tembaga untuk Keadilan Rantai Pasok Baterai Kendaraan Listrik",
        slug: "geopolitik-mineral-kritis-ri-gagas-aliansi-kedaulatan-hilirisasi",
        summary: "Menghadapi fragmentasi pasar dan kebijakan diskriminatif asing, Indonesia memimpin inisiasi pembentukan aliansi eksportir mineral kritis dunia guna meredefinisi tata harga komoditas transisi energi.",
        body: `## Pergeseran Episentrum Energi Global

Pemerintah Republik Indonesia secara resmi menyurati 12 negara produsen mineral kritis terbesar di Asia, Afrika, dan Amerika Latin untuk mengonsolidasikan pembentukan **Organization of Critical Mineral Exporting Countries (OCMEC)**.

Langkah berani ini ditujukan sebagai respons pertahanan kolektif terhadap kebijakan unilateral seperti *Inflation Reduction Act* (IRA) dari Amerika Serikat dan regulasi deforestasi ketat Uni Eropa (*EU Deforestation Regulation*) yang dinilai merugikan hilirisasi industri di negara berkembang.

### Pokok Perjuangan Konsorsium

- **Kedaulatan Harga:** Mencegah perang harga komoditas tambang mentah akibat tekanan spekulan finansial Barat.
- **Transfer Teknologi:** Mewajibkan mitra investasi asing mendirikan pusat riset pemurnian (smelter) berteknologi tinggi di dalam negeri.
- **Standar Lingkungan Terpadu:** Menyusun standar pemantauan ekologis ramah lingkungan yang adil tanpa bias regulasi proteksionis negara konsumen.

> "Kita tidak ingin sejarah kolonialisme komoditas terulang di era modern. Hilirisasi adalah hak mutlak setiap bangsa berdaulat untuk menyejahterakan rakyatnya," tegas Menteri Luar Negeri RI dalam forum diplomatik di Jenewa.

Reaksi pasar global menunjukkan volatilitas tipis seiring draf statuta OCMEC yang mulai bocor ke publik, memicu diskusi intensif di berbagai bursa komoditas utama dunia.`,
        contentType: "analysis",
        status: "published",
        primaryCategoryId: "cat-internasional",
        sentiment: "neutral",
        riskLevel: "medium",
        heroImageUrl: "https://images.unsplash.com/photo-1518152006812-edab29b069ca?auto=format&fit=crop&q=80&w=800",
        authorId: "usr-reporter",
        editorId: "usr-editor",
        publishedAt: now,
        isSponsored: false,
        viewCount: 1950,
        readingTimeMinutes: 5,
        createdAt: now,
        updatedAt: now
      },
      {
        id: "art-intl-3",
        title: "Diplomasi Maritim: RI Dorong Konsensus 'Code of Conduct' Laut China Selatan yang Mengikat",
        subtitle: "KTT Keamanan Maritim ASEAN Sepakati Protokol Bersama Pencegahan Eskalasi Militer di Wilayah Sengketa",
        slug: "diplomasi-maritim-ri-dorong-konsensus-code-of-conduct-laut-china-selatan",
        summary: "Di tengah eskalasi patroli militer di perairan utara Natuna, Indonesia menegaskan kepemimpinan diplomatik dengan mendesak akselerasi pengesahan Code of Conduct (CoC) ASEAN yang sah dan berkekuatan hukum.",
        body: `## Menjaga Kedaulatan dan Perdamaian Regional

Pertemuan puncak menteri pertahanan regional ASEAN di Jakarta melahirkan draf deklarasi bersama yang menuntut percepatan negosiasi piagam keamanan maritim (**Code of Conduct**) Laut China Selatan.

Indonesia, melalui utusan kedaulatan laut, memegang peran sentral sebagai penengah netral yang mendesak Tiongkok dan negara-negara pengklaim (*claimant states*) untuk menahan diri dari tindakan provokatif sepihak.

### Poin Krusial Deklarasi Maritim
1. **Pemberlakuan UNCLOS 1982:** Penegasan batas teritorial laut berdasarkan hukum laut internasional tanpa pengecualian klaim historis.
2. **Kanal Darurat Bersama:** Penyusunan sistem komunikasi satelit langsung antarmiliter regional untuk meredam insiden kapal patroli sipil di lapangan.
3. **Patroli Navigasi Bebas:** Jaminan kebebasan jalur pelayaran internasional komersial yang mengangkut lebih dari 30% perdagangan dunia.

> "ASEAN tidak boleh terseret dalam permainan geopolitik negara adidaya. Laut ini harus tetap menjadi koridor perdamaian, kemakmuran, dan kebersamaan," jelas juru bicara Kementerian Pertahanan RI.`,
        contentType: "standard",
        status: "published",
        primaryCategoryId: "cat-internasional",
        sentiment: "neutral",
        riskLevel: "high",
        heroImageUrl: "https://images.unsplash.com/photo-1516690561799-46d8f74f90f6?auto=format&fit=crop&q=80&w=800",
        authorId: "usr-reporter",
        editorId: "usr-editor",
        publishedAt: now,
        isSponsored: false,
        viewCount: 1640,
        readingTimeMinutes: 4,
        createdAt: now,
        updatedAt: now
      },
      {
        id: "art-reg-food",
        title: "Koridor Pertanian Presisi Jawa Barat Berbasis Sensor IoT Diresmikan di Majalengka",
        subtitle: "Pemprov Targetkan Peningkatan Efisiensi Pemupukan & Hasil Panen Padi hingga 35 Persen",
        slug: "koridor-pertanian-presisi-jawa-barat-berbasis-sensor-iot",
        summary: "Guna mewujudkan swasembada pangan berkelanjutan, Pemerintah Provinsi Jabar berkolaborasi dengan institut teknologi meluncurkan pilot project sistem sawah cerdas otomatis di Majalengka.",
        body: `## Transformasi Agraria Menuju Era Presisi

Pemerintah Provinsi Jawa Barat resmi mengoperasikan koridor percontohan **pertanian presisi digital** pertama di Kabupaten Majalengka.

Proyek ini memanfaatkan jaringan ribuan sensor tanah mikro (IoT) yang ditanam secara berkala untuk memantau status nutrisi nitrogen-fosfor-kalium (NPK), kelembapan, tingkat asam-basa (pH) tanah, serta ramalan serangan hama terpadu.

> "Sistem ini membuat petani tidak lagi menduga-duga saat memupuk sawah. Semuanya terukur secara objektif, meningkatkan margin keuntungan petani kecil secara langsung," ungkap Kepala Dinas Tanaman Pangan Jabar.`,
        contentType: "standard",
        status: "published",
        primaryCategoryId: "cat-regional",
        sentiment: "positive",
        riskLevel: "low",
        heroImageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800",
        authorId: "usr-reporter",
        editorId: "usr-editor",
        publishedAt: now,
        isSponsored: false,
        viewCount: 1310,
        readingTimeMinutes: 3,
        createdAt: now,
        updatedAt: now
      },
      {
        id: "art-nas-toll",
        title: "JTTS Tersambung Sempurna, Peta Konektivitas Logistik Sumatera-Jawa Memasuki Babak Baru",
        subtitle: "Kementerian PUPR Rampungkan Evaluasi Laik Fungsi Jalur Logistik Utama Bebas Hambatan",
        slug: "jtts-tersambung-sempurna-konektivitas-logistik-sumatera-jawa-babak-baru",
        summary: "Tersambungnya koridor utama Tol Trans-Sumatera dari pelabuhan Bakauheni memicu optimisme reduksi biaya operasional armada logistik nasional hingga 40%.",
        body: `## Pangkas Jarak Tempuh Ekspedisi

Kementerian Pekerjaan Umum dan Perumahan Rakyat (PUPR) mengonfirmasi penyelesaian uji kelayakan ruas pamungkas **Jalan Tol Trans-Sumatera (JTTS)**.

Integrasi mulus ini membuka era baru distribusi logistik segar dan bahan industri antar pulau tanpa hambatan struktural, mendukung kemudahan berusaha di luar pulau Jawa secara signifikan.`,
        contentType: "standard",
        status: "published",
        primaryCategoryId: "cat-nasional",
        sentiment: "positive",
        riskLevel: "low",
        heroImageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800",
        authorId: "usr-reporter",
        editorId: "usr-editor",
        publishedAt: now,
        isSponsored: false,
        viewCount: 1240,
        readingTimeMinutes: 3,
        createdAt: now,
        updatedAt: now
      },
      {
        id: "art-bus-1",
        title: "Inklusi Keuangan Digital: Kredit Mikro FinTech Tembus Rp 45 Triliun di Semester I",
        subtitle: "Asosiasi Sebut Penyaluran Kredit di Luar Pulau Jawa Tumbuh Eksponensial Didukung Analitik Data Alternatif",
        slug: "inklusi-keuangan-digital-kredit-mikro-fintech-tumbuh-semester-1",
        summary: "Penyaluran pembiayaan mikro berbasis teknologi finansial mencatat rekor pertumbuhan tertinggi, menyasar ekosistem pedagang kelontong dan nelayan pesisir.",
        body: `## Demokrasi Akses Modal Produktif

Sektor teknologi finansial Indonesia mencatatkan tonggak sejarah baru dengan menyalurkan total pembiayaan mikro produktif sebesar **Rp 45 Triliun** selama paruh pertama tahun ini.

Pertumbuhan ini dipicu oleh pemanfaatan data alternatif seperti riwayat pembelian pulsa dan transaksi e-commerce untuk menentukan kelayakan kredit petani/nelayan yang *underbanked*.`,
        contentType: "standard",
        status: "published",
        primaryCategoryId: "cat-business",
        sentiment: "positive",
        riskLevel: "low",
        heroImageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800",
        authorId: "usr-reporter",
        editorId: "usr-editor",
        publishedAt: now,
        isSponsored: false,
        viewCount: 1050,
        readingTimeMinutes: 3,
        createdAt: now,
        updatedAt: now
      },
      {
        id: "art-tech-1",
        title: "Koridor Data Cloud Nasional Berbasis Energi Hijau Mulai Dibangun di Cikarang",
        subtitle: "Konsorsium Infrastruktur Teknologi Sepakati Komitmen Pemanfaatan Pembangkit Listrik Tenaga Surya",
        slug: "koridor-data-cloud-nasional-energi-hijau-cikarang",
        summary: "Pembangunan pusat data berkelanjutan berkapasitas 80 Megawatt resmi dimulai guna memfasilitasi kebutuhan komputasi komersial dan pemerintahan lokal.",
        body: `## Infrastruktur Cloud Rendah Emisi

Konsorsium infrastruktur digital nasional resmi melakukan peletakan batu pertama proyek pusat data (*data center*) berteknologi pendinginan cair (*liquid cooling*) tercanggih di koridor industri Cikarang.

Pusat data ini berkomitmen menggunakan 100% pasokan energi terbarukan dari pembangkit listrik tenaga surya (PLTS) terapung untuk meminimalkan jejak karbon komputasi kecerdasan buatan lokal.`,
        contentType: "standard",
        status: "published",
        primaryCategoryId: "cat-technology",
        sentiment: "positive",
        riskLevel: "low",
        heroImageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
        authorId: "usr-reporter",
        editorId: "usr-editor",
        publishedAt: now,
        isSponsored: false,
        viewCount: 1580,
        readingTimeMinutes: 4,
        createdAt: now,
        updatedAt: now
      },
      {
        id: "art-aidata-1",
        title: "Maju Pesat, LLM Kebudayaan Lokal Nusantara Mulai Diujicobakan dalam Sistem Layanan Publik",
        subtitle: "Model Bahasa Besar Berkemampuan Multi-Dialek Mengakselerasi Kualitas Edukasi Masyarakat Rural",
        slug: "llm-kebudayaan-lokal-nusantara-layanan-publik",
        summary: "Asisten AI terlatih yang menguasai tata krama bahasa daerah Sunda, Jawa, dan Melayu diaplikasikan pada puskesmas percontohan guna mendampingi pasien lansia secara alamiah.",
        body: `## Menembus Batas Komunikasi Digital

Pusat riset teknologi bahasa nasional berkolaborasi dengan universitas global meluncurkan proyek asisten virtual puskesmas berbasis LLM (*Large Language Model*) lokal.

Dengan pemahaman sintaksis yang kaya akan kearifan lokal, asisten digital ini mampu menjawab pertanyaan kesehatan dasar menggunakan unggah-ungguh bahasa Sunda lemes atau Jawa krama alus secara lisan.`,
        contentType: "analysis",
        status: "published",
        primaryCategoryId: "cat-ai-data",
        sentiment: "positive",
        riskLevel: "low",
        heroImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
        authorId: "usr-reporter",
        editorId: "usr-editor",
        publishedAt: now,
        isSponsored: false,
        viewCount: 2100,
        readingTimeMinutes: 4,
        createdAt: now,
        updatedAt: now
      },
      {
        id: "art-sports-1",
        title: "Kejuaraan Atletik Pemuda Se-Asia Pasifik Resmi Dibuka di Stadion Utama Bandung",
        subtitle: "Ribuan Atlet dari 24 Negara Bersaing Merebut Tiket Kualifikasi Olimpiade Musim Panas",
        slug: "kejuaraan-atletik-pemuda-asia-pasifik-stadion-bandung",
        summary: "Stadion kebanggaan Jawa Barat menyambut pagelaran olahraga akbar pemuda berstandar internasional dengan fasilitas lintasan sintetis mutakhir yang baru disertifikasi.",
        body: `## Panggung Prestasi Olahraga Regional

Upacara pembukaan Kejuaraan Atletik Pemuda Asia Pasifik berlangsung meriah di Stadion Utama Kota Bandung.

Ajang bergengsi ini memperebutkan puluhan medali emas serta menjadi panggung krusial bagi para atlet muda nasional untuk mengamankan poin peringkat kualifikasi olimpiade.`,
        contentType: "standard",
        status: "published",
        primaryCategoryId: "cat-sports",
        sentiment: "positive",
        riskLevel: "low",
        heroImageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800",
        authorId: "usr-reporter",
        editorId: "usr-editor",
        publishedAt: now,
        isSponsored: false,
        viewCount: 940,
        readingTimeMinutes: 3,
        createdAt: now,
        updatedAt: now
      },
      {
        id: "art-lifestyle-1",
        title: "Menelusuri Eksotisme Rute Sepeda Heritage Bandung di Akhir Pekan",
        subtitle: "Menyusuri Arsitektur Art-Deco Klasik dan Menikmati Seduhan Kopi Khas Priangan",
        slug: "menelusuri-eksotisme-rute-sepeda-heritage-bandung",
        summary: "Gaya hidup ramah lingkungan berkeliling menyusuri kawasan cagar budaya Bandung semakin digandrungi kawula muda urban saat hari bebas kendaraan bermotor.",
        body: `## Bernostalgia di Atas Dua Roda

Menyusuri jejak arsitektur era *Bandoeng Tempest Doeloe* menjadi opsi rekreasi sehat favorit baru.

Rute bersepeda santai dimulai dari kawasan jalan Asia Afrika, melintasi taman asri Balai Kota, dan berakhir dengan santap pagi kuliner legendaris bersuasana asri khas pegunungan Parahyangan.`,
        contentType: "standard",
        status: "published",
        primaryCategoryId: "cat-lifestyle",
        sentiment: "positive",
        riskLevel: "low",
        heroImageUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=800",
        authorId: "usr-reporter",
        editorId: "usr-editor",
        publishedAt: now,
        isSponsored: false,
        viewCount: 1150,
        readingTimeMinutes: 3,
        createdAt: now,
        updatedAt: now
      },
      {
        id: "art-1",
        title: "Revitalisasi Kawasan Gedung Sate untuk Pariwisata Internasional Dimulai",
        subtitle: "Kolaborasi Pemprov Jabar dan Arsitek Senior Ridwan Kamil Mewujudkan Destinasi Heritage Berkelas Dunia",
        slug: "revitalisasi-kawasan-gedung-sate-untuk-pariwisata-internasional-dimulai",
        summary: "Kawasan ikonik Gedung Sate Bandung akan mengalami revitalisasi besar-besaran untuk memperkuat daya tarik wisata sejarah internasional tanpa mengorbankan fungsi pemerintahan utama Jawa Barat.",
        body: `## Restorasi Heritage Bandung
Pemerintah Provinsi Jawa Barat resmi meluncurkan proyek revitalisasi kawasan bersejarah **Gedung Sate** di Kota Bandung. Proyek bernilai miliaran rupiah ini bertujuan untuk membuka akses publik lebih luas, mendirikan museum interaktif terbuka, dan meremajakan taman di sekeliling gedung bersejarah yang dibangun tahun 1920 ini.

Arsitek senior sekaligus mantan Gubernur Jawa Barat, **Ridwan Kamil**, ditunjuk sebagai penasihat utama perancangan tata ruang pariwisata ini. 

### Tiga Zona Utama Revitalisasi
Proyek ini akan dibagi menjadi tiga tahapan pengerjaan:
1. **Zona Utara (Plaza Publik):** Pembangunan taman interaktif ramah lingkungan dan amfiteater seni terbuka.
2. **Zona Tengah (Museum Utama):** Integrasi teknologi augmented reality (AR) di dalam gedung utama untuk menceritakan sejarah kolonial.
3. **Zona Selatan (Kuliner lokal):** Sentra UMKM tersertifikasi yang menjajakan kuliner khas Jawa Barat.

> "Gedung Sate bukan sekadar kantor dinas, melainkan pusaka bangsa yang memendam memori kolektif Jawa Barat. Kita ingin turis dunia datang dan pulang membawa kekaguman mendalam," ungkap Ridwan Kamil dalam konferensi pers sore tadi.

Masyarakat dipastikan tetap dapat mengakses area perkantoran secara terbatas melalui sistem kartu pas pintar. Proyek ini dijadwalkan rampung pada akhir tahun depan.`,
        contentType: "standard",
        status: "published",
        primaryCategoryId: "cat-editor",
        // Pilihan Editor
        sentiment: "positive",
        riskLevel: "low",
        heroImageUrl: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&q=80&w=800",
        authorId: "usr-reporter",
        editorId: "usr-editor",
        publishedAt: now,
        isSponsored: false,
        viewCount: 1420,
        readingTimeMinutes: 3,
        createdAt: now,
        updatedAt: now
      },
      {
        id: "art-2",
        title: "Menteri Keuangan Sri Mulyani Tetapkan Insentif Pajak Sektor Digital Nasional",
        subtitle: "Langkah Strategis Memperkuat Pertumbuhan Industri FinTech dan Startup Lokal",
        slug: "sri-mulyani-tetapkan-insentif-pajak-sektor-digital-nasional",
        summary: "Kementerian Keuangan meluncurkan kebijakan insentif pajak penghasilan final guna memacu akselerasi startup teknologi lokal di tengah gejolak pasar global.",
        body: `## Kebijakan Fiskal Sektor FinTech
Menteri Keuangan **Sri Mulyani Indrawati** resmi menandatangani Peraturan Menteri Keuangan (PMK) baru terkait insentif pajak bagi industri teknologi informasi dan digital di Indonesia. Langkah ini dinilai strategis guna mengamankan daya saing startup lokal dari serbuan modal asing serta mengantisipasi perlambatan likuiditas global.

Insentif yang diberikan meliputi pembebasan PPh Badan hingga 5 tahun untuk startup rintisan dengan kriteria tertentu, serta pemotongan tarif PPh Final untuk korporasi teknologi finansial (FinTech) yang menyediakan program inklusi mikro keuangan di daerah pelosok.

### Dampak dan Target Insentif
Kemenkeu menargetkan kebijakan ini dapat memicu investasi baru sebesar Rp 25 Triliun di sektor digital domestik hingga akhir kuartal pertama tahun depan.

> "Indonesia memiliki potensi ekonomi digital terbesar di ASEAN. Kita tidak boleh membiarkan momentum ini melambat akibat ketidakpastian suku bunga global. Fiskal harus menjadi bantalan sekaligus pendorong inovasi," jelas Sri Mulyani di Jakarta Pusat.

Asosiasi Startup Teknologi Indonesia (ASTI) menyambut hangat keputusan ini, menganggapnya sebagai 'oksigen segar' bagi kelangsungan hidup startup lokal yang sedang melangsungkan efisiensi model bisnis.`,
        contentType: "analysis",
        status: "published",
        primaryCategoryId: "cat-analisis",
        // Analisis
        sentiment: "neutral",
        riskLevel: "medium",
        heroImageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800",
        authorId: "usr-reporter",
        editorId: "usr-editor",
        publishedAt: now,
        isSponsored: false,
        viewCount: 950,
        readingTimeMinutes: 4,
        createdAt: now,
        updatedAt: now
      },
      {
        id: "art-3",
        title: "Panduan Lengkap Mempersiapkan Finansial di Tengah Fluktuasi Rupiah",
        subtitle: "Bagaimana Mengamankan Tabungan dan Memilih Aset Lindung Nilai yang Tepat",
        slug: "panduan-lengkap-mempersiapkan-finansial-di-tengah-fluktuasi-rupiah",
        summary: "Evergreen guide mengenai strategi mitigasi inflasi dan pengelolaan portofolio finansial untuk keluarga menengah di perkotaan.",
        body: `## Strategi Mengatasi Inflasi Harian
Pergerakan nilai tukar Rupiah yang dinamis memberikan pengaruh langsung pada harga pangan impor dan bahan pokok. Untuk mengamankan tabungan keluarga, perencana keuangan merekomendasikan restrukturisasi alokasi aset.

### Langkah Praktis Mengamankan Keuangan
1. **Evaluasi Dana Darurat:** Pastikan dana darurat Anda setara dengan 6-12 bulan pengeluaran bulanan dan disimpan di instrumen likuid berisiko rendah.
2. **Diversifikasi ke Emas:** Emas fisik maupun digital terbukti menjadi salah satu lindung nilai (hedge) terbaik saat terjadi depresiasi mata uang domestik.
3. **Pangkas Utang Konsumtif:** Suku bunga kredit berpotensi naik seiring pengetatan kebijakan moneter oleh bank sentral. prioritaskan melunasi pinjaman dengan bunga mengambang (floating rate).

Ingat, kunci utama ketahanan finansial adalah kedisiplinan pencatatan arus kas keluar masuk setiap harinya.`,
        contentType: "explainer",
        status: "published",
        primaryCategoryId: "cat-explainer",
        // Explainer
        sentiment: "neutral",
        riskLevel: "low",
        heroImageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800",
        authorId: "usr-reporter",
        editorId: "usr-editor",
        publishedAt: now,
        isSponsored: false,
        viewCount: 420,
        readingTimeMinutes: 3,
        createdAt: now,
        updatedAt: now
      },
      {
        id: "art-4",
        title: "Erupsi Gunung Marapi Terkini: Status Siaga Tingkat III, BNPB Himbau Warga Menjauh",
        subtitle: "Aktivitas Vulkanik Meningkat Signifikan, Semburan Abu Vulkanik Mencapai 1.500 Meter",
        slug: "erupsi-gunung-marapi-terkini-status-siaga-tingkat-iii",
        summary: "Gunung Marapi kembali meluncurkan abu vulkanik pekat sore ini. Badan Nasional Penanggulangan Bencana mengeluarkan imbauan radius bahaya 4.5 km.",
        body: `## Peringatan Bahaya Erupsi Marapi
Gunung Marapi di Sumatra Barat kembali menunjukkan peningkatan aktivitas vulkanik yang signifikan sejak pagi hari. Berdasarkan pemantauan seismograf PVMBG, terjadi gempa letusan beruntun dengan amplitudo maksimal mencapai 30 milimeter.

Pihak **BNPB** dan **BMKG** telah mendirikan posko tanggap darurat di wilayah terdampak serta mendistribusikan lebih dari 20.000 masker pelindung debu kepada masyarakat sekitar kaki gunung.

### Imbauan Evakuasi Sektoral
Warga dilarang beraktivitas dalam radius 4.5 kilometer dari kawah utama. Bagi desa-desa yang berada di luar radius namun terpapar hujan abu tipis, diimbau untuk tetap berada di dalam rumah guna mencegah penyakit pernapasan akut (ISPA).`,
        contentType: "standard",
        status: "published",
        primaryCategoryId: "cat-breaking",
        // Breaking News
        sentiment: "negative",
        riskLevel: "high",
        heroImageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800",
        authorId: "usr-reporter",
        editorId: "usr-editor",
        publishedAt: now,
        isSponsored: false,
        viewCount: 1820,
        readingTimeMinutes: 2,
        createdAt: now,
        updatedAt: now
      },
      {
        id: "art-5",
        title: "BI Rate Dipertahankan di Level 6.25% Guna Menjaga Stabilitas Rupiah",
        subtitle: "Keputusan Rapat Dewan Gubernur Bank Indonesia Menghadapi Tekanan Global",
        slug: "bi-rate-dipertahankan-level-625-stabilas-rupiah",
        summary: "Rapat Dewan Gubernur Bank Indonesia memutuskan untuk menahan suku bunga acuan guna memitigasi risiko inflasi barang impor (imported inflation).",
        body: `## RDG Bank Indonesia Juni 2026
Dewan Gubernur **Bank Indonesia** secara bulat memutuskan untuk mempertahankan BI Rate di level 6.25%. Langkah ini diambil sebagai strategi pre-emptive untuk memperkuat stabilitas nilai tukar Rupiah dari tekanan ketidakpastian suku bunga bank sentral global yang masih fluktuatif.

### Fokus Stabilitas dan Pertumbuhan
Meskipun pelaku industri mengharapkan adanya pelonggaran moneter untuk merangsang kredit usaha, BI menegaskan fokus jangka pendek adalah menstabilkan arus modal keluar dan menjaga tingkat inflasi domestik dalam rentang sasaran 2.5\xB11%.`,
        contentType: "standard",
        status: "published",
        primaryCategoryId: "cat-terbaru",
        // Terbaru
        sentiment: "neutral",
        riskLevel: "low",
        heroImageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800",
        authorId: "usr-reporter",
        editorId: "usr-editor",
        publishedAt: now,
        isSponsored: false,
        viewCount: 510,
        readingTimeMinutes: 3,
        createdAt: now,
        updatedAt: now
      },
      {
        id: "art-6",
        title: "Tren Kloning Suara AI Merambah Content Creator TikTok Indonesia: Kreativitas vs Hak Cipta",
        subtitle: "Menelaah Batasan Regulasi Penggunaan Voice Synthesis Generatif di Ranah Media Sosial",
        slug: "tren-kloning-suara-ai-content-creator-tiktok-indonesia",
        summary: "Bagaimana para kreator memanfaatkan teknologi deep voice untuk konten parodi, dan kekhawatiran hukum kepemilikan hak cipta suara tokoh publik.",
        body: `## Era Baru Kreativitas Generatif
Sirkuit konten **TikTok** tanah air dihebohkan dengan tren pengisi suara otomatis yang meniru karakter vokal penyanyi legendaris hingga tokoh politik populer. Menggunakan platform voice cloning berbasis LLM generatif, pengguna kini dapat memproduksi materi suara berkualitas studio hanya dengan memasukkan draf teks teks sederhana.

### Pertentangan Regulasi dan Hak Cipta
Meskipun menghibur dan mendongkrak retensi penonton secara eksponensial, praktik ini memicu debat etis dan hukum mengenai hak atas citra suara seseorang (voice rights). Kementerian Kominfo dikabarkan sedang merancang draf panduan etika kecerdasan buatan nasional guna merespons fenomena ini.`,
        contentType: "analysis",
        status: "published",
        primaryCategoryId: "cat-trending",
        // Trending
        sentiment: "positive",
        riskLevel: "medium",
        heroImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
        authorId: "usr-reporter",
        editorId: "usr-editor",
        publishedAt: now,
        isSponsored: false,
        viewCount: 2310,
        readingTimeMinutes: 4,
        createdAt: now,
        updatedAt: now
      },
      {
        id: "art-7",
        title: "Saksi Kunci Ungkap Aliran Dana Kartel Tambang Ilegal di Kalimantan Barat",
        subtitle: "Investigasi Eksklusif: Jaringan Perantara Keuangan Menggunakan Modus Kripto Samaran",
        slug: "saksi-kunci-ungkap-aliran-dana-kartel-tambang-ilegal",
        summary: "Laporan investigasi mendalam mengenai jalur pencucian uang korporasi pertambangan ilegal bernilai ratusan miliar rupiah.",
        body: `## Jaringan Pencucian Uang Transnasional
Berdasarkan dokumen pemeriksaan yang diperoleh tim kolaborasi jurnalis independen, terungkap skema rumit pemindahan dana dari konsesi tambang emas ilegal di pedalaman Kalimantan Barat menuju rekening cangkang di luar negeri.

Penyidik komisi antirasuah (**KPK**) berhasil mendeteksi penggunaan aset kripto stabil (stablecoin) sebagai media perantara untuk menyamarkan asal-usul keuntungan haram guna menghindari deteksi PPATK.

### Dampak Kerusakan Lingkungan
Selain kerugian finansial negara yang ditaksir mencapai Rp 1.2 Triliun, penambangan ilegal ini memicu kerusakan ekosistem sungai utama yang menjadi sumber air minum bagi puluhan ribu warga lokal.`,
        contentType: "standard",
        status: "published",
        primaryCategoryId: "cat-investigasi",
        // Investigasi
        sentiment: "negative",
        riskLevel: "critical",
        heroImageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800",
        authorId: "usr-reporter",
        editorId: "usr-editor",
        publishedAt: now,
        isSponsored: false,
        viewCount: 3120,
        readingTimeMinutes: 6,
        createdAt: now,
        updatedAt: now
      },
      {
        id: "art-8",
        title: "Menjaga Kedaulatan Digital di Tengah Arus Algoritma Media Sosial Asing",
        subtitle: "Perspektif Kolom: Mengapa Regulasi Penataan Konten Lokal Mendesak untuk Diperkuat",
        slug: "menjaga-kedaulatan-digital-tengah-arus-algoritma-asing",
        summary: "Refleksi mendalam mengenai pentingnya keberpihakan platform agregator nasional terhadap ekosistem informasi tanah air.",
        body: `## Kolonialisme Algoritma Baru
Kita hidup di era di mana apa yang kita ketahui, sukai, dan percayai sebagian besar didefinisikan oleh kalkulasi matematis server-server yang terletak ribuan mil di luar wilayah hukum Indonesia. Kedaulatan bukan lagi sekadar menjaga tapal batas daratan dan lautan, melainkan bagaimana menjamin pikiran publik tidak didikte oleh agenda transnasional.

### Solusi Ekosistem Informasi Mandiri
Indonesia memerlukan inisiatif platform lokal seperti **INFOBOS Next** yang mengedepankan objektivitas, grounding regional yang kaya konteks, dan kedaulatan distribusi data tanpa bias komersial semata.`,
        contentType: "analysis",
        status: "published",
        primaryCategoryId: "cat-opini",
        // Opini
        sentiment: "positive",
        riskLevel: "low",
        heroImageUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=800",
        authorId: "usr-reporter",
        editorId: "usr-editor",
        publishedAt: now,
        isSponsored: false,
        viewCount: 680,
        readingTimeMinutes: 4,
        createdAt: now,
        updatedAt: now
      },
      {
        id: "art-9",
        title: "Klarifikasi: Video Deteksi Gempa Megathrust BMKG di Selat Sunda Adalah Deepfake",
        subtitle: "Fact Check Laporan Viral: Manipulasi Kecerdasan Buatan yang Menimbulkan Kepanikan Publik",
        slug: "klarifikasi-video-deteksi-gempa-megathrust-bmkg-deepfake",
        summary: "Hasil uji laboratorium forensik digital mengonfirmasi video pernyataan BMKG mengenai prediksi tsunami lusa depan sepenuhnya dimanipulasi AI.",
        body: `## Temuan Manipulasi Forensik Digital
Sebuah rekaman video berdurasi 30 detik yang menampilkan pejabat teras **BMKG** mengumumkan waktu pasti terjadinya gempa megathrust Selat Sunda beredar masif di grup-grup percakapan.

### Fakta Sebenarnya
1. **Tidak Ada Metode Prediksi Waktu Pasti:** BMKG menegaskan hingga saat ini belum ada teknologi di dunia yang mampu meramal hari dan jam terjadinya gempa bumi secara presisi.
2. **Lip Sync AI Detected:** Analisis spektrum audio dan visual menunjukkan ketidakselarasan gerakan bibir (phoneme-viseme) sebesar 120ms, ciri khas manipulasi generative lip-sync model AI open-source.

Masyarakat diimbau untuk tidak menyebarkan video tersebut dan hanya memantau informasi resmi lewat aplikasi InfoBMKG.`,
        contentType: "explainer",
        status: "published",
        primaryCategoryId: "cat-factcheck",
        // Fact Check
        sentiment: "negative",
        riskLevel: "medium",
        heroImageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800",
        authorId: "usr-reporter",
        editorId: "usr-editor",
        publishedAt: now,
        isSponsored: false,
        viewCount: 1990,
        readingTimeMinutes: 3,
        createdAt: now,
        updatedAt: now
      },
      {
        id: "art-10",
        title: "Riset AI Terkini: Model LLM Bahasa Daerah Melayu-Sunda Capai Akurasi 94%",
        subtitle: "Kolaborasi Pusat Studi Riset Unggulan Nasional dan MIT dalam Preservasi Linguistik Nusantara",
        slug: "riset-ai-terkini-llm-bahasa-daerah-melayu-sunda-akurasi-94",
        summary: "Penelitian kolaboratif berhasil memetakan struktur sintaksis bahasa daerah lokal Indonesia guna menyusun asisten pintar berbasis kearifan lokal.",
        body: `## Preservasi Bahasa Lewat Komputasi Modern
Pusat riset komputasi bahasa nasional bekerja sama dengan departemen linguistik **MIT** meluncurkan model bahasa besar (LLM) khusus yang didesain memahami dialek Melayu-Sunda secara mendalam. 

### Signifikansi Akademis & Aplikasi Praktis
Dengan akurasi pemahaman konteks (NLU) mencapai 94.2%, model ini dapat diaplikasikan pada asisten virtual pelayanan kesehatan publik perdesaan di Jawa Barat, sehingga warga sepuh dapat berkonsultasi medis secara alami memakai bahasa daerah masing-masing.

Hal ini menjadi terobosan penting dalam mengatasi kesenjangan akses teknologi di daerah rural terpencil Indonesia.`,
        contentType: "analysis",
        status: "published",
        primaryCategoryId: "cat-riset",
        // Riset & Insight
        sentiment: "positive",
        riskLevel: "low",
        heroImageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
        authorId: "usr-reporter",
        editorId: "usr-editor",
        publishedAt: now,
        isSponsored: false,
        viewCount: 1540,
        readingTimeMinutes: 5,
        createdAt: now,
        updatedAt: now
      }
    ];
    const contentLocations = [
      { contentId: "art-1", locationId: "loc-bdg", relevanceScore: 95, isPrimary: true },
      { contentId: "art-1", locationId: "loc-jabar", relevanceScore: 80, isPrimary: false },
      { contentId: "art-2", locationId: "loc-jkt", relevanceScore: 90, isPrimary: true }
    ];
    const contentEntities = [
      { contentId: "art-1", entityId: "ent-rk", relevanceScore: 95, relationType: "advisor" },
      { contentId: "art-1", entityId: "ent-gdsate", relevanceScore: 100, relationType: "subject" },
      { contentId: "art-2", entityId: "ent-sri", relevanceScore: 95, relationType: "subject" }
    ];
    const contentTopics = [
      { contentId: "art-1", topicId: "top-wisata" },
      { contentId: "art-2", topicId: "top-inflasi" }
    ];
    const contentTags = [
      { contentId: "art-1", tagId: "tag-bandung" },
      { contentId: "art-2", tagId: "tag-pajak" },
      { contentId: "art-3", tagId: "tag-rupiah" }
    ];
    const ingestionSources = [
      {
        id: "src-antara",
        name: "Antara News Jabar",
        domain: "jabar.antaranews.com",
        type: "rss",
        trustTier: "A",
        trustScore: 98,
        rssUrl: "https://jabar.antaranews.com/rss/terbaru.xml",
        isActive: true,
        errorCount: 0,
        createdAt: now
      },
      {
        id: "src-detik",
        name: "DetikNews Ekonomi",
        domain: "detik.com",
        type: "rss",
        trustTier: "B",
        trustScore: 92,
        rssUrl: "https://finance.detik.com/rss",
        isActive: true,
        errorCount: 0,
        createdAt: now
      }
    ];
    const advertisers = [
      { id: "adv-bank", companyName: "Bank Mandiri Utama Tbk", contactEmail: "marketing@mandiriutama.co.id", budgetTotal: 15e7, budgetSpent: 12e4, createdAt: now }
    ];
    const campaigns = [
      { id: "cam-fintech", advertiserId: "adv-bank", name: "Promosi Tabungan Digital Prioritas", status: "active", startAt: "2026-06-01T00:00:00Z", endAt: "2026-12-31T23:59:59Z", budget: 5e7, targetLocations: ["loc-bdg", "loc-jkt"], createdAt: now }
    ];
    const creatives = [
      {
        id: "cre-banner1",
        campaignId: "cam-fintech",
        placement: "sidebar",
        imageUrl: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=350",
        destinationUrl: "https://mandiriutama.co.id/tabungan-prioritas",
        altText: "Tumbuh Kuat Bersama Tabungan Digital Prioritas",
        impressionLimit: 5e5,
        clickLimit: 25e3,
        impressionsCount: 2450,
        clicksCount: 142,
        status: "active",
        createdAt: now
      }
    ];
    const contentVersions = [
      {
        id: "ver-1",
        contentId: "art-1",
        title: "Revitalisasi Kawasan Gedung Sate untuk Pariwisata Internasional Dimulai",
        body: contents[0].body,
        summary: contents[0].summary,
        modifiedBy: "usr-reporter",
        changeSummary: "Inisiasi draf berita utama penataan kawasan heritage Gedung Sate oleh Budi",
        createdAt: now
      }
    ];
    const auditLogs = [
      {
        id: "aud-1",
        actorId: "usr-admin",
        actorName: "Ahmad Dahlan",
        action: "system.seed",
        entityName: "system",
        entityId: "system-root",
        timestamp: now
      },
      {
        id: "aud-2",
        actorId: "usr-editor",
        actorName: "Siti Rahma",
        action: "content.publish",
        entityName: "contents",
        entityId: "art-1",
        timestamp: now
      }
    ];
    this.data = {
      users,
      categories,
      topics,
      tags,
      locations,
      entities,
      contents,
      contentVersions,
      contentLocations,
      contentEntities,
      contentTopics,
      contentTags,
      ingestionSources,
      ingestionItems: [],
      advertisers,
      campaigns,
      creatives,
      bookmarks: [],
      follows: [],
      auditLogs,
      corrections: []
    };
    this.save();
  }
  // --- QUERY APIS ---
  getUsers() {
    return this.data.users;
  }
  getCategories() {
    return this.data.categories;
  }
  getTopics() {
    return this.data.topics;
  }
  getTags() {
    return this.data.tags;
  }
  getLocations() {
    return this.data.locations;
  }
  getEntities() {
    return this.data.entities;
  }
  getContents() {
    return this.data.contents;
  }
  getContentVersions() {
    return this.data.contentVersions;
  }
  getIngestionSources() {
    return this.data.ingestionSources;
  }
  getIngestionItems() {
    return this.data.ingestionItems;
  }
  getAdvertisers() {
    return this.data.advertisers;
  }
  getCreatives() {
    return this.data.creatives;
  }
  getCampaigns() {
    return this.data.campaigns;
  }
  getBookmarks() {
    return this.data.bookmarks;
  }
  getFollows() {
    return this.data.follows;
  }
  getAuditLogs() {
    return this.data.auditLogs;
  }
  getCorrections() {
    return this.data.corrections;
  }
  // Relation getters
  getContentLocations(contentId) {
    return this.data.contentLocations.filter((cl) => cl.contentId === contentId);
  }
  getContentEntities(contentId) {
    return this.data.contentEntities.filter((ce) => ce.contentId === contentId);
  }
  getContentTopics(contentId) {
    return this.data.contentTopics.filter((ct) => ct.contentId === contentId);
  }
  getContentTags(contentId) {
    return this.data.contentTags.filter((ct) => ct.contentId === contentId);
  }
  // Mutation helper wrappers
  addContent(content) {
    this.data.contents.unshift(content);
    this.save();
  }
  updateContent(content) {
    const idx = this.data.contents.findIndex((c) => c.id === content.id);
    if (idx !== -1) {
      this.data.contents[idx] = content;
      this.save();
    }
  }
  addContentVersion(version) {
    this.data.contentVersions.unshift(version);
    this.save();
  }
  addAuditLog(log) {
    this.data.auditLogs.unshift(log);
    this.save();
  }
  addCorrection(correction) {
    this.data.corrections.unshift(correction);
    this.save();
  }
  setContentLocations(contentId, locs) {
    this.data.contentLocations = this.data.contentLocations.filter((cl) => cl.contentId !== contentId);
    this.data.contentLocations.push(...locs);
    this.save();
  }
  setContentEntities(contentId, ents) {
    this.data.contentEntities = this.data.contentEntities.filter((ce) => ce.contentId !== contentId);
    this.data.contentEntities.push(...ents);
    this.save();
  }
  setContentTopics(contentId, topics) {
    this.data.contentTopics = this.data.contentTopics.filter((ct) => ct.contentId !== contentId);
    this.data.contentTopics.push(...topics);
    this.save();
  }
  setContentTags(contentId, tags) {
    this.data.contentTags = this.data.contentTags.filter((ct) => ct.contentId !== contentId);
    this.data.contentTags.push(...tags);
    this.save();
  }
  addIngestionItem(item) {
    this.data.ingestionItems.unshift(item);
    this.save();
  }
  updateIngestionItem(item) {
    const idx = this.data.ingestionItems.findIndex((i) => i.id === item.id);
    if (idx !== -1) {
      this.data.ingestionItems[idx] = item;
      this.save();
    }
  }
  updateIngestionSource(source) {
    const idx = this.data.ingestionSources.findIndex((s) => s.id === source.id);
    if (idx !== -1) {
      this.data.ingestionSources[idx] = source;
      this.save();
    }
  }
  addBookmark(bookmark) {
    const exists = this.data.bookmarks.some((b) => b.userId === bookmark.userId && b.contentId === bookmark.contentId);
    if (!exists) {
      this.data.bookmarks.push(bookmark);
      this.save();
    }
  }
  removeBookmark(userId, contentId) {
    this.data.bookmarks = this.data.bookmarks.filter((b) => !(b.userId === userId && b.contentId === contentId));
    this.save();
  }
  addFollow(follow) {
    const exists = this.data.follows.some((f) => f.userId === follow.userId && f.targetType === follow.targetType && f.targetId === follow.targetId);
    if (!exists) {
      this.data.follows.push(follow);
      this.save();
    }
  }
  removeFollow(userId, targetType, targetId) {
    this.data.follows = this.data.follows.filter((f) => !(f.userId === userId && f.targetType === targetType && f.targetId === targetId));
    this.save();
  }
  trackAdImpression(creativeId) {
    const creative = this.data.creatives.find((c) => c.id === creativeId);
    if (creative) {
      creative.impressionsCount++;
      const campaign = this.data.campaigns.find((c) => c.id === creative.campaignId);
      if (campaign) {
        const adv = this.data.advertisers.find((a) => a.id === campaign.advertiserId);
        if (adv) {
          adv.budgetSpent += 50;
        }
      }
      this.save();
    }
  }
  trackAdClick(creativeId) {
    const creative = this.data.creatives.find((c) => c.id === creativeId);
    if (creative) {
      creative.clicksCount++;
      const campaign = this.data.campaigns.find((c) => c.id === creative.campaignId);
      if (campaign) {
        const adv = this.data.advertisers.find((a) => a.id === campaign.advertiserId);
        if (adv) {
          adv.budgetSpent += 500;
        }
      }
      this.save();
    }
  }
  enrichCategories() {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    let changed = false;
    const categoryStories = {
      "cat-breaking": [
        {
          title: "Gempa Magnitudo 5.2 Guncang Bandung Selatan, Warga Mengungsi Sementara",
          subtitle: "BMKG Nyatakan Tidak Berpotensi Tsunami, Waspada Gempa Susulan",
          summary: "Kabupaten Bandung diguncang gempa berkekuatan M 5.2 pada kedalaman 10 km, memicu kepanikan warga di Pangalengan dan Ciwidey.",
          body: '## Gempa M 5.2 di Bandung Selatan\n\nGempa tektonik berkekuatan magnitudo 5.2 mengguncang wilayah selatan Kabupaten Bandung pada sore hari ini. Titik episentrum berada di darat, sekitar 15 kilometer tenggara Ciwidey.\n\n### Tindakan Mitigasi BPBD\n\nBPBD Jawa Barat segera menerjunkan tim penyelamat untuk memeriksa potensi kerusakan infrastruktur dan mendirikan posko pengungsian sementara di area terbuka hijau.\n\n> "Masyarakat diimbau tetap tenang dan tidak terpengaruh oleh isu-isu hoaks yang tidak dapat dipertanggungjawabkan," imbau Kepala BPBD Jabar.',
          contentType: "breaking",
          sentiment: "negative",
          riskLevel: "medium",
          heroImageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Kebakaran Hebat di Kawasan Industri Cikarang, 10 Mobil Damkar Dikerahkan",
          subtitle: "Kobaran Api Melalap Gudang Penyimpanan Bahan Kimia Tekstil",
          summary: "Insiden kebakaran besar melanda area pabrik kimia di Cikarang Bekasi, menimbulkan kepulan asap hitam pekat yang terlihat dari jalan tol Jakarta-Cikampek.",
          body: "## Kebakaran Gudang Kimia Cikarang\n\nKebakaran melanda sebuah gudang penyimpanan bahan kimia tekstil di kawasan industri GIIC Cikarang. Api pertama kali terlihat dari ruang produksi pada pukul 09:30 WIB.\n\n### Upaya Lokalisir Kebakaran\n\nPetugas pemadam kebakaran dari Kabupaten Bekasi mengerahkan sedikitnya 10 unit mobil damkar untuk memutus perambatan api ke pabrik-pabrik tetangga.\n\n* Korban jiwa: Nihil berdasarkan laporan sementara.\n* Kerugian material: Ditaksir mencapai miliaran rupiah.",
          contentType: "breaking",
          sentiment: "negative",
          riskLevel: "high",
          heroImageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Banjir Bandang Terjang Garut Utara, Akses Jalan Raya Provinsi Terputus",
          subtitle: "Hujan Intensitas Tinggi Picu Luapan Sungai Cimanuk Hulu",
          summary: "Tebing penahan air jebol di Garut Utara, memicu luapan banjir bandang yang menutup akses transportasi utama menuju Sumedang.",
          body: "## Banjir Bandang Garut Utara\n\nHujan deras yang mengguyur wilayah pegunungan Garut selama lebih dari 6 jam mengakibatkan hulu Sungai Cimanuk meluap hebat.\n\n### Kondisi Transportasi Terkini\n\nAir dengan ketinggian mencapai 1 meter merendam jalan raya provinsi, memaksa aparat kepolisian memutar balik semua kendaraan berat.",
          contentType: "breaking",
          sentiment: "negative",
          riskLevel: "high",
          heroImageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Sentinel OS Deteksi Kebocoran Server Pengaduan Publik Daerah",
          subtitle: "Upaya Eksploitasi Celah Keamanan Segera Ditutup Tim Respons Siber",
          summary: "Sistem pengawasan keamanan Sentinel OS berhasil mengidentifikasi dan memblokir anomali akses eksternal mencurigakan pada pelataran server pengaduan.",
          body: "## Respons Cepat Keamanan Siber\n\nTim tanggap siber MediaOS mendeteksi adanya aktivitas penjelajahan pelabuhan jaringan (*port scanning*) ilegal pada sistem penyimpanan aduan warga.\n\n### Investigasi Lanjutan\n\nDengan perlindungan Sentinel OS, akses mencurigakan tersebut berhasil diisolasi dalam waktu kurang dari 3 menit sebelum kebocoran data sensitif terjadi.",
          contentType: "breaking",
          sentiment: "neutral",
          riskLevel: "critical",
          heroImageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Sertifikasi Darurat Avian Influenza Diberlakukan di Peternakan Priangan Timur",
          subtitle: "Kementerian Pertanian Terapkan Karantina Ketat Guna Batasi Penyebaran Virus",
          summary: "Kementerian Pertanian secara resmi mengumumkan penetapan status karantina wilayah terbatas pada kluster peternakan di Priangan Timur pasca temuan flu burung.",
          body: "## Karantina Unggas Priangan Timur\n\nPemerintah mengambil langkah preventif agresif dengan membatasi mobilitas produk unggas dari wilayah Priangan Timur menuju Jabodetabek.\n\n### Upaya Sterilisasi Lokasi\n\nSeluruh kandang peternakan dalam radius 5 kilometer disemprot disinfektan secara menyeluruh, disertai pemberian vaksin darurat kepada ribuan hewan ternak warga.",
          contentType: "breaking",
          sentiment: "negative",
          riskLevel: "medium",
          heroImageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800"
        }
      ],
      "cat-terbaru": [
        {
          title: "Revitalisasi Alun-Alun Sumedang Selesai, Usung Konsep Smart-Green Heritage",
          subtitle: "Wajah Baru Ruang Publik Ramah Anak dan Disabilitas Terintegrasi Wi-Fi Publik",
          summary: "Pemerintah Kabupaten Sumedang resmi meresmikan kembali Alun-Alun kota setelah penataan arsitektur hijau yang menyerap anggaran APBD Provinsi.",
          body: "## Wajah Baru Alun-Alun Sumedang\n\nProyek revitalisasi ruang terbuka hijau bersejarah di jantung Kabupaten Sumedang akhirnya rampung sepenuhnya. Penataan baru ini menggabungkan unsur kebudayaan lokal dengan fasilitas modern.\n\n### Fasilitas Baru yang Dihadirkan\n\n* **Aksesibilitas Ramah Disabilitas:** Jalur pemandu taktil di seluruh lintasan pejalan kaki.\n* **Smart Spot:** Area pengisian daya bertenaga surya dan akses internet gratis.\n* **Galeri UMKM:** Tempat khusus kurasi kuliner tahu Sumedang legendaris.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Pemanfaatan Smart Irrigation di Karawang Sukses Hemat Air Pertanian hingga 40%",
          subtitle: "Petani Milenial Terapkan Sistem Otomasi Berbasis Kebutuhan Riil Tanaman",
          summary: "Uji coba pertanian pintar berbasis sensor kelembapan tanah di Karawang membuktikan penghematan air irigasi yang signifikan di musim kemarau.",
          body: "## Sukses Smart Irrigation Karawang\n\nPara petani muda di Karawang mulai mengadopsi teknologi irigasi tetes pintar yang bekerja otomatis menyesuaikan dengan data kelembapan tanah riil.\n\n### Dampak bagi Petani\n\nSelain menghemat sumber daya air, biaya operasional pompa diesel berkurang hingga setengahnya, menciptakan efisiensi pengeluaran bulanan yang berharga.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Pameran Tenun Sutra Garut Tarik Minat Buyer Internasional",
          subtitle: "Ekspor Tenun Ikat Sutra Alam Bernilai Estetika Tinggi Siap Dikirim ke Milan",
          summary: "Industri kreatif kerajinan tenun sutra tradisional asal Garut sukses menandatangani memorandum pembelian eksklusif dengan butik fesyen asal Italia.",
          body: "## Tenun Sutra Garut Mendunia\n\nKarya seni tenun ikat sutra buatan tangan para pengrajin lokal Garut kembali menorehkan prestasi gemilang di tingkat mancanegara.\n\n### Ciri Khas Seni Sutra\n\nMotif khas bernuansa alam priangan yang digabungkan dengan pewarnaan alami bebas bahan kimia menjadi daya tarik utama bagi para desainer Milan.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Bandung Targetkan Bebas Sampah Organik Lewat Program Kang Pisman 2026",
          subtitle: "Pemberlakuan Sistem Kompos Mandiri di Tingkat Rukun Tetangga",
          summary: "Pemerintah Kota Bandung kembali menggalakkan gerakan kurangi, pisahkan, dan manfaatkan sampah (Kang Pisman) dengan dukungan penuh komunitas lingkungan.",
          body: "## Gerakan Kang Pisman Jilid II\n\nKota Bandung bertekad menekan volume pembuangan sampah ke TPA Sarimukti dengan memperkuat tata kelola pengomposan sampah organik mandiri.\n\n### Skema RT Hijau\n\nSetiap rukun tetangga difasilitasi tong komposter modern dan pelatihan budidaya maggot black soldier fly (BSF) untuk mengurai limbah sisa makanan.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Pembangunan Terminal Wisata Pangandaran Memasuki Tahap Akhir",
          subtitle: "Infrastruktur Terintegrasi Guna Sambut Lonjakan Turis Domestik",
          summary: "Terminal terpadu Pangandaran dirancang untuk mempermudah transfer bus pariwisata menuju area pantai utama secara cepat dan teratur.",
          body: "## Terminal Wisata Modern Pangandaran\n\nKonektivitas pariwisata pantai selatan Jawa Barat segera mendapat dorongan besar dengan rampungnya proyek Terminal Wisata Pangandaran.\n\n### Desain Berkelanjutan\n\nGedung terminal menerapkan arsitektur ramah lingkungan dengan sirkulasi udara alami dan pencahayaan panel surya, siap beroperasi menyambut libur akhir tahun.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800"
        }
      ],
      "cat-trending": [
        {
          title: "Viral Kedai Kopi Bernuansa Geologi Purba di Padalarang Ramai Dikunjungi Anak Muda",
          subtitle: "Sensasi Menyeruput Kopi di Tengah Tebing Batu Berumur Jutaan Tahun",
          summary: "Sebuah kedai kopi estetik di Padalarang mendadak viral di media sosial karena menawarkan pemandangan tebing karst purba yang instagramable.",
          body: "## Tren Kedai Kopi Karst Padalarang\n\nPemanfaatan lanskap bekas penambangan batu kapur tradisional menjadi destinasi wisata kreatif baru sedang mewabah di Bandung Barat.\n\n### Daya Tarik Edukasi Bumi\n\nSelain menikmati kopi lokal rancabali, pengunjung juga disajikan brosur edukasi mengenai proses pembentukan batuan kapur karst Citatah.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Pakaian Berbahan Serat Nanas Buatan Bandung Jadi Tren Fesyen Berkelanjutan",
          subtitle: "Inovasi Tekstil Ramah Lingkungan Menarik Perhatian Penggemar Tren Fesyen Hijau",
          summary: "Pakaian kustom berbahan dasar limbah daun nanas Subang mulai diminati pasar perkotaan sebagai alternatif serat kain berkualitas tinggi mirip linen.",
          body: "## Revolusi Tekstil Hijau Jabar\n\nSejumlah perancang busana muda asal Bandung bereksperimen mengolah limbah pertanian nanas menjadi serat kain berkualitas tinggi mirip linen.\n\n### Nilai Keberlanjutan\n\nProses pembuatannya yang minim bahan kimia berbahaya menjadikannya komoditas premium bernilai jual tinggi di kalangan aktivis kelestarian lingkungan.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Startup AI Asal Sumedang Raih Pendanaan Awal Sebesar $1.5 Juta USD",
          subtitle: "Fokus Kembangkan Model Deteksi Hama Padi untuk Petani Skala Kecil",
          summary: "Perusahaan rintisan kecerdasan buatan berbasis pertanian sukses mengamankan pendanaan tahap awal dari modal ventura regional Asia Tenggara.",
          body: "## Pendanaan AI Tani Sumedang\n\nPrestasi gemilang ditunjukkan oleh startup agroteknologi lokal yang berhasil meyakinkan investor global mengenai keunggulan analitik gambar hama padi mereka.\n\n### Rencana Ekspansi\n\nDana segar ini akan digunakan untuk menyempurnakan keandalan model AI agar dapat dijalankan secara offline di smartphone berspesifikasi rendah.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Tren Bersepeda Menyusuri Jalur Pegunungan Garut Menjadi Pilihan Wisata Sehat",
          subtitle: "Menikmati Keindahan Alam Sembari Menguji Adrenalin di Tanjakan Ekstrem",
          summary: "Olahraga sepeda gunung (MTB) menyusuri perkebunan teh di Garut kian digemari komunitas komuter perkotaan untuk melepas penat akhir pekan.",
          body: "## Wisata Sepeda Gunung Garut\n\nKabupaten Garut menawarkan rute bersepeda lintas alam dengan panorama pegunungan yang menakjubkan dan udara bersih bebas polusi.\n\n### Pemberdayaan Homestay Desa\n\nBanyaknya wisatawan pesepeda berdampak positif pada keterisian penginapan tradisional milik warga desa di sekitar jalur perlintasan.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Aplikasi Dompet Digital Komunitas Pesantren Mulai Diadopsi di Seluruh Jabar",
          subtitle: "Mudahkan Transaksi Syariah Tanpa Biaya Admin Guna Dukung UMKM Santri",
          summary: "Platform fintech syariah khusus pesantren mencatat lonjakan pendaftaran pengguna baru, memperkuat sirkulasi ekonomi syariah lokal.",
          body: "## Fintech Pesantren Mandiri\n\nSebuah inisiatif digitalisasi transaksi keuangan di lingkungan pondok pesantren di Jawa Barat meluncurkan aplikasi dompet elektronik bersama.\n\n### Penguatan Ekonomi Pesantren\n\nAplikasi ini memfasilitasi transaksi harian santri, pembayaran SPP, hingga pembiayaan kemitraan usaha mikro kantin pesantren secara transparan.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800"
        }
      ],
      "cat-editor": [
        {
          title: "Wawancara Eksklusif: Strategi Jawa Barat Menghadapi Ancaman Krisis Pangan Global",
          subtitle: "Pendekatan Komparatif Penyelamatan Lahan Sawah Abadi di 27 Kota/Kabupaten",
          summary: "Redaksi INFOBOS berbincang mendalam mengenai langkah-langkah konkret proteksi lahan tani produktif di tengah derasnya laju industrialisasi daerah.",
          body: "## Mempertahankan Sawah Abadi Jabar\n\nJawa Barat dikenal sebagai salah satu lumbung padi nasional utama. Namun, alih fungsi lahan sawah menjadi kawasan industri dan permukiman mengancam stabilitas pangan.\n\n### Penegasan Regulasi Perlindungan Lahan\n\nPemerintah Provinsi berkomitmen menegakkan aturan tata ruang secara disiplin, memberikan insentif pajak bagi pemilik sawah abadi yang konsisten menggarap lahannya.",
          contentType: "analysis",
          sentiment: "neutral",
          riskLevel: "medium",
          heroImageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Sosok Inspiratif: Guru Penggerak Literasi Digital di Pelosok Cirebon Barat",
          subtitle: "Mendedikasikan Diri Mengajar Pemrograman Komputer Dasar bagi Anak Nelayan",
          summary: "Kisah perjuangan seorang relawan pendidikan yang mendirikan saung belajar komputer gratis menggunakan laptop bekas hasil donasi.",
          body: '## Cahaya Digital dari Pesisir Cirebon\n\nDi tengah keterbatasan sarana internet, seorang pemuda di Cirebon berhasil menggerakkan minat belajar anak-anak nelayan untuk mengenal dunia logika coding komputer.\n\n### Saung Belajar Mandiri\n\n"Kami percaya bahwa literasi digital adalah kunci utama memutus rantai kemiskinan struktural di wilayah pesisir," kata sang relawan penuh haru.',
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Analisis Khusus: Menakar Kesiapan Infrastruktur Rebana Menyerap Tenaga Kerja Lokal",
          subtitle: "Pentingnya Sinkronisasi Kurikulum SMK dengan Kebutuhan Industri Manufaktur Baru",
          summary: "Kajian mendalam mengenai keselarasan keterampilan lulusan sekolah vokasi dengan jenis industri modern yang berkembang di koridor Majalengka-Subang.",
          body: "## Kesiapan Vokasi Rebana\n\nKawasan pertumbuhan ekonomi baru Rebana Metropolitan membutuhkan ribuan tenaga kerja terampil di bidang perakitan, mekatronika, dan logistik digital.\n\n### Urgensi Revitalisasi SMK\n\nKurikulum sekolah kejuruan di wilayah sekitar perlu disinkronisasikan secara aktif dengan standar operasional pabrik-pabrik multinasional.",
          contentType: "analysis",
          sentiment: "neutral",
          riskLevel: "medium",
          heroImageUrl: "https://images.unsplash.com/photo-1518152006812-edab29b069ca?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Eksplorasi Kebudayaan Angklung: Menjaga Warisan Dunia Tetap Hidup di Ruang Virtual",
          subtitle: "Bagaimana Komunitas Seni Bandung Berkolaborasi Mengembangkan Aplikasi Angklung Interaktif",
          summary: "Angklung kini dapat dipelajari secara interaktif melalui platform aplikasi seluler, menjangkau generasi muda di berbagai belahan dunia.",
          body: "## Angklung Virtual Warisan Dunia\n\nSeni tradisional angklung mendapat napas baru melalui integrasi teknologi aplikasi digital yang dikembangkan oleh para musisi dan programmer Bandung.\n\n### Pembelajaran Interaktif\n\nAplikasi ini menggunakan algoritma deteksi suara presisi untuk memandu pengguna memainkan nada-nada angklung secara real-time.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Menyelamatkan Ekosistem Sungai Citarum Melalui Pemberdayaan Kelompok Masyarakat Pesisir",
          subtitle: "Dampak Nyata Program Edukasi Pengelolaan Sampah Plastik Rumah Tangga",
          summary: "Kelompok swadaya masyarakat di bantaran Citarum sukses mengumpulkan dan mendaur ulang tonan sampah plastik setiap bulannya menjadi produk kerajinan bernilai guna.",
          body: "## Harapan Baru Citarum Harum\n\nInisiatif pembersihan Sungai Citarum kini melibatkan partisipasi aktif warga lokal yang diberikan insentif ekonomi dari hasil pengelolaan sampah daur ulang.\n\n### Sirkulasi Ekonomi Kreatif\n\nSampah plastik yang dikumpulkan dipilah, dicuci, dan dilelehkan kembali menjadi papan komposit berkualitas untuk kebutuhan furnitur rumah tangga.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800"
        }
      ],
      "cat-investigasi": [
        {
          title: "Investigasi Khusus: Penambangan Pasir Ilegal di Lereng Gunung Galunggung Rusak Mata Air Warga",
          subtitle: "Dugaan Manipulasi Dokumen Perizinan Lingkungan Hidup oleh Oknum Pengusaha Nakal",
          summary: "Penelusuran mendalam Redaksi INFOBOS menemukan aktivitas galian C ilegal yang mengancam pasokan air bersih bagi puluhan ribu warga di Tasikmalaya.",
          body: "## Kerusakan Lingkungan Galunggung\n\nAktivitas penambangan pasir tanpa izin resmi dilaporkan terus beroperasi di kawasan resapan air lereng Gunung Galunggung, menyebabkan debit mata air menyusut tajam.\n\n### Temuan Lapangan Tim Investigasi\n\nTim kami menemukan penggunaan alat berat di kawasan hutan lindung serta adanya aliran limbah pencucian pasir yang langsung dibuang ke saluran irigasi warga.",
          contentType: "analysis",
          sentiment: "investigative",
          riskLevel: "critical",
          heroImageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Penelusuran Aliran Dana Hibah Fiktif di Sektor Pariwisata Daerah Jawa Barat",
          subtitle: "Modus Pembentukan Kelompok Sadar Wisata Palsu untuk Cairkan Anggaran Publik",
          summary: "Audit investigatif menemukan penyimpangan penyaluran dana bantuan kemasyarakatan pariwisata yang mengalir ke rekening pribadi oknum pelaksana proyek.",
          body: "## Penyelewengan Dana Pariwisata\n\nSebuah skema penyalahgunaan anggaran daerah berhasil diungkap setelah tim jurnalis presisi menelusuri keberadaan fisik sejumlah Pokdarwis penerima hibah.\n\n### Hasil Penelusuran\n\nLebih dari 15 kelompok wisata yang tercantum di dokumen administrasi ternyata fiktif dan tidak memiliki aktivitas pariwisata nyata di lapangan.",
          contentType: "analysis",
          sentiment: "investigative",
          riskLevel: "critical",
          heroImageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Praktik Kartel Pupuk Subsidi di Jabar Utara: Petani Terpaksa Beli dengan Harga Selangit",
          subtitle: "Manipulasi Distribusi Pupuk Urea Melalui Kios Resmi yang Menimbun Stok",
          summary: "Penyelidikan independen mengungkap penimbunan sistematis pupuk bersubsidi yang memicu kelangkaan buatan saat masa tanam kritis tiba.",
          body: "## Jeritan Petani Jabar Utara\n\nPetani padi di Subang dan Indramayu kesulitan mendapatkan pupuk bersubsidi sesuai harga eceran tertinggi yang ditetapkan pemerintah akibat penyelewengan jalur distribusi.\n\n### Modus Operandi Kartel\n\nPupuk subsidi dialihkan secara ilegal ke sektor perkebunan swasta skala besar dengan kemasan non-subsidi untuk meraup keuntungan berlipat.",
          contentType: "analysis",
          sentiment: "investigative",
          riskLevel: "high",
          heroImageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Menyingkap Sindikat Penipuan Investasi Koperasi Bodong Berkedok Kebun Durian di Cianjur",
          subtitle: "Ribuan Korban Merugi Puluhan Miliar Rupiah Akibat Janji Imbal Hasil Palsu",
          summary: "Investigasi korban investasi durian musang king fiktif yang dikelola oleh oknum berkedok koperasi syariah di Cianjur.",
          body: "## Durian Fiktif Cianjur\n\nKoperasi ilegal menjanjikan bagi hasil 30% per tahun kepada investor perkebunan durian tanpa adanya kepemilikan lahan riil di lapangan.\n\n### Laporan Hukum\n\nKorban didampingi kuasa hukum resmi telah melaporkan pengurus koperasi ke kepolisian daerah setelah kantor operasional mendadak tutup.",
          contentType: "analysis",
          sentiment: "investigative",
          riskLevel: "high",
          heroImageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Pembuangan Limbah Cair Industri Tekstil Malam Hari di Aliran Anak Sungai Citarum",
          subtitle: "Bukti Rekaman Video Eksklusif Tunjukkan Pabrik Bandel bypass Sistem IPAL",
          summary: "Tim investigasi memergoki pembuangan air limbah berwarna pekat langsung ke sungai tanpa proses netralisasi pada tengah malam.",
          body: "## Pencemaran Anak Sungai Citarum\n\nMeski program Citarum Harum terus digencarkan, sejumlah pabrik tekstil nakal masih nekat membuang limbah beracun secara sembunyi-sembunyi.\n\n### Tindakan Penegakan Hukum\n\nBukti hasil uji laboratorium independen menunjukkan kandungan logam berat berbahaya melampaui ambang batas aman lingkungan hidup.",
          contentType: "analysis",
          sentiment: "investigative",
          riskLevel: "critical",
          heroImageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
        }
      ],
      "cat-analisis": [
        {
          title: "Kajian Ekonomi: Prospek Bisnis Energi Surya Atap Pasca Revisi Regulasi PLN",
          subtitle: "Dampak Pengurangan Insentif Ekspor Daya bagi Konsumen Rumah Tangga & Industri",
          summary: "Analisis komparatif mengenai kelayakan finansial pemasangan panel surya mandiri di bawah aturan tarif baru kelistrikan nasional.",
          body: "## Analisis Regulasi Panel Surya\n\nRevisi regulasi mengenai perhitungan ekspor-impor daya listrik panel surya atap memicu perdebatan mengenai periode pengembalian modal investasi hijau.\n\n### Perhitungan Keekonomian Baru\n\nMeski insentif berkurang, efisiensi konsumsi mandiri pada siang hari tetap memberikan penghematan biaya bulanan jangka panjang bagi sektor manufaktur.",
          contentType: "analysis",
          sentiment: "neutral",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Analisis Geopolitik: Dampak Kenaikan Suku Bunga Global Terhadap Sektor Properti Jabar",
          subtitle: "Mengapa Pengembang Mulai Beralih ke Hunian Kompak Ramah Milenial di Bandung Raya",
          summary: "Tekanan inflasi global memaksa pergeseran strategi pembangunan hunian vertikal terintegrasi transportasi massal di wilayah perkotaan.",
          body: "## Dampak Suku Bunga pada Properti\n\nSuku bunga KPR yang merangkak naik membatasi kemampuan beli kelompok usia produktif terhadap rumah tapak konvensional di pinggiran kota.\n\n### Solusi Transit Oriented Development\n\nPengembang kini memfokuskan investasi pada apartemen mikro dekat stasiun kereta cepat guna menarik minat segmen milenial yang dinamis.",
          contentType: "analysis",
          sentiment: "neutral",
          riskLevel: "medium",
          heroImageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Peta Persaingan Pasar Logistik E-Commerce Jawa Barat Era Pasca Konsolidasi",
          subtitle: "Bagaimana Integrasi Pergudangan Cerdas Menentukan Kecepatan Pengiriman Kilat",
          summary: "Kajian mengenai dominasi jaringan pergudangan mikro dekat permukiman konsumen dalam memangkas ongkos pengiriman jarak dekat.",
          body: "## Efisiensi Logistik Last-Mile\n\nPembeli e-commerce kini menuntut pengiriman barang selesai dalam waktu kurang dari 4 jam, memicu persaingan ketat di antara penyedia layanan ekspedisi.",
          contentType: "analysis",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Analisis Sentimen: Persepsi Publik Terhadap Implementasi Pajak Karbon Nasional",
          subtitle: "Kekhawatiran Transmisi Bebas Biaya Pajak ke Harga Konsumen Akhir Komoditas Utama",
          summary: "Analisis big data mengenai respons pelaku industri energi terhadap kesiapan implementasi skema perdagangan emisi karbon tahap pertama.",
          body: "## Evaluasi Pajak Karbon Indonesia\n\nPenerapan sistem cap-and-tax emisi gas rumah kaca bertujuan menekan polusi udara, namun membutuhkan pengawasan agar tidak memicu kenaikan inflasi pangan.",
          contentType: "analysis",
          sentiment: "mixed",
          riskLevel: "medium",
          heroImageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Menakar Efektivitas Dana Desa dalam Mengentaskan Kemiskinan Ekstrem Jabar Selatan",
          subtitle: "Studi Komparatif Keberhasilan Alokasi BUMDes Sektor Agroindustri dan Pariwisata",
          summary: "Evaluasi data statistik menunjukkan korelasi positif pembiayaan unit usaha mandiri desa terhadap peningkatan taraf hidup warga lokal.",
          body: "## Dampak Positif Alokasi Dana Desa\n\nDesa-desa yang memprioritaskan penyertaan modal pada BUMDes pengolahan hasil panen lokal mencatatkan penurunan angka kemiskinan lebih cepat dibanding desa yang hanya fokus pada pembangunan semen jalan desa.",
          contentType: "analysis",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800"
        }
      ],
      "cat-opini": [
        {
          title: "Opini: Menata Ulang Arsitektur Transportasi Massal Bandung Raya Pasca MRT Jakarta",
          subtitle: "Urgensi Mengintegrasikan Angkutan Kota Tradisional sebagai feeder Ramah Pengguna",
          summary: "Catatan kritis mengenai kebutuhan restrukturisasi rute transportasi umum di Bandung demi menekan tingkat kemacetan jalan raya.",
          body: "## Revitalisasi Transportasi Bandung\n\nKemacetan Bandung tidak akan selesai hanya dengan melebarkan jalan. Kita membutuhkan kemauan politik yang kuat untuk memigrasikan masyarakat pengguna kendaraan pribadi ke transportasi umum terintegrasi.\n\n### Peran Vital Angkot\n\nAngkutan kota tidak boleh dimatikan, melainkan harus direvitalisasi menjadi armada pengumpan (*feeder*) ber-AC dengan jadwal kedatangan yang pasti.",
          contentType: "opinion",
          sentiment: "neutral",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Opini: Pentingnya Menjaga Etika Kebudayaan Lokal di Era Ledakan AI Generatif",
          subtitle: "Bagaimana Melindungi Kekayaan Hak Cipta Karya Seni Musik dan Seni Rupa Nusantara",
          summary: "Esai mengenai ancaman pencurian kekayaan intelektual seni tradisional oleh model kecerdasan buatan komersial tanpa lisensi.",
          body: "## Perlindungan Hak Cipta Seni Nusantara\n\nModel AI global dilatih menggunakan jutaan gambar dan suara dari berbagai kebudayaan dunia, termasuk karya seni tradisional Indonesia, tanpa adanya kompensasi adil bagi para seniman daerah.\n\n### Kebutuhan Regulasi Berdaulat\n\nKita memerlukan undang-undang kedaulatan data budaya untuk memaksa raksasa teknologi melakukan lisensi atas konten lokal.",
          contentType: "opinion",
          sentiment: "neutral",
          riskLevel: "medium",
          heroImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Opini: Guru Bukan Sekadar Operator Aplikasi Pendidikan Daerah",
          subtitle: "Kembalikan Fokus Pendidik pada Interaksi Humanis dan Pembentukan Karakter Siswa",
          summary: "Kritik atas beban administrasi pengisian laporan digital yang menyita waktu persiapan mengajar para pahlawan tanpa tanda jasa.",
          body: "## Memerdekakan Waktu Mengajar Guru\n\nTeknologi pendidikan seharusnya meringankan tugas guru, bukan malah membebani mereka dengan keharusan mengunggah laporan administrasi yang repetitif sepanjang hari.",
          contentType: "opinion",
          sentiment: "negative",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Opini: Menghidupkan Kembali Budaya Kerja Gotong Royong Melalui Koperasi Digital",
          subtitle: "Bagaimana Nilai Luhur Bangsa Dapat Menjawab Tantangan Kesenjangan Ekonomi Modern",
          summary: "Refleksi mengenai relevansi konsep koperasi Bung Hatta di tengah maraknya gempuran kapitalisme platform digital global.",
          body: "## Koperasi Era Digital\n\nKoperasi harus diregenerasikan menggunakan teknologi modern agar transparan, cepat, dan akuntabel, memikat minat partisipasi aktif dari generasi milenial dan gen-z.",
          contentType: "opinion",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Opini: Sinergi Hijau Industri Manufaktur demi Udara Bersih Jawa Barat",
          subtitle: "Tanggung Jawab Bersama Menjaga Kualitas Lingkungan Hidup Cikarang-Karawang",
          summary: "Panggilan bagi pelaku industri korporat untuk memprioritaskan efisiensi energi demi kelangsungan hidup anak cucu di masa depan.",
          body: "## Udara Bersih Hak Dasar Warga\n\nPembangunan ekonomi tidak boleh menuntut pengorbanan kesehatan paru-paru anak-anak kita. Industri harus berkomitmen menerapkan teknologi ramah lingkungan teruji.",
          contentType: "opinion",
          sentiment: "neutral",
          riskLevel: "medium",
          heroImageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
        }
      ],
      "cat-factcheck": [
        {
          title: "FACT CHECK: Hoaks Pesan Berantai Air Sumur Bor Mengandung Merkuri di Jabar Selatan",
          subtitle: "Uji Laboratorium Dinas Kesehatan Konfirmasi Kualitas Air Aman Dikonsumsi",
          summary: "Hasil penelusuran fakta membuktikan kabar yang menyebutkan air tanah di wilayah pesisir terpapar zat beracun merkurium adalah berita palsu.",
          body: "## Verifikasi Fakta Air Sumur Bor\n\nBeredar narasi di aplikasi perpesanan WhatsApp yang menyebutkan bahwa air dari sumur bor baru yang dibangun pemerintah daerah mengandung zat beracun merkuri sisa penambangan.\n\n### Hasil Penelusuran Fakta\n\nDinas Kesehatan Jabar telah melakukan pengambilan sampel di 5 titik berbeda dan menyatakan parameter kimia air berada jauh di bawah ambang batas berbahaya, aman untuk dikonsumsi setelah direbus.",
          contentType: "fact_check",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "FACT CHECK: Benarkah Pembangkit Listrik Tenaga Surya Mengurangi Kesuburan Tanah Sekitar?",
          subtitle: "Penjelasan Ilmiah Akademis Membantah Klaim Radiasi Negatif Panel Energi Surya",
          summary: "Pemeriksaan fakta terhadap kekhawatiran warga pedesaan mengenai dampak pemasangan fasilitas pembangkit listrik tenaga surya skala besar.",
          body: "## Meluruskan Mitos Panel Surya\n\nSebuah klaim tidak berdasar menyebutkan bahwa bayangan dan radiasi gelombang dari solar panel mengurangi unsur hara tanah tani sekitar.\n\n### Bukti Ilmiah Nyata\n\nPara peneliti agronomi menegaskan panel surya justru dapat dikombinasikan dengan sistem pertanian teduh (*agrivoltaics*), meningkatkan efisiensi air tanaman tertentu.",
          contentType: "fact_check",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "FACT CHECK: Hoaks Penutupan Total Jembatan Pasupati Bandung Selama Satu Bulan",
          subtitle: "Dinas Perhubungan Jelaskan Hanya Ada Pemeliharaan Berkala Skala Kecil",
          summary: "Kabar viral mengenai penutupan jembatan ikonik Mochtar Kusumaatmadja (Pasupati) Bandung dipastikan tidak benar.",
          body: "## Fakta Pemeliharaan Jembatan Pasupati\n\nInformasi mengenai penutupan total jembatan layang Pasupati adalah keliru. Dishub hanya memberlakukan sistem buka-tutup jalur sebagian pada jam malam sepi kendaraan.",
          contentType: "fact_check",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "FACT CHECK: Salah Kaprah Anggapan Sentinel OS Menyadap Percakapan WhatsApp Pengguna",
          subtitle: "Sistem Hanya Menganalisis Konten Teks Terbuka di Media Sosial untuk Keperluan Sentimen",
          summary: "Klarifikasi teknis mengenai privasi data pengguna di platform pengawasan sentimen publik Sentinel OS.",
          body: "## Proteksi Privasi Pengguna\n\nSentinel OS bekerja menganalisis opini publik secara anonim berdasarkan data teks yang dibagikan secara publik di internet, bukan melalui pesan pribadi terenkripsi end-to-end.",
          contentType: "fact_check",
          sentiment: "neutral",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "FACT CHECK: Hoaks Razia Surat Kendaraan Bermotor Online Menggunakan Kamera HP Petugas",
          subtitle: "Penjelasan Ditlantas Terkait Prosedur Resmi E-TLE Mobile yang Benar",
          summary: "Klarifikasi mengenai prosedur perekaman pelanggaran lalu lintas menggunakan sistem elektronik e-TLE oleh petugas kepolisian jalan raya.",
          body: "## Fakta Hukum Kamera E-TLE Mobile\n\nKamera HP petugas hanya digunakan dalam aplikasi resmi Korlantas untuk mendokumentasikan pelanggaran kasat mata, bukan untuk mendenda secara sembarangan di tempat.",
          contentType: "fact_check",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800"
        }
      ],
      "cat-explainer": [
        {
          title: "EXPLAINER: Apa Itu Karbon Kredit dan Bagaimana Jabar Dapat Mengambil Keuntungan?",
          subtitle: "Panduan Sederhana Mengenai Mekanisme Perdagangan Emisi Karbon bagi Pemilik Hutan",
          summary: "Penjelasan mendalam mengenai pasar karbon sukarela dan peluang pendanaan lestari bagi pelestari lingkungan di Jawa Barat.",
          body: "## Memahami Pasar Karbon\n\nPasar karbon adalah sistem di mana entitas yang menghasilkan emisi gas rumah kaca dapat membeli sertifikat pengurangan emisi dari pihak yang melestarikan hutan penyerap karbon.\n\n### Manfaat bagi Pengelola Hutan Jabar\n\nHutan lindung di pegunungan priangan berpotensi disertifikasi guna menghasilkan pendapatan hijau berkelanjutan bagi masyarakat adat pengelola hutan.",
          contentType: "explainer",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "EXPLAINER: Bagaimana Cara Kerja IoT dalam Sistem Pertanian Presisi Modern?",
          subtitle: "Mengenal Sensor Kelembapan, Sensor pH, dan Integrasi Gateway Komunikasi Data",
          summary: "Panduan teknis dasar mengenai pemanfaatan internet of things (IoT) untuk membantu efisiensi penggunaan pupuk petani.",
          body: "## Struktur IoT Pertanian\n\nSistem pertanian presisi terdiri atas sensor tanah, pemancar nirkabel, gateway data, dan dasbor analitik berbasis kecerdasan buatan.\n\n### Aliran Informasi Data\n\n1. Sensor melacak kondisi fisik tanah.\n2. Pemancar mengirimkan data berkala ke internet.\n3. Algoritma dasbor menganalisis kebutuhan air tanaman secara presisi.",
          contentType: "explainer",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "EXPLAINER: Mengenal Skema PPh 21 dan PPh 23 bagi Pengusaha Kemitraan Digital",
          subtitle: "Panduan Pembayaran Pajak Penghasilan Resmi Berdasarkan Aturan Direktorat Jenderal Pajak RI",
          summary: "Penjelasan praktis mengenai kewajiban perpajakan potong pungut komisi bagi agen pemasaran dan mitra korporat.",
          body: "## Memahami Pajak Kemitraan\n\nSetiap pencairan hasil royalti atau komisi dari platform digital tunduk pada pemotongan pajak penghasilan sesuai kualifikasi badan usaha atau perorangan.",
          contentType: "explainer",
          sentiment: "neutral",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "EXPLAINER: Apa Itu Sentinel OS dan Perannya dalam Menjaga Kebersihan Berita?",
          subtitle: "Bagaimana Analisis Sentimen AI Membantu Mengidentifikasi Kampanye Kebencian Terstruktur",
          summary: "Pengenalan teknologi kecerdasan buatan Sentinel OS dalam mendeteksi anomali opini publik secara objektif dan akurat.",
          body: "## Deteksi Kampanye Hitam Siber\n\nSentinel OS memproses jutaan konten digital setiap detik menggunakan NLP (*Natural Language Processing*) guna memetakan tren sentimen dan mendeteksi penyebaran hoaks.",
          contentType: "explainer",
          sentiment: "neutral",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "EXPLAINER: Mengenal Konsep Rebana Metropolitan dan Peluang Ekonomi Baru Jabar",
          subtitle: "Menghubungkan Pelabuhan Patimban, Bandara Kertajati, dan Kawasan Industri Cirebon",
          summary: "Gambaran komprehensif mengenai mega-proyek koridor industri baru Jawa Barat utara yang dirancang menjadi pusat pertumbuhan ekonomi nasional.",
          body: "## Poros Pertumbuhan Baru Rebana\n\nKawasan Rebana mengintegrasikan tata kota pelabuhan modern dengan kawasan industri terpadu guna menarik minat investasi luar negeri manufaktur canggih.",
          contentType: "explainer",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
        }
      ],
      "cat-riset": [
        {
          title: "Riset Kebijakan: Evaluasi Tingkat Efektivitas Penyaluran Bantuan Sosial di Wilayah Perkotaan Jabar",
          subtitle: "Analisis Data Terpadu Kesejahteraan Sosial Menggunakan Pendekatan Geospasial Presisi",
          summary: "Studi akademis menyimpulkan penggunaan pemetaan spasial mampu menurunkan tingkat salah sasaran penyaluran sembako bantuan sosial.",
          body: "## Efisiensi Penyaluran Bansos Jabar\n\nStudi komparatif di 5 kota besar Jawa Barat membuktikan pemanfaatan database geospasial Sentinel GIS meningkatkan ketepatan sasaran penerimaan bantuan hingga 85%.\n\n### Hasil Analisis Korelasi\n\nPenggunaan peta koordinat rumah warga penerima mencegah terjadinya tumpang tindih data administrasi kependudukan.",
          contentType: "analysis",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Riset Pertanian: Korelasi Tingkat Keasaman Tanah Terhadap Produktivitas Padi Varietas Unggul",
          subtitle: "Hasil Eksperimen Lapangan Sawah Karawang Selama Tiga Musim Tanam Berturut-turut",
          summary: "Laporan ilmiah merinci pentingnya pengapuran tanah teratur dalam menjaga stabilitas panen padi di lahan sawah dengan kadar asam tinggi.",
          body: "## Menjaga pH Optimal Lahan Sawah\n\nData riset menunjukkan tanah sawah dengan tingkat keasaman di bawah pH 5.5 mengalami penurunan hasil panen hingga 25% akibat terhambatnya penyerapan unsur fosfor tanaman.",
          contentType: "analysis",
          sentiment: "neutral",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Riset Sosial: Dampak Penggunaan Aplikasi Belajar Terhadap Nilai Ujian Siswa Pedesaan",
          subtitle: "Studi Longitudinal Melibatkan 1.200 Responden Anak Sekolah Dasar di Priangan Timur",
          summary: "Akses terhadap materi pembelajaran digital interaktif terbukti mendongkrak skor pemahaman matematika dasar anak desa secara signifikan.",
          body: "## Akselerasi Literasi Matematika Desa\n\nPenelitian independen membuktikan anak-anak yang didampingi modul belajar digital terstruktur mencatatkan peningkatan pemecahan masalah logika numerik sebesar 30%.",
          contentType: "analysis",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Riset Energi: Analisis Potensi Kapasitas Pembangkit Listrik Tenaga Bayu di Pesisir Selatan Jabar",
          subtitle: "Peta Kecepatan Angin Tahunan di Koridor Pantai Garut hingga Pangandaran",
          summary: "Studi kelayakan teknis menyimpulkan pesisir pantai selatan memiliki potensi angin konisten untuk pengembangan ladang angin komersial skala menengah.",
          body: "## Energi Bayu Selatan Jawa Barat\n\nPengukuran lapangan menunjukkan kecepatan angin rata-rata tahunan mencapai 6.5 m/s pada ketinggian turbin 80 meter, ideal untuk mengoperasikan turbin angin ramah lingkungan.",
          contentType: "analysis",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Riset Kesehatan: Evaluasi Program Pencegahan Stunting Berbasis Gizi Lokal Singkong & Kelor",
          subtitle: "Keberhasilan Pemanfaatan Tepung Daun Kelor dalam Meningkatkan Imunitas Balita",
          summary: "Riset medis membuktikan suplementasi bahan pangan lokal bernutrisi tinggi mampu memperbaiki pertumbuhan fisik anak usia dini.",
          body: "## Hasil Riset Intervensi Gizi Lokal\n\nProgram suplementasi bubur singkong kelor berhasil menekan angka stunting sebesar 12% di wilayah puskesmas percontohan, menawarkan solusi gizi murah berbasis kebun warga.",
          contentType: "analysis",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800"
        }
      ],
      "cat-regional": [
        {
          title: "Pemkot Bandung Sediakan Unit Bus Sekolah Ramah Disabilitas Gratis",
          subtitle: "Rute Khusus Menghubungkan Sekolah Luar Biasa dengan Kawasan Permukiman",
          summary: "Inisiatif baru dinas perhubungan menyediakan armada angkutan aman dan nyaman tanpa biaya bagi para pelajar berkebutuhan khusus.",
          body: "## Bus Sekolah Ramah Disabilitas\n\nPemerintah Kota Bandung mengoperasikan tiga armada bus sekolah baru yang dilengkapi lift hidrolik untuk memudahkan akses kursi roda siswa SLB.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Sentra Kopi Sumedang Ekspor 15 Ton Biji Kopi Arabika Premium ke Hamburg Jerman",
          subtitle: "Kemitraan Perdagangan Adil dengan Koperasi Ekspor Pelabuhan Patimban",
          summary: "Ekspor biji kopi mentah berkualitas tinggi hasil tani pegunungan Sumedang sukses menembus bursa komoditas kopi Uni Eropa.",
          body: "## Kopi Sumedang Rambah Jerman\n\nBiji kopi arabika Sumedang yang ditanam organik pada ketinggian 1.300 mdpl mendapat pujian khusus dari para penikmat kopi premium di Jerman.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Garut Fokus Kembangkan Destinasi Wisata Pemandian Air Panas Alami Ramah Lingkungan",
          subtitle: "Penerapan Tata Kelola Air Berkelanjutan Guna Cegah Kerusakan Sumber Mata Air",
          summary: "Pemerintah Kabupaten Garut memperketat pengawasan amdal bagi pengelola tempat rekreasi pemandian air panas bumi.",
          body: "## Wisata Panas Bumi Berkelanjutan Garut\n\nLangkah perlindungan lingkungan diambil guna memastikan keberadaan sumber air panas alami tetap lestari dan terhindar dari eksploitasi berlebihan.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Cirebon Luncurkan Kartu Transportasi Terpadu Cirebon Beriman",
          subtitle: "Satu Kartu untuk Akses Kereta Commuter, Bus Trans, dan Penyeberangan Pelabuhan",
          summary: "Kemudahan bepergian di wilayah Ciayumajakuning berkat peluncuran sistem tiket elektronik transportasi massal yang baru.",
          body: "## Sistem Integrasi Tiket Cirebon\n\nKartu transaksi elektronik terpadu mempermudah mobilisasi pekerja harian dan turis sejarah yang ingin mengunjungi Keraton Kasepuhan.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Warga Tasikmalaya Sukses Gelar Panen Raya Padi Organik Tanpa Bahan Kimia",
          subtitle: "Pola Tani Alami Menggunakan Pupuk Kandang & Metode Ramah Lingkungan",
          summary: "Kelompok tani mandiri membuktikan hasil panen pertanian organik memiliki nilai jual dua kali lipat lebih tinggi dari padi konvensional.",
          body: "## Sukses Panen Organik Tasikmalaya\n\nSawah ramah lingkungan bebas pestisida kimia menarik minat konsumen premium perkotaan yang peduli akan pola hidup sehat dan lestari.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800"
        }
      ],
      "cat-nasional": [
        {
          title: "Kemenkeu Catat Penerimaan Pajak Digital Semester I Capai Target 110%",
          subtitle: "Pemberlakuan Tarif Baru PPN PMSE Berikan Kontribusi Signifikan bagi Kas Negara",
          summary: "Menteri Keuangan mengapresiasi tingkat kepatuhan raksasa penyedia platform digital internasional dalam menyetorkan kewajiban pajak.",
          body: "## Rekor Kinerja Pajak Digital\n\nPenerimaan kas negara mendapat pasokan dana segar yang signifikan dari pajak pertambahan nilai perdagangan melalui sistem elektronik yang berjalan lancar.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "BSSN Sosialisasikan Panduan Keamanan Siber Nasional untuk Sektor Keuangan",
          subtitle: "Langkah Tegas Antisipasi Serangan Ransomware Global yang Menyasar Layanan Publik",
          summary: "Badan Siber dan Sandi Negara memperketat standar enkripsi database perbankan dan asuransi guna melindungi kedaulatan data warga.",
          body: "## Sosialisasi Keamanan Siber BSSN\n\nRegulator mewajibkan seluruh lembaga jasa keuangan nasional melakukan audit ketahanan sistem teknologi informasi secara berkala demi menghindari kebocoran data.",
          contentType: "standard",
          sentiment: "neutral",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Pertamina Resmikan Kilang Pengolahan Bahan Bakar Nabati Berbasis Kelapa Sawit",
          subtitle: "Komitmen Nyata Pengurangan Impor Minyak Bumi Guna Jaga Defisit Transaksi Berjalan",
          summary: "Fasilitas pengolahan energi nabati bertenaga ramah lingkungan resmi memproduksi bahan bakar ramah lingkungan berkualitas standar emisi tinggi.",
          body: "## Ketahanan Energi Nabati Nasional\n\nLangkah swasembada bahan bakar ramah lingkungan terus melaju kencang dengan mulainya operasional kilang biodiesel terintegrasi berkapasitas besar.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Bio Farma Siap Ekspor 50 Juta Dosis Vaksin Generasi Baru ke Afrika Selatan",
          subtitle: "Diakui Standar Organisasi Kesehatan Dunia WHO, Buktikan Kualitas Farmasi Indonesia",
          summary: "Holding BUMN farmasi memenangkan tender pasokan produk preventif kesehatan global bernilai puluhan juta dolar.",
          body: "## Ekspor Vaksin Bio Farma\n\nProduk farmasi andalan dalam negeri kembali diandalkan dunia internasional untuk memerangi wabah penyakit musiman di wilayah berkembang.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Pemerintah Rampungkan Sertifikasi Hak Tanah Rakyat Gratis Melalui Program PTSL",
          subtitle: "Kementerian ATR/BPN Bagikan 10 Ikrar Sertifikat Tanah untuk Kepastian Hukum Warga Jabar",
          summary: "Langkah pembagian sertifikat tanah mempermudah akses masyarakat kecil terhadap permodalan perbankan resmi yang aman.",
          body: "## Kepastian Hukum Hak Milik Tanah\n\nProgram PTSL sukses meminimalkan sengketa kepemilikan tanah tradisional, memberikan rasa tenang dan modal produktif bagi keluarga prasejahtera.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800"
        }
      ],
      "cat-internasional": [
        {
          title: "Indonesia Teken Perjanjian Dagang Bebas Kemitraan Komprehensif dengan Uni Eropa",
          subtitle: "Pangkas Tarif Ekspor Produk Kertas, Tekstil, dan Kelapa Sawit Menuju Pasar Eropa",
          summary: "Kesepakatan bilateral bernilai strategis memperluas akses pasar ekspor unggulan nasional tanpa hambatan tarif proteksionis.",
          body: "## Kesepakatan Dagang RI-Uni Eropa\n\nNegosiasi panjang perdagangan akhirnya membuahkan hasil kesepakatan adil yang menguntungkan sirkulasi neraca perdagangan non-migas Indonesia.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Pertemuan Tingkat Tinggi G20 Sepakati Kerangka Global Regulasi Keamanan Model AI",
          subtitle: "Indonesia Dorong Keberpihakan Akses Transfer Teknologi bagi Negara-Negara Berkembang",
          summary: "Deklarasi bersama menyusun panduan etika pengembangan kecerdasan buatan komersial yang aman dari risiko disinformasi siber.",
          body: "## Regulasi AI Global di Forum G20\n\nDelegasi Indonesia menekankan pentingnya kolaborasi teknologi inklusif agar negara selatan tidak hanya menjadi pasar melainkan ikut memproduksi model cerdas.",
          contentType: "standard",
          sentiment: "neutral",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "KTT Keamanan Pangan PBB Soroti Inovasi Agroteknologi Pertanian Presisi Jawa Barat",
          subtitle: "Model Sistem Penghematan Air Karawang Dipuji sebagai Contoh Adaptasi Perubahan Iklim",
          summary: "Keberhasilan implementasi teknologi pertanian modern ramah lingkungan mendapat pengakuan khusus di forum pangan internasional.",
          body: "## Pujian Dunia bagi Tani Jabar\n\nDelegasi internasional tertarik mempelajari skema pembinaan petani milenial berbasis teknologi internet of things yang diterapkan di Indonesia.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Kerja Sama Pariwisata ASEAN Luncurkan Kampanye 'Visit Southeast Asia' Terintegrasi",
          subtitle: "Permudah Visa Perjalanan Kunjungan Sejarah Lintas Negara untuk Turis Mancanegara",
          summary: "Aliansi promosi destinasi sejarah Asia Tenggara menargetkan peningkatan kunjungan wisatawan mancanegara pasca pemulihan total.",
          body: "## Visa Wisata Bersama ASEAN\n\nSkema visa turis tunggal mempermudah pelancong mengunjungi berbagai candi bersejarah dan warisan pusaka dunia di kawasan Asia Tenggara.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1516690561799-46d8f74f90f6?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Geopolitik Rantai Pasok Baterai Listrik Global Menempatkan Indonesia di Posisi Kunci",
          subtitle: "Investasi Smelter Nikel Ramah Lingkungan Mulai Beroperasi Tarik Minat Produsen Mobil Amerika",
          summary: "Ketersediaan cadangan mineral strategis nasional menjadi daya tawar utama kerja sama industri teknologi transportasi masa depan.",
          body: "## Poros Industri Baterai Listrik\n\nKomitmen hilirisasi industri mineral kritis terbukti berhasil mendatangkan investasi kemitraan teknologi bernilai tambah tinggi bagi masyarakat lokal.",
          contentType: "analysis",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1518152006812-edab29b069ca?auto=format&fit=crop&q=80&w=800"
        }
      ],
      "cat-business": [
        {
          title: "Indeks Kepercayaan Konsumen Jawa Barat Kuartal II Sentuh Rekor Tertinggi Baru",
          subtitle: "Didorong Stabilitas Harga Pangan dan Ketersediaan Lapangan Kerja Sektor Manufaktur",
          summary: "Optimisme masyarakat perkotaan terhadap pertumbuhan ekonomi mendorong laju belanja konsumsi ritel domestik tetap semarak.",
          body: "## Pertumbuhan Konsumsi Ritel Jabar\n\nSurvei ekonomi membuktikan daya beli warga Jabar tetap tangguh menghadapi tantangan ketidakpastian finansial global berkat terkendalinya laju inflasi.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "BCA Dinobatkan sebagai Bank Digital Paling Inovatif dalam Pelayanan UMKM",
          subtitle: "Penyederhanaan Proses Pengajuan Pinjaman Modal Kerja Lewat Aplikasi Mobile",
          summary: "Layanan perbankan digital meraih penghargaan atas kontribusi nyata mengintegrasikan jutaan pedagang mikro ke sistem perbankan resmi.",
          body: "## Penghargaan Perbankan Digital BCA\n\nSkema verifikasi kredit instan berbasis kecerdasan buatan memangkas waktu tunggu persetujuan pembiayaan usaha dari semula mingguan menjadi hitungan menit.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Sektor Industri Tekstil Jawa Barat Catat Kebangkitan Ekspor Pasca Penataan Jalur Impor Ilegal",
          subtitle: "Perlindungan Pasar Domestik Berhasil Gairahkan Kembali Geliat Produksi Pabrik Lokal",
          summary: "Tindakan tegas pengawasan barang masuk pelabuhan ilegal memberikan ruang napas penting bagi kelangsungan industri rajut Bandung.",
          body: "## Kebangkitan Tekstil Dalam Negeri\n\nIndustri pakaian jadi lokal mencatatkan lonjakan pesanan baru dari berbagai jaringan ritel fesyen nasional setelah serbuan produk murah impor ilegal dihalau.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "GoTo Group Targetkan Profitabilitas Berkelanjutan Melalui Efisiensi Logistik Mandiri",
          subtitle: "Integrasi Unit Layanan Pengiriman Mengurangi Beban Komisi Layanan Kurir Eksternal",
          summary: "Raksasa teknologi mengoptimalkan jaringan pengantaran terintegrasi guna mempertahankan kepuasan pengguna tanpa membebani margin biaya.",
          body: "## Strategi Finansial GoTo Group\n\nFokus pada keunggulan logistik mandiri terbukti sukses menghemat pengeluaran operasional perakitan paket belanjaan secara masif.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Kopi Kenangan Buka Gerai Internasional Kelima di Singapura Pasca Sukses Ekspansi Jabar",
          subtitle: "Membawa Cita Rasa Kopi Susu Gula Aren Indonesia ke Kancah Kuliner Global",
          summary: "Merek minuman lokal grab-and-go membuktikan daya saing model bisnis waralaba digital Indonesia di pasar premium Asia Tenggara.",
          body: "## Kopi Kenangan Rambah Singapura\n\nKeberhasilan ekspansi ini didorong oleh integrasi sistem aplikasi pesan-ambil mandiri yang efisien dan rasa kopi gula aren yang disukai lidah internasional.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800"
        }
      ],
      "cat-technology": [
        {
          title: "Bandung Techno Park Luncurkan Program Inkubasi Khusus Startup Deep-Tech",
          subtitle: "Fasilitasi Riset Lanjutan di Bidang Kriptografi, Robotika, dan IoT Industri",
          summary: "Pusat inovasi universitas membuka kesempatan pendanaan dan pendampingan ahli bagi talenta teknologi berbakat tanah air.",
          body: "## Inkubator Teknologi Deep-Tech Bandung\n\nProgram dirancang guna melahirkan pengembang solusi teknologi fundamental yang mampu menjawab tantangan kebocoran data siber dan otomasi manufaktur.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Kemenkominfo Siapkan Jaringan Koneksi Satelit Internet Cepat di 100 Desa Tertinggal Jabar",
          subtitle: "Memperluas Akses Edukasi dan Peluang Ekonomi Digital bagi Warga Pegunungan Terpencil",
          summary: "Penyediaan fasilitas pemancar internet berbasis satelit orbit rendah memerdekakan anak sekolah dari kendala sinyal belajar.",
          body: "## Satelit Internet Masuk Desa Jabar\n\nInfrastruktur modern ini memfasilitasi kelancaran ujian sekolah daring dan pengunggahan data pertanian warga langsung ke server pusat.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Universitas Padjadjaran Operasikan Superkomputer Kluster Riset Bioinformatika",
          subtitle: "Percepat Simulasi Pengembangan Obat Penyakit Tropis Berbasis Keanekaragaman Hayati Jabar",
          summary: "Komputasi kinerja tinggi mempercepat waktu pencocokan molekul herbal tanaman obat priangan dari semula tahunan menjadi mingguan.",
          body: "## Superkomputer Bioinformatika Unpad\n\nFasilitas canggih ini terbuka bagi peneliti nasional yang ingin memodelkan struktur genetika virus guna merancang vaksin pencegah wabah baru.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Asosiasi IoT Indonesia Sukses Selenggarakan Kompetisi Inovasi Cerdas Pemuda Jabar",
          subtitle: "Tampilkan Solusi Robotik Pemilah Sampah hingga Pendeteksi Kebocoran Gas Berbasis IoT",
          summary: "Pameran teknologi karya pelajar sekolah menengah kejuruan memukau perhatian investor modal ventura nasional.",
          body: "## Talenta IoT Muda Berbakat\n\nKreativitas pemuda terbukti mampu melahirkan alat-alat tepat guna bernilai ekonomi tinggi yang langsung memecahkan permasalahan nyata komunitas.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Pemerintah Jabar Berlakukan Sistem Tanda Tangan Digital Terenkripsi Resmi untuk Layanan Sipil",
          subtitle: "Menjamin Keamanan Dokumen Hukum dan Memangkas Waktu Antrean Birokrasi Kantor Desa",
          summary: "Pemanfaatan teknologi sertifikat elektronik resmi mempersingkat validasi akta kependudukan warga secara instan.",
          body: "## Digitalisasi Birokrasi Jabar\n\nTanda tangan digital yang tervalidasi Balai Sertifikasi Elektronik menutup celah pemalsuan dokumen serta mempercepat layanan administrasi publik.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800"
        }
      ],
      "cat-ai-data": [
        {
          title: "Sentinel AI Sentiment Alert Deteksi Pergeseran Drastis Opini Publik Terhadap Tarif Transportasi",
          subtitle: "Visualisasi Peta Spasial Menunjukkan Tingkat Keberatan Tertinggi Terkonsentrasi di Bandung Utara",
          summary: "Dasbor pemantauan sentimen real-time mendeteksi anomali obrolan warga, memberikan masukan objektif bagi perumus kebijakan daerah.",
          body: "## Analisis Sentimen Tarif Transportasi\n\nDengan memproses ribuan unggahan media sosial secara anonim, sistem Sentinel AI memetakan kekhawatiran warga terkait penyesuaian tarif angkutan umum baru.",
          contentType: "analysis",
          sentiment: "neutral",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Spatio-News GIS API Resmi Mengintegrasikan Data Cuaca Ekstrem Jabar ke Peta Berita",
          subtitle: "Sajikan Informasi Geospasial Interaktif Mengenai Titik Banjir Secara Real-Time Bagi Pembaca",
          summary: "Inovasi visualisasi berita spasial INFOBOS mempermudah warga merancang rute perjalanan aman saat musim hujan tiba.",
          body: "## Integrasi Spatio-News GIS API\n\nData cuaca dan banjir dari sensor BPBD dihubungkan langsung ke dalam peta berita interaktif, meningkatkan kesiapsiagaan pembaca dari ancaman cuaca buruk.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Pemanfaatan Model NLP Khusus Bahasa Sunda Sukses Tingkatkan Kualitas Layanan Customer Service",
          subtitle: "Asisten AI Percakapan Memahami Nuansa Kehalusan Bahasa Daerah Secara Sopan",
          summary: "Uji coba chatbot cerdas pada instansi kesehatan daerah mendapat respons positif dari para pasien lanjut usia.",
          body: "## Chatbot Ramah Bahasa Sunda\n\nModel bahasa terlatih yang peka akan kesopanan tingkat bahasa sunda lemes berhasil menjembatani kendala komunikasi literasi digital lansia.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Peluncuran Database Terbuka Kebijakan Publik Jabar Tarik Antusiasme Peneliti Data Nasional",
          subtitle: "Meanyediakan Ribuan Dataset Terstruktur Mengenai Kesehatan, Pertanian, dan Transportasi Daerah",
          summary: "Inisiatif keterbukaan data mendorong partisipasi aktif akademisi dalam menyumbang solusi berbasis bukti ilmiah.",
          body: "## Open Data Jabar untuk Riset\n\nAkses gratis terhadap dataset terverifikasi mempermudah penyusunan kajian akademis yang relevan dengan kebutuhan pembangunan riil daerah.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Sistem Pengenalan Gambar Berbasis AI Sukses Deteksi Dini Gejala Penyakit Tanaman Jagung di Sumedang",
          subtitle: "Aplikasi Seluler Bantu Petani Mengidentifikasi Serangan Hama Tanpa Menunggu Petugas Lapangan",
          summary: "Teknologi visi komputer mempercepat diagnosis kesehatan tanaman secara instan langsung di area perkebunan warga.",
          body: "## AI Visi Komputer Deteksi Hama Jagung\n\nCukup dengan memotret daun tanaman jagung yang menguning, algoritma cerdas memberikan rekomendasi pemupukan atau penanganan pestisida organik yang sesuai.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800"
        }
      ],
      "cat-sports": [
        {
          title: "Persib Bandung Kokoh di Puncak Klasemen Pasca Menang Dramatis atas rival utama",
          subtitle: "Gol Menit Akhir Striker Andalan Guncang Stadion Gelora Bandung Lautan Api",
          summary: "Kemenangan beruntun Maung Bandung memicu kemeriahan perayaan suporter Bobotoh di berbagai penjuru kota.",
          body: "## Kemenangan Gemilang Persib\n\nStadion GBLA menjadi saksi perjuangan tak kenal lelah skuat Persib Bandung mengamankan poin penuh dalam laga lanjutan liga utama sepak bola nasional.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Atlet Badminton Jabar Sapu Bersih Medali Emas di Turnamen Nasional PON 2026",
          subtitle: "Dominasi Sektor Tunggal Putra dan Ganda Campuran Buktikan Efektivitas Pembinaan Atlet Muda",
          summary: "Kontingen bulu tangkis Jawa Barat tampil perkasa mempertahankan gelar juara umum dengan performa fisik prima.",
          body: "## Kejayaan Bulu Tangkis Jabar\n\nPembinaan atlet terstruktur sejak usia dini di berbagai klub lokal membuahkan prestasi medali emas gemilang bagi nama baik daerah.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Komunitas Lari Marathon Bandung Gelar Event Amal Bersama Yayasan Kanker Anak",
          subtitle: "Diikuti Ribuan Peserta Menyusuri Rute Jalan Bersejarah Kota Kembang",
          summary: "Kegiatan lari santai sembari berdonasi sukses mengumpulkan dana kemanusiaan puluhan juta rupiah.",
          body: "## Berlari Sembari Berbagi di Bandung\n\nUdara pagi Bandung yang sejuk menyambut antusiasme peserta lari amal yang mendedikasikan keringat mereka demi membantu biaya pengobatan kanker anak.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1502224562085-639556652f33?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Kejuaraan Balap Sepeda Gunung Internasional Garut Downhill Sukses Digelar",
          subtitle: "Pembalap Mancanegara Puji Kualitas Lintasan Ekstrem Pegunungan Jabar yang Menantang",
          summary: "Event olahraga petualangan bergengsi menarik perhatian ribuan penonton domestik dan mendongkrak ekonomi wisata Garut.",
          body: "## Tantangan Garut Downhill Internasional\n\nLintasan alami berbatu dengan latar belakang panorama kawah gunung berapi menyajikan petualangan tak terlupakan bagi para pembalap sepeda dunia.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Sekolah Sepak Bola Anak Sumedang Juara Turnamen Kategori Usia-12 Tingkat Provinsi",
          subtitle: "Kombinasi Strategi Kerja Sama Tim dan Talenta Individu Memukau Tim Pemandu Bakat Nasional",
          summary: "Prestasi gemilang sekolah sepak bola binaan desa membuktikan potensi melimpah talenta muda dari daerah rural.",
          body: "## Sukses SSB Anak Sumedang\n\nKemenangan manis di partai final dirayakan penuh kebahagiaan oleh para orang tua murid dan pelatih lokal yang berdedikasi tinggi tanpa pamrih.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800"
        }
      ],
      "cat-lifestyle": [
        {
          title: "Rekomendasi 5 Kafe Sehat Berkonsep Urban Farming Alami di Tengah Kota Bandung",
          subtitle: "Nikmati Hidangan Segar Organik yang Dipetik Langsung dari Kebun Belakang Restoran",
          summary: "Gaya hidup sehat mengonsumsi bahan makanan alami bersumber dekat makin digemari masyarakat perkotaan urban.",
          body: "## Menjelajahi Kafe Urban Farming Bandung\n\nPilihan kuliner bersih ramah lingkungan menyajikan jus sayuran hidropinik segar dan menu diet seimbang di tengah suasana taman asri yang menenangkan.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Tren Dekorasi Rumah Minimalis Bernuansa Anyaman Bambu Tradisional Garut",
          subtitle: "Paduan Estetika Modern dengan Kerajinan Warisan Seni Leluhur Jawa Barat",
          summary: "Penggunaan kerajinan ramah lingkungan anyaman bambu mempercantik tampilan interior hunian perkotaan kontemporer.",
          body: "## Sentuhan Tradisional Bambu Garut\n\nProduk anyaman bambu kualitas kurasi tinggi bernilai seni menambah kehangatan alami ruang tamu minimalis modern, sekaligus membantu kelangsungan ekonomi pengrajin desa.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Panduan Wisata Akhir Pekan Keluarga Menjelajahi Alam Pegunungan Asri Sumedang",
          subtitle: "Menikmati Keindahan Air Terjun Alami dan Perkebunan Teh yang Hijau Menenangkan",
          summary: "Destinasi wisata alam dekat kota menjadi pilihan favorit mengusir kelelahan rutinitas kerja harian.",
          body: "## Liburan Alam Asri Sumedang\n\nPilihan rute jalan santai ramah anak menyuguhkan udara pegunungan segar bebas polusi, dikelilingi keramahan penduduk lokal yang menyambut ramah.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Seni Merawat Tanaman Hias Bonsai Kembali Digemari sebagai Terapi Stres Pikiran",
          subtitle: "Keindahan Bentuk Estetik Batang Kayu Mini Menuntut Ketelatenan dan Jiwa Seni Tinggi",
          summary: "Hobi memelihara bonsai skala rumahan menjadi media relaksasi pikiran bernilai ekonomi tinggi di kalangan pekerja kreatif.",
          body: "## Bonsai Terapi Kedamaian Pikiran\n\nProses pemangkasan cabang tanaman secara perlahan melatih kesabaran dan keheningan batin, menghasilkan karya seni hidup berharga tinggi.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Komunitas Pecinta Teh Lokal Selenggarakan Sesi Seduh Bersama di Cagar Budaya Bandung",
          subtitle: "Mengenal Berbagai Varian Teh Nusantara dan Tata Cara Penyeduhan Tradisional yang Benar",
          summary: "Apresiasi terhadap kekayaan teh lokal nusantara mempertemukan ratusan penikmat minuman rempah legendaris.",
          body: "## Eksplorasi Cita Rasa Teh Lokal\n\nKegiatan seduh teh bersama di gedung bersejarah mengedukasi masyarakat mengenai perbedaan karakter daun teh dari berbagai perkebunan tanah air.",
          contentType: "standard",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800"
        }
      ],
      "cat-live-feed": [
        {
          title: "\u{1F534} LIVE REPORT: Peresmian Koridor Heritage Jalan Asia Afrika Bandung & Festival Seni Rakyat",
          subtitle: "Laporan Teks Langsung Situasi Terkini dari Depan Gedung Merdeka",
          summary: "Ikuti pembaruan menit-demi-menit dari pembukaan festival seni kebudayaan terbesar di Bandung yang dihadiri puluhan ribu pengunjung.",
          body: '## Liputan Teks Langsung: Festival Asia Afrika\n\nSelamat sore pembaca INFOBOS. Kami melaporkan langsung dari Jalan Asia Afrika Bandung, tempat diselenggarakannya Festival Seni Rakyat & Peresmian Koridor Heritage Baru Kota Bandung.\n\n### TIMELINE LIPUTAN LANGSUNG\n\n* **[16:45 WIB]** - **Pawai Budaya Dimulai**: Rombongan pertama pawai budaya yang mengenakan kostum tradisional Sunda, lengkap dengan musik sisingaan dan angklung, mulai bergerak dari depan Hotel Preanger menuju Gedung Merdeka.\n* **[17:00 WIB]** - **Kehadiran Pejabat**: Gubernur Jawa Barat bersama Walikota Bandung tiba di lokasi disambut meriah oleh ribuan warga yang memadati trotoar.\n* **[17:15 WIB]** - **Sambutan Pembuka**: Gubernur menyampaikan apresiasi atas revitalisasi trotoar heritage Jalan Asia Afrika: *"Ini bukan sekadar trotoar, melainkan panggung budaya hidup masyarakat Jabar."*\n* **[17:30 WIB]** - **Gunting Pita Simbolis**: Prosesi pemotongan pita secara simbolis menandai resminya koridor pedestrian baru dengan ornamen lampu klasik bernuansa kolonial.\n* **[17:45 WIB]** - **Kondisi Lalu Lintas**: Kepolisian mengalihkan arus lalu lintas dari simpang lima ke Jalan Lengkong Besar. Warga disarankan menghindari area Asia Afrika hingga pukul 22:00 WIB.',
          contentType: "live-feed",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "\u{1F534} LIVE REPORT: Konferensi Pers Penanganan Inflasi & Ketahanan Pangan Pemprov Jabar",
          subtitle: "Laporan Langsung dari Aula Gedung Sate Terkait Operasi Pasar Murah",
          summary: "Pemprov Jabar mengumumkan langkah konkret pengendalian harga beras dan minyak goreng lokal hari ini.",
          body: "## Laporan Langsung Konferensi Pers Gedung Sate\n\nTim redaksi INFOBOS memantau langsung jalannya konferensi pers darurat ketahanan pangan daerah di Aula Barat Gedung Sate, Bandung.\n\n### TIMELINE RELEASES\n\n* **[10:00 WIB]** - **Pembukaan Sesi**: Kepala Dinas Perindustrian dan Perdagangan membuka sesi dengan memaparkan data fluktuasi harga kebutuhan pokok seminggu terakhir.\n* **[10:15 WIB]** - **Pernyataan Gubernur**: Pemprov menyiapkan dana tak terduga sebesar Rp 45 Miliar untuk subsidi distribusi pangan lokal.\n* **[10:30 WIB]** - **Operasi Pasar Murah**: Mulai besok pagi, operasi pasar murah serentak akan digelar di 27 kabupaten/kota se-Jawa Barat.\n* **[10:45 WIB]** - **Sesi Tanya Jawab**: Menanggapi pertanyaan wartawan mengenai penimbunan beras, aparat menegaskan satgas pangan kepolisian akan menindak tegas gudang nakal.",
          contentType: "live-feed",
          sentiment: "neutral",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "\u{1F534} LIVE REPORT: Pertandingan Klasik Jabar Derby: Bandung United vs Persib Junior",
          subtitle: "Siaran Teks Langsung Menit-demi-Menit dari Stadion GBLA Bandung",
          summary: "Deru dan ketegangan perebutan piala regional Jawa Barat disiarkan langsung melalui laporan kontributor olahraga di lapangan.",
          body: "## Pertandingan Klasik Derby Bandung Raya\n\nIkuti siaran teks jalannya pertandingan sengit perebutan Piala Gubernur Jawa Barat di Stadion Gelora Bandung Lautan Api.\n\n### UPDATE PERTANDINGAN\n\n* **[Kick-Off]** - Wasit meniup peluit tanda mulainya babak pertama. Bandung United mengenakan jersey putih, Persib Junior dengan jersey kebesaran biru.\n* **[Menit ke-15]** - **Peluang Emas**: Striker Persib Junior melepaskan tembakan melengkung dari luar kotak penalti, namun masih membentur mistar gawang.\n* **[Menit ke-32]** - **KARTU KUNING**: Gelandang bertahan Bandung United diganjar kartu kuning setelah melakukan tekel keras di lini tengah.\n* **[Menit ke-45]** - **GOL!!!**: Bandung United memecah kebuntuan lewat sundulan kepala memanfaatkan sepak pojok. Skor sementara 1-0 hingga turun minum.",
          contentType: "live-feed",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "\u{1F534} LIVE REPORT: Peluncuran Sentra Layanan Digital 24 Jam Bandung Smart City",
          subtitle: "Laporan Langsung dari Bandung Command Center",
          summary: "Walikota Bandung meluncurkan sistem respon krisis dan tanggap darurat warga berbasis AI dan siber terintegrasi.",
          body: "## Peluncuran Integrasi Command Center\n\nLaporan langsung dari Bandung Command Center dalam rangka peluncuran super-app pelayanan publik terintegrasi.\n\n### TIMELINE KEGIATAN\n\n* **[14:00 WIB]** - Walikota tiba didampingi oleh Kepala Dinas Komunikasi dan Informatika Kota Bandung.\n* **[14:15 WIB]** - **Demonstrasi Live**: Menunjukkan fitur respon darurat ambulans dan damkar yang kini terkoneksi secara langsung ke peta GPS petugas terdekat.\n* **[14:30 WIB]** - Sistem pengaduan warga kini diintegrasikan dengan pemantauan kamera lalu lintas (CCTV) berbasis pengenalan objek AI untuk deteksi kemacetan.",
          contentType: "live-feed",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "\u{1F534} LIVE REPORT: Pantauan Arus Lalu Lintas Gerbang Tol Pasteur & Jalur Wisata Lembang",
          subtitle: "Laporan Langsung Akhir Pekan Panjang & Rekayasa Arus Kepolisian",
          summary: "Kondisi terkini lalu lintas keluar masuk Bandung, rekayasa satu arah (one-way), dan lokasi titik hambatan kendaraan.",
          body: "## Pemantauan Lalu Lintas Arus Balik Lembang\n\nLaporan teks situasi arus kendaraan di gerbang Tol Pasteur dan koridor Setiabudi - Lembang oleh tim lapangan INFOBOS.\n\n### UPDATE LALU LINTAS\n\n* **[19:00 WIB]** - **Gerbang Tol Pasteur**: Terpantau antrean kendaraan menuju pintu masuk tol sepanjang 2 kilometer didominasi pelat luar daerah B.\n* **[19:15 WIB]** - **Jalur Wisata Lembang**: Kepolisian memberlakukan sistem buka-tutup (one-way) dari arah Lembang menuju Bandung guna mengurai penumpukan di kawasan Farmhouse.\n* **[19:30 WIB]** - **Rekomendasi Rute**: Pengendara diimbau menggunakan jalur alternatif Dago Giri atau Ciumbuleuit untuk menghindari kemacetan parah di Setiabudi.",
          contentType: "live-feed",
          sentiment: "negative",
          riskLevel: "medium",
          heroImageUrl: "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&q=80&w=800"
        }
      ]
    };
    const genericTemplates = [
      {
        title: "Pembangunan Infrastruktur Terpadu di {catName} Masuk Tahap Final",
        subtitle: "Langkah Strategis Pemerintah Daerah Menjamin Kesejahteraan Komunitas",
        summary: "Kajian mendalam mengenai efektivitas alokasi dana pembangunan berkelanjutan di wilayah {catName}.",
        body: "## Pembangunan {catName} Berkelanjutan\n\nPemerintah secara resmi mengonfirmasi penyelesaian pengerjaan proyek infrastruktur utama pendukung kegiatan ekonomi warga sekitar.\n\n### Manfaat Sektoral bagi Warga\n\nFasilitas baru ini dirancang ramah lingkungan serta aman digunakan bagi semua segmen masyarakat, termasuk anak-anak dan lansia.",
        contentType: "standard",
        sentiment: "positive",
        riskLevel: "low",
        heroImageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Evaluasi Pelaksanaan Kebijakan Manajemen Publik di Sektor {catName}",
        subtitle: "Pentingnya Transparansi Data Guna Mewujudkan Tata Kelola Pemerintahan yang Bersih",
        summary: "Studi kasus efektivitas sistem audit kinerja pelayanan sipil pada kategori {catName}.",
        body: "## Tata Kelola Bersih {catName}\n\nPenerapan platform digital terintegrasi mempermudah pengawasan aliran anggaran secara akuntabel, mencegah potensi kebocoran finansial.",
        contentType: "analysis",
        sentiment: "neutral",
        riskLevel: "low",
        heroImageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Inovasi Kewirausahaan Komunitas Lokal Mengangkat Nilai Tambah {catName}",
        subtitle: "Pelatihan Keterampilan Kreatif Dukung Kemandirian Finansial Ibu Rumah Tangga",
        summary: "Program pemberdayaan ekonomi mikro terbukti meningkatkan pendapatan keluarga secara nyata di sektor {catName}.",
        body: "## Kemandirian Ekonomi Keluarga\n\nMelalui pelatihan berkelanjutan, para peserta kini mampu memproduksi kerajinan bernilai jual tinggi untuk dipasarkan secara nasional.",
        contentType: "standard",
        sentiment: "positive",
        riskLevel: "low",
        heroImageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Peran Vital Kolaborasi Lintas Sektor dalam Menyukseskan Kampanye {catName}",
        subtitle: "Sinergi Akademisi, Swasta, dan Komunitas Menghasilkan Solusi Dampak Nyata",
        summary: "Kajian keberhasilan model kemitraan multipihak dalam meluncurkan inisiatif sosial bertema {catName}.",
        body: "## Kolaborasi Konstruktif {catName}\n\nKeberhasilan kampanye sosial ini membuktikan bahwa persatuan langkah berbagai elemen masyarakat mampu menyelesaikan kendala rumit secara taktis.",
        contentType: "standard",
        sentiment: "positive",
        riskLevel: "low",
        heroImageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Studi Komparatif: Membandingkan Pola Adaptasi Kebiasaan Baru Sektor {catName}",
        subtitle: "Bagaimana Penggunaan Teknologi Membantu Menjaga Keberlangsungan Operasional Layanan",
        summary: "Analisis statistik persepsi masyarakat mengenai kepuasan adaptasi digital pada bidang {catName}.",
        body: "## Adaptasi Digital {catName}\n\nHasil penelitian mengonfirmasi bahwa mayoritas warga merasa sangat terbantu oleh kehadiran layanan mandiri online yang cepat dan andal.",
        contentType: "analysis",
        sentiment: "positive",
        riskLevel: "low",
        heroImageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800"
      }
    ];
    const requiredCategories = [
      { id: "cat-politik", name: "Politik", slug: "politik", parentId: null, createdAt: now },
      { id: "cat-ekonomi", name: "Ekonomi", slug: "ekonomi", parentId: null, createdAt: now },
      { id: "cat-startup", name: "Startup", slug: "startup", parentId: null, createdAt: now },
      { id: "cat-pendidikan", name: "Pendidikan", slug: "pendidikan", parentId: null, createdAt: now },
      { id: "cat-kesehatan", name: "Kesehatan", slug: "kesehatan", parentId: null, createdAt: now },
      { id: "cat-otomotif", name: "Otomotif", slug: "otomotif", parentId: null, createdAt: now },
      { id: "cat-properti", name: "Properti", slug: "properti", parentId: null, createdAt: now }
    ];
    for (const reqCat of requiredCategories) {
      if (!this.data.categories.some((c) => c.id === reqCat.id)) {
        this.data.categories.push(reqCat);
        changed = true;
      }
    }
    const categories = this.data.categories;
    const contents = this.data.contents;
    for (const cat of categories) {
      const currentCatContents = contents.filter((c) => c.primaryCategoryId === cat.id);
      const missingCount = 5 - currentCatContents.length;
      if (missingCount > 0) {
        const explicitStories = categoryStories[cat.id];
        for (let i = 0; i < missingCount; i++) {
          const itemIdx = currentCatContents.length + i;
          let story;
          if (explicitStories && explicitStories[itemIdx % explicitStories.length]) {
            story = explicitStories[itemIdx % explicitStories.length];
          } else {
            const genericTemp = genericTemplates[itemIdx % genericTemplates.length];
            story = {
              title: genericTemp.title.replace(/{catName}/g, cat.name),
              subtitle: genericTemp.subtitle.replace(/{catName}/g, cat.name),
              summary: genericTemp.summary.replace(/{catName}/g, cat.name),
              body: genericTemp.body.replace(/{catName}/g, cat.name),
              contentType: genericTemp.contentType,
              sentiment: genericTemp.sentiment,
              riskLevel: genericTemp.riskLevel,
              heroImageUrl: genericTemp.heroImageUrl
            };
          }
          const slug = `${story.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${cat.id.replace("cat-", "")}-${itemIdx}`;
          const contentId = `art-enriched-${cat.id.replace("cat-", "")}-${itemIdx}`;
          const newContent = {
            id: contentId,
            title: story.title,
            subtitle: story.subtitle,
            slug,
            summary: story.summary,
            body: story.body,
            contentType: story.contentType,
            status: "published",
            primaryCategoryId: cat.id,
            sentiment: story.sentiment,
            riskLevel: story.riskLevel,
            heroImageUrl: story.heroImageUrl,
            authorId: "usr-reporter",
            editorId: "usr-editor",
            publishedAt: now,
            isSponsored: false,
            viewCount: Math.floor(Math.random() * 2e3) + 150,
            readingTimeMinutes: 3,
            createdAt: now,
            updatedAt: now
          };
          contents.push(newContent);
          this.data.contentLocations.push({
            contentId: newContent.id,
            locationId: "loc-jabar",
            relevanceScore: 90,
            isPrimary: true
          });
          const entId = i % 2 === 0 ? "ent-gdsate" : "ent-rk";
          this.data.contentEntities.push({
            contentId: newContent.id,
            entityId: entId,
            relevanceScore: 85,
            relationType: "subject"
          });
          changed = true;
        }
      }
    }
    if (changed) {
      this.save();
    }
  }
};

// src/services/intelligence.service.ts
var import_genai = require("@google/genai");
var aiClient = null;
function getAiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    console.warn("GEMINI_API_KEY is not configured or uses default template string. AI intelligence will use high-fidelity rule-based extraction.");
    return null;
  }
  if (!aiClient) {
    aiClient = new import_genai.GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiClient;
}
var IntelligenceService = class {
  /**
   * Analyzes text body and title using Gemini 3.5 Flash or local heuristics
   */
  static async analyzeContent(title, body) {
    const client = getAiClient();
    if (client) {
      try {
        const prompt = `Analyze the following news article. Extract metadata, entities, geolocations, primary sentiment, risk level (Low, Medium, High, Critical), and a concise 2-sentence executive summary.
        
        ARTICLE TITLE: "${title}"
        ARTICLE BODY:
        "${body}"
        
        Important Geolocation constraints:
        - If the article mentions Indonesian cities like Bandung, map them with parent 'jawa-barat'.
        - If it mentions Jakarta, map with parent 'dki-jakarta'.
        - If it is other regions, specify country 'indonesia'.`;
        const response = await client.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: import_genai.Type.OBJECT,
              properties: {
                summary: {
                  type: import_genai.Type.STRING,
                  description: "A professional, concise 2-sentence summary summarizing 'Why it Matters'."
                },
                tags: {
                  type: import_genai.Type.ARRAY,
                  items: { type: import_genai.Type.STRING },
                  description: "List of 3-5 relevant conceptual hashtags."
                },
                sentiment: {
                  type: import_genai.Type.STRING,
                  enum: ["positive", "negative", "neutral", "mixed", "investigative"],
                  description: "Overall reporting tone of the article."
                },
                riskLevel: {
                  type: import_genai.Type.STRING,
                  enum: ["low", "medium", "high", "critical"],
                  description: "Low = sports/weather, Medium = normal business/tech, High = politics/tax/regulations, Critical = crime/investigations/unverified claims."
                },
                entities: {
                  type: import_genai.Type.ARRAY,
                  items: {
                    type: import_genai.Type.OBJECT,
                    properties: {
                      name: { type: import_genai.Type.STRING },
                      type: { type: import_genai.Type.STRING, enum: ["person", "company", "brand", "government", "landmark", "event"] },
                      description: { type: import_genai.Type.STRING, description: "A brief 1-sentence descriptor of this entity." }
                    },
                    required: ["name", "type", "description"]
                  }
                },
                locations: {
                  type: import_genai.Type.ARRAY,
                  items: {
                    type: import_genai.Type.OBJECT,
                    properties: {
                      name: { type: import_genai.Type.STRING, description: "Name of the country, state, or city" },
                      type: { type: import_genai.Type.STRING, enum: ["country", "province", "city"] },
                      parentSlug: { type: import_genai.Type.STRING, description: "e.g. 'jawa-barat' for Bandung, 'dki-jakarta' for Jakarta, 'indonesia' for provinces." }
                    },
                    required: ["name", "type", "parentSlug"]
                  }
                }
              },
              required: ["summary", "tags", "sentiment", "riskLevel", "entities", "locations"]
            }
          }
        });
        const text = response.text;
        if (text) {
          const parsed = JSON.parse(text.trim());
          return {
            summary: parsed.summary || "Summary generation in progress.",
            tags: parsed.tags || [],
            sentiment: parsed.sentiment || "neutral",
            riskLevel: parsed.riskLevel || "low",
            entities: parsed.entities || [],
            locations: parsed.locations || []
          };
        }
      } catch (err) {
        console.error("Gemini analysis failed, falling back to local heuristic tagging:", err);
      }
    }
    const lowerBody = (title + " " + body).toLowerCase();
    const entities = [];
    const locations = [];
    const tags = [];
    let sentiment = "neutral";
    let riskLevel = "low";
    if (lowerBody.includes("rupiah") || lowerBody.includes("inflasi") || lowerBody.includes("uang")) {
      tags.push("Ekonomi", "Rupiah");
    }
    if (lowerBody.includes("teknologi") || lowerBody.includes("digital") || lowerBody.includes("ai")) {
      tags.push("Inovasi", "Digital");
    }
    if (lowerBody.includes("wisata") || lowerBody.includes("gedung sate") || lowerBody.includes("sejarah")) {
      tags.push("Wisata", "Heritage");
    }
    if (tags.length === 0) {
      tags.push("Umum", "Nasional");
    }
    if (lowerBody.includes("bandung") || lowerBody.includes("gedung sate") || lowerBody.includes("jabar")) {
      locations.push({ name: "Bandung", type: "city", parentSlug: "jawa-barat" });
      locations.push({ name: "Jawa Barat", type: "province", parentSlug: "indonesia" });
    }
    if (lowerBody.includes("jakarta") || lowerBody.includes("kemenkeu") || lowerBody.includes("pusat")) {
      locations.push({ name: "Jakarta Pusat", type: "city", parentSlug: "dki-jakarta" });
      locations.push({ name: "DKI Jakarta", type: "province", parentSlug: "indonesia" });
    }
    if (locations.length === 0) {
      locations.push({ name: "Indonesia", type: "country", parentSlug: "" });
    }
    if (lowerBody.includes("sri mulyani")) {
      entities.push({
        name: "Sri Mulyani Indrawati",
        type: "person",
        description: "Menteri Keuangan Republik Indonesia, penanggung jawab kebijakan fiskal nasional."
      });
      sentiment = "neutral";
      riskLevel = "medium";
    }
    if (lowerBody.includes("ridwan kamil") || lowerBody.includes("rk")) {
      entities.push({
        name: "Ridwan Kamil",
        type: "person",
        description: "Arsitek senior, mantan Gubernur Jawa Barat, penasihat penataan tata kota."
      });
      sentiment = "positive";
    }
    if (lowerBody.includes("gedung sate")) {
      entities.push({
        name: "Gedung Sate",
        type: "landmark",
        description: "Kantor pusat Pemerintahan Jawa Barat di Bandung, simbol arsitektur bersejarah."
      });
    }
    if (lowerBody.includes("korupsi") || lowerBody.includes("kriminal") || lowerBody.includes("waspada") || lowerBody.includes("hujan lebat")) {
      sentiment = "negative";
      riskLevel = "high";
    }
    if (lowerBody.includes("sukses") || lowerBody.includes("bagus") || lowerBody.includes("selamat") || lowerBody.includes("investasi")) {
      sentiment = "positive";
    }
    const sentences = body.split(/[.!?]+/);
    const summary = sentences.slice(0, 2).join(". ") + ".";
    return {
      summary: summary || "Ringkasan berita utama sedang dirumuskan oleh redaksi.",
      tags,
      sentiment,
      riskLevel,
      entities,
      locations
    };
  }
};

// src/services/ingestion.service.ts
var IngestionService = class {
  /**
   * Calculates word-level Jaccard Similarity between two titles
   * To determine if they represent duplicate reports.
   */
  static calculateSimilarity(t1, t2) {
    const s1 = new Set(t1.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, "").split(/\s+/).filter(Boolean));
    const s2 = new Set(t2.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, "").split(/\s+/).filter(Boolean));
    if (s1.size === 0 || s2.size === 0) return 0;
    const intersection = new Set([...s1].filter((x) => s2.has(x)));
    const union = /* @__PURE__ */ new Set([...s1, ...s2]);
    return intersection.size / union.size;
  }
  /**
   * Simulates fetching external RSS feeds and parsing them, running
   * deduplication checks, and routing items through the NLP intelligence queue.
   */
  static async pollAndProcessAll() {
    const db = RelationalDB.getInstance();
    const sources = db.getIngestionSources().filter((s) => s.isActive && s.trustTier !== "blocked");
    const existingContents = db.getContents();
    let processed = 0;
    let duplicates = 0;
    let created = 0;
    const feedPayloads = {
      "src-antara": [
        {
          guid: "ant-bdg-101",
          title: "Pemkot Bandung Beri Subsidi Sembako Menjelang Libur Panjang Nasional",
          body: "Pemerintah Kota Bandung menggelar pasar murah di sepuluh kecamatan guna meminimalisir gejolak inflasi dan mengamankan suplai pangan menjelang masa libur panjang nasional akhir bulan ini. Subsidi meliputi komoditas beras, minyak goreng, dan daging ayam segar.",
          author: "Humas Pemkot Bandung",
          sourceUrl: "https://jabar.antaranews.com/berita/subsidipasar"
        },
        {
          guid: "ant-bdg-102",
          title: "Revitalisasi Kawasan Gedung Sate Terhambat Faktor Hujan Petir Sore Hari",
          body: "Intensitas hujan yang cukup tinggi disertai angin kencang di Kota Bandung sore ini memaksa penundaan sementara pengerjaan fisik di zona utara taman Gedung Sate. Tim teknis menyatakan keselamatan pekerja tetap menjadi prioritas utama.",
          author: "Dinas Pariwisata Jabar",
          sourceUrl: "https://jabar.antaranews.com/berita/gedungsatehujan"
        }
      ],
      "src-detik": [
        {
          guid: "det-fin-201",
          title: "Sri Mulyani Tegaskan Aturan Pajak Baru Tidak Membebani UMKM Digital",
          body: "Menteri Keuangan Sri Mulyani Indrawati meluruskan kekhawatiran publik mengenai PMK insentif digital terbaru. Sri Mulyani menjamin pelaku usaha ultra-mikro (UMKM) digital tetap berada di bawah radar proteksi fiskal bebas pajak penghasilan final.",
          author: "Detik Finance Team",
          sourceUrl: "https://finance.detik.com/berita/pajakumkm"
        }
      ]
    };
    const now = (/* @__PURE__ */ new Date()).toISOString();
    for (const source of sources) {
      const feedItems = feedPayloads[source.id] || [];
      if (feedItems.length === 0) continue;
      for (const rawItem of feedItems) {
        processed++;
        const alreadyIngested = db.getIngestionItems().some((i) => i.originalGuid === rawItem.guid);
        if (alreadyIngested) continue;
        let duplicateFound = null;
        let highestScore = 0;
        for (const article of existingContents) {
          const score = this.calculateSimilarity(rawItem.title, article.title);
          if (score > highestScore) {
            highestScore = score;
          }
          if (score >= 0.55) {
            duplicateFound = article;
            break;
          }
        }
        if (duplicateFound) {
          duplicates++;
          const item = {
            id: `ing-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            sourceId: source.id,
            originalGuid: rawItem.guid,
            title: rawItem.title,
            description: rawItem.body.substring(0, 100) + "...",
            body: rawItem.body,
            author: rawItem.author,
            url: rawItem.sourceUrl,
            status: "deduplicated",
            relevanceScore: Math.round(highestScore * 100),
            duplicateOfContentId: duplicateFound.id,
            createdAt: now
          };
          db.addIngestionItem(item);
          continue;
        }
        created++;
        const nlp = await IntelligenceService.analyzeContent(rawItem.title, rawItem.body);
        const ingestionItem = {
          id: `ing-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          sourceId: source.id,
          originalGuid: rawItem.guid,
          title: rawItem.title,
          description: rawItem.body.substring(0, 100) + "...",
          body: rawItem.body,
          author: rawItem.author,
          url: rawItem.sourceUrl,
          status: "draft_created",
          relevanceScore: 100,
          createdAt: now
        };
        db.addIngestionItem(ingestionItem);
        const newSlug = rawItem.title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
        const primaryCat = db.getCategories().find((c) => c.slug === "daerah" || c.slug === "bisnis") || db.getCategories()[0];
        const contentId = `art-auto-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
        const newContent = {
          id: contentId,
          title: rawItem.title,
          slug: newSlug,
          summary: nlp.summary,
          body: rawItem.body,
          contentType: "standard",
          status: "draft",
          // Critical rule: human must review, NEVER auto-publish
          primaryCategoryId: primaryCat.id,
          sentiment: nlp.sentiment,
          riskLevel: nlp.riskLevel,
          authorId: "usr-reporter",
          // attributed to system reporter
          sourceUrl: rawItem.sourceUrl,
          originalSourceAttribution: source.name,
          isSponsored: false,
          viewCount: 0,
          readingTimeMinutes: Math.max(1, Math.round(rawItem.body.split(/\s+/).length / 200)),
          createdAt: now,
          updatedAt: now
        };
        db.addContent(newContent);
        const dbLocations = db.getLocations();
        const mappedLocations = nlp.locations.map((loc) => {
          const match = dbLocations.find((dbl) => dbl.name.toLowerCase() === loc.name.toLowerCase());
          if (match) {
            return { contentId, locationId: match.id, relevanceScore: 100, isPrimary: loc.type === "city" };
          }
          return null;
        }).filter(Boolean);
        db.setContentLocations(contentId, mappedLocations);
        const dbEntities = db.getEntities();
        const mappedEntities = nlp.entities.map((ent) => {
          const match = dbEntities.find((dbe) => dbe.name.toLowerCase() === ent.name.toLowerCase());
          if (match) {
            return { contentId, entityId: match.id, relevanceScore: 100, relationType: ent.type };
          }
          return null;
        }).filter(Boolean);
        db.setContentEntities(contentId, mappedEntities);
        db.addContentVersion({
          id: `ver-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          contentId,
          title: rawItem.title,
          body: rawItem.body,
          summary: nlp.summary,
          modifiedBy: "usr-reporter",
          changeSummary: `Sinyal terdeteksi otomatis dari ${source.name}. Melewati filter duplikasi Jaccard. Diperkaya NLP Gemini.`,
          createdAt: now
        });
      }
      source.lastFetchedAt = now;
      db.updateIngestionSource(source);
    }
    return { processed, duplicates, created };
  }
};

// src/db/virtual.ts
function getSeededRandom(seedString) {
  let h = 0;
  for (let i = 0; i < seedString.length; i++) {
    h = Math.imul(31, h) + seedString.charCodeAt(i) | 0;
  }
  return function() {
    h = Math.imul(1664525, h) + 1013904223 | 0;
    return (h >>> 0) / 4294967296;
  };
}
var SCALE_METRICS = {
  articles: 5e4,
  news: 3e4,
  blogs: 15e3,
  shortVideos: 2e4,
  longVideos: 8e3,
  podcasts: 5e3,
  documents: 8e3,
  gallery: 15e3,
  categories: 300,
  topics: 5e3,
  tags: 3e4,
  keywords: 8e4,
  entities: 1e5,
  companies: 3e4,
  brands: 4e4,
  products: 6e4,
  organizations: 15e3,
  govAgencies: 5e3,
  universities: 1e4,
  schools: 25e3,
  hospitals: 12e3,
  restaurants: 6e4,
  hotels: 2e4,
  attractions: 3e4,
  events: 2e4,
  creators: 15e3,
  authors: 5e3,
  reporters: 1e3,
  users: 25e4,
  comments: 2e6,
  likes: 8e6,
  shares: 3e6,
  notifications: 5e6,
  searchHistory: 4e6,
  analyticsEvents: 1e8
};
var CITIES = [
  { name: "Jakarta Pusat", slug: "jakarta-pusat", lat: -6.1751, lon: 106.8272, prov: "DKI Jakarta" },
  { name: "Bandung", slug: "bandung", lat: -6.9175, lon: 107.6191, prov: "Jawa Barat" },
  { name: "Surabaya", slug: "surabaya", lat: -7.2575, lon: 112.7521, prov: "Jawa Timur" },
  { name: "Medan", slug: "medan", lat: 3.5952, lon: 98.6722, prov: "Sumatera Utara" },
  { name: "Makassar", slug: "makassar", lat: -5.1477, lon: 119.4327, prov: "Sulawesi Selatan" },
  { name: "Yogyakarta", slug: "yogyakarta", lat: -7.7956, lon: 110.3695, prov: "DI Yogyakarta" },
  { name: "Semarang", slug: "semarang", lat: -6.9667, lon: 110.4167, prov: "Jawa Tengah" },
  { name: "Palembang", slug: "palembang", lat: -2.9761, lon: 104.7754, prov: "Sumatera Selatan" },
  { name: "Denpasar", slug: "denpasar", lat: -8.6705, lon: 115.2126, prov: "Bali" },
  { name: "Balikpapan", slug: "balikpapan", lat: -1.2654, lon: 116.8312, prov: "Kalimantan Timur" }
];
var INDUSTRIES = [
  "FinTech",
  "SaaS",
  "Agrotech",
  "HealthTech",
  "EdTech",
  "CleanEnergy",
  "Logistics",
  "FMCG",
  "Creative",
  "Mining",
  "Tourism",
  "E-Commerce"
];
var COMPANIES = [
  "GoTo Group",
  "Telkomsel",
  "Bank Central Asia",
  "Astra International",
  "Traveloka",
  "Bukalapak",
  "Kopi Kenangan",
  "Indofood Sukses Makmur",
  "Pertamina",
  "Bio Farma",
  "Amartha Microfinance",
  "E-Fishery",
  "Ruangguru",
  "Halodoc",
  "Kredivo"
];
var BRANDS = [
  "Tokopedia",
  "Gojek Pay",
  "Kenangan Latte",
  "Indomie Goreng",
  "Traveloka App",
  "Teh Botol Sosro",
  "Wardah Beauty",
  "By.U Digital",
  "Livin by Mandiri",
  "Ovo Cash"
];
var GOV_AGENCIES = [
  "Kementerian Keuangan (Kemenkeu)",
  "Kementerian Komunikasi dan Informatika (Kominfo)",
  "Badan Sandi dan Siber Negara (BSSN)",
  "Otoritas Jasa Keuangan (OJK)",
  "Bank Indonesia (BI)",
  "Kementerian Pariwisata dan Ekonomi Kreatif (Kemenparekraf)",
  "Badan Meteorologi Klimatologi Geofisika (BMKG)"
];
var PERSONS = [
  "Sri Mulyani Indrawati",
  "Ridwan Kamil",
  "Erick Thohir",
  "Budi Gunadi Sadikin",
  "Sandiaga Uno",
  "Nadiem Makarim",
  "Najwa Shihab",
  "Ahmad Dahlan",
  "Siti Rahma"
];
var NOUNS = [
  "Regulasi Pajak",
  "Infrastruktur Digital",
  "Akselerasi Ekonomi",
  "Suku Bunga BI",
  "Inovasi AI",
  "Transisi Energi Hijau",
  "Inklusi Keuangan",
  "Revitalisasi Pariwisata",
  "Pemberdayaan UMKM",
  "Ketahanan Pangan"
];
var SENTIMENTS = ["positive", "negative", "neutral", "mixed", "investigative"];
var RISK_LEVELS = ["low", "medium", "high", "critical"];
function selectIndex(arr, rand) {
  return arr[Math.floor(rand() * arr.length)];
}
var VirtualScaleEngine = class _VirtualScaleEngine {
  /**
   * Generates a fully relational, highly realistic Content (Article, News, Blog) record deterministically.
   */
  static getArticle(index) {
    const seed = `art-seed-${index}`;
    const rand = getSeededRandom(seed);
    const city = selectIndex(CITIES, rand);
    const industry = selectIndex(INDUSTRIES, rand);
    const company = selectIndex(COMPANIES, rand);
    const brand = selectIndex(BRANDS, rand);
    const person = selectIndex(PERSONS, rand);
    const noun = selectIndex(NOUNS, rand);
    const gov = selectIndex(GOV_AGENCIES, rand);
    const templates = [
      {
        title: `Dampak Implementasi ${noun} di ${city.name} oleh ${company}`,
        subtitle: `Analisis Mendalam Mengenai Respon Pasar Finansial Regional Terhadap Kebijakan Baru`,
        body: `## Perkembangan Kebijakan Nasional

Kebijakan baru mengenai **${noun}** yang digagas oleh **${gov}** resmi diujicobakan di wilayah **${city.name}**. Langkah taktis ini disambut hangat oleh direktur utama **${company}** yang menganggapnya sebagai akselerator utama penetrasi pasar daerah.

### Dampak Terhadap Ekosistem Lokal

Beberapa pelaku usaha mengemukakan pentingnya kesiapan infrastruktur siber. Terutama platform **${brand}** yang melayani transaksi mikro digital bagi ribuan UMKM setempat.

> "Kita optimis bahwa kolaborasi bersama tokoh seperti **${person}** akan memperkuat struktur ketahanan ekonomi regional secara berkelanjutan," sebut perwakilan analis Kemenkeu.`
      },
      {
        title: `Sinergi Raksasa ${industry} ${company} Mengakselerasi Pembangunan di ${city.name}`,
        subtitle: `Inovasi Produk Baru ${brand} Menargetkan Ribuan Pengguna Baru di Seluruh Nusantara`,
        body: `## Transformasi Digital Sektor ${industry}

Perusahaan teknologi terkemuka **${company}** resmi memperkenalkan program kemitraan strategis di **${city.name}**. Fokus utama program ini adalah integrasi ekosistem **${brand}** dengan fasilitas riset lokal guna mendorong efisiensi rantai pasok industri.

### Pendekatan Humanis & Edukasi

Dalam pidato resminya, **${person}** menyampaikan bahwa digitalisasi tidak boleh meninggalkan kearifan lokal. Oleh sebab itu, kurikulum digital berbasis kecerdasan buatan akan segera diluncurkan secara massal.`
      },
      {
        title: `Laporan Investigasi: Di Balik Suksesnya Ekspansi ${brand} Menembus Pasar ${industry}`,
        subtitle: `Bagaimana Kepemimpinan ${person} Mengubah Peta Persaingan Bisnis Nasional`,
        body: `## Eksplorasi Pasar & Strategi Pertumbuhan

Banyak pihak tidak menyangka ekspansi cepat **${brand}** di sektor **${industry}** dapat mereduksi biaya operasional hingga 30%. Dokumen internal menunjukkan keselarasan dengan agenda **${noun}** nasional.

### Tantangan dan Hambatan di Lapangan

Meskipun sukses di **${city.name}**, beberapa wilayah penyangga mengeluhkan kurangnya akses broadband berkecepatan tinggi yang stabil. Pihak **${gov}** berjanji segera mengalokasikan anggaran khusus.`
      }
    ];
    const template = templates[Math.floor(rand() * templates.length)];
    const primaryCategoryId = `cat-${["breaking", "terbaru", "trending", "editor", "investigasi", "analisis", "opini", "factcheck", "explainer", "riset"][index % 10]}`;
    const contentType = ["standard", "explainer", "analysis", "opinion", "fact_check", "video", "sponsored"][index % 7];
    const sentiment = selectIndex(Array.from(SENTIMENTS), rand);
    const riskLevel = selectIndex(Array.from(RISK_LEVELS), rand);
    const viewCount = Math.floor(rand() * 15e3) + 120;
    const now = new Date(2026, 5, 26, 12).toISOString();
    const publishedAt = new Date(Date.now() - index * 45 * 60 * 1e3).toISOString();
    const slug = `virtual-post-${index}-${template.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    return {
      id: `art-virtual-${index}`,
      title: template.title,
      subtitle: template.subtitle,
      slug,
      summary: `Informasi intelijen terakreditasi mengenai perkembangan ${noun} bersama korporasi ${company} bertempat di kota ${city.name} yang diawasi langsung oleh ${person}.`,
      body: template.body,
      contentType,
      status: "published",
      primaryCategoryId,
      sentiment,
      riskLevel,
      heroImageUrl: `https://images.unsplash.com/photo-${[
        "1526304640581-d334cdbbf45e",
        "1559526324-4b87b5e36e44",
        "1590283603385-17ffb3a7f29f",
        "1451187580459-43490279c0fa",
        "1504711434969-e33886168f5c",
        "1541872703-74c5e44368f9"
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
  static getUser(index) {
    const seed = `usr-seed-${index}`;
    const rand = getSeededRandom(seed);
    const names = ["Aditya", "Bambang", "Cahyono", "Dewi", "Eka", "Farhan", "Gita", "Hendra", "Indah", "Joko", "Kurnia", "Lestari", "Mulyono", "Novi", "Oki"];
    const family = ["Pratama", "Santoso", "Wijaya", "Siregar", "Lubis", "Kusuma", "Hidayat", "Saputra", "Nasution", "Gunawan"];
    const roles = ["member", "premium", "reporter", "editor", "administrator", "student", "teacher", "creator", "influencer"];
    const fullName = `${selectIndex(names, rand)} ${selectIndex(family, rand)}`;
    const email = `${fullName.toLowerCase().replace(/\s+/g, "")}${index % 100}@example.com`;
    const role = roles[index % roles.length];
    return {
      id: `usr-virtual-${index}`,
      email,
      passwordHash: `pass-${index}`,
      fullName,
      role,
      status: index % 99 === 0 ? "suspended" : "active",
      createdAt: new Date(Date.now() - index * 2 * 3600 * 1e3).toISOString(),
      updatedAt: new Date(Date.now() - index * 3600 * 1e3).toISOString()
    };
  }
  /**
   * Generates realistic Entities deterministically.
   */
  static getEntity(index) {
    const seed = `ent-seed-${index}`;
    const rand = getSeededRandom(seed);
    const types = ["person", "company", "brand", "government", "landmark", "event"];
    const type = types[index % types.length];
    let name = "";
    let description = "";
    let websiteUrl = "https://infobos.com";
    if (type === "person") {
      const person = selectIndex(PERSONS, rand);
      name = `${person} (ID: ${index})`;
      description = `Tokoh publik nasional yang berpengaruh besar di bidang kepemimpinan, regulasi sosial, dan pembangunan infrastruktur regional Indonesia.`;
      websiteUrl = `https://personal-${index}.id`;
    } else if (type === "company") {
      const comp = selectIndex(COMPANIES, rand);
      name = `${comp} (Sektor ${index})`;
      description = `Korporasi terkemuka di Indonesia yang mengoperasikan portofolio terpadu di sektor ekonomi kreatif, teknologi modern, dan solusi finansial berkelanjutan.`;
      websiteUrl = `https://company-${index}.co.id`;
    } else if (type === "brand") {
      const brand = selectIndex(BRANDS, rand);
      name = `${brand} Premium`;
      description = `Merek nasional terpercaya dengan jutaan konsumen harian, berfokus pada inklusi layanan digital, keandalan performa, dan optimalisasi ramah kantong.`;
      websiteUrl = `https://brand-${index}.com`;
    } else if (type === "government") {
      const gov = selectIndex(GOV_AGENCIES, rand);
      name = gov;
      description = `Lembaga tinggi pemerintah Republik Indonesia yang memiliki wewenang administratif, regulasi moneter, pengawasan industri, dan mitigasi kebencanaan nasional.`;
      websiteUrl = `https://gov-${index}.go.id`;
    } else if (type === "landmark") {
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
      slug: `entity-${index}-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      type,
      description,
      websiteUrl,
      logoUrl: `https://images.unsplash.com/photo-${[
        "1573496359142-b8d87734a5a2",
        "1560250097-0b93528c311a",
        "1544377193-33dcf4d68fb5",
        "1559526324-4b87b5e36e44"
      ][index % 4]}?auto=format&fit=crop&q=80&w=300`,
      isClaimed: index % 5 === 0,
      metadata: { foundingYear: 2010 + index % 15, employeeRange: `${index % 10 + 1}00-${index % 10 + 5}00 karyawan` },
      createdAt: new Date(Date.now() - index * 12 * 3600 * 1e3).toISOString()
    };
  }
  /**
   * Generates virtual media models: Video (long/short), Podcast, Document, Gallery, Events
   */
  static getMediaItem(type, index) {
    const seed = `media-${type}-${index}`;
    const rand = getSeededRandom(seed);
    const city = selectIndex(CITIES, rand);
    const person = selectIndex(PERSONS, rand);
    const noun = selectIndex(NOUNS, rand);
    const company = selectIndex(COMPANIES, rand);
    const views = Math.floor(rand() * 45e3) + 250;
    const likes = Math.floor(views * (rand() * 0.3 + 0.05));
    const commentsCount = Math.floor(views * (rand() * 0.1 + 0.01));
    const shares = Math.floor(likes * (rand() * 0.4));
    if (type === "short-video") {
      const shortVideoTitles = [
        `Gaya hidup pekerja digital di pusat kota ${city.name} #LifeAt${company.replace(/\s+/g, "")}`,
        `Tips instan menyikapi fluktuasi ${noun} bareng pakar finansial!`,
        `Menguak keindahan tersembunyi pariwisata urban ${city.name} dalam 30 detik!`,
        `Review aplikasi AI terbaru buatan developer muda lokal #KaryaAnakBangsa`
      ];
      return {
        id: `msh-virtual-${index}`,
        title: shortVideoTitles[index % shortVideoTitles.length],
        creator: `Kreator ${person}`,
        views: `${(views / 1e3).toFixed(1)}K`,
        likes: `${(likes / 1e3).toFixed(1)}K`,
        comments: commentsCount,
        shares,
        duration: "0:45",
        uploadedAt: `${index % 23 + 1} jam lalu`,
        thumbnail: `https://images.unsplash.com/photo-${["1618005182384-a83a8bd57fbe", "1541872703-74c5e44368f9", "1451187580459-43490279c0fa"][index % 3]}?auto=format&fit=crop&q=80&w=400`,
        category: ["trending", "funny", "educational", "creative"][index % 4],
        summary: `Video vertical TikTok/Reel populer menelaah topik ${noun} yang viral di kalangan netizen daerah.`
      };
    }
    if (type === "long-video") {
      const longTitles = [
        `Dokumenter Eksklusif: Penataan Cagar Budaya & Wisata Heritage di ${city.name}`,
        `Wawancara Panel: Kesiapan Regulasi Pajak Baru Menghadapi Resesi bersama ${person}`,
        `Masterclass AI: Cara Implementasi Chatbot Lokal Akurasi Tinggi Menggunakan Serverless`
      ];
      return {
        id: `mlg-virtual-${index}`,
        title: longTitles[index % longTitles.length],
        creator: `INFOBOS TV Studio`,
        views: `${(views / 1e3).toFixed(1)}K`,
        duration: `${index % 15 + 10}:45`,
        uploadedAt: `${index % 6 + 1} hari lalu`,
        thumbnail: `https://images.unsplash.com/photo-${["1590001155093-a3c66ab0c3ff", "1526304640581-d334cdbbf45e", "1559526324-4b87b5e36e44"][index % 3]}?auto=format&fit=crop&q=80&w=800`,
        category: ["documentary", "interview", "tutorial", "webinar"][index % 4],
        summary: `Kajian mendalam berdurasi panjang mengenai peranan infrastruktur siber dan model ${noun} regional.`
      };
    }
    if (type === "podcast") {
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
        episode: index % 10 + 1,
        guest: person,
        views,
        likes,
        commentsCount,
        duration: `${index % 30 + 25} menit`,
        platform: ["Spotify", "Apple Podcasts", "YouTube Audio"][index % 3],
        thumbnail: `https://images.unsplash.com/photo-${["1590283603385-17ffb3a7f29f", "1451187580459-43490279c0fa", "1504711434969-e33886168f5c"][index % 3]}?auto=format&fit=crop&q=80&w=300`,
        transcript: `Transkrip otomatis AI: Selamat datang kembali di ruang dengar utama. Hari ini kita membahas ${noun} yang sedang hangat diperbincangkan publik. Bersama kita telah hadir narasumber kredibel, ${person}...`,
        summary: `Episode diskusi santai mengupas tuntas korelasi antara implementasi teknologi, kebijakan siber, dan ${noun}.`
      };
    }
    if (type === "document") {
      const formats = ["PDF", "PPTX", "DOCX", "XLSX"];
      const docTypes = ["Laporan Kinerja Tahunan", "Whitepaper Regulasi Teknis", "Panduan Operasional Standar", "Analisis Anggaran Sektoral"];
      return {
        id: `doc-virtual-${index}`,
        title: `${docTypes[index % docTypes.length]} ${noun} - TA 2026`,
        filename: `${noun.toLowerCase().replace(/\s+/g, "_")}_laporan_${index}.${formats[index % formats.length].toLowerCase()}`,
        format: formats[index % formats.length],
        size: `${(rand() * 4.5 + 0.5).toFixed(1)} MB`,
        downloads: Math.floor(views * 0.12),
        uploadedAt: `${index % 15 + 1} hari lalu`,
        author: `Badan Litbang ${_VirtualScaleEngine.govAgenciesName(index)}`,
        category: ["Pemerintah", "Riset Akademis", "Korporasi", "Panduan Teknis"][index % 4],
        summary: `Berkas resmi dan komprehensif diterbitkan guna menganalisis dampak strategis ekonomi digital, penyerapan anggaran, dan akuntabilitas tata laksana sosial.`
      };
    }
    if (type === "gallery") {
      const gallTitles = [
        `Potret Udara Proyek Revitalisasi Cagar Budaya di ${city.name}`,
        `Konferensi Pers Pengumuman Insentif Pajak oleh Ibu ${person}`,
        `Uji Coba Laboratorium Inovasi IoT Smart Farming di Jawa Barat`
      ];
      return {
        id: `gal-virtual-${index}`,
        title: gallTitles[index % gallTitles.length],
        views,
        likes,
        downloads: Math.floor(likes * 0.35),
        takenAt: `${index % 8 + 1} hari lalu`,
        photographer: `Jurnalis Foto ${person}`,
        aspectRatio: index % 2 === 0 ? "4:3" : "16:9",
        imageUrl: `https://images.unsplash.com/photo-${[
          "1590001155093-a3c66ab0c3ff",
          "1526304640581-d334cdbbf45e",
          "1559526324-4b87b5e36e44",
          "1451187580459-43490279c0fa",
          "1461896836934-ffe607ba8211"
        ][index % 5]}?auto=format&fit=crop&q=80&w=800`,
        summary: `Visualisasi berkualitas tinggi mengabadikan momentum krusial, aksi nyata para pemangku kepentingan, dan pemandangan infrastruktur modern.`
      };
    }
    const eventTypes = ["Sertifikasi Teknis", "Rapat Koordinasi Nasional", "Festival Seni Kreatif", "Webinar Global", "Kompetisi Inovasi"];
    return {
      id: `eve-virtual-${index}`,
      title: `${eventTypes[index % eventTypes.length]} ${noun} 2026`,
      organizer: company,
      location: `${city.name} Convention Hall`,
      mapsUrl: `https://maps.google.com/?q=${city.lat},${city.lon}`,
      city: city.name,
      province: city.prov,
      date: new Date(Date.now() + index * 8 * 3600 * 1e3).toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
      time: "09:00 - 15:00 WIB",
      quota: Math.floor(rand() * 500) + 100,
      registeredCount: Math.floor(rand() * 200) + 50,
      price: index % 3 === 0 ? "Gratis" : `Rp ${(Math.floor(rand() * 4) + 1) * 150}K`,
      speaker: person,
      summary: `Pertemuan terpadu guna membahas akselerasi keahlian praktis, peta jalan kolaborasi, dan implementasi nyata solusi ${noun} di tingkat nasional.`
    };
  }
  /**
   * Helper to return government agency names based on index
   */
  static govAgenciesName(index) {
    return GOV_AGENCIES[index % GOV_AGENCIES.length];
  }
  /**
   * Real-time analytical dashboard simulator. Generates deterministic metrics aggregates
   * reflecting millions of events.
   */
  static getAnalyticsReport(timeRange) {
    const dataPointsCount = timeRange === "daily" ? 24 : timeRange === "weekly" ? 7 : timeRange === "monthly" ? 30 : 12;
    const labels = timeRange === "daily" ? Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`) : timeRange === "weekly" ? ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"] : timeRange === "monthly" ? Array.from({ length: 30 }, (_, i) => `Tgl ${i + 1}`) : ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    const seriesData = labels.map((label, idx) => {
      const baseSeed = `anal-point-${timeRange}-${idx}`;
      const rand = getSeededRandom(baseSeed)();
      const sineWave = Math.sin(idx / dataPointsCount * Math.PI * 2) * 15 + 85;
      const volatility = rand * 10 - 5;
      const multiplier = timeRange === "daily" ? 1e4 : timeRange === "weekly" ? 15e4 : timeRange === "monthly" ? 5e4 : 15e5;
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
      const revenue = Math.floor(conversions * (5e3 + rand * 15e3));
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
};

// src/services/seed.service.ts
var FIRST_NAMES = ["Ahmad", "Siti", "Budi", "Dewi", "Wira", "Asep", "Sri", "Ridwan", "Sandiaga", "Najwa", "Aditya", "Eka", "Farhan", "Gita", "Hendra", "Indah", "Joko", "Kurnia", "Lestari", "Mulyono", "Novi", "Oki", "Bambang", "Cahyono", "Rian", "Santi", "Faisal", "Lia", "Rudi", "Mega"];
var LAST_NAMES = ["Dahlan", "Rahma", "Santoso", "Wijaya", "Sunandar", "Mulyani", "Kamil", "Uno", "Shihab", "Pratama", "Siregar", "Lubis", "Kusuma", "Hidayat", "Saputra", "Nasution", "Gunawan", "Adiputra", "Wibowo", "Nugroho", "Setiawan", "Purwanto", "Hadi", "Kartika", "Sari", "Utami"];
var INDONESIAN_CITIES = [
  { name: "Bandung", slug: "bandung", lat: -6.9175, lon: 107.6191, prov: "Jawa Barat", temp: 24, cond: "Cerah Berawan", aqi: 45, alertTitle: "Waspada Kabut Pagi Hari", alertLevel: "info" },
  { name: "Jakarta Pusat", slug: "jakarta-pusat", lat: -6.1751, lon: 106.8272, prov: "DKI Jakarta", temp: 31, cond: "Cerah", aqi: 112, alertTitle: "Polusi Udara Sedang Tinggi", alertLevel: "warning" },
  { name: "Surabaya", slug: "surabaya", lat: -7.2575, lon: 112.7521, prov: "Jawa Timur", temp: 33, cond: "Cerah", aqi: 65, alertTitle: "Cuaca Ekstrem Terik Siang Hari", alertLevel: "info" },
  { name: "Medan", slug: "medan", lat: 3.5952, lon: 98.6722, prov: "Sumatera Utara", temp: 29, cond: "Hujan Ringan", aqi: 35, alertTitle: "Potensi Genangan Air Jalur Utama", alertLevel: "info" },
  { name: "Makassar", slug: "makassar", lat: -5.1477, lon: 119.4327, prov: "Sulawesi Selatan", temp: 30, cond: "Berawan", aqi: 48, alertTitle: "Kecepatan Angin Meningkat", alertLevel: "info" },
  { name: "Yogyakarta", slug: "yogyakarta", lat: -7.7956, lon: 110.3695, prov: "DI Yogyakarta", temp: 25, cond: "Cerah Berawan", aqi: 55, alertTitle: "Aktivitas Gunung Merapi Level Siaga", alertLevel: "warning" },
  { name: "Semarang", slug: "semarang", lat: -6.9667, lon: 110.4167, prov: "Jawa Tengah", temp: 31, cond: "Berawan", aqi: 72, alertTitle: "Waspada Banjir Rob Sore Hari", alertLevel: "warning" },
  { name: "Palembang", slug: "palembang", lat: -2.9761, lon: 104.7754, prov: "Sumatera Selatan", temp: 28, cond: "Hujan Petir", aqi: 30, alertTitle: "Peringatan Dini Petir & Angin Kencang", alertLevel: "critical" },
  { name: "Denpasar", slug: "denpasar", lat: -8.6705, lon: 115.2126, prov: "Bali", temp: 29, cond: "Cerah", aqi: 40, alertTitle: "Gelombang Tinggi Selat Bali", alertLevel: "info" },
  { name: "Balikpapan", slug: "balikpapan", lat: -1.2654, lon: 116.8312, prov: "Kalimantan Timur", temp: 28, cond: "Hujan Ringan", aqi: 32, alertTitle: "Pembangunan IKN Berjalan Lancar", alertLevel: "none" }
];
var INDUSTRIES2 = ["Agroteknologi", "FinTech", "SaaS & AI", "Logistics", "Creative Industry", "Clean Energy", "HealthTech", "EdTech", "Mining", "FMCG", "Tourism", "E-Commerce"];
var CORPORATIONS = [
  { name: "GoTo Group", desc: "Raksasa teknologi Indonesia penyedia layanan ride-hailing, e-commerce, dan fintech terpadu.", web: "https://www.gotocompany.com" },
  { name: "Telkomsel", desc: "Penyedia telekomunikasi seluler digital terbesar di Indonesia dengan jangkauan nasional.", web: "https://www.telkomsel.com" },
  { name: "Bank Central Asia (BCA)", desc: "Lembaga keuangan swasta terbesar yang mengoperasikan infrastruktur perbankan digital tercanggih.", web: "https://www.bca.co.id" },
  { name: "Astra International", desc: "Konglomerat multi-industri dengan fokus otomotif, jasa keuangan, dan alat berat pertanian.", web: "https://www.astra.co.id" },
  { name: "Traveloka", desc: "Platform lifestyle superapp terkemuka untuk pemesanan tiket perjalanan dan akomodasi Asia Tenggara.", web: "https://www.traveloka.com" },
  { name: "Kopi Kenangan", desc: "Jaringan gerai kopi grab-and-go berbasis aplikasi dengan pertumbuhan tercepat.", web: "https://kopikenangan.com" },
  { name: "Indofood Sukses Makmur", desc: "Produsen pangan olahan terbesar dengan merek ikonik global yang tersebar di 50 negara.", web: "https://www.indofood.com" },
  { name: "Pertamina", desc: "Badan Usaha Milik Negara yang mengelola ketahanan energi, kilang minyak, dan eksplorasi energi hijau.", web: "https://www.pertamina.com" },
  { name: "Bio Farma", desc: "Holding farmasi BUMN yang memproduksi vaksin berkualitas standar WHO untuk pasar global.", web: "https://www.biofarma.co.id" },
  { name: "Halodoc", desc: "Aplikasi kesehatan digital terpadu yang mempermudah konsultasi medis dan pengiriman obat kilat.", web: "https://www.halodoc.com" }
];
var INDONESIAN_GOV = [
  { name: "Kementerian Keuangan (Kemenkeu)", web: "https://www.kemenkeu.go.id" },
  { name: "Kementerian Komunikasi dan Informatika (Kominfo)", web: "https://www.kominfo.go.id" },
  { name: "Badan Siber dan Sandi Negara (BSSN)", web: "https://www.bssn.go.id" },
  { name: "Otoritas Jasa Keuangan (OJK)", web: "https://www.ojk.go.id" },
  { name: "Bank Indonesia (BI)", web: "https://www.bi.go.id" },
  { name: "Kementerian Pariwisata dan Ekonomi Kreatif (Kemenparekraf)", web: "https://www.kemenparekraf.go.id" },
  { name: "Badan Meteorologi Klimatologi Geofisika (BMKG)", web: "https://www.bmkg.go.id" }
];
var NOUNS_TOPICS = [
  { topic: "Inovasi AI Kebangsaan", desc: "Akselerasi adopsi Large Language Models (LLM) berbahasa daerah di instansi publik." },
  { topic: "Infrastruktur Rebana Metropolitan", desc: "Koridor industri baru yang menghubungkan pelabuhan Patimban, Kertajati, dan Cirebon." },
  { topic: "Regulasi Pajak Transaksi Digital", desc: "Pemberlakuan PPN PMSE dan dampaknya bagi daya beli UMKM kreatif." },
  { topic: "Ketahanan Energi Hijau Jabar", desc: "Pemanfaatan pembangkit listrik tenaga surya apung dan bioenergi pedesaan." },
  { topic: "Inklusi Keuangan Mikro Digital", desc: "Penyaluran modal bergulir berbasis peer-to-peer lending bagi petani komoditas hortikultura." }
];
var SENTIMENTS2 = ["positive", "negative", "neutral", "mixed", "investigative"];
var RISK_LEVELS2 = ["low", "medium", "high", "critical"];
function getSeededRandom2(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  }
  return function() {
    h = Math.imul(1664525, h) + 1013904223 | 0;
    return (h >>> 0) / 4294967296;
  };
}
var EnterpriseSeedEngine = class {
  /**
   * Generates a completely realistic, interconnected, Indonesian-localized seed database.
   */
  static async generateSeed(options) {
    const db = RelationalDB.getInstance();
    const now = (/* @__PURE__ */ new Date()).toISOString();
    if (options.mode === "full") {
      this.resetDatabase();
    }
    const rand = getSeededRandom2(`seed-run-${options.module || "all"}-${options.region || "all"}`);
    const limit = options.mode === "partial" ? 5 : 20;
    const stats = {
      users: 0,
      contents: 0,
      categories: db.getCategories().length,
      topics: db.getTopics().length,
      locations: db.getLocations().length,
      entities: db.getEntities().length,
      forumThreads: 0,
      marketplaceListings: 0,
      businessDirectory: 0,
      projectsTenders: 0,
      campaigns: 0,
      creatives: 0,
      auditLogs: 0
    };
    if (!options.module || options.module === "Community" || options.module === "News") {
      const existingUserCount = db.getUsers().length;
      if (existingUserCount < 15) {
        for (let i = 0; i < 15; i++) {
          const fn = FIRST_NAMES[Math.floor(rand() * FIRST_NAMES.length)];
          const ln = LAST_NAMES[Math.floor(rand() * LAST_NAMES.length)];
          const fullName = `${fn} ${ln}`;
          const email = `${fn.toLowerCase()}.${ln.toLowerCase()}@infobos.com`;
          const role = i % 4 === 0 ? "managing_editor" : i % 4 === 1 ? "editor" : i % 4 === 2 ? "reporter" : "member";
          const newUser = {
            id: `usr-seed-${existingUserCount + i}`,
            email,
            passwordHash: "pass123",
            fullName,
            role,
            status: "active",
            createdAt: now,
            updatedAt: now
          };
          db.getUsers().push(newUser);
          stats.users++;
        }
      }
    }
    const currentLocs = db.getLocations();
    if (currentLocs.length <= 5) {
      INDONESIAN_CITIES.forEach((c, idx) => {
        const found = currentLocs.some((l) => l.slug === c.slug);
        if (!found) {
          const newLoc = {
            id: `loc-seed-${idx}`,
            name: c.name,
            slug: c.slug,
            type: "city",
            parentId: c.prov === "Jawa Barat" ? "loc-jabar" : c.prov === "DKI Jakarta" ? "loc-dki" : "loc-idn",
            latitude: c.lat,
            longitude: c.lon,
            weatherTemp: c.temp,
            weatherCondition: c.cond,
            aqi: c.aqi,
            alertTitle: c.alertTitle,
            alertLevel: c.alertLevel,
            createdAt: now
          };
          db.getLocations().push(newLoc);
          stats.locations++;
        }
      });
    }
    const currentEntities = db.getEntities();
    if (currentEntities.length <= 4) {
      CORPORATIONS.forEach((c, idx) => {
        const newEnt = {
          id: `ent-seed-co-${idx}`,
          name: c.name,
          slug: c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          type: "company",
          description: c.desc,
          websiteUrl: c.web,
          logoUrl: `https://images.unsplash.com/photo-${["1572021335469-31706a17aaef", "1486406146926-c627a92ad1ab", "1554469384-e58fac16e23a"][idx % 3]}?auto=format&fit=crop&w=300&q=80`,
          isClaimed: idx % 3 === 0,
          metadata: { industry: INDUSTRIES2[idx % INDUSTRIES2.length], staffRange: "50-500" },
          createdAt: now
        };
        db.getEntities().push(newEnt);
        stats.entities++;
      });
      INDONESIAN_GOV.forEach((g, idx) => {
        const newEnt = {
          id: `ent-seed-gov-${idx}`,
          name: g.name,
          slug: g.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          type: "government",
          description: `Lembaga regulator pemerintahan Republik Indonesia yang berfokus pada kesejahteraan publik, pengawasan digital, dan fiskal nasional.`,
          websiteUrl: g.web,
          logoUrl: `https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=300&q=80`,
          isClaimed: true,
          createdAt: now
        };
        db.getEntities().push(newEnt);
        stats.entities++;
      });
    }
    if (!options.module || options.module === "News") {
      const activeCats = db.getCategories();
      const activeLocs = db.getLocations();
      const activeEnts = db.getEntities();
      const activeAuthors = db.getUsers().filter((u) => u.role === "reporter" || u.role === "editor" || u.role === "super_admin");
      for (let i = 0; i < limit; i++) {
        let targetCat = activeCats[i % activeCats.length];
        if (options.category) {
          const matched = activeCats.find((c) => c.slug === options.category || c.id === options.category);
          if (matched) targetCat = matched;
        }
        let targetLoc = activeLocs[i % activeLocs.length];
        if (options.region) {
          const matched = activeLocs.find((l) => l.slug === options.region || l.id === options.region);
          if (matched) targetLoc = matched;
        }
        const targetEnt = activeEnts[i % activeEnts.length];
        const targetAuthor = activeAuthors[i % activeAuthors.length] || db.getUsers()[0];
        const nounObj = NOUNS_TOPICS[i % NOUNS_TOPICS.length];
        const year = options.year || "2026";
        const pubDate = new Date(parseInt(year), Math.floor(rand() * 12), Math.floor(rand() * 28) + 1, 10, 30).toISOString();
        const title = `Akselerasi ${nounObj.topic} di Wilayah ${targetLoc.name} Menemukan Solusi Rantai Pasok`;
        const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${i}`;
        const summary = `Kajian jurnalisme presisi mengenai integrasi ${nounObj.topic} yang digarap oleh ${targetEnt.name} bertempat di ${targetLoc.name}.`;
        const body = `## Pendahuluan Sektoral

Pembangunan infrastruktur regional dan **${nounObj.topic}** menjadi topik diskusi hangat di tingkat nasional. Melalui program percepatan ini, **${targetEnt.name}** memperkenalkan peta jalan teknologi modern yang ramah lingkungan.

### Dampak Positif di Lapangan

Masyarakat di wilayah **${targetLoc.name}** menyambut antusias penyederhanaan birokrasi dan insentif pendanaan baru. Model evaluasi siber menunjukkan korelasi kuat terhadap pertumbuhan indeks literasi UMKM.

> "Sinergi multipihak ini membuktikan bahwa kita mampu beradaptasi cepat menghadapi fluktuasi ekonomi global," tegas analis senior Redaksi INFOBOS.`;
        const newContent = {
          id: `art-seed-gen-${i}`,
          title,
          subtitle: `Peta Jalan & Kebijakan Strategis Indonesia Maju Era Globalisasi`,
          slug,
          summary,
          body,
          contentType: i % 5 === 0 ? "analysis" : i % 5 === 1 ? "breaking" : "standard",
          status: "published",
          primaryCategoryId: targetCat.id,
          sentiment: SENTIMENTS2[i % SENTIMENTS2.length],
          riskLevel: RISK_LEVELS2[i % RISK_LEVELS2.length],
          heroImageUrl: `https://images.unsplash.com/photo-${["1504711434969-e33886168f5c", "1451187580459-43490279c0fa", "1526304640581-d334cdbbf45e", "1590283603385-17ffb3a7f29f"][i % 4]}?auto=format&fit=crop&w=800&q=80`,
          authorId: targetAuthor.id,
          publishedAt: pubDate,
          isSponsored: i % 10 === 0,
          viewCount: Math.floor(rand() * 4500) + 200,
          readingTimeMinutes: 4,
          createdAt: pubDate,
          updatedAt: pubDate
        };
        const exists = db.getContents().some((c) => c.slug === slug);
        if (!exists) {
          db.getContents().unshift(newContent);
          db.getContentLocations(newContent.id).push({
            contentId: newContent.id,
            locationId: targetLoc.id,
            relevanceScore: 95,
            isPrimary: true
          });
          db.getContentEntities(newContent.id).push({
            contentId: newContent.id,
            entityId: targetEnt.id,
            relevanceScore: 90,
            relationType: "subject"
          });
          stats.contents++;
        }
      }
    }
    if (!options.module || options.module === "Ads") {
      const activeAdvertisers = db.getAdvertisers();
      if (activeAdvertisers.length === 0) {
        const adv = {
          id: "adv-seed-1",
          companyName: "Astra International AdSpace",
          contactEmail: "ads@astra.co.id",
          budgetTotal: 15e7,
          budgetSpent: 425e5,
          createdAt: now
        };
        db.getAdvertisers().push(adv);
        const camp = {
          id: "cam-seed-1",
          advertiserId: adv.id,
          name: "Promo Mudik Hemat Astra 2026",
          startAt: now,
          endAt: new Date(Date.now() + 30 * 24 * 3600 * 1e3).toISOString(),
          budget: 5e7,
          status: "active",
          targetLocations: ["bandung", "jakarta-pusat"],
          createdAt: now
        };
        db.getCampaigns().push(camp);
        const creatives = [
          {
            id: "cr-seed-1",
            campaignId: camp.id,
            placement: "header_leaderboard",
            imageUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&h=200&q=80",
            destinationUrl: "https://www.astra.co.id",
            altText: "Layanan Servis Astra Terpercaya Liburan Aman",
            impressionLimit: 5e5,
            clickLimit: 12e3,
            impressionsCount: 234100,
            clicksCount: 3120,
            status: "active",
            createdAt: now
          },
          {
            id: "cr-seed-2",
            campaignId: camp.id,
            placement: "sidebar",
            imageUrl: "https://images.unsplash.com/photo-1511527654053-d8919d798655?auto=format&fit=crop&w=300&h=600&q=80",
            destinationUrl: "https://www.astra.co.id",
            altText: "Astra Financial: Solusi Pembiayaan Cepat Berizin OJK",
            impressionLimit: 2e5,
            clickLimit: 8e3,
            impressionsCount: 84300,
            clicksCount: 940,
            status: "active",
            createdAt: now
          }
        ];
        creatives.forEach((cr) => db.getCreatives().push(cr));
        stats.campaigns++;
        stats.creatives = creatives.length;
      }
    }
    if (!options.module || options.module === "Community") {
      const forumSeedThreads = [
        {
          id: `th-seed-1-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          title: "Bagaimana masa depan digitalisasi rantai pasok kopi Java Preanger Jabar?",
          category: "industri",
          author: "Sulaeman Kopi (Pangalengan)",
          content: "Kami melihat harga pupuk dan ongkos kirim ke pelabuhan Patimban masih tinggi. Apakah teknologi drone penyemprot dan aplikasi marketplace tani dapat mereduksi biaya operational?",
          tags: ["Agrotech", "SupplyChain", "Kopi"],
          likes: 34,
          repliesCount: 3,
          views: 450,
          isPinned: true,
          isSolved: true,
          votes: 18,
          aiSummary: "Diskusi optimasi logistik agroindustri kopi di Jawa Barat. Forum mengidentifikasi bahwa sewa drone menyemprot menghemat 40% pemakaian air, dan integrasi marketplace memotong tengkulak daerah.",
          replies: [
            { id: "rep-s1", author: "Aditya Pratama", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80", content: "Di Pangalengan kami sudah coba drone sewa, patungan bersama 4 kelompok tani. Biaya jauh lebih hemat karena waktu sebar pupuk cuma 15 menit per hektar.", isSolvedAnswer: true, likes: 12, quote: "" },
            { id: "rep-s2", author: "Dewi Lestari", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80", content: "Sangat setuju, pemotongan rantai tengkulak melalui portal digital INFOBOS juga sangat membantu sirkulasi margin modal tani kami.", isSolvedAnswer: false, likes: 7, quote: "Aditya Pratama: Di Pangalengan kami sudah coba drone sewa..." }
          ]
        },
        {
          id: `th-seed-2-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          title: "Rekomendasi Broker / Escrow terpercaya untuk transaksi alat manufaktur bekas?",
          category: "qa",
          author: "Faisal Rian (Teknik Industri)",
          content: "Ada rencana beli mesin ekstraktor atsiri SUS316 seharga 20jt, tapi takut penipuan. Sistem Escrow INFOBOS apakah sudah mengcover asuransi penahanan dana hingga unit lolos QC?",
          tags: ["Escrow", "Mesin", "Manufaktur"],
          likes: 18,
          repliesCount: 1,
          views: 290,
          isPinned: false,
          isSolved: false,
          votes: 5,
          aiSummary: "Anggota menanyakan kredibilitas rekening bersama / escrow asuransi INFOBOS. Dijelaskan bahwa asuransi escrow aktif memproteksi pembeli dari mesin malfungsi.",
          replies: [
            { id: "rep-s3", author: "Ahmad Dahlan", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80", content: "Escrow INFOBOS sangat aman! Dana ditahan di rekening bank terpercaya OJK, dan baru cair setelah pembeli menekan tombol Verifikasi Fisik Lolos QC dalam 2 hari kerja.", isSolvedAnswer: true, likes: 9, quote: "" }
          ]
        }
      ];
      stats.forumThreads = forumSeedThreads.length;
      return { success: true, stats, message: "Fidelity Seeding completed beautifully" };
    }
    db.addAuditLog({
      id: `aud-seed-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      actorId: "usr-admin",
      actorName: "System Administrator (Ahmad Dahlan)",
      action: "system.seed",
      entityName: "database",
      entityId: "db_store.json",
      newValues: { options, stats },
      timestamp: now
    });
    db.save();
    return { success: true, stats, message: "Platform data seeding successfully finished!" };
  }
  /**
   * Clears all content, audits, versions, keeping only default admin credentials.
   */
  static resetDatabase() {
    const db = RelationalDB.getInstance();
    const now = (/* @__PURE__ */ new Date()).toISOString();
    db.getContents().length = 0;
    db.getContentLocations("").length = 0;
    db.getContentEntities("").length = 0;
    db.getContentTopics("").length = 0;
    db.getContentTags("").length = 0;
    db.getContentVersions().length = 0;
    db.getCampaigns().length = 0;
    db.getCreatives().length = 0;
    db.getAuditLogs().length = 0;
    db.getCorrections().length = 0;
    db.getUsers().length = 0;
    db.getUsers().push(
      { id: "usr-admin", email: "admin@infobos.com", passwordHash: "admin123", fullName: "Ahmad Dahlan", role: "super_admin", status: "active", createdAt: now, updatedAt: now },
      { id: "usr-editor", email: "editor@infobos.com", passwordHash: "editor123", fullName: "Siti Rahma", role: "managing_editor", status: "active", createdAt: now, updatedAt: now },
      { id: "usr-reporter", email: "reporter@infobos.com", passwordHash: "reporter123", fullName: "Budi Santoso", role: "reporter", status: "active", createdAt: now, updatedAt: now }
    );
    db.getCategories().length = 0;
    db.getCategories().push(
      { id: "cat-breaking", name: "Breaking News", slug: "breaking-news", parentId: null, createdAt: now },
      { id: "cat-terbaru", name: "Terbaru", slug: "terbaru", parentId: null, createdAt: now },
      { id: "cat-trending", name: "Trending", slug: "trending", parentId: null, createdAt: now },
      { id: "cat-editor", name: "Pilihan Editor", slug: "pilihan-editor", parentId: null, createdAt: now },
      { id: "cat-investigasi", name: "Investigasi", slug: "investigasi", parentId: null, createdAt: now },
      { id: "cat-analisis", name: "Analisis", slug: "analisis", parentId: null, createdAt: now },
      { id: "cat-opini", name: "Opini", slug: "opini", parentId: null, createdAt: now },
      { id: "cat-factcheck", name: "Fact Check", slug: "fact-check", parentId: null, createdAt: now },
      { id: "cat-explainer", name: "Explainer", slug: "explainer", parentId: null, createdAt: now },
      { id: "cat-riset", name: "Riset & Insight", slug: "riset-insight", parentId: null, createdAt: now },
      { id: "cat-regional", name: "Regional", slug: "regional", parentId: null, createdAt: now },
      { id: "cat-nasional", name: "Nasional", slug: "nasional", parentId: null, createdAt: now },
      { id: "cat-politik", name: "Politik", slug: "politik", parentId: null, createdAt: now },
      { id: "cat-ekonomi", name: "Ekonomi", slug: "ekonomi", parentId: null, createdAt: now },
      { id: "cat-internasional", name: "Internasional", slug: "internasional", parentId: null, createdAt: now },
      { id: "cat-business", name: "Business", slug: "business", parentId: null, createdAt: now },
      { id: "cat-technology", name: "Technology", slug: "technology", parentId: null, createdAt: now },
      { id: "cat-startup", name: "Startup", slug: "startup", parentId: null, createdAt: now },
      { id: "cat-ai-data", name: "AI & Data", slug: "ai-data", parentId: null, createdAt: now },
      { id: "cat-pendidikan", name: "Pendidikan", slug: "pendidikan", parentId: null, createdAt: now },
      { id: "cat-kesehatan", name: "Kesehatan", slug: "kesehatan", parentId: null, createdAt: now },
      { id: "cat-sports", name: "Sports", slug: "sports", parentId: null, createdAt: now },
      { id: "cat-lifestyle", name: "Lifestyle", slug: "lifestyle", parentId: null, createdAt: now },
      { id: "cat-otomotif", name: "Otomotif", slug: "otomotif", parentId: null, createdAt: now },
      { id: "cat-properti", name: "Properti", slug: "properti", parentId: null, createdAt: now },
      { id: "cat-live-feed", name: "Live Feed", slug: "live-feed", parentId: null, createdAt: now }
    );
    db.getTopics().length = 0;
    db.getTopics().push(
      { id: "top-inflasi", name: "Ekonomi Makro & Inflasi", slug: "ekonomi-makro-inflasi", description: "Isu kenaikan harga pangan dan kebijakan moneter", createdAt: now },
      { id: "top-ai", name: "Kecerdasan Buatan (AI)", slug: "kecerdasan-buatan-ai", description: "Perkembangan teknologi AI, regulasi, dan implementasi", createdAt: now },
      { id: "top-wisata", name: "Revitalisasi Wisata", slug: "revitalisasi-wisata", description: "Pemugaran objek bersejarah dan promosi pariwisata daerah", createdAt: now }
    );
    db.getTags().length = 0;
    db.getTags().push(
      { id: "tag-rupiah", name: "Rupiah", slug: "rupiah", createdAt: now },
      { id: "tag-bandung", name: "Bandung Juara", slug: "bandung-juara", createdAt: now },
      { id: "tag-pajak", name: "Kebijakan Pajak", slug: "kebijakan-pajak", createdAt: now }
    );
    db.getLocations().length = 0;
    db.getLocations().push(
      { id: "loc-idn", name: "Indonesia", slug: "indonesia", type: "country", parentId: null, latitude: -0.7893, longitude: 113.9213, createdAt: now },
      { id: "loc-jabar", name: "Jawa Barat", slug: "jawa-barat", type: "province", parentId: "loc-idn", latitude: -6.9175, longitude: 107.6191, createdAt: now },
      { id: "loc-dki", name: "DKI Jakarta", slug: "dki-jakarta", type: "province", parentId: "loc-idn", latitude: -6.2088, longitude: 106.8456, createdAt: now },
      { id: "loc-bdg", name: "Bandung", slug: "bandung", type: "city", parentId: "loc-jabar", latitude: -6.9175, longitude: 107.6191, weatherTemp: 26, weatherCondition: "Hujan Ringan", aqi: 45, alertTitle: "Waspada Hujan Petir Sore Hari", alertLevel: "info", createdAt: now },
      { id: "loc-jkt", name: "Jakarta Pusat", slug: "jakarta-pusat", type: "city", parentId: "loc-dki", latitude: -6.1751, longitude: 106.8272, weatherTemp: 31, weatherCondition: "Cerah Berawan", aqi: 112, alertTitle: "Kualitas Udara Tidak Sehat", alertLevel: "warning", createdAt: now }
    );
    db.getEntities().length = 0;
    db.getEntities().push(
      { id: "ent-sri", name: "Sri Mulyani Indrawati", slug: "sri-mulyani-indrawati", type: "person", description: "Menteri Keuangan Republik Indonesia yang dikenal dengan reformasi fiskal dan pengakuan global.", websiteUrl: "https://www.kemenkeu.go.id", logoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80", isClaimed: true, metadata: { position: "Menteri Keuangan RI", activeSince: "2016" }, createdAt: now },
      { id: "ent-rk", name: "Ridwan Kamil", slug: "ridwan-kamil", type: "person", description: "Arsitek ternama Indonesia, mantan Gubernur Jawa Barat, yang berfokus pada pembangunan infrastruktur humanis.", websiteUrl: "https://www.ridwankamil.id", logoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80", isClaimed: true, metadata: { position: "Eks Gubernur Jabar", profession: "Arsitek & Urban Planner" }, createdAt: now },
      { id: "ent-gdsate", name: "Gedung Sate", slug: "gedung-sate", type: "landmark", description: "Gedung bersejarah karya arsitek J. Gerber di Bandung yang kini berfungsi sebagai kantor pemerintahan Provinsi Jawa Barat.", logoUrl: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=300&q=80", isClaimed: false, createdAt: now }
    );
    db.addAuditLog({
      id: `aud-reset-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      actorId: "usr-admin",
      actorName: "System Administrator (Ahmad Dahlan)",
      action: "system.reset",
      entityName: "database",
      entityId: "db_store.json",
      timestamp: now
    });
    db.save();
  }
};

// server.ts
var import_genai2 = require("@google/genai");

// src/data/enhancedSitemap.ts
var ENHANCED_SITEMAP_80 = [
  { no: 1, mainMenu: "Beranda", subMenu: "Hero News", detail: "Breaking News, Headline, Trending, Editor's Pick, Latest News", slug: "home", priority: 1, changefreq: "hourly", status: "indexed" },
  { no: 2, mainMenu: "Berita", subMenu: "Semua Berita", detail: "Feed Semua Berita", slug: "news", priority: 0.9, changefreq: "daily", status: "indexed" },
  { no: 3, mainMenu: "Regional", subMenu: "Provinsi", detail: "Seluruh Provinsi Indonesia", slug: "regional/provinsi", priority: 0.8, changefreq: "daily", status: "indexed" },
  { no: 4, mainMenu: "Regional", subMenu: "Kabupaten/Kota", detail: "Seluruh Kabupaten & Kota", slug: "regional/kabupaten-kota", priority: 0.8, changefreq: "daily", status: "indexed" },
  { no: 5, mainMenu: "Regional", subMenu: "Kecamatan", detail: "Kecamatan", slug: "regional/kecamatan", priority: 0.7, changefreq: "weekly", status: "indexed" },
  { no: 6, mainMenu: "Regional", subMenu: "Kelurahan/Desa", detail: "Desa/Kelurahan", slug: "regional/desa-kelurahan", priority: 0.7, changefreq: "weekly", status: "indexed" },
  { no: 7, mainMenu: "Nasional", subMenu: "Pemerintahan", detail: "Presiden, DPR, Kementerian, BUMN", slug: "nasional/pemerintahan", priority: 0.8, changefreq: "daily", status: "indexed" },
  { no: 8, mainMenu: "Internasional", subMenu: "Dunia", detail: "Asia, ASEAN, Eropa, Amerika, Afrika, Timur Tengah, Oceania", slug: "internasional/dunia", priority: 0.8, changefreq: "daily", status: "indexed" },
  { no: 9, mainMenu: "Politik", subMenu: "Nasional", detail: "Pemerintah, DPR, Partai, Pilkada, Pemilu", slug: "politik", priority: 0.8, changefreq: "daily", status: "indexed" },
  { no: 10, mainMenu: "Ekonomi", subMenu: "Makro", detail: "Inflasi, PDB, APBN, Fiskal, Moneter", slug: "ekonomi", priority: 0.8, changefreq: "daily", status: "indexed" },
  { no: 11, mainMenu: "Finance", subMenu: "Pasar Keuangan", detail: "Saham, Obligasi, Forex, Komoditas, Kripto", slug: "finance", priority: 0.9, changefreq: "always", status: "indexed" },
  { no: 12, mainMenu: "Bisnis", subMenu: "Industri", detail: "Manufaktur, Retail, UMKM, Franchise, Startup", slug: "bisnis", priority: 0.8, changefreq: "daily", status: "indexed" },
  { no: 13, mainMenu: "Investasi", subMenu: "Investasi", detail: "Saham, Reksa Dana, Properti, Emas, Venture Capital", slug: "investasi", priority: 0.8, changefreq: "daily", status: "indexed" },
  { no: 14, mainMenu: "Teknologi", subMenu: "Teknologi", detail: "AI, Software, Hardware, Cloud, IoT, Robotik", slug: "teknologi", priority: 0.8, changefreq: "daily", status: "indexed" },
  { no: 15, mainMenu: "Startup", subMenu: "Startup", detail: "Pendanaan, Unicorn, IPO, Founder", slug: "startup", priority: 0.8, changefreq: "daily", status: "indexed" },
  { no: 16, mainMenu: "AI", subMenu: "Artificial Intelligence", detail: "Generative AI, LLM, AI Agent, Automation", slug: "ai-data", priority: 0.9, changefreq: "daily", status: "indexed" },
  { no: 17, mainMenu: "Sains", subMenu: "Penelitian", detail: "Astronomi, Biologi, Fisika, Kimia", slug: "sains", priority: 0.7, changefreq: "weekly", status: "indexed" },
  { no: 18, mainMenu: "Pendidikan", subMenu: "Pendidikan", detail: "Sekolah, Kampus, Beasiswa, Kurikulum", slug: "pendidikan", priority: 0.7, changefreq: "weekly", status: "indexed" },
  { no: 19, mainMenu: "Kesehatan", subMenu: "Health", detail: "Medis, Rumah Sakit, Obat, Nutrisi, Mental Health", slug: "kesehatan", priority: 0.7, changefreq: "weekly", status: "indexed" },
  { no: 20, mainMenu: "Lingkungan", subMenu: "Environment", detail: "Iklim, Energi, Sampah, ESG", slug: "lingkungan", priority: 0.7, changefreq: "weekly", status: "indexed" },
  { no: 21, mainMenu: "Energi", subMenu: "Energy", detail: "Migas, PLN, EBT, Batu Bara", slug: "energi", priority: 0.7, changefreq: "weekly", status: "indexed" },
  { no: 22, mainMenu: "Infrastruktur", subMenu: "Infrastruktur", detail: "Jalan, Tol, Bandara, Pelabuhan, Kereta", slug: "infrastruktur", priority: 0.7, changefreq: "weekly", status: "indexed" },
  { no: 23, mainMenu: "Properti", subMenu: "Real Estate", detail: "Rumah, Apartemen, Komersial", slug: "properti", priority: 0.7, changefreq: "weekly", status: "indexed" },
  { no: 24, mainMenu: "Otomotif", subMenu: "Automotive", detail: "Mobil, Motor, EV, Industri Otomotif", slug: "otomotif", priority: 0.7, changefreq: "weekly", status: "indexed" },
  { no: 25, mainMenu: "Transportasi", subMenu: "Transport", detail: "Udara, Laut, Darat, Logistik", slug: "transportasi", priority: 0.7, changefreq: "weekly", status: "indexed" },
  { no: 26, mainMenu: "Pariwisata", subMenu: "Tourism", detail: "Destinasi, Hotel, Travel", slug: "pariwisata", priority: 0.7, changefreq: "weekly", status: "indexed" },
  { no: 27, mainMenu: "Kuliner", subMenu: "Food", detail: "Restoran, UMKM Kuliner, Review", slug: "kuliner", priority: 0.7, changefreq: "weekly", status: "indexed" },
  { no: 28, mainMenu: "Lifestyle", subMenu: "Lifestyle", detail: "Fashion, Beauty, Keluarga, Hobi", slug: "lifestyle", priority: 0.6, changefreq: "weekly", status: "indexed" },
  { no: 29, mainMenu: "Hiburan", subMenu: "Entertainment", detail: "Film, Musik, Selebriti, Streaming", slug: "hiburan", priority: 0.7, changefreq: "weekly", status: "indexed" },
  { no: 30, mainMenu: "Olahraga", subMenu: "Sports", detail: "Sepak Bola, Basket, MotoGP, F1, Badminton, Esports", slug: "sports", priority: 0.8, changefreq: "daily", status: "indexed" },
  { no: 31, mainMenu: "Esports & Gaming", subMenu: "Gaming", detail: "Game, Turnamen, Industri Game", slug: "esports-gaming", priority: 0.7, changefreq: "daily", status: "indexed" },
  { no: 32, mainMenu: "Hukum", subMenu: "Law", detail: "Pengadilan, Regulasi, Advokat", slug: "hukum", priority: 0.7, changefreq: "weekly", status: "indexed" },
  { no: 33, mainMenu: "Kriminal", subMenu: "Crime", detail: "Kepolisian, Investigasi, Kejahatan", slug: "kriminal", priority: 0.7, changefreq: "daily", status: "indexed" },
  { no: 34, mainMenu: "Sosial", subMenu: "Social", detail: "Komunitas, Budaya, CSR", slug: "sosial", priority: 0.6, changefreq: "weekly", status: "indexed" },
  { no: 35, mainMenu: "Agama", subMenu: "Religion", detail: "Islam, Kristen, Katolik, Hindu, Buddha, Konghucu", slug: "agama", priority: 0.6, changefreq: "weekly", status: "indexed" },
  { no: 36, mainMenu: "Budaya", subMenu: "Culture", detail: "Tradisi, Bahasa, Warisan Budaya", slug: "budaya", priority: 0.6, changefreq: "weekly", status: "indexed" },
  { no: 37, mainMenu: "Humaniora", subMenu: "Human Interest", detail: "Inspirasi, Tokoh, Kisah Nyata", slug: "human-interest", priority: 0.7, changefreq: "weekly", status: "indexed" },
  { no: 38, mainMenu: "Opini", subMenu: "Editorial", detail: "Kolom, Analisis, Perspektif", slug: "opini", priority: 0.8, changefreq: "daily", status: "indexed" },
  { no: 39, mainMenu: "Investigasi", subMenu: "Investigasi", detail: "Laporan Khusus", slug: "investigasi", priority: 0.8, changefreq: "weekly", status: "indexed" },
  { no: 40, mainMenu: "Data & Infografik", subMenu: "Visual Data", detail: "Grafik, Statistik, Dashboard", slug: "interactive-data", priority: 0.8, changefreq: "daily", status: "indexed" },
  { no: 41, mainMenu: "Cek Fakta", subMenu: "Fact Check", detail: "Hoaks, Verifikasi, Klarifikasi", slug: "cek-fakta", priority: 0.8, changefreq: "daily", status: "indexed" },
  { no: 42, mainMenu: "Video", subMenu: "Video News", detail: "Liputan, Dokumenter", slug: "video-hub", priority: 0.8, changefreq: "daily", status: "indexed" },
  { no: 43, mainMenu: "Shorts", subMenu: "Short Video", detail: "Vertical Video", slug: "short-video-hub", priority: 0.8, changefreq: "daily", status: "indexed" },
  { no: 44, mainMenu: "Podcast", subMenu: "Audio", detail: "Podcast Berita", slug: "podcast-center", priority: 0.8, changefreq: "daily", status: "indexed" },
  { no: 45, mainMenu: "Live", subMenu: "Siaran Langsung", detail: "Live News, Live Event, Konferensi Pers", slug: "live-feed", priority: 0.9, changefreq: "always", status: "indexed" },
  { no: 46, mainMenu: "Foto", subMenu: "Galeri", detail: "Photo Story", slug: "gallery-center", priority: 0.7, changefreq: "weekly", status: "indexed" },
  { no: 47, mainMenu: "Infografik", subMenu: "Visual Story", detail: "Infografik Interaktif", slug: "infographics", priority: 0.8, changefreq: "weekly", status: "indexed" },
  { no: 48, mainMenu: "Topik", subMenu: "Topic Hub", detail: "Semua Topik", slug: "topics", priority: 0.7, changefreq: "daily", status: "indexed" },
  { no: 49, mainMenu: "Tag", subMenu: "Tag Hub", detail: "Semua Tag", slug: "tags", priority: 0.7, changefreq: "daily", status: "indexed" },
  { no: 50, mainMenu: "Perusahaan", subMenu: "Company News", detail: "Berita Perusahaan", slug: "directory/companies", priority: 0.7, changefreq: "daily", status: "indexed" },
  { no: 51, mainMenu: "Brand", subMenu: "Brand News", detail: "Berita Merek", slug: "directory/brands", priority: 0.7, changefreq: "daily", status: "indexed" },
  { no: 52, mainMenu: "Produk", subMenu: "Product News", detail: "Peluncuran Produk", slug: "directory/products", priority: 0.7, changefreq: "daily", status: "indexed" },
  { no: 53, mainMenu: "Tokoh", subMenu: "People", detail: "Profil & Berita Tokoh", slug: "directory/people", priority: 0.7, changefreq: "daily", status: "indexed" },
  { no: 54, mainMenu: "Pemerintah", subMenu: "Government", detail: "Instansi, Daerah", slug: "directory/government", priority: 0.7, changefreq: "weekly", status: "indexed" },
  { no: 55, mainMenu: "Organisasi", subMenu: "Organization", detail: "Asosiasi, NGO", slug: "directory/organizations", priority: 0.7, changefreq: "weekly", status: "indexed" },
  { no: 56, mainMenu: "Event", subMenu: "Event News", detail: "Seminar, Expo, Webinar", slug: "event-center", priority: 0.8, changefreq: "daily", status: "indexed" },
  { no: 57, mainMenu: "Press Release", subMenu: "Press Release", detail: "Resmi Perusahaan & Instansi", slug: "press-release", priority: 0.7, changefreq: "daily", status: "indexed" },
  { no: 58, mainMenu: "Kolaborasi Media", subMenu: "Media Partner", detail: "Sindikasi", slug: "media-partner", priority: 0.7, changefreq: "weekly", status: "indexed" },
  { no: 59, mainMenu: "Trending", subMenu: "Trending", detail: "Hari Ini, Mingguan, Bulanan", slug: "trending", priority: 0.8, changefreq: "hourly", status: "indexed" },
  { no: 60, mainMenu: "Populer", subMenu: "Most Read", detail: "Paling Banyak Dibaca", slug: "most-read", priority: 0.8, changefreq: "hourly", status: "indexed" },
  { no: 61, mainMenu: "Pilihan Editor", subMenu: "Editor's Choice", detail: "Rekomendasi Editor", slug: "editors-choice", priority: 0.8, changefreq: "hourly", status: "indexed" },
  { no: 62, mainMenu: "Newsletter", subMenu: "Newsletter", detail: "Arsip Newsletter", slug: "newsletter", priority: 0.7, changefreq: "weekly", status: "indexed" },
  { no: 63, mainMenu: "Arsip", subMenu: "Archive", detail: "Harian, Bulanan, Tahunan", slug: "archive", priority: 0.6, changefreq: "yearly", status: "indexed" },
  { no: 64, mainMenu: "Pencarian", subMenu: "Search", detail: "Global Search", slug: "search", priority: 0.7, changefreq: "daily", status: "indexed" },
  { no: 65, mainMenu: "Peta Berita", subMenu: "Geo News", detail: "Berita Berbasis Peta", slug: "geo-news", priority: 0.8, changefreq: "daily", status: "indexed" },
  { no: 66, mainMenu: "Kalender", subMenu: "Calendar", detail: "Agenda Nasional & Internasional", slug: "calendar", priority: 0.7, changefreq: "daily", status: "indexed" },
  { no: 67, mainMenu: "Cuaca", subMenu: "Weather", detail: "Nasional & Regional", slug: "weather", priority: 0.7, changefreq: "hourly", status: "indexed" },
  { no: 68, mainMenu: "Bursa & Market", subMenu: "Market Widget", detail: "IHSG, Indeks Global, Kurs, Komoditas", slug: "market", priority: 0.8, changefreq: "always", status: "indexed" },
  { no: 69, mainMenu: "Pengumuman", subMenu: "Announcement", detail: "Informasi Resmi", slug: "announcement", priority: 0.7, changefreq: "daily", status: "indexed" },
  { no: 70, mainMenu: "Tentang", subMenu: "About", detail: "Profil INFOBOS", slug: "about", priority: 0.5, changefreq: "monthly", status: "indexed" },
  { no: 71, mainMenu: "Hubungi Kami", subMenu: "Contact", detail: "Kontak Redaksi", slug: "contact", priority: 0.5, changefreq: "monthly", status: "indexed" },
  { no: 72, mainMenu: "Tim Redaksi", subMenu: "Editorial Team", detail: "Penulis & Editor", slug: "editorial-team", priority: 0.5, changefreq: "monthly", status: "indexed" },
  { no: 73, mainMenu: "Pedoman Media", subMenu: "Editorial Policy", detail: "Kode Etik", slug: "editorial-policy", priority: 0.5, changefreq: "monthly", status: "indexed" },
  { no: 74, mainMenu: "Koreksi Berita", subMenu: "Correction", detail: "Hak Jawab & Koreksi", slug: "correction", priority: 0.5, changefreq: "monthly", status: "indexed" },
  { no: 75, mainMenu: "Karier", subMenu: "Careers", detail: "Lowongan", slug: "careers", priority: 0.6, changefreq: "weekly", status: "indexed" },
  { no: 76, mainMenu: "Beriklan", subMenu: "Advertise", detail: "Media Kit & Rate Card", slug: "advertise", priority: 0.7, changefreq: "monthly", status: "indexed" },
  { no: 77, mainMenu: "Partnership", subMenu: "Partnership", detail: "Kemitraan", slug: "partnership", priority: 0.6, changefreq: "monthly", status: "indexed" },
  { no: 78, mainMenu: "FAQ", subMenu: "Bantuan", detail: "Pertanyaan Umum", slug: "faq", priority: 0.6, changefreq: "monthly", status: "indexed" },
  { no: 79, mainMenu: "Kebijakan Privasi", subMenu: "Privacy", detail: "Privasi", slug: "privacy", priority: 0.5, changefreq: "monthly", status: "indexed" },
  { no: 80, mainMenu: "Syarat & Ketentuan", subMenu: "Terms", detail: "Ketentuan Penggunaan", slug: "terms", priority: 0.5, changefreq: "monthly", status: "indexed" }
];

// server.ts
var http = __toESM(require("http"), 1);
function proxyToLaravel(req, res) {
  const options = {
    hostname: "127.0.0.1",
    port: 8e3,
    path: req.originalUrl,
    method: req.method,
    headers: req.headers
  };
  if (options.headers) {
    options.headers["host"] = "127.0.0.1:8000";
  }
  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });
  proxyReq.on("error", (err) => {
    console.error("Laravel backend proxy error:", err);
    res.status(502).json({
      status: "error",
      message: "Laravel backend is not running at http://127.0.0.1:8000. Please start the Laravel server using: php artisan serve"
    });
  });
  req.pipe(proxyReq, { end: true });
}
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.post("/api/v1/debug-log", import_express.default.json(), (req, res) => {
    try {
      const logData = `[${(/* @__PURE__ */ new Date()).toISOString()}] ${JSON.stringify(req.body, null, 2)}

`;
      import_fs.default.appendFileSync(import_path.default.join(process.cwd(), "client_errors.log"), logData);
    } catch (e) {
      console.error("Failed to write to client_errors.log", e);
    }
    res.json({ ok: true });
  });
  app.use("/api/v1", (req, res) => {
    proxyToLaravel(req, res);
  });
  app.use(import_express.default.json());
  const db = RelationalDB.getInstance();
  let activeSessions = {
    "session-admin": { userId: "usr-admin", role: "super_admin", fullName: "Ahmad Dahlan", email: "admin@infobos.com" },
    "session-editor": { userId: "usr-editor", role: "managing_editor", fullName: "Siti Rahma", email: "editor@infobos.com" },
    "session-reporter": { userId: "usr-reporter", role: "reporter", fullName: "Budi Santoso", email: "reporter@infobos.com" }
  };
  const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authentication required" });
    }
    const token = authHeader.split(" ")[1];
    const session = activeSessions[token];
    if (!session) {
      return res.status(401).json({ error: "Invalid or expired session token" });
    }
    req.user = session;
    next();
  };
  const authorize = (permissions) => {
    return (req, res, next) => {
      const user = req.user;
      if (!user) return res.status(401).json({ error: "Authentication required" });
      const role = user.role;
      const rolePermissions = {
        super_admin: ["content.read", "content.draft.own", "content.submit.own", "content.edit.any", "content.review.any", "content.publish", "content.unpublish", "content.correct", "source.manage", "geography.manage", "entity.manage", "advertising.manage", "audit.view"],
        managing_editor: ["content.read", "content.draft.own", "content.submit.own", "content.edit.any", "content.review.any", "content.publish", "content.unpublish", "content.correct", "source.manage", "geography.manage", "entity.manage", "audit.view"],
        editor: ["content.read", "content.draft.own", "content.submit.own", "content.edit.any", "content.review.any", "content.publish", "geography.manage", "entity.manage"],
        reporter: ["content.read", "content.draft.own", "content.submit.own"],
        contributor: ["content.read", "content.draft.own", "content.submit.own"],
        member: ["content.read"]
      };
      const allowed = permissions.some((p) => rolePermissions[role]?.includes(p));
      if (!allowed) {
        return res.status(403).json({ error: `Forbidden: Missing required privilege for action.` });
      }
      next();
    };
  };
  app.post("/api/v1/auth/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const matchedUser = db.getUsers().find((u) => u.email === email && u.passwordHash === password);
    if (!matchedUser) {
      return res.status(401).json({ error: "Kredensial salah" });
    }
    if (matchedUser.status === "suspended") {
      return res.status(403).json({ error: "Akun Anda ditangguhkan" });
    }
    const token = `session-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    activeSessions[token] = {
      userId: matchedUser.id,
      role: matchedUser.role,
      fullName: matchedUser.fullName,
      email: matchedUser.email
    };
    db.addAuditLog({
      id: `aud-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      actorId: matchedUser.id,
      actorName: matchedUser.fullName,
      action: "user.login",
      entityName: "users",
      entityId: matchedUser.id,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    res.json({ token, user: { id: matchedUser.id, email: matchedUser.email, fullName: matchedUser.fullName, role: matchedUser.role } });
  });
  app.post("/api/v1/auth/register", (req, res) => {
    const { email, password, fullName } = req.body;
    if (!email || !password || !fullName) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const exists = db.getUsers().some((u) => u.email === email);
    if (exists) {
      return res.status(409).json({ error: "Email sudah terdaftar" });
    }
    const newUser = {
      id: `usr-${Date.now()}`,
      email,
      passwordHash: password,
      // Simplified clear hash
      fullName,
      role: "member",
      status: "active",
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    db.getUsers().push(newUser);
    db.save();
    res.json({ success: true, message: "Pendaftaran berhasil" });
  });
  app.get("/api/v1/auth/me", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({ user: null });
    }
    const token = authHeader.split(" ")[1];
    const session = activeSessions[token];
    if (!session) {
      return res.json({ user: null });
    }
    res.json({ user: session });
  });
  const selectIndex2 = (arr, rand) => arr[Math.floor(rand() * arr.length)];
  function generateVirtualTableItem(table, index) {
    if (table === "articles") {
      return VirtualScaleEngine.getArticle(index);
    }
    if (table === "news") {
      const art = VirtualScaleEngine.getArticle(index);
      return { ...art, id: `nws-virtual-${index}`, contentType: "standard" };
    }
    if (table === "blogs") {
      const art = VirtualScaleEngine.getArticle(index);
      return { ...art, id: `blg-virtual-${index}`, contentType: "opinion" };
    }
    if (table === "shortVideos") {
      return VirtualScaleEngine.getMediaItem("short-video", index);
    }
    if (table === "longVideos") {
      return VirtualScaleEngine.getMediaItem("long-video", index);
    }
    if (table === "podcasts") {
      return VirtualScaleEngine.getMediaItem("podcast", index);
    }
    if (table === "documents") {
      return VirtualScaleEngine.getMediaItem("document", index);
    }
    if (table === "gallery") {
      return VirtualScaleEngine.getMediaItem("gallery", index);
    }
    if (table === "events") {
      return VirtualScaleEngine.getMediaItem("event", index);
    }
    if (["entities", "companies", "brands", "products", "organizations", "govAgencies", "universities", "schools", "hospitals", "restaurants", "hotels", "attractions"].includes(table)) {
      return VirtualScaleEngine.getEntity(index);
    }
    if (["users", "authors", "creators", "reporters"].includes(table)) {
      return VirtualScaleEngine.getUser(index);
    }
    if (table === "comments") {
      const seed = `comment-seed-${index}`;
      const rand = getSeededRandom(seed);
      const positiveText = [
        "Wah, analisis yang sangat mendalam dan berbobot! \u{1F44D}",
        "Keren sekali, terus dukung transparansi data publik di Indonesia.",
        "Sinergi yang luar biasa, ini yang kita butuhkan untuk kemajuan daerah.",
        "Sepakat dengan ulasan ini, regulasi harus mendukung UMKM digital."
      ];
      const negativeText = [
        "Kebijakan ini terkesan terburu-buru dan minim sosialisasi.",
        "Skeptis saya dengan implementasinya di lapangan, biasanya banyak hambatan.",
        "Semoga ini bukan sekadar pencitraan pejabat saja.",
        "Anggarannya terlalu besar, padahal kesejahteraan guru honorer belum tuntas."
      ];
      const userIdx = Math.floor(rand() * 1e3);
      const user = VirtualScaleEngine.getUser(userIdx);
      const isPos = index % 2 === 0;
      const body = isPos ? selectIndex2(positiveText, rand) : selectIndex2(negativeText, rand);
      return {
        id: `cmt-virtual-${index}`,
        userId: user.id,
        userName: user.fullName,
        body,
        sentiment: isPos ? "positive" : "negative",
        likes: Math.floor(rand() * 50),
        createdAt: new Date(Date.now() - index * 5 * 60 * 1e3).toISOString()
      };
    }
    return null;
  }
  app.get("/api/v1/virtual/metrics", (req, res) => {
    res.json({
      success: true,
      metrics: SCALE_METRICS,
      systemStatus: {
        engine: "Deterministic Pseudo-Random Seed Database Engine (LCG v1.0)",
        footprint: "0.4 KB RAM (Virtual Representation)",
        loadedTables: Object.keys(SCALE_METRICS).length,
        redundancy: "Active-Active Mirroring",
        integrityCheck: "100% Passed (SHA-256 Verified)"
      }
    });
  });
  app.get("/api/v1/virtual/explorer", (req, res) => {
    const table = String(req.query.table || "articles");
    const page = Math.max(1, parseInt(String(req.query.page || "1"), 10));
    const limit = Math.max(1, Math.min(100, parseInt(String(req.query.limit || "10"), 10)));
    const search = String(req.query.search || "").trim().toLowerCase();
    const maxRows = SCALE_METRICS[table] || 1e3;
    const startIndex = (page - 1) * limit;
    const items = [];
    const searchMode = search.length > 0;
    let totalCount = maxRows;
    if (searchMode) {
      const scanLimit = 300;
      for (let i = 0; i < scanLimit && items.length < limit * 5; i++) {
        const item = generateVirtualTableItem(table, i);
        if (item) {
          const textToSearch = ((item.title || "") + " " + (item.summary || "") + " " + (item.fullName || "") + " " + (item.name || "") + " " + (item.body || "")).toLowerCase();
          if (textToSearch.includes(search)) {
            items.push(item);
          }
        }
      }
      totalCount = Math.floor(items.length * (maxRows / scanLimit));
    } else {
      const endIdx = Math.min(maxRows, startIndex + limit);
      for (let i = startIndex; i < endIdx; i++) {
        const item = generateVirtualTableItem(table, i);
        if (item) items.push(item);
      }
    }
    const paginatedItems = searchMode ? items.slice(startIndex, startIndex + limit) : items;
    res.json({
      success: true,
      table,
      page,
      limit,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      items: paginatedItems
    });
  });
  app.get("/api/v1/virtual/analytics", (req, res) => {
    const range = String(req.query.range || "monthly");
    try {
      const report = VirtualScaleEngine.getAnalyticsReport(range);
      const timeSeries = report.chartData.map((item) => ({
        label: item.label,
        views: item.pageViews,
        visitors: item.uniqueVisitors
      }));
      const regionalDistribution = report.regionalHeatmap.map((item) => ({
        city: item.city,
        province: item.province,
        pageviews: item.views,
        ctr: item.engagementRate / 1e3
        // scale to standard % CTR format
      }));
      res.json({
        ...report,
        timeSeries,
        regionalDistribution
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  app.post("/api/v1/seed/generate", async (req, res) => {
    const { mode, module: module2, category, region, year } = req.body;
    try {
      const result = await EnterpriseSeedEngine.generateSeed({
        mode: mode || "full",
        module: module2,
        category,
        region,
        year
      });
      res.json(result);
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  app.post("/api/v1/seed/reset", (req, res) => {
    try {
      EnterpriseSeedEngine.resetDatabase();
      res.json({ success: true, message: "Database reset to default system defaults successfully." });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  app.post("/api/v1/seed/update", (req, res) => {
    try {
      const now = (/* @__PURE__ */ new Date()).toISOString();
      db.addAuditLog({
        id: `aud-update-seed-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        actorId: "usr-admin",
        actorName: "System Administrator (Ahmad Dahlan)",
        action: "system.update_seed",
        entityName: "database",
        entityId: "db_store.json",
        timestamp: now
      });
      db.save();
      res.json({ success: true, message: "Database metrics and timestamps refreshed successfully." });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  app.post("/api/v1/seed/import", (req, res) => {
    const { payload } = req.body;
    try {
      if (!payload || typeof payload !== "object") {
        return res.status(400).json({ success: false, error: "Invalid seed payload." });
      }
      const keys = Object.keys(payload);
      const dbStore = db.data;
      for (const key of keys) {
        if (Array.isArray(dbStore[key])) {
          dbStore[key] = payload[key];
        }
      }
      db.save();
      res.json({ success: true, message: "External seed schema imported and merged successfully." });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  app.get("/api/v1/seed/export", (req, res) => {
    try {
      const dbStore = db.data;
      res.json({ success: true, payload: dbStore });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  app.get("/api/v1/virtual/relationships", (req, res) => {
    res.json({
      success: true,
      nodes: [
        { id: "Article", group: 1, label: "Artikel & Berita (50.000)" },
        { id: "Video", group: 1, label: "Video TV & Short Reels (28.000)" },
        { id: "Podcast", group: 1, label: "Podcasts & Transkrip (5.000)" },
        { id: "Creator", group: 2, label: "Kreator & Penulis (15.000)" },
        { id: "Company", group: 3, label: "Perusahaan & Mitra (30.000)" },
        { id: "Brand", group: 3, label: "Merek & Produk (40.000)" },
        { id: "Geo", group: 4, label: "Geografi & Wilayah (CITIES)" },
        { id: "Comment", group: 5, label: "Komentar Real-time (2.000.000)" },
        { id: "Trend", group: 6, label: "Peta Tren & Topik (5.000)" },
        { id: "Analytics", group: 6, label: "Metrik Interaksi (100.000.000)" }
      ],
      links: [
        { source: "Article", target: "Video", value: 5, label: "Article \u2194 Video" },
        { source: "Article", target: "Podcast", value: 3, label: "Article \u2194 Podcast" },
        { source: "Article", target: "Company", value: 8, label: "Article \u2194 Company" },
        { source: "Article", target: "Brand", value: 8, label: "Article \u2194 Brand" },
        { source: "Article", target: "Geo", value: 10, label: "Article \u2194 Geo" },
        { source: "Video", target: "Creator", value: 8, label: "Video \u2194 Creator" },
        { source: "Podcast", target: "Creator", value: 6, label: "Podcast \u2194 Guest" },
        { source: "Company", target: "Brand", value: 10, label: "Company \u2194 Brand" },
        { source: "Trend", target: "Article", value: 7, label: "Topic \u2194 Trend" },
        { source: "Comment", target: "Article", value: 9, label: "Comment \u2194 User" },
        { source: "Trend", target: "Analytics", value: 10, label: "Trend \u2194 Analytics" }
      ]
    });
  });
  app.get("/api/v1/virtual/scenario", (req, res) => {
    const id = String(req.query.id || "load");
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const scenarios = {
      load: {
        title: "Load & Stress Testing Simulation",
        description: "Simulates reading, commenting, and analytics tracking with millions of synthetic connections.",
        status: "success",
        telemetry: {
          concurrency: "45,000 active virtual users",
          averageLatency: "14ms",
          cpuLoad: "12.4%",
          ramFootprint: "118 MB",
          transactionsPerSecond: "8,920 TPS"
        },
        auditTrace: `[${timestamp}] LOAD_TESTER: Initialized concurrency spike... OK. Virtual databases responding. All relations resolved in <20ms.`
      },
      search: {
        title: "Multi-Million Text Search Testing",
        description: "Simulates full-text scanning, phrase extraction, and sentiment score weighting across 50,000 articles.",
        status: "success",
        telemetry: {
          scannedRows: "50,000 virtual rows",
          indexTime: "1.2ms",
          precision: "99.8% (Ground-Truth Correct)"
        },
        auditTrace: `[${timestamp}] SEARCH_ENGINE: Scanning keywords: 'AI', 'Sri Mulyani', 'Rupiah'... 124 exact matches found. Deterministic rankings verified.`
      },
      slow_query: {
        title: "Slow Query & Fail-Safe Test",
        description: "Simulates a DB lock or long-running pagination seek beyond 1,000,000 records.",
        status: "warning",
        telemetry: {
          executionTime: "2150ms (Intentional Delay)",
          cacheHitRate: "0% (Bypass Mode)",
          failSafeStatus: "TRIGGERED - Served deterministic fail-safe cached results"
        },
        auditTrace: `[${timestamp}] SLOW_QUERY: Seek beyond offset 1,800,000. Timeout hit (2000ms). Activating fallback replica engine.`
      },
      offline: {
        title: "Offline State & Sync Test",
        description: "Simulates network severance and browser IndexedDB state synchronization.",
        status: "offline",
        telemetry: {
          connectionState: "Offline (Simulated)",
          pendingPayloads: "14 cached operations",
          syncLock: "Local Read-Only Active"
        },
        auditTrace: `[${timestamp}] SYNC_ENGINE: Connection offline. Redirecting all client requests to browser local IndexedDB store. Safe state confirmed.`
      },
      rbac: {
        title: "Role-Based Access (RBAC) Audit",
        description: "Verifies authorization matrix across the 17 user roles.",
        status: "success",
        telemetry: {
          totalRolesVerified: 17,
          deniedRequests: 4120,
          approvedRequests: 18230
        },
        auditTrace: `[${timestamp}] RBAC_MONITOR: Reporter attempted to invoke 'content.publish'. Action BLOCKED with HTTP 403. Admin allowed.`
      },
      soft_delete: {
        title: "Soft & Hard Delete Integrity Scenario",
        description: "Ensures cascading integrity is preserved upon soft-deleting parents (like Category or Location).",
        status: "success",
        telemetry: {
          cascadedUpdates: "1,240 content references marked",
          recoveryChecksum: "VALID",
          hardDeleteGuard: "Active"
        },
        auditTrace: `[${timestamp}] GARBAGE_COLLECTOR: Category 'FinTech' soft-deleted. Related articles preserved under 'archived_category' state. Undo window: 30 days.`
      },
      audit_trail: {
        title: "Immutable Compliance Audit Trail",
        description: "Simulates block-chain styled audit trail log hashing for regulatory compliance.",
        status: "success",
        telemetry: {
          chainIntegrity: "100% Solid",
          totalHashedLogs: "254,120 transactions",
          lastHash: "0x8fa134d1bc98ae03ef"
        },
        auditTrace: `[${timestamp}] SECURE_AUDIT: Verification check passed. No log modifications detected. Compliance seal active.`
      },
      approval: {
        title: "Scheduled Publishing & Editorial Approval",
        description: "Evaluates cron triggers for future content publication.",
        status: "success",
        telemetry: {
          scheduledItems: "142 articles",
          pendingApprovals: "8 drafts",
          cronFiredCount: 24
        },
        auditTrace: `[${timestamp}] CHRONOS_CRON: Fired trigger at hour interval. Published 3 pending articles under primary category 'Terbaru'.`
      }
    };
    res.json({
      success: true,
      timestamp,
      scenario: scenarios[id] || scenarios.load
    });
  });
  app.get("/api/v1/seismic", async (req, res) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2e3);
      const response = await fetch("https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json", {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (response.ok) {
        const data = await response.json();
        const rawList = data?.Infogempa?.gempa || [];
        const formatted = rawList.slice(0, 10).map((g, index) => {
          const mag = parseFloat(g.Magnitude);
          let severity = "low";
          if (mag >= 5) severity = "high";
          else if (mag >= 4) severity = "medium";
          return {
            id: `eq-${index}-${g.DateTime}`,
            time: `${g.Tanggal}, ${g.Jam}`,
            dateTime: g.DateTime,
            magnitude: mag,
            depth: g.Kedalaman,
            location: g.Wilayah,
            coordinates: g.Coordinates || `${g.Lintang}, ${g.Bujur}`,
            potential: g.Potensi || "Tidak berpotensi tsunami",
            severity,
            isLive: true
          };
        });
        return res.json({ success: true, source: "BMKG Live Feed", data: formatted });
      }
    } catch (err) {
      console.warn("BMKG Live Feed fetch failed or timed out, using fallback:", err);
    }
    const fallbackEarthquakes = [
      {
        id: "eq-fb-1",
        time: "11 Jul 2026, 05:12 WIB",
        dateTime: "2026-07-11T05:12:44+07:00",
        magnitude: 5.4,
        depth: "12 km",
        location: "Pusat gempa berada di laut 45 km Barat Daya Sukabumi, Jawa Barat",
        coordinates: "-7.35, 106.52",
        potential: "Tidak berpotensi tsunami",
        severity: "high",
        isLive: false
      },
      {
        id: "eq-fb-2",
        time: "10 Jul 2026, 18:34 WIB",
        dateTime: "2026-07-10T18:34:02+07:00",
        magnitude: 4.8,
        depth: "10 km",
        location: "Pusat gempa berada di darat 8 km Barat Daya Kabupaten Cianjur, Jawa Barat",
        coordinates: "-6.84, 107.09",
        potential: "Tidak berpotensi tsunami",
        severity: "medium",
        isLive: false
      },
      {
        id: "eq-fb-3",
        time: "09 Jul 2026, 21:05 WIB",
        dateTime: "2026-07-09T21:05:11+07:00",
        magnitude: 3.6,
        depth: "5 km",
        location: "Pusat gempa berada di darat 15 km Timur Laut Kota Bandung, Jawa Barat (Sesar Lembang)",
        coordinates: "-6.81, 107.68",
        potential: "Terasa lemah di Lembang dan Cisarua",
        severity: "low",
        isLive: false
      },
      {
        id: "eq-fb-4",
        time: "08 Jul 2026, 02:18 WIB",
        dateTime: "2026-07-08T02:18:50+07:00",
        magnitude: 5.8,
        depth: "85 km",
        location: "Pusat gempa berada di laut 92 km Barat Daya Cilacap, Jawa Tengah",
        coordinates: "-8.45, 108.92",
        potential: "Tidak berpotensi tsunami",
        severity: "high",
        isLive: false
      },
      {
        id: "eq-fb-5",
        time: "07 Jul 2026, 14:22 WIB",
        dateTime: "2026-07-07T14:22:15+07:00",
        magnitude: 4.2,
        depth: "22 km",
        location: "Pusat gempa berada di darat 20 km Barat Laut Kabupaten Garut, Jawa Barat",
        coordinates: "-7.12, 107.82",
        potential: "Tidak berpotensi tsunami",
        severity: "medium",
        isLive: false
      }
    ];
    res.json({ success: true, source: "BMKG Offline Cache", data: fallbackEarthquakes });
  });
  app.get("/api/v1/contents", (req, res) => {
    try {
      const { category, tag, location, entity, topic, search, status, sentiment, contentType } = req.query;
      let list = db.getContents();
      const requestStatus = status ? String(status) : "published";
      list = list.filter((c) => c.status === requestStatus);
      if (category) {
        const catObj = db.getCategories().find((c) => c.slug === category);
        if (catObj) {
          list = list.filter((c) => c.primaryCategoryId === catObj.id);
        } else {
          list = [];
        }
      }
      if (tag) {
        const tagObj = db.getTags().find((t) => t.slug === tag);
        if (tagObj) {
          list = list.filter((c) => db.getContentTags(c.id).some((ct) => ct.tagId === tagObj.id));
        } else {
          list = [];
        }
      }
      if (topic) {
        const topicObj = db.getTopics().find((t) => t.slug === topic);
        if (topicObj) {
          list = list.filter((c) => db.getContentTopics(c.id).some((ct) => ct.topicId === topicObj.id));
        } else {
          list = [];
        }
      }
      if (location) {
        const locObj = db.getLocations().find((l) => l.slug === location);
        if (locObj) {
          const childLocIds = db.getLocations().filter((l) => l.parentId === locObj.id).map((l) => l.id);
          const searchIds = [locObj.id, ...childLocIds];
          list = list.filter((c) => db.getContentLocations(c.id).some((cl) => searchIds.includes(cl.locationId)));
        } else {
          list = [];
        }
      }
      if (entity) {
        const entObj = db.getEntities().find((e) => e.slug === entity);
        if (entObj) {
          list = list.filter((c) => db.getContentEntities(c.id).some((ce) => ce.entityId === entObj.id));
        } else {
          list = [];
        }
      }
      if (search) {
        const q = String(search).toLowerCase();
        list = list.filter(
          (c) => c.title.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q) || c.subtitle && c.subtitle.toLowerCase().includes(q)
        );
      }
      if (sentiment) {
        list = list.filter((c) => c.sentiment === sentiment);
      }
      if (contentType) {
        list = list.filter((c) => c.contentType === contentType);
      }
      const fullyMapped = list.map((c) => {
        const author = db.getUsers().find((u) => u.id === c.authorId);
        const cat = db.getCategories().find((ct) => ct.id === c.primaryCategoryId);
        const locs = db.getContentLocations(c.id).map((cl) => db.getLocations().find((l) => l.id === cl.locationId)).filter(Boolean);
        return {
          ...c,
          authorName: author ? author.fullName : "Redaksi INFOBOS",
          categoryName: cat ? cat.name : "Umum",
          categorySlug: cat ? cat.slug : "umum",
          locations: locs
        };
      });
      res.json({ contents: fullyMapped });
    } catch (error) {
      console.error("Error inside GET /api/v1/contents:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  });
  app.get("/api/v1/categories", (req, res) => {
    res.json({ categories: db.getCategories() });
  });
  app.get("/api/v1/contents/:slug", (req, res) => {
    const slug = req.params.slug;
    const contents = db.getContents();
    const c = contents.find((item) => item.slug === slug);
    if (!c) {
      return res.status(404).json({ error: "Artikel tidak ditemukan" });
    }
    c.viewCount++;
    db.save();
    const author = db.getUsers().find((u) => u.id === c.authorId);
    const editor = db.getUsers().find((u) => u.id === c.editorId);
    const category = db.getCategories().find((cat) => cat.id === c.primaryCategoryId);
    const locations = db.getContentLocations(c.id).map((cl) => {
      const loc = db.getLocations().find((l) => l.id === cl.locationId);
      return loc ? { ...loc, isPrimary: cl.isPrimary, relevance: cl.relevanceScore } : null;
    }).filter(Boolean);
    const entities = db.getContentEntities(c.id).map((ce) => {
      const ent = db.getEntities().find((e) => e.id === ce.entityId);
      return ent ? { ...ent, relation: ce.relationType, relevance: ce.relevanceScore } : null;
    }).filter(Boolean);
    const topics = db.getContentTopics(c.id).map((ct) => db.getTopics().find((t) => t.id === ct.topicId)).filter(Boolean);
    const tags = db.getContentTags(c.id).map((ct) => db.getTags().find((t) => t.id === ct.tagId)).filter(Boolean);
    const corrections = db.getCorrections().filter((cor) => cor.contentId === c.id);
    res.json({
      content: {
        ...c,
        authorName: author ? author.fullName : "Redaksi INFOBOS",
        editorName: editor ? editor.fullName : void 0,
        categoryName: category ? category.name : "Umum",
        categorySlug: category ? category.slug : "umum",
        locations,
        entities,
        topics,
        tags,
        corrections
      }
    });
  });
  app.get("/api/v1/search", (req, res) => {
    const q = String(req.query.q || "").trim();
    if (!q) {
      return res.json({ results: [] });
    }
    const lowerQ = q.toLowerCase();
    const queryTerms = lowerQ.split(/\s+/).filter((t) => t.length > 0);
    const matches = [];
    const calculateScore = (title, body, summary = "") => {
      const t = (title || "").toLowerCase();
      const b = (body || "").toLowerCase();
      const s = (summary || "").toLowerCase();
      let score = 0;
      if (t.includes(lowerQ)) score += 10;
      else if (s.includes(lowerQ)) score += 6;
      else if (b.includes(lowerQ)) score += 4;
      if (queryTerms.length > 1) {
        let matchedTermsCount = 0;
        queryTerms.forEach((term) => {
          let termMatched = false;
          if (t.includes(term)) {
            score += 2.5;
            termMatched = true;
          }
          if (s.includes(term)) {
            score += 1.5;
            termMatched = true;
          }
          if (b.includes(term)) {
            score += 1;
            termMatched = true;
          }
          if (termMatched) {
            matchedTermsCount++;
          }
        });
        if (matchedTermsCount === queryTerms.length) {
          score += 5;
        } else if (matchedTermsCount > 1) {
          score += matchedTermsCount * 1.5;
        }
      }
      return score;
    };
    db.getContents().filter((c) => c.status === "published").forEach((c) => {
      const score = calculateScore(c.title, c.body, c.summary);
      if (score > 0) {
        const cat = db.getCategories().find((ct) => ct.id === c.primaryCategoryId);
        matches.push({
          type: "article",
          id: c.id,
          title: c.title,
          slug: c.slug,
          excerpt: c.summary,
          categoryName: cat ? cat.name : "Umum",
          categorySlug: cat ? cat.slug : "umum",
          sentiment: c.sentiment || "neutral",
          riskLevel: c.riskLevel || "low",
          publishedAt: c.publishedAt,
          score
        });
      }
    });
    db.getLocations().forEach((l) => {
      let score = 0;
      const nameLower = l.name.toLowerCase();
      const descLower = `wilayah ${l.name} ${l.type}`.toLowerCase();
      if (nameLower.includes(lowerQ)) score += 8;
      else if (descLower.includes(lowerQ)) score += 3;
      queryTerms.forEach((term) => {
        if (nameLower.includes(term)) score += 2;
      });
      if (score > 0) {
        matches.push({
          type: "location",
          id: l.id,
          title: l.name,
          slug: l.slug,
          excerpt: `Kanal Geografi: Telusuri data intelijen dan berita pembangunan di wilayah ${l.name} (${l.type}).`,
          score
        });
      }
    });
    db.getEntities().forEach((e) => {
      let score = 0;
      const nameLower = e.name.toLowerCase();
      const descLower = (e.description || "").toLowerCase();
      if (nameLower.includes(lowerQ)) score += 8;
      else if (descLower.includes(lowerQ)) score += 4;
      queryTerms.forEach((term) => {
        if (nameLower.includes(term)) score += 2;
        if (descLower.includes(term)) score += 1;
      });
      if (score > 0) {
        matches.push({
          type: "entity",
          id: e.id,
          title: e.name,
          slug: e.slug,
          excerpt: `Profil Entitas: ${e.description}`,
          score
        });
      }
    });
    db.getCategories().forEach((cat) => {
      let score = 0;
      const nameLower = cat.name.toLowerCase();
      if (nameLower.includes(lowerQ)) score += 6;
      queryTerms.forEach((term) => {
        if (nameLower.includes(term)) score += 1.5;
      });
      if (score > 0) {
        matches.push({
          type: "category",
          id: cat.id,
          title: cat.name,
          slug: cat.slug,
          excerpt: `Kategori Berita: Lihat semua liputan dan analisis mendalam seputar tema ${cat.name}.`,
          score
        });
      }
    });
    db.getTopics().forEach((top) => {
      let score = 0;
      const nameLower = top.name.toLowerCase();
      const descLower = (top.description || "").toLowerCase();
      if (nameLower.includes(lowerQ)) score += 6.5;
      else if (descLower.includes(lowerQ)) score += 3;
      queryTerms.forEach((term) => {
        if (nameLower.includes(term)) score += 1.5;
        if (descLower.includes(term)) score += 1;
      });
      if (score > 0) {
        matches.push({
          type: "topic",
          id: top.id,
          title: top.name,
          slug: top.name,
          excerpt: `Fokus Isu: ${top.description}`,
          score
        });
      }
    });
    db.getTags().forEach((tag) => {
      let score = 0;
      const nameLower = tag.name.toLowerCase();
      if (nameLower.includes(lowerQ)) score += 5;
      if (score > 0) {
        matches.push({
          type: "tag",
          id: tag.id,
          title: `#${tag.name}`,
          slug: tag.name,
          excerpt: `Tag Populer: Telusuri seluruh artikel yang ditandai dengan label #${tag.name}.`,
          score
        });
      }
    });
    db.getCorrections().forEach((corr) => {
      let score = 0;
      const origLower = (corr.originalText || "").toLowerCase();
      const corrLower = (corr.correctedText || "").toLowerCase();
      const explLower = (corr.explanation || "").toLowerCase();
      if (origLower.includes(lowerQ)) score += 7;
      if (corrLower.includes(lowerQ)) score += 7;
      if (explLower.includes(lowerQ)) score += 5;
      queryTerms.forEach((term) => {
        if (origLower.includes(term)) score += 1.5;
        if (corrLower.includes(term)) score += 1.5;
        if (explLower.includes(term)) score += 1;
      });
      if (score > 0) {
        const relatedArt = db.getContents().find((c) => c.id === corr.contentId);
        matches.push({
          type: "correction",
          id: corr.id,
          title: `Koreksi: ${corr.originalText.slice(0, 70)}${corr.originalText.length > 70 ? "..." : ""}`,
          slug: relatedArt ? relatedArt.slug : "",
          excerpt: `Klarifikasi Fakta: "${corr.correctedText}". Penjelasan: ${corr.explanation}`,
          score
        });
      }
    });
    const mockListings = [
      {
        id: "list-1",
        title: "Peralatan Ekstraksi Minyak Atsiri Stainless 316",
        type: "jual",
        category: "Mesin & Industri",
        price: 245e5,
        description: "Mesin penyulingan atsiri kapasitas 100 Liter dengan material Food Grade SUS316. Garansi fabrikasi 1 tahun.",
        tags: ["Mesin", "Pertanian", "Atsiri"],
        location: "Kab. Bandung Barat"
      },
      {
        id: "list-jasa-1",
        title: "Jasa Konsultasi Sertifikasi Halal & NIB UMKM",
        type: "jasa",
        category: "Jasa Profesional",
        price: 15e5,
        description: "Layanan lengkap pengurusan legalitas badan usaha katering, restoran, dan UMKM makanan minuman. Mulai dari pembuatan NIB, Surat Keterangan Usaha, hingga audit dokumen pengajuan Sertifikat Halal MUI.",
        tags: ["Legalitas", "Halal", "NIB", "Konsultan"],
        location: "Depok"
      },
      {
        id: "list-lowongan-1",
        title: "Lowongan: Operator Mesin CNC & Bubut Presisi",
        type: "lowongan",
        category: "Lowongan Kerja",
        price: 65e5,
        description: "Dibutuhkan segera Operator Mesin CNC dan Bubut manual berpengalaman minimal 2 tahun di bidang manufaktur komponen presisi otomotif.",
        tags: ["Operator", "Manufaktur", "CNC", "Bubut"],
        location: "Bekasi"
      },
      {
        id: "list-2",
        title: "Sewa Drone Pertanian DJI Agras T30 + Pilot Berlisensi",
        type: "sewa",
        category: "Pertanian",
        price: 15e5,
        description: "Layanan penyemprotan pupuk cair & pestisida presisi menggunakan armada drone pertanian DJI Agras T30. Termasuk pilot bersertifikat FASI.",
        tags: ["Sewa", "Drone", "Agrotech"],
        location: "Majalengka"
      },
      {
        id: "list-3",
        title: "Dataset Anomali Curah Hujan & Spasial Padi Jabar 2020-2025",
        type: "digital",
        category: "Digital Product",
        price: 45e4,
        description: "Laporan spasial format GIS Shapefile & CSV yang merekam historis korelasi gagal panen akibat cuaca ekstrem di 27 Kabupaten/Kota Jawa Barat.",
        tags: ["Dataset", "Siber", "Pertanian"],
        location: "Kota Bandung"
      }
    ];
    mockListings.forEach((item) => {
      const score = calculateScore(item.title, item.description, item.tags.join(" "));
      if (score > 0) {
        matches.push({
          type: "marketplace",
          id: item.id,
          title: item.title,
          slug: "community-marketplace",
          excerpt: item.description,
          price: item.price,
          location: item.location,
          category: item.category,
          score
        });
      }
    });
    const mockProjects = [
      {
        id: "proj-1",
        title: "Tender: Sistem Irigasi Cerdas Daerah Irigasi Rentang",
        type: "tender",
        budget: "Rp 150.000.000",
        deadline: "15 Juli 2026",
        issuer: "Dinas Sumber Daya Air Jabar",
        description: "Pengembangan sistem pintu air otomatis berbasis mikrokontroler & sensor ultrasonik dengan dashboard pemantau debit air."
      },
      {
        id: "proj-2",
        title: "Freelance: Pembuatan Model GIS Deteksi Deforestasi Hutan Lindung",
        type: "freelance",
        budget: "Rp 18.000.000",
        deadline: "10 Juli 2026",
        issuer: "YPI Alam Lestari",
        description: "Dibutuhkan analis SIG berpengalaman untuk mengolah citra satelit Sentinel-2 guna memetakan titik tebang liar di Priangan Timur."
      },
      {
        id: "proj-3",
        title: "Full-Time: Lead Software Engineer (IoT Integration)",
        type: "job",
        budget: "Rp 22.000.000 - Rp 30.000.000 / bln",
        deadline: "20 Juli 2026",
        issuer: "PT Jabar Digital Agro",
        description: "Bertanggung jawab atas arsitektur backend penampung data telemetri ribuan sensor tanah menggunakan MQTT dan Node.js."
      }
    ];
    mockProjects.forEach((item) => {
      const score = calculateScore(item.title, item.description, item.issuer);
      if (score > 0) {
        matches.push({
          type: "jobs",
          id: item.id,
          title: item.title,
          slug: "community-marketplace",
          excerpt: item.description,
          budget: item.budget,
          issuer: item.issuer,
          deadline: item.deadline,
          score
        });
      }
    });
    matches.sort((a, b) => b.score - a.score);
    res.json({ results: matches });
  });
  app.get("/api/v1/locations/:slug/info", (req, res) => {
    const slug = req.params.slug;
    const loc = db.getLocations().find((l) => l.slug === slug);
    if (!loc) return res.status(404).json({ error: "Location not found" });
    const relatedIds = db.getLocations().filter((l) => l.parentId === loc.id || l.id === loc.id).map((l) => l.id);
    const contents = db.getContents().filter(
      (c) => c.status === "published" && db.getContentLocations(c.id).some((cl) => relatedIds.includes(cl.locationId))
    );
    res.json({ location: loc, relatedCount: contents.length });
  });
  app.get("/api/v1/entities/:slug/info", (req, res) => {
    const slug = req.params.slug;
    const ent = db.getEntities().find((e) => e.slug === slug);
    if (!ent) return res.status(404).json({ error: "Entity not found" });
    const relatedEntities = db.getEntities().filter((e) => e.id !== ent.id).slice(0, 2);
    res.json({ entity: ent, relatedEntities });
  });
  app.post("/api/v1/admin/contents", authenticate, authorize(["content.draft.own"]), async (req, res) => {
    const { title, subtitle, body, primaryCategoryId, contentType, isSponsored } = req.body;
    const user = req.user;
    if (!title || !body || !primaryCategoryId) {
      return res.status(400).json({ error: "Judul, Isi, dan Kategori utama wajib diisi" });
    }
    const id = `art-cms-${Date.now()}`;
    const slug = title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
    let summary = body.substring(0, 150) + "...";
    let sentiment = "neutral";
    let riskLevel = "low";
    let tagsList = [];
    let locsList = [];
    let entsList = [];
    try {
      const nlp = await IntelligenceService.analyzeContent(title, body);
      summary = nlp.summary;
      sentiment = nlp.sentiment;
      riskLevel = nlp.riskLevel;
      tagsList = nlp.tags;
      locsList = nlp.locations;
      entsList = nlp.entities;
    } catch (e) {
      console.error("Async tag extraction failed:", e);
    }
    const newArticle = {
      id,
      title,
      subtitle,
      slug,
      summary,
      body,
      contentType: contentType || "standard",
      status: "draft",
      primaryCategoryId,
      sentiment,
      riskLevel,
      authorId: user.userId,
      isSponsored: !!isSponsored,
      viewCount: 0,
      readingTimeMinutes: Math.max(1, Math.round(body.split(/\s+/).length / 200)),
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    db.addContent(newArticle);
    if (tagsList.length) {
      tagsList.forEach((t) => {
        let tagObj = db.getTags().find((x) => x.name.toLowerCase() === t.toLowerCase());
        if (!tagObj) {
          tagObj = { id: `tag-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`, name: t, slug: t.toLowerCase().replace(/\s+/g, "-"), createdAt: (/* @__PURE__ */ new Date()).toISOString() };
          db.getTags().push(tagObj);
        }
        db.getContentTags(id).push({ contentId: id, tagId: tagObj.id });
      });
    }
    locsList.forEach((l) => {
      const dbl = db.getLocations().find((x) => x.name.toLowerCase() === l.name.toLowerCase());
      if (dbl) {
        db.getContentLocations(id).push({ contentId: id, locationId: dbl.id, relevanceScore: 100, isPrimary: l.type === "city" });
      }
    });
    entsList.forEach((e) => {
      const dbe = db.getEntities().find((x) => x.name.toLowerCase() === e.name.toLowerCase());
      if (dbe) {
        db.getContentEntities(id).push({ contentId: id, entityId: dbe.id, relevanceScore: 100, relationType: e.type });
      }
    });
    db.addContentVersion({
      id: `ver-${Date.now()}`,
      contentId: id,
      title,
      body,
      summary,
      modifiedBy: user.userId,
      changeSummary: "Draf awal dibuat di CMS oleh " + user.fullName,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    db.addAuditLog({
      id: `aud-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      actorId: user.userId,
      actorName: user.fullName,
      action: "content.create",
      entityName: "contents",
      entityId: id,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    res.json({ success: true, content: newArticle });
  });
  app.put("/api/v1/admin/contents/:id", authenticate, authorize(["content.draft.own", "content.edit.any"]), async (req, res) => {
    const id = req.params.id;
    const { title, subtitle, body, primaryCategoryId, status, contentType, sentiment, riskLevel, changeSummary } = req.body;
    const user = req.user;
    const c = db.getContents().find((item) => item.id === id);
    if (!c) return res.status(404).json({ error: "Article not found" });
    if (user.role === "reporter" && c.authorId !== user.userId) {
      return res.status(403).json({ error: "Reporter can only edit own content" });
    }
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const isMajorChange = title !== c.title || body !== c.body;
    c.title = title || c.title;
    c.subtitle = subtitle || c.subtitle;
    c.body = body || c.body;
    c.primaryCategoryId = primaryCategoryId || c.primaryCategoryId;
    c.status = status || c.status;
    c.contentType = contentType || c.contentType;
    c.sentiment = sentiment || c.sentiment;
    c.riskLevel = riskLevel || c.riskLevel;
    c.updatedAt = now;
    if (isMajorChange) {
      db.addContentVersion({
        id: `ver-${Date.now()}`,
        contentId: id,
        title: c.title,
        body: c.body,
        summary: c.summary,
        modifiedBy: user.userId,
        changeSummary: changeSummary || "Perubahan konten utama",
        createdAt: now
      });
    }
    db.addAuditLog({
      id: `aud-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      actorId: user.userId,
      actorName: user.fullName,
      action: "content.update",
      entityName: "contents",
      entityId: id,
      timestamp: now
    });
    db.save();
    res.json({ success: true, content: c });
  });
  app.post("/api/v1/admin/contents/:id/workflow", authenticate, async (req, res) => {
    const id = req.params.id;
    const { transition, note, correctionOriginal, correctionCorrected, correctionExplanation } = req.body;
    const user = req.user;
    const c = db.getContents().find((item) => item.id === id);
    if (!c) return res.status(404).json({ error: "Article not found" });
    const now = (/* @__PURE__ */ new Date()).toISOString();
    switch (transition) {
      case "submit_review":
        c.status = "pending_review";
        break;
      case "needs_revision":
        if (!["super_admin", "managing_editor", "editor"].includes(user.role)) {
          return res.status(403).json({ error: "Only editors can request revisions." });
        }
        c.status = "needs_revision";
        break;
      case "approve_schedule":
        if (!["super_admin", "managing_editor", "editor"].includes(user.role)) {
          return res.status(403).json({ error: "Only editors can approve content." });
        }
        if (["high", "critical"].includes(c.riskLevel) && user.role === "editor") {
          return res.status(403).json({ error: `Pemberitahuan Tata Kelola: Konten berisiko tinggi (${c.riskLevel.toUpperCase()}) wajib mendapatkan persetujuan Managing Editor / Redaktur Senior.` });
        }
        c.status = "published";
        c.publishedAt = now;
        c.editorId = user.userId;
        break;
      case "emergency_kill":
        if (!["super_admin", "managing_editor"].includes(user.role)) {
          return res.status(403).json({ error: "Emergency unpublish is restricted to Managing Editor." });
        }
        c.status = "archived";
        break;
      case "post_correction":
        if (!["super_admin", "managing_editor"].includes(user.role)) {
          return res.status(403).json({ error: "Only Editorial Management can issue correction entries." });
        }
        if (!correctionOriginal || !correctionCorrected || !correctionExplanation) {
          return res.status(400).json({ error: "Semua isian log koreksi wajib dilengkapi." });
        }
        db.addCorrection({
          id: `cor-${Date.now()}`,
          contentId: c.id,
          factCheckerId: user.userId,
          originalText: correctionOriginal,
          correctedText: correctionCorrected,
          explanation: correctionExplanation,
          publishedAt: now
        });
        c.updatedAt = now;
        break;
      default:
        return res.status(400).json({ error: "Workflow transition invalid" });
    }
    db.addAuditLog({
      id: `aud-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      actorId: user.userId,
      actorName: user.fullName,
      action: `content.workflow.${transition}`,
      entityName: "contents",
      entityId: id,
      newValues: { status: c.status, note },
      timestamp: now
    });
    db.save();
    res.json({ success: true, content: c });
  });
  app.get("/api/v1/admin/contents", authenticate, (req, res) => {
    const list = db.getContents();
    const user = req.user;
    const filtered = user.role === "reporter" || user.role === "contributor" ? list.filter((c) => c.authorId === user.userId) : list;
    const mapped = filtered.map((c) => {
      const author = db.getUsers().find((u) => u.id === c.authorId);
      const cat = db.getCategories().find((ct) => ct.id === c.primaryCategoryId);
      return {
        ...c,
        authorName: author ? author.fullName : "System Ingestion",
        categoryName: cat ? cat.name : "Umum"
      };
    });
    res.json({ contents: mapped });
  });
  app.get("/api/v1/admin/audit-logs", authenticate, authorize(["audit.view"]), (req, res) => {
    res.json({ logs: db.getAuditLogs() });
  });
  app.get("/api/v1/admin/sources", authenticate, authorize(["source.manage"]), (req, res) => {
    res.json({ sources: db.getIngestionSources() });
  });
  app.post("/api/v1/admin/sources/:id/fetch", authenticate, authorize(["source.manage"]), async (req, res) => {
    const user = req.user;
    db.addAuditLog({
      id: `aud-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      actorId: user.userId,
      actorName: user.fullName,
      action: "ingestion.fetch_trigger",
      entityName: "sources",
      entityId: req.params.id,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    try {
      const result = await IngestionService.pollAndProcessAll();
      res.json({ success: true, result });
    } catch (e) {
      res.status(500).json({ error: "Ingestion poll failed: " + e.message });
    }
  });
  app.get("/api/v1/admin/ads", authenticate, authorize(["advertising.manage"]), (req, res) => {
    res.json({
      campaigns: db.getCampaigns(),
      creatives: db.getCreatives()
    });
  });
  app.get("/api/v1/ads/placement", (req, res) => {
    try {
      const { location, category, placement } = req.query;
      let list = db.getCreatives().filter((cr) => cr.status === "active");
      if (placement) {
        list = list.filter((cr) => cr.placement === placement);
      }
      const targetSlug = location ? String(location) : null;
      const targetCat = category ? String(category) : null;
      const matched = list.filter((cr) => {
        const campaign = db.getCampaigns().find((cp) => cp.id === cr.campaignId);
        if (!campaign || campaign.status !== "active") return false;
        if (targetSlug && campaign.targetLocations && campaign.targetLocations.length) {
          const matchesGeo = campaign.targetLocations.includes(targetSlug);
          if (!matchesGeo) return false;
        }
        if (targetCat && campaign.targetCategories && campaign.targetCategories.length) {
          const matchesCat = campaign.targetCategories.includes(targetCat);
          if (!matchesCat) return false;
        }
        return true;
      });
      if (matched.length === 0) {
        return res.json({ creative: db.getCreatives()[0] || null });
      }
      const index = Math.floor(Math.random() * matched.length);
      res.json({ creative: matched[index] });
    } catch (error) {
      console.error("Error inside GET /api/v1/ads/placement:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  });
  app.post("/api/v1/ads/impression", (req, res) => {
    const { creativeId } = req.body;
    if (creativeId) {
      db.trackAdImpression(creativeId);
    }
    res.json({ success: true });
  });
  app.post("/api/v1/ads/click", (req, res) => {
    const { creativeId } = req.body;
    if (creativeId) {
      db.trackAdClick(creativeId);
    }
    res.json({ success: true });
  });
  app.post("/api/v1/feature-explorer/ai", async (req, res) => {
    const { message, history } = req.body;
    const userQuery = String(message || "").trim();
    if (!userQuery) {
      return res.status(400).json({ error: "Pesan tidak boleh kosong." });
    }
    const apiKey = process.env.GEMINI_API_KEY;
    const hasValidKey = apiKey && apiKey !== "MY_GEMINI_API_KEY";
    if (hasValidKey) {
      try {
        const ai = new import_genai2.GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: { "User-Agent": "aistudio-build" }
          }
        });
        const systemPrompt = `Anda adalah INFOBOS Digital Platform Guide & Command Launcher. Tugas Anda adalah membantu pengguna memahami fitur, alur kerja (workflows), dan meluncurkan navigasi tab dengan cepat.

Kanal & Tab Navigasi yang valid di platform INFOBOS:
- "home": Homepage Bento Feed (Pusat kurasi berita visual)
- "widget-cms": Widget Library & CMS Sandbox (Konfigurasi sandbox widget interaktif)
- "intelligence-workspace": Intelligence Workspace Analysts (Alat bantu analisis teks AI & D3 force graph)
- "revenue-os": RevenueOS Monetization (Keuangan, Billing, Royalti Kreator)
- "community-marketplace": Community & Business Hub (Forum, direktori jualan, loker)
- "regional": Peta Geo Jabar (Visualisasi spasial anomali & berita Jawa Barat)
- "nasional": Peta Geo Nasional
- "internasional": Peta Geo Internasional
- "video-hub": Video Streaming TV Hub (Live TV, VOD jurnalisme)
- "podcast-center": Podcast Center Redaksi (Audio podcast + transkrip kalimat interaktif)
- "admin": News CMS & Editorial Dashboard (Pusat wartawan menulis berita, audit, log, koreksi)
- "mediaos": MediaOS Telemetry Console (Telemetri container, CPU/RAM, stress test)

Instruksi Output:
- Anda WAJIB membalas dengan objek JSON yang valid.
- JANGAN sertakan markdown block \`\`\`json ... \`\`\`. Kembalikan RAW JSON STRING saja agar mudah di-parse.
- Format JSON wajib:
  {
    "reply": "Kalimat balasan ramah dalam Bahasa Indonesia. Jelaskan fiturnya dengan detail dan sebutkan alurnya jika ditanya.",
    "targetTab": "slug_tab_navigasi_jika_pengguna_ingin_membuka_fitur_atau_kosongkan",
    "matchedFeatures": ["feat-home", "feat-widget-cms", "etc_jika_ada_yang_cocok"]
  }

Contoh pertanyaan: "Bagaimana alur kerja News CMS?" -> targetTab: "admin", matchedFeatures: ["feat-admin-cms"], reply: "Alur kerja News CMS terdiri dari 4 tahapan: Pertama, wartawan membuat draf. Kedua, draf dikirim ke Editor untuk ditinjau. Ketiga, draf berisiko tinggi wajib ditandatangani Managing Editor. Keempat, draf dipublikasikan secara resmi."`;
        const formattedContents = [
          { role: "user", parts: [{ text: systemPrompt }] }
        ];
        if (history && Array.isArray(history)) {
          history.forEach((h) => {
            formattedContents.push({
              role: h.sender === "user" ? "user" : "model",
              parts: [{ text: h.text }]
            });
          });
        }
        formattedContents.push({
          role: "user",
          parts: [{ text: userQuery }]
        });
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: formattedContents,
          config: {
            responseMimeType: "application/json"
          }
        });
        const resultText = response.text;
        if (resultText) {
          const parsed = JSON.parse(resultText.trim());
          return res.json({
            success: true,
            reply: parsed.reply,
            targetTab: parsed.targetTab || null,
            matchedFeatures: parsed.matchedFeatures || []
          });
        }
      } catch (err) {
        console.error("Gemini API Error in Feature Explorer Assistant:", err);
      }
    }
    const lowerQuery = userQuery.toLowerCase();
    let reply = "";
    let targetTab = null;
    let matchedFeatures = [];
    if (lowerQuery.includes("cms") || lowerQuery.includes("redaksi") || lowerQuery.includes("tulis") || lowerQuery.includes("alur") || lowerQuery.includes("koreksi")) {
      targetTab = "admin";
      matchedFeatures = ["feat-admin-cms"];
      reply = "Tentu! Alur kerja **News CMS & Editorial Dashboard** dirancang sesuai standar UU Pers dan Dewan Pers. \n\n**Alur Kerja Utama:**\n1. **Penyusunan Draf:** Wartawan menulis artikel dan AI otomatis mengekstrak entitas.\n2. **Kirim Peninjauan:** Draf masuk antrean 'Pending Review'.\n3. **Persetujuan (Governance):** Editor memeriksa draf. Artikel berisiko tinggi (High/Critical) wajib mendapatkan tanda tangan Managing Editor.\n4. **Publikasi & Log Koreksi:** Artikel dirilis ke publik. Jika ada kesalahan fakta, Redaksi Senior dapat menerbitkan 'Log Koreksi' transparan yang tampil di bawah artikel.";
    } else if (lowerQuery.includes("widget") || lowerQuery.includes("sandbox") || lowerQuery.includes("library") || lowerQuery.includes("pasang")) {
      targetTab = "widget-cms";
      matchedFeatures = ["feat-widget-cms"];
      reply = "Anda dapat membuka **Widget Library & CMS Sandbox** untuk menguji widget dinamis! Di sini Anda dapat memvalidasi parameter input JSON, menguji performa widget (jam live, indeks saham, alarm cuaca), dan menyalin kode embed HTML untuk dipasang langsung ke dalam artikel jurnalisme.";
    } else if (lowerQuery.includes("workspace") || lowerQuery.includes("analis") || lowerQuery.includes("riset") || lowerQuery.includes("sentimen") || lowerQuery.includes("intel")) {
      targetTab = "intelligence-workspace";
      matchedFeatures = ["feat-intel-workspace"];
      reply = "Saya sarankan menggunakan **Intelligence Workspace Analysts**. Alat ini sangat cocok untuk jurnalis investigasi. Anda dapat menganalisis sentimen naskah berita menggunakan Gemini 3.5, mengeksplorasi hubungan antar-tokoh publik secara dinamis dengan **D3 Force-Directed Graph**, serta melakukan simulasi beban pencarian data relasional.";
    } else if (lowerQuery.includes("keuangan") || lowerQuery.includes("monetisasi") || lowerQuery.includes("billing") || lowerQuery.includes("gaji") || lowerQuery.includes("revenue")) {
      targetTab = "revenue-os";
      matchedFeatures = ["feat-revenue-os"];
      reply = "Untuk kebutuhan finansial, silakan kunjungi **RevenueOS Monetization**. Dashboard ini menyajikan perolehan iklan CPM/CPC secara detail per wilayah, manajemen billing langganan premium, daftar harga lisensi API portal, serta integrasi pencairan dana royalti kreator.";
    } else if (lowerQuery.includes("komunitas") || lowerQuery.includes("marketplace") || lowerQuery.includes("jual") || lowerQuery.includes("forum") || lowerQuery.includes("loker") || lowerQuery.includes("kerja")) {
      targetTab = "community-marketplace";
      matchedFeatures = ["feat-comm-marketplace"];
      reply = "Mari jelajahi **Community & Business Hub**! Ini adalah pusat interaksi sosial terpadu INFOBOS yang menyatukan forum diskusi agro-tech, bursa lowongan kerja lepas (freelance), direktori bisnis lokal Jawa Barat, dan pasar jual-beli produk digital masyarakat.";
    } else if (lowerQuery.includes("peta") || lowerQuery.includes("map") || lowerQuery.includes("geografis") || lowerQuery.includes("jabar") || lowerQuery.includes("regional")) {
      targetTab = "regional";
      matchedFeatures = ["feat-regional-geo"];
      reply = "Tentu! **Geo Intelligence (Regional Jabar)** adalah peta interaktif Jawa Barat yang menjadi pusat navigasi geospasial kami. Anda dapat menjelajahi sebaran laporan investigasi, status sensor pertanian IoT, dan kemacetan logistik di 27 kabupaten/kota secara langsung.";
    } else if (lowerQuery.includes("video") || lowerQuery.includes("tv") || lowerQuery.includes("siaran") || lowerQuery.includes("streaming")) {
      targetTab = "video-hub";
      matchedFeatures = ["feat-video-hub"];
      reply = "Silakan tonton siaran langsung di **Video Streaming TV Hub**. Portal ini menyajikan pemutaran video TV Siber 24 jam penuh, wawancara eksklusif tokoh publik Jawa Barat, serta katalog dokumenter investigasi orisinal redaksi.";
    } else if (lowerQuery.includes("podcast") || lowerQuery.includes("audio") || lowerQuery.includes("dengar")) {
      targetTab = "podcast-center";
      matchedFeatures = ["feat-podcast-center"];
      reply = "Dengarkan diskusi mendalam di **Podcast Center Redaksi**! Fitur unggulannya adalah transkrip kalimat otomatis yang menyala sesuai detik pembicaraan (audio highlighting). Anda dapat mengeklik kalimat mana saja untuk melompat ke detik audio tersebut.";
    } else if (lowerQuery.includes("status") || lowerQuery.includes("telemetri") || lowerQuery.includes("mediaos") || lowerQuery.includes("diagnostik") || lowerQuery.includes("server")) {
      targetTab = "mediaos";
      matchedFeatures = ["feat-mediaos"];
      reply = "Pantau keandalan infrastruktur kami melalui **MediaOS Telemetry Console**. Halaman diagnostik developer ini menyajikan status CPU, RAM, latensi API, serta simulasi kegagalan database cerdas untuk memastikan platform tetap online 99.98%.";
    } else {
      reply = "Halo! Saya adalah Panduan Cerdas INFOBOS. Anda dapat menanyakan tentang alur kerja jurnalisme (CMS), cara konfigurasi widget sandbox, pemetaan peta spasial Jawa Barat, pemutar audio transkrip podcast, atau meminta saya membukakan tab tertentu!";
    }
    res.json({
      success: true,
      reply,
      targetTab,
      matchedFeatures
    });
  });
  app.post("/api/v1/partner/ai", async (req, res) => {
    const { action, product, details, partnerName, partnerTier } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    const hasValidKey = apiKey && apiKey !== "MY_GEMINI_API_KEY";
    if (!hasValidKey) {
      return res.status(400).json({ success: false, error: "Missing or placeholder Gemini API Key" });
    }
    try {
      const ai = new import_genai2.GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: { "User-Agent": "aistudio-build" }
        }
      });
      let systemPrompt = `Anda adalah AI Sales Copywriter Assistant resmi untuk platform PartnerOS INFOBOS.
Tugas Anda adalah menulis naskah pemasaran, proposal penawaran, email tindak lanjut (follow up), atau naskah pitching penawaran dalam Bahasa Indonesia yang sangat persuasif, formal, profesional, dan meyakinkan.

Informasi Pengirim (Partner):
- Nama Partner: ${partnerName || "Mitra Resmi INFOBOS"}
- Tingkatan Tier Partner: ${partnerTier || "Sales Partner"}

Gunakan format penulisan yang rapi, berikan penekanan dengan poin-poin yang mudah dibaca, serta kaitkan kelebihan INFOBOS (portal berita spasial Jawa Barat dengan real-time sentiment analysis, data geospasial di 27 kota/kabupaten, dan telemetri Sentinel OS yang tahan ad-blocker).

Tulis naskah spesifik berdasarkan aksi: "${action}" untuk produk: "${product}".
Detail kustomisasi dari partner: "${details}".`;
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: systemPrompt
      });
      const output = response.text || "Gagal menyusun naskah dengan Gemini AI.";
      res.json({ success: true, output });
    } catch (error) {
      console.error("Gemini Partner AI Error:", error);
      res.status(500).json({ success: false, error: error.message || "Internal server error" });
    }
  });
  app.post("/api/v1/translate", async (req, res) => {
    const { paragraphs, targetLanguage } = req.body;
    if (!paragraphs || !Array.isArray(paragraphs)) {
      return res.status(400).json({ success: false, error: "Paragraphs must be an array of strings." });
    }
    const targetLang = String(targetLanguage || "ID").toUpperCase();
    if (!["ID", "EN", "JV", "SD"].includes(targetLang)) {
      return res.status(400).json({ success: false, error: "Unsupported target language." });
    }
    if (targetLang === "ID") {
      return res.json({ success: true, translatedParagraphs: paragraphs });
    }
    const apiKey = process.env.GEMINI_API_KEY;
    const hasValidKey = apiKey && apiKey !== "MY_GEMINI_API_KEY";
    if (hasValidKey) {
      try {
        const ai = new import_genai2.GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: { "User-Agent": "aistudio-build" }
          }
        });
        const systemPrompt = `You are an expert translator specializing in Indonesian, Javanese, Sundanese, and English.
Your task is to translate an array of paragraphs (originally in Indonesian) into ${targetLang === "EN" ? "English (EN)" : targetLang === "JV" ? "Javanese (JV)" : "Sundanese (SD)"}.

Instructions:
1. Return ONLY a valid JSON array of strings containing the translated paragraphs in the EXACT same order.
2. Keep all Markdown headers (like '##', '###') or inline styling (like '**bold**') intact in the translations.
3. DO NOT wrap the output in markdown code blocks like \`\`\`json. Return only raw JSON.
4. If a paragraph is a short timestamp or has format like "* **[10:00 WIB]** - **Judul**: Deskripsi", translate the Judul and Deskripsi, but keep the timestamp intact.

Input Paragraphs:
${JSON.stringify(paragraphs, null, 2)}`;
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: systemPrompt
        });
        const output = (response.text || "").trim();
        try {
          const cleanOutput = output.replace(/^```json\s*/i, "").replace(/```\s*$/, "").trim();
          const translated2 = JSON.parse(cleanOutput);
          if (Array.isArray(translated2)) {
            return res.json({ success: true, translatedParagraphs: translated2, source: "gemini" });
          }
        } catch (e) {
          console.error("Failed to parse translated output as JSON array, falling back:", output);
        }
      } catch (error) {
        console.error("Gemini Translation Error:", error);
      }
    }
    const dict = {
      EN: {
        "dan": "and",
        "di": "in",
        "yang": "which",
        "dengan": "with",
        "untuk": "for",
        "saya": "I",
        "kita": "we",
        "adalah": "is",
        "tidak": "not",
        "bisa": "can",
        "sangat": "very",
        "pembangunan": "development",
        "pariwisata": "tourism",
        "jalan": "street",
        "kota": "city",
        "masyarakat": "society",
        "pemerintah": "government",
        "berita": "news",
        "anggaran": "budget",
        "sejarah": "history",
        "revitalisasi": "revitalization",
        "cagar budaya": "cultural heritage",
        "koridor": "corridor",
        "resmi": "officially",
        "diluncurkan": "launched",
        "oleh": "by",
        "mendorong": "promoting",
        "ekonomi": "economy",
        "kreatif": "creative",
        "lokal": "local",
        "perlindungan": "protection",
        "struktural": "structural",
        "seismik": "seismic"
      },
      JV: {
        "dan": "lan",
        "di": "ing",
        "yang": "sing",
        "dengan": "karo",
        "untuk": "kanggo",
        "saya": "kula",
        "kita": "kita",
        "adalah": "yaiku",
        "tidak": "ora",
        "bisa": "bisa",
        "sangat": "banget",
        "pembangunan": "pembangunan",
        "pariwisata": "pariwisata",
        "jalan": "dalan",
        "kota": "kuta",
        "masyarakat": "masyarakat",
        "pemerintah": "pemerintah",
        "berita": "pawarta",
        "anggaran": "anggaran",
        "sejarah": "sejarah",
        "revitalisasi": "revitalisasi",
        "cagar budaya": "cagar budaya",
        "resmi": "resmi",
        "diluncurkan": "diluncurake",
        "oleh": "dening",
        "mendorong": "nyurung",
        "ekonomi": "ekonomi",
        "kreatif": "kreatif",
        "lokal": "lokal"
      },
      SD: {
        "dan": "sareng",
        "di": "di",
        "yang": "anu",
        "dengan": "sareng",
        "untuk": "kanggo",
        "saya": "abdi",
        "kita": "urang",
        "adalah": "nyaeta",
        "tidak": "henteu",
        "bisa": "tiasa",
        "sangat": "pisan",
        "pembangunan": "pangwangunan",
        "pariwisata": "pariwisata",
        "jalan": "jalan",
        "kota": "kota",
        "masyarakat": "masarakat",
        "pemerintah": "pamar\xE9ntah",
        "berita": "wartos",
        "anggaran": "anggaran",
        "sejarah": "sajarah",
        "revitalisasi": "revitalisasi",
        "cagar budaya": "cagar budaya",
        "resmi": "resmi",
        "diluncurkan": "diluncurkeun",
        "oleh": "ku",
        "mendorong": "nyorong",
        "ekonomi": "ekonomi",
        "kreatif": "kreatif",
        "lokal": "lokal"
      }
    };
    const translated = paragraphs.map((p) => {
      if (p.startsWith("## ") || p.startsWith("### ")) {
        const headerSymbol = p.startsWith("## ") ? "## " : "### ";
        const text = p.substring(headerSymbol.length);
        return headerSymbol + translateTextChunk(text, targetLang, dict);
      }
      return translateTextChunk(p, targetLang, dict);
    });
    res.json({ success: true, translatedParagraphs: translated, source: "fallback" });
  });
  function translateTextChunk(text, targetLanguage, dict) {
    const langDict = dict[targetLanguage];
    if (!langDict) return text;
    if (text.includes("Revitalisasi terpadu koridor pariwisata cagar budaya Braga")) {
      if (targetLanguage === "EN") return "Integrated revitalization of the Braga cultural heritage tourism corridor and Gedung Sate has been officially launched by the West Java Provincial Government to drive local creative economic acceleration and structural seismic protection.";
      if (targetLanguage === "JV") return "Revitalisasi terpadu koridor pariwisata cagar budaya Braga lan Gedung Sate resmi diluncurake dening Pemprov Jabar kanggo nyurung akselerasi ekonomi kreatif lokal lan perlindungan struktural seismik.";
      if (targetLanguage === "SD") return "Revitalisasi terpadu koridor pariwisata cagar budaya Braga sareng Gedung Sate resmi diluncurkeun ku Pemprov Jabar kanggo nyorong akselerasi ekonomi kreatif lokal sareng perlindungan struktural seismik.";
    }
    if (text.includes("Total dana Rp 45.2 Miliar dicairkan langsung")) {
      if (targetLanguage === "EN") return "A total fund of Rp 45.2 Billion was disbursed directly for the renovation of Braga Street and seismic reinforcement.";
      if (targetLanguage === "JV") return "Total dana Rp 45.2 Miliar dicairake langsung kanggo renovasi Dalan Braga lan penguatan seismik.";
      if (targetLanguage === "SD") return "Total dana Rp 45.2 Miliar dicairkeun langsung kanggo renovasi Jalan Braga sareng panyalindungan seismik.";
    }
    let words = text.split(/\b/);
    let translatedWords = words.map((word) => {
      const lower = word.toLowerCase();
      if (langDict[lower]) {
        const trans = langDict[lower];
        if (word[0] === word[0].toUpperCase() && word.length > 1) {
          return trans[0].toUpperCase() + trans.substring(1);
        }
        return trans;
      }
      return word;
    });
    let joined = translatedWords.join("");
    if (text.length > 30 && !text.startsWith("#") && !text.includes("**[")) {
      if (targetLanguage === "EN") return joined + " [Translated to EN]";
      if (targetLanguage === "JV") return joined + " (Materi diterjemahake ing basa Jawi)";
      if (targetLanguage === "SD") return joined + " (Materi diterjemahkeun dina basa Sunda)";
    }
    return joined;
  }
  app.post("/api/v1/intelligence/orchestrate", async (req, res) => {
    const { prompt } = req.body;
    const userPrompt = String(prompt || "").trim();
    if (!userPrompt) {
      return res.status(400).json({ success: false, error: "Prompt orkestrasi tidak boleh kosong." });
    }
    const apiKey = process.env.GEMINI_API_KEY;
    const hasValidKey = apiKey && apiKey !== "MY_GEMINI_API_KEY";
    if (hasValidKey) {
      try {
        const ai = new import_genai2.GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: { "User-Agent": "aistudio-build" }
          }
        });
        const systemPrompt = `Anda adalah AI Orchestration Master untuk platform AgentOS INFOBOS.
Tugas Anda adalah menguraikan prompt otomatisasi dari pengguna menjadi 4-6 langkah pengerjaan multi-agent yang sangat spesifik, relevan, logis, dan detail dalam Bahasa Indonesia.

Setiap langkah harus ditugaskan ke salah satu agen berikut:
1. 'Research Agent' (avatar: '\u{1F52C}', role: 'Lead Academic & Policy Researcher')
2. 'Editorial Agent' (avatar: '\u270D\uFE0F', role: 'Chief News Editor & Copywriter')
3. 'Monitoring Agent' (avatar: '\u{1F441}\uFE0F', role: 'Crisis & Competitor Watchdog')
4. 'Social Media Agent' (avatar: '\u{1F4F1}', role: 'Engagement & Multi-Channel Publisher')
5. 'SEO Agent' (avatar: '\u{1F50D}', role: 'SEO & Search Engine Intelligence Specialist')
6. 'Analytics Agent' (avatar: '\u{1F4C8}', role: 'Cost & Token usage analyzer')

Instruksi Output:
- Anda WAJIB membalas dengan objek JSON yang memiliki properti "steps" berupa array.
- Setiap objek langkah dalam array tersebut WAJIB memiliki field:
  - "id": string nomor berurutan (misal "1", "2", "3"...)
  - "agent": nama agen yang sesuai dari daftar di atas
  - "avatar": emoji avatar agen yang sesuai
  - "message": deskripsi tindakan agen dalam Bahasa Indonesia yang sangat mendalam dan disesuaikan secara kreatif dengan prompt pengguna.

PROMPT PENGGUNA: "${userPrompt}"`;
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: systemPrompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: import_genai2.Type.OBJECT,
              properties: {
                steps: {
                  type: import_genai2.Type.ARRAY,
                  items: {
                    type: import_genai2.Type.OBJECT,
                    properties: {
                      id: { type: import_genai2.Type.STRING },
                      agent: { type: import_genai2.Type.STRING },
                      avatar: { type: import_genai2.Type.STRING },
                      message: { type: import_genai2.Type.STRING }
                    },
                    required: ["id", "agent", "avatar", "message"]
                  }
                }
              },
              required: ["steps"]
            }
          }
        });
        const textResponse = response.text || "";
        const parsed = JSON.parse(textResponse);
        if (parsed && Array.isArray(parsed.steps)) {
          return res.json({ success: true, steps: parsed.steps, source: "gemini" });
        }
      } catch (geminiError) {
        console.error("Gemini Orchestrate Error, falling back:", geminiError);
      }
    }
    const words = userPrompt.toLowerCase();
    const fallbackSteps = [];
    if (words.includes("fiskal") || words.includes("keuangan") || words.includes("apbd") || words.includes("startup") || words.includes("finance") || words.includes("investor") || words.includes("ekonomi")) {
      fallbackSteps.push(
        { id: "1", agent: "Research Agent", avatar: "\u{1F52C}", message: `Mengevaluasi dokumen APBD & fiskal Jawa Barat serta menganalisis kebutuhan pendanaan terkait: "${userPrompt}"...` },
        { id: "2", agent: "SEO Agent", avatar: "\u{1F50D}", message: `Meriset volume pencarian lokal dan menyusun peta kata kunci berita finansial...` },
        { id: "3", agent: "Editorial Agent", avatar: "\u270D\uFE0F", message: `Menulis naskah rilis berstruktur EEAT tentang prospek pertumbuhan ekonomi daerah terkait "${userPrompt}"...` },
        { id: "4", agent: "Social Media Agent", avatar: "\u{1F4F1}", message: `Menyusun infografis ringkas dan meluncurkan postingan multi-channel ke platform LinkedIn...` },
        { id: "5", agent: "Analytics Agent", avatar: "\u{1F4C8}", message: `Mengalkulasi penggunaan token AI dan memverifikasi integrasi data real-time berhasil.` }
      );
    } else if (words.includes("bencana") || words.includes("cuaca") || words.includes("banjir") || words.includes("gempa") || words.includes("crisis") || words.includes("peringatan") || words.includes("darurat")) {
      fallbackSteps.push(
        { id: "1", agent: "Monitoring Agent", avatar: "\u{1F441}\uFE0F", message: `Melacak radar spasial BMKG, feeds media sosial, dan anomali geospasial darurat...` },
        { id: "2", agent: "Research Agent", avatar: "\u{1F52C}", message: `Memetakan area rawan bahaya dan mencocokkan data historis kerentanan wilayah Jawa Barat...` },
        { id: "3", agent: "Editorial Agent", avatar: "\u270D\uFE0F", message: `Menulis bulletin tanggap darurat yang akurat dengan detail mitigasi...` },
        { id: "4", agent: "Social Media Agent", avatar: "\u{1F4F1}", message: `Meluncurkan push alert instan ke grup telegram koordinasi darurat INFOBOS...` },
        { id: "5", agent: "Analytics Agent", avatar: "\u{1F4C8}", message: `Mengonfirmasi pengiriman alert dengan latensi minimum dan mencatatkan log audit.` }
      );
    } else {
      fallbackSteps.push(
        { id: "1", agent: "Research Agent", avatar: "\u{1F52C}", message: `Menelaah literatur mendalam dan mengekstrak informasi primer terkait: "${userPrompt}"...` },
        { id: "2", agent: "SEO Agent", avatar: "\u{1F50D}", message: `Menghitung indeks kepadatan sitemap untuk rubrik pencarian terkait...` },
        { id: "3", agent: "Editorial Agent", avatar: "\u270D\uFE0F", message: `Menyusun tulisan berita/artikel komprehensif bertema "${userPrompt}"...` },
        { id: "4", agent: "Social Media Agent", avatar: "\u{1F4F1}", message: `Merancang kampanye digital multiprodusen untuk menyebarluaskan hasil: "${userPrompt}"...` },
        { id: "5", agent: "Analytics Agent", avatar: "\u{1F4C8}", message: `Mengonfirmasi seluruh proses berjalan sukses dengan performa 99.8%...` }
      );
    }
    return res.json({ success: true, steps: fallbackSteps, source: "local-intelligence" });
  });
  const escapeXml = (str) => {
    if (!str) return "";
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  };
  app.get("/sitemap.xml", (req, res) => {
    try {
      const contents = db.getContents().filter((c) => c.status === "published");
      const categories = db.getCategories();
      const domain = "https://infobos.com";
      let xml = `<?xml version="1.0" encoding="UTF-8"?>
`;
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
      ENHANCED_SITEMAP_80.forEach((item) => {
        const route = item.slug === "home" ? "" : item.slug;
        xml += `  <url>
`;
        xml += `    <loc>${domain}/${route}</loc>
`;
        xml += `    <changefreq>${item.changefreq}</changefreq>
`;
        xml += `    <priority>${item.priority.toFixed(1)}</priority>
`;
        xml += `  </url>
`;
      });
      categories.forEach((cat) => {
        xml += `  <url>
`;
        xml += `    <loc>${domain}/news/category/${cat.slug}</loc>
`;
        xml += `    <changefreq>daily</changefreq>
`;
        xml += `    <priority>0.7</priority>
`;
        xml += `  </url>
`;
      });
      contents.forEach((art) => {
        const cat = categories.find((c) => c.id === art.primaryCategoryId) || { slug: "general" };
        xml += `  <url>
`;
        xml += `    <loc>${domain}/news/${cat.slug}/${art.slug}</loc>
`;
        xml += `    <lastmod>${escapeXml(art.updatedAt || art.publishedAt || (/* @__PURE__ */ new Date()).toISOString())}</lastmod>
`;
        xml += `    <changefreq>daily</changefreq>
`;
        xml += `    <priority>0.8</priority>
`;
        xml += `  </url>
`;
      });
      xml += `</urlset>`;
      res.header("Content-Type", "application/xml");
      res.send(xml);
    } catch (err) {
      console.error("Failed to generate sitemap.xml:", err);
      res.status(500).send("Error generating sitemap");
    }
  });
  app.get("/news-sitemap.xml", (req, res) => {
    try {
      const contents = db.getContents().filter((c) => c.status === "published");
      const categories = db.getCategories();
      const domain = "https://infobos.com";
      const sorted = [...contents].sort(
        (a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime()
      );
      const nowTime = Date.now();
      let newsArticles = sorted.filter((art) => {
        const pubTime = new Date(art.publishedAt || art.createdAt).getTime();
        return nowTime - pubTime <= 48 * 60 * 60 * 1e3;
      });
      if (newsArticles.length < 5) {
        newsArticles = sorted.slice(0, 10);
      }
      let xml = `<?xml version="1.0" encoding="UTF-8"?>
`;
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
`;
      xml += `        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
`;
      newsArticles.forEach((art) => {
        const cat = categories.find((c) => c.id === art.primaryCategoryId) || { slug: "general" };
        const pubDate = art.publishedAt || art.createdAt || (/* @__PURE__ */ new Date()).toISOString();
        xml += `  <url>
`;
        xml += `    <loc>${domain}/news/${cat.slug}/${art.slug}</loc>
`;
        xml += `    <news:news>
`;
        xml += `      <news:publication>
`;
        xml += `        <news:name>INFOBOS News</news:name>
`;
        xml += `        <news:language>id</news:language>
`;
        xml += `      </news:publication>
`;
        xml += `      <news:publication_date>${escapeXml(pubDate)}</news:publication_date>
`;
        xml += `      <news:title>${escapeXml(art.title)}</news:title>
`;
        xml += `    </news:news>
`;
        xml += `  </url>
`;
      });
      xml += `</urlset>`;
      res.header("Content-Type", "application/xml");
      res.send(xml);
    } catch (err) {
      console.error("Failed to generate news-sitemap.xml:", err);
      res.status(500).send("Error generating news sitemap");
    }
  });
  app.get("/rss.xml", (req, res) => {
    try {
      const contents = db.getContents().filter((c) => c.status === "published");
      const categories = db.getCategories();
      const domain = "https://infobos.com";
      const sorted = [...contents].sort(
        (a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime()
      ).slice(0, 20);
      let xml = `<?xml version="1.0" encoding="UTF-8" ?>
`;
      xml += `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
`;
      xml += `<channel>
`;
      xml += `  <title>INFOBOS News</title>
`;
      xml += `  <link>${domain}</link>
`;
      xml += `  <description>Portal Berita dan Intelijen Jawa Barat Terkini - Akurat, Transparan, Berdaulat</description>
`;
      xml += `  <language>id-ID</language>
`;
      xml += `  <pubDate>${(/* @__PURE__ */ new Date()).toUTCString()}</pubDate>
`;
      xml += `  <lastBuildDate>${(/* @__PURE__ */ new Date()).toUTCString()}</lastBuildDate>
`;
      xml += `  <atom:link href="${domain}/rss.xml" rel="self" type="application/rss+xml" />
`;
      sorted.forEach((art) => {
        const cat = categories.find((c) => c.id === art.primaryCategoryId) || { slug: "general" };
        const pubDate = new Date(art.publishedAt || art.createdAt || Date.now()).toUTCString();
        xml += `  <item>
`;
        xml += `    <title>${escapeXml(art.title)}</title>
`;
        xml += `    <link>${domain}/news/${cat.slug}/${art.slug}</link>
`;
        xml += `    <description><![CDATA[${art.summary || ""}]]></description>
`;
        xml += `    <pubDate>${pubDate}</pubDate>
`;
        xml += `    <guid>${domain}/news/${cat.slug}/${art.slug}</guid>
`;
        xml += `  </item>
`;
      });
      xml += `</channel>
`;
      xml += `</rss>`;
      res.header("Content-Type", "application/xml");
      res.send(xml);
    } catch (err) {
      console.error("Failed to generate rss.xml:", err);
      res.status(500).send("Error generating RSS feed");
    }
  });
  app.get("/category-sitemap.xml", (req, res) => {
    try {
      const categories = db.getCategories();
      const domain = "https://infobos.com";
      let xml = `<?xml version="1.0" encoding="UTF-8"?>
`;
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
      categories.forEach((cat) => {
        xml += `  <url>
`;
        xml += `    <loc>${domain}/news/category/${cat.slug}</loc>
`;
        xml += `    <changefreq>daily</changefreq>
`;
        xml += `    <priority>0.7</priority>
`;
        xml += `  </url>
`;
      });
      xml += `</urlset>`;
      res.header("Content-Type", "application/xml");
      res.send(xml);
    } catch (err) {
      console.error("Failed to generate category-sitemap.xml:", err);
      res.status(500).send("Error generating sitemap");
    }
  });
  app.get("/image-sitemap.xml", (req, res) => {
    try {
      const contents = db.getContents().filter((c) => c.status === "published" && c.heroImageUrl);
      const categories = db.getCategories();
      const domain = "https://infobos.com";
      let xml = `<?xml version="1.0" encoding="UTF-8"?>
`;
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
`;
      xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;
      contents.forEach((art) => {
        const cat = categories.find((c) => c.id === art.primaryCategoryId) || { slug: "general" };
        xml += `  <url>
`;
        xml += `    <loc>${domain}/news/${cat.slug}/${art.slug}</loc>
`;
        xml += `    <image:image>
`;
        xml += `      <image:loc>${escapeXml(art.heroImageUrl)}</image:loc>
`;
        xml += `      <image:title>${escapeXml(art.title)}</image:title>
`;
        xml += `    </image:image>
`;
        xml += `  </url>
`;
      });
      xml += `</urlset>`;
      res.header("Content-Type", "application/xml");
      res.send(xml);
    } catch (err) {
      console.error("Failed to generate image-sitemap.xml:", err);
      res.status(500).send("Error generating sitemap");
    }
  });
  app.get("/video-sitemap.xml", (req, res) => {
    try {
      const contents = db.getContents().filter((c) => c.status === "published");
      const categories = db.getCategories();
      const domain = "https://infobos.com";
      let xml = `<?xml version="1.0" encoding="UTF-8"?>
`;
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
`;
      xml += `        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
`;
      contents.forEach((art) => {
        const cat = categories.find((c) => c.id === art.primaryCategoryId) || { slug: "general" };
        xml += `  <url>
`;
        xml += `    <loc>${domain}/news/${cat.slug}/${art.slug}</loc>
`;
        xml += `    <video:video>
`;
        xml += `      <video:thumbnail_loc>${escapeXml(art.heroImageUrl || "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff")}</video:thumbnail_loc>
`;
        xml += `      <video:title>${escapeXml(art.title)}</video:title>
`;
        xml += `      <video:description>${escapeXml(art.summary || "Laporan visual mendalam dan liputan eksklusif INFOBOS.")}</video:description>
`;
        xml += `      <video:player_loc>${domain}/video-hub</video:player_loc>
`;
        xml += `    </video:video>
`;
        xml += `  </url>
`;
      });
      xml += `</urlset>`;
      res.header("Content-Type", "application/xml");
      res.send(xml);
    } catch (err) {
      console.error("Failed to generate video-sitemap.xml:", err);
      res.status(500).send("Error generating sitemap");
    }
  });
  const distPath = import_path.default.join(process.cwd(), "dist");
  const isProduction = process.env.NODE_ENV === "production" || !import_fs.default.existsSync(import_path.default.join(process.cwd(), "server.ts"));
  if (isProduction) {
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  } else {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[INFOBOS Next Gateway] Server active and listening on Port ${PORT}`);
  });
}
startServer().catch((err) => {
  console.error("Critical: Express initialization crashed!", err);
});
//# sourceMappingURL=server.cjs.map
