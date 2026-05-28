'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

import AnnouncementTicker from '@/components/announcement-ticker';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import Footer from '@/components/footer';

export default function FoundersMessagePage() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const handleNavigate = (
    section: string
  ) => {
    if (
      typeof window !==
      'undefined'
    ) {
      window.location.href =
        `/#${section}`;
    }
  };

  return (
    <>
      <main className="min-h-screen bg-cream overflow-hidden">

        <AnnouncementTicker />

        <Navbar
          onMenuClick={() =>
            setSidebarOpen(true)
          }
        />

        <Sidebar
          isOpen={sidebarOpen}
          onClose={() =>
            setSidebarOpen(false)
          }
          onBecomeSaviour={() => {
            window.location.href =
              '/';
          }}
          onNavigate={
            handleNavigate
          }
        />

        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">

          {/* Background */}
          <div className="absolute inset-0">

            <div className="absolute inset-0 bg-gradient-to-b from-[#87CEEB] via-[#B0E0E6] to-[#FFE4B5]" />

            <div className="absolute inset-0 bg-gradient-to-t from-cream/30 to-transparent" />

            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-gradient-radial from-yellow-200/50 via-orange-200/20 to-transparent rounded-full blur-3xl" />

          </div>

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto text-center pt-32 pb-20">

            {/* Heading */}
            <div className="mb-12">

              <h1 className="text-4xl md:text-6xl font-extrabold text-navy uppercase mb-5 leading-tight">
                Founder&apos;s Message
              </h1>

              <h2 className="text-2xl md:text-4xl font-bold text-navy/80 leading-relaxed">
                Why I Started Water For Wings?
              </h2>

            </div>

            {/* Main Message */}
            <div className="bg-cream/80 backdrop-blur-md border border-white/40 rounded-3xl px-6 md:px-10 py-8 md:py-10 shadow-xl text-left">

              <div className="space-y-6 text-navy/85 text-lg leading-relaxed font-medium">

                <p>
                  I&apos;m Akshay — a
                  24-year-old from
                  New Delhi, who one
                  evening saw a news
                  headline and
                  couldn&apos;t look
                  away.
                </p>

                <p>
                  Birds are
                  suffering and
                  dying in the
                  extreme heat. And
                  I kept coming back
                  to one thought —
                  something as small
                  as a bowl of water
                  could actually
                  keep a living
                  being alive.
                  Something so
                  simple, yet so
                  easy to overlook.
                </p>

                <p>
                  I know I can&apos;t
                  do it all alone.
                  I can&apos;t go
                  everywhere and
                  place water bowls
                  outside. But I
                  will try — as many
                  as I can, wherever
                  I can.
                </p>

                <p>
                  More importantly,
                  I wanted to start
                  something. A small
                  movement that
                  makes more people
                  pause and think —
                  maybe I can do
                  this too.
                </p>

              </div>
            </div>

            {/* Highlight Card */}
            <div className="mt-10 max-w-3xl mx-auto bg-white/55 backdrop-blur-md border border-white/40 rounded-3xl px-6 py-6 shadow-xl">

              <p className="text-xl md:text-2xl font-bold text-navy leading-relaxed">
                If even 10 people
                start keeping water
                outside daily
                because of this
                initiative, then
                for me, this
                movement is already
                successful.
              </p>

            </div>

            {/* Why Praan */}
            <div className="mt-20 bg-cream/80 backdrop-blur-md border border-white/40 rounded-3xl px-6 md:px-10 py-8 md:py-10 shadow-xl text-left">

              <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-6">
                Why{' '}
                <span className="font-black">
                  Praan
                </span>
                ?
              </h2>

              <div className="space-y-6 text-navy/85 text-lg leading-relaxed font-medium">

                <p>
                  I know some of
                  you might be
                  wondering — if
                  the initiative is
                  called Water For
                  Wings, then why
                  is the website URL
                  called{' '}
                  <span className="font-bold">
                    Praan
                  </span>
                  ?
                </p>

                <p>
                  The reason is
                  simple.
                </p>

                <p>
                  <span className="font-bold">
                    Praan
                  </span>{' '}
                  means life.
                </p>

                <p>
                  Water For Wings
                  is just the first
                  movement I wanted
                  to start through
                  this platform. In
                  the future, I
                  hope to create
                  more meaningful
                  initiatives and
                  movements that
                  help protect,
                  support, or
                  improve life in
                  different ways.
                </p>

                <p>
                  And hopefully,
                  over time, that
                  will truly justify
                  the name{' '}
                  <span className="font-bold">
                    Praan
                  </span>
                  .
                </p>

              </div>
            </div>

            {/* Closing */}
            <div className="mt-20 text-center">

              <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-6">
                This Is Just A Start
              </h2>

              <p className="text-lg md:text-xl text-navy/80 leading-relaxed font-medium max-w-3xl mx-auto">
                This initiative is
                not profit-oriented.
                It&apos;s simply an
                attempt to encourage
                more people to care
                for birds through
                one small daily
                action that can
                genuinely make a
                difference.
              </p>

            </div>

            {/* Contact */}
            <div className="mt-24">

              <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">
                Let&apos;s Connect
              </h2>

              <p className="text-navy/75 text-lg mb-10">
                You can always
                reach out to me for
                feedback,
                suggestions, or if
                you simply want to
                support the
                movement.
              </p>

              <div className="grid md:grid-cols-3 gap-5">

                {/* Email */}
                <a
                  href="mailto:Akshay1092001@yahoo.com"
                  className="bg-cream/80 backdrop-blur-md border border-white/40 rounded-2xl px-6 py-10 shadow-lg hover:scale-105 transition-all text-center flex flex-col items-center justify-center"
                >

                  <svg
                    className="w-12 h-12 mb-5"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="48"
                      height="48"
                      rx="8"
                      fill="#1B3A6B"
                    />

                    <path
                      d="M10 16a2 2 0 012-2h24a2 2 0 012 2v16a2 2 0 01-2 2H12a2 2 0 01-2-2V16z"
                      fill="white"
                    />

                    <path
                      d="M10 16l14 10 14-10"
                      stroke="#1B3A6B"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>

                  <p className="text-2xl font-bold text-navy">
                    Email
                  </p>

                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/akshay-kumar10"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-cream/80 backdrop-blur-md border border-white/40 rounded-2xl px-6 py-10 shadow-lg hover:scale-105 transition-all text-center flex flex-col items-center justify-center"
                >

                  <svg
                    className="w-12 h-12 mb-5"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="48"
                      height="48"
                      rx="8"
                      fill="#0A66C2"
                    />

                    <path
                      d="M16 20h-4v12h4V20zm-2-6a2 2 0 100 4 2 2 0 000-4zm18 6c-2 0-3.5.8-4 2v-2h-4v12h4v-6c0-1.5 1-2.5 2.5-2.5S33 24.5 33 26v6h4v-7c0-3-2-5-5-5z"
                      fill="white"
                    />
                  </svg>

                  <p className="text-2xl font-bold text-navy">
                    LinkedIn
                  </p>

                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/akshayyyy.000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-cream/80 backdrop-blur-md border border-white/40 rounded-2xl px-6 py-10 shadow-lg hover:scale-105 transition-all text-center flex flex-col items-center justify-center"
                >

                  <svg
                    className="w-12 h-12 mb-5"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                  >

                    <defs>
                      <radialGradient
                        id="ig-grad"
                        cx="30%"
                        cy="107%"
                        r="150%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#fdf497"
                        />

                        <stop
                          offset="20%"
                          stopColor="#fd5949"
                        />

                        <stop
                          offset="60%"
                          stopColor="#d6249f"
                        />

                        <stop
                          offset="100%"
                          stopColor="#285AEB"
                        />
                      </radialGradient>
                    </defs>

                    <rect
                      width="48"
                      height="48"
                      rx="10"
                      fill="url(#ig-grad)"
                    />

                    <rect
                      x="13"
                      y="13"
                      width="22"
                      height="22"
                      rx="6"
                      stroke="white"
                      strokeWidth="2.5"
                      fill="none"
                    />

                    <circle
                      cx="24"
                      cy="24"
                      r="5.5"
                      stroke="white"
                      strokeWidth="2.5"
                      fill="none"
                    />

                    <circle
                      cx="31.5"
                      cy="16.5"
                      r="1.5"
                      fill="white"
                    />

                  </svg>

                  <p className="text-2xl font-bold text-navy">
                    Instagram
                  </p>

                </a>

              </div>

            </div>

            {/* Back To Home */}
            <div className="text-center pt-16">

              <a
                href="/"
                className="inline-flex items-center gap-2 text-navy/70 hover:text-navy transition-colors text-lg font-medium"
              >
                <ArrowLeft className="w-5 h-5" />

                Back to Water For Wings
              </a>

            </div>

          </div>

        </section>

        <Footer />

      </main>
    </>
  );
}
