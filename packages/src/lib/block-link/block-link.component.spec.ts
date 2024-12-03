import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../test-config';
import { BlockLinkComponent } from './block-link.component';

describe('BlockLinkComponent', () => {
  let component: BlockLinkComponent;
  let fixture: ComponentFixture<BlockLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockLinkComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(BlockLinkComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('section', {
      section: {
        title: 'Test',
        path: 'test.com',
        description: 'Test'
      }
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
