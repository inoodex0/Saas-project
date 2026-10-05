import Reveal from "@/components/Reveal";
import TestimonialsSection from "@/components/TestimonialsSection";
import { isLocale, routing } from "@/i18n/routing";
import { Package, Scissors, Star } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { CSSProperties } from "react";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params) {
  const { locale } = await params;
  const t = await getTranslations({
    locale: isLocale(locale) ? locale : routing.defaultLocale,
    namespace: "meta",
  });

  return {
    title: t("testimonialsTitle"),
    description: t("testimonialsDescription"),
  };
}

/* Concept: "Parcel tags & shipping labels" — the hero sets the stage for the
   testimonials below: paper board, blueprint grid, a shipping-label eyebrow,
   a highlighter-marked headline and a perforated tear-off line at the bottom.
   No new copy, so no new translation keys. */

const STRIPES =
  "repeating-linear-gradient(135deg, #0f172a 0 8px, #f59e0b 8px 16px)";

const tagShape: CSSProperties = {
  clipPath: "polygon(14% 0, 86% 0, 100% 9%, 100% 100%, 0 100%, 0 9%)",
};

function MiniTag({
  className = "",
  tint,
}: {
  className?: string;
  tint: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute hidden select-none lg:block ${className}`}
      style={{ filter: "drop-shadow(0 14px 14px rgba(60,40,10,0.2))" }}
    >
      <span className="absolute -top-5 left-1/2 h-8 w-5 -translate-x-1/2 rounded-t-full border-2 border-b-0 border-amber-800/60" />
      <div
        className="relative w-24 px-3 pb-3 pt-7"
        style={{ ...tagShape, backgroundColor: tint }}
      >
        <span className="absolute left-1/2 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-white shadow-[inset_0_1px_2px_rgba(15,23,42,0.35)]" />
        <div className="flex justify-center gap-0.5">
          {Array.from({ length: 5 }).map((_, s) => (
            <Star key={s} className="h-2.5 w-2.5 fill-orange-500 text-orange-500" />
          ))}
        </div>
        <div className="mt-2 space-y-1.5">
          <span className="block h-1 w-full rounded-full bg-slate-900/15" />
          <span className="block h-1 w-4/5 rounded-full bg-slate-900/15" />
          <span className="block h-1 w-3/5 rounded-full bg-slate-900/15" />
        </div>
      </div>
    </div>
  );
}

export default async function TestimonialsPage({ params }: Params) {
  const { locale } = await params;
  const active = isLocale(locale) ? locale : routing.defaultLocale;
  setRequestLocale(active);

  const t = await getTranslations("testimonials");

  return (
    <main className="flex flex-1 flex-col">
      {/* Page header: paper board with a blueprint grid */}
      <section className="relative isolate overflow-hidden bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(120,90,40,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(120,90,40,0.08)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
        />

        {/* oversized outlined brand stamp */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-6 -z-10 w-[120vw] -translate-x-1/2 select-none whitespace-nowrap text-center text-[17vw] font-black leading-none tracking-[-0.03em] text-transparent sm:top-8"
          style={{ WebkitTextStroke: "1.5px rgba(120,70,20,0.14)" }}
        >
          ZENVIKA
        </div>

        {/* floating tags peeking in from the sides */}
        <MiniTag tint="#f4e4c1" className="start-[7%] top-16 -rotate-[9deg]" />
        <MiniTag tint="#dcefe6" className="end-[8%] top-24 rotate-[8deg]" />

        <div className="relative z-10 mx-auto max-w-3xl px-6 pb-20 pt-14 text-center sm:pb-24 sm:pt-20 lg:pt-24">
          <Reveal variant="rise" delay={40}>
          {/* eyebrow as a shipping-label chip */}
          <div className="mb-8 flex justify-center">
            <div className="relative inline-flex items-stretch overflow-hidden rounded-md border border-slate-900/15 bg-[#fffdf7] shadow-[0_6px_16px_rgba(60,40,10,0.12)]">
              <span
                aria-hidden="true"
                className="w-2.5 shrink-0"
                style={{ backgroundImage: STRIPES }}
              />
              <span className="flex items-center gap-2.5 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-slate-700 sm:text-xs">
                <Package aria-hidden="true" className="h-4 w-4 text-orange-600" />
                {t("eyebrow")}
              </span>
              <span
                aria-hidden="true"
                className="flex items-center border-s-2 border-dashed border-slate-300 px-3"
              >
                <span className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-3 w-3 fill-orange-500 text-orange-500" />
                  ))}
                </span>
              </span>
            </div>
          </div>

          <h1 className="flex flex-col items-center">
            <span className="text-balance text-3xl font-extrabold leading-[1.06] tracking-[-0.035em] text-slate-900 sm:text-4xl lg:text-[2.75rem]">
              {t("title")}
            </span>

            <span className="relative isolate mt-5 inline-block px-3 pb-1">
              {/* highlighter marker behind the accent word */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-[0.12em] top-[0.42em] -z-10 -rotate-1 -skew-x-6 rounded-sm bg-amber-300"
              />
              <span
                aria-hidden="true"
                className="absolute -end-1 -top-1 -z-10 h-5 w-5 rotate-12 rounded-sm border-2 border-dashed border-orange-500/70"
              />
              <span className="relative">{t("titleAccent")}
              </span>
            </span>

            {/* delivery route squiggle */}
            <svg
              aria-hidden="true"
              viewBox="0 0 320 24"
              preserveAspectRatio="none"
              className="mt-3 h-5 w-56 sm:w-72"
            >
              <path
                d="M4 16C50 2 90 22 140 12s90-10 150 2"
                fill="none"
                stroke="#0f172a"
                strokeOpacity="0.55"
                strokeWidth="2.5"
                strokeDasharray="2 8"
                strokeLinecap="round"
              />
              <circle cx="6" cy="16" r="4.5" fill="#f97316" />
              <circle cx="300" cy="14" r="6" fill="#10b981" />
              <circle cx="300" cy="14" r="2.5" fill="#fff" />
            </svg>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-balance text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            {t("subtitle")}
          </p>
          </Reveal>
        </div>

        {/* tear-off perforation into the wall of tags */}
        <div
          aria-hidden="true"
          className="relative z-10 mx-auto flex max-w-7xl items-center gap-3 px-6 pb-2 text-slate-400 lg:px-8"
        >
          <Scissors className="h-4 w-4 shrink-0 -scale-x-100 rtl:scale-x-100" />
          <span className="flex-1 border-t-2 border-dashed border-slate-400/60" />
         
          <span className="flex-1 border-t-2 border-dashed border-slate-400/60" />
          <Scissors className="h-4 w-4 shrink-0 rtl:-scale-x-100" />
        </div>
      </section>

      <TestimonialsSection />
    </main>
  );
}