import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../../../../test-config';
import { SearchBarDemoComponent } from './search-bar.component';

describe('SearchBarDemoComponent', () => {
  let component: SearchBarDemoComponent;
  let fixture: ComponentFixture<SearchBarDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarDemoComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update searchTerm on search event', () => {
    component.searchTerm.set('hello');
    expect(component.searchTerm()).toBe('hello');
  });

  it('should update liveTerm on searchChange event', () => {
    component.liveTerm.set('test');
    expect(component.liveTerm()).toBe('test');
  });
});
