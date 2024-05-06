import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../../../test-config';
import { ShowcasesComponent } from './showcases.component';

describe('ShowcasesComponent', () => {
  let component: ShowcasesComponent;
  let fixture: ComponentFixture<ShowcasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowcasesComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowcasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
