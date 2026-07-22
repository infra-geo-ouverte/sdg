import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SdgPanelContentDirective } from '@igo2/sdg-carto';
import { SdgOlFullMap, SdgOlFullMapOptions } from '@igo2/sdg-carto/ol';

export interface FullMapDialogData {
  options: SdgOlFullMapOptions;
  isHandset: boolean;
}

@Component({
  selector: 'app-full-map-dialog',
  template: `
    <button
      matIconButton
      mat-dialog-close
      class="full-screen-dialog-close-button"
      color="primary"
      matTooltip="Fermer"
    >
      <mat-icon>close</mat-icon>
    </button>
    <mat-dialog-content class="full-map-dialog-content">
      <sdg-ol-full-map [options]="data.options" [isHandset]="data.isHandset">
        <ng-template sdgPanelContent="legend">
          <div class="template-content">La légende est affichée ici.</div>
        </ng-template>
        <ng-template sdgPanelContent="custom">
          <div class="template-content">
            Ceci est le contenu affiché par défaut.
          </div>
        </ng-template>
      </sdg-ol-full-map>
    </mat-dialog-content>
  `,
  styleUrl: './full-map-dialog.component.scss',
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    SdgOlFullMap,
    SdgPanelContentDirective
  ]
})
export class FullMapDialogComponent {
  readonly data = inject<FullMapDialogData>(MAT_DIALOG_DATA);
}
