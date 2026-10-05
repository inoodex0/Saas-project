'use client';

import {
  Check, ChevronDown, ExternalLink, Eye, Gem, Home, LayoutGrid, Leaf, Shirt, ShoppingBag, Sofa,
  Sparkles, Stethoscope, Store,
  type LucideIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState, type CSSProperties, type ReactNode } from 'react';
import { Link } from '@/i18n/navigation';

const CATEGORIES = [
  'all',
  'organic',
  'cosmetic',
  'furniture',
  'fashion',
  'medical',
  'jewelry',
  'marketplace',
  'houseware',
  'ecommerce',
] as const;

type Cat = (typeof CATEGORIES)[number];

type Palette = {
  page: string;
  head: string;
  accent: string;
  hero: string;
  card: string;
};

type Theme = {
  id: string;
  name: string;
  cat: Exclude<Cat, 'all'>;
  layout: 'classic' | 'hero' | 'sidebar' | 'app';
  pal: Palette;
  img?: string;
  demo?: string;
};

/* img defaults to /demo/<id in lowercase>.png (put screenshots in /public/demo).
   Add `demo: 'https://…'` to any theme to point its links at the live site. */
const THEMES: Theme[] = [
  { id: 'organic-one', name: 'Organic One', cat: 'organic', layout: 'classic', pal: { page: '#e8f5e9', head: '#2e7d32', accent: '#66bb6a', hero: 'linear-gradient(135deg,#a5d6a7,#e8f5e9)', card: '#c8e6c9' } },
  { id: 'organic-two', name: 'Organic Two', cat: 'organic', layout: 'hero', pal: { page: '#f1f8e9', head: '#33691e', accent: '#7cb342', hero: 'linear-gradient(135deg,#dcedc8,#f9fbe7)', card: '#e6ee9c' } },
  { id: 'organic-three', name: 'Organic Three', cat: 'organic', layout: 'sidebar', pal: { page: '#fff3e0', head: '#bf360c', accent: '#ff7043', hero: 'linear-gradient(135deg,#ffe0b2,#fff8e1)', card: '#ffcc80' } },
  { id: 'cosmetic-glow', name: 'Cosmetic Glow', cat: 'cosmetic', layout: 'classic', pal: { page: '#fce4ec', head: '#ad1457', accent: '#ec407a', hero: 'linear-gradient(135deg,#f8bbd0,#fce4ec)', card: '#f48fb1' } },
  { id: 'fashion-forward', name: 'Fashion Forward', cat: 'fashion', layout: 'hero', pal: { page: '#f3e5f5', head: '#4a148c', accent: '#ab47bc', hero: 'linear-gradient(135deg,#e1bee7,#f3e5f5)', card: '#ce93d8' } },
  { id: 'medical-care', name: 'Medical Care', cat: 'medical', layout: 'sidebar', pal: { page: '#e1f5fe', head: '#01579b', accent: '#29b6f6', hero: 'linear-gradient(135deg,#b3e5fc,#e1f5fe)', card: '#81d4fa' } },
  { id: 'jewelry-lux', name: 'Jewelry Lux', cat: 'jewelry', layout: 'classic', pal: { page: '#fffde7', head: '#3e2723', accent: '#ffb300', hero: 'linear-gradient(135deg,#fff8e1,#fffde7)', card: '#ffe082' } },
  { id: 'market-central', name: 'Market Central', cat: 'marketplace', layout: 'sidebar', pal: { page: '#e0f2f1', head: '#004d40', accent: '#26a69a', hero: 'linear-gradient(135deg,#b2dfdb,#e0f2f1)', card: '#80cbc4' } },
  { id: 'Ecommerce-fly', name: 'Ecommerce Fly', cat: 'ecommerce', layout: 'classic', pal: { page: '#f1f8e9', head: '#1b5e20', accent: '#8bc34a', hero: 'linear-gradient(135deg,#dcedc8,#f1f8e9)', card: '#c5e1a5' } },
  { id: 'accessories-store', name: 'Accessories Store', cat: 'ecommerce', layout: 'classic', pal: { page: '#fdf2f8', head: '#9d174d', accent: '#ec4899', hero: 'linear-gradient(135deg,#fbcfe8,#fdf2f8)', card: '#f9a8d4' }, img: '/demo/accessories.png', demo: 'https://e-commerce-inoodex.vercel.app/' },
  { id: 'cloth-store', name: 'Cloth Store', cat: 'ecommerce', layout: 'classic', pal: { page: '#eff6ff', head: '#1e3a8a', accent: '#3b82f6', hero: 'linear-gradient(135deg,#bfdbfe,#eff6ff)', card: '#93c5fd' }, img: '/demo/cloth.png', demo: 'https://cloth-ecommerce-rho.vercel.app/' },
];

/* categories that actually have themes (empty ones stay hidden) */
const ACTIVE_CATEGORIES = CATEGORIES.filter(
  (c) => c === 'all' || THEMES.some((th) => th.cat === c),
);

/* ───────────── Mini storefront mock pieces ───────────── */

function Strip({ pal, white }: { pal: Palette; white?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-1.5 px-2 py-1.5"
      style={{ background: white ? '#ffffff' : pal.head }}
    >
      <span className="h-3 w-3 shrink-0 rounded-[4px]" style={{ background: pal.accent }} />
      <span className={`h-1.5 w-7 rounded-full ${white ? 'bg-slate-300' : 'bg-white/70'}`} />
      <span className={`hidden h-1.5 w-5 rounded-full sm:block ${white ? 'bg-slate-200' : 'bg-white/45'}`} />
      <span className={`hidden h-1.5 w-5 rounded-full sm:block ${white ? 'bg-slate-200' : 'bg-white/45'}`} />
      <span
        className="ms-auto h-3.5 w-8 shrink-0 rounded-full sm:w-10"
        style={{ background: white ? '#f1f5f9' : 'rgba(255,255,255,0.25)' }}
      />
    </div>
  );
}

function HeroBlock({ pal, tall }: { pal: Palette; tall?: boolean }) {
  return (
    <div
      className={`relative shrink-0 px-2.5 sm:px-3 ${tall ? 'py-3 sm:py-4' : 'py-2 sm:py-3'}`}
      style={{ background: pal.hero }}
    >
      <span className="block h-2 w-1/2 rounded-full bg-slate-800/75" />
      <span className="mt-1 block h-1.5 w-1/3 rounded-full bg-slate-500/50" />
      <span className="mt-1.5 block h-3 w-12 rounded-full" style={{ background: pal.accent }} />
      <span className="absolute end-2 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full bg-white/50 sm:h-10 sm:w-10" />
      <span className="absolute end-4 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 rounded-[3px] bg-white/70 sm:h-4 sm:w-4" />
    </div>
  );
}

function ProductRow({ pal }: { pal: Palette }) {
  return (
    <div className="grid min-h-0 flex-1 grid-cols-4 gap-1.5 bg-white p-1.5 sm:p-2">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="flex min-h-0 flex-col gap-1">
          <span
            className="min-h-0 flex-1 rounded-md"
            style={{ background: pal.card, opacity: 0.55 + (i % 2) * 0.25 }}
          />
          <span className="h-1 w-3/4 rounded-full bg-slate-300" />
          <span className="h-1 w-1/3 rounded-full bg-slate-200" />
        </div>
      ))}
    </div>
  );
}

const imgSrc = (theme: Theme) => theme.img ?? `/demo/${theme.id.toLowerCase()}.png`;

function Thumb({ theme }: { theme: Theme }) {
  const { pal } = theme;
  const [failed, setFailed] = useState(false);

  /* every theme shows its screenshot; if the file is missing, the drawn mock stands in */
  if (!failed) {
    return (
      <div className="relative h-full w-full bg-white">
        <Image
          src={imgSrc(theme)}
          alt={theme.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          onError={() => setFailed(true)}
          className="object-cover object-top transition-[object-position] duration-[1400ms] ease-out group-hover:object-[50%_35%] motion-reduce:transition-none"
        />
      </div>
    );
  }

  if (theme.layout === 'app') {
    return (
      <div className="flex h-full w-full items-center justify-center" style={{ background: pal.page }}>
        <div className="h-[86%] w-[46%] max-w-[110px] rounded-xl bg-slate-900 p-[3px] shadow-lg">
          <div className="flex h-full w-full flex-col overflow-hidden rounded-[9px] bg-white">
            <div className="flex items-center justify-center py-1" style={{ background: pal.head }}>
              <span className="h-1.5 w-6 rounded-full bg-white/70" />
            </div>
            <div className="flex items-center justify-center px-2 py-2" style={{ background: pal.hero }}>
              <span className="h-2 w-2/3 rounded-full bg-slate-700/70" />
            </div>
            <div className="grid flex-1 grid-cols-2 gap-1 p-1.5">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="rounded-[4px]"
                  style={{ background: pal.card, opacity: 0.55 + (i % 2) * 0.25 }}
                />
              ))}
            </div>
            <div className="flex justify-center pb-1.5">
              <span className="h-1 w-10 rounded-full bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full p-3 sm:p-4" style={{ background: pal.page }}>
      <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-[0_10px_24px_-12px_rgba(15,23,42,0.35)] ring-1 ring-black/5">
        {theme.layout === 'sidebar' ? (
          <div className="flex min-h-0 flex-1">
            <div className="flex w-7 shrink-0 flex-col gap-1.5 border-e border-slate-100 bg-white px-1.5 py-2 sm:w-9">
              <span className="h-1.5 w-4 rounded-full sm:w-5" style={{ background: pal.accent }} />
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <span key={i} className="h-1 w-full rounded-full bg-slate-200" />
              ))}
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <Strip pal={pal} white />
              <HeroBlock pal={pal} />
              <ProductRow pal={pal} />
            </div>
          </div>
        ) : (
          <>
            <Strip pal={pal} white={theme.layout === 'hero'} />
            <HeroBlock pal={pal} tall={theme.layout === 'hero'} />
            <ProductRow pal={pal} />
          </>
        )}
      </div>
    </div>
  );
}

/* ───────────── Shopfront design ─────────────
   Each theme is a little shop: a scalloped awning in its own colours,
   a display window showing the storefront, and a sign with the name.
   The filter is a row of small awnings that turn from grey to colour
   when you pick one. */

function awning(head: string, light: string, w: number): CSSProperties {
  const r = w / 2;
  const mask = `radial-gradient(circle at ${r}px calc(100% - ${r}px), #000 ${r}px, transparent ${r + 0.5}px) 0 0 / ${w}px 100% repeat-x, linear-gradient(#000 0 0) 0 0 / 100% calc(100% - ${r}px) no-repeat`;
  return {
    background: `repeating-linear-gradient(90deg, ${head} 0 ${w}px, ${light} ${w}px ${w * 2}px)`,
    WebkitMask: mask,
    mask,
  };
}

const CAT_ICON: Record<Cat, LucideIcon> = {
  all: LayoutGrid,
  organic: Leaf,
  cosmetic: Sparkles,
  furniture: Sofa,
  fashion: Shirt,
  medical: Stethoscope,
  jewelry: Gem,
  marketplace: Store,
  houseware: Home,
  ecommerce: ShoppingBag,
};

/* each category borrows the awning colours of its first theme */
function tone(cat: Cat) {
  const th = THEMES.find((x) => x.cat === cat);
  return th
    ? { head: th.pal.head, light: th.pal.card }
    : { head: '#0f172a', light: '#5eead4' };
}

/* one link component for every "open the demo" target */
function DemoLink({
  theme, className, style, label, children,
}: {
  theme: Theme; className?: string; style?: CSSProperties; label?: string; children: ReactNode;
}) {
  return theme.demo ? (
    <a href={theme.demo} target="_blank" rel="noopener noreferrer" aria-label={label} className={className} style={style}>
      {children}
    </a>
  ) : (
    <Link href="/" aria-label={label} className={className} style={style}>
      {children}
    </Link>
  );
}

/* ───────────── Gallery ───────────── */

export default function ThemeGallery() {
  const t = useTranslations('features.gallery');
  const tn = useTranslations('nav');
  const [filter, setFilter] = useState<Cat>('all');
  const [filterOpen, setFilterOpen] = useState(false);

  const visible = filter === 'all' ? THEMES : THEMES.filter((theme) => theme.cat === filter);

  const focusRing =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-[#e9edf1]';

  return (
    <section className="relative bg-[#e9edf1]">
      <style>{`@keyframes tg-rise{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}`}</style>

      <div className="mx-auto w-full max-w-7xl px-5 pb-14 pt-8 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8">
        {/* ── Filter (mobile / tablet): dropdown ── */}
        <div className="relative lg:hidden">
          <button
            type="button"
            onClick={() => setFilterOpen((o) => !o)}
            aria-expanded={filterOpen}
            aria-haspopup="true"
            aria-label={t('categoriesLabel')}
            className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border bg-white px-4 py-3 text-sm shadow-sm transition-colors ${
              filterOpen ? 'border-teal-500' : 'border-slate-300 hover:border-slate-400'
            } ${focusRing}`}
          >
            <span className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="block h-[13px] w-9 rounded-t-[4px]"
                style={{
                  ...awning(tone(filter).head, tone(filter).light, 7),
                  filter: 'drop-shadow(0 2px 1px rgba(15,23,42,0.18))',
                }}
              />
              <span className="font-semibold text-slate-900">
                {t(`categories.${filter}`)}
              </span>
              <sup className="text-[11px] font-semibold tabular-nums text-slate-400">
                {filter === 'all'
                  ? THEMES.length
                  : THEMES.filter((x) => x.cat === filter).length}
              </sup>
            </span>
            <ChevronDown
              aria-hidden="true"
              className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${
                filterOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {filterOpen && (
            <>
              <div
                aria-hidden="true"
                className="fixed inset-0 z-20 bg-slate-900/10"
                onClick={() => setFilterOpen(false)}
              />
              <div
                role="group"
                aria-label={t('categoriesLabel')}
                className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl"
              >
                {ACTIVE_CATEGORIES.map((cat) => {
                  const active = filter === cat;
                  const c = tone(cat);
                  const count =
                    cat === 'all'
                      ? THEMES.length
                      : THEMES.filter((x) => x.cat === cat).length;

                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setFilter(cat);
                        setFilterOpen(false);
                      }}
                      aria-pressed={active}
                      className={`flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-sm transition-colors ${
                        active
                          ? 'bg-teal-50 font-semibold text-slate-900'
                          : 'font-medium text-slate-600 hover:bg-slate-50'
                      } ${focusRing}`}
                    >
                      <span
                        aria-hidden="true"
                        className={`block h-[13px] w-9 shrink-0 rounded-t-[4px] ${
                          active ? '' : 'opacity-60 grayscale'
                        }`}
                        style={awning(c.head, c.light, 7)}
                      />
                      <span className="flex-1 text-start">
                        {t(`categories.${cat}`)}
                      </span>
                      <sup className="text-[10px] font-semibold tabular-nums text-slate-400">
                        {count}
                      </sup>
                      {active && (
                        <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-teal-600" />
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* ── Filter (desktop): a street of little awnings ── */}
        <div
          role="group"
          aria-label={t('categoriesLabel')}
          className="hidden pb-2 pt-1 lg:flex lg:flex-wrap lg:gap-x-4 lg:gap-y-5"
        >
        {ACTIVE_CATEGORIES.map((cat) => {
          const active = filter === cat;
          const c = tone(cat);
          const count =
            cat === 'all' ? THEMES.length : THEMES.filter((x) => x.cat === cat).length;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              aria-pressed={active}
              className={`group/cat flex w-[84px] shrink-0 cursor-pointer flex-col items-center gap-2 rounded-lg pb-1 ${focusRing}`}
            >
                <span
                  className="block w-full transition-transform duration-300 group-hover/cat:translate-y-0.5"
                  style={{ filter: 'drop-shadow(0 3px 2px rgba(15,23,42,0.2))' }}
                >
                  <span
                    className={`block h-[22px] w-full rounded-t-md transition-[filter,opacity] duration-300 ${
                      active
                        ? ''
                        : 'opacity-60 grayscale group-hover/cat:opacity-100 group-hover/cat:grayscale-0'
                    }`}
                    style={awning(c.head, c.light, 14)}
                  />
                </span>
                <span
                  className={`flex items-baseline gap-1 text-[13px] transition-colors ${
                    active
                      ? 'font-semibold text-slate-900'
                      : 'font-medium text-slate-500 group-hover/cat:text-slate-800'
                  }`}
                >
                  {t(`categories.${cat}`)}
                  <sup className="text-[10px] font-semibold tabular-nums text-slate-400">
                    {count}
                  </sup>
                </span>
                <span
                  className={`h-0.5 rounded-full bg-slate-900 transition-all duration-300 ${
                    active ? 'w-6' : 'w-0'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <p className="sr-only" aria-live="polite">
          {t(`categories.${filter}`)}: {visible.length}
        </p>

        {/* ── Shopfronts ── */}
        <div key={filter} className="mt-10 grid gap-x-7 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((theme, i) => {
            const Icon = CAT_ICON[theme.cat];
            const cta = `inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-[13px] font-semibold text-white transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.97] ${focusRing}`;

            return (
              <article
                key={theme.id}
                style={{ animationDelay: `${i * 50}ms` }}
                className="group flex flex-col [animation:tg-rise_650ms_cubic-bezier(.22,1,.36,1)_both] motion-reduce:[animation:none]"
              >
                {/* awning, overlapping the top of the window */}
                <div
                  className="relative z-10 -mb-[11px] transition-transform duration-500 ease-out group-hover:translate-y-0.5 motion-reduce:transition-none"
                  style={{ filter: 'drop-shadow(0 6px 4px rgba(15,23,42,0.2))' }}
                >
                  <div
                    className="h-8 rounded-t-[10px]"
                    style={awning(theme.pal.head, theme.pal.card, 22)}
                  />
                </div>

                {/* display window: the screenshot is a link to the demo */}
                <DemoLink
                  theme={theme}
                  label={`${theme.name} - ${t('liveDemo')}`}
                  className={`group/win block rounded-b-[14px] ${focusRing}`}
                >
                  <div
                    className="relative h-52 overflow-hidden rounded-b-[14px] border-x-[5px] border-b-[5px]"
                    style={{ background: theme.pal.page, borderColor: theme.pal.head }}
                  >
                    <Thumb theme={theme} />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-[linear-gradient(112deg,rgba(255,255,255,0.3)_0%,rgba(255,255,255,0)_36%)]"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 grid place-items-center bg-slate-900/0 transition-colors duration-300 group-hover/win:bg-slate-900/30 group-focus-visible/win:bg-slate-900/30"
                    >
                      <span className="inline-flex translate-y-1 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-slate-900 opacity-0 shadow-lg transition-all duration-300 group-hover/win:translate-y-0 group-hover/win:opacity-100 group-focus-visible/win:translate-y-0 group-focus-visible/win:opacity-100">
                        <ExternalLink className="h-3.5 w-3.5" />
                        {t('liveDemo')}
                      </span>
                    </span>
                  </div>
                </DemoLink>

                {/* sign */}
                <div className="mt-4 min-w-0 px-1">
                  <h3 className="truncate font-serif text-[22px] font-medium leading-tight tracking-tight text-slate-900">
                    {theme.name}
                  </h3>
                  <p className="mt-1 flex items-center gap-1.5 text-[13px] text-slate-500">
                    <Icon className="h-3.5 w-3.5" style={{ color: theme.pal.head }} />
                    {t(`categories.${theme.cat}`)}
                  </p>
                </div>

                {/* price-tag cut line + actions */}
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-dashed border-slate-400/50 px-1 pt-4">
                  <Link
                    href={{ pathname: '/', hash: 'features' }}
                    className={`inline-flex cursor-pointer items-center gap-1.5 rounded-md py-1.5 text-[13px] font-semibold text-slate-600 underline-offset-4 transition-colors hover:text-slate-900 hover:underline ${focusRing}`}
                  >
                    <Eye className="h-3.5 w-3.5" />
                    {tn('features')}
                  </Link>

                  <DemoLink theme={theme} className={cta} style={{ background: theme.pal.head }}>
                    <ExternalLink className="h-3.5 w-3.5" />
                    {t('liveDemo')}
                  </DemoLink>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}