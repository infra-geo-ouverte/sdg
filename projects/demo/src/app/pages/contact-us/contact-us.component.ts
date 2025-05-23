import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RouteTitleKey } from '@igo2/sdg-core';

import { BasicScreenComponent } from '../../components';

@Component({
  selector: 'app-contact-us',
  imports: [BasicScreenComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  title: string;

  constructor(private route: ActivatedRoute) {
    this.title = this.route.routeConfig?.data![RouteTitleKey];
  }
}
