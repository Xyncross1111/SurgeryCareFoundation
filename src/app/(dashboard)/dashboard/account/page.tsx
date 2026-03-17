import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Badge } from "@/components/ui/badge";
import { FormSection } from "@/components/ui/form-section";
import { CheckIcon } from "@/components/ui/icons";

const VERIFICATION_ITEMS = [
  { label: "Active", status: true },
  { label: "Eligible", status: true },
  { label: "Eligible", status: false },
  { label: "Today", status: false },
] as const;

export default function AccountPage() {
  return (
    <div>
      <Heading level="h2" as="h1" className="mb-1">Account &amp; Profile</Heading>
      <Text variant="secondary" className="mb-8">Manage your personal details, verification, and preferences.</Text>

      {/* Profile Completion */}
      <div className="mb-8 flex items-center gap-6 rounded-2xl border border-surface-border bg-white p-6 shadow-card">
        <Avatar initials="JD" size="lg" />
        <div className="flex-1">
          <div className="mb-2 flex items-center justify-between">
            <Heading level="h4" as="h2">Profile Completion</Heading>
            <Text className="font-black text-accent">89%</Text>
          </div>
          <ProgressBar value={89} className="mb-2" />
          <Text variant="muted">Complete your KYC and upload emergency contacts to reach 100%.</Text>
        </div>
      </div>

      {/* Verification badges */}
      <div className="mb-8 flex flex-wrap gap-3">
        {VERIFICATION_ITEMS.map(({ label, status }, i) => (
          <div key={i} className="flex items-center gap-2 rounded-2xl border border-surface-border bg-white px-4 py-3 shadow-card">
            <span className={`flex size-8 items-center justify-center rounded-full ${status ? "bg-accent/10" : "bg-surface-page"}`}>
              <CheckIcon className={`size-4 ${status ? "text-accent" : "text-slate-light"}`} />
            </span>
            <Badge variant={status ? "success" : "outline"}>{label}</Badge>
          </div>
        ))}
      </div>

      {/* Personal Details */}
      <FormSection icon="👤" title="Personal Details">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Full / Legal Name" placeholder="John Edward Doe" />
          <Input label="Username" placeholder="@johndoe91" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Email Address" placeholder="johndoe@example.com" />
          <Input label="Primary Phone" placeholder="+91 98765 43210" />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <Input label="Alternate Phone (Optional)" placeholder="+91" />
          <Input label="Date of Birth" placeholder="" />
          <Input label="Preferred Language" placeholder="" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Gender" placeholder="Male" />
          <Input label="Blood Group" placeholder="" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Occupation" placeholder="Software Engineer" />
          <Input label="Organization Name" placeholder="TechCorp India" />
        </div>
      </FormSection>

      {/* Address */}
      <FormSection icon="📍" title="Address & Location">
        <Input label="Full Residential Address" placeholder="" />
        <div className="grid gap-4 sm:grid-cols-3">
          <Input label="City" placeholder="Mumbai" />
          <Input label="District" placeholder="Mumbai Suburban" />
          <Input label="Postal Code" placeholder="400050" />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <Input label="State" placeholder="Maharashtra" />
          <Input label="Country" placeholder="India" />
          <Input label="Nationality" placeholder="Indian" />
        </div>
      </FormSection>

      {/* Identity & KYC */}
      <FormSection icon="🪪" title="Identity & KYC">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="ID Proof Type" placeholder="" />
          <Input label="ID Proof Number" placeholder="XXXX-XXXX-XXXX" />
        </div>
        <div className="rounded-xl bg-accent/5 border border-accent/20 px-4 py-3">
          <Text className="text-accent font-bold">
            ✓ Your identity is verified. To update your ID proof, please contact support.
          </Text>
        </div>
      </FormSection>

      {/* Financial Details */}
      <FormSection icon="🏦" title="Financial Details">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Linked Bank Name" placeholder="HDFC Bank" />
          <Input label="Account Number (Last 4 Digits)" placeholder="**** 5678" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="PAN Card No." placeholder="ABCDE1234F" />
          <Input label="Beneficiary Details (if applicable)" placeholder="Add beneficiary name" />
        </div>
      </FormSection>

      {/* Save */}
      <div className="mt-8 flex justify-end">
        <Button variant="primary" size="lg">Save All Changes</Button>
      </div>
    </div>
  );
}
