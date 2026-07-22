import React, { useState } from 'react';
import { Target, BookOpen, AlertCircle, RefreshCw, Badge, Sparkles, Sliders, Check, HelpCircle } from 'lucide-react';

export default function AdOSNativeContextual() {
  const [selectedContextCategory, setSelectedContextCategory] = useState<string>('Tech');
  const [activeTab, setActiveTab] = useState<'native' | 'contextual' | 'category-sponsor' | 'trending-search'>('native');

  // Contextual Rules list
  const contextualRules = [
    { category: 'Tech', keywords: ['AI', 'Cloud', 'SaaS', 'React', 'Chip'], recommendedAd: 'Biznet Cloud Hosting Promo / Microsoft Azure Credit Coupon', ctrPrediction: '3.8%' },
    { category: 'Travel', keywords: ['Hotel', 'Flight', 'Wisata', 'Pantai', 'Bandung'], recommendedAd: 'Traveloka Hotel Voucher Jabar / Tiket.com flight refund promo', ctrPrediction: '4.2%' },
    { category: 'Business', keywords: ['Inflation', 'Saham', 'IHSG', 'Inves', 'OJK'], recommendedAd: 'Bank Mandiri Corporate Finance / Bibit Reksadana Bonus Cashback', ctrPrediction: '3.1%' },
    { category: 'Education', keywords: ['Beasiswa', 'Kuliah', 'LPDP', 'Riset', 'UTBK'], recommendedAd: 'Ruangguru bimbel diskon 50% / English First Corporate Training', ctrPrediction: '2.9%' },
    { category: 'Health', keywords: ['Diet', 'Vaksin', 'Obat', 'Mental', 'Klinik'], recommendedAd: 'Halodoc Chat Dokter Gratis / Kimia Farma Suplemen Imunitas', ctrPrediction: '3.4%' }
  ];

  const nativeStoryTypes = [
    { type: 'Sponsored Story', desc: 'Custom story written by editorial team representing the client\'s milestones.', tag: 'Sponsored Story', badgeColor: 'bg-indigo-100 text-indigo-800' },
    { type: 'Sponsored Article', desc: 'Press release styled story matching the typical newsroom layout.', tag: 'Sponsored Article', badgeColor: 'bg-emerald-100 text-emerald-800' },
    { type: 'Partner Content', desc: 'Direct syndicated feed from our corporate partners\' blogs.', tag: 'Partner Content', badgeColor: 'bg-amber-100 text-amber-800' },
    { type: 'Brand Story', desc: 'Immersive brand landing story focusing on emotional company values.', tag: 'Brand Story', badgeColor: 'bg-purple-100 text-purple-800' },
    { type: 'Advertorial Story', desc: 'Highly detailed product comparison and promotional article.', tag: 'Advertorial', badgeColor: 'bg-pink-100 text-pink-800' },
    { type: 'Sponsored Tutorial', desc: 'Step-by-step educational guide showing how to use the client\'s tools.', tag: 'Sponsored Tutorial', badgeColor: 'bg-cyan-100 text-cyan-800' },
    { type: 'Product Review Ad', desc: 'Unbiased look at a brand\'s newly launched hardware or software.', tag: 'Product Review', badgeColor: 'bg-blue-100 text-blue-800' },
    { type: 'Executive Interview', desc: 'C-suite editorial conversation highlighting startup strategies.', tag: 'Executive Interview', badgeColor: 'bg-slate-100 text-slate-800' },
    { type: 'Industry Report Sponsor', desc: 'Whitepaper download story co-branded with the enterprise client.', tag: 'Whitepaper Sponsor', badgeColor: 'bg-rose-100 text-rose-800' },
    { type: 'Corporate Announcement', desc: 'Brief investor updates or charity event reporting.', tag: 'Corporate PR', badgeColor: 'bg-teal-100 text-teal-800' },
    { type: 'Sponsored Roundtable', desc: 'Highlights from a joint webinar or virtual talk show event.', tag: 'Sponsored Discussion', badgeColor: 'bg-orange-100 text-orange-800' }
  ];

  const categorySponsors = [
    { category: 'Technology', brand: 'Microsoft Indonesia', role: 'Official Cloud Partner', rate: 'Rp 25M / year' },
    { category: 'Travel & Tourism', brand: 'Traveloka', role: 'Official Holiday Sponsor', rate: 'Rp 18M / year' },
    { category: 'Finance & Stocks', brand: 'Bank Mandiri', role: 'Strategic Wealth Partner', rate: 'Rp 30M / year' },
    { category: 'Education & Careers', brand: 'Ruangguru', role: 'Learning Solution Partner', rate: 'Rp 12M / year' },
    { category: 'Automotive', brand: 'Toyota Astra', role: 'Powered By Automotive', rate: 'Rp 22M / year' }
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Tab Menu Header */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        {[
          { id: 'native', name: 'Native Articles & Stories' },
          { id: 'contextual', name: 'Contextual AI Ad Recommendation' },
          { id: 'category-sponsor', name: 'Category Sponsorships' },
          { id: 'trending-search', name: 'Trending & Search Sponsors' }
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

      {/* SUBTAB 1: Native & Sponsored Articles */}
      {activeTab === 'native' && (
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
            <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 block uppercase mb-1">FTC & Pressemat Disclosure Settings</span>
            <h4 className="font-display font-bold text-xs text-slate-800 dark:text-slate-200">Clear Consumer Disclosure & Sponsored Tagging Compliance</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Every native advertisement is marked with precise tags (e.g. "Sponsored Story", "Partner Content") to comply with press regulations. Hovering reveals advertiser transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nativeStoryTypes.map((item, index) => (
              <div key={index} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-2 hover:border-[#2B7A78] dark:hover:border-[#2B7A78] transition">
                <div className="flex justify-between items-center">
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase ${item.badgeColor}`}>
                    {item.tag}
                  </span>
                  <span className="text-[8px] font-mono font-bold text-slate-400 dark:text-slate-500">ID: NAT-0{index + 1}</span>
                </div>
                <h5 className="font-bold text-slate-900 dark:text-slate-100 text-xs">{item.type}</h5>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">{item.desc}</p>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500">
                  <span>Interactive CTA Widget: Enabled</span>
                  <span className="text-emerald-600 font-bold font-mono">100% SEO friendly</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 2: Contextual AI Recommendation Engine */}
      {activeTab === 'contextual' && (
        <div className="space-y-6">
          <div className="bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900 text-teal-800 dark:text-teal-200 p-4 rounded-xl flex gap-3 items-start">
            <Sparkles className="h-5 w-5 text-teal-600 shrink-0 mt-0.5 animate-pulse" />
            <div className="space-y-1">
              <h5 className="font-bold text-xs">Real-Time Contextual Ad Matching Algorithm</h5>
              <p className="text-[11px] text-teal-700 dark:text-teal-300 leading-relaxed font-sans">
                Rather than tracking user cookies, our AI matches advertising banners dynamically based on real-time article categories, subcategories, metadata keywords, and entities mentioned in the text body.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-3">
              <h4 className="font-display font-bold text-xs text-slate-800 dark:text-slate-200">Select Section/Category Rule</h4>
              <div className="space-y-1.5">
                {contextualRules.map((rule) => (
                  <button
                    key={rule.category}
                    onClick={() => setSelectedContextCategory(rule.category)}
                    className={`w-full text-left p-3 rounded-xl border transition ${
                      selectedContextCategory === rule.category 
                        ? 'border-[#2B7A78] bg-teal-50/50 dark:bg-teal-950/20 font-bold' 
                        : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-800 dark:text-slate-200 font-bold">{rule.category} Channel Rule</span>
                      <span className="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 text-[9px] px-1.5 py-0.2 rounded font-mono font-bold">
                        {rule.ctrPrediction} Predicted CTR
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 bg-slate-900 dark:bg-slate-950 text-slate-100 rounded-2xl p-5 shadow-2xs space-y-4 border border-slate-800">
              <div className="border-b border-slate-800 pb-2 flex justify-between items-center">
                <span className="font-mono text-[10px] text-teal-400 font-bold uppercase">Dynamic Mapping Live View</span>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              {contextualRules.map((rule) => {
                if (rule.category !== selectedContextCategory) return null;
                return (
                  <div key={rule.category} className="space-y-4 text-xs font-mono">
                    <div className="space-y-1.5">
                      <span className="text-slate-400 block text-[9px] uppercase font-bold">Trigger Keywords & Tags:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {rule.keywords.map((kw, idx) => (
                          <span key={idx} className="bg-slate-800 border border-slate-700 text-teal-300 px-2 py-0.5 rounded font-bold text-[10px]">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5 p-3.5 bg-slate-950 border border-slate-800 rounded-xl">
                      <span className="text-slate-400 block text-[9px] uppercase font-bold">Recommended Banner Creative:</span>
                      <span className="text-white font-bold block mt-1">{rule.recommendedAd}</span>
                      <span className="text-[10px] text-amber-400 block font-bold mt-1">🏷️ Direct context injection without cookie trackers.</span>
                    </div>

                    <div className="space-y-1 border-t border-slate-800 pt-3 text-[11px] text-slate-400">
                      <div>Entity Target Mapping: <strong className="text-white">Active (Company & Person profiling)</strong></div>
                      <div>User Interest alignment: <strong className="text-white">Traveloka / Bank Mandiri Segment</strong></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: Category Sponsorships */}
      {activeTab === 'category-sponsor' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-2xs space-y-4">
            <div>
              <h4 className="font-display font-bold text-sm text-[#002B5B] dark:text-indigo-400">Portal Kemitraan Sponsor Kategori</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Menejemen brand resmi yang mensponsori seluruh tampilan sub-section / kategori di portal berita.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {categorySponsors.map((item, index) => (
                <div key={index} className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="bg-indigo-100 text-indigo-800 text-[8px] font-bold px-1.5 py-0.2 rounded font-mono uppercase">
                      {item.category}
                    </span>
                    <h5 className="font-bold text-slate-900 dark:text-slate-100 text-xs mt-1.5">{item.brand}</h5>
                    <span className="text-slate-500 dark:text-slate-400 text-[10px] block font-bold">{item.role}</span>
                  </div>
                  <div className="border-t border-slate-200 dark:border-slate-800 pt-2 flex justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500 font-bold">
                    <span>Valuation:</span>
                    <span className="text-[#2B7A78] dark:text-[#3e9c99]">{item.rate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: Trending & Search Sponsors */}
      {activeTab === 'trending-search' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-2xs space-y-3">
              <h4 className="font-display font-bold text-sm text-[#002B5B] dark:text-indigo-400">Trending Topics Sponsorships</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                Configure brands attached as primary partners on daily trending keywords ("Trending Today", "Google Trends", "Most Read Topic").
              </p>
              <div className="space-y-2 pt-2">
                {[
                  { keyword: '#DigitalisasiJabar', sponsor: 'Diskominfo Jabar', type: 'Strategic Partner' },
                  { keyword: '#InovasiAIPerbankan', sponsor: 'Bank Mandiri', type: 'Presented By' },
                  { keyword: '#KecerdasanBuatan2026', sponsor: 'Microsoft Indonesia', type: 'Official Sponsor' },
                  { keyword: '#WisataKulinerSunda', sponsor: 'Traveloka', type: 'Powered By' }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-850 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{item.keyword}</span>
                      <span className="bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-[9px] px-1 rounded font-bold uppercase">{item.type}</span>
                    </div>
                    <span className="font-bold text-slate-600 dark:text-slate-400">{item.sponsor}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-2xs space-y-3">
              <h4 className="font-display font-bold text-sm text-[#002B5B] dark:text-indigo-400">Promoted Search Results Console</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                Attach priority result cards or suggested topics when readers use the portal's search engine.
              </p>
              <div className="space-y-2 pt-2">
                {[
                  { term: 'Cloud Server', adTitle: 'Biznet Cloud - Instan server scalable mulai Rp 150Rb', cta: 'Buka Promo' },
                  { term: 'LPDP Beasiswa', adTitle: 'English First Corporate - IELTS Preparation diskon 25%', cta: 'Daftar Kelas' },
                  { term: 'Liburan Murah', adTitle: 'Hotel Mewah Bandung - Voucher diskon Traveloka 30%', cta: 'Booking Room' }
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 bg-teal-50/10 dark:bg-teal-950/10 rounded-xl border border-teal-100 dark:border-teal-900/50 text-xs">
                    <div className="flex justify-between items-start text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                      <span>Search Term: "{item.term}"</span>
                      <span className="bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 px-1 rounded font-bold uppercase">Sponsored Search</span>
                    </div>
                    <h5 className="font-bold text-slate-800 dark:text-slate-200 text-xs mt-1">{item.adTitle}</h5>
                    <span className="text-teal-600 dark:text-teal-400 text-[9px] font-bold block mt-1 uppercase tracking-wide cursor-pointer">{item.cta} →</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
