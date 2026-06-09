'use client';

import { useState, useEffect } from 'react';

import Navbar from '@/components/navbar';
import HeroSection from '@/components/hero-section';
import LiveStatsBar from '@/components/live-stats-bar';
import StorySection from '@/components/story-section';
import HowItWorks from '@/components/how-it-works';
import SavioursSection from '@/components/saviours-section';
import AreaLeaderboard from '@/components/area-leaderboard';
import CertificateTeaser from '@/components/certificate-teaser';
import Footer from '@/components/footer';
import FormModal from '@/components/form-modal';
import CertificateModal from '@/components/certificate-modal';

import {
  fetchSaviours,
  type Saviour,
} from '@/lib/storage';

export default function Home() {
  const [formOpen, setFormOpen] = useState(false);
  const [certificateOpen, setCertificateOpen] = useState(false);
  const [newSaviour, setNewSaviour] = useState<Saviour | null>(null);
  const [saviours, setSaviours] = useState<Saviour[]>([]);
  const [saviourCount, setSaviourCount] = useState<number | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('saviourCount');
      return saved ? Number(saved) : null;
    }
    return null;
  });

  // Live sync saviours data
  useEffect(() => {
    const updateData = async () => {
      try {
        const data = await fetchSaviours();
        setSaviours(data);
        setSaviourCount(data.length);
        localStorage.setItem('saviourCount', data.length.toString());
      } catch (error) {
        console.error('Failed to fetch saviours:', error);
      }
    };

    updateData();
    const interval = setInterval(updateData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Listen for 'open-form-modal' custom event from Navbar CTA
  useEffect(() => {
    const handler = () => setFormOpen(true);
    window.addEventListener('open-form-modal', handler);
    return () => window.removeEventListener('open-form-modal', handler);
  }, []);

  const handleBecomeSaviour = () => {
    setFormOpen(true);
  };

  const handleFormSuccess = (saviour: Saviour) => {
    setFormOpen(false);
    setNewSaviour(saviour);
    setCertificateOpen(true);
    setSaviourCount(saviour.saviourNumber);
    localStorage.setItem('saviourCount', saviour.saviourNumber.toString());
  };

  const handleNavigate = (section: string) => {
    // "cta" section triggers form open
    if (section === 'cta') {
      handleBecomeSaviour();
      return;
    }

    const element = document.getElementById(section);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }
  };

  return (
    <>
      <main className="min-h-screen bg-bg-base overflow-x-hidden relative">
        {/* Scattered birds — global decorative elements */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/bird-icon.png"
          alt=""
          className="absolute top-[18%] left-[6%] w-7 h-7 opacity-20 pointer-events-none select-none animate-float-bird z-0"
          style={{ transform: 'rotate(-8deg)' }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/bird-icon.png"
          alt=""
          className="absolute top-[38%] right-[4%] w-10 h-10 opacity-15 pointer-events-none select-none animate-float-bird z-0"
          style={{ animationDelay: '1.5s', transform: 'rotate(12deg) scaleX(-1)' }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/bird-icon.png"
          alt=""
          className="absolute top-[62%] left-[3%] w-6 h-6 opacity-25 pointer-events-none select-none animate-float-bird z-0"
          style={{ animationDelay: '0.8s', transform: 'rotate(-5deg)' }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/bird-icon.png"
          alt=""
          className="absolute top-[78%] right-[7%] w-8 h-8 opacity-18 pointer-events-none select-none animate-float-bird z-0"
          style={{ animationDelay: '2.2s', transform: 'rotate(6deg)' }}
        />

        {/* Nav */}
        <Navbar onNavigate={handleNavigate} />

        {/* Hero */}
        <HeroSection
          onBecomeSaviour={handleBecomeSaviour}
          onNavigate={handleNavigate}
        />

        {/* Live Stats Bar */}
        <LiveStatsBar saviourCount={saviourCount} />

        {/* Story — The Problem + The Solution */}
        <StorySection />

        {/* How It Works */}
        <HowItWorks />

        {/* Saviours */}
        <SavioursSection
          saviours={saviours}
          onBecomeSaviour={handleBecomeSaviour}
        />

        {/* Area Leaderboard */}
        <AreaLeaderboard />

        {/* Certificate Teaser */}
        <CertificateTeaser onBecomeSaviour={handleBecomeSaviour} />

        {/* Footer CTA + Bottom */}
        <Footer onBecomeSaviour={handleBecomeSaviour} />
      </main>

      {/* Form Modal */}
      <FormModal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        onSuccess={handleFormSuccess}
      />

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={certificateOpen}
        onClose={() => setCertificateOpen(false)}
        saviour={newSaviour}
      />
    </>
  );
}
