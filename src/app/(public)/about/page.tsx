import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/shared/page-hero";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Surgery Care Foundation — our mission, board of trustees, and partner hospitals working together to fund life-saving surgeries for patients across India.",
  alternates: { canonical: "/about" },
};
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { ImpactStats } from "@/components/home/impact-stats";
import { VolunteerTeam } from "@/components/home/volunteer-team";
import { TrustStrip } from "@/components/ui/trust-strip";
import {
  TargetIcon,
  ShieldIcon,
  HeartHandshakeIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
} from "@/components/ui/icons";

export default async function AboutPage() {
  const t = await getTranslations("about");

  const VALUES = [
    { icon: TargetIcon, title: t("valueDirectImpactTitle"), description: t("valueDirectImpactDescription") },
    { icon: ShieldIcon, title: t("valueVerifiedCasesTitle"), description: t("valueVerifiedCasesDescription") },
    { icon: HeartHandshakeIcon, title: t("valueEndToEndTitle"), description: t("valueEndToEndDescription") },
  ];

  const CONDITIONS = [
    { group: t("conditionsPaediatricGroup"), items: t.raw("conditionsPaediatricItems") as string[] },
    { group: t("conditionsOncologyGroup"), items: t.raw("conditionsOncologyItems") as string[] },
  ];

  const MISSION_POINTS = t.raw("missionPoints") as string[];
  const NEVER_DO = t.raw("neverDoItems") as string[];

  const DONATION_FLOW = [
    { step: "01", title: t("donationStep1Title"), description: t("donationStep1Description") },
    { step: "02", title: t("donationStep2Title"), description: t("donationStep2Description") },
    { step: "03", title: t("donationStep3Title"), description: t("donationStep3Description") },
  ];

  const REGISTRATIONS = [
    { label: t("regNgoLabel"), status: t("regNgoStatus"), description: t("regNgoDescription") },
    { label: t("reg12aLabel"), status: t("reg12aStatus"), description: t("reg12aDescription") },
    { label: t("reg80gLabel"), status: t("reg80gStatus"), description: t("reg80gDescription") },
    { label: t("regPanLabel"), status: t("regPanStatus"), description: t("regPanDescription") },
  ];

  return (
    <>
      <PageHero
        title={t("heroTitle")}
        highlight={t("heroHighlight")}
        subtitle={t("heroSubtitle")}
      />

      <ImpactStats />
      <TrustStrip />

      {/* About the Company */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="relative mx-auto h-[400px] w-full max-w-lg overflow-hidden rounded-[48px] shadow-elevated lg:h-[480px]">
              <Image
                src="/images/mission.jpg"
                alt="Surgery Care team supporting a young patient"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 530px, 512px"
              />
            </div>

            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-[3px] w-8 rounded-full bg-accent-green" />
                <Text as="span" size="label" className="font-black tracking-[1.4px] text-accent-green">
                  {t("companyLabel")}
                </Text>
              </div>

              <Heading level="h2" className="mb-6">
                {t("companyHeadingPrefix")}{" "}
                <span className="bg-gradient-to-b from-accent-green to-accent-mint bg-clip-text text-transparent">
                  {t("companyHeadingHighlight")}
                </span>
              </Heading>

              <Text variant="secondary" size="body-lg" className="mb-10">
                {t("companyBody")}
              </Text>

              <div className="space-y-6">
                {VALUES.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-green">
                      <Icon className="size-5 text-accent" />
                    </span>
                    <div>
                      <p className="mb-1 text-btn font-black text-primary">{title}</p>
                      <Text variant="secondary">{description}</Text>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Conditions We Treat */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="rounded-[32px] border border-surface-border bg-white p-8 shadow-card md:p-10">
            <div className="mb-6 max-w-2xl">
              <Text size="label" className="mb-3 text-accent">
                {t("conditionsLabel")}
              </Text>
              <Heading level="h2" as="h2" className="mb-3">
                {t("conditionsHeading")}
              </Heading>
              <Text variant="secondary">
                {t("conditionsBody")}
              </Text>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {CONDITIONS.map((group) => (
                <div key={group.group}>
                  <p className="mb-3 text-btn font-black uppercase tracking-[0.7px] text-primary">
                    {group.group}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-surface-green px-4 py-2 text-caption font-bold text-accent"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Vision + Mission */}
      <section className="bg-surface-page py-16 md:py-24">
        <Container>
          {/* Vision */}
          <div className="mx-auto mb-16 max-w-4xl text-center">
            <Text size="label" className="mb-3 tracking-[1.4px] font-black text-accent">
              {t("visionLabel")}
            </Text>
            <Heading level="h2" className="mb-6">
              {t("visionHeadingPrefix")}{" "}
              <span className="bg-gradient-to-b from-accent-green to-accent-mint bg-clip-text text-transparent">
                {t("visionHeadingHighlight")}
              </span>
            </Heading>
            <Text variant="secondary" size="body-lg" className="leading-relaxed">
              {t("visionStatement")}
            </Text>
          </div>

          {/* Mission */}
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <Text size="label" className="mb-3 tracking-[1.4px] font-black text-accent">
              {t("missionLabel")}
            </Text>
            <Heading level="h2" className="mb-4">
              {t("missionHeadingPrefix")}{" "}
              <span className="text-accent">{t("missionHeadingHighlight")}</span>
            </Heading>
          </div>

          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
            {MISSION_POINTS.map((point, i) => (
              <div
                key={point}
                className={
                  "flex items-start gap-4 rounded-2xl border border-surface-border bg-white p-6 shadow-card" +
                  (i === MISSION_POINTS.length - 1 ? " md:col-span-2" : "")
                }
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-green">
                  <CheckCircleIcon className="size-5 text-accent" />
                </span>
                <p className="text-[16px] leading-relaxed text-slate">{point}</p>
              </div>
            ))}
          </div>

          {/* Closing tagline */}
          <div className="mx-auto mt-14 max-w-3xl text-center">
            <p className="text-[22px] font-black leading-snug text-primary md:text-[28px]">
              <span className="text-accent">&ldquo;</span>
              {t("closingTagline")}
              <span className="text-accent">&rdquo;</span>
            </p>
          </div>
        </Container>
      </section>

      {/* How Your Donation Works */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <Text size="label" className="mb-3 tracking-[1.4px] font-black text-accent">
              {t("donationLabel")}
            </Text>
            <Heading level="h2" className="mb-4">
              {t("donationHeadingPrefix")}{" "}
              <span className="text-accent">{t("donationHeadingHighlight")}</span>
            </Heading>
            <Text variant="secondary" size="body-lg">
              {t("donationBody")}
            </Text>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
            {DONATION_FLOW.map(({ step, title, description }) => (
              <div
                key={step}
                className="rounded-3xl border border-surface-border bg-white p-8 shadow-card"
              >
                <span className="mb-6 inline-flex h-10 items-center rounded-full bg-cta-gradient px-4 text-[14px] font-black text-white">
                  {step}
                </span>
                <p className="mb-2 text-btn-lg font-black text-primary">{title}</p>
                <Text variant="secondary">{description}</Text>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Our Promises (What we never do) */}
      <section className="bg-surface-page py-16 md:py-24">
        <Container>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Text size="label" className="mb-3 tracking-[1.4px] font-black text-accent">
              {t("promisesLabel")}
            </Text>
            <Heading level="h2" className="mb-4">
              {t("promisesHeadingPrefix")}{" "}
              <span className="text-accent">{t("promisesHeadingHighlight")}</span>
            </Heading>
            <Text variant="secondary" size="body-lg">
              {t("promisesBody")}
            </Text>
          </div>

          <ul className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
            {NEVER_DO.map((promise) => (
              <li
                key={promise}
                className="flex items-start gap-4 rounded-2xl border border-surface-border bg-white p-6 shadow-card"
              >
                <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-green">
                  <ShieldCheckIcon className="size-4 text-accent" />
                </span>
                <span className="text-[16px] leading-relaxed text-slate">{promise}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Registrations & Compliance */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Text size="label" className="mb-3 tracking-[1.4px] font-black text-accent">
              {t("registrationsLabel")}
            </Text>
            <Heading level="h2" className="mb-4">
              {t("registrationsHeadingPrefix")}{" "}
              <span className="text-accent">{t("registrationsHeadingHighlight")}</span>
            </Heading>
            <Text variant="secondary" size="body-lg">
              {t("registrationsBody")}
            </Text>
          </div>

          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {REGISTRATIONS.map(({ label, status, description }) => (
              <div
                key={label}
                className="rounded-2xl border border-surface-border bg-white p-6 shadow-card"
              >
                <span className="mb-4 inline-flex size-10 items-center justify-center rounded-full bg-surface-green">
                  <ShieldCheckIcon className="size-5 text-accent" />
                </span>
                <p className="mb-1 text-btn-lg font-black text-primary">{label}</p>
                <p className="mb-3 text-label font-bold uppercase tracking-[1.2px] text-accent-green">
                  {status}
                </p>
                <Text variant="secondary">{description}</Text>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Goals */}
      <section className="bg-surface-page py-16 md:py-24">
        <Container>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <Text size="label" className="mb-3 tracking-[1.4px] font-black text-accent">
              {t("goalsLabel")}
            </Text>
            <Heading level="h2">
              {t("goalsHeadingPrefix")}{" "}
              <span className="text-accent">{t("goalsHeadingHighlight")}</span>
            </Heading>
            <Text variant="secondary" size="body-lg" className="mt-4">
              {t("goalsBody")}
            </Text>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-surface-border bg-white p-8 shadow-card">
              <span className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl bg-surface-green">
                <HeartHandshakeIcon className="size-6 text-accent" />
              </span>
              <Heading level="h4" as="h3" className="mb-2">
                {t("goalValuesTitle")}
              </Heading>
              <Text variant="secondary">
                {t("goalValuesDescription")}
              </Text>
            </div>
            <div className="rounded-3xl border border-surface-border bg-white p-8 shadow-card">
              <span className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl bg-surface-green">
                <ShieldCheckIcon className="size-6 text-accent" />
              </span>
              <Heading level="h4" as="h3" className="mb-2">
                {t("goalIntegrityTitle")}
              </Heading>
              <Text variant="secondary">
                {t("goalIntegrityDescription")}
              </Text>
            </div>
          </div>
        </Container>
      </section>

      <VolunteerTeam />
    </>
  );
}
