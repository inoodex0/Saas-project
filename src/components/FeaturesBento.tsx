'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Globe2, Bot, Coins, Zap, Sparkles, ShieldCheck, Cpu, CheckCircle2 } from 'lucide-react';

const LANGS = [
  { code: 'en', flag: '🇬🇧', label: 'English', dir: 'ltr' },
  { code: 'bn', flag: '🇧🇩', label: 'বাংলা', dir: 'ltr' },
  { code: 'ar', flag: '🇸🇦', label: 'العربية', dir: 'rtl' },
  { code: 'es', flag: '🇪🇸', label: 'Español', dir: 'ltr' },
  { code: 'fr', flag: '🇫🇷', label: 'Français', dir: 'ltr' },
  { code: 'de', flag: '🇩🇪', label: 'Deutsch', dir: 'ltr' },
  { code: 'it', flag: '🇮🇹', label: 'Italiano', dir: 'ltr' },
] as const;

const COPY: Record<string, { name: string; meta: string }> = {
  en: { name: 'Premium Leather Bag', meta: 'In stock • Fast delivery' },
  bn: { name: 'প্রিমিয়াম চামড়ার ব্যাগ', meta: 'স্টকে আছে • দ্রুত ডেলিভারি' },
  ar: { name: 'حقيبة جلدية فاخرة', meta: 'متوفر في المخزون • توصيل سريع' },
  es: { name: 'Bolso de cuero premium', meta: 'Disponible • Envío rápido' },
  fr: { name: 'Sac en cuir premium', meta: 'En stock • Livraison rapide' },
  de: { name: 'Premium-Ledertasche', meta: 'Auf Lager • Schneller Versand' },
  it: { name: 'Borsa in pelle premium', meta: 'Disponibile • Consegna rapida' },
};

const CURRENCIES = [
  { code: 'USD', symbol: '$', rate: 1 },
  { code: 'BDT', symbol: '৳', rate: 120.5 },
  { code: 'EUR', symbol: '€', rate: 0.92 },
  { code: 'SAR', symbol: '﷼', rate: 3.75 },
  { code: 'GBP', symbol: '£', rate: 0.79 },
  { code: 'AED', symbol: 'د.إ', rate: 3.67 },
];

const BARS = [45, 72, 52, 86, 64, 98, 76, 92, 60, 88];

/* Full class strings so Tailwind can detect them. Palette unchanged. */
const THEME = {
  loc: { grad: 'from-teal-500 to-emerald-600', tint: 'from-teal-50 to-white', edge: 'border-teal-400', bar: 'bg-teal-600', text: 'text-teal-700', soft: 'bg-teal-50 ring-teal-200', glow: 'bg-teal-300/50', btn: 'border-teal-600 bg-teal-600 text-white', hov: 'hover:border-teal-300', shadow: 'shadow-teal-500/30' },
  ai: { grad: 'from-amber-400 to-orange-500', tint: 'from-amber-50 to-white', edge: 'border-amber-400', bar: 'bg-amber-500', text: 'text-amber-700', soft: 'bg-amber-50 ring-amber-200', glow: 'bg-amber-300/50', btn: 'border-amber-500 bg-amber-500 text-white', hov: 'hover:border-amber-300', shadow: 'shadow-amber-500/30' },
  cur: { grad: 'from-emerald-500 to-green-600', tint: 'from-emerald-50 to-white', edge: 'border-emerald-400', bar: 'bg-emerald-600', text: 'text-emerald-700', soft: 'bg-emerald-50 ring-emerald-200', glow: 'bg-green-300/50', btn: 'border-emerald-600 bg-emerald-600 text-white', hov: 'hover:border-emerald-300', shadow: 'shadow-emerald-500/30' },
  edge: { grad: 'from-emerald-500 to-teal-600', tint: 'from-emerald-50 to-white', edge: 'border-emerald-400', bar: 'bg-emerald-600', text: 'text-emerald-700', soft: 'bg-emerald-50 ring-emerald-200', glow: 'bg-emerald-300/50', btn: 'border-emerald-600 bg-emerald-600 text-white', hov: 'hover:border-emerald-300', shadow: 'shadow-emerald-500/30' },
} as const;

type Id = keyof typeof THEME;
const ORDER: Id[] = ['loc', 'ai', 'cur', 'edge']; // top layer first
const ICONS = { loc: Globe2, ai: Bot, cur: Coins, edge: Zap };

export default function FeaturesBento() {
  const t = useTranslations('features');
  const reduce = useReducedMotion();
  const [active, setActive] = useState<Id>('loc');
  const [langCode, setLangCode] = useState('ar');
  const [curCode, setCurCode] = useState('BDT');

  const lang = LANGS.find((l) => l.code === langCode)!;
  const copy = COPY[langCode];
  const cur = CURRENCIES.find((c) => c.code === curCode)!;
  const price = Math.round(148 * cur.rate).toLocaleString('en-US');
  const th = THEME[active];
  const activeIdx = ORDER.indexOf(active);

  const TEXT: Record<Id, { title: string; body: string }> = {
    loc: { title: t('localization.title') || 'Native multi-language & bi-directional RTL', body: t('localization.body') || 'Deliver instant localized experiences with subpath routing, automatic IP-based locale detection, and full right-to-left UI mirroring for Arabic and Middle Eastern markets.' },
    ai: { title: t('ai.title') || 'AI Commerce Copilot', body: t('ai.body') || 'Generate high-converting SEO product descriptions, tags, and translate catalogs into 30+ languages automatically.' },
    cur: { title: t('currency.title') || 'Dynamic multi-currency', body: t('currency.body') || 'Show native pricing in 135+ currencies with automated live forex rates and local payment gateways.' },
    edge: { title: t('edge.title') || 'Sub-second global edge infrastructure', body: t('edge.body') || 'Deployed across 320+ edge nodes worldwide with automated inventory locking to eliminate overselling during viral flash sales.' },
  };

  /* What each layer shows on its own face: live state, minimal text */
  const face: Record<Id, React.ReactNode> = {
    loc: (
      <div dir={lang.dir} className="flex h-full flex-col justify-between p-6">
        <span className="text-3xl">{lang.flag}</span>
        <div>
          <p className="text-xl font-bold leading-snug tracking-[-0.02em] text-slate-900">{copy.name}</p>
          <p className="mt-1 text-xs text-slate-500">{copy.meta}</p>
        </div>
      </div>
    ),
    ai: (
      <div className="flex h-full flex-col justify-between p-6">
        <Sparkles className="h-7 w-7 text-amber-500" />
        <div className="space-y-2">
          <div className="h-2 w-full rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-transparent" />
          <div className="h-2 w-4/5 rounded-full bg-amber-200" />
          <div className="h-2 w-3/5 rounded-full bg-amber-100" />
        </div>
      </div>
    ),
    cur: (
      <div className="flex h-full flex-col justify-between p-6">
        <span className="text-xs font-bold text-emerald-700">{cur.code}</span>
        <p dir="ltr" className="text-4xl font-black tabular-nums tracking-[-0.04em] text-slate-900">{cur.symbol}{price}</p>
      </div>
    ),
    edge: (
      <div className="flex h-full flex-col justify-between p-6">
        <p className="text-5xl font-black tabular-nums tracking-[-0.04em] text-slate-900">0.28<span className="text-xl text-emerald-600">s</span></p>
        <div className="flex h-10 items-end gap-1.5">
          {BARS.map((h, i) => (<span key={i} style={{ height: `${h}%` }} className="w-2 rounded-full bg-gradient-to-t from-emerald-400 to-emerald-600" />))}
        </div>
      </div>
    ),
  };

  return (
    <section id="features" className="relative isolate overflow-hidden border-y border-slate-200/80 bg-gradient-to-b from-white via-slate-50/70 to-white py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(rgba(15,23,42,0.06)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,0.6),transparent_80%)]" />
      <div aria-hidden className="pointer-events-none absolute -start-24 top-20 -z-10 h-[30rem] w-[30rem] rounded-full bg-teal-200/35 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute -end-24 top-1/2 -z-10 h-[30rem] w-[30rem] rounded-full bg-green-200/35 blur-[120px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        {/* Copy + controls */}
        <div>
          <h2 className="text-balance text-4xl font-extrabold tracking-[-0.035em] text-slate-900 sm:text-6xl sm:leading-[1.02]">
            {t('title') || 'Four layers.'}{' '}
            <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 bg-clip-text text-transparent">{t('titleAccent') || 'One storefront.'}</span>
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
            {t('subtitle') || 'Select a layer to lift it out of the stack and try it live.'}
          </p>

          <div className="mt-8 flex flex-wrap gap-2" role="tablist">
            {ORDER.map((id) => {
              const Icon = ICONS[id];
              const on = active === id;
              return (
                <button key={id} role="tab" aria-selected={on} onClick={() => setActive(id)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold outline-none transition-all focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 ${on ? `bg-gradient-to-br ${THEME[id].grad} border-transparent text-white shadow-lg ${THEME[id].shadow}` : `border-slate-200 bg-white text-slate-600 ${THEME[id].hov}`}`}>
                  <Icon className="h-4 w-4" />
                  {TEXT[id].title.split(' ').slice(0, 2).join(' ')}
                </button>
              );
            })}
          </div>

          <div className="relative mt-6 min-h-[17rem] rounded-3xl border border-slate-200/90 bg-white/90 p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_48px_-24px_rgba(15,23,42,0.16)] ring-1 ring-inset ring-white">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                <h3 className="text-2xl font-bold tracking-[-0.02em] text-slate-900">{TEXT[active].title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">{TEXT[active].body}</p>

                <div className="mt-6">
                  {active === 'loc' && (
                    <div className="flex flex-wrap gap-2">
                      {LANGS.map((l) => (
                        <button key={l.code} onClick={() => setLangCode(l.code)} aria-pressed={langCode === l.code}
                          className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-1.5 text-xs font-semibold outline-none transition-all focus-visible:ring-2 focus-visible:ring-teal-500 ${langCode === l.code ? THEME.loc.btn : `border-slate-200 bg-slate-50 text-slate-700 ${THEME.loc.hov}`}`}>
                          <span>{l.flag}</span>{l.label}
                          {l.dir === 'rtl' && <span className="rounded bg-black/15 px-1 text-[9px] font-bold leading-4">RTL</span>}
                        </button>
                      ))}
                    </div>
                  )}
                  {active === 'ai' && (
                    <div className="flex flex-wrap gap-2">
                      {['handmade', 'full-grain leather', 'gift-ready', 'carry-on size'].map((tag) => (
                        <span key={tag} className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-200">{tag}</span>
                      ))}
                      <span className="ms-auto text-xs font-semibold tabular-nums text-amber-600">GPT-4o Vision · 0.38s</span>
                    </div>
                  )}
                  {active === 'cur' && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                        {CURRENCIES.map((c) => (
                          <button key={c.code} onClick={() => setCurCode(c.code)} aria-pressed={curCode === c.code}
                            className={`flex flex-col items-center rounded-xl border p-2 outline-none transition-all focus-visible:ring-2 focus-visible:ring-emerald-500 ${curCode === c.code ? 'border-emerald-600 bg-emerald-50 shadow-sm' : `border-slate-200 bg-white ${THEME.cur.hov}`}`}>
                            <span className="text-base font-black text-emerald-700">{c.symbol}</span>
                            <span className="text-[11px] font-bold text-slate-800">{c.code}</span>
                          </button>
                        ))}
                      </div>
                      <p className="text-xs font-semibold tabular-nums text-slate-600">1 USD = {cur.rate.toFixed(2)} {cur.code}</p>
                    </div>
                  )}
                  {active === 'edge' && (
                    <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                      <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5"><Cpu className="h-4 w-4 text-teal-700" />320+ edge PoPs</span>
                      <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-600" />Zero overselling</span>
                      <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5"><ShieldCheck className="h-4 w-4 text-emerald-600" />99.999% SLA</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Exploded layer stack */}
        <div className="relative flex h-[26rem] items-center justify-center sm:h-[34rem]" style={{ perspective: 1600 }}>
          <div aria-hidden className={`absolute h-72 w-72 rounded-full blur-3xl transition-colors duration-700 ${th.glow}`} />
          <div className="origin-center scale-[0.72] sm:scale-100" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(58deg) rotateZ(-38deg) translateZ(-120px)' }}>
            <div className="relative h-72 w-72" style={{ transformStyle: 'preserve-3d' }}>
              {/* floor shadow */}
              <div aria-hidden className="absolute inset-0 rounded-[2rem] bg-slate-900/10 blur-2xl" style={{ transform: 'translateZ(-40px)' }} />
              {ORDER.map((id, i) => {
                const on = active === id;
                const above = i < activeIdx;
                const z = (ORDER.length - 1 - i) * 64 + (above ? 170 : 0) + (on ? 24 : 0);
                return (
                  <motion.button
                    key={id}
                    onClick={() => setActive(id)}
                    aria-label={TEXT[id].title}
                    initial={false}
                    animate={{ z, opacity: on ? 1 : 0.82 }}
                    transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 160, damping: 22 }}
                    className={`absolute inset-0 overflow-hidden rounded-[2rem] border-2 bg-gradient-to-br text-start outline-none transition-[border-color,box-shadow] duration-500 focus-visible:ring-4 focus-visible:ring-slate-900/30 ${THEME[id].tint} ${on ? `${THEME[id].edge} shadow-2xl ${THEME[id].shadow}` : 'border-slate-200 shadow-lg shadow-slate-900/10'}`}
                  >
                    <span className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r transition-opacity duration-500 ${THEME[id].grad} ${on ? 'opacity-100' : 'opacity-40'}`} />
                    {face[id]}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}