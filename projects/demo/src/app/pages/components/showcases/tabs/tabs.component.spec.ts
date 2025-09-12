import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

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

  it('should apply custom column gap to tab labels', () => {
    const tabLabelsContainer = fixture.debugElement.query(
      By.css('.mat-mdc-tab-labels')
    );
    const style = window.getComputedStyle(tabLabelsContainer.nativeElement);
    expect(style.columnGap).toBe('24px');
  });

  it('should apply custom padding and height to tab content', () => {
    const tabContent = fixture.debugElement.query(By.css('.tab-content'));
    const style = window.getComputedStyle(tabContent.nativeElement);
    expect(style.paddingTop).toBe('24px');
    expect(style.height).toBe('100px');
  });

  it('should show pagination arrows with correct min-width', () => {
    const pagination = fixture.debugElement.query(
      By.css('.mat-mdc-tab-header-pagination')
    );
    expect(pagination).toBeTruthy();
    const style = window.getComputedStyle(pagination.nativeElement);
    expect(style.minWidth).toBe('40px');
  });
});
