"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavigationItem {
  name: string;
  href: string;
}

interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps = {}) {
  const pathname = usePathname();

  const navigationItems: NavigationItem[] = [
    { name: "Home", href: "/" },
    { name: "Work", href: "/work" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav 
      className={cn(
        "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-8 py-4">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            className="flex items-center space-x-2"
            aria-label="Go to homepage"
          >
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Portfolio Logo"
              width={120}
              height={25}
              priority
            />
          </Link>
          
          <div className="hidden md:flex space-x-8" role="list">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm px-1",
                  pathname === item.href
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                )}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          <Button asChild>
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
