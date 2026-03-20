"use client";

import dynamic from "next/dynamic";
import { buildCards } from "@/lib/content";
import { ProjectCard } from "./project-card";

const MCPDiagram = dynamic(
  () => import("./mcp-diagram").then((m) => ({ default: m.MCPDiagram })),
  {
    ssr: false,
    loading: () => (
      <div className="h-[380px] animate-pulse rounded-lg bg-white/[0.04]" />
    ),
  },
);

const ThroughputViz = dynamic(
  () =>
    import("./throughput-viz").then((m) => ({ default: m.ThroughputViz })),
  {
    ssr: false,
    loading: () => (
      <div className="h-[300px] animate-pulse rounded-lg bg-white/[0.04]" />
    ),
  },
);

const TerminalDemo = dynamic(
  () =>
    import("./terminal-demo").then((m) => ({ default: m.TerminalDemo })),
  {
    ssr: false,
    loading: () => (
      <div className="h-[300px] animate-pulse rounded-lg bg-white/[0.04]" />
    ),
  },
);

export function BuildZone() {
  return (
    <section id="build" aria-labelledby="build-heading" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <h2 id="build-heading" className="font-mono text-xs tracking-widest text-[var(--color-muted)] uppercase">
          What I Build
        </h2>
        <p className="mt-2 text-3xl font-medium tracking-tight md:text-4xl">
          Systems that scale, tools that simplify
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* MCP Diagram — full width on first row */}
          <div className="md:col-span-2">
            <ProjectCard
              title={buildCards[0].title}
              description={buildCards[0].description}
              metric={buildCards[0].metric}
              stack={buildCards[0].stack}
            >
              <MCPDiagram />
            </ProjectCard>
          </div>

          {/* Throughput viz */}
          <ProjectCard
            title={buildCards[1].title}
            description={buildCards[1].description}
            metric={buildCards[1].metric}
            stack={buildCards[1].stack}
          >
            <ThroughputViz />
          </ProjectCard>

          {/* Terminal demo */}
          <ProjectCard
            title={buildCards[2].title}
            description={buildCards[2].description}
            metric={buildCards[2].metric}
            stack={buildCards[2].stack}
          >
            <TerminalDemo />
          </ProjectCard>
        </div>
      </div>
    </section>
  );
}
