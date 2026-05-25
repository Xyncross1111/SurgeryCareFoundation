"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { formatINR } from "@/lib/format";
import { useApi } from "@/hooks/use-api";
import { useToast } from "@/components/ui/toast";
import { useAuth } from "@/context/auth-context";
import { campaignService } from "@/services/campaign.service";
import { paymentService } from "@/services/payment.service";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LockIcon } from "@/components/ui/icons";
import {
  TurnstileWidget,
  isTurnstileConfigured,
} from "@/components/shared/turnstile-widget";
import { RECURRING_TIERS, type RecurringTier } from "@/types/payment";

const AMOUNTS = [1000, 5000, 10000] as const;

async function loadRazorpayScript() {
  if (typeof window === "undefined") return false;
  if ((window as Window & { Razorpay?: unknown }).Razorpay) return true;

  return new Promise<boolean>((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const t = useTranslations("checkout");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { user } = useAuth();

  const { data: campaign, isLoading: campaignLoading } = useApi(
    () => campaignService.getBySlug(params.id),
    [params.id],
  );

  // Honour ?amount= deep-link from the mobile QuickDonateBar. Fall back
  // to the standard 5000 default if absent or non-positive. Custom amount
  // wins over preset, matching how the form already disambiguates.
  const initialAmount = (() => {
    const raw = searchParams.get("amount");
    const n = raw ? parseInt(raw, 10) : NaN;
    return Number.isFinite(n) && n > 0 ? n : 5000;
  })();
  const isPresetAmount = (AMOUNTS as readonly number[]).includes(initialAmount);
  const [selectedAmount, setSelectedAmount] = useState<number>(
    isPresetAmount ? initialAmount : 5000,
  );
  const [customAmount, setCustomAmount] = useState(
    isPresetAmount ? "" : String(initialAmount === 5000 ? "" : initialAmount),
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRequired = isTurnstileConfigured() && !user;

  // Recurring (monthly) mode is a separate UX branch that bypasses the
  // free-text amount input and locks the donor into one of the
  // pre-created Razorpay Plan tiers. Pre-selects from ?recurring=1.
  const initialRecurring = searchParams.get("recurring") === "1";
  const [isRecurring, setIsRecurring] = useState(initialRecurring);
  const [recurringTier, setRecurringTier] = useState<RecurringTier>(
    RECURRING_TIERS[0],
  );

  const donationAmount = isRecurring
    ? recurringTier
    : customAmount
    ? parseInt(customAmount, 10) || 0
    : selectedAmount;

  async function handleSubmit() {
    if (!campaign) {
      toast(t("errors.campaignNotLoaded"), "error");
      return;
    }

    if (isRecurring) {
      if (!user) {
        // Recurring requires an authenticated donor (Razorpay needs a
        // customer record + mandate). Punt to login with a deep-link back.
        router.push(
          `/login?next=${encodeURIComponent(`/causes/${params.id}/checkout?recurring=1`)}`,
        );
        return;
      }
      setIsSubmitting(true);
      try {
        const result = await paymentService.createRecurringDonation({
          campaignId: campaign.id,
          tier: recurringTier,
        });
        // Razorpay hosts the UPI Autopay mandate authentication page;
        // we redirect straight to it. The donor lands back on the
        // dashboard after authorizing.
        window.location.assign(result.shortUrl);
      } catch (err) {
        toast(
          err instanceof Error ? err.message : t("errors.generic"),
          "error",
        );
        setIsSubmitting(false);
      }
      return;
    }

    if (!firstName.trim()) {
      toast(t("errors.firstNameRequired"), "error");
      return;
    }
    if (!email.trim()) {
      toast(t("errors.emailRequired"), "error");
      return;
    }
    if (donationAmount <= 0) {
      toast(t("errors.amountRequired"), "error");
      return;
    }
    if (captchaRequired && !captchaToken) {
      toast(t("errors.captchaRequired"), "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const donationPayload = {
        campaignId: campaign.id,
        amount: donationAmount,
        donorName: `${firstName.trim()} ${lastName.trim()}`.trim(),
        donorEmail: email.trim(),
        isAnonymous,
      };

      let donation;
      let paymentIntent;
      if (user) {
        const initiation = await paymentService.createDonation(donationPayload);
        donation = initiation.donation;
        paymentIntent = initiation.paymentIntent;
      } else {
        donation = await paymentService.createGuestDonation({
          ...donationPayload,
          ...(captchaToken ? { captchaToken } : {}),
        });
        paymentIntent = await paymentService.createGuestIntent({
          donationId: donation.id,
          amount: donationAmount,
        });
      }

      if (!paymentIntent.clientData.key || !paymentIntent.clientData.order_id) {
        throw new Error(t("errors.gatewayNotConfigured"));
      }

      const razorpayLoaded = await loadRazorpayScript();
      if (!razorpayLoaded) {
        throw new Error(t("errors.razorpayFailedToLoad"));
      }

      const Razorpay = (window as Window & {
        Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
      }).Razorpay;

      if (!Razorpay) {
        throw new Error(t("errors.gatewayUnavailable"));
      }

      const razorpay = new Razorpay({
        key: paymentIntent.clientData.key,
        order_id: paymentIntent.clientData.order_id,
        amount: paymentIntent.clientData.amount,
        currency: paymentIntent.clientData.currency,
        name: paymentIntent.clientData.name,
        description: paymentIntent.clientData.description,
        prefill: {
          name: `${firstName.trim()} ${lastName.trim()}`.trim(),
          email: email.trim(),
        },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            await paymentService.verifyGuestPayment({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });
            router.push(
              `/causes/${params.id}/thank-you?donationId=${donation.id}&amount=${donationAmount}&status=success`,
            );
          } catch (err) {
            toast(
              err instanceof Error
                ? err.message
                : t("errors.verificationFailed"),
              "error",
            );
          } finally {
            setIsSubmitting(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsSubmitting(false);
          },
        },
        theme: {
          color: "#014A62",
        },
      });

      razorpay.open();
    } catch (err) {
      toast(
        err instanceof Error ? err.message : t("errors.generic"),
        "error",
      );
      setIsSubmitting(false);
    }
  }

  return (
    <section className="py-8 md:py-12">
      <Container>
        <Link
          href={`/causes/${params.id}`}
          className="mb-2 inline-flex items-center gap-1 text-btn font-bold text-slate-medium transition-colors hover:text-primary"
        >
          {t("back")}
        </Link>
        <Heading level="h2" as="h1" className="mb-8">
          {t("heading")}
        </Heading>

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-white p-6 shadow-card md:p-8">
              {/* One-time vs. monthly toggle */}
              <div
                role="tablist"
                aria-label="Donation frequency"
                className="mb-6 grid grid-cols-2 gap-2 rounded-full bg-surface-page p-1"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={!isRecurring}
                  onClick={() => setIsRecurring(false)}
                  className={cn(
                    "rounded-full py-2 text-btn font-bold transition-colors",
                    !isRecurring
                      ? "bg-white text-primary shadow-sm"
                      : "text-slate-medium hover:text-primary",
                  )}
                >
                  One-time
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={isRecurring}
                  onClick={() => setIsRecurring(true)}
                  className={cn(
                    "rounded-full py-2 text-btn font-bold transition-colors",
                    isRecurring
                      ? "bg-white text-primary shadow-sm"
                      : "text-slate-medium hover:text-primary",
                  )}
                >
                  Monthly
                </button>
              </div>

              {isRecurring ? (
                <fieldset className="mb-8">
                  <legend className="mb-2 text-label uppercase text-slate-light">
                    Monthly amount
                  </legend>
                  <p className="mb-4 text-body text-slate-medium">
                    Sign up once with UPI Autopay. Razorpay will debit you each
                    month and email a receipt. Cancel anytime from your
                    dashboard.
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {RECURRING_TIERS.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setRecurringTier(amt)}
                        className={cn(
                          "rounded-full border py-3 text-btn font-bold transition-colors",
                          recurringTier === amt
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-surface-border text-primary hover:border-accent",
                        )}
                      >
                        &#8377; {formatINR(amt)} / mo
                      </button>
                    ))}
                  </div>
                  {!user && (
                    <p className="mt-4 text-label text-slate-medium">
                      You&rsquo;ll need to sign in to set up a monthly donation
                      (UPI Autopay needs an account so you can cancel later).
                    </p>
                  )}
                </fieldset>
              ) : (
                <fieldset className="mb-8">
                  <legend className="mb-4 text-label uppercase text-slate-light">
                    {t("selectAmount")}
                  </legend>
                  <div className="mb-4 grid grid-cols-3 gap-3">
                    {AMOUNTS.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(amt);
                          setCustomAmount("");
                        }}
                        className={cn(
                          "rounded-full border py-3 text-btn font-bold transition-colors",
                          selectedAmount === amt && !customAmount
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-surface-border text-primary hover:border-accent",
                        )}
                      >
                        &#8377; {formatINR(amt)}
                      </button>
                    ))}
                  </div>
                  <Input
                    placeholder={t("otherAmount")}
                    value={customAmount}
                    onChange={(event) => setCustomAmount(event.target.value)}
                  />
                </fieldset>
              )}

              {!isRecurring && (
                <>
                  <Heading level="h4" as="h2" className="mb-4">
                    {t("personalDetails")}
                  </Heading>
                  <div className="mb-6 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        placeholder={t("firstName")}
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                      />
                      <Input
                        placeholder={t("lastName")}
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                      />
                    </div>
                    <Input
                      type="email"
                      placeholder={t("email")}
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(event) => setIsAnonymous(event.target.checked)}
                        className="size-4 rounded border-surface-border accent-accent"
                      />
                      <Text variant="secondary" as="span">
                        {t("anonymous")}
                      </Text>
                    </label>
                  </div>
                </>
              )}

              <div className="mb-6 rounded-xl bg-surface-page px-6 py-4">
                <Text variant="secondary" className="text-center">
                  {isRecurring
                    ? "You'll authorize a UPI Autopay mandate on Razorpay's secure page."
                    : t("razorpayNotice")}
                </Text>
              </div>

              {!isRecurring && !user && (
                <div className="mb-6">
                  <TurnstileWidget action="guest-donation" onToken={setCaptchaToken} />
                </div>
              )}

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleSubmit}
                disabled={
                  isSubmitting ||
                  (!isRecurring && captchaRequired && !captchaToken)
                }
              >
                {isSubmitting
                  ? t("openingPayment")
                  : isRecurring
                  ? user
                    ? `Set up ₹${formatINR(donationAmount)} monthly`
                    : "Sign in to continue"
                  : t("completeDonation", { amount: formatINR(donationAmount) })}
              </Button>

              <div className="mt-4 flex items-center justify-center gap-2 text-slate-light">
                <LockIcon className="size-4" />
                <Text as="span" variant="muted" size="label" className="normal-case tracking-normal">
                  {t("secure")}
                </Text>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-2">
            <div className="sticky top-32 rounded-2xl border border-surface-border bg-white p-6 shadow-card">
              <Heading level="h4" as="h2" className="mb-4">
                {t("summary")}
              </Heading>

              <div className="mb-6 flex items-center gap-3 border-b border-surface-border pb-6">
                {campaignLoading ? (
                  <div className="flex-1 animate-pulse space-y-2">
                    <div className="h-3 w-16 rounded bg-surface-border" />
                    <div className="h-4 w-32 rounded bg-surface-border" />
                    <div className="h-3 w-20 rounded bg-surface-border" />
                  </div>
                ) : campaign ? (
                  <>
                    {campaign.coverImageUrl ? (
                      <div className="relative size-20 shrink-0 overflow-hidden rounded-xl">
                        <Image
                          src={campaign.coverImageUrl}
                          alt={campaign.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                    ) : (
                      <div className="flex size-20 shrink-0 items-center justify-center rounded-xl bg-surface-page">
                        <Text variant="muted" className="text-h4 font-black">
                          {campaign.title.charAt(0)}
                        </Text>
                      </div>
                    )}
                    <div>
                      <Text variant="muted" size="label" className="normal-case tracking-normal">
                        {t("supporting")}
                      </Text>
                      <p className="text-btn font-black text-primary">{campaign.title}</p>
                      <Text variant="muted" size="label" className="normal-case tracking-normal">
                        {campaign.category}
                      </Text>
                    </div>
                  </>
                ) : (
                  <Text variant="secondary">{t("campaignNotFound")}</Text>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Text variant="secondary">
                    {isRecurring ? "Monthly amount" : t("donationAmount")}
                  </Text>
                  <Text className="font-bold">&#8377; {formatINR(donationAmount)}</Text>
                </div>
                <div className="flex justify-between">
                  <Text variant="secondary">{t("platformFee")}</Text>
                  <Text className="font-bold">&#8377; 0</Text>
                </div>
                <div className="flex justify-between border-t border-surface-border pt-3">
                  <p className="text-btn-lg font-black text-primary">
                    {isRecurring ? "Charged monthly" : t("total")}
                  </p>
                  <p className="text-btn-lg font-black text-accent">
                    &#8377; {formatINR(donationAmount)}
                    {isRecurring && <span className="text-btn">/mo</span>}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
