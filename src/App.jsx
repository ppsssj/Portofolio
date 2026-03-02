import Header from './components/Header';
import Hero from './components/Hero';
import CoreFocus from './components/CoreFocus';
import Stack from './components/Stack';
import Projects from './components/Projects';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';


function App() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased min-h-screen flex flex-col w-full">
      <Header />
      <main className="flex-grow w-full">
        <Hero />
        <CoreFocus />
        <Stack />
        <Projects />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
