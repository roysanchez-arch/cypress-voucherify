describe('Busca cuidafarma', () => {
  it('Busca en Google', () => {
    cy.visit('https://cuidafarma.pe');

    cy.get('div.shadow-close-button')
    .should('be.visible')
    .click();

    cy.get('div.cookies__content__button')
    .should('be.visible')
    .click();

    cy.get('input[placeholder="Buscar marca o producto"]')
    .should('be.visible')
    .type('paracetamol');

    cy.get('button[type="button"].SearchButton_searchButton__uSYgz')
    .filter(':visible')
    .should('have.length', 1)
    .click();
  });
});
