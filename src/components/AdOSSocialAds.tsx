import React, { useState } from 'react';
import { Target, MessageSquare, Instagram, Heart, Play, Eye, Share2, Award, Users, DollarSign, ArrowUpRight, Sparkles, Send, CheckCircle, Smartphone } from 'lucide-react';

export default function AdOSSocialAds() {
  const [selectedFeedType, setSelectedFeedType] = useState<'instagram' | 'tiktok' | 'linkedin' | 'youtube' | 'podcast'>('instagram');
  const [selectedCreator, setSelectedCreator] = useState<string>('kamil_design');
  const [leadFormSubmitted, setLeadFormSubmitted] = useState<boolean>(false);
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '' });

  const socialEmbedOptions = [
    { name: 'Instagram Posts & Reels', icon: Instagram, count: '14 Active' },
    { name: 'TikTok Interactive Videos', icon: Play, count: '8 Active' },
    { name: 'X / Twitter Real-Time Posts', icon: MessageSquare, count: '10 Active' },
    { name: 'YouTube Video & Shorts', icon: Play, count: '6 Active' },
    { name: 'LinkedIn Professional Posts', icon: Users, count: '4 Active' },
    { name: 'Spotify & Apple Podcast Audio Slots', icon: Award, count: '5 Active' },
    { name: 'Telegram Broadcast & RSS Feeds', icon: Send, count: '9 Active' }
  ];

  const creatorsList = [
    { username: 'kamil_design', fullName: 'Kamil Ridwan (Creative Director)', platform: 'Instagram Reels', followers: '450K', sponsoredPostType: 'Arsitektur & Travel', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300' },
    { username: 'budi_tech', fullName: 'Budi Santoso (Tech reviewer)', platform: 'TikTok Video', followers: '820K', sponsoredPostType: 'Hardware & AI Tutorial', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300' },
    { username: 'siti_finance', fullName: 'Siti Rahmawati (Stock Analyst)', platform: 'LinkedIn & YouTube', followers: '280K', sponsoredPostType: 'Economic Report Sponsor', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300' }
  ];

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (leadForm.name && leadForm.email) {
      setLeadFormSubmitted(true);
    }
  };

  return (
    <div className="space-y-8 text-left">
      <div className="bg-teal-900 text-teal-50 p-5 rounded-2xl border border-teal-850">
        <h3 className="font-display font-extrabold text-base text-teal-300">Social Media Advertising & Embedded Content Hub</h3>
        <p className="text-xs text-teal-100 max-w-2xl leading-relaxed mt-1">
          Bridge social engagement and editorial authority. Configure native Instagram Reels, YouTube Shorts, LinkedIn professional cards, and TikTok carousels with direct Call-To-Actions and verified badges.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Social Platforms Connector List */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-slate-100">Supported Connectors</h4>
            <p className="text-[10px] text-slate-400 dark:text-slate-500">Embed direct assets or configure feed synchronizers.</p>
          </div>

          <div className="space-y-2">
            {socialEmbedOptions.map((opt, idx) => {
              const Icon = opt.icon;
              return (
                <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-150 dark:border-slate-850 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-400 rounded-lg">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs">{opt.name}</span>
                  </div>
                  <span className="text-[9px] font-mono font-bold bg-[#2B7A78]/15 text-[#2B7A78] px-2 py-0.5 rounded-full">
                    {opt.count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Sponsored Social Carousel Simulator */}
        <div className="lg:col-span-8 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
              <div>
                <h4 className="font-display font-bold text-sm text-slate-900 dark:text-slate-100">Interactive Social Carousel Mockup</h4>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">Preview the actual social widgets embedded directly inside portal content.</p>
              </div>

              {/* Toggle feed mockups */}
              <div className="flex bg-slate-200/80 dark:bg-slate-800 p-0.5 rounded-lg text-[9px] font-bold">
                {['instagram', 'tiktok', 'linkedin', 'youtube'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedFeedType(type as any)}
                    className={`px-2.5 py-1 rounded-md capitalize transition ${
                      selectedFeedType === type ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-2xs' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Feed Simulator viewport */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs max-w-md mx-auto relative overflow-hidden text-slate-800 dark:text-slate-200">
              {/* Instagram view */}
              {selectedFeedType === 'instagram' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 p-0.5">
                        <img 
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" 
                          alt="avatar" 
                          className="h-full w-full rounded-full object-cover border border-white"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-xs">traveloka_indonesia</span>
                          <span className="h-3.5 w-3.5 bg-blue-500 text-white font-black rounded-full flex items-center justify-center text-[7px]">✓</span>
                        </div>
                        <span className="text-[8px] text-slate-400 dark:text-slate-500 block -mt-0.5">Sponsored Post / Ad</span>
                      </div>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-[9px] px-2.5 py-1 rounded-md">
                      Follow
                    </button>
                  </div>

                  <div className="relative aspect-square bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600" 
                      alt="Traveloka" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-black/60 text-white font-mono text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">
                      1 / 3 Carousel
                    </div>
                    {/* Floating CTA */}
                    <div className="absolute bottom-3 inset-x-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs p-2.5 rounded-xl border border-slate-150 dark:border-slate-800 flex justify-between items-center">
                      <div>
                        <span className="font-bold text-[10px] text-slate-900 dark:text-slate-100">Hotel Resort Mewah Jabar</span>
                        <span className="text-[8px] text-slate-500 dark:text-slate-400 block">Diskon khusus 30% s.d akhir bulan!</span>
                      </div>
                      <a href="#traveloka" className="bg-slate-900 text-white font-bold text-[9px] px-3 py-1.5 rounded-lg hover:bg-slate-800 transition shadow-2xs">
                        Pesan Kamar
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center text-slate-500 dark:text-slate-400 text-xs">
                    <span className="flex items-center gap-1"><Heart className="h-4 w-4 text-rose-500 fill-current" /> 12.4K</span>
                    <span className="flex items-center gap-1"><MessageSquare className="h-4 w-4" /> 382</span>
                    <span className="flex items-center gap-1"><Share2 className="h-4 w-4" /> Share</span>
                  </div>
                </div>
              )}

              {/* TikTok view */}
              {selectedFeedType === 'tiktok' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-slate-900 p-0.5">
                        <img 
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" 
                          alt="avatar" 
                          className="h-full w-full rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-xs">budi_tech</span>
                          <span className="bg-teal-500 text-white font-mono text-[7px] font-black px-1 rounded">PRO</span>
                        </div>
                        <span className="text-[8px] text-slate-400 dark:text-slate-500 block -mt-0.5">Sponsored Video review</span>
                      </div>
                    </div>
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono font-bold">2.4M Views</span>
                  </div>

                  <div className="relative aspect-[9/16] max-h-72 bg-black rounded-xl overflow-hidden flex items-center justify-center">
                    <img 
                      src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400" 
                      alt="Budi tech" 
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white text-left">
                      <h5 className="font-bold text-xs">Bongkar Laptop Biznet Cloud Server ⚡</h5>
                      <p className="text-[10px] text-slate-300 mt-1 leading-relaxed">
                        Kecepatan rendering server VPS lokal Biznet nembus batas! Buruan jajal mulai Rp 150Rb aja.
                      </p>
                      <a href="#biznet" className="w-full bg-[#FFD700] text-slate-900 text-center font-bold text-xs py-2 rounded-xl mt-3 hover:bg-yellow-400 transition shadow-md">
                        Mulai Langganan VPS
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* LinkedIn view */}
              {selectedFeedType === 'linkedin' && (
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-2">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" 
                      alt="avatar" 
                      className="h-8 w-8 rounded-full object-cover border border-slate-200 dark:border-slate-800"
                    />
                    <div>
                      <h5 className="font-bold text-xs flex items-center gap-1">
                        Siti Rahmawati <span className="bg-blue-600 text-white text-[7px] font-black px-1 rounded-full">In</span>
                      </h5>
                      <span className="text-[9px] text-slate-400 dark:text-slate-500 block">Stock Analyst & Corporate Advisor • Sponsored</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-700 dark:text-slate-350 leading-relaxed font-sans">
                    Bagaimana strategi mitigasi risiko inflasi daerah Jabar di kuartal kedua 2026? Baca kajian eksklusif kustom yang dirilis oleh <strong>Bank Mandiri Indonesia</strong> bersama jurnalisme data portal berita INFOBOS.
                  </p>

                  <div className="border border-slate-150 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-950">
                    <img 
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600" 
                      alt="Bank Mandiri" 
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3 flex justify-between items-center bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                      <div>
                        <span className="font-bold text-[10px] text-slate-900 dark:text-slate-100 block">Download Whitepaper Risiko Makro Q2</span>
                        <span className="text-[8px] text-slate-400 dark:text-slate-500 font-mono block">Edisi Kolaborasi Bank Mandiri & INFOBOS</span>
                      </div>
                      <a href="#mandiri-pdf" className="bg-[#002B5B] dark:bg-indigo-900 text-white font-bold text-[9px] px-3.5 py-1.5 rounded-lg hover:bg-opacity-90 transition shadow-2xs">
                        Unduh PDF
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* YouTube view */}
              {selectedFeedType === 'youtube' && (
                <div className="space-y-3">
                  <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600" 
                      alt="YouTube Sponsor" 
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center p-4">
                      <Play className="h-10 w-10 text-red-600 fill-current animate-pulse mb-1" />
                      <span className="text-xs font-black uppercase tracking-wider">Video Ad (15s Pre-Roll)</span>
                      <span className="text-[9px] text-slate-300 mt-1">Sponsor: Microsoft Cloud Azure</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <div>
                      <h5 className="font-bold text-slate-900 dark:text-slate-100 text-xs">Microsoft Azure AI Cloud Summit</h5>
                      <span className="text-[9px] text-slate-400 dark:text-slate-500 block mt-0.5">Official Sponsor channel • Sponsored Link</span>
                    </div>
                    <a href="#microsoft" className="bg-red-600 text-white font-bold text-[9px] px-3.5 py-1.5 rounded-lg hover:bg-red-700 transition shadow-2xs">
                      Claim Credit $200
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Creator & Influencer Promotion Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-2xs space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex justify-between items-center">
            <div>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-slate-100">Verified Creators Hub & Promotions</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Coordinate and track sponsored reviews and community posts from verified creators.</p>
            </div>
            <span className="bg-indigo-100 text-indigo-800 text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase">Verified Only</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {creatorsList.map((creator) => (
              <button
                key={creator.username}
                onClick={() => setSelectedCreator(creator.username)}
                className={`p-3.5 rounded-xl border text-left transition ${
                  selectedCreator === creator.username 
                    ? 'border-[#2B7A78] bg-teal-50/50 dark:bg-teal-950/20 shadow-2xs' 
                    : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img src={creator.avatar} alt="creator" className="h-9 w-9 rounded-full object-cover border border-slate-200 dark:border-slate-800 shrink-0" />
                  <div className="min-w-0">
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-xs truncate block">{creator.fullName}</span>
                    <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 font-bold block">@{creator.username}</span>
                  </div>
                </div>
                <div className="mt-3 space-y-1 text-[10px] text-slate-500 dark:text-slate-400">
                  <div>Platform: <strong className="text-slate-800 dark:text-slate-200">{creator.platform}</strong></div>
                  <div>Followers: <strong className="text-slate-800 dark:text-slate-200">{creator.followers}</strong></div>
                  <div>Niche: <strong className="text-slate-800 dark:text-slate-200">{creator.sponsoredPostType}</strong></div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Campaign Landing Page Generator mockup with simple lead form */}
        <div className="lg:col-span-4 bg-slate-900 text-slate-100 rounded-2xl p-5 shadow-2xs space-y-4">
          <div className="border-b border-slate-800 pb-2">
            <h4 className="font-display font-bold text-sm text-white">Social Campaign Page</h4>
            <p className="text-[10px] text-slate-400">Integrated micro-landing pages for corporate leads generation.</p>
          </div>

          {leadFormSubmitted ? (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center text-emerald-400 space-y-2 py-6">
              <CheckCircle className="h-8 w-8 text-emerald-400 mx-auto" />
              <h5 className="font-bold text-xs">Lead Captured Safely!</h5>
              <p className="text-[10px] text-slate-300 leading-relaxed">
                Form input has been recorded directly into the internal sales CRM Deal pipeline.
              </p>
              <button
                onClick={() => { setLeadForm({ name: '', email: '', phone: '' }); setLeadFormSubmitted(false); }}
                className="text-[10px] underline font-bold"
              >
                Submit another lead
              </button>
            </div>
          ) : (
            <form onSubmit={handleLeadSubmit} className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl space-y-1">
                <span className="text-[9px] font-mono text-[#FFD700] uppercase font-bold">ACTIVE CAMPAIGN LANDING</span>
                <h5 className="font-bold text-white text-xs">Biznet SME Cloud Promo</h5>
                <p className="text-[10px] text-slate-400 leading-relaxed">Fill form below to claim free trial cloud access.</p>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Full Name:</label>
                <input
                  type="text"
                  required
                  placeholder="Ahmad"
                  value={leadForm.name}
                  onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Business Email:</label>
                <input
                  type="email"
                  required
                  placeholder="ahmad@company.com"
                  value={leadForm.email}
                  onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-teal-500 to-[#2B7A78] text-white text-center font-bold rounded-xl mt-3 hover:opacity-90 transition"
              >
                Submit Lead & Get Access
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
