import { ComponentFixture, TestBed } from '@angular/core/testing';

import { describe, expect, it } from 'vitest';

import { SearchResult } from '../shared/search-source.interface';
import { SdgSearchResultItem } from './search-result-item.component';

describe('SdgSearchResultItem', () => {
  let component: SdgSearchResultItem;
  let fixture: ComponentFixture<SdgSearchResultItem>;

  const mockResult: SearchResult = {
    id: 'item-1',
    title: 'Test Result',
    titleHtml: '<b>Test</b> Result',
    subtitleHtml: '<small>Subtitle</small>',
    icon: 'location_on',
    source: { id: 'test', title: 'Test' } as any
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SdgSearchResultItem]
    }).compileComponents();

    fixture = TestBed.createComponent(SdgSearchResultItem);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('result', mockResult);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have result input', () => {
    expect(component.result()).toEqual(mockResult);
  });

  it('should default focused to false', () => {
    expect(component.focused()).toBe(false);
  });

  it('should default selected to false', () => {
    expect(component.selected()).toBe(false);
  });

  it('should accept focused input', () => {
    fixture.componentRef.setInput('focused', true);
    fixture.detectChanges();
    expect(component.focused()).toBe(true);
  });

  it('should accept selected input', () => {
    fixture.componentRef.setInput('selected', true);
    fixture.detectChanges();
    expect(component.selected()).toBe(true);
  });
});
