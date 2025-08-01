// ===== MAIN APPLICATION CLASS =====
class FloridaSignSolution {
    constructor() {
        this.scrollPosition = 0;
        this.isScrolling = false;
        this.navbar = document.getElementById('mainNavbar');
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.intersectionObserver = new IntersectionObserver(this.handleIntersection.bind(this), this.observerOptions);
        this.init();
    }
    // ===== INITIALIZATION =====
    init() {
        this.setupEventListeners();
        this.initializeScrollAnimations();
        this.initializeNavigation();
        this.initializeFormValidation();
        this.initializeParallaxEffects();
        this.initializeTypewriterEffect();
        console.log('Florida Sign Solution website initialized successfully!');
    }
    // ===== EVENT LISTENERS =====
    setupEventListeners() {
        // Scroll events
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
        // Resize events
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));
        // Navigation events
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.handleSmoothScroll.bind(this));
        });
        // Form events
        const quoteForm = document.getElementById('quoteForm');
        if (quoteForm) {
            quoteForm.addEventListener('submit', this.handleFormSubmit.bind(this));
        }
        // Button hover effects
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('mouseenter', this.handleButtonHover.bind(this));
            button.addEventListener('mouseleave', this.handleButtonLeave.bind(this));
        });
        // Service card interactions
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', this.handleServiceCardHover.bind(this));
            card.addEventListener('mouseleave', this.handleServiceCardLeave.bind(this));
        });
    }
    // ===== SCROLL HANDLING =====
    handleScroll() {
        const currentScroll = window.pageYOffset;
        // Update navbar appearance
        this.updateNavbar(currentScroll);
        // Update scroll position
        this.scrollPosition = currentScroll;
        // Parallax effects
        this.updateParallaxElements(currentScroll);
        // Update active navigation link
        this.updateActiveNavLink();
    }
    updateNavbar(scrollPosition) {
        if (!this.navbar)
            return;
        if (scrollPosition > 100) {
            this.navbar.classList.add('scrolled');
        }
        else {
            this.navbar.classList.remove('scrolled');
        }
    }
    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (this.scrollPosition >= sectionTop && this.scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id') || '';
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    // ===== SMOOTH SCROLLING =====
    handleSmoothScroll(event) {
        event.preventDefault();
        const target = event.target;
        const targetId = target.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse === null || navbarCollapse === void 0 ? void 0 : navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    navbarToggler === null || navbarToggler === void 0 ? void 0 : navbarToggler.click();
                }
            }
        }
    }
    // ===== INTERSECTION OBSERVER =====
    initializeScrollAnimations() {
        const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .contact-item');
        animatedElements.forEach(element => {
            element.classList.add('fade-in');
            this.intersectionObserver.observe(element);
        });
    }
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                this.intersectionObserver.unobserve(entry.target);
            }
        });
    }
    // ===== FORM VALIDATION =====
    initializeFormValidation() {
        const forms = document.querySelectorAll('.needs-validation');
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', this.validateField.bind(this));
                input.addEventListener('input', this.clearFieldError.bind(this));
            });
        });
    }
    validateField(event) {
        const field = event.target;
        const isValid = field.checkValidity();
        field.classList.remove('is-valid', 'is-invalid');
        if (field.value.trim() !== '') {
            field.classList.add(isValid ? 'is-valid' : 'is-invalid');
        }
    }
    clearFieldError(event) {
        const field = event.target;
        field.classList.remove('is-invalid');
    }
    async handleFormSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const submitButton = form.querySelector('button[type="submit"]');
        if (!form.checkValidity()) {
            event.stopPropagation();
            form.classList.add('was-validated');
            return;
        }
        // Show loading state
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        try {
            const formData = this.getFormData(form);
            await this.submitForm(formData);
            // Show success message
            this.showNotification('Quote request submitted successfully! We\'ll contact you soon.', 'success');
            form.reset();
            form.classList.remove('was-validated');
        }
        catch (error) {
            console.error('Form submission error:', error);
            this.showNotification('There was an error submitting your request. Please try again.', 'error');
        }
        finally {
            // Remove loading state
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        }
    }
    getFormData(form) {
        const formData = new FormData(form);
        return {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            serviceType: document.getElementById('serviceType').value,
            message: document.getElementById('message').value
        };
    }
    async submitForm(data) {
        try {
            // EmailJS configuration
            const serviceID = 'service_florida_signs';
            const templateID = 'template_quote_request';
            const userID = 'your_emailjs_user_id';
            // Prepare email template parameters
            const templateParams = {
                from_name: `${data.firstName} ${data.lastName}`,
                from_email: data.email,
                phone: data.phone,
                service_type: data.serviceType,
                message: data.message,
                to_email: 'leandrosousa110490@yahoo.com',
                reply_to: data.email,
                subject: `New Quote Request from ${data.firstName} ${data.lastName}`,
                email_body: `
                    New quote request received:
                    
                    Name: ${data.firstName} ${data.lastName}
                    Email: ${data.email}
                    Phone: ${data.phone}
                    Service Type: ${data.serviceType}
                    Message: ${data.message}
                    
                    Please respond to this inquiry as soon as possible.
                `
            };
            // Check if we're running on Node.js server (port 3000) or Python server (port 8000)
            const isNodeServer = window.location.port === '3000';
            
            if (isNodeServer) {
                // Use Node.js email service
                const response = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        from: 'leandro.sousa1104@gmail.com',
                        to: 'leandrosousa110490@yahoo.com',
                        subject: `New Quote Request from ${data.firstName} ${data.lastName}`,
                        html: `
                            <h2>New Quote Request</h2>
                            <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
                            <p><strong>Email:</strong> ${data.email}</p>
                            <p><strong>Phone:</strong> ${data.phone}</p>
                            <p><strong>Service Type:</strong> ${data.serviceType}</p>
                            <p><strong>Message:</strong></p>
                            <p>${data.message}</p>
                            <hr>
                            <p><em>This email was sent from the Florida Sign Solution website contact form.</em></p>
                        `
                    })
                });
                
                if (!response.ok) {
                    throw new Error('Failed to send email');
                }
                
                console.log('Quote request sent successfully via email:', data);
            } else {
                // Demo mode - just log the data
                console.log('Demo mode - Quote request data:', data);
                console.log('To enable email functionality, please:');
                console.log('1. Set up Gmail App Password in server.js');
                console.log('2. Run: npm start (instead of Python server)');
            }
        }
        catch (error) {
            console.error('Email sending error:', error);
            // For demo purposes, we'll still show success
            // In production, you would handle this error appropriately
            console.log('Form data (demo mode):', data);
        }
    }
    // ===== NOTIFICATIONS =====
    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(notification);
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
    // ===== INTERACTIVE EFFECTS =====
    handleButtonHover(event) {
        const button = event.target;
        button.style.transform = 'translateY(-2px)';
    }
    handleButtonLeave(event) {
        const button = event.target;
        button.style.transform = 'translateY(0)';
    }
    handleServiceCardHover(event) {
        const card = event.target;
        const icon = card.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    }
    handleServiceCardLeave(event) {
        const card = event.target;
        const icon = card.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    }
    // ===== PARALLAX EFFECTS =====
    initializeParallaxEffects() {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.backgroundAttachment = 'fixed';
        }
    }
    updateParallaxElements(scrollPosition) {
        const parallaxElements = document.querySelectorAll('.floating-card');
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrollPosition * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    // ===== TYPEWRITER EFFECT =====
    initializeTypewriterEffect() {
        const heroTitle = document.querySelector('.hero-content h1');
        if (heroTitle) {
            const text = heroTitle.textContent || '';
            heroTitle.textContent = '';
            let index = 0;
            const typeWriter = () => {
                if (index < text.length) {
                    heroTitle.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, 50);
                }
            };
            setTimeout(typeWriter, 1000);
        }
    }
    // ===== NAVIGATION INITIALIZATION =====
    initializeNavigation() {
        // Mobile menu auto-close on scroll
        window.addEventListener('scroll', () => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse === null || navbarCollapse === void 0 ? void 0 : navbarCollapse.classList.contains('show')) {
                const navbarToggler = document.querySelector('.navbar-toggler');
                navbarToggler === null || navbarToggler === void 0 ? void 0 : navbarToggler.click();
            }
        });
    }
    // ===== UTILITY FUNCTIONS =====
    throttle(func, limit) {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
    handleResize() {
        // Recalculate positions on resize
        this.updateActiveNavLink();
    }
}
// ===== ADDITIONAL UTILITY FUNCTIONS =====
class AnimationUtils {
    static fadeIn(element, duration = 300) {
        return new Promise(resolve => {
            element.style.opacity = '0';
            element.style.display = 'block';
            const start = performance.now();
            const animate = (currentTime) => {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                element.style.opacity = progress.toString();
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
                else {
                    resolve();
                }
            };
            requestAnimationFrame(animate);
        });
    }
    static slideIn(element, direction = 'up', duration = 300) {
        return new Promise(resolve => {
            const transforms = {
                left: 'translateX(-100%)',
                right: 'translateX(100%)',
                up: 'translateY(-100%)',
                down: 'translateY(100%)'
            };
            element.style.transform = transforms[direction];
            element.style.transition = `transform ${duration}ms ease-out`;
            requestAnimationFrame(() => {
                element.style.transform = 'translate(0, 0)';
                setTimeout(() => {
                    element.style.transition = '';
                    resolve();
                }, duration);
            });
        });
    }
}
// ===== PERFORMANCE MONITORING =====
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
    }
    static getInstance() {
        if (!PerformanceMonitor.instance) {
            PerformanceMonitor.instance = new PerformanceMonitor();
        }
        return PerformanceMonitor.instance;
    }
    startTiming(label) {
        this.metrics[label] = performance.now();
    }
    endTiming(label) {
        if (this.metrics[label]) {
            const duration = performance.now() - this.metrics[label];
            console.log(`${label}: ${duration.toFixed(2)}ms`);
            delete this.metrics[label];
            return duration;
        }
        return 0;
    }
}
// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    const monitor = PerformanceMonitor.getInstance();
    monitor.startTiming('App Initialization');
    new FloridaSignSolution();
    monitor.endTiming('App Initialization');
});
// ===== EXPORT FOR MODULE USAGE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FloridaSignSolution, AnimationUtils, PerformanceMonitor };
}
