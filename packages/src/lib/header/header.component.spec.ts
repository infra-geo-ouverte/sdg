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
    const logoElement = fixture.nativeElement.querySelector('.logo');
    expect(logoElement).toBeTruthy();
  });

  it('should render title', () => {
    const titleElement = fixture.nativeElement.querySelector('.title');
    expect(titleElement).toBeTruthy();
  });

  it('should render options', () => {
    const optionsElement = fixture.nativeElement.querySelector('.options');
    expect(optionsElement).toBeTruthy();
  });

  it('should render contact us', () => {
    fixture.detectChanges();
    const contactUsElement = fixture.nativeElement.querySelector('.contact-us');
    expect(contactUsElement).toBeTruthy();
  });
});
