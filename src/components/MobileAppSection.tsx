'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const GRID_STYLE = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
  backgroundSize: '64px 64px',
};

const BALL_BASE =
  'pointer-events-none absolute rounded-full bg-gradient-to-br from-white via-white to-slate-300 shadow-[0_10px_20px_rgba(0,0,0,0.25)]';

export default function MobileAppSection() {
  const t = useTranslations('mobileApp');
  const reduce = useReducedMotion();

  return (
    <section
      id="mobile-app"
      className="relative isolate overflow-hidden bg-gradient-to-br from-teal-800 via-teal-700 to-emerald-800 py-16 sm:py-24"
    >
      {/* Grid lines */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-70" style={GRID_STYLE} />
      {/* Soft glows */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-teal-300/20 blur-3xl" />

      {/* Floating spheres */}
      <span aria-hidden="true" className={`${BALL_BASE} left-[12%] top-[14%] h-4 w-4 animate-drift`} />
      <span aria-hidden="true" className={`${BALL_BASE} right-[18%] top-[24%] h-3 w-3 animate-drift-slow`} />
      <span aria-hidden="true" className={`${BALL_BASE} bottom-[18%] right-[8%] h-14 w-14 animate-drift`} />
      <span aria-hidden="true" className={`${BALL_BASE} bottom-[30%] left-[6%] h-2.5 w-2.5 animate-drift-slow`} />
      <span aria-hidden="true" className={`${BALL_BASE} left-[42%] top-[8%] h-2 w-2 animate-drift`} />

      {/* Corner phones */}
      <Image
        src="/brands/1_w_700.webp"
        alt=""
        aria-hidden="true"
        width={700}
        height={585}
        className="pointer-events-none absolute -right-24 -top-16 -z-[5] w-64 rotate-[18deg] opacity-25 sm:-right-16 sm:w-80 lg:w-[26rem]"
      />
      <Image
        src="/brands/1_w_700.webp"
        alt=""
        aria-hidden="true"
        width={700}
        height={585}
        className="pointer-events-none absolute -bottom-20 -left-28 -z-[5] w-64 -rotate-[16deg] opacity-25 sm:-left-16 sm:w-80 lg:w-[26rem]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-balance text-4xl font-black leading-tight tracking-[-0.02em] text-white sm:text-5xl">
            {t('title')}{' '}
            <span className="inline-block rounded-lg bg-white px-3 pb-1 text-teal-700">{t('titleAccent')}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-balance text-sm leading-relaxed text-white/75 sm:text-base sm:leading-7">
            {t('subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-12 flex justify-center"
        >
          <Image
            src="/brands/1_w_700.webp"
            alt={t('imageAlt')}
            width={700}
            height={585}
            priority={false}
            className="w-full max-w-sm drop-shadow-[0_35px_60px_rgba(0,0,0,0.35)] sm:max-w-lg lg:max-w-xl"
          />
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-12 max-w-xl text-center"
        >
          <p className="text-balance text-sm leading-relaxed text-white/85 sm:text-base">{t('footer')}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#start"
              className="rounded-lg bg-white px-7 py-3.5 text-sm font-bold text-teal-700 shadow-lg shadow-teal-950/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-50"
            >
              {t('ctaPrimary')}
            </a>
            <a
              href="#how-it-works"
              className="rounded-lg border-2 border-white/70 px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
            >
              {t('ctaSecondary')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
