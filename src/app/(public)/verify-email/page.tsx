"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { authService } from "@/services/auth.service";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { buttonVariants } from "@/components/ui/button";
import { CheckCircleIcon, CloseIcon } from "@/components/ui/icons";

type Status = "verifying" | "success" | "error";

function VerifyEmailContent() {
  const t = useTranslations("auth.verifyEmail");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<Status>(token ? "verifying" : "error");
  const [errorMessage, setErrorMessage] = useState(
    token ? "" : t("missingToken")
  );

  useEffect(() => {
    if (!token) return;

    authService
      .verifyEmail(token)
      .then(() => setStatus("success"))
      .catch((err: unknown) => {
        const message =
          err instanceof Error ? err.message : t("errorBody");
        setErrorMessage(message);
        setStatus("error");
      });
  }, [token, t]);

  return (
    <section className="bg-surface-page py-20 md:py-32">
      <Container className="flex justify-center">
        <div className="relative w-full max-w-lg text-center">
          {/* Status icon */}
          {status === "verifying" && (
            <div className="mx-auto -mb-7 flex size-14 items-center justify-center rounded-full bg-accent shadow-lg">
              <svg
                className="size-7 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            </div>
          )}

          {status === "success" && (
            <div className="mx-auto -mb-7 flex size-14 items-center justify-center rounded-full bg-green-500 shadow-lg">
              <CheckCircleIcon className="size-7 text-white" />
            </div>
          )}

          {status === "error" && (
            <div className="mx-auto -mb-7 flex size-14 items-center justify-center rounded-full bg-red-500 shadow-lg">
              <CloseIcon className="size-7 text-white" />
            </div>
          )}

          <div className="rounded-2xl border border-surface-border bg-white px-8 pb-8 pt-14 shadow-card">
            {status === "verifying" && (
              <>
                <Heading level="h2" as="h1" className="mb-4">
                  {t("verifying")}
                </Heading>
              </>
            )}

            {status === "success" && (
              <>
                <Heading level="h2" as="h1" className="mb-4">
                  {t("successHeading")}
                </Heading>
                <Text variant="secondary" className="mb-6">
                  {t("successBody")}
                </Text>
                <Link
                  href="/login"
                  className={buttonVariants({ variant: "secondary" })}
                >
                  {t("goToLogin")}
                </Link>
              </>
            )}

            {status === "error" && (
              <>
                <Heading level="h2" as="h1" className="mb-4">
                  {t("errorHeading")}
                </Heading>
                <Text variant="secondary" className="mb-6">
                  {errorMessage}
                </Text>
                <Link
                  href="/login"
                  className={buttonVariants({ variant: "secondary" })}
                >
                  {t("goToLogin")}
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

function VerifyingFallback() {
  const t = useTranslations("auth.verifyEmail");
  return (
    <section className="bg-surface-page py-20 md:py-32">
      <Container className="flex justify-center">
        <div className="relative w-full max-w-lg text-center">
          <div className="mx-auto -mb-7 flex size-14 items-center justify-center rounded-full bg-accent shadow-lg">
            <svg
              className="size-7 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          </div>
          <div className="rounded-2xl border border-surface-border bg-white px-8 pb-8 pt-14 shadow-card">
            <Heading level="h2" as="h1" className="mb-4">
              {t("verifying")}
            </Heading>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<VerifyingFallback />}>
      <VerifyEmailContent />
    </Suspense>
  );
}
