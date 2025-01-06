import { Component, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BreakpointService, RouteTitleKey } from '@igo2/sdg/core';

import { BasicScreenComponent } from '../../components';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [BasicScreenComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  title: string;

  constructor(
    private route: ActivatedRoute,
    private breakpointService: BreakpointService
  ) {
    this.title = this.route.routeConfig?.data![RouteTitleKey];
  }

  get isHandset(): Signal<boolean> {
    return this.breakpointService.isHandset;
  }
}
