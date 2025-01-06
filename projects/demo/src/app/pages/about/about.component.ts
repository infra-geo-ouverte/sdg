import { Component, Signal } from '@angular/core';

import { BreakpointService } from '@igo2/sdg/core';

import { BasicScreenComponent } from '../../components';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [BasicScreenComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  constructor(private breakpointService: BreakpointService) {}

  get isHandset(): Signal<boolean> {
    return this.breakpointService.isHandset;
  }
}
