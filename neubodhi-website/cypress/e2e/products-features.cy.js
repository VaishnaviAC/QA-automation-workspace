describe('Neubodhi Features - End to End Flow', () => {

  beforeEach(() => {
    cy.viewport(1366, 768)
    cy.visit('https://neubodhi.in/')
  })

  it('Verify that the user is able to navigate to the Features page.', () => {

    cy.visit('https://neubodhi.in/Products/Features')

    cy.url().should('include', '/Products/Features')

    cy.contains('NeuBodhi - Features & Capabilities')
      .should('be.visible')
  })


  it('Verify that clicking on the email redirects to Gmail compose window.', () => {

    cy.visit('https://neubodhi.in/Products/Features')

    cy.contains('sarvesh.devi@neubodhi.in')
      .should('be.visible')
      .should('have.attr', 'href')
      .then((href) => {

        expect(href).to.include('mail.google.com')
        expect(href).to.include('to=sarvesh.devi@neubodhi.in')

      })

  })


  it('Verify that clicking on Learn More button redirects to About Us page.', () => {

    cy.visit('https://neubodhi.in/Products/Features')

    cy.contains('Learn More')
      .should('be.visible')
      .click()

    cy.url().should('include', '/AboutUs')

    cy.contains('About Us')
      .should('be.visible')
  })

})