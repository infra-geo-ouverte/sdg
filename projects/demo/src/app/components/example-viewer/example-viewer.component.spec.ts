import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../../test-config';
import { ExampleViewerComponent } from './example-viewer.component';

describe('ExampleViewerComponent', () => {
  let component: ExampleViewerComponent;
  let ref: ComponentRef<ExampleViewerComponent>;
  let fixture: ComponentFixture<ExampleViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleViewerComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleViewerComponent);
    component = fixture.componentInstance;
    ref = fixture.componentRef;

    ref.setInput('title', 'Test');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
