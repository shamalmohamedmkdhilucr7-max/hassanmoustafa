'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import ShaderBg from '@/components/ShaderBg';
import { RevealSection } from '@/hooks/useReveal';
import { useToast } from '@/context/ToastContext';

const ACCEPTED_TYPES = ['image/jpeg','image/jpg','image/png','image/webp'];
const MAX_MB = 10;

export default function ContactPage() {
  const { showToast } = useToast();
  const [photos, setPhotos] = useState([]);
  const fileInputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const addFiles = (files) => {
    Array.from(files).forEach(file => {
      if (!ACCEPTED_TYPES.includes(file.type)) { showToast(`Unsupported format: ${file.name}`); return; }
      if (file.size > MAX_MB * 1024 * 1024) { showToast(`${file.name} exceeds 10 MB limit.`); return; }
      const url = URL.createObjectURL(file);
      setPhotos(prev => [...prev, { id: Date.now() + Math.random(), file, url }]);
    });
  };

  const removePhoto = (id) => setPhotos(prev => prev.filter(p => p.id !== id));

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const bookings = JSON.parse(localStorage.getItem('hm_bookings') || '[]');
    bookings.push({ ...data, source: 'contact_page', timestamp: Date.now() });
    localStorage.setItem('hm_bookings', JSON.stringify(bookings));
    showToast(`Reservation submitted! Confirmed for ${data.name} on ${data.date}.`);
    e.target.reset();
    setPhotos([]);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center pt-32 pb-20 overflow-hidden border-b border-white/5" style={{ backgroundImage:"linear-gradient(to right, rgba(7,7,7,0.95), rgba(7,7,7,0.85)), url('https://images.unsplash.com/photo-1625047509248-ec889cbff17f?q=80&w=1800&auto=format&fit=crop')", backgroundSize:'cover', backgroundPosition:'center' }}>
        <ShaderBg />
        <div className="max-w-[1440px] mx-auto px-8 relative z-10 w-full text-center py-10">
          <span className="font-mono text-[10px] text-secondary-container uppercase tracking-[0.25em] font-bold block mb-3">Scheduling &amp; Sourcing Hotline</span>
          <h1 className="font-display font-extrabold text-white leading-tight" style={{ fontSize:'clamp(2.2rem,5vw,4rem)' }}>Connect with <span className="gradient-text-animated">Our Team</span></h1>
          <p className="text-on-surface-variant text-sm mt-4 max-w-xl mx-auto font-light leading-relaxed">Book a service, request a spare parts quote, or speak directly with our workshop engineers. We respond to all digital enquiries within 24 hours.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-[var(--section-gap)] relative z-10">
        <div className="max-w-[1440px] mx-auto px-8 grid lg:grid-cols-12 gap-16">

          {/* Form */}
          <RevealSection className="lg:col-span-7 glass-card-premium p-10 rounded-2xl">
            <h3 className="text-white font-display font-extrabold text-xl mb-8 uppercase tracking-wide">Workshop Scheduler</h3>
            <form onSubmit={handleSubmit} className="space-y-5 text-xs font-semibold">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[9px] text-on-surface-variant uppercase tracking-[0.2em] mb-1.5">Your Name</label>
                  <input type="text" name="name" placeholder="Full Name" className="w-full p-3.5 rounded-xl luxury-input text-white text-xs font-medium" required />
                </div>
                <div>
                  <label className="block font-mono text-[9px] text-on-surface-variant uppercase tracking-[0.2em] mb-1.5">Phone Number</label>
                  <input type="tel" name="phone" placeholder="e.g. +971 50 000 0000" className="w-full p-3.5 rounded-xl luxury-input text-white text-xs font-medium" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[9px] text-on-surface-variant uppercase tracking-[0.2em] mb-1.5">Email Address</label>
                  <input type="email" name="email" placeholder="e.g. name@domain.com" className="w-full p-3.5 rounded-xl luxury-input text-white text-xs font-medium" required />
                </div>
                <div>
                  <label className="block font-mono text-[9px] text-on-surface-variant uppercase tracking-[0.2em] mb-1.5">Vehicle Brand &amp; Model</label>
                  <input type="text" name="vehicle" placeholder="e.g. Porsche Cayenne 2021" className="w-full p-3.5 rounded-xl luxury-input text-white text-xs font-medium" required />
                </div>
              </div>
              <div>
                <label className="block font-mono text-[9px] text-on-surface-variant uppercase tracking-[0.2em] mb-1.5">Vehicle Identification Number (VIN)</label>
                <input type="text" name="vin" placeholder="Enter 17-character VIN (optional)" maxLength={17} className="w-full p-3.5 rounded-xl luxury-input text-white text-xs font-medium uppercase" autoComplete="off"
                  onChange={e => { e.target.value = e.target.value.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g,''); }} />
              </div>

              {/* Photo upload */}
              <div>
                <label className="block font-mono text-[9px] text-on-surface-variant uppercase tracking-[0.2em] mb-3">Upload Vehicle Photos</label>
                <div className={`relative w-full rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer ${dragging ? 'border-secondary-container/60 bg-secondary-container/5' : 'border-white/10 bg-white/[0.03] hover:border-secondary-container/40 hover:bg-white/[0.05]'}`}
                  style={{ minHeight:140 }}
                  onDragOver={e => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={e => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
                  onClick={() => fileInputRef.current?.click()}>
                  <input ref={fileInputRef} type="file" multiple accept="image/jpg,image/jpeg,image/png,image/webp" className="hidden"
                    onChange={e => { addFiles(e.target.files); e.target.value = ''; }} />
                  <div className="flex flex-col items-center justify-center gap-3 py-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-on-surface-variant" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <div className="text-center">
                      <p className="text-white text-xs font-semibold">Drag &amp; Drop or <span className="text-secondary-container">Click to Upload</span></p>
                      <p className="text-on-surface-variant text-[9px] mt-1 font-mono uppercase tracking-wider">Front · Rear · Left · Right · Damage Area</p>
                      <p className="text-on-surface-variant text-[9px] mt-1">JPG · JPEG · PNG · WEBP | Max 10 MB per image</p>
                    </div>
                  </div>
                </div>
                {photos.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                    {photos.map(p => (
                      <div key={p.id} className="relative rounded-lg overflow-hidden border border-white/[0.08] bg-white/[0.03]" style={{ aspectRatio:'4/3' }}>
                        <img src={p.url} alt={p.file.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-1.5">
                          <p className="text-white text-[9px] font-mono truncate">{p.file.name}</p>
                        </div>
                        <button type="button" onClick={() => removePhoto(p.id)}
                          className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/70 hover:bg-secondary-container flex items-center justify-center transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3 h-3 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block font-mono text-[9px] text-on-surface-variant uppercase tracking-[0.2em] mb-1.5">Select Service</label>
                <select name="service" className="w-full p-3.5 rounded-xl luxury-input text-white text-xs font-medium" required>
                  <option value="Engine Overhaul">Engine Reconstruction &amp; Overhaul</option>
                  <option value="Transmission Care">Transmission &amp; Gearbox Repair</option>
                  <option value="AC Climate Control">AC Climate Repair &amp; Gas Recharge</option>
                  <option value="Body & Paint">Body Painting &amp; Dent Repair</option>
                  <option value="Diagnostics & Electrical">ECU Diagnostics &amp; Sensors Scan</option>
                  <option value="Regular Maintenance">Regular Scheduled Service</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[9px] text-on-surface-variant uppercase tracking-[0.2em] mb-1.5">Preferred Date</label>
                <input type="date" name="date" className="w-full p-3.5 rounded-xl luxury-input text-white text-xs font-medium" required />
              </div>

              <div>
                <label className="block font-mono text-[9px] text-on-surface-variant uppercase tracking-[0.2em] mb-1.5">Symptoms or Custom Request</label>
                <textarea name="notes" rows={4} placeholder="Detail any warning lights, noise symptoms, or specific spare parts requirements..." className="w-full p-3.5 rounded-xl luxury-input text-white text-xs font-medium resize-none" />
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full btn-primary-luxury text-white py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-[10px]">Submit Reservation Request</button>
              </div>
            </form>
          </RevealSection>

          {/* Info & Map */}
          <div className="lg:col-span-5 space-y-8 reveal-item reveal-delay-2">
            <RevealSection delay="reveal-delay-2" className="glass-card-premium p-8 rounded-2xl space-y-6">
              <h3 className="text-white font-display font-bold text-lg uppercase tracking-wider">Garage Information</h3>
              <div className="space-y-5 text-xs font-light">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary-container" style={{ fontSize:20,fontVariationSettings:"'FILL' 1" }}>location_on</span>
                  <div>
                    <h4 className="font-mono font-bold text-white uppercase text-[9px] tracking-widest">Workshop Address</h4>
                    <p className="text-on-surface-variant mt-1">Industrial Area 4, Sharjah, United Arab Emirates</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary-container" style={{ fontSize:20,fontVariationSettings:"'FILL' 1" }}>phone</span>
                  <div>
                    <h4 className="font-mono font-bold text-white uppercase text-[9px] tracking-widest">Phone &amp; Hotline</h4>
                    <p className="text-on-surface-variant mt-1"><a href="tel:+971522441866" className="hover:text-white transition-colors">+971 52 244 1866</a></p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary-container" style={{ fontSize:20,fontVariationSettings:"'FILL' 1" }}>chat</span>
                  <div>
                    <h4 className="font-mono font-bold text-white uppercase text-[9px] tracking-widest">WhatsApp Support</h4>
                    <p className="text-on-surface-variant mt-1"><a href="https://wa.me/971522441866" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">+971 52 244 1866</a></p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary-container" style={{ fontSize:20,fontVariationSettings:"'FILL' 1" }}>schedule</span>
                  <div>
                    <h4 className="font-mono font-bold text-white uppercase text-[9px] tracking-widest">Operating Hours</h4>
                    <p className="text-on-surface-variant mt-1 leading-relaxed">Saturday – Thursday<br />8:00 AM – 1:30 PM<br />4:00 PM – 9:00 PM<br /><br />Friday<br />Closed</p>
                  </div>
                </div>
              </div>
            </RevealSection>

            {/* Map */}
            <RevealSection delay="reveal-delay-3" className="glass-card-premium p-6 rounded-2xl flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h4 className="font-mono font-bold text-white text-[9px] uppercase tracking-widest">Sharjah Workshop Location</h4>
                <span className="text-[8px] bg-secondary-container/5 border border-secondary-container/30 px-3 py-1 rounded text-secondary-container font-mono font-bold uppercase tracking-wider">Industrial 4</span>
              </div>
              <div className="relative w-full rounded-xl overflow-hidden border border-white/5" style={{ aspectRatio:'4/3' }}>
                <iframe title="Hassan Moustafa Workshop Location"
                  src="https://maps.google.com/maps?q=25.330156,55.404049&z=16&output=embed"
                  width="100%" height="100%"
                  style={{ border:0,display:'block',width:'100%',height:'100%' }}
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </RevealSection>
          </div>
        </div>
      </section>
    </>
  );
}
