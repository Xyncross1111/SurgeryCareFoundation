import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormSection } from "@/components/ui/form-section";
import { UploadIcon, ArrowRightIcon, CheckCircleIcon } from "@/components/ui/icons";

export default function StartFundraiserPage() {
  return (
    <>
      {/* Note: This page is inside the (dashboard) layout, so it gets auth header + sidebar.
          But the Figma shows it WITHOUT the sidebar. We render the hero + form in full width
          by overriding the sidebar layout constraint via the content itself. */}

      <div className="-mx-4 -mt-8 sm:-mx-6 md:-mt-12 lg:-mx-8">
        {/* Hero */}
        <section className="bg-primary py-12 text-center md:py-16">
          <Container>
            <Text variant="on-dark" size="label" className="mb-2 text-accent-mint">
              Create Campaign
            </Text>
            <Heading level="h1" as="h1" className="mb-4 text-white">
              Start a{" "}
              <span className="bg-gradient-to-b from-accent-mint to-accent-green bg-clip-text text-transparent">
                Fundraiser
              </span>
            </Heading>
            <Text variant="on-dark" className="mx-auto max-w-xl">
              Fill out the details below to submit a medical case for review. Every submission is rigorously vetted by
              our medical board to ensure authenticity.
            </Text>
          </Container>
        </section>

        <Container className="py-8 md:py-12">
          {/* Warning banner */}
          <div className="mb-8 flex items-start gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-lg" aria-hidden="true">⚠️</span>
            <div>
              <p className="mb-1 text-btn font-black text-amber-800">Before you start</p>
              <Text className="text-amber-700">
                You must be a registered user to create a fundraiser. Please ensure all medical documents are clear, legible, and issued
                by a certified medical professional. False or misleading applications will result in account suspension.
              </Text>
            </div>
          </div>

          {/* Campaign Information */}
          <FormSection icon="✏️" title="Campaign Information">
            <Input label="Fundraiser Title" placeholder="E.g., Help John Overcome Brain Tumor" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Patient / Cause Name" placeholder="E.g., John Doe" />
              <Input label="Medical Condition" placeholder="E.g., Brain Tumor Stage 2" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Target Amount (₹)" placeholder="500000" />
              <Input label="Urgency Level" placeholder="" />
            </div>
          </FormSection>

          {/* Patient Story */}
          <FormSection icon="📖" title="Patient Story">
            <div className="mb-2">
              <Text variant="secondary">
                Explain the patient&apos;s background, how the condition started, and exactly how the funds will be used. Be honest
                and transparent.
              </Text>
            </div>
            <Textarea
              label="Detailed Description"
              placeholder="Describe the medical situation and why funds are needed..."
              className="min-h-[160px]"
            />
          </FormSection>

          {/* Media & Documents */}
          <FormSection icon="📎" title="Media & Documents">
            <div className="grid gap-4 sm:grid-cols-2">
              {["Patient Images", "Medical Documents"].map((label) => (
                <div
                  key={label}
                  className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-surface-border bg-surface-page py-10 text-center transition-colors hover:border-accent/50"
                >
                  <UploadIcon className="size-8 text-slate-light" />
                  <Text variant="secondary" className="font-bold">{label}</Text>
                  <Text variant="muted" size="label" className="normal-case tracking-normal">
                    Upload a file (JPG, PNG, PDF)
                  </Text>
                </div>
              ))}
            </div>
          </FormSection>

          {/* Contact & Banking */}
          <FormSection icon="💳" title="Contact & Banking Details">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Your Relationship to Patient" placeholder="E.g., Father, Self, NGO Worker" />
              <Input label="Phone Number" placeholder="+91" />
            </div>

            <div className="mt-4 rounded-xl bg-accent/5 border border-accent/20 p-4">
              <p className="mb-2 text-btn font-black text-accent">Bank Details for Fund Dispersal</p>
              <Text variant="secondary" className="mb-4">
                Funds will be transferred to this account upon withdrawal approval. Ideally, provide the hospital&apos;s account details
                directly.
              </Text>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input placeholder="Account Holder Name" />
                <Input placeholder="Account Number" />
              </div>
              <div className="mt-4">
                <Input placeholder="IFSC / Swift Code" />
              </div>
            </div>
          </FormSection>

          {/* Consent & Submit */}
          <div className="mb-6 flex items-start gap-3 rounded-xl bg-surface-page p-4">
            <CheckCircleIcon className="mt-0.5 size-5 shrink-0 text-accent" />
            <Text variant="secondary">
              By submitting this form, I declare that all information and documents provided are genuine. I understand that the
              Surgery Care Foundation medical board will verify this case with the respective hospital before approval.
            </Text>
          </div>

          <Button variant="primary" size="lg" className="w-full gap-2 sm:w-auto">
            Submit Fundraiser for Review
            <ArrowRightIcon className="size-5" />
          </Button>
        </Container>
      </div>
    </>
  );
}
