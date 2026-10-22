import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  workers: 2,
  timeout: 60_000,
  use: { baseURL: 'http://127.0.0.1:4399/powerplatform-samples/', trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { browserName: 'chromium', viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', use: { browserName: 'chromium', viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true } },
  ],
  webServer: { command: 'npm run preview -- --port 4399', url: 'http://127.0.0.1:4399/powerplatform-samples/', reuseExistingServer: false, timeout: 60_000 },
});
