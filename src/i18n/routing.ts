import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'bn', 'ar', 'es', 'fr', 'de', 'it'],
  defaultLocale: 'en',
  localePrefix: 'always'
});

export type Locale = (typeof routing.locales)[number];

export const locales: readonly Locale[] = routing.locales;
export const defaultLocale: Locale = routing.defaultLocale;

export const localeNames: Record<Locale, string> = {
  en: 'English',
  bn: 'বাংলা',
  ar: 'العربية',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano'
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  bn: '🇧🇩',
  ar: '🇸🇦',
  es: '🇪🇸',
  fr: '🇫🇷',
  de: '🇩🇪',
  it: '🇮🇹'
};

export const rtlLocales: readonly string[] = ['ar'];

export function isLocale(value: unknown): value is Locale {
  return (
    typeof value === 'string' &&
    (routing.locales as readonly string[]).includes(value)
  );
}
