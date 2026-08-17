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

if (cursorDot && cursorOutline) {
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
}

// ===== THEME =====
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', newTheme);
    });

    // Saqlangan temani yuklash
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    }
}

// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
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
}

// ===== TIL TANLASH =====
const langBtn = document.getElementById('langBtn');
const langDropdown = document.getElementById('langDropdown');
const currentLangSpan = document.getElementById('currentLang');

const translations = {
    uz: {
        'nav-home': 'Bosh',
        'nav-about': 'Men',
        'nav-skills': "Ko'nikmalar",
        'nav-projects': 'Loyihalar',
        'nav-services': 'Xizmatlar',
        'nav-contact': 'Aloqa',
        'hero-badge': 'Open to Work',
        'hero-greeting': 'Salom, men',
        'hero-highlight': 'Full-Stack Dasturchi',
        'hero-experience': ' | 4+ yillik tajriba | 50+ loyiha',
        'hero-projects': 'Loyihalar',
        'hero-contact': "Bog'lanish",
        'scroll': 'Scroll',
        'about-title': "Men haqimda",
        'about-me': 'Men',
        'about-bio': "Full-Stack dasturchi, zamonaviy veb-ilovalar va mobil dasturlar yarataman. Har bir loyihaga kreativ yondashaman va sifatli natijalarni taqdim etaman.",
        'about-location': 'Manzil',
        'about-location-value': "Toshkent, O'zbekiston",
        'about-education': "Ta'lim",
        'about-education-value': 'TATU, Kompyuter injiniringi',
        'about-current': 'Hozirgi',
        'about-current-value': 'Senior Dasturchi @ TechCorp',
        'about-certificates': 'Sertifikatlar',
        'about-certificates-value': 'AWS, React, Node.js',
        'stat-projects': 'Loyihalar',
        'stat-experience': 'Yillik tajriba',
        'stat-clients': 'Mijozlar',
        'skills-title': "Ko'nikmalar",
        'projects-title': 'Loyihalar',
        'projects-more': "Ko'proq loyihalar",
        'services-title': 'Xizmatlar',
        'service-web-title': 'Web Sayt Yaratish',
        'service-web-desc': 'Corporate, blog, landing page',
        'service-web-f1': 'Responsive',
        'service-web-f2': 'SEO',
        'service-web-f3': 'Tez yuklanish',
        'service-ecom-title': 'E-Commerce',
        'service-ecom-desc': "Online-do'kon tizimi",
        'service-ecom-f1': "To'lov tizimi",
        'service-ecom-f2': 'Admin panel',
        'service-ecom-f3': 'Yetkazib berish',
        'service-mobile-title': 'Mobil Ilova',
        'service-mobile-desc': 'Android va iOS ilovalar',
        'service-mobile-f1': 'Cross-platform',
        'service-mobile-f2': 'Push xabarlar',
        'service-mobile-f3': 'Backend',
        'service-ai-title': 'AI & Bot',
        'service-ai-desc': 'Telegram bot va AI yordamchi',
        'service-ai-f1': 'Telegram bot',
        'service-ai-f2': 'AI integrasiya',
        'service-ai-f3': 'Avtomatlashtirish',
        'service-badge': '🔥 Mashhur',
        'service-order': 'Buyurtma',
        'contact-title': 'Aloqa',
        'contact-greeting': 'Keling',
        'contact-greeting-highlight': "bog'lanamiz",
        'contact-desc': "Loyihangiz bormi? Men bilan bog'lanishingiz mumkin",
        'contact-email': 'Email',
        'contact-phone': 'Telefon',
        'contact-location': 'Manzil',
        'contact-location-value': "Toshkent, O'zbekiston",
        'contact-name-placeholder': 'Ismingiz',
        'contact-email-placeholder': 'Email',
        'contact-subject-placeholder': 'Mavzu',
        'contact-message-placeholder': 'Xabar',
        'contact-send': 'Yuborish',
        'footer-desc': "Zamonaviy veb-ilovalar va mobil dasturlar yarataman.",
        'footer-menu': 'Menyu',
        'footer-services': 'Xizmatlar',
        'footer-contact': "Bog'lanish",
        'footer-copyright': '© 2026 Oxunjon. Barcha huquqlar himoyalangan.',
        'footer-made': '❤️ bilan yaratilgan'
    },
    ru: {
        'nav-home': 'Главная',
        'nav-about': 'Обо мне',
        'nav-skills': 'Навыки',
        'nav-projects': 'Проекты',
        'nav-services': 'Услуги',
        'nav-contact': 'Контакты',
        'hero-badge': 'Открыт к работе',
        'hero-greeting': 'Привет, я',
        'hero-highlight': 'Full-Stack разработчик',
        'hero-experience': ' | 4+ лет опыта | 50+ проектов',
        'hero-projects': 'Проекты',
        'hero-contact': 'Связаться',
        'scroll': 'Листайте',
        'about-title': 'Обо мне',
        'about-me': 'Я',
        'about-bio': 'Full-Stack разработчик, создаю современные веб-приложения и мобильные приложения. Подхожу к каждому проекту творчески и предоставляю качественные результаты.',
        'about-location': 'Местоположение',
        'about-location-value': 'Ташкент, Узбекистан',
        'about-education': 'Образование',
        'about-education-value': 'ТУИТ, Компьютерная инженерия',
        'about-current': 'Текущий',
        'about-current-value': 'Старший разработчик @ TechCorp',
        'about-certificates': 'Сертификаты',
        'about-certificates-value': 'AWS, React, Node.js',
        'stat-projects': 'Проекты',
        'stat-experience': 'Лет опыта',
        'stat-clients': 'Клиенты',
        'skills-title': 'Навыки',
        'projects-title': 'Проекты',
        'projects-more': 'Больше проектов',
        'services-title': 'Услуги',
        'service-web-title': 'Создание сайтов',
        'service-web-desc': 'Корпоративные, блоги, лендинги',
        'service-web-f1': 'Адаптивность',
        'service-web-f2': 'SEO',
        'service-web-f3': 'Быстрая загрузка',
        'service-ecom-title': 'E-Commerce',
        'service-ecom-desc': 'Система интернет-магазина',
        'service-ecom-f1': 'Платёжная система',
        'service-ecom-f2': 'Админ-панель',
        'service-ecom-f3': 'Доставка',
        'service-mobile-title': 'Мобильное приложение',
        'service-mobile-desc': 'Приложения для Android и iOS',
        'service-mobile-f1': 'Кроссплатформенность',
        'service-mobile-f2': 'Push-уведомления',
        'service-mobile-f3': 'Бэкенд',
        'service-ai-title': 'AI и Бот',
        'service-ai-desc': 'Telegram бот и AI-помощник',
        'service-ai-f1': 'Telegram бот',
        'service-ai-f2': 'AI интеграция',
        'service-ai-f3': 'Автоматизация',
        'service-badge': '🔥 Популярный',
        'service-order': 'Заказать',
        'contact-title': 'Контакты',
        'contact-greeting': 'Давайте',
        'contact-greeting-highlight': 'свяжемся',
        'contact-desc': 'Есть проект? Свяжитесь со мной',
        'contact-email': 'Email',
        'contact-phone': 'Телефон',
        'contact-location': 'Местоположение',
        'contact-location-value': 'Ташкент, Узбекистан',
        'contact-name-placeholder': 'Ваше имя',
        'contact-email-placeholder': 'Email',
        'contact-subject-placeholder': 'Тема',
        'contact-message-placeholder': 'Сообщение',
        'contact-send': 'Отправить',
        'footer-desc': 'Создаю современные веб-приложения и мобильные приложения.',
        'footer-menu': 'Меню',
        'footer-services': 'Услуги',
        'footer-contact': 'Контакты',
        'footer-copyright': '© 2026 Oxunjon. Все права защищены.',
        'footer-made': 'Сделано с ❤️'
    },
    en: {
        'nav-home': 'Home',
        'nav-about': 'About',
        'nav-skills': 'Skills',
        'nav-projects': 'Projects',
        'nav-services': 'Services',
        'nav-contact': 'Contact',
        'hero-badge': 'Open to Work',
        'hero-greeting': 'Hi, I am',
        'hero-highlight': 'Full-Stack Developer',
        'hero-experience': ' | 4+ years experience | 50+ projects',
        'hero-projects': 'Projects',
        'hero-contact': 'Contact Me',
        'scroll': 'Scroll',
        'about-title': 'About Me',
        'about-me': 'I am',
        'about-bio': 'Full-Stack developer, creating modern web applications and mobile apps. I approach every project creatively and deliver quality results.',
        'about-location': 'Location',
        'about-location-value': 'Tashkent, Uzbekistan',
        'about-education': 'Education',
        'about-education-value': 'TATU, Computer Engineering',
        'about-current': 'Current',
        'about-current-value': 'Senior Developer @ TechCorp',
        'about-certificates': 'Certificates',
        'about-certificates-value': 'AWS, React, Node.js',
        'stat-projects': 'Projects',
        'stat-experience': 'Years Experience',
        'stat-clients': 'Clients',
        'skills-title': 'Skills',
        'projects-title': 'Projects',
        'projects-more': 'More Projects',
        'services-title': 'Services',
        'service-web-title': 'Website Development',
        'service-web-desc': 'Corporate, blog, landing page',
        'service-web-f1': 'Responsive',
        'service-web-f2': 'SEO',
        'service-web-f3': 'Fast Loading',
        'service-ecom-title': 'E-Commerce',
        'service-ecom-desc': 'Online store system',
        'service-ecom-f1': 'Payment System',
        'service-ecom-f2': 'Admin Panel',
        'service-ecom-f3': 'Delivery',
        'service-mobile-title': 'Mobile App',
        'service-mobile-desc': 'Android and iOS apps',
        'service-mobile-f1': 'Cross-platform',
        'service-mobile-f2': 'Push Notifications',
        'service-mobile-f3': 'Backend',
        'service-ai-title': 'AI & Bot',
        'service-ai-desc': 'Telegram bot and AI assistant',
        'service-ai-f1': 'Telegram bot',
        'service-ai-f2': 'AI Integration',
        'service-ai-f3': 'Automation',
        'service-badge': '🔥 Popular',
        'service-order': 'Order',
        'contact-title': 'Contact',
        'contact-greeting': "Let's",
        'contact-greeting-highlight': 'Connect',
        'contact-desc': 'Have a project? Contact me',
        'contact-email': 'Email',
        'contact-phone': 'Phone',
        'contact-location': 'Location',
        'contact-location-value': 'Tashkent, Uzbekistan',
        'contact-name-placeholder': 'Your Name',
        'contact-email-placeholder': 'Email',
        'contact-subject-placeholder': 'Subject',
        'contact-message-placeholder': 'Message',
        'contact-send': 'Send',
        'footer-desc': 'Creating modern web applications and mobile apps.',
        'footer-menu': 'Menu',
        'footer-services': 'Services',
        'footer-contact': 'Contact',
        'footer-copyright': '© 2026 Oxunjon. All rights reserved.',
        'footer-made': 'Made with ❤️'
    }
};

let currentLang = 'uz';

if (langBtn && langDropdown) {
    // Dropdownni ochish/yopish
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
    });

    document.addEventListener('click', () => {
        langDropdown.classList.remove('active');
    });

    // Tilni o'zgartirish
    langDropdown.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            currentLang = lang;
            currentLangSpan.textContent = lang.toUpperCase();
            langDropdown.querySelectorAll('button').forEach(b => b.classList.remove('active-lang'));
            btn.classList.add('active-lang');
            langDropdown.classList.remove('active');
            applyTranslations(lang);
            localStorage.setItem('lang', lang);
        });
    });

    // Saqlangan tilni yuklash
    const savedLang = localStorage.getItem('lang');
    if (savedLang && translations[savedLang]) {
        currentLang = savedLang;
        currentLangSpan.textContent = savedLang.toUpperCase();
        langDropdown.querySelectorAll('button').forEach(b => {
            b.classList.toggle('active-lang', b.dataset.lang === savedLang);
        });
        applyTranslations(savedLang);
    }
}

function applyTranslations(lang) {
    const t = translations[lang];
    if (!t) return;

    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.dataset.key;
        if (t[key] !== undefined) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = t[key];
            } else {
                el.textContent = t[key];
            }
        }
    });

    // Nav-menu dagi span larni alohida yangilash
    document.querySelectorAll('.nav-menu a[data-key]').forEach(el => {
        const key = el.dataset.key;
        const span = el.querySelector('span');
        if (span && t[key] !== undefined) {
            span.textContent = t[key];
        }
    });

    // Footer dagi menyu linklarini yangilash
    document.querySelectorAll('.footer-links a[data-key]').forEach(el => {
        const key = el.dataset.key;
        if (t[key] !== undefined && !el.querySelector('i')) {
            el.textContent = t[key];
        }
    });

    document.documentElement.setAttribute('lang', lang);
}

// ===== TYPING =====
const typingText = document.querySelector('.typing-text');
if (typingText) {
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
        if (!isDeleting && charIndex === current.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeEffect, 500);
            return;
        }
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
    typeEffect();
}

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
        if (step >= steps) {
            el.textContent = target + '+';
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current);
        }
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

if (aboutSection) counterObserver.observe(aboutSection);

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
    if (!projectsGrid) return;
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

if (projectsGrid) renderProjects(visibleProjects);

if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
        visibleProjects += 4;
        if (visibleProjects >= projects.length) {
            visibleProjects = projects.length;
            showMoreBtn.style.display = 'none';
        }
        renderProjects(visibleProjects);
    });
}

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
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
}

// ===== SCROLL TOP =====
const scrollTop = document.getElementById('scrollTop');
if (scrollTop) {
    window.addEventListener('scroll', () => {
        scrollTop.classList.toggle('visible', window.scrollY > 500);
    });
    scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

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
console.log('%c🌍 3 til qo\'llab-quvvatlanadi: O\'zbek, Rus, Ingliz', 'font-size: 14px; color: #a29bfe;');