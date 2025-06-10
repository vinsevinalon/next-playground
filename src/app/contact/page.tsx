import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Portfolio",
  description: "Get in touch for collaborations, projects, or just to say hello",
};

interface ContactMethod {
  title: string;
  description: string;
  value: string;
  icon: string;
}

interface Service {
  title: string;
  description: string;
}

export default function ContactPage() {
  const contactMethods: ContactMethod[] = [
    {
      title: "Email",
      description: "Drop me a line anytime",
      value: "hello@example.com",
      icon: "📧"
    },
    {
      title: "Phone",
      description: "Give me a call during business hours",
      value: "+1 (555) 123-4567",
      icon: "📱"
    },
    {
      title: "LinkedIn",
      description: "Connect with me professionally",
      value: "linkedin.com/in/yourprofile",
      icon: "💼"
    },
    {
      title: "GitHub",
      description: "Check out my code repositories",
      value: "github.com/yourusername",
      icon: "🐱"
    }
  ];

  const services: Service[] = [
    {
      title: "Web Development",
      description: "Full-stack web applications using modern frameworks and technologies"
    },
    {
      title: "Mobile Development",
      description: "Cross-platform mobile apps with React Native and native technologies"
    },
    {
      title: "UI/UX Design",
      description: "User-centered design and prototyping for digital products"
    },
    {
      title: "Consulting",
      description: "Technical consulting and architecture planning for your projects"
    }
  ];

  return (
    <div className="min-h-screen p-8 pb-20">
      <main className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I&apos;m always interested in new opportunities, collaborations, and interesting projects. 
            Let&apos;s discuss how we can work together to bring your ideas to life.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
            <div className="grid gap-4">
              {contactMethods.map((method, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <span className="text-2xl">{method.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{method.title}</h3>
                        <p className="text-muted-foreground text-sm mb-2">{method.description}</p>
                        <p className="font-medium">{method.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-8">Send a Message</h2>
            <Card>
              <CardContent className="p-6">
                <form className="space-y-4" role="form" aria-label="Contact form">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                        First Name
                      </label>
                      <Input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="Your first name"
                        required
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                        Last Name
                      </label>
                      <Input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Your last name"
                        required
                        aria-required="true"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="your.email@example.com"
                      required
                      aria-required="true"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <Input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="What's this about?"
                      required
                      aria-required="true"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Tell me about your project or just say hello..."
                      required
                      aria-required="true"
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Services I Offer</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="text-center bg-secondary">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to Start Your Project?</CardTitle>
            <CardDescription className="text-lg">
              Whether you have a detailed plan or just an idea, I&apos;d love to help you bring it to life.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Schedule a Call
              </Button>
              <Button variant="outline" size="lg">
                View My Work
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
