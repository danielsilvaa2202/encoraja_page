document.addEventListener('DOMContentLoaded', function () {
    
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
    });

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.getElementById('header');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 200; 
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = Math.ceil(target / speed);
                if (count < target) {
                    counter.innerText = Math.min(count + inc, target);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    const impactSection = document.getElementById('impacto');
    if (impactSection) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });
        counterObserver.observe(impactSection);
    }

    const timelineWrapper = document.querySelector('.timeline-wrapper');
    if (timelineWrapper) {
        const prevBtn = document.querySelector('.timeline-nav.prev');
        const nextBtn = document.querySelector('.timeline-nav.next');
        let autoScrollInterval;
        let autoScrollTimeout;

        const firstItem = timelineWrapper.querySelector('.timeline-item');
        const scrollAmount = firstItem ? firstItem.offsetWidth + 40 : 360;

        const startAutoScroll = () => {
            stopAutoScroll();
            autoScrollInterval = setInterval(() => {
                const isAtEnd = timelineWrapper.scrollLeft + timelineWrapper.clientWidth >= timelineWrapper.scrollWidth - 5;
                
                if (isAtEnd) {
                    timelineWrapper.scrollTo({ left: 0, behavior: 'instant' });
                } else {
                    timelineWrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }, 5000);
        };

        const stopAutoScroll = () => {
            clearInterval(autoScrollInterval);
        };

        const resetAutoScroll = () => {
            stopAutoScroll();
            clearTimeout(autoScrollTimeout);
            autoScrollTimeout = setTimeout(startAutoScroll, 10000); 
        };

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                const isAtEnd = timelineWrapper.scrollLeft + timelineWrapper.clientWidth >= timelineWrapper.scrollWidth - 5;
                if (isAtEnd) {
                    timelineWrapper.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    timelineWrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
                resetAutoScroll();
            });

            prevBtn.addEventListener('click', () => {
                timelineWrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                resetAutoScroll();
            });
        }
        
        timelineWrapper.addEventListener('mouseenter', stopAutoScroll);
        timelineWrapper.addEventListener('mouseleave', resetAutoScroll);
        timelineWrapper.addEventListener('wheel', () => resetAutoScroll(), { passive: true });
        timelineWrapper.addEventListener('touchstart', () => resetAutoScroll(), { passive: true });

        startAutoScroll();
    }

    // --- LÓGICA DO CÍRCULO E MODAL ODS ---
    const odsCircle = document.getElementById('ods-interactive-circle');
    if (odsCircle) {
        const odsPaths = odsCircle.querySelectorAll('path');
        const modalOverlay = document.getElementById('ods-modal-overlay');
        const modalClose = document.getElementById('ods-modal-close');

        // Lógica para os popovers no hover
        odsPaths.forEach(path => {
            const odsNumber = path.dataset.ods;
            const popover = document.getElementById(`ods-popover-${odsNumber}`);
            
            path.addEventListener('mouseover', () => {
                if(popover) popover.classList.add('visible');
            });

            path.addEventListener('mouseout', () => {
                if(popover) popover.classList.remove('visible');
            });
        });

        // Lógica para abrir o modal
        odsCircle.addEventListener('click', () => {
            modalOverlay.classList.add('visible');
        });

        // Lógica para fechar o modal
        const closeModal = () => {
            modalOverlay.classList.remove('visible');
        }
        
        modalClose.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) {
                closeModal();
            }
        });
    }
});