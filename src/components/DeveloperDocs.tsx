import React, { useState } from 'react';
import { 
  Terminal, Code2, Server, Key, Copy, Check, Send, Sparkles, 
  RefreshCw, CheckCircle, Cpu, Shield, HelpCircle, FileJson 
} from 'lucide-react';

interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  summary: string;
  description: string;
  parameters?: { name: string; type: string; required: boolean; desc: string }[];
  requestBody?: string;
  responseBody: string;
}

export default function DeveloperDocs() {
  const [copiedKey, setCopiedKey] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [activeTab, setActiveTab] = useState<'endpoints' | 'auth' | 'playground'>('endpoints');
  const [selectedEndpointIndex, setSelectedEndpointIndex] = useState(0);
  
  // Interactive client state
  const [playgroundLoading, setPlaygroundLoading] = useState(false);
  const [playgroundResponse, setPlaygroundResponse] = useState<string | null>(null);
  const [playgroundParamId, setPlaygroundParamId] = useState('live-feed');

  // Copy code helper
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const endpoints: Endpoint[] = [
    {
      method: 'GET',
      path: '/api/v1/contents',
      summary: 'Dapatkan daftar konten berita terpublikasi',
      description: 'Menarik katalog artikel berita dengan filter kategori, kata kunci, tingkat risiko, dan nama kota regional Jawa Barat.',
      parameters: [
        { name: 'category', type: 'string', required: false, desc: 'Filter berdasarkan slug kategori (misalnya: live-feed, regional, business).' },
        { name: 'location', type: 'string', required: false, desc: 'Filter berdasarkan slug lokasi (misalnya: bandung-raya, bogor, garut).' },
        { name: 'limit', type: 'number', required: false, desc: 'Batas jumlah data yang ditarik (default: 10).' }
      ],
      responseBody: JSON.stringify({
        status: "success",
        count: 2,
        contents: [
          {
            id: "content-a1",
            title: "Pawai Budaya Festival Asia Afrika Mengguncang Bandung",
            slug: "festival-asia-afrika",
            contentType: "live-feed",
            primaryCategoryId: "cat-live",
            categoryName: "Live Feed",
            sentiment: "positive",
            publishedAt: "2026-07-16T18:30:00Z",
            summary: "Siaran langsung pawai delegasi budaya dari 20 negara sahabat."
          },
          {
            id: "content-a2",
            title: "Pemprov Jabar Luncurkan Subsidi Logistik Desa",
            slug: "subsidi-logistik",
            contentType: "article",
            primaryCategoryId: "cat-nasional",
            categoryName: "Nasional",
            sentiment: "neutral",
            publishedAt: "2026-07-16T11:30:00Z",
            summary: "Skema bantuan ongkir pangan untuk menahan gejolak inflasi."
          }
        ]
      }, null, 2)
    },
    {
      method: 'POST',
      path: '/api/v1/sentiment',
      summary: 'Analisis sentimen teks kustom secara real-time',
      description: 'Mengirimkan teks opini masyarakat atau kutipan media ke engine sentimen AI untuk mengekstrak sentimen dan label risiko publik.',
      requestBody: JSON.stringify({
        text: "Macet parah di gerbang tol Pasteur malam ini, koordinasi lalu lintas lambat.",
        language: "id"
      }, null, 2),
      responseBody: JSON.stringify({
        status: "success",
        sentiment: "negative",
        score: -0.84,
        metrics: {
          toxicity: 0.12,
          urgency: 0.85,
          subjectivity: 0.9
        },
        entityExtracted: ["tol Pasteur", "kemacetan"],
        actionRecommended: "Kirim notifikasi lalu lintas darurat via geoos"
      }, null, 2)
    },
    {
      method: 'GET',
      path: '/api/v1/geo-data',
      summary: 'Tarik koordinat spasial pemetaan wilayah Jabar',
      description: 'Memperoleh data koordinat marker dari infrastruktur, titik kemacetan, lokasi bencana, dan ketersediaan komoditas di pasar.',
      parameters: [
        { name: 'layer', type: 'string', required: true, desc: 'Jenis layer spasial (landslide, market_prices, traffic_jam).' }
      ],
      responseBody: JSON.stringify({
        status: "success",
        layer: "landslide",
        updatedAt: "2026-07-16T20:10:00Z",
        features: [
          {
            type: "Feature",
            properties: {
              region: "Cianjur Utara",
              riskRating: "Tinggi",
              incidentsCount: 3
            },
            geometry: {
              type: "Point",
              coordinates: [107.1425, -6.8219]
            }
          }
        ]
      }, null, 2)
    }
  ];

  const handleGenerateKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = 'ib_live_';
    for (let i = 0; i < 32; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setApiKey(key);
  };

  const handleCopyKey = () => {
    if (!apiKey) return;
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleCopyCode = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const activeEndpoint = endpoints[selectedEndpointIndex] || endpoints[0];

  // Playground simulated send
  const handlePlaygroundSend = () => {
    setPlaygroundLoading(true);
    setPlaygroundResponse(null);
    
    setTimeout(() => {
      setPlaygroundLoading(false);
      if (activeEndpoint.method === 'GET') {
        const body = JSON.parse(activeEndpoint.responseBody);
        if (body.count) {
          body.contents = body.contents.map((item: any) => ({
            ...item,
            categoryName: playgroundParamId ? String(playgroundParamId).toUpperCase() : item.categoryName
          }));
        }
        setPlaygroundResponse(JSON.stringify(body, null, 2));
      } else {
        setPlaygroundResponse(activeEndpoint.responseBody);
      }
    }, 1200);
  };

  return (
    <div id="developer-docs-page" className="max-w-6xl mx-auto space-y-6 sm:space-y-8 p-4 sm:p-6 animate-fade-in">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-br from-[#0a1e3d] via-[#0f172a] to-slate-900 border border-slate-200/10 dark:border-slate-800/80 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg transition-all duration-300">
        <div className="absolute -top-12 -right-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 z-10 relative text-left">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-indigo-500 text-white text-[10px] font-mono font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                API INTEGRATION HUB
              </span>
              <span className="text-slate-300 text-xs font-semibold">Dokumentasi REST API v1.4</span>
            </div>
            <h1 className="text-2xl sm:text-3.5xl font-display font-black tracking-tight leading-none text-white">
              Developer & API Portal 💻
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Integrasikan portal berita regional Anda, aplikasi analisis sentimen lokal, atau visualisasi spasial GIS secara terprogram. Gunakan SDK dan rest-client bawaan kami.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shrink-0 text-center space-y-2 max-w-xs w-full lg:w-auto shadow-inner">
            <Terminal className="h-8 w-8 text-indigo-400 mx-auto animate-pulse" />
            <span className="text-xs font-bold text-slate-150 block">Konektivitas Global</span>
            <span className="text-[10px] text-slate-300 block leading-snug">Autentikasi Bearer Token terenkripsi AES-256.</span>
          </div>
        </div>
      </div>

      {/* HORIZONTAL TAB SELECTOR */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-1.5 overflow-x-auto pb-px">
        <button
          onClick={() => setActiveTab('endpoints')}
          className={`px-5 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all duration-200 cursor-pointer flex items-center gap-2 ${
            activeTab === 'endpoints' 
              ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 font-extrabold' 
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-300'
          }`}
        >
          <Server className="h-4 w-4" />
          <span>Endpoint List</span>
        </button>
        <button
          onClick={() => setActiveTab('auth')}
          className={`px-5 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all duration-200 cursor-pointer flex items-center gap-2 ${
            activeTab === 'auth' 
              ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 font-extrabold' 
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-300'
          }`}
        >
          <Key className="h-4 w-4" />
          <span>API Key Generator</span>
        </button>
        <button
          onClick={() => setActiveTab('playground')}
          className={`px-5 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all duration-200 cursor-pointer flex items-center gap-2 ${
            activeTab === 'playground' 
              ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 font-extrabold' 
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-300'
          }`}
        >
          <Code2 className="h-4 w-4" />
          <span>Interactive Playground</span>
        </button>
      </div>

      {/* CORE DISPLAY CONTENT */}
      <div className="text-left">
        
        {/* TAB 1: ENDPOINT SPEC LIST */}
        {activeTab === 'endpoints' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Nav (4 of 12) */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-[10px] font-mono font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider block pl-1">
                Daftar Method & Path
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
                {endpoints.map((ep, idx) => {
                  const isSelected = idx === selectedEndpointIndex;
                  return (
                    <div 
                      key={idx}
                      onClick={() => setSelectedEndpointIndex(idx)}
                      className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer text-left space-y-2 ${
                        isSelected 
                          ? 'bg-indigo-500/[0.03] border-indigo-500 shadow-sm ring-1 ring-indigo-500/10' 
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950/30 hover:border-slate-300 dark:hover:border-slate-700 shadow-3xs'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-black uppercase tracking-wider ${
                          ep.method === 'GET' 
                            ? 'bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20' 
                            : 'bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/20'
                        }`}>
                          {ep.method}
                        </span>
                        <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 truncate">{ep.path}</span>
                      </div>
                      <h4 className={`text-xs font-black leading-snug transition-colors ${
                        isSelected ? 'text-indigo-600 dark:text-indigo-400 font-extrabold' : 'text-slate-700 dark:text-slate-300'
                      }`}>
                        {ep.summary}
                      </h4>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Spec Reader (8 of 12) */}
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6 shadow-sm">
              
              <div className="space-y-3.5 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2.5 py-0.5 rounded font-mono text-xs font-black ${
                    activeEndpoint.method === 'GET' ? 'bg-emerald-500 text-white' : 'bg-indigo-600 text-white'
                  }`}>
                    {activeEndpoint.method}
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-950 px-2.5 py-1 rounded-lg">
                    https://infobos.co{activeEndpoint.path}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-display font-black text-slate-900 dark:text-white leading-tight">
                  {activeEndpoint.summary}
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-300 leading-relaxed">
                  {activeEndpoint.description}
                </p>
              </div>

              {/* Param Table if exists */}
              {activeEndpoint.parameters && activeEndpoint.parameters.length > 0 && (
                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest pl-1">Query Parameters</span>
                  <div className="overflow-x-auto border border-slate-150 dark:border-slate-800 rounded-xl shadow-3xs">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-950/60 text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase border-b border-slate-150 dark:border-slate-800">
                          <th className="p-3">Name</th>
                          <th className="p-3">Type</th>
                          <th className="p-3">Required</th>
                          <th className="p-3">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-[11px] text-slate-650 dark:text-slate-300">
                        {activeEndpoint.parameters.map((param, pIdx) => (
                          <tr key={pIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                            <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{param.name}</td>
                            <td className="p-3 font-mono text-slate-400 dark:text-slate-500">{param.type}</td>
                            <td className="p-3">
                              {param.required ? (
                                <span className="text-rose-500 font-black font-mono bg-rose-50 dark:bg-rose-950/30 px-1.5 py-0.2 rounded text-[10px]">YES</span>
                              ) : (
                                <span className="text-slate-400 font-mono text-[10px]">NO</span>
                              )}
                            </td>
                            <td className="p-3 leading-relaxed">{param.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Sample Code blocks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* JavaScript Fetch */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between pl-1">
                    <span className="text-[9px] font-mono font-black text-slate-400 uppercase">JavaScript (Fetch)</span>
                    <button 
                      onClick={() => handleCopyCode(`fetch('https://infobos.co${activeEndpoint.path}', {\n  headers: {\n    'Authorization': 'Bearer YOUR_API_KEY'\n  }\n})\n.then(res => res.json())\n.then(data => console.log(data));`, 1)}
                      className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                      title="Salin Code"
                    >
                      {copiedIndex === 1 ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-950 text-slate-300 text-[10px] font-mono overflow-x-auto leading-relaxed border border-white/5 shadow-inner">
                    {`fetch('https://infobos.co${activeEndpoint.path}', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
.then(res => res.json())
.then(data => console.log(data));`}
                  </pre>
                </div>

                {/* Python Requests */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between pl-1">
                    <span className="text-[9px] font-mono font-black text-slate-400 uppercase">Python (Requests)</span>
                    <button 
                      onClick={() => handleCopyCode(`import requests\n\nurl = "https://infobos.co${activeEndpoint.path}"\nheaders = {\n    "Authorization": "Bearer YOUR_API_KEY"\n}\n\nr = requests.${activeEndpoint.method.toLowerCase()}(url, headers=headers)\nprint(r.json())`, 2)}
                      className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                      title="Salin Code"
                    >
                      {copiedIndex === 2 ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-950 text-slate-300 text-[10px] font-mono overflow-x-auto leading-relaxed border border-white/5 shadow-inner">
                    {`import requests

url = "https://infobos.co${activeEndpoint.path}"
headers = {
    "Authorization": "Bearer YOUR_API_KEY"
}

r = requests.${activeEndpoint.method.toLowerCase()}(url, headers=headers)
print(r.json())`}
                  </pre>
                </div>

              </div>

              {/* Response Block JSON */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest pl-1">Example Response</span>
                <pre className="p-4 rounded-xl bg-slate-950 text-emerald-450 text-[11px] font-mono overflow-x-auto leading-relaxed border border-white/5 shadow-inner">
                  {activeEndpoint.responseBody}
                </pre>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: API KEY GENERATOR */}
        {activeTab === 'auth' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 max-w-2xl mx-auto shadow-md">
            
            <div className="text-center space-y-3 max-w-md mx-auto">
              <div className="h-14 w-14 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mx-auto shadow-xs">
                <Shield className="h-8 w-8 text-indigo-500 animate-pulse" />
              </div>
              <h3 className="text-base sm:text-lg font-display font-black text-slate-900 dark:text-white leading-none">
                Buat Token Kredensial Developer
              </h3>
              <p className="text-xs text-slate-450 leading-relaxed">
                Gunakan API key ini untuk mengautentikasi request client Anda ke server INFOBOS. Key ini bersifat rahasia dan memberikan hak akses setara level profil Anda.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950/40 p-5 rounded-2xl border border-slate-150 dark:border-slate-800 text-center space-y-4">
              
              {!apiKey ? (
                <button
                  onClick={handleGenerateKey}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-250 flex items-center gap-2 shadow-md mx-auto cursor-pointer transform hover:-translate-y-0.5"
                >
                  <Key className="h-4 w-4" />
                  <span>Generate New API Key</span>
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 max-w-md mx-auto bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-850 px-3.5 py-2.5 rounded-xl shadow-3xs">
                    <span className="text-xs font-mono font-black text-indigo-500 select-all truncate flex-1 text-left">
                      {apiKey}
                    </span>
                    <button
                      onClick={handleCopyKey}
                      className="p-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                      title="Salin Kunci"
                    >
                      {copiedKey ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                  
                  <div className="flex justify-center items-center gap-1.5 text-[11px] text-emerald-500 font-bold font-mono bg-emerald-500/5 py-1 px-3 rounded-lg w-max mx-auto border border-emerald-500/10">
                    <CheckCircle className="h-4 w-4" /> Token aktif & siap terhubung ke /api/v1/
                  </div>
                </div>
              )}

            </div>

            <div className="space-y-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4 pl-1">
              <h4 className="font-black text-slate-800 dark:text-slate-200 flex items-center gap-1.5 uppercase tracking-wider text-[10px] font-mono">
                <HelpCircle className="h-4 w-4 text-indigo-400" />
                Ketentuan Penggunaan Kunci API:
              </h4>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-500 dark:text-slate-400">
                <li>Batasan Kuota / Rate Limiting: 60 Request per menit untuk akun basic.</li>
                <li>Sertakan Header: <code className="bg-slate-150 dark:bg-slate-800 px-1.5 py-0.5 rounded text-indigo-500 dark:text-indigo-400 text-[10.5px] font-mono font-bold">"Authorization": "Bearer ib_live_..."</code> pada setiap call.</li>
                <li>Jangan pernah memperlihatkan atau menyalin API key di repositori publik front-end Anda.</li>
              </ul>
            </div>

          </div>
        )}

        {/* TAB 3: PLAYGROUND SIMULATOR */}
        {activeTab === 'playground' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Playground Editor Input (5 of 12) */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-5 text-left shadow-sm">
              
              <div className="space-y-5">
                <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/40 pb-3">
                  <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500">
                    <Cpu className="h-4.5 w-4.5 text-indigo-500" />
                  </div>
                  <h3 className="font-display font-black text-xs text-slate-800 dark:text-white uppercase tracking-wider">
                    Konfigurasi Request Client
                  </h3>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-black uppercase text-slate-400 dark:text-slate-500 block">Pilih Target Endpoint</label>
                  <select 
                    value={selectedEndpointIndex}
                    onChange={(e) => {
                      setSelectedEndpointIndex(Number(e.target.value));
                      setPlaygroundResponse(null);
                    }}
                    className="w-full text-xs font-bold px-3.5 py-2.5 border rounded-xl bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-750 text-slate-850 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  >
                    {endpoints.map((ep, idx) => (
                      <option key={idx} value={idx}>{ep.method} {ep.path}</option>
                    ))}
                  </select>
                </div>

                {activeEndpoint.method === 'GET' ? (
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-black uppercase text-slate-400 dark:text-slate-500 block">Parameter Kategori (category)</label>
                    <input 
                      type="text" 
                      value={playgroundParamId}
                      onChange={(e) => setPlaygroundParamId(e.target.value)}
                      placeholder="Contoh: live-feed"
                      className="w-full text-xs font-bold px-3.5 py-2.5 border rounded-xl bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-750 text-slate-850 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-black uppercase text-slate-400 dark:text-slate-500 block">Request Body JSON</label>
                    <pre className="p-4 rounded-xl bg-slate-950 text-slate-350 text-[10px] font-mono overflow-x-auto leading-relaxed border border-white/5">
                      {activeEndpoint.requestBody}
                    </pre>
                  </div>
                )}
              </div>

              <button
                disabled={playgroundLoading}
                onClick={handlePlaygroundSend}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-md mt-4 cursor-pointer transform hover:-translate-y-0.5"
              >
                {playgroundLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                <span>{playgroundLoading ? 'Mengirim Request...' : 'Kirim Test Request API'}</span>
              </button>

            </div>

            {/* Playground Code Output (7 of 12) */}
            <div className="lg:col-span-7 bg-[#0b1329] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-lg text-left">
              
              <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500 block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500 block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500 block" />
                  </div>
                  <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest pl-2 border-l border-slate-800 ml-1">
                    Response Console
                  </span>
                </div>
                {playgroundResponse && (
                  <span className="bg-emerald-500/10 text-emerald-450 text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded border border-emerald-500/10 animate-pulse">
                    Status: 200 OK
                  </span>
                )}
              </div>

              <div className="flex-1 flex flex-col items-center justify-center min-h-[300px]">
                {playgroundLoading ? (
                  <div className="text-center space-y-3">
                    <RefreshCw className="h-9 w-9 text-indigo-400 animate-spin mx-auto" />
                    <span className="text-xs font-mono font-bold text-slate-400">Menyambungkan ke Gateway...</span>
                  </div>
                ) : playgroundResponse ? (
                  <pre className="w-full text-emerald-400 text-[11px] font-mono text-left leading-relaxed overflow-x-auto whitespace-pre">
                    {playgroundResponse}
                  </pre>
                ) : (
                  <div className="text-center space-y-3 text-slate-500 max-w-sm">
                    <Terminal className="h-10 w-10 text-slate-700 mx-auto" />
                    <p className="text-xs font-mono font-bold text-slate-400">Belum ada request yang dikirim.</p>
                    <p className="text-[11px] text-slate-500 leading-relaxed">Pilih endpoint dan klik tombol kirim di kolom kiri untuk melihat simulasi output server.</p>
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}
