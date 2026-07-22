import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, TrendingUp, RefreshCw, Check, X, Shield, Info, Plus, Eye, 
  Layout, Download, Share2, Copy, FileText, Users, PlusCircle, Filter, 
  BarChart2, DollarSign, Award, Ticket, Star, GraduationCap, Code, 
  Cpu, MessageSquare, Mail, Settings, CheckCircle2, ShieldCheck, Target, 
  Zap, ArrowUpRight, Percent, Calendar, MapPin, Phone, Briefcase, Search, 
  MessageCircle, Map
} from 'lucide-react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, BarChart, Bar, Cell, PieChart, Pie 
} from 'recharts';

interface PartnerOSProps {
  user: { id: string; role: string; fullName: string; email: string } | null;
}

// 1. PARTNER TIERS
const PARTNER_TIERS = [
  { level: 1, name: 'Explorer', target: 'Rp 0', comm: '5%', desc: 'Baru bergabung, masa uji coba.' },
  { level: 2, name: 'Affiliate', target: 'Rp 10M', comm: '7%', desc: 'Membagikan link referral berita & masterclass.' },
  { level: 3, name: 'Sales Partner', target: 'Rp 50M', comm: '10%', desc: 'Menjual space iklan banner & sponsorship.' },
  { level: 4, name: 'Advertising Partner', target: 'Rp 100M', comm: '12%', desc: 'Mencari pengiklan skala regional Jawa Barat.' },
  { level: 5, name: 'Media Partner', target: 'Rp 250M', comm: '15%', desc: 'Mengajak media lokal bersinergi dalam kualifikasi.' },
  { level: 6, name: 'Corporate Partner', target: 'Rp 500M', comm: '18%', desc: 'Menutup kesepakatan korporat premium.' },
  { level: 7, name: 'Strategic Partner', target: 'Rp 1Miliar+', comm: '20%', desc: 'Kemitraan strategis dengan institusi / BUMN.' }
];

// 2. APA SAJA YANG BISA DIJUAL (COMMISSION CALCULATOR)
const SELLABLE_PRODUCTS = [
  { id: 'prod-1', name: 'Programmatic Banner Ads', category: 'Advertising', price: 15000000, commRate: 0.10, desc: 'Slot iklan banner utama responsive di homepage.' },
  { id: 'prod-2', name: 'Premium Corporate Membership', category: 'Membership', price: 25000000, commRate: 0.12, desc: 'Akses multi-user riset intelijen bagi 10 analis.' },
  { id: 'prod-3', name: 'Company Profile Premium Page', category: 'Profile', price: 10000000, commRate: 0.15, desc: 'Pemetaan merek komparatif & sentiment analysis.' },
  { id: 'prod-4', name: 'Spatio-News GIS API Access', category: 'API', price: 50000000, commRate: 0.15, desc: 'Akses data spasial berita geospasial real-time.' },
  { id: 'prod-5', name: 'AI Services integration', category: 'AI Services', price: 40000000, commRate: 0.18, desc: 'Instalasi model NLP khusus rilis pers korporasi.' }
];

export default function PartnerOS({ user }: PartnerOSProps) {
  // Mobile Simulator mode
  const [isMobileSim, setIsMobileSim] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobileMode = isMobileSim || isMobileScreen;

  const [activeTab, setActiveTab] = useState<'overview' | 'crm' | 'finance' | 'marketing' | 'learning' | 'admin'>('overview');
  
  // Simulated User Account State
  const [partnerPoints, setPartnerPoints] = useState(1250);
  const [partnerXP, setPartnerXP] = useState(65); // percentage to next level
  const [partnerTier, setPartnerTier] = useState('Sales Partner');
  const [payoutRequested, setPayoutRequested] = useState(false);
  
  // Gamification states
  const [dailyClaimed, setDailyClaimed] = useState(false);
  const [unlockedBadges, setUnlockedBadges] = useState(['Top Affiliate', 'Fast Closing']);
  const [shopSuccess, setShopSuccess] = useState<string | null>(null);

  // CRM State
  const [leads, setLeads] = useState([
    { id: 'lead-1', company: 'PT Bank BJB', contact: 'Rahmat Hidayat', value: 45000000, stage: 'Negosiasi', region: 'Bandung', date: '2026-06-25', skill: 'Corporate Sales' },
    { id: 'lead-2', company: 'Telkom Regional III', contact: 'Siti Aminah', value: 75000000, stage: 'Proposal', region: 'Bandung', date: '2026-06-26', skill: 'API Reseller' },
    { id: 'lead-3', company: 'Pemkab Sumedang', contact: 'Dedi Setiadi', value: 30000000, stage: 'Deal', region: 'Sumedang', date: '2026-06-20', skill: 'Government Liaison' },
    { id: 'lead-4', company: 'Kopi Kenangan Jabar', contact: 'Indra Wijaya', value: 15000000, stage: 'Kontak', region: 'Garut', date: '2026-06-27', skill: 'Advertising' }
  ]);
  const [newCompany, setNewCompany] = useState('');
  const [newContact, setNewContact] = useState('');
  const [newValue, setNewValue] = useState(10000000);
  const [newStage, setNewStage] = useState('Prospek');
  const [newRegion, setNewRegion] = useState('Bandung');
  const [newSkill, setNewSkill] = useState('Advertising');
  const [crmSearch, setCrmSearch] = useState('');

  // Marketing states
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [cardName, setCardName] = useState(user?.fullName || 'Mitra INFOBOS');
  const [cardPhone, setCardPhone] = useState('+62 812-3456-7890');
  
  // AI Assistant states
  const [aiAction, setAiAction] = useState('proposal');
  const [aiProduct, setAiProduct] = useState('Programmatic Banner Ads');
  const [aiDetails, setAiDetails] = useState('Fokus pada target UMKM Jawa Barat yang ingin ekspansi digital.');
  const [aiResult, setAiResult] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  // Learning states
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [isCertified, setIsCertified] = useState(false);

  // Super Admin state variables
  const [superAdminTarget, setSuperAdminTarget] = useState(1500000000);
  const [payoutRequests, setPayoutRequests] = useState([
    { id: 'pay-101', partner: 'Budi Santoso', amount: 4500000, tax: 112500, type: 'PPh 21', status: 'Pending', date: '2026-06-26' },
    { id: 'pay-102', partner: 'Siti Rahma', amount: 15000000, tax: 300000, type: 'PPh 23', status: 'Approved', date: '2026-06-25' }
  ]);
  const [commissionRateModifier, setCommissionRateModifier] = useState(100); // 100% of default

  // Calculator state
  const [calcProduct, setCalcProduct] = useState('prod-1');
  const [calcQuantity, setCalcQuantity] = useState(1);

  // Functions
  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.trim()) return;
    const newL = {
      id: `lead-${Date.now()}`,
      company: newCompany,
      contact: newContact || 'Anonim',
      value: Number(newValue),
      stage: newStage,
      region: newRegion,
      date: new Date().toISOString().split('T')[0],
      skill: newSkill
    };
    setLeads(prev => [newL, ...prev]);
    setNewCompany('');
    setNewContact('');
    // Award 50 XP for logging a lead
    setPartnerPoints(p => p + 50);
    setPartnerXP(xp => Math.min(100, xp + 15));
  };

  const handleUpdateStage = (id: string, stage: string) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, stage } : l));
    if (stage === 'Deal') {
      setPartnerPoints(p => p + 300);
      setPartnerXP(xp => Math.min(100, xp + 25));
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleRunAI = async () => {
    setAiLoading(true);
    setAiResult('');
    
    try {
      const response = await fetch('/api/v1/partner/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: aiAction,
          product: aiProduct,
          details: aiDetails,
          partnerName: cardName,
          partnerTier: partnerTier
        })
      });
      const data = await response.json();
      if (data.success) {
        setAiResult(data.output);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      // Fallback generator if API key is not configured or fails
      setTimeout(() => {
        let text = '';
        if (aiAction === 'proposal') {
          text = `PROPOSAL PENAWARAN MITRA RESMI INFOBOS\n` +
                 `========================================\n` +
                 `Kepada Yth. Bagian Pemasaran / Humas Klien\n\n` +
                 `Kami selaku Mitra Resmi INFOBOS (${cardName}) ingin mengajukan penawaran eksklusif kerja sama media untuk produk: "${aiProduct}".\n\n` +
                 `INFOBOS merupakan portal berita Jawa Barat terdepan dengan 23 saluran terintegrasi, visualisasi spasial, dan analitik sentimen berbasis kecerdasan buatan.\n\n` +
                 `Detail Penawaran Khusus:\n` +
                 `- Fokus Kampanye: ${aiDetails}\n` +
                 `- Jaminan Imigrasi Iklan: Audit transparansi CTR real-time dari Sentinel OS.\n` +
                 `- Estimasi ROI: Peningkatan sentimen brand positif hingga 35% dalam waktu 30 hari.\n\n` +
                 `Kami siap menjadwalkan pertemuan virtual singkat untuk membahas implementasi strategi ini demi kemajuan promosi bisnis Anda.\n\n` +
                 `Hormat Kami,\n` +
                 `${cardName}\n` +
                 `Partner Hub & Corporate Engagement INFOBOS`;
        } else if (aiAction === 'email') {
          text = `Subject: Tindak Lanjut Kemitraan Media Terintegrasi INFOBOS\n\n` +
                 `Halo Rekan Humas,\n\n` +
                 `Semoga surel ini menjumpai Anda dalam keadaan baik. Saya ${cardName}, Corporate Partner resmi INFOBOS.\n\n` +
                 `Menindaklanjuti rencana penayangan materi kampanye "${aiProduct}", kami telah menyusun simulasi penempatan banner interaktif serta optimasi SEO regional agar tepat sasaran.\n\n` +
                 `Catatan khusus untuk brand Anda:\n` +
                 `- ${aiDetails}\n\n` +
                 `Apakah Anda memiliki waktu luang selama 10 menit di hari Kamis ini untuk mengonfirmasi detail rancangan draf proposal kami?\n\n` +
                 `Salam hangat,\n` +
                 `${cardName}\n` +
                 `Kemitraan RevenueOS INFOBOS`;
        } else {
          text = `PANDUAN STRATEGI PENJUALAN & ANALISIS PASAR\n` +
                 `========================================\n` +
                 `Kategori Produk: ${aiProduct}\n` +
                 `Segmentasi Pasar: Instansi Daerah, BUMN, & UMKM Unggulan Jawa Barat\n\n` +
                 `1. Titik Penjualan Utama (USP):\n` +
                 `   - Kampanye didukung oleh Sentinel OS, sistem telemetri iklan mandiri yang kebal terhadap ad-blocker umum.\n` +
                 `   - Geotargeting presisi: Iklan dapat diarahkan hanya kepada pembaca di region tertentu (misal: Sumedang saja, atau Bandung Ring 1).\n\n` +
                 `2. Pola Penanganan Keberatan (Objection Handling):\n` +
                 `   - Klien ragu tentang harga? Jelaskan model PPh 21/23 resmi dan diskon volume masterclass.\n\n` +
                 `3. Rekomendasi Langkah Kerja:\n` +
                 `   - Gunakan kit promosi brosur halaman 3.\n` +
                 `   - Kirim proposal draf yang disesuaikan via WhatsApp.`;
        }
        setAiResult(text);
      }, 800);
    } finally {
      setAiLoading(false);
    }
  };

  const handleDailyCheckIn = () => {
    if (dailyClaimed) return;
    setPartnerPoints(p => p + 150);
    setDailyClaimed(true);
    setShopSuccess("Hore! Anda memperoleh +150 Koin Harian!");
    setTimeout(() => setShopSuccess(null), 3000);
  };

  const handleBuyItem = (name: string, cost: number) => {
    if (partnerPoints < cost) {
      alert("Koin Anda tidak mencukupi untuk melakukan penukaran ini.");
      return;
    }
    setPartnerPoints(p => p - cost);
    setShopSuccess(`Berhasil menukarkan "${name}"! Kode voucer telah dikirim ke email Anda.`);
    setTimeout(() => setShopSuccess(null), 4000);
  };

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let score = 0;
    if (quizAnswers[1] === 'performance') score++;
    if (quizAnswers[2] === 'pph21_npwp') score++;
    if (quizAnswers[3] === 'marketing_kit') score++;
    
    setQuizScore(score);
    if (score === 3) {
      setIsCertified(true);
      setUnlockedBadges(b => [...b, 'Certified Partner']);
      setPartnerPoints(p => p + 500);
    }
  };

  // Calculations
  const selectedCalcProduct = SELLABLE_PRODUCTS.find(p => p.id === calcProduct);
  const calculatedTotal = selectedCalcProduct ? selectedCalcProduct.price * calcQuantity : 0;
  const calculatedComm = selectedCalcProduct ? calculatedTotal * selectedCalcProduct.commRate * (commissionRateModifier / 100) : 0;

  const currentRole = user?.role || 'guest';
  const isAdminOrOwner = currentRole === 'super_admin' || currentRole === 'owner';

  // Charts Mock Data
  const revenueTrendData = [
    { month: 'Jan', Pendapatan: 35000000, Komisi: 3500000 },
    { month: 'Feb', Pendapatan: 48000000, Komisi: 4800000 },
    { month: 'Mar', Pendapatan: 62000000, Komisi: 6200000 },
    { month: 'Apr', Pendapatan: 80000000, Komisi: 8800000 },
    { month: 'May', Pendapatan: 110000000, Komisi: 12100000 },
    { month: 'Jun', Pendapatan: 145000000, Komisi: 17400000 }
  ];

  const productShareData = [
    { name: 'Ad Banner', value: 45 },
    { name: 'API GIS', value: 25 },
    { name: 'Corp Membership', value: 15 },
    { name: 'AI Services', value: 15 }
  ];

  const COLORS = ['#002B5B', '#2B7A78', '#FFD700', '#FF5733'];

  // Inside Mobile Shell Wrapper
  const renderDashboardContent = () => (
    <div className="space-y-6 text-left">
      {/* 1. Header Card */}
      <div className="bg-gradient-to-r from-[#002B5B] to-[#001f42] text-white p-5 rounded-3xl shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD700]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#FFD700] text-slate-950 font-black flex items-center justify-center text-lg shadow-inner">
              {cardName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-extrabold text-sm tracking-tight">{cardName}</h3>
                <span className="text-[9px] bg-white/15 text-[#FFD700] border border-[#FFD700]/30 px-2 py-0.5 rounded font-mono font-black uppercase">
                  {partnerTier}
                </span>
              </div>
              <p className="text-[10px] text-slate-300 font-mono mt-0.5">{user?.email || 'partner@infobos.com'}</p>
            </div>
          </div>
          
          {/* XP & Level Indicator */}
          <div className="w-full md:w-48 space-y-1">
            <div className="flex justify-between items-center text-[10px] font-mono font-bold">
              <span className="text-[#FFD700]">XP Level 4</span>
              <span>{partnerXP}%</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden border border-white/5">
              <div className="bg-gradient-to-r from-[#FFD700] to-amber-500 h-full" style={{ width: `${partnerXP}%` }} />
            </div>
          </div>
        </div>

        {/* Level Badges */}
        <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-4 border-t border-white/10">
          <span className="text-[9px] text-slate-400 uppercase font-mono font-bold">Lencana Unlocked:</span>
          {unlockedBadges.map(b => (
            <span key={b} className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
              <Award className="h-2.5 w-2.5" /> {b}
            </span>
          ))}
          {isCertified && (
            <span className="text-[9px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
              <ShieldCheck className="h-2.5 w-2.5" /> Certified Partner
            </span>
          )}
        </div>
      </div>

      {/* 2. Top Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="p-4 border border-slate-200/80 dark:border-white/10 rounded-2xl bg-white dark:bg-[#001f42] space-y-1 shadow-xs">
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-extrabold uppercase font-mono tracking-wider">Komisi Berjalan (YTD)</span>
          <div className="text-xl font-black text-[#002B5B] dark:text-white">Rp 21.900.000</div>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium font-mono flex items-center gap-0.5">
            <TrendingUp className="h-3 w-3" /> +15.5% vs bulan lalu
          </span>
        </div>

        <div className="p-4 border border-slate-200/80 dark:border-white/10 rounded-2xl bg-white dark:bg-[#001f42] space-y-1 shadow-xs">
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-extrabold uppercase font-mono tracking-wider">Pipa Penjualan Aktif</span>
          <div className="text-xl font-black text-[#002B5B] dark:text-white">Rp 165.000.000</div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium font-mono">Total dari 4 prospek aktif</span>
        </div>

        <div className="p-4 border border-slate-200/80 dark:border-white/10 rounded-2xl bg-white dark:bg-[#001f42] space-y-1 shadow-xs">
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-extrabold uppercase font-mono tracking-wider">Koin Partner Anda</span>
          <div className="text-xl font-black text-[#002B5B] dark:text-white flex items-center gap-1">
            <Zap className="h-4 w-4 text-amber-500 fill-amber-500" />
            <span>{partnerPoints} Koin</span>
          </div>
          <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium font-mono">Bisa ditukar draf voucer/kit</span>
        </div>

        <div className="p-4 border border-slate-200/80 dark:border-white/10 rounded-2xl bg-white dark:bg-[#001f42] space-y-2 shadow-xs">
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-extrabold uppercase font-mono tracking-wider flex justify-between">
            <span className="dark:text-slate-400">Target Rp 50M (Bulan Ini)</span>
            <span className="dark:text-slate-300">44%</span>
          </span>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden border dark:border-white/5">
            <div className="bg-[#2B7A78] dark:bg-teal-500 h-full" style={{ width: '44%' }} />
          </div>
        </div>
      </div>

      {/* Tabs Specific Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.15 }}
          className="space-y-6"
        >
          {/* ==================================== */}
          {/* TAB: OVERVIEW */}
          {/* ==================================== */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Charts */}
              <div className="lg:col-span-8 space-y-6">
                <div className="border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 bg-white dark:bg-[#001f42] space-y-4">
                  <div className="flex justify-between items-center border-b pb-3 border-slate-100 dark:border-white/10">
                    <h4 className="font-bold text-xs text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono flex items-center gap-1.5">
                      <BarChart2 className="h-4 w-4 text-[#002B5B] dark:text-[#38bdf8]" /> Grafik Pertumbuhan Penjualan &amp; Komisi
                    </h4>
                  </div>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={revenueTrendData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" strokeOpacity={0.1} />
                        <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#001733', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }} />
                        <Legend wrapperStyle={{ fontSize: 10 }} />
                        <Line type="monotone" dataKey="Pendapatan" stroke="#002B5B" strokeWidth={3} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="Komisi" stroke="#FFD700" strokeWidth={2.5} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Sellable Products & Calculator */}
                <div className="border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 bg-white dark:bg-[#001f42] space-y-4">
                  <h4 className="font-bold text-xs text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4 text-[#002B5B] dark:text-[#38bdf8]" /> Simulator Royalti &amp; Tarif Produk
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Hitung simulasi perolehan komisi berdasarkan portofolio penjualan yang berhasil Anda closing.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 dark:bg-[#000a18]/60 p-4 rounded-xl text-xs">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 dark:text-slate-300">Pilih Produk</label>
                      <select 
                        value={calcProduct} 
                        onChange={(e) => setCalcProduct(e.target.value)}
                        className="w-full bg-white dark:bg-[#001f42] border border-slate-200 dark:border-white/10 rounded-lg p-2 focus:outline-none text-slate-900 dark:text-white"
                      >
                        {SELLABLE_PRODUCTS.map(p => (
                          <option key={p.id} value={p.id} className="dark:bg-[#001f42] dark:text-white">{p.name} ({p.category})</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 dark:text-slate-300">Jumlah Terjual (Volume)</label>
                      <input 
                        type="number" 
                        min="1" 
                        value={calcQuantity} 
                        onChange={(e) => setCalcQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full bg-white dark:bg-[#001f42] border border-slate-200 dark:border-white/10 rounded-lg p-2 focus:outline-none text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1 bg-white dark:bg-[#001f42]/40 border border-slate-200 dark:border-white/10 rounded-lg p-2 flex flex-col justify-center">
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">Estimasi Komisi ({selectedCalcProduct ? `${selectedCalcProduct.commRate*100}%` : '0%'}):</span>
                      <strong className="text-sm text-emerald-600 dark:text-emerald-400">Rp {calculatedComm.toLocaleString('id-ID')}</strong>
                      <span className="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5">Total Nilai Deal: Rp {calculatedTotal.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Gamification Daily Challenge & Leaderboard */}
              <div className="lg:col-span-4 space-y-6">
                {/* Daily Check-In Challenge */}
                <div className="border border-slate-200/80 dark:border-amber-500/20 rounded-2xl p-5 bg-gradient-to-br from-amber-50 to-orange-50/20 dark:from-amber-950/40 dark:to-amber-900/10 space-y-3.5 text-left">
                  <div className="flex justify-between items-center">
                    <h4 className="font-extrabold text-xs text-amber-800 dark:text-amber-400 uppercase font-mono flex items-center gap-1">
                      <Zap className="h-4 w-4 text-amber-500 fill-amber-500" /> Tantangan Harian Partner
                    </h4>
                    <span className="text-[9px] bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold px-2 py-0.5 rounded border dark:border-amber-500/20">Aktif</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    Klaim Koin Harian Anda dan selesaikan tantangan untuk membuka bonus royalti bulanan.
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] border-b pb-1.5 border-slate-200/60 dark:border-white/10 text-slate-600 dark:text-slate-300">
                      <span>• Login platform harian</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">Terpenuhi (+150 Koin)</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                      <span>• Daftarkan 1 lead prospek baru</span>
                      <span>0/1 (+50 XP)</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleDailyCheckIn}
                    disabled={dailyClaimed}
                    className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-mono font-extrabold rounded-xl text-xs transition disabled:bg-slate-200 disabled:text-slate-400 text-center disabled:dark:bg-slate-800 disabled:dark:text-slate-600"
                  >
                    {dailyClaimed ? '✓ KLAIM BERHASIL' : 'KLAIM +150 KOIN HARIAN'}
                  </button>
                  
                  {shopSuccess && (
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold text-center mt-1">{shopSuccess}</p>
                  )}
                </div>

                {/* Partner National Leaderboard */}
                <div className="border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 bg-white dark:bg-[#001f42] space-y-4">
                  <div className="flex justify-between items-center border-b pb-3 border-slate-100 dark:border-white/10">
                    <h4 className="font-bold text-xs text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono flex items-center gap-1.5">
                      <Award className="h-4 w-4 text-amber-500" /> Top Leaderboard Nasional
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {[
                      { rank: 1, name: 'Anwar Wijaya', region: 'Bandung', points: '14,820 Koin', value: 'Rp 450M', tier: 'Corporate' },
                      { rank: 2, name: 'Siti Rahma', region: 'Sumedang', points: '12,150 Koin', value: 'Rp 320M', tier: 'Corporate' },
                      { rank: 3, name: 'Dedi Mulyadi', region: 'Purwakarta', points: '9,840 Koin', value: 'Rp 280M', tier: 'Media Partner' },
                      { rank: 4, name: 'Budi Santoso', region: 'Bandung', points: '8,400 Koin', value: 'Rp 195M', tier: 'Sales Partner' }
                    ].map(user => (
                      <div key={user.rank} className="flex justify-between items-center text-xs p-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-mono font-bold w-5 text-center ${user.rank <= 3 ? 'text-[#FFD700] text-sm' : 'text-slate-400 dark:text-slate-500'}`}>
                            {user.rank}
                          </span>
                          <div>
                            <span className="font-bold text-slate-800 dark:text-slate-200">{user.name}</span>
                            <p className="text-[9px] text-slate-400 dark:text-slate-500">{user.tier} • {user.region}</p>
                          </div>
                        </div>
                        <div className="text-right font-mono text-[10px]">
                          <strong className="text-[#002B5B] dark:text-[#38bdf8] block">{user.value}</strong>
                          <span className="text-slate-400 dark:text-slate-500">{user.points}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================================== */}
          {/* TAB: PIPELINE CRM */}
          {/* ==================================== */}
          {activeTab === 'crm' && (
            <div className="space-y-6">
              {/* CRM Pipeline Visualizer */}
              <div className="border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 bg-white dark:bg-[#001f42] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-3 border-slate-100 dark:border-white/10 gap-2">
                  <h4 className="font-bold text-xs text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-[#002B5B] dark:text-[#38bdf8]" /> Manajemen CRM &amp; Pipa Penjualan
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs">
                    <Filter className="h-3.5 w-3.5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Cari prospek..." 
                      value={crmSearch}
                      onChange={(e) => setCrmSearch(e.target.value)}
                      className="border border-slate-200 dark:border-white/10 rounded-lg px-2 py-1 bg-white dark:bg-[#000a18]/60 text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Pipeline Board */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {['Kontak', 'Proposal', 'Negosiasi', 'Deal'].map(stage => {
                    const stageLeads = leads.filter(l => l.stage === stage && l.company.toLowerCase().includes(crmSearch.toLowerCase()));
                    return (
                      <div key={stage} className="bg-slate-50 dark:bg-[#000a18]/40 p-4 rounded-2xl border border-slate-200/80 dark:border-white/10 space-y-3">
                        <div className="flex justify-between items-center border-b pb-1.5 border-slate-200/80 dark:border-white/10">
                          <span className="font-bold text-xs text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono">{stage}</span>
                          <span className="text-[10px] bg-white dark:bg-[#001f42] border border-slate-200 dark:border-white/10 px-1.5 py-0.2 rounded font-mono text-slate-500 dark:text-slate-400 font-bold">
                            {stageLeads.length}
                          </span>
                        </div>

                        <div className="space-y-2 max-h-[300px] overflow-y-auto">
                          {stageLeads.map(lead => (
                            <div key={lead.id} className="bg-white dark:bg-[#001f42] p-3 border border-slate-200 dark:border-white/10 rounded-xl shadow-xs space-y-2 text-left">
                              <div>
                                <span className="font-bold text-slate-800 dark:text-slate-200 text-xs block">{lead.company}</span>
                                <span className="text-[9px] text-slate-400 dark:text-slate-500">Kontak: {lead.contact} ({lead.region})</span>
                              </div>
                              <div className="flex justify-between items-center text-[11px] font-mono border-t border-slate-100 dark:border-white/10 pt-1.5">
                                <strong className="text-[#002B5B] dark:text-[#38bdf8]">Rp {lead.value.toLocaleString('id-ID')}</strong>
                                <span className="text-[8px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded font-bold uppercase">{lead.skill}</span>
                              </div>

                              {/* Stage Transition Select */}
                              <div className="pt-1.5">
                                <select 
                                  value={lead.stage}
                                  onChange={(e) => handleUpdateStage(lead.id, e.target.value)}
                                  className="w-full bg-slate-50 dark:bg-[#000a18]/60 text-[9px] font-bold border border-slate-200 dark:border-white/10 rounded p-1 text-slate-600 dark:text-slate-300 focus:outline-none"
                                >
                                  <option value="Kontak" className="dark:bg-[#001f42]">Mundur ke Kontak</option>
                                  <option value="Proposal" className="dark:bg-[#001f42]">Pindah ke Proposal</option>
                                  <option value="Negosiasi" className="dark:bg-[#001f42]">Pindah ke Negosiasi</option>
                                  <option value="Deal" className="dark:bg-[#001f42]">Deal (Closing 🎉)</option>
                                </select>
                              </div>
                            </div>
                          ))}
                          {stageLeads.length === 0 && (
                            <p className="text-[10px] text-slate-400 dark:text-slate-600 text-center py-4 italic">Kosong</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Add Lead Form */}
              <div className="border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 bg-white dark:bg-[#001f42] space-y-4">
                <h4 className="font-bold text-xs text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono flex items-center gap-1.5">
                  <PlusCircle className="h-4 w-4 text-emerald-500" /> Daftarkan Prospek Penjualan Baru
                </h4>
                <form onSubmit={handleAddLead} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs items-end">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 dark:text-slate-300">Nama Perusahaan / Dinas</label>
                    <input 
                      type="text" 
                      placeholder="e.g. PT Indofood" 
                      value={newCompany}
                      onChange={(e) => setNewCompany(e.target.value)}
                      required
                      className="w-full border border-slate-200 dark:border-white/10 rounded-lg p-2 bg-slate-50/50 dark:bg-[#000a18]/60 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 dark:text-slate-300">Nama Kontak Person</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Ibu Rita" 
                      value={newContact}
                      onChange={(e) => setNewContact(e.target.value)}
                      className="w-full border border-slate-200 dark:border-white/10 rounded-lg p-2 bg-slate-50/50 dark:bg-[#000a18]/60 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 dark:text-slate-300">Estimasi Deal (IDR)</label>
                    <input 
                      type="number" 
                      value={newValue}
                      onChange={(e) => setNewValue(Number(e.target.value))}
                      className="w-full border border-slate-200 dark:border-white/10 rounded-lg p-2 bg-slate-50/50 dark:bg-[#000a18]/60 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 dark:text-slate-300">Keahlian / Sektor</label>
                    <select 
                      value={newSkill} 
                      onChange={(e) => setNewSkill(e.target.value)}
                      className="w-full border border-slate-200 dark:border-white/10 rounded-lg p-2 bg-slate-50/50 dark:bg-[#000a18]/60 text-slate-900 dark:text-white"
                    >
                      <option value="Advertising" className="dark:bg-[#001f42]">Advertising</option>
                      <option value="API Reseller" className="dark:bg-[#001f42]">API Reseller</option>
                      <option value="Corporate Sales" className="dark:bg-[#001f42]">Corporate Sales</option>
                      <option value="Government Liaison" className="dark:bg-[#001f42]">Government Liaison</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 dark:text-slate-300">Lokasi / Region</label>
                    <select 
                      value={newRegion} 
                      onChange={(e) => setNewRegion(e.target.value)}
                      className="w-full border border-slate-200 dark:border-white/10 rounded-lg p-2 bg-slate-50/50 dark:bg-[#000a18]/60 text-slate-900 dark:text-white"
                    >
                      <option value="Bandung" className="dark:bg-[#001f42]">Bandung</option>
                      <option value="Sumedang" className="dark:bg-[#001f42]">Sumedang</option>
                      <option value="Garut" className="dark:bg-[#001f42]">Garut</option>
                      <option value="Cirebon" className="dark:bg-[#001f42]">Cirebon</option>
                    </select>
                  </div>
                  <button 
                    type="submit"
                    className="py-2.5 bg-[#002B5B] dark:bg-indigo-600 hover:bg-[#001f42] dark:hover:bg-indigo-700 text-white font-bold rounded-lg transition text-center uppercase tracking-wider font-mono text-[10px]"
                  >
                    Simpan Prospek
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ==================================== */}
          {/* TAB: FINANCE & PAYOUT */}
          {/* ==================================== */}
          {activeTab === 'finance' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
              {/* Payment history & automatic tax */}
              <div className="lg:col-span-8 border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 bg-white dark:bg-[#001f42] space-y-4">
                <div className="flex justify-between items-center border-b pb-3 border-slate-100 dark:border-white/10">
                  <h4 className="font-bold text-xs text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4 text-[#002B5B] dark:text-[#38bdf8]" /> Riwayat Penarikan Komisi &amp; Pajak (Royalti)
                  </h4>
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded font-mono font-bold">Kepatuhan Pajak RI</span>
                </div>
                
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Semua komisi yang dicairkan otomatis dipotong Pajak Penghasilan sesuai regulasi Direktorat Jenderal Pajak RI. <strong>PPh 21</strong> dipotong sebesar 2.5% (memiliki NPWP) atau 5% (non-NPWP). <strong>PPh 23</strong> dipotong 2% bagi kemitraan berbadan hukum.
                </p>

                <div className="space-y-3">
                  {[
                    { id: 'pay-001', date: '2026-06-15', amount: 12500000, tax: 312500, type: 'PPh 21 (NPWP)', net: 12187500, status: 'Berhasil Transfer' },
                    { id: 'pay-002', date: '2026-05-28', amount: 4800000, tax: 240000, type: 'PPh 21 (Non-NPWP)', net: 4560000, status: 'Berhasil Transfer' },
                    { id: 'pay-003', date: '2026-04-10', amount: 35000000, tax: 700000, type: 'PPh 23 (Corp)', net: 34300000, status: 'Berhasil Transfer' }
                  ].map(pay => (
                    <div key={pay.id} className="p-3 bg-slate-50 dark:bg-[#000a18]/40 border border-slate-200 dark:border-white/10 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-3">
                      <div>
                        <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400 dark:text-slate-500">
                          <span>INV-{pay.id}</span>
                          <span>•</span>
                          <span>{pay.date}</span>
                        </div>
                        <span className="font-bold text-slate-800 dark:text-white text-sm block mt-0.5">Rp {pay.amount.toLocaleString('id-ID')}</span>
                        <span className="text-[10px] text-rose-600 dark:text-rose-400 font-mono">Pajak Otomatis: -Rp {pay.tax.toLocaleString('id-ID')} ({pay.type})</span>
                      </div>
                      <div className="text-right sm:space-y-1">
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Diterima Bersih:</span>
                        <strong className="text-emerald-600 dark:text-emerald-400 font-black block">Rp {pay.net.toLocaleString('id-ID')}</strong>
                        <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border dark:border-emerald-500/20 font-bold px-2 py-0.5 rounded text-[9px] uppercase tracking-wide inline-block">{pay.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Request Payout Widget */}
              <div className="lg:col-span-4 border border-slate-200/80 rounded-2xl p-5 bg-[#002B5B] text-white flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-amber-400 font-mono font-bold text-xs">
                    <TrendingUp className="h-4 w-4" />
                    <span>SALDO CAIR BERJALAN</span>
                  </div>
                  <h3 className="text-2xl font-black text-[#FFD700]">Rp 4.500.000</h3>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Royalti yang siap ditarik ke rekening terdaftar. Minimal penarikan saldo adalah Rp 500.000.
                  </p>
                </div>

                <div className="space-y-3 pt-6">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-xl text-[10px] font-mono space-y-1 text-slate-300">
                    <p className="font-bold text-[#FFD700]">Detail Rekening Tujuan:</p>
                    <p>Bank: Bank BJB Cabang Utama</p>
                    <p>No Rek: 0102 **** **81</p>
                    <p>Atas Nama: {cardName}</p>
                  </div>

                  <button 
                    onClick={() => {
                      setPayoutRequested(true);
                      setTimeout(() => setPayoutRequested(false), 4000);
                    }}
                    disabled={payoutRequested}
                    className="w-full py-3 bg-[#FFD700] hover:bg-[#ffe240] text-[#002B5B] font-mono font-black rounded-xl text-xs transition uppercase tracking-wide text-center"
                  >
                    {payoutRequested ? 'PENGAJUAN DIKIRIM & SEEDING...' : 'TARIK SALDO SEKARANG &rarr;'}
                  </button>

                  {payoutRequested && (
                    <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-[10px] text-center font-semibold animate-pulse">
                      Simulasi: Pengajuan transfer berhasil dikirim. Admin akan menyetujui PPh 21 otomatis dlm waktu 5 mnt.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ==================================== */}
          {/* TAB: MARKETING KIT */}
          {/* ==================================== */}
          {activeTab === 'marketing' && (
            <div className="space-y-6 text-left">
              {/* Marketing kit list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 bg-white dark:bg-[#001f42] space-y-4">
                  <h4 className="font-bold text-xs text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono flex items-center gap-1.5">
                    <FileText className="h-4 w-4 text-[#002B5B] dark:text-[#38bdf8]" /> Draf Pitching &amp; Marketing Kit INFOBOS
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Salin materi promosi instan untuk disebar ke kanal WhatsApp atau Email calon klien korporat.</p>
                  
                  <div className="space-y-3">
                    {[
                      { label: 'Pitch Banner Ads (WhatsApp)', text: 'Halo Pak/Ibu, tertarik mempromosikan bisnis Anda di portal berita tepercaya Jawa Barat? INFOBOS kini menghadirkan programmatic banner ads khusus daerah dengan optimasi CTR di 27 kota/kabupaten. Dapatkan diskon sponsor webinars kuartal ini!' },
                      { label: 'Briefing Corporate Member (Email)', text: 'Kepada Yth Direksi, kami menawarkan langganan Premium Corporate Membership INFOBOS Next. Dapatkan dataset riset anomali daerah, feed telemetri media, dan audit sentimen brand korporat Anda secara real-time.' },
                      { label: 'Referral Link Portal Anda', text: `https://infobos.com/join?ref=${cardName.toLowerCase().replace(/\s+/g, '-')}` }
                    ].map(kit => (
                      <div key={kit.label} className="p-3 bg-slate-50 dark:bg-[#000a18]/40 border dark:border-white/10 rounded-xl space-y-1.5 text-xs">
                        <div className="flex justify-between items-center font-bold text-[#002B5B] dark:text-[#38bdf8]">
                          <span>{kit.label}</span>
                          <button 
                            onClick={() => handleCopy(kit.text, kit.label)}
                            className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center gap-1 text-[10px] uppercase font-bold cursor-pointer"
                          >
                            <Copy className="h-3 w-3" />
                            <span>{copiedText === kit.label ? 'Copied ✓' : 'Salin'}</span>
                          </button>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 font-mono text-[10px] break-all leading-relaxed">{kit.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Digital Business Card Simulator */}
                <div className="border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 bg-white dark:bg-[#001f42] space-y-4">
                  <h4 className="font-bold text-xs text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono flex items-center gap-1.5">
                    <Share2 className="h-4 w-4 text-[#002B5B] dark:text-[#38bdf8]" /> Kartu Bisnis Digital Partner (QR Code)
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Sesuaikan informasi kartu nama digital Anda dan tunjukkan QR Code saat presentasi tatap muka.</p>
                  
                  {/* Realtime Inputs */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600 dark:text-slate-300">Nama Tampilan</label>
                      <input 
                        type="text" 
                        value={cardName} 
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full bg-white dark:bg-[#000a18]/60 border border-slate-200 dark:border-white/10 rounded-lg p-2 text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600 dark:text-slate-300">Telepon Kontak</label>
                      <input 
                        type="text" 
                        value={cardPhone} 
                        onChange={(e) => setCardPhone(e.target.value)}
                        className="w-full bg-white dark:bg-[#000a18]/60 border border-slate-200 dark:border-white/10 rounded-lg p-2 text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Visual Card Representation */}
                  <div className="p-5 bg-gradient-to-tr from-[#002B5B] via-[#001733] to-[#2B7A78] text-white rounded-2xl border border-white/10 space-y-4 flex flex-col justify-between shadow-lg text-left relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full rotate-45 border border-white/5 pointer-events-none" />
                    
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[8px] bg-[#FFD700] text-slate-950 font-mono font-black px-1.5 py-0.2 rounded uppercase">
                          INFOBOS PARTNER
                        </span>
                        <h5 className="font-black tracking-tight text-md mt-1.5">{cardName}</h5>
                        <p className="text-[9px] text-[#FFD700] font-mono">{partnerTier}</p>
                      </div>
                      
                      {/* Interactive mock QR */}
                      <div className="p-1 bg-white rounded-lg flex items-center justify-center border">
                        <div className="w-12 h-12 bg-slate-900 flex flex-col items-center justify-center text-white text-[8px] font-mono text-center leading-none p-1 border">
                          <span className="font-black text-[#FFD700] text-[7px]">INFOBOS</span>
                          <span className="text-[5px] text-slate-400 mt-1">SCAN REF</span>
                          <span className="text-[6px] font-bold">1049-OK</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-end border-t border-white/10 pt-3 text-[9px] font-mono text-slate-300">
                      <div>
                        <p>HP: {cardPhone}</p>
                        <p>ID: PRT-{cardName.slice(0,3).toUpperCase()}-2026</p>
                      </div>
                      <span className="font-bold text-slate-400">Verifikasi Dewan Pers✓</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Sales Assistant integration */}
              <div className="border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 bg-white dark:bg-[#001f42] space-y-4">
                <div className="flex justify-between items-center border-b pb-3 border-slate-100 dark:border-white/10">
                  <h4 className="font-bold text-xs text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-indigo-500 animate-pulse" /> AI Sales Copywriter Assistant (Gemini)
                  </h4>
                  <span className="bg-indigo-100 dark:bg-indigo-950/40 border dark:border-indigo-500/20 text-indigo-800 dark:text-indigo-300 font-mono text-[9px] px-2 py-0.5 rounded font-bold uppercase">Ready</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Gunakan kecerdasan buatan untuk menyusun draft proposal, email follow up, atau draf naskah pitching penawaran secara kustom.</p>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 text-xs">
                  {/* Controls */}
                  <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-[#000a18]/40 p-4 border dark:border-white/10 rounded-xl">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 dark:text-slate-300">Jenis Copy / Tindakan</label>
                      <select 
                        value={aiAction}
                        onChange={(e) => setAiAction(e.target.value)}
                        className="w-full bg-white dark:bg-[#001f42] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-lg p-2 focus:outline-none"
                      >
                        <option value="proposal" className="dark:bg-[#001f42] dark:text-white">Draf Proposal Kemitraan</option>
                        <option value="email" className="dark:bg-[#001f42] dark:text-white">Email Follow Up</option>
                        <option value="pitch" className="dark:bg-[#001f42] dark:text-white">Panduan Strategi Penjualan &amp; USP</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 dark:text-slate-300">Produk yang Ditawarkan</label>
                      <select 
                        value={aiProduct}
                        onChange={(e) => setAiProduct(e.target.value)}
                        className="w-full bg-white dark:bg-[#001f42] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-lg p-2 focus:outline-none"
                      >
                        {SELLABLE_PRODUCTS.map(p => (
                          <option key={p.id} value={p.name} className="dark:bg-[#001f42] dark:text-white">{p.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 dark:text-slate-300">Detail Tambahan / Sektor Klien</label>
                      <textarea 
                        value={aiDetails}
                        onChange={(e) => setAiDetails(e.target.value)}
                        placeholder="Contoh: Klien adalah dinas pariwisata yang ingin menaikkan kunjungan bandara baru..."
                        className="w-full bg-white dark:bg-[#001f42] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-lg p-2 h-20 focus:outline-none resize-none leading-relaxed"
                      />
                    </div>

                    <button 
                      onClick={handleRunAI}
                      disabled={aiLoading}
                      className="w-full py-2.5 bg-[#002B5B] hover:bg-[#001f42] text-[#FFD700] font-mono font-bold rounded-lg transition disabled:bg-slate-200 disabled:text-slate-400 text-center text-xs cursor-pointer"
                    >
                      {aiLoading ? 'MENYUSUN DENGAN GEMINI AI...' : 'BUAT NASKAH COPY &rarr;'}
                    </button>
                  </div>

                  {/* Result Screen */}
                  <div className="lg:col-span-7 flex flex-col justify-between border rounded-xl p-4 bg-slate-950 text-slate-300 font-mono text-[11px] leading-relaxed relative overflow-hidden min-h-[220px]">
                    <div className="absolute top-2 right-2 flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
                      <span className="text-[9px] text-slate-500">AI OUTPUT</span>
                    </div>

                    <div className="whitespace-pre-line text-left overflow-y-auto max-h-[240px] pr-1 scrollbar-thin">
                      {aiResult || "Isi parameter di sebelah kiri, lalu tekan tombol Buat Naskah Copy untuk memicu kecerdasan buatan Gemini."}
                    </div>

                    {aiResult && (
                      <div className="pt-3 border-t border-white/10 mt-3 flex justify-end">
                        <button 
                          onClick={() => handleCopy(aiResult, 'AI_Result')}
                          className="bg-white/10 hover:bg-white/15 border border-white/5 px-2.5 py-1 rounded text-[9px] font-mono text-white flex items-center gap-1 transition"
                        >
                          <Copy className="h-3 w-3" />
                          <span>{copiedText === 'AI_Result' ? 'Copied ✓' : 'Salin Copy'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================================== */}
          {/* TAB: LEARNING & CERTIFICATION */}
          {/* ==================================== */}
          {activeTab === 'learning' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left text-xs">
              {/* Learning Hub Accordion */}
              <div className="lg:col-span-7 border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 bg-white dark:bg-[#001f42] space-y-4">
                <h4 className="font-bold text-xs text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4 text-[#002B5B] dark:text-[#38bdf8]" /> Pusat Edukasi &amp; Pengetahuan Partner
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Pelajari taktik jurnalisme komersial, cara prospecting, dan seluk beluk penanganan keberatan klien.</p>

                <div className="space-y-3">
                  {[
                    { q: 'Bagaimana cara menawarkan "Spatio-News GIS API"?', a: 'Fokus pada nilai data spasial berita real-time. Targetkan instansi pemerintah, dinas tata kota, atau korporat analisis wilayah. Jelaskan bahwa integrasi data spasial INFOBOS langsung terhubung ke database Sentinel OS regional.' },
                    { q: 'Berapa kali royalti dibayarkan dan bagaimana perhitungannya?', a: 'Royalti / Komisi dihitung berdasarkan performance-based. Cair otomatis setiap bulan maksimal tanggal 10. Nilai komisi sudah disesuaikan dengan potongan pajak PPh 21/23 resmi.' },
                    { q: 'Apakah ada batasan wilayah promosi?', a: 'Tidak ada batasan. Selaku Partner, Anda dapat mencari pengiklan atau korporasi dari luar wilayah Jawa Barat sekalipun, selama produk yang dipromosikan sesuai dengan ekosistem jurnalisme INFOBOS.' }
                  ].map((faq, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 dark:bg-[#000a18]/40 border dark:border-white/10 rounded-xl space-y-1">
                      <strong className="text-[#002B5B] dark:text-[#38bdf8] block">{faq.q}</strong>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certification Quiz Quiz */}
              <div className="lg:col-span-5 border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 bg-white dark:bg-[#001f42] space-y-4">
                <div className="flex justify-between items-center border-b dark:border-white/10 pb-2">
                  <h4 className="font-bold text-xs text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono flex items-center gap-1">
                    <Award className="h-4 w-4 text-amber-500" /> Kuis Kualifikasi Sertifikasi
                  </h4>
                  {isCertified && (
                    <span className="bg-emerald-100 dark:bg-emerald-950/40 border dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-extrabold px-2 py-0.5 rounded text-[9px] uppercase">Lolos ✓</span>
                  )}
                </div>
                
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Jawab semua pertanyaan dengan benar untuk memperoleh badge <strong>Certified Partner</strong>, bonus +500 Koin, dan lisensi penutupan deal skala besar.</p>

                {isCertified ? (
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/30 dark:from-indigo-950/40 dark:to-indigo-900/10 p-5 rounded-2xl border border-indigo-200 dark:border-indigo-800/30 text-center space-y-3">
                    <ShieldCheck className="h-10 w-10 text-indigo-600 dark:text-indigo-400 mx-auto" />
                    <div>
                      <strong className="text-indigo-950 dark:text-indigo-200 font-black tracking-tight text-sm uppercase block">Sertifikat Resmi Terbit!</strong>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-1">ID Sertifikat: CERT-INFOBOS-{cardName.slice(0,3).toUpperCase()}-2026</p>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                      Selamat, Anda dinyatakan lolos kualifikasi pemahaman bisnis INFOBOS. Badge sertifikasi kini aktif di dasbor utama Anda.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleQuizSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <p className="font-bold text-slate-700 dark:text-slate-300">1. Apa dasar model pembayaran kemitraan di PartnerOS INFOBOS?</p>
                      {['performance', 'fixed_salary', 'hybrid_allowance'].map(opt => (
                        <label key={opt} className="flex items-center gap-2 font-mono text-[10px] p-2 bg-slate-50 dark:bg-[#000a18]/40 border dark:border-white/10 rounded-lg cursor-pointer text-slate-700 dark:text-slate-300">
                          <input 
                            type="radio" 
                            name="q1" 
                            checked={quizAnswers[1] === opt}
                            onChange={() => setQuizAnswers(prev => ({ ...prev, 1: opt }))}
                            className="text-indigo-600"
                          />
                          <span>{opt === 'performance' ? 'Performance-based (Hanya dibayar berdasarkan hasil deal lunas)' : opt === 'fixed_salary' ? 'Gaji pokok bulanan tetap' : 'Tunjangan tetap + bonus klik iklan'}</span>
                        </label>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <p className="font-bold text-slate-700 dark:text-slate-300">2. Berapa besaran potongan PPh 21 bagi kreator perorangan yang memiliki NPWP?</p>
                      {['pph21_npwp', 'pph21_non_npwp', 'pph23_corp'].map(opt => (
                        <label key={opt} className="flex items-center gap-2 font-mono text-[10px] p-2 bg-slate-50 dark:bg-[#000a18]/40 border dark:border-white/10 rounded-lg cursor-pointer text-slate-700 dark:text-slate-300">
                          <input 
                            type="radio" 
                            name="q2" 
                            checked={quizAnswers[2] === opt}
                            onChange={() => setQuizAnswers(prev => ({ ...prev, 2: opt }))}
                            className="text-indigo-600"
                          />
                          <span>{opt === 'pph21_npwp' ? '2.5% dipotong otomatis dari royalti' : opt === 'pph21_non_npwp' ? '5.0% dipotong otomatis dari royalti' : '2.0% jasa periklanan'}</span>
                        </label>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <p className="font-bold text-slate-700 dark:text-slate-300">3. Di mana Anda dapat menyalin referensi naskah promosi instan?</p>
                      {['marketing_kit', 'news_cms', 'super_admin_console'].map(opt => (
                        <label key={opt} className="flex items-center gap-2 font-mono text-[10px] p-2 bg-slate-50 dark:bg-[#000a18]/40 border dark:border-white/10 rounded-lg cursor-pointer text-slate-700 dark:text-slate-300">
                          <input 
                            type="radio" 
                            name="q3" 
                            checked={quizAnswers[3] === opt}
                            onChange={() => setQuizAnswers(prev => ({ ...prev, 3: opt }))}
                            className="text-indigo-600"
                          />
                          <span>{opt === 'marketing_kit' ? 'Tab AI Assistant & Marketing (Materi Kit Promosi)' : opt === 'news_cms' ? 'Draf penulisan di News CMS' : 'Halaman Konsol Server Developer'}</span>
                        </label>
                      ))}
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-2 bg-[#002B5B] dark:bg-indigo-600 hover:bg-[#001f42] dark:hover:bg-indigo-700 text-white font-mono font-bold rounded-xl text-center text-xs transition cursor-pointer"
                    >
                      KIRIM JAWABAN KUIS
                    </button>

                    {quizScore !== null && quizScore < 3 && (
                      <div className="p-3 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 text-rose-800 dark:text-rose-300 rounded-xl text-center">
                        Jawaban Anda belum sepenuhnya benar ({quizScore}/3). Silakan coba lagi!
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>
          )}

          {/* ==================================== */}
          {/* TAB: SUPER ADMIN CONSOLE */}
          {/* ==================================== */}
          {activeTab === 'admin' && (
            <div className="space-y-6 text-xs text-left">
              {/* Target & Modify multipliers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 bg-white dark:bg-[#001f42] space-y-4">
                  <h4 className="font-bold text-xs text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono flex items-center gap-1.5">
                    <Target className="h-4 w-4 text-indigo-500" /> Revenue Command Center &amp; Target Set
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Atur parameter penugasan, target pendapatan nasional, dan kontrol margin komisi mitra dari satu dasbor terpusat.</p>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center font-bold text-slate-700 dark:text-slate-300">
                        <span>Target Pendapatan Nasional Kuartalan</span>
                        <span className="text-[#002B5B] dark:text-[#38bdf8] font-mono">Rp {superAdminTarget.toLocaleString('id-ID')}</span>
                      </div>
                      <input 
                        type="range" 
                        min="500000000" 
                        max="5000000000" 
                        step="100000000"
                        value={superAdminTarget}
                        onChange={(e) => setSuperAdminTarget(Number(e.target.value))}
                        className="w-full accent-[#002B5B] dark:accent-sky-500 cursor-pointer"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center font-bold text-slate-700 dark:text-slate-300">
                        <span>Faktor Pengali Komisi Mitra (Global Modifier)</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-mono">{commissionRateModifier}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="50" 
                        max="200" 
                        step="10"
                        value={commissionRateModifier}
                        onChange={(e) => setCommissionRateModifier(Number(e.target.value))}
                        className="w-full accent-emerald-600 dark:accent-emerald-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* AI Opportunity Engine */}
                <div className="border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 bg-gradient-to-br from-indigo-50 to-purple-50/20 dark:from-indigo-950/40 dark:to-purple-950/20 space-y-3">
                  <h4 className="font-extrabold text-xs text-indigo-950 dark:text-indigo-300 uppercase font-mono flex items-center gap-1.5">
                    <Cpu className="h-4 w-4 text-indigo-500" /> AI Opportunity Engine (Sentinel OS)
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    Kecerdasan buatan memindai sebaran industri Jawa Barat secara real-time dan merumuskan rekomendasi prioritas penetrasi sales partner.
                  </p>
                  
                  <div className="bg-white dark:bg-[#000a18]/60 p-3 rounded-xl border border-indigo-100 dark:border-indigo-800/30 space-y-2 text-[10px] leading-relaxed">
                    <p className="font-bold text-indigo-900 dark:text-indigo-300">• Sektor Infrastruktur &amp; Logistik (Priangan Timur):</p>
                    <p className="text-slate-500 dark:text-slate-400 pl-3">Ditemukan gap penetrasi materi promosi berita spasial sebesar 45%. Rekomendasikan Strategic Partner untuk mengirim proposal custom API ke draf logistik BUMD.</p>
                    <p className="font-bold text-indigo-900 dark:text-indigo-300">• Sektor Agro-Tech (Bandung Utara &amp; Garut):</p>
                    <p className="text-slate-500 dark:text-slate-400 pl-3">Sentimen positif UMKM melonjak 12%. Cocok untuk bundling Masterclass + Programmatic Ad Zone.</p>
                  </div>
                </div>
              </div>

              {/* Manage Pending Payout Request */}
              <div className="border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 bg-white dark:bg-[#001f42] space-y-4">
                <h4 className="font-bold text-xs text-[#002B5B] dark:text-[#38bdf8] uppercase font-mono flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Audit Pengajuan Payout Partner &amp; Pajak (PPh)
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-sans border-collapse">
                    <thead>
                      <tr className="border-b dark:border-white/10 text-slate-400 dark:text-slate-500 text-[10px] uppercase font-mono">
                        <th className="pb-2">Partner</th>
                        <th className="pb-2">Nilai Pengajuan</th>
                        <th className="pb-2">Pajak Otomatis (PPh)</th>
                        <th className="pb-2">Status</th>
                        <th className="pb-2 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-white/10 text-[11px]">
                      {payoutRequests.map(p => (
                        <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                          <td className="py-2.5 font-bold text-slate-800 dark:text-slate-200">{p.partner}</td>
                          <td className="py-2.5 font-bold text-slate-900 dark:text-white">Rp {p.amount.toLocaleString('id-ID')}</td>
                          <td className="py-2.5 font-mono text-rose-600 dark:text-rose-400">-Rp {p.tax.toLocaleString('id-ID')} ({p.type})</td>
                          <td className="py-2.5">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                              p.status === 'Pending' 
                                ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border dark:border-amber-500/20' 
                                : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border dark:border-emerald-500/20'
                            }`}>{p.status}</span>
                          </td>
                          <td className="py-2.5 text-right space-x-1.5">
                            {p.status === 'Pending' && (
                              <>
                                <button 
                                  onClick={() => setPayoutRequests(prev => prev.map(pr => pr.id === p.id ? { ...pr, status: 'Approved' } : pr))}
                                  className="px-2 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded font-bold uppercase text-[9px] cursor-pointer"
                                >
                                  Setujui &amp; Transfer
                                </button>
                                <button 
                                  onClick={() => setPayoutRequests(prev => prev.filter(pr => pr.id !== p.id))}
                                  className="px-2 py-1 bg-rose-500 hover:bg-rose-600 text-white rounded font-bold uppercase text-[9px] cursor-pointer"
                                >
                                  Tolak
                                </button>
                              </>
                            )}
                            {p.status === 'Approved' && (
                              <span className="text-slate-400 dark:text-slate-500 italic">Disetujui ✓</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Portal Top-Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b dark:border-white/10 pb-4 gap-3 text-left">
        <div>
          <span className="text-xs font-bold text-teal-600 dark:text-teal-400 font-mono flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" /> REVENUE &amp; PARTNER ECOSYSTEM OS
          </span>
          <h1 className="text-2xl font-black text-[#002B5B] dark:text-white tracking-tight mt-1">PartnerOS Portal</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Membantu mitra resmi INFOBOS mengelola pipeline CRM, melacak komisi bulanan, dan mengakses kit marketing.</p>
        </div>
        
        {/* Mobile simulator toggle */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsMobileSim(!isMobileSim)}
            className="flex items-center gap-2 text-xs bg-slate-900 text-white hover:bg-slate-800 dark:bg-sky-500/10 dark:text-sky-400 dark:border dark:border-sky-500/20 dark:hover:bg-sky-500/20 px-3.5 py-2 rounded-xl font-mono font-bold shadow-xs transition cursor-pointer"
          >
            <Settings className="h-4 w-4" />
            <span>{isMobileMode ? 'Layar Penuh (Desktop)' : 'Simulator HP (Mobile)'}</span>
          </button>
        </div>
      </div>

      {isMobileMode ? (
        /* ==================================================== */
        /* MOBILE VIEW (NATIVE ON MOBILE, SIMULATED ON DESKTOP) */
        /* ==================================================== */
        <div 
          className={
            isMobileScreen 
              ? "w-full mx-auto relative bg-slate-50 dark:bg-[#000a18]/40 text-slate-950 dark:text-white font-sans flex flex-col justify-between border dark:border-white/10 rounded-3xl p-1 sm:p-2"
              : "max-w-[380px] mx-auto border-[10px] border-slate-900 dark:border-slate-800 rounded-[40px] shadow-2xl relative overflow-hidden bg-slate-50 dark:bg-[#000a18] text-slate-950 dark:text-white font-sans aspect-[9/19] flex flex-col justify-between"
          }
        >
          {/* Notch indicator */}
          {!isMobileScreen && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-slate-900 dark:bg-slate-800 rounded-b-xl z-50 flex items-center justify-center">
              <div className="w-3.5 h-3.5 rounded-full bg-slate-800 dark:bg-slate-700" />
              <div className="w-10 h-1 bg-slate-700 dark:bg-slate-600 rounded-full ml-3" />
            </div>
          )}

          {/* Mobile Shell top padding */}
          {!isMobileScreen && <div className="h-8 bg-slate-900 dark:bg-slate-800 shrink-0" />}

          {/* Scrollable Mobile Body */}
          <div className={isMobileScreen ? "flex-1 p-2 sm:p-4 space-y-5 pt-2" : "flex-1 overflow-y-auto p-4 space-y-5 scrollbar-none pt-2"}>
            <div className="flex justify-between items-center border-b dark:border-white/10 pb-2">
              <span className="text-[10px] font-black text-[#002B5B] dark:text-[#38bdf8] font-mono">PartnerOS Mobile</span>
              <span className="text-[8px] bg-emerald-500 text-white font-mono px-1.5 py-0.2 rounded font-black uppercase">LIVE</span>
            </div>
            
            {/* Embedded dashboard contents */}
            {renderDashboardContent()}
          </div>

          {/* Sticky Mobile Bottom Navigation Tab Bar */}
          <div className="bg-white dark:bg-[#001f42] border-t border-slate-200 dark:border-white/10 py-2.5 px-1 sm:px-3 flex justify-around items-center shrink-0 mt-6 rounded-b-2xl overflow-x-auto scrollbar-none">
            {[
              { id: 'overview', label: 'Dasbor', icon: Layout },
              { id: 'crm', label: 'CRM', icon: Users },
              { id: 'finance', label: 'Keuangan', icon: DollarSign },
              { id: 'marketing', label: 'AI Kit', icon: Sparkles },
              { id: 'learning', label: 'E-Class', icon: GraduationCap },
              ...(isAdminOrOwner ? [{ id: 'admin', label: 'Admin', icon: Settings }] : [])
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button 
                  key={tab.id} 
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex flex-col items-center justify-center gap-1 transition min-w-[50px] ${isActive ? 'text-[#002B5B] dark:text-[#38bdf8]' : 'text-slate-400 dark:text-slate-500'}`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="text-[8px] font-bold uppercase font-mono">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* ==================================================== */
        /* STANDARD DESKTOP VIEW */
        /* ==================================================== */
        <div className="space-y-6">
          {/* Tab buttons */}
          <div className="flex gap-2 border-b border-slate-200 dark:border-white/10 pb-2 overflow-x-auto scrollbar-none text-xs font-bold">
            {[
              { id: 'overview', label: 'Dasbor & Gamifikasi', icon: Layout },
              { id: 'crm', label: 'Pipeline CRM', icon: Users },
              { id: 'finance', label: 'Keuangan & Payout', icon: DollarSign },
              { id: 'marketing', label: 'AI Assistant & Marketing', icon: Sparkles },
              { id: 'learning', label: 'Learning & Sertifikasi', icon: GraduationCap },
              ...(isAdminOrOwner ? [{ id: 'admin', label: 'Super Admin Console', icon: Settings }] : [])
            ].map(t => {
              const isActive = activeTab === t.id;
              return (
                <button 
                  key={t.id} 
                  onClick={() => setActiveTab(t.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap capitalize transition cursor-pointer ${
                    isActive 
                      ? 'bg-[#002B5B] text-white dark:bg-sky-500/10 dark:text-sky-400 border dark:border-sky-500/20 shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/40'
                  }`}
                >
                  <t.icon className={`h-4 w-4 ${isActive ? 'text-[#FFD700] dark:text-sky-400' : 'text-slate-400'}`} />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* Main content body */}
          <div className="bg-slate-50/30 dark:bg-transparent p-1 rounded-3xl">
            {renderDashboardContent()}
          </div>
        </div>
      )}
    </div>
  );
}
