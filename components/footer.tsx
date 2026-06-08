'use client';

import Link from 'next/link';

interface FooterProps {
  onBecomeSaviour?: () => void;
}

export default function Footer({ onBecomeSaviour }: FooterProps) {
  const handleCTA = () => {
    if (onBecomeSaviour) {
      onBecomeSaviour();
    } else {
      const event = new CustomEvent('open-form-modal');
      window.dispatchEvent(event);
    }
  };

  return (
    <footer className="bg-[var(--bg-surface)] py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main headline */}
        <h2 className="font-display italic text-3xl sm:text-4xl text-[var(--text-primary)] mb-4 leading-snug">
          The birds can&apos;t wait for next summer.
        </h2>

        <p className="font-body text-base text-[var(--text-muted)] mb-8 max-w-xl mx-auto">
          Every day without water is another life lost. Take two minutes today and place a bowl outside.
        </p>

        {/* Primary CTA */}
        <button
          type="button"
          onClick={handleCTA}
          className="bg-[var(--accent)] text-white font-body font-semibold text-base px-8 py-3.5 rounded-lg hover:opacity-90 transition-opacity motion-cta mb-6 inline-block"
        >
          Place a bowl today
        </button>

        {/* Founder link */}
        <div className="mb-12">
          <Link
            href="/founder"
            className="font-body text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            A letter from our founder &rarr;
          </Link>
        </div>

        {/* Bottom links */}
        <div className="border-t border-[var(--border)] pt-6">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-4 text-sm text-[var(--text-muted)]">
            <Link href="#about" className="hover:text-[var(--text-primary)] transition-colors">
              About
            </Link>
            <span className="text-[var(--border)]">&middot;</span>
            <Link href="/privacy" className="hover:text-[var(--text-primary)] transition-colors">
              Privacy
            </Link>
            <span className="text-[var(--border)]">&middot;</span>
            <a
              href="https://instagram.com/officalwaterforwings"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              Instagram
            </a>
            <span className="text-[var(--border)]">&middot;</span>
            <a href="mailto:hello@praan.me" className="hover:text-[var(--text-primary)] transition-colors">
              Contact
            </a>
          </div>

          <p className="text-xs text-[var(--text-muted)]">
            &copy; 2025 praan.me. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
