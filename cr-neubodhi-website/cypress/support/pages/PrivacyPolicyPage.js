/**
 * Page Object: Privacy Policy (Legal Policies) Page
 * URL: https://neubodhi.in/legal/policies
 *
 * Selectors below are derived from the actual page markup
 * (Privacy_Policies___NeuBodhi.html) so they stay resilient
 * to minor styling changes.
 */

class PrivacyPolicyPage {
  // ---------- Base URLs ----------
  homeUrl = 'https://neubodhi.in/';
  privacyPolicyUrl = 'https://neubodhi.in/legal/policies';

  // ---------- Navigation ----------
  visitHome() {
    cy.visit(this.homeUrl);
  }

  visitPrivacyPolicyDirect() {
    cy.visit(this.privacyPolicyUrl);
  }

  // ---------- Footer ----------
  getFooter() {
    return cy.get('footer');
  }

  getFooterPrivacyPolicyLink() {
    // "Legal" column in footer -> "Privacy Policy" link
    return cy.get('footer').contains('a', 'Privacy Policy');
  }

  getFooterTermsLink() {
    return cy.get('footer').contains('a', 'Terms & Conditions');
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

  clickFooterPrivacyPolicyLink() {
    this.getFooterPrivacyPolicyLink().scrollIntoView().click();
  }

  // ---------- Page Header ----------
  getPageTitle() {
    return cy.get('h1').contains('Privacy Policies');
  }

  getLastUpdatedText() {
    return cy.contains('p', 'Last Updated');
  }

  getIntroParagraphs() {
    return cy.contains(
      'p',
      'At NeuBodhi, we build advanced AI- and engineering-driven systems'
    );
  }

  // ---------- Content Sections (h2 headings) ----------
  sectionHeadings = [
    'Collection of Information',
    'How We Use Your Information',
    'Use of Resume and Open Application Data',
    'Your Rights and Choices',
    'Updates to This Privacy Policy',
    'Contact NeuBodhi',
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
    return cy.contains('h2', 'Contact NeuBodhi').parent();
  }

  getEmailLink() {
    // Selector is based on the link's VISIBLE TEXT (the email address),
    // not its `href` attribute. This keeps the locator stable even if a
    // test programmatically strips the `href` (e.g. to safely test a
    // click on a mailto: link without triggering a real OS mail-client
    // handoff). If the selector were `a[href="mailto:..."]`, removing the
    // href mid-test would make Cypress unable to re-find the element on
    // any actionability retry, causing "No elements in the current DOM
    // matched your query" failures.
    return cy.contains('a', this.contactEmail);
  }

  scrollToContactSection() {
    this.getContactSection().scrollIntoView();
  }
}

export default new PrivacyPolicyPage();