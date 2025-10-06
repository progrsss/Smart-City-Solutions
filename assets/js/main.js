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
   * Animation on scroll function and init
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
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

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

})();


// Fixed dropdown functionality - no delays
document.addEventListener('DOMContentLoaded', function() {
  // Handle dropdown hover on desktop
  function initDesktopDropdowns() {
    const dropdowns = document.querySelectorAll('.navmenu .dropdown');
    
    dropdowns.forEach(dropdown => {
      // Mouse enter - show dropdown immediately
      dropdown.addEventListener('mouseenter', function() {
        if (window.innerWidth >= 1200) {
          this.classList.add('active');
        }
      });
      
      // Mouse leave - hide dropdown immediately
      dropdown.addEventListener('mouseleave', function() {
        if (window.innerWidth >= 1200) {
          this.classList.remove('active');
        }
      });
    });
  }
  
  // Handle dropdown clicks on mobile
  function initMobileDropdowns() {
    const dropdownToggles = document.querySelectorAll('.navmenu .dropdown > a');
    
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        if (window.innerWidth < 1200) {
          e.preventDefault();
          const dropdown = this.parentElement;
          const isActive = dropdown.classList.contains('active');
          
          // Close all other dropdowns
          document.querySelectorAll('.navmenu .dropdown').forEach(d => {
            if (d !== dropdown) {
              d.classList.remove('active');
            }
          });
          
          // Toggle current dropdown
          dropdown.classList.toggle('active');
        }
      });
    });
  }
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.navmenu')) {
      document.querySelectorAll('.navmenu .dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  });
  
  // Initialize both desktop and mobile behaviors
  initDesktopDropdowns();
  initMobileDropdowns();
  
  // Re-initialize on window resize
  window.addEventListener('resize', function() {
    document.querySelectorAll('.navmenu .dropdown').forEach(dropdown => {
      dropdown.classList.remove('active');
    });
  });
});

// COMPLETE FIX - Add this to your main.js
// This replaces the Smart Solutions dropdown section

document.addEventListener('DOMContentLoaded', function() {
  
  // Get Smart Solutions dropdown
  const solutionsDropdown = document.querySelector('.navmenu .dropdown.solutions');
  
  if (!solutionsDropdown) return;
  
  const dropdownToggle = solutionsDropdown.querySelector('> a');
  const dropdownLinks = solutionsDropdown.querySelectorAll('ul li a');
  
  // Desktop hover behavior
  solutionsDropdown.addEventListener('mouseenter', function() {
    if (window.innerWidth >= 1200) {
      this.classList.add('active');
    }
  });
  
  solutionsDropdown.addEventListener('mouseleave', function() {
    if (window.innerWidth >= 1200) {
      this.classList.remove('active');
    }
  });
  
  // Mobile toggle
  dropdownToggle.addEventListener('click', function(e) {
    if (window.innerWidth < 1200) {
      e.preventDefault();
      solutionsDropdown.classList.toggle('active');
    } else {
      e.preventDefault(); // Prevent navigation on desktop too
    }
  });
  
  // Make ALL dropdown links clickable and scroll to sections
  dropdownLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const href = this.getAttribute('href');
      
      // Close dropdown
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
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      } else {
        console.warn('Section not found:', href);
      }
    });
  });
});
// diagram.js

const infoData = {
  traffic: {
    title: 'Traffic Sensors',
    content: `
      <ul>
        <li>Cameras and radar detect vehicle counts and speeds</li>
        <li>Magnetic sensors embedded in roads track flow</li>
        <li>Data collected every few seconds</li>
        <li>Identifies congestion patterns and incidents</li>
      </ul>
    `
  },
  environment: {
    title: 'Environmental Sensors',
    content: `
      <ul>
        <li>Air quality monitors measure pollutants (PM2.5, CO2, NOx)</li>
        <li>Weather stations track temperature, humidity, rainfall</li>
        <li>Noise level sensors monitor sound pollution</li>
        <li>Helps predict health impacts and guide policies</li>
      </ul>
    `
  },
  energy: {
    title: 'Smart Energy Meters',
    content: `
      <ul>
        <li>Real-time electricity consumption tracking</li>
        <li>Two-way communication with utility providers</li>
        <li>Identifies peak demand periods</li>
        <li>Enables dynamic pricing and load balancing</li>
      </ul>
    `
  },
  waste: {
    title: 'Waste Management Sensors',
    content: `
      <ul>
        <li>Ultrasonic sensors measure bin fill levels</li>
        <li>Optimizes collection routes and schedules</li>
        <li>Reduces fuel costs and emissions</li>
        <li>Prevents overflow and improves cleanliness</li>
      </ul>
    `
  },
  network: {
    title: '5G Communication Networks',
    content: `
      <ul>
        <li>Ultra-fast data transmission (up to 10 Gbps)</li>
        <li>Low latency for real-time applications</li>
        <li>Supports millions of connected devices</li>
        <li>Enables edge computing for faster processing</li>
      </ul>
    `
  },
  cloud: {
    title: 'Cloud Platform',
    content: `
      <ul>
        <li>Centralized data storage and management</li>
        <li>Scalable infrastructure for growing data needs</li>
        <li>Integration hub for multiple city systems</li>
        <li>Accessible from anywhere for authorized users</li>
      </ul>
    `
  },
  security: {
    title: 'Cybersecurity Layer',
    content: `
      <ul>
        <li>End-to-end encryption of data transmission</li>
        <li>Multi-factor authentication for access control</li>
        <li>Continuous threat monitoring and detection</li>
        <li>Protects against hacking and data breaches</li>
      </ul>
    `
  },
  ai: {
    title: 'AI Processing Engine',
    content: `
      <ul>
        <li>Machine learning models analyze patterns</li>
        <li>Deep learning for complex problem solving</li>
        <li>Automated decision-making for routine tasks</li>
        <li>Continuously learns and improves over time</li>
      </ul>
    `
  },
  analytics: {
    title: 'Data Analytics',
    content: `
      <ul>
        <li>Real-time dashboards for city operators</li>
        <li>Historical trend analysis</li>
        <li>Anomaly detection and alerting</li>
        <li>Performance metrics and KPI tracking</li>
      </ul>
    `
  },
  prediction: {
    title: 'Predictive Analytics',
    content: `
      <ul>
        <li>Forecasts traffic congestion before it occurs</li>
        <li>Predicts energy demand fluctuations</li>
        <li>Anticipates infrastructure maintenance needs</li>
        <li>Models scenarios for urban planning</li>
      </ul>
    `
  },
  transport: {
    title: 'Smart Transportation',
    content: `
      <ul>
        <li>Traffic lights adjust timing based on real-time flow</li>
        <li>Route guidance to avoid congestion</li>
        <li>Public transit optimization and tracking</li>
        <li>Smart parking availability information</li>
      </ul>
    `
  },
  grid: {
    title: 'Smart Energy Grid',
    content: `
      <ul>
        <li>Automatic load balancing across the network</li>
        <li>Integration of renewable energy sources</li>
        <li>Demand response to prevent blackouts</li>
        <li>Real-time fault detection and isolation</li>
      </ul>
    `
  },
  emergency: {
    title: 'Emergency Response',
    content: `
      <ul>
        <li>Optimized routing for ambulances and fire trucks</li>
        <li>Automated incident detection and alerts</li>
        <li>Coordination between multiple agencies</li>
        <li>Disaster prediction and early warning systems</li>
      </ul>
    `
  },
  citizen: {
    title: 'Citizen Engagement Apps',
    content: `
      <ul>
        <li>Report issues directly to city departments</li>
        <li>Real-time service status and notifications</li>
        <li>Access to city data and transparency portals</li>
        <li>Participation in civic decision-making</li>
      </ul>
    `
  }
};

// Get all component elements and info panel
const components = document.querySelectorAll('.component');
const infoPanel = document.getElementById('info-panel');

// Add click event listeners to all components
components.forEach(component => {
  component.addEventListener('click', function() {
    const infoKey = this.dataset.info;
    const info = infoData[infoKey];

    // Remove active class from all components
    components.forEach(c => c.classList.remove('active'));
    
    // Add active class to clicked component
    this.classList.add('active');

    // Display info in panel
    if (info) {
      infoPanel.innerHTML = `
        <h3>${info.title}</h3>
        ${info.content}
      `;
      infoPanel.classList.add('show');
    }
  });
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize benefits functionality when the tab is shown
  const benefitsTab = document.querySelector('a[data-bs-target="#features-tab-3"]');
  
  if (benefitsTab) {
    benefitsTab.addEventListener('shown.bs.tab', function() {
      initBenefits();
    });
  }
  
  // Also initialize if tab is already active on page load
  if (document.querySelector('#features-tab-3.active.show')) {
    initBenefits();
  }
});

function initBenefits() {
  // Card interaction - Click to activate/highlight cards
  const cards = document.querySelectorAll('#features-tab-3 .benefit-card');
  
  if (cards.length === 0) return; // Exit if cards not found
  
  cards.forEach(card => {
    // Remove any existing listeners to avoid duplicates
    const newCard = card.cloneNode(true);
    card.parentNode.replaceChild(newCard, card);
  });
  
  // Re-select cards after cloning
  const newCards = document.querySelectorAll('#features-tab-3 .benefit-card');
  
  newCards.forEach(card => {
    card.addEventListener('click', function() {
      // Remove active class from all cards
      newCards.forEach(c => c.classList.remove('active'));
      // Add active class to clicked card
      this.classList.add('active');
    });
  });
  
  // Animate impact bars
  animateImpactBars();
}

function animateImpactBars() {
  const impactSection = document.querySelector('#features-tab-3 .impact-section');
  
  if (!impactSection) return; // Exit if section not found
  
  const fills = document.querySelectorAll('#features-tab-3 .impact-fill');
  
  if (fills.length === 0) return; // Exit if bars not found
  
  // Reset bars first
  fills.forEach(fill => {
    fill.style.width = '0%';
    // Clear any existing text content
    fill.textContent = '';
  });
  
  // Animate bars after a short delay
  setTimeout(() => {
    fills.forEach(fill => {
      const target = fill.getAttribute('data-target');
      if (target) {
        fill.style.width = target + '%';
      }
    });
  }, 300);
}

// Optional: Animate bars on scroll (if you want animation when scrolling into view)
window.addEventListener('scroll', function() {
  const impactSection = document.querySelector('#features-tab-3 .impact-section');
  
  if (!impactSection) return;
  
  const rect = impactSection.getBoundingClientRect();
  const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
  
  if (isVisible) {
    const fills = document.querySelectorAll('#features-tab-3 .impact-fill');
    const firstFill = fills[0];
    
    // Only animate if bars are at 0% (not already animated)
    if (firstFill && firstFill.style.width === '0%') {
      animateImpactBars();
    }
  }
});


// Future Section Interactive Functionality
function showFutureDetail(category) {
  // Hide all detail sections
  document.querySelectorAll('.future-detail-content').forEach(el => {
    el.style.display = 'none';
  });
  document.getElementById('future-default').style.display = 'none';
  
  // Show selected detail section
  const detailElement = document.getElementById(`future-${category}`);
  if (detailElement) {
    detailElement.style.display = 'block';
  }
  
  // Remove active class from all cards
  document.querySelectorAll('.future-card').forEach(card => {
    card.classList.remove('active');
  });
  
  // Add active class to clicked card
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  }
}

// Initialize first card as active on page load
document.addEventListener('DOMContentLoaded', function() {
  const futureCards = document.querySelectorAll('.future-card');
  if (futureCards.length > 0) {
    futureCards[0].classList.add('active');
    showFutureDetail('mobility');
    
    // Add click event listeners to all cards
    futureCards.forEach(card => {
      card.addEventListener('click', function() {
        const category = this.getAttribute('onclick').match(/'([^']+)'/)[1];
        showFutureDetail(category);
      });
    });
  }
});

// Add smooth scroll behavior for future section links
document.querySelectorAll('a[href="#future"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#future').scrollIntoView({
      behavior: 'smooth'
    });
  })
});

// Add this to your blog.html page (at the bottom before </body>)
// OR create a separate blog.js file and link it

document.addEventListener('DOMContentLoaded', function() {
  
  // Fix navigation links on blog page
  const navLinks = document.querySelectorAll('#navmenu a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // If clicking a section link (starts with #), go to index.html
      if (href && href !== '#') {
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
        
        // Navigate to index.html with the hash
        window.location.href = 'index.html' + href;
      }
    });
  });
  
  // Fix Smart Solutions dropdown on blog page
  const dropdownLinks = document.querySelectorAll('.navmenu .dropdown.solutions ul a');
  
  dropdownLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const href = this.getAttribute('href');
      
      // Close dropdown
      const dropdown = document.querySelector('.navmenu .dropdown.solutions');
      if (dropdown) dropdown.classList.remove('active');
      
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
      
      // Navigate to index.html with section hash
      window.location.href = 'index.html' + href;
    });
  });
  
  // Make logo link to index.html
  const logo = document.querySelector('.header .logo');
  if (logo) {
    logo.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = 'index.html';
    });
  }
});

// Add this to your existing main.js file

/**
 * Smooth scroll for feature tabs
 */
document.addEventListener('DOMContentLoaded', function() {
  const featureTabs = document.querySelectorAll('.nav-tabs .nav-link');
  
  featureTabs.forEach(tab => {
    tab.addEventListener('shown.bs.tab', function(event) {
      // Get the target tab pane
      const targetId = event.target.getAttribute('data-bs-target');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Calculate offset (adjust this value based on your header height)
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        // Smooth scroll to the tab content
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Also handle initial click to ensure smooth scrolling
  featureTabs.forEach(tab => {
    tab.addEventListener('click', function(event) {
      // Let Bootstrap handle the tab switching first
      setTimeout(() => {
        const targetId = event.target.getAttribute('data-bs-target');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100); // Small delay to allow tab content to render
    });
  });
});

/**
 * Smooth scroll for Future section cards
 */
function showFutureDetail(category) {
  // Hide all detail contents
  const allDetails = document.querySelectorAll('.future-detail-content');
  allDetails.forEach(detail => detail.style.display = 'none');
  
  // Hide default message
  const defaultMsg = document.getElementById('future-default');
  if (defaultMsg) defaultMsg.style.display = 'none';
  
  // Show selected detail
  const selectedDetail = document.getElementById('future-' + category);
  if (selectedDetail) {
    selectedDetail.style.display = 'block';
    
    // Scroll to the detail panel smoothly
    const detailPanel = document.querySelector('.future-detail-panel');
    if (detailPanel) {
      const headerOffset = 80;
      const elementPosition = detailPanel.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
  
  // Add active class to clicked card
  const allCards = document.querySelectorAll('.future-card');
  allCards.forEach(card => card.classList.remove('active'));
  event.target.closest('.future-card').classList.add('active');
}

/**
 * Animate impact bars when they come into view
 */
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px'
};

const impactObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.impact-fill');
      fills.forEach(fill => {
        const target = fill.getAttribute('data-target');
        setTimeout(() => {
          fill.style.width = target + '%';
        }, 100);
      });
      impactObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe impact section when page loads
document.addEventListener('DOMContentLoaded', function() {
  const impactSection = document.querySelector('.impact-section');
  if (impactSection) {
    impactObserver.observe(impactSection);
  }
});
