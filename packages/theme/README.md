# @igo2/sdg-theme

Couche de personnalisation Material Design pour le Système de Design Gouvernemental du Québec (SDG).

## Vue d'ensemble

Ce package regroupe tout ce qui est lié à Angular Material : la configuration du thème de couleurs, les overrides de composants Material, et les overrides de la librairie IGO2. Il s'utilise en complément de `@igo2/sdg-core` qui, lui, reste entièrement indépendant de Material.

## Quand l'utiliser

Installez ce package si votre application :
- Utilise des composants `@angular/material`
- Veut les composants Material stylisés selon les spécifications SDG
- Utilise des composants de la librairie IGO2 (`igo-search-bar`, `igo-list`, etc.)

## Installation

```bash
npm install @igo2/sdg-theme
```

## Utilisation

Exemple de référence : `projects/demo/src/theme/theme.scss`

```scss
@use '@angular/material' as mat;
@use '@igo2/sdg-theme' as sdg-theme;

html {
  color-scheme: light;

  // Configure le thème de couleurs Material avec la palette SDG
  @include mat.theme(sdg-theme.$material-theme);

  // Applique les tokens système, la typographie, et tous les overrides
  @include sdg-theme.theme(true);
}
```

## API publique

### Variables

| Variable | Description |
|----------|-------------|
| `$material-theme` | Configuration du thème Material (couleurs, typographie, densité) à passer à `mat.theme()` |
| `$primary-palette` | Palette de couleurs primaire SDG (bleu gouvernemental) |

### Mixins

| Mixin | Description |
|-------|-------------|
| `theme($withDarkMode: false)` | Point d'entrée principal. Applique les tokens système, la typographie, les overrides IGO2 et les overrides Material |
| `overrides()` | Applique uniquement les overrides de composants Material (sans tokens ni typographie) |

## Migration depuis v1.x

### Avant (v1.x)

```scss
@use '@angular/material' as mat;
@use '@igo2/sdg-core' as sdg;

html {
  @include mat.theme(sdg.$material-theme);
  @include sdg.theme(true);
}
```

### Après (v2.x)

```scss
@use '@angular/material' as mat;
@use '@igo2/sdg-theme' as sdg-theme;

html {
  @include mat.theme(sdg-theme.$material-theme);
  @include sdg-theme.theme(true);
}
```

### Étapes de migration

1. Installer `@igo2/sdg-theme` : `npm install @igo2/sdg-theme`
2. Remplacer `@use '@igo2/sdg-core' as sdg` par `@use '@igo2/sdg-theme' as sdg-theme` dans votre fichier de thème
3. Remplacer `sdg.$material-theme` par `sdg-theme.$material-theme`
4. Remplacer `sdg.theme(...)` par `sdg-theme.theme(...)`

## Dépendances

- `@angular/material` (peerDependency) — ^21.0.0
- `@igo2/sdg-core` (peerDependency) — ^2.0.0

## Packages associés

- [`@igo2/sdg-core`](../core/README.md) — Infrastructure pure : styles, services, utilitaires
