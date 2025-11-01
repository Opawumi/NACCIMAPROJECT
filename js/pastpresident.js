// Past Presidents Carousel
document.addEventListener('DOMContentLoaded', function() {
    const presidentsList = document.querySelector('.presidents-list');
    const prevBtn = document.querySelector('.carousel-nav-left');
    const nextBtn = document.querySelector('.carousel-nav-right');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const presidentCards = document.querySelectorAll('.president-card-item');
    
    if (!presidentsList || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    const cardWidth = 843; // Width of each card
    const gap = 112; // Gap between cards
    const cardWidthWithGap = cardWidth + gap;
    
    // Update carousel position
    function updateCarousel() {
        const translateX = -currentIndex * cardWidthWithGap;
        presidentsList.style.transform = `translateX(${translateX}px)`;
        
        // Update timeline active state
        timelineItems.forEach((item, index) => {
            item.classList.remove('active');
            if (index === currentIndex) {
                item.classList.add('active');
            }
        });
        
        // Update button states
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex === presidentCards.length - 1 ? '0.5' : '1';
    }
    
    // Next button
    nextBtn.addEventListener('click', function() {
        if (currentIndex < presidentCards.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    // Previous button
    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    // Timeline item clicks
    timelineItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Initialize
    updateCarousel();
    
    // Handle window resize - recalculate card width on mobile
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 992) {
            const card = presidentCards[0];
            if (card) {
                const newCardWidth = card.offsetWidth;
                const newGap = parseInt(window.getComputedStyle(presidentsList).gap);
                const newCardWidthWithGap = newCardWidth + newGap;
                presidentsList.style.transform = `translateX(${-currentIndex * newCardWidthWithGap}px)`;
            }
        } else {
            updateCarousel();
        }
    });
});