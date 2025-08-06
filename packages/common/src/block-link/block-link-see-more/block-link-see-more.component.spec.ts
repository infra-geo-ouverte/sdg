import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../../test-config';
import { BlockLinkSeeMoreComponent } from './block-link-see-more.component';

describe('BlockLinkSeeMoreComponent', () => {
  let component: BlockLinkSeeMoreComponent;
  let fixture: ComponentFixture<BlockLinkSeeMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockLinkSeeMoreComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(BlockLinkSeeMoreComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('path', 'https://www.google.com/maps');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
