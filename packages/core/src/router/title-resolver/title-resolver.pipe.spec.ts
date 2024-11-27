import { TitleResolverPipe } from './title-resolver.pipe';

describe('TitleResolverPipe', () => {
  it('create an instance', () => {
    const pipe = new TitleResolverPipe({} as any);
    expect(pipe).toBeTruthy();
  });
});
