"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { formatINR } from "@/lib/format";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { buttonVariants } from "@/components/ui/button";

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

const CATEGORIES = ["All Causes", "Cancer", "Heart Disease", "Brain Tumor", "Kidney"] as const;

const CAUSES: Cause[] = [
  { id: "1", slug: "pallavi-mane", title: "Pallavi Mane", category: "Cancer", summary: "Urgent medical support needed. Your donation can save a life today.", raisedAmount: 150000, goalAmount: 300000, donationCount: 319, coverImageUrl: "/images/hero-1.jpg" },
  { id: "2", slug: "samarth-verma", title: "Samarth Verma", category: "Brain Tumor", summary: "Urgent medical support needed. Your donation can save a life today.", raisedAmount: 250000, goalAmount: 350000, donationCount: 519, coverImageUrl: "/images/hero-2.jpg" },
  { id: "3", slug: "aloke-dubey", title: "Aloke Dubey", category: "Kidney", summary: "Urgent medical support needed. Your donation can save a life today.", raisedAmount: 200000, goalAmount: 500000, donationCount: 422, coverImageUrl: "/images/hero-3.jpg" },
  { id: "4", slug: "gagubai-kate", title: "Gagubai Kate", category: "Heart Disease", summary: "Urgent medical support needed. Your donation can save a life today.", raisedAmount: 20000, goalAmount: 100000, donationCount: 69, coverImageUrl: "/images/hero-4.jpg" },
  { id: "5", slug: "dinesh-joshi", title: "Dinesh Joshi", category: "Cancer", summary: "Urgent medical support needed. Your donation can save a life today.", raisedAmount: 50000, goalAmount: 150000, donationCount: 33, coverImageUrl: "/images/hero-1.jpg" },
  { id: "6", slug: "asha-khandekar", title: "Asha Khandekar", category: "Cancer", summary: "Urgent medical support needed. Your donation can save a life today.", raisedAmount: 350000, goalAmount: 450000, donationCount: 700, coverImageUrl: "/images/hero-2.jpg" },
  { id: "7", slug: "prathamesh-bhise", title: "Prathamesh Bhise", category: "Cancer", summary: "Urgent medical support needed. Your donation can save a life today.", raisedAmount: 300000, goalAmount: 400000, donationCount: 522, coverImageUrl: "/images/hero-3.jpg" },
  { id: "8", slug: "swapnil-thakre", title: "Swapnil Thakre", category: "Brain Tumor", summary: "Urgent medical support needed. Your donation can save a life today.", raisedAmount: 100000, goalAmount: 500000, donationCount: 110, coverImageUrl: "/images/hero-4.jpg" },
];

export default function CausesPage() {
  const [activeFilter, setActiveFilter] = useState("All Causes");

  const filtered = activeFilter === "All Causes"
    ? CAUSES
    : CAUSES.filter((c) => c.category === activeFilter);

  return (
    <>
      <PageHero
        title="Browse"
        highlight="Urgent Causes"
        subtitle="Find an individual in need and help fund their life-saving surgery today."
      />

      {/* Filter tabs */}
      <section className="py-8">
        <Container>
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={cn(
                  "rounded-full px-5 py-2 text-btn font-bold transition-colors",
                  activeFilter === cat
                    ? "bg-primary text-white"
                    : "bg-white text-slate hover:bg-surface-page"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Causes grid */}
      <section className="pb-16 md:pb-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((cause) => {
              const pct = Math.round((cause.raisedAmount / cause.goalAmount) * 100);
              return (
                <Card key={cause.id}>
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={cause.coverImageUrl}
                      alt={cause.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12">
                      <p className="text-lg font-black text-white">{cause.title}</p>
                      <Badge variant="accent" className="mt-1 text-caption">{cause.category}</Badge>
                    </div>
                  </div>
                  <CardContent>
                    <Text variant="secondary" className="mb-4 line-clamp-2">{cause.summary}</Text>
                    <div className="mb-1 flex justify-between">
                      <p className="text-btn font-black text-primary">&#8377; {formatINR(cause.raisedAmount)}</p>
                      <p className="text-btn font-black text-primary">{cause.donationCount}</p>
                    </div>
                    <div className="mb-3 flex justify-between">
                      <Text as="span" variant="muted" size="label">Raised</Text>
                      <Text as="span" variant="muted" size="label">Backers</Text>
                    </div>
                    <div className="mb-1 flex justify-between">
                      <Text as="span" variant="muted" size="label">Goal: &#8377; {formatINR(cause.goalAmount)}</Text>
                      <Text as="span" variant="muted" size="label">{pct}%</Text>
                    </div>
                    <ProgressBar value={cause.raisedAmount} max={cause.goalAmount} className="mb-4" />
                    <Link href={`/causes/${cause.slug}`} className={buttonVariants({ variant: "outline", className: "w-full" })}>
                      Donate Now
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
