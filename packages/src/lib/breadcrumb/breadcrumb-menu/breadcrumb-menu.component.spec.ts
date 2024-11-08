import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../../test-config';
import { BreadcrumbMenuComponent } from './breadcrumb-menu.component';

describe('BreadcrumbMenuComponent', () => {
  let component: BreadcrumbMenuComponent;
  let ref: ComponentRef<BreadcrumbMenuComponent>;
  let fixture: ComponentFixture<BreadcrumbMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbMenuComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbMenuComponent);
    component = fixture.componentInstance;
    ref = fixture.componentRef;

    ref.setInput('breadcrumb', { menu: [{ title: '', url: '' }] });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
