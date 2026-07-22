import React, { useState } from 'react';
import { 
  Tv, Youtube, Radio, FileText, Image, Newspaper, Mail, Rss, 
  ArrowLeft, Eye, Award, TrendingUp, DollarSign, Calendar, Compass, 
  MapPin, Check, Sparkles, Heart, ChevronRight, BarChart2 
} from 'lucide-react';

interface Channel {
  id: string;
  name: string;
  icon: any;
  subscribers: string;
  viewsMonth: string;
  engagement: string;
  growth: string;
  revenueEst: string;
  description: string;
  topTopics: string[];
  topEntities: string[];
  topLocations: string[];
  latestPosts: { title: string; date: string; status: 'published' | 'scheduled' }[];
  aiAdvice: string;
}

export default function ChannelCenter() {
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'calendar' | 'ai'>('overview');

  const channels: Channel[] = [
    {
      id: 'youtube',
      name: 'YouTube Video Center',
      icon: Youtube,
      subscribers: '124.5K Subs',
      viewsMonth: '2.4M Views',
      engagement: '6.4% CTR',
      growth: '+12.4%',
      revenueEst: 'Rp 45,200,000',
      description: 'Saluran siaran utama video dokumenter jurnalisme investigasi, rekaman webinar, dan bincang-bincang eksklusif tokoh negara.',
      topTopics: ['Gedung Sate Heritage', 'Sri Mulyani Interview', 'Mega-Infrastruktur'],
      topEntities: ['Ridwan Kamil', 'Sri Mulyani', 'Kemenkeu RI'],
      topLocations: ['Bandung', 'Jakarta Pusat', 'Semarang'],
      latestPosts: [
        { title: 'Menelusuri Terowongan Rahasia Gedung Sate Jabar', date: 'Kemarin, 14:00', status: 'published' },
        { title: 'Kajian Akademis: Implementasi LLM Lokal Sunda', date: 'Esok, 09:00', status: 'scheduled' }
      ],
      aiAdvice: 'Analisis audiens menunjukkan retensi pemirsa meningkat 40% pada video berdurasi di atas 15 menit dengan topik cagar budaya kolonial. Targetkan kata kunci SEO: "Sejarah Gedung Sate" dan "Arsitektur Indische".'
    },
    {
      id: 'tiktok',
      name: 'TikTok Reels Center',
      icon: Tv,
      subscribers: '310.2K Followers',
      viewsMonth: '8.1M Views',
      engagement: '9.2% Engagement',
      growth: '+24.5%',
      revenueEst: 'Rp 32,400,000',
      description: 'Pilar distribusi video vertikal berformat pendek (Shorts) yang menargetkan milenial dan gen-z melalui konten edukasi cek fakta.',
      topTopics: ['Fact-Check Hoaks', 'Megathrust Deepfake', 'Tips Pajak Digital'],
      topEntities: ['BMKG', 'Kominfo', 'Evolis AI'],
      topLocations: ['DKI Jakarta', 'Bandung', 'Surabaya'],
      latestPosts: [
        { title: 'Penjelasan BMKG Tsunami Megathrust: HOAKS!', date: 'Hari ini, 10:00', status: 'published' },
        { title: 'Cara Ajukan Pajak DTP PMK-2026 kurang dari 3 menit', date: 'Esok, 12:00', status: 'scheduled' }
      ],
      aiAdvice: 'Gunakan sound trek trending bernuansa gamelan priangan akustik guna mencocokkan psikologi audiens regional Jawa Barat. Hashtags optimal: #SundaSmart #CekFaktaInfobos.'
    },
    {
      id: 'newsletter',
      name: 'Substack Newsletter Center',
      icon: Mail,
      subscribers: '45.8K Members',
      viewsMonth: '120.5K Reads',
      engagement: '48.2% Open Rate',
      growth: '+8.1%',
      revenueEst: 'Rp 64,800,000',
      description: 'Laporan premium mingguan (Briefing Intelijen Riset) yang dikirimkan langsung ke email para pejabat eksekutif korporasi dan dewan akademis.',
      topTopics: ['Analisis Fiskal PMK-2026', 'Investasi Daerah Jabar', 'Forensik Digital AI'],
      topEntities: ['Kemenkeu RI', 'Bank Indonesia', 'Bappeda'],
      topLocations: ['Jakarta', 'Bandung', 'Singapore'],
      latestPosts: [
        { title: 'Briefing Makro Jabar: Skema KPBU Revitalisasi Cagar Budaya', date: '3 hari lalu', status: 'published' },
        { title: 'Tinjauan Fiskal PMK-2026: Dampak bagi Arus Kas Startup', date: 'Lusa, 08:00', status: 'scheduled' }
      ],
      aiAdvice: 'Audiens korporat memiliki waktu membaca paling aktif pada hari Selasa pukul 07:30 - 09:00 WIB. Pertahankan kedalaman artikel riset dengan melampirkan berkas dataset CSV.'
    },
    {
      id: 'podcast',
      name: 'Podcast Media Hub',
      icon: Radio,
      subscribers: '28.1K Listeners',
      viewsMonth: '85.4K Plays',
      engagement: '82.4% Completion',
      growth: '+11.2%',
      revenueEst: 'Rp 14,500,000',
      description: 'Saluran obrolan audio mendalam (podcast) di Spotify dan Apple yang menyajikan wawancara santai tapi berbobot bersama para ahli.',
      topTopics: ['Riset Linguistik MIT', 'Fintech Inklusi Sosial', 'Sejarah Kolonial Jabar'],
      topEntities: ['MIT Research Team', 'Puslitbang Jabar', 'ITB'],
      topLocations: ['Bandung', 'Yogyakarta', 'Jakarta'],
      latestPosts: [
        { title: 'Preservasi Dialek Sunda Melalui Model Generative AI', date: '2 hari lalu', status: 'published' },
        { title: 'Crypto Mafia Tambang: Jejak Pencucian Uang di Kalimantan', date: 'Lusa, 14:00', status: 'scheduled' }
      ],
      aiAdvice: 'Sertakan transkrip tersinkron pada aplikasi visual untuk mendongkrak retensi pendengar yang membaca sambil mendengar hingga 2x lipat.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-sans text-left space-y-6">
      
      {selectedChannel ? (
        // ==========================================
        // DETAILED SUB-DASHBOARD VIEW FOR SELECTED CHANNEL
        // ==========================================
        <div className="space-y-6">
          {/* Back button */}
          <div>
            <button 
              onClick={() => { setSelectedChannel(null); setActiveTab('overview'); }}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-950 transition bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Media Channel Center
            </button>
          </div>

          {/* Sub Header Profile */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-[#002B5B]/10 text-[#002B5B] rounded-2xl">
                <selectedChannel.icon className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] bg-[#002B5B] text-[#FFD700] font-extrabold px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                  Channel Dashboard Active
                </span>
                <h1 className="font-display font-black text-xl md:text-2xl text-[#002B5B]">{selectedChannel.name}</h1>
                <p className="text-xs text-slate-500 leading-normal max-w-xl">{selectedChannel.description}</p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="text-xs text-slate-400 font-mono font-bold uppercase">Followers / Audience:</div>
              <div className="text-xl font-display font-black text-[#002B5B]">{selectedChannel.subscribers}</div>
            </div>
          </div>

          {/* Sub Navigation tabs inside sub-dashboard */}
          <div className="flex bg-slate-150 p-1 rounded-xl border border-slate-200 text-xs font-bold max-w-md">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-2 rounded-lg text-center transition ${activeTab === 'overview' ? 'bg-[#002B5B] text-white shadow-3xs' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('analytics')}
              className={`flex-1 py-2 rounded-lg text-center transition ${activeTab === 'analytics' ? 'bg-[#002B5B] text-white shadow-3xs' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Grafik Analytics
            </button>
            <button 
              onClick={() => setActiveTab('calendar')}
              className={`flex-1 py-2 rounded-lg text-center transition ${activeTab === 'calendar' ? 'bg-[#002B5B] text-white shadow-3xs' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Publikasi Kalender
            </button>
            <button 
              onClick={() => setActiveTab('ai')}
              className={`flex-1 py-2 rounded-lg text-center transition flex items-center justify-center gap-1 ${activeTab === 'ai' ? 'bg-[#002B5B] text-white shadow-3xs' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              Saran AI
            </button>
          </div>

          {/* DYNAMIC SUB-TABS PORTAL */}
          <div className="min-h-[280px]">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Highlights row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 shadow-xs">
                    <div className="p-2.5 bg-blue-50 rounded-xl text-blue-500">
                      <Eye className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-400 font-bold uppercase">Bulanan Penonton</div>
                      <div className="text-base font-display font-black text-slate-900">{selectedChannel.viewsMonth}</div>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 shadow-xs">
                    <div className="p-2.5 bg-amber-50 rounded-xl text-amber-500">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-400 font-bold uppercase">Tingkat CTR / Interaksi</div>
                      <div className="text-base font-display font-black text-slate-900">{selectedChannel.engagement}</div>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 shadow-xs">
                    <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-500">
                      <DollarSign className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-400 font-bold uppercase">Estimasi Monetisasi</div>
                      <div className="text-base font-display font-black text-[#2B7A78]">{selectedChannel.revenueEst}</div>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 shadow-xs">
                    <div className="p-2.5 bg-[#002B5B]/5 rounded-xl text-[#002B5B]">
                      <Compass className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-400 font-bold uppercase">Laju Pertumbuhan</div>
                      <div className="text-base font-display font-black text-emerald-600">{selectedChannel.growth}</div>
                    </div>
                  </div>
                </div>

                {/* Sub-lists entities */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Top Entities */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-xs">
                    <h4 className="font-display font-bold text-xs text-slate-900 uppercase border-b border-slate-100 pb-2 flex items-center gap-1.5">
                      <Award className="h-4.5 w-4.5 text-amber-500" />
                      Top Entitas Tertaut
                    </h4>
                    <div className="space-y-2">
                      {selectedChannel.topEntities.map((ent, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs font-semibold p-1.5 bg-slate-50 rounded-lg">
                          <span>{ent}</span>
                          <span className="text-[10px] text-slate-400">Rank #{idx+1}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Topics */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-xs">
                    <h4 className="font-display font-bold text-xs text-slate-900 uppercase border-b border-slate-100 pb-2 flex items-center gap-1.5">
                      <TrendingUp className="h-4.5 w-4.5 text-[#2B7A78]" />
                      Top Topik Terdeteksi
                    </h4>
                    <div className="space-y-2">
                      {selectedChannel.topTopics.map((top, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs font-semibold p-1.5 bg-slate-50 rounded-lg">
                          <span>{top}</span>
                          <span className="text-[9px] text-[#2B7A78]">Active</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Locations */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-xs">
                    <h4 className="font-display font-bold text-xs text-slate-900 uppercase border-b border-slate-100 pb-2 flex items-center gap-1.5">
                      <MapPin className="h-4.5 w-4.5 text-rose-500" />
                      Top Wilayah Penonton
                    </h4>
                    <div className="space-y-2">
                      {selectedChannel.topLocations.map((loc, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs font-semibold p-1.5 bg-slate-50 rounded-lg">
                          <span>{loc}</span>
                          <span className="text-[10px] text-slate-400 font-mono">Geo Active</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h4 className="font-display font-black text-xs text-slate-900 uppercase">Trend Grafik Interaksi Audien Mingguan</h4>
                  <p className="text-slate-400 text-[10px] mt-0.5">Dihitung otomatis per jam oleh modul EVOLIS Media Intelligence.</p>
                </div>

                {/* SVG Line / Bar Chart (Extremely clean & interactive simulation) */}
                <div className="h-56 w-full flex items-end justify-between gap-2 bg-slate-50 p-6 rounded-xl border border-slate-150 relative">
                  {/* Grid lines */}
                  <div className="absolute inset-y-0 left-0 right-0 p-6 flex flex-col justify-between pointer-events-none opacity-10">
                    <div className="border-b border-black w-full"></div>
                    <div className="border-b border-black w-full"></div>
                    <div className="border-b border-black w-full"></div>
                  </div>

                  {/* Simulated bars */}
                  {[
                    { label: 'Senin', val: '30%', height: 'h-1/5 bg-blue-400' },
                    { label: 'Selasa', val: '65%', height: 'h-3/5 bg-blue-500' },
                    { label: 'Rabu', val: '80%', height: 'h-4/5 bg-teal-500' },
                    { label: 'Kamis', val: '45%', height: 'h-2/5 bg-blue-400' },
                    { label: 'Jumat', val: '95%', height: 'h-[95%] bg-indigo-600' },
                    { label: 'Sabtu', val: '60%', height: 'h-3/5 bg-blue-500' },
                    { label: 'Minggu', val: '75%', height: 'h-[75%] bg-teal-500' }
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group/bar relative">
                      <span className="absolute top-[-30px] bg-slate-900 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded shadow-md opacity-0 group-hover/bar:opacity-100 transition whitespace-nowrap z-10">
                        {bar.val} Views CTR
                      </span>
                      <div className={`w-full ${bar.height} rounded-t-lg shadow-sm group-hover/bar:brightness-105 transition duration-300`}></div>
                      <span className="text-[10px] font-semibold text-slate-500 font-mono">{bar.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'calendar' && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-black text-xs text-slate-900 uppercase">Jadwal Kalender Penerbitan Laporan</h4>
                    <p className="text-slate-400 text-[10px] mt-0.5">Integrasi penjadwalan cross-posting platform otomatis.</p>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">Hari ini: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>

                <div className="space-y-3.5">
                  {selectedChannel.latestPosts.map((post, idx) => (
                    <div key={idx} className="p-3.5 border border-slate-150 rounded-xl flex items-center justify-between gap-4 text-xs font-semibold hover:bg-slate-50 transition">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-slate-400 shrink-0" />
                        <div>
                          <div className="text-slate-900 leading-snug">{post.title}</div>
                          <div className="text-[10px] text-slate-400 font-semibold font-mono mt-0.5">{post.date}</div>
                        </div>
                      </div>

                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                        post.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800 animate-pulse'
                      }`}>
                        {post.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'ai' && (
              <div className="bg-gradient-to-r from-[#002B5B] to-slate-900 text-slate-200 border border-white/5 rounded-2xl p-6 space-y-4 shadow-md">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#FFD700] border-b border-white/10 pb-3">
                  <Sparkles className="h-4 w-4" />
                  <span>Saran AI Jurnalisme EVOLIS</span>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed font-semibold text-white">
                  {selectedChannel.aiAdvice}
                </p>

                <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono font-bold">
                  <span className="px-2.5 py-1 bg-white/10 rounded-lg text-[#FFD700]">#EvolisSEO</span>
                  <span className="px-2.5 py-1 bg-white/10 rounded-lg text-[#FFD700]">#Optimization</span>
                  <span className="px-2.5 py-1 bg-white/10 rounded-lg text-[#FFD700]">#TrendAlert</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        // ==========================================
        // MAIN CHANNEL SELECTOR GALLERY VIEW
        // ==========================================
        <div className="space-y-6">
          {/* Main Title Header */}
          <div>
            <h1 className="font-display font-black text-2xl md:text-3xl text-[#002B5B]">MEDIA CHANNEL OPERATING CENTER</h1>
            <p className="text-slate-500 text-xs mt-1">Kelola, koordinasi, analisis, serta pantau seluruh jejaring platform digital Anda dalam satu pusat komando intelijen.</p>
          </div>

          {/* Grid list of platform center */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {channels.map(chan => (
              <div 
                key={chan.id}
                onClick={() => setSelectedChannel(chan)}
                className="group cursor-pointer bg-white border border-slate-200 hover:border-[#002B5B] rounded-2xl p-5 shadow-xs hover:shadow-sm transition flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-[#002B5B]/5 text-[#002B5B] rounded-xl group-hover:bg-[#002B5B]/10 transition">
                      <chan.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-sm sm:text-base text-[#002B5B] group-hover:text-[#2B7A78] transition">
                        {chan.name}
                      </h3>
                      <span className="text-[10px] text-slate-400 font-mono font-semibold">{chan.subscribers}</span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-[#002B5B] transition shrink-0" />
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {chan.description}
                </p>

                {/* mini highlights */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono font-bold text-slate-400">
                  <span>Views: <strong className="text-slate-800">{chan.viewsMonth}</strong></span>
                  <span>Rev: <strong className="text-emerald-600">{chan.revenueEst}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
