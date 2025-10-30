import { ViewportScroller } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  OnDestroy,
  inject,
  input,
  signal
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'sdg-top-page-button',
  imports: [MatIconModule, MatButtonModule, MatTooltipModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './top-page-button.component.html',
  styleUrls: ['./top-page-button.component.scss']
})
export class TopPageButtonComponent implements OnDestroy {
  private document = inject<Document>(DOCUMENT);
  private viewportScroller = inject(ViewportScroller);

  tooltip = input.required<string>();

  showButton = signal<boolean>(false);
  private currentScrollPositionY = signal<number>(0);

  constructor() {
    this.document.addEventListener('scroll', this.handleScroll);
  }

  private handleScroll = () => {
    const scrollPositionY = this.viewportScroller.getScrollPosition()[1];

    scrollPositionY - this.currentScrollPositionY() < 0 && scrollPositionY !== 0
      ? this.showButton.set(true)
      : this.showButton.set(false);

    this.currentScrollPositionY.set(scrollPositionY);
  };

  scrollToTop(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  ngOnDestroy(): void {
    this.document.removeEventListener('scroll', this.handleScroll);
  }
}
