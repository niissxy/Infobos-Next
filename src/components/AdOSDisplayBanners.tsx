import React, { useState } from 'react';
import { Smartphone, Monitor, Tablet, Tv, Shield, MapPin, Eye, Play, Sparkles, Sliders, CheckSquare, Layers, Laptop } from 'lucide-react';

export default function AdOSDisplayBanners() {
  const [selectedPlacement, setSelectedPlacement] = useState<string>('top_leaderboard');
  const [takeoverActive, setTakeoverActive] = useState<boolean>(false);
  const [selectedGeoType, setSelectedGeoType] = useState<string>('Province');
  
  // Custom targeting criteria states
  const [targetGeo, setTargetGeo] = useState<string[]>(['DKI Jakarta', 'Jawa Barat']);
  const [targetDevices, setTargetDevices] = useState<string[]>(['Desktop', 'Mobile', 'Tablet']);
  const [targetUsers, setTargetUsers] = useState<string[]>(['Registered User', 'Premium User']);
  const [takeoverBrand, setTakeoverBrand] = useState<string>('Bank Mandiri');

  const placementsList = [
    { id: 'hero_billboard', name: 'Hero Billboard (970x250)', desc: 'Premium placement above main fold.', size: '970x250px', rate: 'Rp 45.000 CPM' },
    { id: 'top_leaderboard', name: 'Leaderboard Banner (728x90)', desc: 'Standard leaderboard banner below header.', size: '728x90px', rate: 'Rp 35.000 CPM' },
    { id: 'sticky_header', name: 'Sticky Header Banner', desc: 'Floats at the very top on scroll.', size: '100% width', rate: 'Rp 40.000 CPM' },
    { id: 'sticky_footer', name: 'Sticky Footer Banner', desc: 'Floats at the bottom. Great for CTR.', size: '100% width', rate: 'Rp 38.000 CPM' },
    { id: 'sidebar_banner', name: 'Sidebar Banner (300x250)', desc: 'Standard inline container for categories.', size: '300x250px', rate: 'Rp 28.000 CPM' },
    { id: 'half_page_banner', name: 'Half Page Banner (300x600)', desc: 'Highly visible wide sidebar skyscraper.', size: '300x600px', rate: 'Rp 42.000 CPM' },
    { id: 'mobile_banner', name: 'Mobile Banner (320x50)', desc: 'Standard screen width slot on smart devices.', size: '320x50px', rate: 'Rp 25.000 CPM' },
    { id: 'sticky_mobile', name: 'Sticky Mobile Banner (320x100)', desc: 'Floats at the screen bottom of smartphones.', size: '320x100px', rate: 'Rp 32.000 CPM' },
    { id: 'footer_banner', name: 'Footer Banner (728x90)', desc: 'Placed right above footer sitemap link.', size: '728x90px', rate: 'Rp 24.000 CPM' },
    { id: 'floating_banner', name: 'Floating Corner Banner (300x250)', desc: 'Fades in on bottom right side.', size: '300x250px', rate: 'Rp 36.000 CPM' },
    { id: 'background_skin', name: 'Background Skin (Left & Right)', desc: 'Background skin wallpaper takeover.', size: 'Takeover Wallpaper', rate: 'Rp 65.000 CPM' },
    { id: 'corner_banner', name: 'Corner Page Peel', desc: 'Triangle peel effect in top corner.', size: 'Interactive Corner', rate: 'Rp 34.000 CPM' },
    { id: 'category_banner', name: 'Category Sponsor Banner', desc: 'Anchored header for target categories.', size: '728x90px', rate: 'Rp 32.000 CPM' },
    { id: 'in_article_banner', name: 'In Article Mid-Banner (300x250)', desc: 'Inserted after paragraph 5 of text.', size: '300x250px', rate: 'Rp 30.000 CPM' },
    { id: 'video_overlay', name: 'Video Playback Overlay Banner', desc: 'Semi-transparent bottom bar in pre-roll.', size: '468x60px', rate: 'Rp 45.000 CPM' },
    { id: 'sponsored_story_box', name: 'Sponsored Content Grid Box', desc: 'Aesthetic block integrated inside feed.', size: 'Responsive Card', rate: 'Rp 26.000 CPM' }
  ];

  const handleToggleDevice = (device: string) => {
    if (targetDevices.includes(device)) {
      setTargetDevices(targetDevices.filter(d => d !== device));
    } else {
      setTargetDevices([...targetDevices, device]);
    }
  };

  const handleToggleUser = (userType: string) => {
    if (targetUsers.includes(userType)) {
      setTargetUsers(targetUsers.filter(u => u !== userType));
    } else {
      setTargetUsers([...targetUsers, userType]);
    }
  };

  const handleToggleGeo = (geo: string) => {
    if (targetGeo.includes(geo)) {
      setTargetGeo(targetGeo.filter(g => g !== geo));
    } else {
      setTargetGeo([...targetGeo, geo]);
    }
  };

  return (
    <div className="space-y-8 text-left">
      <div className="bg-teal-900 text-teal-50 p-5 rounded-2xl border border-teal-850">
        <h3 className="font-display font-extrabold text-base text-teal-300">Display Banners, Takeovers & Targeting Engine</h3>
        <p className="text-xs text-teal-100 max-w-2xl leading-relaxed mt-1">
          Manage all 16 banner placements, simulate full-page brand takeovers, and orchestrate precise device, geo, and user behavioral segmentation rules.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Banner placements selector & Rate Card */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-slate-100">Placement Catalog</h4>
            <p className="text-[10px] text-slate-400 dark:text-slate-500">Select placement to run real-time visual preview.</p>
          </div>
          
          <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1">
            {placementsList.map((place) => (
              <button
                key={place.id}
                onClick={() => setSelectedPlacement(place.id)}
                className={`w-full text-left p-3 rounded-xl border transition ${
                  selectedPlacement === place.id 
                    ? 'border-[#2B7A78] bg-teal-50/50 dark:bg-teal-950/20 shadow-2xs' 
                    : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-xs">{place.name}</span>
                  <span className="text-[9px] font-mono font-bold text-[#2B7A78] dark:text-[#3e9c99]">{place.rate}</span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-1 leading-normal">{place.desc}</p>
                <div className="flex justify-between text-[9px] text-slate-400 dark:text-slate-500 font-mono mt-1 pt-1 border-t border-slate-200/50 dark:border-slate-800">
                  <span>Size: {place.size}</span>
                  <span>Direct Placement</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Live Visual Ad Simulator Preview */}
        <div className="lg:col-span-8 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <h4 className="font-display font-bold text-sm text-slate-900 dark:text-slate-100">Visual Placement Simulator</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Live viewport simulation of the selected banner zone.</p>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg p-1 text-[10px] font-bold">
                <Laptop className="h-3 w-3 text-slate-700 dark:text-slate-300" />
                <span className="font-mono text-slate-600 dark:text-slate-400">Responsive Live Feed</span>
              </div>
            </div>

            {/* Simulated browser container */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm relative overflow-hidden min-h-[220px] flex flex-col justify-between">
              {/* Browser Toolbar mockup */}
              <div className="flex items-center gap-1 border-b border-slate-100 dark:border-slate-850 pb-2 mb-3 text-[10px] text-slate-400 dark:text-slate-500">
                <span className="h-2 w-2 rounded-full bg-rose-400" />
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="bg-slate-50 dark:bg-slate-950 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800 font-mono text-[9px] ml-2 flex-1 text-left dark:text-slate-300">
                  {"https://infobos.com/news/tech-business-insight"}
                </span>
              </div>

              {/* Takeover Active Visual Mask */}
              {takeoverActive ? (
                <div className="absolute inset-0 bg-slate-900/90 z-20 flex flex-col items-center justify-center p-6 text-center text-white">
                  <div className="bg-[#FFD700] text-slate-900 font-mono text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider mb-2">
                    HOMEPAGE TAKEOVER ACTIVE
                  </div>
                  <h5 className="font-display font-black text-lg">SPONSORED BRAND DAY BY {takeoverBrand.toUpperCase()}</h5>
                  <p className="text-xs text-slate-300 max-w-sm mt-1 leading-relaxed">
                    Background skins, floating corner banners, and custom interactive panels are entirely dedicated to the partner brand.
                  </p>
                  <button
                    onClick={() => setTakeoverActive(false)}
                    className="mt-4 bg-[#FFD700] text-slate-900 font-bold text-xs px-4 py-1.5 rounded-lg hover:bg-yellow-400 transition"
                  >
                    Close Simulator Overlays
                  </button>
                </div>
              ) : null}

              {/* Dynamic simulator frames according to selections */}
              <div className="flex-1 flex flex-col justify-center">
                {selectedPlacement === 'top_leaderboard' && (
                  <div className="w-full bg-gradient-to-r from-amber-50/10 to-amber-100/10 border border-dashed border-amber-300 p-2 text-center rounded-lg">
                    <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400 block uppercase tracking-widest">TOP LEADERBOARD (728x90)</span>
                    <span className="text-[11px] text-amber-900 dark:text-amber-200 block font-bold mt-1">Simulated Banner: "Jabar Digital Summit Promo - Biznet Cloud"</span>
                  </div>
                )}
                {selectedPlacement === 'hero_billboard' && (
                  <div className="w-full bg-gradient-to-r from-teal-950/20 to-teal-900/20 border border-dashed border-[#2B7A78]/50 p-4 text-center rounded-xl my-2">
                    <span className="text-[10px] font-mono font-bold text-[#2B7A78] dark:text-[#3e9c99] block uppercase tracking-widest">HERO BILLBOARD (970x250)</span>
                    <span className="text-[11px] text-slate-800 dark:text-slate-200 font-bold block mt-1">"Launching Real-Time Bank Indonesia Rupiah Stablecoin"</span>
                  </div>
                )}
                {selectedPlacement === 'sticky_header' && (
                  <div className="w-full bg-indigo-900 text-white p-1.5 text-center text-[10px] font-bold rounded-lg animate-pulse mb-4">
                    📢 STICKY HEADER BANNER: "Mulai Akses Ingestion Dashboard EVOLIS Premium!"
                  </div>
                )}
                {selectedPlacement === 'sticky_footer' && (
                  <div className="mt-8 w-full bg-slate-900 text-[#FFD700] p-2 text-center text-[10px] font-mono font-bold rounded-lg">
                    ⚡ STICKY FOOTER ANCHOR: "Promo Spesial Partner: Cashback 15% Menggunakan QRIS BJB"
                  </div>
                )}
                {!['top_leaderboard', 'hero_billboard', 'sticky_header', 'sticky_footer'].includes(selectedPlacement) && (
                  <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl p-3 text-center">
                    <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 block uppercase">
                      {selectedPlacement.split('_').join(' ')} Active Placement
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-bold mt-1">"Interactive HTML creative rendered safely inside asynchronous iFrame container."</p>
                  </div>
                )}
              </div>

              {/* Minimal Web content placeholder */}
              <div className="border-t border-slate-100 dark:border-slate-850 pt-3 mt-3 text-left">
                <h5 className="font-bold text-xs text-slate-800 dark:text-slate-100 font-display">Menkeu Sri Mulyani Tekankan Digitalisasi Keuangan Daerah</h5>
                <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5 leading-relaxed">
                  Bandung - Pertumbuhan integrasi digital di Jawa Barat mengalami lonjakan volume transaksi hingga 280%...
                </p>
              </div>
            </div>
          </div>

          {/* Quick Controls */}
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap justify-between items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Brand Overlays (Homepage Takeover):</span>
              <input
                type="text"
                value={takeoverBrand}
                onChange={(e) => setTakeoverBrand(e.target.value)}
                className="px-2 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 dark:text-slate-100 rounded text-xs font-bold w-32"
              />
            </div>
            <button
              onClick={() => setTakeoverActive(!takeoverActive)}
              className={`font-bold text-xs px-4 py-2 rounded-xl transition ${
                takeoverActive 
                  ? 'bg-rose-600 hover:bg-rose-700 text-white' 
                  : 'bg-[#002B5B] dark:bg-indigo-900 hover:bg-[#001f42] dark:hover:bg-indigo-950 text-white'
              }`}
            >
              {takeoverActive ? 'Disable Takeover' : 'Simulate Homepage Takeover'}
            </button>
          </div>
        </div>
      </div>

      {/* Targeting Engine configuration deck */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-2xs space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
          <h4 className="font-display font-bold text-sm text-slate-900 dark:text-slate-100">Enterprise Targeting Segment Controller</h4>
          <p className="text-[10px] text-slate-400 dark:text-slate-500">Configure parameters for Geo-fencing, User Behavior profiling, and User Device rendering optimization.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* 1. Geo Targeting */}
          <div className="space-y-3 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 p-4 rounded-xl">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-850 pb-2">
              <span className="font-bold text-slate-800 dark:text-slate-200 text-xs flex items-center gap-1">
                <MapPin className="h-4 w-4 text-[#2B7A78] dark:text-[#3e9c99]" /> Geo-Targeting
              </span>
              <select
                value={selectedGeoType}
                onChange={(e) => setSelectedGeoType(e.target.value)}
                className="bg-white dark:bg-slate-850 border border-slate-300 dark:border-slate-700 text-[10px] font-bold rounded px-1.5 py-0.5 dark:text-slate-200"
              >
                <option>Country</option>
                <option>Province</option>
                <option>City</option>
                <option>District</option>
              </select>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal font-sans">
              Restricts creative delivery to users accessing from specified locations mapped dynamically via ISP GPS.
            </p>
            <div className="space-y-1.5 pt-1">
              {['DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Sumatera Utara'].map((geo) => (
                <label key={geo} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={targetGeo.includes(geo)}
                    onChange={() => handleToggleGeo(geo)}
                    className="rounded border-slate-300 dark:border-slate-700 text-teal-600 focus:ring-teal-500 h-3.5 w-3.5"
                  />
                  <span className="font-medium">{geo}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 2. Device Targeting */}
          <div className="space-y-3 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 p-4 rounded-xl">
            <div className="border-b border-slate-200 dark:border-slate-850 pb-2">
              <span className="font-bold text-slate-800 dark:text-slate-200 text-xs flex items-center gap-1">
                <Laptop className="h-4 w-4 text-[#2B7A78] dark:text-[#3e9c99]" /> Device Optimization
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal font-sans">
              Deliver optimized vertical creatives for mobile viewports, high-resolution leaderboards for desktops, or clean interstitial cards.
            </p>
            <div className="space-y-1.5 pt-1">
              {['Desktop', 'Mobile', 'Tablet', 'Smart TV', 'Native App Android', 'iOS Wrapper'].map((dev) => (
                <label key={dev} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={targetDevices.includes(dev)}
                    onChange={() => handleToggleDevice(dev)}
                    className="rounded border-slate-300 dark:border-slate-700 text-teal-600 focus:ring-teal-500 h-3.5 w-3.5"
                  />
                  <span className="font-medium">{dev}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 3. User & Behavioral Targeting */}
          <div className="space-y-3 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 p-4 rounded-xl">
            <div className="border-b border-slate-200 dark:border-slate-850 pb-2">
              <span className="font-bold text-slate-800 dark:text-slate-200 text-xs flex items-center gap-1">
                <Sliders className="h-4 w-4 text-[#2B7A78] dark:text-[#3e9c99]" /> Behavioral Demographics
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal font-sans">
              Leverage internal user history logs, reader interest profiles, corporate associations, and premium memberships.
            </p>
            <div className="space-y-1.5 pt-1">
              {['Guest Visitor', 'Registered User', 'Premium Subscriber', 'Corporate Partner', 'Frequent Reader: Technology', 'Frequent Reader: Business'].map((usr) => (
                <label key={usr} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={targetUsers.includes(usr)}
                    onChange={() => handleToggleUser(usr)}
                    className="rounded border-slate-300 dark:border-slate-700 text-teal-600 focus:ring-teal-500 h-3.5 w-3.5"
                  />
                  <span className="font-medium">{usr}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Saved targeting notification summary */}
        <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl text-[10px] font-mono text-slate-500 dark:text-slate-400 border border-slate-150 dark:border-slate-850 leading-relaxed">
          ⚡ <strong>Active Targeting Query Blueprint:</strong> WHERE <code>{"geo IN [" + targetGeo.join(', ') + "] AND device IN [" + targetDevices.join(', ') + "] AND user_segment IN [" + targetUsers.join(', ') + "]"}</code>
        </div>
      </div>
    </div>
  );
}
