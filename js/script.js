/* =========================================================
   BR CIVIL LLC — INTERACTIVE DYNAMICS & MEGA MENU
   ========================================================= */

(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================================================
     0. BACKGROUND HERO VIDEO AUTOPLAY FALLBACK
     ========================================================= */

  document.addEventListener('DOMContentLoaded', () => {
    const heroVideo = document.querySelector('.hero-video');

    if (heroVideo) {
      heroVideo.muted = true;
      heroVideo.defaultMuted = true;

      const playPromise = heroVideo.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          const enablePlay = () => {
            heroVideo.play();
          };
          
          document.body.addEventListener('touchstart', enablePlay, { once: true });
          document.body.addEventListener('click', enablePlay, { once: true });
        });
      }
    }
  });

  /* =========================================================
     1. CAPABILITIES MEGA MENU PREVIEW DATA & HOVER
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
        }, 150);
      }
    });
  });

  /* =========================================================
     2. FIXED HEADER SCROLL STATE
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
     3. SCROLL REVEAL OBSERVER
     ========================================================= */

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* =========================================================
     4. STAT NUMERICAL COUNTERS
     ========================================================= */

  const counters = document.querySelectorAll('.stat .num[data-target]');
  if (counters.length && 'IntersectionObserver' in window && !reduceMotion) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = Number(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const duration = 1200;
        const start = performance.now();

        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const value = target * (1 - Math.pow(1 - progress, 3));
          el.textContent = (Number.isInteger(target) ? Math.round(value) : value.toFixed(1)) + suffix;

          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
  }

  /* =========================================================
     5. MOBILE MENU TOGGLE & BODY LOCK
     ========================================================= */

  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.getElementById('mainNav');

  const closeMenu = () => {
    if (mainNav) {
      mainNav.classList.remove('open');
      document.body.classList.remove('menu-open');
      mobileToggle?.setAttribute('aria-expanded', 'false');
    }
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    if (mainNav) {
      const isOpen = mainNav.classList.toggle('open');
      document.body.classList.toggle('menu-open', isOpen);
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
     6. PROJECT TYPES ACCORDION
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
  slider.addEventListener('touchstart', () => isDragging = true);
  window.addEventListener('touchend', () => isDragging = false);
  window.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches[0]) move(e.touches[0].clientX);
  });
})();