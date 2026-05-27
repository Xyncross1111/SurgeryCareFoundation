"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { NavLink } from "@/components/ui/nav-link";
import { Avatar } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { PhoneIcon, HeartFilledIcon, MenuIcon, CloseIcon } from "@/components/ui/icons";
import { NotificationBell } from "@/components/layout/notification-bell";
import { LanguageToggle } from "@/components/layout/language-toggle";

const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/causes", key: "causes" },
  { href: "/our-work", key: "ourWork" },
  { href: "/blog", key: "blog" },
  { href: "/contact", key: "contact" },
] as const;

function getUserInitials(firstName?: string, lastName?: string): string {
  const first = firstName?.charAt(0)?.toUpperCase() ?? "";
  const last = lastName?.charAt(0)?.toUpperCase() ?? "";
  return first + last || "?";
}

function getUserDisplayName(firstName?: string, lastName?: string): string {
  const name = [firstName, lastName].filter(Boolean).join(" ");
  return name || "Account";
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isLoading } = useAuth();
  const t = useTranslations("header");
  const isAuthenticated = Boolean(user);
  const initials = getUserInitials(user?.firstName, user?.lastName);
  const displayName = getUserDisplayName(user?.firstName, user?.lastName);

  return (
    <header className="sticky top-0 z-50">
      {/* ── Utility Strip (desktop only) ─────────────────── */}
      <div
        className="hidden border-b border-surface-border/50 bg-surface-page/80 backdrop-blur-md lg:block"
        aria-label="Utility navigation"
      >
        <Container className="flex h-9 items-center justify-end gap-5 text-caption">
          <a
            href="tel:+918815935091"
            className="inline-flex items-center gap-1.5 font-bold text-primary hover:text-accent"
          >
            <PhoneIcon className="size-3 text-accent" />
            <span className="uppercase tracking-wide text-slate-light">{t("needHelp")}</span>
            +91 8815935091
          </a>

          <span className="h-3.5 w-px bg-surface-border" aria-hidden="true" />

          <LanguageToggle />

          {isAuthenticated && (
            <>
              <span className="h-3.5 w-px bg-surface-border" aria-hidden="true" />
              <NotificationBell />
            </>
          )}

          <span className="h-3.5 w-px bg-surface-border" aria-hidden="true" />

          {isLoading ? (
            <div className="h-6 w-20 animate-pulse rounded-full bg-surface-green" />
          ) : isAuthenticated ? (
            <Link
              href="/dashboard/account"
              className="inline-flex items-center gap-2 font-bold text-primary hover:text-accent"
            >
              <Avatar
                src={user?.avatarUrl ?? undefined}
                alt={displayName}
                initials={initials}
                size="sm"
              />
              {displayName}
            </Link>
          ) : (
            <Link
              href="/login"
              className="font-bold text-slate-medium transition-colors hover:text-primary"
            >
              {t("login")}
            </Link>
          )}
        </Container>
      </div>

      {/* ── Main Nav Bar ─────────────────────────────────── */}
      <nav
        className="border-b border-surface-border/50 bg-white/70 shadow-subtle backdrop-blur-md"
        aria-label="Main navigation"
      >
        <Container className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Logo />

          {/* Desktop Nav Links */}
          <ul className="hidden items-center gap-8 xl:gap-10 lg:flex" role="list">
            {NAV_ITEMS.map(({ href, key }) => (
              <li key={href}>
                <NavLink href={href} active={pathname === href}>
                  {t(`nav.${key}`)}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop Donate */}
          <div className="hidden lg:block">
            <Link
              href="/causes"
              className={buttonVariants({
                variant: "secondary",
                size: "default",
                className: "!text-white hover:!text-white",
              })}
            >
              <HeartFilledIcon className="mr-2 size-3.5 text-white" />
              {t("donate")}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate transition-colors hover:bg-surface-green lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
          >
            {mobileOpen ? (
              <CloseIcon className="size-6" />
            ) : (
              <MenuIcon className="size-6" />
            )}
          </button>
        </Container>

        {/* ── Mobile Menu ────────────────────────────────── */}
        <div
          className={cn(
            "overflow-hidden border-t border-surface-border bg-white transition-all duration-300 lg:hidden",
            mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <Container className="py-4">
            <ul className="flex flex-col gap-1" role="list">
              {NAV_ITEMS.map(({ href, key }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "block rounded-lg px-4 py-2.5 text-nav transition-colors",
                      pathname === href
                        ? "bg-surface-green text-accent"
                        : "text-slate hover:bg-surface-page"
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Language toggle (mobile) */}
            <div className="mt-4 flex justify-center">
              <LanguageToggle />
            </div>

            <div className="mt-4 flex flex-col gap-3 border-t border-surface-border pt-4">
              <a
                href="tel:+918815935091"
                className="inline-flex items-center gap-2 px-4 text-btn font-black text-primary"
              >
                <PhoneIcon className="size-4 text-accent" />
                +91 8815935091
              </a>
              <div className="flex gap-3 px-4">
                <Link
                  href="/causes"
                  className={buttonVariants({
                    variant: "secondary",
                    size: "default",
                    className: "flex-1 !text-white hover:!text-white",
                  })}
                  onClick={() => setMobileOpen(false)}
                >
                  <HeartFilledIcon className="mr-2 size-3.5 text-white" />
                  {t("donate")}
                </Link>
                <Link
                  href={isAuthenticated ? "/dashboard/account" : "/login"}
                  className={buttonVariants({ variant: "outline", size: "default", className: "flex-1" })}
                  onClick={() => setMobileOpen(false)}
                >
                  {isAuthenticated ? t("myAccount") : t("login")}
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </nav>
    </header>
  );
}
