/* ============================================================
   NCE SARL — Composants réutilisables (Header + Footer)
   Injection dynamique pour éviter la duplication HTML
   ============================================================ */

(function () {
  'use strict';

  const NAV_LINKS = [
    { href: 'index.html',       label: 'Accueil' },
    { href: 'a-propos.html',    label: 'À propos' },
    { href: 'services.html',    label: 'Services' },
    { href: 'realisations.html',label: 'Réalisations' },
    { href: 'contact.html',     label: 'Contact' },
  ];

  /* Détecte la page active */
  function getActivePage() {
    const path = window.location.pathname;
    const file = path.split('/').pop();
    return file || 'index.html';
  }

  /* ── HEADER ── */
  function renderHeader() {
    const active = getActivePage();

    const navItems = NAV_LINKS.map(link => /* html */`
      <li>
        <a href="${link.href}"
           class="nav-link${active === link.href ? ' active' : ''}"
           ${active === link.href ? 'aria-current="page"' : ''}>
          ${link.label}
        </a>
      </li>
    `).join('');

    const mobileNavItems = NAV_LINKS.map(link => /* html */`
      <li>
        <a href="${link.href}"
           class="mobile-nav-link${active === link.href ? ' active' : ''}"
           ${active === link.href ? 'aria-current="page"' : ''}>
          ${link.label}
        </a>
      </li>
    `).join('');

    return /* html */`
      <div class="header-inner container">
        <a href="index.html" class="logo-link" aria-label="NCE SARL — Retour à l'accueil">
          <img src="img/logo/logo-nce.png"
               alt="NCE SARL — BTP Services &amp; Logistiques"
               class="logo-img"
               width="40" height="44"
               loading="eager">
        </a>

        <nav class="nav" aria-label="Navigation principale">
          <ul class="nav-list" role="list">${navItems}</ul>
        </nav>

        <a href="contact.html" class="btn btn-primary header-cta" aria-label="Demander un devis">
          Demander un devis
        </a>

        <button class="burger"
                aria-label="Ouvrir le menu de navigation"
                aria-expanded="false"
                aria-controls="mobile-menu"
                type="button">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <!-- Menu mobile plein écran -->
      <div class="mobile-menu"
           id="mobile-menu"
           role="dialog"
           aria-modal="true"
           aria-label="Menu de navigation mobile">

        <button class="mobile-menu__close"
                aria-label="Fermer le menu"
                type="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
               viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round"
               aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <nav aria-label="Navigation mobile">
          <ul class="mobile-nav-list" role="list">
            ${mobileNavItems}
          </ul>
        </nav>

        <a href="contact.html" class="btn btn-primary">
          Demander un devis
        </a>

        <p style="color:rgba(255,255,255,0.4);font-size:.78rem;margin-top:1rem;">
          NCE SARL · BTP Services &amp; Logistiques
        </p>
      </div>
    `;
  }

  /* ── FOOTER ── */
  function renderFooter() {
    return /* html */`
      <div class="container">
        <div class="footer-grid">

          <!-- Colonne 1 : À propos -->
          <div>
            <img src="img/logo/logo-nce-white.png"
                 alt="NCE SARL — BTP Services &amp; Logistiques"
                 class="footer__logo"
                 width="80" height="80" loading="lazy">
            <p class="footer__desc">
              NCE SARL est votre partenaire de confiance pour tous vos projets
              de construction, BTP, services et logistique au Gabon.
            </p>
            <p class="footer__tagline">« Votre identité, notre engagement »</p>

            <div class="footer__social" aria-label="Réseaux sociaux">
              <a href="#" class="footer__social-link" aria-label="Facebook NCE SARL">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                     viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" class="footer__social-link" aria-label="LinkedIn NCE SARL">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                     viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="https://wa.me/24177353433" class="footer__social-link" aria-label="WhatsApp NCE SARL">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                     viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Colonne 2 : Liens rapides -->
          <div>
            <h3 class="footer__heading">Liens rapides</h3>
            <ul class="footer__links" role="list">
              ${NAV_LINKS.map(link => `
                <li>
                  <a href="${link.href}" class="footer__link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                         viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2.5"
                         stroke-linecap="round" stroke-linejoin="round"
                         aria-hidden="true">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                    ${link.label}
                  </a>
                </li>
              `).join('')}
              <li>
                <a href="contact.html" class="footer__link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                       viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2.5"
                       stroke-linecap="round" stroke-linejoin="round"
                       aria-hidden="true">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                  Demander un devis
                </a>
              </li>
            </ul>
          </div>

          <!-- Colonne 3 : Contact -->
          <div>
            <h3 class="footer__heading">Contactez-nous</h3>

            <div class="footer__contact-item">
              <span class="footer__contact-icon" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                     viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 5.56 5.56l.83-.83a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/>
                </svg>
              </span>
              <div>
                <div style="font-size:.78rem;color:rgba(255,255,255,0.5);margin-bottom:.15rem;">Téléphone</div>
                <a href="tel:+24177353433" class="footer__link" style="color:rgba(255,255,255,.85);">+241 77 353 433</a>
              </div>
            </div>

            <div class="footer__contact-item">
              <span class="footer__contact-icon" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                     viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </span>
              <div>
                <div style="font-size:.78rem;color:rgba(255,255,255,0.5);margin-bottom:.15rem;">E-mail</div>
                <a href="mailto:baalioud2@yahoo.fr" class="footer__link" style="color:rgba(255,255,255,.85);">baalioud2@yahoo.fr</a>
              </div>
            </div>

            <div class="footer__contact-item">
              <span class="footer__contact-icon" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                     viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </span>
              <div>
                <div style="font-size:.78rem;color:rgba(255,255,255,0.5);margin-bottom:.15rem;">Adresse</div>
                <span style="color:rgba(255,255,255,.85);font-size:.9rem;">
                  Résidence Équateur, villa 3<br>
                  BP 676 — Libreville, Gabon
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Barre du bas -->
        <div class="footer__bottom">
          <p class="footer__bottom-text">
            © 2026 NCE SARL — Tous droits réservés · <em>Votre identité, notre engagement</em>
          </p>
          <p class="footer__bottom-text">
            BTP · Services · Logistiques — Libreville, Gabon
          </p>
        </div>
      </div>
    `;
  }

  /* ── Injection dans le DOM ── */
  function inject() {
    const headerEl = document.getElementById('site-header');
    const footerEl = document.getElementById('site-footer');

    if (headerEl) headerEl.innerHTML = renderHeader();
    if (footerEl) footerEl.innerHTML = renderFooter();
  }

  /* Lance l'injection dès que le DOM est prêt */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
