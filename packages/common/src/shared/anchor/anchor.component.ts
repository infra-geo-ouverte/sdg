import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  computed,
  input
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { pathIsExternal } from '@igo2/sdg-core';

@Component({
  selector: 'sdg-anchor',
  imports: [RouterLink, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './anchor.component.html',
  styleUrls: ['./anchor.component.scss']
})
export class AnchorComponent {
  readonly path = input.required<string>();

  externalPath: Signal<boolean | undefined> = computed(() => {
    if (!this.path()) {
      return;
    }
    return pathIsExternal(this.path());
  });
}
