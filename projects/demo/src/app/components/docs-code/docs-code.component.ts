import { AfterViewInit, Component, computed, input } from '@angular/core';

import hljs from 'highlight.js';

import { AppService } from '../../app.service';

@Component({
  selector: 'app-docs-code',
  imports: [],
  template: '<pre><code [class]="className()">{{code()}}</code></pre>',
  styleUrl: './docs-code.component.scss'
})
export class DocsCodeComponent implements AfterViewInit {
  readonly code = input.required<string>();
  readonly lang = input.required<string>();
  className = computed(() => {
    const baseClass = `language-${this.lang()}`;
    return this.appService.isDarkMode() ? `${baseClass} dark` : baseClass;
  });

  constructor(private appService: AppService) {
    hljs.highlightAll();
  }

  ngAfterViewInit(): void {
    hljs.highlightAll();
  }
}
