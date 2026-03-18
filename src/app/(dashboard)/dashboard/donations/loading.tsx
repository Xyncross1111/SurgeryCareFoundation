import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

function SkeletonRow() {
  return (
    <div className="flex animate-pulse flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="size-10 rounded-full bg-surface-page" />
        <div>
          <div className="mb-1 h-4 w-32 rounded bg-surface-page" />
          <div className="h-3 w-40 rounded bg-surface-page" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-5 w-16 rounded-full bg-surface-page" />
        <div className="h-4 w-20 rounded bg-surface-page" />
      </div>
    </div>
  );
}

export default function DonationsLoading() {
  return (
    <div>
      <Heading level="h2" as="h1" className="mb-2">Donation History</Heading>
      <Text variant="secondary" className="mb-8">View all your past donations and download receipts.</Text>

      {/* Summary skeleton */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl border border-surface-border bg-white p-5 shadow-card">
            <div className="mb-2 size-10 rounded-xl bg-surface-page" />
            <div className="mb-1 h-3 w-24 rounded bg-surface-page" />
            <div className="h-6 w-20 rounded bg-surface-page" />
          </div>
        ))}
      </div>

      {/* List skeleton */}
      <div className="rounded-2xl border border-surface-border bg-white shadow-card">
        <div className="border-b border-surface-border px-6 py-4">
          <div className="h-5 w-36 animate-pulse rounded bg-surface-page" />
        </div>
        <div className="divide-y divide-surface-border">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
