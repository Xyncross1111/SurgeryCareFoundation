"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { formatINR } from "@/lib/format";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { buttonVariants } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { CheckCircleIcon, GridIcon, ShareIcon } from "@/components/ui/icons";

export default function ThankYouPage() {
  const t = useTranslations("thankYou");
  const searchParams = useSearchParams();
  const amountParam = searchParams.get("amount");
  const status = searchParams.get("status");
  const donationId = searchParams.get("donationId");
  const amount = amountParam ? parseInt(amountParam, 10) : null;
  const { toast } = useToast();

  useEffect(() => {
    if (status !== "success") return;
    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
    if (typeof fbq !== "function") return;
    const opts = donationId ? { eventID: donationId } : undefined;
    if (amount && amount > 0) {
      fbq("track", "Purchase", { value: amount, currency: "INR" }, opts);
    } else {
      fbq("track", "Purchase", {}, opts);
    }
  }, [status, amount, donationId]);

  async function handleShare() {
    const shareUrl =
      typeof window !== "undefined" ? `${window.location.origin}/causes` : "/causes";
    const shareText = t("shareText");
    try {
      if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
        await navigator.share({
          title: "Surgery Care Foundation",
          text: shareText,
          url: shareUrl,
        });
        return;
      }
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        toast(t("linkCopied"), "success");
      }
    } catch (err) {
      if ((err as DOMException)?.name === "AbortError") return;
      toast(t("shareFailed"), "error");
    }
  }

  const renderBody = () => {
    const hasAmount = amount && amount > 0;
    const key =
      status === "success"
        ? hasAmount ? "successWithAmount" : "successNoAmount"
        : hasAmount ? "pendingWithAmount" : "pendingNoAmount";
    return t.rich(key, {
      amount: hasAmount ? formatINR(amount as number) : "",
      b: (chunks) => <span className="font-bold text-accent">{chunks}</span>,
    });
  };

  return (
    <section className="bg-surface-page py-12 md:py-32">
      <Container className="flex justify-center">
        <div className="relative w-full max-w-lg text-center">
          {/* Check icon */}
          <div className="mx-auto -mb-7 flex size-14 items-center justify-center rounded-full bg-accent shadow-lg">
            <CheckCircleIcon className="size-7 text-white" />
          </div>

          <div className="rounded-2xl border border-surface-border bg-white px-6 pb-8 pt-12 shadow-card sm:px-8 sm:pt-14">
            <Heading level="h2" as="h1" className="mb-4">
              {t("heading")}
            </Heading>

            <Text variant="secondary" className="mb-6">
              {renderBody()}
            </Text>

            {/* Receipt notice */}
            <div className="mb-8 rounded-xl bg-surface-page px-4 py-4 sm:px-6">
              <p className="flex items-center justify-center gap-2 text-btn font-bold text-primary">
                <span className="text-red-500" aria-hidden="true">&#10084;</span>
                {status === "success" ? t("receiptSent") : t("receiptPending")}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/dashboard"
                className={buttonVariants({ variant: "secondary", className: "w-full gap-2 sm:w-auto" })}
              >
                <GridIcon className="size-4" />
                {t("dashboard")}
              </Link>
              <button
                type="button"
                onClick={handleShare}
                className={buttonVariants({ variant: "outline", className: "w-full gap-2 sm:w-auto" })}
              >
                <ShareIcon className="size-4" />
                {t("shareImpact")}
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
