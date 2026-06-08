'use client';

import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

interface FooterProps {
  onBecomeSaviour?: () => void;
}

export default function Footer({ onBecomeSaviour }: FooterProps) {
  const { ref: ctaRef, hasMounted, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <footer id="cta">
      {/* Large CTA Section */}
      <section className="py-20 lg:py-28 px-6 bg-bg-base">
        <div
          ref={ctaRef}
          className={`max-w-3xl mx-auto text-center ${hasMounted ? `motion-reveal ${isVisible ? 'is-visible' : ''}` : ''}`}
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-6">
            The birds can&apos;t wait for next summer.
          </h2>
          <p className="text-base sm:text-lg text-text-muted max-w-xl mx-auto mb-10 leading-relaxed">
            Every day without water is a day too many. Join hundreds of Delhi residents 
            who&apos;ve already placed their bowls. It takes 2 minutes.
          </p>
          <button
            onClick={onBecomeSaviour}
            className="motion-cta bg-accent text-white font-semibold text-base px-8 py-4 rounded-lg hover:bg-accent-hover transition-colors shadow-sm"
          >
            Place a bowl today
          </button>
        </div>
      </section>

      {/* Bottom bar */}
      <div className="border-t border-[var(--border)] bg-bg-surface">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Left — Brand */}
            <div className="flex flex-col items-center sm:items-start gap-1">
              <span className="font-display text-lg font-bold text-text-primary">praan.</span>
              <span className="text-xs text-text-muted">A platform for meaningful community initiatives.</span>
            </div>

            {/* Center — Links */}
            <nav className="flex items-center gap-6 text-sm text-text-muted">
              <Link href="/founder" className="hover:text-text-primary transition-colors">
                A letter from our founder →
              </Link>
            </nav>

            {/* Right — Bottom links */}
            <nav className="flex items-center gap-4 text-xs text-text-muted">
              <button onClick={() => {}} className="hover:text-text-primary transition-colors">
                About
              </button>
              <span className="text-text-muted/30">·</span>
              <a href="https://instagram.com/waterforwings" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">
                Instagram
              </a>
              <span className="text-text-muted/30">·</span>
              <a href="mailto:Akshay1092001@yahoo.com" className="hover:text-text-primary transition-colors">
                Contact
              </a>
            </nav>
          </div>

          {/* Copyright */}
          <div className="mt-6 pt-6 border-t border-[var(--border)] text-center">
            <p className="text-xs text-text-muted/60">
              © 2025 Praan. Made with care for Delhi&apos;s birds.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
