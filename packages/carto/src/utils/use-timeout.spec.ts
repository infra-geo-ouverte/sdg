import { useTimeout } from './use-timeout';

describe('useTimeout', () => {
  let callback: jasmine.Spy;
  let timeout: ReturnType<typeof useTimeout>;

  beforeEach(() => {
    callback = jasmine.createSpy('callback');
    timeout = useTimeout(callback, 1000);
  });

  afterEach(() => {
    timeout.clear();
  });

  it('should call the callback after the specified delay', (done) => {
    timeout.set();

    setTimeout(() => {
      expect(callback).toHaveBeenCalled();
      done();
    }, 1100); // Slightly longer than the delay to ensure execution
  });

  it('should not call the callback if cleared before the delay', (done) => {
    timeout.set();
    timeout.clear();

    setTimeout(() => {
      expect(callback).not.toHaveBeenCalled();
      done();
    }, 1100);
  });

  it('should reset the timeout if set is called again before the delay', (done) => {
    timeout.set();

    setTimeout(() => {
      timeout.set(); // Reset the timeout
    }, 500);

    setTimeout(() => {
      expect(callback).not.toHaveBeenCalled();
    }, 900);

    setTimeout(() => {
      expect(callback).toHaveBeenCalled();
      done();
    }, 1600); // After the second delay
  });
});
