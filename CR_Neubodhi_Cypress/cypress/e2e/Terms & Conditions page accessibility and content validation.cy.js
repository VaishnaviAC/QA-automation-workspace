import TermsConditionsPage from "../support/pages/TermsConditionsPage";

describe('TS_NB_008 - Terms & Conditions footer navigation', () => {

  const homeUrl = 'https://neubodhi.in/';
  const termsPath = '/legal/terms';
  const termsUrl = 'https://neubodhi.in/legal/terms';
  const contactEmail = 'sarvesh.devi@neubodhi.in';

  const getVisibleFooterTermsLink = () =>
    cy.get('footer').contains('a', 'Terms & Conditions').filter(':visible');

  beforeEach(() => {
    cy.visit(homeUrl);


    cy.get('footer', { timeout: 15000 }).should('exist');
    cy.wait(1000);
  });

  it('TC_NB_072 - Verify redirects to Terms & Conditions page when clicking footer link', () => {
    // Step 3: Scroll down to the Footer section
    cy.get('footer').scrollIntoView().should('be.visible');

    // Step 4: Click on the Terms & Conditions tab in the footer
    getVisibleFooterTermsLink()
      .should('be.visible')
      .invoke('attr', 'href')
      .should('include', termsPath);

    getVisibleFooterTermsLink().as('termsLink');
    cy.get('@termsLink').click({ force: true });

    // Step 5: Observe the redirection of Terms & Conditions page
    // Expected: user is redirected to the Terms & Conditions page and it loads without errors
    cy.location('pathname', { timeout: 15000 }).should('eq', termsPath);
    cy.url().should('eq', termsUrl);
    cy.get('h1', { timeout: 15000 }).contains('Terms & Conditions').should('be.visible');
  });

  it('TC_NB_073 - Validates Gmail compose link without navigating externally', () => {
    // Step 3: Scroll down to the Footer section
    cy.get('footer').scrollIntoView().should('be.visible');

    // Step 4: Click on the Terms & Conditions tab in the footer
    getVisibleFooterTermsLink().as('termsLink');
    cy.get('@termsLink').click({ force: true });

    // Step 5: Observe the redirection of Terms & Conditions page
    cy.location('pathname', { timeout: 15000 }).should('eq', termsPath);

    // Step 6: Scroll down the Terms & Conditions page
    cy.get('h1', { timeout: 15000 }).contains('Terms & Conditions').should('be.visible');

    // Step 7: Scroll down to locate the Contact section and find the email address
    cy.contains('h2', 'Contact Us').scrollIntoView().should('be.visible');


    cy.contains('a', contactEmail)
      .should('be.visible')
      .and('have.attr', 'href', `mailto:${contactEmail}`)
      .and('have.text', contactEmail)
      .as('emailLink');


    cy.get('@emailLink')
      .invoke('removeAttr', 'href')
      .click({ force: true });


    cy.url().should('eq', termsUrl);
  });
});