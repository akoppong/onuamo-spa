document.addEventListener('DOMContentLoaded', () => {
    const appRoot = document.getElementById('app-root');
    const mainElement = document.querySelector('main');
    const navLinksContainer = document.getElementById('nav-links');
    const navToggle = document.querySelector('.nav-toggle');
    const liveRegion = document.querySelector('.aria-live-region');

    // --- Mobile Navigation ---
    const toggleNav = () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navToggle.classList.toggle('open');
        navLinksContainer.classList.toggle('open');
    };

    navToggle.addEventListener('click', toggleNav);

    // Close mobile nav when a link is clicked
    navLinksContainer.addEventListener('click', (e) => {
        if (e.target.matches('.nav-link')) {
            if (navLinksContainer.classList.contains('open')) {
                toggleNav();
            }
        }
    });

    // --- Router ---
    const routes = {
        '/': {
            page: 'pages/home.html',
            title: 'Onuamo - Connecting You Directly to Quality Manufacturing',
            description: 'Onuamo connects retailers directly with manufacturers, streamlining sourcing and building transparent, quality-focused partnerships.'
        },
        '/about': {
            page: 'pages/about.html',
            title: 'About Us | Onuamo',
            description: 'Learn about our mission to bridge the gap between retailers and manufacturers with transparency and efficiency.'
        },
        '/services': {
            page: 'pages/services.html',
            title: 'Our Categories | Onuamo',
            description: 'Explore our curated categories including Apparel, Home & Kitchen, and Electronics from top-tier manufacturers.'
        },
        '/team': {
            page: 'pages/team.html',
            title: 'Our Team | Onuamo',
            description: 'Meet the dedicated team behind Onuamo, driving excellence in sourcing and operations.'
        },
        '/contact': {
            page: 'pages/contact.html',
            title: 'Contact Us | Onuamo',
            description: 'Get in touch with the Onuamo team for partnership inquiries or support.'
        },
    };

    const parseRequestURL = () => {
        const path = location.hash.slice(1).toLowerCase() || '/';
        return path;
    }

    const loadPage = async (path) => {
        const route = routes[path] || routes['/']; // Fallback to home

        // 1. Fade out current content
        mainElement.classList.add('fade-out');

        try {
            const response = await fetch(route.page);
            if (!response.ok) throw new Error(`Page not found: ${route.page}`);
            const content = await response.text();

            // Wait for fade-out to complete before swapping content
            setTimeout(() => {
                // 2. Update content and metadata
                appRoot.innerHTML = content;
                document.title = route.title;
                document.querySelector('meta[name="description"]').setAttribute('content', route.description);

                // 3. Accessibility: Update nav links and manage focus
                updateActiveNavLink(path);
                manageFocus();
                liveRegion.textContent = `Mapsd to ${route.title.split('|')[0].trim()} page.`;

                // 4. Fade in new content
                mainElement.classList.remove('fade-out');
            }, 200); // Half of CSS transition time

        } catch (error) {
            console.error('Failed to load page:', error);
            appRoot.innerHTML = `<div class="page-container"><h1 class="section-title">Error 404</h1><p class="section-subtitle">Page not found. Please check the URL and try again.</p></div>`;
            mainElement.classList.remove('fade-out');
        }
    }
    
    // --- Accessibility & UI Helpers ---
    const updateActiveNavLink = (path) => {
        const activePath = path === '/' ? '#/' : `#${path}`;
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('href') === activePath) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    const manageFocus = () => {
        const mainHeading = appRoot.querySelector('h1, h2');
        if (mainHeading) {
            mainHeading.setAttribute('tabindex', -1);
            mainHeading.focus();
        } else {
            mainElement.setAttribute('tabindex', -1);
            mainElement.focus();
        }
    }
    
    // --- Initial Load & Event Listeners ---
    window.addEventListener('hashchange', () => loadPage(parseRequestURL()));
    window.addEventListener('load', () => loadPage(parseRequestURL()));
});
