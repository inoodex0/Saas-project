'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Check, Gift } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

type Countdown = { days: string; hours: string; minutes: string; seconds: string };

const INITIAL: Countdown = { days: '0', hours: '07', minutes: '12', seconds: '16' };

const TILES = [
  { key: 'days', tile: 'bg-teal-600 h-32 sm:h-40', shift: '' },
  { key: 'hours', tile: 'bg-amber-400 h-40 sm:h-52', shift: '-translate-y-5' },
  { key: 'minutes', tile: 'bg-rose-500 h-32 sm:h-40', shift: '' },
  { key: 'seconds', tile: 'bg-emerald-500 h-24 sm:h-32', shift: 'translate-y-6' },
] as const;

const pad = (value: number, keepZero = false) =>
  keepZero ? String(value) : String(value).padStart(2, '0');

export default function PricingOffer() {
  const t = useTranslations('pricing');
  const [count, setCount] = useState<Countdown>(INITIAL);

  useEffect(() => {
    const end = new Date();
    end.setMonth(end.getMonth() + 1, 1);
    end.setHours(0, 0, 0, 0);

    const tick = () => {
      const diff = Math.max(0, end.getTime() - Date.now());
      setCount({
        days: pad(Math.floor(diff / 86_400_000), true),
        hours: pad(Math.floor(diff / 3_600_000) % 24),
        minutes: pad(Math.floor(diff / 60_000) % 60),
        seconds: pad(Math.floor(diff / 1_000) % 60),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const bullets = t.raw('offer.bullets') as string[];

  return (
    <section className="mx-auto w-full max-w-7xl px-6 pt-10 pb-16 lg:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative overflow-hidden rounded-3xl shadow-[0_30px_60px_-30px_rgba(15,23,42,0.45)]">
          <Image
            src="/screens/desktop.png"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950/85"
          />

          <div className="relative flex flex-col items-center gap-7 px-5 py-10 sm:px-8 sm:py-12">
            <div className="flex w-full max-w-md items-start justify-center gap-2 sm:gap-3">
              {TILES.map(({ key, tile, shift }) => (
                <div
                  key={key}
                  className={`flex flex-1 flex-col items-center justify-center rounded-xl text-white shadow-lg ${tile} ${shift}`}
                >
                  <span className="text-3xl font-black leading-none sm:text-4xl">
                    {count[key as keyof Countdown]}
                  </span>
                  <span className="mt-1.5 text-[10px] font-bold uppercase tracking-wider sm:text-xs">
                    {t(`offer.${key}`)}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-4xl font-black tracking-tight text-white drop-shadow sm:text-5xl">
              {t('offer.amount')}
            </p>

            <Link
              href="/open-store"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 px-7 py-3.5 text-sm font-bold text-white shadow-[0_16px_32px_-14px_rgba(5,150,105,0.9)] ring-1 ring-inset ring-white/25 transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-14px_rgba(5,150,105,1)]"
            >
              <Gift className="h-4 w-4" />
              {t('offer.cta')}
            </Link>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-1 w-10 rounded-full bg-rose-500" />
            <span className="text-sm font-bold text-slate-900">{t('offer.badge')}</span>
          </div>

          <h2 className="mt-5 text-balance text-3xl font-black leading-[1.12] tracking-[-0.03em] text-slate-900 sm:text-4xl">
            {t('offer.titleTop')}
            <br />
            {t('offer.titleBottom')}
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
            {t('offer.description')}
          </p>

          <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" strokeWidth={3} />
                <span className="text-sm font-semibold text-slate-800">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
