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
  it('loads Neubodhi home page', () => {
    cy.url().should('eq', 'https://neubodhi.in/')
  })

  // -------------------------
  // LEARN MORE BUTTON → ABOUT US
  // -------------------------
  it('redirects to About Us page when clicking Learn More', () => {
    cy.contains('Learn More')
      .scrollIntoView()
      .should('be.visible')
      .click()

    cy.url().should('include', '/AboutUs')
  })

  // -------------------------
  // CONNECT NOW BUTTON → CONTACT US
  // -------------------------
  it('redirects to Contact Us page when clicking Connect Now', () => {
    cy.contains('Connect Now')
      .scrollIntoView()
      .should('be.visible')
      .click()

    cy.url().should('include', '/ContactUs')
  })

  // -------------------------
  // ISACA PROJECT VIDEO → PROJECT PAGE
  // -------------------------
  it('redirects to ISACA project page when clicking ISACA video', () => {
    
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
  it('redirects to ISACA project details page after clicking ISACA DETAILS', () => {
    cy.contains('ISACA Details')
      .scrollIntoView()
      .should('be.visible')
      .click()

    cy.url().should('include', '/Projects/ISACA')
  })

  // -------------------------
  // POSITIVE TEST
  // -------------------------
  it('submits contact form with valid data', () => {
    cy.get('input[placeholder="Your Name *"]').type('Test User')
    cy.get('input[placeholder="Your Email *"]').type('testuser@gmail.com')
    cy.get('textarea[placeholder="Enter Message *"]').type('This is a test message')

    cy.contains('Lets Connect')
      .should('not.be.disabled')
      .click()

    cy.contains(/thank|success|received/i)
  })

  // -------------------------
  // NEGATIVE TESTS (DISABLED STATE)
  // -------------------------
  /*it('keeps submit button disabled when form is empty', () => {
    cy.contains('Lets Connect').should('be.disabled')
  })*/
  it('keeps submit button disabled when form is empty', () => {
    cy.contains('Lets Connect').should('be.disabled')
  })

  it('keeps submit button disabled when name is missing', () => {
    cy.get('input[placeholder="Your Email *"]').type('test@gmail.com')
    cy.get('textarea[placeholder="Enter Message *"]').type('Test message')

    cy.contains('Lets Connect').should('be.disabled')
  })

  it('keeps submit button disabled when email is missing', () => {
    cy.get('input[placeholder="Your Name *"]').type('Test User')
    cy.get('textarea[placeholder="Enter Message *"]').type('Test message')

    cy.contains('Lets Connect').should('be.disabled')
  })

  it('keeps submit button disabled when message is missing', () => {
    cy.get('input[placeholder="Your Name *"]').type('Test User')
    cy.get('input[placeholder="Your Email *"]').type('test@gmail.com')
    cy.contains('Lets Connect').should('be.disabled')
  })

  // -------------------------
  // NEGATIVE TEST (SUBMIT ENABLED)
  // -------------------------
  it('shows error for invalid email format', () => {
    cy.get('input[placeholder="Your Name *"]').type('Test User')
    cy.get('input[placeholder="Your Email *"]').type('invalid-email')
    cy.get('textarea[placeholder="Enter Message *"]').type('Test message')

    cy.contains('Lets Connect')
      .should('not.be.disabled')
      .click()

    cy.contains(/valid|invalid/i)
  })

  // --------------------------------------------------
  // SOCIAL MEDIA ICONS REDIRECT TEST
  // --------------------------------------------------
  it('Verify LinkedIn link Redirection', () => {
    cy.scrollTo('bottom')

    cy.get('a[href="https://www.linkedin.com/company/accurate-industrial-controls-pvt-ltd/"]')
      .should('be.visible')
      .should('have.attr', 'href')
      .and('include', 'linkedin.com/company/accurate-industrial-controls-pvt-ltd')
  })

  it('Verify YouTube link Redirection', () => {
    cy.scrollTo('bottom')

    cy.get('a[href*="youtube.com"]')
      .should('be.visible')
      .should('have.attr', 'href')
      .and('include', 'youtube.com')
  })
})