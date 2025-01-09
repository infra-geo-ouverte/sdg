import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../../test-config';
import { AnchorComponent } from './anchor.component';

describe('AnchorComponent', () => {
  let component: AnchorComponent;
  let fixture: ComponentFixture<AnchorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnchorComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(AnchorComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('path', 'https://www.google.com');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true for external paths', () => {
    fixture.componentRef.setInput('path', 'https://www.google.com');
    expect(component.externalPath()).toBe(true);
  });

  it('should return false for internal paths', () => {
    fixture.componentRef.setInput('path', '/internal-path');
    expect(component.externalPath()).toBe(false);
  });

  it('should return undefined for empty paths', () => {
    fixture.componentRef.setInput('path', '');
    expect(component.externalPath()).toBeUndefined();
  });
});
