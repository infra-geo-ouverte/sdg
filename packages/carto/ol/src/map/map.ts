import { ISdgMap } from '@igo2/sdg-carto';
import { ObjectUtils } from '@igo2/utils';

import Collection from 'ol/Collection';
import olMap from 'ol/Map';
import { ObjectEvent } from 'ol/Object';
import olView, { AnimationOptions, ViewOptions } from 'ol/View';
import View from 'ol/View';
import { Extent } from 'ol/extent';
import { Interaction } from 'ol/interaction';
import { DefaultsOptions, defaults } from 'ol/interaction/defaults';
import { fromLonLat } from 'ol/proj';

import { HasEventTargetAddRemove } from 'rxjs/internal/observable/fromEvent';

import { IOlMapOptions, IOlViewOptions } from './map.interface';

const DEFAULT_OPTIONS: Partial<IOlMapOptions> = {
  view: {
    animation: { duration: 400 }
  }
};

export class SdgOlMap implements ISdgMap<olMap> {
  readonly options: IOlMapOptions;

  engine: olMap;
  initialExtent: Extent | undefined;

  constructor(options: IOlMapOptions) {
    this.options = ObjectUtils.mergeDeep(DEFAULT_OPTIONS, options);

    this.engine = new olMap({
      interactions: this.getInteractions(),
      controls: [],
      layers: this.options.layers,
      view: new View(this.options.view)
    });

    this.setView(this.options.view || {});
  }

  get view(): View {
    return this.engine.getView();
  }

  setInitialExtent(extent?: Extent): void {
    this.initialExtent = extent ? extent : this.getExtent();
  }

  getExtent(): Extent {
    return this.view.calculateExtent(this.engine.getSize());
  }

  getMovementTarget(): HasEventTargetAddRemove<ObjectEvent> {
    return this.view;
  }

  getRotationDegree(): number {
    return (this.view.getRotation() * 180) / Math.PI;
  }

  fit(extent: Extent): void {
    this.view.fit(extent, this.options.view.animation);
  }

  setTarget(id: string | HTMLElement | undefined): void {
    this.engine.setTarget(id);
  }

  updateView(options: IOlViewOptions): void {
    const viewOptions: IOlViewOptions = {
      ...this.view.getProperties(),
      ...options
    };

    if (options.zoom && options.resolution == null) {
      viewOptions.resolution = undefined;
    }

    this.setView(viewOptions);
  }

  /**
   * Set the map view
   * @param options Map view options
   */
  setView(options: IOlViewOptions): void {
    const viewOptions: ViewOptions = { constrainResolution: true, ...options };
    if (options.center) {
      viewOptions.center = fromLonLat(options.center, options.projection);
    }

    this.engine.setView(new olView(viewOptions));
  }

  goTo(options: AnimationOptions): void {
    this.view.cancelAnimations();

    const optionsComputed: AnimationOptions = {
      ...this.options.view.animation,
      ...options
    };
    this.view.animate(optionsComputed);
  }

  getZoom(): number | undefined {
    return this.view.getZoom();
  }

  getMinZoom(): number {
    return this.view.getMinZoom();
  }

  getMaxZoom(): number {
    return this.view.getMaxZoom();
  }

  removeInteration<T extends Interaction>(
    interactions: Collection<Interaction>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    instanceType: new (...args: any[]) => T
  ): void {
    const interactionToRemove = interactions
      .getArray()
      .find((item) => item instanceof instanceType);
    if (interactionToRemove) {
      interactions.remove(interactionToRemove);
    }
  }

  private getInteractions(): Collection<Interaction> {
    let interactions: DefaultsOptions = {};
    if (this.options.interactions === false) {
      interactions = {
        altShiftDragRotate: false,
        doubleClickZoom: false,
        keyboard: false,
        mouseWheelZoom: false,
        shiftDragZoom: false,
        dragPan: false,
        pinchRotate: false,
        pinchZoom: false
      };
    }

    return defaults(interactions);
  }
}
