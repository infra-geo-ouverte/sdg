import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from 'projects/demo/src/test-config';

import { BasicScreenComponent } from './basic-screen.component';

describe('BasicScreenComponent', () => {
  let component: BasicScreenComponent;
  let ref: ComponentRef<BasicScreenComponent>;
  let fixture: ComponentFixture<BasicScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicScreenComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(BasicScreenComponent);
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
