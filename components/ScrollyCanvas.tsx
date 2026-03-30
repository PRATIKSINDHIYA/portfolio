'use client';

import { useEffect, useRef, useState } from 'react';
import { useMotionValueEvent, MotionValue } from 'framer-motion';

interface ScrollyCanvasProps {
  scrollYProgress: MotionValue<number>;
  onProgress?: (percent: number) => void;
  onLoadComplete?: () => void;
}

const TOTAL_FRAMES = 174;

export default function ScrollyCanvas({
  scrollYProgress,
  onProgress,
  onLoadComplete,
}: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const currentFrameRef = useRef(0);
  const onProgressRef = useRef(onProgress);
  const onLoadCompleteRef = useRef(onLoadComplete);

  useEffect(() => {
    onProgressRef.current = onProgress;
    onLoadCompleteRef.current = onLoadComplete;
  }, [onProgress, onLoadComplete]);

  useEffect(() => {
    let isMounted = true;
    const imgs: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loadedCount = 0;

    const report = () => {
      const pct = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));
      onProgressRef.current?.(pct);
    };

    const tryFinish = () => {
      if (!isMounted || loadedCount !== TOTAL_FRAMES) return;
      setImages([...imgs]);
      setLoaded(true);
      onProgressRef.current?.(100);
      onLoadCompleteRef.current?.();
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const indexStr = String(i).padStart(3, '0');
      img.src = `/sequence/frame_${indexStr}_delay-0.041s.webp`;
      img.onload = () => {
        if (!isMounted) return;
        imgs[i] = img;
        loadedCount++;
        report();
        tryFinish();
      };
      img.onerror = () => {
        if (!isMounted) return;
        console.error(`Failed to load frame ${i}`);
        imgs[i] = img;
        loadedCount++;
        report();
        tryFinish();
      };
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = images[index];
    if (!img) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const imgAspect = img.width / img.height;
    const canvasAspect = canvas.width / canvas.height;
    let renderWidth, renderHeight, x, y;

    if (canvasAspect > imgAspect) {
      renderWidth = canvas.width;
      renderHeight = canvas.width / imgAspect;
      x = 0;
      y = (canvas.height - renderHeight) / 2;
    } else {
      renderHeight = canvas.height;
      renderWidth = canvas.height * imgAspect;
      y = 0;
      x = (canvas.width - renderWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, renderWidth, renderHeight);
  };

  useEffect(() => {
    const handleResize = () => {
      if (loaded && images.length > 0) {
        renderFrame(currentFrameRef.current);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- renderFrame uses latest canvas closure
  }, [loaded, images]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!loaded || images.length === 0) return;
    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.floor(latest * TOTAL_FRAMES))
    );
    if (frameIndex !== currentFrameRef.current) {
      currentFrameRef.current = frameIndex;
      renderFrame(frameIndex);
    }
  });

  useEffect(() => {
    if (loaded && images.length > 0) {
      renderFrame(currentFrameRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, images]);

  return (
    <div className="absolute inset-0 bg-[#0b0b0b]">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}
