/**
 * INFOBOS Next - Database Schema Definitions
 * Includes structural interfaces for: identity, content, geography, entities, sources,
 * monetization (advertising), governance, analytics, and audits.
 */

// Identity
export interface User {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  role: string; // 'super_admin' | 'managing_editor' | 'editor' | 'reporter' | 'contributor' | 'member'
  status: 'active' | 'suspended';
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: string;
  createdAt: string;
}

// Taxonomy
export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  description?: string;
  createdAt: string;
}

export interface Topic {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
}

// Geography
export interface Location {
  id: string;
  name: string;
  slug: string;
  type: 'country' | 'province' | 'city';
  parentId: string | null;
  latitude: number;
  longitude: number;
  weatherTemp?: number;
  weatherCondition?: string;
  aqi?: number;
  alertTitle?: string;
  alertLevel?: 'none' | 'info' | 'warning' | 'critical';
  createdAt: string;
}

// Entities
export interface Entity {
  id: string;
  name: string;
  slug: string;
  type: 'person' | 'company' | 'brand' | 'government' | 'landmark' | 'event';
  description: string;
  websiteUrl?: string;
  logoUrl?: string;
  isClaimed: boolean;
  metadata?: Record<string, any>; // extra fields like headquarters, founded, political affiliation
  createdAt: string;
}

// Contents (VIRALOG Core)
export interface Content {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  summary: string;
  body: string; // Markdown or Multi-block serialized text
  contentType: 'breaking' | 'standard' | 'explainer' | 'analysis' | 'opinion' | 'fact_check' | 'video' | 'sponsored' | 'live-feed';
  status: 'draft' | 'pending_review' | 'needs_revision' | 'approved' | 'scheduled' | 'published' | 'archived';
  primaryCategoryId: string;
  sentiment: 'positive' | 'negative' | 'neutral' | 'mixed' | 'investigative';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  heroImageUrl?: string;
  authorId: string;
  editorId?: string;
  publishedAt?: string;
  scheduledAt?: string;
  sourceUrl?: string;
  originalSourceAttribution?: string;
  isSponsored: boolean;
  sponsoredCampaignId?: string;
  viewCount: number;
  readingTimeMinutes: number;
  createdAt: string;
  updatedAt: string;
}

// Version History & Compare
export interface ContentVersion {
  id: string;
  contentId: string;
  title: string;
  body: string;
  summary: string;
  modifiedBy: string; // userId
  changeSummary: string;
  createdAt: string;
}

// Fact-checking / Corrections
export interface Correction {
  id: string;
  contentId: string;
  factCheckerId: string;
  originalText: string;
  correctedText: string;
  explanation: string;
  publishedAt: string;
}

// Pivot Relational Tables
export interface ContentLocation {
  contentId: string;
  locationId: string;
  relevanceScore: number; // 0 to 100
  isPrimary: boolean;
}

export interface ContentEntity {
  contentId: string;
  entityId: string;
  relevanceScore: number; // 0 to 100
  relationType?: string; // 'subject', 'mentioned', 'quote'
}

export interface ContentTopic {
  contentId: string;
  topicId: string;
}

export interface ContentTag {
  contentId: string;
  tagId: string;
}

// Ingestion Sources
export interface IngestionSource {
  id: string;
  name: string;
  domain: string;
  type: 'rss' | 'api' | 'partner' | 'contributor';
  trustTier: 'A' | 'B' | 'C' | 'D' | 'blocked';
  trustScore: number; // 0 - 100
  rssUrl: string;
  isActive: boolean;
  lastFetchedAt?: string;
  errorCount: number;
  createdAt: string;
}

export interface IngestionItem {
  id: string;
  sourceId: string;
  originalGuid: string;
  title: string;
  description: string;
  body: string;
  author?: string;
  url: string;
  status: 'pending_review' | 'deduplicated' | 'draft_created' | 'ignored';
  relevanceScore: number;
  duplicateOfContentId?: string;
  rawPayload?: Record<string, any>;
  createdAt: string;
}

// Monetization (Direct & Native Campaigns)
export interface Advertiser {
  id: string;
  companyName: string;
  contactEmail: string;
  budgetTotal: number;
  budgetSpent: number;
  createdAt: string;
}

export interface Campaign {
  id: string;
  advertiserId: string;
  name: string;
  startAt: string;
  endAt: string;
  budget: number;
  status: 'active' | 'paused' | 'expired';
  targetLocations?: string[]; // location slugs or IDs
  targetCategories?: string[]; // category slugs or IDs
  createdAt: string;
}

export interface Creative {
  id: string;
  campaignId: string;
  placement: 'header_leaderboard' | 'after_hero' | 'in_feed' | 'sidebar' | 'article_inline';
  imageUrl: string;
  destinationUrl: string;
  altText: string;
  impressionLimit: number;
  clickLimit: number;
  impressionsCount: number;
  clicksCount: number;
  status: 'active' | 'paused';
  createdAt: string;
}

// Engagement
export interface Bookmark {
  userId: string;
  contentId: string;
  createdAt: string;
}

export interface Follow {
  userId: string;
  targetType: 'topic' | 'entity' | 'location';
  targetId: string;
  createdAt: string;
}

// Governance Audit Trails
export interface AuditLog {
  id: string;
  actorId: string;
  actorName: string;
  action: string; // e.g. 'content.create', 'content.publish', 'user.login'
  entityName: string; // e.g. 'contents'
  entityId: string;
  oldValues?: any;
  newValues?: any;
  ipAddress?: string;
  timestamp: string;
}
