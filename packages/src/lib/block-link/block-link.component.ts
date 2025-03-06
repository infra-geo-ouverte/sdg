import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  computed,
  input
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { pathIsExternal } from '@igo2/sdg/core';

import { BlockLinkIconComponent } from './block-link-icon/block-link-icon.component';
import { BlockLinkSeeMoreComponent } from './block-link-see-more/block-link-see-more.component';
import { BlockLinkSubsectionComponent } from './block-link-subsection/block-link-subsection.component';
import { BlockLinkTitleDescriptionComponent } from './block-link-title-description/block-link-title-description.component';
import { BlockLinkSection } from './block-link.interface';

@Component({
  selector: 'sdg-block-link',
  imports: [
    MatIconModule,
    BlockLinkSubsectionComponent,
    BlockLinkIconComponent,
    BlockLinkSeeMoreComponent,
    BlockLinkTitleDescriptionComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './block-link.component.html',
  styleUrls: ['./block-link.component.scss']
})
export class BlockLinkComponent {
  readonly section = input.required<BlockLinkSection>();
  readonly isHandset = input.required<boolean>();

  readonly externalPath: Signal<boolean | undefined> = computed(() => {
    const path = this.section().path;
    if (!path) {
      return;
    }
    return pathIsExternal(path);
  });
}
