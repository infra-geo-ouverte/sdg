import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from 'projects/demo/src/test-config';

import { CharterBannerDemoComponent } from './charter-banner.component';

describe('CharterBannerDemoComponent', () => {
  let component: CharterBannerDemoComponent;
  let fixture: ComponentFixture<CharterBannerDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharterBannerDemoComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(CharterBannerDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
