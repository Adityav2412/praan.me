'use client';
import Image from 'next/image';
import { X } from 'lucide-react';
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
        <div className="relative p-5 md:p-6 min-h-full">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl hover:bg-cream-dark transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-navy" />
          </button>
          <div className="flex items-center gap-3 mb-8 pr-10">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ww-QZ98dXoNzpWbA8gocF0kQv926CU5Le.png"
              alt="Water For Wings Logo"
              width={64}
              height={64}
              priority
              className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0"
            />
            <span className="text-lg md:text-xl font-extrabold text-navy leading-tight">
              Water For Wings
            </span>
          </div>
          <button
            onClick={() => { onBecomeSaviour(); onClose(); }}
            className="w-full bg-navy text-cream py-4 px-5 rounded-2xl font-bold text-base md:text-lg mb-6 hover:bg-navy-dark transition-colors shadow-lg animate-pulse-glow"
          >
            🐦 Become a Saviour
          </button>
          <nav className="space-y-2 pb-8">
            {menuItems.map((item) => (
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
          <div className="border-t border-navy/10 pt-5 mt-6">
            <p className="text-sm text-navy/60 text-center">
              Saving Delhi&apos;s birds 💙
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
