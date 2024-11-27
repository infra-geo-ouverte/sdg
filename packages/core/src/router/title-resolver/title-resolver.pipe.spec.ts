import { Injectable } from '@angular/core';

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
  it('create an instance', () => {
    const pipe = new TitleResolverPipe(new TitleResolverMock());
    expect(pipe).toBeTruthy();
  });
});
