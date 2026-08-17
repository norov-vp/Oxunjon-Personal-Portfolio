// ===== PRELOADER =====
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 3200);
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

// ===== THEME =====
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
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

// ===== TYPING =====
const typingText = document.querySelector('.typing-text');
const words = ['Full-Stack Dasturchi', 'Frontend Developer', 'Backend Developer', 'Freelancer', 'Tech Innovator'];
let wordIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
    const current = words[wordIndex];
    if (isDeleting) {
        typingText.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }
    if (!isDeleting && charIndex === current.length) { isDeleting = true; setTimeout(typeEffect, 2000); return; }
    if (isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; setTimeout(typeEffect, 500); return; }
    setTimeout(typeEffect, isDeleting ? 50 : 100);
}
typeEffect();

// ===== COUNTER =====
const stats = document.querySelectorAll('.stat-number');

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'));
    let current = 0;
    const steps = 50;
    const increment = target / steps;
    let step = 0;
    const timer = setInterval(() => {
        step++;
        current += increment;
        if (step >= steps) { el.textContent = target + '+'; clearInterval(timer); }
        else { el.textContent = Math.floor(current); }
    }, 40);
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

// ===== PROJECTS =====
const projects = [
    { title: 'E-Commerce Platform', desc: 'Magento asosida online-do\'kon', tags: ['React', 'Node.js', 'MongoDB'], icon: 'fa-shopping-cart' },
    { title: 'AI Assistant Bot', desc: 'Telegram bot + Python AI', tags: ['Python', 'AI', 'Telegram'], icon: 'fa-robot' },
    { title: 'Task Manager Pro', desc: 'Vue.js + Firebase', tags: ['Vue.js', 'Firebase', 'Tailwind'], icon: 'fa-tasks' },
    { title: 'Analytics Dashboard', desc: 'Real-time vizualizatsiya', tags: ['D3.js', 'Express', 'PostgreSQL'], icon: 'fa-chart-line' },
    { title: 'Portfolio Builder', desc: 'Dasturchilar uchun portfolio', tags: ['React', 'Tailwind', 'Framer'], icon: 'fa-briefcase' },
    { title: 'CRM System', desc: 'Mijozlar boshqaruvi tizimi', tags: ['Vue.js', 'Laravel', 'MySQL'], icon: 'fa-users' },
    { title: 'Food Delivery App', desc: 'Oziq-ovqat yetkazish ilovasi', tags: ['React Native', 'Node.js', 'MongoDB'], icon: 'fa-utensils' },
    { title: 'Chat Application', desc: 'Real-time chat ilovasi', tags: ['Socket.io', 'React', 'Express'], icon: 'fa-comments' },
];

let visibleProjects = 4;
const projectsGrid = document.getElementById('projectsGrid');
const showMoreBtn = document.getElementById('showMoreBtn');

function renderProjects(count) {
    projectsGrid.innerHTML = '';
    projects.slice(0, count).forEach((p, i) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.style.animationDelay = (i * 0.1) + 's';
        card.innerHTML = `
            <div class="project-thumb">
                <div class="project-icon"><i class="fas ${p.icon}"></i></div>
                <div class="project-overlay">
                    <a href="#" onclick="alert('Loyihaga o\'tish: ${p.title}')"><i class="fas fa-link"></i></a>
                    <a href="#" onclick="alert('GitHub: ${p.title}')"><i class="fab fa-github"></i></a>
                </div>
            </div>
            <div class="project-body">
                <h3>${p.title}</h3>
                <p>${p.desc}</p>
                <div class="project-tags">
                    ${p.tags.map(t => `<span>${t}</span>`).join('')}
                </div>
            </div>
        `;
        projectsGrid.appendChild(card);
    });
}

renderProjects(visibleProjects);

showMoreBtn.addEventListener('click', () => {
    visibleProjects += 4;
    if (visibleProjects >= projects.length) {
        visibleProjects = projects.length;
        showMoreBtn.style.display = 'none';
    }
    renderProjects(visibleProjects);
});

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('.btn');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Yuborilmoqda...';
    btn.disabled = true;
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Xabar yuborildi! ✅';
        btn.style.background = 'var(--secondary)';
        e.target.reset();
        setTimeout(() => {
            btn.innerHTML = original;
            btn.disabled = false;
            btn.style.background = '';
        }, 3000);
    }, 2000);
});

// ===== SCROLL TOP =====
const scrollTop = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    scrollTop.classList.toggle('visible', window.scrollY > 500);
});
scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ===== NAVBAR ACTIVE =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
});

// ===== CONSOLE =====
console.log('%c🚀 Oxunjon | Professional Portfolio', 'font-size: 28px; font-weight: bold; color: #6c5ce7;');
console.log('%c✨ 4+ yillik tajriba | 50+ loyiha', 'font-size: 16px; color: #00b894;');
console.log('%c💻 Full-Stack Developer', 'font-size: 14px; color: #fd79a8;');