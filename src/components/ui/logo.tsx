import Link from "next/link";
import { cn } from "@/lib/utils";

export type LogoSize = "default" | "lg";

export interface LogoProps extends React.HTMLAttributes<HTMLAnchorElement> {
  size?: LogoSize;
}

const sizeConfig = {
  default: {
    wrapper: "h-12 gap-2",
    icon: "size-10",
    title: "text-[15px] leading-[15px]",
    subtitle: "text-[5px] tracking-[3.2px]",
  },
  lg: {
    wrapper: "h-24 gap-3",
    icon: "size-16",
    title: "text-[28px] leading-[28px]",
    subtitle: "text-[9px] tracking-[5.6px]",
  },
};

function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M24 4C18 4 14 8 14 14c0 4 2 7 5 9l-5 14c-1 2 0 4 2 5h16c2-1 3-3 2-5l-5-14c3-2 5-5 5-9 0-6-4-10-10-10z"
        className="fill-accent"
      />
      <rect x="20" y="10" width="8" height="18" rx="2" fill="white" />
      <rect x="15" y="15" width="18" height="8" rx="2" fill="white" />
    </svg>
  );
}

export function Logo({ size = "default", className, ...props }: LogoProps) {
  const config = sizeConfig[size];

  return (
    <Link
      href="/"
      aria-label="Surgery Care Foundation - Home"
      className={cn(
        "inline-flex items-center transition-opacity hover:opacity-80",
        config.wrapper,
        className
      )}
      {...props}
    >
      <LogoIcon className={config.icon} />
      <div className="flex flex-col">
        <span className={cn("font-black text-primary uppercase", config.title)}>
          Surgery
        </span>
        <span className={cn("font-black text-primary uppercase", config.title)}>
          Care
        </span>
        <span
          className={cn(
            "font-bold uppercase text-primary",
            config.subtitle
          )}
        >
          Foundation
        </span>
      </div>
    </Link>
  );
}
