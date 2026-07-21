import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Homepage from './components/Homepage';
import ArticleDetail from './components/ArticleDetail';
import Hubs from './components/Hubs';
import AdminPanel from './components/AdminPanel';
import PremiumTrialShowcase from './components/PremiumTrialShowcase';

// Media Intelligence Hubs
import VideoHub from './components/VideoHub';
import ShortVideoHub from './components/ShortVideoHub';
import PodcastCenter from './components/PodcastCenter';
import DocumentCenter from './components/DocumentCenter';
import MediaAcademy from './components/MediaAcademy';
import TechnicalTutorials from './components/TechnicalTutorials';
import DeveloperDocs from './components/DeveloperDocs';
import GeneralFAQ from './components/GeneralFAQ';
import GalleryCenter from './components/GalleryCenter';
import InteractiveData from './components/InteractiveData';
import EventCenter from './components/EventCenter';
import ChannelCenter from './components/ChannelCenter';
import AdOSPortal from './components/AdOSPortal';
import SEOHub from './components/SEOHub';
import AdZone from './components/AdZone';
import MediaOSHub from './components/MediaOSHub';
import GeoIntelligenceHub from './components/GeoIntelligenceHub';
import IntelligenceWorkspace from './components/IntelligenceWorkspace';
import RevenueOS from './components/RevenueOS';
import FinanceNews from './components/FinanceNews';
import FinancialIntelligence from './components/FinancialIntelligence';
import CommunityMarketplaceHub, { initializeSystemData } from './components/CommunityMarketplaceHub';
import WidgetLibraryCMS from './components/WidgetLibraryCMS';
import FeatureExplorer from './components/FeatureExplorer';
import SystemExplorer from './components/SystemExplorer';
import SocialMediaHub from './components/SocialMediaHub';
import Sidebar from './components/Sidebar';
import PopUpWidget from './components/PopUpWidget';
import BottomNavigation from './components/BottomNavigation';
import { motion, AnimatePresence } from 'motion/react';
import { AuthProvider } from './context/AuthContext';

// RBAC & PBAC Enforced Portals
import PortalSwitcher, { PORTAL_ACCESS_MAPPING } from './components/PortalSwitcher';
import MemberPortal from './components/MemberPortal';
import CreatorPortal from './components/CreatorPortal';
import PartnerOS from './components/PartnerOS';
import PortalShell from './components/PortalShell';
import { 
  ReporterPortal, EditorPortal, AdvertiserPortal, SalesPortal, 
  BusinessPortal, ResearchPortal, MonitoringPortal, CMSPortal, SuperAdminPortal,
  DeveloperPortal, FinancePortal, GovernmentPortal
} from './components/EnterprisePortals';
import {
  MarketplacePortal, CommunityPortal, CustomerSupportPortal, ModeratorPortal
} from './components/NewEnterprisePortals';
import NavigationExplorer from './components/NavigationExplorer';

import { FEATURE_REGISTRY, getProcessedSitemapGroups } from './data/featureRegistry';
import { Compass, Search, Calendar, RefreshCw, Mail, ShieldAlert, MapPin, Globe, Send, MessageSquare, Check, X, Shield, Info, Database, Activity, Heart, ChevronDown, ChevronUp, Tv, Headphones, CreditCard, Users, Map, Sparkles, Cpu, Layers, Tag, Briefcase, Newspaper, Terminal, Calculator } from 'lucide-react';

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  // Navigation & Router states
  const [currentTab, setCurrentTab] = useState('home');
  const [activeArticleSlug, setActiveArticleSlug] = useState<string | null>(null);
  
  const [activeHubSlug, setActiveHubSlug] = useState<string | null>(null);
  const [activeHubType, setActiveHubType] = useState<'location' | 'entity' | null>(null);

  const [searchVal, setSearchVal] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchFilter, setSearchFilter] = useState<'all' | 'article' | 'location' | 'entity' | 'category' | 'topic_tag' | 'correction' | 'marketplace' | 'jobs'>('all');
  const [marketplaceInitialTab, setMarketplaceInitialTab] = useState<'dashboard' | 'forum' | 'marketplace' | 'directory' | 'jobs' | 'chat'>('dashboard');

  // Footer & Sitemap Interactive states
  const [activeFooterModal, setActiveFooterModal] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSent, setContactSent] = useState(false);

  // New Interactive Corporate States
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  const [partnerName, setPartnerName] = useState('');
  const [partnerCompany, setPartnerCompany] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  const [partnerType, setPartnerType] = useState('Sindikasi Media');
  const [partnerProposal, setPartnerProposal] = useState('');
  const [partnerSent, setPartnerSent] = useState(false);

  const [advName, setAdvName] = useState('');
  const [advEmail, setAdvEmail] = useState('');
  const [advPlacement, setAdvPlacement] = useState('Homepage Banner');
  const [advImpressions, setAdvImpressions] = useState(50000);
  const [advSent, setAdvSent] = useState(false);

  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantCvUrl, setApplicantCvUrl] = useState('');
  const [applicantSent, setApplicantSent] = useState(false);

  const [showFullSitemap, setShowFullSitemap] = useState(false);

  // Topic Preferences State with LocalStorage sync
  const [topicPreferences, setTopicPreferences] = useState<string[]>(() => {
    const saved = localStorage.getItem('infobos_topic_preferences');
    return saved ? JSON.parse(saved) : [];
  });

  const handleSaveTopicPreferences = (preferences: string[]) => {
    setTopicPreferences(preferences);
    localStorage.setItem('infobos_topic_preferences', JSON.stringify(preferences));
  };

  // Global Escrow state shared between CommunityMarketplaceHub and RevenueOS
  const [escrowTransactions, setEscrowTransactions] = useState<any[]>([
    { id: 'esc-1', itemTitle: 'Alat Ekstraksi Minyak Atsiri', amount: 22500000, status: 'DITAHAN', seller: 'Atsiri Tech Indonesia', date: '30 Juni 2026' },
    { id: 'esc-2', itemTitle: 'Sewa Drone Pertanian DJI Agras T40 - PT Tani Maju', amount: 4500000, seller: 'Cirebon Drone Rental', date: '15/07/2026', status: 'DITAHAN' },
    { id: 'esc-3', itemTitle: 'Pembelian Dataset Spasial Tata Guna Lahan Bandung', amount: 18200000, seller: 'Geo-Spasial Analytics', date: '14/07/2026', status: 'DIKIRIM' }
  ]);

  // Authentication states with localStorage sync
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string>('');

  // Admin Login specific states
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminAuthError, setAdminAuthError] = useState('');
  const [adminAuthLoading, setAdminAuthLoading] = useState(false);

  // Active portal & Simulated role states
  const [activePortal, setActivePortal] = useState<string>('public');
  const [simulatedRole, setSimulatedRole] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isExplorerOpen, setIsExplorerOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  const [isWidgetOpen, setIsWidgetOpen] = useState<boolean>(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleWidgetToggle = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsWidgetOpen(!!customEvent.detail?.isOpen);
    };
    const handleAiToggle = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsAiAssistantOpen(!!customEvent.detail?.isOpen);
    };
    const handleMenuToggle = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsMobileMenuOpen(!!customEvent.detail?.isOpen);
    };

    window.addEventListener('infobos-widget-toggle', handleWidgetToggle);
    window.addEventListener('infobos-ai-toggle', handleAiToggle);
    window.addEventListener('infobos-menu-toggle', handleMenuToggle);

    return () => {
      window.removeEventListener('infobos-widget-toggle', handleWidgetToggle);
      window.removeEventListener('infobos-ai-toggle', handleAiToggle);
      window.removeEventListener('infobos-menu-toggle', handleMenuToggle);
    };
  }, []);

  const effectiveToken = token || (
    simulatedRole === 'reporter' ? 'session-reporter' :
    simulatedRole === 'editor' ? 'session-editor' :
    (simulatedRole === 'super_admin' || simulatedRole === 'managing_editor' || simulatedRole === 'cms') ? 'session-admin' :
    (user?.role === 'reporter' ? 'session-reporter' :
     user?.role === 'managing_editor' ? 'session-editor' :
     user?.role === 'super_admin' ? 'session-admin' : '')
  );
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('infobos_theme');
    return saved === 'dark';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('infobos_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('infobos_theme', 'light');
    }
  }, [isDark]);

  // 1. Parse initial path and setup routing
  useEffect(() => {
    if (window.location.hash === '#premium' || window.location.hash.startsWith('#premium')) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    initializeSystemData();
    const path = window.location.pathname;
    
    const policyTabs = [
      'newsroom', 'editorial-team', 'editorial-guidelines', 'fact-checking-policy', 
      'corrections-policy', 'ethics-policy', 'source-verification-policy', 'transparency-report', 
      'about-infobos', 'contact-newsroom', 'press-center', 'rss-feed', 'news-archive', 
      'breaking-news', 'live-news', 'trending-news', 'latest-news',
      'dewan-pers', 'pedoman-media', 'hak-jawab', 'fakta-integritas', 'kontak',
      'saas-pricing', 'partnership-program', 'advertise-with-us', 'careers'
    ];
    
    const matchPolicy = policyTabs.find(p => path === '/' + p);
    if (matchPolicy) {
      setActiveFooterModal(matchPolicy);
      return;
    }

    // Check if it is an article path: /news/:category/:slug
    const articleMatch = path.match(/^\/news\/([^/]+)\/([^/]+)$/);
    if (articleMatch) {
      const categorySlug = articleMatch[1];
      const articleSlug = articleMatch[2];
      
      if (categorySlug === 'category') {
        setCurrentTab('home');
        handleNavigate(articleSlug, 'category');
      } else {
        setActiveArticleSlug(articleSlug);
      }
    } else if (path.startsWith('/hub/')) {
      const parts = path.split('/');
      if (parts.length >= 4) {
        setActiveHubType(parts[2] as 'location' | 'entity');
        setActiveHubSlug(parts[3]);
      }
    } else if (path !== '/' && path !== '') {
      const tab = path.replace(/^\/|\/$/g, '');
      if (['home', 'feature-explorer', 'community-marketplace', 'marketplace-hub', 'jobs-hub', 'forum-hub', 'business-directory', 'brand-directory', 'product-directory', 'organization-directory', 'author-directory', 'event-directory', 'widget-cms', 'intelligence-workspace', 'revenue-os', 'finance-news', 'financial-intelligence', 'admin', 'regional', 'nasional', 'internasional', 'business', 'technology', 'ai-data', 'sports', 'lifestyle', 'investigasi', 'analisis', 'riset-insight', 'live-feed', 'geo-intelligence-os', 'seo-hub', 'mediaos', 'social-media-hub', 'system-explorer'].includes(tab)) {
        setCurrentTab(tab);
      }
    }
  }, []);

  // 2. Synchronize Browser URL when React state changes (permalinks structure /news/category/article-slug)
  useEffect(() => {
    if (activeFooterModal) {
      const newPath = `/${activeFooterModal}`;
      if (window.location.pathname !== newPath) {
        window.history.pushState({ type: 'policy', slug: activeFooterModal }, '', newPath);
      }
    } else if (activeArticleSlug) {
      fetch(`/api/v1/contents/${activeArticleSlug}`)
        .then(res => res.json())
        .then(resData => {
          if (resData.content) {
            const catSlug = resData.content.categorySlug || resData.content.categoryName?.toLowerCase().replace(/\s+/g, '-') || 'news';
            const newPath = `/news/${catSlug}/${activeArticleSlug}`;
            if (window.location.pathname !== newPath) {
              window.history.pushState({ type: 'article', slug: activeArticleSlug }, '', newPath);
            }
          }
        })
        .catch(() => {
          const newPath = `/news/news/${activeArticleSlug}`;
          if (window.location.pathname !== newPath) {
            window.history.pushState({ type: 'article', slug: activeArticleSlug }, '', newPath);
          }
        });
    } else if (activeHubSlug && activeHubType) {
      const newPath = `/hub/${activeHubType}/${activeHubSlug}`;
      if (window.location.pathname !== newPath) {
        window.history.pushState({ type: activeHubType, slug: activeHubSlug }, '', newPath);
      }
    } else if (currentTab && currentTab !== 'home') {
      const newPath = `/${currentTab}`;
      if (window.location.pathname !== newPath && !newPath.includes('//')) {
        window.history.pushState({ type: 'tab', slug: currentTab }, '', newPath);
      }
    } else {
      const newPath = '/';
      if (window.location.pathname !== newPath) {
        window.history.pushState({ type: 'home' }, '', newPath);
      }
    }
  }, [activeArticleSlug, activeHubSlug, activeHubType, currentTab, activeFooterModal]);

  // 3. Listen to PopState events to handle browser back & forward button actions
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const path = window.location.pathname;
      const policyTabs = [
        'newsroom', 'editorial-team', 'editorial-guidelines', 'fact-checking-policy', 
        'corrections-policy', 'ethics-policy', 'source-verification-policy', 'transparency-report', 
        'about-infobos', 'contact-newsroom', 'press-center', 'rss-feed', 'news-archive', 
        'breaking-news', 'live-news', 'trending-news', 'latest-news',
        'dewan-pers', 'pedoman-media', 'hak-jawab', 'fakta-integritas', 'kontak',
        'saas-pricing', 'partnership-program', 'advertise-with-us', 'careers'
      ];
      
      const matchPolicy = policyTabs.find(p => path === '/' + p);
      if (matchPolicy) {
        setActiveFooterModal(matchPolicy);
        setActiveArticleSlug(null);
        setActiveHubSlug(null);
        return;
      }

      setActiveFooterModal(null);
      const articleMatch = path.match(/^\/news\/([^/]+)\/([^/]+)$/);
      if (articleMatch) {
        const categorySlug = articleMatch[1];
        const articleSlug = articleMatch[2];
        if (categorySlug === 'category') {
          setActiveArticleSlug(null);
          setActiveHubSlug(null);
          setCurrentTab('home');
        } else {
          setActiveArticleSlug(articleSlug);
          setActiveHubSlug(null);
        }
      } else if (path.startsWith('/hub/')) {
        const parts = path.split('/');
        if (parts.length >= 4) {
          setActiveHubType(parts[2] as 'location' | 'entity');
          setActiveHubSlug(parts[3]);
          setActiveArticleSlug(null);
        }
      } else if (path === '/' || path === '') {
        setActiveArticleSlug(null);
        setActiveHubSlug(null);
        setCurrentTab('home');
      } else {
        const tab = path.replace(/^\/|\/$/g, '');
        setActiveArticleSlug(null);
        setActiveHubSlug(null);
        setCurrentTab(tab);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('infobos_token');
    const savedUser = localStorage.getItem('infobos_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      // Auto-switch to member portal if authenticated, UNLESS on the admin page
      if (window.location.pathname !== '/admin') {
        setActivePortal('member');
      }
    }
  }, []);

  const handleLogin = (newToken: string, newUser: any, keepAdmin?: boolean) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('infobos_token', newToken);
    localStorage.setItem('infobos_user', JSON.stringify(newUser));
    // Auto-switch to Member portal or first allowed portal, UNLESS requested to keep on admin CMS page
    if (keepAdmin || currentTab === 'admin' || window.location.pathname === '/admin') {
      setActivePortal('public');
    } else {
      setActivePortal('member');
    }
  };

  const handleAdminLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminAuthError('');
    setAdminAuthLoading(true);
    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail, password: adminPassword })
      });
      const data = await res.json();
      if (res.ok) {
        handleLogin(data.token, data.user, true);
        setAdminEmail('');
        setAdminPassword('');
      } else {
        setAdminAuthError(data.error || "Kredensial redaksi salah");
      }
    } catch (err) {
      setAdminAuthError("Gagal terhubung ke server redaksi");
    } finally {
      setAdminAuthLoading(false);
    }
  };

  const handleAdminQuickLogin = (email: string, pass: string) => {
    setAdminEmail(email);
    setAdminPassword(pass);
  };

  const handleLogout = () => {
    setUser(null);
    setToken('');
    setSimulatedRole('');
    setActivePortal('public');
    localStorage.removeItem('infobos_token');
    localStorage.removeItem('infobos_user');
    setCurrentTab('home');
    resetDetailViews();
  };

  const resetDetailViews = () => {
    setActiveArticleSlug(null);
    setActiveHubSlug(null);
    setActiveHubType(null);
    setSearchVal(null);
  };

  const handleTabChange = (tab: string) => {
    const policyTabs = [
      'newsroom', 'editorial-team', 'editorial-guidelines', 'fact-checking-policy', 
      'corrections-policy', 'ethics-policy', 'source-verification-policy', 'transparency-report', 
      'about-infobos', 'contact-newsroom', 'press-center', 'rss-feed', 'news-archive', 
      'breaking-news', 'live-news', 'trending-news', 'latest-news',
      'dewan-pers', 'pedoman-media', 'hak-jawab', 'fakta-integritas', 'kontak',
      'saas-pricing', 'partnership-program', 'advertise-with-us', 'careers'
    ];

    if (policyTabs.includes(tab)) {
      setActiveFooterModal(tab);
      return;
    }

    setCurrentTab(tab);
    resetDetailViews();
    if (tab === 'community-marketplace') {
      setMarketplaceInitialTab('dashboard');
    } else if (tab === 'marketplace-hub') {
      setMarketplaceInitialTab('marketplace');
    } else if (tab === 'forum-hub') {
      setMarketplaceInitialTab('forum');
    } else if (tab === 'business-directory') {
      setMarketplaceInitialTab('directory');
    } else if (tab === 'brand-directory') {
      setMarketplaceInitialTab('brands');
    } else if (tab === 'product-directory') {
      setMarketplaceInitialTab('products');
    } else if (tab === 'organization-directory') {
      setMarketplaceInitialTab('organizations');
    } else if (tab === 'author-directory') {
      setMarketplaceInitialTab('authors');
    } else if (tab === 'event-directory') {
      setMarketplaceInitialTab('events');
    }
    
    // Automatically scroll to the top of the viewport/section when a navigation button is clicked
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Safe navigation dispatcher matching autocomplete inputs
  const handleNavigate = (slug: string, type: string, queryText?: string) => {
    resetDetailViews();
    if (type === 'article') {
      setActiveArticleSlug(slug);
    } else if (type === 'location') {
      setActiveHubSlug(slug);
      setActiveHubType('location');
    } else if (type === 'entity') {
      setActiveHubSlug(slug);
      setActiveHubType('entity');
    } else if (type === 'category') {
      setCurrentTab(slug);
      setSearchVal(null);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 60);
    } else if (type === 'topic' || type === 'tag') {
      setSearchVal(slug);
      triggerSearch(slug);
    } else if (type === 'correction') {
      if (slug) {
        setActiveArticleSlug(slug);
      } else {
        resetDetailViews();
      }
    } else if (type === 'marketplace' || type === 'jobs') {
      setCurrentTab(type === 'jobs' ? 'jobs-hub' : 'marketplace-hub');
      setMarketplaceInitialTab(type === 'jobs' ? 'jobs' : 'marketplace');
      setSearchVal(null);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 60);
    } else if (type === 'forum' || type === 'chat') {
      setCurrentTab('forum-hub');
      setMarketplaceInitialTab(type === 'chat' ? 'chat' : 'forum');
      setSearchVal(null);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 60);
    } else if (type === 'search') {
      setSearchVal(queryText || slug);
      triggerSearch(queryText || slug);
    }
  };

  const triggerSearch = async (q: string) => {
    setSearching(true);
    setSearchFilter('all');
    try {
      const res = await fetch(`/api/v1/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (e) {
      console.error(e);
    } finally {
      setSearching(false);
    }
  };

  // Early return for Internal Portals (Strict Layout & Menu Isolation)
  if (activePortal !== 'public') {
    const currentRole = simulatedRole || user?.role || 'guest';
    const allowedPortals = PORTAL_ACCESS_MAPPING[currentRole] || ['public'];
    const isAllowed = allowedPortals.includes(activePortal);

    // Provide a robust simulated user fallback object if not logged in but simulating a role
    const currentUserObj = user || (simulatedRole ? {
      id: 'usr-simulated',
      fullName: `Ahmad Dahlan (${simulatedRole.replace('_', ' ').toUpperCase()})`,
      role: simulatedRole,
      status: 'active',
      email: `${simulatedRole}@infobos.com`
    } : null);

    return (
      <PortalShell
        activePortal={activePortal}
        user={currentUserObj}
        simulatedRole={simulatedRole}
        onPortalChange={setActivePortal}
        onLogout={handleLogout}
      >
        {(user || simulatedRole) && (
          <div className="mb-6 -mx-6 md:-mx-8 -mt-6 md:-mt-8 border-b border-slate-100">
            <PortalSwitcher
              userRole={user?.role || 'guest'}
              activePortal={activePortal}
              onPortalChange={setActivePortal}
              simulatedRole={simulatedRole}
              onSimulatedRoleChange={setSimulatedRole}
            />
          </div>
        )}
        {!user && !simulatedRole ? (
          <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
            <ShieldAlert className="h-12 w-12 text-rose-500 mx-auto" />
            <h2 className="font-display font-black text-lg text-[#002B5B]">Otentikasi Diperlukan</h2>
            <p className="text-slate-500 text-xs leading-relaxed">
              Portal <strong>{activePortal.replace('_', ' ').toUpperCase()}</strong> bersifat pribadi. Silakan masuk akun Anda terlebih dahulu untuk memverifikasi kredensial Anda.
            </p>
          </div>
        ) : !isAllowed ? (
          <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
            <ShieldAlert className="h-12 w-12 text-rose-500 mx-auto animate-bounce" />
            <h2 className="font-display font-black text-lg text-[#002B5B]">Akses Portal Ditolak (403)</h2>
            <p className="text-slate-500 text-xs leading-relaxed">
              Peran akun Anda (<strong>{currentRole.replace('_', ' ').toUpperCase()}</strong>) tidak terdaftar di matriks persetujuan untuk memasuki portal <strong>{activePortal.replace('_', ' ').toUpperCase()}</strong>.
            </p>
          </div>
        ) : (
          (() => {
            switch (activePortal) {
              case 'member':
                return (
                  <MemberPortal 
                    user={currentUserObj} 
                    onLogout={handleLogout} 
                    onNavigateToArticle={(slug) => {
                      setActivePortal('public');
                      handleNavigate(slug, 'article');
                    }} 
                  />
                );
              case 'creator':
                return <CreatorPortal user={currentUserObj} />;
              case 'reporter':
                return <ReporterPortal user={currentUserObj} />;
              case 'editor':
                return <EditorPortal user={currentUserObj} />;
              case 'advertiser':
                return <AdvertiserPortal user={currentUserObj} />;
              case 'sales':
                return <PartnerOS user={currentUserObj} />;
              case 'business':
                return <BusinessPortal user={currentUserObj} />;
              case 'research':
                return <ResearchPortal user={currentUserObj} />;
              case 'monitoring':
                return <MonitoringPortal user={currentUserObj} />;
              case 'marketplace':
                return <MarketplacePortal user={currentUserObj} />;
              case 'community':
                return <CommunityPortal user={currentUserObj} />;
              case 'support':
                return <CustomerSupportPortal user={currentUserObj} />;
              case 'moderator':
                return <ModeratorPortal user={currentUserObj} />;
              case 'cms':
                return (
                  <div className="space-y-8">
                    <PremiumTrialShowcase 
                      simulatedRole={simulatedRole} 
                      onUpgradeSuccess={(newRole) => {
                        setSimulatedRole(newRole);
                      }} 
                    />
                    <CMSPortal user={currentUserObj} token={effectiveToken} />
                    <div className="border-t border-slate-200 pt-8">
                      <h3 className="font-display font-black text-sm text-[#002B5B] uppercase mb-4 text-left">Konsol Administratif VIRALOG Terbuka</h3>
                      <AdminPanel user={currentUserObj} token={effectiveToken} onNavigateToArticle={(slug) => { setActivePortal('public'); handleNavigate(slug, 'article'); }} />
                    </div>
                  </div>
                );
              case 'super_admin':
                return (
                  <div className="space-y-8">
                    <PremiumTrialShowcase 
                      simulatedRole={simulatedRole} 
                      onUpgradeSuccess={(newRole) => {
                        setSimulatedRole(newRole);
                      }} 
                    />
                    <SuperAdminPortal user={currentUserObj} />
                  </div>
                );
              case 'developer':
                return <DeveloperPortal user={currentUserObj} />;
              case 'finance':
                return <FinancePortal user={currentUserObj} />;
              case 'government':
                return <GovernmentPortal user={currentUserObj} />;
              default:
                return null;
            }
          })()
        )}
      </PortalShell>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-between font-sans text-slate-900 selection:bg-[#002B5B] selection:text-[#FFD700]">
      
      {/* Dynamic Header Block */}
      <Header
        currentTab={currentTab}
        onTabChange={handleTabChange}
        onNavigateToSlug={handleNavigate}
        user={user}
        simulatedRole={simulatedRole}
        onLogin={handleLogin}
        onLogout={handleLogout}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onToggleExplorer={() => setIsExplorerOpen(!isExplorerOpen)}
        activePortal={activePortal}
        isDark={isDark}
        onToggleDark={() => setIsDark(!isDark)}
        topicPreferences={topicPreferences}
        onSaveTopicPreferences={handleSaveTopicPreferences}
      />

      {/* Dynamic Sidebar generated from Feature Registry */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentTab={currentTab}
        onTabChange={handleTabChange}
        onNavigateToSlug={handleNavigate}
        user={user}
        activePortal={activePortal}
        simulatedRole={simulatedRole}
      />

      {/* Universal Navigation Explorer & Platform sitemap */}
      <NavigationExplorer
        isOpen={isExplorerOpen}
        onClose={() => setIsExplorerOpen(false)}
        currentTab={currentTab}
        onTabChange={handleTabChange}
        onNavigateToSlug={handleNavigate}
        user={user}
        simulatedRole={simulatedRole}
      />

      {/* Render Portal Switcher for authenticated users */}
      {user && (
        <PortalSwitcher
          userRole={user.role}
          activePortal={activePortal}
          onPortalChange={setActivePortal}
          simulatedRole={simulatedRole}
          onSimulatedRoleChange={setSimulatedRole}
        />
      )}

      {/* Main Container Stage */}
      <main className="flex-grow pb-28 md:pb-16">
        
        {activePortal === 'public' ? (
          <>
            {/* VIEW 1: SEARCH OUTCOME VIEW */}
            {searchVal && (() => {
              // Local helpers for highlighting & count filtering
              const highlightText = (text: string, search: string) => {
                if (!text) return '';
                if (!search) return text;
                const words = search.split(/\s+/).filter(w => w.length > 0);
                if (words.length === 0) return text;
                
                const escapedWords = words.map(w => w.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
                const regex = new RegExp(`(${escapedWords.join('|')})`, 'gi');
                
                return text.split(regex).map((part, index) => 
                  regex.test(part) ? (
                    <mark key={index} className="bg-amber-100 text-[#002B5B] px-0.5 rounded font-semibold">
                      {part}
                    </mark>
                  ) : part
                );
              };

              const filteredResults = searchResults.filter(item => {
                if (searchFilter === 'all') return true;
                if (searchFilter === 'topic_tag') return item.type === 'topic' || item.type === 'tag';
                return item.type === searchFilter;
              });

              const getCount = (type: string) => {
                if (type === 'all') return searchResults.length;
                if (type === 'topic_tag') return searchResults.filter(item => item.type === 'topic' || item.type === 'tag').length;
                return searchResults.filter(item => item.type === type).length;
              };

              return (
                <div className="max-w-4xl mx-auto px-4 py-8 text-left space-y-6">
                  <div className="border-b border-slate-200 pb-4">
                    <button 
                      onClick={resetDetailViews}
                      className="text-xs font-bold text-slate-500 hover:text-slate-800 transition bg-slate-100 px-3 py-1 rounded-lg mb-4 cursor-pointer"
                    >
                      &larr; Tutup Pencarian
                    </button>
                    <h2 className="font-display font-black text-2xl text-[#002B5B] flex items-center gap-2">
                      <Search className="h-6 w-6 text-slate-400" />
                      Hasil Pencarian: &quot;{searchVal}&quot;
                    </h2>
                    <p className="text-xs text-slate-400 font-mono mt-1">
                      Ditemukan {searchResults.length} kecocokan di database intelijen.
                    </p>
                  </div>

                  {searching ? (
                    <div className="py-12 text-center space-y-2">
                      <div className="w-8 h-8 border-3 border-[#2B7A78] border-t-transparent rounded-full animate-spin mx-auto"></div>
                      <p className="text-xs text-slate-400 font-medium">Melakukan query relasional...</p>
                    </div>
                  ) : searchResults.length === 0 ? (
                    <div className="py-12 text-center border border-dashed border-slate-200 bg-white rounded-xl p-6">
                      <p className="text-slate-500 text-sm font-semibold">Tidak ada kecocokan yang ditemukan.</p>
                      <p className="text-slate-400 text-xs mt-1">Gunakan kata kunci lokasi seperti &apos;Bandung&apos; atau tokoh &apos;Sri Mulyani&apos;.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Interactive Filter Pills */}
                      <div className="flex flex-wrap gap-1.5 pb-2 border-b border-slate-100">
                        {[
                          { id: 'all', label: 'Semua' },
                          { id: 'article', label: 'Artikel' },
                          { id: 'location', label: 'Geografi' },
                          { id: 'entity', label: 'Entitas' },
                          { id: 'category', label: 'Kategori' },
                          { id: 'topic_tag', label: 'Topik & Tag' },
                          { id: 'correction', label: 'Koreksi Fakta' },
                          { id: 'marketplace', label: 'Marketplace' },
                          { id: 'jobs', label: 'Lowongan & Tender' }
                        ].map((tab) => {
                          const count = getCount(tab.id);
                          if (count === 0 && tab.id !== 'all') return null;
                          
                          return (
                            <button
                              key={tab.id}
                              onClick={() => setSearchFilter(tab.id as any)}
                              className={`text-xs font-medium px-3 py-1.5 rounded-full transition cursor-pointer flex items-center gap-1.5 ${
                                searchFilter === tab.id
                                  ? 'bg-[#002B5B] text-[#FFD700] font-bold shadow-sm'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              {tab.label}
                              <span className={`text-[10px] font-mono rounded-full px-1.5 py-0.2 ${
                                searchFilter === tab.id ? 'bg-[#FFD700] text-[#002B5B]' : 'bg-slate-200 text-slate-600'
                              }`}>
                                {count}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <AdZone zone="sponsored_search_result" pageContext={{ topic: searchVal }} />
                      
                      {filteredResults.length === 0 ? (
                        <div className="py-12 text-center border border-dashed border-slate-200 bg-white rounded-xl p-6">
                          <p className="text-slate-500 text-sm font-semibold">Tidak ada kecocokan dalam kategori filter ini.</p>
                          <p className="text-slate-400 text-xs mt-1">Pilih kategori lain atau filter &quot;Semua&quot; untuk melihat hasil lengkap.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {filteredResults.map((item) => {
                            let typeLabel = item.type;
                            let badgeColor = 'bg-slate-100 text-slate-700';
                            let icon = <Info className="h-4 w-4" />;
                            
                            if (item.type === 'article') {
                              typeLabel = 'Artikel';
                              badgeColor = 'bg-sky-50 text-sky-700 border border-sky-200';
                              icon = <Compass className="h-4 w-4" />;
                            } else if (item.type === 'location') {
                              typeLabel = 'Geografi';
                              badgeColor = 'bg-amber-50 text-amber-700 border border-amber-200';
                              icon = <MapPin className="h-4 w-4" />;
                            } else if (item.type === 'entity') {
                              typeLabel = 'Entitas';
                              badgeColor = 'bg-purple-50 text-purple-700 border border-purple-200';
                              icon = <Database className="h-4 w-4" />;
                            } else if (item.type === 'category') {
                              typeLabel = 'Kategori';
                              badgeColor = 'bg-emerald-50 text-emerald-700 border border-emerald-200';
                              icon = <Globe className="h-4 w-4" />;
                            } else if (item.type === 'topic') {
                              typeLabel = 'Topik';
                              badgeColor = 'bg-indigo-50 text-indigo-700 border border-indigo-200';
                              icon = <Info className="h-4 w-4" />;
                            } else if (item.type === 'tag') {
                              typeLabel = 'Tag';
                              badgeColor = 'bg-pink-50 text-pink-700 border border-pink-200';
                              icon = <MessageSquare className="h-4 w-4" />;
                            } else if (item.type === 'correction') {
                              typeLabel = 'Koreksi Fakta';
                              badgeColor = 'bg-rose-50 text-rose-700 border border-rose-200';
                              icon = <ShieldAlert className="h-4 w-4" />;
                            } else if (item.type === 'marketplace') {
                              typeLabel = 'Marketplace';
                              badgeColor = 'bg-orange-50 text-orange-700 border border-orange-200';
                              icon = <Tag className="h-4 w-4" />;
                            } else if (item.type === 'jobs') {
                              typeLabel = 'Lowongan & Tender';
                              badgeColor = 'bg-teal-50 text-teal-700 border border-teal-200';
                              icon = <Briefcase className="h-4 w-4" />;
                            }

                            return (
                              <div
                                key={`${item.type}-${item.id}`}
                                onClick={() => handleNavigate(item.slug, item.type)}
                                className="p-5 bg-white border border-slate-200 hover:border-[#2B7A78] rounded-2xl cursor-pointer shadow-sm hover:shadow-md transition duration-200 text-left flex flex-col md:flex-row gap-4 justify-between items-start"
                              >
                                <div className="space-y-2 flex-1">
                                  <div className="flex flex-wrap gap-2 items-center">
                                    <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full flex items-center gap-1 ${badgeColor}`}>
                                      {icon}
                                      {typeLabel}
                                    </span>
                                    
                                    {item.type === 'article' && (
                                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-sans font-medium">
                                        {item.categoryName}
                                      </span>
                                    )}
                                    
                                    {item.type === 'article' && item.sentiment && (
                                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-mono uppercase ${
                                        item.sentiment === 'positive' ? 'bg-emerald-100 text-emerald-800' :
                                        item.sentiment === 'negative' ? 'bg-rose-100 text-rose-800' :
                                        'bg-slate-100 text-slate-600'
                                      }`}>
                                        {item.sentiment}
                                      </span>
                                    )}

                                    {item.type === 'article' && item.riskLevel && item.riskLevel !== 'low' && (
                                      <span className="text-[9px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-mono uppercase flex items-center gap-0.5">
                                        <ShieldAlert className="h-2.5 w-2.5" />
                                        RISK: {item.riskLevel}
                                      </span>
                                    )}

                                    {item.type === 'marketplace' && item.price && (
                                      <span className="text-[10px] bg-orange-100 text-orange-800 px-2.5 py-1 rounded-full font-sans font-bold">
                                        Rp {item.price.toLocaleString('id-ID')}
                                      </span>
                                    )}

                                    {item.type === 'marketplace' && item.location && (
                                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-sans font-medium flex items-center gap-1">
                                        <MapPin className="h-3 w-3 text-slate-400" />
                                        {item.location}
                                      </span>
                                    )}

                                    {item.type === 'jobs' && item.budget && (
                                      <span className="text-[10px] bg-teal-100 text-teal-800 px-2.5 py-1 rounded-full font-sans font-bold">
                                        {item.budget}
                                      </span>
                                    )}

                                    {item.type === 'jobs' && item.issuer && (
                                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-sans font-medium">
                                        Pemberi: {item.issuer}
                                      </span>
                                    )}

                                    {item.score && (
                                      <span className="text-[9px] text-slate-400 font-mono ml-auto">
                                        Skor: {item.score.toFixed(1)}
                                      </span>
                                    )}
                                  </div>

                                  <h3 className="font-display font-bold text-lg text-[#002B5B] hover:text-[#2B7A78] transition duration-150 leading-snug">
                                    {highlightText(item.title, searchVal || '')}
                                  </h3>
                                  
                                  <p className="text-xs text-slate-600 leading-relaxed font-sans line-clamp-3">
                                    {highlightText(item.excerpt, searchVal || '')}
                                  </p>
                                  
                                  {item.type === 'correction' && (
                                    <div className="mt-3 p-3 bg-rose-50/50 border border-rose-100 rounded-xl text-xs space-y-1">
                                      <div className="font-bold text-rose-800 flex items-center gap-1 font-sans">
                                        <Shield className="h-3.5 w-3.5" />
                                        Hasil Klarifikasi Anti-Hoax:
                                      </div>
                                      <p className="text-slate-700 italic">
                                        &quot;{highlightText(item.excerpt, searchVal || '')}&quot;
                                      </p>
                                    </div>
                                  )}
                                </div>
                                
                                <div className="w-full md:w-auto self-stretch md:self-center pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 flex items-center justify-end">
                                  <div className="text-[11px] font-bold text-[#2B7A78] bg-[#2B7A78]/5 px-3 py-1.5 rounded-xl font-mono flex items-center gap-1 transition hover:bg-[#2B7A78]/10">
                                    Lihat Detail &rarr;
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      <AdZone zone="promoted_company" pageContext={{ topic: searchVal }} />
                    </div>
                  )}
                </div>
              );
            })()}

            {/* VIEW 2: SINGLE DETAILED ARTICLE SCREEN */}
            {!searchVal && activeArticleSlug && (
              <ArticleDetail
                slug={activeArticleSlug}
                onBack={resetDetailViews}
                onSelectLocation={(slug) => handleNavigate(slug, 'location')}
                onSelectEntity={(slug) => handleNavigate(slug, 'entity')}
                user={user}
                onSelectTab={handleTabChange}
              />
            )}

            {/* VIEW 3: DYNAMIC HUB (LOCATION / ENTITY PROFILES) */}
            {!searchVal && !activeArticleSlug && activeHubSlug && activeHubType && (
              <Hubs
                slug={activeHubSlug}
                type={activeHubType}
                onBack={resetDetailViews}
                onSelectArticle={(slug) => handleNavigate(slug, 'article')}
                onSelectLocation={(slug) => handleNavigate(slug, 'location')}
                onSelectEntity={(slug) => handleNavigate(slug, 'entity')}
              />
            )}

            {/* VIEW 4: PUBLIC HOMEPAGE / FEED OR MEDIA HUB CENTERS */}
            {!searchVal && !activeArticleSlug && !activeHubSlug && currentTab !== 'admin' && (
              currentTab === 'feature-explorer' ? (
                <FeatureExplorer onTabChange={handleTabChange} user={user} />
              ) : (currentTab === 'community-marketplace' || currentTab === 'marketplace-hub' || currentTab === 'jobs-hub' || currentTab === 'forum-hub' || currentTab === 'business-directory' || currentTab === 'brand-directory' || currentTab === 'product-directory' || currentTab === 'organization-directory' || currentTab === 'author-directory' || currentTab === 'event-directory') ? (
                <CommunityMarketplaceHub 
                  user={user} 
                  initialTab={
                    currentTab === 'marketplace-hub' ? 'marketplace' : 
                    currentTab === 'jobs-hub' ? 'jobs' : 
                    currentTab === 'forum-hub' ? (marketplaceInitialTab === 'chat' ? 'chat' : 'forum') : 
                    currentTab === 'business-directory' ? 'directory' : 
                    currentTab === 'brand-directory' ? 'brands' : 
                    currentTab === 'product-directory' ? 'products' : 
                    currentTab === 'organization-directory' ? 'organizations' : 
                    currentTab === 'author-directory' ? 'authors' : 
                    currentTab === 'event-directory' ? 'events' : 
                    marketplaceInitialTab
                  } 
                  isForumOnly={currentTab === 'forum-hub'}
                  isJobsOnly={currentTab === 'jobs-hub'}
                  isDirectoryOnly={currentTab === 'business-directory'}
                  isBrandDirectoryOnly={currentTab === 'brand-directory'}
                  isProductDirectoryOnly={currentTab === 'product-directory'}
                  isOrganizationDirectoryOnly={currentTab === 'organization-directory'}
                  isAuthorDirectoryOnly={currentTab === 'author-directory'}
                  isEventDirectoryOnly={currentTab === 'event-directory'}
                  onTabChange={handleTabChange}
                  escrowTransactions={escrowTransactions}
                  setEscrowTransactions={setEscrowTransactions}
                />
              ) : currentTab === 'widget-cms' ? (
                <WidgetLibraryCMS />
              ) : currentTab === 'intelligence-workspace' ? (
                <IntelligenceWorkspace />
              ) : currentTab === 'finance' ? (
                <FinanceNews />
              ) : currentTab === 'financial-intelligence' ? (
                <FinancialIntelligence />
              ) : currentTab === 'revenue-os' ? (
                <RevenueOS 
                  escrowTransactions={escrowTransactions}
                  setEscrowTransactions={setEscrowTransactions}
                />
              ) : currentTab === 'video-hub' ? (
                <VideoHub />
              ) : currentTab === 'short-video-hub' ? (
                <ShortVideoHub />
              ) : currentTab === 'podcast-center' ? (
                <PodcastCenter />
              ) : currentTab === 'document-center' ? (
                <DocumentCenter />
              ) : currentTab === 'media-academy' ? (
                <MediaAcademy />
              ) : currentTab === 'technical-tutorials' ? (
                <TechnicalTutorials />
              ) : currentTab === 'developer-docs' ? (
                <DeveloperDocs />
              ) : currentTab === 'general-faq' ? (
                <GeneralFAQ />
              ) : currentTab === 'gallery-center' ? (
                <GalleryCenter />
              ) : currentTab === 'interactive-data' ? (
                <InteractiveData />
              ) : currentTab === 'event-center' ? (
                <EventCenter />
              ) : currentTab === 'channel-center' ? (
                <ChannelCenter />
              ) : currentTab === 'ados' ? (
                <AdOSPortal
                  user={user}
                  token={effectiveToken}
                  onNavigateToCategory={handleTabChange}
                />
              ) : currentTab === 'seo-hub' ? (
                <SEOHub onNavigateToCategory={handleTabChange} />
              ) : currentTab === 'mediaos' ? (
                <MediaOSHub />
              ) : currentTab === 'social-media-hub' ? (
                <SocialMediaHub />
              ) : currentTab === 'system-explorer' ? (
                <SystemExplorer onTabChange={handleTabChange} user={user} />
              ) : currentTab === 'geo-intelligence-os' ? (
                <GeoIntelligenceHub 
                  onNavigateToArticle={(slug) => handleNavigate(slug, 'article')}
                />
              ) : (
                <Homepage
                  user={user}
                  categorySlug={currentTab}
                  onSelectArticle={(slug) => handleNavigate(slug, 'article')}
                  onSelectLocation={(slug) => handleNavigate(slug, 'location')}
                  onSelectEntity={(slug) => handleNavigate(slug, 'entity')}
                  onNavigate={handleNavigate}
                  simulatedRole={simulatedRole}
                  onUpgradeSuccess={(newRole) => {
                    setSimulatedRole(newRole);
                  }}
                  topicPreferences={topicPreferences}
                  onSaveTopicPreferences={handleSaveTopicPreferences}
                  onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                />
              )
            )}

            {/* VIEW 5: VIRALOG ADMINISTRATIVE CONSOLE PANEL */}
            {!searchVal && !activeArticleSlug && !activeHubSlug && currentTab === 'admin' && (
              user ? (
                <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                  <AdminPanel
                    user={user}
                    token={effectiveToken}
                    onNavigateToArticle={(slug) => handleNavigate(slug, 'article')}
                  />
                </div>
              ) : (
                <div className="max-w-md mx-auto px-4 py-12">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white dark:bg-[#001f42] border border-slate-200 dark:border-white/10 rounded-2xl p-6 xs:p-8 shadow-xl space-y-6 text-left relative font-sans"
                  >
                    <div className="text-center space-y-2">
                      <div className="inline-flex items-center justify-center p-3 rounded-full bg-amber-500/10 text-amber-500 mb-2">
                        <Shield className="h-6 w-6 stroke-[2]" />
                      </div>
                      <h2 className="font-display font-black text-xl text-[#002B5B] dark:text-white leading-tight uppercase tracking-wide">
                        Autentikasi Redaksi
                      </h2>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed max-w-xs mx-auto">
                        Gunakan kredensial staf untuk mengakses modul VIRALOG CMS & EVOLIS Intelligence Engine.
                      </p>
                    </div>

                    {adminAuthError && (
                      <div className="p-3 text-xs font-semibold rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center gap-2">
                        <ShieldAlert className="h-4 w-4 shrink-0" />
                        <span>{adminAuthError}</span>
                      </div>
                    )}

                    <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
                      <div>
                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                          Email Redaksi
                        </label>
                        <input
                          type="email"
                          value={adminEmail}
                          onChange={(e) => setAdminEmail(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                          placeholder="staf@infobos.com"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                          Password
                        </label>
                        <input
                          type="password"
                          value={adminPassword}
                          onChange={(e) => setAdminPassword(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                          placeholder="••••••••"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={adminAuthLoading}
                        className="w-full py-3 bg-[#FFD700] hover:bg-[#ffe240] text-[#002B5B] font-extrabold text-xs rounded-xl shadow-md transition duration-200 uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {adminAuthLoading ? 'Memverifikasi...' : 'Autentikasi Redaksi ➜'}
                      </button>
                    </form>

                    <div className="pt-4 border-t border-slate-100 dark:border-white/10 space-y-3">
                      <div className="text-[9px] font-mono font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center">
                        Profil Evaluasi Cepat
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleAdminQuickLogin('admin@infobos.com', 'admin123')}
                          className="p-2 bg-slate-50 dark:bg-white/5 hover:bg-[#FFD700]/10 hover:text-[#FFD700] hover:border-[#FFD700]/30 rounded-xl border border-slate-200 dark:border-white/5 text-[9px] font-mono font-extrabold text-slate-600 dark:text-slate-300 text-center transition cursor-pointer"
                        >
                          Super Admin
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAdminQuickLogin('editor@infobos.com', 'editor123')}
                          className="p-2 bg-slate-50 dark:bg-white/5 hover:bg-[#FFD700]/10 hover:text-[#FFD700] hover:border-[#FFD700]/30 rounded-xl border border-slate-200 dark:border-white/5 text-[9px] font-mono font-extrabold text-slate-600 dark:text-slate-300 text-center transition cursor-pointer"
                        >
                          Managing Editor
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAdminQuickLogin('reporter@infobos.com', 'reporter123')}
                          className="p-2 bg-slate-50 dark:bg-white/5 hover:bg-[#FFD700]/10 hover:text-[#FFD700] hover:border-[#FFD700]/30 rounded-xl border border-slate-200 dark:border-white/5 text-[9px] font-mono font-extrabold text-slate-600 dark:text-slate-300 text-center transition cursor-pointer"
                        >
                          Reporter
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )
            )}
          </>
        ) : null}

      </main>

      {/* Structured Footer with Sitemap & Redaksional Features */}
      <footer className="bg-[#001f42] text-slate-300 border-t border-white/10 pt-12 pb-28 md:pb-12 text-left font-sans relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Footer Top Row: Brand & Newsletter */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8 border-b border-white/10">
            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-xl tracking-tight text-white">
                  INFOBOS <span className="text-[#FFD700]">NEXT</span>
                </span>
                <span className="text-[9px] bg-white/10 text-[#FFD700] border border-[#FFD700]/30 px-1.5 py-0.5 rounded font-mono font-bold uppercase">
                  Stable v2.0
                </span>
                <span className="text-[8px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-mono font-bold uppercase flex items-center gap-1">
                  <Activity className="h-2 w-2 animate-pulse" /> Live Status
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                Satu Portal, Dunia & Sekitarmu — Portal berita modern tepercaya dengan visual bento feed, data geospasial real-time, dan pemetaan profil entitas yang tersertifikasi secara hukum jurnalisme.
              </p>
            </div>

            {/* Interactive Newsletter Signup */}
            <div className="lg:col-span-6 bg-white/5 border border-white/10 rounded-xl p-5 space-y-3 text-left">
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-wider font-display">Langganan Briefing Intelijen Harian</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Dapatkan kurasi berita terverifikasi & anomali tren langsung di inbox Anda.</p>
              </div>
              {newsletterSubscribed ? (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs font-semibold flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0" />
                  <span>Surel Anda berhasil didaftarkan ke sistem jurnalisme INFOBOS!</span>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newsletterEmail.trim()) {
                      setNewsletterSubscribed(true);
                    }
                  }}
                  className="flex gap-2"
                >
                  <input 
                    type="email" 
                    placeholder="Masukkan alamat email Anda..." 
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    className="flex-grow bg-[#001733] border border-white/10 text-white placeholder-slate-500 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#FFD700]"
                  />
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-[#FFD700] hover:bg-[#ffe240] text-[#002B5B] font-bold text-xs rounded-lg transition shrink-0 flex items-center gap-1.5"
                  >
                    <Send className="h-3 w-3" />
                    <span>Daftar</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Footer Grid Row: Quick Info & Sitemap Trigger */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Col 1: Redaksi & Organisasi */}
            <div className="space-y-3 text-left">
              <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[#FFD700]" />
                Redaksi & Organisasi
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <button 
                    onClick={() => setActiveFooterModal('about-infobos')}
                    className="hover:text-white hover:underline transition text-left block"
                  >
                    Tentang INFOBOS
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveFooterModal('newsroom')}
                    className="hover:text-white hover:underline transition text-left block"
                  >
                    Newsroom &amp; Infrastruktur
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveFooterModal('editorial-team')}
                    className="hover:text-white hover:underline transition text-left block"
                  >
                    Tim Redaksi (Editorial Team)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveFooterModal('transparency-report')}
                    className="hover:text-white hover:underline transition text-left block"
                  >
                    Laporan Transparansi (Transparency)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveFooterModal('press-center')}
                    className="hover:text-white hover:underline transition text-left block"
                  >
                    Press Center &amp; Media Kit
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveFooterModal('contact-newsroom')}
                    className="hover:text-white hover:underline transition text-left font-semibold text-[#FFD700] block"
                  >
                    Kontak Redaksi (Contact Newsroom)
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 2: Kebijakan & Etika */}
            <div className="space-y-3">
              <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-[#FFD700]" />
                Kebijakan &amp; Etika
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <button 
                    onClick={() => setActiveFooterModal('editorial-guidelines')}
                    className="hover:text-white hover:underline transition text-left block"
                  >
                    Pedoman Editorial (Guidelines)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveFooterModal('fact-checking-policy')}
                    className="hover:text-white hover:underline transition text-left block"
                  >
                    Kebijakan Cek Fakta (Fact-Checking)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveFooterModal('corrections-policy')}
                    className="hover:text-white hover:underline transition text-left block"
                  >
                    Kebijakan Koreksi &amp; Ralat
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveFooterModal('ethics-policy')}
                    className="hover:text-white hover:underline transition text-left block"
                  >
                    Kode Etik Jurnalistik (Ethics)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveFooterModal('source-verification-policy')}
                    className="hover:text-white hover:underline transition text-left block"
                  >
                    Verifikasi Sumber (Source Verification)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveFooterModal('pedoman-media')}
                    className="hover:text-white hover:underline transition text-left block"
                  >
                    Pedoman Pemberitaan Media Siber
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Kanal & Layanan Publik */}
            <div className="space-y-3">
              <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-[#FFD700]" />
                Kanal &amp; Layanan Publik
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <button 
                    onClick={() => setActiveFooterModal('breaking-news')}
                    className="hover:text-white hover:underline transition text-left text-red-400 font-bold flex items-center gap-1 block"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                    Breaking News Terkini
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveFooterModal('live-news')}
                    className="hover:text-white hover:underline transition text-left text-emerald-400 font-semibold block"
                  >
                    Live Updates (Berita Live)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveFooterModal('trending-news')}
                    className="hover:text-white hover:underline transition text-left block"
                  >
                    Trending &amp; Viral News
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveFooterModal('latest-news')}
                    className="hover:text-white hover:underline transition text-left block"
                  >
                    Arus Berita Terbaru (Latest)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveFooterModal('news-archive')}
                    className="hover:text-white hover:underline transition text-left block"
                  >
                    Arsip Berita Jurnal (Archive)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveFooterModal('rss-feed')}
                    className="hover:text-white hover:underline transition text-left font-bold text-orange-400 flex items-center gap-1 block"
                  >
                    🧡 RSS Feed Jurnalisme
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Sistem & Intelijen */}
            <div className="space-y-3">
              <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
                <Database className="h-4 w-4 text-[#FFD700]" />
                Sistem &amp; Intelijen
              </h4>
              <ul className="space-y-1 text-xs text-slate-400">
                <li><button onClick={() => handleTabChange('geo-intelligence-os')} className="hover:text-white transition font-semibold text-sky-400 text-left block">🌍 Geo Intelligence OS</button></li>
                <li><button onClick={() => handleTabChange('seo-hub')} className="hover:text-white transition text-left block">SEO Hub &amp; Google Schema</button></li>
                <li><button onClick={() => handleTabChange('ados')} className="hover:text-white transition text-left block">AdOS Portal (Zone Monetisasi)</button></li>
                <li><button onClick={() => handleTabChange('mediaos')} className="hover:text-white transition text-left block">MediaOS Engine Console</button></li>
              </ul>
            </div>

          </div>

          {/* SITEMAP TOGGLE CONTROL PANEL */}
          <div className="border-t border-white/10 pt-6">
            <button
              onClick={() => setShowFullSitemap(!showFullSitemap)}
              className="mx-auto flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 rounded-full text-xs font-bold text-white transition-all shadow-sm"
            >
              <span>{showFullSitemap ? 'TUTUP SITEMAP INTERAKTIF' : 'BUKA SITEMAP INTERAKTIF PORTAL'}</span>
              {showFullSitemap ? <ChevronUp className="h-4 w-4 text-[#FFD700]" /> : <ChevronDown className="h-4 w-4 text-[#FFD700]" />}
            </button>

            {/* Expandable Sitemap Grid with all links */}
            {showFullSitemap && (() => {
              const currentRole = simulatedRole || user?.role || 'guest';
              const allowedPortals = PORTAL_ACCESS_MAPPING[currentRole] || ['public'];

              // Helper to map feature portal names to standard keys used in PORTAL_ACCESS_MAPPING
              const getPortalId = (portalName: string): string => {
                const name = (portalName || '').toLowerCase();
                if (name.includes('public')) return 'public';
                if (name.includes('member')) return 'member';
                if (name.includes('creator')) return 'creator';
                if (name.includes('journalist') || name.includes('reporter')) return 'reporter';
                if (name.includes('editor')) return 'editor';
                if (name.includes('advertiser')) return 'advertiser';
                if (name.includes('partner') || name.includes('sales')) return 'sales';
                if (name.includes('business')) return 'business';
                if (name.includes('marketplace')) return 'marketplace';
                if (name.includes('community')) return 'community';
                if (name.includes('research')) return 'research';
                if (name.includes('government')) return 'government';
                if (name.includes('enterprise') || name.includes('monitoring')) return 'monitoring';
                if (name.includes('developer')) return 'developer';
                if (name.includes('support')) return 'support';
                if (name.includes('moderator')) return 'moderator';
                if (name.includes('finance')) return 'finance';
                if (name.includes('admin') || name.includes('cms')) return 'cms';
                if (name.includes('super admin') || name.includes('super_admin')) return 'super_admin';
                return 'public'; // fallback
              };

              const PORTAL_COLOR_MAP: Record<string, string> = {
                'public': 'text-[#FFD700]',
                'member': 'text-purple-400',
                'creator': 'text-fuchsia-400',
                'reporter': 'text-blue-400',
                'editor': 'text-indigo-400',
                'advertiser': 'text-cyan-400',
                'sales': 'text-emerald-400',
                'business': 'text-teal-400',
                'marketplace': 'text-orange-400',
                'community': 'text-pink-400',
                'research': 'text-amber-400',
                'government': 'text-red-400',
                'monitoring': 'text-rose-400',
                'developer': 'text-violet-400',
                'support': 'text-sky-400',
                'moderator': 'text-lime-400',
                'finance': 'text-green-400',
                'cms': 'text-teal-400',
                'super_admin': 'text-rose-500',
              };

              // Single-pass O(N) processing using our pre-compiled helper utility
              const sitemapGroups = getProcessedSitemapGroups(
                currentRole,
                allowedPortals,
                PORTAL_COLOR_MAP,
                getPortalId
              );

              const SITEMAP_ICON_MAP: Record<string, any> = {
                Compass, Tv, Headphones, Database, CreditCard, Users, Map, Shield, Activity, Sparkles, Cpu, Layers, Newspaper, Terminal
              };

              // Number of columns: groups count + 1 for 'Lokasi & Tokoh Terpantau'
              const numColumns = sitemapGroups.length + 1;
              const gridColsClass = numColumns >= 5 
                ? 'md:grid-cols-5' 
                : numColumns === 4 
                ? 'md:grid-cols-4' 
                : numColumns === 3 
                ? 'md:grid-cols-3' 
                : 'md:grid-cols-2';

              return (
                <div className={`mt-6 bg-[#001733]/90 border border-white/10 rounded-xl p-6 grid grid-cols-1 ${gridColsClass} gap-6 text-left animate-fade-in`}>
                  {sitemapGroups.map((group) => (
                    <div key={group.title} className="space-y-3">
                      <h5 className={`text-[11px] font-black ${group.color} uppercase tracking-wider font-mono border-b border-white/15 pb-1`}>
                        {group.title}
                      </h5>
                      <div className="flex flex-col gap-2 text-xs">
                        {group.features.map((feat) => {
                          const IconComp = SITEMAP_ICON_MAP[feat.icon] || Compass;
                          return (
                            <button
                              key={feat.id}
                              onClick={() => handleTabChange(feat.route)}
                              title={feat.tooltip || feat.shortDesc}
                              className="hover:text-white hover:translate-x-1 transition text-slate-400 text-left flex items-center gap-2 group/item"
                            >
                              <IconComp className="h-3.5 w-3.5 text-slate-500 group-hover/item:text-white transition-colors shrink-0" />
                              <span className="truncate font-sans font-medium">{feat.name}</span>
                              {feat.status === 'beta' && (
                                <span className="text-[8px] bg-sky-500/10 text-sky-400 px-1 py-0.5 rounded font-mono font-bold scale-90">BETA</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  {/* Lokasi & Tokoh Terpantau (Entities & Locations) */}
                  <div className="space-y-3">
                    <h5 className="text-[11px] font-black text-rose-400 uppercase tracking-wider font-mono border-b border-white/15 pb-1">
                      Lokasi &amp; Tokoh Terpantau
                    </h5>
                    <div className="flex flex-col gap-2 text-xs">
                      <button
                        onClick={() => handleNavigate('bandung', 'location')}
                        className="hover:text-white hover:translate-x-1 transition text-slate-400 text-left flex items-center gap-2 group/item"
                      >
                        <MapPin className="h-3.5 w-3.5 text-rose-500/70 group-hover/item:text-rose-400 transition-colors shrink-0" />
                        <span className="truncate">Profil Geo: Kota Bandung</span>
                      </button>
                      <button
                        onClick={() => handleNavigate('jakarta-pusat', 'location')}
                        className="hover:text-white hover:translate-x-1 transition text-slate-400 text-left flex items-center gap-2 group/item"
                      >
                        <MapPin className="h-3.5 w-3.5 text-rose-500/70 group-hover/item:text-rose-400 transition-colors shrink-0" />
                        <span className="truncate">Profil Geo: Jakarta Pusat</span>
                      </button>
                      <button
                        onClick={() => handleNavigate('ridwan-kamil', 'entity')}
                        className="hover:text-white hover:translate-x-1 transition text-slate-400 text-left flex items-center gap-2 group/item"
                      >
                        <Users className="h-3.5 w-3.5 text-rose-500/70 group-hover/item:text-rose-400 transition-colors shrink-0" />
                        <span className="truncate">Entitas: Ridwan Kamil</span>
                      </button>
                      <button
                        onClick={() => handleNavigate('sri-mulyani-indrawati', 'entity')}
                        className="hover:text-white hover:translate-x-1 transition text-slate-400 text-left flex items-center gap-2 group/item"
                      >
                        <Users className="h-3.5 w-3.5 text-rose-500/70 group-hover/item:text-rose-400 transition-colors shrink-0" />
                        <span className="truncate">Entitas: Sri Mulyani</span>
                      </button>
                      <button
                        onClick={() => handleNavigate('gedung-sate', 'entity')}
                        className="hover:text-white hover:translate-x-1 transition text-slate-400 text-left flex items-center gap-2 group/item"
                      >
                        <Database className="h-3.5 w-3.5 text-rose-500/70 group-hover/item:text-rose-400 transition-colors shrink-0" />
                        <span className="truncate">Entitas: Gedung Sate</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

        </div>

        {/* Footer Base copyright info */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p className="flex items-center gap-1.5">
            © 2026 INFOBOS Next. Hak Cipta Dilindungi Undang-Undang. Terdaftar pada Dewan Pers Republik Indonesia. Made with <Heart className="h-3 w-3 text-red-500 fill-current" /> in West Java.
          </p>
          <div className="flex items-center gap-4 font-mono text-[10px]">
            <span>EVOLIS: Active Integration</span>
            <span className="text-slate-600">|</span>
            <span>Grounding: VERIFIED</span>
          </div>
        </div>
      </footer>

      {/* 5. INTERACTIVE FOOTER POLICY MODALS & CONTACT DIALOGS */}
      {activeFooterModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto text-left flex flex-col">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-150 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900 z-10 shadow-xs">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#2B7A78] animate-pulse" />
                <h3 className="font-display font-black text-xs md:text-sm uppercase text-[#002B5B] dark:text-slate-100 tracking-wide">
                  {activeFooterModal === 'dewan-pers' && 'Sertifikasi & Verifikasi Dewan Pers'}
                  {activeFooterModal === 'pedoman-media' && 'Pedoman Pemberitaan Media Siber'}
                  {activeFooterModal === 'hak-jawab' && 'Prosedur Hak Jawab & Koreksi Berita'}
                  {activeFooterModal === 'fakta-integritas' && 'Fakta Integritas Redaksi INFOBOS'}
                  {activeFooterModal === 'kontak' && 'Kirim Pesan / Pengaduan ke Redaksi'}
                  
                  {activeFooterModal === 'about-infobos' && 'Tentang Portal Jurnalistik INFOBOS Next'}
                  {activeFooterModal === 'newsroom' && 'Newsroom & Infrastruktur Multi-Desk'}
                  {activeFooterModal === 'editorial-team' && 'Dewan Redaksi & Jurnalis Profesional'}
                  {activeFooterModal === 'transparency-report' && 'Laporan Transparansi Keuangan & Independensi'}
                  {activeFooterModal === 'press-center' && 'Press Center & Brand Media Kit'}
                  {activeFooterModal === 'contact-newsroom' && 'Kontak Redaksi & Saluran Whistleblower'}
                  
                  {activeFooterModal === 'editorial-guidelines' && 'Pedoman Penulisan & Kebijakan Editorial'}
                  {activeFooterModal === 'fact-checking-policy' && 'Kebijakan Cek Fakta & Verifikasi Berlapis'}
                  {activeFooterModal === 'corrections-policy' && 'Kebijakan Koreksi & Mekanisme Ralat Publik'}
                  {activeFooterModal === 'ethics-policy' && 'Kode Etik Jurnalistik (Ethics Policy)'}
                  {activeFooterModal === 'source-verification-policy' && 'Pedoman Verifikasi & Perlindungan Narasumber'}
                  
                  {activeFooterModal === 'breaking-news' && 'Breaking News - Berita Kilat & Siaga Bencana'}
                  {activeFooterModal === 'live-news' && 'Live News Tracker - Berita Langsung Real-Time'}
                  {activeFooterModal === 'trending-news' && 'Trending News - Pemetaan Keberviralan & Topik Terhangat'}
                  {activeFooterModal === 'latest-news' && 'Arus Berita Terbaru - Kronologis Berita'}
                  {activeFooterModal === 'news-archive' && 'Arsip Berita Jurnal & Indeks Historis'}
                  {activeFooterModal === 'rss-feed' && 'Saluran RSS Feed & Sindikasi XML Resmi'}
                  
                  {activeFooterModal === 'saas-pricing' && 'SaaS & Premium Intelligence Plans'}
                  {activeFooterModal === 'partnership-program' && 'Program Kemitraan Jurnalisme & Sindikasi'}
                  {activeFooterModal === 'advertise-with-us' && 'Solusi Periklanan AdOS & Rate Card'}
                  {activeFooterModal === 'careers' && 'Karir & Magang Redaksi INFOBOS'}
                </h3>
              </div>
              <button 
                onClick={() => {
                  setActiveFooterModal(null);
                  setContactSent(false);
                  setContactName('');
                  setContactEmail('');
                  setContactMsg('');
                  setSelectedPlan(null);
                  setPartnerSent(false);
                  setPartnerName('');
                  setPartnerCompany('');
                  setPartnerEmail('');
                  setPartnerProposal('');
                  setAdvSent(false);
                  setAdvName('');
                  setAdvEmail('');
                  setSelectedJob(null);
                  setApplicantSent(false);
                  setApplicantName('');
                  setApplicantEmail('');
                  setApplicantCvUrl('');
                }}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 overflow-y-auto text-xs leading-relaxed space-y-4 text-slate-700 dark:text-slate-300 font-sans">
              
              {activeFooterModal === 'dewan-pers' && (
                <>
                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-3.5 text-teal-900 font-bold flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <span>INFOBOS Next Tersertifikasi Dewan Pers Nasional</span>
                      <p className="text-[10px] text-teal-700 font-mono mt-0.5">Sertifikat No: 1042/DP-Verifikasi/VI/2026</p>
                    </div>
                  </div>
                  <p>
                    Sesuai dengan amanat <strong>Undang-Undang No. 40 Tahun 1999 tentang Pers</strong>, portal berita intelijen informasi INFOBOS Next telah secara resmi melalui verifikasi administratif dan faktual oleh Dewan Pers Republik Indonesia.
                  </p>
                  <p>
                    Verifikasi ini menjamin bahwa seluruh reporter, editor, dan analis data yang bekerja di bawah naungan INFOBOS memegang sertifikasi Kompetensi Wartawan (Uji Kompetensi Wartawan/Wartawan Utama) serta mematuhi standar etika penulisan berimbang dan antipropaganda.
                  </p>
                  <h4 className="font-bold text-[#002B5B] uppercase text-[11px] border-b pb-1">Hak & Kewajiban Hukum Jurnalisme</h4>
                  <ul className="list-disc pl-4 space-y-2">
                    <li><strong>Perlindungan Hukum:</strong> Jurnalis INFOBOS dilindungi dalam melakukan peliputan investigasi berisiko tinggi.</li>
                    <li><strong>Kewajiban Konfirmasi:</strong> Redaksi mewajibkan konfirmasi dua arah (cover both sides) minimal 2 narasumber kredibel sebelum merilis laporan berlabel investigasi.</li>
                  </ul>
                </>
              )}

              {activeFooterModal === 'pedoman-media' && (
                <>
                  <p className="italic border-l-2 border-[#2B7A78] pl-3">
                    Pedoman Pemberitaan Media Siber ini dibuat untuk memastikan penayangan informasi di media siber dilakukan secara bertanggung jawab, akurat, dan sesuai dengan Kode Etik Jurnalistik.
                  </p>
                  <div className="space-y-3">
                    <h4 className="font-bold text-[#002B5B] uppercase text-[11px]">1. Akurasi dan Kebenaran Berita</h4>
                    <p>
                      Setiap berita yang dipublikasikan di INFOBOS wajib melewati proses penyaringan fakta (fact checking) dan validasi silang (cross validation). Kami melarang penulisan berita berdasarkan rumor atau praduga tanpa adanya bukti empiris.
                    </p>
                    <h4 className="font-bold text-[#002B5B] uppercase text-[11px]">2. Konten Buatan Pengguna (User Generated Content)</h4>
                    <p>
                      Seluruh komentar, ulasan pariwisata, atau log di dalam platform dipantau secara berkala. Kami berhak menghapus komentar yang mengandung SARA, ujaran kebencian, atau pelecehan tanpa pemberitahuan sebelumnya.
                    </p>
                    <h4 className="font-bold text-[#002B5B] uppercase text-[11px]">3. Hak Jawab dan Hak Koreksi</h4>
                    <p>
                      Koreksi terhadap kesalahan faktual pada berita yang telah tayang harus dilakukan sesegera mungkin di bawah pengawasan penanggung jawab redaksi dengan mencantumkan keterangan ralat.
                    </p>
                  </div>
                </>
              )}

              {activeFooterModal === 'hak-jawab' && (
                <>
                  <p>
                    INFOBOS Next menjunjung tinggi hak masyarakat untuk mengajukan <strong>Hak Jawab</strong> dan <strong>Hak Koreksi</strong> apabila merasa dirugikan oleh pemberitaan faktual yang kurang akurat.
                  </p>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3.5 space-y-2">
                    <h4 className="font-bold text-amber-900 text-[11px]">Alur Pengajuan Hak Jawab & Koreksi</h4>
                    <ol className="list-decimal pl-4 text-slate-700 space-y-1.5 font-medium">
                      <li>Kirimkan surel resmi ke alamat <strong className="text-amber-950">redaksi@infobos.com</strong> dengan subjek <strong>[HAK JAWAB] - Judul Berita Terkait</strong>.</li>
                      <li>Sertakan bukti dokumen autentik, koordinat, atau kutipan pernyataan yang sah sebagai landasan rujukan sanggahan Anda.</li>
                      <li>Tim Sidang Redaksi kami akan merespons pengajuan Anda dalam waktu maksimal 2x24 jam sejak dokumen dinyatakan lengkap.</li>
                    </ol>
                  </div>
                  <p>
                    Koreksi yang disetujui akan dipublikasikan langsung pada artikel asli di bawah tajuk <strong>Catatan Perbaikan & Ralat Redaksi</strong> untuk menjaga transparansi rekam jejak jurnalistik.
                  </p>
                </>
              )}

              {activeFooterModal === 'fakta-integritas' && (
                <>
                  <div className="text-center py-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                    <Shield className="h-10 w-10 text-[#002B5B] mx-auto" />
                    <h4 className="font-display font-black text-xs text-[#002B5B] uppercase tracking-wide">Maklumat Integritas Redaksi INFOBOS Next</h4>
                  </div>
                  <p>
                    Seluruh jurnalis, analis data, editor, dan pemimpin redaksi INFOBOS Next menyatakan komitmen penuh terhadap piagam integritas berikut:
                  </p>
                  <ul className="list-disc pl-4 space-y-2">
                    <li><strong>Independensi Mutlak:</strong> Redaksi tidak terafiliasi dengan partai politik, kelompok kepentingan, atau korporasi multinasional mana pun. Kebijakan editorial murni dilandaskan pada verifikasi data lapangan.</li>
                    <li><strong>Anti-Plagiarisme:</strong> Kami menolak keras segala bentuk plagiarisme konten. Setiap rujukan data sekunder wajib mencantumkan tautan sumber eksternal secara transparan.</li>
                    <li><strong>Penolakan Gratifikasi:</strong> Seluruh awak redaksi dilarang keras menerima pemberian berupa uang, barang, atau fasilitas dari pihak yang berkepentingan dengan objek peliputan (gratis pers).</li>
                  </ul>
                </>
              )}

              {/* 1. ABOUT INFOBOS */}
              {activeFooterModal === 'about-infobos' && (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 rounded-lg text-slate-800 dark:text-slate-200 space-y-2">
                    <h4 className="font-bold text-[#002B5B] dark:text-blue-400 text-xs uppercase flex items-center gap-1.5">
                      <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      Lembaga Pers Siber Terdaftar &amp; Terverifikasi Hukum
                    </h4>
                    <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                      INFOBOS Next adalah platform jurnalisme siber, pengawas media, dan intelijen spasial independen di bawah PT Media Siber Dirgantara, tersertifikasi penuh berdasarkan Undang-Undang No. 40 Tahun 1999 tentang Pers.
                    </p>
                  </div>
                  <h5 className="font-bold text-xs uppercase text-[#002B5B] dark:text-slate-200 border-b dark:border-slate-800 pb-1">Visi dan Misi Utama</h5>
                  <p>
                    Menghubungkan data investigatif, intelijen publik, dan kemandirian ruang redaksi regional Jawa Barat dengan standar tertinggi jurnalisme presisi. Kami menggabungkan pemetaan spasial geospasial dengan wawancara lapangan demi menyajikan realitas objektif tanpa distorsi partisan.
                  </p>
                  <h5 className="font-bold text-xs uppercase text-[#002B5B] dark:text-slate-200 border-b dark:border-slate-800 pb-1">Teknologi Jurnalisme Kami</h5>
                  <p>
                    Didukung oleh sistem **Evolis Grounding Engine** dan **ContentOS (VIRALOG)**, kami mendeteksi anomali informasi publik dan memastikan proses penyaringan fakta (fact checking) berjalan dalam hitungan milidetik secara transparan.
                  </p>
                </div>
              )}

              {/* 2. NEWSROOM & INFRASTRUCTURE */}
              {activeFooterModal === 'newsroom' && (
                <div className="space-y-4">
                  <div className="p-4 bg-[#001f42] dark:bg-slate-950/60 border dark:border-slate-800 text-white rounded-lg space-y-2">
                    <h4 className="font-display font-black text-xs uppercase text-[#FFD700] flex items-center gap-1.5">
                      <Activity className="h-4 w-4 animate-pulse text-[#FFD700]" />
                      Multidesk Newsroom Operations
                    </h4>
                    <p className="text-[11px] text-slate-300 dark:text-slate-400">
                      Gedung Sate Heritage Building, Lantai 2, Bandung. Terkoneksi 24/7 dengan Biro Regional 27 Kabupaten/Kota se-Jawa Barat.
                    </p>
                  </div>
                  <p>
                    Newsroom INFOBOS Next dirancang secara modular dengan pemisahan desk demi menjaga fokus, keahlian, dan kecepatan diseminasi berita:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                    <div className="border border-slate-200 dark:border-slate-850 p-3 rounded-lg bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300">
                      <strong className="text-[#002B5B] dark:text-teal-400 block uppercase text-[10px] mb-1">💼 Desk Regional &amp; Tata Kota</strong>
                      Fokus pada kebijakan lokal, infrastruktur Jawa Barat, APBD, dan investigasi pelayanan publik perkotaan.
                    </div>
                    <div className="border border-slate-200 dark:border-slate-850 p-3 rounded-lg bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300">
                      <strong className="text-[#002B5B] dark:text-teal-400 block uppercase text-[10px] mb-1">🌍 Desk Internasional &amp; Geopolitik</strong>
                      Menghubungkan dampak kebijakan global, rantai pasok industri, dan makroekonomi terhadap Jawa Barat.
                    </div>
                    <div className="border border-slate-200 dark:border-slate-850 p-3 rounded-lg bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300">
                      <strong className="text-[#002B5B] dark:text-teal-400 block uppercase text-[10px] mb-1">🔍 Desk Cek Fakta &amp; Intelijen Siber</strong>
                      Unit khusus yang memverifikasi disinformasi, hoax regional, analisis dokumen palsu, dan pencitraan satelit.
                    </div>
                    <div className="border border-slate-200 dark:border-slate-850 p-3 rounded-lg bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300">
                      <strong className="text-[#002B5B] dark:text-teal-400 block uppercase text-[10px] mb-1">📊 Desk Ekonomi, Bisnis &amp; UMKM</strong>
                      Mengulas perkembangan pasar bursa finansial, regulasi fiskal, pemberdayaan UMKM, dan iklim investasi digital.
                    </div>
                  </div>
                </div>
              )}

              {/* 3. EDITORIAL TEAM */}
              {activeFooterModal === 'editorial-team' && (
                <div className="space-y-4">
                  <p>
                    Ruang redaksi INFOBOS Next dikelola oleh para jurnalis profesional berlisensi Dewan Pers Nasional, didampingi oleh analis sistem intelijen informasi publik:
                  </p>
                  <div className="space-y-2 text-[11px]">
                    <div className="p-3 border border-slate-200 dark:border-slate-850 rounded-lg bg-slate-50 dark:bg-slate-950/40 flex justify-between items-center text-slate-700 dark:text-slate-300">
                      <div>
                        <strong className="text-slate-900 dark:text-slate-100 block text-xs">Asep Ridwan, M.I.Kom.</strong>
                        <span className="text-slate-500 dark:text-slate-400">Pemimpin Redaksi / Penanggung Jawab Jurnal (Sertifikat Wartawan Utama No: 9812-DP)</span>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 rounded text-[9px] font-bold font-mono">Utama</span>
                    </div>
                    <div className="p-3 border border-slate-200 dark:border-slate-850 rounded-lg bg-slate-50 dark:bg-slate-950/40 flex justify-between items-center text-slate-700 dark:text-slate-300">
                      <div>
                        <strong className="text-slate-900 dark:text-slate-100 block text-xs">Dadang Kurnia, S.Sos.</strong>
                        <span className="text-slate-500 dark:text-slate-400">Redaktur Pelaksana Desk Regional &amp; Investigasi (Sertifikat Wartawan Madya No: 7644-DP)</span>
                      </div>
                      <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-950/50 text-blue-800 dark:text-blue-400 rounded text-[9px] font-bold font-mono">Madya</span>
                    </div>
                    <div className="p-3 border border-slate-200 dark:border-slate-850 rounded-lg bg-slate-50 dark:bg-slate-950/40 flex justify-between items-center text-slate-700 dark:text-slate-300">
                      <div>
                        <strong className="text-slate-900 dark:text-slate-100 block text-xs">Siti Aminah, S.I.P.</strong>
                        <span className="text-slate-500 dark:text-slate-400">Redaktur Desk Cek Fakta &amp; Hoax Buster Unit</span>
                      </div>
                      <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-950/50 text-indigo-800 dark:text-indigo-400 rounded text-[9px] font-bold font-mono">Fakta Specialist</span>
                    </div>
                    <div className="p-3 border border-slate-200 dark:border-slate-850 rounded-lg bg-slate-50 dark:bg-slate-950/40 flex justify-between items-center text-slate-700 dark:text-slate-300">
                      <div>
                        <strong className="text-slate-900 dark:text-slate-100 block text-xs">Budi Setiadi &amp; Tim Koresponden Daerah</strong>
                        <span className="text-slate-500 dark:text-slate-400">Peliputan Lapangan &amp; Hubungan Kemitraan 27 Kabupaten/Kota</span>
                      </div>
                      <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 rounded text-[9px] font-bold font-mono">Reporter</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. TRANSPARENCY REPORT */}
              {activeFooterModal === 'transparency-report' && (
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 rounded-lg text-emerald-950 dark:text-emerald-100 space-y-1">
                    <strong className="text-xs uppercase text-emerald-900 dark:text-emerald-300 block font-display">Laporan Kemandirian Organisasi Berita 2026</strong>
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-400 leading-relaxed">
                      INFOBOS Next sepenuhnya mandiri secara finansial tanpa menerima subsidi politik, dana kampanye hitam, atau modal dari kelompok oligarki mana pun.
                    </p>
                  </div>
                  <h5 className="font-bold text-xs uppercase text-[#002B5B] dark:text-slate-200 border-b dark:border-slate-800 pb-1">Komposisi Pendapatan Redaksi</h5>
                  <div className="grid grid-cols-3 gap-3 text-center text-[11px]">
                    <div className="p-2 border border-slate-200 dark:border-slate-850 rounded-lg bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300">
                      <strong className="block text-slate-800 dark:text-slate-100 text-xs">65%</strong>
                      <span className="text-slate-500 dark:text-slate-400">AdOS Monetisasi &amp; Kemitraan Iklan</span>
                    </div>
                    <div className="p-2 border border-slate-200 dark:border-slate-850 rounded-lg bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300">
                      <strong className="block text-slate-800 dark:text-slate-100 text-xs">25%</strong>
                      <span className="text-slate-500 dark:text-slate-400">SaaS Intelijen Spasial (MediaOS)</span>
                    </div>
                    <div className="p-2 border border-slate-200 dark:border-slate-850 rounded-lg bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300">
                      <strong className="block text-slate-800 dark:text-slate-100 text-xs">10%</strong>
                      <span className="text-slate-500 dark:text-slate-400">Donasi Pembaca &amp; Langganan Riset</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 italic mt-2">
                    Laporan audit sirkulasi trafik, transparansi beban hosting server, dan pemenuhan upah minimum wartawan dilaporkan setiap tahun secara berkala ke dewan pengawas PT Media Siber Dirgantara dan Dewan Pers Indonesia.
                  </p>
                </div>
              )}

              {/* 5. PRESS CENTER */}
              {activeFooterModal === 'press-center' && (
                <div className="space-y-4">
                  <p>
                    Selamat datang di Press Center INFOBOS Next. Kami menyediakan siaran pers resmi korporasi, logo beresolusi tinggi, dan kontak media untuk kebutuhan rujukan publikasi eksternal:
                  </p>
                  <div className="border border-slate-200 dark:border-slate-850 rounded-lg p-3 space-y-2 bg-slate-50 dark:bg-slate-950/40 text-[11px] text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-800 dark:text-slate-100 block text-xs">Aset Resmi Brand &amp; Media Kit:</strong>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-400">
                      <li>Logo Utama INFOBOS Next (Format SVG &amp; PNG Transparan)</li>
                      <li>Pedoman Palet Warna Korporat (Midnight Blue #002B5B, Golden Yellow #FFD700)</li>
                      <li>Kontak Media: <strong className="text-slate-800 dark:text-slate-200 font-mono">media.relations@infobos.com</strong></li>
                    </ul>
                  </div>
                  <button 
                    onClick={() => alert('Media Kit berhasil disiapkan untuk diunduh (Simulasi)')}
                    className="px-4 py-2 bg-[#002B5B] dark:bg-teal-600 dark:hover:bg-teal-500 text-white font-bold rounded-lg hover:bg-opacity-90 transition text-[11px]"
                  >
                    Download Complete Media Kit (ZIP)
                  </button>
                </div>
              )}

              {/* 6. CONTACT NEWSROOM */}
              {activeFooterModal === 'contact-newsroom' && (
                <div className="space-y-4">
                  <p>
                    Silakan hubungi meja redaksi kami jika Anda memiliki laporan kejadian darurat (breaking news), siaran pers kementerian/pemprov, dokumen bocoran investigasi, atau sanggahan berita (Hak Jawab):
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] text-slate-600 dark:text-slate-400">
                    <div className="p-3 border border-slate-200 dark:border-slate-850 rounded-lg bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300">
                      <strong className="text-slate-950 dark:text-slate-100 block mb-1 font-bold">📧 Email Meja Redaksi:</strong>
                      <span className="font-mono text-slate-800 dark:text-slate-200">redaksi@infobos.com</span> (Saluran utama untuk draf naskah, ralat, dan hak jawab)
                    </div>
                    <div className="p-3 border border-slate-200 dark:border-slate-850 rounded-lg bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300">
                      <strong className="text-slate-950 dark:text-slate-100 block mb-1 font-bold">📞 Telepon &amp; WhatsApp:</strong>
                      <span className="text-slate-800 dark:text-slate-200">Hotline Redaksi: (022) 420-5678</span> (24 Jam Pelaporan Kejadian Darurat Jawa Barat)
                    </div>
                  </div>
                </div>
              )}

              {/* 7. EDITORIAL GUIDELINES */}
              {activeFooterModal === 'editorial-guidelines' && (
                <div className="space-y-4">
                  <p className="italic border-l-2 border-[#2B7A78] pl-3 text-slate-600 dark:text-slate-400 font-medium">
                    "Akurasi mendahului kecepatan. Kebenaran objektif melampaui kepentingan pragmatis."
                  </p>
                  <h5 className="font-bold text-xs uppercase text-[#002B5B] dark:text-slate-200 border-b dark:border-slate-800 pb-1">Panduan Pokok Ruang Redaksi</h5>
                  <ol className="list-decimal pl-4 space-y-2 text-slate-600 dark:text-slate-400">
                    <li><strong>Konfirmasi Berlapis (Cover Both Sides):</strong> Setiap berita tuduhan atau polemik wajib melalui konfirmasi dengan pihak terkait sebelum ditayangkan. Sifat sepihak dilarang keras.</li>
                    <li><strong>Verifikasi Dokumen:</strong> Referensi peraturan, dokumen negara, APBD, dan koordinat satelit wajib diverifikasi keasliannya secara langsung atau bersertifikat lembaga tepercaya.</li>
                    <li><strong>Pemisahan Fakta &amp; Opini:</strong> Penulisan berita langsung (straight news) dilarang mencampurkan opini pribadi jurnalis. Opini murni hanya diwadahi dalam rubrik tajuk rencana atau kolom opini eksternal.</li>
                  </ol>
                </div>
              )}

              {/* 8. FACT CHECKING POLICY */}
              {activeFooterModal === 'fact-checking-policy' && (
                <div className="space-y-4">
                  <p>
                    INFOBOS Next mengoperasikan rubrik cek fakta berstandar tinggi untuk mendeteksi, mengaudit, dan menyanggah kabar bohong (hoax) di Jawa Barat:
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 rounded-lg p-3 text-[11px] space-y-1.5 text-slate-700 dark:text-slate-300">
                    <strong className="text-[#002B5B] dark:text-blue-400 uppercase block font-bold text-xs">Langkah Silang Cek Fakta:</strong>
                    <ol className="list-decimal pl-4 space-y-1">
                      <li>Analisis metadata digital dari file gambar, suara, atau video menggunakan tools forensik siber.</li>
                      <li>Geolokasi koordinat lapangan dengan citra satelit aktif Google Maps &amp; Intelijen Spasial.</li>
                      <li>Konfirmasi langsung ke narasumber primer resmi (seperti dinas terkait, tokoh bersangkutan, atau pakar independen).</li>
                    </ol>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                    Setiap artikel cek fakta akan menampilkan klasifikasi kesimpulan yang transparan: **Benar**, **Salah**, **Menyesatkan (Misleading)**, atau **Kurang Bukti**.
                  </p>
                </div>
              )}

              {/* 9. CORRECTIONS POLICY */}
              {activeFooterModal === 'corrections-policy' && (
                <div className="space-y-4">
                  <p>
                    Kami menyadari bahwa kesalahan pengetikan nama, gelar, nominal angka, atau kutipan data faktual bisa terjadi. Sikap profesional kami dalam menangani ralat diatur secara terbuka:
                  </p>
                  <h5 className="font-bold text-xs uppercase text-[#002B5B] dark:text-slate-200 border-b dark:border-slate-800 pb-1">Mekanisme Koreksi Mandiri &amp; Eksternal</h5>
                  <p>
                    Ketika tim redaksi mendeteksi kesalahan secara mandiri, atau menerima komplain pembaca yang didukung bukti konkret, perubahan pada teks berita akan dilakukan sesegera mungkin.
                  </p>
                  <div className="p-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-850 rounded-lg text-[11px]">
                    <strong className="text-slate-800 dark:text-slate-200 block text-xs mb-1">Catatan Perbaikan (Ralat Block):</strong>
                    Setiap berita yang diperbaiki wajib mencantumkan keterangan di bagian bawah naskah:
                    <div className="font-mono text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 p-1.5 rounded mt-1 text-[10px]">
                      "RALAT: Artikel ini telah mengalami revisi untuk membetulkan nominal APBD Jawa Barat yang tertulis sebelumnya sebesar..."
                    </div>
                  </div>
                </div>
              )}

              {/* 10. ETHICS POLICY */}
              {activeFooterModal === 'ethics-policy' && (
                <div className="space-y-4">
                  <p>
                    Seluruh redaktur, wartawan, dan kontributor INFOBOS Next wajib tunduk sepenuhnya pada **Kode Etik Jurnalistik (KEJ)** yang ditetapkan Dewan Pers Indonesia:
                  </p>
                  <div className="border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-950/40 p-3 space-y-2 text-[11px] max-h-48 overflow-y-auto text-slate-700 dark:text-slate-300">
                    <p><strong className="text-slate-900 dark:text-slate-100">Pasal 1:</strong> Wartawan Indonesia bersikap independen, menghasilkan berita yang akurat, berimbang, dan tidak beritikad buruk.</p>
                    <p><strong className="text-slate-900 dark:text-slate-100">Pasal 2:</strong> Wartawan Indonesia menempuh cara-cara yang profesional dalam melaksanakan tugas jurnalistik.</p>
                    <p><strong className="text-slate-900 dark:text-slate-100">Pasal 3:</strong> Wartawan Indonesia selalu menguji informasi, memberitakan secara berimbang, tidak mencampurkan fakta dan opini yang menghakimi, serta menerapkan asas praduga tak bersalah.</p>
                    <p><strong className="text-slate-900 dark:text-slate-100">Pasal 4:</strong> Wartawan Indonesia tidak membuat berita bohong, fitnah, sadis, dan cabul.</p>
                    <p><strong className="text-slate-900 dark:text-slate-100">Pasal 5:</strong> Wartawan Indonesia tidak menyebutkan dan menyiarkan identitas korban kejahatan susila dan tidak menyebutkan identitas anak yang menjadi pelaku kejahatan.</p>
                  </div>
                </div>
              )}

              {/* 11. SOURCE VERIFICATION POLICY */}
              {activeFooterModal === 'source-verification-policy' && (
                <div className="space-y-4">
                  <p>
                    Kami berkomitmen melindungi keamanan fisik, hukum, dan digital dari narasumber rahasia atau pembocor data (whistleblower):
                  </p>
                  <ul className="list-disc pl-4 space-y-2 text-slate-600 dark:text-slate-400 text-[11px]">
                    <li><strong className="text-slate-900 dark:text-slate-100">Hak Tolak Jurnalis:</strong> Jurnalis INFOBOS Next memegang teguh Hak Tolak secara hukum untuk tidak mengungkapkan nama atau identitas narasumber rahasia kepada pihak penyidik atau penguasa sekalipun.</li>
                    <li><strong className="text-slate-900 dark:text-slate-100">Audit Validitas Sumber:</strong> Dokumen yang dibocorkan wajib divalidasi keabsahannya sebelum dijadikan landasan laporan utama (lead story).</li>
                  </ul>
                </div>
              )}

              {/* 12. BREAKING NEWS */}
              {activeFooterModal === 'breaking-news' && (
                <div className="space-y-4 text-left">
                  <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-lg p-3.5 flex items-start gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping shrink-0 mt-1"></span>
                    <div>
                      <strong className="text-red-950 dark:text-red-300 text-xs uppercase block font-display">🔴 LIVE BULLETIN: Breaking News Teraktif</strong>
                      <p className="text-[10px] text-red-700 dark:text-red-400 font-mono mt-0.5 font-bold animate-pulse">Waktu Server UTC: {new Date().toISOString()}</p>
                    </div>
                  </div>
                  <div className="space-y-3.5">
                    <div className="p-3 border-l-2 border-red-500 bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300 space-y-1 rounded-r-lg">
                      <span className="text-[9px] bg-red-600 text-white font-bold px-1.5 py-0.2 rounded font-mono uppercase">Lalu Lintas</span>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 leading-tight">BREAKING: Longsor Ringan Terjadi di Jalur Cadas Pangeran Sumedang, Jalur Dialihkan Sementara</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Dilaporkan oleh jurnalis lapangan 3 menit yang lalu — Petugas gabungan BPBD & Satlantas Polres Sumedang telah berada di lokasi.</p>
                    </div>
                    <div className="p-3 border-l-2 border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300 space-y-1 rounded-r-lg">
                      <span className="text-[9px] bg-slate-500 text-white font-bold px-1.5 py-0.2 rounded font-mono uppercase">Ekonomi</span>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 leading-tight">Sri Mulyani Umumkan Penyesuaian Anggaran Transfer Daerah untuk Provinsi Jabar Q3 2026</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Dilaporkan 1 jam yang lalu — Pj Gubernur Jabar merespons cepat instruksi Kementerian Keuangan.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 13. LIVE NEWS */}
              {activeFooterModal === 'live-news' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                      <strong className="text-xs uppercase text-slate-800 font-bold">PEMUTAKHIRAN BERITA LANGSUNG (LIVE UPDATES)</strong>
                    </div>
                    <button 
                      onClick={() => alert('Berita langsung diperbarui!')}
                      className="text-[10px] text-[#002B5B] hover:underline font-bold flex items-center gap-1 font-mono"
                    >
                      <RefreshCw className="h-3 w-3 animate-spin text-[#2B7A78]" /> REFRESH FEED
                    </button>
                  </div>
                  <div className="relative border-l border-slate-200 pl-4 space-y-4 text-[11px]">
                    <div className="relative">
                      <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white"></span>
                      <span className="text-[9px] text-[#2B7A78] font-bold font-mono">08:15 WIB — Live</span>
                      <p className="font-semibold text-slate-900 mt-0.5">Pemeriksaan Kelayakan Jalur Mudik Alternatif Jabar Selatan oleh Dinas Perhubungan Dimulai</p>
                    </div>
                    <div className="relative">
                      <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-slate-300 border-2 border-white"></span>
                      <span className="text-[9px] text-slate-500 font-bold font-mono">07:45 WIB</span>
                      <p className="text-slate-600 mt-0.5">Prakiraan Cuaca BMKG Bandung: Hujan Ringan Berpotensi Mengguyur Wilayah Priangan Timur Siang Ini</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 14. TRENDING NEWS */}
              {activeFooterModal === 'trending-news' && (
                <div className="space-y-4">
                  <p>
                    Berdasarkan visualisasi analitik tren di mesin jurnalisme **VIRALOG**, berikut adalah daftar berita dan entitas paling populer serta dibagikan terbanyak hari ini di Jawa Barat:
                  </p>
                  <div className="space-y-2.5 text-[11px]">
                    <div className="p-3 border border-slate-200 dark:border-slate-850 rounded-lg bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300 flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0">#1</span>
                      <div className="flex-grow">
                        <strong className="text-slate-900 dark:text-slate-100 block leading-tight">Evaluasi Pajak Daerah APBD Jabar &amp; Penyesuaian Anggaran Sri Mulyani</strong>
                        <span className="text-slate-500 dark:text-slate-400 text-[10px]">Trending Score: 98.4 (Sangat Viral) — 14.5k Share</span>
                      </div>
                    </div>
                    <div className="p-3 border border-slate-200 dark:border-slate-850 rounded-lg bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300 flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0">#2</span>
                      <div className="flex-grow">
                        <strong className="text-slate-900 dark:text-slate-100 block leading-tight">Revitalisasi Transportasi Publik Bandung Raya Terintegrasi Kereta Cepat</strong>
                        <span className="text-slate-500 dark:text-slate-400 text-[10px]">Trending Score: 85.2 — 8.2k Share</span>
                      </div>
                    </div>
                    <div className="p-3 border border-slate-200 dark:border-slate-850 rounded-lg bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300 flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0">#3</span>
                      <div className="flex-grow">
                        <strong className="text-slate-900 dark:text-slate-100 block leading-tight">Peta Konflik &amp; Penguasaan Tata Ruang Lahan di Kawasan Lindung Bandung Utara</strong>
                        <span className="text-slate-500 dark:text-slate-400 text-[10px]">Trending Score: 74.9 — 5.1k Share</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 15. LATEST NEWS */}
              {activeFooterModal === 'latest-news' && (
                <div className="space-y-4">
                  <p>
                    Arus Berita Utama INFOBOS Next yang disajikan dalam urutan kronologis terbalik (paling baru dipublikasikan terlebih dahulu):
                  </p>
                  <div className="space-y-2 text-[11px]">
                    <div className="p-3 border rounded-lg bg-white hover:border-[#FFD700] transition cursor-pointer">
                      <span className="text-[9px] text-[#2B7A78] font-bold uppercase font-mono tracking-wider">Politik &amp; APBD • Baru Saja</span>
                      <h4 className="font-bold text-slate-900 mt-0.5">Sidang Paripurna DPRD Jabar Sepakat Ketuk Palu Kemitraan Infrastruktur Hijau Bandung Selatan</h4>
                    </div>
                    <div className="p-3 border rounded-lg bg-white hover:border-[#FFD700] transition cursor-pointer">
                      <span className="text-[9px] text-[#2B7A78] font-bold uppercase font-mono tracking-wider">Hukum &amp; Investigasi • 2 Jam Lalu</span>
                      <h4 className="font-bold text-slate-900 mt-0.5">Penelusuran Aliran Dana CSR BUMD Jawa Barat untuk Sektor Pariwisata Pedesaan</h4>
                    </div>
                    <div className="p-3 border rounded-lg bg-white hover:border-[#FFD700] transition cursor-pointer">
                      <span className="text-[9px] text-[#2B7A78] font-bold uppercase font-mono tracking-wider">Kesehatan &amp; Sosial • 5 Jam Lalu</span>
                      <h4 className="font-bold text-slate-900 mt-0.5">Dinas Kesehatan Luncurkan Aplikasi Deteksi Dini Stunting di Seluruh Posyandu Jabar</h4>
                    </div>
                  </div>
                </div>
              )}

              {/* 16. NEWS ARCHIVE */}
              {activeFooterModal === 'news-archive' && (
                <div className="space-y-4 text-left">
                  <p>
                    Gunakan penjelajah arsip di bawah ini untuk mencari berita, tajuk rencana, ulasan, atau data intelijen geospasial berdasarkan rentang bulan dan tahun rilis:
                  </p>
                  <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950/40 grid grid-cols-2 gap-3 text-[11px]">
                    <div>
                      <label className="block font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase">Pilih Tahun</label>
                      <select className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded px-2 py-1 focus:outline-none focus:border-[#2B7A78] dark:focus:border-teal-500">
                        <option className="bg-white dark:bg-slate-900">2026</option>
                        <option className="bg-white dark:bg-slate-900">2025</option>
                        <option className="bg-white dark:bg-slate-900">2024</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase">Pilih Bulan</label>
                      <select className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded px-2 py-1 focus:outline-none focus:border-[#2B7A78] dark:focus:border-teal-500">
                        <option className="bg-white dark:bg-slate-900">Juli</option>
                        <option className="bg-white dark:bg-slate-900">Juni</option>
                        <option className="bg-white dark:bg-slate-900">Mei</option>
                        <option className="bg-white dark:bg-slate-900">April</option>
                        <option className="bg-white dark:bg-slate-900">Maret</option>
                        <option className="bg-white dark:bg-slate-900">Februari</option>
                        <option className="bg-white dark:bg-slate-900">Januari</option>
                      </select>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert('Arsip Berhasil Disaring! Menampilkan 142 artikel pada rentang tersebut.')}
                    className="w-full py-2 bg-[#002B5B] dark:bg-teal-600 hover:bg-[#001f42] dark:hover:bg-teal-500 text-[#FFD700] dark:text-white font-bold text-xs rounded-lg transition"
                  >
                    Terapkan Filter Arsip &amp; Cari
                  </button>
                </div>
              )}

              {/* 17. RSS FEED */}
              {activeFooterModal === 'rss-feed' && (
                <div className="space-y-4 text-left">
                  <p>
                    INFOBOS Next menyediakan sindikasi konten XML/RSS Feed standar industri jurnalisme agar pembaca, agregator berita siber, dan mesin telusur dapat memantau kabar terkini secara instan:
                  </p>
                  <div className="space-y-3 text-[11px]">
                    <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <div>
                        <strong className="text-slate-900 dark:text-slate-100 block font-bold">Saluran Berita Utama (All News Feed)</strong>
                        <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">https://infobos.com/rss.xml</span>
                      </div>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText('https://infobos.com/rss.xml');
                          alert('Alamat RSS Utama disalin ke Clipboard!');
                        }}
                        className="px-2 py-1 bg-[#002B5B] dark:bg-teal-600 text-white hover:bg-opacity-95 dark:hover:bg-teal-500 font-bold rounded text-[10px] transition shrink-0 ml-2"
                      >
                        Copy URL
                      </button>
                    </div>
                    <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <div>
                        <strong className="text-slate-900 dark:text-slate-100 block font-bold">Sitemap Jurnalisme (Google News XML)</strong>
                        <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">https://infobos.com/news-sitemap.xml</span>
                      </div>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText('https://infobos.com/news-sitemap.xml');
                          alert('Alamat Google News Sitemap disalin ke Clipboard!');
                        }}
                        className="px-2 py-1 bg-[#002B5B] dark:bg-teal-600 text-white hover:bg-opacity-95 dark:hover:bg-teal-500 font-bold rounded text-[10px] transition shrink-0 ml-2"
                      >
                        Copy URL
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 18. SAAS PRICING */}
              {activeFooterModal === 'saas-pricing' && (
                <div className="space-y-5 text-left font-sans">
                  {selectedPlan ? (
                    <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 bg-slate-50 dark:bg-slate-950/40 space-y-4 animate-fade-in">
                      <div className="flex items-center justify-between border-b border-slate-150 dark:border-slate-800 pb-3">
                        <div>
                          <span className="text-[10px] text-teal-600 font-bold uppercase tracking-wide">Invoice Preview &amp; Konfirmasi</span>
                          <h4 className="font-display font-bold text-slate-800 dark:text-slate-200 text-sm">Paket Langganan {selectedPlan}</h4>
                        </div>
                        <button 
                          onClick={() => setSelectedPlan(null)}
                          className="text-[10px] text-slate-500 hover:underline"
                        >
                          &larr; Ganti Paket
                        </button>
                      </div>
                      
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Siklus Penagihan:</span>
                          <span className="font-semibold capitalize text-slate-800 dark:text-slate-200">{billingCycle === 'monthly' ? 'Bulanan' : 'Tahunan (Diskon 20%)'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Harga Dasar:</span>
                          <span className="font-mono text-slate-800 dark:text-slate-200">
                            {selectedPlan === 'Professional Analyst' 
                              ? (billingCycle === 'monthly' ? 'Rp 1.500.000 / bln' : 'Rp 1.200.000 / bln')
                              : (billingCycle === 'monthly' ? 'Rp 15.000.000 / bln' : 'Rp 12.000.000 / bln')
                            }
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Pajak PPN (11%):</span>
                          <span className="font-mono text-slate-800 dark:text-slate-200">
                            {selectedPlan === 'Professional Analyst' 
                              ? (billingCycle === 'monthly' ? 'Rp 165.000' : 'Rp 132.000')
                              : (billingCycle === 'monthly' ? 'Rp 1.650.000' : 'Rp 1.320.000')
                            }
                          </span>
                        </div>
                        <div className="border-t border-dashed border-slate-200 dark:border-slate-800 pt-2 flex justify-between font-bold text-sm">
                          <span className="text-slate-900 dark:text-slate-100">Total Tagihan Pertama:</span>
                          <span className="font-mono text-teal-600 dark:text-teal-400">
                            {selectedPlan === 'Professional Analyst'
                              ? (billingCycle === 'monthly' ? 'Rp 1.665.000' : 'Rp 14.784.000 (Setahun)')
                              : (billingCycle === 'monthly' ? 'Rp 16.650.000' : 'Rp 159.840.000 (Setahun)')
                            }
                          </span>
                        </div>
                      </div>

                      <div className="bg-amber-50 dark:bg-amber-950/25 border border-amber-200 dark:border-amber-900 rounded-lg p-3 text-[10px] text-amber-800 dark:text-amber-300">
                        <strong>Simulasi Platform:</strong> Menekan tombol di bawah ini akan menyimulasikan konfirmasi B2B/B2G instan dan menghasilkan lisensi data sandbox untuk sistem Anda.
                      </div>

                      <button
                        onClick={() => {
                          alert(`Transaksi berhasil! Lisensi sandbox untuk ${selectedPlan} telah diaktifkan di Client Gateway Anda.\nID Aktivasi: INFOBOS-KEY-${(Math.random()*1000000).toFixed(0)}`);
                          setSelectedPlan(null);
                        }}
                        className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-lg transition shadow-md flex items-center justify-center gap-2"
                      >
                        <CreditCard className="h-4 w-4" /> Konfirmasi Transaksi &amp; Aktifkan Sandbox
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-slate-500 text-[11px] leading-relaxed">
                        Dapatkan akses penuh ke ekosistem intelijen geospasial Jawa Barat, analisis tren sentimen NLP, monitoring data publik real-time, dan rilis pers terautomasi:
                      </p>

                      {/* Billing cycle selector */}
                      <div className="flex justify-center">
                        <div className="bg-slate-100 dark:bg-slate-950/60 p-1 rounded-lg inline-flex items-center gap-1 border">
                          <button
                            type="button"
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-3 py-1 text-[10px] font-bold rounded-md transition ${billingCycle === 'monthly' ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-xs' : 'text-slate-500'}`}
                          >
                            Bulanan
                          </button>
                          <button
                            type="button"
                            onClick={() => setBillingCycle('yearly')}
                            className={`px-3 py-1 text-[10px] font-bold rounded-md transition flex items-center gap-1 ${billingCycle === 'yearly' ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-xs' : 'text-slate-500'}`}
                          >
                            <span>Tahunan</span>
                            <span className="bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300 text-[8px] px-1.5 py-0.2 rounded-full font-bold uppercase">Hemat 20%</span>
                          </button>
                        </div>
                      </div>

                      {/* Pricing grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                        {/* Plan 1 */}
                        <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col space-y-3 hover:border-slate-300 transition">
                          <div>
                            <h5 className="font-bold text-slate-800 dark:text-slate-200">Basic Reader</h5>
                            <p className="text-[10px] text-slate-400">Untuk akses informasi umum siber.</p>
                          </div>
                          <div className="text-lg font-bold font-mono text-slate-800 dark:text-slate-200">
                            Rp 0 <span className="text-[10px] font-normal text-slate-400">/ selamanya</span>
                          </div>
                          <ul className="space-y-1.5 text-[10px] text-slate-500 flex-grow pt-2">
                            <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-teal-600 shrink-0" /> Akses berita umum &amp; regional</li>
                            <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-teal-600 shrink-0" /> Pencarian sitemap sederhana</li>
                            <li className="flex items-center gap-1.5 text-slate-400 dark:text-slate-600 font-normal"><X className="h-3.5 w-3.5" /> No Geospasial Spasial Map</li>
                            <li className="flex items-center gap-1.5 text-slate-400 dark:text-slate-600 font-normal"><X className="h-3.5 w-3.5" /> No NLP Sentimen Monitoring</li>
                          </ul>
                          <button 
                            onClick={() => alert('Anda sudah berada di paket Basic Reader!')}
                            className="w-full py-1.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-300 text-[10px] font-bold rounded-lg transition"
                          >
                            Paket Aktif Anda
                          </button>
                        </div>

                        {/* Plan 2 */}
                        <div className="border-2 border-[#FFD700] rounded-xl p-4 flex flex-col space-y-3 relative hover:scale-[1.01] transition bg-[#001733]/5 dark:bg-[#001733]/30">
                          <span className="absolute top-0 right-4 transform -translate-y-1/2 bg-[#FFD700] text-[#002B5B] font-extrabold text-[8px] uppercase px-2 py-0.5 rounded-full tracking-wider shadow-sm">
                            Terpopuler (Analis)
                          </span>
                          <div>
                            <h5 className="font-bold text-[#002B5B] dark:text-amber-400 flex items-center gap-1">
                              <Sparkles className="h-3.5 w-3.5 text-[#FFD700]" /> Professional Analyst
                            </h5>
                            <p className="text-[10px] text-slate-500">Riset mendalam &amp; monitoring regional.</p>
                          </div>
                          <div className="text-lg font-bold font-mono text-slate-800 dark:text-slate-200">
                            {billingCycle === 'monthly' ? 'Rp 1.500.000' : 'Rp 1.200.000'}{' '}
                            <span className="text-[10px] font-normal text-slate-400">/ bulan</span>
                          </div>
                          <ul className="space-y-1.5 text-[10px] text-slate-600 dark:text-slate-400 flex-grow pt-2">
                            <li className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200"><Check className="h-3.5 w-3.5 text-amber-500 shrink-0" /> Akses Full GeoOS Spasial Map</li>
                            <li className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200"><Check className="h-3.5 w-3.5 text-amber-500 shrink-0" /> NLP Sentiment Listening Unit</li>
                            <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-amber-500 shrink-0" /> Maksimal 5 User Akun Tim</li>
                            <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-amber-500 shrink-0" /> Laporan PDF Intelijen Bisnis</li>
                          </ul>
                          <button 
                            onClick={() => setSelectedPlan('Professional Analyst')}
                            className="w-full py-1.5 bg-[#FFD700] hover:bg-[#ffe240] text-[#002B5B] text-[10px] font-black rounded-lg transition shadow-xs uppercase"
                          >
                            Pilih Paket Analyst
                          </button>
                        </div>

                        {/* Plan 3 */}
                        <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col space-y-3 hover:border-slate-300 transition">
                          <div>
                            <h5 className="font-bold text-slate-800 dark:text-slate-200">Enterprise &amp; Gov</h5>
                            <p className="text-[10px] text-slate-400">Skala luas dinas &amp; holding company.</p>
                          </div>
                          <div className="text-lg font-bold font-mono text-slate-800 dark:text-slate-200">
                            {billingCycle === 'monthly' ? 'Rp 15.000.000' : 'Rp 12.000.000'}{' '}
                            <span className="text-[10px] font-normal text-slate-400">/ bulan</span>
                          </div>
                          <ul className="space-y-1.5 text-[10px] text-slate-500 flex-grow pt-2">
                            <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-teal-600 shrink-0" /> API Sindikasi Konten &amp; Raw Feed</li>
                            <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-teal-600 shrink-0" /> Integrasi Domain Mandiri (B2B)</li>
                            <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-teal-600 shrink-0" /> User Lisensi Tanpa Batas (Instansi)</li>
                            <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-teal-600 shrink-0" /> Dedicated Account Manager</li>
                          </ul>
                          <button 
                            onClick={() => setSelectedPlan('Enterprise & Gov')}
                            className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-bold rounded-lg transition"
                          >
                            Pilih Paket Enterprise
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 19. PARTNERSHIP PROGRAM */}
              {activeFooterModal === 'partnership-program' && (
                <div className="space-y-4 text-left font-sans">
                  {partnerSent ? (
                    <div className="py-6 text-center space-y-3 border border-emerald-200 rounded-xl bg-emerald-50/20 p-5">
                      <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <Check className="h-6 w-6" />
                      </div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Proposal Kemitraan Diterima!</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed max-w-sm mx-auto">
                        Terima kasih {partnerName}. Pengajuan kemitraan ({partnerType}) untuk <strong>{partnerCompany}</strong> telah terdaftar di meja kerjasama strategis INFOBOS Next.
                      </p>
                      <div className="bg-white dark:bg-slate-900 border p-2 rounded-lg font-mono text-[10px] text-slate-600 dark:text-slate-400 inline-block">
                        No Registrasi Kemitraan: <strong className="text-[#002B5B] dark:text-teal-400">PRT-2026-{(Math.random() * 10000).toFixed(0)}</strong>
                      </div>
                      <p className="text-[10px] text-slate-400">Tim Partnership kami akan menghubungi Anda di <strong>{partnerEmail}</strong> dalam waktu 1x24 jam kerja.</p>
                      <button 
                        onClick={() => setPartnerSent(false)}
                        className="mt-3 px-4 py-1.5 bg-[#002B5B] hover:bg-[#001f42] text-white text-[10px] font-bold rounded-lg transition"
                      >
                        Kirim Proposal Lain
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-slate-500 text-[11px] leading-relaxed">
                        Kami membuka peluang kemitraan strategis multi-sektor di seluruh 27 Kabupaten/Kota Jawa Barat untuk memperluas jangkauan jurnalisme siber silih asih asuh:
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="p-3 border dark:border-slate-800 rounded-xl bg-slate-50/60 dark:bg-slate-950/20 text-[10px]">
                          <strong className="text-slate-900 dark:text-slate-100 block mb-1">Sindikasi Media</strong>
                          Penyebaran rilis pers korporasi &amp; instansi resmi ke jaringan jurnalis regional siber.
                        </div>
                        <div className="p-3 border dark:border-slate-800 rounded-xl bg-slate-50/60 dark:bg-slate-950/20 text-[10px]">
                          <strong className="text-slate-900 dark:text-slate-100 block mb-1">Kemitraan Korporat &amp; PR</strong>
                          Penayangan rilis pers tahunan, CSR, pengumuman formal pemda, dan advertorial B2B.
                        </div>
                        <div className="p-3 border dark:border-slate-800 rounded-xl bg-slate-50/60 dark:bg-slate-950/20 text-[10px]">
                          <strong className="text-slate-900 dark:text-slate-100 block mb-1">Kontributor Data GeoOS</strong>
                          Kemitraan akademisi &amp; NGO dalam penyediaan dataset spasial wilayah terverifikasi.
                        </div>
                      </div>

                      {/* Partnership Form */}
                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (partnerName && partnerCompany && partnerEmail) {
                            setPartnerSent(true);
                          }
                        }}
                        className="border border-slate-150 dark:border-slate-850 p-4 rounded-xl bg-white dark:bg-slate-900/60 space-y-3 text-left"
                      >
                        <h5 className="font-bold text-slate-800 dark:text-slate-200 text-xs border-b pb-1.5 uppercase tracking-wide">Formulir Kemitraan Resmi</h5>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Nama Kontak Utama</label>
                            <input 
                              type="text" 
                              required
                              value={partnerName}
                              onChange={(e) => setPartnerName(e.target.value)}
                              placeholder="Nama lengkap Anda..."
                              className="w-full bg-slate-50 dark:bg-slate-950/40 border dark:border-slate-800 rounded px-2 py-1 text-xs focus:outline-none focus:border-teal-500"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Nama Perusahaan / Instansi</label>
                            <input 
                              type="text" 
                              required
                              value={partnerCompany}
                              onChange={(e) => setPartnerCompany(e.target.value)}
                              placeholder="PT / Instansi / Dinas..."
                              className="w-full bg-slate-50 dark:bg-slate-950/40 border dark:border-slate-800 rounded px-2 py-1 text-xs focus:outline-none focus:border-teal-500"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Surel Kemitraan (Email)</label>
                            <input 
                              type="email" 
                              required
                              value={partnerEmail}
                              onChange={(e) => setPartnerEmail(e.target.value)}
                              placeholder="kontak@perusahaan.com..."
                              className="w-full bg-slate-50 dark:bg-slate-950/40 border dark:border-slate-800 rounded px-2 py-1 text-xs focus:outline-none focus:border-teal-500"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Jenis Kemitraan</label>
                            <select 
                              value={partnerType}
                              onChange={(e) => setPartnerType(e.target.value)}
                              className="w-full bg-slate-50 dark:bg-slate-800 border dark:border-slate-800 rounded px-2 py-1 text-xs focus:outline-none focus:border-teal-500"
                            >
                              <option>Sindikasi Media Siber</option>
                              <option>Publikasi Corporate CSR</option>
                              <option>Sponsorship Kemitraan AdOS</option>
                              <option>Penyedia Dataset Spasial GeoOS</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Ringkasan Deskripsi Proposal Kemitraan</label>
                          <textarea 
                            rows={3}
                            required
                            value={partnerProposal}
                            onChange={(e) => setPartnerProposal(e.target.value)}
                            placeholder="Deskripsikan rencana kerjasama yang ingin dicapai secara ringkas..."
                            className="w-full bg-slate-50 dark:bg-slate-950/40 border dark:border-slate-800 rounded px-2 py-1 text-xs focus:outline-none focus:border-teal-500 resize-none"
                          ></textarea>
                        </div>

                        <button 
                          type="submit"
                          className="w-full py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded transition flex items-center justify-center gap-1.5 uppercase"
                        >
                          <Send className="h-3.5 w-3.5" /> Ajukan Kemitraan Strategis
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              )}

              {/* 20. ADVERTISE WITH US */}
              {activeFooterModal === 'advertise-with-us' && (
                <div className="space-y-4 text-left font-sans">
                  {advSent ? (
                    <div className="py-6 text-center space-y-3 border border-emerald-200 rounded-xl bg-emerald-50/20 p-5">
                      <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <Check className="h-6 w-6" />
                      </div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Pesanan Slot Iklan Diajukan!</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed max-w-sm mx-auto">
                        Terima kasih <strong>{advName}</strong>. Pengajuan pemesanan slot iklan <strong>{advPlacement}</strong> sebanyak <strong>{advImpressions.toLocaleString('id-ID')} Impresi</strong> berhasil didaftarkan.
                      </p>
                      
                      <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-white dark:bg-slate-900 text-xs text-left space-y-2 max-w-md mx-auto">
                        <div className="flex justify-between border-b pb-1 font-bold">
                          <span>Detail Estimasi Booking:</span>
                          <span className="text-teal-600">ADV-{(Math.random() * 10000).toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span>Penempatan Banner:</span>
                          <span>{advPlacement}</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span>Total Estimasi Impresi:</span>
                          <span>{advImpressions.toLocaleString('id-ID')} Views</span>
                        </div>
                        <div className="flex justify-between text-[11px] font-bold">
                          <span>Estimasi Nilai Kontrak Iklan:</span>
                          <span className="font-mono text-amber-600">
                            Rp {(advImpressions * (advPlacement === 'Homepage Banner' ? 50 : advPlacement === 'Contextual Sponsored Content' ? 100 : 150)).toLocaleString('id-ID')}
                          </span>
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-400">Tim AdOS Sales kami akan mengirimkan Rate Card Invoice dan panduan aset visual ke email <strong>{advEmail}</strong> Anda.</p>
                      <button 
                        onClick={() => setAdvSent(false)}
                        className="mt-3 px-4 py-1.5 bg-[#002B5B] hover:bg-[#001f42] text-white text-[10px] font-bold rounded-lg transition"
                      >
                        Ganti Kalkulasi Booking
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-slate-500 text-[11px] leading-relaxed">
                        Manfaatkan daya jangkau portal berita terfokus regional pertama di Jabar dengan algoritma AdOS. Hitung estimasi investasi kampanye Anda secara langsung menggunakan simulator di bawah ini:
                      </p>

                      {/* Interactive budget simulator */}
                      <div className="border border-slate-200 dark:border-slate-800 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 space-y-4">
                        <h5 className="font-bold text-slate-800 dark:text-slate-200 text-xs border-b pb-1 flex items-center gap-1.5 uppercase">
                          <Calculator className="h-4 w-4 text-teal-600" /> Simulator Anggaran Iklan AdOS Jabar
                        </h5>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Pilih Penempatan Iklan (Placement)</label>
                              <select 
                                value={advPlacement}
                                onChange={(e) => setAdvPlacement(e.target.value)}
                                className="w-full bg-white dark:bg-slate-800 border dark:border-slate-800 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-teal-500"
                              >
                                <option>Homepage Banner</option>
                                <option>Contextual Sponsored Content</option>
                                <option>Geo-Targeted Spasial Ad</option>
                              </select>
                              <span className="text-[9px] text-slate-400 mt-1 block">
                                {advPlacement === 'Homepage Banner' && 'Banner display premium 728x90 / 300x250 di halaman beranda siber.'}
                                {advPlacement === 'Contextual Sponsored Content' && 'Artikel bersponsor kontekstual rujukan silang AI.'}
                                {advPlacement === 'Geo-Targeted Spasial Ad' && 'Sematkan pin logo komersial di peta interaktif GeoOS Jabar.'}
                              </span>
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 flex justify-between">
                                <span>Target Volume Penayangan (Impresi)</span>
                                <span className="font-mono text-teal-600 font-bold">{advImpressions.toLocaleString('id-ID')} Views</span>
                              </label>
                              <input 
                                type="range" 
                                min={10000}
                                max={500000}
                                step={10000}
                                value={advImpressions}
                                onChange={(e) => setAdvImpressions(Number(e.target.value))}
                                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-600"
                              />
                              <div className="flex justify-between text-[8px] text-slate-400 font-mono mt-0.5">
                                <span>10K Views</span>
                                <span>250K Views</span>
                                <span>500K Views</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3">
                            <div className="space-y-2">
                              <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wide">Hasil Simulasi Anggaran</span>
                              <div className="text-2xl font-bold font-mono text-slate-800 dark:text-slate-200">
                                Rp {(advImpressions * (advPlacement === 'Homepage Banner' ? 50 : advPlacement === 'Contextual Sponsored Content' ? 100 : 150)).toLocaleString('id-ID')}{' '}
                                <span className="text-[10px] font-normal text-slate-400">Nett</span>
                              </div>
                              <p className="text-[9px] text-slate-400 leading-relaxed">
                                *Tarif estimasi dihitung berdasarkan CPM (Cost per Thousand Impressions) premium Jabar:{' '}
                                {advPlacement === 'Homepage Banner' && 'Rp 50.000 / 1.000 Tayang'}
                                {advPlacement === 'Contextual Sponsored Content' && 'Rp 100.000 / 1.000 Tayang'}
                                {advPlacement === 'Geo-Targeted Spasial Ad' && 'Rp 150.000 / 1.000 Tayang'}
                              </p>
                            </div>

                            {/* Booking contact */}
                            <form 
                              onSubmit={(e) => {
                                e.preventDefault();
                                if (advName && advEmail) {
                                  setAdvSent(true);
                                }
                              }}
                              className="border-t pt-3 space-y-2 text-left"
                            >
                              <div className="grid grid-cols-2 gap-2">
                                <input 
                                  type="text" 
                                  required
                                  placeholder="Nama Brand/Pengiklan"
                                  value={advName}
                                  onChange={(e) => setAdvName(e.target.value)}
                                  className="w-full bg-slate-50 dark:bg-slate-950/40 border dark:border-slate-800 rounded px-2 py-1 text-[10px] focus:outline-none focus:border-teal-500"
                                />
                                <input 
                                  type="email" 
                                  required
                                  placeholder="Email Marketing"
                                  value={advEmail}
                                  onChange={(e) => setAdvEmail(e.target.value)}
                                  className="w-full bg-slate-50 dark:bg-slate-950/40 border dark:border-slate-800 rounded px-2 py-1 text-[10px] focus:outline-none focus:border-teal-500"
                                />
                              </div>
                              <button 
                                type="submit"
                                className="w-full py-1.5 bg-[#002B5B] hover:bg-[#001f42] text-white font-bold text-[10px] rounded transition uppercase tracking-wide"
                              >
                                Ajukan Booking Kampanye Iklan
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 21. CAREERS */}
              {activeFooterModal === 'careers' && (
                <div className="space-y-4 text-left font-sans">
                  {applicantSent ? (
                    <div className="py-6 text-center space-y-3 border border-emerald-200 rounded-xl bg-emerald-50/20 p-5">
                      <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <Check className="h-6 w-6" />
                      </div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Lamaran Kerja Terkirim!</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed max-w-sm mx-auto">
                        Halo {applicantName}, terima kasih telah melamar untuk posisi <strong>{selectedJob}</strong> di Meja Redaksi INFOBOS Next.
                      </p>
                      
                      <div className="bg-white dark:bg-slate-900 border p-2.5 rounded-lg font-mono text-[10px] text-slate-600 dark:text-slate-400 inline-block">
                        ID Pelacakan Lamaran: <strong className="text-[#002B5B] dark:text-teal-400">JOB-2026-{(Math.random() * 10000).toFixed(0)}</strong>
                      </div>

                      <p className="text-[10px] text-slate-400 leading-relaxed">Pemberitahuan seleksi berkas administrasi pertama akan dikirimkan ke email <strong>{applicantEmail}</strong> Anda dalam waktu maksimal 7 hari kerja.</p>
                      
                      <button 
                        onClick={() => {
                          setApplicantSent(false);
                          setSelectedJob(null);
                        }}
                        className="mt-3 px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-bold rounded-lg transition"
                      >
                        Kembali ke Daftar Karir
                      </button>
                    </div>
                  ) : selectedJob ? (
                    <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 bg-white dark:bg-slate-900/60 space-y-3 animate-fade-in">
                      <div className="flex justify-between items-center border-b pb-2">
                        <div>
                          <span className="text-[9px] text-teal-600 font-bold uppercase tracking-wider">Formulir Pendaftaran Karir</span>
                          <h4 className="font-bold text-slate-800 dark:text-slate-200 text-xs md:text-sm">Posisi: {selectedJob}</h4>
                        </div>
                        <button 
                          onClick={() => setSelectedJob(null)}
                          className="text-[10px] text-slate-500 hover:underline"
                        >
                          &larr; Lihat Posisi Lain
                        </button>
                      </div>

                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (applicantName && applicantEmail) {
                            setApplicantSent(true);
                          }
                        }}
                        className="space-y-3 text-left"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Nama Lengkap Pelamar</label>
                            <input 
                              type="text" 
                              required
                              value={applicantName}
                              onChange={(e) => setApplicantName(e.target.value)}
                              placeholder="Masukkan nama lengkap..."
                              className="w-full bg-slate-50 dark:bg-slate-950/40 border dark:border-slate-800 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-teal-500"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Surel Pribadi (Email)</label>
                            <input 
                              type="email" 
                              required
                              value={applicantEmail}
                              onChange={(e) => setApplicantEmail(e.target.value)}
                              placeholder="emailanda@gmail.com..."
                              className="w-full bg-slate-50 dark:bg-slate-950/40 border dark:border-slate-800 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-teal-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Tautan CV / Portfolio Online</label>
                          <input 
                            type="url" 
                            required
                            value={applicantCvUrl}
                            onChange={(e) => setApplicantCvUrl(e.target.value)}
                            placeholder="https://drive.google.com/file/... atau https://linkedin.com/in/..."
                            className="w-full bg-slate-50 dark:bg-slate-950/40 border dark:border-slate-800 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-teal-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Surat Pengantar Singkat (Motivation Letter)</label>
                          <textarea 
                            rows={3}
                            required
                            placeholder="Uraikan singkat mengapa Anda tertarik bergabung di Redaksi INFOBOS Next..."
                            className="w-full bg-slate-50 dark:bg-slate-950/40 border dark:border-slate-800 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-teal-500 resize-none"
                          ></textarea>
                        </div>

                        <button 
                          type="submit"
                          className="w-full py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded transition flex items-center justify-center gap-1.5 uppercase"
                        >
                          <Send className="h-3.5 w-3.5" /> Kirim Berkas Lamaran Pekerjaan
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-slate-500 text-[11px] leading-relaxed">
                        Kami mengundang Anda, para inovator, desainer data, analis geospasial, dan jurnalis kredibel untuk membangun masa depan jurnalisme siber silih asih asuh Jawa Barat:
                      </p>

                      <div className="space-y-2.5">
                        {/* Job 1 */}
                        <div className="p-4 border dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950/20 flex flex-col md:flex-row md:items-center justify-between gap-3 text-left">
                          <div className="space-y-1">
                            <h5 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 text-xs">
                              <Briefcase className="h-4 w-4 text-teal-600" /> Jurnalis Investigasi Lapangan (Field Investigator)
                            </h5>
                            <div className="flex gap-2 text-[9px] text-slate-400 font-semibold font-mono">
                              <span>📍 BANDUNG, SUMEDANG, BEKASI</span>
                              <span>• FULL-TIME</span>
                              <span>• MIN. 2 TAHUN PENGALAMAN</span>
                            </div>
                            <p className="text-[10px] text-slate-500 leading-normal">
                              Melakukan pelaporan mendalam mengenai APBD, tata kelola kehutanan Jabar, dan investigasi independen regulasi pemda.
                            </p>
                          </div>
                          <button 
                            onClick={() => setSelectedJob('Jurnalis Investigasi Lapangan')}
                            className="px-4 py-1.5 bg-teal-600 hover:bg-teal-500 text-white text-[10px] font-bold rounded-lg transition uppercase tracking-wide shrink-0"
                          >
                            Lamar Sekarang
                          </button>
                        </div>

                        {/* Job 2 */}
                        <div className="p-4 border dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950/20 flex flex-col md:flex-row md:items-center justify-between gap-3 text-left">
                          <div className="space-y-1">
                            <h5 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 text-xs">
                              <Layers className="h-4 w-4 text-teal-600" /> GIS Map Data Analyst (Analis Data Spasial)
                            </h5>
                            <div className="flex gap-2 text-[9px] text-slate-400 font-semibold font-mono">
                              <span>📍 HEADQUARTERS BANDUNG</span>
                              <span>• FULL-TIME</span>
                              <span>• PREFER S1 GEOGRAFI/TEKNIK</span>
                            </div>
                            <p className="text-[10px] text-slate-500 leading-normal">
                              Mengelola data spasial GeoJSON di GeoOS, menyusun peta sebaran infrastruktur, dan analisis data anomali spasial.
                            </p>
                          </div>
                          <button 
                            onClick={() => setSelectedJob('GIS Map Data Analyst')}
                            className="px-4 py-1.5 bg-teal-600 hover:bg-teal-500 text-white text-[10px] font-bold rounded-lg transition uppercase tracking-wide shrink-0"
                          >
                            Lamar Sekarang
                          </button>
                        </div>

                        {/* Job 3 */}
                        <div className="p-4 border dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950/20 flex flex-col md:flex-row md:items-center justify-between gap-3 text-left">
                          <div className="space-y-1">
                            <h5 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 text-xs">
                              <Users className="h-4 w-4 text-teal-600" /> Asisten Analis Media &amp; NLP (Internship)
                            </h5>
                            <div className="flex gap-2 text-[9px] text-slate-400 font-semibold font-mono">
                              <span>📍 REMOTE OK</span>
                              <span>• INTERNSHIP (6 BULAN)</span>
                              <span>• PREFER MAHASISWA AKHIR</span>
                            </div>
                            <p className="text-[10px] text-slate-500 leading-normal">
                              Mendukung tim listening NLP dalam melacak sentimen publik, melatih model klasifikasi tag topik daerah, dan merangkum rilis humas.
                            </p>
                          </div>
                          <button 
                            onClick={() => setSelectedJob('Asisten Analis Media & NLP (Internship)')}
                            className="px-4 py-1.5 bg-teal-600 hover:bg-teal-500 text-white text-[10px] font-bold rounded-lg transition uppercase tracking-wide shrink-0"
                          >
                            Lamar Sekarang
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeFooterModal === 'kontak' && (
                <div className="space-y-4">
                  {contactSent ? (
                    <div className="py-6 text-center space-y-3">
                      <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <Check className="h-6 w-6" />
                      </div>
                      <h4 className="font-bold text-slate-800 text-sm">Pesan Berhasil Terkirim!</h4>
                      <p className="text-slate-500 text-xs leading-relaxed max-w-sm mx-auto">
                        Pesan Anda telah kami teruskan secara real-time ke sistem penanganan surat redaksi INFOBOS Next.
                      </p>
                      <div className="bg-slate-50 border p-2 rounded font-mono text-[10px] text-slate-600 inline-block">
                        ID Tiket Pengaduan: <strong className="text-[#002B5B]">INFOBOS-2026-{(Math.random() * 10000).toFixed(0)}</strong>
                      </div>
                    </div>
                  ) : (
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (contactName && contactEmail && contactMsg) {
                          setContactSent(true);
                        }
                      }}
                      className="space-y-3.5 text-left"
                    >
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1 uppercase">Nama Lengkap</label>
                        <input 
                          type="text" 
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Masukkan nama lengkap Anda..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#2B7A78]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1 uppercase">Surel / Email</label>
                        <input 
                          type="email" 
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="Masukkan email untuk balasan redaksi..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#2B7A78]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1 uppercase">Pesan / Laporan Pengaduan</label>
                        <textarea 
                          rows={4}
                          required
                          value={contactMsg}
                          onChange={(e) => setContactMsg(e.target.value)}
                          placeholder="Tuliskan pesan, ralat, hak jawab, atau aduan pemberitaan secara jelas di sini..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#2B7A78] resize-none"
                        ></textarea>
                      </div>
                      <button 
                        type="submit"
                        className="w-full py-2.5 bg-[#002B5B] hover:bg-[#001f42] text-white font-bold text-xs rounded-lg transition shadow-xs flex items-center justify-center gap-2"
                      >
                        <Send className="h-3.5 w-3.5" /> Kirim Pesan ke Meja Redaksi
                      </button>
                    </form>
                  )}
                </div>
              )}

            </div>

          </div>
        </div>
      )}

      {/* Scroll to Top FAB (Desktop Only, Mobile handles in PopUpWidget) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className={`hidden md:flex fixed ${
              isWidgetOpen || isAiAssistantOpen
                ? "bottom-[540px]"
                : "bottom-[94px]"
            } right-4 z-50 p-2.5 bg-[#002B5B] hover:bg-[#2B7A78] text-[#FFD700] hover:text-white rounded-full shadow-2xl border border-[#FFD700]/30 hover:border-[#FFD700] transition-all duration-300 cursor-pointer items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50`}
            title="Kembali ke Atas"
          >
            <ChevronUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>

      <PopUpWidget 
        activeArticleSlug={activeArticleSlug} 
        showScrollTop={showScrollTop}
        scrollToTop={scrollToTop}
      />

      {/* Modern Fixed Bottom Navigation Bar for Mobile View */}
      <BottomNavigation
        currentTab={currentTab}
        onTabChange={handleTabChange}
        onToggleExplorer={() => setIsExplorerOpen(!isExplorerOpen)}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        topicPreferences={topicPreferences}
        onSaveTopicPreferences={handleSaveTopicPreferences}
        isDark={isDark}
      />
    </div>
  );
}
