import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from 'projects/demo/src/test-config';

import { ExternalLinkDemoComponent } from './external-link.component';

describe('ExternalLinkDemoComponent', () => {
  let component: ExternalLinkDemoComponent;
  let fixture: ComponentFixture<ExternalLinkDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternalLinkDemoComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(ExternalLinkDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
