import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../../test-config';
import { AnyBreadcrumb, Breadcrumb, BreadcrumbMenu } from '../shared';
import { BreadcrumbsListComponent } from './breadcrumbs-list.component';

describe('BreadcrumbsListComponent', () => {
  let component: BreadcrumbsListComponent;
  let fixture: ComponentFixture<BreadcrumbsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbsListComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbsListComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('breadcrumbs', []);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isMenu', () => {
    it('should return true for BreadcrumbMenu', () => {
      const menuBreadcrumb: BreadcrumbMenu = {
        id: '0',
        menu: [{ id: '1', title: 'Test', url: '/test' }]
      };
      expect(component.isMenu(menuBreadcrumb)).toBeTrue();
    });

    it('should return false for Breadcrumb', () => {
      const breadcrumb: Breadcrumb = {
        id: '0',
        title: 'Test',
        url: '/test',
        redirectTo: 'test'
      };
      expect(component.isMenu(breadcrumb)).toBeFalse();
    });
  });

  describe('assignFirstParent', () => {
    it('should set firstParent on the correct parent when last is a menu', () => {
      const breads: AnyBreadcrumb[] = [
        { id: '0', title: 'Root', url: '/root', redirectTo: 'root' },
        { id: '1', title: 'Parent', url: '/parent', redirectTo: 'parent' },
        {
          id: '2',
          menu: [{ id: '1a', title: 'Menu', url: '/menu' }],
          url: '/parent/menu',
          redirectTo: 'menu'
        }
      ];
      component['assignFirstParent'](breads);
      expect((breads[1] as Breadcrumb).firstParent).toBeTrue();
    });

    it('should set firstParent on the first valid parent', () => {
      const breads: AnyBreadcrumb[] = [
        { id: '0', title: 'Root', url: '/root', redirectTo: 'root' },
        { id: '1', title: 'Parent', url: '/parent', redirectTo: 'parent' },
        { id: '2', title: 'Child', url: '/parent/child', redirectTo: 'child' }
      ];
      component['assignFirstParent'](breads);
      expect((breads[1] as Breadcrumb).firstParent).toBeTrue();
    });

    it('should not set firstParent if no valid parent exists', () => {
      const breads: AnyBreadcrumb[] = [
        { id: '0', title: 'Root', url: '/root', redirectTo: 'root' }
      ];
      component['assignFirstParent'](breads);
      expect((breads[0] as Breadcrumb).firstParent).toBeUndefined();
    });
  });
});
