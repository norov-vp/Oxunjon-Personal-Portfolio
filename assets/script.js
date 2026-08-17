// ===== PRELOADER =====
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 2800);
});

// ===== CURSOR =====
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

document.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
    
    cursorOutline.style.left = e.clientX - 20 + 'px';
    cursorOutline.style.top = e.clientY - 20 + 'px';
});

document.addEventListener('mousedown', () => {
    cursorDot.style.transform = 'scale(1.5)';
    cursorOutline.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursorDot.style.transform = 'scale(1)';
    cursorOutline.style.transform = 'scale(1)';
});

// Hover links
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
        cursorOutline.style.borderColor = 'var(--secondary)';
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.borderColor = 'var(--primary)';
    });
});

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    themeToggle.innerHTML = newTheme === 'dark' 
        ? '<i class="fas fa-moon"></i>' 
        : '<i class="fas fa-sun"></i>';
});

// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== NAVBAR ACTIVE LINK =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== TYPING EFFECT =====
const typingText = document.querySelector('.typing-text');
const words = [
    'Full-Stack Dasturchi',
    'Frontend Developer',
    'Backend Developer',
    'Freelancer',
    'Tech Innovator'
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

typeEffect();

// ===== PROGRESS BARS =====
const progressBars = document.querySelectorAll('.skill-progress');

function animateProgress() {
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 200);
    });
}

const skillsSection = document.querySelector('.skills');
let progressAnimated = false;

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !progressAnimated) {
            progressAnimated = true;
            animateProgress();
        }
    });
}, { threshold: 0.3 });

progressObserver.observe(skillsSection);

// ===== COUNTER ANIMATION =====
const stats = document.querySelectorAll('.stat-number');

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'));
    let current = 0;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let step = 0;
    
    const timer = setInterval(() => {
        step++;
        current += increment;
        if (step >= steps) {
            el.textContent = target + '+';
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current);
        }
    }, duration / steps);
}

const aboutSection = document.querySelector('.about');
let counterAnimated = false;

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterAnimated) {
            counterAnimated = true;
            stats.forEach(stat => animateCounter(stat));
        }
    });
}, { threshold: 0.3 });

counterObserver.observe(aboutSection);

// ===== PARTICLES =====
function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: var(--primary);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.3 + 0.1};
            animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        container.appendChild(particle);
    }
}

// Particle animatsiyasini style-ga qo'shish
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes floatParticle {
        0% { transform: translateY(0) translateX(0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
    }
`;
document.head.appendChild(styleSheet);

createParticles();

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = contactForm.querySelectorAll('input, textarea');
    let allFilled = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            allFilled = false;
            input.style.borderColor = '#ff6b6b';
            setTimeout(() => input.style.borderColor = '', 2000);
        }
    });

    if (!allFilled) {
        alert('Iltimos, barcha maydonlarni to\'ldiring!');
        return;
    }

    const btn = contactForm.querySelector('.btn');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Yuborilmoqda...';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Xabar yuborildi! ✅';
        btn.style.background = 'var(--secondary)';
        contactForm.reset();
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
            btn.style.background = '';
        }, 3000);
    }, 2000);
});

// ===== SCROLL TO TOP =====
const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
});

scrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== CONSOLE =====
console.log('%c🚀 Oxunjon | Professional Portfolio', 'font-size: 28px; font-weight: bold; color: #6c5ce7;');
console.log('%c✨ 4+ yillik tajriba | 50+ loyiha', 'font-size: 16px; color: #00b894;');
console.log('%c📧 oxunjon@example.com', 'font-size: 14px; color: #a29bfe;');
console.log('%c💻 Full-Stack Developer', 'font-size: 14px; color: #fd79a8;');