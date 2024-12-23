describe('Homepage/Overview page', () => {
  it('should navigate to the homepage and render the correct components/data', () => {
    cy.visit('/');
    cy.get('h1').contains('Overview');

    // Checking if links in the menu are not undefined
    cy.get('a', { timeout: 3000 }).each(($a) => {
      const message = $a.text();
      expect($a, message).to.have.attr('href').not.contain('undefined');
    });
  });
});
