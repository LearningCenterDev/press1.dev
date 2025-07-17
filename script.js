// Modern Coming Soon Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Email subscription form handling
    const subscriptionForm = document.getElementById('subscriptionForm');
    const emailInput = document.getElementById('email');
    const submitBtn = subscriptionForm.querySelector('.submit-btn');
    const formMessage = document.getElementById('formMessage');

    // Form submission handler
    subscriptionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate API call (replace with actual API endpoint)
        setTimeout(() => {
            // Simulate successful subscription
            showMessage('Thank you! We\'ll notify you when we launch.', 'success');
            emailInput.value = '';
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Store email in localStorage (for demo purposes)
            storeEmailSubscription(email);
            
        }, 2000);
    });

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show form message
    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        
        // Auto-hide message after 5 seconds
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }, 5000);
    }

    // Store email subscription (demo purpose)
    function storeEmailSubscription(email) {
        const subscriptions = JSON.parse(localStorage.getItem('emailSubscriptions') || '[]');
        if (!subscriptions.includes(email)) {
            subscriptions.push(email);
            localStorage.setItem('emailSubscriptions', JSON.stringify(subscriptions));
        }
    }

    // Real-time email validation
    emailInput.addEventListener('input', function() {
        const email = this.value.trim();
        if (email && !isValidEmail(email)) {
            this.style.borderColor = '#dc2626';
        } else {
            this.style.borderColor = '';
        }
    });

    // Smooth scrolling for any anchor links (future use)
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

    // Keyboard navigation improvements
    document.addEventListener('keydown', function(e) {
        // Enter key on social links
        if (e.target.classList.contains('social-link') && e.key === 'Enter') {
            e.target.click();
        }
    });

    // Add focus styles for better accessibility
    const focusableElements = document.querySelectorAll('input, button, a');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #2563eb';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });

    // Intersection Observer for animation triggers
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe animated elements
    document.querySelectorAll('.main-content, .logo-section, .footer').forEach(el => {
        observer.observe(el);
    });

    // Add mouse move parallax effect to floating elements
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateParallax() {
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.02;
            const x = (mouseX - window.innerWidth / 2) * speed;
            const y = (mouseY - window.innerHeight / 2) * speed;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        requestAnimationFrame(updateParallax);
    }

    // Start parallax effect only if user prefers motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        updateParallax();
    }

    // Add loading state to page
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Handle form reset on page visibility change
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Page is hidden, save form state if needed
        } else {
            // Page is visible, restore form state if needed
        }
    });

    // Progressive enhancement for browsers without JavaScript
    // This ensures the page still works without JS
    const noJsElements = document.querySelectorAll('.no-js-hidden');
    noJsElements.forEach(el => {
        el.style.display = 'block';
    });
});

// Error handling for the entire application
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You could send this to an error logging service
});

// Service Worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Utility functions for future use
const utils = {
    // Debounce function for performance optimization
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for performance optimization
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Format date for display
    formatDate: function(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    }
};

// Export utils for module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = utils;
}
