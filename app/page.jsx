'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useModal } from '@/context/ModalContext';
import { RevealSection } from '@/hooks/useReveal';
import { useLenis } from 'lenis/react';
const brands = ['PORSCHE','MERCEDES-BENZ','BMW','AUDI','LEXUS','TOYOTA','NISSAN','FERRARI','LAND ROVER','JAGUAR','MASERATI'];

const whyUs = [
  { icon: 'verified_user', title: '100% Genuine Parts', desc: 'We maintain an absolute zero-tolerance policy on counterfeit components. Every part installed carries full manufacturer authentication and a serialised guarantee.' },
  { icon: 'groups', title: 'Expert Engineers', desc: 'Our certified technicians carry years of hands-on experience across German, Japanese, and British platforms — delivering diagnostic precision that rivals OEM dealerships.' },
  { icon: 'schedule', title: 'On-Time Delivery', desc: 'We respect your schedule absolutely. Our workshop operates on structured job timelines with proactive SMS updates throughout your vehicle\'s service progression.' },
  { icon: 'receipt_long', title: 'Transparent Pricing', desc: 'No hidden charges. No surprise invoices. Every quotation itemises labour, parts, and VAT before a single bolt is touched — you always know exactly what you are paying for.' },
  { icon: 'local_shipping', title: 'Pickup & Delivery', desc: 'We collect your vehicle from your home or office and return it at your convenience anywhere across Dubai — no drop-off hassle, no disruption to your day.' },
  { icon: 'support_agent', title: 'Emergency Assistance', desc: 'Breakdowns don\'t keep business hours. Our emergency response service operates extended hours for urgent roadside support, diagnostics, and rapid recovery across the UAE.' },
  { icon: 'workspace_premium', title: 'Certified Workshop', desc: 'Our facility is equipped with manufacturer-grade diagnostic tooling, lift systems, and climate-controlled bays — an environment engineered for precise, high-quality workmanship.' },
  { icon: 'thumb_up', title: 'Trusted Since 2006', desc: 'Nearly two decades of consistent service, a loyal client base across the UAE, and thousands of successful vehicle restorations — our track record speaks for itself.' },
];

const services = [
  { icon: 'build', title: 'Engine Reconstruction & Overhaul', desc: 'Complete disassembly, precision measurement, and rebuild using OEM-grade components. Cylinder head work, crank regrinding, gasket replacement, timing chain systems.' },
  { icon: 'settings', title: 'Transmission & Gearbox Repair', desc: 'Automatic, manual, and CVT gearbox overhaul. Clutch replacement, torque converter service, gear programming, and post-repair road-test verification.' },
  { icon: 'ac_unit', title: 'AC Climate Repair & Recharge', desc: 'Full AC system diagnostics, compressor overhaul, evaporator and condenser cleaning, refrigerant recharge, and cabin filter replacement.' },
  { icon: 'car_crash', title: 'Body Painting & Dent Repair', desc: 'Precision colour-matching, minor dent PDR, full panel resprays, and stone chip touch-ups. All finishes protected with professional clear-coat lacquer.' },
  { icon: 'memory', title: 'ECU Diagnostics & Sensors', desc: 'Multi-system scan, fault code read and clear, sensor calibration, ADAS module reset, battery registration, and electronic module coding.' },
  { icon: 'handyman', title: 'Regular Scheduled Service', desc: 'Manufacturer-schedule oil and filter service, brake inspection, fluid top-ups, tyre rotation, and comprehensive 50-point vehicle health check.' },
];

const faqs = [
  { q: 'Do you use genuine OEM parts?', a: 'Absolutely — we have a strict zero-tolerance policy on aftermarket or counterfeit components. Every part we install is sourced directly from authorised distributors with full authentication documentation.' },
  { q: 'How long does a typical service take?', a: 'A minor service typically takes 3-5 hours. Major services take 6-8 hours. Engine overhauls and complex mechanical repairs generally require 3-5 working days. We provide an accurate timeline at the point of diagnosis and keep you updated throughout via WhatsApp.' },
  { q: 'Do you offer vehicle pickup and delivery?', a: 'Yes — we offer complimentary vehicle pickup and delivery across all Dubai zones. Simply book your appointment and provide your location. Our driver will collect your vehicle at your scheduled time and return it to the same address upon completion.' },
  { q: 'What brands do you specialise in?', a: 'We service all major European, Japanese, and American marques including Porsche, Mercedes-Benz, BMW, Audi, Land Rover, Ferrari, Maserati, Lexus, Toyota, Nissan, and many more.' },
  { q: 'Do you offer a warranty on repairs?', a: 'All our mechanical repairs and parts installations are covered by a service warranty. Duration varies by job type — we will confirm your exact warranty period with your service invoice.' },
];

function ScrollHero() {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const videoRef = useRef(null);
  const canvasMainRef = useRef(null);
  const canvasBlurRef = useRef(null);
  const textRef = useRef(null);
  const hintRef = useRef(null);
  const barRef = useRef(null);
  const loaderRef = useRef(null);
  const loaderBarRef = useRef(null);

  const readyRef = useRef(false);

  // useLenis fires every animation frame with Lenis's already-smooth scroll value.
  // We drive video.currentTime directly from it — no extra lerp = no lag.
  useLenis((lenis) => {
    if (!readyRef.current || !containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const scrollable = Math.max(0, container.offsetHeight - window.innerHeight);
    if (scrollable <= 0) return;

    // progress: 0 at top of hero, 1 at bottom
    const progress = Math.max(0, Math.min(-rect.top / scrollable, 1));

    const video = videoRef.current;
    const text = textRef.current;
    const hint = hintRef.current;
    const bar = barRef.current;
    const dur = durationRef.current;

    // Progress bar
    if (bar) bar.style.width = (progress * 100).toFixed(2) + '%';

    // Scroll hint
    if (hint) hint.style.opacity = progress < 0.02 ? '0.55' : '0';

    // Hero text parallax + fade
    if (text) {
      const opacity = progress < 0.12 ? 1 : Math.max(0, 1 - (progress - 0.12) / 0.22);
      text.style.opacity = opacity;
      text.style.transform = `translateY(${-(progress * 80)}px) translateZ(0)`;
    }

    // Video scrub — Lenis value is already smooth, set directly
    if (video && dur > 0) {
      const t = Math.max(0, Math.min(progress * dur, dur - 0.016));
      if (Math.abs(video.currentTime - t) >= 0.016) {
        video.currentTime = t;
      }
    }
  });

  // Video loading & metadata
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    const canvasMain = canvasMainRef.current;
    const canvasBlur = canvasBlurRef.current;
    const loader = loaderRef.current;
    const loaderBar = loaderBarRef.current;

    if (!container || !video || !canvasMain || !canvasBlur) return;

    const ctxMain = canvasMain.getContext('2d');
    const ctxBlur = canvasBlur.getContext('2d');
    let loaderTimeout;

    loaderTimeout = setTimeout(() => {
      if (video.duration && isFinite(video.duration) && video.duration > 0) onMeta();
      else { hideLoader(); canvasMain.style.opacity = '1'; canvasBlur.style.opacity = '1'; }
    }, 3500);

    function initDimensions() {
      if (video.videoWidth > 0) {
        canvasMain.width = video.videoWidth; canvasMain.height = video.videoHeight;
        canvasBlur.width = Math.max(32, Math.floor(video.videoWidth / 8));
        canvasBlur.height = Math.max(32, Math.floor(video.videoHeight / 8));
        try {
          if (video.readyState >= 2) {
            ctxMain.drawImage(video, 0, 0, canvasMain.width, canvasMain.height);
            ctxBlur.drawImage(video, 0, 0, canvasBlur.width, canvasBlur.height);
          }
        } catch (e) {}
        canvasMain.style.opacity = '1'; canvasBlur.style.opacity = '1';
      }
    }

    function hideLoader() {
      clearTimeout(loaderTimeout);
      if (loader) {
        if (loaderBar) loaderBar.style.width = '100%';
        setTimeout(() => { loader.style.opacity = '0'; setTimeout(() => { loader.style.display = 'none'; }, 600); }, 300);
      }
    }

    function onMeta() {
      const dur = video.duration;
      if (!isFinite(dur) || dur <= 0) return;
      durationRef.current = dur;
      const p = video.play();
      const after = () => { video.pause(); initDimensions(); hideLoader(); readyRef.current = true; };
      if (p) p.then(after).catch(after); else after();
    }

    video.addEventListener('loadedmetadata', onMeta);
    video.addEventListener('canplay', onMeta);
    video.addEventListener('progress', () => {
      if (video.duration > 0 && video.buffered.length > 0) {
        const pct = Math.floor((video.buffered.end(video.buffered.length - 1) / video.duration) * 100);
        if (loaderBar) loaderBar.style.width = Math.min(95, pct) + '%';
      }
    });

    // Redraw canvas whenever the video seeks to a new frame
    function drawCanvas() {
      try {
        if (canvasMain.width > 0 && video.readyState >= 2) {
          ctxMain.drawImage(video, 0, 0, canvasMain.width, canvasMain.height);
          ctxBlur.drawImage(video, 0, 0, canvasBlur.width, canvasBlur.height);
        }
      } catch (e) {}
    }
    video.addEventListener('seeked', drawCanvas);
    video.addEventListener('timeupdate', drawCanvas);

    if (video.readyState >= 1) onMeta(); else video.load();
    window.addEventListener('resize', initDimensions, { passive: true });

    return () => {
      clearTimeout(loaderTimeout);
      window.removeEventListener('resize', initDimensions);
      video.removeEventListener('seeked', drawCanvas);
      video.removeEventListener('timeupdate', drawCanvas);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ height: '600vh', position: 'relative' }}>
      <div ref={stickyRef} style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#070707' }}>
        <video ref={videoRef} muted playsInline preload="auto" src="/assets/video/hero.mp4"
          style={{ position:'absolute',top:0,left:0,width:'100%',height:'100%',objectFit:'cover',pointerEvents:'none',opacity:0.001,zIndex:-100 }} />

        {/* Loader */}
        <div ref={loaderRef} style={{ position:'absolute',inset:0,zIndex:90,background:'#070707',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',transition:'opacity 0.6s',pointerEvents:'none' }}>
          <div style={{ fontFamily:'Space Grotesk,monospace',fontSize:10,color:'#d6041d',textTransform:'uppercase',letterSpacing:'0.35em',marginBottom:14,fontWeight:700 }}>ENCODING PRESTIGE</div>
          <div style={{ width:140,height:1,background:'rgba(255,255,255,0.08)',position:'relative',overflow:'hidden',borderRadius:1 }}>
            <div ref={loaderBarRef} style={{ position:'absolute',top:0,left:0,bottom:0,width:0,background:'#d6041d',transition:'width 0.3s ease',willChange:'width' }} />
          </div>
        </div>

        {/* Blur canvas */}
        <canvas ref={canvasBlurRef} style={{ position:'absolute',inset:0,width:'100%',height:'100%',filter:'blur(32px) brightness(0.28) saturate(1.6)',transform:'scale(1.1) translateZ(0)',pointerEvents:'none',willChange:'transform',opacity:0,transition:'opacity 0.8s ease' }} />
        {/* Main canvas */}
        <canvas ref={canvasMainRef} style={{ position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'contain',transform:'translateZ(0)',pointerEvents:'none',willChange:'transform',opacity:0,transition:'opacity 0.8s ease' }} />

        {/* Gradient overlays */}
        <div aria-hidden="true" style={{ position:'absolute',inset:0,zIndex:10,pointerEvents:'none',background:'linear-gradient(to bottom,rgba(7,7,7,0.62) 0%,rgba(7,7,7,0.08) 18%,rgba(7,7,7,0.08) 68%,rgba(7,7,7,0.72) 87%,rgba(7,7,7,1) 100%)' }} />
        <div aria-hidden="true" style={{ position:'absolute',inset:0,zIndex:10,pointerEvents:'none',background:'linear-gradient(to right,rgba(7,7,7,0.52) 0%,transparent 16%,transparent 84%,rgba(7,7,7,0.52) 100%)' }} />

        {/* Hero text */}
        <div ref={textRef} style={{ position:'absolute',inset:0,zIndex:20,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'0 1.5rem',paddingTop:80,willChange:'opacity,transform' }}>
          <div className="h-el" style={{ animationDelay:'0.05s',display:'inline-flex',alignItems:'center',gap:10,padding:'8px 22px',borderRadius:999,marginBottom:28,background:'rgba(214,4,29,0.08)',border:'1px solid rgba(214,4,29,0.28)',backdropFilter:'blur(14px)' }}>
            <span className="status-dot" style={{ width:6,height:6,borderRadius:'50%',background:'#d6041d',flexShrink:0 }} />
            <span style={{ fontFamily:'Space Grotesk,monospace',fontSize:9,color:'#d6041d',textTransform:'uppercase',letterSpacing:'0.25em',fontWeight:700 }}>Workshop Open · Industrial Area 4, Sharjah</span>
          </div>
          <h1 className="h-el" style={{ animationDelay:'0.18s',fontFamily:'Plus Jakarta Sans,sans-serif',fontWeight:900,color:'#fff',lineHeight:0.91,letterSpacing:'-0.02em',marginBottom:22,fontSize:'clamp(2.6rem,8vw,7.8rem)',textShadow:'0 4px 48px rgba(0,0,0,0.85)' }}>
            PRECISION<br /><span className="gradient-text-animated">AUTOMOTIVE</span><br />CARE
          </h1>
          <p className="h-el" style={{ animationDelay:'0.32s',fontFamily:'Space Grotesk,monospace',fontSize:'clamp(0.6rem,1.4vw,0.85rem)',color:'rgba(255,255,255,0.58)',textTransform:'uppercase',letterSpacing:'0.22em',marginBottom:18 }}>
            Premium Spare Parts &amp; Professional Garage Services
          </p>
          <div className="h-el" style={{ animationDelay:'0.42s',display:'flex',alignItems:'center',gap:16,marginBottom:38 }}>
            <div style={{ width:44,height:1,background:'linear-gradient(to right,transparent,rgba(214,4,29,0.75))' }} />
            <span style={{ fontFamily:'Space Grotesk,monospace',fontSize:9,color:'#d6041d',textTransform:'uppercase',letterSpacing:'0.28em' }}>Engineered for Performance · Trusted Across UAE</span>
            <div style={{ width:44,height:1,background:'linear-gradient(to left,transparent,rgba(214,4,29,0.75))' }} />
          </div>
          <div className="h-el" style={{ animationDelay:'0.54s',display:'flex',flexWrap:'wrap',gap:14,justifyContent:'center',marginBottom:52 }}>
            <Link href="/contact" style={{ display:'inline-flex',alignItems:'center',gap:8,padding:'14px 38px',borderRadius:999,background:'linear-gradient(135deg,#d6041d,#9a0014)',border:'1px solid rgba(214,4,29,0.55)',fontFamily:'Space Grotesk,monospace',fontSize:10,fontWeight:700,color:'#fff',textDecoration:'none',textTransform:'uppercase',letterSpacing:'0.18em',boxShadow:'0 0 0 0 rgba(214,4,29,0.35)',transition:'all 0.35s' }}>
              <span className="material-symbols-outlined" style={{ fontSize:14,fontVariationSettings:"'FILL' 1" }}>calendar_month</span> Book a Service
            </Link>
            <Link href="/services" style={{ display:'inline-flex',alignItems:'center',gap:8,padding:'14px 38px',borderRadius:999,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.18)',backdropFilter:'blur(14px)',fontFamily:'Space Grotesk,monospace',fontSize:10,fontWeight:700,color:'#fff',textDecoration:'none',textTransform:'uppercase',letterSpacing:'0.18em',transition:'all 0.35s' }}>
              Explore Services <span className="material-symbols-outlined" style={{ fontSize:14 }}>arrow_forward</span>
            </Link>
          </div>
          <div className="h-el" style={{ animationDelay:'0.66s',display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'28px 52px' }}>
            {[['20+','Years Legacy'],['10k+','Vehicles Served'],['100%','OEM Guarantee'],['50+','Brands Covered']].map(([val,label]) => (
              <div key={label} style={{ textAlign:'center' }}>
                <div style={{ fontFamily:'Space Grotesk,monospace',fontWeight:900,color:'#fff',fontSize:'clamp(1.4rem,2.6vw,2rem)' }}>{val.replace('+','')}<span style={{ color:'#d6041d' }}>{val.includes('+') ? '+' : val.includes('%') ? '' : ''}</span></div>
                <div style={{ fontFamily:'Space Grotesk,monospace',fontSize:8,color:'rgba(255,255,255,0.32)',textTransform:'uppercase',letterSpacing:'0.2em',marginTop:5 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div ref={hintRef} style={{ position:'absolute',bottom:32,left:'50%',transform:'translateX(-50%)',zIndex:30,display:'flex',flexDirection:'column',alignItems:'center',gap:8,opacity:0.55,transition:'opacity 0.5s ease' }}>
          <span style={{ fontFamily:'Space Grotesk,monospace',fontSize:7,letterSpacing:'0.35em',textTransform:'uppercase',color:'rgba(255,255,255,0.5)' }}>Scroll to Experience</span>
          <div style={{ width:20,height:32,borderRadius:999,border:'1px solid rgba(255,255,255,0.22)',display:'flex',justifyContent:'center',alignItems:'flex-start',paddingTop:6 }}>
            <div className="scroll-indicator-dot" style={{ width:4,height:6,borderRadius:2,background:'#d6041d' }} />
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ position:'absolute',bottom:0,left:0,right:0,height:2,background:'rgba(255,255,255,0.06)',zIndex:30 }}>
          <div ref={barRef} style={{ height:'100%',width:0,background:'linear-gradient(to right,#d6041d,#ff6060)',transition:'none',willChange:'width' }} />
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { openModal } = useModal();
  const [openFaq, setOpenFaq] = useState(-1);

  return (
    <>
      {/* Inject hero animations */}
      <style>{`
        @keyframes hFadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        .h-el{opacity:0;animation:hFadeUp 0.9s cubic-bezier(0.22,1,0.36,1) forwards;}
      `}</style>

      <ScrollHero />

      {/* Brand Marquee */}
      <section className="py-8 border-y border-outline-variant overflow-hidden bg-surface-container-lowest">
        <div className="animate-logo-scroll">
          {[0,1].map(i => (
            <div key={i} className="flex items-center gap-16 px-8 opacity-25" aria-hidden={i===1}>
              {brands.map(b => (
                <span key={b} className="font-display text-2xl font-black tracking-tighter text-white whitespace-nowrap">{b}</span>
              )).reduce((acc, el, idx) => [...acc, el, <span key={`dot-${idx}`} className="w-1 h-1 rounded-full bg-white/30 shrink-0" />], []).slice(0,-1)}
            </div>
          ))}
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-[var(--section-gap)] relative z-10 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-8 grid md:grid-cols-2 gap-20 items-center">
          <RevealSection>
            <div className="relative group">
              <div className="absolute -inset-3 border border-secondary-container/15 translate-x-6 translate-y-6 rounded-2xl -z-10 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-500" />
              <div className="w-full aspect-video bg-surface-container overflow-hidden rounded-2xl border border-white/5 card-img-wrap">
                <img alt="Hassan Moustafa premium automotive workshop" className="w-full h-full object-cover" src="/assets/images/lc.jpeg" loading="lazy" />
              </div>
              <div className="absolute bottom-5 right-5 glass-card-premium px-5 py-3 rounded-xl border border-white/[0.08]">
                <div className="font-mono text-xl font-bold text-white">2006<span className="text-secondary-container text-sm ml-1">Est.</span></div>
                <div className="font-mono text-[9px] text-on-surface-variant uppercase tracking-widest mt-0.5">Industrial 4, Sharjah</div>
              </div>
            </div>
          </RevealSection>
          <RevealSection delay="reveal-delay-2" className="space-y-7">
            <span className="font-mono text-[10px] text-secondary-container uppercase tracking-[0.25em] font-bold">Our Heritage</span>
            <h2 className="font-display font-extrabold text-white leading-tight" style={{ fontSize:'clamp(1.8rem,3vw,3rem)' }}>
              UAE's Most Trusted <span className="text-secondary-container">Automotive</span> Specialists
            </h2>
            <div className="space-y-5 text-on-surface-variant text-sm leading-7 font-light">
              <p>At Hassan Moustafa Automotive, we are more than a garage — we are your dedicated long-term partner for maintaining the performance, safety, and value of your vehicle. Founded in 2006, we built our reputation on a foundation of engineering integrity, precision diagnostics, and uncompromising parts authenticity.</p>
              <p>Our workshop handles every marque with equal attention — whether you drive a daily family saloon or a rare collector's supercar. From computerised ECU scans and cylinder head overhauls to full transmission rebuilds and genuine OEM parts sourcing, every job is done right, on time, and at a fair price.</p>
            </div>
            <div className="grid grid-cols-3 gap-4 py-5 border-t border-b border-white/5">
              {[['20+','Years Legacy'],['10k+','Cars Serviced'],['50+','Brands Covered']].map(([v,l]) => (
                <div key={l}>
                  <div className="font-mono text-3xl font-bold text-white">{v.replace(/[+%]/g,'')}<span className="text-secondary-container">{v.includes('+') ? '+' : '%'}</span></div>
                  <div className="font-mono text-[9px] text-on-surface-variant uppercase tracking-widest mt-1">{l}</div>
                </div>
              ))}
            </div>
            <Link href="/about" className="inline-flex items-center gap-3 text-white border-b border-secondary-container pb-1 text-xs uppercase tracking-widest font-bold hover:gap-5 transition-all duration-300 font-mono">
              Our Full Story <span className="material-symbols-outlined text-secondary-container" style={{ fontSize:16 }}>arrow_forward</span>
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-[var(--section-gap)] bg-surface-container-lowest border-t border-white/5 relative z-10">
        <div className="max-w-[1440px] mx-auto px-8">
          <RevealSection className="text-center mb-16">
            <span className="font-mono text-[10px] text-secondary-container uppercase tracking-[0.25em] font-bold block mb-2">The Hassan Moustafa Advantage</span>
            <h2 className="font-display font-extrabold text-white" style={{ fontSize:'clamp(1.8rem,3vw,3rem)' }}>Why Clients Choose Us</h2>
            <p className="text-on-surface-variant text-sm mt-3 max-w-xl mx-auto font-light leading-relaxed">Everything we do is built around your trust — from the moment you call to the moment your car is returned.</p>
          </RevealSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyUs.map((item, i) => (
              <RevealSection key={item.title} delay={`reveal-delay-${i % 4}`} className="glass-card-premium p-6 sm:p-8 rounded-2xl space-y-5">
                <div className="w-12 h-12 rounded-xl bg-secondary-container/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary-container" style={{ fontSize:26,fontVariationSettings:"'FILL' 1" }}>{item.icon}</span>
                </div>
                <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider">{item.title}</h3>
                <p className="text-xs text-on-surface-variant font-light leading-relaxed">{item.desc}</p>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-[var(--section-gap)] relative z-10">
        <div className="max-w-[1440px] mx-auto px-8">
          <RevealSection className="text-center mb-16">
            <span className="font-mono text-[10px] text-secondary-container uppercase tracking-[0.25em] font-bold block mb-2">Workshop Capabilities</span>
            <h2 className="font-display font-extrabold text-white" style={{ fontSize:'clamp(1.8rem,3vw,3rem)' }}>Comprehensive <span className="text-secondary-container">Service</span> Offering</h2>
            <p className="text-on-surface-variant text-sm mt-3 max-w-xl mx-auto font-light leading-relaxed">From routine maintenance to complex engine rebuilds — our certified technicians cover every mechanical and electrical discipline.</p>
          </RevealSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <RevealSection key={s.title} delay={`reveal-delay-${i % 4}`} className="glass-card-premium p-8 rounded-2xl group">
                <div className="w-12 h-12 rounded-xl bg-secondary-container/10 flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-secondary-container" style={{ fontSize:26,fontVariationSettings:"'FILL' 1" }}>{s.icon}</span>
                </div>
                <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-3">{s.title}</h3>
                <p className="text-xs text-on-surface-variant font-light leading-relaxed">{s.desc}</p>
              </RevealSection>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/services" className="btn-primary-luxury text-white px-10 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[10px]">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 relative z-10 overflow-hidden border-y border-white/5" style={{ background:'linear-gradient(135deg,rgba(214,4,29,0.08) 0%,transparent 60%)' }}>
        <div className="max-w-[1440px] mx-auto px-8 text-center">
          <RevealSection>
            <span className="font-mono text-[10px] text-secondary-container uppercase tracking-[0.25em] font-bold block mb-4">Ready to Get Started?</span>
            <h2 className="font-display font-extrabold text-white mb-6" style={{ fontSize:'clamp(1.8rem,3vw,2.5rem)' }}>Book Your Workshop Appointment</h2>
            <p className="text-on-surface-variant text-sm mb-10 max-w-lg mx-auto font-light leading-relaxed">Schedule a service visit, request a spare parts quote, or speak directly with one of our automotive engineers today.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button onClick={openModal} className="btn-primary-luxury text-white px-10 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[10px]">
                Book Appointment
              </button>
              <Link href="/contact" className="btn-secondary-luxury text-white px-10 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[10px]">
                Contact Us
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[var(--section-gap)] relative z-10">
        <div className="max-w-[900px] mx-auto px-8">
          <RevealSection className="text-center mb-14">
            <span className="font-mono text-[10px] text-secondary-container uppercase tracking-[0.25em] font-bold block mb-2">Common Questions</span>
            <h2 className="font-display font-extrabold text-white" style={{ fontSize:'clamp(1.8rem,3vw,2.5rem)' }}>Frequently Asked Questions</h2>
          </RevealSection>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <RevealSection key={i} className="glass-card-premium rounded-2xl overflow-hidden">
                <button className="w-full text-left px-7 py-5 flex justify-between items-center gap-4 group"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                  <span className="font-display font-semibold text-white text-sm">{faq.q}</span>
                  <span className="material-symbols-outlined text-on-surface-variant shrink-0 transition-transform duration-300" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                </button>
                {openFaq === i && (
                  <div className="px-7 pb-6 text-on-surface-variant text-sm font-light leading-relaxed border-t border-white/5 pt-4">{faq.a}</div>
                )}
              </RevealSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// useState needed at top level
import { useState } from 'react';
