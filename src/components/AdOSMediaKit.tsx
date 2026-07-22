import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Calendar, Users, DollarSign, Target, Settings, Sliders, RefreshCw, FileText, Send, Check, Download, Map, HelpCircle, Award } from 'lucide-react';

interface AdOSMediaKitProps {
  rateCards: any[];
  setRateCards: React.Dispatch<React.SetStateAction<any[]>>;
  performanceTrend: any[];
  devicesShare: any[];
}

export default function AdOSMediaKit({
  rateCards,
  setRateCards,
  performanceTrend,
  devicesShare
}: AdOSMediaKitProps) {
  const [isEditingRateId, setIsEditingRateId] = useState<string | null>(null);
  const [editingRateValue, setEditingRateValue] = useState<number>(0);
  
  // Proposal Form State
  const [proposalSubmitted, setProposalSubmitted] = useState(false);
  const [proposalForm, setProposalForm] = useState({ name: '', email: '', company: '', budget: '10M - 50M', msg: '' });

  return (
    <div className="space-y-8 text-left text-slate-700 dark:text-slate-300">
      
      {/* 1. Demographics & Public Profile Statistics */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xs space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="font-display font-bold text-lg text-[#002B5B] dark:text-teal-400">INFOBOS Media Kit & Audience Penetration 2026</h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-sans">Verified readership metrics and pageviews index for corporate proposals.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-semibold">
          {[
            { title: 'Monthly Uniques', val: '2.4M', desc: 'Readership base verified by Dewan Pers.' },
            { title: 'Page Views', val: '18.2M', desc: 'Monthly advertising impression potential.' },
            { title: 'Avg. Engagement Time', val: '4.8 Min', desc: 'Average article scroll duration.' },
            { title: 'Bounce Rate Index', val: '28%', desc: 'Highly engaged target reader base.' }
          ].map((stat) => (
            <div key={stat.title} className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-150 dark:border-slate-850">
              <span className="text-slate-400 dark:text-slate-500 font-mono text-[9px] uppercase font-bold block">{stat.title}</span>
              <h4 className="text-xl font-black text-[#002B5B] dark:text-teal-400 mt-1.5 font-display">{stat.val}</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-normal leading-relaxed mt-1 font-sans">{stat.desc}</p>
            </div>
          ))}
        </div>

        {/* Audience Devices & Traffic Trend chart */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
          <div className="md:col-span-8 space-y-3">
            <h4 className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500 font-mono">Monthly Traffic Penetration (Pageviews)</h4>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceTrend}>
                  <defs>
                    <linearGradient id="colorPvKit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2B7A78" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#2B7A78" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="impressions" stroke="#2B7A78" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPvKit)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500 font-mono">Device Share Index</h4>
            <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-slate-150 dark:border-slate-850 flex flex-col justify-between h-56 text-xs font-semibold">
              <div className="space-y-3">
                {devicesShare.map((dev) => (
                  <div key={dev.name} className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: dev.color }} />
                      <span className="text-slate-700 dark:text-slate-300 font-medium font-sans">{dev.name}</span>
                    </div>
                    <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{dev.value}%</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-200 dark:border-slate-800 pt-3 text-[10px] text-slate-400 dark:text-slate-500 leading-normal font-normal font-sans">
                High concentration of premium corporate executives and decision makers in major cities.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Rate Card Management */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 dark:border-slate-800 pb-3 gap-2">
          <div>
            <h3 className="font-display font-bold text-base text-[#002B5B] dark:text-teal-400">Interactive Premium Rate Cards</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-sans">Customize price guidelines for self-service or corporate agencies.</p>
          </div>
          <button 
            onClick={() => {
              const newRate = {
                id: `rc-${Date.now()}`,
                placement: 'New Custom Banner',
                page: 'All Pages',
                position: 'Custom position',
                format: 'Leaderboard',
                size: '728x90',
                priceCPM: 32000,
                priceCPC: 750,
                priceFlat: 5000000,
                avail: 'Available',
                minBooking: '2 Days'
              };
              setRateCards([...rateCards, newRate]);
            }}
            className="bg-[#2B7A78] hover:bg-[#1e5856] text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5"
          >
            + Add New Custom Rate Card
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs font-semibold text-slate-700 dark:text-slate-300 divide-y divide-slate-200 dark:divide-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[9px] text-left font-sans">
              <tr>
                <th className="px-4 py-3">Slot Placement</th>
                <th className="px-4 py-3">Halaman / Posisi</th>
                <th className="px-4 py-3">Format / Ukuran</th>
                <th className="px-4 py-3">Price (CPM)</th>
                <th className="px-4 py-3">Price (CPC)</th>
                <th className="px-4 py-3">Price Flat (Bulanan)</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans">
              {rateCards.map((rc) => (
                <tr key={rc.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/50 transition">
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-slate-100 font-display">{rc.placement}</td>
                  <td className="px-4 py-3 font-normal">
                    <span className="block font-semibold">{rc.page}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">{rc.position}</span>
                  </td>
                  <td className="px-4 py-3 font-mono">
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded text-[9px] uppercase font-bold">{rc.format}</span>
                    <span className="block text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{rc.size}</span>
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-slate-800 dark:text-slate-200">
                    Rp {rc.priceCPM.toLocaleString('id-ID')}
                  </td>
                  <td className="px-4 py-3 font-mono font-semibold text-slate-600 dark:text-slate-400">
                    Rp {rc.priceCPC.toLocaleString('id-ID')}
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-emerald-600">
                    {isEditingRateId === rc.id ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={editingRateValue}
                          onChange={(e) => setEditingRateValue(Number(e.target.value))}
                          className="w-24 px-1.5 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 dark:text-slate-100 rounded font-bold text-xs"
                        />
                        <button
                          onClick={() => {
                            setRateCards(rateCards.map(item => item.id === rc.id ? { ...item, priceFlat: editingRateValue } : item));
                            setIsEditingRateId(null);
                          }}
                          className="bg-emerald-600 text-white p-1 rounded hover:bg-emerald-700"
                        >
                          <Check className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>Rp {rc.priceFlat.toLocaleString('id-ID')}</span>
                        <button
                          onClick={() => {
                            setIsEditingRateId(rc.id);
                            setEditingRateValue(rc.priceFlat);
                          }}
                          className="text-slate-400 dark:text-slate-500 hover:text-[#2B7A78] dark:hover:text-teal-400 text-[10px] font-bold"
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-[8px] uppercase font-black ${
                      rc.avail === 'Available' ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300' :
                      rc.avail === 'Booked' ? 'bg-rose-100 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300' :
                      'bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300'
                    }`}>
                      {rc.avail}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setRateCards(rateCards.filter(item => item.id !== rc.id))}
                      className="text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 transition text-[10px]"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Interactive Quotation & Proposal Request Builder */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xs space-y-4">
          <div>
            <h3 className="font-display font-bold text-base text-[#002B5B] dark:text-teal-400">Get Customized Partnership Proposal</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs">Fill details below and we will automatically output quotation, contracts, and sitemap maps.</p>
          </div>

          {proposalSubmitted ? (
            <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-5 text-center text-emerald-800 dark:text-emerald-300 space-y-2 py-8">
              <Check className="h-8 w-8 text-emerald-600 mx-auto" />
              <span className="font-bold text-sm block">Proposal Generated! ✓</span>
              <span className="text-xs block leading-relaxed">
                Our automated corporate proposal including sitemap, customized contract agreements, and quotation files has been generated and simulated below.
              </span>
              <button
                onClick={() => setProposalSubmitted(false)}
                className="text-teal-600 font-bold underline block mt-2 text-xs mx-auto"
              >
                Create another proposal
              </button>
            </div>
          ) : (
            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Full Name:</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={proposalForm.name}
                    onChange={(e) => setProposalForm({ ...proposalForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:border-[#2B7A78] dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Business Email:</label>
                  <input
                    type="email"
                    placeholder="john@company.com"
                    value={proposalForm.email}
                    onChange={(e) => setProposalForm({ ...proposalForm, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:border-[#2B7A78] dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Company / Agency:</label>
                  <input
                    type="text"
                    placeholder="PT Telkom Indonesia"
                    value={proposalForm.company}
                    onChange={(e) => setProposalForm({ ...proposalForm, company: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:border-[#2B7A78] dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Campaign Budget Target:</label>
                  <select
                    value={proposalForm.budget}
                    onChange={(e) => setProposalForm({ ...proposalForm, budget: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none dark:text-slate-100"
                  >
                    <option>Under 10M</option>
                    <option>10M - 50M</option>
                    <option>50M - 100M</option>
                    <option>Above 100M</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Brief Target & Message:</label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your brand targets..."
                  value={proposalForm.msg}
                  onChange={(e) => setProposalForm({ ...proposalForm, msg: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:border-[#2B7A78] dark:text-slate-100"
                />
              </div>

              <button
                onClick={() => {
                  if (proposalForm.name && proposalForm.email) {
                    setProposalSubmitted(true);
                  }
                }}
                className="w-full bg-[#002B5B] dark:bg-indigo-900 hover:bg-opacity-95 text-white font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5"
              >
                Generate Proposal Files
              </button>
            </div>
          )}
        </div>

        {/* Live quotation and invoice PDF Simulator */}
        <div className="lg:col-span-5 bg-slate-900 text-slate-100 rounded-2xl p-5 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-amber-400 text-[9px] font-mono font-bold uppercase tracking-wider block">Real-Time Invoicing & Contract Desk</span>
              <h4 className="font-display font-black text-sm text-white mt-1">Generated Corporate PDF Files</h4>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex gap-3 items-center hover:bg-slate-900 transition cursor-pointer">
                <FileText className="h-5 w-5 text-amber-400 shrink-0" />
                <div>
                  <span className="text-white font-bold block text-[11px]">INFOBOS_Corporate_Proposal_2026.pdf</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Demographics & detailed placement specs</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex gap-3 items-center hover:bg-slate-900 transition cursor-pointer">
                <FileText className="h-5 w-5 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-white font-bold block text-[11px]">Campaign_Quotation_Sheet.xlsx</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Budget, CPM/CPC rates, agency discounts</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex gap-3 items-center hover:bg-slate-900 transition cursor-pointer">
                <FileText className="h-5 w-5 text-blue-400 shrink-0" />
                <div>
                  <span className="text-white font-bold block text-[11px]">Standard_Sponsorship_Contract.docx</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Terms, SLAs, click assurance clauses</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex gap-2">
            <button
              onClick={() => alert("Simulasi: Mengunduh bundle proposal korporat INFOBOS Q2")}
              className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-1"
            >
              <Download className="h-4 w-4" /> Download Proposal Bundle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
