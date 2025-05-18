import { expect } from "@playwright/test";

export default class ProfilePage {
  constructor(page) {
    this.page = page;
    this.pageHeader = page.locator('[class*="panel-page_heading"] h1');
    this.editProfileButton = page.getByRole("button", { name: "Edit profile" });
    this.profileName = page.locator('[class*="profile_name"]');
  }

  async shouldSeeUserProfile(userName) {
    await expect(this.pageHeader).toHaveText("Profile");
    await expect(this.editProfileButton).toBeVisible();
    await expect(this.profileName).toHaveText(userName);
  }
}