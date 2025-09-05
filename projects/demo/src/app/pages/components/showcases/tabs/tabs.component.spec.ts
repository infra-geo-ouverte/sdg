import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from 'projects/demo/src/test-config';

import { TabsDemoComponent } from './tabs.component';

describe('TabsDemoComponent', () => {
  let component: TabsDemoComponent;
  let fixture: ComponentFixture<TabsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsDemoComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(TabsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
