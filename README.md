# NCE SARL — Site Web Institutionnel

Site vitrine statique pour **NCE SARL**, entreprise de BTP, Services & Logistiques
basée à Libreville, Gabon.

---

## Structure des fichiers

```
nce-sarl-site/
├── index.html              # Page d'accueil
├── a-propos.html           # À propos
├── services.html           # Services
├── realisations.html       # Galerie de réalisations
├── contact.html            # Contact + formulaire
├── css/
│   ├── variables.css       # Variables CSS (couleurs, typo, espacements)
│   └── style.css           # Feuille de style principale (mobile-first)
├── js/
│   ├── components.js       # Header + Footer (injection dynamique)
│   ├── main.js             # Navigation, animations, stats counter
│   ├── lightbox.js         # Lightbox galerie
│   └── form.js             # Validation formulaire + Web3Forms
├── img/
│   ├── logo/               # Logos (logo-nce.png, logo-nce-white.png)
│   ├── hero/               # Images hero et À propos
│   └── realisations/       # Photos des projets (projet-01.jpg … )
├── icons/                  # Icônes SVG supplémentaires
├── robots.txt
├── sitemap.xml
└── README.md
```

---

## Mise en route rapide

Aucune installation requise. Ouvrez simplement `index.html` dans un navigateur,
ou déployez le dossier tel quel sur Vercel, Netlify ou GitHub Pages.

```bash
# Vercel (CLI)
vercel deploy

# Netlify (drag & drop)
# Glissez le dossier sur app.netlify.com

# GitHub Pages
# Poussez sur la branche main / docs
```

---

## Personnalisation obligatoire

### 1. Logo

Copiez le logo NCE SARL :
- `img/logo/logo-nce.png` — version couleurs (sur fond blanc/clair)
- `img/logo/logo-nce-white.png` — version blanche (pour le footer sombre)

### 2. Images

| Fichier                          | Usage                      |
|----------------------------------|----------------------------|
| `img/hero/hero-bg.jpg`           | Fond du hero (optionnel)   |
| `img/hero/about-photo.jpg`       | Photo équipe / chantier    |
| `img/realisations/projet-01.jpg` | Projet 01 (galerie)        |
| `img/realisations/projet-02.jpg` | Projet 02 (galerie)        |
| … jusqu'à `projet-09.jpg`       | Projets 03 à 09            |

Pour activer le fond photo dans le hero, ajoutez la classe `hero--with-img`
à la balise `<section class="hero">` dans `index.html`.

### 3. Formulaire Web3Forms

1. Créez un compte sur [web3forms.com](https://web3forms.com)
2. Générez une clé d'accès pour `baalioud2@yahoo.fr`
3. Ouvrez `js/form.js` et remplacez :
   ```js
   const WEB3FORMS_ACCESS_KEY = 'VOTRE_CLE_WEB3FORMS_ICI';
   ```

### 4. Données chiffrées (chiffres clés)

Dans `index.html`, section `.chiffres`, remplacez les valeurs `data-count`
par vos données réelles :
```html
<span data-count="10" data-suffix="+">10+</span>  <!-- Années -->
<span data-count="50" data-suffix="+">50+</span>   <!-- Projets -->
```

### 5. Domaine & SEO

- Remplacez toutes les occurrences de `https://www.nce-sarl.com` par votre URL réelle
- Mettez à jour `sitemap.xml` avec la bonne date et l'URL finale
- Ajoutez `<link rel="icon" ...>` avec votre favicon dans chaque `<head>`

---

## Palette de couleurs

| Variable          | Valeur    | Usage                    |
|-------------------|-----------|--------------------------|
| `--bleu-nuit`     | `#002B8A` | Titres, fonds forts      |
| `--bleu-royal`    | `#1D4FB3` | Liens, secondaire        |
| `--bleu-acier`    | `#5D86D6` | Accents, dégradés        |
| `--orange-vif`    | `#FF9800` | Boutons CTA principaux   |
| `--orange-dore`   | `#F5A623` | Accents graphiques       |
| `--gris-fonce`    | `#2A2F3A` | Footer                   |

---

## Typographie

- **Titres** : Exo 2 700 / 800 (Google Fonts)
- **Corps** : Montserrat 400 / 600 (Google Fonts)

---

## Fonctionnalités

- Header sticky avec ombre au scroll
- Menu burger plein écran sur mobile
- Animations d'apparition au scroll (IntersectionObserver)
- Compteur de statistiques animé
- Filtres galerie (Tous / Génie Civil / Bâtiment / Logistique / Sécurité)
- Lightbox responsive avec navigation clavier & swipe tactile
- Formulaire de contact avec validation JS + Web3Forms + honeypot
- Bouton WhatsApp flottant
- Bouton retour en haut
- JSON-LD LocalBusiness (SEO)
- Sitemap XML
- Navigation clavier complète (WCAG AA)
- `loading="lazy"` sur toutes les images

---

## Déploiement

### Vercel

Ajoutez un fichier `vercel.json` à la racine :
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/$1" }]
}
```

### Netlify

Créez `netlify.toml` :
```toml
[[redirects]]
  from = "/*"
  to = "/:splat"
  status = 200
```

---

© 2026 NCE SARL — BTP Services & Logistiques · Libreville, Gabon  
*Votre identité, notre engagement*
