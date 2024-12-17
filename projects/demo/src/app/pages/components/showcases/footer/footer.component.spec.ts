import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from 'projects/demo/src/test-config';

import { FooterDemoComponent } from './footer.component';

describe('ContactDemoComponent', () => {
  let component: FooterDemoComponent;
  let fixture: ComponentFixture<FooterDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterDemoComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
