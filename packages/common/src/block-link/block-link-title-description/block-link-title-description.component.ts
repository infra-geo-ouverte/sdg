import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  computed,
  input
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { BreakpointService, pathIsExternal } from '@igo2/sdg-core';

import { AnchorComponent } from '../../shared/anchor/anchor.component';
import { BlockLinkSection } from '../block-link.interface';

@Component({
  selector: 'sdg-block-link-title-description',
  imports: [MatIconModule, AnchorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './block-link-title-description.component.html',
  styleUrls: ['./block-link-title-description.component.scss']
})
export class BlockLinkTitleDescriptionComponent {
  readonly section = input.required<BlockLinkSection>();

  isHandset: Signal<boolean>;

  readonly externalPath: Signal<boolean | undefined> = computed(() => {
    const path = this.section().path;
    if (!path) {
      return;
    }
    return pathIsExternal(path);
  });

  constructor(private breakpointService: BreakpointService) {
    this.isHandset = this.breakpointService.isHandset;
  }
}
