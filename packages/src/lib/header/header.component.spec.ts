import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../test-config';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', '');
    fixture.componentRef.setInput('contactUs', {
      label: 'Nous joindre',
      route: 'contact-us'
    });
    fixture.componentRef.setInput('isHandset', false);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render logo', () => {
    const logoElement = fixture.nativeElement.querySelector(
      '.sdg-header-content-logo'
    );
    expect(logoElement).toBeTruthy();
  });

  it('should render title', () => {
    const titleElement = fixture.nativeElement.querySelector(
      '.sdg-header-content-title'
    );
    expect(titleElement).toBeTruthy();
  });

  it('should render options', () => {
    const optionsElement = fixture.nativeElement.querySelector(
      '.sdg-header-content-options'
    );
    expect(optionsElement).toBeTruthy();
  });

  it('should render contact us', () => {
    fixture.detectChanges();
    const contactUsElement = fixture.nativeElement.querySelector(
      '.sdg-header-content-options-contact-us'
    );
    expect(contactUsElement).toBeTruthy();
  });
});
