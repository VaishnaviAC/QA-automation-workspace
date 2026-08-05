import ServicePages from "../support/pages/ServicePages";

describe("All Services menu options (AI Services, Mechanical Services, and Robotics) navigate to the correct pages and display the expected content and functionality", () => {
  beforeEach(() => {
    ServicePages.visitHome();
  });

  // ---------- AI Services ----------

  // TC_NB_051
  it("TC_NB_051 - navigates to the AI Services page from the Services dropdown in the header", () => {
    ServicePages.navServicesMenuBtn().click();
    ServicePages.navServiceLink("AI").click();

    cy.url().should("include", "/services/ai");
    ServicePages.pageHeading().should("contain.text", "AI Systems").and("be.visible");
    ServicePages.pageFooter().should("exist");
  });

  // TC_NB_052
  it("TC_NB_052 - AI Systems Connect Us button (top) redirects to the Contact page", () => {
    cy.visit("/services/ai");

    ServicePages.topConnectUsBtn().click();

    cy.url().should("include", "/contact");
  });

  // TC_NB_053
  it("TC_NB_053 - AI Systems bottom Connect Us button redirects to the Contact page", () => {
    cy.visit("/services/ai");

    ServicePages.bottomConnectUsBtn().scrollIntoView().click();

    cy.url().should("include", "/contact");
  });

  // ---------- Mechanical ----------

  // TC_NB_054
  it("TC_NB_054 - navigates to the Mechanical page from the Services dropdown in the header", () => {
    ServicePages.navServicesMenuBtn().click();
    ServicePages.navServiceLink("Mechanical").click();

    cy.url().should("include", "/services/mechanical");
    ServicePages.pageHeading().should("contain.text", "Mechanical Systems").and("be.visible");
    ServicePages.pageFooter().should("exist");
  });

  // TC_NB_055
  it("TC_NB_055 - Mechanical Systems & Design Connect Us button (top) redirects to the Contact page", () => {
    cy.visit("/services/mechanical");

    ServicePages.topConnectUsBtn().click();

    cy.url().should("include", "/contact");
  });

  // TC_NB_056
  it("TC_NB_056 - Mechanical bottom Connect Us button redirects to the Contact page", () => {
    cy.visit("/services/mechanical");

    ServicePages.bottomConnectUsBtn().scrollIntoView().click();

    cy.url().should("include", "/contact");
  });

  // ---------- Robotics (UNCONFIRMED page content - see header note #3) ----------

  // TC_NB_057
  it("TC_NB_057 - navigates to the Robotics page from the Services dropdown in the header", () => {
    ServicePages.navServicesMenuBtn().click();
    ServicePages.navServiceLink("Robotics").click();

    cy.url().should("include", "/services/robotics");

    ServicePages.pageHeading().should("be.visible");
    ServicePages.pageFooter().should("exist");
  });

  // TC_NB_058
  it("TC_NB_058 - Robotics Systems Engineering Connect Us button (top) redirects to the Contact page", () => {
    cy.visit("/services/robotics");

    ServicePages.topConnectUsBtn().click();

    cy.url().should("include", "/contact");
  });

  // TC_NB_059
  it("TC_NB_059 - Robotics bottom Connect Us button (above the footer) redirects to the Contact page", () => {
    cy.visit("/services/robotics");


    ServicePages.bottomConnectUsBtn().scrollIntoView().click();

    cy.url().should("include", "/contact");
  });
});
