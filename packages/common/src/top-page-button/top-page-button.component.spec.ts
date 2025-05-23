import { DOCUMENT, ViewportScroller } from '@angular/common';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { TopPageButtonComponent } from './top-page-button.component';

describe('TopPageButtonComponent', () => {
  let component: TopPageButtonComponent;
  let fixture: ComponentFixture<TopPageButtonComponent>;
  let document: Document;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        TopPageButtonComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TopPageButtonComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tooltip', 'Test');
    document = TestBed.inject(DOCUMENT);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with showButton as false', () => {
    expect(component.showButton()).toBeFalse();
  });

  it('should show button when scrolling up', fakeAsync(() => {
    window.scrollY = 200;
    document.dispatchEvent(new Event('scroll'));
    tick();

    window.scrollY = 100;
    document.dispatchEvent(new Event('scroll'));
    tick();

    expect(component.showButton()).toBeTrue();
  }));

  it('should hide button when scrolling down', fakeAsync(() => {
    window.scrollY = 100;
    document.dispatchEvent(new Event('scroll'));
    tick();

    window.scrollY = 200;
    document.dispatchEvent(new Event('scroll'));
    tick();

    expect(component.showButton()).toBeFalse();
  }));

  it('should call scrollToPosition when scrollToTop is called', () => {
    const viewportScroller = TestBed.inject(ViewportScroller);
    const spy = spyOn(viewportScroller, 'scrollToPosition');

    component.scrollToTop();

    expect(spy).toHaveBeenCalledWith([0, 0]);
  });
});
