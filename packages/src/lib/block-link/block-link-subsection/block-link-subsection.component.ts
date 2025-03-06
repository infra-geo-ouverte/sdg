import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  computed,
  input
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { pathIsExternal } from '@igo2/sdg/core';

import { AnchorComponent } from '../../shared/anchor/anchor.component';
import { BlockLinkSubsection } from '../block-link.interface';

@Component({
  selector: 'sdg-block-link-subsection',
  imports: [MatIconModule, AnchorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './block-link-subsection.component.html',
  styleUrls: ['./block-link-subsection.component.scss']
})
export class BlockLinkSubsectionComponent {
  readonly subsection = input.required<BlockLinkSubsection>();

  readonly externalPath: Signal<boolean | undefined> = computed(() => {
    const path = this.subsection().path;
    if (!path) {
      return;
    }
    return pathIsExternal(path);
  });
}
