'use client';
import Link from 'next/link';
import ShaderBg from '@/components/ShaderBg';
import { RevealSection } from '@/hooks/useReveal';
import { useModal } from '@/context/ModalContext';

const timeline = [
  { year:'2006', title:'Founded in Sharjah', desc:'Hassan Moustafa opened the original workshop in Industrial Area 4, Sharjah — starting with a focus on European vehicle diagnostics and genuine parts sourcing.' },
  { year:'2010', title:'ECU & Diagnostics Expansion', desc:'Invested in factory-level diagnostic equipment covering BMW, Mercedes-Benz, Porsche and Audi platforms — one of the first independent workshops in the UAE to do so.' },
  { year:'2014', title:'OEM Parts Partnership', desc:'Established direct supply agreements with authorised OEM distributors across Europe and Japan, enabling next-day genuine parts availability for all major marques.' },
  { year:'2018', title:'Full-Service Workshop', desc:'Extended capabilities to include body and paint, comprehensive AC climate systems, and complete suspension overhaul — becoming a one-stop automotive destination.' },
  { year:'2023', title:'10,000+ Vehicles Milestone', desc:'Celebrated serving over 10,000 vehicles, with a client retention rate exceeding 85% — a testament to our commitment to quality and customer relationships.' },
  { year:'2026', title:'Trusted Leader', desc:'Today, Hassan Moustafa Automotive Care stands as one of UAE\'s most trusted independent workshops — combining heritage expertise with cutting-edge technical capability.' },
];

const values = [
  { icon:'verified_user', title:'Authenticity', desc:'Every part we source and install is 100% genuine, authenticated, and warranty-backed. Zero compromise on component integrity.' },
  { icon:'precision_manufacturing', title:'Precision', desc:'We diagnose before we repair. Our process is data-driven, methodical, and documented — so you receive exact solutions, not guesswork.' },
  { icon:'handshake', title:'Integrity', desc:'We provide accurate job timelines at the point of diagnosis. Proactive updates are sent throughout the service cycle. We never deliver late without prior communication.' },
  { icon:'currency_exchange', title:'Fair Value', desc:'Competitive, transparent pricing with itemised quotations. We do not upsell unnecessary work — every recommendation is justified with diagnostic evidence.' },
];

const team = [
  { name:'Hassan Moustafa', role:'Founder & Master Technician', exp:'20+ Years', spec:'Engine Rebuilds, Diagnostics' },
  { name:'Ahmed Al-Rashidi', role:'Senior Transmission Engineer', exp:'15+ Years', spec:'Gearbox & Drivetrain Systems' },
  { name:'Khalid Ibrahim', role:'ECU & Electronics Specialist', exp:'12+ Years', spec:'ECU Coding, Sensor Calibration' },
  { name:'Omar Faris', role:'Body & Paint Lead', exp:'10+ Years', spec:'Paint Matching, Panel Work' },
];

export default function AboutPage() {
  const { openModal } = useModal();
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center pt-32 pb-20 overflow-hidden border-b border-white/5" style={{ backgroundImage:"linear-gradient(to right, rgba(7,7,7,0.95), rgba(7,7,7,0.85)), url('https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1800&auto=format&fit=crop')", backgroundSize:'cover', backgroundPosition:'center' }}>
        <ShaderBg />
        <div className="max-w-[1440px] mx-auto px-8 relative z-10 w-full text-center py-10">
          <span className="font-mono text-[10px] text-secondary-container uppercase tracking-[0.25em] font-bold block mb-3">Our Story & Heritage</span>
          <h1 className="font-display font-extrabold text-white leading-tight" style={{ fontSize:'clamp(2.2rem,5vw,4rem)' }}>
            About <span className="gradient-text-animated">Hassan Moustafa</span>
          </h1>
          <p className="text-on-surface-variant text-sm mt-4 max-w-xl mx-auto font-light leading-relaxed">Nearly two decades of engineering excellence, authentic parts integrity, and a genuine passion for every vehicle that passes through our workshop doors.</p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-[var(--section-gap)] relative z-10">
        <div className="max-w-[1440px] mx-auto px-8 grid md:grid-cols-2 gap-20 items-center">
          <RevealSection>
            <div className="relative group">
              <div className="absolute -inset-3 border border-secondary-container/15 translate-x-6 translate-y-6 rounded-2xl -z-10 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-500" />
              <div className="w-full aspect-video bg-surface-container overflow-hidden rounded-2xl border border-white/5 card-img-wrap">
                <img alt="Hassan Moustafa workshop" className="w-full h-full object-cover" src="/assets/images/lc.jpeg" loading="lazy" />
              </div>
            </div>
          </RevealSection>
          <RevealSection delay="reveal-delay-2" className="space-y-6">
            <span className="font-mono text-[10px] text-secondary-container uppercase tracking-[0.25em] font-bold">Our Mission</span>
            <h2 className="font-display font-extrabold text-white leading-tight" style={{ fontSize:'clamp(1.8rem,3vw,2.8rem)' }}>Engineering Integrity, Every Time</h2>
            <div className="space-y-4 text-on-surface-variant text-sm leading-7 font-light">
              <p>At Hassan Moustafa Automotive, we believe every vehicle deserves the same care and attention — regardless of age, brand, or service type. Founded in 2006, our workshop was built on a simple conviction: that there was a gap in the UAE market for truly honest, technically excellent, and customer-first automotive service.</p>
              <p>Our philosophy has never changed: diagnose accurately, source genuine parts only, deliver on time, and charge fairly. Every vehicle that enters our workshop — whether a daily commuter or a collector's supercar — receives the same meticulous attention to detail.</p>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              {['ISO-Certified Process','OEM Parts Only','20+ Years Experience','UAE-Wide Service'].map(tag => (
                <span key={tag} className="cert-tag">{tag}</span>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Values */}
      <section className="py-[var(--section-gap)] bg-surface-container-lowest border-t border-white/5 relative z-10">
        <div className="max-w-[1440px] mx-auto px-8">
          <RevealSection className="text-center mb-16">
            <span className="font-mono text-[10px] text-secondary-container uppercase tracking-[0.25em] font-bold block mb-2">What We Stand For</span>
            <h2 className="font-display font-extrabold text-white" style={{ fontSize:'clamp(1.8rem,3vw,3rem)' }}>Our Core Values</h2>
          </RevealSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <RevealSection key={v.title} delay={`reveal-delay-${i}`} className="glass-card-premium p-8 rounded-2xl space-y-5">
                <div className="w-12 h-12 rounded-xl bg-secondary-container/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary-container" style={{ fontSize:26,fontVariationSettings:"'FILL' 1" }}>{v.icon}</span>
                </div>
                <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider">{v.title}</h3>
                <p className="text-xs text-on-surface-variant font-light leading-relaxed">{v.desc}</p>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-[var(--section-gap)] relative z-10">
        <div className="max-w-[900px] mx-auto px-8">
          <RevealSection className="text-center mb-16">
            <span className="font-mono text-[10px] text-secondary-container uppercase tracking-[0.25em] font-bold block mb-2">Our Journey</span>
            <h2 className="font-display font-extrabold text-white" style={{ fontSize:'clamp(1.8rem,3vw,3rem)' }}>Two Decades of Excellence</h2>
          </RevealSection>
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px timeline-track -translate-x-1/2" />
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <RevealSection key={item.year} delay={`reveal-delay-${i % 4}`} className={`flex gap-8 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`hidden md:flex flex-1 ${i % 2 === 0 ? 'justify-end pr-12' : 'justify-start pl-12'}`}>
                    <div className="glass-card-premium p-6 rounded-2xl max-w-sm w-full">
                      <div className="font-mono text-xs text-secondary-container font-bold mb-2">{item.year}</div>
                      <h3 className="font-display font-bold text-white text-sm mb-2">{item.title}</h3>
                      <p className="text-xs text-on-surface-variant font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  <div className="relative flex-shrink-0 w-12 flex items-start justify-center mt-6">
                    <div className="w-3 h-3 rounded-full bg-secondary-container border-2 border-surface status-dot" />
                  </div>
                  <div className="flex-1 md:hidden">
                    <div className="glass-card-premium p-6 rounded-2xl">
                      <div className="font-mono text-xs text-secondary-container font-bold mb-2">{item.year}</div>
                      <h3 className="font-display font-bold text-white text-sm mb-2">{item.title}</h3>
                      <p className="text-xs text-on-surface-variant font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  <div className={`hidden md:flex flex-1 ${i % 2 === 0 ? 'justify-start pl-12' : 'justify-end pr-12'}`} />
                </RevealSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-[var(--section-gap)] bg-surface-container-lowest border-t border-white/5 relative z-10">
        <div className="max-w-[1440px] mx-auto px-8">
          <RevealSection className="text-center mb-16">
            <span className="font-mono text-[10px] text-secondary-container uppercase tracking-[0.25em] font-bold block mb-2">The Experts Behind Every Job</span>
            <h2 className="font-display font-extrabold text-white" style={{ fontSize:'clamp(1.8rem,3vw,3rem)' }}>Meet Our Engineering Team</h2>
          </RevealSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <RevealSection key={member.name} delay={`reveal-delay-${i}`} className="glass-card-premium p-7 rounded-2xl text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-secondary-container/10 border border-secondary-container/20 flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-secondary-container" style={{ fontSize:32,fontVariationSettings:"'FILL' 1" }}>person</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-sm">{member.name}</h3>
                  <p className="font-mono text-[9px] text-secondary-container uppercase tracking-wider mt-1">{member.role}</p>
                </div>
                <div className="divider-line" />
                <div className="space-y-1.5 text-left">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-on-surface-variant font-mono">Experience</span>
                    <span className="text-white font-bold">{member.exp}</span>
                  </div>
                  <div className="flex justify-between text-[10px] gap-2">
                    <span className="text-on-surface-variant font-mono shrink-0">Speciality</span>
                    <span className="text-white font-bold text-right">{member.spec}</span>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative z-10 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-8 text-center">
          <RevealSection>
            <h2 className="font-display font-extrabold text-white mb-4" style={{ fontSize:'clamp(1.8rem,3vw,2.5rem)' }}>Ready to Experience the Difference?</h2>
            <p className="text-on-surface-variant text-sm mb-8 max-w-lg mx-auto font-light">Book your vehicle in today and discover why thousands of UAE drivers trust Hassan Moustafa Automotive with their most valuable assets.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button onClick={openModal} className="btn-primary-luxury text-white px-10 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[10px]">Book Appointment</button>
              <Link href="/contact" className="btn-secondary-luxury text-white px-10 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[10px]">Get In Touch</Link>
            </div>
          </RevealSection>
        </div>
      </section>
    </>
  );
}
