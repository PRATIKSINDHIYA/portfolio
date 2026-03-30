'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

// Skill icons as SVG components with proper colors
const skillsData = [
  { name: 'HTML', color: '#E34F26', icon: 'html' },
  { name: 'CSS', color: '#1572B6', icon: 'css' },
  { name: 'JavaScript', color: '#F7DF1E', icon: 'js' },
  { name: 'ReactJS', color: '#61DAFB', icon: 'react' },
  { name: 'NextJS', color: '#FFFFFF', icon: 'next' },
  { name: 'TypeScript', color: '#3178C6', icon: 'ts' },
  { name: 'Tailwind CSS', color: '#06B6D4', icon: 'tailwind' },
  { name: 'Motion', color: '#F7DF1E', icon: 'motion' },
  { name: 'Node.js', color: '#339933', icon: 'node' },
  { name: 'ExpressJS', color: '#FFFFFF', icon: 'express' },
  { name: 'MongoDB', color: '#47A248', icon: 'mongo' },
  { name: 'PostgreSQL', color: '#4169E1', icon: 'postgres' },
  { name: 'MySQL', color: '#4479A1', icon: 'mysql' },
  { name: 'Prisma', color: '#FFFFFF', icon: 'prisma' },
  { name: 'WebRTC', color: '#FF6B6B', icon: 'webrtc' },
  { name: 'WebSocket', color: '#F7DF1E', icon: 'websocket' },
  { name: 'Three.js', color: '#FFFFFF', icon: 'three' },
  { name: 'Git', color: '#F05032', icon: 'git' },
  { name: 'GitHub', color: '#FFFFFF', icon: 'github' },
  { name: 'Vercel', color: '#FFFFFF', icon: 'vercel' },
  { name: 'Render', color: '#46E3B7', icon: 'render' },
  { name: 'Railway', color: '#C1A9FF', icon: 'railway' },
  { name: 'Hostinger', color: '#673DE6', icon: 'hostinger' },
  { name: 'Docker', color: '#2496ED', icon: 'docker' },
  { name: 'Firebase', color: '#FFCA28', icon: 'firebase' },
  { name: 'Supabase', color: '#3ECF8E', icon: 'supabase' },
  { name: 'Razorpay', color: '#2B6DEF', icon: 'razorpay' },
  { name: 'AWS', color: '#FF9900', icon: 'aws' },
  { name: 'Oracle', color: '#F80000', icon: 'oracle' },
  { name: 'Postman', color: '#FF6C37', icon: 'postman' },
  { name: 'Python', color: '#3776AB', icon: 'python' },
  { name: 'C', color: '#A8B9CC', icon: 'c' },
  { name: 'Java', color: '#ED8B00', icon: 'java' },
  { name: 'SQL', color: '#336791', icon: 'sql' },
  { name: 'REST API', color: '#FF6B6B', icon: 'api' },
  { name: 'JWT', color: '#D63AFF', icon: 'jwt' },
  { name: 'Clerk', color: '#6C47FF', icon: 'clerk' },
];

// Simple icon component
const SkillIcon = ({ icon, color }: { icon: string; color: string }) => {
  const icons: Record<string, React.ReactNode> = {
    html: <span className="text-xs font-bold" style={{ color }}>H</span>,
    css: <span className="text-xs font-bold" style={{ color }}>C</span>,
    js: <span className="text-xs font-bold" style={{ color }}>JS</span>,
    react: (
      <svg viewBox="0 0 24 24" fill={color} className="w-4 h-4">
        <circle cx="12" cy="12" r="2.5"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke={color} strokeWidth="1"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke={color} strokeWidth="1" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke={color} strokeWidth="1" transform="rotate(120 12 12)"/>
      </svg>
    ),
    next: <span className="text-xs font-bold" style={{ color }}>N</span>,
    ts: <span className="text-xs font-bold" style={{ color }}>TS</span>,
    tailwind: (
      <svg viewBox="0 0 24 24" fill={color} className="w-4 h-4">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
      </svg>
    ),
    motion: <span className="text-xs font-bold" style={{ color }}>M</span>,
    node: (
      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
    ),
    express: <span className="text-xs font-bold" style={{ color }}>Ex</span>,
    mongo: (
      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
    ),
    postgres: (
      <svg viewBox="0 0 24 24" fill={color} className="w-4 h-4">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      </svg>
    ),
    mysql: (
      <svg viewBox="0 0 24 24" fill={color} className="w-4 h-4">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      </svg>
    ),
    prisma: (
      <svg viewBox="0 0 24 24" fill={color} className="w-4 h-4">
        <path d="M21.8 18.4L13.4 3.2c-.3-.6-1-.8-1.6-.5-.2.1-.4.3-.5.5L2.2 18.4c-.3.6-.1 1.3.5 1.6.2.1.4.2.6.2h17.3c.7 0 1.2-.5 1.2-1.2 0-.2-.1-.4-.2-.6z"/>
      </svg>
    ),
    webrtc: <span className="text-xs font-bold" style={{ color }}>RTC</span>,
    websocket: <span className="text-xs font-bold" style={{ color }}>WS</span>,
    three: <span className="text-xs font-bold" style={{ color }}>3D</span>,
    git: (
      <svg viewBox="0 0 24 24" fill={color} className="w-4 h-4">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    github: (
      <svg viewBox="0 0 24 24" fill={color} className="w-4 h-4">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    vercel: (
      <svg viewBox="0 0 24 24" fill={color} className="w-4 h-4">
        <path d="M12 2L2 19.5h20L12 2z"/>
      </svg>
    ),
    render: <span className="text-xs font-bold" style={{ color }}>R</span>,
    railway: <span className="text-xs font-bold" style={{ color }}>RW</span>,
    hostinger: <span className="text-[10px] font-bold" style={{ color }}>H</span>,
    docker: (
      <svg viewBox="0 0 24 24" fill={color} className="w-4 h-4">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
      </svg>
    ),
    firebase: (
      <svg viewBox="0 0 24 24" fill={color} className="w-4 h-4">
        <path d="M12 2L2 19.5h20L12 2z"/>
      </svg>
    ),
    python: (
      <svg viewBox="0 0 24 24" fill={color} className="w-4 h-4">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
      </svg>
    ),
    supabase: <span className="text-xs font-bold" style={{ color }}>S</span>,
    razorpay: <span className="text-[10px] font-bold" style={{ color }}>RP</span>,
    aws: <span className="text-xs font-bold" style={{ color }}>AWS</span>,
    oracle: <span className="text-xs font-bold" style={{ color }}>O</span>,
    postman: <span className="text-[10px] font-bold" style={{ color }}>PM</span>,
    c: <span className="text-xs font-bold" style={{ color }}>C</span>,
    java: <span className="text-xs font-bold" style={{ color }}>J</span>,
    sql: <span className="text-xs font-bold" style={{ color }}>SQL</span>,
    api: <span className="text-xs font-bold" style={{ color }}>API</span>,
    jwt: <span className="text-xs font-bold" style={{ color }}>JWT</span>,
    clerk: <span className="text-xs font-bold" style={{ color }}>C</span>,
  };

  return <>{icons[icon] || <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />}</>;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  /* Scroll through section: flower rotates with scroll (reverses when scrolling back) */
  const flowerRotate = useTransform(scrollYProgress, [0, 1], [-120, 120]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-surface relative w-full overflow-hidden bg-[#0b0b0b] py-20 md:py-28"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
        {/* Header — 3D flower centered behind title (screen blend drops flat black from asset) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="relative mb-16 text-center md:mb-20"
        >
          <motion.div
            aria-hidden
            style={{ rotate: flowerRotate }}
            className="pointer-events-none absolute left-1/2 top-[52%] z-0 h-[min(62vw,240px)] w-[min(62vw,240px)] -translate-x-1/2 -translate-y-1/2 md:top-[50%] md:h-[min(48vw,300px)] md:w-[min(48vw,300px)] lg:top-[48%] lg:h-[320px] lg:w-[320px]"
          >
            <div className="relative h-full w-full mix-blend-screen opacity-[0.72] saturate-125">
              <Image
                src="/images/3d-flower.png"
                alt=""
                fill
                sizes="(max-width: 768px) 240px, 320px"
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          <div className="relative z-10 pt-8 md:pt-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="inline-block text-sm font-medium tracking-[0.3em] text-neutral-400 uppercase"
            >
              My Skillset
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
            >
              The Magic{' '}
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text font-serif italic text-transparent">
                Behind
              </span>
            </motion.h2>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-3 md:gap-4"
        >
          {skillsData.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.08, 
                y: -4,
                boxShadow: `0 10px 40px -10px ${skill.color}40`
              }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center justify-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/80 px-3 py-2.5 transition-all duration-300 cursor-default backdrop-blur-sm hover:border-neutral-600 hover:bg-neutral-800/80 sm:justify-start sm:gap-2.5 sm:px-5 sm:py-3"
              style={{
                transitionDelay: `${index * 20}ms`,
              }}
            >
              <div className="flex items-center justify-center w-5 h-5">
                <SkillIcon icon={skill.icon} color={skill.color} />
              </div>
              <span className="whitespace-nowrap text-xs font-medium text-neutral-300 transition-colors group-hover:text-white sm:text-sm">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 gap-6 text-center md:mt-24 md:grid-cols-4 md:gap-8"
        >
          {[
            { label: 'Projects Completed', value: '10+' },
            { label: 'Months Experience', value: '12+' },
            { label: 'Technologies', value: '36+' },
            { label: 'Happy Clients', value: '5+' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="space-y-2"
            >
              <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-neutral-500 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
