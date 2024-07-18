import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-external-link',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './external-link.component.html',
  styleUrl: './external-link.component.scss'
})
export class ExternalLinkComponent {
  title = input.required<string>();
  link = input.required<string>();
}
