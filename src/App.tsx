import { useEffect, useState } from "react";
import { SmoothScroll } from "./components/layout/SmoothScroll";
import { CustomCursor } from "./components/layout/CustomCursor";
import { NoiseOverlay } from "./components/layout/NoiseOverlay";
import { ScrollProgress } from "./components/layout/ScrollProgress";
import { Preloader } from "./components/layout/Preloader";
import { HeroContact } from "./components/sections/HeroContact";
import { MusicPlayer } from "./components/sections/MusicPlayer";
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
      <main>
        <HeroContact />
        <MusicPlayer />
      </main>
      <Footer />
    </SmoothScroll>
  );
}

export default App;
