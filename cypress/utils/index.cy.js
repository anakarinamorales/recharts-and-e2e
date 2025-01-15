// checks if the content of the chart is not empty
export const checkChartContent = () => {
  // using recharts library structure here to check if there are bars in the chart
  cy.get(
    'svg > g.recharts-layer.recharts-bar > g.recharts-layer.recharts-bar-rectangles > g.recharts-layer'
  ).should('not.be', '');
};

export const checkIfMenuIsOpen = (isClosed) => {
  cy.get('button[aria-label="Main menu"]').should(
    'have.attr',
    'aria-expanded',
    `${isClosed}`
  );
};
