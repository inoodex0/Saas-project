import { BadgeCheck, Package, Star } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type { CSSProperties } from 'react';
import Reveal from './Reveal';

const TESTIMONIALS = [
  { name: 'Sarah Ahmed', role: 'Founder, UrbanCart' },
  { name: 'Rashid Al Mansoori', role: 'Owner, Souq Luxe' },
  { name: 'Maria Garcia', role: 'Ops Lead, Belleza Direct' },
  { name: 'James Miller', role: 'CMO, TrailGear' },
  { name: 'Aisha Rahman', role: 'Digital Lead, Casa Verde' },
  { name: 'Tom Becker', role: 'Founder, Nordic Nest' },
] as const;

const STATS = [
  { value: 'ratingValue', label: 'ratingLabel' },
  { value: 'reviewsValue', label: 'reviewsLabel' },
  { value: 'recommendValue', label: 'recommendLabel' },
] as const;

/* Concept: "Parcel tags & shipping labels" on a clean white board.
   Every testimonial is a tag tied to a parcel. The hero is a big shipping label
   with perforated side notches, and the stats become a delivery-tracking timeline.
   No new copy needed, so nothing new to translate. */

const initials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

/* tint = tag paper, accent = top band + tracking dot */
const TAGS = [
  { tint: '#fffaf0', accent: '#f97316' },
  { tint: '#f6e7c8', accent: '#d97706' },
  { tint: '#e0f3ea', accent: '#10b981' },
  { tint: '#fde6da', accent: '#f43f5e' },
  { tint: '#e9ecfd', accent: '#6366f1' },
] as const;

const SWING = [
  '-rotate-[2deg]',
  'rotate-[1.5deg]',
  'rotate-[2.5deg]',
  '-rotate-[1.5deg]',
  'rotate-[1deg]',
] as const;

/* tag silhouette: chamfered top corners */
const tagShape: CSSProperties = {
  clipPath: 'polygon(12% 0, 88% 0, 100% 7%, 100% 100%, 0 100%, 0 7%)',
};

/* label silhouette: half-circle notches punched out of both sides */
const NOTCHES =
  'radial-gradient(circle 12px at 0 50%, #0000 97%, #000), radial-gradient(circle 12px at 100% 50%, #0000 97%, #000)';
const labelShape: CSSProperties = {
  WebkitMask: NOTCHES,
  mask: NOTCHES,
  WebkitMaskComposite: 'source-in',
  maskComposite: 'intersect',
};

const BARCODE =
  'repeating-linear-gradient(90deg, #0f172a 0 2px, transparent 2px 4px, #0f172a 4px 5px, transparent 5px 9px, #0f172a 9px 12px, transparent 12px 14px, #0f172a 14px 15px, transparent 15px 19px)';

function Stars({ size = 'h-3.5 w-3.5' }: { size?: string }) {
  return (
    <div aria-hidden="true" className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, s) => (
        <Star key={s} className={`${size} fill-orange-500 text-orange-500`} />
      ))}
    </div>
  );
}

function Barcode({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`w-full opacity-70 ${className}`}
      style={{ backgroundImage: BARCODE }}
    />
  );
}

function Verified({ label, big }: { label: string; big?: boolean }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-600 font-bold uppercase tracking-wider text-white shadow-[0_4px_10px_rgba(5,150,105,0.3)] ${
        big ? 'px-3 py-1.5 text-[11px]' : 'px-2 py-1 text-[9px]'
      }`}
    >
      <BadgeCheck aria-hidden="true" className={big ? 'h-4 w-4' : 'h-3 w-3'} />
      {label}
    </span>
  );
}

function Avatar({ name, className }: { name: string; className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full bg-slate-900 font-bold text-amber-300 ring-2 ring-white ${className}`}
    >
      {initials(name)}
    </span>
  );
}

/* the little hole + string loop at the top of each tag */
function Hole() {
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute -top-7 left-1/2 z-10 h-10 w-6 -translate-x-1/2 rounded-t-full border-[2.5px] border-b-0 border-amber-800/60"
      />
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-3 z-10 h-4 w-4 -translate-x-1/2 rounded-full bg-white shadow-[inset_0_2px_3px_rgba(15,23,42,0.35)] ring-2 ring-amber-900/20"
      />
    </>
  );
}

export default async function TestimonialsSection() {
  const t = await getTranslations('testimonials');
  const quotes = (t.raw('quotes') as string[]) ?? [];
  const [featured, ...rest] = TESTIMONIALS;
  const verifiedLabel = t('verified');

  return (
    <section id="testimonials" className="relative overflow-hidden bg-white">
      {/* faint blueprint grid, fading out at the edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]"
      />
      {/* soft colour washes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-orange-300/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -start-40 h-[26rem] w-[26rem] rounded-full bg-emerald-300/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[24rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200/25 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8">
        {/* ───────── Hero shipping label ───────── */}
        <div className="mx-auto max-w-4xl">
          <Reveal variant="rise" delay={60}>
          <figure style={{ filter: 'drop-shadow(0 30px 30px rgba(60,40,10,0.22)) drop-shadow(0 2px 2px rgba(60,40,10,0.12))' }}>
            <div className="bg-[#fffaf0] text-slate-900" style={labelShape}>
              <div className="grid md:grid-cols-[1fr_auto]">
                <div className="relative px-8 pb-8 pt-7 sm:px-12">
                  {/* giant watermark quote */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-2 end-6 select-none font-serif text-[9rem] leading-none text-orange-500/10"
                  >
                    &rdquo;
                  </span>

                  <div className="relative flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.25em] text-slate-500">
                    <span className="inline-flex items-center gap-2">
                      <Package aria-hidden="true" className="h-4 w-4 text-orange-600" />
                      TRK-001-{initials(featured.name)}
                    </span>
                    <Stars />
                  </div>

                  <blockquote className="relative mt-6 font-serif text-[26px] leading-[1.25] tracking-tight sm:text-[34px]">
                    <span
                      aria-hidden="true"
                      className="me-1 align-[-0.25em] font-serif text-6xl leading-none text-orange-500"
                    >
                      &ldquo;
                    </span>
                    {quotes[0]}
                    <span aria-hidden="true" className="ms-0.5 text-orange-500">
                      &rdquo;
                    </span>
                  </blockquote>

                  <figcaption className="relative mt-8 flex flex-wrap items-center gap-4">
                    <Avatar name={featured.name} className="h-14 w-14 text-base" />
                    <span className="min-w-0">
                      <span className="block text-base font-bold">{featured.name}</span>
                      <span className="block text-sm text-slate-500">{featured.role}</span>
                    </span>
                    <span className="ms-auto">
                      <Verified label={verifiedLabel} big />
                    </span>
                  </figcaption>

                  <div aria-hidden="true" className="relative mt-7 border-t-2 border-dashed border-slate-900/10 pt-5">
                    <Barcode className="h-6 max-w-[16rem]" />
                  </div>
                </div>

                {/* perforation + tracking timeline (the stats) */}
                <div className="relative border-t-2 border-dashed border-slate-300 bg-[#f8efd9] px-8 py-7 md:w-72 md:border-s-2 md:border-t-0 md:px-9">
                  <ol className="relative space-y-6 md:space-y-8">
                    <span
                      aria-hidden="true"
                      className="absolute bottom-3 start-[7px] top-3 w-0.5 bg-gradient-to-b from-orange-500 via-orange-400 to-emerald-500"
                    />
                    {STATS.map((stat, i) => (
                      <li key={stat.value} className="relative ps-8">
                        <span
                          aria-hidden="true"
                          className={`absolute start-0 top-1.5 h-4 w-4 rounded-full border-[3px] border-[#f8efd9] ${
                            i === STATS.length - 1 ? 'bg-emerald-500' : 'bg-orange-500'
                          } ring-2 ring-slate-900/10`}
                        />
                        <span className="block font-mono text-3xl font-bold tabular-nums leading-none">
                          {t(`stats.${stat.value}`)}
                        </span>
                        <span className="mt-1.5 block text-xs font-medium uppercase tracking-wider text-slate-500">
                          {t(`stats.${stat.label}`)}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </figure>
          </Reveal>
        </div>

        {/* route line from the label down to the tags */}
        <div aria-hidden="true" className="mx-auto mt-10 flex flex-col items-center">
          <Reveal variant="draw" delay={200}>
            <span className="h-14 border-s-2 border-dashed border-slate-400/60" />
          </Reveal>
          <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-500 ring-4 ring-emerald-500/20">
            <span className="h-2 w-2 rounded-full bg-white" />
          </span>
        </div>

        {/* ───────── Hanging parcel tags ───────── */}
        <div className="mt-12 grid gap-x-8 gap-y-14 pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => {
            const tag = TAGS[i % TAGS.length];
            return (
              <div
                key={p.name}
                className={`group relative origin-top transition-transform duration-700 ease-out hover:-translate-y-1 hover:rotate-0 motion-reduce:transition-none ${SWING[i % SWING.length]} ${
                  i % 3 === 1 ? 'lg:mt-10' : ''
                }`}
              >
                <Reveal variant="swing" delay={240 + i * 90}>
                <Hole />
                <figure
                  className="transition-[filter] duration-500 group-hover:[filter:drop-shadow(0_26px_22px_rgba(60,40,10,0.26))]"
                  style={{ filter: 'drop-shadow(0 16px 16px rgba(60,40,10,0.2))' }}
                >
                  <div
                    className="relative px-6 pb-6 pt-12 text-slate-800"
                    style={{ ...tagShape, backgroundColor: tag.tint }}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-2"
                      style={{ backgroundColor: tag.accent }}
                    />

                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: tag.accent }}
                        />
                        TRK-{String(i + 2).padStart(3, '0')}-{initials(p.name)}
                      </span>
                      <Stars size="h-3 w-3" />
                    </div>

                    <blockquote className="mt-4 font-serif text-[17px] leading-7">
                      &ldquo;{quotes[i + 1]}&rdquo;
                    </blockquote>

                    <div aria-hidden="true" className="my-5 border-t-2 border-dashed border-slate-900/15" />

                    <figcaption className="flex flex-wrap items-center gap-x-3 gap-y-2.5">
                      <Avatar name={p.name} className="h-10 w-10 text-xs" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-bold text-slate-900">
                          {p.name}
                        </span>
                        <span className="block truncate text-xs text-slate-500">{p.role}</span>
                      </span>
                    </figcaption>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <Verified label={verifiedLabel} />
                      <Barcode className="h-4 max-w-[5.5rem] opacity-50" />
                    </div>
                  </div>
                </figure>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}