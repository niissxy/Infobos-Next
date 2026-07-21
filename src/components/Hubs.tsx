import React, { useState, useEffect } from 'react';
import { MapPin, Globe, User, Building, Compass, AlertCircle, ArrowLeft, Thermometer, Wind, Link2, Calendar, Volume2 } from 'lucide-react';

interface HubsProps {
  slug: string;
  type: 'location' | 'entity';
  onBack: () => void;
  onSelectArticle: (slug: string) => void;
  onSelectLocation: (slug: string) => void;
  onSelectEntity: (slug: string) => void;
}

export default function Hubs({
  slug,
  type,
  onBack,
  onSelectArticle,
  onSelectLocation,
  onSelectEntity
}: HubsProps) {
  const [info, setInfo] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchHubData = async () => {
      try {
        // Fetch central profiles
        const infoRes = await fetch(`/api/v1/${type}s/${slug}/info`);
        const infoData = await infoRes.json();
        
        // Fetch related contents
        const queryParam = type === 'location' ? `location=${slug}` : `entity=${slug}`;
        const contentRes = await fetch(`/api/v1/contents?${queryParam}`);
        const contentData = await contentRes.json();

        setInfo(infoData[type] || null);
        setRelatedArticles(contentData.contents || []);
        setLoading(false);
      } catch (err) {
        console.error("Gagal memuat hub data:", err);
        setLoading(false);
      }
    };
    fetchHubData();
  }, [slug, type]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-3">
        <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-sm text-slate-500 font-medium font-mono">Merajut simpul graf jurnalisme...</p>
      </div>
    );
  }

  if (!info) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-slate-500 text-left">
        <Compass className="h-12 w-12 text-slate-400 mx-auto mb-4" />
        <p className="font-semibold text-lg">Halaman Hub &quot;{slug}&quot; tidak ditemukan.</p>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-[#002B5B] text-white rounded-lg text-sm font-semibold hover:bg-[#001f42]">
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 font-sans text-left space-y-8">
      
      {/* Back navigations */}
      <div>
        <button 
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-950 transition bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Beranda
        </button>
      </div>

      {/* ==========================================
          GEOGRAPHY PROVINCE/CITY VIEW
          ========================================== */}
      {type === 'location' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#2B7A78]/10 rounded-xl text-[#2B7A78]">
                <MapPin className="h-8 w-8" />
              </div>
              <div>
                <span className="text-[10px] bg-[#2B7A78]/10 text-[#2B7A78] font-bold px-2 py-0.5 rounded font-mono uppercase tracking-wide border border-[#2B7A78]/25">
                  Kanal Geografis • {info.type}
                </span>
                <h1 className="font-display font-black text-2xl md:text-3xl text-[#002B5B] mt-1">
                  Hub Informasi: {info.name}
                </h1>
              </div>
            </div>

            <div className="text-xs text-slate-500 font-mono">
              Koordinat: {info.latitude}° N, {info.longitude}° E
            </div>
          </div>

          {/* Location Weather / Air Quality Indicators */}
          {info.type === 'city' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 shadow-sm">
                <div className="p-2 bg-amber-50 rounded-xl text-amber-500">
                  <Thermometer className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Suhu Udara</div>
                  <div className="text-lg font-mono font-bold text-slate-900">{info.weatherTemp || 28}°C</div>
                  <div className="text-[10px] text-slate-500 font-semibold">{info.weatherCondition || 'Cerah'}</div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 shadow-sm">
                <div className="p-2 bg-rose-50 rounded-xl text-rose-500">
                  <Wind className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Kualitas Udara</div>
                  <div className={`text-lg font-mono font-bold ${info.aqi && info.aqi > 100 ? 'text-rose-500' : 'text-emerald-500'}`}>{info.aqi || 45}</div>
                  <div className="text-[10px] text-slate-500 font-semibold">{info.aqi && info.aqi > 100 ? 'Tidak Sehat' : 'Baik'}</div>
                </div>
              </div>

              {info.alertLevel && info.alertLevel !== 'none' && (
                <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 flex items-start gap-2.5">
                  <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] text-rose-600 font-bold uppercase">Sinyal Peringatan</div>
                    <div className="text-xs font-bold text-rose-900 mt-0.5 leading-tight">{info.alertTitle}</div>
                    <p className="text-[9px] text-rose-600/80 leading-normal mt-1">Gubernur menginstruksikan mitigasi tanggap darurat.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ==========================================
          ENTITY PROFILE VIEW
          ========================================== */}
      {type === 'entity' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start">
            {info.logoUrl ? (
              <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-slate-100 bg-slate-50">
                <img src={info.logoUrl} alt={info.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-xl bg-[#002B5B]/10 text-[#002B5B] border border-[#002B5B]/20 flex items-center justify-center shrink-0">
                {info.type === 'person' ? <User className="h-10 w-10" /> : <Building className="h-10 w-10" />}
              </div>
            )}

            <div className="flex-1 space-y-3">
              <div>
                <span className="text-[9px] bg-[#002B5B]/10 text-[#002B5B] border border-[#002B5B]/20 font-bold px-2 py-0.5 rounded font-mono uppercase tracking-wide">
                  Intelijen Entitas • {info.type}
                </span>
                <h1 className="font-display font-black text-2xl md:text-3xl text-[#002B5B] mt-1 flex items-center gap-2">
                  {info.name}
                  {info.isClaimed && (
                    <span className="text-[9px] bg-[#FFD700] text-[#002B5B] font-extrabold px-1.5 py-0.5 rounded uppercase font-sans tracking-wider shrink-0">
                      Claimed & Verified
                    </span>
                  )}
                </h1>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">{info.description}</p>

              {info.websiteUrl && (
                <a 
                  href={info.websiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#002B5B] hover:text-[#2B7A78] transition"
                >
                  <Link2 className="h-3.5 w-3.5" />
                  Situs Resmi Entitas &rarr;
                </a>
              )}

              {/* Joined Entity Specific Metadata fields */}
              {info.metadata && (
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
                  {Object.entries(info.metadata).map(([key, val]: any) => (
                    <div key={key}>
                      <span className="text-slate-400 capitalize font-medium">{key.replace(/([A-Z])/g, ' $1')}:</span>
                      <span className="text-slate-800 font-bold ml-1">{val}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          CHRONOLOGICAL ARTICLES / TIMELINE GRID
          ========================================== */}
      <div className="space-y-4">
        <h3 className="font-display font-black text-lg text-[#002B5B] uppercase tracking-widest flex items-center gap-2 border-b border-slate-200 pb-2.5">
          <span>Timeline Intelijen: Kronologi Laporan</span>
          <span className="text-xs bg-slate-100 text-slate-500 font-mono font-bold px-2 py-0.5 rounded-full border border-slate-200">
            {relatedArticles.length} Node
          </span>
        </h3>

        {relatedArticles.length === 0 ? (
          <div className="py-12 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
            <p className="text-slate-400 text-xs font-semibold">Belum ada timeline laporan terbit yang menautkan simpul ini.</p>
          </div>
        ) : (
          <div className="space-y-6 relative before:absolute before:left-3.5 sm:before:left-5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {relatedArticles.map((art, idx) => {
              const dt = art.publishedAt ? new Date(art.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Pending';
              return (
                <div key={art.id} className="flex gap-4 sm:gap-6 items-start relative pl-8 sm:pl-12 group">
                  
                  {/* Circle Indicator on timeline */}
                  <div className="absolute left-1.5 sm:left-3.5 top-2 w-4 h-4 rounded-full border-2 border-slate-200 bg-white group-hover:border-[#2B7A78] group-hover:bg-[#2B7A78] transition shrink-0 z-10 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full group-hover:bg-white"></div>
                  </div>

                  {/* Body Box */}
                  <div 
                    onClick={() => onSelectArticle(art.slug)}
                    className="flex-1 bg-white border border-slate-200 hover:border-[#2B7A78] hover:shadow-sm p-4 rounded-xl cursor-pointer transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] bg-[#2B7A78] text-white font-bold font-mono px-1.5 py-0.2 rounded uppercase">
                          {art.categoryName}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold font-mono flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {dt}
                        </span>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="font-display font-bold text-sm text-[#002B5B] group-hover:text-[#2B7A78] transition leading-snug flex-1">
                          {art.title}
                        </h4>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            sessionStorage.setItem('autoPlayTts', 'true');
                            onSelectArticle(art.slug);
                          }}
                          className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition cursor-pointer shrink-0"
                          title="Dengarkan Berita Ini"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{art.summary}</p>
                    </div>

                    <div className="shrink-0 text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded border uppercase flex items-center gap-1">
                      <span>Tone:</span>
                      <span className={
                        art.sentiment === 'positive' ? 'text-emerald-500' :
                        art.sentiment === 'negative' ? 'text-rose-500' : 'text-slate-400'
                      }>
                        {art.sentiment}
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
