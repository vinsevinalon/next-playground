"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLenis } from "@/hooks/use-lenis";

interface WorkNavigationProps {
  className?: string;
}

export function WorkNavigation({ className }: WorkNavigationProps) {
  const { scrollTo } = useLenis();

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "projects", label: "Projects" },
    { id: "achievements", label: "Achievements" },
    { id: "testimonials", label: "Testimonials" },
    { id: "tech-stack", label: "Tech Stack" },
    { id: "process", label: "Process" },
  ];

  const handleScrollTo = (sectionId: string) => {
    scrollTo(`#${sectionId}`, {
      offset: -100,
      duration: 1.8,
      easing: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    });
  };

  return (
    <Card className={`sticky top-24 ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg">Quick Navigation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant="ghost"
              size="sm"
              onClick={() => handleScrollTo(section.id)}
              className="justify-start text-left h-auto py-2"
            >
              {section.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
