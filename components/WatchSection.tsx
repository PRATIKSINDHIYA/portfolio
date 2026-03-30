'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { MapPin, Linkedin, Github, Twitter } from 'lucide-react';

const SLIDER_IMAGES = [
  '/images/pratik-third.png',
  '/images/pratik-profile.png',
  '/images/pratik-second.png',
] as const;

export default function WatchSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const sliderX = useTransform(scrollYProgress, [0, 1], ['2%', '-52%']);

  /** Same clock angles on server + first client paint — real time only after mount (avoids hydration mismatch). */
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    let rafId = 0;
    const tick = () => {
      setTime(new Date());
      rafId = window.requestAnimationFrame(tick);
    };
    tick();
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  const secondsDegrees = time == null ? 0 : ((time.getSeconds() + time.getMilliseconds() / 1000) / 60) * 360;
  const minutesDegrees =
    time == null
      ? 0
      : ((time.getMinutes() + (time.getSeconds() + time.getMilliseconds() / 1000) / 60) / 60) * 360;
  const hoursDegrees =
    time == null
      ? 0
      : ((time.getHours() % 12 + time.getMinutes() / 60) / 12) * 360;
  const localTimeLabel =
    time == null ? '--:--' : time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // 60 ticks; hour numerals at 12,1,…,11 (top = 12 o'clock)
  const markers = Array.from({ length: 60 }).map((_, i) => {
    const isHour = i % 5 === 0;
    const hourLabel = isHour ? (i === 0 ? 12 : i / 5) : null;
    return (
      <div
        key={i}
        className="absolute top-0 bottom-0 left-1/2 -ml-[0.5px] w-px origin-center"
        style={{ transform: `rotate(${i * 6}deg)` }}
      >
        <div
          className={`mx-auto bg-neutral-500 ${
            isHour ? 'w-[2px] h-3 mt-1' : 'w-px h-1.5 mt-2 opacity-50'
          }`}
        />
        {hourLabel != null && (
          <span
            className="absolute left-1/2 top-[1.35rem] text-[10px] font-mono tabular-nums text-neutral-400 sm:text-[11px]"
            style={{ transform: `translateX(-50%) rotate(${-i * 6}deg)` }}
          >
            {hourLabel}
          </span>
        )}
      </div>
    );
  });

  return (
    <section
      ref={containerRef}
      id="craft"
      className="section-surface relative w-full border-y border-white/5 bg-[#0b0b0b] py-20 md:py-28"
    >
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 md:px-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        {/* Watch — centered; labels don’t overflow on narrow screens */}
        <motion.div
          className="flex w-full flex-col items-center justify-center"
        >
          <div className="relative flex flex-col items-center gap-8 sm:gap-10 lg:flex-row lg:items-center lg:gap-8">
            {/* Profile Card — left of clock on desktop */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="relative w-[min(100vw-2rem,300px)] rounded-[2rem] border border-white/10 bg-gradient-to-b from-neutral-900/90 to-black/90 p-5 shadow-2xl backdrop-blur-xl sm:w-[360px] lg:w-[320px]"
            >
              <h3 className="text-3xl font-bold tracking-tight text-white">
                Pratik <span className="font-serif italic text-white/70">Sindhiya</span>
              </h3>
              <div className="mt-2 flex items-center gap-2 text-sm font-mono text-neutral-400">
                <MapPin className="h-3.5 w-3.5" />
                Gandhinagar, IN - {localTimeLabel}
              </div>

              <div className="relative mt-8 overflow-hidden rounded-3xl [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
                <motion.ul
                  style={{ x: sliderX }}
                  className="flex w-max items-end gap-3 py-1"
                >
                  {[...SLIDER_IMAGES, ...SLIDER_IMAGES].map((src, i) => {
                    return (
                      <li
                        key={`${src}-${i}`}
                        className="relative h-44 w-28 list-none shrink-0 overflow-hidden rounded-3xl border border-white/10 shadow-xl sm:h-48 sm:w-[7.5rem]"
                      >
                        <Image
                          src={src}
                          alt="Pratik"
                          fill
                          className="object-cover"
                          sizes="120px"
                        />
                      </li>
                    );
                  })}
                </motion.ul>
              </div>

              <div className="mt-8 border-t border-white/10 pt-4">
                <div className="flex items-center justify-center gap-5 text-neutral-300">
                  <a href="https://linkedin.com/in/pratiksindhiya" target="_blank" rel="noreferrer" className="hover:text-white"><Linkedin className="h-5 w-5" /></a>
                  <a href="https://github.com/pratiksindhiya" target="_blank" rel="noreferrer" className="hover:text-white"><Github className="h-5 w-5" /></a>
                  <a href="https://x.com/PrateekSindhiya" target="_blank" rel="noreferrer" className="hover:text-white"><Twitter className="h-5 w-5" /></a>
                </div>
              </div>
            </motion.div>

            <div className="relative mx-auto hidden aspect-square w-[min(100vw-2rem,300px)] shrink-0 sm:w-[380px] md:block md:w-[400px]">
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-white/5 rounded-full blur-[100px]" />

              {/* Watch Case */}
              <div className="absolute inset-0 rounded-full border border-neutral-800 bg-gradient-to-br from-neutral-900 via-black to-neutral-900 shadow-2xl overflow-hidden backdrop-blur-3xl">
                {/* Inner ring */}
                <div className="absolute inset-2 rounded-full border border-white/5 bg-black/50" />

                {/* Center dot */}
                <div className="absolute top-1/2 left-1/2 z-50 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-neutral-600 bg-neutral-800">
                  <div className="absolute inset-1 rounded-full bg-white shadow-[0_0_10px_white]" />
                </div>

                {/* Watch Markers */}
                <div className="pointer-events-none absolute inset-0">{markers}</div>

                {/* Hands — shared pivot at dial center */}
                <div className="pointer-events-none absolute inset-0">
                  <div
                    className="absolute bottom-1/2 left-1/2 h-[22%] w-[6px] -ml-[3px] origin-bottom rounded-full bg-neutral-300 shadow-[0_0_15px_rgba(255,255,255,0.2)] sm:h-[24%]"
                    style={{ transform: `rotate(${hoursDegrees}deg)` }}
                  />
                  <div
                    className="absolute bottom-1/2 left-1/2 h-[32%] w-[4px] -ml-[2px] origin-bottom rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.4)] sm:h-[34%]"
                    style={{ transform: `rotate(${minutesDegrees}deg)` }}
                  />
                  <div
                    className="absolute bottom-1/2 left-1/2 z-40 h-[36%] w-[2px] -ml-px origin-bottom rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] sm:h-[38%]"
                    style={{ transform: `rotate(${secondsDegrees}deg)` }}
                  />
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="w-[min(100vw-2rem,300px)] rounded-[1.6rem] border border-white/10 bg-gradient-to-b from-neutral-900/90 to-black/90 p-5 shadow-2xl sm:w-[320px]"
            >
              <div className="flex items-center justify-between">
                <div className="h-6 w-6 rounded-full border border-white/20" />
                <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[11px] text-emerald-300">
                  Available for work
                </span>
              </div>

              <h3 className="mt-10 text-4xl font-bold leading-tight text-white">
                LET&apos;S BUILD
                <br />
                SOMETHING
                <br />
                <span className="font-serif italic text-white/70">that actually works.</span>
              </h3>

              <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 font-serif text-base leading-tight italic text-white sm:text-lg break-all">
                pratiksindhiya3@gmail.com
              </div>
              <a
                href="mailto:pratiksindhiya3@gmail.com?subject=Let%27s%20build%20something&body=Hi%20Pratik%2C%0A%0AI%20want%20to%20discuss%20a%20project.%0A"
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-neutral-200"
              >
                CONNECT NOW
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <div
        className="pointer-events-none absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-emerald-500/15 to-transparent"
        aria-hidden
      />
    </section>
  );
}
