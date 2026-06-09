'use client';

import { useScrollAnimation } from '@/hooks/use-scroll-animation';

interface CertificateTeaserProps {
  onBecomeSaviour: () => void;
}

export default function CertificateTeaser({ onBecomeSaviour }: CertificateTeaserProps) {
  const { ref: sectionRef, hasMounted, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section className="py-20 lg:py-28 px-6 bg-bg-base">
      <div
        ref={sectionRef}
        className={`max-w-4xl mx-auto flex flex-col items-center text-center ${hasMounted ? `motion-reveal ${isVisible ? 'is-visible' : ''}` : ''}`}
      >
        {/* Heading */}
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mb-4">
          Your certificate awaits
        </h2>

        {/* Subtext */}
        <p className="text-base sm:text-lg text-text-muted max-w-md mb-12 leading-relaxed">
          Place a bowl. Register. Get your shareable certificate.
        </p>

        {/* Certificate preview card — tilted */}
        <div className="mb-12" style={{ transform: 'rotate(-3deg)' }}>
          <div
            className="w-[320px] sm:w-[400px] h-[220px] sm:h-[260px] rounded-xl bg-bg-card border border-[var(--border)] flex flex-col items-center justify-center p-6 relative"
            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}
          >
            {/* Certificate content mock */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">Water For Wings</span>
              <span className="text-[10px] text-text-muted">2025</span>
            </div>

            <div className="text-center mt-4">
              <p className="font-display text-xl sm:text-2xl font-bold text-text-primary mb-2">
                Certificate of Kindness
              </p>
              <p className="text-sm text-text-muted mb-3">This certifies that</p>
              <div className="w-40 h-[1px] bg-text-muted/20 mx-auto mb-3" />
              <p className="text-xs text-text-muted/60">has saved birds by placing water in Delhi</p>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="text-[9px] text-text-muted/50">praan.me</span>
              <span className="text-[9px] text-text-muted/50">Saviour #___</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onBecomeSaviour}
          className="motion-cta bg-[#1A1A18] text-white font-semibold text-base px-7 py-3.5 rounded-full hover:bg-[#2a2a28] transition-colors shadow-sm"
        >
          Place a bowl today
        </button>
      </div>
    </section>
  );
}
