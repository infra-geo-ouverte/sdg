import {
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
  Signal,
  computed,
  input
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { WithLabels, pathIsExternal } from '@igo2/sdg-core';

import { AnchorComponent } from '../../shared/anchor/anchor.component';
import { BlockLinkLabels, BlockLinkSection } from '../block-link.interface';

export const SDG_BLOCK_LINK_LABELS = new InjectionToken<BlockLinkLabels>(
  'SDG_BLOCK_LINK_LABELS'
);

const DEFAULT_LABELS: BlockLinkLabels = {
  seeMore: 'Voir plus'
};

@Component({
  selector: 'sdg-block-link-see-more',
  imports: [MatIconModule, AnchorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './block-link-see-more.component.html',
  styleUrls: ['./block-link-see-more.component.scss']
})
export class BlockLinkSeeMoreComponent extends WithLabels<BlockLinkLabels> {
  readonly path = input.required<BlockLinkSection['path']>();

  readonly externalPath: Signal<boolean | undefined> = computed(() => {
    if (!this.path()) {
      return;
    }
    return pathIsExternal(this.path());
  });

  constructor() {
    super(DEFAULT_LABELS, SDG_BLOCK_LINK_LABELS);
  }
}
