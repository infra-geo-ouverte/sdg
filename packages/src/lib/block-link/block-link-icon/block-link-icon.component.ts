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
import { BlockLinkSection } from '../block-link.interface';

@Component({
  selector: 'sdg-block-link-icon',
  imports: [MatIconModule, AnchorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './block-link-icon.component.html',
  styleUrls: ['./block-link-icon.component.scss']
})
export class BlockLinkIconComponent {
  readonly path = input.required<BlockLinkSection['path']>();
  readonly icon = input.required<BlockLinkSection['icon']>();
  readonly description = input<BlockLinkSection['description']>();

  externalPath: Signal<boolean | undefined> = computed(() => {
    if (!this.path()) {
      return;
    }
    return pathIsExternal(this.path());
  });
}
