'use client';
import { useModal } from '@/context/ModalContext';
import { useToast } from '@/context/ToastContext';
import { useEffect, useRef } from 'react';

export default function BookingModal() {
  const { open, closeModal } = useModal();
  const { showToast } = useToast();
  const formRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle('overflow-hidden', open);
    return () => document.documentElement.classList.remove('overflow-hidden');
  }, [open]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    
    // Anti-spam honeypot
    if (data.website_url) {
      formRef.current.reset();
      closeModal();
      return;
    }

    const service = formRef.current.querySelector('#modal-service')?.value;
    const date    = formRef.current.querySelector('#modal-date')?.value;
    const bookings = JSON.parse(localStorage.getItem('hm_bookings') || '[]');
    bookings.push({ service, date, timestamp: Date.now() });
    localStorage.setItem('hm_bookings', JSON.stringify(bookings));
    closeModal();
    showToast(`Appointment booked for ${date}!`);
    formRef.current.reset();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-lg p-4"
      onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
      <div className="glass-card-premium max-w-lg w-full p-8 rounded-2xl relative border border-white/[0.08]">
        <button onClick={closeModal} className="absolute top-4 right-4 text-on-surface-variant hover:text-white transition-colors p-1" aria-label="Close">
          <span className="material-symbols-outlined" style={{ fontSize: 22 }}>close</span>
        </button>
        <div className="flex items-center gap-3 mb-7">
          <div className="w-8 h-8 rounded-lg bg-secondary-container/15 flex items-center justify-center">
            <span className="material-symbols-outlined text-secondary-container" style={{ fontSize: 18, fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
          </div>
          <h3 className="font-display font-extrabold text-white text-xl uppercase tracking-wide">Book Appointment</h3>
        </div>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div style={{ display: 'none' }} aria-hidden="true">
            <label htmlFor="modal_website_url">Website URL</label>
            <input type="text" name="website_url" id="modal_website_url" tabIndex="-1" autoComplete="off" />
          </div>
          <div>
            <label className="block font-mono text-[9px] text-on-surface-variant uppercase tracking-[0.2em] mb-1.5">Full Name</label>
            <input type="text" name="name" placeholder="Your name" className="w-full p-3.5 rounded-xl luxury-input text-sm" required />
          </div>
          <div>
            <label className="block font-mono text-[9px] text-on-surface-variant uppercase tracking-[0.2em] mb-1.5">Select Service</label>
            <select id="modal-service" className="w-full p-3.5 rounded-xl luxury-input text-sm" required>
              <option value="">Choose a service...</option>
              <option>Engine Overhaul</option>
              <option>Transmission Repair</option>
              <option>Brake Service</option>
              <option>AC &amp; Climate</option>
              <option>General Service</option>
            </select>
          </div>
          <div>
            <label className="block font-mono text-[9px] text-on-surface-variant uppercase tracking-[0.2em] mb-1.5">Preferred Date</label>
            <input type="date" id="modal-date" className="w-full p-3.5 rounded-xl luxury-input text-sm" required />
          </div>
          <button type="submit" className="w-full btn-primary-luxury text-white py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] mt-1">
            Confirm Reservation
          </button>
        </form>
      </div>
    </div>
  );
}
