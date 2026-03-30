'use client';

import { motion, MotionValue, useTransform } from 'framer-motion';

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  // Section 1: 0% - 15% (Blur and Scale)
  const sec1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.15], [1, 1, 0]);
  const sec1Y = useTransform(scrollYProgress, [0, 0.15], [0, -50]);
  const sec1Scale = useTransform(scrollYProgress, [0, 0.15], [1, 1.05]);
  const sec1BlurValue = useTransform(scrollYProgress, [0, 0.05, 0.15], [0, 0, 20]);
  const sec1Blur = useTransform(sec1BlurValue, (v) => `blur(${v}px)`);
  const sec1Display = useTransform(scrollYProgress, (v) => (v > 0.16 ? "none" : "flex"));

  // Section 2: 20% - 35% (Fade and Slide Up - Bottom Left)
  const sec2Opacity = useTransform(scrollYProgress, [0.15, 0.25, 0.35], [0, 1, 0]);
  const sec2Y = useTransform(scrollYProgress, [0.15, 0.25, 0.35], [50, 0, -50]);
  const sec2Display = useTransform(scrollYProgress, (v) => (v < 0.14 || v > 0.36 ? "none" : "flex"));

  // Section 3: right stack — higher on screen, slightly longer scroll window
  const sec3Opacity = useTransform(scrollYProgress, [0.35, 0.45, 0.57], [0, 1, 0]);
  const sec3X1 = useTransform(scrollYProgress, [0.35, 0.45, 0.57], [50, 0, -50]);
  const sec3X2 = useTransform(scrollYProgress, [0.37, 0.45, 0.57], [50, 0, -50]);
  const sec3X3 = useTransform(scrollYProgress, [0.39, 0.45, 0.57], [50, 0, -50]);
  const sec3X4 = useTransform(scrollYProgress, [0.41, 0.45, 0.57], [50, 0, -50]);
  const sec3Display = useTransform(scrollYProgress, (v) => (v < 0.34 || v > 0.58 ? "none" : "flex"));

  // Section 4: left bottom — after MERN ends; opacity-only (no display MotionValue)
  const sec4Opacity = useTransform(scrollYProgress, [0.58, 0.68, 0.80], [0, 1, 0]);
  const sec4Y = useTransform(scrollYProgress, [0.58, 0.68, 0.80], [28, 0, -28]);

  // Section 5: mouse hint — after “Building real world”
  const sec5Opacity = useTransform(scrollYProgress, [0.78, 0.87, 0.96], [0, 1, 0]);
  const sec5Display = useTransform(scrollYProgress, (v) => (v < 0.77 || v > 0.96 ? "none" : "flex"));

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <motion.div
        style={{ opacity: sec1Opacity, y: sec1Y, scale: sec1Scale, filter: sec1Blur, display: sec1Display }}
        className="absolute inset-0 flex-col items-center text-center justify-center w-full px-6"
      >
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-white drop-shadow-2xl">
          Pratik Sindhiya
        </h1>
        <p className="mt-4 text-xl md:text-2xl font-light text-white/80 tracking-widest uppercase text-shadow-md">
          Full Stack Developer | AI Agents developer
        </p>
      </motion.div>

      <motion.div
        style={{ opacity: sec2Opacity, y: sec2Y, display: sec2Display }}
        className="absolute bottom-16 md:bottom-24 left-4 md:left-12 flex-col text-left pl-4 pr-6"
      >
        <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white drop-shadow-xl text-balance">
          I build modern
          <br />
          <span className="text-white/60">web applications</span>
        </h2>
      </motion.div>

      <motion.div
        style={{ opacity: sec3Opacity, display: sec3Display }}
        className="absolute top-[42%] md:top-[40%] right-4 md:right-12 flex-col items-end text-right px-6"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight drop-shadow-xl space-y-4">
          <motion.div style={{ x: sec3X1 }} className="text-white">MERN Stack</motion.div>
          <motion.div style={{ x: sec3X2 }} className="text-white/80">Next.js</motion.div>
          <motion.div style={{ x: sec3X3 }} className="text-white/60">AI Integration</motion.div>
          <motion.div style={{ x: sec3X4 }} className="text-white/40">Realtime Systems</motion.div>
        </h2>
      </motion.div>

      <motion.div
        style={{ opacity: sec4Opacity, y: sec4Y }}
        className="absolute bottom-30 md:bottom-24 left-4 md:left-12 z-11 flex flex-col text-left pl-4 pr-6"
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-xl text-balance">
          Building real world
          <br />
          <span className="text-white/60 md:text-6xl">AI Agents & Automation</span>
        </h2>
      </motion.div>


      <motion.div
        style={{ opacity: sec5Opacity, display: sec5Display }}
        className="absolute inset-x-0 bottom-10 md:bottom-16 flex justify-center px-6"
        aria-hidden
      >
        <div className="relative h-7 w-[13px] rounded-[10px] border border-white/40">
          <motion.div
            className="absolute left-1/2 top-1.5 h-1 w-1 -translate-x-1/2 rounded-full bg-white/55"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
