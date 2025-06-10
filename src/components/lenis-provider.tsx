"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";
import { setLenisInstance } from "@/hooks/use-lenis";

interface LenisProviderProps {
  children: ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Initialize Lenis with optimized settings
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
    });

    // Set the global instance for the custom hook
    setLenisInstance(lenis);

    // Add lenis class to html element for styling
    if (document?.documentElement) {
      document.documentElement.classList.add('lenis');
    }

    // Cleanup function
    return () => {
      lenis.destroy();
      setLenisInstance(null);
      if (document?.documentElement) {
        document.documentElement.classList.remove('lenis');
      }
    };
  }, []);

  return <>{children}</>;
}
