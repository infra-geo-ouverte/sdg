import Feature from 'ol/Feature';
import { Coordinate } from 'ol/coordinate';
import Circle from 'ol/geom/Circle';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';

import { Subscription } from 'rxjs';

import { GeolocationBase, GeolocationOptions } from '../../../shared';
import type { SdgOlMap } from '../map';

const DEFAULT_OPTIONS: GeolocationOptions = {
  tracking: false,
  trackingOptions: {
    enableHighAccuracy: true
  }
};

export class SdgOlGeolocationController extends GeolocationBase {
  private layer: VectorLayer<VectorSource> | undefined;
  private subscriptions$$: Subscription | undefined;

  constructor(public map: SdgOlMap) {
    super(DEFAULT_OPTIONS);
  }

  zoomToPosition(position: GeolocationPosition): void {
    const coordinates = position.coords;
    const center = this.transformPosition(coordinates);

    const circle = new Circle(center, coordinates.accuracy);

    const extent = circle.getExtent();

    this.map.fit(extent);
  }

  showPosition(): void {
    const positionFeature = new Feature();
    const accuracyFeature = new Feature();

    positionFeature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: '#3399CC'
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 2
          })
        })
      })
    );

    this.layer = this.createLayer([positionFeature, accuracyFeature]);

    this.subscriptions$$ = this.addFeatureOnLocationChanges(
      positionFeature,
      accuracyFeature
    );
  }

  unshowPosition(): void {
    this.subscriptions$$?.unsubscribe();

    this.subscriptions$$ = undefined;

    this.layer?.getSource()?.clear();
    this.map.engine.removeLayer(this.layer!);
    this.layer = undefined;
  }

  private addFeatureOnLocationChanges(
    positionFeature: Feature,
    accuracyFeature: Feature
  ): Subscription {
    return this.position$.subscribe((position) => {
      const coordinates = position?.coords;
      positionFeature.setGeometry(
        coordinates ? new Point(this.transformPosition(coordinates)) : undefined
      );
      accuracyFeature.setGeometry(
        coordinates
          ? new Circle(
              this.transformPosition(coordinates),
              coordinates!.accuracy
            )
          : undefined
      );
    });
  }
  private createLayer(features: Feature[]): VectorLayer<VectorSource> {
    return new VectorLayer({
      map: this.map.engine,
      source: new VectorSource({
        features
      })
    });
  }

  private transformPosition(coordinates: GeolocationCoordinates): Coordinate {
    return fromLonLat([coordinates.longitude, coordinates.latitude]);
  }
}
