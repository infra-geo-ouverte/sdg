import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TEST_CONFIG } from '../../../../../test-config';
import { TableDemoComponent } from './table.component';

describe('TableDemoComponent', () => {
  let component: TableDemoComponent;
  let fixture: ComponentFixture<TableDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableDemoComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(TableDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a standard table', () => {
    const tables = fixture.debugElement.queryAll(
      By.css('table:not([grey]):not([simple])')
    );
    expect(tables.length).toBeGreaterThan(0);
  });

  it('should render a table with grey attribute', () => {
    const greyTable = fixture.debugElement.query(By.css('table[grey]'));
    expect(greyTable).toBeTruthy();
  });

  it('should render a table with simple attribute', () => {
    const simpleTable = fixture.debugElement.query(By.css('table[simple]'));
    expect(simpleTable).toBeTruthy();
  });

  it('should render numeric table headers', () => {
    const numericHeaders = fixture.debugElement.queryAll(By.css('th[numeric]'));
    expect(numericHeaders.length).toBeGreaterThan(0);
  });

  it('should render numeric table cells', () => {
    const numericCells = fixture.debugElement.queryAll(By.css('td[numeric]'));
    expect(numericCells.length).toBeGreaterThan(0);
  });

  it('should render two example viewer components', () => {
    const exampleViewers = fixture.debugElement.queryAll(
      By.css('app-example-viewer')
    );
    expect(exampleViewers.length).toBe(2);
  });
});
