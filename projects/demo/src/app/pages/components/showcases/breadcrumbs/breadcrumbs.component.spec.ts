import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../../../../test-config';
import { BreadcrumbDemoComponent } from './breadcrumbs.component';

describe('BreadcrumbDemoComponent', () => {
  let component: BreadcrumbDemoComponent;
  let fixture: ComponentFixture<BreadcrumbDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbDemoComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
