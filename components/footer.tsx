'use client';

import {
  PraanLogo,
  BrandTagline,
  BrandStatement,
  FooterInitiativeBlock,
} from '@/components/brand-labels';
import { SocialIcons } from '@/components/social-icons';
import { BRAND, currentInitiative } from '@/lib/brand';

export default function Footer() {
  return (
    <footer className="bg-navy text-cream py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <PraanLogo className="h-9 sm:h-10 w-auto max-w-[220px] mx-auto mb-5" variant="on-dark" />

        <BrandTagline variant="dark" className="mb-4" />

        <BrandStatement variant="dark" className="mb-8" />

        <FooterInitiativeBlock className="mb-6" />

        <p className="text-cream/80 mb-4 text-lg leading-relaxed">
          Saving Delhi&apos;s birds, One water station is all it takes.
        </p>

        <p className="text-cream/60 mb-2">praan.me</p>

        <p className="text-navy-light font-semibold mb-6">
          #DelhiBirdsNeedWater
        </p>

        <SocialIcons
          className="justify-center mb-8"
          iconClassName="w-7 h-7"
        />

        <p className="text-cream/50 text-sm">
          © 2026 {BRAND.platform}. {currentInitiative.name} is our first
          initiative. Made with 💙 for Delhi&apos;s birds.
        </p>
      </div>
    </footer>
  );
}
