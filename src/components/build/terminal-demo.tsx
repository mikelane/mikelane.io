"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const COMMAND = "$ onboard --environment staging --team platform";
const CHAR_DELAY = 40;
const LINE_DELAY = 200;
const PAUSE_AFTER_COMMAND = 500;
const PAUSE_BEFORE_REPLAY = 3000;

const OUTPUT_LINES = [
  { text: "\u2713 Provisioning cloud resources...", delay: LINE_DELAY },
  { text: "\u2713 Configuring access policies...", delay: LINE_DELAY },
  { text: "\u2713 Installing 12 plugins...", delay: LINE_DELAY },
  { text: "\u2713 Running validation suite...", delay: LINE_DELAY },
  { text: "\u2713 Environment ready in 47 minutes", delay: LINE_DELAY },
];

type Phase = "idle" | "typing" | "output" | "done";

export function TerminalDemo() {
  const [typedCommand, setTypedCommand] = useState("");
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [showReplay, setShowReplay] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isRunningRef = useRef(false);

  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    cleanup();
    setTypedCommand("");
    setVisibleLines([]);
    setPhase("idle");
    setShowReplay(false);
    isRunningRef.current = false;
  }, [cleanup]);

  const runSequence = useCallback(() => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;
    setPhase("typing");
    setShowReplay(false);

    let charIndex = 0;

    function typeNextChar() {
      if (charIndex < COMMAND.length) {
        charIndex++;
        setTypedCommand(COMMAND.slice(0, charIndex));
        timerRef.current = setTimeout(typeNextChar, CHAR_DELAY);
      } else {
        timerRef.current = setTimeout(showNextLine, PAUSE_AFTER_COMMAND);
      }
    }

    let lineIndex = 0;

    function showNextLine() {
      setPhase("output");
      if (lineIndex < OUTPUT_LINES.length) {
        setVisibleLines((prev) => [...prev, OUTPUT_LINES[lineIndex].text]);
        lineIndex++;
        timerRef.current = setTimeout(
          showNextLine,
          OUTPUT_LINES[lineIndex - 1].delay,
        );
      } else {
        setPhase("done");
        setShowReplay(true);
        timerRef.current = setTimeout(() => {
          isRunningRef.current = false;
        }, PAUSE_BEFORE_REPLAY);
      }
    }

    typeNextChar();
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isRunningRef.current) {
          reset();
          timerRef.current = setTimeout(runSequence, 300);
        }
        if (!entry.isIntersecting && phase === "done") {
          reset();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cleanup();
    };
  }, [phase, reset, runSequence, cleanup]);

  return (
    <div ref={containerRef} className="overflow-hidden rounded-lg">
      {/* Window chrome */}
      <div className="flex items-center gap-2 bg-[#1a1a1a] px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-[var(--color-muted)]/50">
          onboard-cli
        </span>
      </div>

      {/* Terminal body */}
      <div className="min-h-[200px] bg-[#141414] px-4 py-3 font-mono text-sm leading-relaxed">
        {/* Command line */}
        <div className="flex">
          <span className="text-[#4ade80] whitespace-pre">
            {typedCommand}
          </span>
          {phase !== "done" && (
            <span className="ml-[1px] inline-block w-[7px] animate-blink bg-[#4ade80]">
              &nbsp;
            </span>
          )}
        </div>

        {/* Output lines */}
        {visibleLines.map((line, i) => (
          <div key={i} className="mt-1">
            <span className="text-[var(--color-foreground)]/90">
              {line.startsWith("\u2713") ? (
                <>
                  <span className="text-[#4ade80]">{"\u2713"}</span>
                  {line.slice(1)}
                </>
              ) : (
                line
              )}
            </span>
          </div>
        ))}

        {/* Replay indicator */}
        {showReplay && (
          <div className="mt-4 font-mono text-xs text-[var(--color-muted)]/30">
            scroll away and back to replay
          </div>
        )}
      </div>
    </div>
  );
}
