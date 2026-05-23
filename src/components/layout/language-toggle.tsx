"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LOCALES,
  LOCALE_COOKIE,
  LOCALE_SHORT_LABELS,
  type Locale,
} from "@/i18n/config";
import { userService } from "@/services/user.service";
import { useAuth } from "@/context/auth-context";

interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { user } = useAuth();

  function setLocale(next: Locale) {
    if (next === locale || isPending) return;

    // Set cookie for one year so it persists across visits. Path=/ so it applies
    // everywhere on the site.
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;

    // Best-effort: also persist on the authenticated user's profile so their
    // language follows them across devices. Failure is non-fatal — the cookie
    // still controls the UI for this device.
    if (user) {
      userService.updateLanguagePreference?.(next).catch(() => {
        // Silently ignore — cookie is already set.
      });
    }

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        "inline-flex items-center rounded-full border border-surface-border bg-white p-0.5 text-caption font-bold",
        className,
      )}
    >
      {LOCALES.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => setLocale(loc)}
            aria-pressed={active}
            disabled={isPending && !active}
            className={cn(
              "rounded-full px-2.5 py-1 transition-colors",
              active
                ? "bg-accent text-white"
                : "text-slate-medium hover:text-primary",
            )}
          >
            {LOCALE_SHORT_LABELS[loc]}
          </button>
        );
      })}
    </div>
  );
}
