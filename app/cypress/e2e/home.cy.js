import { checkChartContent, checkIfMenuIsOpen } from './../utils/index.cy';

describe('Homepage/Overview page', () => {
  it('should navigate to the homepage and render the correct components/data', () => {
    cy.visit('/');
    checkIfMenuIsOpen(false);
    cy.get('h1').contains('Overview');

    // Checking if links in the menu are not undefined (meaning no data was fetched)
    cy.get('a', { timeout: 3000 }).each(($a) => {
      const message = $a.text();
      expect($a, message).to.have.attr('href').not.contain('undefined');
    });
    checkChartContent();
  });
});
