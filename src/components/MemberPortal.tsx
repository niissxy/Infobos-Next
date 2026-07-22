import React, { useState, useEffect } from 'react';
import { 
  Bookmark, History, Bell, Heart, User, Download, MessageSquare, Plus, Check,
  Award, Shield, Settings, CreditCard, ChevronRight, Sparkles, LogOut, CheckCircle2, UserCheck
} from 'lucide-react';

interface MemberPortalProps {
  user: any;
  onLogout: () => void;
  onNavigateToArticle?: (slug: string) => void;
}

export default function MemberPortal({ user, onLogout, onNavigateToArticle }: MemberPortalProps) {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Simple local storage state for Bookmarks with default fallback
  const [bookmarks, setBookmarks] = useState<any[]>(() => {
    const key = `read_later_${user?.email || 'default'}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Gagal membaca bookmark dari local storage:", e);
      }
    }
    const defaultBookmarks = [
      { id: '1', title: 'Pemprov Jabar Kembangkan Koridor Ekonomi Patimban Raya', slug: 'koridor-patimban', date: '26 Juni 2026', categoryName: 'REGIONAL' },
      { id: '2', title: 'Analisis Kebijakan Hilirisasi Logam Langka dan Ketahanan Nasional', slug: 'hilirisasi-logam', date: '25 Juni 2026', categoryName: 'ANALISIS' }
    ];
    localStorage.setItem(key, JSON.stringify(defaultBookmarks));
    return defaultBookmarks;
  });

  // Automatically persist bookmarks whenever they change
  useEffect(() => {
    const key = `read_later_${user?.email || 'default'}`;
    localStorage.setItem(key, JSON.stringify(bookmarks));
  }, [bookmarks, user]);

  const [history, setHistory] = useState([
    { id: '1', title: 'Laporan Investigasi: Di Balik Ekspansi Ridwan Kamil di Jabar', slug: 'ekspansi-ridwan-kamil', date: 'Membaca 2 jam lalu' },
    { id: '2', title: 'Rencana Pembangunan Bandara Baru Jawa Barat Selatan', slug: 'bandara-baru-jabar', date: 'Membaca 5 jam lalu' }
  ]);

  const [notifications, setNotifications] = useState([
    { id: '1', message: 'Reporter Budi Santoso merilis berita baru tentang Kota Bandung!', time: '10 menit lalu', unread: true },
    { id: '2', message: 'Sistem Ingestion mendeteksi 12 artikel baru dari RSS Humas Jabar.', time: '2 jam lalu', unread: false }
  ]);

  const [preferences, setPreferences] = useState({
    breakingNews: true,
    weeklyDigest: false,
    geographyAlerts: true,
    categories: ['regional', 'investigasi', 'analisis']
  });

  const [profile, setProfile] = useState({
    fullName: user?.fullName || 'Pembaca Setia',
    email: user?.email || 'pembaca@infobos.com',
    phone: '+62 812-3456-7890',
    bio: 'Pemerhati kebijakan publik dan intelijen data regional Jawa Barat.'
  });

  const [comments, setComments] = useState([
    { id: '1', article: 'Revitalisasi Gedung Sate Rampung', body: 'Mantap! Ini ikon Jabar yang harus terus dijaga keaslian arsitekturnya.', date: 'Kemarin' },
    { id: '2', article: 'Hilirisasi Logam Langka', body: 'Perlu regulasi ketat agar tidak sekadar dinikmati segelintir korporasi.', date: '3 hari lalu' }
  ]);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Shield },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
    { id: 'history', label: 'History', icon: History },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Heart },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'saved-content', label: 'Saved Content', icon: Bookmark },
    { id: 'downloads', label: 'Downloads', icon: Download },
    { id: 'comments', label: 'Comments', icon: MessageSquare },
    { id: 'following', label: 'Following', icon: UserCheck },
    { id: 'rewards', label: 'Rewards', icon: Sparkles },
    { id: 'badges', label: 'Badges', icon: Award },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 dark:border-white/10 pb-6 mb-8 text-left">
        <div>
          <span className="text-xs font-bold text-[#2B7A78] dark:text-teal-400 uppercase tracking-wider font-mono">MEMBER PORTAL</span>
          <h1 className="font-display font-black text-3xl text-[#002B5B] dark:text-white">Portal Anggota Tepercaya</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Akses penuh ke repositori data, bookmarks, premium, dan riwayat membaca Anda.</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white dark:bg-[#001733] px-3 py-1.5 border border-slate-200 dark:border-white/10 rounded-lg shadow-sm">
            <div className="h-2.5 w-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300">Tingkat Akun: Premium</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        {/* Sidebar Nav */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white dark:bg-[#001f42] border border-slate-200 dark:border-white/10 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#002B5B] to-[#2B7A78] flex items-center justify-center text-white font-black font-display text-sm shadow-sm">
                {profile.fullName.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-800 dark:text-white leading-tight">{profile.fullName}</h3>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">{profile.email}</p>
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-white/10 pt-3">
              <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono block mb-2">Menu Navigasi</span>
              <nav className="flex flex-col gap-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                        activeTab === tab.id
                          ? 'bg-[#002B5B] dark:bg-sky-500/10 text-white dark:text-sky-400 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Content Panel */}
        <div className="lg:col-span-9 bg-white dark:bg-[#001f42] border border-slate-200 dark:border-white/10 rounded-xl p-6 shadow-xs min-h-[500px]">
          
          {/* TAB: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-[#002B5B] to-[#1e4e8c] rounded-xl p-6 text-white relative overflow-hidden shadow-sm">
                <div className="relative z-10 max-w-lg space-y-2">
                  <span className="bg-[#FFD700] text-[#002B5B] text-[8px] font-black tracking-wider uppercase px-2 py-0.5 rounded font-mono">
                    PROMO LANGGANAN ELEKTORAL
                  </span>
                  <h2 className="font-display font-black text-xl">INFOBOS Pro Jurnalisme Tanpa Batas</h2>
                  <p className="text-white/80 text-[11px] leading-relaxed">
                    Dapatkan analisis intelijen geopolitik daerah, log ralat audit Dewan Pers secara instan, serta pemetaan korelasi profil elit langsung di genggaman Anda.
                  </p>
                  <button className="bg-white dark:bg-slate-100 hover:bg-slate-100 dark:hover:bg-white text-[#002B5B] font-bold text-xs px-4 py-2 rounded-lg shadow-sm transition">
                    Kelola Premium Anda
                  </button>
                </div>
                <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-white/5 skew-x-12 translate-x-12"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-slate-150 dark:border-white/10 rounded-xl bg-slate-50/50 dark:bg-slate-900/30 space-y-1">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono font-bold uppercase tracking-wider">Bookmarks</span>
                  <div className="text-2xl font-black text-[#002B5B] dark:text-sky-400">{bookmarks.length} Artikel</div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">Telah disimpan untuk dibaca kembali.</p>
                </div>
                <div className="p-4 border border-slate-150 dark:border-white/10 rounded-xl bg-slate-50/50 dark:bg-slate-900/30 space-y-1">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono font-bold uppercase tracking-wider">Histori Bacaan</span>
                  <div className="text-2xl font-black text-[#002B5B] dark:text-sky-400">{history.length} Berita</div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">Aktivitas penelusuran 30 hari terakhir.</p>
                </div>
                <div className="p-4 border border-slate-150 dark:border-white/10 rounded-xl bg-slate-50/50 dark:bg-slate-900/30 space-y-1">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono font-bold uppercase tracking-wider">Achievements</span>
                  <div className="text-2xl font-black text-[#002B5B] dark:text-sky-400">Level 4</div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">Total XP: 1,450 • Pembaca Setia Jabar.</p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-display font-bold text-sm text-[#002B5B] dark:text-white border-b dark:border-white/10 pb-2">Rekomendasi Intelijen Buat Anda</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-white dark:bg-[#001733] border border-slate-200 dark:border-white/10 rounded-lg flex items-center justify-between hover:border-[#2B7A78] dark:hover:border-teal-400 transition cursor-pointer">
                    <div>
                      <span className="text-[9px] font-bold text-[#2B7A78] dark:text-teal-400 uppercase font-mono">NASIONAL</span>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Evaluasi Kebijakan Pajak E-Commerce oleh Kemenkeu di Regional Jawa Barat</h4>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-300 dark:text-slate-600" />
                  </div>
                  <div className="p-3 bg-white dark:bg-[#001733] border border-slate-200 dark:border-white/10 rounded-lg flex items-center justify-between hover:border-[#2B7A78] dark:hover:border-teal-400 transition cursor-pointer">
                    <div>
                      <span className="text-[9px] font-bold text-[#2B7A78] dark:text-teal-400 uppercase font-mono">INVESTIGASI</span>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Menelusuri Aliran Dana Anggaran Pendidikan dan Revitalisasi Sekolah Rusak</h4>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-300 dark:text-slate-600" />
                  </div>
                </div>
              </div>

              {/* READ LATER (BACA NANTI) SECTION */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between border-b dark:border-white/10 pb-2">
                  <h3 className="font-display font-bold text-sm text-[#002B5B] dark:text-white flex items-center gap-1.5">
                    <Bookmark className="h-4 w-4 text-[#2B7A78] dark:text-teal-400" />
                    <span>Daftar Baca Nanti (Read Later)</span>
                  </h3>
                  <button 
                    onClick={() => setActiveTab('bookmarks')} 
                    className="text-xs text-[#2B7A78] dark:text-teal-400 font-bold hover:underline"
                  >
                    Kelola Semua ({bookmarks.length})
                  </button>
                </div>

                {bookmarks.length === 0 ? (
                  <div className="p-6 border border-dashed border-slate-200 dark:border-white/10 rounded-xl text-center bg-slate-50/55 dark:bg-[#001a35]">
                    <Bookmark className="h-6 w-6 text-slate-300 dark:text-slate-600 mx-auto mb-1.5" />
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Belum ada artikel yang disimpan untuk dibaca nanti.</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Klik tombol &quot;Simpan Berita&quot; pada detail artikel untuk menambahkannya ke sini.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {bookmarks.slice(0, 4).map(b => (
                      <div key={b.id} className="p-3.5 bg-gradient-to-br from-white to-slate-50/40 dark:from-[#001a35] dark:to-[#001226] border border-slate-200 dark:border-white/10 hover:border-[#2B7A78] dark:hover:border-teal-400 rounded-xl flex justify-between items-start transition duration-250 relative group shadow-xs text-left">
                        <div className="space-y-1 pr-4">
                          <span className="text-[9px] font-extrabold text-[#2B7A78] dark:text-teal-400 uppercase font-mono tracking-wider bg-[#2B7A78]/10 dark:bg-teal-500/10 px-1.5 py-0.2 rounded">
                            {b.categoryName || 'BERITA'}
                          </span>
                          <h4 
                            className="text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer hover:text-[#2B7A78] dark:hover:text-teal-400 line-clamp-2 leading-tight mt-1" 
                            onClick={() => onNavigateToArticle?.(b.slug)}
                          >
                            {b.title}
                          </h4>
                          <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono block pt-0.5">{b.date}</span>
                        </div>
                        <button 
                          onClick={() => setBookmarks(bookmarks.filter(x => x.id !== b.id))}
                          className="text-[10px] font-extrabold text-rose-500 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 p-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 transition shrink-0"
                          title="Hapus dari Daftar"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: BOOKMARKS */}
          {activeTab === 'bookmarks' && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-sm text-[#002B5B] dark:text-white border-b dark:border-white/10 pb-2">Artikel yang Anda Tandai</h3>
              {bookmarks.length === 0 ? (
                <p className="text-xs text-slate-400 dark:text-slate-500">Belum ada artikel yang ditandai.</p>
              ) : (
                <div className="space-y-3">
                  {bookmarks.map(b => (
                    <div key={b.id} className="p-4 bg-slate-50 dark:bg-[#001733] border border-slate-200 dark:border-white/10 rounded-lg flex justify-between items-center">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer hover:text-[#2B7A78] dark:hover:text-teal-400" onClick={() => onNavigateToArticle?.(b.slug)}>
                          {b.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">{b.date}</span>
                      </div>
                      <button 
                        onClick={() => setBookmarks(bookmarks.filter(x => x.id !== b.id))}
                        className="text-[10px] font-bold text-rose-500 dark:text-rose-400 hover:underline"
                      >
                        Hapus
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-sm text-[#002B5B] dark:text-white border-b dark:border-white/10 pb-2">Riwayat Membaca Berita</h3>
              <div className="space-y-3">
                {history.map(h => (
                  <div key={h.id} className="p-3 bg-white dark:bg-[#001733] border border-slate-200 dark:border-white/10 rounded-lg flex justify-between items-center hover:border-slate-300 dark:hover:border-slate-700">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-[#2B7A78] dark:hover:text-teal-400 cursor-pointer" onClick={() => onNavigateToArticle?.(h.slug)}>
                        {h.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">{h.date}</span>
                    </div>
                    <span className="text-[9px] bg-slate-100 dark:bg-slate-800/40 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400 font-mono">Selesai</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-sm text-[#002B5B] dark:text-white border-b dark:border-white/10 pb-2">Notifikasi Akun &amp; Pelacakan</h3>
              <div className="space-y-2">
                {notifications.map(n => (
                  <div key={n.id} className={`p-4 border rounded-xl flex items-start gap-3 text-xs ${n.unread ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/30' : 'bg-white dark:bg-[#001733] border-slate-200 dark:border-white/10'}`}>
                    <Bell className={`h-4 w-4 mt-0.5 shrink-0 ${n.unread ? 'text-amber-500' : 'text-slate-400'}`} />
                    <div className="flex-1">
                      <p className={`font-medium ${n.unread ? 'text-slate-900 dark:text-amber-200 font-semibold' : 'text-slate-600 dark:text-slate-400'}`}>{n.message}</p>
                      <span className="text-[9px] text-slate-400 dark:text-slate-500 block mt-1 font-mono">{n.time}</span>
                    </div>
                    {n.unread && (
                      <button 
                        onClick={() => setNotifications(notifications.map(x => x.id === n.id ? { ...x, unread: false } : x))}
                        className="text-[10px] text-[#2B7A78] dark:text-teal-400 font-bold shrink-0"
                      >
                        Tandai Dibaca
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PREFERENCES */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <h3 className="font-display font-bold text-sm text-[#002B5B] dark:text-white border-b dark:border-white/10 pb-2">Preferensi &amp; Topik Minat</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-slate-200 dark:border-white/10 rounded-lg bg-white dark:bg-[#001733]">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Notifikasi Breaking News Jabar</h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">Kirim pemberitahuan instan jika ada berita kritis.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={preferences.breakingNews} 
                    onChange={(e) => setPreferences({ ...preferences, breakingNews: e.target.checked })}
                    className="h-4 w-4 text-[#002B5B]" 
                  />
                </div>

                <div className="flex items-center justify-between p-3 border border-slate-200 dark:border-white/10 rounded-lg bg-white dark:bg-[#001733]">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Buletin Rangkuman Intelijen Mingguan</h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">Kiriman ringkasan PDF tren visual ke alamat email.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={preferences.weeklyDigest} 
                    onChange={(e) => setPreferences({ ...preferences, weeklyDigest: e.target.checked })}
                    className="h-4 w-4 text-[#002B5B]" 
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: SUBSCRIPTION */}
          {activeTab === 'subscription' && (
            <div className="space-y-6">
              <h3 className="font-display font-bold text-sm text-[#002B5B] dark:text-white border-b dark:border-white/10 pb-2">Status Langganan Berlangganan</h3>
              
              <div className="p-5 border border-slate-200 dark:border-white/10 bg-emerald-50/40 dark:bg-emerald-950/10 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider font-mono px-2 py-0.5 rounded">
                      AKTIF - PREMIUM PRO
                    </span>
                    <h4 className="text-base font-black text-[#002B5B] dark:text-white mt-1">Paket Akses Korporasi Jabar</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-[#002B5B] dark:text-emerald-400">Rp 149.000</span>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">Bulan (Auto-Renew)</p>
                  </div>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-white/10 pt-3 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Metode pembayaran aktif: Kartu Kredit Mandiri • Pembaruan berikutnya pada <strong>26 Juli 2026</strong>.</span>
                </div>
              </div>

              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Riwayat Transaksi Tagihan</h4>
                <div className="border border-slate-150 dark:border-white/10 rounded-lg overflow-hidden divide-y divide-slate-150 dark:divide-white/10 text-xs">
                  <div className="p-3 bg-slate-50 dark:bg-[#001733] flex justify-between font-mono font-semibold text-slate-600 dark:text-slate-400">
                    <span>ID Transaksi</span>
                    <span>Tanggal</span>
                    <span>Status</span>
                  </div>
                  <div className="p-3 dark:bg-[#001f42]/40 flex justify-between font-mono">
                    <span>TX-20260626</span>
                    <span>26 Jun 2026</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">Lunas</span>
                  </div>
                  <div className="p-3 dark:bg-[#001f42]/40 flex justify-between font-mono border-t dark:border-white/10">
                    <span>TX-20260526</span>
                    <span>26 Mei 2026</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">Lunas</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-sm text-[#002B5B] dark:text-white border-b dark:border-white/10 pb-2">Informasi Profil Pengguna</h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-1 uppercase font-mono">Nama Lengkap</label>
                  <input 
                    type="text" 
                    value={profile.fullName} 
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-[#001733] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-1.5 text-xs focus:outline-none text-slate-800 dark:text-white" 
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-1 uppercase font-mono">Email Redaksi / Anggota</label>
                  <input 
                    type="email" 
                    value={profile.email} 
                    disabled 
                    className="w-full bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-500 cursor-not-allowed font-mono" 
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-1 uppercase font-mono">Nomor Seluler</label>
                  <input 
                    type="text" 
                    value={profile.phone} 
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-[#001733] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-1.5 text-xs focus:outline-none text-slate-800 dark:text-white" 
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-1 uppercase font-mono">Biodata Singkat</label>
                  <textarea 
                    rows={3} 
                    value={profile.bio} 
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-[#001733] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-1.5 text-xs focus:outline-none resize-none text-slate-800 dark:text-white" 
                  />
                </div>
                <button className="px-4 py-2 bg-[#002B5B] dark:bg-sky-500/10 text-white dark:text-sky-400 hover:bg-[#001f42] dark:hover:bg-sky-500/20 font-bold text-xs rounded-lg transition shadow-xs border dark:border-sky-500/20">
                  Simpan Perubahan
                </button>
              </div>
            </div>
          )}

          {/* TAB: SAVED CONTENT */}
          {activeTab === 'saved-content' && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-sm text-[#002B5B] dark:text-white border-b dark:border-white/10 pb-2">Konten yang Disimpan Offline</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Halaman ini menyimpan salinan HTML penuh dari artikel terverifikasi sehingga tetap dapat ditelaah tanpa koneksi internet sama sekali.
              </p>
              <div className="p-4 border border-dashed border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-[#001733]/20 rounded-xl text-center py-8">
                <Bookmark className="h-8 w-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">Tidak ada konten luring lokal.</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">Gunakan ikon &quot;Simpan Offline&quot; di detail artikel untuk menambahkannya.</p>
              </div>
            </div>
          )}

          {/* TAB: DOWNLOADS */}
          {activeTab === 'downloads' && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-sm text-[#002B5B] dark:text-white border-b dark:border-white/10 pb-2">Pusat Unduhan PDF Laporan Kebijakan</h3>
              <div className="border border-slate-200 dark:border-white/10 rounded-lg overflow-hidden divide-y divide-slate-200 dark:divide-white/10 text-xs bg-white dark:bg-[#001f42]">
                <div className="p-3 bg-slate-50 dark:bg-[#001733] flex justify-between font-mono font-bold text-slate-500 dark:text-slate-400">
                  <span>Nama Laporan Kebijakan</span>
                  <span>Ukuran</span>
                  <span>Aksi</span>
                </div>
                <div className="p-3 flex justify-between items-center bg-white dark:bg-[#001f42]">
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">Laporan Komparatif Ketahanan Pangan Jabar Selatan 2026</span>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Analisis spasial lahan basah berbasis Citra Landsat.</p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 shrink-0">14.2 MB</span>
                  <button className="text-[11px] font-bold text-[#2B7A78] dark:text-teal-400 hover:underline pl-4">Unduh PDF</button>
                </div>
                <div className="p-3 flex justify-between items-center bg-white dark:bg-[#001f42]">
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">Sinergi FinTech &amp; Regulasi UMKM Digital Nasional</span>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Studi kasus determinasi adopsi QRIS di Jawa Barat.</p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 shrink-0">8.4 MB</span>
                  <button className="text-[11px] font-bold text-[#2B7A78] dark:text-teal-400 hover:underline pl-4">Unduh PDF</button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: COMMENTS */}
          {activeTab === 'comments' && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-sm text-[#002B5B] dark:text-white border-b dark:border-white/10 pb-2">Riwayat Komentar Publik Anda</h3>
              <div className="space-y-3">
                {comments.map(c => (
                  <div key={c.id} className="p-3 bg-slate-50 dark:bg-[#001733] border border-slate-150 dark:border-white/10 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-bold text-[#2B7A78] dark:text-teal-400">{c.article}</span>
                      <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono">{c.date}</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 italic font-medium">&quot;{c.body}&quot;</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: FOLLOWING */}
          {activeTab === 'following' && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-sm text-[#002B5B] dark:text-white border-b dark:border-white/10 pb-2">Penulis &amp; Lokasi yang Diikuti</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-slate-200 dark:border-white/10 rounded-xl space-y-2 bg-slate-50/30 dark:bg-[#001733]/30">
                  <span className="text-[9px] bg-[#2B7A78]/10 dark:bg-teal-500/10 text-[#2B7A78] dark:text-teal-400 font-bold px-2 py-0.5 rounded font-mono uppercase">
                    Penulis Berita
                  </span>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Budi Santoso</h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">Reporter senior untuk isu infrastruktur &amp; regional Jabar.</p>
                  <button className="text-[10px] font-black text-rose-500 dark:text-rose-400 hover:underline">Batal Ikuti</button>
                </div>
                <div className="p-4 border border-slate-200 dark:border-white/10 rounded-xl space-y-2 bg-slate-50/30 dark:bg-[#001733]/30">
                  <span className="text-[9px] bg-[#FFD700]/10 dark:bg-amber-400/10 text-[#002B5B] dark:text-amber-400 font-bold px-2 py-0.5 rounded font-mono uppercase">
                    Kanal Geografi
                  </span>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Gedung Sate, Bandung</h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">Pantau seluruh anomali &amp; berita di ring 1 Pemprov Jabar.</p>
                  <button className="text-[10px] font-black text-rose-500 dark:text-rose-400 hover:underline">Batal Ikuti</button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: REWARDS */}
          {activeTab === 'rewards' && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-sm text-[#002B5B] dark:text-white border-b dark:border-white/10 pb-2">Program Loyalitas &amp; Rewards</h3>
              <div className="p-5 border border-amber-200 dark:border-amber-800/30 bg-amber-50/30 dark:bg-amber-950/15 rounded-xl text-center space-y-3">
                <Sparkles className="h-10 w-10 text-amber-500 mx-auto" />
                <h4 className="text-sm font-black text-[#002B5B] dark:text-white">Poin Loyalitas Anggota INFOBOS</h4>
                <div className="text-3xl font-black text-amber-600 dark:text-amber-400">850 Poin</div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
                  Anda berhak menukarkan poin loyalitas Anda dengan diskon langganan cetak atau akses premium tambahan.
                </p>
                <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-lg transition shadow-sm">
                  Tukarkan Poin Sekarang
                </button>
              </div>
            </div>
          )}

          {/* TAB: BADGES */}
          {activeTab === 'badges' && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-sm text-[#002B5B] dark:text-white border-b dark:border-white/10 pb-2">Lencana Penghargaan &amp; Kredibilitas</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50/50 dark:bg-[#001733]/30 text-center space-y-2">
                  <Award className="h-8 w-8 text-teal-600 dark:text-teal-400 mx-auto" />
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Fakta Hunter</h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight">Membaca lebih dari 20 artikel verifikasi dan fact checking.</p>
                </div>
                <div className="p-4 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50/50 dark:bg-[#001733]/30 text-center space-y-2">
                  <Shield className="h-8 w-8 text-[#002B5B] dark:text-sky-400 mx-auto" />
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Intel Jabar</h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight">Mengakses Hub Geospasial Regional Jabar selama 7 hari berturut-turut.</p>
                </div>
                <div className="p-4 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50/50 dark:bg-[#001733]/30 text-center space-y-2 opacity-50">
                  <Award className="h-8 w-8 text-slate-300 dark:text-slate-600 mx-auto" />
                  <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 leading-tight">Analis Kebijakan</h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight">Berbagi lebih dari 10 PDF data visualisasi secara daring.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="font-display font-bold text-sm text-[#002B5B] dark:text-white border-b dark:border-white/10 pb-2">Pengaturan Akun &amp; Sesi Aktif</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Ganti Kata Sandi Keamanan</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-md">
                    <input type="password" placeholder="Password Lama" className="bg-slate-50 dark:bg-[#001733] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-1.5 text-xs focus:outline-none text-slate-800 dark:text-white" />
                    <input type="password" placeholder="Password Baru" className="bg-slate-50 dark:bg-[#001733] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-1.5 text-xs focus:outline-none text-slate-800 dark:text-white" />
                  </div>
                  <button className="px-4 py-2 bg-[#002B5B] dark:bg-sky-500/10 text-white dark:text-sky-400 font-bold text-xs rounded-lg hover:bg-slate-800 dark:hover:bg-sky-500/20 transition border dark:border-sky-500/30">
                    Simpan Sandi Baru
                  </button>
                </div>

                <div className="border-t border-slate-200 dark:border-white/10 pt-4 space-y-2">
                  <h4 className="text-xs font-bold text-rose-500 dark:text-rose-400">Hapus Akun Jurnalisme</h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">Menghapus seluruh rekam jejak bookmarks, histori, poin, dan langganan Anda secara permanen.</p>
                  <button className="px-4 py-2 bg-rose-500 dark:bg-rose-600/20 text-white dark:text-rose-400 font-bold text-xs rounded-lg hover:bg-rose-600 dark:hover:bg-rose-600/30 transition border dark:border-rose-500/30">
                    Hapus Akun Saya
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
