import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IHeaderLogo, IHeaderOptions } from './header.interface';

@Component({
  selector: 'sdg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [RouterLink]
})
export class HeaderComponent {
  logo = input.required<IHeaderLogo>();
  title = input.required<string>();
  options = input<IHeaderOptions>();

  contactUs = input<string>();
  contactUsRoute = input<string>();
}
