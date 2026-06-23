import Link from "next/link";
import { type AnchorHTMLAttributes, type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "dark" | "outline" | "ghost";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-orange-gradient text-white shadow-glow hover:shadow-[0_0_50px_rgba(224,92,40,0.5)] hover:-translate-y-0.5 active:translate-y-0 border border-orange/20",
  secondary:
    "bg-white text-navy shadow-glass hover:-translate-y-0.5 active:translate-y-0 hover:bg-grey border border-white/60",
  dark:
    "bg-navy-gradient text-white shadow-glass hover:-translate-y-0.5 active:translate-y-0 hover:bg-navy-mid border border-white/10",
  outline:
    "border-2 border-white/50 text-white hover:-translate-y-0.5 active:translate-y-0 hover:border-white hover:bg-white/10 backdrop-blur-sm",
  ghost:
    "text-orange hover:bg-orange/10 border border-orange/20 hover:-translate-y-0.5 active:translate-y-0",
};

const sizes: Record<string, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-6 py-3.5 text-sm",
  lg: "px-8 py-4 text-base",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonLinkProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-black transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  );
}
