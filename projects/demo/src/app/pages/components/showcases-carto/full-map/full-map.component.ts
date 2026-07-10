import { Component, OnInit, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import {
  Extent,
  PanelService,
  SdgPanelContentDirective
} from '@igo2/sdg-carto';
import { SdgOlFullMap, SdgOlFullMapOptions } from '@igo2/sdg-carto/ol';
import { BreakpointService, ExternalLinkComponent } from '@igo2/sdg-common';

import {
  IMAGERY_BASEMAP,
  TOPO_BASEMAP
} from 'packages/carto/ol/src/shared/layer';

import { ExampleViewerComponent } from '../../../../components';
import { FullMapDialogComponent } from './full-map-dialog.component';

const QUEBEC_EXTENT_3857: Extent = [
  -8794239.772668611, 5623095.918935596, -6334079.026137266, 8995581.929741584
] as const;

const MAP_CONFIG: SdgOlFullMapOptions = {
  view: {
    projection: 'EPSG:3857',
    center: [-71.636918, 54.784257],
    zoom: 5
  },
  basemaps: [TOPO_BASEMAP, IMAGERY_BASEMAP],
  legend: true,
  search: true,
  navigation: {
    geolocation: true,
    home: {
      extent: QUEBEC_EXTENT_3857
    },
    rotation: true,
    zoom: true,
    scaleLine: true
  },
  footer: {
    firstPublicationDate: '2024',
    organization: {
      name: 'Ministère de la Sécurité intérieure',
      url: 'https://www.securiteinterieure.gouv.qc.ca/'
    }
  }
};

@Component({
  selector: 'app-full-map',
  imports: [
    ExternalLinkComponent,
    ExampleViewerComponent,
    SdgOlFullMap,
    SdgPanelContentDirective,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './full-map.component.html',
  styleUrl: './full-map.component.scss'
})
export class FullMapDemoComponent implements OnInit {
  private panelService = inject(PanelService);
  private breakpointService = inject(BreakpointService);
  private dialog = inject(MatDialog);

  readonly options = signal<SdgOlFullMapOptions>(MAP_CONFIG);

  get isHandset() {
    return this.breakpointService.isHandset;
  }

  ngOnInit(): void {
    if (this.isHandset()) {
      this.panelService.expanded.set(false);
    }
  }

  openFullscreen(): void {
    this.dialog.open(FullMapDialogComponent, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'full-screen-dialog',
      data: {
        options: this.options(),
        isHandset: this.isHandset()
      }
    });
  }
}
