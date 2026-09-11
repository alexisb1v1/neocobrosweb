document.addEventListener('DOMContentLoaded', () => {
    
    // Inicializar Iconos Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    /* ==========================================================================
       1. Menú Móvil & Navegación
       ========================================================================== */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menú móvil
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        // Alternar icono entre menu y x
        const icon = hamburger.querySelector('i');
        if (navMenu.classList.contains('open')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });

    // Cerrar menú móvil al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                hamburger.querySelector('i').setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    });

    // Efecto scrolled en el header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    /* ==========================================================================
       2. Carrusel de Capturas Reales (Showcase)
       ========================================================================== */
    const slides = document.querySelectorAll('.showcase-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    let currentSlide = 0;
    let autoPlayTimer = null;

    function showSlide(index) {
        // Asegurar límites
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;
        
        currentSlide = index;

        // Desactivar slides y dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Activar slide y dot actual
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Event Listeners
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const targetIndex = parseInt(e.target.getAttribute('data-target'));
            showSlide(targetIndex);
            resetAutoPlay();
        });
    });

    // Auto Play Funcionalidad
    function startAutoPlay() {
        autoPlayTimer = setInterval(nextSlide, 8000); // Cambiar cada 8 segundos
    }

    function resetAutoPlay() {
        clearInterval(autoPlayTimer);
        startAutoPlay();
    }

    // Iniciar autoplay al cargar
    if (slides.length > 0) {
        startAutoPlay();
    }





    /* ==========================================================================
       4. Acordeón de FAQ
       ========================================================================== */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Cerrar todos los acordeones abiertos
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Si el seleccionado no estaba activo, lo abrimos
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });


    /* ==========================================================================
       6. Pestañas Interactivas de Características (Tabs Showcase)
       ========================================================================== */
    const tabButtons = document.querySelectorAll('.feature-tab-btn');
    const tabContents = document.querySelectorAll('.feature-display-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetIndex = button.getAttribute('data-feature');

            // Desactivar botones y contenidos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Activar botón y contenido actual
            button.classList.add('active');
            const targetContent = document.getElementById(`feat-${targetIndex}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });


    /* ==========================================================================
       5. Animación de Entrada al Desplazarse (Scroll Reveal)
       ========================================================================== */
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Dejar de observar una vez revelado
            }
        });
    }, observerOptions);

    // Seleccionamos elementos para animar
    const animatedElements = document.querySelectorAll('.features-interactive-wrapper, .faq-item, .cta-inner');
    
    // Aplicar estilos iniciales y registrar observador
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        scrollRevealObserver.observe(el);
    });

    // CSS inyectado por JS para la animación de revelado
    const style = document.createElement('style');
    style.innerHTML = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

});
