"use client";

import { useEffect, useRef, useState } from "react";

const TARGET = 47_000;
const DURATION_MS = 2000;
const FRAME_INTERVAL = 16;

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function formatNumber(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

const COBOL_LINES = [
  "01 CUSTOMER-RECORD.",
  '   05 CUST-ID        PIC 9(8).',
  '   05 CUST-NAME      PIC X(30).',
  '   05 CUST-BALANCE   PIC 9(7)V99.',
];

const JSON_LINES = [
  "{",
  '  "customerId": 10458923,',
  '  "name": "MARTINEZ, ELENA",',
  '  "balance": 15420.75',
  "}",
];

export function ThroughputViz() {
  const [count, setCount] = useState(0);
  const hasAnimatedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          const start = performance.now();

          function tick() {
            const elapsed = performance.now() - start;
            const progress = Math.min(elapsed / DURATION_MS, 1);
            const eased = easeOutExpo(progress);
            setCount(eased * TARGET);

            if (progress < 1) {
              setTimeout(tick, FRAME_INTERVAL);
            } else {
              setCount(TARGET);
            }
          }

          tick();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center px-4 py-8">
      <div className="text-center">
        <span className="font-mono text-5xl font-bold tabular-nums tracking-tight text-[var(--color-foreground)] md:text-6xl">
          {formatNumber(count)}
        </span>
        <p className="mt-2 font-mono text-sm tracking-wide text-[var(--color-muted)]">
          translations per second
        </p>
      </div>

      <div className="mt-8 flex w-full items-center gap-3 md:gap-6">
        <div className="min-w-0 flex-1 overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.02] p-3 md:p-4">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)]/60">
            COBOL
          </div>
          <pre className="overflow-x-auto font-mono text-[11px] leading-relaxed text-[var(--color-muted)] md:text-xs">
            {COBOL_LINES.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </pre>
        </div>

        <div className="flex shrink-0 flex-col items-center gap-1">
          <span className="font-mono text-lg text-[var(--color-accent)]">
            &rarr;
          </span>
        </div>

        <div className="min-w-0 flex-1 overflow-hidden rounded-lg border border-[var(--color-accent)]/15 bg-[var(--color-accent)]/[0.03] p-3 md:p-4">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[var(--color-accent)]/60">
            JSON
          </div>
          <pre className="overflow-x-auto font-mono text-[11px] leading-relaxed text-[var(--color-foreground)]/80 md:text-xs">
            {JSON_LINES.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
}
