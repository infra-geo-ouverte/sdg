import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from 'projects/demo/src/test-config';

import { SequentialLinksDemoComponent } from './sequential-links.component';

describe('SequentialLinksDemoComponent', () => {
  let component: SequentialLinksDemoComponent;
  let fixture: ComponentFixture<SequentialLinksDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SequentialLinksDemoComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(SequentialLinksDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
