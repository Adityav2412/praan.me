'use client';

import { useRef, useState } from 'react';
import {
  X,
  Download,
} from 'lucide-react';

import html2canvas from 'html2canvas';

import { type Saviour } from '@/lib/storage';

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
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  if (!isOpen || !saviour) return null;

  const formattedDate = new Date(saviour.timestamp).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const generateCertificateImage = async (): Promise<string | null> => {
    if (!certificateRef.current) {
      console.error('Certificate ref not attached');
      return null;
    }

    // Wait for images/fonts to render
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#FAF8F4',
        useCORS: true,
        allowTaint: true,
        logging: false,
        imageTimeout: 5000,
        removeContainer: true,
        onclone: (clonedDoc) => {
          // Force all elements in the cloned document to use hex colors
          // This prevents html2canvas from encountering oklch/color-mix
          const allElements = clonedDoc.querySelectorAll('*');
          allElements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            const computed = window.getComputedStyle(htmlEl);
            const outlineColor = computed.outlineColor;
            const borderColor = computed.borderColor;

            // Override any oklch/color-mix values with transparent
            if (outlineColor && (outlineColor.includes('oklch') || outlineColor.includes('color-mix'))) {
              htmlEl.style.outlineColor = 'transparent';
            }
            if (borderColor && (borderColor.includes('oklch') || borderColor.includes('color-mix'))) {
              htmlEl.style.borderColor = 'rgba(28, 18, 9, 0.1)';
            }
          });
        },
      });

      return canvas.toDataURL('image/png', 1);
    } catch (error) {
      console.error('html2canvas failed:', error);
      return null;
    }
  };

  const downloadCertificate = async () => {
    setDownloadError(null);

    const image = await generateCertificateImage();

    if (!image) {
      throw new Error(
        'Certificate generation failed. Please try again or take a screenshot instead.'
      );
    }

    const link = document.createElement('a');
    link.href = image;
    link.download = `Praan-Saviour-${saviour.saviourNumber}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      setDownloadError(null);
      await downloadCertificate();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try taking a screenshot instead.';
      console.error('Download failed:', error);
      setDownloadError(message);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center overflow-y-auto">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal — full width on mobile */}
      <div className="relative w-full h-full sm:h-auto sm:max-w-xl sm:my-6 sm:rounded-2xl shadow-2xl overflow-y-auto bg-[#FAF8F4]">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-lg transition-colors z-10 hover:bg-[#F2EEE6]"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-[#1C1209]" />
        </button>

        <div className="p-4 sm:p-6">
          {/* Certificate */}
          <div
            ref={certificateRef}
            className="p-6 sm:p-8 md:p-10 rounded-xl relative"
            style={{
              background: '#FAF8F4',
              border: '3px double #1C1209',
              color: '#1C1209',
              outlineColor: 'transparent',
            }}
          >
            {/* Top — Logo + Initiative */}
            <div className="flex flex-col items-center mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/praan-navbar.svg"
                alt="Praan"
                width="100"
                height="28"
                style={{ width: '100px', height: '28px', display: 'block', marginBottom: '8px' }}
              />
              <span className="font-display text-base font-semibold text-[#1C1209]">
                Water for Wings
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A7468] mt-1">
                A Praan Initiative
              </span>
            </div>

            {/* Title — with horizontal rules */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(28,18,9,0.15)' }} />
              <h2 className="font-display italic text-lg sm:text-xl font-semibold text-[#1C1209] tracking-wide text-center">
                Saviour Certificate
              </h2>
              <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(28,18,9,0.15)' }} />
            </div>

            {/* This certifies */}
            <p className="text-center uppercase tracking-[0.15em] text-xs text-[#7A7468] mb-3">
              This certifies that
            </p>

            {/* Name — large Playfair */}
            <h3 className="text-center font-display text-3xl sm:text-4xl font-bold text-[#1C1209] mb-3 break-words">
              {saviour.name}
            </h3>

            {/* Saviour number — elegant small caps */}
            <p className="text-center text-xs uppercase tracking-[0.25em] text-[#8B4513] font-medium mb-6">
              Saviour No. {saviour.saviourNumber}
            </p>

            {/* Thin rule */}
            <div className="w-16 h-px mx-auto mb-6" style={{ backgroundColor: 'rgba(28,18,9,0.2)' }} />

            {/* Info cards — thin border, no emojis, no station/type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-center mb-8">
              <div className="p-3 rounded-lg" style={{ border: '1px solid rgba(28,18,9,0.1)' }}>
                <p className="text-[10px] uppercase tracking-wider text-[#7A7468] mb-1">
                  Colony
                </p>
                <p className="font-semibold text-sm text-[#1C1209] break-words">
                  {saviour.colony}
                </p>
              </div>
              <div className="p-3 rounded-lg" style={{ border: '1px solid rgba(28,18,9,0.1)' }}>
                <p className="text-[10px] uppercase tracking-wider text-[#7A7468] mb-1">
                  Date
                </p>
                <p className="font-semibold text-sm text-[#1C1209]">
                  {formattedDate}
                </p>
              </div>
            </div>

            {/* Founder signature */}
            <div className="flex flex-col items-center mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/akshay-signature.png"
                alt="Founder signature"
                width="140"
                height="56"
                style={{ width: '140px', height: '56px', opacity: 0.9, marginBottom: '4px' }}
              />
              <span className="text-[10px] text-[#7A7468]">Akshay, Founder</span>
            </div>

            {/* Bottom text — Playfair italic, no emoji */}
            <p className="text-center font-display italic text-sm text-[#7A7468] leading-relaxed">
              Share and inspire more people to help Delhi&apos;s birds.
            </p>
          </div>

          {/* Error message */}
          {downloadError && (
            <p className="mt-4 text-center text-sm text-red-600">
              {downloadError}
            </p>
          )}

          {/* Download button */}
          <div className="mt-6">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="w-full flex items-center justify-center gap-3 bg-[#1C1209] text-white px-6 py-4 rounded-full font-semibold text-base hover:bg-[#2a1f12] transition-all disabled:opacity-60"
            >
              <Download className="w-5 h-5" />
              {isDownloading ? 'Preparing...' : 'Download & Share'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
