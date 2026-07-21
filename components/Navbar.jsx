'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useModal } from '@/context/ModalContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/spare-parts', label: 'Spare Parts' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openModal } = useModal();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('overflow-hidden', menuOpen);
    return () => document.documentElement.classList.remove('overflow-hidden');
  }, [menuOpen]);

  return (
    <>
      <nav className={`fixed top-0 w-full z-40 nav-glass ${scrolled ? 'scrolled' : ''}`}>
        <div className="flex justify-between items-center px-gutter py-4 max-w-[1440px] mx-auto" style={{ padding: '1rem 32px' }}>
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <img alt="Hassan Moustafa" className="h-14 md:h-20 w-auto object-contain rounded-xl shadow-lg border border-white/10" src="/assets/images/logo-3d.jpeg" width={80} height={80} />
          </Link>
          <div className="hidden lg:flex items-center gap-9">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                className={`text-xs tracking-[0.15em] uppercase font-semibold transition-colors duration-300 font-mono ${pathname === link.href ? 'text-secondary-container' : 'text-on-surface-variant hover:text-white'}`}>
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setMenuOpen(true)}
              className="lg:hidden touch-target-safe text-on-surface-variant hover:text-white transition-colors"
              aria-label="Open navigation menu" aria-expanded={menuOpen}>
              <span className="material-symbols-outlined" style={{ fontSize: 26 }}>menu</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-500 ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{ backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }} />

      {/* Mobile drawer */}
      <div className={`fixed inset-y-0 right-0 z-50 w-[min(320px,90vw)] flex flex-col justify-between border-l border-white/[0.08] p-8 shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ background: 'rgba(12,12,14,0.88)', backdropFilter: 'blur(28px) saturate(200%)', WebkitBackdropFilter: 'blur(28px) saturate(200%)' }}
        role="dialog" aria-modal="true" aria-label="Mobile navigation">
        <div>
          <div className="flex justify-between items-center mb-12">
            <img alt="Logo" className="h-12 w-auto rounded-lg shadow-lg border border-white/10" src="/assets/images/logo-3d.jpeg" width={48} height={48} />
            <button onClick={() => setMenuOpen(false)} className="touch-target-safe text-on-surface-variant hover:text-white transition-colors" aria-label="Close navigation menu">
              <span className="material-symbols-outlined" style={{ fontSize: 24 }}>close</span>
            </button>
          </div>
          <nav className="flex flex-col gap-6">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                className={`text-2xl font-bold font-display hover:text-secondary-container transition-colors duration-300 py-1 ${pathname === link.href ? 'text-secondary-container' : ''}`}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="pt-8 border-t border-white/[0.08]">
          <button onClick={() => { setMenuOpen(false); openModal(); }}
            className="block w-full text-center btn-primary-luxury py-3.5 rounded-xl text-[10px] uppercase tracking-[0.2em] font-bold">
            Book Appointment
          </button>
        </div>
      </div>
    </>
  );
}
