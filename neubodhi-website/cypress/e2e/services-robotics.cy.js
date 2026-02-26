describe('Robotics Page Navigation & Buttons', () => {

  const roboticsPath = '/Services/Robotics'
  const contactPath = '/ContactUs'

  beforeEach(() => {
    cy.viewport(1920, 1080)
  })

  it('Verify that the user is able to navigate to the Robotics page from the footer section.', () => {

    cy.visit('/')
    cy.scrollTo('bottom')

    cy.get('footer')
      .find('a[href="/Services/Robotics"]')
      .should('be.visible')
      .click({ force: true })

    cy.location('pathname', { timeout: 10000 })
      .should('eq', '/Services/Robotics')
  })

  it('Verify Robotics Systems Engineering section Connect Us button redirects to Contact Us page.', () => {
    cy.visit(roboticsPath)

    cy.contains('Robotics Systems Engineering')
      .scrollIntoView()

      // click ONLY button inside this card
      .parent()
      .contains('Connect Us')
      .click()

    cy.url().should('include', contactPath)
  })

  it('Verify that from Contact Us page scroll down then on footer Robotics tab redirects back to Robotics page.', () => {
    cy.visit(contactPath)

    cy.scrollTo('bottom')

    cy.contains('Robotics').click()

    cy.url().should('include', roboticsPath)
  })

  it('Verify footer above card Connect With Us! Connect Us button redirects to Contact Us page.', () => {
    cy.visit(roboticsPath)

    cy.scrollTo('bottom', { duration: 1500 })

    cy.contains('Connect With Us!')
      .scrollIntoView()
      .parent()
      .contains('Connect Us')
      .click()

    cy.url().should('include', contactPath)
  })

})