"use client";

import { useEffect, useState } from "react";
import { useLenis } from "@/hooks/use-lenis";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const { lenis } = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const handleScroll = (data: { progress: number }) => {
      setProgress(data.progress || 0);
    };

    // Listen to scroll events
    lenis.on('scroll', handleScroll);

    return () => {
      // Remove the event listener
      lenis.off('scroll', handleScroll);
    };
  }, [lenis]);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-secondary z-50">
      <div 
        className="h-full bg-primary transition-all duration-100 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
