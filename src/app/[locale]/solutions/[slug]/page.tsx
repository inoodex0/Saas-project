import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, BarChart3, Boxes, Check, ClipboardList, type LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/Reveal";
import { isLocale, routing } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";

const SLUGS = ["inventory", "orders", "analytics"] as const;
type Slug = (typeof SLUGS)[number];

const SLUG_ICONS: Record<Slug, LucideIcon> = {
  inventory: Boxes,
  orders: ClipboardList,
  analytics: BarChart3,
};

const SHOWCASE = [
  "/demo/fashion-forward.png",
  "/demo/jewelry-lux.png",
  "/demo/cosmetic-glow.png",
  "/demo/organic-one.png",
  "/demo/medical-care.png",
  "/demo/market-central.png",
];

const isSlug = (value: string): value is Slug =>
  (SLUGS as readonly string[]).includes(value);

const metaKey = (slug: Slug) =>
  `solutions${slug.charAt(0).toUpperCase()}${slug.slice(1)}` as const;

type Params = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params) {
  const { locale, slug } = await params;
  const safeLocale = isLocale(locale) ? locale : routing.defaultLocale;
  const t = await getTranslations({ locale: safeLocale, namespace: "meta" });

  if (!isSlug(slug)) {
    return { title: t("pricingTitle") };
  }

  return {
    title: t(`${metaKey(slug)}Title`),
    description: t(`${metaKey(slug)}Description`),
  };
}

type SolutionContent = {
  title: string;
  subtitle: string;
  bullets: string[];
  chipValue: string;
  chipText: string;
};

/* Premium solution page, compact type scale.
   Same copy, images and structure; richer surfaces: glowing hero visual with a
   gradient-edged browser frame, numbered highlight cards, a showcase band with
   mini browser frames, and a dark CTA panel. No new translation keys. */

export default async function SolutionPage({ params }: Params) {
  const { locale, slug } = await params;
  const active = isLocale(locale) ? locale : routing.defaultLocale;

  if (!isSlug(slug)) notFound();

  setRequestLocale(active);

  const t = await getTranslations("solutions");
  const content = t.raw(slug) as SolutionContent;
  const Icon = SLUG_ICONS[slug];

  return (
    <main className="flex flex-1 flex-col bg-white">
      {/* Hero: text + premium visual */}
      <section className="relative isolate overflow-hidden bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.045)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -start-48 -top-24 -z-10 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.3),transparent_65%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -end-52 top-10 -z-10 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(251,191,116,0.28),transparent_65%)]"
        />
        <Icon
          aria-hidden="true"
          strokeWidth={0.6}
          className="pointer-events-none absolute -start-16 bottom-0 -z-10 hidden h-72 w-72 rotate-12 text-teal-600/10 lg:block"
        />

        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 pb-20 pt-14 sm:pb-24 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-20">
          <Reveal variant="rise" delay={40} className="text-center lg:text-start">
            <span className="inline-flex items-center gap-2 rounded-full bg-white py-1 pe-3.5 ps-1 text-[11px] font-bold uppercase tracking-[0.14em] text-teal-700 shadow-[0_8px_20px_-10px_rgba(13,148,136,0.5)] ring-1 ring-teal-600/15">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
                <Icon className="h-3 w-3 text-white" aria-hidden="true" />
              </span>
              {t("eyebrow")}
            </span>

            <h1 className="mt-6 text-balance bg-gradient-to-b from-slate-900 to-slate-600 bg-clip-text text-3xl font-black leading-[1.1] tracking-[-0.03em] text-transparent sm:text-4xl lg:text-[2.8rem]">
              {content.title}
            </h1>

            {/* accent divider */}
            <div
              aria-hidden="true"
              className="mt-5 flex items-center justify-center gap-2 lg:justify-start"
            >
              <span className="h-1.5 w-1.5 rotate-45 bg-emerald-500 ring-4 ring-emerald-500/15" />
              <span className="h-px w-14 bg-gradient-to-r from-teal-500 to-transparent" />
            </div>

            <p className="mx-auto mt-5 max-w-lg text-balance text-sm leading-6 text-slate-600 sm:text-[15px] sm:leading-7 lg:mx-0">
              {content.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link
                href="/open-store"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 px-6 py-3 text-sm font-bold text-white shadow-[0_16px_32px_-12px_rgba(5,150,105,0.9)] ring-1 ring-inset ring-white/30 transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_40px_-12px_rgba(5,150,105,1)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 -start-1/2 w-1/3 -skew-x-12 bg-white/25 blur-md transition-transform duration-700 group-hover:translate-x-[420%] rtl:group-hover:-translate-x-[420%]"
                />
                <span className="relative">{t("ctaPrimary")}</span>
                <ArrowRight className="relative h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-full border-2 border-zinc-900 bg-white px-6 py-3 text-sm font-bold text-zinc-900 shadow-[4px_4px_0_0_rgba(23,23,23,0.9)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-zinc-50 hover:shadow-[2px_2px_0_0_rgba(23,23,23,0.9)]"
              >
                {t("ctaSecondary")}
              </Link>
            </div>
          </Reveal>

          {/* Visual card */}
          <Reveal variant="rise" delay={160}>
            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-tr from-teal-400/30 via-emerald-300/20 to-amber-200/35 blur-3xl"
              />
              {/* decorative back plate */}
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 translate-x-3 translate-y-3 rotate-2 rounded-[1.5rem] bg-gradient-to-br from-teal-500/15 to-orange-400/15 ring-1 ring-slate-900/5 rtl:-translate-x-3 rtl:-rotate-2"
              />

              {/* gradient hairline frame */}
              <div className="rounded-[1.5rem] bg-gradient-to-b from-teal-400/60 via-slate-200 to-orange-300/60 p-px shadow-[0_40px_80px_-32px_rgba(15,23,42,0.4)]">
                <div className="overflow-hidden rounded-[calc(1.5rem-1px)] bg-white">
                  <div className="flex items-center gap-2 border-b border-slate-200/80 bg-gradient-to-b from-white to-slate-50 px-4 py-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    <span
                      dir="ltr"
                      className="ms-2 flex-1 truncate rounded-full bg-slate-100/80 px-3 py-1 text-center text-[11px] font-semibold text-slate-500 ring-1 ring-slate-200/80 sm:flex-none sm:text-start"
                    >
                      yourstore.com
                    </span>
                  </div>
                  <div className="relative aspect-[16/10] bg-slate-100">
                    <Image
                      src={`/solutions/${slug}.jpg`}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-white/10"
                    />
                  </div>
                </div>
              </div>

              {/* floating stat chip */}
              <div className="absolute -bottom-5 -start-3 flex items-center gap-3 rounded-2xl bg-white/95 py-2.5 pe-4 ps-2.5 shadow-[0_20px_45px_-18px_rgba(15,23,42,0.45)] ring-1 ring-slate-900/5 backdrop-blur sm:-start-6">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_8px_18px_-8px_rgba(13,148,136,0.9)]">
                  <Icon className="h-[18px] w-[18px] text-white" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-base font-black leading-none text-slate-900">
                    {content.chipValue}
                  </span>
                  <span className="mt-1 block truncate text-[11px] font-medium text-slate-500">
                    {content.chipText}
                  </span>
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Highlights */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-16 pt-6 sm:pb-20">
        <div className="grid gap-4 sm:grid-cols-2">
          {content.bullets.map((bullet, index) => (
            <Reveal
              key={bullet}
              variant="rise"
              delay={index * 80}
              className="group relative flex h-full items-start gap-3.5 overflow-hidden rounded-2xl bg-gradient-to-br from-white to-slate-50/70 p-5 shadow-[0_1px_0_rgba(15,23,42,0.04),0_12px_30px_-22px_rgba(15,23,42,0.35)] ring-1 ring-slate-900/[0.06] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_-24px_rgba(13,148,136,0.45)] hover:ring-teal-600/25"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -end-10 -top-10 h-28 w-28 rounded-full bg-teal-400/0 blur-2xl transition-colors duration-300 group-hover:bg-teal-400/20"
              />
              <span className="relative mt-px grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_8px_14px_-8px_rgba(13,148,136,0.8)]">
                <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} aria-hidden="true" />
              </span>
              <span className="relative flex-1 text-sm font-semibold leading-6 text-slate-700">
                {bullet}
              </span>
              <span
                aria-hidden="true"
                className="relative font-mono text-[10px] font-bold tabular-nums tracking-wider text-slate-300 transition-colors group-hover:text-teal-500"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Store showcase */}
      <section className="relative isolate overflow-hidden border-y border-slate-200/70 bg-gradient-to-b from-slate-50 to-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(rgba(15,23,42,0.08)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-56 w-[40rem] -translate-x-1/2 rounded-full bg-teal-300/20 blur-3xl"
        />

        <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:py-16">
          <Reveal className="text-center">
            <h2 className="mx-auto max-w-2xl text-balance text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
              {t("showcaseTitle")}
            </h2>
            <div aria-hidden="true" className="mt-4 flex items-center justify-center gap-2">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-teal-500" />
              <span className="h-1.5 w-1.5 rotate-45 bg-emerald-500 ring-4 ring-emerald-500/15" />
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-teal-500" />
            </div>
          </Reveal>

          <div className="mt-9 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
            {SHOWCASE.map((src, index) => (
              <Reveal
                key={src}
                variant="rise"
                delay={(index % 3) * 80}
                className="group overflow-hidden rounded-2xl bg-white shadow-[0_14px_36px_-22px_rgba(15,23,42,0.35)] ring-1 ring-slate-900/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-28px_rgba(13,148,136,0.5)] hover:ring-teal-600/30"
              >
                {/* mini browser bar */}
                <div
                  aria-hidden="true"
                  className="flex items-center gap-1.5 border-b border-slate-200/70 bg-slate-50 px-3 py-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="ms-2 h-1.5 w-1/3 rounded-full bg-slate-200" />
                </div>
                <div className="relative aspect-[4/3] bg-slate-100">
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto w-full max-w-4xl px-6 py-16">
        <Reveal variant="rise">
          <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-slate-950 px-6 py-12 text-center shadow-[0_36px_70px_-30px_rgba(15,23,42,0.7)] ring-1 ring-white/10 sm:px-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -start-24 -top-24 -z-10 h-64 w-64 rounded-full bg-teal-500/40 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-28 -end-20 -z-10 h-64 w-64 rounded-full bg-orange-400/30 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
            />

            <h2 className="mx-auto max-w-xl text-balance text-2xl font-black tracking-tight text-white sm:text-3xl">
              {t("ctaTitle")}
            </h2>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/open-store"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-300 to-emerald-300 px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_14px_28px_-12px_rgba(52,211,153,0.8)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-12px_rgba(52,211,153,0.95)]"
              >
                {t("ctaPrimary")}
                <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/10"
              >
                {t("ctaSecondary")}
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}