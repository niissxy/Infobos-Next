import React, { useState } from 'react';
import { 
  HelpCircle, Search, MessageSquare, ChevronDown, CheckCircle, 
  Send, Shield, Briefcase, DollarSign, Settings, Sparkles, RefreshCw 
} from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQCategory {
  id: string;
  name: string;
  icon: any;
  items: FAQItem[];
}

export default function GeneralFAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState('category-1');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  // Custom question form state
  const [customQuestion, setCustomQuestion] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState<boolean>(false);
  const [autoAnswer, setAutoAnswer] = useState<string | null>(null);

  const faqCategories: FAQCategory[] = [
    {
      id: 'category-1',
      name: 'Akun & Keanggotaan',
      icon: Shield,
      items: [
        { q: 'Bagaimana cara mendaftar sebagai kontributor jurnalis warga (citizen reporter)?', a: 'Masuk ke menu utama lalu akses "Kreator Portal". Isi data profil lengkap Anda beserta salinan KTP atau kartu identitas yang sah. Tim verifikator redaksi kami akan memvalidasi permohonan Anda dalam kurun waktu 1x24 jam.' },
        { q: 'Apakah ada biaya langganan untuk membaca berita di portal INFOBOS?', a: 'Sebagian besar berita regional dan artikel harian dapat diakses secara gratis. Namun, untuk fitur analisis data tingkat lanjut, riset visual komprehensif, serta dashboard Geo Intelligence Jabar, Anda membutuhkan langganan paket Premium Member.' },
        { q: 'Bagaimana cara mengubah alamat email dan nomor telepon di profil saya?', a: 'Buka bilah samping kiri lalu masuk ke tab "Profil Akun". Klik ikon edit di sudut kolom informasi kontak Anda, masukkan data baru, lalu lakukan konfirmasi verifikasi OTP yang dikirimkan ke email baru Anda.' }
      ]
    },
    {
      id: 'category-2',
      name: 'Kemitraan & Kolaborasi',
      icon: Briefcase,
      items: [
        { q: 'Dapatkah dinas pemerintah atau instansi daerah menautkan data spasial mereka ke GeoOS?', a: 'Sangat bisa. Kami menyediakan skema integrasi WebGIS khusus untuk Bappeda dan Diskominfo di tingkat kabupaten/kota se-Jawa Barat. Hubungi tim kemitraan kami melalui tab "Developer Docs" atau menu kontak biro Bandung.' },
        { q: 'Bagaimana sistem bagi hasil (revenue sharing) untuk artikel sindikasi?', a: 'Bagi hasil dihitung berdasarkan performa keterbacaan (Unique Viewers) dan tingkat interaksi komunitas. Kontributor jurnalis warga terpilih akan mendapatkan pembayaran rutin bulanan yang dapat dicairkan langsung melalui e-wallet terverifikasi.' }
      ]
    },
    {
      id: 'category-3',
      name: 'Pemasangan Iklan',
      icon: DollarSign,
      items: [
        { q: 'Di mana saja posisi iklan banner yang didukung oleh Sentinel AdOS?', a: 'Sentinel AdOS mendukung tiga penempatan iklan utama yang strategis: "Top Leaderboard" (di bagian atas situs), "Sidebar Loker Niaga" (di sebelah kanan konten), dan "Footer Billboard" (di bagian terbawah layar).' },
        { q: 'Apakah pengiklan bisa menargetkan iklan ke kelompok wilayah kabupaten tertentu?', a: 'Ya, sistem penargetan geospasial kami mampu membatasi penayangan materi iklan bersponsor berdasarkan alamat IP pengunjung di tingkat kota/kabupaten di seluruh area Jawa Barat.' }
      ]
    },
    {
      id: 'category-4',
      name: 'Masalah Teknis & Keamanan',
      icon: Settings,
      items: [
        { q: 'Mengapa peta interaktif di Geo Intelligence OS tidak muncul di browser saya?', a: 'Pastikan browser Anda sudah mendukung WebGL dan fitur akselerasi perangkat keras (hardware acceleration) dalam keadaan aktif di menu setelan Google Chrome atau Firefox Anda.' },
        { q: 'Apakah aman menyalin API Key yang digenerate di portal developer?', a: 'Kunci API didekripsi menggunakan protokol AES-256 dan hanya disimpan di sesi aman perangkat Anda. Harap jaga kerahasiaan token tersebut dan jangan pernah mengeksposnya ke dalam repositori publik.' }
      ]
    }
  ];

  const handleToggleAccordion = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const handleSelectCategory = (catId: string) => {
    setActiveCategoryId(catId);
    setExpandedIndex(0);
  };

  const handleCustomQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;

    setSubmittedQuery(true);
    setAutoAnswer(null);

    // AI simulated response generator
    setTimeout(() => {
      const text = customQuestion.toLowerCase();
      let reply = "Terima kasih atas pertanyaannya. Pesan Anda telah diteruskan ke tim support INFOBOS. Kami akan membalas lebih rinci melalui email Anda dalam 2 jam.";
      
      if (text.includes('bayar') || text.includes('harga') || text.includes('premium') || text.includes('gratis') || text.includes('biaya')) {
        reply = "Mengenai biaya premium, INFOBOS menawarkan lisensi data spasial seharga Rp 1.500.000 / bulan untuk korporasi, sedangkan untuk jurnalis warga/akademisi tersedia diskon khusus hingga 80%. Silakan hubungi bagian finance@infobos.co.";
      } else if (text.includes('kreator') || text.includes('kreator portal') || text.includes('daftar') || text.includes('reporter') || text.includes('jurnalis')) {
        reply = "Untuk mempercepat verifikasi kontributor, pastikan Anda melampirkan salinan kartu identitas beresolusi tinggi di portal kemitraan dan mencantumkan portofolio penulisan 3 artikel terakhir Anda.";
      } else if (text.includes('peta') || text.includes('geoos') || text.includes('gis') || text.includes('koordinat') || text.includes('bencana')) {
        reply = "Data spasial GeoOS diperbarui secara dinamis setiap 1 jam bersumber dari sensor IoT lapangan BPBD Jabar. Jika peta tidak ter-load, silakan bersihkan cache browser Anda atau hubungi admin support.";
      }

      setAutoAnswer(reply);
    }, 1500);
  };

  const activeCategory = faqCategories.find(c => c.id === activeCategoryId) || faqCategories[0];

  // Global search filtering
  const allFilteredItems: { categoryName: string; q: string; a: string }[] = [];
  if (searchQuery.trim()) {
    faqCategories.forEach(cat => {
      cat.items.forEach(item => {
        if (item.q.toLowerCase().includes(searchQuery.toLowerCase()) || item.a.toLowerCase().includes(searchQuery.toLowerCase())) {
          allFilteredItems.push({
            categoryName: cat.name,
            q: item.q,
            a: item.a
          });
        }
      });
    });
  }

  return (
    <div id="general-faq-page" className="max-w-6xl mx-auto space-y-6 sm:space-y-8 p-4 sm:p-6 animate-fade-in">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-br from-[#0a1e3d] via-[#0f172a] to-slate-900 border border-slate-200/10 dark:border-slate-800/80 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg transition-all duration-300">
        <div className="absolute -top-12 -right-12 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 z-10 relative">
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-2">
              <span className="bg-rose-500 text-white text-[10px] font-mono font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full animate-pulse shadow-sm">
                SUPPORT DESK
              </span>
              <span className="text-slate-300 text-xs font-semibold">Bantuan Cepat Komunitas Jabar</span>
            </div>
            <h1 className="text-2xl sm:text-3.5xl font-display font-black tracking-tight leading-none text-white">
              General FAQ & Pusat Bantuan ❓
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Cari jawaban cepat atas kendala teknis penempatan peta, regulasi akun kreator jurnalis, tata cara pencairan insentif berita, serta sistem verifikasi draf dokumen siber.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shrink-0 text-center space-y-2 max-w-xs w-full lg:w-auto shadow-inner">
            <HelpCircle className="h-8 w-8 text-rose-400 mx-auto animate-bounce" />
            <span className="text-xs font-bold text-slate-150 block">Butuh Bantuan Lebih?</span>
            <span className="text-[10px] text-slate-300 block leading-snug">Kirim langsung pertanyaan kustom Anda di bawah.</span>
          </div>
        </div>
      </div>

      {/* SEARCH FIELD */}
      <div className="relative max-w-2xl mx-auto transform hover:scale-[1.01] transition-transform duration-200">
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Ketik topik bantuan yang ingin Anda cari..." 
          className="w-full text-xs sm:text-sm font-bold pl-12 pr-4 py-3.5 border rounded-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-850 dark:text-white focus:ring-2 focus:ring-rose-500/80 focus:border-transparent outline-none shadow-md transition-all placeholder-slate-400"
        />
      </div>

      {/* CORE DISPLAY COLUMNS */}
      {searchQuery.trim() ? (
        
        // SEARCH RESULTS DISPLAY
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-left space-y-5 max-w-3xl mx-auto shadow-md">
          <span className="text-[10px] font-mono font-black text-rose-500 uppercase tracking-widest block border-b border-slate-100 dark:border-slate-800 pb-2">
            Hasil Pencarian FAQ: {allFilteredItems.length} Ditemukan
          </span>
          
          <div className="space-y-4">
            {allFilteredItems.map((item, idx) => (
              <div key={idx} className="p-4.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-800/40 space-y-2.5 hover:border-rose-300/50 dark:hover:border-rose-900/30 transition-all duration-200 shadow-3xs">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-[9px] font-mono font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider bg-slate-200/50 dark:bg-slate-800/50 px-2 py-0.5 rounded">
                    Kategori: {item.categoryName}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-slate-100">
                  {item.q}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-sans font-medium">
                  {item.a}
                </p>
              </div>
            ))}

            {allFilteredItems.length === 0 && (
              <div className="text-center py-12 space-y-3">
                <HelpCircle className="h-10 w-10 text-slate-300 dark:text-slate-700 mx-auto" />
                <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">Maaf, kata kunci bantuan tersebut tidak ditemukan.</p>
              </div>
            )}
          </div>
        </div>

      ) : (

        // MAIN CATEGORIZED ACCORDION (Split grid layout)
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* CATEGORY SWITCHERS LIST (4 of 12) */}
          <div className="lg:col-span-4 space-y-3 text-left">
            <span className="text-[10px] font-mono font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider block pl-1">
              Kategori Pusat Bantuan
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {faqCategories.map((cat) => {
                const isSelected = cat.id === activeCategoryId;
                const IconComp = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleSelectCategory(cat.id)}
                    className={`w-full p-3.5 rounded-xl border transition-all text-left flex items-center gap-4 cursor-pointer transform hover:translate-x-1 duration-200 ${
                      isSelected 
                        ? 'bg-rose-500/5 dark:bg-rose-950/10 border-rose-500/60 dark:border-rose-500/40 shadow-sm ring-1 ring-rose-500/10' 
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950/50 hover:border-slate-300 dark:hover:border-slate-700 shadow-3xs'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl transition-all duration-200 ${
                      isSelected ? 'bg-rose-500 text-white shadow-md scale-105' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}>
                      <IconComp className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className={`text-xs font-black block transition-colors duration-200 ${
                        isSelected ? 'text-rose-500 dark:text-rose-400' : 'text-slate-800 dark:text-slate-200'
                      }`}>
                        {cat.name}
                      </span>
                      <span className="text-[10px] text-slate-450 dark:text-slate-400 block mt-0.5 truncate">
                        {cat.items.length} Pertanyaan Umum
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTIVE CATEGORY ACCORDIONS (8 of 12) */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 text-left space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-1">
              <span className="text-[10px] font-mono font-black text-rose-500 uppercase tracking-widest">
                Daftar Pertanyaan — {activeCategory.name}
              </span>
              <span className="text-[9px] font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400">
                {activeCategory.items.length} FAQ
              </span>
            </div>

            <div className="space-y-3">
              {activeCategory.items.map((item, idx) => {
                const isExpanded = idx === expandedIndex;
                return (
                  <div 
                    key={idx} 
                    className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                      isExpanded 
                        ? 'border-rose-500/30 dark:border-rose-500/20 shadow-xs bg-rose-500/[0.01]' 
                        : 'border-slate-150 dark:border-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700 bg-transparent'
                    }`}
                  >
                    {/* Header bar button */}
                    <button
                      onClick={() => handleToggleAccordion(idx)}
                      className="w-full px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-950/40 text-left flex items-center justify-between gap-4 cursor-pointer transition-colors"
                    >
                      <h4 className={`text-xs sm:text-sm font-black leading-snug transition-colors ${
                        isExpanded ? 'text-rose-600 dark:text-rose-450' : 'text-slate-800 dark:text-slate-200'
                      }`}>
                        {item.q}
                      </h4>
                      <div className={`p-1 rounded-lg transition-all duration-300 ${isExpanded ? 'bg-rose-500/10 text-rose-500' : 'text-slate-400'}`}>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-300 shrink-0 ${
                          isExpanded ? 'rotate-180' : ''
                        }`} />
                      </div>
                    </button>

                    {/* Animated answer panel */}
                    {isExpanded && (
                      <div className="px-5 py-4 bg-slate-50/40 dark:bg-slate-950/30 border-t border-slate-100 dark:border-slate-850/60 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans font-medium whitespace-pre-line animate-slide-down">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      )}

      {/* CUSTOM QUESTION REQUEST BOX */}
      <div className="bg-gradient-to-tr from-rose-500/[0.02] to-indigo-50/10 dark:from-rose-500/[0.01] dark:to-indigo-500/[0.01] border border-rose-100 dark:border-slate-800/60 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto text-left space-y-5 shadow-xs">
        
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-rose-500/10 text-rose-500">
            <MessageSquare className="h-5 w-5 text-rose-500 animate-pulse" />
          </div>
          <h3 className="font-display font-black text-sm text-slate-900 dark:text-white uppercase tracking-wider">
            Ajukan Pertanyaan Kustom (Instant AI Agent Support)
          </h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed pl-1">
          Belum menemukan jawaban yang Anda cari? Ketik langsung pertanyaan teknis atau non-teknis Anda secara rinci. Sistem asisten cerdas kami akan merumuskan draf tanggapan otomatis secara instan.
        </p>

        <form onSubmit={handleCustomQuestionSubmit} className="space-y-4 pl-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-black uppercase text-slate-400 dark:text-slate-500 block">Email Kontak Anda</label>
              <input 
                type="email" 
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full text-xs font-bold px-3.5 py-2.5 border rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-850 text-slate-850 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-black uppercase text-slate-400 dark:text-slate-500 block">Pertanyaan Anda</label>
              <input 
                type="text" 
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                placeholder="Contoh: Berapa biaya langganan paket Premium Member?"
                className="w-full text-xs font-bold px-3.5 py-2.5 border rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-850 text-slate-850 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button 
              type="submit"
              disabled={submittedQuery && !autoAnswer}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 disabled:bg-rose-400 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 flex items-center gap-2 shadow-md transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
              <span>{submittedQuery && !autoAnswer ? 'Memproses Pesan...' : 'Kirim Pertanyaan'}</span>
            </button>
          </div>
        </form>

        {submittedQuery && (
          <div className="bg-slate-50/50 dark:bg-slate-950/40 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-850 text-xs sm:text-[13px] space-y-3 mx-1 transition-all">
            <div className="flex items-center gap-2 text-rose-500 font-black font-mono">
              {autoAnswer ? <CheckCircle className="h-4.5 w-4.5" /> : <RefreshCw className="h-4.5 w-4.5 animate-spin" />}
              <span>{autoAnswer ? 'Draf Jawaban Terbuat' : 'Asisten AI sedang merangkum jawaban...'}</span>
            </div>
            {autoAnswer && (
              <div className="text-slate-700 dark:text-slate-300 font-sans font-medium leading-relaxed italic bg-white dark:bg-slate-900/60 p-4 rounded-xl border border-rose-100/50 dark:border-rose-950/20 shadow-3xs">
                "{autoAnswer}"
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
