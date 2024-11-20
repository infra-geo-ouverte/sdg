import { Component, Signal } from '@angular/core';

import { BasicScreenComponent } from '@igo2/sdg';

import { AppService } from '../../app.service';

@Component({
  selector: 'app-guides',
  standalone: true,
  imports: [BasicScreenComponent],
  templateUrl: './guides.component.html',
  styleUrl: './guides.component.scss'
})
export class GuidesComponent {
  constructor(private appService: AppService) {}

  get isHandset(): Signal<boolean> {
    return this.appService.isHandset;
  }
}
