'use client';

import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import type { Saviour } from '@/lib/storage';

interface SavioursSectionProps {
  saviours: Saviour[];
  onBecomeSaviour: () => void;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getBadge(count: number): string {
  if (count <= 10) return '🌱';
  if (count <= 50) return '🪴';
  if (count <= 100) return '🌳';
  return '⭐';
}

export default function SavioursSection({ saviours, onBecomeSaviour }: SavioursSectionProps) {
  const { ref: sectionRef, hasMounted, isVisible } = useScrollAnimation({ threshold: 0.1 });

  // Show latest 5 saviours
  const displaySaviours = saviours.slice(-5).reverse();

  return (
    <section id="saviours" className="py-20 lg:py-28 px-6 bg-bg-surface">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
            Meet Delhi&apos;s Saviours
          </h2>
          <Link
            href="/saviours"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover transition-colors group"
          >
            View all
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Emotional hook — italic subline */}
        <p className="font-display italic text-lg text-text-muted mb-12">
          Each one started with a single bowl.
        </p>

        {/* Grid */}
        <div
          ref={sectionRef}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ${hasMounted ? `motion-stagger ${isVisible ? 'is-visible' : ''}` : ''}`}
        >
          {displaySaviours.map((saviour) => (
            <div
              key={saviour.id}
              className="bg-bg-card rounded-xl border border-[var(--border)] p-5 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-semibold text-accent">
                    {getInitials(saviour.name)}
                  </span>
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-text-primary truncate">
                      {saviour.name}
                    </h3>
                    <span className="text-base" title="Saviour badge">
                      {getBadge(saviour.saviourNumber)}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted mt-0.5 truncate">
                    {saviour.colony || saviour.area || 'Delhi'}
                  </p>
                  <p className="text-xs text-text-muted/70 mt-1">
                    Saviour #{saviour.saviourNumber}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* CTA Card — Become a saviour */}
          <button
            onClick={onBecomeSaviour}
            className="rounded-xl border-2 border-dashed border-accent/30 p-5 flex flex-col items-center justify-center gap-3 hover:border-accent/60 hover:bg-accent/[0.03] transition-all min-h-[120px] cursor-pointer"
          >
            <div className="w-11 h-11 rounded-full border-2 border-dashed border-accent/40 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-accent">Become a saviour</span>
          </button>
        </div>

        {/* Mobile "View all" link */}
        <div className="sm:hidden mt-8 text-center">
          <Link
            href="/saviours"
            className="text-sm font-medium text-accent hover:text-accent-hover transition-colors"
          >
            View all saviours →
          </Link>
        </div>
      </div>
    </section>
  );
}
