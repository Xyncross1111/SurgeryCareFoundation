import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { buttonVariants } from "@/components/ui/button";
import { CheckCircleIcon, ShareIcon, HeartFilledIcon } from "@/components/ui/icons";

export default function CauseDetailPage({ params }: { params: { id: string } }) {
  return (
    <section className="py-8 md:py-12">
      <Container>
        {/* Back link */}
        <Link
          href="/causes"
          className="mb-6 inline-flex items-center gap-1 text-btn font-bold text-slate-medium transition-colors hover:text-primary"
        >
          <span aria-hidden="true">&larr;</span> Back to Causes
        </Link>

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
          {/* Left — Content */}
          <div className="lg:col-span-3">
            <div className="relative mb-6 h-[300px] overflow-hidden rounded-2xl md:h-[400px]">
              <Image
                src="/images/hero-3.jpg"
                alt="Patient photo"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 800px, 100vw"
                priority
              />
            </div>

            <div className="mb-6 flex flex-wrap gap-3">
              <Badge variant="accent">Chronic Kidney</Badge>
              <Badge variant="outline">Age 33</Badge>
            </div>

            <Heading level="h2" as="h1" className="mb-6">
              Help Aloke Dubey overcome Chronic Kidney and return to a normal life.
            </Heading>

            <div className="space-y-4">
              <Text>
                Aloke Dubey is in urgent need of medical support. We are raising funds to cover the cost of a
                life-saving surgery and post-operative care.
              </Text>
              <Text variant="secondary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </Text>
              <Heading level="h4" as="h2">Medical Overview</Heading>
              <Text variant="secondary">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </Text>
            </div>
          </div>

          {/* Right — Donation Sidebar */}
          <aside className="lg:col-span-2">
            <div className="sticky top-32 rounded-2xl border border-surface-border bg-white p-6 shadow-card">
              <p className="mb-1 text-h3 text-primary">
                &#8377; 200,000
              </p>
              <Text variant="muted" size="label" className="mb-4">
                Raised of &#8377;500,000 Goal
              </Text>
              <ProgressBar value={200000} max={500000} className="mb-4" />

              <div className="mb-6 flex items-center gap-2">
                <HeartFilledIcon className="size-4 text-red-500" />
                <Text variant="secondary">422 generous backers</Text>
              </div>

              <Link
                href={`/causes/${params.id}/checkout`}
                className={buttonVariants({ variant: "primary", size: "lg", className: "mb-3 w-full" })}
              >
                Donate Now
              </Link>
              <button
                type="button"
                className={buttonVariants({ variant: "outline", size: "default", className: "w-full gap-2" })}
                aria-label="Share this cause"
              >
                <ShareIcon className="size-4" />
                Share this cause
              </button>

              <div className="mt-6 space-y-3 border-t border-surface-border pt-6">
                <div className="flex items-start gap-3">
                  <CheckCircleIcon className="mt-0.5 size-5 shrink-0 text-accent" />
                  <Text variant="secondary">
                    Funds are securely processed and sent directly to the partnered medical facility.
                  </Text>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircleIcon className="mt-0.5 size-5 shrink-0 text-accent" />
                  <Text variant="secondary">
                    All cases are 100% verified by our expert medical board.
                  </Text>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
