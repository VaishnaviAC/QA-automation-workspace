// ============================================================================
// Page object for the About Us page.
//
// CONFIRMED from the saved About Us page HTML source (no guessing):
//   - H1 reads "KNOW US" + " BETTER" as two separate spans inside one <h1>
//   - Section headings present: "Our Mission" (h2), a culture/quote section
//     reading "A culture built on engineering rigor and research
//     integrity." (h2), and "Meet Our Leaders" (h2)
//   - The bottom CTA button text is "Connect Now" (a plain
//     <a href="https://neubodhi.in/contact">), the SAME pattern used on the
//     Home and ISACA pages - NOT "Connect Us" or "Connect With Us" as the
//     manual test case wording says. Flagging this as a real content
//     inconsistency between the manual test case and the live site.
// ============================================================================

class AboutPage {
  visit() {
    cy.visit("/about");
    return this;
  }

  // Reuses the same header nav pattern already confirmed working in
  // HomePage.js.
  navAboutLink() {
    return cy.get('nav a[href="/about"]').contains("About");
  }

  // Confirmed: H1 is rendered as two spans ("KNOW US" + " BETTER") inside
  // a single <h1> element.
  pageHeading() {
    return cy.get("h1").should("contain.text", "KNOW US").and("contain.text", "BETTER");
  }

  ourMissionHeading() {
    return cy.contains("h2", "Our Mission");
  }

  cultureQuoteHeading() {
    return cy.contains(
      "h2",
      "A culture built on engineering rigor and research integrity."
    );
  }

  meetLeadersHeading() {
    return cy.contains("h2", "Meet Our Leaders");
  }

  // Confirmed: bottom CTA is a plain <a href="https://neubodhi.in/contact">
  // wrapping a "Connect Now" span - same as Home/ISACA. The manual test
  // case calls this "Connect Us"/"Connect With Us", which does not match
  // the live site text.
  connectNowBtn() {
    return cy.contains("a", "Connect Now").filter(":visible").first();
  }

  // Scrolls down in two discrete steps (per the manual test case's "scroll
  // down twice" wording) rather than jumping straight to the bottom, so any
  // lazy-loaded content or scroll-triggered animation gets a chance to fire
  // between steps.
  scrollDownTwice() {
    cy.scrollTo(0, 700, { duration: 300 });
    cy.wait(300);
    cy.scrollTo(0, 1400, { duration: 300 });
    return this;
  }

  pageFooter() {
    return cy.get("footer");
  }
}

export default new AboutPage();
