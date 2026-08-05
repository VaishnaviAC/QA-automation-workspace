import HomePage from "./pages/HomePage";

// The contact form section is streamed in via a React Suspense boundary
// (visible in the page source as $RC("B:3","S:3")) — it starts as a loading
// skeleton and gets swapped for the real form once its data resolves.
// Waiting for the real submit button text confirms the skeleton is gone.
// An extra settle buffer is added because background activity elsewhere on
// the page (the hero's 3D scene repeatedly re-fetching WASM assets) was
// still occasionally causing a re-render mid-type even after the form
// itself had loaded.
Cypress.Commands.add("scrollToContactForm", () => {
  cy.contains("button", "Let's Connect", { timeout: 15000 }).scrollIntoView();
  cy.get("#contact-name", { timeout: 15000 }).should("be.visible");
  cy.wait(1000);
});

// The carousel is driven by the Next/Previous arrow buttons. A fixed number
// of clicks proved unreliable in practice — some clicks were silently
// dropped (likely because the carousel's CSS transition hadn't fully
// settled before the next click landed), causing the slide to end up one
// position short of the target. This version clicks Next and re-checks the
// slide index badge (e.g. "03 / 07") after every click, stopping as soon as
// the target is reached instead of assuming a fixed click count worked.
Cypress.Commands.add("goToProductSlide", (targetIndex, totalSlides = 7) => {
  const targetLabel = `${String(targetIndex).padStart(2, "0")} / ${String(totalSlides).padStart(2, "0")}`;

  const attempt = (remaining) => {
    cy.get("article").filter(":visible").then(($el) => {
      if ($el.text().includes(targetLabel)) {
        return;
      }
      if (remaining <= 0) {
        throw new Error(`goToProductSlide: could not reach slide "${targetLabel}" after multiple attempts`);
      }
      cy.get('button[aria-label="Next product"]').filter(":visible").first().click({ force: true });
      cy.wait(800);
      attempt(remaining - 1);
    });
  };

  attempt(totalSlides + 2);
});
