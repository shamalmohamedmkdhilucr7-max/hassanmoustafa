'use client';
import { useToast } from '@/context/ToastContext';
import ShaderBg from '@/components/ShaderBg';
import { RevealSection } from '@/hooks/useReveal';

const categories = [
  { icon:'build', title:'Engine Components', desc:'Pistons, gaskets, timing kits, oil pumps, camshafts, head bolts' },
  { icon:'settings_suggest', title:'Transmission Parts', desc:'Clutch kits, valve bodies, solenoids, ATF fluids, flywheel assemblies' },
  { icon:'emergency', title:'Brake Systems', desc:'Pads, rotors, calipers, brake lines, master cylinders, ABS sensors' },
  { icon:'swap_driving_apps_wheel', title:'Suspension & Steering', desc:'Shock absorbers, struts, control arms, tie rods, rack assemblies' },
  { icon:'cable', title:'Electrical & Sensors', desc:'ECU modules, oxygen sensors, MAF sensors, wiring harnesses' },
  { icon:'ac_unit', title:'AC & Climate', desc:'Compressors, condensers, evaporators, expansion valves, cabin filters' },
  { icon:'oil_barrel', title:'Oils & Filters', desc:'Fully synthetic oils, oil/air/fuel/cabin filters, drain plugs' },
  { icon:'car_repair', title:'Body & Exterior', desc:'Bumpers, mirrors, headlights, fenders, grilles, windshields' },
];

function BrandGrid({ title, brands, invertAll=false }) {
  return (
    <div className="mb-14">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <span className="font-mono text-[9px] text-secondary-container uppercase tracking-[0.25em] font-bold shrink-0">{title}</span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/10 to-transparent" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {brands.map(b => (
          <div key={b.name} className="glass-card-premium group p-4 rounded-xl text-center flex flex-col items-center justify-center min-h-[90px] border-secondary-container/15 shadow-[0_0_15px_rgba(214,4,29,0.03)] hover:border-secondary-container/40 transition-all duration-300">
            <img src={`/assets/images/brands/${b.img}`} alt={b.name} className={`h-10 ${b.w || 'w-20'} object-contain mx-auto mb-2 ${b.filter || (invertAll ? 'filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity' : '')}`} style={b.style} />
            <span className="font-display font-bold text-white text-[10px] block uppercase tracking-wider">{b.name}</span>
            {b.desc && <span className="text-[9px] text-on-surface-variant font-mono mt-1">{b.desc}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SparePartsPage() {
  const { showToast } = useToast();

  const handlePartsSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const requests = JSON.parse(localStorage.getItem('hm_parts') || '[]');
    requests.push({ ...data, timestamp: Date.now() });
    localStorage.setItem('hm_parts', JSON.stringify(requests));
    showToast(`Parts enquiry received for ${data.brand}! We will contact you shortly.`);
    e.target.reset();
  };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center pt-32 pb-20 overflow-hidden border-b border-white/5" style={{ backgroundImage:"linear-gradient(to right, rgba(7,7,7,0.95), rgba(7,7,7,0.85)), url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1800&auto=format&fit=crop')", backgroundSize:'cover', backgroundPosition:'center' }}>
        <ShaderBg />
        <div className="max-w-[1440px] mx-auto px-8 relative z-10 w-full">
          <span className="font-mono text-[10px] text-secondary-container uppercase tracking-[0.25em] font-bold block mb-3">Authenticated OEM Distribution</span>
          <h1 className="font-display font-extrabold text-white leading-tight" style={{ fontSize:'clamp(2.2rem,5vw,4rem)' }}>
            Genuine <span className="gradient-text-animated">Spare Parts</span>
          </h1>
          <p className="text-on-surface-variant text-sm mt-4 max-w-2xl font-light leading-relaxed">Every component we supply is sourced directly from licensed OEM distributors — carrying full manufacturer certification, serialised authentication, and verified traceability back to the original factory.</p>
        </div>
      </section>

      {/* Why Genuine */}
      <section className="py-[var(--section-gap)] relative z-10">
        <div className="max-w-[1440px] mx-auto px-8 grid md:grid-cols-2 gap-20 items-center">
          <RevealSection className="space-y-7">
            <span className="font-mono text-[10px] text-secondary-container uppercase tracking-[0.25em] font-bold">Why Genuine Parts Matter</span>
            <h2 className="font-display font-extrabold text-white leading-tight" style={{ fontSize:'clamp(1.8rem,3vw,2.8rem)' }}>Your Vehicle Deserves the Real Thing</h2>
            <div className="space-y-4 text-on-surface-variant text-sm leading-7 font-light">
              <p>Counterfeit and grey-market automotive components are a growing epidemic in the UAE. These imitation parts may appear identical on the surface, but they fail to meet the precise metallurgical, dimensional, and performance tolerances defined by the original vehicle manufacturer.</p>
              <p>At Hassan Moustafa, we maintain a strict zero-tolerance policy on non-genuine components. Every part we supply — from a simple oil filter to a complete cylinder head assembly — comes with verifiable manufacturer codes, batch serialisation, and a written guarantee of authenticity.</p>
            </div>
            <div className="space-y-3">
              {[
                'Factory-exact dimensional tolerance and metallurgical composition',
                'Full manufacturer warranty coverage retained',
                'Higher resale value with authenticated service records',
                'Longer component lifespan and consistent performance'
              ].map(t => (
                <div key={t} className="flex items-center gap-3 text-xs text-on-surface-variant font-light">
                  <span className="material-symbols-outlined text-secondary-container shrink-0" style={{ fontSize:16,fontVariationSettings:"'FILL' 1" }}>check_circle</span>
                  {t}
                </div>
              ))}
            </div>
          </RevealSection>
          <RevealSection delay="reveal-delay-2" className="relative">
            <div className="aspect-[1024/934] rounded-2xl overflow-hidden border border-white/5 card-img-wrap shadow-2xl">
              <img alt="Genuine OEM parts" className="w-full h-full object-cover" src="/assets/images/porshe.jpeg" />
            </div>
            <div className="absolute bottom-5 left-5 flex items-center gap-2 glass-card-premium px-4 py-2 rounded-full border border-secondary-container/25">
              <span className="material-symbols-outlined text-secondary-container" style={{ fontSize:14,fontVariationSettings:"'FILL' 1" }}>verified</span>
              <span className="font-mono text-[9px] text-white uppercase tracking-wider font-bold">100% Authenticated · Zero Counterfeit Policy</span>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Brands */}
      <section className="py-[var(--section-gap)] bg-surface-container-lowest border-t border-white/5 relative z-10">
        <div className="max-w-[1440px] mx-auto px-8">
          <RevealSection className="text-center mb-16">
            <span className="font-mono text-[10px] text-secondary-container uppercase tracking-[0.25em] font-bold block mb-2">Vehicle Brand Coverage</span>
            <h2 className="font-display font-extrabold text-white" style={{ fontSize:'clamp(1.8rem,3vw,3rem)' }}>Parts for Every Marque</h2>
            <p className="text-on-surface-variant text-sm mt-3 max-w-lg mx-auto font-light">We source and stock genuine OEM components for 50+ vehicle brands across every major automotive group.</p>
          </RevealSection>

          <RevealSection>
            <BrandGrid title="German Vehicles" brands={[
              { img:'porsche.png', name:'PORSCHE', desc:'911 · Cayenne · Macan' },
              { img:'bmw.png', name:'BMW', desc:'3 · 5 · 7 · X Series' },
              { img:'mercedes-benz.png', name:'MERCEDES-BENZ', desc:'C · E · S · G Class', filter:'filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity' },
              { img:'audi.png', name:'AUDI', desc:'A4 · A6 · Q7 · RS', filter:'filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity' },
              { img:'volkswagen.png', name:'VOLKSWAGEN', desc:'Golf · Tiguan · Touareg', filter:'filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity' },
              { img:'mini.png', name:'MINI', desc:'Cooper · Countryman', style:{ filter:'invert(1)' }, filter:'opacity-85 group-hover:opacity-100 transition-opacity' }
            ]} />
          </RevealSection>
          <RevealSection>
            <BrandGrid title="Japanese Vehicles" brands={[
              { img:'toyota.png', name:'TOYOTA', desc:'Land Cruiser · Camry', filter:'filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity' },
              { img:'lexus.png', name:'LEXUS', desc:'ES · RX · LX', filter:'filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity' },
              { img:'nissan.png', name:'NISSAN', desc:'Patrol · Altima · GTR', filter:'filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity' },
              { img:'infiniti.png', name:'INFINITI', desc:'Q50 · QX60 · QX80', filter:'filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity' },
              { img:'honda.png', name:'HONDA', desc:'Civic · Accord · CR-V', filter:'filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity' },
              { img:'mitsubishi.png', name:'MITSUBISHI', desc:'Pajero · Outlander' }
            ]} />
          </RevealSection>
          <RevealSection>
            <BrandGrid title="Luxury & Exotic Vehicles" brands={[
              { img:'ferrari.png', name:'FERRARI', desc:'488 · F8 · Roma' },
              { img:'lamborghini.png', name:'LAMBORGHINI', desc:'Urus · Huracán' },
              { img:'bentley.png', name:'BENTLEY', desc:'Continental · Bentayga', style:{ filter:'invert(1)' }, filter:'opacity-85 group-hover:opacity-100 transition-opacity' },
              { img:'rolls-royce.jpg', name:'ROLLS-ROYCE', desc:'Ghost · Cullinan', style:{ filter:'invert(1)' }, filter:'opacity-85 group-hover:opacity-100 transition-opacity' },
              { img:'maserati.png', name:'MASERATI', desc:'Ghibli · Levante', filter:'filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity' },
              { img:'aston-martin.png', name:'ASTON MARTIN', desc:'DB11 · Vantage', style:{ filter:'invert(1)' }, filter:'opacity-85 group-hover:opacity-100 transition-opacity' }
            ]} />
          </RevealSection>
          <RevealSection>
            <BrandGrid title="British, American & Korean" brands={[
              { img:'land-rover.png', name:'LAND ROVER', desc:'Range Rover · Defender' },
              { img:'jaguar.png', name:'JAGUAR', desc:'F-Pace · XE · XF', filter:'filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity' },
              { img:'ford.png', name:'FORD', desc:'Explorer · Mustang' },
              { img:'cadillac.png', name:'CADILLAC', desc:'Escalade · CT5 · XT5', style:{ filter:'invert(1) hue-rotate(180deg)' }, filter:'opacity-90 group-hover:opacity-100 transition-opacity', w:'w-auto' },
              { img:'chevrolet.png', name:'CHEVROLET', desc:'Tahoe · Camaro' },
              { img:'hyundai.png', name:'HYUNDAI', desc:'Tucson · Santa Fe', filter:'filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity' },
              { img:'kia.png', name:'KIA', desc:'Sportage · Telluride', filter:'filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity' }
            ]} />
          </RevealSection>
          <RevealSection>
            <BrandGrid title="Chinese Brands" brands={[
              { img:'byd.svg', name:'BYD' },
              { img:'jetour.svg', name:'JETOUR' },
              { img:'geely.png', name:'GEELY' },
              { img:'changan.png', name:'CHANGAN' },
              { img:'mg.svg', name:'MG' },
              { img:'jac.png', name:'JAC' },
              { img:'rox.jpg', name:'ROX', filter:'mix-blend-screen opacity-80 group-hover:opacity-100 transition-all duration-300' }
            ]} invertAll={true} />
          </RevealSection>
        </div>
      </section>

      {/* Categories */}
      <section className="py-[var(--section-gap)] relative z-10 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-8">
          <RevealSection className="text-center mb-16">
            <span className="font-mono text-[10px] text-secondary-container uppercase tracking-[0.25em] font-bold block mb-2">Component Categories</span>
            <h2 className="font-display font-extrabold text-white" style={{ fontSize:'clamp(1.8rem,3vw,3rem)' }}>What We Supply</h2>
          </RevealSection>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((c, i) => (
              <RevealSection key={c.title} delay={`reveal-delay-${i % 4}`} className="glass-card-premium p-6 rounded-2xl space-y-3 text-center">
                <span className="material-symbols-outlined text-secondary-container mx-auto" style={{ fontSize:28,fontVariationSettings:"'FILL' 1" }}>{c.icon}</span>
                <h3 className="font-display font-bold text-white text-xs uppercase tracking-wider">{c.title}</h3>
                <p className="text-[10px] text-on-surface-variant font-light">{c.desc}</p>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Parts Sourcing Form */}
      <section className="py-[var(--section-gap)] bg-surface-container-lowest border-t border-white/5 relative z-10">
        <div className="max-w-[900px] mx-auto px-8">
          <RevealSection className="text-center mb-12">
            <span className="font-mono text-[10px] text-secondary-container uppercase tracking-[0.25em] font-bold block mb-2">Parts Enquiry</span>
            <h2 className="font-display font-extrabold text-white" style={{ fontSize:'clamp(1.8rem,3vw,3rem)' }}>Request a Parts Quote</h2>
            <p className="text-on-surface-variant text-sm mt-3 max-w-lg mx-auto font-light leading-relaxed">Submit your vehicle details and the parts you need. Our sourcing team will respond within 24 hours with availability, pricing, and estimated delivery time.</p>
          </RevealSection>
          <RevealSection>
            <form onSubmit={handlePartsSubmit} className="glass-card-premium p-8 rounded-2xl space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block font-mono text-[9px] text-on-surface-variant uppercase tracking-[0.2em] mb-1.5">Your Name</label>
                  <input type="text" name="name" placeholder="Full name" className="w-full p-3.5 rounded-xl luxury-input text-sm text-white" required />
                </div>
                <div>
                  <label className="block font-mono text-[9px] text-on-surface-variant uppercase tracking-[0.2em] mb-1.5">Phone / WhatsApp</label>
                  <input type="tel" name="phone" placeholder="+971..." className="w-full p-3.5 rounded-xl luxury-input text-sm text-white" required />
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                <div>
                  <label className="block font-mono text-[9px] text-on-surface-variant uppercase tracking-[0.2em] mb-1.5">Vehicle Brand</label>
                  <input type="text" name="brand" placeholder="e.g. BMW" className="w-full p-3.5 rounded-xl luxury-input text-sm text-white" required />
                </div>
                <div>
                  <label className="block font-mono text-[9px] text-on-surface-variant uppercase tracking-[0.2em] mb-1.5">Model & Year</label>
                  <input type="text" name="model" placeholder="e.g. 530i 2022" className="w-full p-3.5 rounded-xl luxury-input text-sm text-white" required />
                </div>
                <div>
                  <label className="block font-mono text-[9px] text-on-surface-variant uppercase tracking-[0.2em] mb-1.5">VIN (Optional)</label>
                  <input type="text" name="vin" placeholder="17-character VIN" maxLength={17} className="w-full p-3.5 rounded-xl luxury-input text-sm uppercase text-white" />
                </div>
              </div>
              <div>
                <label className="block font-mono text-[9px] text-on-surface-variant uppercase tracking-[0.2em] mb-1.5">Parts Needed</label>
                <textarea name="parts" rows={4} placeholder="Describe the parts you need — include part numbers if available" className="w-full p-3.5 rounded-xl luxury-input text-sm resize-none text-white" required />
              </div>
              <button type="submit" className="w-full btn-primary-luxury text-white py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-[10px]">Submit Parts Enquiry</button>
            </form>
          </RevealSection>
        </div>
      </section>
    </>
  );
}
