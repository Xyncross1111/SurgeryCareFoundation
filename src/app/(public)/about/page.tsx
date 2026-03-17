import Image from "next/image";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { ImpactStats } from "@/components/home/impact-stats";
import { VolunteerTeam } from "@/components/home/volunteer-team";
import { TargetIcon, ShieldIcon, HeartHandshakeIcon } from "@/components/ui/icons";

const VALUES = [
  {
    icon: TargetIcon,
    title: "Direct Impact",
    description: "100% of your donations go directly to the partnered hospitals.",
  },
  {
    icon: ShieldIcon,
    title: "Verified Cases",
    description: "Every medical case is rigorously vetted by our expert medical board.",
  },
  {
    icon: HeartHandshakeIcon,
    title: "Post-Op Support",
    description: "We ensure patients receive necessary rehabilitation and medication.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Healing Lives"
        highlight="Through Compassion"
        subtitle="We are a dedicated non-profit organization focused on providing life-saving surgical care to those who cannot afford it."
      />

      <ImpactStats />

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="relative mx-auto h-[400px] w-full max-w-lg overflow-hidden rounded-[48px] shadow-elevated lg:h-[480px]">
              <Image
                src="/images/mission.jpg"
                alt="Young patient receiving care"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 530px, 512px"
              />
            </div>

            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-[3px] w-8 rounded-full bg-accent-green" />
                <Text as="span" size="label" className="font-black tracking-[1.4px] text-accent-green">
                  Our Mission
                </Text>
              </div>

              <Heading level="h2" className="mb-6">
                Ensuring No One Is{" "}
                <span className="text-primary">Denied Healthcare</span>{" "}
                <span className="bg-gradient-to-b from-accent-green to-accent-mint bg-clip-text text-transparent">
                  Due To Poverty
                </span>
              </Heading>

              <Text variant="secondary" size="body-lg" className="mb-10">
                At Surgery Care Foundation, we believe that access to critical healthcare is a
                fundamental human right, not a privilege. By connecting generous donors
                directly with verified medical cases, we eliminate the barriers to life-saving
                surgeries.
              </Text>

              {/* Values */}
              <div className="space-y-6">
                {VALUES.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-green">
                      <Icon className="size-5 text-accent" />
                    </span>
                    <div>
                      <p className="mb-1 text-btn font-black text-primary">{title}</p>
                      <Text variant="secondary">{description}</Text>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <VolunteerTeam />
    </>
  );
}
