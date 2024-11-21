import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IgoLanguageModule } from '@igo2/core/language';

import { TEST_CONFIG } from '../../test-config';
import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let ref: ComponentRef<NavigationComponent>;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationComponent, IgoLanguageModule],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    ref = fixture.componentRef;

    ref.setInput('links', [{}]);
    ref.setInput('isHandset', false);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
