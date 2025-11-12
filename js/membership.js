const links = document.querySelectorAll('.aboutPageLinks');
const aboutUsItem = document.querySelectorAll('.aboutUsItem');
const card = document.querySelectorAll('.membershipCard');
const leadership = document.getElementById('aboutUsLeadershipContent');
const history = document.getElementById('aboutUsHistoryContent');
const visionAndMission = document.getElementById('aboutUsVisionAndMission');
const aboutLocation = document.getElementById('aboutUsLocation');
const coreValues = document.getElementById('aboutUsCoreValues');
const ranking = document.getElementById('aboutUsRanking');
const awards = document.getElementById('aboutUsAwards');
const firstMembershipCard = document.getElementById('membershipOverviewCards');
const secondMembershipCard = document.getElementById('membershipBenefitCards');


window.onload = function() {
    window.scrollTo(0, 0);
};

links.forEach(link => {
    link.addEventListener('click', (event) => {
        links.forEach(subLink => {            
            if (subLink.classList.contains('about-active-page-link')) {
                subLink.classList.remove('about-active-page-link');
            }
        })
        aboutUsItem.forEach(item => {
            if (item.classList.contains('aboutUsContentActive')) {
                item.classList.remove('aboutUsContentActive');
            }
            // console.log('working');
        })
        card.forEach(card => {
            if (card.classList.contains('membershipCardActive')) {
                card.classList.remove('membershipCardActive');
            }
        })
        if (event.target.classList.contains('leadership')){
            // ranking.classList.add('aboutUsContentActive');
            leadership.classList.toggle('aboutUsContentActive');
            firstMembershipCard.classList.toggle('membershipCardActive');
            event.target.classList.toggle('about-active-page-link')
        }
        else if (event.target.classList.contains('history')){
            history.classList.add('aboutUsContentActive');
            firstMembershipCard.classList.toggle('membershipCardActive');
            secondMembershipCard.classList.toggle('membershipCardActive');
            event.target.classList.toggle('about-active-page-link')
        }
        else if (event.target.classList.contains('visionAndMission')){
            visionAndMission.classList.add('aboutUsContentActive');
            event.target.classList.toggle('about-active-page-link')
        }
        else if (event.target.classList.contains('location')){
            aboutLocation.classList.add('aboutUsContentActive');
            event.target.classList.toggle('about-active-page-link')
        }
        else if (event.target.classList.contains('coreValues')){
            coreValues.classList.add('aboutUsContentActive');
            event.target.classList.toggle('about-active-page-link')
        }
        else if (event.target.classList.contains('ranking')){
            ranking.classList.add('aboutUsContentActive');
            secondMembershipCard.classList.toggle('membershipCardActive');
            event.target.classList.toggle('about-active-page-link')
        }
        else if (event.target.classList.contains('awards')){
            awards.classList.add('aboutUsContentActive');
            event.target.classList.toggle('about-active-page-link')
        }
        // console.log(event.target.classList);
    });
})

var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        events: {
            'onError': function (event) {
                event.target.src += '';
            },
            // 'onStateChange': function (event) {
            //     if(event.data === YT.PlayerState BUFFERING){
            //         if(!player.getVideoUrl()) {
            //             event.target.src += '';
            //         }
            //     }
            // }
        }
    });
}
 if(window.YT) {
    onYouTubeIframeAPIReady();
 }else {
    var tag = document.createElement
 }

const accordionWrapper = document.querySelector('#accordionWrapper');
const accordionHeader = document.querySelector('.accordionItemContent');

accordionWrapper.addEventListener('click', () => {
    if(accordionWrapper.classList.contains('collapsed')){
        accordionHeader.textContent = `Section Menu`;
    }else{
        accordionHeader.textContent = `Hide Menu`;
    }
});
// accordionHeader.textContent = accordionHeader.textContent === 'Hide Menu' ? 'Section Menu' : 'Hide Menu';

      // Simple dot navigation functionality
      const dots = document.querySelectorAll(".dot");
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          dots.forEach((d) => d.classList.remove("active"));
          dot.classList.add("active");
        });
      });

      // Add smooth hover effects
      document
        .querySelectorAll(".card, .benefit-card, .testimonial")
        .forEach((el) => {
          el.addEventListener("mouseenter", function () {
            this.style.transition = "all 0.3s ease";
          });
        });

// Removed old Bootstrap carousel sync code - now handled by TestimonialSlider class

// Removed old testimonial-col hover code - new structure doesn't use testimonial-col


// Removed old mobile carousel transformation code - now handled by TestimonialSlider class

/* Testimonial slider with dynamic width behavior */
class TestimonialSlider {
    constructor(selector = '.testimonials-slider') {
        this.root = document.querySelector(selector);
        if (!this.root) return;

        this.track = this.root.querySelector('.testimonials-track');
        this.cards = Array.from(this.track.querySelectorAll('.testimonial'));
        this.dotsContainer = this.root.querySelector('.testimonial-dots');
        this.currentIndex = 0;
        this.isAnimating = false;
        this.autoSlideInterval = null;
        this.autoSlideDelay = 4000;

        this.init();
    }

    init() {
        if (!this.root || !this.track || !this.cards.length) return;

        // Create dots
        this.createDots();

        // Set initial card states
        this.updateCardStates();

        // Set up event listeners
        this.setupEventListeners();

        // Start auto slide
        this.startAutoSlide();

        // Handle window resize
        window.addEventListener('resize', () => {
            this.updateCardStates();
        });
    }

    createDots() {
        if (!this.dotsContainer) return;

        this.dotsContainer.innerHTML = '';
        this.cards.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'dot';
            dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
    }

    setupEventListeners() {
        // Card click handlers
        this.cards.forEach((card, index) => {
            card.addEventListener('click', () => this.goToSlide(index));
        });

        // Pause on hover
        this.root.addEventListener('mouseenter', () => this.pauseAutoSlide());
        this.root.addEventListener('mouseleave', () => this.resumeAutoSlide());

        // Keyboard navigation
        this.root.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.previousSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.nextSlide();
            }
        });
    }

    updateCardStates() {
        // Remove all size classes
        this.cards.forEach(card => {
            card.classList.remove('testimonial-wide', 'testimonial-medium', 'testimonial-small');
        });

        const totalCards = this.cards.length;
        const isMobile = window.innerWidth < 768;

        if (isMobile) {
            // On mobile, all cards are the same size, just position them
            this.updateTrackPosition();
            this.updateDots();
            return;
        }

        // Apply dynamic sizing based on position relative to current index (desktop only)
        this.cards.forEach((card, index) => {
            const distance = Math.abs(index - this.currentIndex);

            if (distance === 0) {
                // Current/active card - widest
                card.classList.add('testimonial-wide');
            } else if (distance === 1) {
                // Next card - medium width
                card.classList.add('testimonial-medium');
            } else {
                // Other cards - small width
                card.classList.add('testimonial-small');
            }
        });

        // Update track position to center the wide card
        this.updateTrackPosition();
        this.updateDots();
    }

    updateTrackPosition() {
        const containerRect = this.root.getBoundingClientRect();
        const isMobile = window.innerWidth < 768;

        if (isMobile) {
            // Mobile: Standard carousel behavior - show one card at a time
            const translate = -this.currentIndex * 100;
            this.track.style.transform = `translateX(${translate}vw)`;
            return;
        }

        // Desktop: Dynamic width centering behavior
        const wideCard = this.track.querySelector('.testimonial-wide');
        if (!wideCard) return;

        const trackRect = this.track.getBoundingClientRect();
        const cardRect = wideCard.getBoundingClientRect();
        const cardIndex = parseInt(wideCard.dataset.index);

        let translate = 0;

        if (cardIndex === 0) {
            // First card should start flush with left edge
            translate = 0;
        } else {
            // Other cards are centered
            const cardCenter = cardRect.left - trackRect.left + (cardRect.width / 2);
            const containerCenter = containerRect.width / 2;
            translate = containerCenter - cardCenter;
        }

        // Apply transform with smooth transition
        this.track.style.transform = `translateX(${translate}px)`;
    }

    updateDots() {
        if (!this.dotsContainer) return;

        const dots = this.dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    goToSlide(index) {
        if (this.isAnimating || index === this.currentIndex) return;

        this.isAnimating = true;
        this.currentIndex = Math.max(0, Math.min(index, this.cards.length - 1));

        this.updateCardStates();

        // Reset animation flag after transition
        setTimeout(() => {
            this.isAnimating = false;
        }, 600);
    }

    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.cards.length;
        this.goToSlide(nextIndex);
    }

    previousSlide() {
        const prevIndex = this.currentIndex === 0 ? this.cards.length - 1 : this.currentIndex - 1;
        this.goToSlide(prevIndex);
    }

    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
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
}

// Initialize testimonials slider when DOM is ready
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

