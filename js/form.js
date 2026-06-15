/* ============================================================
   NCE SARL — form.js
   Validation JS vanilla + envoi Web3Forms + honeypot anti-spam
   ============================================================ */

(function () {
  'use strict';

  /* ── Clé d'accès Web3Forms ─────────────────────────────────
     1. Créez un compte sur https://web3forms.com
     2. Générez une clé pour baalioud2@yahoo.fr
     3. Remplacez la valeur ci-dessous
     ─────────────────────────────────────────────────────────── */
  const WEB3FORMS_ACCESS_KEY = 'VOTRE_CLE_WEB3FORMS_ICI';

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    /* Injecte la clé Web3Forms dans le champ caché */
    const keyInput = form.querySelector('[name="access_key"]');
    if (keyInput) keyInput.value = WEB3FORMS_ACCESS_KEY;

    form.addEventListener('submit', handleSubmit);

    /* Validation en temps réel */
    form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) validateField(input);
      });
    });
  });

  /* ── Soumission ── */
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    /* Détection honeypot */
    const honeypot = form.querySelector('.honeypot');
    if (honeypot && honeypot.value) {
      showSuccess(form);
      return;
    }

    /* Validation globale */
    const fields = form.querySelectorAll('[required]');
    let valid = true;

    fields.forEach(field => {
      if (!validateField(field)) valid = false;
    });

    if (!valid) {
      /* Focus sur le premier champ en erreur */
      const firstError = form.querySelector('.error');
      if (firstError) firstError.focus();
      return;
    }

    /* Bouton en état chargement */
    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Envoi en cours…';
    }

    try {
      const formData = new FormData(form);

      /* Métadonnées supplémentaires */
      formData.append('subject', `Demande depuis nce-sarl.com — ${formData.get('type_demande') || 'Contact'}`);
      formData.append('from_name', 'NCE SARL Site Web');
      formData.append('redirect', 'false');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        showSuccess(form);
      } else {
        showError(submitBtn, originalText, data.message || 'Erreur lors de l\'envoi.');
      }
    } catch (err) {
      showError(submitBtn, originalText, 'Erreur réseau. Veuillez réessayer ou nous appeler directement.');
    }
  }

  /* ── Affiche le message de succès ── */
  function showSuccess(form) {
    const successEl = document.getElementById('form-success');
    if (successEl) {
      successEl.classList.add('visible');
      successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    form.style.display = 'none';
  }

  /* ── Réinitialise le bouton en cas d'erreur ── */
  function showError(btn, originalText, message) {
    if (btn) {
      btn.disabled = false;
      btn.textContent = originalText;
    }

    /* Affiche une alerte d'erreur générique */
    const errEl = document.getElementById('form-global-error');
    if (errEl) {
      errEl.textContent = message;
      errEl.classList.add('visible');
      errEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      alert(message);
    }
  }

  /* ── Validation d'un champ ── */
  function validateField(field) {
    const value   = field.value.trim();
    const name    = field.name;
    const errorEl = document.getElementById(`error-${name}`);

    let message = '';

    if (field.hasAttribute('required') && !value) {
      message = 'Ce champ est obligatoire.';
    } else if (name === 'email' && value && !isEmail(value)) {
      message = 'Adresse e-mail invalide.';
    } else if (name === 'phone' && value && !isPhone(value)) {
      message = 'Numéro de téléphone invalide.';
    } else if (name === 'message' && value && value.length < 10) {
      message = 'Le message doit contenir au moins 10 caractères.';
    }

    if (message) {
      field.classList.add('error');
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('visible');
      }
      return false;
    } else {
      field.classList.remove('error');
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.remove('visible');
      }
      return true;
    }
  }

  /* ── Helpers de validation ── */
  function isEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function isPhone(v) {
    return /^[+\d\s\-().]{6,20}$/.test(v);
  }

})();
