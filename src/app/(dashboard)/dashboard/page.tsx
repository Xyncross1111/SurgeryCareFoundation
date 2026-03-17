import Link from "next/link";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Avatar } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { HeartIcon, GridIcon, BookmarkIcon } from "@/components/ui/icons";

const STATS = [
  { label: "Total Donated", value: "₹ 45,000", icon: HeartIcon, color: "bg-red-50 text-red-500" },
  { label: "Causes Supported", value: "4", icon: GridIcon, color: "bg-accent/10 text-accent" },
  { label: "Saved Causes", value: "2", icon: BookmarkIcon, color: "bg-primary/10 text-primary" },
] as const;

const DONATIONS = [
  { name: "Pallavi Mane", date: "Mar 12, 2026", condition: "Cancer", amount: "₹ 15,000", image: "/images/hero-1.jpg" },
  { name: "Ryan D'costa", date: "Mar 12, 2026", condition: "Brain Tumor", amount: "₹ 15,000", image: "/images/hero-2.jpg" },
  { name: "Aloke Dubey", date: "Mar 12, 2026", condition: "Chronic Kidney", amount: "₹ 15,000", image: "/images/hero-3.jpg" },
] as const;

export default function DashboardPage() {
  return (
    <div>
      {/* Header row */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <Heading level="h2" as="h1">Dashboard Overview</Heading>
        <Link href="/fundraiser/new" className={buttonVariants({ variant: "secondary", className: "gap-2" })}>
          + Start a Fundraiser
        </Link>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {STATS.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-2xl border border-surface-border bg-white p-6 shadow-card">
            <div className={`mb-3 inline-flex size-10 items-center justify-center rounded-xl ${color}`}>
              <Icon className="size-5" />
            </div>
            <Text variant="muted" size="label" className="mb-1">{label}</Text>
            <p className="text-h4 text-primary">{value}</p>
          </div>
        ))}
      </div>

      {/* Recent Donations */}
      <div className="rounded-2xl border border-surface-border bg-white shadow-card">
        <div className="flex items-center justify-between border-b border-surface-border px-6 py-4">
          <Heading level="h4" as="h2">Recent Donations</Heading>
          <Link href="/dashboard/donations" className="text-btn font-bold text-accent transition-colors hover:text-accent-green">
            View All
          </Link>
        </div>

        <div className="divide-y divide-surface-border">
          {DONATIONS.map((d) => (
            <div key={d.name} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <Avatar src={d.image} alt={d.name} size="md" />
                <div>
                  <p className="text-btn font-black text-primary">{d.name}</p>
                  <Text variant="muted" size="label" className="normal-case tracking-normal">
                    Donated on {d.date} &bull; {d.condition}
                  </Text>
                </div>
              </div>
              <div className="text-right">
                <p className="text-btn font-black text-accent">{d.amount}</p>
                <Text variant="muted" size="label" className="normal-case tracking-normal">
                  Download Receipt
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
