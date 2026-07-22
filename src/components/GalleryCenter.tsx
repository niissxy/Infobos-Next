import React, { useState } from 'react';
import { 
  Image, Compass, Layers, Sparkles, MapPin, Grid, Camera, 
  ChevronRight, Calendar, X, Eye, HelpCircle 
} from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'album' | 'infographic' | 'geo' | 'before_after';
  imageUrl: string;
  location?: string;
  date: string;
  author: string;
  description: string;
  dimensions?: string;
  exif?: string;
}

export default function GalleryCenter() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  // Before/After interactive slider position state (percentage 0 to 100)
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isSliding, setIsSliding] = useState<boolean>(false);

  // Track the actual container stage width to prevent image squishing/stretching
  const stageRef = React.useRef<HTMLDivElement>(null);
  const [stageWidth, setStageWidth] = useState<number>(800);

  React.useEffect(() => {
    if (stageRef.current) {
      setStageWidth(stageRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (stageRef.current) {
        setStageWidth(stageRef.current.offsetWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const galleryItems: GalleryItem[] = [
    {
      id: 'g-1',
      title: 'Zonasi Jalur Pedestrian Cagar Budaya & Koridor Gasibu Raya',
      category: 'infographic',
      imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=800',
      date: '18 Juni 2026',
      author: 'Tim Bappeda Jabar & Infobos Visual',
      description: 'Infografis skema pedestrian pintar ramah disabilitas yang mengintegrasikan cagar budaya dengan taman rekreasi warga Kota Bandung.'
    },
    {
      id: 'g-2',
      title: 'Bantaran Aliran Sungai Cikapundung Pasca Konservasi Terpadu',
      category: 'geo',
      imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800',
      location: 'Bandung',
      date: '05 Juni 2026',
      author: 'Hendra Setiadi (Reporter Foto)',
      description: 'Potret udara lanskap bantaran Cikapundung yang kini bersih dari sampah, dilengkapi ruang terbuka hijau ramah anak.',
      dimensions: '4000 x 3000',
      exif: 'DJI Mavic 3 Pro • ISO 100 • f/4 • 1/320s'
    },
    {
      id: 'g-3',
      title: 'Uji Coba Bus Listrik Trans Metro Pasundan Koridor Gedung Sate',
      category: 'album',
      imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800',
      date: '12 Juni 2026',
      author: 'Dewi Anggraeni (Jurnalis Foto)',
      description: 'Armada bus listrik ramah lingkungan berkapasitas 45 penumpang mulai diuji coba secara gratis bagi warga Bandung.'
    },
    {
      id: 'g-4',
      title: 'Fasilitas Lab Robotika Sekolah Tinggi Teknologi Bandung',
      category: 'album',
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
      date: '10 Juni 2026',
      author: 'Rian Firdaus',
      description: 'Siswa didampingi instruktur menguji sensor pergerakan tangan robotik bertenaga kecerdasan buatan terapan.'
    },
    {
      id: 'g-5',
      title: 'Peta Jaringan Internet Fiber Optik Perdesaan Kabupaten Garut',
      category: 'infographic',
      imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800',
      date: '02 Juni 2026',
      author: 'Direktorat Diskominfo Jabar',
      description: 'Pemetaan target perluasan tulang punggung internet pitalebar (broadband) menuju desa mandiri digital tahun 2026.'
    }
  ];

  const filteredItems = galleryItems.filter(item => 
    activeCategory === 'all' || item.category === activeCategory
  );

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const offset = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, Math.round((offset / rect.width) * 100)));
    setSliderPos(pct);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-sans text-left space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Image className="h-6 w-6 text-[#2B7A78]" />
            <h1 className="font-display font-black text-2xl md:text-3xl text-[#002B5B]">VISUAL GALLERY CENTER</h1>
          </div>
          <p className="text-slate-500 text-xs mt-1">Jurnalisme foto beresolusi tinggi, dokumentasi arsip sejarah cagar budaya, serta infografis peta perencanaan daerah.</p>
        </div>

        <div className="flex gap-1.5 overflow-x-auto whitespace-nowrap">
          {[
            { id: 'all', label: 'Semua Karya' },
            { id: 'before_after', label: 'Sebelum / Sesudah (Interaktif)' },
            { id: 'album', label: 'Album Berita' },
            { id: 'infographic', label: 'Infografis' },
            { id: 'geo', label: 'Geo-Gallery' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                activeCategory === cat.id 
                  ? 'bg-[#002B5B] text-[#FFD700] border-[#002B5B] shadow-sm' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ==========================================
          INTERACTIVE BEFORE-AFTER SLIDER WIDGET
          ========================================== */}
      {(activeCategory === 'all' || activeCategory === 'before_after') && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-start justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[9px] bg-amber-500 text-slate-900 font-extrabold px-1.5 py-0.5 rounded font-mono uppercase tracking-wide">
                Karya Sejarah Interaktif
              </span>
              <h3 className="font-display font-black text-base text-[#002B5B] mt-1.5">
                Pembanding Waktu: Gedung Sate Zaman Kolonial (1920) vs Era Smart City (2026)
              </h3>
              <p className="text-slate-500 text-xs mt-0.5">Arahkan kursor mouse atau sentuh layar lalu geser ke kanan-kiri untuk membandingkan fisik cagar budaya.</p>
            </div>
            <HelpCircle className="h-5 w-5 text-slate-300" />
          </div>

          {/* Interactive slider stage box */}
          <div 
            ref={stageRef}
            className="relative h-[300px] md:h-[420px] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-slate-200 shadow-md"
            onMouseMove={(e) => { if (e.buttons === 1 || isSliding) handleSliderMove(e); }}
            onMouseDown={() => setIsSliding(true)}
            onMouseUp={() => setIsSliding(false)}
            onMouseLeave={() => setIsSliding(false)}
            onTouchMove={handleSliderMove}
          >
            {/* Background: Modern Image (2026) */}
            <img 
              src="https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&q=80&w=1200" 
              alt="Gedung Sate Modern 2026"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            <div className="absolute right-4 bottom-4 bg-teal-500/90 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-md shadow-md z-10">
              Era Modern (2026)
            </div>

            {/* Foreground Overlay: Colonial Image (1920, styled sepia/grayscale) */}
            <div 
              className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPos}%` }}
            >
              <div className="absolute inset-y-0 left-0 h-full pointer-events-none" style={{ width: stageWidth || 800 }}>
                <img 
                  src="https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&q=80&w=1200" 
                  alt="Gedung Sate Kolonial 1920"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover filter grayscale sepia brightness-90 saturate-50"
                />
              </div>
              <div className="absolute left-4 bottom-4 bg-amber-800/90 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-md shadow-md z-10 whitespace-nowrap">
                Zaman Kolonial (1920)
              </div>
            </div>

            {/* Slider Handler Line Indicator */}
            <div 
              className="absolute inset-y-0 w-1 bg-white cursor-ew-resize z-20 shadow-xl"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-2 border-[#002B5B] flex items-center justify-center shadow-lg text-[#002B5B] font-black text-xs">
                &harr;
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ==========================================
          MASONRY PHOTO FEED GRID
          ========================================== */}
      {activeCategory !== 'before_after' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div 
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group cursor-pointer bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition duration-300"
            >
              <div className="aspect-[16/11] overflow-hidden bg-slate-100 relative">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-101 transition duration-500" 
                />
                <span className="absolute top-3 left-3 bg-[#002B5B] text-white font-mono text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                  {item.category.replace('_', ' ')}
                </span>
                
                {item.location && (
                  <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white font-mono text-[8px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 border border-white/5">
                    <MapPin className="h-2.5 w-2.5 text-teal-400" />
                    {item.location}
                  </span>
                )}
              </div>

              <div className="p-4 space-y-2 text-left">
                <h4 className="font-display font-bold text-xs sm:text-sm text-[#002B5B] group-hover:text-[#2B7A78] transition line-clamp-1 leading-snug">
                  {item.title}
                </h4>
                <p className="text-slate-500 text-[11px] line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-400 font-mono font-medium">
                  <span>Oleh: {item.author.split(' ')[0]}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ==========================================
          HIGH FIDELITY PHOTO LIGHTBOX MODAL
          ========================================== */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90%] overflow-y-auto flex flex-col md:flex-row text-left shadow-2xl relative">
            <button 
              onClick={() => setSelectedPhoto(null)}
              className="absolute right-4 top-4 text-white md:text-slate-500 hover:text-red-500 text-lg font-bold bg-black/60 md:bg-transparent p-2 rounded-full md:p-0 transition z-10"
            >
              &times;
            </button>

            {/* Media Image half */}
            <div className="md:w-3/5 bg-slate-950 flex items-center justify-center min-h-[300px]">
              <img 
                src={selectedPhoto.imageUrl} 
                alt={selectedPhoto.title}
                referrerPolicy="no-referrer"
                className="max-h-[500px] object-contain w-full"
              />
            </div>

            {/* Meta details half */}
            <div className="md:w-2/5 p-6 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <span className="text-[8px] bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded font-mono uppercase tracking-widest">
                    {selectedPhoto.category.toUpperCase()}
                  </span>
                  <h3 className="font-display font-black text-base text-[#002B5B] mt-2 leading-snug">
                    {selectedPhoto.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedPhoto.description}
                </p>

                {/* Technical camera meta details */}
                {selectedPhoto.exif && (
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-[10px] text-slate-500 font-mono space-y-1">
                    <div className="flex justify-between font-bold border-b border-slate-100 pb-1 mb-1 text-slate-400 uppercase">
                      <span>Camera Technical EXIF Log</span>
                      <Camera className="h-3 w-3" />
                    </div>
                    <div>Dimensi: <span className="font-semibold text-slate-800">{selectedPhoto.dimensions} px</span></div>
                    <div>Metadata: <span className="font-semibold text-slate-800">{selectedPhoto.exif}</span></div>
                  </div>
                )}
              </div>

              {/* Footer specs */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono">
                <div>
                  <div className="font-bold text-slate-600">Fotografer</div>
                  <div className="text-[10px] text-slate-500 font-sans mt-0.5">{selectedPhoto.author}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-600">Tanggal Terbit</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{selectedPhoto.date}</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
