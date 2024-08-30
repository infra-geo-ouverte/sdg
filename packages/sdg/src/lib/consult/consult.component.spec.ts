import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../test-config';
import { ConsultComponent } from './consult.component';

describe('AlertComponent', () => {
  let component: ConsultComponent;
  let fixture: ComponentFixture<ConsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('links', [
      { text: 'test', url: 'https://www.google.com' }
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
