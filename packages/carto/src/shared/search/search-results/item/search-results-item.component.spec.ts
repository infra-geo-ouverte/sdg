import { ComponentFixture, TestBed } from '@angular/core/testing';

import { describe, expect, it } from 'vitest';

import { SearchResult } from '../../shared/search-source.interface';
import { SdgSearchResultsItem } from './search-results-item.component';

describe('SdgSearchResultsItem', () => {
  let component: SdgSearchResultsItem;
  let fixture: ComponentFixture<SdgSearchResultsItem>;

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
      imports: [SdgSearchResultsItem]
    }).compileComponents();

    fixture = TestBed.createComponent(SdgSearchResultsItem);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('result', mockResult);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a focusable button', () => {
    const button = fixture.nativeElement.querySelector('button');

    button.focus();

    expect(button).toBe(document.activeElement);
  });

  it('should have result input', () => {
    expect(component.result()).toEqual(mockResult);
  });

  it('should default hovered to false', () => {
    expect(component.hovered()).toBe(false);
  });

  it('should default selected to false', () => {
    expect(component.selected()).toBe(false);
  });

  it('should accept hovered input', () => {
    fixture.componentRef.setInput('hovered', true);
    fixture.detectChanges();
    expect(component.hovered()).toBe(true);
  });

  it('should accept selected input', () => {
    fixture.componentRef.setInput('selected', true);
    fixture.detectChanges();
    expect(component.selected()).toBe(true);
  });
});
