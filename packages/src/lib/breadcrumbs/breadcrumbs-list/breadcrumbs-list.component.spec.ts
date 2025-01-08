import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../../test-config';
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
    fixture.componentRef.setInput('isHandset', false);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
