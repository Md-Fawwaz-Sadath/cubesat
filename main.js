// Initialize AOS with custom settings
AOS.init({
    duration: 800,
    once: false,
    mirror: true,
    offset: 100,
    easing: 'ease-in-out'
});

// Animation Observer Setup
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Reset the element's styles to trigger animation
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'none';
            
            // Add specific animations based on data attribute
            const animationType = entry.target.dataset.animationType;
            if (animationType) {
                entry.target.classList.add(`animate-${animationType}`);
            }
        } else {
            // Reset the element when it's out of view
            entry.target.style.opacity = '0';
            const animationType = entry.target.dataset.animationType;
            if (animationType) {
                entry.target.classList.remove(`animate-${animationType}`);
            }
            
            // Reset transform based on element type
            if (entry.target.classList.contains('hero-title')) {
                entry.target.style.transform = 'translateY(30px)';
            } else if (entry.target.classList.contains('component-card')) {
                entry.target.style.transform = 'translateY(50px)';
            } else if (entry.target.classList.contains('operation-step')) {
                const isEven = Array.from(entry.target.parentNode.children).indexOf(entry.target) % 2 === 0;
                entry.target.style.transform = isEven ? 'translateX(-50px)' : 'translateX(50px)';
            } else if (entry.target.classList.contains('feature-item')) {
                entry.target.style.transform = 'translateX(-30px)';
            } else if (entry.target.classList.contains('image-container')) {
                entry.target.style.transform = 'scale(0.95)';
            }
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '-50px'
});

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    // Hero section elements
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-text, .btn-glow');
    heroElements.forEach(el => animationObserver.observe(el));

    // Section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(el => animationObserver.observe(el));

    // Component cards with staggered delay
    const componentCards = document.querySelectorAll('.component-card');
    componentCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        animationObserver.observe(card);
    });

    // Operation steps
    const operationSteps = document.querySelectorAll('.operation-step');
    operationSteps.forEach((step, index) => {
        step.style.transitionDelay = `${index * 0.1}s`;
        animationObserver.observe(step);
    });

    // Feature items
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        animationObserver.observe(item);
    });

    // Image containers
    const imageContainers = document.querySelectorAll('.image-container');
    imageContainers.forEach(el => animationObserver.observe(el));
});

// Enhanced component card animations
document.querySelectorAll('.component-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (this.style.transform === 'translate(0px) scale(1)') {
            this.style.transform = 'translateY(-10px)';
        }
        const icon = this.querySelector('.component-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1)';
            icon.style.textShadow = '0 0 15px var(--glow-red)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        if (this.style.transform === 'translateY(-10px)') {
            this.style.transform = 'translate(0) scale(1)';
        }
        const icon = this.querySelector('.component-icon');
        if (icon) {
            icon.style.transform = 'scale(1)';
            icon.style.textShadow = 'none';
        }
    });
});

// Refresh AOS on scroll
window.addEventListener('scroll', () => {
    AOS.refresh();
});

// Smooth scroll with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced parallax effect for hero section
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const scrollDirection = scrolled > lastScrollTop ? 'down' : 'up';
    
    // Adjust parallax speed based on scroll direction
    const speed = scrollDirection === 'down' ? 0.4 : 0.3;
    hero.style.backgroundPositionY = -(scrolled * speed) + 'px';
    
    lastScrollTop = scrolled <= 0 ? 0 : scrolled;
});

// Enhanced LED animation
function createLEDAnimation() {
    const ledContainer = document.createElement('div');
    ledContainer.className = 'led-strip';
    ledContainer.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, 
            transparent 0%, 
            var(--primary-red) 20%, 
            var(--primary-red) 80%, 
            transparent 100%
        );
        animation: ledFlow 3s linear infinite;
        opacity: 0.6;
        filter: blur(1px);
    `;
    return ledContainer;
}

// Add LED animation with fade-in
document.addEventListener('DOMContentLoaded', function() {
    const ledAnimation = createLEDAnimation();
    document.querySelector('.hero').appendChild(ledAnimation);
    setTimeout(() => {
        ledAnimation.style.opacity = '0.6';
    }, 1000);
});

// Add keyframe animation for LED strip
const style = document.createElement('style');
style.textContent = `
    @keyframes ledFlow {
        0% {
            background-position: -200% 0;
            opacity: 0.4;
        }
        50% {
            opacity: 0.6;
        }
        100% {
            background-position: 200% 0;
            opacity: 0.4;
        }
    }
`;
document.head.appendChild(style);

// Enhanced scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary-red), #ff1a4d);
    z-index: 1000;
    transition: width 0.2s ease-out, opacity 0.3s ease-in-out;
    opacity: 0;
    box-shadow: 0 0 10px var(--glow-red);
`;
document.body.appendChild(progressBar);

// Show progress bar only when scrolling
let scrollTimeout;
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    progressBar.style.width = scrolled + '%';
    progressBar.style.opacity = '1';
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        progressBar.style.opacity = '0';
    }, 1000);
});

// Intersection Observer for enhanced animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            if (entry.target.classList.contains('operation-step')) {
                entry.target.style.transform = 'translateX(0)';
                entry.target.style.opacity = '1';
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-item, .operation-step, .component-card').forEach(el => {
    observer.observe(el);
    if (el.classList.contains('operation-step')) {
        el.style.transform = 'translateX(-20px)';
        el.style.opacity = '0';
    }
});
