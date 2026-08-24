import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['html', 'text-summary']
    },
    browser: {
      provider: playwright(),
      instances: [{ browser: 'chromium', headless: true }]
    }
  }
});
