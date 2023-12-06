/* eslint-disable jest/valid-expect */
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
    cy.get('.account-card a').eq(0).click();
  });

  it('Возможность перевести сумму со счёта на счёт', () => {
    let balance;
    const account = '5555341244441115';

    cy.get('.balance-value')
      .invoke('text')
      .then((res) => (balance = res.replace(/[^0-9]/g, '')))
      .then(() => {
        // проверка загрузки формы
        cy.get('.transfer-form').should('exist');
        // проверка нажатия кнопки формы с пустыми полями
        cy.get('.btn-transfer').click();
        cy.get('.bg-danger').should('exist');
        // проверка нажатия кнопки формы c невалидными полями
        cy.get('input[id=to]').type('-1');
        cy.get('input[id=amount]').type('-1');
        cy.get('.btn-transfer').click();
        cy.get('.bg-danger').should('exist');
        // проверка нажатия кнопки формы с суммой превышающей баланс
        cy.get('input[id=to]').clear();
        cy.get('input[id=amount]').clear();
        cy.get('input[id=to]').type(account);
        cy.get('input[id=amount]').type(balance + 1);
        cy.get('.btn-transfer').click();
        cy.get('.alert-danger').should('exist');
        cy.get('.bg-danger').should('not.exist');
        // проверка перевода суммы
        cy.get('input[id=to]').clear();
        cy.get('input[id=amount]').clear();
        cy.get('input[id=to]').type(account);
        cy.get('input[id=amount]').type(1);
        cy.get('.btn-transfer').click();
        cy.get('.bg-danger').should('not.exist');
        cy.wait(3000).get('.alert-danger').should('not.exist');
        cy.get('.balance-value')
          .invoke('text')
          .then((res) => res.replace(/[^0-9]/g, ''))
          .then((res) => expect(res).not.to.equal(balance));
      });
  });
});
