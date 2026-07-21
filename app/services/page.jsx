'use client';
import Link from 'next/link';
import ShaderBg from '@/components/ShaderBg';
import { RevealSection } from '@/hooks/useReveal';
import { useModal } from '@/context/ModalContext';

const services = [
  { icon:'build', title:'Engine Reconstruction & Overhaul', badge:'Mechanical', desc:'Complete disassembly, precision measurement, and rebuild using OEM-grade components. Cylinder head work, crank regrinding, gasket replacement and timing chain systems.', details:['Cylinder head resurfacing & valve grinding','Crankshaft inspection & regrinding','Piston & ring replacement','Full gasket set replacement','Timing chain/belt kit replacement','Post-rebuild compression & leak-down testing'] },
  { icon:'settings', title:'Transmission & Gearbox Repair', badge:'Drivetrain', desc:'Automatic, manual, and CVT gearbox overhaul. Clutch replacement, torque converter service, gear programming, and post-repair road-test verification.', details:['Automatic transmission fluid flush & filter','Manual gearbox bearing & synchro replacement','Clutch assembly & flywheel resurfacing','Torque converter rebuild','CVT belt & pulley service','Post-repair electronic adaptation & road test'] },
  { icon:'ac_unit', title:'AC Climate Repair & Recharge', badge:'Climate', desc:'Full AC system diagnostics, compressor overhaul, evaporator and condenser cleaning, refrigerant recharge, and cabin filter replacement.', details:['Refrigerant leak detection (UV & electronic)','Compressor clutch & internal service','Evaporator & condenser flushing','Gas evacuation & recharge (R134a / R1234yf)','Cabin air filter & pollen filter replacement','Electrical diagnosis (blend doors, actuators)'] },
  { icon:'car_crash', title:'Body Painting & Dent Repair', badge:'Bodywork', desc:'Precision colour-matching, minor dent PDR, full panel resprays, and stone chip touch-ups. All finishes protected with professional clear-coat lacquer.', details:['Paintless dent removal (PDR)','Computerised colour spectrum matching','Panel preparation & primer application','Metallic & solid respray','Clear-coat lacquer & polish','Plastic bumper repair & refinish'] },
  { icon:'memory', title:'ECU Diagnostics & Sensors', badge:'Electronics', desc:'Multi-system scan, fault code read and clear, sensor calibration, ADAS module reset, battery registration, and electronic module coding.', details:['OEM-level multi-system fault scanning','ABS, SRS, ESP module diagnostics','Lambda & MAF sensor calibration','Battery registration & alternator test','TPMS programming & calibration','ADAS & camera module reset'] },
  { icon:'handyman', title:'Regular Scheduled Service', badge:'Maintenance', desc:'Manufacturer-schedule oil and filter service, brake inspection, fluid top-ups, tyre rotation, and comprehensive 50-point vehicle health check.', details:['Manufacturer-grade synthetic oil service','Air, fuel & cabin filter replacement','Brake pad, disc & calliper inspection','Fluid level inspection & top-up','Tyre pressure & tread depth check','50-point vehicle safety inspection'] },
  { icon:'directions_car', title:'Brakes & Suspension', badge:'Safety', desc:'Full brake system overhaul and suspension geometry alignment. We ensure your vehicle stops and handles with the precision its engineers intended.', details:['Disc & drum brake replacement','Brake fluid flush (DOT 4/5.1)','Calliper rebuild & slide servicing','Shock absorber & strut replacement','Control arm bushings & ball joints','4-wheel laser alignment'] },
  { icon:'local_gas_station', title:'Fuel System Service', badge:'Performance', desc:'Injector cleaning, fuel pump diagnosis, fuel pressure testing, and throttle body servicing to restore fuel economy and engine performance.', details:['Ultrasonic injector cleaning & flow test','Fuel pump pressure & volume testing','Fuel filter replacement','Throttle body cleaning & calibration','Fuel tank inspection & cleaning','Return line & pressure regulator service'] },
  { icon:'battery_charging_full', title:'Battery & Electrical', badge:'Electrical', desc:'Battery health analysis, charging system load tests, starter motor inspection, alternator testing and full wiring harness fault diagnosis.', details:['Battery conductance test & replacement','Alternator load & output testing','Starter motor bench test','Fusebox & relay inspection','Wiring harness short & open circuit tracing','Earth strap inspection & replacement'] },
];

export default function ServicesPage() {
  const { openModal } = useModal();
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center pt-32 pb-20 overflow-hidden border-b border-white/5" style={{ backgroundImage:"linear-gradient(to right, rgba(7,7,7,0.95), rgba(7,7,7,0.85)), url('https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1800&auto=format&fit=crop')", backgroundSize:'cover', backgroundPosition:'center' }}>
        <ShaderBg />
        <div className="max-w-[1440px] mx-auto px-8 relative z-10 w-full text-center py-10">
          <span className="font-mono text-[10px] text-secondary-container uppercase tracking-[0.25em] font-bold block mb-3">Workshop Capabilities</span>
          <h1 className="font-display font-extrabold text-white leading-tight" style={{ fontSize:'clamp(2.2rem,5vw,4rem)' }}>
            Our <span className="gradient-text-animated">Services</span>
          </h1>
          <p className="text-on-surface-variant text-sm mt-4 max-w-xl mx-auto font-light leading-relaxed">From routine maintenance to complex engine rebuilds — every service is performed using genuine OEM parts by certified engineers.</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-[var(--section-gap)] relative z-10">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <RevealSection key={s.title} delay={`reveal-delay-${i % 4}`} className="glass-card-premium p-8 rounded-2xl group flex flex-col">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-secondary-container/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary-container" style={{ fontSize:26,fontVariationSettings:"'FILL' 1" }}>{s.icon}</span>
                  </div>
                  <span className="service-badge">{s.badge}</span>
                </div>
                <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-3">{s.title}</h3>
                <p className="text-xs text-on-surface-variant font-light leading-relaxed mb-5">{s.desc}</p>
                <ul className="space-y-2 mt-auto">
                  {s.details.map(d => (
                    <li key={d} className="flex items-start gap-2.5 text-[11px] text-on-surface-variant font-light">
                      <span className="material-symbols-outlined text-secondary-container shrink-0" style={{ fontSize:14,marginTop:1,fontVariationSettings:"'FILL' 1" }}>check_circle</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative z-10 border-t border-white/5" style={{ background:'linear-gradient(135deg,rgba(214,4,29,0.08) 0%,transparent 60%)' }}>
        <div className="max-w-[1440px] mx-auto px-8 text-center">
          <RevealSection>
            <span className="font-mono text-[10px] text-secondary-container uppercase tracking-[0.25em] font-bold block mb-4">Ready to Book?</span>
            <h2 className="font-display font-extrabold text-white mb-6" style={{ fontSize:'clamp(1.8rem,3vw,2.5rem)' }}>Schedule Your Workshop Appointment</h2>
            <p className="text-on-surface-variant text-sm mb-10 max-w-lg mx-auto font-light leading-relaxed">Our engineers are ready to diagnose, service, and return your vehicle in peak condition. Book online or contact us directly.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button onClick={openModal} className="btn-primary-luxury text-white px-10 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[10px]">Book Appointment</button>
              <Link href="/contact" className="btn-secondary-luxury text-white px-10 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[10px]">Contact Us</Link>
            </div>
          </RevealSection>
        </div>
      </section>
    </>
  );
}
