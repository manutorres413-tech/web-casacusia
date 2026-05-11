"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import { locales, type Locale, localeLabels } from "@/lib/i18n/config";
import { cn } from "@/lib/utils/cn";
import { useTransition } from "react";

export function LangSwitcher({ className }: { className?: string }) {
  const t = useTranslations("a11y");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = useTransition();

  return (
    <div className={cn("inline-flex items-center gap-1 text-sm", className)} role="group" aria-label={t("languages")}>
      {locales.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            lang={loc}
            aria-current={active ? "page" : undefined}
            aria-label={localeLabels[loc]}
            onClick={() => {
              if (active) return;
              startTransition(() => {
                router.replace(pathname, { locale: loc });
              });
            }}
            className={cn(
              "h-8 px-3 rounded-full font-medium transition-colors",
              active
                ? "bg-ink text-white"
                : "text-ink-soft hover:text-ink hover:bg-surface-tint"
            )}
          >
            {loc.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
