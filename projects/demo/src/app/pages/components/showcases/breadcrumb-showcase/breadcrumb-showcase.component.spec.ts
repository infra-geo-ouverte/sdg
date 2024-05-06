import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../../../../test-config';
import { BreadcrumbShowcaseComponent } from './breadcrumb-showcase.component';

describe('BreadcrumbShowcaseComponent', () => {
  let component: BreadcrumbShowcaseComponent;
  let fixture: ComponentFixture<BreadcrumbShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbShowcaseComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
