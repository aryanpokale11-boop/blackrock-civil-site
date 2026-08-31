/* =========================================================
   BR CIVIL LLC — INTERACTIVE DYNAMICS & ENHANCED ANIMATIONS
   ========================================================= */

   (() => {
    'use strict';
  
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
    /* =========================================================
       0. PAGE LOAD PROGRESS BAR
       ========================================================= */
    const loader = document.getElementById('pageLoader');
    if (loader) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          loader.style.opacity = '0';
          loader.style.transition = 'opacity 0.4s ease';
          setTimeout(() => loader.remove(), 400);
        }, 100);
      });
    }
  
    /* =========================================================
       0B. SCROLL PROGRESS BAR
       ========================================================= */
    const progressBar = document.getElementById('scrollProgressBar');
    if (progressBar && !reduceMotion) {
      window.addEventListener('scroll', () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
        progressBar.style.width = `${progress}%`;
      }, { passive: true });
    }
  
    /* =========================================================
       2. HERO SECTION STAGGER ENTRANCE ANIMATION
       ========================================================= */
    document.addEventListener('DOMContentLoaded', () => {
      const heroSection = document.getElementById('heroSection');
      const heroVideo = document.querySelector('.hero-video');
  
      // Video autoplay
      if (heroVideo) {
        heroVideo.muted = true;
        heroVideo.defaultMuted = true;
  
        const playPromise = heroVideo.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            const enablePlay = () => heroVideo.play();
            document.body.addEventListener('touchstart', enablePlay, { once: true });
            document.body.addEventListener('click', enablePlay, { once: true });
          });
        }
      }
  
      // Stagger hero content
      if (heroSection && !reduceMotion) {
        heroSection.classList.add('hero-started');
        const heroAnimEls = heroSection.querySelectorAll('.hero-animate');
        heroAnimEls.forEach((el, i) => {
          setTimeout(() => {
            el.classList.add('hero-in');
          }, 80 + i * 150);
        });
      } else if (heroSection) {
        const heroAnimEls = heroSection.querySelectorAll('.hero-animate');
        heroAnimEls.forEach(el => {
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
      }
    });
  
    /* =========================================================
       3. CAPABILITIES MEGA MENU PREVIEW DATA & HOVER
       ========================================================= */
    const megaData = {
      'commercial': {
        title: 'Special Inspections',
        sub: 'NYC DOB Certified',
        desc: 'Certified inspection protocols meeting NYC Department of Buildings safety, structural, and civil criteria.',
        img: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=85&w=800&auto=format&fit=crop'
      },
      'residential': {
        title: 'REI Engineering',
        sub: 'Resident Engineering',
        desc: 'Dedicated on-site technical supervision, quality control, and schedule alignment across active civil job sites.',
        img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=800&auto=format&fit=crop'
      },
      'renovation': {
        title: 'Cost Estimation',
        sub: 'Material Take-Offs',
        desc: 'Detailed material take-offs, budget auditing, and trade cost estimations for infrastructure and commercial developments.',
        img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=85&w=800&auto=format&fit=crop'
      },
      'precon': {
        title: 'Plumbing Engineering',
        sub: 'Civil Systems',
        desc: 'Civil plumbing schematics, municipal hookups, and installation supervision adhering to local plumbing codes.',
        img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=85&w=800&auto=format&fit=crop'
      },
      'management': {
        title: 'Construction Management',
        sub: 'Field Delivery',
        desc: 'Direct site supervision, subcontractor coordination, and project execution from ground-breaking to handover.',
        img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=85&w=800&auto=format&fit=crop'
      }
    };
  
    const catItems = document.querySelectorAll('.mega-cat-item');
    const previewImg = document.getElementById('megaPreviewImg');
    const previewTitle = document.getElementById('megaPreviewTitle');
    const previewSub = document.getElementById('megaPreviewSub');
    const previewDesc = document.getElementById('megaPreviewDesc');
  
    catItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        catItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
  
        const catKey = item.getAttribute('data-cat');
        const data = megaData[catKey];
  
        if (data && previewImg) {
          previewImg.style.opacity = '0.5';
          setTimeout(() => {
            previewImg.src = data.img;
            if (previewTitle) previewTitle.textContent = data.title;
            if (previewSub) previewSub.textContent = data.sub;
            if (previewDesc) previewDesc.textContent = data.desc;
            previewImg.style.opacity = '1';
            previewImg.style.transition = 'opacity 0.3s ease';
          }, 150);
        }
      });
    });
  
    /* =========================================================
       4. FIXED HEADER SCROLL STATE
       ========================================================= */
    const header = document.getElementById('siteHeader');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    }, { passive: true });
  
    /* =========================================================
       5. SCROLL REVEAL OBSERVER — WITH STAGGER SUPPORT
       ========================================================= */
    const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
    if ('IntersectionObserver' in window && !reduceMotion) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });
  
      revealEls.forEach(el => observer.observe(el));
    } else {
      revealEls.forEach(el => el.classList.add('in'));
    }
  
    /* =========================================================
       6. STAT NUMERICAL COUNTERS
       ========================================================= */
    const counters = document.querySelectorAll('.stat .num[data-target]');
    if (counters.length && 'IntersectionObserver' in window && !reduceMotion) {
      const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
  
          const el = entry.target;
          const target = Number(el.dataset.target);
          const suffix = el.dataset.suffix || '';
          const duration = 1400;
          const start = performance.now();
  
          const animate = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const value = target * ease;
            el.textContent = (Number.isInteger(target) ? Math.round(value) : value.toFixed(1)) + suffix;
  
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              // Gold shimmer flash on completion
              el.style.textShadow = '0 0 30px rgba(212, 175, 55, 0.8)';
              setTimeout(() => {
                el.style.textShadow = '0 0 20px rgba(212, 175, 55, 0.3)';
                el.style.transition = 'text-shadow 0.8s ease';
              }, 100);
            }
          };
  
          requestAnimationFrame(animate);
          observer.unobserve(el);
        });
      }, { threshold: 0.5 });
  
      counters.forEach(c => counterObserver.observe(c));
    }
  
    /* =========================================================
       7. MOBILE MENU TOGGLE & BODY LOCK — HAMBURGER ANIMATION
       ========================================================= */
    const mobileToggle = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');
  
    const closeMenu = () => {
      if (mainNav) {
        mainNav.classList.remove('open');
        document.body.classList.remove('menu-open');
        mobileToggle?.classList.remove('is-active');
        mobileToggle?.setAttribute('aria-expanded', 'false');
      }
    };
  
    const toggleMenu = (e) => {
      e.stopPropagation();
      if (mainNav) {
        const isOpen = mainNav.classList.toggle('open');
        document.body.classList.toggle('menu-open', isOpen);
        mobileToggle?.classList.toggle('is-active', isOpen);
        mobileToggle?.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      }
    };
  
    mobileToggle?.addEventListener('click', toggleMenu);
  
    // Auto-close menu when tapping links
    const navLinks = mainNav?.querySelectorAll('a');
    navLinks?.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  
    // Close menu when tapping outside of header
    document.addEventListener('click', (e) => {
      if (mainNav && mobileToggle && !mainNav.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMenu();
      }
    });
  
    // Close menu on ESC key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav?.classList.contains('open')) {
        closeMenu();
      }
    });
  
    /* =========================================================
       8. PROJECT TYPES ACCORDION
       ========================================================= */
    const accordionCards = document.querySelectorAll('#projectTypesAccordion .type-card');
  
    accordionCards.forEach((card) => {
      const activateCard = () => {
        accordionCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      };
  
      card.addEventListener('mouseenter', activateCard);
      card.addEventListener('click', activateCard);
  
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activateCard();
        }
      });
    });
  
    /* =========================================================
       9. WHY SECTION AUTO-CAROUSEL WITH DOT INDICATORS
       ========================================================= */
    const whyGrid = document.getElementById('whyScrollGrid');
    const whyDotsContainer = document.getElementById('whyCarouselDots');
  
    if (whyGrid && whyDotsContainer && !reduceMotion) {
      const blocks = whyGrid.querySelectorAll('.why-block');
      const dots = whyDotsContainer.querySelectorAll('.why-dot');
      let currentIdx = 0;
      let autoPlayInterval;
  
      const scrollToIdx = (idx) => {
        currentIdx = idx;
        const block = blocks[idx];
        if (block) {
          whyGrid.scrollTo({ left: block.offsetLeft - 4, behavior: 'smooth' });
        }
        dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
      };
  
      dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
          clearInterval(autoPlayInterval);
          scrollToIdx(i);
          startAutoPlay();
        });
      });
  
      const startAutoPlay = () => {
        autoPlayInterval = setInterval(() => {
          const next = (currentIdx + 1) % blocks.length;
          scrollToIdx(next);
        }, 4000);
      };
  
      whyGrid.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
      whyGrid.addEventListener('mouseleave', startAutoPlay);
  
      // Track scroll position for dots
      whyGrid.addEventListener('scroll', () => {
        const blockWidth = blocks[0]?.offsetWidth + 32 || 412;
        const newIdx = Math.round(whyGrid.scrollLeft / blockWidth);
        if (newIdx !== currentIdx && newIdx >= 0 && newIdx < blocks.length) {
          currentIdx = newIdx;
          dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIdx));
        }
      }, { passive: true });
  
      // Set first dot active and start autoplay
      dots[0]?.classList.add('active');
      startAutoPlay();
    }
  
    /* =========================================================
       10. FAQ ACCORDION TOGGLE
       ========================================================= */
    const faqItems = document.querySelectorAll('.faq-item');
  
    faqItems.forEach(item => {
      const trigger = item.querySelector('.faq-trigger');
      if (!trigger) return;
  
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
  
        // Close all
        faqItems.forEach(f => f.classList.remove('open'));
  
        // Open this one if it wasn't open
        if (!isOpen) {
          item.classList.add('open');
        }
      });
  
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          trigger.click();
        }
      });
    });
  
    /* =========================================================
       11. PROJECT FILTER TABS (Projects Page)
       ========================================================= */
    const filterTabs = document.querySelectorAll('.filter-tab');
    const projectCards = document.querySelectorAll('.project-card[data-category]');
  
    if (filterTabs.length && projectCards.length) {
      filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          filterTabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
  
          const cat = tab.getAttribute('data-filter');
          projectCards.forEach(card => {
            const cardCat = card.getAttribute('data-category');
            if (cat === 'all' || cardCat === cat) {
              card.style.opacity = '0';
              card.style.transform = 'scale(0.95)';
              card.style.display = '';
              setTimeout(() => {
                card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
              }, 50);
            } else {
              card.style.opacity = '0';
              card.style.transform = 'scale(0.95)';
              setTimeout(() => { card.style.display = 'none'; }, 400);
            }
          });
        });
      });
    }
  
    /* =========================================================
       12. FLOATING LABEL FORM INTERACTIONS
       ========================================================= */
    const formFields = document.querySelectorAll('.form-field input, .form-field textarea');
    formFields.forEach(field => {
      // Trigger floating if pre-filled
      if (field.value) {
        field.classList.add('has-value');
      }
      field.addEventListener('input', () => {
        field.classList.toggle('has-value', field.value.length > 0);
      });
    });
  
    /* =========================================================
       13. CONTACT FORM — SUBMIT FEEDBACK
       ========================================================= */
    const contactForm = document.getElementById('contactForm');
    const successMsg = document.getElementById('formSuccessMessage');
    if (contactForm && successMsg) {
      contactForm.addEventListener('submit', (e) => {
        const submitBtn = contactForm.querySelector('[type="submit"]');
        if (submitBtn) {
          submitBtn.textContent = 'Sending...';
          submitBtn.disabled = true;
        }
      });
    }
  
    /* =========================================================
       14. SERVICE ROWS — ANIMATED HOVER EFFECT
       ========================================================= */
    const serviceRows = document.querySelectorAll('.service-row');
    serviceRows.forEach(row => {
      row.addEventListener('mouseenter', () => {
        row.style.paddingLeft = '12px';
        row.style.transition = 'padding-left 0.3s ease';
      });
      row.addEventListener('mouseleave', () => {
        row.style.paddingLeft = '';
      });
    });
  
  })();
  
  /* =========================================================
     BEFORE / AFTER SLIDER INTERACTION
     ========================================================= */
  (() => {
    const slider = document.querySelector('.ba-slider');
    const beforeWrap = document.getElementById('baBeforeWrap');
    const beforeImg = document.querySelector('.ba-before');
    const handle = document.getElementById('baHandle');
  
    if (!slider || !beforeWrap || !handle) return;
  
    function syncImgWidth() {
      if (beforeImg) {
        beforeImg.style.width = `${slider.offsetWidth}px`;
      }
    }
  
    window.addEventListener('resize', syncImgWidth);
    syncImgWidth();
  
    let isDragging = false;
  
    const move = (clientX) => {
      const rect = slider.getBoundingClientRect();
      let x = clientX - rect.left;
      if (x < 0) x = 0;
      if (x > rect.width) x = rect.width;
  
      const percentage = (x / rect.width) * 100;
      beforeWrap.style.width = `${percentage}%`;
      handle.style.left = `${percentage}%`;
    };
  
    slider.addEventListener('mousedown', () => isDragging = true);
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('mousemove', (e) => {
      if (isDragging) move(e.clientX);
    });
  
    // Touch Support for Mobile
    slider.addEventListener('touchstart', () => isDragging = true, { passive: true });
    window.addEventListener('touchend', () => isDragging = false);
    window.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches[0]) move(e.touches[0].clientX);
    }, { passive: true });
  })();