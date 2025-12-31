/**
 * Eletherios - Epistemic Defense Infrastructure
 * See. Verify. Liberate.
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Active nav highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // Neural line pulse effect
    const neuralLines = document.querySelectorAll('.neural-line');
    
    function pulseNeuralLines() {
        neuralLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '0.8';
                setTimeout(() => {
                    line.style.opacity = '0.2';
                }, 500);
            }, index * 200);
        });
    }

    setInterval(pulseNeuralLines, 3000);

    // Dynamic floating graph nodes with variation
    const graphNodesContainer = document.querySelector('.graph-nodes');
    
    // Node configurations: shape, color, tailAngle
    const nodeConfigs = [
        { shape: 'circle', color: 'teal', tailAngle: -15 },
        { shape: 'circle', color: 'teal', tailAngle: 20 },
        { shape: 'circle', color: 'teal', tailAngle: -30 },
        { shape: 'circle', color: 'teal', tailAngle: 35 },
        { shape: 'square', color: 'gold', tailAngle: -20 },
        { shape: 'square', color: 'gold', tailAngle: 25 },
        { shape: 'square', color: 'teal', tailAngle: -40 },
        { shape: 'diamond', color: 'green', tailAngle: 0 },
        { shape: 'diamond', color: 'gold', tailAngle: 15 },
        { shape: 'diamond', color: 'green', tailAngle: -25 }
    ];

    const colorStyles = {
        teal: {
            bg: 'radial-gradient(circle at 30% 30%, rgba(0, 212, 255, 0.4), rgba(0, 212, 255, 0.1))',
            border: 'rgba(0, 212, 255, 0.3)',
            shadow: 'rgba(0, 212, 255, 0.2)',
            tail: 'rgba(0, 212, 255, 0.4)'
        },
        gold: {
            bg: 'radial-gradient(circle at 30% 30%, rgba(212, 160, 18, 0.4), rgba(212, 160, 18, 0.1))',
            border: 'rgba(212, 160, 18, 0.3)',
            shadow: 'rgba(212, 160, 18, 0.2)',
            tail: 'rgba(212, 160, 18, 0.4)'
        },
        green: {
            bg: 'radial-gradient(circle at 30% 30%, rgba(16, 185, 129, 0.4), rgba(16, 185, 129, 0.1))',
            border: 'rgba(16, 185, 129, 0.3)',
            shadow: 'rgba(16, 185, 129, 0.2)',
            tail: 'rgba(16, 185, 129, 0.4)'
        }
    };

    function createFloatingNode() {
        const config = nodeConfigs[Math.floor(Math.random() * nodeConfigs.length)];
        const colors = colorStyles[config.color];
        const size = 10 + Math.random() * 14; // 10-24px
        
        const node = document.createElement('div');
        node.style.position = 'absolute';
        node.style.width = size + 'px';
        node.style.height = size + 'px';
        node.style.left = Math.random() * 100 + '%';
        node.style.bottom = '-30px';
        node.style.background = colors.bg;
        node.style.border = '1px solid ' + colors.border;
        node.style.boxShadow = '0 0 20px ' + colors.shadow;
        
        // Shape styling
        if (config.shape === 'circle') {
            node.style.borderRadius = '50%';
        } else if (config.shape === 'square') {
            node.style.borderRadius = '2px';
        } else if (config.shape === 'diamond') {
            node.style.borderRadius = '2px';
            node.style.transform = 'rotate(45deg)';
        }

        // Create tail/connection line
        const tail = document.createElement('div');
        tail.style.position = 'absolute';
        tail.style.top = '50%';
        tail.style.left = '100%';
        tail.style.width = (50 + Math.random() * 50) + 'px';
        tail.style.height = '1px';
        tail.style.background = 'linear-gradient(90deg, ' + colors.tail + ', transparent)';
        tail.style.transformOrigin = 'left center';
        
        // Apply tail angle - for diamonds, offset by 45deg
        const baseAngle = config.shape === 'diamond' ? config.tailAngle - 45 : config.tailAngle;
        tail.style.transform = 'translateY(-50%) rotate(' + baseAngle + 'deg)';
        
        node.appendChild(tail);
        graphNodesContainer.appendChild(node);

        // Animation
        const duration = 20000 + Math.random() * 15000;
        const startTime = Date.now();
        const horizontalDrift = (Math.random() - 0.5) * 100;

        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;

            if (progress < 1) {
                const y = -30 - (window.innerHeight + 60) * progress;
                const x = horizontalDrift * Math.sin(progress * Math.PI);
                
                if (config.shape === 'diamond') {
                    node.style.transform = `translateY(${y}px) translateX(${x}px) rotate(45deg)`;
                } else {
                    node.style.transform = `translateY(${y}px) translateX(${x}px)`;
                }
                
                // Fade in/out
                if (progress < 0.1) {
                    node.style.opacity = progress * 10;
                } else if (progress > 0.9) {
                    node.style.opacity = (1 - progress) * 10;
                } else {
                    node.style.opacity = 0.8;
                }
                
                requestAnimationFrame(animate);
            } else {
                node.remove();
            }
        }

        requestAnimationFrame(animate);
    }

    // Create initial nodes
    for (let i = 0; i < 8; i++) {
        setTimeout(() => createFloatingNode(), i * 500);
    }

    // Continuously create new nodes
    setInterval(createFloatingNode, 2500);

    // Intersection Observer for reveal animations
    const revealElements = document.querySelectorAll('.capability-card, .validation-card, .ai-feature, .timeline-content, .screenshot-card, .arch-component');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = entry.target.classList.contains('timeline-content') 
                    ? 'translateY(0)' 
                    : 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    // Validation score counter animation
    const validationScores = document.querySelectorAll('.validation-score');
    
    const scoreObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const scoreEl = entry.target;
                const targetScore = parseFloat(scoreEl.textContent);
                let currentScore = 0;
                const increment = targetScore / 40;
                
                const counter = setInterval(() => {
                    currentScore += increment;
                    if (currentScore >= targetScore) {
                        currentScore = targetScore;
                        clearInterval(counter);
                    }
                    scoreEl.textContent = currentScore.toFixed(2);
                }, 25);
                
                scoreObserver.unobserve(scoreEl);
            }
        });
    }, { threshold: 0.5 });

    validationScores.forEach(score => {
        scoreObserver.observe(score);
    });

    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    const submitBtn = document.querySelector('.submit-btn');
    
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            
            if (emailInput && emailInput.value) {
                // Animate button
                this.textContent = 'Subscribed!';
                this.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
                // Reset after delay
                setTimeout(() => {
                    this.textContent = 'Subscribe';
                    this.style.background = '';
                    emailInput.value = '';
                }, 3000);
            }
        });
    }

    // Console Easter egg
    console.log('%c⊕ ELETHERIOS', 'font-size: 24px; font-weight: bold; color: #00d4ff;');
    console.log('%cEpistemic Defense Infrastructure', 'font-size: 12px; color: #94a3b8;');
    console.log('%c"He who can handle the quickest rate of change survives." — John Boyd', 'font-size: 11px; color: #d4a012; font-style: italic;');
    console.log('%cSee. Verify. Liberate.', 'font-size: 11px; color: #10b981;');

    // Lightbox functionality
    (function initLightbox() {
        // Create lightbox elements
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-close"></div>
            <img src="" alt="">
            <div class="lightbox-caption"></div>
        `;
        document.body.appendChild(lightbox);
        
        const lightboxImg = lightbox.querySelector('img');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        
        // Get all zoomable images
        const zoomableImages = document.querySelectorAll('.screenshot-image img, .architecture-diagram img');
        
        zoomableImages.forEach(img => {
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // Get caption from parent card if available
                const card = img.closest('.screenshot-card');
                let caption = '';
                if (card) {
                    const h4 = card.querySelector('.screenshot-caption h4');
                    const p = card.querySelector('.screenshot-caption p');
                    if (h4) caption = h4.textContent;
                    if (p) caption += ' — ' + p.textContent;
                } else {
                    caption = img.alt || 'System Architecture';
                }
                
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightboxCaption.textContent = caption;
                
                // Show lightbox with animation
                lightbox.style.display = 'flex';
                requestAnimationFrame(() => {
                    lightbox.classList.add('active');
                });
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close lightbox on click anywhere
        lightbox.addEventListener('click', () => {
            lightbox.classList.remove('active');
            setTimeout(() => {
                lightbox.style.display = 'none';
            }, 300);
            document.body.style.overflow = '';
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
                setTimeout(() => {
                    lightbox.style.display = 'none';
                }, 300);
                document.body.style.overflow = '';
            }
        });
    })();

});
