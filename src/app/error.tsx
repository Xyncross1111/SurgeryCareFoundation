"use client";

import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 inline-flex size-16 items-center justify-center rounded-full bg-red-50">
        <span className="text-2xl">!</span>
      </div>
      <Heading level="h2" as="h1" className="mb-3">
        Something went wrong
      </Heading>
      <Text variant="secondary" className="mb-8 max-w-md">
        {error.message || "An unexpected error occurred. Please try again."}
      </Text>
      <Button variant="secondary" onClick={reset}>
        Try Again
      </Button>
    </div>
  );
}
