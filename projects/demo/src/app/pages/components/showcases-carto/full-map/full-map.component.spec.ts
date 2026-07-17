import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { FullMapDemoComponent } from './full-map.component';

describe('FullMapDemoComponent', () => {
  let component: FullMapDemoComponent;
  let fixture: ComponentFixture<FullMapDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullMapDemoComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(FullMapDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
