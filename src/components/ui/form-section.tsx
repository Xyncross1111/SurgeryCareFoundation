import { Heading } from "./heading";

export interface FormSectionProps {
  icon: string;
  title: string;
  children: React.ReactNode;
}

export function FormSection({ icon, title, children }: FormSectionProps) {
  return (
    <div className="mb-8 rounded-2xl border border-surface-border bg-white p-6 shadow-card md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="text-xl" aria-hidden="true">{icon}</span>
        <Heading level="h4" as="h2" className="text-accent">{title}</Heading>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
