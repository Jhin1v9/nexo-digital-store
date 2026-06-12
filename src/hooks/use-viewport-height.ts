"use client";

import { useEffect } from "react";

export function useViewportHeight(): void {
  useEffect(() => {
    const setAppHeight = () => {
      const vh = window.innerHeight;
      document.documentElement.style.setProperty("--app-height", `${vh}px`);
    };

    setAppHeight();
    window.addEventListener("resize", setAppHeight);
    window.addEventListener("orientationchange", setAppHeight);

    return () => {
      window.removeEventListener("resize", setAppHeight);
      window.removeEventListener("orientationchange", setAppHeight);
    };
  }, []);
}
