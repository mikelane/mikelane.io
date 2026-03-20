import { Hero } from "@/components/hero/hero";
import { StickyNav } from "@/components/navigation/sticky-nav";
import { BuildZone } from "@/components/build/build-zone";
import { LeadZone } from "@/components/lead/lead-zone";
import { ThinkZone } from "@/components/think/think-zone";
import { ContactFooter } from "@/components/contact/contact-footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <StickyNav />
      <BuildZone />
      <LeadZone />
      <ThinkZone />
      <ContactFooter />
    </main>
  );
}
