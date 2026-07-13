import { InjectionToken } from '@angular/core';

import { SearchBarLabels } from '@igo2/sdg-common';

import { BasemapSwitcherLabels } from '../basemap-switcher';
import { MapFooterOptions, MapOptions } from '../map/map.interface';
import { NavigationLabels } from '../navigation';
import { SearchLabels } from '../search';
import { SdgFullMapPanelLabels } from './shared';
import { PanelType } from './shared/panel.service';

export interface SdgFullMapOptions extends MapOptions {
  panel?: {
    /** Number of pixels, default to 380 */
    width?: number;
    /** Panel type to navigate back to when leaving search/legend. If undefined, the panel is simply closed. */
    defaultPanel?: PanelType;
  };
  /** Default to true */
  search?: boolean;
  footer: MapFooterOptions;
}

export interface SdgFullMapLabels {
  search?: SearchLabels;
  searchBar?: SearchBarLabels;
  panel?: SdgFullMapPanelLabels;
  navigation?: NavigationLabels;
  basemap?: BasemapSwitcherLabels;
  legend?: LegendLabels;
}

export interface LegendLabels {
  label: string;
  open?: string;
  close?: string;
}

export const SDG_FULL_MAP_LABELS = new InjectionToken<SdgFullMapLabels>(
  'SDG_FULL_MAP_LABELS'
);

export const SDG_FULL_MAP_DEFAULT_LABELS: Required<SdgFullMapLabels> = {
  navigation: {
    home: {
      goHome: 'Home'
    },
    rotation: { reset: 'Reset rotation' },
    geolocation: {
      active: 'My location',
      inactive: 'Activate geolocation'
    },
    zoom: { zoomIn: 'Zoom in', zoomOut: 'Zoom out' }
  },
  legend: {
    label: 'Legend',
    open: 'Open legend',
    close: 'Close legend'
  },
  search: {
    clear: 'Clear',
    noResults: 'No results',
    results: 'Results',
    loadMore: 'Load more results'
  },
  searchBar: {
    placeholder: 'Search for a place or address'
  },
  basemap: {
    tooltip: 'Change the basemap'
  },
  panel: {
    open: 'Open the panel',
    close: 'Close the panel'
  }
};
