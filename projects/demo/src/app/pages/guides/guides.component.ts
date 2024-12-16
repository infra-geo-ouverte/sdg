import { Component, Signal } from '@angular/core';

import { AppService } from '../../app.service';
import { BasicScreenComponent } from '../../components';

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
