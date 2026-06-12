"use client";

import { useState, useEffect } from "react";

interface UseOfflineReturn {
  isOffline: boolean;
  isOnline: boolean;
  since: Date | null;
}

export function useOffline(): UseOfflineReturn {
  const [isOffline, setIsOffline] = useState(false);
  const [since, setSince] = useState<Date | null>(null);

  useEffect(() => {
    // SSR-safe
    if (typeof window === "undefined") return;

    const handleOnline = () => {
      setIsOffline(false);
      setSince(null);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setSince(new Date());
    };

    // Set initial state
    setIsOffline(!navigator.onLine);
    if (!navigator.onLine) setSince(new Date());

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return { isOffline, isOnline: !isOffline, since };
}
