'use client';

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion';
import { ExternalLink, Eye, Plus } from 'lucide-react';
import Image from 'next/image';
import { type MouseEvent, useId, useRef, useState } from 'react';

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const projects = [
  {
    id: 1,
    slug: 'labelyon',
    title: 'Labelyon',
    subtitle: 'AI Label Design + E-commerce Platform',
    description:
      'Built a Canva-like label design tool inside the website with AI image generator for label design. Features dynamic price calculator, complete e-commerce order system, Razorpay payment gateway, real-time chat support, admin panel, invoice generation, and email automation.',
    features: [
      'Canva-like label design tool',
      'AI image generator for designs',
      'Dynamic price calculator',
      'Complete e-commerce system',
      'Real-time chat support',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'WebSocket', 'Razorpay', 'AI API'],
    link: 'https://labelyon.com',
    github: null,
    bgColor: 'bg-gradient-to-br from-black via-neutral-900 to-amber-900',
    panelBg: 'from-neutral-900 via-emerald-950 to-black',
    innerPanel: 'from-black via-neutral-950 to-neutral-900',    
    accentColor: 'text-amber-400',    
    accentBar: 'bg-amber-500',    
    borderColor: 'border-amber-500/40',    
    cardRing: 'from-amber-400 via-yellow-500 to-emerald-700',
    railColors: { from: '#f59e0b', via: '#eab308', to: '#10b981', ring: '#f59e0b' },
  },
  {
    id: 2,
    slug: 'aqua2promo',
    title: 'Aqua2Promo',
    subtitle: '3D Product Preview Platform',
    description:
      'Built a 3D bottle preview system using Three.js where users can upload label design and see preview on bottle. Includes contract signing system, contact and booking system, admin dashboard, and email automation.',
    features: [
      '3D bottle preview with Three.js',
      'Label design upload & preview',
      'Contract signing system',
      'Admin dashboard',
    ],
    tech: ['React.js', 'Node.js', 'Three.js', 'Express.js', 'MongoDB'],
    link: 'https://aqua2promo.com',
    github: null,
    bgColor: 'bg-gradient-to-br from-sky-400 via-blue-500 to-cyan-700',
    panelBg: 'from-blue-500 via-cyan-600 to-sky-900',
    innerPanel: 'from-blue-950/95 via-neutral-950 to-black',
    accentColor: 'text-cyan-300',
    accentBar: 'bg-cyan-400',
    borderColor: 'border-cyan-400/40',
    cardRing: 'from-sky-400 via-cyan-500 to-blue-700',
    railColors: { from: '#38bdf8', via: '#06b6d4', to: '#2563eb', ring: '#38bdf8' },
  },
  {
    id: 3,
    slug: 'careconnect',
    title: 'CareConnect',
    subtitle: 'Medical Appointment Platform',
    description:
      'Complete MERN stack appointment platform with dashboards for Patient, Doctor, and Admin. Features Clerk authentication, appointment tracking, Razorpay payment system, and Cloudinary for document upload.',
    features: [
      'Multi-role dashboards',
      'Clerk authentication',
      'Appointment tracking',
      'Razorpay payments',
    ],
    tech: ['MERN Stack', 'Clerk', 'Razorpay', 'Cloudinary'],
    link: null,
    github: 'https://github.com/PRATIKSINDHIYA/careconnect',
    bgColor: 'bg-gradient-to-br from-teal-400 to-cyan-600',
    panelBg: 'from-teal-500 via-cyan-600 to-sky-900',
    innerPanel: 'from-teal-950/90 via-neutral-950 to-black',
    accentColor: 'text-teal-300',
    accentBar: 'bg-teal-400',
    borderColor: 'border-teal-400/40',
    cardRing: 'from-teal-300 via-cyan-400 to-blue-500',
    railColors: { from: '#2dd4bf', via: '#22d3ee', to: '#3b82f6', ring: '#2dd4bf' },
  },
  {
    id: 4,
    slug: 'railway',
    title: 'Railway System',
    subtitle: 'Train Ticket Booking Platform',
    description:
      'Built a complete train ticket booking system with admin dashboard for train management and passenger dashboard for booking. Includes Cashfree payment gateway and email ticket system.',
    features: [
      'Train ticket booking',
      'Admin & Passenger dashboards',
      'Cashfree payment gateway',
      'Email ticket system',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MySQL'],
    link: null,
    github: 'https://github.com/PRATIKSINDHIYA/RailwayManagementSystem',
    bgColor: 'bg-gradient-to-br from-green-500 to-teal-700',
    panelBg: 'from-green-600 via-teal-600 to-cyan-900',
    innerPanel: 'from-green-950/90 via-neutral-950 to-black',
    accentColor: 'text-green-400',
    accentBar: 'bg-green-500',
    borderColor: 'border-green-500/40',
    cardRing: 'from-green-400 via-cyan-500 to-blue-600',
    railColors: { from: '#22c55e', via: '#06b6d4', to: '#2563eb', ring: '#22c55e' },
  },
  {
    id: 5,
    slug: 'creditcardfraud',
    title: 'Fraud Detection',
    subtitle: 'AI/ML Credit Card Fraud Detection',
    description:
      'Built ML models for fraud detection, compared multiple algorithms performance, and performed data preprocessing and analysis using Logistic Regression, KNN, Decision Tree, and SVM.',
    features: [
      'Multiple ML models',
      'Algorithm comparison',
      'Data preprocessing',
      'Performance analysis',
    ],
    tech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn'],
    link: null,
    github: 'https://github.com/PRATIKSINDHIYA/CreditCardFraudDetection-AIML',
    bgColor: 'bg-gradient-to-br from-darkblue-500 via-indigo-600 to-cyan-700',
    panelBg: 'from-darkblue-600 via-indigo-700 to-sky-900',
    innerPanel: 'from-darkblue-950/90 via-slate-950 to-black',    
    accentColor: 'text-cyan-300',    
    accentBar: 'bg-cyan-400',    
    borderColor: 'border-cyan-400/40',    
    cardRing: 'from-blue-400 via-cyan-500 to-indigo-600',
    railColors: { from: '#60a5fa', via: '#06b6d4', to: '#4f46e5', ring: '#60a5fa' },
  },
];

type Project = (typeof projects)[number];

function projectImage(slug: string, variant: 'homemobile' | 'aboutmobile' | 'homelaptop') {
  return `/images/projectimages/${slug}-${variant}.png`;
}

function projectTarget(project: Project) {
  return project.link ?? project.github ?? null;
}

function ProjectInfo({ project }: { project: Project }) {
  return (
    <div className="max-w-xl space-y-5">
      <div className="flex items-center gap-3">
        <span className={`h-1 w-10 rounded-full ${project.accentBar}`} />
        <h3 className="text-3xl m-bold tracking-tight text-white md:text-4xl lg:text-[2.75rem] lg:leading-tight">
          {project.title}
        </h3>
      </div>

      <p className="text-sm leading-relaxed text-neutral-400 md:text-base">{project.description}</p>

      <ul className="space-y-2.5">
        {project.features.map((feature, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 text-sm text-neutral-200 md:text-[15px]"
          >
            <Plus
              className={`mt-0.5 h-4 w-4 shrink-0 ${project.accentColor}`}
              strokeWidth={2.5}
            />
            {feature}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2 pt-1">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className={`rounded-full border bg-neutral-950/90 px-3 py-1.5 text-xs font-medium text-neutral-200 ${project.borderColor}`}
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-3">
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-950 transition-colors hover:bg-white"
          >
            Visit Project
            <ExternalLink className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-600 px-5 py-2.5 text-sm font-medium text-neutral-200 transition-colors hover:border-neutral-400 hover:text-white"
          >
            <GitHubIcon className="h-4 w-4" />
            View Code
          </a>
        )}
      </div>
    </div>
  );
}

function GradientFrame({
  ringClass,
  children,
  className = '',
}: {
  ringClass: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br p-[1px] shadow-2xl ${ringClass} ${className}`}
    >
      {children}
    </div>
  );
}

function ProjectImageCursor({ visible, x, y }: { visible: boolean; x: number; y: number }) {
  const textPathId = useId();
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute z-30 hidden lg:block"
      style={{ left: x, top: y }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.85 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        <div className="relative flex h-[108px] w-[108px] items-center justify-center rounded-full border border-white/25 bg-black/55 shadow-[0_0_20px_rgba(0,0,0,0.35)] backdrop-blur-md">
          <svg className="absolute inset-0 h-full w-full animate-[spin_8s_linear_infinite]" viewBox="0 0 100 100">
            <defs>
              <path id={textPathId} d="M 50,50 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0" />
            </defs>
            <text fill="white" fontSize="9" letterSpacing="1.8" className="uppercase">
              <textPath href={`#${textPathId}`} startOffset="0%">
                Visit Project • Visit Project •
              </textPath>
            </text>
          </svg>
          <Eye className="h-5 w-5 text-white" />
        </div>
      </div>
    </motion.div>
  );
}

function HoverImageFrame({
  children,
  className = '',
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string | null;
}) {
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const commonProps = {
    className: `group relative block h-full w-full overflow-hidden rounded-[1.6rem] ${className}`,
    onMouseEnter: () => setCursorVisible(true),
    onMouseLeave: () => setCursorVisible(false),
    onMouseMove: (e: MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    },
  };

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...commonProps}>
        <ProjectImageCursor visible={cursorVisible} x={cursorPos.x} y={cursorPos.y} />
        {children}
      </a>
    );
  }

  return (
    <div {...commonProps}>
      <ProjectImageCursor visible={cursorVisible} x={cursorPos.x} y={cursorPos.y} />
      {children}
    </div>
  );
}

function ProjectGallery({ project }: { project: Project }) {
  return (
    // Image-1 like layout:
    // left column: 2 stacked cards (top + bottom)
    // right column: 1 card spanning both rows
    <div className="grid h-[360px] w-full grid-cols-[0.78fr_1.22fr] grid-rows-2 gap-2 md:h-[440px] md:gap-3 md:grid-cols-[0.6fr_1.1fr]">
      {/* Top-left */}
      <GradientFrame ringClass={project.cardRing}>
        <HoverImageFrame href={projectTarget(project)}>
          <Image
            src={projectImage(project.slug, 'homemobile')}
            alt={`${project.title} mobile`}
            fill
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.05]"
            sizes="(max-width: 768px) 46vw, 260px"
            priority
          />
        </HoverImageFrame>
      </GradientFrame>

      {/* Right (spans 2 rows) */}
      <GradientFrame ringClass={project.cardRing} className="row-span-2">
        <HoverImageFrame href={projectTarget(project)}>
          <Image
            src={projectImage(project.slug, 'homelaptop')}
            alt={`${project.title} laptop`}
            fill
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 72vw, 520px"
            priority
          />
        </HoverImageFrame>
      </GradientFrame>

      {/* Bottom-left */}
      <GradientFrame ringClass={project.cardRing}>
        <HoverImageFrame href={projectTarget(project)}>
          <Image
            src={projectImage(project.slug, 'aboutmobile')}
            alt={`${project.title} about mobile`}
            fill
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.05]"
            sizes="(max-width: 768px) 46vw, 260px"
          />
        </HoverImageFrame>
      </GradientFrame>
    </div>
  );
}

function MobileProjectPreview({ project }: { project: Project }) {
  return (
    <GradientFrame ringClass={project.cardRing} className="w-full">
      <div className="relative h-[220px] w-full overflow-hidden rounded-[1.6rem] sm:h-[280px]">
        <Image
          src={projectImage(project.slug, 'homelaptop')}
          alt={`${project.title} laptop`}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 92vw, 560px"
          priority
        />
      </div>
    </GradientFrame>
  );
}

function MilestoneRail({
  scrollYProgress,
  project,
}: {
  scrollYProgress: MotionValue<number>;
  project: Project;
}) {
  const thumbTop = useTransform(scrollYProgress, [0, 1], ['14%', '86%']);

  return (
    <div className="relative h-full w-full max-w-[3.5rem]">
      <div className="absolute inset-x-1/2 top-[6%] bottom-[6%] w-px -translate-x-1/2 rounded-full bg-neutral-800" />
      <motion.div
        className="absolute left-1/2 top-[6%] w-[3px] origin-top rounded-full"
        style={{
          scaleY: scrollYProgress,
          height: '88%',
          backgroundImage: `linear-gradient(to bottom, ${project.railColors.from}, ${project.railColors.via}, ${project.railColors.to})`,
          boxShadow: `0 0 22px ${project.railColors.from}88`,
        }}
      />
      <motion.div
        className="absolute left-1/2 z-20 w-14 -translate-x-1/2"
        style={{ top: thumbTop }}
      >
        <div className="-translate-y-1/2">
          <div
            className="relative mx-auto h-14 w-14 overflow-hidden rounded-full border-[3px] bg-neutral-900 ring-2 ring-black/50"
            style={{
              borderColor: `${project.railColors.ring}f2`,
              boxShadow: `0 0 28px ${project.railColors.ring}88`,
            }}
          >
            <Image
              src="/images/pratik-profile.png"
              alt=""
              width={56}
              height={56}
              className="h-full w-full object-cover"
              sizes="56px"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  const scrollRootRef = useRef<HTMLDivElement>(null);
  const n = projects.length;
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: scrollRootRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const idx = Math.min(n - 1, Math.max(0, Math.floor(latest * n)));
    setActiveIndex((prev) => (prev === idx ? prev : idx));
  });

  return (
    <section id="projects" className="section-surface relative bg-[#0b0b0b]">
      {/* <div className="mx-auto max-w-7xl px-4 pt-20 text-center md:px-6 md:pt-24"></div> */}
      <div className="mx-auto max-w-[86rem] px-4 pt-20 text-center sm:px-6 md:pt-24">
        <p className="text-xs font-medium tracking-[0.35em] text-neutral-500 uppercase">
          Featured Work
        </p>
        <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
          My{' '}
          <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text font-serif italic text-transparent">
            Projects
          </span>
        </h2>
      </div>

      <div
        ref={scrollRootRef}
        className="relative mx-auto mt-10 max-w-[86rem] px-4 pb-20 sm:px-6 md:mt-12 md:pb-28"
      >
        {/* Mobile / tablet: natural scroll — info then cards per project */}
        <div className="flex flex-col gap-0 lg:hidden">
          {projects.map((project) => (
            <article
              key={project.id}
              className="border-t border-white/[0.06] py-12 first:border-t-0 first:pt-6"
            >
              <ProjectInfo project={project} />
              <div className="mt-8">
                <MobileProjectPreview project={project} />
              </div>
            </article>
          ))}
        </div>

        {/* Desktop: left text fixed (sticky) — instant project swap from scroll; only right column scrolls rows */}
        <div className="hidden lg:flex lg:items-start lg:gap-3 lg:pt-4">
          <div className="sticky top-28 z-20 w-[min(100%,26rem)] shrink-0 self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-0">
            <ProjectInfo
              key={activeIndex}
              project={projects[activeIndex]}
            />
          </div>

          <div
            className="relative shrink-0 border-x border-white/[0.04]"
            style={{ minHeight: `${n * 100}vh` }}
            aria-hidden
          >
            <div className="sticky top-28 flex h-[calc(100vh-7rem)] w-[52px] justify-center pt-1">
              <MilestoneRail
                scrollYProgress={scrollYProgress}
                project={projects[activeIndex]}
              />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            {projects.map((project, i) => (
              <div
                key={`R-${project.id}`}
                className={`flex min-h-[100svh] flex-col justify-center py-12 ${i === 0 ? 'pt-4' : 'border-t border-white/[0.06]'}`}
              >
                <ProjectGallery project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
