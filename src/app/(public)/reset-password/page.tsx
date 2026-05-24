"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LockIcon, ArrowRightIcon } from "@/components/ui/icons";
import { authService } from "@/services/auth.service";
import { ApiError } from "@/lib/api-error";

function ResetPasswordForm() {
  const t = useTranslations("auth.reset");
  const tLogin = useTranslations("auth.login");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError(t("passwordsMismatch"));
      return;
    }

    if (!token) {
      setError(t("missingToken"));
      return;
    }

    setIsSubmitting(true);
    try {
      await authService.resetPassword({ token, password });
      router.push("/login?reset=success");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t("errorFallback"));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <Heading level="h2" as="h1" className="mb-3">
        {t("heading")}
      </Heading>
      <Text variant="secondary" size="body-lg" className="mb-10">
        {t("subtitle")}
      </Text>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-body text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label={t("newPasswordLabel")}
          type="password"
          placeholder="••••••••"
          icon={<LockIcon className="size-5" />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />

        <Input
          label={t("confirmPasswordLabel")}
          type="password"
          placeholder="••••••••"
          icon={<LockIcon className="size-5" />}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={8}
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
          {tLogin("signIn")}
        </Link>
      </p>
    </div>
  );
}

export default function ResetPasswordPage() {
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
        <Suspense>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
