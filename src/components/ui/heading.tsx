import { cn } from "@/lib/utils";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  as?: HeadingLevel;
}

const levelStyles: Record<HeadingLevel, string> = {
  h1: "text-[40px] leading-[44px] tracking-[-1px] md:text-[64px] md:leading-[68px] md:tracking-[-1.8px] lg:text-h1 font-black",
  h2: "text-[32px] leading-[36px] tracking-[-0.8px] md:text-[48px] md:leading-[52px] md:tracking-[-1.2px] lg:text-h2 font-black",
  h3: "text-[24px] leading-[28px] md:text-[30px] md:leading-[34px] lg:text-h3 font-black",
  h4: "text-[20px] leading-[26px] md:text-h4 font-black",
};

export function Heading({
  level = "h2",
  as,
  className,
  children,
  ...props
}: HeadingProps) {
  const Component = as ?? level;

  return (
    <Component className={cn(levelStyles[level], className)} {...props}>
      {children}
    </Component>
  );
}
