"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/lib/content";

export function StickyNav() {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const heroEl = document.getElementById("hero");
    if (!heroEl) return;

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 },
    );
    heroObserver.observe(heroEl);

    return () => heroObserver.disconnect();
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -40% 0px" },
      );
      observer.observe(el);
      observers.push(observer);
    }

    return () => {
      for (const observer of observers) {
        observer.disconnect();
      }
    };
  }, []);

  function handleClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label="Main navigation"
          initial={{ y: -64, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -64, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-0 right-0 left-0 z-50 border-b border-white/[0.08] bg-[#0a0a0a]/80 backdrop-blur-md"
        >
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-center gap-8 px-6">
            {navLinks.map((link) => {
              const isActive =
                activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`font-mono text-xs tracking-widest transition-colors duration-200 ${
                    isActive
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
