/**
 * cypress/support/pages/ContactPage.js
 * -----------------------------------------------------------------------
 * Page Object Model for the NeuBodhi "Contact Us" page
 * (https://neubodhi.in/contact)
 *
 * Placed alongside HomePage.js in cypress/support/pages/ to match the
 * existing project convention (see commands.js -> `import HomePage from "./pages/HomePage"`).
 *
 * Confirmed selectors (from live DOM):
 *   - Name field     : #contact-name    (name="name")
 *   - Email field    : #contact-email   (name="email", type="email")
 *   - Subject field  : #contact-subject (name="subject")
 *   - Message field  : #contact-message (name="message", <textarea>)
 *   - Submit button  : <button type="submit">Let's Connect</button>
 *   - Header nav link: text "Contact", href -> https://neubodhi.in/contact
 *
 * Note: the contact form is streamed in via a React Suspense boundary, so
 * every action here relies on the project's existing `cy.scrollToContactForm()`
 * custom command (cypress/support/commands.js) to make sure the real form
 * (not the loading skeleton, and not a still-pending route transition) is
 * present and interactive before interacting with it.
 * -----------------------------------------------------------------------
 */

class ContactPage {
  // ---------------------------------------------------------------------
  // Locators
  // ---------------------------------------------------------------------
  elements = {
    // The site's top navigation is a <nav>, not a <header> tag.
    // There are 2 <nav>-like structures on the page (desktop + hidden mobile
    // menu), so we filter to the visible one. Matching on a `/contact`
    // substring (not the full absolute URL) because the live site may serve
    // a relative href="/contact" even though a locally-saved copy of the
    // page can show it resolved to the full https://neubodhi.in/contact.
    headerContactLink: () =>
      cy.get('nav a[href*="/contact"]').filter(':visible').first(),
    nameInput: () => cy.get('#contact-name'),
    emailInput: () => cy.get('#contact-email'),
    subjectInput: () => cy.get('#contact-subject'),
    messageInput: () => cy.get('#contact-message'),
    submitButton: () => cy.contains('button', "Let's Connect"),
    // Generic locator for inline validation / error messages near a field.
    // Tighten this once the exact error-message markup is confirmed.
    fieldError: (fieldSelector) =>
      cy
        .get(fieldSelector)
        .closest('div')
        .find('p, span, [role="alert"], .error, .error-message'),
  };

  //---------------------------------------------------------------------
  // Navigation
  //---------------------------------------------------------------------

  /** Load the NeuBodhi home page */
  visitHome() {
    cy.visit('/');
    return this;
  }

  /**
   * Click the "Contact" tab in the header, then wait for the form to render.
   *
   * CONFIRMED FROM A REAL FAILURE (TC_NB_049): this site's nav-link click
   * triggers a Next.js client-side route transition. The URL doesn't
   * update to /contact immediately — it can lag behind the click by a
   * noticeable margin while the new route's data streams in. If we hand
   * off to scrollToContactForm() before the URL has actually changed,
   * we can land on the OLD page's now-visible-but-pending form and start
   * typing into fields that are still `disabled` mid-transition.
   *
   * Waiting for the URL first guarantees the transition has actually
   * completed before we even look for the form.
   */
  goToContactPage() {
    this.elements.headerContactLink().click();
    cy.url({ timeout: 15000 }).should('include', '/contact');
    cy.scrollToContactForm();
    return this;
  }

  /** Navigate directly to the Contact Us page via URL */
  visitContactPage() {
    cy.visit('/contact');
    cy.scrollToContactForm();
    return this;
  }

  // ---------------------------------------------------------------------
  // Actions
  // ---------------------------------------------------------------------

  /**
   * Resiliently clear + type into a field.
   *
   * The contact form can re-render while typing (background hero/WASM
   * activity — same root cause documented in commands.js for
   * scrollToContactForm/goToProductSlide), which detaches the input mid
   * cy.type() and throws "subject is no longer attached to the DOM".
   *
   * Mitigation: re-query the element fresh immediately before each action
   * (instead of chaining .clear().type() off one queried reference) and
   * give a short buffer for any pending re-render to settle first. Also
   * asserts `not.be.disabled` right before typing as a second layer of
   * defense — scrollToContactForm() already waits for this, but this
   * catches any field that flips disabled again after a later re-render
   * (e.g. between filling one field and the next).
   */
  safeFill(selector, value) {
    if (!value) return this;
    cy.get(selector).should('be.visible').and('not.be.disabled');
    cy.wait(300);
    cy.get(selector).clear();
    cy.get(selector).type(value, { delay: 20 });
    return this;
  }

  typeName(value) {
    return this.safeFill('#contact-name', value);
  }

  typeEmail(value) {
    return this.safeFill('#contact-email', value);
  }

  typeSubject(value) {
    return this.safeFill('#contact-subject', value);
  }

  typeMessage(value) {
    return this.safeFill('#contact-message', value);
  }

  /**
   * Fill the form using a data object.
   * Any field omitted from `data` is left untouched/empty.
   * @param {{name?: string, email?: string, subject?: string, message?: string}} data
   */
  fillForm(data = {}) {
    this.typeName(data.name);
    this.typeEmail(data.email);
    this.typeSubject(data.subject);
    this.typeMessage(data.message);
    return this;
  }

  clickSubmit() {
    this.elements.submitButton().click({ force: true });
    return this;
  }

  /** Focus a field, then blur it (to trigger onBlur validation) */
  blurField(fieldSelector) {
    cy.get(fieldSelector).focus().blur();
    return this;
  }

  // ---------------------------------------------------------------------
  // Assertions
  // ---------------------------------------------------------------------

  assertContactPageLoaded() {
    cy.url().should('include', '/contact');
    cy.get('#contact-name').should('be.visible');
    return this;
  }

  assertAllFieldsVisible() {
    this.elements.nameInput().should('be.visible');
    this.elements.emailInput().should('be.visible');
    this.elements.subjectInput().should('be.visible');
    this.elements.messageInput().should('be.visible');
    this.elements.submitButton().should('be.visible');
    return this;
  }

  assertSubmitDisabled() {
    this.elements.submitButton().should('be.disabled');
    return this;
  }

  assertSubmitEnabled() {
    this.elements.submitButton().should('be.enabled');
    return this;
  }

  /** Assert the field is flagged invalid (aria-invalid="true") */
  assertFieldInvalid(fieldSelector) {
    cy.get(fieldSelector).should('have.attr', 'aria-invalid', 'true');
    return this;
  }

  assertFieldValid(fieldSelector) {
    cy.get(fieldSelector).should('have.attr', 'aria-invalid', 'false');
    return this;
  }

  /** Assert a validation/error message containing the given text is visible somewhere on the page */
  assertValidationMessageVisible(textPattern) {
    cy.contains(textPattern).should('be.visible');
    return this;
  }

  /** Assert a success/confirmation message is shown after submission */
  assertSubmissionSuccess(textPattern = /thank you|message sent|success|received/i) {
    cy.contains(textPattern, { timeout: 10000 }).should('be.visible');
    return this;
  }
}

export default new ContactPage();