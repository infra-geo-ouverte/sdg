import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import {
  Component,
  InjectionToken,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
  viewChild
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Subscription } from 'rxjs';

import { WithLabels } from '../shared';

export interface PopoverLabels {
  closeTooltip: string;
  openTooltip: string;
}

export const SDG_POPOVER_LABELS = new InjectionToken<PopoverLabels>(
  'SDG_POPOVER_LABELS'
);

const DEFAULT_LABELS: PopoverLabels = {
  closeTooltip: 'Fermer',
  openTooltip: "Ouvrir l'infobulle"
};

let uniqueId = 0;

export type PopoverPosition = 'left' | 'right' | 'top' | 'bottom';
export type PopoverIcon = 'info' | 'help';

const POSITIONS: Readonly<Record<PopoverPosition, ConnectedPosition>> = {
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
  selector: 'sdg-popover',
  imports: [MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './popover.html',
  styleUrls: ['./popover.scss'],
  encapsulation: ViewEncapsulation.None,
  // Prevents the `title` input from leaking as a native title attribute (native tooltip) on the host element
  host: { '[attr.title]': 'null' }
})
export class SdgPopover extends WithLabels<PopoverLabels> implements OnDestroy {
  private readonly overlay = inject(Overlay);
  private readonly scrollDispatcher = inject(ScrollDispatcher);
  private readonly viewContainerRef = inject(ViewContainerRef);

  private readonly content =
    viewChild.required<TemplateRef<unknown>>('popoverContent');

  readonly position = input<PopoverPosition>('right');
  readonly icon = input<PopoverIcon>('info');
  readonly title = input<string>();
  readonly buttonTooltip = input<string>();
  readonly buttonAriaLabel = input<string>();

  protected readonly popoverId = `sdg-popover-${uniqueId++}`;
  protected readonly titleId = `${this.popoverId}-title`;
  protected readonly isOpen = signal(false);
  protected readonly triggerAriaLabel = computed(
    () =>
      this.buttonAriaLabel()?.trim() ||
      this.buttonTooltip()?.trim() ||
      this.labels().openTooltip.trim() ||
      DEFAULT_LABELS.openTooltip
  );
  protected readonly resolvedPosition = signal<PopoverPosition>('right');
  protected readonly arrowOffset = signal('50%');

  private overlayRef?: OverlayRef;
  private subscription?: Subscription;
  private triggerVisibilityObserver?: IntersectionObserver;
  private triggerElement?: HTMLElement;

  constructor() {
    super(DEFAULT_LABELS, SDG_POPOVER_LABELS);
  }

  toggle(event: MouseEvent): void {
    if (this.overlayRef) {
      this.close();
      return;
    }

    const trigger = event.currentTarget;
    if (!(trigger instanceof HTMLElement)) {
      return;
    }

    this.triggerElement = trigger;
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
    this.subscription = new Subscription();
    this.subscription.add(
      positionStrategy.positionChanges.subscribe(({ connectionPair }) => {
        this.resolvedPosition.set(this.getPosition(connectionPair));
        this.updateArrowOffset(trigger);
      })
    );
    this.subscription.add(
      this.scrollDispatcher.scrolled().subscribe(() => {
        requestAnimationFrame(() => this.updateArrowOffset(trigger));
      })
    );
    this.subscription.add(
      this.overlayRef.keydownEvents().subscribe((event) => {
        if (event.key === 'Escape') {
          this.close();
        }
      })
    );
    this.subscription.add(
      this.overlayRef.outsidePointerEvents().subscribe((pointerEvent) => {
        if (
          pointerEvent.target instanceof Node &&
          !trigger.contains(pointerEvent.target)
        ) {
          this.close({ restoreFocus: false });
        }
      })
    );
    this.overlayRef.attach(
      new TemplatePortal(this.content(), this.viewContainerRef)
    );
    this.isOpen.set(true);
    this.observeTriggerVisibility(trigger);
  }

  close(options?: { restoreFocus?: boolean }): void {
    const restoreFocus = options?.restoreFocus ?? true;

    this.triggerVisibilityObserver?.disconnect();
    this.triggerVisibilityObserver = undefined;
    this.subscription?.unsubscribe();
    this.subscription = undefined;
    this.overlayRef?.dispose();
    this.overlayRef = undefined;
    this.isOpen.set(false);

    if (restoreFocus && this.triggerElement?.isConnected) {
      this.triggerElement.focus({ preventScroll: true });
    }

    this.triggerElement = undefined;
  }

  ngOnDestroy(): void {
    this.close({ restoreFocus: false });
  }

  private observeTriggerVisibility(trigger: HTMLElement): void {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.triggerVisibilityObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        this.close({ restoreFocus: false });
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

  private getPosition(connectionPair: ConnectedPosition): PopoverPosition {
    if (connectionPair.originX === 'end') {
      return 'right';
    }
    if (connectionPair.originX === 'start') {
      return 'left';
    }
    if (connectionPair.overlayY === 'bottom') {
      return 'top';
    }
    return 'bottom';
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
