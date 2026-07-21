import React, { useState } from 'react';
import { 
  ShoppingBag, Tag, CreditCard, Users, BarChart2, Package, Calendar, Briefcase, 
  Plus, Search, Shield, Trash2, CheckCircle2, MessageSquare, BookOpen, AlertCircle, 
  UserX, ShieldAlert, Award, Compass, MessageCircle, Send, HelpCircle, FileText, Check, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface PortalProps {
  user: any;
  token?: string;
  onNavigateToArticle?: (slug: string) => void;
}

// ==========================================
// 1. MARKETPLACE PORTAL
// ==========================================
export function MarketplacePortal({ user }: PortalProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'customers' | 'payments' | 'analytics' | 'inventory' | 'rental' | 'projects'>('dashboard');
  
  // Products State
  const [products, setProducts] = useState([
    { id: 'prod-1', name: 'Madu Hutan Gunung Ciremai', price: 125000, stock: 45, sold: 18, rating: 4.8 },
    { id: 'prod-2', name: 'Batik Tulis Mega Mendung Cirebon', price: 350000, stock: 12, sold: 5, rating: 4.9 },
    { id: 'prod-3', name: 'Kopi Arabika Parahyangan 250g', price: 65000, stock: 120, sold: 48, rating: 4.7 }
  ]);
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdStock, setNewProdStock] = useState('');

  // Orders State
  const [orders, setOrders] = useState([
    { id: 'ord-104', customer: 'Budi Raharjo', item: 'Madu Hutan Gunung Ciremai', amount: 125000, status: 'Diproses' },
    { id: 'ord-103', customer: 'Siti Aminah', item: 'Batik Tulis Mega Mendung', amount: 350000, status: 'Dikirim' },
    { id: 'ord-102', customer: 'Dewi Lestari', item: 'Kopi Arabika Parahyangan', amount: 130000, status: 'Selesai' }
  ]);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim() || !newProdPrice || !newProdStock) return;
    const newProd = {
      id: `prod-${Date.now()}`,
      name: newProdName,
      price: parseInt(newProdPrice),
      stock: parseInt(newProdStock),
      sold: 0,
      rating: 5.0
    };
    setProducts([newProd, ...products]);
    setNewProdName('');
    setNewProdPrice('');
    setNewProdStock('');
  };

  const salesData = [
    { name: 'Sen', sales: 450000 },
    { name: 'Sel', sales: 620000 },
    { name: 'Rab', sales: 380000 },
    { name: 'Kam', sales: 780000 },
    { name: 'Jum', sales: 950000 },
    { name: 'Sab', sales: 1200000 },
    { name: 'Min', sales: 1450000 }
  ];

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200/80 dark:border-white/10 pb-4 gap-3">
        <div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1">
            <ShoppingBag className="h-3.5 w-3.5" /> INFOBOS B2C MARKETPLACE
          </span>
          <h2 className="text-2xl font-black text-[#002B5B] dark:text-[#38bdf8] tracking-tight mt-1">Portal Niaga &amp; UMKM Daerah</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Kelola listing produk kerajinan lokal Jabar, catat invoice pesanan masuk, dan pantau omzet penjualan.</p>
        </div>
        <span className="text-xs bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-500/20 px-3.5 py-1.5 rounded-full font-mono font-bold uppercase tracking-wider">
          SELLER HUB ACTIVE
        </span>
      </div>

      <div className="flex gap-2 border-b border-slate-200 dark:border-white/10 pb-2 overflow-x-auto scrollbar-none text-xs font-semibold">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: ShoppingBag },
          { id: 'products', label: 'Produk Saya', icon: Tag },
          { id: 'orders', label: 'Pesanan Masuk', icon: CreditCard },
          { id: 'customers', label: 'Pelanggan', icon: Users },
          { id: 'payments', label: 'Pembayaran', icon: CreditCard },
          { id: 'analytics', label: 'Grafik Analisis', icon: BarChart2 },
          { id: 'inventory', label: 'Gudang & Stok', icon: Package },
          { id: 'rental', label: 'Sewa Aset', icon: Calendar },
          { id: 'projects', label: 'Proyek Lokal', icon: Briefcase }
        ].map(t => {
          const isActive = activeTab === t.id;
          return (
            <button 
              key={t.id} 
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap capitalize transition-all duration-200 relative cursor-pointer ${
                isActive 
                  ? 'bg-emerald-600 text-white font-bold shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/50'
              }`}
            >
              <t.icon className="h-4 w-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      <div className="bg-white dark:bg-[#001f42] border border-slate-200/80 dark:border-white/10 rounded-2xl p-6 min-h-[420px] shadow-sm relative text-slate-900 dark:text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* TAB: DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="p-5 border border-slate-150 dark:border-white/10 rounded-2xl bg-gradient-to-br from-white to-emerald-50/15 dark:from-[#000a18]/40 dark:to-emerald-500/5 space-y-1">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase font-mono">Pendapatan Kotor</span>
                    <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">Rp 6.380.000</div>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">Peningkatan 15.2% minggu ini</p>
                  </div>
                  <div className="p-5 border border-slate-150 dark:border-white/10 rounded-2xl bg-gradient-to-br from-white to-sky-50/15 dark:from-[#000a18]/40 dark:to-sky-500/5 space-y-1">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase font-mono">Pesanan Diproses</span>
                    <div className="text-xl font-black text-[#002B5B] dark:text-sky-400">3 Transaksi</div>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">SLA rata-rata pengemasan: 4.2 jam</p>
                  </div>
                  <div className="p-5 border border-slate-150 dark:border-white/10 rounded-2xl bg-gradient-to-br from-white to-teal-50/15 dark:from-[#000a18]/40 dark:to-teal-500/5 space-y-1">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase font-mono">Total Listing Aktif</span>
                    <div className="text-xl font-black text-teal-600 dark:text-teal-400">{products.length} Barang</div>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">UMKM Terverifikasi Dinas Koperasi Jabar</p>
                  </div>
                  <div className="p-5 border border-slate-150 dark:border-white/10 rounded-2xl bg-gradient-to-br from-white to-purple-50/15 dark:from-[#000a18]/40 dark:to-purple-500/5 space-y-1">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase font-mono">Penyewa Aktif Aset</span>
                    <div className="text-xl font-black text-purple-600 dark:text-purple-400">2 Kontrak</div>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">Mesin giling &amp; stand Gasibu Minggu</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 space-y-3">
                    <h3 className="font-bold text-slate-800 dark:text-[#38bdf8] uppercase font-mono">Aktivitas Terakhir Toko</h3>
                    <div className="border border-slate-150 dark:border-white/10 rounded-xl divide-y dark:divide-white/10 bg-slate-50/30 dark:bg-slate-950/20">
                      {orders.map(o => (
                        <div key={o.id} className="p-3.5 flex justify-between items-center text-xs">
                          <div className="space-y-1 text-left">
                            <span className="font-bold text-slate-800 dark:text-slate-200">{o.customer}</span>
                            <div className="flex gap-2 text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                              <span>Membeli: {o.item}</span>
                              <span>•</span>
                              <span>Invoice ID: {o.id}</span>
                            </div>
                          </div>
                          <div className="text-right space-y-1">
                            <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">Rp {o.amount.toLocaleString()}</span>
                            <span className={`block text-[9px] font-mono font-bold px-2 py-0.2 rounded-full uppercase border ${
                              o.status === 'Selesai' ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20' :
                              o.status === 'Dikirim' ? 'bg-indigo-100 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20' :
                              'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 border-amber-200 dark:border-amber-500/20'
                            }`}>{o.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-5 border border-slate-200 dark:border-white/10 bg-gradient-to-br from-slate-50 to-slate-100/30 dark:from-[#000a18]/40 dark:to-slate-900/10 rounded-2xl text-left space-y-3">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono uppercase tracking-wider flex items-center gap-1">
                      <Shield className="h-4 w-4" /> Perlindungan Kurasi UMKM Jabar
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      Dashboard ini dikhususkan bagi produsen, koperasi, dan pengrajin lokal Jawa Barat. Penyaluran komoditas diaudit secara berkala agar bebas dari barang impor repackaging ilegal, guna mendukung perputaran ekonomi mikro lokal.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PRODUCTS */}
            {activeTab === 'products' && (
              <div className="space-y-5 text-xs">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Form input */}
                  <form onSubmit={handleAddProduct} className="lg:col-span-4 border border-slate-200 dark:border-white/10 rounded-2xl p-5 bg-slate-50/50 dark:bg-[#000a18]/40 space-y-3.5">
                    <h3 className="font-bold text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono flex items-center gap-1.5 pb-2 border-b dark:border-white/10">
                      <Plus className="h-4 w-4 text-emerald-500" /> Daftarkan Produk Baru
                    </h3>
                    <div className="space-y-1 text-left">
                      <label className="font-bold text-slate-700 dark:text-slate-300">Nama Produk</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Batik Tulis Tasikmalaya" 
                        value={newProdName}
                        onChange={(e) => setNewProdName(e.target.value)}
                        className="w-full bg-white dark:bg-[#001f42] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl px-3 py-2 focus:outline-none"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1 text-left">
                        <label className="font-bold text-slate-700 dark:text-slate-300">Harga (Rp)</label>
                        <input 
                          type="number" 
                          placeholder="e.g. 150000" 
                          value={newProdPrice}
                          onChange={(e) => setNewProdPrice(e.target.value)}
                          className="w-full bg-white dark:bg-[#001f42] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl px-3 py-2 focus:outline-none"
                          required
                        />
                      </div>
                      <div className="space-y-1 text-left">
                        <label className="font-bold text-slate-700 dark:text-slate-300">Jumlah Stok</label>
                        <input 
                          type="number" 
                          placeholder="e.g. 50" 
                          value={newProdStock}
                          onChange={(e) => setNewProdStock(e.target.value)}
                          className="w-full bg-white dark:bg-[#001f42] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl px-3 py-2 focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                    <button type="submit" className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm cursor-pointer">
                      Daftarkan Produk &rarr;
                    </button>
                  </form>

                  {/* Product List */}
                  <div className="lg:col-span-8 space-y-3">
                    <h3 className="font-bold text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono">Daftar Produk Aktif</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {products.map(p => (
                        <div key={p.id} className="p-4 border border-slate-200 dark:border-white/10 rounded-2xl bg-white dark:bg-[#000a18]/60 hover:border-emerald-200 dark:hover:border-emerald-500/30 transition shadow-xs flex justify-between items-start">
                          <div className="space-y-1.5 text-left">
                            <span className="font-bold text-slate-800 dark:text-slate-200 text-xs block leading-tight">{p.name}</span>
                            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono font-bold block">Rp {p.price.toLocaleString()}</span>
                            <div className="flex gap-3 text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                              <span>Stok: <span className="text-[#002B5B] dark:text-sky-400 font-semibold">{p.stock}</span></span>
                              <span>Terjual: <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{p.sold}</span></span>
                            </div>
                          </div>
                          <button 
                            onClick={() => setProducts(products.filter(x => x.id !== p.id))}
                            className="text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 p-1.5 rounded-lg transition cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: ORDERS */}
            {activeTab === 'orders' && (
              <div className="space-y-4 text-xs">
                <h3 className="font-bold text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono border-b dark:border-white/10 pb-2">Status &amp; Detail Pesanan Masuk</h3>
                <div className="border border-slate-150 dark:border-white/10 rounded-2xl overflow-hidden divide-y dark:divide-white/10">
                  <div className="bg-slate-50 dark:bg-[#000a18]/60 px-4 py-3 grid grid-cols-12 gap-2 text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase">
                    <div className="col-span-2">ID Pesanan</div>
                    <div className="col-span-3">Nama Pelanggan</div>
                    <div className="col-span-3">Nama Barang</div>
                    <div className="col-span-2 text-right">Harga</div>
                    <div className="col-span-2 text-center">Status</div>
                  </div>
                  {orders.map(o => (
                    <div key={o.id} className="px-4 py-3.5 grid grid-cols-12 gap-2 items-center hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                      <div className="col-span-2 font-mono font-bold text-slate-500 dark:text-slate-400">{o.id}</div>
                      <div className="col-span-3 font-semibold text-slate-800 dark:text-slate-200">{o.customer}</div>
                      <div className="col-span-3 text-slate-600 dark:text-slate-300">{o.item}</div>
                      <div className="col-span-2 text-right font-mono font-bold text-slate-800 dark:text-slate-200">Rp {o.amount.toLocaleString()}</div>
                      <div className="col-span-2 text-center">
                        <select 
                          value={o.status}
                          onChange={(e) => {
                            setOrders(orders.map(x => x.id === o.id ? { ...x, status: e.target.value } : x));
                          }}
                          className={`text-[9px] font-mono font-bold bg-white dark:bg-[#001f42] border border-slate-200 dark:border-white/10 px-2 py-0.5 rounded cursor-pointer focus:outline-none ${
                            o.status === 'Selesai' ? 'text-emerald-600 dark:text-emerald-400' :
                            o.status === 'Dikirim' ? 'text-indigo-600 dark:text-indigo-400' :
                            'text-amber-600 dark:text-amber-400'
                          }`}
                        >
                          <option value="Diproses" className="dark:bg-[#001f42] dark:text-white">Diproses</option>
                          <option value="Dikirim" className="dark:bg-[#001f42] dark:text-white">Dikirim</option>
                          <option value="Selesai" className="dark:bg-[#001f42] dark:text-white">Selesai</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: CUSTOMERS */}
            {activeTab === 'customers' && (
              <div className="space-y-4 text-xs">
                <h3 className="font-bold text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono border-b dark:border-white/10 pb-2">Database Pelanggan UMKM</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: 'Budi Raharjo', city: 'Kota Bandung', totalSpent: 450000, frequency: '4 kali' },
                    { name: 'Siti Aminah', city: 'Cirebon', totalSpent: 1250000, frequency: '8 kali' },
                    { name: 'Dewi Lestari', city: 'Sumedang', totalSpent: 260000, frequency: '2 kali' }
                  ].map((c, i) => (
                    <div key={i} className="p-4 border border-slate-200 dark:border-white/10 rounded-2xl bg-slate-50/30 dark:bg-[#000a18]/60 text-left space-y-1.5">
                      <span className="font-bold text-slate-800 dark:text-slate-200 text-xs block">{c.name}</span>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px]">Asal Kabupaten/Kota: <span className="font-bold text-slate-700 dark:text-slate-300">{c.city}</span></p>
                      <div className="flex justify-between border-t border-slate-100 dark:border-white/5 pt-1.5 text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                        <span>Total Belanja: <strong className="text-[#002B5B] dark:text-emerald-400">Rp {c.totalSpent.toLocaleString()}</strong></span>
                        <span>Siklus: {c.frequency}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: PAYMENTS */}
            {activeTab === 'payments' && (
              <div className="space-y-4 text-xs">
                <h3 className="font-bold text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono border-b dark:border-white/10 pb-2">Penarikan Saldo &amp; Rekening</h3>
                <div className="p-5 border border-emerald-100 dark:border-emerald-500/20 bg-emerald-50/15 dark:bg-emerald-950/20 rounded-2xl flex justify-between items-center">
                  <div className="space-y-1 text-left">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 font-mono uppercase">Saldo UMKM Tersedia</span>
                    <h4 className="text-2xl font-black text-[#002B5B] dark:text-white">Rp 4.120.000</h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">Tersinkronisasi otomatis dengan Bank Jabar Banten (BJB)</p>
                  </div>
                  <button className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm cursor-pointer">
                    Tarik Saldo ke Rekening &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* TAB: ANALYTICS */}
            {activeTab === 'analytics' && (
              <div className="space-y-4 text-xs">
                <h3 className="font-bold text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono border-b dark:border-white/10 pb-2">Performa Omzet Mingguan</h3>
                <div className="h-64 bg-slate-50/30 dark:bg-[#000a18]/40 border border-slate-200 dark:border-white/10 rounded-2xl p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesData}>
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="opacity-30 dark:opacity-10"/>
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false}/>
                      <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false}/>
                      <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 31, 66, 0.95)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: '#fff' }} />
                      <Area type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSales)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* TAB: INVENTORY */}
            {activeTab === 'inventory' && (
              <div className="space-y-4 text-xs">
                <h3 className="font-bold text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono border-b dark:border-white/10 pb-2">Manajemen Stok &amp; Threshold</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {products.map(p => {
                    const isLow = p.stock < 15;
                    return (
                      <div key={p.id} className="p-4 border border-slate-200 dark:border-white/10 rounded-2xl bg-white dark:bg-[#000a18]/60 space-y-3 text-left">
                        <div>
                          <span className="font-bold text-slate-800 dark:text-slate-200 text-xs block truncate">{p.name}</span>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">Kode SKU: SKU-{p.id.slice(-4).toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-white/5">
                          <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Jumlah Stok:</span>
                          <span className={`text-xs font-black px-2.5 py-0.5 rounded-full font-mono border ${
                            isLow 
                              ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border-rose-100 dark:border-rose-500/20' 
                              : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20'
                          }`}>{p.stock} pcs</span>
                        </div>
                        {isLow && (
                          <div className="p-2 bg-rose-50 dark:bg-rose-950/40 text-[10px] text-rose-800 dark:text-rose-300 rounded-xl font-bold flex gap-1.5 items-center">
                            <AlertCircle className="h-3.5 w-3.5 text-rose-500 dark:text-rose-400" />
                            <span>Stok hampir habis! Segera restock.</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB: RENTAL */}
            {activeTab === 'rental' && (
              <div className="space-y-4 text-xs">
                <h3 className="font-bold text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono border-b dark:border-white/10 pb-2">Sewa Aset &amp; Alat Pendukung</h3>
                <p className="text-slate-500 dark:text-slate-400">Ajukan sewa gudang pendingin Dinas UMKM atau stand promosi resmi.</p>
                <div className="p-4 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-[#000a18]/60 text-left space-y-2">
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-xs block">Stand Promosi Gedung Sate (Minggu)</span>
                  <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    <span>Sewa Aktif: 28 Juni 2026</span>
                    <span className="text-[#002B5B] dark:text-emerald-400 font-bold">Terverifikasi</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PROJECTS */}
            {activeTab === 'projects' && (
              <div className="space-y-4 text-xs">
                <h3 className="font-bold text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono border-b dark:border-white/10 pb-2">Proyek Kolaborasi Kreatif Lokal</h3>
                <p className="text-slate-500 dark:text-slate-400">Partisipasi dalam pengadaan cinderamata delegasi internasional atau paket wisata daerah.</p>
                <div className="p-4 border rounded-xl border-dashed border-slate-300 dark:border-slate-700 text-center text-slate-400 dark:text-slate-500 bg-[#000a18]/30">
                  <span>Belum ada tender proyek kolaborasi aktif di wilayah Anda.</span>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ==========================================
// 2. COMMUNITY PORTAL
// ==========================================
export function CommunityPortal({ user }: PortalProps) {
  const [activeTab, setActiveTab] = useState<'forum' | 'groups' | 'events' | 'discussion' | 'live_chat' | 'leaderboard' | 'achievements'>('forum');
  
  // Forum Threads State
  const [threads, setThreads] = useState([
    { id: 'th-1', title: 'Apakah koridor MRT Bandung Raya benar-benar mendesak?', author: 'Asep_Hidayat', replies: 34, votes: 120, category: 'Transportasi' },
    { id: 'th-2', title: 'Rekomendasi kuliner malam otentik sekitar Gasibu', author: 'Sisca_Melati', replies: 12, votes: 45, category: 'Kuliner' },
    { id: 'th-3', title: 'Keluhan tumpukan sampah liar di trotoar Ciroyom', author: 'Ujang_Preman', replies: 56, votes: 210, category: 'Layanan Publik' }
  ]);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadCat, setNewThreadCat] = useState('Umum');

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThreadTitle.trim()) return;
    const newTh = {
      id: `th-${Date.now()}`,
      title: newThreadTitle,
      author: user?.fullName || 'Warga_Jabar',
      replies: 0,
      votes: 1,
      category: newThreadCat
    };
    setThreads([newTh, ...threads]);
    setNewThreadTitle('');
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200/80 dark:border-white/10 pb-4 gap-3">
        <div>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> INFOBOS COMMUNITY HUB
          </span>
          <h2 className="text-2xl font-black text-[#002B5B] dark:text-[#38bdf8] tracking-tight mt-1">Portal Forum &amp; Suara Warga</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Saluran komunikasi, interaksi antar elemen warga Jabar, diskusi topik pembangunan, dan sharing agenda lokal.</p>
        </div>
        <span className="text-xs bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-500/20 px-3.5 py-1.5 rounded-full font-mono font-bold uppercase tracking-wider">
          CIVIC COMMUNITY ACTIVE
        </span>
      </div>

      <div className="flex gap-2 border-b border-slate-200 dark:border-white/10 pb-2 overflow-x-auto scrollbar-none text-xs font-semibold">
        {[
          { id: 'forum', label: 'Forum Diskusi', icon: MessageSquare },
          { id: 'groups', label: 'Grup Warga', icon: Users },
          { id: 'events', label: 'Agenda & Event', icon: Calendar },
          { id: 'discussion', label: 'Suara Parlemen', icon: Compass },
          { id: 'live_chat', label: 'Live Chat', icon: MessageCircle },
          { id: 'leaderboard', label: 'Papan XP', icon: Award },
          { id: 'achievements', label: 'Lencana', icon: Award }
        ].map(t => {
          const isActive = activeTab === t.id;
          return (
            <button 
              key={t.id} 
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap capitalize transition-all duration-200 relative cursor-pointer ${
                isActive 
                  ? 'bg-indigo-600 text-white font-bold shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/50'
              }`}
            >
              <t.icon className="h-4 w-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      <div className="bg-white dark:bg-[#001f42] border border-slate-200/80 dark:border-white/10 rounded-2xl p-6 min-h-[420px] shadow-sm relative text-slate-900 dark:text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* TAB: FORUM */}
            {activeTab === 'forum' && (
              <div className="space-y-5 text-xs">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Create Thread Form */}
                  <form onSubmit={handleCreateThread} className="lg:col-span-4 border border-slate-200 dark:border-white/10 rounded-2xl p-5 bg-slate-50/50 dark:bg-[#000a18]/40 space-y-3.5">
                    <h3 className="font-bold text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono flex items-center gap-1.5 pb-2 border-b dark:border-white/10">
                      <Plus className="h-4 w-4 text-indigo-500" /> Tulis Utas Diskusi Baru
                    </h3>
                    <div className="space-y-1 text-left">
                      <label className="font-bold text-slate-700 dark:text-slate-300">Topik Diskusi</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Masalah penataan taman Gasibu..." 
                        value={newThreadTitle}
                        onChange={(e) => setNewThreadTitle(e.target.value)}
                        className="w-full bg-white dark:bg-[#001f42] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl px-3 py-2 focus:outline-none"
                        required
                      />
                    </div>
                    <div className="space-y-1 text-left">
                      <label className="font-bold text-slate-700 dark:text-slate-300">Kategori Topik</label>
                      <select 
                        value={newThreadCat}
                        onChange={(e) => setNewThreadCat(e.target.value)}
                        className="w-full bg-white dark:bg-[#001f42] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl px-3 py-2 font-bold focus:outline-none"
                      >
                        <option value="Umum" className="dark:bg-[#001f42] dark:text-white">Umum</option>
                        <option value="Transportasi" className="dark:bg-[#001f42] dark:text-white">Transportasi</option>
                        <option value="Kuliner" className="dark:bg-[#001f42] dark:text-white">Kuliner</option>
                        <option value="Layanan Publik" className="dark:bg-[#001f42] dark:text-white">Layanan Publik</option>
                      </select>
                    </div>
                    <button type="submit" className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-sm cursor-pointer">
                      Terbitkan Utas &rarr;
                    </button>
                  </form>

                  {/* Thread List */}
                  <div className="lg:col-span-8 space-y-3">
                    <h3 className="font-bold text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono">Daftar Utas Hangat</h3>
                    <div className="space-y-3">
                      {threads.map(t => (
                        <div key={t.id} className="p-4 border border-slate-200 dark:border-white/10 hover:border-indigo-200 dark:hover:border-indigo-500/30 bg-white dark:bg-[#000a18]/60 rounded-2xl transition shadow-xs text-left flex justify-between items-center">
                          <div className="space-y-1.5">
                            <span className="text-[9px] font-extrabold text-indigo-600 dark:text-indigo-400 font-mono uppercase bg-indigo-50 dark:bg-indigo-950/40 border dark:border-indigo-500/20 px-2 py-0.5 rounded">
                              {t.category}
                            </span>
                            <span className="font-bold text-slate-800 dark:text-slate-200 text-sm block leading-tight hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer">{t.title}</span>
                            <div className="flex gap-4 text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                              <span>Oleh: <strong className="text-slate-600 dark:text-slate-400">{t.author}</strong></span>
                              <span>•</span>
                              <span>{t.replies} balasan</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-[#000a18]/80 px-3 py-1.5 border dark:border-white/10 rounded-xl font-mono text-[11px] font-bold text-slate-600 dark:text-slate-400">
                            <span>▲</span>
                            <span>{t.votes}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: GROUPS */}
            {activeTab === 'groups' && (
              <div className="space-y-4 text-xs text-left">
                <h3 className="font-bold text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono border-b dark:border-white/10 pb-2">Komunitas &amp; Paguyuban Warga</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: 'Kolektor Batik Klasik Jabar', members: 450, desc: 'Wadah sharing batik lawas dan edukasi motif klasik Parahyangan.' },
                    { name: 'Bike to Work Bandung', members: 1250, desc: 'Komunitas bersepeda commuter rute kantor perkotaan.' },
                    { name: 'Pecinta Sejarah Gedung Sate', members: 320, desc: 'Diskusi mendalam arsitektur visual heritage peninggalan kolonial.' }
                  ].map((g, i) => (
                    <div key={i} className="p-4 border border-slate-200 dark:border-white/10 rounded-2xl bg-slate-50/40 dark:bg-[#000a18]/60 hover:bg-white dark:hover:bg-[#000a18]/90 transition flex flex-col justify-between h-40">
                      <div className="space-y-1">
                        <span className="font-bold text-slate-800 dark:text-slate-200 text-xs block">{g.name}</span>
                        <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">{g.desc}</p>
                      </div>
                      <div className="flex justify-between items-center border-t dark:border-white/5 pt-2 mt-2 text-[10px] text-slate-400 dark:text-slate-500 font-mono font-bold">
                        <span>{g.members} Anggota</span>
                        <button className="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">Gabung Grup</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: EVENTS */}
            {activeTab === 'events' && (
              <div className="space-y-4 text-xs">
                <h3 className="font-bold text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono border-b dark:border-white/10 pb-2">Agenda Kegiatan Komunitas</h3>
                <div className="p-4 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50/50 dark:bg-[#000a18]/60 flex justify-between items-center">
                  <div className="space-y-1 text-left">
                    <span className="text-[10px] bg-indigo-100 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 border dark:border-indigo-500/20 font-mono px-2 py-0.5 rounded font-bold uppercase">MINGGU, 5 JULI 2026</span>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Kopdar Akbar &amp; Pameran UMKM Mandiri Jawa Barat</h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">Lokasi: Lapangan Parkir Barat Gedung Sate</p>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg cursor-pointer">Daftar Agenda &rarr;</button>
                </div>
              </div>
            )}

            {/* TAB: DISCUSSION */}
            {activeTab === 'discussion' && (
              <div className="space-y-4 text-xs text-left">
                <h3 className="font-bold text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono border-b dark:border-white/10 pb-2">Forum Konsultasi Kebijakan Publik</h3>
                <p className="text-slate-500 dark:text-slate-400">Saluran resmi warga untuk menyampaikan tanggapan terhadap rancangan perda/regulasi daerah Jabar.</p>
                <div className="p-4 bg-amber-50/20 dark:bg-amber-950/10 border border-amber-100 dark:border-amber-900/30 rounded-2xl text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong className="text-slate-800 dark:text-slate-200">Uji Regulasi Aktif:</strong> Konsultasi publik draf kenaikan retribusi pariwisata daerah. Berikan argumen rasional Anda agar diaudit tim analisis.
                </div>
              </div>
            )}

            {/* TAB: LIVE CHAT */}
            {activeTab === 'live_chat' && (
              <div className="space-y-4 text-xs">
                <h3 className="font-bold text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono border-b dark:border-white/10 pb-2">Kanal Percakapan Real-Time</h3>
                <div className="border border-slate-200 dark:border-white/10 rounded-2xl h-64 flex flex-col justify-between bg-slate-50/20 dark:bg-[#000a18]/40">
                  <div className="p-4 space-y-3 overflow-y-auto flex-1 text-left">
                    <div className="space-y-1">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono">Asep_Hidayat:</span>
                      <p className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 inline-block px-3 py-1.5 rounded-xl text-xs max-w-xs leading-normal">Ada yang tahu info rute jalan sehat minggu depan?</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <span className="font-bold text-slate-500 dark:text-slate-400 font-mono">Ujang_Preman:</span>
                      <p className="bg-indigo-600 text-white inline-block px-3 py-1.5 rounded-xl text-xs max-w-xs leading-normal">Start dari Gasibu, muter ke Diponegoro terus balik lagi mas.</p>
                    </div>
                  </div>
                  <div className="p-3 border-t dark:border-white/10 bg-white dark:bg-[#001f42] rounded-b-2xl flex gap-2">
                    <input type="text" placeholder="Ketik pesan komunitas di sini..." className="flex-1 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl focus:outline-none" />
                    <button className="px-3.5 bg-indigo-600 text-white rounded-xl cursor-pointer"><Send className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: LEADERBOARD */}
            {activeTab === 'leaderboard' && (
              <div className="space-y-4 text-xs">
                <h3 className="font-bold text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono border-b dark:border-white/10 pb-2">Papan Peringkat Kontributor Warga</h3>
                <div className="border border-slate-150 dark:border-white/10 rounded-2xl bg-white dark:bg-[#000a18]/60 divide-y dark:divide-white/10">
                  {[
                    { rank: 1, name: 'Sisca_Melati', points: '12,500 XP', badge: 'Wartawan Warga Utama' },
                    { rank: 2, name: 'Asep_Hidayat', points: '9,840 XP', badge: 'Analis Kebijakan Amatir' },
                    { rank: 3, name: 'Ujang_Preman', points: '8,120 XP', badge: 'Penggerak Aspirasi Daerah' }
                  ].map((x, i) => (
                    <div key={i} className="px-5 py-3.5 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-black text-slate-400 dark:text-slate-500 w-4">{x.rank}</span>
                        <div className="text-left">
                          <span className="font-bold text-slate-800 dark:text-slate-200 block">{x.name}</span>
                          <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">{x.badge}</span>
                        </div>
                      </div>
                      <span className="font-mono font-black text-[#002B5B] dark:text-indigo-400">{x.points}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: ACHIEVEMENTS */}
            {activeTab === 'achievements' && (
              <div className="space-y-4 text-xs">
                <h3 className="font-bold text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono border-b dark:border-white/10 pb-2">Lencana Penghargaan &amp; Achievements</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                  {[
                    { title: 'Lencana Pengawal Fakta', desc: 'Membantu memverifikasi rujukan data berita daerah.', color: 'border-indigo-100 dark:border-indigo-800/20 bg-indigo-50/20 dark:bg-indigo-950/20 text-indigo-900 dark:text-indigo-200' },
                    { title: 'Saksi Mata Lapangan', desc: 'Mengupload foto / laporan breaking news terverifikasi.', color: 'border-emerald-100 dark:border-emerald-800/20 bg-emerald-50/20 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200' },
                    { title: 'Civic Pro', desc: 'Melakukan voting draf kebijakan di predictor daerah.', color: 'border-purple-100 dark:border-purple-800/20 bg-purple-50/20 dark:bg-purple-950/20 text-purple-900 dark:text-purple-200' }
                  ].map((item, index) => (
                    <div key={index} className={`p-4 border rounded-2xl ${item.color} space-y-1.5`}>
                      <span className="font-bold text-xs flex items-center gap-1.5">
                        <Award className="h-4 w-4 shrink-0" /> {item.title}
                      </span>
                      <p className="text-[11px] opacity-80 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ==========================================
// 3. CUSTOMER SUPPORT PORTAL
// ==========================================
export function CustomerSupportPortal({ user }: PortalProps) {
  const [activeTab, setActiveTab] = useState<'tickets' | 'live_chat' | 'knowledge_base' | 'faq' | 'escalation' | 'customers'>('tickets');
  
  // Tickets State
  const [tickets, setTickets] = useState([
    { id: 'tkt-1234', subject: 'Error loading Geo Intelligence Map', creator: 'Andi_Kusuma', priority: 'HIGH', status: 'Terbuka' },
    { id: 'tkt-1233', subject: 'Inquiry regarding advertiser pricing packages', creator: 'Budi_Mandiri', priority: 'MEDIUM', status: 'Selesai' },
    { id: 'tkt-1232', subject: 'Account verification request taking too long', creator: 'Dina_Sunda', priority: 'LOW', status: 'Terbuka' }
  ]);
  const [newSubject, setNewSubject] = useState('');
  const [newPriority, setNewPriority] = useState('MEDIUM');

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim()) return;
    const newTkt = {
      id: `tkt-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: newSubject,
      creator: 'Admin_Staff',
      priority: newPriority,
      status: 'Terbuka'
    };
    setTickets([newTkt, ...tickets]);
    setNewSubject('');
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200/80 dark:border-white/10 pb-4 gap-3">
        <div>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono flex items-center gap-1">
            <HelpCircle className="h-3.5 w-3.5" /> INFOBOS CUSTOMER SUPPORT
          </span>
          <h2 className="text-2xl font-black text-[#002B5B] dark:text-[#38bdf8] tracking-tight mt-1">Portal Layanan &amp; Pengaduan Pelanggan</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Kelola tiket troubleshooting teknis, panduan database media siber, dan interaksi eskalasi jurnalis.</p>
        </div>
        <span className="text-xs bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-100 dark:border-amber-500/20 px-3.5 py-1.5 rounded-full font-mono font-bold uppercase tracking-wider">
          SUPPORT DESK VERIFIED
        </span>
      </div>

      <div className="flex gap-2 border-b border-slate-200 dark:border-white/10 pb-2 overflow-x-auto scrollbar-none text-xs font-semibold">
        {[
          { id: 'tickets', label: 'Tiket Masuk', icon: FileText },
          { id: 'live_chat', label: 'Live Chat', icon: MessageSquare },
          { id: 'knowledge_base', label: 'Basis Pengetahuan', icon: BookOpen },
          { id: 'faq', label: 'Kelola FAQ', icon: HelpCircle },
          { id: 'escalation', label: 'Eskalasi Senior', icon: ShieldAlert },
          { id: 'customers', label: 'Lookup Akun', icon: Users }
        ].map(t => {
          const isActive = activeTab === t.id;
          return (
            <button 
              key={t.id} 
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap capitalize transition-all duration-200 relative cursor-pointer ${
                isActive 
                  ? 'bg-amber-600 text-white font-bold shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/50'
              }`}
            >
              <t.icon className="h-4 w-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      <div className="bg-white dark:bg-[#001f42] border border-slate-200/80 dark:border-white/10 rounded-2xl p-6 min-h-[420px] shadow-sm relative text-slate-900 dark:text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* TAB: TICKETS */}
            {activeTab === 'tickets' && (
              <div className="space-y-5 text-xs">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Create Ticket Form */}
                  <form onSubmit={handleCreateTicket} className="lg:col-span-4 border border-slate-200 dark:border-white/10 rounded-2xl p-5 bg-slate-50/50 dark:bg-[#000a18]/40 space-y-3.5">
                    <h3 className="font-bold text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono flex items-center gap-1.5 pb-2 border-b dark:border-white/10">
                      <Plus className="h-4 w-4 text-amber-500" /> Buka Tiket Manual
                    </h3>
                    <div className="space-y-1 text-left">
                      <label className="font-bold text-slate-700 dark:text-slate-300">Subjek Kendala</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Masalah pembayaran premium..." 
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                        className="w-full bg-white dark:bg-[#001f42] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl px-3 py-2 focus:outline-none"
                        required
                      />
                    </div>
                    <div className="space-y-1 text-left">
                      <label className="font-bold text-slate-700 dark:text-slate-300">Tingkat Prioritas</label>
                      <select 
                        value={newPriority}
                        onChange={(e) => setNewPriority(e.target.value)}
                        className="w-full bg-white dark:bg-[#001f42] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl px-3 py-2 font-bold focus:outline-none"
                      >
                        <option value="LOW" className="dark:bg-[#001f42] dark:text-white">LOW</option>
                        <option value="MEDIUM" className="dark:bg-[#001f42] dark:text-white">MEDIUM</option>
                        <option value="HIGH" className="dark:bg-[#001f42] dark:text-white">HIGH</option>
                      </select>
                    </div>
                    <button type="submit" className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-sm cursor-pointer">
                      Buat Tiket Layanan &rarr;
                    </button>
                  </form>
 
                  {/* Tickets List */}
                  <div className="lg:col-span-8 space-y-3">
                    <h3 className="font-bold text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono">Daftar Pengaduan Warga</h3>
                    <div className="space-y-3">
                      {tickets.map(t => (
                        <div key={t.id} className="p-4 border border-slate-200 dark:border-white/10 hover:border-amber-200 dark:hover:border-amber-500/30 bg-white dark:bg-[#000a18]/60 rounded-2xl transition shadow-xs text-left flex justify-between items-center">
                          <div className="space-y-1.5">
                            <span className={`text-[9px] font-extrabold font-mono uppercase px-2 py-0.5 rounded border ${
                              t.priority === 'HIGH' 
                                ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-100 dark:border-rose-500/20' 
                                : 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-100 dark:border-amber-500/20'
                            }`}>
                              {t.priority} PRIORITY
                            </span>
                            <span className="font-bold text-slate-800 dark:text-slate-200 text-sm block leading-tight">{t.subject}</span>
                            <div className="flex gap-4 text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                              <span>Pelapor: <strong className="text-slate-600 dark:text-slate-400">{t.creator}</strong></span>
                              <span>•</span>
                              <span>ID: {t.id}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <select 
                              value={t.status}
                              onChange={(e) => {
                                setTickets(tickets.map(x => x.id === t.id ? { ...x, status: e.target.value } : x));
                              }}
                              className={`text-[9px] font-mono font-bold bg-white dark:bg-[#001f42] border border-slate-200 dark:border-white/10 px-2 py-0.5 rounded cursor-pointer focus:outline-none ${
                                t.status === 'Selesai' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                              }`}
                            >
                              <option value="Terbuka" className="dark:bg-[#001f42] dark:text-white">Terbuka</option>
                              <option value="Selesai" className="dark:bg-[#001f42] dark:text-white">Selesai</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: LIVE CHAT */}
            {activeTab === 'live_chat' && (
              <div className="space-y-4 text-xs">
                <h3 className="font-bold text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono border-b dark:border-white/10 pb-2">Konsol Layanan Chat Langsung</h3>
                <div className="border border-slate-200 dark:border-white/10 rounded-2xl h-64 flex flex-col justify-between bg-slate-50/10 dark:bg-[#000a18]/40">
                  <div className="p-4 space-y-3 overflow-y-auto flex-1 text-left">
                    <p className="text-slate-400 dark:text-slate-500 text-center font-mono text-[10px]">Percakapan tersambung dengan: Andi_Kusuma</p>
                    <div className="space-y-1">
                      <span className="font-bold text-amber-600 dark:text-amber-400 font-mono">Andi_Kusuma:</span>
                      <p className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 inline-block px-3 py-1.5 rounded-xl text-xs max-w-xs leading-normal">Peta geospasial CCTV saya tidak menampilkan feed livenya.</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <span className="font-bold text-slate-500 dark:text-slate-400 font-mono">Support Agent:</span>
                      <p className="bg-amber-600 text-white inline-block px-3 py-1.5 rounded-xl text-xs max-w-xs leading-normal">Silakan refresh cache browser Anda atau login ulang untuk mevalidasi token oAuth.</p>
                    </div>
                  </div>
                  <div className="p-3 border-t dark:border-white/10 bg-white dark:bg-[#001f42] rounded-b-2xl flex gap-2">
                    <input type="text" placeholder="Balas pelanggan..." className="flex-1 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl focus:outline-none" />
                    <button className="px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold cursor-pointer">Kirim</button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: KNOWLEDGE BASE */}
            {activeTab === 'knowledge_base' && (
              <div className="space-y-4 text-xs text-left">
                <h3 className="font-bold text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono border-b dark:border-white/10 pb-2">Dokumentasi &amp; Basis Pengetahuan Support</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50/30 dark:bg-[#000a18]/40 hover:bg-white dark:hover:bg-[#000a18]/80 transition space-y-1.5">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">SOP Penanganan Kegagalan Ingestion RSS</h4>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Panduan validasi skema XML dan parsing limit rate API Humas Jabar.</p>
                  </div>
                  <div className="p-4 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50/30 dark:bg-[#000a18]/40 hover:bg-white dark:hover:bg-[#000a18]/80 transition space-y-1.5">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">Reset Token Autentikasi Pengguna</h4>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Alur verifikasi manual via administrasi database SQLite.</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: FAQ */}
            {activeTab === 'faq' && (
              <div className="space-y-4 text-xs text-left">
                <h3 className="font-bold text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono border-b dark:border-white/10 pb-2">Manajemen Kategori &amp; Daftar FAQ</h3>
                <div className="p-4 border rounded-xl border-dashed border-slate-300 dark:border-white/20 text-center text-slate-400 dark:text-slate-500">
                  <span>Daftar FAQ Publik sinkron otomatis dengan Database FAQ utama.</span>
                </div>
              </div>
            )}

            {/* TAB: ESCALATION */}
            {activeTab === 'escalation' && (
              <div className="space-y-4 text-xs">
                <h3 className="font-bold text-rose-600 dark:text-rose-400 uppercase font-mono border-b dark:border-white/10 pb-2 flex items-center gap-1.5">
                  <ShieldAlert className="h-4 w-4 animate-pulse" /> Eskalasi Khusus Tim Developer
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-left">Gunakan panel ini jika kendala menyangkut kegagalan database relasional SQLite, server crash, atau fraud payment gateway.</p>
                <div className="p-4 border border-rose-100 dark:border-rose-950/40 bg-rose-50/35 dark:bg-rose-950/20 rounded-xl text-left font-mono space-y-1.5 text-rose-900 dark:text-rose-200">
                  <span>Eskalasi Terakhir: <strong className="text-slate-800 dark:text-slate-100">SQL Error (Lock table on write)</strong></span>
                  <p className="text-[10px] text-rose-700 dark:text-rose-400">Status: Selesai - Diatasi oleh DBA Utama</p>
                </div>
              </div>
            )}

            {/* TAB: CUSTOMERS */}
            {activeTab === 'customers' && (
              <div className="space-y-4 text-xs">
                <h3 className="font-bold text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono border-b dark:border-white/10 pb-2">Sistem Lookup Akun Anggota</h3>
                <div className="flex gap-2 text-left">
                  <input type="text" placeholder="Ketik email atau username pelanggan..." className="flex-1 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:border-amber-500 focus:dark:border-amber-400" />
                  <button className="px-4 bg-[#002B5B] dark:bg-indigo-600 text-white rounded-xl font-bold font-mono cursor-pointer hover:opacity-95">CARI DATA</button>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ==========================================
// 4. MODERATOR PORTAL
// ==========================================
export function ModeratorPortal({ user }: PortalProps) {
  const [activeTab, setActiveTab] = useState<'reports' | 'comments' | 'forum' | 'spam' | 'review' | 'ban' | 'audit'>('reports');
  
  // Flagged Reports State
  const [reports, setReports] = useState([
    { id: 'rep-402', item: 'Komentar mengandung sara di artikel koridor ekonomi', reporter: 'Wawan_Akur', reason: 'Ujaran Kebencian', status: 'Ditinjau' },
    { id: 'rep-401', item: 'Spam link judi online di forum transportasi', reporter: 'Admin_AntiJudi', reason: 'Spam / Iklan Ilegal', status: 'Ditinjau' }
  ]);

  const handleActionReport = (id: string, action: 'keep' | 'delete') => {
    setReports(reports.map(r => r.id === id ? { ...r, status: action === 'keep' ? 'Disetujui (Keep)' : 'Dihapus (Delete)' } : r));
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200/80 dark:border-white/10 pb-4 gap-3">
        <div>
          <span className="text-xs font-bold text-rose-600 dark:text-rose-400 font-mono flex items-center gap-1">
            <Shield className="h-3.5 w-3.5" /> INFOBOS MODERATION ENGINE
          </span>
          <h2 className="text-2xl font-black text-[#002B5B] dark:text-[#38bdf8] tracking-tight mt-1">Portal Moderasi Konten &amp; Anti-Spam</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Pantau laporan komentar negatif warga, blokir postingan spam robot, dan suspensi pengguna yang melanggar hukum siber.</p>
        </div>
        <span className="text-xs bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-100 dark:border-rose-500/20 px-3.5 py-1.5 rounded-full font-mono font-bold uppercase tracking-wider">
          MODERATOR ACCESS VERIFIED
        </span>
      </div>

      <div className="flex gap-2 border-b border-slate-200 dark:border-white/10 pb-2 overflow-x-auto scrollbar-none text-xs font-semibold">
        {[
          { id: 'reports', label: 'Konten Dilaporkan', icon: AlertCircle },
          { id: 'comments', label: 'Queue Komentar', icon: MessageSquare },
          { id: 'forum', label: 'Moderasi Forum', icon: Users },
          { id: 'spam', label: 'Filter AI Spam', icon: ShieldAlert },
          { id: 'review', label: 'Verifikasi Gambar', icon: BookOpen },
          { id: 'ban', label: 'Suspensi Pengguna', icon: UserX },
          { id: 'audit', label: 'Audit Trail', icon: FileText }
        ].map(t => {
          const isActive = activeTab === t.id;
          return (
            <button 
              key={t.id} 
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap capitalize transition-all duration-200 relative cursor-pointer ${
                isActive 
                  ? 'bg-rose-600 text-white font-bold shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/50'
              }`}
            >
              <t.icon className="h-4 w-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      <div className="bg-white dark:bg-[#001f42] border border-slate-200/80 dark:border-white/10 rounded-2xl p-6 min-h-[420px] shadow-sm relative text-slate-900 dark:text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* TAB: REPORTS */}
            {activeTab === 'reports' && (
              <div className="space-y-4 text-xs">
                <h3 className="font-bold text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono border-b dark:border-white/10 pb-2">Antrean Laporan Pengaduan Konten</h3>
                <div className="space-y-3">
                  {reports.map(r => (
                    <div key={r.id} className="p-4 border border-rose-100 dark:border-rose-950/40 bg-rose-50/10 dark:bg-rose-950/20 rounded-2xl flex justify-between items-center text-left">
                      <div className="space-y-1.5">
                        <span className="text-[10px] bg-rose-100 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 font-mono font-bold px-2 py-0.5 rounded uppercase border dark:border-rose-500/20">{r.reason}</span>
                        <p className="font-bold text-slate-800 dark:text-slate-200 text-xs">{r.item}</p>
                        <div className="flex gap-3 text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                          <span>Dilaporkan oleh: {r.reporter}</span>
                          <span>•</span>
                          <span>ID Laporan: {r.id}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {r.status === 'Ditinjau' ? (
                          <>
                            <button 
                              onClick={() => handleActionReport(r.id, 'keep')}
                              className="px-3 py-1.5 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 cursor-pointer"
                            >
                              Biarkan (Keep)
                            </button>
                            <button 
                              onClick={() => handleActionReport(r.id, 'delete')}
                              className="px-3 py-1.5 bg-rose-600 text-white font-bold rounded-lg hover:bg-rose-700 cursor-pointer"
                            >
                              Hapus (Delete)
                            </button>
                          </>
                        ) : (
                          <span className="text-slate-500 dark:text-slate-400 font-mono font-bold">{r.status}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: COMMENTS */}
            {activeTab === 'comments' && (
              <div className="space-y-4 text-xs text-left">
                <h3 className="font-bold text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono border-b dark:border-white/10 pb-2">Antrean Persetujuan Komentar Baru</h3>
                <p className="text-slate-500 dark:text-slate-400">Seluruh komentar warga harus melalui kurasi manual di sini sebelum ditampilkan ke artikel publik.</p>
                <div className="p-4 border rounded-xl bg-slate-50 dark:bg-[#000a18]/40 border-dashed border-slate-350 dark:border-white/20 text-center text-slate-400 dark:text-slate-500 font-medium">
                  Belum ada komentar baru yang mengantre di sistem antrean jurnalisme.
                </div>
              </div>
            )}

            {/* TAB: FORUM */}
            {activeTab === 'forum' && (
              <div className="space-y-4 text-xs text-left">
                <h3 className="font-bold text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono border-b dark:border-white/10 pb-2">Moderasi Utas Forum &amp; Thread</h3>
                <p className="text-slate-500 dark:text-slate-400">Kunci, sematkan (pin), atau pindahkan utas forum warga yang tidak sesuai koridor etika.</p>
                <div className="p-4 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-[#000a18]/40 font-mono">
                  Sistem Autodelete Spam Thread: <strong className="text-emerald-600 dark:text-emerald-400">Aktif (Skor AI &gt; 85%)</strong>
                </div>
              </div>
            )}

            {/* TAB: SPAM */}
            {activeTab === 'spam' && (
              <div className="space-y-4 text-xs text-left">
                <h3 className="font-bold text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono border-b dark:border-white/10 pb-2">Filter Proteksi AI Spam &amp; Captcha</h3>
                <p className="text-slate-500 dark:text-slate-400">Setting sensitivitas filter bahasa kasar dan kata kunci sensitif pemilu/SARA daerah.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-slate-200 dark:border-white/10 rounded-2xl bg-slate-50/40 dark:bg-[#000a18]/40">
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-xs block">Sensitivitas Deteksi Filter</span>
                    <select className="mt-2 w-full bg-white dark:bg-[#001f42] border border-slate-200 dark:border-white/10 rounded-xl p-2 font-bold text-rose-700 dark:text-rose-400 focus:outline-none">
                      <option className="dark:bg-[#001f42] dark:text-white">Tinggi (Sangat Protektif)</option>
                      <option className="dark:bg-[#001f42] dark:text-white">Sedang (Direkomendasikan)</option>
                      <option className="dark:bg-[#001f42] dark:text-white">Rendah (Longgar)</option>
                    </select>
                  </div>
                  <div className="p-4 border border-slate-200 dark:border-white/10 rounded-2xl bg-slate-50/40 dark:bg-[#000a18]/40 font-mono">
                    <span className="text-slate-800 dark:text-slate-200">Blacklist Kata Kunci:</span>
                    <p className="text-slate-400 dark:text-slate-500 text-[10px] mt-1">casino, slot, betting, penipuan, boikot</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: REVIEW */}
            {activeTab === 'review' && (
              <div className="space-y-4 text-xs text-left">
                <h3 className="font-bold text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono border-b dark:border-white/10 pb-2">Uji Kelayakan Gambar &amp; Media Lampiran</h3>
                <p className="text-slate-500 dark:text-slate-400">Mencegah penayangan gambar berkonten vulgar, grafis, atau plagiat hak cipta Dinas Jabar.</p>
                <div className="p-4 border border-dashed border-slate-350 dark:border-white/20 text-center text-slate-400 dark:text-slate-500">
                  Semua gambar penugasan reporter terverifikasi lolos sensor AI.
                </div>
              </div>
            )}

            {/* TAB: BAN */}
            {activeTab === 'ban' && (
              <div className="space-y-4 text-xs">
                <h3 className="font-bold text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono border-b dark:border-white/10 pb-2">Suspensi Akun &amp; IP Blacklist</h3>
                <div className="flex gap-2 text-left">
                  <input type="text" placeholder="Masukkan username atau alamat IP..." className="flex-grow px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl focus:outline-none" />
                  <button className="px-4 bg-rose-600 text-white rounded-xl font-bold cursor-pointer hover:bg-rose-700">SUSPENSI DATA</button>
                </div>
              </div>
            )}

            {/* TAB: AUDIT */}
            {activeTab === 'audit' && (
              <div className="space-y-4 text-xs">
                <h3 className="font-bold text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono border-b dark:border-white/10 pb-2">Audit Trail Log Moderator</h3>
                <div className="p-4 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-[#000a18]/40 text-left font-mono space-y-1.5 text-slate-500 dark:text-slate-400">
                  <p>[2026-07-02 09:12] Moderator_02 menghapus komentar di artikel MRT.</p>
                  <p>[2026-07-02 08:45] Moderator_01 menyetujui rilis pers humas Humas_Jabar.</p>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
