import { test as setup } from "@playwright/test";
import { LoginPopUpPage } from "./pages";
import path from "path";

const authFile = path.join(__dirname, "../.auth/user.json");

setup("authenticate", async ({ page }) => {
  await page.goto("/");
  const loginPopUpPage = new LoginPopUpPage(page);
  await loginPopUpPage.logInToPortal(
    process.env.USER_EMAIL,
    process.env.USER_PASSWORD
  );
  await page.waitForURL("**/garage");
  await page.context().storageState({ path: authFile });
});
