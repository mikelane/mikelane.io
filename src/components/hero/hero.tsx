import { hero } from "@/lib/content";
import { TypedCompletions } from "./typed-completions";
import { ScrollIndicator } from "./scroll-indicator";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-6"
    >
      {/* Subtle radial gradient behind the hero text */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(245, 158, 11, 0.06), transparent)",
        }}
      />

      <div className="relative z-10 max-w-4xl text-center">
        <h1 className="text-5xl font-medium tracking-[-0.04em] md:text-7xl">
          {hero.name}
        </h1>

        <p className="mt-6 text-xl leading-relaxed text-[var(--color-muted)] md:mt-8 md:text-2xl">
          I build tools that make complex systems
        </p>
        <p className="text-xl font-medium md:text-2xl">
          <TypedCompletions />
        </p>

        <p className="mx-auto mt-8 max-w-lg font-mono text-sm text-[var(--color-muted)] md:mt-12">
          {hero.proof}
        </p>
      </div>

      <ScrollIndicator />
    </section>
  );
}
