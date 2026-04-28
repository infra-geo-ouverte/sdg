import { useTimeout } from './use-timeout';

describe('useTimeout', () => {
  let callback: () => void;
  let callbackSpy: ReturnType<typeof vi.fn>;
  let timeout: ReturnType<typeof useTimeout>;

  beforeEach(() => {
    vi.useFakeTimers();
    callbackSpy = vi.fn();
    callback = () => (callbackSpy as any)();
    timeout = useTimeout(callback, 1000);
  });

  afterEach(() => {
    timeout.clear();
    vi.useRealTimers();
  });

  it('should call the callback after the specified delay', () => {
    timeout.set();

    vi.advanceTimersByTime(1100);

    expect(callbackSpy).toHaveBeenCalled();
  });

  it('should not call the callback if cleared before the delay', () => {
    timeout.set();
    timeout.clear();

    vi.advanceTimersByTime(1100);

    expect(callbackSpy).not.toHaveBeenCalled();
  });

  it('should reset the timeout if set is called again before the delay', () => {
    timeout.set();

    vi.advanceTimersByTime(500);
    timeout.set(); // Reset the timeout

    vi.advanceTimersByTime(400);
    expect(callbackSpy).not.toHaveBeenCalled();

    vi.advanceTimersByTime(700);
    expect(callbackSpy).toHaveBeenCalled();
  });
});
