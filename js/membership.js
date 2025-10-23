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