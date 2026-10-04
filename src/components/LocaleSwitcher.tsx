"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeNames, locales } from "@/i18n/routing";

export function LocaleSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="fixed end-4 top-4 z-50">
      <select
        aria-label={t("label")}
        title={t("change")}
        value={locale}
        onChange={(event) =>
          router.replace(pathname, { locale: event.target.value })
        }
        className="cursor-pointer rounded-full border border-black/10 bg-white px-3 py-1.5 text-sm text-black shadow-sm outline-none focus:border-black/40 dark:border-white/20 dark:bg-zinc-900 dark:text-white"
      >
        {locales.map((code) => (
          <option key={code} value={code}>
            {localeNames[code]}
          </option>
        ))}
      </select>
    </div>
  );
}
