import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  input,
  signal
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { labelAttribute } from '@igo2/sdg-i18n';

import { debounceTime, fromEvent } from 'rxjs';

import { ISdgMap } from '../../map.interface';
import type { IZoomButtonLabels } from './zoom-button.interface';

const LABELS_DEFAULT: IZoomButtonLabels = {
  zoomIn: 'Zoom avant',
  zoomOut: 'Zoom arrière'
};

@Component({
  selector: 'sdg-zoom-button',
  templateUrl: './zoom-button.component.html',
  styleUrls: ['./zoom-button.component.scss'],
  imports: [MatButtonModule, MatTooltipModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ZoomButtonComponent implements OnInit {
  map = input.required<ISdgMap>();
  color = input<string>();
  labels = input<IZoomButtonLabels, IZoomButtonLabels | undefined>(
    LABELS_DEFAULT,
    {
      transform: (value) => labelAttribute(value, LABELS_DEFAULT)
    }
  );

  zoom = signal<number>(1);

  maxDisabled = computed<boolean>(() => this.zoom() >= this.map().getMaxZoom());
  minDisabled = computed<boolean>(() => this.zoom() <= this.map().getMinZoom());

  ngOnInit(): void {
    this.zoom.set(this.map().getZoom() ?? 1);

    const target = this.map().getMovementTarget();

    fromEvent(target, 'change:resolution')
      .pipe(debounceTime(100))
      .subscribe(() => {
        const zoom = this.map().getZoom();
        if (zoom != null) {
          this.zoom.set(zoom);
        }
      });
  }

  zoomIn(): void {
    this.zoom.update((zoom) => this.handleZoom(zoom + 1));
  }

  zoomOut(): void {
    this.zoom.update((zoom) => this.handleZoom(zoom - 1));
  }

  private handleZoom(zoom: number) {
    this.map().goTo({
      zoom,
      duration: 250
    });

    return zoom;
  }
}
