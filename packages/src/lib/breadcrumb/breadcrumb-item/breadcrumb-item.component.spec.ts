import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../../test-config';
import { Breadcrumb } from '../shared';
import { BreadcrumbItemComponent } from './breadcrumb-item.component';

describe('BreadcrumbItemComponent', () => {
  let component: BreadcrumbItemComponent;
  let ref: ComponentRef<BreadcrumbItemComponent>;
  let fixture: ComponentFixture<BreadcrumbItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbItemComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbItemComponent);
    component = fixture.componentInstance;
    ref = fixture.componentRef;

    ref.setInput('breadcrumb', { menu: [{ title: '', url: '' }] });
    ref.setInput('last', false);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the breadcrumb label in an anchor element', () => {
    const breadcrumb: Breadcrumb = {
      id: '1',
      title: 'Home',
      url: '/'
    };

    ref.setInput('breadcrumb', breadcrumb);
    ref.setInput('last', false);

    fixture.detectChanges();

    const compiled: HTMLElement = fixture.nativeElement;
    expect(compiled.querySelector('a')?.textContent).toContain(
      breadcrumb.title
    );
  });

  it('should not display the last breadcrumb in an anchor element', () => {
    const breadcrumb: Breadcrumb = {
      id: '1',
      title: 'Current Page',
      url: ''
    };

    ref.setInput('breadcrumb', breadcrumb);
    ref.setInput('last', true);

    fixture.detectChanges();

    const compiled: HTMLElement = fixture.nativeElement;
    const element = compiled.querySelector('li');
    expect(element).toBeTruthy();
    expect(element?.textContent).toContain(breadcrumb.title);
    expect(compiled.querySelector('a')).toBeFalsy();
  });

  it('should display the last breadcrumb on handset device in an anchor element', () => {
    const breadcrumb: Breadcrumb = {
      id: '1',
      title: 'Current Page',
      url: ''
    };

    ref.setInput('breadcrumb', breadcrumb);
    ref.setInput('last', true);
    ref.setInput('isHandset', true);

    fixture.detectChanges();

    const compiled: HTMLElement = fixture.nativeElement;
    const element = compiled.querySelector('li');
    expect(element?.classList).toContain('--handset');
    expect(element?.classList).toContain('--last');

    const linkElement = compiled.querySelector('a');
    expect(linkElement).toBeTruthy();
    expect(linkElement?.textContent).toContain(breadcrumb.title);
  });
});
