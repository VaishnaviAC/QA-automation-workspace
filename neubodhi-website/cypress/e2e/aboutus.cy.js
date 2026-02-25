describe('NeuBodhi - About Us & Contact Navigation Test', () => {

  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit('https://neubodhi.in/')
  })

  // =====================================================
  // Test 1 — About Us navigation
  // =====================================================
  it('Navigate to About Us correctly and scroll down twice', () => {

    cy.contains('About Us')
      .should('be.visible')
      .click()

    cy.contains('Meet the Leaders', { timeout: 10000 })
      .should('be.visible')

    cy.url().should('include', '/AboutUs')

    cy.scrollTo('bottom')
    cy.wait(1000)
    cy.scrollTo('top')
    cy.wait(500)
    cy.scrollTo('bottom')

  })

  // =====================================================
  // Test 2 — Connect Us button → ContactUs page
  // =====================================================
  it('Connect Us button redirects to Contact Us page', () => {

    // Wait for page fully rendered
    cy.get('body', { timeout: 10000 }).should('be.visible')

    // Find button using partial text (more stable)
    cy.contains('button, a', 'Connect', { timeout: 10000 })
      .should('be.visible')
      .click()

    // Exact URL validation
    cy.url({ timeout: 10000 })
      .should('eq', 'https://neubodhi.in/ContactUs')

    // Page content validation
    cy.contains('Contact', { timeout: 10000 })
      .should('be.visible')

  })

})