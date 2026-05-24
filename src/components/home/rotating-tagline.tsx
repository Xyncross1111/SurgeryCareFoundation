"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const ROTATE_MS = 10_000;

export function RotatingTagline() {
  const t = useTranslations("rotatingTagline");
  const taglines = (t.raw("items") as string[]) ?? [];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
    }
    if (taglines.length === 0) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % taglines.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [taglines.length]);

  return (
    <span
      className="grid items-center"
      aria-live="polite"
      aria-atomic="true"
    >
      {taglines.map((tagline, i) => (
        <span
          key={tagline}
          aria-hidden={i === index ? undefined : true}
          className={`col-start-1 row-start-1 transition-opacity duration-700 ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          {tagline}
        </span>
      ))}
    </span>
  );
}
