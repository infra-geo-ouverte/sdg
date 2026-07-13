import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdgSearchBar } from './search-bar.component';

describe('SdgSearchBar', () => {
  let component: SdgSearchBar;
  let fixture: ComponentFixture<SdgSearchBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SdgSearchBar]
    }).compileComponents();

    fixture = TestBed.createComponent(SdgSearchBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default placeholder "Rechercher"', () => {
    expect(component.labels().placeholder).toBe('Rechercher');
  });

  it('should have default debounce of 300ms', () => {
    expect(component.debounce()).toBe(300);
  });

  it('should have default minLength of 2', () => {
    expect(component.minLength()).toBe(2);
  });

  it('should initialize term as empty string', () => {
    expect(component.term()).toBe('');
  });

  describe('onKeyup', () => {
    it('should ignore invalid keys', () => {
      const event = new KeyboardEvent('keyup', { key: 'Control' });
      component.onKeyup(event);
      expect(component.term()).toBe('');
    });

    it('should update term on valid key', () => {
      const input = fixture.nativeElement.querySelector('input');
      input.value = 'hello';
      const event = new KeyboardEvent('keyup', { key: 'o' });
      Object.defineProperty(event, 'target', { value: input });
      component.onKeyup(event);
      expect(component.term()).toBe('hello');
    });

    it('should emit search on Enter', () => {
      component.term.set('test query');
      const spy = vi.fn();
      component.search.subscribe(spy);

      const input = fixture.nativeElement.querySelector('input');
      const event = new KeyboardEvent('keyup', { key: 'Enter' });
      Object.defineProperty(event, 'target', { value: input });
      component.onKeyup(event);

      expect(spy).toHaveBeenCalledWith('test query');
    });

    it('should not stream value below minLength', () => {
      const spy = vi.fn();
      component.searchChange.subscribe(spy);

      const input = fixture.nativeElement.querySelector('input');
      input.value = 'a';
      const event = new KeyboardEvent('keyup', { key: 'a' });
      Object.defineProperty(event, 'target', { value: input });
      component.onKeyup(event);

      vi.advanceTimersByTime(300);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should stream value when length >= minLength after debounce', () => {
      const spy = vi.fn();
      component.searchChange.subscribe(spy);

      const input = fixture.nativeElement.querySelector('input');
      input.value = 'ab';
      const event = new KeyboardEvent('keyup', { key: 'b' });
      Object.defineProperty(event, 'target', { value: input });
      component.onKeyup(event);

      vi.advanceTimersByTime(300);
      expect(spy).toHaveBeenCalledWith('ab');
    });

    it('should stream empty value (to clear results)', () => {
      const spy = vi.fn();
      component.searchChange.subscribe(spy);

      const input = fixture.nativeElement.querySelector('input');
      input.value = '';
      const event = new KeyboardEvent('keyup', { key: 'Backspace' });
      Object.defineProperty(event, 'target', { value: input });
      component.onKeyup(event);

      vi.advanceTimersByTime(300);
      expect(spy).toHaveBeenCalledWith('');
    });

    it('should debounce rapid keystrokes', () => {
      const spy = vi.fn();
      component.searchChange.subscribe(spy);
      const input = fixture.nativeElement.querySelector('input');

      input.value = 'ab';
      const event1 = new KeyboardEvent('keyup', { key: 'b' });
      Object.defineProperty(event1, 'target', { value: input });
      component.onKeyup(event1);

      vi.advanceTimersByTime(100);

      input.value = 'abc';
      const event2 = new KeyboardEvent('keyup', { key: 'c' });
      Object.defineProperty(event2, 'target', { value: input });
      component.onKeyup(event2);

      vi.advanceTimersByTime(300);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('abc');
    });

    it('should not emit duplicate values via distinctUntilChanged', () => {
      const spy = vi.fn();
      component.searchChange.subscribe(spy);
      const input = fixture.nativeElement.querySelector('input');

      input.value = 'test';
      const event = new KeyboardEvent('keyup', { key: 't' });
      Object.defineProperty(event, 'target', { value: input });
      component.onKeyup(event);
      vi.advanceTimersByTime(300);

      // Same value again
      component.onKeyup(event);
      vi.advanceTimersByTime(300);

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onSearch', () => {
    it('should emit the current term', () => {
      const spy = vi.fn();
      component.search.subscribe(spy);
      component.term.set('my search');
      component.onSearch();
      expect(spy).toHaveBeenCalledWith('my search');
    });
  });

  describe('onClear', () => {
    it('should reset term to empty', () => {
      component.term.set('something');
      component.onClear();
      expect(component.term()).toBe('');
    });

    it('should emit empty string via searchChange after debounce', () => {
      const spy = vi.fn();
      component.searchChange.subscribe(spy);
      component.term.set('something');
      component.onClear();
      vi.advanceTimersByTime(300);
      expect(spy).toHaveBeenCalledWith('');
    });

    it('should focus the input element', () => {
      const input = fixture.nativeElement.querySelector('input');
      const focusSpy = vi.spyOn(input, 'focus');
      component.onClear();
      expect(focusSpy).toHaveBeenCalled();
    });
  });
});
