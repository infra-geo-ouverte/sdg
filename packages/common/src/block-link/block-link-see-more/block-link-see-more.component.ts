import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  computed,
  input
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { Language, pathIsExternal } from '@igo2/sdg-core';

import { AnchorComponent } from '../../shared/anchor/anchor.component';
import { BlockLinkSection } from '../block-link.interface';

@Component({
  selector: 'sdg-block-link-see-more',
  imports: [MatIconModule, AnchorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './block-link-see-more.component.html',
  styleUrls: ['./block-link-see-more.component.scss']
})
export class BlockLinkSeeMoreComponent {
  readonly path = input.required<BlockLinkSection['path']>();
  readonly language = input<Language>('fr');

  readonly externalPath: Signal<boolean | undefined> = computed(() => {
    if (!this.path()) {
      return;
    }
    return pathIsExternal(this.path());
  });
}
