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
  User,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

type Status = 'idle' | 'sending' | 'success';
type FieldKey = 'name' | 'email' | 'subject' | 'message';
type Errors = Partial<Record<FieldKey, string>>;

const inputClass = (error?: string) =>
  `w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:ring-2 ${
    error
      ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-100'
      : 'border-slate-200 focus:border-teal-400 focus:ring-teal-100'
  }`;

const labelClass = 'block text-[13px] font-bold text-slate-700';

const FieldIcon = ({ top, children }: { top?: boolean; children: React.ReactNode }) => (
  <span
    className={`pointer-events-none absolute start-3.5 z-10 text-slate-400 ${
      top ? 'top-3' : 'top-1/2 -translate-y-1/2'
    }`}
  >
    {children}
  </span>
);

const CONFETTI = [
  'absolute -top-1 end-6 h-2.5 w-2.5 rotate-45 rounded-[3px] bg-teal-400',
  'absolute top-8 -end-2 h-2 w-2 rotate-12 rounded-full bg-amber-400',
  'absolute -bottom-1 end-10 h-2 w-2 rotate-45 rounded-[3px] bg-rose-400',
  'absolute top-2 -start-3 h-2.5 w-2.5 -rotate-12 rounded-[3px] bg-emerald-400',
  'absolute bottom-4 -start-1 h-2 w-2 rounded-full bg-green-500',
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
      tone: 'from-teal-500 to-teal-600',
    },
    {
      label: tFooter('phoneLabel'),
      value: tFooter('phone'),
      href: phoneHref,
      Icon: Phone,
      tone: 'from-emerald-500 to-green-600',
    },
    {
      label: tFooter('addressLabel'),
      value: tFooter('address'),
      href: '',
      Icon: MapPin,
      tone: 'from-green-500 to-emerald-600',
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
    <section className="relative mx-auto w-full max-w-7xl overflow-x-clip px-6 pb-20 pt-12 lg:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -start-24 top-1/3 -z-10 h-72 w-72 rounded-full bg-teal-200/40 blur-3xl animate-drift"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-20 bottom-10 -z-10 h-72 w-72 rounded-full bg-green-200/40 blur-3xl animate-drift-slow"
      />

      <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
        <div className="flex flex-col gap-4">
          <div className="relative min-h-48 overflow-hidden rounded-2xl bg-gradient-to-br from-teal-600 via-emerald-600 to-green-700 p-5 shadow-[0_24px_50px_-28px_rgba(5,150,105,0.9)]">
            <span
              aria-hidden="true"
              className="absolute inset-0 opacity-25 bg-[radial-gradient(rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:16px_16px]"
            />
            <span
              aria-hidden="true"
              className="absolute -top-12 -start-10 h-36 w-36 rounded-full bg-white/15 blur-xl"
            />
            <div className="relative max-w-[60%] sm:max-w-[62%]">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white/90 ring-1 ring-inset ring-white/25">
                {t('responseLabel')}
              </span>
              <h3 className="mt-3 text-xl font-black leading-tight text-white sm:text-2xl">
                {t('visualTitle')}
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/85">{t('visualSubtitle')}</p>
            </div>
            <Image
              src="/brands/hero.png"
              alt=""
              width={720}
              height={1024}
              className="pointer-events-none absolute -bottom-px end-3 hidden h-[192px] w-auto sm:block"
            />
          </div>

          {infoCards.map(({ label, value, href, Icon, tone }) => {
            const body = (
              <>
                <span
                  className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${tone} text-white shadow-md transition-transform duration-300 group-hover:scale-110 sm:h-11 sm:w-11`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 transition-colors duration-300 group-hover:text-teal-600">
                    {label}
                  </span>
                  <span className="mt-1 block [overflow-wrap:anywhere] text-sm font-black leading-snug text-slate-900 sm:text-[15px]">
                    {value}
                  </span>
                </span>
              </>
            );

            const inner = 'relative flex items-start gap-3.5 rounded-[15px] bg-white p-4 sm:p-5';

            if (!href) {
              return (
                <div
                  key={label}
                  className="group relative overflow-hidden rounded-2xl p-px shadow-[0_14px_34px_-22px_rgba(16,24,40,0.55)]"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-br from-teal-300/70 via-emerald-200/50 to-green-300/70"
                  />
                  <div className={inner}>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-10 -end-10 h-24 w-24 rounded-full bg-gradient-to-br from-teal-100 to-emerald-100"
                    />
                    {body}
                  </div>
                </div>
              );
            }

            return (
              <a
                key={label}
                href={href}
                className="group relative block overflow-hidden rounded-2xl p-px shadow-[0_14px_34px_-22px_rgba(16,24,40,0.55)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(13,148,136,0.7)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-br from-teal-300/70 via-emerald-200/50 to-green-300/70 transition-opacity duration-300 group-hover:opacity-0"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-br from-teal-500 via-emerald-500 to-green-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <span className={inner}>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-10 -end-10 h-24 w-24 rounded-full bg-gradient-to-br from-teal-100 to-emerald-100"
                  />
                  {body}
                  <ArrowUpRight className="pointer-events-none absolute end-4 top-4 h-4 w-4 text-teal-600 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </span>
              </a>
            );
          })}
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-teal-400 via-emerald-500 to-green-500 p-px shadow-[0_36px_80px_-44px_rgba(13,148,136,0.85)] lg:col-span-3">
          <div className="relative overflow-hidden rounded-3xl bg-white">
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500"
            />

            {status === 'success' ? (
              <div className="flex min-h-[460px] flex-col items-center justify-center px-6 text-center">
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping"
                  />
                  <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-[0_18px_36px_-14px_rgba(13,148,136,0.8)]">
                    <Check className="h-9 w-9" strokeWidth={3} />
                  </span>
                  {CONFETTI.map((piece) => (
                    <span key={piece} aria-hidden="true" className={piece} />
                  ))}
                </div>
                <h3 className="mt-7 text-2xl font-black tracking-tight text-slate-900">
                  {t('successTitle')}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">
                  {t('successText')}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-7 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition-all hover:border-teal-300 hover:text-teal-700 hover:shadow-md cursor-pointer"
                >
                  {t('sendAnother')}
                </button>
              </div>
            ) : (
              <form key={status} onSubmit={handleSubmit} noValidate className="relative p-6 sm:p-8">
                <div className="flex items-start gap-3.5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-md shadow-teal-600/25">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="text-2xl font-black tracking-tight text-slate-900">
                      {t('formTitle')}
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-slate-500">{t('formSubtitle')}</p>
                  </div>
                </div>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="contact-name">
                      {t('name')}
                    </label>
                    <div className="relative mt-2">
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
                      <p className="mt-1.5 text-xs font-semibold text-rose-500">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="contact-email">
                      {t('email')}
                    </label>
                    <div className="relative mt-2">
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
                      <p className="mt-1.5 text-xs font-semibold text-rose-500">{errors.email}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass} htmlFor="contact-subject">
                      {t('subject')}
                    </label>
                    <div className="relative mt-2">
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
                    </label>
                    <div className="relative mt-2">
                      <FieldIcon top>
                        <MessageSquare className="h-4 w-4" />
                      </FieldIcon>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        placeholder={t('messagePlaceholder')}
                        className={`${inputClass(errors.message)} min-h-32 resize-y ps-10 pt-3`}
                        aria-invalid={Boolean(errors.message)}
                      />
                    </div>
                    {errors.message && (
                      <p className="mt-1.5 text-xs font-semibold text-rose-500">{errors.message}</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group relative mt-7 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-8 py-4 text-sm font-bold text-white shadow-[0_18px_36px_-16px_rgba(5,150,105,0.9)] transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_44px_-16px_rgba(5,150,105,1)] disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0 sm:w-auto cursor-pointer"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 -left-full w-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent transition-all duration-700 ease-out group-hover:left-full"
                  />
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="relative h-4 w-4 animate-spin" />
                      <span className="relative">{t('sending')}</span>
                    </>
                  ) : (
                    <>
                      <span className="relative">{t('submit')}</span>
                      <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
