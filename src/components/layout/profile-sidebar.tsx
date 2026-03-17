"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import {
  GridIcon,
  ClockIcon,
  PlusIcon,
  BookmarkIcon,
  SettingsIcon,
  LogOutIcon,
  ChevronRightIcon,
} from "@/components/ui/icons";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: GridIcon },
  { href: "/dashboard/donations", label: "Donation History", icon: ClockIcon },
  { href: "/dashboard/fundraisers", label: "My Fundraisers", icon: PlusIcon },
  { href: "/dashboard/saved", label: "Saved Causes", icon: BookmarkIcon },
  { href: "/dashboard/account", label: "Account & Profile", icon: SettingsIcon },
] as const;

export function ProfileSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full rounded-2xl border border-surface-border bg-white p-6 shadow-card lg:w-[310px]">
      {/* User info */}
      <div className="mb-6 flex flex-col items-center text-center">
        <Avatar initials="JD" size="lg" className="mb-3" />
        <p className="text-btn-lg font-black text-primary">John Doe</p>
        <div className="mb-1 flex items-center gap-1">
          <span className="size-2 rounded-full bg-accent" />
          <Text as="span" variant="muted" size="label" className="normal-case tracking-normal text-accent">
            Verified Donor
          </Text>
        </div>
        <Text variant="muted" size="label" className="normal-case tracking-normal">
          Joined Mar 2026
        </Text>
      </div>

      {/* Nav */}
      <nav aria-label="Dashboard navigation" className="space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-btn font-bold transition-colors",
                isActive
                  ? "bg-primary text-white"
                  : "text-slate-medium hover:bg-surface-page"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="size-5" />
              {label}
              {isActive && <ChevronRightIcon className="ml-auto size-4" />}
            </Link>
          );
        })}
      </nav>

      {/* Divider + Sign out */}
      <div className="mt-4 border-t border-surface-border pt-4">
        <button
          type="button"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-btn font-bold text-red-500 transition-colors hover:bg-red-50"
        >
          <LogOutIcon className="size-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
