'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import Footer from '@/components/footer';
import SavioursLeaderboard from '@/components/saviours-leaderboard';

export default function SavioursPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigate = (section: string) => {
    window.location.href = `/#${section}`;
  };

  return (
    <>
      <main className="min-h-screen bg-cream overflow-x-hidden">
        <Navbar
          onMenuClick={() => setSidebarOpen(true)}
          onNavigate={handleNavigate}
        />

        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onBecomeSaviour={() => {
            window.location.href = '/';
          }}
          onNavigate={handleNavigate}
        />

        <section className="pt-28 md:pt-32 pb-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-navy/50 hover:text-navy transition-colors mb-8 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden />
              Back to home
            </Link>

            <header className="text-center mb-10 md:mb-12">
              <h1 className="text-4xl md:text-5xl font-extrabold text-navy mb-3">
                Saviours Leaderboard 💙
              </h1>
              <p className="text-navy/70 max-w-2xl mx-auto">
                Every person keeping water out for birds — ranked newest first.
                Search by name or area, or filter by contribution type.
              </p>
            </header>

            <SavioursLeaderboard />
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
