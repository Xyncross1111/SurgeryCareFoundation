"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatINR } from "@/lib/format";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, CheckCircleIcon, ClockIcon, HeartIcon } from "@/components/ui/icons";

type DonationStatus = "succeeded" | "pending" | "failed";

interface Donation {
  id: string;
  campaignId: string;
  patientName: string;
  condition: string;
  amount: number;
  date: string;
  status: DonationStatus;
  receiptId: string | null;
  image: string;
}

const DONATIONS: Donation[] = [
  { id: "don-001", campaignId: "pallavi-mane", patientName: "Pallavi Mane", condition: "Cancer", amount: 15000, date: "Mar 12, 2026", status: "succeeded", receiptId: "REC-2026-001", image: "/images/hero-1.jpg" },
  { id: "don-002", campaignId: "samarth-verma", patientName: "Samarth Verma", condition: "Brain Tumor", amount: 10000, date: "Mar 10, 2026", status: "succeeded", receiptId: "REC-2026-002", image: "/images/hero-2.jpg" },
  { id: "don-003", campaignId: "aloke-dubey", patientName: "Aloke Dubey", condition: "Chronic Kidney", amount: 15000, date: "Mar 8, 2026", status: "succeeded", receiptId: "REC-2026-003", image: "/images/hero-3.jpg" },
  { id: "don-004", campaignId: "gagubai-kate", patientName: "Gagubai Kate", condition: "Heart Blockage", amount: 5000, date: "Mar 5, 2026", status: "pending", receiptId: null, image: "/images/hero-4.jpg" },
  { id: "don-005", campaignId: "dinesh-joshi", patientName: "Dinesh Joshi", condition: "Cancer", amount: 2000, date: "Feb 28, 2026", status: "failed", receiptId: null, image: "/images/hero-1.jpg" },
  { id: "don-006", campaignId: "asha-khandekar", patientName: "Asha Khandekar", condition: "Breast Cancer", amount: 8000, date: "Feb 20, 2026", status: "succeeded", receiptId: "REC-2026-004", image: "/images/hero-2.jpg" },
];

const FILTERS = ["All", "Succeeded", "Pending", "Failed"] as const;

const STATUS_CONFIG: Record<DonationStatus, { label: string; variant: "success" | "outline" | "default" }> = {
  succeeded: { label: "Succeeded", variant: "success" },
  pending: { label: "Pending", variant: "outline" },
  failed: { label: "Failed", variant: "default" },
};

export default function DonationHistoryPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filtered = activeFilter === "All"
    ? DONATIONS
    : DONATIONS.filter((d) => d.status === activeFilter.toLowerCase());

  const totalDonated = DONATIONS
    .filter((d) => d.status === "succeeded")
    .reduce((sum, d) => sum + d.amount, 0);

  const totalCount = DONATIONS.filter((d) => d.status === "succeeded").length;

  return (
    <div>
      <Heading level="h2" as="h1" className="mb-2">Donation History</Heading>
      <Text variant="secondary" className="mb-8">View all your past donations and download receipts.</Text>

      {/* Summary cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-surface-border bg-white p-5 shadow-card">
          <div className="mb-2 inline-flex size-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
            <HeartIcon className="size-5" />
          </div>
          <Text variant="muted" size="label" className="mb-1">Total Donated</Text>
          <p className="text-h4 text-primary">&#8377; {formatINR(totalDonated)}</p>
        </div>
        <div className="rounded-2xl border border-surface-border bg-white p-5 shadow-card">
          <div className="mb-2 inline-flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <CheckCircleIcon className="size-5" />
          </div>
          <Text variant="muted" size="label" className="mb-1">Successful Donations</Text>
          <p className="text-h4 text-primary">{totalCount}</p>
        </div>
        <div className="rounded-2xl border border-surface-border bg-white p-5 shadow-card">
          <div className="mb-2 inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <CalendarIcon className="size-5" />
          </div>
          <Text variant="muted" size="label" className="mb-1">Last Donation</Text>
          <p className="text-h4 text-primary">{DONATIONS[0].date}</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={cn(
              "rounded-full px-4 py-1.5 text-btn font-bold transition-colors",
              activeFilter === filter
                ? "bg-primary text-white"
                : "bg-white text-slate border border-surface-border hover:bg-surface-page"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Donations list */}
      <div className="rounded-2xl border border-surface-border bg-white shadow-card">
        <div className="border-b border-surface-border px-6 py-4">
          <Heading level="h4" as="h2">
            {activeFilter === "All" ? "All Donations" : `${activeFilter} Donations`}
            <span className="ml-2 text-body text-slate-light font-normal">({filtered.length})</span>
          </Heading>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <span className="mb-4 flex size-14 items-center justify-center rounded-full bg-surface-page">
              <ClockIcon className="size-7 text-slate-light" />
            </span>
            <Text variant="secondary" className="text-center">
              No {activeFilter.toLowerCase()} donations found.
            </Text>
          </div>
        ) : (
          <div className="divide-y divide-surface-border">
            {filtered.map((donation) => {
              const cfg = STATUS_CONFIG[donation.status];
              return (
                <div key={donation.id} className="flex flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                  {/* Left: patient info */}
                  <div className="flex items-center gap-4">
                    <Avatar src={donation.image} alt={donation.patientName} size="md" />
                    <div>
                      <Link
                        href={`/causes/${donation.campaignId}`}
                        className="text-btn font-black text-primary hover:text-accent transition-colors"
                      >
                        {donation.patientName}
                      </Link>
                      <Text variant="muted" size="label" className="normal-case tracking-normal">
                        {donation.date} &bull; {donation.condition}
                      </Text>
                    </div>
                  </div>

                  {/* Right: amount, status, receipt */}
                  <div className="flex items-center gap-4 sm:gap-6">
                    <Badge variant={cfg.variant} className="text-[10px]">
                      {cfg.label}
                    </Badge>
                    <div className="text-right">
                      <p className="text-btn font-black text-accent">&#8377; {formatINR(donation.amount)}</p>
                      {donation.receiptId ? (
                        <button
                          type="button"
                          className="text-label text-primary hover:text-accent transition-colors font-bold"
                        >
                          Download Receipt
                        </button>
                      ) : (
                        <Text variant="muted" size="label" className="normal-case tracking-normal">
                          No receipt
                        </Text>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
