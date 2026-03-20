import { leadNarrative } from "@/lib/content";
import { CareerRings } from "./career-rings";

export function LeadZone() {
  return (
    <section id="lead" aria-labelledby="lead-heading" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <h2 id="lead-heading" className="font-mono text-xs tracking-widest text-[var(--color-muted)] uppercase">
          How I Lead
        </h2>
        <p className="mt-2 text-3xl font-medium tracking-tight md:text-4xl">
          From individual systems to organizational impact
        </p>

        <div className="mt-12">
          <CareerRings />
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-lg leading-relaxed text-[var(--color-muted)]">
          {leadNarrative}
        </p>
      </div>
    </section>
  );
}
