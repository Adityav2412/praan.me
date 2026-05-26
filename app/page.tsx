'use client';

import { useState, useEffect } from 'react';
import AnnouncementTicker from '@/components/announcement-ticker';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import HeroSection from '@/components/hero-section';
import FormModal from '@/components/form-modal';
import CertificateModal from '@/components/certificate-modal';
import SaviourWall from '@/components/saviour-wall';
import AreaLeaderboard from '@/components/area-leaderboard';
import WhyItMatters from '@/components/why-it-matters';
import DailyReminder from '@/components/daily-reminder';
import Footer from '@/components/footer';
import { getSaviourCount, type Saviour } from '@/lib/storage';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [certificateOpen, setCertificateOpen] = useState(false);
  const [newSaviour, setNewSaviour] = useState<Saviour | null>(null);
  const [saviourCount, setSaviourCount] = useState(0);

  // Load saviour count on mount
  useEffect(() => {
    const updateCount = () => setSaviourCount(getSaviourCount());
    updateCount();
    const interval = setInterval(updateCount, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleBecomeSaviour = () => {
    setFormOpen(true);
  };

  const handleFormSuccess = (saviour: Saviour) => {
    setFormOpen(false);
    setNewSaviour(saviour);
    setCertificateOpen(true);
    setSaviourCount(prev => prev + 1);
  };

  const handleNavigate = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <main className="min-h-screen bg-cream">
      {/* Announcement Ticker */}
      <AnnouncementTicker />

      {/* Navbar */}
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onBecomeSaviour={handleBecomeSaviour}
        onNavigate={handleNavigate}
      />

      {/* Hero Section */}
      <HeroSection
        onBecomeSaviour={handleBecomeSaviour}
        saviourCount={saviourCount}
      />

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-cream-dark">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-navy mb-6">
            About Water For Wings 🐦
          </h2>
          <p className="text-lg text-navy/80 leading-relaxed mb-6">
            Every summer, Delhi&apos;s temperatures soar above 45°C. While we seek refuge in air-conditioned 
            spaces, thousands of birds struggle to find even a drop of water. Many succumb to dehydration 
            and heat stroke.
          </p>
          <p className="text-lg text-navy/80 leading-relaxed">
            <span className="font-bold">Water For Wings</span> is a community-driven initiative to create 
            a network of water stations across Delhi. One bowl of water can save dozens of birds daily. 
            Together, we can make Delhi a haven for our feathered friends.
          </p>
        </div>
      </section>

      {/* Why It Matters */}
      <WhyItMatters />

      {/* Saviour Wall */}
      <SaviourWall />

      {/* Area Leaderboard */}
      <AreaLeaderboard />

      {/* Daily Reminder */}
      <DailyReminder />

      {/* Footer */}
      <Footer />
      </main>

      {/* Form Modal - outside main for proper z-index stacking */}
      <FormModal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        onSuccess={handleFormSuccess}
      />

      {/* Certificate Modal - outside main for proper z-index stacking */}
      <CertificateModal
        isOpen={certificateOpen}
        onClose={() => setCertificateOpen(false)}
        saviour={newSaviour}
      />
    </>
  );
}
