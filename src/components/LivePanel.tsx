import React, { useState, useEffect } from 'react';
import { Clock, CloudSun, Wind, AlertTriangle, TrendingUp, Compass } from 'lucide-react';

export default function LivePanel() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format Indonesian local Date string
  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return time.toLocaleDateString('id-ID', options);
  };

  return (
    <div className="bg-[#002B5B] text-white rounded-xl border border-white/10 p-5 shadow-sm space-y-4 font-sans">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <h4 className="font-display font-black text-xs tracking-wider text-[#FFD700] uppercase">INFOBOS LIVE</h4>
        </div>
        <div className="text-[10px] bg-[#001f42] text-slate-300 font-mono px-2 py-0.5 rounded border border-white/10">
          WIB (UTC+7)
        </div>
      </div>

      {/* Grid Indicators */}
      <div className="grid grid-cols-2 gap-3">
        
        {/* Dynamic Clock Widget */}
        <div className="bg-[#001f42] border border-white/10 rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] text-slate-300 font-bold tracking-wide uppercase">Waktu Lokal</span>
            <Clock className="h-3.5 w-3.5 text-[#FFD700]" />
          </div>
          <div>
            <div className="text-lg font-mono font-bold tracking-tight text-white">
              {time.toLocaleTimeString('id-ID', { hour12: false })}
            </div>
            <div className="text-[9px] text-slate-400 truncate mt-0.5 font-medium">{formatDate()}</div>
          </div>
        </div>

        {/* Currency Ticker Widget */}
        <div className="bg-[#001f42] border border-white/10 rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] text-slate-300 font-bold tracking-wide uppercase">USD/IDR</span>
            <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
          </div>
          <div>
            <div className="text-base font-mono font-bold tracking-tight text-[#FFD700]">
              Rp 15.742,50
            </div>
            <div className="text-[9px] text-emerald-400 font-semibold flex items-center gap-0.5 mt-0.5">
              <span>+0.12%</span>
              <span className="text-[8px] text-slate-400 font-normal">hari ini</span>
            </div>
          </div>
        </div>

        {/* Localized Weather (Bandung Region) */}
        <div className="bg-[#001f42] border border-white/10 rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="text-left">
              <span className="text-[9px] text-slate-300 font-bold tracking-wide uppercase block">Bandung</span>
              <span className="text-[8px] text-slate-500 font-medium font-mono">Weather Station</span>
            </div>
            <CloudSun className="h-4.5 w-4.5 text-amber-400" />
          </div>
          <div>
            <div className="text-lg font-mono font-bold tracking-tight text-white">
              26°C
            </div>
            <div className="text-[9px] text-slate-400 truncate mt-0.5 font-medium">Hujan Gerimis Ringan</div>
          </div>
        </div>

        {/* Air Quality Index (AQI) */}
        <div className="bg-[#001f42] border border-white/10 rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="text-left">
              <span className="text-[9px] text-slate-300 font-bold tracking-wide uppercase block">AQI DKI</span>
              <span className="text-[8px] text-slate-500 font-medium font-mono">Baku Mutu Udara</span>
            </div>
            <Wind className="h-4.5 w-4.5 text-rose-400" />
          </div>
          <div>
            <div className="text-lg font-mono font-bold tracking-tight text-rose-400">
              112
            </div>
            <div className="text-[9px] text-rose-400 font-semibold truncate mt-0.5">Tidak Sehat</div>
          </div>
        </div>

      </div>

      {/* active municipal alert banner */}
      <div className="bg-rose-950/40 border border-rose-900/30 rounded-xl p-3 flex items-start gap-3 text-left">
        <AlertTriangle className="h-4.5 w-4.5 text-rose-400 shrink-0 mt-0.5" />
        <div>
          <h5 className="text-[11px] font-bold text-rose-300">Peringatan Cuaca Ekstrem Jabar</h5>
          <p className="text-[10px] text-rose-400/95 leading-relaxed mt-1">
            Waspada potensi hujan deras disertai petir dan angin kencang lokal di kawasan Bandung Raya sore hingga menjelang malam.
          </p>
        </div>
      </div>

    </div>
  );
}
