'use client';
import { ModalProvider } from '@/context/ModalContext';
import { ToastProvider } from '@/context/ToastContext';
import { ReactLenis } from 'lenis/react';

export default function Providers({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.12, smoothTouch: true, wheelMultiplier: 1.0, touchMultiplier: 2.0 }}>
      <ModalProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </ModalProvider>
    </ReactLenis>
  );
}
