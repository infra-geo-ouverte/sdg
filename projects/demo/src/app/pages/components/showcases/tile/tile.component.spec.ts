import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from 'projects/demo/src/test-config';

import { TileDemoComponent } from './tile.component';

describe('TileDemoComponent', () => {
  let component: TileDemoComponent;
  let fixture: ComponentFixture<TileDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TileDemoComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(TileDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
