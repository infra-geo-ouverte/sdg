import {
  AfterViewInit,
  Component,
  computed,
  inject,
  input
} from '@angular/core';

import hljs from 'highlight.js';

import { AppService } from '../../app.service';

@Component({
  selector: 'app-docs-code',
  imports: [],
  template: '<pre><code [class]="className()">{{code()}}</code></pre>',
  styleUrl: './docs-code.component.scss'
})
export class DocsCodeComponent implements AfterViewInit {
  private appService = inject(AppService);

  readonly code = input.required<string>();
  readonly lang = input.required<string>();

  className = computed(() => {
    const baseClass = `language-${this.lang()}`;
    return this.appService.isDarkMode() ? `${baseClass} dark` : baseClass;
  });

  constructor() {
    hljs.highlightAll();
  }

  ngAfterViewInit(): void {
    hljs.highlightAll();
  }
}
