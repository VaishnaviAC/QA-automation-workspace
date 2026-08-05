import CareersPage from "../support/pages/CareersPage";

describe("Careers page navigation, job listing visibility, and job application submission flow", () => {
  // TC_NB_060
  it("TC_NB_060 - user can navigate to the Careers page from the footer section", () => {
    cy.visit("/");
    CareersPage.footerCareersLink().scrollIntoView().click();
    cy.url().should("include", "/careers");
    CareersPage.allJobListingLinks().should("have.length.greaterThan", 0);
  });

  // TC_NB_061
  it("TC_NB_061 - clicking a job opening's arrow icon opens its job details page and application form", () => {
    CareersPage.visit();
    CareersPage.jobListingLink("Robotic Intern").click();

    cy.url().should("include", "/careers/robotic-intern");
    CareersPage.jobTitleHeading().should("contain.text", "Robotic Intern");
    CareersPage.jobSectionHeading("Job Description").should("be.visible");
    CareersPage.jobSectionHeading("Candidate Requirements").should("be.visible");
    CareersPage.jobSectionHeading("Key Responsibilities").should("be.visible");
    CareersPage.jobSectionHeading("Familiar Tools").should("be.visible");
    CareersPage.submitBtn().should("be.visible");
  });

  describe("Robotic Intern job details page", () => {
    beforeEach(() => {
      CareersPage.visitJob("robotic-intern");
    });

    // TC_NB_062
    it("TC_NB_062 - application form is displayed on the selected job details page", () => {
      CareersPage.fullNameInput().should("be.visible");
      CareersPage.emailInput().should("be.visible");
      CareersPage.experienceInput().should("be.visible");
      CareersPage.submitBtn().should("be.visible");
    });

    // TC_NB_063
    it("TC_NB_063 - all application form fields are visible", () => {
      CareersPage.fullNameInput().should("be.visible");
      CareersPage.emailInput().should("be.visible");
      CareersPage.experienceInput().should("be.visible");
      CareersPage.portfolioInput().should("be.visible");
      CareersPage.ctcInput().should("be.visible");
      CareersPage.resumeDropzone().should("be.visible");
      CareersPage.submitBtn().should("be.visible");
    });

    // TC_NB_064
    it("TC_NB_064 - mandatory fields are marked with an asterisk (*)", () => {
      CareersPage.fullNameInput().should("have.attr", "placeholder").and("include", "*");
      CareersPage.emailInput().should("have.attr", "placeholder").and("include", "*");
      CareersPage.experienceInput().should("have.attr", "placeholder").and("include", "*");
      CareersPage.portfolioInput().should("have.attr", "placeholder").and("include", "optional");
      CareersPage.ctcInput().should("have.attr", "placeholder").and("include", "optional");
    });

    // TC_NB_065
    it("TC_NB_065 - Resume Upload section displays supported file formats and max file size", () => {
      CareersPage.resumeDropzone().should("be.visible").and("contain.text", "Upload Your Resume");
      CareersPage.resumeHelperText().should("be.visible").and("contain.text", "PDF, DOC, or DOCX").and("contain.text", "5 MB");
    });

    // TC_NB_066
    it("TC_NB_066 - Submit Resume button is displayed and clickable", () => {
      CareersPage.submitBtn().should("be.visible").and("not.be.disabled");

      cy.wait(500);
      CareersPage.submitBtn().click({ force: true });

      CareersPage.submitBtn().should("exist");
    });

    // TC_NB_067
    it("TC_NB_067 - file size validation prevents an oversized resume from being uploaded", () => {
      cy.intercept("POST", "**/api/**").as("submitApplication");

      CareersPage.fillApplicationForm({
        fullName: "Test",
        email: "Test@gmail.com",
        experience: "1.5",
      });
      CareersPage.uploadResume("cypress/fixtures/oversized-resume.pdf");

      cy.wait(2000);

      CareersPage.submitBtn().click({ force: true });

    cy.get("#careers-resume-error", { timeout: 5000 }).should("be.visible");
    });

    // TC_NB_068
    it("TC_NB_068 - application form can be submitted with valid data", () => {
      cy.intercept("POST", "**/api/**").as("submitApplication");

      CareersPage.fillApplicationForm({
        fullName: "Test",
        email: "Test@gmail.com",
        experience: "1.5",
      });
      CareersPage.uploadResume("cypress/fixtures/valid-resume.pdf");
      CareersPage.submitBtn().click();

      cy.wait("@submitApplication", { timeout: 10000 }).its("response.statusCode").should("be.oneOf", [200, 201]);
      cy.contains(/success|received|thank you|submitted/i, { timeout: 10000 }).should("be.visible");
    });

    // TC_NB_069
    it("TC_NB_069 - form is not submitted when mandatory fields are left empty", () => {
      cy.intercept("POST", "**/api/**").as("submitAttempt");

      cy.wait(500);
      CareersPage.submitBtn().click();

      cy.wait(1000);
      cy.get("@submitAttempt.all").should("have.length", 0);
      cy.url().should("include", "/careers/robotic-intern");
      cy.contains(/success|received|thank you|submitted/i).should("not.exist");
    });
  });
});
