"use client";

import { Button } from "@/components/ui/button";
import { useLenis } from "@/hooks/use-lenis";
import { useState, useEffect } from "react";

export function PlaygroundNavigation() {
  const { scrollTo } = useLenis();
  const [activeSection, setActiveSection] = useState('top');

  const sections = [
    { id: 'top', label: '🏠', title: 'Hero' },
    { id: 'typography', label: '✨', title: 'Typography' },
    { id: 'cards', label: '🎴', title: 'Cards' },
    { id: 'parallax', label: '🌊', title: 'Parallax' },
    { id: 'config', label: '⚙️', title: 'Config' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      
      // Find active section based on scroll position
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= windowHeight / 2) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const handleNavClick = (sectionId: string) => {
    scrollTo(`#${sectionId}`, {
      duration: 1.5,
      easing: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    });
  };

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-2">
      {sections.map((section) => (
        <Button
          key={section.id}
          variant={activeSection === section.id ? "default" : "outline"}
          size="sm"
          className={`w-12 h-12 rounded-full transition-all duration-300 hover:scale-110 ${
            activeSection === section.id 
              ? 'shadow-lg scale-110' 
              : 'hover:shadow-md opacity-70 hover:opacity-100'
          }`}
          onClick={() => handleNavClick(section.id)}
          title={section.title}
        >
          <span className="text-lg">{section.label}</span>
        </Button>
      ))}
    </div>
  );
}
