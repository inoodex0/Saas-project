'use client';

import { useRef, useCallback } from 'react';
import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';

export default function Phone3DCss({ alt = '' }: { alt?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduce || !wrapRef.current) return;
      const el = wrapRef.current;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1200px) rotateY(${x * 35}deg) rotateX(${-y * 20}deg) scale(1.02)`;
    },
    [reduce]
  );

  const handleLeave = useCallback(() => {
    if (!wrapRef.current) return;
    wrapRef.current.style.transform =
      'perspective(1200px) rotateY(-18deg) rotateX(6deg) scale(1)';
  }, []);

  return (
    <div
      className="phone-3d-wrap relative flex h-full w-full items-center justify-center"
      style={{ perspective: '1200px' }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div
        ref={wrapRef}
        className="phone-3d relative will-change-transform"
        style={{
          transform: reduce
            ? 'perspective(1200px) rotateY(-12deg) rotateX(4deg)'
            : 'perspective(1200px) rotateY(-18deg) rotateX(6deg)',
          transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Phone frame with glow */}
        <div className="relative">
          {/* Outer glow */}
          <div
            aria-hidden="true"
            className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-emerald-400/40 via-teal-400/30 to-transparent blur-3xl"
          />

          {/* The actual phone image */}
          <Image
            src="/brands/1_w_700.webp"
            alt={alt}
            width={700}
            height={585}
            priority={false}
            className="relative w-full max-w-sm drop-shadow-[0_45px_80px_rgba(0,0,0,0.6)] sm:max-w-lg lg:max-w-xl"
          />

          {/* Glass reflection overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-transparent via-white/5 to-white/15 mix-blend-overlay"
          />
        </div>
      </div>
    </div>
  );
}