/* eslint-disable jest/valid-expect */
/* eslint-disable no-loop-func */
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

  it('Возможность просмотреть список счетов', () => {
    let numberOfAccounts;
    let accountId;
    cy.get('.account-card')
      .its('length')
      .then((res) => (numberOfAccounts = res))
      .then(() => {
        for (let i = 0; i < numberOfAccounts; i++) {
          cy.get('.card-title')
            .eq(i)
            .invoke('text')
            .then((res) => (accountId = res));
          cy.get('.account-card a')
            .eq(i)
            .click()
            .then(() => {
              // проверка соответствия аккаунтов
              cy.get('.title-value').should('have.text', `№ ${accountId}`);
              // проверка наличия детальной информации
              cy.get('.balance-container').should('exist');
              cy.get('.transaction-history ').should('exist');
            });
          // проверка загрузки следующей страницы
          cy.location().should((loc) => {
            expect(loc.pathname).to.eq(`/account/${accountId}`);
          });
          cy.get('.back-btn').click();
        }
      });
  });
});
