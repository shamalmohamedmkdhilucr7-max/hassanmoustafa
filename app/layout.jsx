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
  title: 'Hassan Moustafa Automotive Care – Sharjah, UAE',
  description: 'Premium automotive workshop in Sharjah, UAE. Engine overhaul, transmission repair, AC service, ECU diagnostics and genuine spare parts.',
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
