import React from 'react';
import { Layers, Shield, Sparkles, UserCheck, HelpCircle, Layout } from 'lucide-react';

interface PortalSwitcherProps {
  userRole: string;
  activePortal: string;
  onPortalChange: (portal: string) => void;
  // Extreme Usability simulated role helpers
  simulatedRole: string;
  onSimulatedRoleChange: (role: string) => void;
}

export const ALL_ROLES = [
  'guest', 'member', 'premium', 'subscriber', 'reporter', 'photographer', 'videographer', 
  'editor', 'chief_editor', 'factchecker', 'moderator', 'creator', 'influencer', 
  'advertiser', 'sales', 'agency', 'corporate', 'researcher', 'government', 
  'support', 'finance', 'hr', 'developer', 'system_admin', 'super_admin', 'owner'
];

export const PORTALS = [
  { id: 'public', name: 'Public Portal', desc: 'Situs berita, media, iklan, rate card, sitemap' },
  { id: 'member', name: 'Member Portal', desc: 'Bookmarks, riwayat, preferensi, lencana, rewards' },
  { id: 'creator', name: 'Creator Portal', desc: 'Workspace menulis naskah, video, podcast, pendapatan' },
  { id: 'reporter', name: 'Journalist Portal', desc: 'Workspace jurnalis, penugasan, draf kasar, lokasi' },
  { id: 'editor', name: 'Editor Portal', desc: 'Editorial review, fact checking, persetujuan berita' },
  { id: 'advertiser', name: 'Advertiser Portal', desc: 'AdOS kampanye iklan, deposit, CTR, rate card' },
  { id: 'sales', name: 'Partner Portal', desc: 'Sertifikasi partner, CRM, komisi harian, AI Copywriter, admin control' },
  { id: 'business', name: 'Business Portal', desc: 'Halaman profil perusahaan, sentimen brand, promosi' },
  { id: 'marketplace', name: 'Marketplace Portal', desc: 'Sellers dashboard, listing produk UMKM, pesanan, inventori' },
  { id: 'community', name: 'Community Portal', desc: 'Forum warga, grup paguyuban, agenda event, leaderboard, achievements' },
  { id: 'research', name: 'Research Portal', desc: 'Dataset terbuka, download riset kebijakan publik' },
  { id: 'government', name: 'Government Portal', desc: 'Diseminasi kebijakan publik, rilis pers, hoax buster' },
  { id: 'monitoring', name: 'Enterprise Portal', desc: 'Sentinel AI sentiment tracking, alerts, geopolitik' },
  { id: 'developer', name: 'Developer Portal', desc: 'Konsol penguji API, server metrics, logs, query db' },
  { id: 'support', name: 'Support Portal', desc: 'Help desk, tiket troubleshooting, live chat support, FAQ' },
  { id: 'moderator', name: 'Moderator Portal', desc: 'Audit logs, persetujuan komentar, penanganan spam, suspensi' },
  { id: 'finance', name: 'Finance Portal', desc: 'Manajemen 23 model bisnis, payout, perpajakan, invoice' },
  { id: 'cms', name: 'Admin Portal', desc: 'VIRALOG manajemen naskah, kategori, tag, users' },
  { id: 'super_admin', name: 'Super Admin Portal', desc: 'Konsol root, keamanan, routes protection, API, logs' }
];

export const PORTAL_ACCESS_MAPPING: Record<string, string[]> = {
  super_admin: ['public', 'member', 'creator', 'reporter', 'editor', 'advertiser', 'sales', 'business', 'marketplace', 'community', 'research', 'government', 'monitoring', 'developer', 'support', 'moderator', 'finance', 'cms', 'super_admin'],
  owner: ['public', 'member', 'creator', 'reporter', 'editor', 'advertiser', 'sales', 'business', 'marketplace', 'community', 'research', 'government', 'monitoring', 'developer', 'support', 'moderator', 'finance', 'cms', 'super_admin'],
  system_admin: ['public', 'member', 'support', 'moderator', 'cms', 'developer', 'super_admin'],
  developer: ['public', 'member', 'developer', 'super_admin'],
  managing_editor: ['public', 'member', 'reporter', 'editor', 'cms', 'moderator'],
  editor: ['public', 'member', 'editor', 'cms', 'moderator'],
  chief_editor: ['public', 'member', 'editor', 'cms', 'moderator'],
  reporter: ['public', 'member', 'reporter'],
  photographer: ['public', 'member', 'reporter'],
  videographer: ['public', 'member', 'reporter'],
  moderator: ['public', 'member', 'editor', 'cms', 'moderator'],
  factchecker: ['public', 'member', 'editor'],
  creator: ['public', 'member', 'creator'],
  influencer: ['public', 'member', 'creator'],
  advertiser: ['public', 'member', 'advertiser'],
  sales: ['public', 'member', 'sales', 'advertiser', 'marketplace'],
  agency: ['public', 'member', 'advertiser', 'sales', 'marketplace'],
  corporate: ['public', 'member', 'business', 'marketplace'],
  researcher: ['public', 'member', 'research'],
  government: ['public', 'member', 'government', 'research', 'monitoring'],
  support: ['public', 'member', 'cms', 'support', 'developer', 'super_admin'],
  finance: ['public', 'member', 'finance', 'sales', 'advertiser', 'marketplace'],
  hr: ['public', 'member', 'cms'],
  member: ['public', 'member', 'community', 'marketplace'],
  premium: ['public', 'member', 'community', 'marketplace'],
  subscriber: ['public', 'member', 'community', 'marketplace'],
  guest: ['public']
};

export default function PortalSwitcher({
  userRole,
  activePortal,
  onPortalChange,
  simulatedRole,
  onSimulatedRoleChange
}: PortalSwitcherProps) {
  // Normalize current role
  const currentRole = simulatedRole || userRole || 'guest';
  const allowedPortals = PORTAL_ACCESS_MAPPING[currentRole] || ['public'];

  return (
    <div className="bg-slate-900 text-white border-b border-white/10 py-3.5 sticky top-12 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
        
        {/* Left: Switcher title */}
        <div className="flex items-center gap-2.5">
          <div className="bg-gradient-to-tr from-[#FFD700] to-amber-500 text-slate-950 p-2 rounded-lg shadow-inner">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-white/10 text-[#FFD700] border border-[#FFD700]/30 px-1.5 py-0.2 rounded font-mono font-bold uppercase">
                Active Portal Switcher
              </span>
              <span className="text-[10px] text-slate-400 font-medium">RBAC / PBAC Enforced</span>
            </div>
            <h2 className="text-xs font-black text-white leading-tight mt-2.5 uppercase tracking-wide">
              Gerbang Portal: <span className="text-[#FFD700]">{activePortal.replace('_', ' ')} Portal</span>
            </h2>
          </div>
        </div>

        {/* Right: Controls & simulated role Matrix tool */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Simulated role simulator (Extreme Usability helper) */}
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-2 py-1">
            <span className="text-[9px] text-slate-400 font-mono font-bold uppercase tracking-wider">Simulasi Role:</span>
            <select
              value={currentRole}
              onChange={(e) => {
                onSimulatedRoleChange(e.target.value);
                // Switch to default public or first allowed portal to prevent route exception
                const firstAllowed = PORTAL_ACCESS_MAPPING[e.target.value]?.[0] || 'public';
                onPortalChange(firstAllowed);
              }}
              className="bg-slate-950 border-0 text-xs text-[#FFD700] font-bold focus:outline-none focus:ring-0 rounded py-0.5 cursor-pointer max-w-[150px]"
            >
              {ALL_ROLES.map(r => (
                <option key={r} value={r} className="bg-slate-900 text-white font-sans capitalize">
                  {r.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Portal Switch Dropdown */}
          <div className="flex items-center gap-1.5 bg-[#001733] border border-white/10 rounded-lg px-2 py-1">
            <span className="text-[9px] text-slate-400 font-mono font-bold uppercase tracking-wider">Pilih Portal:</span>
            <select
              value={activePortal}
              onChange={(e) => {
                const target = e.target.value;
                if (allowedPortals.includes(target)) {
                  onPortalChange(target);
                } else {
                  alert(`Role Anda (${currentRole}) tidak diizinkan masuk ke ${target.toUpperCase()} PORTAL.`);
                }
              }}
              className="bg-slate-950 border-0 text-xs text-white font-bold focus:outline-none focus:ring-0 rounded py-0.5 cursor-pointer"
            >
              {PORTALS.map(p => {
                const isAllowed = allowedPortals.includes(p.id);
                return (
                  <option 
                    key={p.id} 
                    value={p.id} 
                    disabled={!isAllowed}
                    className={`${isAllowed ? 'text-white' : 'text-slate-500 bg-slate-900'} bg-slate-900`}
                  >
                    {p.name} {!isAllowed ? '🔒 (Ditolak)' : '✓ (Diizinkan)'}
                  </option>
                );
              })}
            </select>
          </div>

        </div>

      </div>
    </div>
  );
}
