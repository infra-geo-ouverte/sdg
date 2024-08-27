import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorDemoComponent } from './paginator.component';

describe('PaginatorDemoComponent', () => {
  let component: PaginatorDemoComponent;
  let fixture: ComponentFixture<PaginatorDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginatorDemoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginatorDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
