import HomePage from "../support/pages/HomePage";

describe("Home page load, navigation links, banners, and redirection functionality", () => {
  beforeEach(() => {
    HomePage.visit();
  });

  // TC_NB_001
  it("TC_NB_001 - loads the home page with header, hero, and footer sections", () => {
    cy.get("nav").should("be.visible");
    cy.get("h1").contains("Artificial Intelligence").should("be.visible");
    cy.get("footer").should("be.visible");
  });

  // TC_NB_002
  it("TC_NB_002 - Explore Products button redirects to the Products page", () => {
    HomePage.heroExploreProductsBtn().click();
    cy.url().should("include", "/products");
  });

  // TC_NB_003
  it("TC_NB_003 - Know Us Better button redirects to the About Us page", () => {
    HomePage.heroKnowUsBetterBtn().click();
    cy.url().should("include", "/about");
  });

  // TC_NB_004
  it("TC_NB_004 - Connect Now button redirects to the Contact Us page", () => {
    HomePage.connectNowBtn().click();
    cy.url().should("include", "/contact");
  });

  // TC_NB_005 - ISACA is the default active slide, no carousel navigation needed
  it("TC_NB_005 - ISACA Explore Product button redirects to the ISACA page", () => {
    HomePage.activeProductCard().contains("h3", "ISACA", { matchCase: false }).should("be.visible");
    HomePage.activeExploreProductLink().click();
    cy.url().should("include", "/products/isaca");
  });

  const products = [
    { tc: "TC_NB_006", index: 2, cardName: "SECUREWATCH", path: "/products/securewatch" },
    { tc: "TC_NB_007", index: 3, cardName: "DIGITAL TWIN", path: "/products/digital-twin" },
    { tc: "TC_NB_008", index: 4, cardName: "NEUROGEN", path: "/products/neurogen" },
    { tc: "TC_NB_009", index: 5, cardName: "NMES", path: "/products/retrofitting" },
    { tc: "TC_NB_0010", index: 6, cardName: "GBAS", path: "/products/gbas" },
    { tc: "TC_NB_011", index: 7, cardName: "ALDDS", path: "/products/aldds" },
  ];

  products.forEach(({ tc, index, cardName, path }) => {
    it(`${tc} - ${cardName} Explore Product button redirects to the ${cardName} page`, () => {
      cy.goToProductSlide(index);
      HomePage.activeProductCard().contains("h3", cardName, { matchCase: false }).should("be.visible");
      HomePage.activeExploreProductLink().click();
      cy.url().should("include", path);
    });
  });


  it("TC_NB_012 - submits the contact form successfully with valid data", () => {
    cy.scrollToContactForm();

    cy.intercept("POST", "**/api/contact**").as("submitContact");

    HomePage.fillContactForm({
      name: "Test",
      email: "Test@gmail.com",
      subject: "Test subject",
      message: "Test message",
    });

    HomePage.submitBtn()
      .should("not.be.disabled")
      .click();

    cy.wait("@submitContact", { timeout: 20000 })
      .its("response.statusCode")
      .should("be.oneOf", [200, 201]);

  // Verify success message
    cy.contains("We have successfully received your request!", {
      timeout: 20000,
    }).should("be.visible");

  // Verify sub text
    cy.contains("Our team will get back to you shortly.", {
      timeout: 20000,
    }).should("be.visible");
  });

  // TC_NB_013
  it("TC_NB_013 - Let's Connect button remains disabled when the form is empty", () => {
    cy.scrollToContactForm();
    HomePage.submitBtn().should("be.disabled");
  });

  // TC_NB_014
  it("TC_NB_014 - Let's Connect button remains disabled when Name is missing", () => {
    cy.scrollToContactForm();
    HomePage.fillContactForm({ email: "Test@gmail.com", subject: "Test subject", message: "Test message" });
    HomePage.submitBtn().should("be.disabled");
  });

  // TC_NB_015
  it("TC_NB_015 - Let's Connect button remains disabled when Email is missing", () => {
    cy.scrollToContactForm();
    HomePage.fillContactForm({ name: "Test", subject: "Test subject", message: "Test message" });
    HomePage.submitBtn().should("be.disabled");
  });

  // TC_NB_016
  it("TC_NB_016 - Subject field accepts valid input and form submits", () => {
    cy.scrollToContactForm();
    cy.intercept("POST", "**/api/contact**").as("submitContact");

    HomePage.fillContactForm({
      name: "Test",
      email: "Test@gmail.com",
      subject: "test",
      message: "Test message",
    });
    HomePage.submitBtn().should("not.be.disabled").click();

    cy.wait("@submitContact", { timeout: 10000 });
  });

  // TC_NB_017
  it("TC_NB_017 - Let's Connect button remains disabled when Subject is left blank", () => {
    cy.scrollToContactForm();
    HomePage.fillContactForm({
      name: "Test",
      email: "Test@gmail.com",
      message: "Test message",
    });
    HomePage.submitBtn().should("be.disabled");
  });

  // TC_NB_018
  it("TC_NB_018 - Let's Connect button remains disabled when Message is missing", () => {
    cy.scrollToContactForm();
    HomePage.fillContactForm({ name: "Test", email: "Test@gmail.com", subject: "Test subject" });
    HomePage.submitBtn().should("be.disabled");
  });

  // TC_NB_019
  it("TC_NB_019 - shows an error for an invalid email format", () => {
    cy.scrollToContactForm();
    HomePage.fillContactForm({
      name: "Test",
      email: "invalid_email",
      subject: "Test subject",
      message: "Test message",
    });
    HomePage.submitBtn().click({ force: true });
    cy.contains("Please enter a valid email address", { matchCase: false }).should("be.visible");
  });

  // TC_NB_020
  it("TC_NB_020 - LinkedIn link points to the correct LinkedIn page", () => {
    HomePage.linkedinLink()
      .should("have.attr", "href", "https://www.linkedin.com/company/neubodhi/")
      .and("have.attr", "target", "_blank");
  });

  // TC_NB_021
  it("TC_NB_021 - YouTube link points to the correct YouTube page", () => {
    HomePage.youtubeLink()
      .should("have.attr", "href", "https://www.youtube.com/@NeuBodhi")
      .and("have.attr", "target", "_blank");
  });

  // TC_NB_022
  it("TC_NB_022 - Products menu in the header redirects to the Products page", () => {
    HomePage.navProductsMenuBtn().click();
    HomePage.navProductsDropdownLinks().then(($links) => {
      if ($links.length === 0) {
        throw new Error(
          "No links found inside the Products dropdown panel. Please check manually what this dropdown " +
            "contains on the live site (a submenu, a direct link, or nothing) and share the HTML so the " +
            "selector can be corrected."
        );
      }
      cy.wrap($links.first()).click({ force: true });
    });
    cy.url().should("include", "/products");
  });
});
