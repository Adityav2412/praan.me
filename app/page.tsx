'use client';

import { useState, useEffect } from 'react';

import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import HeroSection from '@/components/hero-section';
import FormModal from '@/components/form-modal';
import CertificateModal from '@/components/certificate-modal';
import SaviourWall from '@/components/saviour-wall';
import AreaLeaderboard from '@/components/area-leaderboard';
import WhyItMatters from '@/components/why-it-matters';
import ImpactCounter from '@/components/impact-counter';
import Footer from '@/components/footer';
import { BRAND_COPY } from '@/lib/brand';
import { NAVBAR_HEIGHT_PX } from '@/lib/navigation';

import {
  fetchSaviours,
  type Saviour,
} from '@/lib/storage';

export default function Home() {
  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  const [
    formOpen,
    setFormOpen,
  ] = useState(false);

  const [
    certificateOpen,
    setCertificateOpen,
  ] = useState(false);

  const [
    newSaviour,
    setNewSaviour,
  ] = useState<Saviour | null>(
    null
  );

  const [
    saviourCount,
    setSaviourCount,
  ] = useState<number | null>(() => {
    if (
      typeof window !==
      'undefined'
    ) {
      const savedCount =
        localStorage.getItem(
          'saviourCount'
        );

      return savedCount
        ? Number(savedCount)
        : null;
    }

    return null;
  });

  // live sync
  useEffect(() => {
    const updateData =
      async () => {
        try {
          const data =
            await fetchSaviours();

          const latestCount =
            data.length;

          setSaviourCount(
            latestCount
          );

          localStorage.setItem(
            'saviourCount',
            latestCount.toString()
          );
        } catch (error) {
          console.error(
            'Failed to fetch saviours:',
            error
          );
        }
      };

    updateData();

    const interval =
      setInterval(
        updateData,
        3000
      );

    return () =>
      clearInterval(interval);
  }, []);

  const handleBecomeSaviour =
    () => {
      setFormOpen(true);
    };

  const handleFormSuccess = (
    saviour: Saviour
  ) => {
    setFormOpen(false);

    setNewSaviour(
      saviour
    );

    setCertificateOpen(
      true
    );

    // instant UI update
    setSaviourCount(
      saviour.saviourNumber
    );

    localStorage.setItem(
      'saviourCount',
      saviour.saviourNumber.toString()
    );
  };

  const handleNavigate = (
    section: string
  ) => {
    const element =
      document.getElementById(
        section
      );

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
      <main className="min-h-screen bg-cream overflow-x-hidden">

        {/* Navbar */}
        <Navbar
          onMenuClick={() =>
            setSidebarOpen(true)
          }
          onNavigate={handleNavigate}
        />

        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() =>
            setSidebarOpen(false)
          }
          onBecomeSaviour={
            handleBecomeSaviour
          }
          onNavigate={
            handleNavigate
          }
        />

        {/* Hero */}
        <HeroSection
          onBecomeSaviour={
            handleBecomeSaviour
          }
          saviourCount={saviourCount}
        />

        {/* About */}
        <section
          id="about"
          className="pt-24 md:pt-28 pb-16 px-4 bg-cream-dark"
        >
          <div className="max-w-4xl mx-auto text-center">

            <h2 className="text-4xl font-extrabold text-navy mb-6">
              About Water For Wings 🐦
            </h2>

            <p className="text-base text-navy/65 leading-relaxed mb-6 max-w-2xl mx-auto">
              {BRAND_COPY.homeClarity}
            </p>

            <p className="text-lg text-navy/80 leading-relaxed mb-6">
              Every summer,
              Delhi&apos;s
              temperatures soar
              above 45°C. While
              we seek refuge in
              air-conditioned
              spaces, thousands
              of birds struggle
              to find even a drop
              of water.
            </p>

            <p className="text-lg text-navy/80 leading-relaxed">
              <span className="font-bold">
                Water For Wings
              </span>{' '}
              is a
              community-driven
              initiative to
              create a network
              of water stations
              across Delhi.
            </p>
          </div>
        </section>

        <WhyItMatters />

        <SaviourWall />

        <AreaLeaderboard />

        <ImpactCounter
          saviourCount={saviourCount}
        />

        <Footer />
      </main>

      {/* Form Modal */}
      <FormModal
        isOpen={formOpen}
        onClose={() =>
          setFormOpen(false)
        }
        onSuccess={
          handleFormSuccess
        }
      />

      {/* Certificate */}
      <CertificateModal
        isOpen={
          certificateOpen
        }
        onClose={() =>
          setCertificateOpen(
            false
          )
        }
        saviour={newSaviour}
      />
    </>
  );
}
