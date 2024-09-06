import { AsyncPipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  input,
  output
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import {
  DetailedContext,
  IgoContextManagerModule,
  IgoContextMapButtonModule
} from '@igo2/context';
import { MessageService } from '@igo2/core/message';
import {
  Feature,
  IgoMap,
  MapBrowserComponent as IgoMapBrowserComponent,
  ImportService,
  LayerService,
  MAP_DIRECTIVES,
  QueryDirective,
  QuerySearchSource,
  SearchResult,
  SearchSourceService,
  featureToSearchResult,
  generateIdFromSourceOptions,
  handleFileImportError,
  handleFileImportSuccess,
  provideStyleListOptions
} from '@igo2/geo';
import { ContextState, MapState, QueryState } from '@igo2/integration';
import { ObjectUtils } from '@igo2/utils';

import { transformExtent } from 'ol/proj';

import { MapBrowserEvent } from 'ol';
import { Subscription, debounceTime } from 'rxjs';

import { MapFooterComponent } from '../map-footer/map-footer.component';
import { MapOverlayComponent } from '../map-overlay/map-overlay.component';
import { IMapConfig, LayerType } from '../shared/map.interface';

@Component({
  selector: 'sdg-map-browser',
  standalone: true,
  imports: [
    AsyncPipe,
    IgoMapBrowserComponent,
    QueryDirective,
    MapOverlayComponent,
    MAP_DIRECTIVES,
    IgoContextManagerModule,
    IgoContextMapButtonModule,
    MapFooterComponent
  ],
  providers: [
    provideStyleListOptions({
      path: './assets/list-style.json'
    })
  ],
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './map-browser.component.html',
  styleUrl: './map-browser.component.scss'
})
export class MapBrowserComponent implements OnInit {
  config = input.required<IMapConfig>();
  isHandset = input<boolean>();
  mapReady = output<IgoMap>();
  featuresQuery = output<SearchResult[]>();

  map: IgoMap;

  private addedLayers$$: Subscription[] = [];
  private contextLoaded = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private layerService: LayerService,
    private contextState: ContextState,
    private importService: ImportService,
    private messageService: MessageService,
    private searchSourceService: SearchSourceService,
    private mapState: MapState,
    public queryState: QueryState
  ) {
    this.map = this.mapState.map;
    this.contextState.context$.subscribe((context: DetailedContext) =>
      this.onChangeContext(context)
    );
  }

  ngOnInit(): void {
    this.mapReady.emit(this.map);
    this.route.queryParams.subscribe((params) => {
      this.computeZoomToExtent(params);
    });

    this.map.ol.once('rendercomplete', () => {
      const geolocation = this.config().geolocate;
      this.map.geolocationController.tracking =
        geolocation?.activateDefault ?? false;
    });
  }

  private onChangeContext(context: DetailedContext) {
    this.cancelOngoingAddLayer();
    if (context === undefined) {
      return;
    }
    if (!this.queryState.store.empty) {
      this.queryState.store.softClear();
    }

    this.route.queryParams.pipe(debounceTime(250)).subscribe((qParams) => {
      if (!qParams['context'] || qParams['context'] === context.uri) {
        this.readLayersQueryParams(qParams);
      }
    });

    this.contextLoaded = true;
  }

  private cancelOngoingAddLayer() {
    this.addedLayers$$.forEach((sub: Subscription) => sub.unsubscribe());
    this.addedLayers$$ = [];
  }

  private readLayersQueryParams(params: Params) {
    this.readLayersQueryParamsByType(params, 'wms');
    this.readLayersQueryParamsByType(params, 'wmts');
    this.readLayersQueryParamsByType(params, 'arcgisrest');
    this.readLayersQueryParamsByType(params, 'imagearcgisrest');
    this.readLayersQueryParamsByType(params, 'tilearcgisrest');
    this.readVectorQueryParams(params);
  }

  private readLayersQueryParamsByType(params: Params, type: LayerType) {
    let nameParamLayersKey;
    let urlsKey;
    switch (type) {
      case 'wms':
        if ((params['layers'] || params['wmsLayers']) && params['wmsUrl']) {
          urlsKey = 'wmsUrl';
          nameParamLayersKey = params['wmsLayers'] ? 'wmsLayers' : 'layers'; // for maintain compatibility
        }
        break;
      case 'wmts':
        if (params['wmtsLayers'] && params['wmtsUrl']) {
          urlsKey = 'wmtsUrl';
          nameParamLayersKey = 'wmtsLayers';
        }
        break;
      case 'arcgisrest':
        if (params['arcgisLayers'] && params['arcgisUrl']) {
          urlsKey = 'arcgisUrl';
          nameParamLayersKey = 'arcgisLayers';
        }
        break;
      case 'imagearcgisrest':
        if (params['iarcgisLayers'] && params['iarcgisUrl']) {
          urlsKey = 'iarcgisUrl';
          nameParamLayersKey = 'iarcgisLayers';
        }
        break;
      case 'tilearcgisrest':
        if (params['tarcgisLayers'] && params['tarcgisUrl']) {
          urlsKey = 'tarcgisUrl';
          nameParamLayersKey = 'tarcgisLayers';
        }
        break;
    }
    if (!nameParamLayersKey || !urlsKey) {
      return;
    }
    const layersByService = params[nameParamLayersKey].split('),(');
    const urls: string[] = params[urlsKey].split(',');

    let cnt = 0;
    urls.forEach((urlSrc) => {
      let url = urlSrc;
      const version =
        this.getQueryParam('VERSION', url) ||
        this.getQueryParam('version', url) ||
        undefined;
      if (version) {
        url = url
          .replace('VERSION=' + version, '')
          .replace('version=' + version, '');
      }
      if (url.endsWith('?')) {
        url = url.substring(0, url.length - 1);
      }

      const currentLayersByService = this.extractLayersByService(
        layersByService[cnt]
      );
      currentLayersByService.forEach((layer) => {
        const layerFromUrl = layer.split(':igoz');
        const layerOptions = ObjectUtils.removeUndefined({
          type,
          url: url,
          layer: layerFromUrl[0],
          params: type === 'wms' ? { LAYERS: layerFromUrl[0] } : undefined
        });
        const id = generateIdFromSourceOptions(layerOptions);
        const visibility = this.computeLayerVisibilityFromUrl(params, id);
        this.addLayerFromURL(
          url,
          layerFromUrl[0],
          type,
          version,
          visibility,
          layerFromUrl[1] ? parseInt(layerFromUrl[1], 10) : undefined
        );
      });
      cnt += 1;
    });
  }

  private getQueryParam(name: string, url: string): string | null {
    if (!url.includes('?')) {
      return null;
    }
    const httpParams = new HttpParams({ fromString: url.split('?')[1] });
    return httpParams.get(name);
  }

  private addLayerFromURL(
    url: string,
    name: string,
    type: LayerType,
    version: string | undefined,
    visibility = true,
    zIndex: number | undefined
  ) {
    if (!this.contextLoaded) {
      return;
    }
    const commonSourceOptions = {
      optionsFromCapabilities: true,
      optionsFromApi: true,
      crossOrigin: true,
      type,
      url
    };
    const arcgisClause =
      type === 'arcgisrest' ||
      type === 'imagearcgisrest' ||
      type === 'tilearcgisrest';
    let sourceOptions = {
      version: type === 'wmts' ? '1.0.0' : undefined,
      queryable: arcgisClause ? true : false,
      queryFormat: arcgisClause ? 'esrijson' : undefined,
      layer: name
    };
    if (type === 'wms') {
      sourceOptions = { params: { LAYERS: name, VERSION: version } } as any;
    }

    sourceOptions = ObjectUtils.removeUndefined(
      Object.assign({}, sourceOptions, commonSourceOptions)
    );

    this.addedLayers$$.push(
      this.layerService
        .createAsyncLayer({
          zIndex: zIndex,
          visible: visibility,
          sourceOptions
        })
        .subscribe((l) => {
          this.map.addLayer(l);
        })
    );
  }

  private computeZoomToExtent(params: Params) {
    const zoomExtent = params['zoomExtent'];
    if (zoomExtent) {
      const extentParams: string[] = zoomExtent.split(',');
      const olExtent = transformExtent(
        extentParams.map((str) => Number(str.trim())),
        'EPSG:4326',
        this.map.projectionCode
      );
      this.map.viewController.zoomToExtent(
        olExtent as [number, number, number, number]
      );
    }
  }

  private computeLayerVisibilityFromUrl(
    params: Params,
    currentLayerid: string
  ): boolean {
    const queryParams = params;
    let visible = true;
    if (!queryParams || !currentLayerid) {
      return visible;
    }
    let visibleOnLayersParams = '';
    let visibleOffLayersParams = '';
    let visiblelayers: string[] = [];
    let invisiblelayers: string[] = [];
    if (queryParams['visiblelayers']) {
      visibleOnLayersParams = queryParams['visiblelayers'];
    }
    if (queryParams['invisiblelayers']) {
      visibleOffLayersParams = queryParams['invisiblelayers'];
    }

    /* This order is important because to control whichever
     the order of * param. First whe open and close everything.*/
    if (visibleOnLayersParams === '*') {
      visible = true;
    }
    if (visibleOffLayersParams === '*') {
      visible = false;
    }

    // After, managing named layer by id (context.json OR id from datasource)
    visiblelayers = visibleOnLayersParams.split(',');
    invisiblelayers = visibleOffLayersParams.split(',');
    if (
      visiblelayers.indexOf(currentLayerid) > -1 ||
      visiblelayers.indexOf(currentLayerid.toString()) > -1
    ) {
      visible = true;
    }
    if (
      invisiblelayers.indexOf(currentLayerid) > -1 ||
      invisiblelayers.indexOf(currentLayerid.toString()) > -1
    ) {
      visible = false;
    }
    return visible;
  }

  private readVectorQueryParams(params: Params) {
    if (params['vector']) {
      const url = params['vector'] as string;
      const lastIndex = url.lastIndexOf('/');
      const fileName = url.slice(lastIndex + 1, url.length);

      this.http.get(`${url}`, { responseType: 'blob' }).subscribe((data) => {
        const file = new File([data], fileName, {
          type: data.type,
          lastModified: Date.now()
        });
        this.importService.import(file).subscribe(
          (features: Feature[]) => this.onFileImportSuccess(file, features),
          (error: Error) => this.onFileImportError(file, error)
        );
      });
    }
  }

  private onFileImportSuccess(file: File, features: Feature[]) {
    const uri = this.contextState.context$.value.uri;
    if (!uri) {
      return;
    }

    handleFileImportSuccess(
      file,
      features,
      this.map,
      uri,
      this.messageService,
      this.layerService
    );
  }

  private onFileImportError(file: File, error: Error) {
    handleFileImportError(file, error, this.messageService);
  }

  private extractLayersByService(layersByService: string): any[] {
    let outLayersByService = layersByService;
    outLayersByService = outLayersByService.startsWith('(')
      ? outLayersByService.substr(1)
      : outLayersByService;
    outLayersByService = outLayersByService.endsWith(')')
      ? outLayersByService.slice(0, -1)
      : outLayersByService;
    return outLayersByService.split(',');
  }

  onMapQuery({
    features
  }: {
    features: Feature[] | Feature[][];
    event: MapBrowserEvent<any>;
  }) {
    // const querySearchSourceArray: QuerySearchSource[] = [];
    if (this.isFeaturesList(features)) {
      features = features.reduce((acc, featureList) => {
        acc.push(...featureList);
        return acc;
      }, []);
    }
    const results = this.getQueryResults(features);
    this.queryState.store.load(results);
    this.featuresQuery.emit(results);
  }

  private isFeaturesList(
    features: Feature[] | Feature[][]
  ): features is Feature[][] {
    return Array.isArray(features[0]);
  }

  private getQueryResults(features: Feature[]): SearchResult[] {
    return features.reduce((results, feature) => {
      const item = this.convertFeatureToSearchResult(feature, undefined);
      if (item) {
        results.push(item);
      }
      return results;
    }, [] as SearchResult[]);
  }

  private convertFeatureToSearchResult(
    feature: Feature,
    source: QuerySearchSource | undefined
  ): SearchResult {
    if (!source) {
      source = new QuerySearchSource({
        title: feature.meta?.sourceTitle
      });
    }
    return featureToSearchResult(feature, source);
  }

  getControlsOffsetY() {
    return this.isHandset() ? 'secondRowFromBottom' : 'firstRowFromBottom';
  }
}
