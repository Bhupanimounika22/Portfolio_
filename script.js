// Initialize AOS animation library
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: true
    });
    
    // Add typing animation to hero title
    if (document.querySelector('.hero-title')) {
        const heroTitle = document.querySelector('.hero-title');
        heroTitle.classList.add('animate__animated', 'animate__fadeIn');
    }
    
    // Add particle background
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#4fffb0" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#4fffb0", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out", bounce: false }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "grab" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 1 } },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.style.background = window.scrollY > 50 ? '#1a1a1a' : 'transparent';
    navbar.style.boxShadow = window.scrollY > 50 ? '0 2px 15px rgba(0,0,0,0.3)' : 'none';
    
    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const scrollPosition = window.scrollY;
        heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    }
});
 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.classList.add('animate__animated', 'animate__pulse');
    });
    
    card.addEventListener('mouseleave', function() {
        this.classList.remove('animate__animated', 'animate__pulse');
    });
});
 
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const elements = entry.target.querySelectorAll('.animate-on-scroll');
        
        if (entry.isIntersecting) {
            elements.forEach(el => {
                el.classList.add('is-visible');
                const delay = el.getAttribute('data-delay') || '0s';
                el.style.animationDelay = delay;
 
                if (el.classList.contains('stat-number')) {
                    const target = parseInt(el.getAttribute('data-count'));
                    let current = 0;
                    const duration = 1500; 
                    const startTime = performance.now();

                    const updateCount = (timestamp) => {
                        const elapsed = timestamp - startTime;
                        current = Math.min(target, (elapsed / duration) * target);
                        el.textContent = Math.ceil(current);

                        if (current < target) {
                            requestAnimationFrame(updateCount);
                        } else {
                            el.textContent = target;
                        }
                    };

                    el.textContent = '0'; 
                    requestAnimationFrame(updateCount);
                }
            });
        } else {
            elements.forEach(el => {
                el.classList.remove('is-visible');
                el.style.animationDelay = '0s';

   
                if (el.classList.contains('stat-number')) {
                    el.textContent = '0';
                }
            });
        }
    });
}, { threshold: 0.3 });

 
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});