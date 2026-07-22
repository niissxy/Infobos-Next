import * as fs from 'fs';
import * as path from 'path';
import { 
  User, Category, Topic, Tag, Location, Entity, Content, ContentVersion,
  ContentLocation, ContentEntity, ContentTopic, ContentTag, IngestionSource,
  IngestionItem, Advertiser, Campaign, Creative, Bookmark, Follow, AuditLog,
  Correction
} from './schema';

const STORE_PATH = path.join(process.cwd(), 'src', 'db', 'db_store.json');

interface DatabaseStore {
  users: User[];
  categories: Category[];
  topics: Topic[];
  tags: Tag[];
  locations: Location[];
  entities: Entity[];
  contents: Content[];
  contentVersions: ContentVersion[];
  contentLocations: ContentLocation[];
  contentEntities: ContentEntity[];
  contentTopics: ContentTopic[];
  contentTags: ContentTag[];
  ingestionSources: IngestionSource[];
  ingestionItems: IngestionItem[];
  advertisers: Advertiser[];
  campaigns: Campaign[];
  creatives: Creative[];
  bookmarks: Bookmark[];
  follows: Follow[];
  auditLogs: AuditLog[];
  corrections: Correction[];
}

export class RelationalDB {
  private static instance: RelationalDB;
  private data!: DatabaseStore;

  private constructor() {
    this.load();
  }

  public static getInstance(): RelationalDB {
    if (!RelationalDB.instance) {
      RelationalDB.instance = new RelationalDB();
    }
    return RelationalDB.instance;
  }

  private load(): void {
    const parentDir = path.dirname(STORE_PATH);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }

    if (fs.existsSync(STORE_PATH)) {
      try {
        const raw = fs.readFileSync(STORE_PATH, 'utf8');
        this.data = JSON.parse(raw);
        // Ensure all collections exist
        this.ensureCollections();
        this.enrichCategories();
        return;
      } catch (err) {
        console.error('Error loading DB store, re-initializing...', err);
      }
    }

    // Initialize with seeded data
    this.initializeSeededData();
    this.enrichCategories();
  }

  private ensureCollections(): void {
    const keys: (keyof DatabaseStore)[] = [
      'users', 'categories', 'topics', 'tags', 'locations', 'entities', 'contents',
      'contentVersions', 'contentLocations', 'contentEntities', 'contentTopics', 'contentTags',
      'ingestionSources', 'ingestionItems', 'advertisers', 'campaigns', 'creatives',
      'bookmarks', 'follows', 'auditLogs', 'corrections'
    ];
    for (const key of keys) {
      if (!this.data[key]) {
        (this.data as any)[key] = [];
      }
    }
  }

  public save(): void {
    try {
      fs.writeFileSync(STORE_PATH, JSON.stringify(this.data, null, 2), 'utf8');
    } catch (err) {
      console.error('Failed to save DB store:', err);
    }
  }

  private initializeSeededData(): void {
    const now = new Date().toISOString();
    
    // 1. Seed Users (with straightforward plain hashes)
    const users: User[] = [
      {
        id: "usr-admin",
        email: "admin@infobos.com",
        passwordHash: "admin123", // Simplified secure plain hash
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

    // 2. Seed Categories
    const categories: Category[] = [
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

    // 3. Seed Topics
    const topics: Topic[] = [
      { id: "top-inflasi", name: "Ekonomi Makro & Inflasi", slug: "ekonomi-makro-inflasi", description: "Isu kenaikan harga pangan dan kebijakan moneter", createdAt: now },
      { id: "top-ai", name: "Kecerdasan Buatan (AI)", slug: "kecerdasan-buatan-ai", description: "Perkembangan teknologi AI, regulasi, dan implementasi", createdAt: now },
      { id: "top-wisata", name: "Revitalisasi Wisata", slug: "revitalisasi-wisata", description: "Pemugaran objek bersejarah dan promosi pariwisata daerah", createdAt: now }
    ];

    // 4. Seed Tags
    const tags: Tag[] = [
      { id: "tag-rupiah", name: "Rupiah", slug: "rupiah", createdAt: now },
      { id: "tag-bandung", name: "Bandung Juara", slug: "bandung-juara", createdAt: now },
      { id: "tag-pajak", name: "Kebijakan Pajak", slug: "kebijakan-pajak", createdAt: now }
    ];

    // 5. Seed Geography Locations
    const locations: Location[] = [
      { id: "loc-idn", name: "Indonesia", slug: "indonesia", type: "country", parentId: null, latitude: -0.7893, longitude: 113.9213, createdAt: now },
      
      { id: "loc-jabar", name: "Jawa Barat", slug: "jawa-barat", type: "province", parentId: "loc-idn", latitude: -6.9175, longitude: 107.6191, createdAt: now },
      { id: "loc-dki", name: "DKI Jakarta", slug: "dki-jakarta", type: "province", parentId: "loc-idn", latitude: -6.2088, longitude: 106.8456, createdAt: now },
      
      { id: "loc-bdg", name: "Bandung", slug: "bandung", type: "city", parentId: "loc-jabar", latitude: -6.9175, longitude: 107.6191, weatherTemp: 26, weatherCondition: "Hujan Ringan", aqi: 45, alertTitle: "Waspada Hujan Petir Sore Hari", alertLevel: "info", createdAt: now },
      { id: "loc-jkt", name: "Jakarta Pusat", slug: "jakarta-pusat", type: "city", parentId: "loc-dki", latitude: -6.1751, longitude: 106.8272, weatherTemp: 31, weatherCondition: "Cerah Berawan", aqi: 112, alertTitle: "Kualitas Udara Tidak Sehat", alertLevel: "warning", createdAt: now }
    ];

    // 6. Seed Entities
    const entities: Entity[] = [
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

    // 7. Seed Initial Published Articles
    const contents: Content[] = [
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
        primaryCategoryId: "cat-editor", // Pilihan Editor
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
        primaryCategoryId: "cat-analisis", // Analisis
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
        primaryCategoryId: "cat-explainer", // Explainer
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
        primaryCategoryId: "cat-breaking", // Breaking News
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
Meskipun pelaku industri mengharapkan adanya pelonggaran moneter untuk merangsang kredit usaha, BI menegaskan fokus jangka pendek adalah menstabilkan arus modal keluar dan menjaga tingkat inflasi domestik dalam rentang sasaran 2.5±1%.`,
        contentType: "standard",
        status: "published",
        primaryCategoryId: "cat-terbaru", // Terbaru
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
        primaryCategoryId: "cat-trending", // Trending
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
        primaryCategoryId: "cat-investigasi", // Investigasi
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
        primaryCategoryId: "cat-opini", // Opini
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
        primaryCategoryId: "cat-factcheck", // Fact Check
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
        primaryCategoryId: "cat-riset", // Riset & Insight
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

    // 8. Seed Relations (Content Pivots)
    // Article 1 (Gedung Sate pariwisata) -> Location: Bandung (loc-bdg), Jawa Barat (loc-jabar)
    const contentLocations: ContentLocation[] = [
      { contentId: "art-1", locationId: "loc-bdg", relevanceScore: 95, isPrimary: true },
      { contentId: "art-1", locationId: "loc-jabar", relevanceScore: 80, isPrimary: false },
      { contentId: "art-2", locationId: "loc-jkt", relevanceScore: 90, isPrimary: true }
    ];

    // Article 1 -> Entities: Ridwan Kamil (ent-rk), Gedung Sate (ent-gdsate)
    // Article 2 -> Entities: Sri Mulyani (ent-sri)
    const contentEntities: ContentEntity[] = [
      { contentId: "art-1", entityId: "ent-rk", relevanceScore: 95, relationType: "advisor" },
      { contentId: "art-1", entityId: "ent-gdsate", relevanceScore: 100, relationType: "subject" },
      { contentId: "art-2", entityId: "ent-sri", relevanceScore: 95, relationType: "subject" }
    ];

    const contentTopics: ContentTopic[] = [
      { contentId: "art-1", topicId: "top-wisata" },
      { contentId: "art-2", topicId: "top-inflasi" }
    ];

    const contentTags: ContentTag[] = [
      { contentId: "art-1", tagId: "tag-bandung" },
      { contentId: "art-2", tagId: "tag-pajak" },
      { contentId: "art-3", tagId: "tag-rupiah" }
    ];

    // 9. Seed RSS Ingestion Sources
    const ingestionSources: IngestionSource[] = [
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

    // 10. Seed Advertisers & Campaigns
    const advertisers: Advertiser[] = [
      { id: "adv-bank", companyName: "Bank Mandiri Utama Tbk", contactEmail: "marketing@mandiriutama.co.id", budgetTotal: 150000000, budgetSpent: 120000, createdAt: now }
    ];

    const campaigns: Campaign[] = [
      { id: "cam-fintech", advertiserId: "adv-bank", name: "Promosi Tabungan Digital Prioritas", status: "active", startAt: "2026-06-01T00:00:00Z", endAt: "2026-12-31T23:59:59Z", budget: 50000000, targetLocations: ["loc-bdg", "loc-jkt"], createdAt: now }
    ];

    const creatives: Creative[] = [
      {
        id: "cre-banner1",
        campaignId: "cam-fintech",
        placement: "sidebar",
        imageUrl: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=350",
        destinationUrl: "https://mandiriutama.co.id/tabungan-prioritas",
        altText: "Tumbuh Kuat Bersama Tabungan Digital Prioritas",
        impressionLimit: 500000,
        clickLimit: 25000,
        impressionsCount: 2450,
        clicksCount: 142,
        status: "active",
        createdAt: now
      }
    ];

    // 11. Initial empty or structured list for audits and versions
    const contentVersions: ContentVersion[] = [
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

    const auditLogs: AuditLog[] = [
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

  public getUsers(): User[] { return this.data.users; }
  public getCategories(): Category[] { return this.data.categories; }
  public getTopics(): Topic[] { return this.data.topics; }
  public getTags(): Tag[] { return this.data.tags; }
  public getLocations(): Location[] { return this.data.locations; }
  public getEntities(): Entity[] { return this.data.entities; }
  public getContents(): Content[] { return this.data.contents; }
  public getContentVersions(): ContentVersion[] { return this.data.contentVersions; }
  public getIngestionSources(): IngestionSource[] { return this.data.ingestionSources; }
  public getIngestionItems(): IngestionItem[] { return this.data.ingestionItems; }
  public getAdvertisers(): Advertiser[] { return this.data.advertisers; }
  public getCreatives(): Creative[] { return this.data.creatives; }
  public getCampaigns(): Campaign[] { return this.data.campaigns; }
  public getBookmarks(): Bookmark[] { return this.data.bookmarks; }
  public getFollows(): Follow[] { return this.data.follows; }
  public getAuditLogs(): AuditLog[] { return this.data.auditLogs; }
  public getCorrections(): Correction[] { return this.data.corrections; }

  // Relation getters
  public getContentLocations(contentId: string): ContentLocation[] {
    return this.data.contentLocations.filter(cl => cl.contentId === contentId);
  }

  public getContentEntities(contentId: string): ContentEntity[] {
    return this.data.contentEntities.filter(ce => ce.contentId === contentId);
  }

  public getContentTopics(contentId: string): ContentTopic[] {
    return this.data.contentTopics.filter(ct => ct.contentId === contentId);
  }

  public getContentTags(contentId: string): ContentTag[] {
    return this.data.contentTags.filter(ct => ct.contentId === contentId);
  }

  // Mutation helper wrappers
  public addContent(content: Content): void {
    this.data.contents.unshift(content);
    this.save();
  }

  public updateContent(content: Content): void {
    const idx = this.data.contents.findIndex(c => c.id === content.id);
    if (idx !== -1) {
      this.data.contents[idx] = content;
      this.save();
    }
  }

  public addContentVersion(version: ContentVersion): void {
    this.data.contentVersions.unshift(version);
    this.save();
  }

  public addAuditLog(log: AuditLog): void {
    this.data.auditLogs.unshift(log);
    this.save();
  }

  public addCorrection(correction: Correction): void {
    this.data.corrections.unshift(correction);
    this.save();
  }

  public setContentLocations(contentId: string, locs: ContentLocation[]): void {
    this.data.contentLocations = this.data.contentLocations.filter(cl => cl.contentId !== contentId);
    this.data.contentLocations.push(...locs);
    this.save();
  }

  public setContentEntities(contentId: string, ents: ContentEntity[]): void {
    this.data.contentEntities = this.data.contentEntities.filter(ce => ce.contentId !== contentId);
    this.data.contentEntities.push(...ents);
    this.save();
  }

  public setContentTopics(contentId: string, topics: ContentTopic[]): void {
    this.data.contentTopics = this.data.contentTopics.filter(ct => ct.contentId !== contentId);
    this.data.contentTopics.push(...topics);
    this.save();
  }

  public setContentTags(contentId: string, tags: ContentTag[]): void {
    this.data.contentTags = this.data.contentTags.filter(ct => ct.contentId !== contentId);
    this.data.contentTags.push(...tags);
    this.save();
  }

  public addIngestionItem(item: IngestionItem): void {
    this.data.ingestionItems.unshift(item);
    this.save();
  }

  public updateIngestionItem(item: IngestionItem): void {
    const idx = this.data.ingestionItems.findIndex(i => i.id === item.id);
    if (idx !== -1) {
      this.data.ingestionItems[idx] = item;
      this.save();
    }
  }

  public updateIngestionSource(source: IngestionSource): void {
    const idx = this.data.ingestionSources.findIndex(s => s.id === source.id);
    if (idx !== -1) {
      this.data.ingestionSources[idx] = source;
      this.save();
    }
  }

  public addBookmark(bookmark: Bookmark): void {
    const exists = this.data.bookmarks.some(b => b.userId === bookmark.userId && b.contentId === bookmark.contentId);
    if (!exists) {
      this.data.bookmarks.push(bookmark);
      this.save();
    }
  }

  public removeBookmark(userId: string, contentId: string): void {
    this.data.bookmarks = this.data.bookmarks.filter(b => !(b.userId === userId && b.contentId === contentId));
    this.save();
  }

  public addFollow(follow: Follow): void {
    const exists = this.data.follows.some(f => f.userId === follow.userId && f.targetType === follow.targetType && f.targetId === follow.targetId);
    if (!exists) {
      this.data.follows.push(follow);
      this.save();
    }
  }

  public removeFollow(userId: string, targetType: 'topic' | 'entity' | 'location', targetId: string): void {
    this.data.follows = this.data.follows.filter(f => !(f.userId === userId && f.targetType === targetType && f.targetId === targetId));
    this.save();
  }

  public trackAdImpression(creativeId: string): void {
    const creative = this.data.creatives.find(c => c.id === creativeId);
    if (creative) {
      creative.impressionsCount++;
      const campaign = this.data.campaigns.find(c => c.id === creative.campaignId);
      if (campaign) {
        const adv = this.data.advertisers.find(a => a.id === campaign.advertiserId);
        if (adv) {
          adv.budgetSpent += 50; // Simulate Rp 50 per CPM/impression cost
        }
      }
      this.save();
    }
  }

  public trackAdClick(creativeId: string): void {
    const creative = this.data.creatives.find(c => c.id === creativeId);
    if (creative) {
      creative.clicksCount++;
      const campaign = this.data.campaigns.find(c => c.id === creative.campaignId);
      if (campaign) {
        const adv = this.data.advertisers.find(a => a.id === campaign.advertiserId);
        if (adv) {
          adv.budgetSpent += 500; // Simulate Rp 500 per click cost
        }
      }
      this.save();
    }
  }

  public enrichCategories(): void {
    const now = new Date().toISOString();
    let changed = false;

    // Define 5 distinct high-quality stories for EACH of the 18 categories!
    const categoryStories: Record<string, Array<{
      title: string;
      subtitle: string;
      summary: string;
      body: string;
      contentType: Content['contentType'];
      sentiment: Content['sentiment'];
      riskLevel: Content['riskLevel'];
      heroImageUrl: string;
    }>> = {
      'cat-breaking': [
        {
          title: "Gempa Magnitudo 5.2 Guncang Bandung Selatan, Warga Mengungsi Sementara",
          subtitle: "BMKG Nyatakan Tidak Berpotensi Tsunami, Waspada Gempa Susulan",
          summary: "Kabupaten Bandung diguncang gempa berkekuatan M 5.2 pada kedalaman 10 km, memicu kepanikan warga di Pangalengan dan Ciwidey.",
          body: "## Gempa M 5.2 di Bandung Selatan\n\nGempa tektonik berkekuatan magnitudo 5.2 mengguncang wilayah selatan Kabupaten Bandung pada sore hari ini. Titik episentrum berada di darat, sekitar 15 kilometer tenggara Ciwidey.\n\n### Tindakan Mitigasi BPBD\n\nBPBD Jawa Barat segera menerjunkan tim penyelamat untuk memeriksa potensi kerusakan infrastruktur dan mendirikan posko pengungsian sementara di area terbuka hijau.\n\n> \"Masyarakat diimbau tetap tenang dan tidak terpengaruh oleh isu-isu hoaks yang tidak dapat dipertanggungjawabkan,\" imbau Kepala BPBD Jabar.",
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
      'cat-terbaru': [
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
      'cat-trending': [
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
      'cat-editor': [
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
          body: "## Cahaya Digital dari Pesisir Cirebon\n\nDi tengah keterbatasan sarana internet, seorang pemuda di Cirebon berhasil menggerakkan minat belajar anak-anak nelayan untuk mengenal dunia logika coding komputer.\n\n### Saung Belajar Mandiri\n\n\"Kami percaya bahwa literasi digital adalah kunci utama memutus rantai kemiskinan struktural di wilayah pesisir,\" kata sang relawan penuh haru.",
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
      'cat-investigasi': [
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
      'cat-analisis': [
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
      'cat-opini': [
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
      'cat-factcheck': [
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
      'cat-explainer': [
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
      'cat-riset': [
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
      'cat-regional': [
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
      'cat-nasional': [
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
      'cat-internasional': [
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
      'cat-business': [
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
      'cat-technology': [
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
      'cat-ai-data': [
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
      'cat-sports': [
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
      'cat-lifestyle': [
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
      'cat-live-feed': [
        {
          title: "🔴 LIVE REPORT: Peresmian Koridor Heritage Jalan Asia Afrika Bandung & Festival Seni Rakyat",
          subtitle: "Laporan Teks Langsung Situasi Terkini dari Depan Gedung Merdeka",
          summary: "Ikuti pembaruan menit-demi-menit dari pembukaan festival seni kebudayaan terbesar di Bandung yang dihadiri puluhan ribu pengunjung.",
          body: "## Liputan Teks Langsung: Festival Asia Afrika\n\nSelamat sore pembaca INFOBOS. Kami melaporkan langsung dari Jalan Asia Afrika Bandung, tempat diselenggarakannya Festival Seni Rakyat & Peresmian Koridor Heritage Baru Kota Bandung.\n\n### TIMELINE LIPUTAN LANGSUNG\n\n* **[16:45 WIB]** - **Pawai Budaya Dimulai**: Rombongan pertama pawai budaya yang mengenakan kostum tradisional Sunda, lengkap dengan musik sisingaan dan angklung, mulai bergerak dari depan Hotel Preanger menuju Gedung Merdeka.\n* **[17:00 WIB]** - **Kehadiran Pejabat**: Gubernur Jawa Barat bersama Walikota Bandung tiba di lokasi disambut meriah oleh ribuan warga yang memadati trotoar.\n* **[17:15 WIB]** - **Sambutan Pembuka**: Gubernur menyampaikan apresiasi atas revitalisasi trotoar heritage Jalan Asia Afrika: *\"Ini bukan sekadar trotoar, melainkan panggung budaya hidup masyarakat Jabar.\"*\n* **[17:30 WIB]** - **Gunting Pita Simbolis**: Prosesi pemotongan pita secara simbolis menandai resminya koridor pedestrian baru dengan ornamen lampu klasik bernuansa kolonial.\n* **[17:45 WIB]** - **Kondisi Lalu Lintas**: Kepolisian mengalihkan arus lalu lintas dari simpang lima ke Jalan Lengkong Besar. Warga disarankan menghindari area Asia Afrika hingga pukul 22:00 WIB.",
          contentType: "live-feed",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "🔴 LIVE REPORT: Konferensi Pers Penanganan Inflasi & Ketahanan Pangan Pemprov Jabar",
          subtitle: "Laporan Langsung dari Aula Gedung Sate Terkait Operasi Pasar Murah",
          summary: "Pemprov Jabar mengumumkan langkah konkret pengendalian harga beras dan minyak goreng lokal hari ini.",
          body: "## Laporan Langsung Konferensi Pers Gedung Sate\n\nTim redaksi INFOBOS memantau langsung jalannya konferensi pers darurat ketahanan pangan daerah di Aula Barat Gedung Sate, Bandung.\n\n### TIMELINE RELEASES\n\n* **[10:00 WIB]** - **Pembukaan Sesi**: Kepala Dinas Perindustrian dan Perdagangan membuka sesi dengan memaparkan data fluktuasi harga kebutuhan pokok seminggu terakhir.\n* **[10:15 WIB]** - **Pernyataan Gubernur**: Pemprov menyiapkan dana tak terduga sebesar Rp 45 Miliar untuk subsidi distribusi pangan lokal.\n* **[10:30 WIB]** - **Operasi Pasar Murah**: Mulai besok pagi, operasi pasar murah serentak akan digelar di 27 kabupaten/kota se-Jawa Barat.\n* **[10:45 WIB]** - **Sesi Tanya Jawab**: Menanggapi pertanyaan wartawan mengenai penimbunan beras, aparat menegaskan satgas pangan kepolisian akan menindak tegas gudang nakal.",
          contentType: "live-feed",
          sentiment: "neutral",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "🔴 LIVE REPORT: Pertandingan Klasik Jabar Derby: Bandung United vs Persib Junior",
          subtitle: "Siaran Teks Langsung Menit-demi-Menit dari Stadion GBLA Bandung",
          summary: "Deru dan ketegangan perebutan piala regional Jawa Barat disiarkan langsung melalui laporan kontributor olahraga di lapangan.",
          body: "## Pertandingan Klasik Derby Bandung Raya\n\nIkuti siaran teks jalannya pertandingan sengit perebutan Piala Gubernur Jawa Barat di Stadion Gelora Bandung Lautan Api.\n\n### UPDATE PERTANDINGAN\n\n* **[Kick-Off]** - Wasit meniup peluit tanda mulainya babak pertama. Bandung United mengenakan jersey putih, Persib Junior dengan jersey kebesaran biru.\n* **[Menit ke-15]** - **Peluang Emas**: Striker Persib Junior melepaskan tembakan melengkung dari luar kotak penalti, namun masih membentur mistar gawang.\n* **[Menit ke-32]** - **KARTU KUNING**: Gelandang bertahan Bandung United diganjar kartu kuning setelah melakukan tekel keras di lini tengah.\n* **[Menit ke-45]** - **GOL!!!**: Bandung United memecah kebuntuan lewat sundulan kepala memanfaatkan sepak pojok. Skor sementara 1-0 hingga turun minum.",
          contentType: "live-feed",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "🔴 LIVE REPORT: Peluncuran Sentra Layanan Digital 24 Jam Bandung Smart City",
          subtitle: "Laporan Langsung dari Bandung Command Center",
          summary: "Walikota Bandung meluncurkan sistem respon krisis dan tanggap darurat warga berbasis AI dan siber terintegrasi.",
          body: "## Peluncuran Integrasi Command Center\n\nLaporan langsung dari Bandung Command Center dalam rangka peluncuran super-app pelayanan publik terintegrasi.\n\n### TIMELINE KEGIATAN\n\n* **[14:00 WIB]** - Walikota tiba didampingi oleh Kepala Dinas Komunikasi dan Informatika Kota Bandung.\n* **[14:15 WIB]** - **Demonstrasi Live**: Menunjukkan fitur respon darurat ambulans dan damkar yang kini terkoneksi secara langsung ke peta GPS petugas terdekat.\n* **[14:30 WIB]** - Sistem pengaduan warga kini diintegrasikan dengan pemantauan kamera lalu lintas (CCTV) berbasis pengenalan objek AI untuk deteksi kemacetan.",
          contentType: "live-feed",
          sentiment: "positive",
          riskLevel: "low",
          heroImageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "🔴 LIVE REPORT: Pantauan Arus Lalu Lintas Gerbang Tol Pasteur & Jalur Wisata Lembang",
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

    // Generic templates for categories that do not have explicitly detailed stories above, to keep code compact and efficient.
    const genericTemplates = [
      {
        title: "Pembangunan Infrastruktur Terpadu di {catName} Masuk Tahap Final",
        subtitle: "Langkah Strategis Pemerintah Daerah Menjamin Kesejahteraan Komunitas",
        summary: "Kajian mendalam mengenai efektivitas alokasi dana pembangunan berkelanjutan di wilayah {catName}.",
        body: "## Pembangunan {catName} Berkelanjutan\n\nPemerintah secara resmi mengonfirmasi penyelesaian pengerjaan proyek infrastruktur utama pendukung kegiatan ekonomi warga sekitar.\n\n### Manfaat Sektoral bagi Warga\n\nFasilitas baru ini dirancang ramah lingkungan serta aman digunakan bagi semua segmen masyarakat, termasuk anak-anak dan lansia.",
        contentType: "standard" as const,
        sentiment: "positive" as const,
        riskLevel: "low" as const,
        heroImageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Evaluasi Pelaksanaan Kebijakan Manajemen Publik di Sektor {catName}",
        subtitle: "Pentingnya Transparansi Data Guna Mewujudkan Tata Kelola Pemerintahan yang Bersih",
        summary: "Studi kasus efektivitas sistem audit kinerja pelayanan sipil pada kategori {catName}.",
        body: "## Tata Kelola Bersih {catName}\n\nPenerapan platform digital terintegrasi mempermudah pengawasan aliran anggaran secara akuntabel, mencegah potensi kebocoran finansial.",
        contentType: "analysis" as const,
        sentiment: "neutral" as const,
        riskLevel: "low" as const,
        heroImageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Inovasi Kewirausahaan Komunitas Lokal Mengangkat Nilai Tambah {catName}",
        subtitle: "Pelatihan Keterampilan Kreatif Dukung Kemandirian Finansial Ibu Rumah Tangga",
        summary: "Program pemberdayaan ekonomi mikro terbukti meningkatkan pendapatan keluarga secara nyata di sektor {catName}.",
        body: "## Kemandirian Ekonomi Keluarga\n\nMelalui pelatihan berkelanjutan, para peserta kini mampu memproduksi kerajinan bernilai jual tinggi untuk dipasarkan secara nasional.",
        contentType: "standard" as const,
        sentiment: "positive" as const,
        riskLevel: "low" as const,
        heroImageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Peran Vital Kolaborasi Lintas Sektor dalam Menyukseskan Kampanye {catName}",
        subtitle: "Sinergi Akademisi, Swasta, dan Komunitas Menghasilkan Solusi Dampak Nyata",
        summary: "Kajian keberhasilan model kemitraan multipihak dalam meluncurkan inisiatif sosial bertema {catName}.",
        body: "## Kolaborasi Konstruktif {catName}\n\nKeberhasilan kampanye sosial ini membuktikan bahwa persatuan langkah berbagai elemen masyarakat mampu menyelesaikan kendala rumit secara taktis.",
        contentType: "standard" as const,
        sentiment: "positive" as const,
        riskLevel: "low" as const,
        heroImageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Studi Komparatif: Membandingkan Pola Adaptasi Kebiasaan Baru Sektor {catName}",
        subtitle: "Bagaimana Penggunaan Teknologi Membantu Menjaga Keberlangsungan Operasional Layanan",
        summary: "Analisis statistik persepsi masyarakat mengenai kepuasan adaptasi digital pada bidang {catName}.",
        body: "## Adaptasi Digital {catName}\n\nHasil penelitian mengonfirmasi bahwa mayoritas warga merasa sangat terbantu oleh kehadiran layanan mandiri online yang cepat dan andal.",
        contentType: "analysis" as const,
        sentiment: "positive" as const,
        riskLevel: "low" as const,
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
      if (!this.data.categories.some(c => c.id === reqCat.id)) {
        this.data.categories.push(reqCat);
        changed = true;
      }
    }

    const categories = this.data.categories;
    const contents = this.data.contents;

    for (const cat of categories) {
      // Find current contents belonging to this category
      const currentCatContents = contents.filter(c => c.primaryCategoryId === cat.id);
      const missingCount = 5 - currentCatContents.length;

      if (missingCount > 0) {
        // Retrieve explicit templates or fallback to generic
        const explicitStories = categoryStories[cat.id];

        for (let i = 0; i < missingCount; i++) {
          const itemIdx = currentCatContents.length + i;
          let story;

          if (explicitStories && explicitStories[itemIdx % explicitStories.length]) {
            story = explicitStories[itemIdx % explicitStories.length];
          } else {
            // Fallback: populate generic templates with category name
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

          // Generate stable deterministic slug and ID
          const slug = `${story.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${cat.id.replace('cat-', '')}-${itemIdx}`;
          const contentId = `art-enriched-${cat.id.replace('cat-', '')}-${itemIdx}`;

          // Create and insert content
          const newContent: Content = {
            id: contentId,
            title: story.title,
            subtitle: story.subtitle,
            slug,
            summary: story.summary,
            body: story.body,
            contentType: story.contentType,
            status: 'published',
            primaryCategoryId: cat.id,
            sentiment: story.sentiment,
            riskLevel: story.riskLevel,
            heroImageUrl: story.heroImageUrl,
            authorId: 'usr-reporter',
            editorId: 'usr-editor',
            publishedAt: now,
            isSponsored: false,
            viewCount: Math.floor(Math.random() * 2000) + 150,
            readingTimeMinutes: 3,
            createdAt: now,
            updatedAt: now
          };

          contents.push(newContent);

          // Connect Pivot tables (location and entity)
          // Default location: Jawa Barat
          this.data.contentLocations.push({
            contentId: newContent.id,
            locationId: 'loc-jabar',
            relevanceScore: 90,
            isPrimary: true
          });

          // Default entity: Gedung Sate / Ridwan Kamil based on index
          const entId = i % 2 === 0 ? 'ent-gdsate' : 'ent-rk';
          this.data.contentEntities.push({
            contentId: newContent.id,
            entityId: entId,
            relevanceScore: 85,
            relationType: 'subject'
          });

          changed = true;
        }
      }
    }

    if (changed) {
      this.save();
    }
  }
}
