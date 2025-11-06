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
        // Create dots if container exists
        if (this.dotsContainer) {
            this.slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('slider-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => this.goToSlide(index));
                this.dotsContainer.appendChild(dot);
            });
        }

        // Add event listeners if buttons exist
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Start the slider if we have slides
        if (this.slides.length > 0) {
            this.startSlider();
            this.updateNavbarTheme();
            
            // Pause on hover
            const slider = document.querySelector('.hero-slider');
            if (slider) {
                slider.addEventListener('mouseenter', () => this.pauseSlider());
                slider.addEventListener('mouseleave', () => this.startSlider());
            }
        }
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
        this.navbar.classList.remove('navbar-light-theme', 'navbar-dark-theme', 'navbar-dark-transparent-theme', 'navbar-light-blue-theme');
        
        // Add the appropriate theme class based on the data attribute
        if (theme === 'dark-transparent' || theme === 'light-blue') {
            this.navbar.classList.add(`navbar-${theme}-theme`);
        } else {
            // Fallback for other themes
            this.navbar.classList.add(`navbar-${theme}-theme`);
        }
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
        this.autoSlideInterval = null;
        this.autoSlideDelay = 4000; // 4 seconds per slide

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
            dot.addEventListener('click', () => {
                this.pauseAutoSlide();
                this.goTo(idx);
                this.resumeAutoSlide();
            });
            this.dotsContainer.appendChild(dot);
        });

        // Click to toggle expansion (pause auto-slide when user interacts)
        this.cards.forEach(card => {
            card.addEventListener('click', (e) => {
                this.pauseAutoSlide();
                this.toggleExpand(card, e);
                this.resumeAutoSlide();
            });
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.pauseAutoSlide();
                    this.toggleExpand(card, e);
                    this.resumeAutoSlide();
                }
            });
        });

        // Initial layout
        this.updateLayout();
        
        // Ensure first card is expanded on initialization
        if (this.cards.length > 0) {
            this.cards[0].classList.add('expanded');
            this.currentIndex = 0;
            this.updateDotsActive();
        }
        
        // Handle resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.updateLayout();
            }, 150);
        });
        
        // Start auto-slide - simplified approach
        const startAutoSlideOnce = () => {
            if (!this.autoSlideInterval && this.cards && this.cards.length > 0) {
                this.startAutoSlide();
            }
        };
        
        // Always try to start after initialization completes
        setTimeout(() => {
            startAutoSlideOnce();
        }, 500);
        
        // Also try on window load
        if (window.addEventListener) {
            window.addEventListener('load', () => {
                setTimeout(startAutoSlideOnce, 1000);
            });
        }
        
        // Pause on hover (desktop only - doesn't affect mobile)
        this.root.addEventListener('mouseenter', () => this.pauseAutoSlide());
        this.root.addEventListener('mouseleave', () => this.resumeAutoSlide());
        
        // Pause on touch (mobile) - resume after touch ends
        // Delay attaching touch listeners to ensure auto-slide starts first
        let touchTimeout;
        let touchStartTime = 0;
        let isTouching = false;
        let touchMoved = false;
        let touchListenersAttached = false;
        
        // Attach touch listeners after auto-slide has had time to start
        setTimeout(() => {
            if (!touchListenersAttached) {
                touchListenersAttached = true;
                
                this.root.addEventListener('touchstart', (e) => {
                    touchStartTime = Date.now();
                    isTouching = true;
                    touchMoved = false;
                    this.pauseAutoSlide();
                    clearTimeout(touchTimeout);
                });
                
                this.root.addEventListener('touchmove', () => {
                    touchMoved = true;
                });
                
                this.root.addEventListener('touchend', () => {
                    isTouching = false;
                    clearTimeout(touchTimeout);
                    const touchDuration = Date.now() - touchStartTime;
                    // Resume after delay - shorter for quick taps, longer for swipes
                    const resumeDelay = touchMoved && touchDuration > 300 ? 3000 : 1500;
                    touchTimeout = setTimeout(() => {
                        if (!isTouching) {
                            this.resumeAutoSlide();
                        }
                    }, resumeDelay);
                });
            }
        }, 1500); // Wait 1.5 seconds before attaching touch listeners
    }

    startAutoSlide() {
        // Clear any existing interval first
        this.pauseAutoSlide();
        
        // Only start if we have cards
        if (!this.cards || this.cards.length === 0) {
            return;
        }
        
        // Start the auto-slide interval
        this.autoSlideInterval = setInterval(() => {
            if (this.cards && this.cards.length > 0) {
                this.nextSlide();
            } else {
                // If cards are missing, stop the interval
                this.pauseAutoSlide();
            }
        }, this.autoSlideDelay);
    }

    pauseAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }

    resumeAutoSlide() {
        if (!this.autoSlideInterval) {
            this.startAutoSlide();
        }
    }

    nextSlide() {
        if (!this.cards || this.cards.length === 0) {
            return;
        }
        
        // Find the currently expanded card index
        const expandedIndex = this.cards.findIndex(c => c.classList.contains('expanded'));
        let nextIndex;
        
        // If a card is expanded, move to the next card
        if (expandedIndex >= 0) {
            nextIndex = (expandedIndex + 1) % this.cards.length;
        } else {
            // If no card is expanded, use currentIndex logic
            const maxIndex = Math.max(0, this.cards.length - this.visibleCount);
            if (this.currentIndex >= maxIndex) {
                nextIndex = 0;
            } else {
                nextIndex = this.currentIndex + 1;
            }
        }
        
        // Collapse all cards first
        this.cards.forEach(c => c.classList.remove('expanded'));
        
        // Update currentIndex to the next card
        this.currentIndex = nextIndex;
        
        // Expand the next card
        if (this.cards[nextIndex]) {
            this.cards[nextIndex].classList.add('expanded');
        }
        
        // Update track position to center the expanded card
        this.updateTrackPosition();
        this.updateDotsActive();
    }

    expandCurrentCard() {
        // Collapse all cards first
        this.cards.forEach(c => c.classList.remove('expanded'));
        
        // Expand the card at currentIndex
        if (this.cards[this.currentIndex]) {
            this.cards[this.currentIndex].classList.add('expanded');
        }
        
        // Update track position to center the expanded card
        this.updateTrackPosition();
        this.updateDotsActive();
    }

    updateLayout() {
        const w = window.innerWidth;
        if (w >= 1200) this.visibleCount = 4;
        else if (w >= 992) this.visibleCount = 3;
        else if (w >= 768) this.visibleCount = 2;
        else this.visibleCount = 1;

        // ensure currentIndex within bounds
        const maxIndex = Math.max(0, this.cards.length - this.visibleCount);
        this.currentIndex = Math.max(0, Math.min(this.currentIndex, maxIndex));
        this.updateTrackPosition();
        this.updateDotsActive();
        this.expandCurrentCard();
        
        // Ensure auto-slide is running (in case it was stopped)
        // Only restart if it's not already running
        if (!this.autoSlideInterval) {
            setTimeout(() => {
                this.startAutoSlide();
            }, 200);
        }
    }

    updateTrackPosition() {
        const card = this.cards[0];
        if (!card || !this.track) return;

        // If there is an expanded card, try to center it in the container when possible
        const expandedIndex = this.cards.findIndex(c => c.classList.contains('expanded'));
        const containerRect = this.root.getBoundingClientRect();

        if (expandedIndex >= 0) {
            const expandedCard = this.cards[expandedIndex];
            const cardRect = expandedCard.getBoundingClientRect();
            const cardWidth = cardRect.width;
            
            // Get card position relative to track
            const trackRect = this.track.getBoundingClientRect();
            const cardLeftRelativeToTrack = cardRect.left - trackRect.left;
            const cardCenterInTrack = cardLeftRelativeToTrack + (cardWidth / 2);
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
        // On mobile (visibleCount = 1), we need to move by one card width at a time
        // Get the actual card width including gap
        const cardRect = card.getBoundingClientRect();
        const gap = parseFloat(getComputedStyle(this.track).gap || 16);
        const cardWidth = cardRect.width + gap;
        
        // Calculate offset to show the card at currentIndex
        const offset = this.currentIndex * cardWidth * -1;
        
        // Apply the transform
        this.track.style.transform = `translateX(${offset}px)`;
    }

    updateDotsActive() {
        const dots = Array.from(this.dotsContainer.children);
        // Find which card is currently expanded
        const expandedIndex = this.cards.findIndex(c => c.classList.contains('expanded'));
        // If no card is expanded, use currentIndex; otherwise use the expanded card's index
        const activeIndex = expandedIndex >= 0 ? expandedIndex : this.currentIndex;
        dots.forEach((d, i) => d.classList.toggle('active', i === activeIndex));
    }

    goTo(index) {
        // Collapse all cards first
        this.cards.forEach(c => c.classList.remove('expanded'));
        
        // clamp to valid range so clicked dot navigates to show that card at start if possible
        this.currentIndex = Math.max(0, Math.min(index, Math.max(0, this.cards.length - this.visibleCount)));
        
        // Expand the card at the clicked index
        if (this.cards[index]) {
            this.cards[index].classList.add('expanded');
        }
        
        this.updateTrackPosition();
        this.updateDotsActive();
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




// Check if element exists before adding event listeners
        function safeAddEventListener(selector, event, handler) {
            const element = document.querySelector(selector);
            if (element) {
                element.addEventListener(event, handler);
                return true;
            }
            return false;
        }

        // Safe style setter
        function safeSetStyle(selector, styles) {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                if (el && el.style) {
                    Object.assign(el.style, styles);
                }
            });
        }

        function initFeatureSlider() {
            console.log('Initializing feature slider...');
            const $slider = $('.features-slider');
            
            // Check if slider exists and has children
            if (!$slider.length) {
                console.warn('Features slider not found on this page');
                return false;
            }

            if (!$slider.children().length) {
                console.warn('Features slider has no children');
                return false;
            }

            console.log('Slider element and children found');
            
            try {
                // Destroy any existing Slick instances
                if ($slider.hasClass('slick-initialized')) {
                    $slider.slick('unslick');
                }
                
                // Remove any existing custom dots
                $('.custom-dots').remove();
                
                try {
                    // Initialize Slick Slider with centered dots
                    $slider.slick({
                        dots: true,
                        dotsClass: 'slick-dots',
                        appendDots: $slider,
                        customPaging: function(slider, i) {
                            return $('<button type="button" />')
                                .text('')
                                .attr('aria-label', 'Go to slide ' + (i + 1));
                        },
                        arrows: false,
                        infinite: true,
                        speed: 300,
                        slidesToShow: 1.1,
                        centerMode: true,
                        centerPadding: '20px',
                        autoplay: true,
                        autoplaySpeed: 3000,
                        adaptiveHeight: true,
                        responsive: [
                            {
                                breakpoint: 768,
                                settings: {
                                    slidesToShow: 1,
                                    centerMode: true,
                                    centerPadding: '20px',
                                    dots: true
                                }
                            }
                        ]
                    });
                    
                    console.log('Slick slider initialized successfully');
                    return true;
                } catch (error) {
                    console.error('Error initializing slider:', error);
                    return false;
                }
                
                // Force dots to be visible
                $slider.on('init', function() {
                    const $dots = $slider.find('.slick-dots');
                    $dots.css({
                        'position': 'absolute',
                        'bottom': '10px',
                        'left': '50%',
                        'transform': 'translateX(-50%)',
                        'display': 'flex !important',
                        'opacity': '1 !important',
                        'visibility': 'visible !important'
                    });
                    
                    // Add debug border
                    $dots.css('border', '1px solid red');
                });
                
                // Ensure dots are properly centered
                $slider.find('.slick-dots').css({
                    'position': 'absolute',
                    'bottom': '10px',
                    'left': '50%',
                    'transform': 'translateX(-50%)',
                    'margin': '0',
                    'padding': '0',
                    'list-style': 'none',
                    'text-align': 'center',
                    'width': 'auto',
                    'z-index': '1000'
                });
                
                // Force dots to be visible
                setTimeout(() => {
                    $slider.find('.slick-dots')
                        .css('opacity', '1')
                        .css('visibility', 'visible')
                        .css('display', 'block');
                }, 100);
                
                console.log('Slick slider initialized successfully');
                
            } catch (error) {
                console.error('Error initializing slider:', error);
            }
        }

        // Initialize when DOM is fully loaded
        $(window).on('load', function() {
            // Initialize What We Are slider for mobile
            $('.what-we-are-slider').slick({
                dots: false,  // Hide the dots
                arrows: false,
                infinite: true,
                speed: 300,
                slidesToShow: 1.15,  // Show 1 full slide and 15% of the next
                slidesToScroll: 1,
                centerMode: true,     // Enable center mode to handle first/last slides better
                variableWidth: false, // Use fixed width for consistent sizing
                centerPadding: '16px', // Add padding on both sides
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1.15,
                            variableWidth: false,
                            centerMode: true,
                            centerPadding: '16px'
                        }
                    }
                ]
            });
            
            // Initialize Upcoming Events slider for mobile - FIXED VERSION
            const $eventsSlider = $('.upcoming-events-slider');
            
            function initEventsSlider() {
                if ($eventsSlider.length) {
                    if ($(window).width() < 768) {
                        // Destroy first if exists
                        if ($eventsSlider.hasClass('slick-initialized')) {
                            $eventsSlider.slick('unslick');
                        }
                        
                        // Initialize with NO DOTS and peek effect
                        $eventsSlider.slick({
                dots: false,
                arrows: false,
                infinite: true,
                speed: 300,
                            slidesToShow: 1.1,
                slidesToScroll: 1,
                            centerMode: false,
                variableWidth: false,
                            centerPadding: '0',
                            adaptiveHeight: true
                        });
                        
                        // Force remove dots - multiple times to be sure
                        function killDots() {
                            $('.upcoming-events-slider .slick-dots').remove();
                            $('.upcoming-events-slider').find('.slick-dots').remove();
                        }
                        killDots();
                        setTimeout(killDots, 10);
                        setTimeout(killDots, 50);
                        setTimeout(killDots, 100);
                        setTimeout(killDots, 200);
                        setTimeout(killDots, 500);
                        setInterval(killDots, 500);
                    } else {
                        // Destroy on desktop
                        if ($eventsSlider.hasClass('slick-initialized')) {
                            $eventsSlider.slick('unslick');
                        }
                    }
                }
            }
            
            // Initialize
            initEventsSlider();
            
            // Reinitialize on resize
            let eventsResizeTimer;
            $(window).on('resize', function() {
                clearTimeout(eventsResizeTimer);
                eventsResizeTimer = setTimeout(initEventsSlider, 250);
            });
            
            const $slider = $('.features-slider');
            
            // Only initialize if we're on a page with the features slider
            if ($slider.length) {
                console.log('Document loaded, checking slider initialization...');
                
                // Function to handle slider initialization
                const initSlider = function() {
                    if (window.innerWidth <= 991) {
                        if (!$slider.hasClass('slick-initialized')) {
                            console.log('Initializing slider for mobile view...');
                            initFeatureSlider();
                        }
                    } else {
                        if ($slider.hasClass('slick-initialized')) {
                            console.log('Destroying slider for desktop view...');
                            $slider.slick('unslick');
                        }
                    }
                };
                
                // Initial check
                initSlider();
                
                // Add a small delay to ensure all elements are fully loaded
                setTimeout(initSlider, 500);
                
                // Reinitialize on window resize with debounce
                let resizeTimer;
                $(window).on('resize', function() {
                    clearTimeout(resizeTimer);
                    resizeTimer = setTimeout(initSlider, 250);
                });
            } else {
                console.warn('No features slider found on this page');
            }
        });
        
        // Function to force dots visibility
        function ensureDotsVisible() {
            const dots = document.querySelectorAll('.features-slider .slick-dots');
            dots.forEach(dot => {
                if (dot) {
                    dot.style.display = 'block';
                    dot.style.opacity = '1';
                    dot.style.visibility = 'visible';
                    
                    // Add some debug info
                    console.log('Dots element found, forcing visibility');
                    console.log('Dots display style:', window.getComputedStyle(dot).display);
                    
                    // Force a reflow/repaint
                    dot.style.display = 'none';
                    dot.offsetHeight; // Trigger reflow
                    dot.style.display = 'block';
                }
            });
            
            // If still not visible, add a border to help with debugging
            setTimeout(() => {
                dots.forEach(dot => {
                    if (dot) {
                        dot.style.border = '1px solid red'; // Debug border
                        console.log('Dots element with forced styles:', dot);
                    }
                });
            }, 100);
        }
        
        // Add a manual initialization function that can be called from console
        window.initFeatureSlider = function() {
            initFeatureSlider();
            // Ensure dots are visible after initialization
            setTimeout(ensureDotsVisible, 200);
        };
        
        // Run ensureDotsVisible after page load
        window.addEventListener('load', function() {
            setTimeout(ensureDotsVisible, 500);
        });