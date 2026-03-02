import { useState, useEffect, useCallback } from 'react';
import { projects } from '../data/portfolioData';
import { motion, AnimatePresence } from 'framer-motion';

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const selectedProject = selectedId !== null ? projects[selectedId] : null;
  const total = projects.length;

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedId !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedId]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (selectedId !== null) return; // Don't navigate while modal is open
    if (e.key === 'ArrowRight') setCurrentIndex((prev) => (prev + 1) % total);
    if (e.key === 'ArrowLeft') setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [selectedId, total]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const goTo = (idx) => setCurrentIndex(idx);
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + total) % total);
  const goNext = () => setCurrentIndex((prev) => (prev + 1) % total);

  const getBadgeColors = (colorScheme) => {
    switch (colorScheme) {
      case 'blue':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case 'violet':
        return 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300';
      default:
        return 'bg-slate-100 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300';
    }
  };

  // Calculate position properties for each card based on its offset from center
  const getCardStyle = (idx) => {
    let offset = idx - currentIndex;
    // Wrap around for circular effect
    if (offset > Math.floor(total / 2)) offset -= total;
    if (offset < -Math.floor(total / 2)) offset += total;

    const isCenter = offset === 0;
    const absOffset = Math.abs(offset);

    // Only show cards within range of 2
    if (absOffset > 2) {
      return {
        x: offset > 0 ? '120%' : '-120%',
        scale: 0.5,
        z: -400,
        rotateY: offset > 0 ? -45 : 45,
        opacity: 0,
        zIndex: 0,
        filter: 'blur(8px)',
      };
    }

    return {
      x: `${offset * 38}%`,
      scale: isCenter ? 1 : absOffset === 1 ? 0.78 : 0.6,
      z: isCenter ? 0 : absOffset === 1 ? -180 : -320,
      rotateY: offset * -12,
      opacity: isCenter ? 1 : absOffset === 1 ? 0.6 : 0.3,
      zIndex: isCenter ? 30 : absOffset === 1 ? 20 : 10,
      filter: isCenter ? 'blur(0px)' : absOffset === 1 ? 'blur(2px)' : 'blur(4px)',
    };
  };

  return (
    <section className="py-24 bg-background-light dark:bg-background-dark overflow-hidden" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Featured Projects
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              Product-grade applications demonstrating end-to-end ownership.
            </p>
          </div>
          <a
            href="#"
            className="hidden sm:inline-flex items-center text-primary font-medium hover:text-primary-hover transition-colors"
          >
            View full archive
            <span className="material-symbols-outlined ml-1">arrow_right_alt</span>
          </a>
        </div>
      </div>

      {/* 3D Coverflow Carousel */}
      <div className="relative w-full" style={{ perspective: '1200px' }}>
        <div className="relative h-[520px] sm:h-[560px] lg:h-[480px] flex items-center justify-center">
          {projects.map((project, idx) => {
            const style = getCardStyle(idx);
            const isCenter = idx === currentIndex;

            return (
              <motion.div
                key={idx}
                className="absolute w-[85%] sm:w-[75%] lg:w-[65%] max-w-4xl cursor-pointer"
                animate={{
                  x: style.x,
                  scale: style.scale,
                  z: style.z,
                  rotateY: style.rotateY,
                  opacity: style.opacity,
                  filter: style.filter,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 30,
                  mass: 0.8,
                }}
                style={{
                  zIndex: style.zIndex,
                  transformStyle: 'preserve-3d',
                  pointerEvents: isCenter ? 'auto' : 'none',
                }}
                onClick={() => {
                  if (isCenter) setSelectedId(idx);
                  else setCurrentIndex(idx);
                }}
              >
                {/* Project Card */}
                <div className={`
                  rounded-2xl overflow-hidden
                  bg-surface-light dark:bg-surface-dark
                  border border-slate-200 dark:border-slate-800
                  shadow-2xl
                  transition-shadow duration-300
                  ${isCenter ? 'shadow-primary/10 dark:shadow-primary/20 ring-1 ring-primary/10' : ''}
                `}>
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent z-10"></div>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Badge overlay */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm ${getBadgeColors(project.badgeColor)}`}>
                        {project.badge}
                      </span>
                    </div>
                    {/* Title overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-200 line-clamp-2 drop-shadow-md">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom info bar — only visible on center card */}
                  {isCenter && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.3 }}
                      className="px-6 py-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800"
                    >
                      <div className="flex items-center gap-6 text-sm">
                        <div>
                          <span className="block text-slate-500 dark:text-slate-500 text-[10px] uppercase font-semibold tracking-wider">Role</span>
                          <span className="text-slate-800 dark:text-slate-200 font-medium">{project.role}</span>
                        </div>
                        <div className="hidden sm:block">
                          <span className="block text-slate-500 dark:text-slate-500 text-[10px] uppercase font-semibold tracking-wider">Outcome</span>
                          <span className="text-green-600 dark:text-green-400 font-medium text-sm">{project.outcome}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-primary text-sm font-bold hidden sm:inline-flex items-center gap-1">
                          View Details
                          <span className="material-symbols-outlined text-lg">arrow_forward</span>
                        </span>
                        <a
                          href={project.links?.code}
                          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
                          title="View Code"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="material-symbols-outlined text-xl">code</span>
                        </a>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goPrev}
          className="absolute left-4 sm:left-8 lg:left-16 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-surface-light/90 dark:bg-surface-dark/90 border border-slate-200 dark:border-slate-700 shadow-lg backdrop-blur-sm text-slate-700 dark:text-slate-200 hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 hover:scale-110"
          aria-label="Previous project"
        >
          <span className="material-symbols-outlined text-2xl">chevron_left</span>
        </button>
        <button
          onClick={goNext}
          className="absolute right-4 sm:right-8 lg:right-16 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-surface-light/90 dark:bg-surface-dark/90 border border-slate-200 dark:border-slate-700 shadow-lg backdrop-blur-sm text-slate-700 dark:text-slate-200 hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 hover:scale-110"
          aria-label="Next project"
        >
          <span className="material-symbols-outlined text-2xl">chevron_right</span>
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {projects.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`
              rounded-full transition-all duration-300
              ${idx === currentIndex
                ? 'w-8 h-2.5 bg-primary shadow-md shadow-primary/30'
                : 'w-2.5 h-2.5 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
              }
            `}
            aria-label={`Go to project ${idx + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="text-center mt-4">
        <span className="text-sm font-mono text-slate-500 dark:text-slate-400">
          <span className="text-primary font-bold">{String(currentIndex + 1).padStart(2, '0')}</span>
          <span className="mx-1">/</span>
          {String(total).padStart(2, '0')}
        </span>
      </div>

      {/* Modal — Preserved from original */}
      <AnimatePresence>
        {selectedId !== null && selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-slate-900/60 dark:bg-slate-900/80 backdrop-blur-md z-[100]"
            />
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-6 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="bg-surface-light dark:bg-surface-dark w-full max-w-6xl h-[85vh] rounded-3xl overflow-hidden pointer-events-auto border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col md:flex-row"
              >
                {/* Left: Image */}
                <div className="relative w-full md:w-1/2 h-[30vh] md:h-full shrink-0">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900/40 to-transparent"></div>
                  <button
                    onClick={() => setSelectedId(null)}
                    className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-colors"
                  >
                    <span className="material-symbols-outlined block">close</span>
                  </button>
                </div>
                
                {/* Right: Content */}
                <div className="flex-1 flex flex-col justify-between p-6 md:p-8 overflow-hidden">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getBadgeColors(selectedProject.badgeColor)}`}>
                        {selectedProject.badge}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
                      {selectedProject.title}
                    </h3>
                    
                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mb-6 leading-relaxed line-clamp-3">
                      {selectedProject.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-lg">problem</span>
                          The Problem
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                          {selectedProject.deepDive?.problem || selectedProject.challenge}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                          <span className="material-symbols-outlined text-[var(--color-violet-accent)] text-lg">lightbulb</span>
                          The Approach
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                          {selectedProject.deepDive?.approach || "Designed and developed a scalable, interactive solution."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 border-t border-slate-200 dark:border-slate-800 pt-5 mt-auto shrink-0">
                    {selectedProject.links?.live && (
                      <a
                        href={selectedProject.links.live}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-bold text-white shadow-lg shadow-[var(--color-primary)]/25 transition-all hover:bg-primary-hover hover:translate-y-[-2px] flex-1 md:flex-none"
                      >
                        Launch App
                        <span className="material-symbols-outlined ml-2 text-[16px]">open_in_new</span>
                      </a>
                    )}
                    {selectedProject.links?.code && (
                      <a
                        href={selectedProject.links.code}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-6 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex-1 md:flex-none"
                      >
                        <span className="material-symbols-outlined mr-2 text-[16px]">code</span>
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
