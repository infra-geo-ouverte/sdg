import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { TEST_CONFIG } from '../../../test-config';
import { LateralMenuItem } from '../lateral-menu.interface';
import { LateralMenuSectionComponent } from './lateral-menu-section.component';

describe('LateralMenuSectionComponent', () => {
  let component: LateralMenuSectionComponent;
  let fixture: ComponentFixture<LateralMenuSectionComponent>;
  let router: Router;

  const mockSection: LateralMenuItem = {
    path: '/test',
    title: 'Test Section',
    items: [
      { path: '/test/item1', title: 'Item 1' },
      { path: '/test/item2', title: 'Item 2' }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LateralMenuSectionComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  function createComponent(section: LateralMenuItem = mockSection): void {
    fixture = TestBed.createComponent(LateralMenuSectionComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('section', section);
    fixture.componentRef.setInput('menuOpened', true);
    fixture.detectChanges();
  }

  it('should create', () => {
    createComponent();
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set active to true when router url includes section path', () => {
      Object.defineProperty(router, 'url', { get: () => '/test/item1' });
      createComponent();
      expect(component.active).toBe(true);
    });

    it('should set active to false when router url does not include section path', () => {
      Object.defineProperty(router, 'url', { get: () => '/other' });
      createComponent();
      expect(component.active).toBe(false);
    });

    it('should open the section when active', () => {
      Object.defineProperty(router, 'url', { get: () => '/test/item1' });
      createComponent();
      expect(component.opened()).toBe(true);
    });

    it('should not open the section when not active', () => {
      Object.defineProperty(router, 'url', { get: () => '/other' });
      createComponent();
      expect(component.opened()).toBe(false);
    });
  });

  describe('toggle', () => {
    it('should open the section when closed', () => {
      Object.defineProperty(router, 'url', { get: () => '/other' });
      createComponent();
      expect(component.opened()).toBe(false);
      component.toggle();
      expect(component.opened()).toBe(true);
    });

    it('should close the section when opened', () => {
      Object.defineProperty(router, 'url', { get: () => '/other' });
      createComponent();
      component.opened.set(true);
      component.toggle();
      expect(component.opened()).toBe(false);
    });
  });

  describe('template', () => {
    it('should display the section title', () => {
      Object.defineProperty(router, 'url', { get: () => '/other' });
      createComponent();
      const titleEl: HTMLElement = fixture.nativeElement.querySelector(
        '.sdg-lateral-menu-section-header-title'
      );
      expect(titleEl.textContent?.trim()).toBe('Test Section');
    });

    it('should apply --active-section class on header when active', () => {
      Object.defineProperty(router, 'url', { get: () => '/test/item1' });
      createComponent();
      const headerBtn: HTMLElement = fixture.nativeElement.querySelector(
        '.sdg-lateral-menu-section-header'
      );
      expect(headerBtn.classList).toContain('--active-section');
    });

    it('should not apply --active-section class on header when not active', () => {
      Object.defineProperty(router, 'url', { get: () => '/other' });
      createComponent();
      const headerBtn: HTMLElement = fixture.nativeElement.querySelector(
        '.sdg-lateral-menu-section-header'
      );
      expect(headerBtn.classList).not.toContain('--active-section');
    });

    it('should toggle opened state when header button is clicked', () => {
      Object.defineProperty(router, 'url', { get: () => '/other' });
      createComponent();
      expect(component.opened()).toBe(false);
      const headerBtn: HTMLElement = fixture.nativeElement.querySelector(
        '.sdg-lateral-menu-section-header'
      );
      headerBtn.click();
      expect(component.opened()).toBe(true);
    });

    it('should apply --opened class on arrow icon when opened', () => {
      Object.defineProperty(router, 'url', { get: () => '/test/item1' });
      createComponent();
      const arrow: HTMLElement = fixture.nativeElement.querySelector(
        '.sdg-lateral-menu-section-header-arrow'
      );
      expect(arrow.classList).toContain('--opened');
    });

    it('should apply --opened class on subsections container when opened', () => {
      Object.defineProperty(router, 'url', { get: () => '/test/item1' });
      createComponent();
      const subsections: HTMLElement = fixture.nativeElement.querySelector(
        '.sdg-lateral-menu-section-subsections'
      );
      expect(subsections.classList).toContain('--opened');
    });

    it('should render menu items for each item in section', () => {
      Object.defineProperty(router, 'url', { get: () => '/other' });
      createComponent();
      component.opened.set(true);
      fixture.detectChanges();
      const items = fixture.nativeElement.querySelectorAll(
        'sdg-lateral-menu-item'
      );
      expect(items.length).toBe(2);
    });

    it('should render no menu items when section has no items', () => {
      Object.defineProperty(router, 'url', { get: () => '/other' });
      createComponent({ path: '/empty', title: 'Empty', items: [] });
      component.opened.set(true);
      fixture.detectChanges();
      const items = fixture.nativeElement.querySelectorAll(
        'sdg-lateral-menu-item'
      );
      expect(items.length).toBe(0);
    });
  });

  describe('styles', () => {
    it('should display section as a flex column', () => {
      Object.defineProperty(router, 'url', { get: () => '/other' });
      createComponent();
      const section: HTMLElement = fixture.nativeElement.querySelector(
        '.sdg-lateral-menu-section'
      );
      const styles = getComputedStyle(section);
      expect(styles.display).toBe('flex');
      expect(styles.flexDirection).toBe('column');
    });

    it('should render the section container element', () => {
      Object.defineProperty(router, 'url', { get: () => '/other' });
      createComponent();
      const section: HTMLElement = fixture.nativeElement.querySelector(
        '.sdg-lateral-menu-section'
      );
      expect(section).toBeTruthy();
    });

    it('should display header as flex with space-between', () => {
      Object.defineProperty(router, 'url', { get: () => '/other' });
      createComponent();
      const header: HTMLElement = fixture.nativeElement.querySelector(
        '.sdg-lateral-menu-section-header'
      );
      const styles = getComputedStyle(header);
      expect(styles.display).toBe('flex');
      expect(styles.alignItems).toBe('center');
      expect(styles.justifyContent).toBe('space-between');
    });

    it('should have pointer cursor on header', () => {
      Object.defineProperty(router, 'url', { get: () => '/other' });
      createComponent();
      const header: HTMLElement = fixture.nativeElement.querySelector(
        '.sdg-lateral-menu-section-header'
      );
      const styles = getComputedStyle(header);
      expect(styles.cursor).toBe('pointer');
    });

    it('should have transparent background on header by default', () => {
      Object.defineProperty(router, 'url', { get: () => '/other' });
      createComponent();
      const header: HTMLElement = fixture.nativeElement.querySelector(
        '.sdg-lateral-menu-section-header'
      );
      const styles = getComputedStyle(header);
      expect(styles.backgroundColor).toBe('rgba(0, 0, 0, 0)');
    });

    it('should have no border on header button', () => {
      Object.defineProperty(router, 'url', { get: () => '/other' });
      createComponent();
      const header: HTMLElement = fixture.nativeElement.querySelector(
        '.sdg-lateral-menu-section-header'
      );
      const styles = getComputedStyle(header);
      expect(styles.borderStyle).toBe('none');
    });

    it('should apply bold font weight on title when active', () => {
      Object.defineProperty(router, 'url', { get: () => '/test/item1' });
      createComponent();
      const title: HTMLElement = fixture.nativeElement.querySelector(
        '.sdg-lateral-menu-section-header-title'
      );
      const styles = getComputedStyle(title);
      expect(styles.fontWeight).toBe('700');
    });

    it('should not apply bold font weight on title when not active', () => {
      Object.defineProperty(router, 'url', { get: () => '/other' });
      createComponent();
      const title: HTMLElement = fixture.nativeElement.querySelector(
        '.sdg-lateral-menu-section-header-title'
      );
      const styles = getComputedStyle(title);
      expect(styles.fontWeight).not.toBe('700');
    });

    it('should have left padding on subsections content', () => {
      Object.defineProperty(router, 'url', { get: () => '/other' });
      createComponent();
      const content: HTMLElement = fixture.nativeElement.querySelector(
        '.sdg-lateral-menu-section-subsections-content'
      );
      expect(content).toBeTruthy();
      expect(content.classList.contains('--opened')).toBe(false);
    });

    it('should apply --opened class on subsections content when opened', () => {
      Object.defineProperty(router, 'url', { get: () => '/test/item1' });
      createComponent();
      const content: HTMLElement = fixture.nativeElement.querySelector(
        '.sdg-lateral-menu-section-subsections-content'
      );
      expect(content.classList.contains('--opened')).toBe(true);
    });

    it('should have no vertical padding on subsections content when closed', () => {
      Object.defineProperty(router, 'url', { get: () => '/other' });
      createComponent();
      const content: HTMLElement = fixture.nativeElement.querySelector(
        '.sdg-lateral-menu-section-subsections-content'
      );
      const styles = getComputedStyle(content);
      expect(styles.paddingTop).toBe('0px');
      expect(styles.paddingBottom).toBe('0px');
    });

    it('should change padding on subsections content when --opened class is applied', async () => {
      Object.defineProperty(router, 'url', { get: () => '/other' });
      createComponent();
      const content: HTMLElement = fixture.nativeElement.querySelector(
        '.sdg-lateral-menu-section-subsections-content'
      );

      // Set CSS variables so styles can be computed
      content.style.setProperty('--sdg-spacer-xs', '4px');
      content.style.setProperty('--sdg-spacer-md', '16px');

      const closedStyles = getComputedStyle(content);
      expect(closedStyles.paddingTop).toBe('0px');
      expect(closedStyles.paddingRight).toBe('0px');
      expect(closedStyles.paddingBottom).toBe('0px');

      // Toggle to opened and wait for the CSS transition to complete (0.2s)
      component.opened.set(true);
      fixture.detectChanges();
      await new Promise<void>((resolve) => setTimeout(resolve, 300));

      const openedStyles = getComputedStyle(content);
      expect(openedStyles.paddingTop).toBe('4px');
      expect(openedStyles.paddingRight).toBe('0px');
      expect(openedStyles.paddingBottom).toBe('4px');
      expect(openedStyles.paddingLeft).toBe('16px');
    });
  });
});
