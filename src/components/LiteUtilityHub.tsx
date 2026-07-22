import React, { useState, useEffect } from 'react';
import { 
  CloudRain, TrendingUp, Coins, Sparkles, Calendar, MapPin, 
  Activity, Flame, Plane, Camera, Compass, HelpCircle, MessageSquare, 
  Quote, Award, ShieldAlert, DollarSign, AlertTriangle, Search, 
  RefreshCw, Play, Pause, Clock, ArrowRight, BookOpen, ThumbsUp, Wind, Droplets, Check, Volume2, Car, ChevronRight, Share2,
  Instagram, Facebook, Heart
} from 'lucide-react';

interface LiteUtilityHubProps {
  onSelectArticle: (slug: string) => void;
  onSelectLocation: (slug: string) => void;
  onSelectEntity: (slug: string) => void;
  onNavigate?: (slug: string, type: string) => void;
}

export default function LiteUtilityHub({
  onSelectArticle,
  onSelectLocation,
  onSelectEntity,
  onNavigate
}: LiteUtilityHubProps) {
  // Separated sections visibility states (starts with indices open by default, others collapsible)
  const [sectionOpen, setSectionOpen] = useState({
    indices: true,
    environment: false,
    urban: false,
    aiReader: false
  });

  const toggleSection = (key: keyof typeof sectionOpen) => {
    setSectionOpen(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // 1. Weather States
  const [weatherCity, setWeatherCity] = useState<'bandung' | 'bogor' | 'cirebon' | 'garut' | 'depok'>('bandung');
  const weatherData = {
    bandung: { temp: 26, status: 'Gerimis Ringan', hum: 84, wind: '12 km/h', uv: '2 (Rendah)', desc: 'Bandung sejuk disertai hujan ringan sore hari.' },
    bogor: { temp: 24, status: 'Hujan Sedang', hum: 92, wind: '15 km/h', uv: '1 (Rendah)', desc: 'Potensi hujan deras di kawasan Puncak.' },
    cirebon: { temp: 31, status: 'Cerah Berawan', hum: 60, wind: '18 km/h', uv: '8 (Sangat Tinggi)', desc: 'Angin kumbang kencang bertiup dari pesisir.' },
    garut: { temp: 22, status: 'Kabut Tipis', hum: 88, wind: '8 km/h', uv: '3 (Sedang)', desc: 'Pegunungan dingin berselimut kabut pagi.' },
    depok: { temp: 30, status: 'Berawan Tebal', hum: 70, wind: '10 km/h', uv: '5 (Sedang)', desc: 'Kelembapan tinggi mendominasi Jabodetabek.' }
  };

  // 2. Currency Converter States
  const [idrAmount, setIdrAmount] = useState<number>(1000000);
  const conversionRates = { USD: 0.000064, EUR: 0.000059, SGD: 0.000086, JPY: 0.0102, MYR: 0.00030, SAR: 0.00024 };
  const [selectedCurrency, setSelectedCurrency] = useState<keyof typeof conversionRates>('USD');

  // 3. Stock Tracker States
  const [selectedStock, setSelectedStock] = useState<string>('BBRI');
  const stockList = {
    BBRI: { name: 'Bank Rakyat Indonesia', price: '4.890', change: '+1.24%', up: true, points: [4820, 4840, 4810, 4860, 4890] },
    TLKM: { name: 'Telkom Indonesia', price: '3.750', change: '-0.54%', up: false, points: [3810, 3790, 3800, 3760, 3750] },
    GOTO: { name: 'GoTo Gojek Tokopedia', price: '54', change: '+1.85%', up: true, points: [52, 53, 51, 53, 54] },
    ASII: { name: 'Astra International', price: '5.120', change: '+0.18%', up: true, points: [5090, 5100, 5080, 5110, 5120] },
    BMRI: { name: 'Bank Mandiri', price: '6.450', change: '-0.38%', up: false, points: [6500, 6480, 6490, 6470, 6450] }
  };

  // 4. Crypto States
  const [cryptoData, setCryptoData] = useState<Record<string, { price: string; change: string; up: boolean }>>({
    BTC: { price: '58,420', change: '+2.41%', up: true },
    ETH: { price: '3,150', change: '-1.12%', up: false },
    BNB: { price: '568', change: '+0.85%', up: true },
    SOL: { price: '138', change: '+5.14%', up: true }
  });
  const [isRefreshingCrypto, setIsRefreshingCrypto] = useState(false);

  const refreshCrypto = () => {
    setIsRefreshingCrypto(true);
    setTimeout(() => {
      setCryptoData({
        BTC: { price: (58000 + Math.random() * 800).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ","), change: (Math.random() * 4 - 2).toFixed(2) + '%', up: Math.random() > 0.4 },
        ETH: { price: (3100 + Math.random() * 100).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ","), change: (Math.random() * 4 - 2).toFixed(2) + '%', up: Math.random() > 0.4 },
        BNB: { price: (550 + Math.random() * 30).toFixed(0), change: (Math.random() * 4 - 2).toFixed(2) + '%', up: Math.random() > 0.4 },
        SOL: { price: (130 + Math.random() * 15).toFixed(0), change: (Math.random() * 6 - 2).toFixed(2) + '%', up: Math.random() > 0.4 }
      });
      setIsRefreshingCrypto(false);
    }, 500);
  };

  // 5. Gold States
  const [goldWeight, setGoldWeight] = useState<number>(5);
  const goldPricePerGram = 1385000; // IDR

  // 6. Fuel Price States
  const [fuelRegion, setFuelRegion] = useState<'jabar' | 'dki' | 'jateng'>('jabar');
  const [fuelKmDistance, setFuelKmDistance] = useState<number>(120);
  const fuelRates = {
    Pertalite: { price: 10000, consumption: 12 }, // km per liter
    Pertamax: { price: 12950, consumption: 14 },
    Dexlite: { price: 14550, consumption: 15 }
  };
  const [selectedFuelType, setSelectedFuelType] = useState<keyof typeof fuelRates>('Pertamax');

  // 7. Salat & Countdown States
  const [salatCity, setSalatCity] = useState<'bandung' | 'jakarta' | 'surabaya' | 'medan'>('bandung');
  const salatTimes = {
    bandung: { Subuh: '04:42', Dzuhur: '12:02', Ashar: '15:21', Maghrib: '18:01', Isya: '19:12' },
    jakarta: { Subuh: '04:46', Dzuhur: '12:06', Ashar: '15:25', Maghrib: '18:05', Isya: '19:16' },
    surabaya: { Subuh: '04:22', Dzuhur: '11:42', Ashar: '15:01', Maghrib: '17:41', Isya: '18:52' },
    medan: { Subuh: '05:01', Dzuhur: '12:28', Ashar: '15:53', Maghrib: '18:35', Isya: '19:48' }
  };
  const [isAdzanPlaying, setIsAdzanPlaying] = useState(false);
  const [adzanNotification, setAdzanNotification] = useState<string | null>(null);

  const togglePlayAdzan = () => {
    setIsAdzanPlaying(!isAdzanPlaying);
    if (!isAdzanPlaying) {
      setAdzanNotification("🔈 Pengingat Suara Adzan Aktif: Menyerukan panggilan sholat simulative.");
      setTimeout(() => setAdzanNotification(null), 5000);
    }
  };

  // 8. Calendar States
  const [selectedDate, setSelectedDate] = useState<number>(11);
  const calendarHolidays: Record<number, { title: string; desc: string; isHoliday: boolean }> = {
    1: { title: 'Tahun Baru Islam 1448 H', desc: 'Awal Muharram, libur nasional keagamaan.', isHoliday: true },
    11: { title: 'Hari Jadi Jawa Barat', desc: 'Memperingati berdirinya Provinsi Jawa Barat ke-81.', isHoliday: false },
    17: { title: 'Hari Proklamasi RI', desc: 'Upacara bendera kenegaraan dan pesta rakyat serentak.', isHoliday: true },
    25: { title: 'Festival Heritage Gedung Sate', desc: 'Pameran budaya, kuliner Jawa Barat di halaman gedung sate.', isHoliday: false }
  };

  // 9. Gempa (Earthquake) States
  const [isShaking, setIsShaking] = useState(false);
  const [copiedLiteGempa, setCopiedLiteGempa] = useState(false);
  const triggerSeismograph = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 2000);
  };

  // 10. Volcano Monitoring
  const [selectedVolcano, setSelectedVolcano] = useState<string>('tangkap');
  const volcanoes = {
    tangkap: { name: 'Tangkuban Parahu', status: 'Waspada (Level II)', color: 'text-amber-500 bg-amber-50 border-amber-200', seism: 'Vibrasi Micro 1.5mm', safeDist: '1.5 KM' },
    gede: { name: 'Gunung Gede', status: 'Normal (Level I)', color: 'text-emerald-500 bg-emerald-50 border-emerald-200', seism: 'Tenang 0.2mm', safeDist: '0 KM' },
    papandayan: { name: 'Gunung Papandayan', status: 'Normal (Level I)', color: 'text-emerald-500 bg-emerald-50 border-emerald-200', seism: 'Emisi Uap Stabil', safeDist: '0 KM' },
    galunggung: { name: 'Gunung Galunggung', status: 'Normal (Level I)', color: 'text-emerald-500 bg-emerald-50 border-emerald-200', seism: 'Suhu Danau Kawah 32°C', safeDist: '0 KM' }
  };

  // 11. Flights State
  const [flightSearch, setFlightSearch] = useState('');
  const [flightOrigin, setFlightOrigin] = useState<'KJT' | 'BDO'>('KJT');
  const flightsData = [
    { id: 'QZ-361', airline: 'AirAsia', route: 'KJT - Kuala Lumpur', time: '10:45', status: 'On Time', type: 'Departure' },
    { id: 'JT-822', airline: 'Lion Air', route: 'KJT - Medan (KNO)', time: '11:15', status: 'Delayed (30m)', type: 'Departure' },
    { id: 'GA-422', airline: 'Garuda Indonesia', route: 'KJT - Denpasar', time: '12:40', status: 'Boarding', type: 'Departure' },
    { id: 'IU-751', airline: 'Super Air Jet', route: 'Balikpapan - KJT', time: '13:05', status: 'Landed', type: 'Arrival' },
    { id: 'OD-320', airline: 'Batik Air Malaysia', route: 'Penang - KJT', time: '14:20', status: 'On Time', type: 'Arrival' },
    { id: 'IL-112', airline: 'Wings Air', route: 'BDO - Yogyakarta', time: '09:30', status: 'Landed', type: 'Departure' },
    { id: 'IL-204', airline: 'Wings Air', route: 'Surabaya - BDO', time: '15:10', status: 'On Time', type: 'Arrival' }
  ];

  // 12. Traffic States
  const [selectedRoute, setSelectedRoute] = useState<string>('pasteur');
  const trafficRoutes = {
    pasteur: { name: 'Simpang Pasteur (Entry Toll)', speed: '14 km/h', level: 'Padat Merayap', block: 'Tidak Ada', color: 'text-rose-500' },
    dago: { name: 'Jl. Ir. H. Juanda (Dago)', speed: '28 km/h', level: 'Lancar Terkendali', block: 'Tidak Ada', color: 'text-emerald-500' },
    asia_afrika: { name: 'Jl. Asia Afrika (Gedung Merdeka)', speed: '8 km/h', level: 'Macet Total (Giat Heritage)', block: 'Pengalihan di Jl. Braga', color: 'text-red-600 font-extrabold' }
  };

  // 13. Polling States
  const [votedPoll, setVotedPoll] = useState<boolean>(false);
  const [pollVotes, setPollVotes] = useState<Record<string, number>>({ setuju: 64, ragu: 21, tidak_setuju: 15 });

  const handleVotePoll = (option: 'setuju' | 'ragu' | 'tidak_setuju') => {
    if (votedPoll) return;
    setPollVotes(prev => ({
      ...prev,
      [option]: prev[option] + 1
    }));
    setVotedPoll(true);
  };

  // 14. Ask AI States
  const [aiQuery, setAiQuery] = useState('');
  const [aiChatResponse, setAiChatResponse] = useState<string>('Halo! Tanyakan kepada saya seputar regulasi Jabar, data ekonomi, atau informasi terkini.');
  const [isAiThinking, setIsAiThinking] = useState(false);

  const handleAskAi = (queryText: string) => {
    if (!queryText.trim()) return;
    setIsAiThinking(true);
    setAiQuery(queryText);
    setTimeout(() => {
      const q = queryText.toLowerCase();
      let response = "Saya mengerti pertanyaan Anda seputar Jabar. ";
      
      if (q.includes('cuaca')) {
        response = "Berdasarkan data stasiun BMKG Jabar, Bandung saat ini bersuhu 26°C dengan hujan ringan lokal. Cirebon panas berawan (31°C) dan Bogor berpotensi diguyur hujan sedang di kawasan Puncak.";
      } else if (q.includes('saham') || q.includes('ekonomi') || q.includes('kurs')) {
        response = "Sektor keuangan di bursa (IHSG) menunjukkan penguatan tipis dipimpin oleh BBRI ke Rp 4.890. Nilai tukar rupiah terhadap USD bertengger kuat di Rp 15.742 per USD sesuai rilis Bank Indonesia pagi ini.";
      } else if (q.includes('gempa') || q.includes('bencana')) {
        response = "BMKG Jabar memantau aktivitas seismik Sesar Lembang pada status waspada mikro. Kejadian gempa bumi tektonik terkini terdeteksi berkekuatan M 3.1 di lepas pantai Sukabumi, aman dari potensi tsunami.";
      } else if (q.includes('salat') || q.includes('jadwal')) {
        response = "Untuk wilayah Bandung hari ini, Dzuhur jatuh pada pukul 12:02 WIB, Ashar pukul 15:21 WIB, dan Maghrib pukul 18:01 WIB. Pastikan menyetel pengingat di aplikasi INFOBOS.";
      } else {
        response = "Berdasarkan kluster artikel rilis pers INFOBOS, prioritas kebijakan Pemprov Jabar saat ini terfokus pada revitalisasi cagar budaya Braga-Gedung Sate dan percepatan insentif fiskal startup digital bersama Menkeu Sri Mulyani.";
      }

      setAiChatResponse(response);
      setIsAiThinking(false);
    }, 800);
  };

  // 15. Quote States
  const [quoteIdx, setQuoteIdx] = useState(0);
  const quotesList = [
    { text: "Pekerjaan terbaik di dunia adalah hobi yang dibayar, namun pengabdian tertinggi adalah mendedikasikan ilmu untuk masyarakat.", author: "Ridwan Kamil" },
    { text: "Stabilitas makroekonomi tidak hanya dibangun dari angka, melainkan dari kepercayaan publik dan tata kelola kebijakan yang transparan.", author: "Sri Mulyani Indrawati" },
    { text: "Gantungkan cita-citamu setinggi langit! Jika engkau jatuh, engkau akan jatuh di antara bintang-bintang.", author: "Ir. Soekarno" }
  ];

  // 16. Trivia States
  const [triviaIdx, setTriviaIdx] = useState(0);
  const triviaList = [
    { title: "Kubah Gedung Sate", text: "Menara pusat Gedung Sate memiliki ornamen berupa tusuk sate dengan 6 buah jambu air. Angka 6 melambangkan biaya pembangunan gedung senilai 6 Juta Gulden pada era kolonial Belanda." },
    { title: "Bandara Kertajati (KJT)", text: "BIJB Kertajati merupakan bandara terbesar kedua di Indonesia setelah Soekarno-Hatta, yang dibangun khusus untuk mengurai kepadatan penerbangan Jawa Barat dan melayani penerbangan umroh/haji langsung." },
    { title: "Sesar Lembang Aktif", text: "Sesar Lembang membentang sepanjang 29 kilometer dari Padalarang hingga Jatinangor. Kecepatannya bergeser sekitar 3-5 milimeter per tahun, terus dipantau secara ketat oleh seismograf BMKG." }
  ];

  // 17. Trending Topics
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null);
  const trendingTopics = [
    { tag: 'Insentif Fiskal Jabar', vol: '124.5K search', trend: '+45%' },
    { tag: 'Revitalisasi Braga', vol: '98.2K search', trend: '+28%' },
    { tag: 'Sesar Lembang Seismik', vol: '75.9K search', trend: '+80%' },
    { tag: 'Bandara Kertajati Route', vol: '52.1K search', trend: '+15%' },
    { tag: 'Harga Emas Antam Naik', vol: '44.3K search', trend: '+12%' }
  ];

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Header Info */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-left space-y-2 shadow-sm">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-teal-500 rounded-full animate-ping"></span>
          <span className="text-[10px] font-mono font-black text-teal-600 uppercase tracking-widest">INFOBOS LITE WORKSPACE</span>
        </div>
        <h3 className="font-display font-black text-sm text-[#002B5B] dark:text-slate-100 uppercase tracking-tight leading-tight">
          Layanan &amp; Utilitas Interaktif
        </h3>
        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">
          Asisten cerdas pendukung keputusan, data pasar real-time, dan pemantauan geografis terintegrated.
        </p>
      </div>

      {/* CARD 1: INDEKS PASAR */}
      <div id="infobos-indices-hub" className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-3.5 text-left space-y-3.5 shadow-sm">
        <button 
          onClick={() => toggleSection('indices')}
          className="w-full flex items-center justify-between font-display font-black text-xs text-[#002B5B] dark:text-slate-100 uppercase tracking-wider cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Coins className="h-4 w-4 text-amber-500" />
            <span>Indeks Pasar</span>
          </span>
          <ChevronRight className={`h-4 w-4 text-slate-400 transform transition-transform duration-200 ${sectionOpen.indices ? 'rotate-90' : ''}`} />
        </button>

        {sectionOpen.indices && (
          <div className="grid grid-cols-1 gap-4 animate-fade-in pt-1">
            
            {/* Widget A: Kurs IDR Converter & Antam Emas */}
            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-1.5">
                <span className="text-[10px] font-mono font-black text-indigo-600 dark:text-indigo-400 uppercase flex items-center gap-1">
                  <DollarSign className="h-3.5 w-3.5" /> Kurs Rupiah &amp; Emas Antam
                </span>
                <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono">Sync BI</span>
              </div>

              {/* IDR Input Converter */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Konverter Rupiah (IDR):</label>
                <div className="flex gap-1">
                  <input 
                    type="number" 
                    value={idrAmount}
                    onChange={(e) => setIdrAmount(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg px-2 py-1 text-xs font-bold font-mono focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-200"
                  />
                  <select 
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value as any)}
                    className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg px-1.5 text-xs font-black font-mono focus:outline-none text-slate-800 dark:text-slate-200"
                  >
                    {Object.keys(conversionRates).map(cur => (
                      <option key={cur} value={cur}>{cur}</option>
                    ))}
                  </select>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 border dark:border-white/5 rounded-lg p-1.5 text-center font-mono">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Hasil Estimasi:</span>
                  <span className="text-sm font-extrabold text-[#002B5B] dark:text-indigo-400">
                    {selectedCurrency === 'USD' ? '$' : selectedCurrency === 'EUR' ? '€' : selectedCurrency === 'SGD' ? 'S$' : selectedCurrency === 'JPY' ? '¥' : ''}
                    {(idrAmount * conversionRates[selectedCurrency]).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {selectedCurrency}
                  </span>
                </div>
              </div>

              {/* Gold investment planner */}
              <div className="pt-2 border-t border-slate-100 dark:border-white/5 space-y-2">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-slate-500 dark:text-slate-400">Harga Emas Antam:</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">Rp 1.385.000 / gr</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 shrink-0">Simulasi:</span>
                  <input 
                    type="number" 
                    value={goldWeight}
                    onChange={(e) => setGoldWeight(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg px-1 py-0.5 text-xs font-bold text-center font-mono text-slate-800 dark:text-slate-200"
                  />
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Gram</span>
                </div>
                <div className="text-[10px] bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 p-1.5 rounded-lg font-mono text-amber-900 dark:text-amber-300 text-center font-semibold">
                  Nilai Investasi: Rp {(goldWeight * goldPricePerGram).toLocaleString('id-ID')}
                </div>
              </div>
            </div>

            {/* Widget B: Saham BEI Tracker */}
            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-1.5">
                <span className="text-[10px] font-mono font-black text-teal-600 dark:text-teal-400 uppercase flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5" /> Saham BEI Terpilih
                </span>
                <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono">Live BEI</span>
              </div>

              {/* Stock selector tabs */}
              <div className="flex flex-wrap gap-1">
                {Object.keys(stockList).map(ticker => (
                  <button
                    key={ticker}
                    onClick={() => setSelectedStock(ticker)}
                    className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-extrabold transition ${
                      selectedStock === ticker 
                        ? 'bg-teal-500 text-white' 
                        : 'bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border dark:border-white/10'
                    }`}
                  >
                    {ticker}
                  </button>
                ))}
              </div>

              {/* Selected Stock Info */}
              {(() => {
                const s = stockList[selectedStock as keyof typeof stockList];
                return (
                  <div className="space-y-2 pt-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-display font-bold text-sm text-[#002B5B] dark:text-slate-100 leading-none">{selectedStock}</h4>
                        <span className="text-[9px] text-slate-400 dark:text-slate-500">{s.name}</span>
                      </div>
                      <div className="text-right font-mono">
                        <div className="text-base font-extrabold text-slate-900 dark:text-slate-100">{s.price}</div>
                        <span className={`text-[10px] font-bold ${s.up ? 'text-emerald-600' : 'text-rose-500'}`}>
                          {s.change}
                        </span>
                      </div>
                    </div>

                    {/* SVG Sparkline chart */}
                    <div className="h-12 w-full bg-slate-50 dark:bg-slate-900 border dark:border-white/10 rounded-lg flex items-end p-1 relative overflow-hidden">
                      <div className="absolute top-1 left-1.5 text-[8px] text-slate-400 dark:text-slate-500 font-mono">Tren 5 Hari</div>
                      <svg className="w-full h-8" viewBox="0 0 100 30" preserveAspectRatio="none">
                        <polyline
                          fill="none"
                          stroke={s.up ? "#10b981" : "#ef4444"}
                          strokeWidth="2"
                          points={s.points.map((val, idx) => `${idx * 25},${30 - ((val - Math.min(...s.points)) / (Math.max(...s.points) - Math.min(...s.points)) * 25 + 2)}`).join(' ')}
                        />
                      </svg>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Widget C: Kripto & BBM Est */}
            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-1.5">
                <span className="text-[10px] font-mono font-black text-rose-600 dark:text-rose-400 uppercase flex items-center gap-1">
                  <Flame className="h-3.5 w-3.5" /> Kripto &amp; Estimasi Bahan Bakar
                </span>
                <button 
                  onClick={refreshCrypto}
                  disabled={isRefreshingCrypto}
                  className="p-1 hover:bg-slate-100 dark:hover:bg-slate-900 rounded text-slate-400 hover:text-slate-700 transition"
                >
                  <RefreshCw className={`h-3 w-3 ${isRefreshingCrypto ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {/* Crypto simple list */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {Object.entries(cryptoData).map(([sym, item]) => {
                  const cItem = item as { price: string; change: string; up: boolean };
                  return (
                    <div key={sym} className="p-1.5 bg-slate-50 dark:bg-slate-900 border dark:border-white/10 rounded-lg">
                      <div className="flex justify-between items-center text-[9px] text-slate-400 dark:text-slate-500 font-bold">
                        <span>{sym}</span>
                        <span className={cItem.up ? 'text-emerald-600' : 'text-rose-500'}>{cItem.change}</span>
                      </div>
                      <span className="font-extrabold text-slate-800 dark:text-slate-100 text-[11px] block mt-0.5">${cItem.price}</span>
                    </div>
                  );
                })}
              </div>

              {/* Fuel Price Cost Estimator */}
              <div className="pt-2 border-t border-slate-100 dark:border-white/5 space-y-1.5">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-slate-500 dark:text-slate-400">Estimasi Pengeluaran BBM:</span>
                  <select 
                    value={selectedFuelType}
                    onChange={(e) => setSelectedFuelType(e.target.value as any)}
                    className="bg-slate-50 dark:bg-slate-900 text-[9px] font-bold border dark:border-white/10 rounded p-0.5 text-slate-800 dark:text-slate-200"
                  >
                    {Object.keys(fuelRates).map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-slate-400 dark:text-slate-500">Jarak:</span>
                  <input 
                    type="number" 
                    value={fuelKmDistance}
                    onChange={(e) => setFuelKmDistance(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-14 bg-slate-50 dark:bg-slate-900 border dark:border-white/10 rounded text-xs font-bold text-center font-mono text-slate-800 dark:text-slate-200"
                  />
                  <span className="text-[9px] text-slate-500 dark:text-slate-400 font-mono">KM</span>
                </div>
                <div className="text-[9px] bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-150 dark:border-indigo-900/40 p-1.5 rounded text-indigo-900 dark:text-indigo-300 font-mono font-bold text-center">
                  Butuh: {(fuelKmDistance / fuelRates[selectedFuelType].consumption).toFixed(1)} L • Biaya: Rp {Math.round((fuelKmDistance / fuelRates[selectedFuelType].consumption) * fuelRates[selectedFuelType].price).toLocaleString('id-ID')}
                </div>
              </div>

            </div>

          </div>
        )}
      </div>

      {/* INSTAGRAM AD & TRENDING PLACEMENT */}
      <div className="bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-xl p-4 text-left shadow-2xs space-y-3.5 text-slate-900 dark:text-slate-100">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-2">
          <div className="flex items-center gap-1.5">
            <Instagram className="h-4.5 w-4.5 text-pink-600" />
            <h4 className="font-display font-black text-[11px] text-[#002B5B] dark:text-slate-100 uppercase tracking-wider">
              Instagram Sponsor Ads &amp; Trends
            </h4>
          </div>
          <span className="text-[8px] bg-gradient-to-r from-purple-500 to-pink-500 text-white font-mono font-extrabold px-1.5 py-0.2 rounded uppercase">
            SPONSOR
          </span>
        </div>

        {/* Simulated Instagram Embed */}
        <div className="bg-slate-50 dark:bg-[#001126] border border-slate-100 dark:border-white/5 rounded-xl overflow-hidden shadow-3xs">
          <div className="p-2 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 p-0.5">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80" 
                  className="w-full h-full rounded-full border border-white dark:border-slate-900 object-cover" 
                  alt="avatar" 
                />
              </div>
              <div>
                <div className="flex items-center gap-0.5">
                  <span className="text-[10px] font-black text-slate-800 dark:text-slate-100">@kuliner_bandung</span>
                  <span className="text-[8px] text-blue-500">✓</span>
                </div>
                <span className="text-[8px] text-slate-400 block -mt-0.5">Bandung, West Java • Bersponsor</span>
              </div>
            </div>
            <button className="text-slate-400 hover:text-slate-600 font-bold text-xs px-1">•••</button>
          </div>

          {/* Instagram image preview */}
          <div className="relative aspect-video bg-slate-900 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1544025162-d76694265947?w=500" 
              alt="Delicious food Jabar" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[8px] px-1.5 py-0.5 rounded font-mono">
              1 / 3
            </div>
          </div>

          {/* Instagram footer action */}
          <div className="p-2.5 space-y-1.5">
            <div className="flex justify-between items-center text-[10px]">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <button className="hover:scale-110 hover:text-red-500 transition">
                  <Heart className="h-4 w-4 text-pink-600" />
                </button>
                <span className="font-bold">4.2K likes</span>
              </div>
              <a 
                href="#order" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[8px] uppercase tracking-wider px-2.5 py-1 rounded-lg transition"
              >
                Beli Sekarang &rarr;
              </a>
            </div>
            <p className="text-[9px] leading-relaxed text-slate-600 dark:text-slate-300">
              <span className="font-black text-slate-800 dark:text-slate-200">@kuliner_bandung</span> Rekomendasi kuliner seblak coet terpedas &amp; terfavorit di Jabar! 🔥 Rasa otentik rempah kencur pilihan. Mumpung ada promo diskon khusus followers lho...
            </p>
          </div>
        </div>

        {/* Trending on Instagram */}
        <div className="pt-2 border-t border-slate-100 dark:border-white/10 space-y-2">
          <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
            <TrendingUp className="h-3.5 w-3.5 text-pink-600" />
            <span>Trending di Instagram Jabar</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {[
              { tag: "#SeblakCoetBandung", count: "120K posts" },
              { tag: "#ExploreSukabumi", count: "95K posts" },
              { tag: "#LembangStaycation", count: "84K posts" },
              { tag: "#PersibDay", count: "250K posts" }
            ].map((item, idx) => (
              <div key={idx} className="px-2 py-1 bg-pink-50/60 dark:bg-pink-950/20 border border-pink-100/60 dark:border-pink-900/10 rounded-lg text-[9px] text-pink-700 dark:text-pink-300 font-bold font-mono">
                {item.tag} <span className="text-[7px] text-slate-400 font-medium font-sans">({item.count})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CARD 2: IKLIM & AL-QUR'AN */}
      <div id="infobos-environment-hub" className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-3.5 text-left space-y-3.5 shadow-sm">
        <button 
          onClick={() => toggleSection('environment')}
          className="w-full flex items-center justify-between font-display font-black text-xs text-[#002B5B] dark:text-slate-100 uppercase tracking-wider cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <CloudRain className="h-4 w-4 text-indigo-500" />
            <span>Iklim &amp; Al-Qur'an</span>
          </span>
          <ChevronRight className={`h-4 w-4 text-slate-400 transform transition-transform duration-200 ${sectionOpen.environment ? 'rotate-90' : ''}`} />
        </button>

        {sectionOpen.environment && (
          <div className="grid grid-cols-1 gap-4 animate-fade-in pt-1">
            
            {/* Widget A: Weather Station Jabar */}
            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-1.5">
                <span className="text-[10px] font-mono font-black text-[#002B5B] dark:text-slate-100 uppercase flex items-center gap-1">
                  <CloudRain className="h-3.5 w-3.5 text-indigo-500" /> Stasiun Cuaca Jabar
                </span>
                <span className="text-[8px] text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 px-1.5 rounded font-mono font-bold">LIVE METEOROLOGI</span>
              </div>

              {/* City Selection dropdown */}
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-slate-400 dark:text-slate-500 shrink-0">Wilayah Pantauan:</span>
                <select 
                  value={weatherCity}
                  onChange={(e) => setWeatherCity(e.target.value as any)}
                  className="bg-slate-50 dark:bg-slate-900 border dark:border-white/10 rounded-lg px-2 py-0.5 text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  <option value="bandung">Bandung</option>
                  <option value="bogor">Bogor</option>
                  <option value="cirebon">Cirebon</option>
                  <option value="garut">Garut</option>
                  <option value="depok">Depok</option>
                </select>
              </div>

              {/* Selected City Metrics */}
              {(() => {
                const w = weatherData[weatherCity];
                return (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-mono font-extrabold text-slate-800 dark:text-slate-100">{w.temp}°C</div>
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{w.status}</span>
                      </div>
                      <div className="text-right text-[10px] font-mono text-slate-500 dark:text-slate-400 space-y-0.5">
                        <div>Hum: <strong>{w.hum}%</strong></div>
                        <div>Angin: <strong>{w.wind}</strong></div>
                        <div>UV Index: <strong className="text-amber-600 dark:text-amber-400">{w.uv}</strong></div>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 p-2 rounded-lg border dark:border-white/5 leading-relaxed">
                      {w.desc}
                    </p>
                  </div>
                );
              })()}
            </div>

            {/* Widget B: Jadwal Sholat & Countdown */}
            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-1.5">
                <span className="text-[10px] font-mono font-black text-amber-600 dark:text-amber-400 uppercase flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> Jadwal Sholat Kemenag
                </span>
                <select 
                  value={salatCity}
                  onChange={(e) => setSalatCity(e.target.value as any)}
                  className="bg-slate-50 dark:bg-slate-900 border dark:border-white/10 rounded text-[9px] font-bold text-slate-800 dark:text-slate-200"
                >
                  <option value="bandung">Bandung</option>
                  <option value="jakarta">Jakarta</option>
                  <option value="surabaya">Surabaya</option>
                  <option value="medan">Medan</option>
                </select>
              </div>

              {/* Sholat grid */}
              <div className="grid grid-cols-5 gap-1 text-center text-[9px] font-mono">
                {Object.entries(salatTimes[salatCity]).map(([name, time]) => {
                  const isMaghrib = name === 'Maghrib';
                  return (
                    <div 
                      key={name} 
                      className={`p-1 border dark:border-white/10 rounded-lg flex flex-col ${
                        isMaghrib ? 'bg-amber-500 text-white border-amber-500 font-extrabold' : 'bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-300'
                      }`}
                    >
                      <span className="opacity-80 block text-[7.5px]">{name}</span>
                      <span className="font-extrabold text-xs mt-0.5">{time}</span>
                    </div>
                  );
                })}
              </div>

              {/* Adzan player simulator */}
              <div className="space-y-1.5 pt-1.5 border-t border-slate-100 dark:border-white/5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Pengingat Adzan Otomatis:</span>
                  <button 
                    onClick={togglePlayAdzan}
                    className={`p-1 px-2.5 rounded-full text-[9px] font-bold flex items-center gap-1 cursor-pointer transition ${
                      isAdzanPlaying ? 'bg-rose-500 text-white animate-pulse' : 'bg-[#002B5B] dark:bg-teal-950/40 text-[#FFD700] dark:text-teal-300 border dark:border-teal-900/30'
                    }`}
                  >
                    <Volume2 className="h-3 w-3" />
                    <span>{isAdzanPlaying ? 'Adzan Play...' : 'Uji Adzan'}</span>
                  </button>
                </div>
                {adzanNotification && (
                  <p className="text-[9.5px] text-slate-600 dark:text-slate-400 font-mono bg-slate-50 dark:bg-slate-900 p-1.5 rounded border border-slate-200 dark:border-white/10">
                    {adzanNotification}
                  </p>
                )}
              </div>
            </div>

            {/* Widget C: BMKG Gempa & Gunung Api */}
            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-1.5">
                <span className="text-[10px] font-mono font-black text-rose-600 uppercase flex items-center gap-1">
                  <AlertTriangle className="h-3.5 w-3.5" /> BMKG Gempa &amp; Vulkanologi
                </span>
                <span className="text-[8px] font-bold bg-rose-100 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 px-1.5 rounded">SIAGA JABAR</span>
              </div>

              {/* Gempa Terkini Display with Shake Simulator */}
              <div className={`p-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg space-y-1.5 transition ${isShaking ? 'animate-bounce border-rose-500 bg-rose-50 dark:bg-rose-950/40' : ''}`}>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Gempa Bumi Terkini BMKG</span>
                  <div className="flex gap-1.5">
                    <button 
                      onClick={triggerSeismograph}
                      className="text-[8px] bg-rose-600 text-white px-1.5 py-0.5 rounded font-bold font-mono hover:bg-rose-700 transition cursor-pointer"
                    >
                      Simulasi
                    </button>
                    <button 
                      onClick={() => {
                        const summaryText = `🚨 BMKG: INFO GEMPA BUMI TERKINI 🚨\n📍 Lokasi: Darat 14 KM Timur Laut Kota Sukabumi\n📈 Magnitudo: M 3.1\n🕒 Waktu: Terkini (Pantauan Realtime Siaga Jabar)\n📉 Kedalaman: 10 KM\n⚠️ Status: Aman dari potensi tsunami\n(Sumber: BMKG Jabar & InfoBos Portal)`;
                        navigator.clipboard.writeText(summaryText).then(() => {
                          setCopiedLiteGempa(true);
                          setTimeout(() => setCopiedLiteGempa(false), 2000);
                        });
                      }}
                      className={`text-[8px] px-1.5 py-0.5 rounded font-bold font-mono transition flex items-center gap-0.5 cursor-pointer ${
                        copiedLiteGempa 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      {copiedLiteGempa ? (
                        <>
                          <Check className="h-2.5 w-2.5 text-emerald-300 animate-pulse" />
                          <span>Disalin!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="h-2.5 w-2.5 text-rose-500" />
                          <span>Bagikan</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center font-mono">
                  <span className="text-sm font-extrabold text-rose-600">M 3.1</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Kedalaman: 10 KM</span>
                </div>
                <p className="text-[9px] text-slate-500 dark:text-slate-400 leading-normal font-mono">
                  Pusat: Darat 14 KM Timur Laut Kota Sukabumi • <strong className="text-emerald-600 dark:text-emerald-400">Aman Tsunami</strong>
                </p>
              </div>

              {/* Volcano monitoring dropdown info */}
              <div className="space-y-1.5 pt-1 border-t border-slate-100 dark:border-white/5">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-slate-500 dark:text-slate-400">Status Gunung Api:</span>
                  <select 
                    value={selectedVolcano}
                    onChange={(e) => setSelectedVolcano(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-900 text-[9px] font-bold border dark:border-white/10 rounded p-0.5 text-slate-800 dark:text-slate-200"
                  >
                    <option value="tangkap">Tangkuban Parahu</option>
                    <option value="gede">Mount Gede</option>
                    <option value="papandayan">Mount Papandayan</option>
                    <option value="galunggung">Mount Galunggung</option>
                  </select>
                </div>
                {(() => {
                  const v = volcanoes[selectedVolcano as keyof typeof volcanoes];
                  return (
                    <div className="p-1.5 bg-slate-50 dark:bg-slate-900 border dark:border-white/10 rounded text-[9.5px] leading-relaxed space-y-0.5 font-mono text-slate-700 dark:text-slate-300">
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <strong className={v.status.includes('Normal') ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}>{v.status}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Seismogram:</span>
                        <strong className="text-slate-700 dark:text-slate-200">{v.seism}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Evakuasi Aman:</span>
                        <strong className="text-slate-700 dark:text-slate-200">{v.safeDist}</strong>
                      </div>
                    </div>
                  );
                })()}
              </div>

            </div>

          </div>
        )}
      </div>



      {/* CARD 3: MOBILITAS KOTA */}
      <div id="infobos-urban-hub" className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-3.5 text-left space-y-3.5 shadow-sm">
        <button 
          onClick={() => toggleSection('urban')}
          className="w-full flex items-center justify-between font-display font-black text-xs text-[#002B5B] dark:text-slate-100 uppercase tracking-wider cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Car className="h-4 w-4 text-emerald-500" />
            <span>Mobilitas Kota</span>
          </span>
          <ChevronRight className={`h-4 w-4 text-slate-400 transform transition-transform duration-200 ${sectionOpen.urban ? 'rotate-90' : ''}`} />
        </button>

        {sectionOpen.urban && (
          <div className="grid grid-cols-1 gap-4 animate-fade-in pt-1">
            
            {/* Widget A: Flight status Board */}
            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-1.5">
                <span className="text-[10px] font-mono font-black text-[#002B5B] dark:text-slate-100 uppercase flex items-center gap-1">
                  <Plane className="h-3.5 w-3.5" /> Penerbangan Jabar
                </span>
                <div className="flex gap-1">
                  <button 
                    onClick={() => setFlightOrigin('KJT')} 
                    className={`px-1.5 py-0.5 rounded text-[8px] font-extrabold ${flightOrigin === 'KJT' ? 'bg-[#002B5B] dark:bg-teal-600 text-white' : 'bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400'}`}
                  >
                    Kertajati
                  </button>
                  <button 
                    onClick={() => setFlightOrigin('BDO')} 
                    className={`px-1.5 py-0.5 rounded text-[8px] font-extrabold ${flightOrigin === 'BDO' ? 'bg-[#002B5B] dark:bg-teal-600 text-white' : 'bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400'}`}
                  >
                    Husein
                  </button>
                </div>
              </div>

              {/* Search flight */}
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Cari maskapai / rute..." 
                  value={flightSearch}
                  onChange={(e) => setFlightSearch(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg pl-6 pr-2 py-1 text-[10px] focus:outline-none text-slate-800 dark:text-slate-200"
                />
                <Search className="absolute left-2 top-2 h-2.5 w-2.5 text-slate-400" />
              </div>

              {/* Flight List */}
              <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                {flightsData
                  .filter(f => (flightOrigin === 'KJT' ? !f.route.includes('BDO') : f.route.includes('BDO') || f.route.includes('Surabaya - BDO')))
                  .filter(f => f.airline.toLowerCase().includes(flightSearch.toLowerCase()) || f.route.toLowerCase().includes(flightSearch.toLowerCase()) || f.id.toLowerCase().includes(flightSearch.toLowerCase()))
                  .map((flight) => (
                    <div key={flight.id} className="p-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-lg flex items-center justify-between text-[9px] font-mono leading-none">
                      <div>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{flight.id}</span>
                        <span className="text-slate-400 dark:text-slate-500 ml-1.5">{flight.airline}</span>
                        <p className="text-[8px] text-slate-500 dark:text-slate-400 mt-1">{flight.route}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-extrabold text-slate-700 dark:text-slate-350 block">{flight.time}</span>
                        <span className={`text-[7.5px] px-1 rounded-sm font-bold block mt-1 ${
                          flight.status === 'On Time' ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-350' :
                          flight.status === 'Landed' ? 'bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300' :
                          flight.status === 'Boarding' ? 'bg-purple-100 dark:bg-purple-950/40 text-purple-850 dark:text-purple-300 animate-pulse' :
                          'bg-rose-100 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300'
                        }`}>
                          {flight.status}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Widget B: Lalu Lintas & CCTV ATCS */}
            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-1.5">
                <span className="text-[10px] font-mono font-black text-rose-600 dark:text-rose-400 uppercase flex items-center gap-1">
                  <Camera className="h-3.5 w-3.5" /> ATCS Radar Kemacetan
                </span>
                <span className="text-[8px] text-slate-400 dark:text-slate-500 font-mono">Dinas Perhubungan</span>
              </div>

              {/* Route selector dropdown */}
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-400 dark:text-slate-500">Titik Pemantauan:</span>
                <select 
                  value={selectedRoute}
                  onChange={(e) => setSelectedRoute(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-900 border dark:border-white/10 rounded p-0.5 text-[9px] font-bold text-slate-800 dark:text-slate-200"
                >
                  <option value="pasteur">Simpang Pasteur</option>
                  <option value="dago">Dago Atas</option>
                  <option value="asia_afrika">Asia Afrika Merdeka</option>
                </select>
              </div>

              {/* Speed radar display */}
              {(() => {
                const r = trafficRoutes[selectedRoute as keyof typeof trafficRoutes];
                return (
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-250 dark:border-white/10 rounded-lg space-y-2">
                    <h5 className="text-[10px] font-bold text-[#002B5B] dark:text-slate-100 leading-snug">{r.name}</h5>
                    <div className="grid grid-cols-2 gap-2 text-center font-mono">
                      <div className="bg-white dark:bg-slate-950 p-1 rounded border dark:border-white/5">
                        <span className="text-[7.5px] text-slate-400 dark:text-slate-500 block">Kec. Rata-rata</span>
                        <strong className={`text-xs ${r.color}`}>{r.speed}</strong>
                      </div>
                      <div className="bg-white dark:bg-slate-950 p-1 rounded border dark:border-white/5">
                        <span className="text-[7.5px] text-slate-400 dark:text-slate-500 block">Status Lalin</span>
                        <strong className={`text-[9px] leading-tight block truncate ${r.color}`}>{r.level}</strong>
                      </div>
                    </div>
                    <div className="text-[8.5px] text-slate-500 dark:text-slate-400 font-mono">
                      Hambatan Jalan: <strong className="text-rose-600 dark:text-rose-400">{r.block}</strong>
                    </div>
                  </div>
                );
              })()}

              <p className="text-[9px] text-slate-400 dark:text-slate-500 leading-normal border-t dark:border-white/5 pt-2 font-mono">
                💡 <strong>Tips Lalin:</strong> Gunakan rute alternatif Pasteur Tol via Baros Cimahi guna menghindari kepadatan Simpang Kopo siang ini.
              </p>
            </div>

            {/* Widget C: Kalender & Agenda Regional */}
            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-1.5">
                <span className="text-[10px] font-mono font-black text-indigo-600 dark:text-indigo-400 uppercase flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> Kalender &amp; Hari Besar Jabar
                </span>
                <span className="text-[8px] text-slate-400 dark:text-slate-500 font-mono">Muharram 1448 H</span>
              </div>

              {/* Simple grid days list */}
              <div className="space-y-2">
                <div className="grid grid-cols-7 gap-1 text-center font-mono text-[9px] font-bold text-slate-400 dark:text-slate-500">
                  <span>S</span><span>S</span><span>R</span><span>K</span><span>J</span><span>S</span><span>M</span>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px]">
                  {[...Array(31)].map((_, i) => {
                    const day = i + 1;
                    const meta = calendarHolidays[day];
                    const isSelected = selectedDate === day;

                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedDate(day)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-bold transition cursor-pointer ${
                          meta?.isHoliday ? 'bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-900/30' :
                          meta ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900/30' : 'text-slate-700 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800'
                        } ${isSelected ? 'bg-[#002B5B] dark:bg-teal-600 text-white hover:bg-[#002B5B] dark:hover:bg-teal-600' : ''}`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Day Meta description */}
              <div className="bg-slate-50 dark:bg-slate-900 border dark:border-white/10 p-2 rounded-lg leading-relaxed text-[10px] text-slate-800 dark:text-slate-300">
                <span className="font-bold text-slate-500 dark:text-slate-400 block">Agenda {selectedDate} Juli:</span>
                {calendarHolidays[selectedDate] ? (
                  <div>
                    <strong className="text-indigo-600 dark:text-indigo-400 block">{calendarHolidays[selectedDate].title}</strong>
                    <span className="text-slate-600 dark:text-slate-400">{calendarHolidays[selectedDate].desc}</span>
                  </div>
                ) : (
                  <span className="text-slate-400 dark:text-slate-500">Tidak ada hari besar nasional atau agenda publik regional terjadwal untuk tanggal ini.</span>
                )}
              </div>

            </div>

          </div>
        )}
      </div>

      {/* FACEBOOK AD & TRENDING PLACEMENT */}
      <div className="bg-white dark:bg-[#001c3d] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-left shadow-2xs space-y-3 text-slate-900 dark:text-slate-100">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-2">
          <div className="flex items-center gap-1.5">
            <Facebook className="h-4.5 w-4.5 text-blue-600" />
            <h4 className="font-display font-black text-[11px] text-[#002B5B] dark:text-slate-100 uppercase tracking-wider">
              Facebook Sponsor Ads &amp; Trends
            </h4>
          </div>
          <span className="text-[8px] bg-blue-600 text-white font-mono font-extrabold px-1.5 py-0.2 rounded uppercase">
            SPONSOR
          </span>
        </div>

        {/* Simulated Facebook Embed */}
        <div className="bg-slate-50 dark:bg-[#001126] border border-slate-100 dark:border-white/5 rounded-xl overflow-hidden shadow-3xs">
          <div className="p-2.5 flex items-center gap-2 border-b border-slate-100 dark:border-white/5">
            <div className="w-6.5 h-6.5 rounded-full bg-blue-100 flex items-center justify-center font-bold text-[#002B5B] text-xs">
              💼
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-black text-slate-800 dark:text-slate-100">Loker Jabar Official</span>
                <span className="text-[8px] bg-blue-500 text-white px-0.5 rounded-sm">✓</span>
              </div>
              <span className="text-[8px] text-slate-400 block -mt-0.5">Sponsor • Ditautkan oleh AdOS</span>
            </div>
          </div>

          {/* Facebook post text */}
          <div className="p-2.5 space-y-2">
            <p className="text-[10px] leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
              Daftar Lowongan Kerja BUMN &amp; Swasta Terbaru Area Karawang, Bekasi, dan Bandung untuk Lulusan SMA/SMK s.d S1 Juli 2026. Daftar Gratis Tanpa Biaya Tersembunyi!
            </p>
            
            {/* Image preview link */}
            <div className="border border-slate-200 dark:border-white/5 rounded-lg overflow-hidden bg-white dark:bg-slate-900">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500" 
                alt="Corporate Office" 
                className="w-full aspect-[2/1] object-cover" 
              />
              <div className="p-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[8px] text-slate-400 uppercase tracking-widest font-mono">LOKER_JABAR_BUMN_2026</span>
                  <p className="text-[10px] font-bold text-slate-800 dark:text-slate-100 truncate mt-0.5">Daftar Lowongan Kerja Terbuka Karawang - Bandung</p>
                </div>
                <a 
                  href="#apply" 
                  className="bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold text-[8px] uppercase px-2.5 py-1.5 rounded transition shrink-0"
                >
                  Daftar Kerja
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Trending on Facebook */}
        <div className="pt-2 border-t border-slate-100 dark:border-white/10 space-y-2">
          <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
            <TrendingUp className="h-3.5 w-3.5 text-blue-600" />
            <span>Diskusi Hangat Facebook Jabar</span>
          </div>
          <div className="space-y-1.5">
            {[
              { title: "Info Lowongan Kerja Karawang-Bekasi Terkini", discussions: "42K anggota berdiskusi" },
              { title: "Grup Jual Beli Komoditas Sayur Ciwidey & Lembang", discussions: "18K anggota berdiskusi" },
              { title: "Info Terkini Kondisi Arus Lalu Lintas Puncak Bogor", discussions: "35K anggota berdiskusi" }
            ].map((item, idx) => (
              <div key={idx} className="p-1.5 bg-slate-50 dark:bg-[#001126] border border-slate-100 dark:border-white/5 rounded-lg text-[10px]">
                <p className="font-bold text-slate-800 dark:text-slate-200">{item.title}</p>
                <p className="text-[8px] text-slate-400 mt-0.5">{item.discussions}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CARD 4: AI & KOMUNITAS */}
      <div id="infobos-ai-reader-hub" className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-3.5 text-left space-y-3.5 shadow-sm">
        <button 
          onClick={() => toggleSection('aiReader')}
          className="w-full flex items-center justify-between font-display font-black text-xs text-[#002B5B] dark:text-slate-100 uppercase tracking-wider cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-teal-500" />
            <span>AI &amp; Komunitas</span>
          </span>
          <ChevronRight className={`h-4 w-4 text-slate-400 transform transition-transform duration-200 ${sectionOpen.aiReader ? 'rotate-90' : ''}`} />
        </button>

        {sectionOpen.aiReader && (
          <div className="grid grid-cols-1 gap-4 animate-fade-in pt-1">
            
            {/* Widget A: Polling Opini Publik */}
            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-1.5">
                <span className="text-[10px] font-mono font-black text-[#002B5B] dark:text-slate-100 uppercase flex items-center gap-1">
                  <MessageSquare className="h-3.5 w-3.5" /> Polling Pembaca Hari Ini
                </span>
                <span className="text-[8px] bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 px-1.5 rounded font-mono font-bold">14.8K VOTES</span>
              </div>

              <div className="space-y-2">
                <h4 className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-snug">
                  Apakah program pembebasan pajak startup digital omzet &lt; Rp 5 Miliar dari Menkeu efektif memacu ekonomi regional Jabar?
                </h4>

                {votedPoll ? (
                  <div className="space-y-2 pt-1 font-mono text-[10px]">
                    {Object.entries(pollVotes).map(([opt, val]) => {
                      const numericVal = val as number;
                      const total = (pollVotes.setuju as number) + (pollVotes.ragu as number) + (pollVotes.tidak_setuju as number);
                      const pct = Math.round((numericVal / total) * 100);
                      return (
                        <div key={opt} className="space-y-1">
                          <div className="flex justify-between text-slate-600 dark:text-slate-400 font-bold">
                            <span className="capitalize">{opt.replace('_', ' ')}</span>
                            <span>{pct}% ({numericVal} votes)</span>
                          </div>
                          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden flex">
                            <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${pct}%` }}></div>
                          </div>
                        </div>
                      );
                    })}
                    <p className="text-[8.5px] text-center text-slate-400 dark:text-slate-500 mt-2 font-bold animate-pulse">✓ Terima kasih atas partisipasi aktif Anda!</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1.5 pt-1.5">
                    <button 
                      onClick={() => handleVotePoll('setuju')}
                      className="w-full py-1.5 bg-slate-50 dark:bg-slate-900 border dark:border-white/10 hover:border-indigo-400 dark:hover:border-indigo-400 rounded-lg text-left px-3 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 transition cursor-pointer"
                    >
                      👍 Sangat Efektif &amp; Membantu
                    </button>
                    <button 
                      onClick={() => handleVotePoll('ragu')}
                      className="w-full py-1.5 bg-slate-50 dark:bg-slate-900 border dark:border-white/10 hover:border-indigo-400 dark:hover:border-indigo-400 rounded-lg text-left px-3 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 transition cursor-pointer"
                    >
                      😐 Ragu-ragu / Perlu Evaluasi
                    </button>
                    <button 
                      onClick={() => handleVotePoll('tidak_setuju')}
                      className="w-full py-1.5 bg-slate-50 dark:bg-slate-900 border dark:border-white/10 hover:border-indigo-400 dark:hover:border-indigo-400 rounded-lg text-left px-3 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 transition cursor-pointer"
                    >
                      👎 Kurang Efektif / Ada Faktor Lain
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Widget B: Ask AI (Tanya Asisten) */}
            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-1.5">
                <span className="text-[10px] font-mono font-black text-teal-600 dark:text-teal-400 uppercase flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5" /> Ask AI Redaksi InfoBOS
                </span>
                <span className="text-[8px] text-slate-400 dark:text-slate-500 font-mono">Gemini 3.5 Turbo</span>
              </div>

              {/* Chat view */}
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-2 rounded-lg text-[10px] leading-relaxed min-h-[110px] flex flex-col justify-between text-slate-800 dark:text-slate-250">
                {isAiThinking ? (
                  <div className="space-y-1.5 py-4 text-center">
                    <div className="w-4 h-4 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <span className="text-[8px] font-mono text-slate-400 dark:text-slate-500 font-bold block">AI sedang menganalisis dokumen...</span>
                  </div>
                ) : (
                  <p className="text-slate-600 dark:text-slate-350 font-medium whitespace-pre-line">{aiChatResponse}</p>
                )}

                <div className="flex flex-wrap gap-1 mt-2">
                  <button 
                    onClick={() => handleAskAi("Bagaimana kondisi cuaca hari ini?")}
                    className="text-[8px] bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-750 px-1.5 py-0.5 rounded-md font-bold transition"
                  >
                    Tanya Cuaca Jabar
                  </button>
                  <button 
                    onClick={() => handleAskAi("Apa berita ekonomi terpopuler?")}
                    className="text-[8px] bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-750 px-1.5 py-0.5 rounded-md font-bold transition"
                  >
                    Info Ekonomi
                  </button>
                  <button 
                    onClick={() => handleAskAi("Amankah sesar lembang?")}
                    className="text-[8px] bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-750 px-1.5 py-0.5 rounded-md font-bold transition"
                  >
                    Potensi Gempa
                  </button>
                </div>
              </div>

              {/* Chat Input form */}
              <div className="flex gap-1.5">
                <input 
                  type="text" 
                  placeholder="Ketik pertanyaan untuk AI..." 
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAskAi(aiQuery)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg px-2 py-1 text-[10px] focus:outline-none focus:border-teal-500 text-slate-800 dark:text-slate-200 font-medium"
                />
                <button 
                  onClick={() => handleAskAi(aiQuery)}
                  className="bg-teal-500 hover:bg-teal-600 text-white text-[10px] font-bold px-3 py-1 rounded-lg transition shrink-0"
                >
                  Kirim
                </button>
              </div>
            </div>

            {/* Widget C: Kutipan, Fakta Menarik & Topik Populer */}
            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 space-y-3">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-white/5 pb-1.5 text-[10px] font-mono font-black uppercase text-indigo-600 dark:text-indigo-400">
                <span>Quotes &amp; Trivia Hari Ini</span>
                <div className="flex gap-1">
                  <button 
                    onClick={() => setQuoteIdx((quoteIdx + 1) % quotesList.length)}
                    className="p-0.5 bg-slate-50 dark:bg-slate-900 border dark:border-white/10 rounded text-[8px] font-bold px-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition"
                    title="Quotes Lain"
                  >
                    Kutipan
                  </button>
                  <button 
                    onClick={() => setTriviaIdx((triviaIdx + 1) % triviaList.length)}
                    className="p-0.5 bg-slate-50 dark:bg-slate-900 border dark:border-white/10 rounded text-[8px] font-bold px-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition"
                    title="Trivia Lain"
                  >
                    Fakta
                  </button>
                </div>
              </div>

              {/* Quotes item card */}
              <div className="bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 p-2.5 rounded-lg space-y-1 text-[10.5px]">
                <Quote className="h-3.5 w-3.5 text-indigo-400 rotate-180" />
                <p className="italic text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                  &ldquo;{quotesList[quoteIdx].text}&rdquo;
                </p>
                <span className="text-[9px] font-bold text-indigo-800 dark:text-indigo-300 block text-right">
                  — {quotesList[quoteIdx].author}
                </span>
              </div>

              {/* Trivia item card */}
              <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 p-2.5 rounded-lg space-y-1 text-[10px] leading-relaxed">
                <div className="flex items-center gap-1">
                  <Award className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="font-bold text-emerald-900 dark:text-emerald-300">Tahukah Anda? {triviaList[triviaIdx].title}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 font-medium">{triviaList[triviaIdx].text}</p>
              </div>

            </div>

          </div>
        )}
      </div>

      {/* TOPIC POPULER SPEED BAR */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-3.5 text-left space-y-3 shadow-sm">
        <div className="flex items-center gap-1">
          <TrendingUp className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
          <span className="text-[10px] font-mono font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">TOPIK POPULER JABAR:</span>
        </div>
        
        {/* Topic Tag bubbles */}
        <div className="flex flex-wrap gap-1.5 items-center">
          {trendingTopics.map((topic, idx) => (
            <div 
              key={idx}
              onMouseEnter={() => setHoveredTopic(topic.tag)}
              onMouseLeave={() => setHoveredTopic(null)}
              onClick={() => onSelectLocation(topic.tag)}
              className="relative px-2 py-0.5 bg-slate-200/60 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-indigo-950/40 hover:text-indigo-700 dark:hover:text-indigo-300 rounded-full text-[9px] font-bold font-mono transition cursor-pointer flex items-center gap-1 text-slate-600 dark:text-slate-300 border border-transparent hover:border-indigo-300 dark:hover:border-indigo-900/40"
            >
              <span>#{topic.tag}</span>
              <span className="text-[8px] text-emerald-600 dark:text-emerald-400 font-black">{topic.trend}</span>
              
              {hoveredTopic === topic.tag && (
                <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] p-1 px-2 rounded-md shadow-lg z-50 whitespace-nowrap">
                  Volume: {topic.vol}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
