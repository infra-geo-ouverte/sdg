import { ISdgMap, SearchResult } from '@igo2/sdg-carto';

import Feature from 'ol/Feature';
import olMap from 'ol/Map';
import GeoJSON from 'ol/format/GeoJSON';
import Geometry from 'ol/geom/Geometry';
import VectorLayer from 'ol/layer/Vector';
import { transformExtent } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import Fill from 'ol/style/Fill';
import Icon from 'ol/style/Icon';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';

const SOURCE_PROJECTION = 'EPSG:4326';
const MAP_PROJECTION = 'EPSG:3857';
const DEFAULT_POINT_ZOOM = 14;
const FIT_PADDING = [50, 50, 50, 50] as [number, number, number, number];

const MARKER_COLOR = '#095797';
const MARKER_OUTLINE_COLOR = '#A5B9C9';
const FILL_COLOR = 'rgba(20, 114, 191, 0.2)'; // #1472BF at fillOpacity 0.2
const STROKE_COLOR = 'cyan';
const STROKE_WIDTH = 1.5;

// Teardrop pin: circle centred at (12, 9), tip at bottom of 24×24 viewBox.
// anchor [0.5, 1] places the tip exactly on the feature coordinate.
const PIN_SVG: string = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
  <path fill="${MARKER_COLOR}" stroke="${MARKER_OUTLINE_COLOR}" stroke-width="0.8"
    d="M12 1A8 8 0 0 0 4 9C4 15.5 12 23 12 23C12 23 20 15.5 20 9A8 8 0 0 0 12 1Z"/>
  <circle fill="white" fill-opacity="0.9" cx="12" cy="9" r="3"/>
</svg>
`;

const POINT_STYLE = new Style({
  image: new Icon({
    src: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(PIN_SVG),
    anchor: [0.5, 1],
    anchorXUnits: 'fraction',
    anchorYUnits: 'fraction'
  })
});

const AREA_STYLE = new Style({
  fill: new Fill({ color: FILL_COLOR }),
  stroke: new Stroke({ color: STROKE_COLOR, width: STROKE_WIDTH })
});

export class SdgOlSearchHighlight {
  private layer: VectorLayer<VectorSource> | undefined;
  private readonly format = new GeoJSON();
  private readonly olMap: olMap;

  constructor(private readonly map: ISdgMap) {
    this.olMap = map.engine as olMap;
  }

  highlight(result: SearchResult): void {
    this.clear();

    if (!result.geometry && !result.extent) {
      return;
    }

    if (result.geometry) {
      const feature = this.format.readFeature(
        { type: 'Feature', geometry: result.geometry },
        {
          dataProjection: SOURCE_PROJECTION,
          featureProjection: MAP_PROJECTION
        }
      ) as Feature<Geometry>;

      feature.setStyle(resolveStyle(feature));

      const source = new VectorSource({ features: [feature] });
      this.layer = new VectorLayer({
        source,
        map: this.olMap,
        zIndex: 999
      });

      const isPoint = result.geometry.type === 'Point';
      const extent = result.extent
        ? transformExtent(result.extent, SOURCE_PROJECTION, MAP_PROJECTION)
        : feature.getGeometry()?.getExtent();

      if (extent) {
        this.fitToExtent(extent, isPoint);
      }
    } else if (result.extent) {
      const extent = transformExtent(
        result.extent,
        SOURCE_PROJECTION,
        MAP_PROJECTION
      );
      this.fitToExtent(extent, false);
    }
  }

  clear(): void {
    if (this.layer) {
      this.layer.getSource()?.clear();
      this.olMap.removeLayer(this.layer);
      this.layer = undefined;
    }
  }

  private fitToExtent(extent: number[], isPoint: boolean): void {
    const animationOptions = this.map.options.view.animation;
    this.olMap.getView().fit(extent, {
      duration: animationOptions?.duration,
      padding: FIT_PADDING,
      ...(isPoint ? { maxZoom: DEFAULT_POINT_ZOOM } : {})
    });
  }
}

function resolveStyle(feature: Feature<Geometry>): Style {
  const type = feature.getGeometry()?.getType();
  return type === 'Point' || type === 'MultiPoint' ? POINT_STYLE : AREA_STYLE;
}
