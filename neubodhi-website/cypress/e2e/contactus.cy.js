describe('NeuBodhi Contact Us Page - End to End Tests', () => {

  beforeEach(() => {
    cy.viewport(1366, 768)
    cy.visit('https://neubodhi.in/')

    // Click header Contact Us
    cy.contains('Contact Us')
      .should('be.visible')
      .click()

    cy.url().should('include', '/ContactUs')
  })

  // -------------------------
  // PAGE LOAD (use partial text)
  // -------------------------
it('Verify Contact Us page load successfully', () => {

  // URL validation
  cy.url().should('include', '/ContactUs')

  // Wait for form to render (stable element)
  cy.get('input[placeholder="Your Name *"]', { timeout: 10000 })
    .should('be.visible')

})

  // -------------------------
  // FORM FIELD VISIBILITY
  // -------------------------
  it('Verify that contact us form should display all form fields', () => {
    cy.get('input[placeholder="Your Name *"]').should('be.visible')
    cy.get('input[placeholder="Your Email *"]').should('be.visible')
    cy.get('textarea').should('be.visible')
    cy.contains('Connect').should('be.visible')
  })

  // -------------------------
  // VALID FORM SUBMISSION (API VALIDATION)
  // -------------------------
  it('Verify that the Contact Us form is submitted successfully when clicking the "Lets Connect" button with valid data.', () => {

    cy.intercept('POST', '**/api/contact').as('contactForm')

    cy.get('input[placeholder="Your Name *"]').type('Ajit Patil')
    cy.get('input[placeholder="Your Email *"]').type('Ajitpatil@gmail.com')
    cy.get('textarea').type(' This is a test message from cypress')

    cy.contains('Connect')
      .should('not.be.disabled')
      .click()

    // Validate API call instead of UI message
    cy.wait('@contactForm').its('response.statusCode').should('eq', 200)
  })

  // -------------------------
  // EMPTY FORM
  // -------------------------
  it('Verify that the Lets Connect (Submit) button remains disabled when all fields in the "Contact Us" form are empty.', () => {
    cy.contains('Connect').should('be.disabled')
  })

  // -------------------------
  // MISSING NAME
  // -------------------------
  it('Verify that the Lets Connect (Submit) button remains disabled when the Name field is empty.', () => {
    cy.get('input[placeholder="Your Email *"]').type('test@gmail.com')
    cy.get('textarea').type('Test message')

    cy.contains('Connect').should('be.disabled')
  })

  // -------------------------
  // MISSING EMAIL
  // -------------------------
  it('Verify that the Lets Connect (Submit) button remains disabled when the Email field is empty.', () => {
    cy.get('input[placeholder="Your Name *"]').type('Test User')
    cy.get('textarea').type('Test message')

    cy.contains('Connect').should('be.disabled')
  })

  // -------------------------
  // MISSING MESSAGE
  // -------------------------
  it('Verify that the Lets Connect (Submit) button remains disabled when the Message field is empty.', () => {
    cy.get('input[placeholder="Your Name *"]').type('Test User')
    cy.get('input[placeholder="Your Email *"]').type('test@gmail.com')

    cy.contains('Connect').should('be.disabled')
  })

  // -------------------------
  // INVALID EMAIL (REAL BEHAVIOR)
  // -------------------------
  it('Verify that an appropriate error message is displayed for an invalid email format.', () => {

    cy.get('input[placeholder="Your Name *"]').type('Test User')
    cy.get('input[placeholder="Your Email *"]').type('invalid-email')
    cy.get('textarea').type('Test message')

    // Button should remain disabled
    cy.contains('Connect').should('be.disabled')

    // Validate exact error text from UI
    cy.contains('Please enter a valid email address')
      .should('be.visible')
  })

})