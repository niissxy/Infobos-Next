import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, BarChart2, DollarSign, Target, Settings, Layers, Clock, Users, ArrowUpRight, Percent, Shield, Zap } from 'lucide-react';

interface AdOSDashboardProps {
  campaigns: any[];
  totalSponsorRevenue: number;
  performanceTrend: any[];
  devicesShare: any[];
  fillRatesByPage: any[];
  onApplyOpt?: (optId: string) => void;
  appliedOpts?: string[];
  updateCampaignStatus: (id: string, status: string) => void;
}

export default function AdOSDashboard({
  campaigns,
  totalSponsorRevenue,
  performanceTrend,
  devicesShare,
  fillRatesByPage,
  onApplyOpt,
  appliedOpts = [],
  updateCampaignStatus
}: AdOSDashboardProps) {
  
  const totalImpressions = campaigns.reduce((acc, curr) => acc + (curr.impressions || 0), 0);
  const totalClicks = campaigns.reduce((acc, curr) => acc + (curr.clicks || 0), 0);
  const averageCtr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0.00';

  return (
    <div className="space-y-6">
      {/* 4 Core Financial & Engagement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition duration-200">
          <div className="flex justify-between items-center text-slate-400 dark:text-slate-500">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Total Ad Revenue</span>
            <div className="p-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-2">
            Rp {totalSponsorRevenue.toLocaleString('id-ID')}
          </h3>
          <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5 mt-1 font-mono">
            <ArrowUpRight className="h-3 w-3" /> +18.4% vs last quarter
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition duration-200">
          <div className="flex justify-between items-center text-slate-400 dark:text-slate-500">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Total Impressions</span>
            <div className="p-1.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-lg">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-2">
            {totalImpressions.toLocaleString('id-ID')}
          </h3>
          <span className="text-[9px] text-blue-600 dark:text-blue-400 font-bold flex items-center gap-0.5 mt-1 font-mono">
            <ArrowUpRight className="h-3 w-3" /> +12.1% organic growth
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition duration-200">
          <div className="flex justify-between items-center text-slate-400 dark:text-slate-500">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Active Clicks</span>
            <div className="p-1.5 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-lg">
              <Target className="h-4 w-4" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-2">
            {totalClicks.toLocaleString('id-ID')}
          </h3>
          <span className="text-[9px] text-amber-600 dark:text-amber-400 font-bold flex items-center gap-0.5 mt-1 font-mono">
            <Percent className="h-3 w-3" /> CTR Ratio: {averageCtr}%
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition duration-200">
          <div className="flex justify-between items-center text-slate-400 dark:text-slate-500">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Fill Rate index</span>
            <div className="p-1.5 bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 rounded-lg">
              <Layers className="h-4 w-4" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-2">
            79.2%
          </h3>
          <span className="text-[9px] text-teal-600 dark:text-teal-400 font-bold flex items-center gap-0.5 mt-1 font-mono">
            <Shield className="h-3 w-3" /> 100% Safe Ad Delivery
          </span>
        </div>
      </div>

      {/* Analytics Visualization Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-2xs space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-slate-100">Performance Trend & CPM Yield</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Hourly dynamic tracking of premium advertising placements.</p>
            </div>
            <span className="text-[9px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold px-2 py-0.5 rounded uppercase">Real-Time</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceTrend}>
                <defs>
                  <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2B7A78" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2B7A78" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="stroke-slate-200 dark:stroke-slate-850" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="impressions" stroke="#2B7A78" strokeWidth={2.5} fillOpacity={1} fill="url(#colorImpressions)" name="Impressions" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Media Inventory Health Chart */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-slate-100">Placements Fill Rate</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Utilization index per major sections.</p>
            </div>
            <div className="space-y-3">
              {fillRatesByPage.slice(0, 5).map((fp) => (
                <div key={fp.page} className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span>{fp.page}</span>
                    <span className="font-mono text-[11px] text-slate-900 dark:text-slate-100">{fp.rate}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${
                        fp.rate > 85 ? 'from-indigo-600 dark:from-indigo-500 to-blue-500' :
                        fp.rate > 60 ? 'from-[#2B7A78] to-teal-500' :
                        'from-amber-500 to-amber-600'
                      }`} 
                      style={{ width: `${fp.rate}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-slate-100 dark:border-slate-800 pt-3 text-[10px] text-slate-400 dark:text-slate-500 font-semibold leading-relaxed flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-amber-500" />
            <span>Optimal capacity reached for main channels.</span>
          </div>
        </div>
      </div>

      {/* Campaigns Overview Queue */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-2xs text-left">
        <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3.5 mb-4">
          <div>
            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-slate-100">Active Ad Campaigns Queue</h4>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">View performance metrics and change statuses of direct brand campaigns.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-slate-600 dark:text-slate-300 divide-y divide-slate-200 dark:divide-slate-800 font-semibold">
            <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[10px] text-left">
              <tr>
                <th className="px-4 py-3">Campaign Name & Client</th>
                <th className="px-4 py-3">Format / Placement</th>
                <th className="px-4 py-3">Budget Details</th>
                <th className="px-4 py-3 text-center">Impressions</th>
                <th className="px-4 py-3 text-center">Clicks / CTR</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-right">Moderation Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-850 text-left">
              {campaigns.map((cp) => (
                <tr key={cp.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                  <td className="px-4 py-3">
                    <span className="block font-bold text-slate-900 dark:text-slate-100">{cp.name}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block mt-0.5">Sponsor: {cp.advertiser || cp.sponsorName || 'Unknown Partner'}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                      {String(cp.placement || 'inline').toUpperCase().replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">Rp {cp.budget.toLocaleString('id-ID')}</span>
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 block font-bold font-mono">
                      {cp.startAt} / {cp.endAt}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center font-mono font-bold text-slate-700 dark:text-slate-300">
                    {(cp.impressions || 0).toLocaleString('id-ID')}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="block font-mono font-bold text-slate-800 dark:text-slate-200">{(cp.clicks || 0).toLocaleString('id-ID')}</span>
                    <span className="block font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                      {cp.impressions > 0 ? ((cp.clicks / cp.impressions) * 100).toFixed(2) : '0.00'}% CTR
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                      cp.status === 'Running' || cp.status === 'active' ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400' :
                      cp.status === 'Approved' ? 'bg-blue-100 dark:bg-blue-950/50 text-blue-800 dark:text-blue-400' :
                      cp.status === 'Completed' || cp.status === 'expired' ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400' :
                      'bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-400'
                    }`}>
                      {cp.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex gap-1.5 justify-end">
                      {cp.status === 'Review' && (
                        <>
                          <button
                            onClick={() => updateCampaignStatus(cp.id, 'Approved')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[9px] px-2.5 py-1 rounded transition"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateCampaignStatus(cp.id, 'Revision')}
                            className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-[9px] px-2.5 py-1 rounded transition"
                          >
                            Revise
                          </button>
                        </>
                      )}
                      {cp.status === 'Approved' && (
                        <button
                          onClick={() => updateCampaignStatus(cp.id, 'Running')}
                          className="bg-[#002B5B] dark:bg-indigo-900 hover:bg-[#001f42] dark:hover:bg-indigo-950 text-white font-bold text-[9px] px-2.5 py-1 rounded transition"
                        >
                          Activate
                        </button>
                      )}
                      {(cp.status === 'Running' || cp.status === 'active') && (
                        <button
                          onClick={() => updateCampaignStatus(cp.id, 'Completed')}
                          className="border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-[9px] px-2.5 py-1 rounded transition"
                        >
                          Pause
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
