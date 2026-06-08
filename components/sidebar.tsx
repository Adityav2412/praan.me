'use client';

import { X } from 'lucide-react';
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
      window.location.href = '/founder';
    }, 300);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
          zIndex: 50,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease-in-out',
        }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100%',
          width: '88%',
          maxWidth: '384px',
          backgroundColor: 'var(--bg-base)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
          zIndex: 51,
          overflowY: 'auto',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        <div className="relative p-5 md:p-6 min-h-full flex flex-col">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl hover:bg-[var(--bg-surface)] transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-[var(--text-primary)]" />
          </button>

          {/* Logo */}
          <div className="mb-8 pt-2">
            <a href="/" className="font-display italic text-2xl text-[var(--text-primary)]">
              praan.
            </a>
          </div>

          {/* CTA */}
          <button
            onClick={() => {
              onBecomeSaviour();
              onClose();
            }}
            className="w-full bg-[var(--accent)] text-white py-3.5 px-5 rounded-lg font-body font-semibold text-base mb-6 hover:opacity-90 transition-opacity"
          >
            Place a bowl
          </button>

          {/* Nav links */}
          <nav className="space-y-1 flex-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.section}
                onClick={() => handleNavClick(item.section)}
                className="w-full text-left px-4 py-3 font-body text-[var(--text-primary)] font-medium rounded-xl hover:bg-[var(--bg-surface)] transition-colors text-base"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={handleFounderMessage}
              className="w-full text-left px-4 py-3 font-body text-[var(--text-primary)] font-medium rounded-xl hover:bg-[var(--bg-surface)] transition-colors text-base"
            >
              Founder&apos;s Message
            </button>
          </nav>

          {/* Bottom */}
          <div className="border-t border-[var(--border)] pt-6 mt-6">
            <p className="text-sm text-[var(--text-muted)] text-center">
              Saving Delhi&apos;s birds, one bowl at a time.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
