import React, { useState } from 'react';
import { 
  BarChart3, FileText, Video, Mic, Edit, CheckCircle, Eye, DollarSign, Users, MessageSquare, 
  Folder, User, Settings, Sparkles, Plus, Play, Calendar, Trash2
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface CreatorPortalProps {
  user: any;
}

export default function CreatorPortal({ user }: CreatorPortalProps) {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Interactive drafts/articles list
  const [drafts, setDrafts] = useState([
    { id: '1', title: 'Rencana Pemetaan Rel Kereta Cepat Tahap Dua Bandung - Kertajati', category: 'regional', date: 'Disimpan kemarin' },
    { id: '2', title: 'Analisis Valuasi Saham GoTo Menjelang Kuartal Ketiga 2026', category: 'analisis', date: 'Disimpan 3 hari lalu' }
  ]);

  const [articles, setArticles] = useState([
    { id: '1', title: 'Inovasi Teknologi Pangan di Wilayah Sumedang dan Majalengka', views: 1845, comments: 24, status: 'published' },
    { id: '2', title: 'Panduan Investasi Reksa Dana untuk Pelaku UMKM Lokal Jawa Barat', views: 3204, comments: 48, status: 'published' }
  ]);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'articles', label: 'Articles', icon: FileText },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'podcast', label: 'Podcast', icon: Mic },
    { id: 'draft', label: 'Draft', icon: Edit },
    { id: 'publishing', label: 'Publishing', icon: CheckCircle },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'revenue', label: 'Revenue', icon: DollarSign },
    { id: 'followers', label: 'Followers', icon: Users },
    { id: 'comments', label: 'Comments', icon: MessageSquare },
    { id: 'media-library', label: 'Media Library', icon: Folder },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  // Determinisitc analytic chart data
  const chartData = [
    { month: 'Jan', views: 4200, revenue: 1200000 },
    { month: 'Feb', views: 5800, revenue: 1650000 },
    { month: 'Mar', views: 8900, revenue: 2400000 },
    { month: 'Apr', views: 12400, revenue: 3950000 },
    { month: 'Mei', views: 18450, revenue: 5800000 },
    { month: 'Jun', views: 24000, revenue: 7800000 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 dark:border-white/10 pb-6 mb-8 text-left">
        <div>
          <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider font-mono">CREATOR PORTAL</span>
          <h1 className="font-display font-black text-3xl text-[#002B5B] dark:text-white">Pusat Kreator &amp; Kontributor</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Publikasikan karya multimedia Anda, pantau pertumbuhan pemirsa, dan cairkan hasil komisi periklanan.</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#002B5B] dark:bg-sky-500/10 hover:bg-[#001f42] dark:hover:bg-sky-500/20 text-white dark:text-sky-400 font-bold text-xs rounded-lg shadow-sm transition border dark:border-sky-500/20">
            <Plus className="h-4 w-4" />
            <span>Tulis Artikel Baru</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        {/* Sidebar Nav */}
        <div className="lg:col-span-3">
          <div className="bg-slate-900 text-white rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center font-black font-display text-sm">
                CR
              </div>
              <div>
                <h3 className="text-xs font-bold leading-tight">{user?.fullName || 'Kreator Partner'}</h3>
                <p className="text-[9px] text-[#FFD700] font-mono uppercase tracking-wider">Independent Creator</p>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-3">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider font-mono block mb-2">Workspace</span>
              <nav className="flex flex-col gap-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                        activeTab === tab.id
                          ? 'bg-[#FFD700] text-slate-950 font-bold shadow-sm'
                          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
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

        {/* Content Area */}
        <div className="lg:col-span-9 bg-white dark:bg-[#001733]/40 border border-slate-200 dark:border-white/10 rounded-xl p-6 shadow-xs min-h-[500px]">
          
          {/* TAB: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-[#001f42]/40 space-y-1">
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase font-mono">Penonton Artikel</span>
                  <div className="text-2xl font-black text-[#002B5B] dark:text-white">34.8K</div>
                  <p className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold font-mono">▲ 14.5% vs bulan lalu</p>
                </div>
                <div className="p-4 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-[#001f42]/40 space-y-1">
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase font-mono">Pengikut Aktif</span>
                  <div className="text-2xl font-black text-[#002B5B] dark:text-white">1,402</div>
                  <p className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold font-mono">▲ 8.2% vs bulan lalu</p>
                </div>
                <div className="p-4 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-[#001f42]/40 space-y-1">
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase font-mono">Total Payouts</span>
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">Rp 12.4M</div>
                  <p className="text-[9px] text-slate-400 dark:text-slate-500 font-mono">Mendatang: Rp 1,850,000</p>
                </div>
                <div className="p-4 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-[#001f42]/40 space-y-1">
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase font-mono">Articles Live</span>
                  <div className="text-2xl font-black text-[#002B5B] dark:text-white">{articles.length}</div>
                  <p className="text-[9px] text-slate-400 dark:text-slate-500 font-mono">Draft: {drafts.length}</p>
                </div>
              </div>

              {/* Chart snippet */}
              <div className="p-4 border border-slate-200 dark:border-white/10 rounded-xl bg-white dark:bg-[#001f42]/30 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-display font-bold text-xs text-[#002B5B] dark:text-slate-200 uppercase">Tren Pertumbuhan Trafik Pemirsa</h3>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono">6 Bulan Terakhir</span>
                </div>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2B7A78" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#2B7A78" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                      <XAxis dataKey="month" stroke="#64748b" fontSize={9} fontStyle="italic" />
                      <YAxis stroke="#64748b" fontSize={9} />
                      <Tooltip contentStyle={{ backgroundColor: '#001733', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }} />
                      <Area type="monotone" dataKey="views" stroke="#2B7A78" strokeWidth={2} fillOpacity={1} fill="url(#viewsGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* TAB: ARTICLES */}
          {activeTab === 'articles' && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-sm text-[#002B5B] dark:text-white border-b dark:border-white/10 pb-2">Konten Tulisan yang Telah Tayang</h3>
              <div className="space-y-3">
                {articles.map(art => (
                  <div key={art.id} className="p-4 bg-slate-50 dark:bg-[#001f42]/40 border border-slate-200 dark:border-white/10 rounded-lg flex justify-between items-center text-xs">
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-200">{art.title}</h4>
                      <div className="flex items-center gap-3 text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-1">
                        <span>Status: <strong className="text-emerald-600 dark:text-emerald-400 uppercase">Live</strong></span>
                        <span>•</span>
                        <span>Views: {art.views}</span>
                        <span>•</span>
                        <span>Comments: {art.comments}</span>
                      </div>
                    </div>
                    <button className="text-[#2B7A78] dark:text-teal-400 font-bold hover:underline">Kelola</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: VIDEOS */}
          {activeTab === 'videos' && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-sm text-[#002B5B] dark:text-white border-b dark:border-white/10 pb-2">Klip Video Streaming &amp; Reels</h3>
              <div className="p-6 border border-dashed border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#001f42]/20 text-center rounded-xl space-y-2">
                <Video className="h-8 w-8 text-slate-300 dark:text-slate-600 mx-auto" />
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">Belum ada video yang diunggah.</p>
                <button className="px-3 py-1.5 bg-[#002B5B] dark:bg-sky-500/10 hover:bg-slate-800 dark:hover:bg-sky-500/20 text-white dark:text-sky-400 text-[10px] font-bold rounded-lg transition border dark:border-sky-500/20">
                  Unggah Klip Pertama
                </button>
              </div>
            </div>
          )}

          {/* TAB: PODCAST */}
          {activeTab === 'podcast' && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-sm text-[#002B5B] dark:text-white border-b dark:border-white/10 pb-2">Podcast Audio Center</h3>
              <div className="p-6 border border-dashed border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#001f42]/20 text-center rounded-xl space-y-2">
                <Mic className="h-8 w-8 text-slate-300 dark:text-slate-600 mx-auto" />
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">Belum ada audio podcast terdaftar.</p>
                <button className="px-3 py-1.5 bg-[#002B5B] dark:bg-sky-500/10 hover:bg-slate-800 dark:hover:bg-sky-500/20 text-white dark:text-sky-400 text-[10px] font-bold rounded-lg transition border dark:border-sky-500/20">
                  Unggah Episode Baru
                </button>
              </div>
            </div>
          )}

          {/* TAB: DRAFT */}
          {activeTab === 'draft' && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-sm text-[#002B5B] dark:text-white border-b dark:border-white/10 pb-2">Konsep &amp; Draft Kasar</h3>
              <div className="space-y-3">
                {drafts.map(dr => (
                  <div key={dr.id} className="p-4 bg-slate-50 dark:bg-[#001f42]/40 border border-slate-200 dark:border-white/10 rounded-lg flex justify-between items-center text-xs">
                    <div>
                      <span className="text-[9px] bg-slate-200 dark:bg-slate-800 px-1.5 py-0.2 rounded font-mono uppercase font-bold text-slate-600 dark:text-slate-300">{dr.category}</span>
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 mt-1">{dr.title}</h4>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">{dr.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-[#2B7A78] dark:text-teal-400 font-bold hover:underline">Edit</button>
                      <button 
                        onClick={() => setDrafts(drafts.filter(x => x.id !== dr.id))}
                        className="text-rose-500 dark:text-rose-400 font-bold hover:underline"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PUBLISHING */}
          {activeTab === 'publishing' && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-sm text-[#002B5B] dark:text-white border-b dark:border-white/10 pb-2">Penjadwalan &amp; Rilis</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Di sini Anda dapat mengonfigurasi rilis otomatis artikel atau materi visual terjadwal sesuai timeline berita nasional.
              </p>
              <div className="p-4 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-[#001f42]/40 text-xs font-mono text-slate-500 dark:text-slate-400">
                <span>0 konten dijadwalkan saat ini.</span>
              </div>
            </div>
          )}

          {/* TAB: ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-sm text-[#002B5B] dark:text-white border-b dark:border-white/10 pb-2">Laporan Analisis Mendalam</h3>
              <div className="h-64 w-full border border-slate-150 dark:border-white/10 p-4 rounded-xl bg-slate-50 dark:bg-[#001f42]/40">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={9} />
                    <YAxis stroke="#64748b" fontSize={9} />
                    <Tooltip contentStyle={{ backgroundColor: '#001733', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }} />
                    <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="#10b981" fillOpacity={0.15} strokeWidth={2} name="Komisi Periklanan (Rp)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* TAB: REVENUE */}
          {activeTab === 'revenue' && (
            <div className="space-y-6">
              <h3 className="font-display font-bold text-sm text-[#002B5B] dark:text-white border-b dark:border-white/10 pb-2">Komisi &amp; Payouts</h3>
              <div className="p-5 border border-emerald-200 dark:border-emerald-800/30 bg-emerald-50/20 dark:bg-emerald-950/10 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase font-mono">Dapat Dicairkan</span>
                  <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">Rp 1.850.000</div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">Akumulasi komisi penonton AdOS &amp; Premium Share.</p>
                </div>
                <button className="px-4 py-2 bg-[#2B7A78] dark:bg-teal-500/10 hover:bg-[#1f5957] dark:hover:bg-teal-500/20 text-white dark:text-teal-400 font-bold text-xs rounded-lg transition shadow-sm border dark:border-teal-500/20">
                  Cairkan Dana &rarr;
                </button>
              </div>
            </div>
          )}

          {/* TAB: FOLLOWERS */}
          {activeTab === 'followers' && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-sm text-[#002B5B] dark:text-white border-b dark:border-white/10 pb-2">Pertumbuhan Pemirsa</h3>
              <div className="p-4 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50/40 dark:bg-[#001f42]/40 text-xs text-slate-500 dark:text-slate-400">
                <p className="font-bold text-slate-800 dark:text-slate-200">1,402 Pembaca berlangganan notifikasi tulisan Anda.</p>
                <p className="text-[10px] mt-1 text-slate-400 dark:text-slate-500">Anda dapat melayangkan newsletter langsung jika mengaktifkan tier Premium.</p>
              </div>
            </div>
          )}

          {/* TAB: COMMENTS */}
          {activeTab === 'comments' && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-sm text-[#002B5B] dark:text-white border-b dark:border-white/10 pb-2">Moderasi Komentar Artikel</h3>
              <div className="p-4 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-[#001f42]/40 text-xs text-slate-500 dark:text-slate-400">
                <span>0 komentar baru membutuhkan persetujuan moderasi hari ini.</span>
              </div>
            </div>
          )}

          {/* TAB: MEDIA LIBRARY */}
          {activeTab === 'media-library' && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-sm text-[#002B5B] dark:text-white border-b dark:border-white/10 pb-2">Pustaka Aset Kreator</h3>
              <div className="p-4 border border-dashed border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-[#001f42]/20 text-center text-xs py-8 space-y-2">
                <Folder className="h-8 w-8 text-slate-300 dark:text-slate-600 mx-auto" />
                <p className="font-bold text-slate-500 dark:text-slate-400">Belum ada media diunggah.</p>
                <button className="px-3 py-1 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded font-semibold text-slate-700 dark:text-slate-300">Pilih Berkas</button>
              </div>
            </div>
          )}

          {/* TAB: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-sm text-[#002B5B] dark:text-white border-b dark:border-white/10 pb-2">Kartu Identitas Kontributor</h3>
              <div className="p-4 bg-slate-900 dark:bg-[#001f42] text-white rounded-xl max-w-sm space-y-3 relative overflow-hidden">
                <div className="relative z-10">
                  <span className="text-[9px] bg-[#FFD700] text-slate-900 font-extrabold px-1.5 py-0.2 rounded font-mono uppercase">VERIFIED PARTNER</span>
                  <h4 className="text-sm font-black mt-2">{user?.fullName || 'Mitra Penulis'}</h4>
                  <p className="text-[11px] text-slate-300 dark:text-slate-400 italic mt-1 leading-relaxed">&quot;Fokus pada jurnalisme investigasi daerah, data korupsi perbankan, dan peta regional.&quot;</p>
                </div>
                <div className="absolute right-0 bottom-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
              </div>
            </div>
          )}

          {/* TAB: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-sm text-[#002B5B] dark:text-white border-b dark:border-white/10 pb-2">Pengaturan Mitra Kerja</h3>
              <div className="space-y-3 max-w-sm text-xs">
                <div>
                  <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1 uppercase">Rekening Pencairan Komisi</label>
                  <input type="text" placeholder="Bank BCA - 803529321" className="w-full bg-slate-50 dark:bg-[#001f42]/60 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-1.5 focus:outline-none text-slate-800 dark:text-white" />
                </div>
                <button className="px-4 py-2 bg-[#002B5B] dark:bg-sky-500/10 hover:bg-[#001f42] dark:hover:bg-sky-500/20 text-white dark:text-sky-400 font-bold rounded-lg transition border dark:border-sky-500/20">Simpan Metode</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
