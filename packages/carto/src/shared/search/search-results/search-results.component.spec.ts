import { ComponentFixture, TestBed } from '@angular/core/testing';

import { describe, expect, it } from 'vitest';

import {
  SearchResult,
  SearchResultGroup
} from '../shared/search-source.interface';
import { SdgSearchResults } from './search-results.component';

function mockSource(id: string, title: string) {
  return { id, title, enabled: true, order: 1 } as any;
}

function mockResult(id: string, title: string, source: any): SearchResult {
  return { id, title, source } as SearchResult;
}

describe('SdgSearchResults', () => {
  let component: SdgSearchResults;
  let fixture: ComponentFixture<SdgSearchResults>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SdgSearchResults]
    }).compileComponents();

    fixture = TestBed.createComponent(SdgSearchResults);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('groups', []);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('result focus/select', () => {
    const source = mockSource('src-1', 'Source');
    const result = mockResult('r1', 'Result 1', source);

    beforeEach(() => {
      const groups: SearchResultGroup[] = [
        { source, results: [result], loading: false }
      ];
      fixture.componentRef.setInput('groups', groups);
      fixture.detectChanges();
    });

    it('should track focused result', () => {
      component.onResultFocus(result);
      expect(component.isFocused(result)).toBe(true);
    });

    it('should clear focused result on unfocus', () => {
      component.onResultFocus(result);
      component.onResultUnfocus(result);
      expect(component.isFocused(result)).toBe(false);
    });

    it('should not clear focus if a different result is unfocused', () => {
      const other = mockResult('r2', 'Result 2', source);
      component.onResultFocus(result);
      component.onResultUnfocus(other);
      expect(component.isFocused(result)).toBe(true);
    });

    it('should track selected result', () => {
      component.onResultSelect(result);
      expect(component.isSelected(result)).toBe(true);
    });
  });
});
