 
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.style.background = window.scrollY > 50 ? '#1a1a1a' : 'transparent';
    navbar.style.boxShadow = window.scrollY > 50 ? '0 2px 15px rgba(0,0,0,0.3)' : 'none';
});
 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
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