import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-white/5 py-20 relative z-10">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pb-16 border-b border-white/5">
          <div className="col-span-2 md:col-span-1 space-y-5">
            <img alt="Hassan Moustafa" className="h-20 w-auto rounded-xl shadow-lg border border-white/10" src="/assets/images/logo-3d.jpeg" />
            <p className="text-on-surface-variant text-xs font-light leading-6">Your trusted automotive partner in Sharjah since 2006.</p>
          </div>
          <div className="space-y-4">
            <h4 className="font-mono font-bold text-white text-[10px] uppercase tracking-[0.2em]">Services</h4>
            <ul className="space-y-2.5 text-on-surface-variant text-xs font-light">
              {['Engine Overhaul', 'Transmission', 'Brakes & Suspension', 'AC & Climate', 'Diagnostics'].map(s => (
                <li key={s}><Link className="hover:text-white transition-colors" href="/services">{s}</Link></li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-mono font-bold text-white text-[10px] uppercase tracking-[0.2em]">Company</h4>
            <ul className="space-y-2.5 text-on-surface-variant text-xs font-light">
              <li><Link className="hover:text-white transition-colors" href="/about">About Us</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/spare-parts">Parts Catalog</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-mono font-bold text-white text-[10px] uppercase tracking-[0.2em]">Workshop</h4>
            <ul className="space-y-3 text-on-surface-variant text-xs font-light">
              <li className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-secondary-container shrink-0" style={{ fontSize: 16 }}>location_on</span>
                <span>Industrial Area 4, Sharjah</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-secondary-container shrink-0" style={{ fontSize: 16 }}>phone</span>
                <span>+971 52 244 1866</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-secondary-container shrink-0" style={{ fontSize: 16 }}>chat</span>
                <a href="https://wa.me/971522441866" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">+971 52 244 1866</a>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-secondary-container shrink-0" style={{ fontSize: 16 }}>schedule</span>
                <span>Saturday – Thursday<br />8:00 AM – 1:30 PM<br />4:00 PM – 9:00 PM<br /><br />Friday<br />Closed</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 text-on-surface-variant text-[10px] font-light">
          <p>© 2026 Hassan Moustafa Automotive. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
