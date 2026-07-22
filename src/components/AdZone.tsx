import React, { useState, useEffect } from 'react';
import { ShieldCheck, Mail, Sparkles, Award, Play, Download, ExternalLink, X, Smartphone, Monitor, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

interface AdZoneProps {
  zone: string; // e.g. 'top_leaderboard', 'sidebar_sticky', 'after_paragraph_2', 'pre_roll', 'city_sponsor', etc.
  pageContext?: {
    category?: string;
    location?: string;
    entity?: string;
    topic?: string;
  };
}

interface AdItem {
  type: 'creative' | 'house';
  data: any;
}

export default function AdZone({ zone, pageContext }: AdZoneProps) {
  const [ads, setAds] = useState<AdItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [closed, setClosed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Generate beautiful, professional House Ads fallback matching the required placement
  const getHouseAdsList = () => {
    return [
      {
        id: 'house-premium',
        title: 'Berlangganan INFOBOS Premium',
        subtitle: 'Akses penuh ke modul analisis intelijen EVOLIS tanpa batas.',
        cta: 'Mulai Uji Coba Gratis',
        link: '#',
        badge: 'Sponsor Internal',
        icon: Award,
        color: 'from-amber-500 to-amber-700',
        textColor: 'text-white'
      },
      {
        id: 'house-newsletter',
        title: 'INFOBOS Daily Briefing',
        subtitle: 'Analisis makro, geopolitik, dan data korporasi langsung ke inbox Anda.',
        cta: 'Berlangganan Buletin',
        link: '#newsletter',
        badge: 'Newsletter',
        icon: Mail,
        color: 'from-indigo-600 to-indigo-800',
        textColor: 'text-white'
      },
      {
        id: 'house-app',
        title: 'Unduh Aplikasi Mobile INFOBOS',
        subtitle: 'Notifikasi instan breaking news dan radar deteksi isu provinsi.',
        cta: 'Download di App Store',
        link: '#app',
        badge: 'Mobile App',
        icon: Download,
        color: 'from-emerald-600 to-teal-800',
        textColor: 'text-white'
      },
      {
        id: 'house-research',
        title: 'Laporan Riset Geopolitik 2026',
        subtitle: 'Kajian mendalam dampak ekonomi digital dan regulasi investasi Jawa Barat.',
        cta: 'Baca Publikasi Riset',
        link: '/',
        badge: 'Riset Eksklusif',
        icon: BookOpen,
        color: 'from-slate-800 to-slate-950',
        textColor: 'text-white'
      },
      {
        id: 'house-job',
        title: 'Karir di INFOBOS Newsroom',
        subtitle: 'Kami mencari Jurnalis Investigasi dan Analis Data Senior. Gabung hari ini.',
        cta: 'Lihat Lowongan Kerja',
        link: '#careers',
        badge: 'Job Vacancy',
        icon: ShieldCheck,
        color: 'from-blue-600 to-indigo-900',
        textColor: 'text-white'
      }
    ];
  };

  useEffect(() => {
    // 1. Fetch active client campaigns if available
    let url = `/api/v1/ads/placement?placement=${encodeURIComponent(zone)}`;
    if (pageContext?.category) url += `&category=${encodeURIComponent(pageContext.category)}`;
    if (pageContext?.location) url += `&location=${encodeURIComponent(pageContext.location)}`;

    const houseList = getHouseAdsList();
    const useSlider = zone === 'top_leaderboard';

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const list: AdItem[] = [];
        if (data.creative) {
          list.push({ type: 'creative', data: data.creative });
          // Track real-time impression
          fetch('/api/v1/ads/impression', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ creativeId: data.creative.id })
          }).catch(e => console.error("Error tracking ad impression", e));
        }
        
        if (useSlider) {
          // Add all house ads so we have a fully slider-capable pool
          houseList.forEach(houseAd => {
            list.push({ type: 'house', data: houseAd });
          });
        } else {
          // If not a slider, only add one fallback house ad if no creative was found
          if (list.length === 0) {
            list.push({ type: 'house', data: houseList[0] });
          }
        }
        
        setAds(list);
        setCurrentIndex(0);
      })
      .catch(() => {
        // Fallback directly to house ads list on error
        const list: AdItem[] = useSlider
          ? houseList.map(houseAd => ({ type: 'house', data: houseAd }))
          : [{ type: 'house', data: houseList[0] }];
        setAds(list);
        setCurrentIndex(0);
      });
  }, [zone, pageContext]);

  // Auto-play interval: rotate ads every 5 seconds, unless paused on hover
  useEffect(() => {
    if (ads.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [ads, isHovered]);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + ads.length) % ads.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % ads.length);
  };

  const handleAdClick = (creativeId: string) => {
    fetch('/api/v1/ads/click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ creativeId })
    }).catch(e => console.error("Error tracking ad click", e));
  };

  if (closed || ads.length === 0) return null;

  const currentAd = ads[currentIndex];

  // Determine standard ad sizing classes for layouts
  const isLeaderboard = ['top_leaderboard', 'footer_billboard', 'header_banner', 'bottom_banner', 'section_separator_banner'].includes(zone);
  const isSidebar = ['sidebar', 'sticky_sidebar', 'sidebar_sticky', 'skyscraper'].includes(zone);
  const isFloating = ['floating_left', 'floating_right', 'floating_cta', 'sticky_bottom_banner'].includes(zone);
  const isVideoAd = ['pre_roll', 'mid_roll', 'post_roll', 'overlay', 'video_banner'].includes(zone);
  const isInline = ['after_paragraph_2', 'companion_banner', 'video_recommendation_sponsor'].includes(zone);

  // Label style according to advertising regulations
  const adLabel = (
    <div className="flex items-center gap-1.5 text-[8px] sm:text-[9px] font-mono font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase select-none pb-1">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
      <span className="hidden xs:inline">Sponsor: {zone.replace(/_/g, ' ')}</span>
      <span className="inline xs:hidden">Ad: {zone.replace(/_/g, ' ').replace('top ', '')}</span>
    </div>
  );

  // Handle Close for Floating Ads
  const closeButton = isFloating ? (
    <button
      onClick={() => setClosed(true)}
      className="absolute top-1 right-1 p-1 rounded-full bg-slate-900/10 hover:bg-slate-900/20 text-slate-500 hover:text-slate-800 transition z-10"
      title="Tutup Iklan"
    >
      <X className="h-3 w-3" />
    </button>
  ) : null;

  // Render navigation buttons if there are multiple ads in the deck
  const prevButton = ads.length > 1 ? (
    <button
      onClick={handlePrev}
      className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-950 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-100 dark:border-white/10 transition opacity-0 group-hover:opacity-100 duration-200 z-10 shadow-sm"
      title="Sebelumnya"
    >
      <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
    </button>
  ) : null;

  const nextButton = ads.length > 1 ? (
    <button
      onClick={handleNext}
      className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-950 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-100 dark:border-white/10 transition opacity-0 group-hover:opacity-100 duration-200 z-10 shadow-sm"
      title="Berikutnya"
    >
      <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
    </button>
  ) : null;

  const badgeText = currentAd.type === 'creative' 
    ? (isLeaderboard || isInline ? 'Secured' : 'Safe Ad Hub Secured') 
    : currentAd.data.badge;

  return (
    <div 
      id={`ad-${zone}`}
      className={`relative group overflow-hidden text-left border border-slate-200 dark:border-white/10 bg-gradient-to-br from-white to-slate-50 dark:from-[#001733]/40 dark:to-[#001f42]/40 shadow-xs hover:shadow-sm transition duration-300 ${
        isLeaderboard 
          ? 'max-w-7xl mx-auto w-full rounded-lg px-3 py-2.5 sm:p-3 my-2' 
          : isInline
            ? 'max-w-sm mx-auto w-full rounded-xl p-2.5 my-2.5'
            : 'max-w-3xl rounded-2xl p-4 my-4'
      } ${isSidebar ? 'w-full' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style>{`
        @keyframes adSlideFadeIn {
          from { opacity: 0.3; transform: scale(0.995); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-ad-slide-fade {
          animation: adSlideFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {closeButton}
      {prevButton}
      {nextButton}

      <div className="flex flex-col gap-1.5 h-full">
        <div className={`flex justify-between items-center border-b border-slate-100 dark:border-white/10 ${isLeaderboard || isInline ? 'pb-1 mb-1.5' : 'pb-2 mb-2.5'}`}>
          {adLabel}
          <div className="flex items-center gap-2">
            {/* Slider Dots indicators */}
            {ads.length > 1 && (
              <div className="flex items-center gap-1.5 mr-1 sm:mr-2">
                {ads.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex 
                        ? 'bg-amber-500 w-3' 
                        : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-500 w-1.5'
                    }`}
                    title={`Slide ke-${idx + 1}`}
                  />
                ))}
              </div>
            )}
            <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[8px] font-mono font-bold px-1.5 py-0.2 rounded uppercase shrink-0">
              {badgeText}
            </span>
          </div>
        </div>

        {/* Outer content container with key for instant re-triggering of micro animations */}
        <div key={currentIndex} className={`animate-ad-slide-fade flex-1 ${isLeaderboard || isInline ? 'px-2' : 'px-4 sm:px-6'}`}>
          {currentAd.type === 'creative' ? (
            <a 
              href={currentAd.data.destinationUrl} 
              target="_blank" 
              referrerPolicy="no-referrer"
              onClick={() => handleAdClick(currentAd.data.id)}
              className={`block overflow-hidden border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-[#001f42]/60 ${isLeaderboard ? 'rounded-md' : 'rounded-xl'}`}
            >
              {isVideoAd ? (
                <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                  <img 
                    src={currentAd.data.imageUrl || "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800"} 
                    alt={currentAd.data.altText} 
                    className="w-full h-full object-cover opacity-80"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-4 text-center">
                    <Play className="h-10 w-10 text-[#FFD700] fill-current animate-bounce mb-2" />
                    <span className="text-xs font-black uppercase tracking-wider">{currentAd.data.altText}</span>
                    <span className="text-[10px] text-slate-300 dark:text-slate-400 mt-1 font-mono">Click to watch promotion</span>
                  </div>
                </div>
              ) : (
                <div className={`relative overflow-hidden ${isLeaderboard ? 'h-14 xs:h-16 sm:h-20 md:h-24' : isInline ? 'h-20 sm:h-24' : ''}`}>
                  <img 
                    src={currentAd.data.imageUrl || "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&q=80&w=800"} 
                    alt={currentAd.data.altText} 
                    className={`w-full ${(isLeaderboard || isInline) ? 'h-full' : ''} object-cover transition duration-500 hover:scale-101`}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&q=80&w=800";
                    }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent text-white flex items-end justify-between ${isLeaderboard || isInline ? 'p-2 sm:p-3' : 'p-3'}`}>
                    <div className="min-w-0 pr-2">
                      <h5 className={`font-bold font-display line-clamp-1 ${isLeaderboard || isInline ? 'text-[9.5px] xs:text-[11px] sm:text-xs' : 'text-xs'}`}>{currentAd.data.altText}</h5>
                      <span className={`text-slate-300 dark:text-slate-400 line-clamp-1 ${isLeaderboard || isInline ? 'text-[7.5px] xs:text-[8.5px] sm:text-[9.5px]' : 'text-[9px]'}`}>{currentAd.data.destinationUrl}</span>
                    </div>
                    <ExternalLink className={`text-[#FFD700] shrink-0 ${isLeaderboard || isInline ? 'h-3 w-3 sm:h-3.5 sm:w-3.5' : 'h-3.5 w-3.5'}`} />
                  </div>
                </div>
              )}
            </a>
          ) : (
            <div className={`flex ${isLeaderboard ? 'flex-row items-center justify-between' : 'flex-col sm:flex-row sm:items-center justify-between'} gap-3 py-1`}>
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className={`rounded-lg bg-gradient-to-br ${currentAd.data.color} ${currentAd.data.textColor} shrink-0 ${isLeaderboard || isInline ? 'p-1.5' : 'p-2.5'}`}>
                  {React.createElement(currentAd.data.icon, { className: isLeaderboard || isInline ? 'h-3.5 w-3.5' : 'h-5 w-5' })}
                </div>
                <div className="space-y-0.5 min-w-0">
                  <h5 className={`font-extrabold text-slate-800 dark:text-slate-100 truncate ${isLeaderboard || isInline ? 'text-[9.5px] xs:text-[11px] sm:text-xs font-sans' : 'text-xs'}`}>{currentAd.data.title}</h5>
                  <p className={`text-slate-500 dark:text-slate-400 leading-normal font-medium truncate ${isLeaderboard || isInline ? 'text-[8.5px] xs:text-[9.5px] sm:text-[11px]' : 'text-[11px]'}`}>{currentAd.data.subtitle}</p>
                </div>
              </div>

              <div className="shrink-0 flex items-center">
                <a
                  href={currentAd.data.link}
                  className={`inline-flex items-center gap-1 shadow-xs bg-slate-900 dark:bg-sky-500/10 text-white dark:text-sky-400 hover:bg-slate-800 dark:hover:bg-sky-500/20 border dark:border-sky-500/20 transition ${
                    isLeaderboard || isInline ? 'px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[7.5px] xs:text-[8px] sm:text-[9px] font-bold' : 'px-3.5 py-2 rounded-xl text-[10px] font-bold tracking-wide'
                  }`}
                >
                  <span className={isLeaderboard ? 'max-w-[80px] xs:max-w-none truncate' : ''}>{currentAd.data.cta}</span>
                  <ExternalLink className="h-2 w-2 sm:h-2.5 sm:w-2.5 shrink-0" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
