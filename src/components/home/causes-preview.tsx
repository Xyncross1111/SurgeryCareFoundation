import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { buttonVariants } from "@/components/ui/button";
import { formatINR } from "@/lib/format";

interface Cause {
  id: string;
  name: string;
  age: number;
  condition: string;
  description: string;
  raised: number;
  goal: number;
  backers: number;
  image: string;
}

const CAUSES: Cause[] = [
  {
    id: "pallavi-mane",
    name: "Pallavi Mane",
    age: 25,
    condition: "Cancer",
    description: "Urgent medical support needed. Your donation can save a life today.",
    raised: 150000,
    goal: 300000,
    backers: 319,
    image: "/images/hero-1.jpg",
  },
  {
    id: "samarth-verma",
    name: "Samarth Verma",
    age: 51,
    condition: "Brain Tumor",
    description: "Urgent medical support needed. Your donation can save a life today.",
    raised: 250000,
    goal: 350000,
    backers: 519,
    image: "/images/hero-2.jpg",
  },
  {
    id: "aloke-dubey",
    name: "Aloke Dubey",
    age: 33,
    condition: "Chronic Kidney",
    description: "Urgent medical support needed. Your donation can save a life today.",
    raised: 200000,
    goal: 500000,
    backers: 422,
    image: "/images/hero-3.jpg",
  },
  {
    id: "gagubai-kate",
    name: "Gagubai Kate",
    age: 23,
    condition: "Heart Blockage",
    description: "Urgent medical support needed. Your donation can save a life today.",
    raised: 20000,
    goal: 100000,
    backers: 69,
    image: "/images/hero-4.jpg",
  },
];

function CauseCard({ cause }: { cause: Cause }) {
  const percentage = Math.round((cause.raised / cause.goal) * 100);

  return (
    <Card>
      {/* Image with overlay */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={cause.image}
          alt={cause.name}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        {/* Age badge */}
        <span className="absolute right-3 top-3 z-10 rounded-full bg-white px-2.5 py-1 text-caption font-black uppercase tracking-wide text-primary">
          Age {cause.age}
        </span>

        {/* Name & condition overlay */}
        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12">
          <p className="text-lg font-black text-white">{cause.name}</p>
          <Badge variant="accent" className="mt-1 text-caption">
            {cause.condition}
          </Badge>
        </div>
      </div>

      <CardContent>
        <Text variant="secondary" className="mb-4 line-clamp-2">
          {cause.description}
        </Text>

        {/* Stats row */}
        <div className="mb-1 flex items-baseline justify-between">
          <p className="text-btn font-black text-primary">
            &#8377; {formatINR(cause.raised)}
          </p>
          <p className="text-btn font-black text-primary">
            {cause.backers}
          </p>
        </div>
        <div className="mb-3 flex justify-between">
          <Text as="span" variant="muted" size="label">Raised</Text>
          <Text as="span" variant="muted" size="label">Backers</Text>
        </div>

        {/* Progress */}
        <div className="mb-1 flex justify-between">
          <Text as="span" variant="muted" size="label">
            Goal: &#8377; {formatINR(cause.goal)}
          </Text>
          <Text as="span" variant="muted" size="label">{percentage}%</Text>
        </div>
        <ProgressBar value={cause.raised} max={cause.goal} className="mb-4" />

        {/* CTA */}
        <Link
          href={`/causes/${cause.id}`}
          className={buttonVariants({
            variant: "outline",
            size: "default",
            className: "w-full",
          })}
        >
          Donate Now
        </Link>
      </CardContent>
    </Card>
  );
}

export function CausesPreview() {
  return (
    <section className="bg-surface-page py-16 md:py-24">
      <Container>
        <div className="mb-12 max-w-lg">
          <Heading level="h2" className="mb-4">
            Help and donate to them when they are in need.
          </Heading>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CAUSES.map((cause) => (
            <CauseCard key={cause.id} cause={cause} />
          ))}
        </div>
      </Container>
    </section>
  );
}
