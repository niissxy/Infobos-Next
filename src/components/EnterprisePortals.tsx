import React, { useState } from 'react';
import { 
  FileText, CheckCircle2, Clock, MapPin, Database, Award, HelpCircle, 
  Settings, Users, ShieldAlert, Cpu, Layers, DollarSign, Layout, 
  Activity, Radio, AlertCircle, Heart, Globe, RefreshCw, Plus, Send, Play, BarChart2,
  Terminal, Code, Server, HardDrive, FileSpreadsheet, ShieldCheck, Sparkles, TrendingUp, Filter, CheckCircle, Search, Coins, FolderOpen
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import AIAnalyticsDashboard from './AIAnalyticsDashboard';

// ==========================================
// 1. REPORTER PORTAL
// ==========================================
interface PortalProps {
  user: any;
  token?: string;
  onNavigateToArticle?: (slug: string) => void;
}

export function ReporterPortal({ user }: PortalProps) {
  const [activeTab, setActiveTab] = useState<'assignments' | 'coverage' | 'draft' | 'breaking' | 'calendar' | 'media' | 'location' | 'notes' | 'status'>('assignments');
  const [notes, setNotes] = useState<string>('Catatan peliputan Pemprov Jabar: Wawancara Sekda dijadwalkan jam 15:00 WIB.');

  return (
    <div className="space-y-6 text-left">
      <div className="flex justify-between items-center border-b dark:border-white/10 pb-4">
        <div>
          <span className="text-xs font-bold text-[#2B7A78] dark:text-teal-400 font-mono">REPORTER PORTAL</span>
          <h2 className="text-xl font-black text-[#002B5B] dark:text-white">Kanal Jurnalistik Lapangan</h2>
        </div>
        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded font-mono font-bold">REPORTER ACTIVE</span>
      </div>

      <div className="flex gap-2 border-b dark:border-white/10 pb-2 overflow-x-auto text-xs font-semibold">
        {['assignments', 'coverage', 'draft', 'breaking', 'calendar', 'media', 'location', 'notes', 'status'].map(t => (
          <button 
            key={t} 
            onClick={() => setActiveTab(t as any)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap capitalize transition ${activeTab === t ? 'bg-[#002B5B] dark:bg-sky-500/10 text-white dark:text-sky-400 border dark:border-sky-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40'}`}
          >
            {t.replace('-', ' ')}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-[#001733]/40 border border-slate-200 dark:border-white/10 rounded-xl p-5 min-h-[300px]">
        {activeTab === 'assignments' && (
          <div className="space-y-3">
            <h3 className="font-bold text-xs text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Penugasan Liputan Redaksi</h3>
            <div className="p-4 border rounded-xl bg-amber-50/30 dark:bg-amber-950/15 border-amber-200 dark:border-amber-900/30 text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-black text-amber-800 dark:text-amber-200">URGENT: Dampak Revitalisasi Gedung Sate</span>
                <span className="bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-mono text-[9px] px-1.5 py-0.2 rounded font-bold">DEADLINE: HARI INI</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300">Ambil foto udara di lokasi, lakukan wawancara acak dengan 3 pengunjung serta pedagang sekitar.</p>
              <button className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded font-bold text-[10px]">Terima Penugasan &rarr;</button>
            </div>
          </div>
        )}

        {activeTab === 'coverage' && (
          <div className="space-y-2 text-xs">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono">Rencana Coverage Area</h3>
            <p className="text-slate-500 dark:text-slate-400">Peta daerah pantauan prioritas tinggi berdasarkan anomali data jurnalisme daerah.</p>
            <div className="p-3 bg-slate-50 dark:bg-[#001f42]/40 border border-slate-200 dark:border-white/10 rounded font-mono text-slate-600 dark:text-slate-300">
               Bandung Wetan (Ring 1 Pemprov): <strong>High Activity</strong>
            </div>
          </div>
        )}

        {activeTab === 'draft' && (
          <div className="space-y-3 text-xs">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono">Konsep Laporan Kasar</h3>
            <div className="p-3 bg-slate-50 dark:bg-[#001f42]/40 border border-slate-200 dark:border-white/10 rounded flex justify-between items-center">
              <span className="text-slate-800 dark:text-slate-200">Rancangan Berita: Penertiban PKL Sekitar Lapangan Gasibu</span>
              <button className="text-[#2B7A78] dark:text-teal-400 font-bold hover:underline">Edit Tulisan</button>
            </div>
          </div>
        )}

        {activeTab === 'breaking' && (
          <div className="space-y-3 text-xs">
            <h3 className="font-bold text-rose-600 dark:text-rose-400 uppercase font-mono flex items-center gap-1.5">
              <Radio className="h-4 w-4 animate-pulse" /> Laporkan Breaking News Instan
            </h3>
            <textarea placeholder="Tulis kejadian penting dari lapangan secara singkat untuk langsung dipush ke Editor..." className="w-full bg-slate-50 dark:bg-[#001f42]/60 border border-slate-200 dark:border-white/10 rounded-lg p-3 text-xs focus:outline-none resize-none text-slate-800 dark:text-white" rows={4} />
            <button className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg transition shadow-xs">Push Ke Meja Sidang Redaksi</button>
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono">Kalender Sidang Redaksional</h3>
            <p>27 Juni 2026 - Rapat Evaluasi Kinerja Ingestion Regional Jabar.</p>
          </div>
        )}

        {activeTab === 'media' && (
          <div className="space-y-2 text-xs text-center py-6">
            <Database className="h-8 w-8 text-slate-300 dark:text-slate-600 mx-auto" />
            <p className="font-bold text-slate-500 dark:text-slate-400">Upload Dokumen/Gambar Lapangan</p>
            <button className="px-3 py-1 bg-slate-100 dark:bg-slate-800 border dark:border-white/10 hover:bg-slate-200 dark:hover:bg-slate-700 rounded font-bold text-slate-700 dark:text-slate-300">Pilih File</button>
          </div>
        )}

        {activeTab === 'location' && (
          <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono">Geo Tagging Lapangan</h3>
            <p className="font-mono">Lat: -6.9025 | Lon: 107.6186 (Gedung Sate)</p>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-3 text-xs">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono">Catatan Jurnalis</h3>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full bg-slate-50 dark:bg-[#001f42]/60 border border-slate-200 dark:border-white/10 rounded-lg p-3 text-xs focus:outline-none resize-none text-slate-800 dark:text-white" rows={4} />
            <button className="px-4 py-2 bg-[#002B5B] dark:bg-sky-500/10 hover:bg-[#001f42] dark:hover:bg-sky-500/20 text-white dark:text-sky-400 border dark:border-sky-500/20 font-bold rounded-lg transition">Simpan Catatan</button>
          </div>
        )}

        {activeTab === 'status' && (
          <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono">Status Persetujuan Naskah</h3>
            <div className="p-3 bg-white dark:bg-[#001f42]/40 border border-slate-200 dark:border-white/10 rounded-lg flex justify-between font-mono">
              <span className="text-slate-800 dark:text-slate-200">Naskah: MRT Jabar Selatan</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">Sedang Ditinjau Managing Editor</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 2. EDITOR PORTAL
// ==========================================
export function EditorPortal({ user }: PortalProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'review' | 'approval' | 'publishing' | 'factcheck' | 'revision' | 'assignments' | 'calendar' | 'workflow' | 'analytics'>('dashboard');

  return (
    <div className="space-y-6 text-left">
      <div className="flex justify-between items-center border-b dark:border-white/10 pb-4">
        <div>
          <span className="text-xs font-bold text-[#2B7A78] dark:text-teal-400 font-mono">EDITOR PORTAL</span>
          <h2 className="text-xl font-black text-[#002B5B] dark:text-white">Konsol Editor Sidang Redaksi</h2>
        </div>
        <span className="text-[10px] bg-[#002B5B] dark:bg-[#FFD700] text-[#FFD700] dark:text-slate-950 px-2 py-1 rounded font-mono font-bold">EDITOR CHIEF IN COMMAND</span>
      </div>

      <div className="flex gap-2 border-b dark:border-white/10 pb-2 overflow-x-auto text-xs font-semibold">
        {['dashboard', 'review', 'approval', 'publishing', 'factcheck', 'revision', 'assignments', 'calendar', 'workflow', 'analytics'].map(t => (
          <button 
            key={t} 
            onClick={() => setActiveTab(t as any)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap capitalize transition ${activeTab === t ? 'bg-[#002B5B] dark:bg-sky-500/10 text-white dark:text-sky-400 border dark:border-sky-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40'}`}
          >
            {t.replace('-', ' ')}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-[#001733]/40 border border-slate-200 dark:border-white/10 rounded-xl p-5 min-h-[300px]">
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-[#001f42]/40 space-y-1">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase font-mono">Menunggu Review</span>
              <div className="text-xl font-black text-[#002B5B] dark:text-white">8 Berita</div>
              <p className="text-[9px] text-slate-400 dark:text-slate-500">Dari Reporter &amp; Creator Partner.</p>
            </div>
            <div className="p-4 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-[#001f42]/40 space-y-1">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase font-mono">Perlu Fact Check</span>
              <div className="text-xl font-black text-[#002B5B] dark:text-white">3 Isu</div>
              <p className="text-[9px] text-amber-600 dark:text-amber-400 font-bold">Prioritas verifikasi tinggi.</p>
            </div>
            <div className="p-4 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-[#001f42]/40 space-y-1">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase font-mono">Tayang Hari Ini</span>
              <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">12 Berita</div>
              <p className="text-[9px] text-slate-400 dark:text-slate-500">Telah tersindikasi ke seluruh portal.</p>
            </div>
          </div>
        )}

        {activeTab === 'review' && (
          <div className="space-y-3 text-xs">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono">Naskah Butuh Review</h3>
            <div className="p-3 bg-slate-50 dark:bg-[#001f42]/40 border border-slate-200 dark:border-white/10 rounded-lg flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200">Dampak Revitalisasi Jalan Asia Afrika Bandung</span>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">Penulis: Budi Santoso (Reporter)</p>
              </div>
              <button className="px-3 py-1 bg-[#002B5B] dark:bg-sky-500/10 hover:bg-slate-800 dark:hover:bg-sky-500/20 text-white dark:text-sky-400 border dark:border-sky-500/20 rounded font-bold transition">Baca &amp; Koreksi &rarr;</button>
            </div>
          </div>
        )}

        {activeTab === 'approval' && (
          <div className="space-y-3 text-xs">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono">Persetujuan Publikasi (Approval)</h3>
            <div className="p-3 bg-emerald-50/40 dark:bg-emerald-950/15 border border-emerald-200 dark:border-emerald-800/30 rounded-lg flex justify-between items-center">
              <div>
                <span className="font-bold text-emerald-950 dark:text-emerald-200">Draft Investigasi: Kasus Suap Dana Hibah Desa</span>
                <p className="text-[10px] text-emerald-700 dark:text-emerald-400">Telah lolos verifikasi hukum &amp; dewan pers.</p>
              </div>
              <div className="flex gap-2">
                <button className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold transition">Setujui</button>
                <button className="px-2 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded font-bold transition">Tolak</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'publishing' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Publishing Queue</h3>
            <p>Berita terjadwal berikutnya akan terbit pada pukul 16:00 WIB.</p>
          </div>
        )}

        {activeTab === 'factcheck' && (
          <div className="space-y-2 text-xs">
            <h3 className="font-bold text-amber-600 dark:text-amber-400 uppercase font-mono flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" /> Fact Checking Center
            </h3>
            <p className="text-slate-500 dark:text-slate-400">Bandingkan naskah dengan database intelijen nasional untuk mendeteksi disinformasi.</p>
            <div className="p-3 bg-amber-50/40 dark:bg-amber-950/15 border border-amber-200 dark:border-amber-900/30 rounded-lg">
              <span className="text-slate-700 dark:text-slate-300">Status: <strong>No major anomalies detected</strong> in the active queue.</span>
            </div>
          </div>
        )}

        {activeTab === 'revision' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Permintaan Revisi Naskah</h3>
            <span>0 naskah sedang dalam revisi oleh reporter.</span>
          </div>
        )}

        {activeTab === 'assignments' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Penugasan Wartawan</h3>
            <button className="px-3 py-1.5 bg-[#002B5B] dark:bg-sky-500/10 hover:bg-slate-800 dark:hover:bg-sky-500/20 text-white dark:text-sky-400 border dark:border-sky-500/20 rounded-lg font-bold flex items-center gap-1.5 transition">
              <Plus className="h-3.5 w-3.5" /> Buat Penugasan Baru
            </button>
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Editorial Calendar</h3>
            <p>27 Juni - Sidang Redaksi Jurnal Investigasi Triwulan.</p>
          </div>
        )}

        {activeTab === 'workflow' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Workflow &amp; State Monitoring</h3>
            <p>Alur kerja saat ini: <strong className="text-slate-800 dark:text-slate-200">Reporter &rarr; Fact-Check &rarr; Editor &rarr; Chief Editor &rarr; Live Portal</strong>.</p>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Analisis Performa Redaksional</h3>
            <p>Total produktivitas bulan ini: <strong className="text-emerald-600 dark:text-emerald-400">▲ 24.8%</strong> dibanding kuartal sebelumnya.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 3. ADVERTISER PORTAL
// ==========================================
export function AdvertiserPortal({ user }: PortalProps) {
  const [activeTab, setActiveTab] = useState<'campaign' | 'creative' | 'placement' | 'budget' | 'invoice' | 'payment' | 'analytics' | 'ratecard' | 'support'>('campaign');

  const chartData = [
    { label: 'Tgl 1', impressions: 45000, clicks: 1200 },
    { label: 'Tgl 5', impressions: 58000, clicks: 1650 },
    { label: 'Tgl 10', impressions: 89000, clicks: 2400 },
    { label: 'Tgl 15', impressions: 124000, clicks: 3950 },
    { label: 'Tgl 20', impressions: 184500, clicks: 5800 },
    { label: 'Tgl 25', impressions: 240000, clicks: 7800 }
  ];

  return (
    <div className="space-y-6 text-left">
      <div className="flex justify-between items-center border-b dark:border-white/10 pb-4">
        <div>
          <span className="text-xs font-bold text-teal-600 dark:text-teal-400 font-mono">ADVERTISER PORTAL</span>
          <h2 className="text-xl font-black text-[#002B5B] dark:text-white">Portal Mitra Pengiklan (AdOS)</h2>
        </div>
        <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 px-2 py-1 rounded font-mono font-bold">BILLING VERIFIED</span>
      </div>

      <div className="flex gap-2 border-b dark:border-white/10 pb-2 overflow-x-auto text-xs font-semibold">
        {['campaign', 'creative', 'placement', 'budget', 'invoice', 'payment', 'analytics', 'ratecard', 'support'].map(t => (
          <button 
            key={t} 
            onClick={() => setActiveTab(t as any)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap capitalize transition ${activeTab === t ? 'bg-[#002B5B] dark:bg-sky-500/10 text-white dark:text-sky-400 border dark:border-sky-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-[#001733]/40 border border-slate-200 dark:border-white/10 rounded-xl p-5 min-h-[300px]">
        {activeTab === 'campaign' && (
          <div className="space-y-3 text-xs">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono">Daftar Kampanye Aktif</h3>
            <div className="p-4 bg-slate-50 dark:bg-[#001f42]/40 border border-slate-200 dark:border-white/10 rounded-xl flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200">Kampanye BJB Mesra Jabar 2026</span>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">Masa aktif: 1 Juni - 30 Juni 2026</p>
              </div>
              <span className="bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-mono font-bold text-[9px] px-2 py-0.5 rounded uppercase">AKTIF</span>
            </div>
          </div>
        )}

        {activeTab === 'creative' && (
          <div className="space-y-2 text-xs">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono">Materi Kreatif AdOS</h3>
            <p className="text-slate-400 dark:text-slate-500">Materi iklan banner format JPG/GIF yang tersimpan di server.</p>
            <div className="p-3 bg-slate-50 dark:bg-[#001f42]/40 border border-slate-200 dark:border-white/10 rounded font-mono text-slate-700 dark:text-slate-300">
              bjb-mesra-sidebar-banner-300x250.jpg (Active)
            </div>
          </div>
        )}

        {activeTab === 'placement' && (
          <div className="text-xs text-slate-500 dark:text-slate-400 space-y-2">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono">Zona Penempatan Monetisasi (AdZones)</h3>
            <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
              <li><strong>sponsored_search_result</strong> (Kecocokan kata kunci pencarian)</li>
              <li><strong>promoted_company</strong> (Sponsor korporat di panel info)</li>
            </ul>
          </div>
        )}

        {activeTab === 'budget' && (
          <div className="p-4 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50/50 dark:bg-[#001f42]/40 text-xs space-y-2">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono">Sisa Anggaran Deposit</h3>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">Rp 12.500.000</div>
            <p className="text-slate-400 dark:text-slate-500">Perkiraan habis dalam: 14 hari kerja (berdasarkan CTR harian).</p>
          </div>
        )}

        {activeTab === 'invoice' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Invoices Tagihan</h3>
            <div className="p-3 bg-slate-50 dark:bg-[#001f42]/40 border border-slate-200 dark:border-white/10 rounded font-mono flex justify-between">
              <span className="text-slate-700 dark:text-slate-300">INV-AD-20260601</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">LUNAS</span>
            </div>
          </div>
        )}

        {activeTab === 'payment' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Metode Pembayaran Resmi</h3>
            <p className="text-slate-700 dark:text-slate-300">Transfer Bank Virtual Account Mandiri / BNI Terdaftar.</p>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-4">
            <h3 className="font-bold text-xs text-[#002B5B] dark:text-slate-200 uppercase font-mono">Performa Penayangan Iklan (Impressions &amp; CTR)</h3>
            <div className="h-56 w-full bg-slate-50 dark:bg-[#001f42]/40 border border-slate-200 dark:border-white/10 p-4 rounded-xl">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="label" stroke="#64748b" fontSize={9} />
                  <YAxis stroke="#64748b" fontSize={9} />
                  <Tooltip contentStyle={{ backgroundColor: '#001733', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }} />
                  <Area type="monotone" dataKey="impressions" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={2} name="Impressions" />
                  <Area type="monotone" dataKey="clicks" stroke="#10b981" fill="#10b981" fillOpacity={0.15} strokeWidth={2} name="Clicks" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'ratecard' && (
          <div className="text-xs text-slate-500 dark:text-slate-400 space-y-2">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono">Daftar Harga Slot Iklan (Rate Card v2026)</h3>
            <div className="p-3 bg-slate-50 dark:bg-[#001f42]/40 border border-slate-200 dark:border-white/10 rounded font-mono space-y-1 text-slate-700 dark:text-slate-300">
              <div>• Sidebar Banner 300x250: <strong>Rp 12 / Impression</strong></div>
              <div>• Sponsored Article Premium: <strong>Rp 150 / Click</strong></div>
            </div>
          </div>
        )}

        {activeTab === 'support' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Hubungi Tim Sales AdOS</h3>
            <p className="text-slate-700 dark:text-slate-300">Kirim keluhan atau permohonan penempatan custom ke <strong>sales@infobos.com</strong>.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 4. SALES PORTAL
// ==========================================
export function SalesPortal({ user }: PortalProps) {
  const [activeTab, setActiveTab] = useState<'lead' | 'crm' | 'proposal' | 'quotation' | 'contract' | 'campaign' | 'commission' | 'target' | 'performance'>('lead');

  return (
    <div className="space-y-6 text-left">
      <div className="flex justify-between items-center border-b dark:border-white/10 pb-4">
        <div>
          <span className="text-xs font-bold text-teal-600 dark:text-teal-400 font-mono">SALES PORTAL</span>
          <h2 className="text-xl font-black text-[#002B5B] dark:text-white">Sistem Manajemen Penjualan Iklan</h2>
        </div>
        <span className="text-[10px] bg-[#002B5B] dark:bg-sky-500/10 text-[#FFD700] dark:text-[#FFD700] border dark:border-[#FFD700]/20 px-2 py-1 rounded font-mono font-bold">SALES PORTAL ACTIVE</span>
      </div>

      <div className="flex gap-2 border-b dark:border-white/10 pb-2 overflow-x-auto text-xs font-semibold">
        {['lead', 'crm', 'proposal', 'quotation', 'contract', 'campaign', 'commission', 'target', 'performance'].map(t => (
          <button 
            key={t} 
            onClick={() => setActiveTab(t as any)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap capitalize transition ${activeTab === t ? 'bg-[#002B5B] dark:bg-sky-500/10 text-white dark:text-sky-400 border dark:border-sky-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-[#001733]/40 border border-slate-200 dark:border-white/10 rounded-xl p-5 min-h-[300px]">
        {activeTab === 'lead' && (
          <div className="space-y-3 text-xs">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono">Pipeline Prospek Baru (Leads)</h3>
            <div className="p-3 bg-slate-50 dark:bg-[#001f42]/40 border border-slate-200 dark:border-white/10 rounded-lg flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200">PT Telkom Jabar - Sponsor Webinar</span>
                <p className="text-[10px] text-slate-400 dark:text-slate-400">Estimasi Deal: Rp 75.000.000</p>
              </div>
              <span className="bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-mono text-[9px] px-2 py-0.5 rounded font-bold uppercase">PROSPEK</span>
            </div>
          </div>
        )}

        {activeTab === 'crm' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Log Interaksi CRM</h3>
            <p className="text-slate-700 dark:text-slate-300">26 Juni: Menghubungi Humas Bank BJB terkait perpanjangan slot landing banner.</p>
          </div>
        )}

        {activeTab === 'proposal' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Daftar Dokumen Proposal</h3>
            <span className="font-mono bg-slate-50 dark:bg-[#001f42]/40 p-2 block border border-slate-200 dark:border-white/10 rounded text-slate-600 dark:text-slate-300">Proposal-Sponsor-Evolis-BJB.pdf</span>
          </div>
        )}

        {activeTab === 'quotation' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Penawaran Harga (Quotation)</h3>
            <p className="text-slate-700 dark:text-slate-300">Quotation No: QT-2026-1049 (PT Telkom Indonesia).</p>
          </div>
        )}

        {activeTab === 'contract' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Kontrak Hukum Penjualan</h3>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">Tandatangan Digital Berhasil disinkronisasi.</span>
          </div>
        )}

        {activeTab === 'campaign' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Sinergi Kampanye Terjual</h3>
            <p className="text-slate-700 dark:text-slate-300">Memonitor kampanye sponsor aktif demi pemenuhan jaminan impresi klien.</p>
          </div>
        )}

        {activeTab === 'commission' && (
          <div className="p-4 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-[#001f42]/40 text-xs space-y-1">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono">Komisi Sales Berjalan</h3>
            <div className="text-2xl font-black text-[#002B5B] dark:text-slate-100">Rp 4.500.000</div>
            <p className="text-slate-400 dark:text-slate-400 font-mono">Berdasarkan 3 deal yang berhasil lunas bulan ini.</p>
          </div>
        )}

        {activeTab === 'target' && (
          <div className="p-4 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-[#001f42]/40 text-xs space-y-2">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono">Target Penjualan Kuartalan</h3>
            <div className="flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-400 font-mono">
              <span>Progres Target (Rp 150M)</span>
              <span>85% Terpenuhi</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-[#2B7A78] dark:bg-teal-500 h-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Performance Metrics</h3>
            <p className="text-slate-700 dark:text-slate-300">Rasio deal closed: <strong className="text-emerald-600 dark:text-emerald-400">42% (Excellent)</strong> dari seluruh pipeline yang masuk.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 5. BUSINESS PORTAL
// ==========================================
export function BusinessPortal({ user }: PortalProps) {
  const [activeTab, setActiveTab] = useState<'company' | 'brand' | 'promotion' | 'sponsored' | 'directory' | 'profile' | 'analytics' | 'invoices'>('company');

  return (
    <div className="space-y-6 text-left">
      <div className="flex justify-between items-center border-b dark:border-white/10 pb-4">
        <div>
          <span className="text-xs font-bold text-teal-600 dark:text-teal-400 font-mono">BUSINESS PORTAL</span>
          <h2 className="text-xl font-black text-[#002B5B] dark:text-white">Portal Mitra Bisnis &amp; Korporat</h2>
        </div>
        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded font-mono font-bold">ENTERPRISE PARTNER</span>
      </div>

      <div className="flex gap-2 border-b dark:border-white/10 pb-2 overflow-x-auto text-xs font-semibold">
        {['company', 'brand', 'promotion', 'sponsored', 'directory', 'profile', 'analytics', 'invoices'].map(t => (
          <button 
            key={t} 
            onClick={() => setActiveTab(t as any)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap capitalize transition ${activeTab === t ? 'bg-[#002B5B] dark:bg-sky-500/10 text-white dark:text-sky-400 border dark:border-sky-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-[#001733]/40 border border-slate-200 dark:border-white/10 rounded-xl p-5 min-h-[300px]">
        {activeTab === 'company' && (
          <div className="p-4 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-[#001f42]/40 text-xs space-y-1">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono">Dashboard Korporat Mitra</h3>
            <div className="text-xl font-black text-[#002B5B] dark:text-white">PT Telekomunikasi Nusantara (Telkom)</div>
            <p className="text-slate-400 dark:text-slate-400 font-mono">Sektor: Teknologi &amp; Telekomunikasi</p>
          </div>
        )}

        {activeTab === 'brand' && (
          <div className="text-xs text-slate-500 dark:text-slate-400 space-y-2">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono">Reputasi Brand &amp; Sentimen Publik</h3>
            <p className="text-slate-700 dark:text-slate-300">Sentimen keseluruhan merek di seluruh artikel berita INFOBOS: <strong className="text-emerald-600 dark:text-emerald-400">92% Positif</strong>.</p>
          </div>
        )}

        {activeTab === 'promotion' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Materi Promosi Terdaftar</h3>
            <span className="text-slate-700 dark:text-slate-300">0 promosi diskon UMKM terdaftar minggu ini.</span>
          </div>
        )}

        {activeTab === 'sponsored' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Sponsored Content (Kemitraan Humas)</h3>
            <div className="p-3 bg-slate-50 dark:bg-[#001f42]/40 border border-slate-200 dark:border-white/10 rounded flex justify-between font-mono">
              <span className="text-slate-700 dark:text-slate-300">Humas Telkom Dukung Transparansi Digital</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">PUBLISHED</span>
            </div>
          </div>
        )}

        {activeTab === 'directory' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Profil Direktori Bisnis Terbuka</h3>
            <p className="text-slate-700 dark:text-slate-300">Link Profil Direktori: <strong className="text-blue-500 dark:text-sky-400 hover:underline">infobos.com/companies/telkom</strong>.</p>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="text-xs text-slate-500 dark:text-slate-400 space-y-2">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono">Profil Administrasi Perusahaan</h3>
            <p className="text-slate-700 dark:text-slate-300">NPWP: 01.234.567.8-012.000 | Alamat: Jl. Japati No.1, Bandung.</p>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Rasio Klik Tayang Sponsor</h3>
            <p className="text-slate-700 dark:text-slate-300">Rasio konversi Sponsored Content: <strong className="text-[#002B5B] dark:text-sky-400">3.2% CTR (Di atas rata-rata industri)</strong>.</p>
          </div>
        )}

        {activeTab === 'invoices' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Invoices Kemitraan Korporat</h3>
            <span className="text-slate-700 dark:text-slate-300">0 tagihan belum dibayar. Terima kasih atas kerja sama Anda.</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 6. RESEARCH PORTAL
// ==========================================
export function ResearchPortal({ user }: PortalProps) {
  const [activeTab, setActiveTab] = useState<'research' | 'dataset' | 'downloads' | 'reports' | 'analytics' | 'visualization'>('research');

  return (
    <div className="space-y-6 text-left">
      <div className="flex justify-between items-center border-b dark:border-white/10 pb-4">
        <div>
          <span className="text-xs font-bold text-[#2B7A78] dark:text-teal-400 font-mono">RESEARCH PORTAL</span>
          <h2 className="text-xl font-black text-[#002B5B] dark:text-white">Pusat Riset Kebijakan &amp; Dataset Terbuka</h2>
        </div>
        <span className="text-[10px] bg-[#002B5B] dark:bg-sky-500/10 text-[#FFD700] dark:text-[#FFD700] border dark:border-[#FFD700]/20 px-2 py-1 rounded font-mono font-bold">DATA ANALYST VERIFIED</span>
      </div>

      <div className="flex gap-2 border-b dark:border-white/10 pb-2 overflow-x-auto text-xs font-semibold">
        {['research', 'dataset', 'downloads', 'reports', 'analytics', 'visualization'].map(t => (
          <button 
            key={t} 
            onClick={() => setActiveTab(t as any)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap capitalize transition ${activeTab === t ? 'bg-[#002B5B] dark:bg-sky-500/10 text-white dark:text-sky-400 border dark:border-sky-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-[#001733]/40 border border-slate-200 dark:border-white/10 rounded-xl p-5 min-h-[300px]">
        {activeTab === 'research' && (
          <div className="text-xs text-slate-500 dark:text-slate-400 space-y-2">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono">Fokus Kajian Riset Aktif</h3>
            <p className="text-slate-700 dark:text-slate-300">Riset makroekonomi dampak integrasi transportasi di Bandung Raya oleh analis internal EVOLIS.</p>
          </div>
        )}

        {activeTab === 'dataset' && (
          <div className="text-xs text-slate-500 dark:text-slate-400 space-y-2">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono">Dataset Terbuka (JSON/CSV)</h3>
            <p className="text-slate-700 dark:text-slate-300">Database spasial anomali cuaca ekstrim di Jabar Selatan selama periode 2020-2026.</p>
            <button className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 rounded font-mono font-bold text-[10px]">UNDUH DATASET (JSON)</button>
          </div>
        )}

        {activeTab === 'downloads' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Pusat File Downloads</h3>
            <span className="text-slate-700 dark:text-slate-300">Laporan komparatif ekologi waduk Jatigede 2026.pdf (14.5MB)</span>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Analis PDF Reports</h3>
            <span className="text-slate-700 dark:text-slate-300">Semua laporan terdaftar telah disertifikasi Dewan Riset Nasional.</span>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Statistik Akses Pembaca Riset</h3>
            <p className="text-slate-700 dark:text-slate-300">Jumlah unduhan kajian minggu ini: <strong>1,204 kali</strong>.</p>
          </div>
        )}

        {activeTab === 'visualization' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Visualisasi Interaktif (D3.js Charts)</h3>
            <div className="p-3 bg-slate-50 dark:bg-[#001f42]/40 border border-slate-200 dark:border-white/10 rounded font-mono text-slate-600 dark:text-slate-300">
              Visualizing geospatial density maps and nodes correlation.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 7. MONITORING PORTAL
// ==========================================
export function MonitoringPortal({ user }: PortalProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'news' | 'brand' | 'keyword' | 'entity' | 'geo' | 'sentiment' | 'alerts' | 'competitor'>('dashboard');

  return (
    <div className="space-y-6 text-left">
      <div className="flex justify-between items-center border-b dark:border-white/10 pb-4">
        <div>
          <span className="text-xs font-bold text-rose-500 dark:text-rose-400 font-mono">MONITORING PORTAL</span>
          <h2 className="text-xl font-black text-[#002B5B] dark:text-white">Sistem Pengawasan Sentinel &amp; Sentiment</h2>
        </div>
        <span className="text-[10px] bg-rose-100 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border dark:border-rose-500/20 px-2 py-1 rounded font-mono font-bold flex items-center gap-1">
          <Activity className="h-3 w-3 animate-pulse text-rose-500 dark:text-rose-400" /> MONITORING ACTIVE
        </span>
      </div>

      <div className="flex gap-2 border-b dark:border-white/10 pb-2 overflow-x-auto text-xs font-semibold">
        {['dashboard', 'news', 'brand', 'keyword', 'entity', 'geo', 'sentiment', 'alerts', 'competitor'].map(t => (
          <button 
            key={t} 
            onClick={() => setActiveTab(t as any)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap capitalize transition ${activeTab === t ? 'bg-[#002B5B] dark:bg-sky-500/10 text-white dark:text-sky-400 border dark:border-sky-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-[#001733]/40 border border-slate-200 dark:border-white/10 rounded-xl p-5 min-h-[300px]">
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-[#001f42]/40 space-y-1">
              <span className="text-[10px] text-slate-400 dark:text-slate-400 font-bold uppercase font-mono">Sentinel Status</span>
              <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">CONNECTED</div>
              <p className="text-[9px] text-slate-400 dark:text-slate-400">Memindai 24 feeds per menit.</p>
            </div>
            <div className="p-4 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-[#001f42]/40 space-y-1">
              <span className="text-[10px] text-slate-400 dark:text-slate-400 font-bold uppercase font-mono">Sentimen Indeks Jabar</span>
              <div className="text-xl font-black text-[#002B5B] dark:text-slate-100">84% Positif</div>
              <p className="text-[9px] text-slate-400 dark:text-slate-400">Analisis kata kunci Pemda Jabar.</p>
            </div>
            <div className="p-4 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-[#001f42]/40 space-y-1">
              <span className="text-[10px] text-slate-400 dark:text-slate-400 font-bold uppercase font-mono">Alerts Dipicu</span>
              <div className="text-xl font-black text-rose-600 dark:text-rose-400">1 Baru</div>
              <p className="text-[9px] font-bold text-rose-500 dark:text-rose-400">Anomali pergerakan anggaran.</p>
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Monitoring Aliran Berita</h3>
            <p className="text-slate-700 dark:text-slate-300">Menyaring 2,400+ feed media lokal di seluruh Indonesia untuk mendeteksi kesamaan isu.</p>
          </div>
        )}

        {activeTab === 'brand' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Brand Monitoring</h3>
            <p className="text-slate-700 dark:text-slate-300">Melacak rujukan kata kunci &quot;INFOBOS&quot; di media sosial nasional.</p>
          </div>
        )}

        {activeTab === 'keyword' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Keyword Tracking</h3>
            <p className="text-slate-700 dark:text-slate-300">Kata kunci dipantau: <strong>Gedung Sate, Ridwan Kamil, Kemenkeu Jabar, Inflasi Daerah</strong>.</p>
          </div>
        )}

        {activeTab === 'entity' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Entity Relationship Monitoring</h3>
            <p className="text-slate-700 dark:text-slate-300">Menelaah peta hubungan tokoh politik lokal guna memitigasi konflik kepentingan.</p>
          </div>
        )}

        {activeTab === 'geo' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Geospatial News Monitoring</h3>
            <p className="text-slate-700 dark:text-slate-300">Visualisasi spasial kepadatan laporan per kata/kabupaten di Jawa Barat.</p>
          </div>
        )}

        {activeTab === 'sentiment' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Sentinel AI Sentiment Classifier</h3>
            <p className="text-slate-700 dark:text-slate-300">Mengidentifikasi polaritas opini publik (Positif, Netral, Negatif) menggunakan Gemini API.</p>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="p-4 border border-rose-200 dark:border-rose-900/30 rounded-xl bg-rose-50 dark:bg-rose-950/15 text-xs space-y-2">
            <h3 className="font-bold text-rose-800 dark:text-rose-200 uppercase font-mono">Alert Sentinel Terpancing</h3>
            <p className="text-rose-950 dark:text-rose-300 font-bold">Mendeteksi kemiripan naskah media saingan &gt;95% (Indikasi Plagiarisme).</p>
            <span className="text-[10px] text-rose-500 dark:text-rose-400 block">Suhu Sentinel: 42°C (OK)</span>
          </div>
        )}

        {activeTab === 'competitor' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Analisis Kompetitor Media</h3>
            <p className="text-slate-700 dark:text-slate-300">Membandingkan rasio postingan harian dengan Portal Pikiran Rakyat &amp; Detik Jabar.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 8. CMS PORTAL
// ==========================================
export function CMSPortal({ user, token, onNavigateToArticle }: PortalProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'content' | 'media' | 'categories' | 'tags' | 'users' | 'roles' | 'workflow' | 'settings'>('dashboard');

  return (
    <div className="space-y-6 text-left">
      <div className="flex justify-between items-center border-b dark:border-white/10 pb-4">
        <div>
          <span className="text-xs font-bold text-purple-600 dark:text-purple-400 font-mono">VIRALOG CMS PORTAL</span>
          <h2 className="text-xl font-black text-[#002B5B] dark:text-white">Sistem Manajemen Konten Jurnalisme</h2>
        </div>
        <span className="text-[10px] bg-purple-100 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 border dark:border-purple-500/20 px-2 py-1 rounded font-mono font-bold">CMS PRIVILEGED</span>
      </div>

      <div className="flex gap-2 border-b dark:border-white/10 pb-2 overflow-x-auto text-xs font-semibold">
        {['dashboard', 'content', 'media', 'categories', 'tags', 'users', 'roles', 'workflow', 'settings'].map(t => (
          <button 
            key={t} 
            onClick={() => setActiveTab(t as any)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap capitalize transition ${activeTab === t ? 'bg-[#002B5B] dark:bg-sky-500/10 text-white dark:text-sky-400 border dark:border-sky-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-[#001733]/40 border border-slate-200 dark:border-white/10 rounded-xl p-5 min-h-[300px]">
        {activeTab === 'dashboard' && (
          <div className="space-y-4">
            <h3 className="font-bold text-xs text-[#002B5B] dark:text-slate-200 uppercase font-mono">Status Data &amp; Sinkronisasi CMS</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-[#001f42]/40 space-y-1">
                <span className="text-[10px] text-slate-400 dark:text-slate-400 font-bold uppercase font-mono">Total Artikel</span>
                <div className="text-xl font-black text-[#002B5B] dark:text-slate-100">142 Artikel</div>
                <p className="text-[9px] text-slate-400 dark:text-slate-400">Tersimpan di db_store.json.</p>
              </div>
              <div className="p-4 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-[#001f42]/40 space-y-1">
                <span className="text-[10px] text-slate-400 dark:text-slate-400 font-bold uppercase font-mono">Media Terunggah</span>
                <div className="text-xl font-black text-[#002B5B] dark:text-slate-100">56 Berkas</div>
                <p className="text-[9px] text-slate-400 dark:text-slate-400">JPG, PNG, PDF Laporan.</p>
              </div>
              <div className="p-4 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-[#001f42]/40 space-y-1">
                <span className="text-[10px] text-slate-400 dark:text-slate-400 font-bold uppercase font-mono">Kategori Aktif</span>
                <div className="text-xl font-black text-[#002B5B] dark:text-slate-100">13 Kategori</div>
                <p className="text-[9px] text-slate-400 dark:text-slate-400">Tersinkronisasi dengan Navbar.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="text-xs text-slate-500 dark:text-slate-400 space-y-2">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono">Daftar Semua Berita Redaksi</h3>
            <p className="text-slate-700 dark:text-slate-300">Gunakan tombol edit di Admin Panel utama untuk mengubah, menghapus, atau merilis berita baru.</p>
          </div>
        )}

        {activeTab === 'media' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Media Library</h3>
            <p className="text-slate-700 dark:text-slate-300">Seluruh gambar ilustrasi artikel, banner sponsor, dan logo brand dikelola terpusat di sini.</p>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Manajemen Kategori</h3>
            <p className="text-slate-700 dark:text-slate-300">Regional, Nasional, Internasional, Breaking News, Investigasi, Opini, Fact Check.</p>
          </div>
        )}

        {activeTab === 'tags' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Pemberian Tagging Intelijen</h3>
            <p className="text-slate-700 dark:text-slate-300">Menghubungkan artikel secara dinamis dengan Entitas Ridwan Kamil, Sri Mulyani, atau Kota Bandung.</p>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Daftar Anggota Redaksi</h3>
            <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
              <li>Ahmad Dahlan (super_admin)</li>
              <li>Siti Rahma (managing_editor)</li>
              <li>Budi Santoso (reporter)</li>
            </ul>
          </div>
        )}

        {activeTab === 'roles' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Konfigurasi Hak Akses &amp; Roles</h3>
            <p className="text-slate-700 dark:text-slate-300">Membatasi wewenang akun Reporter agar tidak bisa menyetujui artikelnya sendiri.</p>
          </div>
        )}

        {activeTab === 'workflow' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">Workflow Manajemen Naskah</h3>
            <p className="text-slate-700 dark:text-slate-300">Draft &rarr; Sidang Redaksi &rarr; Editor Review &rarr; Fact Checker &rarr; Published.</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <h3 className="font-bold text-[#002B5B] dark:text-slate-200 uppercase font-mono mb-2">CMS Global Settings</h3>
            <p className="text-slate-700 dark:text-slate-300">Batas ukuran upload media: 10MB | Sinkronisasi CDN: Active.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 9. SUPER ADMIN PORTAL
// ==========================================
export function SuperAdminPortal({ user }: PortalProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'roles' | 'permissions' | 'portal' | 'navigation' | 'routes' | 'api' | 'settings' | 'logs' | 'security' | 'backup' | 'restore' | 'audit' | 'ai' | 'integrations' | 'license'>('dashboard');

  return (
    <div className="space-y-6 text-left">
      <div className="flex justify-between items-center border-b dark:border-white/10 pb-4">
        <div>
          <span className="text-xs font-bold text-rose-500 dark:text-rose-400 font-mono">SUPER ADMIN CONSOLE</span>
          <h2 className="text-xl font-black text-[#002B5B] dark:text-white">Konsol Root Jaringan &amp; Keamanan</h2>
        </div>
        <span className="text-[10px] bg-rose-500 text-white px-2.5 py-1 rounded font-mono font-black animate-pulse uppercase">ROOT ACCESS GRANTED</span>
      </div>

      <div className="flex gap-2 border-b dark:border-white/10 pb-2 overflow-x-auto text-xs font-semibold">
        {['dashboard', 'users', 'roles', 'permissions', 'portal', 'navigation', 'routes', 'api', 'settings', 'logs', 'security', 'backup', 'restore', 'audit', 'ai', 'integrations', 'license'].map(t => (
          <button 
            key={t} 
            onClick={() => setActiveTab(t as any)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap capitalize transition ${activeTab === t ? 'bg-[#002B5B] dark:bg-sky-500/10 text-white dark:text-sky-400 border dark:border-sky-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="bg-slate-950 text-slate-300 border border-slate-800 rounded-xl p-5 min-h-[300px] font-mono">
        {activeTab === 'dashboard' && (
          <div className="space-y-4 text-xs">
            <span className="text-[#FFD700] font-bold"># systemctl status infobos-core</span>
            <div className="bg-black/60 p-4 rounded-lg border border-slate-900 space-y-1.5 text-slate-400">
              <div className="flex justify-between"><span className="text-slate-500">API Gateway:</span><span className="text-emerald-400 font-bold">ONLINE</span></div>
              <div className="flex justify-between"><span className="text-slate-500">JSON Relational Store:</span><span className="text-emerald-400 font-bold">SYNCED</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Evolis Grounding Core:</span><span className="text-amber-400 font-bold">ANCHORED</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Hulu Security Shield:</span><span className="text-emerald-400 font-bold">SHIELDED</span></div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="text-xs space-y-2">
            <span className="text-[#FFD700] font-bold"># cat /etc/users_auth_matrix</span>
            <p className="text-slate-500">Manage, create, or delete system profiles.</p>
          </div>
        )}

        {activeTab === 'roles' && (
          <div className="text-xs space-y-1">
            <span className="text-[#FFD700] font-bold"># role-manager --list</span>
            <p className="text-slate-500">Super Admin, Managing Editor, Reporter, Moderator, Creator, Advertiser, Partner.</p>
          </div>
        )}

        {activeTab === 'permissions' && (
          <div className="text-xs space-y-1">
            <span className="text-[#FFD700] font-bold"># permission-matrix --audit</span>
            <p className="text-emerald-400">Permission Matrix OK. All 26 roles securely validated.</p>
          </div>
        )}

        {activeTab === 'portal' && (
          <div className="text-xs space-y-1">
            <span className="text-[#FFD700] font-bold"># portals-controller --active</span>
            <p className="text-slate-500">Portals: Public, Member, Creator, Reporter, Editor, Advertiser, Sales, Business, Research, Monitoring, CMS, Super Admin.</p>
          </div>
        )}

        {activeTab === 'navigation' && (
          <div className="text-xs space-y-1">
            <span className="text-[#FFD700] font-bold"># navigation-builder --validate</span>
            <p className="text-emerald-400">Navigation rendering restricted solely based on PBAC/RBAC. CSS-based menu hiding is bypassed.</p>
          </div>
        )}

        {activeTab === 'routes' && (
          <div className="text-xs space-y-1">
            <span className="text-[#FFD700] font-bold"># route-guard-shield status</span>
            <p className="text-emerald-400">Route Guard active. Non-authorized access redirects instantly to Access Denied layout.</p>
          </div>
        )}

        {activeTab === 'api' && (
          <div className="text-xs space-y-1">
            <span className="text-[#FFD700] font-bold"># curl -X GET /api/v1/auth/status</span>
            <p className="text-slate-500">Bearer Token verification active on all private endpoints.</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="text-xs space-y-1">
            <span className="text-[#FFD700] font-bold"># nano /etc/system_config</span>
            <p className="text-slate-500">Configuring timeout thresholds, CDN caching policies, and session limits.</p>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="text-xs space-y-2">
            <span className="text-[#FFD700] font-bold"># journalctl -u infobos-core -n 10</span>
            <div className="bg-black/60 p-3 rounded text-slate-500 space-y-1">
              <div>[26 Jun 14:20:06] GET /api/v1/ads/placement - 200 OK</div>
              <div>[26 Jun 14:22:15] POST /api/v1/auth/login - 200 SUCCESS</div>
              <div>[26 Jun 14:22:18] SECURE_SHIELD: Verified role super_admin</div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="text-xs space-y-1">
            <span className="text-[#FFD700] font-bold"># security-audit --run</span>
            <p className="text-emerald-400">IP Filtering: Active | CSRF Token Guard: Verified | DDOS Rate Limiting: Active.</p>
          </div>
        )}

        {activeTab === 'backup' && (
          <div className="text-xs space-y-1">
            <span className="text-[#FFD700] font-bold"># backup-daemon --trigger</span>
            <p className="text-emerald-400">Daily database backup saved securely to GCS: infobos_backup_20260626.tar.gz.</p>
          </div>
        )}

        {activeTab === 'restore' && (
          <div className="text-xs space-y-1">
            <span className="text-rose-500 font-bold"># restore-daemon --status</span>
            <p className="text-slate-500">No restore event requested. System is healthy.</p>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="text-xs space-y-1">
            <span className="text-[#FFD700] font-bold"># audit-log --view</span>
            <p className="text-slate-500">Super Admin Ahmad Dahlan updated permissions mapping for Reporter role.</p>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="space-y-4">
            <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm text-[#FFD700] uppercase font-mono flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-[#FFD700]" /> AI Cluster &amp; Agent Analytics Control
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 font-mono">Real-time status of distributed models, token usage, and live multi-agent pipelines.</p>
              </div>
            </div>
            <AIAnalyticsDashboard defaultRole="super_admin" isEmbedded={true} />
          </div>
        )}

        {activeTab === 'integrations' && (
          <div className="text-xs space-y-1">
            <span className="text-[#FFD700] font-bold"># integrations-status</span>
            <p className="text-slate-500">RSS feed parser, AdOS Gateway, oEmbed support connected successfully.</p>
          </div>
        )}

        {activeTab === 'license' && (
          <div className="text-xs space-y-1">
            <span className="text-[#FFD700] font-bold"># license-verifier --check</span>
            <p className="text-emerald-400">Enterprise License: Valid through December 2028.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 10. DEVELOPER PORTAL
// ==========================================
export function DeveloperPortal({ user }: PortalProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'endpoints' | 'logs' | 'db_browser' | 'environment' | 'metrics'>('dashboard');
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('/api/v1/articles');
  const [customParam, setCustomParam] = useState<string>('limit=10&sort=desc');
  const [testResult, setTestResult] = useState<any>(null);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [latency, setLatency] = useState<number | null>(null);
  const [logFilter, setLogFilter] = useState<string>('ALL');
  const [logItems, setLogItems] = useState([
    { id: 1, type: 'INFO', time: '14:20:06', msg: 'API Gateway initialized successfully on port 3000' },
    { id: 2, type: 'DEBUG', time: '14:20:15', msg: 'DB connection pool allocated: 25 active connections' },
    { id: 3, type: 'WARN', time: '14:22:10', msg: 'AdZone: zone "promoted_company" reached 85% of allocated memory limit' },
    { id: 4, type: 'ERROR', time: '14:24:02', msg: 'GeoIntelligence: failed to reverse geocode coordinate [-6.902, 107.618] - Rate limit exceeded' },
    { id: 5, type: 'INFO', time: '14:25:30', msg: 'Sentinel: Completed sentiment scan of 120 media feeds in 1.4s' }
  ]);
  const [dbTable, setDbTable] = useState<string>('articles');
  const [dbSearch, setDbSearch] = useState<string>('');

  const randomLogs = [
    { type: 'INFO', msg: 'User tebar66721@gmail.com requested simulation of role "developer"' },
    { type: 'DEBUG', msg: 'Caching route /api/v1/hubs/location - TTL: 300s' },
    { type: 'WARN', msg: 'MediaOS: slow ingestion detected on regional-jabar feed (latency: 1.8s)' },
    { type: 'ERROR', msg: 'RevenueOS: failed to capture payment intent QT-2026-1049 - Gateway timeout' },
    { type: 'INFO', msg: 'FactChecker: verified entity connection [Ridwan Kamil] & [Gedung Sate]' }
  ];

  const handleAddLog = () => {
    const random = randomLogs[Math.floor(Math.random() * randomLogs.length)];
    const timeNow = new Date().toTimeString().split(' ')[0];
    setLogItems(prev => [
      ...prev,
      { id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`, type: random.type, time: timeNow, msg: random.msg }
    ]);
  };

  const handleTestAPI = () => {
    setIsTesting(true);
    setTestResult(null);
    setLatency(null);

    setTimeout(() => {
      const simulatedLatency = Math.floor(Math.random() * 280) + 45;
      setLatency(simulatedLatency);
      setIsTesting(false);

      if (selectedEndpoint === '/api/v1/articles') {
        setTestResult({
          status: 'success',
          code: 200,
          latency: `${simulatedLatency}ms`,
          endpoint: selectedEndpoint,
          query_parameters: customParam || 'none',
          data: [
            { id: 'art-1', title: 'Revitalisasi Gedung Sate Jabar', author: 'Budi Santoso', views: 4820, published_at: '2026-06-26T14:00:00Z' },
            { id: 'art-2', title: 'Peningkatan Sentimen Positif UMKM', author: 'Siti Rahma', views: 2315, published_at: '2026-06-25T08:30:00Z' }
          ]
        });
      } else if (selectedEndpoint === '/api/v1/revenue/stats') {
        setTestResult({
          status: 'success',
          code: 200,
          latency: `${simulatedLatency}ms`,
          endpoint: selectedEndpoint,
          query_parameters: customParam || 'none',
          data: {
            total_revenue_ytd: 1248500000,
            active_revenue_streams: 23,
            currency: 'IDR',
            payout_ratio: '0.85',
            top_performing_stream: 'Spatio-News GIS API (Data Intelligence)'
          }
        });
      } else if (selectedEndpoint === '/api/v1/intelligence/nodes') {
        setTestResult({
          status: 'success',
          code: 200,
          latency: `${simulatedLatency}ms`,
          endpoint: selectedEndpoint,
          query_parameters: customParam || 'none',
          data: [
            { node_id: 'node-bdg', label: 'Bandung', type: 'location', gravity_score: 9.8 },
            { node_id: 'node-sm', label: 'Sri Mulyani', type: 'entity', gravity_score: 8.5 },
            { node_id: 'node-prov', label: 'Pemprov Jabar', type: 'entity', gravity_score: 9.2 }
          ]
        });
      } else {
        setTestResult({
          status: 'success',
          code: 200,
          latency: `${simulatedLatency}ms`,
          endpoint: selectedEndpoint,
          query_parameters: customParam || 'none',
          data: [
            { alert_id: 'alt-99', severity: 'HIGH', message: 'Script duplication >95% on rival_news_jabar', detected_at: '2026-06-27T01:10:00Z' }
          ]
        });
      }
    }, 400);
  };

  const dbDataMap: Record<string, any[]> = {
    articles: [
      { id: 'art-01', title: 'Pembangunan MRT Bandung Selatan', author: 'Budi Santoso', category: 'Infrastruktur', status: 'Published' },
      { id: 'art-02', title: 'Ekspor Kerajinan Garut Meningkat', author: 'Ani Wijaya', category: 'Ekonomi', status: 'Draft' },
      { id: 'art-03', title: 'Revitalisasi Pariwisata Pangandaran', author: 'Siti Rahma', category: 'Pariwisata', status: 'Published' },
      { id: 'art-04', title: 'Rencana Tata Ruang Bandung Utara', author: 'Dedi Setiadi', category: 'Regulasi', status: 'Pending' }
    ],
    revenue_streams: [
      { code: 'REV-01', name: 'Banner Ads Programmatic', category: 'AdOS', monthly_yield: 125000000, status: 'Active' },
      { code: 'REV-08', name: 'Premium Corporate Multi-user', category: 'Subscriptions', monthly_yield: 280000000, status: 'Active' },
      { code: 'REV-14', name: 'Spatio-News GIS API', category: 'Data Intelligence', monthly_yield: 345000000, status: 'Active' },
      { code: 'REV-21', name: 'Professional Masterclass', category: 'Events', monthly_yield: 75000000, status: 'Active' }
    ],
    users: [
      { email: 'tebar66721@gmail.com', name: 'Tebar Admin', role: 'developer', origin: 'Database Internal' },
      { email: 'ahmad.dahlan@infobos.com', name: 'Ahmad Dahlan', role: 'super_admin', origin: 'Database Internal' },
      { email: 'budi.santoso@infobos.com', name: 'Budi Santoso', role: 'reporter', origin: 'Database Internal' },
      { email: 'siti.rahma@infobos.com', name: 'Siti Rahma', role: 'editor', origin: 'Database Internal' }
    ]
  };

  const activeDbData = dbDataMap[dbTable] || [];
  const filteredDbData = activeDbData.filter(item => {
    const valuesString = Object.values(item).join(' ').toLowerCase();
    return valuesString.includes(dbSearch.toLowerCase());
  });

  const rpsData = [
    { time: '00:00', rps: 15, latency: 45 },
    { time: '04:00', rps: 8, latency: 32 },
    { time: '08:00', rps: 42, latency: 68 },
    { time: '12:00', rps: 85, latency: 120 },
    { time: '16:00', rps: 60, latency: 95 },
    { time: '20:00', rps: 35, latency: 55 }
  ];

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200/80 dark:border-white/10 pb-4 gap-3">
        <div>
          <span className="text-xs font-bold text-amber-500 font-mono flex items-center gap-1">
            <Code className="h-3.5 w-3.5 animate-pulse" /> INFOBOS DEV-ENVIRONMENT
          </span>
          <h2 className="text-2xl font-black text-[#002B5B] dark:text-white tracking-tight mt-1">Portal Developer &amp; Rekayasa Sistem</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Pantau arsitektur sistem, kelola API, debug log, dan tinjau performa database.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-2 text-xs bg-emerald-500/10 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 dark:border-emerald-500/20 px-3 py-1.5 rounded-full font-mono font-bold shadow-xs">
            <Server className="h-3.5 w-3.5 animate-pulse text-emerald-500 dark:text-emerald-400" /> CLOUD RUN CONTAINER : PORT 3000
          </span>
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-200 dark:border-white/10 pb-2 overflow-x-auto scrollbar-none text-xs font-semibold">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: Layout },
          { id: 'endpoints', label: 'API Playground', icon: Send },
          { id: 'logs', label: 'Terminal Logs', icon: Terminal },
          { id: 'db_browser', label: 'Database Browser', icon: Database },
          { id: 'environment', label: 'Env Config', icon: Settings },
          { id: 'metrics', label: 'System Metrics', icon: Activity }
        ].map(t => {
          const isActive = activeTab === t.id;
          return (
            <button 
              key={t.id} 
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap capitalize transition-all duration-200 relative ${
                isActive 
                  ? 'bg-[#002B5B] dark:bg-sky-500/10 text-white dark:text-sky-400 border dark:border-sky-500/20 font-bold shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/40'
              }`}
            >
              <t.icon className={`h-4 w-4 ${isActive ? 'text-[#FFD700] dark:text-amber-400' : 'text-slate-400'}`} />
              <span>{t.label}</span>
              {isActive && (
                <motion.span 
                  layoutId="activeTabGlow" 
                  className="absolute inset-0 border-2 border-amber-400/50 rounded-xl pointer-events-none"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="bg-white dark:bg-[#001733]/40 border border-slate-200/80 dark:border-white/10 rounded-2xl p-6 min-h-[420px] shadow-sm relative overflow-hidden">
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
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div className="p-4 border border-slate-100 dark:border-white/5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-[#001f42]/40 dark:to-[#001f42]/20 space-y-2 hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-500/30 transition-all duration-300">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-400 dark:text-slate-400 font-extrabold uppercase font-mono tracking-wider">Core API Gateway</span>
                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    </div>
                    <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <span>ONLINE (200 OK)</span>
                    </div>
                    <div className="pt-2 border-t border-slate-200/50 dark:border-white/5 flex justify-between items-center text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                      <span>Response Latency</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">52ms</span>
                    </div>
                  </div>

                  <div className="p-4 border border-slate-100 dark:border-white/5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-[#001f42]/40 dark:to-[#001f42]/20 space-y-2 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all duration-300">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-400 dark:text-slate-400 font-extrabold uppercase font-mono tracking-wider">Microservice Load</span>
                      <Cpu className="h-3.5 w-3.5 text-indigo-500" />
                    </div>
                    <div className="text-lg font-black text-[#002B5B] dark:text-slate-100">1.24% CPU</div>
                    <div className="pt-2 border-t border-slate-200/50 dark:border-white/5 flex justify-between items-center text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                      <span>Memory In Use</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">256MB / 1GB</span>
                    </div>
                  </div>

                  <div className="p-4 border border-slate-100 dark:border-white/5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-[#001f42]/40 dark:to-[#001f42]/20 space-y-2 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-500/30 transition-all duration-300">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-400 dark:text-slate-400 font-extrabold uppercase font-mono tracking-wider">JSON Database Store</span>
                      <HardDrive className="h-3.5 w-3.5 text-blue-500" />
                    </div>
                    <div className="text-lg font-black text-blue-600 dark:text-blue-400">HEALTHY</div>
                    <div className="pt-2 border-t border-slate-200/50 dark:border-white/5 flex justify-between items-center text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                      <span>Storage Status</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">Stable / Synced</span>
                    </div>
                  </div>

                  <div className="p-4 border border-slate-100 dark:border-white/5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-[#001f42]/40 dark:to-[#001f42]/20 space-y-2 hover:shadow-md hover:border-teal-200 dark:hover:border-teal-500/30 transition-all duration-300">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-400 dark:text-slate-400 font-extrabold uppercase font-mono tracking-wider">Gemini AI Grounding</span>
                      <Sparkles className="h-3.5 w-3.5 text-teal-500" />
                    </div>
                    <div className="text-lg font-black text-teal-600 dark:text-teal-400">CONNECTED</div>
                    <div className="pt-2 border-t border-slate-200/50 dark:border-white/5 flex justify-between items-center text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                      <span>Google GenAI SDK</span>
                      <span className="font-bold text-teal-700 dark:text-teal-300">v2.4.0</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
                  <div className="lg:col-span-8 border border-slate-200 dark:border-white/10 rounded-2xl p-5 bg-slate-50/50 dark:bg-[#001f42]/20 space-y-4">
                    <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold text-sm">
                      <Sparkles className="h-5 w-5 text-amber-500 animate-pulse" />
                      <span>Simulasi Konsol Debug &amp; Observasi</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Selamat datang di Pusat Kontrol Teknik INFOBOS. Lingkungan rekayasa terintegrasi ini dirancang khusus untuk memonitor stabilitas performa sistem, memvalidasi endpoint API interaktif, memeriksa log runtime reverse proxy nginx secara langsung, serta meninjau query data relasional.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-3 bg-white dark:bg-[#001733]/60 border border-slate-100 dark:border-white/5 rounded-xl space-y-1">
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Sandi Keamanan API</h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">Kunci API terlindungi secara server-side dan dienkripsi kuat sebelum transmisi gateway.</p>
                      </div>
                      <div className="p-3 bg-white dark:bg-[#001733]/60 border border-slate-100 dark:border-white/5 rounded-xl space-y-1">
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Isolasi Sandbox</h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">Mutasi data sandbox dijamin aman dan terisolasi dari core ledger utama.</p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 border border-slate-200 dark:border-white/10 rounded-2xl p-5 bg-slate-900 dark:bg-[#001f42]/40 text-white flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-amber-400 font-mono font-bold text-xs">
                        <Terminal className="h-4 w-4" />
                        <span>QUICK COMMANDS</span>
                      </div>
                      <p className="text-[11px] text-slate-300">Jalankan aksi simulasi cepat langsung pada klaster server.</p>
                    </div>
                    <div className="space-y-2 pt-4">
                      <button 
                        onClick={() => {
                          setActiveTab('endpoints');
                          setSelectedEndpoint('/api/v1/revenue/stats');
                        }}
                        className="w-full text-left p-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-mono flex items-center justify-between group transition"
                      >
                        <span className="text-slate-300">GET /revenue/stats</span>
                        <span className="text-amber-400 group-hover:translate-x-1 transition">&rarr;</span>
                      </button>
                      <button 
                        onClick={() => {
                          setActiveTab('logs');
                          handleAddLog();
                        }}
                        className="w-full text-left p-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-mono flex items-center justify-between group transition"
                      >
                        <span className="text-slate-300">Trigger Error Log Event</span>
                        <span className="text-amber-400 group-hover:translate-x-1 transition">&rarr;</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: ENDPOINTS */}
            {activeTab === 'endpoints' && (
              <div className="space-y-4">
                <div className="flex items-start justify-between border-b border-slate-100 dark:border-white/10 pb-3">
                  <div>
                    <h3 className="font-bold text-sm text-[#002B5B] dark:text-white uppercase font-mono flex items-center gap-1.5">
                      <Send className="h-4 w-4 text-indigo-500" /> API Testing Playground Sandbox
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Uji rute API internal backend INFOBOS secara interaktif untuk memverifikasi model data.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  <div className="lg:col-span-4 space-y-4 text-xs bg-slate-50/50 dark:bg-[#001f42]/20 p-5 border border-slate-200/80 dark:border-white/10 rounded-2xl">
                    <div className="space-y-1.5">
                      <label className="font-extrabold text-slate-700 dark:text-slate-300 tracking-tight font-sans uppercase text-[10px]">HTTP Method &amp; Endpoint</label>
                      <select 
                        value={selectedEndpoint} 
                        onChange={(e) => setSelectedEndpoint(e.target.value)}
                        className="w-full bg-white dark:bg-[#001122]/60 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500 dark:focus:border-sky-500 text-xs text-slate-800 dark:text-slate-200 transition"
                      >
                        <option value="/api/v1/articles" className="bg-white dark:bg-[#001f42] text-slate-800 dark:text-slate-200">GET /api/v1/articles</option>
                        <option value="/api/v1/revenue/stats" className="bg-white dark:bg-[#001f42] text-slate-800 dark:text-slate-200">GET /api/v1/revenue/stats</option>
                        <option value="/api/v1/intelligence/nodes" className="bg-white dark:bg-[#001f42] text-slate-800 dark:text-slate-200">GET /api/v1/intelligence/nodes</option>
                        <option value="/api/v1/sentinel/alerts" className="bg-white dark:bg-[#001f42] text-slate-800 dark:text-slate-200">GET /api/v1/sentinel/alerts</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-extrabold text-slate-700 dark:text-slate-300 tracking-tight font-sans uppercase text-[10px]">Query Parameters</label>
                      <input 
                        type="text" 
                        value={customParam}
                        onChange={(e) => setCustomParam(e.target.value)}
                        className="w-full bg-white dark:bg-[#001122]/60 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2.5 font-mono text-xs focus:outline-none focus:border-indigo-500 dark:focus:border-sky-500 text-slate-800 dark:text-slate-200 transition"
                        placeholder="e.g. limit=5&sort=desc"
                      />
                    </div>

                    <button 
                      onClick={handleTestAPI}
                      disabled={isTesting}
                      className="w-full py-3 bg-[#002B5B] dark:bg-sky-500/20 hover:bg-[#001f42] dark:hover:bg-sky-500/30 text-[#FFD700] dark:text-sky-300 disabled:bg-slate-300 dark:disabled:bg-slate-800 font-extrabold rounded-xl transition shadow-xs text-center uppercase tracking-wider text-xs"
                    >
                      {isTesting ? 'MENGHUBUNGI GATEWAY...' : 'TEST ENDPOINT'}
                    </button>
                  </div>

                  <div className="lg:col-span-8 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-600 dark:text-slate-400 uppercase font-mono">API Response Payload</span>
                      {latency && (
                        <span className="bg-emerald-500/10 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 dark:border-emerald-500/10 px-2.5 py-1 rounded-full font-mono font-bold text-[10px]">
                          HTTP 200 OK | Latency: {latency}ms
                        </span>
                      )}
                    </div>

                    <div className="bg-slate-950 text-emerald-400 p-5 border border-slate-900 dark:border-white/10 rounded-2xl font-mono text-xs min-h-[220px] overflow-x-auto max-h-[350px] shadow-inner relative">
                      {isTesting ? (
                        <div className="flex flex-col items-center justify-center h-48 space-y-2">
                          <RefreshCw className="h-8 w-8 text-amber-400 animate-spin" />
                          <span className="text-slate-400 text-xs animate-pulse">Routing response packet...</span>
                        </div>
                      ) : testResult ? (
                        <pre className="text-slate-200 text-[11px] leading-relaxed select-all">{JSON.stringify(testResult, null, 2)}</pre>
                      ) : (
                        <div className="flex items-center justify-center h-48 text-center px-4">
                          <span className="text-slate-500 dark:text-slate-400 italic">Pilih rute API dari dropdown dan klik "TEST ENDPOINT" untuk menyimulasikan parsing respon JSON...</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: LOGS */}
            {activeTab === 'logs' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center gap-4 flex-wrap border-b border-slate-100 dark:border-white/10 pb-3">
                  <div>
                    <h3 className="font-bold text-sm text-[#002B5B] dark:text-white uppercase font-mono flex items-center gap-1.5">
                      <Terminal className="h-4 w-4 text-emerald-500" /> Server Terminal Logs Stream
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Live monitoring data log dari reverse proxy nginx dan gateway Express.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handleAddLog}
                      className="px-3.5 py-1.5 bg-[#002B5B] dark:bg-sky-500/20 text-[#FFD700] dark:text-sky-300 hover:bg-[#001f42] dark:hover:bg-sky-500/30 text-xs font-bold rounded-xl transition"
                    >
                      Trigger Mock Event
                    </button>
                    <button 
                      onClick={() => setLogItems([])}
                      className="px-3.5 py-1.5 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 hover:bg-rose-100/70 dark:hover:bg-rose-900/30 text-xs font-bold rounded-xl transition"
                    >
                      Clear Console
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 text-xs border-b border-slate-100 dark:border-white/10 pb-2 overflow-x-auto">
                  {['ALL', 'INFO', 'DEBUG', 'WARN', 'ERROR'].map(f => {
                    const isSelected = logFilter === f;
                    return (
                      <button
                        key={f}
                        onClick={() => setLogFilter(f)}
                        className={`px-3 py-1 rounded-lg font-mono text-xs transition ${
                          isSelected 
                            ? 'bg-slate-800 dark:bg-slate-700 text-white font-bold' 
                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40'
                        }`}
                      >
                        {f}
                      </button>
                    );
                  })}
                </div>

                <div className="bg-slate-950 text-slate-300 p-5 rounded-2xl border border-slate-900 dark:border-white/10 font-mono text-[11px] leading-relaxed space-y-2 min-h-[250px] max-h-[380px] overflow-y-auto shadow-inner">
                  {logItems.filter(l => logFilter === 'ALL' || l.type === logFilter).map(log => (
                    <div key={log.id} className="flex gap-2.5 text-left border-b border-white/5 pb-1 last:border-0 hover:bg-white/5 px-2 py-0.5 rounded transition">
                      <span className="text-slate-500 shrink-0 select-none">[{log.time}]</span>
                      <span className={`font-bold shrink-0 select-none ${
                        log.type === 'INFO' ? 'text-blue-400' :
                        log.type === 'DEBUG' ? 'text-purple-400' :
                        log.type === 'WARN' ? 'text-amber-400' : 'text-rose-500 animate-pulse'
                      }`}>[{log.type}]</span>
                      <span className="text-slate-200">{log.msg}</span>
                    </div>
                  ))}
                  {logItems.filter(l => logFilter === 'ALL' || l.type === logFilter).length === 0 && (
                    <div className="text-center py-16 text-slate-600 italic">No logs matched this filter. Click "Trigger Mock Event" to generate logs.</div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: DATABASE BROWSER */}
            {activeTab === 'db_browser' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center flex-wrap gap-3 border-b border-slate-100 dark:border-white/10 pb-3">
                  <div>
                    <h3 className="font-bold text-sm text-[#002B5B] dark:text-white uppercase font-mono flex items-center gap-1.5">
                      <Database className="h-4 w-4 text-blue-500" /> Local JSON Database Browser
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Akses langsung isi basis data real-time INFOBOS dari sub-sistem.</p>
                  </div>
                  
                  <div className="flex gap-1.5 bg-slate-100 dark:bg-slate-950/40 p-1 border dark:border-white/10 rounded-xl">
                    {['articles', 'revenue_streams', 'users'].map(table => (
                      <button 
                        key={table}
                        onClick={() => setDbTable(table)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold capitalize transition ${
                          dbTable === table 
                            ? 'bg-white dark:bg-sky-500/20 text-slate-900 dark:text-sky-300 shadow-sm' 
                            : 'hover:bg-white/50 dark:hover:bg-slate-800/50 text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {table.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2 bg-slate-50 dark:bg-[#001122]/60 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 max-w-sm text-xs w-full">
                    <Search className="h-4 w-4 text-slate-400 shrink-0" />
                    <input 
                      type="text" 
                      placeholder={`Saring tabel ${dbTable.replace('_', ' ')}...`}
                      value={dbSearch}
                      onChange={(e) => setDbSearch(e.target.value)}
                      className="bg-transparent border-none outline-none w-full focus:ring-0 text-slate-800 dark:text-slate-200"
                    />
                  </div>
                  <span className="text-slate-400 text-xs font-mono">Ditemukan {filteredDbData.length} records</span>
                </div>

                <div className="overflow-x-auto border border-slate-200 dark:border-white/10 rounded-2xl shadow-xs">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 dark:bg-[#001f42]/40 border-b border-slate-200 dark:border-white/10 font-mono text-slate-600 dark:text-slate-400 uppercase text-[10px] tracking-wider">
                      <tr>
                        {filteredDbData.length > 0 && Object.keys(filteredDbData[0]).map(key => (
                          <th key={key} className="px-5 py-3">{key.replace('_', ' ')}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                      {filteredDbData.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition">
                          {Object.values(row).map((val: any, cellIdx) => (
                            <td key={cellIdx} className="px-5 py-3 font-sans text-slate-700 dark:text-slate-300">
                              {cellIdx === 0 ? (
                                <span className="font-mono bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-300 border dark:border-white/5 px-1.5 py-0.5 rounded text-[10px] font-bold">{String(val)}</span>
                              ) : (
                                typeof val === 'object' ? JSON.stringify(val) : String(val)
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                      {filteredDbData.length === 0 && (
                        <tr>
                          <td className="px-5 py-16 text-center text-slate-400 italic" colSpan={5}>
                            Tidak ada record pencarian yang cocok.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB: ENVIRONMENT */}
            {activeTab === 'environment' && (
              <div className="space-y-4">
                <div className="border-b border-slate-100 dark:border-white/10 pb-3">
                  <h3 className="font-bold text-sm text-[#002B5B] dark:text-white uppercase font-mono flex items-center gap-1.5">
                    <Settings className="h-4 w-4 text-amber-500" /> Environment Configuration Matrix
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Melihat variabel lingkungan server yang aktif dan kebijakan sandboxing.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                  <div className="border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 bg-gradient-to-br from-slate-50 to-slate-100/30 dark:from-[#001f42]/40 dark:to-[#001f42]/10 space-y-3">
                    <span className="font-mono font-bold text-[#002B5B] dark:text-white text-xs flex items-center gap-1">
                      <Code className="h-3.5 w-3.5 text-indigo-500" /> Active Environment Variables
                    </span>
                    <div className="font-mono text-[11px] space-y-2 text-slate-600 dark:text-slate-400 pt-2">
                      <div className="flex justify-between border-b border-slate-200/50 dark:border-white/5 pb-1.5">
                        <span>NODE_ENV:</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100/50 dark:bg-emerald-950/40 border dark:border-emerald-500/20 px-1.5 py-0.2 rounded">"development"</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200/50 dark:border-white/5 pb-1.5">
                        <span>PORT:</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 bg-slate-200 dark:bg-slate-800 px-1.5 py-0.2 rounded">3000 (Ingress Active)</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200/50 dark:border-white/5 pb-1.5">
                        <span>GEMINI_API_KEY:</span>
                        <span className="font-bold text-teal-600 dark:text-teal-400 font-mono">"AIzaSy******** (SDK Active)"</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200/50 dark:border-white/5 pb-1.5">
                        <span>DATABASE_SYNC_INTERVAL:</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">"600"</span>
                      </div>
                      <div className="flex justify-between">
                        <span>DISABLE_HMR:</span>
                        <span className="font-bold text-amber-600 dark:text-amber-400 bg-amber-100/50 dark:bg-amber-950/40 border dark:border-amber-500/20 px-1.5 py-0.2 rounded">"true"</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 bg-gradient-to-br from-slate-50 to-slate-100/30 dark:from-[#001f42]/40 dark:to-[#001f42]/10 space-y-3">
                    <span className="font-mono font-bold text-[#002B5B] dark:text-white text-xs flex items-center gap-1">
                      <Server className="h-3.5 w-3.5 text-blue-500" /> Nginx Reverse Proxy Settings
                    </span>
                    <div className="font-mono text-[11px] space-y-2 text-slate-600 dark:text-slate-400 pt-2">
                      <div className="flex justify-between border-b border-slate-200/50 dark:border-white/5 pb-1.5"><span>Client Max Body Size:</span><span className="font-bold text-slate-700 dark:text-slate-300">10M</span></div>
                      <div className="flex justify-between border-b border-slate-200/50 dark:border-white/5 pb-1.5"><span>Proxy Read Timeout:</span><span className="font-bold text-slate-700 dark:text-slate-300">60s</span></div>
                      <div className="flex justify-between border-b border-slate-200/50 dark:border-white/5 pb-1.5"><span>SSL Protocol:</span><span className="text-emerald-600 dark:text-emerald-400 font-extrabold bg-emerald-100/50 dark:bg-emerald-950/40 border dark:border-emerald-500/20 px-1.5 py-0.2 rounded">TLSv1.3 (Enforced)</span></div>
                      <div className="flex justify-between"><span>Frame Permissions:</span><span className="font-bold text-slate-700 dark:text-slate-300">["camera", "geolocation"]</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: METRICS */}
            {activeTab === 'metrics' && (
              <div className="space-y-6">
                <div className="border-b border-slate-200/60 dark:border-white/10 pb-3 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-sm text-[#002B5B] dark:text-white uppercase font-mono flex items-center gap-1.5">
                      <Activity className="h-4 w-4 text-indigo-500" /> Platform AI &amp; Network Performance Control
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Real-time HTTP throughput, API latency percentiles, active scheduler queues, and execution logs.</p>
                  </div>
                </div>

                {/* Developer UI: AI Analytics Dashboard */}
                <AIAnalyticsDashboard defaultRole="developer" isEmbedded={true} />

                <div className="border border-slate-200/80 dark:border-white/10 p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/30 dark:from-[#001f42]/40 dark:to-[#001f42]/10 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-xs text-[#002B5B] dark:text-slate-200 uppercase font-mono flex items-center gap-1.5">
                      <Server className="h-3.5 w-3.5 text-blue-500" /> Live HTTP Inbound Traffic History
                    </h4>
                    <span className="text-[9px] bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded font-mono font-bold uppercase">Static Historical Baseline</span>
                  </div>
                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={rpsData}>
                        <defs>
                          <linearGradient id="rpsGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="latencyGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15}/>
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="opacity-10 dark:opacity-5" />
                        <XAxis dataKey="time" stroke="#475569" fontSize={8} tickLine={false} />
                        <YAxis stroke="#475569" fontSize={8} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }} />
                        <Area type="monotone" dataKey="rps" stroke="#3b82f6" fill="url(#rpsGrad)" strokeWidth={2} name="Requests per Sec" />
                        <Area type="monotone" dataKey="latency" stroke="#f59e0b" fill="url(#latencyGrad)" strokeWidth={2} name="Latency (ms)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
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
// 11. FINANCE PORTAL (REVENUEOS 23 MODEL BISNIS)
// ==========================================
export function FinancePortal({ user }: PortalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'monetization_23' | 'invoices' | 'payouts' | 'taxation' | 'audits'>('overview');
  const [modelSearch, setModelSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // 23 model bisnis monetisasi RevenueOS
  const [models, setModels] = useState([
    // Category 1: Sponsor & Iklan
    { id: 'M1', name: 'Banner Ads Programmatic', category: 'Sponsor & Iklan', share: '70% Media / 30% Partner', yield: 184500000, status: 'Active' },
    { id: 'M2', name: 'In-Article Native Ads', category: 'Sponsor & Iklan', share: '65% Media / 35% Partner', yield: 95000000, status: 'Active' },
    { id: 'M3', name: 'Premium Sponsored Content', category: 'Sponsor & Iklan', share: '80% Writer / 20% Admin', yield: 240000000, status: 'Active' },
    { id: 'M4', name: 'Podcast Audio Sponsor Roll', category: 'Sponsor & Iklan', share: '75% Speaker / 25% Admin', yield: 65000000, status: 'Active' },
    { id: 'M5', name: 'Video Pre-rolls (Video Hub)', category: 'Sponsor & Iklan', share: '70% Creator / 30% Admin', yield: 110000000, status: 'Active' },
    { id: 'M6', name: 'Geo-targeted Brand Placement', category: 'Sponsor & Iklan', share: '60% Agent / 40% Admin', yield: 85000000, status: 'Active' },
    { id: 'M7', name: 'SEO Link Building Partner', category: 'Sponsor & Iklan', share: '50% Flat Share', yield: 45000000, status: 'Active' },
    // Category 2: Berlangganan & Premium
    { id: 'M8', name: 'Digital Subscription Monthly', category: 'Berlangganan & Premium', share: 'Direct Media Revenue', yield: 380000000, status: 'Active' },
    { id: 'M9', name: 'Corporate Multi-user License', category: 'Berlangganan & Premium', share: 'Direct B2B Invoice', yield: 550000000, status: 'Active' },
    { id: 'M10', name: 'Print-Digital Hybrid Bundle', category: 'Berlangganan & Premium', share: 'Vendor fulfillment split', yield: 120000000, status: 'Active' },
    { id: 'M11', name: 'Micropayment Single Article Pass', category: 'Berlangganan & Premium', share: '90% Writer / 10% Fee', yield: 38000000, status: 'Active' },
    { id: 'M12', name: 'Ad-free Premium Member Tier', category: 'Berlangganan & Premium', share: 'Direct VIP Club Fund', yield: 145000000, status: 'Active' },
    // Category 3: Sindikasi & Konten
    { id: 'M13', name: 'News API Feed Syndication', category: 'Sindikasi & Konten', share: 'Corporate API Charge', yield: 210000000, status: 'Active' },
    { id: 'M14', name: 'White-label Portal Publisher', category: 'Sindikasi & Konten', share: 'SaaS licensing split', yield: 320000000, status: 'Active' },
    { id: 'M15', name: 'Custom Curator Newsletters', category: 'Sindikasi & Konten', share: '80% Curator Share', yield: 55000000, status: 'Active' },
    // Category 4: Intelijen Data
    { id: 'M16', name: 'Spatio-News GIS API (Spatial)', category: 'Intelijen Data', share: 'Licensing B2G/B2B', yield: 410000000, status: 'Active' },
    { id: 'M17', name: 'Sentinel AI sentiment alert', category: 'Intelijen Data', share: 'Subscription premium', yield: 290000000, status: 'Active' },
    { id: 'M18', name: 'Industry Policy Research PDF', category: 'Intelijen Data', share: 'Single Download Purchase', yield: 185000000, status: 'Active' },
    { id: 'M19', name: 'Politico Node Connection API', category: 'Intelijen Data', share: 'API call billing', yield: 115000000, status: 'Active' },
    { id: 'M20', name: 'Historical Archive Licensing', category: 'Intelijen Data', share: 'Enterprise license', yield: 95000000, status: 'Active' },
    // Category 5: Live Events & Workshop
    { id: 'M21', name: 'Masterclass Training Ticket', category: 'Live Events', share: '60% Presenter / 40% Admin', yield: 75000000, status: 'Active' },
    { id: 'M22', name: 'Annual Media Summit Sponsor', category: 'Live Events', share: 'Corporate direct contract', yield: 350000000, status: 'Active' },
    { id: 'M23', name: 'Custom Media Consulting Service', category: 'Live Events', share: 'Consultant rate split', yield: 180000000, status: 'Active' }
  ]);

  const [invoices, setInvoices] = useState([
    { invNo: 'INV-FIN-202601', recipient: 'Bank BJB Jabar', amount: 125000000, date: '2026-06-15', status: 'PAID' },
    { invNo: 'INV-FIN-202602', recipient: 'PT Telkom Indonesia', amount: 75000000, date: '2026-06-18', status: 'PENDING' },
    { invNo: 'INV-FIN-202603', recipient: 'Dinas Kominfo Bandung', amount: 45000000, date: '2026-06-20', status: 'PAID' },
    { invNo: 'INV-FIN-202604', recipient: 'Polda Jabar Humas', amount: 35000000, date: '2026-06-22', status: 'OVERDUE' }
  ]);

  const [payouts, setPayouts] = useState([
    { id: 1, name: 'Budi Santoso (Reporter)', requested: 4500000, date: '2026-06-25', status: 'Awaiting Approval' },
    { id: 2, name: 'Ani Wijaya (Writer)', requested: 2800000, date: '2026-06-26', status: 'Awaiting Approval' },
    { id: 3, name: 'Siti Rahma (Creator)', requested: 8200000, date: '2026-06-26', status: 'Paid' }
  ]);

  const [newInvRecipient, setNewInvRecipient] = useState('');
  const [newInvAmount, setNewInvAmount] = useState('');
  const [newInvStatus, setNewInvStatus] = useState('PENDING');

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInvRecipient.trim() || !newInvAmount) return;

    const num = parseFloat(newInvAmount);
    const newInv = {
      invNo: `INV-FIN-${Date.now().toString().slice(-4)}`,
      recipient: newInvRecipient,
      amount: num,
      date: new Date().toISOString().split('T')[0],
      status: newInvStatus
    };

    setInvoices(prev => [newInv, ...prev]);
    setNewInvRecipient('');
    setNewInvAmount('');
  };

  const handleToggleModelStatus = (id: string) => {
    setModels(prev => prev.map(m => {
      if (m.id === id) {
        return { ...m, status: m.status === 'Active' ? 'Inactive' : 'Active' };
      }
      return m;
    }));
  };

  const handlePayoutAction = (id: number, action: 'Approve' | 'Reject') => {
    setPayouts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, status: action === 'Approve' ? 'Approved & Paid' : 'Rejected' };
      }
      return p;
    }));
  };

  const revenueByMonth = [
    { label: 'Jan', ads: 120, subscriptions: 80, data: 150, events: 50 },
    { label: 'Feb', ads: 140, subscriptions: 95, data: 180, events: 65 },
    { label: 'Mar', ads: 180, subscriptions: 110, data: 220, events: 70 },
    { label: 'Apr', ads: 210, subscriptions: 130, data: 310, events: 85 },
    { label: 'Mei', ads: 250, subscriptions: 165, data: 380, events: 110 },
    { label: 'Jun', ads: 310, subscriptions: 195, data: 440, events: 140 }
  ];

  const filteredModels = models.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(modelSearch.toLowerCase()) || m.id.toLowerCase().includes(modelSearch.toLowerCase());
    const matchCat = selectedCategory === 'All' || m.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200/80 dark:border-white/10 pb-4 gap-3">
        <div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1">
            <Coins className="h-3.5 w-3.5" /> INFOBOS REVENUEOS AUDIT
          </span>
          <h2 className="text-2xl font-black text-[#002B5B] dark:text-white tracking-tight mt-1">Sistem Manajemen Keuangan &amp; Laba Bisnis</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Lacak arus laba dari 23 channel monetisasi terintegrasi, verifikasi invoice, dan kelola pembayaran.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-emerald-500/10 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 dark:border-emerald-500/20 px-3.5 py-1.5 rounded-full font-mono font-bold flex items-center gap-1.5 shadow-xs">
            <ShieldCheck className="h-4 w-4 animate-pulse" /> REVENUE SYSTEM ACTIVE
          </span>
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-200 dark:border-white/10 pb-2 overflow-x-auto scrollbar-none text-xs font-semibold">
        {[
          { id: 'overview', label: 'Laba Ringkasan', icon: Layout },
          { id: 'monetization_23', label: '23 Model Bisnis', icon: FileSpreadsheet },
          { id: 'invoices', label: 'Invoices Billing', icon: DollarSign },
          { id: 'payouts', label: 'Payout Persetujuan', icon: Users },
          { id: 'taxation', label: 'Kalkulasi Pajak', icon: TrendingUp },
          { id: 'audits', label: 'Audit Jurnal', icon: CheckCircle }
        ].map(t => {
          const isActive = activeTab === t.id;
          return (
            <button 
              key={t.id} 
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap capitalize transition-all duration-200 relative ${
                isActive 
                  ? 'bg-[#002B5B] dark:bg-[#002b5b] text-white font-bold shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/5'
              }`}
            >
              <t.icon className={`h-4 w-4 ${isActive ? 'text-[#FFD700]' : 'text-slate-400 dark:text-slate-500'}`} />
              <span>{t.label}</span>
              {isActive && (
                <motion.span 
                  layoutId="activeTabGlowFinance" 
                  className="absolute inset-0 border-2 border-emerald-500/40 rounded-xl pointer-events-none"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="bg-white dark:bg-[#001733]/40 border border-slate-200/80 dark:border-white/10 rounded-2xl p-6 min-h-[420px] shadow-sm relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div className="p-4 border border-slate-100 dark:border-white/10 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-[#001f42]/40 dark:to-[#001f42]/10 space-y-2 hover:shadow-md transition-all duration-300">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-extrabold uppercase font-mono tracking-wider">Laba Berjalan Bulan Ini</span>
                    <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">Rp 1.24B</div>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold font-mono flex items-center gap-1">
                      <span>▲ 24.1%</span> <span className="text-slate-400 dark:text-slate-500 font-normal">vs target awal</span>
                    </p>
                  </div>
                  <div className="p-4 border border-slate-100 dark:border-white/10 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-[#001f42]/40 dark:to-[#001f42]/10 space-y-2 hover:shadow-md transition-all duration-300">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-extrabold uppercase font-mono tracking-wider">Outstanding Invoices</span>
                    <div className="text-2xl font-black text-amber-600 dark:text-amber-400">Rp 110M</div>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">Total invoice jatuh tempo ditagih</p>
                  </div>
                  <div className="p-4 border border-slate-100 dark:border-white/10 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-[#001f42]/40 dark:to-[#001f42]/10 space-y-2 hover:shadow-md transition-all duration-300">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-extrabold uppercase font-mono tracking-wider">Payouts Approved</span>
                    <div className="text-2xl font-black text-[#002B5B] dark:text-slate-200">Rp 15.5M</div>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">Total pencairan kreator partner</p>
                  </div>
                  <div className="p-4 border border-slate-100 dark:border-white/10 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-[#001f42]/40 dark:to-[#001f42]/10 space-y-2 hover:shadow-md transition-all duration-300">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-extrabold uppercase font-mono tracking-wider">Negosiasi Kontrak Baru</span>
                    <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">3 Korporat</div>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">Sinergi AdOS Pipeline</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-xs text-[#002B5B] dark:text-slate-200 uppercase font-mono tracking-wider">Revenue Split By Stream (IDR in Millions)</h3>
                    <span className="text-slate-400 dark:text-slate-500 font-mono text-[10px]">6 Months Performance Graph</span>
                  </div>
                  <div className="h-64 w-full border border-slate-200/85 dark:border-white/10 p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/30 dark:from-[#001f42]/40 dark:to-[#001f42]/10">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueByMonth}>
                        <defs>
                          <linearGradient id="adsColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="subsColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="dataColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25}/>
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="opacity-10 dark:opacity-5" />
                        <XAxis dataKey="label" stroke="#475569" fontSize={9} tickLine={false} />
                        <YAxis stroke="#475569" fontSize={9} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }} />
                        <Area type="monotone" dataKey="ads" stackId="1" stroke="#3b82f6" fill="url(#adsColor)" strokeWidth={2.5} name="Ads & Sponsorships" />
                        <Area type="monotone" dataKey="subscriptions" stackId="1" stroke="#10b981" fill="url(#subsColor)" strokeWidth={2.5} name="Subscriptions Premium" />
                        <Area type="monotone" dataKey="data" stackId="1" stroke="#8b5cf6" fill="url(#dataColor)" strokeWidth={2.5} name="Data Intelligence" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: 23 MODEL MONETIZATION */}
            {activeTab === 'monetization_23' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-white/10 pb-3">
                  <div>
                    <h3 className="font-bold text-sm text-[#002B5B] dark:text-slate-200 uppercase font-mono flex items-center gap-1.5">
                      <FileSpreadsheet className="h-4 w-4 text-emerald-500" /> Matrix 23 Model Bisnis Terintegrasi (RevenueOS)
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Atur integrasi pendapatan, komisi bagi hasil, serta hidupkan/matikan modul monetisasi.</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 max-w-xs text-xs w-full shrink-0">
                    <Search className="h-4 w-4 text-slate-400 dark:text-slate-500 shrink-0" />
                    <input 
                      type="text" 
                      placeholder="Cari model bisnis..."
                      value={modelSearch}
                      onChange={(e) => setModelSearch(e.target.value)}
                      className="bg-transparent border-none outline-none w-full focus:ring-0 text-slate-800 dark:text-white"
                    />
                  </div>
                  
                  <div className="flex gap-1 overflow-x-auto scrollbar-none py-0.5 text-xs">
                    {['All', 'Sponsor & Iklan', 'Berlangganan & Premium', 'Sindikasi & Konten', 'Intelijen Data', 'Live Events'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg font-bold border transition shrink-0 ${
                          selectedCategory === cat 
                            ? 'bg-[#002B5B] text-white border-[#002B5B] dark:bg-sky-500 dark:border-sky-500 dark:text-white' 
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-[#001f42]/40 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredModels.map(model => (
                    <div 
                      key={model.id} 
                      className={`p-4 border rounded-2xl flex flex-col justify-between text-xs transition shadow-xs hover:shadow-md ${
                        model.status === 'Active' 
                          ? 'bg-gradient-to-br from-white to-emerald-50/10 dark:from-[#001f42]/40 dark:to-emerald-950/10 border-slate-200/80 dark:border-white/10 hover:border-emerald-200 dark:hover:border-emerald-500/30' 
                          : 'bg-slate-50/50 dark:bg-[#001f42]/20 border-slate-200 dark:border-white/5 text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      <div className="space-y-1.5 text-left">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold bg-slate-100 dark:bg-[#001733] text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded text-[9px] uppercase tracking-wider">{model.id}</span>
                          <span className={`text-[9px] font-extrabold uppercase font-mono px-2 py-0.5 rounded-full ${
                            model.status === 'Active' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400' : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                          }`}>
                            {model.status}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-800 dark:text-white text-xs mt-1 leading-tight">{model.name}</h4>
                        <div className="pt-1.5 space-y-1 font-mono text-[10px]">
                          <p className="text-slate-500 dark:text-slate-400">Skema: <span className="font-sans text-slate-700 dark:text-slate-300 font-medium">{model.share}</span></p>
                          <p className="text-slate-500 dark:text-slate-400">Hasil: <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">Rp {model.yield.toLocaleString()}</span></p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 dark:border-white/10 mt-3 flex justify-between items-center">
                        <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono tracking-wide uppercase">{model.category}</span>
                        <button 
                          onClick={() => handleToggleModelStatus(model.id)}
                          className={`px-3 py-1 text-[10px] font-mono font-bold rounded-lg transition ${
                            model.status === 'Active' 
                              ? 'bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300' 
                              : 'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white'
                          }`}
                        >
                          {model.status === 'Active' ? 'Nonaktifkan' : 'Aktifkan'}
                        </button>
                      </div>
                    </div>
                  ))}
                  {filteredModels.length === 0 && (
                    <div className="col-span-full text-center py-16 text-slate-400 dark:text-slate-500 italic bg-slate-50 dark:bg-[#001f42]/20 rounded-2xl border border-dashed border-slate-200 dark:border-white/10">
                      Tidak ada model monetisasi yang cocok dengan filter pencarian Anda.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: INVOICES BILLING */}
            {activeTab === 'invoices' && (
              <div className="space-y-4">
                <div className="border-b border-slate-100 dark:border-white/10 pb-3">
                  <h3 className="font-bold text-sm text-[#002B5B] dark:text-slate-200 uppercase font-mono flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4 text-emerald-500" /> Invoices Billing &amp; Reconcile
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Terbitkan tagihan bagi korporat partner yang memanfaatkan jasa programmatic iklan AdOS maupun lisensi data.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-4 border border-slate-200 dark:border-white/10 rounded-2xl p-5 bg-slate-50/50 dark:bg-[#001f42]/20 space-y-4 text-xs">
                    <h4 className="font-bold text-xs text-[#002B5B] dark:text-slate-200 uppercase font-mono flex items-center gap-1.5">
                      <Plus className="h-4 w-4 text-indigo-500" /> Terbitkan Invoice Kemitraan
                    </h4>
                    <form onSubmit={handleCreateInvoice} className="space-y-3">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 dark:text-slate-300">Mitra Korporat / Penerima</label>
                        <input 
                          type="text" 
                          placeholder="e.g. PT Pertamina Jabar" 
                          value={newInvRecipient}
                          onChange={(e) => setNewInvRecipient(e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white transition animate-none"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 dark:text-slate-300">Jumlah Tagihan (IDR)</label>
                        <input 
                          type="number" 
                          placeholder="e.g. 50000000" 
                          value={newInvAmount}
                          onChange={(e) => setNewInvAmount(e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white transition font-mono animate-none"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 dark:text-slate-300">Status Tagihan Awal</label>
                        <select 
                          value={newInvStatus} 
                          onChange={(e) => setNewInvStatus(e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white transition"
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="PAID">PAID</option>
                        </select>
                      </div>

                      <button 
                        type="submit"
                        className="w-full py-3 bg-[#002B5B] hover:bg-[#001f42] dark:bg-sky-600 dark:hover:bg-sky-700 text-white font-bold rounded-xl transition shadow-xs text-center"
                      >
                        Terbitkan Tagihan &rarr;
                      </button>
                    </form>
                  </div>

                  <div className="lg:col-span-8 space-y-3">
                    <h4 className="font-bold text-xs text-[#002B5B] dark:text-slate-200 uppercase font-mono">Daftar Rekonsiliasi Invoice</h4>
                    <div className="overflow-x-auto border border-slate-200 dark:border-white/10 rounded-2xl shadow-xs">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-white/10 font-mono text-slate-600 dark:text-slate-400 uppercase text-[10px] tracking-wider">
                          <tr>
                            <th className="px-5 py-3">Inv No</th>
                            <th className="px-5 py-3">Mitra Korporat</th>
                            <th className="px-5 py-3">Jumlah</th>
                            <th className="px-5 py-3">Tanggal</th>
                            <th className="px-5 py-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                          {invoices.map((inv) => (
                            <tr key={inv.invNo} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition">
                              <td className="px-5 py-3 font-mono font-bold text-[#002B5B] dark:text-sky-400">{inv.invNo}</td>
                              <td className="px-5 py-3 font-semibold text-slate-800 dark:text-slate-200">{inv.recipient}</td>
                              <td className="px-5 py-3 font-mono font-extrabold text-slate-900 dark:text-white">Rp {inv.amount.toLocaleString()}</td>
                              <td className="px-5 py-3 text-slate-500 dark:text-slate-400 font-mono">{inv.date}</td>
                              <td className="px-5 py-3">
                                <span className={`text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-full ${
                                  inv.status === 'PAID' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400' :
                                  inv.status === 'PENDING' ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400' :
                                  'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-400 animate-pulse'
                                }`}>
                                  {inv.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PAYOUTS */}
            {activeTab === 'payouts' && (
              <div className="space-y-4">
                <div className="border-b border-slate-100 dark:border-white/10 pb-3">
                  <h3 className="font-bold text-sm text-[#002B5B] dark:text-slate-200 uppercase font-mono flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-blue-500" /> Pencairan Dana Royalti Kreator
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Tinjau dan setujui permintaan penarikan saldo pendapatan dari penulis dan kreator partner.</p>
                </div>

                <div className="space-y-3">
                  {payouts.map(p => (
                    <div key={p.id} className="p-4 border border-slate-200 dark:border-white/10 rounded-2xl bg-slate-50/50 dark:bg-[#001f42]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:border-slate-300 dark:hover:border-white/20 transition-all">
                      <div className="space-y-1 text-left">
                        <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{p.name}</span>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-slate-400 dark:text-slate-500 text-[10px]">
                          <span>Tanggal Request: {p.date}</span>
                          <span className="text-slate-500 dark:text-slate-600">|</span>
                          <span>Sistem Transfer: Bank Mandiri VA</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 justify-between sm:justify-end">
                        <span className="font-mono font-black text-emerald-600 dark:text-emerald-400 text-sm">Rp {p.requested.toLocaleString()}</span>
                        
                        {p.status === 'Awaiting Approval' ? (
                          <div className="flex gap-1.5">
                            <button 
                              onClick={() => handlePayoutAction(p.id, 'Approve')}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-xl font-bold transition text-xs"
                            >
                              Setujui
                            </button>
                            <button 
                              onClick={() => handlePayoutAction(p.id, 'Reject')}
                              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600 text-white rounded-xl font-bold transition text-xs"
                            >
                              Tolak
                            </button>
                          </div>
                        ) : (
                          <span className={`font-mono font-bold px-3 py-1 rounded-full text-[10px] ${
                            p.status === 'Rejected' ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-400' : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400'
                          }`}>
                            {p.status}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: TAXATION */}
            {activeTab === 'taxation' && (
              <div className="space-y-4">
                <div className="border-b border-slate-100 dark:border-white/10 pb-3">
                  <h3 className="font-bold text-sm text-[#002B5B] dark:text-slate-200 uppercase font-mono flex items-center gap-1.5">
                    <TrendingUp className="h-4 w-4 text-[#002B5B] dark:text-slate-200" /> Kalkulasi Pemotongan Pajak Otomatis (PPh 21 / 23)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Sistem RevenueOS otomatis memotong pajak pertambahan nilai dan royalti sesuai undang-undang.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                  <div className="border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 bg-gradient-to-br from-slate-50 to-slate-100/40 dark:from-[#001f42]/40 dark:to-[#001f42]/10 space-y-3">
                    <h4 className="font-bold text-[#002B5B] dark:text-white uppercase font-mono text-xs border-b border-slate-200 dark:border-white/10 pb-2">Ketentuan PPh 21 (Pekerja Kreator Perorangan)</h4>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      Bagi hasil royalti kreator yang memiliki NPWP dipotong <strong>2.5%</strong>, sedangkan non-NPWP dipotong <strong>5%</strong> sesuai regulasi Direktorat Jenderal Pajak RI.
                    </p>
                    <div className="bg-white/60 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/50 dark:border-white/10 font-mono text-[10px] space-y-1">
                      <p className="font-bold text-slate-700 dark:text-slate-300">Simulasi Pajak Kreator:</p>
                      <p className="text-slate-500 dark:text-slate-400">Royalti: Rp 10.000.000</p>
                      <p className="text-emerald-600 dark:text-emerald-400 font-bold">Potongan PPh 21 (NPWP): Rp 250.000 (2.5%)</p>
                    </div>
                  </div>

                  <div className="border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 bg-gradient-to-br from-slate-50 to-slate-100/40 dark:from-[#001f42]/40 dark:to-[#001f42]/10 space-y-3">
                    <h4 className="font-bold text-[#002B5B] dark:text-white uppercase font-mono text-xs border-b border-slate-200 dark:border-white/10 pb-2">Ketentuan PPh 23 (Kemitraan AdOS Korporat)</h4>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      Tagihan invoice iklan banner korporat dikenai potongan PPh Pasal 23 sebesar <strong>2%</strong> untuk jasa periklanan tersertifikasi Dewan Pers.
                    </p>
                    <div className="bg-white/60 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/50 dark:border-white/10 font-mono text-[10px] space-y-1">
                      <p className="font-bold text-slate-700 dark:text-slate-300">Simulasi Pajak Iklan:</p>
                      <p className="text-slate-500 dark:text-slate-400">Invoice: Rp 50.000.000</p>
                      <p className="text-amber-600 dark:text-amber-400 font-bold">Potongan PPh 23: Rp 1.000.000 (2%)</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: AUDITS */}
            {activeTab === 'audits' && (
              <div className="space-y-4">
                <div className="border-b border-slate-100 dark:border-white/10 pb-3">
                  <h3 className="font-bold text-sm text-[#002B5B] dark:text-slate-200 uppercase font-mono flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4 text-emerald-500" /> Jurnal Ledgers Audit Keuangan
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Audit trail kepatuhan transaksi real-time sesuai prinsip akuntabilitas moneter.</p>
                </div>

                <div className="bg-slate-950 text-slate-300 p-5 rounded-2xl border border-slate-900 dark:border-white/10 font-mono text-xs space-y-2 max-h-[350px] overflow-y-auto shadow-inner leading-relaxed text-left">
                  <div className="flex gap-2 text-[11px] pb-1.5 border-b border-white/5 last:border-0 hover:bg-white/5 px-2 py-0.5 rounded transition">
                    <span className="text-slate-500">[27 Jun 00:05]</span>
                    <span className="text-emerald-400 font-bold">[SYSTEM]</span>
                    <span>Automatically credited Rp 14,500 to Member #31049 (Micropayment share)</span>
                  </div>
                  <div className="flex gap-2 text-[11px] pb-1.5 border-b border-white/5 last:border-0 hover:bg-white/5 px-2 py-0.5 rounded transition">
                    <span className="text-slate-500">[27 Jun 01:12]</span>
                    <span className="text-blue-400 font-bold">[AUDITOR]</span>
                    <span>Reconciled Bank VA payment INV-FIN-202603 - Balance match verified</span>
                  </div>
                  <div className="flex gap-2 text-[11px] pb-1.5 border-b border-white/5 last:border-0 hover:bg-white/5 px-2 py-0.5 rounded transition">
                    <span className="text-slate-500">[27 Jun 02:00]</span>
                    <span className="text-indigo-400 font-bold">[REVENUE]</span>
                    <span>Disbursed tax collection IDR 3,500,000 for PPh 23 (Bank BJB)</span>
                  </div>
                  <div className="flex gap-2 text-[11px] font-bold text-emerald-400 pt-1">
                    <span className="text-slate-500 font-normal">[27 Jun 02:20]</span>
                    <span>[LEDGER STATUS] OK - Balance sheet matches transaction history. Zero discrepancies found.</span>
                  </div>
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
// 12. GOVERNMENT PORTAL
// ==========================================
export function GovernmentPortal({ user }: PortalProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'press_room' | 'hoax_buster' | 'policy_check' | 'geospatial'>('dashboard');
  
  const [pressReleases, setPressReleases] = useState([
    { id: 'pr-1', title: 'Pemerintah Provinsi Jawa Barat Menyalurkan Bantuan Sosial UMKM Tahap III', sector: 'Sosial', date: '2026-06-25', status: 'Diterima Redaksi' },
    { id: 'pr-2', title: 'Pembangunan Tol Cigatas Diproyeksikan Rampung Akhir Kuartal IV 2026', sector: 'Infrastruktur', date: '2026-06-26', status: 'Diserahkan' }
  ]);

  const [hoaxes, setHoaxes] = useState([
    { id: 'hx-1', claim: 'Hoax: Bendungan Jatigede bocor dan Sumedang dalam status darurat banjir', rating: 'HOAX TOTAL', clarification: 'Bupati Sumedang menegaskan struktur bendungan aman setelah audit geospasial real-time.', updatedBy: 'Humas Jabar' },
    { id: 'hx-2', claim: 'Disinformasi: Gedung Sate ditutup sepenuhnya untuk umum karena renovasi internal', rating: 'DISINFORMASI', clarification: 'Gedung Sate hanya membatasi akses ke sayap barat karena pemeliharaan rutin.', updatedBy: 'Diskominfo Jabar' }
  ]);

  const [complianceText, setComplianceText] = useState('');
  const [complianceResult, setComplianceResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [prTitle, setPrTitle] = useState('');
  const [prSector, setPrSector] = useState('Sosial');
  const [prBody, setPrBody] = useState('');
  const [prSuccessMsg, setPrSuccessMsg] = useState(false);

  const [hxClaim, setHxClaim] = useState('');
  const [hxRating, setHxRating] = useState('HOAX TOTAL');
  const [hxClarify, setHxClarify] = useState('');

  const handleCreatePR = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prTitle.trim() || !prBody.trim()) return;

    const newPR = {
      id: `pr-${Date.now().toString().slice(-4)}`,
      title: prTitle,
      sector: prSector,
      date: new Date().toISOString().split('T')[0],
      status: 'Diserahkan'
    };

    setPressReleases(prev => [newPR, ...prev]);
    setPrTitle('');
    setPrBody('');
    setPrSuccessMsg(true);
    setTimeout(() => setPrSuccessMsg(false), 4000);
  };

  const handleCreateHoax = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hxClaim.trim() || !hxClarify.trim()) return;

    const newHx = {
      id: `hx-${Date.now().toString().slice(-4)}`,
      claim: hxClaim,
      rating: hxRating,
      clarification: hxClarify,
      updatedBy: 'Humas Daerah Jabar'
    };

    setHoaxes(prev => [newHx, ...prev]);
    setHxClaim('');
    setHxClarify('');
  };

  const handleAnalyzeCompliance = () => {
    if (!complianceText.trim()) return;
    setIsAnalyzing(true);
    setComplianceResult(null);

    setTimeout(() => {
      setIsAnalyzing(false);
      setComplianceResult({
        risk_tier: 'MED-HIGH RISK',
        friction_points: [
          'Kurangnya sosialisasi awal ke elemen pedagang kaki lima lokal',
          'Potensi framing negatif di kanal media sosial non-arus utama'
        ],
        recommendation: 'Lakukan rilis briefing media terbuka bersama asosiasi UMKM Jawa Barat serta tawarkan lokasi relokasi representatif sebelum mempublikasikan regulasi.'
      });
    }, 1200);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200/80 dark:border-white/10 pb-4 gap-3">
        <div>
          <span className="text-xs font-bold text-teal-600 dark:text-teal-400 font-mono flex items-center gap-1">
            <Globe className="h-3.5 w-3.5" /> INFOBOS B2G ENTERPRISE
          </span>
          <h2 className="text-2xl font-black text-[#002B5B] dark:text-white tracking-tight mt-1">Portal Hub Humas &amp; Kebijakan Daerah</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Media deseminasi informasi resmi pemerintah, verifikasi isu publik, dan simulasi penerimaan regulasi.</p>
        </div>
        <span className="text-xs bg-[#002B5B]/10 dark:bg-[#002B5B]/20 text-[#002B5B] dark:text-[#ffdd44] border border-[#002B5B]/20 dark:border-white/10 px-3.5 py-1.5 rounded-full font-mono font-bold uppercase tracking-wider shadow-xs animate-none">
          GOVERNMENT ACCESS VERIFIED
        </span>
      </div>

      <div className="flex gap-2 border-b border-slate-200 dark:border-white/10 pb-2 overflow-x-auto scrollbar-none text-xs font-semibold">
        {[
          { id: 'dashboard', label: 'Ringkasan Humas', icon: Layout },
          { id: 'press_room', label: 'Rilis Pers room', icon: FileText },
          { id: 'hoax_buster', label: 'Hoax Buster', icon: ShieldAlert },
          { id: 'policy_check', label: 'Prediktor Kebijakan', icon: Sparkles },
          { id: 'geospatial', label: 'Spasial Daerah', icon: MapPin }
        ].map(t => {
          const isActive = activeTab === t.id;
          return (
            <button 
              key={t.id} 
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap capitalize transition-all duration-200 relative ${
                isActive 
                  ? 'bg-[#002B5B] dark:bg-[#002b5b] text-white font-bold shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/5'
              }`}
            >
              <t.icon className={`h-4 w-4 ${isActive ? 'text-[#FFD700]' : 'text-slate-400 dark:text-slate-500'}`} />
              <span>{t.label}</span>
              {isActive && (
                <motion.span 
                  layoutId="activeTabGlowGov" 
                  className="absolute inset-0 border-2 border-[#002B5B]/30 rounded-xl pointer-events-none"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="bg-white dark:bg-[#001733]/40 border border-slate-200/80 dark:border-white/10 rounded-2xl p-6 min-h-[420px] shadow-sm relative overflow-hidden">
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
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
                  <div className="p-5 border border-slate-150 dark:border-white/10 rounded-2xl bg-gradient-to-br from-white to-emerald-50/10 dark:from-[#001f42]/40 dark:to-emerald-950/10 space-y-2 hover:shadow-md transition duration-300">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-extrabold uppercase font-mono tracking-wider">Indeks Sentimen Warga Jabar</span>
                    <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <span>88% Positif</span>
                      <span className="text-xs font-normal text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full font-mono">▲ 4.2%</span>
                    </div>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">Terhadap rilis pembangunan infrastruktur &amp; bansos</p>
                  </div>
                  <div className="p-5 border border-slate-150 dark:border-white/10 rounded-2xl bg-gradient-to-br from-white to-teal-50/10 dark:from-[#001f42]/40 dark:to-[#001f42]/10 space-y-2 hover:shadow-md transition duration-300">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-extrabold uppercase font-mono tracking-wider">Klarifikasi Hoax Terpublikasi</span>
                    <div className="text-2xl font-black text-teal-600 dark:text-teal-400">{hoaxes.length} Isu Teratasi</div>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">Telah tersinkronisasi ke widget publik INFOBOS</p>
                  </div>
                  <div className="p-5 border border-slate-150 dark:border-white/10 rounded-2xl bg-gradient-to-br from-white to-amber-50/10 dark:from-[#001f42]/40 dark:to-[#001f42]/10 space-y-2 hover:shadow-md transition duration-300">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-extrabold uppercase font-mono tracking-wider">Draf Regulasi Diuji</span>
                    <div className="text-2xl font-black text-amber-600 dark:text-amber-400">1 Kebijakan</div>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">Sedang disimulasi sentimen risikonya</p>
                  </div>
                </div>

                <div className="border border-slate-200/85 dark:border-white/10 rounded-2xl p-6 bg-gradient-to-br from-slate-50 to-slate-100/30 dark:from-[#001f42]/40 dark:to-[#001f42]/10 space-y-3">
                  <div className="flex items-center gap-2 text-[#002B5B] dark:text-slate-200 font-extrabold text-sm">
                    <Sparkles className="h-5 w-5 text-amber-500 animate-bounce" />
                    <span className="font-mono uppercase tracking-wider">Konsol Hub B2G Pemerintah Terpadu Jabar</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Di portal ini, instansi humas pemerintah daerah dapat mempublikasikan rilis pers jurnalisme resmi, mengklarifikasi isu hoax yang beredar di masyarakat Jawa Barat, serta memprediksi dampak respon publik terhadap draf kebijakan publik baru menggunakan algoritma analisis sentimen prediktif.
                  </p>
                </div>
              </div>
            )}

            {/* TAB: PRESS ROOM */}
            {activeTab === 'press_room' && (
              <div className="space-y-4">
                <div className="border-b border-slate-100 dark:border-white/10 pb-3">
                  <h3 className="font-bold text-sm text-[#002B5B] dark:text-slate-200 uppercase font-mono flex items-center gap-1.5">
                    <FileText className="h-4 w-4 text-indigo-500" /> Rilis Pers Humas Pemerintah
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Publikasikan rilis resmi instansi langsung ke meja jurnalis dan editor utama INFOBOS.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-5 border border-slate-200 dark:border-white/10 rounded-2xl p-5 bg-slate-50/50 dark:bg-[#001f42]/20 space-y-4 text-xs">
                    <h4 className="font-bold text-xs text-[#002B5B] dark:text-slate-200 uppercase font-mono flex items-center gap-1.5">
                      <Plus className="h-4 w-4 text-indigo-500" /> Tulis Rilis Pers Humas Resmi
                    </h4>
                    <form onSubmit={handleCreatePR} className="space-y-3">
                      {prSuccessMsg && (
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-400 rounded-xl font-medium text-xs leading-relaxed animate-none">
                          ✓ Rilis Pers berhasil dikirimkan ke meja jurnalisme INFOBOS secara real-time!
                        </div>
                      )}
                      
                      <div className="space-y-1 text-left">
                        <label className="font-bold text-slate-700 dark:text-slate-300">Judul Rilis Pers</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Pembukaan Wisata Pantai Jabar Selatan" 
                          value={prTitle}
                          onChange={(e) => setPrTitle(e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white transition animate-none"
                          required
                        />
                      </div>

                      <div className="space-y-1 text-left">
                        <label className="font-bold text-slate-700 dark:text-slate-300">Kategori Sektor</label>
                        <select 
                          value={prSector} 
                          onChange={(e) => setPrSector(e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white transition font-medium"
                        >
                          <option value="Sosial">Sosial</option>
                          <option value="Infrastruktur">Infrastruktur</option>
                          <option value="Ekonomi">Ekonomi</option>
                          <option value="Pariwisata">Pariwisata</option>
                        </select>
                      </div>

                      <div className="space-y-1 text-left">
                        <label className="font-bold text-slate-700 dark:text-slate-300">Isi Naskah Pers</label>
                        <textarea 
                          placeholder="Tulis naskah pers resmi secara lengkap..." 
                          value={prBody}
                          onChange={(e) => setPrBody(e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white transition h-28 resize-none leading-relaxed animate-none"
                          required
                        />
                      </div>

                      <button 
                        type="submit"
                        className="w-full py-3 bg-[#002B5B] hover:bg-[#001f42] dark:bg-sky-600 dark:hover:bg-sky-700 text-white font-bold rounded-xl transition shadow-xs text-center text-xs"
                      >
                        Kirim Rilis ke Jurnalis &rarr;
                      </button>
                    </form>
                  </div>

                  <div className="lg:col-span-7 space-y-3">
                    <h4 className="font-bold text-xs text-[#002B5B] dark:text-slate-200 uppercase font-mono flex items-center gap-1.5">
                      <FolderOpen className="h-4 w-4 text-amber-500" /> Arsip Rilis Pers Terkirim
                    </h4>
                    <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                      {pressReleases.map(pr => (
                        <div key={pr.id} className="p-4 bg-white dark:bg-[#001f42]/20 border border-slate-200 dark:border-white/10 hover:border-indigo-100 dark:hover:border-indigo-500/30 rounded-2xl flex justify-between items-start gap-3 shadow-xs text-left transition">
                          <div className="space-y-1.5">
                            <span className="font-bold text-slate-800 dark:text-white text-xs hover:text-[#002B5B] dark:hover:text-sky-400 transition leading-tight block">{pr.title}</span>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                              <span>Sektor: <span className="text-indigo-600 dark:text-indigo-400 font-sans font-semibold">{pr.sector}</span></span>
                              <span className="hidden sm:inline">|</span>
                              <span>Tanggal: {pr.date}</span>
                            </div>
                          </div>
                          <span className="bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 text-[10px] font-mono font-bold px-3 py-1 rounded-full whitespace-nowrap shrink-0">
                            {pr.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: HOAX BUSTER */}
            {activeTab === 'hoax_buster' && (
              <div className="space-y-4">
                <div className="border-b border-slate-100 dark:border-white/10 pb-3">
                  <h3 className="font-bold text-sm text-[#002B5B] dark:text-slate-200 uppercase font-mono flex items-center gap-1.5">
                    <ShieldAlert className="h-4 w-4 text-rose-500 animate-pulse" /> Fact-Checking &amp; Klarifikasi Hoax
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Daftarkan klarifikasi resmi dari Humas Pemerintah untuk memitigasi penyebaran disinformasi di publik.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
                  <div className="lg:col-span-4 border border-slate-200 dark:border-white/10 rounded-2xl p-5 bg-slate-50/50 dark:bg-[#001f42]/20 space-y-4">
                    <h4 className="font-bold text-xs text-[#002B5B] dark:text-slate-200 uppercase font-mono flex items-center gap-1.5">
                      <Plus className="h-4 w-4 text-rose-500" /> Daftarkan Klarifikasi Baru
                    </h4>
                    <form onSubmit={handleCreateHoax} className="space-y-3">
                      <div className="space-y-1 text-left">
                        <label className="font-bold text-slate-700 dark:text-slate-300">Klaim Hoax / Rumor Beredar</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Hoax: Jembatan Pasupati ditutup total" 
                          value={hxClaim}
                          onChange={(e) => setHxClaim(e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2.5 focus:outline-none focus:border-rose-500 text-slate-900 dark:text-white transition animate-none"
                          required
                        />
                      </div>

                      <div className="space-y-1 text-left">
                        <label className="font-bold text-slate-700 dark:text-slate-300">Tingkat Penilaian Isu</label>
                        <select 
                          value={hxRating} 
                          onChange={(e) => setHxRating(e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2.5 focus:outline-none focus:border-rose-500 text-rose-700 dark:text-rose-400 transition font-bold"
                        >
                          <option value="HOAX TOTAL">HOAX TOTAL</option>
                          <option value="DISINFORMASI">DISINFORMASI</option>
                          <option value="SALAH PAHAM">SALAH PAHAM</option>
                        </select>
                      </div>

                      <div className="space-y-1 text-left">
                        <label className="font-bold text-slate-700 dark:text-slate-300">Isi Klarifikasi Humas Resmi</label>
                        <textarea 
                          placeholder="Tulis fakta dan bukti klarifikasi humas resmi..." 
                          value={hxClarify}
                          onChange={(e) => setHxClarify(e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2.5 focus:outline-none focus:border-rose-500 text-slate-900 dark:text-white transition h-24 resize-none leading-relaxed animate-none"
                          required
                        />
                      </div>

                      <button 
                        type="submit"
                        className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition shadow-xs text-center text-xs"
                      >
                        Terbitkan Fakta &rarr;
                      </button>
                    </form>
                  </div>

                  <div className="lg:col-span-8 space-y-3">
                    <h4 className="font-bold text-xs text-[#002B5B] dark:text-slate-200 uppercase font-mono flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Dashboard Isu &amp; Klarifikasi Aktif
                    </h4>
                    <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                      {hoaxes.map(hx => {
                        const isHoax = hx.rating === 'HOAX TOTAL';
                        const isDisinfo = hx.rating === 'DISINFORMASI';
                        return (
                          <div 
                            key={hx.id} 
                            className={`p-4 border rounded-2xl text-left space-y-2 transition ${
                              isHoax 
                                ? 'bg-rose-50/30 dark:bg-rose-950/20 border-rose-100 dark:border-rose-500/20 hover:border-rose-200 dark:hover:border-rose-500/30' 
                                : isDisinfo 
                                ? 'bg-amber-50/20 dark:bg-amber-950/10 border-amber-100 dark:border-amber-500/20 hover:border-amber-200 dark:hover:border-amber-500/30' 
                                : 'bg-sky-50/20 dark:bg-sky-950/10 border-sky-100 dark:border-sky-500/20 hover:border-sky-200 dark:hover:border-sky-500/30'
                            }`}
                          >
                            <div className="flex justify-between items-start gap-3">
                              <span className="font-bold text-slate-900 dark:text-slate-200 text-sm leading-tight">{hx.claim}</span>
                              <span className={`text-[9px] font-mono font-black px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 ${
                                isHoax ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30' :
                                isDisinfo ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30' :
                                'bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-400 border border-sky-200 dark:border-sky-500/30'
                              }`}>
                                {hx.rating}
                              </span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed bg-white/70 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-white/5">
                              <strong className="text-slate-800 dark:text-white">Klarifikasi Resmi:</strong> {hx.clarification}
                            </p>
                            <div className="flex items-center justify-between pt-1">
                              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono flex items-center gap-1">
                                <Users className="h-3 w-3" /> Dipublikasikan Oleh: <span className="font-bold text-slate-500 dark:text-slate-400">{hx.updatedBy}</span>
                              </span>
                              <span className="text-[9px] bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded font-mono uppercase font-bold">Verified</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: POLICY PREDICTOR */}
            {activeTab === 'policy_check' && (
              <div className="space-y-4">
                <div className="border-b border-slate-100 dark:border-white/10 pb-3">
                  <h3 className="font-bold text-sm text-[#002B5B] dark:text-slate-200 uppercase font-mono flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-indigo-500 font-semibold" /> Analisis Dampak Kebijakan Daerah
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Ketik draft regulasi/kebijakan baru untuk mengevaluasi potensi resistensi warga serta sentimen negatif media.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
                  <div className="lg:col-span-5 border border-slate-200 dark:border-white/10 rounded-2xl p-5 bg-slate-50/50 dark:bg-[#001f42]/20 space-y-4">
                    <h4 className="font-bold text-xs text-[#002B5B] dark:text-slate-200 uppercase font-mono">Draf Regulasi Daerah</h4>
                    <div className="space-y-3">
                      <textarea 
                        value={complianceText}
                        onChange={(e) => setComplianceText(e.target.value)}
                        placeholder="Contoh draf kebijakan: 'Penerapan Electronic Road Pricing (ERP) / Jalan Berbayar Elektronik di sepanjang Jalan Asia Afrika Bandung mulai Agustus 2026...'"
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 resize-none h-32 leading-relaxed animate-none"
                      />

                      <button 
                        onClick={handleAnalyzeCompliance}
                        disabled={isAnalyzing || !complianceText.trim()}
                        className="w-full py-3 bg-[#002B5B] hover:bg-[#001f42] dark:bg-sky-600 dark:hover:bg-sky-700 text-[#FFD700] dark:text-white font-mono font-bold rounded-xl transition disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 text-xs shadow-xs text-center flex items-center justify-center gap-2"
                      >
                        {isAnalyzing ? (
                          <>
                            <div className="h-4 w-4 border-2 border-slate-400 dark:border-slate-600 border-t-indigo-500 dark:border-t-white rounded-full animate-spin" />
                            <span>MENGANALISIS KORELASI MEDIA...</span>
                          </>
                        ) : (
                          'SIMULASIKAN RESISTENSI OPINI'
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <AnimatePresence mode="wait">
                      {complianceResult ? (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="border border-slate-200 dark:border-white/10 rounded-2xl p-5 bg-gradient-to-br from-white to-indigo-50/10 dark:from-[#001f42]/40 dark:to-[#001f42]/10 space-y-4 text-left"
                        >
                          <div className="flex justify-between items-center border-b border-slate-100 dark:border-white/10 pb-3">
                            <span className="font-bold text-[#002B5B] dark:text-white font-mono uppercase tracking-wider">Hasil Analisis Sentimen Prediktif</span>
                            <span className="bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20 font-mono font-extrabold px-3 py-1 rounded-full text-[10px]">
                              {complianceResult.risk_tier}
                            </span>
                          </div>

                          <div className="space-y-2">
                            <span className="font-bold text-slate-700 dark:text-slate-300 block">Titik Gesekan (Friction Points):</span>
                            <ul className="space-y-2 text-slate-600 dark:text-slate-400 pl-1">
                              {complianceResult.friction_points.map((p: string, i: number) => (
                                <li key={i} className="flex gap-2 items-start">
                                  <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                                  <span>{p}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/10">
                            <span className="font-bold text-[#002B5B] dark:text-slate-200 block">Rekomendasi Humas &amp; Mitigasi Opini:</span>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-white/5 font-medium">
                              {complianceResult.recommendation}
                            </p>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="border border-dashed border-slate-200 dark:border-white/10 rounded-2xl p-10 bg-slate-50 dark:bg-[#001f42]/20 flex flex-col items-center justify-center text-center h-full min-h-[240px]">
                          <Sparkles className="h-10 w-10 text-slate-300 dark:text-slate-600 mb-3 animate-pulse" />
                          <p className="text-slate-400 dark:text-slate-500 text-xs">Masukkan rancangan kebijakan daerah di sebelah kiri, lalu tekan tombol simulasi untuk memprediksi sentimen publik.</p>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: GEOSPATIAL */}
            {activeTab === 'geospatial' && (
              <div className="space-y-4">
                <div className="border-b border-slate-100 dark:border-white/10 pb-3">
                  <h3 className="font-bold text-sm text-[#002B5B] dark:text-slate-200 uppercase font-mono flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-[#002B5B] dark:text-slate-200" /> Pemetaan Sentimen Wilayah Jabar
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Pantau tingkat penerimaan masyarakat dan kepuasan pelayanan publik per wilayah administratif secara spasial.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { city: 'Kota Bandung (Ring 1)', score: 85, level: 'Tinggi', color: 'from-emerald-500 to-teal-500', text: 'Respon positif terhadap revitalisasi ruang terbuka publik & digitalisasi kelurahan.' },
                    { city: 'Kabupaten Sumedang', score: 90, level: 'Sangat Tinggi', color: 'from-emerald-600 to-emerald-400', text: 'Kepuasan maksimal warga terhadap sistem mitigasi banjir & transparansi bendungan.' },
                    { city: 'Kota Depok', score: 72, level: 'Netral', color: 'from-amber-500 to-yellow-500', text: 'Keluhan tipis mengenai kemacetan jalur raya utama, namun rilis pembangunan jalan dinilai netral.' }
                  ].map((item, index) => (
                    <div key={index} className="p-4 border border-slate-200 dark:border-white/10 rounded-2xl bg-slate-50/40 dark:bg-[#001f42]/20 hover:bg-white dark:hover:bg-[#001f42]/40 transition duration-200 space-y-3 flex flex-col justify-between">
                      <div className="space-y-1.5 text-left">
                        <div className="flex justify-between items-center">
                          <span className="font-extrabold text-[#002B5B] dark:text-sky-400 text-xs font-mono">{item.city}</span>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded font-mono ${
                            item.score >= 90 ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400' :
                            item.score >= 80 ? 'bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-400' :
                            'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400'
                          }`}>{item.level}</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">{item.text}</p>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300">
                          <span>Akurasi Pelayanan</span>
                          <span>{item.score}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${item.score}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className={`h-full bg-gradient-to-r ${item.color}`}
                          />
                        </div>
                      </div>
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

