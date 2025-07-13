document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica para ocultar o header ao rolar ---
    const header = document.getElementById('header');
    const sosNav = document.querySelector('.sos-nav-floating');

    if (header && sosNav) {
        const scrollThreshold = 200; // Distância em pixels para ativar o efeito

        window.addEventListener('scroll', () => {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('header-hidden');
                sosNav.classList.add('nav-sticky-top');
            } else {
                header.classList.remove('header-hidden');
                sosNav.classList.remove('nav-sticky-top');
            }
        });
    }
    
    // --- Inicialização do AOS (Animações ao Rolar) ---
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
    });

    // --- Lógica do Acordeão (Sanfona) ---
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.accordion-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
                const content = currentlyActive.querySelector('.accordion-content');
                content.style.maxHeight = null;
            }
            item.classList.toggle('active');
            const content = item.querySelector('.accordion-content');
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // --- Lógica para ativar link do menu flutuante conforme a seção visível ---
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length > 0 && navLinks.length > 0 && sosNav) {
        const navHeight = sosNav.offsetHeight;
        const observerOptions = {
            root: null,
            rootMargin: `-${navHeight + 50}px 0px -50% 0px`,
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const navLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                    navLinks.forEach(link => link.classList.remove('active'));
                    if (navLink) {
                        navLink.classList.add('active');
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
});

// --- Função para o botão "Localizar Delegacia" ---
function localizarDelegacia() {
    window.open('https://maps.google.com/?q=Delegacia+da+Mulher', '_blank');
}