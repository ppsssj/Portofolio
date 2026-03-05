import { useState, useEffect, useCallback, useRef } from "react";
import { projects } from "../data/portfolioData";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

export default function Projects() {
  const { language } = useLanguage();
  const t = translations[language].projects;

  const sectionRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);

  const selectedProject = selectedId !== null ? projects[selectedId] : null;
  const total = projects.length;
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.3,
  });
  // Keep scroll-based rotation, and move the deck itself downward with scroll.
  const stageY = useTransform(smoothProgress, [0, 1], [0, 120]);
  const headerY = useTransform(smoothProgress, [0, 1], [0, 120]);
  const panelY = useTransform(smoothProgress, [0, 1], [-72, 1528]);
  const darkenOpacity = useTransform(smoothProgress, [0, 1], [0, 0.58]);
  const [scrollIndex, setScrollIndex] = useState(0);

  useEffect(() => {
    if (selectedId !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedId]);

  const handleKeyDown = useCallback(
    (e) => {
      if (selectedId !== null || isDesktop) return;
      if (e.key === "ArrowRight") setCurrentIndex((prev) => (prev + 1) % total);
      if (e.key === "ArrowLeft") setCurrentIndex((prev) => (prev - 1 + total) % total);
    },
    [selectedId, total, isDesktop],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (!isDesktop || selectedId !== null || total <= 1) return;
    const floatIndex = Math.max(0, Math.min(total - 1, latest * (total - 1)));
    const next = Math.round(floatIndex);
    setScrollIndex(floatIndex);
    setCurrentIndex((prev) => (prev === next ? prev : next));
  });

  const goTo = (idx) => setCurrentIndex(idx);
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + total) % total);
  const goNext = () => setCurrentIndex((prev) => (prev + 1) % total);

  const scrollToProjectIndex = useCallback(
    (idx) => {
      if (!isDesktop || !sectionRef.current || total <= 1) {
        setCurrentIndex(idx);
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const scrollableHeight = Math.max(1, rect.height - window.innerHeight);
      const progress = idx / (total - 1);
      const targetY = sectionTop + scrollableHeight * progress;

      window.scrollTo({ top: targetY, behavior: "smooth" });
    },
    [isDesktop, total],
  );

  const handleCardClick = useCallback(
    (idx, isCenter) => {
      if (isCenter) {
        setSelectedId(idx);
        return;
      }
      scrollToProjectIndex(idx);
    },
    [scrollToProjectIndex],
  );

  const getBadgeColors = (colorScheme) => {
    switch (colorScheme) {
      case "blue":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";
      case "violet":
        return "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300";
      default:
        return "bg-slate-100 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300";
    }
  };

  const getCardStyle = (idx) => {
    const baseIndex = isDesktop ? scrollIndex : currentIndex;
    let offset = idx - baseIndex;
    if (offset > Math.floor(total / 2)) offset -= total;
    if (offset < -Math.floor(total / 2)) offset += total;

    const isCenter = Math.abs(offset) < 0.45;
    const absOffset = Math.abs(offset);

    if (absOffset > 2.2) {
      return {
        x: offset > 0 ? "120%" : "-120%",
        scale: 0.5,
        z: -400,
        rotateY: offset > 0 ? -45 : 45,
        opacity: 0,
        zIndex: 0,
        filter: "blur(8px)",
        isInteractive: false,
      };
    }

    const clamped = Math.min(absOffset, 2);
    return {
      x: `${offset * 38}%`,
      scale: 1 - clamped * 0.22,
      z: -clamped * 170,
      rotateY: offset * -12,
      opacity: 1 - clamped * 0.35,
      zIndex: isCenter ? 30 : clamped < 1.4 ? 20 : 10,
      filter: `blur(${clamped * 2}px)`,
      isInteractive: clamped <= 1.4,
    };
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background-light dark:bg-background-dark"
      id="projects"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-primary/[0.07] to-transparent dark:from-primary/[0.12] z-0" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-slate-950 z-[1]"
        style={prefersReducedMotion ? { opacity: 0.35 } : { opacity: darkenOpacity }}
      />

      <div className="relative z-10 lg:min-h-[300vh]">
        <motion.div
          className="relative py-24 lg:sticky lg:top-16"
          style={prefersReducedMotion ? undefined : { y: stageY }}
        >
          <motion.div
            className="relative z-[80] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            style={prefersReducedMotion ? undefined : { y: headerY }}
          >
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                  {t.heading}
                </h2>
                <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                  {t.subheading}
                </p>
              </div>
              <a
                href="#"
                className="hidden sm:inline-flex items-center text-primary font-medium hover:text-primary-hover transition-colors"
              >
                {t.viewArchive}
                <span className="material-symbols-outlined ml-1">arrow_right_alt</span>
              </a>
            </div>

            <div className="hidden lg:flex items-center gap-4 mb-8 px-3 py-2 rounded-xl bg-slate-900/35 backdrop-blur-sm border border-slate-700/40">
              <span className="text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                {t.scrub}
              </span>
              <div className="h-1.5 flex-1 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <motion.div
                  className="h-full w-full origin-left bg-gradient-to-r from-primary to-[var(--color-violet-accent)]"
                  style={prefersReducedMotion ? undefined : { scaleX: smoothProgress }}
                />
              </div>
              <span className="text-sm font-mono text-slate-500 dark:text-slate-400">
                {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>
          </motion.div>

          <motion.div
            className="relative z-20 w-full mt-14 lg:mt-24"
            style={prefersReducedMotion ? { perspective: "1200px" } : { perspective: "1200px", y: panelY }}
          >
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
                      type: "spring",
                      stiffness: 260,
                      damping: 30,
                      mass: 0.8,
                    }}
                    style={{
                      zIndex: style.zIndex,
                      transformStyle: "preserve-3d",
                      pointerEvents: style.isInteractive ? "auto" : "none",
                    }}
                    onClick={() => handleCardClick(idx, isCenter)}
                  >
                    <div
                      className={`
                        rounded-2xl overflow-hidden
                        bg-surface-light dark:bg-surface-dark
                        border border-slate-200 dark:border-slate-800
                        shadow-2xl
                        transition-shadow duration-300
                        ${isCenter ? "shadow-primary/10 dark:shadow-primary/20 ring-1 ring-primary/10" : ""}
                      `}
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent z-10"></div>
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                        <div className="absolute top-4 left-4 z-20">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm ${getBadgeColors(project.badgeColor)}`}
                          >
                            {project.badge}
                          </span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                          <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">{project.title}</h3>
                          <p className="text-sm text-slate-200 line-clamp-2 drop-shadow-md">
                            {project.description}
                          </p>
                        </div>
                      </div>

                      {isCenter && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15, duration: 0.3 }}
                          className="px-6 py-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800"
                        >
                          <div className="flex items-center gap-6 text-sm">
                            <div>
                              <span className="block text-slate-500 dark:text-slate-500 text-[10px] uppercase font-semibold tracking-wider">
                                {t.role}
                              </span>
                              <span className="text-slate-800 dark:text-slate-200 font-medium">{project.role}</span>
                            </div>
                            <div className="hidden sm:block">
                              <span className="block text-slate-500 dark:text-slate-500 text-[10px] uppercase font-semibold tracking-wider">
                                {t.outcome}
                              </span>
                              <span className="text-green-600 dark:text-green-400 font-medium text-sm">
                                {project.outcome}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-primary text-sm font-bold hidden sm:inline-flex items-center gap-1">
                              {t.viewDetails}
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

            <button
              onClick={goPrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-surface-light/90 dark:bg-surface-dark/90 border border-slate-200 dark:border-slate-700 shadow-lg backdrop-blur-sm text-slate-700 dark:text-slate-200 hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 hover:scale-110 lg:hidden"
              aria-label="Previous project"
            >
              <span className="material-symbols-outlined text-2xl">chevron_left</span>
            </button>
            <button
              onClick={goNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-surface-light/90 dark:bg-surface-dark/90 border border-slate-200 dark:border-slate-700 shadow-lg backdrop-blur-sm text-slate-700 dark:text-slate-200 hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 hover:scale-110 lg:hidden"
              aria-label="Next project"
            >
              <span className="material-symbols-outlined text-2xl">chevron_right</span>
            </button>
          </motion.div>

          <div className="flex justify-center items-center gap-2 mt-8 lg:hidden">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`
                  rounded-full transition-all duration-300
                  ${idx === currentIndex
                    ? "w-8 h-2.5 bg-primary shadow-md shadow-primary/30"
                    : "w-2.5 h-2.5 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"}
                `}
                aria-label={`Go to project ${idx + 1}`}
              />
            ))}
          </div>

          <div className="text-center mt-4 lg:hidden">
            <span className="text-sm font-mono text-slate-500 dark:text-slate-400">
              <span className="text-primary font-bold">{String(currentIndex + 1).padStart(2, "0")}</span>
              <span className="mx-1">/</span>
              {String(total).padStart(2, "0")}
            </span>
          </div>
        </motion.div>
      </div>

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
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-surface-light dark:bg-surface-dark w-full max-w-6xl h-[85vh] rounded-3xl overflow-hidden pointer-events-auto border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col md:flex-row"
              >
                <div className="relative w-full md:w-1/2 h-[30vh] md:h-full shrink-0">
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900/40 to-transparent"></div>
                  <button
                    onClick={() => setSelectedId(null)}
                    className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-colors"
                  >
                    <span className="material-symbols-outlined block">close</span>
                  </button>
                </div>

                <div className="flex-1 flex flex-col justify-between p-6 md:p-8 overflow-hidden">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getBadgeColors(selectedProject.badgeColor)}`}
                      >
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
                          {t.problem}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                          {selectedProject.deepDive?.problem || selectedProject.challenge}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                          <span className="material-symbols-outlined text-[var(--color-violet-accent)] text-lg">
                            lightbulb
                          </span>
                          {t.approach}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                          {selectedProject.deepDive?.approach ||
                            t.approachFallback}
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
                        {t.launchApp}
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
                        {t.sourceCode}
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
