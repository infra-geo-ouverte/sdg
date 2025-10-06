import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from 'projects/demo/src/test-config';

import { DocsCodeComponent } from './docs-code.component';

describe('DocsCodeComponent', () => {
  let component: DocsCodeComponent;
  let fixture: ComponentFixture<DocsCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocsCodeComponent],
      providers: TEST_CONFIG.providers
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
