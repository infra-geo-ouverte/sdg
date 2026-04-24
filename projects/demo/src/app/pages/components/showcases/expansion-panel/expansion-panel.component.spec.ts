import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../../../../test-config';
import { ExpansionPanelDemoComponent } from './expansion-panel.component';

describe('ExpansionPanelDemoComponent', () => {
  let component: ExpansionPanelDemoComponent;
  let fixture: ComponentFixture<ExpansionPanelDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpansionPanelDemoComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpansionPanelDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
