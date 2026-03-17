"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { NavLink } from "@/components/ui/nav-link";
import { buttonVariants } from "@/components/ui/button";
import { PhoneIcon, HeartFilledIcon, MenuIcon, CloseIcon } from "@/components/ui/icons";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/causes", label: "Causes" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact us" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* ── Nav Bar ──────────────────────────────────────── */}
      <nav
        className="border-b border-surface-border/50 bg-white/70 shadow-subtle backdrop-blur-md"
        aria-label="Main navigation"
      >
        <Container className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Nav Links */}
          <ul className="hidden items-center gap-10 lg:flex" role="list">
            {NAV_ITEMS.map(({ href, label }) => (
              <li key={href}>
                <NavLink href={href} active={pathname === href}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop Right Section */}
          <div className="hidden items-center gap-6 lg:flex">
            {/* Phone */}
            <div className="flex flex-col items-end border-r border-surface-border pr-6">
              <span className="text-caption uppercase text-slate-light">
                Need Help
              </span>
              <a
                href="tel:+919960513453"
                className="inline-flex items-center gap-1.5 font-black text-btn text-primary"
              >
                <PhoneIcon className="size-3.5 text-accent" />
                +91 9960513453
              </a>
            </div>

            {/* Donate Button */}
            <Link
              href="/causes"
              className={buttonVariants({ variant: "secondary", size: "default" })}
            >
              <HeartFilledIcon className="mr-2 size-3.5" />
              Donate
            </Link>

            {/* Log in */}
            <Link
              href="/login"
              className="text-btn font-bold text-slate-medium transition-colors hover:text-primary"
            >
              Log in
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate transition-colors hover:bg-surface-green lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
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
              {NAV_ITEMS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "block rounded-lg px-4 py-3 text-nav transition-colors",
                      pathname === href
                        ? "bg-surface-green text-accent"
                        : "text-slate hover:bg-surface-page"
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-col gap-3 border-t border-surface-border pt-4">
              <a
                href="tel:+919960513453"
                className="inline-flex items-center gap-2 px-4 text-btn font-black text-primary"
              >
                <PhoneIcon className="size-4 text-accent" />
                +91 9960513453
              </a>
              <div className="flex gap-3 px-4">
                <Link
                  href="/causes"
                  className={buttonVariants({ variant: "secondary", size: "default", className: "flex-1" })}
                  onClick={() => setMobileOpen(false)}
                >
                  <HeartFilledIcon className="mr-2 size-3.5" />
                  Donate
                </Link>
                <Link
                  href="/login"
                  className={buttonVariants({ variant: "outline", size: "default", className: "flex-1" })}
                  onClick={() => setMobileOpen(false)}
                >
                  Log in
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </nav>
    </header>
  );
}
