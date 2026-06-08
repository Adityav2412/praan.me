'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '@/lib/navigation';

interface NavbarProps {
  onMenuClick?: () => void;
  onNavigate: (section: string) => void;
}

export default function Navbar({ onMenuClick, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom event contract: 'open-form-modal' is listened to in app/page.tsx
  // Keep this event name in sync with the listener there.
  const handlePlaceBowl = () => {
    setMobileOpen(false);
    const event = new CustomEvent('open-form-modal');
    window.dispatchEvent(event);
  };

  const handleMobileToggle = () => {
    if (onMenuClick) {
      onMenuClick();
    } else {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleMobileNav = (section: string) => {
    setMobileOpen(false);
    onNavigate(section);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-[var(--bg-base)] border-b border-[var(--border)] transition-shadow duration-300 ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop */}
        <div className="hidden lg:flex items-center justify-between h-16">
          <a href="/" className="font-display italic text-2xl text-[var(--text-primary)]">
            praan.
          </a>

          <div className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.section}
                type="button"
                onClick={() => onNavigate(item.section)}
                className="font-body text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors motion-nav-link"
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handlePlaceBowl}
            className="bg-[var(--accent)] text-white font-body text-sm font-medium px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity motion-cta"
          >
            Place a bowl
          </button>
        </div>

        {/* Mobile */}
        <div className="flex lg:hidden items-center justify-between h-14">
          <a href="/" className="font-display italic text-xl text-[var(--text-primary)]">
            praan.
          </a>

          <button
            type="button"
            onClick={handleMobileToggle}
            className="p-2 rounded-lg hover:bg-[var(--bg-surface)] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6 text-[var(--text-primary)]" />
            ) : (
              <Menu className="w-6 h-6 text-[var(--text-primary)]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown (shown when no external sidebar handler) */}
      {!onMenuClick && mobileOpen && (
        <div className="lg:hidden border-t border-[var(--border)] bg-[var(--bg-base)] animate-slide-up">
          <div className="px-4 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.section}
                type="button"
                onClick={() => handleMobileNav(item.section)}
                className="w-full text-left px-3 py-2.5 font-body text-base text-[var(--text-primary)] rounded-lg hover:bg-[var(--bg-surface)] transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={handlePlaceBowl}
              className="w-full mt-2 bg-[var(--accent)] text-white font-body text-sm font-semibold px-5 py-3 rounded-lg"
            >
              Place a bowl
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
