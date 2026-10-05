'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';

const PHONE_RE = /^\+?[\d\s\-().]{7,20}$/;

export default function OpenStoreForm() {
  const t = useTranslations('openStore');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const digits = phone.replace(/\D/g, '');

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (digits.length < 7 || digits.length > 15 || !PHONE_RE.test(phone.trim())) {
      setError(t('invalid'));
      return;
    }
    setError(null);
    setDone(true);
  };

  if (done) {
    return (
      <div className="mt-8 flex flex-col items-center text-center" role="status">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-100 ring-8 ring-emerald-50">
          <Check className="h-7 w-7 text-emerald-600" strokeWidth={3} />
        </span>
        <p className="mt-4 text-lg font-black tracking-tight text-slate-900">
          {t('successTitle')}
        </p>
        <p className="mt-1.5 text-sm leading-6 text-slate-500">{t('successNote')}</p>
      </div>
    );
  }

  return (
    <form className="mt-8" onSubmit={onSubmit} noValidate>
      <label
        htmlFor="open-store-phone"
        className="block text-sm font-medium text-slate-700"
      >
        {t('phoneLabel')}
      </label>
      <input
        id="open-store-phone"
        name="phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        dir="ltr"
        placeholder={t('phonePlaceholder')}
        value={phone}
        onChange={(event) => {
          setPhone(event.target.value);
          if (error) setError(null);
        }}
        aria-invalid={Boolean(error)}
        className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15"
      />
      {error && (
        <p className="mt-2 text-sm font-medium text-rose-600" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        className="mt-5 w-full cursor-pointer rounded-lg bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-600 px-6 py-3.5 text-base font-bold text-white shadow-[0_14px_30px_-12px_rgba(13,148,136,0.75)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-12px_rgba(13,148,136,0.9)] active:translate-y-0"
      >
        {t('cta')}
      </button>
    </form>
  );
}
