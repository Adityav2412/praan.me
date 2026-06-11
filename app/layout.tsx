import type {
  Metadata,
  Viewport,
} from 'next';

import {
  Playfair_Display,
  DM_Sans,
} from 'next/font/google';

import { Analytics } from '@vercel/analytics/next';

import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.praan.me'),

  title: {
    default: 'Praan | Water For Wings',
    template: '%s | Praan',
  },

  description:
    "Praan is a platform for meaningful community initiatives. Join Water For Wings — our first initiative — and help birds survive Delhi's extreme summer heat.",

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

  authors: [{ name: 'Praan' }],
  creator: 'Praan',
  publisher: 'Praan',
  applicationName: 'Praan',
  category: 'Environment',

  openGraph: {
    title: 'Praan | Water For Wings',
    description:
      "Praan turns kindness into action. Join Water For Wings and help birds survive Delhi's deadly summer heat.",
    url: 'https://www.praan.me',
    siteName: 'Praan',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: 'Praan — Water For Wings',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Praan | Water For Wings',
    description:
      "Praan is a platform for community initiatives. Water For Wings helps save Delhi's birds this summer.",
    creator: '@waterforwings',
    images: ['/android-chrome-512x512.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#FAF8F4',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable}`}
    >
      <head>
        {/* Microsoft Clarity */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "wy2vj0utmw");
            `,
          }}
        />
      </head>

      <body className="font-body antialiased bg-bg-base text-text-primary">
        {children}

        {/* Vercel Analytics */}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}
