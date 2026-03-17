import Link from "next/link";
import Image from "next/image";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { buttonVariants } from "@/components/ui/button";

export default function MyFundraisersPage() {
  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Heading level="h2" as="h1" className="mb-1">My Fundraisers</Heading>
          <Text variant="secondary">Manage and track the progress of your created causes.</Text>
        </div>
        <Link href="/fundraiser/new" className={buttonVariants({ variant: "secondary", className: "gap-2" })}>
          + New
        </Link>
      </div>

      {/* Fundraiser card */}
      <div className="rounded-2xl border border-surface-border bg-white shadow-card">
        <div className="flex flex-col gap-6 p-6 sm:flex-row">
          <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl sm:w-40">
            <Image
              src="/images/hero-4.jpg"
              alt="Gagubai Kate"
              fill
              className="object-cover"
              sizes="160px"
            />
          </div>

          <div className="flex-1">
            <div className="mb-2 flex items-center gap-3">
              <Badge variant="accent" className="text-[10px]">Active</Badge>
            </div>
            <Heading level="h4" as="h2" className="mb-3 text-accent">
              Help Gagubai Kate Overcome Heart Blockage
            </Heading>

            <div className="mb-2 flex items-baseline justify-between">
              <Text className="font-black text-primary">₹ 20,000 raised</Text>
              <Text variant="muted" size="label" className="normal-case tracking-normal">
                Goal: ₹ 100,000
              </Text>
            </div>
            <ProgressBar value={20000} max={100000} className="mb-4" />

            <div className="flex flex-wrap gap-3">
              <Link
                href="/causes/gagubai-kate"
                className={buttonVariants({ variant: "outline", className: "flex-1 sm:flex-none" })}
              >
                View Public Page
              </Link>
              <button
                type="button"
                className={buttonVariants({ variant: "outline", className: "flex-1 sm:flex-none" })}
              >
                Update Medical Docs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
