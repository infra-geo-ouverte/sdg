import { Component, Signal } from '@angular/core';

import { BasicScreenComponent } from '@igo2/sdg';

import { AppService } from '../../app.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [BasicScreenComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  get isHandset(): Signal<boolean> {
    return this.appService.isHandset;
  }

  constructor(private appService: AppService) {}
}
