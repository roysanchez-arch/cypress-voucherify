import { defineConfig } from 'cypress';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  e2e: {
    supportFile: 'cypress/support/e2e.ts',
    browser: 'chrome'
  },
  env: {
      SLACK_WEBHOOK_URL: process.env.CYPRESS_SLACK_WEBHOOK_URL,
      USER_LOGIN: process.env.CYPRESS_USER_LOGIN,
      PASS_LOGIN: process.env.CYPRESS_PASS_LOGIN,
  }
});