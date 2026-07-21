import React, { useState } from 'react';
import { 
  Instagram, MessageSquare, Play, Heart, Share2, Award, Users, 
  Send, CheckCircle, Sparkles, AlertCircle, Eye, RefreshCw, BarChart2,
  TrendingUp, Search, Info, ThumbsUp, Trash2, ShieldCheck, DollarSign
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

export default function SocialMediaHub() {
  const [activeTab, setActiveTab] = useState<'feeds' | 'sentiment' | 'planner' | 'metrics'>('feeds');
  const [selectedPlatform, setSelectedPlatform] = useState<'instagram' | 'tiktok' | 'twitter' | 'linkedin'>('instagram');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Twitter custom posts simulation
  const [tweets, setTweets] = useState<any[]>([
    { id: 1, author: 'Sunda_Pride', handle: '@sundanese_boiz', content: 'Siapa yang udah nyoba naik Whoosh Jakarta-Bandung pas weekend? Keren parah sih, cepet banget gila! Jabar Juara! ⚡🚄', likes: 324, retweets: 89, time: '2 mins ago', sentiment: 'positive' },
    { id: 2, author: 'Mega_Bandung', handle: '@meg_bdg_news', content: 'Kemacetan di Pasteur akhir pekan ini terpantau padat merayap akibat pengerjaan perbaikan drainase. Harap cari jalur alternatif ya wargi! 🚗🚧', likes: 145, retweets: 42, time: '15 mins ago', sentiment: 'negative' },
    { id: 3, author: 'Diah_Purnamasari', handle: '@diah_p', content: 'UMKM kuliner di Bandung emang ga ada matinya. Selalu ada inovasi baru tiap minggu. Semoga makin dibantu promosinya lewat program Jabar Digital Innovation!', likes: 210, retweets: 55, time: '1 hour ago', sentiment: 'positive' },
    { id: 4, author: 'Anto_Finance', handle: '@ant_finance', content: 'Rencana BI meluncurkan Rupiah Stablecoin kelihatannya bakal menarik banget buat efisiensi sistem pembayaran digital di UMKM Jawa Barat.', likes: 98, retweets: 18, time: '3 hours ago', sentiment: 'neutral' },
  ]);
  const [newTweetText, setNewTweetText] = useState('');

  // Influencer list for campaign planner
  const [selectedCreators, setSelectedCreators] = useState<string[]>(['kamil_design']);
  const [campaignBudget, setCampaignBudget] = useState(15000000);
  const [campaignWeeks, setCampaignWeeks] = useState(2);
  const [campaignFormat, setCampaignFormat] = useState<'reels' | 'tiktok' | 'multi'>('reels');

  const creatorsList = [
    { username: 'kamil_design', fullName: 'Kamil Ridwan (Creative Director)', platform: 'Instagram Reels', followers: 450000, baseRate: 3500000, estReach: 120000, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300', niche: 'Arsitektur & Travel' },
    { username: 'budi_tech', fullName: 'Budi Santoso (Tech Reviewer)', platform: 'TikTok Video', followers: 820000, baseRate: 6000000, estReach: 250000, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300', niche: 'Hardware & AI Tutorial' },
    { username: 'siti_finance', fullName: 'Siti Rahmawati (Stock Analyst)', platform: 'LinkedIn & YouTube', followers: 280000, baseRate: 4500000, estReach: 90000, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300', niche: 'Laporan Keuangan & Investasi' },
    { username: 'neng_kuliner', fullName: 'Neng Lilis (Sunda Foodie)', platform: 'Instagram & TikTok', followers: 510000, baseRate: 4000000, estReach: 180000, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300', niche: 'Kuliner Lokal Jabar' }
  ];

  // Hot Topics Sentiment Data
  const sentimentTopics = [
    { topic: 'Kereta Cepat Whoosh', positive: 78, neutral: 15, negative: 7, volume: '14,250 posts' },
    { topic: 'Rupiah Stablecoin', positive: 55, neutral: 35, negative: 10, volume: '8,900 posts' },
    { topic: 'Kemacetan Pasteur', positive: 5, neutral: 15, negative: 80, volume: '22,400 posts' },
    { topic: 'Inovasi Digital Jabar', positive: 88, neutral: 10, negative: 2, volume: '6,150 posts' }
  ];

  const handlePostTweet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTweetText.trim()) return;
    
    // Simple sentiment analysis helper
    let detectedSentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
    const textLower = newTweetText.toLowerCase();
    if (textLower.includes('keren') || textLower.includes('bagus') || textLower.includes('senang') || textLower.includes('juara') || textLower.includes('cepet')) {
      detectedSentiment = 'positive';
    } else if (textLower.includes('macet') || textLower.includes('buruk') || textLower.includes('kecewa') || textLower.includes('lambat') || textLower.includes('parah')) {
      detectedSentiment = 'negative';
    }

    const nextId = tweets.length + 1;
    const newTweet = {
      id: nextId,
      author: 'Warga_Jabar_Saber',
      handle: '@warga_jabar_saber',
      content: newTweetText,
      likes: 1,
      retweets: 0,
      time: 'Just now',
      sentiment: detectedSentiment
    };

    setTweets([newTweet, ...tweets]);
    setNewTweetText('');
  };

  const toggleCreatorSelect = (username: string) => {
    if (selectedCreators.includes(username)) {
      setSelectedCreators(selectedCreators.filter(c => c !== username));
    } else {
      setSelectedCreators([...selectedCreators, username]);
    }
  };

  // Plan results
  const totalCostOfCreators = creatorsList
    .filter(c => selectedCreators.includes(c.username))
    .reduce((sum, c) => sum + c.baseRate, 0);

  const totalEstReach = creatorsList
    .filter(c => selectedCreators.includes(c.username))
    .reduce((sum, c) => sum + c.estReach, 0);

  const budgetPerformance = campaignBudget >= totalCostOfCreators ? 'Aman' : 'Over budget';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left font-sans">
      
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-6 mb-8">
        <div className="flex items-center gap-2">
          <span className="bg-pink-600 text-white font-mono text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">Social Hub</span>
          <span className="text-pink-500 font-bold text-xs flex items-center gap-1">
            <Sparkles className="h-3 w-3 animate-pulse" /> Live Social Streams
          </span>
        </div>
        <h1 className="font-display font-black text-3xl text-[#002B5B] tracking-tight mt-1">
          Social Media Hub <span className="text-pink-500">&amp; Sentiment Terminal</span>
        </h1>
        <p className="text-slate-500 text-xs font-medium leading-relaxed mt-1 max-w-3xl">
          Konsol asinkronus pemantauan percakapan media sosial Jawa Barat, visualisasi real-time sentimen publik, review influencer terverifikasi, dan perencanaan kampanye digital.
        </p>
      </div>

      {/* Navigation tabs */}
      <div className="flex border-b border-slate-200 mb-8 overflow-x-auto whitespace-nowrap gap-1">
        {[
          { id: 'feeds', name: 'Live Feeds & Streams', icon: Play, desc: 'Insta, TikTok, Twitter timeline' },
          { id: 'sentiment', name: 'Public Sentiment Analyser', icon: BarChart2, desc: 'Hot local issues & opinion tracking' },
          { id: 'planner', name: 'Influencer Campaign Planner', icon: Users, desc: 'Quotation builder & reach estimator' },
          { id: 'metrics', name: 'Active Campaigns Dashboard', icon: TrendingUp, desc: 'AdOS tracking & CTR report' }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-start gap-2.5 px-4 py-3.5 border-b-2 transition text-left cursor-pointer ${
                activeTab === tab.id 
                  ? 'border-pink-500 text-pink-600 bg-pink-500/5 font-bold' 
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Icon className="h-4.5 w-4.5 shrink-0 mt-0.5 text-pink-500" />
              <div>
                <div className="text-xs font-bold tracking-wide">{tab.name}</div>
                <div className="text-[9px] font-medium text-slate-400 font-mono mt-0.5">{tab.desc}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: FEEDS & STREAMS */}
      {activeTab === 'feeds' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Platform Selector Sidebar */}
          <div className="lg:col-span-4 bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-4">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
              <h3 className="font-display font-bold text-sm text-slate-950 dark:text-slate-100">Select Social Channel</h3>
              <p className="text-[10px] text-slate-400">Pilih platform media sosial untuk melihat feed live simulasi.</p>
            </div>
            
            <div className="space-y-2">
              {[
                { id: 'instagram', name: 'Instagram Reels & Posts', icon: Instagram, count: '450K reach', color: 'text-pink-500 bg-pink-50 dark:bg-pink-950/30 dark:text-pink-400' },
                { id: 'tiktok', name: 'TikTok Viral Shorts', icon: Play, count: '820K views', color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/30 dark:text-rose-400' },
                { id: 'twitter', name: 'X / Twitter Live Feed', icon: MessageSquare, count: 'Real-time tweets', color: 'text-sky-500 bg-sky-50 dark:bg-sky-950/30 dark:text-sky-400' },
                { id: 'linkedin', name: 'LinkedIn Professional Info', icon: Users, count: 'Corporate network', color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/30 dark:text-blue-400' }
              ].map((plat) => {
                const Icon = plat.icon;
                return (
                  <button
                    key={plat.id}
                    onClick={() => setSelectedPlatform(plat.id as any)}
                    className={`w-full flex justify-between items-center p-3 rounded-xl border transition text-left cursor-pointer ${
                      selectedPlatform === plat.id 
                        ? 'border-pink-500 bg-pink-500/5 dark:bg-pink-950/20 font-bold text-pink-700 dark:text-pink-400' 
                        : 'border-slate-100 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-lg ${plat.color}`}>
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <span className="text-xs font-semibold">{plat.name}</span>
                    </div>
                    <span className="text-[9px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full">
                      {plat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Community Ad Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-900 to-[#002B5B] text-white space-y-2 relative overflow-hidden">
              <span className="bg-[#FFD700] text-[#002B5B] font-mono text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">AdOS Sponsor</span>
              <h5 className="font-bold text-[11px]">Pasang Iklan Media Sosial Disini!</h5>
              <p className="text-[9.5px] text-slate-300 leading-relaxed">
                Jangkau lebih dari 10 Juta netizen aktif Jawa Barat lewat jaringan influencer AdOS kami.
              </p>
              <a href="#partner-ads" className="text-[9px] text-[#FFD700] font-bold block hover:underline">
                Hubungi Marketing Info &rarr;
              </a>
            </div>
          </div>

          {/* Live Feed Simulator */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. INSTAGRAM VIEW */}
            {selectedPlatform === 'instagram' && (
              <div className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xs space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-0.5 shrink-0">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" alt="avatar" className="w-full h-full object-cover rounded-full border border-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 flex items-center gap-1">
                        kamil_design <span className="text-blue-500 text-[10px]">✓</span>
                      </h4>
                      <p className="text-[9px] text-slate-400">Creative Director & Influencer Jabar</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-pink-50 dark:bg-pink-950/30 text-pink-600 dark:text-pink-400 font-mono font-bold px-2.5 py-1 rounded-lg">Instagram Reels</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-6 relative aspect-[3/4] bg-slate-900 rounded-xl overflow-hidden shadow-md max-h-96">
                    <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800" alt="Reels cover" className="w-full h-full object-cover opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white text-left">
                      <span className="bg-pink-600 font-bold text-[8px] px-2 py-0.5 rounded-full w-fit mb-1.5 uppercase">Trending Jabar</span>
                      <h5 className="font-bold text-xs">Unboxing Heritage Hotel Baru di Bandung! 🌸✨</h5>
                      <p className="text-[9.5px] text-slate-300 mt-1 line-clamp-2">
                        Staycation estetik di kawasan bersejarah Bandung. Interior kolonial dikombinasikan dengan teknologi smart-room modern.
                      </p>
                    </div>
                    <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/35 backdrop-blur-xs hover:scale-110 transition p-4 rounded-full text-white cursor-pointer border border-white/20">
                      <Play className="h-6 w-6 fill-current text-white" />
                    </button>
                  </div>

                  <div className="md:col-span-6 space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800/80 rounded-xl p-4 space-y-3">
                      <h5 className="font-bold text-xs text-slate-800 dark:text-slate-200">Engagement Statistics</h5>
                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div className="bg-white dark:bg-[#0b1329] p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                          <span className="text-[9px] text-slate-400 block font-mono">LIKES</span>
                          <span className="text-sm font-bold text-pink-600 flex justify-center items-center gap-1 mt-0.5">
                            <Heart className="h-3.5 w-3.5 fill-current" /> 18,430
                          </span>
                        </div>
                        <div className="bg-white dark:bg-[#0b1329] p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                          <span className="text-[9px] text-slate-400 block font-mono">COMMENTS</span>
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-300 flex justify-center items-center gap-1 mt-0.5">
                            <MessageSquare className="h-3.5 w-3.5" /> 682
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h5 className="font-bold text-[10px] uppercase text-slate-400 font-mono tracking-wider">Top Comments</h5>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {[
                          { user: '@budi_wisata', comment: 'Gokil interior heritage-nya cakep parah, masuk list liburan bareng keluarga nih!' },
                          { user: '@neng_bandung', comment: 'Lokasinya deket jalan Braga ga kak? Akses parkirannya luas ga ya?' },
                          { user: '@arif_travel', comment: 'Rekomendasi hotel paling estetik di kuartal ini buat healing!' }
                        ].map((c, i) => (
                          <div key={i} className="text-xs p-2.5 bg-slate-50 dark:bg-slate-900/40 rounded-lg border border-slate-100 dark:border-slate-800">
                            <div className="font-bold text-slate-800 dark:text-slate-200">{c.user}</div>
                            <p className="text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">{c.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. TIKTOK VIEW */}
            {selectedPlatform === 'tiktok' && (
              <div className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xs space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-900 p-0.5 shrink-0">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" alt="avatar" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 flex items-center gap-1">
                        budi_tech <span className="text-teal-500 text-[10px]">✓</span>
                      </h4>
                      <p className="text-[9px] text-slate-400">Tech & AI Hardware Expert</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 font-mono font-bold px-2.5 py-1 rounded-lg">TikTok Video</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-5 relative aspect-[9/16] bg-black rounded-xl overflow-hidden shadow-lg max-h-96 mx-auto">
                    <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600" alt="Tiktok stream" className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex flex-col justify-end p-4 text-white text-left">
                      <h5 className="font-bold text-xs">Review Mini PC Biznet Cloud Client! 💻⚡</h5>
                      <p className="text-[9.5px] text-slate-300 mt-1 leading-relaxed">
                        Kecepatan render server lokal kenceng abis, latency stabil dibawah 5ms!
                      </p>
                    </div>
                    <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-xs hover:scale-110 transition p-4 rounded-full text-white cursor-pointer border border-white/10">
                      <Play className="h-6 w-6 fill-current text-white" />
                    </button>
                  </div>

                  <div className="md:col-span-7 space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800 rounded-xl p-4 space-y-3">
                      <h5 className="font-bold text-xs text-slate-800 dark:text-slate-200">Video Metrics</h5>
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="bg-white dark:bg-[#0b1329] p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                          <span className="text-[8px] text-slate-400 block font-mono">VIEWS</span>
                          <span className="font-bold text-rose-500 mt-0.5 block">82.4K</span>
                        </div>
                        <div className="bg-white dark:bg-[#0b1329] p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                          <span className="text-[8px] text-slate-400 block font-mono">LIKES</span>
                          <span className="font-bold text-slate-700 dark:text-slate-300 mt-0.5 block">12.5K</span>
                        </div>
                        <div className="bg-white dark:bg-[#0b1329] p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                          <span className="text-[8px] text-slate-400 block font-mono">SHARES</span>
                          <span className="font-bold text-slate-700 dark:text-slate-300 mt-0.5 block">4.3K</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-150 dark:border-emerald-800/60 rounded-xl space-y-2">
                      <div className="flex items-center gap-1 text-emerald-850 dark:text-emerald-400 font-bold text-xs">
                        <Award className="h-4 w-4 text-emerald-500" /> Sponsor Campaign: Biznet Cloud Jabar
                      </div>
                      <p className="text-[10px] text-slate-600 dark:text-slate-300 leading-relaxed">
                        Kampanye sosial ini terintegrasi langsung dengan portal AdOS untuk verifikasi pendaftaran calon pembeli UMKM.
                      </p>
                      <button className="bg-emerald-600 text-white font-bold text-[9px] px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition">
                        Lihat Lead Pipeline
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. TWITTER / X TIMELINE SIMULATION */}
            {selectedPlatform === 'twitter' && (
              <div className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xs space-y-6">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <h3 className="font-display font-bold text-sm text-slate-900 dark:text-slate-100">Live X / Twitter Stream</h3>
                    <p className="text-[10px] text-slate-400">Saluran simulasi asinkronus perbincangan netizen Jawa Barat.</p>
                  </div>
                  <button 
                    onClick={() => {
                      setTweets([
                        { id: Date.now(), author: 'Asep_Bandung', handle: '@asep_kumbara', content: 'Whoosh beneran bikin pangkas waktu tempuh Bandung-Jakarta. Ga pusing lagi sama macet Cipularang! 🚄🥳', likes: 12, retweets: 2, time: 'Just now', sentiment: 'positive' },
                        ...tweets
                      ]);
                    }}
                    className="p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg transition"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>

                {/* Twitter input field */}
                <form onSubmit={handlePostTweet} className="flex gap-3 bg-slate-50 dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800 p-3 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 select-none">
                    W
                  </div>
                  <div className="flex-grow space-y-2 text-right">
                    <textarea
                      placeholder="Apa tanggapan wargi Jawa Barat hari ini? Ketik postingan baru..."
                      value={newTweetText}
                      onChange={(e) => setNewTweetText(e.target.value)}
                      maxLength={140}
                      className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 text-xs rounded-lg p-2.5 resize-none focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                      rows={2}
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] text-slate-400 font-mono">{140 - newTweetText.length} karakter</span>
                      <button 
                        type="submit" 
                        className="px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white font-bold text-[10px] rounded-lg transition flex items-center gap-1 cursor-pointer"
                      >
                        <Send className="h-3 w-3" /> Post Tweet
                      </button>
                    </div>
                  </div>
                </form>

                {/* Tweets list */}
                <div className="space-y-3.5 max-h-96 overflow-y-auto pr-1">
                  {tweets.map((t) => (
                    <div key={t.id} className="p-4 bg-slate-50 dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800 rounded-xl space-y-2 transition-all duration-300 hover:border-sky-200 dark:hover:border-slate-700">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-xs">
                            {t.author.substring(0, 1)}
                          </div>
                          <div className="text-left">
                            <span className="font-bold text-xs text-slate-800 dark:text-slate-200">{t.author}</span>
                            <span className="text-[9px] text-slate-400 block -mt-0.5">{t.handle} • {t.time}</span>
                          </div>
                        </div>
                        
                        {/* Sentiment indicator */}
                        <span className={`text-[8px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${
                          t.sentiment === 'positive' ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400' :
                          t.sentiment === 'negative' ? 'bg-rose-100 dark:bg-rose-950/40 text-rose-800 dark:text-rose-400' :
                          'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}>
                          {t.sentiment}
                        </span>
                      </div>

                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed text-left font-sans">
                        {t.content}
                      </p>

                      <div className="flex gap-4 items-center text-[10px] text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800">
                        <button className="flex items-center gap-1 hover:text-rose-500">
                          <ThumbsUp className="h-3.5 w-3.5" /> {t.likes}
                        </button>
                        <span className="flex items-center gap-1">
                          <RefreshCw className="h-3 w-3" /> {t.retweets}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. LINKEDIN VIEW */}
            {selectedPlatform === 'linkedin' && (
              <div className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xs space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" alt="avatar" className="h-8 w-8 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
                    <div>
                      <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 flex items-center gap-1">
                        Siti Rahmawati <span className="bg-blue-600 text-white text-[7px] font-black px-1 rounded-full">In</span>
                      </h4>
                      <p className="text-[9px] text-slate-400">Stock Analyst & Corporate Advisor • Verified</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-mono font-bold px-2.5 py-1 rounded-lg">LinkedIn Card</span>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed text-left font-sans">
                  Bagaimana strategi mitigasi risiko inflasi daerah Jabar di kuartal kedua 2026? Baca kajian eksklusif kustom yang dirilis oleh Bank Mandiri Indonesia bersama jurnalisme data portal berita INFOBOS.
                </p>

                <div className="border border-slate-150 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-900/40 text-left">
                  <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600" alt="Bank Mandiri" className="w-full h-32 object-cover" />
                  <div className="p-3 flex justify-between items-center bg-white dark:bg-[#0b1329] border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="font-bold text-[10px] text-slate-900 dark:text-slate-100 block">Download Whitepaper Risiko Makro Q2</span>
                      <span className="text-[8px] text-slate-400 font-mono block">Edisi Kolaborasi Bank Mandiri & INFOBOS</span>
                    </div>
                    <a href="#mandiri-pdf" className="bg-[#002B5B] text-white font-bold text-[9px] px-3.5 py-1.5 rounded-lg hover:bg-opacity-90 transition shadow-2xs">
                      Unduh PDF
                    </a>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* TAB CONTENT: SENTIMENT ANALYSER */}
      {activeTab === 'sentiment' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xs text-left">
            <h3 className="font-display font-bold text-base text-[#002B5B] dark:text-pink-400">Opinions & Sentiment Radar Jabar</h3>
            <p className="text-xs text-slate-400 mt-0.5">Analisis asinkronus sentimen netizen atas 4 isu terhangat pekan ini.</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
              
              {/* Table stats */}
              <div className="lg:col-span-6 space-y-4">
                {sentimentTopics.map((item, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800 rounded-xl space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs text-slate-800 dark:text-slate-200">{item.topic}</span>
                      <span className="text-[9px] font-mono bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full">{item.volume}</span>
                    </div>
                    
                    {/* Progress multi bar */}
                    <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden flex">
                      <div className="bg-emerald-500" style={{ width: `${item.positive}%` }} title={`Positive ${item.positive}%`} />
                      <div className="bg-slate-400" style={{ width: `${item.neutral}%` }} title={`Neutral ${item.neutral}%`} />
                      <div className="bg-rose-500" style={{ width: `${item.negative}%` }} title={`Negative ${item.negative}%`} />
                    </div>

                    <div className="flex justify-between text-[9px] font-mono text-slate-400">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">Positif {item.positive}%</span>
                      <span>Netral {item.neutral}%</span>
                      <span className="text-rose-600 dark:text-rose-400 font-bold">Negatif {item.negative}%</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Graphic Chart representation */}
              <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800 rounded-2xl p-4 h-80 flex flex-col justify-between">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Visual Comparison of Sentiments</h4>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={sentimentTopics}
                      margin={{ top: 20, right: 10, left: -20, bottom: 5 }}
                    >
                      <XAxis dataKey="topic" tick={{ fontSize: 9, fill: '#94a3b8' }} />
                      <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: 10 }} />
                      <Legend wrapperStyle={{ fontSize: 10 }} />
                      <Bar dataKey="positive" name="Positive %" fill="#10b981" stackId="a" />
                      <Bar dataKey="neutral" name="Neutral %" fill="#94a3b8" stackId="a" />
                      <Bar dataKey="negative" name="Negative %" fill="#f43f5e" stackId="a" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: INFLUENCER PLANNER */}
      {activeTab === 'planner' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Creator selections list */}
          <div className="lg:col-span-5 bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-2xs space-y-4">
            <div>
              <h3 className="font-display font-bold text-sm text-slate-900 dark:text-slate-100">1. Select Influencer Partners</h3>
              <p className="text-[10px] text-slate-400">Pilih satu atau lebih kreator konten lokal Jabar untuk kampanye Anda.</p>
            </div>

            <div className="space-y-3">
              {creatorsList.map((c) => {
                const isSelected = selectedCreators.includes(c.username);
                return (
                  <button
                    key={c.username}
                    onClick={() => toggleCreatorSelect(c.username)}
                    className={`w-full p-3.5 rounded-xl border text-left transition flex items-start gap-3 cursor-pointer ${
                      isSelected 
                        ? 'border-pink-500 bg-pink-500/5 dark:bg-pink-950/20 shadow-3xs' 
                        : 'border-slate-100 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <input 
                      type="checkbox" 
                      checked={isSelected} 
                      onChange={() => {}} // Controlled via button onClick
                      className="mt-1 accent-pink-600 rounded shrink-0 pointer-events-none" 
                    />
                    <img src={c.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-200 dark:border-slate-700" />
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-slate-800 dark:text-slate-100 text-xs truncate block">{c.fullName}</span>
                        <span className="text-[9px] font-mono font-bold text-pink-600 dark:text-pink-400 shrink-0">Rp {c.baseRate.toLocaleString('id-ID')}</span>
                      </div>
                      <span className="text-[9.5px] text-slate-400 block -mt-0.5">@{c.username} • {c.platform}</span>
                      <div className="mt-1.5 flex gap-1.5 flex-wrap">
                        <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono text-[7.5px] px-2 py-0.5 rounded uppercase">{c.niche}</span>
                        <span className="bg-pink-100 dark:bg-pink-950/30 text-pink-800 dark:text-pink-400 font-mono text-[7.5px] px-2 py-0.5 rounded uppercase">{c.followers.toLocaleString()} Followers</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Calculator and CRM Lead */}
          <div className="lg:col-span-7 bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xs space-y-6 text-left">
            <div>
              <h3 className="font-display font-bold text-sm text-slate-900 dark:text-slate-100">2. Campaign Parameters & Quotation</h3>
              <p className="text-[10px] text-slate-400 font-medium">Hitung estimasi pengeluaran, CTR, serta potensi impressions kampanye.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-900/40 p-4 border border-slate-150 dark:border-slate-800/80 rounded-xl space-y-2">
                <label className="block text-[10px] font-bold uppercase text-slate-400 font-mono">Your Budget (Rp):</label>
                <input 
                  type="number" 
                  step="1000000"
                  value={campaignBudget}
                  onChange={(e) => setCampaignBudget(Number(e.target.value))}
                  className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-lg p-2 font-mono font-bold focus:outline-none"
                />
              </div>

              <div className="bg-slate-50 dark:bg-slate-900/40 p-4 border border-slate-150 dark:border-slate-800/80 rounded-xl space-y-2">
                <label className="block text-[10px] font-bold uppercase text-slate-400 font-mono">Campaign Format:</label>
                <select 
                  value={campaignFormat}
                  onChange={(e) => setCampaignFormat(e.target.value as any)}
                  className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-lg p-2 font-sans font-semibold focus:outline-none"
                >
                  <option value="reels">Single Instagram Reels / Post</option>
                  <option value="tiktok">Single TikTok Sponsored Review</option>
                  <option value="multi">Omni-Channel (Multi Platform)</option>
                </select>
              </div>
            </div>

            {/* LIVE QUOTATION BOX */}
            <div className="p-5 bg-gradient-to-br from-[#002B5B] to-[#001733] text-white rounded-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-[9px] font-mono font-bold uppercase text-slate-300">Quotation Summary</span>
                <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                  budgetPerformance === 'Aman' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                }`}>
                  {budgetPerformance}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Selected Influencers:</span>
                  <span className="font-bold">{selectedCreators.length} Partners</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Total Partner Cost:</span>
                  <span className="font-bold text-[#FFD700]">Rp {totalCostOfCreators.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Est. Total Impressions Reach:</span>
                  <span className="font-bold text-emerald-400">{totalEstReach.toLocaleString()} Netizens</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-3 flex justify-between items-center">
                <div>
                  <span className="text-[9px] text-slate-400 block font-mono">EST. COST-PER-ENGAGEMENT</span>
                  <h4 className="text-base font-black text-white">Rp {(totalCostOfCreators / Math.max(totalEstReach, 1) * 1.5).toFixed(2)} / click</h4>
                </div>
                <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-md">
                  Kirim Quotation &rarr;
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB CONTENT: ACTIVE CAMPAIGNS */}
      {activeTab === 'metrics' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xs text-left space-y-4">
            <h3 className="font-display font-bold text-base text-[#002B5B] dark:text-pink-400">Active Advertisements &amp; AdOS Analytics</h3>
            <p className="text-xs text-slate-400">Monitoring real-time CTR, Impressions, dan performa sponsor media sosial.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { name: 'Active Ads Placed', val: '4 Active', change: '+2 pekan ini', color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900/40' },
                { name: 'Total CTR Average', val: '3.12%', change: 'Di atas target 2.5%', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/40' },
                { name: 'Sponsor Budget Transacted', val: 'Rp 45M+', change: 'AdOS Escrow Aman', color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/40' },
                { name: 'Bot Protection Status', val: '99.9% Clean', change: 'Shield Active', color: 'text-teal-600 bg-teal-50 dark:bg-teal-950/20 border-teal-100 dark:border-teal-900/40' }
              ].map((stat, i) => (
                <div key={i} className={`p-4 rounded-xl border ${stat.color} text-left`}>
                  <span className="text-[9px] font-mono uppercase font-black tracking-wider block opacity-70">{stat.name}</span>
                  <h4 className="text-lg font-black mt-1">{stat.val}</h4>
                  <span className="text-[9px] font-medium block mt-0.5">{stat.change}</span>
                </div>
              ))}
            </div>

            <div className="border border-slate-150 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50 dark:bg-[#0b1329]">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold uppercase font-mono text-[9px]">
                      <th className="p-3">Campaign Name</th>
                      <th className="p-3">Partner Influencer</th>
                      <th className="p-3">Type Format</th>
                      <th className="p-3">Est. Reach</th>
                      <th className="p-3">Sponsor Budget</th>
                      <th className="p-3">Live CTR</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-300">
                    {[
                      { name: 'Indofood Culinary Festival', partner: '@neng_kuliner', format: 'Instagram Feed Post', reach: '180,000', budget: 'Rp 8,000,000', ctr: '3.44%', status: 'Running' },
                      { name: 'Whoosh Ticket Promo Campaign', partner: '@kamil_design', format: 'Reels Sponsor Video', reach: '120,000', budget: 'Rp 10,000,000', ctr: '2.89%', status: 'Completed' },
                      { name: 'Mandiri Fiscal Report Q2', partner: '@siti_finance', format: 'LinkedIn Document Card', reach: '90,000', budget: 'Rp 12,000,000', ctr: '3.11%', status: 'Running' },
                      { name: 'Biznet VPS Server Review', partner: '@budi_tech', format: 'TikTok Interactive Review', reach: '250,000', budget: 'Rp 15,000,000', ctr: '3.02%', status: 'Running' }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-100/50 dark:hover:bg-slate-800/40">
                        <td className="p-3 font-bold text-slate-800 dark:text-slate-100">{row.name}</td>
                        <td className="p-3 font-mono text-pink-600 dark:text-pink-400">{row.partner}</td>
                        <td className="p-3">{row.format}</td>
                        <td className="p-3">{row.reach}</td>
                        <td className="p-3 font-mono font-bold">{row.budget}</td>
                        <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold font-mono">{row.ctr}</td>
                        <td className="p-3">
                          <span className={`text-[8px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                            row.status === 'Running' ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
