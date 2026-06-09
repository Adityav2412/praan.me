'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { BRAND_COPY } from '@/lib/brand';
import Navbar from '@/components/navbar';

export default function FounderPage() {
  const { ref: contentRef, hasMounted, isVisible } = useScrollAnimation({ threshold: 0.05 });

  const handleNavigate = (section: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = `/#${section}`;
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF8F4] overflow-x-hidden">
      {/* Same floating pill navbar as homepage */}
      <Navbar onNavigate={handleNavigate} />

      <section className="relative px-6 md:px-12 lg:px-24 pt-32 pb-24">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors mb-12 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        {/* Main Layout */}
        <div
          ref={contentRef}
          className={`relative max-w-6xl mx-auto ${hasMounted ? `motion-reveal ${isVisible ? 'is-visible' : ''}` : ''}`}
        >
          {/* LEFT CONTENT */}
          <div className="relative z-20 max-w-2xl">
            {/* Heading */}
            <h1 className="font-display text-5xl md:text-7xl font-bold text-text-primary mb-2 leading-none tracking-tight">
              Hello 👋
            </h1>

            {/* Intro */}
            <p className="text-base md:text-lg font-semibold text-text-primary mb-4 md:mb-10">
              I&apos;m Akshay{' '}
              <span className="text-text-muted font-normal">
                ({BRAND_COPY.founderIntro})
              </span>
            </p>

            {/* Mobile portrait — transparent bg, no blend needed */}
            <div className="md:hidden relative mx-auto mb-5 w-[70%] aspect-[4/5] overflow-hidden pointer-events-none select-none">
              <Image
                src="/akshay-blend-transparent.png"
                alt="Akshay - Founder, Praan"
                fill
                priority
                sizes="70vw"
                className="object-contain object-top scale-[1.18]"
              />
            </div>

            {/* Body */}
            <div className="space-y-6 text-text-muted text-base md:text-[17px] leading-[1.95] font-normal">
              <p>
                One evening I saw a news headline about birds dying in
                Delhi&apos;s summer heat — and I couldn&apos;t look away.
              </p>

              <p>
                Something as{' '}
                <strong className="text-text-primary font-semibold">
                  small as a bowl of water
                </strong>{' '}
                could actually keep a living being alive. Something so simple,
                yet so easy to overlook.
              </p>

              <p>
                I know I can&apos;t do it all alone. I can&apos;t go
                everywhere and place water bowls outside. But I will try — as
                many as I can, wherever I can.
              </p>

              <p>
                More importantly, I wanted to{' '}
                <strong className="text-text-primary font-semibold">
                  start something.
                </strong>{' '}
                A small movement that makes more people pause and think —
                maybe I can do this too.
              </p>
            </div>

            {/* Quote */}
            <blockquote className="border-l-[3px] border-accent pl-6 my-10">
              <p className="text-text-primary font-medium italic text-base md:text-[18px] leading-[1.8]">
                If even 10 people start keeping water outside daily because of
                this initiative — for me, this movement is already successful.
              </p>
            </blockquote>

            {/* Divider */}
            <div className="w-10 h-[3px] bg-accent rounded-full mb-10" />

            {/* Why Praan */}
            <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-5">
              Why Praan?
            </h2>

            <div className="space-y-6 text-text-muted text-base md:text-[17px] leading-[1.95] font-normal">
              <p>
                <strong className="text-text-primary font-semibold">Praan</strong> means
                life — and it is the parent platform behind this website.{' '}
                <strong className="text-text-primary font-semibold">
                  Water For Wings
                </strong>{' '}
                is Praan&apos;s first initiative: a community effort to help
                Delhi&apos;s birds survive summer heat.
              </p>

              <p>
                Over time, Praan may host additional initiatives that protect,
                support, or improve life in different ways — each with its own
                focus, united by the same spirit of care.
              </p>

              <p>
                This initiative is not profit-oriented — simply an attempt to
                encourage more people to care for birds through one small
                daily action.
              </p>

              <p>
                And hopefully, over time, the name{' '}
                <strong className="text-text-primary font-semibold">Praan</strong> will
                truly get justified — not only through words, but through the
                lives touched by every initiative we build together.
              </p>
            </div>

            {/* Signature Section */}
            <div className="mt-12 pt-8 border-t border-[var(--border)]">
              <p className="text-text-muted italic text-sm mb-3">
                — with love for Delhi&apos;s birds,
              </p>

              <Image
                src="/akshay-signature.png"
                alt="Akshay Signature"
                width={190}
                height={80}
                className="mb-2 object-contain opacity-95"
              />

              <p className="text-text-primary font-semibold text-base">Akshay</p>

              <p className="text-text-muted text-sm mt-0.5">
                Founder, PRAAN 💙
              </p>
            </div>

            {/* Connect */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="mailto:Akshay1092001@yahoo.com"
                className="motion-cta inline-flex items-center gap-2 bg-[#1A1A18] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#2a2a28] transition-colors"
              >
                Let&apos;s Talk →
              </a>

              <span className="text-[10px] tracking-[0.15em] uppercase text-text-muted/50 font-semibold ml-2">
                Let&apos;s connect
              </span>

              <a
                href="https://instagram.com/akshayyyy.000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-text-muted hover:text-text-primary hover:border-text-primary/30 transition-all"
                aria-label="Instagram"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </a>

              <a
                href="https://linkedin.com/in/akshay-kumar10"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-text-muted hover:text-text-primary hover:border-text-primary/30 transition-all"
                aria-label="LinkedIn"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* RIGHT EDITORIAL PORTRAIT — desktop, transparent bg version */}
          <div className="hidden md:block absolute top-[-120px] right-[-160px] pointer-events-none select-none">
            <div className="relative w-[760px] h-[760px]">
              <Image
                src="/akshay-blend-transparent.png"
                alt="Akshay - Founder, Praan"
                fill
                priority
                className="object-contain object-top"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
