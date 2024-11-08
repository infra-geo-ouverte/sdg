import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { IgoLanguageModule } from '@igo2/core/language';

import { BreadcrumbsComponent } from '../../breadcrumb';

@Component({
  selector: 'sdg-basic-screen',
  standalone: true,
  imports: [BreadcrumbsComponent, IgoLanguageModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic-screen.component.html',
  styleUrl: './basic-screen.component.scss'
})
export class BasicScreenComponent {
  title = input.required<string>();
  isHandset = input.required<boolean>();
}
