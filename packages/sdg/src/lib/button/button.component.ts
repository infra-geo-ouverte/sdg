import { Component, Directive, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

type ButtonColor = 'primary' | 'accent' | 'warn';

@Directive()
class ButtonBase {
  color = input<ButtonColor>();
  disableRipple = input<boolean>();

  click = output();

  handleClick(event: Event) {
    event.stopImmediatePropagation();
    this.click.emit();
  }
}

@Component({
  selector: 'sdg-button-icon',
  standalone: true,
  imports: [MatButtonModule],
  styleUrl: './button.scss',
  template: `
    <button
      mat-icon-button
      [color]="color()"
      [disableRipple]="disableRipple()"
      (click)="click.emit()"
    >
      <ng-content />
    </button>
  `
})
export class IconButtonComponent extends ButtonBase {}

@Component({
  selector: 'sdg-button-raised',
  standalone: true,
  imports: [MatButtonModule],
  styleUrl: './button.scss',
  template: `
    <button
      mat-raised-button
      [color]="color()"
      [disableRipple]="disableRipple()"
      (click)="handleClick($event)"
    >
      <ng-content />
    </button>
  `
})
export class ButtonRaisedComponent extends ButtonBase {}

@Component({
  selector: 'sdg-button-flat',
  standalone: true,
  imports: [MatButtonModule],
  styleUrl: './button.scss',
  template: `
    <button
      mat-flat-button
      [color]="color()"
      [disableRipple]="disableRipple()"
      (click)="handleClick($event)"
    >
      <ng-content />
    </button>
  `
})
export class ButtonFlatComponent extends ButtonBase {}

@Component({
  selector: 'sdg-button-stroked',
  standalone: true,
  imports: [MatButtonModule],
  styleUrl: './button.scss',
  template: `
    <button
      mat-stroked-button
      [color]="color()"
      [disableRipple]="disableRipple()"
      (click)="handleClick($event)"
    >
      <ng-content />
    </button>
  `
})
export class ButtonStrokedComponent extends ButtonBase {}

@Component({
  selector: 'sdg-button',
  standalone: true,
  imports: [MatButtonModule],
  styleUrl: './button.scss',
  template: `
    <button
      mat-button
      [color]="color()"
      [disableRipple]="disableRipple()"
      (click)="handleClick($event)"
    >
      <ng-content />
    </button>
  `
})
export class ButtonComponent extends ButtonBase {}
