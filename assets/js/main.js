/**
* Template Name: Selecao
* Template URL: https://bootstrapmade.com/selecao-bootstrap-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Smart Solutions Dropdown Fix
   */
  document.addEventListener('DOMContentLoaded', function() {
    const solutionsDropdown = document.querySelector('.navmenu .dropdown.solutions');
    if (!solutionsDropdown) return;
    
    const dropdownToggle = solutionsDropdown.querySelector('> a');
    const dropdownMenu = solutionsDropdown.querySelector('ul');
    const dropdownLinks = solutionsDropdown.querySelectorAll('ul li a');
    
    // Prevent toggle from navigating
    dropdownToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (window.innerWidth < 1200) {
        solutionsDropdown.classList.toggle('active');
      }
      return false;
    });
    
    // Desktop hover
    solutionsDropdown.addEventListener('mouseenter', function() {
      if (window.innerWidth >= 1200) this.classList.add('active');
    });
    
    solutionsDropdown.addEventListener('mouseleave', function() {
      if (window.innerWidth >= 1200) this.classList.remove('active');
    });
    
    // Stop menu clicks from bubbling
    if (dropdownMenu) {
      dropdownMenu.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    }
    
    // Dropdown link scrolling
    dropdownLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        
        const href = this.getAttribute('href');
        solutionsDropdown.classList.remove('active');
        
        // Close mobile menu
        const body = document.querySelector('body');
        const mobileToggle = document.querySelector('.mobile-nav-toggle');
        if (body.classList.contains('mobile-nav-active')) {
          body.classList.remove('mobile-nav-active');
          if (mobileToggle) {
            mobileToggle.classList.remove('bi-x');
            mobileToggle.classList.add('bi-list');
          }
        }
        
        // Scroll to section
        const targetSection = document.querySelector(href);
        if (targetSection) {
          const header = document.querySelector('#header');
          const headerHeight = header ? header.offsetHeight : 80;
          const targetPosition = targetSection.offsetTop - headerHeight - 20;
          
          setTimeout(() => {
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }, 100);
        }
      });
    });
    
    // Close on outside click
    document.addEventListener('click', function(e) {
      if (!solutionsDropdown.contains(e.target)) {
        solutionsDropdown.classList.remove('active');
      }
    });
    
    // Handle resize
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 1200) {
        solutionsDropdown.classList.remove('active');
      }
    });
  });

  /**
   * Future Section
   */
  window.showFutureDetail = function(category) {
    document.querySelectorAll('.future-detail-content').forEach(el => el.style.display = 'none');
    const defaultMsg = document.getElementById('future-default');
    if (defaultMsg) defaultMsg.style.display = 'none';
    
    const detailElement = document.getElementById(`future-${category}`);
    if (detailElement) {
      detailElement.style.display = 'block';
      const detailPanel = document.querySelector('.future-detail-panel');
      if (detailPanel) {
        const headerOffset = 80;
        const elementPosition = detailPanel.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
    
    document.querySelectorAll('.future-card').forEach(card => card.classList.remove('active'));
    if (event && event.target) {
      const clickedCard = event.target.closest('.future-card');
      if (clickedCard) clickedCard.classList.add('active');
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    const futureCards = document.querySelectorAll('.future-card');
    if (futureCards.length > 0) {
      futureCards[0].classList.add('active');
      showFutureDetail('mobility');
      
      futureCards.forEach(card => {
        card.addEventListener('click', function() {
          const onclickAttr = this.getAttribute('onclick');
          if (onclickAttr) {
            const match = onclickAttr.match(/'([^']+)'/);
            if (match) showFutureDetail(match[1]);
          }
        });
      });
    }
  });

  /**
   * Initialize Swiper (for testimonials carousel)
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );
      new Swiper(swiperElement, config);
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Animation on scroll function and init (AOS)
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Blog Page Navigation Fix
   */
  document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on blog.html or any page that's not index.html
    const currentPage = window.location.pathname;
    const isNotIndexPage = !currentPage.endsWith('index.html') && !currentPage.endsWith('/');
    
    document.querySelectorAll('#navmenu a[href^="#"]').forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // If we're not on index.html and link is a hash, redirect to index.html with hash
        if (href && href !== '#' && isNotIndexPage) {
          e.preventDefault();
          
          // Close mobile menu if open
          const body = document.querySelector('body');
          const mobileToggle = document.querySelector('.mobile-nav-toggle');
          if (body.classList.contains('mobile-nav-active')) {
            body.classList.remove('mobile-nav-active');
            if (mobileToggle) {
              mobileToggle.classList.remove('bi-x');
              mobileToggle.classList.add('bi-list');
            }
          }
          
          // Redirect to index.html with the hash
          window.location.href = 'index.html' + href;
        }
      });
    });
    
    // Make logo clickable to go back to index.html
    const logo = document.querySelector('.header .logo');
    if (logo) {
      logo.style.cursor = 'pointer';
      logo.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'index.html';
      });
    }
  });

})();

/**
 * Tab Navigation for Features Section - Alternative Approach
 */
document.addEventListener('DOMContentLoaded', function() {
  // Function to scroll to tab content
  function scrollToTabContent(tabId) {
    // First activate the tab
    activateTab(tabId);
    
    // Get the features section
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      const header = document.querySelector('#header');
      const headerHeight = header ? header.offsetHeight : 80;
      
      // Scroll to the features section + some offset to show the tab content
      const targetPosition = featuresSection.offsetTop + 200 - headerHeight;
      
      setTimeout(() => {
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
  }
  
  // Function to activate the tab
  function activateTab(tabId) {
    const tabLink = document.querySelector(`[data-bs-target="#${tabId}"]`);
    if (tabLink) {
      // Remove active class from all tabs
      document.querySelectorAll('.nav-tabs .nav-link').forEach(tab => {
        tab.classList.remove('active', 'show');
      });
      
      // Add active class to clicked tab
      tabLink.classList.add('active', 'show');
      
      // Hide all tab panes
      document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active', 'show');
      });
      
      // Show the target tab pane
      const tabPane = document.getElementById(tabId);
      if (tabPane) {
        tabPane.classList.add('active', 'show');
      }
    }
  }
  
  // Add click event listeners to the tab links
  const tabLinks = document.querySelectorAll('.features .nav-link');
  tabLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetTab = this.getAttribute('data-bs-target');
      if (targetTab) {
        const tabId = targetTab.replace('#', '');
        scrollToTabContent(tabId);
      }
    });
  });
});