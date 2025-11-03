// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileSectionMenu = document.querySelector('.mobile-section-menu');
    const mobileDropdownMenu = document.querySelector('.mobile-dropdown-menu');
    const mobileSectionMenuContainer = document.querySelector('.mobile-section-menu-container');
    const sidebarNavItems = document.querySelectorAll('.sidebar .nav-item');
    const mobileDropdownItems = document.querySelectorAll('.mobile-dropdown-menu .dropdown-item');
    
        // Desktop sidebar navigation
        sidebarNavItems.forEach(item => {
            item.addEventListener('click', function() {
                console.log('Sidebar item clicked:', this);
                console.log('Item text:', this.querySelector('span').textContent);
                
                // Remove active class from all items
                sidebarNavItems.forEach(navItem => navItem.classList.remove('active'));
                mobileDropdownItems.forEach(dropdownItem => dropdownItem.classList.remove('active'));
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Find corresponding mobile dropdown item and activate it
                const section = this.getAttribute('data-section');
                console.log('Section attribute:', section);
                const correspondingMobileItem = document.querySelector(`.mobile-dropdown-menu .dropdown-item[data-section="${section}"]`);
                if (correspondingMobileItem) {
                    correspondingMobileItem.classList.add('active');
                }
                
                // Update mobile menu text
                const menuText = document.querySelector('.mobile-section-menu .menu-text');
                if (menuText) {
                    menuText.textContent = this.querySelector('span').textContent;
                }
                
                // Show/hide content based on section
                showContentSection(section);
                
                console.log('Desktop navigation clicked:', section);
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
                
                // Update mobile menu text
                const menuText = document.querySelector('.mobile-section-menu .menu-text');
                if (menuText) {
                    menuText.textContent = this.textContent;
                }
                
                // Show/hide content based on section
                showContentSection(section);
                
                // Close dropdown
                if (mobileDropdownMenu) {
                    mobileDropdownMenu.classList.remove('active');
                }
                if (mobileSectionMenu) {
                    mobileSectionMenu.classList.remove('active');
                }
                
                console.log('Mobile navigation clicked:', section);
            });
        });
    
    // Mobile section menu toggle
    if (mobileSectionMenu) {
        mobileSectionMenu.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            const container = this.closest('.mobile-section-menu-container');
            const dropdown = container ? container.querySelector('.mobile-dropdown-menu') : null;
            if (dropdown) {
                dropdown.classList.toggle('active');
            }
            const nowOpen = container ? !container.classList.contains('open') : false;
            this.classList.toggle('active', nowOpen);
            this.setAttribute('aria-expanded', String(nowOpen));
            if (container) {
                container.classList.toggle('open', nowOpen);
            }
            console.log('Mobile section menu toggled');
        });
    }
    
    // Mobile hamburger menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            console.log('Mobile hamburger menu clicked');
            // Add mobile menu toggle functionality here if needed
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        console.log('Click event detected');
        const containers = document.querySelectorAll('.mobile-section-menu-container');
        containers.forEach((container) => {
            if (!container.contains(event.target)) {
                const dropdown = container.querySelector('.mobile-dropdown-menu');
                const button = container.querySelector('.mobile-section-menu');
                if (dropdown) dropdown.classList.remove('active');
                if (button) button.classList.remove('active');
                container.classList.remove('open');
            }
        });
    });
    
    // Trade Groups card click handlers
    const tgDetailCards = document.querySelectorAll('.tg-card[data-tg-detail]');
    tgDetailCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const detailType = this.getAttribute('data-tg-detail');
            if (detailType === 'afcfta') {
                // Hide all content containers
                const allContentContainers = document.querySelectorAll('.content-container');
                allContentContainers.forEach(container => {
                    container.style.setProperty('display', 'none', 'important');
                });
                // Show AfCFTA detail content
                const afcftaDetailContent = document.querySelector('#afcfta-detail-content');
                if (afcftaDetailContent) {
                    afcftaDetailContent.style.setProperty('display', 'block', 'important');
                }
            }
        });
    });

    // Breadcrumb click handler
    const breadcrumbLink = document.querySelector('.breadcrumb-link[data-section]');
    if (breadcrumbLink) {
        breadcrumbLink.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showContentSection(section);
        });
    }

    // Initialize content display on page load
    console.log('Page loaded, initializing content...');
    const wccimaContent = document.querySelector('#wccima-content');
    const youthContent = document.querySelector('#youth-content');
    console.log('WCCIMA content found:', wccimaContent);
    console.log('Youth content found:', youthContent);
    showContentSection('wccima');
});

// Function to show/hide content sections
function showContentSection(section) {
    console.log('showContentSection called with:', section);
    
    // Hide all content containers
    const allContentContainers = document.querySelectorAll('.content-container');
    console.log('Found content containers:', allContentContainers.length);
    allContentContainers.forEach(container => {
        console.log('Hiding container:', container.id);
        container.style.setProperty('display', 'none', 'important');
        container.style.visibility = '';
        container.style.height = '';
        container.style.overflow = '';
    });
    
    // Show the appropriate content based on section
    switch(section) {
        case 'wccima':
            const wccimaContent = document.querySelector('#wccima-content');
            console.log('WCCIMA content found:', wccimaContent);
            if (wccimaContent) {
                wccimaContent.style.setProperty('display', 'block', 'important');
                console.log('WCCIMA content displayed');
            }
            break;
        case 'youth':
            const youthContent = document.querySelector('#youth-content');
            console.log('Youth content found:', youthContent);
            if (youthContent) {
                youthContent.style.setProperty('display', 'block', 'important');
                youthContent.style.visibility = 'visible';
                youthContent.style.height = '';
                youthContent.style.overflow = '';
                console.log('Youth content displayed');
            }
            break;
        case 'trade-groups':
            const tradeGroupsContent = document.querySelector('#trade-groups-content');
            console.log('Trade groups content found:', tradeGroupsContent);
            if (tradeGroupsContent) {
                tradeGroupsContent.style.setProperty('display', 'block', 'important');
            }
            break;
        case 'committees':
            const committeesContent = document.querySelector('#committees-content');
            console.log('Committees content found:', committeesContent);
            if (committeesContent) {
                committeesContent.style.setProperty('display', 'block', 'important');
            }
            break;
        case 'ad-hoc':
            const adHocContent = document.querySelector('#ad-hoc-content');
            console.log('Ad Hoc content found:', adHocContent);
            if (adHocContent) {
                adHocContent.style.setProperty('display', 'block', 'important');
            }
            break;
        case 'how-to-join':
            const howToJoinContent = document.querySelector('#how-to-join-content');
            console.log('How to Join content found:', howToJoinContent);
            if (howToJoinContent) {
                howToJoinContent.style.setProperty('display', 'block', 'important');
            }
            break;
        default:
            // Default to WCCIMA content
            const defaultContent2 = document.querySelector('#wccima-content');
            if (defaultContent2) {
                defaultContent2.style.display = 'block';
            }
    }
}
