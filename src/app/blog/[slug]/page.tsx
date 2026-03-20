import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <header className="mb-8">
        <h1 className="text-3xl font-medium tracking-tight md:text-4xl">
          {post.title}
        </h1>
        {post.description && (
          <p className="mt-3 text-lg text-[var(--color-muted)]">
            {post.description}
          </p>
        )}
        <div className="mt-4 flex flex-wrap items-center gap-3">
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
      </header>

      <div className="prose-workshop">
        {/* MDX content will be rendered via the MDX loader in a future iteration.
            For now, blog posts are listed but raw content is shown as a placeholder. */}
        <div
          className="text-[var(--color-muted)] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
}
