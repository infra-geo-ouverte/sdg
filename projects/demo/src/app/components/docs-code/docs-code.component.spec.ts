import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsCodeComponent } from './docs-code.component';

describe('DocsCodeComponent', () => {
  let component: DocsCodeComponent;
  let fixture: ComponentFixture<DocsCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocsCodeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DocsCodeComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput(
      'code',
      "import { YOUR_IMPORT_NAME } from '@igo2/sdg-common';"
    );
    fixture.componentRef.setInput('lang', 'typescript');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
