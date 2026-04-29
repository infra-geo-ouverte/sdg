# @igo2/sdg-core

Infrastructure de base du Système de Design Gouvernemental du Québec (SDG).

## Vue d'ensemble

Ce paquet fournit l'infrastructure SCSS fondamentale pour les applications SDG :
- **Styles** — Typographie, système d'élévation, grille de mise en page, points d'arrêt responsifs
- **Tokens de design** — Jetons de couleur, espacement, élévation et disposition

## Installation

```bash
npm install @igo2/sdg-core
```

## Utilisation

### Styles

Importez les styles core dans le fichier de style principal de votre application :

```scss
@use '@igo2/sdg-core' as sdg;

// Les styles core incluent la typographie, l'élévation, la mise en page et les points d'arrêt
```

### Variables CSS

Core génère diverses variables CSS pour personnaliser votre application :

- `--sdg-color-*` — Couleurs du thème SDG
- `--sdg-elevation-*` — Valeurs d'ombre
- `--sdg-spacer-*` — Valeurs d'espacement
- `--sdg-font-size-*` — Tailles de police
- `--sdg-line-height-*` — Hauteurs de ligne

## Structure

### Styles

- `_typography.scss` — Système de typographie avec échelles responsives
- `_elevation.scss` — Système d'élévation (z-values 0-4)
- `_sass-utils.scss` — Utilitaires et helpers Sass
- `bootstrap-layout.scss` — Grille responsive basée sur Bootstrap
- `_breakpoints.scss` — Points d'arrêt responsifs

### Mise en page (SCSS uniquement)

- `bootstrap-layout.scss` — Grille responsive basée sur Bootstrap
- `_breakpoints.scss` — Points d'arrêt responsifs

Disponible via `@use '@igo2/sdg-core/layout'`.

## Caractéristiques

✅ **Système de typographie** — Typographie extensible alignée avec les directives SDG  
✅ **Compatible Bootstrap** — Utilise Bootstrap 5.2 grid system  

## Modules connexes

- [`@igo2/sdg-common`](../common/README.md) — Composants UI et utilitaires Angular
- [`@igo2/sdg-carto`](../carto/README.md) — Module cartographique
- [`@igo2/sdg-i18n`](../i18n/README.md) — Utilitaires d'internationalisation


