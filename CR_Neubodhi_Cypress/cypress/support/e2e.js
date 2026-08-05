import "./commands";

// The live site throws an uncaught React hydration mismatch on page load
// (minified error #418 - a server/client render mismatch, which is an
// app-side bug on neubodhi.in, not a test issue). Cypress fails any test
// whose `before each` hits an uncaught exception from the app, so without
// this handler EVERY spec's initial cy.visit() fails before the test body
// even runs. This filter lets that one specific error pass through without
// failing the test, while still failing normally on any other real error.
Cypress.on("uncaught:exception", (err) => {
  if (err.message.includes("Minified React error #418")) {
    return false;
  }
  // returning nothing/undefined here lets Cypress fail on any other error
});