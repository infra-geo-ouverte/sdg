import { Directive, TemplateRef, inject, input } from '@angular/core';

import { PanelType } from './panel.service';

@Directive({
  selector: 'ng-template[sdgPanelContent]'
})
export class SdgPanelContentDirective {
  readonly type = input.required<PanelType>({ alias: 'sdgPanelContent' });
  readonly templateRef = inject(TemplateRef);
}
