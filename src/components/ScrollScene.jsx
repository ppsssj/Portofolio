import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const depthMap = {
  flat: 0,
  soft: 18,
  medium: 32,
  strong: 48,
};

export default function ScrollScene({
  children,
  className = "",
  tone = "primary",
  depth = "medium",
}) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const range = depthMap[depth] ?? depthMap.medium;
  const isFlat = range === 0;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "end 8%"],
  });

  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], [range, 0, -range]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.14, 0.86, 1], [0.35, 1, 1, 0.45]);
  const contentScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.985, 1, 0.99]);

  const auraY = useTransform(scrollYProgress, [0, 1], [range * 0.55, -range * 0.55]);
  const auraOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.42, 0.42, 0]);

  const y = useSpring(contentY, { stiffness: 145, damping: 27, mass: 0.25 });
  const opacity = useSpring(contentOpacity, { stiffness: 145, damping: 27, mass: 0.25 });
  const scale = useSpring(contentScale, { stiffness: 145, damping: 27, mass: 0.25 });
  const glowY = useSpring(auraY, { stiffness: 110, damping: 28, mass: 0.3 });
  const glowOpacity = useSpring(auraOpacity, { stiffness: 110, damping: 28, mass: 0.3 });

  return (
    <div ref={ref} className={`scroll-scene ${className}`.trim()}>
      {!isFlat && (
        <motion.div
          aria-hidden
          className="scroll-scene__aura"
          data-tone={tone}
          style={prefersReducedMotion ? undefined : { y: glowY, opacity: glowOpacity }}
        />
      )}

      <motion.div
        className="scroll-scene__content"
        style={prefersReducedMotion || isFlat ? undefined : { y, opacity, scale }}
      >
        {children}
      </motion.div>
    </div>
  );
}
