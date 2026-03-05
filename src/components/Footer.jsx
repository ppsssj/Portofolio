import { footerInfo } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language].footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-50 dark:bg-[#0b1120] pt-12 pb-8">
      {/* Gradient divider */}
      <div className="section-divider mb-12"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row: branding + back to top */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          <div className="flex items-center gap-3">
            <div className="text-primary p-1.5 bg-primary/10 rounded-lg">
              <span className="material-symbols-outlined text-2xl">code_off</span>
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white block">ppsssj.dev</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">{t.subtitle}</span>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
          >
            {t.backToTop}
            <span className="material-symbols-outlined text-lg group-hover:-translate-y-1 transition-transform">arrow_upward</span>
          </button>
        </div>

        {/* Bottom row: copyright + links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
          <span className="text-slate-400 dark:text-slate-500 text-sm">
            {t.copyright || footerInfo.copyright}
          </span>
          <div className="flex items-center gap-6">
            {footerInfo.links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors text-sm font-medium inline-flex items-center gap-1.5"
              >
                {link.name}
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
