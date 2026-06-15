/* ============================================================
   NCE SARL — lightbox.js
   Galerie responsive avec navigation clavier & tactile
   ============================================================ */

(function () {
  'use strict';

  let items   = [];   /* Toutes les vignettes de la galerie */
  let current = 0;    /* Index de l'image affichée */
  let touchStartX = 0;

  /* ── Crée l'overlay lightbox dans le DOM ── */
  function createLightbox() {
    if (document.getElementById('lightbox-overlay')) return;

    const html = /* html */`
      <div id="lightbox-overlay" class="lightbox-overlay" role="dialog"
           aria-modal="true" aria-label="Visualiseur de réalisation" hidden>

        <button class="lightbox__close" aria-label="Fermer" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
               viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round"
               aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <button class="lightbox__nav lightbox__prev" aria-label="Image précédente" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
               viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2.5"
               stroke-linecap="round" stroke-linejoin="round"
               aria-hidden="true">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <div class="lightbox__img-wrap">
          <img id="lightbox-img" class="lightbox__img" src="" alt="" loading="lazy">
          <div id="lightbox-caption" class="lightbox__caption"></div>
          <div id="lightbox-counter" class="lightbox__counter"></div>
        </div>

        <button class="lightbox__nav lightbox__next" aria-label="Image suivante" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
               viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2.5"
               stroke-linecap="round" stroke-linejoin="round"
               aria-hidden="true">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', html);
    bindEvents();
  }

  /* ── Affiche la lightbox à l'index donné ── */
  function open(index) {
    current = Math.max(0, Math.min(index, items.length - 1));
    const overlay = document.getElementById('lightbox-overlay');
    if (!overlay) return;

    overlay.removeAttribute('hidden');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    render();
  }

  /* ── Ferme la lightbox ── */
  function close() {
    const overlay = document.getElementById('lightbox-overlay');
    if (!overlay) return;

    overlay.classList.remove('open');
    overlay.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  /* ── Affiche l'image courante ── */
  function render() {
    const item    = items[current];
    const img     = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    const counter = document.getElementById('lightbox-counter');
    const prevBtn = document.querySelector('.lightbox__prev');
    const nextBtn = document.querySelector('.lightbox__next');

    if (!img || !item) return;

    img.src = item.src || item.placeholder || '';
    img.alt = item.alt || item.title || '';

    if (caption) {
      caption.innerHTML = `
        ${item.tag ? `<span class="real-card__tag" style="margin-bottom:.5rem;">${item.tag}</span> ` : ''}
        <strong>${item.title || ''}</strong>
        ${item.location ? ` · ${item.location}` : ''}
        ${item.desc ? `<br><span style="font-weight:400;font-size:.85rem;">${item.desc}</span>` : ''}
      `;
    }

    if (counter) counter.textContent = `${current + 1} / ${items.length}`;

    /* Masque les boutons si un seul élément */
    if (prevBtn) prevBtn.style.display = items.length > 1 ? '' : 'none';
    if (nextBtn) nextBtn.style.display = items.length > 1 ? '' : 'none';
  }

  function prev() {
    current = (current - 1 + items.length) % items.length;
    render();
  }

  function next() {
    current = (current + 1) % items.length;
    render();
  }

  /* ── Bind des événements ── */
  function bindEvents() {
    const overlay  = document.getElementById('lightbox-overlay');
    const closeBtn = overlay.querySelector('.lightbox__close');
    const prevBtn  = overlay.querySelector('.lightbox__prev');
    const nextBtn  = overlay.querySelector('.lightbox__next');
    const imgWrap  = overlay.querySelector('.lightbox__img-wrap');

    if (closeBtn) closeBtn.addEventListener('click', close);
    if (prevBtn)  prevBtn.addEventListener('click', prev);
    if (nextBtn)  nextBtn.addEventListener('click', next);

    /* Clic sur le fond pour fermer */
    overlay.addEventListener('click', e => {
      if (e.target === overlay) close();
    });

    /* Clavier */
    document.addEventListener('keydown', e => {
      if (!overlay.classList.contains('open')) return;
      switch (e.key) {
        case 'Escape':     close(); break;
        case 'ArrowLeft':  prev();  break;
        case 'ArrowRight': next();  break;
      }
    });

    /* Touch swipe */
    if (imgWrap) {
      imgWrap.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].clientX;
      }, { passive: true });

      imgWrap.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) < 40) return;
        dx < 0 ? next() : prev();
      }, { passive: true });
    }
  }

  /* ── Collecte toutes les vignettes et attache les clics ── */
  function setup() {
    const cards = document.querySelectorAll('.real-card[data-lightbox]');
    if (!cards.length) return;

    createLightbox();

    items = Array.from(cards).map(card => ({
      src:      card.dataset.src || '',
      title:    card.dataset.title || '',
      location: card.dataset.location || '',
      tag:      card.dataset.tag || '',
      desc:     card.dataset.desc || '',
      alt:      card.dataset.title || '',
    }));

    cards.forEach((card, i) => {
      card.addEventListener('click', () => open(i));

      /* Accessibilité clavier */
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `Voir la réalisation : ${card.dataset.title || ''}`);

      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open(i);
        }
      });
    });
  }

  /* Lance à la fin du chargement */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }

})();
