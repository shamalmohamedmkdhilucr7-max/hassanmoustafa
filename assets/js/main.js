/* Hassan Moustafa Automotive Care - Luxury Digital Experience Main Controller */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Scroll-Aware Navbar Animation
    const navbar = document.querySelector('nav');
    if (navbar) {
        function checkScroll() {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        window.addEventListener('scroll', checkScroll);
        checkScroll(); // Run once on startup to sync initial reload
    }

    // 2. High-performance IntersectionObserver for Reveal Animations
    const revealItems = document.querySelectorAll('.reveal-item');
    if (revealItems.length > 0) {
        const revealOptions = {
            threshold: 0.08,
            rootMargin: "0px 0px -40px 0px"
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    observer.unobserve(entry.target); // Animate once and unobserve
                }
            });
        }, revealOptions);

        revealItems.forEach(item => {
            revealObserver.observe(item);
        });
    }

    // 3. Magnetic Hover Button Interaction (Fluid 3D Scale & Pull)
    document.querySelectorAll('.magnetic-button').forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            button.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px) scale(1.025)`;
            button.style.boxShadow = `0 10px 30px rgba(214, 4, 29, 0.15)`;
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
            button.style.boxShadow = '';
        });
    });

    // 4. Mobile slide-out drawer navigator with overlay backdrop
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    function openMobileMenu() {
        if (mobileMenu) mobileMenu.classList.remove('translate-x-full');
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('opacity-0', 'pointer-events-none');
            mobileMenuOverlay.classList.add('opacity-100', 'pointer-events-auto');
        }
        document.body.style.overflow = 'hidden'; // Stop background scrolling
    }

    function closeMobileMenu() {
        if (mobileMenu) mobileMenu.classList.add('translate-x-full');
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('opacity-100', 'pointer-events-auto');
            mobileMenuOverlay.classList.add('opacity-0', 'pointer-events-none');
        }
        document.body.style.overflow = '';
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', openMobileMenu);
    }
    if (mobileMenuCloseBtn) {
        mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);
    }
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    // 5. Highlight Current Active Route in Header navbar & Mobile Menu
    const activePath = window.location.pathname.split("/").pop();
    
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === activePath || (activePath === '' && linkPath === 'index.html')) {
            link.classList.add('text-secondary-container', 'font-bold', 'border-b-2', 'border-secondary-container');
            link.classList.remove('text-on-surface-variant');
        }
    });

    const mobileLinks = document.querySelectorAll('#mobile-menu a');
    mobileLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === activePath || (activePath === '' && linkPath === 'index.html')) {
            link.classList.add('text-secondary-container');
            link.classList.remove('text-white');
        }
    });

    // 6. Global Booking Modal controllers
    const bookingModal = document.getElementById('booking-modal');
    const bookTriggers = document.querySelectorAll('.trigger-booking');
    const modalClose = document.getElementById('close-modal-btn');

    if (bookingModal) {
        bookTriggers.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                bookingModal.classList.remove('hidden');
                bookingModal.classList.add('flex');
                document.body.style.overflow = 'hidden';
            });
        });

        if (modalClose) {
            modalClose.addEventListener('click', () => {
                bookingModal.classList.add('hidden');
                bookingModal.classList.remove('flex');
                document.body.style.overflow = '';
            });
        }

        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) {
                bookingModal.classList.add('hidden');
                bookingModal.classList.remove('flex');
                document.body.style.overflow = '';
            }
        });
    }

    // 7. Sourcing Form submit notification
    const modalBookingForm = document.getElementById('modal-booking-form');
    if (modalBookingForm) {
        modalBookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const service = document.getElementById('modal-service')?.value;
            const date = document.getElementById('modal-date')?.value;
            const time = document.getElementById('modal-time')?.value;

            // Save reservation
            const bookings = JSON.parse(localStorage.getItem('hm_bookings') || '[]');
            bookings.push({ service, date, time, timestamp: Date.now() });
            localStorage.setItem('hm_bookings', JSON.stringify(bookings));

            if (bookingModal) {
                bookingModal.classList.add('hidden');
                bookingModal.classList.remove('flex');
                document.body.style.overflow = '';
            }
            window.showToast(`Appointment successfully booked for ${date} at ${time}!`);
            modalBookingForm.reset();
        });
    }

    // 8. Custom Toast Alerts System
    window.showToast = function(message) {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = 'flex items-center gap-3 px-6 py-4 rounded-full bg-bg-titanium border border-secondary-container/40 text-white shadow-2xl transition-all duration-500 transform translate-y-10 opacity-0 pointer-events-auto';
        toast.style.backgroundColor = '#121214';
        toast.style.borderColor = 'rgba(214, 4, 29, 0.4)';
        toast.innerHTML = `
            <span class="material-symbols-outlined text-secondary-container" style="font-variation-settings: 'FILL' 1;">check_circle</span>
            <span class="font-medium text-xs tracking-wide">${message}</span>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.remove('translate-y-10', 'opacity-0');
        }, 10);

        setTimeout(() => {
            toast.classList.add('translate-y-[-10px]', 'opacity-0');
            setTimeout(() => {
                toast.remove();
            }, 500);
        }, 4000);
    };
});
