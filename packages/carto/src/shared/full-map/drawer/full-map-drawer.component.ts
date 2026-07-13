import { Component, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
  MatSidenavModule
} from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';

import { TranslationPipe } from '@igo2/sdg-i18n';

import { IMapFooterAttribution } from '../..';
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
    TranslationPipe,
    SdgFullMapSkeletonFooter
  ],
  templateUrl: './full-map-drawer.component.html',
  styleUrl: './full-map-drawer.component.scss'
})
export class SdgFullMapSkeletonDrawer {
  panelService = inject(PanelService);
  readonly attribution = input.required<IMapFooterAttribution>();
  readonly isHandset = input.required<boolean>();
  readonly search = input(true);
}
