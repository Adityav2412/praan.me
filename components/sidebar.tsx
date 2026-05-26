'use client';

import Image from 'next/image';
import { X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onBecomeSaviour: () => void;
  onNavigate: (section: string) => void;
}

export default function Sidebar({ isOpen, onClose, onBecomeSaviour, onNavigate }: SidebarProps) {
  const menuItems = [
    { label: 'About', section: 'about' },
    { label: 'Why It Matters', section: 'why-it-matters' },
    { label: 'Saviours', section: 'saviours' },
    { label: 'Area Leaderboard', section: 'leaderboard' },
    { label: 'Set Reminder', section: 'reminder' },
  ];

  const handleNavClick = (section: string) => {
    onNavigate(section);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy/50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-80 bg-cream shadow-2xl z-50 animate-slide-in-right">
        <div className="p-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-cream-dark rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-navy" />
          </button>

          {/* Logo + Brand */}
          <div className="flex items-center gap-3 mb-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ww-QZ98dXoNzpWbA8gocF0kQv926CU5Le.png"
              alt="Water For Wings Logo"
              width={64}
              height={64}
              className="w-16 h-16"
            />
            <span className="text-xl font-extrabold text-navy">
              Water For Wings
            </span>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => {
              onBecomeSaviour();
              onClose();
            }}
            className="w-full bg-navy text-cream py-4 px-6 rounded-xl font-bold text-lg mb-6 hover:bg-navy-dark transition-colors shadow-lg animate-pulse-glow"
          >
            🐦 Become a Saviour
          </button>

          {/* Menu Items */}
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.section}
                onClick={() => handleNavClick(item.section)}
                className="w-full text-left px-4 py-3 text-navy font-medium hover:bg-cream-dark rounded-lg transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
