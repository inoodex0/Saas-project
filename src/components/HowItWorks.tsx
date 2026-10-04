'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Route } from 'lucide-react';

const TONES = [
  { box: 'from-teal-700 to-teal-500', halo: 'bg-teal-300/60', shadow: 'shadow-teal-600/40', hover: 'hover:border-teal-300', dot: 'bg-teal-500' },
  { box: 'from-teal-700 to-emerald-600', halo: 'bg-teal-300/60', shadow: 'shadow-teal-600/40', hover: 'hover:border-teal-300', dot: 'bg-teal-600' },
  { box: 'from-emerald-700 to-green-600', halo: 'bg-emerald-300/60', shadow: 'shadow-emerald-600/40', hover: 'hover:border-emerald-300', dot: 'bg-emerald-600' },
  { box: 'from-green-700 to-green-500', halo: 'bg-green-300/60', shadow: 'shadow-green-600/40', hover: 'hover:border-green-300', dot: 'bg-green-600' },
];

/* Compact geometry — smaller rows, tighter turns */
const DESKTOP = { W: 1000, ROW: 175, RIGHT_X: 660, LEFT_X: 340 };
const MOBILE = { W: 360, ROW: 245, RIGHT_X: 240, LEFT_X: 120 };

const BLUE = '#0f766e';
const SKY = 'url(#hiw-g-sky)';
const INDIGO = 'url(#hiw-g-indigo)';
const VIOLET = 'url(#hiw-g-violet)';
const AMBER = 'url(#hiw-g-amber)';
const INK = '#e2e8f0';

function Illustration({ i, className }: { i: number; className: string }) {
  const common = { viewBox: '0 0 64 64', className, fill: 'none', 'aria-hidden': true } as const;
  switch (i % 6) {
    case 0:
      return (
        <svg {...common}>
          <rect x="8" y="10" width="48" height="28" rx="5" fill="#fff" stroke={BLUE} strokeWidth="2.5" />
          <rect x="16" y="26" width="6" height="8" rx="1.5" fill={SKY} />
          <rect x="26" y="20" width="6" height="14" rx="1.5" fill={INDIGO} />
          <rect x="36" y="23" width="6" height="11" rx="1.5" fill={SKY} />
          <circle cx="48" cy="19" r="2.5" fill={AMBER} />
          <circle cx="20" cy="49" r="5" fill={BLUE} />
          <path d="M11 62c0-6 4-9 9-9s9 3 9 9" fill={SKY} stroke={BLUE} strokeWidth="2" />
          <circle cx="44" cy="49" r="5" fill={INDIGO} />
          <path d="M35 62c0-6 4-9 9-9s9 3 9 9" fill={INK} stroke={BLUE} strokeWidth="2" />
        </svg>
      );
    case 1:
      return (
        <svg {...common}>
          <rect x="13" y="9" width="38" height="49" rx="7" fill="#fff" stroke={BLUE} strokeWidth="2.5" />
          <rect x="24" y="5" width="16" height="9" rx="3" fill={INDIGO} />
          <circle cx="23" cy="26" r="3.5" fill={AMBER} />
          <rect x="31" y="24" width="14" height="4" rx="2" fill={SKY} />
          <circle cx="23" cy="38" r="3.5" fill={AMBER} />
          <rect x="31" y="36" width="14" height="4" rx="2" fill={SKY} />
          <rect x="20" y="47" width="24" height="4" rx="2" fill={INK} />
        </svg>
      );
    case 2:
      return (
        <svg {...common}>
          <rect x="6" y="12" width="52" height="40" rx="6" fill="#fff" stroke={BLUE} strokeWidth="2.5" />
          <path d="M6 22h52" stroke={BLUE} strokeWidth="2.5" />
          <circle cx="13" cy="17" r="1.8" fill={AMBER} />
          <circle cx="19" cy="17" r="1.8" fill={SKY} />
          <rect x="12" y="28" width="22" height="16" rx="3" fill={SKY} />
          <path d="M12 44l7-8 5 5 4-4 6 7z" fill={INDIGO} />
          <circle cx="29" cy="33" r="2.5" fill={AMBER} />
          <rect x="40" y="29" width="12" height="3.5" rx="1.75" fill={INK} />
          <rect x="40" y="36" width="9" height="3.5" rx="1.75" fill={INK} />
        </svg>
      );
    case 3:
      return (
        <svg {...common}>
          <circle cx="32" cy="32" r="22" fill="#fff" stroke={BLUE} strokeWidth="2.5" />
          <circle cx="32" cy="32" r="14" fill={SKY} stroke={BLUE} strokeWidth="2.5" />
          <circle cx="32" cy="32" r="6" fill={VIOLET} />
          <path d="M10 22l-6 10 6 10M54 22l6 10-6 10" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 4:
      return (
        <svg {...common}>
          <rect x="6" y="14" width="46" height="34" rx="6" fill="#fff" stroke={BLUE} strokeWidth="2.5" />
          <path d="M6 24h46" stroke={BLUE} strokeWidth="2.5" />
          <rect x="13" y="30" width="20" height="12" rx="3" fill={SKY} />
          <circle cx="47" cy="45" r="13" fill={VIOLET} stroke="#fff" strokeWidth="3" />
          <path d="M41 45l4.5 4.5L53 41" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="19" r="1.8" fill={AMBER} />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M13 36a19 19 0 0 1 38 0" stroke={BLUE} strokeWidth="3" strokeLinecap="round" />
          <rect x="8" y="34" width="9" height="15" rx="4.5" fill={INDIGO} />
          <rect x="47" y="34" width="9" height="15" rx="4.5" fill={INDIGO} />
          <path d="M51 49c0 7-7 9-15 9" stroke={BLUE} strokeWidth="3" strokeLinecap="round" />
          <circle cx="34" cy="58" r="3" fill={AMBER} />
          <text x="32" y="38" textAnchor="middle" fontSize="12" fontWeight="800" fill={BLUE}>24/7</text>
        </svg>
      );
  }
}

type Step = { step: string; title: string; body: string };

function Stage({ steps, compact }: { steps: Step[]; compact: boolean }) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, '');
  const { W, ROW, RIGHT_X, LEFT_X } = compact ? MOBILE : DESKTOP;
  const k = compact ? 0.65 : 0.85; // stroke / tip scale (was 0.75/1)

  const stageRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const marks = useRef<number[]>([]);
  const tipX = useMotionValue(0);
  const tipY = useMotionValue(0);
  const [reached, setReached] = useState(0);

  const { scrollYProgress } = useScroll({ target: stageRef, offset: ['start 75%', 'end 55%'] });
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.6 });

  const n = steps.length;
  const H = n * ROW;
  const capR = compact ? 12 : 15; // smaller cap
  const pts = steps.map((_, i) => ({ x: i % 2 === 0 ? RIGHT_X : LEFT_X, y: ROW * i + ROW / 2 }));
  const tone = (i: number) => TONES[Math.min(TONES.length - 1, Math.floor((i * TONES.length) / n))];

  let d = `M ${pts[0].x} 0 L ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < n; i++) {
    const p = pts[i - 1];
    const c = pts[i];
    d += ` C ${p.x} ${p.y + ROW * 0.85}, ${c.x} ${c.y - ROW * 0.85}, ${c.x} ${c.y}`;
  }
  d += ` L ${pts[n - 1].x} ${H - capR - 4}`;

  const update = (v: number) => {
    const p = pathRef.current;
    if (!p) return;
    try {
      const len = p.getTotalLength();
      if (!len) return;
      const pt = p.getPointAtLength(v * len);
      tipX.set(pt.x);
      tipY.set(pt.y);
      setReached(marks.current.filter((m) => v >= m - 0.01).length);
    } catch {
      /* element not rendered */
    }
  };
  useMotionValueEvent(draw, 'change', update);
  useEffect(() => {
    const p = pathRef.current;
    if (!p) return;
    try {
      const len = p.getTotalLength();
      if (!len) return;
      marks.current = pts.map((pt) => {
        for (let s = 0; s <= 600; s++) if (p.getPointAtLength((s / 600) * len).y >= pt.y) return s / 600;
        return 1;
      });
      update(draw.get());
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [d]);

  const done = reduce ? n : reached;
  const complete = done >= n;
  const endX = pts[n - 1].x;

  return (
    <div ref={stageRef} className="relative mx-auto max-w-4xl" style={{ aspectRatio: `${W} / ${H}` }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id={`${uid}-line`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={H}>
            <stop offset="0%" stopColor="#0f766e" />
            <stop offset="55%" stopColor="#059669" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
          <filter id={`${uid}-glow`} x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation={5 * k} /></filter>
          <radialGradient id={`${uid}-tip`}>
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path ref={pathRef} d={d} fill="none" stroke="#dbeafe" strokeWidth={16 * k} strokeLinecap="round" opacity="0.7" />
        <path d={d} fill="none" stroke="#93c5fd" strokeWidth={2.4 * k} strokeLinecap="round" strokeDasharray={`${2 * k} ${10 * k}`} />
        <motion.path d={d} fill="none" stroke={`url(#${uid}-line)`} strokeWidth={11 * k} strokeLinecap="round" filter={`url(#${uid}-glow)`} opacity="0.35" style={{ pathLength: reduce ? 1 : draw }} />
        <motion.path d={d} fill="none" stroke={`url(#${uid}-line)`} strokeWidth={7 * k} strokeLinecap="round" style={{ pathLength: reduce ? 1 : draw }} />
        <motion.path d={d} fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth={1.6 * k} strokeLinecap="round" transform="translate(-1.5 0)" style={{ pathLength: reduce ? 1 : draw }} />

        {complete && !reduce && (
          <circle cx={endX} cy={H - 4} r={capR} fill="none" stroke="#16a34a" strokeWidth="2.5" className="animate-ping" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
        )}
        <circle cx={endX} cy={H - 4} r={capR} fill={complete ? '#16a34a' : '#fff'} stroke="#16a34a" strokeWidth={3 * k} style={{ transition: 'fill .6s' }} />
        <path d={`M ${endX - 6 * k * 1.1} ${H - 4} l ${4.5 * k * 1.1} ${4.5 * k * 1.1} l ${8.5 * k * 1.1} ${-9 * k * 1.1}`} fill="none" stroke={complete ? '#fff' : '#c4b5fd'} strokeWidth={3 * k} strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke .6s' }} />

        {!reduce && (
          <>
            <motion.circle r={22 * k} fill={`url(#${uid}-tip)`} style={{ cx: tipX, cy: tipY }} />
            <motion.circle r={7.5 * k} fill="#fff" stroke="#059669" strokeWidth={3 * k} style={{ cx: tipX, cy: tipY }} />
          </>
        )}
      </svg>

      {steps.map((s, i) => {
        const onRight = i % 2 === 0;
        const c = tone(i);
        const on = i < done;
        const current = i === done - 1 && !reduce;
        return (
          <motion.div
            key={s.step}
            initial={reduce ? false : { opacity: 0, y: 20, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${(pts[i].x / W) * 100}%`, top: `${(pts[i].y / H) * 100}%` }}
          >
            <div className={`group relative transition-[opacity,filter] duration-700 ${on ? 'opacity-100' : 'opacity-60 saturate-[0.35]'}`}>
              {/* illustration */}
              <div className={`absolute ${compact ? `-top-[3.75rem] ${onRight ? '-left-2.5' : '-right-2.5'}` : `-top-[5rem] ${onRight ? '-left-4' : '-right-4'}`}`}>
                <div aria-hidden="true" className={`absolute inset-0 -z-10 scale-125 rounded-[1.5rem] blur-2xl transition-opacity duration-700 ${c.halo} ${on ? 'opacity-100' : 'opacity-0'}`} />
                <div className={`flex items-center justify-center border border-white bg-gradient-to-b from-white to-slate-50 shadow-[0_12px_26px_-10px_rgba(13,148,136,0.35)] ring-1 ring-slate-200/80 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-2 ${compact ? 'h-13 w-13 rounded-2xl' : 'h-[4.5rem] w-[4.5rem] rounded-[1.5rem]'}`}>
                  <motion.div
                    animate={on && !reduce ? { y: [0, -3, 0] } : { y: 0 }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                  >
                    <Illustration i={i} className={compact ? 'h-8 w-8' : 'h-11 w-11'} />
                  </motion.div>
                </div>
              </div>

              {/* box — smaller */}
              <div className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br text-center shadow-lg ring-1 ring-inset ring-white/20 transition-transform duration-500 group-hover:-translate-y-1 ${c.box} ${c.shadow} ${compact ? 'min-h-[3.75rem] w-[8.25rem] rounded-2xl px-4 py-2.5' : 'min-h-[4rem] w-44 rounded-[18px] px-6 py-3'}`}>
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent" />
                <span aria-hidden="true" className={`pointer-events-none absolute -bottom-3 -end-1 select-none font-black leading-none text-white/10 ${compact ? 'text-4xl' : 'text-5xl'}`}>{s.step}</span>
                <span className={`relative text-balance font-bold leading-snug tracking-[-0.01em] text-white ${compact ? 'text-[13px]' : 'text-sm'}`}>{s.title}</span>
              </div>

              {/* badge — smaller */}
              <span className={`absolute ${compact ? '-start-2.5 -top-2.5' : '-start-3 -top-3'}`}>
                {current && <span aria-hidden="true" className="absolute inset-0 rounded-full bg-orange-400/70 motion-safe:animate-ping" />}
                <span className={`relative flex items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-orange-500 font-extrabold text-white shadow-lg shadow-orange-500/40 ring-[3px] ring-white ${compact ? 'h-7 w-7 text-[11px]' : 'h-8 w-8 text-xs'}`}>{s.step}</span>
              </span>

              {/* description — tighter */}
              {compact ? (
                <div className="absolute left-1/2 top-full flex w-[11rem] -translate-x-1/2 flex-col items-center">
                  <span aria-hidden="true" className="flex h-3 flex-col items-center">
                    <span className="w-px flex-1 border-l border-dashed border-slate-300" />
                    <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
                  </span>
                  <p className={`w-full rounded-xl border border-slate-200/80 bg-white/90 px-3 py-2 text-center text-[11px] leading-relaxed text-slate-600 shadow-[0_4px_14px_-8px_rgba(15,23,42,0.18)] backdrop-blur-md ${c.hover}`}>{s.body}</p>
                </div>
              ) : (
                <div className={`absolute top-1/2 flex w-[14rem] -translate-y-1/2 items-center ${onRight ? 'left-full' : 'right-full flex-row-reverse'}`}>
                  <span aria-hidden="true" className="flex w-5 shrink-0 items-center">
                    <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${c.dot}`} />
                    <span className="h-px flex-1 border-t border-dashed border-slate-300" />
                  </span>
                  <p className={`relative w-48 rounded-xl border border-slate-200/80 bg-white/85 px-3.5 py-2.5 text-xs leading-relaxed text-slate-600 shadow-[0_4px_14px_-8px_rgba(15,23,42,0.18)] backdrop-blur-md transition-colors duration-300 ${c.hover} ${onRight ? 'text-start' : 'text-end'}`}>
                    <span aria-hidden="true" className={`absolute inset-y-2.5 w-0.5 rounded-full bg-gradient-to-b ${c.box} ${onRight ? 'start-1.5' : 'end-1.5'}`} />
                    {s.body}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function HowItWorks() {
  const t = useTranslations('howItWorks');
  const reduce = useReducedMotion();
  const steps = t.raw('steps') as Step[];

  return (
    <section
      id="how-it-works"
      className="relative isolate overflow-hidden border-y border-slate-200/80 bg-gradient-to-b from-white via-slate-50/50 to-white py-12 sm:py-16"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(rgba(15,23,42,0.06)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,0.6),transparent_80%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -start-24 top-10 -z-10 h-72 w-72 rounded-full bg-gradient-to-br from-teal-200/35 via-emerald-200/25 to-transparent blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -end-24 bottom-10 -z-10 h-72 w-72 rounded-full bg-gradient-to-tl from-green-200/35 via-sky-200/25 to-transparent blur-3xl" />

      {/* shared gradients */}
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <defs>
          {[
            ['sky', '#dbeafe', '#93c5fd'],
            ['indigo', '#34d399', '#059669'],
            ['violet', '#4ade80', '#16a34a'],
            ['amber', '#fcd34d', '#f97316'],
          ].map(([id, a, b]) => (
            <linearGradient key={id} id={`hiw-g-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={a} />
              <stop offset="100%" stopColor={b} />
            </linearGradient>
          ))}
        </defs>
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header — tighter */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.div initial={reduce ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200/90 bg-white/95 px-3.5 py-1 text-[11px] font-bold tracking-wide text-teal-700 shadow-[0_2px_12px_rgba(13,148,136,0.08)] backdrop-blur-md">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal-600" />
              </span>
              <Route className="h-3.5 w-3.5 shrink-0 text-teal-700" />
              <span className="text-balance">{t('badge')}</span>
            </div>
          </motion.div>

          <motion.h2 initial={reduce ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.08 }}
            className="mx-auto mt-4 max-w-2xl text-balance text-2xl font-extrabold leading-tight tracking-[-0.03em] text-slate-900 sm:text-4xl">
            {t('title')}{' '}
            <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 bg-clip-text text-transparent">{t('titleAccent')}</span>
          </motion.h2>
        </div>

        {/* Desktop */}
        <div className="mt-12 hidden lg:block">
          <Stage steps={steps} compact={false} />
        </div>
        {/* Mobile */}
        <div className="mx-auto mb-4 mt-10 max-w-md lg:hidden">
          <Stage steps={steps} compact />
        </div>
      </div>
    </section>
  );
}