import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  computed,
  input
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { pathIsExternal } from '@igo2/sdg/core';

import { BlockLinkSubsection } from '../block-link.interface';

@Component({
  selector: 'sdg-block-link-subsection',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './block-link-subsection.component.html',
  styleUrls: ['./block-link-subsection.component.scss']
})
export class BlockLinkSubsectionComponent {
  subsection = input.required<BlockLinkSubsection>();

  externalPath: Signal<boolean | undefined> = computed(() => {
    const path = this.subsection().path;
    if (!path) {
      return;
    }
    return pathIsExternal(path);
  });
}
