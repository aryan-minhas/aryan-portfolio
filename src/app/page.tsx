import HeroSection       from '@/components/home/HeroSection';
import StatsBar          from '@/components/home/StatsBar';
import FeaturedProjects  from '@/components/home/FeaturedProjects';
import TechStack         from '@/components/home/TechStack';
import CallToAction      from '@/components/home/CallToAction';

export default function HomePage() {
  return (
    <>
      {/* ── § 1: Hero ────────────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── § 2: Stats Bar ───────────────────────────────────────────────────── */}
      <StatsBar />

      {/* ── § 3: Featured Projects ───────────────────────────────────────────── */}
      <FeaturedProjects />

      {/* ── § 4: Tech Stack Ticker ───────────────────────────────────────────── */}
      <TechStack />

      {/* ── § 5: Call to Action ──────────────────────────────────────────────── */}
      <CallToAction />
    </>
  );
}
