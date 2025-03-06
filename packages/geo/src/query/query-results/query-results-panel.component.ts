import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  input,
  output,
  signal
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

import { IgoLanguageModule, LanguageService } from '@igo2/core/language';
import {
  FEATURE,
  Feature,
  FeatureDetailsComponent,
  FeatureMotion,
  IgoMap,
  SearchResult,
  getCommonVectorSelectedStyle
} from '@igo2/geo';
import { QueryState } from '@igo2/integration';

import olFeature from 'ol/Feature';
import type { default as OlGeometry } from 'ol/geom/Geometry';

@Component({
  selector: 'sdg-query-results-panel',
  templateUrl: './query-results-panel.component.html',
  styleUrls: ['./query-results-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatTooltip,
    MatIconButton,
    MatIcon,
    IgoLanguageModule,
    FeatureDetailsComponent
  ]
})
export class QueryResultsPanelComponent implements OnInit {
  map = input.required<IgoMap>();
  queryState = input.required<QueryState>();

  closed = output<boolean>();

  selection = signal<Feature | undefined>(undefined);

  constructor(public languageService: LanguageService) {}

  ngOnInit() {
    this.queryState().store.entities$.subscribe((results) => {
      if (!results?.length) {
        this.close();
        return;
      }

      this.selectFirst(results);
    });
  }

  private selectFirst(results: SearchResult[]): void {
    this.clearSelection();

    const firstResult = results[0];
    this.queryState().store.state.update(
      firstResult,
      {
        focused: true,
        selected: true
      },
      true
    );
    this.addSelectionToMap(firstResult);

    const feature = firstResult.data as Feature;
    this.selection.set(feature);
  }

  close() {
    this.clearSelection();
    this.closed.emit(true);
  }

  private clearSelection(): void {
    this.selection.set(undefined);
    this.map().queryResultsOverlay.clear();
  }

  private addSelectionToMap(result: SearchResult) {
    const map = this.map();
    const queryState = this.queryState();

    const dataMeta = result.data['meta'];

    if (result.meta.dataType !== FEATURE || !result.data['geometry']) {
      return;
    }

    dataMeta.style = getCommonVectorSelectedStyle({
      feature: result.data as Feature | olFeature<OlGeometry>,
      ...queryState.queryOverlayStyleSelection,
      ...(result.style?.selection ? result.style.selection : {})
    });

    const feature = map.searchResultsOverlay.dataSource.ol.getFeatureById(
      result.meta.id
    );
    if (feature) {
      feature.setStyle(dataMeta.style);
      return;
    }
    map.queryResultsOverlay.addFeature(
      result.data as Feature,
      FeatureMotion.None
    );
  }
}
