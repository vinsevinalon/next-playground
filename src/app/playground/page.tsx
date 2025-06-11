"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLenis } from "@/hooks/use-lenis";
// import { PlaygroundNavigation } from "@/components/playground-navigation";

// Note: Metadata export should be in a separate file for client components
// This could be handled by creating a separate layout.tsx or page.tsx wrapper

export default function PlaygroundPage() {
  const { scrollTo } = useLenis();
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const typographyRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize scroll-triggered animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "-10% 0px -10% 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all animation targets
    const animationTargets = document.querySelectorAll('.animate-on-scroll');
    animationTargets.forEach(target => observer.observe(target));

    // Velocity tracking variables
    let lastScrollY = window.scrollY;
    let lastTimestamp = Date.now();
    let velocity = 0;

    // Parallax effect and scroll progress
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const currentTime = Date.now();
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (scrollY / docHeight) * 100;
      
      // Calculate velocity
      const deltaY = scrollY - lastScrollY;
      const deltaTime = currentTime - lastTimestamp;
      velocity = deltaTime > 0 ? Math.abs(deltaY / deltaTime * 1000) : 0; // pixels per second
      
      // Update scroll progress indicators
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
        const velocityPercent = Math.min(velocity / 10, 100); // Cap at reasonable max
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
      
      // Parallax elements - simplified approach
      const parallaxElements = document.querySelectorAll('.parallax-element');
      parallaxElements.forEach((element) => {
        const speed = parseFloat(element.getAttribute('data-speed') || '0.5');
        // Simple parallax - move elements based on scroll
        const yPos = scrollY * speed;
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });

      // Update tracking variables
      lastScrollY = scrollY;
      lastTimestamp = currentTime;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
            className="w-10 h-10 rounded-full text-xs opacity-70 hover:opacity-100 transition-all duration-300"
            onClick={() => handleSmoothScroll(section)}
            title={section}
          >
            {index + 1}
          </Button>
        ))}
      </div>
      
      {/* Hero Section with Parallax */}
      <section 
        id="top"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Parallax Background Layers */}
        <div className="parallax-element absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10" data-speed="0.2"></div>
        <div className="parallax-element absolute top-20 left-10 w-64 h-64 bg-blue-500/30 rounded-full blur-xl" data-speed="0.5"></div>
        <div className="parallax-element absolute top-40 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-xl" data-speed="0.3"></div>
        <div className="parallax-element absolute bottom-20 left-1/3 w-80 h-80 bg-green-500/25 rounded-full blur-xl" data-speed="0.7"></div>
        <div className="parallax-element absolute bottom-40 right-10 w-48 h-48 bg-orange-500/30 rounded-full blur-xl" data-speed="0.4"></div>
        
        <div className="relative z-10 text-center px-4 animate-on-scroll">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-text-shimmer">
            Playground
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in-up">
            Explore the magic of Lenis smooth scrolling
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
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

          {/* Scroll-based Text Reveal */}
          <div className="mt-16 animate-on-scroll">
            <h3 className="text-3xl font-bold mb-8 text-center">Scroll-based Text Reveal</h3>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg leading-relaxed text-reveal-text">
                {`This text reveals itself as you scroll down the page. Each word appears with a smooth animation, 
                creating an engaging reading experience. The reveal effect is triggered by the intersection observer, 
                perfectly synchronized with Lenis smooth scrolling. This technique is perfect for storytelling, 
                product descriptions, or any content where you want to guide the reader's attention progressively 
                through the narrative.`.split(' ').map((word, index) => (
                  <span 
                    key={index}
                    className="inline-block opacity-0 text-reveal-word"
                    style={{ 
                      animationDelay: `${index * 50}ms`,
                      marginRight: '0.25rem'
                    }}
                  >
                    {word}
                  </span>
                ))}
              </p>
            </div>
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
      <section id="parallax" ref={parallaxRef} className="py-20 px-4 relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
        {/* Multiple Parallax Layers */}
        <div className="parallax-element absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5" data-speed="0.1"></div>
        <div className="parallax-element absolute top-10 left-1/4 w-72 h-72 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-full blur-3xl" data-speed="0.3"></div>
        <div className="parallax-element absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/15 to-pink-500/15 rounded-full blur-3xl" data-speed="0.5"></div>
        <div className="parallax-element absolute bottom-1/4 left-1/6 w-80 h-80 bg-gradient-to-r from-orange-400/20 to-red-500/20 rounded-full blur-3xl" data-speed="0.2"></div>
        <div className="parallax-element absolute bottom-10 right-1/3 w-64 h-64 bg-gradient-to-r from-cyan-400/25 to-teal-500/25 rounded-full blur-3xl" data-speed="0.4"></div>
        
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
                  <div className="w-3 h-3 bg-green-500 rounded-full parallax-element" data-speed="0.1"></div>
                  <span className="text-base">Momentum-based scrolling physics</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full parallax-element" data-speed="0.15"></div>
                  <span className="text-base">Touch and wheel support across devices</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full parallax-element" data-speed="0.2"></div>
                  <span className="text-base">Customizable easing functions</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full parallax-element" data-speed="0.25"></div>
                  <span className="text-base">Scroll-triggered animations</span>
                </li>
              </ul>
            </div>
            
            <div className="parallax-element animate-on-scroll" data-speed="0.3">
              <div className="border rounded-xl p-8 shadow-2xl backdrop-blur-sm bg-white/80 dark:bg-slate-800/80">
                <div className="space-y-4">
                  <div className="parallax-element h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded" data-speed="0.1"></div>
                  <div className="parallax-element h-4 bg-gradient-to-r from-green-500 to-blue-500 rounded w-3/4" data-speed="0.15"></div>
                  <div className="parallax-element h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded w-1/2" data-speed="0.2"></div>
                  <div className="parallax-element h-32 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg relative overflow-hidden" data-speed="0.25">
                    <div className="parallax-element absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent" data-speed="0.3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements Demo */}
          <div className="mt-20 text-center animate-on-scroll">
            <h3 className="text-2xl font-bold mb-8">Multi-Layer Parallax</h3>
            <p className="text-muted-foreground mb-8">Watch the background shapes move at different speeds as you scroll</p>
            <div className="relative h-64 rounded-xl overflow-hidden border bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
              <div className="parallax-element absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" data-speed="0.1"></div>
              <div className="parallax-element absolute top-8 left-8 w-16 h-16 bg-blue-500/40 rounded-full" data-speed="0.2"></div>
              <div className="parallax-element absolute top-16 right-16 w-12 h-12 bg-green-500/40 rounded-full" data-speed="0.3"></div>
              <div className="parallax-element absolute bottom-12 left-1/3 w-20 h-20 bg-purple-500/40 rounded-full" data-speed="0.4"></div>
              <div className="parallax-element absolute bottom-8 right-8 w-14 h-14 bg-orange-500/40 rounded-full" data-speed="0.5"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h4 className="text-xl font-bold mb-2">Parallax Demo</h4>
                  <p className="text-sm text-muted-foreground">Background elements at different depths</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Showcase */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-5xl font-bold mb-6">Performance Features</h2>
            <p className="text-xl text-muted-foreground">
              Optimized for 60fps smooth animations
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="animate-on-scroll performance-card">
              <CardHeader>
                <CardTitle className="text-xl">RAF Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-500 mb-2">60fps</div>
                  <p className="text-sm text-muted-foreground">
                    RequestAnimationFrame ensures smooth rendering
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-on-scroll performance-card">
              <CardHeader>
                <CardTitle className="text-xl">Memory Efficient</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-500 mb-2">&lt;50kb</div>
                  <p className="text-sm text-muted-foreground">
                    Lightweight library with zero dependencies
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-on-scroll performance-card">
              <CardHeader>
                <CardTitle className="text-xl">Touch Support</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-500 mb-2">100%</div>
                  <p className="text-sm text-muted-foreground">
                    Native touch and gesture support
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Lenis Configuration Showcase */}
      <section id="config" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-5xl font-bold mb-6">Lenis Configuration</h2>
            <p className="text-xl text-muted-foreground">
              Customizable scrolling behavior and easing functions
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="animate-on-scroll">
              <CardHeader>
                <CardTitle>Scroll Controls</CardTitle>
                <CardDescription>
                  Interactive controls to test different scroll behaviors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button 
                    size="sm"
                    onClick={() => scrollTo(0, { duration: 3, easing: (t) => t })}
                    className="text-xs"
                  >
                    Linear Scroll to Top
                  </Button>
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={() => scrollTo(document.body.scrollHeight, { 
                      duration: 4, 
                      easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t 
                    })}
                    className="text-xs"
                  >
                    Ease-in-out to Bottom
                  </Button>
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={() => scrollTo('#cards', { 
                      duration: 2.5, 
                      easing: (t) => 1 - Math.pow(1 - t, 4) 
                    })}
                    className="text-xs"
                  >
                    Bounce to Cards
                  </Button>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <code className="text-sm">
                    scrollTo(target, {`{`}<br/>
                    &nbsp;&nbsp;duration: 2,<br/>
                    &nbsp;&nbsp;easing: (t) =&gt; customFunction(t)<br/>
                    {`}`})
                  </code>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-on-scroll">
              <CardHeader>
                <CardTitle>Scroll Progress</CardTitle>
                <CardDescription>
                  Visual feedback of scroll position
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 scroll-progress-bar"
                      style={{ width: '0%' }}
                    ></div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Scroll to see the progress bar fill up based on page position
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Scroll Position:</span>
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
          </div>
        </div>
      </section>

      {/* Momentum & Velocity Showcase */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-5xl font-bold mb-6">Momentum & Physics</h2>
            <p className="text-xl text-muted-foreground">
              Experience natural scrolling with momentum-based physics
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
                  <div className="mt-4 w-full bg-muted rounded-full h-2">
                    <div className="velocity-bar h-full bg-gradient-to-r from-green-500 to-red-500 rounded-full transition-all duration-200" style={{ width: '0%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-on-scroll">
              <CardHeader>
                <CardTitle>Lerp Factor</CardTitle>
                <CardDescription>Smoothing interpolation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2 text-blue-500">0.1</div>
                  <p className="text-sm text-muted-foreground">Linear interpolation</p>
                  <div className="mt-4 text-xs text-muted-foreground">
                    Higher values = snappier scrolling<br/>
                    Lower values = smoother scrolling
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
        </div>
      </section>

      {/* Back to Top */}
      <section className="py-20 text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="animate-on-scroll mb-8">
            <h2 className="text-4xl font-bold mb-4">🎉 Playground Complete!</h2>
            <p className="text-xl text-muted-foreground mb-8">
              You&apos;ve experienced the full power of Lenis smooth scrolling with:
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-12 text-left">
              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-4 rounded-lg">
                <span className="text-2xl mb-2 block">✨</span>
                <h3 className="font-semibold mb-1">Typography Magic</h3>
                <p className="text-sm text-muted-foreground">Smooth text animations and reveals</p>
              </div>
              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-4 rounded-lg">
                <span className="text-2xl mb-2 block">🎴</span>
                <h3 className="font-semibold mb-1">Card Transitions</h3>
                <p className="text-sm text-muted-foreground">Interactive hover effects and flips</p>
              </div>
              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-4 rounded-lg">
                <span className="text-2xl mb-2 block">🌊</span>
                <h3 className="font-semibold mb-1">Parallax Effects</h3>
                <p className="text-sm text-muted-foreground">Multi-layer depth and movement</p>
              </div>
              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-4 rounded-lg">
                <span className="text-2xl mb-2 block">⚙️</span>
                <h3 className="font-semibold mb-1">Configuration</h3>
                <p className="text-sm text-muted-foreground">Custom easing and controls</p>
              </div>
              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-4 rounded-lg">
                <span className="text-2xl mb-2 block">📊</span>
                <h3 className="font-semibold mb-1">Performance</h3>
                <p className="text-sm text-muted-foreground">60fps smooth animations</p>
              </div>
              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-4 rounded-lg">
                <span className="text-2xl mb-2 block">🚀</span>
                <h3 className="font-semibold mb-1">Physics</h3>
                <p className="text-sm text-muted-foreground">Momentum-based scrolling</p>
              </div>
            </div>
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
