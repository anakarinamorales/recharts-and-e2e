import { getTzDate } from '@/utils';

describe('Updating meter data', () => {
  beforeEach(() => {
    cy.visit('/meter/1'); // expects the page to send text/html content with a 200 status code
    cy.get('main > button[type="button"]').click(); // expects the element to eventually exist in the DOM
  });

  it('Should open the form with all the input fiels cleared', () => {
    // when opening the modal, the form should be empty
    cy.get('input[name="kwh"]').should('be.empty');
    cy.get('input[name="datetime"]').should('be.empty');
  });

  it('Should fill in the form with valid data and submit it', () => {
    // filling in the form manually
    const kwhInputValue = '25';
    cy.get('input[name="kwh"]').type(kwhInputValue);
    cy.get('input[name="kwh"]').should('have.value', kwhInputValue);

    // const datetimeInputValue = '2017-06-01T08:30:35';
    const tzDate = getTzDate(new Date()).replace(' ', () => 'T');
    cy.get('input[name="datetime"]').type(tzDate);
    cy.get('input[name="datetime"]').should('have.value', tzDate);

    // submitting the form
    cy.get('button[type="submit"]').click();

    // after form is submitted, the success notification should be seen
    const message = 'New interval added with success!';
    cy.get('dialog').contains(message);

    // asserting if the data was inserted correctly in the chart
    // cy.get(
    //   '#__next > main > div > div > svg > g.recharts-layer.recharts-cartesian-axis.recharts-xAxis.xAxis > g > g:nth-child(4) > text > tspan'
    // ).contains(tzDate.toLocaleString());
    // cy.get('.recharts-tooltip-label');


    // closing the notification
    cy.get('form > dialog button').click();

    // After submit, form should be cleared (input values are cleared)
    cy.get('input[name="kwh"]').should('be.empty');
    cy.get('input[name="datetime"]').should('be.empty');
  });

  // TODO
  // test case where the form is empty and we try to submit it
  // it('Should not submit the form when the input fields are empty', () => {
  // });
});
