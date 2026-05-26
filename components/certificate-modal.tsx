'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { X, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { type Saviour } from '@/lib/storage';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  saviour: Saviour | null;
}

export default function CertificateModal({ isOpen, onClose, saviour }: CertificateModalProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !saviour) return null;

  const formattedDate = new Date(saviour.timestamp).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const shareText = `I just became Delhi Bird Saviour #${saviour.saviourNumber}! I placed a ${saviour.stationType} in ${saviour.colony} to save birds this summer 🐦💧 Join me at praan.me #DelhiBirdsNeedWater`;

  const handleDownload = async () => {
    if (!certificateRef.current) return;

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#F5F0E8',
        useCORS: true,
      });

      const link = document.createElement('a');
      link.download = `WaterForWings-Saviour-${saviour.saviourNumber}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error downloading certificate:', error);
    }
  };

  const handleShareX = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShareWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShareInstagram = () => {
    window.open('https://instagram.com/waterforwings', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-cream rounded-2xl shadow-2xl w-full max-w-lg my-8 animate-slide-up">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-cream-dark rounded-lg transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-6 h-6 text-navy" />
        </button>

        <div className="p-6">
          {/* Certificate */}
          <div
            ref={certificateRef}
            className="bg-cream p-6 md:p-8 border-[6px] border-double border-navy rounded-xl relative"
          >
            {/* Corner leaf watermarks */}
            <div className="absolute top-2 left-2 text-2xl opacity-20">🌿</div>
            <div className="absolute top-2 right-2 text-2xl opacity-20">🌿</div>
            <div className="absolute bottom-2 left-2 text-2xl opacity-20">🌿</div>
            <div className="absolute bottom-2 right-2 text-2xl opacity-20">🌿</div>

            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ww-QZ98dXoNzpWbA8gocF0kQv926CU5Le.png"
                alt="Water For Wings Logo"
                width={80}
                height={80}
                className="w-20 h-20"
              />
              <span className="text-2xl font-extrabold text-navy">
                Water For Wings
              </span>
            </div>

            {/* Title */}
            <h2 className="text-center text-navy font-bold tracking-[0.2em] mb-4">
              ── ♥ SAVIOUR CERTIFICATE ♥ ──
            </h2>

            {/* Certification text */}
            <p className="text-center text-navy/70 uppercase tracking-wide text-sm mb-2">
              This certifies that
            </p>

            {/* Name */}
            <h3 className="text-center text-3xl md:text-4xl font-extrabold text-navy mb-2">
              {saviour.name}
            </h3>

            {/* Saviour number */}
            <p className="text-center text-navy/80 mb-4">
              is an official <span className="font-bold">Saviour No. {saviour.saviourNumber}</span>
            </p>

            {/* Heart badge */}
            <div className="flex justify-center mb-4">
              <span className="inline-flex items-center gap-2 bg-navy/10 px-4 py-2 rounded-full text-navy font-bold">
                💙 SAVIOUR
              </span>
            </div>

            {/* Info columns */}
            <div className="grid grid-cols-3 gap-2 text-center mb-4">
              <div className="bg-cream-dark p-3 rounded-lg">
                <span className="text-xl">📍</span>
                <p className="text-xs text-navy/60 uppercase mt-1">Colony</p>
                <p className="font-semibold text-navy text-sm truncate">{saviour.colony}</p>
              </div>
              <div className="bg-cream-dark p-3 rounded-lg">
                <span className="text-xl">🫙</span>
                <p className="text-xs text-navy/60 uppercase mt-1">Station</p>
                <p className="font-semibold text-navy text-sm truncate">{saviour.stationType}</p>
              </div>
              <div className="bg-cream-dark p-3 rounded-lg">
                <span className="text-xl">📅</span>
                <p className="text-xs text-navy/60 uppercase mt-1">Date</p>
                <p className="font-semibold text-navy text-sm">{formattedDate}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-2 text-navy/30 mb-4">
              <div className="flex-1 h-px bg-navy/20" />
              <span>♥</span>
              <div className="flex-1 h-px bg-navy/20" />
            </div>

            {/* Instagram CTA */}
            <p className="text-center text-navy/70 text-sm">
              📷 Get featured on Instagram! Follow us and DM your certificate.
            </p>
          </div>

          {/* Share buttons */}
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <button
              onClick={handleShareX}
              className="flex items-center gap-2 bg-navy text-cream px-4 py-2 rounded-lg font-medium hover:bg-navy-dark transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Share on X
            </button>
            <button
              onClick={handleShareWhatsApp}
              className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#20bd5a] transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </button>
            <button
              onClick={handleShareInstagram}
              className="flex items-center gap-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Instagram
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-cream-dark text-navy px-4 py-2 rounded-lg font-medium hover:bg-border transition-colors border-2 border-navy"
            >
              <Download className="w-5 h-5" />
              Download PNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
