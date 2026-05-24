"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MailIcon, LockIcon, ArrowRightIcon } from "@/components/ui/icons";
import { useAuth } from "@/context/auth-context";
import { ApiError } from "@/lib/api-error";
import { getDefaultAppRoute } from "@/lib/get-default-app-route";
import { useToast } from "@/components/ui/toast";
import {
  TurnstileWidget,
  isTurnstileConfigured,
} from "@/components/shared/turnstile-widget";

function LoginForm() {
  const t = useTranslations("auth.login");
  const { login, user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRequired = isTurnstileConfigured();

  const resetSuccess = searchParams.get("reset") === "success";

  // Auto-redirect already-authenticated users away from /login, but only ONCE
  // per mount. Otherwise, if middleware bounces a navigation back to /login
  // (e.g. cookie not seen server-side), this useEffect re-fires on every
  // searchParams change and creates an infinite redirect loop.
  const didAutoRedirect = useRef(false);
  useEffect(() => {
    if (isLoading || !isAuthenticated || didAutoRedirect.current) {
      return;
    }
    didAutoRedirect.current = true;
    const redirect = searchParams.get("redirect");
    router.replace(redirect || getDefaultAppRoute(user?.roles));
  }, [isAuthenticated, isLoading, router, searchParams, user?.roles]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (captchaRequired && !captchaToken) {
      setError(t("captchaRequiredError"));
      return;
    }

    setIsSubmitting(true);

    try {
      const session = await login({
        email,
        password,
        ...(captchaToken ? { captchaToken } : {}),
      });
      const redirect = searchParams.get("redirect") || getDefaultAppRoute(session.roles);
      const greetName = session.firstName?.trim() || session.email;
      toast(t("welcomeToast", { name: greetName }), "success");
      router.push(redirect);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t("errorFallback"));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <Heading level="h2" as="h1" className="mb-3">
        {t("welcomeBack")}
      </Heading>
      <Text variant="secondary" size="body-lg" className="mb-10">
        {t("subtitle")}
      </Text>

      {resetSuccess && (
        <div className="mb-6 rounded-xl border border-accent/20 bg-accent/5 px-4 py-3 text-body text-accent">
          {t("resetSuccess")}
        </div>
      )}

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

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-label uppercase text-slate-medium">
              {t("passwordLabel")}
            </label>
            <Link
              href="/forgot-password"
              className="text-label font-bold text-accent transition-colors hover:text-accent-green"
            >
              {t("forgotPassword")}
            </Link>
          </div>
          <Input
            type="password"
            placeholder={t("passwordPlaceholder")}
            icon={<LockIcon className="size-5" />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <TurnstileWidget action="login" onToken={setCaptchaToken} />

        <Button
          variant="secondary"
          size="lg"
          type="submit"
          className="w-full gap-2"
          disabled={isSubmitting || (captchaRequired && !captchaToken)}
        >
          {isSubmitting ? t("signingIn") : t("signIn")}
          {!isSubmitting && <ArrowRightIcon className="size-5" />}
        </Button>
      </form>

      <p className="mt-6 text-center text-body text-slate-medium">
        {t("noAccount")}{" "}
        <Link
          href="/register"
          className="font-bold text-accent transition-colors hover:text-accent-green"
        >
          {t("signUpHere")}
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
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

      {/* Right — Login Form */}
      <div className="flex items-center justify-center bg-surface-page px-4 py-16">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
