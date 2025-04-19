import { test, expect } from "@playwright/test";

const email = `aqa-${Date.now()}@test.com`;

test.use({
  httpCredentials: {
    username: "guest",
    password: "welcome2qauto",
  },
});


test.describe("Positive registration tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://qauto.forstudy.space/");
  });
  
  test("Should successfully register a new user with valid data", async ({page}) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await expect(page.getByRole("heading", { name: "Registration" })).toBeVisible();
    await page.locator('[id="signupName"]').fill('John');
    await page.locator('[id="signupLastName"]').fill('Wick');
    await page.locator('[id="signupEmail"]').fill(email);
    await page.locator('[id="signupPassword"]').fill('Valid1Password');
    await page.locator('[id="signupRepeatPassword"]').fill('Valid1Password');
    await page.getByRole("button", {name: "Register"}).click();
    await expect(page.getByRole("heading", { name: "Garage" })).toBeVisible({ timeout: 2000 });
  });
});

test.describe("Negative registration tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://qauto.forstudy.space/");
    await page.getByRole("button", { name: "Sign up" }).click();
    await expect(page.getByRole("heading", { name: "Registration" })).toBeVisible();
  });
  
  test("Should see error when the Name field is empty", async ({page}) => {
    const nameField =  page.locator('[id="signupName"]');
    await nameField.click();
    await page.getByRole("button", {name: "Register"}).click({ force: true });
    await expect(nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator('[class="invalid-feedback"],[class*="alert"]')).toContainText('Name required')

  });

  test("Should see error when invalid Name data", async ({page}) => {
    const nameField =  page.locator('[id="signupName"]');
    await nameField.fill('1');
    const registerButton = page.getByRole("button", {name: "Register"});
    await expect(registerButton).toBeDisabled();
    await registerButton.click({ force: true });
    await expect(nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator('[class="invalid-feedback"],[class*="alert"]')).toContainText('Name is invalid')
  });

  test("Should see error when Last Name length less than 2 or more than 20 characters", async ({page}) => {
    const lastNameField =  page.locator('[id="signupLastName"]');
    await page.locator('[id="signupName"]').fill('John');
    await lastNameField.fill('Y');
    const registerButton = page.getByRole("button", {name: "Register"});
    await expect(registerButton).toBeDisabled();
    await page.getByRole("button", {name: "Register"}).click({ force: true });
    await expect(lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator('[class="invalid-feedback"],[class*="alert"]')).toContainText('Last name has to be from 2 to 20 characters long')
  });

  test("Should see error when the Email field is empty", async ({page}) => {
    await page.locator('[id="signupName"]').fill('John');
    await page.locator('[id="signupLastName"]').fill('Wick');
    const emailField =  page.locator('[id="signupEmail"]');
    await emailField.click();
    const registerButton = page.getByRole("button", {name: "Register"});
    await expect(registerButton).toBeDisabled();
    await page.getByRole("button", {name: "Register"}).click({ force: true });
    await expect(emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator('[class="invalid-feedback"],[class*="alert"]')).toContainText('Email required')
  });

  test("Should see error when invalid Email name data", async ({page}) => {
    await page.locator('[id="signupName"]').fill('John');
    await page.locator('[id="signupLastName"]').fill('Wick');
    const emailField =  page.locator('[id="signupEmail"]');
    await emailField.fill('test');
    const registerButton = page.getByRole("button", {name: "Register"});
    await expect(registerButton).toBeDisabled();
    await page.getByRole("button", {name: "Register"}).click({ force: true });
    await expect(emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator('[class="invalid-feedback"],[class*="alert"]')).toContainText('Email is incorrect')
  });
  
  test("Should see error when the Password  too short", async ({page}) => {
    await page.locator('[id="signupName"]').fill('John');
    await page.locator('[id="signupLastName"]').fill('Wick');
    await page.locator('[id="signupEmail"]').fill(email);
    const passField =  page.locator('[id="signupPassword"]');
    await passField.fill('pass');
    const registerButton = page.getByRole("button", {name: "Register"});
    await expect(registerButton).toBeDisabled();
    await page.getByRole("button", {name: "Register"}).click({ force: true });
    await expect(passField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator('[class="invalid-feedback"],[class*="alert"]')).toContainText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
  });

  test("Should see error when passwords do not match", async ({page}) => {
    await page.locator('[id="signupName"]').fill('John');
    await page.locator('[id="signupLastName"]').fill('Wick');
    await page.locator('[id="signupEmail"]').fill(email);
    const passField =  page.locator('[id="signupRepeatPassword"]');
    await page.locator('[id="signupPassword"]').fill('Valid1Password');
    await passField.fill('Valid1Password1');
    const registerButton = page.getByRole("button", {name: "Register"});
    await expect(registerButton).toBeDisabled();
    await page.getByRole("button", {name: "Register"}).click({ force: true });
    await expect(passField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator('[class="invalid-feedback"],[class*="alert"]')).toContainText('Passwords do not match')
  });
});