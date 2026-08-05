class ServicePages {
  visitHome() {
    cy.visit("/");
    return this;
  }

  navServicesMenuBtn() {
    return cy.get('nav button[aria-haspopup="menu"]').contains("Services");
  }

  // Scoped strictly to the wrapper div immediately containing the Services
  // button, since a plain [role="menu"] selector also matches the Products
  // dropdown elsewhere in the nav (both exist in the DOM at once).
  navServicesDropdownLinks() {
    return this.navServicesMenuBtn().parents("div.relative").first().find("a");
  }

  // name: "Robotics" | "AI" | "Mechanical" (confirmed real link text)
  navServiceLink(name) {
    return this.navServicesDropdownLinks().contains(name, { matchCase: false });
  }

  pageHeading() {
    return cy.get("h1").first();
  }

  // Scoped to the section containing the page's main (first) H1 - the CTA
  // link inside that same section wraps the "Connect Us" button, avoiding
  // any dependence on a second matching element existing elsewhere.
  topConnectUsBtn() {
    return cy.get("h1").first().parent().find("a").contains("Connect Us");
  }

  // Scoped to the section headed "Connect With Us!" (confirmed identical
  // wording on every service page) rather than counting/indexing matches -
  // this stays correct even if a duplicate near-identical CTA elsewhere on
  // the page gets collapsed by the site's hydration mismatch.
  bottomConnectUsBtn() {
    cy.scrollTo("bottom", { duration: 300, ensureScrollable: false });
    return cy
      .contains("h1", "Connect With Us!")
      .parent()
      .find("a")
      .contains("Connect Us");
  }

  pageFooter() {
    return cy.get("footer");
  }
}

export default new ServicePages();
