"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { ProgressBar } from "@/components/ui/progress-bar";
import { useApi } from "@/hooks/use-api";
import { publicService } from "@/services/public.service";
import { formatINR } from "@/lib/format";
import type { SiteStats } from "@/types/content";

interface ImpactStatsProps {
  initialStats?: SiteStats;
}

export function ImpactStats({ initialStats }: ImpactStatsProps = {}) {
  const t = useTranslations("impactStats");
  const { data: liveStats } = useApi(() => publicService.getStats(), []);
  const stats = liveStats ?? initialStats ?? null;

  const totalRaised = stats?.totalRaised ?? 0;
  const totalGoal = stats?.totalGoal ?? 0;
  const raisedDisplay = `\u20B9 ${formatINR(totalRaised)}`;
  const goalDisplay = `\u20B9 ${formatINR(totalGoal)}`;
  // Same "<1%" rule as cause cards: if money has come in but the
  // ratio rounds to zero, show "<1% funded" so donors don't think the
  // counter is broken.
  const fundedLabel = (() => {
    if (totalGoal <= 0) return "0% funded";
    const raw = (totalRaised / totalGoal) * 100;
    if (totalRaised > 0 && raw < 1) return "<1% funded";
    return `${Math.min(100, Math.round(raw))}% funded`;
  })();
  const currentYear = new Date().getFullYear();
  const donorsCount = stats?.totalDonors ?? 0;
  const campaignsCount = stats?.totalCampaigns ?? 0;

  return (
    <section className="relative -mt-16 z-10 pb-8">
      <Container>
        <div className="grid gap-6 rounded-[40px] bg-white p-8 shadow-elevated md:grid-cols-2 md:p-12">
          {/* Left — Total Raised */}
          <div className="border-r-0 pr-0 md:border-r md:border-surface-subtle md:pr-12">
            <div className="mb-8 inline-flex items-center gap-3">
              <span className="size-3 rounded-full bg-accent-mint shadow-[0px_0px_10px_0px_#00eea3]" />
              <Heading level="h4" as="h2" className="tracking-[-0.6px]">
                {t("totalRaisedFund")}
              </Heading>
            </div>

            <div className="mb-1 flex items-end justify-between">
              <div>
                <p className="text-[30px] font-black leading-[30px] tracking-tight text-primary">
                  {raisedDisplay}
                </p>
                <Text as="span" variant="muted" size="label" className="mt-1 uppercase tracking-[1.2px] text-slate-medium">
                  {t("raised")}
                </Text>
              </div>
              <div className="text-right">
                <p className="text-h4 font-black text-accent">
                  {goalDisplay}
                </p>
                <Text as="span" variant="muted" size="label" className="mt-1 uppercase tracking-[1.2px] text-slate-medium">
                  {t("goal")}
                </Text>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <Text as="span" variant="muted" size="label" className="uppercase tracking-[1.2px] text-slate-medium">
                {t("progress")}
              </Text>
              <p className="text-btn font-black text-accent">{fundedLabel}</p>
            </div>
            <ProgressBar
              value={totalRaised}
              max={totalGoal || 1}
              className="mt-2"
            />

            {/* Secondary stats */}
            <div className="mt-6 flex gap-8">
              <div>
                <p className="text-lg font-black text-primary">{donorsCount.toLocaleString("en-IN")}</p>
                <Text as="span" variant="muted" size="label" className="uppercase tracking-[1.2px] text-slate-medium">
                  {t("donors")}
                </Text>
              </div>
              <div>
                <p className="text-lg font-black text-primary">{campaignsCount}</p>
                <Text as="span" variant="muted" size="label" className="uppercase tracking-[1.2px] text-slate-medium">
                  {t("campaigns")}
                </Text>
              </div>
            </div>
          </div>

          {/* Right — How Your Support Helps */}
          <div className="border-t border-surface-border pt-6 md:border-t-0 md:pl-10 md:pt-0">
            <div className="mb-3 flex gap-3">
              <span className="rounded-full bg-primary px-3 py-1 text-[11.2px] font-bold uppercase tracking-[0.56px] text-white">
                {t("year", { year: currentYear })}
              </span>
              <span className="rounded-full bg-surface-green px-3 py-1 text-[11.2px] font-bold uppercase tracking-[0.56px] text-accent">
                {t("healthcare")}
              </span>
            </div>

            <Heading level="h3" as="h2" className="mb-4 text-[40px] leading-[50px] tracking-[-1px]">
              {t("howSupportHeading")}
            </Heading>

            <Text variant="default" className="text-[18px] leading-[29.25px]">
              {t("howSupportBody")}
            </Text>
          </div>
        </div>
      </Container>
    </section>
  );
}
