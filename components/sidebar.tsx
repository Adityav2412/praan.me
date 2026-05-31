'use client';

import { useState, useEffect } from 'react';

import { X } from 'lucide-react';

import {
  PraanLogo,
  BrandTagline,
  BrandStatement,
} from '@/components/brand-labels';
import { SocialIcons } from '@/components/social-icons';
import { NAV_ITEMS } from '@/lib/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onBecomeSaviour: () => void;
  onNavigate: (section: string) => void;
}

export default function Sidebar({
  isOpen,
  onClose,
  onBecomeSaviour,
  onNavigate,
}: SidebarProps) {
  const handleNavClick = (section: string) => {
    onNavigate(section);
    onClose();
  };

  const handleFounderMessage = () => {
    onClose();
    setTimeout(() => {
      window.location.href = '/founders-message';
    }, 300);
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 50,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease-in-out',
        }}
        onClick={onClose}
      />
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100%',
          width: '88%',
          maxWidth: '384px',
          backgroundColor: '#fdf6e3',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
          zIndex: 51,
          overflowY: 'auto',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        <div className="relative p-5 md:p-6 min-h-full flex flex-col">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl hover:bg-cream-dark transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-navy" />
          </button>

          <div className="flex flex-col items-center text-center mb-8 pr-8 pt-2">
            <PraanLogo className="h-8 w-auto max-w-[160px] mb-4" />
            <BrandTagline className="mb-2" />
            <BrandStatement />
          </div>

          <button
            onClick={() => {
              onBecomeSaviour();
              onClose();
            }}
            className="w-full bg-navy text-cream py-4 px-5 rounded-2xl font-bold text-base mb-6 hover:bg-navy-dark transition-colors shadow-lg animate-pulse-glow"
          >
            🐦 Become a Saviour
          </button>

          <nav className="space-y-2 flex-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.section}
                onClick={() => handleNavClick(item.section)}
                className="w-full text-left px-4 py-3 text-navy font-medium rounded-xl hover:bg-cream-dark transition-colors text-base"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={handleFounderMessage}
              className="w-full text-left px-4 py-3 text-navy font-medium rounded-xl hover:bg-cream-dark transition-colors text-base"
            >
              Founder&apos;s Message
            </button>
          </nav>

          <div className="border-t border-navy/10 pt-6 mt-6 flex flex-col items-center gap-4">
            <SocialIcons
              linkClassName="text-navy/70 hover:text-navy"
              iconClassName="w-6 h-6"
            />
            <p className="text-sm text-navy/60 text-center">
              Saving Delhi&apos;s birds 💙
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
