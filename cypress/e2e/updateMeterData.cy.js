import { getTzDate } from '@/utils';
import { checkIfMenuIsOpen } from './../utils/index.cy';

const fillInConsumptionInput = () => {
  cy.get('input[name="kwh"]').type(kwhInputValue);
  cy.get('input[name="kwh"]').should('have.value', kwhInputValue);
};
const fillInDateInputWithNowButton = () => {
  cy.get('form > button[type="button"]').click();
  cy.get('input[name="datetime"]').should('not.be', '');
};
const handleSubmitForm = () => {
  // submitting the form
  cy.get('button[type="submit"]').click();
  // after form is submitted, the success notification should be seen
  const message = 'New interval added with success!';
  cy.get('dialog').contains(message);
  // closing the notification
  cy.get('form > dialog button').click();
  // After submit, form should be cleared (input values are cleared)
  cy.get('input[name="kwh"]').should('be.empty');
  cy.get('input[name="datetime"]').should('be.empty');
};
const kwhInputValue = '25';
describe('Updating meter 1 data', () => {
  beforeEach(() => {
    cy.visit('/meter/1'); // expects the page to send text/html content with a 200 status code
    checkIfMenuIsOpen(false);
    cy.get('main > button[type="button"]').click(); // expects the element to eventually exist in the DOM
  });

  it('Should open the form with all the input fiels empty', () => {
    cy.get('input[name="kwh"]').should('be.empty');
    cy.get('input[name="datetime"]').should('be.empty');
  });

  it('Should fill in the form with valid data (using the NOW button) and submit it', () => {
    cy.get('form > button[type="button"]').click();
    cy.get('input[name="datetime"]').should('not.be', '');
    fillInConsumptionInput();
    fillInDateInputWithNowButton();
    handleSubmitForm();
  });
  it('Should (manually) fill in the form with valid data and submit it', () => {
    fillInConsumptionInput();

    // const datetimeInputValue requires the following format: 'yyyy-MM-ddThh:mm:ss';
    const tzDate = getTzDate(new Date()).replace(' ', () => 'T');
    cy.get('input[name="datetime"]').type(tzDate);
    cy.get('input[name="datetime"]').should('have.value', tzDate);

    handleSubmitForm();
  });
});
