import React, { useState } from 'react';
import { 
  FileText, Search, Download, ZoomIn, ZoomOut, Sparkles, Copy, 
  RotateCcw, Check, BookOpen, AlertCircle, RefreshCw, Layout 
} from 'lucide-react';
import { IntegrationWidget } from './IntegrationEngine';

interface DocumentItem {
  id: string;
  title: string;
  type: 'PDF' | 'DOCX' | 'PPT';
  category: 'Regulation' | 'Research' | 'Report' | 'Manual';
  size: string;
  pagesCount: number;
  author: string;
  publishedAt: string;
  summary: string;
  aiKeywords: string[];
  versionHistory: { version: string; date: string; note: string }[];
  pages: string[];
  ocrText: string;
}

export default function DocumentCenter() {
  const [activeDoc, setActiveDoc] = useState<DocumentItem>({
    id: 'doc-1',
    title: 'PMK No. 42 Tahun 2026: Pemberian Insentif Pajak Penghasilan Final DTP Bagi Startup Sektor Ekonomi Kreatif',
    type: 'PDF',
    category: 'Regulation',
    size: '2.4 MB',
    pagesCount: 3,
    author: 'Kementerian Keuangan Republik Indonesia',
    publishedAt: '20 Juni 2026',
    summary: 'Draf aturan lengkap mengenai tata kelola, kriteria penerima omzet maksimum Rp 5 Miliar, pendaftaran wajib pajak digital, serta tata cara pelaporan pajak ditanggung pemerintah (DTP). Aturan ini dirancang guna memicu perluasan inklusi pendanaan teknologi daerah.',
    aiKeywords: ['Pajak Ditanggung Pemerintah', 'Startup Kreatif', 'PMK-2026', 'Sri Mulyani', 'Infrastruktur Fiskal'],
    versionHistory: [
      { version: 'v1.0 (Draft)', date: '10 Mei 2026', note: 'Draft awal diserahkan ke Biro Hukum Kemenkeu.' },
      { version: 'v1.1 (Revisi)', date: '01 Juni 2026', note: 'Penyesuaian batas atas omzet dari Rp 3.5 Miliar menjadi Rp 5 Miliar.' },
      { version: 'v2.0 (Final)', date: '20 Juni 2026', note: 'Disahkan oleh Menkeu Sri Mulyani dan dicatatkan di lembaran negara.' }
    ],
    pages: [
      "Kementerian Keuangan RI menetapkan stimulus fiskal ditanggung pemerintah (DTP) tahun anggaran 2026. Aturan ini bermaksud merangsang investasi lokal dan meringankan laju arus modal usaha kecil mikro digital pasca kenaikan biaya operasional infrastruktur cloud global.",
      "Kriteria penerima insentif mencakup badan hukum berbentuk perseroan terbatas (PT) dengan omzet tahunan kumulatif tidak melebihi Rp 5.000.000.000 (lima miliar rupiah), serta beroperasi secara dominan di bidang pengembangan peranti lunak, kriya, kuliner, dan game lokal.",
      "Tata cara pelaporan diwajibkan secara periodik triwulanan menggunakan aplikasi DJP Online paling lambat tanggal 20 bulan berikutnya setelah masa pajak berakhir. Kelalaian administrasi membatalkan kelayakan status insentif secara otomatis."
    ],
    ocrText: "LEMBARAN NEGARA REPUBLIK INDONESIA [OCR RECONSTRUCTED TEXT] \nMENTERI KEUANGAN RI... MENETAPKAN STIMULUS FISKAL DTP 2026... KRITERIA PENERIMA OMZET MAKSIMUM Rp 5.000.000.000... PELAPORAN PERIODIK TRIWULANAN DJP ONLINE..."
  });

  const [activePage, setActivePage] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(100);
  const [searchWord, setSearchWord] = useState<string>('');
  const [ocrMode, setOcrMode] = useState<boolean>(false);
  
  // Exporters States
  const [copied, setCopied] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [downloadDone, setDownloadDone] = useState<boolean>(false);

  const docsList: DocumentItem[] = [
    {
      id: 'doc-1',
      title: 'PMK No. 42 Tahun 2026: Pemberian Insentif Pajak Penghasilan Final DTP Bagi Startup Sektor Ekonomi Kreatif',
      type: 'PDF',
      category: 'Regulation',
      size: '2.4 MB',
      pagesCount: 3,
      author: 'Kementerian Keuangan Republik Indonesia',
      publishedAt: '20 Juni 2026',
      summary: 'Draf aturan lengkap mengenai tata kelola, kriteria penerima omzet maksimum Rp 5 Miliar, pendaftaran wajib pajak digital, serta tata cara pelaporan pajak ditanggung pemerintah (DTP). Aturan ini dirancang guna memicu perluasan inklusi pendanaan teknologi daerah.',
      aiKeywords: ['Pajak Ditanggung Pemerintah', 'Startup Kreatif', 'PMK-2026', 'Sri Mulyani', 'Infrastruktur Fiskal'],
      versionHistory: [
        { version: 'v1.0 (Draft)', date: '10 Mei 2026', note: 'Draft awal diserahkan ke Biro Hukum Kemenkeu.' },
        { version: 'v1.1 (Revisi)', date: '01 Juni 2026', note: 'Penyesuaian batas atas omzet dari Rp 3.5 Miliar menjadi Rp 5 Miliar.' },
        { version: 'v2.0 (Final)', date: '20 Juni 2026', note: 'Disahkan oleh Menkeu Sri Mulyani dan dicatatkan di lembaran negara.' }
      ],
      pages: [
        "Kementerian Keuangan RI menetapkan stimulus fiskal ditanggung pemerintah (DTP) tahun anggaran 2026. Aturan ini bermaksud merangsang investasi lokal dan meringankan laju arus modal usaha kecil mikro digital pasca kenaikan biaya operasional infrastruktur cloud global.",
        "Kriteria penerima insentif mencakup badan hukum berbentuk perseroan terbatas (PT) dengan omzet tahunan kumulatif tidak melebihi Rp 5.000.000.000 (lima miliar rupiah), serta beroperasi secara dominan di bidang pengembangan peranti lunak, kriya, kuliner, dan game lokal.",
        "Tata cara pelaporan diwajibkan secara periodik triwulanan menggunakan aplikasi DJP Online paling lambat tanggal 20 bulan berikutnya setelah masa pajak berakhir. Kelalaian administrasi membatalkan kelayakan status insentif secara otomatis."
      ],
      ocrText: "LEMBARAN NEGARA REPUBLIK INDONESIA [OCR RECONSTRUCTED TEXT] \nMENTERI KEUANGAN RI... MENETAPKAN STIMULUS FISKAL DTP 2026... KRITERIA PENERIMA OMZET MAKSIMUM Rp 5.000.000.000... PELAPORAN PERIODIK TRIWULANAN DJP ONLINE..."
    },
    {
      id: 'doc-2',
      title: 'Laporan Riset Preservasi Dialek Sunda & Melayu Berbasis Model Generative AI Komputasi Bahasa',
      type: 'PDF',
      category: 'Research',
      size: '4.8 MB',
      pagesCount: 2,
      author: 'Pusat Riset Komputasi Nasional & MIT Linguistics Lab',
      publishedAt: '12 Juni 2026',
      summary: 'Kajian empiris kolaboratif yang mengulas penyusunan korpus percakapan lokal, evaluasi akurasi LLM, serta implementasi asisten percakapan (voice assistant) kearifan lokal di Jawa Barat.',
      aiKeywords: ['Linguistik Komputasi', 'MIT Collaboration', 'Model Bahasa Sunda', 'Akurasi NLU 94%'],
      versionHistory: [
        { version: 'v1.0 (Pre-print)', date: '25 April 2026', note: 'Naskah awal disubmit ke Konferensi ACL.' }
      ],
      pages: [
        "Penelitian ini memetakan fonem dan leksikon sintaksis bahasa Sunda Priangan dan dialek Melayu pesisir guna melatih mesin kecerdasan buatan penangkap intensi (intent classifier). Model dilatih menggunakan 50 juta token lokal tersaring.",
        "Hasil eksperimen menunjukkan model model bahasa besar (LLM) khusus mencapai akurasi pemahaman konteks (NLU) sebesar 94.2% pada data pengujian rural. Aplikasi ini diuji untuk asisten medis digital perdesaan."
      ],
      ocrText: "RESEARCH PAPER [OCR RECONSTRUCTED TEXT] \nPRESERVATION OF SUNDANESE DIALECTS... MIT LINGUISTICS COLLABORATION... 94.2% ACCURACY SECURED ON RURAL MEDICAL USE CASES..."
    },
    {
      id: 'doc-3',
      title: 'Rencana Strategis Revitalisasi Kawasan Cagar Budaya & Wisata Heritage Gedung Sate 2026',
      type: 'DOCX',
      category: 'Report',
      size: '1.2 MB',
      pagesCount: 2,
      author: 'Badan Perencana Pembangunan Daerah (Bappeda) Jabar',
      publishedAt: '15 Juni 2026',
      summary: 'Dokumen panduan zonasi pariwisata terpadu, integrasi pedestrian pintar, pelestarian elemen arsitektur heritages peninggalan kolonial, serta skema pendanaan kreatif bersama pihak swasta.',
      aiKeywords: ['Cagar Budaya Jabar', 'Gedung Sate Bandung', 'Zonasi Wisata', 'Pariwisata Heritage'],
      versionHistory: [
        { version: 'v1.0 (Final)', date: '15 Juni 2026', note: 'Disetujui oleh Kepala Bappeda untuk diajukan ke sidang paripurna DPRD.' }
      ],
      pages: [
        "Revitalisasi kawasan Gedung Sate mencakup pembangunan koridor pedestrian ramah disabilitas yang menghubungkan Gasibu menuju Taman Lansia, penataan pedagang kaki lima formal, serta peluncuran museum augmented reality siber.",
        "Anggaran pemugaran cagar budaya ini diusulkan memakai skema pembiayaan KPBU (Kerjasama Pemerintah Badan Usaha) bernilai Rp 45 Miliar tanpa membebani neraca APBD pokok Jawa Barat."
      ],
      ocrText: "RANCANGAN KERJA BAPPEDA [OCR RECONSTRUCTED TEXT] \nREVITALISASI CAGAR BUDAYA GEDUNG SATE... PEDESTRIAN PINTAR GASIBU... SKEMA KPBU RP 45 MILIAR..."
    }
  ];

  const handleDownload = () => {
    if (downloading) return;
    setDownloading(true);
    setDownloadProgress(0);
    setDownloadDone(false);

    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloading(false);
          setDownloadDone(true);
          setTimeout(() => setDownloadDone(false), 3000);
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  const getCitationText = () => {
    return `${activeDoc.author}. (${activeDoc.publishedAt.split(' ').pop()}). ${activeDoc.title}. Bandung: INFOBOS Intelligence Archive.`;
  };

  const copyCitation = () => {
    navigator.clipboard.writeText(getCitationText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-sans text-left space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Layout className="h-6 w-6 text-[#2B7A78] dark:text-[#3a9c99]" />
            <h1 className="font-display font-black text-2xl md:text-3xl text-[#002B5B] dark:text-pink-400">INTELLECTUAL DOCUMENT CENTER</h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Gudang penyimpanan draf kebijakan publik, laporan statistik ekonomi makro, dan riset akademik terverifikasi.</p>
        </div>

        {/* Quick Download Banner Notification */}
        {downloadDone && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl px-4 py-2 text-xs font-semibold animate-bounce">
            🎉 Dokumen berhasil diunduh ke penyimpanan lokal Anda!
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Repository Directory List (4 columns) */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="font-display font-black text-xs text-[#002B5B] dark:text-pink-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-1.5">
            <FileText className="h-4.5 w-4.5 text-teal-600 dark:text-teal-400" />
            Repositori Dokumen Negara
          </h3>

          <div className="space-y-3">
            {docsList.map(doc => (
              <div 
                key={doc.id}
                onClick={() => {
                  setActiveDoc(doc);
                  setActivePage(0);
                  setOcrMode(false);
                }}
                className={`p-4 rounded-xl border cursor-pointer transition text-left space-y-2.5 ${
                  activeDoc.id === doc.id 
                    ? 'bg-teal-500/5 dark:bg-teal-950/20 border-[#2B7A78] dark:border-teal-500 shadow-sm' 
                    : 'bg-white dark:bg-[#0b1329] border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[8px] font-mono font-bold px-1.5 py-0.2 rounded uppercase ${
                      doc.type === 'PDF' 
                        ? 'bg-rose-100 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400' 
                        : 'bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400'
                    }`}>
                      {doc.type}
                    </span>
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono font-medium">{doc.size} • {doc.pagesCount} halaman</span>
                  </div>
                  <h4 className={`text-xs font-bold line-clamp-2 mt-1.5 leading-snug ${
                    activeDoc.id === doc.id ? 'text-[#002B5B] dark:text-teal-400' : 'text-[#002B5B] dark:text-slate-200'
                  }`}>
                    {doc.title}
                  </h4>
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold truncate">
                  By {doc.author}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Splitscreen Reader Panel (8 columns) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Controls Bar */}
          <div className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-xs">
            {/* Zoom / Navigation */}
            <div className="flex items-center gap-2.5">
              <button 
                onClick={() => setZoom(Math.max(50, zoom - 10))}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 transition"
                title="Zoom Out"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">{zoom}%</span>
              <button 
                onClick={() => setZoom(Math.min(150, zoom + 10))}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 transition"
                title="Zoom In"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              
              <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>

              {/* Page Selector */}
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => setActivePage(Math.max(0, activePage - 1))}
                  disabled={activePage === 0}
                  className="px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 rounded text-xs font-bold text-slate-700 dark:text-slate-300 transition"
                >
                  &larr;
                </button>
                <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">Halaman {activePage + 1} / {activeDoc.pagesCount}</span>
                <button 
                  onClick={() => setActivePage(Math.min(activeDoc.pagesCount - 1, activePage + 1))}
                  disabled={activePage === activeDoc.pagesCount - 1}
                  className="px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 rounded text-xs font-bold text-slate-700 dark:text-slate-300 transition"
                >
                  &rarr;
                </button>
              </div>
            </div>

            {/* OCR Toggle & In-Text Search */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              {/* Search Inside */}
              <div className="relative flex-1 sm:flex-initial">
                <input
                  type="text"
                  placeholder="Cari kata di teks..."
                  value={searchWord}
                  onChange={(e) => setSearchWord(e.target.value)}
                  className="pl-7 pr-3 py-1 bg-slate-150 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs w-full text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                />
                <Search className="absolute left-2.5 top-1.5 h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
              </div>

              {/* OCR Scanner Mode button */}
              <button 
                onClick={() => setOcrMode(!ocrMode)}
                className={`px-3 py-1 border rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  ocrMode 
                    ? 'bg-amber-500 border-amber-500 text-slate-950' 
                    : 'bg-white dark:bg-[#0b1329] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <RefreshCw className={`h-3.5 w-3.5 ${ocrMode ? 'animate-spin [animation-duration:12s]' : ''}`} />
                <span>{ocrMode ? 'OCR Aktif' : 'Pindai OCR'}</span>
              </button>
            </div>
          </div>

          {/* Document Screen Stage Canvas */}
          {activeDoc.id === 'doc-1' ? (
            <IntegrationWidget widgetId="widget-doc-pmk" className="mb-4" />
          ) : (
            <div className="bg-[#525659] dark:bg-[#1e1e1f] p-6 rounded-2xl border border-slate-300 dark:border-slate-800 min-h-[340px] flex items-center justify-center overflow-x-auto shadow-inner">
              <div 
                className="bg-white dark:bg-slate-900 border border-slate-400 dark:border-slate-800 shadow-2xl p-8 max-w-xl w-full text-left font-serif transition-transform duration-300 relative select-text"
                style={{ transform: `scale(${zoom / 100})` }}
              >
                {/* Document Header details inside paper */}
                <div className="border-b border-slate-200 dark:border-slate-800 pb-3 mb-6 flex items-start justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono uppercase tracking-widest font-bold">INFOBOS OFFICIAL TRANSCRIPT</div>
                    <div className="text-[9px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">AUTHOR: {activeDoc.author}</div>
                  </div>
                  <div className="text-xs font-mono font-bold text-[#002B5B] dark:text-teal-400">PMK-REG / {activeDoc.id.toUpperCase()}</div>
                </div>

                {/* Page Content text with highlighting simulated */}
                {ocrMode ? (
                  <div className="space-y-4 font-mono text-xs text-amber-700 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/20 p-4 border border-dashed border-amber-300 dark:border-amber-800 rounded-lg">
                    <div className="text-[9px] font-bold uppercase text-amber-800">Reconstructed OCR Plaintext Stream:</div>
                    <p className="whitespace-pre-line leading-relaxed">{activeDoc.ocrText}</p>
                  </div>
                ) : (
                  <div className="space-y-4 min-h-[180px] text-slate-800 dark:text-slate-200 text-sm md:text-base leading-relaxed">
                    <p>
                      {searchWord.trim() ? (
                        // simple split highlighting
                        activeDoc.pages[activePage].split(new RegExp(`(${searchWord})`, 'gi')).map((chunk, i) => 
                          chunk.toLowerCase() === searchWord.toLowerCase() 
                            ? <span key={i} className="bg-[#FFD700] text-slate-950 font-bold px-1 rounded shadow-2xs">{chunk}</span>
                            : <span key={i}>{chunk}</span>
                        )
                      ) : (
                        activeDoc.pages[activePage]
                      )}
                    </p>
                  </div>
                )}

                {/* Page Number footer inside paper */}
                <div className="border-t border-slate-100 dark:border-slate-800 mt-8 pt-2 text-center text-xs text-slate-400 dark:text-slate-500 font-mono">
                  Halaman {activePage + 1} dari {activeDoc.pagesCount} • Arsip Nasional Republik Indonesia
                </div>
              </div>
            </div>
          )}

          {/* AI Intelligence Tools & Export Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            
            {/* AI Summary and Keywords */}
            <div className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
                <Sparkles className="h-4.5 w-4.5 text-teal-600 dark:text-teal-400" />
                <h4 className="font-display font-black text-xs text-[#002B5B] dark:text-pink-400 uppercase tracking-wider">AI Insight & Keywords</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeDoc.summary}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeDoc.aiKeywords.map((tag, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded text-[10px] font-mono font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Document Citation, Exporters, and Version History */}
            <div className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
                <BookOpen className="h-4.5 w-4.5 text-teal-600 dark:text-teal-400" />
                <h4 className="font-display font-black text-xs text-[#002B5B] dark:text-pink-400 uppercase tracking-wider">Export & Citation</h4>
              </div>

              {/* Citation generator tool */}
              <div className="space-y-2">
                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">Kutipan APA 7th Edition:</span>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800 rounded-lg text-[11px] font-serif text-slate-700 dark:text-slate-300 leading-relaxed relative group">
                  <p>{getCitationText()}</p>
                  <button 
                    onClick={copyCitation}
                    className="absolute right-2 top-2 p-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition"
                    title="Copy Citation"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>

              {/* Action Buttons with progress */}
              <div className="pt-2">
                {downloading ? (
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">
                      <span>Mengunduh Dokumen...</span>
                      <span>{downloadProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-[#2B7A78] transition-all duration-350" style={{ width: `${downloadProgress}%` }}></div>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={handleDownload}
                    className="w-full py-2 bg-[#002B5B] hover:bg-[#001f42] text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Download className="h-4 w-4 text-[#FFD700]" />
                    Unduh Dokumen Berkas Asli ({activeDoc.size})
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Version History Log */}
          <div className="bg-slate-900 text-slate-300 p-5 rounded-2xl text-left border border-white/5 space-y-3">
            <h4 className="font-display font-black text-xs text-[#FFD700] uppercase tracking-wider border-b border-white/10 pb-2 flex items-center gap-1.5">
              <RotateCcw className="h-4 w-4 text-[#FFD700]" />
              Catatan Amandemen & Log Versi Resmi
            </h4>
            <div className="space-y-3.5 divide-y divide-white/5 text-xs">
              {activeDoc.versionHistory.map((log, idx) => (
                <div key={idx} className="pt-3 first:pt-0 flex flex-col sm:flex-row justify-between sm:items-start gap-1">
                  <div className="space-y-0.5">
                    <span className="font-mono font-bold text-white">{log.version}</span>
                    <p className="text-slate-400 leading-normal">{log.note}</p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 font-semibold shrink-0">{log.date}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
