import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal
} from '@angular/core';

import { SdgMapBrowser } from '@igo2/sdg-carto';

import olMap from 'ol/Map';
import View from 'ol/View';
import { defaults } from 'ol/interaction/defaults';
import Layer from 'ol/layer/Layer';

import { SdgOlMap } from '..';

@Component({
  selector: 'sdg-ol-mini-basemap',
  templateUrl: './mini-basemap.component.html',
  styleUrl: './mini-basemap.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SdgMapBrowser]
})
export class SdgOlMiniBasemap implements AfterViewInit {
  readonly parentMap = input.required<SdgOlMap>();
  readonly basemap = input.required<Layer>();
  readonly title = input<string>();
  readonly display = input<boolean>(true);
  readonly disabled = input<boolean>(false);

  readonly basemapSelect = output<Layer>();

  readonly miniMap = signal<SdgOlMap | undefined>(undefined);

  ngAfterViewInit(): void {
    const parentView = this.parentMap().view;

    const miniOlMap = new olMap({
      interactions: defaults({
        altShiftDragRotate: false,
        doubleClickZoom: false,
        keyboard: false,
        mouseWheelZoom: false,
        shiftDragZoom: false,
        dragPan: false,
        pinchRotate: false,
        pinchZoom: false
      }),
      controls: [],
      layers: [this.cloneLayer(this.basemap())],
      view: new View({
        center: parentView.getCenter(),
        zoom: parentView.getZoom(),
        projection: parentView.getProjection(),
        minZoom: parentView.getMinZoom(),
        maxZoom: parentView.getMaxZoom()
      })
    });

    // Sync view with parent map
    parentView.on(['change:center', 'change:resolution'], () => {
      const miniView = miniOlMap.getView();
      miniView.setCenter(parentView.getCenter());
      miniView.setZoom(parentView.getZoom()!);
    });

    // Create a lightweight SdgOlMap wrapper
    const sdgMiniMap = Object.create(SdgOlMap.prototype) as SdgOlMap;
    Object.defineProperty(sdgMiniMap, 'engine', {
      value: miniOlMap,
      writable: true
    });
    Object.defineProperty(sdgMiniMap, 'options', {
      value: { view: {}, interactions: false },
      writable: false
    });
    sdgMiniMap.setTarget = (id: string) => miniOlMap.setTarget(id);
    sdgMiniMap.setInitialExtent = () => {};
    sdgMiniMap.updateView = () => {};

    this.miniMap.set(sdgMiniMap);
  }

  selectBasemap(): void {
    if (!this.disabled()) {
      this.basemapSelect.emit(this.basemap());
    }
  }

  private cloneLayer(layer: Layer): Layer {
    const source = layer.getSource();
    const LayerConstructor = layer.constructor as new (
      options: unknown
    ) => Layer;
    return new LayerConstructor({
      source,
      opacity: layer.getOpacity(),
      visible: true
    });
  }
}
