import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  inject,
  input,
  viewChild
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { IMapFooterAttribution } from '../../map/map.interface';
import { SdgFullMapSkeletonFooter } from '../footer/full-map-footer.component';
import { PanelService } from '../shared/panel.service';

const SWIPE_THRESHOLD = 30;

@Component({
  selector: 'sdg-full-map-skeleton-bottom-sheet',
  imports: [MatIconModule, SdgFullMapSkeletonFooter],
  templateUrl: './full-map-bottom-sheet.component.html',
  styleUrl: './full-map-bottom-sheet.component.scss'
})
export class SdgFullMapSkeletonBottomSheet implements AfterViewInit, OnDestroy {
  panelService = inject(PanelService);

  readonly attribution = input.required<IMapFooterAttribution>();

  readonly bottomSheetHeaderRef =
    viewChild<ElementRef<HTMLDivElement>>('bottomSheetHeader');
  readonly wrapperRef =
    viewChild<ElementRef<HTMLDivElement>>('bottomSheetWrapper');
  expandedHeight: string | undefined;

  private touchStartY = 0;

  constructor() {
    this.panelService.expanded.set(false);
  }

  ngAfterViewInit() {
    const headerEl = this.bottomSheetHeaderRef()?.nativeElement;
    const headerHeight = headerEl?.offsetHeight ?? 0;
    this.expandedHeight = `calc((100% * 2 / 3) - ${headerHeight}px)`;

    this.panelService.visibleHeight.set(headerHeight);

    const wrapperEl = this.wrapperRef()?.nativeElement;
    if (wrapperEl) {
      wrapperEl.addEventListener('transitionend', () => {
        this.panelService.visibleHeight.set(
          headerHeight + wrapperEl.offsetHeight
        );
      });
    }
  }

  ngOnDestroy(): void {
    this.panelService.visibleHeight.set(0);
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartY = event.touches[0].clientY;
  }

  onTouchEnd(event: TouchEvent): void {
    const touchEndY = event.changedTouches[0].clientY;
    const deltaY = this.touchStartY - touchEndY;

    const panelExpanded = this.panelService.expanded();

    if (deltaY > SWIPE_THRESHOLD && !panelExpanded) {
      this.panelService.expanded.set(true);
    } else if (deltaY < -SWIPE_THRESHOLD && panelExpanded) {
      this.panelService.expanded.set(false);
    }
  }
}
