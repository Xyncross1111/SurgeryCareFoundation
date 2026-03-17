"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { PlusIcon, MinusIcon } from "@/components/ui/icons";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "When will I receive the raised funds?",
    answer:
      "You can request a withdrawal as soon as your fundraiser has raised a certain amount. Once Surgery Care verifies your bank details, the raised funds will be transferred within a few working days. You can request multiple fund withdrawals as and when required.",
  },
  {
    question: "How is Surgery Care different from Go Fund Me?",
    answer:
      "Surgery Care is specifically focused on medical and surgical fundraising in India. Unlike GoFundMe, every case is verified by our medical board, and funds are transferred directly to partnered hospitals to ensure transparency and proper use of donations.",
  },
  {
    question: "Can I raise money for my surgery on Surgery Care?",
    answer:
      "Yes, you can start a fundraiser for your own surgery or for someone you know. Simply create a campaign with the required medical documents, and our team will verify and publish your case within 24-48 hours.",
  },
  {
    question: "Is raising funds for medical expenses safe on Surgery Care?",
    answer:
      "Absolutely. Surgery Care uses 256-bit encryption to protect all transactions. Every fundraiser is verified by our medical team, and funds are transferred directly to the hospital, ensuring complete safety and transparency.",
  },
];

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-surface-border bg-white transition-shadow",
        isOpen && "shadow-card"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-8 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-2xl"
        aria-expanded={isOpen}
      >
        <span className="text-btn-lg font-bold text-primary">
          {item.question}
        </span>
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full text-accent">
          {isOpen ? (
            <MinusIcon className="size-5" />
          ) : (
            <PlusIcon className="size-5" />
          )}
        </div>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-96 pb-6" : "max-h-0"
        )}
      >
        <div className="px-8">
          <Text variant="secondary">{item.answer}</Text>
        </div>
      </div>
    </div>
  );
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-surface-page py-16 md:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — Heading + Accordion */}
          <div>
            <div className="mb-8">
              <Text
                size="label"
                variant="muted"
                className="mb-3 tracking-[1.2px] text-accent font-bold"
              >
                Clear Your Doubts
              </Text>
              <Heading level="h2">
                Frequently Asked{" "}
                <span className="bg-gradient-to-b from-accent-green to-accent-mint bg-clip-text text-transparent">
                  Question
                </span>
              </Heading>
            </div>

            <div className="flex flex-col gap-4">
              {FAQ_ITEMS.map((item, index) => (
                <AccordionItem
                  key={item.question}
                  item={item}
                  isOpen={openIndex === index}
                  onToggle={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                />
              ))}
            </div>
          </div>

          {/* Right — Image */}
          <div className="hidden lg:flex items-start justify-center pt-10">
            <div className="relative w-full max-w-[632px] aspect-[632/700]">
              {/* Offset border outline */}
              <div className="absolute inset-0 translate-x-6 -translate-y-6 rounded-[48px] border-2 border-accent-green/20" />
              {/* Main image container */}
              <div className="relative h-full w-full overflow-hidden rounded-[48px] shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-b from-primary to-[#012f40]" />
                {/* Green glow */}
                <div className="absolute right-0 top-0 size-64 rounded-full bg-accent-mint/20 blur-[64px]" />
                <Image
                  src="/images/faq.png"
                  alt="Elderly patient being cared for by a family member"
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 1024px) 50vw, 0vw"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
