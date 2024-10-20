import { NgIf } from '@angular/common';
import { Component, HostBinding, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

const GITHUB_PATH = 'https://github.com/infra-geo-ouverte/sdg/tree/next';

const CODE_PATH = `${GITHUB_PATH}/packages/sdg/src/lib`;
const DEMO_SHOWCASES_PATH = `${GITHUB_PATH}/projects/demo/src/app/pages/components/showcases`;

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
    return `${CODE_PATH}/${this.codeFolder()}`;
  }

  get configUrl() {
    return `${DEMO_SHOWCASES_PATH}/${this.configFolder()}`;
  }
}
