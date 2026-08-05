import ProductPage from "../support/pages/ProductPage";

describe("Products page load, product listings, and redirection functionality", () => {
  beforeEach(() => {

    cy.on("uncaught:exception", () => false);

    ProductPage.visitHome();
  });

  // TC_NB_023
  it("TC_NB_023 - Products menu on the Home page displays the complete product dropdown list", () => {
    ProductPage.navProductsMenuBtn().click();

    ProductPage.navProductsDropdownLinks().then(($links) => {
      if ($links.length === 0) {
        throw new Error(
          "No links found inside the Products dropdown panel. Please check manually what this dropdown " +
            "contains on the live site and share the HTML so the assertions below can be corrected."
        );
      }

      const dropdownText = $links.text();


      const expectedProducts = [
        "ISACA",
        "SECUREWATCH",
        "DIGITAL TWIN",
        "NEUROGEN",
        "ELECTRIC BOAT RETROFITTINGS",
        "GBAS",
        "ALDDS",
      ];

      expectedProducts.forEach((productName) => {
        expect(
          dropdownText.toUpperCase(),
          `Products dropdown should contain "${productName}"`
        ).to.include(productName);
      });
    });


    ProductPage.viewAllProductsLink().should("be.visible");
  });

  // TC_NB_024

  const dropdownProducts = [
    { cardName: "ISACA", path: "/products/isaca" },
    { cardName: "SECUREWATCH", path: "/products/securewatch" },
    { cardName: "DIGITAL TWIN", path: "/products/digital-twin" },
    { cardName: "NEUROGEN", path: "/products/neurogen" },
    { cardName: "ELECTRIC BOAT RETROFITTINGS", path: "/products/retrofitting" },
    { cardName: "GBAS", path: "/products/gbas" },
    { cardName: "ALDDS", path: "/products/aldds" },
  ];

  dropdownProducts.forEach(({ cardName, path }) => {
    it(`TC_NB_024 - ${cardName} in the Products dropdown redirects to the ${cardName} page`, () => {
      ProductPage.navProductsMenuBtn().click();
      ProductPage.navProductsDropdownLinks()
        .contains(cardName, { matchCase: false })
        .click({ force: true });
      cy.url().should("include", path);
    });
  });

  // TC_NB_025
  it("TC_NB_025 - ISACA product page displays accurate and complete content", () => {
    ProductPage.visitIsaca();

    // Confirmed from the saved page source: H1 reads "AUTONOMOUS" with a
    // separate "Vessel" sub-line directly beneath it.
    ProductPage.productHeading().should("be.visible");
    ProductPage.productSubtitle().should("be.visible");

    // Confirmed product description paragraph.
    ProductPage.productDescription().should("be.visible");

    // Media content - the hero/vessel image should be present and visible.
    ProductPage.productMedia().should("be.visible");

    // Relevant action button - the bottom "Connect Now" CTA.
    ProductPage.connectNowBtn().should("be.visible");
  });

  // TC_NB_026
  it("TC_NB_026 - Connect Now button on the ISACA product page redirects to the Contact Us page", () => {
    ProductPage.visitIsaca();

    ProductPage.clickConnectNow();

    cy.url().should("include", "/contact");
  });

  // TC_NB_027
  it("TC_NB_027 - Verify SecureWatch product page content on product page", () => {
    ProductPage.navProductsMenuBtn().click();
    ProductPage.openSecureWatchFromDropdown();

    cy.url().should("include", "/products/securewatch");

    // Product title, description/media content, and relevant action button.
    ProductPage.securewatchHeading().should("be.visible");
    ProductPage.securewatchMedia().should("be.visible");
    ProductPage.securewatchSectionHeading().should("be.visible");
    ProductPage.connectNowBtn().should("be.visible");
  });

  // TC_NB_028
  it("TC_NB_028 - Verify clicking each SecureWatch feature tab displays the corresponding image and content", () => {
    ProductPage.visitSecureWatch();
    ProductPage.securewatchHeading().should("be.visible");

    const {
      smartPortal,
      advancedModules,
      strongholdProtection,
      aiHumanDriven,
    } = ProductPage.securewatchFeatureTabs;

    [smartPortal, advancedModules, strongholdProtection, aiHumanDriven].forEach((tabLabel) => {
      ProductPage.clickSecurewatchFeatureTab(tabLabel);
      ProductPage.verifySecurewatchTabActive(tabLabel);

      // Content/image swaps to match the selected tab - queried directly by
      // alt text rather than via a DOM-position guess (see ProductPage.js).
      ProductPage.securewatchFeatureImage(tabLabel).should("be.visible");

      // No full page reload should occur while switching tabs.
      cy.url().should("include", "/products/securewatch");
    });
  });

  // TC_NB_029
  it("TC_NB_029 - Verify redirection to Contact Us page when clicking Connect Now on the SecureWatch product page", () => {
    ProductPage.visitSecureWatch();
    ProductPage.securewatchHeading().should("be.visible");

    ProductPage.clickConnectNow();

    cy.url().should("include", "/contact");
    // Contact Us form should render correctly.
    cy.get("form").should("be.visible");
  });

  // TC_NB_030
  it("TC_NB_030 - Verify Digital Twin product page content on product page", () => {
    ProductPage.visitDigitalTwin();

    // Product title, description, media content, and relevant action button.
    ProductPage.digitalTwinSubtitle().should("be.visible");
    ProductPage.digitalTwinHeading().should("be.visible");
    ProductPage.digitalTwinDescription().should("be.visible");
    ProductPage.digitalTwinMedia().should("be.visible");
    ProductPage.connectNowBtn().should("be.visible");
  });

  // TC_NB_031
  it("TC_NB_031 - Verify redirection to Contact Us page when clicking Connect Now button in footer section on Digital Twin product page", () => {
    ProductPage.visitDigitalTwin();

    ProductPage.clickConnectNow();

    cy.url().should("include", "/contact");
  });

  // TC_NB_032
  it("TC_NB_032 - Verify NeuroGen product page content on product page", () => {
    ProductPage.visitNeurogen();

    ProductPage.neurogenSubtitle().should("be.visible");
    ProductPage.neurogenHeading().should("be.visible");
    ProductPage.neurogenDescription().should("be.visible");
    ProductPage.neurogenMedia().should("be.visible");
    ProductPage.connectNowBtn().should("be.visible");
  });

  // TC_NB_033
  it("TC_NB_033 - Verify redirection to Contact Us page when clicking Connect Now button in footer section on NeuroGen product page", () => {
    ProductPage.visitNeurogen();

    ProductPage.clickConnectNow();

    cy.url().should("include", "/contact");
  });

  // TC_NB_034 
  it("TC_NB_034 - Verify electric boat retrofitting product page content on product page", () => {
    ProductPage.visitRetrofitting();

    ProductPage.retrofittingSubtitle().should("be.visible");
    ProductPage.retrofittingHeading().should("be.visible");
    ProductPage.retrofittingDescription().should("be.visible");
    ProductPage.retrofittingMedia().should("be.visible");
    ProductPage.connectNowBtn().should("be.visible");
  });

  // TC_NB_035 
  it("TC_NB_035 - Verify redirection to Contact Us page when clicking Connect Now button in footer section on electric boat retrofitting product page", () => {
    ProductPage.visitRetrofitting();

    ProductPage.clickConnectNow();

    cy.url().should("include", "/contact");
  });

  // TC_NB_036
  it("TC_NB_036 - Verify GBAS product page content on product page", () => {
    ProductPage.visitGbas();

    ProductPage.gbasSubtitle().should("be.visible");
    ProductPage.gbasHeading().should("be.visible");
    ProductPage.gbasDescription().should("be.visible");

    ProductPage.connectNowBtn().should("be.visible");
  });

  // TC_NB_037
  it("TC_NB_037 - Verify redirection to Contact Us page when clicking Connect Now button in footer section on GBAS product page", () => {
    ProductPage.visitGbas();

    ProductPage.clickConnectNow();

    cy.url().should("include", "/contact");
  });

  // TC_NB_038
  it("TC_NB_038 - Verify ALDDS product page content on product page", () => {
    ProductPage.visitAldds();

    ProductPage.alddsHeading().should("be.visible");
    ProductPage.alddsDescription().should("be.visible");
    ProductPage.alddsMedia().should("be.visible");
    ProductPage.connectNowBtn().should("be.visible");
  });

  // TC_NB_039
  it("TC_NB_039 - Verify redirection to Contact Us page when clicking Connect Now button in footer section on ALDDS product page", () => {
    ProductPage.visitAldds();

    ProductPage.clickConnectNow();

    cy.url().should("include", "/contact");
  });
});