import { expect } from "@playwright/test";

export default class RegistrationPopUpPage {
  constructor(page) {
    this.page = page;
    this.signUpButton = page.getByRole("button", { name: "Sign up" });
    this.popUpTitle = page.getByRole("heading", { name: "Registration" });
    this.nameField = page.locator('[id="signupName"]');
    this.lastNameField = page.locator('[id="signupLastName"]');
    this.emailField = page.locator('[id="signupEmail"]');
    this.passwordField = page.locator('[id="signupPassword"]');
    this.repeatPasswordField = page.locator('[id="signupRepeatPassword"]');
    this.registerButton = page.getByRole("button", { name: "Register" });
    this.errorMessage = page.locator('[class="invalid-feedback"],[class*="alert"]');
  }

  async shouldPopUpSeeTitle() {
    await this.signUpButton.click();
    await expect(this.popUpTitle).toBeVisible();
  }

  async enterName(name) {
    await this.nameField.fill(name);
  }

  async clickOnField(field) {
    await field.click();
  }

  async enterLastName(lastName) {
    await this.lastNameField.fill(lastName);
  }

  async enterEmail(email) {
    await this.emailField.fill(email);
  }

  async enterPassword(password) {
    await this.passwordField.fill(password);
  }

  async enterReEnterPassword(reEnterPassword) {
    await this.repeatPasswordField.fill(reEnterPassword);
  }

  async clickRegisterButton() {
    await this.registerButton.click({ force: true });
  }

  async shouldSeeError(message) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(message);
  }

  async shouldHaveBorderColorRed(field) {
    await expect(field).toHaveCSS("border-color", "rgb(220, 53, 69)");
  }

  async registerButtonIsDisabled(isDisabled) {
    const expectation = expect(this.registerButton);
    isDisabled
      ? await expectation.toBeDisabled()
      : await expectation.not.toBeDisabled();
  }

  async fillRegistrationForm({
    name,
    lastName,
    email,
    password,
    repeatPassword,
  }) {
    name && (await this.enterName(name));
    lastName && (await this.enterLastName(lastName));
    email && (await this.enterEmail(email));
    password && (await this.enterPassword(password));
    repeatPassword && (await this.enterReEnterPassword(repeatPassword));
  }
}