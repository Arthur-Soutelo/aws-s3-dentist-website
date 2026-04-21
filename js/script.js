// Custom JavaScript for Clínica Odontológica da Dra. Sarah

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to current nav item (for single page, but can adapt)
const currentLocation = window.location.pathname;
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

navLinks.forEach(link => {
    if (link.getAttribute('href') === currentLocation.split('/').pop()) {
        link.classList.add('active');
    }
});

// Lazy loading for images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Form validation for contact forms (if added later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });

    return isValid;
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Any initialization code here
    console.log('Website loaded successfully');

    // Language toggle
    let currentLang = localStorage.getItem('language') || 'pt';
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        // Store original text
        document.querySelectorAll('[data-en]').forEach(el => {
            if (!el.dataset.pt) {
                el.dataset.pt = el.innerHTML;
            }
        });
        document.querySelectorAll('img[data-en]').forEach(img => {
            if (!img.dataset.ptAlt) {
                img.dataset.ptAlt = img.alt;
            }
        });

        // Set initial language
        if (currentLang === 'en') {
            document.querySelectorAll('[data-en]').forEach(el => {
                el.innerHTML = el.dataset.en;
            });
            document.querySelectorAll('img[data-en]').forEach(img => {
                img.alt = img.dataset.en;
            });
        }

        langToggle.addEventListener('click', function() {
            if (currentLang === 'pt') {
                currentLang = 'en';
                localStorage.setItem('language', 'en');
                document.querySelectorAll('[data-en]').forEach(el => {
                    el.innerHTML = el.dataset.en;
                });
                document.querySelectorAll('img[data-en]').forEach(img => {
                    img.alt = img.dataset.en;
                });
            } else {
                currentLang = 'pt';
                localStorage.setItem('language', 'pt');
                document.querySelectorAll('[data-en]').forEach(el => {
                    el.innerHTML = el.dataset.pt;
                });
                document.querySelectorAll('img[data-en]').forEach(img => {
                    img.alt = img.dataset.ptAlt;
                });
            }
            
            // Reload dynamic content if functions exist
            if (typeof loadServices === 'function') {
                document.getElementById('services-container').innerHTML = '';
                loadServices();
            }
            if (typeof loadTestimonials === 'function') {
                document.getElementById('testimonials-container').innerHTML = '';
                loadTestimonials();
            }
        });
    }
});