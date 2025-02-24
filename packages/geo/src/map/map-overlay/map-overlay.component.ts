import { NgStyle } from '@angular/common';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';

import { Context, ContextService } from '@igo2/context';
import { ConfigService } from '@igo2/core/config';
import { MediaService } from '@igo2/core/media';

import { Subscription } from 'rxjs';

import { MapOverlay } from './map-overlay.interface';

@Component({
  selector: 'sdg-map-overlay',
  templateUrl: './map-overlay.component.html',
  styleUrls: ['./map-overlay.component.scss'],
  imports: [NgStyle]
})
export class MapOverlayComponent implements AfterViewInit, OnDestroy {
  public mapOverlay: MapOverlay[] = [];
  private context$$!: Subscription;
  private media$$!: Subscription;
  private context?: Context;

  constructor(
    private contextService: ContextService,
    private mediaService: MediaService,
    private configService: ConfigService
  ) {}

  ngAfterViewInit() {
    this.context$$ = this.contextService.context$.subscribe((context) => {
      this.handleContextChange(context);
      this.context = context;
    });
    this.media$$ = this.mediaService.media$.subscribe(() => {
      if (!this.context) {
        return;
      }
      this.handleContextChange(this.context);
    });
  }

  ngOnDestroy() {
    this.context$$.unsubscribe();
    this.media$$.unsubscribe();
  }

  private handleContextChange(context: Context) {
    if (!context) {
      return;
    }

    const overlays: MapOverlay[] = this.configService.getConfig(
      'mapOverlay',
      []
    );

    const media = this.mediaService.getMedia();
    this.mapOverlay = overlays.reduce((acc, overlay) => {
      if (
        (!overlay.media && media === 'desktop') ||
        (overlay.media && overlay.media.includes(media))
      ) {
        acc.push(overlay);
      }
      return acc;
    }, [] as MapOverlay[]);
  }
}
