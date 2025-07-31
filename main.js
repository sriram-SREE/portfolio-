/**
     * GROWTH MARKETING EXPERT PORTFOLIO WEBSITE
     * Main JavaScript File
     */

    document.addEventListener('DOMContentLoaded', () => {
        // Initialize all components
        initNavigation();
        initThemeToggle();
        initScrollAnimations();
        initMetricCounters();
        initPortfolioCards();
        initTestimonialSlider();
        initContactForm();
        initCursorEffect();
        setCurrentYear();
        initCalendlyIntegration();
        initScrollToTop();
    });

    /**
     * Navigation functionality
     */
    function initNavigation() {
        const header = document.querySelector('.header');
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Toggle mobile menu
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Add scrolled class to header on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Highlight active nav link based on scroll position
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }

    /**
     * Theme toggle functionality - Keeping dark theme only
     */
    function initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        
        // Always use dark theme
        localStorage.setItem('theme', 'dark');
        
        // Hide the theme toggle button since we're only using dark theme
        if (themeToggle) {
            themeToggle.style.display = 'none';
        }
    }

    /**
     * Scroll animations using Intersection Observer
     */
    function initScrollAnimations() {
        // Elements to animate on scroll
        const animatedElements = document.querySelectorAll(
            '.section-header, .about-content, .service-card, .portfolio-card, .testimonial-card, .contact-form, .contact-info'
        );
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        animatedElements.forEach(element => {
            element.classList.add('fade-in');
            observer.observe(element);
        });
        
        // Service card specific animations
        const serviceCards = document.querySelectorAll('.service-card');
        const serviceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const service = card.getAttribute('data-service');
                    

                    
                    serviceObserver.unobserve(card);
                }
            });
        }, observerOptions);
        
        serviceCards.forEach(card => {
            serviceObserver.observe(card);
        });
    }

    /**
     * Animated metric counters
     */
    function initMetricCounters() {
        const metricValues = document.querySelectorAll('.metric-value');
        let countersAnimated = false;
        
        // Function to animate a single counter
        function animateCounter(counter) {
            const target = parseFloat(counter.getAttribute('data-value'));
            const duration = 2000; // ms
            const step = 30; // update interval in ms
            let current = 0;
            const isDecimal = target % 1 !== 0;
            
            // Reset counter to 0 before starting animation
            counter.textContent = '0';
            
            const timer = setInterval(() => {
                current += target / (duration / step);
                
                if (current >= target) {
                    counter.textContent = isDecimal ? target.toFixed(1) : Math.round(target);
                    clearInterval(timer);
                    
                    // Add completion animation
                    counter.classList.add('count-complete');
                    setTimeout(() => {
                        counter.classList.remove('count-complete');
                    }, 1000);
                } else {
                    counter.textContent = isDecimal ? current.toFixed(1) : Math.round(current);
                }
            }, step);
        }
        
        // Function to animate all counters
        function animateAllCounters() {
            metricValues.forEach(counter => {
                animateCounter(counter);
            });
            countersAnimated = true;
        }
        
        // Animate on scroll
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateAllCounters();
                } else {
                    // Reset animation flag when scrolled away
                    countersAnimated = false;
                }
            });
        }, { threshold: 0.5 });
        
        // Animate when page becomes visible again
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                // Reset and animate counters when page becomes visible again
                countersAnimated = false;
                
                // Check if portfolio section is in view
                const portfolioSection = document.getElementById('portfolio');
                const rect = portfolioSection.getBoundingClientRect();
                const isInViewport = (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                );
                
                if (isInViewport) {
                    animateAllCounters();
                }
            }
        });
        
        // Add CSS for the completion animation
        const style = document.createElement('style');
        style.textContent = `
            .count-complete {
                animation: countComplete 1s ease-out;
                color: var(--color-accent);
            }
        `;
        document.head.appendChild(style);
        
        metricValues.forEach(value => {
            counterObserver.observe(value);
        });
    }

    /**
     * Portfolio card 3D tilt effect
     */
    function initPortfolioCards() {
        const cards = document.querySelectorAll('.portfolio-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', e => {
                // Only apply effect on desktop
                if (window.innerWidth <= 768) return;
                
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the element
                const y = e.clientY - rect.top; // y position within the element
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) / centerX * 10; // max 10 degrees
                const deltaY = (y - centerY) / centerY * 10; // max 10 degrees
                
                card.style.transform = `perspective(1000px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.transition = 'transform 0.5s ease';
            });
        });
    }

    /**
     * Auto-scrolling testimonial slider
     */
    function initTestimonialSlider() {
        const slider = document.getElementById('testimonialsSlider');
        const cards = slider.querySelectorAll('.testimonial-card');
        
        if (cards.length <= 1) return;
        
        let scrollAmount = 0;
        const cardWidth = cards[0].offsetWidth + parseInt(window.getComputedStyle(cards[0]).marginRight);
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        const scrollSpeed = 2; // pixels per frame
        let direction = 1; // 1 for right, -1 for left
        let isHovered = false;
        
        slider.addEventListener('mouseenter', () => {
            isHovered = true;
        });
        
        slider.addEventListener('mouseleave', () => {
            isHovered = false;
        });
        
        function autoScroll() {
            if (!isHovered) {
                scrollAmount += scrollSpeed * direction;
                
                if (scrollAmount >= maxScroll) {
                    direction = -1;
                } else if (scrollAmount <= 0) {
                    direction = 1;
                }
                
                slider.scrollLeft = scrollAmount;
            }
            
            requestAnimationFrame(autoScroll);
        }
        
        // Start auto-scrolling
        requestAnimationFrame(autoScroll);
        
        // Manual scrolling with mouse drag
        let isDown = false;
        let startX;
        let scrollLeft;
        
        slider.addEventListener('mousedown', e => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        slider.addEventListener('mousemove', e => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // scroll speed
            slider.scrollLeft = scrollLeft - walk;
            scrollAmount = slider.scrollLeft;
        });
    }

    /**
     * Contact form validation and submission
     */
    function initContactForm() {
        const form = document.getElementById('contactForm');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const projectTypeInput = document.getElementById('projectType');
        const messageInput = document.getElementById('message');
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const projectTypeError = document.getElementById('projectTypeError');
        const messageError = document.getElementById('messageError');
        const formSuccess = document.getElementById('formSuccess');
        
        if (!form) return;
        
        form.addEventListener('submit', e => {
            e.preventDefault();
            let isValid = true;
            
            // Reset error messages
            nameError.style.display = 'none';
            emailError.style.display = 'none';
            projectTypeError.style.display = 'none';
            messageError.style.display = 'none';
            
            // Validate name
            if (nameInput.value.trim() === '') {
                nameError.textContent = 'Please enter your name';
                nameError.style.display = 'block';
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                emailError.textContent = 'Please enter a valid email address';
                emailError.style.display = 'block';
                isValid = false;
            }
            
            // Validate project type
            if (projectTypeInput.value === '') {
                projectTypeError.textContent = 'Please select a project type';
                projectTypeError.style.display = 'block';
                isValid = false;
            }
            
            // Validate message
            if (messageInput.value.trim() === '') {
                messageError.textContent = 'Please enter your message';
                messageError.style.display = 'block';
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission
                const submitButton = form.querySelector('.submit-button');
                const arrowIcon = submitButton.querySelector('.arrow-icon');
                submitButton.disabled = true;
                submitButton.querySelector('.button-text').textContent = 'Sending...';
                
                // Animate arrow icon to navigate to next page
                if (arrowIcon) {
                    arrowIcon.classList.add('navigate-next');
                }
                
                // Simulate API call with timeout
                setTimeout(() => {
                    form.reset();
                    submitButton.disabled = false;
                    submitButton.querySelector('.button-text').textContent = 'Send Message';
                    formSuccess.style.display = 'block';
                    
                    // Remove arrow animation class
                    if (arrowIcon) {
                        arrowIcon.classList.remove('navigate-next');
                    }
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formSuccess.style.display = 'none';
                    }, 5000);
                }, 1500);
            }
        });
    }

    /**
     * Desktop cursor glow effect
     */
    function initCursorEffect() {
        // Only apply on desktop
        if (window.innerWidth <= 768 || 'ontouchstart' in window) return;
        
        const cursor = document.getElementById('cursorGlow');
        if (!cursor) return;
        
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.opacity = '0.5';
            cursor.style.transform = `translate(${mouseX - 15}px, ${mouseY - 15}px)`;
        });
        
        document.addEventListener('mousedown', () => {
            cursor.style.transform = `translate(${mouseX - 15}px, ${mouseY - 15}px) scale(0.8)`;
        });
        
        document.addEventListener('mouseup', () => {
            cursor.style.transform = `translate(${mouseX - 15}px, ${mouseY - 15}px) scale(1)`;
        });
        
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '0.5';
        });
        
        // Enhance glow effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .service-card, .portfolio-card, .testimonial-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = `translate(${mouseX - 15}px, ${mouseY - 15}px) scale(1.5)`;
                cursor.style.opacity = '0.7';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = `translate(${mouseX - 15}px, ${mouseY - 15}px) scale(1)`;
                cursor.style.opacity = '0.5';
            });
        });
    }

    /**
     * Set current year in footer copyright
     */
    function setCurrentYear() {
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    /**
     * Initialize Calendly integration
     */
    function initCalendlyIntegration() {
        const calendlyLink = document.getElementById('calendlyLink');
        
        if (calendlyLink) {
            calendlyLink.addEventListener('click', e => {
                e.preventDefault();
                
                // Replace with your actual Calendly URL
                Calendly.initPopupWidget({
                    url: 'https://calendly.com/growthexpert/30min'
                });
            });
        }
    }

    /**
     * Add CSS class for animations
     */
    document.addEventListener('DOMContentLoaded', () => {
        document.body.classList.add('dom-loaded');
    });

    /**
     * Initialize scroll to top button
     */
    function initScrollToTop() {
        const scrollToTopBtn = document.getElementById('scrollToTop');
        
        if (!scrollToTopBtn) return;
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }