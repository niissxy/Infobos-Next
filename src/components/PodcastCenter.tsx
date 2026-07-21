import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, Volume2, SkipBack, SkipForward, Disc, Check, Sparkles, 
  ExternalLink, ListMusic, Brain, BookOpen, Clock, Radio, Award, Eye 
} from 'lucide-react';
import AdZone from './AdZone';
import { IntegrationWidget } from './IntegrationEngine';

interface Episode {
  id: string;
  title: string;
  show: string;
  duration: string;
  publishedAt: string;
  views: string;
  description: string;
  aiSummary: string;
  topics: string[];
  sentiment: string;
  transcript: { time: string; text: string; activeAtSecond: number }[];
}

export default function PodcastCenter() {
  const [playing, setPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [playProgress, setPlayProgress] = useState<number>(15); // percent
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(45);
  const [activeTab, setActiveTab] = useState<'details' | 'transcript' | 'ai-intelligence'>('details');

  const episodes: Episode[] = [
    {
      id: 'ep-1',
      title: 'Episode 42: Bagaimana Kebijakan Fiskal PMK-2026 Menyelamatkan Modal Startup Lokal?',
      show: 'EVOLIS Talk: Ekonomi Masa Depan',
      duration: '28:40',
      publishedAt: 'Kemarin',
      views: '1.2K',
      description: 'Membahas regulasi insentif pajak penghasilan dari Menkeu Sri Mulyani bersama praktisi fintech regional, Soni Sanjaya.',
      aiSummary: 'Diskusi panel mengonfirmasi bahwa penundaan pajak final bagi startup digital dengan omzet di bawah Rp 5 Miliar meningkatkan arus kas usaha rata-rata hingga 35%. Hal ini berdampak positif bagi kota-kota kreatif di Jawa Barat.',
      topics: ['Ekonomi Digital', 'Fiskal PMK-2026', 'Startup Jabar', 'Sri Mulyani'],
      sentiment: 'Optimistic / Positive',
      transcript: [
        { time: '00:10', text: 'Selamat datang kembali di EVOLIS Talk, seri siaran analisis intelijen masa depan Anda.', activeAtSecond: 10 },
        { time: '00:25', text: 'Hari ini kita kedatangan tamu spesial, Soni Sanjaya, untuk membedah paket stimulus fiskal PMK-2026.', activeAtSecond: 25 },
        { time: '00:45', text: 'Sri Mulyani baru saja meresmikan draf panduan insentif pajak regional Jawa Barat.', activeAtSecond: 45 },
        { time: '01:05', text: 'Regulasi ini diprediksi memberikan kelegaan bernapas bagi startup teknologi yang sedang melangsungkan efisiensi.', activeAtSecond: 65 },
        { time: '01:30', text: 'Terutama kota Bandung, yang memiliki ekosistem inkubasi talenta digital terbesar kedua nasional.', activeAtSecond: 90 }
      ]
    },
    {
      id: 'ep-2',
      title: 'Episode 41: Preservasi Bahasa Sunda-Melayu Melalui Terobosan Model LLM Kolaborasi MIT',
      show: 'Teknologi & Kita: Jurnal Digital',
      duration: '35:15',
      publishedAt: '3 hari lalu',
      views: '3.1K',
      description: 'Menilik di balik layar riset kecerdasan buatan komputasi linguistik nasional bersama para akademisi dan peneliti tamu.',
      aiSummary: 'Penyusunan asisten virtual kesehatan cerdas berbasis model bahasa daerah yang mengusung akurasi pemahaman konteks (NLU) mencapai 94.2% guna mempermudah pelayanan medis rural.',
      topics: ['Kecerdasan Buatan', 'Bahasa Sunda', 'Riset MIT', 'Inklusi Sosial'],
      sentiment: 'Inspirational / Scientific',
      transcript: [
        { time: '00:05', text: 'Preservasi budaya kini dapat dicapai secara masif melalui rekayasa komputasi modern.', activeAtSecond: 5 },
        { time: '00:25', text: 'Kolaborasi para ilmuwan lokal bersama MIT memetakan dialek linguistik nusantara.', activeAtSecond: 25 },
        { time: '00:50', text: 'Asisten pintar ini membantu warga sepuh di pedesaan berkonsultasi medis dengan natural.', activeAtSecond: 50 }
      ]
    },
    {
      id: 'ep-3',
      title: 'Episode 40: Menepis Hoaks Gempa Bumi Megathrust dari Manipulasi Deepfake AI',
      show: 'Fact-Check Audio Chronicles',
      duration: '18:50',
      publishedAt: '1 minggu lalu',
      views: '2.4K',
      description: 'Langkah taktis membedah video palsu BMKG, memahami bahaya penyebaran manipulasi lip-sync generatif di WhatsApp grup.',
      aiSummary: 'Uji forensik digital mengonfirmasi video prediksi tsunami BMKG adalah manipulasi deepfake model lip-sync open-source. Masyarakat diimbau waspada dan memantau aplikasi resmi InfoBMKG.',
      topics: ['Forensik Digital', 'Hoaks Deepfake', 'BMKG Gempa', 'Literasi Informasi'],
      sentiment: 'Critical / Urgent',
      transcript: [
        { time: '00:10', text: 'Beredar video 30 detik pejabat teras BMKG memprediksi gempa bumi megathrust Selat Sunda.', activeAtSecond: 10 },
        { time: '00:30', text: 'Padahal tidak ada teknologi di dunia yang mampu meramal waktu gempa secara presisi.', activeAtSecond: 30 },
        { time: '00:55', text: 'Spektrum audio membuktikan anomali lip-sync sinkronisasi visual sejauh 120ms.', activeAtSecond: 55 }
      ]
    }
  ];

  const [activeEpisode, setActiveEpisode] = useState<Episode>(episodes[0]);

  // Sync simulated current time with progress bar
  useEffect(() => {
    let interval: any;
    if (playing) {
      interval = setInterval(() => {
        setCurrentTimeSec(prev => {
          const nextVal = prev + 1;
          // approximate progress percent
          setPlayProgress(Math.min(100, Math.round((nextVal / 300) * 100)));
          return nextVal;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [playing]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-sans text-left space-y-6">
      
      {/* Branding Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="h-6 w-6 text-purple-500" />
            <h1 className="font-display font-black text-2xl md:text-3xl text-[#002B5B] dark:text-slate-100">PODCAST INTELIGENCE CENTER</h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Dengarkan diskusi mendalam mengenai regulasi, teknologi masa depan, inovasi sains, dan cek fakta audio siber.</p>
        </div>

        {/* Integration Badges */}
        <div className="flex flex-wrap gap-2">
          <a href="#" className="px-3 py-1.5 bg-[#1DB954]/10 hover:bg-[#1DB954]/20 text-[#1DB954] border border-[#1DB954]/25 rounded-xl text-[10px] font-bold font-mono flex items-center gap-1">
            Spotify Podcast <ExternalLink className="h-3 w-3" />
          </a>
          <a href="#" className="px-3 py-1.5 bg-[#872EC4]/10 hover:bg-[#872EC4]/20 text-[#872EC4] border border-[#872EC4]/25 rounded-xl text-[10px] font-bold font-mono flex items-center gap-1">
            Apple Podcast <ExternalLink className="h-3 w-3" />
          </a>
          <a href="#" className="px-3 py-1.5 bg-rose-600/10 hover:bg-rose-600/20 text-rose-600 border border-rose-600/25 rounded-xl text-[10px] font-bold font-mono flex items-center gap-1">
            YouTube RSS <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Player & Dynamic Transcript Tabs (8 of 12) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Audio Player Panel */}
          {activeEpisode.id === 'ep-2' ? (
            <IntegrationWidget widgetId="widget-podcast-sunda" className="mb-4" />
          ) : (
            <div className="bg-gradient-to-r from-purple-900 to-indigo-950 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col md:flex-row gap-6 items-center">
              {/* Spinning decorative disc */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none"></div>

              <div className="w-24 h-24 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 relative overflow-hidden group">
                <Disc className={`h-12 w-12 text-[#FFD700] ${playing ? 'animate-spin [animation-duration:5s]' : ''}`} />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer" onClick={() => setPlaying(!playing)}>
                  {playing ? <Pause className="h-6 w-6 text-white" /> : <Play className="h-6 w-6 text-white" />}
                </div>
              </div>

              <div className="flex-1 space-y-4 text-center md:text-left w-full">
                <div>
                  <span className="text-[9px] bg-purple-500/30 text-[#FFD700] border border-[#FFD700]/30 font-bold px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                    Mendengarkan Episode Aktif
                  </span>
                  <h2 className="font-display font-black text-base md:text-lg text-white mt-1.5 leading-snug">
                    {activeEpisode.title}
                  </h2>
                  <p className="text-xs text-slate-300 font-medium mt-1">{activeEpisode.show}</p>
                </div>

                {/* Progress Line Bar */}
                <div className="space-y-1.5">
                  <div 
                    className="relative w-full h-1.5 bg-white/20 rounded-full cursor-pointer group/scrub"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const pct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
                      setPlayProgress(pct);
                      setCurrentTimeSec(Math.round((pct / 100) * 300));
                    }}
                  >
                    <div className="absolute left-0 top-0 h-full bg-[#FFD700] rounded-full" style={{ width: `${playProgress}%` }}></div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-300 font-mono font-medium">
                    <span>00:{currentTimeSec < 10 ? `0${currentTimeSec}` : currentTimeSec}</span>
                    <span>{activeEpisode.duration}</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center md:justify-start gap-5">
                  <button className="text-slate-400 hover:text-white transition">
                    <SkipBack className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => setPlaying(!playing)}
                    className="w-11 h-11 rounded-full bg-[#FFD700] hover:bg-[#ffe240] text-slate-950 flex items-center justify-center shadow-lg transition transform hover:scale-105"
                  >
                    {playing ? <Pause className="h-5 w-5 fill-slate-950" /> : <Play className="h-5 w-5 fill-slate-950 ml-0.5" />}
                  </button>
                  <button className="text-slate-400 hover:text-white transition">
                    <SkipForward className="h-5 w-5" />
                  </button>

                  {/* Speed selector */}
                  <button 
                    onClick={() => {
                      const speeds = [1, 1.25, 1.5, 2];
                      const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
                      setPlaybackSpeed(speeds[nextIdx]);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono font-bold transition flex items-center gap-1 text-[#FFD700]"
                  >
                    {playbackSpeed}x Speed
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* Transcript / AI Insights Tab Navigation */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-sm text-left space-y-4">
            
            <div className="flex border-b border-slate-100 dark:border-white/5 text-xs font-bold">
              <button 
                onClick={() => setActiveTab('details')}
                className={`pb-3 border-b-2 px-4 transition ${activeTab === 'details' ? 'border-purple-500 text-purple-600 dark:text-purple-400' : 'border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
              >
                <BookOpen className="h-4 w-4 inline mr-1.5" />
                Deskripsi Episode
              </button>
              <button 
                onClick={() => setActiveTab('transcript')}
                className={`pb-3 border-b-2 px-4 transition ${activeTab === 'transcript' ? 'border-purple-500 text-purple-600 dark:text-purple-400' : 'border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
              >
                <ListMusic className="h-4 w-4 inline mr-1.5" />
                Transkrip Sinkron ({activeEpisode.transcript.length} Baris)
              </button>
              <button 
                onClick={() => setActiveTab('ai-intelligence')}
                className={`pb-3 border-b-2 px-4 transition ${activeTab === 'ai-intelligence' ? 'border-purple-500 text-purple-600 dark:text-purple-400' : 'border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
              >
                <Brain className="h-4 w-4 inline mr-1.5" />
                AI Content Intelligence
              </button>
            </div>

            {/* TAB CONTENTS */}
            <div className="min-h-[160px] pt-2">
              
              {activeTab === 'details' && (
                <div className="space-y-4">
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{activeEpisode.description}</p>
                  
                  {/* Topics Grid */}
                  <div className="space-y-2">
                    <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Topik &amp; Konsep Terdeteksi:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeEpisode.topics.map((t, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 font-bold border border-purple-100 dark:border-purple-900/30 rounded-lg text-xs">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'transcript' && (
                <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin">
                  <div className="p-2.5 bg-purple-500/5 dark:bg-purple-950/20 text-[10px] text-purple-800 dark:text-purple-300 font-mono font-semibold rounded-lg border border-purple-500/10 dark:border-purple-900/30">
                    💡 Klik tombol mainkan (Play) di atas untuk mendengarkan transkrip yang tersinkronisasi secara otomatis.
                  </div>
                  {activeEpisode.transcript.map((line, idx) => {
                    const isLineActive = currentTimeSec >= line.activeAtSecond && (idx === activeEpisode.transcript.length - 1 || currentTimeSec < activeEpisode.transcript[idx + 1].activeAtSecond);
                    return (
                      <div 
                        key={idx} 
                        className={`p-2.5 rounded-xl transition-all duration-300 border flex gap-3 ${
                          isLineActive 
                            ? 'bg-purple-50 dark:bg-purple-950/20 border-purple-300 dark:border-purple-800 text-purple-950 dark:text-purple-250 font-semibold shadow-2xs translate-x-1' 
                            : 'bg-white dark:bg-slate-900 border-transparent text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 mt-0.5 shrink-0">{line.time}</span>
                        <p className="text-xs leading-relaxed">{line.text}</p>
                      </div>
                    );
                  })}
                </div>
              )}

              {activeTab === 'ai-intelligence' && (
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 dark:bg-purple-950/20 border border-purple-150 dark:border-purple-900/30 rounded-xl space-y-3">
                    <div className="flex items-center gap-1 text-xs font-bold text-purple-800 dark:text-purple-400">
                      <Sparkles className="h-4 w-4" />
                      <span>Ringkasan Eksekutif AI</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-350 leading-relaxed font-medium">
                      {activeEpisode.aiSummary}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-slate-200 dark:border-white/10 p-3 rounded-xl text-xs space-y-1 bg-slate-50 dark:bg-slate-950">
                      <div className="text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[9px] font-bold">Deteksi Sentimen Redaksi:</div>
                      <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mt-1">
                        <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                        {activeEpisode.sentiment}
                      </div>
                    </div>

                    <div className="border border-slate-200 dark:border-white/10 p-3 rounded-xl text-xs space-y-1 bg-slate-50 dark:bg-slate-950">
                      <div className="text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[9px] font-bold">Rekomendasi Konten Lanjut:</div>
                      <div className="font-bold text-purple-700 dark:text-purple-400 mt-1 cursor-pointer hover:underline">
                        Baca Analisis Tertulis &rarr;
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* Right Column: Podcast Catalog List (4 of 12) */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="font-display font-black text-xs text-[#002B5B] dark:text-slate-100 uppercase tracking-wider border-b border-slate-200 dark:border-white/10 pb-2 flex items-center gap-1.5">
            <Award className="h-4.5 w-4.5 text-purple-500" />
            Daftar Putar Intelijen
          </h3>

          {/* Episode Sponsor AdZone */}
          <AdZone zone="episode_sponsor" pageContext={{ category: 'podcast' }} />

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
            {episodes.map(ep => (
              <div 
                key={ep.id}
                onClick={() => {
                  setActiveEpisode(ep);
                  setPlaying(false);
                  setCurrentTimeSec(0);
                  setPlayProgress(0);
                }}
                className={`group cursor-pointer p-3.5 rounded-xl border transition text-left space-y-2 ${
                  activeEpisode.id === ep.id 
                    ? 'bg-purple-500/5 dark:bg-purple-950/20 border-purple-500/30 dark:border-purple-800/50' 
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div>
                  <span className="text-[9px] bg-purple-100 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 font-bold px-2 py-0.2 rounded font-mono uppercase">
                    {ep.show.split(':')[0]}
                  </span>
                  <h4 className="text-xs font-bold text-[#002B5B] dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition line-clamp-2 mt-1 leading-tight">
                    {ep.title}
                  </h4>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono pt-1">
                  <span className="flex items-center gap-1 font-semibold">
                    <Clock className="h-3.5 w-3.5" />
                    {ep.duration}
                  </span>
                  <span className="flex items-center gap-1 font-semibold">
                    <Eye className="h-3.5 w-3.5" />
                    {ep.views} views
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
