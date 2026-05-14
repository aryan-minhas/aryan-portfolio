import { cn } from '@/lib/utils';

type Accent = 'cyan' | 'amber' | 'violet';

interface SectionPlaceholderProps {
  id?:      string;
  label:    string;
  sublabel?: string;
  height?:  string;
  accent?:  Accent;
  className?: string;
}

const accentStyles: Record<Accent, { border: string; text: string; bg: string }> = {
  cyan:   { border: 'border-cyan/20',   text: 'text-cyan',   bg: 'bg-cyan/5'   },
  amber:  { border: 'border-amber/20',  text: 'text-amber',  bg: 'bg-amber/5'  },
  violet: { border: 'border-violet/20', text: 'text-violet', bg: 'bg-violet/5' },
};

export default function SectionPlaceholder({
  id,
  label,
  sublabel,
  height = '400px',
  accent = 'cyan',
  className,
}: SectionPlaceholderProps) {
  const { border, text, bg } = accentStyles[accent];

  return (
    <section
      id={id}
      className={cn(
        'relative flex flex-col items-center justify-center border',
        border,
        bg,
        className
      )}
      style={{ minHeight: height }}
    >
      <div className="text-center space-y-2 px-8">
        <p className={cn('font-mono text-xs tracking-[0.3em] uppercase opacity-40', text)}>
          PLACEHOLDER
        </p>
        <h2 className={cn('font-display text-3xl md:text-5xl tracking-widest', text)}>
          {label}
        </h2>
        {sublabel && (
          <p className="font-mono text-xs text-ink-muted tracking-wider max-w-lg mx-auto">
            {sublabel}
          </p>
        )}
      </div>

      {/* Corner brackets — wireframe aesthetic */}
      <span className={cn('absolute top-4 left-4 w-4 h-4 border-t border-l', border)} />
      <span className={cn('absolute top-4 right-4 w-4 h-4 border-t border-r', border)} />
      <span className={cn('absolute bottom-4 left-4 w-4 h-4 border-b border-l', border)} />
      <span className={cn('absolute bottom-4 right-4 w-4 h-4 border-b border-r', border)} />
    </section>
  );
}
