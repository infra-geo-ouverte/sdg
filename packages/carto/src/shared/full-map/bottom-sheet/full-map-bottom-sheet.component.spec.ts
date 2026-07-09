import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../../../test-config';
import { IMapFooterAttribution } from '../../map/map.interface';
import { PanelService } from '../shared/panel.service';
import { SdgFullMapSkeletonBottomSheet } from './full-map-bottom-sheet.component';

const MOCK_ATTRIBUTION: IMapFooterAttribution = {
  organization: { name: 'Test Org', url: 'https://example.com' },
  firstPublicationDate: '2024-01-01'
};

describe('SdgFullMapSkeletonBottomSheet', () => {
  let component: SdgFullMapSkeletonBottomSheet;
  let fixture: ComponentFixture<SdgFullMapSkeletonBottomSheet>;
  let panelService: PanelService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SdgFullMapSkeletonBottomSheet],
      providers: TEST_CONFIG.providers
    }).compileComponents();

    fixture = TestBed.createComponent(SdgFullMapSkeletonBottomSheet);
    component = fixture.componentInstance;
    panelService = TestBed.inject(PanelService);

    fixture.componentRef.setInput('attribution', MOCK_ATTRIBUTION);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set panel expanded to false on construction', () => {
    expect(panelService.expanded()).toBe(false);
  });

  it('should expand panel on swipe up exceeding threshold', () => {
    panelService.expanded.set(false);

    const touchStartEvent = {
      touches: [{ clientY: 300 }]
    } as unknown as TouchEvent;
    const touchEndEvent = {
      changedTouches: [{ clientY: 250 }]
    } as unknown as TouchEvent;

    component.onTouchStart(touchStartEvent);
    component.onTouchEnd(touchEndEvent);

    expect(panelService.expanded()).toBe(true);
  });

  it('should collapse panel on swipe down exceeding threshold', () => {
    panelService.expanded.set(true);

    const touchStartEvent = {
      touches: [{ clientY: 250 }]
    } as unknown as TouchEvent;
    const touchEndEvent = {
      changedTouches: [{ clientY: 300 }]
    } as unknown as TouchEvent;

    component.onTouchStart(touchStartEvent);
    component.onTouchEnd(touchEndEvent);

    expect(panelService.expanded()).toBe(false);
  });

  it('should not toggle panel when swipe does not exceed threshold', () => {
    panelService.expanded.set(false);

    const touchStartEvent = {
      touches: [{ clientY: 300 }]
    } as unknown as TouchEvent;
    const touchEndEvent = {
      changedTouches: [{ clientY: 285 }]
    } as unknown as TouchEvent;

    component.onTouchStart(touchStartEvent);
    component.onTouchEnd(touchEndEvent);

    expect(panelService.expanded()).toBe(false);
  });
});
