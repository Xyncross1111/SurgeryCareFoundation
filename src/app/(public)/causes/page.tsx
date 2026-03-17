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
  name: string;
  age: number;
  condition: string;
  category: string;
  description: string;
  raised: number;
  goal: number;
  backers: number;
  image: string;
}

const CATEGORIES = ["All Causes", "Cancer", "Heart Disease", "Brain Tumor", "Kidney"] as const;

const CAUSES: Cause[] = [
  { id: "pallavi-mane", name: "Pallavi Mane", age: 25, condition: "Cancer", category: "Cancer", description: "Urgent medical support needed. Your donation can save a life today.", raised: 150000, goal: 300000, backers: 319, image: "/images/hero-1.jpg" },
  { id: "samarth-verma", name: "Samarth Verma", age: 51, condition: "Brain Tumor", category: "Brain Tumor", description: "Urgent medical support needed. Your donation can save a life today.", raised: 250000, goal: 350000, backers: 519, image: "/images/hero-2.jpg" },
  { id: "aloke-dubey", name: "Aloke Dubey", age: 33, condition: "Chronic Kidney", category: "Kidney", description: "Urgent medical support needed. Your donation can save a life today.", raised: 200000, goal: 500000, backers: 422, image: "/images/hero-3.jpg" },
  { id: "gagubai-kate", name: "Gagubai Kate", age: 23, condition: "Heart Blockage", category: "Heart Disease", description: "Urgent medical support needed. Your donation can save a life today.", raised: 20000, goal: 100000, backers: 69, image: "/images/hero-4.jpg" },
  { id: "dinesh-joshi", name: "Dinesh Joshi", age: 27, condition: "Cancer", category: "Cancer", description: "Urgent medical support needed. Your donation can save a life today.", raised: 50000, goal: 150000, backers: 33, image: "/images/hero-1.jpg" },
  { id: "asha-khandekar", name: "Asha Khandekar", age: 44, condition: "Breast Cancer", category: "Cancer", description: "Urgent medical support needed. Your donation can save a life today.", raised: 350000, goal: 450000, backers: 700, image: "/images/hero-2.jpg" },
  { id: "prathamesh-bhise", name: "Prathamesh Bhise", age: 15, condition: "Bone Cancer", category: "Cancer", description: "Urgent medical support needed. Your donation can save a life today.", raised: 300000, goal: 400000, backers: 522, image: "/images/hero-3.jpg" },
  { id: "swapnil-thakre", name: "Swapnil Thakre", age: 57, condition: "Brain Tumor", category: "Brain Tumor", description: "Urgent medical support needed. Your donation can save a life today.", raised: 100000, goal: 500000, backers: 110, image: "/images/hero-4.jpg" },
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
              const pct = Math.round((cause.raised / cause.goal) * 100);
              return (
                <Card key={cause.id}>
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={cause.image}
                      alt={cause.name}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <span className="absolute right-3 top-3 z-10 rounded-full bg-white px-2.5 py-1 text-caption font-black uppercase tracking-wide text-primary">
                      Age {cause.age}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12">
                      <p className="text-lg font-black text-white">{cause.name}</p>
                      <Badge variant="accent" className="mt-1 text-caption">{cause.condition}</Badge>
                    </div>
                  </div>
                  <CardContent>
                    <Text variant="secondary" className="mb-4 line-clamp-2">{cause.description}</Text>
                    <div className="mb-1 flex justify-between">
                      <p className="text-btn font-black text-primary">&#8377; {formatINR(cause.raised)}</p>
                      <p className="text-btn font-black text-primary">{cause.backers}</p>
                    </div>
                    <div className="mb-3 flex justify-between">
                      <Text as="span" variant="muted" size="label">Raised</Text>
                      <Text as="span" variant="muted" size="label">Backers</Text>
                    </div>
                    <div className="mb-1 flex justify-between">
                      <Text as="span" variant="muted" size="label">Goal: &#8377; {formatINR(cause.goal)}</Text>
                      <Text as="span" variant="muted" size="label">{pct}%</Text>
                    </div>
                    <ProgressBar value={cause.raised} max={cause.goal} className="mb-4" />
                    <Link href={`/causes/${cause.id}`} className={buttonVariants({ variant: "outline", className: "w-full" })}>
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
