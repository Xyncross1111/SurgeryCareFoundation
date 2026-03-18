"use client";

import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
      <div className="mb-6 inline-flex size-16 items-center justify-center rounded-full bg-red-50">
        <span className="text-2xl text-red-500">!</span>
      </div>
      <Heading level="h2" as="h1" className="mb-3">
        Something went wrong
      </Heading>
      <Text variant="secondary" className="mb-8 max-w-md">
        {error.message || "We encountered an error loading this page. Please try again."}
      </Text>
      <Button variant="secondary" onClick={reset}>
        Try Again
      </Button>
    </div>
  );
}
