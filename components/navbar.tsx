'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onMenuClick?: () => void;
  onNavigate?: (section: string) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (section: string) => {
    setMobileOpen(false);
    if (onNavigate) {
      onNavigate(section);
    }
  };

  return (
    <header className="sticky top-4 z-50 mx-auto max-w-[900px] px-4">
      <nav
        className="flex items-center justify-between h-14 px-5 bg-white rounded-full"
        style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}
      >
        {/* Left — Logo SVG */}
        <Link href="/">
          <Image
            src="/praan-navbar.svg"
            alt="praan."
            width={90}
            height={24}
            className="h-6 w-auto"
            priority
          />
        </Link>

        {/* Center — Nav Links */}
        <div className="hidden md:flex items-center gap-7">
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

        {/* Right — CTA dark pill */}
        <div className="hidden md:block">
          <button
            onClick={() => handleNavClick('cta')}
            className="motion-cta bg-[#1A1A18] text-white text-sm font-semibold px-[22px] py-[10px] rounded-full hover:bg-[#2a2a28] transition-colors"
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
        <div
          className="md:hidden mt-2 bg-white rounded-2xl px-6 py-5 flex flex-col gap-4 animate-slide-up"
          style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}
        >
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
            className="mt-2 bg-[#1A1A18] text-white text-sm font-semibold px-[22px] py-[10px] rounded-full w-full"
          >
            Place a bowl
          </button>
        </div>
      )}
    </header>
  );
}
