"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UrgencyBadge } from "@/components/campaign/urgency-badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { buttonVariants } from "@/components/ui/button";
import { formatINR } from "@/lib/format";
import { useApi } from "@/hooks/use-api";
import { campaignService } from "@/services/campaign.service";
import type { Campaign } from "@/types/campaign";

function CauseCard({ cause }: { cause: Campaign }) {
  const t = useTranslations("causesPreview");
  const tCategories = useTranslations("categories");
  // "<1%" instead of "0%" when something has been raised but rounding
  // hides it (e.g. ₹20 of a ₹15L goal). Matches the cause listing card.
  const percentageLabel = (() => {
    if (cause.goalAmount <= 0) return "0%";
    const raw = (cause.raisedAmount / cause.goalAmount) * 100;
    if (cause.raisedAmount > 0 && raw < 1) return "<1%";
    return `${Math.min(100, Math.round(raw))}%`;
  })();

  return (
    <Link
      href={`/causes/${cause.slug}`}
      className="group block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
    >
    <Card className="flex h-full flex-col overflow-hidden transition-transform group-hover:-translate-y-1">
      {/* Cover — blurred backdrop + object-contain hero, badges pinned at top */}
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-page">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cause.coverImageUrl || "/images/placeholder.jpg"}
          alt=""
          aria-hidden
          className="absolute inset-0 size-full scale-110 object-cover blur-2xl"
        />
        <div className="absolute inset-0 bg-black/15" />
        <Image
          src={cause.coverImageUrl || "/images/placeholder.jpg"}
          alt={cause.title}
          fill
          className="relative object-contain"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute left-3 right-3 top-3 z-10 flex items-center justify-between gap-2">
          {cause.category && cause.category !== "other" ? (
            <Badge variant="accent" className="text-caption shadow-sm">
              {tCategories(cause.category)}
            </Badge>
          ) : (
            <span aria-hidden="true" />
          )}
          <UrgencyBadge level={cause.urgencyLevel} className="shadow-sm" />
        </div>
      </div>

      <CardContent className="flex flex-1 flex-col p-5">
        <h3 className="mb-1 line-clamp-2 text-btn font-black text-primary transition-colors group-hover:text-accent">
          {cause.title}
        </h3>
        {cause.condition && (
          <Text variant="muted" size="label" className="mb-3 normal-case tracking-normal line-clamp-1">
            {cause.condition}
          </Text>
        )}
        {cause.summary && (
          <Text variant="secondary" size="body" className="mb-4 line-clamp-2">
            {cause.summary}
          </Text>
        )}

        {/* Progress — pinned to the bottom so cards stay aligned regardless
            of title/summary length. */}
        <div className="mt-auto">
          <div className="mb-1 flex items-baseline justify-between">
            <p className="text-btn font-black text-primary">
              &#8377; {formatINR(cause.raisedAmount)}
            </p>
            <p className="text-btn font-black text-primary">
              {cause._count?.donations ?? 0}
            </p>
          </div>
          <div className="mb-3 flex justify-between">
            <Text as="span" variant="muted" size="label">{t("raised")}</Text>
            <Text as="span" variant="muted" size="label">{t("backers")}</Text>
          </div>

          <div className="mb-1 flex justify-between">
            <Text as="span" variant="muted" size="label">
              {t("goalPrefix", { amount: formatINR(cause.goalAmount) })}
            </Text>
            <Text as="span" variant="muted" size="label">{percentageLabel}</Text>
          </div>
          <ProgressBar value={cause.raisedAmount} max={cause.goalAmount} className="mb-4" />

          <span
            className={buttonVariants({
              variant: "outline",
              size: "default",
              className: "w-full",
            })}
          >
            {t("donateNow")}
          </span>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
}

export function CausesPreview() {
  const t = useTranslations("causesPreview");
  const { data, isLoading } = useApi(
    () => campaignService.list({ limit: 4, sort: "createdAt", order: "desc" }),
    [],
  );

  const campaigns = data?.items ?? [];

  return (
    <section className="bg-surface-page py-16 md:py-24">
      <Container>
        <div className="mb-12 max-w-3xl">
          <Heading level="h2" className="mb-4">
            {t("heading")}
          </Heading>
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <div className="h-56 animate-pulse bg-surface-subtle" />
                <CardContent>
                  <div className="mb-4 h-10 animate-pulse rounded bg-surface-subtle" />
                  <div className="mb-3 h-4 animate-pulse rounded bg-surface-subtle" />
                  <div className="mb-4 h-2 animate-pulse rounded bg-surface-subtle" />
                  <div className="h-10 animate-pulse rounded bg-surface-subtle" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : campaigns.length === 0 ? (
          <Text variant="secondary" className="text-center py-12">
            {t("emptyState")}
          </Text>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {campaigns.map((campaign) => (
              <CauseCard key={campaign.id} cause={campaign} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
