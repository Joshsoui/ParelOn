import { useEffect, useState } from "react";
import { SmoothScroll } from "./components/layout/SmoothScroll";
import { CustomCursor } from "./components/layout/CustomCursor";
import { NoiseOverlay } from "./components/layout/NoiseOverlay";
import { ScrollProgress } from "./components/layout/ScrollProgress";
import { Preloader } from "./components/layout/Preloader";
import { Navbar } from "./components/sections/Navbar";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Services } from "./components/sections/Services";
import { MusicPlayer } from "./components/sections/MusicPlayer";
import { Contact } from "./components/sections/Contact";
import { Footer } from "./components/sections/Footer";

const MIN_LOAD_MS = 1100;

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.style.overflow = loading ? "hidden" : "";
    const timer = setTimeout(() => setLoading(false), MIN_LOAD_MS);
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <SmoothScroll>
      <Preloader show={loading} />
      <CustomCursor />
      <NoiseOverlay />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero ready={!loading} />
        <About />
        <Services />
        <MusicPlayer />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}

export default App;
