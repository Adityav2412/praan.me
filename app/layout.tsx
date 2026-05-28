import type {
  Metadata,
  Viewport,
} from 'next';

import {
  Poppins,
  Montserrat,
} from 'next/font/google';

import Script from 'next/script';

import { Analytics } from '@vercel/analytics/next';

import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: [
    '400',
    '500',
    '600',
    '700',
    '800',
  ],
  variable:
    '--font-poppins',
  display: 'swap',
});

const montserrat =
  Montserrat({
    subsets: ['latin'],
    weight: [
      '400',
      '500',
      '600',
      '700',
    ],
    variable:
      '--font-montserrat',
    display: 'swap',
  });

export const metadata: Metadata =
  {
    metadataBase: new URL(
      'https://www.praan.me'
    ),

    title: {
      default:
        'Water For Wings',
      template:
        '%s | Water For Wings',
    },

    description:
      'Join Water For Wings and help birds survive Delhi’s extreme summer heat by placing water stations across the city.',

    keywords: [
      'Water For Wings',
      'Save Birds Delhi',
      'Delhi Birds',
      'Bird Water Bowl',
      'Bird Water Station',
      'Delhi Summer',
      'Help Birds',
      'Bird Rescue',
      'Water for Birds',
      'Birds Need Water',
    ],

    authors: [
      {
        name: 'Water For Wings',
      },
    ],

    creator:
      'Water For Wings',

    publisher:
      'Water For Wings',

    applicationName:
      'Water For Wings',

    category:
      'Environment',

    openGraph: {
      title:
        'Water For Wings',

      description:
        'Help birds survive Delhi’s deadly summer heat. Become a Saviour today.',

      url: 'https://www.praan.me',

      siteName:
        'Water For Wings',

      locale: 'en_IN',

      type: 'website',

      images: [
        {
          url: '/android-chrome-512x512.png',
          width: 512,
          height: 512,
          alt: 'Water For Wings',
        },
      ],
    },

    twitter: {
      card:
        'summary_large_image',

      title:
        'Water For Wings',

      description:
        'Place water stations across Delhi and help save birds this summer.',

      creator:
        '@waterforwings',

      images: [
        '/android-chrome-512x512.png',
      ],
    },

    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,
        'max-video-preview':
          -1,
        'max-image-preview':
          'large',
        'max-snippet': -1,
      },
    },

    icons: {
      icon: [
        {
          url: '/favicon.ico',
        },
        {
          url: '/favicon-16x16.png',
          sizes:
            '16x16',
          type: 'image/png',
        },
        {
          url: '/favicon-32x32.png',
          sizes:
            '32x32',
          type: 'image/png',
        },
      ],

      apple:
        '/apple-touch-icon.png',

      shortcut:
        '/favicon.ico',
    },

    manifest:
      '/site.webmanifest',
  };

export const viewport: Viewport =
  {
    themeColor:
      '#1B3A6B',
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${montserrat.variable}`}
    >
      <body className="font-sans antialiased bg-cream">

        {children}

        {/* Microsoft Clarity */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
        >
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "wy2vj0utmw");
          `}
        </Script>

        {/* Vercel Analytics */}
        {process.env
          .NODE_ENV ===
          'production' && (
          <Analytics />
        )}

      </body>
    </html>
  );
}
