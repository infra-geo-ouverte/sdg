import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from 'packages/src/test-config';

import { SequentialLinksComponent } from './sequential-links.component';

describe('SequentialLinksComponent', () => {
  let component: SequentialLinksComponent;
  let fixture: ComponentFixture<SequentialLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SequentialLinksComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(SequentialLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
