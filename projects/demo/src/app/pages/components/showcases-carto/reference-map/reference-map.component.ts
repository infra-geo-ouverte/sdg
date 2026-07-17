import { AfterContentInit, Component, ElementRef, inject } from '@angular/core';

import {
  SDG_REFERENCE_MAP_LABELS,
  SdgOlMapOptions,
  SdgOlReferenceMap
} from '@igo2/sdg-carto/ol';
import {
  Anchor,
  AnchorMenuComponent,
  ExternalLinkComponent,
  findTitleAnchors
} from '@igo2/sdg-common';
import { provideTranslatedLabels } from '@igo2/sdg-i18n';

import { default as olGeoJSON } from 'ol/format/GeoJSON.js';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import CircleStyle from 'ol/style/Circle.js';
import Stroke from 'ol/style/Stroke.js';
import Style from 'ol/style/Style.js';

import type { GeoJSON } from 'geojson';
import { DocsCodeComponent } from 'projects/demo/src/app/components/docs-code/docs-code.component';

import { ExampleViewerComponent } from '../../../../components';

const MAP_CENTER: [number, number] = [-71.8, 47.1];

const GEOJSON: GeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-71.8, 47]
      },
      properties: {}
    }
  ]
};

const createGeoJsonLayer = () =>
  new VectorLayer({
    style: new Style({
      image: new CircleStyle({
        radius: 5,
        fill: undefined,
        stroke: new Stroke({ color: 'red', width: 1 })
      })
    }),
    source: new VectorSource({
      features: new olGeoJSON({
        featureProjection: 'EPSG:3857'
      }).readFeatures(GEOJSON)
    })
  });

function buildMapOptions(options?: {
  basemaps?: SdgOlMapOptions['basemaps'];
  includeGeoJson?: boolean;
}): SdgOlMapOptions {
  return {
    view: {
      zoom: 6,
      center: MAP_CENTER
    },
    // Empty basemaps means the map falls back to the built-in topo basemap.
    basemaps: options?.basemaps ?? [],
    layers: options?.includeGeoJson ? [createGeoJsonLayer()] : undefined
  };
}

@Component({
  selector: 'app-reference-map',
  imports: [
    SdgOlReferenceMap,
    ExampleViewerComponent,
    ExternalLinkComponent,
    AnchorMenuComponent,
    DocsCodeComponent
  ],
  providers: [
    // Useful to configure globally the labels of the ReferenceMap.
    // For local configuration you should use the input "labels"
    provideTranslatedLabels(SDG_REFERENCE_MAP_LABELS, 'showcasesCarto')
  ],
  templateUrl: './reference-map.component.html',
  styleUrl: './reference-map.component.scss'
})
export class ReferenceMapDemoComponent implements AfterContentInit {
  private elementRef = inject(ElementRef);

  readonly map1 = buildMapOptions();

  readonly map2 = buildMapOptions({
    includeGeoJson: true
  });

  readonly map3 = buildMapOptions({
    basemaps: ['imagery']
  });

  readonly example = CODE_EXAMPLE;

  anchors: Anchor[] = [];

  ngAfterContentInit() {
    this.anchors = findTitleAnchors(this.elementRef.nativeElement);
  }
}

const CODE_EXAMPLE = `
const mapA: SdgOlMapOptions = {
  view: { center: [-71.8, 47.1], zoom: 6 },
  basemaps: ['topo']
};

const mapB: SdgOlMapOptions = {
  view: { center: [-71.8, 47.1], zoom: 6 },
  // Basemaps empty or undefined: fallback to built-in topo basemap.
  basemaps: undefined
};
`;
