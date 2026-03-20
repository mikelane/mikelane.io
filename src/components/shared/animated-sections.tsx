"use client";

import { FadeInOnScroll } from "./fade-in-on-scroll";
import { BuildZone } from "@/components/build/build-zone";
import { LeadZone } from "@/components/lead/lead-zone";
import { ThinkZone } from "@/components/think/think-zone";
import { ContactFooter } from "@/components/contact/contact-footer";

export function AnimatedSections() {
  return (
    <>
      <FadeInOnScroll>
        <BuildZone />
      </FadeInOnScroll>
      <FadeInOnScroll delay={0.1}>
        <LeadZone />
      </FadeInOnScroll>
      <FadeInOnScroll delay={0.1}>
        <ThinkZone />
      </FadeInOnScroll>
      <FadeInOnScroll delay={0.1}>
        <ContactFooter />
      </FadeInOnScroll>
    </>
  );
}
