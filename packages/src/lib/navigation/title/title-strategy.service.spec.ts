import { TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from 'packages/src/test-config';

import { INavigationTitleOptions } from '../navigation.interface';
import {
  NavigationTitleStrategy,
  TITLE_OPTIONS
} from './title-strategy.service';

export const NAVIGATION_TITLE_OPTIONS: INavigationTitleOptions = {
  suffix: 'TEST',
  separator: '-'
};

describe('TitleStrategyService', () => {
  let service: NavigationTitleStrategy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ...TEST_CONFIG.providers!,
        {
          provide: TITLE_OPTIONS,
          useValue: NAVIGATION_TITLE_OPTIONS
        },
        NavigationTitleStrategy
      ]
    }).compileComponents();
    service = TestBed.inject(NavigationTitleStrategy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
