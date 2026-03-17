import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MailIcon, PhoneIcon, MapPinIcon, SendIcon } from "@/components/ui/icons";

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Get in"
        highlight="Touch"
        subtitle="We are here to help. Reach out to us for any queries regarding donations, fundraisers, or partnerships."
      />

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
            {/* Contact Form */}
            <div className="rounded-2xl bg-white p-8 shadow-card lg:col-span-3">
              <Heading level="h3" as="h2" className="mb-8 text-accent">
                Send us a message
              </Heading>

              <form className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Input label="First Name" placeholder="John" />
                  <Input label="Last Name" placeholder="Doe" />
                </div>
                <Input label="Email Address" type="email" placeholder="john@example.com" />
                <Textarea label="Message" placeholder="How can we help you?" />
                <Button variant="secondary" size="lg" type="submit" className="gap-2">
                  Send Message
                  <SendIcon className="size-4" />
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 lg:col-span-2">
              {/* Email */}
              <div className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-card">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-surface-green">
                  <MailIcon className="size-5 text-accent" />
                </span>
                <div>
                  <Heading level="h4" as="h3" className="mb-1">Email Us</Heading>
                  <Text variant="secondary" className="mb-1">We&apos;ll respond within 24 hours.</Text>
                  <a href="mailto:Surgerycare4812@gmail.com" className="text-btn font-bold text-accent transition-colors hover:text-accent-green">
                    Surgerycare4812@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-card">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-surface-green">
                  <PhoneIcon className="size-5 text-accent" />
                </span>
                <div>
                  <Heading level="h4" as="h3" className="mb-1">Call Us</Heading>
                  <Text variant="secondary" className="mb-1">Mon-Fri from 9am to 6pm.</Text>
                  <a href="tel:+919960513453" className="text-btn font-bold text-accent transition-colors hover:text-accent-green">
                    +91 99605 13453
                  </a>
                </div>
              </div>

              {/* HQ */}
              <div className="rounded-2xl bg-primary p-6 text-white">
                <span className="mb-4 flex size-12 items-center justify-center rounded-full bg-accent">
                  <MapPinIcon className="size-5 text-white" />
                </span>
                <Heading level="h4" as="h3" className="mb-3 text-white">Headquarters</Heading>
                <Text variant="on-dark">
                  123 Healthcare Avenue,<br />
                  Medical District, Mumbai<br />
                  Maharashtra, India 400001
                </Text>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
