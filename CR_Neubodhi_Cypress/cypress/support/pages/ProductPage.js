// ============================================================================
// Page object for Products-related interactions: the header "Products"
// dropdown (available globally in the nav, so reachable from any page), the
// ISACA product detail page content, and the SecureWatch product detail
// page content (feature tabs + Connect Now CTA).
//
// CONFIRMED selectors below are taken directly from the saved ISACA and
// SecureWatch product page HTML sources. UNCONFIRMED selectors are flagged
// inline - please verify against the live site and correct if they differ.
// ============================================================================

class ProductPage {
  // ---------- Navigation ----------
  visitHome() {
    cy.visit("/");
    return this;
  }

  // Confirmed working URL (verified via TC_NB_005 in the home page suite).
  visitIsaca() {
    cy.visit("/products/isaca");
    return this;
  }

  // Confirmed working URL (saved SecureWatch product page source was
  // captured from this path).
  visitSecureWatch() {
    cy.visit("/products/securewatch");
    return this;
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

  // UNCONFIRMED: exact text/href of this link was not available in any
  // source provided - verify against the live dropdown and correct if needed.
  viewAllProductsLink() {
    return cy.contains("a", "View all products", { matchCase: false });
  }

  // Click "SecureWatch" inside the Products dropdown - requires
  // navProductsMenuBtn() to already be open/clicked.
  openSecureWatchFromDropdown() {
    this.navProductsDropdownLinks().contains("SecureWatch", { matchCase: false }).click({ force: true });
    return this;
  }

  // ---------- ISACA product page content ----------
  // Confirmed: H1 reads "AUTONOMOUS" with a separate "Vessel" sub-line
  // directly beneath it.
  productHeading() {
    return cy.get("h1").contains("AUTONOMOUS", { matchCase: false });
  }

  productSubtitle() {
    return cy.contains("Vessel");
  }

  // Confirmed product description paragraph (opening sentence).
  productDescription() {
    return cy.contains(
      "ISACA Autonomous Surface Vehicle (ASV) is a next-generation unmanned marine platform",
      { matchCase: false }
    );
  }

  // Confirmed hero/vessel image alt text.
  productMedia() {
    return cy.get("img[alt*='ISACA vessel']").first();
  }

  // Confirmed: bottom CTA is a plain <a href="https://neubodhi.in/contact">
  // wrapping a "Connect Now" span - same pattern as the homepage's
  // Connect Now button. Reused as-is for the SecureWatch page, which uses
  // the identical CTA pattern.
  connectNowBtn() {
    return cy.contains("Connect Now").filter(":visible").first();
  }

  // Clicks the Connect Now CTA safely. A real run showed
  // connectNowBtn().scrollIntoView().click() intermittently fail with
  // "page updated while this command was executing" - the anchor gets
  // swapped out by a React re-render between being found and being acted
  // on. Re-querying the element for each action (rather than chaining off
  // one cached reference) avoids that race.
  clickConnectNow() {
    this.connectNowBtn().scrollIntoView();
    this.connectNowBtn().click({ force: true });
    return this;
  }

  // ---------- SecureWatch product page content ----------
  // Confirmed from the saved page source: H1 reads "SECUREWATCH".
  securewatchHeading() {
    return cy.get("h1").contains("SECUREWATCH", { matchCase: false });
  }

  // Confirmed hero image alt text on the SecureWatch page.
  securewatchMedia() {
    return cy.get('img[alt="Surveillance AI dashboard"]').first();
  }

  // Confirmed: "What is a SECUREWATCH?" section heading.
  securewatchSectionHeading() {
    return cy.contains("h2", "What is a", { matchCase: false });
  }

  // Confirmed feature tab button labels (buttons, not links) inside the
  // "What is a SecureWatch?" section.
  securewatchFeatureTabs = {
    smartPortal: "Smart Portal",
    advancedModules: "Advanced Modules",
    strongholdProtection: "Stronghold Protection",
    aiHumanDriven: "AI - Human Driven",
  };

  securewatchFeatureTabButton(label) {
    return cy.contains("button", label);
  }

  clickSecurewatchFeatureTab(label) {
    this.securewatchFeatureTabButton(label).click({ force: true });
    return this;
  }

  // The active tab's related image, found directly by its alt attribute
  // (confirmed to mirror the active tab's label exactly, e.g.
  // alt="AI - Human Driven"). Querying by alt directly is more reliable
  // than climbing the DOM from the section heading - a real run showed the
  // image does NOT live under the same shallow ancestor div as the heading,
  // so parents()/find() chains from the heading returned zero matches.
  securewatchFeatureImage(label) {
    return cy.get(`img[alt="${label}"]`);
  }

  // No aria-pressed/aria-selected attribute confirmed on the live markup,
  // so this falls back to a loose class check alongside the image swap
  // check (securewatchFeatureImage) as the primary signal of "active".
  verifySecurewatchTabActive(label) {
    this.securewatchFeatureTabButton(label)
      .should("be.visible")
      .and("satisfy", ($btn) => {
        const el = $btn[0];
        const cls = el.className || "";
        const ariaPressed = el.getAttribute("aria-pressed");
        const ariaSelected = el.getAttribute("aria-selected");
        return (
          ariaPressed === "true" ||
          ariaSelected === "true" ||
          /active|selected|bg-|border-\[#/.test(cls)
        );
      });
    return this;
  }

  // ---------- Digital Twin product page content ----------
  // Confirmed canonical URL: /products/digital-twin
  visitDigitalTwin() {
    cy.visit("/products/digital-twin");
    return this;
  }

  // Confirmed: small label above the H1 reads "Digital Twin"; the H1 itself
  // reads "MONITORING" (the page splits the product name across two lines).
  digitalTwinSubtitle() {
    return cy.contains("p", "Digital Twin");
  }

  digitalTwinHeading() {
    return cy.get("h1").contains("MONITORING", { matchCase: false });
  }

  // Confirmed opening sentence of the description paragraph.
  digitalTwinDescription() {
    return cy.contains(
      "Digital Twin is a browser-based 3D platform that provides a real-time operational view of the port",
      { matchCase: false }
    );
  }

  // Confirmed hero image (first descriptive image on the page, appears
  // before the later "3D port view on laptop" image further down).
  digitalTwinMedia() {
    return cy.get('img[alt="Digital Twin monitoring dashboard"]').first();
  }

  // ---------- NeuroGen product page content ----------
  // Confirmed canonical URL: /products/neurogen
  visitNeurogen() {
    cy.visit("/products/neurogen");
    return this;
  }

  // Confirmed: small label above the H1 reads "Predictive Intelligence For";
  // the H1 itself reads "NEUROGEN".
  neurogenSubtitle() {
    return cy.contains("Predictive Intelligence For");
  }

  neurogenHeading() {
    return cy.get("h1").contains("NEUROGEN", { matchCase: false });
  }

  // Confirmed opening sentence of the description paragraph.
  neurogenDescription() {
    return cy.contains(
      "NeuroGen is an advanced platform for predictive maintenance, anomaly detection, and remaining useful life",
      { matchCase: false }
    );
  }

  // Confirmed hero image (first descriptive image on the page).
  neurogenMedia() {
    return cy.get('img[alt="NeuroGen dashboard on laptop"]').first();
  }

  // ---------- Electric Boat Retrofitting (NMES) product page content ----------
  // Confirmed canonical URL: /products/retrofitting. Note the site-wide
  // naming inconsistency already flagged above: this page's own H1 reads
  // "RETROFITTING" (with "ELECTRIC BOAT" as a label above it), while the
  // product itself is internally called "NMES" in its description text.
  visitRetrofitting() {
    cy.visit("/products/retrofitting");
    return this;
  }

  retrofittingSubtitle() {
    return cy.contains("ELECTRIC BOAT");
  }

  retrofittingHeading() {
    return cy.get("h1").contains("RETROFITTING", { matchCase: false });
  }

  // Confirmed opening sentence of the description paragraph.
  retrofittingDescription() {
    return cy.contains(
      "The NeoBodhi Marine Electrification System (NMES) is a complete retrofit solution",
      { matchCase: false }
    );
  }

  // Confirmed hero image (first descriptive image on the page).
  retrofittingMedia() {
    return cy.get('img[alt="Solar-equipped electric boat on open water"]').first();
  }

  // ---------- GBAS product page content ----------
  // Confirmed canonical URL: /products/gbas
  visitGbas() {
    cy.visit("/products/gbas");
    return this;
  }

  gbasSubtitle() {
    return cy.contains("GROUND BASED AUTONOMOUS SYSTEM");
  }

  gbasHeading() {
    return cy.get("h1").contains("GBAS", { matchCase: false });
  }

  // Confirmed opening sentence of the description paragraph.
  gbasDescription() {
    return cy.contains(
      "GBAS is an autonomous unmanned ground vehicle (UGV) platform engineered to navigate and operate",
      { matchCase: false }
    );
  }

  // UNCONFIRMED / NOT AVAILABLE: unlike every other product page, the saved
  // GBAS HTML has no descriptive image alt text at all - every <img> on the
  // page is either the NeuBodhi logo, a social icon, or alt="" decorative
  // background art. There is no hero media element to assert on. Do not add
  // a media check for GBAS until a real element is confirmed on the live
  // site; flag this to the team as a possible accessibility gap too.

  // ---------- ALDDS product page content ----------
  // Confirmed canonical URL: /products/aldds
  visitAldds() {
    cy.visit("/products/aldds");
    return this;
  }

  alddsHeading() {
    return cy.get("h1").contains("ALDDS", { matchCase: false });
  }

  // Confirmed opening sentence of the description paragraph.
  alddsDescription() {
    return cy.contains(
      "An integrated software stack for LPG cylinder post-filling that fuses industrial vision with acoustic imaging",
      { matchCase: false }
    );
  }

  // Confirmed hero image (first descriptive image on the page).
  alddsMedia() {
    return cy.get('img[alt="ALDDS platform dashboard on production hardware"]').first();
  }
}

export default new ProductPage();