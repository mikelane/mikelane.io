import Link from "next/link";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="mb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[var(--color-muted)] transition-colors duration-200 hover:text-[var(--color-accent)]"
        >
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
            <path d="M10 12L6 8l4-4" />
          </svg>
          THE WORKSHOP
        </Link>
      </nav>
      {children}
    </div>
  );
}
