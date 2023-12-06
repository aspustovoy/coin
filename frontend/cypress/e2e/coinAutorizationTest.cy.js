/* eslint-disable jest/valid-expect */
/* eslint-disable jest/expect-expect */
/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('Возможность авторизоваться', () => {
    // проверка загрузки формы авторизации
    cy.get('.authorization-form').should('exist');
    // проверка нажатия кнопки авторизации с пустыми полями
    cy.get('.btn-submit').click();
    cy.get('.bg-danger').should('exist');
    // проверка нажатия кнопки c невалидными логином и паролем
    cy.get('input[name=username]').type('12345');
    cy.get('input[name=password]').type('12345');
    cy.get('.btn-submit').click();
    cy.get('.bg-danger').should('exist');
    // проверка нажатия кнопки с невалидным логином
    cy.get('input[name=username]').clear();
    cy.get('input[name=password]').clear();
    cy.get('input[name=username]').type('12345');
    cy.get('input[name=password]').type('skillbox');
    cy.get('.btn-submit').click();
    cy.get('.bg-danger').should('exist');
    // проверка нажатия кнопки с невалидным паролем
    cy.get('input[name=username]').clear();
    cy.get('input[name=password]').clear();
    cy.get('input[name=username]').type('developer');
    cy.get('input[name=password]').type('12345');
    cy.get('.btn-submit').click();
    cy.get('.bg-danger').should('exist');
    // проверка нажатия кнопки с неверным логином
    cy.get('input[name=username]').clear();
    cy.get('input[name=password]').clear();
    cy.get('input[name=username]').type('123456');
    cy.get('input[name=password]').type('skillbox');
    cy.get('.btn-submit').click();
    cy.get('.alert-danger').should('exist');
    cy.get('.bg-danger').should('not.exist');
    // проверка нажатия кнопки с неверным паролем
    cy.get('input[name=username]').clear();
    cy.get('input[name=password]').clear();
    cy.get('input[name=username]').type('developer');
    cy.get('input[name=password]').type('123456');
    cy.get('.btn-submit').click();
    cy.get('.alert-danger').should('exist');
    cy.get('.bg-danger').should('not.exist');
    // проверка прохождения авторизации
    cy.get('input[name=username]').clear();
    cy.get('input[name=password]').clear();
    cy.get('input[name=username]').type('developer');
    cy.get('input[name=password]').type('skillbox');
    cy.get('.btn-submit').click();
    cy.get('.bg-danger').should('not.exist');
    cy.wait(3000).get('.alert-danger').should('not.exist');
    // проверка загрузки следующей страницы
    cy.get('.account-card').should('exist');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/accounts');
    });
  });
});
