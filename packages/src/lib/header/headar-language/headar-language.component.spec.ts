import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IHeaderLanguage } from '../header.interface';
import { HeadarLanguageComponent } from './headar-language.component';

describe('HeadarLanguageComponent', () => {
  let component: HeadarLanguageComponent;
  let ref: ComponentRef<HeadarLanguageComponent>;
  let fixture: ComponentFixture<HeadarLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadarLanguageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HeadarLanguageComponent);
    component = fixture.componentInstance;
    ref = fixture.componentRef;

    ref.setInput('options', {
      choices: [
        { key: 'en', label: 'En' },
        { key: 'fr', label: 'Fr' }
      ],
      default: 'fr'
    } satisfies IHeaderLanguage);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
