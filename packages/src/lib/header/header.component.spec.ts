import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../test-config';
import { HeaderComponent } from './header.component';
import { IHeaderLogo } from './header.interface';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let ref: ComponentRef<HeaderComponent>;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    ref = fixture.componentRef;

    ref.setInput('title', '');
    ref.setInput('logo', { primary: '' } satisfies IHeaderLogo);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
