import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';

import { IMapFooterAttribution } from '../map/map.interface';
import { SdgFullMapSkeletonBottomSheet } from './bottom-sheet/full-map-bottom-sheet.component';
import { SdgFullMapSkeletonDrawer } from './drawer/full-map-drawer.component';
import { PanelService } from './shared/panel.service';

@Component({
  selector: 'sdg-full-map-skeleton',
  host: {
    '[style.--sdg-sidepanel-width.px]': 'sidepanelWidth()'
  },
  imports: [
    CommonModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatDialogModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    SdgFullMapSkeletonBottomSheet,
    SdgFullMapSkeletonDrawer
  ],
  templateUrl: './full-map-skeleton.component.html',
  styleUrl: './full-map-skeleton.component.scss'
})
export class SdgFullMapSkeleton implements OnInit {
  panelService = inject(PanelService);

  readonly attribution = input.required<IMapFooterAttribution>();
  readonly isHandset = input.required<boolean>();
  readonly sidepanelWidth = input<number | undefined>(undefined);
  readonly search = input(true);

  ngOnInit(): void {
    if (this.isHandset()) {
      this.panelService.expanded.set(false);
    }
  }
}
