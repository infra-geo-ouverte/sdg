import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideTranslateService } from '@ngx-translate/core';

import { IMapFooterAttribution } from '../..';
import { TEST_CONFIG } from '../../../../test-config';
import { PanelService } from '../shared/panel.service';
import { SdgFullMapSkeletonDrawer } from './full-map-drawer.component';

const MOCK_ATTRIBUTION: IMapFooterAttribution = {
  organization: { name: 'Test Org', url: 'https://example.com' },
  firstPublicationDate: '2024-01-01'
};

describe('SdgFullMapSkeletonDrawer', () => {
  let component: SdgFullMapSkeletonDrawer;
  let fixture: ComponentFixture<SdgFullMapSkeletonDrawer>;
  let panelService: PanelService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SdgFullMapSkeletonDrawer],
      providers: [...TEST_CONFIG.providers!, provideTranslateService()]
    }).compileComponents();

    fixture = TestBed.createComponent(SdgFullMapSkeletonDrawer);
    component = fixture.componentInstance;
    panelService = TestBed.inject(PanelService);

    fixture.componentRef.setInput('attribution', MOCK_ATTRIBUTION);
    fixture.componentRef.setInput('isHandset', false);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject PanelService', () => {
    expect(component.panelService).toBe(panelService);
  });
});
