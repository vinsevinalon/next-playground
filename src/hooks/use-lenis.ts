"use client";

import { useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";

// Type definitions for better type safety
interface LenisScrollOptions {
  offset?: number;
  duration?: number;
  easing?: (t: number) => number;
  lerp?: number;
  immediate?: boolean;
  lock?: boolean;
  onComplete?: () => void;
}

// Global Lenis instance reference
let lenisInstance: Lenis | null = null;

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Get the global Lenis instance
    lenisRef.current = lenisInstance;
  }, []);

  const scrollTo = useCallback((
    target: string | number | HTMLElement, 
    options?: LenisScrollOptions
  ) => {
    if (lenisRef.current && typeof lenisRef.current.scrollTo === 'function') {
      lenisRef.current.scrollTo(target, options);
    }
  }, []);

  const start = useCallback(() => {
    if (lenisRef.current && typeof lenisRef.current.start === 'function') {
      lenisRef.current.start();
    }
  }, []);

  const stop = useCallback(() => {
    if (lenisRef.current && typeof lenisRef.current.stop === 'function') {
      lenisRef.current.stop();
    }
  }, []);

  return {
    lenis: lenisRef.current,
    scrollTo,
    start,
    stop,
  };
}

// Function to set the global Lenis instance (used by LenisProvider)
export function setLenisInstance(instance: Lenis | null) {
  lenisInstance = instance;
}
