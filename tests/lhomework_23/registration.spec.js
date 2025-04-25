import { test } from "@playwright/test";
import { RegistrationPopUpPage, GaragePage } from "./pages";

const email = `aqa-${Date.now()}@test.com`;

let registrationPopUpPage;
let garagePage;

test.describe("Positive registration tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://qauto.forstudy.space/");
  });

  test("Should successfully register a new user with valid data", async ({ page }) => {
    registrationPopUpPage = new RegistrationPopUpPage(page);
    garagePage = new GaragePage(page);
    await registrationPopUpPage.shouldPopUpSeeTitle();
    await registrationPopUpPage.fillRegistrationForm({
      name: "John",
      lastName: "Smith",
      email: email,
      password: "Valid1Password",
      repeatPassword: "Valid1Password",
    });
    await registrationPopUpPage.registerButtonIsDisabled(false);
    await registrationPopUpPage.clickRegisterButton();
    await garagePage.shouldSeeMainGaragePage();
  });
});

test.describe("Negative registration tests", () => {
  test.beforeEach(async ({ page }) => {
    registrationPopUpPage = new RegistrationPopUpPage(page);
    await page.goto("https://qauto.forstudy.space/");
    await registrationPopUpPage.shouldPopUpSeeTitle();
  });

  test("Should see error when the Name field is empty", async () => {
    await registrationPopUpPage.clickOnField(registrationPopUpPage.nameField);
    await registrationPopUpPage.clickRegisterButton();
    await registrationPopUpPage.shouldHaveBorderColorRed(registrationPopUpPage.nameField);
    await registrationPopUpPage.shouldSeeError('Name required');
  });

  test("Should see error when invalid Name data", async () => {
    await registrationPopUpPage.fillRegistrationForm({ name: "1" });
    await registrationPopUpPage.registerButtonIsDisabled(true);
    await registrationPopUpPage.clickRegisterButton();
    await registrationPopUpPage.shouldHaveBorderColorRed(registrationPopUpPage.nameField);
    await registrationPopUpPage.shouldSeeError('Name is invalid');
  });

  test("Should see error when Last Name length less than 2 or more than 20 characters", async ({ page }) => {
    await registrationPopUpPage.fillRegistrationForm({ name: "John", lastName: "y" });
    await registrationPopUpPage.registerButtonIsDisabled(true);
    await registrationPopUpPage.clickRegisterButton();
    await registrationPopUpPage.shouldHaveBorderColorRed(registrationPopUpPage.lastNameField);
    await registrationPopUpPage.shouldSeeError('Last name has to be from 2 to 20 characters long');
  });

  test("Should see error when the Email field is empty", async ({ page }) => {
    await registrationPopUpPage.fillRegistrationForm({
      name: "John",
      lastName: "Smith",
    });
    await registrationPopUpPage.clickOnField(registrationPopUpPage.emailField);
    await registrationPopUpPage.registerButtonIsDisabled(true);
    await registrationPopUpPage.clickRegisterButton();
    await registrationPopUpPage.shouldHaveBorderColorRed(registrationPopUpPage.emailField);
    await registrationPopUpPage.shouldSeeError('Email required');
  });

  test("Should see error when invalid Email name data", async ({ page }) => {
    await registrationPopUpPage.fillRegistrationForm({
      name: "John",
      lastName: "Smith",
      email: "test",
    });
    await registrationPopUpPage.registerButtonIsDisabled(true);
    await registrationPopUpPage.clickRegisterButton();
    await registrationPopUpPage.shouldHaveBorderColorRed(registrationPopUpPage.emailField);
    await registrationPopUpPage.shouldSeeError('Email is incorrect');
  });

  test("Should see error when the Password too short", async ({ page }) => {
    await registrationPopUpPage.fillRegistrationForm({
      name: "John",
      lastName: "Smith",
      email: "test@gmail.com",
      password: "pass",
    });
    await registrationPopUpPage.registerButtonIsDisabled(true);
    await registrationPopUpPage.clickRegisterButton();
    await registrationPopUpPage.shouldHaveBorderColorRed(registrationPopUpPage.passwordField);
    await registrationPopUpPage.shouldSeeError('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
  });

  test("Should see error when passwords do not match", async ({ page }) => {
    await registrationPopUpPage.fillRegistrationForm({
      name: "John",
      lastName: "Smith",
      email: "test@gmail.com",
      password: "Valid1Password",
      repeatPassword: "Valid1Password1",
    });
    await registrationPopUpPage.registerButtonIsDisabled(true);
    await registrationPopUpPage.clickRegisterButton();
    await registrationPopUpPage.shouldHaveBorderColorRed(registrationPopUpPage.repeatPasswordField);
    await registrationPopUpPage.shouldSeeError('Passwords do not match');
  });
});