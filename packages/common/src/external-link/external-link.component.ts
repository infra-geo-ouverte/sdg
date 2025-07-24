import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { isSafeUrl, pathIsExternal } from '@igo2/sdg-core';

@Component({
  selector: 'sdg-external-link',
  imports: [MatIcon],
  template: `<a [href]="url()" target="_blank">
    <span>{{ text() }}</span>
    <mat-icon>
      <!-- icon name: open_in_new -->
      <svg viewBox="0 -960 960 960">
        <path
          d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"
        />
      </svg>
    </mat-icon>
  </a>`,
  styles: `
    span {
      margin-right: 2px;
    }

    mat-icon {
      width: 13px;
      height: 13px;
      font-size: 13px;
      margin-right: 2px;
    }
  `
})
export class ExternalLinkComponent {
  readonly text = input.required<string>();
  readonly url = input.required<string, string>({
    transform: this.urlValidation
  });

  private urlValidation(url: string): string {
    if (!isSafeUrl(url)) {
      throw new Error('Invalid URL protocol detected');
    }

    if (!pathIsExternal(url)) {
      throw new Error('URL is not external');
    }
    return url;
  }
}
