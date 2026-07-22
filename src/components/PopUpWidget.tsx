import React, { useState, useEffect } from 'react';
import { 
  X, MessageSquare, Activity, CloudRain, Coins, Notebook, Sparkles, 
  ChevronRight, RefreshCw, Check, Share2, CornerDownLeft, Volume2, AlertTriangle, Send, ChevronUp
} from 'lucide-react';

interface PopUpWidgetProps {
  activeArticleSlug?: string | null;
  showScrollTop?: boolean;
  scrollToTop?: () => void;
}

export default function PopUpWidget({ 
  activeArticleSlug = null,
  showScrollTop = false,
  scrollToTop
}: PopUpWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'bmkg' | 'currency' | 'memo' | 'ai'>('bmkg');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleOpenAiAssistant = () => {
    window.dispatchEvent(new CustomEvent('open-ai-assistant'));
    setIsMobileMenuOpen(false);
  };

  const handleOpenWidgetPortal = () => {
    setIsOpen(true);
    setIsMobileMenuOpen(false);
  };

  // BMKG Alert Tab State
  const [isShaking, setIsShaking] = useState(false);
  const [copiedAlert, setCopiedAlert] = useState(false);
  const [weatherCity, setWeatherCity] = useState<'Bandung' | 'Bogor' | 'Cirebon' | 'Garut'>('Bandung');
  const weatherData = {
    Bandung: { temp: 26, status: 'Gerimis Ringan', hum: 84, wind: '12 km/h' },
    Bogor: { temp: 24, status: 'Hujan Sedang', hum: 92, wind: '15 km/h' },
    Cirebon: { temp: 31, status: 'Cerah Berawan', hum: 60, wind: '18 km/h' },
    Garut: { temp: 22, status: 'Kabut Tipis', hum: 88, wind: '8 km/h' }
  };

  // Currency Converter Tab State
  const [idrAmount, setIdrAmount] = useState<number>(1000000);
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'EUR' | 'SGD' | 'JPY'>('USD');
  const conversionRates = { USD: 0.000064, EUR: 0.000059, SGD: 0.000086, JPY: 0.0102 };

  // Memo Pad Tab State
  const [memoText, setMemoText] = useState<string>(() => {
    return localStorage.getItem('infobos_widget_memo') || '';
  });
  const [memoSaved, setMemoSaved] = useState(false);

  useEffect(() => {
    localStorage.setItem('infobos_widget_memo', memoText);
  }, [memoText]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('infobos-widget-toggle', { detail: { isOpen } }));
  }, [isOpen]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('infobos-menu-toggle', { detail: { isOpen: isMobileMenuOpen } }));
  }, [isMobileMenuOpen]);

  // AI Assistant Tab State
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    { sender: 'ai', text: 'Halo! Saya asisten virtual InfoBos. Ada yang bisa saya bantu hari ini mengenai info gempa, cuaca, atau layanan redaksi?' }
  ]);
  const [inputVal, setInputVal] = useState('');

  const triggerSeismograph = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 2000);
  };

  const handleShareBMKG = () => {
    const text = `🚨 INFO GEMPA BUMI BMKG TERKINI 🚨\n📍 Lokasi: Darat 14 KM Timur Laut Kota Sukabumi\n📈 Magnitudo: M 3.1\n🕒 Waktu: Terkini (Siaga Jabar)\n📉 Kedalaman: 10 KM\n⚠️ Status: Tidak berpotensi tsunami\n(Dibagikan via Widget Portal InfoBos)`;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedAlert(true);
      setTimeout(() => setCopiedAlert(false), 2000);
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg = inputVal.trim();
    const updated = [...messages, { sender: 'user', text: userMsg }];
    setMessages(updated);
    setInputVal('');

    // Simulated local AI reply matching common Indonesian queries
    setTimeout(() => {
      let aiReply = "Maaf, saya tidak mengerti pertanyaan tersebut. Coba tanyakan tentang 'gempa', 'cuaca', 'kurs', atau 'layanan'!";
      const lower = userMsg.toLowerCase();
      if (lower.includes('gempa') || lower.includes('megathrust') || lower.includes('seismik')) {
        aiReply = "BMKG Jabar memantau aktivitas seismik Sesar Lembang dalam status waspada mikro. Kejadian gempa bumi terkini terdeteksi bermagnitudo M 3.1 di lepas pantai Sukabumi, aman dari potensi tsunami.";
      } else if (lower.includes('cuaca') || lower.includes('hujan') || lower.includes('suhu')) {
        aiReply = "Suhu rata-rata wilayah Bandung saat ini adalah 26°C dengan gerimis ringan, sementara wilayah Bogor terdeteksi mengalami hujan sedang dengan kelembapan tinggi (92%).";
      } else if (lower.includes('kurs') || lower.includes('rupiah') || lower.includes('dolar')) {
        aiReply = "Rasio nilai tukar Rupiah (IDR) terhadap Dolar AS (USD) berada pada kisaran Rp 15.625 (1 USD = 0.000064 IDR). Gunakan tab Kalkulator Kurs di widget ini untuk konversi instan!";
      } else if (lower.includes('redaksi') || lower.includes('kontak') || lower.includes('infobos')) {
        aiReply = "Kantor Redaksi Utama InfoBos berlokasi di Gedung Sate, Bandung. Anda dapat menghubungi layanan pengaduan redaksi via surel resmi di redaksi@infobos.com.";
      } else if (lower.includes('halo') || lower.includes('hai') || lower.includes('pagi') || lower.includes('siang') || lower.includes('malam')) {
        aiReply = "Halo! Senang bisa membantu Anda. Silakan pilih menu di atas atau tanyakan info terkini mengenai gempa bumi, cuaca Jawa Barat, atau kontak kami.";
      }
      setMessages([...updated, { sender: 'ai', text: aiReply }]);
    }, 700);
  };

  return (
    <div id="popup-widget-root" className={`fixed ${activeArticleSlug ? 'bottom-[135px]' : 'bottom-[75px]'} md:bottom-12 right-2 md:right-4 z-[150] font-sans`}>
      
      {/* DESKTOP ONLY FLOATING ACTION BUTTON */}
      {!isOpen && (
        <button
          id="btn-popup-widget-toggle"
          onClick={() => setIsOpen(true)}
          className="hidden md:flex items-center gap-1.5 bg-[#002B5B] hover:bg-[#001f42] text-white p-2 md:py-2.5 md:px-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-[#FFD700]/40 transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
        >
          <div className="relative">
            <span className="absolute -top-1 -right-1 flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500"></span>
            </span>
            <Activity className="h-4 w-4 text-[#FFD700] animate-pulse" />
          </div>
          <span className="hidden md:inline font-mono text-[10px] font-black uppercase tracking-wider text-slate-100">
            Widget Portal Jabar
          </span>
        </button>
      )}

      {/* MOBILE UNIFIED FLOATING COLUMN */}
      {!isOpen && (
        <div className="md:hidden flex flex-col-reverse items-center gap-2.5">
          {/* 1. BOTTOM-MOST/PRIMARY BUTTON */}
          {activeArticleSlug ? (
            /* Toggle Menu Button when viewing article */
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 bg-slate-900/95 hover:bg-slate-800 text-white rounded-full shadow-2xl border border-teal-400/50 flex items-center justify-center cursor-pointer active:scale-95 transition-all duration-200"
              title={isMobileMenuOpen ? "Tutup Menu" : "Buka Menu Fitur"}
            >
              {isMobileMenuOpen ? (
                <X className="h-4.5 w-4.5 text-rose-400" />
              ) : (
                <div className="relative flex items-center justify-center">
                  <Sparkles className="h-4.5 w-4.5 text-[#FFD700] animate-pulse" />
                  <span className="absolute -top-1 -right-1 flex h-1 w-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1 w-1 bg-teal-400"></span>
                  </span>
                </div>
              )}
            </button>
          ) : (
            /* Direct Jabar Widget Button when on home or other pages */
            <button
              onClick={() => setIsOpen(true)}
              className="w-10 h-10 bg-[#002B5B] hover:bg-[#001f42] text-white rounded-full shadow-2xl border border-[#FFD700]/40 flex items-center justify-center cursor-pointer active:scale-95 transition-all duration-200 relative"
              title="Widget Portal Jabar"
            >
              <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500"></span>
              </span>
              <Activity className="h-4.5 w-4.5 text-[#FFD700] animate-pulse" />
            </button>
          )}

          {/* 2. EXPANDED MENU ITEMS (Only when viewing article and menu is open) */}
          {activeArticleSlug && isMobileMenuOpen && (
            <div className="flex flex-col items-center gap-2 animate-fade-in-up">
              {/* Button A: Asisten AI Baca */}
              <button
                onClick={handleOpenAiAssistant}
                className="w-9 h-9 bg-gradient-to-r from-teal-500 to-indigo-600 text-white rounded-full shadow-lg border border-teal-400/30 active:scale-95 flex items-center justify-center cursor-pointer transition-all duration-200 animate-scale-up"
                title="Asisten AI Baca"
              >
                <Sparkles className="h-4 w-4 animate-pulse" />
              </button>

              {/* Button B: Widget Portal Jabar */}
              <button
                onClick={handleOpenWidgetPortal}
                className="w-9 h-9 bg-[#002B5B] text-white rounded-full shadow-lg border border-[#FFD700]/40 active:scale-95 flex items-center justify-center cursor-pointer transition-all duration-200 animate-scale-up"
                title="Widget Portal Jabar"
              >
                <Activity className="h-4 w-4 text-[#FFD700]" />
              </button>
            </div>
          )}

          {/* 3. SCROLL TO TOP FAB (Automatically flows to the top of the stack) */}
          {showScrollTop && scrollToTop && (
            <button
              onClick={scrollToTop}
              className="w-9 h-9 bg-[#002B5B] hover:bg-[#2B7A78] text-[#FFD700] hover:text-white rounded-full shadow-2xl border border-[#FFD700]/30 hover:border-[#FFD700] flex items-center justify-center cursor-pointer active:scale-95 transition-all duration-200"
              title="Kembali ke Atas"
            >
              <ChevronUp className="h-4.5 w-4.5" />
            </button>
          )}
        </div>
      )}

      {/* DETAILED WIDGET POPUP WINDOW */}
      {isOpen && (
        <div 
          id="popup-widget-panel"
          className="w-[340px] md:w-[380px] bg-[#0c162f] text-slate-100 rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.6)] border border-white/10 overflow-hidden flex flex-col max-h-[500px] animate-fade-in-up"
        >
          {/* POPUP HEADER */}
          <div className="bg-[#002B5B] px-4 py-3.5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-[#FFD700]/10 rounded-lg border border-[#FFD700]/20">
                <Sparkles className="h-4 w-4 text-[#FFD700]" />
              </div>
              <div>
                <h4 className="font-extrabold text-[12px] uppercase tracking-wider text-slate-100">Portal Widget Interaktif</h4>
                <p className="text-[9px] text-[#FFD700] font-mono">EDISI DIGITAL REALTIME</p>
              </div>
            </div>
            
            <button
              id="btn-popup-widget-close"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* TAB NAVIGATION HEADER */}
          <div className="grid grid-cols-4 border-b border-white/10 bg-black/20 text-[10px] font-bold text-center">
            <button
              id="tab-btn-bmkg"
              onClick={() => setActiveTab('bmkg')}
              className={`py-2 px-1 border-b-2 transition cursor-pointer flex flex-col items-center gap-1 ${
                activeTab === 'bmkg' 
                  ? 'border-[#FFD700] text-[#FFD700] bg-[#002B5B]/30' 
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Activity className="h-3.5 w-3.5" />
              <span>BMKG</span>
            </button>
            <button
              id="tab-btn-currency"
              onClick={() => setActiveTab('currency')}
              className={`py-2 px-1 border-b-2 transition cursor-pointer flex flex-col items-center gap-1 ${
                activeTab === 'currency' 
                  ? 'border-[#FFD700] text-[#FFD700] bg-[#002B5B]/30' 
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Coins className="h-3.5 w-3.5" />
              <span>Valas</span>
            </button>
            <button
              id="tab-btn-memo"
              onClick={() => setActiveTab('memo')}
              className={`py-2 px-1 border-b-2 transition cursor-pointer flex flex-col items-center gap-1 ${
                activeTab === 'memo' 
                  ? 'border-[#FFD700] text-[#FFD700] bg-[#002B5B]/30' 
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Notebook className="h-3.5 w-3.5" />
              <span>Memo</span>
            </button>
            <button
              id="tab-btn-ai"
              onClick={() => setActiveTab('ai')}
              className={`py-2 px-1 border-b-2 transition cursor-pointer flex flex-col items-center gap-1 ${
                activeTab === 'ai' 
                  ? 'border-[#FFD700] text-[#FFD700] bg-[#002B5B]/30' 
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Tanya AI</span>
            </button>
          </div>

          {/* TAB CONTENT AREA */}
          <div className="p-4 flex-grow overflow-y-auto min-h-[260px] max-h-[340px] bg-[#091024]/40">
            
            {/* 1. BMKG & WEATHER TAB */}
            {activeTab === 'bmkg' && (
              <div id="popup-tab-bmkg-content" className="space-y-3.5 animate-fade-in">
                {/* Simulated Earthquake Block */}
                <div 
                  className={`p-3 bg-slate-900/80 border rounded-xl space-y-2 transition-all duration-300 ${
                    isShaking ? 'animate-bounce border-rose-500 bg-rose-950/20' : 'border-white/10'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] bg-rose-500/10 text-rose-300 border border-rose-500/25 px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                      <AlertTriangle className="h-2.5 w-2.5 animate-pulse" />
                      Gempa Terkini
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono">10 Menit Lalu</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-black text-rose-400 font-mono">M 3.1</div>
                      <div className="text-[10px] text-slate-300 font-bold">14 KM Timur Laut Kota Sukabumi</div>
                    </div>
                    
                    <div className="flex gap-1.5 shrink-0">
                      <button
                        onClick={triggerSeismograph}
                        className="text-[9px] bg-rose-600 hover:bg-rose-700 text-white px-2 py-1 rounded-md font-bold font-mono transition cursor-pointer"
                      >
                        Vibrasi
                      </button>
                      <button
                        onClick={handleShareBMKG}
                        className={`text-[9px] px-2 py-1 rounded-md font-bold font-mono transition flex items-center gap-1 cursor-pointer ${
                          copiedAlert ? 'bg-emerald-600 text-white' : 'bg-white/10 hover:bg-white/15 text-slate-200'
                        }`}
                      >
                        {copiedAlert ? <Check className="h-2.5 w-2.5" /> : <Share2 className="h-2.5 w-2.5 text-rose-400" />}
                        <span>{copiedAlert ? 'Disalin' : 'Bagikan'}</span>
                      </button>
                    </div>
                  </div>
                  <div className="text-[9px] text-slate-400 leading-relaxed">
                    Darat kedalaman 10 KM, getaran dirasakan skala II MMI di Sukabumi & sekitarnya. Tidak memicu tsunami.
                  </div>
                </div>

                {/* Weather Block */}
                <div className="p-3 bg-slate-900/80 border border-white/10 rounded-xl space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] bg-amber-500/10 text-amber-300 border border-amber-500/25 px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                      <CloudRain className="h-2.5 w-2.5 text-amber-400" />
                      Pantauan Cuaca Jabar
                    </span>
                    
                    {/* City Selector */}
                    <select
                      value={weatherCity}
                      onChange={(e) => setWeatherCity(e.target.value as any)}
                      className="bg-[#002B5B] border border-white/10 text-slate-200 text-[10px] rounded-md px-1 py-0.5 focus:outline-none"
                    >
                      <option value="Bandung">Bandung</option>
                      <option value="Bogor">Bogor</option>
                      <option value="Cirebon">Cirebon</option>
                      <option value="Garut">Garut</option>
                    </select>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-xl font-extrabold text-slate-100 font-mono">
                        {weatherData[weatherCity].temp}°C
                      </div>
                      <div className="text-[10px] text-slate-300 font-bold">
                        {weatherData[weatherCity].status}
                      </div>
                    </div>
                    <div className="text-right text-[10px] text-slate-400 font-mono space-y-0.5">
                      <div>Kelembapan: {weatherData[weatherCity].hum}%</div>
                      <div>Angin: {weatherData[weatherCity].wind}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. CURRENCY CONVERTER TAB */}
            {activeTab === 'currency' && (
              <div id="popup-tab-currency-content" className="space-y-3 animate-fade-in">
                <div className="p-3.5 bg-slate-900/80 border border-white/10 rounded-xl space-y-3">
                  <div>
                    <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1 font-mono">Jumlah Rupiah (IDR)</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={idrAmount}
                        onChange={(e) => setIdrAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="w-full bg-[#002B5B] border border-white/10 text-slate-100 rounded-lg pl-3 pr-10 py-1.5 text-xs font-mono font-bold focus:outline-none focus:border-[#FFD700]"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-bold text-slate-400 font-mono">IDR</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2.5">
                    <div className="flex-grow">
                      <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1 font-mono">Mata Uang Target</label>
                      <select
                        value={selectedCurrency}
                        onChange={(e) => setSelectedCurrency(e.target.value as any)}
                        className="w-full bg-[#002B5B] border border-white/10 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none"
                      >
                        <option value="USD">Dolar AS (USD)</option>
                        <option value="EUR">Euro (EUR)</option>
                        <option value="SGD">Dolar Singapura (SGD)</option>
                        <option value="JPY">Yen Jepang (JPY)</option>
                      </select>
                    </div>

                    <div className="shrink-0 text-center px-2 py-0.5 mt-4 bg-white/5 rounded border border-white/10">
                      <span className="text-[8px] text-slate-400 block font-mono">1 IDR</span>
                      <span className="text-[10px] text-[#FFD700] font-mono font-bold">{conversionRates[selectedCurrency]}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1 font-mono">Hasil Estimasi</span>
                    <div className="bg-black/30 px-3 py-2 rounded-lg border border-white/5 flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-300 font-mono">Hasil Konversi:</span>
                      <span className="text-sm font-black text-[#FFD700] font-mono">
                        {(idrAmount * conversionRates[selectedCurrency]).toLocaleString(undefined, { maximumFractionDigits: 4 })} {selectedCurrency}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. MEMO PAD TAB */}
            {activeTab === 'memo' && (
              <div id="popup-tab-memo-content" className="space-y-3 animate-fade-in">
                <div className="p-3 bg-slate-900/80 border border-white/10 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-bold text-slate-300 font-mono">Catatan / Scratchpad Lokal</span>
                    {memoText && (
                      <button
                        onClick={() => {
                          setMemoText('');
                        }}
                        className="text-[8px] text-rose-400 hover:text-rose-300 font-mono font-bold"
                      >
                        Hapus Semua
                      </button>
                    )}
                  </div>

                  <textarea
                    rows={6}
                    value={memoText}
                    onChange={(e) => setMemoText(e.target.value)}
                    placeholder="Tuliskan memo cepat atau laporan draft berita Anda di sini. Data tersimpan otomatis secara aman di perangkat lokal Anda..."
                    className="w-full bg-[#002B5B]/60 border border-white/10 text-slate-200 rounded-lg p-2.5 text-[11px] leading-relaxed focus:outline-none focus:border-[#FFD700] resize-none font-medium placeholder-slate-500"
                  ></textarea>

                  <div className="flex justify-between items-center text-[8.5px] text-slate-400 font-mono">
                    <span>{memoText.length} Karakter</span>
                    <span className="text-emerald-400 flex items-center gap-0.5">
                      <Check className="h-3 w-3" />
                      Auto-Save Aktif
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 4. AI ASSISTANT TAB */}
            {activeTab === 'ai' && (
              <div id="popup-tab-ai-content" className="flex flex-col h-[280px] animate-fade-in">
                <div className="flex-grow overflow-y-auto space-y-2.5 pr-1 scrollbar-none mb-2">
                  {messages.map((m, idx) => (
                    <div 
                      key={idx} 
                      className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[85%] px-3 py-2 rounded-xl text-[11px] leading-normal font-medium ${
                          m.sender === 'user' 
                            ? 'bg-amber-500 text-slate-950 font-bold rounded-tr-none' 
                            : 'bg-white/10 text-slate-200 rounded-tl-none border border-white/5'
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="flex gap-1.5 border-t border-white/10 pt-2 shrink-0">
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Tanya info gempa, cuaca, dsb..."
                    className="flex-grow bg-[#002B5B] border border-white/10 text-slate-100 rounded-lg px-2.5 py-1.5 text-[11px] focus:outline-none focus:border-[#FFD700]"
                  />
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 p-2 rounded-lg font-bold flex items-center justify-center transition cursor-pointer shrink-0"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
              </div>
            )}

          </div>

          {/* FOOTER CREDIT */}
          <div className="bg-[#002B5B]/30 px-4 py-2 border-t border-white/10 flex justify-between items-center text-[8px] text-slate-400 font-mono">
            <span>SISTEM INFORMASI KEBENCANAAN JABAR</span>
            <span className="text-rose-400 animate-pulse font-bold">• LIVE MONITOR</span>
          </div>
        </div>
      )}

    </div>
  );
}
