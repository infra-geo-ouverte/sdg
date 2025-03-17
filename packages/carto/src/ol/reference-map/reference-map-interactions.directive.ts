import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  effect,
  inject,
  input,
  signal
} from '@angular/core';

import { labelAttribute } from '@igo2/sdg/core';

import MapBrowserEvent from 'ol/MapBrowserEvent';
import { platformModifierKeyOnly } from 'ol/events/condition';
import DragPan from 'ol/interaction/DragPan';
import MouseWheelZoom from 'ol/interaction/MouseWheelZoom';

import { Subject, fromEvent, takeUntil } from 'rxjs';

import { IUseTimeout, detectTouchscreen, useTimeout } from '../../utils';
import { SdgOlMap } from '../map';
import { IRestrictionLabels } from './reference-map.interface';

type MapEventRestrictions = 'ctrlScroll' | 'twoFingers';

const RESTRICTION_MESSAGE_DEFAULT_DURATION = 2000;

const LABELS_DEFAULT: IRestrictionLabels = {
  ctrlScroll:
    "Vous pouvez zoomer sur la carte à l'aide de CTRL+Molette de défilement",
  twoFingers: 'Utilisez deux doigts pour déplacer la carte'
};

@Directive({
  selector: '[sdgReferenceMapInteractions]'
})
export class SdgReferenceMapInteractionsDirective
  implements OnInit, OnDestroy, AfterViewInit
{
  readonly map = input.required<SdgOlMap>();

  readonly mesageDuration = input<number, number | undefined>(
    RESTRICTION_MESSAGE_DEFAULT_DURATION,
    {
      transform: (value) => value ?? RESTRICTION_MESSAGE_DEFAULT_DURATION
    }
  );

  readonly labels = input<IRestrictionLabels, IRestrictionLabels | undefined>(
    LABELS_DEFAULT,
    {
      transform: (value) => labelAttribute(value, LABELS_DEFAULT)
    }
  );

  isTouchScreen = signal(false);
  isHover = signal(false);
  mapEventRestriction = signal<MapEventRestrictions | undefined>(undefined);
  restrictionMessageTimeout!: IUseTimeout;

  private platformId = inject(PLATFORM_ID);
  private _destroy$ = new Subject();
  private messageElement: HTMLElement | undefined;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    effect(() => {
      this.isHover() && this.mapEventRestriction()
        ? this.addMessageElement()
        : this.removeMessageElement();
    });
  }

  @HostListener('mouseenter', ['$event']) hostMouseEnter(): void {
    this.onMapEnter();
  }

  @HostListener('mouseleave', ['$event']) hostMouseLeave(): void {
    this.onMapLeave();
  }

  @HostListener('wheel', ['$event']) hostWheel(event: WheelEvent): void {
    this.onMouseWheel(event);
  }

  @HostListener('touchstart', ['$event']) hostTouchStart(): void {
    this.onMapEnter();
  }

  @HostListener('touchend', ['$event']) hostTouchEnd(): void {
    this.onMapLeave();
  }

  ngOnInit(): void {
    this.restrictionMessageTimeout = useTimeout(
      () => this.mapEventRestriction.set(undefined),
      this.mesageDuration()
    );

    if (isPlatformBrowser(this.platformId)) {
      this.isTouchScreen.set(detectTouchscreen());
    }

    this.initStaticInteractions();
  }

  ngAfterViewInit(): void {
    fromEvent(this.map().engine, 'movestart')
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this.resetMapEventState();
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
  }

  private addMessageElement(): void {
    if (this.messageElement) {
      return;
    }
    const target: HTMLElement = this.renderer.createElement('div');
    target.classList.add('map-references-event-restrictions');
    target.setAttribute(
      'style',
      `position: absolute; top: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.3); text-align: center; display: flex; align-items: center; justify-content: center; pointer-events: none;`
    );

    const paragraph: HTMLElement = this.renderer.createElement('p');
    paragraph.setAttribute('style', `font-size: 22px; color: white;`);
    paragraph.textContent = this.labels()[this.mapEventRestriction()!];

    target.appendChild(paragraph);

    this.renderer.appendChild(this.elementRef.nativeElement, target);
    this.messageElement = target;
  }

  private removeMessageElement(): void {
    if (!this.messageElement) {
      return;
    }
    this.renderer.removeChild(
      this.elementRef.nativeElement,
      this.messageElement
    );
    this.messageElement = undefined;
  }

  private onMapEnter(): void {
    this.isHover.set(true);
  }

  private onMapLeave(): void {
    this.isHover.set(false);
    this.resetMapEventState();
  }

  private onMouseWheel(event: WheelEvent): void {
    const keyModifierActive = platformModifierKeyOnly({
      originalEvent: event
    } as MapBrowserEvent<WheelEvent>);
    if (!keyModifierActive) {
      this.mapEventRestriction.set('ctrlScroll');
      this.restrictionMessageTimeout.set();
    }
  }

  private resetMapEventState(): void {
    this.mapEventRestriction.set(undefined);
  }

  private initStaticInteractions(): void {
    const map = this.map();
    const interactions = map.engine.getInteractions();

    map.removeInteration(interactions, DragPan);
    map.removeInteration(interactions, MouseWheelZoom);

    interactions.extend([
      new DragPan({
        condition: (event) => {
          if (this.isTouchScreen()) {
            const pointerCount = event.activePointers?.length;
            if (pointerCount !== 2) {
              this.mapEventRestriction.set('twoFingers');
              this.restrictionMessageTimeout.set();
            }
            return pointerCount === 2;
          }
          return true;
        }
      }),
      new MouseWheelZoom({
        condition: (event) => {
          const keyModifierActive = platformModifierKeyOnly(event);

          if (!keyModifierActive && event.type === 'wheel') {
            this.mapEventRestriction.set('ctrlScroll');
          }
          return keyModifierActive;
        }
      })
    ]);
  }
}
