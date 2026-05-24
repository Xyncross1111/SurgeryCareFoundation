"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { ShieldCheckIcon } from "@/components/ui/icons";

export function TrustStrip() {
  const t = useTranslations("trustStrip");
  const badges = [t("regNgo"), t("taxExempt12a"), t("donorBenefit80g")];

  return (
    <section className="border-y border-surface-border bg-white py-5">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-10">
          {badges.map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 text-btn font-bold uppercase tracking-[1px] text-primary"
            >
              <ShieldCheckIcon className="size-5 text-accent" />
              {label}
            </span>
          ))}
          <span
            aria-hidden="true"
            className="hidden text-slate-light sm:inline"
          >
            ·
          </span>
          <span className="text-btn font-bold uppercase tracking-[1px] text-slate-light">
            {t("documentsOnRequest")}
          </span>
        </div>
      </Container>
    </section>
  );
}
