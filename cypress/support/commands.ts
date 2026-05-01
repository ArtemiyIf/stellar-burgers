declare namespace Cypress {
  interface Chainable {
    addIngredientByName(name: string): Chainable<void>;
    setTokens(): Chainable<void>;
    clearTokens(): Chainable<void>;
  }
}

Cypress.Commands.add('addIngredientByName', (name: string) => {
  cy.contains(name).parents('li').find('button').click();
});

Cypress.Commands.add('setTokens', () => {
  localStorage.setItem('refreshToken', 'mock-refresh');
  cy.setCookie('accessToken', 'mock-token');
});

Cypress.Commands.add('clearTokens', () => {
  localStorage.removeItem('refreshToken');
  cy.clearCookie('accessToken');
});
