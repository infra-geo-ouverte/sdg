# Guide de Migration : v1.x → v2.0.0

## Vue d'ensemble

La version 2.0.0 de @igo2/sdg réorganise l'architecture pour mieux aligner les limites des modules :
- **`@igo2/sdg-core`** — Styles et tokens de design fondamentaux (SCSS uniquement, aucune dépendance Angular)
- **`@igo2/sdg-common`** — Composants UI Angular et utilitaires de routing

### Changements inclus dans la v2.0.0

**1. Séparation des responsabilités Core/Common :**
- Core devient pur SCSS (aucune dépendance Angular)
- Common reçoit les utilitaires Angular (routing, layout services)

**2. Thématisation Material intégrée à la v2.0.0 :**
- Nouveau package `@igo2/sdg-theme` pour les customisations thématique
- Material Design component overrides séparé de core
- Personnalisation optionnelle et flexible

## Changements apportés

### Module Core (`@igo2/sdg-core`)

**Avant (v1.x) :**
- Contenait `BreakpointService` et les utilitaires de routing
- Dépendait de `@angular/router` et autres dépendances Angular

**Après (v2.0.0) :**
- **AUCUNE dépendance Angular** ✅
- Styles et tokens de design uniquement (SCSS)
- Styles de mise en page Bootstrap inclus
- `BreakpointService` déplacé vers `@igo2/sdg-common`

### Module Common (`@igo2/sdg-common`)

**Améliorations (v2.0.0) :**
- Contient maintenant `BreakpointService`
- Contient tous les utilitaires de routing (`SdgRoute`, `TitleResolver`, `resolveTitle`, etc.)
- Composants UI Angular (breadcrumbs, navigation, etc.)

## Symboles déplacés de Core vers Common

| Symbole | Type |
|---|---|
| `BreakpointService` | Service Angular |
| `SdgRoute` | Interface |
| `SdgRoutes` | Type |
| `RouteTitleKey` | Constante |
| `RouteTranslateKey` | Constante |
| `TitleResolver` | Classe abstraite |
| `TitleResolverPipe` | Pipe |
| `resolveTitle` | Fonction |
| `pathIsExternal` | Fonction |
| `isSafeUrl` | Fonction |

## Étapes de migration

### Étape 1 : Mettre à jour les importations

Remplacez toutes les importations de `@igo2/sdg-core` vers `@igo2/sdg-common` pour les symboles déplacés :

```typescript
// Avant
import { BreakpointService } from '@igo2/sdg-core';
import { SdgRoute, RouteTranslateKey } from '@igo2/sdg-core';
import { TitleResolver, resolveTitle } from '@igo2/sdg-core';
import { pathIsExternal, isSafeUrl } from '@igo2/sdg-core';

// Après
import { BreakpointService } from '@igo2/sdg-common';
import { SdgRoute, RouteTranslateKey } from '@igo2/sdg-common';
import { TitleResolver, resolveTitle } from '@igo2/sdg-common';
import { pathIsExternal, isSafeUrl } from '@igo2/sdg-common';
```


### Étape 3 : Mettre à jour les styles (optionnel)


## Changements significatifs (Breaking Changes)

### 1. Les chemins d'importation ont changé

Tous les symboles TypeScript énumérés ci-dessus **n'existent plus** dans `@igo2/sdg-core`. Les importer depuis core causera une erreur de compilation.

### 2. `@igo2/sdg-core` n'a plus de dépendances Angular

Core est maintenant un pur paquet SCSS. Il n'a aucune dépendance Angular en pair. Il peut être utilisé dans n'importe quel projet (pas uniquement Angular).


# Thématisation Material — Incluse dans la v2.0.0

## Aperçu

La v2.0.0 inclut la création du package `@igo2/sdg-theme` dédié aux customisations Material Design. Cela sépare complètement les responsabilités :

| Package | Responsabilité |
|---|---|
| `@igo2/sdg-core` | Styles et tokens (SCSS uniquement, aucune dépendance) |
| `@igo2/sdg-common` | Composants UI Angular et routing |
| `@igo2/sdg-theme` | **Nouvelles** — Customisations Material Design (optionnel) |

## Motivation

**Avant (v1.x) :**
- Core contenait les customisations Material Design
- Material Design était obligatoire

**Après (v2.0.0) :**
- Core reste pur SCSS (pas de Material)
- Permettra au package core d'être utilisé dans d'autres projet sans être dépendant des versions Angular

## Contenu du theme package

### Customisations Material

- Overrides de composants Material Design
- Palettes de couleurs personnalisées
- Styles de boutons, cartes, dialogues, etc.
- Intégration avec les tokens SDG


### Utilisation

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <button mat-raised-button color="primary">
      Bouton Material (stylisé par SDG Theme)
    </button>
  `,
})
export class AppComponent {}
```

```scss
// app.component.scss
@use '@igo2/sdg-core' as sdg;
@use '@igo2/sdg-theme' as sdg-theme;

// Inclure les overrides Material Design
@include sdg-theme.overrides();
```

**Avant (v1.x) :**

```scss
// theme.scss
@use '@angular/material' as mat;
@use '@igo2/sdg-core' as sdg;

html {
  color-scheme: light;

  @include mat.theme(sdg.$material-theme);
  @include sdg.theme(true);
}
```

**Après (v2.0.0) :**
```scss
// theme.scss
@use '@angular/material' as mat;
@use '@igo2/sdg-theme';

html {
  color-scheme: light;

  @include mat.theme(sdg-theme.$material-theme);
  @include sdg-theme.theme(true);
}
```


