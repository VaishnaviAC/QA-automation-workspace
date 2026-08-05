import ContactPage from '../support/pages/ContactPage';

describe('Contact Us Page - Form Validations, Field Behavior & Submission', () => {
  const validData = {
    name: 'test',
    email: 'test@gmail.com',
    subject: 'Automation Testing Query',
    message: 'Test message',
  };

  beforeEach(() => {
    ContactPage.visitHome();
  });

  // TC_NB_042
  it('TC_NB_042 - should navigate to and load the Contact Us page successfully', () => {
    ContactPage.goToContactPage();
    ContactPage.assertContactPageLoaded();
  });

  // TC_NB_043
  it('TC_NB_043 - should display all Contact Us form fields', () => {
    ContactPage.goToContactPage();
    ContactPage.assertContactPageLoaded();
    ContactPage.assertAllFieldsVisible();
  });

  // TC_NB_044
  it('TC_NB_04 - should submit the form successfully with valid data', () => {
    ContactPage.goToContactPage();
    ContactPage.assertContactPageLoaded();
    ContactPage.fillForm(validData);
    ContactPage.assertSubmitEnabled();
    ContactPage.clickSubmit();
    ContactPage.assertSubmissionSuccess();
  });

  // TC_NB_045
  it('TC_NB_045 - should keep Submit button disabled when all fields are empty', () => {
    ContactPage.goToContactPage();
    ContactPage.assertContactPageLoaded();
    ContactPage.assertSubmitDisabled();
  });

  // TC_NB_046
  it('TC_NB_046 - should keep Submit button disabled when Name field is empty', () => {
    ContactPage.goToContactPage();
    ContactPage.fillForm({
      email: validData.email,
      subject: validData.subject,
      message: validData.message,
    });
    ContactPage.assertSubmitDisabled();
  });

  // TC_NB_047
  it('TC_NB_047 - should keep Submit button disabled when Email field is empty', () => {
    ContactPage.goToContactPage();
    ContactPage.fillForm({
      name: validData.name,
      subject: validData.subject,
      message: validData.message,
    });
    ContactPage.assertSubmitDisabled();
  });

  // TC_NB_048
  it('TC_NB_048 - should keep Submit button disabled when Subject field is empty', () => {
    ContactPage.goToContactPage();
    ContactPage.fillForm({
      name: validData.name,
      email: validData.email,
      message: validData.message,
    });
    ContactPage.assertSubmitDisabled();
  });

  // TC_NB_049
  it('TC_NB_049 - should keep Submit button disabled when Message field is empty', () => {
    ContactPage.goToContactPage();
    ContactPage.fillForm({
      name: validData.name,
      email: validData.email,
      subject: validData.subject,
    });
    ContactPage.assertSubmitDisabled();
  });

  // TC_NB_050
  it('TC_NB_050 - should display a validation error for an invalid email format', () => {
    ContactPage.goToContactPage();
    ContactPage.fillForm({
      name: validData.name,
      email: 'invalid_email',
      subject: validData.subject,
      message: validData.message,
    });
    ContactPage.blurField('#contact-email');

    cy.get('#contact-email').then(($el) => {
      const ariaInvalid = $el.attr('aria-invalid');
      if (ariaInvalid === 'true') {
        cy.wrap($el).should('have.attr', 'aria-invalid', 'true');
      } else {
        ContactPage.assertValidationMessageVisible(/valid email|email.*invalid|enter.*valid/i);
      }
    });
  });
});