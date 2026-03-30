import HeroScrollytelling from '@/components/HeroScrollytelling';
import AboutSection from '@/components/AboutSection';
import WatchSection from '@/components/WatchSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-[#0b0b0b]">
      <HeroScrollytelling />
      <AboutSection />
      <WatchSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}
