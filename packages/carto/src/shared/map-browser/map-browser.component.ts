import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  effect,
  input
} from '@angular/core';

import { ISdgMap, IViewBaseOptions } from '../map.interface';

@Component({
  selector: 'sdg-map-browser',
  templateUrl: './map-browser.component.html',
  styleUrls: ['./map-browser.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SdgMapBrowserComponent implements AfterViewInit, OnDestroy {
  readonly map = input.required<ISdgMap<unknown>>();
  readonly view = input<IViewBaseOptions>();

  readonly id = `map-target-${crypto.randomUUID()}`;

  constructor() {
    effect(() => {
      const view = this.view();
      if (view) {
        this.map().updateView(view);
      }
    });
  }

  ngAfterViewInit() {
    this.map().setTarget(this.id);
    this.map().setInitialExtent();
  }

  ngOnDestroy() {
    this.map().setTarget(undefined);
  }
}
