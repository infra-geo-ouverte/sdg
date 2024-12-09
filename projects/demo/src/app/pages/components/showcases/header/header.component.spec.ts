import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from 'projects/demo/src/test-config';

import { HeaderDemoComponent } from './header.component';

describe('HeaderDemoComponent', () => {
  let component: HeaderDemoComponent;
  let fixture: ComponentFixture<HeaderDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderDemoComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
