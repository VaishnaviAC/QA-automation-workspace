// ============================================================================
// Page object for the Careers listing page and individual job detail pages.
//
// CONFIRMED from saved page HTML (no guessing):
//   - Footer "Careers" link: <a href="https://neubodhi.in/careers">Careers</a>
//   - Careers listing H1: "Join the team"
//   - Job rows: entire row (title + tags + arrow icon) is ONE <a> element,
//     e.g. href="https://neubodhi.in/careers/hr-intern", containing an
//     <h2> with the job title text ("HR Intern", "Robotic Intern",
//     "AI Intern"). NOTE: the manual sheet's example "Android Developer"
//     does not exist as a real job - the 3 real openings are HR Intern,
//     Robotic Intern, and AI Intern.
//   - Job detail page H1: the job title (e.g. "HR Intern")
//   - Job detail page section headings (h2): "Job Description",
//     "Candidate Requirements", "Key Responsibilities", "Familiar Tools"
//   - Application form field IDs: #careers-fullName, #careers-email,
//     #careers-experience, #careers-portfolio (optional), #careers-ctc
//     (optional), #careers-resume (hidden file input)
//   - Mandatory field placeholders end in "*" (e.g. "Your Full Name*");
//     optional fields say "(optional)" (e.g. "Current CTC (optional)")
//   - Resume dropzone text: "Upload Your Resume"; helper text:
//     "PDF, DOC, or DOCX · max 5 MB"
//   - <form novalidate> + the submit button's own
//     "disabled:cursor-not-allowed disabled:opacity-60" CSS classes
//   - CONFIRMED BY A REAL RUN: the Submit button is NOT disabled at rest
//     even with empty fields (see TC_NB_056) - so validation is handled
//     some other way at submit time, not by disabling the button
//
// NOT CONFIRMED (flagged, please verify against the live site):
//   - The exact wording of the oversized-file validation message (only
//     appears after real client-side JS validation fires - not visible in
//     any static source)
//   - The exact submission API endpoint and success confirmation wording
//     for the application form
// ============================================================================

class CareersPage {
  visit() {
    cy.visit("/careers");
    return this;
  }

  visitJob(slug) {
    cy.visit(`/careers/${slug}`);
    return this;
  }

  // ---------- Navigation ----------
  footerCareersLink() {
    return cy.contains("footer a", "Careers");
  }

  // ---------- Careers listing page ----------
  pageHeading() {
    return cy.contains("h1", "Join the team", { matchCase: false });
  }

  allJobListingLinks() {
    return cy.get('a[href*="/careers/"]').filter(':visible');
  }

  jobListingLink(jobTitle) {
    return cy.get('a[href*="/careers/"]').contains("h2", jobTitle, { matchCase: false }).parents("a").first();
  }

  // ---------- Job detail page ----------
  jobTitleHeading() {
    return cy.get("h1").first();
  }

  jobSectionHeading(sectionName) {
    return cy.contains("h2", sectionName, { matchCase: false });
  }

  // ---------- Application form ----------
  fullNameInput() {
    return cy.get("#careers-fullName");
  }

  emailInput() {
    return cy.get("#careers-email");
  }

  experienceInput() {
    return cy.get("#careers-experience");
  }

  portfolioInput() {
    return cy.get("#careers-portfolio");
  }

  ctcInput() {
    return cy.get("#careers-ctc");
  }

  resumeDropzone() {
    return cy.contains("Upload Your Resume");
  }

  resumeHelperText() {
    return cy.contains("PDF, DOC, or DOCX");
  }

  submitBtn() {
    return cy.get('form button[type="submit"]').contains("Submit Resume");
  }

  uploadResume(fixturePath) {
    cy.get("#careers-resume").selectFile(fixturePath, { force: true });
    return this;
  }

  // Small settle wait before interacting - this page has background
  // re-renders in progress (WASM/prefetch activity), confirmed by real
  // run failures, that can detach an input mid-chain if you type into it
  // too quickly after the page loads. Splitting clear() and type() into
  // separate statements (rather than one chained call) forces Cypress to
  // re-query the live DOM before each action instead of holding a
  // reference that might go stale between them.
  fillApplicationForm({ fullName, email, experience, portfolio, ctc } = {}) {
    cy.wait(500);

    if (fullName !== undefined) {
      this.fullNameInput().clear();
      this.fullNameInput().type(fullName, { delay: 0 });
    }
    if (email !== undefined) {
      this.emailInput().clear();
      this.emailInput().type(email, { delay: 0 });
    }
    if (experience !== undefined) {
      this.experienceInput().clear();
      this.experienceInput().type(experience, { delay: 0 });
    }
    if (portfolio !== undefined) {
      this.portfolioInput().clear();
      this.portfolioInput().type(portfolio, { delay: 0 });
    }
    if (ctc !== undefined) {
      this.ctcInput().clear();
      this.ctcInput().type(ctc, { delay: 0 });
    }
    return this;
  }
}

export default new CareersPage();
