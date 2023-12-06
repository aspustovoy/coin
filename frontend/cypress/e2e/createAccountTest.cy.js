/* eslint-disable no-return-assign */
/* eslint-disable jest/expect-expect */
/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
    cy.get('input[name=username]').type('developer');
    cy.get('input[name=password]').type('skillbox');
    cy.get('.btn-submit').click();
  });

  it('Возможность создать новый счёт', () => {
    let numberOfAccounts;

    cy.get('.account-card')
      .its('length')
      .then((res) => (numberOfAccounts = res))
      .then(() => {
        // проверка кнопки добавления нового аккаунта
        cy.get('.btn-new-account').should('exist');
        cy.get('.btn-new-account').click();
        // проверка добавления нового аккаунта в DOM
        cy.get('.account-card').should('have.length', numberOfAccounts + 1);
      });
  });
});
