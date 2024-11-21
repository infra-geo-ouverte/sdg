import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from 'projects/demo/src/test-config';

import { AlertDemoComponent } from './alert.component';

describe('AlertDemoComponent', () => {
  let component: AlertDemoComponent;
  let fixture: ComponentFixture<AlertDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertDemoComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
