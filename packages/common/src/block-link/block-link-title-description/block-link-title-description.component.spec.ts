import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../../test-config';
import { BlockLinkTitleDescriptionComponent } from './block-link-title-description.component';

describe('BlockLinkTitleDescriptionComponent', () => {
  let component: BlockLinkTitleDescriptionComponent;
  let fixture: ComponentFixture<BlockLinkTitleDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockLinkTitleDescriptionComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(BlockLinkTitleDescriptionComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('section', {
      title: 'Test',
      path: 'test.com',
      description: 'Test'
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
