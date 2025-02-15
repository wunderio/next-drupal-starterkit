/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
//

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      testMenuAtViewport(viewPort: ViewportPreset): Chainable<void>;
      login(username: string, password: string): Chainable<void>;
    }
  }
}

import ViewportPreset = Cypress.ViewportPreset;
Cypress.Commands.add("testMenuAtViewport", (viewport: ViewportPreset) => {
  cy.viewport(viewport);
  // Navigating to the main page and clicking on the menu button
  cy.visit("https://frontend.lndo.site");
  cy.get("button[aria-label='Toggle menu']").click();
  cy.wait(500);
  // Opening second level menu
  cy.get("button[aria-label='Show submenu for Example page']").click();
  cy.wait(500);
  // Opening third level menu
  cy.get(
    "button[aria-label='Show submenu for Example second level page']",
  ).click();
  cy.wait(500);
  // Clicking on the third level menu item.
  cy.get("a[href='/example-third-level-page']").click();
  cy.wait(500);
  // The page should be loaded and the title should be visible
  cy.contains("The Economist").should("be.visible").should("exist");
});

Cypress.Commands.add("login", (username: string, password: string) => {
  cy.visit("https://frontend.lndo.site/auth/login?callbackUrl=%2F");
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.wait(3000);
  cy.get('button[type="submit"]').click();
});

export {};
