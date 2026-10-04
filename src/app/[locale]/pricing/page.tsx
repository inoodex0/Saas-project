import { ArrowRight, Check } from "lucide-react";
import PricingOffer from "@/components/PricingOffer";
import PricingPlans, { type Plan } from "@/components/PricingPlans";
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
    title: t("pricingTitle"),
    description: t("pricingDescription"),
  };
}

type RawPlan = { name: string; tagline: string; cta: string; features: string[] };
type RawEnterprise = { title: string; description: string; cta: string };
type FaqItem = { q: string; a: string };

export default async function PricingPage({ params }: Params) {
  const { locale } = await params;
  const active = isLocale(locale) ? locale : routing.defaultLocale;
  setRequestLocale(active);

  const t = await getTranslations("pricing");

  const rawPlan = (key: string) => t.raw(key) as RawPlan;

  const starter = rawPlan("plans.starter");
  const growth = rawPlan("plans.growth");
  const scale = rawPlan("plans.scale");
  const enterprise = t.raw("enterprise") as RawEnterprise;

  const includes = t.raw("includes.items") as string[];

  const plans: Plan[] = [
    {
      ...starter,
      price: 0,
      period: t("freePeriod"),
      href: "#start",
    },
    {
      ...growth,
      price: 29,
      period: t("monthly"),
      href: "#start",
    },
    {
      ...scale,
      price: 79,
      period: t("monthly"),
      href: "#start",
      popular: true,
    },
    {
      name: enterprise.title,
      tagline: enterprise.description,
      cta: enterprise.cta,
      price: null,
      period: t("customPrice"),
      href: `/${active}/contact`,
      features: includes,
    },
  ];

  const faq = t.raw("faq.items") as FaqItem[];

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
          className="pointer-events-none absolute -start-40 top-0 -z-10 h-96 w-96 rounded-full bg-teal-200/50 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -end-40 -top-20 -z-10 h-96 w-96 rounded-full bg-green-200/50 blur-3xl"
        />

        <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-24">
          <h1 className="text-balance text-4xl font-black leading-[1.05] tracking-[-0.035em] text-slate-900 sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-balance text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="mx-auto w-full max-w-7xl px-6 pt-14 pb-4 lg:px-8">
        <PricingPlans plans={plans} learnMore={t("learnMore")} />
      </section>

      {/* Offer */}
      <PricingOffer />
    </main>
  );
}
