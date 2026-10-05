
import ThemeGallery from "@/components/ThemeGallery";
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
    title: t("featuresTitle"),
    description: t("featuresDescription"),
  };
}

export default async function FeaturesPage({ params }: Params) {
  const { locale } = await params;
  const active = isLocale(locale) ? locale : routing.defaultLocale;
  setRequestLocale(active);

  const t = await getTranslations("features");

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
          className="pointer-events-none absolute -start-40 top-0 -z-10 h-96 w-96 rounded-full bg-teal-300/45 blur-3xl animate-drift"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -end-40 -top-20 -z-10 h-96 w-96 rounded-full bg-emerald-300/45 blur-3xl animate-drift-slow"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-64 w-[44rem] -translate-x-1/2 rounded-full bg-teal-400/20 blur-3xl"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-14 start-[16%] -z-10 hidden h-4 w-4 rotate-12 rounded-md bg-gradient-to-br from-teal-400 to-emerald-400 opacity-70 animate-drift sm:block"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute end-[14%] top-16 -z-10 h-14 w-14 rounded-full border-2 border-emerald-300/70 animate-drift-slow"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute end-[22%] bottom-20 -z-10 hidden h-2.5 w-2.5 rounded-full bg-teal-400/80 animate-drift sm:block"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-teal-400/70 to-transparent"
        />

        <div className="mx-auto max-w-3xl px-6 py-11 text-center sm:py-14 lg:py-20">
          <h1 className="text-balance text-3xl font-black leading-[1.1] tracking-[-0.03em] text-slate-900 sm:text-4xl lg:text-5xl">
            <span className="block">{t("gallery.title")}</span>
            <span className="relative mt-1.5 inline-block pb-1.5">
              <span className="bg-gradient-to-r from-teal-600 via-emerald-500 to-cyan-400 bg-clip-text text-transparent">
                {t("gallery.titleAccent")}
              </span>
              <svg
                aria-hidden="true"
                viewBox="0 0 300 14"
                fill="none"
                preserveAspectRatio="none"
                className="absolute inset-x-0 bottom-0 h-2.5 w-full"
              >
                <path
                  d="M4 10C70 4 210 3 296 8"
                  stroke="url(#features-header-underline)"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id="features-header-underline"
                    x1="0"
                    y1="0"
                    x2="300"
                    y2="0"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#14b8a6" />
                    <stop offset="1" stopColor="#34d399" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          <div
            aria-hidden="true"
            className="mx-auto mt-5 flex w-24 items-center gap-2.5"
          >
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-teal-400/80" />
            <span className="h-1.5 w-1.5 rotate-45 rounded-[2px] bg-gradient-to-br from-teal-500 to-emerald-400" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-teal-400/80" />
          </div>

          <p className="mx-auto mt-4 max-w-xl text-balance text-sm leading-6 text-slate-500 sm:text-[15px] sm:leading-7">
            {t("gallery.subtitle")}
          </p>
        </div>
      </section>

      <ThemeGallery />
    
    </main>
  );
}
