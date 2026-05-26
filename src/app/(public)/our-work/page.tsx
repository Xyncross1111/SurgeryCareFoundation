import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/ui/container";
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
  { src: "/images/our-work/photo-13.jpg", width: 176, height: 516, alt: "Press coverage" },
  { src: "/images/our-work/photo-14.jpg", width: 930, height: 1024, alt: "Outreach activity" },
  { src: "/images/our-work/photo-15.jpg", width: 722, height: 1599, alt: "Outreach activity" },
  { src: "/images/our-work/photo-16.jpg", width: 832, height: 1024, alt: "Outreach activity" },
  { src: "/images/our-work/photo-17.jpg", width: 1024, height: 897, alt: "Outreach activity" },
];

export default async function OurWorkPage() {
  const t = await getTranslations("ourWork");

  return (
    <>
      <PageHero
        title={t("heroTitle")}
        highlight={t("heroHighlight")}
        subtitle={t("heroSubtitle")}
      />

      <section className="py-16 md:py-24">
        <Container>
          <Gallery photos={PHOTOS} alt={t("galleryAlt")} />
        </Container>
      </section>
    </>
  );
}
