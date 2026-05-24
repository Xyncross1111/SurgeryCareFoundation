"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MailIcon, LockIcon, ArrowRightIcon } from "@/components/ui/icons";
import { useAuth } from "@/context/auth-context";
import { ApiError } from "@/lib/api-error";
import { useToast } from "@/components/ui/toast";
import { getDefaultAppRoute } from "@/lib/get-default-app-route";
import {
  TurnstileWidget,
  isTurnstileConfigured,
} from "@/components/shared/turnstile-widget";

export default function RegisterPage() {
  const t = useTranslations("auth.register");
  const { register } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRequired = isTurnstileConfigured();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError(t("passwordsMismatch"));
      return;
    }

    if (captchaRequired && !captchaToken) {
      setError(t("captchaRequiredError"));
      return;
    }

    setIsSubmitting(true);
    try {
      const session = await register({
        firstName,
        lastName,
        email,
        phone: phone || undefined,
        password,
        ...(captchaToken ? { captchaToken } : {}),
      });
      const greetName = session.firstName?.trim() || session.email;
      toast(t("welcomeToast", { name: greetName }), "success");
      router.push(getDefaultAppRoute(session.roles));
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

      {/* Right — Register Form */}
      <div className="flex items-center justify-center bg-surface-page px-4 py-16">
        <div className="w-full max-w-md">
          <Heading level="h2" as="h1" className="mb-3">
            {t("createAccount")}
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
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label={t("firstNameLabel")}
                type="text"
                placeholder={t("firstNamePlaceholder")}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <Input
                label={t("lastNameLabel")}
                type="text"
                placeholder={t("lastNamePlaceholder")}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <Input
              label={t("emailLabel")}
              type="email"
              placeholder={t("emailPlaceholder")}
              icon={<MailIcon className="size-5" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label={t("phoneLabel")}
              type="tel"
              placeholder={t("phonePlaceholder")}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <Input
              label={t("passwordLabel")}
              type="password"
              placeholder={t("passwordPlaceholder")}
              icon={<LockIcon className="size-5" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />

            <Input
              label={t("confirmPasswordLabel")}
              type="password"
              placeholder={t("passwordPlaceholder")}
              icon={<LockIcon className="size-5" />}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
            />

            <TurnstileWidget action="register" onToken={setCaptchaToken} />

            <Button
              variant="secondary"
              size="lg"
              type="submit"
              className="w-full gap-2"
              disabled={isSubmitting || (captchaRequired && !captchaToken)}
            >
              {isSubmitting ? t("creatingAccount") : t("createAccountButton")}
              {!isSubmitting && <ArrowRightIcon className="size-5" />}
            </Button>
          </form>

          <p className="mt-6 text-center text-body text-slate-medium">
            {t("haveAccount")}{" "}
            <Link
              href="/login"
              className="font-bold text-accent transition-colors hover:text-accent-green"
            >
              {t("logIn")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
