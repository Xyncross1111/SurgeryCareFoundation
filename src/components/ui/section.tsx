import { cn } from "@/lib/utils";

export type SectionVariant = "default" | "dark" | "muted";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: SectionVariant;
  as?: React.ElementType;
}

const variantStyles: Record<SectionVariant, string> = {
  default: "",
  dark: "bg-primary text-white",
  muted: "bg-surface-green",
};

export function Section({
  variant = "default",
  as: Component = "section",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Component
      className={cn(
        "py-16 md:py-20 lg:py-24",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
