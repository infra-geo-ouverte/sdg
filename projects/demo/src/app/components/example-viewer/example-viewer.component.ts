import { Component, HostBinding, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

const GITHUB_PATH = 'https://github.com/infra-geo-ouverte/sdg/tree/next';

const COMMON_CODE_PATH = `${GITHUB_PATH}/packages/src/lib`;
const CARTO_CODE_PATH = `${GITHUB_PATH}/packages/geo/src`;
const DEMO_SHOWCASES_PATH = `${GITHUB_PATH}/projects/demo/src/app/pages/components/showcases`;
const DEMO_SHOWCASES_CARTO_PATH = `${GITHUB_PATH}/projects/demo/src/app/pages/components/showcases-carto`;

type ShowcaseType = 'common' | 'carto';
@Component({
  selector: 'app-example-viewer',
  imports: [
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
  readonly title = input.required<string>();
  readonly showcase = input<ShowcaseType>('common');
  readonly codeFolder = input<string>();
  readonly configFolder = input<string>();

  @HostBinding('class.example-viewer') baseClass = true;

  get codeUrl() {
    return `${this.showcase() === 'common' ? COMMON_CODE_PATH : CARTO_CODE_PATH}/${this.codeFolder()}`;
  }

  get configUrl() {
    return `${this.showcase() === 'common' ? DEMO_SHOWCASES_PATH : DEMO_SHOWCASES_CARTO_PATH}/${this.configFolder()}`;
  }
}
