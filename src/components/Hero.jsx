import { heroInfo } from '../data/portfolioData';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24 lg:pb-32 xl:pb-36 bg-background-light dark:bg-background-dark transition-colors duration-500">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-primary/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-[var(--color-violet-accent)]/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-600/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: '4s' }}></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.07] dark:opacity-20"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        <motion.div 
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary mb-6 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            {heroInfo.status}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.1]">
            {heroInfo.titleLines[0]} <br />
            <span className="text-gradient">{heroInfo.titleLines[1]}</span>
          </h1>

          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            {heroInfo.description}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href={heroInfo.primaryAction.href}
              className="group inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-bold text-white shadow-lg shadow-[var(--color-primary)]/25 transition-all hover:bg-primary-hover hover:translate-y-[-2px] hover:shadow-xl hover:shadow-[var(--color-primary)]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {heroInfo.primaryAction.text}
              <span className="ml-2 material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                {heroInfo.primaryAction.icon}
              </span>
            </a>
            <a
              href={heroInfo.secondaryAction.href}
              className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm px-8 text-sm font-bold text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              <span className="mr-2 material-symbols-outlined text-[20px]">{heroInfo.secondaryAction.icon}</span>
              {heroInfo.secondaryAction.text}
            </a>
          </div>
        </motion.div>

        {/* Hero Visual Details (Hidden on mobile) */}
        <motion.div 
          className="flex-1 w-full relative h-[500px] hidden lg:block"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          <div className="relative w-full h-full perspective-1000">
            {/* Store.ts Window */}
            <div className="absolute top-10 right-10 w-[85%] h-[340px] glass-panel-light dark:glass-panel rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-6 opacity-90 transition-all hover:opacity-100 duration-500 z-10 shadow-2xl">
              <div className="flex justify-between items-center mb-6 border-b border-slate-200/50 dark:border-slate-700/50 pb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-mono">Store.ts</div>
              </div>

              <div className="relative h-full w-full">
                {/* Node graph representation */}
                <div className="absolute top-0 left-0 p-3 bg-slate-100 dark:bg-surface-dark border border-slate-200 dark:border-slate-600 rounded-lg w-32 shadow-lg">
                  <div className="text-[10px] text-primary mb-1">Atom</div>
                  <div className="h-1.5 w-16 bg-slate-300 dark:bg-slate-600 rounded mb-1"></div>
                  <div className="h-1.5 w-10 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </div>

                <div className="absolute top-12 left-40 p-3 bg-slate-100 dark:bg-surface-dark border border-[var(--color-violet-accent)]/30 dark:border-[var(--color-violet-accent)]/50 rounded-lg w-32 shadow-lg ring-1 ring-[var(--color-violet-accent)]/10 dark:ring-[var(--color-violet-accent)]/20">
                  <div className="text-[10px] text-[var(--color-violet-accent)] mb-1">Selector</div>
                  <div className="h-1.5 w-20 bg-slate-300 dark:bg-slate-600 rounded mb-1"></div>
                </div>

                <div className="absolute top-32 left-10 p-3 bg-slate-100 dark:bg-surface-dark border border-slate-200 dark:border-slate-600 rounded-lg w-32 shadow-lg">
                  <div className="text-[10px] text-primary mb-1">Atom</div>
                  <div className="h-1.5 w-14 bg-slate-300 dark:bg-slate-600 rounded"></div>
                </div>

                {/* SVG Connections */}
                <svg className="absolute inset-0 pointer-events-none w-full h-full">
                  <path className="opacity-30 dark:opacity-50" d="M128 25 C145 25, 145 70, 160 70" fill="none" stroke="#94a3b8" strokeWidth="2"></path>
                  <path className="opacity-30 dark:opacity-50" d="M128 150 C145 150, 145 80, 160 80" fill="none" stroke="#94a3b8" strokeWidth="2"></path>
                  <path className="connection-line" d="M288 70 C310 70, 310 160, 330 160" fill="none" stroke="var(--color-violet-accent)" strokeWidth="2"></path>
                </svg>
              </div>
            </div>

            {/* Performance Panel */}
            <div className="absolute bottom-12 left-0 w-[240px] h-[280px] glass-panel-light dark:glass-panel bg-white/90 dark:bg-surface-dark/95 rounded-2xl border border-slate-200/50 dark:border-slate-700 shadow-2xl z-20 animate-float">
              <div className="absolute -right-4 top-10 w-full h-full bg-primary/5 dark:bg-primary/10 rounded-2xl blur-xl -z-10"></div>
              <div className="p-4 h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <div className="h-2 w-12 bg-slate-300 dark:bg-slate-600 rounded"></div>
                  <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-sm">settings</span>
                </div>
                
                <div className="flex-1 space-y-3 overflow-hidden">
                  <div className="relative group">
                    <div className="h-24 w-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden relative">
                      <div className="absolute inset-0 bg-primary/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <div className="h-2 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                      <div className="h-2 w-8 bg-primary/30 dark:bg-primary/40 rounded"></div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-16 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"></div>
                    <div className="h-16 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"></div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Rendering: 60fps</div>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Code Snippet */}
            <div className="absolute top-40 right-4 w-[180px] glass-panel bg-[#0f172a]/95 rounded-lg border border-slate-700 p-3 shadow-xl transform rotate-3 z-30">
              <div className="font-mono text-[9px] leading-relaxed text-slate-300">
                <span className="text-violet-400">interface</span> <span className="text-yellow-200">Props</span> {'{'}<br/>
                &nbsp;&nbsp;active: <span className="text-blue-300">boolean</span>;<br/>
                &nbsp;&nbsp;data: <span className="text-blue-300">Node[]</span>;<br/>
                {'}'}<br/>
                <span className="text-slate-500">// Memoized</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
