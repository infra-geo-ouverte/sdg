import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeDemoComponent } from './notice.component';

describe('NoticeComponent', () => {
  let component: NoticeDemoComponent;
  let fixture: ComponentFixture<NoticeDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticeDemoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NoticeDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
