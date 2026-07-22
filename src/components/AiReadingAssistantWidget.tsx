import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Layers, 
  RefreshCw, 
  Database, 
  Check, 
  Cpu, 
  CheckCircle2, 
  Info,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Flame,
  Binary,
  Volume2
} from 'lucide-react';

interface Claim {
  text: string;
  status: 'verified' | 'unverified' | 'misleading' | 'partially_true';
  statusText: string;
  source: string;
  explanation: string;
  highlightText?: string;
}

interface FactCheckData {
  summary: string;
  confidenceScore: number;
  claims: Claim[];
  sources: string[];
}

interface AiReadingAssistantWidgetProps {
  activeLanguage?: 'ID' | 'EN' | 'JV' | 'SD';
  data?: {
    title: string;
    summary?: string;
    [key: string]: any;
  };
  aiSummaryLevel?: 'normal' | 'kilat' | 'takeaways' | 'eli5';
  setAiSummaryLevel?: (level: 'normal' | 'kilat' | 'takeaways' | 'eli5') => void;
  
  factCheckActive?: boolean;
  factCheckScanning?: boolean;
  factCheckScanMessage?: string;
  factCheckScanProgress?: number;
  currentFactCheckData?: FactCheckData | null;
  selectedClaim?: Claim | null;
  setSelectedClaim?: (claim: Claim | null) => void;
  factCheckHighlightsActive?: boolean;
  setFactCheckHighlightsActive?: (active: boolean) => void;
  handleRunFactCheck?: () => void;
  
  activeMediaComp?: string;
  setActiveMediaComp?: (id: string) => void;
  
  cardThemeClasses?: string;
  innerBoxThemeClasses?: string;
  textMutedClasses?: string;
  headingClasses?: string;
  contrastTheme?: string;

  whyItMattersText?: string;
  ttsPlaying?: boolean;
  ttsCurrentIndex?: number;
  hideHeader?: boolean;
}

export const AiReadingAssistantWidget: React.FC<AiReadingAssistantWidgetProps> = ({
  activeLanguage: propActiveLanguage,
  data: propData,
  aiSummaryLevel: propAiSummaryLevel,
  setAiSummaryLevel: propSetAiSummaryLevel,
  factCheckActive: propFactCheckActive,
  factCheckScanning: propFactCheckScanning,
  factCheckScanMessage: propFactCheckScanMessage,
  factCheckScanProgress: propFactCheckScanProgress,
  currentFactCheckData: propCurrentFactCheckData,
  selectedClaim: propSelectedClaim,
  setSelectedClaim: propSetSelectedClaim,
  factCheckHighlightsActive: propFactCheckHighlightsActive,
  setFactCheckHighlightsActive: propSetFactCheckHighlightsActive,
  handleRunFactCheck: propHandleRunFactCheck,
  activeMediaComp: propActiveMediaComp,
  setActiveMediaComp: propSetActiveMediaComp,
  cardThemeClasses: propCardThemeClasses,
  innerBoxThemeClasses: propInnerBoxThemeClasses,
  textMutedClasses: propTextMutedClasses,
  headingClasses: propHeadingClasses,
  contrastTheme: propContrastTheme,
  whyItMattersText: propWhyItMattersText,
  ttsPlaying: propTtsPlaying = false,
  ttsCurrentIndex: propTtsCurrentIndex = -1,
  hideHeader = false
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  // Fallback states if props are not provided
  const [localSummaryLevel, setLocalSummaryLevel] = useState<'normal' | 'kilat' | 'takeaways' | 'eli5'>('normal');
  const [localFactCheckActive, setLocalFactCheckActive] = useState<boolean>(false);
  const [localFactCheckScanning, setLocalFactCheckScanning] = useState<boolean>(false);
  const [localFactCheckScanMessage, setLocalFactCheckScanMessage] = useState<string>('');
  const [localFactCheckScanProgress, setLocalFactCheckScanProgress] = useState<number>(0);
  const [localSelectedClaim, setLocalSelectedClaim] = useState<Claim | null>(null);
  const [localFactCheckHighlightsActive, setLocalFactCheckHighlightsActive] = useState<boolean>(false);
  const [localActiveMediaComp, setLocalActiveMediaComp] = useState<string>('infobos');

  // Resolved states mapping to parameters or local fallbacks
  const activeLanguage = propActiveLanguage || 'ID';
  const data = propData || { title: "Penataan Cagar Budaya & Revitalisasi Terpadu Koridor Braga", summary: "Revitalisasi terpadu koridor pariwisata cagar budaya Braga dan Gedung Sate resmi diluncurkan oleh Pemprov Jabar guna mendorong akselerasi ekonomi kreatif lokal dan perlindungan struktural seismik." };
  
  const aiSummaryLevel = propAiSummaryLevel !== undefined ? propAiSummaryLevel : localSummaryLevel;
  const setAiSummaryLevel = propSetAiSummaryLevel || setLocalSummaryLevel;

  const factCheckActive = propFactCheckActive !== undefined ? propFactCheckActive : localFactCheckActive;
  const factCheckScanning = propFactCheckScanning !== undefined ? propFactCheckScanning : localFactCheckScanning;
  const factCheckScanMessage = propFactCheckScanMessage !== undefined ? propFactCheckScanMessage : localFactCheckScanMessage;
  const factCheckScanProgress = propFactCheckScanProgress !== undefined ? propFactCheckScanProgress : localFactCheckScanProgress;

  const defaultFactCheckData: FactCheckData = {
    summary: "Analisis silang AI mendeteksi 3 klaim administratif utama dalam berita. Tingkat keselarasan data APBD Jawa Barat 2026 berada pada tingkat presisi tinggi.",
    confidenceScore: 94,
    claims: [
      {
        text: "Total dana Rp 45.2 Miliar dicairkan langsung untuk renovasi Jalan Braga",
        status: 'verified',
        statusText: 'TERVERIFIKASI',
        explanation: 'Sesuai dengan lampiran rincian pagu APBD Pemprov Jabar Tahun Anggaran 2026 Dinas Perumahan dan Permukiman.',
        source: 'DPA Dinas Perkim Jabar 2026',
        highlightText: 'Total dana Rp 45.2 Miliar dicairkan langsung untuk renovasi'
      },
      {
        text: "Perputaran transaksi ritel mikro/UMKM bertumbuh 35% pada kuartal mendatang",
        status: 'unverified',
        statusText: 'PROYEKSI / UNVERIFIED',
        explanation: 'Ini merupakan angka proyeksi optimis dari asosiasi pedagang lokal, belum ada realisasi berbasis laporan triwulanan BPS.',
        source: 'Kajian Ekonomi Kreatif Regional 2026',
        highlightText: 'perputaran transaksi ritel mikro/UMKM diproyeksikan bertumbuh 35%'
      },
      {
        text: "Sesar Lembang berjarak sangat dekat sehingga arsitek menerapkan damper seismik khusus",
        status: 'verified',
        statusText: 'TERVERIFIKASI',
        explanation: 'Sesuai rekomendasi BPBD Jabar dan Pusat Vulkanologi dan Mitigasi Bencana Geologi (PVMBG) untuk bangunan bersejarah zona rawan.',
        source: 'Rekomendasi Kebencanaan PVMBG',
        highlightText: 'Mengingat jalur sesar Lembang yang berjarak dekat, arsitek menerapkan damper seismik'
      }
    ],
    sources: ["Pusat Data Nasional", "Portal Satu Data Jawa Barat", "Arsip Berita Terintegrasi Jabar"]
  };

  const currentFactCheckData = propCurrentFactCheckData !== undefined ? propCurrentFactCheckData : (factCheckActive ? defaultFactCheckData : null);
  const selectedClaim = propSelectedClaim !== undefined ? propSelectedClaim : localSelectedClaim;
  const setSelectedClaim = propSetSelectedClaim || setLocalSelectedClaim;

  const factCheckHighlightsActive = propFactCheckHighlightsActive !== undefined ? propFactCheckHighlightsActive : localFactCheckHighlightsActive;
  const setFactCheckHighlightsActive = propSetFactCheckHighlightsActive || setLocalFactCheckHighlightsActive;

  const activeMediaComp = propActiveMediaComp !== undefined ? propActiveMediaComp : localActiveMediaComp;
  const setActiveMediaComp = propSetActiveMediaComp || setLocalActiveMediaComp;

  const cardThemeClasses = propCardThemeClasses || 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800';
  const innerBoxThemeClasses = propInnerBoxThemeClasses || 'bg-slate-50/50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800/60';
  const textMutedClasses = propTextMutedClasses || 'text-slate-500 dark:text-slate-400';
  const headingClasses = propHeadingClasses || 'text-slate-800 dark:text-slate-200';
  const contrastTheme = propContrastTheme || 'light';
  
  const whyItMattersText = propWhyItMattersText || data.summary || "Revitalisasi terpadu koridor pariwisata cagar budaya Braga dan Gedung Sate resmi diluncurkan oleh Pemprov Jabar guna mendorong akselerasi ekonomi kreatif lokal dan perlindungan struktural seismik.";
  const ttsPlaying = propTtsPlaying;
  const ttsCurrentIndex = propTtsCurrentIndex;

  const handleRunFactCheck = () => {
    if (propHandleRunFactCheck) {
      propHandleRunFactCheck();
      return;
    }

    if (localFactCheckScanning) return;
    setLocalFactCheckActive(true);
    setLocalFactCheckScanning(true);
    setLocalFactCheckScanProgress(5);
    setLocalFactCheckScanMessage("Membaca seluruh naskah berita...");
    setLocalSelectedClaim(null);

    const steps = [
      { progress: 20, message: "Mengekstrak klaim kuantitatif kunci..." },
      { progress: 45, message: "Mencocokkan klaim dengan Bank Data Pemprov & BPS..." },
      { progress: 75, message: "Menganalisis bias kalimat & silang data pers..." },
      { progress: 90, message: "Menghitung Skor Kepercayaan (Confidence Score)..." },
      { progress: 100, message: "Pemeriksaan Selesai! 100% tervalidasi." }
    ];

    steps.forEach((step, i) => {
      setTimeout(() => {
        setLocalFactCheckScanProgress(step.progress);
        setLocalFactCheckScanMessage(step.message);
        if (step.progress === 100) {
          setLocalFactCheckScanning(false);
          setLocalFactCheckHighlightsActive(true);
        }
      }, (i + 1) * 600);
    });
  };

  // Dynamic Translations based on language in ArticleDetail
  const summaryTranslations: Record<'ID' | 'EN' | 'JV' | 'SD', string> = {
    ID: data.summary || "Penataan cagar budaya regional dalam melestarikan aset bersejarah.",
    EN: "Why It Matters: Urban revitalization of Bandung's heritage zone isn't just about colonial preservation; it stimulates regional tourism economy directly benefiting thousands of creative economy workers.",
    JV: "Nopo Perkara Iki Penting: Pangopenan cagar budaya kuto Bandung mboten namung bab sejarah kolonial, nanging ugo ngundhakake pariwisata sing nduwe efek langsung marang ewu buruh kreatif.",
    SD: "Naha Perkara Ieu Penting: Pangokolakeun cagar budaya kota Bandung sanes ngan perkawis sajarah kolonial, tapi ogé ningkatkeun pariwisata anu gaduh pangaruh langsung ka rébuan pagawé kreatif."
  };
  const currentSummary = summaryTranslations[activeLanguage] || data.summary || "";
  const isExpandedEffective = hideHeader ? true : isExpanded;

  return (
    <div 
      className={`border rounded-2xl p-5 sm:p-6 text-left space-y-5 shadow-lg transition-all duration-300 relative overflow-hidden ${cardThemeClasses} ${
        contrastTheme === 'dark' 
          ? 'shadow-indigo-950/20 ring-1 ring-slate-800' 
          : 'shadow-slate-200/50'
      }`}
      id="ai-reading-assistant-widget"
    >
      {/* Background Decorative Gradient Light Effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 dark:bg-teal-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 dark:bg-indigo-400/5 rounded-full blur-3xl pointer-events-none" />

      {/* Widget Header with Collapse toggle */}
      {!hideHeader && (
        <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800 pb-4 gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-teal-500 to-indigo-600 text-white rounded-xl shadow-md flex items-center justify-center">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h4 className={`text-xs font-mono font-extrabold uppercase tracking-widest ${headingClasses}`}>
                  ASISTEN AI LITE: METODE BACA &amp; VERIFIKASI MULTIDIMENSI
                </h4>
                <span className="bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  ACTIVE
                </span>
              </div>
              <p className={`text-[10px] ${textMutedClasses}`}>Verifikasi klaim instan, ringkasan berlapis, dan agregasi media transparan.</p>
            </div>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`p-1.5 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-900 transition ${innerBoxThemeClasses}`}
            title={isExpanded ? "Collapse Widget" : "Expand Widget"}
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      )}

      <AnimatePresence initial={false}>
        {isExpandedEffective && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 overflow-hidden relative z-10"
          >
            {/* WHY IT MATTERS CALLOUT BLOCK */}
            <div className={`p-4 rounded-2xl border relative overflow-hidden transition-all duration-300 ${
              ttsPlaying && ttsCurrentIndex === 2 
                ? 'bg-indigo-600/5 dark:bg-indigo-500/5 border-indigo-500/40 shadow-md ring-1 ring-indigo-500/20' 
                : 'bg-teal-500/5 dark:bg-teal-500/5 border-teal-500/20 dark:border-teal-500/10'
            }`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 dark:bg-teal-400/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-start gap-3">
                <div className={`p-1.5 rounded-lg text-white mt-0.5 shrink-0 shadow-sm ${
                  ttsPlaying && ttsCurrentIndex === 2 ? 'bg-indigo-600' : 'bg-teal-600'
                }`}>
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <div className="space-y-1">
                  <span className={`text-[9px] font-mono font-black tracking-widest uppercase block ${
                    ttsPlaying && ttsCurrentIndex === 2 
                      ? contrastTheme === 'dark' ? 'text-indigo-400 animate-pulse' : 'text-indigo-600 animate-pulse'
                      : contrastTheme === 'dark' ? 'text-teal-400' : 'text-teal-700'
                  }`}>
                    WHY IT MATTERS / RINGKASAN DATA
                  </span>
                  <p className={`text-xs md:text-sm leading-relaxed font-semibold transition-all duration-300 ${
                    ttsPlaying && ttsCurrentIndex === 2 
                      ? contrastTheme === 'dark' ? 'text-indigo-300 font-bold' : 'text-indigo-600 font-bold'
                      : contrastTheme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    {whyItMattersText}
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 1: Multi-level Summary Selector & Output */}
            <div className="space-y-3">
              <div className="flex flex-col gap-2.5">
                <span className={`text-[10px] font-mono font-extrabold uppercase tracking-widest flex items-center gap-1.5 ${headingClasses}`}>
                  🎯 Tingkat Ringkasan AI:
                  <Info 
                    className="h-3.5 w-3.5 text-slate-400 hover:text-teal-500 cursor-pointer" 
                    onClick={() => setShowTooltip(showTooltip === 'summary' ? null : 'summary')}
                  />
                </span>

                <div className={`grid grid-cols-2 sm:grid-cols-4 gap-1 p-1 rounded-xl border ${
                  contrastTheme === 'dark' 
                    ? 'bg-slate-900/40 border-slate-800/80' 
                    : 'bg-slate-100/60 border-slate-200/50'
                }`}>
                  {[
                    { id: 'normal', label: 'Teks Lengkap' },
                    { id: 'kilat', label: 'Ringkasan Kilat' },
                    { id: 'takeaways', label: 'Poin Kunci' },
                    { id: 'eli5', label: 'ELI5 (Anak Kecil)' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setAiSummaryLevel(opt.id as any)}
                      className={`px-2.5 py-1.5 rounded-lg text-[10px] font-mono font-bold transition-all duration-200 cursor-pointer text-center ${
                        aiSummaryLevel === opt.id 
                          ? 'bg-teal-600 text-white font-extrabold shadow-sm hover:bg-teal-500' 
                          : contrastTheme === 'dark'
                            ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                            : 'text-slate-500 hover:text-slate-850 hover:bg-slate-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tooltip summary info */}
              {showTooltip === 'summary' && (
                <div className={`p-3 border rounded-xl text-[10px] font-mono ${
                  contrastTheme === 'dark'
                    ? 'bg-teal-950/40 border-teal-850 text-teal-300'
                    : 'bg-teal-500/10 border-teal-500/25 text-teal-800'
                }`}>
                  Fitur ini memungkinkan Anda menyesuaikan kedalaman ringkasan artikel. Pilih antara teks lengkap jurnalisme mendalam, satu kalimat kilat, poin-poin kunci utama, atau penjelasan ELI5 (Explain Like I'm 5) yang mudah dimengerti.
                </div>
              )}

              {/* Summary Output Box */}
              <AnimatePresence mode="wait">
                {aiSummaryLevel !== 'normal' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`border rounded-2xl p-4 space-y-2.5 shadow-inner ${
                      contrastTheme === 'dark'
                        ? 'bg-slate-900 border-slate-800 text-slate-100 shadow-none'
                        : innerBoxThemeClasses
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[8px] font-mono font-black uppercase tracking-widest flex items-center gap-1 ${
                        contrastTheme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                      }`}>
                        <Binary className="h-3 w-3" /> AI-Generated Summary Output
                      </span>
                      <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded uppercase font-bold ${
                        contrastTheme === 'dark'
                          ? 'text-slate-400 bg-slate-800'
                          : 'text-slate-500 bg-slate-200/50'
                      }`}>
                        Generative Mode
                      </span>
                    </div>
                    
                    {aiSummaryLevel === 'kilat' && (
                      <p className={`text-xs font-bold leading-relaxed italic ${
                        contrastTheme === 'dark' ? 'text-teal-300' : 'text-teal-700'
                      }`}>
                        &ldquo;Revitalisasi terpadu koridor pariwisata cagar budaya Braga dan Gedung Sate resmi diluncurkan oleh Pemprov Jabar guna mendorong akselerasi ekonomi kreatif lokal dan perlindungan struktural seismik.&rdquo;
                      </p>
                    )}

                    {aiSummaryLevel === 'takeaways' && (
                      <ul className="space-y-2 text-xs">
                        <li className="flex gap-2 items-start">
                          <span className={`font-mono mt-0.5 ${contrastTheme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`}>•</span>
                          <span className={contrastTheme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                            <strong className={contrastTheme === 'dark' ? 'text-teal-300' : 'text-teal-600 font-bold'}>Pagu Alokasi APBD:</strong> Total dana Rp 45.2 Miliar dicairkan langsung untuk renovasi trotoar, tata letak, dan penguatan pondasi bersejarah.
                          </span>
                        </li>
                        <li className="flex gap-2 items-start">
                          <span className={`font-mono mt-0.5 ${contrastTheme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`}>•</span>
                          <span className={contrastTheme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                            <strong className={contrastTheme === 'dark' ? 'text-teal-300' : 'text-teal-600 font-bold'}>Dampak Ekonomi Lokal:</strong> Soni Sanjaya melaporkan perputaran transaksi ritel mikro/UMKM diproyeksikan bertumbuh 35% pada kuartal mendatang.
                          </span>
                        </li>
                        <li className="flex gap-2 items-start">
                          <span className={`font-mono mt-0.5 ${contrastTheme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`}>•</span>
                          <span className={contrastTheme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                            <strong className={contrastTheme === 'dark' ? 'text-teal-300' : 'text-teal-600 font-bold'}>Mitigasi Geografis:</strong> Mengingat jalur sesar Lembang yang berjarak dekat, arsitek menerapkan damper seismik khusus di bangunan heritage.
                          </span>
                        </li>
                      </ul>
                    )}

                    {aiSummaryLevel === 'eli5' && (
                      <div className="space-y-2 text-xs">
                        <p className={`leading-relaxed ${
                          contrastTheme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                        }`}>
                          🐣 <strong>Penjelasan Sederhana:</strong> Bayangkan Gedung Sate dan Jalan Braga itu seperti istana mainan kuno yang sangat indah, tapi catnya sudah mulai mengelupas dan lantainya agak goyang.
                        </p>
                        <p className={`leading-relaxed ${
                          contrastTheme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                        }`}>
                          Pemerintah sekarang memberikan uang saku untuk membeli bahan perbaikan istana mainan tersebut. Ketika istananya diperbaiki, akan ada banyak sekali teman-teman baru yang datang bermain di sana, membeli mainan dan kue dari warga sekitar, sehingga semua orang menjadi senang dan sejahtera dengan aman!
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* SECTION 2: Interactive Fact Checker Claims */}
            <div id="ai-fact-checker-panel" className="pt-4 border-t border-slate-200/60 dark:border-slate-800 space-y-3 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className={`text-[10px] font-mono font-black uppercase tracking-widest flex items-center gap-1.5 ${
                  contrastTheme === 'dark' ? 'text-rose-400' : 'text-rose-500'
                }`}>
                  🔍 AI FACT CHECKER (CEK FAKTA MULTIDIMENSI AI)
                  <Info 
                    className="h-3.5 w-3.5 text-slate-400 hover:text-rose-500 cursor-pointer" 
                    onClick={() => setShowTooltip(showTooltip === 'factcheck' ? null : 'factcheck')}
                  />
                </span>
                
                {showTooltip === 'factcheck' && (
                  <div className={`p-3 border rounded-xl text-[10px] font-mono w-full block ${
                    contrastTheme === 'dark'
                      ? 'bg-rose-950/40 border-rose-500/25 text-rose-300'
                      : 'bg-rose-500/10 border-rose-500/25 text-rose-800'
                  }`}>
                    Modul cek fakta ini menganalisis silang klaim-klaim numerik dan administratif dalam teks berita terhadap basis data resmi terverifikasi untuk menentukan tingkat akurasi jurnalistik secara waktu nyata.
                  </div>
                )}

                {!factCheckActive && !factCheckScanning && (
                  <button
                    onClick={handleRunFactCheck}
                    className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-[10px] font-mono font-bold tracking-wider transition-all flex items-center gap-1.5 shadow-md hover:scale-[1.02] cursor-pointer"
                  >
                    <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                    JALANKAN ANALISIS FAKTA AI
                  </button>
                )}

                {factCheckActive && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => setFactCheckHighlightsActive(!factCheckHighlightsActive)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold transition cursor-pointer flex items-center gap-1.5 ${
                        factCheckHighlightsActive
                          ? 'bg-rose-600 text-white border border-rose-700 shadow-sm'
                          : contrastTheme === 'dark'
                            ? 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-250 hover:bg-slate-900/60'
                            : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      <Layers className="h-3.5 w-3.5" />
                      SOROT TEKS: {factCheckHighlightsActive ? 'AKTIF' : 'NON-AKTIF'}
                    </button>
                    
                    <button
                      onClick={handleRunFactCheck}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                        contrastTheme === 'dark'
                          ? 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-900 hover:text-slate-100'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-800'
                      }`}
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      RE-SCAN
                    </button>
                  </div>
                )}
              </div>

              {/* Progress bar during scan */}
              {factCheckScanning && (
                <div className={`p-4 rounded-xl border space-y-2.5 ${innerBoxThemeClasses}`}>
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className={`font-bold animate-pulse flex items-center gap-1.5 ${
                      contrastTheme === 'dark' ? 'text-rose-400' : 'text-rose-600'
                    }`}>
                      <Cpu className="h-3.5 w-3.5 animate-spin text-rose-500" /> {factCheckScanMessage}
                    </span>
                    <span className={`font-bold ${contrastTheme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>{factCheckScanProgress}%</span>
                  </div>
                  <div className={`w-full h-2.5 rounded-full overflow-hidden border relative ${
                    contrastTheme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-slate-200 border-slate-300/30'
                  }`}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${factCheckScanProgress}%` }}
                      transition={{ duration: 0.2 }}
                      className="bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 h-full rounded-full absolute inset-y-0 left-0" 
                    />
                  </div>
                </div>
              )}

              {/* Main AI Fact Checker results */}
              <AnimatePresence mode="wait">
                {factCheckActive && !factCheckScanning && currentFactCheckData && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 font-sans"
                  >
                    {/* Confidence Score Card */}
                    <div className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${innerBoxThemeClasses}`}>
                      <div className="space-y-2 md:max-w-[70%]">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                            contrastTheme === 'dark'
                              ? 'bg-rose-950/40 border-rose-500/20 text-rose-400'
                              : 'bg-rose-500/10 border-rose-500/20 text-rose-800'
                          }`}>
                            <ShieldCheck className="h-3 w-3 text-rose-500" /> METODE INTELLIGENCE NODE
                          </span>
                          <span className={`${textMutedClasses} text-[10px] font-mono`}>• Terhubung ke 3 Database Pemerintah</span>
                        </div>
                        <p className={`text-[11.5px] leading-relaxed font-medium ${
                          contrastTheme === 'dark' ? 'text-slate-100' : 'text-slate-800'
                        }`}>
                          {currentFactCheckData.summary}
                        </p>
                      </div>

                      <div className={`flex items-center gap-3 p-3 rounded-xl border self-start md:self-auto min-w-[160px] justify-center ${
                        contrastTheme === 'dark'
                          ? 'bg-slate-900/30 border-slate-800/80'
                          : 'bg-slate-100/50 border-slate-200/60'
                      }`}>
                        <div className="text-center">
                          <span className={`text-[9px] font-mono block uppercase font-bold tracking-wider ${textMutedClasses}`}>CONFIDENCE SCORE</span>
                          <span className={`text-2xl font-black font-mono tracking-tighter flex items-center justify-center gap-1 ${
                            currentFactCheckData.confidenceScore >= 90 ? 'text-emerald-500' :
                            currentFactCheckData.confidenceScore >= 75 ? 'text-amber-500' : 'text-rose-500'
                          }`}>
                            <Flame className="h-5 w-5 text-amber-500 animate-pulse" /> {currentFactCheckData.confidenceScore}%
                          </span>
                          <span className={`text-[9px] font-mono block mt-0.5 ${textMutedClasses}`}>
                            {currentFactCheckData.confidenceScore >= 90 ? 'Akurasi Sangat Tinggi' :
                             currentFactCheckData.confidenceScore >= 75 ? 'Akurasi Sedang (Perlu Validasi)' : 'Rendah'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Claims Vertical Stack List */}
                    <div className="space-y-2.5">
                      {currentFactCheckData.claims.map((claim, index) => {
                        let leftBorderClass = "border-l-4 border-l-amber-500";
                        let statusColor = contrastTheme === 'dark'
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : "bg-amber-500/10 text-amber-800 border-amber-500/20";
                        if (claim.status === 'verified') {
                          leftBorderClass = "border-l-4 border-l-emerald-500";
                          statusColor = contrastTheme === 'dark'
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-emerald-500/10 text-emerald-800 border-emerald-500/20";
                        }
                        if (claim.status === 'misleading') {
                          leftBorderClass = "border-l-4 border-l-rose-500";
                          statusColor = contrastTheme === 'dark'
                            ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                            : "bg-rose-500/10 text-rose-800 border-rose-500/20";
                        }
                        
                        const isSelected = selectedClaim && selectedClaim.text === claim.text;

                        return (
                          <motion.div 
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.15 }}
                            key={index} 
                            onClick={() => setSelectedClaim(isSelected ? null : claim)}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${leftBorderClass} ${
                              isSelected 
                                ? contrastTheme === 'dark'
                                  ? 'bg-rose-500/5 border-rose-500 ring-2 ring-rose-500/10 shadow-md text-slate-100'
                                  : 'bg-rose-500/5 border-rose-500 ring-2 ring-rose-500/10 shadow-md text-slate-900' 
                                : `${innerBoxThemeClasses} hover:border-slate-400`
                            }`}
                          >
                            <div className="flex justify-between items-center text-[9px] font-mono mb-1.5">
                              <span className={`${textMutedClasses} font-bold`}>KLAIM UTAMA {index + 1}</span>
                              <span className={`px-1.5 py-0.5 rounded font-black border text-[9px] uppercase tracking-wider ${statusColor}`}>
                                {claim.statusText}
                              </span>
                            </div>
                            <p className={`font-bold text-[11.5px] leading-snug ${
                              contrastTheme === 'dark' ? 'text-slate-200' : 'text-slate-800'
                            }`}>
                              &ldquo;{claim.text}&rdquo;
                            </p>
                            <p className={`text-[9.5px] mt-2 flex items-center gap-1 ${textMutedClasses}`}>
                              <Database className="h-3 w-3 text-slate-400" />
                              Sumber rujukan: <span className={`font-semibold ${
                                contrastTheme === 'dark' ? 'text-slate-350' : 'text-slate-600'
                              }`}>{claim.source}</span>
                            </p>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Selected Claim Deep Detail */}
                    <AnimatePresence>
                      {selectedClaim && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className={`p-4 rounded-xl border space-y-2.5 overflow-hidden relative ${
                            selectedClaim.status === 'verified'
                              ? contrastTheme === 'dark' ? 'bg-emerald-500/5 border-emerald-500/40' : 'bg-emerald-500/5 border-emerald-500/20'
                              : selectedClaim.status === 'misleading'
                                ? contrastTheme === 'dark' ? 'bg-rose-500/5 border-rose-500/40' : 'bg-rose-500/5 border-rose-500/20'
                                : contrastTheme === 'dark' ? 'bg-amber-500/5 border-amber-500/40' : 'bg-amber-500/5 border-amber-500/20'
                          }`}
                        >
                          <div className="flex justify-between items-start gap-2">
                            <div className="space-y-0.5">
                              <span className={`text-[9px] font-mono font-bold uppercase tracking-wider block ${
                                selectedClaim.status === 'verified' ? 'text-emerald-500' :
                                selectedClaim.status === 'misleading' ? 'text-rose-500' :
                                'text-amber-500'
                              }`}>
                                ANALISIS DETAIL KLAIM AI
                              </span>
                              <p className={`font-extrabold text-[12px] leading-tight ${
                                contrastTheme === 'dark' ? 'text-slate-100' : 'text-slate-900'
                              }`}>&ldquo;{selectedClaim.text}&rdquo;</p>
                            </div>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedClaim(null);
                              }}
                              className={`px-2 py-1 text-[10px] font-mono font-bold rounded-md transition ${
                                contrastTheme === 'dark'
                                  ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                              }`}
                            >
                              TUTUP ✕
                            </button>
                          </div>
                          <div className={`text-[11.5px] leading-relaxed space-y-2 pt-2.5 border-t font-sans ${
                            contrastTheme === 'dark' ? 'border-slate-800/60' : 'border-slate-200/50'
                          }`}>
                            <p className={`${
                              contrastTheme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                            }`}>
                              <strong className={`font-bold ${
                                contrastTheme === 'dark' ? 'text-slate-100' : 'text-slate-900'
                              }`}>Bukti Analisis AI:</strong> {selectedClaim.explanation}
                            </p>
                            {selectedClaim.highlightText && (
                              <p className={`text-[10px] italic ${textMutedClasses}`}>
                                * Teks ini disorot dalam naskah berita pada bagian: &ldquo;{selectedClaim.highlightText}&rdquo;
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Verified Sources references */}
                    <div className={`p-3 rounded-xl border flex flex-wrap items-center gap-2 text-[10px] font-mono ${innerBoxThemeClasses}`}>
                      <span className={`font-bold uppercase ${textMutedClasses}`}>SUMBER RUJUKAN:</span>
                      {currentFactCheckData.sources.map((src, sIdx) => (
                        <span key={sIdx} className={`px-2.5 py-0.5 rounded-lg border flex items-center gap-1 shadow-sm ${
                          contrastTheme === 'dark'
                            ? 'bg-slate-900 border-slate-800 text-slate-300'
                            : 'bg-slate-100 border-slate-200 text-slate-700'
                        }`}>
                          <Check className="h-2.5 w-2.5 text-emerald-500" />
                          {src}
                        </span>
                      ))}
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

              {/* Default placeholder state if not ran yet */}
              {!factCheckActive && !factCheckScanning && (
                <div className={`p-5 rounded-xl border text-center space-y-3 ${
                  contrastTheme === 'dark'
                    ? 'bg-slate-900 border-slate-800/80 text-slate-100 shadow-none'
                    : innerBoxThemeClasses
                }`}>
                  <p className={`text-[11px] leading-relaxed ${
                    contrastTheme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    Sistem AI dapat melakukan pencocokan silang data terhadap data resmi Pemprov Jabar, Dewan Pers, dan portal data tepercaya untuk mengukur akurasi laporan serta menandai klaim yang berpotensi menyesatkan.
                  </p>
                  <button 
                    onClick={handleRunFactCheck}
                    className="px-4 py-2.5 bg-rose-600 text-white hover:bg-rose-500 rounded-xl text-[10px] font-mono font-bold tracking-wider transition inline-flex items-center gap-1.5 cursor-pointer shadow-md hover:scale-[1.02] active:scale-95"
                  >
                    <Cpu className="h-3.5 w-3.5 text-white" />
                    Mulai Analisis Cek Fakta AI (+15 Poin)
                  </button>
                </div>
              )}
            </div>

            {/* SECTION 3: Media Comparison perspective aggregator */}
            <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 space-y-3">
              <span className={`text-[10px] font-mono font-black uppercase tracking-widest block ${headingClasses}`}>
                📊 MEDIA COMPARISON (PERBANDINGAN SUDUT PANDANG MEDIA)
              </span>
              
              <div className={`grid grid-cols-3 gap-1 p-1 rounded-xl border ${
                contrastTheme === 'dark'
                  ? 'bg-slate-900/40 border-slate-800/80'
                  : 'bg-slate-100/60 border-slate-200/50'
              }`}>
                {[
                  { id: 'infobos', label: 'InfoBOS' },
                  { id: 'arusutama', label: 'Arus Utama' },
                  { id: 'medsos', label: 'Media Sosial' }
                ].map(media => (
                  <button
                    key={media.id}
                    onClick={() => setActiveMediaComp(media.id)}
                    className={`px-2 py-1.5 rounded-lg text-[10px] font-mono font-bold transition-all duration-200 cursor-pointer text-center ${
                      activeMediaComp === media.id 
                        ? 'bg-indigo-600 text-white font-extrabold shadow-sm hover:bg-indigo-500' 
                        : contrastTheme === 'dark'
                          ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                          : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {media.label}
                  </button>
                ))}
              </div>

              <div className={`border p-4 rounded-xl text-xs leading-relaxed font-sans ${
                contrastTheme === 'dark'
                  ? 'bg-slate-900 border-slate-800/80'
                  : innerBoxThemeClasses
              }`}>
                {activeMediaComp === 'infobos' && (
                  <p className={contrastTheme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                    🌐 <strong className={contrastTheme === 'dark' ? 'text-teal-400 font-bold' : 'text-teal-600 font-bold'}>InfoBOS Digital Media:</strong> Menyoroti sinergi data fiskal APBD, regulasi tata ruang pariwisata Jawa Barat, and mitigasi teknis (seismik sesar Lembang) guna menjaga pilar cagar budaya tanpa memihak kepentingan politik manapun.
                  </p>
                )}
                {activeMediaComp === 'arusutama' && (
                  <p className={contrastTheme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                    📰 <strong className={contrastTheme === 'dark' ? 'text-indigo-300 font-bold' : 'text-indigo-600 font-bold'}>Media Arus Utama:</strong> Lebih berfokus pada polemik potensi kemacetan parah di Jalan Braga selama konstruksi berlangsung, serta menyoroti tuntutan pengemudi angkutan kota yang merasa terpinggirkan oleh jalur pejalan kaki baru.
                  </p>
                )}
                {activeMediaComp === 'medsos' && (
                  <p className={contrastTheme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                    💬 <strong className={contrastTheme === 'dark' ? 'text-pink-400 font-bold' : 'text-pink-600 font-bold'}>Media Sosial &amp; Buzzer:</strong> Dipenuhi ulasan antusias generasi muda tentang spot foto estetik baru (aesthetic photo spots) di trotoar Braga, menyuarakan sentimen 'Bandung vibes ala Eropa' tanpa memperdulikan aspek keselamatan geologis sesar aktif.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
