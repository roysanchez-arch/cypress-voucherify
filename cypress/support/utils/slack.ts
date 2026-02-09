export const notifySlack = (message: string) => {
  return cy.request({
    method: 'POST',
    url: Cypress.env('SLACK_WEBHOOK_URL'),
    body: {
      text: message,
    },
    failOnStatusCode: false,
  });
};