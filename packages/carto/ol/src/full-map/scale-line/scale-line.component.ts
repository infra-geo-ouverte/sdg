import {
  Component,
  ElementRef,
  afterNextRender,
  inject,
  input
} from '@angular/core';

import ScaleLine from 'ol/control/ScaleLine';

import { SdgOlMap } from '../../shared';

@Component({
  selector: 'sdg-scale-line',
  template: '',
  styles: `
    :host::ng-deep .ol-scale-line {
      background: #fff0;
      border-radius: 4px;

      position: relative;
      transform: none !important;
      left: unset !important;
      bottom: unset !important;
      padding: unset !important;
    }

    :host::ng-deep .ol-scale-line-inner {
      border: 1px solid
        var(--mat-sidenav-content-text-color, var(--mat-sys-on-background));
      border-top: none;
      color: var(
        --mat-sidenav-content-text-color,
        var(--mat-sys-on-background)
      );
      font-size: 10px;
      text-align: center;
      margin: 1px;
      will-change: contents, width;
      transition: all 0.25s;

      text-shadow: unset !important;
      box-shadow: unset !important;
    }
  `
})
export class SdgScaleLine {
  private readonly elementRef = inject<ElementRef>(ElementRef);

  readonly map = input.required<SdgOlMap>();

  constructor() {
    afterNextRender(() => {
      const target = this.elementRef.nativeElement as HTMLElement;
      this.map()?.engine.addControl(new ScaleLine({ target }));
    });
  }
}
