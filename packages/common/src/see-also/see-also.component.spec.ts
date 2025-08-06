import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../test-config';
import { SeeAlsoComponent } from './see-also.component';

describe('SeeAlsoComponent', () => {
  let component: SeeAlsoComponent;
  let fixture: ComponentFixture<SeeAlsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeeAlsoComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(SeeAlsoComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('links', [
      { label: 'test', url: 'https://www.google.com' }
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
