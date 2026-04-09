import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../../../../test-config';
import { SeeAlsoDemoComponent } from './see-also.component';

describe('SeeAlsoDemoComponent', () => {
  let component: SeeAlsoDemoComponent;
  let fixture: ComponentFixture<SeeAlsoDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeeAlsoDemoComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(SeeAlsoDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
