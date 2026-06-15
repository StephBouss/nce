/* ============================================================
   NCE SARL — main.js
   Navigation · Scroll · Animations · Stats counter
   ============================================================ */

(function () {
  'use strict';

  /* ── Utilitaires ── */
  const $ = id => document.getElementById(id);
  const $$ = sel => document.querySelectorAll(sel);

  /* ============================================================
     INITIALISATION APRÈS INJECTION DES COMPOSANTS
     Les éléments header/footer sont injectés par components.js,
     donc on attend que le DOM soit complet.
     ============================================================ */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    /* Petit délai pour laisser components.js injecter le HTML */
    requestAnimationFrame(() => {
      setupHeader();
      setupMobileMenu();
      setupScrollAnimations();
      setupStatsCounter();
      setupBackToTop();
      setupGalleryFilters();
    });
  }

  /* ============================================================
     HEADER — Ombre au scroll
     ============================================================ */
  function setupHeader() {
    const header = $('site-header');
    if (!header) return;

    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ============================================================
     MENU MOBILE — Burger + overlay plein écran
     ============================================================ */
  function setupMobileMenu() {
    /* Les éléments sont dans le #site-header injecté */
    const header = $('site-header');
    if (!header) return;

    const burger     = header.querySelector('.burger');
    const mobileMenu = $('mobile-menu');
    const closeBtn   = mobileMenu ? mobileMenu.querySelector('.mobile-menu__close') : null;
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('.mobile-nav-link, .btn') : [];

    if (!burger || !mobileMenu) return;

    function openMenu() {
      burger.classList.add('open');
      mobileMenu.classList.add('open');
      burger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    }

    function closeMenu() {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      burger.focus();
    }

    burger.addEventListener('click', () => {
      mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
    });

    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    /* Fermer sur Échap */
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
    });
  }

  /* ============================================================
     ANIMATIONS AU SCROLL — IntersectionObserver
     ============================================================ */
  function setupScrollAnimations() {
    const targets = $$('.fade-up, .fade-in');
    if (!targets.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    });

    targets.forEach(el => observer.observe(el));
  }

  /* ============================================================
     COMPTEUR DE STATISTIQUES
     ============================================================ */
  function setupStatsCounter() {
    const numbers = $$('[data-count]');
    if (!numbers.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    numbers.forEach(el => observer.observe(el));
  }

  function animateCount(el) {
    const target  = parseInt(el.dataset.count, 10);
    const suffix  = el.dataset.suffix || '';
    const prefix  = el.dataset.prefix || '';
    const duration = 2000;
    const start   = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      /* Ease out cubic */
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = prefix + value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  /* ============================================================
     BOUTON RETOUR EN HAUT
     ============================================================ */
  function setupBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================================
     FILTRES GALERIE (réalisations.html)
     ============================================================ */
  function setupGalleryFilters() {
    const filterBtns = $$('.filter-btn');
    const cards = $$('.real-card[data-category]');
    if (!filterBtns.length || !cards.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        cards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            delete card.dataset.hidden;
            card.removeAttribute('data-hidden');
          } else {
            card.dataset.hidden = '1';
          }
        });
      });
    });
  }

  /* ============================================================
     SMOOTH SCROLL sur ancres internes
     ============================================================ */
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const headerH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--header-h') || '80',
      10
    );
    const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });

})();
