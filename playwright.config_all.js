// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 40*1000,
  expect:{
    timeout: 3*1000
  },

  reporter:'html',

  projects: [
    {
      name: 'Firefox_browser_execution',
      use: {
        browserName: 'firefox',
        headless: true,
        viewport: null,
        screenshot: 'off'
      },
    },
    {
      name: 'Chromium_browser_execution',
      use: { 
        browserName: 'chromium',
        headless: false,
        viewport: null
      },
    },
    {
      name: 'Webkit_browser_execution',
      use: { 
        browserName: 'webkit',
        headless: true,
        viewport: null
      },
    },
  ]
});

module.exports = config;

