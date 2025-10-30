import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from 'projects/demo/src/test-config';

import { ShowcasesCartoComponent } from './showcases-carto.component';

describe('ShowcasesCartoComponent', () => {
  let component: ShowcasesCartoComponent;
  let fixture: ComponentFixture<ShowcasesCartoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowcasesCartoComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowcasesCartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
