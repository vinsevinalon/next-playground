"use client";

import { Button } from "@/components/ui/button";
import { useLenis } from "@/hooks/use-lenis";

interface SmoothScrollDemoProps {
  className?: string;
}

export function SmoothScrollDemo({ className }: SmoothScrollDemoProps) {
  const { scrollTo } = useLenis();

  const scrollToSection = (target: string) => {
    scrollTo(target, {
      offset: -80, // Account for fixed navigation
      duration: 1.5,
      easing: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-semibold mb-4">Smooth Scroll Navigation</h3>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => scrollToSection('#hero')}
        >
          Scroll to Top
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => scrollToSection('#features')}
        >
          Features
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => scrollToSection('#technologies')}
        >
          Technologies
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => scrollToSection('#cta')}
        >
          Call to Action
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Click the buttons above to experience smooth scrolling powered by Lenis.
      </p>
    </div>
  );
}
