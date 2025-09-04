import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TEST_CONFIG } from 'projects/demo/src/test-config';

import { ChipsDemoComponent } from './chips.component';

describe('ChipsDemoComponent', () => {
  let component: ChipsDemoComponent;
  let fixture: ComponentFixture<ChipsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipsDemoComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(ChipsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render chips with correct class', () => {
    const chips = fixture.debugElement.queryAll(By.css('.mat-mdc-chip'));
    expect(chips.length).toBeGreaterThan(0);
    chips.forEach((chip) => {
      expect(chip.nativeElement.classList).toContain('mat-mdc-chip');
    });
  });

  it('should apply custom background color to chips', () => {
    const chip = fixture.debugElement.query(By.css('.mat-mdc-chip'));
    const style = window.getComputedStyle(chip.nativeElement);
    expect(style.backgroundColor).toBe('rgb(218, 230, 240)'); // --sdg-color-blue-pale
  });

  it('should apply custom text color to chips', () => {
    const chip = fixture.debugElement.query(By.css('.mat-mdc-chip'));
    const style = window.getComputedStyle(chip.nativeElement);
    expect(style.color).toBe('rgb(34, 54, 84)'); // --sdg-color-blue-normal
  });

  it('should apply correct min and max height to chips', () => {
    const chip = fixture.debugElement.query(By.css('.mdc-evolution-chip'));
    const style = window.getComputedStyle(chip.nativeElement);
    expect(parseInt(style.minHeight)).toBe(40);
    expect(parseInt(style.maxHeight)).toBe(60);
  });

  it('should apply correct min width to chips', () => {
    const chip = fixture.debugElement.query(By.css('.mdc-evolution-chip'));
    const style = window.getComputedStyle(chip.nativeElement);
    expect(parseInt(style.minWidth)).toBe(56);
  });

  it('should render disabled chips with correct styles', () => {
    component.navigationChipsDisabled.set(true);
    fixture.detectChanges();
    const chip = fixture.debugElement.query(By.css('.mat-mdc-chip'));
    const style = window.getComputedStyle(chip.nativeElement);
    expect(style.backgroundColor).toBe('rgb(218, 230, 240)'); // --sdg-color-grey-pale
    expect(style.color).toBe('rgb(34, 54, 84)'); // --sdg-color-grey-normal
  });

  it('should have the correct height for chips', () => {
    const chip = fixture.debugElement.query(By.css('.mat-mdc-chip'));
    const style = window.getComputedStyle(chip.nativeElement);
    expect(style.height).toBe('40px');
  });

  it('should have the correct width for chips', () => {
    const chip = fixture.debugElement.query(By.css('.mat-mdc-chip'));
    const style = window.getComputedStyle(chip.nativeElement);
    expect(parseInt(style.minWidth)).toBe(56);
  });
});
