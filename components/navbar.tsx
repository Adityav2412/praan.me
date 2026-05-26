'use client';

import {
  useState,
  useEffect,
} from 'react';

import Image from 'next/image';

import { Menu } from 'lucide-react';

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({
  onMenuClick,
}: NavbarProps) {
  const [scrolled, setScrolled] =
    useState(false);

  useEffect(() => {
    const handleScroll =
      () => {
        setScrolled(
          window.scrollY > 50
        );
      };

    window.addEventListener(
      'scroll',
      handleScroll
    );

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll
      );
  }, []);

  return (
    <nav
      className={`fixed top-4 md:top-8 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo + Brand */}
          <div className="flex items-center gap-2 md:gap-3 min-w-0">

            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ww-QZ98dXoNzpWbA8gocF0kQv926CU5Le.png"
              alt="Water For Wings Logo"
              width={64}
              height={64}
              priority
              className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0"
            />

            <span className="text-lg sm:text-xl md:text-2xl font-extrabold text-navy truncate">
              Water For Wings
            </span>
          </div>

          {/* Hamburger Menu */}
          <button
            onClick={
              onMenuClick
            }
            className="p-2 md:p-3 rounded-xl hover:bg-cream-dark transition-colors flex-shrink-0"
            aria-label="Open menu"
          >
            <Menu className="w-7 h-7 md:w-8 md:h-8 text-navy" />
          </button>
        </div>
      </div>
    </nav>
  );
}
