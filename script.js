// ========================================
// 自定义光标
// ========================================
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

if (cursor && cursorFollower && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const hoverElements = document.querySelectorAll('a, button, .hobby-card, .skill-card, .tag');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
}

// 导航滚动效果
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// 移动端菜单
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// 数字动画
function animateNumber(element, target, duration = 2000) {
    const increment = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumber(entry.target, parseInt(entry.target.dataset.count));
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
statNumbers.forEach(stat => statsObserver.observe(stat));

// 项目卡片 + 时间线滚动显示
const scrollRevealItems = document.querySelectorAll('.project-card, .timeline-item');
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            cardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
scrollRevealItems.forEach(item => cardObserver.observe(item));

// 爱好卡片倾斜效果
const hobbyCards = document.querySelectorAll('.hobby-card');
hobbyCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = (y - rect.height / 2) / 10;
        const rotateY = (rect.width / 2 - x) / 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }
    });
});

// 表单处理
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>发送中...</span>';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = '<span>已发送!</span>';
            btn.style.background = 'linear-gradient(135deg, #28c840 0%, #20a838 100%)';
            contactForm.reset();
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 2000);
        }, 1500);
    });
}

// 滚动指示器隐藏
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        scrollIndicator.style.opacity = window.pageYOffset > 100 ? '0' : '1';
    });
}
