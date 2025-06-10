import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Portfolio",
  description: "Learn more about my background, skills, and experience",
};

interface SkillSet {
  category: string;
  technologies: string[];
}

interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
}

export default function AboutPage() {
  const skills: SkillSet[] = [
    {
      category: "Frontend",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "Angular"]
    },
    {
      category: "Backend",
      technologies: ["Node.js", "Python", "Express", "FastAPI", "PostgreSQL", "MongoDB"]
    },
    {
      category: "Cloud & DevOps",
      technologies: ["AWS", "Docker", "Kubernetes", "CI/CD", "Vercel", "Netlify"]
    },
    {
      category: "Tools & Others",
      technologies: ["Git", "VS Code", "Figma", "Jest", "Playwright", "GraphQL"]
    }
  ];

  const experience: Experience[] = [
    {
      company: "Tech Innovations Inc.",
      position: "Senior Full-Stack Developer",
      period: "2022 - Present",
      description: "Leading development of scalable web applications and mentoring junior developers."
    },
    {
      company: "Digital Solutions Ltd.",
      position: "Frontend Developer",
      period: "2020 - 2022",
      description: "Developed responsive web applications and improved user experience across multiple products."
    },
    {
      company: "StartupCo",
      position: "Junior Developer",
      period: "2019 - 2020",
      description: "Built features for a fast-growing SaaS platform and learned modern development practices."
    }
  ];

  return (
    <div className="min-h-screen p-8 pb-20">
      <main className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">About Me</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I&apos;m a passionate full-stack developer with over 5 years of experience creating 
            innovative web solutions that make a difference.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">My Story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                My journey in technology began during university when I discovered the power 
                of code to solve real-world problems. What started as curiosity quickly became 
                a passion for creating digital experiences that matter.
              </p>
              <p className="text-muted-foreground">
                Over the years, I&apos;ve had the privilege of working with startups and 
                established companies, helping them bring their visions to life through 
                clean, efficient, and scalable code.
              </p>
              <p className="text-muted-foreground">
                When I&apos;m not coding, you can find me exploring new technologies, 
                contributing to open-source projects, or enjoying the great outdoors.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">What I Believe</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold">User-Centric Design</h4>
                  <p className="text-sm text-muted-foreground">
                    Every line of code should serve the user&apos;s needs and enhance their experience.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Continuous Learning</h4>
                  <p className="text-sm text-muted-foreground">
                    Technology evolves rapidly, and staying curious is key to staying relevant.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Clean Code</h4>
                  <p className="text-sm text-muted-foreground">
                    Writing maintainable, readable code is just as important as functionality.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Collaboration</h4>
                  <p className="text-sm text-muted-foreground">
                    The best solutions come from diverse teams working together.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Skills & Technologies</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {skills.map((skillSet, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{skillSet.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skillSet.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Experience</h2>
          <div className="space-y-6">
            {experience.map((job, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{job.position}</CardTitle>
                      <CardDescription className="text-lg font-medium">
                        {job.company}
                      </CardDescription>
                    </div>
                    <span className="text-sm text-muted-foreground">{job.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{job.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Let&apos;s Work Together</CardTitle>
            <CardDescription className="text-lg">
              I&apos;m always excited to take on new challenges and collaborate on interesting projects.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg">
              Start a Conversation
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
