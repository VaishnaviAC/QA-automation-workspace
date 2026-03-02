describe('Footer Privacy Policy Tests', () => {

  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit('https://neubodhi.in/')
  })

  it('Redirects to Privacy Policy page when clicking footer link', () => {

    // Scroll to footer
    cy.scrollTo('bottom')

    // Click Privacy Policy
    cy.get('footer')
      .contains('Privacy Policy')
      .should('be.visible')
      .click()

    // Verify URL
    cy.location('pathname', { timeout: 10000 })
      .should('eq', '/Legal/Policies')

    // Verify page loaded
    cy.contains('Updates to This Privacy Policy', { timeout: 10000 })
      .should('be.visible')
  })


  it('Validates Gmail compose link without navigating externally', () => {

    // Direct visit to Privacy Policy page (independent test)
    cy.visit('https://neubodhi.in/Legal/Policies')

    cy.contains('Contact NeuBodhi')
      .scrollIntoView()
      .should('be.visible')

    cy.get('a[href*="sarvesh.devi@neubodhi.in"]')
      .should('be.visible')
      .and('have.attr', 'href')
      .then((href) => {
        expect(href).to.include('mail.google.com')
        expect(href).to.include('to=sarvesh.devi@neubodhi.in')
      })

  })

})