import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "accent" | "success" | "outline";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-primary text-white",
  accent: "bg-accent text-white",
  success: "bg-surface-green text-accent",
  outline: "bg-white border border-surface-border text-slate-medium",
};

export function Badge({
  variant = "default",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-label uppercase",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
