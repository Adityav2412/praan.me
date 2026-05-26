'use client';

import { useRef, useState } from 'react';

import Image from 'next/image';

import {
  X,
  Download,
} from 'lucide-react';

import html2canvas from 'html2canvas';

import {
  type Saviour,
} from '@/lib/storage';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  saviour: Saviour | null;
}

export default function CertificateModal({
  isOpen,
  onClose,
  saviour,
}: CertificateModalProps) {
  const certificateRef =
    useRef<HTMLDivElement>(null);

  const [
    isDownloading,
    setIsDownloading,
  ] = useState(false);

  if (
    !isOpen ||
    !saviour
  )
    return null;

  const formattedDate =
    new Date(
      saviour.timestamp
    ).toLocaleDateString(
      'en-IN',
      {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }
    );

  const shareText = `I just became Delhi Bird Saviour #${saviour.saviourNumber}! I placed a ${saviour.stationType} in ${saviour.colony} to save birds this summer 🐦💧 Join me at praan.me #DelhiBirdsNeedWater`;

  const handleDownload =
    async () => {
      if (
        !certificateRef.current
      )
        return;

      try {
        setIsDownloading(
          true
        );

        const canvas =
          await html2canvas(
            certificateRef.current,
            {
              scale: 2,

              backgroundColor:
                '#F5F0E8',

              useCORS: true,

              logging: false,
            }
          );

        const link =
          document.createElement(
            'a'
          );

        link.download = `WaterForWings-Saviour-${saviour.saviourNumber}.png`;

        link.href =
          canvas.toDataURL(
            'image/png'
          );

        link.click();
      } catch (error) {
        console.error(
          'Error downloading certificate:',
          error
        );

        alert(
          'Failed to download certificate.'
        );
      } finally {
        setIsDownloading(
          false
        );
      }
    };

  const handleShareX =
    () => {
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}`;

      window.open(
        url,
        '_blank',
        'noopener,noreferrer'
      );
    };

  const handleShareWhatsApp =
    () => {
      const url = `https://wa.me/?text=${encodeURIComponent(
        shareText
      )}`;

      window.open(
        url,
        '_blank',
        'noopener,noreferrer'
      );
    };

  const handleShareInstagram =
    () => {
      alert(
        'Instagram page coming soon 💙'
      );
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-cream rounded-2xl shadow-2xl w-full max-w-xl my-4 sm:my-8 animate-slide-up max-h-[95vh] overflow-y-auto">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 hover:bg-cream-dark rounded-xl transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-navy" />
        </button>

        <div className="p-4 sm:p-6">

          {/* Certificate */}
          <div
            ref={certificateRef}
            className="bg-cream p-4 sm:p-6 md:p-8 border-[5px] sm:border-[6px] border-double border-navy rounded-xl relative overflow-hidden"
          >

            {/* Leaves */}
            <div className="absolute top-2 left-2 text-xl sm:text-2xl opacity-20">
              🌿
            </div>

            <div className="absolute top-2 right-2 text-xl sm:text-2xl opacity-20">
              🌿
            </div>

            <div className="absolute bottom-2 left-2 text-xl sm:text-2xl opacity-20">
              🌿
            </div>

            <div className="absolute bottom-2 right-2 text-xl sm:text-2xl opacity-20">
              🌿
            </div>

            {/* Logo */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4 text-center">

              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ww-QZ98dXoNzpWbA8gocF0kQv926CU5Le.png"
                alt="Water For Wings Logo"
                width={80}
                height={80}
                priority
                className="w-16 h-16 sm:w-20 sm:h-20"
              />

              <span className="text-xl sm:text-2xl font-extrabold text-navy leading-tight">
                Water For Wings
              </span>
            </div>

            {/* Title */}
            <h2 className="text-center text-navy font-bold tracking-[0.12em] sm:tracking-[0.2em] text-xs sm:text-base mb-4">
              ── ♥ SAVIOUR CERTIFICATE ♥ ──
            </h2>

            {/* Text */}
            <p className="text-center text-navy/70 uppercase tracking-wide text-xs sm:text-sm mb-2">
              This certifies that
            </p>

            {/* Name */}
            <h3 className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy mb-2 break-words">
              {saviour.name}
            </h3>

            {/* Number */}
            <p className="text-center text-sm sm:text-base text-navy/80 mb-4 px-2">
              is an official{' '}
              <span className="font-bold">
                Saviour No.{' '}
                {
                  saviour.saviourNumber
                }
              </span>
            </p>

            {/* Badge */}
            <div className="flex justify-center mb-4">

              <span className="inline-flex items-center gap-2 bg-navy/10 px-4 py-2 rounded-full text-navy font-bold text-sm sm:text-base">
                💙 SAVIOUR
              </span>
            </div>

            {/* Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 text-center mb-4">

              <div className="bg-cream-dark p-3 rounded-lg">

                <span className="text-xl">
                  📍
                </span>

                <p className="text-xs text-navy/60 uppercase mt-1">
                  Colony
                </p>

                <p className="font-semibold text-navy text-sm break-words">
                  {
                    saviour.colony
                  }
                </p>
              </div>

              <div className="bg-cream-dark p-3 rounded-lg">

                <span className="text-xl">
                  🫙
                </span>

                <p className="text-xs text-navy/60 uppercase mt-1">
                  Station
                </p>

                <p className="font-semibold text-navy text-sm break-words">
                  {
                    saviour.stationType
                  }
                </p>
              </div>

              <div className="bg-cream-dark p-3 rounded-lg">

                <span className="text-xl">
                  📅
                </span>

                <p className="text-xs text-navy/60 uppercase mt-1">
                  Date
                </p>

                <p className="font-semibold text-navy text-sm">
                  {
                    formattedDate
                  }
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-2 text-navy/30 mb-4">

              <div className="flex-1 h-px bg-navy/20" />

              <span>
                ♥
              </span>

              <div className="flex-1 h-px bg-navy/20" />
            </div>

            {/* CTA */}
            <p className="text-center text-navy/70 text-xs sm:text-sm px-2">
              📷 Get featured on Instagram! Follow us and DM your certificate.
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">

            <button
              onClick={
                handleShareX
              }
              className="flex items-center justify-center gap-2 bg-navy text-cream px-4 py-3 rounded-xl font-medium hover:bg-navy-dark transition-colors text-sm sm:text-base"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>

              Share on X
            </button>

            <button
              onClick={
                handleShareWhatsApp
              }
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-xl font-medium hover:bg-[#20bd5a] transition-colors text-sm sm:text-base"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487." />
              </svg>

              WhatsApp
            </button>

            <button
              onClick={
                handleShareInstagram
              }
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white px-4 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity text-sm sm:text-base"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07..." />
              </svg>

              Instagram
            </button>

            <button
              onClick={
                handleDownload
              }
              disabled={
                isDownloading
              }
              className="flex items-center justify-center gap-2 bg-cream-dark text-navy px-4 py-3 rounded-xl font-medium hover:bg-border transition-colors border-2 border-navy disabled:opacity-60 text-sm sm:text-base"
            >
              <Download className="w-5 h-5" />

              {isDownloading
                ? 'Downloading...'
                : 'Download PNG'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
