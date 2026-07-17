import {
  Component,
  ElementRef,
  afterNextRender,
  booleanAttribute,
  inject,
  input
} from '@angular/core';

import ScaleLine from 'ol/control/ScaleLine';

import { SdgOlMap } from '../../shared';

@Component({
  selector: 'sdg-ol-scale-line',
  template: '',
  styleUrl: './scale-line.component.scss',
  host: {
    '[class.sdg-scale-line-on-map]': 'onMap()'
  }
})
export class SdgOlScaleLine {
  private readonly elementRef = inject<ElementRef>(ElementRef);

  readonly map = input.required<SdgOlMap>();
  readonly onMap = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  constructor() {
    afterNextRender(() => {
      const target = this.elementRef.nativeElement as HTMLElement;
      this.map()?.engine.addControl(new ScaleLine({ target }));
    });
  }
}
