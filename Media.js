// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    if (window.__mediaInitDone) return;
    window.__mediaInitDone = true;

    const mobileSectionMenu = document.querySelector('.mobile-section-menu');
    const mobileDropdownMenu = document.querySelector('.mobile-dropdown-menu');
    const mobileSectionMenuContainer = document.querySelector('.mobile-section-menu-container');
    const sidebarNavItems = document.querySelectorAll('.sidebar .nav-item');
    const mobileDropdownItems = document.querySelectorAll('.mobile-dropdown-menu .dropdown-item');
    
    // Desktop sidebar navigation
    sidebarNavItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            sidebarNavItems.forEach(navItem => navItem.classList.remove('active'));
            mobileDropdownItems.forEach(dropdownItem => dropdownItem.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Find corresponding mobile dropdown item and activate it
            const section = this.getAttribute('data-section');
            const correspondingMobileItem = document.querySelector(`.mobile-dropdown-menu .dropdown-item[data-section="${section}"]`);
            if (correspondingMobileItem) {
                correspondingMobileItem.classList.add('active');
            }
            
            // Show/hide content based on section
            showContentSection(section);
        });
    });

    // Mobile dropdown navigation
    mobileDropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            sidebarNavItems.forEach(navItem => navItem.classList.remove('active'));
            mobileDropdownItems.forEach(dropdownItem => dropdownItem.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Find corresponding desktop sidebar item and activate it
            const section = this.getAttribute('data-section');
            const correspondingDesktopItem = document.querySelector(`.sidebar .nav-item[data-section="${section}"]`);
            if (correspondingDesktopItem) {
                correspondingDesktopItem.classList.add('active');
            }
            
            // Show/hide content based on section
            showContentSection(section);
            
            // Close dropdown
            if (mobileDropdownMenu) {
                mobileDropdownMenu.classList.remove('active');
                mobileDropdownMenu.style.setProperty('display', 'none', 'important');
            }
            if (mobileSectionMenu) {
                mobileSectionMenu.classList.remove('active');
            }
            if (mobileSectionMenuContainer) {
                mobileSectionMenuContainer.classList.remove('open');
            }
        });
    });

    // Mobile section menu toggle
    if (mobileSectionMenu) {
        mobileSectionMenu.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            const container = this.closest('.mobile-section-menu-container');
            const dropdown = container ? container.querySelector('.mobile-dropdown-menu') : null;
            const nowOpen = container ? !container.classList.contains('open') : false;
            
            if (dropdown) {
                dropdown.style.setProperty('display', nowOpen ? 'flex' : 'none', 'important');
            }
            
            this.classList.toggle('active', nowOpen);
            this.setAttribute('aria-expanded', String(nowOpen));
            if (container) {
                container.classList.toggle('open', nowOpen);
            }
        });
    }

    // Hide menu button handler
    const hideMenuButton = document.querySelector('.hide-menu-button');
    if (hideMenuButton) {
        hideMenuButton.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            const container = this.closest('.mobile-section-menu-container');
            const dropdown = container ? container.querySelector('.mobile-dropdown-menu') : null;
            const button = container ? container.querySelector('.mobile-section-menu') : null;
            const menuText = button ? button.querySelector('.menu-text') : null;
            
            // Close dropdown
            if (dropdown) {
                dropdown.style.setProperty('display', 'none', 'important');
                dropdown.classList.remove('active');
            }
            if (button) {
                button.classList.remove('active');
            }
            if (container) {
                container.classList.remove('open');
            }
            // Reset menu text to "Section Menu"
            if (menuText) {
                menuText.textContent = 'Section Menu';
            }
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        const containers = document.querySelectorAll('.mobile-section-menu-container');
        containers.forEach((container) => {
            if (!container.contains(event.target)) {
                const dropdown = container.querySelector('.mobile-dropdown-menu');
                const button = container.querySelector('.mobile-section-menu');
                const menuText = button ? button.querySelector('.menu-text') : null;
                if (dropdown) {
                    dropdown.style.setProperty('display', 'none', 'important');
                    dropdown.classList.remove('active');
                }
                if (button) button.classList.remove('active');
                container.classList.remove('open');
                // Reset menu text to "Section Menu"
                if (menuText) {
                    menuText.textContent = 'Section Menu';
                }
            }
        });
    });

    // Initialize content display on page load
    showContentSection('news');
});

// Function to show/hide content sections
function showContentSection(section) {
    // Hide all content containers
    const allContentContainers = document.querySelectorAll('.content-container');
    allContentContainers.forEach(container => {
        container.style.setProperty('display', 'none', 'important');
    });
    
    // Show the appropriate content based on section
    switch(section) {
        case 'news':
            const newsContent = document.querySelector('#news-content');
            if (newsContent) {
                newsContent.style.setProperty('display', 'block', 'important');
            }
            break;
        case 'press-release':
            const pressReleaseContent = document.querySelector('#press-release-content');
            if (pressReleaseContent) {
                pressReleaseContent.style.setProperty('display', 'block', 'important');
            }
            break;
        case 'publications':
            const publicationsContent = document.querySelector('#publications-content');
            if (publicationsContent) {
                publicationsContent.style.setProperty('display', 'block', 'important');
            }
            break;
        case 'trade-digest':
            const tradeDigestContent = document.querySelector('#trade-digest-content');
            if (tradeDigestContent) {
                tradeDigestContent.style.setProperty('display', 'block', 'important');
            }
            break;
        case 'events':
            const eventsContent = document.querySelector('#events-content');
            if (eventsContent) {
                eventsContent.style.setProperty('display', 'block', 'important');
            }
            break;
        case 'gallery':
            const galleryContent = document.querySelector('#gallery-content');
            if (galleryContent) {
                galleryContent.style.setProperty('display', 'block', 'important');
            }
            break;
        default:
            // Default to news content
            const defaultContent = document.querySelector('#news-content');
            if (defaultContent) {
                defaultContent.style.setProperty('display', 'block', 'important');
            }
    }
}

