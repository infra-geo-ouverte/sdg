import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  input,
  viewChild
} from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { IMapFooterAttribution } from '../../map/map.interface';
import { SdgFullMapSkeletonFooter } from '../footer/full-map-footer.component';
import { PanelService } from '../shared/panel.service';

const SWIPE_THRESHOLD = 30;

@Component({
  selector: 'sdg-full-map-skeleton-bottom-sheet',
  imports: [MatIconModule, SdgFullMapSkeletonFooter, MatDivider],
  templateUrl: './full-map-bottom-sheet.component.html',
  styleUrl: './full-map-bottom-sheet.component.scss'
})
export class SdgFullMapSkeletonBottomSheet implements AfterViewInit {
  panelService = inject(PanelService);

  readonly attribution = input.required<IMapFooterAttribution>();

  readonly bottomSheetHeaderRef =
    viewChild<ElementRef<HTMLDivElement>>('bottomSheetHeader');
  expandedHeight: string | undefined;

  private touchStartY = 0;

  constructor() {
    this.panelService.expanded.set(false);
  }

  ngAfterViewInit() {
    const searchBarHeight =
      this.bottomSheetHeaderRef()?.nativeElement.offsetHeight ?? 0;
    this.expandedHeight = `calc((100% * 2 / 3) - ${searchBarHeight}px)`;
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartY = event.touches[0].clientY;
  }

  onTouchEnd(event: TouchEvent): void {
    const touchEndY = event.changedTouches[0].clientY;
    const deltaY = this.touchStartY - touchEndY;

    if (deltaY > SWIPE_THRESHOLD && !this.panelService.expanded()) {
      this.panelService.expanded.set(true);
    } else if (deltaY < -SWIPE_THRESHOLD && this.panelService.expanded()) {
      this.panelService.expanded.set(false);
    }
  }
}
