// Wedding Website JavaScript Functions
// =====================================

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile navigation toggle
    const navToggle = document.getElementById('navToggle');
    const header = document.getElementById('header');
    
    if (navToggle && header) {
        navToggle.addEventListener('click', function() {
            header.classList.toggle('open');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('#nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            header.classList.remove('open');
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.item, .about-text, .about-heading');
    animateElements.forEach(el => observer.observe(el));


    // RSVP form validation (if you add a form later)
    const rsvpForm = document.getElementById('rsvpForm');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateRSVPForm(this);
        });
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});


// RSVP Form Validation
function validateRSVPForm(form) {
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const attendance = formData.get('attendance');
    
    let isValid = true;
    let errorMessage = '';
    
    if (!name || name.trim().length < 2) {
        isValid = false;
        errorMessage += 'Please enter a valid name.\n';
    }
    
    if (!email || !isValidEmail(email)) {
        isValid = false;
        errorMessage += 'Please enter a valid email address.\n';
    }
    
    if (!attendance) {
        isValid = false;
        errorMessage += 'Please select your attendance.\n';
    }
    
    if (isValid) {
        // Here you would typically send the data to a server
        alert('Thank you for your RSVP! We look forward to celebrating with you.');
        form.reset();
    } else {
        alert(errorMessage);
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Utility Functions
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
function addScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.addEventListener('click', scrollToTop);
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
}

// Initialize scroll to top button
addScrollToTopButton();

// Wedding countdown timer (if you want to add it to other sections)
function createWeddingCountdown(targetDate, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            clearInterval(timer);
            container.innerHTML = "<h3>The Wedding Day!</h3>";
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        container.innerHTML = `
            <div class="countdown-item">
                <span class="countdown-number">${days}</span>
                <span class="countdown-label">Days</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${hours}</span>
                <span class="countdown-label">Hours</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${minutes}</span>
                <span class="countdown-label">Minutes</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${seconds}</span>
                <span class="countdown-label">Seconds</span>
            </div>
        `;
    }, 1000);
}

// Add CSS for JavaScript functionality
const additionalStyles = `
    <style>
        /* Scroll to top button */
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .scroll-to-top.show {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-to-top:hover {
            background: var(--secondary-black);
            transform: translateY(-2px);
        }
        
        
        /* Animation classes */
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Header scroll effect */
        #header.scrolled {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
        }
        
        /* Gallery hover effects */
        #projects .item:hover {
            transform: translateY(-8px) scale(1.02);
        }
    </style>
`;

// Add the styles to the document
document.head.insertAdjacentHTML('beforeend', additionalStyles);
