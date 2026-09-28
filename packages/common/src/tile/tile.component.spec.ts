import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../test-config';
import { TileComponent } from './tile.component';

describe('TileComponent', () => {
  let component: TileComponent;
  let fixture: ComponentFixture<TileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TileComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(TileComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'Title');
    fixture.componentRef.setInput('href', 'https://www.google.com/');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should truncate long titles unless title validation is ignored', () => {
    const title = 'A title that contains more than forty-five characters';

    fixture.componentRef.setInput('title', title);
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('.sdg-tile-title').textContent
    ).toContain(`${title.slice(0, 45)}...`);

    fixture.componentRef.setInput('ignoreTitleValidation', true);
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('.sdg-tile-title').textContent
    ).toContain(title);
  });
});
