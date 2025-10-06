import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from 'packages/common/test-config';

import { ExternalLinkComponent } from './external-link.component';

describe('ExternalLinkComponent', () => {
  let component: ExternalLinkComponent;
  let ref: ComponentRef<ExternalLinkComponent>;
  let fixture: ComponentFixture<ExternalLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternalLinkComponent],
      providers: TEST_CONFIG.providers
    }).compileComponents();

    fixture = TestBed.createComponent(ExternalLinkComponent);
    component = fixture.componentInstance;
    ref = fixture.componentRef;

    ref.setInput('text', 'Test');
    ref.setInput('url', 'https://www.google.com');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
