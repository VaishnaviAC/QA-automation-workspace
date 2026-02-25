describe('Neubodhi Careers - End to End Flow', () => {

  beforeEach(() => {
    cy.viewport(1366, 768)
    cy.visit('https://neubodhi.in/')
  })

  it('Navigate to Careers page from footer', () => {
    cy.scrollTo('bottom')

    cy.contains('a', 'Careers')
      .should('be.visible')
      .click()

    cy.url().should('include', '/Careers')

    cy.contains('Join the team behind the future of Work!')
      .should('be.visible')
  })

  it('Click arrow icon for Android Developer and open job page', () => {
    
    // Go to Careers
    cy.scrollTo('bottom')
    cy.contains('a', 'Careers').click()
    
    // Wait for jobs to render
    cy.contains('Android Developer', { timeout: 20000 })
      .should('be.visible')
    
    // KEY FIX → find the job card first, THEN its arrow
    cy.contains('Android Developer')
      .closest('div')          // title container
      .parent()                // card wrapper
      .within(() => {
        cy.get('svg').eq(0)    // ONLY arrow in this card
          .click({ force: true })
      })
    
    // Verify redirection
    cy.contains('Job Description', { timeout: 10000 })
      .should('be.visible')
    
    cy.contains('Android Developer')
      .should('be.visible')
    cy.get('button.mb-10 svg').click();
    cy.get('div.mt-24 div:nth-child(1) div.flex').click();
  })

  it('Upload resume, verify success message and return to careers', () => {

    // Go to Careers
    cy.scrollTo('bottom')
    cy.contains('a', 'Careers').click()

    // Wait for job cards
    cy.contains('Android Developer', { timeout: 20000 })
      .should('be.visible')

    // Open Android Developer job
    cy.contains('Android Developer')
      .closest('div')
      .parent()
      .within(() => {
        cy.get('svg').eq(0).click({ force: true })
      })

    // Verify job page opened
    cy.contains('Job Description', { timeout: 10000 })
      .should('be.visible')

    cy.contains('Android Developer').should('be.visible')

    // Upload Resume (hidden input)
    cy.get('input[type="file"]')
      .should('exist')
      .attachFile('resume.pdf', { force: true })

    // Verify Resume Added UI (green box)
    cy.contains('Resume Added', { timeout: 10000 })
      .should('be.visible')

    cy.contains('.pdf').should('be.visible')

    // Click Submit Resume
    cy.contains('Submit Resume')
      .should('be.visible')
      .and('not.be.disabled')
      .click()

    // Verify toast notification
    cy.contains('Resume uploaded successfully', { timeout: 15000 })
      .should('be.visible')

    // Verify success page
    cy.contains('Application Successfully Submitted!', { timeout: 15000 })
      .should('be.visible')

    cy.contains('You will hear back from us soon if shortlisted.')
      .should('be.visible')

    // Click Back to Careers
    cy.contains('Back to Careers')
      .should('be.visible')
      .click()

    // Verify redirect back
    cy.url({ timeout: 10000 })
      .should('eq', 'https://neubodhi.in/Careers')
  })

})