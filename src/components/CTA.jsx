import { careerObjective } from '../data/portfolioData';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function CTA() {
  const { language } = useLanguage();
  const t = translations[language].cta;

  return (
    <section className="relative py-24 overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Gradient background overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-[var(--color-violet-accent)]/5 dark:from-primary/10 dark:via-transparent dark:to-[var(--color-violet-accent)]/10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 dark:bg-primary/20 rounded-full filter blur-[120px] animate-glow-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-[var(--color-violet-accent)]/10 dark:bg-[var(--color-violet-accent)]/15 rounded-full filter blur-[80px] animate-glow-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <motion.div 
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/15 border border-primary/20 text-primary text-sm font-semibold mb-8 backdrop-blur-sm">
          {t.badge}
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl mb-6 leading-tight">
          {t.title}
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          {t.description}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href={careerObjective.primaryAction.href}
            className="group inline-flex h-14 items-center justify-center rounded-xl bg-primary px-10 text-base font-bold text-white shadow-lg shadow-[var(--color-primary)]/25 transition-all hover:bg-primary-hover hover:translate-y-[-2px] hover:shadow-xl hover:shadow-[var(--color-primary)]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span className="mr-2 material-symbols-outlined">{careerObjective.primaryAction.icon}</span>
            {t.primary}
          </a>
          <a
            href={careerObjective.secondaryAction.href}
            className="inline-flex h-14 items-center justify-center rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm px-10 text-base font-bold text-slate-700 dark:text-white shadow-sm transition-all hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            <span className="mr-2 material-symbols-outlined">{careerObjective.secondaryAction.icon}</span>
            {t.secondary}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
