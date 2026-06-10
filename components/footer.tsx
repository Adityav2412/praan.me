'use client';

import Image from 'next/image';
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
            className="motion-cta bg-[#1A1A18] text-white font-semibold text-base px-8 py-4 rounded-full hover:bg-[#2a2a28] transition-colors shadow-sm"
          >
            Place a bowl today
          </button>
        </div>
      </section>

      {/* Bottom bar */}
      <div className="relative border-t border-[var(--border)] bg-bg-surface overflow-hidden">
        {/* Footer content — above trees (higher z-index) */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Left — Logo SVG (larger: 400px wide) */}
            <div className="flex flex-col items-center sm:items-start gap-2">
              <Image
                src="/praan-footer.svg"
                alt="praan."
                width={400}
                height={120}
                className="w-[400px] h-auto"
              />
              <span className="text-[10px] uppercase tracking-widest text-text-muted/60 font-medium">A Praan Initiative</span>
              <span className="text-xs text-text-muted">Water for Wings · Saving Delhi&apos;s birds</span>
            </div>

            {/* Center spacer */}
            <div />

            {/* Right — Bottom links */}
            <nav className="flex items-center flex-wrap gap-4 text-xs text-text-muted">
              <button onClick={() => {}} className="hover:text-text-primary transition-colors">
                About
              </button>
              <span className="text-text-muted/30">·</span>
              <a href="/privacy" className="hover:text-text-primary transition-colors">
                Privacy Policy
              </a>
              <span className="text-text-muted/30">·</span>
              <a href="/terms" className="hover:text-text-primary transition-colors">
                Terms
              </a>
              <span className="text-text-muted/30">·</span>
              <a href="https://x.com/praanofficial" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">
                X @praanofficial
              </a>
              <span className="text-text-muted/30">·</span>
              <a href="mailto:akshay@praan.me" className="hover:text-text-primary transition-colors">
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

        {/* Footer trees — single image, no repeat, below copyright */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/footer-trees.svg"
          alt=""
          style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }}
        />
      </div>
    </footer>
  );
}
