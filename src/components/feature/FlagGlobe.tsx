interface FlagGlobeProps {
  flagUrl: string;
  name: string;
  /** Seconds for one full rotation */
  duration?: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function FlagGlobe({ flagUrl, name, duration = 9, size = 'md' }: FlagGlobeProps) {
  const boxSize =
    size === 'lg' ? 'w-[96px] h-[96px]' : size === 'sm' ? 'w-[46px] h-[46px]' : 'w-[78px] h-[78px]';

  return (
    <div className={`relative ${boxSize} flex items-center justify-center`}>
      <span className="pointer-events-none absolute inset-[-10px] rounded-full bg-[#35e0c0]/15 blur-[14px]" />

      <div className="relative w-full h-full rounded-full overflow-hidden bg-[#040b11] ring-1 ring-[#35e0c0]/35 shadow-[0_0_18px_-4px_rgba(53,224,192,0.55)]">
        <div
          className="flag-globe-strip absolute inset-y-0 left-0 flex w-[200%]"
          style={{ animationDuration: `${duration}s` }}
        >
          <img
            src={flagUrl}
            alt={`Cờ ${name}`}
            className="w-1/2 h-full object-cover select-none"
            draggable={false}
          />
          <img
            src={flagUrl}
            alt=""
            aria-hidden="true"
            className="w-1/2 h-full object-cover select-none"
            draggable={false}
          />
        </div>

        <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_24%,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.14)_26%,rgba(255,255,255,0)_48%)]" />
        <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(2,8,12,0)_40%,rgba(2,8,12,0.35)_72%,rgba(2,8,12,0.85)_100%)]" />
        <span className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_-8px_14px_rgba(0,0,0,0.6),inset_8px_0_14px_rgba(0,0,0,0.4),inset_-8px_0_14px_rgba(0,0,0,0.4)]" />
      </div>

      <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/15" />
      <span className="pointer-events-none absolute left-1/2 top-1 h-3 w-10 -translate-x-1/2 rounded-full bg-white/25 blur-[6px]" />
    </div>
  );
}