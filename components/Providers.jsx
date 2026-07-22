'use client';
import { useEffect } from 'react';
import { ModalProvider } from '@/context/ModalContext';
import { ToastProvider } from '@/context/ToastContext';
import { ReactLenis, useLenis } from 'lenis/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import CookieBanner from './CookieBanner';

gsap.registerPlugin(ScrollTrigger);

function GSAPSync() {
  useLenis(ScrollTrigger.update);
  useEffect(() => {
    gsap.ticker.add((time) => {
      // Lenis is root, but we can disable GSAP's built-in lag smoothing 
      // so it doesn't conflict with Lenis
    });
    gsap.ticker.lagSmoothing(0);
  }, []);
  return null;
}

export default function Providers({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.08, smoothTouch: true, wheelMultiplier: 1.0, touchMultiplier: 2.0 }}>
      <GSAPSync />
      <ModalProvider>
        <ToastProvider>
          {children}
          <CookieBanner />
        </ToastProvider>
      </ModalProvider>
    </ReactLenis>
  );
}
