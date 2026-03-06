describe('Neubodhi Help Desk - End to End Flow', () => {

  beforeEach(() => {
    cy.viewport(1366, 768)
    cy.visit('https://neubodhi.in/')
  })

  // Test 1: Navigate from footer to Help Desk page
  it('Verify that the user is able to navigate to the Help Desk page from the footer section.', () => {

  // Scroll to footer
    cy.scrollTo('bottom')

  // Click Help desk link
    cy.contains('a', 'Help desk')
      .should('be.visible')
      .click()

  // Validate URL
    cy.url().should('include', '/Products/HelpDesk')

  // Validate Help Desk heading appears
    cy.contains('h1', 'Help Desk', { timeout: 10000 })
      .should('be.visible')

  })

  // Test 2: Validate email Gmail compose link
  it('Verify that clicking on the Help Desk email has correct Gmail compose URL.', () => {
    
    // Directly visit Help Desk page
    cy.visit('https://neubodhi.in/Products/HelpDesk')
    
    cy.contains('Support Channels')
      .scrollIntoView()
    
    cy.contains('a', 'sarvesh.devi@neubodhi.in')
      .should('be.visible')
      .should('have.attr', 'href')
      .then((href) => {
    
        // Exact match validation
        expect(href).to.eq(
          'https://mail.google.com/mail/?view=cm&fs=1&to=sarvesh.devi@neubodhi.in'
        )
    
        // Partial validation (extra safety)
        expect(href).to.include('mail.google.com')
        expect(href).to.include('to=sarvesh.devi@neubodhi.in')
      })
    
  })

})