import { AfterViewInit, Component } from '@angular/core';

import { ExternalLinkComponent } from '@igo2/sdg-common';

import hljs from 'highlight.js';

import { BasicScreenComponent } from '../../components';
import { DocsCodeComponent } from '../../components/docs-code/docs-code.component';

@Component({
  selector: 'app-guides',
  imports: [BasicScreenComponent, DocsCodeComponent, ExternalLinkComponent],
  templateUrl: './guides.component.html',
  styleUrl: './guides.component.scss'
})
export class GuidesComponent implements AfterViewInit {
  example1 = example1;
  example2 = example2;
  example3 = example3;

  ngAfterViewInit(): void {
    hljs.highlightAll();
  }
}

const example1 = `// File: theme.scss
@use '@angular/material' as mat;
@use '@igo2/sdg-core' as sdg;

html {
  color-scheme: light;

  @include mat.theme(sdg.$material-theme);

  // La propriété boolean permet de générer, pour le thème sombre,
  // ses variantes des variables CSS
  @include sdg.theme(true);
}`;

const example2 = `export interface SdgRoute extends Route {
  isHome?: boolean;
  description?: string;
  children?: SdgRoutes;
  /** Hidden in the primary tabs navigation and in the breadcrumbs */
  hidden?: boolean;
}`;

const example3 = `// File: app.config.ts
provideTranslation(
  [
    withRouterTitleResolver(AppTitleResolver),
    withLanguageFromUrl(),
    withWaitOnI18nReady()
  ],
  {
    loader: {
      prefix: '/locale/'
    }
  }
)`;
