// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

/**
 * Custom command to log into ParaBank.
 * It uses cy.session() to cache the session and speed up tests.
 * @param {string} username
 * @param {string} password
 */
Cypress.Commands.add('login', (username, password) => {
    cy.session([username, password], () => {
        cy.visit('/');
        cy.get('input[name="username"]').type(username);
        cy.get('input[name="password"]').type(password);
        cy.get('input[value="Log In"]').click();
        
        cy.get('a[href*="logout.htm"]').should('be.visible');
    }, {
        cacheAcrossSpecs: true 
    });
});