import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from 'projects/demo/src/test-config';

import { NoticeDemoComponent } from './notice.component';

describe('NoticeDemoComponent', () => {
  let component: NoticeDemoComponent;
  let fixture: ComponentFixture<NoticeDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticeDemoComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(NoticeDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
