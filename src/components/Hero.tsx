import { ArrowRight, Check, ShoppingBag, TrendingUp } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const revenueBars = [38, 62, 48, 86, 70];

export default async function Hero() {
  const t = await getTranslations("home.hero");
  const bullets = (t.raw("bullets") as string[]) ?? [];

  return (
    <section id="home" className="relative isolate overflow-hidden bg-[#fbfcff]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(rgba(23,23,23,0.14)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_top,rgba(0,0,0,0.55),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -start-52 top-6 -z-10 h-[30rem] w-[30rem] animate-drift rounded-full bg-[radial-gradient(circle,rgba(255,214,178,0.65),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-56 top-20 -z-10 h-[32rem] w-[32rem] animate-drift-slow rounded-full bg-[radial-gradient(circle,rgba(196,181,253,0.6),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-16rem] -z-10 h-[40rem] w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(147,197,253,0.7),transparent_65%)] blur-2xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-7 -z-10 w-[120vw] -translate-x-1/2 select-none whitespace-nowrap text-center text-[17vw] font-black leading-none tracking-[-0.03em] text-transparent sm:top-9"
        style={{ WebkitTextStroke: "1.5px rgba(13,148,136,0.13)" }}
      >
        ZENVIKA
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-52 -z-10 h-72 w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.45),transparent_70%)] blur-3xl"
      />

      <div className="mx-auto w-full max-w-7xl px-6 pb-10 pt-14 sm:pt-20 lg:px-8 lg:pb-0">
        <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-6">
          <div className="flex flex-col items-center pt-4 text-center lg:items-start lg:pt-10 lg:text-start">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-1.5 w-12 rounded-full bg-gradient-to-r from-teal-600 to-green-600" />
              <span className="text-sm font-bold tracking-wide text-slate-500">
                {t("eyebrow")}
              </span>
            </div>

            <h1 className="flex flex-col items-center lg:items-start">
              <span className="text-balance text-3xl font-extrabold leading-[1.06] tracking-[-0.035em] text-black sm:text-4xl lg:text-[3.1rem]">
                {t("title")}
              </span>
              <span className="relative mt-4 inline-block pb-4">
                <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 bg-clip-text text-5xl font-black tracking-[-0.03em] text-transparent drop-shadow-[0_10px_30px_rgba(5,150,105,0.25)] sm:text-6xl lg:text-[5.6rem] lg:leading-[0.95]">
                  Zenvika
                </span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 320 20"
                  preserveAspectRatio="none"
                  className="absolute inset-x-0 bottom-1 h-4 w-full"
                >
                  <defs>
                    <linearGradient id="heroSwoosh" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#0d9488" />
                      <stop offset="55%" stopColor="#059669" />
                      <stop offset="100%" stopColor="#16a34a" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M6 13C70 5 138 3 178 6c40 3 92 7 136 11"
                    fill="none"
                    stroke="url(#heroSwoosh)"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-balance text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
              {t("subtitle")}
            </p>

            <ul className="mt-8 grid w-full max-w-md grid-cols-1 gap-x-8 gap-y-3.5 sm:grid-cols-2">
              {bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-center gap-2.5 text-left text-[14.5px] font-semibold text-slate-700"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-50 ring-1 ring-teal-100">
                    <Check className="h-3 w-3 text-teal-700" />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5 lg:justify-start">
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-full border-2 border-zinc-900 bg-white px-8 py-4 text-[15px] font-bold text-zinc-900 shadow-[5px_5px_0_0_rgba(23,23,23,0.9)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-zinc-50 hover:shadow-[3px_3px_0_0_rgba(23,23,23,0.9)]"
              >
                {t("secondaryCta")}
              </a>
              <Link
                href="/pricing"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 px-8 py-4 text-[15px] font-bold text-white shadow-[0_20px_40px_-14px_rgba(5,150,105,0.9)] ring-1 ring-inset ring-white/30 transition-all hover:-translate-y-0.5 hover:shadow-[0_26px_50px_-14px_rgba(5,150,105,1)]"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-full w-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent transition-all duration-700 ease-out group-hover:left-full"
                />
                <span className="relative">{t("cta")}</span>
                <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
              </Link>
            </div>
          </div>

          <div className="relative flex items-end justify-center lg:justify-end">
            <div className="relative lg:-mb-10 xl:-mb-14">
              <div
                aria-hidden="true"
                className="absolute bottom-4 left-1/2 h-12 w-64 -translate-x-1/2 rounded-[50%] bg-slate-500/25 blur-lg"
              />
              <Image
                src="/brands/hero.png"
                alt=""
                width={720}
                height={1024}
                className="relative h-[20rem] w-auto drop-shadow-[0_28px_40px_rgba(15,23,42,0.18)] sm:h-[28rem] lg:h-[34rem] xl:h-[38rem] 2xl:h-[42rem]"
              />

              <div className="absolute top-6 -start-4 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-[0_16px_30px_-10px_rgba(13,148,136,0.7)] sm:-start-8 sm:h-16 sm:w-16">
                <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>

              <div className="absolute top-[36%] end-0 z-20 w-36 rotate-2 rounded-2xl border-2 border-zinc-900 bg-white p-3 shadow-[5px_5px_0_0_rgba(23,23,23,0.9)] sm:-end-3 sm:w-44 lg:-end-4">
                <p className="text-[10px] font-black uppercase tracking-[0.1em] text-zinc-400">
                  {t("mockRevenueLabel")}
                </p>
                <div className="mt-1.5 flex items-end justify-between gap-3">
                  <p className="text-lg font-black tracking-tight text-zinc-900 sm:text-xl">
                    $48,920
                  </p>
                  <div className="flex h-8 items-end gap-1">
                    {revenueBars.map((height, index) => (
                      <span
                        key={index}
                        className="w-1.5 rounded-full bg-gradient-to-t from-teal-600 to-emerald-400"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute bottom-12 -start-4 z-20 flex rotate-3 items-center gap-2 rounded-xl border-2 border-emerald-700 bg-gradient-to-r from-teal-600 to-emerald-600 px-3 py-2 text-[11px] font-bold text-white shadow-[4px_4px_0_0_rgba(6,95,70,0.9)] sm:-start-12 sm:bottom-16 sm:text-[13px]">
                <ShoppingBag className="h-4 w-4" />
                {t("mockChipOrder")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
