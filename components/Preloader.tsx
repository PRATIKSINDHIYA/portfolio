'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PreloaderProps {
  progress: number;
  complete: boolean;
  onDismiss: () => void;
}

export default function Preloader({ progress, complete, onDismiss }: PreloaderProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!complete) return;
    const t = window.setTimeout(() => setFadeOut(true), 320);
    return () => window.clearTimeout(t);
  }, [complete]);

  useEffect(() => {
    if (!fadeOut) return;
    const t = window.setTimeout(onDismiss, 580);
    return () => window.clearTimeout(t);
  }, [fadeOut, onDismiss]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black px-6"
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex w-full max-w-md flex-col items-center gap-8">
        <h1 className="text-center text-5xl font-bold tracking-tight text-white md:text-7xl">
          Pratik.
        </h1>

        <div className="w-full space-y-3">
          <div className="h-px w-full overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full bg-white transition-[width] duration-200 ease-out"
              style={{ width: `${Math.min(100, progress)}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500 md:text-xs">
            <span>Loading experience</span>
            <span>{Math.min(100, progress)}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
