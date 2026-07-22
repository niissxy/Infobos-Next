import { RelationalDB } from '../db/client';
import { IngestionItem, IngestionSource, Content } from '../db/schema';
import { IntelligenceService } from './intelligence.service';

export class IngestionService {
  /**
   * Calculates word-level Jaccard Similarity between two titles
   * To determine if they represent duplicate reports.
   */
  public static calculateSimilarity(t1: string, t2: string): number {
    const s1 = new Set(t1.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '').split(/\s+/).filter(Boolean));
    const s2 = new Set(t2.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '').split(/\s+/).filter(Boolean));
    
    if (s1.size === 0 || s2.size === 0) return 0;
    
    const intersection = new Set([...s1].filter(x => s2.has(x)));
    const union = new Set([...s1, ...s2]);
    
    return intersection.size / union.size;
  }

  /**
   * Simulates fetching external RSS feeds and parsing them, running
   * deduplication checks, and routing items through the NLP intelligence queue.
   */
  public static async pollAndProcessAll(): Promise<{ processed: number; duplicates: number; created: number }> {
    const db = RelationalDB.getInstance();
    const sources = db.getIngestionSources().filter(s => s.isActive && s.trustTier !== 'blocked');
    const existingContents = db.getContents();
    
    let processed = 0;
    let duplicates = 0;
    let created = 0;
    
    // Seed mock RSS updates to pull from
    const feedPayloads: Record<string, Array<{ guid: string; title: string; body: string; author: string; sourceUrl: string }>> = {
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

    const now = new Date().toISOString();

    for (const source of sources) {
      const feedItems = feedPayloads[source.id] || [];
      if (feedItems.length === 0) continue;

      for (const rawItem of feedItems) {
        processed++;
        
        // 1. Check if GUID already processed
        const alreadyIngested = db.getIngestionItems().some(i => i.originalGuid === rawItem.guid);
        if (alreadyIngested) continue;

        // 2. Perform duplicate detection against published articles
        let duplicateFound: Content | null = null;
        let highestScore = 0;

        for (const article of existingContents) {
          const score = this.calculateSimilarity(rawItem.title, article.title);
          if (score > highestScore) {
            highestScore = score;
          }
          if (score >= 0.55) { // 55% similarity threshold
            duplicateFound = article;
            break;
          }
        }

        if (duplicateFound) {
          duplicates++;
          const item: IngestionItem = {
            id: `ing-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            sourceId: source.id,
            originalGuid: rawItem.guid,
            title: rawItem.title,
            description: rawItem.body.substring(0, 100) + "...",
            body: rawItem.body,
            author: rawItem.author,
            url: rawItem.sourceUrl,
            status: 'deduplicated',
            relevanceScore: Math.round(highestScore * 100),
            duplicateOfContentId: duplicateFound.id,
            createdAt: now
          };
          db.addIngestionItem(item);
          continue;
        }

        // 3. Process new unique article with Gemini NLP Tagger
        created++;
        
        // Process intelligence tags
        const nlp = await IntelligenceService.analyzeContent(rawItem.title, rawItem.body);
        
        // Save raw ingestion log item
        const ingestionItem: IngestionItem = {
          id: `ing-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          sourceId: source.id,
          originalGuid: rawItem.guid,
          title: rawItem.title,
          description: rawItem.body.substring(0, 100) + "...",
          body: rawItem.body,
          author: rawItem.author,
          url: rawItem.sourceUrl,
          status: 'draft_created',
          relevanceScore: 100,
          createdAt: now
        };
        db.addIngestionItem(ingestionItem);

        // 4. Map and auto-create editorial Draft content
        const newSlug = rawItem.title.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-');

        const primaryCat = db.getCategories().find(c => c.slug === 'daerah' || c.slug === 'bisnis') || db.getCategories()[0];

        const contentId = `art-auto-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
        const newContent: Content = {
          id: contentId,
          title: rawItem.title,
          slug: newSlug,
          summary: nlp.summary,
          body: rawItem.body,
          contentType: 'standard',
          status: 'draft', // Critical rule: human must review, NEVER auto-publish
          primaryCategoryId: primaryCat.id,
          sentiment: nlp.sentiment,
          riskLevel: nlp.riskLevel,
          authorId: 'usr-reporter', // attributed to system reporter
          sourceUrl: rawItem.sourceUrl,
          originalSourceAttribution: source.name,
          isSponsored: false,
          viewCount: 0,
          readingTimeMinutes: Math.max(1, Math.round(rawItem.body.split(/\s+/).length / 200)),
          createdAt: now,
          updatedAt: now
        };

        db.addContent(newContent);

        // 5. Connect extracted geolocations, entities, topics & tags
        // Map locations
        const dbLocations = db.getLocations();
        const mappedLocations = nlp.locations.map(loc => {
          const match = dbLocations.find(dbl => dbl.name.toLowerCase() === loc.name.toLowerCase());
          if (match) {
            return { contentId, locationId: match.id, relevanceScore: 100, isPrimary: loc.type === 'city' };
          }
          return null;
        }).filter(Boolean) as any[];
        db.setContentLocations(contentId, mappedLocations);

        // Map entities
        const dbEntities = db.getEntities();
        const mappedEntities = nlp.entities.map(ent => {
          const match = dbEntities.find(dbe => dbe.name.toLowerCase() === ent.name.toLowerCase());
          if (match) {
            return { contentId, entityId: match.id, relevanceScore: 100, relationType: ent.type };
          }
          return null;
        }).filter(Boolean) as any[];
        db.setContentEntities(contentId, mappedEntities);

        // Create version
        db.addContentVersion({
          id: `ver-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          contentId,
          title: rawItem.title,
          body: rawItem.body,
          summary: nlp.summary,
          modifiedBy: 'usr-reporter',
          changeSummary: `Sinyal terdeteksi otomatis dari ${source.name}. Melewati filter duplikasi Jaccard. Diperkaya NLP Gemini.`,
          createdAt: now
        });
      }

      // Update source status
      source.lastFetchedAt = now;
      db.updateIngestionSource(source);
    }

    return { processed, duplicates, created };
  }
}
