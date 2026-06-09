'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import {
  X,
  Download,
  Instagram,
  MessageCircle,
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

  if (!isOpen || !saviour) return null;

  const formattedDate = new Date(saviour.timestamp).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const shareText = `I became a Saviour with Water For Wings.\n\nDelhi's birds need water this summer.\nYou can help too.\n\nGet your Saviour Certificate:\nhttps://praan.me\n\n#DelhiBirdsNeedWater`;

  const generateCertificateImage = async () => {
    try {
      if (!certificateRef.current) return null;
      await new Promise((resolve) => setTimeout(resolve, 400));
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#FAF8F4',
        useCORS: false,
        allowTaint: true,
        logging: false,
        imageTimeout: 0,
        removeContainer: true,
      });
      return canvas.toDataURL('image/png', 1);
    } catch (error) {
      console.error('Canvas generation failed:', error);
      return null;
    }
  };

  const downloadCertificate = async () => {
    const image = await generateCertificateImage();
    if (!image) throw new Error('Image generation failed');
    const link = document.createElement('a');
    link.href = image;
    link.download = `Praan-Saviour-${saviour.saviourNumber}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return image;
  };

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await downloadCertificate();
    } catch (error) {
      console.error(error);
      alert('Failed to download certificate.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async (platform: 'x' | 'whatsapp' | 'instagram') => {
    try {
      setIsDownloading(true);
      await downloadCertificate();
      setTimeout(() => {
        if (platform === 'x') {
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
            '_blank',
            'noopener,noreferrer'
          );
        }
        if (platform === 'whatsapp') {
          window.open(
            `https://wa.me/?text=${encodeURIComponent(shareText)}`,
            '_blank',
            'noopener,noreferrer'
          );
        }
        if (platform === 'instagram') {
          alert('Certificate downloaded.\n\nShare it on your Instagram Story and tag @officialwaterforwings');
        }
      }, 500);
    } catch (error) {
      console.error(error);
      alert('Unable to generate certificate right now.');
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
            className="p-6 sm:p-8 md:p-10 rounded-xl relative overflow-hidden"
            style={{
              background: '#FAF8F4',
              border: '3px double #1C1209',
              color: '#1C1209',
            }}
          >
            {/* Top — Logo + Initiative */}
            <div className="flex flex-col items-center mb-6">
              <Image
                src="/praan-navbar.svg"
                alt="Praan"
                width={100}
                height={28}
                className="h-7 w-auto mb-2"
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
              <div className="flex-1 h-px bg-[#1C1209]/15" />
              <h2 className="font-display italic text-lg sm:text-xl font-semibold text-[#1C1209] tracking-wide text-center">
                Saviour Certificate
              </h2>
              <div className="flex-1 h-px bg-[#1C1209]/15" />
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
            <div className="w-16 h-px bg-[#1C1209]/20 mx-auto mb-6" />

            {/* Info cards — thin border, no emojis */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center mb-8">
              <div className="p-3 rounded-lg border border-[#1C1209]/10">
                <p className="text-[10px] uppercase tracking-wider text-[#7A7468] mb-1">
                  Colony
                </p>
                <p className="font-semibold text-sm text-[#1C1209] break-words">
                  {saviour.colony}
                </p>
              </div>
              <div className="p-3 rounded-lg border border-[#1C1209]/10">
                <p className="text-[10px] uppercase tracking-wider text-[#7A7468] mb-1">
                  Station
                </p>
                <p className="font-semibold text-sm text-[#1C1209] break-words">
                  {saviour.stationType}
                </p>
              </div>
              <div className="p-3 rounded-lg border border-[#1C1209]/10">
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
              <Image
                src="/akshay-signature.png"
                alt="Founder signature"
                width={140}
                height={56}
                className="opacity-90 mb-1"
              />
              <span className="text-[10px] text-[#7A7468]">Akshay, Founder</span>
            </div>

            {/* Bottom text — Playfair italic, no emoji */}
            <p className="text-center font-display italic text-sm text-[#7A7468] leading-relaxed">
              Share and inspire more people to help Delhi&apos;s birds.
            </p>
          </div>

          {/* Share buttons */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* X */}
            <button
              onClick={() => handleShare('x')}
              disabled={isDownloading}
              className="flex items-center justify-center gap-3 bg-[#1C1209] text-white px-4 py-3.5 rounded-full font-semibold text-sm hover:bg-[#2a1f12] transition-all disabled:opacity-60"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Share on X
            </button>

            {/* WhatsApp */}
            <button
              onClick={() => handleShare('whatsapp')}
              disabled={isDownloading}
              className="flex items-center justify-center gap-3 bg-[#25D366] text-white px-4 py-3.5 rounded-full font-semibold text-sm hover:bg-[#1da851] transition-all disabled:opacity-60"
            >
              <MessageCircle className="w-4 h-4" />
              Share on WhatsApp
            </button>

            {/* Instagram */}
            <button
              onClick={() => handleShare('instagram')}
              disabled={isDownloading}
              className="flex items-center justify-center gap-3 bg-[#8B4513] text-white px-4 py-3.5 rounded-full font-semibold text-sm hover:bg-[#6d3610] transition-all disabled:opacity-60"
            >
              <Instagram className="w-4 h-4" />
              Instagram Story
            </button>

            {/* Download */}
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center justify-center gap-3 bg-white text-[#1C1209] px-4 py-3.5 rounded-full font-semibold text-sm border border-[#1C1209]/15 hover:border-[#1C1209]/40 transition-all disabled:opacity-60"
            >
              <Download className="w-4 h-4" />
              {isDownloading ? 'Preparing...' : 'Download PNG'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
