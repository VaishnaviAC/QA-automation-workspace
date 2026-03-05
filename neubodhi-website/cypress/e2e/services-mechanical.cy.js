describe('Mechanical Page Navigation & Buttons', () => {

  const mechanicalPath = '/Services/Mechanical'
  const contactPath = '/ContactUs'

  beforeEach(() => {
    cy.viewport(1920, 1080)
  })

  // Navigate to Mechanical page from footer
  it('Verify user can navigate to Mechanical page from footer', () => {

    cy.visit('/')
    cy.scrollTo('bottom')

    cy.get('footer')
      .find('a[href="/Services/Mechanical"]')
      .should('be.visible')
      .click({ force: true })

    cy.location('pathname', { timeout: 10000 })
      .should('eq', mechanicalPath)
  })


  // Mechanical Systems & Design → Connect Us
  it('Verify Mechanical Systems & Design Connect Us button redirects to Contact page', () => {

    cy.visit(mechanicalPath)

    cy.contains('Mechanical Systems & Design')
      .scrollIntoView()

      // click only inside this card
      .parent()
      .contains('Connect Us')
      .click({ force: true })

    cy.location('pathname', { timeout: 10000 })
      .should('eq', contactPath)
  })


  // Contact page footer → Mechanical page
  it('Verify footer Mechanical link redirects back to Mechanical page', () => {

    cy.visit(contactPath)

    cy.scrollTo('bottom')

    cy.get('footer')
      .find('a[href="/Services/Mechanical"]')
      .click({ force: true })

    cy.location('pathname', { timeout: 10000 })
      .should('eq', mechanicalPath)
  })


  //  Bottom Connect With Us → Contact page
  it('Verify bottom Connect With Us button redirects to Contact page', () => {

    cy.visit(mechanicalPath)

    cy.scrollTo('bottom', { duration: 1500 })

    cy.contains('Connect With Us!')
      .scrollIntoView()
      .parent()
      .contains('Connect Us')
      .click({ force: true })

    cy.location('pathname', { timeout: 10000 })
      .should('eq', contactPath)
  })

})