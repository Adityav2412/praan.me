import {
  formatSaviourDate,
  formatTimeAgo,
  type Saviour,
} from '@/lib/saviours';

interface SaviourCardProps {
  saviour: Saviour;
  /** Show relative time (homepage) vs calendar date (leaderboard) */
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
  const dateLabel =
    dateStyle === 'calendar'
      ? formatSaviourDate(saviour.timestamp)
      : formatTimeAgo(saviour.timestamp);

  return (
    <article
      className={`bg-cream-dark border-2 border-transparent hover:border-navy/20 rounded-xl p-5 transition-all hover:shadow-lg ${
        animate ? 'animate-slide-up' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between mb-3 gap-3">
        <div className="min-w-0">
          <h3 className="font-bold text-navy text-lg truncate">
            {saviour.name}
          </h3>
          <p className="text-navy/60 text-sm truncate">
            {saviour.colony}
          </p>
        </div>
        <span className="bg-navy text-cream text-xs font-bold px-3 py-1 rounded-full shrink-0">
          #{saviour.saviourNumber}
        </span>
      </div>

      <div className="flex items-center justify-between gap-2 text-sm">
        <span className="text-navy/70 truncate">
          🫙 {saviour.stationType || '—'}
        </span>
        <span className="text-navy/50 shrink-0">{dateLabel}</span>
      </div>
    </article>
  );
}
