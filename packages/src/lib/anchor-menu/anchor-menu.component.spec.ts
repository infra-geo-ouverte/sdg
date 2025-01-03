import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from 'packages/src/test-config';

import { AnchorMenuComponent } from './anchor-menu.component';

describe('AnchorMenuComponent', () => {
  let component: AnchorMenuComponent;
  let fixture: ComponentFixture<AnchorMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnchorMenuComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(AnchorMenuComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('anchors', [
      {
        id: 'Section 1',
        htmlElementId: 'section1'
      },
      {
        id: 'Section 2',
        htmlElementId: 'section2'
      }
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
