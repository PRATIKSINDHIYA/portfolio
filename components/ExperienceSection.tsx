'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Calendar, MapPin, Briefcase } from 'lucide-react';
import Image from 'next/image';

const experiences = [
  {
    id: 1,
    company: 'Lyfex SkillTech Private Limited',
    role: 'SDE Intern',
    duration: 'Dec 2025 - Present',
    location: 'Remote',
    website: 'https://thelyfex.com',
    type: 'Full-time',
    description:
      'Building real-time video conferencing platform using SFU architecture with MediaSoup, developing live teaching platform, and implementing multiple subscription plans system.',
    achievements: [
      'Built real-time video conferencing platform using SFU architecture (MediaSoup)',
      'Created topic-based discussion rooms with live communication',
      'Developed live teaching platform with paid sessions for creators',
      'Implemented multiple subscription plans system',
      'Built freelancer-client collaboration module',
      'Implemented live chat using WebSocket',
      'Developed JWT authentication and role-based dashboards',
      'Built earning + withdrawal system for creators',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'MediaSoup', 'WebRTC', 'JWT', 'WebSocket'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    company: 'ManMa Services Private Limited',
    role: 'Full Stack Web Developer Intern',
    duration: 'Feb 2025 - Oct 2025',
    location: 'Remote',
    website: 'https://manmadigital.com',
    type: 'Full-time',
    description:
      'Built course selling platform with payment integration and job hiring platform with profile creation system. Worked on multiple platforms including ManMa Digital and Crowd2Capital.',
    achievements: [
      'Built course selling platform with Razorpay payment integration',
      'Implemented 1% initial payment system',
      'Developed multiple admin dashboards',
      'Created AI blog generator system',
      'Built real-time student mentor chat system',
      'Developed job hiring platform with resume auto-fill',
      'Implemented swipe-based hiring system',
      'Applied SEO optimization and meta tags',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Firebase', 'JWT', 'Razorpay', 'Cashfree'],
    color: 'from-orange-500 to-pink-500',
  },
];

const educationData = [
  {
    id: 'edu-1',
    institution: 'Indian Institute of Information Technology Vadodara (IIITV)',
    degree: 'B.Tech Computer Science',
    duration: '2022 - 2026',
    location: 'Gandhinagar, India',
    highlight: 'College',
    image: '/images/IIITV.png',
    imageAlt: 'IIIT Vadodara Gandhinagar campus',
  },
  {
    id: 'edu-2',
    institution: 'Allen Career Institute',
    degree: 'JEE / Engineering Preparation',
    duration: '2021 - 2022',
    location: 'Kota, India',
    highlight: '1 Year Drop',
    image: '/images/ALLENS.png',
    imageAlt: 'Allen Career Institute building',
  },
  {
    id: 'edu-3',
    institution: 'Shri Bajpai Convent Higher Secondary School',
    degree: 'Nursery to 12th',
    duration: '2006 - 2021',
    location: 'India',
    highlight: 'Schooling',
    image: '/images/SBCHSS.jpg',
    imageAlt: 'School campus',
  },
] as const;

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="section-surface relative w-full bg-[#0b0b0b] py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-sm tracking-[0.3em] text-neutral-400 uppercase font-medium">
            Work Experience
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 text-white">
            Where I&apos;ve{' '}
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent italic">
              Worked
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500 via-pink-500 to-purple-500 opacity-30" />

          {/* Experience Cards */}
          <div className="space-y-16 relative">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-50px' }}
                className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 ${
                  index % 2 === 0 ? '' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-[calc(-0.5px)] md:left-1/2 top-8 w-4 h-4 -translate-x-1/2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 border-4 border-[#0b0b0b] z-10 shadow-[0_0_10px_#f97316]" />

                {/* Content */}
                <div
                  className={`pl-8 md:pl-0 ${
                    index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:col-start-2 md:pl-16'
                  }`}
                >
                  <div
                    className={`space-y-4 ${
                      index % 2 === 0 ? 'md:items-end' : 'md:items-start'
                    }`}
                  >
                    {/* Company & Role */}
                    <div>
                      <h3 className="text-2xl font-bold text-white">{exp.company}</h3>
                      <p className="text-lg text-neutral-400 mt-1">{exp.role}</p>
                    </div>

                    {/* Meta info */}
                    <div
                      className={`flex flex-wrap gap-4 text-sm text-neutral-500 ${
                        index % 2 === 0 ? 'md:justify-end' : ''
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {exp.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4" />
                        {exp.type}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-neutral-500 leading-relaxed">{exp.description}</p>

                    {/* Achievements */}
                    <ul
                      className={`space-y-2 ${
                        index % 2 === 0 ? 'md:text-right' : ''
                      }`}
                    >
                      {exp.achievements.slice(0, 4).map((achievement, i) => (
                        <li
                          key={i}
                          className={`flex items-start gap-2 text-neutral-400 text-sm ${
                            index % 2 === 0 ? 'md:flex-row-reverse' : ''
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 mt-2 bg-gradient-to-r ${exp.color} rounded-full flex-shrink-0`}
                          />
                          {achievement}
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack */}
                    <div
                      className={`flex flex-wrap gap-2 pt-2 ${
                        index % 2 === 0 ? 'md:justify-end' : ''
                      }`}
                    >
                      {exp.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium bg-neutral-900 border border-neutral-800 rounded-full text-neutral-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Website Link */}
                    <a
                      href={exp.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors ${
                        index % 2 === 0 ? 'md:flex-row-reverse' : ''
                      }`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Visit Website
                    </a>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                {index % 2 === 0 && <div className="hidden md:block" />}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education — alternating text / image like work experience rows */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <div className="mb-16 text-center">
            <span className="text-sm font-medium tracking-[0.3em] text-neutral-400 uppercase">
              Education
            </span>
            <h3 className="mt-4 text-3xl font-bold text-white md:text-5xl">
              Academic{' '}
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text italic text-transparent">
                Journey
              </span>
            </h3>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 hidden w-px bg-gradient-to-b from-orange-500 via-pink-500 to-purple-500 opacity-25 md:left-1/2 md:block" />

            <div className="space-y-20 md:space-y-24">
              {educationData.map((edu, i) => {
                const textOnLeft = i % 2 === 0;

                const textBlock = (
                  <motion.div
                    initial={{ opacity: 0, x: textOnLeft ? -48 : 48 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, margin: '-80px' }}
                    className={`relative order-1 p-4 sm:p-6 md:order-none md:p-8 ${
                      textOnLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'
                    }`}
                  >
                    <div
                      className={`relative rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 transition-colors hover:bg-neutral-900/70 md:p-8 ${
                        textOnLeft ? 'md:ml-auto md:max-w-xl' : 'md:mr-auto md:max-w-xl'
                      }`}
                    >
                      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-gradient-to-br from-orange-500/5 to-pink-500/5 blur-xl" />
                      <div
                        className={`relative flex flex-col gap-3 ${textOnLeft ? 'md:items-end' : ''}`}
                      >
                        <h4 className="text-xl font-bold text-white md:text-2xl">{edu.institution}</h4>
                        <p className="font-medium text-orange-400">{edu.degree}</p>
                        <div
                          className={`flex flex-wrap gap-4 text-sm text-neutral-500 ${
                            textOnLeft ? 'md:justify-end' : ''
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 shrink-0 text-neutral-400" />
                            {edu.duration}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4 shrink-0 text-neutral-400" />
                            {edu.location}
                          </span>
                        </div>
                        {edu.highlight ? (
                          <div
                            className={`mt-2 inline-block w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold ${
                              textOnLeft ? 'md:ml-auto' : ''
                            }`}
                          >
                            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                              {edu.highlight}
                            </span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </motion.div>
                );

                const imageBlock = (
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: textOnLeft ? 56 : -56,
                      rotateY: textOnLeft ? -22 : 22,
                      rotateZ: textOnLeft ? -4 : 4,
                      scale: 0.94,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      rotateY: 0,
                      rotateZ: 0,
                      scale: 1,
                    }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, margin: '-80px' }}
                    className={`relative order-2 mx-auto w-full max-w-xl [perspective:1400px] ${
                      textOnLeft ? 'md:order-2' : 'md:order-1'
                    }`}
                  >
                    <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl [transform-style:preserve-3d]">
                      <Image
                        src={edu.image}
                        alt={edu.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 480px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />
                    </div>
                  </motion.div>
                );

                return (
                  <div
                    key={edu.id}
                    className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12"
                  >
                    <div className="pointer-events-none absolute left-1/2 top-8 z-10 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-[#0b0b0b] bg-gradient-to-r from-orange-500 to-pink-500 shadow-[0_0_10px_#f97316] md:block" />

                    {textBlock}
                    {imageBlock}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
