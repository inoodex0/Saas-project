'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type Variant = 'rise' | 'swing' | 'draw';

const STATE: Record<Variant, { hidden: string; shown: string }> = {
  rise: {
    hidden: 'opacity-0 translate-y-8',
    shown: 'opacity-100 translate-y-0',
  },
  swing: {
    hidden: 'opacity-0 -translate-y-5 rotate-6',
    shown: 'opacity-100 translate-y-0 rotate-0',
  },
  draw: {
    hidden: 'scale-y-0',
    shown: 'scale-y-100',
  },
};

export default function Reveal({
  children,
  delay = 0,
  variant = 'rise',
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  variant?: Variant;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const s = STATE[variant];

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
        variant === 'draw' ? 'origin-top' : ''
      } ${shown ? s.shown : s.hidden} ${className}`}
    >
      {children}
    </div>
  );
}
