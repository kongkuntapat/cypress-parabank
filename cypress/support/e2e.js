// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
import './commands'
import '@shelex/cypress-allure-plugin';

// บอกให้ Cypress ไม่ต้องทำให้เทสล้มเหลว เมื่อเจอบั๊กจากฝั่ง Application
Cypress.on('uncaught:exception', (err, runnable) => {
    // การ return false จะเป็นการบอก Cypress ว่า
    // "ไม่ต้องสนใจ error นี้ ปล่อยให้เทสทำงานต่อไป"
    return false;
});