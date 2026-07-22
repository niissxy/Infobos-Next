import React, { useState } from 'react';
import { 
  Play, Pause, Volume2, Maximize2, Share2, Heart, Clock, Search, 
  Tv, Film, Sparkles, Youtube, Check, Eye, ChevronRight, MessageSquare 
} from 'lucide-react';
import AdZone from './AdZone';
import { IntegrationWidget } from './IntegrationEngine';

interface VideoItem {
  id: string;
  title: string;
  creator: string;
  views: string;
  duration: string;
  uploadedAt: string;
  thumbnail: string;
  videoUrl: string;
  category: 'trending' | 'documentary' | 'interview' | 'tutorial' | 'webinar' | 'livestream';
  summary: string;
}

export default function VideoHub({ onSelectArticle }: { onSelectArticle?: (slug: string) => void }) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Custom Video Player States
  const [playing, setPlaying] = useState<boolean>(false);
  const [currentProgress, setCurrentProgress] = useState<number>(35);
  const [volume, setVolume] = useState<number>(80);
  const [liked, setLiked] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem>({
    id: 'vid-1',
    title: 'Gedung Sate Heritage: Menelusuri Arsitektur Indische dan Lorong Rahasia Zaman Kolonial',
    creator: 'Redaksi INFOBOS Documentary',
    views: '12.4K',
    duration: '14:20',
    uploadedAt: '2 jam lalu',
    thumbnail: 'https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&q=80&w=800',
    videoUrl: '#',
    category: 'documentary',
    summary: 'Kajian eksklusif mengenai elemen arsitektur karya J. Gerber, ruang bawah tanah tersembunyi, hingga rencana tata pariwisata terpadu tahun 2026.'
  });

  const videos: VideoItem[] = [
    {
      id: 'vid-1',
      title: 'Gedung Sate Heritage: Menelusuri Arsitektur Indische dan Lorong Rahasia Zaman Kolonial',
      creator: 'Redaksi INFOBOS Documentary',
      views: '12.4K',
      duration: '14:20',
      uploadedAt: '2 jam lalu',
      thumbnail: 'https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&q=80&w=800',
      videoUrl: '#',
      category: 'documentary',
      summary: 'Kajian eksklusif mengenai elemen arsitektur karya J. Gerber, ruang bawah tanah tersembunyi, hingga rencana tata pariwisata terpadu tahun 2026.'
    },
    {
      id: 'vid-2',
      title: 'Wawancara Eksklusif Sri Mulyani: Kebijakan Stimulus Fiskal Digital PMK-2026 & Dampak Bagi Startup Lokal',
      creator: 'Evolis Media Intelligence',
      views: '8.1K',
      duration: '22:15',
      uploadedAt: '5 jam lalu',
      thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800',
      videoUrl: '#',
      category: 'interview',
      summary: 'Menteri Keuangan membedah insentif pajak baru untuk startup di kota kreatif, dengan target akselerasi investasi regional.'
    },
    {
      id: 'vid-3',
      title: 'Tutorial Komprehensif: Membangun Chatbot AI Bahasa Sunda-Melayu dengan Akurasi 94% Berbasis Model LLM-MIT',
      creator: 'INFOBOS Technical Lab',
      views: '3.5K',
      duration: '45:10',
      uploadedAt: '1 hari lalu',
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
      videoUrl: '#',
      category: 'tutorial',
      summary: 'Step-by-step penyusunan korpus dialek lokal, fine-tuning parameter, hingga deploy API serverless skala produksi.'
    },
    {
      id: 'vid-4',
      title: 'Webinar Nasional: Menilik Prospek Kripto & Web3 di Indonesia Pasca Pajak Transaksi Baru',
      creator: 'VIRALOG Crypto Panel',
      views: '1.9K',
      duration: '1:05:40',
      uploadedAt: '2 hari lalu',
      thumbnail: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800',
      videoUrl: '#',
      category: 'webinar',
      summary: 'Panel diskusi bersama regulator Bappebti, pendiri bursa pertukaran, dan perwakilan asosiasi teknologi finansial.'
    },
    {
      id: 'vid-5',
      title: 'Erupsi Gunung Marapi Terkini: Siaran Langsung CCTV Aktivitas Kawah Utama & Zona Bahaya',
      creator: 'BMKG / BNPB Stream Center',
      views: '24.1K',
      duration: 'LIVESTREAM',
      uploadedAt: 'Sedang Berlangsung',
      thumbnail: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800',
      videoUrl: '#',
      category: 'livestream',
      summary: 'Pantauan visual realtime gempa embusan, deformasi lereng, dan sebaran hujan abu vulkanik di Sumatera Barat.'
    },
    {
      id: 'vid-6',
      title: 'Investigasi Mafia Tambang: Jejak Pencucian Uang Kartel Kalimantan via Stablecoin Kripto',
      creator: 'Redaksi Investigasi Khusus',
      views: '15.6K',
      duration: '18:45',
      uploadedAt: '3 hari lalu',
      thumbnail: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800',
      videoUrl: '#',
      category: 'trending',
      summary: 'Bagaimana aset kripto digunakan oleh oknum korporasi untuk menyamarkan dana tambang ilegal bernilai Rp 1.2 Triliun.'
    }
  ];

  const filteredVideos = videos.filter(v => {
    const matchCat = activeCategory === 'all' || v.category === activeCategory;
    const matchSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        v.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-sans text-left space-y-6">
      
      {/* Header and Branding */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Tv className="h-6 w-6 text-teal-500" />
            <h1 className="font-display font-black text-2xl md:text-3xl text-[#002B5B] dark:text-slate-100">VIDEO HUB & STREAMING CENTER</h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Eksplorasi jurnalisme visual, siaran langsung tanggap bencana, kajian ilmiah, dan panel diskusi interaktif.</p>
        </div>
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Cari video jurnalisme..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500 dark:focus:border-teal-500"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
        </div>
      </div>

      {/* Category Toggles */}
      <div className="flex gap-2 overflow-x-auto pb-1 whitespace-nowrap scrollbar-thin">
        {[
          { id: 'all', label: 'Semua Video', count: videos.length },
          { id: 'trending', label: 'Trending', count: videos.filter(v=>v.category==='trending').length },
          { id: 'documentary', label: 'Dokumenter', count: videos.filter(v=>v.category==='documentary').length },
          { id: 'interview', label: 'Wawancara', count: videos.filter(v=>v.category==='interview').length },
          { id: 'tutorial', label: 'Tutorial', count: videos.filter(v=>v.category==='tutorial').length },
          { id: 'webinar', label: 'Webinar', count: videos.filter(v=>v.category==='webinar').length },
          { id: 'livestream', label: 'Live Stream', count: videos.filter(v=>v.category==='livestream').length }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
              activeCategory === cat.id 
                ? 'bg-[#002B5B] text-[#FFD700] border-[#002B5B] dark:bg-teal-600 dark:text-white dark:border-teal-600 shadow-sm' 
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800 dark:hover:bg-slate-800'
            }`}
          >
            <span>{cat.label}</span>
            <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${activeCategory === cat.id ? 'bg-[#001f42] text-white dark:bg-teal-800/40 dark:text-teal-200' : 'bg-slate-100 text-slate-500 dark:bg-slate-850 dark:text-slate-400'}`}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Main Grid: Player + Sidebar / List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Custom Mock Video Player & Details (8 columns) */}
        <div className="lg:col-span-8 space-y-4">
          {selectedVideo.id === 'vid-1' ? (
            <IntegrationWidget widgetId="widget-video-gedungsate" className="mb-4" />
          ) : selectedVideo.id === 'vid-5' ? (
            <IntegrationWidget widgetId="widget-live-marapi" className="mb-4" />
          ) : (
            <div className="relative bg-black rounded-2xl overflow-hidden aspect-video border border-slate-850 shadow-lg group">
              {/* Thumbnail background */}
              <img 
                src={selectedVideo.thumbnail} 
                alt={selectedVideo.title}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-opacity duration-300 ${playing ? 'opacity-30' : 'opacity-100'}`}
              />

              {/* Play Button overlay */}
              {!playing && (
                <div className="absolute inset-0 bg-black/60 z-10 flex flex-col items-center justify-center p-4">
                  <button 
                    onClick={() => setPlaying(true)}
                    className="w-16 h-16 bg-teal-500 hover:bg-teal-400 text-white rounded-full flex items-center justify-center shadow-2xl transition transform hover:scale-105 mb-4"
                  >
                    <Play className="h-8 w-8 fill-white ml-1" />
                  </button>
                  <div className="w-full max-w-sm pointer-events-auto">
                    <AdZone zone="pre_roll" pageContext={{ category: 'video' }} />
                  </div>
                </div>
              )}

              {/* Live Indicator tag */}
              {selectedVideo.duration === 'LIVESTREAM' && (
                <span className="absolute top-4 left-4 bg-rose-600 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded flex items-center gap-1 animate-pulse shadow-md">
                  <span className="h-1.5 w-1.5 bg-white rounded-full"></span>
                  LIVE
                </span>
              )}

              {/* Custom Interactive Player Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition duration-300">
                {/* Scrub line */}
                <div 
                  className="relative w-full h-1 bg-white/20 rounded cursor-pointer group/scrub"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
                    setCurrentProgress(pct);
                  }}
                >
                  <div className="absolute left-0 top-0 h-full bg-teal-400 rounded" style={{ width: `${currentProgress}%` }}></div>
                  <div className="absolute top-[-4px] w-3 h-3 bg-white rounded-full shadow-md hidden group-hover/scrub:block" style={{ left: `calc(${currentProgress}% - 6px)` }}></div>
                </div>

                <div className="flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setPlaying(!playing)} className="hover:text-teal-400 transition">
                      {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </button>
                    <div className="flex items-center gap-2">
                      <Volume2 className="h-4.5 w-4.5 text-slate-400" />
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        className="w-16 accent-teal-400 h-1 bg-white/20 rounded-lg cursor-pointer"
                      />
                    </div>
                    <span className="text-[11px] text-slate-300 font-mono">
                      {selectedVideo.duration === 'LIVESTREAM' ? 'LIVE' : `04:15 / ${selectedVideo.duration}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">1080p HD</span>
                    <button className="hover:text-teal-400 transition">
                      <Maximize2 className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Video Metadata Panel */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 text-left shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[9px] bg-teal-100 dark:bg-teal-950/40 text-teal-800 dark:text-teal-400 font-bold px-2 py-0.5 rounded font-mono uppercase">
                    {selectedVideo.category}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono font-medium">
                    {selectedVideo.views} views • {selectedVideo.uploadedAt}
                  </span>
                </div>
                <h2 className="font-display font-bold text-lg md:text-xl text-[#002B5B] dark:text-slate-100 leading-snug">
                  {selectedVideo.title}
                </h2>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 shrink-0">
                <button 
                  onClick={() => setLiked(!liked)}
                  className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition ${
                    liked 
                      ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/30 shadow-2xs' 
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{liked ? 'Suka' : 'Suka'}</span>
                </button>

                <button 
                  onClick={() => setSaved(!saved)}
                  className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition ${
                    saved 
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30' 
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700'
                  }`}
                >
                  {saved ? <Check className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                  <span>Tonton Nanti</span>
                </button>

                <button className="p-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-slate-700 rounded-xl transition">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#002B5B] dark:text-teal-400 flex items-center justify-center font-bold text-xs">
                  {selectedVideo.creator[0]}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100">{selectedVideo.creator}</div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold font-mono">Verified Media Intelligence Channel</div>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed pt-2">
                {selectedVideo.summary}
              </p>
            </div>
          </div>

          {/* Companion Banner ad placement */}
          <AdZone zone="companion_banner" pageContext={{ category: 'video' }} />
        </div>

        {/* Right: Grid of Other Videos (4 columns) */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="font-display font-black text-xs text-[#002B5B] dark:text-slate-200 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-1.5">
            <Film className="h-4 w-4 text-teal-500" />
            Rekomendasi Konten Visual
          </h3>

          {/* Video Recommendation Sponsor Slot */}
          <AdZone zone="video_recommendation_sponsor" pageContext={{ category: 'video' }} />

          <div className="space-y-4 overflow-y-auto max-h-[500px] pr-1 scrollbar-thin">
            {filteredVideos.map(vid => (
              <div 
                key={vid.id}
                onClick={() => {
                  setSelectedVideo(vid);
                  setPlaying(false);
                  setCurrentProgress(0);
                }}
                className={`group cursor-pointer p-2.5 rounded-xl border transition flex gap-3 ${
                  selectedVideo.id === vid.id 
                    ? 'bg-teal-500/5 border-teal-500/20 dark:bg-teal-950/10 dark:border-teal-500/30' 
                    : 'bg-white border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-850'
                }`}
              >
                <div className="w-24 sm:w-28 aspect-video rounded-lg overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 relative border border-slate-100 dark:border-slate-850">
                  <img src={vid.thumbnail} alt={vid.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 right-1 bg-black/85 text-[8px] font-mono text-white px-1 py-0.2 rounded font-bold">
                    {vid.duration}
                  </span>
                </div>

                <div className="flex-1 space-y-1">
                  <h4 className="text-xs font-bold text-[#002B5B] dark:text-slate-200 group-hover:text-teal-500 dark:group-hover:text-teal-400 transition line-clamp-2 leading-tight">
                    {vid.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold truncate">{vid.creator}</p>
                  <div className="text-[9px] text-slate-400 dark:text-slate-500 font-mono">
                    {vid.views} views • {vid.uploadedAt}
                  </div>
                </div>
              </div>
            ))}

            {filteredVideos.length === 0 && (
              <div className="text-center py-8 text-slate-400 dark:text-slate-500 text-xs font-semibold">
                Tidak ada video jurnalisme yang sesuai kata kunci.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
