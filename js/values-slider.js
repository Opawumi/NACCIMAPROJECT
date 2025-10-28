class ValuesSlider {
    constructor() {
        this.slider = document.querySelector('.values-slider');
        
        // Only proceed if slider exists on the page
        if (!this.slider) {
            console.log('Values slider not found on this page');
            return;
        }
        
        this.slides = document.querySelectorAll('.value-card');
        this.prevBtn = document.querySelector('.slider-prev');
        this.nextBtn = document.querySelector('.slider-next');
        this.dotsContainer = document.querySelector('.slider-dots');
        this.currentSlide = 0;
        this.slideCount = this.slides.length;
        this.isMobile = window.innerWidth < 768;

        // Only initialize if we have slides
        if (this.slideCount > 0) {
            this.init();
        } else {
            console.log('No value cards found for the slider');
        }
    }

    init() {
        // Only initialize slider on mobile
        if (this.isMobile) {
            if (this.dotsContainer) {
                this.createDots();
            }
            this.setupEventListeners();
            this.updateSlider();
        } else if (this.slider) {
            // On desktop, make sure all slides are visible
            this.slider.style.transform = 'translateX(0)';
        }
    }

    createDots() {
        this.dotsContainer.innerHTML = '';
        this.slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        });
    }

    setupEventListeners() {
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevSlide());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Handle window resize
        window.addEventListener('resize', () => {
            const newIsMobile = window.innerWidth < 768;
            if (newIsMobile !== this.isMobile) {
                this.isMobile = newIsMobile;
                this.init();
            }
        });
    }

    goToSlide(index) {
        this.currentSlide = index;
        if (this.currentSlide >= this.slideCount) this.currentSlide = 0;
        if (this.currentSlide < 0) this.currentSlide = this.slideCount - 1;
        this.updateSlider();
    }

    nextSlide() {
        this.goToSlide(this.currentSlide + 1);
    }

    prevSlide() {
        this.goToSlide(this.currentSlide - 1);
    }

    updateSlider() {
        if (!this.slider) return;
        
        if (this.isMobile) {
            // On mobile, slide horizontally
            const slideWidth = 100 / this.slideCount;
            const offset = -this.currentSlide * 100;
            this.slider.style.transform = `translateX(${offset}%)`;
            
            // Update dots if they exist
            const dots = document.querySelectorAll('.slider-dot');
            if (dots.length > 0) {
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === this.currentSlide);
                });
            }
        } else {
            // On desktop, make sure all slides are visible in a grid
            this.slider.style.transform = 'translateX(0)';
        }
    }
}

// Initialize the slider when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ValuesSlider();
});
