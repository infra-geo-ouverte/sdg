import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { IgoLanguageModule } from '@igo2/core/language';

import { BreadcrumbsComponent } from '../../breadcrumb';

@Component({
  selector: 'sdg-split-screen',
  standalone: true,
  imports: [BreadcrumbsComponent, IgoLanguageModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './split-screen.component.html',
  styleUrl: './split-screen.component.scss'
})
export class SplitScreenComponent {
  title = input<string>();
  isHandset = input.required<boolean>();
}
