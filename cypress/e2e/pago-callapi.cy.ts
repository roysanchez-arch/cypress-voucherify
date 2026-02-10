import { notifySlack } from '../support/utils/slack';

describe('Pago - Call Apis', () => {
  it('Debe obtener el total_percentage del último ciclo', () => {
    cy.visit('https://app.voucherify.io/#/login');

    cy.get('input[name="username"]')
    .should('be.visible')
    .type(Cypress.env('USER_LOGIN'));

    cy.get('input[name="password"]')
    .should('be.visible')
    .type(Cypress.env('PASS_LOGIN'));

    cy.intercept('POST', '**/auth').as('loginRequest');

    cy.get('button[aria-label="Login"]')
    .click();

    cy.wait('@loginRequest')
    .its('response.statusCode')
    .should('eq', 200);

    cy.intercept('GET', '**/api-usage').as('apiUsage');

    cy.visit('https://us1.app.voucherify.io/#/app/core/team-settings/subscription');

    cy.wait('@apiUsage').then(({request, response }) => {
      expect(response?.statusCode).to.eq(200);
      cy.log('REQUEST URL: ' + request.url);
      cy.log(JSON.stringify(response?.body));
      cy.log(JSON.stringify(response?.body.cycle_calls.values));
      // cy.log(JSON.stringify(response?.body));
      const cycles = response!.body.cycle_calls.values;
      expect(cycles).to.be.an('array').and.not.be.empty;

      const lastCycle = cycles[cycles.length - 1];
     // cy.log(lastCycle.total_percentage);

      cy.then(() => {
        const value = lastCycle.total_percentage;

        if (value >= 98) {
          cy.log(`✅ OK: total_percentage = ${value}`);
          notifySlack(
            `🚨 *ALERTA* 🚨\n` +
            `Total usage alcanzó *${value}%*\n`
          );
        }
        //  else {
        //   cy.log(`⚠️ Bajo: total_percentage = ${value}`);
        //   notifySlack(
        //     `🚨 *ALERTA* 🚨\n` +
        //     `Total usage alcanzó *${value}%*\n`
        //   );
        // }
      });

      
    });


    //     cy.intercept(
    //   'GET',
    //   '**/team-settings/**/api-usage'
    // ).as('apiUsage');

    // cy.visit('/team-settings');

    // cy.wait('@apiUsage').then(({ response }) => {
    //   const cycles = response!.body.cycle_calls.data;
    //   const lastCycle = cycles[cycles.length - 1];

    //   expect(lastCycle).to.have.property('total_percentage');

    //   cy.log(`Overall: ${lastCycle.total_percentage}`);
    //   expect(lastCycle.total_percentage).to.eq(96.53);

    // });

  });
});
