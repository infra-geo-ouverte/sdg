import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadarLanguageComponent } from './headar-language.component';

describe('HeadarLanguageComponent', () => {
  let component: HeadarLanguageComponent;
  let fixture: ComponentFixture<HeadarLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadarLanguageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HeadarLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
