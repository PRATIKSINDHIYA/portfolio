'use client';

import { useRef, useState, useCallback } from 'react';
import { useScroll } from 'framer-motion';
import ScrollyCanvas from './ScrollyCanvas';
import Overlay from './Overlay';
import Preloader from './Preloader';

export default function HeroScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showPreloader, setShowPreloader] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [assetsReady, setAssetsReady] = useState(false);

  const handleProgress = useCallback((p: number) => setLoadProgress(p), []);
  const handleLoadComplete = useCallback(() => setAssetsReady(true), []);
  const dismissPreloader = useCallback(() => setShowPreloader(false), []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative w-full h-[500vh] bg-[#0b0b0b]">
      {showPreloader && (
        <Preloader
          progress={loadProgress}
          complete={assetsReady}
          onDismiss={dismissPreloader}
        />
      )}
      <div className="sticky top-0 w-full h-screen overflow-x-hidden overflow-y-visible">
        <ScrollyCanvas
          scrollYProgress={scrollYProgress}
          onProgress={handleProgress}
          onLoadComplete={handleLoadComplete}
        />
        <Overlay scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}
