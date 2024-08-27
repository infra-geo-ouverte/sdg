import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultDemoComponent } from './consult.component';

describe('ConsultDemoComponent', () => {
  let component: ConsultDemoComponent;
  let fixture: ComponentFixture<ConsultDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultDemoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
