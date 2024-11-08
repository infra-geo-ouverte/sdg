import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  computed,
  input,
  signal,
  viewChild
} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { IgoLanguageModule } from '@igo2/core/language';

import { INavigationOptions, INavigationRoutes } from './navigation.interface';

@Component({
  selector: 'sdg-navigation',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatTabsModule,
    NgTemplateOutlet,
    IgoLanguageModule
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements AfterViewInit {
  links = input.required<INavigationRoutes>();
  linksFiltered = computed(() => this.links().filter((link) => !link.hidden));
  isHandset = input.required<boolean>();
  options = input<INavigationOptions>();

  hasOverflow = signal(false);

  tabsContainer = viewChild<ElementRef<HTMLElement>>('tabsContainer');
  actionsContainer = viewChild<ElementRef<HTMLElement>>('actionsContainer');

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.handleOverflow();
  }

  ngAfterViewInit(): void {
    this.handleOverflow();
  }

  /**
   * @todo
   * Le comportement d'overflow pour les appareils autres que "Handset" n'est pas prit en compte
   * Le système de design mentionne qu'on devrait gérer l'overflow en ajoutant un bouton "Plus"
   * qui ouvre un menu avec les liens en overflow
   * https://design.quebec.ca/design/modeles/menu-navigation-principale/conceptualisation#priorite-plus
   */
  private handleOverflow(): void {
    const tabsWidth = this.getTabsWidth() ?? 0;
    const actionsWidth = this.getActionsWidth() ?? 0;

    const parentWidth =
      this.tabsContainer()?.nativeElement.parentElement?.clientWidth ?? 0;

    const hasOverflow = tabsWidth + actionsWidth > parentWidth;
    this.hasOverflow.set(hasOverflow);
  }

  private getTabsWidth(): number | undefined {
    const tabsElement = this.tabsContainer()?.nativeElement;
    const elements = tabsElement?.getElementsByClassName('nav-link');
    if (!elements) {
      return;
    }
    return this.getItemsWidth(elements);
  }

  private getActionsWidth(): number | undefined {
    const actionsElement = this.actionsContainer()?.nativeElement;
    if (!actionsElement?.children) {
      return;
    }
    return this.getItemsWidth(actionsElement.children);
  }

  private getItemsWidth(collection: HTMLCollection): number {
    const first = collection.item(0);
    const last = collection.item(collection.length - 1);

    const right = (last ?? first)?.getBoundingClientRect().right ?? 0;
    const left = first?.getBoundingClientRect().left ?? 0;
    return right - left;
  }
}
