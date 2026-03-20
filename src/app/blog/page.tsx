import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { thinkCards } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing about building, leading, and learning — from AI platforms to Rust performance to making technology accessible.",
};

function PlaceholderCard({ title, tags }: { title: string; tags: string[] }) {
  return (
    <article className="group rounded-xl border border-white/[0.08] p-6 transition-colors duration-300 hover:border-white/[0.16] hover:bg-white/[0.02]">
      <h3 className="text-lg font-medium tracking-tight">{title}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
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
  );
}

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <header className="mb-12">
        <h1 className="font-mono text-xs tracking-widest text-[var(--color-muted)] uppercase">
          What I Think
        </h1>
        <p className="mt-2 text-3xl font-medium tracking-tight md:text-4xl">
          Writing about building, leading, and learning
        </p>
      </header>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <article className="rounded-xl border border-white/[0.08] p-6 transition-colors duration-300 group-hover:border-white/[0.16] group-hover:bg-white/[0.02]">
                <h2 className="text-lg font-medium tracking-tight">
                  {post.title}
                </h2>
                {post.description && (
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                    {post.description}
                  </p>
                )}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-white/[0.06] px-2 py-0.5 font-mono text-xs text-[var(--color-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.readTime && (
                    <span className="font-mono text-xs text-[var(--color-muted)]/60">
                      {post.readTime}
                    </span>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {thinkCards.map((card) => (
            <PlaceholderCard
              key={card.title}
              title={card.title}
              tags={card.tags}
            />
          ))}
        </div>
      )}
    </>
  );
}
