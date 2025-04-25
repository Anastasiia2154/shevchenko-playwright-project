import { expect } from "@playwright/test";

export default class GaragePage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.getByRole("heading", { name: "Garage" });
    this.addCarButton = page.getByRole("button", { name: "Add car" });
  }

  async shouldSeeMainGaragePage() {
    await expect(this.pageTitle).toBeVisible({timeout: 2000});
    await expect(this.addCarButton).toBeVisible();
  }
}
