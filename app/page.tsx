'use client';

import { useState, useEffect } from 'react';

import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import HeroSection from '@/components/hero-section';
import LiveStatsBar from '@/components/live-stats-bar';
import StorySection from '@/components/story-section';
import HowItWorks from '@/components/why-it-matters';
import SaviourWall from '@/components/saviour-wall';
import Footer from '@/components/footer';
import FormModal from '@/components/form-modal';
import CertificateModal from '@/components/certificate-modal';
import { NAVBAR_HEIGHT_PX } from '@/lib/navigation';

import {
  fetchSaviours,
  type Saviour,
} from '@/lib/storage';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [certificateOpen, setCertificateOpen] = useState(false);
  const [newSaviour, setNewSaviour] = useState<Saviour | null>(null);
  const [saviourCount, setSaviourCount] = useState<number | null>(() => {
    if (typeof window !== 'undefined') {
      const savedCount = localStorage.getItem('saviourCount');
      return savedCount ? Number(savedCount) : null;
    }
    return null;
  });

  // live sync
  useEffect(() => {
    const updateData = async () => {
      try {
        const data = await fetchSaviours();
        const latestCount = data.length;
        setSaviourCount(latestCount);
        localStorage.setItem('saviourCount', latestCount.toString());
      } catch (error) {
        console.error('Failed to fetch saviours:', error);
      }
    };

    updateData();
    const interval = setInterval(updateData, 3000);
    return () => clearInterval(interval);
  }, []);

  // Listen for custom event from navbar CTA
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
    const element = document.getElementById(section);
    if (element) {
      const y =
        element.getBoundingClientRect().top +
        window.scrollY -
        NAVBAR_HEIGHT_PX;
      window.scrollTo({
        top: Math.max(0, y),
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <main className="min-h-screen bg-[var(--bg-base)] overflow-x-hidden">
        {/* Navbar */}
        <Navbar
          onMenuClick={() => setSidebarOpen(true)}
          onNavigate={handleNavigate}
        />

        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onBecomeSaviour={handleBecomeSaviour}
          onNavigate={handleNavigate}
        />

        {/* Hero */}
        <HeroSection onBecomeSaviour={handleBecomeSaviour} />

        {/* Live Stats Bar */}
        <LiveStatsBar saviourCount={saviourCount} />

        {/* The Problem */}
        <StorySection
          id="about"
          heading="The Problem"
          text="Every summer, Delhi's temperatures soar above 45 degrees C. While we seek refuge indoors, thousands of birds struggle to find even a drop of water. Ponds have dried up, lakes have been paved over, and natural water sources are vanishing from the city."
          imagePosition="left"
        />

        {/* The Solution */}
        <StorySection
          heading="The Solution"
          text="A single bowl of fresh water outside your home can hydrate dozens of birds each day. Water For Wings is building a network of water stations across Delhi, one household at a time. No cost, no commitment, just a bowl and a little kindness."
          imagePosition="right"
        />

        {/* How It Works */}
        <HowItWorks />

        {/* Saviours Wall */}
        <SaviourWall onBecomeSaviour={handleBecomeSaviour} />

        {/* Footer */}
        <Footer onBecomeSaviour={handleBecomeSaviour} />
      </main>

      {/* Form Modal */}
      <FormModal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        onSuccess={handleFormSuccess}
      />

      {/* Certificate */}
      <CertificateModal
        isOpen={certificateOpen}
        onClose={() => setCertificateOpen(false)}
        saviour={newSaviour}
      />
    </>
  );
}
