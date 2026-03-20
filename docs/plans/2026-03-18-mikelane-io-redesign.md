# mikelane.io Redesign — "The Workshop"

## Overview

Personal website redesign for mikelane.io. The site itself is the portfolio piece — it demonstrates engineering craft, UX care, and the ability to go from idea to polished delivery. Not a digital resume. A workshop where visitors explore what Mike builds, how he leads, and how he thinks.

## Design Principles

1. **The site IS the demo** — Interactive components, not screenshots. The quality of the site proves the quality of the engineer.
2. **No age signals** — Zero dates anywhere. Career shown as progression of scope and impact, not a timeline.
3. **Audience-adaptive** — A recruiter sees impact metrics. A peer sees technical depth. A collaborator sees thinking and taste.
4. **Dark, polished, restrained** — Linear/Raycast aesthetic. No gratuitous animation. Every motion serves comprehension.
5. **Fast** — Sub-1s LCP. No heavy JS frameworks for static content. Interactive components load on demand.

## Visual Direction

- **Theme**: Dark background (#0a0a0a or similar near-black), with subtle warm gray text hierarchy
- **Typography**: Geist Sans for body, Geist Mono for code/metrics/technical labels
- **Accent color**: A single accent (warm amber or Anthropic-style coral) used sparingly for interactive elements and hover states
- **Spacing**: Generous whitespace. Content breathes. No cramming.
- **Cards**: Subtle border (1px white/8% opacity), slight glass effect on hover, no heavy shadows
- **Motion**: Scroll-triggered fade-ins (subtle, ~200ms). No parallax. No scroll-jacking.

## Site Structure

### 1. Hero (full viewport)

```
┌──────────────────────────────────────────────────┐
│                                                  │
│           Michael Lane                           │
│                                                  │
│   I build tools that make                        │
│   complex systems [accessible].                  │
│                    [fast].                        │
│                    [disappear].                   │
│                                                  │
│   Currently putting Claude in the hands of       │
│   200+ people who aren't engineers.              │
│                                                  │
│                    ↓                              │
└──────────────────────────────────────────────────┘
```

- Name: large, clean, Geist Sans bold
- Rotating word: typed animation with cursor blink, cycles every 3s
- Proof line: muted color, smaller type
- Nav appears on scroll (sticky, minimal): BUILD · LEAD · THINK · CONTACT
- No photo unless Mike wants one

### 2. BUILD Zone

Three interactive project showcases in a grid (2-up on desktop, stack on mobile). Each is a card that expands into a detailed view.

**Card A: "Making Claude Accessible"**
- An animated architecture diagram (React component, not an image)
- Shows: Open WebUI → Electron → LiteLLM (ECS) → Claude/Bedrock
- Six MCP server nodes branch off: Jira, Confluence, GitLab, SonarQube, Sonatype, + 1 more
- Hover on any node → tooltip with what it does
- Key metric badge: "200+ non-technical users"

**Card B: "47,000 Translations Per Second"**
- Visualization: animated counter or bar showing throughput
- Before/after: COBOL flat file (monospace snippet) → JSON output
- Key metric badge: "13M+ records in 5 minutes, zero errors"
- Stack label: Rust · Axum

**Card C: "9 Days → 1 Hour"**
- Terminal-style component showing the CLI in action
- Simulated command execution with output appearing line by line
- Shows the plugin architecture concept
- Key metric badge: "Onboarding time reduction"
- Stack label: Python · Plugin Architecture

### 3. LEAD Zone

Career shown as concentric expanding rings — growing scope, not a timeline.

```
┌─────────────────────────────────────────────┐
│                                             │
│  ┌─── Technical Leader ──────────────────┐  │
│  │  Org-wide standards · 15+ mentored    │  │
│  │  Federal modernization roadmap        │  │
│  │  ┌─── Team Lead ──────────────────┐   │  │
│  │  │  8-person team · 38% cost cut  │   │  │
│  │  │  MTTR ~1 hour · CI/CD unify    │   │  │
│  │  │  ┌─── IC at Scale ─────────┐   │   │  │
│  │  │  │  50K users · 99.99%     │   │   │  │
│  │  │  │  Millions msgs/day      │   │   │  │
│  │  │  └─────────────────────────┘   │   │  │
│  │  └────────────────────────────────┘   │  │
│  └───────────────────────────────────────┘  │
│                                             │
└─────────────────────────────────────────────┘
```

Each ring is clickable → expands to show the companies and key achievements at that level. Companies named, roles named, NO dates.

Below the rings, a narrative paragraph:

> "I started in mathematics, navigated aircraft for the Air Force, then pivoted through machine learning into backend engineering and infrastructure. Each chapter taught me something about making complex systems work for the people who depend on them."

This gives the full-picture story without any dates. Military service adds credibility and distinction. The math background signals rigor.

### 4. THINK Zone

Blog / writing section. Clean card grid.

If no posts exist yet, launch with 2-3 placeholder titles that Mike intends to write:
- "Why I Built 6 MCP Servers (And What I Learned)"
- "Rust for the Python Engineer"
- "Making AI Accessible to People Who Don't Know What AI Is"

Each card: title, 1-line description, estimated read time, topic tag. Links to full post (can be a separate /blog/[slug] route or link to dev.to).

### 5. Contact / Footer

Minimal. Dark. Centered.

```
Currently exploring opportunities where I can
build internal tools that make teams more effective.

[GitHub]  [LinkedIn]  [Email]

mikelane.io · Built with Next.js
```

## Technical Architecture

### Stack
- **Framework**: Next.js (App Router, React Server Components)
- **Hosting**: Vercel
- **Styling**: Tailwind CSS
- **Typography**: Geist Sans + Geist Mono via next/font
- **Animations**: Framer Motion (scroll-triggered, lightweight)
- **Interactive diagrams**: React Flow or custom SVG components
- **Terminal component**: Custom React component with typed output simulation

### Routing

```
/                   → Home (the workshop)
/blog               → Blog index (future)
/blog/[slug]        → Blog post (future)
/dioxide/*          → Redirect to mikelane.github.io/dioxide/*
```

### Redirects (next.config.ts)

```typescript
async redirects() {
  return [
    {
      source: '/dioxide/:path*',
      destination: 'https://mikelane.github.io/dioxide/:path*',
      permanent: true,
    },
  ]
}
```

### DNS Changes (Squarespace)

1. Remove existing A records pointing to GitHub Pages IPs (185.199.108-111.153)
2. Remove www CNAME pointing to mikelane.github.io
3. Add Vercel DNS records per Vercel's domain setup docs
4. Keep all MX records (Google Workspace) untouched
5. Keep blog CNAME (CloudFront) untouched
6. Keep Google verification records untouched

### Performance Targets
- LCP < 1.0s
- CLS < 0.05
- FID < 50ms
- Total JS < 100KB initial load (interactive components lazy-loaded)

## Content Inventory (what Mike provides)

- [ ] Short bio paragraph for the narrative section
- [ ] Confirmation of which projects to feature in BUILD zone
- [ ] Any blog posts or writing to include at launch
- [ ] Preferred contact approach (email form vs. direct email link)
- [ ] Whether to include a downloadable resume PDF link
- [ ] Photo (optional — site works without one)

## Age-Proofing Checklist

- [ ] No graduation dates
- [ ] No employment dates
- [ ] No "X years of experience" (use "shipped production software at 8+ companies" or similar)
- [ ] No references to technologies that date you (e.g., "started with jQuery in 2009")
- [ ] Career arc told as progression of scope, not chronology
- [ ] Military service mentioned as a credential, not dated

## Implementation Phases

### Phase 1: Foundation
- Next.js project scaffold
- Tailwind + Geist typography setup
- Dark theme system
- Routing + dioxide redirects
- Deploy to Vercel, connect domain

### Phase 2: Static Content
- Hero section with rotating text animation
- LEAD zone (concentric rings, static version first)
- Narrative paragraph
- Contact footer
- Mobile responsive

### Phase 3: Interactive Showcase
- BUILD zone card components
- Architecture diagram (MCP stack)
- Metrics visualization (Rust service)
- Terminal CLI demo
- Card expand/collapse interactions

### Phase 4: Polish & Content
- Scroll-triggered animations
- Blog section (even if empty at launch with "coming soon")
- SEO metadata, OG images
- Performance optimization
- Accessibility audit

### Phase 5: Writing (ongoing)
- Publish blog posts
- Add new projects as they ship
