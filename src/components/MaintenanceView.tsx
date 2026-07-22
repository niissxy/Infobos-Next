import React from 'react';
import { Hammer } from 'lucide-react';

interface MaintenanceViewProps {
  featureName?: string;
  onBackToHome?: () => void;
}

export const MaintenanceView: React.FC<MaintenanceViewProps> = ({ 
  featureName = "Layanan ini", 
  onBackToHome 
}) => {
  // Format feature name to look friendly
  const formattedName = featureName
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center space-y-6 max-w-lg mx-auto font-sans">
      <div className="relative">
        <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full animate-pulse"></div>
        <div className="relative inline-flex items-center justify-center p-6 bg-amber-500/10 text-amber-600 rounded-2xl border border-amber-500/20">
          <Hammer className="h-12 w-12 stroke-[2] animate-bounce" />
        </div>
      </div>
      
      <div className="space-y-2">
        <h2 className="font-display font-black text-2xl text-[#002B5B] tracking-tight uppercase">
          Sedang Dalam Pemeliharaan
        </h2>
        <p className="text-slate-400 text-xs font-mono uppercase tracking-wider">
          Fitur: {formattedName}
        </p>
      </div>

      <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
        Mohon maaf atas ketidaknyamanannya. Modul ini sedang ditingkatkan oleh tim pengembang kami untuk performa dan keamanan yang lebih baik. Silakan kembali lagi nanti.
      </p>

      {onBackToHome && (
        <button
          onClick={onBackToHome}
          className="px-5 py-2.5 bg-[#002B5B] hover:bg-[#003f82] text-white text-xs font-bold rounded-xl shadow-lg shadow-slate-200 transition cursor-pointer"
        >
          Kembali ke Beranda
        </button>
      )}
    </div>
  );
};
export default MaintenanceView;
