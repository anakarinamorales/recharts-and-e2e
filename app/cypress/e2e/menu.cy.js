import { checkIfMenuIsOpen } from './../utils/index.cy';

describe('Menu', () => {
  it('Should open and close the menu', () => {
    cy.visit('/');
    // menu should be closed on start
    checkIfMenuIsOpen(false);
    // clicking on the menu button should open the menu
    cy.get('button[aria-label="Main menu"]').click();
    checkIfMenuIsOpen(true);
    // clicking on the menu button again should close the menu
    cy.get('button[aria-label="Main menu"]').click();
    checkIfMenuIsOpen(false);
  });
  it('Should open the menu, show the menu items, and close it', () => {
    cy.visit('/');
    checkIfMenuIsOpen(false);
    // clicking on the menu button should open the menu
    cy.get('button[aria-label="Main menu"]').click();
    cy.get('button[aria-label="Main menu"]').should(
      'have.attr',
      'aria-expanded',
      'true'
    );
    // Checking if links in the menu are not undefined (meaning no data was fetched)
    cy.get('a', { timeout: 3000 }).each(($a) => {
      const message = $a.text();
      expect($a, message).to.have.attr('href').not.contain('undefined');
    });
  });
});
