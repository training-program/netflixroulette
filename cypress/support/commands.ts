/// <reference types="cypress" />

Cypress.Commands.add('getByData', (selector) => cy.get(`[data-test=${selector}]`));

declare global {
  namespace Cypress {
    interface Chainable {
      getByData(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

export {};
