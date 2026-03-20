import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="text-3xl font-medium tracking-tight mt-8 mb-4"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="text-2xl font-medium tracking-tight mt-8 mb-3"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="text-xl font-medium tracking-tight mt-6 mb-2"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="text-base leading-relaxed text-[var(--color-muted)] mb-4"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="font-mono text-sm bg-white/[0.06] rounded px-1.5 py-0.5"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="font-mono text-sm bg-[#141414] rounded-lg p-4 overflow-x-auto mb-4 border border-white/[0.08]"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="text-[var(--color-accent)] hover:underline"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="list-disc list-inside text-[var(--color-muted)] mb-4 space-y-1"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="list-decimal list-inside text-[var(--color-muted)] mb-4 space-y-1"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-2 border-[var(--color-accent)] pl-4 italic text-[var(--color-muted)] mb-4"
      {...props}
    />
  ),
};
