import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../../../test-config';
import { IMapFooterAttribution } from '../../map/map.interface';
import { SdgFullMapSkeletonFooter } from './full-map-footer.component';

const MOCK_ATTRIBUTION: IMapFooterAttribution = {
  organization: { name: 'Test Org', url: 'https://example.com' },
  firstPublicationDate: '2024-01-01'
};

describe('SdgFullMapSkeletonFooter', () => {
  let component: SdgFullMapSkeletonFooter;
  let fixture: ComponentFixture<SdgFullMapSkeletonFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SdgFullMapSkeletonFooter],
      providers: TEST_CONFIG.providers
    }).compileComponents();

    fixture = TestBed.createComponent(SdgFullMapSkeletonFooter);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('attribution', MOCK_ATTRIBUTION);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute publicationYear from string date', () => {
    fixture.componentRef.setInput('attribution', {
      organization: { name: 'Org', url: 'https://example.com' },
      firstPublicationDate: '2023-05-15'
    });

    expect(component.publicationYear()).toBe(', 2023');
  });

  it('should compute publicationYear from Date object', () => {
    fixture.componentRef.setInput('attribution', {
      organization: { name: 'Org', url: 'https://example.com' },
      firstPublicationDate: new Date('2022-06-01T12:00:00Z')
    });

    expect(component.publicationYear()).toBe(', 2022');
  });

  it('should return empty string when no firstPublicationDate', () => {
    fixture.componentRef.setInput('attribution', {
      organization: { name: 'Org', url: 'https://example.com' }
    });

    expect(component.publicationYear()).toBe('');
  });
});
