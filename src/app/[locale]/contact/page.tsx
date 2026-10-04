import ContactSection from "@/components/ContactSection";
import { isLocale, routing } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params) {
  const { locale } = await params;
  const t = await getTranslations({
    locale: isLocale(locale) ? locale : routing.defaultLocale,
    namespace: "meta",
  });

  return {
    title: t("contactTitle"),
    description: t("contactDescription"),
  };
}

export default async function ContactPage({ params }: Params) {
  const { locale } = await params;
  const active = isLocale(locale) ? locale : routing.defaultLocale;
  setRequestLocale(active);

  const t = await getTranslations("contact");

  return (
    <main className="flex flex-1 flex-col">
      {/* Page Header */}
      <section className="relative isolate overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-white via-white to-teal-50/60">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(rgba(23,23,23,0.12)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_top,rgba(0,0,0,0.5),transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -start-40 top-0 -z-10 h-96 w-96 rounded-full bg-teal-200/50 blur-3xl animate-drift"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -end-40 -top-20 -z-10 h-96 w-96 rounded-full bg-green-200/50 blur-3xl animate-drift-slow"
        />
        <span
          aria-hidden="true"
          className="absolute start-[14%] top-24 -z-10 h-3 w-3 rounded-full bg-teal-400/70 animate-drift"
        />
        <span
          aria-hidden="true"
          className="absolute end-[16%] top-36 -z-10 h-2.5 w-2.5 rounded-full bg-emerald-400/70 animate-drift-slow"
        />

        <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-200/80 bg-white/80 px-4 py-1.5 text-xs font-bold text-teal-700 shadow-[0_8px_24px_-12px_rgba(13,148,136,0.6)] backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
            </span>
            {t("heroBadge")}
          </span>

          <h1 className="mt-6 text-balance text-4xl font-black leading-[1.05] tracking-[-0.035em] text-slate-900 sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-balance text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            {t("subtitle")}
          </p>
        </div>
      </section>

      <ContactSection />
    </main>
  );
}
