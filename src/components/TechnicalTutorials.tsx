import React, { useState } from 'react';
import { 
  Compass, MapPin, Eye, Play, Sparkles, Sliders, Laptop, Search, 
  HelpCircle, ChevronLeft, ChevronRight, BookOpen, AlertTriangle 
} from 'lucide-react';

interface GuideStep {
  title: string;
  desc: string;
}

interface Tutorial {
  id: string;
  title: string;
  category: string;
  difficulty: 'Mudah' | 'Sedang';
  readTime: string;
  shortDesc: string;
  steps: GuideStep[];
}

export default function TechnicalTutorials() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTutorialId, setSelectedTutorialId] = useState('tuto-1');
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const tutorials: Tutorial[] = [
    {
      id: 'tuto-1',
      title: 'Memetakan Data Demografi Menggunakan GeoOS GIS',
      category: 'Geo Intelligence',
      difficulty: 'Sedang',
      readTime: '8 menit',
      shortDesc: 'Panduan lengkap membaca shapefile, memuat layer geospasial penduduk, dan melakukan overlay bencana alam.',
      steps: [
        {
          title: 'Akses Portal Geo Intelligence OS',
          desc: 'Masuk ke menu utama lalu cari tab "Geo Intelligence OS". Pastikan Anda memiliki otorisasi minimal level Member atau Reporter untuk mengakses filter data spasial lanjutan.'
        },
        {
          title: 'Pilih Layer Demografi Regional',
          desc: 'Di bilah samping kanan, aktifkan checkbox layer "Tingkat Kepadatan Penduduk". Peta interaktif di tengah layar akan otomatis berubah warna (choropleth) menggambarkan konsentrasi warga Jawa Barat.'
        },
        {
          title: 'Overlay Filter Risiko Bencana',
          desc: 'Centang opsi sub-layer tambahan seperti "Kerawanan Bencana Tanah Longsor" atau "Titik Gempa Aktif". Perhatikan wilayah perpotongan warna untuk menganalisis risiko paparan bencana.'
        },
        {
          title: 'Ekspor Hasil Analisis & Snapshot',
          desc: 'Klik tombol "Ekspor Visualisasi" di pojok kanan bawah peta. Anda bisa mengunduh gambar berformat PNG bersolusi tinggi atau mengekstrak tabel data statistik dalam ekstensi CSV.'
        }
      ]
    },
    {
      id: 'tuto-2',
      title: 'Konfigurasi Widget & Iklan di Sentinel AdOS',
      category: 'AdOS Portal',
      difficulty: 'Sedang',
      readTime: '6 menit',
      shortDesc: 'Langkah praktis menempatkan AdZone Billboard, melacak rasio impresi CTR, dan mengatur tag penargetan audiens lokal.',
      steps: [
        {
          title: 'Buka Dashboard AdOS',
          desc: 'Masuk ke portal pengiklan di tab "AdOS Portal". Pastikan API Key Anda sudah dimasukkan dengan benar pada konfigurasi profil akun pengiklan.'
        },
        {
          title: 'Buat Penempatan AdZone Baru',
          desc: 'Pilih opsi "Buat Campaign Baru", tentukan format tata letak iklan seperti "Top Leaderboard" atau "Footer Billboard", lalu unggah materi visual Anda.'
        },
        {
          title: 'Atur Filter Demografis Penerima',
          desc: 'Terapkan filter geolokasi sasaran, misalnya membatasi penayangan iklan hanya untuk pembaca yang mengakses portal dari wilayah "Bandung Raya" dan "Cirebon".'
        },
        {
          title: 'Aktifkan Monitoring & Pantau CTR',
          desc: 'Klik tombol "Launch Campaign". Dashboard akan menyajikan grafik pergerakan impresi, jumlah klik, dan rasio Click-Through Rate (CTR) secara real-time setiap 10 detik.'
        }
      ]
    },
    {
      id: 'tuto-3',
      title: 'Penggunaan AI Auto-Summarizer & Semantic Search',
      category: 'AI Analytics',
      difficulty: 'Mudah',
      readTime: '4 menit',
      shortDesc: 'Cara menyingkat dokumen panjang laporan rapat pemda dalam hitungan detik dengan model AI Gemini.',
      steps: [
        {
          title: 'Akses Menu Intelligence Workspace',
          desc: 'Navigasikan kursor Anda ke sidebar lalu klik "Intelligence Workspace". Cari widget berlabel "AI Summarizer".'
        },
        {
          title: 'Unggah atau Tempel Teks Artikel',
          desc: 'Tempel teks berita orisinal Anda atau dokumen draf hukum pemda ke dalam kotak input editor AI yang disediakan.'
        },
        {
          title: 'Pilih Format Output Rangkuman',
          desc: 'Tentukan jenis luaran ringkasan, apakah ingin dibuat berupa "3 Poin Utama", "Gaya Bahasa Santai", atau "Laporan Eksekutif Formal".'
        },
        {
          title: 'Generate & Salin Ringkasan',
          desc: 'Tekan tombol "Generate Summary". Tunggu sesaat hingga model Gemini 2.0 merangkum dokumen. Klik ikon "Copy" untuk langsung menggunakan hasilnya.'
        }
      ]
    }
  ];

  const filteredTutorials = tutorials.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeTutorial = tutorials.find(t => t.id === selectedTutorialId) || tutorials[0];
  const activeStep = activeTutorial.steps[activeStepIndex] || activeTutorial.steps[0];

  const handleSelectTutorial = (id: string) => {
    setSelectedTutorialId(id);
    setActiveStepIndex(0);
  };

  return (
    <div id="technical-tutorials-page" className="max-w-6xl mx-auto space-y-6 sm:space-y-8 p-4 sm:p-6 animate-fade-in">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-br from-[#0b2545] via-[#0f172a] to-slate-900 border border-slate-200/10 dark:border-slate-800/80 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg transition-all duration-300">
        <div className="absolute -top-12 -right-12 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 z-10 relative text-left">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-teal-400 text-teal-950 text-[10px] font-mono font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm animate-pulse">
                TECHNICAL TUTORIALS
              </span>
              <span className="text-slate-300 text-xs font-semibold">Panduan Sistem Geospasial & Intelijen</span>
            </div>
            <h1 className="text-2xl sm:text-3.5xl font-display font-black tracking-tight leading-none text-white">
              Pusat Panduan Teknis Platform 🗺️
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Pelajari tata cara pengoperasian modul canggih INFOBOS secara mandiri. Kami menyusun panduan langkah demi langkah yang interaktif agar Anda dapat memanfaatkan seluruh potensi intelijen data.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shrink-0 text-center space-y-2 max-w-xs w-full lg:w-auto shadow-inner">
            <Laptop className="h-8 w-8 text-teal-400 mx-auto animate-bounce" />
            <span className="text-xs font-bold text-slate-150 block">Sistem Terintegrasi</span>
            <span className="text-[10px] text-slate-300 block leading-snug">Langkah terstandardisasi bagi para analis Jabar.</span>
          </div>
        </div>
      </div>

      {/* CORE SPLIT INTERACTIVE GUIDE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT LIST PANEL (4 of 12) */}
        <div className="lg:col-span-4 space-y-4 text-left">
          
          {/* SEARCH BAR */}
          <div className="relative transform hover:scale-[1.01] transition-transform duration-200">
            <Search className="absolute left-3.5 top-3 h-4.5 w-4.5 text-slate-450" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari modul atau panduan..." 
              className="w-full text-xs font-bold pl-11 pr-3.5 py-3 border rounded-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-850 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none shadow-md transition-all placeholder-slate-400"
            />
          </div>

          {/* TUTORIAL DIRECTORY CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
            {filteredTutorials.map((tuto) => {
              const isSelected = tuto.id === selectedTutorialId;
              return (
                <div 
                  key={tuto.id}
                  onClick={() => handleSelectTutorial(tuto.id)}
                  className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer text-left space-y-2.5 transform hover:translate-x-1 ${
                    isSelected 
                      ? 'bg-teal-500/[0.03] border-teal-500 shadow-sm ring-1 ring-teal-500/10' 
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950/30 hover:border-slate-300 dark:hover:border-slate-700 shadow-3xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="text-[9px] font-mono font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
                      {tuto.category}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                      ⏱ {tuto.readTime}
                    </span>
                  </div>

                  <h3 className={`text-xs sm:text-[13px] font-black leading-snug transition-colors ${
                    isSelected ? 'text-teal-600 dark:text-teal-400 font-extrabold' : 'text-slate-800 dark:text-slate-200'
                  }`}>
                    {tuto.title}
                  </h3>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {tuto.shortDesc}
                  </p>

                  <div className="flex items-center justify-between pt-2 text-[9px] font-mono text-slate-400 border-t border-slate-100 dark:border-slate-800/60">
                    <span>{tuto.steps.length} Langkah Panduan</span>
                    <span className={`px-2 py-0.5 rounded-full font-bold ${
                      tuto.difficulty === 'Mudah' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {tuto.difficulty}
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredTutorials.length === 0 && (
              <div className="text-center py-12 space-y-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-3xs">
                <HelpCircle className="h-10 w-10 text-slate-300 dark:text-slate-700 mx-auto" />
                <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">Tidak ada tutorial yang cocok.</p>
              </div>
            )}
          </div>

        </div>

        {/* RIGHT STEP-BY-STEP INTERACTIVE VIEWER (8 of 12) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm text-left">
          
          {/* Top Panel Brand */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest block">
                INTERACTIVE STEP-BY-STEP GUIDE
              </span>
              <h2 className="text-sm sm:text-base font-display font-black text-slate-900 dark:text-white leading-tight">
                {activeTutorial.title}
              </h2>
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-6">
            
            {/* Horizontal Step Indicator dots */}
            <div className="flex items-center justify-between relative max-w-md mx-auto py-2">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-150 dark:bg-slate-800 pointer-events-none z-0" />
              {activeTutorial.steps.map((_, idx) => {
                const isPassed = idx < activeStepIndex;
                const isCurrent = idx === activeStepIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveStepIndex(idx)}
                    className={`h-7 w-7 rounded-full flex items-center justify-center font-mono text-[10px] font-black z-10 transition-all border cursor-pointer ${
                      isPassed 
                        ? 'bg-teal-500 border-teal-500 text-white shadow-3xs' 
                        : isCurrent 
                        ? 'bg-white dark:bg-slate-900 border-teal-500 text-teal-500 font-extrabold ring-4 ring-teal-500/10' 
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Active Guide Card Layout */}
            <div className="bg-slate-50/55 dark:bg-slate-950/40 rounded-2xl border border-slate-150 dark:border-slate-800/80 p-5 sm:p-6 flex flex-col md:flex-row items-start gap-4 shadow-3xs">
              
              <div className="h-12 w-12 rounded-2xl bg-teal-500/10 text-teal-500 flex items-center justify-center font-mono font-black text-lg shrink-0 border border-teal-500/10">
                0{activeStepIndex + 1}
              </div>

              <div className="space-y-2 flex-1 text-left">
                <h3 className="text-sm sm:text-base font-display font-black text-slate-900 dark:text-white leading-tight">
                  {activeStep.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans font-medium whitespace-pre-line">
                  {activeStep.desc}
                </p>
              </div>

            </div>

            {/* Simulated Live Action Window Preview */}
            <div className="border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 bg-[#0a1224] space-y-3 shadow-lg">
              
              {/* Terminal Head Bar */}
              <div className="flex items-center justify-between border-b border-slate-850 pb-2">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500 block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500 block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500 block" />
                  </div>
                  <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest pl-2 border-l border-slate-800 ml-1">
                    Simulator Terminal
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse block" />
                  <span className="text-[9.5px] font-mono text-slate-500 font-bold uppercase">Online</span>
                </div>
              </div>

              {activeTutorial.id === 'tuto-1' && (
                <div className="text-white space-y-2.5 font-mono text-[10.5px] leading-relaxed">
                  <div className="flex justify-between text-[9px] text-slate-500">
                    <span>GeoOS Map Viewer Terminal v1.4</span>
                    <span className="text-emerald-500">Active</span>
                  </div>
                  <div>
                    <span className="text-amber-400">$ geoos load --demographics Jabar</span>
                    <p className="text-slate-450 mt-1">✓ Loaded 27 Kabupaten/Kota polygons.</p>
                  </div>
                  {activeStepIndex >= 2 && (
                    <div className="animate-pulse">
                      <span className="text-teal-400">$ geoos overlay --risks landslide</span>
                      <p className="text-emerald-400 mt-1">▶ Found high intersection areas: Cianjur (92%), Garut Selatan (87%).</p>
                    </div>
                  )}
                  {activeStepIndex >= 3 && (
                    <div className="text-yellow-400 font-bold border-t border-slate-850 pt-2">
                      ✓ Snapshot exported as GEO_DENSITY_SNAPSHOT_LONG_2026.png
                    </div>
                  )}
                </div>
              )}

              {activeTutorial.id === 'tuto-2' && (
                <div className="text-white space-y-2.5 font-mono text-[10.5px] leading-relaxed">
                  <div className="flex justify-between text-[9px] text-slate-500">
                    <span>Sentinel AdOS Engine Terminal</span>
                    <span className="text-emerald-500">Connected</span>
                  </div>
                  <div>
                    <span className="text-purple-450">$ ados init_campaign --slot leaderboard</span>
                    <p className="text-slate-450 mt-1">✓ Campaign placement mapped to top_leaderboard.</p>
                  </div>
                  {activeStepIndex >= 2 && (
                    <div className="animate-pulse">
                      <span className="text-teal-400">$ ados set_targeting --locations ["bandung", "cirebon"]</span>
                      <p className="text-emerald-400 mt-1">▶ Targeting verified. Potential reach: 140,000 users/day.</p>
                    </div>
                  )}
                  {activeStepIndex >= 3 && (
                    <div className="text-yellow-400 font-bold border-t border-slate-850 pt-2">
                      📊 Active Stats: Impresi: 4,120 | Klik: 241 | CTR: 5.84%
                    </div>
                  )}
                </div>
              )}

              {activeTutorial.id === 'tuto-3' && (
                <div className="text-white space-y-2.5 font-mono text-[10.5px] leading-relaxed">
                  <div className="flex justify-between text-[9px] text-slate-500">
                    <span>Gemini 2.0 Auto-Summarizer Core</span>
                    <span className="text-emerald-500">Ready</span>
                  </div>
                  <div>
                    <span className="text-cyan-400">$ gemini summarize --input draf_rapat_pemda.txt</span>
                    <p className="text-slate-450 mt-1">✓ Parsed 2,540 words input stream.</p>
                  </div>
                  {activeStepIndex >= 2 && (
                    <div className="animate-pulse">
                      <span className="text-teal-400">$ gemini set_format --type bullet_points --count 3</span>
                      <p className="text-emerald-400 mt-1">▶ Executing summarizer algorithm...</p>
                    </div>
                  )}
                  {activeStepIndex >= 3 && (
                    <div className="text-yellow-400 border-t border-slate-850 pt-2 space-y-1">
                      <p className="font-bold">✓ SUMMARY OUTCOME:</p>
                      <p className="text-slate-350">1. Alokasi anggaran infrastruktur trans-Jabar difokuskan pada pemulihan drainase.</p>
                      <p className="text-slate-355">2. Realisasi kemitraan UMKM meningkat 22% pada kuartal berjalan.</p>
                      <p className="text-slate-355">3. Jadwal peluncuran portal Jabar Pintar digeser ke awal September 2026.</p>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Back / Next Buttons */}
            <div className="flex justify-between items-center border-t border-slate-150 dark:border-slate-850 pt-4 mt-2">
              <button
                disabled={activeStepIndex === 0}
                onClick={() => setActiveStepIndex(prev => prev - 1)}
                className={`px-4 py-2 rounded-xl border text-xs font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer transition transform hover:-translate-y-0.5 duration-200 ${
                  activeStepIndex === 0 
                    ? 'text-slate-300 border-slate-100 dark:border-slate-800 cursor-not-allowed' 
                    : 'text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 shadow-3xs'
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Sebelumnya</span>
              </button>

              <span className="text-[10px] font-mono font-black text-slate-400">
                Langkah {activeStepIndex + 1} dari {activeTutorial.steps.length}
              </span>

              <button
                disabled={activeStepIndex === activeTutorial.steps.length - 1}
                onClick={() => setActiveStepIndex(prev => prev + 1)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer transition transform hover:-translate-y-0.5 duration-200 ${
                  activeStepIndex === activeTutorial.steps.length - 1
                    ? 'text-slate-300 border-slate-100 dark:border-slate-800 cursor-not-allowed' 
                    : 'bg-teal-600 hover:bg-teal-500 text-white shadow-md'
                }`}
              >
                <span>Selanjutnya</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
