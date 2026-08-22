// =========================================
// PRELOADER
// =========================================
window.addEventListener("load", function () {
    let percent = 0;
    const fill = document.getElementById("preloaderFill");
    const percentText = document.getElementById("preloaderPercent");

    const interval = setInterval(() => {
        percent += Math.floor(Math.random() * 5) + 3;
        if (percent >= 100) {
            percent = 100;
            clearInterval(interval);
            setTimeout(() => {
                document.body.classList.add("loaded");
                setTimeout(() => {
                    document.getElementById("preloader").style.display = "none";
                }, 600);
            }, 400);
        }
        fill.style.width = percent + "%";
        percentText.textContent = percent + "%";
    }, 80);
});

// =========================================
// AOS INIT
// =========================================
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: "ease-out-cubic",
});

// =========================================
// TYPING EFFECT
// =========================================
const typingTexts = [
    "Full-Stack Developer",
    "Web Developer",
    "Mobile Developer",
    "AI Enthusiast",
    "Problem Solver",
    "Code Creator",
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById("typingText");

function typeEffect() {
    const currentText = typingTexts[textIndex];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentText.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        speed = 500;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();

// =========================================
// COUNTER ANIMATION
// =========================================
function animateCounter(element, target) {
    let current = 0;
    const increment = Math.ceil(target / 60);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = current + (target > 5 ? "+" : "");
    }, 30);
}

const statObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const statNum = el.querySelector(".stat-num");
                if (statNum) {
                    const count = parseInt(el.getAttribute("data-count"));
                    if (!isNaN(count)) {
                        animateCounter(statNum, count);
                    }
                }
                statObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 }
);

document.querySelectorAll(".stat").forEach((el) => {
    statObserver.observe(el);
});

// =========================================
// NAVBAR ACTIVE LINK
// =========================================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// =========================================
// MOBILE MENU
// =========================================
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("open");
});

navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navMenu.classList.remove("open");
    });
});

// =========================================
// THEME TOGGLE
// =========================================
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
    body.classList.toggle("light");
    const icon = themeToggle.querySelector("i");
    if (body.classList.contains("light")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
        localStorage.setItem("theme", "light");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
        localStorage.setItem("theme", "dark");
    }
});

if (localStorage.getItem("theme") === "light") {
    body.classList.add("light");
    themeToggle.querySelector("i").classList.remove("fa-moon");
    themeToggle.querySelector("i").classList.add("fa-sun");
}

// =========================================
// LANGUAGE DROPDOWN
// =========================================
const langToggle = document.getElementById("langToggle");
const langDropdown = document.getElementById("langDropdown");
const langOptions = langDropdown.querySelectorAll("button");
const currentLangLabel = document.getElementById("currentLang");

langToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle("open");
});

document.addEventListener("click", () => {
    langDropdown.classList.remove("open");
});

langOptions.forEach((option) => {
    option.addEventListener("click", () => {
        const lang = option.getAttribute("data-lang");
        setLanguage(lang);
        langDropdown.classList.remove("open");

        langOptions.forEach((o) => o.classList.remove("active"));
        option.classList.add("active");

        const langNames = { uz: "UZ", ru: "RU", en: "EN" };
        currentLangLabel.textContent = langNames[lang] || "UZ";
    });
});

const langData = {
    uz: {
        navHome: "Bosh",
        navAbout: "Men",
        navSkills: "Ko'nikmalar",
        navProjects: "Loyihalar",
        navServices: "Xizmatlar",
        navContact: "Aloqa",
        badge: "Open to Work",
        hello: "Salom, men",
        role: "Full-Stack Dasturchi",
        exp: "2+ yillik tajriba | 50+ loyiha",
        projectsBtn: "Loyihalar",
        contactBtn: "Bog‘lanish",
        aboutTitle: "Men haqimda",
        aboutBio: "Full-Stack dasturchi, zamonaviy veb-ilovalar va mobil dasturlar yarataman. Har bir loyihaga kreativ yondashaman va sifatli natijalarni taqdim etaman.",
        location: "Manzil",
        locationVal: "Samarqand, O'zbekiston",
        education: "Ta'lim",
        educationVal: "SamDU, Sun'iy Intellekt",
        current: "Hozirgi",
        currentVal: "Senior Dasturchi",
        certificates: "Sertifikatlar",
        certificatesVal: "AWS, React, Node.js",
        projectsStat: "Loyihalar",
        experienceStat: "Yillik tajriba",
        clientsStat: "Mijozlar",
        skillsTitle: "Ko'nikmalar",
        projectsTitle: "Loyihalar",
        project1Title: "Zamonaviy Web Sayt",
        project1Desc: "Responsive va zamonaviy dizayn",
        project2Title: "E-Commerce Platform",
        project2Desc: "Online do'kon tizimi",
        project3Title: "Telegram Bot",
        project3Desc: "Avtomatlashtirilgan bot",
        project4Title: "Mobil Ilova",
        project4Desc: "Android va iOS ilovalar",
        projectDemo: "Ko'rish →",
        servicesTitle: "Xizmatlar",
        service1Title: "Web Sayt",
        service1Desc: "Zamonaviy web sayt yaratish",
        service2Title: "E-Commerce",
        service2Desc: "Online do'kon tizimi",
        service3Title: "Mobil Ilova",
        service3Desc: "Android va iOS ilovalar",
        service4Title: "AI & Bot",
        service4Desc: "Telegram bot va AI yordamchi",
        orderBtn: "Buyurtma",
        testimonialsTitle: "Mijozlar fikri",
        testimonial1: '"Ajoyib dasturchi! Loyihamni o\'z vaqtida va sifatli yakunladi."',
        testimonial2: '"Oxunjon bilan ishlash juda qulay. Kreativ g\'oyalari va texnik bilimlari ajoyib."',
        testimonial3: '"Professional va mas\'uliyatli yondashuv. Har bir bosqichda aloqada bo\'lib bordi."',
        contactTitle: "Aloqa",
        contactDesc: "Loyihangiz bormi? Men bilan bog'lanishingiz mumkin.",
        sendBtn: "Yuborish",
        footerDesc: "Zamonaviy web saytlar va dasturlar yarataman.",
        footerRights: "Barcha huquqlar himoyalangan.",
    },
    ru: {
        navHome: "Главная",
        navAbout: "Обо мне",
        navSkills: "Навыки",
        navProjects: "Проекты",
        navServices: "Услуги",
        navContact: "Контакты",
        badge: "Открыт к работе",
        hello: "Привет, я",
        role: "Full-Stack Разработчик",
        exp: "2+ года опыта | 50+ проектов",
        projectsBtn: "Проекты",
        contactBtn: "Связаться",
        aboutTitle: "Обо мне",
        aboutBio: "Full-Stack разработчик, создаю современные веб-приложения и мобильные приложения. К каждому проекту подхожу творчески и гарантирую качественные результаты.",
        location: "Адрес",
        locationVal: "Самарканд, Узбекистан",
        education: "Образование",
        educationVal: "СамГУ, Искусственный Интеллект",
        current: "Сейчас",
        currentVal: "Старший Разработчик",
        certificates: "Сертификаты",
        certificatesVal: "AWS, React, Node.js",
        projectsStat: "Проекты",
        experienceStat: "Лет опыта",
        clientsStat: "Клиенты",
        skillsTitle: "Навыки",
        projectsTitle: "Проекты",
        project1Title: "Современный Веб-Сайт",
        project1Desc: "Адаптивный и современный дизайн",
        project2Title: "E-Commerce Платформа",
        project2Desc: "Система интернет-магазина",
        project3Title: "Telegram Бот",
        project3Desc: "Автоматизированный бот",
        project4Title: "Мобильное Приложение",
        project4Desc: "Android и iOS приложения",
        projectDemo: "Смотреть →",
        servicesTitle: "Услуги",
        service1Title: "Веб-Сайт",
        service1Desc: "Создание современного веб-сайта",
        service2Title: "E-Commerce",
        service2Desc: "Система интернет-магазина",
        service3Title: "Мобильное Приложение",
        service3Desc: "Android и iOS приложения",
        service4Title: "AI & Бот",
        service4Desc: "Telegram бот и AI помощник",
        orderBtn: "Заказать",
        testimonialsTitle: "Отзывы клиентов",
        testimonial1: '"Отличный разработчик! Выполнил проект вовремя и качественно."',
        testimonial2: '"С Охунжоном работать очень удобно. Его креативные идеи и технические знания отличные."',
        testimonial3: '"Профессиональный и ответственный подход. На каждом этапе был на связи."',
        contactTitle: "Контакты",
        contactDesc: "Есть проект? Свяжитесь со мной.",
        sendBtn: "Отправить",
        footerDesc: "Создаю современные веб-сайты и приложения.",
        footerRights: "Все права защищены.",
    },
    en: {
        navHome: "Home",
        navAbout: "About",
        navSkills: "Skills",
        navProjects: "Projects",
        navServices: "Services",
        navContact: "Contact",
        badge: "Open to Work",
        hello: "Hello, I'm",
        role: "Full-Stack Developer",
        exp: "2+ years experience | 50+ projects",
        projectsBtn: "Projects",
        contactBtn: "Contact",
        aboutTitle: "About Me",
        aboutBio: "Full-Stack developer, creating modern web applications and mobile apps. I approach every project creatively and deliver quality results.",
        location: "Location",
        locationVal: "Samarkand, Uzbekistan",
        education: "Education",
        educationVal: "SamSU, Artificial Intelligence",
        current: "Currently",
        currentVal: "Senior Developer",
        certificates: "Certificates",
        certificatesVal: "AWS, React, Node.js",
        projectsStat: "Projects",
        experienceStat: "Years Experience",
        clientsStat: "Clients",
        skillsTitle: "Skills",
        projectsTitle: "Projects",
        project1Title: "Modern Web Site",
        project1Desc: "Responsive and modern design",
        project2Title: "E-Commerce Platform",
        project2Desc: "Online store system",
        project3Title: "Telegram Bot",
        project3Desc: "Automated bot",
        project4Title: "Mobile App",
        project4Desc: "Android & iOS apps",
        projectDemo: "View →",
        servicesTitle: "Services",
        service1Title: "Web Site",
        service1Desc: "Creating modern websites",
        service2Title: "E-Commerce",
        service2Desc: "Online store system",
        service3Title: "Mobile App",
        service3Desc: "Android & iOS apps",
        service4Title: "AI & Bot",
        service4Desc: "Telegram bot & AI assistant",
        orderBtn: "Order",
        testimonialsTitle: "Testimonials",
        testimonial1: '"Great developer! Completed the project on time and with quality."',
        testimonial2: '"Working with Oxunjon is very convenient. His creative ideas and technical skills are excellent."',
        testimonial3: '"Professional and responsible approach. He kept us informed at every stage."',
        contactTitle: "Contact",
        contactDesc: "Have a project? Get in touch with me.",
        sendBtn: "Send",
        footerDesc: "Creating modern websites and applications.",
        footerRights: "All rights reserved.",
    },
};

function setLanguage(lang) {
    const data = langData[lang];
    if (!data) return;

    document.querySelectorAll("[data-key]").forEach((el) => {
        const key = el.getAttribute("data-key");
        if (data[key] !== undefined) {
            el.textContent = data[key];
        }
    });

    localStorage.setItem("lang", lang);
}

const savedLang = localStorage.getItem("lang") || "uz";
setLanguage(savedLang);

document.querySelectorAll(".lang-option").forEach((opt) => {
    if (opt.getAttribute("data-lang") === savedLang) {
        opt.classList.add("active");
    }
});

// =========================================
// SMOOTH SCROLL
// =========================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

// =========================================
// PARALLAX EFFECT
// =========================================
document.addEventListener("mousemove", (e) => {
    const orbs = document.querySelectorAll(".orb");
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    orbs.forEach((orb, i) => {
        const speed = 0.3 + i * 0.2;
        orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

// =========================================
// GLITCH EFFECT
// =========================================
document.querySelectorAll(".glitch").forEach((el) => {
    el.addEventListener("mouseenter", () => {
        el.style.animation = "glitch 0.3s ease-in-out";
        setTimeout(() => {
            el.style.animation = "";
        }, 300);
    });
});

// =========================================
// SCROLL INDICATOR
// =========================================
const scrollIndicator = document.querySelector(".scroll-indicator");
window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        scrollIndicator.style.opacity = "0";
        scrollIndicator.style.transition = "opacity 0.5s";
    } else {
        scrollIndicator.style.opacity = "0.6";
    }
});

// =========================================
// SKILL BARS ANIMATION
// =========================================
const skillObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const fills = entry.target.querySelectorAll(".skill-fill");
                fills.forEach((fill) => {
                    const width = fill.style.width;
                    fill.style.width = "0%";
                    setTimeout(() => {
                        fill.style.width = width;
                    }, 100);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.3 }
);

document.querySelectorAll(".skills-grid").forEach((grid) => {
    skillObserver.observe(grid);
});

// =========================================
// PROJECT CARD 3D TILT
// =========================================
document.querySelectorAll(".project").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    });
});

// =========================================
// SERVICE CARD 3D TILT
// =========================================
document.querySelectorAll(".service").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    });
});

// =========================================
// BARCHA LOYIHALARNI KO'RSATISH
// =========================================
const showAllBtn = document.getElementById("showAllProjects");
const allProjectsWrapper = document.getElementById("allProjectsWrapper");
const closeAllBtn = document.getElementById("closeAllProjects");
const projectsCount = document.getElementById("projectsCount");
let isAllVisible = false;

showAllBtn.addEventListener("click", function() {
    isAllVisible = !isAllVisible;
    
    if (isAllVisible) {
        allProjectsWrapper.style.display = "block";
        // AOS bilan yangi loyihalarni animatsiya qilish
        setTimeout(() => {
            allProjectsWrapper.querySelectorAll(".project").forEach((el, i) => {
                el.setAttribute("data-aos", "flip-up");
                el.setAttribute("data-aos-delay", i * 50);
                AOS.refresh();
            });
        }, 100);
        
        // Loyihalar sonini yangilash
        const countEl = projectsCount.querySelector(".count-current");
        if (countEl) countEl.textContent = "8";
        
        // Tugma matnini o'zgartirish
        showAllBtn.querySelector(".btn-text span").textContent = "Loyihalarni yopish";
        showAllBtn.querySelector(".btn-icon i").className = "fas fa-arrow-up";
        
        // Sahifani pastga scroll qilish
        setTimeout(() => {
            allProjectsWrapper.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
    } else {
        allProjectsWrapper.style.display = "none";
        const countEl = projectsCount.querySelector(".count-current");
        if (countEl) countEl.textContent = "4";
        showAllBtn.querySelector(".btn-text span").textContent = "Barcha loyihalar";
        showAllBtn.querySelector(".btn-icon i").className = "fas fa-arrow-right";
    }
});

closeAllBtn.addEventListener("click", () => {
    isAllVisible = false;
    allProjectsWrapper.style.display = "none";
    const countEl = projectsCount.querySelector(".count-current");
    if (countEl) countEl.textContent = "4";
    showAllBtn.querySelector(".btn-text span").textContent = "Barcha loyihalar";
    showAllBtn.querySelector(".btn-icon i").className = "fas fa-arrow-right";
});

// =========================================
// SMOOTH NAVBAR BACKGROUND
// =========================================
window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
        navbar.style.background = "rgba(10, 10, 10, 0.95)";
        navbar.style.backdropFilter = "blur(25px)";
    } else {
        navbar.style.background = "rgba(10, 10, 10, 0.85)";
        navbar.style.backdropFilter = "blur(20px)";
    }
});