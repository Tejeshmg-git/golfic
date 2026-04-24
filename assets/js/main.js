/* 
  Golfic Core JS
  Handles Global Component Injection, Theme Toggle, and Mobile Navigation
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Reveal early so content doesn't stay hidden
    initScrollReveal();

    // 2. Inject Global Components
    injectGlobalComponents();
    
    // 3. Initialize Core Logic
    initTheme();
    initHeaderScroll();
    initButtonSanitization();

    // Remove loading state
    document.body.classList.remove('loading');
});

/* --- Scroll Reveal Logic --- */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    const observerOptions = {
        threshold: 0,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        // Fallback: If already in view or observer fails, show it
        observer.observe(el);
        
        // Immediate check for elements above the fold
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('active');
        }
    });
}

/* --- Global Component Injection --- */
function injectGlobalComponents() {
    const headerEl = document.getElementById('header-global');
    const footerEl = document.getElementById('footer-global');

    // Path Logic: Detect if we are in the /pages/ directory
    const isInPagesDir = window.location.pathname.includes('/pages/');
    const rootPrefix = isInPagesDir ? '../' : '';
    const pagesPrefix = isInPagesDir ? '' : 'pages/';

    if (headerEl) {
        headerEl.innerHTML = `
            <header>
                <div class="container nav-container">
                    <a href="${rootPrefix}index.html" class="logo">
                        <i data-lucide="target"></i> GOLFIC
                    </a>
                    
                    <nav class="nav-links">
                        <a href="${rootPrefix}index.html">Home v1</a>
                        <a href="${rootPrefix}home-v2.html">Home v2</a>
                        <a href="${pagesPrefix}about.html">About</a>
                        <a href="${pagesPrefix}services.html">Services</a>
                        <a href="${pagesPrefix}booking.html">Booking</a>
                        <a href="${pagesPrefix}contact.html">Contact</a>
                    </nav>
                    
                    <div class="header-actions">
                        <button class="icon-btn theme-toggle hide-mobile" aria-label="Toggle Theme">
                            <i data-lucide="moon"></i>
                        </button>
                        <button class="icon-btn rtl-toggle hide-mobile" aria-label="Toggle RTL">
                            <span class="rtl-icon-text">RTL</span>
                        </button>
                        <a href="${pagesPrefix}login.html" class="btn btn-secondary">Login</a>

                        <button class="icon-btn hamburger" id="menu-open">
                            <i data-lucide="menu"></i>
                        </button>
                    </div>
                </div>
            </header>

            <div class="menu-overlay" id="menu-overlay"></div>
            <div class="side-nav" id="side-nav">
                <div class="side-nav-header">
                    <a href="${rootPrefix}index.html" class="logo"><i data-lucide="target"></i> GOLFIC</a>
                    <button class="icon-btn" id="menu-close"><i data-lucide="x"></i></button>
                </div>
                <div class="side-nav-links">
                    <a href="${rootPrefix}index.html">Home v1</a>
                    <a href="${rootPrefix}home-v2.html">Home v2</a>
                    <a href="${pagesPrefix}about.html">About</a>
                    <a href="${pagesPrefix}services.html">Services</a>
                    <a href="${pagesPrefix}booking.html">Booking</a>
                    <a href="${pagesPrefix}contact.html">Contact</a>
                </div>
                <div class="side-nav-footer">
                    <div style="display: flex; flex-direction: column; gap: var(--s-4);">
                        <div class="side-nav-toggle-strip">
                            <span style="font-size: 0.75rem; letter-spacing: 2px; font-weight: 800; color: var(--secondary);">DARK MODE</span>
                            <button class="icon-btn theme-toggle" style="background: var(--secondary); color: var(--primary); width: 36px; height: 36px;"><i data-lucide="moon"></i></button>
                        </div>
                        <div class="side-nav-toggle-strip">
                            <span style="font-size: 0.75rem; letter-spacing: 2px; font-weight: 800; color: var(--secondary);">RTL MODE</span>
                            <button class="icon-btn rtl-toggle" style="background: rgba(255,255,255,0.1); width: auto; height: 36px; padding: 0 12px;"><span class="rtl-icon-text">RTL</span></button>
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: var(--s-3);">
                        <a href="${pagesPrefix}login.html" class="btn btn-secondary">Login</a>
                        <a href="${pagesPrefix}booking.html#suites" class="btn btn-primary">Book Now</a>
                    </div>
                </div>
            </div>
        `;
        initMobileMenu(); 
        setActiveNavLink();
    }

    if (footerEl) {
        footerEl.innerHTML = `
            <footer style="background-color: var(--primary); color: white; padding: var(--s-8) 0 var(--s-4);">
                <div class="container">
                    <div class="footer-grid">
                        <!-- Brand Column -->
                        <div class="footer-col" style="max-width: 320px;">
                            <a href="${rootPrefix}index.html" class="logo" style="color: var(--secondary); margin-bottom: var(--s-4); display: flex; align-items: center; gap: 8px;">
                                <i data-lucide="target"></i> GOLFIC
                            </a>
                            <p style="color: rgba(255,255,255,0.7); font-size: 0.9375rem; line-height: 1.6; margin-bottom: var(--s-6);">
                                The premier indoor golf destination for simulation, training, and social play. Play anywhere, any season.
                            </p>
                            <div class="social-links" style="display: flex; gap: var(--s-3);">
                                <a href="https://facebook.com" class="social-icon" aria-label="Facebook">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                                </a>
                                <a href="https://instagram.com" class="social-icon" aria-label="Instagram">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" y2="6.5"/></svg>
                                </a>
                                <a href="https://twitter.com" class="social-icon" aria-label="Twitter">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                                </a>
                                <a href="https://linkedin.com" class="social-icon" aria-label="LinkedIn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                                </a>
                            </div>
                        </div>
                        <!-- Quick Links -->
                        <div class="footer-col">
                            <h4>QUICK LINKS</h4>
                            <div class="footer-links">
                                <a href="${rootPrefix}index.html">Home v1</a>
                                <a href="${rootPrefix}home-v2.html">Home v2</a>
                                <a href="${pagesPrefix}services.html">Services</a>
                                <a href="${pagesPrefix}booking.html">Booking</a>
                            </div>
                        </div>
                        <!-- Support -->
                        <div class="footer-col">
                            <h4>SUPPORT</h4>
                            <div class="footer-links">
                                <a href="${pagesPrefix}about.html">About</a>
                                <a href="${pagesPrefix}contact.html">Contact</a>
                                <a href="${pagesPrefix}404.html">404 Error</a>
                                <a href="${pagesPrefix}coming-soon.html">Coming Soon</a>
                            </div>
                        </div>
                        <!-- Newsletter -->
                        <div class="footer-col">
                            <h4>NEWSLETTER</h4>
                            <p style="color: rgba(255,255,255,0.7); font-size: 0.875rem; margin-bottom: var(--s-4);">Join 1,000+ golfers receiving peak-hour alerts and pro tips.</p>
                            <div style="display: flex; gap: 0; background: rgba(0,0,0,0.2); border-radius: 4px; overflow: hidden; border: 1px solid rgba(255,255,255,0.05);">
                                <input type="email" placeholder="Your Email" style="flex: 1; background: transparent; border: none; color: white; padding: 10px 14px; font-size: 0.875rem; outline: none;">
                                <button class="btn btn-gold" style="border-radius: 0; padding: 10px 14px; display: flex; align-items: center; justify-content: center;">
                                    <i data-lucide="send" style="width: 18px; height: 18px;"></i>
                                </button>
                            </div>
                            <p style="color: rgba(255,255,255,0.4); font-size: 0.75rem; margin-top: var(--s-3); display: flex; align-items: center; gap: 6px;">
                                <i data-lucide="shield-check" style="width: 12px;"></i> No spam. Unsubscribe anytime.
                            </p>
                        </div>
                    </div>
                    <div class="footer-bottom" style="margin-top: var(--s-6); padding-top: var(--s-6); border-top: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center; color: rgba(255,255,255,0.5); font-size: 0.8125rem;">
                        <p>&copy; 2026 Golfic Simulation Lounge. All rights reserved.</p>
                        <p>Built for Golfers, By Golfers.</p>
                    </div>
                </div>
            </footer>
        `;
    }

    // Refresh Lucide Icons with more robust settling time
    if (window.lucide) {
        setTimeout(() => {
            window.lucide.createIcons();
        }, 100);
    } else {
        console.error('Lucide library not found. Please check CDN link.');
    }
}

/* --- Navigation Active State --- */
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const fileName = currentPath.split('/').pop() || 'index.html';
    
    // Select both desktop and mobile nav links
    const navLinks = document.querySelectorAll('.nav-links a, .side-nav-links a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        // Match the filename. Handle cases like 'index.html' vs '/'
        if (linkHref === fileName || (fileName === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/* --- Theme Management --- */
function initTheme() {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-layout');
    }

    // Sync icons on initial load
    setTimeout(() => {
        const allToggles = document.querySelectorAll('.theme-toggle i');
        allToggles.forEach(icon => {
            if (document.body.classList.contains('dark-layout')) {
                icon.setAttribute('data-lucide', 'sun');
            } else {
                icon.setAttribute('data-lucide', 'moon');
            }
        });
        if (window.lucide) window.lucide.createIcons();
    }, 150);
    
    document.addEventListener('click', (e) => {
        if (e.target.closest('.theme-toggle')) {
            document.body.classList.toggle('dark-layout');
            let theme = 'light';
            if (document.body.classList.contains('dark-layout')) {
                theme = 'dark';
            }
            localStorage.setItem('theme', theme);
            
            // Sync all theme toggle icons
            const allToggles = document.querySelectorAll('.theme-toggle i');
            allToggles.forEach(icon => {
                if (theme === 'dark') {
                    icon.setAttribute('data-lucide', 'sun');
                } else {
                    icon.setAttribute('data-lucide', 'moon');
                }
            });
            window.lucide.createIcons();
        }
    });
}

/* --- Button & Link Sanitization --- */
function initButtonSanitization() {
    // 1. Handle same-page anchor links and "dead" buttons
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        
        if (link) {
            const href = link.getAttribute('href');
            
            // Allow .no-toast links to proceed (useful for specific anchor jumps)
            if (link.classList.contains('no-toast')) return;

            // Check if it's a same-page anchor or an empty link
            if (href && (href.startsWith('#') || href === '' || href === 'javascript:void(0)')) {
                e.preventDefault();
                showNeuralToast("Neural pathway currently in configuration. Full access scheduled for next sequence.");
            }
        }
    });

    // 2. Handle Form Submissions & Special Action Buttons
    document.addEventListener('click', (e) => {
        // Handle Provision Plus Circle Toggle (Outside of button check)
        const provisionIcon = e.target.closest('[data-lucide="plus-circle"]');
        if (provisionIcon) {
            const parent = provisionIcon.parentElement;
            
            if (parent.style.borderColor === 'var(--secondary)') {
                parent.style.borderColor = 'var(--border)';
                provisionIcon.style.transform = 'rotate(0deg)';
                showNeuralToast("Provision Removed from Manifest.");
            } else {
                parent.style.borderColor = 'var(--secondary)';
                provisionIcon.style.transform = 'rotate(45deg)';
                showNeuralToast("Provision Logged in Temporal Sequence.");
            }
            return;
        }

        const target = e.target.closest('button, .btn');
        if (!target) return;

        // Booking Card Selection Toggle
        if (target.closest('.booking-step-card')) {
            const card = target.closest('.booking-step-card');
            const allCards = card.parentElement.querySelectorAll('.booking-step-card');
            
            allCards.forEach(c => {
                c.style.borderColor = 'var(--border)';
                const btn = c.querySelector('button');
                if (btn) btn.innerText = 'SELECT';
            });

            card.style.borderColor = 'var(--secondary)';
            target.innerText = 'SELECTED';
            showNeuralToast("Strategic Unit Locked. Parameters Synchronized.");
            return;
        }

        // Initialize Reservation Simulation
        if (target.innerText.includes('INITIALIZE RESERVATION')) {
            const originalText = target.innerHTML;
            target.innerHTML = '<i data-lucide="loader" class="spin"></i> CALIBRATING...';
            if (window.lucide) window.lucide.createIcons();
            
            setTimeout(() => {
                showNeuralToast("Reservation Initialized. Terminal Sync Complete.");
                target.innerHTML = originalText;
                if (window.lucide) window.lucide.createIcons();
            }, 2000);
            return;
        }
    });

    // 3. Handle Form Submissions
    document.addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target;
        const button = form.querySelector('button[type="submit"]');
        
        if (button) {
            const originalText = button.innerHTML;
            button.innerHTML = '<i data-lucide="loader" class="spin"></i> TRANSMITTING...';
            if (window.lucide) window.lucide.createIcons();
            
            setTimeout(() => {
                showNeuralToast("Transmission Successful. Your signal has been logged in the collective.");
                button.innerHTML = originalText;
                if (window.lucide) window.lucide.createIcons();
                form.reset();
            }, 1500);
        }
    });
}

/* --- Neural Toast System --- */
function showNeuralToast(message) {
    // Remove existing toast if any
    const existing = document.querySelector('.neural-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'neural-toast';
    toast.innerHTML = `
        <div class="toast-content">
            <i data-lucide="info" style="width: 18px; height: 18px; color: var(--secondary);"></i>
            <span>${message}</span>
        </div>
        <div class="toast-progress"></div>
    `;

    document.body.appendChild(toast);
    
    // Initialize icon
    if (window.lucide) window.lucide.createIcons();

    // Fade in
    setTimeout(() => toast.classList.add('active'), 10);

    // Auto remove
    setTimeout(() => {
        toast.classList.remove('active');
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

/* --- Mobile Navigation (Hamburger Side Nav) --- */
function initMobileMenu() {
    const menuOpen = document.getElementById('menu-open');
    const menuClose = document.getElementById('menu-close');
    const sideNav = document.getElementById('side-nav');
    const overlay = document.getElementById('menu-overlay');
    
    if (menuOpen && sideNav) {
        menuOpen.addEventListener('click', () => {
            sideNav.classList.add('active');
            if (overlay) overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    const closeMenu = () => {
        if (sideNav) sideNav.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (menuClose) menuClose.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);
}

/* --- Header Scroll Effect --- */
function initHeaderScroll() {
    window.addEventListener('scroll', () => {
        const headerEl = document.querySelector('header');
        if (headerEl) {
            if (window.scrollY > 50) {
                headerEl.classList.add('scrolled');
            } else {
                headerEl.classList.remove('scrolled');
            }
        }
    });

    // RTL Toggle Support
    document.addEventListener('click', (e) => {
        if (e.target.closest('.rtl-toggle')) {
            const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
            const newDir = isRTL ? 'ltr' : 'rtl';
            document.documentElement.setAttribute('dir', newDir);
            localStorage.setItem('rtl', newDir);
            
            // Sync all RTL toggle texts
            const allRtlTexts = document.querySelectorAll('.rtl-icon-text');
            allRtlTexts.forEach(span => {
                span.innerText = newDir === 'rtl' ? 'LTR' : 'RTL';
            });
        }
    });

    const savedRTL = localStorage.getItem('rtl');
    if (savedRTL === 'rtl') {
        document.documentElement.setAttribute('dir', 'rtl');
        // Initial sync
        setTimeout(() => {
            const allRtlTexts = document.querySelectorAll('.rtl-icon-text');
            allRtlTexts.forEach(span => span.innerText = 'LTR');
        }, 100);
    }
}

// Global Fallback: Ensure all icons are rendered after EVERYTHING
window.addEventListener('load', () => {
    if (window.lucide) {
        setTimeout(() => {
            window.lucide.createIcons();
        }, 200);
    }
});
