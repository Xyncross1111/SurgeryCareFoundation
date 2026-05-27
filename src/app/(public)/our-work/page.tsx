import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Gallery, type GalleryPhoto } from "@/components/our-work/gallery";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Photographs from Surgery Care Foundation outreach — community gatherings, patient visits, and on-the-ground goodwill work across India.",
  alternates: { canonical: "/our-work" },
};

const PHOTOS: GalleryPhoto[] = [
  { src: "/images/our-work/photo-01.jpg", width: 1280, height: 960, alt: "Community gathering" },
  { src: "/images/our-work/photo-02.jpg", width: 1280, height: 960, alt: "Community gathering" },
  { src: "/images/our-work/photo-03.jpg", width: 722, height: 1599, alt: "Outreach activity" },
  { src: "/images/our-work/photo-04.jpg", width: 1280, height: 960, alt: "Community gathering" },
  { src: "/images/our-work/photo-05.jpg", width: 722, height: 1599, alt: "Outreach activity" },
  { src: "/images/our-work/photo-06.jpg", width: 722, height: 1599, alt: "Outreach activity" },
  { src: "/images/our-work/photo-07.jpg", width: 722, height: 1599, alt: "Outreach activity" },
  { src: "/images/our-work/photo-08.jpg", width: 722, height: 1599, alt: "Outreach activity" },
  { src: "/images/our-work/photo-09.jpg", width: 722, height: 1599, alt: "Outreach activity" },
  { src: "/images/our-work/photo-10.jpg", width: 722, height: 1599, alt: "Outreach activity" },
  { src: "/images/our-work/photo-11.jpg", width: 722, height: 1599, alt: "Outreach activity" },
  { src: "/images/our-work/photo-12.jpg", width: 722, height: 1599, alt: "Outreach activity" },
  { src: "/images/our-work/photo-14.jpg", width: 930, height: 1024, alt: "Outreach activity" },
  { src: "/images/our-work/photo-15.jpg", width: 722, height: 1599, alt: "Outreach activity" },
  { src: "/images/our-work/photo-16.jpg", width: 832, height: 1024, alt: "Outreach activity" },
  { src: "/images/our-work/photo-17.jpg", width: 1024, height: 897, alt: "Outreach activity" },
];

const PRESS_CLIPPING = {
  src: "/images/our-work/photo-13.jpg",
  width: 176,
  height: 516,
};

export default async function OurWorkPage() {
  const t = await getTranslations("ourWork");

  return (
    <>
      <PageHero
        title={t("heroTitle")}
        highlight={t("heroHighlight")}
        subtitle={t("heroSubtitle")}
      />

      <section className="py-12 md:py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-3 flex items-center justify-center gap-3">
              <span className="h-[3px] w-8 rounded-full bg-accent-green" />
              <Text as="span" size="label" className="font-black tracking-[1.4px] text-accent-green">
                {t("introLabel")}
              </Text>
              <span className="h-[3px] w-8 rounded-full bg-accent-green" />
            </div>
            <Heading level="h2" className="mb-4">
              {t("introHeadingPrefix")}{" "}
              <span className="bg-gradient-to-b from-accent-green to-accent-mint bg-clip-text text-transparent">
                {t("introHeadingHighlight")}
              </span>
            </Heading>
            <Text variant="secondary" size="body-lg">
              {t("introBody")}
            </Text>
          </div>
        </Container>
      </section>

      <section className="bg-surface-page py-10 md:py-16">
        <Container>
          <Gallery photos={PHOTOS} alt={t("galleryAlt")} />
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <div className="mx-auto max-w-3xl rounded-3xl border border-surface-border bg-white p-6 shadow-card sm:p-10">
            <div className="grid items-center gap-6 sm:grid-cols-[auto_1fr] sm:gap-10">
              <div className="mx-auto w-full max-w-[170px] sm:mx-0 sm:max-w-[200px]">
                <Image
                  src={PRESS_CLIPPING.src}
                  alt={t("pressAlt")}
                  width={PRESS_CLIPPING.width}
                  height={PRESS_CLIPPING.height}
                  className="h-auto w-full rounded-lg border border-surface-border shadow-soft"
                />
              </div>
              <div className="text-center sm:text-left">
                <Text size="label" className="mb-2 tracking-[1.4px] font-black text-accent">
                  {t("pressLabel")}
                </Text>
                <Heading level="h3" className="mb-3">
                  {t("pressHeading")}
                </Heading>
                <Text variant="secondary">{t("pressBody")}</Text>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
