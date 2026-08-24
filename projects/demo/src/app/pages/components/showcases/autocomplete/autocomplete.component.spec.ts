import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../../../../test-config';
import { AutocompleteDemoComponent } from './autocomplete.component';

describe('AutocompleteDemoComponent', () => {
  let component: AutocompleteDemoComponent;
  let fixture: ComponentFixture<AutocompleteDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocompleteDemoComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(AutocompleteDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize filteredOptions with all options', () => {
    expect(component.filteredOptions()).toEqual(component.options);
  });

  it('should filter options based on control value', () => {
    component.myControl.setValue('ch');
    fixture.detectChanges();

    const filtered = component.filteredOptions();
    expect(filtered).toContain('Chat');
    expect(filtered).toContain('Chien');
    expect(filtered).not.toContain('Lapin');
  });

  it('should be case-insensitive when filtering', () => {
    component.myControl.setValue('CHAT');
    fixture.detectChanges();

    expect(component.filteredOptions()).toContain('Chat');
  });

  it('should return all options when value is empty', () => {
    component.myControl.setValue('some value');
    component.myControl.setValue('');
    fixture.detectChanges();

    expect(component.filteredOptions()).toEqual(component.options);
  });

  it('should return an empty array when no options match', () => {
    component.myControl.setValue('xyz');
    fixture.detectChanges();

    expect(component.filteredOptions()).toEqual([]);
  });

  it('should filter options containing the search term anywhere in the string', () => {
    component.myControl.setValue('rouge');
    fixture.detectChanges();

    expect(component.filteredOptions()).toContain('Poisson rouge');
  });
});
