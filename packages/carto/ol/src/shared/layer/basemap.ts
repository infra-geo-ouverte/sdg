import BaseLayer from 'ol/layer/Base';
import LayerGroup from 'ol/layer/Group';
import TileLayer from 'ol/layer/Tile';
import { TileWMS, XYZ } from 'ol/source';

/** Built-in basemap identifiers, analogous to Google Maps map type IDs. */
export type BasemapId = 'topo' | 'imagery' | 'hybrid';

const ATTRIBUTIONS =
  "© <a href='http://www.droitauteur.gouv.qc.ca/copyright.php' target='_blank'><img src='https://geoegl.msp.gouv.qc.ca/gouvouvert/public/images/quebec/gouv_qc_logo.png' width='64' height='14'>Gouvernement du Québec</a> / <a href='https://www.igouverte.org/' target='_blank'>IGO2</a>";

function createTopoBasemap(): TileLayer {
  return new TileLayer({
    properties: { title: 'Carte' },
    source: new XYZ({
      attributions: ATTRIBUTIONS,
      crossOrigin: 'anonymous',
      url: 'https://carto.msp.gouv.qc.ca/tms/1.0.0/carte_gouv_qc_public@EPSG_3857/{z}/{x}/{-y}.png'
    })
  });
}

function createImageryBasemap(): TileLayer {
  return new TileLayer({
    properties: { title: 'Imagerie' },
    source: new XYZ({
      crossOrigin: 'anonymous',
      maxZoom: 17,
      attributions: ATTRIBUTIONS,
      url: 'https://carto.msp.gouv.qc.ca/tms/1.0.0/orthos@EPSG_3857/{z}/{x}/{-y}.jpeg'
    })
  });
}

function createHybridBasemap(): LayerGroup {
  return new LayerGroup({
    properties: { title: 'Hybride' },
    layers: [
      new TileLayer({
        source: new XYZ({
          crossOrigin: 'anonymous',
          maxZoom: 17,
          attributions: ATTRIBUTIONS,
          url: 'https://carto.msp.gouv.qc.ca/tms/1.0.0/orthos@EPSG_3857/{z}/{x}/{-y}.jpeg'
        })
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'https://geoegl.msp.gouv.qc.ca/apis/wss/transport.fcgi',
          params: {
            LAYERS: 'fondcarte_reseau_routier',
            FORMAT: 'image/png',
            TRANSPARENT: true
          },
          crossOrigin: 'anonymous'
        })
      })
    ]
  });
}

/**
 * Registry mapping {@link BasemapId} string keys to factory functions.
 * Each call creates a fresh OL layer instance.
 */
export const BASEMAP_REGISTRY: Record<BasemapId, () => BaseLayer> = {
  topo: createTopoBasemap,
  imagery: createImageryBasemap,
  hybrid: createHybridBasemap
};

/**
 * Resolves a mixed array of {@link BasemapId} strings and OL {@link BaseLayer}
 * objects into a plain `BaseLayer[]`.  String keys are looked up in
 * {@link BASEMAP_REGISTRY} and instantiated as fresh layer objects.
 */
export function resolveBasemaps(
  basemaps: (BasemapId | BaseLayer)[]
): BaseLayer[] {
  return basemaps.map((b) =>
    typeof b === 'string' ? BASEMAP_REGISTRY[b]() : b
  );
}
