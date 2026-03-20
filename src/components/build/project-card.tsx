"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  metric: string;
  stack: string[];
  children: ReactNode;
}

export function ProjectCard({
  title,
  description,
  metric,
  stack,
  children,
}: ProjectCardProps) {
  return (
    <motion.article
      className="group relative overflow-hidden rounded-xl border border-white/[0.08] transition-colors duration-300 hover:border-white/[0.16]"
      whileHover={{ scale: 1.005 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(245, 158, 11, 0.04), transparent 40%)",
        }}
      />

      <div className="relative">{children}</div>

      <div className="relative px-6 pb-6 pt-4">
        <h3 className="text-lg font-medium tracking-tight">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
          {description}
        </p>

        <div className="mt-4 inline-flex items-center rounded-full border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/10 px-3 py-1">
          <span className="font-mono text-xs text-[var(--color-accent)]">
            {metric}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-white/[0.06] px-2 py-0.5 font-mono text-xs text-[var(--color-muted)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
