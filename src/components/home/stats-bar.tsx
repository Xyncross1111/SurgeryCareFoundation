"use client";

import { Container } from "@/components/ui/container";
import { useApi } from "@/hooks/use-api";
import { publicService } from "@/services/public.service";
import { formatINR } from "@/lib/format";
import type { SiteStats } from "@/types/content";

interface StatsBarProps {
  initialStats?: SiteStats;
}

export function StatsBar({ initialStats }: StatsBarProps = {}) {
  const { data: liveStats } = useApi(() => publicService.getStats(), []);
  const stats = liveStats ?? initialStats ?? null;

  const raisedValue = `₹ ${formatINR(stats?.totalRaised ?? 0)}`;
  const donationsValue = (stats?.totalDonors ?? 0).toLocaleString("en-IN");
  const activeCausesValue = String(stats?.totalCampaigns ?? 0);

  const items = [
    { value: "85", label: "Volunteers" },
    { value: raisedValue, label: "Raised" },
    { value: donationsValue, label: "Donations" },
    { value: activeCausesValue, label: "Active Causes" },
  ];

  return (
    <section className="border-y border-surface-border bg-white py-12 md:py-16">
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {items.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="mb-1 text-[40px] font-black leading-tight text-primary md:text-[48px]">
                {stat.value}
              </p>
              <p className="text-body-sm font-bold text-slate-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
