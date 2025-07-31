// GitHub Pages Compatible Version - No Backend Required
class FloridaSignSolution {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.initializeParallaxEffects();
        this.setupScrollEffects();
        this.initializeCounters();
    }

    // ===== EVENT LISTENERS =====
    setupEventListeners() {
        // Navigation
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        // Buttons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => this.handleButtonHover(e));
            button.addEventListener('mouseleave', (e) => this.handleButtonLeave(e));
        });

        // Service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', (e) => this.handleServiceCardHover(e));
            card.addEventListener('mouseleave', (e) => this.handleServiceCardLeave(e));
        });

        // Quote form
        const quoteForm = document.getElementById('quoteForm');
        if (quoteForm) {
            quoteForm.addEventListener('submit', (e) => this.handleQuoteSubmit(e));
        }

        // Scroll events
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());
    }

    // ===== NAVIGATION =====
    handleNavClick(event) {
        const targetId = event.target.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
            event.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Dynamic offset based on screen size
                let offset = 80;
                if (window.innerWidth <= 575) {
                    offset = 70;
                } else if (window.innerWidth <= 767) {
                    offset = 75;
                } else if (window.innerWidth <= 991) {
                    offset = 80;
                }
                
                const offsetTop = targetElement.offsetTop - offset;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    }

    // ===== ANIMATIONS =====
    initializeAnimations() {
        // Fade in elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements
        const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .about-content');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // ===== COUNTERS =====
    initializeCounters() {
        const counters = document.querySelectorAll('.counter');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    }

    // ===== SCROLL EFFECTS =====
    setupScrollEffects() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }
    }

    handleScroll() {
        // Add scroll-based animations here
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    handleResize() {
        // Handle responsive adjustments
        this.initializeParallaxEffects();
    }

    // ===== FORM HANDLING =====
    async handleQuoteSubmit(event) {
        event.preventDefault();
        
        const submitButton = event.target.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        try {
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Get form data
            const data = this.getFormData(event.target);
            
            // GitHub Pages Compatible Email Solutions:
            // Option 1: EmailJS (Recommended)
            await this.sendEmailViaEmailJS(data);
            
            // Option 2: Formspree (Alternative)
            // await this.sendEmailViaFormspree(data);
            
            // Option 3: Netlify Forms (If using Netlify)
            // await this.sendEmailViaNetlify(data);
            
            this.showNotification('Quote request sent successfully! We\'ll get back to you soon.', 'success');
            event.target.reset();
            
        } catch (error) {
            console.error('Error sending quote request:', error);
            this.showNotification('Sorry, there was an error sending your request. Please try again or contact us directly.', 'error');
        } finally {
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }

    getFormData(form) {
        const formData = new FormData(form);
        return {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            serviceType: formData.get('serviceType'),
            message: formData.get('message')
        };
    }

    // EmailJS Integration (Free tier: 200 emails/month)
    async sendEmailViaEmailJS(data) {
        // You need to:
        // 1. Sign up at https://www.emailjs.com/
        // 2. Create a service and template
        // 3. Replace these IDs with your actual IDs
        
        // EmailJS Configuration (Replace with your actual IDs from EmailJS dashboard)
        const serviceID = 'service_hvexey7';  // Your actual Service ID
        const templateID = 'template_35tifu3'; // Your actual Template ID
        const userID = 'LL0IKULgdWZ8Rfnkj'; // Get from EmailJS dashboard
        
        const templateParams = {
            from_name: `${data.firstName} ${data.lastName}`,
            from_email: 'leandro.sousa1104@gmail.com', // Fixed sender email
            customer_email: data.email, // Customer's email for reference
            phone: data.phone,
            service_type: data.serviceType,
            message: data.message,
            to_email: 'leandrosousa110490@yahoo.com',
            reply_to: data.email
        };
        
        console.log('Sending email with parameters:', templateParams);
        
        // Check if EmailJS is available
        if (typeof emailjs === 'undefined') {
            console.error('EmailJS not loaded. Make sure to include EmailJS script in HTML.');
            throw new Error('EmailJS not available');
        }
        
        try {
            const result = await emailjs.send(serviceID, templateID, templateParams, userID);
            console.log('Email sent successfully:', result);
            return result;
        } catch (error) {
            console.error('EmailJS Error:', error);
            throw error;
        }
    }

    // Formspree Integration (Free tier: 50 submissions/month)
    async sendEmailViaFormspree(data) {
        // You need to:
        // 1. Sign up at https://formspree.io/
        // 2. Create a form and get your form ID
        // 3. Replace 'YOUR_FORM_ID' with your actual form ID
        
        const formspreeURL = 'https://formspree.io/f/YOUR_FORM_ID';
        
        const response = await fetch(formspreeURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                phone: data.phone,
                service: data.serviceType,
                message: data.message
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to send email via Formspree');
        }
        
        return response.json();
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
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FloridaSignSolution();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FloridaSignSolution;
}