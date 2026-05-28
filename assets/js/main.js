/**
* Template Name: Clarity
* Template URL: https://bootstrapmade.com/clarity-bootstrap-agency-template/
* Updated: Sep 13 2025 with Bootstrap v5.3.8
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

/**
 * --------------------------------------------------------------
 * Fetch Dynamic CV Filename from JSON Config
 * --------------------------------------------------------------
 */
document.addEventListener('DOMContentLoaded', async () => {
  console.log("Script Loaded");

  try {
    const response = await fetch('./assets/json/config.json');

    console.log("Fetch Response:", response);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    console.log("JSON Data:", data);

    const cvLinks = document.querySelectorAll('.cv-download-link');

    console.log("Links Found:", cvLinks.length);

    cvLinks.forEach(link => {
      link.href = data.cvFileName;
      console.log("Updated Link:", link.href);
    });

  } catch (error) {
    console.error("ERROR:", error);
  }
});
	
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
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

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
   * Initiate Pure Counter
   */
  new PureCounter();

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

/**
   * --------------------------------------------------------------
   * Advanced Multi-Theme Selector Logic
   * --------------------------------------------------------------
   */
  const themeOptions = document.querySelectorAll('.theme-option');
  const themeIcon = document.querySelector('.theme-btn-icon i');
  
  // 1. Check local storage for saved theme
  const currentTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  
// 2. Update the main nav icon based on active theme
  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    
    // Reset icon classes
    themeIcon.className = ''; 
    
    if (theme === 'light') themeIcon.className = 'bi bi-brightness-high-fill text-warning';
    else if (theme === 'dracula') themeIcon.className = 'bi bi-droplet-fill';
    else if (theme === 'ubuntu') themeIcon.className = 'bi bi-ubuntu';
    else if (theme === 'matrix') themeIcon.className = 'bi bi-terminal-fill text-success';
    else if (theme === 'nord') themeIcon.className = 'bi bi-snow text-info';
    else if (theme === 'monokai') themeIcon.className = 'bi bi-code-square';
    else if (theme === 'solarized') themeIcon.className = 'bi bi-sun text-warning';
    else if (theme === 'gruvbox') themeIcon.className = 'bi bi-box-seam';
    else if (theme === 'cyberpunk') themeIcon.className = 'bi bi-lightning-charge-fill text-warning';
    else themeIcon.className = 'bi bi-moon-stars-fill text-primary'; // Default Corporate Dark
  }
  
  // Apply icon on load
  updateThemeIcon(currentTheme);
  
  // 3. Handle Dropdown Clicks
  themeOptions.forEach(option => {
    option.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetTheme = option.getAttribute('data-set-theme');
      
      // Apply theme to HTML and save to LocalStorage
      document.documentElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('portfolio-theme', targetTheme);
      
      // Update the visual icon
      updateThemeIcon(targetTheme);
    });
  });

})();