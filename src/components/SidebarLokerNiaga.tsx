import React, { useState } from 'react';
import { Briefcase, ShoppingBag, MapPin, Search, ChevronRight, Tag, Sparkles, Building2, Eye, Info, ExternalLink, Flame, CheckCircle, Clock } from 'lucide-react';

interface LokerItem {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  tags: string[];
}

interface NiagaItem {
  id: string;
  title: string;
  price: string;
  location: string;
  type: 'Jual' | 'Beli' | 'Sewa';
  category: string;
  imageUrl: string;
}

const LOKER_DATA: LokerItem[] = [
  {
    id: 'l-1',
    title: 'Admin Gudang & Logistik',
    company: 'PT Central Logistik',
    location: 'Karawang Barat',
    salary: 'Rp 5.2 Jt - 5.8 Jt',
    type: 'Full-time',
    tags: ['SMK/D3', 'Pengalaman 1 Thn']
  },
  {
    id: 'l-2',
    title: 'Content Creator Specialist',
    company: 'InfoBos Media Group',
    location: 'Coblong, Bandung',
    salary: 'Rp 4.0 Jt - 6.0 Jt',
    type: 'Full-time',
    tags: ['Kreatif', 'Media Sosial']
  },
  {
    id: 'l-3',
    title: 'Staff Kasir & Pramuniaga',
    company: 'Ritel Jaya Abadi',
    location: 'Garut Kota',
    salary: 'Rp 3.1 Jt - 3.5 Jt',
    type: 'Full-time',
    tags: ['SMA/K', 'Ramah & Komunikatif']
  },
  {
    id: 'l-4',
    title: 'Senior Web Developer',
    company: 'Tech Solusindo',
    location: 'Bekasi Selatan',
    salary: 'Rp 10 Jt - 15 Jt',
    type: 'Hybrid',
    tags: ['React', 'Node.js', '3 Thn Exp']
  },
  {
    id: 'l-5',
    title: 'Customer Service Representative',
    company: 'Bintang Telematika',
    location: 'Depok Baru',
    salary: 'Rp 4.5 Jt - 5.0 Jt',
    type: 'Full-time',
    tags: ['Komunikasi', 'Shift Kerja']
  }
];

const NIAGA_DATA: NiagaItem[] = [
  {
    id: 'n-1',
    title: 'Sewa Ruko Strategis Dago Bandung',
    price: 'Rp 85 Jt / Tahun',
    location: 'Dago, Bandung',
    type: 'Sewa',
    category: 'Properti',
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&auto=format&fit=crop&q=60'
  },
  {
    id: 'n-2',
    title: 'Honda Vario 150 Keyless 2022',
    price: 'Rp 18.5 Jt',
    location: 'Cirebon Kota',
    type: 'Jual',
    category: 'Otomotif',
    imageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&auto=format&fit=crop&q=60'
  },
  {
    id: 'n-3',
    title: 'Sewa Paviliun Kost Pasirkaliki',
    price: 'Rp 1.5 Jt / Bulan',
    location: 'Pasirkaliki, Bandung',
    type: 'Sewa',
    category: 'Kost',
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&auto=format&fit=crop&q=60'
  },
  {
    id: 'n-4',
    title: 'Cari Rumah Kontrakan Keluarga',
    price: 'Budget Rp 25 Jt/Thn',
    location: 'Cibinong, Bogor',
    type: 'Beli',
    category: 'Properti',
    imageUrl: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400&auto=format&fit=crop&q=60'
  },
  {
    id: 'n-5',
    title: 'Tanah Kavling Siap Bangun SHM',
    price: 'Rp 320 Jt',
    location: 'Jatinangor, Sumedang',
    type: 'Jual',
    category: 'Tanah',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&auto=format&fit=crop&q=60'
  }
];

interface SidebarLokerNiagaProps {
  onNavigate?: (slug: string, type: string) => void;
}

export default function SidebarLokerNiaga({ onNavigate }: SidebarLokerNiagaProps) {
  const [activeTab, setActiveTab] = useState<'loker' | 'niaga'>('loker');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const filteredLoker = LOKER_DATA.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredNiaga = NIAGA_DATA.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-[#080f1e] border-t-4 border-[#E32619] border-x border-b border-slate-200 dark:border-white/10 rounded-b-xl p-4 text-left shadow-md space-y-4">
      
      {/* Detik-style Header */}
      <div className="space-y-1 pb-2 border-b border-slate-100 dark:border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#E32619] animate-ping" />
            <h4 className="font-display font-extrabold text-[13px] text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-1">
              <span>BOS</span> 
              <span className="text-[#E32619] dark:text-rose-500">Karir & Niaga</span>
            </h4>
          </div>
          <span className="text-[7.5px] bg-[#E32619] text-white font-mono font-black px-1.5 py-0.5 rounded uppercase tracking-wider">
            HOT JABAR
          </span>
        </div>
        <p className="text-[9px] text-slate-500 dark:text-slate-400 font-mono">Referensi bursa kerja & niaga siber se-Jawa Barat</p>
      </div>

      {/* Tabs Switcher - Detik Minimal Mode */}
      <div className="flex border-b border-slate-200 dark:border-white/10 text-xs font-extrabold">
        <button
          onClick={() => {
            setActiveTab('loker');
            setSearchQuery('');
          }}
          className={`pb-2.5 px-3 relative transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'loker'
              ? 'text-[#005691] dark:text-sky-400 border-b-2 border-[#005691] dark:border-sky-400'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Briefcase className="h-3.5 w-3.5" />
          <span>Lowongan Terpopuler</span>
        </button>
        <button
          onClick={() => {
            setActiveTab('niaga');
            setSearchQuery('');
          }}
          className={`pb-2.5 px-3 relative transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'niaga'
              ? 'text-[#005691] dark:text-sky-400 border-b-2 border-[#005691] dark:border-sky-400'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          <span>Jual Beli Ruang</span>
        </button>
      </div>

      {/* Mini Search Bar */}
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={activeTab === 'loker' ? "Cari posisi karir atau lokasi..." : "Cari kos, ruko strategis, ruko..."}
          className="w-full bg-slate-50 dark:bg-[#111a2e] border border-slate-200 dark:border-white/10 rounded-lg pl-8.5 pr-3 py-1.5 text-[11px] placeholder-slate-400 focus:outline-none focus:border-[#005691] text-slate-800 dark:text-slate-100 font-medium"
        />
      </div>

      {/* List Area styled like Detik.com Popular/Latest Grid */}
      <div className="space-y-1.5 max-h-[250px] overflow-y-auto pr-1 scrollbar-thin">
        {activeTab === 'loker' ? (
          filteredLoker.length > 0 ? (
            filteredLoker.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group py-2 border-b border-dashed border-slate-150 dark:border-white/5 last:border-b-0 cursor-pointer flex gap-3 items-start"
              >
                {/* Ranking number - Detik Iconic Style */}
                <div className="text-[18px] font-extrabold text-slate-300 dark:text-slate-700 italic leading-none pt-0.5 w-6 shrink-0 text-center font-mono">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
                
                <div className="space-y-1 text-left flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] text-[#E32619] dark:text-rose-400 font-bold uppercase tracking-wider">
                      LOKER JABAR
                    </span>
                    <span className="text-[8px] text-slate-400 font-mono">• {item.type}</span>
                  </div>
                  <h5 className="font-bold text-[11px] text-[#005691] dark:text-sky-400 group-hover:underline transition leading-snug">
                    {item.title}
                  </h5>
                  <div className="flex items-center justify-between text-[9px] text-slate-500 dark:text-slate-400 font-medium">
                    <span className="truncate max-w-[120px]">{item.company}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">{item.salary}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-[10px] text-slate-400 font-mono">
              Tidak ada lowongan yang cocok.
            </div>
          )
        ) : (
          filteredNiaga.length > 0 ? (
            filteredNiaga.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group py-2 border-b border-dashed border-slate-150 dark:border-white/5 last:border-b-0 cursor-pointer flex gap-3 items-start"
              >
                {/* Ranking number */}
                <div className="text-[18px] font-extrabold text-slate-300 dark:text-slate-700 italic leading-none pt-0.5 w-6 shrink-0 text-center font-mono">
                  {(index + 1).toString().padStart(2, '0')}
                </div>

                <div className="flex-1 text-left flex gap-2">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-md object-cover shrink-0 border border-slate-100 dark:border-white/10"
                  />
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[7.5px] font-bold px-1 py-0.2 rounded uppercase ${
                        item.type === 'Jual' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300' :
                        item.type === 'Sewa' ? 'bg-teal-100 text-teal-800 dark:bg-teal-950/40 dark:text-teal-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300'
                      }`}>
                        {item.type}
                      </span>
                      <span className="text-[8px] text-slate-400 font-mono">{item.category}</span>
                    </div>
                    <h5 className="font-bold text-[11px] text-[#005691] dark:text-sky-400 group-hover:underline transition truncate">
                      {item.title}
                    </h5>
                    <div className="flex items-center justify-between text-[9.5px]">
                      <span className="text-[#E32619] dark:text-rose-400 font-bold">{item.price}</span>
                      <span className="text-slate-400 text-[8.5px] flex items-center gap-0.5 font-mono">
                        <MapPin className="h-2 w-2" />
                        {item.location.split(',')[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-[10px] text-slate-400 font-mono">
              Tidak ada barang/properti yang cocok.
            </div>
          )
        )}
      </div>

      {/* Detail Overlay/Modal Inside Widget */}
      {selectedItem && (
        <div className="p-3 bg-slate-50 dark:bg-[#111a2e] text-slate-900 dark:text-slate-100 rounded-xl space-y-2.5 border border-slate-200 dark:border-white/10 animate-fade-in-up">
          <div className="flex justify-between items-start gap-2 border-b border-slate-200 dark:border-white/5 pb-2">
            <div>
              <span className="text-[8.5px] bg-[#E32619] text-white font-bold px-1.5 py-0.5 rounded uppercase tracking-wide">
                {activeTab === 'loker' ? 'INFO KARIR' : `IKLAN ${selectedItem.type.toUpperCase()}`}
              </span>
              <h5 className="text-[11.5px] font-black text-[#005691] dark:text-sky-400 mt-1.5 leading-snug">
                {selectedItem.title}
              </h5>
            </div>
            <button
              onClick={() => setSelectedItem(null)}
              className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-[9px] font-mono font-bold hover:underline bg-slate-200/50 dark:bg-white/5 px-2 py-0.5 rounded cursor-pointer"
            >
              TUTUP
            </button>
          </div>

          <div className="text-[10.5px] space-y-1.5 text-slate-600 dark:text-slate-300 font-medium">
            {activeTab === 'loker' ? (
              <>
                <p>🏢 <strong>Perusahaan:</strong> {selectedItem.company}</p>
                <p>📍 <strong>Penempatan:</strong> {selectedItem.location}</p>
                <p>💵 <strong>Estimasi Gaji:</strong> <span className="text-emerald-600 dark:text-emerald-400 font-bold">{selectedItem.salary}</span></p>
                <p>📄 <strong>Sifat Kerja:</strong> {selectedItem.type}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {selectedItem.tags.map((tg: string, i: number) => (
                    <span key={i} className="text-[8px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded border border-slate-200 dark:border-white/10">
                      {tg}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p>🏷️ <strong>Tipe Transaksi:</strong> {selectedItem.type}</p>
                <p>📂 <strong>Kategori:</strong> {selectedItem.category}</p>
                <p>📍 <strong>Lokasi:</strong> {selectedItem.location}</p>
                <p>💰 <strong>Harga/Tarif:</strong> <span className="text-[#E32619] dark:text-rose-400 font-bold">{selectedItem.price}</span></p>
              </>
            )}
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-white/5">
            <button
              onClick={() => {
                alert(activeTab === 'loker' 
                  ? `Pendaftaran berhasil dikirim ke HRD ${selectedItem.company}. Silakan cek email Anda untuk konfirmasi.`
                  : `Menghubungi penjual/pemilik iklan: ${selectedItem.title} via WhatsApp...`
                );
                setSelectedItem(null);
              }}
              className="w-full py-1.5 bg-[#E32619] hover:bg-red-700 text-white font-black text-[10px] uppercase tracking-wider rounded-lg transition duration-150 text-center cursor-pointer shadow-xs"
            >
              {activeTab === 'loker' ? 'Lamar Pekerjaan Ini' : 'Hubungi Kontak WA'}
            </button>
          </div>
        </div>
      )}

      {/* Detik-Style CTA Button to full portal */}
      {onNavigate && (
        <button
          onClick={() => onNavigate('jobs', 'jobs')}
          className="w-full py-2 bg-[#005691] hover:bg-[#00477a] text-white font-extrabold text-[10px] uppercase tracking-wider rounded-lg transition duration-150 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
        >
          <span>LIHAT SEMUA LOWONGAN & NIAGA</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </button>
      )}

      {/* Bottom Footer Tip */}
      <div className="bg-slate-50 dark:bg-[#111a2e] rounded-lg p-2 text-[8.5px] text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
        <Info className="h-3.5 w-3.5 text-blue-500 shrink-0" />
        <span>Ingin pasang iklan lowongan atau ruko secara instan? Gunakan panel **AdOS Portal**</span>
      </div>

    </div>
  );
}
