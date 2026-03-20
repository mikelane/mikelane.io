import { buildCards } from "@/lib/content";

export function BuildZone() {
  return (
    <section id="build" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-mono text-xs tracking-widest text-[var(--color-muted)] uppercase">
          What I Build
        </h2>
        <p className="mt-2 text-3xl font-medium tracking-tight md:text-4xl">
          Systems that scale, tools that simplify
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {buildCards.map((card) => (
            <article
              key={card.title}
              className="group rounded-xl border border-white/[0.08] p-6 transition-colors duration-300 hover:border-white/[0.16] hover:bg-white/[0.02]"
            >
              <h3 className="text-lg font-medium tracking-tight">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                {card.description}
              </p>

              <div className="mt-4 inline-flex items-center rounded-full border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/10 px-3 py-1">
                <span className="font-mono text-xs text-[var(--color-accent)]">
                  {card.metric}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {card.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-white/[0.06] px-2 py-0.5 font-mono text-xs text-[var(--color-muted)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
