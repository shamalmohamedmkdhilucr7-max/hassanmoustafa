/* Hassan Moustafa Automotive Care — Performance-First Main Controller
   Strategy:
   - All transitions use transform/opacity (hardware-accelerated, never layout props)
   - Scroll listener is passive + debounced via requestAnimationFrame
   - IntersectionObserver drives all reveal animations (no scroll polling)
   - Mobile menu uses CSS class toggling only (will-change-transform on element)
   - overscroll-behavior-y: contain applied to overlay scroll containers
   - All event listeners use { passive: true } where possible
*/

document.addEventListener("DOMContentLoaded", () => {

    /* ─── 1. Scroll-Aware Navbar (rAF-debounced, passive listener) ─── */
    const navbar = document.querySelector('nav');
    if (navbar) {
        let ticking = false;
        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    navbar.classList.toggle('scrolled', window.scrollY > 20);
                    ticking = false;
                });
                ticking = true;
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // sync initial state
    }

    /* ─── 2. IntersectionObserver Reveal (animate once, GPU-safe) ──── */
    const revealItems = document.querySelectorAll('.reveal-item');
    if (revealItems.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

        revealItems.forEach(item => revealObserver.observe(item));
    }

    /* ─── 3. Magnetic Hover (transform only, rAF-throttled) ─────────── */
    document.querySelectorAll('.magnetic-button').forEach(btn => {
        let rect = null;
        let rafId = null;

        btn.addEventListener('mouseenter', () => { rect = btn.getBoundingClientRect(); }, { passive: true });

        btn.addEventListener('mousemove', e => {
            if (!rect) return;
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px) scale(1.025)`;
            });
        }, { passive: true });

        btn.addEventListener('mouseleave', () => {
            rect = null;
            if (rafId) cancelAnimationFrame(rafId);
            btn.style.transform = '';
        }, { passive: true });
    });

    /* ─── 4. Mobile Drawer Navigator ──────────────────────────────── */
    // Uses translate-x-full ↔ translate-x-0 (GPU transform, no layout reflow)
    // Overlay uses opacity-0/opacity-100 + pointer-events (never display changes mid-animation)
    const mobileMenuBtn     = document.getElementById('mobile-menu-btn');
    const mobileMenu        = document.getElementById('mobile-menu');
    const mobileMenuCloseBtn= document.getElementById('mobile-menu-close');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    function openMobileMenu() {
        // Overlay becomes visible first (pointer-events needed before touch on overlay)
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('opacity-0', 'pointer-events-none');
            mobileMenuOverlay.classList.add('opacity-100', 'pointer-events-auto');
        }
        if (mobileMenu) {
            mobileMenu.classList.remove('translate-x-full');
            mobileMenu.classList.add('translate-x-0');
        }
        // Lock background scroll via CSS class (avoids inline style thrashing)
        document.documentElement.classList.add('overflow-hidden');
    }

    function closeMobileMenu() {
        if (mobileMenu) {
            mobileMenu.classList.add('translate-x-full');
            mobileMenu.classList.remove('translate-x-0');
        }
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.add('opacity-0', 'pointer-events-none');
            mobileMenuOverlay.classList.remove('opacity-100', 'pointer-events-auto');
        }
        document.documentElement.classList.remove('overflow-hidden');
    }

    if (mobileMenuBtn)     mobileMenuBtn.addEventListener('click', openMobileMenu);
    if (mobileMenuCloseBtn) mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);
    if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMobileMenu);

    // Close on Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeMobileMenu();
    });

    /* ─── 5. Active Route Highlighting ────────────────────────────── */
    const activePath = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === activePath) {
            link.classList.add('text-secondary-container', 'font-bold');
            link.classList.remove('text-on-surface-variant');
        }
    });

    document.querySelectorAll('#mobile-menu a').forEach(link => {
        if (link.getAttribute('href') === activePath) {
            link.classList.add('text-secondary-container');
        }
    });

    /* ─── 6. Booking Modal (opacity-based, overscroll-contained) ──── */
    const bookingModal = document.getElementById('booking-modal');
    const bookTriggers = document.querySelectorAll('.trigger-booking');
    const modalClose   = document.getElementById('close-modal-btn');

    function openModal() {
        if (!bookingModal) return;
        bookingModal.classList.remove('hidden');
        // Trigger transition on next frame so CSS transition fires
        requestAnimationFrame(() => {
            bookingModal.classList.add('opacity-100');
            bookingModal.classList.remove('opacity-0');
        });
        document.documentElement.classList.add('overflow-hidden');
    }

    function closeModal() {
        if (!bookingModal) return;
        bookingModal.classList.add('opacity-0');
        bookingModal.classList.remove('opacity-100');
        document.documentElement.classList.remove('overflow-hidden');
        // Wait for fade-out transition before hiding
        setTimeout(() => bookingModal.classList.add('hidden'), 300);
    }

    bookTriggers.forEach(btn => btn.addEventListener('click', e => { e.preventDefault(); openModal(); }));
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (bookingModal) {
        bookingModal.addEventListener('click', e => { if (e.target === bookingModal) closeModal(); });
    }

    /* ─── 7. Booking Form Submit ───────────────────────────────────── */
    const modalBookingForm = document.getElementById('modal-booking-form');
    if (modalBookingForm) {
        modalBookingForm.addEventListener('submit', e => {
            e.preventDefault();
            const service = document.getElementById('modal-service')?.value;
            const date    = document.getElementById('modal-date')?.value;

            const bookings = JSON.parse(localStorage.getItem('hm_bookings') || '[]');
            bookings.push({ service, date, timestamp: Date.now() });
            localStorage.setItem('hm_bookings', JSON.stringify(bookings));

            closeModal();
            window.showToast(`Appointment booked for ${date}!`);
            modalBookingForm.reset();
        });
    }

    /* ─── 8. Toast Notification System ────────────────────────────── */
    window.showToast = function(message) {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-2 pointer-events-none';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = [
            'flex items-center gap-3 px-6 py-4 rounded-full',
            'border text-white shadow-2xl pointer-events-auto',
            'transition-all duration-500 ease-luxury',
            'translate-y-10 opacity-0',
            'will-change-transform'
        ].join(' ');
        toast.style.cssText = 'background:#121214;border-color:rgba(214,4,29,0.4);';
        toast.innerHTML = `
            <span class="material-symbols-outlined text-secondary-container" style="font-variation-settings:'FILL' 1">check_circle</span>
            <span class="font-medium text-xs tracking-wide">${message}</span>
        `;

        container.appendChild(toast);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                toast.classList.remove('translate-y-10', 'opacity-0');
            });
        });

        setTimeout(() => {
            toast.classList.add('-translate-y-2', 'opacity-0');
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    };

});
