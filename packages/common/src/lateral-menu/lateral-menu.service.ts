import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LateralMenuService {
  isMenuOpened = signal<boolean>(false);
}
