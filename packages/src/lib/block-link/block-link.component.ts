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

import { BlockLinkSubsectionComponent } from './block-link-subsection/block-link-subsection.component';
import { Section } from './block-link.interface';

@Component({
  selector: 'sdg-block-link',
  standalone: true,
  imports: [MatIconModule, RouterLink, BlockLinkSubsectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './block-link.component.html',
  styleUrls: ['./block-link.component.scss']
})
export class BlockLinkComponent {
  section = input.required<Section>();
  isHandset = input<boolean>();

  externalPath: Signal<boolean | undefined> = computed(() => {
    const path = this.section().path;
    if (!path) {
      return;
    }
    return pathIsExternal(path);
  });
}
