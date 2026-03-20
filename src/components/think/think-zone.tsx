import Link from "next/link";
import { thinkCards } from "@/lib/content";

export function ThinkZone() {
  return (
    <section id="think" aria-labelledby="think-heading" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <h2
          id="think-heading"
          className="font-mono text-xs tracking-widest text-[var(--color-muted)] uppercase"
        >
          What I Think
        </h2>
        <p className="mt-2 text-3xl font-medium tracking-tight md:text-4xl">
          Writing about building, leading, and learning
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {thinkCards.map((card) => (
            <article
              key={card.title}
              className="group rounded-xl border border-white/[0.08] p-6 transition-colors duration-300 hover:border-white/[0.16] hover:bg-white/[0.02]"
            >
              <h3 className="text-lg font-medium tracking-tight">
                {card.title}
              </h3>

              <div className="mt-3 flex flex-wrap gap-2">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-white/[0.06] px-2 py-0.5 font-mono text-xs text-[var(--color-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mt-4 inline-block rounded-full border border-white/[0.08] px-3 py-1 font-mono text-xs text-[var(--color-muted)]">
                Coming soon
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-sm text-[var(--color-muted)] transition-colors duration-200 hover:text-[var(--color-accent)]"
          >
            View all posts
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
