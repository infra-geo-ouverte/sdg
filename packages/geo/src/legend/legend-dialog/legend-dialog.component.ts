import { Component, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogState,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

import { IgoLanguageModule } from '@igo2/core/language';
import { IgoMap, Layer, LayerLegendListComponent } from '@igo2/geo';
import { MapState } from '@igo2/integration';

import { Observable } from 'rxjs';

@Component({
  selector: 'sdg-legend-dialog',
  templateUrl: 'legend-dialog.component.html',
  styleUrls: ['./legend-dialog.component.scss'],
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogActions,
    MatIconButton,
    MatDialogClose,
    MatIcon,
    LayerLegendListComponent,
    IgoLanguageModule
  ]
})
export class LegendDialogComponent implements OnInit {
  public getState?: MatDialogState;
  public mapLayersShownInLegend!: Layer[];

  constructor(private mapState: MapState) {}

  get map(): IgoMap {
    return this.mapState.map;
  }

  get layers$(): Observable<Layer[]> {
    return this.map.layers$;
  }

  ngOnInit() {
    this.mapLayersShownInLegend = this.map.layers.filter(
      (layer) => layer.showInLayerList !== false
    );
  }
}
