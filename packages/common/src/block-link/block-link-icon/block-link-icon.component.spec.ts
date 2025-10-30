import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../../test-config';
import { BlockLinkIconComponent } from './block-link-icon.component';

describe('BlockLinkIconComponent', () => {
  let component: BlockLinkIconComponent;
  let fixture: ComponentFixture<BlockLinkIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockLinkIconComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(BlockLinkIconComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('icon', 'test');
    fixture.componentRef.setInput('path', 'https://www.google.com/maps');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
