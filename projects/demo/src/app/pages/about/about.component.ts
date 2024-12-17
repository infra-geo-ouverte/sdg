import { Component, Signal } from '@angular/core';

import { AppService } from '../../app.service';
import { BasicScreenComponent } from '../../components';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [BasicScreenComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  constructor(private appService: AppService) {}

  get isHandset(): Signal<boolean> {
    return this.appService.isHandset;
  }
}
