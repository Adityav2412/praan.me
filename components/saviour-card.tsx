import { type Saviour, formatTimeAgo, formatSaviourDate } from '@/lib/saviours';

interface SaviourCardProps {
  saviour: Saviour;
  dateStyle?: 'relative' | 'calendar';
  className?: string;
  animate?: boolean;
}

export default function SaviourCard({
  saviour,
  dateStyle = 'relative',
  className = '',
  animate = false,
}: SaviourCardProps) {
  const initial = saviour.name.charAt(0).toUpperCase();

  return (
    <article
      className={`bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 transition-all hover:shadow-md ${
        animate ? 'animate-slide-up' : ''
      } ${className}`}
    >
      <div className="flex items-center gap-3 mb-3">
        {/* Avatar circle */}
        <div className="w-10 h-10 rounded-full bg-[var(--bg-surface)] flex items-center justify-center shrink-0">
          <span className="font-display text-base text-[var(--accent)]">
            {initial}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-body font-semibold text-[var(--text-primary)] text-sm truncate">
            {saviour.name}
          </h3>
          <p className="text-xs text-[var(--text-muted)] truncate">
            {saviour.colony}
          </p>
        </div>

        {/* Saviour number badge */}
        <span className="bg-[var(--accent)] text-white text-xs font-bold px-2.5 py-1 rounded-full shrink-0">
          #{saviour.saviourNumber}
        </span>
      </div>

      {/* Date display */}
      <p className="text-xs text-[var(--text-muted)] mt-2">
        {dateStyle === 'calendar'
          ? formatSaviourDate(saviour.timestamp)
          : formatTimeAgo(saviour.timestamp)}
      </p>
    </article>
  );
}
