"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { leadRings } from "@/lib/content";

function RingCard({
  ring,
  isExpanded,
  onToggle,
}: {
  ring: (typeof leadRings)[number];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.button
      onClick={onToggle}
      aria-expanded={isExpanded}
      className={`w-full cursor-pointer rounded-2xl border p-6 text-left transition-colors duration-300 ${
        isExpanded
          ? "border-[var(--color-accent)]/40 bg-[var(--color-accent)]/[0.03]"
          : "border-white/[0.08] hover:border-white/[0.16]"
      }`}
      layout
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-medium tracking-tight">{ring.level}</h3>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            {ring.summary}
          </p>
        </div>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="mt-1 text-[var(--color-muted)]"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </motion.span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {ring.metrics.map((m) => (
          <span
            key={m}
            className="rounded-md bg-white/[0.06] px-2 py-0.5 font-mono text-xs text-[var(--color-muted)]"
          >
            {m}
          </span>
        ))}
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-2 border-t border-white/[0.06] pt-4">
              {ring.details.map((detail) => (
                <li
                  key={detail}
                  className="flex items-start gap-2 text-sm text-[var(--color-muted)]"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                  {detail}
                </li>
              ))}
            </div>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function ConcentricRings({
  expandedIndex,
  onToggle,
}: {
  expandedIndex: number | null;
  onToggle: (idx: number) => void;
}) {
  const rings = [...leadRings].reverse();

  return (
    <div className="hidden md:flex md:items-center md:justify-center">
      <div className="relative">
        {rings.map((ring, i) => {
          const originalIndex = leadRings.length - 1 - i;
          const isExpanded = expandedIndex === originalIndex;
          const paddings = ["p-10", "p-8", "p-6"];
          const sizes = [
            "min-w-[540px] min-h-[340px]",
            "min-w-[380px] min-h-[240px]",
            "min-w-[240px] min-h-[160px]",
          ];

          return (
            <motion.button
              key={ring.level}
              onClick={() => onToggle(originalIndex)}
              aria-expanded={isExpanded}
              className={`${i > 0 ? "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" : "relative"} cursor-pointer rounded-2xl border text-left transition-colors duration-300 ${paddings[i]} ${sizes[i]} ${
                isExpanded
                  ? "z-30 border-[var(--color-accent)]/40 bg-[var(--color-accent)]/[0.03]"
                  : "border-white/[0.08] bg-[#0a0a0a] hover:border-white/[0.16]"
              }`}
              layout
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col items-center text-center">
                <h3
                  className={`font-medium tracking-tight ${i === 0 ? "text-lg" : "text-base"}`}
                >
                  {ring.level}
                </h3>
                <p className="mt-1 text-xs text-[var(--color-muted)]">
                  {ring.summary}
                </p>
                <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                  {ring.metrics.map((m) => (
                    <span
                      key={m}
                      className="rounded-md bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-muted)]"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-3 border-t border-white/[0.06] pt-3"
                  >
                    <ul className="space-y-1.5">
                      {ring.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-start gap-2 text-xs text-[var(--color-muted)]"
                        >
                          <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export function CareerRings() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  function handleToggle(idx: number) {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  }

  return (
    <>
      {/* Desktop: concentric rings */}
      <ConcentricRings expandedIndex={expandedIndex} onToggle={handleToggle} />

      {/* Mobile: stacked cards */}
      <div className="space-y-4 md:hidden">
        {leadRings.map((ring, idx) => (
          <RingCard
            key={ring.level}
            ring={ring}
            isExpanded={expandedIndex === idx}
            onToggle={() => handleToggle(idx)}
          />
        ))}
      </div>
    </>
  );
}
