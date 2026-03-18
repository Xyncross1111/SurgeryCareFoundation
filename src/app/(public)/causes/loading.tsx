import { Container } from "@/components/ui/container";

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-surface-border bg-white shadow-card">
      <div className="h-48 rounded-t-2xl bg-surface-page" />
      <div className="p-6">
        <div className="mb-3 flex gap-2">
          <div className="h-5 w-16 rounded-full bg-surface-page" />
          <div className="h-5 w-20 rounded-full bg-surface-page" />
        </div>
        <div className="mb-2 h-5 w-3/4 rounded bg-surface-page" />
        <div className="mb-4 h-4 w-full rounded bg-surface-page" />
        <div className="mb-4 h-2 w-full rounded-full bg-surface-page" />
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 rounded bg-surface-page" />
          <div className="h-10 w-24 rounded-full bg-surface-page" />
        </div>
      </div>
    </div>
  );
}

export default function CausesLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <div className="bg-primary py-16 md:py-24">
        <Container className="text-center">
          <div className="mx-auto mb-4 h-10 w-64 animate-pulse rounded bg-white/20" />
          <div className="mx-auto h-5 w-96 animate-pulse rounded bg-white/10" />
        </Container>
      </div>

      {/* Grid skeleton */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="mb-8 flex gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-9 w-20 animate-pulse rounded-full bg-surface-page" />
            ))}
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
