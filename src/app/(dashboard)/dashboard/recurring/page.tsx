"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { formatINR } from "@/lib/format";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import { useApi } from "@/hooks/use-api";
import { paymentService } from "@/services/payment.service";
import type { RecurringDonation, RecurringStatus } from "@/types/payment";

const STATUS_CONFIG: Record<
  RecurringStatus,
  { label: string; variant: "success" | "outline" | "default" }
> = {
  pending: { label: "Authenticating mandate", variant: "outline" },
  active: { label: "Active", variant: "success" },
  halted: { label: "Action needed", variant: "default" },
  paused: { label: "Paused", variant: "outline" },
  cancelled: { label: "Cancelled", variant: "default" },
  completed: { label: "Completed", variant: "default" },
};

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function RecurringDonationsPage() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [refreshTick, setRefreshTick] = useState(0);

  const { data, isLoading } = useApi<{ items: RecurringDonation[] }>(
    () => paymentService.listMyRecurringDonations(),
    [refreshTick],
  );

  const items = data?.items ?? [];
  const justReturned = searchParams.get("status") === "pending";

  async function handleCancel(id: string) {
    if (cancellingId) return;
    if (!confirm("Cancel this monthly donation? Razorpay will stop debiting your account.")) {
      return;
    }
    setCancellingId(id);
    try {
      await paymentService.cancelRecurringDonation(id);
      toast("Monthly donation cancelled.", "success");
      setRefreshTick((t) => t + 1);
    } catch (err) {
      toast(
        err instanceof Error ? err.message : "Couldn't cancel. Please try again.",
        "error",
      );
    } finally {
      setCancellingId(null);
    }
  }

  return (
    <div>
      <Heading level="h2" as="h1" className="mb-2">
        Monthly Donations
      </Heading>
      <Text variant="secondary" className="mb-8">
        Recurring contributions you&rsquo;ve set up. Cancel anytime &mdash; Razorpay
        stops debiting immediately.
      </Text>

      {justReturned && (
        <div className="mb-6 rounded-2xl border border-accent/40 bg-accent/5 p-5">
          <Text>
            We&rsquo;re waiting for Razorpay to confirm your mandate. It usually
            takes a minute or two &mdash; this page will reflect the updated
            status once we hear back.
          </Text>
        </div>
      )}

      <div className="rounded-2xl border border-surface-border bg-white shadow-card">
        <div className="border-b border-surface-border px-6 py-4">
          <Heading level="h4" as="h2">
            All Subscriptions
            <span className="ml-2 text-body text-slate-light font-normal">
              ({items.length})
            </span>
          </Heading>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Text variant="secondary">Loading&hellip;</Text>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <Text variant="secondary" className="mb-4">
              You don&rsquo;t have any monthly donations yet.
            </Text>
            <Link href="/causes" className="text-btn font-bold text-accent hover:underline">
              Browse causes &rarr;
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-surface-border">
            {items.map((r) => {
              const status = r.status as RecurringStatus;
              const cfg = STATUS_CONFIG[status] ?? {
                label: status,
                variant: "outline" as const,
              };
              const isTerminal = status === "cancelled" || status === "completed";
              return (
                <div
                  key={r.id}
                  className="flex flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/causes/${r.campaign.slug}`}
                      className="text-btn font-black text-primary transition-colors hover:text-accent"
                    >
                      {r.campaign.title}
                    </Link>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <Text variant="muted" size="label" className="normal-case tracking-normal">
                        Started {formatDate(r.createdAt)}
                      </Text>
                      {!isTerminal && (
                        <Text variant="muted" size="label" className="normal-case tracking-normal">
                          Next charge: {formatDate(r.nextRunDate)}
                        </Text>
                      )}
                      {r.lastRunDate && (
                        <Text variant="muted" size="label" className="normal-case tracking-normal">
                          Last charged: {formatDate(r.lastRunDate)}
                        </Text>
                      )}
                    </div>
                    {status === "halted" && r.shortUrl && (
                      <a
                        href={r.shortUrl}
                        className="mt-2 inline-flex text-label text-red-500 hover:underline"
                      >
                        Re-authorize mandate &rarr;
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-4 sm:gap-6">
                    <Badge variant={cfg.variant} className="text-[10px]">
                      {cfg.label}
                    </Badge>
                    <div className="text-right">
                      <p className="text-btn font-black text-accent">
                        &#8377; {formatINR(r.amount)}
                        <span className="text-label font-normal text-slate-medium"> / mo</span>
                      </p>
                      {!isTerminal && (
                        <button
                          type="button"
                          onClick={() => handleCancel(r.id)}
                          disabled={cancellingId === r.id}
                          className={cn(
                            "mt-1 text-label font-bold text-red-500 transition-colors hover:underline disabled:opacity-50",
                          )}
                        >
                          {cancellingId === r.id ? "Cancelling…" : "Cancel"}
                        </button>
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
