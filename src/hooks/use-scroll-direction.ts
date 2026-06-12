"use client";

import { useState, useEffect, useRef } from "react";

type ScrollDirection = "up" | "down" | null;

interface UseScrollDirectionOptions {
  threshold?: number;
  initialDirection?: ScrollDirection;
}

export function useScrollDirection(options: UseScrollDirectionOptions = {}) {
  const { threshold = 50 } = options;
  const [direction, setDirection] = useState<ScrollDirection>(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);
  const accumulatedDelta = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      // Check if at top
      setIsAtTop(currentScrollY < 10);

      // Accumulate delta until threshold is reached
      if (Math.abs(accumulatedDelta.current + delta) >= threshold) {
        if (delta > 0) {
          setDirection("down");
        } else if (delta < 0) {
          setDirection("up");
        }
        accumulatedDelta.current = 0;
      } else {
        accumulatedDelta.current += delta;
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return { direction, isAtTop, scrollY: lastScrollY.current };
}
