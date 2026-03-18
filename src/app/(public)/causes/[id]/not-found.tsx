import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { buttonVariants } from "@/components/ui/button";

export default function CauseNotFound() {
  return (
    <section className="py-24 md:py-32">
      <Container className="text-center">
        <div className="mb-6 inline-flex size-20 items-center justify-center rounded-full bg-surface-page">
          <span className="text-4xl text-slate-light">?</span>
        </div>
        <Heading level="h2" as="h1" className="mb-3">
          Cause Not Found
        </Heading>
        <Text variant="secondary" className="mb-8 mx-auto max-w-md">
          The cause you&apos;re looking for doesn&apos;t exist or may have been removed.
        </Text>
        <Link href="/causes" className={buttonVariants({ variant: "secondary", size: "lg" })}>
          Browse All Causes
        </Link>
      </Container>
    </section>
  );
}
