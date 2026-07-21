'use client';
import { ModalProvider } from '@/context/ModalContext';
import { ToastProvider } from '@/context/ToastContext';
import { ReactLenis } from 'lenis/react';

export default function Providers({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.055, duration: 1.8, smoothTouch: true, wheelMultiplier: 0.85, touchMultiplier: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) }}>
      <ModalProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </ModalProvider>
    </ReactLenis>
  );
}
