"use client";

import { useEffect, useId, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: TurnstileRenderOptions,
      ) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId?: string) => void;
      getResponse: (widgetId?: string) => string | undefined;
    };
    __turnstileScriptLoading?: Promise<void>;
  }
}

interface TurnstileRenderOptions {
  sitekey: string;
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact" | "flexible";
  action?: string;
  appearance?: "always" | "execute" | "interaction-only";
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

function loadTurnstileScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("server"));
  if (window.turnstile) return Promise.resolve();
  if (window.__turnstileScriptLoading) return window.__turnstileScriptLoading;

  window.__turnstileScriptLoading = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src^="${SCRIPT_SRC.split("?")[0]}"]`,
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("turnstile script failed")), {
        once: true,
      });
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", () => reject(new Error("turnstile script failed")), {
      once: true,
    });
    document.head.appendChild(script);
  });

  return window.__turnstileScriptLoading;
}

interface TurnstileWidgetProps {
  /** Called whenever the widget produces (or invalidates) a token. */
  onToken: (token: string | null) => void;
  /** Optional action name reported to Cloudflare analytics. */
  action?: string;
  theme?: "light" | "dark" | "auto";
  className?: string;
}

/**
 * Renders the Cloudflare Turnstile challenge. Calls onToken when a token is
 * available (or null when it expires / errors). Renders nothing if no site key
 * is configured — the backend skips verification in that case too.
 */
export function TurnstileWidget({
  onToken,
  action,
  theme = "auto",
  className,
}: TurnstileWidgetProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  const reactId = useId();
  onTokenRef.current = onToken;

  useEffect(() => {
    if (!siteKey) return;
    let cancelled = false;

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme,
          action,
          callback: (token) => onTokenRef.current(token),
          "expired-callback": () => onTokenRef.current(null),
          "error-callback": () => onTokenRef.current(null),
        });
      })
      .catch(() => {
        // Fail open in the UI; the backend will reject if real verification is required.
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // ignore
        }
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, theme, action]);

  if (!siteKey) return null;

  return <div ref={containerRef} id={`turnstile-${reactId}`} className={className} />;
}

/**
 * Convenience: indicates whether the Turnstile site key is configured. Forms
 * can use this to require a token before submitting in production. In dev (no
 * key set) the backend bypass keeps things working.
 */
export function isTurnstileConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
}
