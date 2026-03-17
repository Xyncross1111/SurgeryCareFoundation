import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  image: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "\u201CSurgery Care Foundation gave my family hope when we had none. Truly life-saving support.\u201D",
    name: "Shree Pawar",
    role: "Interior Designer",
    image: "/images/testimonial-1.png",
  },
  {
    quote:
      "\u201CBecause of their help, timely surgery was possible. Forever grateful.\u201D",
    name: "Salim Khan",
    role: "Teacher",
    image: "/images/testimonial-2.png",
  },
  {
    quote:
      "\u201CTheir donation-based support changed a life in our family. Thank you.\u201D",
    name: "Meena Joshi",
    role: "Advocate",
    image: "/images/testimonial-3.png",
  },
];

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
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
            src={testimonial.image}
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
  return (
    <section className="py-16 md:py-24">
      <Container>
        {/* Heading */}
        <Heading level="h2" className="mx-auto mb-16 max-w-lg text-center">
          What People Say About{" "}
          <span className="text-accent">Surgery Care</span>
        </Heading>

        {/* Cards */}
        <div className="grid gap-8 pb-8 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
