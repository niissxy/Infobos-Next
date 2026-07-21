import React, { useState } from 'react';
import { 
  BarChart, Sparkles, Check, Database, HelpCircle, Calculator, 
  ArrowRight, Download, Filter, Search, Table, RefreshCw 
} from 'lucide-react';
import { IntegrationWidget } from './IntegrationEngine';

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface DatasetRow {
  id: string;
  indicator: string;
  y2024: number;
  y2025: number;
  y2026: number; // Projected
  unit: string;
  source: string;
}

export default function InteractiveData() {
  const [activeTab, setActiveTab] = useState<'survey' | 'calculator' | 'open-data'>('survey');

  // ==========================================
  // 1. POLLING / SURVEY STATE
  // ==========================================
  const [voted, setVoted] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [pollOptions, setPollOptions] = useState<PollOption[]>([
    { id: 'opt-1', text: 'Sangat Setuju, mempermudah perluasan modal startup lokal.', votes: 245 },
    { id: 'opt-2', text: 'Setuju, tetapi harus dikawal agar tidak salah sasaran.', votes: 182 },
    { id: 'opt-3', text: 'Ragu-ragu, perlu sosialisasi kriteria lebih lanjut.', votes: 54 },
    { id: 'opt-4', text: 'Tidak Setuju, memangkas potensi pendapatan pajak negara.', votes: 29 }
  ]);

  const handleVote = () => {
    if (!selectedOption) return;
    setPollOptions(current => 
      current.map(opt => opt.id === selectedOption ? { ...opt, votes: opt.votes + 1 } : opt)
    );
    setVoted(true);
  };

  const totalVotes = pollOptions.reduce((acc, curr) => acc + curr.votes, 0);

  // ==========================================
  // 2. AI STIMULUS CALCULATOR STATE
  // ==========================================
  const [turnover, setTurnover] = useState<number>(1500000000); // 1.5 Billion Rupiah default
  const [subsectors, setSubsectors] = useState<'software' | 'games' | 'other'>('software');
  const [employeesCount, setEmployeesCount] = useState<number>(12);
  const [calculatedSavings, setCalculatedSavings] = useState<any>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple mock PMK-2026 calculation logic:
    // Basic corporate income tax rate = 22%
    // Under PMK-2026, eligible creative startups with omzet < 5B enjoy tax ditanggung pemerintah (DTP).
    // Let's assume net profit margin is 20% of turnover.
    const netProfit = turnover * 0.20;
    const normalTax = netProfit * 0.22;
    const incentiveTax = 0; // 100% borne by government (DTP)
    const exactSavingsVal = normalTax - incentiveTax;
    
    // multiplier bonuses
    const localTalentFactor = employeesCount * 12000000; // Rp 12M subsidy equivalent/year
    
    setCalculatedSavings({
      netProfit,
      normalTax,
      incentiveTax,
      exactSavingsVal,
      localTalentFactor,
      isEligible: turnover <= 5000000000
    });
  };

  // ==========================================
  // 3. DATASET / STATISTICS STATE
  // ==========================================
  const [searchQuery, setSearchQuery] = useState<string>('');
  const dataset: DatasetRow[] = [
    { id: 'ds-1', indicator: 'PDB Sektor Ekonomi Kreatif Jawa Barat', y2024: 124.5, y2025: 138.2, y2026: 154.1, unit: 'Triliun Rp', source: 'BPS Provinsi Jabar' },
    { id: 'ds-2', indicator: 'Jumlah Unit Usaha Rintisan (Startup) Terdaftar', y2024: 420, y2025: 560, y2026: 780, unit: 'Korporasi', source: 'Kemenkominfo & Evolis' },
    { id: 'ds-3', indicator: 'Indeks Penyerapan Tenaga Kerja Sektor Digital', y2024: 72.4, y2025: 84.5, y2026: 98.6, unit: 'Ribu Pekerja', source: 'Disnakertrans Bandung' },
    { id: 'ds-4', indicator: 'Rata-rata Investasi Asing Sektor Teknologi Daerah', y2024: 12.4, y2025: 18.5, y2026: 24.8, unit: 'Juta USD', source: 'BKPM Wilayah Barat' }
  ];

  const filteredDataset = dataset.filter(row => 
    row.indicator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-sans text-left space-y-6">
      
      {/* Branding Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Database className="h-6 w-6 text-[#2B7A78]" />
            <h1 className="font-display font-black text-2xl md:text-3xl text-[#002B5B]">INTERACTIVE SURVEY & DATA HUB</h1>
          </div>
          <p className="text-slate-500 text-xs mt-1">Berpartisipasi dalam jajak pendapat publik, simulasikan kebijakan anggaran Anda, serta akses berkas data terbuka regional.</p>
        </div>

        {/* Tab switchers */}
        <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <button 
            onClick={() => setActiveTab('survey')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${activeTab === 'survey' ? 'bg-[#002B5B] text-[#FFD700] shadow-2xs' : 'text-slate-600'}`}
          >
            <BarChart className="h-4 w-4" /> Polling Publik
          </button>
          <button 
            onClick={() => setActiveTab('calculator')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${activeTab === 'calculator' ? 'bg-[#002B5B] text-[#FFD700] shadow-2xs' : 'text-slate-600'}`}
          >
            <Calculator className="h-4 w-4" /> AI Tax Calculator
          </button>
          <button 
            onClick={() => setActiveTab('open-data')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${activeTab === 'open-data' ? 'bg-[#002B5B] text-[#FFD700] shadow-2xs' : 'text-slate-600'}`}
          >
            <Table className="h-4 w-4" /> Data Terbuka
          </button>
        </div>
      </div>

      {/* Official Financial Market Embed - Bloomberg Style */}
      <IntegrationWidget widgetId="widget-financial-embed" className="mb-4" />

      {/* ==========================================
          TAB 1: INTERACTIVE SURVEY / POLLING
          ========================================== */}
      {activeTab === 'survey' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 max-w-2xl mx-auto">
          <div className="space-y-1 text-center border-b border-slate-100 pb-4">
            <span className="text-[9px] bg-[#002B5B]/15 text-[#002B5B] border border-[#002B5B]/25 font-bold px-2 py-0.5 rounded font-mono uppercase tracking-wide">
              Kanal Aspirasi Publik
            </span>
            <h3 className="font-display font-black text-base md:text-lg text-[#002B5B] mt-2 leading-tight">
              Aspirasi Rakyat: Apakah Anda setuju dengan stimulus fiskal digital PMK-2026?
            </h3>
            <p className="text-slate-500 text-xs mt-1">Jajak pendapat harian Dewan Pers & INFOBOS Media Group.</p>
          </div>

          {voted ? (
            <div className="space-y-4">
              <div className="p-3 bg-emerald-500/10 text-emerald-800 text-xs font-semibold rounded-xl border border-emerald-500/25 text-center flex items-center justify-center gap-1.5">
                <Check className="h-4 w-4" /> Terimakasih! Pilihan Anda telah dicatatkan ke database real-time.
              </div>

              {/* Polling results bars */}
              <div className="space-y-3 pt-2">
                {pollOptions.map(opt => {
                  const pct = Math.round((opt.votes / totalVotes) * 100);
                  return (
                    <div key={opt.id} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-700">{opt.text}</span>
                        <span className="text-[#002B5B] font-mono">{pct}% ({opt.votes} vote)</span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                        <div 
                          className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-1000"
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center text-[10px] font-mono text-slate-400 pt-3">
                Total Partisipan Terbuka: {totalVotes} Responden
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-left">
              <div className="space-y-2.5">
                {pollOptions.map(opt => (
                  <label 
                    key={opt.id}
                    className={`p-3.5 border rounded-xl flex items-start gap-3 cursor-pointer transition ${
                      selectedOption === opt.id 
                        ? 'border-teal-500 bg-teal-500/5' 
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="poll"
                      value={opt.id}
                      checked={selectedOption === opt.id}
                      onChange={() => setSelectedOption(opt.id)}
                      className="mt-0.5 accent-teal-600"
                    />
                    <span className="text-xs sm:text-sm font-semibold text-slate-700">{opt.text}</span>
                  </label>
                ))}
              </div>

              <button 
                onClick={handleVote}
                disabled={!selectedOption}
                className="w-full py-2.5 bg-[#002B5B] hover:bg-[#001f42] disabled:opacity-40 text-[#FFD700] text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                Kirim Aspirasi Saya &rarr;
              </button>
            </div>
          )}
        </div>
      )}

      {/* ==========================================
          TAB 2: AI STIMULUS CALCULATOR
          ========================================== */}
      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form (7 columns) */}
          <form onSubmit={handleCalculate} className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-1.5 border-b border-slate-100 pb-3">
              <Calculator className="h-5 w-5 text-teal-600" />
              <div>
                <h3 className="font-display font-black text-xs text-[#002B5B] uppercase tracking-wider">AI Startup Tax Incentive Simulator</h3>
                <span className="text-[9px] text-slate-400 font-mono block mt-0.5">Engine PMK-2026 Pajak Ditanggung Pemerintah</span>
              </div>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Perkiraan Omzet Tahunan (Rupiah):</label>
                <input 
                  type="number" 
                  value={turnover}
                  onChange={(e) => setTurnover(Number(e.target.value))}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-mono font-bold"
                  placeholder="e.g. 1500000000"
                  required
                />
                <p className="text-[10px] text-slate-400 mt-1">Kualifikasi PMK-2026 mewajibkan omzet di bawah Rp 5,000,000,000 (5 Miliar).</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subsektor Industri Kreatif:</label>
                  <select 
                    value={subsectors}
                    onChange={(e: any) => setSubsectors(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-semibold"
                  >
                    <option value="software">Software & AI Lab</option>
                    <option value="games">Game & Kriya Kloning</option>
                    <option value="other">Kuliner & Heritage</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jumlah Karyawan Lokal:</label>
                  <input 
                    type="number" 
                    value={employeesCount}
                    onChange={(e) => setEmployeesCount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-mono"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-2 bg-teal-500 hover:bg-teal-400 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1 shadow-sm"
              >
                <span>Mulai Simulasi Estimasi AI</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Right Results (5 columns) */}
          <div className="lg:col-span-5">
            {calculatedSavings ? (
              <div className="bg-slate-900 text-slate-200 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg text-left">
                <div className="flex items-center gap-1 text-xs font-bold text-[#FFD700] border-b border-white/10 pb-2.5">
                  <Sparkles className="h-4 w-4" />
                  <span>Kalkulasi Simulasi Pajak AI</span>
                </div>

                {calculatedSavings.isEligible ? (
                  <div className="space-y-4">
                    <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-2 rounded-xl text-[10px] font-mono font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                      STATUS: MEMENUHI SYARAT INCENTIVE (ELIGIBLE)
                    </div>

                    <div className="space-y-3 text-xs font-mono">
                      <div className="flex justify-between border-b border-white/5 pb-1 text-slate-400">
                        <span>Net Profit (20%):</span>
                        <span className="text-white font-bold">Rp {calculatedSavings.netProfit.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1 text-slate-400">
                        <span>Pajak Normal (22%):</span>
                        <span className="text-white font-bold text-rose-400">Rp {calculatedSavings.normalTax.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1 text-slate-400">
                        <span>Pajak PMK-2026:</span>
                        <span className="text-white font-bold text-emerald-400">Rp 0 (Borne by Govt)</span>
                      </div>
                      
                      <div className="bg-white/5 p-3 rounded-lg border border-white/5 space-y-1 mt-2">
                        <span className="text-slate-400 text-[10px]">TOTAL PENGHEMATAN ARUS KAS:</span>
                        <div className="text-[#FFD700] text-sm sm:text-base font-bold">Rp {calculatedSavings.exactSavingsVal.toLocaleString('id-ID')} / Tahun</div>
                      </div>

                      <div className="text-[10px] text-slate-400 leading-relaxed font-sans pt-1">
                        💡 Ditambah estimasi subsidi pelatihan SDM talenta lokal senilai Rp {calculatedSavings.localTalentFactor.toLocaleString('id-ID')} secara triwulanan.
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-2 rounded-xl text-[10px] font-bold">
                      🚫 STATUS: MELEBIHI BATAS MAKSIMUM PMK-2026
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Turnover perusahaan Anda terdeteksi di atas Rp 5 Miliar. Status kelayakan beralih ke tarif umum PPh badan reguler sebesar 22%. Anda tetap dapat mengajukan fasilitas kredit riset penelitian dasar.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="border border-dashed border-slate-200 bg-slate-50/50 rounded-2xl p-8 text-center text-slate-400 text-xs font-semibold py-14">
                <Calculator className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                Silakan isi data simulasi keuangan startup di form kiri lalu klik tombol estimasi.
              </div>
            )}
          </div>

        </div>
      )}

      {/* ==========================================
          TAB 3: DATASETS / OPEN DATA TABLES
          ========================================== */}
      {activeTab === 'open-data' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-display font-black text-xs text-[#002B5B] uppercase tracking-wider">Arsip Dataset Publik & Statistik Jawa Barat</h3>
              <p className="text-slate-500 text-[10px] mt-0.5">Sinkronisasi berkas open-data per triwulan 2026.</p>
            </div>

            {/* Table Search */}
            <div className="relative w-full sm:w-64">
              <input 
                type="text" 
                placeholder="Cari indikator statistik..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 border border-slate-200 bg-slate-50 rounded-lg text-xs focus:outline-none focus:border-teal-500"
              />
              <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
            </div>
          </div>

          {/* Table open-data */}
          <div className="overflow-x-auto border border-slate-150 rounded-xl">
            <table className="w-full text-xs text-left text-slate-600 divide-y divide-slate-100">
              <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[9px] font-mono tracking-wider">
                <tr>
                  <th className="px-4 py-3">Nama Indikator / Statistik</th>
                  <th className="px-4 py-3">2024</th>
                  <th className="px-4 py-3">2025</th>
                  <th className="px-4 py-3">2026 (Proj)</th>
                  <th className="px-4 py-3">Satuan</th>
                  <th className="px-4 py-3">Sumber Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                {filteredDataset.map(row => (
                  <tr key={row.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-[#002B5B]">{row.indicator}</td>
                    <td className="px-4 py-3 font-mono">{row.y2024}</td>
                    <td className="px-4 py-3 font-mono">{row.y2025}</td>
                    <td className="px-4 py-3 font-mono text-teal-600 font-bold">{row.y2026}</td>
                    <td className="px-4 py-3 text-slate-400">{row.unit}</td>
                    <td className="px-4 py-3 text-[10px] font-mono text-slate-400">{row.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Export tools */}
          <div className="pt-2 flex justify-between items-center text-xs">
            <span className="text-slate-400 font-mono text-[10px]">Total Indikator Tersedia: {filteredDataset.length} Baris</span>
            <button className="px-3.5 py-1.5 bg-[#002B5B] hover:bg-[#001f42] text-[#FFD700] font-bold rounded-lg transition flex items-center gap-1">
              <Download className="h-3.5 w-3.5" />
              <span>Ekspor CSV (Data Terbuka)</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
