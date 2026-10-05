"use client";

import { Check, Star } from "lucide-react";

export type Plan = {
  name: string;
  tagline: string;
  price: number | null;
  period: string;
  cta: string;
  href: string;
  features: string[];
  popular?: boolean;
};

type Props = {
  plans: Plan[];
  learnMore?: string;
  learnMoreHref?: string;
};

export default function PricingPlans({ plans, learnMore = "Learn more", learnMoreHref = "#faq" }: Props) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {plans.map((plan) => {
        const popular = Boolean(plan.popular);

        return (
          <div
            key={plan.name}
            className={
              popular
                ? "relative z-10 flex flex-col rounded-lg bg-gradient-to-b from-teal-600 via-emerald-600 to-green-600 p-7 text-white shadow-[0_34px_66px_-30px_rgba(13,148,136,0.75)] lg:-my-6"
                : "relative flex flex-col rounded-lg border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
            }
          >
            {popular ? (
              <span
                aria-label="Most popular"
                className="absolute -end-3 -top-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white/25 ring-1 ring-inset ring-white/40 backdrop-blur-md"
              >
                <Star className="h-5 w-5 text-white" fill="currentColor" />
              </span>
            ) : null}

            <h3
              className={`text-2xl font-bold tracking-tight ${
                popular ? "text-white" : "text-slate-900"
              }`}
            >
              {plan.name}
            </h3>

            <div className="mt-3 flex items-baseline gap-2">
              {plan.price !== null ? (
                <>
                  <span
                    className={`text-4xl font-black tracking-[-0.03em] ${
                      popular ? "text-white" : "text-teal-700"
                    }`}
                  >
                    ${plan.price}
                  </span>
                  <span
                    className={`text-sm font-bold ${
                      popular ? "text-white/80" : "text-slate-500"
                    }`}
                  >
                    {plan.period}
                  </span>
                </>
              ) : (
                <span
                  className={`text-4xl font-black tracking-[-0.03em] ${
                    popular ? "text-white" : "text-teal-700"
                  }`}
                >
                  {plan.period}
                </span>
              )}
            </div>

            <div
              className={`mt-5 border-t ${
                popular ? "border-white/25" : "border-slate-200"
              }`}
            />

            <p
              className={`mt-5 min-h-10 text-sm leading-relaxed ${
                popular ? "text-white/85" : "text-slate-500"
              }`}
            >
              {plan.tagline}
            </p>

            <ul className="mt-5 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm">
                  <Check
                    className={`mt-0.5 h-4 w-4 shrink-0 ${
                      popular ? "text-white" : "text-teal-700"
                    }`}
                    strokeWidth={3}
                  />
                  <span className={popular ? "text-white/90" : "text-slate-600"}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-7">
              <div className={`border-t ${popular ? "border-white/25" : "border-slate-200"}`} />
              <a
                href={plan.href}
                className={`mt-6 block w-full rounded-md px-6 py-3.5 text-center text-sm font-bold transition-all duration-300 ${
                  popular
                    ? "bg-white text-emerald-700 hover:bg-emerald-50"
                    : "bg-gradient-to-r from-teal-600 to-green-600 text-white shadow-[0_14px_28px_-14px_rgba(5,150,105,0.9)] hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-14px_rgba(5,150,105,1)]"
                }`}
              >
                {plan.cta}
              </a>
              <a
                href={learnMoreHref}
                className={`mt-4 block py-1.5 text-center text-sm font-bold transition-colors ${
                  popular
                    ? "text-white/90 hover:text-white"
                    : "text-teal-700 hover:text-teal-700"
                }`}
              >
                {learnMore}
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
