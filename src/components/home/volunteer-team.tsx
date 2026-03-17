import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { PlusIcon } from "@/components/ui/icons";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Sarthak Joshi",
    role: "Founder Surgery Care Foundation",
    image: "/images/team-1.png",
  },
  {
    name: "Om Pawar",
    role: "Co-Founder Surgery Care Foundation",
    image: "/images/team-2.png",
  },
  {
    name: "Swati Mali",
    role: "Chairman Surgery Care Foundation",
    image: "/images/team-3.png",
  },
];

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Card */}
      <div className="relative mb-6 w-full max-w-[357px]">
        <div className="relative overflow-hidden rounded-[40px] border border-surface-subtle bg-surface-bg shadow-soft">
          {/* Gradient blur behind photo */}
          <div
            className="absolute left-1/2 top-12 h-[80%] w-[80%] -translate-x-1/2 rounded-full blur-[40px]"
            style={{
              backgroundImage:
                "linear-gradient(234deg, rgba(1, 74, 98, 0.05) 0%, rgba(1, 238, 163, 0.1) 100%)",
            }}
          />
          {/* Photo */}
          <div className="relative mx-auto aspect-[293/442] w-[82%] pt-10 pb-6">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-contain object-bottom"
              sizes="(min-width: 1024px) 293px, (min-width: 640px) 50vw, 100vw"
            />
          </div>
        </div>

        {/* Plus button */}
        <div className="absolute -bottom-5 left-1/2 z-10 flex size-12 -translate-x-1/2 items-center justify-center rounded-full bg-primary shadow-secondary">
          <PlusIcon className="size-6 text-white" />
        </div>
      </div>

      {/* Info */}
      <Heading level="h4" as="h3" className="mb-1 mt-2">
        {member.name}
      </Heading>
      <Text
        as="span"
        size="label"
        className="font-bold tracking-[0.35px] text-accent"
      >
        {member.role}
      </Text>
    </div>
  );
}

export function VolunteerTeam() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Decorative background shape — diagonal mint gradient top-right */}
      <div className="pointer-events-none absolute -right-32 -top-16 h-[800px] w-[500px] rotate-[20deg] rounded-[80px] bg-gradient-to-b from-surface-green/80 to-surface-green/20 blur-sm" />

      <Container className="relative">
        {/* Label with lines */}
        <div className="mb-3 flex items-center justify-center gap-3">
          <span className="h-px w-6 bg-accent-green" />
          <Text
            as="span"
            size="label"
            className="font-black tracking-[1.4px] text-accent-green"
          >
            Our People
          </Text>
          <span className="h-px w-6 bg-accent-green" />
        </div>

        {/* Heading */}
        <Heading level="h2" className="mx-auto mb-16 max-w-md text-center">
          Meet Our Volunteer{" "}
          <span className="text-accent">Team</span> Members
        </Heading>

        {/* Team grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM_MEMBERS.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </Container>
    </section>
  );
}
