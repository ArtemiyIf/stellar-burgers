const bunName = 'Краторная булка N-200i';
const ingredientName = 'Биокотлета из марсианской Магнолии';
const API = 'https://norma.education-services.ru/api';

describe('Страница конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', `${API}/ingredients`, { fixture: 'ingredients.json' });
    cy.intercept('GET', `${API}/auth/user`, { fixture: 'user.json' });
    cy.setTokens();
    cy.visit('/');
    cy.contains(bunName, { timeout: 15000 }).should('exist');
  });

  afterEach(() => {
    cy.clearTokens();
  });

  it('добавление булки в конструктор', () => {
    cy.addIngredientByName(bunName);
    cy.get('[class*=constructor-element]').contains(bunName).should('exist');
  });

  it('добавление начинки в конструктор', () => {
    cy.addIngredientByName(ingredientName);
    cy.get('[class*=constructor-element]').contains(ingredientName).should('exist');
  });

  describe('Модальные окна', () => {
    beforeEach(() => {
      cy.contains(bunName).parent('li').find('a').click();
    });

    it('открытие модального окна ингредиента', () => {
      cy.get('#modals').contains('Детали ингредиента').should('exist');
      cy.get('#modals').contains(bunName).should('exist');
    });

    it('закрытие по клику на крестик', () => {
      cy.get('#modals').contains('Детали ингредиента').next().click();
      cy.get('#modals').should('not.be.visible');
    });
  });

  describe('Создание заказа', () => {
    beforeEach(() => {
      cy.intercept('POST', `${API}/orders`, { fixture: 'newOrder.json' });
      cy.addIngredientByName(bunName);
      cy.addIngredientByName(ingredientName);
      cy.contains('Оформить заказ').click();
    });

    it('нажатие кнопки Оформить заказ', () => {
      cy.get('#modals').contains('101552');
    });

    it('конструктор пуст', () => {
      cy.get('#modals').find('h3').next('button').click();
      cy.contains('Выберите булки').should('exist');
      cy.contains('Выберите начинку').should('exist');
    });
  });
});
