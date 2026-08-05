describe('NeuBodhi Projects Page Navigation', () => {

  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit('https://neubodhi.in/Projects')
  })

  // ============================================
  // PROJECTS PAGE LOAD
  // ============================================
  it('Verify Projects page loads successfully', () => {
    cy.location('pathname').should('eq', '/Projects')
    cy.contains('Our Products').should('be.visible')
  })

  // ============================================
  // PROJECTS → ISACA (Click Video/Card)
  // ============================================
  it('Verify redirection to ISACA project page when clicking project video', () => {
    
    cy.contains('ISACA')
      .scrollIntoView()
      .should('be.visible')
    
    cy.get('video')
      .first()
      .click({ force: true })
    
    cy.location('pathname', { timeout: 10000 })
      .should('eq', '/Projects/ISACA')
  })

  // ============================================
  // PROJECTS → ISACA (Click Learn More if exists)
  // ============================================
  it('Verify redirection to ISACA project page when clicking Learn More', () => {

    cy.contains(/learn more/i)
      .scrollIntoView()
      .click({ force: true })

    cy.location('pathname', { timeout: 10000 })
      .should('include', '/Projects/ISACA')
  })
  it('Verify ISACA project page content', () => {

    cy.visit('https://neubodhi.in/Projects/ISACA')
    cy.location('pathname').should('eq', '/Projects/ISACA')
    cy.contains('ISACA').should('be.visible')
 })
   // ============================================
  // ISACA → CONNECT NOW → CONTACT US
  // ============================================
  it('Verify redirection to Contact Us page when clicking Connect Now button on ISACA Project Page', () => {

    cy.visit('https://neubodhi.in/Projects/ISACA')

    cy.location('pathname', { timeout: 10000 })
      .should('eq', '/Projects/ISACA')

    cy.contains('button', /connect\s*now/i, { timeout: 10000 })
      .scrollIntoView()
      .should('be.visible')
      .click()

    cy.location('pathname', { timeout: 10000 })
      .should('eq', '/ContactUs')
})
})