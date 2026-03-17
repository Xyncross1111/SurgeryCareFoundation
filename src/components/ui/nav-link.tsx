import { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface NavLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  active?: boolean;
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ href, active = false, className, children, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        href={href}
        className={cn(
          "relative text-nav transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm",
          active ? "text-accent" : "text-slate hover:text-accent",
          className
        )}
        aria-current={active ? "page" : undefined}
        {...props}
      >
        {children}
        {active && (
          <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-t-full bg-accent" />
        )}
      </Link>
    );
  }
);

NavLink.displayName = "NavLink";
