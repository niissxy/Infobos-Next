import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BannerAd {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  ctaText: string;
  sponsorName: string;
}

const SPONSOR_ADS: BannerAd[] = [
  {
    id: 'ad-bjb',
    imageUrl: 'https://images.unsplash.com/photo-1601597111158-2fceff270190?w=1200&auto=format&fit=crop&q=80',
    title: 'bjb Tandamata Utama Jabar',
    subtitle: 'Solusi perbankan masa kini untuk mendorong akselerasi ekonomi digital dan kesejahteraan UMKM di seluruh Jawa Barat.',
    ctaText: 'Buka Rekening bjb',
    sponsorName: 'Bank bjb Jabar Banten'
  },
  {
    id: 'ad-whoosh',
    imageUrl: 'https://images.unsplash.com/photo-1541417904950-b855846fe074?w=1200&auto=format&fit=crop&q=80',
    title: 'KCIC Whoosh: Bandung-Jakarta 45 Menit',
    subtitle: 'Nikmati perjalanan super cepat, nyaman, dan ramah lingkungan menuju ibu kota dengan frekuensi jadwal keberangkatan setiap jam.',
    ctaText: 'Pesan Tiket Sekarang',
    sponsorName: 'PT KCIC Whoosh Indonesia'
  },
  {
    id: 'ad-biofarma',
    imageUrl: 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?w=1200&auto=format&fit=crop&q=80',
    title: 'Bio Farma: Proteksi Kesehatan Negeri',
    subtitle: 'Berdedikasi memproduksi vaksin dan produk biosains berkualitas internasional untuk melindungi ketahanan medis bangsa Indonesia.',
    ctaText: 'Lihat Layanan Medis',
    sponsorName: 'Bio Farma Persero'
  },
  {
    id: 'ad-gedungsate',
    imageUrl: 'https://images.unsplash.com/photo-1596422846543-75c6fc18a523?w=1200&auto=format&fit=crop&q=80',
    title: 'Festival Kuliner Jabar Juara 2026',
    subtitle: 'Hadir kembali di pelataran Gedung Sate dengan 200+ stan kuliner tradisional khas Priangan dan panggung seni budaya asri.',
    ctaText: 'Registrasi Pengunjung Gratis',
    sponsorName: 'Dinas Pariwisata Jabar'
  }
];

export default function BannerAdSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SPONSOR_ADS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SPONSOR_ADS.length) % SPONSOR_ADS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SPONSOR_ADS.length);
  };

  const ad = SPONSOR_ADS[currentIndex];

  return (
    <div id={`banner-ad-slider-${ad.id}`} className="col-span-1 md:col-span-3 w-full my-4">
      {/* Visual Elegant Divider with Label */}
      <div className="flex items-center gap-3 my-6">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-grow" />
        <span className="text-[10px] font-mono font-black text-slate-400 tracking-widest uppercase flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-amber-500 animate-pulse" /> SPONSOR AD & CAMPAIGN PLACEMENT
        </span>
        <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-grow" />
      </div>

      {/* Main Slider Container */}
      <div className="relative w-full aspect-[21/9] md:aspect-[32/10] bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/85 shadow-sm group">
        
        {/* Carousel Slide Images */}
        <div className="absolute inset-0">
          <img
            src={ad.imageUrl}
            alt={ad.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-85 transition-transform duration-700 hover:scale-101"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&q=80&w=1200";
            }}
          />
          {/* Overlay Gradient for contrast and legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-transparent md:from-slate-950/95 md:via-slate-950/60" />
        </div>

        {/* Carousel Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 md:p-8 text-left z-10 pointer-events-none">
          {/* Top Info Tag */}
          <div className="flex items-center justify-between pointer-events-auto">
            <span className="text-[8px] md:text-[9px] bg-[#FFD700] text-[#002B5B] font-mono font-extrabold px-2 py-0.5 rounded shadow-xs uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="h-2.5 w-2.5" />
              Sponsor Utama Jabar
            </span>
            <span className="text-[8px] md:text-[9px] text-slate-300/90 font-mono font-semibold">
              Kemitraan Resmi: {ad.sponsorName}
            </span>
          </div>

          {/* Middle/Bottom Main Info */}
          <div className="space-y-1 md:space-y-2 max-w-[80%] md:max-w-[65%]">
            <h3 className="text-sm sm:text-base md:text-xl font-display font-black text-white tracking-tight drop-shadow-md">
              {ad.title}
            </h3>
            <p className="hidden sm:block text-[10px] md:text-xs text-slate-200 leading-relaxed drop-shadow-sm font-medium">
              {ad.subtitle}
            </p>
            <div className="pt-1 pointer-events-auto">
              <button
                className="inline-flex items-center gap-1 text-[9px] md:text-[10px] font-mono font-extrabold uppercase bg-teal-600 hover:bg-teal-500 text-white px-3 py-1.5 rounded-lg shadow-sm hover:scale-102 transition cursor-pointer"
                onClick={() => alert(`Membuka tautan kampanye sponsor: ${ad.sponsorName}`)}
              >
                <span>{ad.ctaText}</span>
                <ExternalLink className="h-2.5 w-2.5" />
              </button>
            </div>
          </div>

          {/* Navigation Dot Indicators */}
          <div className="flex justify-center gap-1 pointer-events-auto">
            {SPONSOR_ADS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx ? 'w-4 bg-[#FFD700]' : 'w-1.5 bg-white/40 hover:bg-white/60'
                }`}
                title={`Buka Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Navigation Arrow Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 p-1.5 bg-slate-950/50 hover:bg-slate-950/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 cursor-pointer border border-white/5"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 bg-slate-950/50 hover:bg-slate-950/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 cursor-pointer border border-white/5"
          aria-label="Next Slide"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
