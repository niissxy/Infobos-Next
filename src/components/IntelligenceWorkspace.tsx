import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, Search, Calendar, RefreshCw, Mail, ShieldAlert, MapPin, Globe, 
  Send, MessageSquare, Check, X, Shield, Info, Database, Activity, Heart, 
  ChevronDown, ChevronUp, Layers, Grid, List, Plus, Trash2, Eye, Layout, 
  Terminal, Sparkles, TrendingUp, AlertTriangle, Play, Pause, Download, 
  Share2, Copy, FileText, Bell, Users, PlusCircle, Maximize2, Minimize2, 
  Filter, BarChart2, Radio, AlertCircle, Bookmark, Cpu,
  Brain, GitBranch, Clock, Lock, Settings, Volume2, CheckCircle2, Braces, 
  History, UserPlus, FolderOpen, Sliders, ShieldCheck
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { AgentOSWorkspace } from './AgentOSWorkspace';

// ==========================================
// TYPES & INTERFACES
// ==========================================
interface Workspace {
  id: string;
  name: string;
  type: 'finance' | 'news' | 'business' | 'research' | 'monitoring' | 'executive' | 'custom';
  description: string;
  widgets: string[];
  layout: 'single' | 'split' | 'grid' | 'four';
}

interface Widget {
  id: string;
  title: string;
  category: string;
  isPinned: boolean;
  isCollapsed: boolean;
  width: '1x' | '2x' | 'full';
}

interface GraphNode {
  id: string;
  label: string;
  group: 'news' | 'entity' | 'location' | 'regulation' | 'organization';
  details: string;
}

interface GraphLink {
  source: string;
  target: string;
  label: string;
}

interface KanbanTask {
  id: string;
  title: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'todo' | 'progress' | 'review' | 'done';
}

export default function IntelligenceWorkspace() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  
  // Workspace Engine States
  const [workspaces, setWorkspaces] = useState<Workspace[]>([
    { id: 'ws-news', name: 'News & Media Intelligence', type: 'news', description: 'Monitoring berita, bulletins, agenda rilis, dan anomali tren daerah.', widgets: ['live-feed', 'alerts-setup', 'cctv-widget', 'weather-widget'], layout: 'grid' },
    { id: 'ws-finance', name: 'Finance & Markets', type: 'finance', description: 'Watchlist IHSG, valuta asing, komoditas makro, dan anomali fiskal PMK.', widgets: ['market-overview', 'watchlist-widget', 'sentiment-heatmap', 'recharts-financial'], layout: 'grid' },
    { id: 'ws-business', name: 'Business & Competitor Watch', type: 'business', description: 'Melacak pangsa pasar, persepsi merek, dan intelijen produk korporasi.', widgets: ['sentiment-heatmap', 'watchlist-widget', 'recharts-financial', 'collaboration-board'], layout: 'split' },
    { id: 'ws-research', name: 'Research & Whitepapers', type: 'research', description: 'Repositori dokumen kementerian, pilar bibliografi, dan penyusun catatan.', widgets: ['knowledge-graph', 'research-notes', 'watchlist-widget'], layout: 'split' },
    { id: 'ws-monitoring', name: 'Crisis & Sentiment Monitoring', type: 'monitoring', description: 'Pemantauan krisis regional, sentimen publik, dan integrasi webhook alerts.', widgets: ['live-feed', 'sentiment-heatmap', 'alerts-setup', 'knowledge-graph'], layout: 'grid' }
  ]);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string>('ws-news');
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [newWorkspaceType, setNewWorkspaceType] = useState<Workspace['type']>('custom');

  // Interactive Live Grid Widgets Configuration
  const [widgetRegistry, setWidgetRegistry] = useState<Record<string, Widget>>({
    'live-feed': { id: 'live-feed', title: 'Live Bulletins Feed', category: 'monitoring', isPinned: false, isCollapsed: false, width: '2x' },
    'market-overview': { id: 'market-overview', title: 'Makro & Market Overview', category: 'finance', isPinned: false, isCollapsed: false, width: '2x' },
    'watchlist-widget': { id: 'watchlist-widget', title: 'Intel Watchlist Watcher', category: 'monitoring', isPinned: false, isCollapsed: false, width: '1x' },
    'sentiment-heatmap': { id: 'sentiment-heatmap', title: 'Regional Sentiment Heatmap', category: 'analytics', isPinned: false, isCollapsed: false, width: '1x' },
    'knowledge-graph': { id: 'knowledge-graph', title: 'Evolis Connected Knowledge Graph', category: 'research', isPinned: true, isCollapsed: false, width: '2x' },
    'research-notes': { id: 'research-notes', title: 'Enterprise Notes & Draft Creator', category: 'research', isPinned: false, isCollapsed: false, width: '1x' },
    'recharts-financial': { id: 'recharts-financial', title: 'Analytics Chart Engine', category: 'analytics', isPinned: false, isCollapsed: false, width: '2x' },
    'collaboration-board': { id: 'collaboration-board', title: 'Workspace Team Kanban & Collaboration', category: 'collaboration', isPinned: false, isCollapsed: false, width: '2x' },
    'alerts-setup': { id: 'alerts-setup', title: 'Alert Dispatch Center', category: 'monitoring', isPinned: false, isCollapsed: false, width: '1x' },
    'cctv-widget': { id: 'cctv-widget', title: 'Dinas Perhubungan Live CCTV', category: 'monitoring', isPinned: false, isCollapsed: false, width: '1x' },
    'weather-widget': { id: 'weather-widget', title: 'BMKG Cuaca & Geofisika', category: 'monitoring', isPinned: false, isCollapsed: false, width: '1x' }
  });

  // Active workspace object helper
  const activeWorkspace = workspaces.find(w => w.id === activeWorkspaceId) || workspaces[0];

  // Global Command Palette & Shortcuts State
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [commandQuery, setCommandQuery] = useState('');
  const [commandIndex, setCommandIndex] = useState(0);

  // Universal Search State
  const [universalSearchQuery, setUniversalSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>(['Sri Mulyani PMK', 'Revitalisasi Gedung Sate', 'IHSG Digital', 'Kurs Rupiah']);
  const [savedSearches, setSavedSearches] = useState<string[]>(['Kajian Fiskal Jabar', 'Crisis Mitigasi Bencana']);
  const [universalSearchResults, setUniversalSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // ==========================================
  // AGENT_OS & AUTOMATION OS STATE MANAGEMENT
  // ==========================================
  // ==========================================
  // AGENT_OS & AUTOMATION OS STATE MANAGEMENT
  // ==========================================
  const [activeWorkspaceMode, setActiveWorkspaceMode] = useState<'classic' | 'agent-os'>('agent-os');
  const [selectedUserRole, setSelectedUserRole] = useState<'All' | 'Owner' | 'Super Admin' | 'Admin' | 'Editor' | 'Business' | 'Research' | 'Reporter' | 'Member' | 'Guest'>('All');
  const [agents, setAgents] = useState([
    {
      id: 'editorial',
      name: 'Editorial Agent',
      avatar: '✍️',
      role: 'Chief News Editor & Copywriter',
      skills: ['Menulis berita', 'Rewrite berita daerah', 'Proofreading artikel', 'SEO Optimization & Keywords', 'Headline drafting', 'Meta description', 'Fact checking', 'Grammar corrections', 'Translation'],
      tools: ['CMS API', 'SEO Analyzer', 'Google Translate', 'Grammar Checker'],
      memory: {
        short: 'Drafting: "Revitalisasi Koridor Heritage Gedung Sate Jabar"',
        long: 'Style guide corporate 2026, standard EEAT verified guidelines.',
        conversation: 'User requested a 300-word SEO article for Bandung heritage.',
        knowledge: 'Kliping berita Jawa Barat 2024-2026.',
        workspace: 'Workspace Jurnalistik Jabar',
        project: 'Heritage Jabar Campaign'
      },
      permissions: ['CMS_WRITE', 'CMS_PUBLISH', 'TRANSLATE_SERVICE'],
      status: 'IDLE',
      schedule: 'Event Driven',
      trigger: 'Artikel Baru Dipublish',
      kb: ['News', 'Documents', 'Forum'],
      active: true
    },
    {
      id: 'research',
      name: 'Research Agent',
      avatar: '🔬',
      role: 'Lead Academic & Policy Researcher',
      skills: ['Literature Review', 'Company Research', 'Industry Research', 'Government Research', 'Data Collection', 'Executive Report Drafting'],
      tools: ['Search Engine', 'Database Portal', 'PDF Parser', 'Arxiv API'],
      memory: {
        short: 'Extracted regulatory framework on PMK Fiskal Jabar.',
        long: 'Tax incentive index, BPS Jabar statistical models.',
        conversation: 'Provided breakdown of fiscal benefits for startup incubator.',
        knowledge: 'Drizzle ORM docs, DQL, Kemenkeu guidelines 2026.',
        workspace: 'Workspace Riset Ekonomi',
        project: 'Fiskal Digital Jabar'
      },
      permissions: ['DB_READ', 'EXT_RESEARCH'],
      status: 'MONITORING',
      schedule: 'Daily (08:00 WIB)',
      trigger: 'Perusahaan Baru Terdaftar',
      kb: ['Research', 'PDF Documents', 'API Doc'],
      active: true
    },
    {
      id: 'monitoring',
      name: 'Monitoring Agent',
      avatar: '👁️',
      role: 'Crisis & Competitor Watchdog',
      skills: ['Monitoring News', 'Monitoring Brand', 'Monitoring Competitor', 'Monitoring Keyword', 'Monitoring Government', 'Monitoring Regulation'],
      tools: ['Search Engine', 'RSS Reader', 'Webhook Dispatcher'],
      memory: {
        short: 'Keyword track: "Sri Mulyani Jabar"',
        long: 'Alert threshold levels, competitor press release index.',
        conversation: 'Sent warning on sentiment drop in Bandung West.',
        knowledge: 'Brand sentiment dictionaries v3.5.',
        workspace: 'Workspace Crisis Response',
        project: 'Brand Sentiment Monitoring'
      },
      permissions: ['NOTIFY_DISPATCH', 'TELEGRAM_PUSH'],
      status: 'LISTENING',
      schedule: 'Real-time',
      trigger: 'Keyword Muncul',
      kb: ['News', 'Forum', 'Marketplace'],
      active: true
    },
    {
      id: 'social',
      name: 'Social Media Agent',
      avatar: '📱',
      role: 'Engagement & Multi-Channel Publisher',
      skills: ['Generate Caption', 'Schedule Content', 'Cross Posting', 'Hashtag Optimization', 'Analytics Tracking', 'Best Time Posting Predictor'],
      tools: ['Social Media APIs', 'Media Library API', 'Image Generator'],
      memory: {
        short: 'Instagram carousel scheduling draft ready.',
        long: 'Hashtag efficiency matrix, historical CTR index.',
        conversation: 'Drafted captions for the digital tax announcement.',
        knowledge: 'Social engagement algorithm guidelines 2026.',
        workspace: 'Workspace Marketing Jabar',
        project: 'G-Sate Promo Campaign'
      },
      permissions: ['SOCIAL_POST', 'ANALYTICS_READ'],
      status: 'STANDBY',
      schedule: 'Weekly (Friday 15:00)',
      trigger: 'Artikel Dipublish',
      kb: ['News', 'Marketplace', 'Forum'],
      active: true
    },
    {
      id: 'marketplace',
      name: 'Marketplace Agent',
      avatar: '🛒',
      role: 'Product SEO & Pricing Optimizer',
      skills: ['Generate Listing', 'Price Suggestion', 'SEO Produk', 'Product Recommendation', 'Similar Product Analysis'],
      tools: ['Marketplace API', 'Database', 'Price Scraper'],
      memory: {
        short: 'Listing recommendation for UMKM Jabar crafts.',
        long: 'Socio-economic regional spending trends.',
        conversation: 'Suggesting price point Rp 245.000 for local batik.',
        knowledge: 'Marketplace product category tax indices.',
        workspace: 'Workspace UMKM Hub',
        project: 'Sunda Craft Listing'
      },
      permissions: ['MKTP_EDIT', 'PRICE_CONTROL'],
      status: 'IDLE',
      schedule: 'Hourly',
      trigger: 'Produk Baru',
      kb: ['Marketplace', 'Documents'],
      active: true
    },
    {
      id: 'support',
      name: 'Customer Support Agent',
      avatar: '💬',
      role: 'Support Triage & Helpdesk Resolver',
      skills: ['FAQ Matching', 'Ticket Triage', 'Live Chat Resolution', 'Escalation Workflows', 'Knowledge Base Search'],
      tools: ['CRM Access', 'Email Gateway', 'Translation API'],
      memory: {
        short: 'Active support ticket #TKT-4919 resolution.',
        long: 'Past customer dispute history guidelines.',
        conversation: 'Explained refund policy for event ticket Bandung.',
        knowledge: 'FAQ Document repository v4.2.',
        workspace: 'Workspace Support',
        project: 'Live Support Desk'
      },
      permissions: ['CRM_EDIT', 'CHAT_REPLY'],
      status: 'ONLINE',
      schedule: 'Real-time',
      trigger: 'Member Baru',
      kb: ['Forum', 'Documents', 'API'],
      active: true
    },
    {
      id: 'bi',
      name: 'Business Intelligence Agent',
      avatar: '📊',
      role: 'Corporate KPI Analyst',
      skills: ['Dashboard Insight Summarization', 'KPI Analysis', 'Financial Forecast models', 'Executive Summary writing', 'Recommendation matrix'],
      tools: ['Database', 'Analytics Engine', 'Maps API'],
      memory: {
        short: 'Consolidating Jabar economic growth projections.',
        long: 'Enterprise data analytics schema map.',
        conversation: 'Drafted quarterly executive slide commentary.',
        knowledge: 'BPS Macroeconomic charts & datasets.',
        workspace: 'Workspace Executive Dashboard',
        project: 'FDI Prediction 2026'
      },
      permissions: ['METRIC_READ', 'FORECAST_RUN'],
      status: 'ANALYZING',
      schedule: 'Monthly',
      trigger: 'Pembayaran Masuk',
      kb: ['Marketplace', 'Company', 'Government'],
      active: true
    },
    {
      id: 'geo',
      name: 'Geo Intelligence Agent',
      avatar: '🗺️',
      role: 'Spatial & GIS Analyst',
      skills: ['Area Summary generation', 'Regional Insight mapping', 'Demographic Analysis', 'Business Opportunity Zoning'],
      tools: ['Maps', 'GeoOS Core API', 'Database'],
      memory: {
        short: 'Zoning map for new industrial node Sumedang.',
        long: 'GIS regional layering maps, density models.',
        conversation: 'Identified three optimal spots for startup offices in Bandung.',
        knowledge: 'Regional spatial planning regulations Jabar.',
        workspace: 'Workspace GIS',
        project: 'Smart City Sumedang'
      },
      permissions: ['GEOMAP_ADMIN', 'SPATIAL_QUERY'],
      status: 'STANDBY',
      schedule: 'Daily (22:00 WIB)',
      trigger: 'Manual',
      kb: ['Government', 'PDF Documents', 'Knowledge Graph'],
      active: true
    },
    {
      id: 'financial',
      name: 'Financial Agent',
      avatar: '🏦',
      role: 'Macroeconomic Watch Strategist',
      skills: ['Market Summary writing', 'Economic Calendar tracking', 'Company Analysis reports', 'Financial Report auditing'],
      tools: ['Search', 'Database', 'Finance API'],
      memory: {
        short: 'Watchlist update: BI interest rate targets.',
        long: 'Corporate finance profiles, tax compliance indices.',
        conversation: 'Provided brief on regional currency impacts.',
        knowledge: 'Indonesia Stock Exchange financial statements database.',
        workspace: 'Workspace Treasury',
        project: 'Watchlist Monitor'
      },
      permissions: ['MARKET_FETCH'],
      status: 'IDLE',
      schedule: 'Hourly',
      trigger: 'Jam Tertentu',
      kb: ['Marketplace', 'Company', 'Documents'],
      active: true
    },
    {
      id: 'seo',
      name: 'SEO Agent',
      avatar: '🔍',
      role: 'Content Optimization Auditor',
      skills: ['Internal Link mapping', 'Meta Tag checks', 'Schema Markup design', 'Keyword research', 'SEO Auditing', 'Broken Link detection', 'Sitemap generation'],
      tools: ['Search API', 'SEO Checker SDK', 'CMS Integration'],
      memory: {
        short: 'Auditing 42 articles for missing meta descriptions.',
        long: 'Google search core update patterns.',
        conversation: 'Generated schema markup code for Bandung event.',
        knowledge: 'Search ranking signals v9.',
        workspace: 'Workspace SEO Hub',
        project: 'SEO Core Campaign'
      },
      permissions: ['SITEMAP_EDIT', 'REWRITE_CONTENT'],
      status: 'RUNNING',
      schedule: 'Weekly (Saturday 01:00)',
      trigger: 'Artikel Dipublish',
      kb: ['News', 'Documents'],
      active: true
    },
    {
      id: 'advertising',
      name: 'Advertising Agent',
      avatar: '📢',
      role: 'Ad Campaign Optimizer',
      skills: ['Campaign Optimization', 'Banner Rotation rules', 'CTR Analysis', 'Revenue Optimization models'],
      tools: ['AdOS Integration', 'Analytics Hub', 'CRM'],
      memory: {
        short: 'Rotating banners on West Java Tourism banner space.',
        long: 'Historical CTR performance models.',
        conversation: 'Recommended 15% bid increase on high CTR creatives.',
        knowledge: 'Regional advertisement tax guidelines.',
        workspace: 'Workspace AdOps',
        project: 'Ad Zone Placement'
      },
      permissions: ['AD_EDIT', 'CTR_READ'],
      status: 'IDLE',
      schedule: 'Hourly',
      trigger: 'Jam Tertentu',
      kb: ['Marketplace', 'Analytics'],
      active: true
    },
    {
      id: 'revenue',
      name: 'Revenue Agent',
      avatar: '💰',
      role: 'Billing & Monetization Specialist',
      skills: ['Subscription tracking', 'Upsell suggestions', 'Billing Reminder scheduling', 'Pricing Recommendations'],
      tools: ['Billing API', 'Stripe CRM', 'Email Connector'],
      memory: {
        short: 'Scheduled 12 warning reminders for active corporate subs.',
        long: 'Customer pricing tiers, contract value matrices.',
        conversation: 'Drafted WhatsApp reminder message template.',
        knowledge: 'Fiskal billing laws 2026 Jabar.',
        workspace: 'Workspace Monetization',
        project: 'Billing Cycle Reminder'
      },
      permissions: ['PAYMENT_REMIND', 'REVENUE_ANALYSIS'],
      status: 'ONLINE',
      schedule: 'Daily (09:00 WIB)',
      trigger: 'Pembayaran Masuk',
      kb: ['Marketplace', 'Documents'],
      active: true
    },
    {
      id: 'community',
      name: 'Community Agent',
      avatar: '👥',
      role: 'Moderation & Forum Warden',
      skills: ['Forum Moderation', 'Spam Detection', 'Toxic Comment Detection', 'AI Moderator responses'],
      tools: ['Community DB', 'AI Safety Filter', 'Webhook API'],
      memory: {
        short: 'Monitoring "Gedung Sate Heritage" forum thread.',
        long: 'Hate speech classifier embeddings, banned phrases list.',
        conversation: 'Flagged comment containing suspicious link.',
        knowledge: 'INFOBOS Community Guidelines v2.1.',
        workspace: 'Workspace Community Hub',
        project: 'Auto Mod Rule Engine'
      },
      permissions: ['FORUM_DELETE', 'MEMBER_WARN'],
      status: 'MONITORING',
      schedule: 'Real-time',
      trigger: 'Komentar Baru',
      kb: ['Forum', 'Documents'],
      active: true
    },
    {
      id: 'security',
      name: 'Security Agent',
      avatar: '🛡️',
      role: 'Cybersecurity Guard & SysAdmin',
      skills: ['Suspicious Login detection', 'Malware Scan execution', 'Audit Log compliance', 'Permission Review checks'],
      tools: ['System Log Analyzer', 'IP Geolocator', 'Encrypter'],
      memory: {
        short: 'Verified Sandbox container status for Webhook trigger: SAFE.',
        long: 'Suspicious IP address registries, login fail thresholds.',
        conversation: 'Audited CMS_WRITE permissions for Editorial Agent.',
        knowledge: 'Enterprise sandbox security isolation parameters.',
        workspace: 'Workspace SecOps',
        project: 'Permission Audit Trial'
      },
      permissions: ['SYS_LOCK', 'SECURITY_AUDIT'],
      status: 'PROTECTING',
      schedule: 'Real-time',
      trigger: 'Webhook',
      kb: ['Documents', 'API'],
      active: true
    },
    {
      id: 'analytics',
      name: 'Analytics Agent',
      avatar: '📈',
      role: 'Weekly & Monthly Reporter',
      skills: ['Dashboard Insight compiling', 'Weekly Report drafting', 'Monthly Report compilation', 'Executive Report summarizing'],
      tools: ['Analytics Engine', 'Database', 'PDF Writer'],
      memory: {
        short: 'Creating Weekly Executive Report draft.',
        long: 'Weekly task performance aggregates, token metrics.',
        conversation: 'Sent draft report of CPU/Sandbox execution rates.',
        knowledge: 'INFOBOS Analytics reporting standard schemas.',
        workspace: 'Workspace Reports',
        project: 'Report Compilation Hub'
      },
      permissions: ['METRIC_READ', 'REPORT_GENERATE'],
      status: 'IDLE',
      schedule: 'Weekly (Monday 00:00)',
      trigger: 'Jam Tertentu',
      kb: ['Documents', 'Marketplace', 'Forum'],
      active: true
    },
    {
      id: 'builder',
      name: 'Automation Builder Agent',
      avatar: '⚡',
      role: 'No-Code Workflow Architect',
      skills: ['Interactive visual pipeline compilation', 'Workflow health validation', 'Code sandbox configuration helper'],
      tools: ['Workflow Builder API', 'Slack SDK', 'Database'],
      memory: {
        short: 'Validating active workflow: Breaking News pipeline.',
        long: 'Integration directory index, Zap models.',
        conversation: 'Approved transition delay of 5 seconds.',
        knowledge: 'Zapier & n8n connector spec lists.',
        workspace: 'Workspace Automation',
        project: 'Visual Pipeline Design'
      },
      permissions: ['WORKFLOW_ADMIN'],
      status: 'READY',
      schedule: 'Event Driven',
      trigger: 'API',
      kb: ['API', 'Documents'],
      active: true
    }
  ]);
  const [activeAgentSubTab, setActiveAgentSubTab] = useState<'dashboard' | 'directory' | 'automation' | 'orchestrator' | 'mcp' | 'logs'>('dashboard');
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>('editorial');
  const [searchAgentQuery, setSearchAgentQuery] = useState('');
  const [marketplaceSearchQuery, setMarketplaceSearchQuery] = useState('');
  const [installedMarketplaceAgents, setInstalledMarketplaceAgents] = useState<string[]>([]);
  const [installingAgentId, setInstallingAgentId] = useState<string | null>(null);
  const [installProgress, setInstallProgress] = useState(0);

  // Workflow builder state
  const [workflowNodes, setWorkflowNodes] = useState<Array<{ id: string; type: 'trigger' | 'condition' | 'action' | 'delay' | 'approval' | 'loop' | 'notification' | 'ai' | 'end'; label: string; config: string }>>([
    { id: 'node-1', type: 'trigger', label: 'Trigger: Artikel Dipublish', config: 'Event: Artikel baru dipublish di Jurnal INFOBOS' },
    { id: 'node-2', type: 'condition', label: 'Condition: Region == Jawa Barat', config: 'If data.region == "Jawa Barat"' },
    { id: 'node-3', type: 'ai', label: 'AI Action: Generate AI Summary', config: 'Prompt: Buat ringkasan eksekutif 1 paragraf' },
    { id: 'node-4', type: 'notification', label: 'Action: Notify Telegram Channel', config: 'Channel: @infobos_jabar_alerts' },
    { id: 'node-5', type: 'end', label: 'End Pipeline', config: 'Log: Pipeline selesai di eksekusi' }
  ]);
  const [workflowTesting, setWorkflowTesting] = useState(false);
  const [activeTestStep, setActiveTestStep] = useState<number>(-1);
  const [customWorkflowName, setCustomWorkflowName] = useState('Breaking News Auto-Distribution Pipeline');

  // AI Orchestrator states
  const [orchestratorPrompt, setOrchestratorPrompt] = useState('Minta Research Agent cari info startup Bandung, kumpulkan ke SEO Agent untuk buat metatags, lalu buat berita via Editorial Agent dan posting di Social Media Agent.');
  const [isOrchestrating, setIsOrchestrating] = useState(false);
  const [orchestrationLogs, setOrchestrationLogs] = useState<Array<{ id: string; agent: string; avatar: string; message: string; timestamp: string; status: 'pending' | 'working' | 'done' }>>([]);

  // MCP Gateway Connection States
  const [mcpServers, setMcpServers] = useState<Record<string, boolean>>({
    'cms': true, 'news': true, 'knowledge-graph': true, 'geo-os': true, 'marketplace': false, 'community': false, 'revenue-os': true, 'monitoring': true, 'analytics': true, 'media-library': false
  });
  const [mcpConnectors, setMcpConnectors] = useState<Record<string, boolean>>({
    'google-workspace': false, 'slack': true, 'notion': false, 'github': true, 'discord': false, 'figma': false, 'jira': false, 'payment-gateway': true, 'weather-api': true, 'gov-opendata': true
  });

  // Simulated Audit logs & telemetry stats for AgentOS
  const [agentAuditLogs, setAgentAuditLogs] = useState([
    { id: 'log-1', timestamp: '12:35:10 WIB', agent: 'Security Agent', action: 'SANDBOX EXECUTION CHECK', detail: 'Verification of script hash for News Scraper: SUCCESS (SHA-256 ok)', status: 'info' },
    { id: 'log-2', timestamp: '12:30:45 WIB', agent: 'Editorial Agent', action: 'GENERATE METATAGS', detail: 'Generated meta keywords and schema for article #APBD-2026', status: 'success' },
    { id: 'log-3', timestamp: '12:22:15 WIB', agent: 'Monitoring Agent', action: 'REGULATORY TELEMETRY', detail: 'New PDF policy regarding digital tax detected at Menkeu cabinet', status: 'info' },
    { id: 'log-4', timestamp: '12:15:00 WIB', agent: 'Revenue Agent', action: 'SUBSCRIPTION BILLING CHECK', detail: 'Sent 14 automated reminders via WhatsApp/Email connector', status: 'success' },
    { id: 'log-5', timestamp: '11:58:30 WIB', agent: 'Community Agent', action: 'SPAM DETECTION RUN', detail: 'Flagged & quarantined 3 toxic advertisement comments in Forum Jabar', status: 'warning' },
    { id: 'log-6', timestamp: '11:45:12 WIB', agent: 'Geo Intelligence Agent', action: 'DEMOGRAPHIC QUERY', detail: 'Extracted cluster density index for Bandung Kulon region', status: 'success' }
  ]);

  // Real-Time Engine Simulated Ticks
  const [simulatedTime, setSimulatedTime] = useState<string>(new Date().toLocaleTimeString());
  const [liveEventLogs, setLiveEventLogs] = useState([
    { time: '08:42 WIB', message: 'Redaksi mendeteksi persiapan panggung revitalisasi Gedung Sate.', source: 'BPKAD Jabar', category: 'Regional' },
    { time: '09:15 WIB', message: 'Menkeu Sri Mulyani mendarat di Bandara Husein Sastranegara.', source: 'Kemenkeu', category: 'Nasional' },
    { time: '10:30 WIB', message: 'Konferensi Pers Dinas Kebudayaan Jabar terkait wisata heritage.', source: 'Disparbud', category: 'Regional' },
    { time: '11:12 WIB', message: 'Kurs Rupiah menguat tipis ke Rp 15.742 per USD.', source: 'BI', category: 'Finance' },
    { time: '12:05 WIB', message: 'Sesi diskusi panel startup digital Bandung dimulai.', source: 'Evolis Hub', category: 'Business' }
  ]);
  const [marketIndices, setMarketIndices] = useState({
    ihsg: 7184.22, ihsgDiff: 0.42,
    usdIdr: 15742.00, usdIdrDiff: -0.15,
    crudeOil: 78.45, crudeOilDiff: 1.25,
    goldPrice: 1342.50, goldPriceDiff: -0.22,
    coalPrice: 142.10, coalPriceDiff: 3.14
  });
  const [realtimeConnection, setRealtimeConnection] = useState<boolean>(true);
  const [telemetryTick, setTelemetryTick] = useState(0);
  const [flashLiveWidget, setFlashLiveWidget] = useState(false);

  // Custom Watchlists
  const [watchlists, setWatchlists] = useState<string[]>([
    'Kemenkeu Jabar', 'Gedung Sate Heritage', 'Pajak Digital PMK', 'BI Rate', 'Startup Bandung'
  ]);
  const [newWatchlistItem, setNewWatchlistItem] = useState('');
  const [selectedWatchlistItem, setSelectedWatchlistItem] = useState('Kemenkeu Jabar');

  // Crisis & General Alerts System Settings
  const [alertConfig, setAlertConfig] = useState({
    keyword: 'Sri Mulyani', geoScope: 'Jawa Barat', sentimentMin: 'negative',
    channelApp: true, channelEmail: false, channelTelegram: true, channelWhatsApp: false,
    webhookUrl: 'https://api.infobos.com/v1/webhook/alert'
  });
  const [alertsTriggered, setAlertsTriggered] = useState([
    { id: 'alt-1', type: 'crisis', msg: 'KRISIS SENTIMEN NEGATIF terdeteksi pada topik "Pajak Digital PMK" di daerah Bandung.', time: '01:14 WIB' },
    { id: 'alt-2', type: 'market', msg: 'VOLATILITAS TINGGI: Kurs USD/IDR menyentuh level psikologis baru Rp 15.750.', time: '01:32 WIB' }
  ]);
  const [newAlertKeyword, setNewAlertKeyword] = useState('');

  // SVG Knowledge Graph Selected Entity Relation details
  const [selectedGraphNode, setSelectedGraphNode] = useState<string>('gedung-sate');

  // Research Workspace States
  const [researchNotes, setResearchNotes] = useState(`### INTELLIGENCE BRIEFING: VITALISASI KORIDOR G-SATE
Penyusun: Senior Analyst Media Jabar
Status: DRAFT AUTO-SAVED

Sinergi pembangunan pariwisata heritage dengan pilar fiscal digital PMK Sri Mulyani melahirkan 3 zona strategis baru:
1. Hub Kemitraan Komunitas AI Bandung (Dago-Dipatiukur).
2. Inkubator Bisnis Wisata Heritage Terpadu (Gedung Sate).
3. Koridor Sistem Pembayaran Digital Terintegrasi (IHSG / BI Jabar).

Dampak sentimen pada masyarakat bernilai POSITIF 68% dengan tingkat risiko bencana/crisis di level LOW.`);
  const [notesStatus, setNotesStatus] = useState<'saved' | 'saving' | 'dirty'>('saved');

  // Kanban Collaboration States
  const [kanbanTasks, setKanbanTasks] = useState<KanbanTask[]>([
    { id: 'task-1', title: 'Audit Kepatuhan Cagar Budaya Gedung Sate', assignee: 'Rian Baskoro', priority: 'high', status: 'progress' },
    { id: 'task-2', title: 'Analisis Tax Incentive PMK Sri Mulyani', assignee: 'Dr. Irwan Maulana', priority: 'medium', status: 'todo' },
    { id: 'task-3', title: 'Pemetaan Sentiment Index Wisata Jabar', assignee: 'Amelia Safitri', priority: 'critical', status: 'review' },
    { id: 'task-4', title: 'Redaksi Buat Siaran Pers Revitalisasi', assignee: 'Analis Redaksi', priority: 'low', status: 'done' }
  ]);
  const [newKanbanTitle, setNewKanbanTitle] = useState('');
  const [newKanbanAssignee, setNewKanbanAssignee] = useState('Analis Redaksi');
  const [newKanbanPriority, setNewKanbanPriority] = useState<KanbanTask['priority']>('medium');

  // CCTV Node State
  const [activeCctvNode, setActiveCctvNode] = useState('simpang-dago');
  const [cctvLoading, setCctvLoading] = useState(false);

  // Offline Simulator Toggle
  const [isOffline, setIsOffline] = useState(false);

  // ==========================================
  // REFERENCE & EVENT LISTENERS
  // ==========================================
  const commandPaletteRef = useRef<HTMLDivElement>(null);

  // Keyboard Shortcuts (Ctrl+K or Cmd+K for Command Palette)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(prev => !prev);
      }
      if (e.key === 'Escape') {
        setShowCommandPalette(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Real-Time Telemetry Simulation Loops
  useEffect(() => {
    if (isOffline) return;
    
    const interval = setInterval(() => {
      setSimulatedTime(new Date().toLocaleTimeString());
      setTelemetryTick(t => t + 1);

      // Fluctuate market index numbers
      setMarketIndices(prev => {
        const diffIhsg = (Math.random() - 0.48) * 4;
        const diffUsd = (Math.random() - 0.5) * 15;
        const diffOil = (Math.random() - 0.49) * 0.5;
        return {
          ihsg: Number((prev.ihsg + diffIhsg).toFixed(2)),
          ihsgDiff: Number((prev.ihsgDiff + diffIhsg/100).toFixed(3)),
          usdIdr: Math.round(prev.usdIdr + diffUsd),
          usdIdrDiff: Number((prev.usdIdrDiff + diffUsd/150).toFixed(3)),
          crudeOil: Number((prev.crudeOil + diffOil).toFixed(2)),
          crudeOilDiff: Number((prev.crudeOilDiff + diffOil/10).toFixed(2)),
          goldPrice: Number((prev.goldPrice + (Math.random() - 0.5) * 1.5).toFixed(2)),
          goldPriceDiff: prev.goldPriceDiff,
          coalPrice: Number((prev.coalPrice + (Math.random() - 0.4) * 0.3).toFixed(2)),
          coalPriceDiff: prev.coalPriceDiff
        };
      });

      // Trigger a flash indicator
      setFlashLiveWidget(true);
      const flashTimer = setTimeout(() => setFlashLiveWidget(false), 500);

      // Simulated incoming bullet alerts periodically
      if (Math.random() > 0.8) {
        const randomTopics = [
          { msg: 'BPBD Jawa Barat keluarkan status waspada dini longsor Pangalengan.', cat: 'Crisis', src: 'BPBD' },
          { msg: 'BI Jawa Barat catat peningkatan volume QRIS wisata heritage sebesar 210%.', cat: 'Finance', src: 'BI' },
          { msg: 'Dinas Pariwisata Jabar gandeng 15 startup pengembang e-ticketing lokal.', cat: 'Business', src: 'Disparbud' },
          { msg: 'Menkeu Sri Mulyani tegaskan tidak ada kenaikan tarif PPN bagi UMKM Jabar.', cat: 'Nasional', src: 'Kemenkeu' }
        ];
        const chosen = randomTopics[Math.floor(Math.random() * randomTopics.length)];
        setLiveEventLogs(prev => [
          { time: new Date().toLocaleTimeString().slice(0, 5) + ' WIB', message: chosen.msg, source: chosen.src, category: chosen.cat },
          ...prev.slice(0, 5)
        ]);
      }

      return () => clearTimeout(flashTimer);
    }, 3000);

    return () => clearInterval(interval);
  }, [isOffline]);

  // Notes Auto-Save Simulator
  useEffect(() => {
    if (notesStatus === 'dirty') {
      setNotesStatus('saving');
      const timer = setTimeout(() => {
        setNotesStatus('saved');
        // Save layout to state
        localStorage.setItem('infobos_research_notes', researchNotes);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [researchNotes]);

  // ==========================================
  // AGENT_OS SIMULATORS (MARKETPLACE INSTALL, WORKFLOW DEBUGGER)
  // ==========================================
  // Marketplace Agent Installation Simulator
  useEffect(() => {
    if (installingAgentId === null) return;
    const interval = setInterval(() => {
      setInstallProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Add to agents directory
          const pPool = [
            { id: 'hr', name: 'HR Agent', avatar: '👥', role: 'Human Resource Recruiter', skills: ['Recruitment parsing', 'ATS optimization', 'Interview schedules', 'Employee satisfaction surveys'], tools: ['Calendar API', 'Email Gateway', 'CRM'], kb: ['Documents', 'Forum'], permissions: ['HR_READ'] },
            { id: 'legal', name: 'Legal Agent', avatar: '⚖️', role: 'Contract Compliance & Risk Analyst', skills: ['Contract Auditing', 'Non-Disclosure Agreement Drafting', 'Intellectual Property Checks', 'Regulatory Compliance Check'], tools: ['Database Portal', 'Search Engine', 'PDF Parser'], kb: ['Research', 'Documents'], permissions: ['LEGAL_READ'] },
            { id: 'procurement', name: 'Procurement Agent', avatar: '📦', role: 'Supply Chain Coordinator', skills: ['Vendor bidding', 'Purchase Orders', 'Inventory Alerts', 'Invoice Audits'], tools: ['Database', 'CRM', 'API'], kb: ['Marketplace', 'Documents'], permissions: ['PRC_READ'] },
            { id: 'export', name: 'Export Agent', avatar: '🚢', role: 'Global Logistics Handler', skills: ['Customs Clearance Doc prep', 'Shipping Route optimization', 'Harmonized Code lookup', 'Freight Rate calculator'], tools: ['Maps', 'Search', 'API'], kb: ['Government', 'Documents'], permissions: ['LOG_FETCH'] },
            { id: 'import', name: 'Import Agent', avatar: '🛃', role: 'Inbound Regulatory Specialist', skills: ['Import tax calculator', 'Compliance Review', 'Dangerous goods declaration review'], tools: ['Search', 'Database', 'Translation'], kb: ['Government', 'Documents'], permissions: ['LOG_FETCH'] },
            { id: 'education', name: 'Education Agent', avatar: '🎓', role: 'Curriculum & Courseware Advisor', skills: ['Syllabus generator', 'Student Feedback analyzer', 'Exam paper outline maker'], tools: ['Translation', 'Search', 'Database'], kb: ['Research', 'Documents'], permissions: ['EDU_READ'] },
            { id: 'healthcare', name: 'Healthcare Agent', avatar: '🏥', role: 'Medical Data Compliance Assistant', skills: ['Patient triage suggestions', 'Symptom matching guidelines finder', 'HIPAA standards verification'], tools: ['Database', 'Search', 'API'], kb: ['Research', 'Documents'], permissions: ['HLT_READ'] },
            { id: 'construction', name: 'Construction Agent', avatar: '🏗️', role: 'Civil Site Progress Tracker', skills: ['Project safety list audit', 'BoQ compliance checking', 'Vendor quotes analysis'], tools: ['Database', 'Maps', 'Search'], kb: ['Documents', 'Government'], permissions: ['CST_ADMIN'] },
            { id: 'agriculture', name: 'Agriculture Agent', avatar: '🌾', role: 'Precision Crop Advisor', skills: ['Soil quality index mapping', 'Weather forecast action planning', 'Yield target forecasting'], tools: ['Maps', 'Database', 'Search'], kb: ['Government', 'Research'], permissions: ['AGR_ADMIN'] },
            { id: 'tourism', name: 'Tourism Agent', avatar: '🗺️', role: 'Sunda Regional Itinerary Planner', skills: ['Travel itinerary mapping', 'Point-of-Interest popularity index tracking', 'Hotel pricing suggestion reviews'], tools: ['Maps', 'Database', 'Search'], kb: ['Forum', 'Marketplace', 'Government'], permissions: ['TRM_READ'] }
          ];
          const matched = pPool.find(p => p.id === installingAgentId);
          if (matched) {
            setAgents(prevAgents => {
              if (prevAgents.some(a => a.id === matched.id)) return prevAgents;
              return [...prevAgents, {
                ...matched,
                status: 'IDLE',
                schedule: 'Hourly',
                trigger: 'Manual',
                memory: {
                  short: 'Container initialized & synced.',
                  long: 'Ready for production workloads.',
                  conversation: 'No chats initiated.',
                  knowledge: 'Bootstrap guidelines v1.0.',
                  workspace: 'Custom Workspace',
                  project: 'Active Integration'
                },
                active: true
              }];
            });
            setInstalledMarketplaceAgents(prev => [...prev, matched.id]);
          }
          setInstallingAgentId(null);
          setInstallProgress(0);
          return 0;
        }
        return prev + 25; // 1 second total install time
      });
    }, 250);
    return () => clearInterval(interval);
  }, [installingAgentId]);

  // Workflow visual simulation runner
  useEffect(() => {
    if (!workflowTesting) {
      setActiveTestStep(-1);
      return;
    }

    const maxSteps = workflowNodes.length;
    let currentStep = activeTestStep === -1 ? 0 : activeTestStep;

    const runNextStep = () => {
      if (currentStep >= maxSteps) {
        setWorkflowTesting(false);
        setActiveTestStep(-1);
        return;
      }

      setActiveTestStep(currentStep);
      const currentNode = workflowNodes[currentStep];

      // If it is an approval step (human-in-the-loop), pause and wait for user trigger
      if (currentNode.type === 'approval') {
        // We pause here. The simulator will wait for manual click to proceed.
        return;
      }

      currentStep++;
      const timeoutVal = currentNode.type === 'ai' ? 1500 : 800;
      setTimeout(runNextStep, timeoutVal);
    };

    if (activeTestStep === -1) {
      runNextStep();
    }
  }, [workflowTesting, workflowNodes, activeTestStep]);

  const handleSelectTemplate = (tpl: string) => {
    if (tpl === 'news') {
      setCustomWorkflowName('Breaking News Auto-Distribution Pipeline');
      setWorkflowNodes([
        { id: 'node-1', type: 'trigger', label: 'Trigger: Artikel Dipublish', config: 'Event: Artikel baru dipublish di Jurnal INFOBOS' },
        { id: 'node-2', type: 'condition', label: 'Condition: Region == Jawa Barat', config: 'If data.region == "Jawa Barat"' },
        { id: 'node-3', type: 'ai', label: 'AI Action: Generate AI Summary', config: 'Prompt: Buat ringkasan eksekutif 1 paragraf' },
        { id: 'node-4', type: 'approval', label: 'Human-in-the-loop: Editorial Approval', config: 'Awaiting Redaktur Chief verification check' },
        { id: 'node-5', type: 'notification', label: 'Action: Notify Telegram Channel', config: 'Channel: @infobos_jabar_alerts' },
        { id: 'node-6', type: 'end', label: 'End Pipeline', config: 'Log: Pipeline selesai di eksekusi' }
      ]);
    } else if (tpl === 'seo') {
      setCustomWorkflowName('SEO Content Optimization & Audit Sync');
      setWorkflowNodes([
        { id: 'node-1', type: 'trigger', label: 'Trigger: Keyword Alert Muncul', config: 'Alert: High density keyword detected by watchdog' },
        { id: 'node-2', type: 'ai', label: 'AI Action: SEO Auditor scan', config: 'Analyze meta tags and heading hierarchy' },
        { id: 'node-3', type: 'condition', label: 'Condition: Quality Score < 80', config: 'If report.score < 80%' },
        { id: 'node-4', type: 'ai', label: 'AI Action: Content Rewrite suggest', config: 'Rewrite meta description & headings' },
        { id: 'node-5', type: 'approval', label: 'Human-in-the-loop: SEO Admin review', config: 'Require manual accept of rewrites' },
        { id: 'node-6', type: 'notification', label: 'Action: Slack notify seo team', config: 'Channel: #seo-performance-logs' },
        { id: 'node-7', type: 'end', label: 'End Pipeline', config: 'Complete sitemap ping' }
      ]);
    } else if (tpl === 'billing') {
      setCustomWorkflowName('Automated Corporate Subscriptions & Billing Tracker');
      setWorkflowNodes([
        { id: 'node-1', type: 'trigger', label: 'Trigger: Billing Cycle Date', config: 'Monthly check of subscription thresholds' },
        { id: 'node-2', type: 'condition', label: 'Condition: Days Overdue >= 7', config: 'If account.unpaid_days >= 7' },
        { id: 'node-3', type: 'notification', label: 'Action: Email warning dispatch', config: 'Stripe webhook triggers overdue warning' },
        { id: 'node-4', type: 'approval', label: 'Human-in-the-loop: Account Mgr call', config: 'Awaiting manager OK before suspension' },
        { id: 'node-5', type: 'notification', label: 'Action: Suspend access payload', config: 'Send lock request to Security Agent' },
        { id: 'node-6', type: 'end', label: 'End Pipeline', config: 'Log billing event to analytics' }
      ]);
    }
  };

  // ==========================================
  // HANDLERS
  // ==========================================
  const handleCreateWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkspaceName.trim()) return;
    const id = `ws-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newWS: Workspace = {
      id,
      name: newWorkspaceName,
      type: newWorkspaceType,
      description: `Kustom workspace bagi analisis data dan monitoring sektor ${newWorkspaceType}.`,
      widgets: ['live-feed', 'watchlist-widget', 'recharts-financial'],
      layout: 'grid'
    };
    setWorkspaces([...workspaces, newWS]);
    setActiveWorkspaceId(id);
    setNewWorkspaceName('');
  };

  const handleDeleteWorkspace = (id: string) => {
    if (workspaces.length <= 1) return;
    const remaining = workspaces.filter(w => w.id !== id);
    setWorkspaces(remaining);
    if (activeWorkspaceId === id) {
      setActiveWorkspaceId(remaining[0].id);
    }
  };

  const handleDuplicateWorkspace = (id: string) => {
    const original = workspaces.find(w => w.id === id);
    if (!original) return;
    const duplicated: Workspace = {
      ...original,
      id: `ws-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: `${original.name} (Salinan)`
    };
    setWorkspaces([...workspaces, duplicated]);
  };

  const handleAddWidget = (widgetId: string) => {
    if (activeWorkspace.widgets.includes(widgetId)) return;
    setWorkspaces(prev => prev.map(ws => {
      if (ws.id === activeWorkspaceId) {
        return { ...ws, widgets: [...ws.widgets, widgetId] };
      }
      return ws;
    }));
  };

  const handleRemoveWidgetFromWorkspace = (widgetId: string) => {
    setWorkspaces(prev => prev.map(ws => {
      if (ws.id === activeWorkspaceId) {
        return { ...ws, widgets: ws.widgets.filter(id => id !== widgetId) };
      }
      return ws;
    }));
  };

  const handleToggleWidgetPin = (widgetId: string) => {
    setWidgetRegistry(prev => ({
      ...prev,
      [widgetId]: { ...prev[widgetId], isPinned: !prev[widgetId].isPinned }
    }));
  };

  const handleToggleWidgetCollapse = (widgetId: string) => {
    setWidgetRegistry(prev => ({
      ...prev,
      [widgetId]: { ...prev[widgetId], isCollapsed: !prev[widgetId].isCollapsed }
    }));
  };

  const handleResizeWidget = (widgetId: string) => {
    setWidgetRegistry(prev => {
      const current = prev[widgetId].width;
      let next: Widget['width'] = '1x';
      if (current === '1x') next = '2x';
      else if (current === '2x') next = 'full';
      return {
        ...prev,
        [widgetId]: { ...prev[widgetId], width: next }
      };
    });
  };

  const handleUniversalSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!universalSearchQuery.trim()) return;
    setIsSearching(true);
    
    // Simulating deep catalog search across News, Regulations, Companies, Whitepapers
    setTimeout(() => {
      const mockDB = [
        { title: 'PMK Nomor 42 Tahun 2026 tentang Subsidi Fiskal Startup Daerah', category: 'Regulasi', relevance: '98%', description: 'Kertas kerja kebijakan menteri keuangan RI mengenai stimulus perpajakan bagi ekosistem startup kreatif Bandung.' },
        { title: 'Laporan Kajian Geografis Tata Kota Koridor Gedung Sate Jabar', category: 'Research', relevance: '94%', description: 'Analisis pelestarian cagar budaya dan korelasi ekonomi pariwisata daerah.' },
        { title: 'Evaluasi Sentimen Publik terhadap Revitalisasi Koridor Sejarah Bandung', category: 'Dataset', relevance: '91%', description: 'Survei digital 10.000 responden menggunakan machine learning Evolis.' },
        { title: 'Sri Mulyani resmikan bantuan modal modal ventura Jawa Barat', category: 'News', relevance: '89%', description: 'Kabar rilis modal stimulus UMKM berkolaborasi dengan jurnalisme INFOBOS.' }
      ];
      
      const filtered = mockDB.filter(item => 
        item.title.toLowerCase().includes(universalSearchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(universalSearchQuery.toLowerCase())
      );
      
      setUniversalSearchResults(filtered.length > 0 ? filtered : mockDB.slice(0, 2));
      setIsSearching(false);
      
      // Add to search history if not exists
      if (!searchHistory.includes(universalSearchQuery)) {
        setSearchHistory(prev => [universalSearchQuery, ...prev.slice(0, 4)]);
      }
    }, 700);
  };

  // Watchlist helpers
  const handleAddWatchlistItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWatchlistItem.trim() || watchlists.includes(newWatchlistItem)) return;
    setWatchlists([...watchlists, newWatchlistItem]);
    setSelectedWatchlistItem(newWatchlistItem);
    setNewWatchlistItem('');
  };

  // Alerts helpers
  const handleAddAlertConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlertKeyword.trim()) return;
    setAlertsTriggered([
      { id: `alt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`, type: 'crisis', msg: `ALERT AKTIF: Kata kunci baru "${newAlertKeyword}" dimasukkan dalam radar monitoring.`, time: 'Baru saja' },
      ...alertsTriggered
    ]);
    setNewAlertKeyword('');
  };

  // Kanban helpers
  const handleAddKanbanTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKanbanTitle.trim()) return;
    const newTask: KanbanTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title: newKanbanTitle,
      assignee: newKanbanAssignee,
      priority: newKanbanPriority,
      status: 'todo'
    };
    setKanbanTasks([...kanbanTasks, newTask]);
    setNewKanbanTitle('');
  };

  const handleMoveKanbanTask = (taskId: string, newStatus: KanbanTask['status']) => {
    setKanbanTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    }));
  };

  // AgentOS network orchestration simulator
  const handleOrchestrate = async () => {
    setIsOrchestrating(true);
    setOrchestrationLogs([]);
    
    let steps = [
      { id: '1', agent: 'Research Agent', avatar: '🔬', message: 'Membaca dokumen PDF & Open Data APBD Jawa Barat untuk mengekstrak data startup Bandung...', status: 'working' as const },
      { id: '2', agent: 'SEO Agent', avatar: '🔍', message: 'Menganalisis kepadatan kata kunci "Startup Bandung" dan merancang meta-tag, Breadcrumb markup, serta sitemap XML...', status: 'pending' as const },
      { id: '3', agent: 'Editorial Agent', avatar: '✍️', message: 'Menyusun naskah berita SEO-friendly 300 kata tentang kebangkitan UMKM & startup kreatif di Bandung...', status: 'pending' as const },
      { id: '4', agent: 'Social Media Agent', avatar: '📱', message: 'Membuat caption, hashtag optimasi, dan merancang draft posting multi-channel (Telegram, Instagram, Twitter)...', status: 'pending' as const },
      { id: '5', agent: 'Analytics Agent', avatar: '📈', message: 'Mencatat konsumsi token, menghitung latensi eksekusi sandbox, dan merangkum laporan efisiensi 99.4%...', status: 'pending' as const }
    ];

    try {
      const response = await fetch('/api/v1/intelligence/orchestrate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: orchestratorPrompt })
      });
      const data = await response.json();
      if (data.success && Array.isArray(data.steps)) {
        steps = data.steps.map((s: any) => ({
          id: s.id,
          agent: s.agent,
          avatar: s.avatar,
          message: s.message,
          status: 'pending' as const
        }));
      }
    } catch (err) {
      console.error("Gagal mengambil orkestrasi dinamis, beralih ke statis:", err);
    }

    let currentLogIndex = 0;
    
    const showNextLog = () => {
      if (currentLogIndex >= steps.length) {
        setIsOrchestrating(false);
        return;
      }

      setOrchestrationLogs(prev => {
        const updated = prev.map((item, idx) => {
          if (idx === currentLogIndex - 1) return { ...item, status: 'done' as const };
          return item;
        });

        const newLog = {
          id: steps[currentLogIndex].id,
          agent: steps[currentLogIndex].agent,
          avatar: steps[currentLogIndex].avatar,
          message: steps[currentLogIndex].message,
          timestamp: new Date().toLocaleTimeString(),
          status: 'working' as const
        };

        return [...updated, newLog];
      });

      currentLogIndex++;
      setTimeout(showNextLog, 1600);
    };

    setOrchestrationLogs([{
      id: steps[0].id,
      agent: steps[0].agent,
      avatar: steps[0].avatar,
      message: steps[0].message,
      timestamp: new Date().toLocaleTimeString(),
      status: 'working' as const
    }]);
    
    currentLogIndex = 1;
    setTimeout(showNextLog, 1600);
  };

  // Command Palette execution list
  const commands = [
    { name: 'Ganti ke Workspace: Finance & Markets', action: () => { setActiveWorkspaceId('ws-finance'); setShowCommandPalette(false); } },
    { name: 'Ganti ke Workspace: News Intelligence', action: () => { setActiveWorkspaceId('ws-news'); setShowCommandPalette(false); } },
    { name: 'Ganti ke Workspace: Business Watch', action: () => { setActiveWorkspaceId('ws-business'); setShowCommandPalette(false); } },
    { name: 'Ganti ke Workspace: Research & Notes', action: () => { setActiveWorkspaceId('ws-research'); setShowCommandPalette(false); } },
    { name: 'Ganti ke Workspace: Crisis Monitoring', action: () => { setActiveWorkspaceId('ws-monitoring'); setShowCommandPalette(false); } },
    { name: 'Picu Simulasi EMERGENCY ALERTS', action: () => { 
      setAlertsTriggered(prev => [
        { id: `alt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`, type: 'crisis', msg: 'KRISIS SKALA EMERGENCY: Penurunan mendadak sentimen publik regional Jabar hingga -35%.', time: 'Mendadak' },
        ...prev
      ]);
      setShowCommandPalette(false);
    } },
    { name: 'Layout: Split View (Two Panels)', action: () => { 
      setWorkspaces(prev => prev.map(w => w.id === activeWorkspaceId ? { ...w, layout: 'split' } : w));
      setShowCommandPalette(false);
    } },
    { name: 'Layout: Grid View Bento', action: () => { 
      setWorkspaces(prev => prev.map(w => w.id === activeWorkspaceId ? { ...w, layout: 'grid' } : w));
      setShowCommandPalette(false);
    } },
    { name: 'Tambah Widget: CCTV Dishub', action: () => { handleAddWidget('cctv-widget'); setShowCommandPalette(false); } },
    { name: 'Tambah Widget: Weather BMKG', action: () => { handleAddWidget('weather-widget'); setShowCommandPalette(false); } },
    { name: 'Reset Seluruh Workspace', action: () => { 
      localStorage.removeItem('infobos_research_notes');
      window.location.reload();
    } }
  ];

  const filteredCommands = commands.filter(c => c.name.toLowerCase().includes(commandQuery.toLowerCase()));

  // ==========================================
  // KNOWLEDGE GRAPH NODE SELECTIONS
  // ==========================================
  const nodes: GraphNode[] = [
    { id: 'gedung-sate', label: 'Gedung Sate', group: 'location', details: 'Pusat pemerintahan Pemprov Jawa Barat, sasaran revitalisasi koridor pariwisata heritage.' },
    { id: 'sri-mulyani', label: 'Sri Mulyani', group: 'entity', details: 'Menteri Keuangan Republik Indonesia, penandatangan stimulus fiskal digital PMK.' },
    { id: 'pajak-digital', label: 'Pajak Digital PMK', group: 'regulation', details: 'Aturan keringanan fiskal digital bagi startup Jabar demi kepatuhan & akselerasi pasar.' },
    { id: 'bi-jabar', label: 'Bank Indonesia Jabar', group: 'organization', details: 'Kantor Perwakilan Jawa Barat, memantau inflasi, QRIS, dan sirkulasi dana daerah.' },
    { id: 'startup-bandung', label: 'Startup Bandung', group: 'organization', details: 'Ekosistem startup digital di Kota Kembang, penerima stimulus perpajakan utama.' },
    { id: 'bpbd-jabar', label: 'BPBD Jabar', group: 'organization', details: 'Badan Penanggulangan Bencana Daerah, memitigasi risiko iklim & tanah longsor.' }
  ];

  const links: GraphLink[] = [
    { source: 'sri-mulyani', target: 'pajak-digital', label: 'menerbitkan' },
    { source: 'pajak-digital', target: 'startup-bandung', label: 'stimulasi fiskal' },
    { source: 'startup-bandung', target: 'gedung-sate', label: 'berkolaborasi' },
    { source: 'bi-jabar', target: 'startup-bandung', label: 'fasilitasi QRIS' },
    { source: 'bi-jabar', target: 'gedung-sate', label: 'kantor kordinasi' },
    { source: 'bpbd-jabar', target: 'gedung-sate', label: 'satgas mitigasi' }
  ];

  const activeNodeDetails = nodes.find(n => n.id === selectedGraphNode) || nodes[0];

  // Recharts Simulated Analytics Data
  const chartData = [
    { date: '21 Juni', sentiment: 62, volume: 4200, fiscal: 120, crisis: 10 },
    { date: '22 Juni', sentiment: 58, volume: 4500, fiscal: 150, crisis: 8 },
    { date: '23 Juni', sentiment: 67, volume: 4900, fiscal: 180, crisis: 15 },
    { date: '24 Juni', sentiment: 71, volume: 5100, fiscal: 210, crisis: 20 },
    { date: '25 Juni', sentiment: 64, volume: 5600, fiscal: 240, crisis: 25 },
    { date: '26 Juni', sentiment: 68, volume: 6200, fiscal: 280, crisis: 12 },
    { date: '27 Juni', sentiment: 75, volume: 6800, fiscal: 310, crisis: 5 }
  ];

  return (
    <div className="bg-[#0f172a] text-slate-100 min-h-screen font-sans border border-slate-800 rounded-xl overflow-hidden shadow-2xl relative text-left">
      
      {/* A. ENTERPRISE HEADER WORKSPACE BAR */}
      <div className="bg-slate-900 border-b border-slate-800 p-3 sm:px-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded">
            <Database className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-black text-white tracking-tight uppercase">Enterprise Intelligence Workspace</h1>
              <span className="text-[8px] bg-indigo-500/20 text-indigo-300 font-mono font-bold px-1.5 py-0.2 rounded border border-indigo-500/30">
                Bloomberg Tech-Inspired
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5">Sistem Integrasi Berita, Watchlist, Alert, Knowledge Graph & Analitika</p>
          </div>
        </div>

        {/* Real-time Ticker & Actions */}
        <div className="flex flex-wrap items-center gap-2 font-mono">
          {/* Offline simulator switch */}
          <button 
            onClick={() => setIsOffline(!isOffline)}
            className={`px-2.5 py-1 rounded-md text-[10px] font-bold border flex items-center gap-1.5 transition ${
              isOffline 
                ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' 
                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
            }`}
          >
            <Radio className={`h-3 w-3 ${!isOffline && 'animate-pulse'}`} />
            <span>{isOffline ? 'OFFLINE SIMULATOR' : 'REAL-TIME ONLINE'}</span>
          </button>

          {/* Time indicator */}
          <div className="bg-slate-950 border border-slate-800 px-2 py-1 rounded text-[10px] text-teal-400 font-bold tracking-wider flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 bg-teal-400 rounded-full animate-ping"></span>
            {simulatedTime}
          </div>

          {/* Command Palette Trigger Button */}
          <button 
            onClick={() => setShowCommandPalette(true)}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded border border-slate-700 font-bold text-[10px] flex items-center gap-1 transition"
          >
            <Terminal className="h-3 w-3 text-teal-400" />
            <span>Command Palette (Ctrl+K)</span>
          </button>

          {/* Workspace Mode Swapper: Classic vs AgentOS */}
          <div className="flex bg-slate-950 p-0.5 rounded-md border border-slate-800">
            <button
              onClick={() => setActiveWorkspaceMode('classic')}
              className={`px-2.5 py-1 rounded text-[10px] font-bold tracking-wider transition flex items-center gap-1 ${
                activeWorkspaceMode === 'classic'
                  ? 'bg-slate-800 text-teal-400 border border-slate-750'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layout className="h-3 w-3" />
              <span>CLASSIC BOARDS</span>
            </button>
            <button
              onClick={() => setActiveWorkspaceMode('agent-os')}
              className={`px-2.5 py-1 rounded text-[10px] font-black tracking-wider transition flex items-center gap-1.5 ${
                activeWorkspaceMode === 'agent-os'
                  ? 'bg-gradient-to-r from-amber-500/10 to-indigo-500/10 text-yellow-300 border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.15)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Brain className="h-3 w-3 text-yellow-400 animate-pulse" />
              <span>AI AGENT OS</span>
            </button>
          </div>
        </div>
      </div>

      {/* B. COMMAND PALETTE MODAL DIALOG */}
      <AnimatePresence>
        {showCommandPalette && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-start justify-center pt-20 p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="bg-slate-900 border border-slate-800 rounded-xl max-w-xl w-full p-4 text-left shadow-2xl relative space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-1.5 text-xs text-[#FFD700] font-mono font-bold">
                  <Terminal className="h-4 w-4" />
                  <span>Sistem Operasi Perintah (Enterprise Palette)</span>
                </div>
                <button 
                  onClick={() => setShowCommandPalette(false)}
                  className="text-slate-400 hover:text-white text-sm"
                >
                  &times;
                </button>
              </div>

              <div className="relative">
                <input 
                  type="text"
                  placeholder="Ketik perintah (misal: 'layout', 'finance', 'crisis', 'widget')..."
                  value={commandQuery}
                  onChange={(e) => setCommandQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500 font-mono"
                  autoFocus
                />
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
              </div>

              <div className="max-h-60 overflow-y-auto divide-y divide-slate-850 font-mono text-[10px]">
                {filteredCommands.length === 0 ? (
                  <div className="p-3 text-slate-400 text-center">Tidak ada perintah yang sesuai</div>
                ) : (
                  filteredCommands.map((cmd, idx) => (
                    <button
                      key={idx}
                      onClick={cmd.action}
                      className="w-full text-left p-2 hover:bg-teal-500/10 hover:text-white text-slate-300 flex items-center justify-between transition group rounded"
                    >
                      <span className="font-bold">{cmd.name}</span>
                      <span className="text-[8px] bg-slate-800 text-slate-400 group-hover:bg-teal-500 group-hover:text-slate-950 px-1 py-0.2 rounded font-semibold">ENTER</span>
                    </button>
                  ))
                )}
              </div>

              <div className="border-t border-slate-800 pt-2 flex items-center justify-between text-[8px] text-slate-500 font-mono">
                <span>Tekan ESC untuk membatalkan</span>
                <span>Bloomberg Terminal Inspired Engine</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {activeWorkspaceMode === 'classic' ? (
        <>
          {/* C. MULTI-WORKSPACE SELECTOR BANNER */}
      <div className="bg-slate-950 border-b border-slate-800 p-2 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          {workspaces.map((ws) => (
            <div key={ws.id} className="relative group inline-block">
              <button
                onClick={() => setActiveWorkspaceId(ws.id)}
                className={`px-3 py-1.5 rounded text-[10px] font-bold font-mono transition flex items-center gap-1.5 border uppercase ${
                  activeWorkspaceId === ws.id
                    ? 'bg-[#FFD700] border-[#FFD700] text-[#002B5B] font-black'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>{ws.name}</span>
                <span className="text-[8px] opacity-75">({ws.widgets.length} w)</span>
              </button>
              {workspaces.length > 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); handleDeleteWorkspace(ws.id); }}
                  className="absolute -top-1.5 -right-1 bg-rose-600/90 text-white rounded-full p-0.5 hover:bg-rose-500 opacity-0 group-hover:opacity-100 transition z-10"
                  title="Hapus Workspace"
                >
                  <X className="h-2 w-2" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Action controls for layouts */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button 
            onClick={() => handleDuplicateWorkspace(activeWorkspaceId)}
            className="px-2 py-1 bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white rounded border border-slate-800 text-[10px] font-bold flex items-center gap-1 transition"
            title="Duplikasi Workspace Terpilih"
          >
            <Copy className="h-3 w-3" />
            <span className="hidden sm:inline">Duplikasi</span>
          </button>

          {/* Quick Create Custom Workspace */}
          <form onSubmit={handleCreateWorkspace} className="flex items-center gap-1">
            <input 
              type="text" 
              placeholder="Workspace Baru..."
              value={newWorkspaceName}
              onChange={(e) => setNewWorkspaceName(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-white placeholder-slate-500 rounded px-2 py-1 text-[10px] focus:outline-none focus:border-[#FFD700] w-28 font-mono"
            />
            <select
              value={newWorkspaceType}
              onChange={(e) => setNewWorkspaceType(e.target.value as any)}
              className="bg-slate-900 border border-slate-800 text-white text-[10px] rounded px-1 py-1 focus:outline-none focus:border-[#FFD700]"
            >
              <option value="custom">Kustom</option>
              <option value="finance">Finance</option>
              <option value="news">News</option>
              <option value="business">Business</option>
              <option value="research">Riset</option>
            </select>
            <button 
              type="submit"
              className="p-1 bg-[#FFD700] text-[#002B5B] rounded hover:bg-[#ffe240] transition"
              title="Buat Workspace"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* D. WIDGET DECK / ADD BAR */}
      <div className="bg-slate-900/60 p-2 border-b border-slate-800 flex items-center gap-2 text-xs overflow-x-auto whitespace-nowrap scrollbar-none">
        <span className="text-[10px] text-slate-400 font-bold uppercase font-mono tracking-wider shrink-0 mr-2 flex items-center gap-1">
          <Grid className="h-3.5 w-3.5 text-[#FFD700]" />
          <span>Dek Komponen Tersedia:</span>
        </span>
        {(Object.values(widgetRegistry) as Widget[]).map((w) => {
          const isAdded = activeWorkspace.widgets.includes(w.id);
          return (
            <button
              key={w.id}
              onClick={() => isAdded ? handleRemoveWidgetFromWorkspace(w.id) : handleAddWidget(w.id)}
              className={`px-2 py-1 rounded text-[10px] font-bold font-mono transition flex items-center gap-1.5 border uppercase ${
                isAdded 
                  ? 'bg-slate-800 border-slate-700 text-slate-400 line-through' 
                  : 'bg-slate-950 border-slate-800 text-[#FFD700] hover:border-[#FFD700]'
              }`}
            >
              <span>{isAdded ? '❌' : '➕'}</span>
              <span>{w.title}</span>
            </button>
          );
        })}
      </div>

      {/* E. DEEP UNIVERSAL SEARCH ENGINE HEADER BAR */}
      <div className="bg-slate-950 border-b border-slate-800 p-3">
        <form onSubmit={handleUniversalSearchSubmit} className="flex flex-col md:flex-row gap-2">
          <div className="relative flex-grow">
            <input 
              type="text" 
              placeholder="MESIN PENCARI UNIVERSAL: Cari Laporan, Regulasi, Dokumen Kementerian, Emiten, Hub ..."
              value={universalSearchQuery}
              onChange={(e) => setUniversalSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 pl-9 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500 font-mono"
            />
            <Search className="absolute left-3 top-2 h-4.5 w-4.5 text-slate-500" />
          </div>
          <button 
            type="submit"
            className="px-4 py-1.5 bg-teal-500 text-slate-950 font-bold text-xs rounded hover:bg-teal-400 transition shrink-0"
          >
            {isSearching ? 'Mengindeks...' : 'Cari Berkas'}
          </button>
        </form>

        {/* Search Helper Tabs (History, Saved Searches, Suggestions) */}
        <div className="flex flex-wrap items-center gap-3 mt-2 text-[10px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-500">Pencarian Terbaru:</span>
            {searchHistory.map((hist, i) => (
              <span 
                key={i} 
                onClick={() => { setUniversalSearchQuery(hist); triggerSearchSimulation(hist); }}
                className="bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded cursor-pointer hover:border-teal-500 hover:text-white transition"
              >
                {hist}
              </span>
            ))}
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-500">Kueri Disimpan:</span>
            {savedSearches.map((sv, i) => (
              <span 
                key={i}
                onClick={() => { setUniversalSearchQuery(sv); triggerSearchSimulation(sv); }}
                className="bg-indigo-950/40 text-indigo-300 border border-indigo-900 px-2 py-0.5 rounded cursor-pointer hover:border-[#FFD700] transition"
              >
                ★ {sv}
              </span>
            ))}
          </div>
        </div>

        {/* Universal Search Outcome display */}
        {universalSearchResults.length > 0 && (
          <div className="mt-3 bg-slate-900 border border-slate-800 rounded-lg p-3 space-y-2 max-h-52 overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1 mb-2">
              <span className="text-[10px] font-bold text-teal-400 uppercase font-mono">Hasil Indeks Relasional</span>
              <button 
                onClick={() => setUniversalSearchResults([])}
                className="text-[10px] text-slate-400 hover:text-white"
              >
                Tutup Hasil &times;
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {universalSearchResults.map((res, i) => (
                <div key={i} className="bg-slate-950 p-2.5 border border-slate-850 rounded">
                  <div className="flex items-center justify-between text-[9px] font-mono mb-1">
                    <span className="bg-slate-800 text-slate-300 font-bold px-1.5 rounded uppercase">{res.category}</span>
                    <span className="text-[#FFD700]">Relevansi: {res.relevance}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white tracking-tight">{res.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-1 leading-normal font-sans">{res.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* F. ACTIVE WORKSYSTEM MODULE PLATFORM DOCK / ALERT STRIP */}
      {alertsTriggered.length > 0 && (
        <div className="bg-rose-500/10 border-b border-rose-500/20 px-3 py-2 text-[10px] flex items-center justify-between gap-3 text-rose-300 font-mono">
          <div className="flex items-center gap-1.5 overflow-hidden">
            <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
            <span className="font-extrabold uppercase text-rose-400 shrink-0">KRISIS PANGAN & SENTIMEN ALERTS:</span>
            <div className="cursor-pointer truncate">{alertsTriggered.map(alt => `[${alt.time}] ${alt.msg}`).join('  •  ')}</div>
          </div>
          <button 
            onClick={() => setAlertsTriggered([])}
            className="text-[9px] bg-rose-500/20 hover:bg-rose-500/40 text-rose-200 px-2 py-0.5 rounded transition shrink-0"
          >
            Tandai Selesai
          </button>
        </div>
      )}

      {/* G. MAIN MODULAR WIDGET VIEW GRID CONTAINER */}
      <div className={`p-4 gap-4 grid ${
        activeWorkspace.layout === 'single' ? 'grid-cols-1' :
        activeWorkspace.layout === 'split' ? 'grid-cols-1 lg:grid-cols-2' :
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      }`}>
        
        {activeWorkspace.widgets.length === 0 ? (
          <div className="col-span-full py-16 text-center border border-dashed border-slate-800 rounded bg-slate-950 p-6 space-y-3">
            <Layout className="h-10 w-10 text-slate-600 mx-auto" />
            <h3 className="font-display font-bold text-slate-300 text-sm uppercase">Workspace ini Kosong</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">Tambahkan widget modular yang tersedia di bar atas untuk memodulasi intelijen Anda.</p>
          </div>
        ) : (
          activeWorkspace.widgets.map((widgetId) => {
            const w = widgetRegistry[widgetId];
            if (!w) return null;

            // Compute dynamic grid classes
            let widthClass = 'col-span-1';
            if (activeWorkspace.layout !== 'single' && activeWorkspace.layout !== 'split') {
              if (w.width === '2x') widthClass = 'md:col-span-2';
              if (w.width === 'full') widthClass = 'col-span-full';
            } else if (activeWorkspace.layout === 'split') {
              if (w.width === 'full') widthClass = 'col-span-full';
            }

            return (
              <div 
                key={w.id}
                className={`bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-md flex flex-col justify-between ${widthClass} transition duration-300 hover:border-slate-700`}
              >
                {/* Widget Header */}
                <div className="bg-slate-950 p-3 border-b border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="text-xs">{w.isPinned ? '📌' : '🗃️'}</span>
                    <h3 className="font-display font-black text-xs text-white uppercase tracking-tight truncate">{w.title}</h3>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 text-[10px]">
                    <span className="text-[9px] bg-slate-900 text-slate-400 font-mono px-1.5 py-0.2 rounded font-bold border border-slate-800 uppercase tracking-wider">{w.category}</span>
                    <button 
                      onClick={() => handleToggleWidgetPin(w.id)}
                      className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                      title={w.isPinned ? 'Unpin Widget' : 'Pin Widget'}
                    >
                      ★
                    </button>
                    <button 
                      onClick={() => handleResizeWidget(w.id)}
                      className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                      title="Resize Widget (1x/2x/Full)"
                    >
                      ⚡
                    </button>
                    <button 
                      onClick={() => handleToggleWidgetCollapse(w.id)}
                      className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                    >
                      {w.isCollapsed ? '▼' : '▲'}
                    </button>
                    <button 
                      onClick={() => handleRemoveWidgetFromWorkspace(w.id)}
                      className="p-1 hover:bg-rose-500/20 hover:text-rose-400 rounded text-slate-400"
                    >
                      &times;
                    </button>
                  </div>
                </div>

                {/* Widget Body */}
                <div className={`flex-grow bg-slate-900/50 p-3.5 text-xs text-slate-300 font-sans ${w.isCollapsed ? 'hidden' : 'block'}`}>
                  
                  {/* WIDGET 1: LIVE FEED BULLETIN */}
                  {w.id === 'live-feed' && (
                    <div className="space-y-2 text-left">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[9px] bg-slate-950 text-slate-400 px-1.5 py-0.5 rounded font-bold font-mono">LIVE FEED BULLETINS</span>
                        <div className="flex items-center gap-1 text-[9px] text-slate-500 font-mono">
                          <Activity className="h-3 w-3 text-emerald-400 animate-pulse" />
                          <span>Streaming Ticks</span>
                        </div>
                      </div>
                      <div className="space-y-2 divide-y divide-slate-850 max-h-72 overflow-y-auto pr-1">
                        {liveEventLogs.map((log, i) => (
                          <div key={i} className="pt-2 flex items-start gap-2.5">
                            <span className="text-[9px] font-mono text-teal-400 font-bold shrink-0">{log.time}</span>
                            <div className="flex-grow">
                              <p className="text-[11px] leading-relaxed text-slate-200">{log.message}</p>
                              <div className="flex items-center gap-1.5 mt-1 text-[8px] font-mono text-slate-500">
                                <span>Sumber: {log.source}</span>
                                <span>•</span>
                                <span className="text-indigo-400">Kanal: {log.category}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* WIDGET 2: MARKET OVERVIEW COMPACT TICKERS */}
                  {w.id === 'market-overview' && (
                    <div className="space-y-3 text-left font-mono">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {[
                          { label: 'IHSG COMPOSITE', val: marketIndices.ihsg, diff: marketIndices.ihsgDiff, isUp: marketIndices.ihsgDiff >= 0, format: 'pt' },
                          { label: 'VALAS USD/IDR', val: marketIndices.usdIdr, diff: marketIndices.usdIdrDiff, isUp: marketIndices.usdIdrDiff <= 0, format: 'Rp' },
                          { label: 'BRENT CRUDE OIL', val: marketIndices.crudeOil, diff: marketIndices.crudeOilDiff, isUp: marketIndices.crudeOilDiff >= 0, format: '$' },
                          { label: 'EMAS LM ANTAM', val: marketIndices.goldPrice, diff: marketIndices.goldPriceDiff, isUp: marketIndices.goldPriceDiff >= 0, format: 'k' },
                          { label: 'BATU BARA ROTTERDAM', val: marketIndices.coalPrice, diff: marketIndices.coalPriceDiff, isUp: marketIndices.coalPriceDiff >= 0, format: '$' }
                        ].map((m, i) => (
                          <div key={i} className="bg-slate-950 p-2 border border-slate-850 rounded text-left relative overflow-hidden group">
                            <div className="text-[9px] text-slate-500 uppercase tracking-tight font-bold">{m.label}</div>
                            <div className="text-sm font-black text-white mt-1 flex items-baseline gap-1">
                              {m.format === 'Rp' ? 'Rp' : ''} {m.val.toLocaleString('id-ID')}
                              {m.format === 'pt' ? ' pt' : m.format === '$' ? ' /bbl' : ''}
                            </div>
                            <div className={`text-[10px] font-bold mt-1.5 flex items-center gap-1 ${m.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                              <span>{m.isUp ? '▲' : '▼'}</span>
                              <span>{m.diff > 0 ? '+' : ''}{m.diff}%</span>
                            </div>
                            <div className={`absolute top-0 right-0 w-1 h-full ${m.isUp ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                          </div>
                        ))}
                      </div>

                      {/* Interactive alert parameters selector */}
                      <div className="bg-slate-950 p-2.5 rounded border border-slate-850 text-[10px]">
                        <span className="font-extrabold uppercase text-[#FFD700] mb-1.5 block">SISTEM DISPATCH ALERTS KRISIS:</span>
                        <div className="grid grid-cols-2 gap-2 text-slate-400 text-[10px]">
                          <div>• Minimum Sentimen: <span className="text-white font-bold uppercase">{alertConfig.sentimentMin}</span></div>
                          <div>• Geo Cakupan: <span className="text-white font-bold">{alertConfig.geoScope}</span></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* WIDGET 3: INTEL WATCHLIST */}
                  {w.id === 'watchlist-widget' && (
                    <div className="space-y-3 text-left">
                      <form onSubmit={handleAddWatchlistItem} className="flex gap-1.5">
                        <input 
                          type="text" 
                          placeholder="Merek, Emiten, Hub Baru..."
                          value={newWatchlistItem}
                          onChange={(e) => setNewWatchlistItem(e.target.value)}
                          className="flex-grow bg-slate-950 border border-slate-800 text-white px-2 py-1 text-[11px] rounded font-mono focus:outline-none focus:border-teal-500"
                        />
                        <button 
                          type="submit"
                          className="px-2.5 py-1 bg-teal-500 text-slate-950 font-bold text-[11px] rounded hover:bg-teal-400 transition"
                        >
                          Pantau
                        </button>
                      </form>

                      <div className="flex flex-wrap gap-1">
                        {watchlists.map((wl, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedWatchlistItem(wl)}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono border transition ${
                              selectedWatchlistItem === wl
                                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500'
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            #{wl}
                          </button>
                        ))}
                      </div>

                      {/* Watchlist Context Detail View */}
                      <div className="bg-slate-950 p-2.5 rounded border border-slate-850 text-[10px] space-y-1.5">
                        <div className="flex items-center justify-between border-b border-slate-850 pb-1">
                          <span className="font-bold text-white uppercase font-mono">Radar Fokus: {selectedWatchlistItem}</span>
                          <span className="text-[8px] bg-emerald-500/15 text-emerald-400 px-1 rounded uppercase">Radar Aktif</span>
                        </div>
                        <p className="text-slate-400 leading-normal text-[11px]">
                          <strong>AI Summary Intel:</strong> Emiten/topik <em>{selectedWatchlistItem}</em> menunjukan peningkatan anomali rujukan positif 21% di wilayah Jawa Barat Utara dalam 24 jam terakhir. Risiko volatilitas fiskal bernilai LOW.
                        </p>
                        <div className="flex gap-2 text-[9px] text-slate-500 font-mono">
                          <span className="hover:underline cursor-pointer text-[#FFD700]">★ Timeline</span>
                          <span>•</span>
                          <span className="hover:underline cursor-pointer text-teal-400">🔍 Artikel Relasional</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* WIDGET 4: SENTIMENT HEATMAP */}
                  {w.id === 'sentiment-heatmap' && (
                    <div className="space-y-3 text-left">
                      <span className="text-[9px] bg-slate-950 text-slate-400 px-1.5 py-0.5 rounded font-bold font-mono uppercase">Tabel Panas Sentimen Regional</span>
                      <div className="space-y-2 text-[10px] font-mono">
                        {[
                          { region: 'Bandung Raya', pos: 72, neu: 18, neg: 10 },
                          { region: 'Jawa Barat Utara', pos: 58, neu: 31, neg: 11 },
                          { region: 'DKI Jakarta Pusat', pos: 64, neu: 22, neg: 14 },
                          { region: 'Banten Tangerang', pos: 49, neu: 35, neg: 16 }
                        ].map((hm, i) => (
                          <div key={i} className="space-y-1">
                            <div className="flex justify-between font-bold text-slate-200">
                              <span>{hm.region}</span>
                              <span className="text-emerald-400">{hm.pos}% Positif</span>
                            </div>
                            <div className="w-full h-2.5 bg-slate-950 rounded overflow-hidden flex">
                              <div className="h-full bg-emerald-500" style={{ width: `${hm.pos}%` }}></div>
                              <div className="h-full bg-slate-600" style={{ width: `${hm.neu}%` }}></div>
                              <div className="h-full bg-rose-500" style={{ width: `${hm.neg}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* WIDGET 5: CONNECTED KNOWLEDGE GRAPH */}
                  {w.id === 'knowledge-graph' && (
                    <div className="space-y-4 text-left">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[9px] bg-slate-950 text-slate-400 px-1.5 py-0.5 rounded font-bold font-mono">EVOLIS GRAPH VIEW</span>
                        <div className="text-[9px] text-slate-500 font-mono">D3-SVG Simulated Schema</div>
                      </div>

                      {/* SVG Canvas schema representation */}
                      <div className="relative aspect-[16/8] bg-slate-950 rounded-lg border border-slate-850 overflow-hidden flex items-center justify-center">
                        <svg className="w-full h-full" viewBox="0 0 500 250">
                          {/* Render links */}
                          {links.map((lnk, i) => {
                            const sourceNode = nodes.find(n => n.id === lnk.source);
                            const targetNode = nodes.find(n => n.id === lnk.target);
                            if (!sourceNode || !targetNode) return null;
                            
                            // Simple layout coordinates
                            const coords: Record<string, {x: number, y: number}> = {
                              'gedung-sate': { x: 250, y: 125 },
                              'sri-mulyani': { x: 100, y: 60 },
                              'pajak-digital': { x: 120, y: 180 },
                              'bi-jabar': { x: 380, y: 70 },
                              'startup-bandung': { x: 390, y: 180 },
                              'bpbd-jabar': { x: 250, y: 40 }
                            };
                            
                            const src = coords[lnk.source];
                            const tgt = coords[lnk.target];
                            if (!src || !tgt) return null;

                            return (
                              <g key={i}>
                                <line 
                                  x1={src.x} y1={src.y} 
                                  x2={tgt.x} y2={tgt.y} 
                                  stroke="#334155" strokeWidth="1.5" 
                                />
                                <text 
                                  x={(src.x + tgt.x)/2} y={(src.y + tgt.y)/2 - 3}
                                  fill="#475569" fontSize="7" fontStyle="italic" textAnchor="middle"
                                >
                                  {lnk.label}
                                </text>
                              </g>
                            );
                          })}

                          {/* Render nodes */}
                          {nodes.map((node) => {
                            const coords: Record<string, {x: number, y: number}> = {
                              'gedung-sate': { x: 250, y: 125 },
                              'sri-mulyani': { x: 100, y: 60 },
                              'pajak-digital': { x: 120, y: 180 },
                              'bi-jabar': { x: 380, y: 70 },
                              'startup-bandung': { x: 390, y: 180 },
                              'bpbd-jabar': { x: 250, y: 40 }
                            };
                            const pt = coords[node.id];
                            if (!pt) return null;

                            const isSelected = selectedGraphNode === node.id;
                            
                            // Colors based on group
                            const nodeColor = 
                              node.group === 'location' ? '#f59e0b' :
                              node.group === 'entity' ? '#10b981' :
                              node.group === 'regulation' ? '#ec4899' :
                              node.group === 'organization' ? '#6366f1' : '#64748b';

                            return (
                              <g 
                                key={node.id} 
                                className="cursor-pointer"
                                onClick={() => setSelectedGraphNode(node.id)}
                              >
                                <circle 
                                  cx={pt.x} cy={pt.y} r={isSelected ? "11" : "8"} 
                                  fill={nodeColor} 
                                  stroke={isSelected ? "#ffffff" : "transparent"} strokeWidth="1.5"
                                  className="transition-all duration-300"
                                />
                                <text 
                                  x={pt.x} y={pt.y + 19} 
                                  fill={isSelected ? "#ffd700" : "#94a3b8"} 
                                  fontSize="8" fontWeight={isSelected ? "black" : "bold"}
                                  textAnchor="middle"
                                  className="transition-all duration-300"
                                >
                                  {node.label}
                                </text>
                              </g>
                            );
                          })}
                        </svg>
                      </div>

                      {/* Selected Node Details */}
                      <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 text-[11px] leading-relaxed">
                        <div className="flex items-center gap-1.5 border-b border-slate-850 pb-1.5 mb-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-teal-400"></div>
                          <span className="font-extrabold text-[#FFD700] uppercase font-mono">{activeNodeDetails.label}</span>
                          <span className="text-[8px] bg-slate-800 text-slate-400 font-mono px-1 rounded uppercase">{activeNodeDetails.group}</span>
                        </div>
                        <p className="text-slate-300">{activeNodeDetails.details}</p>
                        <div className="mt-2 pt-2 border-t border-slate-850 text-[9px] text-slate-500 font-mono flex justify-between">
                          <span>Klik simpul bulat di atas untuk berganti sub-intel</span>
                          <span className="text-teal-400 hover:underline cursor-pointer">Sertifikasi E-E-A-T</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* WIDGET 6: RESEARCH NOTES EDITOR */}
                  {w.id === 'research-notes' && (
                    <div className="space-y-2.5 text-left font-mono text-[11px]">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] bg-slate-950 text-slate-400 px-1.5 py-0.5 rounded font-bold uppercase">Workspace Catatan Kajian</span>
                        <span className={`text-[8px] font-bold uppercase flex items-center gap-1 px-1.5 py-0.2 rounded border ${
                          notesStatus === 'saved' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' :
                          notesStatus === 'saving' ? 'text-amber-400 bg-amber-500/10 border-amber-500/30 animate-pulse' :
                          'text-slate-400 bg-slate-850 border-slate-800'
                        }`}>
                          {notesStatus === 'saved' ? 'Auto-Saved' : notesStatus === 'saving' ? 'Saving...' : 'Draft Unsaved'}
                        </span>
                      </div>
                      
                      <textarea 
                        value={researchNotes}
                        onChange={(e) => { setResearchNotes(e.target.value); setNotesStatus('dirty'); }}
                        className="w-full h-44 bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 rounded p-2 text-[10px] focus:outline-none focus:border-teal-500 leading-relaxed font-mono resize-none"
                      />

                      <div className="flex gap-2">
                        {/* Export to .txt option */}
                        <button 
                          onClick={() => {
                            const element = document.createElement("a");
                            const file = new Blob([researchNotes], {type: 'text/plain'});
                            element.href = URL.createObjectURL(file);
                            element.download = "infobos-briefing-draft.txt";
                            document.body.appendChild(element);
                            element.click();
                          }}
                          className="flex-grow py-1 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white rounded text-[10px] font-bold flex items-center justify-center gap-1 transition"
                        >
                          <Download className="h-3 w-3" />
                          <span>Ekspor Draft</span>
                        </button>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(researchNotes);
                            alert("Draft catatan berhasil disalin ke clipboard!");
                          }}
                          className="py-1 px-3 bg-indigo-950 text-indigo-300 border border-indigo-900 rounded text-[10px] font-bold hover:brightness-110 transition"
                        >
                          Salin
                        </button>
                      </div>
                    </div>
                  )}

                  {/* WIDGET 7: ANALYTICS CHART ENGINE (RECHARTS) */}
                  {w.id === 'recharts-financial' && (
                    <div className="space-y-3 text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] bg-slate-950 text-slate-400 px-1.5 py-0.5 rounded font-bold font-mono uppercase">VISUAL ANALYTICS PROJECTION</span>
                        <span className="text-[9px] text-slate-500 font-mono">Aggregated Weekly</span>
                      </div>

                      {/* Recharts Area Chart container */}
                      <div className="h-44 w-full bg-slate-950 rounded-lg p-1.5 border border-slate-850">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                            <defs>
                              <linearGradient id="colorSentiment" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                              </linearGradient>
                              <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                            <XAxis dataKey="date" stroke="#64748b" fontSize={8} />
                            <YAxis stroke="#64748b" fontSize={8} />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', fontSize: 10 }} />
                            <Area type="monotone" dataKey="sentiment" name="Sentiment %" stroke="#10b981" fillOpacity={1} fill="url(#colorSentiment)" />
                            <Area type="monotone" dataKey="volume" name="Media Volume" stroke="#6366f1" fillOpacity={1} fill="url(#colorVolume)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Descriptive Insight Box */}
                      <div className="text-[10px] leading-relaxed text-slate-400 bg-slate-950 p-2.5 rounded border border-slate-850">
                        <strong>AI Predictive Insight:</strong> Kurva sentimen digital menembus level rujukan baru sebesar 75% berkat respon hangat rilis PMK pajak startup. Target proyeksi pekan depan stabil di range 70-78%.
                      </div>
                    </div>
                  )}

                  {/* WIDGET 8: TEAM COLLABORATION KANBAN */}
                  {w.id === 'collaboration-board' && (
                    <div className="space-y-3.5 text-left font-mono text-[10px]">
                      <span className="text-[9px] bg-slate-950 text-slate-400 px-1.5 py-0.5 rounded font-bold uppercase block">Papan Kolaborasi & Alur Persetujuan Tim</span>
                      
                      {/* Form to create task */}
                      <form onSubmit={handleAddKanbanTask} className="flex flex-wrap gap-1 bg-slate-950 p-2 rounded border border-slate-850">
                        <input 
                          type="text" 
                          placeholder="Judul Tugas Tim Baru..."
                          value={newKanbanTitle}
                          onChange={(e) => setNewKanbanTitle(e.target.value)}
                          className="flex-grow bg-slate-900 border border-slate-800 text-white px-2 py-1 text-[10px] rounded focus:outline-none focus:border-teal-500"
                        />
                        <select
                          value={newKanbanAssignee}
                          onChange={(e) => setNewKanbanAssignee(e.target.value)}
                          className="bg-slate-900 border border-slate-800 text-white text-[10px] rounded px-1.5 py-1 focus:outline-none"
                        >
                          <option value="Rian Baskoro">Rian B</option>
                          <option value="Dr. Irwan Maulana">Dr. Irwan</option>
                          <option value="Amelia Safitri">Amelia S</option>
                          <option value="Analis Redaksi">Analis R</option>
                        </select>
                        <select
                          value={newKanbanPriority}
                          onChange={(e) => setNewKanbanPriority(e.target.value as any)}
                          className="bg-slate-900 border border-slate-800 text-white text-[10px] rounded px-1.5 py-1 focus:outline-none"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="critical">Critical</option>
                        </select>
                        <button 
                          type="submit"
                          className="px-2.5 py-1 bg-indigo-500 text-white font-bold rounded hover:bg-indigo-400 transition"
                        >
                          + Tugas
                        </button>
                      </form>

                      {/* Kanban Columns */}
                      <div className="grid grid-cols-2 gap-2 text-[9px]">
                        {(['todo', 'progress', 'review', 'done'] as const).map((col) => {
                          const colTasks = kanbanTasks.filter(t => t.status === col);
                          return (
                            <div key={col} className="bg-slate-950 p-2 border border-slate-850 rounded">
                              <div className="font-extrabold uppercase text-[#FFD700] border-b border-slate-850 pb-1 mb-1.5 flex justify-between">
                                <span>{col}</span>
                                <span className="opacity-75">({colTasks.length})</span>
                              </div>
                              <div className="space-y-1.5 max-h-44 overflow-y-auto">
                                {colTasks.map((t) => (
                                  <div key={t.id} className="bg-slate-900 p-1.5 border border-slate-800 rounded relative group">
                                    <div className={`absolute top-0 left-0 w-1 h-full ${
                                      t.priority === 'critical' ? 'bg-rose-500' :
                                      t.priority === 'high' ? 'bg-amber-500' :
                                      t.priority === 'medium' ? 'bg-indigo-500' : 'bg-slate-500'
                                    }`}></div>
                                    <div className="pl-1.5">
                                      <h5 className="font-bold text-slate-100 line-clamp-2">{t.title}</h5>
                                      <div className="text-[8px] text-slate-500 mt-1 flex justify-between">
                                        <span>Assignee: {t.assignee}</span>
                                        <span className="uppercase text-[#FFD700]">{t.priority}</span>
                                      </div>
                                      
                                      {/* Quick status transition dropdown in-place */}
                                      <div className="mt-1.5 pt-1.5 border-t border-slate-850 flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition duration-150">
                                        <button 
                                          onClick={() => handleMoveKanbanTask(t.id, 'todo')}
                                          className="text-[7px] bg-slate-950 hover:bg-slate-800 px-1 rounded font-bold"
                                        >
                                          Todo
                                        </button>
                                        <button 
                                          onClick={() => handleMoveKanbanTask(t.id, 'progress')}
                                          className="text-[7px] bg-slate-950 hover:bg-slate-800 px-1 rounded font-bold"
                                        >
                                          Prog
                                        </button>
                                        <button 
                                          onClick={() => handleMoveKanbanTask(t.id, 'review')}
                                          className="text-[7px] bg-slate-950 hover:bg-slate-800 px-1 rounded font-bold"
                                        >
                                          Rev
                                        </button>
                                        <button 
                                          onClick={() => handleMoveKanbanTask(t.id, 'done')}
                                          className="text-[7px] bg-slate-950 hover:bg-slate-800 px-1 rounded font-bold"
                                        >
                                          Done
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* WIDGET 9: ALERTS DISPATCH SETUP */}
                  {w.id === 'alerts-setup' && (
                    <div className="space-y-3 text-left font-mono text-[10px]">
                      <span className="text-[9px] bg-slate-950 text-slate-400 px-1.5 py-0.5 rounded font-bold uppercase">Setup Webhook & Saluran Aliansi</span>
                      
                      <form onSubmit={handleAddAlertConfig} className="space-y-2 bg-slate-950 p-2.5 rounded border border-slate-850">
                        <div>
                          <label className="block text-slate-500 text-[9px] mb-0.5">Kata Kunci Utama:</label>
                          <input 
                            type="text" 
                            placeholder="Contoh: Sri Mulyani, Pajak PMK..."
                            value={newAlertKeyword}
                            onChange={(e) => setNewAlertKeyword(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 text-white px-2 py-1 text-[10px] rounded focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-500 text-[9px] mb-0.5">Destinasi Sinkronisasi Webhook URL:</label>
                          <input 
                            type="text" 
                            value={alertConfig.webhookUrl}
                            onChange={(e) => setAlertConfig({ ...alertConfig, webhookUrl: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-800 text-teal-400 px-2 py-1 text-[9px] rounded focus:outline-none"
                          />
                        </div>

                        {/* Dispatch toggle check */}
                        <div className="grid grid-cols-2 gap-2 text-[8px] pt-1 border-t border-slate-850">
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={alertConfig.channelTelegram} 
                              onChange={(e) => setAlertConfig({ ...alertConfig, channelTelegram: e.target.checked })}
                            />
                            <span>Mock Telegram Bot API</span>
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={alertConfig.channelWhatsApp} 
                              onChange={(e) => setAlertConfig({ ...alertConfig, channelWhatsApp: e.target.checked })}
                            />
                            <span>Mock WhatsApp Gateway</span>
                          </label>
                        </div>

                        <button 
                          type="submit"
                          className="w-full py-1 bg-teal-500 text-slate-950 font-bold text-[10px] rounded hover:brightness-110 transition"
                        >
                          Simpan Jalur Dispatc &rarr;
                        </button>
                      </form>
                    </div>
                  )}

                  {/* WIDGET 10: DISHUB LIVE CCTV */}
                  {w.id === 'cctv-widget' && (
                    <div className="space-y-3 text-left font-mono text-[10px]">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] bg-slate-950 text-slate-400 px-1.5 py-0.5 rounded font-bold uppercase">Dishub CCTV Bandung Raya</span>
                        <span className="text-emerald-400 font-bold">● LIVE FEED</span>
                      </div>

                      <div className="flex gap-1">
                        {['simpang-dago', 'simpang-pasteur', 'flyover-pasupati'].map((node) => (
                          <button
                            key={node}
                            onClick={() => {
                              setActiveCctvNode(node);
                              setCctvLoading(true);
                              setTimeout(() => setCctvLoading(false), 600);
                            }}
                            className={`px-2 py-0.5 rounded text-[9px] border transition uppercase ${
                              activeCctvNode === node 
                                ? 'bg-indigo-500/25 border-indigo-400 text-indigo-200 font-bold' 
                                : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-white'
                            }`}
                          >
                            {node.replace('-', ' ')}
                          </button>
                        ))}
                      </div>

                      {/* CCTV Simulation Image Canvas */}
                      <div className="relative aspect-video w-full bg-slate-950 rounded border border-slate-850 overflow-hidden flex items-center justify-center">
                        {cctvLoading ? (
                          <div className="text-slate-500 text-[10px]">Menyambungkan streaming CCTV...</div>
                        ) : (
                          <>
                            <img 
                              src={
                                activeCctvNode === 'simpang-dago' ? 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400' :
                                activeCctvNode === 'simpang-pasteur' ? 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=400' :
                                'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400'
                              }
                              alt="CCTV stream simulation"
                              className="w-full h-full object-cover opacity-60"
                            />
                            <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-xs text-[8px] text-white px-1.5 py-0.2 rounded">
                              NODE: {activeCctvNode.toUpperCase()} • RES: 720p • FPS: 24
                            </div>
                            <div className="absolute bottom-2 right-2 bg-rose-600 text-white text-[8px] px-1 py-0.2 rounded font-extrabold animate-pulse">
                              REC
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* WIDGET 11: BMKG WEATHER & GEOPHYSICS */}
                  {w.id === 'weather-widget' && (
                    <div className="space-y-3 text-left font-mono text-[10px]">
                      <span className="text-[9px] bg-slate-950 text-slate-400 px-1.5 py-0.5 rounded font-bold uppercase">Pantauan BMKG Iklim & Kegempaan</span>
                      
                      <div className="bg-slate-950 p-2.5 rounded border border-slate-850 space-y-2">
                        <div className="flex justify-between items-center text-slate-200">
                          <span className="font-bold text-white text-xs">Kota Bandung Raya:</span>
                          <span className="text-[#FFD700] text-xs font-bold">26°C / Hujan Ringan</span>
                        </div>
                        <div className="text-[9px] text-slate-400 leading-normal">
                          <strong>Anomali Cuaca Jabar:</strong> Tekanan udara rendah terpantau di Samudera Hindia memicu curah hujan sedang pada sore hari di koridor Bandung Raya. Tingkat waspada kebencanaan: LOW.
                        </div>
                        <div className="pt-1.5 border-t border-slate-850 text-[8px] text-slate-500 flex justify-between">
                          <span>Update: 15 menit lalu</span>
                          <span className="text-emerald-400 font-bold">Status: Aman</span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            );
          })
        )}

      </div>
        </>
      ) : (
        <AgentOSWorkspace
          agents={agents}
          setAgents={setAgents}
          activeAgentSubTab={activeAgentSubTab}
          setActiveAgentSubTab={setActiveAgentSubTab}
          selectedAgentId={selectedAgentId}
          setSelectedAgentId={setSelectedAgentId}
          searchAgentQuery={searchAgentQuery}
          setSearchAgentQuery={setSearchAgentQuery}
          marketplaceSearchQuery={marketplaceSearchQuery}
          setMarketplaceSearchQuery={setMarketplaceSearchQuery}
          installedMarketplaceAgents={installedMarketplaceAgents}
          setInstalledMarketplaceAgents={setInstalledMarketplaceAgents}
          installingAgentId={installingAgentId}
          setInstallingAgentId={setInstallingAgentId}
          installProgress={installProgress}
          setInstallProgress={setInstallProgress}
          workflowNodes={workflowNodes}
          setWorkflowNodes={setWorkflowNodes}
          workflowTesting={workflowTesting}
          setWorkflowTesting={setWorkflowTesting}
          activeTestStep={activeTestStep}
          setActiveTestStep={setActiveTestStep}
          customWorkflowName={customWorkflowName}
          setCustomWorkflowName={setCustomWorkflowName}
          orchestratorPrompt={orchestratorPrompt}
          setOrchestratorPrompt={setOrchestratorPrompt}
          isOrchestrating={isOrchestrating}
          setIsOrchestrating={setIsOrchestrating}
          orchestrationLogs={orchestrationLogs}
          setOrchestrationLogs={setOrchestrationLogs}
          mcpServers={mcpServers}
          setMcpServers={setMcpServers}
          mcpConnectors={mcpConnectors}
          setMcpConnectors={setMcpConnectors}
          agentAuditLogs={agentAuditLogs}
          setAgentAuditLogs={setAgentAuditLogs}
          selectedUserRole={selectedUserRole}
          setSelectedUserRole={setSelectedUserRole}
          handleOrchestrate={handleOrchestrate}
          handleSelectTemplate={handleSelectTemplate}
        />
      )}

      {/* H. SYSTEM TELEMETRY AUDIT TRAIL FOOTER */}
      <div className="bg-slate-950 border-t border-slate-800 p-3 text-[10px] font-mono text-slate-500 flex flex-col md:flex-row md:items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-teal-400">● INTEL OS ACTIVE</span>
          <span>•</span>
          <span>Widget Engine v2.4</span>
          <span>•</span>
          <span>D3 Knowledge Graph Sync</span>
          <span>•</span>
          <span>Sertifikasi E-E-A-T Google Verified</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Caching Status: <strong className="text-white">LOCAL-STORAGE SYNCHRONIZED</strong></span>
          <span>•</span>
          <button 
            onClick={() => {
              setWorkspaces(prev => prev.map(w => w.id === activeWorkspaceId ? { ...w, widgets: ['live-feed', 'market-overview', 'watchlist-widget', 'sentiment-heatmap', 'knowledge-graph', 'recharts-financial', 'collaboration-board'] } : w));
              alert("Tata letak seluruh modul berhasil direstorasi ke setelan pabrik!");
            }}
            className="text-[9px] text-[#FFD700] hover:underline"
          >
            Restorasi Tata Letak Default
          </button>
        </div>
      </div>

    </div>
  );

  // Helper local search trigger
  function triggerSearchSimulation(q: string) {
    setIsSearching(true);
    setTimeout(() => {
      const mockDB = [
        { title: `PMK Fiskal Terpadu mengenai ${q}`, category: 'Regulasi', relevance: '99%', description: 'Dokumen kerja legal kementerian keuangan RI terkait penanganan komoditas.' },
        { title: `Kajian Publik Komprehensif: ${q}`, category: 'Research', relevance: '92%', description: 'Riset taksonomi jurnalisme berskala mikro Jawa Barat.' }
      ];
      setUniversalSearchResults(mockDB);
      setIsSearching(false);
    }, 600);
  }
}
