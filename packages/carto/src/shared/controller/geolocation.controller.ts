import { BehaviorSubject, Observable, Subscription } from 'rxjs';

export interface GeolocationOptions {
  tracking: boolean;
  trackingOptions?: PositionOptions;
}

const DEFAULT_OPTIONS: GeolocationOptions = {
  tracking: false,
  trackingOptions: {
    enableHighAccuracy: true
  }
};

export abstract class GeolocationBase {
  hasGeolocation: boolean;
  options: GeolocationOptions;

  isTracking$: Observable<boolean | undefined>;
  position$: Observable<GeolocationPosition | undefined>;

  private watchPosition$: Observable<GeolocationPosition> | undefined;
  private watchPosition$$: Subscription | undefined;

  private _isTracking$ = new BehaviorSubject<boolean | undefined>(undefined);
  private _position$ = new BehaviorSubject<GeolocationPosition | undefined>(
    undefined
  );

  constructor(options?: GeolocationOptions) {
    this.options = { ...DEFAULT_OPTIONS, ...options };

    this.hasGeolocation = !!navigator.geolocation;

    if (this.options.tracking) {
      this.watchPositionChanged();
    }

    this.position$ = this._position$.asObservable();
    this.isTracking$ = this._isTracking$.asObservable();
  }

  abstract showPosition(): void;
  abstract unshowPosition(): void;
  abstract zoomToPosition(position: GeolocationPosition): void;

  get accuracy(): number | undefined {
    return this.coordinates?.accuracy;
  }

  get altitude(): number | null | undefined {
    return this.coordinates?.altitude;
  }

  get altitudeAccuracy(): number | null | undefined {
    return this.coordinates?.altitudeAccuracy;
  }

  get coordinates(): GeolocationCoordinates | undefined {
    return this.position?.coords;
  }

  get heading(): number | null | undefined {
    return this.coordinates?.heading;
  }

  get position(): GeolocationPosition | undefined {
    return this._position$.value;
  }

  get speed(): number | null | undefined {
    return this.coordinates?.speed;
  }

  toggle(tracking: boolean): void {
    if (!this.hasGeolocation) {
      return;
    }

    if (tracking) {
      this.activate();
    } else if (!tracking) {
      this.deactivate();
    }
  }

  activate(): void {
    this.watchPositionChanged();
    this._isTracking$.next(true);

    this.showPosition();
  }

  deactivate(): void {
    this.unwatchPosition();
    this._isTracking$.next(false);

    this.unshowPosition();
  }

  resetPosition(): void {
    this._position$.next(undefined);
  }

  private watchPositionChanged(): void {
    if (!this.hasGeolocation) {
      return;
    }

    if (this.watchPosition$$) {
      this.unwatchPosition();
    }

    this.watchPosition$ = this.createWatchPosition(
      this.options.trackingOptions
    );

    this.watchPosition$$ = this.watchPosition$.subscribe({
      next: (position) => {
        this._position$.next(position);
      },
      error: (error: GeolocationPositionError) => {
        if (error.code === error.PERMISSION_DENIED) {
          console.warn('Permission denied for geolocation.');
          this.resetPosition(); // Reset position on permission denied
        } else {
          this._position$.error(error);
        }
      }
    });
  }

  private unwatchPosition(): void {
    this.watchPosition$ = undefined;
    this.watchPosition$$?.unsubscribe();
  }

  private createWatchPosition(
    options?: PositionOptions
  ): Observable<GeolocationPosition> {
    return new Observable((observer) => {
      // Get the next and error callbacks. These will be passed in when
      // the consumer subscribes.
      const onSuccess: PositionCallback = (pos: GeolocationPosition) => {
        observer.next(pos);
      };

      const onError: PositionErrorCallback = (
        error: GeolocationPositionError
      ) => {
        observer.error(error);
      };

      if (!this.hasGeolocation) {
        onError({
          code: 0,
          message: 'Geolocation is not available',
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 2,
          TIMEOUT: 3
        });
      }

      // Simple geolocation API check provides values to publish
      const watchId = navigator.geolocation.watchPosition(
        onSuccess,
        onError,
        options
      );

      // When the consumer unsubscribes, clean up data ready for next subscription.
      return {
        unsubscribe: () => {
          navigator.geolocation.clearWatch(watchId);
        }
      };
    });
  }
}
