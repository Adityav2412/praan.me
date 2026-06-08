'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onMenuClick?: () => void;
  onNavigate?: (section: string) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Custom event contract: 'open-form-modal' is listened to in app/page.tsx
  // Keep this event name in sync with the listener there.
  const handleNavClick = (section: string) => {
    setMobileOpen(false);
    if (onNavigate) {
      onNavigate(section);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-[var(--border)]">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display text-2xl font-bold text-text-primary tracking-tight">
          praan.
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleNavClick('about')}
            className="motion-nav-link text-sm font-medium text-text-muted hover:text-text-primary transition-colors"
          >
            About
          </button>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="motion-nav-link text-sm font-medium text-text-muted hover:text-text-primary transition-colors"
          >
            How it works
          </button>
          <button
            onClick={() => handleNavClick('saviours')}
            className="motion-nav-link text-sm font-medium text-text-muted hover:text-text-primary transition-colors"
          >
            Saviours
          </button>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <button
            onClick={() => handleNavClick('cta')}
            className="motion-cta bg-accent text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-accent-hover transition-colors"
          >
            Place a bowl
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-text-primary"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-[var(--border)] animate-slide-up">
          <div className="px-6 py-6 flex flex-col gap-4">
            <button
              onClick={() => handleNavClick('about')}
              className="text-left text-base font-medium text-text-primary py-2"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="text-left text-base font-medium text-text-primary py-2"
            >
              How it works
            </button>
            <button
              onClick={() => handleNavClick('saviours')}
              className="text-left text-base font-medium text-text-primary py-2"
            >
              Saviours
            </button>
            <button
              onClick={() => handleNavClick('cta')}
              className="mt-2 bg-accent text-white text-sm font-semibold px-5 py-3 rounded-lg w-full"
            >
              Place a bowl
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
