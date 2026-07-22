import React, { useState } from 'react';
import { 
  Compass, Shield, User, LogOut, ArrowLeftRight, ChevronRight, 
  Home, Activity, Database, Cpu, Terminal, Sparkles, Layers, RefreshCw
} from 'lucide-react';
import { motion } from 'motion/react';

// Import portal components for mapping
import MemberPortal from './MemberPortal';
import CreatorPortal from './CreatorPortal';
import PartnerOS from './PartnerOS';
import { 
  ReporterPortal, EditorPortal, AdvertiserPortal, SalesPortal, 
  BusinessPortal, ResearchPortal, MonitoringPortal, CMSPortal, SuperAdminPortal,
  DeveloperPortal, FinancePortal, GovernmentPortal
} from './EnterprisePortals';
import {
  MarketplacePortal, CommunityPortal, CustomerSupportPortal, ModeratorPortal
} from './NewEnterprisePortals';

export const portalNameMap: Record<string, string> = {
  member: 'Member Portal',
  creator: 'Creator Portal',
  reporter: 'Journalist Portal',
  editor: 'Editor Portal',
  advertiser: 'Advertiser Portal',
  sales: 'Partner Portal',
  business: 'Business Portal',
  marketplace: 'Marketplace Portal',
  community: 'Community Portal',
  research: 'Research Portal',
  government: 'Government Portal',
  monitoring: 'Enterprise Portal',
  developer: 'Developer Portal',
  support: 'Support Portal',
  moderator: 'Moderator Portal',
  finance: 'Finance Portal',
  cms: 'Admin Portal',
  super_admin: 'Super Admin Portal'
};

export const portalComponentMap: Record<string, React.ComponentType<any>> = {
  member: MemberPortal,
  creator: CreatorPortal,
  reporter: ReporterPortal,
  editor: EditorPortal,
  advertiser: AdvertiserPortal,
  sales: PartnerOS,
  business: BusinessPortal,
  research: ResearchPortal,
  monitoring: MonitoringPortal,
  marketplace: MarketplacePortal,
  community: CommunityPortal,
  support: CustomerSupportPortal,
  moderator: ModeratorPortal,
  cms: CMSPortal,
  super_admin: SuperAdminPortal,
  developer: DeveloperPortal,
  finance: FinancePortal,
  government: GovernmentPortal
};

interface PortalShellProps {
  activePortal: string;
  user: any;
  simulatedRole: string;
  onPortalChange: (portal: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export default function PortalShell({
  activePortal,
  user,
  simulatedRole,
  onPortalChange,
  onLogout,
  children
}: PortalShellProps) {
  const currentRole = simulatedRole || user?.role || 'guest';
  const [metrics, setMetrics] = useState({
    cpu: '14.2%',
    memory: '246MB / 512MB',
    dbConn: 'Active',
    cache: '99.2% Hit Rate'
  });

  const handleRefreshMetrics = () => {
    setMetrics({
      cpu: `${(10 + Math.random() * 15).toFixed(1)}%`,
      memory: `${Math.floor(220 + Math.random() * 40)}MB / 512MB`,
      dbConn: 'Active',
      cache: `${(98 + Math.random() * 2).toFixed(1)}% Hit Rate`
    });
  };

  // Human-readable portal names
  const portalName = portalNameMap[activePortal] || activePortal.replace('_', ' ') + ' Portal';

  return (
    <div className="min-h-screen bg-[#f1f5f9] dark:bg-[#030712] flex flex-col font-sans text-slate-900 dark:text-slate-100 selection:bg-slate-800 selection:text-white">
      
      {/* 1. INTERNAL PLATFORM HEADER / TOPBAR */}
      <header className="bg-slate-950 text-white border-b border-white/10 px-6 py-3.5 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Brand & Breadcrumbs */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="bg-gradient-to-tr from-sky-500 to-[#002B5B] p-2 rounded-xl text-white shadow-inner">
              <Shield className="h-5 w-5" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                <span>INFOBOS</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-[#FFD700] font-bold">INTERNAL PORTAL</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-white">{portalName}</span>
              </div>
              <h1 className="text-sm font-black text-white leading-none mt-1 uppercase tracking-wide flex items-center gap-1.5">
                {portalName} 
                <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
              </h1>
            </div>
          </div>

          {/* User Profile & Exit Button */}
          <div className="flex flex-wrap items-center gap-4 self-end sm:self-auto">
            
            {/* User Session Info */}
            <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl flex items-center gap-2.5 text-left text-xs">
              <div className="bg-slate-800 p-1 rounded-lg text-slate-300">
                <User className="h-3.5 w-3.5" />
              </div>
              <div>
                <div className="font-bold text-slate-200">{user?.fullName || 'Internal Staff'}</div>
                <div className="text-[10px] text-[#FFD700] font-mono uppercase font-bold">{currentRole.replace('_', ' ')}</div>
              </div>
            </div>

            {/* Back to Public Portal Button */}
            <button 
              onClick={() => onPortalChange('public')}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-black text-xs rounded-xl shadow-md transition duration-200 uppercase tracking-wider"
            >
              <Compass className="h-4 w-4" />
              <span>Keluar Ke Publik</span>
            </button>

            {/* Logout Button */}
            <button 
              onClick={onLogout}
              className="p-2 bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-white/10 hover:border-rose-500/30 rounded-xl transition duration-200"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>

          </div>

        </div>
      </header>

      {/* 2. REAL-TIME SYSTEM DIAGNOSTICS BAR */}
      <section className="bg-slate-900 dark:bg-[#000814] text-slate-400 border-b border-slate-800 dark:border-white/5 px-6 py-2">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-[11px] font-mono gap-2 text-left">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-[9px] bg-sky-950 border border-sky-800 text-sky-400 px-2 py-0.5 rounded font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Activity className="h-3 w-3 text-sky-400" /> Sentinel Diagnostics
            </span>
            <span>CPU: <strong className="text-white">{metrics.cpu}</strong></span>
            <span>Mem: <strong className="text-white">{metrics.memory}</strong></span>
            <span>Database: <strong className="text-emerald-400">{metrics.dbConn}</strong></span>
            <span>Cache: <strong className="text-sky-400">{metrics.cache}</strong></span>
          </div>
          <button 
            onClick={handleRefreshMetrics}
            className="flex items-center gap-1 hover:text-white transition-colors py-0.5"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Force System Sync</span>
          </button>
        </div>
      </section>

      {/* 3. MAIN WORKSPACE */}
      <div className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-[#001f42] border border-slate-200 dark:border-white/10 rounded-3xl p-6 md:p-8 min-h-[600px] shadow-sm text-left relative overflow-hidden"
        >
          {/* Subtle background branding accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#002B5B]/5 to-transparent rounded-full -mr-32 -mt-32 pointer-events-none" />
          
          {children}
        </motion.div>
      </div>

      {/* 4. PROFESSIONAL INTERNAL FOOTER */}
      <footer className="bg-slate-900 dark:bg-[#000814] text-slate-500 border-t border-slate-800 dark:border-white/5 py-6 text-center text-xs font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 INFOBOS Enterprise Platform. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 transition cursor-help">SLA: 99.99%</span>
            <span>•</span>
            <span className="hover:text-slate-400 transition cursor-help">ISO/IEC 27001</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
