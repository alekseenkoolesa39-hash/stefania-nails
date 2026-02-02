/**
 * Скрипт для сайта маникюра Стефании
 * Анимации, интерактивность, обработка формы
 * Оптимизировано для мобильных устройств
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт маникюра Стефании загружен! Мобильная оптимизация активна.');

    // Определяем мобильное устройство
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Инициализация GSAP анимаций (с оптимизацией для мобильных)
    initAnimations(isMobile);

    // Инициализация улучшенных эффектов при скролле
    initScrollEffects(isMobile);

    // Инициализация формы
    initForm();

    // Инициализация анимации краски (с оптимизацией)
    initPaintAnimation(isMobile);

    // Инициализация интерактивных эффектов (упрощенных для мобильных)
    initInteractiveEffects(isMobile);

    // Инициализация мобильных фич
    initMobileFeatures();
});

/**
 * Инициализация мобильных функций
 */
function initMobileFeatures() {
    // Плавный скролл к якорям с offset для мобильных
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Учитываем высоту фиксированных элементов на мобильных
                const offset = window.innerWidth < 768 ? 80 : 100;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Добавляем визуальную обратную связь для мобильных
                if (window.innerWidth < 768) {
                    targetElement.classList.add('highlight-section');
                    setTimeout(() => {
                        targetElement.classList.remove('highlight-section');
                    }, 1000);
                }
            }
        });
    });

    // Прогресс-бар скролла
    initScrollProgress();

    // Ленивая загрузка изображений
    initLazyLoading();
}

/**
 * Прогресс-бар скролла
 */
function initScrollProgress() {
    const progressBar = document.querySelector('.progress-bar');
    if (!progressBar) return;

    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

/**
 * Ленивая загрузка изображений
 */
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                    }
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

/**
 * Инициализация GSAP анимаций с оптимизацией для мобильных
 */
function initAnimations(isMobile) {
    // Проверяем, загружена ли GSAP
    if (typeof gsap === 'undefined') {
        console.warn('GSAP не загружен, анимации будут ограничены');
        return;
    }

    // Регистрируем плагины GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Упрощенные анимации для мобильных
    if (isMobile) {
        // Более быстрые и простые анимации для мобильных
        gsap.from('.main-title', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power2.out',
            delay: 0.3
        });

        gsap.from('.subtitle', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power2.out',
            delay: 0.6
        });

        gsap.from('.cta-buttons', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power2.out',
            delay: 0.9
        });

        // Упрощенные анимации секций
        gsap.utils.toArray('.section-about, .section-info, .section-booking').forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none none',
                    markers: false // Отключаем маркеры на продакшене
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            });
        });
    } else {
        // Полные анимации для десктопа
        gsap.from('.main-title', {
            duration: 1.5,
            y: 100,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.5
        });

        gsap.from('.subtitle', {
            duration: 1.5,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: 1
        });

        gsap.from('.cta-buttons', {
            duration: 1.5,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: 1.5
        });

        gsap.utils.toArray('.section-about, .section-info, .section-booking').forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                y: 60,
                opacity: 0,
                duration: 1.2,
                ease: 'power2.out'
            });
        });
    }

    // Анимация для карточек (упрощенная на мобильных)
    gsap.utils.toArray('.info-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none',
                once: true // Анимация срабатывает только один раз
            },
            y: isMobile ? 20 : 40,
            opacity: 0,
            duration: isMobile ? 0.5 : 0.8,
            delay: i * (isMobile ? 0.1 : 0.2),
            ease: isMobile ? 'power2.out' : 'back.out(1.2)'
        });
    });

    // Анимация для fade-in элементов
    gsap.utils.toArray('.fade-in-up').forEach((element, i) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 90%',
                toggleActions: 'play none none none',
                once: true
            },
            y: 20,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power2.out'
        });
    });
}

/**
 * Улучшенные эффекты при скролле с оптимизацией для мобильных
 */
function initScrollEffects(isMobile) {
    let ticking = false;

    // Оптимизация для производительности
    function updateScroll() {
        const scrolled = window.pageYOffset;

        // Эффект параллакса только для десктопа
        if (!isMobile) {
            const header = document.querySelector('.header-section');
            if (header) {
                header.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        }

        // Индикатор видимых секций для мобильных
        if (isMobile) {
            updateMobileSectionIndicator(scrolled);
        }

        ticking = false;
    }

    // Функция для обновления индикатора секций на мобильных
    function updateMobileSectionIndicator(scrollPos) {
        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });

        // Можно добавить логику для отображения текущей секции
        // Например, обновить индикатор в mobile-scroll-indicator
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
        }
    }, { passive: true });

    // Плавный скролл для iOS
    if (isMobile) {
        document.body.style.webkitOverflowScrolling = 'touch';
    }
}

/**
 * Анимация растекающейся краски с оптимизацией для мобильных
 */
function initPaintAnimation(isMobile) {
    const paintContainer = document.getElementById('paint-animation');
    if (!paintContainer) return;

    // На мобильных можно отключить анимацию краски для производительности
    if (isMobile && window.innerWidth < 768) {
        // Вместо Canvas показываем статичный градиент
        paintContainer.innerHTML = `
            <div class="absolute inset-0 bg-gradient-to-b from-pink-900/10 via-purple-900/10 to-black"></div>
        `;
        return;
    }

    // Создаем холст для анимации краски
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    paintContainer.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    // Настройки для краски (уменьшаем количество для мобильных)
    const colors = [
        '#ec4899', // розовый
        '#8b5cf6', // фиолетовый
        '#f59e0b', // золотой
        '#10b981', // изумрудный
        '#3b82f6'  // синий
    ];

    const drops = [];
    const maxDrops = isMobile ? 15 : 30; // Меньше капель на мобильных

    // Создаем капли краски
    class PaintDrop {
        constructor() {
            this.reset();
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height * 0.5;
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -50;
            this.size = Math.random() * (isMobile ? 20 : 30) + 10;
            this.speed = Math.random() * (isMobile ? 2 : 3) + 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.wiggle = Math.random() * 2 - 1;
            this.alpha = 0.8 + Math.random() * 0.2;
            this.spread = 0;
            this.maxSpread = Math.random() * (isMobile ? 60 : 100) + 50;
            this.spreadSpeed = Math.random() * (isMobile ? 0.3 : 0.5) + 0.2;
        }

        update() {
            this.y += this.speed;
            this.x += this.wiggle;

            if (this.y > canvas.height * 0.7) {
                this.spread += this.spreadSpeed;

                if (this.spread > this.maxSpread) {
                    this.reset();
                }
            }

            if (this.y > canvas.height + 100) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();

            if (this.spread > 0) {
                // Рисуем растекшуюся краску
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.alpha * 0.7;

                // Упрощенная форма для мобильных
                const points = isMobile ? 12 : 16;
                for (let i = 0; i < Math.PI * 2; i += Math.PI / (points/2)) {
                    const radius = this.size + this.spread + Math.sin(i * 3) * 10;
                    const x = this.x + Math.cos(i) * radius;
                    const y = this.y + Math.sin(i) * radius;

                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }

                ctx.closePath();
                ctx.fill();
            } else {
                // Рисуем падающую каплю
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.alpha;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.globalAlpha = 1;
        }
    }

    // Инициализируем капли
    for (let i = 0; i < maxDrops; i++) {
        drops.push(new PaintDrop());
        drops[i].y = Math.random() * canvas.height;
    }

    // Функция анимации с оптимизацией
    let animationId;
    function animatePaint() {
        // Более агрессивное затухание на мобильных
        ctx.fillStyle = isMobile ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drops.forEach(drop => {
            drop.update();
            drop.draw();
        });

        animationId = requestAnimationFrame(animatePaint);
    }

    // Запускаем анимацию
    animatePaint();

    // Обработка изменения размера окна
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Пауза анимации когда вкладка неактивна
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animatePaint();
        }
    });
}

/**
 * Интерактивные эффекты с оптимизацией для мобильных
 */
function initInteractiveEffects(isMobile) {
    // Эффект "магнитной" кнопки только для десктопа
    if (!isMobile) {
        const wowButtons = document.querySelectorAll('.wow-btn');

        wowButtons.forEach(button => {
            button.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const moveX = (x - centerX) * 0.1;
                const moveY = (y - centerY) * 0.1;

                this.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });

            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translate(0, 0)';
            });
        });
    }

    // Эффект "пульсации" для кнопок при загрузке
    setTimeout(() => {
        const wowButtons = document.querySelectorAll('.wow-btn');
        wowButtons.forEach((button, index) => {
            setTimeout(() => {
                button.classList.add('pulse');
                setTimeout(() => {
                    button.classList.remove('pulse');
                }, 1000);
            }, index * 300);
        });
    }, 2000);

    // Добавляем класс для CSS-анимации пульса
    const style = document.createElement('style');
    style.textContent = `
        .pulse {
            animation: pulse 1s ease-in-out;
        }

        .highlight-section {
            animation: highlight 1s ease;
        }

        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.7); }
            70% { box-shadow: 0 0 0 20px rgba(236, 72, 153, 0); }
            100% { box-shadow: 0 0 0 0 rgba(236, 72, 153, 0); }
        }

        @keyframes highlight {
            0%, 100% { background: transparent; }
            50% { background: rgba(236, 72, 153, 0.05); }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Инициализация GSAP анимаций
 */
function initAnimations() {
    // Проверяем, загружена ли GSAP
    if (typeof gsap === 'undefined') {
        console.warn('GSAP не загружен, анимации будут ограничены');
        return;
    }

    // Регистрируем плагины GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Анимация появления заголовка
    gsap.from('.main-title', {
        duration: 1.5,
        y: 100,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.5
    });

    // Анимация появления подзаголовка
    gsap.from('.subtitle', {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 1
    });

    // Анимация появления кнопок
    gsap.from('.cta-buttons', {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 1.5
    });

    // Анимация для секций при скролле
    gsap.utils.toArray('.section-about, .section-info, .section-booking').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            y: 60,
            opacity: 0,
            duration: 1.2,
            ease: 'power2.out'
        });
    });

    // Анимация для карточек
    gsap.utils.toArray('.info-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.2,
            ease: 'back.out(1.2)'
        });
    });
}

/**
 * Эффекты при скролле
 */
function initScrollEffects() {
    // Эффект параллакса для шапки
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header-section');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        }

        // Эффект появления элементов при скролле
        const fadeElements = document.querySelectorAll('.fade-in-up');
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    });
}

/**
 * Анимация растекающейся краски
 */
function initPaintAnimation() {
    const paintContainer = document.getElementById('paint-animation');
    if (!paintContainer) return;

    // Создаем холст для анимации краски
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    paintContainer.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    // Настройки для краски
    const colors = [
        '#ec4899', // розовый
        '#8b5cf6', // фиолетовый
        '#f59e0b', // золотой
        '#10b981', // изумрудный
        '#3b82f6'  // синий
    ];

    const drops = [];
    const maxDrops = 30;

    // Создаем капли краски
    class PaintDrop {
        constructor() {
            this.reset();
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height * 0.5;
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -50;
            this.size = Math.random() * 30 + 10;
            this.speed = Math.random() * 3 + 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.wiggle = Math.random() * 2 - 1;
            this.alpha = 0.8 + Math.random() * 0.2;
            this.spread = 0;
            this.maxSpread = Math.random() * 100 + 50;
            this.spreadSpeed = Math.random() * 0.5 + 0.2;
        }

        update() {
            // Двигаем каплю вниз
            this.y += this.speed;
            this.x += this.wiggle;

            // Когда капля достигает нижней части, она растекается
            if (this.y > canvas.height * 0.7) {
                this.spread += this.spreadSpeed;

                // Если полностью растекалась, сбрасываем
                if (this.spread > this.maxSpread) {
                    this.reset();
                }
            }

            // Если капля упала за пределы экрана, сбрасываем
            if (this.y > canvas.height + 100) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();

            if (this.spread > 0) {
                // Рисуем растекшуюся краску
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.alpha * 0.7;

                // Создаем органическую форму
                for (let i = 0; i < Math.PI * 2; i += Math.PI / 8) {
                    const radius = this.size + this.spread + Math.sin(i * 3) * 10;
                    const x = this.x + Math.cos(i) * radius;
                    const y = this.y + Math.sin(i) * radius;

                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }

                ctx.closePath();
                ctx.fill();

                // Добавляем детали
                ctx.globalAlpha = this.alpha * 0.3;
                for (let j = 0; j < 5; j++) {
                    const detailRadius = this.spread * 0.3 + j * 5;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, detailRadius, 0, Math.PI * 2);
                    ctx.fill();
                }
            } else {
                // Рисуем падающую каплю
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.alpha;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();

                // Добавляем "хвост" капле
                ctx.beginPath();
                ctx.moveTo(this.x, this.y - this.size);
                ctx.quadraticCurveTo(
                    this.x + this.wiggle * 10,
                    this.y - this.size * 2,
                    this.x,
                    this.y - this.size * 3
                );
                ctx.lineWidth = this.size * 0.5;
                ctx.strokeStyle = this.color;
                ctx.globalAlpha = this.alpha * 0.5;
                ctx.stroke();
            }

            ctx.globalAlpha = 1;
        }
    }

    // Инициализируем капли
    for (let i = 0; i < maxDrops; i++) {
        drops.push(new PaintDrop());
        // Разносим капли по времени
        drops[i].y = Math.random() * canvas.height;
    }

    // Функция анимации
    function animatePaint() {
        // Очищаем холст с эффектом затухания
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Обновляем и рисуем каждую каплю
        drops.forEach(drop => {
            drop.update();
            drop.draw();
        });

        requestAnimationFrame(animatePaint);
    }

    // Запускаем анимацию
    animatePaint();

    // Обработка изменения размера окна
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

/**
 * Инициализация формы
 */
function initForm() {
    const form = document.getElementById('bookingForm');
    const successMessage = document.getElementById('successMessage');

    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Получаем данные формы
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            date: document.getElementById('date').value,
            comment: document.getElementById('comment').value
        };

        // Валидация
        if (!formData.name || !formData.phone || !formData.date) {
            showNotification('Пожалуйста, заполните все обязательные поля', 'error');
            return;
        }

        // В реальном проекте здесь был бы AJAX-запрос к серверу
        // Для демо просто показываем успешное сообщение

        // Анимация отправки
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Отправка...';
        submitBtn.disabled = true;

        // Имитация отправки на сервер
        setTimeout(() => {
            // Показываем сообщение об успехе
            successMessage.classList.remove('hidden');

            // Анимация появления сообщения
            gsap.from(successMessage, {
                duration: 0.8,
                y: 30,
                opacity: 0,
                ease: 'back.out(1.2)'
            });

            // Прокрутка к сообщению
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Сбрасываем форму
            form.reset();

            // Восстанавливаем кнопку
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            // Прячем сообщение через 10 секунд
            setTimeout(() => {
                gsap.to(successMessage, {
                    duration: 0.5,
                    opacity: 0,
                    y: -20,
                    onComplete: () => {
                        successMessage.classList.add('hidden');
                        successMessage.style.opacity = '1';
                        successMessage.style.transform = 'translateY(0)';
                    }
                });
            }, 10000);

            // В реальном проекте здесь был бы вызов функции отправки
            // sendFormData(formData);
        }, 1500);
    });

    // Добавляем эффекты при фокусе на полях ввода
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');

            // Анимация увеличения метки
            const label = this.previousElementSibling;
            if (label && label.tagName === 'LABEL') {
                gsap.to(label, {
                    duration: 0.3,
                    scale: 1.05,
                    color: '#ec4899'
                });
            }
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');

            // Возвращаем метку в исходное состояние
            const label = this.previousElementSibling;
            if (label && label.tagName === 'LABEL') {
                gsap.to(label, {
                    duration: 0.3,
                    scale: 1,
                    color: '#f0f0f0'
                });
            }
        });
    });
}

/**
 * Интерактивные эффекты
 */
function initInteractiveEffects() {
    // Эффект "магнитной" кнопки (слегка тянется к курсору)
    const wowButtons = document.querySelectorAll('.wow-btn');

    wowButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const moveX = (x - centerX) * 0.1;
            const moveY = (y - centerY) * 0.1;

            this.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });

    // Эффект "пульсации" для кнопок при загрузке
    setTimeout(() => {
        wowButtons.forEach((button, index) => {
            setTimeout(() => {
                button.classList.add('pulse');
                setTimeout(() => {
                    button.classList.remove('pulse');
                }, 1000);
            }, index * 300);
        });
    }, 2000);

    // Добавляем класс для CSS-анимации пульса
    const style = document.createElement('style');
    style.textContent = `
        .pulse {
            animation: pulse 1s ease-in-out;
        }

        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.7); }
            70% { box-shadow: 0 0 0 20px rgba(236, 72, 153, 0); }
            100% { box-shadow: 0 0 0 0 rgba(236, 72, 153, 0); }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Показать уведомление
 */
function showNotification(message, type = 'info') {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `fixed top-6 right-6 p-4 rounded-xl z-50 transform translate-x-full transition-transform duration-300 ${type === 'error' ? 'bg-red-900/90 border border-red-700' : 'bg-gray-900/90 border border-gray-700'}`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${type === 'error' ? 'fa-exclamation-triangle' : 'fa-info-circle'} mr-3 text-xl"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Показываем уведомление
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);

    // Убираем уведомление через 5 секунд
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

/**
 * Функция для отправки данных формы (заглушка для демо)
 */
function sendFormData(formData) {
    console.log('Отправка данных формы:', formData);

    // В реальном проекте здесь был бы fetch-запрос
    /*
    fetch('/api/booking', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Успех:', data);
        showNotification('Заявка успешно отправлена!', 'success');
    })
    .catch(error => {
        console.error('Ошибка:', error);
        showNotification('Произошла ошибка при отправке', 'error');
    });
    */
}

