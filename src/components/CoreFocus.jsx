import { coreFocus } from '../data/portfolioData';
import { motion } from 'framer-motion';

export default function CoreFocus() {
  const getColorClasses = (colorScheme) => {
    switch (colorScheme) {
      case 'blue':
        return {
          hoverBorder: 'hover:border-primary dark:hover:border-primary',
          hoverShadow: 'hover:shadow-lg hover:shadow-primary/10',
          hoverTransform: 'hover:-translate-y-1',
          bgLight: 'bg-blue-50 group-hover:bg-blue-100 transition-colors',
          bgDark: 'dark:bg-blue-900/20 dark:group-hover:bg-blue-900/40 transition-colors',
          textHover: 'text-primary'
        };
      case 'violet':
        return {
          hoverBorder: 'hover:border-[var(--color-violet-accent)] dark:hover:border-[var(--color-violet-accent)]',
          hoverShadow: 'hover:shadow-lg hover:shadow-[var(--color-violet-accent)]/10',
          hoverTransform: 'hover:-translate-y-1',
          bgLight: 'bg-violet-50 group-hover:bg-violet-100 transition-colors',
          bgDark: 'dark:bg-violet-900/20 dark:group-hover:bg-violet-900/40 transition-colors',
          textHover: 'text-[var(--color-violet-accent)]'
        };
      case 'pink':
        return {
          hoverBorder: 'hover:border-pink-500 dark:hover:border-pink-500',
          hoverShadow: 'hover:shadow-lg hover:shadow-pink-500/10',
          hoverTransform: 'hover:-translate-y-1',
          bgLight: 'bg-pink-50 group-hover:bg-pink-100 transition-colors',
          bgDark: 'dark:bg-pink-900/20 dark:group-hover:bg-pink-900/40 transition-colors',
          textHover: 'text-pink-500'
        };
      default:
        return {
          hoverBorder: 'hover:border-slate-500/50',
          hoverShadow: 'hover:shadow-slate-500/5',
          bgLight: 'bg-slate-50',
          bgDark: 'dark:bg-slate-900/20',
          textHover: 'text-slate-500'
        };
    }
  };

  return (
    <section className="py-24 bg-background-light dark:bg-background-dark" id="expertise">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            My Core Focus
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            I don't just write code; I build product experiences. My approach combines technical depth with a keen eye for interaction design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreFocus.map((item, idx) => {
            const colors = getColorClasses(item.colorScheme);
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group relative p-8 rounded-2xl bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 transition-all duration-300 shadow-sm ${colors.hoverShadow} ${colors.hoverBorder} ${colors.hoverTransform} flex flex-col h-full`}
              >
                {/* Background watermarked icon */}
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="material-symbols-outlined text-[100px] text-slate-900 dark:text-white">
                    {item.backgroundIcon}
                  </span>
                </div>

                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 py-2 ${colors.bgLight} ${colors.bgDark} ${colors.textHover}`}>
                  <span className="material-symbols-outlined text-2xl py-2">{item.icon}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
