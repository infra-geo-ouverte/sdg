import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../test-config';
import { CharterBannerComponent } from './charter-banner.component';

describe('CharterBannerComponent', () => {
  let component: CharterBannerComponent;
  let fixture: ComponentFixture<CharterBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharterBannerComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(CharterBannerComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('containerClass', 'container');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
