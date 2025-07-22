document.addEventListener('DOMContentLoaded', () => {
    const navLinksContainer = document.getElementById('nav-links');
    const navToggle = document.querySelector('.nav-toggle');
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.nav-links a.nav-link');

    // --- Mobile Navigation ---
    const toggleNav = () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navToggle.classList.toggle('open');
        navLinksContainer.classList.toggle('open');
    };

    navToggle.addEventListener('click', toggleNav);

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }

            // Close mobile nav after click
            if (navLinksContainer.classList.contains('open')) {
                toggleNav();
            }
        });
    });

    // --- Active Link Highlighting on Scroll ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.4 // Section is 40% in view
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.id;
                
                // Remove active state from all links
                navLinks.forEach(link => {
                    link.removeAttribute('aria-current');
                });
                
                // Add active state to the corresponding link
                const activeLink = document.querySelector(`.nav-links a[href="#${targetId}"]`);
                if(activeLink) {
                    activeLink.setAttribute('aria-current', 'page');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});
