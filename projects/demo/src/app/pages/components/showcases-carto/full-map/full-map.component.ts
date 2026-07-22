import {
  AfterContentInit,
  Component,
  ElementRef,
  OnInit,
  inject,
  signal
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import {
  Extent,
  PanelService,
  SdgPanelContentDirective
} from '@igo2/sdg-carto';
import { SdgOlFullMap, SdgOlFullMapOptions } from '@igo2/sdg-carto/ol';
import {
  Anchor,
  AnchorMenuComponent,
  BreakpointService,
  ExternalLinkComponent,
  findTitleAnchors
} from '@igo2/sdg-common';

import { DocsCodeComponent } from 'projects/demo/src/app/components/docs-code/docs-code.component';

import { ExampleViewerComponent } from '../../../../components';
import { FullMapDialogComponent } from './full-map-dialog.component';

const QUEBEC_EXTENT_3857: Extent = [
  -8794239.772668611, 5623095.918935596, -6334079.026137266, 8995581.929741584
] as const;

const MAP_CONFIG: SdgOlFullMapOptions = {
  view: {
    projection: 'EPSG:3857',
    center: [-71.636918, 54.784257],
    zoom: 5
  },
  basemaps: ['topo', 'imagery', 'hybrid'],
  legend: true,
  panel: {
    default: 'custom'
  },
  navigation: {
    geolocation: true,
    home: {
      extent: QUEBEC_EXTENT_3857
    },
    scaleLine: true
  },
  footer: {
    firstPublicationDate: '2024',
    organization: {
      name: 'Ministère de la Sécurité intérieure',
      url: 'https://www.quebec.ca/gouvernement/ministeres-organismes/securite-interieure'
    }
  }
};

@Component({
  selector: 'app-full-map',
  imports: [
    ExternalLinkComponent,
    ExampleViewerComponent,
    SdgOlFullMap,
    SdgPanelContentDirective,
    MatButtonModule,
    MatIconModule,
    DocsCodeComponent,
    AnchorMenuComponent
  ],
  templateUrl: './full-map.component.html',
  styleUrl: './full-map.component.scss'
})
export class FullMapDemoComponent implements OnInit, AfterContentInit {
  readonly basemapsExample = BASEMAPS_EXAMPLE;
  readonly searchExample = SEARCH_EXAMPLE;
  readonly navigationExample = NAVIGATION_EXAMPLE;
  readonly legendExample = LEGEND_EXAMPLE;
  readonly panelExample = PANEL_EXAMPLE;
  readonly footerExample = FOOTER_EXAMPLE;
  readonly labelsExample = LABELS_EXAMPLE;

  private panelService = inject(PanelService);
  private breakpointService = inject(BreakpointService);
  private dialog = inject(MatDialog);
  private elementRef = inject(ElementRef);

  readonly options = signal<SdgOlFullMapOptions>(MAP_CONFIG);

  get isHandset() {
    return this.breakpointService.isHandset;
  }

  anchors: Anchor[] = [];

  ngOnInit(): void {
    if (this.isHandset()) {
      this.panelService.expanded.set(false);
    }
  }

  ngAfterContentInit() {
    this.anchors = findTitleAnchors(this.elementRef.nativeElement);
  }

  openFullscreen(): void {
    this.dialog.open(FullMapDialogComponent, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'full-screen-dialog',
      data: {
        options: this.options(),
        isHandset: this.isHandset()
      }
    });
  }
}

const BASEMAPS_EXAMPLE = `
const options: SdgOlFullMapOptions = {
  // Use built-in string keys (a fresh OL layer is created for each map instance)
  basemaps: ['topo', 'imagery', 'hybrid']
};

// You can also pass plain OL BaseLayer objects directly:
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';

const options: SdgOlFullMapOptions = {
  basemaps: [
    new TileLayer({ source: new XYZ({ url: 'https://example.com/{z}/{x}/{y}.png' }) })
  ]
};

// Or mix both:
const options: SdgOlFullMapOptions = {
  basemaps: ['topo', new TileLayer({ /* … */ })]
};`;

const SEARCH_EXAMPLE = `
const options: SdgOlFullMapOptions = {
  // ...
  search: true // par défaut
};

// ⚠️ La recherche intégrée utilise des icônes de la police Google Material Symbols.
// Assurez-vous de l'importer dans votre fichier 'index.html'.
// Exemple :
// <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

// Pour personnaliser le panneau de résultats, projeter un ng-template.
// Les variables de contexte disponibles sont déclarées avec let- :
<sdg-ol-full-map [options]="options">
  <ng-template
    sdgPanelContent="search"
    let-groups="groups"
    let-loading="loading"
  >
    <!-- groups  : SearchResultGroup[] — un groupe par source enregistrée -->
    <!-- loading : boolean            — true tant qu'une source charge -->
    <my-custom-results [groups]="groups" [loading]="loading" />
  </ng-template>
</sdg-ol-full-map>`;

const NAVIGATION_EXAMPLE = `
const options: SdgOlFullMapOptions = {
  navigation: {
    geolocation: true,        // bouton de géolocalisation
    home: { extent: EXTENT }, // retour à l'étendue initiale
    rotation: true,           // bouton de rotation
    zoom: true,               // boutons de zoom (désactivés sur mobile)
    scaleLine: true           // barre d'échelle
  }
};`;

const LEGEND_EXAMPLE = `
const options: SdgOlFullMapOptions = {
  // ...
  legend: true
};

// Contenu de la légende via projection de contenu :
<sdg-ol-full-map [options]="options">
  <ng-template sdgPanelContent="legend">
    <!-- Votre contenu de légende -->
  </ng-template>
</sdg-ol-full-map>`;

const FOOTER_EXAMPLE = `
const options: SdgOlFullMapOptions = {
  // ...
  footer: {
    copyright: {
      label: '© Gouvernement du Québec',  // valeur par défaut
      url: 'https://www.quebec.ca'
    },
    organization: {
      name: 'Ministère de la Sécurité intérieure',
      url: 'https://www.quebec.ca/gouvernement/ministeres-organismes/securite-interieure'
    },
    firstPublicationDate: '2024' // optionnel
  }
};`;

const LABELS_EXAMPLE = `
import {
  SDG_FULL_MAP_LABELS,
  SdgFullMapLabels
} from '@igo2/sdg-carto';
import { provideTranslatedLabels } from '@igo2/sdg-i18n';

// --- Option 1 : liaison locale (une seule instance) ---
<sdg-ol-full-map
  [options]="options"
  [labels]="{ searchBar: { placeholder: 'Rechercher un lieu…' } }"
/>

// --- Option 2 : jeton d'injection (toutes les instances du composant) ---
@Component({
  providers: [
    {
      provide: SDG_FULL_MAP_LABELS,
      useValue: {
        searchBar:  { placeholder: 'Rechercher un lieu ou une adresse…' },
        legend:     { label: 'Légende', open: 'Ouvrir la légende', close: 'Fermer la légende' },
        navigation: {
          home:        { goHome: 'Retour à l\\'étendue initiale' },
          rotation:    { reset: 'Réinitialiser la rotation' },
          geolocation: { active: 'Ma position', inactive: 'Activer la géolocalisation' },
          zoom:        { zoomIn: 'Zoom avant', zoomOut: 'Zoom arrière' }
        },
        basemap: { tooltip: 'Changer le fond de carte' },
        panel:   { open: 'Ouvrir le panneau', close: 'Fermer le panneau' },
        search:  { clear: 'Effacer', noResults: 'Aucun résultat', results: 'Résultats', loadMore: 'Charger plus de résultats' }
      } satisfies SdgFullMapLabels
    }
  ]
})

// --- Option 3 : via TranslationService (i18n) ---
export const appConfig: ApplicationConfig = {
  providers: [
    provideTranslation(
      [
        withLanguageFromUrl(),
        withWaitOnI18nReady()
      ],
      {
        loader: {
          // WORKAROUND for the demo on the Github page
          prefix: environment.production ? '/sdg/locale/' : '/locale/'
        }
      }
    ),
    // La clé 'maCarte' pointe vers un objet dans votre fichier fr.json
    // dont la structure correspond à SdgFullMapLabels.
    provideTranslatedLabels(SDG_FULL_MAP_LABELS, 'maCarte')
  ]
}`;

const PANEL_EXAMPLE = `
const options: SdgOlFullMapOptions = {
  // ...
  panel: {
    default: 'custom'   // panneau affiché par défaut et au retour de la recherche/légende
  }
};

// Projection de plusieurs contenus de panneau :
<sdg-ol-full-map [options]="options">
  <ng-template sdgPanelContent="custom">
    <!-- Contenu par défaut -->
  </ng-template>
  <ng-template sdgPanelContent="legend">
    <!-- Contenu de la légende -->
  </ng-template>
</sdg-ol-full-map>

// Contrôle programmatique via PanelService :
panelService.toggle('legend');       // bascule vers la légende et ouvre le panneau
panelService.expanded.set(false);    // ferme le panneau
panelService.resetDefaultType();     // revient au type par défaut (default)`;
