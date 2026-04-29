# @igo2/sdg-common

Composants UI Angular, services de mise en page et utilitaires de routing pour le Système de Design Gouvernemental du Québec (SDG).

## Installation

```bash
npm install @igo2/sdg-common
```

## Ce qui est inclus

### Services de mise en page

- `BreakpointService` — Détection des points d'arrêt responsifs utilisant `window.matchMedia`

```typescript
import { BreakpointService } from '@igo2/sdg-common';

@Component({ ... })
export class AppComponent {
  private breakpointService = inject(BreakpointService);
  isHandset = this.breakpointService.isHandset; // Signal<boolean>
}
```

### Utilitaires de routing

- `SdgRoute` / `SdgRoutes` — Interfaces de route étendues avec `isHome`, `hidden` et `description`
- `RouteTitleKey` / `RouteTranslateKey` — Clés de données de route pour la résolution de titre
- `TitleResolver` — Classe abstraite pour fournir des titres de route traduits
- `TitleResolverPipe` — Pipe pour résoudre le titre d'une route dans les templates
- `resolveTitle()` — Fonction pour extraire le titre d'affichage d'une configuration de route
- `pathIsExternal()` / `isSafeUrl()` — Utilitaires de sécurité URL

```typescript
import { SdgRoute, SdgRoutes, RouteTranslateKey, TitleResolver } from '@igo2/sdg-common';
```

### Composants UI

Alerte, analytique, menu d'ancrage, lien de bloc, fil d'Ariane, bannière de charte, contact, lien externe, pied de page, en-tête, menu latéral, navigation, avis, paginateur, voir aussi, liens séquentiels, tuile, bouton haut de page, et plus.

## Modules connexes

- [`@igo2/sdg-core`](../core/README.md) — Styles et tokens de design fondamentaux
- [`@igo2/sdg-carto`](../carto/README.md) — Module cartographique
- [`@igo2/sdg-i18n`](../i18n/README.md) — Utilitaires d'internationalisation

