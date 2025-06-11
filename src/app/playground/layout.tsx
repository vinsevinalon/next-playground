import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground - Portfolio",
  description: "Explore Lenis smooth scrolling animations and interactive effects",
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
