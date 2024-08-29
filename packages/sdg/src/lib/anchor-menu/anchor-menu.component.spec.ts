import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../test-config';
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
