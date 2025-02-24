import { Component } from '@angular/core';

import { IgoLanguageModule } from '@igo2/core/language';

@Component({
  selector: 'sdg-map-footer',
  imports: [IgoLanguageModule],
  templateUrl: './map-footer.component.html',
  styleUrl: './map-footer.component.scss'
})
export class MapFooterComponent {}
