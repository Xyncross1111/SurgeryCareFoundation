"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatINR } from "@/lib/format";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { buttonVariants } from "@/components/ui/button";
import { BookmarkIcon } from "@/components/ui/icons";

interface SavedCause {
  id: string;
  name: string;
  age: number;
  condition: string;
  description: string;
  raised: number;
  goal: number;
  backers: number;
  image: string;
  savedOn: string;
}

const SAVED_CAUSES: SavedCause[] = [
  {
    id: "pallavi-mane",
    name: "Pallavi Mane",
    age: 25,
    condition: "Cancer",
    description: "Pallavi needs urgent chemotherapy treatment. Every contribution brings her closer to recovery.",
    raised: 150000,
    goal: 300000,
    backers: 319,
    image: "/images/hero-1.jpg",
    savedOn: "Mar 10, 2026",
  },
  {
    id: "samarth-verma",
    name: "Samarth Verma",
    age: 51,
    condition: "Brain Tumor",
    description: "Samarth requires a critical brain surgery. Your support can give him a second chance at life.",
    raised: 250000,
    goal: 350000,
    backers: 519,
    image: "/images/hero-2.jpg",
    savedOn: "Mar 6, 2026",
  },
];

export default function SavedCausesPage() {
  const [causes, setCauses] = useState(SAVED_CAUSES);

  function handleRemove(id: string) {
    setCauses((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div>
      <Heading level="h2" as="h1" className="mb-2">Saved Causes</Heading>
      <Text variant="secondary" className="mb-8">
        Causes you&apos;ve bookmarked for later. {causes.length > 0 && `(${causes.length} saved)`}
      </Text>

      {causes.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-surface-border bg-white py-20 shadow-card">
          <span className="mb-4 flex size-16 items-center justify-center rounded-full bg-surface-page">
            <BookmarkIcon className="size-8 text-slate-light" />
          </span>
          <Heading level="h3" as="h2" className="mb-2 text-accent">
            No saved causes yet
          </Heading>
          <Text variant="secondary" className="mb-6 max-w-sm text-center">
            Browse causes and bookmark the ones you&apos;d like to support later.
          </Text>
          <Link href="/causes" className={buttonVariants({ variant: "secondary" })}>
            Browse Causes
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {causes.map((cause) => {
            const pct = Math.round((cause.raised / cause.goal) * 100);
            return (
              <div key={cause.id} className="rounded-2xl border border-surface-border bg-white shadow-card">
                <div className="flex flex-col gap-6 p-6 sm:flex-row">
                  {/* Image */}
                  <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-xl sm:h-auto sm:w-44">
                    <Image
                      src={cause.image}
                      alt={cause.name}
                      fill
                      className="object-cover"
                      sizes="(min-width: 640px) 176px, 100vw"
                    />
                    <span className="absolute right-2 top-2 z-10 rounded-full bg-white px-2 py-0.5 text-caption font-black uppercase tracking-wide text-primary">
                      Age {cause.age}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col">
                    <div className="mb-2 flex items-center gap-3">
                      <Badge variant="accent" className="text-[10px]">{cause.condition}</Badge>
                      <Text variant="muted" size="label" className="normal-case tracking-normal">
                        Saved on {cause.savedOn}
                      </Text>
                    </div>

                    <Heading level="h4" as="h2" className="mb-2 text-accent">
                      Help {cause.name} Fight {cause.condition}
                    </Heading>

                    <Text variant="secondary" className="mb-4 line-clamp-2">
                      {cause.description}
                    </Text>

                    {/* Progress */}
                    <div className="mb-1 flex items-baseline justify-between">
                      <Text className="font-black text-primary">
                        &#8377; {formatINR(cause.raised)} raised
                      </Text>
                      <Text variant="muted" size="label" className="normal-case tracking-normal">
                        Goal: &#8377; {formatINR(cause.goal)} &bull; {pct}%
                      </Text>
                    </div>
                    <ProgressBar value={cause.raised} max={cause.goal} className="mb-4" />

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/causes/${cause.id}`}
                        className={buttonVariants({ variant: "secondary", className: "flex-1 sm:flex-none" })}
                      >
                        Donate Now
                      </Link>
                      <Link
                        href={`/causes/${cause.id}`}
                        className={buttonVariants({ variant: "outline", className: "flex-1 sm:flex-none" })}
                      >
                        View Details
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleRemove(cause.id)}
                        className={buttonVariants({ variant: "outline", className: "flex-1 text-red-500 border-red-300 hover:bg-red-50 hover:text-red-600 sm:flex-none" })}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
