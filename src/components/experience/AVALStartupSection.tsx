import Link from 'next/link';

const BULLETS = [
  'Architected a 12-use-case financial reconciliation pipeline — Excel/PDF ingestion, schema standardization, probabilistic matching, and human-in-the-loop approval workflow.',
  'Embedded 768-dimensional transaction vectors via a locally-run Ollama LLM (nomic-embed-text) and matched them with Cosine Similarity search via pgvector.',
  'Applied GoF design patterns (Strategy, Template Method, Repository/DAO, Adapter) across a fully Dockerized, multi-layer Java architecture.',
] as const;

const TECH = ['Java', 'JavaFX', 'PostgreSQL', 'pgvector', 'LangChain4j', 'Ollama', 'Docker'] as const;

export default function AVALStartupSection() {
  return (
    <section
      className="py-24 md:py-32 border-t border-[var(--color-border)]"
      style={{ paddingInline: 'var(--section-pad-x)' }}
    >
      <p className="font-mono text-xs text-ink-faint tracking-[0.3em] uppercase mb-12">
        VENTURE
      </p>

      <div
        className="relative overflow-hidden p-8 md:p-12"
        style={{
          background:  'rgba(0,229,255,0.025)',
          border:      '1px solid var(--color-border)',
          borderLeft:  '3px solid var(--color-cyan)',
        }}
      >
        {/* Ambient glow */}
        <div
          className="absolute top-0 left-0 w-72 h-72 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10">
          {/* Main content */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-[10px] text-cyan tracking-[0.3em] uppercase">
                2024 – PRESENT
              </span>
              <span className="font-mono text-[9px] text-cyan tracking-[0.2em] uppercase px-2 py-0.5 border border-cyan/40">
                ACTIVE
              </span>
            </div>

            <h2
              className="font-display text-ink mb-1"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            >
              AVAL R&amp;D
            </h2>
            <p className="font-mono text-xs text-cyan tracking-[0.2em] uppercase mb-8">
              CO-FOUNDER &amp; LEAD ENGINEER
            </p>

            <p className="font-body text-sm text-ink-muted max-w-2xl leading-relaxed mb-8">
              Building a hybrid AI financial reconciliation engine that fuses deterministic
              accounting logic with semantic vector-based AI to automate enterprise auditing
              &mdash; shipping as a commercial product.
            </p>

            <ul className="space-y-4 mb-10">
              {BULLETS.map((b, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-mono text-xs text-cyan shrink-0 mt-0.5">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                  <span className="font-body text-sm text-ink-muted leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {TECH.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] px-3 py-1 text-ink-faint tracking-wider"
                  style={{ border: '1px solid var(--color-border)' }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Side panel */}
          <div className="flex flex-col justify-between items-start lg:items-end gap-8">
            <div className="text-right">
              <span
                className="font-display text-cyan leading-none block"
                style={{ fontSize: '3.5rem', textShadow: 'var(--glow-cyan)' }}
              >
                01
              </span>
              <span className="font-mono text-[10px] text-ink-faint tracking-[0.2em] uppercase">
                STARTUP
              </span>
            </div>
            <Link
              href="/projects/aval-systems"
              className="font-mono text-xs tracking-[0.2em] text-cyan border border-cyan/40 hover:border-cyan hover:bg-cyan/5 px-6 py-3 transition-all duration-300"
            >
              VIEW PROJECT →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
