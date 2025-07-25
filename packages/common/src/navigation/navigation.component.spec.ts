import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { IgoLanguageModule } from '@igo2/core/language';

import { TEST_CONFIG } from '../../test-config';
import { NavigationComponent } from './navigation.component';
import { INavigationLinks } from './navigation.interface';

const MOCK_LINKS: INavigationLinks = [
  { title: 'Link 1', path: '/link1' },
  { title: 'Link 2', path: '/link2' },
  { title: 'Link 3', path: '/link3' },
  { title: 'Link 4', path: '/link4' }
] as const;

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationComponent, IgoLanguageModule],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('links', MOCK_LINKS);
    fixture.componentRef.setInput('containerClass', 'container');
    component.isHandset = signal(false);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with all links in tabs', () => {
    expect(component.linksInTabs()).toEqual(MOCK_LINKS);
    expect(component.linksInMore()).toEqual([]);
  });

  describe('resize handling', () => {
    it('should handle resize when no overflow', () => {
      // Mock the required element dimensions
      spyOnProperty(
        component['tabsSection']()?.nativeElement as HTMLElement,
        'clientWidth'
      ).and.returnValue(1000); // Large enough to fit all tabs

      component['handleResize']();

      expect(component.linksInTabs()).toEqual(MOCK_LINKS);
      expect(component.linksInMore()).toEqual([]);
    });

    it('should move links to more menu when overflow occurs', () => {
      // Mock small viewport
      spyOnProperty(
        component['tabsNavbarSection']()?._tabListContainer
          .nativeElement as HTMLElement,
        'clientWidth'
      ).and.returnValue(200); // Small enough to cause overflow

      spyOnProperty(
        component['tabsSection']()?.nativeElement as HTMLElement,
        'clientWidth'
      ).and.returnValue(200);

      component['handleResize']();

      // Verify that some links moved to more menu
      expect(component.linksInTabs().length).toBeLessThan(MOCK_LINKS.length);
      expect(component.linksInMore().length).toBeGreaterThan(0);
    });
  });

  describe('Desktop Layout', () => {
    it('should have correct height and padding on desktop', () => {
      const headerContainer = fixture.debugElement.query(
        By.css('.sdg-navigation-header-container')
      );

      const styles = window.getComputedStyle(headerContainer.nativeElement);

      expect(styles.height).toBe('72px');
      expect(styles.paddingLeft).toBe('16px');
      expect(styles.paddingRight).toBe('16px');
    });
  });

  describe('cleanup', () => {
    it('should clean up resize observer on destroy', () => {
      const resizeObserverSpy = jasmine.createSpyObj('ResizeObserver', [
        'unobserve'
      ]);
      component['_resizeObserver'] = resizeObserverSpy;

      component.ngOnDestroy();

      expect(resizeObserverSpy.unobserve).toHaveBeenCalled();
    });
  });
});
