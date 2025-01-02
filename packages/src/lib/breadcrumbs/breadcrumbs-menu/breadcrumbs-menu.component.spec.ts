import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../../test-config';
import { BreadcrumbsMenuComponent } from './breadcrumbs-menu.component';

describe('BreadcrumbsMenuComponent', () => {
  let component: BreadcrumbsMenuComponent;
  let ref: ComponentRef<BreadcrumbsMenuComponent>;
  let fixture: ComponentFixture<BreadcrumbsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbsMenuComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbsMenuComponent);
    component = fixture.componentInstance;
    ref = fixture.componentRef;

    ref.setInput('breadcrumb', { menu: [{ title: '', url: '' }] });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
