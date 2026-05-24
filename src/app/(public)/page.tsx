import { HeroSection } from "@/components/home/hero-section";
import { ImpactStats } from "@/components/home/impact-stats";
import { MissionSection } from "@/components/home/mission-section";
import { CausesPreview } from "@/components/home/causes-preview";
import { VolunteerTeam } from "@/components/home/volunteer-team";
import { StatsBar } from "@/components/home/stats-bar";
import { Testimonials } from "@/components/home/testimonials";
import { FaqSection } from "@/components/home/faq-section";
import { TrustStrip } from "@/components/ui/trust-strip";
import { backendGet } from "@/lib/server-fetch";
import type { SiteStats } from "@/types/content";

const ZERO_STATS: SiteStats = {
  totalRaised: 0,
  totalGoal: 0,
  totalDonors: 0,
  totalCampaigns: 0,
};

export default async function Home() {
  const stats = (await backendGet<SiteStats>("/public/stats", { revalidate: 60 })) ?? ZERO_STATS;

  return (
    <>
      <HeroSection />
      <ImpactStats initialStats={stats} />
      <TrustStrip />
      <CausesPreview />
      <MissionSection />
      <VolunteerTeam />
      <StatsBar initialStats={stats} />
      <Testimonials />
      <FaqSection />
    </>
  );
}
