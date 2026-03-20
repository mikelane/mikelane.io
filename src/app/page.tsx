import { Hero } from "@/components/hero/hero";
import { StickyNav } from "@/components/navigation/sticky-nav";
import { AnimatedSections } from "@/components/shared/animated-sections";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <StickyNav />
      <AnimatedSections />
    </main>
  );
}
