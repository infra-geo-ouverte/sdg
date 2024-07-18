import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalLinkComponent } from './external-link.component';

describe('ExternalLinkComponent', () => {
  let component: ExternalLinkComponent;
  let ref: ComponentRef<ExternalLinkComponent>;
  let fixture: ComponentFixture<ExternalLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternalLinkComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ExternalLinkComponent);
    component = fixture.componentInstance;
    ref = fixture.componentRef;

    ref.setInput('title', 'Test');
    ref.setInput('link', 'test');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
