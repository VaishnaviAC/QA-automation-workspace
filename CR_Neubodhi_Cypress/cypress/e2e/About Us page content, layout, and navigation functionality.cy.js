import AboutPage from "../support/pages/AboutPage";
import HomePage from "../support/pages/HomePage";

describe("About Us page content, layout, and navigation functionality", () => {
  beforeEach(() => {
    HomePage.visit();
  });

  // TC_NB_040
  it("TC_NB_040 - navigates to the About Us page successfully and scrolls down without any issues", () => {
    HomePage.navAboutLink().click();
    cy.url().should("include", "/about");

    // Confirmed page content checks.
    AboutPage.pageHeading().should("be.visible");
    AboutPage.ourMissionHeading().should("be.visible");

    AboutPage.scrollDownTwice();

    // Confirmed content further down the page, reached only after
    // scrolling - verifies scrolling actually surfaced it without errors.
    AboutPage.cultureQuoteHeading().should("be.visible");
    AboutPage.meetLeadersHeading().should("exist");

    AboutPage.pageFooter().should("exist");
  });

  // TC_NB_041
  it("TC_NB_041 - clicking the Connect Now button redirects to the Contact Us page", () => {
    HomePage.navAboutLink().click();
    cy.url().should("include", "/about");

    AboutPage.connectNowBtn().scrollIntoView().click();

    cy.url().should("include", "/contact");
  });
});
