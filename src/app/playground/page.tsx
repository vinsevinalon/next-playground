"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLenis } from "@/hooks/use-lenis";

export default function PlaygroundPage() {
  const { scrollTo } = useLenis();
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const typographyRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [showMetrics, setShowMetrics] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);

  // Optimized scroll handler with throttling
  useEffect(() => {
    let lastScrollY = 0;
    let lastTimestamp = 0;
    let ticking = false;

    const updateScrollMetrics = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((scrollY / docHeight) * 100, 100);
      
      const currentTime = Date.now();
      const velocity = Math.abs((scrollY - lastScrollY) / Math.max(currentTime - lastTimestamp, 1)) * 1000;
      
      setScrollProgress(progress);
      setScrollVelocity(velocity);
      
      // Update progress bars
      const progressBar = document.querySelector('.scroll-progress-bar') as HTMLElement;
      const velocityBar = document.querySelector('.velocity-bar') as HTMLElement;
      
      if (progressBar) progressBar.style.width = `${progress}%`;
      if (velocityBar) velocityBar.style.width = `${Math.min(velocity / 10, 100)}%`;
      
      lastScrollY = scrollY;
      lastTimestamp = currentTime;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollMetrics);
        ticking = true;
      }
    };

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: "-10% 0px -10% 0px" }
    );

    // Observe elements when component mounts
    const animationTargets = document.querySelectorAll('.animate-on-scroll');
    animationTargets.forEach(target => observer.observe(target));

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSmoothScroll = (targetId: string) => {
    scrollTo(`#${targetId}`, {
      duration: 1.5,
      easing: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Simplified Navigation */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-3">
        {[
          { id: 'top', label: '01' },
          { id: 'typography', label: '02' },
          { id: 'cards', label: '03' },
          { id: 'parallax', label: '04' }
        ].map((section) => (
          <Button
            key={section.id}
            variant="outline"
            size="sm"
            className="w-12 h-12 rounded-full text-xs font-semibold opacity-70 hover:opacity-100 transition-all duration-300 backdrop-blur-md border-white/20 hover:border-purple-500 hover:bg-purple-500/10"
            onClick={() => handleSmoothScroll(section.id)}
            title={section.id}
          >
            {section.label}
          </Button>
        ))}
      </div>

      {/* Simplified Performance Panel */}
      {showMetrics && (
        <div className="fixed top-6 right-6 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20 min-w-[200px]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">Live Metrics</h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-red-100 dark:hover:bg-red-900/30"
              onClick={() => setShowMetrics(false)}
            >
              ×
            </Button>
          </div>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <span>Progress:</span>
              <span className="font-mono">{Math.round(scrollProgress)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Velocity:</span>
              <span className="font-mono">{Math.round(scrollVelocity)}</span>
            </div>
            <div className="mt-2 pt-2 border-t border-white/20">
              <div className="text-[10px] text-muted-foreground mb-1">Scroll Progress</div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="scroll-progress-bar bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300" style={{width: '0%'}}></div>
              </div>
            </div>
            <div className="mt-2">
              <div className="text-[10px] text-muted-foreground mb-1">Velocity</div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="velocity-bar bg-gradient-to-r from-green-500 to-yellow-500 h-2 rounded-full transition-all duration-300" style={{width: '0%'}}></div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Hero Section with Optimized Background */}
      <section 
        id="top"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950"
      >
        {/* Optimized Background Animation */}
        <div className="absolute inset-0">
          {/* Static gradient overlays for better performance */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-600/5" />
          
          {/* Floating orbs with pure CSS animations */}
          <div className="floating-orb floating-orb-1" />
          <div className="floating-orb floating-orb-2" />
          <div className="floating-orb floating-orb-3" />
          <div className="floating-orb floating-orb-4" />
          <div className="floating-orb floating-orb-5" />
        </div>
        
        <div className="relative z-10 text-center px-4 animate-on-scroll">
          {/* Enhanced Typography */}
          <div className="mb-8">
            <h1 className="playground-title">
              <span className="playground-letter" style={{ animationDelay: '0ms' }}>P</span>
              <span className="playground-letter" style={{ animationDelay: '100ms' }}>l</span>
              <span className="playground-letter" style={{ animationDelay: '200ms' }}>a</span>
              <span className="playground-letter" style={{ animationDelay: '300ms' }}>y</span>
              <span className="playground-letter" style={{ animationDelay: '400ms' }}>g</span>
              <span className="playground-letter" style={{ animationDelay: '500ms' }}>r</span>
              <span className="playground-letter" style={{ animationDelay: '600ms' }}>o</span>
              <span className="playground-letter" style={{ animationDelay: '700ms' }}>u</span>
              <span className="playground-letter" style={{ animationDelay: '800ms' }}>n</span>
              <span className="playground-letter" style={{ animationDelay: '900ms' }}>d</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in-up max-w-2xl mx-auto">
            Explore the magic of <strong>Lenis smooth scrolling</strong> with beautiful animations and transitions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
            <Button 
              size="lg" 
              onClick={() => handleSmoothScroll('typography')}
              className="transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Typography Animations
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => handleSmoothScroll('cards')}
              className="transform hover:scale-105 transition-all duration-300 border-2 hover:border-purple-500"
            >
              Card Transitions
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => handleSmoothScroll('parallax')}
              className="transform hover:scale-105 transition-all duration-300 border-2 hover:border-purple-500"
            >
              Parallax Effects
            </Button>
          </div>
        </div>
      </section>

      {/* Typography Animation Section */}
      <section id="typography" ref={typographyRef} className="py-20 px-4 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Typography Magic</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Beautiful text animations that respond to scroll
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Fade In Up", class: "animate-fade-in-up", delay: "0ms" },
              { title: "Slide In Left", class: "animate-slide-in-left", delay: "100ms" },
              { title: "Slide In Right", class: "animate-slide-in-right", delay: "200ms" },
              { title: "Scale In", class: "animate-scale-in", delay: "300ms" },
              { title: "Rotate In", class: "animate-rotate-in", delay: "400ms" },
              { title: "Bounce In", class: "animate-bounce-in", delay: "500ms" }
            ].map((item, index) => (
              <div 
                key={index}
                className={`p-8 bg-card rounded-xl border border-white/20 animate-on-scroll ${item.class} backdrop-blur-sm`}
                style={{ animationDelay: item.delay }}
              >
                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                <p className="text-muted-foreground">
                  Smooth animations triggered by scroll interactions with Lenis.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Card Transitions Section */}
      <section id="cards" ref={cardsRef} className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-5xl font-bold mb-6">Interactive Cards</h2>
            <p className="text-xl text-muted-foreground">
              Hover effects and transitions with smooth scrolling
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Hover Lift", description: "Card lifts on hover with shadow", type: "lift" },
              { title: "Tilt Effect", description: "3D tilt on mouse movement", type: "tilt" },
              { title: "Glow Border", description: "Animated glowing border", type: "glow" },
              { title: "Scale & Rotate", description: "Combined scale and rotation", type: "scale-rotate" },
              { title: "Slide Content", description: "Content slides in on hover", type: "slide" },
              { title: "Flip Card", description: "Card flips to reveal content", type: "flip" }
            ].map((card, index) => (
              <Card key={index} className={`card-${card.type} cursor-pointer transition-all duration-500 h-64 animate-on-scroll hover:shadow-xl`} style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <CardTitle className="text-xl">{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-bold opacity-60">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Effects Section */}
      <section id="parallax" ref={parallaxRef} className="py-20 px-4 relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-5xl font-bold mb-6">Smooth Experience</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Everything works together in perfect harmony
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-6 rounded-xl text-center">
              <span className="text-3xl mb-4 block">✨</span>
              <h3 className="font-semibold mb-2">Typography</h3>
              <p className="text-sm text-muted-foreground">Smooth text animations and reveals</p>
            </div>
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-6 rounded-xl text-center">
              <span className="text-3xl mb-4 block">🎴</span>
              <h3 className="font-semibold mb-2">Cards</h3>
              <p className="text-sm text-muted-foreground">Interactive hover effects</p>
            </div>
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-6 rounded-xl text-center">
              <span className="text-3xl mb-4 block">🚀</span>
              <h3 className="font-semibold mb-2">Performance</h3>
              <p className="text-sm text-muted-foreground">60fps smooth animations</p>
            </div>
          </div>

          <div className="text-center">
            <Button 
              onClick={() => handleSmoothScroll('top')}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              ↑ Back to Top
            </Button>
          </div>
        </div>
      </section>

      {/* Metrics Toggle Button */}
      {!showMetrics && (
        <Button
          variant="outline"
          size="sm"
          className="fixed top-6 right-6 z-40 opacity-70 hover:opacity-100 backdrop-blur-md border-white/20"
          onClick={() => setShowMetrics(true)}
          title="Show Performance Metrics"
        >
          📊
        </Button>
      )}
    </div>
  );
}
