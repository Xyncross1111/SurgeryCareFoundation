"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MailIcon, ArrowRightIcon } from "@/components/ui/icons";
import { authService } from "@/services/auth.service";
import { ApiError } from "@/lib/api-error";

export default function ForgotPasswordPage() {
  const t = useTranslations("auth.forgot");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await authService.forgotPassword({ email });
      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t("errorFallback"));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid min-h-[calc(100vh-112px)] lg:grid-cols-2">
      {/* Left — Hero Image */}
      <div className="relative hidden lg:block">
        <Image
          src="/images/mission.jpg"
          alt="Child patient receiving care at Surgery Care Foundation"
          fill
          className="object-cover"
          sizes="50vw"
          priority
        />
        <div className="absolute inset-0 bg-primary/20" />
      </div>

      {/* Right — Form */}
      <div className="flex items-center justify-center bg-surface-page px-4 py-16">
        <div className="w-full max-w-md">
          <Heading level="h2" as="h1" className="mb-3">
            {t("heading")}
          </Heading>
          <Text variant="secondary" size="body-lg" className="mb-10">
            {t("subtitle")}
          </Text>

          {isSuccess ? (
            <div className="rounded-xl border border-accent/20 bg-accent/5 px-6 py-8 text-center">
              <div className="mb-4 inline-flex size-14 items-center justify-center rounded-full bg-accent/10">
                <MailIcon className="size-7 text-accent" />
              </div>
              <Heading level="h4" as="h2" className="mb-2">
                {t("successHeading")}
              </Heading>
              <Text variant="secondary">
                {t("successBody")}
              </Text>
              <Link
                href="/login"
                className="mt-6 inline-block font-bold text-accent transition-colors hover:text-accent-green"
              >
                {t("backToLogin")}
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-body text-red-600">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label={t("emailLabel")}
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  icon={<MailIcon className="size-5" />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <Button
                  variant="secondary"
                  size="lg"
                  type="submit"
                  className="w-full gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("submitting") : t("submit")}
                  {!isSubmitting && <ArrowRightIcon className="size-5" />}
                </Button>
              </form>

              <p className="mt-6 text-center text-body text-slate-medium">
                <Link
                  href="/login"
                  className="font-bold text-accent transition-colors hover:text-accent-green"
                >
                  {t("backToLogin")}
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
