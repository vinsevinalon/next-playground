import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work - Portfolio",
  description: "Explore my professional work and projects",
};

interface Project {
  title: string;
  description: string;
  tech: string[];
  year: string;
  status: "Completed" | "In Progress" | "Launched";
  category: "Web Development" | "Mobile App" | "AI/ML" | "Full Stack";
  impact?: string;
  liveUrl?: string;
  githubUrl?: string;
}

interface Achievement {
  metric: string;
  value: string;
  description: string;
}

interface Testimonial {
  client: string;
  role: string;
  content: string;
  project: string;
}

export default function WorkPage() {
  const projects: Project[] = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution built with Next.js, TypeScript, and Stripe integration. Features include product catalog, shopping cart, payment processing, order management, and admin dashboard.",
      tech: ["Next.js", "TypeScript", "Stripe", "Prisma", "PostgreSQL", "Tailwind CSS"],
      year: "2024",
      status: "Launched",
      category: "Full Stack",
      impact: "Increased client sales by 300% within 6 months",
      liveUrl: "https://demo-store.example.com",
      githubUrl: "https://github.com/username/ecommerce-platform"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, team collaboration features, project tracking, and advanced reporting capabilities.",
      tech: ["React", "Socket.io", "Node.js", "MongoDB", "Express", "JWT"],
      year: "2024",
      status: "In Progress",
      category: "Web Development",
      impact: "Used by 500+ teams for project management",
      githubUrl: "https://github.com/username/task-manager"
    },
    {
      title: "AI-Powered Analytics Dashboard",
      description: "A comprehensive analytics dashboard with machine learning insights for business intelligence. Features predictive analytics, data visualization, and automated reporting.",
      tech: ["Python", "TensorFlow", "React", "D3.js", "FastAPI", "Redis"],
      year: "2023",
      status: "Completed",
      category: "AI/ML",
      impact: "Reduced data analysis time by 80%",
      liveUrl: "https://analytics.example.com"
    },
    {
      title: "Mobile Weather App",
      description: "A cross-platform mobile application providing detailed weather forecasts, severe weather alerts, interactive maps, and location-based notifications.",
      tech: ["React Native", "TypeScript", "OpenWeather API", "AsyncStorage", "Push Notifications"],
      year: "2023",
      status: "Launched",
      category: "Mobile App",
      impact: "10,000+ downloads on app stores",
      githubUrl: "https://github.com/username/weather-app"
    },
    {
      title: "SaaS Marketing Platform",
      description: "A comprehensive marketing automation platform with email campaigns, lead tracking, analytics, and CRM integration for small to medium businesses.",
      tech: ["Next.js", "PostgreSQL", "Redis", "Stripe", "SendGrid", "Chart.js"],
      year: "2023",
      status: "Launched",
      category: "Full Stack",
      impact: "Serving 2,000+ active users",
      liveUrl: "https://marketing.example.com"
    },
    {
      title: "Real Estate Portal",
      description: "A modern real estate platform with property listings, virtual tours, mortgage calculator, and agent management system.",
      tech: ["Vue.js", "Laravel", "MySQL", "Cloudinary", "Google Maps API"],
      year: "2022",
      status: "Completed",
      category: "Web Development",
      impact: "Facilitated $50M+ in property transactions"
    }
  ];

  const achievements: Achievement[] = [
    {
      metric: "Projects Delivered",
      value: "25+",
      description: "Successfully completed projects across various industries"
    },
    {
      metric: "Client Satisfaction",
      value: "98%",
      description: "Average client satisfaction rating based on project feedback"
    },
    {
      metric: "Years Experience",
      value: "5+",
      description: "Years of professional software development experience"
    },
    {
      metric: "Technologies Mastered",
      value: "20+",
      description: "Modern web technologies and frameworks in active use"
    }
  ];

  const testimonials: Testimonial[] = [
    {
      client: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      content: "The e-commerce platform exceeded our expectations. The clean code and scalable architecture made it easy to add new features as we grew.",
      project: "E-Commerce Platform"
    },
    {
      client: "Michael Chen",
      role: "Product Manager, DataCorp",
      content: "The analytics dashboard transformed how we make decisions. The AI insights have been invaluable for our business strategy.",
      project: "AI-Powered Analytics Dashboard"
    },
    {
      client: "Emily Rodriguez",
      role: "Marketing Director, GrowthCo",
      content: "Our marketing efficiency improved dramatically with the automation platform. The ROI was evident within the first month.",
      project: "SaaS Marketing Platform"
    }
  ];

  return (
    <div className="min-h-screen p-8 pb-20">
      <main className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">My Work</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A curated collection of projects showcasing expertise in modern web development, 
            from full-stack applications to AI-powered solutions and mobile applications.
          </p>
        </div>

        {/* Achievements Section */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {achievement.value}
                </div>
                <h3 className="font-semibold mb-2">{achievement.metric}</h3>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          <Button variant="default" size="sm">All Projects</Button>
          <Button variant="outline" size="sm">Web Development</Button>
          <Button variant="outline" size="sm">Full Stack</Button>
          <Button variant="outline" size="sm">Mobile App</Button>
          <Button variant="outline" size="sm">AI/ML</Button>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 mb-16">
          {projects.map((project, index) => (
            <Card key={index} className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                    <div className="flex gap-2 mb-3">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                        {project.category}
                      </span>
                      <span className="text-sm text-muted-foreground">{project.year}</span>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-base">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {project.impact && (
                  <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">
                      Impact: {project.impact}
                    </p>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-sm ${
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
                          Code
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Client Testimonials</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardDescription className="text-base italic">
                    &ldquo;{testimonial.content}&rdquo;
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-t pt-4">
                    <p className="font-semibold">{testimonial.client}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm text-primary mt-1">Project: {testimonial.project}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technologies Section */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Technologies & Tools</CardTitle>
            <CardDescription className="text-center">
              A comprehensive toolkit for building modern web applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <h4 className="font-semibold mb-3">Frontend</h4>
                <div className="flex flex-wrap gap-2">
                  {["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS", "Framer Motion"].map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Backend</h4>
                <div className="flex flex-wrap gap-2">
                  {["Node.js", "Python", "PostgreSQL", "MongoDB", "Redis", "Docker"].map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Cloud & DevOps</h4>
                <div className="flex flex-wrap gap-2">
                  {["AWS", "Vercel", "GitHub Actions", "Kubernetes", "Terraform", "Monitoring"].map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Process Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">My Development Process</h2>
          <div className="grid gap-6 md:grid-cols-4">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold mb-2">Discovery</h3>
                <p className="text-sm text-muted-foreground">
                  Understanding requirements, user needs, and project goals through detailed consultation.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold mb-2">Planning</h3>
                <p className="text-sm text-muted-foreground">
                  Creating detailed project plans, wireframes, and technical architecture documentation.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold mb-2">Development</h3>
                <p className="text-sm text-muted-foreground">
                  Agile development with regular updates, code reviews, and continuous integration.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">4</span>
                </div>
                <h3 className="font-semibold mb-2">Launch</h3>
                <p className="text-sm text-muted-foreground">
                  Testing, deployment, and ongoing support to ensure optimal performance.
                </p>
              </CardContent>
            </Card>
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
      </main>
    </div>
  );
}
