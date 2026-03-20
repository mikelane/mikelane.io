"use client";

import { useEffect, useRef, useState } from "react";
import { hero } from "@/lib/content";

export function TypedCompletions() {
  const words = hero.completions;
  const [displayedText, setDisplayedText] = useState("");
  const wordIndexRef = useRef(0);
  const phaseRef = useRef<"typing" | "pausing" | "deleting">("typing");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tickRef = useRef<() => void>(() => {});

  useEffect(() => {
    tickRef.current = () => {
      const currentWord = words[wordIndexRef.current];
      const phase = phaseRef.current;

      if (phase === "typing") {
        setDisplayedText((prev) => {
          const next = currentWord.slice(0, prev.length + 1);
          if (next.length >= currentWord.length) {
            phaseRef.current = "pausing";
            timerRef.current = setTimeout(() => tickRef.current(), 2500);
          } else {
            timerRef.current = setTimeout(() => tickRef.current(), 60);
          }
          return next;
        });
      } else if (phase === "pausing") {
        phaseRef.current = "deleting";
        timerRef.current = setTimeout(() => tickRef.current(), 40);
      } else if (phase === "deleting") {
        setDisplayedText((prev) => {
          const next = prev.slice(0, -1);
          if (next.length === 0) {
            wordIndexRef.current =
              (wordIndexRef.current + 1) % words.length;
            phaseRef.current = "typing";
            timerRef.current = setTimeout(() => tickRef.current(), 200);
          } else {
            timerRef.current = setTimeout(() => tickRef.current(), 40);
          }
          return next;
        });
      }
    };
  }, [words]);

  useEffect(() => {
    timerRef.current = setTimeout(() => tickRef.current(), 60);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <span
      className="text-[var(--color-accent)]"
      aria-live="polite"
    >
      {displayedText}
      <span
        className="ml-[1px] inline-block w-[3px] animate-blink bg-[var(--color-accent)]"
        aria-hidden="true"
      >
        &nbsp;
      </span>
    </span>
  );
}
