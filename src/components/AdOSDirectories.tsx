import React, { useState } from 'react';
import { Target, Star, ShieldCheck, Award, Eye, Plus, HelpCircle, MapPin, Building, Globe } from 'lucide-react';

export default function AdOSDirectories() {
  const [selectedDirectory, setSelectedDirectory] = useState<string>('Company');
  const [selectedStyle, setSelectedStyle] = useState<string>('Featured Listing');

  const directoriesList = [
    { id: 'Company', name: 'Company & Corporate Directory', desc: 'Verify and promote multi-tier enterprise profiles.', icon: Building },
    { id: 'Government', name: 'Government Agencies', desc: 'Official directories for regional and national entities.', icon: Building },
    { id: 'Airport', name: 'Airports & Transport Hubs', desc: 'Promote lounges, retail, and shuttle services.', icon: Globe },
    { id: 'Hospital', name: 'Hospitals & Medical Clinics', desc: 'Highlight premium healthcare services and specialists.', icon: Globe },
    { id: 'University', name: 'Universities & High Schools', desc: 'Increase registrations for top private academic brands.', icon: Award },
    { id: 'Travel', name: 'Travel Guides & Destinations', desc: 'Promote local attractions, theme parks, and trails.', icon: MapPin },
    { id: 'Tourism', name: 'Regional Tourism Boards', desc: 'Sponsor municipal curated tourism sitemaps.', icon: MapPin },
    { id: 'Hotel', name: 'Hotels & Luxury Resorts', desc: 'Interactive booking CTA for premium lodging.', icon: Globe },
    { id: 'Restaurant', name: 'Restaurants & Culinary Cafes', desc: 'Highlight ratings, menus, and promo codes.', icon: Star },
    { id: 'Startup', name: 'SMEs & Emerging Startups', desc: 'Direct corporate funding lead generation widgets.', icon: Building },
    { id: 'Property', name: 'Real Estate & Properties', desc: 'Promote apartment rentals and premium land plots.', icon: Building }
  ];

  const listStyles = [
    { name: 'Featured Listing', tag: 'FEATURED', color: 'bg-indigo-600 text-white', desc: 'Pinned to the absolute top of directory with premium card borders.' },
    { name: 'Premium Listing', tag: 'PREMIUM', color: 'bg-amber-500 text-white', desc: 'Custom background skin and larger logo thumbnail rendering.' },
    { name: 'Verified Listing', tag: 'VERIFIED', color: 'bg-emerald-600 text-white', desc: 'Verified profile badge that bypasses basic search filters.' },
    { name: 'Sponsored Listing', tag: 'SPONSORED', color: 'bg-indigo-100 text-indigo-800', desc: 'Marked as sponsored. Integrated directly inside list flow.' },
    { name: 'Gold Listing', tag: 'GOLD PARTNER', color: 'bg-yellow-500 text-slate-900', desc: 'Premium partner listing with priority recommendations.' },
    { name: 'Top Choice', tag: 'TOP CHOICE', color: 'bg-purple-600 text-white', desc: 'Designated by our editorial staff as Jabar\'s top choice.' },
    { name: 'Editor Choice', tag: 'EDITOR CHOICE', color: 'bg-teal-600 text-white', desc: 'Curated manually by regional journalists.' },
    { name: 'Recommended', tag: 'RECOMMENDED', color: 'bg-cyan-600 text-white', desc: 'Contextually mapped to user search intent query.' },
    { name: 'Nearby Recommendation', tag: 'NEARBY', color: 'bg-rose-600 text-white', desc: 'Prioritized geo-targeted search based on client IP GPS coordinates.' }
  ];

  return (
    <div className="space-y-8 text-left">
      <div className="bg-teal-900 text-teal-50 p-5 rounded-2xl border border-teal-850">
        <h3 className="font-display font-extrabold text-base text-teal-300">Directory Advertising Console</h3>
        <p className="text-xs text-teal-100 max-w-2xl leading-relaxed mt-1">
          Configure multi-tier premium listings across 11 key regional directories. Align search priority, design elements, and interactive CTAs using the 9 official styles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Directories selection */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-slate-100">Directories (11 Ecosystems)</h4>
            <p className="text-[10px] text-slate-400 dark:text-slate-500">Select directory sector to view active profile configurations.</p>
          </div>

          <div className="space-y-1.5 max-h-[420px] overflow-y-auto pr-1">
            {directoriesList.map((dir) => {
              const Icon = dir.icon;
              return (
                <button
                  key={dir.id}
                  onClick={() => setSelectedDirectory(dir.id)}
                  className={`w-full text-left p-3 rounded-xl border transition ${
                    selectedDirectory === dir.id 
                      ? 'border-[#2B7A78] bg-teal-50/50 dark:bg-teal-950/20 shadow-2xs font-bold' 
                      : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex gap-2.5 items-center">
                    <div className="p-1.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-bold text-slate-800 dark:text-slate-200 text-xs block truncate">{dir.name}</span>
                      <span className="text-[9px] text-slate-400 dark:text-slate-500 block truncate mt-0.5">{dir.desc}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Directory Card Simulator */}
        <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
          <div className="space-y-5">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-2 flex justify-between items-center">
              <div>
                <h4 className="font-display font-bold text-sm text-slate-900 dark:text-slate-100">Premium Listing Style Simulator</h4>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">Interactive rendering of different style priority tiers.</p>
              </div>

              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold rounded-lg px-2.5 py-1 dark:text-slate-100"
              >
                {listStyles.map((style) => (
                  <option key={style.name}>{style.name}</option>
                ))}
              </select>
            </div>

            {/* Simulated listing card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
              {listStyles.map((style) => {
                if (style.name !== selectedStyle) return null;
                return (
                  <div key={style.name} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-black ${style.color}`}>
                        {style.tag}
                      </span>
                      <span className="text-[9px] font-mono font-bold text-slate-400 dark:text-slate-500 font-sans">DIRECTORY / {selectedDirectory.toUpperCase()}</span>
                    </div>

                    <div className="flex items-start gap-4">
                      {/* Logo mockup */}
                      <div className="h-12 w-12 bg-[#002B5B] rounded-xl flex items-center justify-center text-white font-black text-xs shrink-0">
                        BI
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <h5 className="font-bold text-slate-900 dark:text-slate-100 text-sm font-display">Biznet Cloud Computing Services</h5>
                          {style.name === 'Verified Listing' && (
                            <span className="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 text-[8px] font-bold px-1.5 py-0.2 rounded">✓ VERIFIED</span>
                          )}
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed font-sans">
                          Penyedia VPS instan, cloud server berskala besar, dan colocation data center terpercaya di Indonesia.
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl text-[10px] text-slate-500 dark:text-slate-400 font-medium font-sans">
                      <strong>Rendering Behavior:</strong> {style.desc}
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                      <span className="text-slate-400 dark:text-slate-500">📍 Gedung Cyber 1 Lantai 3, Jakarta</span>
                      <a href="#biznet-direct" className="bg-[#2B7A78] hover:bg-[#1e5856] text-white font-bold text-[10px] px-3.5 py-1.5 rounded-lg transition shadow-2xs">
                        Lihat Profil Direktori →
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 pt-3 text-[10px] text-slate-400 dark:text-slate-500 font-semibold flex items-center gap-1.5 leading-relaxed">
            <ShieldCheck className="h-4.5 w-4.5 text-[#2B7A78] dark:text-[#3e9c99]" />
            <span>Multi-tier listing system is SEO indexable, optimized for fast loading (bypassing CLS shifting issues).</span>
          </div>
        </div>
      </div>
    </div>
  );
}
