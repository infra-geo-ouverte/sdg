import { NgIf } from '@angular/common';
import { Component, HostBinding, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

const SRC_PATH =
  'https://gitlab.forge.gouv.qc.ca/igo2/msp-igo2-lib/tree/master/demo/src';

@Component({
  selector: 'app-example-viewer',
  standalone: true,
  imports: [
    NgIf,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './example-viewer.component.html',
  styleUrls: ['./example-viewer.component.scss']
})
export class ExampleViewerComponent {
  title = input.required<string>();
  codeFolder = input<string>();
  configFolder = input<string>();

  @HostBinding('class.example-viewer') baseClass = true;

  get codeUrl() {
    return `${SRC_PATH}/app/${this.codeFolder()}`;
  }

  get configUrl() {
    return `${SRC_PATH}/${this.configFolder()}`;
  }
}
