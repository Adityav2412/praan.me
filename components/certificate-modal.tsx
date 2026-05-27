'use client';

import { useRef, useState } from 'react';
import {
  X,
  Download,
  Instagram,
  MessageCircle,
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

  const shareText = `I became a Saviour with Water For Wings 🐦💧

Delhi’s birds need water this summer.
You can help too.

Get your Saviour Certificate:
https://praan.me

#DelhiBirdsNeedWater`;

  const generateCertificateImage =
    async () => {
      try {
        if (
          !certificateRef.current
        )
          return null;

        // wait for modal render
        await new Promise(
          (resolve) =>
            setTimeout(
              resolve,
              400
            )
        );

        const canvas =
          await html2canvas(
            certificateRef.current,
            {
              scale: 2,

              backgroundColor:
                '#F5F0E8',

              useCORS: false,

              allowTaint: true,

              logging: true,

              imageTimeout: 0,

              removeContainer: true,
            }
          );

        return canvas.toDataURL(
          'image/png',
          1
        );
      } catch (error) {
        console.error(
          'Canvas generation failed:',
          error
        );

        return null;
      }
    };

  const downloadCertificate =
    async () => {
      const image =
        await generateCertificateImage();

      if (!image)
        throw new Error(
          'Image generation failed'
        );

      const link =
        document.createElement(
          'a'
        );

      link.href = image;

      link.download = `WaterForWings-Saviour-${saviour.saviourNumber}.png`;

      document.body.appendChild(
        link
      );

      link.click();

      document.body.removeChild(
        link
      );

      return image;
    };

  const handleDownload =
    async () => {
      try {
        setIsDownloading(
          true
        );

        await downloadCertificate();
      } catch (error) {
        console.error(
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

  const handleShare =
    async (
      platform:
        | 'x'
        | 'whatsapp'
        | 'instagram'
    ) => {
      try {
        setIsDownloading(
          true
        );

        await downloadCertificate();

        setTimeout(() => {
          if (
            platform === 'x'
          ) {
            window.open(
              `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                shareText
              )}`,
              '_blank',
              'noopener,noreferrer'
            );
          }

          if (
            platform ===
            'whatsapp'
          ) {
            window.open(
              `https://wa.me/?text=${encodeURIComponent(
                shareText
              )}`,
              '_blank',
              'noopener,noreferrer'
            );
          }

          if (
            platform ===
            'instagram'
          ) {
            alert(
              'Certificate downloaded 😄\n\nShare it on your Instagram Story and tag @officialwaterforwings 💙'
            );
          }
        }, 500);
      } catch (error) {
        console.error(
          error
        );

        alert(
          'Unable to generate certificate right now.'
        );
      } finally {
        setIsDownloading(
          false
        );
      }
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-cream rounded-3xl shadow-2xl w-full max-w-xl my-4 sm:my-8 animate-slide-up max-h-[95vh] overflow-y-auto border border-white/30">

        {/* Close */}
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
            className="bg-cream p-4 sm:p-6 md:p-8 border-[5px] sm:border-[6px] border-double border-navy rounded-2xl relative overflow-hidden shadow-inner"
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

              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FAF7F2] flex items-center justify-center shadow-md overflow-hidden">

                <img
                  src="/bird-logo.png"
                  alt="Water For Wings Logo"
                  className="w-11 h-11 sm:w-14 sm:h-14 object-contain"
                  crossOrigin="anonymous"
                  draggable={false}
                />

              </div>

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

              <div className="bg-cream-dark p-3 rounded-xl">

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

              <div className="bg-cream-dark p-3 rounded-xl">

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

              <div className="bg-cream-dark p-3 rounded-xl">

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
            <p className="text-center text-navy/70 text-xs sm:text-sm px-2 leading-relaxed">
              📷 Share your certificate and inspire more people to help Delhi&apos;s birds 💙
            </p>

          </div>

          {/* Buttons */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">

            {/* X */}
            <button
              onClick={() =>
                handleShare(
                  'x'
                )
              }
              disabled={
                isDownloading
              }
              className="group flex items-center justify-center gap-3 bg-black text-white px-4 py-3.5 rounded-2xl font-semibold hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-60"
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

            {/* WhatsApp */}
            <button
              onClick={() =>
                handleShare(
                  'whatsapp'
                )
              }
              disabled={
                isDownloading
              }
              className="group flex items-center justify-center gap-3 bg-[#25D366] text-white px-4 py-3.5 rounded-2xl font-semibold hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-60"
            >

              <MessageCircle className="w-5 h-5" />

              Share on WhatsApp

            </button>

            {/* Instagram */}
            <button
              onClick={() =>
                handleShare(
                  'instagram'
                )
              }
              disabled={
                isDownloading
              }
              className="group flex items-center justify-center gap-3 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white px-4 py-3.5 rounded-2xl font-semibold hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-60"
            >

              <Instagram className="w-5 h-5" />

              Instagram Story

            </button>

            {/* Download */}
            <button
              onClick={
                handleDownload
              }
              disabled={
                isDownloading
              }
              className="group flex items-center justify-center gap-3 bg-white text-navy px-4 py-3.5 rounded-2xl font-semibold border-2 border-navy/10 hover:border-navy/30 hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-60"
            >

              <Download className="w-5 h-5" />

              {isDownloading
                ? 'Preparing...'
                : 'Download PNG'}

            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
