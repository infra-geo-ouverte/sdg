import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideTranslateService } from '@ngx-translate/core';

import { TEST_CONFIG } from '../../../test-config';
import { IMapFooterAttribution } from '../map/map.interface';
import { SdgFullMapSkeleton } from './full-map-skeleton.component';
import { PanelService } from './shared/panel.service';

const MOCK_ATTRIBUTION: IMapFooterAttribution = {
  organization: { name: 'Test Org', url: 'https://example.com' },
  firstPublicationDate: '2024-01-01'
};

describe('SdgFullMapSkeleton', () => {
  let component: SdgFullMapSkeleton;
  let fixture: ComponentFixture<SdgFullMapSkeleton>;
  let panelService: PanelService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SdgFullMapSkeleton],
      providers: [...TEST_CONFIG.providers!, provideTranslateService()]
    }).compileComponents();

    fixture = TestBed.createComponent(SdgFullMapSkeleton);
    component = fixture.componentInstance;
    panelService = TestBed.inject(PanelService);

    fixture.componentRef.setInput('attribution', MOCK_ATTRIBUTION);
    fixture.componentRef.setInput('isHandset', false);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should collapse panel on init when isHandset is true', async () => {
    panelService.expanded.set(true);
    fixture.componentRef.setInput('isHandset', true);

    component.ngOnInit();

    expect(panelService.expanded()).toBe(false);
  });

  it('should not collapse panel on init when isHandset is false', async () => {
    panelService.expanded.set(true);
    fixture.componentRef.setInput('isHandset', false);

    component.ngOnInit();

    expect(panelService.expanded()).toBe(true);
  });
});
