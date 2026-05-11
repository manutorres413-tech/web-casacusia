import { forwardRef } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Link } from "@/lib/i18n/navigation";

type Variant = "primary" | "secondary" | "ghost" | "link";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsLink   = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type ButtonProps    = ButtonAsButton | ButtonAsLink;

const base =
  "inline-flex items-center justify-center gap-2 font-bold rounded-full transition-colors " +
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-verde/30 " +
  "disabled:opacity-60 disabled:cursor-not-allowed";

/* verde-dark = #0E8C57 → contraste blanco 4.6:1 AA ✓ */
const variants: Record<Variant, string> = {
  primary:   "bg-verde-dark text-white hover:bg-[#0a6b42]",
  secondary: "bg-surface-card text-ink border border-surface-line hover:border-verde hover:text-verde-dark",
  ghost:     "bg-transparent text-ink hover:bg-surface-tint",
  link:      "bg-transparent text-verde-dark underline underline-offset-4 hover:text-[#0a6b42]"
};

const sizes: Record<Size, string> = {
  sm: "h-9  min-h-[36px] px-4 text-sm",
  md: "h-11 min-h-[44px] px-6 text-base",
  lg: "h-12 min-h-[48px] px-8 text-base md:text-[1.0625rem]"
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button({ variant = "primary", size = "md", className, children, ...rest }, ref) {
    const classes = cn(base, variants[variant], sizes[size], className);

    if ("href" in rest && rest.href !== undefined) {
      const isExternal = rest.href.startsWith("http") || rest.href.startsWith("mailto:") || rest.href.startsWith("tel:");
      
      if (isExternal) {
        return (
          <a ref={ref as React.Ref<HTMLAnchorElement>} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
            {children}
          </a>
        );
      }

      return (
        <Link ref={ref as React.Ref<HTMLAnchorElement>} href={rest.href} className={classes} {...(rest as any)}>
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        type={(rest as ButtonHTMLAttributes<HTMLButtonElement>).type ?? "button"}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
);
