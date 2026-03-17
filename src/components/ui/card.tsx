import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden rounded-2xl bg-white border border-surface-border shadow-card hover:shadow-md transition-shadow duration-200",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export interface CardImageProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardImage({ className, children, ...props }: CardImageProps) {
  return (
    <div
      className={cn("overflow-hidden rounded-image", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

export function CardContent({ className, children, ...props }: CardContentProps) {
  return (
    <div className={cn("p-6", className)} {...props}>
      {children}
    </div>
  );
}
