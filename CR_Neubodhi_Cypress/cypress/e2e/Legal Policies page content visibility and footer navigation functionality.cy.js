import PrivacyPolicyPage from "../support/pages/PrivacyPolicyPage";

describe("Privacy Policy page - footer redirection and content validation", () => {
  beforeEach(() => {

    cy.on("uncaught:exception", () => false);
  });

  // TC_NB_70
  it("TC_NB_070 - Redirects to Privacy Policy page when clicking footer link", () => {
    PrivacyPolicyPage.visitHome();

    PrivacyPolicyPage.clickFooterPrivacyPolicyLink();

    cy.url().should("include", "/legal/policies");
    PrivacyPolicyPage.getPageTitle().should("be.visible");
  });

  // TC_NB_071
  it("TC_NB_071 - Validates the Contact email link without navigating externally", () => {
    PrivacyPolicyPage.visitPrivacyPolicyDirect();

    PrivacyPolicyPage.scrollToContactSection();
    PrivacyPolicyPage.getContactSection().should("be.visible");


    PrivacyPolicyPage.getEmailLink()
      .should("be.visible")
      .and("have.attr", "href", `mailto:${PrivacyPolicyPage.contactEmail}`);

    PrivacyPolicyPage.getEmailLink()
      .invoke("removeAttr", "href")
      .click();

    cy.url().should("include", "/legal/policies");
  });
});