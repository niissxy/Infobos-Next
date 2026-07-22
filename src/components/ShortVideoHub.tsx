import React, { useState } from 'react';
import { 
  Heart, MessageSquare, Share2, Bookmark, Music, Compass, ChevronDown, 
  ChevronUp, MapPin, Sparkles, Plus, Send, X, Disc, UserCheck 
} from 'lucide-react';

interface ShortVideo {
  id: string;
  title: string;
  creator: string;
  avatar: string;
  likes: number;
  commentsCount: number;
  shares: number;
  songName: string;
  thumbnail: string;
  tag: string;
  location: string;
  entity: string;
  comments: { user: string; text: string; time: string }[];
}

export default function ShortVideoHub() {
  const [activeTab, setActiveTab] = useState<'recommend' | 'trending' | 'nearby'>('recommend');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [likedList, setLikedList] = useState<Record<string, boolean>>({});
  const [savedList, setSavedList] = useState<Record<string, boolean>>({});
  
  // Comments Modal State
  const [showComments, setShowComments] = useState<boolean>(false);
  const [newCommentText, setNewCommentText] = useState<string>('');

  const [shorts, setShorts] = useState<ShortVideo[]>([
    {
      id: 'sh-1',
      title: 'Pariwisata Heritage Gedung Sate Bandung resmi dibuka sore ini! 🌸 Cantik banget aslinya! #GedungSate #Bandung #WisataJabar',
      creator: '@jawabarat_today',
      avatar: 'https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&q=80&w=100',
      likes: 1824,
      commentsCount: 341,
      shares: 982,
      songName: 'Musik Angklung Klasik Priangan - Sunda Harmoni',
      thumbnail: 'https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&q=80&w=600',
      tag: 'Wisata',
      location: 'bandung',
      entity: 'gedung-sate',
      comments: [
        { user: 'Soni_BDG', text: 'Keren banget, besok langsung meluncur ke TKP!', time: '1m ago' },
        { user: 'Fitri_Zul', text: 'Arsitekturnya memang luar biasa indah.', time: '10m ago' },
        { user: 'Asep_H', text: 'Harus tetap dijaga kebersihannya ya teman-teman.', time: '1h ago' }
      ]
    },
    {
      id: 'sh-2',
      title: 'Klarifikasi BMKG mengenai isu tsunami megathrust lusa depan: Hoaks Deepfake AI! 🚨 Simak penjelasannya!',
      creator: '@infobmkg_resmi',
      avatar: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=100',
      likes: 4310,
      commentsCount: 924,
      shares: 2150,
      songName: 'Suara Asli - BMKG Indonesia Edukasi',
      thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=600',
      tag: 'Fact Check',
      location: 'jakarta-pusat',
      entity: 'bmkg',
      comments: [
        { user: 'Dewi_Sari', text: 'Hampir aja ketipu video WA grup, makasih infonya!', time: '5m ago' },
        { user: 'Budi_Sant', text: 'Pembuat hoaks video AI harus ditindak tegas.', time: '30m ago' },
        { user: 'Hendra_W', text: 'Beneran mirip banget suara aslinya di deepfake itu.', time: '2h ago' }
      ]
    },
    {
      id: 'sh-3',
      title: 'TikToker heboh kloning suara AI para tokoh politik! Bagus untuk parodi tapi melanggar hukum nggak sih? 🤔 #AITalks #TikTokTech',
      creator: '@teknologi_kita',
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=100',
      likes: 852,
      commentsCount: 198,
      shares: 440,
      songName: 'Synthetic Beats - Future AI Audio',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600',
      tag: 'Trending',
      location: 'bandung',
      entity: 'kominfo',
      comments: [
        { user: 'Rian_M', text: 'Hukum hak cipta suara ini mendesak dibuat kominfo.', time: '8m ago' },
        { user: 'Rina_Tech', text: 'Kreatif tapi bahaya kalau buat fitnah politik.', time: '45m ago' }
      ]
    }
  ]);

  const activeVideo = shorts[currentIndex];

  const handleNext = () => {
    if (currentIndex < shorts.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Loop back
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const toggleLike = (id: string) => {
    setLikedList(prev => {
      const state = !prev[id];
      // Update mock like counts
      setShorts(currentShorts => 
        currentShorts.map(sh => 
          sh.id === id ? { ...sh, likes: sh.likes + (state ? 1 : -1) } : sh
        )
      );
      return { ...prev, [id]: state };
    });
  };

  const toggleSave = (id: string) => {
    setSavedList(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const updatedShorts = shorts.map(sh => {
      if (sh.id === activeVideo.id) {
        return {
          ...sh,
          commentsCount: sh.commentsCount + 1,
          comments: [
            { user: 'Anda_Redaktur', text: newCommentText, time: 'Just now' },
            ...sh.comments
          ]
        };
      }
      return sh;
    });

    setShorts(updatedShorts);
    setNewCommentText('');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 font-sans space-y-4">
      
      {/* Platform Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex gap-4">
          <button 
            onClick={() => setActiveTab('recommend')}
            className={`text-xs font-bold uppercase tracking-wider pb-1.5 transition ${activeTab === 'recommend' ? 'text-[#002B5B] border-b-2 border-[#002B5B]' : 'text-slate-400'}`}
          >
            Untuk Anda
          </button>
          <button 
            onClick={() => setActiveTab('trending')}
            className={`text-xs font-bold uppercase tracking-wider pb-1.5 transition ${activeTab === 'trending' ? 'text-[#002B5B] border-b-2 border-[#002B5B]' : 'text-slate-400'}`}
          >
            Trending
          </button>
          <button 
            onClick={() => setActiveTab('nearby')}
            className={`text-xs font-bold uppercase tracking-wider pb-1.5 transition ${activeTab === 'nearby' ? 'text-[#002B5B] border-b-2 border-[#002B5B]' : 'text-slate-400'}`}
          >
            Terdekat
          </button>
        </div>
        
        <span className="text-[10px] bg-rose-500 text-white font-mono font-bold px-1.5 rounded uppercase animate-pulse">
          Reels Feed
        </span>
      </div>

      {/* Main Reels Screen Box */}
      <div className="relative bg-slate-950 rounded-3xl h-[600px] overflow-hidden shadow-2xl flex flex-col justify-between border border-slate-900 group">
        
        {/* Background Overlay Cover */}
        <img 
          src={activeVideo.thumbnail} 
          alt={activeVideo.title}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
        />

        {/* Video Source Watermark / Tag */}
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <span className="text-[9px] bg-black/60 backdrop-blur-md text-white font-mono font-bold px-2 py-0.5 rounded-full border border-white/10 uppercase flex items-center gap-1">
            <Compass className="h-3 w-3 text-teal-400" />
            {activeVideo.tag}
          </span>
          <span className="text-[9px] bg-black/60 backdrop-blur-md text-[#FFD700] font-mono font-bold px-2 py-0.5 rounded-full border border-white/10 uppercase flex items-center gap-0.5">
            <MapPin className="h-3 w-3" />
            {activeVideo.location}
          </span>
        </div>

        {/* Vertical Swipe Navigation Helper */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-1.5">
          <button 
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-1.5 bg-black/40 hover:bg-black/60 rounded-full text-white disabled:opacity-20 transition"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
          <button 
            onClick={handleNext}
            className="p-1.5 bg-black/40 hover:bg-black/60 rounded-full text-white transition"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        {/* Bottom Metadata overlay */}
        <div className="absolute bottom-0 left-0 right-14 p-4 z-10 text-left space-y-3.5 bg-gradient-to-t from-black/90 via-black/30 to-transparent">
          {/* Creator Profile */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-teal-400 shrink-0">
              <img src={activeVideo.avatar} alt={activeVideo.creator} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1">
                <span>{activeVideo.creator}</span>
                <UserCheck className="h-3.5 w-3.5 text-teal-400" />
              </div>
              <p className="text-[9px] text-slate-300 font-mono">EVOLIS Verified Partner</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-white leading-normal font-sans tracking-wide">
            {activeVideo.title}
          </p>

          {/* Soundtrack banner scrolling */}
          <div className="flex items-center gap-2 text-[10px] text-[#FFD700] bg-black/30 backdrop-blur-sm p-1.5 rounded-lg border border-white/5 truncate max-w-xs">
            <Music className="h-3 w-3 shrink-0 animate-bounce" />
            <span className="truncate font-mono">{activeVideo.songName}</span>
          </div>
        </div>

        {/* Sidebar Interactions Icons Panel (Floating Right) */}
        <div className="absolute bottom-6 right-3 z-10 flex flex-col items-center gap-5">
          {/* Like */}
          <div className="flex flex-col items-center gap-1 cursor-pointer">
            <button 
              onClick={() => toggleLike(activeVideo.id)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition shadow-lg ${
                likedList[activeVideo.id] 
                  ? 'bg-rose-600 text-white' 
                  : 'bg-black/45 hover:bg-black/65 text-slate-200'
              }`}
            >
              <Heart className={`h-5 w-5 ${likedList[activeVideo.id] ? 'fill-white text-white' : ''}`} />
            </button>
            <span className="text-[10px] font-mono font-bold text-white shadow-sm">{activeVideo.likes}</span>
          </div>

          {/* Comment Bubble */}
          <div className="flex flex-col items-center gap-1 cursor-pointer">
            <button 
              onClick={() => setShowComments(true)}
              className="w-10 h-10 rounded-full bg-black/45 hover:bg-black/65 text-slate-200 flex items-center justify-center transition shadow-lg"
            >
              <MessageSquare className="h-5 w-5" />
            </button>
            <span className="text-[10px] font-mono font-bold text-white shadow-sm">{activeVideo.commentsCount}</span>
          </div>

          {/* Bookmark */}
          <div className="flex flex-col items-center gap-1 cursor-pointer">
            <button 
              onClick={() => toggleSave(activeVideo.id)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition shadow-lg ${
                savedList[activeVideo.id] 
                  ? 'bg-amber-500 text-[#002B5B]' 
                  : 'bg-black/45 hover:bg-black/65 text-slate-200'
              }`}
            >
              <Bookmark className={`h-5 w-5 ${savedList[activeVideo.id] ? 'fill-white text-white' : ''}`} />
            </button>
            <span className="text-[10px] font-mono font-bold text-white shadow-sm">Save</span>
          </div>

          {/* Share */}
          <button className="w-10 h-10 rounded-full bg-black/45 hover:bg-black/65 text-slate-200 flex items-center justify-center transition shadow-lg">
            <Share2 className="h-5 w-5" />
          </button>

          {/* Soundtrack Vinyl Rotating Disc */}
          <div className="w-8 h-8 rounded-full border-2 border-white/20 bg-slate-900 flex items-center justify-center mt-2 overflow-hidden shadow-lg animate-spin [animation-duration:8s]">
            <Disc className="h-5 w-5 text-teal-400" />
          </div>
        </div>

      </div>

      {/* COMMENTS MODAL SLIDE OVERLAY (HIGH FIDELITY) */}
      {showComments && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center p-0">
          <div className="bg-white rounded-t-3xl max-w-md w-full h-[65%] flex flex-col justify-between text-left shadow-2xl relative">
            
            {/* Header */}
            <div className="p-4 border-b border-slate-150 flex items-center justify-between">
              <h4 className="font-display font-black text-sm text-[#002B5B] uppercase tracking-wider">
                Komentar ({activeVideo.commentsCount})
              </h4>
              <button 
                onClick={() => setShowComments(false)}
                className="p-1.5 hover:bg-slate-100 rounded-full transition"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 divide-y divide-slate-100">
              {activeVideo.comments.map((comment, idx) => (
                <div key={idx} className="pt-3 first:pt-0 flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-[#002B5B]">
                    {comment.user[0]}
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-slate-900">{comment.user}</span>
                      <span className="text-[9px] text-slate-400 font-mono font-medium">{comment.time}</span>
                    </div>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="p-3 border-t border-slate-150 flex items-center gap-2 bg-slate-50">
              <input
                type="text"
                placeholder="Tulis komentar ramah..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                className="flex-1 px-3 py-2 border border-slate-200 bg-white rounded-xl text-xs focus:outline-none focus:border-teal-500"
              />
              <button 
                type="submit"
                className="p-2 bg-teal-500 hover:bg-teal-400 text-white rounded-xl transition"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
