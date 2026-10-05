import { Bot, Check, Coins, Globe2, Zap } from "lucide-react";
import { getTranslations } from "next-intl/server";

const CARDS = [
  {
    key: "localization",
    num: "01",
    grad: "from-teal-500 to-emerald-600",
    glow: "bg-teal-400/40",
    icon: Globe2,
    chips: ["seo", "detection"],
  },
  {
    key: "ai",
    num: "02",
    grad: "from-amber-400 to-orange-500",
    glow: "bg-amber-400/40",
    icon: Bot,
    chips: ["note", "speed"],
  },
  {
    key: "currency",
    num: "03",
    grad: "from-emerald-500 to-green-600",
    glow: "bg-emerald-400/40",
    icon: Coins,
    chips: ["liveFx"],
  },
  {
    key: "edge",
    num: "04",
    grad: "from-emerald-500 to-teal-600",
    glow: "bg-teal-400/40",
    icon: Zap,
    chips: ["speed", "uptime", "latency"],
  },
] as const;

export default async function FeaturesShowcase() {
  const t = await getTranslations("features");

  return (
    <section id="features" className="relative overflow-hidden">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -start-40 top-1/3 -z-10 h-96 w-96 rounded-full bg-teal-200/40 blur-3xl animate-drift"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -end-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl animate-drift-slow"
      />

      <div className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-8 lg:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {CARDS.map(({ key, num, grad, glow, icon: Icon, chips }) => (
            <article
              key={key}
              className="group relative overflow-hidden rounded-3xl bg-white p-6 ring-1 ring-slate-200/80 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_44px_-26px_rgba(15,23,42,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(15,23,42,0.05),0_28px_56px_-26px_rgba(13,148,136,0.45)] hover:ring-teal-300/70 sm:p-8"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute -end-20 -top-20 h-52 w-52 rounded-full ${glow} opacity-50 blur-3xl transition-opacity duration-500 group-hover:opacity-100`}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-3 end-5 text-7xl font-black leading-none text-slate-100 transition-colors duration-300 group-hover:text-teal-100"
              >
                {num}
              </span>

              <span
                className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${grad} text-white shadow-lg shadow-slate-900/15 ring-1 ring-inset ring-white/30 transition-transform duration-300 group-hover:scale-105`}
              >
                <Icon className="h-6 w-6" strokeWidth={2.25} />
              </span>

              <h3 className="relative mt-5 text-xl font-black leading-tight tracking-tight text-slate-900 sm:text-2xl">
                {t(`${key}.title`)}
              </h3>
              <p className="relative mt-3 text-sm leading-7 text-slate-500 sm:text-[15px]">
                {t(`${key}.body`)}
              </p>

              <div
                aria-hidden="true"
                className="relative mt-5 h-px bg-gradient-to-r from-slate-200 via-slate-200/60 to-transparent"
              />

              <div className="relative mt-4 flex flex-wrap gap-2">
                {chips.map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-[11px] font-bold text-slate-600 ring-1 ring-slate-200/90 transition-colors duration-300 group-hover:bg-teal-50/70 group-hover:text-teal-800 group-hover:ring-teal-200/70"
                  >
                    <Check
                      className="h-3 w-3 text-emerald-500"
                      strokeWidth={3}
                    />
                    {t(`${key}.${chip}`)}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
