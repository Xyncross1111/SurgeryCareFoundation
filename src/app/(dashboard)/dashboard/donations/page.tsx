import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { ClockIcon } from "@/components/ui/icons";

export default function DonationHistoryPage() {
  return (
    <div>
      <Heading level="h2" as="h1" className="mb-2">Donation History</Heading>
      <Text variant="secondary" className="mb-8">View all your past donations and download receipts.</Text>

      <div className="flex flex-col items-center justify-center rounded-2xl border border-surface-border bg-white py-20 shadow-card">
        <span className="mb-4 flex size-16 items-center justify-center rounded-full bg-surface-page">
          <ClockIcon className="size-8 text-slate-light" />
        </span>
        <Heading level="h3" as="h2" className="mb-2 text-accent">
          More details coming soon
        </Heading>
        <Text variant="secondary" className="max-w-sm text-center">
          We are currently organizing your history data to display here in the final version.
        </Text>
      </div>
    </div>
  );
}
