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

  use: {
   browserName: 'webkit',
   headless: false,
   viewport: null
  },

});

module.exports = config;

