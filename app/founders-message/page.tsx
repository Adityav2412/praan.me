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
<> <main className="min-h-screen bg-cream overflow-hidden"> <AnnouncementTicker />

```
    <Navbar onMenuClick={() => setSidebarOpen(true)} />

    <Sidebar
      isOpen={sidebarOpen}
      onClose={() => setSidebarOpen(false)}
      onBecomeSaviour={() => {
        window.location.href = '/';
      }}
      onNavigate={handleNavigate}
    />

    <section className="relative min-h-screen bg-cream px-6 md:px-12 lg:px-24 pt-32 pb-24">

      {/* Back */}
      <a
        href="/"
        className="inline-flex items-center gap-2 text-navy/50 hover:text-navy transition-colors mb-12 text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </a>

      {/* Main Layout */}
      <div className="relative max-w-6xl mx-auto">

        {/* Left Content */}
        <div className="relative z-20 max-w-2xl">

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-black text-navy mb-2 leading-none tracking-tight">
            Hello 👋
          </h1>

          {/* Intro */}
          <p className="text-base md:text-lg font-bold text-navy mb-10">
            I&apos;m Akshay{' '}
            <span className="text-navy/50 font-normal">
              (the person behind Water For Wings)
            </span>
          </p>

          {/* Content */}
          <div className="space-y-6 text-navy/80 text-base md:text-[17px] leading-[1.95] font-normal">

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
          <blockquote className="border-l-[3px] border-navy pl-6 my-10">
            <p className="text-navy font-semibold italic text-base md:text-[18px] leading-[1.8]">
              If even 10 people start keeping water outside daily because of this initiative — for me, this movement is already successful.
            </p>
          </blockquote>

          {/* Divider */}
          <div className="w-10 h-[3px] bg-navy rounded-full mb-10" />

          {/* Why Praan */}
          <h2 className="text-2xl md:text-3xl font-black text-navy mb-5">
            Why Praan?
          </h2>

          <div className="space-y-6 text-navy/80 text-base md:text-[17px] leading-[1.95] font-normal">

            <p>
              <strong className="text-navy font-bold">
                Praan
              </strong>{' '}
              means life. Water For Wings is just the first movement I wanted to start through this platform. In the future, I hope to create more meaningful initiatives that help protect, support, or improve life in different ways.
            </p>

            <p>
              This initiative is not profit-oriented — simply an attempt to encourage more people to care for birds through one small daily action.
            </p>

            <p>
              And hopefully, over time, the name{' '}
              <strong className="text-navy font-bold">
                Praan
              </strong>{' '}
              will truly get justified.
            </p>

          </div>

          {/* Signature */}
          <div className="mt-12 pt-8 border-t border-navy/10">

            <p className="text-navy/50 italic text-sm mb-3">
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
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </a>

            <a
              href="https://linkedin.com/in/akshay-kumar10"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-navy/20 flex items-center justify-center text-navy/60 hover:text-navy hover:border-navy/50 transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>

          </div>

        </div>

        {/* Editorial Portrait */}
        <div className="hidden md:block absolute top-[-120px] right-[-160px] pointer-events-none select-none">

          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-cream via-cream/60 to-transparent blur-3xl opacity-80 scale-110" />

          {/* Image */}
          <div className="relative w-[760px] h-[760px] opacity-[0.92]">

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
```

);
}
