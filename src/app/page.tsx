import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SmoothScrollDemo } from "@/components/smooth-scroll-demo";

interface Feature {
  title: string;
  description: string;
  details: string;
  link: string;
}

export default function Home() {
  const features: Feature[] = [
    {
      title: "Next.js 15",
      description: "The React framework for production with App Router",
      details: "Server-side rendering, static site generation, and more out of the box.",
      link: "/work"
    },
    {
      title: "ShadCN UI",
      description: "Beautiful, accessible components built with Radix UI",
      details: "Copy and paste components that are customizable and accessible.",
      link: "/about"
    },
    {
      title: "Tailwind CSS",
      description: "Utility-first CSS framework for rapid UI development",
      details: "Build modern designs without ever leaving your HTML.",
      link: "/contact"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div id="hero" className="p-8 pb-20 gap-16 sm:p-20">
        <main className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Welcome to My Portfolio
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              A modern web development portfolio built with Next.js 15, TypeScript, and ShadCN UI components. 
              Showcasing beautiful, accessible, and performant web solutions with Lenis smooth scrolling.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/work">View My Work</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">Learn About Me</Link>
              </Button>
            </div>
          </div>

          {/* Smooth Scroll Demo */}
          <Card className="mb-16">
            <CardHeader>
              <CardTitle>Lenis Smooth Scroll Demo</CardTitle>
              <CardDescription>
                Experience buttery smooth scrolling powered by Lenis library
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SmoothScrollDemo />
            </CardContent>
          </Card>

          {/* Feature Cards */}
          <div id="features" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {feature.details}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={feature.link}>Learn More →</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Getting Started Section */}
          <Card id="technologies" className="mb-16">
            <CardHeader>
              <CardTitle>Built With Modern Technologies</CardTitle>
              <CardDescription>
                This portfolio demonstrates the power of modern web development tools and best practices.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">Frontend Excellence</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• React 18 with Server Components</li>
                    <li>• TypeScript for type safety</li>
                    <li>• Tailwind CSS for styling</li>
                    <li>• ShadCN UI for accessible components</li>
                    <li>• Lenis for smooth scrolling</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Developer Experience</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Turbopack for fast development</li>
                    <li>• ESLint for code quality</li>
                    <li>• Hot reloading and instant updates</li>
                    <li>• Optimized for production builds</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-4">
              <Button asChild>
                <a
                  href="https://nextjs.org/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Next.js Docs
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href="https://ui.shadcn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ShadCN UI Docs
                </a>
              </Button>
            </CardFooter>
          </Card>

          {/* Call to Action */}
          <Card id="cta" className="text-center bg-secondary">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Work Together?</CardTitle>
              <CardDescription className="text-lg">
                Let&apos;s discuss your next project and bring your ideas to life.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/contact">Start a Project</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/work">View Portfolio</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <footer className="flex gap-6 flex-wrap items-center justify-center mt-16 pt-8 border-t">
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://nextjs.org/learn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/file.svg"
                alt="File icon"
                width={16}
                height={16}
              />
              Learn
            </a>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://vercel.com/templates?framework=next.js"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/window.svg"
                alt="Window icon"
                width={16}
                height={16}
              />
              Examples
            </a>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
              />
              Go to nextjs.org →
            </a>
          </footer>
        </main>
      </div>
    </div>
  );
}
