import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WorkNavigation } from "@/components/work-navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work - Portfolio",
  description: "Explore my professional work and projects",
};

export default function WorkPage() {
  const projects = [
    {
      title: "E-commerce Platform",
      description: "A modern e-commerce solution with real-time inventory management, secure payment processing, and comprehensive admin dashboard.",
      tech: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
      year: "2024",
      status: "Launched" as const,
      impact: "Processing $100K+ monthly transactions",
      liveUrl: "https://example-ecommerce.com",
      githubUrl: "https://github.com/example/ecommerce"
    },
    {
      title: "Task Management Application",
      description: "Collaborative workspace with real-time updates, team management, project tracking, and advanced reporting capabilities.",
      tech: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
      year: "2024",
      status: "In Progress" as const,
      impact: "Used by 500+ teams for project management",
      githubUrl: "https://github.com/example/task-manager"
    },
    {
      title: "AI Analytics Dashboard",
      description: "Business intelligence platform with machine learning insights, predictive analytics, and automated reporting for data-driven decisions.",
      tech: ["Python", "TensorFlow", "React", "D3.js", "FastAPI"],
      year: "2023",
      status: "Completed" as const,
      impact: "Reduced data analysis time by 75%",
      liveUrl: "https://analytics-demo.com"
    },
    {
      title: "Mobile Weather App",
      description: "Cross-platform mobile application with detailed forecasts, severe weather alerts, and location-based notifications.",
      tech: ["React Native", "TypeScript", "Weather API", "Push Notifications"],
      year: "2023",
      status: "Launched" as const,
      impact: "10,000+ downloads on app stores",
      liveUrl: "https://weather-app-demo.com"
    }
  ];

  const techStack = {
    frontend: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    backend: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Redis", "Express"],
    tools: ["AWS", "Docker", "Git", "Vercel", "GitHub Actions", "Figma"]
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <WorkNavigation />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Hero Section */}
            <div id="overview" className="text-center mb-16">
              <h1 className="text-5xl font-bold mb-6">My Work</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                A curated collection of projects showcasing expertise in modern web development, 
                from full-stack applications to AI-powered solutions that solve real-world problems.
              </p>
            </div>

            {/* Featured Projects */}
            <div id="projects" className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Featured Projects</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {projects.map((project, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-xl">{project.title}</CardTitle>
                        <span className="text-sm text-muted-foreground">{project.year}</span>
                      </div>
                      <CardDescription className="text-base leading-relaxed">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Technology Stack */}
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        
                        {/* Impact */}
                        {project.impact && (
                          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <p className="text-sm font-medium text-green-800 dark:text-green-200">
                              Impact: {project.impact}
                            </p>
                          </div>
                        )}

                        {/* Status and Actions */}
                        <div className="flex justify-between items-center">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            project.status === "Launched" 
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : project.status === "Completed"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          }`}>
                            {project.status}
                          </span>
                          <div className="flex gap-2">
                            {project.liveUrl && (
                              <Button variant="outline" size="sm" asChild>
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                  Live Demo
                                </a>
                              </Button>
                            )}
                            {project.githubUrl && (
                              <Button variant="outline" size="sm" asChild>
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                  Source Code
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Technologies Section */}
            <div id="tech-stack" className="mb-16">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Technologies & Tools</CardTitle>
                  <CardDescription className="text-center">
                    A comprehensive toolkit for building modern, scalable web applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div>
                      <h4 className="font-semibold mb-4 text-lg">Frontend</h4>
                      <div className="flex flex-wrap gap-2">
                        {techStack.frontend.map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-md text-sm font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4 text-lg">Backend</h4>
                      <div className="flex flex-wrap gap-2">
                        {techStack.backend.map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-md text-sm font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4 text-lg">Tools & DevOps</h4>
                      <div className="flex flex-wrap gap-2">
                        {techStack.tools.map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-md text-sm font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Process Section */}
            <div id="process" className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Development Process</h2>
              <div className="grid gap-6 md:grid-cols-4">
                {[
                  {
                    step: "1",
                    title: "Discovery",
                    description: "Understanding requirements, user needs, and project goals through detailed consultation."
                  },
                  {
                    step: "2", 
                    title: "Planning",
                    description: "Creating detailed project plans, wireframes, and technical architecture documentation."
                  },
                  {
                    step: "3",
                    title: "Development", 
                    description: "Agile development with regular updates, code reviews, and continuous integration."
                  },
                  {
                    step: "4",
                    title: "Launch",
                    description: "Testing, deployment, and ongoing support to ensure optimal performance."
                  }
                ].map((phase, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-xl font-bold text-primary">{phase.step}</span>
                      </div>
                      <h3 className="font-semibold mb-2 text-lg">{phase.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {phase.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-2xl">Ready to Start Your Next Project?</CardTitle>
                <CardDescription className="text-lg">
                  Let&apos;s collaborate to bring your vision to life with modern, scalable solutions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <a href="/contact">Start a Project</a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="/about">Learn About My Process</a>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Free consultation • Custom solutions • Ongoing support
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
