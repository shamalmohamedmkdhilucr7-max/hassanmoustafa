import { Plus_Jakarta_Sans, Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import BookingModal from '@/components/BookingModal';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300','400','500','600','700','800'],
  display: 'swap',
});
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300','400','500','600'],
  display: 'swap',
});
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400','500','600','700'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://hassanmoustafa.vercel.app'),
  title: {
    default: 'Hassan Moustafa Automotive Care – Sharjah, UAE',
    template: '%s | Hassan Moustafa',
  },
  description: 'Premium automotive workshop in Sharjah, UAE. Engine overhaul, transmission repair, AC service, ECU diagnostics and genuine spare parts.',
  keywords: ['automotive repair', 'Sharjah garage', 'car service UAE', 'engine overhaul', 'ECU diagnostics', 'genuine spare parts', 'German car repair Sharjah'],
  authors: [{ name: 'Hassan Moustafa Automotive Care' }],
  creator: 'Hassan Moustafa Automotive Care',
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: 'https://hassanmoustafa.vercel.app',
    title: 'Hassan Moustafa Automotive Care',
    description: 'Premium automotive workshop in Sharjah, UAE.',
    siteName: 'Hassan Moustafa Automotive Care',
    images: [
      {
        url: '/assets/images/logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'Hassan Moustafa Automotive Care',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hassan Moustafa Automotive Care',
    description: 'Premium automotive workshop in Sharjah, UAE.',
    images: ['/assets/images/logo.jpeg'],
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${plusJakarta.variable} ${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className="bg-surface text-on-surface carbon-detail-bg overflow-x-hidden">
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <FloatingContact />
          <BookingModal />
        </Providers>
      </body>
    </html>
  );
}
