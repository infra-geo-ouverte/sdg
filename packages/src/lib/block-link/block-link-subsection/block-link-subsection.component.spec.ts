import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from 'packages/src/test-config';

import { BlockLinkSubsectionComponent } from './block-link-subsection.component';

describe('BlockLinkSubsectionComponent', () => {
  let component: BlockLinkSubsectionComponent;
  let fixture: ComponentFixture<BlockLinkSubsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockLinkSubsectionComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(BlockLinkSubsectionComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('subsection', {
      title: 'Test',
      path: 'test.com'
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
