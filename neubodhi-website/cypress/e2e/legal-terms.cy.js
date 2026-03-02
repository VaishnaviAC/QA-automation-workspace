describe('Footer Terms & Conditions Tests', () => {

  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit('https://neubodhi.in/')
  })

  it('Redirects to Terms & Conditions page when clicking footer link', () => {

    cy.scrollTo('bottom')

    cy.get('footer')
      .contains('Terms & Conditions')
      .should('be.visible')
      .click()

    // Verify correct URL
    cy.url().should('include', '/Legal/Terms&Conditions')

    // Better content validation (more stable)
    cy.get('body')
      .should('contain.text', 'Terms')

  })


  it('Validates Gmail compose link without navigating externally', () => {

    cy.visit('https://neubodhi.in/Legal/Terms&Conditions')

    cy.scrollTo('bottom')

    cy.get('a[href*="sarvesh.devi@neubodhi.in"]')
      .should('be.visible')
      .and('have.attr', 'href')
      .and('include', 'mail.google.com')
      .and('include', 'to=sarvesh.devi@neubodhi.in')

  })

})