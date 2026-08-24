import { Component, WritableSignal, inject } from '@angular/core';

import { LateralMenuComponent, LateralMenuSections } from '@igo2/sdg-common';
import { Language, TranslationService } from '@igo2/sdg-i18n';

import { ExampleViewerComponent } from '../../../../components';

@Component({
  selector: 'app-lateral-menu',
  imports: [ExampleViewerComponent, LateralMenuComponent],
  templateUrl: './lateral-menu.component.html',
  styleUrl: './lateral-menu.component.scss'
})
export class LateralMenuDemoComponent {
  private translationService = inject(TranslationService);
  menuTitle = 'Menu latéral';

  private domain = `/${this.currentLanguage()}/composants/showcases/common`;

  sections: LateralMenuSections = [
    {
      title: 'À propos',
      path: ''
    },
    {
      title: 'Composants',
      path: this.domain,
      items: [
        {
          title: 'À consulter aussi',
          path: `${this.domain}/a-consulter-aussi`
        },
        {
          title: 'Alerte',
          path: `${this.domain}/alerte`
        },
        {
          title: 'Menu latéral',
          path: `${this.domain}/menu-lateral`
        }
      ]
    },
    {
      title: 'Guides',
      path: `/${this.currentLanguage()}/guides`
    }
  ];

  get currentLanguage(): WritableSignal<Language> {
    return this.translationService.lang;
  }
}
