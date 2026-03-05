describe('NeuBodhi Home Page - Desktop Navigation & Contact Form', () => {

  beforeEach(() => {
    cy.viewport(1366, 768)   // Desktop view
    cy.viewport(1280, 720)   // Small laptop
    cy.viewport(1366, 768)   // Most common laptop
    cy.viewport(1440, 900)   // MacBook
    cy.viewport(1920, 1080)  // Full HD desktop
    cy.visit('https://neubodhi.in/')
  })

  // -------------------------
  // PAGE LOAD
  // -------------------------
  it('Verify that Neubodhi home page loads successfully', () => {
    cy.url().should('eq', 'https://neubodhi.in/')
  })

  // -------------------------
  // LEARN MORE BUTTON → ABOUT US
  // -------------------------
  it('Verify that the user is redirected to the About Us page when clicking on Learn More.', () => {
    cy.contains('Learn More')
      .scrollIntoView()
      .should('be.visible')
      .click()

    cy.url().should('include', '/AboutUs')
  })

  // -------------------------
  // CONNECT NOW BUTTON → CONTACT US
  // -------------------------
  it('Verify that the user is redirected to the Contact Us page when clicking on Connect Now.', () => {
    cy.contains('Connect Now')
      .scrollIntoView()
      .should('be.visible')
      .click()

    cy.location('pathname', { timeout: 10000 })
      .should('eq', '/ContactUs')
  })

  // -------------------------
  // ISACA PROJECT VIDEO → PROJECT PAGE
  // -------------------------
  it('Verify that the user is redirected to the ISACA project page when clicking on the ISACA video.', () => {
    
    // Scroll to ISACA section
    cy.contains('ISACA')
      .scrollIntoView()
      .should('be.visible')
    
    // Click the running video (force click needed)
    cy.get('video')
      .first()
      .should('be.visible')
      .click({ force: true })
    
    // Validate redirect
    cy.url().should('include', '/Projects/ISACA')
  })

  // -------------------------
  // ISACA DETAILS → PROJECT PAGE
  // -------------------------
  it('Verify that the user is redirected to the ISACA project details page after clicking on ISACA DETAILS.', () => {
    cy.contains('ISACA Details')
      .scrollIntoView()
      .should('be.visible')
      .click()

    cy.url().should('include', '/Projects/ISACA')
  })

  // -------------------------
  // POSITIVE TEST FOR EMAIL VALIDATION
  // -------------------------
  it('Verify that the contact form is submitted successfully with valid data.', () => {

    cy.intercept('POST', '/api/contact').as('contactForm')

    cy.get('input[placeholder="Your Name *"]').type('Rehansh Patel')
    cy.get('input[placeholder="Your Email *"]').type('rehansh.Patel1234@gmail.com')
    cy.get('textarea[placeholder="Enter Message *"]').type('I am interested in exploring potential career opportunities at your organization and would appreciate any information you could share.')

    cy.contains('Lets Connect')
      .should('not.be.disabled')
      .click()

  // wait for backend response
    cy.wait('@contactForm')

  // assert success message
    cy.contains(/Message sent successfully/i, { timeout: 10000 })
      .should('be.visible')
  })

  // -------------------------
  // NEGATIVE TESTS (DISABLED STATE)
  // -------------------------
  /*it('keeps submit button disabled when form is empty', () => {
    cy.contains('Lets Connect').should('be.disabled')
  })*/
  it('Verify that the Lets Connect button remains disabled when the form is empty.', () => {
    cy.contains('Lets Connect').should('be.disabled')
  })

  it('Verify that the  Lets Connect button remains disabled when the name field is missing.', () => {
    cy.get('input[placeholder="Your Email *"]').type('test@gmail.com')
    cy.get('textarea[placeholder="Enter Message *"]').type('Test message')

    cy.contains('Lets Connect').should('be.disabled')
  })

  it('Verify that the Lets Connect  button remains disabled when the email field is missing.', () => {
    cy.get('input[placeholder="Your Name *"]').type('Test User')
    cy.get('textarea[placeholder="Enter Message *"]').type('Test message')

    cy.contains('Lets Connect').should('be.disabled')
  })

  it('Verify that the Lets Connect  button remains disabled when the message field is missing.', () => {
    cy.get('input[placeholder="Your Name *"]').type('Test User')
    cy.get('input[placeholder="Your Email *"]').type('test@gmail.com')
    cy.contains('Lets Connect').should('be.disabled')
  })

  // -------------------------
  // NEGATIVE TEST (SUBMIT ENABLED)
  // -------------------------
  it('Verify that an error message is shown for an invalid email format.', () => {

  // Fill form with invalid email
    cy.get('input[placeholder="Your Name *"]').type('Test User')
    cy.get('input[placeholder="Your Email *"]').type('invalid-email')
    cy.get('textarea[placeholder="Enter Message *"]').type('Test message')

  // Click Lets Connect button
    cy.contains('Lets Connect')
      .should('be.visible')
      .and('not.be.disabled')
      .click()

  // Verify error message
    cy.contains('Please enter a valid email address')
      .should('be.visible')
  })

  // --------------------------------------------------
  // SOCIAL MEDIA ICONS REDIRECT TEST
  // --------------------------------------------------
  it('Verify that the LinkedIn link redirects to the correct LinkedIn page.', () => {
    cy.scrollTo('bottom')

    cy.get('a[href="https://www.linkedin.com/company/accurate-industrial-controls-pvt-ltd/"]')
      .should('be.visible')
      .should('have.attr', 'href')
      .and('include', 'linkedin.com/company/accurate-industrial-controls-pvt-ltd')
  })

  it('Verify that the YouTube link redirects to the correct YouTube page.', () => {
    cy.scrollTo('bottom')

    cy.get('a[href*="youtube.com"]')
      .should('be.visible')
      .should('have.attr', 'href')
      .and('include', 'youtube.com')
  })
    // ============================================
  // HOME → PROJECTS PAGE
  // ============================================
  it('Verify that the user is redirected to the Projects page when clicking on the Projects menu in the header.', () => {

    cy.contains('Projects')
      .should('be.visible')
      .click()

    cy.location('pathname', { timeout: 10000 })
      .should('eq', '/Projects')

    cy.contains('Our Products').should('be.visible')
  })
})