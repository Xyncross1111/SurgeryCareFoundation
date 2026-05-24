import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { buttonVariants } from "@/components/ui/button";

export default async function CauseNotFound() {
  const t = await getTranslations("notFound");
  return (
    <section className="py-24 md:py-32">
      <Container className="text-center">
        <div className="mb-6 inline-flex size-20 items-center justify-center rounded-full bg-surface-page">
          <span className="text-4xl text-slate-light">?</span>
        </div>
        <Heading level="h2" as="h1" className="mb-3">
          {t("heading")}
        </Heading>
        <Text variant="secondary" className="mb-8 mx-auto max-w-md">
          {t("body")}
        </Text>
        <Link href="/causes" className={buttonVariants({ variant: "secondary", size: "lg" })}>
          {t("viewAll")}
        </Link>
      </Container>
    </section>
  );
}
