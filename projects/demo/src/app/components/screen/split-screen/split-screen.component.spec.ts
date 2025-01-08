import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from 'projects/demo/src/test-config';

import { SplitScreenComponent } from './split-screen.component';

describe('SplitScreenComponent', () => {
  let component: SplitScreenComponent;
  let ref: ComponentRef<SplitScreenComponent>;
  let fixture: ComponentFixture<SplitScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SplitScreenComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(SplitScreenComponent);
    component = fixture.componentInstance;
    ref = fixture.componentRef;

    ref.setInput('title', 'Test');
    ref.setInput('isHandset', false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
