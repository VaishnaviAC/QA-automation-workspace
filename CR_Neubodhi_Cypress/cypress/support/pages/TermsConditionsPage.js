class TermsConditionsPage {
  // ---------- Base URLs ----------
  homeUrl = 'https://neubodhi.in/';
  termsUrl = 'https://neubodhi.in/legal/terms';
  termsPath = '/legal/terms';

  // ---------- Navigation ----------
  visitHome() {
    cy.visit(this.homeUrl);
  }

  visitTermsDirect() {
    cy.visit(this.termsUrl);
  }

  // ---------- Footer ----------
  getFooter() {
    return cy.get('footer');
  }

  // The live app can render this href as either the relative path
  // ("/legal/terms") or the absolute URL depending on hydration state,
  // and may also have a hidden duplicate copy of the link (e.g. inside
  // a mobile menu). Filtering to :visible and matching on the path
  // (not full string equality) keeps this resilient to both.
  getVisibleFooterTermsLink() {
    return cy.get('footer').contains('a', 'Terms & Conditions').filter(':visible');
  }

  getVisibleFooterPrivacyPolicyLink() {
    return cy.get('footer').contains('a', 'Privacy Policy').filter(':visible');
  }

  getFooterAboutLink() {
    return cy.get('footer').contains('a', 'About');
  }

  getFooterContactLink() {
    return cy.get('footer').contains('a', 'Contact');
  }

  getFooterCareersLink() {
    return cy.get('footer').contains('a', 'Careers');
  }

  getFooterCopyrightText() {
    return cy.get('footer').contains('NeuBodhi. All rights reserved.');
  }

  clickFooterTermsLink() {
    // Alias + force-click: the footer can briefly re-render during
    // hydration and detach the element mid-click otherwise.
    this.getVisibleFooterTermsLink().as('termsLink');
    cy.get('@termsLink').click({ force: true });
  }

  // ---------- Page Header ----------
  getPageTitle() {
    return cy.get('h1').contains('Terms & Conditions');
  }

  getLastUpdatedText() {
    return cy.contains('p', 'Last Updated');
  }

  getIntroParagraph() {
    return cy.contains(
      'p',
      'Welcome to NeuBodhi. By accessing or using our website'
    );
  }

  // ---------- Content Sections (h2 headings, in document order) ----------
  sectionHeadings = [
    'About NeuBodhi',
    'Use of the Website',
    'Intellectual Property',
    'Information Accuracy',
    'Services and Engagements',
    'Careers and Resume Submissions',
    'Limitation of Liability',
    'Third-Party Links',
    'Confidentiality',
    'Governing Law',
    'Changes to These Terms',
    'Contact Us',
  ];

  getSectionHeading(headingText) {
    return cy.contains('h2', headingText);
  }

  getAllSectionHeadings() {
    return cy.get('h2');
  }

  // ---------- Contact / Email ----------
  contactEmail = 'sarvesh.devi@neubodhi.in';

  getContactSection() {
    return cy.contains('h2', 'Contact Us').parent();
  }

  getEmailLink() {
    return cy.get(`a[href="mailto:${this.contactEmail}"]`);
  }

  scrollToContactSection() {
    this.getContactSection().scrollIntoView();
  }
}

export default new TermsConditionsPage();
