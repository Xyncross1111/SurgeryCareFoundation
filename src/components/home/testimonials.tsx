"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

const TESTIMONIAL_IMAGES = [
  "/images/testimonial-1.png",
  "/images/testimonial-2.png",
  "/images/testimonial-3.png",
];

function TestimonialCard({
  testimonial,
  index,
  image,
}: {
  testimonial: Testimonial;
  index: number;
  image: string;
}) {
  return (
    <div className="relative pt-6">
      {/* Card */}
      <div className="relative rounded-tl-[32px] rounded-tr-[64px] rounded-bl-[64px] rounded-br-[32px] border border-surface-subtle bg-white p-10 pb-12 shadow-[0px_15px_40px_0px_rgba(0,0,0,0.04)]">
        {/* Quote */}
        <p className="mb-8 text-[18px] italic leading-[29px] text-slate">
          {testimonial.quote}
        </p>

        {/* Author */}
        <div>
          <Heading level="h4" className="text-[20px]">
            {testimonial.name}
          </Heading>
          <Text
            as="span"
            size="label"
            className="font-bold uppercase tracking-[0.7px] text-accent"
          >
            {testimonial.role}
          </Text>
        </div>
      </div>

      {/* Number badge — top-left, overlapping card */}
      <div className="absolute left-10 top-0 z-10 flex size-12 items-center justify-center rounded-full border-4 border-white bg-cta-gradient text-[20px] font-black text-white shadow-secondary">
        {index + 1}
      </div>

      {/* Avatar — bottom-right, overlapping card edge */}
      <div className="absolute -bottom-6 right-4 z-10 flex size-[112px] items-center justify-center rounded-full bg-white/50 p-2 shadow-secondary">
        <div className="relative size-24 overflow-hidden rounded-full border-[2.667px] border-accent">
          <Image
            src={image}
            alt={testimonial.name}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const t = useTranslations("testimonials");
  const items = (t.raw("items") as Testimonial[]) ?? [];

  return (
    <section className="py-16 md:py-24">
      <Container>
        {/* Heading */}
        <Heading level="h2" className="mx-auto mb-16 max-w-lg text-center">
          {t("headingPrefix")}{" "}
          <span className="text-accent">{t("headingHighlight")}</span>
        </Heading>

        {/* Cards */}
        <div className="grid gap-8 pb-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <TestimonialCard
              key={item.name}
              testimonial={item}
              index={i}
              image={TESTIMONIAL_IMAGES[i] ?? TESTIMONIAL_IMAGES[0]}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
