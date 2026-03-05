import { useState, useEffect } from 'react';
import { navigation } from '../data/portfolioData';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language].header;

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.theme === 'dark' || 
             (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [isDarkMode]);

  // Scroll detection for header background + scroll spy
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Scroll spy: find which section is currently in view
      const sections = ['expertise', 'stack', 'projects', 'contact'];
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            current = `#${id}`;
          }
        }
      }
      setActiveSection(current || '#');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-xl shadow-sm shadow-slate-200/50 dark:shadow-slate-900/50 border-b border-slate-200/50 dark:border-slate-800/50' 
        : 'bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-primary p-1 bg-primary/10 rounded-md">
              <span className="material-symbols-outlined text-2xl">code_off</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">ppsssj Portfolio</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`relative text-sm font-medium transition-colors py-1 ${
                  activeSection === item.href
                    ? 'text-primary'
                    : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary'
                }`}
              >
                {t.nav[item.href] ?? item.name}
                {activeSection === item.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-[5px] left-0 right-0 h-[2px] bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            ))}
            <button 
              onClick={toggleDarkMode}
              className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors mr-2 focus:outline-none overflow-hidden"
              aria-label={t.toggleTheme}
            >
              <div className="relative w-6 h-6">
                <motion.span 
                  className="material-symbols-outlined absolute inset-0 text-yellow-500"
                  initial={false}
                  animate={{ 
                    scale: isDarkMode ? 0 : 1, 
                    rotate: isDarkMode ? 90 : 0,
                    opacity: isDarkMode ? 0 : 1
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  light_mode
                </motion.span>
                <motion.span 
                  className="material-symbols-outlined absolute inset-0 text-blue-400"
                  initial={false}
                  animate={{ 
                    scale: isDarkMode ? 1 : 0, 
                    rotate: isDarkMode ? 0 : -90,
                    opacity: isDarkMode ? 1 : 0
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  dark_mode
                </motion.span>
              </div>
            </button>

            <div className="inline-flex items-center rounded-full border border-slate-200 dark:border-slate-700 p-1 bg-white/70 dark:bg-slate-800/60">
              <span className="sr-only">{t.languageLabel}</span>
              <button
                type="button"
                onClick={() => setLanguage('ko')}
                className={`px-2 py-0.5 text-xs font-semibold rounded-full transition-colors ${
                  language === 'ko'
                    ? 'bg-primary text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:text-primary'
                }`}
              >
                KO
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 text-xs font-semibold rounded-full transition-colors ${
                  language === 'en'
                    ? 'bg-primary text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:text-primary'
                }`}
              >
                EN
              </button>
            </div>
            {/* <button className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow transition-all hover:bg-primary-hover hover:shadow-md hover:translate-y-[-1px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
              <span className="mr-2 material-symbols-outlined text-[18px]">download</span>
              Resume
            </button> */}
          </nav>

          <button className="md:hidden text-slate-900 dark:text-white">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
