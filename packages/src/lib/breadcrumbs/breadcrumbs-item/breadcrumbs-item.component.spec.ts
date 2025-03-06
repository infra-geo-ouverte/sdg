import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../../test-config';
import { Breadcrumb } from '../shared';
import { BreadcrumbsItemComponent } from './breadcrumbs-item.component';

describe('BreadcrumbsItemComponent', () => {
  let component: BreadcrumbsItemComponent;
  let fixture: ComponentFixture<BreadcrumbsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbsItemComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbsItemComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('breadcrumb', {
      menu: [{ title: '', url: '' }]
    });
    fixture.componentRef.setInput('last', false);
    fixture.componentRef.setInput('isHandset', false);

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

    fixture.componentRef.setInput('breadcrumb', breadcrumb);
    fixture.componentRef.setInput('last', false);
    fixture.componentRef.setInput('isHandset', false);

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

    fixture.componentRef.setInput('breadcrumb', breadcrumb);
    fixture.componentRef.setInput('last', true);
    fixture.componentRef.setInput('isHandset', false);

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

    fixture.componentRef.setInput('breadcrumb', breadcrumb);
    fixture.componentRef.setInput('last', true);
    fixture.componentRef.setInput('isHandset', true);

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
