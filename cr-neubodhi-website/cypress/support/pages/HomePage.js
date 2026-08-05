class HomePage {
  // ---------- Navigation ----------
  visit() {
    cy.visit("/");
    return this;
  }

  navHomeLink() {
    return cy.get("nav").contains("a", "Home");
  }

  navProductsMenuBtn() {
    return cy.get('nav button[aria-haspopup="menu"]').contains("Products");
  }

  // Scoped strictly to the wrapper div immediately containing the Products
  // button, since a plain [role="menu"] selector also matches the Services
  // dropdown elsewhere in the nav (both exist in the DOM at once).
  navProductsDropdownLinks() {
    return this.navProductsMenuBtn().parents("div.relative").first().find("a");
  }

  navServicesMenuBtn() {
    return cy.get('nav button[aria-haspopup="menu"]').contains("Services");
  }

  navAboutLink() {
    return cy.get('nav a[href="/about"]').contains("About");
  }

  navContactLink() {
    return cy.get('nav a[href="/contact"]').contains("Contact");
  }

  // ---------- Hero section ----------
  heroExploreProductsBtn() {
    return cy.get('a[href="/products"]').contains("Explore Products");
  }

  heroKnowUsBetterBtn() {
    return cy.get('a[href="/about"]').contains("Know Us Better");
  }

  // ---------- "Who are we?" section ----------
  connectNowBtn() {
    // Two copies exist (desktop + mobile); only one is visible per viewport
    return cy.contains("a", "Connect Now").filter(":visible").first();
  }

  // ---------- Product carousel ----------
  productDot(label) {
    return cy.get(`[role="tab"][aria-label="Go to ${label}"]`);
  }

  activeProductCard() {
    // The visible article rendered for the currently-selected product
    return cy.get("article").filter(":visible");
  }

  activeExploreProductLink() {
    return this.activeProductCard().find("a").contains("Explore Product");
  }

  // ---------- Footer ----------
  linkedinLink() {
    return cy.get('a[href="https://www.linkedin.com/company/neubodhi/"]');
  }

  youtubeLink() {
    return cy.get('a[href="https://www.youtube.com/@NeuBodhi"]');
  }

  // ---------- Contact form ----------
  nameInput() {
    return cy.get("#contact-name");
  }

  emailInput() {
    return cy.get("#contact-email");
  }

  subjectInput() {
    return cy.get("#contact-subject");
  }

  messageInput() {
    return cy.get("#contact-message");
  }

  submitBtn() {
    return cy.contains("button[type='submit']", "Let's Connect");
  }

  fillContactForm({ name, email, subject, message } = {}) {
    if (name !== undefined) this.nameInput().clear().type(name, { delay: 0 });
    if (email !== undefined) this.emailInput().clear().type(email, { delay: 0 });
    if (subject !== undefined) this.subjectInput().clear().type(subject, { delay: 0 });
    if (message !== undefined) this.messageInput().clear().type(message, { delay: 0 });
    return this;
  }
}

export default new HomePage();
