import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: IconButtonSize;
  href?: string;
}

const sizeStyles: Record<IconButtonSize, string> = {
  sm: "size-8",
  md: "size-10",
  lg: "size-11",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ size = "md", className, children, href, ...props }, ref) => {
    const styles = cn(
      "inline-flex items-center justify-center rounded-full border border-surface-border bg-white shadow-card transition-colors",
      "hover:bg-surface-green hover:border-accent/30",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      sizeStyles[size],
      className
    );

    if (href) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles}
        >
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={styles} {...props}>
        {children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
