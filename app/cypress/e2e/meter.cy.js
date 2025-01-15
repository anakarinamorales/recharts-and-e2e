import { checkIfMenuIsOpen, checkChartContent } from './../utils/index.cy';

const checkMeterPage = (meterId, meterName) => {
  cy.visit(`/meter/${meterId}`);
  cy.location('pathname').should('eq', `/meter/${meterId}`);
  checkIfMenuIsOpen(false);
  cy.get('h1').contains('Meter Data');
  cy.get('h2').contains(meterName);
  cy.get('button[type="button"]').should('not.be', '');
};
describe('Navigationg to battery detail pages', () => {
  it('Should render the first meter detail page (Battery A)', () => {
    checkMeterPage('1', 'Battery A');
    checkChartContent();
  });
  it('Should render the second meter detail page (Battery B)', () => {
    checkMeterPage('2', 'Battery B');
    checkChartContent();
  });
});
