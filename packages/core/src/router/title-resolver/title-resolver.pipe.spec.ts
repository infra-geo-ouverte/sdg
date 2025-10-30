import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from 'packages/core/test-config';

import { TitleResolver } from './title-resolver';
import { TitleResolverPipe } from './title-resolver.pipe';

@Injectable()
export class TitleResolverMock implements TitleResolver {
  resolve(): string {
    return '';
  }

  resolveStatic(): string {
    return '';
  }
}

describe('TitleResolverPipe', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // 2. Provide the mock for the pipe's dependency
      providers: [
        ...(TEST_CONFIG.providers ?? []),
        TitleResolverPipe,
        { provide: TitleResolver, useClass: TitleResolverMock }
      ]
    }).compileComponents();
  });

  it('create an instance', () => {
    const pipe = TestBed.inject(TitleResolverPipe);
    expect(pipe).toBeTruthy();
  });
});
