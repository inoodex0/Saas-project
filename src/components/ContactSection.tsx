'use client';

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Tag,
  Timer,
  User,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

type Status = 'idle' | 'sending' | 'success';
type FieldKey = 'name' | 'email' | 'subject' | 'message';
type Errors = Partial<Record<FieldKey, string>>;

const inputClass = (error?: string) =>
  `w-full rounded-2xl border bg-slate-50/70 px-4 py-3.5 text-sm text-slate-900 shadow-[inset_0_1px_2px_rgba(15,23,42,0.04)] placeholder:text-slate-400 outline-none transition-all duration-200 hover:border-slate-300 hover:bg-white focus:-translate-y-px focus:bg-white focus:ring-4 focus:shadow-[0_12px_28px_-14px_rgba(16,185,129,0.55)] ${
    error
      ? 'border-rose-300 bg-rose-50/40 focus:border-rose-400 focus:ring-rose-100'
      : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10'
  }`;

const Req = () => <span className="ms-0.5 text-emerald-600">*</span>;

const ErrorText = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-500">
    <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-[9px] font-bold">
      !
    </span>
    {children}
  </p>
);

const labelClass = 'block text-xs font-semibold tracking-wide text-slate-600';

const FieldIcon = ({ top, children }: { top?: boolean; children: React.ReactNode }) => (
  <span
    className={`pointer-events-none absolute start-3.5 z-10 text-slate-400 transition-colors duration-200 group-focus-within:text-emerald-600 ${
      top ? 'top-3.5' : 'top-1/2 -translate-y-1/2'
    }`}
  >
    {children}
  </span>
);

const CONFETTI = [
  'absolute -top-1 end-6 h-2.5 w-2.5 rotate-45 rounded-[3px] bg-emerald-400',
  'absolute top-8 -end-2 h-2 w-2 rotate-12 rounded-full bg-amber-400',
  'absolute -bottom-1 end-10 h-2 w-2 rotate-45 rounded-[3px] bg-teal-300',
  'absolute top-2 -start-3 h-2.5 w-2.5 -rotate-12 rounded-[3px] bg-emerald-300',
  'absolute bottom-4 -start-1 h-2 w-2 rounded-full bg-teal-500',
];

export default function ContactSection() {
  const t = useTranslations('contact');
  const tFooter = useTranslations('footer.contact');
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});

  const phoneHref = `tel:${tFooter('phone').replace(/[^\d+]/g, '')}`;

  const infoCards = [
    {
      label: tFooter('emailLabel'),
      value: tFooter('email'),
      href: `mailto:${tFooter('email')}`,
      Icon: Mail,
    },
    {
      label: tFooter('phoneLabel'),
      value: tFooter('phone'),
      href: phoneHref,
      Icon: Phone,
    },
    {
      label: tFooter('addressLabel'),
      value: tFooter('address'),
      href: '',
      Icon: MapPin,
    },
  ];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status !== 'idle') return;

    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    const next: Errors = {};
    if (!name) next.name = t('required');
    if (!email) next.email = t('required');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = t('invalidEmail');
    if (!message) next.message = t('required');
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus('sending');
    window.setTimeout(() => setStatus('success'), 900);
  };

  return (
    <section className="relative mx-auto w-full max-w-7xl overflow-x-clip px-6 pb-24 pt-12 lg:px-8">
      {/* dotted grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background-image:radial-gradient(rgba(15,23,42,0.09)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
      />
      {/* ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -start-32 top-1/4 -z-10 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl animate-drift"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-28 bottom-0 -z-10 h-96 w-96 rounded-full bg-teal-200/40 blur-3xl animate-drift-slow"
      />

      <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
        {/* ───────── Left column ───────── */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          {/* Hero card */}
          <div className="relative min-h-56 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-900 p-6 shadow-[0_40px_80px_-40px_rgba(6,78,59,0.9)] ring-1 ring-white/10 sm:p-7">
            <span
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_75%)]"
            />
            <span
              aria-hidden="true"
              className="absolute -top-16 -start-12 h-48 w-48 rounded-full bg-emerald-400/30 blur-3xl"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-20 end-0 h-52 w-52 rounded-full bg-teal-400/25 blur-3xl"
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-24 -end-16 hidden h-72 w-72 rounded-full border border-white/10 sm:block"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-12 -end-4 hidden h-48 w-48 rounded-full border border-white/15 bg-white/[0.03] sm:block"
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent"
            />

            <div className="relative z-10 max-w-[58%] sm:max-w-[60%]">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-100 ring-1 ring-inset ring-white/20 backdrop-blur">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300" />
                </span>
                <Timer className="h-3 w-3" />
                {t('responseLabel')}
              </span>
              <h3 className="mt-4 text-xl font-black leading-[1.15] tracking-tight text-white sm:text-2xl">
                {t('visualTitle')}
              </h3>
              <p className="mt-2.5 text-sm leading-6 text-emerald-50/75">{t('visualSubtitle')}</p>
            </div>

            <Image
              src="/brands/hero.png"
              alt=""
              width={720}
              height={1024}
              className="pointer-events-none absolute -bottom-px end-3 block h-[156px] w-auto drop-shadow-[0_20px_30px_rgba(0,0,0,0.45)] sm:h-[208px]"
            />
          </div>

          {/* Info cards */}
          {infoCards.map(({ label, value, href, Icon }) => {
            const body = (
              <>
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-700 ring-1 ring-inset ring-emerald-200/70 transition-all duration-300 group-hover:from-emerald-500 group-hover:to-teal-600 group-hover:text-white group-hover:ring-transparent group-hover:shadow-lg group-hover:shadow-emerald-600/30">
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    {label}
                  </span>
                  <span className="mt-1 block [overflow-wrap:anywhere] text-sm font-bold leading-snug text-slate-900 sm:text-[15px]">
                    {value}
                  </span>
                </span>
              </>
            );

            const base =
              'group relative flex items-center gap-4 overflow-hidden rounded-2xl bg-white p-4 ring-1 ring-slate-200/80 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_28px_-18px_rgba(15,23,42,0.25)] sm:p-5';

            if (!href) {
              return (
                <div key={label} className={base}>
                  {body}
                </div>
              );
            }

            return (
              <a
                key={label}
                href={href}
                className={`${base} transition-all duration-300 hover:-translate-y-0.5 hover:ring-emerald-300 hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_44px_-22px_rgba(5,150,105,0.5)]`}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -end-10 -top-10 h-28 w-28 rounded-full bg-emerald-100/70 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />
                {body}
                <ArrowUpRight className="relative h-4 w-4 shrink-0 text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-600" />
              </a>
            );
          })}
        </div>

        {/* ───────── Form column ───────── */}
        <div className="relative rounded-[28px] bg-gradient-to-b from-emerald-300/70 via-slate-200/70 to-teal-300/50 p-px shadow-[0_50px_100px_-50px_rgba(6,78,59,0.55)] lg:col-span-3">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-10 -bottom-6 -z-10 h-24 rounded-full bg-emerald-400/30 blur-3xl"
          />
          <div className="relative overflow-hidden rounded-[27px] bg-white">
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -end-24 -top-24 h-64 w-64 rounded-full bg-gradient-to-br from-emerald-100 to-teal-50 blur-2xl"
            />

            {status === 'success' ? (
              <div className="relative flex min-h-[500px] flex-col items-center justify-center px-6 text-center">
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping"
                  />
                  <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-[0_20px_40px_-14px_rgba(5,150,105,0.8)] ring-4 ring-emerald-100">
                    <Check className="h-9 w-9" strokeWidth={3} />
                  </span>
                  {CONFETTI.map((piece) => (
                    <span key={piece} aria-hidden="true" className={piece} />
                  ))}
                </div>
                <h3 className="mt-8 text-2xl font-black tracking-tight text-slate-900">
                  {t('successTitle')}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
                  {t('successText')}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-8 cursor-pointer rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition-all hover:text-emerald-700 hover:ring-emerald-300 hover:shadow-lg hover:shadow-emerald-600/10"
                >
                  {t('sendAnother')}
                </button>
              </div>
            ) : (
              <form key={status} onSubmit={handleSubmit} noValidate className="relative p-6 sm:p-10">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-600/30 ring-4 ring-emerald-100">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-[28px]">
                      {t('formTitle')}
                    </h2>
                    <p className="mt-1.5 text-sm leading-6 text-slate-500">{t('formSubtitle')}</p>
                  </div>
                </div>

                <div className="mt-8 h-px bg-gradient-to-r from-slate-200 via-slate-200/60 to-transparent" />

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="contact-name">
                      {t('name')}
                      <Req />
                    </label>
                    <div className="group relative mt-2">
                      <FieldIcon>
                        <User className="h-4 w-4" />
                      </FieldIcon>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder={t('namePlaceholder')}
                        className={`${inputClass(errors.name)} ps-10`}
                        aria-invalid={Boolean(errors.name)}
                      />
                    </div>
                    {errors.name && (
                      <ErrorText>{errors.name}</ErrorText>
                    )}
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="contact-email">
                      {t('email')}
                      <Req />
                    </label>
                    <div className="group relative mt-2">
                      <FieldIcon>
                        <Mail className="h-4 w-4" />
                      </FieldIcon>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder={t('emailPlaceholder')}
                        className={`${inputClass(errors.email)} ps-10`}
                        aria-invalid={Boolean(errors.email)}
                      />
                    </div>
                    {errors.email && (
                      <ErrorText>{errors.email}</ErrorText>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass} htmlFor="contact-subject">
                      {t('subject')}
                    </label>
                    <div className="group relative mt-2">
                      <FieldIcon>
                        <Tag className="h-4 w-4" />
                      </FieldIcon>
                      <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        placeholder={t('subjectPlaceholder')}
                        className={`${inputClass()} ps-10`}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass} htmlFor="contact-message">
                      {t('message')}
                      <Req />
                    </label>
                    <div className="group relative mt-2">
                      <FieldIcon top>
                        <MessageSquare className="h-4 w-4" />
                      </FieldIcon>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        placeholder={t('messagePlaceholder')}
                        className={`${inputClass(errors.message)} min-h-36 resize-y ps-10`}
                        aria-invalid={Boolean(errors.message)}
                      />
                    </div>
                    {errors.message && (
                      <ErrorText>{errors.message}</ErrorText>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group relative mt-8 inline-flex w-full cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-slate-900 via-emerald-900 to-teal-800 px-8 py-4 text-sm font-bold tracking-wide text-white shadow-[0_20px_40px_-18px_rgba(6,78,59,0.9)] ring-1 ring-inset ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_26px_50px_-18px_rgba(5,150,105,0.95)] disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0 sm:w-auto"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 -left-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-700 ease-out group-hover:left-full"
                  />
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="relative h-4 w-4 animate-spin" />
                      <span className="relative">{t('sending')}</span>
                    </>
                  ) : (
                    <>
                      <span className="relative">{t('submit')}</span>
                      <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <p className="mt-5 flex items-center gap-2 text-xs text-slate-400">
                  <Timer className="h-3.5 w-3.5 text-emerald-500" />
                  {t('responseLabel')}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}