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
  slug: string;
  title: string;
  category: string;
  summary: string;
  raisedAmount: number;
  goalAmount: number;
  donationCount: number;
  coverImageUrl: string;
}

const CAUSES: Cause[] = [
  {
    id: "1",
    slug: "pallavi-mane",
    title: "Pallavi Mane",
    category: "Cancer",
    summary: "Urgent medical support needed. Your donation can save a life today.",
    raisedAmount: 150000,
    goalAmount: 300000,
    donationCount: 319,
    coverImageUrl: "/images/hero-1.jpg",
  },
  {
    id: "2",
    slug: "samarth-verma",
    title: "Samarth Verma",
    category: "Brain Tumor",
    summary: "Urgent medical support needed. Your donation can save a life today.",
    raisedAmount: 250000,
    goalAmount: 350000,
    donationCount: 519,
    coverImageUrl: "/images/hero-2.jpg",
  },
  {
    id: "3",
    slug: "aloke-dubey",
    title: "Aloke Dubey",
    category: "Chronic Kidney",
    summary: "Urgent medical support needed. Your donation can save a life today.",
    raisedAmount: 200000,
    goalAmount: 500000,
    donationCount: 422,
    coverImageUrl: "/images/hero-3.jpg",
  },
  {
    id: "4",
    slug: "gagubai-kate",
    title: "Gagubai Kate",
    category: "Heart Blockage",
    summary: "Urgent medical support needed. Your donation can save a life today.",
    raisedAmount: 20000,
    goalAmount: 100000,
    donationCount: 69,
    coverImageUrl: "/images/hero-4.jpg",
  },
];

function CauseCard({ cause }: { cause: Cause }) {
  const percentage = Math.round((cause.raisedAmount / cause.goalAmount) * 100);

  return (
    <Card>
      {/* Image with overlay */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={cause.coverImageUrl}
          alt={cause.title}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />

        {/* Name & category overlay */}
        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12">
          <p className="text-lg font-black text-white">{cause.title}</p>
          <Badge variant="accent" className="mt-1 text-caption">
            {cause.category}
          </Badge>
        </div>
      </div>

      <CardContent>
        <Text variant="secondary" className="mb-4 line-clamp-2">
          {cause.summary}
        </Text>

        {/* Stats row */}
        <div className="mb-1 flex items-baseline justify-between">
          <p className="text-btn font-black text-primary">
            &#8377; {formatINR(cause.raisedAmount)}
          </p>
          <p className="text-btn font-black text-primary">
            {cause.donationCount}
          </p>
        </div>
        <div className="mb-3 flex justify-between">
          <Text as="span" variant="muted" size="label">Raised</Text>
          <Text as="span" variant="muted" size="label">Backers</Text>
        </div>

        {/* Progress */}
        <div className="mb-1 flex justify-between">
          <Text as="span" variant="muted" size="label">
            Goal: &#8377; {formatINR(cause.goalAmount)}
          </Text>
          <Text as="span" variant="muted" size="label">{percentage}%</Text>
        </div>
        <ProgressBar value={cause.raisedAmount} max={cause.goalAmount} className="mb-4" />

        {/* CTA */}
        <Link
          href={`/causes/${cause.slug}`}
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
