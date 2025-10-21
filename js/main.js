console.log('Slider script loaded');

class Slider {
    constructor() {
        console.log('Initializing Slider...');
        this.slides = Array.from(document.querySelectorAll('.slide'));
        this.dotsContainer = document.querySelector('.slider-dots');
        this.prevBtn = document.querySelector('.slider-prev');
        this.nextBtn = document.querySelector('.slider-next');
        this.navbar = document.getElementById('mainNav');
        this.currentSlide = 0;
        this.slideInterval = 7000; // 7 seconds per slide
        this.slideTimeout = null;
        
        console.log('Found elements:', {
            slides: this.slides.length,
            dotsContainer: !!this.dotsContainer,
            prevBtn: !!this.prevBtn,
            nextBtn: !!this.nextBtn,
            navbar: !!this.navbar
        });
        
        if (this.slides.length > 0) {
            // Initialize the slider even if some controls are missing
            this.init();
        } else {
            console.error('No slides found');
        }
    }

    init() {
        // Create dots
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });

        // Event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        // Start the slider
        this.startSlider();
        this.updateNavbarTheme();
        
        // Pause on hover
        const slider = document.querySelector('.hero-slider');
        slider.addEventListener('mouseenter', () => this.pauseSlider());
        slider.addEventListener('mouseleave', () => this.startSlider());
    }

    startSlider() {
        clearInterval(this.slideTimeout);
        this.slideTimeout = setInterval(() => this.nextSlide(), this.slideInterval);
    }

    pauseSlider() {
        clearInterval(this.slideTimeout);
    }

    updateDots() {
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    updateNavbarTheme() {
        const currentSlide = this.slides[this.currentSlide];
        const theme = currentSlide ? currentSlide.getAttribute('data-navbar-theme') || 'light' : 'light';
        
        // Remove all theme classes
        this.navbar.classList.remove('navbar-light-theme', 'navbar-dark-theme');
        
        // Add the appropriate theme class
        this.navbar.classList.add(`navbar-${theme}-theme`);
    }

    goToSlide(index) {
        if (this.slides.length === 0) {
            console.error('No slides available');
            return;
        }
        
        // Wrap around if needed
        this.currentSlide = (index + this.slides.length) % this.slides.length;
        
        console.log('Going to slide:', this.currentSlide, 'of', this.slides.length - 1);
        
        // Hide all slides first
        this.slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.display = 'none';
            slide.style.opacity = '0';
        });
        
        // Show current slide
        const currentSlide = this.slides[this.currentSlide];
        if (currentSlide) {
            currentSlide.style.display = 'block';
            // Force reflow to ensure display:block is applied before adding active class
            void currentSlide.offsetHeight;
            currentSlide.classList.add('active');
            currentSlide.style.opacity = '1';
            
            console.log('Current slide:', currentSlide);
        }
        
        // Update dots and navbar if they exist
        if (this.dotsContainer) {
            this.updateDots();
        }
        
        if (this.navbar) {
            this.updateNavbarTheme();
        }
        
        // Reset the auto-slide timer
        this.startSlider();
    }

    nextSlide() {
        this.goToSlide(this.currentSlide + 1);
    }

    prevSlide() {
        this.goToSlide(this.currentSlide - 1);
    }
}

// Initialize the slider when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
    
    // Initialize slider if it exists on the page
    const slider = document.querySelector('.hero-slider');
    if (slider) {
        console.log('Slider container found, initializing...');
        
        // Show the first slide and hide others
        const slides = document.querySelectorAll('.slide');
        if (slides.length > 0) {
            console.log(`Found ${slides.length} slides`);
            
            // Initialize the slider after ensuring slides are properly set up
            window.mySlider = new Slider();
            
            // Manually trigger the first slide
            window.mySlider.goToSlide(0);
        } else {
            console.error('No slides found in the slider');
        }
    } else {
        console.error('Slider container not found');
    }
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Close mobile menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('navbarNav');
    if (menuToggle) {
        const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle: false});
        
        navLinks.forEach(function(l) {
            l.addEventListener('click', function() {
                if (menuToggle.classList.contains('show')) {
                    bsCollapse.toggle();
                }
            });
        });
    }

    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    };

    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});

/* Testimonial slider and expandable cards */
class TestimonialSlider {
    constructor(selector = '.testimonials-slider') {
        this.root = document.querySelector(selector);
        if (!this.root) return;

        this.track = this.root.querySelector('.testimonials-track');
        this.cards = Array.from(this.track.querySelectorAll('.testimonial'));
        this.dotsContainer = this.root.querySelector('.testimonial-dots');
        this.currentIndex = 0; // index of leftmost visible card for sliding
        this.visibleCount = 4;

        this.init();
    }

    init() {
        // create dots (one per card)
        this.cards.forEach((card, idx) => {
            const dot = document.createElement('button');
            dot.className = 'dot';
            dot.type = 'button';
            dot.setAttribute('aria-label', `Show testimonial ${idx + 1}`);
            if (idx === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goTo(idx));
            this.dotsContainer.appendChild(dot);
        });

        // Click to toggle expansion
        this.cards.forEach(card => {
            card.addEventListener('click', (e) => this.toggleExpand(card, e));
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleExpand(card, e);
                }
            });
        });

        // Initial layout
        this.updateLayout();
        window.addEventListener('resize', () => this.updateLayout());
    }

    updateLayout() {
        const w = window.innerWidth;
        if (w >= 1200) this.visibleCount = 4;
        else if (w >= 992) this.visibleCount = 3;
        else if (w >= 768) this.visibleCount = 2;
        else this.visibleCount = 1;

        // ensure currentIndex within bounds
        this.currentIndex = Math.max(0, Math.min(this.currentIndex, Math.max(0, this.cards.length - this.visibleCount)));
        this.updateTrackPosition();
        this.updateDotsActive();
    }

    updateTrackPosition() {
        const card = this.cards[0];
        if (!card) return;

        // If there is an expanded card, try to center it in the container when possible
        const expandedIndex = this.cards.findIndex(c => c.classList.contains('expanded'));
        const containerRect = this.root.getBoundingClientRect();

        if (expandedIndex >= 0) {
            const expandedCard = this.cards[expandedIndex];
            const cardWidth = expandedCard.getBoundingClientRect().width;
            // card.offsetLeft is relative to the track (ignores transforms)
            const cardCenterInTrack = expandedCard.offsetLeft + (cardWidth / 2);
            const containerCenter = containerRect.width / 2;

            // Desired translate so that card center aligns with container center
            let translate = containerCenter - cardCenterInTrack;

            // Calculate track scrollable width and clamp translate so the track doesn't overscroll
            const trackScrollWidth = this.track.scrollWidth;
            const minTranslate = Math.min(0, containerRect.width - trackScrollWidth - 16); // allow a small padding
            const maxTranslate = 0;

            translate = Math.max(minTranslate, Math.min(maxTranslate, translate));
            this.track.style.transform = `translateX(${translate}px)`;
            return;
        }

        // Fallback: simple index-based translation (leftmost card)
        const cardWidth = card.getBoundingClientRect().width + parseFloat(getComputedStyle(this.track).gap || 16);
        const offset = this.currentIndex * cardWidth * -1;
        this.track.style.transform = `translateX(${offset}px)`;
    }

    updateDotsActive() {
        const dots = Array.from(this.dotsContainer.children);
        // If a card is expanded, highlight its dot; otherwise highlight currentIndex
        const expandedIndex = this.cards.findIndex(c => c.classList.contains('expanded'));
        const activeIndex = expandedIndex >= 0 ? expandedIndex : this.currentIndex;
        dots.forEach((d, i) => d.classList.toggle('active', i === activeIndex));
    }

    goTo(index) {
        // clamp to valid range so clicked dot navigates to show that card at start if possible
        this.currentIndex = Math.max(0, Math.min(index, Math.max(0, this.cards.length - this.visibleCount)));
        this.updateTrackPosition();
        this.updateDotsActive();
        // collapse any expanded card when navigating
        this.cards.forEach(c => c.classList.remove('expanded'));
    }

    toggleExpand(card, e) {
        const wasExpanded = card.classList.contains('expanded');
        // collapse others
        this.cards.forEach(c => c.classList.remove('expanded'));
        if (!wasExpanded) {
            card.classList.add('expanded');
            // scroll the expanded card into view; ensure it's visible in the track
            const idx = this.cards.indexOf(card);
            // Try to center the expanded card when possible
            const centerSlot = Math.floor(this.visibleCount / 2);
            let desiredIndex = idx - centerSlot;
            // clamp
            desiredIndex = Math.max(0, Math.min(desiredIndex, Math.max(0, this.cards.length - this.visibleCount)));
            this.currentIndex = desiredIndex;
            this.updateTrackPosition();
            this.updateDotsActive();
        } else {
            card.classList.remove('expanded');
        }
    }
}

// Initialize testimonials slider when DOM is ready (after other initializations above)
document.addEventListener('DOMContentLoaded', () => {
    window.testimonials = new TestimonialSlider();
});
