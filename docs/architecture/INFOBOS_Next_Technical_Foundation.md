# INFOBOS Next: Technical Foundation & Architectural Specification
**Version:** 1.0.0-MVP  
**Status:** Approved for Implementation  
**Tagline:** *Satu Portal, Dunia & Sekitarmu*  

---

## A. Product Understanding
**INFOBOS Next** is a state-of-the-art information intelligence platform and news portal. Unlike generic news aggregators or standard media websites, INFOBOS Next acts as a **living information network**. It treats articles not as isolated texts, but as nodes in an active graph connecting geolocations, human/corporate entities, evolving topics, real-time sentiment, and trends.

The platform is powered by two underlying internal engines:
1. **VIRALOG (Content Operations Engine):** Powering content production, workflow state-machines, RSS feeds, contributor submissions, SEO optimization, and advertising placements.
2. **EVOLIS (Intelligence & Growth Engine):** Processing signals, analyzing sentiment, detecting trends, recommending internal links, and executing low-risk automated jobs under strict human governance.

---

## B. Core Use Cases
*   **Semantic News Intake (Public):** A reader consumes a breaking news article and immediately views visual context cards: the geographic footprint, profiles of mentioned entities (e.g., people, brands, companies), a timeline of related events, and custom data summaries.
*   **Hyperlocal Hubs (Public):** Readers drill down into a province or city level to view localized updates, weather, air quality indices, municipal announcements, and local ad sponsors.
*   **Entity Profile Timelines (Public):** Readers track public figures, companies, or organizations over time, viewing sentiment graphs, core information cards, and related topics.
*   **Editorial State Machine Workflow (Internal CMS):** Reporters draft content; editors review, schedule, and publish it, creating an immutable audit trail.
*   **AI-Assisted Ingestion (Internal Ingestion):** The system automatically polls authorized RSS feeds, normalizes the text, parses geolocations/entities, classifies risk, and queues the results for human review.
*   **Monetization Management (Internal Ads):** Advertisers configure geo-targeted banner campaigns, sponsored content, or entity sponsorships.

---

## C. User Roles & Permission Model
The platform supports granular Access Control (RBAC) across two main namespaces:

### 1. Public Roles
*   **Guest:** Anonymous viewer. Read-only access to standard published articles and basic directories.
*   **Free Member:** Authenticated reader. Can bookmark articles, follow topics/entities/cities, and adjust notification preferences.
*   **Premium Member:** Ad-free reading experience, access to downloadable premium PDF reports, and advanced custom alert watchlists.
*   **Enterprise Member:** Team-based dashboard access, entity and regional brand monitoring, Excel/CSV exports, and API access.
*   **Advertiser:** Can manage advertising campaigns, upload creatives, specify geo-targeting, and view impression/click metrics.
*   **Contributor:** Verified citizen journalists who submit articles/photos/videos to the Editorial Queue for review.

### 2. Internal Roles
*   **Reporter:** Can draft and edit their own articles. Cannot self-publish.
*   **Editor:** Can draft, edit, review, and publish low-to-medium risk articles.
*   **Senior Editor:** Can review and publish high-risk or sensitive content.
*   **Managing Editor:** Full content editorial control, override permissions, and emergency unpublishing.
*   **Fact Checker:** Dedicated role for verifying "Fact Check" content, claims, and correcting errors.
*   **Analyst:** Accesses the EVOLIS engine data, search terms, trend radar metrics, and system aggregates.
*   **Ad Manager:** Reviews, approves, and invoices advertising campaigns.
*   **Super Admin:** Global system settings, database backups, user management, and server logs.

---

## D. Bounded Contexts
INFOBOS Next is designed around clean, non-overlapping bounded domains:

```
┌────────────────────────────────────────────────────────────────────────┐
│                          INFOBOS BOUNDED CONTEXTS                      │
├───────────────────┬───────────────────┬────────────────────────────────┤
│ 1. Identity & Auth│ 2. Content & CMS  │ 3. Taxonomy & Graph            │
│   - Users, Roles  │   - VIRALOG Engine│   - Categories, Tags           │
│   - RBAC Policy   │   - Versions, Block│   - Evolving Topics            │
├───────────────────┼───────────────────┼────────────────────────────────┤
│ 4. Geography      │ 5. Entities       │ 6. Trend Radar                 │
│   - Adjacency list│   - Figure Profile│   - Signal Scrapers            │
│   - Geo coordinates│   - Relation Graph│   - Growth Velocity            │
├───────────────────┼───────────────────┼────────────────────────────────┤
│ 7. Ingestion      │ 8. Intelligence   │ 9. Monetization                │
│   - RSS Feeds     │   - EVOLIS Core   │   - Campaign Placements        │
│   - Deduplication │   - Gemini API, NLP│   - Ad Trackers, Invoices      │
├───────────────────┼───────────────────┼────────────────────────────────┤
│ 10. Governance    │ 11. Engagement    │ 12. Audit & Analytics          │
│   - Fact-checking │   - Bookmarks, Fav│   - Immutable Event Logs       │
│   - Correction log│   - Notifications │   - Views, CTR Aggregates      │
└───────────────────┴───────────────────┴────────────────────────────────┘
```

---

## E. System Architecture
Our single full-stack runtime is optimized for performance, security, and developer speed in the Cloud Run sandboxed environment:

*   **Frontend (Public Portal & VIRALOG CMS):** React 19 application built via Vite, utilizing Tailwind CSS v4, Lucide Icons, and Motion for sleek, responsive transitions.
*   **Backend Server (Express API Layer):** Exposes high-performance REST endpoints under `/api/v1/`, serves static files, parses parameters, and performs secure RBAC/policy checks.
*   **Database (High-Fidelity Structured Store):** An elegant, fully relations-aware local SQLite or state engine with schema enforcement, automatic indices, seed data, and soft-delete capabilities.
*   **Intelligence Engine (Gemini API Integration):** Server-side integration with `@google/genai` (specifically `gemini-3.5-flash` for high-throughput metadata tagging, and `gemini-3.1-pro-preview` for deep reasoning/risk profiling).
*   **Background Ingestion/Queue System:** In-memory job scheduler mimicking BullMQ to handle RSS scraping, auto-tagging, duplicate detection, and indexing asynchronously without blocking the web threat.

---

## F. Monorepo & Folder Structure
While compiled into a full-stack monolithic container for instant deployment and seamless local routing, the project directory maintains modular clean domains:

```
/
├── docs/                      # Architectural & API Documentation
│   └── architecture/
│       └── INFOBOS_Next_Technical_Foundation.md
├── src/
│   ├── db/                    # Local schema definition, indices & migrations
│   │   ├── schema.ts          # Relational definitions and typings
│   │   └── client.ts          # File-backed relational storage interface
│   ├── server.ts              # Express server entrypoint (routes and middlewares)
│   ├── services/              # Bounded context micro-services
│   │   ├── auth.service.ts
│   │   ├── content.service.ts
│   │   ├── geo-entity.service.ts
│   │   ├── intelligence.service.ts  # Gemini API wrappers
│   │   ├── ingestion.service.ts     # RSS and worker loops
│   │   └── ads.service.ts
│   ├── App.tsx                # Main Router and UI Root
│   ├── index.css              # Global styles (Tailwind imports & typography)
│   ├── main.tsx               # Client bootstrap
│   └── components/            # UI components (Shared, Public, Admin VIRALOG/EVOLIS)
│       ├── ui/                # Base design tokens & primitive controls
│       ├── public/            # Public News Portal Layouts, Widgets, Geo/Entity
│       └── admin/             # VIRALOG CMS, Editorial Queues, EVOLIS dashboard
```

---

## G. Database Schema & ERD (Entity Relationship Diagram)
The database uses a clean relational structure. Soft deletes are used selectively on critical domains.

```
       [users] 1 ----- * [sessions]
          |
          +---- 1 ----- * [user_roles] * ----- 1 [roles] ----- 1 [role_permissions] ----- * [permissions]
          |
          +---- 1 ----- * [bookmarks] * ----- 1 [contents]
          |                                        |
          +---- 1 ----- * [follows]                +--- 1 --- * [content_blocks] (Rich editor blocks)
                                                   +--- 1 --- * [content_versions] (Audit history)
                                                   +--- * --- 1 [categories]
                                                   +--- * --- * [content_tags] * --- 1 [tags]
                                                   +--- * --- * [content_topics] * --- 1 [topics]
                                                   +--- * --- * [content_locations] * --- 1 [locations]
                                                   +--- * --- * [content_entities] * --- 1 [entities]
                                                   +--- * --- * [corrections] (Fact-check logs)
                                                   +--- * --- * [ad_impressions]

[sources] 1 --- * [ingestion_jobs] 1 --- * [ingestion_items] (Raw intake logs)
                                                   | (deduplicated)
                                                   +---> triggers auto-draft contents

[advertisers] 1 --- * [campaigns] 1 --- * [creatives] 1 --- * [ad_impressions / ad_clicks]
```

---

## H. Core Relational Entities (Schema Definitions)

### 1. Identity Context
*   **users:** `id` (UUID), `email`, `password_hash`, `full_name`, `status` (Active, Suspended), `created_at`, `updated_at`.
*   **roles:** `id`, `name` (e.g. "Editor", "Managing Editor"), `description`.
*   **role_permissions:** `role_id`, `permission_key` (e.g. `content.publish`).

### 2. Content Context (VIRALOG)
*   **contents:** `id` (UUID), `title`, `subtitle`, `slug`, `summary`, `body`, `content_type` (Breaking, Standard, Explainer, Analysis, Opinion, FactCheck), `status` (Draft, PendingReview, Approved, Scheduled, Published, Archived), `primary_category_id`, `sentiment` (Positive, Negative, Neutral, Investigative), `risk_level` (Low, Medium, High, Critical), `hero_image_url`, `author_id`, `editor_id`, `published_at`, `scheduled_at`, `source_url`, `is_sponsored`, `view_count`, `created_at`, `updated_at`.
*   **content_blocks:** `id`, `content_id`, `block_type` (paragraph, heading, quote, image, table, timeline), `content_data` (JSON), `sort_order`.
*   **content_versions:** `id`, `content_id`, `title`, `body`, `modified_by_id`, `change_summary`, `created_at`.
*   **corrections:** `id`, `content_id`, `fact_checker_id`, `original_text`, `corrected_text`, `reason`, `published_at`.

### 3. Taxonomy Context
*   **categories:** `id`, `name`, `slug`, `parent_id`.
*   **topics:** `id`, `name`, `slug`, `description`.
*   **tags:** `id`, `name`, `slug`.

### 4. Geography Context (Geo Intelligence)
*   **locations:** `id`, `name`, `slug`, `type` (Country, State, City), `parent_id`, `latitude`, `longitude`, `metrics` (JSON: weather, AQI, alert), `created_at`.

### 5. Entity Context (Entity Intelligence)
*   **entities:** `id`, `name`, `slug`, `entity_type` (Person, Company, Brand, Government, Landmark), `description`, `website_url`, `logo_url`, `meta_attributes` (JSON: founder, founded_date, coordinates), `is_claimed`, `created_at`.

### 6. Ingestion Context
*   **sources:** `id`, `name`, `domain`, `type` (RSS, Partner, Contributor), `trust_tier` (A, B, C, D, Blocked), `trust_score` (0-100), `rss_url`, `is_active`, `last_fetched_at`.
*   **ingestion_items:** `id`, `source_id`, `original_guid`, `title`, `description`, `body`, `author`, `url`, `status` (PendingReview, Deduplicated, CreatedDraft), `relevance_score`, `raw_payload` (JSON), `created_at`.

### 7. Monetization Context
*   **campaigns:** `id`, `advertiser_id`, `name`, `start_at`, `end_at`, `budget`, `status` (Active, Paused, Expired), `target_locations` (JSON), `target_categories` (JSON).
*   **creatives:** `id`, `campaign_id`, `placement` (InFeed, Sidebar, StickyHeader), `image_url`, `destination_url`, `views_count`, `clicks_count`.

### 8. Audit Log Context
*   **audit_logs:** `id`, `actor_id`, `action` (e.g., `content.publish`, `user.login`), `entity_name` (e.g., `contents`), `entity_id`, `old_values` (JSON), `new_values` (JSON), `ip_address`, `timestamp`.

---

## I. Permission Matrix
We enforce absolute permission-based checking over role-name assertions:

| Action / Permission | Guest | Member | Contributor | Reporter | Editor | Managing Editor | Admin |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `content.read` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `content.draft.own` | ✗ | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `content.submit.own` | ✗ | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `content.edit.any` | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ | ✓ |
| `content.review.any` | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ | ✓ |
| `content.publish` (Low-Med) | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ | ✓ |
| `content.publish` (High-Crit) | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ |
| `content.unpublish` (Emergency) | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ |
| `content.correct` | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ |
| `source.manage` | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ |
| `geography.manage` | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ | ✓ |
| `entity.manage` | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ | ✓ |
| `advertising.manage` | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ |
| `audit.view` | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ |

---

## J. Editorial Workflow State Machine

```
   [ Draft ] ──(Reporter Submit)──> [ Pending Review ]
       │                                     │
 (Editor Revision)                     (Editor Approve)
       │                                     │
       ▼                                     ▼
[ Needs Revision ]                    [ Approved ]
                                             │
                                    (Scheduled Time / Instant)
                                             │
                                             ▼
                                       [ Published ] <──(Add Correction/Fact Box)
                                             │               │
                                             │         [ Corrected ]
                                             │
                                     (Emergency Kill)
                                             │
                                             ▼
                                      [ Archived ]
```

---

## K. Ingestion & Signal Detection Pipeline

```
[ Sources Scheduled Poll ] 
        │
        ▼
[ Fetch RAW Feeds / RSS ]
        │
        ▼
[ Normalization ] ───────────> (Save Ingestion Log)
        │
        ▼
[ Duplicate Detection ] ─────> (Compare titles & Jaccard vector similarity)
        ├─ Yes ──────────────> [ Status: Deduplicated ] ──> (Discard/Link node)
        └─ No
        │
        ▼
[ Language & Type Classifier ]
        │
        ▼
[ Gemini NLP Extraction Engine ] (Analyze text using gemini-3.5-flash)
        ├── Extracts: Entities, Locations, Sentiment
        └── Generates: Smart Executive Summaries, Title & SEO options
        │
        ▼
[ Risk Scoring Layer ] ──────> (Identify Political, Financial, Health, Critical content)
        ├─ LOW / MEDIUM Risk ──> [ Status: Auto-Create Editorial CMS Draft ]
        └─ HIGH / CRITICAL ───> [ Status: Flagged for Legal / Managing Editor Review ]
```

---

## L. API Endpoints Contract (v1 Namespace)

### Authentication
*   `POST /api/v1/auth/register` - Register a reader.
*   `POST /api/v1/auth/login` - Authenticate, set secure HTTP-only cookies.
*   `POST /api/v1/auth/logout` - Clear cookies and sessions.
*   `GET /api/v1/auth/me` - Read active user profile and permissions.

### Public News Retrieval
*   `GET /api/v1/contents` - Query and filter articles (category, tag, region, sorting, cursor pagination).
*   `GET /api/v1/contents/:slug` - Read single article with expanded categories, geo tags, entity profiles, and related items.
*   `GET /api/v1/search?q=` - Full-text portal search.

### Administrative CMS (VIRALOG)
*   `POST /api/v1/admin/contents` - Create new draft.
*   `PUT /api/v1/admin/contents/:id` - Edit draft/article.
*   `POST /api/v1/admin/contents/:id/submit` - Move status to `PendingReview`.
*   `POST /api/v1/admin/contents/:id/approve` - Approve and schedule publication.
*   `POST /api/v1/admin/contents/:id/publish` - Set status to `Published`.
*   `POST /api/v1/admin/contents/:id/correct` - Post fact-check / correction.
*   `POST /api/v1/admin/contents/:id/unpublish` - Emergency rollback / archive.

### Intelligence & Sources (EVOLIS)
*   `GET /api/v1/admin/sources` - Read verified RSS sources.
*   `POST /api/v1/admin/sources` - Register custom ingestion source.
*   `POST /api/v1/admin/sources/:id/fetch` - Manually trigger background fetch and deduplication cycle.
*   `POST /api/v1/admin/intelligence/analyze-content` - Run Gemini parser to extract tags/sentiment/risk/summaries.

### Monetization & Ads
*   `GET /api/v1/ads/placement` - Fetch active creatives for a specific slot and geolocation.
*   `POST /api/v1/ads/track` - Track impressions and clicks without third-party cookie leakages.

---

## M. Queue and Background Worker Architecture
To comply with the single-port, sandboxed container lifecycle without blocking UI threads:

1.  **Polling Loop:** Standard node-interval loop running at modular offsets.
2.  **In-Memory Thread Queue:** Tasks are queued as objects containing `id`, `payload`, `attempts`, and `run_after` date, executing sequentially or concurrently with a limit of 3 concurrent worker pipelines.
3.  **Job Redundancy:** Completed jobs are added to an audit trail; failed jobs retry up to 3 times with exponential backoff (`30s`, `2m`, `5m`) before moving to the Dead-Letter Queue (DLQ).

---

## N. Search Architecture
For fast, robust querying in local development:
*   **Database Search:** Standard index-based `LIKE` search combined with structured tag, category, and geolocation filters.
*   **Relevance Weighting:** Search results match title (weight: 3.0), summary (weight: 1.5), body text (weight: 1.0), and taxonomy/entities (weight: 2.0).

---

## O. AI Intelligence Pipeline (Gemini API Integration)
Our centralized `/src/services/intelligence.service.ts` uses the `@google/genai` library server-side:

```typescript
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
});

// Using 'gemini-3.5-flash' for semantic enrichment and parsing
const response = await ai.models.generateContent({
  model: "gemini-3.5-flash",
  contents: "...",
  config: {
    responseMimeType: "application/json",
    responseSchema: {
      type: Type.OBJECT,
      properties: {
        summary: { type: Type.STRING },
        tags: { type: Type.ARRAY, items: { type: Type.STRING } },
        sentiment: { type: Type.STRING },
        entities: { type: Type.ARRAY, items: { ... } },
        geographies: { type: Type.ARRAY, items: { ... } },
        risk_level: { type: Type.STRING }
      },
      required: ["summary", "tags", "sentiment", "entities", "geographies", "risk_level"]
    }
  }
});
```

---

## P. EVOLIS Governance & Risk Control
AI is configured under strict human oversight:
*   **Zero Auto-Publishing:** Gemini-generated drafts are parked strictly as `Draft` status in the CMS, marked as `Source: Ingestion / AI-Assisted`. They must be manually reviewed and clicked `Approve` by a certified human Editor.
*   **Risk Level Triggers:**
    *   `LOW`: Simple weather, sports, or local events. (Quick approval).
    *   `MEDIUM`: General business, standard announcements. (Editor audit).
    *   `HIGH`: Financial markets, corporate disputes, municipal developments. (Senior Editor signature required).
    *   `CRITICAL`: Crime, allegations, health crises, identity sensitive data. (Managing Editor review, double verification).

---

## Q. Security Architecture
*   **Session Isolation:** Authenticated user endpoints require an `Authorization: Bearer <JWT>` header or encrypted secure Cookie.
*   **Input Cleansing:** Rich HTML article bodies are sanitized server-side (DOMPurify-like sanitization) to prevent persistent Cross-Site Scripting (XSS).
*   **SQL Injection Guard:** Relational client uses strict parameterized inputs and typed query parameters.
*   **Zero API Key Leakage:** No client-side imports or configurations reference `process.env.GEMINI_API_KEY`.
*   **Rate Limiting:** IP-based token-bucket throttler blocks malicious requests on `/api/v1/auth/login` and `/api/v1/search`.

---

## R. MVP 1.0 Implementation Backlog

### Module 1: Core Foundation & Auth
*   [ ] Configure full-stack Express server on Port 3000 proxying React Vite static distribution.
*   [ ] Implement high-fidelity relational state-persisting database engine (`src/db/client.ts`).
*   [ ] Seed database with initial categories (Nasional, Daerah, Internasional, Bisnis, Teknologi, Kesehatan, Olahraga, Hiburan), initial geographic hierarchy (Jawa Barat, Bandung, Jakarta, Surabaya), entities (person profiles, corporate landmark anchors), and 3 internal administrative roles with distinct RBAC permissions.
*   [ ] Create secure JWT authentication and route guard API.

### Module 2: CMS & Editorial Workflow (VIRALOG)
*   [ ] Build full Admin layout sidebar incorporating Dashboard overview, Article CMS, Sources feed manager, Geo/Entity management panels, and Campaigns monetizer.
*   [ ] Develop multi-block article editor (supporting paragraph, heading, fact-boxes, quotes, image attachments) with automated state-machine actions.
*   [ ] Implement human-in-the-loop review board displaying comparative revision history, internal notes, and audit timelines.

### Module 3: Public Portal (INFOBOS News Network)
*   [ ] Design gorgeous, lightweight Navy-themed homepage featuring:
    *   Dynamic breaking ticker bar.
    *   Regional dropdown city selector (Province/Regency).
    *   Interactive *INFOBOS Live Utility Panel* (Real-time Clock, Localized Weather, AQI, Currency tickers).
    *   Dynamic Search autocomplete field.
    *   Multi-grid bento zones (Hero headlines, Trending Now, Top Stories, sponsored natively labeled campaigns).
*   [ ] Build high-contrast Article detail page showing canonical breadcrumbs, estimated read times, author/editor metadata, semantic entity/location tags, related stories recommendations, and premium correction logs.
*   [ ] Create Geography/Location Landing Page (`/locations/:slug`) and Entity Profile Landing Page (`/entities/:slug`) showing active timelines and localized summaries.

### Module 4: EVOLIS Background Workers & Intelligence
*   [ ] Build live background ingestion worker parsing feed URLs, checking duplication via title Jaccard-index distance.
*   [ ] Integrate Gemini `@google/genai` parser directly into the CMS for automated summary generation, sentiment tags extraction, and risk level tagging.
*   [ ] Create fully operational ad campaign manager with native impressions and CTR tracking.

---

## S. Milestone Plan
*   **Milestone 1 (Foundation):** Monorepo directory setup, full-stack Express routing, relational DB layer creation, and seed execution. [Done in initial steps]
*   **Milestone 2 (VIRALOG Core):** Create editorial state machine, multi-block editor, and human reviews dashboard.
*   **Milestone 3 (Public Interface):** Implement Homepage, dynamic widgets, search engine, location profiles, and entity timelines.
*   **Milestone 4 (AI & Worker Engine):** RSS pipeline, duplicate checker, server-side Gemini NLP tags extractor, and campaign manager.
*   **Milestone 5 (Testing & Audit Verification):** Execution of critical tests, verifying access controls, checking for rate limits, zero key exposure, and compiling/deploying verification.

---

## T. Technical Risks & Mitigations
1.  **Sandbox CPU and Memory Allocation:** Running background workers alongside web servers and client engines can throttle performance.  
    *   *Mitigation:* Keep ingestion fetch loops non-blocking and execute at staggered intervals. Optimize local DB query lookup with automated hash indexing.
2.  **External API Network Timeouts (Gemini, Weather):** Heavy NLP analysis can lead to request bottlenecks.  
    *   *Mitigation:* Use lazy asynchronous background enrichment queues for articles. Never block the save/create action for writers; queue the tag generation asynchronously.
3.  **Duplicate Ingestions (RSS Spam):** Scraping feeds can produce duplicate canonical articles.  
    *   *Mitigation:* Enforce an exact URL hash index, alongside a Jaccard token similarity filter on titles. Mark duplicate articles as auto-linked rather than creating duplicate database rows.
