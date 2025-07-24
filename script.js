document.addEventListener('DOMContentLoaded', function () { 
 	AOS.init({ 
 		duration: 800, 
 		once: true, 
 		offset: 50, 
 	}); 

 	function initHeroSlideshow() { 
 		const slides = document.querySelectorAll('.hero-slide'); 
 		if (slides.length <= 1) return; 
 		let currentSlide = 0; 
 		setInterval(() => { 
 			slides[currentSlide].classList.remove('active'); 
 			currentSlide = (currentSlide + 1) % slides.length; 
 			slides[currentSlide].classList.add('active'); 
 		}, 6000); 
 	} 
 	initHeroSlideshow(); 

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

 	const odsCircleContainer = document.getElementById('ods-circle-container'); 
 	if (odsCircleContainer) { 
 		const odsPaths = odsCircleContainer.querySelectorAll('svg path'); 
 		const unLogoLink = document.getElementById('un-logo-link'); 
 		const modalOverlay = document.getElementById('ods-modal-overlay'); 
 		const modalClose = document.getElementById('ods-modal-close'); 

 		const openModal = () => { 
 			if (modalOverlay) modalOverlay.classList.add('visible'); 
 		}; 

 		const closeModal = () => { 
 			if (modalOverlay) modalOverlay.classList.remove('visible'); 
 		}; 

 		odsPaths.forEach(path => { 
 			const odsNumber = path.dataset.ods; 
 			const popover = document.getElementById(`ods-popover-${odsNumber}`); 

 			path.addEventListener('click', openModal); 

 			path.addEventListener('mouseover', () => { 
 				if(popover) popover.classList.add('visible'); 
 			}); 

 			path.addEventListener('mouseout', () => { 
 				if(popover) popover.classList.remove('visible'); 
 			}); 
 		}); 

 		if (unLogoLink) { 
 			unLogoLink.addEventListener('click', (event) => { 
 				event.stopPropagation(); 
 			}); 
 		} 

 		if (modalClose) { 
 			modalClose.addEventListener('click', closeModal); 
 		} 
 		if (modalOverlay) { 
 			modalOverlay.addEventListener('click', (event) => { 
 				if (event.target === modalOverlay) { 
 					closeModal(); 
 				} 
 			}); 
 		} 
 	} 

 	// --- SCRIPT DO VIOLENTÔMETRO ATUALIZADO --- 
 	const violentometroContainer = document.querySelector('.violentometro-termometro-wrapper'); 
 	if (violentometroContainer) { 
 		const dadosViolentometro = [ 
 			{ 
 				classe: "cuidado", 
 				itens: [ 
 					"Piadas ofensivas", 
 					"Chantagens", 
 					"Mentiras", 
 					"Humilhações em público", 
 					"Ciúmes excessivo" 
 				] 
 			}, 
 			{ 
 				classe: "reaja", 
 				itens: [ 
 					"Intimidar", 
 					"Ameaçar", 
 					"Controlar ou proibir", 
 					"Destruir bens pessoais", 
 					"Machucar", 
 					"Prender ou confinar" 
 				] 
 			}, 
 			{ 
 				classe: "peca-ajuda", 
 				itens: [ 
 					"Ameaça com objetos ou armas", 
 					"Forçar relação sexual", 
 					"Ameaça de morte", 
 					"Violentar ou mutilar", 
 					"MATAR" 
 				] 
 			} 
 		]; 

 		dadosViolentometro.forEach(categoria => { 
 			const targetList = document.querySelector(`.termometro-nivel.nivel-${categoria.classe} .termometro-lista`); 
 			 
 			if (targetList) { 
 				targetList.innerHTML = ''; // Limpa a lista antes de adicionar novos itens 
 				categoria.itens.forEach(itemText => { 
 					const itemLi = document.createElement('li'); 
 					itemLi.textContent = itemText; 
 					 
 					if (itemText.toUpperCase() === 'MATAR') { 
 						itemLi.classList.add('extremo'); 
 					} 
 					targetList.appendChild(itemLi); 
 				}); 
 			} 
 		}); 

 		lucide.createIcons(); 
 	} 
});