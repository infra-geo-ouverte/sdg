import { Component, input } from '@angular/core';

@Component({
  selector: 'sdg-form-field-label',
  templateUrl: './form-field-label.component.html',
  styleUrls: ['./form-field-label.component.scss']
})
export class FormFieldLabelComponent {
  readonly controlId = input.required<string>();
  readonly label = input.required<string>();
  readonly clarification = input<string>();
  readonly required = input<boolean>(false);
  readonly disabled = input<boolean>(false);
}
