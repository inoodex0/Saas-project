import Image from 'next/image';

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
};

export default function Logo({ className = '', showWordmark = true }: LogoProps) {
  return (
    <span className={`flex shrink-0 items-center gap-2.5 ${className}`}>
      <span className="relative block h-9 w-14 shrink-0 overflow-hidden" aria-hidden="true">
        <Image
          src="/brands/zenvika-logo.png"
          alt=""
          width={1536}
          height={1024}
          priority
          className="absolute -left-[42px] -top-[15px] h-[94px] w-[141px] max-w-none"
        />
      </span>
      {showWordmark && (
        <span className="text-[18px] font-black tracking-[0.15em] text-foreground">
          ZEN
          <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
            VIKA
          </span>
        </span>
      )}
    </span>
  );
}
