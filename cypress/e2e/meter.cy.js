describe('Detail page (/meter/:id)', () => {
  it('Should navigate to the first meter detail page (Battery A)', () => {
    cy.visit('/meter/1');
    cy.location('pathname').should('eq', '/meter/1');
    cy.get('h1').contains('Meter Data');
    cy.get('h2').contains('Battery A');
    cy.get('button[type="button"]').contains("Update meter data");
  });
  
  it('Should navigate to the second meter detail page (Battery B)', () => {
    cy.visit('/meter/2');
    cy.location('pathname').should('eq', '/meter/2');
    cy.get('h1').contains('Meter Data');
    cy.get('h2').contains('Battery B');
    cy.get('button[type="button"]').contains("Update meter data");
  });
});
