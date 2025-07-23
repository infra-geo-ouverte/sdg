import { Component } from '@angular/core';

import {
  IOlMapOptions,
  SdgOlReferenceMapComponent,
  provideMap,
  withMapOptions
} from '@igo2/sdg-carto/ol';
import { ExternalLinkComponent } from '@igo2/sdg-common';

import { default as olGeoJSON } from 'ol/format/GeoJSON.js';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { XYZ } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import CircleStyle from 'ol/style/Circle.js';
import Stroke from 'ol/style/Stroke.js';
import Style from 'ol/style/Style.js';

import type { GeoJSON } from 'geojson';
import { ExampleViewerComponent } from 'projects/demo/src/app/components';
import { AppTranslationService } from 'projects/demo/src/app/config/translation/translation.service';

const geojson: GeoJSON = {
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

const BASEMAP = () =>
  new TileLayer({
    source: new XYZ({
      maxZoom: 19,
      crossOrigin: 'anonymous',
      attributions:
        "© <a href='http://www.droitauteur.gouv.qc.ca/copyright.php' target='_blank'><img src='https://geoegl.msp.gouv.qc.ca/gouvouvert/public/images/quebec/gouv_qc_logo.png' width='64' height='14'>Gouvernement du Québec</a> / <a href='https://www.igouverte.org/' target='_blank'>IGO2</a>",
      url: 'https://geoegl.msp.gouv.qc.ca/apis/carto/tms/1.0.0/carte_gouv_qc_ro@EPSG_3857/{z}/{x}/{-y}.png'
    })
  });

@Component({
  selector: 'app-reference-map',
  imports: [
    SdgOlReferenceMapComponent,
    ExampleViewerComponent,
    ExternalLinkComponent
  ],
  providers: [
    provideMap(
      withMapOptions({
        translation: {
          key: 'showcasesCarto',
          service: AppTranslationService
        }
      })
    )
  ],
  templateUrl: './reference-map.component.html',
  styleUrl: './reference-map.component.scss'
})
export class ReferenceMapDemoComponent {
  map1: IOlMapOptions;
  map2: IOlMapOptions;
  example = CODE_EXAMPLE;

  constructor() {
    // This equal to the default options of the StaticMapComponent
    this.map1 = {
      view: {
        zoom: 6,
        center: [-71.8, 47.1]
      },
      layers: [BASEMAP()]
    };

    this.map2 = {
      view: {
        zoom: 6,
        center: [-71.8, 47.1]
      },
      layers: [
        BASEMAP(),
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
            }).readFeatures(geojson)
          })
        })
      ]
    };
  }
}

const CODE_EXAMPLE = `
@Component({
  ...,
  providers: [
    provideMap(
      withMapOptions(
        {
          translationKey: 'showcasesCarto', // See the translation file fr.json
          helpMessageDuration: 2000
        }
      )
    )
  ]
})
`;
