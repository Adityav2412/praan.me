'use client';



import { useEffect, useState } from 'react';



import { Menu } from 'lucide-react';



import { PraanLogo } from '@/components/brand-labels';

import { SocialIcons } from '@/components/social-icons';

import {

  NAV_ITEMS_LEFT,

  NAV_ITEMS_RIGHT,
} from '@/lib/navigation';



interface NavbarProps {

  onMenuClick: () => void;

  onNavigate: (section: string) => void;

}



const navLinkClass =

  'px-2 xl:px-2.5 py-2 text-cream/75 hover:text-cream text-[10px] xl:text-[11px] 2xl:text-xs uppercase tracking-[0.1em] xl:tracking-[0.12em] font-medium transition-colors whitespace-nowrap';



export default function Navbar({

  onMenuClick,

  onNavigate,

}: NavbarProps) {

  const [scrolled, setScrolled] = useState(false);



  useEffect(() => {

    const handleScroll = () => {

      setScrolled(window.scrollY > 8);

    };



    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);

  }, []);



  const handleFounderMessage = () => {

    window.location.href = '/founders-message';

  };



  return (

    <nav

      className={`fixed top-0 left-0 right-0 z-50 bg-navy transition-shadow duration-300 ${

        scrolled ? 'shadow-lg shadow-navy-dark/30' : ''

      }`}

    >

      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">

        {/* Desktop: split nav + absolutely centered logo */}

        <div className="relative hidden lg:flex items-center h-20">

          <div className="flex items-center gap-0.5 xl:gap-1 flex-1 min-w-0 pr-4 xl:pr-6">

            {NAV_ITEMS_LEFT.map((item) => (

              <button

                key={item.section}

                type="button"

                onClick={() => onNavigate(item.section)}

                className={navLinkClass}

              >

                {item.label}

              </button>

            ))}

          </div>



          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">

            <a

              href="/"

              className="inline-flex items-center justify-center pointer-events-auto"

              aria-label="PRAAN home"

            >

              <PraanLogo

                variant="on-dark"

                className="h-14 xl:h-16 2xl:h-[4.75rem] w-auto min-w-[200px] max-w-[320px] xl:max-w-[400px] 2xl:max-w-[480px]"

                priority

              />

            </a>

          </div>



          <div className="flex items-center justify-end gap-0.5 xl:gap-1 flex-1 min-w-0 pl-4 xl:pl-6">

            {NAV_ITEMS_RIGHT.map((item) => (

              <button

                key={item.section}

                type="button"

                onClick={() => onNavigate(item.section)}

                className={navLinkClass}

              >

                {item.label}

              </button>

            ))}

            <button

              type="button"

              onClick={handleFounderMessage}

              className={navLinkClass}

            >

              Founder&apos;s Message

            </button>

            <SocialIcons

              className="ml-2 xl:ml-3 shrink-0"

              iconClassName="w-[17px] h-[17px] xl:w-[18px] xl:h-[18px]"

            />

          </div>

        </div>



        {/* Mobile / tablet */}

        <div className="grid grid-cols-3 items-center h-14 lg:hidden">

          <div aria-hidden="true" />



          <div className="flex justify-center">

            <a

              href="/"

              className="inline-flex items-center justify-center"

              aria-label="PRAAN home"

            >

              <PraanLogo

                variant="on-dark"

                className="h-7 sm:h-8 w-auto max-w-[160px] sm:max-w-[180px]"

                priority

              />

            </a>

          </div>



          <div className="flex items-center justify-end">

            <button

              type="button"

              onClick={onMenuClick}

              className="p-2 rounded-lg hover:bg-cream/10 transition-colors"

              aria-label="Open menu"

            >

              <Menu className="w-6 h-6 text-cream" />

            </button>

          </div>

        </div>

      </div>

    </nav>

  );

}

