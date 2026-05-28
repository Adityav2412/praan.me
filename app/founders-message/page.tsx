'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

import AnnouncementTicker from '@/components/announcement-ticker';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import Footer from '@/components/footer';

export default function FoundersMessagePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigate = (section: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = `/#${section}`;
    }
  };

  return (
    <>
      <main className="min-h-screen bg-cream overflow-hidden">
        <AnnouncementTicker />

        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onBecomeSaviour={() => {
            window.location.href = '/';
          }}
          onNavigate={handleNavigate}
        />

        <section className="relative min-h-screen bg-cream px-6 md:px-12 lg:px-24 pt-36 pb-24">

          {/* Back */}
          <a
            href="/"
            className="inline-flex items-center gap-2 text-navy/50 hover:text-navy transition-colors mb-12 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </a>

          {/* Main Grid */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_260px] lg:grid-cols-[1fr_320px] gap-10 items-start">

            {/* Left — Content */}
            <div className="relative z-20">

              {/* Hello heading */}
              <h1 className="text-5xl md:text-6xl font-black text-navy mb-2 leading-tight">
                Hello 👋
              </h1>

              {/* Intro line */}
              <p className="text-base md:text-lg font-bold text-navy mb-8">
                I&apos;m Akshay{' '}
                <span className="text-navy/50 font-normal">
                  (the person behind Water For Wings)
                </span>
              </p>

              {/* Body paragraphs */}
              <div className="space-y-5 text-navy/80 text-base md:text-[17px] leading-[1.9] font-normal">
                <p>
                  One evening I saw a news headline about birds dying in Delhi&apos;s summer heat — and I couldn&apos;t look away.
                </p>

                <p>
                  Something as{' '}
                  <strong className="text-navy font-bold">
                    small as a bowl of water
                  </strong>{' '}
                  could actually keep a living being alive. Something so simple, yet so easy to overlook.
                </p>

                <p>
                  I know I can&apos;t do it all alone. I can&apos;t go everywhere and place water bowls outside. But I will try — as many as I can, wherever I can.
                </p>

                <p>
                  More importantly, I wanted to{' '}
                  <strong className="text-navy font-bold">
                    start something.
                  </strong>{' '}
                  A small movement that makes more people pause and think — maybe I can do this too.
                </p>
              </div>

              {/* Quote */}
              <blockquote className="border-l-[3px] border-navy pl-5 my-8">
                <p className="text-navy font-semibold italic text-base md:text-[17px] leading-[1.85]">
                  If even 10 people start keeping water outside daily because of this initiative — for me, this movement is already successful.
                </p>
              </blockquote>

              {/* Divider */}
              <div className="w-9 h-[3px] bg-navy rounded-full mb-8" />

              {/* Why Praan */}
              <h2 className="text-xl md:text-2xl font-black text-navy mb-4">
                Why <span className="font-black">Praan</span>?
              </h2>

              <div className="space-y-5 text-navy/80 text-base md:text-[17px] leading-[1.9] font-normal">
                <p>
                  <strong className="text-navy font-bold">Praan</strong> means life. Water For Wings is just the first movement I wanted to start through this platform. In the future, I hope to create more meaningful initiatives that help protect, support, or improve life in different ways.
                </p>

                <p>
                  This initiative is not profit-oriented — simply an attempt to encourage more people to care for birds through one small daily action.
                </p>

                <p>
                  And hopefully, over time, the name{' '}
                  <strong className="text-navy font-bold">Praan</strong> will truly get justified.
                </p>
              </div>

              {/* Signature */}
              <div className="mt-10 pt-8 border-t border-navy/10">
                <p className="text-navy/50 italic text-sm mb-2">
                  — with love for Delhi&apos;s birds,
                </p>

                <svg
                  width="180"
                  height="65"
                  viewBox="0 0 180 65"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-3"
                >
                  <path
                    d="M8 42 C12 28 16 18 20 28 C23 36 21 46 25 33 C29 20 33 16 37 28 C40 38 39 46 44 32 C49 16 53 38 57 36 C61 34 64 24 69 36 C73 46 71 50 77 38 C83 24 88 20 93 34 C97 44 95 50 101 37 C108 22 114 32 119 40 C124 48 121 52 128 42 C136 30 140 26 148 36 C154 44 152 50 160 40"
                    stroke="#1B3A6B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 54 C50 58 110 59 162 53"
                    stroke="#1B3A6B"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    opacity="0.25"
                  />
                </svg>

                <p className="text-navy font-bold text-base">
                  Akshay
                </p>

                <p className="text-navy/50 text-sm mt-0.5">
                  Founder, Water For Wings 💙
                </p>
              </div>

              {/* Connect */}
              <div className="mt-8 flex flex-wrap items-center gap-4">

                <a
                  href="mailto:Akshay1092001@yahoo.com"
                  className="inline-flex items-center gap-2 bg-navy text-cream text-sm font-semibold px-6 py-3 rounded-full hover:bg-navy-dark transition-colors"
                >
                  Let&apos;s Talk →
                </a>

                <span className="text-[10px] tracking-[0.15em] uppercase text-navy/30 font-semibold ml-2">
                  Let&apos;s connect
                </span>

                <a
                  href="https://instagram.com/akshayyyy.000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-navy/20 flex items-center justify-center text-navy/60 hover:text-navy hover:border-navy/50 transition-all"
                  aria-label="Instagram"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>

                <a
                  href="https://linkedin.com/in/akshay-kumar10"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-navy/20 flex items-center justify-center text-navy/60 hover:text-navy hover:border-navy/50 transition-all"
                  aria-label="LinkedIn"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>

                <a
                  href="https://x.com/waterforwings"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-navy/20 flex items-center justify-center text-navy/60 hover:text-navy hover:border-navy/50 transition-all"
                  aria-label="X"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
                  </svg>
                </a>

                <a
                  href="mailto:Akshay1092001@yahoo.com"
                  className="w-9 h-9 rounded-full border border-navy/20 flex items-center justify-center text-navy/60 hover:text-navy hover:border-navy/50 transition-all"
                  aria-label="Email"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M2 7l10 7 10-7" />
                  </svg>
                </a>

              </div>
            </div>

            {/* Right — Editorial Portrait */}
            <div className="hidden md:block relative">

              <div className="absolute top-[-20px] right-[-80px] w-[620px] h-[760px] opacity-[0.97]">

                <Image
                  src="/akshay-blend.png"
                  alt="Akshay - Founder, Water For Wings"
                  fill
                  priority
                  className="object-contain object-top"
                />

              </div>

            </div>

          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
