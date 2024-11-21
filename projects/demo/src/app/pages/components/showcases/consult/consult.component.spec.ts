import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from 'projects/demo/src/test-config';

import { ConsultDemoComponent } from './consult.component';

describe('ConsultDemoComponent', () => {
  let component: ConsultDemoComponent;
  let fixture: ComponentFixture<ConsultDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultDemoComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
