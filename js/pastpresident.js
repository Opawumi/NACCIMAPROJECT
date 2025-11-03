// Past Presidents Carousel
document.addEventListener('DOMContentLoaded', function() {
    const presidentsList = document.querySelector('.presidents-list');
    const prevBtn = document.querySelector('.carousel-nav-left');
    const nextBtn = document.querySelector('.carousel-nav-right');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const presidentCards = document.querySelectorAll('.president-card-item');

    if (!presidentsList) return;

    let currentIndex = 0;
    const cardWidth = 843; // Width of each card
    const gap = 112; // Gap between cards
    const cardWidthWithGap = cardWidth + gap;

    // Check if mobile (horizontal scroll) or desktop (carousel)
    function isMobile() {
        return window.innerWidth <= 992;
    }

    // Update carousel position (desktop only)
    function updateCarousel() {
        if (isMobile()) return;

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
        if (prevBtn) {
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        }
        if (nextBtn) {
            nextBtn.style.opacity = currentIndex === presidentCards.length - 1 ? '0.5' : '1';
        }
    }

    // Scroll to card on mobile
    function scrollToCard(index) {
        if (!isMobile()) return;

        const card = presidentCards[index];
        if (card) {
            const container = presidentsList.parentElement;
            const cardLeft = card.offsetLeft;
            const containerWidth = container.offsetWidth;
            const cardWidth = card.offsetWidth;
            const scrollLeft = cardLeft - (containerWidth - cardWidth) / 2;

            container.scrollTo({
                left: Math.max(0, scrollLeft),
                behavior: 'smooth'
            });
        }
    }

    // Next button (desktop only)
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (isMobile()) return;
            if (currentIndex < presidentCards.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        });
    }

    // Previous button (desktop only)
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (isMobile()) return;
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
    }

    // Timeline item clicks
    timelineItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentIndex = index;
            if (isMobile()) {
                scrollToCard(index);
            } else {
                updateCarousel();
            }
        });
    });

    // Handle scroll events on mobile to update timeline
    let scrollTimeout;
    presidentsList.addEventListener('scroll', function() {
        if (!isMobile()) return;

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const container = presidentsList.parentElement;
            const scrollLeft = container.scrollLeft;
            const containerCenter = scrollLeft + container.offsetWidth / 2;

            let closestIndex = 0;
            let closestDistance = Infinity;

            presidentCards.forEach((card, index) => {
                const cardCenter = card.offsetLeft + card.offsetWidth / 2;
                const distance = Math.abs(cardCenter - containerCenter);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });

            currentIndex = closestIndex;

            // Update timeline active state
            timelineItems.forEach((item, index) => {
                item.classList.remove('active');
                if (index === currentIndex) {
                    item.classList.add('active');
                }
            });
        }, 100);
    });

    // Initialize
    updateCarousel();

    // Handle window resize
    window.addEventListener('resize', function() {
        if (isMobile()) {
            // Reset transform on mobile
            presidentsList.style.transform = 'translateX(0)';
            // Scroll to current card
            setTimeout(() => scrollToCard(currentIndex), 100);
        } else {
            updateCarousel();
        }
    });
});