import { techStack } from '../data/portfolioData';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function Stack() {
  const { language } = useLanguage();
  const t = translations[language].stack;
  const activityGroupOrder = ['operations', 'research', 'awards'];
  const groupedActivities = activityGroupOrder
    .map((group) => ({
      group,
      items: t.activities.filter((item) => item.group === group),
    }))
    .filter((groupBlock) => groupBlock.items.length > 0);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Core Stack': return 'terminal';
      case 'Visual & Motion': return 'palette';
      case 'Tools': return 'build';
      default: return 'category';
    }
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-[#0b1120] border-y border-slate-200/50 dark:border-slate-800" id="stack">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-10 lg:gap-12">
          <div>
            <div className="mb-10">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {t.heading}
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{t.subheading}</p>
            </div>

            <div className="space-y-8">
              {techStack.map((category, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex flex-col md:flex-row gap-6 items-start md:items-center border-b border-slate-200 dark:border-slate-800/50 pb-8 last:border-0 last:pb-0"
                >
                  <div className="w-40 flex-shrink-0 flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-lg">
                      {getCategoryIcon(category.category)}
                    </span>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {t.categories[category.category] ?? category.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {category.items.map((item, itemIdx) => {
                      const baseClasses =
                        "px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default tech-glow";

                      const highlightClasses = item.highlight
                        ? "border-2 border-primary/50 dark:border-primary/50 bg-primary/5 dark:bg-primary/10 text-primary dark:text-primary-hover hover:border-primary hover:bg-primary/10"
                        : "border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark text-slate-700 dark:text-slate-200 hover:border-primary/50 hover:text-primary dark:hover:border-primary/50 dark:hover:text-primary";

                      return (
                        <span key={itemIdx} className={`${baseClasses} ${highlightClasses}`}>
                          <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                          {item.name}
                        </span>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-10">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {t.activityTitle}
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{t.activitySubheading}</p>
            </div>

            <div className="space-y-8">
              {groupedActivities.map((groupBlock, idx) => (
                <motion.div
                  key={groupBlock.group}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="flex flex-col md:flex-row gap-6 items-start border-b border-slate-200 dark:border-slate-800/50 pb-8 last:border-0 last:pb-0"
                >
                  <div className="w-40 flex-shrink-0 flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-lg">
                      workspace_premium
                    </span>
                    <h3 className="text-sm font-semibold tracking-wider text-slate-500 dark:text-slate-400">
                      {t.activityGroups?.[groupBlock.group] ?? groupBlock.group}
                    </h3>
                  </div>
                  <div className="w-full space-y-3">
                    {groupBlock.items.map((item) => (
                      <div key={item.title} className="flex flex-wrap gap-3">
                        <span className="px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default tech-glow border-2 border-primary/50 dark:border-primary/50 bg-primary/5 dark:bg-primary/10 text-primary dark:text-primary-hover">
                          <span className="material-symbols-outlined text-[18px]">military_tech</span>
                          {item.title}
                        </span>
                        {item.detail ? (
                          <span className="px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default tech-glow border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark text-slate-700 dark:text-slate-200 hover:border-primary/50 hover:text-primary dark:hover:border-primary/50 dark:hover:text-primary">
                            <span className="material-symbols-outlined text-[18px]">insights</span>
                            {item.detail}
                          </span>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
