import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { SdgSearchBar } from '@igo2/sdg-common';

import { ExampleViewerComponent } from '../../../../components';

@Component({
  selector: 'app-search-bar',
  imports: [ExampleViewerComponent, SdgSearchBar],
  templateUrl: './search-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarDemoComponent {
  readonly searchTerm = signal('');
  readonly liveTerm = signal('');
}
