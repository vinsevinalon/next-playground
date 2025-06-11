"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLenis } from "@/hooks/use-lenis";

export default function PlaygroundPage() {
  const { scrollTo, lenis } = useLenis();
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const typographyRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize scroll-triggered animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    // Variables for tracking
    let lastScrollY = 0;
    let lastTimestamp = 0;
    let velocity = 0;

    const handleScroll = (e: any) => {
      const currentTime = Date.now();
      const scrollY = e.scroll || e.animatedScroll || window.scrollY;
      const deltaY = scrollY - lastScrollY;
      const deltaTime = currentTime - lastTimestamp;
      
      // Calculate velocity (pixels per second)
      if (deltaTime > 0) {
        velocity = Math.abs(deltaY / deltaTime) * 1000;
      }

      // Calculate scroll progress
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = Math.max(0, Math.min(100, (scrollY / scrollHeight) * 100));

      // Update scroll metrics in DOM
      const progressBar = document.querySelector('.scroll-progress-bar') as HTMLElement;
      const scrollPosition = document.querySelector('.scroll-position');
      const scrollPercentage = document.querySelector('.scroll-percentage');
      const velocityDisplay = document.querySelector('.scroll-velocity');
      const velocityBar = document.querySelector('.velocity-bar') as HTMLElement;
      const directionDisplay = document.querySelector('.scroll-direction');
      const directionText = document.querySelector('.scroll-direction-text');
      const directionIndicator = document.querySelector('.direction-indicator') as HTMLElement;
      
      if (progressBar) {
        progressBar.style.width = `${scrollProgress}%`;
      }
      
      if (scrollPosition) {
        scrollPosition.textContent = `${Math.round(scrollY)}px`;
      }
      
      if (scrollPercentage) {
        scrollPercentage.textContent = `${Math.round(scrollProgress)}%`;
      }

      if (velocityDisplay) {
        velocityDisplay.textContent = Math.round(velocity).toString();
      }

      if (velocityBar) {
        const velocityPercent = Math.min(Math.max(0, velocity / 20), 100);
        velocityBar.style.width = `${velocityPercent}%`;
      }

      // Direction tracking
      if (directionDisplay && directionText && directionIndicator) {
        if (deltaY > 2) {
          directionDisplay.textContent = '↓';
          directionText.textContent = 'Scrolling Down';
          directionIndicator.style.top = '75%';
        } else if (deltaY < -2) {
          directionDisplay.textContent = '↑';
          directionText.textContent = 'Scrolling Up';
          directionIndicator.style.top = '25%';
        } else {
          directionDisplay.textContent = '—';
          directionText.textContent = 'Neutral';
          directionIndicator.style.top = '50%';
        }
      }
      
      // Enhanced Parallax elements with proper calculations
      const parallaxElements = document.querySelectorAll('.parallax-element');
      parallaxElements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        const speed = parseFloat(element.getAttribute('data-speed') || '0.5');
        
        // Calculate parallax offset - different approach for better effect
        const yPos = scrollY * speed * 0.5; // Reduced multiplier for subtler effect
        
        // Apply transform with proper 3D acceleration
        htmlElement.style.transform = `translate3d(0, ${-yPos}px, 0)`;
        
        // Add subtle rotation for round floating elements
        if (htmlElement.classList.contains('rounded-full') && speed > 0.7) {
          const rotation = (scrollY * speed * 0.05) % 360;
          htmlElement.style.transform = `translate3d(0, ${-yPos}px, 0) rotate(${rotation}deg)`;
        }
      });

      // Update tracking variables
      lastScrollY = scrollY;
      lastTimestamp = currentTime;
    };

    // Use Lenis scroll event if available, fallback to window scroll
    if (lenis && typeof lenis.on === 'function') {
      lenis.on('scroll', handleScroll);
      
      return () => {
        observer.disconnect();
        if (lenis && typeof lenis.off === 'function') {
          lenis.off('scroll', handleScroll);
        }
      };
    } else {
      // Fallback to window scroll for compatibility
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        observer.disconnect();
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [lenis]);

  const handleSmoothScroll = (targetId: string) => {
    scrollTo(`#${targetId}`, {
      duration: 2,
      easing: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Simple Navigation */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-2">
        {['top', 'typography', 'cards', 'parallax', 'config'].map((section, index) => (
          <Button
            key={section}
            variant="outline"
            size="sm"
            className="w-10 h-10 rounded-full text-xs opacity-70 hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
            onClick={() => handleSmoothScroll(section)}
            title={section}
          >
            {index + 1}
          </Button>
        ))}
      </div>
      
      {/* Hero Section with Enhanced Parallax */}
      <section 
        id="top"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Enhanced Parallax Background Layers */}
        <div className="parallax-element absolute inset-0 bg-gradient-to-br from-blue-500/15 to-purple-600/15" data-speed="0.2"></div>
        <div className="parallax-element absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/40 to-cyan-500/40 rounded-full blur-3xl" data-speed="0.6"></div>
        <div className="parallax-element absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/35 to-pink-500/35 rounded-full blur-3xl" data-speed="0.4"></div>
        <div className="parallax-element absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-r from-green-500/40 to-emerald-500/40 rounded-full blur-3xl" data-speed="0.8"></div>
        <div className="parallax-element absolute bottom-40 right-10 w-64 h-64 bg-gradient-to-r from-orange-500/45 to-red-500/45 rounded-full blur-3xl" data-speed="0.5"></div>
        
        {/* Enhanced floating geometric shapes */}
        <div className="parallax-element absolute top-32 left-1/4 w-12 h-12 bg-blue-400/70 rotate-45 shadow-lg" data-speed="0.9"></div>
        <div className="parallax-element absolute top-64 right-1/3 w-8 h-8 bg-purple-400/80 rounded-full shadow-lg" data-speed="0.7"></div>
        <div className="parallax-element absolute bottom-96 left-1/5 w-6 h-6 bg-green-400/90 rotate-45 shadow-lg" data-speed="1.1"></div>
        <div className="parallax-element absolute bottom-64 right-1/4 w-14 h-14 bg-orange-400/70 rounded-full shadow-lg" data-speed="0.8"></div>
        <div className="parallax-element absolute top-1/2 left-10 w-4 h-4 bg-pink-400/95 rounded-full shadow-lg" data-speed="1.3"></div>
        <div className="parallax-element absolute top-1/3 right-20 w-7 h-7 bg-cyan-400/80 rotate-45 shadow-lg" data-speed="1.0"></div>
        
        <div className="relative z-10 text-center px-4 animate-on-scroll">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-text-shimmer">
            Playground
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in-up">
            Explore the magic of Lenis smooth scrolling
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up mb-12">
            <Button 
              size="lg" 
              onClick={() => handleSmoothScroll('typography')}
              className="transform hover:scale-105 transition-all duration-300"
            >
              Typography Animations
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => handleSmoothScroll('cards')}
              className="transform hover:scale-105 transition-all duration-300"
            >
              Card Transitions
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => handleSmoothScroll('parallax')}
              className="transform hover:scale-105 transition-all duration-300"
            >
              Parallax Effects
            </Button>
          </div>
          
          {/* Scroll indicator */}
          <div className="animate-bounce mt-8">
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <span className="text-sm">Scroll to explore</span>
              <div className="flex flex-col items-center">
                <div className="w-5 h-8 border-2 border-current rounded-full flex justify-center">
                  <div className="w-1 h-2 bg-current rounded-full animate-bounce mt-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Typography Animation Section */}
      <section id="typography" ref={typographyRef} className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 typing-animation">Typography Magic</h2>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in-up">
              Watch text come alive with smooth animations and transitions
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
                className={`p-8 bg-card rounded-lg border animate-on-scroll ${item.class}`}
                style={{ animationDelay: item.delay }}
              >
                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                <p className="text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Sed do eiusmod tempor incididunt ut labore.
                </p>
              </div>
            ))}
          </div>

          {/* Letter by Letter Animation */}
          <div className="mt-16 text-center animate-on-scroll">
            <h3 className="text-4xl font-bold mb-8 letter-animation">
              {"ANIMATED LETTERS".split("").map((letter, index) => (
                <span 
                  key={index} 
                  className="inline-block animate-letter"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </h3>
          </div>
        </div>
      </section>

      {/* Card Transitions Section */}
      <section id="cards" ref={cardsRef} className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-5xl font-bold mb-6">Card Transitions</h2>
            <p className="text-xl text-muted-foreground">
              Interactive cards with smooth hover effects and scroll animations
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
              <div key={index} className="animate-on-scroll" style={{ animationDelay: `${index * 100}ms` }}>
                {card.type === 'flip' ? (
                  <div className="card-flip h-64">
                    <div className="card-flip-inner">
                      <div className="card-flip-front bg-white dark:bg-slate-800 border rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                        <p className="text-muted-foreground mb-4">{card.description}</p>
                        <div className="h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                          <span className="text-2xl font-bold opacity-60">06</span>
                        </div>
                      </div>
                      <div className="card-flip-back">
                        <div className="text-center text-white">
                          <h3 className="text-2xl font-bold mb-4">🎉 Flipped!</h3>
                          <p className="text-lg opacity-90">This is the back side with different content!</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Card className={`card-${card.type} cursor-pointer transition-all duration-500 h-64`}>
                    <CardHeader>
                      <CardTitle className="text-xl">{card.title}</CardTitle>
                      <CardDescription>{card.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="relative flex-1">
                      <div className="h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-2xl font-bold opacity-60">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      {card.type === 'slide' && (
                        <div className="slide-content">
                          <span className="text-xl font-bold">Slide Effect!</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Effects Section */}
      <section id="parallax" ref={parallaxRef} className="py-20 px-4 relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 min-h-screen">
        {/* Enhanced Multiple Parallax Layers */}
        <div className="parallax-element absolute inset-0 bg-gradient-to-r from-green-500/15 to-blue-500/15" data-speed="0.15"></div>
        <div className="parallax-element absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-r from-green-400/45 to-blue-500/45 rounded-full blur-3xl" data-speed="0.4"></div>
        <div className="parallax-element absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/40 to-pink-500/40 rounded-full blur-3xl" data-speed="0.6"></div>
        <div className="parallax-element absolute bottom-1/4 left-1/6 w-72 h-72 bg-gradient-to-r from-orange-400/45 to-red-500/45 rounded-full blur-3xl" data-speed="0.3"></div>
        <div className="parallax-element absolute bottom-10 right-1/3 w-88 h-88 bg-gradient-to-r from-cyan-400/50 to-teal-500/50 rounded-full blur-3xl" data-speed="0.5"></div>
        
        {/* Enhanced floating particles */}
        <div className="parallax-element absolute top-20 left-10 w-8 h-8 bg-blue-400/90 rounded-full shadow-xl" data-speed="0.9"></div>
        <div className="parallax-element absolute top-40 right-20 w-10 h-10 bg-purple-400/80 rounded-full shadow-xl" data-speed="0.7"></div>
        <div className="parallax-element absolute bottom-60 left-20 w-6 h-6 bg-green-400/95 rounded-full shadow-xl" data-speed="1.1"></div>
        <div className="parallax-element absolute bottom-40 right-40 w-9 h-9 bg-orange-400/85 rounded-full shadow-xl" data-speed="0.8"></div>
        <div className="parallax-element absolute top-64 left-1/3 w-7 h-7 bg-pink-400/90 rounded-full shadow-xl" data-speed="1.2"></div>
        <div className="parallax-element absolute bottom-80 right-1/5 w-8 h-8 bg-yellow-400/80 rounded-full shadow-xl" data-speed="1.4"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-5xl font-bold mb-6">Parallax Effects</h2>
            <p className="text-xl text-muted-foreground">
              Elements moving at different speeds create depth and immersion
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="animate-on-scroll">
              <h3 className="text-3xl font-bold mb-6">Smooth Scrolling Magic</h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Lenis provides buttery smooth scrolling with momentum-based physics. 
                Every interaction feels natural and responsive, creating an immersive 
                browsing experience that keeps users engaged.
              </p>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full parallax-element shadow-lg" data-speed="0.2"></div>
                  <span className="text-base">Momentum-based scrolling physics</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full parallax-element shadow-lg" data-speed="0.25"></div>
                  <span className="text-base">Touch and wheel support across devices</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-purple-500 rounded-full parallax-element shadow-lg" data-speed="0.3"></div>
                  <span className="text-base">Customizable easing functions</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-orange-500 rounded-full parallax-element shadow-lg" data-speed="0.35"></div>
                  <span className="text-base">Scroll-triggered animations</span>
                </li>
              </ul>
            </div>
            
            <div className="parallax-element animate-on-scroll" data-speed="0.4">
              <div className="border rounded-xl p-8 shadow-2xl backdrop-blur-sm bg-white/80 dark:bg-slate-800/80">
                <div className="space-y-4">
                  <div className="parallax-element h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded shadow-sm" data-speed="0.15"></div>
                  <div className="parallax-element h-4 bg-gradient-to-r from-green-500 to-blue-500 rounded w-3/4 shadow-sm" data-speed="0.2"></div>
                  <div className="parallax-element h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded w-1/2 shadow-sm" data-speed="0.25"></div>
                  <div className="parallax-element h-32 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg relative overflow-hidden shadow-lg" data-speed="0.3">
                    <div className="parallax-element absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent" data-speed="0.35"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements Demo */}
          <div className="mt-20 text-center animate-on-scroll">
            <h3 className="text-2xl font-bold mb-4">Multi-Layer Parallax</h3>
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-blue-500/10 rounded-full text-sm text-muted-foreground">
              <span>👆 Scroll to see parallax effects</span>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-muted-foreground mb-8">Watch the background shapes move at different speeds as you scroll</p>
            <div className="relative h-64 rounded-xl overflow-hidden border bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
              <div className="parallax-element absolute inset-0 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-pink-500/15" data-speed="0.1"></div>
              <div className="parallax-element absolute top-8 left-8 w-20 h-20 bg-blue-500/60 rounded-full shadow-xl" data-speed="0.3"></div>
              <div className="parallax-element absolute top-16 right-16 w-16 h-16 bg-green-500/60 rounded-full shadow-xl" data-speed="0.4"></div>
              <div className="parallax-element absolute bottom-12 left-1/3 w-24 h-24 bg-purple-500/60 rounded-full shadow-xl" data-speed="0.5"></div>
              <div className="parallax-element absolute bottom-8 right-8 w-18 h-18 bg-orange-500/60 rounded-full shadow-xl" data-speed="0.6"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center backdrop-blur-sm bg-white/20 dark:bg-black/20 rounded-lg p-6 shadow-lg">
                  <h4 className="text-xl font-bold mb-2">Parallax Demo</h4>
                  <p className="text-sm text-muted-foreground">Background elements at different depths</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Configuration Showcase */}
      <section id="config" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-5xl font-bold mb-6">Live Scroll Metrics</h2>
            <p className="text-xl text-muted-foreground">
              Real-time tracking of scroll behavior and velocity
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <Card className="animate-on-scroll">
              <CardHeader>
                <CardTitle>Scroll Velocity</CardTitle>
                <CardDescription>Live velocity tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2 scroll-velocity">0</div>
                  <p className="text-sm text-muted-foreground">pixels/second</p>
                  <div className="mt-4 w-full bg-muted rounded-full h-3">
                    <div className="velocity-bar h-full bg-gradient-to-r from-green-500 to-red-500 rounded-full transition-all duration-200" style={{ width: '0%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-on-scroll">
              <CardHeader>
                <CardTitle>Scroll Progress</CardTitle>
                <CardDescription>Page scroll completion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 scroll-progress-bar"
                      style={{ width: '0%' }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Position:</span>
                      <div className="scroll-position font-mono">0px</div>
                    </div>
                    <div>
                      <span className="font-medium">Progress:</span>
                      <div className="scroll-percentage font-mono">0%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-on-scroll">
              <CardHeader>
                <CardTitle>Direction</CardTitle>
                <CardDescription>Scroll direction indicator</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2 scroll-direction">—</div>
                  <p className="text-sm text-muted-foreground scroll-direction-text">Neutral</p>
                  <div className="mt-4 flex justify-center">
                    <div className="w-8 h-16 bg-muted rounded-full relative overflow-hidden">
                      <div className="direction-indicator w-full h-8 bg-blue-500 rounded-full transition-all duration-300 absolute" style={{ top: '50%', transform: 'translateY(-50%)' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Interactive Controls */}
          <div className="mt-16 animate-on-scroll">
            <Card>
              <CardHeader>
                <CardTitle>Scroll Controls</CardTitle>
                <CardDescription>
                  Test different easing functions and scroll behaviors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button 
                    size="sm"
                    onClick={() => scrollTo(0, { duration: 2, easing: (t) => t })}
                    className="text-xs"
                  >
                    Linear to Top
                  </Button>
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={() => scrollTo('#cards', { 
                      duration: 3, 
                      easing: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
                    })}
                    className="text-xs"
                  >
                    Cubic to Cards
                  </Button>
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={() => scrollTo('#parallax', { 
                      duration: 2.5, 
                      easing: (t) => 1 - Math.pow(1 - t, 4) 
                    })}
                    className="text-xs"
                  >
                    Ease-out to Parallax
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Back to Top */}
      <section className="py-20 text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="animate-on-scroll mb-8">
            <h2 className="text-4xl font-bold mb-4">🎉 Playground Complete!</h2>
            <p className="text-xl text-muted-foreground mb-8">
              You&apos;ve experienced the full power of Lenis smooth scrolling
            </p>
          </div>
          <Button 
            onClick={() => handleSmoothScroll('top')}
            size="lg"
            className="animate-bounce-subtle bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
          >
            ↑ Back to Top
          </Button>
        </div>
      </section>
    </div>
  );
}
