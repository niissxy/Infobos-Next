import React, { useState } from 'react';
import { Home, Sliders, Compass, Tv, Menu, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BottomNavigationProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onToggleExplorer: () => void;
  onToggleSidebar: () => void;
  topicPreferences: string[];
  onSaveTopicPreferences: (preferences: string[]) => void;
  isDark: boolean;
}

const PUBLIC_TOPICS = [
  { slug: 'breaking-news', name: 'Breaking' },
  { slug: 'regional', name: 'Regional' },
  { slug: 'nasional', name: 'Nasional' },
  { slug: 'internasional', name: 'Internasional' },
  { slug: 'trending', name: 'Trending' },
  { slug: 'technology', name: 'Teknologi' },
  { slug: 'finance', name: 'Keuangan' }
];

export default function BottomNavigation({
  currentTab,
  onTabChange,
  onToggleExplorer,
  onToggleSidebar,
  topicPreferences,
  onSaveTopicPreferences,
  isDark
}: BottomNavigationProps) {
  const [showMinatDrawer, setShowMinatDrawer] = useState(false);

  const togglePreference = (slug: string) => {
    let newPrefs = [...topicPreferences];
    if (newPrefs.includes(slug)) {
      newPrefs = newPrefs.filter(p => p !== slug);
    } else {
      newPrefs.push(slug);
    }
    onSaveTopicPreferences(newPrefs);
  };

  const handleMinatClick = () => {
    setShowMinatDrawer(true);
  };

  return (
    <>
      {/* FLOAT BOTTOM NAVIGATION BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 px-3 pb-3 pt-1 md:hidden pointer-events-none">
        <motion.nav 
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 180, delay: 0.2 }}
          className={`mx-auto max-w-md w-full rounded-xl border pointer-events-auto shadow-2xl flex items-center justify-between p-1.5 transition-all duration-300 ${
            isDark 
              ? 'bg-slate-900/90 backdrop-blur-md border-white/10 text-white' 
              : 'bg-white/95 backdrop-blur-md border-slate-200 text-slate-800'
          }`}
          id="mobile-bottom-nav"
        >
          {/* TAB 1: HOME */}
          <button
            onClick={() => {
              onTabChange('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex-1 flex flex-col items-center justify-center py-0.5 gap-0.5 cursor-pointer relative group"
            title="Beranda"
          >
            <div className={`p-1 rounded-lg transition-all duration-300 ${
              currentTab === 'home' && !showMinatDrawer
                ? 'bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 scale-105' 
                : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200'
            }`}>
              <Home className="h-4 w-4" />
            </div>
            <span className={`text-[8px] font-medium tracking-wide transition-colors ${
              currentTab === 'home' && !showMinatDrawer ? 'text-indigo-500 font-bold' : 'text-slate-400'
            }`}>
              Beranda
            </span>
            {currentTab === 'home' && !showMinatDrawer && (
              <motion.div layoutId="bottomDot" className="absolute bottom-0 w-1 h-1 rounded-full bg-indigo-500" />
            )}
          </button>

          {/* TAB 2: MINAT (TOPIC PREFERENCES) */}
          <button
            onClick={handleMinatClick}
            className="flex-1 flex flex-col items-center justify-center py-0.5 gap-0.5 cursor-pointer relative group"
            title="Minat Saya"
          >
            <div className={`p-1 rounded-lg transition-all duration-300 ${
              showMinatDrawer
                ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 scale-105' 
                : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200'
            }`}>
              <Sliders className="h-4 w-4" />
            </div>
            <span className={`text-[8px] font-medium tracking-wide transition-colors ${
              showMinatDrawer ? 'text-teal-500 font-bold' : 'text-slate-400'
            }`}>
              Minat Saya
            </span>
            {topicPreferences.length > 0 && !showMinatDrawer && (
              <span className="absolute top-1 right-5 w-1.5 h-1.5 rounded-full bg-teal-500 ring-2 ring-white dark:ring-slate-900" />
            )}
            {showMinatDrawer && (
              <motion.div layoutId="bottomDot" className="absolute bottom-0 w-1 h-1 rounded-full bg-teal-500" />
            )}
          </button>

          {/* TAB 4: LIVE TV */}
          <button
            onClick={() => {
              setShowMinatDrawer(false);
              onTabChange('video-hub');
            }}
            className="flex-1 flex flex-col items-center justify-center py-0.5 gap-0.5 cursor-pointer relative group"
            title="Live TV"
          >
            <div className={`p-1 rounded-lg transition-all duration-300 ${
              currentTab === 'video-hub' && !showMinatDrawer
                ? 'bg-amber-500/10 text-amber-500 scale-105' 
                : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200'
            }`}>
              <Tv className="h-4 w-4" />
            </div>
            <span className={`text-[8px] font-medium tracking-wide transition-colors ${
              currentTab === 'video-hub' && !showMinatDrawer ? 'text-amber-500 font-bold' : 'text-slate-400'
            }`}>
              Live TV
            </span>
            {currentTab === 'video-hub' && !showMinatDrawer && (
              <motion.div layoutId="bottomDot" className="absolute bottom-0 w-1 h-1 rounded-full bg-amber-500" />
            )}
          </button>

          {/* TAB 5: MENU (SIDEBAR) */}
          <button
            onClick={() => {
              setShowMinatDrawer(false);
              onToggleSidebar();
            }}
            className="flex-1 flex flex-col items-center justify-center py-0.5 gap-0.5 cursor-pointer relative group"
            title="Menu Utama"
          >
            <div className="p-1 rounded-lg transition-all duration-300 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200">
              <Menu className="h-4 w-4" />
            </div>
            <span className="text-[8px] font-medium tracking-wide text-slate-400">
              Menu
            </span>
          </button>
        </motion.nav>
      </div>

      {/* QUICK PREFERENCE BOTTOM DRAWER */}
      <AnimatePresence>
        {showMinatDrawer && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMinatDrawer(false)}
              className="fixed inset-0 bg-slate-950 z-[9999] md:hidden cursor-pointer"
            />

            {/* Bottom Drawer Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 24, stiffness: 220 }}
              className={`fixed bottom-0 left-0 right-0 z-[10000] rounded-t-3xl border-t p-5 pb-8 font-sans md:hidden text-left ${
                isDark 
                  ? 'bg-[#001f42] border-white/10 text-white shadow-[0_-10px_30px_rgba(0,0,0,0.5)]' 
                  : 'bg-white border-slate-200 text-slate-800 shadow-[0_-10px_30px_rgba(0,0,0,0.15)]'
              }`}
            >
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3 mb-4">
                <div>
                  <h3 className="text-xs font-bold text-[#FFD700] uppercase tracking-wider">Atur Minat Baca Anda</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-medium">Bantu kami merekomendasikan berita terpopuler untuk Anda</p>
                </div>
                <button 
                  onClick={() => setShowMinatDrawer(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition"
                >
                  <X className="h-4 w-4 text-slate-400" />
                </button>
              </div>

              {/* Preferences list */}
              <div className="grid grid-cols-2 gap-2 mb-5 max-h-64 overflow-y-auto pr-1">
                {PUBLIC_TOPICS.map((topic) => {
                  const isChecked = topicPreferences.includes(topic.slug);
                  return (
                    <button
                      key={topic.slug}
                      onClick={() => togglePreference(topic.slug)}
                      className={`px-3 py-2.5 rounded-xl border text-[11px] font-medium transition flex items-center justify-between text-left cursor-pointer ${
                        isChecked 
                          ? 'bg-teal-500/10 border-teal-400/50 text-teal-600 dark:text-teal-400 font-semibold' 
                          : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
                      }`}
                    >
                      <span>{topic.name}</span>
                      <div className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-all duration-200 ${
                        isChecked 
                          ? 'bg-teal-500 border-teal-500 text-slate-950' 
                          : 'border-slate-300 dark:border-white/20 bg-transparent'
                      }`}>
                        {isChecked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowMinatDrawer(false)}
                  className="flex-1 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded-xl transition shadow-md uppercase tracking-wider text-center cursor-pointer"
                >
                  Terapkan Minat ({topicPreferences.length})
                </button>
                {topicPreferences.length > 0 && (
                  <button
                    onClick={() => {
                      onSaveTopicPreferences([]);
                      setShowMinatDrawer(false);
                    }}
                    className="px-3 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 text-xs font-semibold rounded-xl transition border border-rose-500/20 cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
