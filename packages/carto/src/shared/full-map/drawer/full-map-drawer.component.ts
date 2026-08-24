import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
  MatSidenavModule
} from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';

import { labelAttribute } from '@igo2/sdg-common';

import {
  IMapFooterAttribution,
  SDG_FULL_MAP_PANEL_LABELS_DEFAULT,
  SdgFullMapPanelLabels
} from '../..';
import { SdgFullMapSkeletonFooter } from '../footer/full-map-footer.component';
import { PanelService } from '../shared/panel.service';

@Component({
  selector: 'sdg-full-map-skeleton-drawer',
  imports: [
    MatIconModule,
    MatSidenavModule,
    MatDrawerContainer,
    MatDrawer,
    MatDrawerContent,
    MatTooltipModule,
    SdgFullMapSkeletonFooter,
    MatButtonModule
  ],
  templateUrl: './full-map-drawer.component.html',
  styleUrl: './full-map-drawer.component.scss'
})
export class SdgFullMapSkeletonDrawer {
  panelService = inject(PanelService);
  readonly attribution = input.required<IMapFooterAttribution>();
  readonly isHandset = input.required<boolean>();
  readonly search = input(true);
  readonly labels = input<
    SdgFullMapPanelLabels,
    SdgFullMapPanelLabels | undefined
  >(SDG_FULL_MAP_PANEL_LABELS_DEFAULT, {
    transform: (value) =>
      labelAttribute(value, SDG_FULL_MAP_PANEL_LABELS_DEFAULT)
  });
}
