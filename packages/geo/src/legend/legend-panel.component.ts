import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  input,
  output
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

import { IgoLanguageModule } from '@igo2/core/language';
import { AnyLayer, IgoMap, LayerLegendListComponent } from '@igo2/geo';

import { Subscription } from 'rxjs';

@Component({
  selector: 'sdg-legend-panel',
  templateUrl: './legend-panel.component.html',
  styleUrls: ['./legend-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatTooltip,
    MatIconButton,
    MatIcon,
    IgoLanguageModule,
    LayerLegendListComponent
  ]
})
export class LegendPanelComponent implements OnInit, OnDestroy {
  map = input.required<IgoMap>();
  closed = output<boolean>();

  public mapLayersShownInLegend: AnyLayer[] = [];
  private layers$$!: Subscription;

  ngOnInit() {
    this.layers$$ = this.map().layerController.all$.subscribe((layers) => {
      this.mapLayersShownInLegend = layers.filter(
        (layer) => layer.showInLayerList !== false
      );
    });
  }

  ngOnDestroy() {
    this.layers$$.unsubscribe();
  }

  close() {
    this.closed.emit(true);
  }
}
