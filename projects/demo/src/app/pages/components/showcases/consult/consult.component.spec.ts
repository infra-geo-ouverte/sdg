import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { ConsultDemoComponent } from './consult.component';

describe('ConsultDemoComponent', () => {
  let component: ConsultDemoComponent;
  let fixture: ComponentFixture<ConsultDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultDemoComponent],
      providers: [{ provide: ActivatedRoute, useValue: {} }]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
