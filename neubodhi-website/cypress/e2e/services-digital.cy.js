describe('Digital Page Navigation & Buttons', () => {

  const digitalPath = '/Services/Digital'
  const contactPath = '/ContactUs'

  beforeEach(() => {
    cy.viewport(1920, 1080)
  })

  // ✅ 1️⃣ Navigate to Digital page from footer
  it('Verify user can navigate to Digital page from footer', () => {

    cy.visit('/')
    cy.scrollTo('bottom')

    cy.get('footer')
      .find('a[href="/Services/Digital"]')
      .should('be.visible')
      .click({ force: true })

    cy.location('pathname', { timeout: 10000 })
      .should('eq', digitalPath)
  })


  // ✅ 2️⃣ Digital & AI Systems → Connect Us button
  it('Verify Digital & AI Systems Connect Us button redirects to Contact page', () => {

    cy.visit(digitalPath)

    cy.contains('Digital & AI Systems')
      .scrollIntoView()

      // click button only inside this card
      .parent()
      .contains('Connect Us')
      .click({ force: true })

    cy.location('pathname', { timeout: 10000 })
      .should('eq', contactPath)
  })


  // ✅ 3️⃣ Contact page footer → Digital page
  it('Verify footer Digital link redirects back to Digital page', () => {

    cy.visit(contactPath)

    cy.scrollTo('bottom')

    cy.get('footer')
      .find('a[href="/Services/Digital"]')
      .click({ force: true })

    cy.location('pathname', { timeout: 10000 })
      .should('eq', digitalPath)
  })


  // ✅ 4️⃣ Bottom Connect With Us card → Contact page
  it('Verify bottom Connect With Us button redirects to Contact page', () => {
    
    cy.visit(digitalPath)
    
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