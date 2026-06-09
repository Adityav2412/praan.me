'use client';

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

interface CertificateTeaserProps {
  onBecomeSaviour: () => void;
}

export default function CertificateTeaser({ onBecomeSaviour }: CertificateTeaserProps) {
  const { ref: sectionRef, hasMounted, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section className="py-24 lg:py-32 px-6 bg-[#3D1F0D] overflow-hidden">
      <div
        ref={sectionRef}
        className={`max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${hasMounted ? `motion-reveal ${isVisible ? 'is-visible' : ''}` : ''}`}
      >
        {/* Left side — text + CTA */}
        <div>
          {/* Small caps label */}
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-amber-300/70 mb-4">
            Your Reward
          </span>

          {/* Heading */}
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Your certificate awaits.
          </h2>

          {/* Subtext */}
          <p className="text-base leading-relaxed text-white/70 mb-8 max-w-md">
            Every saviour gets a personalised certificate. Place a bowl, register, and it&apos;s yours.
          </p>

          {/* Proof lines */}
          <div className="space-y-3 mb-10">
            <div className="flex items-center gap-3">
              <span className="text-amber-300/80 text-sm">✓</span>
              <span className="text-sm text-white/60">Personalised with your name</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-amber-300/80 text-sm">✓</span>
              <span className="text-sm text-white/60">Shareable on Instagram</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-amber-300/80 text-sm">✓</span>
              <span className="text-sm text-white/60">Saviour number assigned</span>
            </div>
          </div>

          {/* CTA — white bg, dark text (inverted) */}
          <button
            onClick={onBecomeSaviour}
            className="motion-cta bg-white text-[#1C1209] font-semibold text-base px-7 py-3.5 rounded-full hover:bg-white/90 transition-colors shadow-sm"
          >
            Place a bowl today
          </button>
        </div>

        {/* Right side — stacked certificate cards */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[400px]">
            {/* Ghost card — behind, slightly offset */}
            <div
              className="absolute inset-0 rounded-xl bg-white/40 border border-white/20"
              style={{
                transform: 'rotate(-2deg) translate(-8px, 8px)',
                opacity: 0.4,
              }}
            />

            {/* Main certificate preview card */}
            <div
              className="relative rounded-xl overflow-hidden"
              style={{
                transform: 'rotate(3deg)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              }}
            >
              <div
                className="p-6 sm:p-8"
                style={{
                  background: '#FAF8F4',
                  border: '3px double #1C1209',
                }}
              >
                {/* Top — Logo */}
                <div className="flex flex-col items-center mb-4">
                  <Image
                    src="/praan-navbar.svg"
                    alt="Praan"
                    width={80}
                    height={22}
                    className="h-5 w-auto mb-1"
                  />
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#7A7468]">
                    A Praan Initiative
                  </span>
                </div>

                {/* Title */}
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="flex-1 h-px bg-[#1C1209]/15" />
                  <h3 className="font-display italic text-sm font-semibold text-[#1C1209] text-center">
                    Saviour Certificate
                  </h3>
                  <div className="flex-1 h-px bg-[#1C1209]/15" />
                </div>

                {/* Name placeholder */}
                <p className="text-center text-[10px] uppercase tracking-wider text-[#7A7468] mb-1">
                  This certifies that
                </p>
                <p className="text-center font-display text-xl font-bold text-[#1C1209] mb-2">
                  Your Name Here
                </p>
                <p className="text-center text-[10px] uppercase tracking-[0.2em] text-[#8B4513] mb-4">
                  Saviour No. ___
                </p>

                {/* Thin rule */}
                <div className="w-12 h-px bg-[#1C1209]/15 mx-auto mb-4" />

                {/* Info cards */}
                <div className="grid grid-cols-3 gap-2 text-center mb-4">
                  <div className="p-2 rounded border border-[#1C1209]/10">
                    <p className="text-[8px] uppercase tracking-wider text-[#7A7468]">Colony</p>
                    <p className="text-[10px] font-semibold text-[#1C1209]">Your Area</p>
                  </div>
                  <div className="p-2 rounded border border-[#1C1209]/10">
                    <p className="text-[8px] uppercase tracking-wider text-[#7A7468]">Station</p>
                    <p className="text-[10px] font-semibold text-[#1C1209]">Bowl</p>
                  </div>
                  <div className="p-2 rounded border border-[#1C1209]/10">
                    <p className="text-[8px] uppercase tracking-wider text-[#7A7468]">Date</p>
                    <p className="text-[10px] font-semibold text-[#1C1209]">2025</p>
                  </div>
                </div>

                {/* Signature */}
                <div className="flex flex-col items-center">
                  <Image
                    src="/akshay-signature.png"
                    alt="Founder signature"
                    width={100}
                    height={40}
                    className="opacity-85 mb-1"
                  />
                  <span className="text-[8px] text-[#7A7468]">Akshay, Founder</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
