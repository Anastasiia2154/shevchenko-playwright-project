import { expect } from "@playwright/test";

export default class LoginPopUpPage {
  constructor(page) {
    this.page = page;
    this.singInButton = page.getByRole("button", { name: "Sign In" });
    this.loginField = page.getByRole("textbox", { name: "Email" });
    this.passwordField = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "Login" });
  }

  async logInToPortal(email, password) {
    await this.singInButton.click();
    await this.loginField.fill(email);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
}
