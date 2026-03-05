import { useEffect, useState } from "react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import CoreFocus from "./components/CoreFocus";
import Stack from "./components/Stack";
import Projects from "./components/Projects";
import CTA from "./components/CTA";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollScene from "./components/ScrollScene";

import Intro from "./components/Intro";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  // ESC로 스킵
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setShowIntro(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  if (showIntro) {
    return <Intro onSkip={() => setShowIntro(false)} />;
  }

  const scenes = [
    { key: "hero", tone: "primary", depth: "strong", node: <Hero /> },
    { key: "core-focus", tone: "violet", depth: "medium", node: <CoreFocus /> },
    { key: "stack", tone: "cyan", depth: "soft", node: <Stack /> },
    { key: "projects", tone: "violet", depth: "flat", node: <Projects /> },
    { key: "cta", tone: "primary", depth: "medium", node: <CTA /> },
    { key: "contact", tone: "cyan", depth: "soft", node: <Contact /> },
  ];

  return (
    <div className="scroll-stage bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased min-h-screen flex flex-col w-full">
      <Header />
      <main className="flex-grow w-full">
        {scenes.map((scene) => (
          <ScrollScene
            key={scene.key}
            tone={scene.tone}
            depth={scene.depth}
            className="scroll-stage__scene"
          >
            {scene.node}
          </ScrollScene>
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default App;
