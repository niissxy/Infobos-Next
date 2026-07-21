import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, BarChart2, ShieldCheck, Database, Calendar, Users, DollarSign, Target, Settings, Sliders, RefreshCw, Layers, CheckCircle, Clock, MapPin, Smartphone, Monitor, Briefcase, FileText, Send, Check, AlertCircle, Sparkles, Eye, Lock, Shield, Layout, Globe, Star
} from 'lucide-react';

import AdOSDashboard from './AdOSDashboard';
import AdOSDisplayBanners from './AdOSDisplayBanners';
import AdOSNativeContextual from './AdOSNativeContextual';
import AdOSSocialAds from './AdOSSocialAds';
import AdOSDirectories from './AdOSDirectories';
import AdOSAffiliatesPayments from './AdOSAffiliatesPayments';
import AdOSMediaKit from './AdOSMediaKit';
import AdOSSecuritySEO from './AdOSSecuritySEO';

interface AdOSPortalProps {
  user: any;
  token: string;
  onNavigateToCategory?: (slug: string) => void;
}

export default function AdOSPortal({ user, token, onNavigateToCategory }: AdOSPortalProps) {
  // Navigation tabs inside AdOS
  const [activeModule, setActiveModule] = useState<'dashboard' | 'display' | 'native' | 'social' | 'directories' | 'affiliates' | 'media-kit' | 'security'>('dashboard');
  
  // Database State simulation loaded from real /api or simulated locally
  const [campaigns, setCampaigns] = useState<any[]>([
    { id: 'cp-01', name: 'Jabar Digital Innovation Summit', advertiser: 'Diskominfo Jabar', startAt: '2026-06-01', endAt: '2026-07-01', budget: 15000000, status: 'Running', placement: 'top_leaderboard', impressions: 45030, clicks: 1250, ctr: 2.77, reach: 38200 },
    { id: 'cp-02', name: 'Rupiah Stablecoin Launch', advertiser: 'Bank Indonesia', startAt: '2026-05-15', endAt: '2026-06-30', budget: 25000000, status: 'Running', placement: 'sidebar_sticky', impressions: 120500, clicks: 3840, ctr: 3.18, reach: 98000 },
    { id: 'cp-03', name: 'Smart SME Accelerator', advertiser: 'Bank BJB', startAt: '2026-07-05', endAt: '2026-08-05', budget: 10000000, status: 'Approved', placement: 'in_feed', impressions: 0, clicks: 0, ctr: 0, reach: 0 },
    { id: 'cp-04', name: 'Green Hydrogen Green Future', advertiser: 'Pertamina Corp', startAt: '2026-06-10', endAt: '2026-07-10', budget: 50000000, status: 'Review', placement: 'pre_roll', impressions: 0, clicks: 0, ctr: 0, reach: 0 },
    { id: 'cp-05', name: 'Ultra Fast Cloud Hosting Campaign', advertiser: 'Biznet Cloud', startAt: '2026-04-10', endAt: '2026-05-10', budget: 8500000, status: 'Completed', placement: 'footer_billboard', impressions: 68400, clicks: 1980, ctr: 2.89, reach: 59000 },
  ]);

  const [rateCards, setRateCards] = useState<any[]>([
    { id: 'rc-1', placement: 'Top Leaderboard', page: 'Homepage', position: 'Header', format: 'Billboard Banner', size: '970x250', priceCPM: 45000, priceCPC: 1200, priceFlat: 15000000, avail: 'Available', minBooking: '3 Days' },
    { id: 'rc-2', placement: 'Sticky Header Banner', page: 'All Pages', position: 'Top Sticky', format: 'Standard Banner', size: '728x90', priceCPM: 35000, priceCPC: 900, priceFlat: 8000000, avail: 'Available', minBooking: '1 Week' },
    { id: 'rc-3', placement: 'Sidebar Sticky', page: 'Category & Article', position: 'Right Sidebar', format: 'Half Page', size: '300x600', priceCPM: 40000, priceCPC: 1050, priceFlat: 12000000, avail: 'Booked', minBooking: '5 Days' },
    { id: 'rc-4', placement: 'After Paragraph 2', page: 'Article Page', position: 'Mid Content', format: 'Medium Rectangle', size: '300x250', priceCPM: 30000, priceCPC: 800, priceFlat: 6000000, avail: 'Available', minBooking: '1 Day' },
    { id: 'rc-5', placement: 'Pre Roll Video', page: 'Video Page', position: 'Before Video Play', format: 'Instream Video Ad', size: '1920x1080 (15s)', priceCPM: 85000, priceCPC: 2500, priceFlat: 20000000, avail: 'Reserved', minBooking: '3 Days' },
    { id: 'rc-6', placement: 'Episode Sponsor', page: 'Podcast Page', position: 'Audio Playback', format: 'Dynamic Audio Ad', size: '30s Audio Slot', priceCPM: 75000, priceCPC: 2200, priceFlat: 18000000, avail: 'Available', minBooking: '5 Days' }
  ]);

  const [audits, setAudits] = useState<any[]>([
    { id: 'aud-01', action: 'CREATE_CAMPAIGN', actorName: user?.fullName || 'Ahmad', actorId: user?.id || 'admin-01', entityName: 'Campaign', entityId: 'cp-03', timestamp: Date.now() - 3600000 * 2, newValues: { name: 'Smart SME Accelerator', budget: 10000000 } },
    { id: 'aud-02', action: 'UPDATE_RATE_CARD', actorName: user?.fullName || 'Ahmad', actorId: user?.id || 'admin-01', entityName: 'RateCard', entityId: 'rc-1', timestamp: Date.now() - 3600000 * 24, newValues: { priceFlat: 15000000 } },
    { id: 'aud-03', action: 'BLOCK_IP_SPAM', actorName: 'Security System', actorId: 'system', entityName: 'Firewall', entityId: 'ip-192.168.1.104', timestamp: Date.now() - 3600000 * 48, newValues: { reason: 'Excessive Click Fraud attempts detected' } },
  ]);

  // Analytics graph mock data
  const performanceTrend = [
    { name: '01 Jun', impressions: 45000, clicks: 1200, revenue: 1450000 },
    { name: '05 Jun', impressions: 68000, clicks: 1950, revenue: 2100000 },
    { name: '10 Jun', impressions: 92000, clicks: 2800, revenue: 3200000 },
    { name: '15 Jun', impressions: 125000, clicks: 3980, revenue: 4100000 },
    { name: '20 Jun', impressions: 168000, clicks: 5120, revenue: 5400000 },
    { name: '25 Jun', impressions: 189000, clicks: 6150, revenue: 6540000 }
  ];

  const devicesShare = [
    { name: 'Desktop Users', value: 48, color: '#002B5B' },
    { name: 'Mobile Users', value: 44, color: '#2B7A78' },
    { name: 'Tablet Users', value: 8, color: '#FFD700' }
  ];

  const fillRatesByPage = [
    { page: 'Homepage', rate: 94, booked: 28, total: 30 },
    { page: 'Article Page', rate: 76, booked: 38, total: 50 },
    { page: 'Category View', rate: 65, booked: 13, total: 20 },
    { page: 'Video Hub', rate: 88, booked: 22, total: 25 },
    { page: 'Podcast Page', rate: 52, booked: 13, total: 25 },
    { page: 'Short Videos', rate: 45, booked: 9, total: 20 }
  ];

  const updateCampaignStatus = (campaignId: string, nextStatus: string) => {
    setCampaigns(campaigns.map(cp => {
      if (cp.id === campaignId) {
        return { ...cp, status: nextStatus };
      }
      return cp;
    }));
    // Record audit
    const campaignObj = campaigns.find(item => item.id === campaignId);
    const newAudit = {
      id: `aud-${Date.now()}`,
      action: 'UPDATE_CAMPAIGN_STATUS',
      actorName: user?.fullName || 'Ahmad',
      actorId: user?.id || 'admin-01',
      entityName: 'Campaign',
      entityId: campaignId,
      timestamp: Date.now(),
      newValues: { name: campaignObj?.name, status: nextStatus }
    };
    setAudits([newAudit, ...audits]);
  };

  const totalSponsorRevenue = campaigns.reduce((acc, c) => acc + (c.status === 'Running' || c.status === 'Completed' ? c.budget : 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left font-sans">
      
      {/* Brand Header & Tagline */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 dark:border-slate-800 pb-6 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-[#002B5B] dark:bg-indigo-950 text-white dark:text-indigo-300 font-mono text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">Enterprise Suite</span>
            <span className="text-[#2B7A78] dark:text-[#3e9c99] font-bold text-xs flex items-center gap-1">
              <Sparkles className="h-3 w-3 animate-pulse" /> Active AdOS Engine
            </span>
          </div>
          <h1 className="font-display font-black text-3xl text-[#002B5B] dark:text-slate-100 tracking-tight mt-1">
            Advertising Operating System <span className="text-[#2B7A78] dark:text-[#3e9c99]">(AdOS)</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-medium leading-relaxed mt-0.5 max-w-2xl">
            Sistem ekosistem monetisasi terlengkap untuk Digital News Portal, Media Intelligence, Directory, dan Trend Analytics. Manajemen modern berbasis iFrame asynchronous aman dan Core Web Vitals compliant.
          </p>
        </div>

        {/* Global Financial Quick View */}
        <div className="flex gap-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 shadow-2xs text-left">
            <span className="text-[9px] font-mono font-bold uppercase text-slate-400 dark:text-slate-500 block">Total Revenue</span>
            <h4 className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
              Rp {totalSponsorRevenue.toLocaleString('id-ID')}
            </h4>
          </div>
          <div className="bg-[#002B5B] dark:bg-indigo-950 text-white rounded-xl px-4 py-3 shadow-2xs text-left border border-transparent dark:border-slate-800">
            <span className="text-[9px] font-mono font-bold uppercase text-slate-300 dark:text-indigo-300 block">Active Advertisers</span>
            <h4 className="text-lg font-black text-[#FFD700] dark:text-yellow-400 mt-0.5">
              {campaigns.length} Partners
            </h4>
          </div>
        </div>
      </div>

      {/* Primary AdOS Module Navigation Bar */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto whitespace-nowrap gap-1">
        {[
          { id: 'dashboard', name: 'Dashboard & Metrics', icon: BarChart2, desc: 'CPM Performance & Campaigns' },
          { id: 'display', name: 'Display Banners', icon: Layout, desc: '16 Placements & Targeting' },
          { id: 'native', name: 'Native & Contextual AI', icon: Target, desc: 'Sponsored Story & Matching' },
          { id: 'social', name: 'Social Embeds', icon: Smartphone, desc: 'Reels, YouTube Shorts, Spotify' },
          { id: 'directories', name: 'Directories Console', icon: Star, desc: '11 Directories, 9 List Styles' },
          { id: 'affiliates', name: 'Billing & Affiliates', icon: DollarSign, desc: 'Agoda, Niagahoster, QRIS VA' },
          { id: 'media-kit', name: 'Rate Card & Media Kit', icon: FileText, desc: 'Public Kit & Custom Quotation' },
          { id: 'security', name: 'SEO & Security Logs', icon: Shield, desc: 'Bot prevention & Audit Trail' }
        ].map((module) => {
          const Icon = module.icon;
          return (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id as any)}
              className={`flex items-start gap-2.5 px-4 py-3.5 border-b-2 transition text-left cursor-pointer ${
                activeModule === module.id 
                  ? 'border-[#2B7A78] dark:border-[#3e9c99] text-[#2B7A78] dark:text-[#3e9c99] bg-[#2B7A78]/5 dark:bg-[#2B7A78]/10 font-bold' 
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="h-4.5 w-4.5 shrink-0 mt-0.5 text-[#2B7A78] dark:text-[#3e9c99]" />
              <div>
                <div className="text-xs font-bold tracking-wide">{module.name}</div>
                <div className="text-[9px] font-medium text-slate-400 dark:text-slate-500 font-mono mt-0.5">{module.desc}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* RENDER ACTIVE MODULE CONTENT */}
      <div className="space-y-6">
        {activeModule === 'dashboard' && (
          <AdOSDashboard 
            campaigns={campaigns} 
            totalSponsorRevenue={totalSponsorRevenue} 
            performanceTrend={performanceTrend} 
            devicesShare={devicesShare} 
            fillRatesByPage={fillRatesByPage} 
            updateCampaignStatus={updateCampaignStatus} 
          />
        )}

        {activeModule === 'display' && (
          <AdOSDisplayBanners />
        )}

        {activeModule === 'native' && (
          <AdOSNativeContextual />
        )}

        {activeModule === 'social' && (
          <AdOSSocialAds />
        )}

        {activeModule === 'directories' && (
          <AdOSDirectories />
        )}

        {activeModule === 'affiliates' && (
          <AdOSAffiliatesPayments />
        )}

        {activeModule === 'media-kit' && (
          <AdOSMediaKit 
            rateCards={rateCards} 
            setRateCards={setRateCards} 
            performanceTrend={performanceTrend} 
            devicesShare={devicesShare} 
          />
        )}

        {activeModule === 'security' && (
          <AdOSSecuritySEO audits={audits} />
        )}
      </div>

    </div>
  );
}
