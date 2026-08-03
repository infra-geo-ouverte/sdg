import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import {
  Component,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  inject,
  input,
  signal,
  viewChild
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Subscription } from 'rxjs';

export type TooltipPosition = 'left' | 'right' | 'top' | 'bottom';
export type TooltipIcon = 'info' | 'help';

const POSITIONS: Readonly<Record<TooltipPosition, ConnectedPosition>> = {
  right: {
    originX: 'end',
    originY: 'center',
    overlayX: 'start',
    overlayY: 'center',
    offsetX: 10
  },
  left: {
    originX: 'start',
    originY: 'center',
    overlayX: 'end',
    overlayY: 'center',
    offsetX: -10
  },
  top: {
    originX: 'center',
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom',
    offsetY: -10
  },
  bottom: {
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
    offsetY: 10
  }
};

@Component({
  selector: 'sdg-tooltip',
  imports: [MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnDestroy {
  private readonly overlay = inject(Overlay);
  private readonly scrollDispatcher = inject(ScrollDispatcher);
  private readonly viewContainerRef = inject(ViewContainerRef);

  private readonly content =
    viewChild.required<TemplateRef<unknown>>('tooltipContent');

  readonly position = input<TooltipPosition>('right');
  readonly icon = input<TooltipIcon>('info');
  readonly title = input<string>();
  readonly buttonTooltip = input<string>();

  protected readonly isOpen = signal(false);
  protected readonly resolvedPosition = signal<TooltipPosition>('right');
  protected readonly arrowOffset = signal('50%');

  private overlayRef?: OverlayRef;
  private scrollSubscription?: Subscription;
  private triggerVisibilityObserver?: IntersectionObserver;

  toggle(event: MouseEvent): void {
    if (this.overlayRef) {
      this.close();
      return;
    }

    const trigger = event.currentTarget;
    if (!(trigger instanceof HTMLElement)) {
      return;
    }

    this.resolvedPosition.set(this.position());
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(trigger)
      .withPositions(this.getPositions())
      .withViewportMargin(8);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });
    positionStrategy.positionChanges.subscribe(({ connectionPair }) => {
      this.resolvedPosition.set(this.getPosition(connectionPair));
      this.updateArrowOffset(trigger);
    });
    this.scrollSubscription = this.scrollDispatcher.scrolled().subscribe(() => {
      requestAnimationFrame(() => this.updateArrowOffset(trigger));
    });
    this.overlayRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        this.close();
      }
    });
    this.overlayRef.outsidePointerEvents().subscribe((pointerEvent) => {
      if (
        pointerEvent.target instanceof Node &&
        !trigger.contains(pointerEvent.target)
      ) {
        this.close();
      }
    });
    this.overlayRef.attach(
      new TemplatePortal(this.content(), this.viewContainerRef)
    );
    this.observeTriggerVisibility(trigger);
    this.isOpen.set(true);
  }

  close(): void {
    this.triggerVisibilityObserver?.disconnect();
    this.triggerVisibilityObserver = undefined;
    this.scrollSubscription?.unsubscribe();
    this.scrollSubscription = undefined;
    this.overlayRef?.dispose();
    this.overlayRef = undefined;
    this.isOpen.set(false);
  }

  ngOnDestroy(): void {
    this.close();
  }

  private observeTriggerVisibility(trigger: HTMLElement): void {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.triggerVisibilityObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        this.close();
      }
    });
    this.triggerVisibilityObserver.observe(trigger);
  }

  private getPositions(): ConnectedPosition[] {
    const preferredPosition = this.position();

    return [
      POSITIONS[preferredPosition],
      ...Object.entries(POSITIONS)
        .filter(([position]) => position !== preferredPosition)
        .map(([, position]) => position)
    ];
  }

  private getPosition(connectionPair: ConnectedPosition): TooltipPosition {
    if (connectionPair.originX === 'end') {
      return 'right';
    }
    if (connectionPair.originX === 'start') {
      return 'left';
    }

    return connectionPair.originY === 'top' ? 'top' : 'bottom';
  }

  private updateArrowOffset(trigger: HTMLElement): void {
    const overlayElement = this.overlayRef?.overlayElement;
    if (!overlayElement) {
      return;
    }

    const triggerRect = trigger.getBoundingClientRect();
    const overlayRect = overlayElement.getBoundingClientRect();
    const isHorizontal = ['left', 'right'].includes(this.resolvedPosition());
    const triggerCenter = isHorizontal
      ? triggerRect.top + triggerRect.height / 2
      : triggerRect.left + triggerRect.width / 2;
    const overlayStart = isHorizontal ? overlayRect.top : overlayRect.left;
    const overlaySize = isHorizontal ? overlayRect.height : overlayRect.width;
    const arrowHalfWidth = 10;
    const offset = Math.min(
      Math.max(triggerCenter - overlayStart, arrowHalfWidth),
      overlaySize - arrowHalfWidth
    );

    this.arrowOffset.set(`${offset}px`);
  }
}
