import { RelationalDB } from '../db/client';
import { 
  User, Category, Topic, Tag, Location, Entity, Content, ContentVersion,
  ContentLocation, ContentEntity, ContentTopic, ContentTag, IngestionSource,
  IngestionItem, Advertiser, Campaign, Creative, Bookmark, Follow, AuditLog,
  Correction
} from '../db/schema';

// High-fidelity seeded lists for realistic data generation
const FIRST_NAMES = ['Ahmad', 'Siti', 'Budi', 'Dewi', 'Wira', 'Asep', 'Sri', 'Ridwan', 'Sandiaga', 'Najwa', 'Aditya', 'Eka', 'Farhan', 'Gita', 'Hendra', 'Indah', 'Joko', 'Kurnia', 'Lestari', 'Mulyono', 'Novi', 'Oki', 'Bambang', 'Cahyono', 'Rian', 'Santi', 'Faisal', 'Lia', 'Rudi', 'Mega'];
const LAST_NAMES = ['Dahlan', 'Rahma', 'Santoso', 'Wijaya', 'Sunandar', 'Mulyani', 'Kamil', 'Uno', 'Shihab', 'Pratama', 'Siregar', 'Lubis', 'Kusuma', 'Hidayat', 'Saputra', 'Nasution', 'Gunawan', 'Adiputra', 'Wibowo', 'Nugroho', 'Setiawan', 'Purwanto', 'Hadi', 'Kartika', 'Sari', 'Utami'];

const INDONESIAN_CITIES = [
  { name: 'Bandung', slug: 'bandung', lat: -6.9175, lon: 107.6191, prov: 'Jawa Barat', temp: 24, cond: 'Cerah Berawan', aqi: 45, alertTitle: 'Waspada Kabut Pagi Hari', alertLevel: 'info' },
  { name: 'Jakarta Pusat', slug: 'jakarta-pusat', lat: -6.1751, lon: 106.8272, prov: 'DKI Jakarta', temp: 31, cond: 'Cerah', aqi: 112, alertTitle: 'Polusi Udara Sedang Tinggi', alertLevel: 'warning' },
  { name: 'Surabaya', slug: 'surabaya', lat: -7.2575, lon: 112.7521, prov: 'Jawa Timur', temp: 33, cond: 'Cerah', aqi: 65, alertTitle: 'Cuaca Ekstrem Terik Siang Hari', alertLevel: 'info' },
  { name: 'Medan', slug: 'medan', lat: 3.5952, lon: 98.6722, prov: 'Sumatera Utara', temp: 29, cond: 'Hujan Ringan', aqi: 35, alertTitle: 'Potensi Genangan Air Jalur Utama', alertLevel: 'info' },
  { name: 'Makassar', slug: 'makassar', lat: -5.1477, lon: 119.4327, prov: 'Sulawesi Selatan', temp: 30, cond: 'Berawan', aqi: 48, alertTitle: 'Kecepatan Angin Meningkat', alertLevel: 'info' },
  { name: 'Yogyakarta', slug: 'yogyakarta', lat: -7.7956, lon: 110.3695, prov: 'DI Yogyakarta', temp: 25, cond: 'Cerah Berawan', aqi: 55, alertTitle: 'Aktivitas Gunung Merapi Level Siaga', alertLevel: 'warning' },
  { name: 'Semarang', slug: 'semarang', lat: -6.9667, lon: 110.4167, prov: 'Jawa Tengah', temp: 31, cond: 'Berawan', aqi: 72, alertTitle: 'Waspada Banjir Rob Sore Hari', alertLevel: 'warning' },
  { name: 'Palembang', slug: 'palembang', lat: -2.9761, lon: 104.7754, prov: 'Sumatera Selatan', temp: 28, cond: 'Hujan Petir', aqi: 30, alertTitle: 'Peringatan Dini Petir & Angin Kencang', alertLevel: 'critical' },
  { name: 'Denpasar', slug: 'denpasar', lat: -8.6705, lon: 115.2126, prov: 'Bali', temp: 29, cond: 'Cerah', aqi: 40, alertTitle: 'Gelombang Tinggi Selat Bali', alertLevel: 'info' },
  { name: 'Balikpapan', slug: 'balikpapan', lat: -1.2654, lon: 116.8312, prov: 'Kalimantan Timur', temp: 28, cond: 'Hujan Ringan', aqi: 32, alertTitle: 'Pembangunan IKN Berjalan Lancar', alertLevel: 'none' }
];

const INDUSTRIES = ['Agroteknologi', 'FinTech', 'SaaS & AI', 'Logistics', 'Creative Industry', 'Clean Energy', 'HealthTech', 'EdTech', 'Mining', 'FMCG', 'Tourism', 'E-Commerce'];

const CORPORATIONS = [
  { name: 'GoTo Group', desc: 'Raksasa teknologi Indonesia penyedia layanan ride-hailing, e-commerce, dan fintech terpadu.', web: 'https://www.gotocompany.com' },
  { name: 'Telkomsel', desc: 'Penyedia telekomunikasi seluler digital terbesar di Indonesia dengan jangkauan nasional.', web: 'https://www.telkomsel.com' },
  { name: 'Bank Central Asia (BCA)', desc: 'Lembaga keuangan swasta terbesar yang mengoperasikan infrastruktur perbankan digital tercanggih.', web: 'https://www.bca.co.id' },
  { name: 'Astra International', desc: 'Konglomerat multi-industri dengan fokus otomotif, jasa keuangan, dan alat berat pertanian.', web: 'https://www.astra.co.id' },
  { name: 'Traveloka', desc: 'Platform lifestyle superapp terkemuka untuk pemesanan tiket perjalanan dan akomodasi Asia Tenggara.', web: 'https://www.traveloka.com' },
  { name: 'Kopi Kenangan', desc: 'Jaringan gerai kopi grab-and-go berbasis aplikasi dengan pertumbuhan tercepat.', web: 'https://kopikenangan.com' },
  { name: 'Indofood Sukses Makmur', desc: 'Produsen pangan olahan terbesar dengan merek ikonik global yang tersebar di 50 negara.', web: 'https://www.indofood.com' },
  { name: 'Pertamina', desc: 'Badan Usaha Milik Negara yang mengelola ketahanan energi, kilang minyak, dan eksplorasi energi hijau.', web: 'https://www.pertamina.com' },
  { name: 'Bio Farma', desc: 'Holding farmasi BUMN yang memproduksi vaksin berkualitas standar WHO untuk pasar global.', web: 'https://www.biofarma.co.id' },
  { name: 'Halodoc', desc: 'Aplikasi kesehatan digital terpadu yang mempermudah konsultasi medis dan pengiriman obat kilat.', web: 'https://www.halodoc.com' }
];

const BRANDS = [
  { name: 'Tokopedia', parent: 'GoTo Group' },
  { name: 'Gojek Pay', parent: 'GoTo Group' },
  { name: 'Kenangan Latte', parent: 'Kopi Kenangan' },
  { name: 'Indomie Goreng', parent: 'Indofood Sukses Makmur' },
  { name: 'By.U Digital SIM', parent: 'Telkomsel' },
  { name: 'Livin by Mandiri', parent: 'Bank Mandiri' },
  { name: 'Ovo Cash Wallet', parent: 'Grab Indonesia' },
  { name: 'Wardah Kosmetik', parent: 'Paragon Technology' },
  { name: 'Teh Botol Sosro', parent: 'Sinar Sosro' },
  { name: 'Agras Drone T30', parent: 'DJI Agriculture' }
];

const INDONESIAN_GOV = [
  { name: 'Kementerian Keuangan (Kemenkeu)', web: 'https://www.kemenkeu.go.id' },
  { name: 'Kementerian Komunikasi dan Informatika (Kominfo)', web: 'https://www.kominfo.go.id' },
  { name: 'Badan Siber dan Sandi Negara (BSSN)', web: 'https://www.bssn.go.id' },
  { name: 'Otoritas Jasa Keuangan (OJK)', web: 'https://www.ojk.go.id' },
  { name: 'Bank Indonesia (BI)', web: 'https://www.bi.go.id' },
  { name: 'Kementerian Pariwisata dan Ekonomi Kreatif (Kemenparekraf)', web: 'https://www.kemenparekraf.go.id' },
  { name: 'Badan Meteorologi Klimatologi Geofisika (BMKG)', web: 'https://www.bmkg.go.id' }
];

const NOUNS_TOPICS = [
  { topic: 'Inovasi AI Kebangsaan', desc: 'Akselerasi adopsi Large Language Models (LLM) berbahasa daerah di instansi publik.' },
  { topic: 'Infrastruktur Rebana Metropolitan', desc: 'Koridor industri baru yang menghubungkan pelabuhan Patimban, Kertajati, dan Cirebon.' },
  { topic: 'Regulasi Pajak Transaksi Digital', desc: 'Pemberlakuan PPN PMSE dan dampaknya bagi daya beli UMKM kreatif.' },
  { topic: 'Ketahanan Energi Hijau Jabar', desc: 'Pemanfaatan pembangkit listrik tenaga surya apung dan bioenergi pedesaan.' },
  { topic: 'Inklusi Keuangan Mikro Digital', desc: 'Penyaluran modal bergulir berbasis peer-to-peer lending bagi petani komoditas hortikultura.' }
];

const SENTIMENTS = ['positive', 'negative', 'neutral', 'mixed', 'investigative'] as const;
const RISK_LEVELS = ['low', 'medium', 'high', 'critical'] as const;

// Deterministic seed helper using LCG algorithm
function getSeededRandom(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  }
  return function() {
    h = Math.imul(1664525, h) + 1013904223 | 0;
    return (h >>> 0) / 4294967296;
  };
}

export class EnterpriseSeedEngine {
  
  /**
   * Generates a completely realistic, interconnected, Indonesian-localized seed database.
   */
  public static async generateSeed(options: {
    mode: 'full' | 'partial';
    module?: string;
    category?: string;
    region?: string;
    year?: string;
  }): Promise<{ success: boolean; stats: any; message: string }> {
    const db = RelationalDB.getInstance();
    const now = new Date().toISOString();
    
    // Clear and restore minimal structure if generating full seed
    if (options.mode === 'full') {
      this.resetDatabase();
    }

    const rand = getSeededRandom(`seed-run-${options.module || 'all'}-${options.region || 'all'}`);
    const limit = options.mode === 'partial' ? 5 : 20;

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

    // 1. GENERATE EXTRA USERS & REPORTERS
    if (!options.module || options.module === 'Community' || options.module === 'News') {
      const existingUserCount = db.getUsers().length;
      if (existingUserCount < 15) {
        for (let i = 0; i < 15; i++) {
          const fn = FIRST_NAMES[Math.floor(rand() * FIRST_NAMES.length)];
          const ln = LAST_NAMES[Math.floor(rand() * LAST_NAMES.length)];
          const fullName = `${fn} ${ln}`;
          const email = `${fn.toLowerCase()}.${ln.toLowerCase()}@infobos.com`;
          const role = i % 4 === 0 ? 'managing_editor' : i % 4 === 1 ? 'editor' : i % 4 === 2 ? 'reporter' : 'member';
          
          const newUser: User = {
            id: `usr-seed-${existingUserCount + i}`,
            email,
            passwordHash: 'pass123',
            fullName,
            role,
            status: 'active',
            createdAt: now,
            updatedAt: now
          };
          db.getUsers().push(newUser);
          stats.users++;
        }
      }
    }

    // 2. GENERATE EXTRA LOCATIONS (Indonesia, Jabar, DKI, etc.)
    const currentLocs = db.getLocations();
    if (currentLocs.length <= 5) {
      INDONESIAN_CITIES.forEach((c, idx) => {
        const found = currentLocs.some(l => l.slug === c.slug);
        if (!found) {
          const newLoc: Location = {
            id: `loc-seed-${idx}`,
            name: c.name,
            slug: c.slug,
            type: 'city',
            parentId: c.prov === 'Jawa Barat' ? 'loc-jabar' : c.prov === 'DKI Jakarta' ? 'loc-dki' : 'loc-idn',
            latitude: c.lat,
            longitude: c.lon,
            weatherTemp: c.temp,
            weatherCondition: c.cond,
            aqi: c.aqi,
            alertTitle: c.alertTitle,
            alertLevel: c.alertLevel as any,
            createdAt: now
          };
          db.getLocations().push(newLoc);
          stats.locations++;
        }
      });
    }

    // 3. GENERATE EXTRA ENTITIES
    const currentEntities = db.getEntities();
    if (currentEntities.length <= 4) {
      CORPORATIONS.forEach((c, idx) => {
        const newEnt: Entity = {
          id: `ent-seed-co-${idx}`,
          name: c.name,
          slug: c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          type: 'company',
          description: c.desc,
          websiteUrl: c.web,
          logoUrl: `https://images.unsplash.com/photo-${['1572021335469-31706a17aaef', '1486406146926-c627a92ad1ab', '1554469384-e58fac16e23a'][idx % 3]}?auto=format&fit=crop&w=300&q=80`,
          isClaimed: idx % 3 === 0,
          metadata: { industry: INDUSTRIES[idx % INDUSTRIES.length], staffRange: '50-500' },
          createdAt: now
        };
        db.getEntities().push(newEnt);
        stats.entities++;
      });

      INDONESIAN_GOV.forEach((g, idx) => {
        const newEnt: Entity = {
          id: `ent-seed-gov-${idx}`,
          name: g.name,
          slug: g.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          type: 'government',
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

    // 4. GENERATE NEWS CONTENTS (Articles & Reports)
    if (!options.module || options.module === 'News') {
      const activeCats = db.getCategories();
      const activeLocs = db.getLocations();
      const activeEnts = db.getEntities();
      const activeAuthors = db.getUsers().filter(u => u.role === 'reporter' || u.role === 'editor' || u.role === 'super_admin');

      for (let i = 0; i < limit; i++) {
        // Filter by category or region if specified
        let targetCat = activeCats[i % activeCats.length];
        if (options.category) {
          const matched = activeCats.find(c => c.slug === options.category || c.id === options.category);
          if (matched) targetCat = matched;
        }

        let targetLoc = activeLocs[i % activeLocs.length];
        if (options.region) {
          const matched = activeLocs.find(l => l.slug === options.region || l.id === options.region);
          if (matched) targetLoc = matched;
        }

        const targetEnt = activeEnts[i % activeEnts.length];
        const targetAuthor = activeAuthors[i % activeAuthors.length] || db.getUsers()[0];

        const nounObj = NOUNS_TOPICS[i % NOUNS_TOPICS.length];
        const year = options.year || '2026';
        const pubDate = new Date(parseInt(year), Math.floor(rand() * 12), Math.floor(rand() * 28) + 1, 10, 30).toISOString();

        const title = `Akselerasi ${nounObj.topic} di Wilayah ${targetLoc.name} Menemukan Solusi Rantai Pasok`;
        const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${i}`;
        const summary = `Kajian jurnalisme presisi mengenai integrasi ${nounObj.topic} yang digarap oleh ${targetEnt.name} bertempat di ${targetLoc.name}.`;
        const body = `## Pendahuluan Sektoral\n\nPembangunan infrastruktur regional dan **${nounObj.topic}** menjadi topik diskusi hangat di tingkat nasional. Melalui program percepatan ini, **${targetEnt.name}** memperkenalkan peta jalan teknologi modern yang ramah lingkungan.\n\n### Dampak Positif di Lapangan\n\nMasyarakat di wilayah **${targetLoc.name}** menyambut antusias penyederhanaan birokrasi dan insentif pendanaan baru. Model evaluasi siber menunjukkan korelasi kuat terhadap pertumbuhan indeks literasi UMKM.\n\n> "Sinergi multipihak ini membuktikan bahwa kita mampu beradaptasi cepat menghadapi fluktuasi ekonomi global," tegas analis senior Redaksi INFOBOS.`;

        const newContent: Content = {
          id: `art-seed-gen-${i}`,
          title,
          subtitle: `Peta Jalan & Kebijakan Strategis Indonesia Maju Era Globalisasi`,
          slug,
          summary,
          body,
          contentType: i % 5 === 0 ? 'analysis' : i % 5 === 1 ? 'breaking' : 'standard',
          status: 'published',
          primaryCategoryId: targetCat.id,
          sentiment: SENTIMENTS[i % SENTIMENTS.length],
          riskLevel: RISK_LEVELS[i % RISK_LEVELS.length],
          heroImageUrl: `https://images.unsplash.com/photo-${['1504711434969-e33886168f5c', '1451187580459-43490279c0fa', '1526304640581-d334cdbbf45e', '1590283603385-17ffb3a7f29f'][i % 4]}?auto=format&fit=crop&w=800&q=80`,
          authorId: targetAuthor.id,
          publishedAt: pubDate,
          isSponsored: i % 10 === 0,
          viewCount: Math.floor(rand() * 4500) + 200,
          readingTimeMinutes: 4,
          createdAt: pubDate,
          updatedAt: pubDate
        };

        // Check if content already exists
        const exists = db.getContents().some(c => c.slug === slug);
        if (!exists) {
          db.getContents().unshift(newContent);
          
          // Connect Pivot tables
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
            relationType: 'subject'
          });

          stats.contents++;
        }
      }
    }

    // 5. GENERATE MONETIZATION ADS & CAMPAIGNS
    if (!options.module || options.module === 'Ads') {
      const activeAdvertisers = db.getAdvertisers();
      if (activeAdvertisers.length === 0) {
        const adv: Advertiser = {
          id: 'adv-seed-1',
          companyName: 'Astra International AdSpace',
          contactEmail: 'ads@astra.co.id',
          budgetTotal: 150000000,
          budgetSpent: 42500000,
          createdAt: now
        };
        db.getAdvertisers().push(adv);

        const camp: Campaign = {
          id: 'cam-seed-1',
          advertiserId: adv.id,
          name: 'Promo Mudik Hemat Astra 2026',
          startAt: now,
          endAt: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString(),
          budget: 50000000,
          status: 'active',
          targetLocations: ['bandung', 'jakarta-pusat'],
          createdAt: now
        };
        db.getCampaigns().push(camp);

        const creatives: Creative[] = [
          {
            id: 'cr-seed-1',
            campaignId: camp.id,
            placement: 'header_leaderboard',
            imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&h=200&q=80',
            destinationUrl: 'https://www.astra.co.id',
            altText: 'Layanan Servis Astra Terpercaya Liburan Aman',
            impressionLimit: 500000,
            clickLimit: 12000,
            impressionsCount: 234100,
            clicksCount: 3120,
            status: 'active',
            createdAt: now
          },
          {
            id: 'cr-seed-2',
            campaignId: camp.id,
            placement: 'sidebar',
            imageUrl: 'https://images.unsplash.com/photo-1511527654053-d8919d798655?auto=format&fit=crop&w=300&h=600&q=80',
            destinationUrl: 'https://www.astra.co.id',
            altText: 'Astra Financial: Solusi Pembiayaan Cepat Berizin OJK',
            impressionLimit: 200000,
            clickLimit: 8000,
            impressionsCount: 84300,
            clicksCount: 940,
            status: 'active',
            createdAt: now
          }
        ];
        creatives.forEach(cr => db.getCreatives().push(cr));
        
        stats.campaigns++;
        stats.creatives = creatives.length;
      }
    }

    // 6. POPULATE COMMUNITY / FORUM STATE DATA (LOCAL STORAGE COMPATIBLE)
    if (!options.module || options.module === 'Community') {
      const forumSeedThreads = [
        {
          id: `th-seed-1-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          title: 'Bagaimana masa depan digitalisasi rantai pasok kopi Java Preanger Jabar?',
          category: 'industri',
          author: 'Sulaeman Kopi (Pangalengan)',
          content: 'Kami melihat harga pupuk dan ongkos kirim ke pelabuhan Patimban masih tinggi. Apakah teknologi drone penyemprot dan aplikasi marketplace tani dapat mereduksi biaya operational?',
          tags: ['Agrotech', 'SupplyChain', 'Kopi'],
          likes: 34,
          repliesCount: 3,
          views: 450,
          isPinned: true,
          isSolved: true,
          votes: 18,
          aiSummary: 'Diskusi optimasi logistik agroindustri kopi di Jawa Barat. Forum mengidentifikasi bahwa sewa drone menyemprot menghemat 40% pemakaian air, dan integrasi marketplace memotong tengkulak daerah.',
          replies: [
            { id: 'rep-s1', author: 'Aditya Pratama', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', content: 'Di Pangalengan kami sudah coba drone sewa, patungan bersama 4 kelompok tani. Biaya jauh lebih hemat karena waktu sebar pupuk cuma 15 menit per hektar.', isSolvedAnswer: true, likes: 12, quote: '' },
            { id: 'rep-s2', author: 'Dewi Lestari', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80', content: 'Sangat setuju, pemotongan rantai tengkulak melalui portal digital INFOBOS juga sangat membantu sirkulasi margin modal tani kami.', isSolvedAnswer: false, likes: 7, quote: 'Aditya Pratama: Di Pangalengan kami sudah coba drone sewa...' }
          ]
        },
        {
          id: `th-seed-2-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          title: 'Rekomendasi Broker / Escrow terpercaya untuk transaksi alat manufaktur bekas?',
          category: 'qa',
          author: 'Faisal Rian (Teknik Industri)',
          content: 'Ada rencana beli mesin ekstraktor atsiri SUS316 seharga 20jt, tapi takut penipuan. Sistem Escrow INFOBOS apakah sudah mengcover asuransi penahanan dana hingga unit lolos QC?',
          tags: ['Escrow', 'Mesin', 'Manufaktur'],
          likes: 18,
          repliesCount: 1,
          views: 290,
          isPinned: false,
          isSolved: false,
          votes: 5,
          aiSummary: 'Anggota menanyakan kredibilitas rekening bersama / escrow asuransi INFOBOS. Dijelaskan bahwa asuransi escrow aktif memproteksi pembeli dari mesin malfungsi.',
          replies: [
            { id: 'rep-s3', author: 'Ahmad Dahlan', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80', content: 'Escrow INFOBOS sangat aman! Dana ditahan di rekening bank terpercaya OJK, dan baru cair setelah pembeli menekan tombol Verifikasi Fisik Lolos QC dalam 2 hari kerja.', isSolvedAnswer: true, likes: 9, quote: '' }
          ]
        }
      ];
      stats.forumThreads = forumSeedThreads.length;
      return { success: true, stats, message: 'Fidelity Seeding completed beautifully' };
    }

    // Log seeding event
    db.addAuditLog({
      id: `aud-seed-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      actorId: 'usr-admin',
      actorName: 'System Administrator (Ahmad Dahlan)',
      action: 'system.seed',
      entityName: 'database',
      entityId: 'db_store.json',
      newValues: { options, stats },
      timestamp: now
    });

    db.save();
    return { success: true, stats, message: 'Platform data seeding successfully finished!' };
  }

  /**
   * Clears all content, audits, versions, keeping only default admin credentials.
   */
  public static resetDatabase(): void {
    const db = RelationalDB.getInstance();
    const now = new Date().toISOString();

    // Re-initialize default collections
    db.getContents().length = 0;
    db.getContentLocations('').length = 0; // Empty relational arrays
    db.getContentEntities('').length = 0;
    db.getContentTopics('').length = 0;
    db.getContentTags('').length = 0;
    db.getContentVersions().length = 0;
    db.getCampaigns().length = 0;
    db.getCreatives().length = 0;
    db.getAuditLogs().length = 0;
    db.getCorrections().length = 0;

    // Reset users to defaults only
    db.getUsers().length = 0;
    db.getUsers().push(
      { id: "usr-admin", email: "admin@infobos.com", passwordHash: "admin123", fullName: "Ahmad Dahlan", role: "super_admin", status: "active", createdAt: now, updatedAt: now },
      { id: "usr-editor", email: "editor@infobos.com", passwordHash: "editor123", fullName: "Siti Rahma", role: "managing_editor", status: "active", createdAt: now, updatedAt: now },
      { id: "usr-reporter", email: "reporter@infobos.com", passwordHash: "reporter123", fullName: "Budi Santoso", role: "reporter", status: "active", createdAt: now, updatedAt: now }
    );

    // Re-seed default static categories
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
      actorId: 'usr-admin',
      actorName: 'System Administrator (Ahmad Dahlan)',
      action: 'system.reset',
      entityName: 'database',
      entityId: 'db_store.json',
      timestamp: now
    });

    db.save();
  }
}
