import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, Cpu, Layers, Activity, Lock, CheckCircle, RefreshCw } from 'lucide-react';

interface AdOSSecuritySEOProps {
  audits: any[];
}

export default function AdOSSecuritySEO({ audits }: AdOSSecuritySEOProps) {
  const [activeTab, setActiveTab] = useState<'seo' | 'security' | 'audit-logs'>('seo');
  const [ipToBlock, setIpToBlock] = useState<string>('');
  const [blockedIps, setBlockedIps] = useState<string[]>(['192.168.1.104', '180.245.12.98']);

  const handleBlockIp = (e: React.FormEvent) => {
    e.preventDefault();
    if (ipToBlock && !blockedIps.includes(ipToBlock)) {
      setBlockedIps([...blockedIps, ipToBlock]);
      setIpToBlock('');
    }
  };

  const handleUnblockIp = (ip: string) => {
    setBlockedIps(blockedIps.filter(item => item !== ip));
  };

  return (
    <div className="space-y-6 text-left">
      {/* Subtabs menu */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        {[
          { id: 'seo', name: 'SEO & Core Web Vitals Diagnostics' },
          { id: 'security', name: 'Security & Click Fraud Protection' },
          { id: 'audit-logs', name: 'Chronological Audit Log Trail' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 font-bold text-xs border-b-2 transition ${
              activeTab === tab.id 
                ? 'border-[#2B7A78] text-[#2B7A78]' 
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* SUBTAB 1: SEO & Core Web Vitals */}
      {activeTab === 'seo' && (
        <div className="space-y-6">
          <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-300 p-4 rounded-xl flex gap-3 items-start">
            <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <h5 className="font-bold text-xs text-emerald-900 dark:text-emerald-300">Core Web Vitals Compliance Passed!</h5>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400 leading-relaxed font-sans">
                Advertising tags do not block initial rendering or affect Cumulative Layout Shift (CLS). Dynamic size wrappers are locked to prevent content jumping on client viewport.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs font-semibold">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-2">
              <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 block uppercase font-bold">Largest Contentful Paint (LCP)</span>
              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-black text-slate-900 dark:text-slate-100 font-mono">1.2s</span>
                <span className="text-emerald-600 text-[10px] font-bold">EXCELLENT (FAST)</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-normal leading-relaxed pt-1 font-sans">
                Lazy loaded background resources and async code modules guarantee the hero title is rendered in milliseconds.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-2">
              <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 block uppercase font-bold">Cumulative Layout Shift (CLS)</span>
              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-black text-slate-900 dark:text-slate-100 font-mono">0.02</span>
                <span className="text-emerald-600 text-[10px] font-bold">EXCELLENT (NO SHIFT)</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-normal leading-relaxed pt-1 font-sans">
                Ad placement spaces have locked height aspects. Banners fill the pre-configured space, avoiding content jumping.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-2">
              <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 block uppercase font-bold">Google Discover Guidelines</span>
              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-black text-[#002B5B] dark:text-teal-400 font-mono">100%</span>
                <span className="text-emerald-600 text-[10px] font-bold">FULL COMPLIANCE</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-normal leading-relaxed pt-1 font-sans">
                Structured meta schemas, AMP links, high resolution banners, and non-intrusive interstitials comply with Discover specs.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: Click Fraud & Security Audit */}
      {activeTab === 'security' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-2xs space-y-4 text-xs font-semibold">
            <div>
              <h4 className="font-display font-bold text-sm text-[#002B5B] dark:text-teal-400">Anti Click-Fraud Protection Console</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal font-sans">
                Real-time bot pattern blocking, excessive CTR click prevention, and automatic IP ban triggers.
              </p>
            </div>

            <div className="space-y-2 font-sans">
              {[
                { title: 'Click Spam Rate Limiter', status: 'Active', val: 'Max 3 clicks / IP / hour' },
                { title: 'Intelligent Bot Pattern Detection', status: 'Active', val: 'Scans browser canvas footprint' },
                { title: 'IP Location Cross-Match SLA', status: 'Active', val: 'Verifies GPS alignment on click' }
              ].map((sec, idx) => (
                <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-150 dark:border-slate-850 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-xs block">{sec.title}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-0.5">{sec.val}</span>
                  </div>
                  <span className="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 text-[9px] font-bold px-2 py-0.5 rounded font-mono uppercase">
                    {sec.status}
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={handleBlockIp} className="pt-3 border-t border-slate-150 dark:border-slate-800 space-y-2 font-sans">
              <label className="block text-slate-700 dark:text-slate-300 font-bold text-xs">Manual IP Blocking Console:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="e.g. 192.168.1.105"
                  value={ipToBlock}
                  onChange={(e) => setIpToBlock(e.target.value)}
                  className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 focus:outline-none focus:border-rose-500 dark:text-slate-100"
                />
                <button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-1.5 rounded-lg transition">
                  Block IP Address
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-5 bg-slate-900 text-slate-100 rounded-2xl p-5 shadow-2xs space-y-4 text-xs font-mono">
            <div className="border-b border-slate-800 pb-2">
              <h4 className="font-display font-bold text-sm text-white">Blocked IP Registers</h4>
              <p className="text-[9px] text-slate-400 leading-normal">These IPs are blacklisted from sending ad click logs.</p>
            </div>

            <div className="space-y-1.5 max-h-44 overflow-y-auto">
              {blockedIps.map((ip) => (
                <div key={ip} className="flex justify-between items-center p-2 bg-slate-950 rounded-lg border border-slate-800">
                  <span>{ip}</span>
                  <button
                    onClick={() => handleUnblockIp(ip)}
                    className="text-rose-400 hover:text-rose-300 font-bold font-sans text-[10px]"
                  >
                    Unblock
                  </button>
                </div>
              ))}
            </div>
            
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex gap-2 text-[10px] text-slate-400">
              <ShieldCheck className="h-4.5 w-4.5 text-teal-400 shrink-0" />
              <span>Fraud clicks are logged, but not aggregated into campaigns or billed to advertisers.</span>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: Chronological Security Audit Log */}
      {activeTab === 'audit-logs' && (
        <div className="space-y-4 text-left font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 text-slate-100 p-5 rounded-2xl space-y-4">
            <h3 className="font-display font-extrabold text-sm text-teal-400 flex items-center gap-1.5">
              <ShieldCheck className="h-5 w-5 text-teal-400" />
              Chronological Security Audit Trail
            </h3>
            
            <div className="space-y-2 max-h-96 overflow-y-auto divide-y divide-slate-800 pr-2">
              {audits.slice(0, 15).map((log) => (
                <div key={log.id} className="pt-2 pb-1 text-[11px] leading-relaxed">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                    <span>ID: {log.id}</span>
                    <span>{new Date(log.timestamp).toLocaleString('id-ID')}</span>
                  </div>
                  <div>
                    <span className="text-amber-400 font-bold">[{log.action}]</span>{' '}
                    oleh <span className="text-teal-300 font-bold">{log.actorName}</span>{' '}
                    (ID: {log.actorId}) di tabel{' '}
                    <span className="text-slate-300 font-bold">{log.entityName}</span>{' '}
                    (ID: {log.entityId})
                  </div>
                  {log.newValues && (
                    <div className="text-slate-400 mt-1 bg-slate-850 p-1.5 rounded text-[10px] leading-tight">
                      Detail: {JSON.stringify(log.newValues)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
