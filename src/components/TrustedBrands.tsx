'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { 
  MARKETPLACE_CHANNELS, 
  PAYMENT_LOGISTICS_CHANNELS, 
  type ChannelLogo 
} from '@/data/channels';

const marketplaceLoop = [...MARKETPLACE_CHANNELS, ...MARKETPLACE_CHANNELS];
const paymentLogisticsLoop = [...PAYMENT_LOGISTICS_CHANNELS, ...PAYMENT_LOGISTICS_CHANNELS];

export default function TrustedBrands() {
  const t = useTranslations('home.trust');
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);

  const renderBrandChip = (logo: ChannelLogo, index: number, copy: number) => {
    const itemKey = `${logo.name}-${copy}-${index}`;
    const isHovered = hoveredBrand === itemKey;

    return (
      <div
        key={itemKey}
        onMouseEnter={() => setHoveredBrand(itemKey)}
        onMouseLeave={() => setHoveredBrand(null)}
        className="group relative flex shrink-0 cursor-pointer items-center gap-3 rounded-[1.25rem] border border-slate-200/80 bg-white/95 px-4 py-3 shadow-[0_3px_16px_rgba(15,23,42,0.05)] ring-1 ring-inset ring-black/[0.02] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_35px_-10px_rgba(15,23,42,0.12)] sm:gap-4 sm:px-5 sm:py-3.5"
        style={{
          borderColor: isHovered ? `#${logo.hex}80` : undefined,
          boxShadow: isHovered 
            ? `0 20px 40px -12px #${logo.hex}35, 0 4px 12px rgba(15,23,42,0.05)` 
            : undefined,
        }}
      >
        {/* Subtle top glossy highlight */}
        <div 
          aria-hidden="true" 
          className="pointer-events-none absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-70 group-hover:via-teal-300"
        />

        {/* Live connected pulse badge on hover */}
        <span
          className={`absolute -top-1.5 -end-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white transition-all duration-200 ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
          title="Direct API Linked"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
        </span>

        {/* Brand Icon Tile */}
        <div
          className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-gradient-to-b from-white to-slate-50/80 p-1.5 shadow-[0_2px_8px_rgba(15,23,42,0.04)] transition-all duration-300 group-hover:scale-105 group-hover:border-slate-200 sm:h-11 sm:w-11 sm:p-2"
          style={{
            backgroundColor: isHovered ? `#${logo.hex}10` : undefined,
            borderColor: isHovered ? `#${logo.hex}30` : undefined,
          }}
        >
          {logo.src ? (
            <Image
              src={logo.src}
              alt={logo.name}
              width={logo.width ?? 48}
              height={logo.height ?? 48}
              className="h-6 w-auto max-w-[4.5rem] rounded-sm object-contain"
            />
          ) : (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className={logo.wordmark ? 'h-7 w-7' : 'h-5 w-5'}
              style={{ fill: `#${logo.hex}` }}
            >
              <path d={logo.path} />
            </svg>
          )}
        </div>

        {/* Brand Details */}
        <div className="flex flex-col text-start">
          <div className="flex items-center gap-2">
            <span className="whitespace-nowrap text-[13px] font-bold tracking-tight text-slate-800 transition-colors duration-200 group-hover:text-slate-950 sm:text-[14.5px]">
              {logo.name}
            </span>
            <span
              className="hidden rounded-md border px-1.5 py-0.5 text-[10px] font-bold tracking-wide uppercase transition-colors sm:inline-block"
              style={{
                backgroundColor: `#${logo.hex}10`,
                borderColor: `#${logo.hex}25`,
                color: `#${logo.hex}`,
              }}
            >
              {logo.categoryLabel}
            </span>
          </div>

          <div className="mt-0.5 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80" />
            <span className="text-[10px] font-medium text-slate-400 group-hover:text-slate-600 transition-colors sm:text-[11px]">
              {logo.highlightText || 'Real-Time Sync'}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section 
      id="integrations" 
      className="relative isolate overflow-hidden border-y border-slate-200/80 bg-gradient-to-b from-white via-slate-50/50 to-white py-14 sm:py-28"
      style={{ '--marquee-duration': '68s' } as React.CSSProperties}
    >
      {/* Background Dot Matrix */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(rgba(15,23,42,0.06)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,0.6),transparent_80%)]"
      />
      
      {/* Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -start-24 top-10 -z-10 h-96 w-96 rounded-full bg-gradient-to-br from-teal-200/35 via-emerald-200/25 to-transparent blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-24 bottom-10 -z-10 h-96 w-96 rounded-full bg-gradient-to-tl from-green-200/35 via-sky-200/25 to-transparent blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.10),transparent_70%)] blur-2xl"
      />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center gap-2.5 rounded-full border border-teal-200/90 bg-white/95 px-4 py-1.5 text-xs font-bold tracking-wide text-teal-700 shadow-[0_2px_12px_rgba(13,148,136,0.08)] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-600" />
              </span>
              <ShieldCheck className="h-4 w-4 shrink-0 text-teal-700" />
              <span className="text-balance">{t('headline')}</span>
            </div>
          </motion.div>

       

         
        </div>

        {/* Dual-Track Smooth Marquees (Slowed down for relaxed reading) */}
        <div className="relative mt-12 space-y-3 sm:space-y-4">
          {/* Edge Fade Masks for smooth gradient fadeout */}
          <div className="pointer-events-none absolute inset-y-0 start-0 z-20 w-10 sm:w-36 bg-gradient-to-r from-white via-white/85 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 end-0 z-20 w-10 sm:w-36 bg-gradient-to-l from-white via-white/85 to-transparent" />

          {/* Row 1: Marketplaces (Slow Scroll Left) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="marquee relative overflow-hidden py-1.5"
          >
            <div className="flex w-max animate-marquee">
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  aria-hidden={copy === 1}
                  className="flex shrink-0 gap-3 pe-3 sm:gap-4 sm:pe-4"
                >
                  {marketplaceLoop.map((logo, index) => renderBrandChip(logo, index, copy))}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Row 2: Payments & Logistics (Slow Scroll Right) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="marquee relative overflow-hidden py-1.5"
          >
            <div className="flex w-max animate-marquee-reverse">
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  aria-hidden={copy === 1}
                  className="flex shrink-0 gap-3 pe-3 sm:gap-4 sm:pe-4"
                >
                  {paymentLogisticsLoop.map((logo, index) => renderBrandChip(logo, index, copy))}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

       

        

       
        
      </div>
    </section>
  );
}
