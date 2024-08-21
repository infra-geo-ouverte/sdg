import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../test-config';
import { NoticeComponent } from './notice.component';

describe('NoticeComponent', () => {
  let component: NoticeComponent;
  let fixture: ComponentFixture<NoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticeComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(NoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
