const links = document.querySelectorAll('.aboutPageLinks');
const aboutUsItem = document.querySelectorAll('.aboutUsItem');
const card = document.querySelectorAll('.membershipCard');
const leadership = document.getElementById('aboutUsLeadershipContent');
const history = document.getElementById('aboutUsHistoryContent');
const visionAndMission = document.getElementById('aboutUsVisionAndMission');
const aboutLocation = document.getElementById('aboutUsLocation');
const coreValues = document.getElementById('aboutUsCoreValues');
const ranking = document.getElementById('aboutUsRanking');
const report = document.getElementById('aboutUsReport');
const awards = document.getElementById('aboutUsAwards');
const firstMembershipCard = document.getElementById('membershipOverviewCards');
const secondMembershipCard = document.getElementById('membershipBenefitCards');
const thirdMembershipCard = document.getElementById('membershipPresidentCards');

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
            firstMembershipCard.classList.add('membershipCardActive');
            secondMembershipCard.classList.add('membershipCardActive');
            event.target.classList.toggle('about-active-page-link')
        }
        else if (event.target.classList.contains('history')){
            history.classList.add('aboutUsContentActive');
            firstMembershipCard.classList.add('membershipCardActive');
            event.target.classList.toggle('about-active-page-link')
        }
        else if (event.target.classList.contains('visionAndMission')){
            visionAndMission.classList.add('aboutUsContentActive');
            thirdMembershipCard.classList.add('membershipCardActive'); // Only show past presidents on Board of Directors
            event.target.classList.toggle('about-active-page-link')
        }
        else if (event.target.classList.contains('location')){
            aboutLocation.classList.add('aboutUsContentActive');
            event.target.classList.toggle('about-active-page-link')
        }
        else if (event.target.classList.contains('coreValues')){
            coreValues.classList.add('aboutUsContentActive');
            firstMembershipCard.classList.toggle('membershipCardActive');
            event.target.classList.toggle('about-active-page-link')
        }
        else if (event.target.classList.contains('ranking')){
            ranking.classList.add('aboutUsContentActive');
            event.target.classList.toggle('about-active-page-link')
        }
        else if (event.target.classList.contains('report')){
            report.classList.add('aboutUsContentActive');
            event.target.classList.toggle('about-active-page-link')
        }
        else if (event.target.classList.contains('awards')){
            awards.classList.add('aboutUsContentActive');
            event.target.classList.toggle('about-active-page-link')
        }
        // console.log(event.target.classList);

        // Collapse the mobile accordion after clicking a link (like membership page)
        const mobileAccordion = document.getElementById('flush-collapseOne');
        if (mobileAccordion && window.innerWidth < 768) {
            const bsCollapse = new bootstrap.Collapse(mobileAccordion, {
                hide: true
            });
            bsCollapse.hide();

            // Update the header text back to "Section Menu"
            const accordionHeader = document.querySelector('.accordionItemContent');
            if (accordionHeader) {
                accordionHeader.textContent = 'Section Menu';
            }
        }
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

        // Sync custom indicators with carousel
        document.addEventListener('DOMContentLoaded', function() {
            const carousel = document.getElementById('testimonialCarousel');
            const indicators = document.querySelectorAll('.custom-indicators li');
            
            // Bootstrap carousel instance
            const bsCarousel = new bootstrap.Carousel(carousel, {
                interval: 5000,
                wrap: true
            });
            
            // Update indicators when carousel slides
            carousel.addEventListener('slide.bs.carousel', function(e) {
                indicators.forEach((indicator, index) => {
                    if (index === e.to) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });
            });
            
            // Click handlers for custom indicators
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', function() {
                    bsCarousel.to(index);
                });
            });
        });

        // Handle author section collapse on hover
const testimonialCols = document.querySelectorAll('.testimonial-col');

testimonialCols.forEach(col => {
    const authorSection = col.querySelector('.author-section');
    
    col.addEventListener('mouseenter', function() {
        authorSection.classList.add('show');  // Bootstrap's show class
    });
    
    col.addEventListener('mouseleave', function() {
        authorSection.classList.remove('show');  // Hides it again
    });
});


document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector("#testimonialCarousel");
  if (!carousel) return;

  const inner = carousel.querySelector(".carousel-inner");
  const indicators = carousel.querySelector(".custom-indicators");
  const items = Array.from(inner.querySelectorAll(".carousel-item"));

  // Only activate this transformation on mobile
  if (window.innerWidth <= 768) {
    // Gather all testimonial cards
    const allCols = [];
    items.forEach(item => {
      const cols = item.querySelectorAll(".testimonial-col");
      cols.forEach(col => allCols.push(col.cloneNode(true)));
    });

    // Clear existing slides & indicators
    inner.innerHTML = "";
    indicators.innerHTML = "";

    // Create one carousel item per card
    allCols.forEach((col, index) => {
      const item = document.createElement("div");
      item.classList.add("carousel-item");
      if (index === 0) item.classList.add("active");

      const row = document.createElement("div");
      row.classList.add("row", "g-4", "testimonial-row");
      row.appendChild(col);
      item.appendChild(row);
      inner.appendChild(item);

      // Create a matching indicator
      const li = document.createElement("li");
      li.setAttribute("data-bs-target", "#testimonialCarousel");
      li.setAttribute("data-bs-slide-to", index);
      if (index === 0) li.classList.add("active");

      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = "";
      li.appendChild(btn);
      indicators.appendChild(li);
    });
  }
});



// About Us Page JavaScript

// Smooth scroll to top on page load
window.onload = function() {
    window.scrollTo(0, 0);
};


// Update active link on scroll
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.about-content-section');
    const links = document.querySelectorAll('.about-page-links');
    
    // Function to update active link
    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('about-active-page-link');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('about-active-page-link');
            }
        });
    }

    // Update on scroll
    window.addEventListener('scroll', updateActiveLink);
    
    // Update on page load
    updateActiveLink();
});

// Handle link clicks for smooth scrolling
document.querySelectorAll('.about-page-links').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

