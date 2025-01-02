import { Component, Signal } from '@angular/core';

import { BreakpointService } from '@igo2/sdg/core';

import { BasicScreenComponent } from '../../components';

@Component({
  selector: 'app-guides',
  standalone: true,
  imports: [BasicScreenComponent],
  templateUrl: './guides.component.html',
  styleUrl: './guides.component.scss'
})
export class GuidesComponent {
  constructor(private breakpointService: BreakpointService) {}

  get isHandset(): Signal<boolean> {
    return this.breakpointService.isHandset;
  }
}
